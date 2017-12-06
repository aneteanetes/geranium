import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IApp {
    get container(): ICoherenceContainer {
        throw new InterfaceUsingException("IApp.container.get");
    }

    set container(container: ICoherenceContainer) {
        throw new InterfaceUsingException("IApp.container.set")
    }
}