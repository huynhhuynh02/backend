# Search Warehouse

Return list of Warehouse Goods Receipt/Issue for displaying on table.

**GET** : `/api/inventory?warehouseId&title&dateFrom&dateTo`

**Params**:

 - warehouseId: Select from List of company's warehouse
 - title: User input search string
 - dateFrom: Javascript date string
 - dateTo:  Javascript date string

**Success Response**
```json
{
  "count": "integer",
  "rows": [
    {
      "id": 123,
      "name": "",
      "type": "",
      "purposeId": "integer",
      "relative": {

      },
      "createdDate": "",
      "totalProduct": "",
      "remark": "",
      "processedDate": ""
    }
  ]
}
```

# Create Goods Receipt Note

Create **Goods Receipt Note** for one company to one warehouse

**POST** : `/api/inventory/goods-receipt`

**Form Data**

```json
{
  "warehouseId": "bigInteger",
  "name": "string (max 250)",
  "remark": "string",
  "purposeId": "integer",
  "relativeId": "integer",
  "processedDate": "javascript date string, must smaller than current date time.",
  "details": [
    {
      "productId": "big integer",
      "unitId": "integer",
      "quantity": "decimal",
      "remark": ""
    }
  ]
}
```

**Process**

 - Validate input form.
 - Create record.
 - Event for updating inventory.

**Success Response**

Code : `200`

```json
{
  "id": 123,
  "name": "",
  "type": "",
  "createdDate": "",
  "purposeId": "integer",
  "relativeId": "integer",
  "totalProduct": "",
  "remark": "",
  "processedDate": ""
}
```

# Get Goods Receipt Note

Create **Goods Receipt Note** for one company to one warehouse

**GET** : `/api/inventory/goods-receipt/{id}`

**Success Response**

Code : `200`

```json
{
  "id": 123,
  "name": "",
  "type": "",
  "createdDate": "",
  "purposeId": "integer",
  "relativeId": "integer",
  "relation": {
    "id": "integer",
    "name": "string",
    "more": "..."
  },
  "totalProduct": "",
  "remark": "",
  "processedDate": "",
  "details": [
    {
      "product": {
        "id": "",
        "name": ""
      },

      "unit": {
        "id": "integer",
        "name": "string"
      },
      "quantity": "decimal",
      "remark": ""
    }
  ]
}
```

# Update Goods Receipt Note

Update **Goods Receipt Note** for one company to one warehouse

**POST** : `/api/inventory/goods-receipt/{id}`

**Form Data**

```json
{
  "warehouseId": "bigInteger",
  "name": "string (max 250)",
  "remark": "string",
  "purposeId": "integer",
  "relativeId": "integer",
  "processedDate": "javascript date string, must smaller than current date time.",
  "details": [
    {
      "productId": "big integer",
      "unitId": "integer",
      "quantity": "decimal",
      "remark": ""
    }
  ]
}
```

**Process**
 - Check user permission (check owner or full), if owner check id is belong to user or not.
 - Validate input form.
 - Create record.
 - Event for updating inventory.

**Event**
 - Update Inventory (old, new)
 - Old: Old Goods Receipt Note
 - New: New Goods Receipt Note

**Success Response**

Code : `200`

```json
{
  "id": 123,
  "name": "",
  "type": "",
  "createdDate": "",
  "purposeId": "integer",
  "relativeId": "integer",
  "totalProduct": "",
  "remark": "",
  "processedDate": ""
}
```

# Delete Goods Receipt Note

Delete **Goods Receipt Note** for one company to one warehouse

**DELETE** : `/api/inventory/goods-receipt/{id}`

**Process**
 - Check user permission (check owner or full), if owner check id is belong to user or not.
 - Delete record.
 - Event for updating inventory.

**Event**
 - Delete Inventory (receiptNote)

**Success Response**

Code : `200`

```json
{
  "id": 123,
  "name": "",
  "type": "",
  "createdDate": "",
  "purposeId": "integer",
  "relativeId": "integer",
  "totalProduct": "",
  "remark": "",
  "processedDate": ""
}
```