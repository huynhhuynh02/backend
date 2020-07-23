import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';

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
    include: [
      {model: db.InventoryDetail, as: 'details'}
    ],
    offset,
    limit
  });
}

export async function getInventory(inventoryId) {
  const inventory = await db.Inventory.findOne({
    where: {
      id: inventoryId
    }, include: [
      {model: db.InventoryDetail, as: 'details'}
    ]
  });
  if (!inventory) {
    throw badRequest('inventory', FIELD_ERROR.INVALID, 'inventory not found');
  }
  return inventory;
}

export async function createInventory(userId, type, createForm) {
  const transaction = await db.sequelize.transaction();
  try {
    const inventory = await db.Inventory.create({
      warehouseId: createForm.warehouseId,
      name: createForm.name,
      remark: createForm.remark,
      purposeId: createForm.purposeId,
      relativeId:  createForm.relativeId,
      companyId:  createForm.companyId,
      type:  type,
      processedDate: new Date(),
      createdById: userId
    }, {transaction});

    for (let i = 0; i < createForm.details.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.InventoryDetail.create(
        {
          inventoryId: inventory.id,
          inventoryDetailId: i + 1,
          productId: createForm.details[i].productId,
          unitId: createForm.details[i].unitId,
          quantity: createForm.details[i].quantity,
          remark: createForm.details[i].remark
        }, {transaction});
    }
    await transaction.commit();
    return inventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function updateInventory(inventoryId, type, updateForm) {
  const existedInventory = await db.Inventory.findByPk(inventoryId);
  if (!existedInventory) {
    throw badRequest('inventory', FIELD_ERROR.INVALID, 'inventory not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    existedInventory.warehouseId = updateForm.warehouseId;
    existedInventory.name = updateForm.name;
    existedInventory.remark = updateForm.remark;
    existedInventory.purposeId = updateForm.purposeId;
    existedInventory.relativeId = updateForm.relativeId;
    existedInventory.type = updateForm.type;

    // get list inventory detail
    const listOldInventoryDetail = await db.InventoryDetail.findAll({
      where: {
        inventoryId: existedInventory.id
      }
    });

    // delete inventory detail old
    await db.InventoryDetail.destroy(
      {
        where: {
          inventoryId: existedInventory.id
        }
      }
    );

    for (let i = 0; i < updateForm.details.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.InventoryDetail.create(
        {
          inventoryId: existedInventory.id,
          inventoryDetailId: i + 1,
          productId: updateForm.details[i].productId,
          unitId: updateForm.details[i].unitId,
          quantity: updateForm.details[i].quantity,
          remark: updateForm.details[i].remark
        }, {transaction});
    }

    await existedInventory.save(transaction);

    // send event to summary
    console.log(listOldInventoryDetail[0]);
    await transaction.commit();
    return existedInventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function removeInventory (inventoryId) {
  const existedInventory = await db.Inventory.findByPk(inventoryId);
  if (!existedInventory) {
    throw badRequest('inventory', FIELD_ERROR.INVALID, 'inventory not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    // delete inventory detail
    await db.InventoryDetail.destroy(
      {
        where: {
          inventoryId: existedInventory.id
        }
      }
    );
    const inventory = db.Inventory.destroy({
      where: { id: existedInventory.id }
    });
    await transaction.commit();
    return inventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
