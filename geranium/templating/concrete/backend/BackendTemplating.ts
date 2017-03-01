module geranium.templating {
    export class BackendTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string> {
            return new Promise((resolve) => resolve(null));
        }
    }
}