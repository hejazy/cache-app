import { getRandomValue } from "../../../app/helpers";

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
    'findOneAndUpdate',
  ];

  const excludeExpiredDataFromFindQueries = async function (
    next
  ) {
    const { matchedCount } = await this.model.updateOne(
      {...this._conditions, expiresAt: { $gte: new Date() }}, 
      {
        expiresAt: new Date(Date.now() + ttl),
        value: this._update?.$set?.value || getRandomValue
      }
    )
    logger.log({message: matchedCount ? 'Cache hit' : 'Cache miss'})
    this.where({ expiresAt: { $gte: new Date() } });
    next();
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeExpiredDataFromFindQueries);
  });

};
