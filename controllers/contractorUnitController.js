const { ContractorUnit, Contractor, ContractorCategory } = require('../models');
const { validateContractorUnit, checkValidation } = require('../middleware/validation');

exports.createContractorUnit = [
  ...validateContractorUnit,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const unit = await ContractorUnit.create(createData);
      res.status(201).json(unit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getAllContractorUnits = async (req, res) => {
  try {
    const units = await ContractorUnit.findAll();
    res.status(200).json(units);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContractorUnitById = async (req, res) => {
  try {
    const unit = await ContractorUnit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    res.status(200).json(unit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContractorUnit = [
  ...validateContractorUnit,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await ContractorUnit.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const unit = await ContractorUnit.findByPk(req.params.id);
        res.status(200).json(unit);
      } else {
        res.status(404).json({ message: 'Unit not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteContractorUnit = async (req, res) => {
  try {
    const deleted = await ContractorUnit.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Unit deleted' });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
