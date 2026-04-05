---
id: guides
title: How-to guides
description: Task-oriented guides for configuring and using Cinephage
sidebar_position: 2
tags: [guides, how-to, tasks]
keywords: [guides, configuration, setup, tasks]
---

# How-to guides

These guides provide step-by-step instructions for specific tasks. Each guide focuses on solving a particular problem or configuring a specific feature.

## Configuration Guides

Configure Cinephage components:

### Essential Setup

- [Configure Download Clients](configure/download-clients) - Set up qBittorrent, SABnzbd, and others
- [Configure Indexers](configure/indexers) - Add content sources using YAML definitions
- [Set Up Quality Profiles](configure/quality-profiles) - Configure scoring and upgrade behavior
- [Configure Subtitles](configure/subtitles) - Enable subtitle providers and language profiles

### Advanced Features

- [Set Up Live TV](configure/live-tv) - Configure IPTV and streaming sources
- [Configure NZB Streaming](configure/nzb-streaming) - Enable direct usenet streaming
- [Set Up Smart Lists](configure/smart-lists) - Create dynamic content lists

## Usage Guides

Day-to-day operations:

### Content Management

- [Search and Download](use/search-and-download) - Find and acquire content
- [Import Existing Files](use/import-existing-files) - Add your current media library
- [Monitor and Upgrade](use/monitor-and-upgrade) - Manage quality improvements
- [Handle Failed Downloads](use/handle-failed-downloads) - Use blocklist and retry logic
- [Organize Files](use/organize-files) - Use custom naming patterns

### Maintenance

- [Update Cinephage](use/update-cinephage) - Keep software up to date

## Deployment Guides

Production deployment:

### Infrastructure

- [Backup and Restore](deploy/backup-restore) - Protect your data
- [Performance Tuning](deploy/performance-tuning) - Optimize for your hardware
- [Troubleshooting](deploy/troubleshooting) - Solve common issues

## Guide Structure

Each guide includes:

- **Goal** - What you will accomplish
- **Prerequisites** - What you need before starting
- **Time estimate** - How long it takes
- **Step-by-step instructions** - Detailed procedures
- **Troubleshooting** - Common problems and solutions
- **See also** - Related documentation

## Choosing a Guide

### First Time Setup

1. [Configure Download Clients](configure/download-clients)
2. [Configure Indexers](configure/indexers)
3. [Set Up Quality Profiles](configure/quality-profiles)

### Adding Content

1. [Search and Download](use/search-and-download)
2. [Import Existing Files](use/import-existing-files)

### Going to Production

1. [Backup and Restore](deploy/backup-restore)

### Advanced Features

1. [Configure Subtitles](configure/subtitles)
2. [Set Up Live TV](configure/live-tv)
3. [Set Up Smart Lists](configure/smart-lists)

---

Start with the [Download Clients guide](configure/download-clients) if you are setting up Cinephage for the first time.

## See Also

### Getting Started
- [Installation](../getting-started/installation) — Install Cinephage using Docker
- [Initial Setup](../getting-started/initial-setup) — Complete the setup wizard
- [Understanding the Interface](../getting-started/understanding-interface) — Navigate the UI

### Essential Configuration
- [Configure Download Clients](configure/download-clients) — Set up qBittorrent, SABnzbd, etc.
- [Configure Indexers](configure/indexers) — Add content sources
- [Set Up Quality Profiles](configure/quality-profiles) — Configure quality scoring
- [Configure Subtitles](configure/subtitles) — Enable subtitle providers

### Usage Guides
- [Search and Download](use/search-and-download) — Find and acquire content
- [Monitor and Upgrade](use/monitor-and-upgrade) — Automatic quality improvements
- [Import Existing Files](use/import-existing-files) — Add your current library
- [Handle Failed Downloads](use/handle-failed-downloads) — Use blocklist and retry logic

### Technical Understanding
- [Architecture Overview](../explanation/architecture) — System architecture
- [Workers and Tasks](../explanation/workers-and-tasks) — Background processing
- [Quality Scoring](../explanation/quality-scoring) — How quality is calculated

### Reference
- [Environment Variables](../reference/configuration/environment-variables) — Configuration options
- [Settings Explained](../reference/configuration/settings-explained) — UI settings reference
