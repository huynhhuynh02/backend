import express from 'express';
import { pagingParse } from '../../middleware/paging.middleware';
import { createProduct, products, removeProduct } from '../../../service/product/product.service';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';

const product = express.Router();

product.get('/',  hasPermission(PERMISSION.PRODUCT.READ),
  pagingParse({column: 'id', dir: 'asc'}),
  (req, res, next) => {
    return products(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then((t) => {
        res.status(200).json(t);
      }).catch(next);
  });

product.post('/', hasPermission(PERMISSION.PRODUCT.CREATE), (req, res, next) => {
  const userId = req.user.id;
  return createProduct(userId, req.body)
    .then((newInventory) => {
      res.json(newInventory);
    }, next);
});

product.delete('/:pId',  hasPermission(PERMISSION.PRODUCT.DELETE),  (req, res, next) => {
  return removeProduct(req.params.pId)
    .then(result => res.status(200).json(result))
    .catch(next);
});

export function initWebProductController(app) {
  app.use('/api/product', product);
}
