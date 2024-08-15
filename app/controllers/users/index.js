const db = require("../../models");
const Users = db.users;
const Op = db.Sequelize.Op;

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = {
      email,
      password,
    };

    const data = await Users.create({
      ...user,
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

const getUsers=async(req,res)=>{
  try {
    const data=await Users.findAll()
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
}
module.exports = { createUser,getUsers };
