---
title: Frequently Asked Questions
description: Common questions and answers about installing, configuring, and using Cinephage
sidebar_position: 1
date: 2025-03-16
tags: [faq, questions, support, troubleshooting, help]
---

# Frequently Asked Questions

This page answers common questions about Cinephage, organized by category.

## General Questions

### What is Cinephage?

Cinephage is a unified, self-hosted media management platform that handles movies, TV shows, live TV, and streaming in one modern web interface. It combines content discovery, searching, downloading, and subtitle management into a single application with a single database.

### What can Cinephage do?

Cinephage provides comprehensive media management capabilities:

- **Movies** — Library management, monitoring, quality profiles, automatic downloads
- **TV Shows** — Episode tracking, season packs, automatic episode searches
- **Indexer Management** — YAML-based indexer definitions, built-in and custom support
- **Subtitles** — 14+ subtitle providers with automatic syncing
- **Requests & Discovery** — Browse trending content, manage watchlists
- **Live TV & Streaming** — IPTV support via Stalker, XStream, M3U playlists

### Is Cinephage free?

Yes! Cinephage is 100% free and open source under the GPL-3.0 license. There are no premium features, no subscriptions, and no paywalls.

### What are the advantages of Cinephage?

- Single unified application
- One database for all media types
- Consistent UI/UX across all features
- Lower resource usage (200-500MB typical)
- Straightforward setup and configuration
- Consistent automation rules

**Trade-off:** Unified design covers most common use cases; users needing highly specialized configurations per media type may prefer modular approaches.

### Can I import my existing media library?

Yes, you can import your existing library:
1. Configure root folders in Cinephage
2. Use Import feature to scan existing files
3. Cinephage will match to TMDB

Your files stay in place - Cinephage just creates its own database entries.

## Installation & Setup

### What are the system requirements?

**Minimum:**
- 2 CPU cores
- 2 GB RAM
- 10 GB disk space (plus media storage)
- Docker (recommended) or Node.js 20+

**Recommended:**
- 4+ CPU cores
- 4-8 GB RAM
- SSD for Cinephage data
- TMDB API key (free)

### How do I get a TMDB API key?

1. Create free account at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API
3. Click "Request an API Key"
4. Select "Developer"
5. Fill in application details
6. Copy the API Key (not Read Access Token)

### Do I need a download client?

No, but it's recommended for automation. You can:
- Use Cinephage without downloads (manual management)
- Use with qBittorrent, SABnzbd, NZBGet
- Use NZB Streaming without traditional downloads

### Can I run Cinephage without Docker?

Yes, but Docker is strongly recommended:
- **Docker:** Easier setup, consistent environment, better support
- **Native:** Requires Node.js 20+, npm install, more complex

See [Installation](/docs/getting-started/installation) for both methods.

### How do I update Cinephage?

**Docker:**
```bash
docker compose pull
docker compose up -d
```

**Native:**
```bash
git pull
npm install
npm run build
npm start
```

### Where is my data stored?

**Docker:**
```
./config/data/cinephage.db          # Database
./config/                           # Settings, logs
```

**Native:**
```
./data/cinephage.db                 # Database
./data/                             # Settings, logs
```

### How do I backup Cinephage?

**Backup:**
```bash
# Stop Cinephage
docker compose down

# Backup database and config
cp -r ./config /backup/cinephage-config-$(date +%Y%m%d)

# Restart
docker compose up -d
```

**Restore:**
```bash
# Stop Cinephage
docker compose down

# Restore from backup
cp -r /backup/cinephage-config-YYYYMMDD ./config

# Fix permissions
sudo chown -R 1000:1000 ./config

# Restart
docker compose up -d
```

## Configuration

### What's the difference between ORIGIN and BETTER_AUTH_URL?

Both should usually be set to the same value:

- **ORIGIN:** Trusted origin for CSRF protection (your external URL)
- **BETTER_AUTH_URL:** Base URL for authentication callbacks

**Example:**
```yaml
environment:
  - ORIGIN=https://cinephage.yourdomain.com
  - BETTER_AUTH_URL=https://cinephage.yourdomain.com
```

### Why can't I access Cinephage externally?

Common causes:
1. **Firewall** - Port 3000 (or your custom port) not open
2. **ORIGIN not set** - Must set ORIGIN environment variable
3. **BETTER_AUTH_URL not set** - Required for external access
4. **Host binding** - Use 0.0.0.0 not 127.0.0.1

### How do I configure PUID/PGID?

**Get your IDs:**
```bash
id -u  # User ID
id -g  # Group ID
```

**Docker Compose:**
```yaml
environment:
  - PUID=1000
  - PGID=1000
```

This ensures files are created with correct ownership.

