import { body } from 'express-validator';

export const inventoryValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .bail()
            .isLength({ max: 30 })
            .withMessage('Name max 30 chars')
            .bail()
            .matches(/^[A-Za-z0-9ก-๙\s]+$/)
            .withMessage('Name is invalid')
        ,
        body('price')
            .trim()
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0')
            .bail()
            .custom(value => {
                const num = parseFloat(value)
                if (num > 1000000000000.00) {
                    throw new Error('Price too high')
                }
                return true
            })
        ,
        body('type')
            .trim()
            .notEmpty()
            .withMessage('Type is required')
            .bail()
            .isLength({ max: 30 })
            .withMessage('Type max 30 chars')
            .bail()
            .matches(/^[A-Za-z0-9ก-๙\s]+$/)
            .withMessage('Type is invalid')
        ,
    ]
}
