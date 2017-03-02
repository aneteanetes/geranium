module geranium.states {
    export abstract class State {
        constructor() {
            runtime.AppSettings.Current.states.add(this);
        }
        static get<T extends State>(type: { new (...args: any[]): T }): T {
            return runtime.AppSettings.Current.states.get(type);
        }
        remove(): boolean {
            return runtime.AppSettings.Current.states.remove((<any>this).constructor);
        }

        get refreshable() {
            return (typeof this.autoupdate() !== 'boolean');
        }
        get params(): {} {
            return this.autoupdate();
        }
        set obtain(data: any) {
            Object.assign(this, JSON.parse(data));
        }

        protected abstract autoupdate(): boolean | {};
    }
}