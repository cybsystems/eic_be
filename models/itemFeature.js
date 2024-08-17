module.exports = (sequelize, DataTypes) => {
  const ItemFeature = sequelize.define('ItemFeature', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    feature: {
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

  ItemFeature.associate = function(models) {
    ItemFeature.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    ItemFeature.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    ItemFeature.hasMany(models.Items, { foreignKey: 'featureId' });
  };

  return ItemFeature;
};
