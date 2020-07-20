import { initWebAuthController } from './auth.controller';
import { initWebWarehouseController } from './warehouse.controller';
import { initWebCompanyController } from './company/company.controller';


export function initWebController(app) {
  initWebAuthController(app);
  initWebWarehouseController(app);
  initWebCompanyController(app);
}
