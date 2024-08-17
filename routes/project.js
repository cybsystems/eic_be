const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, projectController.createProject);
router.get('/', authenticateToken, projectController.getAllProjects);
router.get('/:id', authenticateToken, projectController.getProjectById);
router.get('/details/:id', authenticateToken, projectController.getProjectDetails);

router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);

module.exports = router;
