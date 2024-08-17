module.exports = (sequelize, DataTypes) => {
  const ItemCategory = sequelize.define('ItemCategory', {
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

  ItemCategory.associate = function(models) {
    ItemCategory.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    ItemCategory.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    ItemCategory.hasMany(models.Items, { foreignKey: 'categoryId' });
  };

  return ItemCategory;
};
