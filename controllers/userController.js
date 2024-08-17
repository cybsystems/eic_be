const { UserTable } = require('../models');
const { validateUserTable, checkValidation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create UserTable
exports.createUserTable = [
  ...validateUserTable,
  checkValidation,
  async (req, res) => {
    try {
      const user = await UserTable.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all UserTable
exports.getAllUserTable = async (req, res) => {
  try {
    const users = await UserTable.findAll();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get UserTable by ID
exports.getUserTableById = async (req, res) => {
  try {
    const user = await UserTable.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'UserTable not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update UserTable
exports.updateUserTable = [
  ...validateUserTable,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await UserTable.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const user = await UserTable.findByPk(req.params.id);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'UserTable not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete UserTable
exports.deleteUserTable = async (req, res) => {
  try {
    const deleted = await UserTable.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'UserTable not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserTable({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserTable.findOne({ username });
    console.log(user.dataValues)
    const newUser = user.dataValues;
    if (!newUser) return res.status(404).json({ message: 'User not found' });

    let isMatch = false
    isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: newUser.id }, "ntseic");
    res.json({token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};