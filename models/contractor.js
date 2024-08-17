module.exports = (sequelize, DataTypes) => {
  const Contractor = sequelize.define('Contractor', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull:true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ContractorCategories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserTables',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserTables',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    },
  });

  Contractor.associate = function(models) {
    Contractor.belongsTo(models.ContractorCategory, { foreignKey: 'categoryId', as: 'category' });
    Contractor.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    Contractor.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    Contractor.hasMany(models.Dispatch, { foreignKey: 'contractorUnitAssignmentId' });
  };

  return Contractor;
};
