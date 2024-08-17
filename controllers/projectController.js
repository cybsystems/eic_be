const { Project } = require('../models');
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
  }
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
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Project
exports.updateProject = [
  async (req, res) => {
    try {
      const [updated] = await Project.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const project = await Project.findByPk(req.params.id);
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
