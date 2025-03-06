const { validationResult } = require('express-validator');
const Material = require('../models/Material');

const updateMaterial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }
        // For example, update currentStock
        material.currentStock = req.body.currentStock || material.currentStock;
        material.minimumStockLevel = req.body.minimumStockLevel || material.minimumStockLevel;
        const updatedMaterial = await material.save();
        res.json(updatedMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getMaterials, updateMaterial };