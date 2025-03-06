const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        currentStock: { type: Number, required: true },
        minimumStockLevel: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);