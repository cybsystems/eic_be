const {
  MaterialInward,
  UserTable,
  MaterialIssue,
  WareHouseStockItem,
  Items
} = require("../models");
const {
  validateMaterialInward,
  checkValidation,
} = require("../middleware/validation");
const { Sequelize } = require("sequelize");

async function updateWarehouseStock(items) {
  for (const item of items) {
    const existingStock = await WareHouseStockItem.findOne({
      where: {
        itemId: item.itemId, // Check based on itemId only, without warehouseId
        // Assuming you may want to track stock per warehouse
      },
    });

    if (existingStock) {
      // Update the existing stock quantity
      await existingStock.update({
        quantity: existingStock.quantity + item.quantity, // Increase quantity
      });
    } else {
      // Create a new stock item
      await WareHouseStockItem.create({
        itemId: item.itemId,
        quantity: item.quantity, // Set the initial quantity
        createdBy: item.createdBy,
        updatedBy: item.updatedBy,
      });
    }
  }
}

 
exports.createMaterialInward = [
  async (req, res) => {
    try {
      const { inwards } = req.body; // Assuming `inwards` is an array of material inward data
      const userId = req.user.id;

      // Add createdBy and updatedBy fields to each item
      const inwardsWithUser = inwards.map((inward) => {
        const item = {
          ...inward,
          vendorId: inward.vendorId || null,
          contractorId: inward.contractorId || null,
          wareHouseId: inward.wareHouseId || null,
        };
        delete item.contractorOrVendor;
        return { ...item, createdBy: userId, updatedBy: userId };
      });

      // Use bulkCreate to insert multiple records at once
      const materialInwards = await MaterialInward.bulkCreate(inwardsWithUser);
      await updateWarehouseStock(inwardsWithUser);

      if (inwards[0].wareHouseId) {
        const user = await UserTable.findByPk(userId);
        const userWarehouseId = user.wareHouseId;
        await MaterialIssue.destroy({
          where: Sequelize.and(
            { fromWareHouseId: inwards[0].wareHouseId },
            { toWareHouseId: userWarehouseId },
          ) 
        });
      }
      res.status(201).json(materialInwards);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get all MaterialInwards
exports.getAllMaterialInwards = async (req, res) => {
  try {
    // Fetch all items with their quantities
    const itemsWithQuantities = await WareHouseStockItem.findAll({
      include: [{
        model: Items,
        as: 'item', // Use the alias defined in the association
        attributes: ['id', 'item'], // Adjust attributes as needed
      }],
      attributes: ['itemId', 'quantity'], // Include itemId and quantity in the result
    });

    // Respond with the fetched data
    res.status(200).json(itemsWithQuantities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get MaterialInward by ID
exports.getMaterialInwardById = async (req, res) => {
  try {
    const materialInward = await MaterialInward.findByPk(req.params.id, {
      include: ["item", "contractor", "vendor", "creator", "updater"],
    });
    if (materialInward) {
      res.status(200).json(materialInward);
    } else {
      res.status(404).json({ error: "MaterialInward not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update MaterialInward
exports.updateMaterialInward = [
  ...validateMaterialInward,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await MaterialInward.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (updated) {
        const updatedMaterialInward = await MaterialInward.findByPk(
          req.params.id
        );
        res.status(200).json(updatedMaterialInward);
      } else {
        res.status(404).json({ error: "MaterialInward not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Delete MaterialInward
exports.deleteMaterialInward = async (req, res) => {
  try {
    const deleted = await MaterialInward.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "MaterialInward not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
