# Skelton Group website redesign

This is the separate redesign of the Skelton Group website. The preserved original source is in the sibling `skelton-group.github.io` folder; this folder has no Git remote and has not been published.

The navigation contains Home, Publications, Software and Contact. Home combines the previous Home2 and People2 pages. Contact includes Work with us below the map.

## Local preview on this Mac

From this folder:

```bash
conda activate skelton-website
bundle exec jekyll serve --host 127.0.0.1 --port 4001 --destination /tmp/skelton-site-redesign-preview
```

Open http://localhost:4001. Keep the terminal running; press Ctrl+C to stop. The preserved original preview uses port 4000.

## Editing

- `index.html`: homepage text, research map and links.
- `_includes/people.html`: the embedded people section.
- `_data/people.yml`: names, photos, biographies and career updates.
- `_data/research_themes.yml`: research-theme questions, methods and outputs.
- `_data/publications.yml`: publication records.
- `software.md`: software information.
- `contact.md`: contact details and Work with us.
- `assets/css/`: shared and page styling.

The site uses the group's modified Slate theme, configured in `_config.yml`. Local Ruby dependency settings are in the ignored `.bundle/` directory. Generated preview files are kept outside the synced source folder.
