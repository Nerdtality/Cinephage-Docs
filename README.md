# Cinephage Docs

Documentation site for [Cinephage](https://github.com/MoldyTaint/Cinephage), built with [Docusaurus 3](https://docusaurus.io/) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/) via Wrangler.

**Live site:** [https://docs.cinephage.net](https://docs.cinephage.net)

## Development

```bash
# Install dependencies
npm install

# Start local dev server (hot-reloading)
npm start

# Build static site
npm run build

# Serve the build locally
npm run serve
```

## Deployment

Deployment is handled automatically via GitHub Actions — every push to `main` builds the site and deploys to Cloudflare Workers using Wrangler. Pull requests get a build check to catch errors before merging.

### Required Secrets (GitHub Actions)

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers deployment permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

To deploy manually from a local machine:

```bash
npm run deploy
```

This runs `docusaurus build && wrangler deploy`, which builds the static site into `build/` and deploys it to Cloudflare Workers.

## Documentation Structure

The docs follow the [Diataxis](https://diataxis.fr/) framework:

| Section | Purpose |
|---------|---------|
| **Getting Started** | Step-by-step tutorials for new users |
| **Guides** | How-to guides for specific tasks (configure, use, deploy) |
| **Reference** | Technical reference (env vars, database schema, YAML specs, API) |
| **Explanation** | Architecture, concepts, and design decisions |

## Contributing

You can edit any documentation page directly on GitHub using the "Edit this page" link at the bottom of each doc page, or develop locally:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Pull requests will automatically build and verify the site before merging.

## License

This documentation is part of the Cinephage project, licensed under [GPL-3.0](https://github.com/MoldyTaint/Cinephage/blob/main/LICENSE).
