---
title: TV series and episodes
description: API endpoints for managing TV series, seasons, and episodes
sidebar_position: 2
tags: [api, tv, series, episodes, library, endpoints, reference]
keywords: [api, tv, series, episodes, library, endpoints]
---

# TV series and episodes

Endpoints for managing TV series, seasons, and episodes in the Cinephage library.

## Authentication

All TV endpoints require authentication via session cookie or API key.

| Endpoint | Auth Level |
|----------|------------|
| Series endpoints | requireAuth |
| Season endpoints | requireAuth |
| Episode endpoints | requireAuth |

---

## Series endpoints

### List series

Returns a paginated list of TV series.

```
GET /api/library/series
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| sort | string | No | Sort field and direction |
| monitored | boolean | No | Filter by monitored status |
| downloaded | boolean | No | Filter by download status |
| search | string | No | Search query for title |
| network | string | No | Filter by network |

### Sort options

| Field | Description |
|-------|-------------|
| `title` | Series title |
| `year` | First air year |
| `createdAt` | Date added to library |
| `updatedAt` | Last update date |
| `tmdbRating` | TMDB rating score |
| `nextAiring` | Next episode air date |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 429 | Rate limit exceeded |

### Response schema

```json
{
  "series": [
    {
      "id": "string",
      "title": "string",
      "originalTitle": "string",
      "year": "integer",
      "tmdbId": "integer",
      "tvdbId": "integer",
      "imdbId": "string",
      "overview": "string",
      "network": "string",
      "status": "string",
      "runtime": "integer",
      "genres": ["string"],
      "certification": "string",
      "tmdbRating": "number",
      "tmdbVoteCount": "integer",
      "posterUrl": "string",
      "backdropUrl": "string",
      "monitored": "boolean",
      "seasonFolder": "boolean",
      "path": "string",
      "seasonCount": "integer",
      "episodeCount": "integer",
      "episodeFileCount": "integer",
      "totalEpisodeCount": "integer",
      "percentOfEpisodes": "number",
      "nextAiring": "string",
      "previousAiring": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "addedAt": "string",
      "rootFolderPath": "string",
      "searchOnAdd": "boolean",
      "lastSearchTime": "string"
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
  "http://localhost:3000/api/library/series?page=1&limit=10&sort=title:asc"
```

---

### Create series

Adds a new TV series to the library by TMDB ID.

```
POST /api/library/series
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tmdbId | integer | Yes | TMDB series ID |
| rootFolderPath | string | Yes | Path to root folder |
| monitored | boolean | No | Whether to monitor (default: true) |
| seasonFolder | boolean | No | Organize by season folders (default: true) |
| qualityProfileId | string | No | Quality profile ID |
| seasonOptions | array | No | Per-season monitoring settings |

### Season options schema

```json
{
  "seasonOptions": [
    {
      "seasonNumber": "integer",
      "monitored": "boolean"
    }
  ]
}
```

### Response codes

| Code | Description |
|------|-------------|
| 201 | Created successfully |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | TMDB series not found |
| 409 | Series already in library |

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
    "tmdbId": 1399,
    "rootFolderPath": "/tv",
    "monitored": true,
    "seasonFolder": true,
    "seasonOptions": [
      {"seasonNumber": 1, "monitored": true},
      {"seasonNumber": 2, "monitored": true}
    ]
  }' \
  http://localhost:3000/api/library/series
```

---

### Get series

Returns detailed information for a specific series.

```
GET /api/library/series/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Series UUID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 404 | Series not found |

### Response schema

```json
{
  "id": "string",
  "title": "string",
  "originalTitle": "string",
  "year": "integer",
  "tmdbId": "integer",
  "tvdbId": "integer",
  "imdbId": "string",
  "overview": "string",
  "network": "string",
  "status": "string",
  "type": "string",
  "runtime": "integer",
  "genres": ["string"],
  "certification": "string",
  "tmdbRating": "number",
  "tmdbVoteCount": "integer",
  "posterUrl": "string",
  "backdropUrl": "string",
  "monitored": "boolean",
  "seasonFolder": "boolean",
  "path": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "addedAt": "string",
  "rootFolderPath": "string",
  "searchOnAdd": "boolean",
  "lastSearchTime": "string",
  "seasons": [
    {
      "id": "string",
      "seriesId": "string",
      "seasonNumber": "integer",
      "monitored": "boolean",
      "statistics": {
        "episodeCount": "integer",
        "episodeFileCount": "integer",
        "percentOfEpisodes": "number",
        "totalEpisodeCount": "integer"
      },
      "images": [
        {
          "url": "string",
          "type": "string"
        }
      ]
    }
  ],
  "alternativeTitles": ["string"],
  "actors": [
    {
      "name": "string",
      "character": "string",
      "tmdbId": "integer"
    }
  ]
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  http://localhost:3000/api/library/series/770e8400-e29b-41d4-a716-446655440002
```

---

### Update series

Updates series settings.

```
PUT /api/library/series/:id
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| monitored | boolean | No | Monitoring status |
| seasonFolder | boolean | No | Season folder organization |
| rootFolderPath | string | No | Root folder path |
| qualityProfileId | string | No | Quality profile ID |
| path | string | No | Series path |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | Series not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"monitored": false}' \
  http://localhost:3000/api/library/series/770e8400-e29b-41d4-a716-446655440002
```

---

### Delete series

Removes a series from the library.

```
DELETE /api/library/series/:id
```

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| deleteFiles | boolean | No | Also delete episode files (default: false) |
| deleteAddImportListExclusion | boolean | No | Add to import list exclusion (default: false) |

### Response codes

| Code | Description |
|------|-------------|
| 204 | Deleted successfully |
| 401 | Authentication required |
| 404 | Series not found |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/library/series/770e8400-e29b-41d4-a716-446655440002?deleteFiles=true"
```

---

### Refresh series metadata

Refreshes series metadata from TMDB/TVDB.

```
POST /api/library/series/:id/refresh
```

### Response codes

| Code | Description |
|------|-------------|
| 202 | Refresh queued |
| 401 | Authentication required |
| 404 | Series not found |

### Example request

```bash
curl -X POST \
  -H "x-api-key: cinephage_your_key_here" \
  http://localhost:3000/api/library/series/770e8400-e29b-41d4-a716-446655440002/refresh
```

---

## Season endpoints

### Get season

Returns details for a specific season including all episodes.

```
GET /api/library/series/:seriesId/seasons/:seasonNumber
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| seriesId | string | Series UUID |
| seasonNumber | integer | Season number |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 404 | Season not found |

### Response schema

```json
{
  "id": "string",
  "seriesId": "string",
  "seasonNumber": "integer",
  "monitored": "boolean",
  "overview": "string",
  "airDate": "string",
  "statistics": {
    "episodeCount": "integer",
    "episodeFileCount": "integer",
    "percentOfEpisodes": "number",
    "totalEpisodeCount": "integer"
  },
  "images": [
    {
      "url": "string",
      "type": "string"
    }
  ],
  "episodes": [
    {
      "id": "string",
      "seriesId": "string",
      "seasonNumber": "integer",
      "episodeNumber": "integer",
      "title": "string",
      "overview": "string",
      "airDate": "string",
      "runtime": "integer",
      "monitored": "boolean",
      "hasFile": "boolean",
      "downloaded": "boolean",
      "fileId": "string",
      "file": {
        "id": "string",
        "path": "string",
        "size": "integer",
        "quality": "string",
        "qualityScore": "integer",
        "dateAdded": "string"
      }
    }
  ]
}
```

---

### Update season monitoring

Updates monitoring status for a season.

```
PUT /api/library/series/:seriesId/seasons/:seasonNumber
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| monitored | boolean | Yes | Monitoring status |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | Season not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"monitored": false}' \
  http://localhost:3000/api/library/series/770e8400-e29b-41d4-a716-446655440002/seasons/1
```

---

## Episode endpoints

### Get episode

Returns detailed information for a specific episode.

```
GET /api/library/episodes/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Episode UUID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 404 | Episode not found |

### Response schema

```json
{
  "id": "string",
  "seriesId": "string",
  "seasonNumber": "integer",
  "episodeNumber": "integer",
  "absoluteEpisodeNumber": "integer",
  "title": "string",
  "overview": "string",
  "airDate": "string",
  "airDateUtc": "string",
  "runtime": "integer",
  "monitored": "boolean",
  "unverifiedSceneNumbering": "boolean",
  "hasFile": "boolean",
  "downloaded": "boolean",
  "fileId": "string",
  "file": {
    "id": "string",
    "path": "string",
    "size": "integer",
    "quality": "string",
    "qualityScore": "integer",
    "releaseTitle": "string",
    "releaseGroup": "string",
    "languages": ["string"],
    "mediaInfo": {
      "videoCodec": "string",
      "audioCodec": "string",
      "audioChannels": "number",
      "resolution": "string"
    },
    "dateAdded": "string"
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
  http://localhost:3000/api/library/episodes/880e8400-e29b-41d4-a716-446655440003
```

---

### Update episode

Updates episode monitoring status.

```
PUT /api/library/episodes/:id
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| monitored | boolean | Yes | Monitoring status |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | Episode not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"monitored": false}' \
  http://localhost:3000/api/library/episodes/880e8400-e29b-41d4-a716-446655440003
```

---

## Series status values

| Status | Description |
|--------|-------------|
| `continuing` | Series is still airing |
| `ended` | Series has concluded |
| `upcoming` | Series has not yet premiered |

## Series types

| Type | Description |
|------|-------------|
| `standard` | Standard weekly series |
| `daily` | Daily series |
| `anime` | Anime series with absolute numbering |

## See Also

- [Movies](movies) — Movie endpoints
- [Search](search) — Search and download endpoints