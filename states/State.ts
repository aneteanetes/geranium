import { routeignore } from "../routing/concrete/decorators";
import { Model } from "../models/Model";
import { IStateManager } from "./interfaces/IStateManager";
import { Constructor } from "../structures/Constructor";
import GeraniumApp from "../runtime/concrete/App";
import { IRequest } from "../backend/interfaces/IRequest";

@routeignore
export abstract class State extends Model {
	constructor(statefull: boolean = true) {
		super();
		if (statefull)
			this.fillState();
	}

	protected async fillState() {
		if (this.constructor.name != "ViewState") {
			const stateManager = this["`container"].resolve(IStateManager)
			const state = stateManager.get(this.constructor as any);
			if (!state) {
				stateManager.add(this);
			}
		}
	}

	static async get<T extends State>(type: Constructor<T>): Promise<T> {
		var state = GeraniumApp.container.resolve(IStateManager).get(type);
		if (!state)
			state = new type();
		await state.sync();
		return state;
	}

	remove(): boolean {
		return this["`container"].resolve(IStateManager).remove(this.constructor);
	}

	async sync(): Promise<void> {
		if (this.synchronizer) {
			let request = this["`container"].resolve(IRequest);
			let data = await request.send<any, State>(this.synchronizer);
			this.obtain(data);
		}
	}
}