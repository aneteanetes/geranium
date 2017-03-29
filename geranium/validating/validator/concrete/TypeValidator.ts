namespace geranium.validating.validator {
    export class TypeValidator implements interfaces.IValidator {
        _type: string;
        constructor(prop: string, type: string) {
            this.validatedPropertyName = prop;
            this._type = type;
        }
        validatedPropertyName: string
        validate(value: any) {
            var result = new ValidationResult();
            result.success = typeof value == this._type;

            if (!result.success)
                result.errors = [
                    new Exception('wrong value type!')
                ];
            return result;
        }
    }
}