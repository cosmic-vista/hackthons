import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        index: true
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: 0
    },
    location: {
        type: String,
        required: [true, 'Please provide location']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Product must belong to a user']
    }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', category: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

export default mongoose.model('Product', productSchema);
