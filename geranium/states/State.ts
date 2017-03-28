namespace geranium.states {
    export abstract class State extends models.abstract.Model {
        constructor() {
            super();
            runtime.appSettings.states.add(this);
        }
        static async get<T extends State>(type: { new (...args: any[]): T }): Promise<T> {
            var state = runtime.appSettings.states.get(type);
            if (!state)
                state = new type();
            await state.sync();
            return state;
        }
        remove(): boolean {
            return runtime.appSettings.states.remove((<any>this).constructor);
        }
    }
}