import Joi from "joi";

export const updateUserSchema = Joi.object({
    username: Joi.string().optional(),
    role: Joi.string().valid("user", "admin").optional(),
});