### Why are my file permissions wrong?

**Check PUID/PGID:**
```bash
# Check current IDs
id

# Check file ownership
ls -la /path/to/media
```

**Fix permissions:**
```bash
# Docker
sudo chown -R 1000:1000 ./config

# Or run container as your user
docker run --user $(id -u):$(id -g) ...
```

## Library Management

### Why isn't my media showing up?

**Check:**
1. Root folder path is correct (use container path in Docker)
2. Cinephage has read permissions
3. Files are in supported format (.mkv, .mp4, .avi, etc.)
4. Run Library Scan: Library → Movies/TV → Scan Library

### How do I add my existing library?

1. Go to **Library → Movies** or **Library → TV**
2. Click **Import**
3. Select folder containing your media
4. Review and confirm matches
5. Cinephage will organize and add to library

See [Import Existing Files](/docs/guides/use/import-existing-files) for details.

### Can I have multiple root folders?

Yes! You can create multiple root folders:
```
/media/movies      (Movies root)
/media/tv          (TV Shows root)
/media/anime       (Anime root)
/media/kids        (Kids content root)
```

Each must be dedicated to one media type (don't mix movies and TV).

### What's the difference between Monitored and Unmonitored?

- **Monitored:** Cinephage actively searches for this content
- **Unmonitored:** Item is in library but won't be auto-searched

**Use cases:**
- **Monitored:** Content you want to download/upgrade
- **Unmonitored:** Content you already have, don't need more

### How do I organize my files?

Cinephage can organize files automatically:

1. Configure naming patterns in Settings → Media Management → Naming
2. Use tokens like `{Movie Title}`, `{Release Year}`, `{Quality}`
3. Cinephage applies patterns during import
4. Use "Organize" feature to rename existing files

See [Organize Files](/docs/guides/use/organize-files) for patterns and examples.

### Why are my movies/shows matched incorrectly?

**Common causes:**
1. **No year in filename** - Add release year
2. **Ambiguous title** - Similar movies with same name
3. **Foreign title** - Different names in different regions

**Solutions:**
1. Rename files with year: `Movie Title (2024).mkv`
2. Use TMDB ID: `Movie Title {tmdb-12345}.mkv`
3. Manually correct match during import

## Downloading

### Why aren't my downloads starting?

**Check:**
1. Download client configured and tested
2. Indexers configured and tested
3. Item is monitored
4. Quality profile allows available releases
5. Items not blocklisted
6. Disk space available

### What's a quality profile?

Quality profiles define:
- Which qualities are acceptable (720p, 1080p, 4K)
- Quality priority order
- Whether to upgrade
- Cutoff quality (stop upgrading here)

**Built-in profiles:**
- **Quality:** Maximum quality (upgrades to 4K)
- **Balanced:** Good quality, reasonable size (1080p preferred)
- **Compact:** Smaller files (720p/1080p)
- **Streamer:** For NZB streaming

See [Set Up Quality Profiles](/docs/guides/configure/quality-profiles) for details.

### What's the cutoff?

Cutoff is the quality level where upgrades stop:

**Example:**
```
Profile: Balanced
Cutoff: 1080p BluRay

Downloads:
1. First: 720p HDTV
2. Upgrade: 1080p WEB-DL
3. Upgrade: 1080p BluRay ← Cutoff met, no more upgrades
```

### What's the difference between Missing, Cutoff Unmet, and Upgrade tasks?

- **Missing:** Searches for items with no files
- **Cutoff Unmet:** Searches for items below quality cutoff
- **Upgrade:** Searches for better quality on ALL items (even above cutoff)

### Why are searches slow?

**Common causes:**
1. Too many indexers (limit to 3-5)
2. Slow indexers (set lower priority)
3. Network issues
4. Rate limiting

**Solutions:**
- Disable slow indexers
- Set indexer priorities
- Increase timeout in settings
- Check network connectivity

### What are custom formats?

Custom formats let you score releases based on attributes:

**Example:**
```yaml
Format: "Prefer HEVC"
Condition: Contains "HEVC" or "H.265"
Score: +50 points
```

This adds 50 points to any HEVC release, making it preferred over H.264.

## Streaming & Live TV

### What is NZB Streaming?

Watch content directly from usenet without downloading the full file:
1. Mount NZB as virtual filesystem
2. Stream segments on-demand
3. Start playing immediately
4. No waiting for full download

See [Configure NZB Streaming](/docs/guides/configure/nzb-streaming) for setup.

### How do I set up Live TV?

Cinephage supports IPTV via:
- **Stalker Portal** - MAG/Ministra (MAC address auth)
- **XStream Codes** - Username/password auth
- **M3U Playlist** - Standard IPTV playlists

See [Set Up Live TV](/docs/guides/configure/live-tv) for detailed configuration.

### Can I record Live TV?

Not currently. Cinephage focuses on streaming and playlist management. DVR/recording may be added in the future.

### How do I use the M3U playlist?

Access your playlist at:
```
https://your-cinephage-url/api/livetv/playlist.m3u
```

Use with VLC, Kodi, Jellyfin, or any IPTV app.

## Troubleshooting

### Where are the logs?

**Docker:**
```bash
docker compose logs -f cinephage
```

**Web Interface:**
```
Settings → System → Logs
```

**Log Files:**
```
./config/logs/cinephage.log
```

### How do I enable debug logging?

**Docker:**
```yaml
environment:
  - LOG_LEVEL=debug
```

**Restart required:**
```bash
docker compose restart
```

### My database is getting large, what should I do?

**Check size:**
```bash
ls -lh ./config/data/cinephage.db
```

**Optimize:**
```bash
# Docker
docker exec cinephage sqlite3 /config/data/cinephage.db "VACUUM;"

# Native
sqlite3 ./data/cinephage.db "VACUUM;"
```

**Set retention:**
```
Settings → System → Data Retention
```

### Cinephage won't start, what do I do?

**Check logs:**
```bash
docker compose logs cinephage
```

**Common issues:**
1. **Port already in use** - Change port mapping
2. **Database locked** - Check no other instance running
3. **Permission denied** - Fix PUID/PGID or file permissions
4. **Out of memory** - Increase Docker memory limit

**Reset (last resort):**
```bash
# Backup first
cp -r ./config ./config-backup

# Reset database
docker compose down
rm ./config/data/cinephage.db
docker compose up -d
```

### How do I reset my password?

If you can't log in:

1. Stop Cinephage
2. Delete user from database (advanced) or
3. Reset entire database (loses all data) or
4. Use CLI reset command (if available)

### Why are my subtitle searches failing?

**Check:**
1. Subtitle providers configured
2. Language profile includes desired languages
3. Video file name is clear (not obfuscated)
4. Subtitle providers have the language

### Can I use a VPN?

Yes, but don't use Cinephage's built-in VPN (there isn't one). Instead:

**Option 1: VPN Container**
```yaml
services:
  gluetun:  # VPN container
    image: qmcgaw/gluetun
    # ... VPN config
  
  cinephage:
    network_mode: service:gluetun
```

**Option 2: System VPN**
- Run VPN on your host
- Cinephage traffic goes through automatically

### How do I get help?

**Resources:**
- 📖 This documentation
- 💬 [Discord Community](https://discord.gg/scGCBTSWEt)
- 🐛 [GitHub Issues](https://github.com/MoldyTaint/Cinephage/issues)
- 📧 Check logs and provide details when asking for help

**When asking for help, include:**
1. What you were trying to do
2. What actually happened
3. Error messages (from logs)
4. Your configuration (sanitized)
5. Cinephage version

## Advanced

### Can I use PostgreSQL instead of SQLite?

Not currently. Cinephage uses SQLite for simplicity. PostgreSQL support may be added in the future for very large libraries.

### Can I run multiple instances?

Not recommended. SQLite doesn't handle concurrent access well. If you need multiple instances, use separate databases.

### Is there an API?

Yes, but it's currently private and undocumented. Public API documentation will be released in the future.

### Can I contribute?

Yes! Cinephage is open source:
- 🐛 Report bugs on GitHub
- 💡 Suggest features
- 📝 Improve documentation
- 💻 Submit pull requests

See [Contributing](https://github.com/MoldyTaint/Cinephage/blob/main/CONTRIBUTING.md).

### What's the roadmap?

Check the [GitHub repository](https://github.com/MoldyTaint/Cinephage) for:
- Active development
- Feature requests
- Known issues
- Release notes

## Quick Command Reference

**View logs:**
```bash
docker compose logs -f cinephage
```

**Restart Cinephage:**
```bash
docker compose restart cinephage
```

**Update Cinephage:**
```bash
docker compose pull && docker compose up -d
```

**Backup database:**
```bash
cp ./config/data/cinephage.db ./config/data/cinephage-backup.db
```

**Check database:**
```bash
sqlite3 ./config/data/cinephage.db ".tables"
```

**Optimize database:**
```bash
sqlite3 ./config/data/cinephage.db "VACUUM;"
```

## See Also

- [Getting Started](/docs/getting-started/) - Installation and setup
- [Troubleshooting](/docs/guides/deploy/troubleshooting) - Detailed troubleshooting guide
- [Getting Help](/docs/getting-started/getting-help) - Support resources
- [GitHub Issues](https://github.com/MoldyTaint/Cinephage/issues) - Bug reports and feature requests
