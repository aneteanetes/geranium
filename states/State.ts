import { routeignore } from "../routing/concrete/decorators";
import { Model } from "../models/Model";
import { IStateManager } from "./interfaces/IStateManager";
import { Constructor } from "../structures/Constructor";
import { IRequest } from "../backend/interfaces/IRequest";
import GeraniumApp from "../runtime/concrete/App";

@routeignore
export abstract class State extends Model {
	constructor(statefull: boolean = true) {
		super();
		if (statefull)
			this.fillState();
	}

	protected async fillState() {
		if (this.constructor.name != "ViewState") {
			const stateManager = GeraniumApp.container.resolve(IStateManager);
			const state = stateManager.resolve(this.constructor);
			if (!state) {
				stateManager.register(this.constructor, this);
			}
		}
	}

	static async get<T extends State>(type: Constructor<T>): Promise<T> {
		var state = GeraniumApp.container.resolve(IStateManager).resolve(type);
		if (!state)
			state = new type();
		await state.sync();
		return state;
	}

	remove() {
		const container = this["`container"];
		const stateManager = container.resolve(IStateManager);
		stateManager.release(this.constructor);
	}

	async sync(): Promise<void> {
		if (this.synchronizer) {
			let request = this["`container"].resolve(IRequest);
			let data = await request.send<any, State>(this.synchronizer);
			this.obtain(data);
		}
	}
}