module geranium.runtime {
    export abstract class AppSettings {
        private settings_storage: storage.interfaces.IStorage;
        constructor() {
            AppSettings._current = this;
        }

        private static _current: AppSettings;
        static get Current(): AppSettings {
            if (AppSettings._current == null)
                new _AppSettings();
            return AppSettings._current;
        }

        private static initialized: boolean = false;
        static init(settings: {
            logger?: exceptions.logging.ILogger,
            request?: backend.abstract.Request,
            communicator?: backend.interfaces.ICommunicator,
            templating?: templating.interfaces.ITemplating,
            storage?: storage.interfaces.IStorage,
            states?: storage.interfaces.IGenericStorage<states.State>,
            viewengine?: viewengine.interfaces.IViewEngine,
        }) {
            if (AppSettings.initialized)
                throw new Error('Application settings already initialized!');

            if (settings) {
                Object.assign(this, settings);
                AppSettings.initialized = true;
            }
        }

        logger: exceptions.logging.ILogger = new exceptions.ConsoleLogger();
        request: backend.abstract.EventRequest = new backend.AjaxRequest((x) => { console.log(x); });
        communicator: backend.interfaces.ICommunicator = new backend.ajax.AjaxCommunicator();
        templating: templating.interfaces.ITemplating = new templating.MustacheTemplating();
        storage: storage.interfaces.IStorage = new WindowStorage("geranium-data-storage");
        states: storage.interfaces.IGenericStorage<states.State> = new StatesStorage("geranium-states-storage");
        viewengine: viewengine.interfaces.IViewEngine;// = new viewengine.Html5ViewEngine();
    }

    class _AppSettings extends AppSettings { }
}