const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;
export const PERMISSION = {
  PRODUCT: {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4
  },
  CUSTOMER: {
    CREATE: 5,
    READ: 6,
    UPDATE: 7,
    DELETE: 8
  },
  ORDER: {
    CREATE: 9,
    READ: 10,
    UPDATE: 11,
    DELETE: 12
  },
  INVENTORY: {
    CREATE: 13,
    READ: 14,
    UPDATE: 15,
    DELETE: 16
  },
  WAREHOUSE: {
    CREATE: 17,
    READ: 18,
    UPDATE: 19,
    DELETE: 20
  },
  COMPANY: {
    CREATE: 21,
    READ: 22,
    UPDATE: 23,
    DELETE: 24
  }
};

export const ALL_PERMISSIONS = [
  PERMISSION.PRODUCT.CREATE, PERMISSION.PRODUCT.READ, PERMISSION.PRODUCT.UPDATE, PERMISSION.PRODUCT.DELETE,
  PERMISSION.CUSTOMER.CREATE, PERMISSION.CUSTOMER.READ, PERMISSION.CUSTOMER.UPDATE, PERMISSION.CUSTOMER.DELETE,
  PERMISSION.ORDER.CREATE, PERMISSION.ORDER.READ, PERMISSION.ORDER.UPDATE, PERMISSION.ORDER.DELETE,
  PERMISSION.INVENTORY.CREATE, PERMISSION.INVENTORY.READ, PERMISSION.INVENTORY.UPDATE, PERMISSION.INVENTORY.DELETE,
  PERMISSION.WAREHOUSE.CREATE, PERMISSION.WAREHOUSE.READ, PERMISSION.WAREHOUSE.UPDATE, PERMISSION.WAREHOUSE.DELETE,
  PERMISSION.COMPANY.CREATE, PERMISSION.COMPANY.READ, PERMISSION.COMPANY.UPDATE, PERMISSION.COMPANY.DELETE];

export default class ACLAction extends Sequelize.Model {
  static init(sequelize, opts) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        moduleId: {type: DataTypes.INTEGER},
        name: {type: DataTypes.STRING(255)},
        remark: {type: DataTypes.TEXT}
      },
      {
        tableName: 'acl_action',
        modelName: 'aclAction',
        timestamps: false,
        sequelize, ...opts
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.ACLGroupAction, {
      through: models.ACLGroupAction,
      foreignKey: 'actionId',
      otherKey: 'groupId'
    });
    this.belongsTo(models.ACLModule, {foreignKey: 'moduleId', as: 'modules'});
  }
}
