import {HTTP_ERROR, HttpError} from '../../config/error';

const passport = require('passport');

export const passportJWT = () => passport.authenticate('jwt', {session: false});

export function isAuthenticated() {
  return [passportJWT(), (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw new HttpError(HTTP_ERROR.NOT_AUTHENTICATE);
    }
  }]
}

export function hasPermission(permission) {
  return [isAuthenticated(), function isHasPermission(req, res, next) {
    console.log(req.user);
    const {permissions} = req.user;
    let isValid = true;
    if (permissions) {
      let checkPermissions = [];
      if (Array.isArray(permission)) {
        checkPermissions = permission;
      } else {
        checkPermissions = [permission];
      }
      for (let i = 0; i < checkPermissions.length; i += 1) {
        const _item = checkPermissions[i];
        if (!Object.prototype.hasOwnProperty.call(permissions, `action${_item}`)) {
          isValid = false;
          break;
        }
      }
    } else {
      isValid = false;
    }
    if (isValid) {
      next();
    } else {
      throw new HttpError(HTTP_ERROR.ACCESS_DENIED);
    }
  }]
}

export function hasAnyPermission(permission) {
  return [isAuthenticated(), function isHasAnyPermission(req, res, next) {
    const {permissions} = req.user;
    let isValid = false;
    if (permissions) {
      let checkPermissions = [];
      if (Array.isArray(permission)) {
        checkPermissions = permission;
      } else {
        checkPermissions = [permission];
      }
      for (let i = 0; i < checkPermissions.length; i += 1) {
        const _item = checkPermissions[i];
        if (Object.prototype.hasOwnProperty.call(permissions, `action${_item}`)) {
          isValid = true;
          break;
        }
      }
    }
    if (isValid) {
      next();
    } else {
      throw new HttpError(HTTP_ERROR.ACCESS_DENIED);
    }
  }]
}
