# Doğuş Can Korkmaz — personal website

An English, article-first site using [Chirpy Starter](https://github.com/cotes2020/chirpy-starter)
and Jekyll. Home and Articles share `site.posts`; there are no demo articles.
Public copy follows the owner-supplied website content document (24 October 2026).
Home uses a compact selection; About contains the fuller bio, experience and education.

## Preview locally

Install Ruby **3.4.9** and Bundler, then:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open <http://127.0.0.1:4000>. For a production build and internal-link check:

```sh
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
```

Without a local Ruby installation, use Docker:

```sh
docker run --rm --user "$(id -u):$(id -g)" \
  -e BUNDLE_PATH=/site/vendor/bundle -e BUNDLE_USER_HOME=/tmp/bundle \
  -v "$PWD:/site" -w /site ruby:3.4.9-bookworm bundle install
docker run --rm --user "$(id -u):$(id -g)" \
  -e BUNDLE_PATH=/site/vendor/bundle -e BUNDLE_USER_HOME=/tmp/bundle \
  -v "$PWD:/site" -w /site -p 127.0.0.1:4000:4000 \
  ruby:3.4.9-bookworm bundle exec jekyll serve --host 0.0.0.0
```

`Gemfile` pins the theme and link checker; `Gemfile.lock` pins transitive gems.
Commit lockfile changes intentionally. The interface CSS and JavaScript are local and use system fonts. Optional
equations and Mermaid diagrams load versioned browser libraries from a CDN.

## Publish an article

Follow [the authoring template](docs/article-template.md). Add approved Markdown
and licensed assets; no navigation edits are needed. Initial categories are
Visual Research, Multimodal AI and AI Engineering. Do not commit private drafts,
unapproved claims, employer material or a public email address without approval.
The six-part domain adaptation series remains an editorial plan outside this
public repository. Its registry is disabled until its introduction is approved.

## Review and deploy

Push the review branch and open a PR when ready. `Validate site` builds and checks
internal links without publishing. Its `site-preview` artifact contains static
HTML; serve that folder with `python3 -m http.server` to review it.

After owner review and explicit publication approval:

1. Merge the reviewed change into `main`.
2. In repository Settings → Pages, select GitHub Actions as the source.
3. Run **Publish reviewed site** on `main` and check the approval input.
4. Confirm Home, Articles, About, 404, search, `/feed.xml`, `/sitemap.xml`, canonical
   URLs and HTTPS at `https://doguscank.github.io`.

The deployment workflow has no push trigger. A protected `github-pages`
environment with required reviewers can add a repository-level review gate.
No custom domain, analytics, comments or public email is configured.

To roll back, revert the faulty merge on `main`, let validation pass, review the
result and manually publish again. Keep article permalinks stable.

## Later custom domain

After acquiring and verifying a domain, use GitHub's
[custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
Verify ownership first, configure Pages and DNS, enable HTTPS, and change `url`
in `_config.yml`. Keep `baseurl: ""` and existing article paths. Rebuild and check
canonical tags, social metadata, sitemap and RSS against the new origin. Do not
connect a domain merely because its name is available.

## Visual layer

The owner requested a custom black-and-white, ASCII-led direction after reviewing
Chirpy's default appearance. Jekyll and the pinned theme remain the publishing
foundation; the public UI uses project-owned layouts instead of the sidebar UI.

- `_layouts/shell.html`: SEO, top navigation, footer and static asset loading.
- `_layouts/home.html`: typographic hero, procedural ASCII study, projects,
  research diagram, writing and contact.
- `assets/css/site.css`: responsive, exclusively grayscale interface.
- `assets/js/site.js`: ASCII animation, reduced-motion support, article contents
  and published-article search. No JavaScript framework or animation dependency.
- `_layouts/page.html` and `_layouts/post.html`: matching document and article
  views. Posts support code, MathJax, Mermaid and generated contents navigation.
- `_plugins/series.rb` and `_includes/series-nav.html`: approved-only series
  landing pages and ordered chapter navigation.

The ASCII graphics are procedural illustrations, not experimental results.
The hero responds subtly to pointer position and stops rendering when offscreen.
Reduced-motion users receive static artwork. Research images keep source colors;
the site interface and decorative diagrams are monochrome.

Content lives in `_data/profile.yml`, `_data/projects.yml` and `_tabs/about.md`.
Only public copy/factual records from the owner-supplied website content file
were selected. Keep its internal notes outside the repository.

Starter baseline: `beffc88713242da8bf49325674be38d171071213`.
Theme: `7.6.0` (MIT). Retain `LICENSE` for upstream code; article and figure rights
are separate. On upgrades, resolve a new lockfile and repeat production, article
fixture and responsive browser QA.
