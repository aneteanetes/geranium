import { Constructor } from "../../structures/Constructor";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import { routeignore } from "../../routing/concrete/decorators";
import { ViewModel } from "../abstract/ViewModel";
import GeraniumApp from '../../runtime/concrete/App';
import { View } from "../../view/abstract/View";

@routeignore
export abstract class ViewModelExisted extends ViewModel {
    abstract view(): Constructor<ViewDOM>;
    async show() {
        await GeraniumApp.resolve(IViewEngine).execute({
            iViewed: this,
            selector: ''
        });
    }
}