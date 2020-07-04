import db from '../../db/models';
import {FIELD_ERROR, FieldError, FormError, HTTP_ERROR, HttpError} from '../../config/error';
import {appLog} from '../../config/winston';
import {USER_EVENT, userEmitter} from '../../event/user.event';

import * as emailService from "../email/email.service";
import {USER_STATUS} from "../../db/models/user/user";

const md5 = require('md5');



export function updatePassword(uId, newPwd) {
  return db.User.update(
    {password: db.User.hashPassword(newPwd)},
    {where: {id: uId}}
  );
}

export async function checkPassword(uId, pwd) {
  const user = await db.User.findOne({
    where: {id: uId},
    attributes: ['password']
  });
  return db.User.comparePassword(pwd, user.password);
}

export async function confirmEmail(email, token) {
  appLog.info(`confirm email ${email} - ${token}`);
  const activeToken = await db.UserActivate.findOne({
    where: {
      active_code: token
    },
    order: [['date_inserted', 'DESC']]
  });
  if (!activeToken) {
    throw new HttpError(HTTP_ERROR.NOT_FOUND, 'Invalid Token');
  }
  const user = await db.User.findByPk(activeToken.user_id);
  if (!user || user.email !== email) {
    throw new HttpError(HTTP_ERROR.NOT_FOUND, 'Invalid Email');
  }
  await user.update({
    email_active: true
  });

  return user;
}

export async function resendEmailActive(username) {
  const user = await db.User.findOne({
    where: {
      username
    }
  });

  if (user) {
    try {
      const token = md5(`${user.email}-${new Date()}`);
      const url = `${process.env.WEB_URL || 'http://localhost:4200'}/email-activate?email=${user.email}&token=${token}`;

      return db.UserActivate.create({
        user_id: user.id,
        active_code: token,
        date_inserted: new Date()
      })
        .then(async () => {
          await emailService.sendRegister(user.email, user.username, user.user_id, url);
        });
    } catch (e) {
      appLog.error(e.message, e);
    }
  }
  return 0;
}
