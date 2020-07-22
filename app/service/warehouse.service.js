import db from '../db/models';
import { badRequest, FIELD_ERROR } from '../config/error';

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

export function getWarehouse(wId) {
  return db.WareHouse.findOne({
    where: {
      id: wId
    }
  })
}

export function createWarehouse(companyId, createForm) {
  if (!companyId) {
    throw badRequest('companyId', FIELD_ERROR.INVALID, 'User have not company');
  }
  return db.WareHouse.create(
    {
      name: createForm.name,
      address: createForm.address,
      userId: createForm.userId,
      companyId: companyId
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
    throw badRequest('warehouse', FIELD_ERROR.INVALID, 'Warehouse not found');
  }
  await warehouse.update({
    name: updateForm.name,
    address: updateForm.address,
    userId: updateForm.userId
  });

  return warehouse;
}

export function removeWarehouse (wId) {
  return db.WareHouse.destroy({
    where: { id: wId }
  });
}
