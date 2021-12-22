'use strict';
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Person'
    },
    number: {
        type:     String,
        required: true,
        unique:   true,
        index: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

cardSchema.swaggerName = 'Card';
module.exports = mongoose.model('Card', cardSchema);
