namespace geranium.validating.validator.interfaces {    
    export interface IValidator {        
        readonly validatedPropertyName: string;        
        validate<T>(value: T, shallowcopy: any): contracts.ValidationResult;
    }
}