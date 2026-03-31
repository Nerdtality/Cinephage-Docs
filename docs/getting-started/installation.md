---
id: installation
title: Installation
description: Install Cinephage using Docker Compose with step-by-step instructions
sidebar_position: 2
tags: [installation, docker, tutorial]
keywords: [docker, docker compose, installation, setup]
---

# Installation

In this tutorial, we will install Cinephage using Docker Compose. This is the recommended and simplest installation method.

## Prerequisites

Before we begin, ensure we have:

- **Docker** installed (version 20.10 or later)
- **Docker Compose** installed (version 2.0 or later)
- **A TMDB API key** (we will get this during setup)
- **An auth secret** (generate one with: `openssl rand -base64 32`)

## Step 1: Create the Docker Compose File

We create a directory for Cinephage and navigate to it:

```bash
mkdir cinephage
cd cinephage
```

We create a file named `docker-compose.yaml` with the following content:

```yaml
services:
  cinephage:
    image: ghcr.io/moldytaint/cinephage:latest
    container_name: cinephage
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=UTC
      - ORIGIN=http://localhost:3000
      - BETTER_AUTH_URL=http://localhost:3000
      - BETTER_AUTH_SECRET=your-secret-key-here
    volumes:
      - ./config:/config
      - /path/to/media:/media
      - /path/to/downloads:/downloads
```

## Step 2: Configure Environment Variables

We replace the placeholder values in the environment section:

| Variable             | Value                   | Description                                          |
| -------------------- | ----------------------- | ---------------------------------------------------- |
| `PUID`               | `1000`                  | Our user ID (run `id -u` to find ours)             |
| `PGID`               | `1000`                  | Our group ID (run `id -g` to find ours)            |
| `TZ`                 | `UTC`                   | Our timezone (e.g., `America/New_York`)             |
| `ORIGIN`             | `http://localhost:3000` | The URL we will access Cinephage from               |
| `BETTER_AUTH_URL`    | `http://localhost:3000` | Same as ORIGIN, used for authentication              |
| `BETTER_AUTH_SECRET` | _generated_             | Secret key for session encryption (generate new one) |

:::warning Important

- Set `ORIGIN` and `BETTER_AUTH_URL` to match the URL we will use to access Cinephage (e.g., `http://your-server-ip:3000`).
- Generate a unique `BETTER_AUTH_SECRET` using: `openssl rand -base64 32` or `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

:::

## Step 3: Configure Volume Mounts

We update the volume paths to match our system:

| Volume               | Path                          | Purpose                              |
| -------------------- | ----------------------------- | ------------------------------------ |
| `./config`           | Host path to config directory | Stores database, cache, and settings |
| `/path/to/media`     | Host path to media library    | Our existing movies and TV shows    |
| `/path/to/downloads` | Host path to downloads        | Where download clients save files    |

**Example:**

```yaml
volumes:
  - ./config:/config
  - /mnt/media:/media
  - /mnt/downloads:/downloads
```

## Step 4: Start Cinephage

We run the following command to start Cinephage:

```bash
docker compose up -d
```

This will:

1. Download the Cinephage image
2. Create the container
3. Start the application

:::info First Startup Note
On first startup, Cinephage will download the Camoufox browser (~80MB) for Captcha Solver functionality. This is a one-time download stored in our `/config` volume.
:::

## Step 5: Verify Installation

We check that Cinephage is running:

```bash
docker compose logs -f
```

We should see logs indicating the server has started. We press `Ctrl+C` to exit the log view.

## Step 6: Access Cinephage

We open our web browser and navigate to:

```
http://localhost:3000
```

Or if accessing from another device, we use our server IP:

```
http://your-server-ip:3000
```

We should see the Cinephage setup wizard.

## Step 7: Complete Setup Wizard

The setup wizard will guide you through:

1. **Creating an admin account** - Set up our first user
2. **Configuring TMDB API** - Get our free API key from themoviedb.org
3. **Setting root folders** - Define where media will be stored

We follow the on-screen instructions to complete initial configuration.

## What We Have Accomplished

We have successfully:

- Installed Cinephage with Docker
- Configured environment variables
- Set up volume mounts for persistence
- Started the application
- Accessed the web interface

## Next Steps

Now that Cinephage is installed, we continue to the [Initial Setup](initial-setup) tutorial to configure download clients, indexers, and other essential settings.

## Troubleshooting

For troubleshooting common issues, see the [Troubleshooting guide](../guides/deploy/troubleshooting).

## Updating Cinephage

To update to the latest version:

```bash
docker compose pull
docker compose up -d
```

Our data and configuration will persist in the `./config` volume.

:::info Docker Image Change
Recent versions use `node:22-slim` (Debian) instead of `node:22-alpine`. The image size increased by ~40MB (180MB → 220MB) to support the new Captcha Solver. If updating from an older version, we may need to recreate the container:

```bash
docker compose up -d --force-recreate
```
:::

## Docker Tags

Cinephage provides several image tags:

| Tag      | Description                          |
| -------- | ------------------------------------ |
| `latest` | Current stable release (recommended) |
| `dev`    | Latest development build             |
| `v1.2.3` | Specific version                     |

Change the image line in `docker-compose.yaml` to use a different tag:

```yaml
image: ghcr.io/moldytaint/cinephage:dev
```

## See Also

- [Initial Setup](initial-setup) — Continue with the next tutorial to configure download clients and indexers
- [Troubleshooting guide](../guides/deploy/troubleshooting) — Solutions for common installation issues
- [Environment Variables](../reference/environment-variables) — Complete reference for all configuration options

---

**Next:** [Initial Setup →](initial-setup)
