import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as fastJson from 'fast-json-stringify';
import * as K from 'src/shared/constants/app.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  private stringify: any;
  private readonly isDebugMode =
    process.env.DEBUG_MODE === K.BOOLEAN_STRING.TRUE;

  constructor(context?: any, options = {}) {
    super(context, options);
    this.stringify = fastJson({});
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

  private printPlainLog(message: any, level: K.LOGGER_LEVEL_TYPE): void {
    const plainLog = `[${this.context || 'NA'}] ${this.stringify(message)}`;
    console[level](plainLog);
  }
}
