---
title: Library management
description: Configure root folders, organize content, and manage your media library effectively
sidebar_position: 4
tags: [library, management, configuration, guide, root-folders, organization]
keywords: [library, root folders, organization, media management]
---

# Library management

This guide covers library management features in Cinephage, including root folders, media organization, and library maintenance.

## Understanding Cinephage Libraries

Cinephage organizes media into two main library types:

| Library Type | Content | Organization |
|--------------|---------|--------------|
| **Movies** | Individual films | Flat or by folder per movie |
| **TV Shows** | Series with episodes | Series > Seasons > Episodes |

## Root Folders

Root folders define where Cinephage stores your media. They're the foundation of your library organization.

### What Are Root Folders?

A root folder is a base directory where Cinephage:
- Stores imported media files
- Creates subdirectories for organization
- Monitors for new files
- Manages file naming and structure

### Creating Root Folders

#### Step 1: Access Settings

1. Go to **Settings > Media Management > Root Folders**
2. Click **Add Root Folder**

#### Step 2: Configure Folder

| Setting | Description | Example |
|---------|-------------|---------|
| **Name** | Display name | "Movies", "TV Shows" |
| **Path** | Container path to folder | `/media/movies` |
| **Media Type** | Movies or TV Shows | Select appropriate type |
| **Default Quality** | Profile for new additions | "Balanced" |
| **Default Language** | Language profile | "English" |

#### Step 3: Multiple Root Folders

You can create multiple root folders:

**Example Setup:**
```
/media/movies      (Movies root folder)
/media/tv          (TV Shows root folder)
/media/anime       (Anime-specific folder)
/media/kids        (Family content)
```

:::tip Media Type Specific
Each root folder is dedicated to one media type. Don't mix movies and TV in the same root folder.
:::

### Root Folder Best Practices

#### Path Guidelines

**Docker Installations:**
- Use container paths, not host paths
- Ensure volume mounts match your paths
- Example: If you mount `/mnt/media:/media`, use `/media/movies`

**Native Installations:**
- Use absolute paths
- Ensure proper permissions
- Consider dedicated mount points for media

#### Storage Planning

**Separate Libraries:**
```
# Good structure
/mnt/storage/
  movies/        # SSD or fast storage
  tv/            # Bulk storage OK
  anime/         # Separate organization
  kids/          # Curated collection
```

**Nested Folders:**
```
# Don't nest root folders
 /media/
     movies/      (root folder)
     movies/tv/   (nested - don't do this)

# Instead use separate roots
 /media/movies/   (root folder)
 /media/tv/       (root folder)
```

#### Performance Considerations

- **Fast Storage for Database** - Put Cinephage config (database) on SSD
- **Bulk Storage for Media** - Media can be on HDD or network storage
- **Avoid Network for Database** - SQLite needs local disk for best performance

### Managing Root Folders

#### View Root Folders

```
Settings > Media Management > Root Folders
```

Shows:
- Folder name and path
- Media type
- Number of items
- Free space available
- Default profiles

#### Edit Root Folder

1. Click **Edit** on root folder
2. Modify settings
3. Click **Save**

**What can be changed:**
- Name
- Default quality profile
- Default language profile
- Path (use with caution)

#### Remove Root Folder

:::warning Data Loss Warning
Removing a root folder from Cinephage doesn't delete the actual files, but Cinephage will lose track of all items in that folder.
:::

1. Ensure all items are moved or unmonitored
2. Click **Delete** on root folder
3. Confirm removal

## Library Views

### Movies Library

Access via **Library > Movies** (URL: `/library/movies`)

:::info URL Changes
Library routes have been standardized:
- Movies: `/library/movies` (previously `/movies`)
- TV Shows: `/library/tv` (previously `/tv`)
- Legacy URLs redirect automatically
:::

**View Options:**

| View | Description | Best For |
|------|-------------|----------|
| **Grid** | Poster view with titles | Browsing large libraries |
| **List** | Detailed list with metadata | Quick scanning |
| **Table** | Spreadsheet-style with columns | Sorting and filtering |

**Filters:**

