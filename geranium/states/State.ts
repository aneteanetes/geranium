module geranium.states {
    export abstract class State {
        constructor() {
            runtime.AppSettings.Current.storage.add(this);
        }
        static get<T extends State>(type: { new (...args: any[]): T }): T {
            return runtime.AppSettings.Current.storage.get(type);
        }
        remove(): boolean {
            return runtime.AppSettings.Current.storage.remove((this as Object).getType());
        }
    }
}