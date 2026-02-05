import express from 'express';
import * as weatherController from '../controllers/weatherController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.get('/', cacheMiddleware(3600), weatherController.getWeather);

export default router;
