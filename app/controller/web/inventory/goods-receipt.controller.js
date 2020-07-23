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

const goodsReceipt = express.Router();

goodsReceipt.get('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.READ), (req, res, next) => {
  return getInventory(req.params.inventoryId)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsReceipt.post('/', hasPermission(PERMISSION.INVENTORY.CREATE), (req, res, next) => {
  const userId = req.user.id;
  const type = INVENTORY_TYPE.IN;
  return createInventory(userId, type, req.body)
    .then((newInventory) => {
      res.json(newInventory);
    }, next);
});

goodsReceipt.post('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.UPDATE), (req, res, next) => {
  const type = INVENTORY_TYPE.IN;
  return updateInventory(req.params.id, type, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsReceipt.delete('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.DELETE), (req, res, next) => {
  return removeInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});


export function initWebInventoryGoodReceiptController(app) {
  app.use('/api/inventory/goods-receipt', goodsReceipt);
}
