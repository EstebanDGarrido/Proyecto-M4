import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req); //* { body: {...}, params, query, headers, URL, métodoHTTP... }
    // console.log(res);

    const { method, originalUrl, ip } = req;
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();

    console.log(`${method} ${originalUrl} [${date} - ${time}] - ${ip}`);
    next();
  }
}
