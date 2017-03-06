module geranium.validating.contracts {
    export class ValidationResult {
        success: boolean;
        error: exceptions.Exception;
    }
}