const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Asset extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        size: {type: DataTypes.INTEGER},
        type: {type: DataTypes.STRING(50)},
        fileId: {type: DataTypes.STRING(64)},
        createdDate: {type: DataTypes.DATE}
      },
      {
        tableName: 'asset',
        modelName: 'asset',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
