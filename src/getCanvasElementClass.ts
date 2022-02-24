import CanvasRect from "./CanvasElement"

export enum CanvasTypes {
    CanvasRectType = "c-rect",
}

export const Rect = CanvasTypes.CanvasRectType

const getCanvasElementClass = (type: CanvasTypes) => {
    if (type === CanvasTypes.CanvasRectType) {
        return CanvasRect
    }

    throw new Error(`Unknown type: ${type}`)
}

export default getCanvasElementClass
