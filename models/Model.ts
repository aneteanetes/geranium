import { routeignore } from "../routing/concrete/decorators";
import { ICloneable } from "../reflection/cloning/decorators/ICloneable";
import { Event } from "../behaviors/events/abstract/Event";
import { ICoherenceContainer } from "../coherence/interfaces/ICoherenceContainer";
import { IRequest } from "../backend/interfaces/IRequest";
import { IValidator } from "../validating/validator/interfaces/ivalidator";

@routeignore
@ICloneable
export abstract class Model extends Event<Model> {
    obtain<T extends Model>(data: T) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        Object.assign(this, data);
        this.raise(this);
    }

    /**
     * synchronize model with server state
     */
    async sync(): Promise<void> {
        if (this.synchronizer) {
            let request = this["`container"].resolve(IRequest);
            let data = await request.send<any, Model>(this.synchronizer);
            this.obtain(data);
        }
    }

    /**
     * object used as synchronizator
     */
    get synchronizer(): {} { return undefined; }

    validators: IValidator[] = [];

    ["`container"]: ICoherenceContainer;
} 