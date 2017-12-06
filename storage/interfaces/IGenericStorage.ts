import { IStorage } from "./IStorage";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IGenericStorage<T> extends IStorage {
    all(): T[] { throw new InterfaceUsingException("IGenericStorage.all"); }
}