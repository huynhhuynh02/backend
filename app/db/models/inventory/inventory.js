const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Inventory extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        warehouseId: {type: DataTypes.BIGINT},
        processedDate: {type: DataTypes.DATE},
        insertedDate: {type: DataTypes.DATE},
        createdById: {type: DataTypes.BIGINT},
        companyId: {type: DataTypes.BIGINT},
        totalProduct: {type: DataTypes.INTEGER},
        remark: {type: DataTypes.TEXT}
      },
      {
        tableName: 'inventory',
        modelName: 'inventory',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
