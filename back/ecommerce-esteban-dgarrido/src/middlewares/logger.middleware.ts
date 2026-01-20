import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = process.hrtime();

    res.on('finish', () => {
      const diff = process.hrtime(start);
      const duration = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

      const { statusCode } = res;
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      const reset = '\x1b[0m';
      const bold = '\x1b[1m';
      const cyan = '\x1b[36m';
      const gray = '\x1b[90m';
      const green = '\x1b[32m';
      const yellow = '\x1b[33m';
      const red = '\x1b[31m';
      const magenta = '\x1b[95m';

      const colorStatus =
        statusCode >= 500
          ? red
          : statusCode >= 400
            ? yellow
            : statusCode >= 300
              ? cyan
              : green;

      const colorMethod =
        method === 'GET'
          ? cyan
          : method === 'POST'
            ? green
            : method === 'PUT'
              ? yellow
              : method === 'DELETE'
                ? red
                : magenta;

      console.log(
        `${bold}${colorMethod}${method}${reset} ${originalUrl} ` +
          `${colorStatus}${statusCode}${reset} ` +
          `${gray}[${date} ${time}]${reset} ` +
          `${gray}${duration} ms${reset} ` +
          `${magenta}IP|${ip}${reset}`,
      );
    });

    next();
  }
}
