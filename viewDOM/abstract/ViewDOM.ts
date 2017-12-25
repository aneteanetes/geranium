import { IViewDOM } from "../interfaces/IViewDOM";
import { IViewable } from "../../view/interfaces/IViewable";
import { Model } from "../../models/Model";

export abstract class ViewDOM extends IViewDOM {
    data: Model;
    abstract DOM(): Promise<HTMLElement[]>;
}