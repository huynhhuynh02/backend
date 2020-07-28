import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { pagingParse } from '../../middleware/paging.middleware';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import {
  inventories
}
  from '../../../service/inventory/inventory.service';

const inventory = express.Router();

inventory.get('/', hasPermission(PERMISSION.INVENTORY.GOODS_ISSUE.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return inventories(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });


export function initWebInventoryController(app) {
  app.use('/api/inventory', inventory);
}
