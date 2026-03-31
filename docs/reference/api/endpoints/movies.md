---
id: api-movies
title: Movies
description: API endpoints for managing movies in the library
sidebar_position: 1
tags: [api, movies, library, endpoints, reference]
keywords: [api, movies, library, endpoints]
---

# Movies

Endpoints for managing movies in the Cinephage library.

## Authentication

All movie endpoints require authentication via session cookie or API key.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/library/movies` | requireAuth |
| POST `/api/library/movies` | requireAuth |
| GET `/api/library/movies/:id` | requireAuth |
| PUT `/api/library/movies/:id` | requireAuth |
| DELETE `/api/library/movies/:id` | requireAuth |
| POST `/api/library/movies/:id/auto-search` | requireAuth |
| POST `/api/library/movies/:id/refresh` | requireAuth |
| PUT `/api/library/movies/bulk` | requireAuth |

---

## List movies

Returns a paginated list of movies with filtering and sorting options.

```
GET /api/library/movies
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| sort | string | No | Sort field and direction (e.g., `createdAt:desc`) |
| monitored | boolean | No | Filter by monitored status |
| downloaded | boolean | No | Filter by download status |
| search | string | No | Search query for title |
| genre | string | No | Filter by genre |
| year | integer | No | Filter by release year |

### Sort options

| Field | Description |
|-------|-------------|
| `title` | Movie title |
| `year` | Release year |
| `createdAt` | Date added to library |
| `updatedAt` | Last update date |
| `tmdbRating` | TMDB rating score |
| `lastSearchTime` | Last search timestamp |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 429 | Rate limit exceeded |

### Response schema

```json
{
  "movies": [
    {
      "id": "string",
      "title": "string",
      "originalTitle": "string",
      "year": "integer",
      "tmdbId": "integer",
      "imdbId": "string",
      "overview": "string",
      "runtime": "integer",
      "genres": ["string"],
      "certification": "string",
      "tmdbRating": "number",
      "tmdbVoteCount": "integer",
      "posterUrl": "string",
      "backdropUrl": "string",
      "monitored": "boolean",
      "downloaded": "boolean",
      "hasFile": "boolean",
      "fileId": "string",
      "file": {
        "id": "string",
        "path": "string",
        "size": "integer",
        "quality": "string",
        "qualityScore": "integer",
        "releaseTitle": "string",
        "dateAdded": "string"
      },
      "createdAt": "string",
      "updatedAt": "string",
      "addedAt": "string",
      "minimumAvailability": "string",
      "rootFolderPath": "string",
      "searchOnAdd": "boolean",
      "lastSearchTime": "string",
      "titleSlug": "string"
    }
  ],
  "pagination": {
    "page": "integer",
    "limit": "integer",
    "total": "integer",
    "totalPages": "integer"
  }
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/library/movies?page=1&limit=10&sort=createdAt:desc&monitored=true"
```

### Example response

```json
{
  "movies": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Inception",
      "originalTitle": "Inception",
      "year": 2010,
      "tmdbId": 27205,
      "imdbId": "tt1375666",
      "overview": "A thief who steals corporate secrets through the use of dream-sharing technology...",
      "runtime": 148,
      "genres": ["Action", "Science Fiction", "Adventure"],
      "certification": "PG-13",
      "tmdbRating": 8.4,
      "tmdbVoteCount": 34512,
      "posterUrl": "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      "backdropUrl": "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      "monitored": true,
      "downloaded": true,
      "hasFile": true,
      "fileId": "660e8400-e29b-41d4-a716-446655440001",
      "file": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "path": "/movies/Inception (2010)/Inception.2010.1080p.BluRay.x264.mkv",
        "size": 10485760000,
        "quality": "Bluray-1080p",
        "qualityScore": 100,
        "releaseTitle": "Inception.2010.1080p.BluRay.x264-Group",
        "dateAdded": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T11:45:00Z",
      "addedAt": "2024-01-15T10:30:00Z",
      "minimumAvailability": "released",
      "rootFolderPath": "/movies",
      "searchOnAdd": true,
      "lastSearchTime": "2024-01-15T10:35:00Z",
      "titleSlug": "inception"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## Create movie

Adds a new movie to the library by TMDB ID.

```
POST /api/library/movies
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tmdbId | integer | Yes | TMDB movie ID |
| rootFolderPath | string | Yes | Path to root folder |
| monitored | boolean | No | Whether to monitor for releases (default: true) |
| minimumAvailability | string | No | Minimum availability (released, inCinemas, announced) |
| searchOnAdd | boolean | No | Search immediately after adding (default: false) |
| qualityProfileId | string | No | Quality profile ID |

### Minimum availability values

| Value | Description |
|-------|-------------|
| `announced` | When announced on TMDB |
| `inCinemas` | When released in theaters |
| `released` | When released physically or digitally |

### Response codes

| Code | Description |
|------|-------------|
| 201 | Created successfully |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | TMDB movie not found |
| 409 | Movie already in library |

### Response schema

```json
{
  "success": "boolean",
  "id": "string",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "tmdbId": 27205,
    "rootFolderPath": "/movies",
    "monitored": true,
    "searchOnAdd": true
  }' \
  http://localhost:3000/api/library/movies
```

### Example response

