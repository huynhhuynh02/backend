# Inventory Summary

Return list of Inventory Goods summary for displaying on table.

**GET** : `/api/inventory/summary?warehouseId&productId`

**Params**:

 - warehouseId: Select from List of company's warehouse
 - productId: Select from List of Company's Product

**Success Response**
```json
{
  "count": "integer",
  "rows": [
    {
      "id": 123,
      "name": "",
      "warehouse": {
        "id": "integer",
        "name": "string"
      },
      "product": {
        "id": "integer",
        "name": "string"
      },
      "unit": {
        "id": "integer",
        "name": "string"
      },
      "quantity": "",
      "remark": "",
      "lastModifiedDate": ""
    }
  ]
}
