const {
  ProjectContractorUnitAssignment,
  Contractor,
  ContractorUnit,
} = require("../models");
const {
  validateContractorUnitAssignment,
  checkValidation,
} = require("../middleware/validation");
const sequelize = require("../models").sequelize; // Assuming you're using sequelize instance for transactions

exports.createProjectContractorUnitAssignment = [
  async (req, res) => {
    try {
      const { projectId, units } = req.body; // Expecting projectId and an array of units in the request body
      const userId = req.user.id; // Assuming user information is available in the request
      if (!Array.isArray(units) || units.length === 0) {
        return res
          .status(400)
          .json({ message: "Units should be a non-empty array" });
      }
      const transaction = await sequelize.transaction(); // Start a transaction
      // Step 1: Create contractor units
      const contractorUnits = await ContractorUnit.bulkCreate(
        units.map((unit) => ({
          name: unit.name,
          createdBy: userId,
          updatedBy: userId,
        })),
        { transaction }
      );
      // Step 2: Assign the created units to the project
      const assignments = await ProjectContractorUnitAssignment.bulkCreate(
        contractorUnits.map((unit) => ({
          projectId,
          contractorUnitId: unit.id,
          createdBy: userId,
          updatedBy: userId,
        })),
        { transaction }
      );

      await transaction.commit(); // Commit the transaction if everything went fine

      return res.status(201).json({
        message: "Units created and assigned to project successfully",
        data: assignments,
      });

      res.status(201).json(assignment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
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
    const assignment = await ProjectContractorUnitAssignment.findByPk(
      req.params.id
    );
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProjectContractorUnitAssignment = [
  async (req, res) => {
    try {
      const [updated] = await ProjectContractorUnitAssignment.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const assignment = await ProjectContractorUnitAssignment.findByPk(
          req.params.id
        );
        res.status(200).json(assignment);
      } else {
        res.status(404).json({ message: "Assignment not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.deleteProjectContractorUnitAssignment = async (req, res) => {
  try {
    const deleted = await ProjectContractorUnitAssignment.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: "Assignment deleted" });
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
