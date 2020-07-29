import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import {
  createInventory,
  getInventory,
  removeInventory,
  updateInventory
} from '../../../service/inventory/inventory.service';
import { INVENTORY_TYPE } from '../../../db/models/inventory/inventory';

const goodsIssue = express.Router();

goodsIssue.get('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_ISSUE.READ), (req, res, next) => {
  return getInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsIssue.post('/', hasPermission(PERMISSION.INVENTORY.GOODS_ISSUE.CREATE), (req, res, next) => {
  return createInventory(req.user.id, INVENTORY_TYPE.OUT, req.body)
    .then((newInventory) => {
      res.json(newInventory);
    }, next);
});

goodsIssue.post('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_ISSUE.UPDATE), (req, res, next) => {
  return updateInventory(req.params.id, INVENTORY_TYPE.OUT, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsIssue.delete('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_ISSUE.DELETE), (req, res, next) => {
  return removeInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});


export function initWebInventoryGoodIssueController(app) {
  app.use('/api/inventory/goods-issue', goodsIssue);
}
