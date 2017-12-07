import { ITemplateEngine } from "../../interfaces/ITemplateEngine";
import { Template } from "../../contracts/template";

export class ClientTemplateEngine extends ITemplateEngine {
    parse<TTemplate extends Template>(template: Template): Promise<string> {
        return new Promise((resolve) => resolve(template.html));
    }
}