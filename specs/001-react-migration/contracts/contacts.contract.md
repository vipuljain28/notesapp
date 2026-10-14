# API Contract: Contacts

**Version**: 1.0.0  
**Created**: 2026-10-14  
**Feature**: 001 - React Migration  
**External API**: JSONPlaceholder  
**Base URL**: `https://jsonplaceholder.typicode.com`  

---

## Overview

This contract defines all HTTP interactions with the JSONPlaceholder API for contact management. The React app communicates via a centralized API client (`src/services/api.ts`) that handles retry logic, timeout, error transformation, and logging.

**Important**: JSONPlaceholder is a mock API. POST/PUT requests succeed but do not persist data. This behavior is acceptable for MVP testing and development.

---

## Endpoints

### 1. List All Contacts

**Method**: `GET`  
**Path**: `/users`  
**Authorization**: None (public API)  

#### Request

```http
GET /users HTTP/1.1
Host: jsonplaceholder.typicode.com
Content-Type: application/json
```

**Query Parameters**: None (sorting/filtering handled client-side in MVP)

#### Response: Success (200 OK)

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

**Response Body**:
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874"
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net"
    }
  }
]
```

**Field Mapping** (JSONPlaceholder → App Contact):
- `id` → Contact.id (number → string)
- `name` → Contact.name
- `email` → Contact.email
- `phone` → Contact.phone
- `address` → Contact.address
- `website` → Contact.website
- `company` → Contact.company

#### Response: Error (500 Internal Server Error)

```http
HTTP/1.1 500 Internal Server Error
```

**App Handling**:
- Catch error and retry (3 attempts, exponential backoff)
- Show inline error: "Failed to load contacts. [Retry Button]"

---

### 2. Get Single Contact

**Method**: `GET`  
**Path**: `/users/{id}`  
**Authorization**: None  

#### Request

```http
GET /users/1 HTTP/1.1
Host: jsonplaceholder.typicode.com
```

#### Response: Success (200 OK)

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442"
}
```

#### Response: Error (404 Not Found)

```http
HTTP/1.1 404 Not Found
```

**App Handling**: Show "Contact not found" inline error, offer return to list.

---

### 3. Create Contact

**Method**: `POST`  
**Path**: `/users`  

#### Request

```http
POST /users HTTP/1.1
Host: jsonplaceholder.typicode.com
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-1234"
}
```

**Validation** (client-side before POST):
- `name`: Non-empty, < 255 chars
- `email`: Valid format
- `phone`: Digits + separators, < 20 chars

#### Response: Success (201 Created)

```http
HTTP/1.1 201 Created
```

**Response Body**:
```json
{
  "id": 101,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-1234"
}
```

**Note**: JSONPlaceholder returns ID 101 but does NOT persist. This contact won't appear in subsequent GET /users.

#### Response: Error (400 Bad Request)

```http
HTTP/1.1 400 Bad Request
```

**Response Body**:
```json
{
  "error": "Bad Request",
  "details": {
    "email": "Email must be valid"
  }
}
```

**App Handling**: Show field-specific inline error messages.

---

### 4. Update Contact

**Method**: `PUT`  
**Path**: `/users/{id}`  

#### Request

```http
PUT /users/1 HTTP/1.1
Content-Type: application/json
```

**Request Body** (partial update):
```json
{
  "name": "Leanne Graham Updated",
  "email": "leanne.updated@april.biz"
}
```

#### Response: Success (200 OK)

```json
{
  "id": 1,
  "name": "Leanne Graham Updated",
  "email": "leanne.updated@april.biz"
}
```

#### Response: Error (422 Unprocessable Entity)

```http
HTTP/1.1 422 Unprocessable Entity
```

**App Handling**: Show validation error inline, allow user to correct.

---

## Error Transformation

| HTTP Status | User Message | Retryable |
|------------|-------------|-----------|
| 400 | See field errors | No |
| 404 | "Contact not found" | No |
| 422 | "Invalid data" | No |
| 500 | "Server error. Retry?" | Yes |
| Network Error | "Cannot connect. Retry?" | Yes |
| Timeout (5s) | "Request timed out. Retry?" | Yes |

---

## Retry Strategy

- **Max Attempts**: 3
- **Backoff**: Exponential (1s, 2s, 4s)
- **Timeout per Request**: 5 seconds

---

## Testing with MSW (Mock Service Worker)

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com', ... },
    ]);
  }),

  http.post('https://jsonplaceholder.typicode.com/users', async ({ request }) => {
    const body = await request.json();
    if (!body.email) {
      return HttpResponse.json({ error: 'Email required' }, { status: 400 });
    }
    return HttpResponse.json({ id: 101, ...body }, { status: 201 });
  }),
];
```

---

**Contract Version**: 1.0.0  
**Last Updated**: 2026-10-14  
**See Also**: [data-model.md](../data-model.md), [plan.md](../plan.md)
