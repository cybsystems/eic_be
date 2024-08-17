module.exports = (sequelize, DataTypes) => {
  const ContractorUnitAssignment = sequelize.define('ContractorUnitAssignment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Contractors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    contractorUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ContractorUnits',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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

  ContractorUnitAssignment.associate = function(models) {
    ContractorUnitAssignment.belongsTo(models.Contractor, { foreignKey: 'contractorId' });
    ContractorUnitAssignment.belongsTo(models.ContractorUnit, { foreignKey: 'contractorUnitId' });
    ContractorUnitAssignment.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    ContractorUnitAssignment.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
  };

  return ContractorUnitAssignment;
};
