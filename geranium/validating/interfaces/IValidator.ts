module geranium.validating.interfaces {
    export interface IValidator<T> {
        validate(value: T): contracts.ValidationResult;
    }
}