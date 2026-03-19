---
title: API Endpoints
description: Complete reference for all Cinephage API endpoints
sidebar_position: 1
date: 2025-03-19
tags: [api, endpoints, reference, rest]
---

# API Endpoints

This reference documents all available Cinephage API endpoints organized by category.

## Authentication

See [Authentication](authentication) for auth requirements and API key usage.

| Symbol | Meaning                |
| ------ | ---------------------- |
| 🔓     | Public (no auth)       |
| 🔐     | Authenticated required |
| 👑     | Admin required         |

## System Endpoints

| Method | Endpoint              | Auth | Description                    |
| ------ | --------------------- | ---- | ------------------------------ |
| GET    | `/api/health`         | 🔓   | Health check (DB, services)    |
| GET    | `/api/ready`          | 🔓   | Readiness check for orchestration |
| GET    | `/api/system/status`  | 🔓   | Background services status     |

## Activity

| Method | Endpoint                  | Auth | Description                    |
| ------ | ------------------------- | ---- | ------------------------------ |
| GET    | `/api/activity`           | 🔓   | Activity with filtering        |
| DELETE | `/api/activity`           | 👑   | Bulk delete history            |
| GET    | `/api/activity/settings`  | 🔓   | Activity settings              |
| PUT    | `/api/activity/settings`  | 👑   | Update activity settings       |
| GET    | `/api/activity/stream`    | 🔓   | SSE stream for real-time updates |

## Library

### Movies

| Method | Endpoint                          | Auth | Description                    |
| ------ | --------------------------------- | ---- | ------------------------------ |
| GET    | `/api/library/movies`             | 🔐   | List all movies                |
| POST   | `/api/library/movies`             | 🔐   | Add movie to library           |
| GET    | `/api/library/movies/[id]`        | 🔐   | Get movie details              |
| PUT    | `/api/library/movies/[id]`        | 🔐   | Update movie                   |
| DELETE | `/api/library/movies/[id]`        | 🔐   | Remove movie                   |
| POST   | `/api/library/movies/[id]/refresh`| 🔐   | Refresh movie metadata         |
| POST   | `/api/library/movies/[id]/auto-search` | 🔐 | Trigger auto search        |
| GET    | `/api/library/movies/[id]/stream` | 🔓   | SSE for movie updates          |
| PUT    | `/api/library/movies/bulk`        | 🔐   | Bulk edit movies               |

### Series & Episodes

| Method | Endpoint                          | Auth | Description                    |
| ------ | --------------------------------- | ---- | ------------------------------ |
| GET    | `/api/library/series`             | 🔐   | List all series                |
| POST   | `/api/library/series`             | 🔐   | Add series to library          |
| GET    | `/api/library/series/[id]`        | 🔐   | Get series details             |
| PUT    | `/api/library/series/[id]`        | 🔐   | Update series                  |
| DELETE | `/api/library/series/[id]`        | 🔐   | Remove series                  |
| POST   | `/api/library/series/[id]/refresh`| 🔐   | Refresh series metadata        |
| GET    | `/api/library/series/[id]/stream` | 🔓   | SSE for series updates         |
| GET    | `/api/library/episodes/[id]`      | 🔐   | Get episode details            |
| PUT    | `/api/library/episodes/[id]`      | 🔐   | Update episode                 |

### Library Operations

| Method | Endpoint                          | Auth | Description                    |
| ------ | --------------------------------- | ---- | ------------------------------ |
| POST   | `/api/library/scan`               | 👑   | Trigger library scan           |
| GET    | `/api/library/scan/status`        | 🔓   | Get scan status                |
| GET    | `/api/library/status`             | 🔓   | Library status summary         |
| GET    | `/api/library/unmatched`          | 🔐   | List unmatched files           |
| POST   | `/api/library/unmatched/match`    | 🔐   | Manual match                   |
| POST   | `/api/library/import/detect`      | 🔐   | Detect import candidates       |
| POST   | `/api/library/import/execute`     | 🔐   | Execute import                 |

## Search & Download

| Method | Endpoint              | Auth | Description                    |
| ------ | --------------------- | ---- | ------------------------------ |
| GET    | `/api/search`         | 🔐   | Search releases                |
| POST   | `/api/download/grab`  | 🔐   | Grab release for download      |

## Queue

