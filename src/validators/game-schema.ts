import Joi from 'joi';

export const gameSchema = Joi.object({
    title: Joi.string().required(),
    platformId: Joi.number().required(),
    isPhysical: Joi.boolean().required(),
    isDigital: Joi.boolean().required(),
    genreId: Joi.number().required(),
    publisherId: Joi.number().required(),
    releaseYear: Joi.number().required(),
});