import  { Request, Response, NextFunction } from 'express';
import status from 'http-status';

export const notFound = (request: Request, response: Response, next: NextFunction) => {
    response.status(status.NOT_FOUND).send({
        error: 'Endpoint not found'
    });
};
