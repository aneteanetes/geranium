import { IApp } from "../interfaces/IApp";
import { ICoherenceContainer, Life } from "../../coherence/interfaces/ICoherenceContainer";
import { ContainerNotInitializedException } from "../../exceptions/coherence/ContainerNotInitializedException";
import { InMemoryContainer } from "../../coherence/concrete/InMemoryContainer";
import { IGeranium } from "../interfaces/IGeranium";
import { AjaxCommunicator } from "../../backend/concrete/ajax/AjaxCommunicator";
import { InstantiatedException } from "../../exceptions/runtime/InstantiatedException";
import { Html5HistoryAPI } from "../../history/concrete/Html5HistoryAPI";
import { ConsoleLogger } from "../../exceptions/logging/concrete/ConsoleLogger";
import { AjaxRequest } from "../../backend/concrete/ajax/AjaxRequest";
import { BasicRouter } from "../../routing/concrete/BasicRouter";
import { IStateManager } from "../../states/interfaces/IStateManager";
import { LocalStorage } from "../../storage/concrete/LocalStorage";
import { ClientTemplateEngine } from "../../templating/concrete/mustache/ClientTemplateEngine";
import { NotifyValidatingReporter } from "../../validating/reporter/concrete/NotifyValidatingReporter";
import { BaseViewBinder } from "../../viewbinding/concrete/BaseViewBinder";
import { BaseFieldBinding } from "../../binding/concrete/BaseFieldBinding";
import { EventBinding } from "../../binding/concrete/EventBinding";
import { BaseInputBinding } from "../../binding/concrete/BaseInputBinding";
import { ICommunicator } from "../../backend/interfaces/ICommunicator";
import { IHistory } from "../../history/interfaces/IHistory";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { IRequest } from "../../backend/interfaces/IRequest";
import { IRouter } from "../../routing/interfaces/IRouter";
import { IStorage } from "../../storage/interfaces/IStorage";
import { ITemplateEngine } from "../../templating/interfaces/ITemplateEngine";
import { IValidatingReporter } from "../../validating/reporter/interfaces/IValidatatingReporter";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/IBinding";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import { BaseViewEngine } from "../../viewengine/concrete/BaseViewEngine";
import { BaseViewPublisher } from "../../viewengine/concrete/BaseViewPublisher";
import { IViewPublisher } from "../../viewengine/interfaces/IViewPublisher";
import { Constructor } from "../../structures/Constructor";
import { PropertyRenderer } from "../../viewengine/concrete/Renderers/PropertyRenderer";
import { IViewRenderer } from "../../viewengine/interfaces/IViewRenderer";

class App implements IApp {
    ["`container"]: ICoherenceContainer;
    public static containerProperty: string = "`GeraniumApp";
    private instantiated: boolean = false;

    register<T extends IInjected>(type: Function | (new (...args: any[]) => T), value: Function | (new (...args: any[]) => T)): void {
        return this["`container"].register(type, value);
    }
    resolve<T extends IInjected>(type: Function | (new (...args: any[]) => T)): T {
        return this["`container"].resolve(type);
    }
    resolveAll<T extends IInjected>(type: Function | (new (...args: any[]) => T)): T[] {
        return this["`container"].resolveAll(type);
    }
    release<T extends IInjected>(type: Function | (new (...args: any[]) => T)) {
        return this["`container"].release(type);
    }
    instantiate<T extends IInjected>(type: any, params?: any[]): T {
        return this["`container"].instantiate(type, params);
    }
    all(): any[] {
        return this["`container"].all();
    }
    isregistered<T extends IInjected>(type: Constructor<T>): boolean {
        return this["`container"].isregistered(type);
    }

    start(geranium?: IGeranium) {
        if (this.instantiated) {
            throw new InstantiatedException("GeraniumApp.instantiate");
        }

        /** apply settings */
        Object.assign(geranium, geraniumDefault);

        /** apply container */
        this["`container"] = geranium.container ? new geranium.container() : new InMemoryContainer();

        /** register all settings */
        this.internalRegister(geranium);

        this.instantiated = true;
    }

    private internalRegister(geranium: IGeranium) {
        this["`container"].register(ICommunicator, geranium.communicator, Life.Transient);
        this["`container"].register(IHistory, geranium.historyprovider, Life.Singleton);
        this["`container"].register(ILogger, geranium.logger, Life.Transient);
        this["`container"].register(IRequest, geranium.request, Life.Transient);
        this["`container"].register(IRouter, geranium.router, Life.Singleton);
        this["`container"].register(IStateManager, geranium.statemanager, Life.Singleton);
        this["`container"].register(IStorage, geranium.storage, Life.Singleton);
        this["`container"].register(ITemplateEngine, geranium.templating, Life.Transient);
        this["`container"].register(IValidatingReporter, geranium.validationreporter, Life.Transient);
        this["`container"].register(IViewBinder, geranium.viewbinder, Life.Singleton);
        this["`container"].register(IViewEngine, geranium.viewengine, Life.Singleton);
        this["`container"].register(IViewPublisher, geranium.viewpublisher, Life.Singleton);
        geranium.renderers.forEach(renderer => {
            this["`container"].register(IViewRenderer, renderer, Life.Singleton);
        })
        geranium.bindings.forEach(binding => {
            this["`container"].register(IBinding, binding, Life.Transient);
        });
    }
}

const geraniumDefault: IGeranium = {
    communicator: AjaxCommunicator,
    historyprovider: Html5HistoryAPI,
    logger: ConsoleLogger,
    request: AjaxRequest,
    router: BasicRouter,
    statemanager: InMemoryContainer,
    storage: LocalStorage,
    templating: ClientTemplateEngine,
    validationreporter: NotifyValidatingReporter,
    viewbinder: BaseViewBinder,
    viewengine: BaseViewEngine,
    viewpublisher: BaseViewPublisher,
    renderers: [
        PropertyRenderer
    ],
    bindings: [
        BaseFieldBinding as any,
        BaseInputBinding,
        EventBinding
    ]
}

function getApp(): IApp {
    if (!window[App.containerProperty]) {
        window[App.containerProperty] = new App();
    }
    return window[App.containerProperty];
}

/** Application intance with in-build container */
var GeraniumApp = getApp();

/** Application intance with in-build container */
export default GeraniumApp;