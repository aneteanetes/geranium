import { routeignore } from "../../../routing/concrete/decorators";
import { IInjected } from "../../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../../coherence/interfaces/ICoherenceContainer";
import { ArrayHelper } from "../../../declare/array";

@routeignore
export abstract class Event<T> implements IInjected {
    raise(args: T) {
        this._requestEvents.forEach(subscriber => {
            subscriber(args);
        });
    }

    private _requestEvents: ((args: T) => void)[] = new Array<((args: T) => void)>();

    set bind(callback: ((args: T) => void)) {
        this._requestEvents.push(callback);
    }
    set unbind(callback: ((args: T) => void)) {
        this._requestEvents = ArrayHelper.remove(this._requestEvents, callback);
    }

    abstract ["`container"]: ICoherenceContainer;
}