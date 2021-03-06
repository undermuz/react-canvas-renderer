import CanvasRoot from "../../CanvasRoot"
import render from "../../renderer"
import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas"

import fs from "fs/promises"

import { join } from "path"

// import { fileURLToPath } from "url"
// import { dirname } from "path"
import fastify from "fastify"

import { useEffect, useState } from "react"
import { Rect } from "../../CanvasElements/CanvasTypes"
import socketIoServer from "fastify-socket.io"

const NestedRect = ({ x }) => {
    return <Rect x={x} y={50} width={30} height={40} stroke="red" fill="blue" />
}

const App = () => {
    const [x, setX] = useState(0)
    const [isShown, setIsShown] = useState(true)

    useEffect(() => {
        const tID = setInterval(() => {
            setX((_x) => _x + 1)
        }, 200)

        return () => {
            clearInterval(tID)
        }
    }, [])

    useEffect(() => {
        const tID = setInterval(() => {
            setIsShown((_s) => !_s)
        }, 1000)

        return () => {
            clearInterval(tID)
        }
    }, [])

    return (
        <>
            {isShown && (
                <Rect x={x} y={10} width={30} height={40} stroke="red" />
            )}

            <NestedRect x={x} />
        </>
    )
}

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

    render<SKRSContext2D>(<App />, root)

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