- **Monitored Status** - Monitored, Unmonitored, All
- **Quality** - Filter by quality profile
- **Status** - Missing, Downloaded, Upgrading
- **Year** - Release year range
- **Genre** - Filter by genre
- **Rating** - TMDB rating range

**Sorting:**

- Title (A-Z, Z-A)
- Year (Newest, Oldest)
- Rating (Highest, Lowest)
- Date Added
- File Size

### TV Shows Library

Access via **Library > TV Shows** (URL: `/library/tv`)

**View Options:**

Same as Movies (Grid, List, Table)

**Additional Filters:**

- **Series Status** - Continuing, Ended, All
- **Seasons** - Number of seasons
- **Episodes** - Episode count
- **Network** - Original network
- **Next Airing** - Upcoming episodes

**Series Detail View:**

Click a series to see:
- Overview and metadata
- Season list with episode counts
- Episode list per season
- File information
- Quality status per episode

### Smart Lists

Dynamic lists that auto-populate based on criteria:

- **Trending** - Popular recent releases
- **Upcoming** - Not yet released
- **Custom** - User-defined filters

See [Set Up Smart Lists](smart-lists) for detailed configuration.

## Adding Content to Library

### Manual Addition

**Adding Movies:**

1. Go to **Discover** or **Movies > Add New**
2. Search for movie title
3. Click movie in results
4. Configure:
   - Root folder
   - Quality profile
   - Monitor status
5. Click **Add**

**Adding TV Shows:**

1. Go to **Discover** or **TV Shows > Add New**
2. Search for series title
3. Click series in results
4. Configure:
   - Root folder
   - Quality profile
   - Monitor: All, Future, Missing, Existing
5. Click **Add**

### Bulk Addition

**From TMDB Lists:**

1. Go to **Discover > Lists**
2. Browse TMDB curated lists
3. Click **Add List**
4. Select items to add
5. Configure defaults
6. Bulk add

**Import from File:**

1. Prepare CSV with columns: Title, Year, Type
2. Go to **Library > Import**
3. Upload CSV
4. Map columns
5. Import

**Add TMDB Collections (Bulk):**

Add entire TMDB collections to your library at once:

1. Go to a movie detail page that belongs to a collection (e.g., "The Avengers")
2. Look for **"Part of [Collection Name]"** section
3. Click **"Add Collection"**
4. Configure:
   - Root folder for collection
   - Quality profile
   - Language profile
   - Monitor status
5. Click **Add All**

**What happens:**

- All movies in the collection are added to your library
- Each movie is monitored according to your settings
- Existing movies in your library are not duplicated
- You can add missing movies to complete collections

## Per-Library Language Preferences

Cinephage supports **per-library language preferences** - you can set different subtitle language requirements for each library (Movies vs TV Shows).

### How It Works

Each library can have its own language profile:

```
Movies Library → English Primary + Spanish Secondary
TV Shows Library → English Only
Anime Library → Japanese + English
```

This is independent of root folder settings - you can have multiple libraries using the same root folder but with different language preferences.

### Setting Language Preferences

**Step 1: Create Language Profiles**

1. Go to **Settings > Integrations > Language Profiles**
2. Create profiles for different use cases:
   - `English Primary` - English required, Spanish optional
   - `English Only` - English required only
   - `Multi-Language` - Multiple languages required

**Step 2: Configure Library Language Settings**

1. Go to **Settings > Media Management > Root Folders**
2. Click **Edit** on a root folder
3. Under **Language Preferences**, select:
   - **Default Language Profile** for this library
   - **Subtitle Search Behavior** (import, monitoring, etc.)

**Step 3: Assign to Libraries**

1. Go to **Library > Movies** (or **TV Shows**)
2. Click **Settings** (gear icon) for that library
3. Select the **Language Profile** to use
4. Configure subtitle search options:
   - **Search on Import** - Find subtitles when content is added
   - **Monitor for Upgrades** - Search for better subtitles periodically
   - **Required Languages** - Languages that must be present

### Library-Specific Settings

Each library (Movies, TV Shows) has independent subtitle settings:

| Setting | Movies Library | TV Shows Library |
|---------|---------------|------------------|
| Default Language Profile | Configurable | Configurable |
| Search on Import | Enabled by default | Enabled by default |
| Monitor for Upgrades | Per profile setting | Per profile setting |
| Required Languages | From profile | From profile |

