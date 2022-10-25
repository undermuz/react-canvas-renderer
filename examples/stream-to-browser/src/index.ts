import CanvasRoot from "../../../build/CanvasRoot"
import render from "../../../build/renderer"
import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas"

import fs from "fs/promises"

import { join } from "path"

// import { fileURLToPath } from "url"
// import { dirname } from "path"
import fastify from "fastify"

import socketIoServer from "fastify-socket.io"
import renderApp from "./App"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = fastify({ logger: true })

app.register(socketIoServer)

app.get("/", async (req, reply) => {
    const data = await fs.readFile(
        join(process.cwd(), "/public/", "index.html")
    )
    reply.header("content-type", "text/html; charset=utf-8")
    reply.send(data)
})

app.ready((err) => {
    if (err) throw err

    const root = new CanvasRoot<SKRSContext2D>(300, 320)

    root.attachCanvas(createCanvas(...root.dimensions))

    render<SKRSContext2D>(renderApp(), root)

    setInterval(() => {
        root.draw()
    }, 1000 / 60)

    setInterval(async () => {
        const canvas = root.canvas as Canvas

        const pngData = await canvas.encode("png")

        // await fs.writeFile(join(process.cwd(), "simple.png"), pngData)

        app.io.emit("stream", pngData)
    }, 500)

    app.io.on("connect", (socket) =>
        console.info("Socket connected!", socket.id)
    )
})

app.listen(3000)
