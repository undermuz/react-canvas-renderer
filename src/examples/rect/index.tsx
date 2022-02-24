import CanvasRoot from "../../CanvasRoot"
import render from "../../renderer"
import { createCanvas } from "@napi-rs/canvas"

import fs from "fs/promises"

import { join } from "path"

import { useEffect, useState } from "react"
import { Rect } from "../../getCanvasElementClass"

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
            <Rect
                x={x}
                y={50}
                width={30}
                height={40}
                stroke="red"
                fill="blue"
            />
            {isShown && (
                <Rect x={x} y={10} width={30} height={40} stroke="red" />
            )}
        </>
    )
}

const canvasRoot = new CanvasRoot(createCanvas, 300, 320)

render(<App />, canvasRoot)

setInterval(() => {
    canvasRoot.draw()
}, 1000 / 60)

setInterval(async () => {
    const pngData = await canvasRoot.canvas.encode("png")

    await fs.writeFile(join(process.cwd(), "simple.png"), pngData)
}, 500)
