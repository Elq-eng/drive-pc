import { createLogger, transports } from 'winston';

const infoLogger = createLogger({
  transports:[
    new transports.File({
      filename:'./logs/infoLogs.log',
      level: 'info'
    })
  ]
})



infoLogger.stream = {
  write: ( message, encoding )=>{
    infoLogger.info(message)
  }
}

export default infoLogger