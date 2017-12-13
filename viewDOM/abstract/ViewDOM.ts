import { IViewDOM } from "../interfaces/IViewDOM";
import { View } from "../../view/abstract/view";

export abstract class ViewDOM extends IViewDOM {
    abstract DOM(): Promise<HTMLElement>;
}