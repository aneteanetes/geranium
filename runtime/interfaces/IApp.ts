import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IGeranium } from "./IGeranium";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { ConsoleLogger } from "../../exceptions/logging/concrete/ConsoleLogger";
import { AjaxCommunicator } from "../../backend/concrete/ajax/AjaxCommunicator";

export class IApp {
    get container(): ICoherenceContainer {
        throw new InterfaceUsingException("IApp.container.get");
    }
    instantiate(geranium: IGeranium) { throw new InterfaceUsingException("IApp.instantiate"); }
}