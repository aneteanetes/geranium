import { ICoherenceContainer } from "../interfaces/ICoherenceContainer";
import { Constructor } from "../../structures/Constructor";

export class InMemoryContainer implements ICoherenceContainer {
    private container: RegisterToken[] = [];

    register<T>(type: Constructor<T>, value: T): void {
        this.container.push({
            type: type.name,
            value: value
        });
    }

    resolve<T>(type: Constructor<T>): T {
        return this.execute('find', type) as T;
    }

    resolveAll<T>(type: Constructor<T>): T[] {
        return this.execute('filter', type) as T[];
    }

    private execute(methodName: string, type: Constructor<{}>) {
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