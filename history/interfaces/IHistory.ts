import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { HistoryItem } from "../contracts/HistoryItem";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class IHistory implements IInjected {
    ["`container"]: ICoherenceContainer;
    extend(hitem: HistoryItem) { throw new InterfaceUsingException("IHistory.extend"); }
    restore(state: any) { throw new InterfaceUsingException("IHistory.restore"); }
}