const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        username: Joi.string().min(6).max(225).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
        fullname: Joi.string().required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
        email: Joi.string().required(),
        phonenumber: Joi.string().required(),
        address: Joi.string().required()
    })

    return rule.validate(data);
}
const loginValidator = (data) => {
    const rule = Joi.object({
        username: Joi.string().min(6).max(225).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

module.exports = {registerValidator, loginValidator};