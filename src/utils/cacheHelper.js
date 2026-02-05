import redisClient from '../config/redis.js';

export const invalidateProductCache = async () => {
    try {
        let cursor = 0;
        do {
            const result = await redisClient.scan(cursor, {
                MATCH: 'cache:/api/v1/products*',
                COUNT: 100
            });
            cursor = result.cursor;
            const keys = result.keys;
            if (keys.length > 0) {
                await redisClient.del(keys);
                console.log(`Invalidated ${keys.length} product cache keys`);
            }
        } while (cursor !== 0);

    } catch (error) {
        console.error(`Cache invalidation error: ${error.message}`);
    }
};
