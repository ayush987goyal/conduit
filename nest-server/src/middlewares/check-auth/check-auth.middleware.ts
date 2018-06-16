import {
  Injectable,
  MiddlewareFunction,
  NestMiddleware,
  HttpException,
  HttpStatus,
  RequestMethod
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface RouteOption {
  type: 'exclude' | 'optional';
  path: string;
  method: string;
}

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  resolve(args: RouteOption[]): MiddlewareFunction {
    return (req, res, next) => {
      const customOption = this.getCustomOption(req, args);
      try {
        if (customOption === 'exclude') {
          next();
        } else {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          req.userData = decoded;
          next();
        }
      } catch (error) {
        if (customOption === 'optional') {
          next();
        } else {
          throw new HttpException('Auth failed', HttpStatus.FORBIDDEN);
        }
      }
    };
  }

  getCustomOption(req, options: RouteOption[]): string {
    const match = options.find(option => {
      return (
        option.path === req.path &&
        (option.method === RequestMethod[req.method] || req.method === RequestMethod.ALL)
      );
    });

    return match ? match.type : null;
  }
}
