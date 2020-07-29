import db from '../../db/models';

export function createInventoryDetail(inventoryId, inventoryDetailsForm, transaction) {
  return db.InventoryDetail.bulkCreate(inventoryDetailsForm.map((result, index) => {
      return {
        inventoryId: inventoryId,
        inventoryDetailId: index + 1,
        productId: result.productId,
        unitId: result.unitId,
        quantity: result.quantity,
        remark: result.remark
      }
    }),{ transaction }
  );
}

export function removeInventoryDetail(inventoryId, transaction) {
  return db.InventoryDetail.destroy(
    {
      where: {
        inventoryId: inventoryId
      }
    }, {transaction}
  );
}
