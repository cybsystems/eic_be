const { where } = require("sequelize");
const {
  Project,
  ProjectContractorUnitAssignment,
  ContractorUnit,
  ContractorUnitAssignment,
  Contractor,
} = require("../models");
// const { validateProject, checkValidation } = require('../middleware/validation');

// Create Project
exports.createProject = [
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      const project = await Project.create(createData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get all Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const project = await Project.findByPk(projectId);
    const assignments = await ProjectContractorUnitAssignment.findAll({
      where: { projectId },
      include: [
        {
          model: ContractorUnit,
          attributes: ["id", "name"],
        },
      ],
    });
    const units = assignments.map((assignment) => ({
      id: assignment.ContractorUnit.id,
      name: assignment.ContractorUnit.name,
    }));

    if (project) {
      res.status(200).json({ name: project.name, units });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params; // Project ID from the route parameters
    const { id: projectId } = req.params;

    const project = await Project.findByPk(projectId);
    const projectUnitsAndContractors = await ContractorUnitAssignment.findAll({
      where: { projectId: id },
      include: [
        {
          model: Contractor,
          attributes: ["id", "name","email","phoneNumber"],
          as:'contractor'

        },
        {
          model: ContractorUnit, // Include the ContractorUnit model
          attributes: ["id", "name"], // Include the necessary attributes
          as:'contractorUnit'
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({projectDetails:project, contractorUnits: projectUnitsAndContractors });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching project details",
        error: error.message,
      });
  }
};
// Update Project
exports.updateProject = [
  async (req, res) => {
    try {
      const [updated] = await Project.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const project = await Project.findByPk(req.params.id);
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
