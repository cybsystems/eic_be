module.exports = (sequelize, DataTypes) => {
    const MaterialIssueItem = sequelize.define("MaterialIssueItem", {
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
      materialIssueId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "MaterialIssues",
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
  
    MaterialIssueItem.associate = function (models) {
        MaterialIssueItem.belongsTo(models.UserTable, {
        as: "creator",
        foreignKey: "createdBy",
      });
      MaterialIssueItem.belongsTo(models.UserTable, {
        as: "updater",
        foreignKey: "updatedBy",
      });
      MaterialIssueItem.belongsTo(models.Items, { foreignKey: 'itemId', as: 'item' });
      MaterialIssueItem.belongsTo(models.MaterialIssue, { foreignKey: 'materialIssueId', as: 'materialIssue' });


    };
  
    return MaterialIssueItem;
  };
  