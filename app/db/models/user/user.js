const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const {DataTypes} = Sequelize;

export const USER_STATUS = Object.freeze({
  ACTIVE: 1,
  BLOCKED: 2
});

export const USER_SEX = Object.freeze({
  MALE: 0,
  FEMALE: 1,
  OTHER: 2
});

export default class User extends Sequelize.Model {
  static init(sequelize, opts) {
    return super.init(
      {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING(100), unique: true},
        displayName: {type: DataTypes.STRING(250)},
        imageUrl: {type: DataTypes.TEXT},
        pwd: {type: DataTypes.STRING(256)},
        insertedDate: {type: DataTypes.DATE},
        groupId: {type: DataTypes.INTEGER},
        email_active: {type: DataTypes.BOOLEAN},
        address: {type: DataTypes.STRING(250)},
        gsm: {type: DataTypes.STRING(20)},
        sex: {type: DataTypes.INTEGER},
        birthday: {type: DataTypes.DATEONLY},
        remark: {type: DataTypes.TEXT},
        status: {type: DataTypes.INTEGER},
        createdById: {type: DataTypes.BIGINT}
      },
      {
        tableName: 'user',
        modelName: 'user',
        timestamps: false,
        sequelize, ...opts
      }
    );
  }

  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static associate(models) {
    this.belongsTo(models.ACLGroup, {
      foreignKey: 'groupId',
      as: 'group'
    });
    this.hasMany(models.ACLGroupAction, {
      foreignKey: 'groupId',
      sourceKey: 'groupId',
      as: 'permissions'
    });
    this.hasMany(models.ACLGroupActionShop, {
      foreignKey: 'groupId',
      sourceKey: 'groupId',
      as: 'shopPermissions'
    });
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}