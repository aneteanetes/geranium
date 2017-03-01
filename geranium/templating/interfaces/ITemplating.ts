namespace geranium.templating.interfaces {
    export interface ITemplating {
        load<TTemplate, TModel>(template: TTemplate, model: TModel): string;
    }
}