const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class InventorySummary extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        warehouseId: {type: DataTypes.BIGINT},
        productId: {type: DataTypes.BIGINT},
        unitId: {type: DataTypes.INTEGER},
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
