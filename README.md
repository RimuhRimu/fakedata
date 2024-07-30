# FakeData API Documentation

Welcome to the FakeData API documentation! This API allows you to generate fake data for users of a social media platform. You can specify the type of data (JSON or CSV), the limit on the number of records, and customize the schema of the generated data.

## Endpoint

```
fakedata-rmye.onrender.com/api
```

## Parameters

### type
  Specifies the format of the generated data.
- **Type**: String
- **Options**: `json`, `csv`
- **Default**: `json`

### description
  A brief description of the generated dataset.
- **Type**: String
- **Example**: "users of a social media"

### limit
  The maximum number of records to generate.
- **Type**: Integer
- **Range**: 1-50
- **Default**: 10

### model
  Which model will generate the data. By default it uses llama3-8b-8192
- **Type**: String
- **Options**:
```javascript
const models = [
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
  "llama3-groq-8b-8192-tool-use-preview",
  "llama3-groq-70b-8192-tool-use-preview",
  "llama-3.1-8b-instant",
  "llama-3.1-70b-versatile",
  "gemma2-9b-it",
  "gemma-7b-it",
];
```
 - **Default**: llama3-8b-8192

### schema
  Defines the structure of the generated data. You can leave this field empty if you want to generate data in the default format created by the AI. I wrote an example request with the schema based on the description above.
- **Type**: Object
```json
{
  "type": "json",
  "description": "users of a social media",
  "limit": 50,
  "schema": {
    "id": "number",
    "name": "string",
    "username": "string",
    "picture": "string",
    "followers": "integer",
    "following": "integer",
    "email": "string",
    "posts": {
      "total": "integer",
      "lastWeek": "integer"
    }
  }
}
```
The schema field accepts the following types: `number, string, array, integer and boolean`

## Example Response

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "picture": "http://example.com/johndoe.jpg",
    "followers": 100,
    "following": 50,
    "email": "johndoe@example.com",
    "posts": {
      "total": 200,
      "lastWeek": 5
    }
  },
  ...
]
```
