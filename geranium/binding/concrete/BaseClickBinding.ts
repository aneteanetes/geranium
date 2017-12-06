import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";

export class BaseClickBinding extends BaseByAttributeBinding {
    get attribute(): string { return 'onclick'; }

    binding(DOMObject: HTMLElement, model: any) {
        let value = DOMObject.getAttribute(this.attribute);
        var processed = this.splitMethodAndParams(value);
        var method = model[processed.method] as Function;
        if (method != null) {
            if (typeof method == 'function') {
                DOMObject.addEventListener("click", e => method.apply(model, processed.params));
            }
        }
    }

    private splitMethodAndParams(value: string): { method: string, params: any[] } {
        value = value.replaceAll(';', '');
        var indexOfBracket = value.indexOf('(');
        if (indexOfBracket == -1)
            return {
                method: value,
                params: null
            };

        var params = this.parseParams(value.substring(indexOfBracket));
        return {
            method: value.substring(0, indexOfBracket),
            params: params
        };
    }

    private parseParams(params: string): any[] {
        if (params == "()")
            return null;

        var withoutBrackets = params.replaceAll('\\(', '')
            .replaceAll('\\)', '');

        var _arguments: Array<any> = [];

        withoutBrackets.split(',').forEach(x => {
            try {
                var object = JSON.parse(x);
                _arguments.push(object);
            } catch (e) {
                _arguments.push(x);
            }
        });

        return _arguments;
    }
}