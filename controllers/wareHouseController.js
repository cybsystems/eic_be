const { WareHouse } = require("../models");

exports.getAllWareHouses = async (req, res) => {
  try {
    const wareHouses = await WareHouse.findAll();
     res.status(200).json(wareHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
