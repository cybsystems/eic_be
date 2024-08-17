module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
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
      totalCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables', // Reference to UserTable model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables', // Reference to UserTable model
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
  
    Stock.associate = function(models) {
      Stock.belongsTo(models.Items, { foreignKey: 'itemId', as: 'item' });
      Stock.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
      Stock.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    };
  
    return Stock;
  };
  