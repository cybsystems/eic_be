const { Dispatch } = require('../models');
const { validateDispatch, checkValidation } = require('../middleware/validation');

// Create Dispatch
exports.createDispatch = [
  ...validateDispatch,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const dispatch = await Dispatch.create(createData);
      res.status(201).json(dispatch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all Dispatches
exports.getAllDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.findAll();
    res.status(200).json(dispatches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Dispatch by ID
exports.getDispatchById = async (req, res) => {
  try {
    const dispatch = await Dispatch.findByPk(req.params.id);
    if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
    res.status(200).json(dispatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Dispatch
exports.updateDispatch = [
  ...validateDispatch,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await Dispatch.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const dispatch = await Dispatch.findByPk(req.params.id);
        res.status(200).json(dispatch);
      } else {
        res.status(404).json({ message: 'Dispatch not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete Dispatch
exports.deleteDispatch = async (req, res) => {
  try {
    const deleted = await Dispatch.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Dispatch not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
