const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const WorkOrder = sequelize.define("WorkOrder", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status:{
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expectedStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expectedEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    authorizedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserTables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Projects",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ContractorUnitAssignments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserTables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserTables",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    },
  });
  WorkOrder.associate = function (models) {
    WorkOrder.belongsTo(models.Project, { foreignKey: "projectId" });
    WorkOrder.belongsTo(models.ContractorUnitAssignment, {
      foreignKey: "unitId",
    });
    WorkOrder.belongsTo(models.UserTable, { 
      as:"authorizedUser",
      foreignKey: "authorizedBy" ,

    });

    WorkOrder.belongsTo(models.UserTable, {
      as: "creator",
      foreignKey: "createdBy",
    });
    WorkOrder.belongsTo(models.UserTable, {
      as: "updater",
      foreignKey: "updatedBy",
    });
  };
  return WorkOrder;
};
