import mongoose from 'mongoose';

export class DatabaseService {
  constructor(loggingService){}

  connect(){
      mongoose.connection
      .on('error', (e)=> {loggingService.log({message: e, attributes: {error: true}})})
      .on('disconnected', connect)
      .once('open', listen);
    return mongoose.connect(
      process.env.DB_URI || 'mongodb://localhost:27017/caching-db', 
      {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  }
}