interface LoggerMessage {
  msg: string;
  error?: string;
  obj?: any;
  id?: number;
  class?: string;
}

export class Logger {
  private constructor() {}

  public debug(message: LoggerMessage) {
    if (process.env.DEV)
        console.debug(message);
  }

  public log(message: LoggerMessage) {
    console.log(message);
  }

  public info(message: LoggerMessage) {
    console.info(message);
  }

  public warning(message: LoggerMessage) {
    console.warn(message);
  }

  public error(message: LoggerMessage) {
    console.error(message);
  }

  public static Factory() {
    return new Logger();
  }
}
