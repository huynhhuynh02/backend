import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { pagingParse } from '../../middleware/paging.middleware';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import { inventories, createInventoryGoodsReceipt } from '../../../service/inventory/inventory.service';

const inventory = express.Router();

inventory.get('/', hasPermission(PERMISSION.INVENTORY.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return inventories(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

inventory.post('/goods-receipt', hasPermission(PERMISSION.INVENTORY.CREATE), (req, res, next) => {
  return createInventoryGoodsReceipt(req.body)
    .then((newInventory) => {
      res.json(newInventory);
    }, next);
});
//
// inventory.post('/:wId', hasPermission(PERMISSION.WAREHOUSE.UPDATE), (req, res, next) => {
//   return updateWarehouse(req.params.wId, req.body)
//     .then(result => res.status(200).json(result))
//     .catch(next);
// });
//
// inventory.delete('/:wId', hasPermission(PERMISSION.WAREHOUSE.DELETE), (req, res, next) => {
//   return removeWarehouse(req.params.wId)
//     .then(result => res.status(200).json(result))
//     .catch(next);
// });

export function initWebInventoryController(app) {
  app.use('/api/inventory', inventory);
}
