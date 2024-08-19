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
          attributes: ["firstName","lastName","email"], // User Authorized by
        },
      ],
    });

    res.json(workOrders);
  } catch (error) {
    console.error("Error fetching work orders:", error);
    res.status(500).json({ message: "Error fetching work orders" });
  }
};

exports.updateStatus=async(req,res)=>{
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const workOrder = await WorkOrder.findByPk(id);

    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Update status
    workOrder.status = status;
    await workOrder.save();

    res.status(200).json({ message: 'Work order status updated successfully', workOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getWorkOrderById=async(req,res)=>{
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find the work order with the given ID and include related models
    const workOrder = await WorkOrder.findByPk(id, {
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
              model: Contractor,
              attributes: ["name"], // Contractor Name
            }
          ],
        },
        {
          model: UserTable,
          as: "creator",
          attributes: ["username","firstName","lastName","email"], // User Authorized by
        },
        {
          model: UserTable,
          as: "authorizedUser",
          attributes: ["firstName","lastName","email"], // User Authorized by
        },
      ],
    });

    if (!workOrder) {
      return res.status(404).json({ message: "Work order not found" });
    }

    res.json(workOrder);
  } catch (error) {
    console.error("Error fetching work order by ID:", error);
    res.status(500).json({ message: "Error fetching work order by ID" });
  }
}