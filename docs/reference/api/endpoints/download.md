---
id: api-download
title: Download queue
description: API endpoints for managing the download queue
sidebar_position: 4
tags: [api, download, queue, torrent, usenet, endpoints, reference]
keywords: [api, download, queue, torrent, usenet, endpoints]
---

# Download queue

Endpoints for viewing and managing the download queue.

## Authentication

Most queue endpoints are publicly accessible for viewing. Admin authorization is required for modifications.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/queue` | Public |
| GET `/api/queue/:id` | Public |
| DELETE `/api/queue/:id` | Admin |
| POST `/api/queue/:id/retry` | Admin |
| POST `/api/queue/cleanup` | Admin |
| GET `/api/queue/events` | Public |

---

## List queue

Returns the current download queue with all active and pending items.

```
GET /api/queue
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| status | string | No | Filter by status |
| movieId | string | No | Filter by movie ID |
| seriesId | string | No | Filter by series ID |

### Status filter values

| Status | Description |
|--------|-------------|
| `downloading` | Currently downloading |
| `queued` | Waiting to download |
| `completed` | Download finished |
| `failed` | Download failed |
| `warning` | Download with warnings |
| `paused` | Paused download |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required (if not public) |

### Response schema

```json
{
  "items": [
    {
      "id": "string",
      "downloadId": "string",
      "title": "string",
      "status": "string",
      "trackedDownloadStatus": "string",
      "trackedDownloadState": "string",
      "protocol": "string",
      "downloadClient": "string",
      "downloadClientId": "string",
      "indexer": "string",
      "outputPath": "string",
      "size": "integer",
      "sizeleft": "integer",
      "timeleft": "string",
      "estimatedCompletionTime": "string",
      "statusMessages": [
        {
          "title": "string",
          "messages": ["string"]
        }
      ],
      "errorMessage": "string",
      "episodeIds": ["string"],
      "movieId": "string",
      "seriesId": "string",
      "added": "string",
      "started": "string",
      "ended": "string",
      "quality": "string",
      "qualityScore": "integer"
    }
  ],
  "totalRecords": "integer",
  "page": "integer",
  "pageSize": "integer"
}
```

### Download status values

| Status | Description |
|--------|-------------|
| `downloading` | Active download in progress |
| `paused` | Download is paused |
| `queued` | Waiting in download client queue |
| `completed` | Finished successfully |
| `failed` | Download failed |
| `warning` | Completed with warnings |

### Tracked download states

| State | Description |
|-------|-------------|
| `downloading` | Currently downloading |
| `importPending` | Download complete, waiting for import |
| `importing` | Currently importing to library |
| `imported` | Successfully imported |
| `failedPending` | Failed, waiting for retry |
| `failed` | Failed and will not retry |
| `ignored` | Ignored by user |

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/queue?page=1&limit=10&status=downloading"
```

### Example response

```json
{
  "items": [
    {
      "id": "q_550e8400-e29b-41d4-a716-446655440021",
      "downloadId": "dl_550e8400-e29b-41d4-a716-446655440020",
      "title": "Inception.2010.1080p.BluRay.x264-Group",
      "status": "downloading",
      "trackedDownloadStatus": "ok",
      "trackedDownloadState": "downloading",
      "protocol": "torrent",
      "downloadClient": "qBittorrent",
      "downloadClientId": "c10e8400-e29b-41d4-a716-446655440030",
      "indexer": "Indexer1",
      "outputPath": "/downloads/movies/Inception.2010.1080p.BluRay.x264-Group",
      "size": 10485760000,
      "sizeleft": 5242880000,
      "timeleft": "00:45:00",
      "estimatedCompletionTime": "2024-01-15T11:15:00Z",
      "statusMessages": [],
      "errorMessage": null,
      "movieId": "550e8400-e29b-41d4-a716-446655440000",
      "seriesId": null,
      "added": "2024-01-15T10:30:00Z",
      "started": "2024-01-15T10:30:05Z",
      "ended": null,
      "quality": "Bluray-1080p",
      "qualityScore": 100
    }
  ],
  "totalRecords": 1,
  "page": 1,
  "pageSize": 10
}
```

---

## Get queue item

Returns details for a specific queue item.

```
GET /api/queue/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Queue item ID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 404 | Queue item not found |

