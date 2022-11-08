import { CanvasTypes } from "./CanvasElements/CanvasTypes"

import { CanvasText, CanvasRect, CanvasCustom } from "./CanvasElements"

const getCanvasElementClass = (type: CanvasTypes) => {
    if (type === CanvasTypes.CanvasRectType) {
        return CanvasRect
    }

    if (type === CanvasTypes.CanvasTextType) {
        return CanvasText
    }

    if (type === CanvasTypes.CanvasCustomType) {
        return CanvasCustom
    }

    throw new Error(`Unknown type: ${type}`)
}

export default getCanvasElementClass
