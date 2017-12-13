import { IViewDOM } from "../interfaces/IViewDOM";
import { View } from "../../view/abstract/view";

export abstract class ViewDOM implements IViewDOM {
    abstract DOM(): Promise<HTMLElement>;
}