import { ICanvasCustomProps } from "./CanvasElements/CanvasCustom"
import { ICanvasRectProps } from "./CanvasElements/CanvasRect"
import { ICanvasTextProps } from "./CanvasElements/CanvasText"

export interface CanvasGetContext<T> {
    (...args: any[]): T
}

export interface ICanvas<T> {
    [k: string]: any
    getContext: CanvasGetContext<T>
}

export interface GetCanvas<T> {
    (width: number, height: number, ...args: any[]): ICanvas<T>
}

export interface AnyCanvas2dContext
    extends Omit<
        CanvasRenderingContext2D,
        | "drawImage"
        | "createPattern"
        | "getTransform"
        | "drawFocusIfNeeded"
        | "scrollPathIntoView"
    > {}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "c-rect": ICanvasRectProps
            "c-text": ICanvasTextProps
            "c-custom": ICanvasCustomProps<AnyCanvas2dContext>
        }
    }
}
