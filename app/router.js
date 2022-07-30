import { CacheController } from './controllers/index.js'


export class RouterService {
  constructor(app) {
    app.get('/', (req, res) => res.json({ message: `Welcome to cache app please use CRUD on /cache to use the application` }));
    app.use('/cache', CacheController);
    app.use((req, res) => res.status(404).json({ message: 'No route found' }));
  }
}


