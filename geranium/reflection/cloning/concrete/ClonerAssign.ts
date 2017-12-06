import { ICloner } from "../interfaces/ICloner";

export class ClonerAssign<T> implements ICloner {
    clone<T>(sample: T): T {
        return Object.assign({}, sample);
    }
}