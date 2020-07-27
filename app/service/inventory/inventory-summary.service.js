import db from '../../db/models';

const {Op} = db.Sequelize;

export function inventorySummary(search, order, offset, limit) {
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
      {model: db.InventoryDetail, as: 'details'}
    ],
    offset,
    limit
  });
}
