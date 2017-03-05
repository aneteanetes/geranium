module geranium.states {
    export abstract class State extends models.abstract.Model {
        constructor() {
            super();
            runtime.AppSettings.Current.states.add(this);
        }
        static get<T extends State>(type: { new (...args: any[]): T }): T {
            return runtime.AppSettings.Current.states.get(type);
        }
        remove(): boolean {
            return runtime.AppSettings.Current.states.remove((<any>this).constructor);
        }
    }
}