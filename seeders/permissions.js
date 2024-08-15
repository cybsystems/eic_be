// seedPermissions.js
const Permission  = require('../app/models').permissions; // Adjust the path as needed

const initialPermissions = [
  { name: 'see reports', description: 'Allows user to see reports' },
  { name: 'stock management', description: 'Allows user to manage stock' },
  // Add more permissions as needed
];

const seedPermissions = async () => {
  try {
    // Sync the model to create the table if it doesn't exist
    await Permission.sync();
    // Insert initial data if it doesn't already exist
    await Permission.bulkCreate(initialPermissions, { ignoreDuplicates: true });
    console.log('Permissions data seeded successfully.');
  } catch (error) {
    console.error('Error seeding permissions data:', error);
  }
};

module.exports = seedPermissions;
