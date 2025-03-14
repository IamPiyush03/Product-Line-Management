const mongoose = require('mongoose');

const workstationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        status: { type: String, enum: ['Active', 'Under Maintenance'], default: 'Active' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Workstation', workstationSchema);