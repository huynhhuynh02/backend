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
import UserResetPassword from './user/user-reset-password';
import Asset from './asset';
import Company from './company/company';
import CompanyOwnCompany from './company/company-own-company';
import CompanyPartnerPerson from './company/company-partner-person';
import CompanyPerson from './company/company-person';
import CompanyShop from './company/company-shop';
import Cost from './cost/cost';
import CostPurpose from './cost/cost-purpose';
import Inventory from './inventory/inventory';
import InventoryDetail from './inventory/inventory-detail';
import InventoryPurpose from './inventory/inventory-purpose';
import InventorySummary from './inventory/inventory-summary';
import Order from './order/order';
import OrderDetail from './order/order-detail';
import Person from './person';
import Product from './product/product';
import ProductAsset from './product/product-asset';
import ProductUnit from './product/product-unit';
import Shop from './shop';
import UserCompany from './user/user-company';
import UserShop from './user/user-shop';
import WareHouse from './warehouse';
import Audit from './audit';

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
  // ACL
  ACLAction: ACLAction.init(sequelize),
  ACLGroup: ACLGroup.init(sequelize),
  ACLGroupAction: ACLGroupAction.init(sequelize),
  ACLGroupActionShop: ACLGroupActionShop.init(sequelize),
  ACLModule: ACLModule.init(sequelize),

  // Company
  Company: Company.init(sequelize),
  CompanyOwnCompany: CompanyOwnCompany.init(sequelize),
  CompanyPartnerPerson: CompanyPartnerPerson.init(sequelize),
  CompanyPerson: CompanyPerson.init(sequelize),
  CompanyShop: CompanyShop.init(sequelize),

  // Cost
  Cost: Cost.init(sequelize),
  CostPurpose: CostPurpose.init(sequelize),

  // Email
  EmailSend: EmailSend.init(sequelize),

  // Inventory
  Inventory: Inventory.init(sequelize),
  InventoryDetail: InventoryDetail.init(sequelize),
  InventoryPurpose: InventoryPurpose.init(sequelize),
  InventorySummary: InventorySummary.init(sequelize),

  // Order
  Order: Order.init(sequelize),
  OrderDetail: OrderDetail.init(sequelize),

  // Product
  Product: Product.init(sequelize),
  ProductAsset: ProductAsset.init(sequelize),
  ProductUnit: ProductUnit.init(sequelize),

  // User
  User: User.init(sequelize),
  UserActivate: UserActivate.init(sequelize),
  UserResetPassword: UserResetPassword.init(sequelize),
  UserCompany: UserCompany.init(sequelize),
  UserShop: UserShop.init(sequelize),

  // Asset
  Asset: Asset.init(sequelize),
  // Audit
  Audit: Audit.init(sequelize),
  // Person
  Person: Person.init(sequelize),
  // Shop
  Shop: Shop.init(sequelize),
  // SystemProperty
  SystemProperty: SystemProperty.init(sequelize),
  // WareHouse
  WareHouse: WareHouse.init(sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
