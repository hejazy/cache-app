import mongoose from 'mongoose';

export class DatabaseService {
  logger;
  constructor(loggingService){
    this.logger = loggingService;
  }

  async connect(){
    return new Promise((resolve, reject)=>{
      mongoose.connection
      .on('error', (e)=> {
        this.logger.log({message: e, attributes: {error: true}});
        reject(e)
      })
      .on('disconnected', this.connect)
      .once('open', ()=> {
        this.logger.log({message: 'connected to DB'});
        resolve()
      })
      mongoose.connect(
        process.env.DB_URI || 'mongodb://localhost:27017/caching-db', 
        {
          keepAlive: 1,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
    })
  }
}