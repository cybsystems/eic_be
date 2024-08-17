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
        model: 'ItemCategory',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ItemFeature',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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

  Item.associate = function(models) {
    Item.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    Item.belongsTo(models.User, { as: 'updater', foreignKey: 'updatedBy' });
    Item.belongsTo(models.ItemCategory, { foreignKey: 'categoryId', as: 'category' });
    Item.belongsTo(models.ItemFeature, { foreignKey: 'featureId', as: 'feature' });
    Item.hasMany(models.Dispatch, { foreignKey: 'itemId' });
  };

  return Item;
};