| Method | Endpoint              | Auth | Description                    |
| ------ | --------------------- | ---- | ------------------------------ |
| GET    | `/api/queue`          | 🔓   | List download queue            |
| GET    | `/api/queue/[id]`     | 🔓   | Get queue item                 |
| DELETE | `/api/queue/[id]`     | 👑   | Remove from queue              |
| POST   | `/api/queue/[id]/retry`| 👑  | Retry failed item              |
| POST   | `/api/queue/cleanup`  | 👑   | Cleanup queue                  |
| GET    | `/api/queue/events`   | 🔓   | SSE for queue events           |

## Indexers

| Method | Endpoint                      | Auth | Description                    |
| ------ | ----------------------------- | ---- | ------------------------------ |
| GET    | `/api/indexers`               | 🔓   | List all indexers              |
| POST   | `/api/indexers`               | 👑   | Create indexer                 |
| GET    | `/api/indexers/[id]`          | 🔓   | Get indexer                    |
| PUT    | `/api/indexers/[id]`          | 👑   | Update indexer                 |
| DELETE | `/api/indexers/[id]`          | 👑   | Delete indexer                 |
| GET    | `/api/indexers/definitions`   | 🔓   | List indexer definitions       |
| POST   | `/api/indexers/test`          | 👑   | Test indexer connection        |

## Download Clients

| Method | Endpoint                          | Auth | Description                |
| ------ | --------------------------------- | ---- | -------------------------- |
| GET    | `/api/download-clients`           | 🔓   | List all clients           |
| POST   | `/api/download-clients`           | 👑   | Create client              |
| GET    | `/api/download-clients/[id]`      | 🔓   | Get client                 |
| PUT    | `/api/download-clients/[id]`      | 👑   | Update client              |
| DELETE | `/api/download-clients/[id]`      | 👑   | Delete client              |
| POST   | `/api/download-clients/[id]/test` | 👑   | Test client connection     |

## Live TV

### Accounts

| Method | Endpoint                        | Auth | Description                |
| ------ | ------------------------------- | ---- | -------------------------- |
| GET    | `/api/livetv/accounts`          | 🔓   | List LiveTV accounts       |
| POST   | `/api/livetv/accounts`          | 👑   | Create account             |
| GET    | `/api/livetv/accounts/[id]`     | 🔓   | Get account                |
| PUT    | `/api/livetv/accounts/[id]`     | 👑   | Update account             |
| DELETE | `/api/livetv/accounts/[id]`     | 👑   | Delete account             |
| POST   | `/api/livetv/accounts/[id]/test`| 👑   | Test account connection    |
| GET    | `/api/livetv/accounts/stream`   | 🔓   | SSE for account updates    |

### Channels & EPG

| Method | Endpoint                        | Auth | Description                |
| ------ | ------------------------------- | ---- | -------------------------- |
| GET    | `/api/livetv/channels`          | 🔓   | List channels              |
| POST   | `/api/livetv/channels/sync`     | 👑   | Trigger channel sync       |
| GET    | `/api/livetv/channels/stream`   | 🔓   | SSE for channel updates    |
| GET    | `/api/livetv/epg.xml`           | 🔓   | XMLTV EPG feed             |
| GET    | `/api/livetv/epg/guide`         | 🔓   | Full EPG guide             |
| GET    | `/api/livetv/epg/status`        | 🔓   | EPG sync status            |
| POST   | `/api/livetv/epg/sync`          | 👑   | Trigger EPG sync           |

### Lineup & Playlist

| Method | Endpoint                        | Auth | Description                |
| ------ | ------------------------------- | ---- | -------------------------- |
| GET    | `/api/livetv/lineup`            | 🔓   | List lineup items          |
| POST   | `/api/livetv/lineup/reorder`    | 👑   | Reorder lineup             |
| GET    | `/api/livetv/playlist.m3u`      | 🔓   | M3U playlist export        |
| GET    | `/api/livetv/stream/[lineupId]` | 🔓   | Stream channel             |

### Portals (Stalker)

| Method | Endpoint                              | Auth | Description              |
| ------ | ------------------------------------- | ---- | ------------------------ |
| GET    | `/api/livetv/portals`                 | 🔓   | List portals             |
| POST   | `/api/livetv/portals`                 | 👑   | Create portal            |
| POST   | `/api/livetv/portals/[id]/scan`       | 👑   | Trigger portal scan      |
| GET    | `/api/livetv/portals/[id]/scan/results`| 🔓  | Scan results             |
| POST   | `/api/livetv/portals/detect`          | 👑   | Detect portal type       |

