const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class CompanyPartnerPerson extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        partnerCompanyId: {type: DataTypes.BIGINT, primaryKey: true},
        personId: {type: DataTypes.BIGINT, primaryKey: true}
      },
      {
        tableName: 'company_partner_person',
        modelName: 'companyPartnerPerson',
        timestamps: false,
        sequelize, ...opts
      })
  }
}