### Benefits of Per-Library Settings

- **Language-Specific Libraries**: Anime library with Japanese + English, English library for mainstream content
- **Different Standards**: Movies might need more subtitle options than TV shows
- **Storage Efficiency**: Don't download Spanish subtitles for English-only libraries
- **Flexible Monitoring**: Some libraries monitor for upgrades, others don't

### Bulk Assign Language Profile

Apply a language profile to multiple items at once:

1. Go to **Library > Movies** (or **TV Shows**)
2. Select multiple items using checkboxes
3. Click **Edit**
4. Under **Language Profile**, select a new profile
5. Click **Save**

This changes the subtitle behavior for all selected items.

## Managing Library Items

### Movie Management

**Individual Actions:**

| Action | Description | How To |
|--------|-------------|--------|
| **Edit** | Change metadata, profiles | Click movie > Edit |
| **Search** | Find releases manually | Click movie > Search |
| **Rename** | Apply naming pattern | Click movie > Organize |
| **Delete** | Remove from library | Click movie > Delete |
| **History** | View download history | Click movie > History |

**Deletion Behavior:**

When you delete a movie or episode:

- **Immediate status updates** — UI reflects deletion instantly without page refresh
- **File removal confirmation** — Files are deleted immediately, library item updated
- **Auto-redirect** — After deletion, you're automatically redirected to the library list
- **No manual refresh needed** — Status indicators update in real-time

**Bulk Actions:**

1. Select multiple movies (checkboxes)
2. Click action button:
   - Edit (change profiles)
   - Search
   - Monitor/Unmonitor
   - Delete

### TV Show Management

**Series-Level Actions:**

- Edit series details
- Change monitoring (All/Future/Missing/None)
- Search for missing episodes
- Refresh metadata
- Delete series

**Season-Level Actions:**

- Monitor/unmonitor season
- Search for season episodes
- View season details
- Delete season files

**Episode-Level Actions:**

- Monitor/unmonitor episode
- Search for specific episode
- View episode details
- Delete episode file

### Monitoring Status

Understanding monitoring levels:

**Movies:**
- **Monitored** - Will search for movie
- **Unmonitored** - In library, won't search

**TV Shows:**
- **All Episodes** - Monitor every episode
- **Future Episodes** - Monitor upcoming episodes only
- **Missing Episodes** - Monitor episodes without files
- **Existing Episodes** - Monitor episodes with files (for upgrades)
- **None** - Don't monitor

## Library Maintenance

### Regular Tasks

**Weekly:**
- [ ] Review Activity for failures
- [ ] Check for missing episodes
- [ ] Verify new releases added correctly

**Monthly:**
- [ ] Clean up blocklist
- [ ] Review quality profiles
- [ ] Check disk space
- [ ] Backup database

**Quarterly:**
- [ ] Review indexer health
- [ ] Update download client settings
- [ ] Archive old logs
- [ ] Optimize database

### Library Scanning

**Manual Scan:**

1. Go to **Library > Movies** or **Library > TV**
2. Click **Scan Library**
3. Cinephage checks for:
   - New files
   - Deleted files
   - Changed files
   - Metadata updates

**Automatic Scanning:**

Configure in Settings:
```
Settings > Media Management > Library Scan
Scan Interval: 6 hours (or custom)
```

**Scan Results:**

- Files added
- Files removed
- Metadata updated
- Errors encountered

### Metadata Refresh

Update TMDB metadata for items:

1. Select item(s)
2. Click **Refresh & Scan**
3. Cinephage fetches latest:
   - Posters and artwork
   - Plot summaries
   - Cast and crew
   - Ratings
   - Release dates

:::tip Scheduled Refresh
TMDB data changes over time. Refresh monthly for active series.
:::

### Disk Space Management

**Monitor Usage:**

```
Settings > System > Disk Space
```

Shows:
- Per root folder usage
- Free space remaining
- Largest items

**Cleanup Strategies:**

1. **Unmonitor Unwanted Items:**
   - Stop searching for old series
   - Keep files but disable monitoring

