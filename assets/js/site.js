(() => {
  const art = document.getElementById('ascii-art');
  if (art && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const width = 70,
      height = 36,
      ramp = ' .,:;irsXA253hMHGS#9B&@';
    let angle = 0,
      last = 0,
      visible = true,
      pointer = 0;
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }).observe(art);
    art.parentElement.addEventListener('pointermove', (event) => {
      const box = art.getBoundingClientRect();
      pointer = ((event.clientX - box.left) / box.width - 0.5) * 0.5;
    });
    function render(time) {
      requestAnimationFrame(render);
      if (!visible || document.hidden || time - last < 90) return;
      last = time;
      angle += 0.012;
      const cells = Array(width * height).fill(' '),
        depths = Array(width * height).fill(-100);
      const spin = angle + pointer,
        ca = Math.cos(spin),
        sa = Math.sin(spin);
      for (let v = 0; v < Math.PI; v += 0.035)
        for (let u = 0; u < Math.PI * 2; u += 0.035) {
          const radius =
            1 + 0.13 * Math.sin(6 * u + angle * 2) * Math.sin(4 * v);
          let x = radius * Math.sin(v) * Math.cos(u),
            y = radius * Math.cos(v),
            z = radius * Math.sin(v) * Math.sin(u);
          const xx = x * ca + z * sa,
            zz = -x * sa + z * ca;
          const yy = y * 0.94 - zz * 0.34,
            depth = y * 0.34 + zz * 0.94;
          const scale = 1 / (3.8 - depth);
          const col = Math.floor(width / 2 + xx * scale * 82),
            row = Math.floor(height / 2 + yy * scale * 39);
          if (col < 0 || col >= width || row < 0 || row >= height) continue;
          const index = row * width + col;
          if (depth > depths[index]) {
            depths[index] = depth;
            const light = Math.max(
              0.08,
              Math.min(1, 0.34 + depth * 0.38 - yy * 0.3 + xx * 0.1),
            );
            cells[index] = ramp[Math.floor(light * (ramp.length - 1))];
          }
        }
      let result = '';
      for (let row = 0; row < height; row++)
        result += cells.slice(row * width, (row + 1) * width).join('') + '\n';
      art.textContent = result;
    }
    requestAnimationFrame(render);
  }
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
