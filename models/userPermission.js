module.exports = (sequelize, DataTypes) => {
    const UserPermission = sequelize.define('UserPermission', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserTables',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
  
    UserPermission.associate = function(models) {
        UserPermission.belongsTo(models.UserTable, { foreignKey: 'userId' });
        UserPermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
        UserPermission.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
        UserPermission.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    };
  
    return UserPermission;
  };
  