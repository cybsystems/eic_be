const { Items, ItemCategory, ItemFeature } = require('../models');
const { validateItem, checkValidation } = require('../middleware/validation');

// Create Item
exports.createItem = [
  ...validateItem,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      const item = await Items.create({ ...createData, quantity: 0 });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Items.findAll({
      include: ['category', 'feature', 'creator', 'updater']
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllItemsCount = async (req, res) => {
  try {
    const count = await Items.count();

    res.status(200).json(count);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id, {
      include: ['category', 'feature', 'creator', 'updater']
    });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Item
exports.updateItem = [
  ...validateItem,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await Items.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (updated) {
        const updatedItem = await Items.findByPk(req.params.id);
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Items.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
