import { Exception } from "../../exceptions/Exception";

export class ValidationResult {
    success: boolean;
    errors: Exception[];
}