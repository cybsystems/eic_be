const { MaterialIssue,MaterialIssueItem} = require('../models');


// Create a new Material Issue
exports.createMaterialIssue = async (req, res) => {
    try {
      const { fromWareHouseId, toWareHouseId,  items } = req.body;
  
      const materialIssue = await MaterialIssue.create({
        fromWareHouseId,
        toWareHouseId,
        createdBy:req.user.id,
        updatedBy:req.user.id,
        items,
      });
      console.log({items})
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