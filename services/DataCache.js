const Redis = require('ioredis');
class DataCache {
    // initialize redis client
    constructor(password, host, port) {
        this.redisClient = new Redis({
            host: host,
            port: port,
            password: password,
        });

        this.redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });

        this.redisClient.on('error', () => {
            console.log('Redis connection error');
        });
    }

    // get data from cache
    async get(key) {
        try {
            const data = await this.redisClient.get(key);
            return JSON.parse(data);
        } catch (error) {
            console.error('Error get cache:', error);
            return null;
        }
    }

    // set data with expiry is 1hr by default
    async set(key, data, expiry = 3600) {
        try {
            const value = JSON.stringify(data);
            await this.redisClient.set(key, value, 'EX', expiry);
        } catch (error) {
            console.error('Error set cache:', error);
        }
    }

    // delete data from cache
    async delete(key) {
        try {
            await this.redisClient.del(key);
        } catch (error) {
            console.error('Error delete cache:', error);
        }
    }
}

module.exports = DataCache;
