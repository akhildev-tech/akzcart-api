import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as K from 'src/shared/constants/app.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  private readonly isDebugMode = process.env.DEBUG_MODE === K.BOOLEAN.TRUE;

  constructor(context?: any, options = {}) {
    super(context, options);
  }

  error(message: any, ...args: any[]) {
    if (this.isDebugMode) super.log.apply(this, [message, ...args]);
    else this.printPlainLog(message, K.LOGGER_LEVEL.ERROR);
  }

  log(message: any, ...args: any[]) {
    if (this.isDebugMode) super.log.apply(this, [message, ...args]);
    else this.printPlainLog(message, K.LOGGER_LEVEL.LOG);
  }

  warn(message: any, ...args: any[]) {
    if (this.isDebugMode) super.log.apply(this, [message, ...args]);
    else this.printPlainLog(message, K.LOGGER_LEVEL.WARN);
  }

  /**
   * Method to print a plain log message.
   * @param {any} message Message to be printed.
   * @param {K.LOGGER_LEVEL_TYPE} level Console log levels.
   */
  private printPlainLog(message: any, level: K.LOGGER_LEVEL_TYPE): void {
    const plainLog = `[${this.context || 'NA'}] ${JSON.stringify(message)}`;
    console[level](plainLog);
  }
}
