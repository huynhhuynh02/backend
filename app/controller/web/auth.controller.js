import express from 'express';
import * as userService from '../../service/user/user.service';
import {hasPermission, isAuthenticated} from '../middleware/permission';
import {register, signIn} from "../../service/user/auth.service";
import {PERMISSION} from "../../db/models/acl/acl-action";

const auth = express.Router();

auth.get('/information', isAuthenticated(), (req, res) => {
  return res.status(200).json(req.user);
});

auth.get('/access-denied', hasPermission(PERMISSION.INVENTORY.READ), (req, res) => {
  return res.status(200).json(req.user);
});

auth.get('/access-denies', hasPermission([PERMISSION.INVENTORY.READ, PERMISSION.ORDER.CREATE]), (req, res) => {
  return res.status(200).json(req.user);
});

auth.post('/register', (req, res, next) => {
  return register(req.body)
    .then(result => res.status(200).json(result)).catch(next);
});

auth.get('/resendEmailActive', (req, res, next) => {
  return userService.resendEmailActive(req.query.username)
    .then(() => res.status(200).json({ok: 1}))
    .catch(next);
});

auth.post('/sign-in', async (req, res, next) => {
  try {
    const data = await signIn(req.body);
    return res.json(data);
  } catch (e) {
    return next(e);
  }
});

auth.get('/sign-out', (req, res) => {
  req.logout();
  res.status(200)
    .send('{}');
});

auth.post('/email-verify', (req, res, next) => {
  userService.confirmEmail(req.body.email, req.body.token)
    .then(result => {
      res.status(200)
        .json(result);
    }).catch(next);
});

export function initWebAuthController(app) {
  app.use('/api', auth);
}
