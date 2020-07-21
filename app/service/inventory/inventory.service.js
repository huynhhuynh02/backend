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


export async function createInventoryGoodsReceipt(createForm) {
  return db.sequelize.transaction()
    .then(async (transaction) => {
      try {
        const inventory = await db.Inventory.create({
          warehouseId: createForm.warehouseId,
          name: createForm.name,
          remark: createForm.remark,
          purposeId: createForm.purposeId,
          relativeId:  createForm.relativeId,
          processedDate: new Date()
        }, transaction);

        await transaction.commit();
        return inventory;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    });
}
