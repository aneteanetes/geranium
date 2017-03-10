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
            viewbinder?: viewbinding.abstract.ViewBinder,
            validreport?: validating.reporter.interfaces.IValidatingReporter,
            viewengine?: viewengine.interfaces.IViewEngine,
            bidnings?: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]
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
        validreport: validating.reporter.interfaces.IValidatingReporter = new validating.reporter.JQueryViewValidatingReporter;
        viewbinder: viewbinding.abstract.ViewBinder = new viewbinding.JQueryViewBinder();        
        viewengine: viewengine.abstract.ViewEngine = new viewengine.JQueryViewEngine();
        bidnings: { new <T>(...args: any[]): binding.abstract.Binding<T> }[] = [
            binding.JQueryBindings.JQueryFieldBinding,
            binding.JQueryBindings.JQueryInputBinding,
            binding.JQueryBindings.JQueryClickBinding
        ];
    }

    class _AppSettings extends AppSettings { }
}