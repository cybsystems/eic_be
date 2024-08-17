const {Permission} = require("../models"); // Adjust the path as needed

exports.createPermission = [
  
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      const permissions = await Permission.create(createData);
      res.status(201).json(permissions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];


exports.getAllPermissions = [async (req, res) => {
  try {
    // Fetch all permissions from the database
    const permissions = await Permission.findAll();

    // Send the permissions as a response
    res.status(200).json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}];

