import db from '../db/models';
import { HTTP_ERROR, HttpError } from '../config/error';

const {Op} = db.Sequelize;

export function warehouses(search, order, offset, limit) {
  let where = {};
  if (search) {
    if (search.name && search.name.length > 0) {
      where = {
        name: {
          [Op.like]: `%${search.name}%`
        }
      }
    }
  }
  return db.WareHouse.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}

export function createWarehouse(createForm) {
  return db.WareHouse.create(
    {
      name: createForm.name,
      address: createForm.address,
      userId: createForm.userId,
      companyId: createForm.companyId
    }
  )
}

export async function updateWarehouse(wId, updateForm) {
  const warehouse = await db.WareHouse.findByPk({
    where: {
      id: wId
    }
  });
  if (!warehouse) {
    throw new HttpError(HTTP_ERROR.NOT_FOUND, 'Invalid Warehouse');
  }
  await warehouse.update({
    name: updateForm.name,
    address: updateForm.address,
    userId: updateForm.userId,
    companyId: updateForm.companyId
  });

  return warehouse;
}

export function removeWarehouse (wId) {
  return db.WareHouse.destroy({
    where: { id: wId }
  });
}