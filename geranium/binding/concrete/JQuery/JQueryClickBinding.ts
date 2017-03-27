namespace geranium.binding.JQueryBindings {
    export class JQueryClickBinding extends base.JQueryByAttributeBinding {
        get attribute(): string { return 'onclick'; }
        binding(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr(this.attribute);            
            var processed = this.splitMethodAndParams(value);
            var method = model[processed.method];
            if (method != null)
                if (typeof method == 'function')
                    DOMObject.click(x => { method.apply(model, processed.params); });
        }
        private splitMethodAndParams(value: string): { method: string, params: any[] } {
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
}