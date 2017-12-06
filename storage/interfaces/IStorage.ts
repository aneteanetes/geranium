import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { Constructor } from "../../structures/Constructor";

export class IStorage {
    add(model: any): boolean { throw new InterfaceUsingException("IStorage.add"); }
    remove<T>(type: Constructor<T> | Function): boolean { throw new InterfaceUsingException("IStorage.remove"); }
    get<T>(type: Constructor<T> | Function): T { throw new InterfaceUsingException("IStorage.get"); }
}