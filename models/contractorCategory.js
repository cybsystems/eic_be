module.exports = (sequelize, DataTypes) => {
  const ContractorCategory = sequelize.define('ContractorCategory', {
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
        model: 'UserTables',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'UserTables',
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

  ContractorCategory.associate = function(models) {
    ContractorCategory.belongsTo(models.UserTable, { as: 'creator', foreignKey: 'createdBy' });
    ContractorCategory.belongsTo(models.UserTable, { as: 'updater', foreignKey: 'updatedBy' });
    ContractorCategory.hasMany(models.Contractor, { foreignKey: 'categoryId' });
  };

  return ContractorCategory;
};
