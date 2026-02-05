import productRepository from '../repositories/productRepository.js';
import { invalidateProductCache } from '../utils/cacheHelper.js';
import AppError from '../utils/AppError.js';

class ProductService {
    async getAllProducts(queryParams) {
        // 1) Filtering
        const queryObj = { ...queryParams };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering (Price, etc.)
        if (queryParams.minPrice !== undefined || queryParams.maxPrice !== undefined) {
            queryObj.price = {};
            if (queryParams.minPrice !== undefined) queryObj.price.$gte = Number(queryParams.minPrice);
            if (queryParams.maxPrice !== undefined) queryObj.price.$lte = Number(queryParams.maxPrice);

            // Ensure we remove these from the final query if they weren't removed by excludedFields
            delete queryObj.minPrice;
            delete queryObj.maxPrice;
        }

        // 2) Text search
        if (queryParams.search) {
            queryObj.$text = { $search: queryParams.search };
        }

        // 3) Sorting
        let sort = '-createdAt'; // Default sort
        if (queryParams.sort) {
            sort = queryParams.sort.split(',').join(' ');
        } else if (queryParams.search) {
            // Default to relevance score if searching and no sort provided
            sort = { score: { $meta: 'textScore' } };
        }

        // 4) Pagination
        const page = Math.max(Number(queryParams.page) || 1, 1);
        const limit = Math.max(Number(queryParams.limit) || 20, 1);
        const skip = (page - 1) * limit;

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
