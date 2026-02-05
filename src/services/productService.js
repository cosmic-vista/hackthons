import productRepository from '../repositories/productRepository.js';
import { invalidateProductCache } from '../utils/cacheHelper.js';
import AppError from '../utils/AppError.js';

class ProductService {
    async getAllProducts(queryParams) {
        // filtering
        const queryObj = { ...queryParams };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering
        if (queryParams.minPrice || queryParams.maxPrice) {
            queryObj.price = {};
            if (queryParams.minPrice) queryObj.price.$gte = queryParams.minPrice;
            if (queryParams.maxPrice) queryObj.price.$lte = queryParams.maxPrice;
            delete queryObj.minPrice;
            delete queryObj.maxPrice;
        }

        // Text search
        if (queryParams.search) {
            queryObj.$text = { $search: queryParams.search };
        }

        // Pagination & Sort
        const page = queryParams.page * 1 || 1;
        const limit = queryParams.limit * 1 || 20;
        const skip = (page - 1) * limit;

        let sort = '-createdAt';
        if (queryParams.sort) {
            sort = queryParams.sort.split(',').join(' ');
        }

        const products = await productRepository.findAll(queryObj, skip, limit, sort);
        const total = await productRepository.count(queryObj);

        return { products, total };
    }

    async getProduct(id) {
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError('No product found with that ID', 404);
        }
        return product;
    }

    async createProduct(data, userId) {
        const productData = { ...data, createdBy: userId };
        const newProduct = await productRepository.create(productData);
        await invalidateProductCache();
        return newProduct;
    }

    async updateProduct(id, data) {
        const product = await productRepository.update(id, data);
        if (!product) {
            throw new AppError('No product found with that ID', 404);
        }
        await invalidateProductCache();
        return product;
    }

    async deleteProduct(id) {
        const product = await productRepository.delete(id);
        if (!product) {
            throw new AppError('No product found with that ID', 404);
        }
        await invalidateProductCache();
        return product;
    }
}

export default new ProductService();
