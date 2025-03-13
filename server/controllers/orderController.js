const { validationResult } = require('express-validator');
const ProductionOrder = require('../models/ProductionOrder');
const Workstation = require('../models/Workstation');

const getOrders = async (req, res) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status.replace('_', ' ');
        }
        
        if (req.query.workstation) {
            // Lookup the workstation by name
            const workstation = await Workstation.findOne({ name: req.query.workstation });
            if (workstation) {
                filter.workstationId = workstation._id;
            } else {
                return res.status(404).json({ message: 'Workstation not found' });
            }
        }
        
        const orders = await ProductionOrder.find(filter)
            .populate('createdBy', 'username email')
            .populate('workstationId', 'name status');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({
            message: errors.array()[0].msg,
            errors: errors.array()
        });
    }
    try {
        const order = await ProductionOrder.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.status(201).json(order);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(error.errors)[0].message,
                errors: Object.values(error.errors)
            });
        }
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await ProductionOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await ProductionOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.deleteOne(); // Updated method
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrders, createOrder, updateOrderStatus, deleteOrder };