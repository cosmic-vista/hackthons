import express from 'express';
import * as productController from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.route('/')
    .get(cacheMiddleware(300), productController.getAllProducts)
    .post(protect, productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .put(protect, productController.updateProduct)
    .delete(protect, productController.deleteProduct);

export default router;
