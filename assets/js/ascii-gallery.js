(() => {
  const art = document.getElementById('ascii-art');
  if (!art) return;
  const variants = [
    ['sculpture', 'FIG. 001 / LATENT GEOMETRY', 'PROCEDURAL ASCII STUDY',
      'POINTS → REPRESENTATION', 'A slowly rotating ASCII sculpture.'],
    ['flow', 'FIG. 002 / AGENT ORCHESTRATION', 'ILLUSTRATIVE AGENT WORKFLOW',
      'PLAN → ACT → REVIEW', 'An illustrative agent workflow: a planner delegates to research and coding agents; tools and knowledge feed a reviewer and a final response.'],
    ['swarm', 'FIG. 003 / AGENT ECOLOGY', 'AUTONOMOUS BODIES / SHARED SPACE',
      'SIGNAL · MERGE · EMERGE', 'An artistic agent swarm: breathing ASCII bodies drift in space, exchange signals, merge, dissolve, and emerge with expanding ripples.'],
  ];
  const [variant, title, caption, detail, description] =
    variants[Math.floor(Math.random() * variants.length)];
  const template = document.getElementById('ascii-' + variant).content.textContent;
  art.dataset.variant = variant;
  art.textContent = template;
  document.getElementById('ascii-title').textContent = title;
  document.getElementById('ascii-caption').textContent = caption;
  document.getElementById('ascii-detail').textContent = detail;
  art.closest('figure').setAttribute('aria-label', description);
  if (variant === 'swarm') return;

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = !('IntersectionObserver' in window);
  let last = null;
  let frame = null;
  let angle = 0;
  let stage = 0;
  let pointer = 0;
  art.parentElement.addEventListener('pointermove', (event) => {
    const box = art.getBoundingClientRect();
    pointer = ((event.clientX - box.left) / box.width - 0.5) * 0.5;
  });
  const stages = [
    ['PLANNER AGENT', 'PLANNING THE TASK'],
    ['RESEARCH AGENT', 'GATHERING CONTEXT'],
    ['CODE AGENT', 'WORKING WITH TOOLS'],
    ['REVIEWER AGENT', 'REVIEWING THE RESULT'],
    ['FINAL RESPONSE', 'RESPONSE READY'],
  ];
  function drawSculpture() {
    const width = 70, height = 36;
    const ramp = ' .,:;irsXA253hMHGS#9B&@';
    const cells = Array(width * height).fill(' ');
    const depths = Array(width * height).fill(-100);
    const ca = Math.cos(angle + pointer), sa = Math.sin(angle + pointer);
    for (let v = 0; v < Math.PI; v += 0.035) {
      for (let u = 0; u < Math.PI * 2; u += 0.035) {
        const radius = 1 + 0.13 * Math.sin(6 * u + angle * 2) * Math.sin(4 * v);
        const x = radius * Math.sin(v) * Math.cos(u);
        const y = radius * Math.cos(v);
        const z = radius * Math.sin(v) * Math.sin(u);
        const xx = x * ca + z * sa, zz = -x * sa + z * ca;
        const yy = y * 0.94 - zz * 0.34, depth = y * 0.34 + zz * 0.94;
        const scale = 1 / (3.8 - depth);
        const col = Math.floor(width / 2 + xx * scale * 82);
        const row = Math.floor(height / 2 + yy * scale * 39);
        if (col < 0 || col >= width || row < 0 || row >= height) continue;
        const index = row * width + col;
        if (depth <= depths[index]) continue;
        depths[index] = depth;
        const light = Math.max(0.08, Math.min(1, 0.34 + depth * 0.38 - yy * 0.3 + xx * 0.1));
        cells[index] = ramp[Math.floor(light * (ramp.length - 1))];
      }
    }
    art.textContent = Array.from({ length: height }, (_, row) =>
      cells.slice(row * width, (row + 1) * width).join('')).join('\n');
  }
  function tick(now) {
    frame = null;
    if (!visible || document.hidden || motion.matches) { last = null; return; }
    frame = requestAnimationFrame(tick);
    const delay = variant === 'flow' ? 1600 : 90;
    if (last !== null && now - last < delay) return;
    last = now;
    if (variant === 'sculpture') {
      angle += 0.012;
      drawSculpture();
    } else {
      const [label, status] = stages[stage++ % stages.length];
      art.textContent = template.replace(' ' + label, '>' + label)
        .replace('READY FOR THE NEXT TASK', status);
    }
  }
  function resume() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    last = null;
    if (motion.matches) { art.textContent = template; return; }
    if (visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    }).observe(art);
  }
  motion.addEventListener('change', resume);
  document.addEventListener('visibilitychange', resume);
  resume();
})();
