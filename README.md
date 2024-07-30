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

## Error Handling

If an error occurs during the generation of fake data, the API will respond with an HTTP status code indicating the nature of the error and a message describing the issue.

## Rate Limiting

To prevent abuse, the API has rate limiting in place.
