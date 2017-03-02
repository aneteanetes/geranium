module geranium.states {
    export abstract class State {
        constructor() {            
            runtime.AppSettings.Current.states.add(this);
        }
        static get<T extends State>(type: { new (...args: any[]): T }): T {
            return runtime.AppSettings.Current.states.get(type);
        }
        remove(): boolean {
            return runtime.AppSettings.Current.states.remove((this as Object).getType());
        }

        protected abstract autoupdate(): boolean | {};
    }
}