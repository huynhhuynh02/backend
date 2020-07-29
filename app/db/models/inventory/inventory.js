const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export const INVENTORY_TYPE  = {
  OUT: 1,
  IN: 2
  // Goods Issue = OUT
  // Goods Receipt = IN
};

export default class Inventory extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        warehouseId: {type: DataTypes.BIGINT},
        type: {type: DataTypes.TINYINT},
        processedDate: {type: DataTypes.DATE},
        companyId: {type: DataTypes.BIGINT},
        totalProduct: {type: DataTypes.INTEGER},
        remark: {type: DataTypes.TEXT},
        createdDate: {type: DataTypes.DATE},
        createdById: {type: DataTypes.BIGINT},
        lastModifiedDate: {type: DataTypes.DATE},
        lastModifiedById: {type: DataTypes.BIGINT}
      },
      {
        tableName: 'inventory',
        modelName: 'inventory',
        timestamps: false,
        sequelize, ...opts
      })
  }


  static associate(models) {
    this.hasMany(models.InventoryDetail, {
      foreignKey: 'inventoryId',
      as: 'details'
    });
  }

}
