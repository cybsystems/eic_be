module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('UserTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  });

  UserTable.associate = function(models) {
    UserTable.hasMany(models.Contractor, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.Contractor, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.ContractorCategory, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.ContractorCategory, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.ContractorUnit, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.ContractorUnit, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.Dispatch, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.Dispatch, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.Items, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.Items, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.ItemCategory, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.ItemCategory, { foreignKey: 'updatedBy' });
    UserTable.hasMany(models.ItemFeature, { foreignKey: 'createdBy' });
    UserTable.hasMany(models.ItemFeature, { foreignKey: 'updatedBy' });
  };

  return UserTable;
};
