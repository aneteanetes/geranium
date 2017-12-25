import { ITemplateEngine } from "../../interfaces/ITemplateEngine";
import { Template } from "../../contracts/template";
import { IRequest } from "../../../backend/interfaces/IRequest";

export class BackendTemplating extends ITemplateEngine<string> {
    parse<TTemplate extends Template<string>>(template: TTemplate): Promise<string> {
        return this["`container"].resolve(IRequest).send<string, string>(template.data);
    }
}