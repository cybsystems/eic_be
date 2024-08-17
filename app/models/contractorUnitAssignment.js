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
        model: 'Contractor',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    contractorUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ContractorUnit',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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
    ContractorUnitAssignment.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    ContractorUnitAssignment.belongsTo(models.User, { as: 'updater', foreignKey: 'updatedBy' });
  };

  return ContractorUnitAssignment;
};
