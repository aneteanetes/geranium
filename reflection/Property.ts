import { Event } from "../behaviors/events/abstract/event";
import { ICoherenceContainer } from "../coherence/interfaces/ICoherenceContainer";

export class Property {
    /**
     * Redefines property with new public accessors, safe
     * 
     * Also creates property Event for detection end of chain:
     * 
     * setter obj[#event:set[name]]
     * 
     * getter obj[#event:get[name]]
     * @param target
     * @param name of property
     * @param get new public setter
     * @param set new public getter
     */
    static redefine(target, name: string, get: (val: any) => any, set: (val: any) => any) {
        var protoPropertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), name);
        var ownPropertyDescriptor = Object.getOwnPropertyDescriptor(target, name);

        var setterEvent = new PropertyEvent();
        var getterEvent = new PropertyEvent();

        //accessors doesn't exists
        if (ownPropertyDescriptor === undefined && protoPropertyDescriptor === undefined)
            return;

        //prototype accessor
        if (ownPropertyDescriptor == undefined && protoPropertyDescriptor != undefined) {

            Object.defineProperty(target, name, {
                get() {
                    var val = protoPropertyDescriptor.get.call(target);
                    var _val = get(val);
                    getterEvent.raise({ val, _val });
                    return _val;
                },
                set(val) {
                    let _val = set.call(this, val);
                    if (_val != undefined)
                        protoPropertyDescriptor.set.call(target, _val);
                    setterEvent.raise({ val, _val });
                },
                configurable: true
            });
            target["#event:set[" + name + "]"] = setterEvent;
            target["#event:get[" + name + "]"] = getterEvent;
            return;

            //own accessor exists
        } else if (ownPropertyDescriptor.value == undefined) {
            Object.defineProperty(target, name, {
                get() { return get(ownPropertyDescriptor.get.call(target)); },
                set(val) {
                    let _val = set.call(this, val);
                    if (_val != undefined)
                        ownPropertyDescriptor.set.call(target, _val);
                },
                configurable: true
            });

            //accessor doesn't exists
        } else {
            var indexer = Symbol(name);
            target[indexer] = target[name];
            Object.defineProperty(target, name, {
                get() {
                    var val = target[indexer];
                    var _val = get(val);
                    getterEvent.raise({ val, _val });
                    return _val;
                },
                set(val) {
                    let _val = set.call(this, val);
                    if (_val != undefined)
                        target[indexer] = set(_val);
                    setterEvent.raise({ val, _val });
                },
                configurable: true
            });
            target["#event:set[" + name + "]"] = setterEvent;
            target["#event:get[" + name + "]"] = getterEvent;
        }
    }
}

export class PropertyEvent extends Event<PropertyAccessor>  {
    ["`container"]: ICoherenceContainer;
}

export class PropertyAccessor {
    val: any;
    _val: any;
}