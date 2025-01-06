const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
