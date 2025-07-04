import { validationResult } from 'express-validator'

export const validation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    } else {
        next()
    }
}
