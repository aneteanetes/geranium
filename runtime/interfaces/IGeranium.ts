import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { IRequest } from "../../backend/interfaces/IRequest";
import { ICommunicator } from "../../backend/interfaces/ICommunicator";
import { ITemplateEngine } from "../../templating/interfaces/ITemplateEngine";
import { IStorage } from "../../storage/interfaces/IStorage";
import { IStateManager } from "../../states/interfaces/IStateManager";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { IValidatingReporter } from "../../validating/reporter/interfaces/IValidatatingReporter";
import { IRouter } from "../../routing/interfaces/IRouter";
import { IHistory } from "../../history/interfaces/IHistory";
import { Constructor } from "../../structures/Constructor";
import { IBinding } from "../../binding/interfaces/IBinding";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import { IViewPublisher } from "../../viewengine/interfaces/IViewPublisher";

export class IGeranium {
    container?: Constructor<ICoherenceContainer>;
    logger?: Constructor<ILogger>;
    request?: Constructor<IRequest>
    communicator?: Constructor<ICommunicator>;
    templating?: Constructor<ITemplateEngine<any>>;
    storage?: Constructor<IStorage>;
    statemanager?: Constructor<IStateManager>;
    viewbinder?: Constructor<IViewBinder>;
    viewengine?: Constructor<IViewEngine>;
    viewpublisher?: Constructor<IViewPublisher>;
    validationreporter?: Constructor<IValidatingReporter>;
    router?: Constructor<IRouter>;
    historyprovider?: Constructor<IHistory>;
    bindings?: { new <T>(...args: any[]): IBinding }[];
}