const Workstation = require('../models/Workstation');

const getWorkstations = async (req, res) => {
    try {
        const workstations = await Workstation.find();
        res.json(workstations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWorkstations };