import { IViewDOM } from "../interfaces/IViewDOM";

export abstract class ViewDOM extends IViewDOM {
    data: any;
    abstract DOM(): Promise<HTMLElement>;
}