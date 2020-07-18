const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class OrderAsset extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        orderId: {type: DataTypes.BIGINT, primaryKey: true},
        assetId: {type: DataTypes.INTEGER, primaryKey: true}
      },
      {
        tableName: 'order_asset',
        modelName: 'orderAsset',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
