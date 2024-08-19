const { WorkOrder,Project,ContractorUnitAssignment,ContractorUnit,Contractor,UserTable } = require("../models");

exports.createWorkOrder = [
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdBy"] = req.user.id;
      createData["updatedBy"] = req.user.id;
      createData["status"]=1;
      const workOrder = await WorkOrder.create(createData);
      res.status(201).json(workOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get all Projects
exports.getAllWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.findAll({
      attributes: ["title"],
      include: [
        {
          model: Project,
          attributes: ["name"], // Project Name
        },
        {
          model: ContractorUnitAssignment,
          include: [
            {
              model: ContractorUnit,
              attributes: ["name"], // Unit Name
              
            },
            {
              model:Contractor,
              attributes: ["name"], 
            }
          ],
        },
        {
          model: UserTable,
          as: "creator",
          attributes: ["username"], // User Created by
        },
        {
          model: UserTable,
          as: "authorizedUser",
          attributes: ["username"], // User Authorized by
        },
      ],
    });

    res.json(workOrders);
  } catch (error) {
    console.error("Error fetching work orders:", error);
    res.status(500).json({ message: "Error fetching work orders" });
  }
};
