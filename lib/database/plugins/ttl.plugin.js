
export const ttlPlugin = (schema) => {
  schema.add({
    expiresAt: { 
      type: Date, 
      index: 1, 
      default: new Date(Date.now() + (process.env.TTL || (10 * 60 * 1000))) 
    },
  });

  const typesFindQueryMiddleware = [
    'count',
    'countDocuments',
    'find',
    'findOne',
    'findOneAndUpdate',
  ];

  const excludeExpiredDataFromFindQueries = async function (
    next
  ) {
    this.where({ expiresAt: { $gte: new Date() } });
    next();
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeExpiredDataFromFindQueries);
  });

};
