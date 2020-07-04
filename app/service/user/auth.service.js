import db from '../../db/models';
import {badRequest, FIELD_ERROR, FieldError, FormError} from "../../config/error";
import {USER_STATUS} from "../../db/models/user/user";
import APP_CONFIG from "../../config/application";
import {appLog} from "../../config/winston";
import {USER_EVENT, userEmitter} from "../../event/user.event";
import {ALL_PERMISSIONS} from "../../db/models/acl/acl-action";
import {ACTION_TYPE} from "../../db/models/acl/acl-group-action";

const jwt = require('jsonwebtoken');

const userNameFilter = ['admin', 'www', 'support', 'cryptocash', 'usd', 'ciphercore', 'ciphc', 'peak', 'addfund',
  'transfer', 'transaction', 'withdraw', 'username', 'password', 'package', 'order', 'amount', 'dashboard', 'menu',
  'genealogy', 'btc', 'class', 'profile', 'purchase', 'wallet', 'deposit', 'history', 'new', 'faq', 'av', 'gift', 'notice',
  'account', 'addfund', 'administrator', 'agent', 'amount', 'asset', 'bank', 'bitcoin', 'blockchain', 'BTC', 'business',
  'cash', 'ciphc', 'cipher', 'cipher-core', 'class', 'coin', 'company', 'crypto', 'cryptocash', 'dashboard', 'Deposit',
  'director', 'Download', 'email', 'Exchange', 'Fee', 'fin', 'forgot', 'freecode', 'fund', 'genealogy', 'gift',
  'history', 'joinus', 'login', 'manager', 'market', 'marketing', 'master', 'menu', 'money', 'nakamura', 'news',
  'newsletter', 'notice', 'nti', 'office', 'order', 'package', 'password', 'pay', 'Payment', 'peak', 'profile', 'purchase', 'sale', 'save',
  'shop', 'signup', 'sixpay', 'staff', 'support', 'system', 'takotoshi', 'token', 'transaction', 'transfer',
  'update', 'upload', 'USD', 'username', 'wallet', 'webmaster', 'webmaster', 'weboffice', 'Withdraw', 'Withdrawal'];

export async function signIn({username, password}) {
  if (!username || username.length === 0 || !password || password.length === 0) {
    throw badRequest('credential', FIELD_ERROR.INVALID, 'Username or password invalid');
  }
  const user = await db.User.findOne({
    where: {
      email: username
    },
    include: [
      {model: db.ACLGroupAction, as: 'permissions'},
      {model: db.ACLGroupActionShop, as: 'shopPermissions'}
    ]
  });
  if (!user) {
    throw badRequest('credential', FIELD_ERROR.INVALID, 'Username or password invalid');
  }
  if (!db.User.comparePassword(password, user.pwd)) {
    throw badRequest('credential', FIELD_ERROR.INVALID, 'Username or password invalid');
  }
  if (!user.email_active) {
    throw badRequest('credential', FIELD_ERROR.EMAIL_NOT_ACTIVE, 'Email not active');
  }
  if (user.status !== USER_STATUS.ACTIVE) {
    throw badRequest('credential', FIELD_ERROR.EMAIL_NOT_ACTIVE, 'User not active');
  }
  const userJson = user.get({plain: true});
  appLog.info(userJson);

  const token = jwt.sign(userJson, APP_CONFIG.JWT.secret);
  return token;
}

export async function register(registerForm) {
  appLog.info(`${JSON.stringify(registerForm)}`);

  const currentUsername = await db.User.findOne({
    where: {email: registerForm.username}
  });
  if (currentUsername) {
    throw new FormError(
      new FieldError('username',
        FIELD_ERROR.INVALID,
        `Username ${registerForm.username} is already taken`)
    );
  }

  if (userNameFilter.indexOf(registerForm.username.trim().toLowerCase()) >= 0) {
    throw new FormError(
      new FieldError('username',
        FIELD_ERROR.INVALID,
        `Username ${registerForm.username} is not allow to register`)
    );
  }

  return db.sequelize.transaction()
    .then(async (t) => {
      try {
        const group = await db.ACLGroup.create({
          name: 'COMPANY_GROUP',
          remark: 'Default group for master access',
          createdById: 0
        }, {transaction: t});
        const actions = ALL_PERMISSIONS.map(_p => {
          return {
            groupId: group.id,
            actionId: _p,
            type: ACTION_TYPE.FULL
          }
        });
        await db.ACLGroupAction.bulkCreate(actions, {transaction: t});

        const newUser = await db.User.create(
          {
            email: registerForm.username,
            pwd: db.User.hashPassword(registerForm.password),
            displayName: registerForm.displayName,
            status: USER_STATUS.ACTIVE,
            insertedDate: new Date(),
            email_active: false,
            groupId: group.id
          },
          {transaction: t}
        );

        await t.commit();
        appLog.info(`Send event user:register ${JSON.stringify(newUser)}`);
        userEmitter.emit(USER_EVENT.REGISTER, newUser);

        return newUser;
      } catch (e) {
        appLog.error(e.message, e);
        await t.rollback();
        throw e;
      }
    });
}

export async function userExisted(username) {
  const currentUsername = await db.User.findOne({
    where: {username: username}
  });
  if (currentUsername) {
    throw new FormError(
      new FieldError('username',
        FIELD_ERROR.INVALID,
        `Username ${username} is already taken`)
    );
  }

  if (userNameFilter.indexOf(username.trim().toLowerCase()) >= 0) {
    throw new FormError(
      new FieldError('username',
        FIELD_ERROR.INVALID,
        `Username ${username} is not allow to register`)
    );
  }
}

export async function emailExisted(email) {
  const currentUser = await db.User.findOne({
    where: {
      email
    }
  });
  if (currentUser) {
    throw new FormError(
      new FieldError('email',
        FIELD_ERROR.INVALID,
        `Email ${email} is already taken`)
    );
  }
}
