import { ITemplateEngine } from "../../interfaces/ITemplateEngine";
import { Template } from "../../contracts/template";

export class ClientTemplateEngine extends ITemplateEngine {
    parse<TTemplate extends Template>(template: Template): Promise<string> {
        var rendrered: string = Mustache.render(template.html, template.data);
        return new Promise((resolve) => resolve(rendrered));
    }
}