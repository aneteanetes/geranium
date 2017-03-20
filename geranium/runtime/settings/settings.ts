module geranium.runtime {
    export abstract class AppSettings {
        private static initialized: boolean = false;
        init(settings: {
            logger?: exceptions.logging.ILogger,
            request?: backend.abstract.Request,
            communicator?: backend.interfaces.ICommunicator,
            templating?: templating.interfaces.ITemplating,
            storage?: storage.interfaces.IStorage,
            states?: storage.interfaces.IGenericStorage<states.State>,
            viewbinder?: viewbinding.abstract.ViewBinder,
            validreport?: validating.reporter.interfaces.IValidatingReporter,
			viewengine?: viewengine.interfaces.IViewEngine,
            router?: routing.abstract.Router,
            history?: history.interfaces.IHistory,
            bidnings?: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]
        }) {
            if (AppSettings.initialized)
                throw new exceptions.Exception('Application settings already initialized!');
            if (settings) {
                Object.assign(this, settings);
                AppSettings.initialized = true;
            }
        }

		readonly logger: exceptions.logging.ILogger = new exceptions.ConsoleLogger();
		readonly request: backend.abstract.EventRequest = new backend.AjaxRequest((x) => { console.log(x); });
		readonly communicator: backend.interfaces.ICommunicator = new backend.ajax.AjaxCommunicator();
		readonly templating: templating.interfaces.ITemplating = new templating.MustacheTemplating();
		readonly storage: storage.interfaces.IStorage = new WindowStorage("geranium-data-storage");
		readonly states: storage.interfaces.IGenericStorage<states.State> = new StatesStorage("geranium-states-storage");
		readonly validreport: validating.reporter.interfaces.IValidatingReporter = new validating.reporter.JQueryViewValidatingReporter;
		readonly viewbinder: viewbinding.abstract.ViewBinder = new viewbinding.JQueryViewBinder();        
		readonly viewengine: viewengine.abstract.ViewEngine = new viewengine.JQueryViewEngine();
		readonly router: routing.abstract.Router = new routing.BasicRouter();
		readonly history: history.interfaces.IHistory = new history.Html5HistoryAPI();
		readonly bidnings: { new <T>(...args: any[]): binding.abstract.Binding<T> }[] = [
            binding.JQueryBindings.JQueryFieldBinding,
            binding.JQueryBindings.JQueryInputBinding,
            binding.JQueryBindings.JQueryClickBinding
        ];
    }

    class _AppSettings extends AppSettings { }

    export var appSettings: AppSettings = new _AppSettings();
}