## Subtitles

### Providers

| Method | Endpoint                          | Auth | Description                |
| ------ | --------------------------------- | ---- | -------------------------- |
| GET    | `/api/subtitles/providers`        | 🔓   | List subtitle providers    |
| POST   | `/api/subtitles/providers`        | 🔐   | Create provider            |
| GET    | `/api/subtitles/providers/[id]`   | 🔓   | Get provider               |
| PUT    | `/api/subtitles/providers/[id]`   | 👑   | Update provider            |
| DELETE | `/api/subtitles/providers/[id]`   | 👑   | Delete provider            |
| POST   | `/api/subtitles/providers/test`   | 👑   | Test provider              |
| POST   | `/api/subtitles/providers/reorder`| 👑   | Reorder providers          |

### Subtitles

| Method | Endpoint                          | Auth | Description                |
| ------ | --------------------------------- | ---- | -------------------------- |
| GET    | `/api/subtitles/media`            | 🔓   | Get media subtitles        |
| POST   | `/api/subtitles/search`           | 👑   | Search subtitles           |
| POST   | `/api/subtitles/download`         | 👑   | Download subtitle          |
| POST   | `/api/subtitles/sync`             | 👑   | Sync subtitles             |
| POST   | `/api/subtitles/sync/bulk`        | 👑   | Bulk sync subtitles        |
| DELETE | `/api/subtitles/[id]`             | 👑   | Delete subtitle            |

### Language Profiles

| Method | Endpoint                              | Auth | Description              |
| ------ | ------------------------------------- | ---- | ------------------------ |
| GET    | `/api/subtitles/language-profiles`    | 🔓   | List language profiles   |
| POST   | `/api/subtitles/language-profiles`    | 👑   | Create profile           |
| GET    | `/api/subtitles/language-profiles/[id]`| 🔓  | Get profile              |
| PUT    | `/api/subtitles/language-profiles/[id]`| 👑  | Update profile           |
| DELETE | `/api/subtitles/language-profiles/[id]`| 👑  | Delete profile           |

## Streaming

| Method | Endpoint                              | Auth | Description              |
| ------ | ------------------------------------- | ---- | ------------------------ |
| GET    | `/api/streaming/proxy`                | 🔓   | Proxy stream             |
| GET    | `/api/streaming/resolve/movie/[tmdbId]`| 🔓  | Resolve movie stream     |
| GET    | `/api/streaming/resolve/tv/[tmdbId]/[season]/[episode]`| 🔓 | Resolve TV stream |
| GET    | `/api/streaming/status`               | 🔓   | Streaming status         |
| POST   | `/api/streaming/verify`               | 🔓   | Verify stream URL        |

### Usenet Streaming

| Method | Endpoint                          | Auth | Description                |
| ------ | --------------------------------- | ---- | -------------------------- |
| GET    | `/api/streaming/usenet/[mountId]/[fileIndex]`| 🔓 | Stream usenet file |
| POST   | `/api/streaming/usenet/[mountId]/check`| 🔓 | Check usenet mount     |
| GET    | `/api/streaming/usenet/cache`     | 🔓   | Usenet cache status        |

## Smart Lists

| Method | Endpoint                      | Auth | Description                |
| ------ | ----------------------------- | ---- | -------------------------- |
| GET    | `/api/smartlists`             | 🔓   | List smart lists           |
| POST   | `/api/smartlists`             | 🔐   | Create smart list          |
| GET    | `/api/smartlists/[id]`        | 🔓   | Get smart list             |
| PUT    | `/api/smartlists/[id]`        | 🔐   | Update smart list          |
| DELETE | `/api/smartlists/[id]`        | 🔐   | Delete smart list          |
| GET    | `/api/smartlists/[id]/items`  | 🔓   | Get list items             |
| POST   | `/api/smartlists/[id]/refresh`| 🔐   | Refresh list               |
| POST   | `/api/smartlists/refresh-all` | 🔐   | Refresh all lists          |

## Tasks

