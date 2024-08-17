const { Item, ItemCategory, ItemFeature } = require('../models');
const { validateItem, checkValidation } = require('../middleware/validation');

// Create Item
exports.createItem = [
  ...validateItem,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const item = await Item.create(createData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: ['category', 'feature', 'creator', 'updater']
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
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
      const [updated] = await Item.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (updated) {
        const updatedItem = await Item.findByPk(req.params.id);
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
    const deleted = await Item.destroy({
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
