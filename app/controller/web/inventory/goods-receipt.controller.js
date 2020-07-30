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

goodsReceipt.get('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_RECEIPT.READ), (req, res, next) => {
  return getInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsReceipt.post('/', hasPermission(PERMISSION.INVENTORY.GOODS_RECEIPT.CREATE), (req, res, next) => {
  return createInventory(req.user.id, INVENTORY_TYPE.IN, req.body)
    .then((newInventory) => {
      res.status(200).json(newInventory);
    }).catch(next);
});

goodsReceipt.post('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_RECEIPT.UPDATE), (req, res, next) => {
  return updateInventory(req.params.id, req.user.id, INVENTORY_TYPE.IN, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
});

goodsReceipt.delete('/:id(\\d+)', hasPermission(PERMISSION.INVENTORY.GOODS_RECEIPT.DELETE), (req, res, next) => {
  return removeInventory(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});


export function initWebInventoryGoodReceiptController(app) {
  app.use('/api/inventory/goods-receipt', goodsReceipt);
}
