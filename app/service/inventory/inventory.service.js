import db from '../../db/models';
import { HTTP_ERROR, HttpError } from '../../config/error';

const {Op} = db.Sequelize;


export function inventories(search, order, offset, limit) {
  let where = {};
  if (search) {
    if (search.warehouseId) {
      where.warehouseId = search.warehouseId;
    }
    if (search.title && search.title.length > 0) {
      where = {
        title: {
          [Op.like]: `%${search.title}%`
        }
      }
    }
    if (search.dateFrom && search.dateFrom.length && search.dateTo && search.dateTo.length) {
      const dateObjTo = new Date(search.dateTo);
      dateObjTo.setHours(dateObjTo.getHours() + 24);
      where.processedDate = {
        [Op.lt]: dateObjTo,
        [Op.gte]: new Date(search.dateFrom)
      };
    } else if (search.dateTo && search.dateTo.length) {
      const dateObjTo = new Date(search.dateTo);
      dateObjTo.setHours(dateObjTo.getHours() + 24);
      where.processedDate = {
        [Op.lt]: dateObjTo
      };
    } else if (search.dateFrom && search.dateFrom.length) {
      where.processedDate = {
        [Op.gte]: new Date(search.dateFrom)
      };
    }
  }
  return db.Inventory.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}
