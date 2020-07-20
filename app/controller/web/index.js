import { initWebAuthController } from './auth.controller';
import { initWebWarehouseController } from './warehouse.controller';


export function initWebController(app) {
  initWebAuthController(app);
  initWebWarehouseController(app);
}
