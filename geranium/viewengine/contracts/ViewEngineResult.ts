module geranium.viewengine.contracts {
    export class ViewEngineResult {
        view: viewDOM.abstract.ViewDOM;
        methods: contracts.Method[];
        properties: contracts.Property[];
        fields: contracts.Field[];
    }
}