```json
{
  "success": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Movie added to library"
}
```

---

## Get movie

Returns detailed information for a specific movie.

```
GET /api/library/movies/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Movie UUID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 404 | Movie not found |

### Response schema

```json
{
  "id": "string",
  "title": "string",
  "originalTitle": "string",
  "year": "integer",
  "tmdbId": "integer",
  "imdbId": "string",
  "overview": "string",
  "tagline": "string",
  "runtime": "integer",
  "genres": ["string"],
  "certification": "string",
  "tmdbRating": "number",
  "tmdbVoteCount": "integer",
  "posterUrl": "string",
  "backdropUrl": "string",
  "website": "string",
  "isAvailable": "boolean",
  "monitored": "boolean",
  "downloaded": "boolean",
  "hasFile": "boolean",
  "fileId": "string",
  "file": {
    "id": "string",
    "path": "string",
    "size": "integer",
    "quality": "string",
    "qualityScore": "integer",
    "releaseTitle": "string",
    "releaseGroup": "string",
    "edition": "string",
    "languages": ["string"],
    "mediaInfo": {
      "videoCodec": "string",
      "audioCodec": "string",
      "audioChannels": "number",
      "resolution": "string"
    },
    "dateAdded": "string"
  },
  "createdAt": "string",
  "updatedAt": "string",
  "addedAt": "string",
  "minimumAvailability": "string",
  "rootFolderPath": "string",
  "searchOnAdd": "boolean",
  "lastSearchTime": "string",
  "titleSlug": "string",
  "alternativeTitles": ["string"],
  "credits": {
    "cast": [
      {
        "name": "string",
        "character": "string",
        "tmdbId": "integer"
      }
    ],
    "crew": [
      {
        "name": "string",
        "job": "string",
        "tmdbId": "integer"
      }
    ]
  },
  "images": [
    {
      "url": "string",
      "type": "string"
    }
  ]
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  http://localhost:3000/api/library/movies/550e8400-e29b-41d4-a716-446655440000
```

---

## Update movie

Updates movie metadata and settings.

```
PUT /api/library/movies/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Movie UUID |

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| monitored | boolean | No | Monitoring status |
| minimumAvailability | string | No | Minimum availability |
| rootFolderPath | string | No | Root folder path |
| qualityProfileId | string | No | Quality profile ID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | Movie not found |

### Response schema

```json
{
  "success": "boolean",
  "id": "string",
  "updatedAt": "string"
}
```

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"monitored": false}' \
  http://localhost:3000/api/library/movies/550e8400-e29b-41d4-a716-446655440000
```

### Example response

```json
{
  "success": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

---

## Delete movie

Removes a movie from the library.

```
DELETE /api/library/movies/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Movie UUID |

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| deleteFiles | boolean | No | Also delete movie files (default: false) |

### Response codes

| Code | Description |
|------|-------------|
| 204 | Deleted successfully |
| 401 | Authentication required |
| 404 | Movie not found |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/library/movies/550e8400-e29b-41d4-a716-446655440000?deleteFiles=true"
```

---

## Trigger auto search

Initiates an automatic search for the movie.

```
POST /api/library/movies/:id/auto-search
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Movie UUID |

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| searchType | string | No | Type of search (missing, cutOffUnmet, manual) |

### Response codes

| Code | Description |
|------|-------------|
| 202 | Search initiated |
| 401 | Authentication required |
| 404 | Movie not found |

### Response schema

```json
{
  "success": "boolean",
  "searchId": "string",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"searchType": "manual"}' \
  http://localhost:3000/api/library/movies/550e8400-e29b-41d4-a716-446655440000/auto-search
```

---

## Refresh metadata

Refreshes movie metadata from TMDB.

```
POST /api/library/movies/:id/refresh
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Movie UUID |

### Response codes

| Code | Description |
|------|-------------|
| 202 | Refresh queued |
| 401 | Authentication required |
| 404 | Movie not found |

### Response schema

```json
{
  "success": "boolean",
  "taskId": "string",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "x-api-key: cinephage_your_key_here" \
  http://localhost:3000/api/library/movies/550e8400-e29b-41d4-a716-446655440000/refresh
```

---

## Bulk edit movies

Updates multiple movies at once.

```
PUT /api/library/movies/bulk
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ids | array | Yes | Array of movie UUIDs |
| monitored | boolean | No | New monitoring status |
| minimumAvailability | string | No | New minimum availability |
| rootFolderPath | string | No | New root folder path |
| qualityProfileId | string | No | New quality profile ID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid request body |
| 401 | Authentication required |

### Response schema

```json
{
  "success": "boolean",
  "updatedCount": "integer",
  "failedCount": "integer",
  "failures": [
    {
      "id": "string",
      "error": "string"
    }
  ]
}
```

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "ids": ["550e8400-e29b-41d4-a716-446655440000", "660e8400-e29b-41d4-a716-446655440001"],
    "monitored": true
  }' \
  http://localhost:3000/api/library/movies/bulk
```

### Example response

```json
{
  "success": true,
  "updatedCount": 2,
  "failedCount": 0,
  "failures": []
}
```

---

## See Also

- [Authentication](../authentication) — Authentication methods
- [TV](tv) — TV series and episode endpoints
- [Search](search) — Search and download endpoints