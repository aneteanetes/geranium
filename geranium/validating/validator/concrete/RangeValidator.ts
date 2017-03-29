namespace geranium.validating.validator {
    export class RangeValidator implements interfaces.IValidator {
        constructor(prop: string, min: number | string, max: number | string, strict: boolean) {
            this.validatedPropertyName = prop;

            if (typeof min === "number")
                this.min = min;
            else
                this.minField = min;

            if (typeof max === "number")
                this.max = max;
            else
                this.maxField = max;

            this.strict = strict;
        }
        private strict: boolean;
        private min: number;
        private minField: string;
        private max: number;
        private maxField: string;
        validatedPropertyName: string;

        validate(value: number, shallowopy: any): ValidationResult {
            if (this.minField)
                this.min = shallowopy[this.minField];
            if (this.maxField)
                this.max = shallowopy[this.maxField];

            var result = new ValidationResult();
            result.success = this.strict
                ? (value > this.min && value < this.max)
                : (value >= this.min && value <= this.max);

            if (!result.success) {
                result.errors = [];
                if (value < this.min)
                    result.errors.push(new Exception('Value must be greater ' + (!this.strict ? 'or equals' : 'then') + ' ' + this.min));
                if (value > this.max)
                    result.errors.push(new Exception('Value must be less ' + (!this.strict ? 'or equals' : 'then') + ' ' + this.max));
            }
            return result;
        }
    }
}