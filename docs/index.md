---
title: Cinephage documentation
description: Complete documentation for Cinephage, the unified self-hosted media management platform
slug: /
tags: [overview, getting-started]
keywords: [cinephage, documentation, media management, self-hosted]
---

# Cinephage Documentation

Welcome to the Cinephage documentation. Cinephage is a self-hosted media management platform that unifies movies, TV shows, live TV, and streaming into a single modern application.

## What Cinephage Does

Instead of running multiple separate services that do not talk to each other, Cinephage provides one cohesive platform:

- **One database** - All your movies, series, subtitles, and configurations live together
- **One interface** - Browse, search, monitor, and manage everything from a single UI
- **One configuration** - Set up indexers, download clients, and preferences once
- **One container** - Deploy with Docker and start managing immediately

## Core Capabilities

Cinephage brings together comprehensive media management functionality:

| Feature          | Description                                    |
| ---------------- | ---------------------------------------------- |
| Movies           | Built-in library with TMDB integration         |
| TV Series        | Episode tracking and monitoring                |
| Indexers         | YAML-based indexer definitions                 |
| Subtitles        | 11 subtitle providers with auto-sync           |
| Content Discovery| Smart lists and TMDB discovery                 |
| Cloudflare Bypass| Built-in Camoufox solver                       |

## Key Features

### Core Media Management

- **Library scanning** - Automatic file detection with TMDB matching
- **Quality scoring** - 50+ scoring factors for intelligent decisions
- **Custom formats** - User-defined rules for release selection
- **Multi-protocol indexers** - Unified torrent, usenet, and streaming support

### Advanced Streaming

- **.strm file generation** - Stream without downloading
- **NZB streaming** - Direct usenet streaming with on-the-fly extraction
- **Live TV** - Full IPTV management with EPG and channel lineups
- **Provider circuit breakers** - Automatic failover for streaming sources

### Subtitle Management

- **11 subtitle providers** - OpenSubtitles, Addic7ed, SubDL, and more
- **Language profiles** - Multi-language preferences with upgrade support
- **Auto-sync** - Built-in synchronization using the alass algorithm
- **Score-based selection** - Match by hash, filename, and metadata

### Smart Automation

- **Smart lists** - Dynamic TMDB queries with auto-add to library
- **7 monitoring tasks** - Missing content, upgrades, new episodes, and more
- **Worker system** - Background tasks with progress tracking
- **Notifications** - Jellyfin/Emby integration for library updates

## Quick Start

New to Cinephage? Start here:

1. **[Installation](/docs/getting-started/installation)** - Get Cinephage running with Docker
2. **[Initial Setup](/docs/getting-started/initial-setup)** - Configure TMDB API, download clients, and root folders
3. **[Adding Media](/docs/getting-started/adding-media)** - Add your first movie or TV show

## Documentation Structure

This documentation follows the Diátaxis framework with four distinct types of content:

### Tutorials

Step-by-step lessons for beginners. Hands-on learning with specific outcomes.

- [Installation](/docs/getting-started/installation)
- [Initial Setup](/docs/getting-started/initial-setup)
- [Adding Your First Movie](/docs/getting-started/adding-media)

### How-To Guides

Practical steps to solve specific problems. Task-oriented documentation.

- [Configure Download Clients](/docs/guides/configure/download-clients)
- [Set Up Quality Profiles](/docs/guides/configure/quality-profiles)
- [Configure Subtitles](/docs/guides/configure/subtitles)
- [Troubleshooting](/docs/guides/deploy/troubleshooting)

### Reference

Technical descriptions and comprehensive information.

- [Environment Variables](/docs/reference/configuration/environment-variables)
- [Database Schema](/docs/reference/database/schema-overview)
- [YAML Indexer Format](/docs/reference/yaml/indexer-definitions)

### Explanation

Background, concepts, and architecture decisions.

- [Architecture Overview](/docs/explanation/architecture)
- [Quality Scoring System](/docs/explanation/quality-scoring)
- [Workers and Tasks](/docs/explanation/workers-and-tasks)

## Getting Help

- **Discord** - [Join our community](https://discord.gg/scGCBTSWEt) for chat support
- **GitHub Issues** - [Report bugs](https://github.com/MoldyTaint/Cinephage/issues) or request features
- **Troubleshooting** - See our [troubleshooting guide](/docs/guides/deploy/troubleshooting) for common issues

## Contributing

Cinephage is open source under the GPL-3.0 license. See our [GitHub repository](https://github.com/MoldyTaint/Cinephage) to contribute code, report issues, or suggest improvements.

---

Ready to get started? Head to the [Installation guide](/docs/getting-started/installation).
