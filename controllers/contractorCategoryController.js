const { ContractorCategory } = require('../models');
const { validateContractorCategory, checkValidation } = require('../middleware/validation');

exports.createContractorCategory = [
  ...validateContractorCategory,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      const category = await ContractorCategory.create(createData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getAllContractorCategories = async (req, res) => {
  try {
    const categories = await ContractorCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContractorCategoryById = async (req, res) => {
  try {
    const category = await ContractorCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContractorCategory = [
  ...validateContractorCategory,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await ContractorCategory.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const category = await ContractorCategory.findByPk(req.params.id);
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteContractorCategory = async (req, res) => {
  try {
    const deleted = await ContractorCategory.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
