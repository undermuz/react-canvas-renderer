import { useCallback, useEffect, useState } from "react"
import { AnyCanvas2dContext } from "@undermuz/react-canvas-renderer"
import { Rect, Custom } from "@undermuz/react-canvas-renderer"

const NestedRect = ({ x }) => {
    return <Rect x={x} y={50} width={30} height={40} stroke="red" fill="blue" />
}

const App = () => {
    const [x, setX] = useState(0)
    const [isShown, setIsShown] = useState(true)

    const customDraw = useCallback(
        (ctx: AnyCanvas2dContext, props: Record<string, any>) => {
            let y = 0
            const x = 0

            if (props.lines) {
                const lines = props.lines as string[]

                ctx.font = `10px`

                lines.forEach((line) => {
                    ctx.fillText(line, x, y)
                    y += 10
                })
            }
        },
        []
    )

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

            <Rect x={10} y={10} width={20} height={20} stroke="green" />

            <Custom draw={customDraw} lines={["1111", "2222", "3333"]} />
        </>
    )
}

const renderApp = () => <App />

export default renderApp
