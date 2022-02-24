export interface CanvasGetContext {
    (arg0: string): CanvasRenderingContext2D
}

export interface ICanvas {
    getContext: CanvasGetContext
}

export interface GetCanvas {
    (width: number, height: number): ICanvas
}
