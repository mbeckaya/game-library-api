import  { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import { gameSchema } from '../validators/game-schema';

export const validateGameBody = (request: Request, response: Response, next: NextFunction) => {
    const { error } = gameSchema.validate(request.body);

    if (error) {
        return response
            .status(status.BAD_REQUEST)
            .send({ error: error.details });
    }

    next();
};