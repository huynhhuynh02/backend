import {v4 as uuidv4} from 'uuid';
import db from '../../db/models';
import ProductAsset from '../../db/models/product/product-asset';

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

export async function createProductAsset(productId, assetsForm, transaction) {
  const opts = {};
  if (transaction) {
    opts.transaction = transaction;
  }

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
      createdDate: new Date()
    });
  }
  const assetModels = await db.Asset.bulkCreate(assets, {transaction});

  return ProductAsset.bulkCreate(
    assetModels.map(t => {
      return {
        assetsId: t.id,
        productId: productId
      }
    }), {transaction});
}
