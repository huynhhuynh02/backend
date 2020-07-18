# Search Warehouse

Return list of Warehouse Input/Output for displaying on table.

**GET** : `/api/warehouse?warehouseId&title&dateFrom&dateTo`

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
      "createdDate": "",
      "totalProduct": "",
      "remark": "",
      "processedDate": ""
    }
  ]
}
```


# Create Warehouse In

Create **Warehouse In** for one company to one warehouse

**POST** : `/api/warehouse/in`

**Form Data**

```json
{
  "warehouseId": "bigInteger",
  "name": "string (max 250)",
  "remark": "string",
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
  "totalProduct": "",
  "remark": "",
  "processedDate": ""
}
```
