import {v4 as uuidv4} from 'uuid';
import db from '../../db/models';
import ProductAsset from '../../db/models/product/product-asset';
import OrderAsset from '../../db/models/order/order-asset';

const fs = require("fs");

const ASSET_STORE_FOLDER = './uploads';

if (!fs.existsSync(`${ASSET_STORE_FOLDER}/`)) {
  fs.mkdirSync(`${ASSET_STORE_FOLDER}/`);
}

export async function storeFileFromBase64(baseImage) {
  const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
  const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
  const regex = new RegExp(`^data:${fileType}/${ext};base64,`, 'gi');
  const base64Data = baseImage.replace(regex, "");
  const filename = uuidv4();

  fs.writeFileSync(`${ASSET_STORE_FOLDER}/${filename}`, base64Data, 'base64');
  return filename;
}

export async function createProductAsset(productId, companyId, assetsForm, transaction) {
  const assets = [];
  for (let i = 0; i < assetsForm.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const fileId = await storeFileFromBase64(assetsForm[i].data);
    assets.push({
      name: assetsForm[i].name,
      type: assetsForm[i].type,
      ext: assetsForm[i].ext,
      size: assetsForm[i].size,
      fileId: fileId,
      companyId: companyId,
      createdDate: new Date()
    });
  }
  const assetModels = await db.Asset.bulkCreate(assets, {transaction});
  return ProductAsset.bulkCreate(
    assetModels.map(t => {
      return {
        assetId: t.id,
        productId: productId
      }
    }), {transaction});
}

export async function removeProductAsset(productId, transaction) {
  const product = await db.Product.findOne({
    where: {
      id: productId
    },
    include: [
      {model: db.Asset, as: 'assets'}
    ],
    transaction
  });

  if (product && product.assets.length) {
    for (let i = 0; i < product.assets.length; i += 1) {
      fs.unlinkSync(`${ASSET_STORE_FOLDER}/${product.assets[i].fileId}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      // eslint-disable-next-line no-await-in-loop
      await db.Asset.destroy({
          where: {
            id: product.assets[i].id
          },
          transaction
        },
      );
   }
  }
  return db.ProductAsset.destroy({
    where: {
      productId: product.id
    }, transaction
  });

}

export async function createOrderAsset(orderId, companyId, assetsForm, transaction) {
  const assets = [];
  for (let i = 0; i < assetsForm.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const fileId = await storeFileFromBase64(assetsForm[i].data);
    assets.push({
      name: assetsForm[i].name,
      type: assetsForm[i].type,
      ext: assetsForm[i].ext,
      size: assetsForm[i].size,
      fileId: fileId,
      companyId: companyId,
      createdDate: new Date()
    });
  }
  const assetModels = await db.Asset.bulkCreate(assets, {transaction});
  return OrderAsset.bulkCreate(
    assetModels.map(t => {
      return {
        assetId: t.id,
        orderId: orderId
      }
    }), {transaction});
}

export async function removeOrderAsset(orderId, transaction) {
  const order = await db.Order.findOne({
    where: {
      id: orderId
    },
    include: [
      {model: db.Asset, as: 'assets'}
    ],
    transaction
  });

  if (order && order.assets.length) {
    for (let i = 0; i < order.assets.length; i += 1) {
      fs.unlinkSync(`${ASSET_STORE_FOLDER}/${order.assets[i].fileId}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      // eslint-disable-next-line no-await-in-loop
      await db.Asset.destroy({
          where: {
            id: order.assets[i].id
          },
          transaction
        },
      );
    }
  }
  return db.OrderAsset.destroy({
    where: {
      orderId: order.id
    }, transaction
  });

}
