const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fullname: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const Support = mongoose.model('support', supportSchema);
module.exports = Support;
