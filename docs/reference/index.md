---
id: reference
title: Reference
description: Technical reference documentation for Cinephage
sidebar_position: 3
tags: [reference, api, configuration, database]
keywords: [reference, api, configuration, database]
---

# Reference documentation

This section contains comprehensive technical reference information for Cinephage.

## Configuration Reference

Complete configuration options:

- [Environment Variables](configuration/environment-variables) - All environment variables with descriptions and defaults
- [Settings Explained](configuration/settings-explained) - Detailed explanation of each setting

## Database Reference

Database schema and structure:

- [Schema Overview](database/schema-overview) - Database tables and relationships
- [Table Reference](database/table-reference) - Detailed table schemas

## YAML Reference

Configuration file formats:

- [Indexer Definitions](yaml/indexer-definitions) - YAML format for custom indexers
- [Naming Tokens](yaml/naming-tokens) - Available tokens for file naming

## API Reference

Integration endpoints:

- [Endpoints Overview](api/endpoints-overview) - Available API endpoints
- [Authentication](api/authentication) - API key and session management
- [Rate Limiting](api/rate-limiting) - API usage limits

## Quick Reference Tables

### Common Environment Variables

| Variable          | Description         | Default                 |
| ----------------- | ------------------- | ----------------------- |
| `HOST`            | Server bind address | `0.0.0.0`               |
| `PORT`            | Server port         | `3000`                  |
| `ORIGIN`          | Trusted origin URL  | `http://localhost:3000` |
| `BETTER_AUTH_URL` | Auth callback URL   | `http://localhost:3000` |
| `TZ`              | Timezone            | `UTC`                   |
| `LOG_LEVEL`       | Logging level       | `info`                  |

### Supported Video Formats

| Extension | Description            |
| --------- | ---------------------- |
| `.mkv`    | Matroska Video         |
| `.mp4`    | MPEG-4 Part 14         |
| `.avi`    | Audio Video Interleave |
| `.m4v`    | MPEG-4 Video           |
| `.mov`    | QuickTime Movie        |
| `.wmv`    | Windows Media Video    |
| `.webm`   | WebM Video             |

### Supported Subtitle Formats

| Extension | Description               |
| --------- | ------------------------- |
| `.srt`    | SubRip Subtitle           |
| `.ass`    | Advanced SubStation Alpha |
| `.ssa`    | SubStation Alpha          |
| `.vtt`    | WebVTT                    |
| `.sub`    | MicroDVD/SubViewer        |

### Quality Presets

| Profile  | Target Quality | Cutoff            | Best For        |
| -------- | -------------- | ----------------- | --------------- |
| Quality  | 4K HDR         | 2160p BluRay      | Maximum quality |
| Balanced | 1080p          | 1080p BluRay      | Most users      |
| Compact  | 720p           | 720p WEB-DL       | Limited storage |
| Streamer | 1080p HEVC     | 1080p HEVC WEB-DL | Streaming       |

---

Use the navigation to explore detailed reference documentation for each topic.

## See Also

### Getting Started
- [Installation](../getting-started/installation) — Install Cinephage using Docker
- [Initial Setup](../getting-started/initial-setup) — Complete the setup wizard
- [Adding Media](../getting-started/adding-media) — Add your first content

### How-To Guides
- [Configure Download Clients](../guides/configure/download-clients) — Set up download clients
- [Configure Indexers](../guides/configure/indexers) — Add content sources
- [Set Up Quality Profiles](../guides/configure/quality-profiles) — Configure quality scoring

### Configuration Reference
- [Environment Variables](./configuration/environment-variables) — All environment variables
- [Settings Explained](./configuration/settings-explained) — Detailed UI settings reference
- [Indexer Definitions](./yaml/indexer-definitions) — YAML format for custom indexers
- [Naming Tokens](./yaml/naming-tokens) — Available tokens for file naming

### Technical Understanding
- [Architecture Overview](../explanation/architecture) — System architecture
- [Workers and Tasks](../explanation/workers-and-tasks) — Background processing
- [Quality Scoring](../explanation/quality-scoring) — How quality is calculated

### Database
- [Schema Overview](./database/schema-overview) — Database tables and relationships
- [Table Reference](./database/table-reference) — Detailed table schemas
