import {body} from "express-validator";

const nameValidator = body('name').isString().withMessage('Name must be string').trim().isLength({
    min: 1,
    max: 15
}).withMessage('Incorrect name')

const descriptionValidator = body('description').isString().withMessage('Discription must be string').trim().isLength({
    min: 0,
    max: 500
}).withMessage('Incorrect description')

const websiteUrlValidator = body('websiteUrl').isString().withMessage('W ebsiteUrl must be string').trim().isLength({
    min: 1,
    max: 100    
}).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?').withMessage('Incorrect websiteUrl')

export const blogValidation = () => [nameValidator, descriptionValidator, websiteUrlValidator]