(() => {
  const art = document.getElementById('ascii-art');
  if (!art || art.dataset.variant !== 'swarm') return;

  // The same deterministic field supplies the animated and reduced-motion views.
  // Coordinates use character-width units; vertical distance is aspect-corrected.
  const width = 88;
  const height = 44;
  const ramp = ' .,:;irsXA253hMHGS#9B&@';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const seeds = [
    [22, 28, 5.8, 0.4], [48, 28, 5.1, 2.1],
    [67, 48, 6.0, 4.0], [25, 62, 4.7, 1.3],
    [60, 66, 4.5, 3.2], [72, 21, 3.5, 5.1],
    [42, 48, 3.3, 2.8],
  ];
  const smooth = (a, b, value) => {
    const x = Math.max(0, Math.min(1, (value - a) / (b - a)));
    return x * x * (3 - 2 * x);
  };
  let visible = !('IntersectionObserver' in window);
  let elapsed = 0;
  let last = null;
  let frame = null;

  function bodiesAt(time) {
    const cycle = time % 38;
    const bodies = seeds.map(([x, y, radius, phase], id) => ({
      x: x + 3.4 * Math.sin(time * 0.16 + phase),
      y: y + 3.8 * Math.cos(time * 0.13 + phase * 1.7),
      radius: radius * (1 + 0.095 * Math.sin(time * 1.05 + phase)),
      opacity: 1,
      phase,
      id,
    }));
    // Two independent bodies approach, share a surface, then become one.
    const partner = { x: bodies[1].x, y: bodies[1].y };
    const merge = smooth(8, 17, cycle);
    bodies[1].x += (bodies[0].x - bodies[1].x) * merge;
    bodies[1].y += (bodies[0].y - bodies[1].y) * merge;
    bodies[0].radius *= 1 + 0.19 * merge;
    bodies[1].opacity *= 1 - smooth(16, 19, cycle);
    // Re-form the partner near the end so the ecology continues without a cut.
    const rebirth = smooth(30, 37.8, cycle);
    if (cycle > 30) {
      bodies[1].x += (partner.x - bodies[1].x) * rebirth;
      bodies[1].y += (partner.y - bodies[1].y) * rebirth;
      bodies[1].opacity = rebirth;
      bodies[1].radius *= 0.2 + 0.8 * rebirth;
      bodies[0].radius /= 1 + 0.19 * rebirth;
    }
    // A separate life cycle: dissolve into dust, then condense elsewhere.
    const life = 1 - smooth(20, 25, cycle) + smooth(28, 34, cycle);
    bodies[4].opacity = life;
    bodies[4].radius *= 0.3 + 0.7 * life;
    bodies[4].x += 7 * (smooth(24, 28, cycle) - smooth(34, 38, cycle));
    return bodies;
  }

  function draw(time) {
    const bodies = bodiesAt(time);
    const pixels = new Float32Array(width * height);
    const put = (x, y, value) => {
      const col = Math.round(x);
      const row = Math.round(y / 2);
      if (col < 0 || col >= width || row < 0 || row >= height) return;
      const index = row * width + col;
      pixels[index] = Math.max(pixels[index], value);
    };
    // Sparse, nearly motionless background keeps the bodies suspended in space.
    for (let i = 0; i < 32; i++) {
      put((i * 37 + 11) % width, (i * 29 + 7) % (height * 2),
        0.055 + 0.035 * (0.5 + 0.5 * Math.sin(time * 0.3 + i)));
    }
    // A ripple expands after each signal and each lifecycle event.
    const ripple = (body, age, strength = 1) => {
      if (age < 0 || age > 5.5) return;
      const radius = body.radius + 1 + age * 2.4;
      const opacity = (1 - age / 5.5) * 0.2 * strength;
      for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
        put(body.x + Math.cos(angle) * radius,
          body.y + Math.sin(angle) * radius, opacity);
      }
    };
    // Packets trace a bowed path, rather than drawing a permanent network.
    const signalIndex = Math.floor(time / 5.5);
    const signalAge = time % 5.5;
    const pairs = [[0, 2], [5, 6], [3, 0], [2, 5], [6, 3]];
    const [source, target] = pairs[signalIndex % pairs.length];
    const from = bodies[source];
    const to = bodies[target];
    ripple(from, signalAge);
    if (signalAge < 3.8) {
      const progress = signalAge / 3.8;
      for (let tail = 0; tail < 9; tail++) {
        const p = progress - tail * 0.022;
        if (p < 0) continue;
        put(from.x + (to.x - from.x) * p,
          from.y + (to.y - from.y) * p + Math.sin(p * Math.PI) * 6,
          0.56 * (1 - tail / 10));
      }
    }
    if (signalAge > 3.8) ripple(to, signalAge - 3.8, 1.2);
    const cycle = time % 38;
    ripple(bodies[0], cycle - 17, 1.4);
    ripple(bodies[4], cycle - 24, 1.3);
    ripple(bodies[4], cycle - 29, 1.4);
    ripple(bodies[1], cycle - 32, 1.2);

    // Smooth implicit surfaces make approaching agents fuse organically.
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let field = 0;
        let nearest = null;
        let nearestDistance = Infinity;
        for (const body of bodies) {
          if (body.opacity < 0.01) continue;
          const dx = col - body.x;
          const dy = row * 2 - body.y;
          const angle = Math.atan2(dy, dx);
          const radius = body.radius * (1 + 0.07 * Math.sin(angle * 3 + time * 0.45 + body.phase));
          const distance = (dx * dx + dy * dy) / (radius * radius);
          field += Math.exp(-distance * 1.8) * body.opacity;
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = body;
          }
        }
        if (field < 0.165 || !nearest) continue;
        const depth = Math.sqrt(Math.max(0, 1 - nearestDistance));
        const light = 0.29 + depth * 0.55
          - (col - nearest.x) / nearest.radius * 0.13
          - (row * 2 - nearest.y) / nearest.radius * 0.17;
        const edge = smooth(0.165, 0.3, field);
        // Dissolving bodies become a sparse cloud before disappearing.
        const grain = (Math.sin(col * 127.1 + row * 311.7) * 43758.5453) % 1;
        if (nearest.opacity < 0.8 && Math.abs(grain) > nearest.opacity) continue;
        const index = row * width + col;
        pixels[index] = Math.max(pixels[index], Math.max(0.07, light * edge) * nearest.opacity);
      }
    }
    const lines = [];
    for (let row = 0; row < height; row++) {
      let line = '';
      for (let col = 0; col < width; col++) {
        line += ramp[Math.min(ramp.length - 1, Math.floor(pixels[row * width + col] * (ramp.length - 1)))];
      }
      lines.push(line);
    }
    art.textContent = lines.join('\n');
  }

  function tick(now) {
    frame = null;
    if (!visible || document.hidden || motion.matches) { last = null; return; }
    frame = requestAnimationFrame(tick);
    if (last !== null && now - last < 80) return;
    if (last !== null) elapsed += Math.min((now - last) / 1000, 0.16);
    last = now;
    draw(elapsed);
  }
  function resume() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    last = null;
    if (motion.matches) { draw(0); return; }
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
  draw(0);
  resume();
})();
