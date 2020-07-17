const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class InventoryDetail extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        inventoryId: {type: DataTypes.BIGINT, primaryKey: true},
        id: {type: DataTypes.INTEGER, primaryKey: true},
        productId: {type: DataTypes.BIGINT},
        quantity: {type: DataTypes.DECIMAL(14,2)},
        remark: {type: DataTypes.TEXT}
      },
      {
        tableName: 'inventory_detail',
        modelName: 'inventoryDetail',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
