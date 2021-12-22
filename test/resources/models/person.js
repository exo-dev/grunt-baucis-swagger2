'use strict';
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    dni: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

personSchema.swaggerName = 'Person';
module.exports = mongoose.model('Person', personSchema);
