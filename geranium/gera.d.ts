/// <reference path="declare/typings/jquery.d.ts" />
/// <reference path="declare/typings/reflect-metadata.d.ts" />
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
declare var Mustache: any;
declare module geranium.routing.contracts {
    class Route {
        url: string;
        ctor: {
            new (...args: any[]): viewmodels.abstract.ViewModel;
        };
        selector: string;
        restore: boolean;
    }
}
declare module geranium.routing.contracts {
    class RouteMatch extends Route {
        params: any[];
    }
}
declare module geranium.routing {
    var settings: {
        clearUrl: boolean;
    };
    function routes(): contracts.Route[];
    function urlFromCtor(ctor: any): string;
    function urlFromCtor(ctor: any, params: string[]): string;
    function routed(constructor: any): void;
    function routeignore(constructor: any): void;
    function routeroot(constructor: any): void;
}
declare module geranium.routing.abstract {
    abstract class Router {
        abstract Current<T extends viewmodels.abstract.ViewModel>(): T;
        readonly routes: contracts.Route[];
        routeByUrl(url: string): contracts.RouteMatch;
        abstract route(current: contracts.RouteMatch): any;
        abstract routearea(): string;
        abstract match(url: string, params?: string[]): contracts.RouteMatch;
    }
}
declare module geranium.routing {
    class BasicRouter extends abstract.Router {
        Current<T extends viewmodels.abstract.ViewModel>(): T;
        _current: any;
        routearea(): string;
        route(current: contracts.RouteMatch): void;
        match(url: string, params?: string[]): contracts.RouteMatch;
    }
}
declare module geranium.history.contracts {
    class HistoryItem {
        title: string;
        url: string;
        state: any;
    }
}
declare module geranium.history.interfaces {
    interface IHistory {
        extend(hitem: contracts.HistoryItem): any;
        restore(state: any): any;
    }
}
declare module geranium.history {
    class Html5HistoryAPI implements interfaces.IHistory {
        extend(hitem: contracts.HistoryItem): void;
        restore(state: any): void;
    }
}
declare module geranium.history {
    function is(constructor: any): boolean;
}
declare module geranium.behaviors.events {
    abstract class Event<T> {
        raise(args: T): void;
        private _requestEvents;
        bind: ((args: T) => void);
        unbind: ((args: T) => void);
    }
}
declare module geranium.runtime.storage.interfaces {
    interface IStorage {
        add(model: any): boolean;
        remove<T>(type: {
            new (...args: any[]): T;
        }): boolean;
        get<T>(type: {
            new (...args: any[]): T;
        }): T;
    }
}
declare module geranium.runtime.storage.interfaces {
    interface IGenericStorage<T> extends IStorage {
        all(): T[];
    }
}
declare module geranium.runtime.abstract {
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
declare module geranium.runtime {
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
}
declare module geranium.runtime {
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
}
declare module geranium.runtime {
    class StatesStorage extends WindowStorage implements storage.interfaces.IGenericStorage<states.State> {
        all(): states.State[];
    }
}
declare module geranium.backend.interfaces {
    interface ICommunicator {
        send<TRequest>(data: TRequest): any;
        recive<TResponse>(): TResponse;
    }
}
declare module geranium.backend.abstract {
    abstract class Request extends behaviors.events.Event<(<TResponse>(data: any) => PromiseLike<TResponse>)> {
        protected communicator: interfaces.ICommunicator;
        constructor(communicator: interfaces.ICommunicator);
        send<TResponse>(data: any): PromiseLike<TResponse>;
        protected abstract catchPromise(err: any): any;
    }
}
declare module geranium.backend.abstract {
    abstract class EventRequest extends Request {
        send<TResponse>(data: any): PromiseLike<TResponse>;
        raise(): void;
    }
}
declare module geranium.backend.abstract {
    abstract class StatefullRequest extends backend.abstract.EventRequest {
        constructor(communicator: interfaces.ICommunicator);
    }
}
declare class JQueryPromise<T> {
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
}
declare module geranium.backend.ajax {
    class AjaxCommunicator implements interfaces.ICommunicator {
        private innerPromise;
        send<TRequest extends JQueryAjaxSettings>(data: TRequest): void;
        recive<TResponse>(): Promise<TResponse>;
    }
}
declare module geranium.backend {
    class AjaxRequest extends abstract.StatefullRequest {
        constructor(error: {
            (err: exceptions.Exception);
        });
        catchPromise(err: any): void;
    }
}
declare class MozWebSocket extends WebSocket {
}
declare module geranium.backend.websocket {
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
declare module geranium.backend {
    class WebSocketRequest extends abstract.StatefullRequest {
        constructor(endpoint: string, error: {
            (err: exceptions.Exception);
        });
        catchPromise(err: any): void;
    }
}
declare module geranium.exceptions {
    class Exception extends Error {
        private msg;
        constructor(msg: string);
        readonly pure: string;
    }
}
declare module geranium.exceptions.logging {
    interface ILogger {
        log(err: Error): any;
        get(): string;
    }
}
declare module geranium.exceptions {
    class ConsoleLogger implements logging.ILogger {
        private logOflog;
        log(err: Error): void;
        get(): string;
    }
}
declare module geranium.models.abstract {
    abstract class Model extends behaviors.events.Event<any> {
        readonly refreshable: boolean;
        readonly params: {};
        obtain(data: any): void;
        validators: validating.validator.interfaces.IValidator[];
        protected abstract autoupdate(): boolean | {};
    }
}
declare module geranium.binding.interfaces {
    interface IBinding<TDOM> {
        bind(objectDOM: TDOM, model: any): any;
    }
}
declare module geranium.binding.abstract {
    abstract class Binding<T> implements interfaces.IBinding<T> {
        bind(DOM: T, model: any): Promise<void>;
        abstract detection(DOMObject: T): T[];
        abstract binding(DOMObject: T, model: any): any;
        abstract clear(DOMObject: T): any;
    }
}
declare module geranium.binding.JQueryBindings.base {
    abstract class JQueryBinding extends abstract.Binding<JQuery> {
        readonly abstract attribute: string;
        detection(DOM: JQuery): JQuery[];
    }
}
declare module geranium.binding.JQueryBindings.base {
    abstract class JQueryByAttributeBinding extends JQueryBinding {
        clear(DOMObject: JQuery): void;
        detection(DOM: JQuery): JQuery[];
    }
}
declare module geranium.binding.JQueryBindings {
    class JQueryClickBinding extends base.JQueryByAttributeBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): void;
    }
}
declare module geranium.binding.JQueryBindings {
    class JQueryFieldBinding extends base.JQueryByAttributeBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): void;
    }
}
declare module geranium.binding.JQueryBindings {
    class JQueryInputBinding extends base.JQueryBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): void;
        clear(): void;
    }
}
declare module geranium.states {
    abstract class State extends models.abstract.Model {
        constructor();
        static get<T>(type: {
            new (...args: any[]): T;
        }): T;
        remove(): boolean;
    }
}
declare module geranium.templating.contracts {
    class Template {
        html: string;
        data: any;
    }
}
declare namespace geranium.templating.interfaces {
    interface ITemplating {
        parse<TTemplate extends contracts.Template>(template: TTemplate): PromiseLike<string>;
    }
}
declare module geranium.templating {
    class BackendTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
    }
}
declare module geranium.templating {
    class MustacheTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
    }
}
declare module geranium.view.abstract {
    abstract class View extends templating.contracts.Template {
        private _selector;
        private _rendered;
        constructor(selector: string);
        readonly selector: string;
        protected abstract declare(): string;
        render(): Promise<View>;
    }
}
declare module geranium.viewDOM.interfaces {
    interface IViewDOM {
        getViewDOM<T>(): T;
    }
}
declare module geranium.viewDOM.abstract {
    abstract class ViewDOM implements viewDOM.interfaces.IViewDOM {
        private _view;
        readonly view: view.abstract.View;
        constructor(view: view.abstract.View);
        abstract getViewDOM<T>(): T;
    }
}
declare module geranium.viewDOM {
    class JQueryViewDOM extends abstract.ViewDOM {
        private _$html;
        getViewDOM(): JQuery;
    }
}
declare module geranium.viewbinding.contracts {
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
declare module geranium.viewbinding.interfaces {
    interface IViewBinder {
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
    }
}
declare module geranium.viewbinding.abstract {
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
declare module geranium.viewbinding {
    class JQueryViewBinder extends abstract.ViewBinder {
        protected binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: {
            new <T>(...args: any[]): binding.abstract.Binding<T>;
        }): void;
    }
}
declare module geranium.viewengine.contracts {
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
declare module geranium.viewengine.interfaces {
    interface IViewEngine {
        execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM>;
    }
}
declare module geranium.viewengine.abstract {
    abstract class ViewEngine implements interfaces.IViewEngine {
        execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
    }
}
declare module geranium.viewengine {
    class JQueryViewEngine extends abstract.ViewEngine {
        protected publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
    }
}
declare module geranium.validating.contracts {
    class ValidationResult {
        success: boolean;
        errors: exceptions.Exception[];
    }
}
declare module geranium.validating.validator.interfaces {
    interface IValidator {
        readonly validatedPropertyName: string;
        validate<T>(value: T): contracts.ValidationResult;
    }
}
declare module geranium.validating.validator {
    class NotZeroValidator implements validator.interfaces.IValidator {
        readonly validatedPropertyName: string;
        constructor(propName: string);
        validate(value: number): contracts.ValidationResult;
    }
}
declare module geranium.validating.reporter.interfaces {
    interface IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): any;
    }
}
declare module geranium.validating.reporter {
    class NotifyValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
    }
}
declare module geranium.validating.reporter {
    class JQueryViewValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
    }
}
declare module geranium.viewstate {
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
declare module geranium.viewmodels.abstract {
    abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        display(selector: string): Promise<void>;
        documentTitle(): string;
        abstract view(): {
            new (selector: string): view.abstract.View;
        };
    }
}
declare module geranium.runtime {
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
}
declare module geranium {
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
interface JQuery {
    findAndfilter(query: string): JQuery;
    jhtml(element: JQuery): JQuery;
    outerHtml(): string;
    collapsible(): any;
}
declare module geranium.runtime.reflection {
    class Property {
        /**
         * Redefines property with new public accessors, safe
         * @param target
         * @param name of property
         * @param get new public setter
         * @param set new public getter
         */
        static redefine(target: any, name: string, get: (val: any) => any, set: (val: any) => any): void;
    }
}
declare module geranium.viewmodels.contracts {
    class ViewModelHistoryState {
        ctor: any;
        selector: string;
        constructor(fields?: {
            ctor?: any;
            selector?: string;
        });
    }
}
declare module geranium.view.interfaces {
    interface IViewed {
        view(): {
            new (selector: string): view.abstract.View;
        };
    }
}
