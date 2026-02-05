import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    googleId: {
        type: String,
        unique: true,
        index: true
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
