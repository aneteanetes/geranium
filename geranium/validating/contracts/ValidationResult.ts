module geranium.validating.contracts {
    export class ValidationResult {
        success: boolean;
        errors: exceptions.Exception[];
    }
}