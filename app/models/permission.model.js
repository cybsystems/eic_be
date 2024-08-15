const PermissionModel = (sequelize, Sequelize) => {
  const Permission = sequelize.define("permissions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Permission;
};

module.exports = PermissionModel;
