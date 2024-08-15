// seedPermissions.js
const Permission = require('../app/models').permissions; // Adjust the path as needed

const initialPermissions = [
  { name: 'see reports', description: 'Allows user to see reports' },
  { name: 'stock management', description: 'Allows user to manage stock' },
  { name: 'stock return', description: 'Allows user to manage returned stock' },

  // Add more permissions as needed
];

const seedPermissions = async () => {
  try {
    // Sync the model to create the table if it doesn't exist
    await Permission.sync();

    for (const permission of initialPermissions) {
      // Check if the permission already exists
      const [existingPermission] = await Permission.findOrCreate({
        where: { name: permission.name },
        defaults: permission
      });

      if (existingPermission) {
        console.log(`Permission "${permission.name}" already exists.`);
      } else {
        console.log(`Permission "${permission.name}" created.`);
      }
    }
  } catch (error) {
    console.error('Error seeding permissions data:', error);
  }
};

module.exports = seedPermissions;
