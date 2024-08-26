const { Items } = require("../models");

async function updateWarehouseStock(items, action = "add") {
  for (const item of items) {
    if (!item.itemId || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
    }

    const existingStock = await Items.findOne({
      where: {
        id: item.itemId,
        // Assuming you may want to track stock per warehouse, you can add more conditions here if needed
      },
    });

    if (existingStock) {
      let newQuantity;

      if (action === "add") {
        newQuantity = existingStock.quantity + item.quantity;
      } else if (action === "subtract") {
        newQuantity = existingStock.quantity - item.quantity;
        
        // Ensure that quantity does not go below zero
        if (newQuantity < 0) {
          throw new Error(`Insufficient stock for item  ${existingStock.item}`);
        }
      } else {
        throw new Error(`Invalid action: ${action}`);
      }

      // Update the existing stock quantity
      await existingStock.update({ quantity: newQuantity });
    } else {
      if (action === "subtract") {
        throw new Error(`Cannot subtract quantity for non-existing item  ${existingStock.item}`);
      }

      // Create a new stock item
      await Items.create({
        id: item.itemId,
        quantity: item.quantity, // Set the initial quantity
        createdBy: item.createdBy,
        updatedBy: item.updatedBy,
      });
    }
  }
}

module.exports = { updateWarehouseStock };
