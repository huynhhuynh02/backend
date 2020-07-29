import db from '../../db/models';
import { badRequest, FIELD_ERROR } from '../../config/error';
import { createInventoryDetail, removeInventoryDetail } from './inventory-detail.service';

const {Op} = db.Sequelize;

export function inventories(search, order, offset, limit) {
  let where = {};
  if (search) {
    if (search.warehouseId) {
      where.warehouseId = search.warehouseId;
    }
    if (search.title && search.title.length) {
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
      {
        model: db.InventoryDetail, as: 'details',
        include: [
          {  model: db.Product, as: 'product', attributes: ['id', 'name'] },
          {  model: db.ProductUnit, as: 'unit', attributes: ['id', 'name'] }
        ]
      }
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

    if (createForm.details && createForm.details.length) {
      await createInventoryDetail(inventory.id, createForm.details, transaction);
    }
    await transaction.commit();
    return inventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function updateInventory(inventoryId, userId, type, updateForm) {
  const existedInventory = await db.Inventory.findByPk(inventoryId);
  if (!existedInventory) {
    throw badRequest('inventory', FIELD_ERROR.INVALID, 'inventory not found');
  }
  const transaction = await db.sequelize.transaction();
  try {

    await existedInventory.update({
      warehouseId: updateForm.warehouseId,
      name: updateForm.name,
      remark: updateForm.remark,
      purposeId: updateForm.purposeId,
      relativeId: updateForm.relativeId,
      type: updateForm.type,
      lastModifiedDate: new Date(),
      lastModifiedById: userId
    }, transaction);

    // get list inventory detail
    const listOldInventoryDetail = await db.InventoryDetail.findAll({
      where: {
        inventoryId: existedInventory.id
      }
    }, {transaction});

    if (updateForm.details && updateForm.details.length) {
      // delete inventory detail old
      await removeInventoryDetail(existedInventory.id, transaction);
      // create inventory detail
      await createInventoryDetail(existedInventory.id, updateForm.details, transaction);
    }
    await existedInventory.save({transaction});
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
    await removeInventoryDetail(existedInventory.id, transaction);
    const inventory = db.Inventory.destroy({
      where: { id: existedInventory.id }
    }, {transaction});
    await transaction.commit();
    return inventory;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
