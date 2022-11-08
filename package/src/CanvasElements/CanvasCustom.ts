import { AnyCanvas2dContext } from "../ICanvas"
import BaseCanvasElement, { IBaseCanvasElementProps } from "./BaseCanvasElement"

export interface ICanvasCustomProps<T> extends IBaseCanvasElementProps {
    [key: string]: any
    draw: (ctx: T, props: Record<string, any>) => void
}

class CanvasCustom<T extends AnyCanvas2dContext> extends BaseCanvasElement<T> {
    props: ICanvasCustomProps<T>

    draw() {
        const { ctx } = this.root

        this.props.draw(ctx, this.props)
    }
}

export default CanvasCustom
