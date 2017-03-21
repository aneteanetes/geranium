/// <reference path="declare/jquery.d.ts" />
interface Array<T> {
    remove(item: T): Array<T>;
    removeSame(): Array<T>;
    groupBy(key: string): Array<Array<T>>;
}
interface String {
    replaceAll(search: string, replacement: string): string;
    random(length: number): string;
    randomize(): string;
}
interface JQuery {
    findAndfilter(query: string): JQuery;
    jhtml(element: JQuery): JQuery;
    outerHtml(): string;
    collapsible(): any;
}
declare var Mustache: any;
declare class JQueryPromise<T> {
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
}
declare namespace geranium {
    namespace routing {
        var settings: {
            clearUrl: boolean;
        };
        function routes(): contracts.Route[];
        function urlFromCtor(ctor: any): string;
        function urlFromCtor(ctor: any, params: string[]): string;
        function routed(constructor: any): void;
        function routeignore(constructor: any): void;
        function routeroot(constructor: any): void;

        class BasicRouter extends abstract.Router {
            Current<T extends viewmodels.abstract.ViewModel>(): T;
            _current: any;
            routearea(): string;
            route(current: contracts.RouteMatch): void;
            match(url: string, params?: string[]): contracts.RouteMatch;
        }

        namespace contracts {
            class Route {
                url: string;
                ctor: {
                    new (...args: any[]): viewmodels.abstract.ViewModel;
                };
                selector: string;
                restore: boolean;
            }
            class RouteMatch extends Route {
                params: any[];
            }
        }

        namespace abstract {
            abstract class Router {
                abstract Current<T extends viewmodels.abstract.ViewModel>(): T;
                readonly routes: contracts.Route[];
                routeByUrl(url: string): contracts.RouteMatch;
                abstract route(current: contracts.RouteMatch): any;
                abstract routearea(): string;
                abstract match(url: string, params?: string[]): contracts.RouteMatch;
            }
        }
    }
    namespace history {
        function is(constructor: any): boolean;
        class Html5HistoryAPI implements interfaces.IHistory {
            extend(hitem: contracts.HistoryItem): void;
            restore(state: any): void;
        }
        namespace contracts {
            class HistoryItem {
                title: string;
                url: string;
                state: any;
            }
        }
        namespace interfaces {
            interface IHistory {
                extend(hitem: contracts.HistoryItem): any;
                restore(state: any): any;
            }
        }
    }
    namespace behaviors {
        namespace events {
            abstract class Event<T> {
                raise(args: T): void;
                private _requestEvents;
                bind: ((args: T) => void);
                unbind: ((args: T) => void);
            }
        }
    }
    namespace runtime {
        abstract class AppSettings {
            private static initialized;
            init(settings: {
                logger?: exceptions.logging.ILogger;
                request?: backend.abstract.Request;
                communicator?: backend.interfaces.ICommunicator;
                templating?: templating.interfaces.ITemplating;
                storage?: storage.interfaces.IStorage;
                states?: storage.interfaces.IGenericStorage<states.State>;
                viewbinder?: viewbinding.abstract.ViewBinder;
                validreport?: validating.reporter.interfaces.IValidatingReporter;
                viewengine?: viewengine.interfaces.IViewEngine;
                router?: routing.abstract.Router;
                history?: history.interfaces.IHistory;
                bidnings?: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }[];
            }): void;
            readonly logger: exceptions.logging.ILogger;
            readonly request: backend.abstract.EventRequest;
            readonly communicator: backend.interfaces.ICommunicator;
            readonly templating: templating.interfaces.ITemplating;
            readonly storage: storage.interfaces.IStorage;
            readonly states: storage.interfaces.IGenericStorage<states.State>;
            readonly validreport: validating.reporter.interfaces.IValidatingReporter;
            readonly viewbinder: viewbinding.abstract.ViewBinder;
            readonly viewengine: viewengine.abstract.ViewEngine;
            readonly router: routing.abstract.Router;
            readonly history: history.interfaces.IHistory;
            readonly bidnings: {
                new <T>(...args: any[]): binding.abstract.Binding<T>;
            }[];
        }
        var appSettings: AppSettings;

        class LocalStorage extends abstract.LoggedStorage {
            add(model: any): boolean;
            remove<T>(type: {
                new (...args: any[]): T;
                name: string;
            }): boolean;
            get<T>(type: {
                new (...args: any[]): T;
                name: string;
            }): T;
        }
        class WindowStorage extends abstract.LoggedStorage {
            protected variable: string;
            constructor(storageName: string);
            private readonly collection;
            add(model: any): boolean;
            remove<T>(type: {
                new (...args: any[]): T;
            }): boolean;
            get<T>(type: {
                new (...args: any[]): T;
            }): T;
            private searchFor<T>(ctor);
        }
        class StatesStorage extends WindowStorage implements storage.interfaces.IGenericStorage<states.State> {
            all(): states.State[];
        }

        namespace abstract {
            abstract class LoggedStorage implements storage.interfaces.IStorage {
                abstract add(model: any): boolean;
                abstract remove<T>(type: {
                    new (...args: any[]): T;
                    name: string;
                }): boolean;
                abstract get<T>(type: {
                    new (...args: any[]): T;
                    name: string;
                }): T;
                log(ex: exceptions.Exception): void;
            }
        }

