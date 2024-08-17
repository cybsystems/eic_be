module.exports = (sequelize, DataTypes) => {
  const ContractorCategory = sequelize.define('ContractorCategory', {
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
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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

  ContractorCategory.associate = function(models) {
    ContractorCategory.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    ContractorCategory.belongsTo(models.User, { as: 'updater', foreignKey: 'updatedBy' });
    ContractorCategory.hasMany(models.Contractor, { foreignKey: 'categoryId' });
  };

  return ContractorCategory;
};
