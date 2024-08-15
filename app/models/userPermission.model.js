// models/userPermission.model.js
const UserPermissionModel = (sequelize, Sequelize, User, Permission) => {
    const userPermission = sequelize.define("user_permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: Permission,
          key: "id",
        },
      },
    });
  
  
    return userPermission;
  };
  
  module.exports = UserPermissionModel;
  