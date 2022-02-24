import BaseCanvasElement from "BaseCanvasElement"
import { GetCanvas, ICanvas } from "ICanvas"

class CanvasRoot {
    width: number = 0
    height: number = 0
    isShouldUpdate: boolean = false

    elements: Array<BaseCanvasElement> = []
    canvas: ICanvas

    constructor(createCanvas: GetCanvas, width: number, height: number) {
        this.width = width
        this.height = height

        this.canvas = createCanvas(this.width, this.height)
    }

    get ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext("2d")
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

    appendCanvasElement(element: BaseCanvasElement) {
        this.isShouldUpdate = true

        this.elements.push(element)
    }

    removeCanvasElement(element: BaseCanvasElement) {
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
