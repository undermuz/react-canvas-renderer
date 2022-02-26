import BaseCanvasElement from "BaseCanvasElement"
import { AnyCanvas2dContext, GetCanvas, ICanvas } from "ICanvas"

class CanvasRoot<T extends AnyCanvas2dContext> {
    width: number = 0
    height: number = 0
    isShouldUpdate: boolean = false

    elements: Array<BaseCanvasElement<T>> = []
    canvas: ICanvas<T>

    constructor(createCanvas: GetCanvas<T>, width: number, height: number) {
        this.width = width
        this.height = height

        this.canvas = createCanvas(this.width, this.height)
    }

    get ctx(): T {
        return this.canvas.getContext("2d") as T
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    draw() {
        if (!this.isShouldUpdate) return

        this.clear()

        this.elements.forEach((element) => {
            element.draw()
        })
    }

    appendCanvasElement(element: BaseCanvasElement<T>) {
        this.isShouldUpdate = true

        this.elements.push(element)
    }

    removeCanvasElement(element: BaseCanvasElement<T>) {
        this.isShouldUpdate = true

        const i = this.elements.indexOf(element)

        if (i < 0) throw new Error("Element not found")

        this.elements.splice(i, 1)
    }

    shouldUpdate() {
        this.isShouldUpdate = true
    }
}

export default CanvasRoot
