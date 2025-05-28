import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const logFile = path.join(__dirname, '..', 'log.txt');

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  const bodyData = req.body ?? {};
  const bodyText =
    req.method === 'GET' || Object.keys(bodyData).length === 0
      ? '(no body)'
      : JSON.stringify(bodyData);

  const logEntry = `[${timestamp}] ${method} ${url} ${bodyText}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });

  next();
};
