import { Template } from "../../templating/contracts/Template";
import { Exception } from "../../exceptions/Exception";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ITemplateEngine } from "../../templating/interfaces/ITemplateEngine";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export abstract class View extends Template implements ViewDOM, IInjected {
    ["`container"]: ICoherenceContainer;
    private ["`selector"]: string;
    private _rendered: boolean;

    constructor() {
        super();
        this.protectRender(arguments[1]);
        this["%selector"] = arguments[0];
    }

    async DOM(): Promise<HTMLElement> {
        let view: View = this;
        if (!this._rendered) {
            view = await this.render();
        }

        const div = document.createElement("div");
        div.innerHTML = view.template;
        return div;
    }

    get selector(): string {
        return this["%selector"];
    }

    async render(): Promise<View> {

        if (this.data == null) {
            throw new Exception('view data is not assigned!');
        }
        if (this._rendered) {
            throw new Exception('view already rendered!');
        }

        var engine = this["`container"].resolve(ITemplateEngine);
        this.template = await engine.parse(this);
        this._rendered = true;
        return new Promise<View>(resolve => resolve(this));
    }

    protected abstract declare(): string;

    private protectRender(html: string) {
        this.template = this.declare();
        if (!this.template) {
            this.template = html;
        }
        if (!this.template) {
            throw new Exception('view template is empty!');
        }
    }
}