(() => {
  const toc = document.getElementById('article-toc');
  if (toc)
    document
      .querySelectorAll('.article-body h2,.article-body h3')
      .forEach((heading, index) => {
        if (!heading.id) heading.id = 'section-' + index;
        const li = document.createElement('li'),
          link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        li.append(link);
        toc.append(li);
      });
  const input = document.getElementById('article-search');
  if (input) {
    const library = document.getElementById('article-library'),
      results = document.getElementById('search-results'),
      status = document.getElementById('search-status');
    let posts;
    input.addEventListener('input', async () => {
      const query = input.value.trim().toLowerCase();
      results.replaceChildren();
      library.hidden = !!query;
      status.textContent = '';
      if (!query) return;
      try {
        posts ??= await fetch('/assets/js/data/search.json').then((r) => {
          if (!r.ok) throw Error('Search unavailable');
          return r.json();
        });
        if (input.value.trim().toLowerCase() !== query) return;
        const matches = posts.filter((p) =>
          [p.title, p.content, p.categories, p.tags]
            .join(' ')
            .toLowerCase()
            .includes(query),
        );
        status.textContent = matches.length
          ? `${matches.length} result${matches.length === 1 ? '' : 's'}`
          : 'No matching articles.';
        matches.forEach((post) => {
          const item = document.createElement('article'),
            heading = document.createElement('h2'),
            link = document.createElement('a');
          item.className = 'search-result';
          link.href = post.url;
          link.textContent = post.title;
          heading.append(link);
          item.append(heading);
          results.append(item);
        });
      } catch {
        status.textContent = 'Search could not load. Please try again.';
        library.hidden = false;
      }
    });
  }
})();
