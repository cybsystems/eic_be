const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");
const Users=db.users;
const Permission=db.permissions;
const UserPermission=db.userPermission
 
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
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const user = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
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
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const getUser = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};
module.exports = { createUser, getUser, signInUser, deleteUser };
