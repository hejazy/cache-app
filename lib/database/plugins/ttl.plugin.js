import { getRandomValue } from "../../../app/helpers/index.js";
import { LoggerService } from "../../../lib/index.js";

const ttl = (process.env.TTL || (10 * 60 * 1000));
const logger = new LoggerService()


export const ttlPlugin = (schema) => {
  schema.add({
    expiresAt: { 
      type: Date, 
      index: 1, 
      default: new Date(Date.now() + ttl) 
    },
  });

  const typesFindQueryMiddleware = [
    'findOne',
  ];

  const excludeExpiredDataFromFindQueries = async function (
    next
  ) {
    const { modifiedCount } = await this.model.update(
      {...this._conditions, expiresAt: { $lte: new Date() }}, 
      {
        ...this._conditions,
        expiresAt: new Date(Date.now() + ttl),
        value: this._update?.$set?.value || getRandomValue()
      }, 
    )
    if(!modifiedCount && !(await this.model.find({...this._conditions}).count())) 
      await this.model.create(
        {
          ...this._conditions,
          expiresAt: new Date(Date.now() + ttl),
          value: this._update?.$set?.value || getRandomValue()
        }
      )
    logger.log({message: modifiedCount ? 'Cache miss' : 'Cache hit' })
    next();
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeExpiredDataFromFindQueries);
  });

  schema.pre('findOneAndUpdate', async function (next) {
    if(this._update?.$set) this._update.$set.expiresAt = new Date();
    next();
  });

};
