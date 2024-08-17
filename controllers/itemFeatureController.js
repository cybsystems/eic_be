const { ItemFeature } = require('../models');
const { validateItemFeature, checkValidation } = require('../middleware/validation');

// Create ItemFeature
exports.createItemFeature = [
  ...validateItemFeature,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const itemFeature = await ItemFeature.create(createData);
      res.status(201).json(itemFeature);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all ItemFeatures
exports.getAllItemFeatures = async (req, res) => {
  try {
    const itemFeatures = await ItemFeature.findAll({
      include: ['creator', 'updater']
    });
    res.status(200).json(itemFeatures);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get ItemFeature by ID
exports.getItemFeatureById = async (req, res) => {
  try {
    const itemFeature = await ItemFeature.findByPk(req.params.id, {
      include: ['creator', 'updater']
    });
    if (itemFeature) {
      res.status(200).json(itemFeature);
    } else {
      res.status(404).json({ error: 'ItemFeature not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update ItemFeature
exports.updateItemFeature = [
  ...validateItemFeature,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await ItemFeature.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (updated) {
        const updatedItemFeature = await ItemFeature.findByPk(req.params.id);
        res.status(200).json(updatedItemFeature);
      } else {
        res.status(404).json({ error: 'ItemFeature not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete ItemFeature
exports.deleteItemFeature = async (req, res) => {
  try {
    const deleted = await ItemFeature.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'ItemFeature not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
