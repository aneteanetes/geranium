import { Constructor } from "../structures/Constructor";
import { PropertyInfo } from "./Property";

export class Class {
    static isAssignableFrom(from: Constructor<any>, target: Constructor<any>): boolean {
        const now = (target || { name: '' }).name;
        if (from.name == now) {
            return true;
        } else if (now !== "" && now !== undefined) {
            return Class.isAssignableFrom(from, Object.getPrototypeOf(target));
        } else {
            return false;
        }
    }

    static getProperties(targetObject: any): Array<PropertyInfo> {
        var properties: Array<string> = [];
        for (; targetObject != null; targetObject = Object.getPrototypeOf(targetObject)) {
            var ownPropertiesName = Object.getOwnPropertyNames(targetObject);
            for (var i = 0; i < ownPropertiesName.length; i++) {
                const propName = ownPropertiesName[i];
                if (!Class.notCoreFunc.includes(propName) && !properties.includes(propName)) {
                    properties.push(propName);
                }
            }
        }

        return properties.map(x => {
            return {
                name: x,
                property: targetObject[x]
            }
        });
    }

    private static get notCoreFunc(): Array<string> {
        return [
            "constructor",
            "clone",
            "__defineGetter__",
            "__defineSetter__",
            "hasOwnProperty",
            "__lookupGetter__",
            "__lookupSetter__",
            "propertyIsEnumerable",
            "__proto__",
            "toString",
            "toLocaleString",
            "valueOf",
            "isPrototypeOf"
        ];
    }
}