### Response schema

Same as individual items in the list queue response.

---

## Remove from queue

Removes a download from the queue.

```
DELETE /api/queue/:id
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Queue item ID |

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| removeFromClient | boolean | No | Also remove from download client (default: true) |
| blocklist | boolean | No | Add to blocklist (default: false) |

### Response codes

| Code | Description |
|------|-------------|
| 204 | Deleted successfully |
| 401 | Authentication required |
| 403 | Admin authorization required |
| 404 | Queue item not found |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/queue/q_550e8400-e29b-41d4-a716-446655440021?removeFromClient=true&blocklist=true"
```

---

## Retry failed item

Retries a failed download.

```
POST /api/queue/:id/retry
```

### Path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Queue item ID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Retry initiated |
| 401 | Authentication required |
| 403 | Admin authorization required |
| 404 | Queue item not found |
| 409 | Item not in failed state |

### Response schema

```json
{
  "success": "boolean",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "x-api-key: cinephage_your_key_here" \
  http://localhost:3000/api/queue/q_550e8400-e29b-41d4-a716-446655440021/retry
```

---

## Cleanup queue

Removes completed and failed items from the queue.

```
POST /api/queue/cleanup
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| removeCompleted | boolean | No | Remove completed items (default: true) |
| removeFailed | boolean | No | Remove failed items (default: true) |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Cleanup completed |
| 401 | Authentication required |
| 403 | Admin authorization required |

### Response schema

```json
{
  "success": "boolean",
  "removedCount": "integer",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"removeCompleted": true, "removeFailed": true}' \
  http://localhost:3000/api/queue/cleanup
```

---

## Queue events

SSE endpoint for real-time queue updates.

```
GET /api/queue/events
```

### Response format

Server-Sent Events stream with JSON payloads.

### Event types

| Event | Description |
|-------|-------------|
| `queueItemAdded` | New item added to queue |
| `queueItemUpdated` | Queue item status changed |
| `queueItemRemoved` | Item removed from queue |
| `queueCompleted` | Download completed |
| `queueFailed` | Download failed |

### Example event

```
event: queueItemUpdated
data: {"id":"q_550e8400-e29b-41d4-a716-446655440021","status":"downloading","progress":50}
```

### Example request

```javascript
const eventSource = new EventSource('http://localhost:3000/api/queue/events');

eventSource.addEventListener('queueItemUpdated', (event) => {
  const data = JSON.parse(event.data);
  console.log('Queue item updated:', data);
});
```

---

## Download protocols

### Torrent

Torrent downloads use magnet links or .torrent files.

| Field | Description |
|-------|-------------|
| `protocol` | `torrent` |
| `downloadClient` | qBittorrent, Transmission, etc. |
| `size` | Total size in bytes |
| `sizeleft` | Remaining size in bytes |
| `seeders` | Number of seeders |
| `leechers` | Number of leechers |

### Usenet

Usenet downloads use NZB files.

| Field | Description |
|-------|-------------|
| `protocol` | `usenet` |
| `downloadClient` | SABnzbd, NZBGet, etc. |
| `size` | Total size in bytes |
| `sizeleft` | Remaining size in bytes |

---

## Download client operations

### Test connection

Tests the connection to a download client.

```
POST /api/download-clients/:id/test
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Connection successful |
| 400 | Connection failed |
| 401 | Authentication required |
| 403 | Admin authorization required |

---

## See Also

- [Search](search) — Search and grab endpoints
- [Movies](movies) — Movie library endpoints
- [TV](tv) — TV series and episode endpoints