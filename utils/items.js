const { Items } = require("../models");

async function updateWarehouseStock(items,action="add") {
  for (const item of items) {
    const existingStock = await Items.findOne({
      where: {
        id: item.itemId, // Check based on itemId only, without warehouseId
        // Assuming you may want to track stock per warehouse
      },
    });

    if (existingStock) {
      // Update the existing stock quantity
      await existingStock.update({
        quantity:
          action === "add"
            ? existingStock.quantity + item.quantity
            : existingStock.quantity - item.quantity, // Increase quantity
      });
    } else {
      // Create a new stock item
      await WareHouseStockItem.create({
        id: item.itemId,
        quantity: item.quantity, // Set the initial quantity
        createdBy: item.createdBy,
        updatedBy: item.updatedBy,
      });
    }
  }
}

module.exports = { updateWarehouseStock };