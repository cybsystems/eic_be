module.exports = (sequelize, DataTypes) => {
  const MaterialIssue = sequelize.define("MaterialIssue", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fromWareHouseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "WareHouses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    toWareHouseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "WareHouses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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

  MaterialIssue.associate = function (models) {
    MaterialIssue.belongsTo(models.UserTable, {
      as: "creator",
      foreignKey: "createdBy",
    });
    MaterialIssue.belongsTo(models.UserTable, {
      as: "updater",
      foreignKey: "updatedBy",
    });

    MaterialIssue.belongsTo(models.WareHouse, {
      as: "fromWareHouse",
      foreignKey: "fromWareHouseId",
    });
    MaterialIssue.belongsTo(models.WareHouse, {
      as: "toWareHouse",
      foreignKey: "tpWareHouseId",
    });
  };

  return MaterialIssue;
};
