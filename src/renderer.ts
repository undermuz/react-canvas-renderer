import Reconciler from "react-reconciler"

import getCanvasElementClass from "./getCanvasElementClass"
import CanvasRoot from "./CanvasRoot"
import BaseCanvasElement from "./CanvasElements/BaseCanvasElement"
import { AnyCanvas2dContext } from "./ICanvas"
import { CanvasTypes } from "./CanvasElements/CanvasTypes"
// import isEqual from "lodash/isequal"

type Props = {
    [s: string]: any
}

type Container<T extends AnyCanvas2dContext> = CanvasRoot<T>

type Instance<T extends AnyCanvas2dContext> = BaseCanvasElement<T>

type TextInstance<T extends AnyCanvas2dContext> = Instance<T>

type HydratableInstance<T extends AnyCanvas2dContext> = Instance<T>
type PublicInstance<T extends AnyCanvas2dContext> = Instance<T>
type SuspenseInstance<T extends AnyCanvas2dContext> = Instance<T>
type HostContext = {}
type UpdatePayload = {
    [s: string]: any
}
type ChildSet = {}
type TimeoutHandle = {}
type NoTimeout = number

function createReconciler<T extends AnyCanvas2dContext>() {
    return Reconciler<
        CanvasTypes,
        Props,
        Container<T>,
        Instance<T>,
        TextInstance<T>,
        SuspenseInstance<T>,
        HydratableInstance<T>,
        PublicInstance<T>,
        HostContext,
        UpdatePayload,
        ChildSet,
        TimeoutHandle,
        NoTimeout
    >({
        now: Date.now,
        supportsMutation: true,
        supportsPersistence: false,
        scheduleTimeout: setTimeout,
        cancelTimeout: clearTimeout,
        noTimeout: -1,
        isPrimaryRenderer: true,
        supportsHydration: false,
        preparePortalMount() {},

        getPublicInstance(instance) {
            return instance
        },

        createInstance(
            type,
            props,
            rootContainer,
            hostContext,
            internalInstanceHost
        ): BaseCanvasElement<T> {
            const canvasElementClass = getCanvasElementClass(type)

            return new canvasElementClass<T>(rootContainer, props)
        },
        createTextInstance(
            text,
            rootContainer,
            hostContext,
            internalInstanceHost
        ) {
            throw new Error("Text should be wrapped by <text> component")
        },

        appendInitialChild(parent, child) {
            child.append()
        },
        appendChild(parent, child) {
            child.append()
        },
        appendChildToContainer(container, child) {
            child.append()
        },
        removeChildFromContainer(container, child) {
            child.remove()
        },
        removeChild(container, child) {
            child.remove()
        },

        // commitTextUpdate(textInstance, oldText, newText) {
        //   if (oldText !== newText) textInstance.textContent = newText;
        // },

        insertBefore() {},
        shouldSetTextContent(type, props) {
            return false
        },
        prepareUpdate(
            instance,
            type,
            oldProps,
            newProps,
            rootContainer,
            hostContext
        ) {
            return newProps
            // if (type === "canvas") return newProps

            // if (!isEqual(oldProps, newProps)) {
            //     return newProps
            // }

            // return oldProps
        },
        commitUpdate(
            instance,
            payload,
            type,
            oldProps,
            newProps,
            internalInstanceHost
        ) {
            instance.updateProps(payload)
        },

        prepareForCommit(containerInfo) {
            return null
        },
        finalizeInitialChildren() {
            return false
        },
        resetAfterCommit(containerInfo) {},
        getRootHostContext(rootContainer) {
            return {}
        },
        getChildHostContext(parentHostContext, type, rootContainer) {
            return {}
        },
        clearContainer(container) {},
    })
}

function render<T extends AnyCanvas2dContext>(element, root) {
    const reconciler = createReconciler<T>()

    const container = reconciler.createContainer(root, null, false, null)

    reconciler.updateContainer(element, container)
}

export default render
