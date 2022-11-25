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

cardSchema.swaggerName = 'PersonCard';
module.exports = mongoose.model('PersonCard', cardSchema);
