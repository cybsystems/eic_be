module.exports = (sequelize, DataTypes) => {
    const MaterialInward = sequelize.define('MaterialInward', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Items', // Reference to Item model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contractorId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable field
        references: {
          model: 'Contractor', // Reference to Contractor model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable field
        references: {
          model: 'Vendor', // Reference to Vendor model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to Users model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to Users model
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
  
    MaterialInward.associate = function(models) {
      MaterialInward.belongsTo(models.Items, { foreignKey: 'itemId', as: 'item' });
      MaterialInward.belongsTo(models.Contractor, { foreignKey: 'contractorId', as: 'contractor' });
      MaterialInward.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
      MaterialInward.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      MaterialInward.belongsTo(models.User, { as: 'updater', foreignKey: 'updatedBy' });
    };
  
    return MaterialInward;
  };
  