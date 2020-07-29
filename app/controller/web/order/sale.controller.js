import express from 'express';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import { pagingParse } from '../../middleware/paging.middleware';
import {
  createOrder,
  getOrderSale,
  orders,
  removeOrder,
  updateOrder
} from '../../../service/order/order.service';
import { ORDER_TYPE } from '../../../db/models/order/order';

const sale = express.Router();


sale.get('/', hasPermission(PERMISSION.ORDER.SALE.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return orders(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

sale.post('/', hasPermission(PERMISSION.ORDER.SALE.CREATE), (req, res, next) => {
  return createOrder(req.user, ORDER_TYPE.SALE, req.body)
    .then((newPurchase) => {
      res.json(newPurchase);
    }, next);
});

sale.get('/:id(\\d+)', hasPermission(PERMISSION.ORDER.SALE.READ), (req, res, next) => {
  return getOrderSale(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
});

sale.post('/:id(\\d+)', hasPermission(PERMISSION.ORDER.SALE.UPDATE), (req, res, next) => {
  return updateOrder(req.params.id, req.user, ORDER_TYPE.SALE, req.body)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

sale.delete('/:id(\\d+)',  hasPermission(PERMISSION.ORDER.SALE.DELETE),  (req, res, next) => {
  return removeOrder(req.params.id, ORDER_TYPE.SALE)
    .then(result => res.status(200).json(result))
    .catch(next);
});


export function initWebOrderSaleController(app) {
  app.use('/api/order/sale', sale);
}
