module geranium.runtime {
    export abstract class AppSettings {
        private static _current: _AppSettings;
        static get Current(): AppSettings {
            if (AppSettings._current == null)
                AppSettings._current = new _AppSettings();
            return AppSettings._current;
        }

        private static initialized: boolean = false;
        static init(settings: {
            logger?: exceptions.logging.ILogger,
            request?: any,
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
        request: any = {};
        templating: any = {};
        storage: storage.interfaces.IStorage = new WindowStorage("geranium-window-storage");
    }

    class _AppSettings extends AppSettings { }
}