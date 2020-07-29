import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';

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

export async function getWarehouse(wId) {
  const warehouse = await db.WareHouse.findOne({
    where: {
      id: wId
    }
  });
  if (!warehouse) {
    throw badRequest('warehouse', FIELD_ERROR.INVALID, 'warehouse not found');
  }
  return warehouse;
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

export async function updateWarehouse(wId, companyId, updateForm) {
  const warehouse = await db.WareHouse.findByPk(wId);
  if (!warehouse) {
    throw badRequest('warehouse', FIELD_ERROR.INVALID, 'Warehouse not found');
  }
  warehouse.name = updateForm.name;
  warehouse.address = updateForm.address;
  warehouse.userId = updateForm.userId;
  warehouse.companyId = companyId;
  return warehouse.save();
}

export async function removeWarehouse (wId) {
  const warehouse = await db.WareHouse.findByPk(wId);
  if (!warehouse) {
    throw badRequest('warehouse', FIELD_ERROR.INVALID, 'Warehouse not found');
  }
  return db.WareHouse.destroy({
    where: { id: warehouse.id }
  });
}
