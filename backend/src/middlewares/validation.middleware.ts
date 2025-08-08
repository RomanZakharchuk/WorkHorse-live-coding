import { RequestHandler } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpException } from '../exceptions/http-exception';

const validationMiddleware = (
   type: any,
   value: 'body' | 'query' | 'params' = 'body',
   skipMissingProperties = false,
   whitelist = true,
   forbidNonWhitelisted = false
): RequestHandler => {
   return (req, res, next) => {
      validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
         if (errors.length > 0) {
            next(new HttpException(400, getMessageRecursive(errors)));
         } else {
            next();
         }
      });
   };
};

const getMessageRecursive = (errors: any) => {
   return errors.map((error: any) => {
      if (error.constraints) {
         return [`${error.target.constructor.name}`].concat(Object.values(error.constraints));
      } else if (error.children) {
         return getMessageRecursive(error.children);
      }

      return [];
   }).join(', ');
};

export default validationMiddleware;
