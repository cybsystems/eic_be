const { WareHouse, MaterialIssue,UserTable } = require("../models");

exports.getAllWareHouses = async (req, res) => {
  try {
    const wareHouses = await WareHouse.findAll();
    res.status(200).json(wareHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWarehusesFromMaterialIssue = async (req, res) => {
  try {
    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Fetch the user's warehouse ID
    const user = await UserTable.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userWarehouseId = user.wareHouseId;
    // Fetch the list of warehouses where toWareHouseId matches the user's warehouse ID
    const materialIssues = await MaterialIssue.findAll({
      where: {
        toWareHouseId: userWarehouseId,
      },
      include: [
        {
          model: WareHouse,
          as: "fromWareHouse",
        },
      ],
    });

    const warehouses = materialIssues.map((issue) => issue.fromWareHouse);

    // Return the list of warehouses
    return res.status(200).json(warehouses);
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
