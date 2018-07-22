const redis = require('redis');

const redisLogger = require('./index');

const config = {
    service: {
        name: 'test',
    },
    redis: {
        host: 'localhost', 
        port: 6379,
    },
    params: {
    }
};

const client = redis.createClient(config.redis);

const logger = redisLogger(client, config.service.name);

logger.info('starting test');

const error = {
   name: 'DataError',
   message: 'Test error',
   data: 'Test data'
};

logger.debug(error);

setTimeout(() => logger.end(), 1000);
