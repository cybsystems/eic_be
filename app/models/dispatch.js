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
        model: 'ContractorUnitAssignment',
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

  Dispatch.associate = function(models) {
    Dispatch.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    Dispatch.belongsTo(models.ContractorUnitAssignment, { foreignKey: 'contractorUnitAssignmentId', as: 'contractorUnitAssignment' });
    Dispatch.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    Dispatch.belongsTo(models.User, { as: 'updater', foreignKey: 'updatedBy' });
  };

  return Dispatch;
};
