import Joi from "joi";

export const loginSchema:Joi.ObjectSchema<any> = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

export const registerSchema:Joi.ObjectSchema<any> = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin").default("user"),
});
