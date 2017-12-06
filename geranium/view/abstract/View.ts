import { Template } from "../../templating/contracts/template";
import { Exception } from "../../exceptions/Exception";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ITemplateEngine } from "../../templating/interfaces/ITemplateEngine";

export abstract class View extends Template implements IInjected {

    ["`container"]: ICoherenceContainer;
    private _selector: string;
    private _rendered: boolean;

    constructor(selector: string) {
        super();
        this.protectRender(arguments[1]);
        this._selector = selector;
    }

    get selector(): string {
        return this._selector;
    }

    protected abstract declare(): string;
    private protectRender(html: string) {
        this.html = this.declare();
        if (!this.html)
            this.html = html;
        if (!this.html)
            throw new Exception('view template is empty!');
    }

    async render(): Promise<View> {

        if (this.data == null) {
            throw new Exception('view data is not assigned!');
        }
        if (this._rendered) {
            throw new Exception('view already rendered!');
        }

        var engine = this["`container"].resolve(ITemplateEngine);
        this.html = await engine.parse(this);
        this._rendered = true;
        return new Promise<View>(resolve => resolve(this));
    }
}