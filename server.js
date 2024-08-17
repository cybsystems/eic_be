const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { sequelize } = require('./models'); // Import sequelize instance

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'nts-east-india',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Import Routes
const contractorCategoriesRoutes = require('./routes/contractorCategories');
const contractorsRoutes = require('./routes/contractors');
const contractorUnitAssignmentsRoutes = require('./routes/contractorUnitAssignments');
const contractorUnitsRoutes = require('./routes/contractorUnits');
const dispatchesRoutes = require('./routes/dispatches');
const itemCategoriesRoutes = require('./routes/itemCategories');
const itemsRoutes = require('./routes/items');
const itemFeaturesRoutes = require('./routes/itemFeatures');
const materialInwardsRoutes = require('./routes/materialInwards');
const usersRoutes = require('./routes/users');
const vendorsRoutes = require('./routes/vendors');

// Use Routes
app.use('/api/contractor-categories', contractorCategoriesRoutes);
app.use('/api/contractors',  contractorsRoutes);
app.use('/api/contractor-unit-assignments',  contractorUnitAssignmentsRoutes);
app.use('/api/contractor-units',  contractorUnitsRoutes);
app.use('/api/dispatches',  dispatchesRoutes);
app.use('/api/item-categories',  itemCategoriesRoutes);
app.use('/api/items',  itemsRoutes);
app.use('/api/item-features',  itemFeaturesRoutes);
app.use('/api/material-inwards',  materialInwardsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vendors',  vendorsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server and synchronize models
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error synchronizing database:', err);
});
