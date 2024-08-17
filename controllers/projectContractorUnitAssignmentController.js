const { ProjectContractorUnitAssignment, Contractor, ContractorUnit } = require('../models');
const { validateContractorUnitAssignment, checkValidation } = require('../middleware/validation');

exports.createProjectContractorUnitAssignment = [
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      const assignment = await ProjectContractorUnitAssignment.create(createData);
      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.getAllProjectContractorUnitAssignments = async (req, res) => {
  try {
    const assignments = await ProjectContractorUnitAssignment.findAll();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectContractorUnitAssignmentById = async (req, res) => {
  try {
    const assignment = await ProjectContractorUnitAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProjectContractorUnitAssignment = [
  async (req, res) => {
    try {
      const [updated] = await ProjectContractorUnitAssignment.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const assignment = await ProjectContractorUnitAssignment.findByPk(req.params.id);
        res.status(200).json(assignment);
      } else {
        res.status(404).json({ message: 'Assignment not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.deleteProjectContractorUnitAssignment = async (req, res) => {
  try {
    const deleted = await ProjectContractorUnitAssignment.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Assignment deleted' });
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
