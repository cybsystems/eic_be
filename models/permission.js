module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        
      },
      createdBy: {
        type: DataTypes.INTEGER,
        
        references: {
          model: 'UserTables', // Reference to UserTable table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        
        references: {
          model: 'UserTables', // Reference to UserTable table
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
  
    Permission.associate = function(models) {
        Permission.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
        Permission.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    };
  
    return Permission;
  };
  