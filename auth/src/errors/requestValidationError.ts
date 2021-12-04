import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
    statusCode = 400
    //short hand for privatae this.errors = errors
    constructor(public errors: ValidationError[]) {
        super("Invalid request")
        //only because we extend a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)

    }
    serializeErrors() {
        return this.errors.map(err => ({
            message: err.msg,
            field: err.param
        }))
    }
}