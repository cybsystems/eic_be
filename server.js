require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const seedPermissions = require("./seeders/permissions"); // Adjust the path as needed

const app = express();

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize
  .sync({ alter: true })
  .then(async () => {
    try {
      await seedPermissions();

   
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
  const userRoutes = require("./app/routes/user.routes");
  app.use("/api/users", userRoutes);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });