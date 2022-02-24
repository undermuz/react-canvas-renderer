import getCanvasElementClass, { CanvasTypes } from "./getCanvasElementClass"
import Reconciler from "react-reconciler"
import CanvasRoot from "CanvasRoot"
import BaseCanvasElement from "BaseCanvasElement"
// import isEqual from "lodash/isequal"

type Props = {
    [s: string]: any
}

type Container = CanvasRoot

type Instance = BaseCanvasElement

type TextInstance = Instance

type HydratableInstance = Instance
type PublicInstance = Instance
type SuspenseInstance = Instance
type HostContext = {}
type UpdatePayload = {
    [s: string]: any
}
type ChildSet = {}
type TimeoutHandle = {}
type NoTimeout = {}

const reconciler = Reconciler<
    CanvasTypes,
    Props,
    Container,
    Instance,
    TextInstance,
    SuspenseInstance,
    HydratableInstance,
    PublicInstance,
    HostContext,
    UpdatePayload,
    ChildSet,
    TimeoutHandle,
    NoTimeout
>({
    supportsMutation: true,

    createInstance(
        type,
        props,
        rootContainer,
        hostContext,
        internalInstanceHost
    ) {
        const canvasElementClass = getCanvasElementClass(type)

        return new canvasElementClass(rootContainer, props)
    },
    createTextInstance(text, rootContainer, hostContext, internalInstanceHost) {
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

const render = (element, root) => {
    const container = reconciler.createContainer(root, null, false, null)
    reconciler.updateContainer(element, container)
}

export default render
