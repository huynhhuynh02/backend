import { initWebAuthController } from './auth.controller';
import { initWebWarehouseController } from './warehouse/warehouse.controller';
import { initWebCompanyController } from './company/company.controller';
import { initWebInventoryController } from './inventory/inventory.controller';
import { initWebInventoryGoodReceiptController } from './inventory/goods-receipt.controller';
import { initWebInventoryGoodIssueController } from './inventory/goods-issue.controller';
import { initWebProductController } from './product/product.controller';
import { initWebInventorySummaryController } from './inventory/inventory-summary.controller';
import { initWebOrderPurchaseController } from './order/purchase.controller';
import { initWebOrderSaleController } from './order/sale.controller';

export function initWebController(app) {
  initWebAuthController(app);
  initWebWarehouseController(app);
  initWebCompanyController(app);
  initWebInventoryController(app);
  initWebInventoryGoodReceiptController(app);
  initWebInventoryGoodIssueController(app);
  initWebInventorySummaryController(app);
  initWebProductController(app);
  initWebOrderPurchaseController(app);
  initWebOrderSaleController(app);
}
