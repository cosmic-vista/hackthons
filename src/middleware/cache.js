import redisClient from '../config/redis.js';

export const cacheMiddleware = (duration) => {
    return async (req, res, next) => {
        if (req.method !== 'GET') return next();

        const key = `cache:${req.originalUrl}`;

        try {
            const cachedData = await redisClient.get(key);
            if (cachedData) {
                return res.status(200).json(JSON.parse(cachedData));
            } else {
                res.originalSend = res.send;
                res.send = (body) => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        redisClient.setEx(key, duration, body).catch(err => console.error('Redis Save Error', err));
                    }
                    res.originalSend(body);
                };
                next();
            }
        } catch (err) {
            next();
        }
    };
};
