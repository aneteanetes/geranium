import { IApp } from "../interfaces/IApp";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ContainerNotInitializedException } from "../../exceptions/coherence/ContainerNotInitializedException";

class App extends IApp {

    private static containerNameConst: string = "`geranium-container";

    get container(): ICoherenceContainer {
        let global = window[App.containerNameConst]
        if (!global) {
            throw new ContainerNotInitializedException("App.container.get");
        }
        return global;
    }

    set container(container: ICoherenceContainer) {
        window[App.containerNameConst] = container;
    }
}

function getApp(): IApp {
    if (!window["`GeraniumApp"]) {
        window["`GeraniumApp"] = new App();
    }
    return window["`GeraniumApp"];
}

var GeraniumApp = getApp();

export default GeraniumApp;