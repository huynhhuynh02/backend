import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import { pagingParse } from '../../middleware/paging.middleware';
import { createOrder, getOrderPurchase, orders, removeOrder, updateOrder } from '../../../service/order/order.service';
import { ORDER_TYPE } from '../../../db/models/order/order';

const purchase = express.Router();

purchase.get('/', hasPermission(PERMISSION.ORDER.PURCHASE.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return orders(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

purchase.post('/', (req, res, next) => {
  return createOrder(req.user.id, ORDER_TYPE.PURCHASE, req.body)
    .then((newPurchase) => {
      res.json(newPurchase);
    }, next);
});

purchase.get('/:id(\\d+)', hasPermission(PERMISSION.ORDER.PURCHASE.READ), (req, res, next) => {
  return getOrderPurchase(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

purchase.post('/:id(\\d+)', hasPermission(PERMISSION.ORDER.PURCHASE.UPDATE), (req, res, next) => {
  return updateOrder(req.params.id, ORDER_TYPE.PURCHASE, req.body)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

purchase.delete('/:id(\\d+)',  hasPermission(PERMISSION.ORDER.PURCHASE.DELETE),  (req, res, next) => {
  return removeOrder(req.params.id, ORDER_TYPE.PURCHASE)
    .then(result => res.status(200).json(result))
    .catch(next);
});

export function initWebOrderPurchaseController(app) {
  app.use('/api/order/purchase', purchase);
}
