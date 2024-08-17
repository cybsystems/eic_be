const { Contractor } = require('../models');
const { validateContractor, checkValidation } = require('../middleware/validation');

exports.createContractor = [
  ...validateContractor,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const contractor = await Contractor.create(createData);
      res.status(201).json(contractor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getAllContractors = async (req, res) => {
  try {
    const contractors = await Contractor.findAll();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContractorById = async (req, res) => {
  try {
    const contractor = await Contractor.findByPk(req.params.id);
    if (!contractor) return res.status(404).json({ message: 'Contractor not found' });
    res.status(200).json(contractor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContractor = [
  ...validateContractor,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await Contractor.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const contractor = await Contractor.findByPk(req.params.id);
        res.status(200).json(contractor);
      } else {
        res.status(404).json({ message: 'Contractor not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteContractor = async (req, res) => {
  try {
    const deleted = await Contractor.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Contractor deleted' });
    } else {
      res.status(404).json({ message: 'Contractor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
