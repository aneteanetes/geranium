namespace geranium.templating.interfaces {
    export interface ITemplating {
        parse<TTemplate extends contracts.Template>(template: TTemplate): PromiseLike<string>;
    }
}