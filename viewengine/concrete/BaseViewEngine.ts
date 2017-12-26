import { IViewEngine } from "../interfaces/IViewEngine";
import { ViewExecutingContext } from "../contracts/ViewExecutingContext";
import { ViewDOM } from "../../viewdom/abstract/ViewDOM";
import { ExecuteContext } from "../contracts/ExecuteContext";
import { IViewable } from "../../view/interfaces/IViewable";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { ViewPublishContext } from "../contracts/ViewPublishContext";
import GeraniumApp from "../../runtime/concrete/App";
import { IViewRenderer } from "../interfaces/IViewRenderer";
import { IBinding } from "../../binding/interfaces/IBinding";
import { Model } from "../../models/Model";

export class BaseViewEngine implements IViewEngine {
    ["`container"]: ICoherenceContainer;

    async execute(context: ViewExecutingContext): Promise<HTMLElement[]> {
        const view = await IViewEngine.ViewEngineView(context.iViewed, context.selector)
        let dom = await this.renderCenveyor(view);
        return await this.bind(dom, view.data);
    }

    private async bind(dom: HTMLElement[], model: Model) {
        const bindings = this["`container"].resolveAll(IBinding);
        const bindingContext = new BindContext(dom, model);
        const viewbinder = this["`container"].resolve(IViewBinder);
        return await viewbinder.bind(bindingContext);
    }

    private async renderCenveyor(view: ViewDOM) {
        let dom = await view.DOM();
        const model = view.data;
        const renderers = GeraniumApp.resolveAll(IViewRenderer);
        return renderers.map(renderer => renderer.render(dom, model))
            .reduce((p, n) => p.concat(n));
    }
}