        namespace storage {
            namespace interfaces {
                interface IStorage {
                    add(model: any): boolean;
                    remove<T>(type: {
                        new (...args: any[]): T;
                    }): boolean;
                    get<T>(type: {
                        new (...args: any[]): T;
                    }): T;
                }
                interface IGenericStorage<T> extends IStorage {
                    all(): T[];
                }
            }
        }


        namespace reflection {
            class Property {
                static redefine(target: any, name: string, get: (val: any) => any, set: (val: any) => any): void;
            }
        }
    }
    namespace backend {
        class AjaxRequest extends abstract.StatefullRequest {
            constructor(error: {
                (err: exceptions.Exception);
            });
            catchPromise(err: any): void;
        }

        class WebSocketRequest extends abstract.StatefullRequest {
            constructor(endpoint: string, error: {
                (err: exceptions.Exception);
            });
            catchPromise(err: any): void;
        }

        namespace abstract {
            abstract class Request extends behaviors.events.Event<(<TResponse>(data: any) => PromiseLike<TResponse>)> {
                protected communicator: interfaces.ICommunicator;
                constructor(communicator: interfaces.ICommunicator);
                send<TResponse>(data: any): PromiseLike<TResponse>;
                protected abstract catchPromise(err: any): any;
            }

            abstract class EventRequest extends Request {
                send<TResponse>(data: any): PromiseLike<TResponse>;
                raise(): void;
            }

            abstract class StatefullRequest extends backend.abstract.EventRequest {
                constructor(communicator: interfaces.ICommunicator);
            }
        }

        namespace interfaces {
            interface ICommunicator {
                send<TRequest>(data: TRequest): any;
                recive<TResponse>(): TResponse;
            }
        }

        namespace ajax {
            class AjaxCommunicator implements interfaces.ICommunicator {
                private innerPromise;
                send<TRequest extends JQueryAjaxSettings>(data: TRequest): void;
                recive<TResponse>(): Promise<TResponse>;
            }
        }
        namespace websocket {
            class MozWebSocket extends WebSocket {
            }
            class WebSocketCommunicator implements interfaces.ICommunicator {
                protected socket: WebSocket;
                constructor(endpoint: string);
                send<TRequest>(data: TRequest): Promise<void>;
                recive<TResponse>(): PromiseLike<TResponse>;
                catchSocketError(ex: Error): void;
                private data;
                socketRecived(): Promise<void>;
                socketOpened(): Promise<void>;
            }
        }
    }
    namespace exceptions {
        class Exception extends Error {
            private msg;
            constructor(msg: string);
            readonly pure: string;
        }
        class ConsoleLogger implements logging.ILogger {
            private logOflog;
            log(err: Error): void;
            get(): string;
        }
        namespace logging {
            interface ILogger {
                log(err: Error): any;
                get(): string;
            }
        }
    }
    namespace models {
        namespace abstract {
            abstract class Model extends behaviors.events.Event<any> {
                readonly refreshable: boolean;
                readonly params: {};
                obtain(data: any): void;
                /**
                 * synchronize model with server state
                 */
                sync(): Promise<void>;
                validators: validating.validator.interfaces.IValidator[];
                protected abstract autoupdate(): boolean | {};
            }
        }
    }
    namespace binding {
        namespace interfaces {
            interface IBinding<TDOM> {
                bind(objectDOM: TDOM, model: any): any;
            }
        }
        namespace abstract {
            abstract class Binding<T> implements interfaces.IBinding<T> {
                bind(DOM: T, model: any): Promise<void>;
                abstract detection(DOMObject: T): T[];
                abstract binding(DOMObject: T, model: any): any;
                abstract clear(DOMObject: T): any;
            }
        }

        namespace JQueryBindings {
            namespace base {
                abstract class JQueryBinding extends abstract.Binding<JQuery> {
                    readonly abstract attribute: string;
                    detection(DOM: JQuery): JQuery[];
                }
                abstract class JQueryByAttributeBinding extends JQueryBinding {
                    clear(DOMObject: JQuery): void;
                    detection(DOM: JQuery): JQuery[];
                }
            }

            class JQueryClickBinding extends base.JQueryByAttributeBinding {
                readonly attribute: string;
                binding(DOMObject: JQuery, model: any): void;
                private splitMethodAndParams(value: string): { method: string, params: any[] };
                private parseParams(params: string): any[];
            }

            class JQueryFieldBinding extends base.JQueryByAttributeBinding {
                readonly attribute: string;
                binding(DOMObject: JQuery, model: any): void;
            }

            class JQueryInputBinding extends base.JQueryBinding {
                readonly attribute: string;
                binding(DOMObject: JQuery, model: any): void;
                clear(): void;
            }

            class JQueryCollectionBinding extends base.JQueryByAttributeBinding {
                readonly attribute: string;
                binding(DOMObject: JQuery, model: any): void;
            } 
        }
    }
    namespace states {
        abstract class State extends models.abstract.Model {
            constructor();
            static get<T>(type: {
                new (...args: any[]): T;
            }): T;
            remove(): boolean;
        }
    }
    namespace templating {
        class BackendTemplating implements interfaces.ITemplating {
            parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
        }
        class MustacheTemplating implements interfaces.ITemplating {
            parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
        }
        namespace interfaces {
            interface ITemplating {
                parse<TTemplate extends contracts.Template>(template: TTemplate): PromiseLike<string>;
            }
        }
        namespace contracts {
            class Template {
                html: string;
                data: any;
            }
        }
    }
    namespace view {
        namespace interfaces {
            interface IViewed {
                view(): {
                    new (selector: string): view.abstract.View;
                };
            }
        }
        namespace abstract {
            abstract class View extends templating.contracts.Template {
                private _selector;
                private _rendered;
                constructor(selector: string);
                readonly selector: string;
                protected abstract declare(): string;
                render(): Promise<View>;
            }
        }
    }
    namespace viewDOM {
        class JQueryViewDOM extends abstract.ViewDOM {
            private _$html;
            getViewDOM(): JQuery;
        }
        namespace interfaces {
            interface IViewDOM {
                getViewDOM<T>(): T;
            }
        }
        namespace abstract {
            abstract class ViewDOM implements viewDOM.interfaces.IViewDOM {
                private _view;
                readonly view: view.abstract.View;
                constructor(view: view.abstract.View);
                abstract getViewDOM<T>(): T;
            }
        }
    }
    namespace viewbinding {
        class JQueryViewBinder extends abstract.ViewBinder {
            protected binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: {
                new <T>(...args: any[]): binding.abstract.Binding<T>;
            }): void;
        }
        namespace contracts {
            class BindContext {
                viewDOM: geranium.viewDOM.abstract.ViewDOM;
                bindingFlags: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }[];
                constructor(viewDOM: geranium.viewDOM.abstract.ViewDOM, bindingFlags?: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }[]);
            }
        }
        namespace interfaces {
            interface IViewBinder {
                bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
            }
        }
        namespace abstract {
            abstract class ViewBinder implements interfaces.IViewBinder {
                private viewDOM;
                bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
                private valid(ViewDOM);
                private exec(ViewDOM, bindings);
                protected abstract binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }): any;
            }
        }
    }
    namespace viewengine {
        class JQueryViewEngine extends abstract.ViewEngine {
            protected publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
            protected viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
        }
        namespace abstract {
            abstract class ViewEngine implements interfaces.IViewEngine {
                execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM>;
                protected abstract publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
                protected abstract viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
            }
        }
        namespace interfaces {
            interface IViewEngine {
                execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM>;
            }
        }
        namespace contracts {
            class ExecuteContext {
                view: view.abstract.View;
                bindingFlags: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }[];
                constructor(view: view.abstract.View, bindingFlags?: {
                    new <T>(...args: any[]): binding.abstract.Binding<T>;
                }[]);
            }
        }
    }
    namespace validating {
        namespace contracts {
            class ValidationResult {
                success: boolean;
                errors: exceptions.Exception[];
            }
        }
        namespace reporter {
            class JQueryViewValidatingReporter implements reporter.interfaces.IValidatingReporter {
                report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
            }
            class NotifyValidatingReporter implements reporter.interfaces.IValidatingReporter {
                report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
            }
            namespace interfaces {
                interface IValidatingReporter {
                    report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): any;
                }
            }
        }
        namespace validator {
            namespace interfaces {
                interface IValidator {
                    readonly validatedPropertyName: string;
                    validate<T>(value: T): contracts.ValidationResult;
                }
            }
            class NotZeroValidator implements validator.interfaces.IValidator {
                readonly validatedPropertyName: string;
                constructor(propName: string);
                validate(value: number): contracts.ValidationResult;
            }
        }
    }
    namespace viewstate {
        abstract class ViewState implements view.interfaces.IViewed {
            constructor(selector: string);
            private execute(selector);
            protected abstract state(): {
                new (...args: any[]): states.State;
            };
            abstract view(): {
                new (selector: string): view.abstract.View;
            };
        }
    }
    namespace viewmodels {
        namespace abstract {
            abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
                display(selector: string): Promise<void>;
                documentTitle(): string;
                abstract view(): {
                    new (selector: string): view.abstract.View;
                };
            }
        }
        namespace contracts {
            class ViewModelHistoryState {
                ctor: any;
                selector: string;
                constructor(fields?: {
                    ctor?: any;
                    selector?: string;
                });
            }
        }
    }

    enum color {
        purple = 0,
        darkgreen = 1,
        pink = 2,
    }
    function blossom(colorull?: color): void;
}
import appSettings = geranium.runtime.appSettings;
import Model = geranium.models.abstract.Model;
import State = geranium.states.State;
import View = geranium.view.abstract.View;
import ViewState = geranium.viewstate.ViewState;
import ViewModel = geranium.viewmodels.abstract.ViewModel;
import IValidator = geranium.validating.validator.interfaces.IValidator;
import Report = geranium.validating.reporter.interfaces.IValidatingReporter;
import Binding = geranium.binding.abstract.Binding;