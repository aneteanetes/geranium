namespace geranium.templating {
    export class MustacheTemplating implements interfaces.ITemplating {        
        parse<TTemplate extends contracts.Template>(template: contracts.Template): PromiseLike<string> {
            var rendrered: string = Mustache.render(template.html, template.data);
            return new Promise((resolve) => resolve(rendrered));
        }
    }
}