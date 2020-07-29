import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';

export function inventorySummaries(search, order, offset, limit) {
  const where = {};
  if (search) {
    if (search.warehouseId) {
      where.warehouseId = search.warehouseId;
    }
    if (search.productId) {
      where.productId = search.productId;
    }
  }
  return db.InventorySummary.findAndCountAll({
    order,
    where,
    include: [
      {model: db.WareHouse, as: 'warehouse'},
      {model: db.Product, as: 'product'},
      {model: db.ProductUnit, as: 'unit'}
    ],
    offset,
    limit
  });
}


export async function getDetailInventorySummary(inventorySummaryId) {
  const checkInventorySummary = await db.InventorySummary.findOne({
    where: {
      id: inventorySummaryId
    },
    include: [
      {model: db.WareHouse, as: 'warehouse'},
      {model: db.Product, as: 'product'},
      {model: db.ProductUnit, as: 'unit'}
    ]
  });
  if (!checkInventorySummary) {
    throw badRequest('InventorySummary', FIELD_ERROR.INVALID, 'inventory summary not found');
  }
  return checkInventorySummary;
}
