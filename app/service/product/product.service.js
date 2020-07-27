import db from '../../db/models';
import User from '../../db/models/user/user';
import { badRequest, FIELD_ERROR } from '../../config/error';
import { createProductAsset } from '../asset/asset.service';

const {Op} = db.Sequelize;

export function products(search, order, offset, limit) {
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
  return db.Product.findAndCountAll({
    order,
    where,
    include: [
      {
        model: User,
        attributes: ['id', 'name']
      }
    ],
    offset,
    limit
  });
}

export async function getProduct(pId) {
  const product = await db.Product.findOne({
    where: {
      id: pId
    }
  });
  if (!product) {
    throw badRequest('product', FIELD_ERROR.INVALID, 'product not found');
  }
  return product;
}


export async function createProduct(userId, createForm) {

  const transaction = await db.sequelize.transaction();

  try {
    const product = await db.Product.create({
      name: createForm.name,
      remark: createForm.remark,
      priceBaseUnit: createForm.priceBaseUnit,
      companyId: createForm.companyId,
      createdById: userId,
      createdDate: new Date()
    }, {transaction});

    if (createForm.assets && createForm.assets.length) {
       await createProductAsset(product.id, createForm.assets, transaction);
    }

    if (createForm.units && createForm.units.length) {
      await db.ProductUnit.bulkCreate(createForm.units.map((result, index) => {
        return {
          id: index + 1,
          productId: product.id,
          name: result.name,
          rate: result.rate
        }
      }), {transaction})
    }
    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

}

export function removeProduct (pId) {
  return db.Product.destroy({
    where: { id: pId }
  });
}
