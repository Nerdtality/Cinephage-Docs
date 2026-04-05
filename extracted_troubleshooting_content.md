# Extracted Troubleshooting Content from Installation Tutorial

This content was extracted from the Installation tutorial as it violates Diátaxis principles for tutorials (which should be learning-oriented, not mixed with reference/how-to content).

## Troubleshooting

### Port Already in Use

If port 3000 is in use, change the port mapping in `docker-compose.yaml`:

```yaml
ports:
  - '3001:3000' # Maps host port 3001 to container port 3000
```

Then access at `http://localhost:3001`.

### Permission Denied

If you see permission errors, ensure the `PUID` and `PGID` match your user:

```bash
id -u  # Get your user ID
id -g  # Get your group ID
```

Update the environment variables in `docker-compose.yaml` accordingly.

### Cannot Access from Another Device

If accessing from another device on your network, use your server IP address instead of `localhost`. Update `ORIGIN` and `BETTER_AUTH_URL` to match how you will access Cinephage.

### Container Keeps Restarting

Check the logs for errors:

```bash
docker compose logs
```

Common issues include:

- Incorrect volume mount paths
- Missing required environment variables
- Port conflicts

### Missing BETTER_AUTH_SECRET

If you see an error about `BETTER_AUTH_SECRET`:

1. Generate a secret: `openssl rand -base64 32`
2. Add it to your `docker-compose.yaml`:
   ```yaml
   environment:
     - BETTER_AUTH_SECRET=your-generated-secret-here
   ```
3. Restart: `docker compose up -d`

:::warning Secret Security
Keep your `BETTER_AUTH_SECRET` secure and backed up. Changing this secret will:
- Invalidate all active user sessions (users must log in again)
- Make existing API keys unreadable (regenerate them in Settings > System)
:::

### Migrating from Old Volume Mounts

If you previously used `/app/data` volume mounts, Cinephage will automatically migrate your data to the new `/config` mount on startup:

1. **Update your `docker-compose.yaml`** to add the `/config` mount alongside existing mounts:
   ```yaml
   volumes:
     - ./config:/config      # NEW: Add this
     - ./data:/app/data      # Keep temporarily
     - /path/to/media:/media
     - /path/to/downloads:/downloads
   ```

2. **Start the container** - migration happens automatically:
   ```bash
   docker compose up -d
   docker compose logs cinephage | grep -i migrat
   ```

3. **After successful migration**, remove the old mount:
   ```yaml
   volumes:
     - ./config:/config      # Keep only this
     - /path/to/media:/media
     - /path/to/downloads:/downloads
   ```

**Your data is safe** — the migration copies (not moves) your data. Original files remain untouched until you remove the old mounts.
