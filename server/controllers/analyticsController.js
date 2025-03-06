const ProductionOrder = require('../models/ProductionOrder');
const Material = require('../models/Material');

const getOverview = async (req, res) => {
    try {
        const totalOrders = await ProductionOrder.countDocuments();

        const ordersByStatus = await ProductionOrder.aggregate([
            { 
                $group: { 
                    _id: "$status",
                    count: { $sum: 1 }
                } 
            }
        ]);

        // Sum material usage across orders
        const materialUsage = await ProductionOrder.aggregate([
            { $unwind: "$materialsUsed" },
            {
                $group: {
                    _id: "$materialsUsed.materialId",
                    totalUsed: { $sum: "$materialsUsed.quantity" }
                }
            },
            {
                $lookup: {
                    from: "materials",
                    localField: "_id",
                    foreignField: "_id",
                    as: "materialDetails"
                }
            },
            { $unwind: "$materialDetails" },
            {
                $project: {
                    materialName: "$materialDetails.name",
                    totalUsed: 1
                }
            }
        ]);

        res.json({
            totalOrders,
            ordersByStatus,
            materialUsage,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOverview };