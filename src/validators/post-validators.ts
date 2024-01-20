import {body} from "express-validator";
import {BlogRepository} from "../repositories/blog-repository";
import {InputValidationMiddleware} from "../middlewares/inputValidation/input-validation-middleware";

const titleValidator = body('title').isString().withMessage('title must be string').trim().isLength({
    min: 1,
    max: 30
}).withMessage('Incorrect title')

const shortDescriptionValidator = body('shortDescription').isString().withMessage('shortDescription must be string').trim().isLength({
    min: 0,
    max: 200
}).withMessage('Incorrect shortDescription')

const contentValidator = body('content').isString().withMessage('content must be string').trim().isLength({
    min: 1,
    max: 1000
}).withMessage('Incorrect content')

const blogIdValidator = body('blogId').custom(async (value) => {
    const blog = BlogRepository.getById(value);

    if(!blog){
        throw Error('Invalid blogId');
    }else{
        return true;
    }
})

export const postValidation = () => [titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, InputValidationMiddleware]