"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (validator, mode) => {
    return (req, res, next) => {
        const { error } = validator(req.body, mode);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    };
};
exports.validate = validate;
