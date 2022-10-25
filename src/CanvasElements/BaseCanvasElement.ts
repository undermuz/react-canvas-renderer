import { AnyCanvas2dContext } from "../ICanvas"
import CanvasRoot from "../CanvasRoot"

export interface IBaseCanvasElementProps {
    [key: string]: any
}

class BaseCanvasElement<T extends AnyCanvas2dContext> {
    root: CanvasRoot<T>
    props: IBaseCanvasElementProps

    constructor(root: CanvasRoot<T>, props: IBaseCanvasElementProps) {
        this.props = props
        this.root = root
    }

    draw() {}

    append() {
        console.log("append")
        this.root.appendCanvasElement(this)
    }

    remove() {
        console.log("remove")
        this.root.removeCanvasElement(this)
    }

    updateProps(newProps: IBaseCanvasElementProps) {
        this.props = newProps

        this.root.shouldUpdate()
    }
}

export default BaseCanvasElement
