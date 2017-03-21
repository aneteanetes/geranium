namespace geranium.states {
    export abstract class State extends models.abstract.Model {
        constructor() {
            super();
            runtime.appSettings.states.add(this);
            runtime.appSettings.request.raise();
        }
        static get<T>(type: { new (...args: any[]): T }): T {
            return runtime.appSettings.states.get(type);
        }
        remove(): boolean {
            return runtime.appSettings.states.remove((<any>this).constructor);
        }
    }
}