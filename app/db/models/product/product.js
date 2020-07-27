const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Product extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        imageId: {type: DataTypes.BIGINT},
        priceBaseUnit: {type: DataTypes.DECIMAL(16,2)},
        remark: {type: DataTypes.TEXT},
        companyId: {type: DataTypes.BIGINT},
        createdById: {type: DataTypes.INTEGER},
        createdDate: {type: DataTypes.DATE}
      },
      {
        tableName: 'product',
        modelName: 'product',
        timestamps: false,
        sequelize, ...opts
      })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy' });
    this.belongsToMany(models.Asset, {
      through: models.ProductAsset,
      foreignKey: 'productId',
      otherKey: 'assetId',
      as: 'productAssets'
    });
  }
}