| Method | Endpoint                      | Auth | Description                |
| ------ | ----------------------------- | ---- | -------------------------- |
| GET    | `/api/tasks`                  | 🔓   | List all tasks             |
| GET    | `/api/tasks/stream`           | 🔓   | SSE for task updates       |
| POST   | `/api/tasks/[taskId]/run`     | 👑   | Run task now               |
| POST   | `/api/tasks/[taskId]/cancel`  | 👑   | Cancel task                |
| PUT    | `/api/tasks/[taskId]/enabled` | 👑   | Toggle task enabled        |
| PUT    | `/api/tasks/[taskId]/interval`| 👑   | Update task interval       |
| GET    | `/api/tasks/[taskId]/history` | 🔓   | Task history               |

## Monitoring

| Method | Endpoint                          | Auth | Description              |
| ------ | --------------------------------- | ---- | ------------------------ |
| GET    | `/api/monitoring/status`          | 🔓   | Monitoring status        |
| GET    | `/api/monitoring/settings`        | 🔓   | Monitoring settings      |
| PUT    | `/api/monitoring/settings`        | 👑   | Update settings          |
| POST   | `/api/monitoring/search/missing`  | 👑   | Search missing           |
| POST   | `/api/monitoring/search/upgrade`  | 👑   | Search upgrades          |

## Settings

| Method | Endpoint                          | Auth | Description              |
| ------ | --------------------------------- | ---- | ------------------------ |
| GET    | `/api/settings/tmdb`              | 🔓   | Get TMDB settings        |
| PUT    | `/api/settings/tmdb`              | 👑   | Update TMDB settings     |
| GET    | `/api/settings/filters`           | 🔓   | Get filter settings      |
| PUT    | `/api/settings/filters`           | 👑   | Update filter settings   |
| GET    | `/api/settings/external-url`      | 🔓   | Get external URL         |
| PUT    | `/api/settings/external-url`      | 👑   | Update external URL      |
| GET    | `/api/settings/logs/stream`       | 👑   | SSE for log stream       |
| GET    | `/api/settings/logs/download`     | 👑   | Download logs            |

### API Keys

| Method | Endpoint                              | Auth | Description            |
| ------ | ------------------------------------- | ---- | ---------------------- |
| GET    | `/api/settings/system/api-keys`       | 👑   | List API keys          |
| POST   | `/api/settings/system/api-keys`       | 👑   | Generate API keys      |
| POST   | `/api/settings/system/api-keys/[id]/regenerate`| 👑 | Regenerate key |

## Root Folders

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/root-folders`       | 🔓   | List root folders        |
| POST   | `/api/root-folders`       | 👑   | Create root folder       |
| GET    | `/api/root-folders/[id]`  | 🔓   | Get folder               |
| PUT    | `/api/root-folders/[id]`  | 👑   | Update folder            |
| DELETE | `/api/root-folders/[id]`  | 👑   | Delete folder            |
| POST   | `/api/root-folders/validate`| 👑  | Validate folder path     |

## Quality & Scoring

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/quality-presets`    | 🔓   | List quality presets     |
| GET    | `/api/scoring-profiles`   | 🔓   | List scoring profiles    |
| POST   | `/api/scoring-profiles`   | 👑   | Create scoring profile   |

### Custom Formats

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/custom-formats`     | 🔓   | List custom formats      |
| POST   | `/api/custom-formats`     | 👑   | Create custom format     |
| PUT    | `/api/custom-formats`     | 👑   | Update custom format     |
| DELETE | `/api/custom-formats`     | 👑   | Delete custom format     |

## Naming

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/naming`             | 🔓   | Get naming config        |
| PUT    | `/api/naming`             | 👑   | Update naming config     |
| GET    | `/api/naming/presets`     | 🔓   | List naming presets      |
| GET    | `/api/naming/tokens`      | 🔓   | List naming tokens       |
| POST   | `/api/naming/preview`     | 🔓   | Preview naming           |

### Rename Operations

| Method | Endpoint                      | Auth | Description            |
| ------ | ----------------------------- | ---- | ---------------------- |
| POST   | `/api/rename/preview`         | 🔓   | Preview renames        |
| POST   | `/api/rename/execute`         | 👑   | Execute renames        |

## Notifications (Media Servers)

