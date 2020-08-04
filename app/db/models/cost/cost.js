const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

export default class Cost extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(250)},
        type: {type: DataTypes.TINYINT},
        amount: {type: DataTypes.DECIMAL(16, 2)},
        companyId: {type: DataTypes.BIGINT},
        createdById: {type: DataTypes.BIGINT},
        createdDate: {type: DataTypes.DATE},
        processedDate: {type: DataTypes.DATE},
        lastModifiedDate: {type: DataTypes.DATE},
        lastModifiedById: {type: DataTypes.BIGINT},
        partnerCompanyId: {type: DataTypes.BIGINT},
        partnerPersonId: {type: DataTypes.BIGINT},
        remark: {type: DataTypes.TEXT}
      },
      {
        tableName: 'cost',
        modelName: 'cost',
        timestamps: false,
        sequelize, ...opts
      })
  }
  static associate (models) {
    this.belongsTo(models.PartnerCompany, {
      foreignKey:'partnerCompanyId',
      as: 'partnerCompany'
    });
    this.belongsTo(models.PartnerPerson, {
      foreignKey:'partnerPersonId',
      as: 'partnerPerson'
    });
  }
}
