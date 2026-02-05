import productService from '../services/productService.js';
import AppError from '../utils/AppError.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const { products, total } = await productService.getAllProducts(req.query);
        res.status(200).json({
            status: 'success',
            results: products.length,
            total,
            data: products
        });
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProduct(req.params.id);
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body, req.user._id);
        res.status(201).json({
            status: 'success',
            data: newProduct
        });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
