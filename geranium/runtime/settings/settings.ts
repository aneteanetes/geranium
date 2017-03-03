module geranium.runtime {
    export abstract class AppSettings {
        private settings_storage: storage.interfaces.IStorage;
        constructor() {
            this.settings_storage = new WindowStorage("geranium-settings");
            this.settings_storage.add(this);
            AppSettings._current = this;
        }

        private static _current: AppSettings;
        static get Current(): AppSettings {
            if (AppSettings._current == null)
                new _AppSettings();
            return AppSettings._current;//.settings_storage.get(_AppSettings);
        }

        private static initialized: boolean = false;
        static init(settings: {
            logger?: exceptions.logging.ILogger,
            request?: backend.abstract.Request,
            templating?: any,
            storage?: storage.interfaces.IStorage
        }) {
            if (AppSettings.initialized)
                throw new Error('Application settings already initialized!');

            if (settings) {
                Object.assign(this, settings);
                AppSettings.initialized = true;
            }
        }

        logger: exceptions.logging.ILogger = new exceptions.ConsoleLogger();
        request: backend.abstract.StatefullRequest = new backend.AjaxRequest((x) => { console.log(x); });
        templating: any = {};
        storage: storage.interfaces.IStorage = new WindowStorage("geranium-data-storage");
        states: storage.interfaces.IGenericStorage<states.State> = new StatesStorage("geranium-states-storage");
    }

    class _AppSettings extends AppSettings { }
}