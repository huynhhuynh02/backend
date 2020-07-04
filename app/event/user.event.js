import {eventLog} from "../config/winston";
import db from '../db/models';
import * as emailService from '../service/email/email.service';

export const USER_EVENT = Object.freeze({
  REGISTER: 'user:register',
  USER_KYC_VERIFY: 'user:kyc_verify',
  ADMIN_TRANSFER: 'user:admin_transfer',
  ADMIN_CANCEL: 'user:admin_cancel'
});

const EventEmitter = require('events');
const md5 = require('md5');

export const userEmitter = new EventEmitter();

function emailRegister(user) {
  try {
    const token = md5(`${user.email}-${new Date()}`);
    const url = `${process.env.WEB_URL || 'http://php.local:4200'}/email-activate?email=${user.email}&token=${token}`;
    eventLog.info(`Build url: ${url}`);
    db.UserActivate.create({
      user_id: user.id,
      active_code: token,
      date_inserted: new Date()
    })
      .then(async () => {
        await emailService.sendRegister(user.email, user.username, user.user_id, url);
        const sponsorEmail = user.sponsor_email;
        const params = {
          sponsor_username: user.sponsor_username || '',
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          username: user.username,
          user_id: user.user_id
        };
        if (sponsorEmail) {
          await emailService.sendMailSponsor(sponsorEmail, params);
        }
      })
      .catch((reason) => {
        eventLog.error(reason);
      });
  } catch (e) {
    eventLog.error(e);
  }
}

userEmitter.on(USER_EVENT.REGISTER, (user) => {
  eventLog.info(`Event user:register ${JSON.stringify(user)}`);
  setImmediate(async () => {
    emailRegister(user);
  });
});

userEmitter.on(USER_EVENT.USER_KYC_VERIFY, (user, kyc) => {
  eventLog.info(`Process event ${USER_EVENT.USER_KYC_VERIFY} => ${JSON.stringify(user)}, ${JSON.stringify(kyc)}`);
});

async function emailAdminTransfer(transaction) {
  try {
    const url = `${process.env.WEB_URL || 'http://php.local:4200'}/user/history`;
    eventLog.info(`Build url: ${url}`);
    const user = await db.User.findByPk(transaction.user_id);
    const adminTransfer = await db.UserBalanceTransactionAdminTransfer.findByPk(transaction.id);
    await emailService.sendMailAdminTransfer(transaction, user, url, adminTransfer.remark);
  } catch (e) {
    eventLog.error(e);
  }
}

userEmitter.on(USER_EVENT.ADMIN_TRANSFER, (transaction) => {
  eventLog.info(`Event admin:transfer ${JSON.stringify(transaction)}`);
  setImmediate(async () => {
    await emailAdminTransfer(transaction);
  });
});

async function emailAdminCancel(user, transaction) {
  try {
    const url = `${process.env.WEB_URL || 'http://php.local:4200'}/user/history`;
    eventLog.info(`Build url : ${url}`);
    await emailService.sendMailAdminCancel(user, transaction, url);
  } catch (e) {
    eventLog.error(e);
  }
}

userEmitter.on(USER_EVENT.ADMIN_CANCEL, (user, transaction) => {
  eventLog.info(`Event admin:cancel ${JSON.stringify(user, transaction)}`);
  setImmediate(async () => {
    await emailAdminCancel(user, transaction);
  });
});
