const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");
const Users = db.users;
const Permission = db.permissions;

const createUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      permissions,
      role = null,
    } = req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const user = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: "staff",
    };

    // Create the user in the database
    const createdUser = await Users.create(user);

    // Handle permissions if any are provided
    if (permissions && permissions.length > 0) {
      const permissionRecords = await Permission.findAll({
        where: {
          id: permissions, // Find permissions by IDs
        },
      });

      if (permissionRecords.length > 0) {
        await createdUser.addPermissions(permissionRecords);
      }
    }

    res.send(createdUser);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a URL parameter
    const {
      email,
      firstName,
      lastName,
      permissions,
    } = req.body;

    // Find the existing user by ID
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the new email is already in use by another user
    if (email && email !== user.email) {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use." });
      }
    }

    // Update the user's details (excluding password and role)
    await user.update({
      email,
      firstName,
      lastName,
    });
    // Update permissions if provided
    if (permissions && permissions.length > 0) {
      const permissionRecords = await Permission.findAll({
        where: {
          id: permissions, // Find permissions by IDs
        },
      });
      if (permissionRecords.length > 0) {
        await user.setPermissions(permissionRecords); // Use setPermissions to replace existing ones
      }
    }

    res.status(200).send({ message: "User updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the User.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await User.destroy({
      where: {
        email: email,
      },
    });
    res.status(201).json({ message: "User deleted" });
  } catch (error) {
    console.log({ error });
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    const user = await Users.findByPk(userId, {
      attributes: ["id", "email", "firstName", "lastName", "password"], // Include password field if necessary
      include: {
        model: Permission,
        through: { attributes: [] }, // Exclude the join table attributes
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll({ where: { role: "staff" } });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};
module.exports = { createUser, getUsers, signInUser, deleteUser, getUserById,updateUser };
