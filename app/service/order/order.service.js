import db from '../../db/models';
import { createOrderAsset, removeOrderAsset } from '../asset/asset.service';
import { createOrderDetail, removeOrderDetail } from './order-detail.service';
import { ORDER_TYPE } from '../../db/models/order/order';
import { badRequest, FIELD_ERROR } from '../../config/error';

const {Op} = db.Sequelize;

export function orders(search, order, offset, limit) {
  let where = {};
  if (search) {
    if (search.partnerCompanyId) {
      where.partnerCompanyId = search.partnerCompanyId;
    }
    if (search.partnerPersonId) {
      where.partnerPersonId = search.partnerPersonId;
    }
    if (search.search && search.search.length) {
      where = {
        name: {
          [Op.like]: `%${search.search}%`
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
  return db.Order.findAndCountAll({
    order,
    where,
    offset,
    limit
  });
}

export async function getOrderPurchase(oId) {
  const order = await db.Order.findOne({
    where: {
      id: oId
    },
    include: [
      {model: db.OrderDetail, as: 'details'},
      {model: db.Asset, as: 'assets', attributes: ['fileId']}

    ]
  });
  if (!order) {
    throw badRequest('order', FIELD_ERROR.INVALID, 'order not found');
  }
  return order;
}

export async function getOrderSale(oId) {
  const order = await db.Order.findOne({
    where: {
      id: oId
    },
    include: [
      {model: db.OrderDetail, as: 'details'}
    ]
  });
  if (!order) {
    throw badRequest('order', FIELD_ERROR.INVALID, 'order not found');
  }
  return order;
}

export async function createOrder(userId, type, createForm) {
  const transaction = await db.sequelize.transaction();

  try {
    const order = await db.Order.create({
      name: createForm.name,
      remark: createForm.remark,
      partnerCompanyId: createForm.partnerCompanyId,
      partnerPersonId: createForm.partnerPersonId,
      createdById: userId,
      companyId: userId,
      processedDate: new Date()
    }, {transaction});

    if (createForm.details && createForm.details.length) {
      await createOrderDetail(order.id, createForm.details, transaction);
    }

    if (type === ORDER_TYPE.PURCHASE && createForm.assets && createForm.assets.length) {
      await createOrderAsset(order.id, createForm.assets, transaction);
    }

    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function updateOrder(oId, type, updateForm) {

  const existedOrder = await db.Order.findByPk(oId);
  if (!existedOrder) {
    throw badRequest('order', FIELD_ERROR.INVALID, 'order not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    await existedOrder.update({
      name: updateForm.name,
      remark: updateForm.remark,
      partnerCompanyId: updateForm.partnerCompanyId,
      partnerPersonId: updateForm.partnerPersonId,
      processedDate: new Date()
    }, transaction);

    if (updateForm.details && updateForm.details.length) {
      await removeOrderDetail(existedOrder.id, transaction);
      await createOrderDetail(existedOrder.id, updateForm.details, transaction);
    }

    if (type === ORDER_TYPE.PURCHASE && updateForm.assets && updateForm.assets.length) {
      await removeOrderAsset(existedOrder.id, transaction);
      await createOrderAsset(existedOrder.id, updateForm.assets, transaction);
    }

    await transaction.commit();
    return existedOrder;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

}

export async function removeOrder(oId, type) {
  const checkOrder = await db.Order.findByPk(oId);
  if (!checkOrder) {
    throw badRequest('order', FIELD_ERROR.INVALID, 'order not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    if (type === ORDER_TYPE.PURCHASE) {
      await removeOrderAsset(checkOrder.id, transaction);
    }
    await removeOrderDetail(checkOrder.id, transaction);
    const order = db.Order.destroy({
      where: { id: checkOrder.id }
    }, {transaction});
    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
