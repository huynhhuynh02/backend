const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Company extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        gsm: {type: DataTypes.STRING(20)},
        address: {type: DataTypes.STRING(250)},
        remark: {type: DataTypes.TEXT},
        createdDate: {type: DataTypes.DATE},
        createdById: {type: DataTypes.BIGINT}
      },
      {
        tableName: 'company',
        modelName: 'company',
        timestamps: false,
        sequelize, ...opts
      })
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserCompany,
      foreignKey: 'companyId',
      otherKey: 'userId',
      as: 'companyUsers'
    });
  }
}
