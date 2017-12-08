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
import { IValidatingReporter } from "../../validating/reporter/interfaces/ivalidatatingreporter";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";

class App extends IApp {

    private static containerNameConst: string = "`geranium-container";

    get container(): ICoherenceContainer {
        this.checkInstance();

        let global = window[App.containerNameConst]
        if (!global) {
            global = window[App.containerNameConst] = new InMemoryContainer();
        }
        return global;
    }

    private instantiated: boolean = false;
    instantiate(geranium: IGeranium) {
        if (this.instantiated) {
            throw new InstantiatedException("GeraniumApp.instantiate");
        }

        Object.assign(geranium, geraniumDefault);

        window[App.containerNameConst] = geranium.container ? new geranium.container() : new InMemoryContainer();
        this.container.register(ICommunicator, new geranium.communicator());
        this.container.register(IHistory, new geranium.historyprovider());
        this.container.register(ILogger, new geranium.logger());
        this.container.register(IRequest, new geranium.request());
        this.container.register(IRouter, new geranium.router());
        this.container.register(IStateManager, new geranium.statemanager());
        this.container.register(IStorage, new geranium.storage());
        this.container.register(ITemplateEngine, new geranium.templating());
        this.container.register(IValidatingReporter, new geranium.validationreporter());
        this.container.register(IViewBinder, new geranium.viewbinder());
        geranium.bindings.forEach(binding => {
            this.container.register(IBinding, new binding());
        })

        this.instantiated = true;
    }

    private checkInstance() {
        if (!this.instantiated) {
            this.instantiate({});
        }
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

function getApp(): ICoherenceContainer {
    if (!window["`GeraniumApp"]) {
        window["`GeraniumApp"] = new App();
    }
    return window["`GeraniumApp"].container;
}

var GeraniumApp = getApp();

export default GeraniumApp;