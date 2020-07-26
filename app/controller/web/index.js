import { initWebAuthController } from './auth.controller';
import { initWebWarehouseController } from './warehouse.controller';
import { initWebCompanyController } from './company/company.controller';
import { initWebInventoryController } from './inventory/inventory.controller';
import { initWebInventoryGoodReceiptController } from './inventory/goods-receipt.controller';
import { initWebInventoryGoodIssueController } from './inventory/goods-issue.controller';
import { initWebProductController } from './product/product.controller';

export function initWebController(app) {
  initWebAuthController(app);
  initWebWarehouseController(app);
  initWebCompanyController(app);
  initWebInventoryController(app);
  initWebInventoryGoodReceiptController(app);
  initWebInventoryGoodIssueController(app);
  initWebProductController(app);
}
