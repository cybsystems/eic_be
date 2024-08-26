module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Items', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ItemCategories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.INTEGER,
    },
    featureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ItemFeatures',
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    Item.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    Item.belongsTo(models.ItemCategory, { foreignKey: 'categoryId', as: 'category' });
    Item.belongsTo(models.ItemFeature, { foreignKey: 'featureId', as: 'feature' });
    Item.hasMany(models.Dispatch, { foreignKey: 'itemId' });
  };

  return Item;
};
