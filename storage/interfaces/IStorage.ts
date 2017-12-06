import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { Constructor } from "../../structures/Constructor";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class IStorage implements IInjected {
    ["`container"]: ICoherenceContainer;
    add<T>(model: T): boolean { throw new InterfaceUsingException("IStorage.add"); }
    remove<T>(type: Constructor<T> | Function): boolean { throw new InterfaceUsingException("IStorage.remove"); }
    get<T>(type: Constructor<T> | Function): T { throw new InterfaceUsingException("IStorage.get"); }
    all<T>(): T[] { throw new InterfaceUsingException("IStorage.all"); }
}