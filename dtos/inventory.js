import { body } from 'express-validator';

export const inventoryValidation = () => {
    return [
        // body('name')
        //     .isLength({ min: 1 })
        //     .withMessage('Name: min 1 char')
        //     .isLength({ max: 30 })
        //     .withMessage('Name: max 30 chars')
        //     .trim()
        //     .matches(/^[A-Za-z0-9\_]+$/)
        //     .withMessage('Name: alphanumeric only')
        // ,
        // body('price')
        //     .isFloat({ min: 0.01 })
        //     .withMessage('Price: > 0')
        // .isLength({ max: 7 })
        // .withMessage('Price: Max 7 digits')
        // ,
        // body('type')
        //     .isLength({ min: 1 })
        //     .withMessage('Type: min 1 char')
        //     .isLength({ max: 30 })
        //     .withMessage('Type: max 30 chars')
        //     .trim()
        //     .matches(/^[A-Za-z0-9\_]+$/)
        //     .withMessage('Type: alphanumeric only')
        // ,
    ]
}