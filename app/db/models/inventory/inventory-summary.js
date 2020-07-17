const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class InventorySummary extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        warehouseId: {type: DataTypes.BIGINT, primaryKey: true},
        productId: {type: DataTypes.BIGINT, primaryKey: true},
        unitId: {type: DataTypes.INTEGER, primaryKey: true},
        quantity: {type: DataTypes.DECIMAL(16,2)},
        lastModifiedDate: {type: DataTypes.DATE},
        companyId: {type: DataTypes.BIGINT}
      },
      {
        tableName: 'inventory_summary',
        modelName: 'inventorySummary',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
