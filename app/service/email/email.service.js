import {client} from 'mailgun.js';
import {emailLog} from "../../config/winston";
import {SYSTEM_CONFIG} from '../../config/system';
import db from '../../db/models';

const fs = require('fs');
const path = require('path');

function getMailGunClient(){
  return client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
  });
}
const domain = process.env.MAILGUN_DOMAIN;

const DEBUG = false;
const systemEmail = {
  register: SYSTEM_CONFIG.NOTIFY_REGISTER_EMAIL,
  password: SYSTEM_CONFIG.NOTIFY_CHANGE_PASSWORD_EMAIL,
  withdraw: SYSTEM_CONFIG.NOTIFY_WITHDRAW_EMAIL,
  notice: SYSTEM_CONFIG.NOTIFY_NOTICE_EMAIL
};

function getTemplateFile(templateName) {
  return path.join(__dirname, '..', '..', 'template', 'email', `${templateName}.html`);
}

function buildTemplate(templateName, params) {
  const templatePath = getTemplateFile(templateName);
  emailLog.info(`Template Path: ${templatePath} - Params: ${JSON.stringify(params)}`);
  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, 'utf-8', (err, html) => {
      let emailMessage = html;
      if (err) {
        reject(err);
      }
      if (params) {
        Object.keys(params).forEach((key) => {
          const value = params[key];
          emailMessage = emailMessage.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });
      }
      resolve(emailMessage);
    });
  });
}

export function sendHtml({
                           from, to, subject, html, bcc, cc
                         }) {
  emailLog.info(`Send email ${subject} to ${to}`);
  const emailOpts = {
    from, to, subject, html
  };
  if (bcc) {
    emailOpts.bcc = bcc;
  }
  if (cc) {
    emailOpts.cc = cc;
  }

  return getMailGunClient().messages.create(domain, emailOpts)
    .then((t) => {
      emailLog.info(`Send Email Resp: ${JSON.stringify(t)}`);
      db.EmailSend.create({
        from: from,
        to: to,
        cc: cc || '',
        bcc: bcc || '',
        subject: subject,
        content: html,
        status: 1,
        retry: 0,
        api_response: JSON.stringify(t),
        sent_date: new Date()
      });
      return true;
    }).catch((error) => {
      console.log(error);
      emailLog.error(error.message, error);
    });
}

export async function resendEmail(emailId) {
  const email = await db.EmailSend.findByPk(emailId);
  const {from, to, cc, bcc, subject} = email;
  const html = email.content;
  return getMailGunClient().messages.create(domain, {from, to, cc, bcc, subject, html})
    .then((t) => {
      email.status = 1;
      email.retry += 1;
      email.api_response = JSON.stringify(t);
      return email.save();
    });
}

export function sendRegister(email, username, userId, url) {
  console.log(email);
  try {
    const templatePath = getTemplateFile('email-confirm');
    emailLog.info(`Template Path: ${templatePath}`);
    fs.readFile(templatePath, 'utf-8', (err, html) => {
      if (err) {
        emailLog.info(err.message);
        throw err;
      }

      const emailMsg = html
        .replace(/{{email_confirm_url}}/g, url)
        .replace(/{{username}}/g, username)
        .replace(/{{userId}}/g, userId);
      const sendInfo = {
        from: systemEmail.register,
        to: email,
        subject: 'Welcome to CryptoCash Community',
        html: emailMsg
      };
      if (!DEBUG) {
        return sendHtml(sendInfo);
      }
      return null;
    });
  } catch (error) {
    emailLog.error(error.message);
    throw error;
  }
}

export async function sendResetPassword(email, username, token) {
  const url = `${process.env.WEB_URL || 'http://localhost:4200'}/forgot-password/reset?token=${token}`;
  const msg = await buildTemplate('reset-password', {
    resetPasswordLink: url,
    username: username
  });
  const sendInfo = {
    from: systemEmail.password,
    to: email,
    subject: 'CryptoCash Password Reset!!',
    html: msg
  };
  return sendHtml(sendInfo);
}

export function emails(search, order, offset, limit) {
  let where = {};
  const {Op} = db.Sequelize;

  if (search) {
    if (search.fromOrTo) {
      where = {
        [Op.or]: [
          {
            from: {
              [Op.like]: `%${search.formOrTo}%`
            }
          },
          {
            to: {
              [Op.like]: `%${search.formOrTo}%`
            }
          }
        ]
      };
    }
  }

  return db.EmailSend.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}
