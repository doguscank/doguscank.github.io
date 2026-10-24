# Implementation review — 2026-10-24

Source: [Personal Website Template & Implementation Handover](https://app.notion.com/p/4031423e3665811e8ba0ca9584dccc53).
Review branch: `feat/personal-website`. No push, merge or public deployment performed.

## ASCII visual redesign

The owner superseded the default-theme visual direction with an explicit request
for black, white and ASCII graphics. Replaced the sidebar and theme UI with a
custom, dark-only top-navigation shell, oversized typography, a live procedural
ASCII hero, diagram-led project panels and a domain-transfer illustration.
About, Writing, 404 and article layouts share this design. Content is unchanged.
Reduced motion renders static ASCII; animation pauses offscreen and in hidden
tabs. No extra runtime framework, tracking or generated research claims.

The build, internal links, keyboard skip link, search, 375/1440 px overflow,
WCAG automated checks, and temporary article fixtures were rechecked for this
revision. The historical light/dark checks below describe earlier versions;
the current design is intentionally black-only with grayscale typography.

## Earlier content revision

Updated from the owner-supplied website content document, prepared 24 October
2026. Published only public copy and public factual records. Home now presents
an introduction, research, two repository-backed projects and honest writing
status. About contains the approved biography, professional experience,
education, and contact. Earlier roles are collapsed. Internal notes, private
email, speculative research, awards with incomplete attribution and unsupported
project links are omitted. Both linked project repositories returned HTTP 200.

The design uses soft white/charcoal surfaces and grayscale text, links, borders
and controls. Sidebar avatar, navigation icons, colored buttons and card styling
were removed. Existing routes and manual-only deployment remain unchanged.
Mobile/desktop browser checks, production build and internal links were rerun.
All eight page/mode combinations passed axe WCAG A/AA checks after the revision.

## Initial implementation record

- Chirpy Starter baseline with Chirpy 7.6.0, Ruby 3.4.9 and retained dependency
  lockfile; upstream MIT notice retained.
- English Home, Articles, About, helpful 404, utility categories/tags, RSS,
  sitemap, canonical metadata and native search.
- One reverse-chronological source for Home and Articles; clean empty state and
  no articles, invented publication dates or sample research content.
- Approved identity and bio facts, handle favicon and social profiles; LinkedIn
  contact. Employer and education details are now approved by the content source;
  no public email or portrait was added.
- Native article layout with shared author/discussion/RSS footer and reusable
  series chapters, previous/next links and approved-only series landing pages.
- Domain adaptation registry disabled; no unpublished editorial prose or figures
  added to the repository.
- Authoring template, local preview, publication, rollback and domain instructions.
- Build-only validation workflow and separate manually approved Pages deployment.

## Checks

Production build and HTML-Proofer pass with no destination conflicts or broken
internal links. Tested in Docker using Ruby 3.4.9 and the resolved lockfile.

Chromium/Playwright checks at 375 × 1000 and 1440 × 1000 cover Home, Articles,
About and 404. All have correct titles/canonicals, no horizontal overflow, and
alt attributes on displayed images. Native theme switching and empty-library
search work. No JavaScript exceptions or HTTP asset errors were observed.
Keyboard focus has a visible outline; browser zoom is enabled.

A separate temporary source tree outside the repository exercised three
synthetic posts, an unpublished post and a future-dated post:

- Code highlighting, MathJax equation, Mermaid SVG, responsive table and an
  attributed synthetic figure render in the browser.
- Desktop article width measured 765 px; mobile article width measured 351 px.
- Series chapters sort 1 → 2 → 3; the middle chapter links to both neighbors.
- Generated series landing page and all fixture internal links pass HTML-Proofer.
- Home/search list posts in reverse publication order.
- Search JSON, feed and sitemap exclude unpublished/future posts.
- No fixture posts or fixture figures exist in the implementation repository.

Automated accessibility checks use axe-core 4.11.0 against WCAG A/AA rules in
light and dark mode. Dark sidebar text contrast was increased after inspection.
All eight page/mode combinations report no violations.
Automated checks supplement the responsive, focus and visual checks; they do
not constitute a complete manual accessibility audit.

Local review screenshots and browser scripts are in ignored `artifacts/`.
`home-375.png`, `home-1440.png`, `home-dark-1440.png`, the Articles/About/404
variants and `qa-article-375.png` / `qa-article-1440.png` are available for review.
The QA article screenshots show synthetic rendering fixtures, not public content.

## Remaining review and inputs

- Owner review of the concrete site and copy before public deployment. Publication
  requires a separate explicit instruction, then the manual workflow described
  in README. GitHub repository Pages/environment settings have not been changed.
- GitHub profile loaded successfully. LinkedIn returned 999 and X returned 403
  to automated retrieval. Their supplied profile URLs are preserved but require
  a normal-browser check; ownership was not inferred from matching names.
- First approved article/outline and an approved series introduction remain
  editorial inputs. A portrait, public email, domain and project case studies
  are optional future inputs and do not block this empty-library version.
- Browser dependencies use the theme's versioned CDNs; offline rendering was not
  an acceptance target. No unlicensed research assets were downloaded or reused.

## Agent swarm revision

The homepage renders a procedural ASCII ecology with seven independently drifting,
breathing bodies, curved signal packets, expanding ripples, a merging pair, and
staggered dissolution and re-formation. A generated static frame is included in
the HTML. The animation uses no external dependencies, runs at roughly 12 FPS,
and pauses offscreen or while the document is hidden. Reduced-motion preferences
are respected on load and when changed during a visit.

Validation: production Jekyll build and HTML-Proofer pass; browser checks at 320,
375, 768, 1050, and 1440 pixels show no page overflow or clipped swarm. Animation,
offscreen pause, and reduced-motion behavior pass. Homepage axe WCAG A/AA checks
report no violations and no JavaScript errors were observed. Two simulated
38-second lifecycle cycles preserve the character grid; merging, disappearance,
and re-formation states were checked. Desktop and mobile screenshots were reviewed.

## Random ASCII gallery revision

Each homepage load independently selects one of three studies: 001 Latent
Geometry (the original sculpture), 002 Agent Orchestration (the agent flow),
or 003 Agent Ecology (the swarm). Titles, captions, accessible descriptions,
and animation all follow the selected study. Only the selected renderer runs;
the stage reserves the same height for every variant at a given viewport.
Without JavaScript, the original sculpture remains visible.

Production build and internal-link checks pass. Each variant was checked at
320, 375, 700, 768, 1050, and 1440 pixels for page overflow and clipped artwork,
plus animation, reduced motion, JavaScript errors, and axe WCAG A/AA checks.
Repeated unmodified page loads exercised all three random selections.
