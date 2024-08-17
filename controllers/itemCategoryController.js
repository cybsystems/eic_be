const { ItemCategory } = require('../models');
const { validateItemCategory, checkValidation } = require('../middleware/validation');

// Create ItemCategory
exports.createItemCategory = [
  ...validateItemCategory,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const itemCategory = await ItemCategory.create(createData);
      res.status(201).json(itemCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all ItemCategories
exports.getAllItemCategories = async (req, res) => {
  try {
    const itemCategories = await ItemCategory.findAll({
      include: ['creator', 'updater']
    });
    res.status(200).json(itemCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get ItemCategory by ID
exports.getItemCategoryById = async (req, res) => {
  try {
    const itemCategory = await ItemCategory.findByPk(req.params.id, {
      include: ['creator', 'updater']
    });
    if (itemCategory) {
      res.status(200).json(itemCategory);
    } else {
      res.status(404).json({ error: 'ItemCategory not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update ItemCategory
exports.updateItemCategory = [
  ...validateItemCategory,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await ItemCategory.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (updated) {
        const updatedItemCategory = await ItemCategory.findByPk(req.params.id);
        res.status(200).json(updatedItemCategory);
      } else {
        res.status(404).json({ error: 'ItemCategory not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete ItemCategory
exports.deleteItemCategory = async (req, res) => {
  try {
    const deleted = await ItemCategory.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ItemCategory not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
