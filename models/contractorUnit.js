module.exports = (sequelize, DataTypes) => {
  const ContractorUnit = sequelize.define('ContractorUnit', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  });

  ContractorUnit.associate = function(models) {
    ContractorUnit.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    ContractorUnit.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    ContractorUnit.belongsToMany(models.Contractor, { through: models.ContractorUnitAssignment, foreignKey: 'contractorUnitId', as: 'contractors' });
  };

  return ContractorUnit;
};
