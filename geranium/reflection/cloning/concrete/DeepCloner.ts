import { ICloner } from "../interfaces/ICloner";
import GeraniumApp from '../../../runtime/concrete/App';
import { AssignInheritanceImpartor } from "../../inheritance/concrete/AssignInheritanceImpartor";

export class DeepCloner extends ICloner {
    clone<T>(sample: T): T {
        let clone = Object.assign({}, sample);

        const inheritanceImpartor = GeraniumApp.container.resolve(AssignInheritanceImpartor);
        inheritanceImpartor.inherit(clone, sample);

        return clone;
    }
}