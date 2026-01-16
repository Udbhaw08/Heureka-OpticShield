# OpticShield API Routes Documentation

This document describes the backend API routes needed for the OpticShield application. Implement these routes on your backend server.

## Base URL
Replace `YOUR_BACKEND_URL` with your actual backend server URL (e.g., `http://your-pc-ip:5000`)

---

## API Endpoints

### 1. Get All Persons
**GET** `/api/persons`

**Description:** Fetch all persons from the database

**Response:**
```json
[
  {
    "_id": "mongodb_object_id",
    "id": 1,
    "name": "John Doe",
    "flag": "whitelist",
    "metadata": "Optional notes",
    "image": "image_url or base64"
  }
]
```

---

### 2. Get Single Person
**GET** `/api/persons/:id`

**Description:** Fetch a specific person by MongoDB _id

**Parameters:**
- `id` (path parameter): MongoDB ObjectId

**Response:**
```json
{
  "_id": "mongodb_object_id",
  "id": 1,
  "name": "John Doe",
  "flag": "whitelist",
  "metadata": "Optional notes",
  "image": "image_url"
}
```

---

### 3. Create New Person
**POST** `/api/persons`

**Description:** Add a new person to the database

**Request Body:**
```json
{
  "name": "Jane Doe",
  "flag": "whitelist",  // optional: "whitelist" | "blacklist" | "watchlist"
  "metadata": "Engineer at XYZ",
  "image": "base64_string_or_url"  // optional
}
```

**Response:**
```json
{
  "_id": "mongodb_object_id",
  "id": 2,
  "name": "Jane Doe",
  "flag": "whitelist",
  "metadata": "Engineer at XYZ",
  "image": "base64_string_or_url"
}
```

**Notes:**
- Auto-increment `id` field on backend
- Default `flag` to "whitelist" if not provided

---

### 4. Update Person
**PUT** `/api/persons/:id`

**Description:** Update an existing person

**Parameters:**
- `id` (path parameter): MongoDB ObjectId

**Request Body:** (send only fields to update)
```json
{
  "name": "Updated Name",
  "flag": "blacklist",
  "metadata": "Updated metadata"
}
```

**Response:**
```json
{
  "_id": "mongodb_object_id",
  "id": 1,
  "name": "Updated Name",
  "flag": "blacklist",
  "metadata": "Updated metadata",
  "image": "image_url"
}
```

---

### 5. Delete Person
**DELETE** `/api/persons/:id`

**Description:** Remove a person from the database

**Parameters:**
- `id` (path parameter): MongoDB ObjectId

**Response:**
```json
{
  "message": "Person deleted successfully",
  "person": {
    "_id": "mongodb_object_id",
    "id": 1,
    "name": "John Doe"
  }
}
```

---

## MongoDB Schema

Your backend should use this schema structure:

```javascript
{
  id: Number,              // Auto-increment, unique
  name: String,            // Required
  flag: String,            // "whitelist" | "blacklist" | "watchlist"
  metadata: String,        // Optional notes/remarks
  image: String,           // Base64 or URL
  createdAt: Date,
  updatedAt: Date
}
```

---

## CORS Configuration

Make sure your backend has CORS enabled to allow requests from the frontend:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

## Error Responses

All endpoints should return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST)
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

**Error Response Format:**
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## Example Implementation (Express + Mongoose)

```javascript
// Person Model
const personSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  flag: { 
    type: String, 
    enum: ['whitelist', 'blacklist', 'watchlist'],
    default: 'whitelist'
  },
  metadata: { type: String, default: '' },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Person = mongoose.model('Person', personSchema);

// Example Route
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await Person.find().sort({ id: 1 });
    res.json(persons);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching persons', 
      error: error.message 
    });
  }
});
```

---

## Testing the API

Use these curl commands to test your endpoints:

```bash
# Get all persons
curl http://YOUR_BACKEND_URL/api/persons

# Create a person
curl -X POST http://YOUR_BACKEND_URL/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","flag":"whitelist","metadata":"Test data"}'

# Update a person
curl -X PUT http://YOUR_BACKEND_URL/api/persons/MONGODB_ID \
  -H "Content-Type: application/json" \
  -d '{"flag":"blacklist"}'

# Delete a person
curl -X DELETE http://YOUR_BACKEND_URL/api/persons/MONGODB_ID
```

---

## Frontend Configuration

Update the `.env` file in your frontend with your backend URL:

```
VITE_API_URL=http://your-backend-pc-ip:5000
```
