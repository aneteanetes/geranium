import { ICoherenceContainer } from "../interfaces/ICoherenceContainer";
import { Constructor } from "../../structures/Constructor";
import { ArrayHelper } from "../../declare/array";
import { IInjected } from "../interfaces/IInjected";

export class InMemoryContainer implements ICoherenceContainer {
    ["`container"]: ICoherenceContainer;
    private container: RegisterToken[] = [];

    register<T extends IInjected>(type: Constructor<T> | Function, value: T): void {
        this.container.push({
            type: type.name,
            value: value
        });
    }

    resolve<T extends IInjected>(type: Constructor<T> | Function): T {
        return this.bindContainer(this.execute('find', type) as T);
    }

    resolveAll<T extends IInjected>(type: Constructor<T> | Function): T[] {
        return (this.execute('filter', type) as T[]).map(component => this.bindContainer(component));
    }

    release<T extends IInjected>(type: Function | Constructor<T>) {
        const pattern = (token: RegisterToken) => { return token.type == type.name };
        const component = this.container.find(pattern);
        if (component) {
            this.container = ArrayHelper.remove(this.container, component);
        }
    }

    all(): any[] {
        const tokenExtract = function (token: RegisterToken) {
            return token.value;
        };
        return this.container.map(tokenExtract);
    }

    private bindContainer<T extends IInjected>(component: T): T {
        component["`container"] = this;
        return component;
    }

    private execute(methodName: string, type: Constructor<{}> | Function) {
        const pattern = function (token: RegisterToken) {
            return token.type === type.name;
        };
        const tokenExtract = function (token: RegisterToken) {
            return token.value;
        };
        const map = 'map';

        return this.container
        [methodName](pattern)
        [map](tokenExtract);
    }
}

interface RegisterToken {
    type: string;
    value: {};
}