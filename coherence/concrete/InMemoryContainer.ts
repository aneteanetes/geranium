import { ICoherenceContainer, Life } from "../interfaces/ICoherenceContainer";
import { Constructor } from "../../structures/Constructor";
import { ArrayHelper } from "../../declare/array";
import { IInjected } from "../interfaces/IInjected";

export class InMemoryContainer implements ICoherenceContainer {
    ["`container"]: ICoherenceContainer;
    private container: RegisterToken[] = [];

    isregistered<T extends IInjected>(type: Constructor<T>): boolean {
        return this.search(type).length > 0;
    }

    register<T extends IInjected>(type: Constructor<T> | Function, value: Constructor<T>, lifestyle: Life): void {
        this.container.push({
            interface: type.name,
            type: value,
            value: null,
            lifestyle: lifestyle || Life.Singleton
        });
    }

    resolve<T extends IInjected>(type: Constructor<T> | Function): T {
        const finded = this.search(type);
        if (finded.length == 0) {
            throw new Error("component is not registered: " + type);
        }

        return this.bindContainer(finded[0]);
    }

    resolveAll<T extends IInjected>(type: Constructor<T> | Function): T[] {
        return this.search(type).map(component => this.bindContainer(component));
    }

    release<T extends IInjected>(type: Function | Constructor<T>) {
        const pattern = (token: RegisterToken) => { return token.interface == type.name };
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

    instantiate<T extends IInjected>(type: Function | Constructor<T> | any, params: any[]): T {
        var instance = new type(...(params || []));
        return this.bindContainer(instance);
    }

    private bindContainer<T extends IInjected>(component: T): T {
        component["`container"] = this;
        return component;
    }

    private search(type: Constructor<{}> | Function): any[] {
        const pattern = function (token: RegisterToken) {
            return token.interface === type.name;
        };
        const map = 'map';

        return this.container.filter(pattern).map(this.extract);
    }

    private extract(token: RegisterToken): any {
        if (token.lifestyle == Life.Transient) {
            return new token.type();
        }
        if (token.lifestyle == Life.Singleton) {
            if (!token.value) {
                token.value = new token.type();
            }
            return token.value;
        }
    }
}

interface RegisterToken {
    interface: string;
    type: Constructor<any>;
    value: {};
    lifestyle: Life;
}