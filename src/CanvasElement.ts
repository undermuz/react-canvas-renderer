import BaseCanvasElement, { IBaseCanvasElementProps } from "./BaseCanvasElement"

export interface ICanvasRectProps extends IBaseCanvasElementProps {
    x: number
    y: number
    width: number
    height: number
    fill?: string
    stroke?: string
}

class CanvasRect extends BaseCanvasElement {
    props: ICanvasRectProps

    draw() {
        const { ctx } = this.root
        const { x, y, width, height, fill, stroke } = this.props

        ctx.beginPath()

        if (fill) ctx.fillStyle = fill
        if (stroke) ctx.strokeStyle = stroke

        ctx.rect(x, y, width, height)

        fill && ctx.fill()
        stroke && ctx.stroke()

        ctx.closePath()
    }
}

export default CanvasRect
