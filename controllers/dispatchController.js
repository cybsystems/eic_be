const { Dispatch,Items } = require('../models');
const { validateDispatch, checkValidation } = require('../middleware/validation');
const { updateWarehouseStock } = require("../utils/items");

// Create Dispatch
exports.createDispatch = [
  async (req, res) => {
    try {
      const { contractorUnitAssignmentId, items } = req.body;
      const userId = req.user.id;

      for (const item of items) {
        const existingItem = await Items.findOne({
          where: { id: item.itemId },
        });
        if (!existingItem) {
          return res
            .status(400)
            .json({ error: `Item with  ${existingItem.item} does not exist` });
        }
      }

      const dispatchData=items.map((i)=>{
        return ({...i,contractorUnitAssignmentId,createdBy: userId, updatedBy: userId })
      })
      const dispatches=await Dispatch.bulkCreate(dispatchData)
      await updateWarehouseStock(dispatchData,"subtract");

      res.status(201).json({dispatches});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all Dispatches
exports.getAllDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.findAll();
    res.status(200).json(dispatches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Dispatch by ID
exports.getDispatchById = async (req, res) => {
  try {
    const dispatch = await Dispatch.findByPk(req.params.id);
    if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
    res.status(200).json(dispatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Dispatch
exports.updateDispatch = [
  ...validateDispatch,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await Dispatch.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const dispatch = await Dispatch.findByPk(req.params.id);
        res.status(200).json(dispatch);
      } else {
        res.status(404).json({ message: 'Dispatch not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete Dispatch
exports.deleteDispatch = async (req, res) => {
  try {
    const deleted = await Dispatch.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Dispatch not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
