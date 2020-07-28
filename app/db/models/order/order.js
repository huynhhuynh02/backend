const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;


export const ORDER_TYPE  = {
  SALE: 1,
  PURCHASE: 2
};

export default class Order extends Sequelize.Model{
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        purchaseDate: {type: DataTypes.DATE},
        partnerPersonId: {type: DataTypes.BIGINT},
        partnerCompanyId: {type: DataTypes.BIGINT},
        type: {type: DataTypes.TINYINT},
        companyId: {type: DataTypes.BIGINT},
        totalAmount: {type: DataTypes.DECIMAL(16,2)},
        remark: {type: DataTypes.TEXT},
        shopId: {type: DataTypes.BIGINT},
        lastModifiedDate: {type: DataTypes.DATE},
        lastModifiedById: {type: DataTypes.BIGINT},
        createdById: {type: DataTypes.BIGINT},
        createdDate: {type: DataTypes.DATE}
      },
      {
        tableName: 'order',
        modelName: 'order',
        timestamps: false,
        sequelize, ...opts
      })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy' });
    this.belongsToMany(models.Asset, {
      through: models.OrderAsset,
      foreignKey: 'orderId',
      otherKey: 'assetId',
      as: 'assets'
    });
    this.hasMany(models.OrderDetail, {
      foreignKey: 'orderId',
      as: 'details'
    });
  }
}
