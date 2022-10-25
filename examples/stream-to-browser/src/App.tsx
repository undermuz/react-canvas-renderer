import { useEffect, useState } from "react"
import { Rect } from "../../../build/CanvasElements/CanvasTypes"

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
            
            <Rect x={10} y={10} width={20} height={20} stroke="green" />
        </>
    )
}

const renderApp = () => <App />

export default renderApp
