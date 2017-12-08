import { ICloner } from "../interfaces/ICloner";

export class ClonerAssign<T> extends ICloner {
    clone<T>(sample: T): T {
        return Object.assign({}, sample);
    }
}