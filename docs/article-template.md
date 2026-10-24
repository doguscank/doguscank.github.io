# Article authoring template

Copy the front matter and body below into `_posts/YYYY-MM-DD-stable-slug.md` only
when the text and assets are approved for the public repository. Fill every
required field; do not commit the placeholders as an article. Keep drafts outside
this repository, even if marked `published: false`.

```yaml
---
title: "Approved title"
description: "A concise, accurate description."
date: YYYY-MM-DD HH:MM:SS +0300
permalink: /posts/stable-slug/
author: doguscank
categories: [Visual Research]
tags: [domain-adaptation]
toc: true
math: false
mermaid: false
# Optional, only for a substantive update on its actual date:
# last_modified_at: YYYY-MM-DD HH:MM:SS +0300
# Optional cover (include meaningful alt text and credit in body):
# image:
#   path: /assets/img/stable-slug/cover.png
#   alt: "What the figure shows"
# Optional series membership:
# series: domain-adaptation
# series_order: 1
---
```

Choose one primary category: Visual Research, Multimodal AI, or AI Engineering.
Use a fixed permalink even when changing the title. Dates are actual publication
times; Jekyll excludes future dates. The updated date is explicit, never inferred
from an incidental source commit. The article interface does not display a reading-time estimate.

Use this sequence as an authoring aid, adapting headings to the article:

1. Problem or question.
2. Concrete example.
3. Explanation.
4. Evidence or experiment.
5. Practical implication.
6. Limitations.
7. References and figure credits.
8. Next series question, when applicable.

Distinguish your results, reported results from cited authors, and explanatory
illustrations. State experimental conditions and limitations. Cite sources near
claims. Do not infer missing comparisons from a benchmark table.

Figures go in `assets/img/stable-slug/`. Verify redistribution rights first;
open access alone does not grant figure reuse permission. Keep the creator,
source, license and any modifications visible in a caption:

```html
<figure>
  <img src="/assets/img/stable-slug/figure.png"
       alt="A precise description of the relevant visual evidence">
  <figcaption>What this figure establishes. Source: AUTHOR,
    <a href="https://SOURCE">WORK</a>, LICENSE; modifications: DETAILS.</figcaption>
</figure>
```

Use fenced code blocks with a language, `$$...$$` for display mathematics with
`math: true`, and fenced `mermaid` blocks with `mermaid: true`. Use Markdown tables;
the native theme wraps wide tables for horizontal scrolling.

Series metadata lives in `_data/series.yml`. A post's `series` matches a registry
key, and `series_order` is a unique positive integer. All navigation comes from
published `site.posts`, ordered by that integer. To publish a series landing page,
set `published: true` and add an approved `introduction` to its data entry. The
shared include adds chapters and previous/next links automatically. Until then,
there is no landing page, feature, or series link. Never add draft prose to that
registry. Planned chapters are omitted in V1.
