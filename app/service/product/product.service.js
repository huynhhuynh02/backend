import db from '../../db/models';
import User from '../../db/models/user/user';
import { badRequest, FIELD_ERROR } from '../../config/error';
import { createProductAsset, removeProductAsset } from '../asset/asset.service';
import { createProductUnit, removeProductUnit } from './product-unit.service';

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
    },
    include: [
      {model: db.Asset, as: 'assets', attributes: ['fileId']},
      {model: db.ProductUnit, as: 'units'}
    ]
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
      await createProductUnit(product.id, createForm.units, transaction);
    }
    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

}

export async function updateProduct(pId, updateForm) {

  const existedProduct = await db.Product.findByPk(pId);
  if (!existedProduct) {
    throw badRequest('product', FIELD_ERROR.INVALID, 'product not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    await existedProduct.update({
      name: updateForm.name,
      remark: updateForm.remark,
      priceBaseUnit: updateForm.priceBaseUnit,
      companyId: updateForm.companyId
    }, transaction);

    if (updateForm.assets && updateForm.assets.length) {
      await removeProductAsset(existedProduct.id, transaction);
      await createProductAsset(existedProduct.id, updateForm.assets, transaction);
    }

    if (updateForm.units && updateForm.units.length) {
      await removeProductUnit(existedProduct.id, transaction);
      await createProductUnit(existedProduct.id, updateForm.units, transaction);
    }

    await transaction.commit();
    return existedProduct;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

}

export async function removeProduct(productId) {
  const checkProduct = await db.Product.findByPk(productId);
  if (!checkProduct) {
    throw badRequest('product', FIELD_ERROR.INVALID, 'product not found');
  }
  const transaction = await db.sequelize.transaction();
  try {
    await removeProductAsset(checkProduct.id, transaction);
    await removeProductUnit(checkProduct.id, transaction);
    const product = db.Product.destroy({
      where: { id: checkProduct.id }
    }, {transaction});
    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
