# Search Warehouse

Return list of Warehouse for displaying on table.

**GET** : `/api/warehouse?name`

**Params**:

 - name: User input search string

**Success Response**
```json
{
  "count": "integer",
  "rows": [
    {
      "id": 1,
      "name": "",
      "address": "",
      "userId": "",
      "companyId": ""
    }
  ]
}
```


# Create Warehouse

Create **Warehouse ** for one company to one warehouse

**POST** : `/api/warehouse`

**Form Data**

```json
{
  "name": "string (max 250)",
  "address": "string",
  "userId": "integer",
  "companyId": "integer"
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
  "address": "",
  "userId": "",
  "totalProduct": "",
  "companyId": ""
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

# Get Warehouse

Get ** Warehouse ** by ID

**GET** : `/api/warehouse/{wId}`

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

# Update Warehouse

Update ** Warehouse **

**POST** : `/api/warehouse/{id}`

**Form Data**

```json
{
  "name": "string (max 250)",
  "address": "string",
  "userId": "integer",
  "companyId": "integer"
}
```

**Process**
 - Check user permission (check owner or full), if owner check id is belong to user or not.
 - Validate input form.
 - Update record.
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

# Delete Warehouse

Delete **Warehouse**

**DELETE** : `/api/warehouse/{id}`

**Process**
 - Check user permission (check owner or full), if owner check id is belong to user or not.
 - Delete record.

**Event**
 - Delete Warehouse

**Success Response**

Code : `200`
