const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class WareHouse extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        address: {type: DataTypes.TEXT},
        userId: {type: DataTypes.BIGINT},
        companyId: {type: DataTypes.BIGINT}
      },
      {
        tableName: 'warehouse',
        modelName: 'wareHouse',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
