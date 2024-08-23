module.exports = (sequelize, DataTypes) => {
  const WareHouse = sequelize.define("WareHouse", {
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
      allowNull: true,
      references: {
        model: "UserTables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "UserTables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  });

  WareHouse.associate = function (models) {
    WareHouse.belongsTo(models.UserTable, {
      as: "creator",
      foreignKey: "createdBy",
    });
    WareHouse.belongsTo(models.UserTable, {
      as: "updater",
      foreignKey: "updatedBy",
    });
  };

  return WareHouse;
};
