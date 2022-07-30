# Express + MongoDB Caching Application

1. Install dependencies via `npm install`
3. Run via `npm run start` or `npm run start:dev` (nodemon)
4. Example API is running on localhost:3046

Available routes:

```
GET     /cache         return all cache
GET     /cache/:key    finds cache by key
POST    /cache         creates new cache
PATCH   /cache         updates cache by key
DELETE  /cache         deletes all cache
DELETE  /cache/:key    deletes cache by key
```


Request flow:
=> router  =>  controller  => services  => DB middleware (lib/database/plugins) => mongo DB