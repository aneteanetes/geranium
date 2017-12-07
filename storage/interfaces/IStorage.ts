import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { Constructor } from "../../structures/Constructor";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { IEntity } from "./IEntity";

export class IStorage implements IInjected {
    ["`container"]: ICoherenceContainer;
    add<T extends IEntity>(model: T): boolean { throw new InterfaceUsingException("IStorage.add"); }
    remove<T extends IEntity>(id: number): boolean { throw new InterfaceUsingException("IStorage.remove"); }
    get<T extends IEntity>(id: number): T { throw new InterfaceUsingException("IStorage.get"); }
    all<TT extends IEntity>(): IEntity[] { throw new InterfaceUsingException("IStorage.all"); }
}