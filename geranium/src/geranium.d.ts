/// <reference path="../declare/jquery.d.ts" />
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
declare namespace geranium.routing.contracts {
    class Route {
        url: string;
        ctor: {
            new (...args: any[]): viewmodels.abstract.ViewModel;
        };
        selector: string;
        restore: boolean;
    }
}
declare namespace geranium.routing.contracts {
    class RouteMatch extends Route {
        params: any[];
    }
}
declare namespace geranium.routing {
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
declare namespace geranium.routing.abstract {
    abstract class Router {
        abstract Current<T extends viewmodels.abstract.ViewModel>(): T;
        readonly routes: contracts.Route[];
        routeByUrl(url: string): contracts.RouteMatch;
        abstract route(current: contracts.RouteMatch): any;
        abstract routearea(): string;
        abstract match(url: string, params?: string[]): contracts.RouteMatch;
    }
}
declare namespace geranium.routing {
    class BasicRouter extends abstract.Router {
        Current<T extends viewmodels.abstract.ViewModel>(): T;
        _current: any;
        routearea(): string;
        route(current: contracts.RouteMatch): void;
        match(url: string, params?: string[]): contracts.RouteMatch;
    }
}
declare namespace geranium.history.contracts {
    class HistoryItem {
        title: string;
        url: string;
        state: any;
    }
}
declare namespace geranium.history.interfaces {
    interface IHistory {
        extend(hitem: contracts.HistoryItem): any;
        restore(state: any): any;
    }
}
declare namespace geranium.history {
    class Html5HistoryAPI implements interfaces.IHistory {
        extend(hitem: contracts.HistoryItem): void;
        restore(state: any): void;
    }
}
declare namespace geranium.history {
    function is(constructor: any): boolean;
}
declare namespace geranium.behaviors.events {
    abstract class Event<T> {
        raise(args: T): void;
        private _requestEvents;
        bind: ((args: T) => void);
        unbind: ((args: T) => void);
    }
}
declare namespace geranium.runtime.storage.interfaces {
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
declare namespace geranium.runtime.storage.interfaces {
    interface IGenericStorage<T> extends IStorage {
        all(): T[];
    }
}
declare namespace geranium.runtime.abstract {
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
declare namespace geranium.runtime {
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
declare namespace geranium.runtime {
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
declare namespace geranium.runtime {
    class StatesStorage extends WindowStorage implements storage.interfaces.IGenericStorage<states.State> {
        all(): states.State[];
    }
}
declare namespace geranium.backend.interfaces {
    interface ICommunicator {
        send<TRequest>(data: TRequest): any;
        recive<TResponse>(): TResponse;
    }
}
declare namespace geranium.backend.abstract {
    abstract class Request extends behaviors.events.Event<(<TResponse>(data: any) => PromiseLike<TResponse>)> {
        protected communicator: interfaces.ICommunicator;
        constructor(communicator: interfaces.ICommunicator);
        send<TResponse>(data: any): PromiseLike<TResponse>;
        protected abstract catchPromise(err: any): any;
    }
}
declare namespace geranium.backend.abstract {
    abstract class EventRequest extends Request {
        send<TResponse>(data: any): PromiseLike<TResponse>;
        raise(): void;
    }
}
declare namespace geranium.backend.abstract {
    abstract class StatefullRequest extends backend.abstract.EventRequest {
        constructor(communicator: interfaces.ICommunicator);
    }
}
declare class JQueryPromise<T> {
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
}
declare namespace geranium.backend.ajax {
    class AjaxCommunicator implements interfaces.ICommunicator {
        private innerPromise;
        send<TRequest extends JQueryAjaxSettings>(data: TRequest): void;
        recive<TResponse>(): Promise<TResponse>;
    }
}
declare namespace geranium.backend {
    class AjaxRequest extends abstract.StatefullRequest {
        constructor(error: {
            (err: exceptions.Exception);
        });
        catchPromise(err: any): void;
    }
}
declare namespace geranium.backend.websocket {
    class MozWebSocket extends WebSocket {
    }
}
declare namespace geranium.backend.websocket {
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
declare namespace geranium.backend {
    class WebSocketRequest extends abstract.StatefullRequest {
        constructor(endpoint: string, error: {
            (err: exceptions.Exception);
        });
        catchPromise(err: any): void;
    }
}
declare namespace geranium.exceptions {
    class Exception extends Error {
        private msg;
        constructor(msg: string);
        readonly pure: string;
    }
}
declare namespace geranium.exceptions.logging {
    interface ILogger {
        log(err: Error): any;
        get(): string;
    }
}
declare namespace geranium.exceptions {
    class ConsoleLogger implements logging.ILogger {
        private logOflog;
        log(err: Error): void;
        get(): string;
    }
}
declare namespace geranium.models.abstract {
    abstract class Model extends behaviors.events.Event<Model> {
        obtain(data: any): void;
        sync(): Promise<void>;
        readonly synchronizer: {};
        validators: validating.validator.interfaces.IValidator[];
    }
}
declare namespace geranium.binding.interfaces {
    interface IBinding<TDOM> {
        bind(objectDOM: TDOM, model: any): any;
    }
}
declare namespace geranium.binding.abstract {
    abstract class Binding<T> implements interfaces.IBinding<T> {
        bind(DOM: T, model: any): Promise<void>;
        abstract detection(DOMObject: T): T[];
        abstract binding(DOMObject: T, model: any): any;
        abstract clear(DOMObject: T): any;
    }
}
declare namespace geranium.binding.JQueryBindings.base {
    abstract class JQueryBinding extends abstract.Binding<JQuery> {
        readonly abstract attribute: string;
        detection(DOM: JQuery): JQuery[];
    }
}
declare namespace geranium.binding.JQueryBindings.base {
    abstract class JQueryByAttributeBinding extends JQueryBinding {
        clear(DOMObject: JQuery): void;
        detection(DOM: JQuery): JQuery[];
    }
}
declare namespace geranium.binding.JQueryBindings {
    class JQueryCollectionBinding extends JQueryBindings.base.JQueryByAttributeBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): Promise<void>;
    }
}
declare namespace geranium.binding.JQueryBindings {
    class JQueryClickBinding extends base.JQueryByAttributeBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): void;
        private splitMethodAndParams(value);
        private parseParams(params);
    }
}
declare namespace geranium.binding.JQueryBindings {
    class JQueryFieldBinding extends base.JQueryByAttributeBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: models.abstract.Model): void;
    }
}
declare namespace geranium.binding.JQueryBindings {
    class JQueryInputBinding extends base.JQueryBinding {
        readonly attribute: string;
        binding(DOMObject: JQuery, model: any): void;
        clear(): void;
    }
}
declare namespace geranium.states {
    abstract class State extends models.abstract.Model {
        constructor();
        static get<T>(type: {
            new (...args: any[]): T;
        }): T;
        remove(): boolean;
    }
}
declare namespace geranium.templating.contracts {
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
declare namespace geranium.templating {
    class BackendTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
    }
}
declare namespace geranium.templating {
    class MustacheTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string>;
    }
}
declare namespace geranium.view.abstract {
    abstract class View extends templating.contracts.Template {
        private _selector;
        private _rendered;
        constructor(selector: string);
        readonly selector: string;
        protected abstract declare(): string;
        private protectRender(html);
        render(): Promise<View>;
    }
}
declare namespace geranium.viewDOM.interfaces {
    interface IViewDOM {
        getViewDOM<T>(): T;
    }
}
declare namespace geranium.viewDOM.abstract {
    abstract class ViewDOM implements viewDOM.interfaces.IViewDOM {
        private _view;
        readonly view: view.abstract.View;
        constructor(view: view.abstract.View);
        abstract getViewDOM<T>(): T;
    }
}
declare namespace geranium.viewDOM {
    class JQueryViewDOM extends abstract.ViewDOM {
        private _$html;
        getViewDOM(): JQuery;
    }
}
declare namespace geranium.viewbinding.contracts {
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
declare namespace geranium.viewbinding.interfaces {
    interface IViewBinder {
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
    }
}
declare namespace geranium.viewbinding.abstract {
    abstract class ViewBinder implements interfaces.IViewBinder {
        private viewDOM;
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
        private valid(ViewDOM);
        private exec(ViewDOM, bindings);
        protected abstract binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: {
            new <T>(...args: any[]): binding.abstract.Binding<T>;
        }): Promise<void>;
    }
}
declare namespace geranium.viewbinding {
    class JQueryViewBinder extends abstract.ViewBinder {
        protected binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: {
            new <T>(...args: any[]): binding.abstract.Binding<T>;
        }): Promise<void>;
    }
}
declare namespace geranium.viewengine.contracts {
    class ViewExecutingContext {
        iViewed: view.interfaces.IViewed;
        selector: string;
    }
}
declare namespace geranium.viewengine.contracts {
    class ExecuteContext {
        view: view.interfaces.IViewed;
        selector: string;
        bindingFlags: {
            new <T>(...args: any[]): binding.abstract.Binding<T>;
        }[];
        constructor(viewCtx: ViewExecutingContext, bindingFlags?: {
            new <T>(...args: any[]): binding.abstract.Binding<T>;
        }[]);
    }
}
declare namespace geranium.viewengine.interfaces {
    interface IViewEngine {
        execute(context: contracts.ViewExecutingContext): Promise<viewDOM.abstract.ViewDOM>;
    }
}
declare namespace geranium.viewengine.abstract {
    abstract class ViewEngine implements interfaces.IViewEngine {
        execute(context: contracts.ViewExecutingContext): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
        private completeview(iviewed, selector);
    }
}
declare namespace geranium.viewengine {
    class JQueryViewEngine extends abstract.ViewEngine {
        protected publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
    }
}
declare namespace geranium.validating.contracts {
    class ValidationResult {
        success: boolean;
        errors: exceptions.Exception[];
    }
}
declare namespace geranium.validating.validator.interfaces {
    interface IValidator {
        readonly validatedPropertyName: string;
        validate<T>(value: T): contracts.ValidationResult;
    }
}
declare namespace geranium.validating.validator {
    class NotZeroValidator implements validator.interfaces.IValidator {
        readonly validatedPropertyName: string;
        constructor(propName: string);
        validate(value: number): contracts.ValidationResult;
    }
}
declare namespace geranium.validating.reporter.interfaces {
    interface IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): any;
    }
}
declare namespace geranium.validating.reporter {
    class NotifyValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
    }
}
declare namespace geranium.validating.reporter {
    class JQueryViewValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult): void;
    }
}
declare namespace geranium.viewstate {
    abstract class ViewState extends states.State implements view.interfaces.IViewed {
        constructor(selector: string);
        abstract view(): {
            new (selector: string): view.abstract.View;
        } | string;
    }
}
declare namespace geranium.viewmodels.abstract {
    abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        private publishedViewDom;
        protected readonly markup: viewDOM.abstract.ViewDOM;
        display(selector: string): Promise<void>;
        documentTitle(): string;
        abstract view(): {
            new (selector: string): view.abstract.View;
        } | string;
    }
}
declare namespace geranium.runtime {
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
declare namespace geranium {
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
import Routed = geranium.routing.routed;
import Routeroot = geranium.routing.routeroot;
import Routeignore = geranium.routing.routeignore;
import IValidatingReporter = geranium.validating.reporter.interfaces.IValidatingReporter;
import ValidationResult = geranium.validating.contracts.ValidationResult;
import Exception = geranium.exceptions.Exception;
declare var Materialize: any;
declare class MaterializeValidationRepoter implements IValidatingReporter {
    report(viewDOM: geranium.viewDOM.abstract.ViewDOM, validatingResult: geranium.validating.contracts.ValidationResult): void;
}
declare class RangeValidator implements IValidator {
    constructor(prop: string, min: number, max: number, strict: boolean);
    private strict;
    private min;
    private max;
    validatedPropertyName: string;
    validate(value: number): ValidationResult;
}
declare class TypeValidator implements IValidator {
    _type: string;
    constructor(prop: string, type: string);
    validatedPropertyName: string;
    validate(value: any): ValidationResult;
}
declare class NotLessThenZeroValidator implements IValidator {
    constructor(prop: string);
    validatedPropertyName: string;
    validate(value: number): ValidationResult;
}
declare class trains extends State {
    readonly synchronizer: {
        url: string;
        method: string;
        data: {
            command: string;
        };
    };
    data: train[];
}
declare class train {
    name: string;
    stations: number;
    now: number;
}
declare class time extends ViewState {
    view(): string;
    readonly synchronizer: {
        url: string;
        method: string;
    };
    time: string;
}
declare class app extends ViewModel {
    constructor(routes?: any[]);
    view(): string;
    btn_trip: string;
    btn_schedule: string;
    show_trip(): void;
    show_schedule(): void;
    documentTitle(): string;
}
declare class trip extends ViewModel {
    constructor(routes?: any[]);
    private init(routes?);
    view(): string;
    name: string;
    stations: number;
    _now: number;
    now: number;
    jumpto: number;
    increment(): void;
    decrement(): void;
    jump(): void;
    progressBar(): void;
    documentTitle(): string;
    validators: IValidator[];
}
interface JQuery {
    findAndfilter(query: string): JQuery;
    jhtml(element: JQuery): JQuery;
    outerHtml(): string;
    collapsible(): any;
}
declare namespace geranium.runtime.reflection {
    class Property {
        static redefine(target: any, name: string, get: (val: any) => any, set: (val: any) => any): void;
    }
    class PropertyEvent extends behaviors.events.Event<PropertyAccessor> {
    }
    class PropertyAccessor {
        val: any;
        _val: any;
    }
}
declare namespace geranium.viewmodels.contracts {
    class ViewModelHistoryState {
        ctor: any;
        selector: string;
        constructor(fields?: {
            ctor?: any;
            selector?: string;
        });
    }
}
declare namespace geranium.view.interfaces {
    interface IViewed {
        view(): {
            new (selector: string): view.abstract.View;
        } | string;
    }
}
