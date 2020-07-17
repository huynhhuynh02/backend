const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class ProductAsset extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        assetId: {type: DataTypes.BIGINT, primaryKey: true},
        productId: {type: DataTypes.BIGINT, primaryKey: true}
      },
      {
        tableName: 'product_asset',
        modelName: 'productAsset',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
