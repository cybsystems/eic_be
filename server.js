require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());  

app.use(express.urlencoded({ extended: true }));   

const db = require("./app/models");
db.sequelize.sync()

const userRoutes=require("./app/routes/user.routes");
app.use('/api/users', userRoutes);


 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
