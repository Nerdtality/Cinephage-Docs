---
id: api-settings
title: Settings
description: API endpoints for system settings and configuration
sidebar_position: 5
tags: [api, settings, configuration, system, endpoints, reference]
keywords: [api, settings, configuration, system, endpoints]
---

# Settings

Endpoints for managing system settings and configuration.

## Authentication

Most settings endpoints require admin authorization.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/settings/*` | Admin (most) |
| PUT `/api/settings/*` | Admin |
| GET `/api/health` | Public |
| GET `/api/ready` | Public |
| GET `/api/system/status` | Public |

---

## System health

Returns the health status of the application and its dependencies.

```
GET /api/health
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Healthy |
| 503 | Unhealthy (one or more services failing) |

### Response schema

```json
{
  "status": "string",
  "version": "string",
  "checks": {
    "database": {
      "status": "string",
      "responseTime": "number"
    },
    "downloadClients": {
      "status": "string",
      "clients": [
        {
          "id": "string",
          "name": "string",
          "status": "string"
        }
      ]
    },
    "indexers": {
      "status": "string",
      "enabledCount": "integer",
      "totalCount": "integer"
    }
  },
  "timestamp": "string"
}
```

### Status values

| Status | Description |
|--------|-------------|
| `healthy` | Service is functioning normally |
| `degraded` | Service is working with issues |
| `unhealthy` | Service is not functioning |

### Example request

```bash
curl http://localhost:3000/api/health
```

### Example response

```json
{
  "status": "healthy",
  "version": "2.1.0",
  "checks": {
    "database": {
      "status": "healthy",
      "responseTime": 15.2
    },
    "downloadClients": {
      "status": "healthy",
      "clients": [
        {
          "id": "c10e8400-e29b-41d4-a716-446655440030",
          "name": "qBittorrent",
          "status": "healthy"
        }
      ]
    },
    "indexers": {
      "status": "healthy",
      "enabledCount": 5,
      "totalCount": 8
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Readiness check

Returns whether the application is ready to accept traffic.

```
GET /api/ready
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Ready |
| 503 | Not ready |

### Response schema

```json
{
  "ready": "boolean",
  "timestamp": "string"
}
```

---

## System status

Returns detailed status of background services.

```
GET /api/system/status
```

### Response schema

```json
{
  "services": [
    {
      "name": "string",
      "status": "string",
      "lastRun": "string",
      "nextRun": "string",
      "uptime": "number"
    }
  ],
  "timestamp": "string"
}
```

### Service status values

| Status | Description |
|--------|-------------|
| `pending` | Service not yet started |
| `starting` | Service is initializing |
| `ready` | Service is running normally |
| `error` | Service encountered an error |

---

## List settings

Returns all system settings.

```
GET /api/settings
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 403 | Admin authorization required |

### Response schema

```json
{
  "settings": [
    {
      "key": "string",
      "value": "any",
      "type": "string",
      "category": "string",
      "description": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

## Get setting

Returns a specific setting value.

```
GET /api/settings/:key
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| key | string | Setting key |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 403 | Admin authorization required |
| 404 | Setting not found |

### Response schema

```json
{
  "key": "string",
  "value": "any",
  "type": "string",
  "category": "string",
  "description": "string",
  "updatedAt": "string"
}
```

---

## Update setting

Updates a system setting.

```
PUT /api/settings/:key
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| key | string | Setting key |

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| value | any | Yes | New setting value |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid value |
| 401 | Authentication required |
| 403 | Admin authorization required |
| 404 | Setting not found |

### Response schema

```json
{
  "success": "boolean",
  "key": "string",
  "value": "any",
  "updatedAt": "string"
}
```

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"value": true}' \
  http://localhost:3000/api/settings/autoUnmonitorPreviouslyDownloadedMovies
```

---

## TMDB settings

### Get TMDB settings

```
GET /api/settings/tmdb
```

### Response schema

```json
{
  "apiKey": "string",
  "language": "string",
  "certificationCountry": "string",
  "useSsl": "boolean",
  "cacheEnabled": "boolean",
  "cacheTtl": "integer"
}
```

### Update TMDB settings

```
PUT /api/settings/tmdb
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| apiKey | string | No | TMDB API key |
| language | string | No | Preferred language |
| certificationCountry | string | No | Certification country code |
| useSsl | boolean | No | Use SSL connections |
| cacheEnabled | boolean | No | Enable response caching |
| cacheTtl | integer | No | Cache TTL in seconds |

---

## Filter settings

### Get filter settings

```
GET /api/settings/filters
```

### Response schema

```json
{
  "minimumSeeders": "integer",
  "retention": "integer",
  "rssSyncInterval": "integer",
  "enableCompletedDownloadHandling": "boolean",
  "removeCompletedDownloads": "boolean",
  "removeFailedDownloads": "boolean"
}
```

### Update filter settings

```
PUT /api/settings/filters
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| minimumSeeders | integer | No | Minimum seeders for torrents |
| retention | integer | No | Maximum age in days |
| rssSyncInterval | integer | No | RSS sync interval in minutes |
| enableCompletedDownloadHandling | boolean | No | Auto-process completed downloads |
| removeCompletedDownloads | boolean | No | Remove from client when complete |
| removeFailedDownloads | boolean | No | Remove from client when failed |

---

## External URL settings

### Get external URL

```
GET /api/settings/external-url
```

### Response schema

```json
{
  "externalUrl": "string",
  "basePath": "string",
  "useSsl": "boolean"
}
```

### Update external URL

```
PUT /api/settings/external-url
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| externalUrl | string | No | External access URL |
| basePath | string | No | Base path for reverse proxy |
| useSsl | boolean | No | Use SSL in generated URLs |

---

## API key management

### List API keys

```
GET /api/settings/system/api-keys
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 403 | Admin authorization required |

### Response schema

```json
{
  "keys": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "createdAt": "string",
      "lastUsedAt": "string"
    }
  ]
}
```

### Generate API key

```
POST /api/settings/system/api-keys
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Key name |
| type | string | Yes | Key type (main, streaming) |

### Response schema

```json
{
  "success": "boolean",
  "key": {
    "id": "string",
    "name": "string",
    "type": "string",
    "value": "string",
    "createdAt": "string"
  }
}
```

:::warning
The `value` field is only returned on creation. Save it securely as it cannot be retrieved again.
:::

### Regenerate API key

```
POST /api/settings/system/api-keys/:id/regenerate
```

Invalidates the old key and generates a new one.

### Response schema

```json
{
  "success": "boolean",
  "key": {
    "id": "string",
    "value": "string",
    "updatedAt": "string"
  }
}
```

---

## Log streaming

SSE endpoint for real-time log streaming.

```
GET /api/settings/logs/stream
```

### Response format

Server-Sent Events stream with log entries.

### Event format

```
event: log
data: {"level":"info","message":"...","timestamp":"...","source":"..."}
```

### Log levels

| Level | Description |
|-------|-------------|
| `debug` | Debug information |
| `info` | Informational messages |
| `warn` | Warning messages |
| `error` | Error messages |

---

## Download logs

Downloads the log file.

```
GET /api/settings/logs/download
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success (file download) |
| 401 | Authentication required |
| 403 | Admin authorization required |

---

## Setting categories

| Category | Description |
|----------|-------------|
| `general` | General application settings |
| `media` | Media management settings |
| `download` | Download client settings |
| `indexer` | Indexer settings |
| `notification` | Notification settings |
| `ui` | User interface settings |
| `security` | Security and authentication settings |

---

## See Also

- [Authentication](../authentication) — API authentication
- [Rate Limiting](../rate-limiting) — Rate limit configuration
- [Movies](movies) — Movie library endpoints
- [TV](tv) — TV series endpoints