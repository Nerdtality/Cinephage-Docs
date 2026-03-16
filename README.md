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

Deployment is handled automatically by Cloudflare Workers — the project is connected via the Cloudflare dashboard and deploys on every push to `main`. GitHub Actions runs a build check on all pushes and PRs to catch errors early.

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
