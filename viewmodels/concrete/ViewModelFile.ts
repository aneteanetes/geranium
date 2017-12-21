import { ViewModel } from "../abstract/ViewModel";
import GeraniumApp from "../../runtime/concrete/App";
import { ICommunicator } from "../../backend/interfaces/ICommunicator";
import { IRequest } from "../../backend/interfaces/IRequest";
import { XHRSettings } from "../../backend/concrete/ajax/AjaxCommunicator";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";
import { Constructor } from "../../structures/Constructor";
import { toHtmlArray } from "../../extensions/HtmlElementExtensions";
import { IStorage } from "../../storage/interfaces/IStorage";
import { IEntity } from "../../storage/interfaces/IEntity";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export abstract class ViewModelFile extends ViewModel {
    view(): Constructor<ViewDOM> {
        const url = this.htmlFileUrl;
        return class extends FileViewDOM {
            constructor() {
                super();
                if (!GeraniumApp.isregistered(TemplateCache)) {
                    GeraniumApp.register(TemplateCache, new TemplateCache());
                }
                const cache = GeraniumApp.resolve(TemplateCache);
                const cacheItem = cache.items.find(c => c.url == url);
                if (cacheItem) {
                    this.html = cacheItem.value;
                } else {
                    this.url = url;
                }
            }
        };
    }

    abstract htmlFileUrl: string;
}

class FileViewDOM extends ViewDOM {
    html: string;
    url: string;
    async DOM(): Promise<HTMLElement[]> {
        await this.prepare();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.html;
        return toHtmlArray(wrapper.childNodes);
    }

    private async prepare(): Promise<void> {
        if (!this.loaded) {
            await this.loadTemplate();
            this.cache();
        }
    }

    private get loaded(): boolean {
        return !!this.html;
    }

    private async loadTemplate() {
        const request = GeraniumApp.resolve(IRequest);
        this.html = await request.send<XHRSettings, string>({ method: "GET", url: this.url, async: true });
    }

    private cache() {
        const cache = GeraniumApp.resolve(TemplateCache);
        cache.items.push({
            url: this.url,
            value: this.html,
        });
    }
}

class TemplateCache implements IInjected {
    ["`container"]: ICoherenceContainer;
    items: TemplateCacheItem[] = [];
}

class TemplateCacheItem {
    url: string;
    value: string
}