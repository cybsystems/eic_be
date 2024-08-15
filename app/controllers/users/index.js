const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../../models");
const Users = db.users;
const Op = db.Sequelize.Op;

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      password:hashedPassword,
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

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser=async(req,res)=>{
  try {
    const { email } = req.body;

   const data= await Users.destroy({
      where: {
        email: email,
      },
    });
    res.status(201).json({ message: "User deleted" });

  } catch (error) {
    console.log({error})
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
}


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
module.exports = { createUser,getUsers,signInUser,deleteUser };
