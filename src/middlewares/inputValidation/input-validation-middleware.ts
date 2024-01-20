import {Request, Response, NextFunction} from "express";
import {body, ValidationError, validationResult} from "express-validator";

export const InputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const formattedError = validationResult(req).formatWith((error: ValidationError) => ({
        message: error.msg,
        field: error.type === 'field' ? error.path : 'unknown'
    }))
    if(!formattedError.isEmpty()){
        const errorMessage = formattedError.array({onlyFirstError: true})
        res.sendStatus(400).send({errorsMessages: errorMessage})
        return;
    }
    return next();
}