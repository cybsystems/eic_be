const { MaterialInward, Item, Contractor, Vendor } = require('../models');
const { validateMaterialInward, checkValidation } = require('../middleware/validation');

// Create MaterialInward
exports.createMaterialInward = [
  ...validateMaterialInward,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const materialInward = await MaterialInward.create(createData);
      res.status(201).json(materialInward);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all MaterialInwards
exports.getAllMaterialInwards = async (req, res) => {
  try {
    const materialInwards = await MaterialInward.findAll({
      include: ['item', 'contractor', 'vendor', 'creator', 'updater']
    });
    res.status(200).json(materialInwards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get MaterialInward by ID
exports.getMaterialInwardById = async (req, res) => {
  try {
    const materialInward = await MaterialInward.findByPk(req.params.id, {
      include: ['item', 'contractor', 'vendor', 'creator', 'updater']
    });
    if (materialInward) {
      res.status(200).json(materialInward);
    } else {
      res.status(404).json({ error: 'MaterialInward not found' });
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
        returning: true
      });
      if (updated) {
        const updatedMaterialInward = await MaterialInward.findByPk(req.params.id);
        res.status(200).json(updatedMaterialInward);
      } else {
        res.status(404).json({ error: 'MaterialInward not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete MaterialInward
exports.deleteMaterialInward = async (req, res) => {
  try {
    const deleted = await MaterialInward.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'MaterialInward not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
