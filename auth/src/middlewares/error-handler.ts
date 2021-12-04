import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/customError"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        })

    }

    res.status(400).json({
        errors: [{
            message: "Something wrong"
        }]
    })

}