require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const seedPermissions = require("./seeders/permissions"); // Adjust the path as needed

const app = express();

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "*",
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
const permissionRoutes = require("./app/routes/permission.routes");
const contractorCategoriesRoutes = require('./app/routes/contractorCategories');
const contractorsRoutes = require('./app/routes/contractors');
const contractorUnitAssignmentsRoutes = require('./app/routes/contractorUnitAssignments');
const contractorUnitsRoutes = require('./app/routes/contractorUnits');

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use('/api/contractor-categories', contractorCategoriesRoutes);
app.use('/api/contractors',  contractorsRoutes);
app.use('/api/contractor-unit-assignments',  contractorUnitAssignmentsRoutes);
app.use('/api/contractor-units',  contractorUnitsRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
