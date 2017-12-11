import { IApp } from "../interfaces/IApp";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
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
import { BaseClickBinding } from "../../binding/concrete/BaseClickBinding";
import { BaseInputBinding } from "../../binding/concrete/BaseInputBinding";
import { BaseCollectionBinding } from "../../binding/concrete/BaseCollectionBinding";
import { ICommunicator } from "../../backend/interfaces/ICommunicator";
import { IHistory } from "../../history/interfaces/IHistory";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { IRequest } from "../../backend/interfaces/IRequest";
import { IRouter } from "../../routing/interfaces/IRouter";
import { IStorage } from "../../storage/interfaces/IStorage";
import { ITemplateEngine } from "../../templating/interfaces/ITemplateEngine";
import { IValidatingReporter } from "../../validating/reporter/interfaces/IValidatatingReporter";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";
import { IInjected } from "../../coherence/interfaces/IInjected";

class App implements IApp {
    ["`container"]: ICoherenceContainer;
    public static containerProperty: string = "`GeraniumApp";
    private instantiated: boolean = false;

    register = this["`container"].register;
    resolve = this["`container"].resolve;
    resolveAll = this["`container"].resolveAll;
    release = this["`container"].release;
    all = this["`container"].all;
    instantiate = this["`container"].instantiate;

    start(geranium: IGeranium) {
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
        this["`container"].register(ICommunicator, new geranium.communicator());
        this["`container"].register(IHistory, new geranium.historyprovider());
        this["`container"].register(ILogger, new geranium.logger());
        this["`container"].register(IRequest, new geranium.request());
        this["`container"].register(IRouter, new geranium.router());
        this["`container"].register(IStateManager, new geranium.statemanager());
        this["`container"].register(IStorage, new geranium.storage());
        this["`container"].register(ITemplateEngine, new geranium.templating());
        this["`container"].register(IValidatingReporter, new geranium.validationreporter());
        this["`container"].register(IViewBinder, new geranium.viewbinder());
        geranium.bindings.forEach(binding => {
            this["`container"].register(IBinding, new binding());
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
    bindings: [
        BaseFieldBinding as any,
        BaseInputBinding,
        BaseClickBinding,
        BaseCollectionBinding
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