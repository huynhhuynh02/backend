import express from 'express';
import { pagingParse } from '../../middleware/paging.middleware';
import { hasPermission } from '../../middleware/permission';
import { PERMISSION } from '../../../db/models/acl/acl-action';
import {costs,createCost,getCost,updateCost,removeCost} from '../../../service/cost/cost.service';
const cost = express.Router();
//route get all cost
cost.get('/',
    pagingParse({column: 'id', dir: 'asc'}), hasPermission(PERMISSION.COST.READ),
    (req, res, next) => {
    return costs(req.query, req.paging.order, req.paging.offset, req.paging.size)
      .then(result => res.status(200).json(result)).catch(next);
    });
//route get by id
cost.get('/:id(\\d+)', hasPermission(PERMISSION.COST.READ),(req, res, next) => {
    return getCost(req.params.id).then(result => res.status(200).json(result)).catch(next);
});
//route create
cost.post('/', hasPermission(PERMISSION.COST.CREATE), (req, res, next) => {
    return createCost(req.user, req.body).then(result => res.status(200).json(result)).catch(next);
});
//route update
cost.post('/:id(\\d+)', hasPermission(PERMISSION.COST.UPDATE),(req, res, next) => {
    return updateCost(req.params.id, req.user, req.body).then(result => res.status(200).json(result)).catch(next);
});
//route delete
cost.delete('/:id(\\d+)', hasPermission(PERMISSION.COST.DELETE),(req, res, next) => {
    return removeCost(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next);
  });
export function initWebCostController(app) {
    app.use('/api/cost', cost);
}
