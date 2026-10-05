# Shared Solitude assets

Astro Solitude is the source for the static brand assets used by the Astro, Hexo,
and Hugo themes. Each repository contains its own files and builds independently.
Hugo does not need Node.js to build; Node.js is only used by maintainers when syncing.

## Preview and synchronize

Run these commands from the Astro repository with Node.js 22.12.0 or later:

```sh
node scripts/sync-assets.mjs
node scripts/sync-assets.mjs --write
node scripts/sync-assets.mjs --check
```

The default operation previews changes without writing. `--write` copies the listed
assets and removes only explicitly listed obsolete files. `--check` reports missing,
changed, or obsolete files and exits with status 1 when differences exist. Every
source hash and target path is checked before writing; source mismatches abort the
operation. Unlisted files, site configuration, and personal content are left alone.

The default layout has sibling directories `astro-solitude`, `hexo-theme-solitude`,
and `solitude`. For another layout, supply paths:

```sh
node scripts/sync-assets.mjs --check --hexo-root ../my-hexo-theme --hugo-root ../my-hugo-theme
node scripts/sync-assets.mjs --check --project astro
```

Use `--source-root` to select another Astro source checkout. `--astro-root` can
select a separate Astro destination. `--project astro|hexo|hugo` checks or syncs one
destination; `all` is the default. Explicit paths are relative to the current working
directory. Preview/check/write never require a network request or regenerate images.

## Inventory and maintenance

[shared-assets.json](shared-assets.json) records each source file, destination path,
SHA-256, and provenance. The same manifest and this guide are copied to all three
repositories. Static images live in `public/img`, `source/img`, and `static/img`;
example audio/video live in Astro's `public/media/shortcodes`, Hexo's
`source/media/shortcodes`, and Hugo's `exampleSite/static/media/shortcodes`.

When changing a shared asset, edit the Astro source, update that entry's SHA-256
using `shasum -a 256 path/to/file`, preview, write, then check. Add an explicit target
for every framework when adding a shared asset. Do not add user content or third-party
service logos to the shared collection. Deletions must be individually listed under
`removals`; there is no directory cleanup operation.

## New illustrations

The built-in imagegen tool generated four images on 2026-10-05, using the existing
Astro logo and getting-started cover as style references. New illustrations use
layered matte paper, midnight navy, cream, and coral, without embedded text.

| File under `img/brand/` | Use | Web image size |
| --- | --- | --- |
| `solitude-banner.webp` | Shared README banner | 1600 × 900 |
| `creative-space.webp` | About-page illustration and gallery example | 1200 × 800 |
| `paper-plane-badge.webp` | Transparent About-page badge | 256 × 256 |
| `reward-paper.webp` | Static donation-button decoration | 512 × 512 |

The exact prompts are in [generation-prompts.json](brand/generation-prompts.json).
Original PNGs are retained under `docs/brand/originals/` in the Astro source
repository; optimized WebP files are copied to every theme. Existing Astro assets
are retained rather than regenerated. Screenshots remain framework-specific and
are not part of the shared asset inventory.

## Attribution

Existing theme assets retain their original Solitude provenance and Apache-2.0
copyright notices. This inventory does not replace the historical Hugo snapshot
manifest in Astro's `docs/source-manifest.json`. New illustrations are generated
project artwork. Example audio/video retain the MDN attribution in their
`media/shortcodes/README.md`. Existing sponsor acknowledgments remain text links.
