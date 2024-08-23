const { MaterialIssue, MaterialIssueItem,Items,WareHouse } = require("../models");

// Create a new Material Issue
exports.createMaterialIssue = async (req, res) => {
  try {
    const { fromWareHouseId, toWareHouseId, items } = req.body;

    const materialIssue = await MaterialIssue.create({
      fromWareHouseId,
      toWareHouseId,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      items,
    });
    console.log({ items });
    // Assuming items is an array of objects with item details
    if (items && items.length > 0) {
      const materialIssueItems = items.map((item) => ({
        ...item,
        materialIssueId: materialIssue.id,
      }));
      await MaterialIssueItem.bulkCreate(materialIssueItems);
    }

    res.status(201).json(materialIssue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaterialIssueItemsForWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    const materialIssueItems = await MaterialIssueItem.findAll({
      include: [
        {
          model: MaterialIssue,
          as: "materialIssue",
          where: { fromWareHouseId:id },
        },
        {
          model: Items,
          as: "item",
        },
      ],
    });

    if (materialIssueItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No material issues found for this warehouse." });
    }

    res.status(200).json(materialIssueItems);
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
};
