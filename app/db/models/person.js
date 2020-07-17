const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Person extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        firstName: {type: DataTypes.STRING(150)},
        lastName: {type: DataTypes.STRING(150)},
        gsm: {type: DataTypes.STRING(20)},
        email: {type: DataTypes.STRING(150)},
        address: {type: DataTypes.STRING(250)},
        birthday: {type: DataTypes.DATEONLY},
        sex: {type: DataTypes.TINYINT},
        createdById: {type: DataTypes.INTEGER},
        createdDate: {type: DataTypes.DATE}
      },
      {
        tableName: 'person',
        modelName: 'person',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
