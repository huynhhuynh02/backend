const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class ProductUnit extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        productId: {type: DataTypes.BIGINT, primaryKey: true},
        id: {type: DataTypes.INTEGER, primaryKey: true},
        name: {type: DataTypes.STRING(50)},
        rate: {type: DataTypes.DECIMAL(10,2)}
      },
      {
        tableName: 'product_unit',
        modelName: 'productUnit',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
