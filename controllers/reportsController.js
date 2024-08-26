const {
  MaterialInward,
  Items: Item,
  Vendor,
  WareHouse,
  ContractorUnitAssignment,
  Contractor,
  Project,
  ContractorUnit,
  Dispatch,
  sequelize,
} = require("../models"); // Adjust the path to your models

exports.getDispatchReport = async (req, res) => {
  try {
    const dispatchReport = await Dispatch.findAll({
      attributes: [
        "id",
        "createdAt",
        "quantity",
        [sequelize.col("item.item"), "itemName"],
        [sequelize.col("contractorUnitAssignment.project.name"), "projectName"],
        [
          sequelize.col("contractorUnitAssignment.contractorUnit.name"),
          "unitName",
        ],
        [
          sequelize.col("contractorUnitAssignment.contractor.name"),
          "contractorName",
        ],
      ],
      include: [
        {
          model: Item,
          as: "item",
          attributes: [],
        },
        {
          model: ContractorUnitAssignment,
          as: "contractorUnitAssignment",
          attributes: [],
          include: [
            {
              model: Contractor,
              as: "contractor",
              attributes: [],
            },
            {
              model: Project,
              as: "project",
              attributes: [],
            },
            {
              model: ContractorUnit,
              as: "contractorUnit",
              attributes: [],
            },
          ],
        },
      ],
    });

    res.json(dispatchReport);
  } catch (error) {
    console.error("Error fetching dispatch report data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getStockReport = async (req, res) => {
  try {
    // Fetch all items with their quantities
    const items = await Item.findAll({
      include: ["category", "feature", "creator", "updater"],
    });

    // Respond with the fetched data
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInwardReport = async (req, res) => {
  try {
    const reportData = await MaterialInward.findAll({
      attributes: [
        "id",
        "createdAt",
        "quantity",
        [sequelize.col("item.item"), "itemName"],
        [sequelize.col("warehouse.name"), "warehouseName"],
        [sequelize.col("contractor.name"), "contractorName"],
        [sequelize.col("vendor.name"), "vendorName"],
      ],
      include: [
        {
          model: Item,
          as: "item",
          attributes: [],
        },
        {
          model: Contractor,
          as: "contractor",
          attributes: [],
        },
        {
          model: Vendor,
          as: "vendor",
          attributes: [],
        },
        {
          model: WareHouse,
          as: "warehouse",
          attributes: [],
        },
      ],
    });

    res.json(reportData);
  } catch (error) {
    console.error("Error fetching report data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
