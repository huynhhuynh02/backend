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

  static associate (models) {
    this.belongsTo(models.WareHouse, { foreignKey: 'warehouseId', as: 'warehouse' });
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    this.belongsTo(models.ProductUnit, { foreignKey: 'unitId', as: 'unit' });
    this.hasMany(models.InventoryDetailSerial, { foreignKey: 'inventorySummaryId', as: 'serials' });
  }
}
