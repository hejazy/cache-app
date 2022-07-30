import  {createLogger} from 'bunyan';

export class LoggerService {
  bunyanLogger
  constructor(){
    this.bunyanLogger = createLogger({
        name: `cache-app-${process.env.NODE_ENV || 'dev'}`,
        streams: [
            { stream: process.stdout, level: `info` },
        ],
    })
  }

  async log({message, attributes}) {
    const version = process.env.LOGGING_VERSION || '1.0'
    const msg = {
      message,
      version,
      ...(attributes && { attributes }),
    };
    this.bunyanLogger.info(msg);
  }
}
