import { IValidator } from "../interfaces/ivalidator";
import { ValidationResult } from "../../contracts/validationresult";
import { Exception } from "../../../exceptions/Exception";
import { ValidatingException } from "../../../exceptions/validating/ValidatingException";
import { ViewModel } from "../../../viewmodels/abstract/ViewModel";

export class TypeValidator extends IValidator {
    _type: string;

    constructor(prop: string, type: string) {
        super();
        this.validatedPropertyName = prop;
        this._type = type;
    }

    validatedPropertyName: string;

    validate(value: ViewModel) {
        var result = new ValidationResult();
        result.success = typeof value == this._type;

        if (!result.success) {
            result.errors = [
                new Exception('wrong value type!')
            ];
        }

        return result;
    }
}