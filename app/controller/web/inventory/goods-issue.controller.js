import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import {
  createInventory,
  getInventory,
  removeInventory,
  updateInventory
} from '../../../service/inventory/inventory.service';

const goodsIssue = express.Router();

goodsIssue.get('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.READ), (req, res, next) => {
  return getInventory(req.params.inventoryId)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsIssue.post('/', hasPermission(PERMISSION.INVENTORY.CREATE), (req, res, next) => {
  const userId = req.user.id;
  return createInventory(userId, req.body)
    .then((newInventory) => {
      res.json(newInventory);
    }, next);
});

goodsIssue.post('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.UPDATE), (req, res, next) => {
  return updateInventory(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsIssue.delete('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.DELETE), (req, res, next) => {
  return removeInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});


export function initWebInventoryGoodIssueController(app) {
  app.use('/api/inventory/goods-issue', goodsIssue);
}
