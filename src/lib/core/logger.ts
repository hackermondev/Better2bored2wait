/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable functional/no-class */
import { mkdirSync } from 'fs';
import path from 'path';

import Logger from '@ptkdev/logger';

const logsFolder = path.join(process.cwd(), '2bored2wait-logs');

//@ts-ignore
if (process.pkg && !logsFolder) mkdirSync(logsFolder);

export class LoggerExtended extends Logger {
  constructor() {
    super({
      debug: process.env['DEBUG'] != undefined,
      path: {
        //@ts-ignore
        debug_log: process.pkg ? path.join(logsFolder, 'debug.log') : undefined,
        //@ts-ignore
        error_log: process.pkg ? path.join(logsFolder, 'error.log') : undefined,
      },
    });
  }
}