2. **Delete Unwatched:**
   - Review play history
   - Delete items never watched
   - Use "Delete Files & Remove" action

3. **Quality Cleanup:**
   - Keep only best quality
   - Delete lower quality duplicates
   - Use "Organize" to consolidate

4. **Export List:**
   - Export library to CSV
   - Analyze outside Cinephage
   - Identify candidates for deletion

## Advanced Library Features

### Collections

Organize movies into collections:

**Automatic Collections:**
- Based on TMDB collections (e.g., Marvel Cinematic Universe)
- Franchise groupings
- Automatically updated

**Custom Collections:**
1. Go to **Library > Collections**
2. Click **Add Collection**
3. Name the collection
4. Add movies manually
5. Save

### Tags

Tag items for organization:

**Use Cases:**
- **Favorites** - Quick access to best movies
- **Watchlist** - Queue for upcoming viewing
- **Kids** - Family-friendly content
- **4K** - High-quality items
- **Archive** - Don't delete these

**Adding Tags:**

1. Select item(s)
2. Click **Edit**
3. Add tags in Tags field
4. Save

**Filtering by Tags:**

Use filter dropdown in library view to show only tagged items.

### Custom Filters

Create advanced filters:

```
Library > Filters > Custom Filter
```

**Filter Conditions:**

- Quality equals
- Size greater than
- Year between
- Rating above
- Has specific tag
- Monitored status
- File exists

**Save Custom Filters:**

Name and save filters for quick access later.

## Troubleshooting Library Issues

### Files Not Showing

**Check Root Folder Path:**

1. Verify path is correct in settings
2. Check Docker volume mounts
3. Ensure Cinephage has read permissions

**Run Library Scan:**

```
Library > Movies > Scan Library
```

**Check File Types:**

Ensure files are supported video formats:
```
.mkv, .mp4, .avi, .m4v, .mov, .wmv
```

### Duplicate Movies/Shows

**Detection:**

Cinephage warns about potential duplicates during import.

**Resolution:**

1. Identify duplicate in library
2. Compare quality and details
3. Delete lower quality version
4. Keep preferred version

**Prevention:**

- Use consistent naming
- Import to correct root folders
- Don't have same movie in multiple locations

### Metadata Not Loading

**Check TMDB Connection:**

```
Settings > General > TMDB API Key
```

Verify:
- API key is valid
- Cinephage can reach TMDB
- No rate limiting

**Manual Refresh:**

1. Find item with missing metadata
2. Click **Refresh & Scan**
3. Check for errors

**Check Logs:**

```bash
docker logs cinephage | grep -i metadata
```

### Slow Library Loading

**Large Libraries:**

- Use filters to reduce displayed items
- Enable pagination
- Check database size (optimize if >1GB)

**Network Issues:**

- Check poster loading (external images)
- Verify internet connection
- Check if behind proxy/VPN

## Best Practices

### Organization

1. **Use Meaningful Root Folder Names:**
   - "Movies" not "Media"
   - "TV Shows" not "Series"

2. **Keep Paths Simple:**
   - `/media/movies` not `/home/user/media/collection/movies/final`

3. **Separate by Type:**
   - Don't mix movies and TV
   - Consider anime separately
   - Kids content in dedicated folder

### Maintenance

1. **Regular Scans:**
   - Enable automatic scanning
   - Or scan weekly manually

2. **Monitor Disk Space:**
   - Set up alerts
   - Plan storage expansion

3. **Keep Backups:**
   - Database backup weekly
   - Configuration backup monthly

4. **Clean Regularly:**
   - Review blocklist monthly
   - Clean up failed downloads
   - Archive old logs

### Performance

1. **SSD for Config:**
   - Database on fast storage
   - Media can be on slower storage

2. **Optimize Database:**
   - VACUUM monthly
   - ANALYZE weekly

3. **Limit Library Size:**
   - Realistic collection size
   - Quality over quantity

## See Also

- [Import Existing Files](../use/import-existing-files) - Import your existing media
- [Organize Files](../use/organize-files) - File naming and organization
- [Monitor and Upgrade](../use/monitor-and-upgrade) - Automated monitoring
- [Adding Media](../../getting-started/adding-media) - Adding new content