| Method | Endpoint                              | Auth | Description            |
| ------ | ------------------------------------- | ---- | ---------------------- |
| GET    | `/api/notifications/mediabrowser`     | 🔓   | List media servers     |
| POST   | `/api/notifications/mediabrowser`     | 👑   | Create server          |
| PUT    | `/api/notifications/mediabrowser/[id]`| 👑   | Update server          |
| DELETE | `/api/notifications/mediabrowser/[id]`| 👑   | Delete server          |
| POST   | `/api/notifications/mediabrowser/[id]/test`| 👑 | Test connection    |
| POST   | `/api/notifications/mediabrowser/trigger`| 👑 | Manual refresh     |

## Usenet (NNTP)

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/usenet/servers`     | 🔓   | List NNTP servers        |
| POST   | `/api/usenet/servers`     | 👑   | Create NNTP server       |
| GET    | `/api/usenet/servers/[id]`| 🔓   | Get server               |
| PUT    | `/api/usenet/servers/[id]`| 👑   | Update server            |
| DELETE | `/api/usenet/servers/[id]`| 👑   | Delete server            |
| POST   | `/api/usenet/servers/[id]/test`| 👑 | Test server connection |
| POST   | `/api/usenet/servers/sync`| 👑   | Sync server connections  |

## Workers

| Method | Endpoint              | Auth | Description              |
| ------ | --------------------- | ---- | ------------------------ |
| GET    | `/api/workers`        | 🔓   | List workers             |
| DELETE | `/api/workers`        | 🔓   | Clear completed workers  |
| GET    | `/api/workers/[id]`   | 🔓   | Get worker details       |
| DELETE | `/api/workers/[id]`   | 🔓   | Cancel worker            |
| GET    | `/api/workers/config` | 🔓   | Get worker config        |

## Filesystem

| Method | Endpoint              | Auth | Description              |
| ------ | --------------------- | ---- | ------------------------ |
| GET    | `/api/filesystem/browse`| 🔐 | Browse filesystem paths |

## Discover (TMDB)

| Method | Endpoint          | Auth | Description              |
| ------ | ----------------- | ---- | ------------------------ |
| GET    | `/api/discover`   | 🔓   | Discover movies/TV       |
| GET    | `/api/discover/search`| 🔓 | Search TMDB           |

## Dashboard

| Method | Endpoint              | Auth | Description              |
| ------ | --------------------- | ---- | ------------------------ |
| GET    | `/api/dashboard/stream`| 🔓  | SSE for dashboard updates |

## Captcha Solver

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| GET    | `/api/captcha-solver`     | 👑   | Get solver settings      |
| PUT    | `/api/captcha-solver`     | 👑   | Update solver settings   |
| GET    | `/api/captcha-solver/health`| 👑 | Health status          |
| DELETE | `/api/captcha-solver/health`| 👑 | Reset stats            |
| POST   | `/api/captcha-solver/test`| 👑   | Test captcha solving     |

## Rate Limits

| Method | Endpoint          | Auth | Description              |
| ------ | ----------------- | ---- | ------------------------ |
| GET    | `/api/rate-limits`| 🔓   | Get rate limit status    |
| DELETE | `/api/rate-limits`| 🔓   | Clear all rate limiters  |

## Logos

| Method | Endpoint                      | Auth | Description            |
| ------ | ----------------------------- | ---- | ---------------------- |
| GET    | `/api/logos`                  | 🔓   | List logos             |
| POST   | `/api/logos/download`         | 👑   | Trigger logo download  |
| GET    | `/api/logos/status`           | 🔓   | Logo library status    |

## Summary

| Category        | Endpoints |
| --------------- | --------- |
| System          | 3         |
| Activity        | 5         |
| Library         | 25+       |
| Search/Download | 2         |
| Queue           | 6         |
| Indexers        | 7         |
| Download Clients| 6         |
| Live TV         | 30+       |
| Subtitles       | 20+       |
| Streaming       | 10+       |
| Smart Lists     | 9         |
| Tasks           | 7         |
| Monitoring      | 5         |
| Settings        | 12+       |
| Root Folders    | 6         |
| Quality/Scoring | 6         |
| Naming          | 8         |
| Notifications   | 6         |
| Usenet          | 7         |
| Workers         | 5         |
| **Total**       | **200+**  |

## See Also

- [Authentication](authentication) — Auth methods and API keys
- [Rate Limiting](rate-limiting) — Rate limit configuration
- [Architecture](../../explanation/architecture) — System design
