import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IGeranium } from "./IGeranium";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { ConsoleLogger } from "../../exceptions/logging/concrete/ConsoleLogger";
import { AjaxCommunicator } from "../../backend/concrete/ajax/AjaxCommunicator";

export interface IApp extends ICoherenceContainer {
    /** Instantiate application with (optional) settings */
    start(geranium: IGeranium);
}