import { CanvasTypes } from "./CanvasElements/CanvasTypes"

import { CanvasText, CanvasRect } from "./CanvasElements"

const getCanvasElementClass = (type: CanvasTypes) => {
    if (type === CanvasTypes.CanvasRectType) {
        return CanvasRect
    }

    if (type === CanvasTypes.CanvasTextType) {
        return CanvasText
    }

    throw new Error(`Unknown type: ${type}`)
}

export default getCanvasElementClass
