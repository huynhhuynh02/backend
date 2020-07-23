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
