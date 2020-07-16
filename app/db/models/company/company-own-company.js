const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class CompanyOwnCompany extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        companyId: {type: DataTypes.BIGINT, primaryKey: true},
        partnerCompanyId: {type: DataTypes.BIGINT, primaryKey: true}
      },
      {
        tableName: 'company_own_company',
        modelName: 'companyOwnCompany',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
