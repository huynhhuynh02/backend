import User from './user/user';
import EmailSend from "./email/email_send";
import ACLAction from "./acl/acl-action";
import ACLGroup from "./acl/acl-group";
import ACLGroupAction from "./acl/acl-group-action";
import ACLGroupActionShop from "./acl/acl-group-action-shop";
import ACLModule from "./acl/acl-module";
import UserActivate from "./user/user-activate";
import SystemProperty from "./system-property";
import databaseConfig from '../../config/database';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  ...databaseConfig[env]
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  User: User.init(sequelize),
  UserActivate: UserActivate.init(sequelize),
  EmailSend: EmailSend.init(sequelize),

  // ACL
  ACLAction: ACLAction.init(sequelize),
  ACLGroup: ACLGroup.init(sequelize),
  ACLGroupAction: ACLGroupAction.init(sequelize),
  ACLGroupActionShop: ACLGroupActionShop.init(sequelize),
  ACLModule: ACLModule.init(sequelize),

  SystemProperty: SystemProperty.init(sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
