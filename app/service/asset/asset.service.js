import { v4 as uuidv4 } from 'uuid';
import db from '../../db/models';
import ProductAsset from '../../db/models/product/product-asset';

const fs = require("fs");

export async function convertBase64(baseImage) {
  // console.log(baseImage);
  console.log('vsdfsdfsdfsdfdsfdsfds');
  const uploadPath = "./uploads";
  const localPath = `${uploadPath}/`;
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
  const base64Data = baseImage.replace(regex, "");
  // const filename = `${uuidv4()}.${ext}`;
  const filename = uuidv4();
  if(!fs.existsSync(`${uploadPath}/`)) {
    fs.mkdirSync(`${uploadPath}/`);
  }
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath);
  }
  fs.writeFileSync(localPath+filename, base64Data, 'base64');
  return filename;
}

export async function createAsset(productId, createForm, transaction) {
  const opts = {};
  if (transaction) {
    opts.transaction = transaction;
  }
  for (let i = 0; i < createForm.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const fileId = await convertBase64(createForm[i].data);
    // eslint-disable-next-line no-await-in-loop
    const assets = await db.Asset.create({
      name: createForm[i].name,
      type: createForm[i].type,
      ext: createForm[i].ext,
      size: createForm[i].size,
      fileId: fileId,
      createdDate: new Date()
    }, opts);
    // eslint-disable-next-line no-await-in-loop
    await ProductAsset.create({
      assetId: assets.id,
      productId: productId
    }, opts);
  }
   // const assets = await db.Asset.bulkCreate(createForm.map(result => {
   //   return  {
   //     name: result.name,
   //     type: result.type,
   //     ext: result.ext,
   //     size: result.size,
   //     fileId: uuidv4(),
   //     createdDate: new Date()
   //   }
   // }), opts);
   //
   //  await db.ProductAsset.bulkCreate(assets.map(result => {
   //    return {
   //      assetId: result.id,
   //      productId: productId
   //    }
   //  }), opts);

}
