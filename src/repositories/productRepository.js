import Product from '../models/Product.js';

class ProductRepository {
    async findAll(queryObj, skip, limit, sort) {
        let query = Product.find(queryObj);

        // If sorting by text score, we need to include it in projection
        if (sort && typeof sort === 'object' && sort.score) {
            query = query.select({ score: { $meta: 'textScore' } });
        }

        if (sort) {
            query = query.sort(sort);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        query = query.skip(skip).limit(limit);

        return await query;
    }

    async count(queryObj) {
        return await Product.countDocuments(queryObj);
    }

    async findById(id) {
        return await Product.findById(id).populate('createdBy', 'name email');
    }

    async create(data) {
        return await Product.create(data);
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductRepository();
