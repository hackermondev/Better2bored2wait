/* eslint-disable functional/no-class */
import { LogLevel } from '@sapphire/framework';
import { Logger } from '@sapphire/plugin-logger';

export class LoggerExtended extends Logger {
    constructor() {
        super({ level: LogLevel.Debug });
    }
};