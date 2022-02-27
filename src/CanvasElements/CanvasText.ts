import { AnyCanvas2dContext } from "../ICanvas"
import BaseCanvasElement, { IBaseCanvasElementProps } from "./BaseCanvasElement"

export interface ICanvasTextProps extends IBaseCanvasElementProps {
    x: number
    y: number
    children?: string
    color?: string
    style?: string
}

class CanvasText<T extends AnyCanvas2dContext> extends BaseCanvasElement<T> {
    props: ICanvasTextProps

    draw() {
        const { ctx } = this.root

        const {
            x,
            y,
            children: text = "",
            style = "10px Impac",
            color = "white",
        } = this.props

        ctx.beginPath()

        ctx.font = style
        ctx.fillStyle = color
        ctx.fillText(text, x, y)

        ctx.closePath()
    }
}

export default CanvasText
