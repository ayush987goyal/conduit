import {
  Injectable,
  MiddlewareFunction,
  NestMiddleware,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
      } catch (error) {
        // return res.status(401).json({
        //   message: 'Auth failed'
        // });
        throw new HttpException('Auth failed', HttpStatus.FORBIDDEN);
      }
    };
  }
}
