namespace geranium.states {
    @routing.routeignore
	export abstract class State extends models.abstract.Model {
		constructor(statefull: boolean = true) {
			super();
			if (statefull)
				this.fillState();
		}

		protected async fillState() {			
			if (this.constructor.name != "ViewState") {
				if (runtime.appSettings) {
					var state = runtime.appSettings.states.get(this.constructor as any);
					if (!state)
						runtime.appSettings.states.add(this);
				}
			}
		}

        static async get<T extends State>(type: { new (...args: any[]): T }): Promise<T> {
            debugger;
            var state = runtime.appSettings.states.get(type);
            if (!state)
                state = new type();
            await state.sync();
            return state;
		}

        remove(): boolean {
            return runtime.appSettings.states.remove((<any>this).constructor);
		}

		async sync(): Promise<void> {
			if (this.synchronizer) {
				let request = runtime.appSettings.request;
				let data = await request.send<any>(this.synchronizer, true);
				this.obtain(data);
			}
		}
    }
}