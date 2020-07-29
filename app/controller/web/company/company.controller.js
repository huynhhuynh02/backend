import express from 'express';
import {
  companies,
  createCompany,
  getCompany,
  removeCompany,
  updateCompany
} from '../../../service/company/company.service';
import { pagingParse } from '../../middleware/paging.middleware';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';

const company = express.Router();

company.get('/',
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return companies(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

company.get('/:id(\\d+)', (req, res, next) => {
  return getCompany(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

company.post('/', (req, res, next) => {
  // const userId = req.user.id;
  const userId = 1;
  return createCompany(userId, req.body)
    .then((newWareHouse) => {
      res.json(newWareHouse);
    }, next);
});

company.post('/:id(\\d+)', (req, res, next) => {
  return updateCompany(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

company.delete('/:id(\\d+)', (req, res, next) => {
  return removeCompany(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

export function initWebCompanyController(app) {
  app.use('/api/company', company);
}
