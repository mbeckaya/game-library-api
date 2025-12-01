# game-library-api

> **Note:** This README was generated with the assistance of AI for documentation purposes.

A simple RESTful API for managing video games, built with Express.js and Drizzle ORM. 
This project demonstrates CRUD operations, structured routing, and proper API response handling.

## Tech Stack
* Node.js 
* Express.js 
* TypeScript 
* MySQL
* RESTful API design
* Supertest
* Vitest
* JSON


## Base URL

/api/v1

All routes are prefixed with `API_BASE = "/api/v1"`.

---

## Endpoints

### GET /games

Retrieve a list of all games.

**Request:**  
GET /api/v1/games

**Response:**

- Status: 200 OK
- Body: Array of game objects

Example:

```json
[
  {
    "id": 1,
    "title": "My Dummy Game",
    "platformId": 5,
    "isPhysical": false,
    "isDigital": true,
    "genreId": 1,
    "publisherId": 5,
    "releaseYear": 2026
  }
]
```

---

### GET /games/:id

Retrieve details of a specific game by ID.

**Request:**  
GET /api/v1/games/1

**Response:**

- Status: 200 OK
- Body: Single game object

Example:

```json
{
  "id": 1,
  "title": "My Dummy Game",
  "platformId": 5,
  "isPhysical": false,
  "isDigital": true,
  "genreId": 1,
  "publisherId": 5,
  "releaseYear": 2026
}
```

---

### POST /games

Create a new game.

**Request:**  
POST /api/v1/games  
Content-Type: application/json

**Body:**

```json
{
  "title": "My Dummy Game",
  "platformId": 5,
  "isPhysical": false,
  "isDigital": true,
  "genreId": 1,
  "publisherId": 5,
  "releaseYear": 2026
}
```

**Response:**

- Status: 201 Created
- Location Header: /api/v1/games/:id
- Body: Newly created game object

---

### PUT /games/:id

Update an existing game.

**Request:**  
PUT /api/v1/games/1  
Content-Type: application/json

**Body:** Updated game object (same structure as POST)

**Response:**

- Status: 200 OK
- Body: Updated game object

---

### DELETE /games/:id

Remove a game by ID.

**Request:**  
DELETE /api/v1/games/1

**Response:**

- Status: 204 No Content
- Body: Empty

---

## Features

- Fully tested with Vitest and Supertest
- Clean RESTful API structure
- JSON responses for all endpoints
- Easy to extend with additional game fields or relations