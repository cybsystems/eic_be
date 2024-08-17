const { ContractorUnitAssignment, Contractor, ContractorUnit } = require('../models');
const { validateContractorUnitAssignment, checkValidation } = require('../middleware/validation');

exports.createContractorUnitAssignment = [
  ...validateContractorUnitAssignment,
  checkValidation,
  async (req, res) => {
    try {
      const assignment = await ContractorUnitAssignment.create(req.body);
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getAllContractorUnitAssignments = async (req, res) => {
  try {
    const assignments = await ContractorUnitAssignment.findAll();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContractorUnitAssignmentById = async (req, res) => {
  try {
    const assignment = await ContractorUnitAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContractorUnitAssignment = [
  ...validateContractorUnitAssignment,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await ContractorUnitAssignment.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const assignment = await ContractorUnitAssignment.findByPk(req.params.id);
        res.status(200).json(assignment);
      } else {
        res.status(404).json({ message: 'Assignment not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteContractorUnitAssignment = async (req, res) => {
  try {
    const deleted = await ContractorUnitAssignment.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Assignment deleted' });
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
