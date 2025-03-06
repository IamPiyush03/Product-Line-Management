const mongoose = require('mongoose');

const productionOrderSchema = new mongoose.Schema(
    {
        orderId: { type: String },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
        status: {
            type: String,
            enum: ['Planned', 'In Production', 'Quality Check', 'Completed'],
            default: 'Planned'
        },
        materialsUsed: [
            {
                materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
                quantity: { type: Number, required: true }
            }
        ],
        workstationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workstation' },
        startDate: { type: Date },
        endDate: { type: Date },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

// Pre-save hook to generate a custom auto-incrementing orderId
productionOrderSchema.pre('save', async function (next) {
    if (!this.orderId) {
        // Simple way: count existing orders and increment.
        const count = await this.constructor.countDocuments();
        this.orderId = `PROD-${(count + 1).toString().padStart(3, '0')}`;
    }
    next();
});

module.exports = mongoose.model('ProductionOrder', productionOrderSchema);