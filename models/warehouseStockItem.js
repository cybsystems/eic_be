module.exports = (sequelize, DataTypes) => {
    const WareHouseStockItem = sequelize.define('WareHouseStockItem', {
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
     
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserTables', // Reference to UserTable model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'UserTables', // Reference to UserTable model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    });
  
    WareHouseStockItem.associate = function(models) {
      WareHouseStockItem.belongsTo(models.Items, { foreignKey: 'itemId', as: 'item' });
      WareHouseStockItem.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
      WareHouseStockItem.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });

    };
  
    return WareHouseStockItem;
  };
  