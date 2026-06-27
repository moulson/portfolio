# Changelog

All notable changes to this project are documented in this file.

## [2.0.1] — 2026-06-27

### Changed

- Removed CV links from the business site; CV remains available at `/cv.html` via direct URL only.
- Removed the Harrogate location from the hero and meta description.
- Removed HG1M and Empirna from case studies (sites no longer live); Crimson Cresties remains.

## [2.0.0] — 2026-06-27

### Added

- Complete site redesign with a cohesive visual system (cream/navy/gold palette, DM Sans + Source Serif 4 typography).
- Shared asset structure: `/assets/css/site.css`, `/assets/js/site.js`, `/assets/favicon.svg`.
- Mobile-responsive navigation with accessible hamburger menu.
- SEO meta descriptions and Open Graph tags on the homepage.
- Cross-linking between the business site (`index.html`) and CV (`cv.html`).
- LinkedIn contact link on the homepage.
- Branded project cards for case studies (no external image dependencies).
- Print-friendly styles on the CV page.

### Changed

- Replaced broken `/path/to/*.jpg` image placeholders with CSS-based profile and project thumbnails.
- Replaced unreliable mailto form with direct email, phone, and LinkedIn contact methods.
- Fixed CV email link (`dan@danmoulson.com` throughout).
- Updated copyright year to 2026.
- Removed Tailwind CDN dependency in favour of a single maintained stylesheet.

### Removed

- Tailwind CSS browser runtime CDN script tags.
