import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { StringHelper } from "../../declare/string";
import { Binding } from "../abstract/Binding";
import { toHtmlArray, nodeToArray } from "../../extensions/HtmlElementExtensions";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";

export class EventBinding extends Binding {
    async detection(DOMObject: HTMLElement[]): Promise<HTMLElement[]> {
        const queryableNodes = this.queryable(DOMObject);
        const all = queryableNodes.map(node => toHtmlArray(node.querySelectorAll(eventSelectors.join())));
        return all.reduce((p, n) => p.concat(n));
    }

    async binding(DOMObject: HTMLElement, model: ViewModel): Promise<void> {
        const attributes = nodeToArray<Attr>(DOMObject.attributes);
        const events = attributes.filter(attr => eventsAttr.includes(attr.name));
        this.funcBinded(events, model).forEach(bind => {
            DOMObject.addEventListener(bind.event.replace("on", ""), function () {
                bind.func.apply(model, arguments);
            });
        });
        events.forEach(event => DOMObject.removeAttribute(event.name));
    }

    async clear(DOMObject: HTMLElement): Promise<void> { }

    private queryable(DOMObjects: HTMLElement[]): HTMLElement[] {
        if (!DOMObjects || DOMObjects.length == 0) {
            return [];
        }
        const parent = DOMObjects[0].parentElement;
        if (parent) {
            return [parent];
        } else {
            return DOMObjects;
        }
    }

    private funcBinded(events: Attr[], model: any): { event: string, func: any }[] {
        return events.map(event => {
            return {
                event: event.name,
                func: model[event.value]
            }
        }).filter(bind => {
            return !!bind.func && typeof bind.func === 'function';
        });
    }
}

const allEvents = [
    "abort",
    "activate",
    "beforeactivate",
    "beforecopy",
    "beforecut",
    "beforedeactivate",
    "beforepaste",
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "click",
    "contextmenu",
    "copy",
    "cuechange",
    "cut",
    "dblclick",
    "deactivate",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "emptied",
    "ended",
    "error",
    "focus",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "load",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "mousewheel",
    "MSContentZoom",
    "MSManipulationStateChanged",
    "paste",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "reset",
    "scroll",
    "seeked",
    "seeking",
    "select",
    "selectstart",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "volumechange",
    "waiting",
    "ariarequest",
    "command",
    "gotpointercapture",
    "lostpointercapture",
    "MSGestureChange",
    "MSGestureDoubleTap",
    "MSGestureEnd",
    "MSGestureHold",
    "MSGestureStart",
    "MSGestureTap",
    "MSGotPointerCapture",
    "MSInertiaStart",
    "MSLostPointerCapture",
    "MSPointerCancel",
    "MSPointerDown",
    "MSPointerEnter",
    "MSPointerLeave",
    "MSPointerMove",
    "MSPointerOut",
    "MSPointerOver",
    "MSPointerUp",
    "touchcancel",
    "touchend",
    "touchmove",
    "touchstart",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "wheel"
];
const eventsAttr = allEvents.map(eventName => "on" + eventName);
const eventSelectors = allEvents.map(eventName => "[on" + eventName + "]");