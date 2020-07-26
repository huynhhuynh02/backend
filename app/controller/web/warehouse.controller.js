import express from 'express';
import {
  warehouses,
  createWarehouse,
  removeWarehouse,
  updateWarehouse,
  getWarehouse
} from '../../service/warehouse/warehouse.service';
import { hasPermission } from '../middleware/permission';
import {PERMISSION} from "../../db/models/acl/acl-action";
import { pagingParse } from '../middleware/paging.middleware';

const warehouse = express.Router();

warehouse.get('/', hasPermission(PERMISSION.WAREHOUSE.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return warehouses(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

warehouse.get('/:wId(\\d+)', hasPermission(PERMISSION.WAREHOUSE.READ), (req, res, next) => {
  return getWarehouse(req.params.wId)
    .then(result => res.status(200).json(result))
    .catch(next);
});

warehouse.post('/', hasPermission(PERMISSION.WAREHOUSE.CREATE), (req, res, next) => {
  const companyId = req.user.userCompanies;
  return createWarehouse(companyId, req.body)
    .then((newWareHouse) => {
      res.json(newWareHouse);
    }, next);
});

warehouse.post('/:wId(\\d+)', hasPermission(PERMISSION.WAREHOUSE.UPDATE), (req, res, next) => {
  return updateWarehouse(req.params.wId, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

warehouse.delete('/:wId(\\d+)', hasPermission(PERMISSION.WAREHOUSE.DELETE), (req, res, next) => {
  return removeWarehouse(req.params.wId)
    .then(result => res.status(200).json(result))
    .catch(next);
});

export function initWebWarehouseController(app) {
  app.use('/api/warehouse', warehouse);
}
