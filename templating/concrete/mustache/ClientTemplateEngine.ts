import { ITemplateEngine } from "../../interfaces/ITemplateEngine";
import { Template } from "../../contracts/Template";

export class ClientTemplateEngine extends ITemplateEngine<string> {
    async parse<TTemplate extends Template<string>>(template: TTemplate): Promise<string> {
        return template.template;
    }
}