const db = require("../../models"); // Adjust the path as needed
const Permission = db.permissions;

const getAllPermissions = async (req, res) => {
  try {
    // Fetch all permissions from the database
    const permissions = await Permission.findAll();

    // Send the permissions as a response
    res.status(200).json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPermissions,
};
