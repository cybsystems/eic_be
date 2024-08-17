module.exports = (sequelize, DataTypes) => {
  const Dispatch = sequelize.define('Dispatch', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    contractorUnitAssignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ContractorUnitAssignments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    quantity: {
      type: DataTypes.INTEGER,
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

  Dispatch.associate = function(models) {
    Dispatch.belongsTo(models.Items, { foreignKey: 'itemId', as: 'item' });
    Dispatch.belongsTo(models.ContractorUnitAssignment, { foreignKey: 'contractorUnitAssignmentId', as: 'contractorUnitAssignment' });
    Dispatch.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    Dispatch.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
  };

  return Dispatch;
};
