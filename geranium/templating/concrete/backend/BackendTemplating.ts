namespace geranium.templating {
    export class BackendTemplating implements interfaces.ITemplating {
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string> {
            return runtime.appSettings.request.send<string>(template.data);
        }
    }
}