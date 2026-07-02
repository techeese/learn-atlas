/* ============================================================
   ATLAS — Interactive Visualization Lab
   Self-contained canvas widgets. Register with VIZUtil.register.
   Embed in a lesson with: <div data-viz="ID"></div>
   App calls VIZ[id](container) to hydrate; VIZUtil.stopAll() on nav.
   ============================================================ */
(function () {
  "use strict";
  const VIZ = {}, CATALOG = [];
  function register(meta, fn) {
    // Wrap the widget so that after it mounts, ANY canvas left without an accessible
    // name gets a sensible fallback (role=img + aria-label from the registered title/
    // blurb). Widgets that set their own bespoke aria-label keep it (we only fill gaps),
    // so screen-reader users get a meaningful description of every visualization.
    VIZ[meta.id] = function (container) {
      const r = fn(container);
      try {
        const cs = (container && container.querySelectorAll) ? container.querySelectorAll('canvas') : [];
        for (let i = 0; i < cs.length; i++) {
          const cv = cs[i];
          if (!cv.getAttribute('aria-label') && !cv.getAttribute('aria-labelledby')) {
            cv.setAttribute('role', 'img');
            cv.setAttribute('aria-label', meta.title + (meta.blurb ? '. ' + meta.blurb : ''));
          }
        }
      } catch (e) {}
      return r;
    };
    CATALOG.push(meta);
  }

  function cssVar(n, fb) { const v = getComputedStyle(document.documentElement).getPropertyValue(n).trim(); return v || fb; }
  function P() {
    return {
      ink: cssVar('--ink', '#f1e8da'), soft: cssVar('--ink-soft', '#cabfae'), mute: cssVar('--ink-mute', '#968871'),
      gold: cssVar('--gold', '#e0a458'), sage: cssVar('--sage', '#88a37a'), rust: cssVar('--rust', '#d2715a'),
      violet: cssVar('--violet', '#9a8bc4'), line: cssVar('--line', '#3a302a'), panel: cssVar('--panel', '#211c19'),
      bg: cssVar('--bg', '#141110'), panel2: cssVar('--panel-2', '#2a231f')
    };
  }
  function el(tag, cls, parent) { const e = document.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; }
  function canvas(parent, w, h) {
    const c = el('canvas', 'viz-canvas', parent);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.style.width = w + 'px';   // height left to CSS (height:auto) so the canvas scales proportionally on narrow screens
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    return { c, ctx, w, h };
  }
  function controls(parent) { return el('div', 'viz-controls', parent); }
  function slider(parent, o) {
    const wrap = el('label', 'viz-slider', parent);
    el('span', 'viz-slab', wrap).textContent = o.label;
    const inp = el('input', null, wrap); inp.type = 'range'; inp.min = o.min; inp.max = o.max; inp.step = o.step != null ? o.step : 1; inp.value = o.value;
    inp.setAttribute('aria-label', o.label);                 // accessible name for screen readers
    const val = el('span', 'viz-sval', wrap);
    const upd = () => { const txt = o.fmt ? o.fmt(parseFloat(inp.value)) : inp.value; val.textContent = txt; inp.setAttribute('aria-valuetext', String(txt)); };
    inp.addEventListener('input', () => { upd(); o.onInput(parseFloat(inp.value)); }); upd();
    return inp;
  }
  function button(parent, label, fn, cls) { const b = el('button', 'viz-btn ' + (cls || ''), parent); b.innerHTML = label; b.addEventListener('click', fn); return b; }
  function select(parent, o) {
    const wrap = el('label', 'viz-select', parent);
    el('span', 'viz-slab', wrap).textContent = o.label;
    const s = el('select', null, wrap);
    o.options.forEach(op => { const e = el('option', null, s); e.value = op.value; e.textContent = op.label; });
    s.value = o.value; s.addEventListener('change', () => o.onChange(s.value)); return s;
  }
  function note(parent) { return el('div', 'viz-note', parent); }

  const loops = new Set();
  function loop(step) {
    let raf, run = true;
    const f = (t) => { if (!run) return; step(t); raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    const h = { stop() { run = false; cancelAnimationFrame(raf); loops.delete(h); } };
    loops.add(h); return h;
  }
  function stopAll() { loops.forEach(h => h.stop()); loops.clear(); }
  function pointer(c, w, h, ev) {
    const r = c.getBoundingClientRect(); const t = ev.touches ? ev.touches[0] : ev;
    return { x: (t.clientX - r.left) * (w / r.width), y: (t.clientY - r.top) * (h / r.height) };
  }
  function arrow(ctx, x1, y1, x2, y2, color, lw) {
    lw = lw || 2.5; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1), s = 9 + lw;
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4));
    ctx.lineTo(x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4));
    ctx.closePath(); ctx.fill();
  }

  // keyboard operation for drag-based widgets (a11y): focus the canvas, then arrow keys nudge the first
  // vector and Shift+arrows the second (snap to the same ½-grid as dragging). getItems() returns the live
  // vector objects so it survives widgets that reassign them on a preset.
  function dragKeys(c, getItems, redraw) {
    c.tabIndex = 0;
    c.addEventListener('keydown', function (e) {
      const M = { ArrowLeft: [-0.5, 0], ArrowRight: [0.5, 0], ArrowUp: [0, 0.5], ArrowDown: [0, -0.5] };
      const d = M[e.key]; if (!d) return;
      const items = getItems(); if (!items || !items.length) return;
      const v = items[e.shiftKey && items.length > 1 ? 1 : 0]; if (!v) return;
      const clamp = n => Math.max(-7, Math.min(7, Math.round(n * 2) / 2));
      v.x = clamp(v.x + d[0]); v.y = clamp(v.y + d[1]);
      e.preventDefault(); redraw();
    });
  }

  window.VIZ = VIZ; window.VIZ_CATALOG = CATALOG;
  window.VIZUtil = { register, P, el, canvas, controls, slider, button, select, note, loop, stopAll, pointer, arrow, dragKeys };

  /* ========================================================
     1. Vector addition (drag the tips)
     ======================================================== */
  register({ id: 'la-vector-add', topic: 'linear-algebra', title: 'Vector Addition', blurb: 'Drag two vectors and watch them add tip-to-tail, tracing a parallelogram.' },
  function (root) {
    const W = 540, H = 360, S = 38, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const info = note(root);
    let u = { x: 2, y: 1 }, v = { x: -1, y: 2 }, drag = null;
    const toPx = p => ({ x: cx + p.x * S, y: cy - p.y * S });
    const toMath = p => ({ x: (p.x - cx) / S, y: (cy - p.y) / S });
    function near(mp, vec) { const a = toPx(vec); return Math.hypot(a.x - mp.x, a.y - mp.y) < 16; }
    function down(ev) { const m = pointer(c, W, H, ev); if (near(m, u)) drag = 'u'; else if (near(m, v)) drag = 'v'; if (drag) ev.preventDefault(); }
    function move(ev) { if (!drag) return; const m = toMath(pointer(c, W, H, ev)); const g = x => Math.round(x * 2) / 2; (drag === 'u' ? u : v).x = g(m.x); (drag === 'u' ? u : v).y = g(m.y); draw(); ev.preventDefault(); }
    function up() { drag = null; }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let x = cx % S; x < W; x += S) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = cy % S; y < H; y += S) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      const w = { x: u.x + v.x, y: u.y + v.y };
      const O = { x: cx, y: cy }, U = toPx(u), V = toPx(v), Wp = toPx(w);
      ctx.setLineDash([5, 5]); ctx.strokeStyle = p.mute; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(U.x, U.y); ctx.lineTo(Wp.x, Wp.y); ctx.moveTo(V.x, V.y); ctx.lineTo(Wp.x, Wp.y); ctx.stroke(); ctx.setLineDash([]);
      arrow(ctx, O.x, O.y, Wp.x, Wp.y, p.violet, 3);
      arrow(ctx, O.x, O.y, U.x, U.y, p.gold, 3);
      arrow(ctx, O.x, O.y, V.x, V.y, p.sage, 3);
      info.innerHTML = `<b style="color:${p.gold}">u</b> = (${u.x}, ${u.y}) &nbsp; <b style="color:${p.sage}">v</b> = (${v.x}, ${v.y}) &nbsp; → &nbsp; <b style="color:${p.violet}">u + v</b> = (${w.x}, ${w.y})`;
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Vector addition: two draggable vectors u and v from the origin, added tip-to-tail to form u + v with a parallelogram. Focus this canvas and use the arrow keys to move u, Shift+arrow keys to move v.');
    dragKeys(c, () => [u, v], draw);   // keyboard a11y: arrows move u, Shift+arrows move v
    draw();
  });

  /* ========================================================
     2. Linear transformation of space (the showcase)
     ======================================================== */
  register({ id: 'la-linear-transform', topic: 'linear-algebra', title: 'Matrices Transform Space', blurb: 'Set a 2×2 matrix and watch the grid, basis vectors, and unit area morph. Determinant = area scale.' },
  function (root) {
    const W = 540, H = 380, S = 30, cx = W / 2, cy = H / 2, R = 9;
    const { c, ctx } = canvas(root, W, H);
    let M = [1, 0, 0, 1], t = 1, anim = null;
    const ctl = controls(root), info = note(root);
    const ix = ['a', 'b', 'c', 'd'];
    const sliders = ix.map((nm, i) => slider(ctl, { label: nm, min: -2, max: 2, step: 0.1, value: M[i], fmt: x => x.toFixed(1), onInput: x => { M[i] = x; t = 1; draw(); } }));
    function setM(m) { M = m.slice(); sliders.forEach((s, i) => { s.value = M[i]; s.parentNode.querySelector('.viz-sval').textContent = M[i].toFixed(1); }); t = 0; if (anim) anim.stop(); anim = loop(() => { t = Math.min(1, t + 0.03); draw(); if (t >= 1 && anim) { anim.stop(); anim = null; } }); }
    const pre = controls(root);
    button(pre, 'Identity', () => setM([1, 0, 0, 1]));
    button(pre, 'Rotate 90°', () => setM([0, -1, 1, 0]));
    button(pre, 'Shear', () => setM([1, 1, 0, 1]));
    button(pre, 'Scale 1.5×', () => setM([1.5, 0, 0, 1.5]));
    button(pre, 'Reflect', () => setM([1, 0, 0, -1]));
    button(pre, 'Singular', () => setM([1, 2, 2, 4]));
    function curM() { return [1 + (M[0] - 1) * t, M[1] * t, M[2] * t, 1 + (M[3] - 1) * t]; }
    const ap = (m, x, y) => ({ x: cx + (m[0] * x + m[1] * y) * S, y: cy - (m[2] * x + m[3] * y) * S });
    function draw() {
      const p = P(), m = curM(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let k = -R; k <= R; k++) { const a = ap([1, 0, 0, 1], k, -R), b = ap([1, 0, 0, 1], k, R), e = ap([1, 0, 0, 1], -R, k), f = ap([1, 0, 0, 1], R, k); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.moveTo(e.x, e.y); ctx.lineTo(f.x, f.y); ctx.stroke(); }
      ctx.strokeStyle = p.gold + '66'; ctx.lineWidth = 1.4;
      for (let k = -R; k <= R; k++) { const a = ap(m, k, -R), b = ap(m, k, R), e = ap(m, -R, k), f = ap(m, R, k); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.moveTo(e.x, e.y); ctx.lineTo(f.x, f.y); ctx.stroke(); }
      const det = m[0] * m[3] - m[1] * m[2];
      const o = ap(m, 0, 0), i1 = ap(m, 1, 0), j1 = ap(m, 0, 1), ij = ap(m, 1, 1);
      ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(i1.x, i1.y); ctx.lineTo(ij.x, ij.y); ctx.lineTo(j1.x, j1.y); ctx.closePath();
      ctx.fillStyle = (det < 0 ? p.rust : p.sage) + '33'; ctx.fill();
      arrow(ctx, o.x, o.y, i1.x, i1.y, p.gold, 3);
      arrow(ctx, o.x, o.y, j1.x, j1.y, p.sage, 3);
      const dd = M[0] * M[3] - M[1] * M[2];
      info.innerHTML = `det = ${dd.toFixed(2)} &nbsp;·&nbsp; area scales ×${Math.abs(dd).toFixed(2)} ${dd < 0 ? '<span style="color:' + p.rust + '">· orientation flipped</span>' : ''} ${Math.abs(dd) < 0.01 ? '<span style="color:' + p.rust + '">· space collapsed (singular)</span>' : ''}`;
    }
    draw();
  });

  /* ========================================================
     3. Eigenvectors — directions that don't turn
     ======================================================== */
  register({ id: 'la-eigen', topic: 'linear-algebra', title: 'Eigenvectors', blurb: 'A probe vector sweeps the circle; its image traces an ellipse. Eigen-directions stay on their own line.' },
  function (root) {
    const W = 540, H = 380, S = 46, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    let M = [2, 1, 1, 2], th = 0, info = note(root);
    const pre = controls(root);
    button(pre, '[[2,1],[1,2]]', () => { M = [2, 1, 1, 2]; });
    button(pre, 'Shear', () => { M = [1, 1, 0, 1]; });
    button(pre, 'Scale x,2y', () => { M = [1, 0, 0, 2]; });
    button(pre, 'Rotation', () => { M = [0.7, -0.7, 0.7, 0.7]; });
    const ap = (x, y) => ({ x: M[0] * x + M[1] * y, y: M[2] * x + M[3] * y });
    const px = (x, y) => ({ x: cx + x * S, y: cy - y * S });
    function eig() {
      const T = M[0] + M[3], D = M[0] * M[3] - M[1] * M[2], disc = T * T - 4 * D;
      if (disc < -1e-9) return null;
      const sq = Math.sqrt(Math.max(0, disc)), l1 = (T + sq) / 2, l2 = (T - sq) / 2;
      const vec = l => { let vx, vy; if (Math.abs(M[1]) > 1e-6) { vx = M[1]; vy = l - M[0]; } else if (Math.abs(M[2]) > 1e-6) { vx = l - M[3]; vy = M[2]; } else { vx = 1; vy = 0; } const n = Math.hypot(vx, vy) || 1; return { x: vx / n, y: vy / n }; };
      return [{ l: l1, v: vec(l1) }, { l: l2, v: vec(l2) }];
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.5; ctx.beginPath();
      for (let a = 0; a <= 6.3; a += 0.05) { const q = px(Math.cos(a), Math.sin(a)); a === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); } ctx.stroke();
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2; ctx.beginPath();
      for (let a = 0; a <= 6.3; a += 0.05) { const im = ap(Math.cos(a), Math.sin(a)), q = px(im.x, im.y); a === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); } ctx.stroke();
      const E = eig();
      if (E) E.forEach(e => { ctx.setLineDash([6, 5]); ctx.strokeStyle = p.gold + 'aa'; ctx.lineWidth = 1.5; const a = px(e.v.x * 5, e.v.y * 5), b = px(-e.v.x * 5, -e.v.y * 5); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]); });
      const inp = { x: Math.cos(th), y: Math.sin(th) }, out = ap(inp.x, inp.y);
      const o = px(0, 0), ip = px(inp.x, inp.y), op = px(out.x, out.y);
      arrow(ctx, o.x, o.y, op.x, op.y, p.violet, 2.5);
      arrow(ctx, o.x, o.y, ip.x, ip.y, p.gold, 2.5);
      const aligned = Math.abs(inp.x * out.y - inp.y * out.x) < 0.06 * (Math.hypot(out.x, out.y) || 1);
      if (aligned) { ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(ip.x, ip.y, 7, 0, 7); ctx.fill(); }
      info.innerHTML = E
        ? `Eigenvalues: <b style="color:${p.gold}">λ₁ = ${E[0].l.toFixed(2)}</b>, <b style="color:${p.gold}">λ₂ = ${E[1].l.toFixed(2)}</b> — dashed lines are eigen-directions (input ∥ output).`
        : `Complex eigenvalues — a rotation, so <b>no real eigenvectors</b>: every direction turns.`;
    }
    draw();
    loop(() => { th += 0.012; if (th > 6.283) th -= 6.283; draw(); });
  });

  /* ========================================================
     4. The derivative — secant approaching the tangent
     ======================================================== */
  register({ id: 'calc-derivative', topic: 'calculus', title: 'The Derivative', blurb: 'Drag the point; shrink h and watch the secant line snap onto the tangent — the slope is f′(x).' },
  function (root) {
    const W = 540, H = 360, pad = 36;
    const { c, ctx } = canvas(root, W, H);
    const funcs = {
      'x²': { f: x => x * x, d: x => 2 * x, ymin: -1, ymax: 9 },
      'sin x': { f: x => Math.sin(x), d: x => Math.cos(x), ymin: -1.4, ymax: 1.4 },
      'x³ − 3x': { f: x => x ** 3 - 3 * x, d: x => 3 * x * x - 3, ymin: -4, ymax: 4 }
    };
    let key = 'x²', x0 = 1.2, h = 1.2, drag = false;
    const xmin = -3, xmax = 3;
    const ctl = controls(root);
    select(ctl, { label: 'f(x)', value: key, options: Object.keys(funcs).map(k => ({ value: k, label: k })), onChange: v => { key = v; draw(); } });
    slider(ctl, { label: 'h', min: 0.01, max: 2, step: 0.01, value: h, fmt: v => v.toFixed(2), onInput: v => { h = v; draw(); } });
    const info = note(root);
    const X = x => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
    const cur = () => funcs[key];
    const Y = y => { const f = cur(); return H - pad - (y - f.ymin) / (f.ymax - f.ymin) * (H - 2 * pad); };
    const invX = px => xmin + (px - pad) / (W - 2 * pad) * (xmax - xmin);
    function down(ev) { drag = true; move(ev); } function up() { drag = false; }
    function move(ev) { if (!drag) return; x0 = Math.max(xmin + .1, Math.min(xmax - .1, invX(pointer(c, W, H, ev).x))); draw(); ev.preventDefault && ev.preventDefault(); }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', e => { down(e); }, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    function draw() {
      const p = P(), f = cur(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, Y(0)); ctx.lineTo(W - pad, Y(0)); ctx.moveTo(X(0), pad); ctx.lineTo(X(0), H - pad); ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = xmin + i / 240 * (xmax - xmin), yy = f.f(x); const px = X(x), py = Y(yy); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
      const x1 = x0 + h, slope = f.d(x0), sec = (f.f(x1) - f.f(x0)) / (h || 1e-9);
      const tl = x => f.f(x0) + slope * (x - x0), sl = x => f.f(x0) + sec * (x - x0);
      ctx.strokeStyle = p.rust; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(X(xmin), Y(sl(xmin))); ctx.lineTo(X(xmax), Y(sl(xmax))); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(X(xmin), Y(tl(xmin))); ctx.lineTo(X(xmax), Y(tl(xmax))); ctx.stroke();
      [[x0, p.gold], [x1, p.rust]].forEach(([xx, col]) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(xx), Y(f.f(xx)), 5, 0, 7); ctx.fill(); });
      info.innerHTML = `at x = ${x0.toFixed(2)} &nbsp;·&nbsp; <b style="color:${p.gold}">f′(x) = ${slope.toFixed(2)}</b> (tangent) &nbsp;·&nbsp; <span style="color:${p.rust}">secant slope = ${sec.toFixed(2)}</span> &nbsp;→ they agree as h→0.`;
    }
    draw();
  });

  /* ========================================================
     5. Gradient descent — watch it roll, or overshoot
     ======================================================== */
  register({ id: 'calc-gradient-descent', topic: 'calculus', title: 'Gradient Descent', blurb: 'Roll a ball downhill with f′. Crank the learning rate too high and watch it overshoot and diverge.' },
  function (root) {
    const W = 540, H = 360, pad = 36;
    const { c, ctx } = canvas(root, W, H);
    const f = x => x ** 4 / 4 - x * x, df = x => x ** 3 - 2 * x;
    const xmin = -2.4, xmax = 2.4, ymin = -1.2, ymax = 2.2;
    let lr = 0.1, x = 1.9, traj = [1.9], runH = null;
    const ctl = controls(root);
    slider(ctl, { label: 'learning rate', min: 0.01, max: 0.6, step: 0.01, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; } });
    slider(ctl, { label: 'start x', min: -2.2, max: 2.2, step: 0.1, value: x, fmt: v => v.toFixed(1), onInput: v => { reset(v); } });
    const btns = controls(root);
    button(btns, 'Step', () => step());
    button(btns, '▶ Run', () => { if (runH) { runH.stop(); runH = null; } else { let n = 0; runH = loop(() => { if (n++ % 8 === 0) step(); }); } }, 'primary');
    button(btns, '↻ Reset', () => reset(traj[0]));
    const info = note(root);
    const X = xx => pad + (xx - xmin) / (xmax - xmin) * (W - 2 * pad);
    const Y = yy => H - pad - (Math.max(ymin, Math.min(ymax, yy)) - ymin) / (ymax - ymin) * (H - 2 * pad);
    function reset(v) { if (runH) { runH.stop(); runH = null; } x = v; traj = [v]; draw(); }
    function step() { const g = df(x); x = x - lr * g; if (Math.abs(x) > 6) { draw(true); if (runH) { runH.stop(); runH = null; } return; } traj.push(x); if (traj.length > 60) traj.shift(); draw(); }
    function draw(diverged) {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, Y(0)); ctx.lineTo(W - pad, Y(0)); ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const xx = xmin + i / 240 * (xmax - xmin); const px = X(xx), py = Y(f(xx)); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
      ctx.fillStyle = p.gold;
      traj.forEach((tx, i) => { ctx.globalAlpha = 0.25 + 0.75 * i / traj.length; ctx.beginPath(); ctx.arc(X(tx), Y(f(tx)), 3.5, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1; ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(x), Y(f(x)), 6.5, 0, 7); ctx.fill();
      info.innerHTML = diverged ? `<span style="color:${p.rust}"><b>Diverged!</b> learning rate ${lr.toFixed(2)} is too large — steps overshoot and blow up.</span>`
        : `step ${traj.length - 1} &nbsp;·&nbsp; x = ${x.toFixed(3)} &nbsp;·&nbsp; f′(x) = ${df(x).toFixed(3)} &nbsp;·&nbsp; minima at x = ±√2 ≈ ±1.414`;
    }
    draw();
  });

  /* ========================================================
     6. Sorting visualizer
     ======================================================== */
  register({ id: 'algo-sorting', topic: 'algorithms', title: 'Sorting Visualizer', blurb: 'Animate bubble / insertion / selection sort step by step and count the comparisons.' },
  function (root) {
    const W = 540, H = 300, N = 30;
    const { c, ctx } = canvas(root, W, H);
    let algo = 'bubble', arr = [], ops = [], work = [], idx = 0, runH = null, sorted = new Set(), cmp = 0, hi = {};
    const ctl = controls(root);
    select(ctl, { label: 'algorithm', value: algo, options: [{ value: 'bubble', label: 'Bubble' }, { value: 'insertion', label: 'Insertion' }, { value: 'selection', label: 'Selection' }], onChange: v => { algo = v; shuffle(); } });
    let speed = 18;
    slider(ctl, { label: 'speed', min: 1, max: 60, step: 1, value: speed, onInput: v => { speed = v; } });
    const btns = controls(root);
    button(btns, '▶ Play', () => { if (runH) { runH.stop(); runH = null; } else { let f = 0; runH = loop(() => { if (f++ % Math.max(1, Math.round(61 - speed)) === 0) tick(); }); } }, 'primary');
    button(btns, 'Step', () => tick());
    button(btns, '🔀 Shuffle', () => shuffle());
    const info = note(root);
    function gen(a) {
      const o = [], s = a.slice();
      if (algo === 'bubble') { for (let i = 0; i < s.length; i++) { for (let j = 0; j < s.length - 1 - i; j++) { o.push({ t: 'c', i: j, j: j + 1 }); if (s[j] > s[j + 1]) { [s[j], s[j + 1]] = [s[j + 1], s[j]]; o.push({ t: 's', i: j, j: j + 1 }); } } o.push({ t: 'd', k: s.length - 1 - i }); } }
      else if (algo === 'selection') { for (let i = 0; i < s.length; i++) { let m = i; for (let j = i + 1; j < s.length; j++) { o.push({ t: 'c', i: m, j: j }); if (s[j] < s[m]) m = j; } if (m !== i) { [s[i], s[m]] = [s[m], s[i]]; o.push({ t: 's', i: i, j: m }); } o.push({ t: 'd', k: i }); } }
      else { for (let i = 1; i < s.length; i++) { let j = i; while (j > 0) { o.push({ t: 'c', i: j - 1, j: j }); if (s[j - 1] > s[j]) { [s[j - 1], s[j]] = [s[j], s[j - 1]]; o.push({ t: 's', i: j - 1, j: j }); j--; } else break; } } o.push({ t: 'd', k: -1 }); }
      return o;
    }
    function shuffle() { if (runH) { runH.stop(); runH = null; } arr = Array.from({ length: N }, () => 0.1 + Math.random() * 0.9); work = arr.slice(); ops = gen(arr); idx = 0; sorted = new Set(); cmp = 0; hi = {}; draw(); }
    function tick() {
      if (idx >= ops.length) { if (runH) { runH.stop(); runH = null; } sorted = new Set(work.map((_, i) => i)); hi = {}; draw(); return; }
      const op = ops[idx++]; hi = {};
      if (op.t === 'c') { cmp++; hi = { [op.i]: 'c', [op.j]: 'c' }; }
      else if (op.t === 's') { [work[op.i], work[op.j]] = [work[op.j], work[op.i]]; hi = { [op.i]: 's', [op.j]: 's' }; }
      else if (op.t === 'd' && op.k >= 0) sorted.add(op.k);
      draw();
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const bw = W / N;
      work.forEach((v, i) => { const h = v * (H - 30), col = sorted.has(i) ? p.sage : hi[i] === 's' ? p.rust : hi[i] === 'c' ? p.gold : p.soft; ctx.fillStyle = col; ctx.fillRect(i * bw + 1, H - h, bw - 2, h); });
      info.innerHTML = `${algo} sort &nbsp;·&nbsp; comparisons: <b>${cmp}</b> &nbsp;·&nbsp; ${idx >= ops.length ? '<span style="color:' + p.sage + '">done ✓</span>' : 'step ' + idx + ' / ' + ops.length}`;
    }
    shuffle();
  });

  /* ========================================================
     7. Big-O growth curves
     ======================================================== */
  register({ id: 'algo-bigo', topic: 'algorithms', title: 'Big-O Growth', blurb: 'See how O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) diverge as input grows.' },
  function (root) {
    const W = 540, H = 340, pad = 40;
    const { c, ctx } = canvas(root, W, H);
    const fns = [
      { name: 'O(1)', f: () => 1, col: '--sage' },
      { name: 'O(log n)', f: n => Math.log2(n), col: '--violet' },
      { name: 'O(n)', f: n => n, col: '--ink-soft' },
      { name: 'O(n log n)', f: n => n * Math.log2(n), col: '--gold' },
      { name: 'O(n²)', f: n => n * n, col: '--rust' },
      { name: 'O(2ⁿ)', f: n => Math.pow(2, n), col: '--rust' }
    ];
    let nmax = 32, logY = false, nsel = 16;
    const ctl = controls(root);
    slider(ctl, { label: 'n', min: 4, max: 64, step: 1, value: nsel, onInput: v => { nsel = v; draw(); } });
    button(ctl, 'Linear / Log Y', () => { logY = !logY; draw(); });
    const info = note(root);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const ymaxLin = nmax * nmax, X = n => pad + n / nmax * (W - 2 * pad);
      const Y = y => { if (logY) { const v = Math.log10(Math.max(1, y)); return H - pad - v / Math.log10(Math.pow(2, nmax)) * (H - 2 * pad); } return H - pad - Math.min(y, ymaxLin) / ymaxLin * (H - 2 * pad); };
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.strokeRect(pad, pad, W - 2 * pad, H - 2 * pad);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(X(nsel), pad); ctx.lineTo(X(nsel), H - pad); ctx.stroke(); ctx.setLineDash([]);
      let rows = '';
      fns.forEach((fn, k) => {
        const col = cssVar(fn.col, '#ccc'); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
        for (let n = 1; n <= nmax; n += 0.5) { const px = X(n), py = Y(fn.f(n)); n === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
        const val = fn.f(nsel); rows += `<span style="color:${col}">${fn.name} = ${val > 1e6 ? val.toExponential(1) : Math.round(val)}</span>`;
      });
      info.innerHTML = `at n = ${nsel}: &nbsp; ` + ['', ''].join('') + Array.from(fns).map((fn) => { const col = cssVar(fn.col, '#ccc'); const v = fn.f(nsel); return `<span style="color:${col}">${fn.name} ${v > 1e6 ? v.toExponential(1) : Math.round(v)}</span>`; }).join(' &nbsp;·&nbsp; ');
    }
    draw();
  });

  /* ========================================================
     62. The Master Theorem — which level of the recursion tree dominates (Algorithms)
     ======================================================== */
  register({ id: 'algo-master-theorem', topic: 'algorithms', title: 'The Master Theorem: which level dominates?', blurb: 'For T(n) = a·T(n/b) + nᵈ, the recursion tree\'s per-level work is a geometric series with ratio a/bᵈ. Slide a, b, d and watch the work profile tip from root-heavy to balanced to leaf-heavy — that ratio is exactly which of the three master-theorem cases you land in.' },
  function (root) {
    const W = 540, H = 350, padL = 26, padR = 14, padT = 16, padB = 38;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let a = 2, b = 2, d = 1; const L = 7;
    slider(ctl, { label: 'branches a', min: 1, max: 8, step: 1, value: a, fmt: v => '' + v, onInput: v => { a = v; draw(); } });
    slider(ctl, { label: 'shrink b', min: 2, max: 4, step: 1, value: b, fmt: v => '' + v, onInput: v => { b = v; draw(); } });
    slider(ctl, { label: 'work exponent d', min: 0, max: 3, step: 1, value: d, fmt: v => '' + v, onInput: v => { d = v; draw(); } });
    const pre = controls(root);
    button(pre, 'Merge sort (2,2,1)', () => { a = 2; b = 2; d = 1; draw(); });
    button(pre, 'Strassen (7,2,2)', () => { a = 7; b = 2; d = 2; draw(); });
    button(pre, 'Binary search (1,2,0)', () => { a = 1; b = 2; d = 0; draw(); });
    const nd = e => e === 0 ? '1' : e === 1 ? 'n' : 'n^' + e;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const r = a / Math.pow(b, d), logba = Math.log(a) / Math.log(b);
      const work = []; for (let i = 0; i < L; i++) work.push(Math.pow(r, i));
      const mx = Math.max.apply(null, work), bw = (W - padL - padR) / L;
      let caseTxt, comp, dom;
      if (Math.abs(r - 1) < 1e-9) { caseTxt = 'balanced — every level does equal work'; comp = d === 0 ? 'Θ(log n)' : 'Θ(' + nd(d) + ' log n)'; dom = -1; }
      else if (r > 1) { caseTxt = 'leaf-heavy — the bottom level dominates'; comp = 'Θ(n^' + logba.toFixed(2) + ')'; dom = L - 1; }
      else { caseTxt = 'root-heavy — the top level dominates'; comp = 'Θ(' + nd(d) + ')'; dom = 0; }
      for (let i = 0; i < L; i++) {
        const h = Math.max(1, (work[i] / mx) * (H - padT - padB)), x = padL + i * bw + 2, y = (H - padB) - h;
        const isDom = dom === -1 || i === dom;
        ctx.fillStyle = isDom ? p.gold : p.violet; ctx.globalAlpha = isDom ? 0.9 : 0.4; ctx.fillRect(x, y, bw - 4, h); ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      for (let i = 0; i < L; i++) ctx.fillText(i === L - 1 ? 'leaves' : 'L' + i, padL + i * bw + bw / 2, H - padB + 14);
      ctx.fillStyle = p.ink; ctx.fillText('recursion level  →  total work at that level', W / 2, H - 6);
      info.innerHTML = 'T(n) = ' + a + '·T(n/' + b + ') + ' + nd(d) + '. Per-level work is geometric with ratio r = a / bᵈ = ' + a + '/' + Math.pow(b, d) + ' = <b>' + r.toFixed(2) + '</b> → <b style="color:' + p.gold + '">' + caseTxt + '</b>. Complexity: <b style="color:' + p.gold + '">' + comp + '</b>.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Master theorem visualizer: a bar chart of the work done at each level of the recursion tree for T(n) = a T(n/b) + n^d. When the per-level ratio a over b-to-the-d exceeds 1 the bars grow toward the leaves (leaf-heavy, leaves dominate); equal to 1 they are flat (balanced); below 1 they shrink (root-heavy, the top dominates) — the three master-theorem cases.');
    draw();
  });

  /* ========================================================
     63. Scaling laws — the compute-optimal model size (LLMs)
     ======================================================== */
  register({ id: 'llm-scaling', topic: 'llm', title: 'Scaling laws: the compute-optimal model size', blurb: 'For a fixed training budget, loss versus model size is a U-curve — too small underfits, too large is under-trained (too few tokens left for it). Slide the compute budget and watch the optimal size N* march up the curve, always near ~20 tokens per parameter (the Chinchilla rule).' },
  function (root) {
    const W = 540, H = 350, padL = 30, padR = 14, padT = 18, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const E = 1.69, A = 400, B = 1080, a = 0.33, NLO = 7, NHI = 12;
    let logC = 21;
    const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '.': '·' };
    const sup = n => String(n).split('').map(d => SUP[d] || d).join('');
    const L = (N, D) => E + A / Math.pow(N, a) + B / Math.pow(D, a);
    const fmtNum = x => x >= 1e12 ? (x / 1e12).toFixed(1) + 'T' : x >= 1e9 ? (x / 1e9).toFixed(1) + 'B' : x >= 1e6 ? (x / 1e6).toFixed(0) + 'M' : x.toFixed(0);
    slider(ctl, { label: 'compute (FLOPs)', min: 18, max: 24, step: 0.5, value: logC, fmt: v => '10' + sup(v), onInput: v => { logC = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const C = Math.pow(10, logC);
      const pts = []; let bestN = 0, bestL = 1e9, bestD = 0;
      for (let lx = NLO; lx <= NHI; lx += 0.02) { const N = Math.pow(10, lx), D = C / (6 * N); if (D < 1) continue; const l = L(N, D); pts.push([lx, l]); if (l < bestL) { bestL = l; bestN = N; bestD = D; } }
      let ymin = 1e9, ymax = -1e9; pts.forEach(([, l]) => { ymin = Math.min(ymin, l); ymax = Math.max(ymax, l); }); ymax = Math.min(ymax, bestL + 2.2);
      const X = lx => padL + (lx - NLO) / (NHI - NLO) * (W - padL - padR);
      const Y = l => (H - padB) - (l - ymin) / (ymax - ymin) * (H - padT - padB);
      ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      for (let lx = NLO; lx <= NHI; lx++) { ctx.strokeStyle = p.line; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(X(lx), padT); ctx.lineTo(X(lx), H - padB); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = p.mute; ctx.fillText('10' + sup(lx), X(lx), H - padB + 14); }
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.2; ctx.beginPath(); pts.forEach(([lx, l], i) => { const xx = X(lx), yy = Y(Math.min(l, ymax)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
      const ox = X(Math.log10(bestN)), oy = Y(bestL);
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(ox, oy, 5, 0, 7); ctx.fill();
      ctx.fillStyle = p.gold; ctx.textAlign = 'center'; ctx.font = '600 11px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('N* = ' + fmtNum(bestN), ox, oy - 10);
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('loss (lower is better)', padL + 2, padT + 2);
      ctx.textAlign = 'center'; ctx.fillText('model size (parameters) — fixed compute, varying N', W / 2, H - 4);
      info.innerHTML = 'At compute C = 10' + sup(logC) + ' FLOPs, the best split is N* ≈ <b style="color:' + p.gold + '">' + fmtNum(bestN) + '</b> parameters trained on D* ≈ <b>' + fmtNum(bestD) + '</b> tokens — about <b>' + Math.round(bestD / bestN) + ' tokens per parameter</b> (Chinchilla’s rule), reaching loss ≈ <b>' + bestL.toFixed(2) + '</b>. Build it <em>bigger</em> at the same budget and you slide right of the dip: too few tokens left to train it. More compute drops the whole curve (a power law) and marches N* upward.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Scaling-laws visualizer: for a fixed compute budget, training loss versus model size is a U-shaped curve with an optimal parameter count N-star, marked on the curve, sitting at roughly twenty tokens per parameter. Increasing the compute budget lowers the whole curve and moves the optimum to larger models.');
    draw();
  });

  /* ========================================================
     8. Activation functions
     ======================================================== */
  register({ id: 'dl-activation', topic: 'deep-learning', title: 'Activation Functions', blurb: 'Plot ReLU, Sigmoid, Tanh and their derivatives — and see where gradients vanish.' },
  function (root) {
    const W = 540, H = 340, pad = 36;
    const { c, ctx } = canvas(root, W, H);
    const acts = {
      'ReLU': { f: x => Math.max(0, x), d: x => x > 0 ? 1 : 0 },
      'Leaky ReLU': { f: x => x > 0 ? x : 0.1 * x, d: x => x > 0 ? 1 : 0.1 },
      'Sigmoid': { f: x => 1 / (1 + Math.exp(-x)), d: x => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); } },
      'Tanh': { f: x => Math.tanh(x), d: x => 1 - Math.tanh(x) ** 2 }
    };
    let key = 'ReLU', mx = 1.5;
    const xmin = -5, xmax = 5, ymin = -1.6, ymax = 2.4;
    const ctl = controls(root);
    select(ctl, { label: 'activation', value: key, options: Object.keys(acts).map(k => ({ value: k, label: k })), onChange: v => { key = v; draw(); } });
    slider(ctl, { label: 'x', min: -5, max: 5, step: 0.1, value: mx, fmt: v => v.toFixed(1), onInput: v => { mx = v; draw(); } });
    const info = note(root);
    const X = x => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
    const Y = y => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
    function draw() {
      const p = P(), a = acts[key]; ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, Y(0)); ctx.lineTo(W - pad, Y(0)); ctx.moveTo(X(0), pad); ctx.lineTo(X(0), H - pad); ctx.stroke();
      ctx.strokeStyle = p.sage; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.8; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = xmin + i / 240 * (xmax - xmin); const px = X(x), py = Y(a.d(x)); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = xmin + i / 240 * (xmax - xmin); const px = X(x), py = Y(a.f(x)); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(mx), Y(a.f(mx)), 5.5, 0, 7); ctx.fill();
      info.innerHTML = `<span style="color:${p.gold}">${key}(x)</span> &nbsp; <span style="color:${p.sage}">derivative (dashed)</span> &nbsp;·&nbsp; at x=${mx.toFixed(1)}: f=${a.f(mx).toFixed(3)}, f′=${a.d(mx).toFixed(3)} ${a.d(mx) < 0.02 ? '<span style="color:' + p.rust + '">· gradient ≈ 0 (vanishing!)</span>' : ''}`;
    }
    draw();
  });

  /* ========================================================
     9. Gridworld — value iteration + a greedy agent
     ======================================================== */
  register({ id: 'rl-gridworld', topic: 'reinforcement-learning', title: 'Gridworld RL', blurb: 'Run value iteration on a gridworld, see the value map and policy arrows, then let the agent walk it.' },
  function (root) {
    const cols = 6, rows = 5, cell = 70, W = cols * cell, H = rows * cell;
    const { c, ctx } = canvas(root, W, H);
    // layout: '.'=empty '#'=wall 'G'=goal(+1) 'P'=pit(-1) 'S'=start
    const map = ['......', '.##.P.', '.#..#G', '.#.##.', 'S.....'];
    let gamma = 0.9, V = [], iters = 0, agent = null, runH = null;
    function term(r, ch) { return ch === 'G' ? 1 : ch === 'P' ? -1 : null; }
    function reset() {
      V = map.map(row => row.split('').map(ch => { const t = term(0, ch); return t == null ? 0 : t; }));
      iters = 0; agent = null; if (runH) { runH.stop(); runH = null; } draw();
    }
    function cellAt(r, c2) { return map[r][c2]; }
    function nextState(r, c2, a) {
      let nr = r + [-1, 0, 1, 0][a], nc = c2 + [0, 1, 0, -1][a];
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || map[nr][nc] === '#') return [r, c2];
      return [nr, nc];
    }
    function iterate() {
      const nV = V.map(r => r.slice());
      for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) {
        const ch = cellAt(r, c2); if (ch === '#' || ch === 'G' || ch === 'P') continue;
        let best = -1e9;
        for (let a = 0; a < 4; a++) { const [nr, nc] = nextState(r, c2, a); best = Math.max(best, -0.04 + gamma * V[nr][nc]); }
        nV[r][c2] = best;
      }
      V = nV; iters++; draw();
    }
    function greedy(r, c2) { let ba = 0, bv = -1e9; for (let a = 0; a < 4; a++) { const [nr, nc] = nextState(r, c2, a); if (V[nr][nc] > bv) { bv = V[nr][nc]; ba = a; } } return ba; }
    const ctl = controls(root);
    slider(ctl, { label: 'γ', min: 0.5, max: 0.99, step: 0.01, value: gamma, fmt: v => v.toFixed(2), onInput: v => { gamma = v; } });
    const btns = controls(root);
    button(btns, 'Iterate', () => iterate());
    button(btns, '⚡ Solve', () => { for (let k = 0; k < 60; k++) iterate(); }, 'primary');
    button(btns, '🤖 Run agent', () => runAgent());
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    function runAgent() {
      let sr = 4, sc = 0; for (let r = 0; r < rows; r++)for (let c2 = 0; c2 < cols; c2++) if (map[r][c2] === 'S') { sr = r; sc = c2; }
      agent = { r: sr, c: sc, steps: 0 }; if (runH) runH.stop();
      let f = 0; runH = loop(() => {
        if (f++ % 30 !== 0) { draw(); return; }
        const ch = cellAt(agent.r, agent.c);
        if (ch === 'G' || ch === 'P' || agent.steps > 40) { runH.stop(); runH = null; draw(); return; }
        const a = greedy(agent.r, agent.c); const [nr, nc] = nextState(agent.r, agent.c, a); agent.r = nr; agent.c = nc; agent.steps++; draw();
      });
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) {
        const ch = cellAt(r, c2), x = c2 * cell, y = r * cell, v = V[r][c2];
        let bg = p.panel;
        if (ch === '#') bg = p.line;
        else if (ch === 'G') bg = p.sage;
        else if (ch === 'P') bg = p.rust;
        else { const t = Math.max(-1, Math.min(1, v)); bg = t >= 0 ? mix(p.panel, p.sage, t * 0.8) : mix(p.panel, p.rust, -t * 0.8); }
        ctx.fillStyle = bg; ctx.fillRect(x + 2, y + 2, cell - 4, cell - 4);
        ctx.strokeStyle = p.bg; ctx.lineWidth = 2; ctx.strokeRect(x + 2, y + 2, cell - 4, cell - 4);
        if (ch !== '#') { ctx.fillStyle = p.ink; ctx.font = '12px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(ch === 'G' ? '+1' : ch === 'P' ? '−1' : v.toFixed(2), x + cell / 2, y + cell / 2 + 4); }
        if (ch === '.' || ch === 'S') { const a = greedy(r, c2); const ang = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][a]; ctx.save(); ctx.translate(x + cell / 2, y + cell - 14); ctx.rotate(ang); ctx.strokeStyle = p.gold; ctx.fillStyle = p.gold; arrow(ctx, -9, 0, 9, 0, p.gold, 1.6); ctx.restore(); }
        if (ch === 'S') { ctx.fillStyle = p.violet; ctx.font = '10px JetBrains Mono'; ctx.fillText('START', x + cell / 2, y + 16); }
      }
      if (agent) { ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(agent.c * cell + cell / 2, agent.r * cell + cell / 2 - 6, 12, 0, 7); ctx.fill(); ctx.fillStyle = p.bg; ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🤖', agent.c * cell + cell / 2, agent.r * cell + cell / 2 - 2); }
      info.innerHTML = `sweeps: <b>${iters}</b> &nbsp;·&nbsp; γ = ${gamma.toFixed(2)} &nbsp;·&nbsp; green = high value, red = low. Arrows = greedy policy. ${agent ? '· agent steps: ' + agent.steps : ''}`;
    }
    function mix(a, b, t) { const pa = hex(a), pb = hex(b); return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`; }
    function hex(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); if (!/^[0-9a-f]{6}$/i.test(h)) return [40, 35, 31]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
    reset();
  });

  /* ========================================================
     10. Word embeddings — vector arithmetic (king − man + woman)
     ======================================================== */
  register({ id: 'llm-embeddings', topic: 'llm', title: 'Embedding Arithmetic', blurb: 'Why king − man + woman ≈ queen: meanings become directions you can add and subtract.' },
  function (root) {
    const W = 540, H = 380, pad = 40;
    const { c, ctx } = canvas(root, W, H);
    const words = {
      king: [2, 2], queen: [0, 2], man: [2, 0], woman: [0, 0], prince: [1.6, 1.5], princess: [-0.4, 1.5],
      france: [5, 3], paris: [5, 5], japan: [8, 3], tokyo: [8, 5], italy: [6, 2.4], rome: [6, 4.4],
      dog: [3, -3], cat: [3.6, -3.1], puppy: [2.5, -2.4]
    };
    const analogies = [
      { label: 'king − man + woman', a: 'king', b: 'man', c: 'woman' },
      { label: 'paris − france + japan', a: 'paris', b: 'france', c: 'japan' },
      { label: 'dog − cat + puppy', a: 'puppy', b: 'dog', c: 'cat' }
    ];
    let sel = 0;
    const xs = Object.values(words), xmin = Math.min(...xs.map(p => p[0])) - 1, xmax = Math.max(...xs.map(p => p[0])) + 1,
      ymin = Math.min(...xs.map(p => p[1])) - 1, ymax = Math.max(...xs.map(p => p[1])) + 1;
    const X = x => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
    const Y = y => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
    const ctl = controls(root);
    select(ctl, { label: 'analogy', value: '0', options: analogies.map((a, i) => ({ value: '' + i, label: a.label })), onChange: v => { sel = +v; draw(); } });
    const info = note(root);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const an = analogies[sel], A = words[an.a], B = words[an.b], Cc = words[an.c];
      const res = [A[0] - B[0] + Cc[0], A[1] - B[1] + Cc[1]];
      let best = null, bd = 1e9;
      Object.keys(words).forEach(w => { if (w === an.a || w === an.b || w === an.c) return; const d = Math.hypot(words[w][0] - res[0], words[w][1] - res[1]); if (d < bd) { bd = d; best = w; } });
      // arrows: B->A (the relation) and C->res (same relation)
      ctx.globalAlpha = 0.9; arrow(ctx, X(B[0]), Y(B[1]), X(A[0]), Y(A[1]), p.gold, 2);
      arrow(ctx, X(Cc[0]), Y(Cc[1]), X(res[0]), Y(res[1]), p.violet, 2); ctx.globalAlpha = 1;
      Object.keys(words).forEach(w => {
        const q = words[w], hot = [an.a, an.b, an.c].includes(w), isb = w === best;
        ctx.fillStyle = hot ? p.gold : isb ? p.sage : p.mute;
        ctx.beginPath(); ctx.arc(X(q[0]), Y(q[1]), hot || isb ? 6 : 4, 0, 7); ctx.fill();
        ctx.fillStyle = hot ? p.ink : isb ? p.sage : p.soft; ctx.font = (hot || isb ? 'bold ' : '') + '13px Spectral, serif'; ctx.textAlign = 'left';
        ctx.fillText(w, X(q[0]) + 8, Y(q[1]) + 4);
      });
      ctx.fillStyle = p.violet; ctx.font = '18px serif'; ctx.fillText('✕', X(res[0]) - 5, Y(res[1]) + 6);
      info.innerHTML = `<b style="color:${p.gold}">${an.label}</b> lands nearest to <b style="color:${p.sage}">${best}</b> ✓ — the same offset (gold) carries over to (violet).`;
    }
    draw();
  });

  /* shared color-mix helpers for the widgets below */
  function _hx(h){ h=String(h).replace('#',''); if(h.length===3)h=h.split('').map(c=>c+c).join(''); if(!/^[0-9a-f]{6}$/i.test(h))return [40,35,31]; return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
  function _mix(a,b,t){ const pa=_hx(a),pb=_hx(b); return `rgb(${Math.round(pa[0]+(pb[0]-pa[0])*t)},${Math.round(pa[1]+(pb[1]-pa[1])*t)},${Math.round(pa[2]+(pb[2]-pa[2])*t)})`; }

  /* ========================================================
     11. Neural network forward pass
     ======================================================== */
  register({ id: 'dl-neural-net', topic: 'deep-learning', title: 'Neural Network Forward Pass', blurb: 'Drag the inputs and watch activations flow through an MLP into softmax probabilities.' },
  function (root) {
    const W = 540, H = 360, arch = [3, 4, 2];
    const { c, ctx } = canvas(root, W, H);
    const W1 = [[0.8, -0.5, 0.3], [-0.4, 0.9, 0.2], [0.3, 0.3, -0.7], [0.6, -0.2, 0.5]], b1 = [0.1, -0.2, 0.0, 0.1];
    const W2 = [[0.7, -0.6, 0.4, 0.2], [-0.5, 0.5, -0.3, 0.8]], b2 = [0.0, 0.1];
    let x = [0.5, 0.8, 0.2], phase = 0;
    const ctl = controls(root);
    [0, 1, 2].forEach(i => slider(ctl, { label: 'x' + (i + 1), min: 0, max: 1, step: 0.05, value: x[i], fmt: t => t.toFixed(2), onInput: t => { x[i] = t; } }));
    const info = note(root);
    const relu = z => Math.max(0, z);
    function fwd() {
      const h = W1.map((r, i) => relu(r.reduce((s, w, j) => s + w * x[j], 0) + b1[i]));
      const o = W2.map((r, i) => r.reduce((s, w, j) => s + w * h[j], 0) + b2[i]);
      const m = Math.max(...o), ex = o.map(v => Math.exp(v - m)), Z = ex.reduce((a, b) => a + b, 0);
      return { h, sm: ex.map(v => v / Z) };
    }
    const lx = li => 78 + li * (W - 156) / (arch.length - 1);
    const ny = (li, ni) => H / 2 + 12 + (ni - (arch[li] - 1) / 2) * 52;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const { h, sm } = fwd(), acts = [x, h.map(v => Math.min(1, v / 2.5)), sm], Ws = [W1, W2];
      for (let li = 0; li < arch.length - 1; li++) { const Wl = Ws[li];
        for (let i = 0; i < arch[li + 1]; i++) for (let j = 0; j < arch[li]; j++) { const w = Wl[i][j];
          ctx.strokeStyle = w >= 0 ? p.sage : p.rust; ctx.globalAlpha = 0.12 + 0.5 * Math.min(1, Math.abs(w)); ctx.lineWidth = 0.7 + 1.7 * Math.min(1, Math.abs(w));
          ctx.beginPath(); ctx.moveTo(lx(li), ny(li, j)); ctx.lineTo(lx(li + 1), ny(li + 1, i)); ctx.stroke(); } }
      ctx.globalAlpha = 1;
      for (let li = 0; li < arch.length - 1; li++) for (let i = 0; i < arch[li + 1]; i++) for (let j = 0; j < arch[li]; j++) { const x1 = lx(li), y1 = ny(li, j), x2 = lx(li + 1), y2 = ny(li + 1, i); ctx.fillStyle = p.gold; ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * phase, y1 + (y2 - y1) * phase, 1.7, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      for (let li = 0; li < arch.length; li++) for (let ni = 0; ni < arch[li]; ni++) { const a = Math.max(0, Math.min(1, acts[li][ni]));
        ctx.fillStyle = _mix(p.panel, p.gold, a); ctx.strokeStyle = p.line; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(lx(li), ny(li, ni), 16, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = a > 0.5 ? '#1a1308' : p.ink; ctx.font = '10px JetBrains Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillText(li === 0 ? x[ni].toFixed(1) : li === 1 ? h[ni].toFixed(1) : sm[ni].toFixed(2), lx(li), ny(li, ni) + 4); }
      ctx.fillStyle = p.mute; ctx.font = '11px JetBrains Mono, monospace'; ctx.textAlign = 'center';
      ['inputs', 'hidden · ReLU', 'softmax'].forEach((t, li) => ctx.fillText(t, lx(li), 40));
      info.innerHTML = `output: <b style="color:${p.gold}">y₁=${sm[0].toFixed(2)}</b> · <b style="color:${p.gold}">y₂=${sm[1].toFixed(2)}</b> &nbsp; each hidden unit = ReLU(weighted sum); softmax → probabilities. Green/red edges = +/− weights.`;
    }
    draw();
    loop(() => { phase = (phase + 0.012) % 1; draw(); });
  });

  /* ========================================================
     12. Self-attention heatmap
     ======================================================== */
  register({ id: 'llm-attention', topic: 'llm', title: 'Self-Attention Heatmap', blurb: 'Each row is one word’s attention over the sentence — watch how "it" finds "cat".' },
  function (root) {
    const toks = ['The', 'cat', 'sat', 'because', 'it', 'was', 'tired'], n = toks.length;
    const A = [
      [0.55, 0.20, 0.08, 0.04, 0.05, 0.04, 0.04],
      [0.10, 0.50, 0.15, 0.05, 0.08, 0.05, 0.07],
      [0.06, 0.40, 0.34, 0.05, 0.06, 0.05, 0.04],
      [0.05, 0.10, 0.20, 0.40, 0.10, 0.08, 0.07],
      [0.04, 0.55, 0.10, 0.05, 0.18, 0.04, 0.04],
      [0.05, 0.10, 0.15, 0.08, 0.25, 0.30, 0.07],
      [0.04, 0.22, 0.10, 0.06, 0.40, 0.06, 0.12]
    ];
    const W = 540, H = 420, pad = 80, grid = W - pad - 26, cell = grid / n;
    const { c, ctx } = canvas(root, W, H);
    const info = note(root); let hover = null;
    function hit(ev) { const m = pointer(c, W, H, ev), col = Math.floor((m.x - pad) / cell), row = Math.floor((m.y - pad) / cell); return (row >= 0 && row < n && col >= 0 && col < n) ? { row, col } : null; }
    c.addEventListener('mousemove', e => { hover = hit(e); draw(); });
    c.addEventListener('mouseleave', () => { hover = null; draw(); });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '12px Spectral, serif';
      for (let j = 0; j < n; j++) { ctx.save(); ctx.translate(pad + cell * (j + 0.5), pad - 10); ctx.rotate(-0.5); ctx.fillStyle = hover && hover.col === j ? p.gold : p.soft; ctx.textAlign = 'left'; ctx.fillText(toks[j], 0, 0); ctx.restore(); }
      for (let i = 0; i < n; i++) { ctx.fillStyle = hover && hover.row === i ? p.gold : p.soft; ctx.textAlign = 'right'; ctx.fillText(toks[i], pad - 8, pad + cell * (i + 0.5) + 4); }
      ctx.textAlign = 'center';
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = A[i][j]; ctx.fillStyle = _mix(p.bg, p.gold, Math.min(1, v * 1.7)); ctx.fillRect(pad + j * cell + 1, pad + i * cell + 1, cell - 2, cell - 2);
        if (v >= 0.3) { ctx.fillStyle = v > 0.45 ? '#1a1308' : p.ink; ctx.font = '10px JetBrains Mono, monospace'; ctx.fillText(v.toFixed(2), pad + j * cell + cell / 2, pad + i * cell + cell / 2 + 3); }
        if (hover && hover.row === i) { ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.strokeRect(pad + j * cell + 1, pad + i * cell + 1, cell - 2, cell - 2); } }
      info.innerHTML = hover
        ? `"<b style="color:${p.gold}">${toks[hover.row]}</b>" → "<b>${toks[hover.col]}</b>": attention <b>${A[hover.row][hover.col].toFixed(2)}</b>`
        : `Each ROW = one word’s attention over the sentence (rows sum to 1; brighter = stronger). Notice "<b>it</b>" attends most to "<b>cat</b>".`;
    }
    draw();
  });

  /* ========================================================
     13. PCA — principal components & projection
     ======================================================== */
  register({ id: 'la-pca', topic: 'linear-algebra', title: 'PCA — Principal Components', blurb: 'Tilt and stretch a data cloud; watch PCA find the axis of greatest variance and collapse onto it.' },
  function (root) {
    const W = 540, H = 380, cx = W / 2, cy = H / 2, s = 30;
    const { c, ctx } = canvas(root, W, H);
    function gauss() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    const base = Array.from({ length: 64 }, () => [gauss(), gauss()]);
    let ang = 30 * Math.PI / 180, elong = 2.4, project = false;
    const ctl = controls(root);
    slider(ctl, { label: 'angle', min: 0, max: 180, step: 5, value: 30, fmt: v => v + '°', onInput: v => { ang = v * Math.PI / 180; draw(); } });
    slider(ctl, { label: 'stretch', min: 1, max: 4, step: 0.1, value: elong, fmt: v => v.toFixed(1) + '×', onInput: v => { elong = v; draw(); } });
    button(ctl, 'Project onto PC1', () => { project = !project; draw(); });
    const info = note(root);
    const px = (x, y) => ({ x: cx + x * s, y: cy - y * s });
    const tf = p => { const x = elong * p[0], y = p[1]; return [x * Math.cos(ang) - y * Math.sin(ang), x * Math.sin(ang) + y * Math.cos(ang)]; };
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const pts = base.map(tf), n = pts.length;
      const mx = pts.reduce((a, q) => a + q[0], 0) / n, my = pts.reduce((a, q) => a + q[1], 0) / n;
      let cxx = 0, cyy = 0, cxy = 0; pts.forEach(q => { const dx = q[0] - mx, dy = q[1] - my; cxx += dx * dx; cyy += dy * dy; cxy += dx * dy; }); cxx /= n; cyy /= n; cxy /= n;
      const tr = cxx + cyy, det = cxx * cyy - cxy * cxy, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)), l1 = tr / 2 + disc, l2 = tr / 2 - disc;
      const phi = 0.5 * Math.atan2(2 * cxy, cxx - cyy), u1 = [Math.cos(phi), Math.sin(phi)], u2 = [-u1[1], u1[0]];
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      const m = px(mx, my);
      const axis = (u, len, col, w) => { const a = px(mx + u[0] * len, my + u[1] * len), b = px(mx - u[0] * len, my - u[1] * len); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
      axis(u2, Math.sqrt(Math.max(0.01, l2)) * 2.2, p.sage, 2);
      axis(u1, Math.sqrt(Math.max(0.01, l1)) * 2.2, p.gold, 3);
      pts.forEach(q => { const pp = px(q[0], q[1]);
        if (project) { const t = (q[0] - mx) * u1[0] + (q[1] - my) * u1[1], f = [mx + t * u1[0], my + t * u1[1]], fp = px(f[0], f[1]);
          ctx.strokeStyle = p.violet; ctx.globalAlpha = 0.4; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(pp.x, pp.y); ctx.lineTo(fp.x, fp.y); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
          ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(fp.x, fp.y, 3, 0, 7); ctx.fill(); }
        ctx.fillStyle = p.soft; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(pp.x, pp.y, 3, 0, 7); ctx.fill(); ctx.globalAlpha = 1; });
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(m.x, m.y, 4.5, 0, 7); ctx.fill();
      const pct = l1 / (l1 + l2) * 100;
      info.innerHTML = `<b style="color:${p.gold}">PC1</b> (gold) captures <b>${pct.toFixed(0)}%</b> of the variance; <b style="color:${p.sage}">PC2</b> the rest. ${project ? 'Violet = each point projected onto PC1 — that is the 1-D reduction.' : 'Click “Project onto PC1” to collapse the cloud to one dimension.'}`;
    }
    draw();
  });

  /* ========================================================
     60. The SVD as rotate–stretch–rotate — every matrix maps the unit circle to an ellipse (Linear Algebra)
     ======================================================== */
  register({ id: 'la-svd', topic: 'linear-algebra', title: 'The SVD: Rotate · Stretch · Rotate', blurb: 'Every matrix A = UΣVᵀ acts on the unit circle in three steps: rotate (Vᵀ), stretch along the axes by the singular values (Σ), rotate again (U). Step through the stages and watch the circle become an ellipse whose semi-axes ARE the singular values.' },
  function (root) {
    const W = 540, H = 420, S = 70, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let thV = 35, s1 = 2.4, s2 = 1.0, thU = 20, stage = 3;
    const D = a => a * Math.PI / 180;
    const toPx = (x, y) => ({ x: cx + x * S, y: cy - y * S });
    const mul = (A, B) => [A[0] * B[0] + A[1] * B[2], A[0] * B[1] + A[1] * B[3], A[2] * B[0] + A[3] * B[2], A[2] * B[1] + A[3] * B[3]];
    const R = t => { const c2 = Math.cos(D(t)), s = Math.sin(D(t)); return [c2, -s, s, c2]; };
    const ap = (M, x, y) => [M[0] * x + M[1] * y, M[2] * x + M[3] * y];
    slider(ctl, { label: 'Vᵀ angle', min: -90, max: 90, step: 1, value: thV, fmt: v => v + '°', onInput: v => { thV = v; draw(); } });
    slider(ctl, { label: 'σ₁', min: 0.2, max: 3, step: 0.05, value: s1, fmt: v => v.toFixed(2), onInput: v => { s1 = v; draw(); } });
    slider(ctl, { label: 'σ₂', min: 0.2, max: 3, step: 0.05, value: s2, fmt: v => v.toFixed(2), onInput: v => { s2 = v; draw(); } });
    slider(ctl, { label: 'U angle', min: -90, max: 90, step: 1, value: thU, fmt: v => v + '°', onInput: v => { thU = v; draw(); } });
    const pre = controls(root);
    const stageBtns = [['① unit circle', 0], ['② → Vᵀ', 1], ['③ → Σ', 2], ['④ → U  (full A)', 3]].map(([lab, n]) => button(pre, lab, () => { stage = n; draw(); }));
    function curM() {   // cumulative transform applied at the current stage (right-to-left: Vᵀ, then Σ, then U)
      const Vt = R(-thV), Sig = [s1, 0, 0, s2], Um = R(thU);
      return [[1, 0, 0, 1], Vt, mul(Sig, Vt), mul(Um, mul(Sig, Vt))][stage];
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let gx = cx % S; gx < W; gx += S) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (let gy = cy % S; gy < H; gy += S) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      const M = curM();
      // faint original unit circle for reference
      ctx.strokeStyle = p.line; ctx.setLineDash([3, 3]); ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i <= 72; i++) { const a = i / 72 * 2 * Math.PI, q = toPx(Math.cos(a), Math.sin(a)); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); } ctx.stroke(); ctx.setLineDash([]);
      // transformed shape (circle → ellipse)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 72; i++) { const a = i / 72 * 2 * Math.PI, t = ap(M, Math.cos(a), Math.sin(a)), q = toPx(t[0], t[1]); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); } ctx.stroke();
      // colored tick dots (hue by original angle) so the rotation is visible even when the shape is still a circle
      for (let i = 0; i < 24; i++) { const a = i / 24 * 2 * Math.PI, t = ap(M, Math.cos(a), Math.sin(a)), q = toPx(t[0], t[1]); ctx.fillStyle = 'hsl(' + Math.round(a / (2 * Math.PI) * 360) + ',70%,60%)'; ctx.beginPath(); ctx.arc(q.x, q.y, 3, 0, 7); ctx.fill(); }
      // transformed standard basis vectors
      const O = toPx(0, 0), e1 = ap(M, 1, 0), e2 = ap(M, 0, 1), P1 = toPx(e1[0], e1[1]), P2 = toPx(e2[0], e2[1]);
      arrow(ctx, O.x, O.y, P1.x, P1.y, p.violet, 3); arrow(ctx, O.x, O.y, P2.x, P2.y, p.sage, 3);
      const labels = ['The unit circle and standard basis ê₁, ê₂ — the starting point.',
        'Vᵀ rotates the space by a pure rotation — the circle is unchanged, but watch the colored dots and basis spin. V\'s columns are the input axes A singles out.',
        'Σ stretches along the axes by the singular values σ₁ = ' + s1.toFixed(2) + ', σ₂ = ' + s2.toFixed(2) + ' — the circle becomes an axis-aligned ellipse.',
        'U rotates the stretched ellipse into its final orientation. The full map A = UΣVᵀ sends the unit circle to an ellipse whose semi-axes are exactly σ₁ = ' + s1.toFixed(2) + ' and σ₂ = ' + s2.toFixed(2) + '.'][stage];
      info.innerHTML = '<b>Stage ' + (stage + 1) + ' of 4.</b> ' + labels + (stage === 3 ? ' The largest singular value σ₁ is how far A can stretch any unit vector; det A = ±σ₁σ₂ = ' + (s1 * s2).toFixed(2) + ' is the area-scaling factor.' : '');
      stageBtns.forEach((b, n) => b.classList.toggle('active', n === stage));
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Singular value decomposition visualizer: the unit circle and standard basis are transformed by A = U Sigma V-transpose in three stages — a rotation by V-transpose, a stretch along the axes by the singular values sigma-1 and sigma-2 (turning the circle into an axis-aligned ellipse), and a final rotation by U. Stage buttons step through it; sliders set the two rotation angles and the two singular values.');
    draw();
  });

  /* ========================================================
     14. Convolution & feature maps
     ======================================================== */
  register({ id: 'dl-convolution', topic: 'deep-learning', title: 'Convolution & Feature Maps', blurb: 'Slide a kernel over an image and watch the feature map form — edges, blur, sharpen.' },
  function (root) {
    const W = 540, H = 360, N = 8, OUT = N - 2;
    const { c, ctx } = canvas(root, W, H);
    const inp = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, cc) => (r >= 2 && r <= 5 && cc >= 2 && cc <= 5) ? 0.9 : 0.15));
    const kernels = {
      'Vertical edge': [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
      'Horizontal edge': [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
      'Blur': [[1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9], [1 / 9, 1 / 9, 1 / 9]],
      'Sharpen': [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
      'Identity': [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    };
    let kname = 'Vertical edge', out = Array.from({ length: OUT }, () => Array(OUT).fill(null)), pos = 0, runH = null;
    const ctl = controls(root);
    select(ctl, { label: 'kernel', value: kname, options: Object.keys(kernels).map(k => ({ value: k, label: k })), onChange: v => { kname = v; reset(); } });
    const btns = controls(root);
    button(btns, '▶ Play', () => { if (runH) { runH.stop(); runH = null; } else { let f = 0; runH = loop(() => { if (f++ % 14 === 0) step(); }); } }, 'primary');
    button(btns, 'Step', () => step());
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    const inX = 16, inY = 70, inC = 23, kerC = 22, outX = 356, outY = 70, outC = 27;
    function reset() { if (runH) { runH.stop(); runH = null; } out = Array.from({ length: OUT }, () => Array(OUT).fill(null)); pos = 0; draw(); }
    function conv(ox, oy) { const k = kernels[kname]; let sum = 0; for (let ky = 0; ky < 3; ky++) for (let kx = 0; kx < 3; kx++) sum += inp[oy + ky][ox + kx] * k[ky][kx]; return sum; }
    function step() { if (pos >= OUT * OUT) { if (runH) { runH.stop(); runH = null; } return; } const ox = pos % OUT, oy = (pos / OUT) | 0; out[oy][ox] = conv(ox, oy); pos++; draw(); }
    function cellCol(v, p) { if (v == null) return p.panel; return v >= 0 ? _mix(p.panel, p.sage, Math.min(1, v)) : _mix(p.panel, p.rust, Math.min(1, -v)); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px JetBrains Mono, monospace'; ctx.fillStyle = p.mute; ctx.textAlign = 'center';
      ctx.fillText('input', inX + N * inC / 2, inY - 12); ctx.fillText('feature map', outX + OUT * outC / 2, outY - 12);
      const cur = pos < OUT * OUT ? { ox: pos % OUT, oy: (pos / OUT) | 0 } : null;
      for (let r = 0; r < N; r++) for (let cc = 0; cc < N; cc++) { ctx.fillStyle = _mix(p.bg, p.ink, inp[r][cc] * 0.9); ctx.fillRect(inX + cc * inC + 1, inY + r * inC + 1, inC - 2, inC - 2); }
      if (cur) { ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.strokeRect(inX + cur.ox * inC + 1, inY + cur.oy * inC + 1, 3 * inC - 2, 3 * inC - 2); }
      const kx0 = W / 2 - 1.5 * kerC, ky0 = inY + 56, k = kernels[kname];
      ctx.fillStyle = p.mute; ctx.fillText('kernel', W / 2, ky0 - 8);
      for (let r = 0; r < 3; r++) for (let cc = 0; cc < 3; cc++) { const kv = k[r][cc]; ctx.fillStyle = cellCol(kv, p); ctx.fillRect(kx0 + cc * kerC + 1, ky0 + r * kerC + 1, kerC - 2, kerC - 2); ctx.fillStyle = p.ink; ctx.font = '9px JetBrains Mono, monospace'; ctx.fillText(Math.round(kv * 100) / 100, kx0 + cc * kerC + kerC / 2, ky0 + r * kerC + kerC / 2 + 3); }
      for (let r = 0; r < OUT; r++) for (let cc = 0; cc < OUT; cc++) { ctx.fillStyle = cellCol(out[r][cc], p); ctx.fillRect(outX + cc * outC + 1, outY + r * outC + 1, outC - 2, outC - 2); if (cur && cur.ox === cc && cur.oy === r) { ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.strokeRect(outX + cc * outC + 1, outY + r * outC + 1, outC - 2, outC - 2); } }
      info.innerHTML = `<b style="color:${p.gold}">${kname}</b> · ${pos}/${OUT * OUT} cells · each output = Σ(kernel × the 3×3 patch under it). <span style="color:${p.sage}">green +</span> / <span style="color:${p.rust}">red −</span>.`;
    }
    reset();
  });

  /* ========================================================
     15. Bayes' theorem & base rates
     ======================================================== */
  register({ id: 'calc-bayes', topic: 'calculus', title: "Bayes' Theorem & Base Rates", blurb: 'A rare condition + an accurate test: see why most positive results are still false alarms.' },
  function (root) {
    const W = 540, H = 400, cols = 20, rows = 20, N = cols * rows, cell = 15, gx = 18, gy = 64;
    const { c, ctx } = canvas(root, W, H);
    let prior = 0.05, sens = 0.9, spec = 0.9;
    const ctl = controls(root);
    slider(ctl, { label: 'base rate', min: 0.01, max: 0.5, step: 0.01, value: prior, fmt: v => (v * 100).toFixed(0) + '%', onInput: v => { prior = v; draw(); } });
    slider(ctl, { label: 'sensitivity', min: 0.5, max: 1, step: 0.01, value: sens, fmt: v => (v * 100).toFixed(0) + '%', onInput: v => { sens = v; draw(); } });
    slider(ctl, { label: 'specificity', min: 0.5, max: 1, step: 0.01, value: spec, fmt: v => (v * 100).toFixed(0) + '%', onInput: v => { spec = v; draw(); } });
    const info = note(root);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const sick = Math.round(N * prior), healthy = N - sick;
      const TP = Math.round(sick * sens), FN = sick - TP, FP = Math.round(healthy * (1 - spec)), TN = healthy - FP;
      const col = { tp: p.gold, fn: p.rust, fp: p.violet, tn: p.panel2 };
      const seq = []; for (let i = 0; i < TP; i++) seq.push('tp'); for (let i = 0; i < FN; i++) seq.push('fn'); for (let i = 0; i < FP; i++) seq.push('fp'); for (let i = 0; i < TN; i++) seq.push('tn');
      for (let i = 0; i < N; i++) { const r = (i / cols) | 0, cc = i % cols; ctx.fillStyle = col[seq[i]] || p.panel; ctx.fillRect(gx + cc * cell + 1, gy + r * cell + 1, cell - 2, cell - 2); }
      ctx.fillStyle = p.mute; ctx.font = '11px JetBrains Mono, monospace'; ctx.textAlign = 'left'; ctx.fillText('400 people', gx, gy - 12);
      const lx = 336, lyy = gy + 6;
      [['tp', 'sick · test + (true +)', TP], ['fp', 'healthy · test + (false alarm)', FP], ['fn', 'sick · missed (false −)', FN], ['tn', 'healthy · test − (true −)', TN]].forEach((e, k) => {
        ctx.fillStyle = col[e[0]]; ctx.fillRect(lx, lyy + k * 44, 13, 13);
        ctx.fillStyle = p.soft; ctx.font = '10px JetBrains Mono, monospace'; ctx.textAlign = 'left'; ctx.fillText(e[1], lx + 19, lyy + k * 44 + 6);
        ctx.fillStyle = p.ink; ctx.fillText(String(e[2]), lx + 19, lyy + k * 44 + 20);
      });
      const pdp = (TP + FP) > 0 ? TP / (TP + FP) : 0;
      info.innerHTML = `Of everyone who tests positive, only <b style="color:${p.gold}">${(pdp * 100).toFixed(0)}%</b> truly have the condition — that's P(condition | +). At a ${(prior * 100).toFixed(0)}% base rate, false alarms (violet) can swamp true positives (gold) even with a ${(sens * 100).toFixed(0)}%/${(spec * 100).toFixed(0)}% test.`;
    }
    draw();
  });

  /* ========================================================
     16. Recurrent networks — unrolling & memory
     ======================================================== */
  register({ id: 'dl-rnn', topic: 'deep-learning', title: 'Recurrent Networks: Unrolling & Memory', blurb: 'An impulse enters at step 1; watch the hidden state carry it forward — crank the recurrence weight for longer memory.' },
  function (root) {
    const W = 540, H = 340, T = 6;
    const { c, ctx } = canvas(root, W, H);
    const x = [1, 0, 0, 0, 0, 0]; let wh = 0.7, wx = 2.0, phase = 0;
    const ctl = controls(root);
    slider(ctl, { label: 'recurrence wₕ (memory)', min: 0, max: 1, step: 0.05, value: wh, fmt: v => v.toFixed(2), onInput: v => { wh = v; } });
    const info = note(root);
    const colX = t => 64 + t * (W - 120) / (T - 1);
    function hidden() { const h = []; let prev = 0; for (let t = 0; t < T; t++) { const v = Math.tanh(wx * x[t] + wh * prev); h.push(v); prev = v; } return h; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const h = hidden(), yX = H - 56, yH = H / 2, yY = 74;
      for (let t = 1; t < T; t++) { ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.5; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(colX(t - 1), yH); ctx.lineTo(colX(t), yH); ctx.stroke(); }
      ctx.globalAlpha = 1;
      for (let t = 1; t < T; t++) { const x1 = colX(t - 1), x2 = colX(t); ctx.fillStyle = p.gold; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * phase, yH, 2.2, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      for (let t = 0; t < T; t++) {
        ctx.strokeStyle = p.line; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(colX(t), yX - 13); ctx.lineTo(colX(t), yH + 16); ctx.moveTo(colX(t), yH - 16); ctx.lineTo(colX(t), yY + 10); ctx.stroke();
        ctx.fillStyle = x[t] ? p.sage : p.panel2; ctx.beginPath(); ctx.arc(colX(t), yX, 12, 0, 7); ctx.fill(); ctx.fillStyle = x[t] ? p.bg : p.mute; ctx.font = '10px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(x[t], colX(t), yX + 4);
        const v = h[t]; ctx.fillStyle = v >= 0 ? _mix(p.panel, p.sage, Math.min(1, v)) : _mix(p.panel, p.rust, Math.min(1, -v)); ctx.beginPath(); ctx.arc(colX(t), yH, 16, 0, 7); ctx.fill(); ctx.strokeStyle = p.line; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = Math.abs(v) > 0.5 ? p.bg : p.ink; ctx.fillText(v.toFixed(2), colX(t), yH + 4);
        ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(colX(t), yY, 9, 0, 7); ctx.fill();
        ctx.fillStyle = p.mute; ctx.font = '10px JetBrains Mono, monospace'; ctx.fillText('t=' + (t + 1), colX(t), H - 20);
      }
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.font = '10px JetBrains Mono, monospace'; ctx.fillText('y', 12, yY + 4); ctx.fillText('h', 12, yH + 4); ctx.fillText('x', 12, yX + 4);
      info.innerHTML = `hₜ = tanh(wₓ·xₜ + <b style="color:${p.gold}">wₕ</b>·hₜ₋₁). The impulse at t=1 ${wh > 0.6 ? 'persists across steps — long memory' : wh > 0.3 ? 'fades gradually' : 'is quickly forgotten'}; the recurrent weight <b style="color:${p.gold}">wₕ=${wh.toFixed(2)}</b> controls how long the state remembers.`;
    }
    draw();
    loop(() => { phase = (phase + 0.02) % 1; draw(); });
  });

  /* ========================================================
     17. Gradient descent in 2D (contour map)
     ======================================================== */
  register({ id: 'calc-gd2d', topic: 'calculus', title: 'Gradient Descent in 2D', blurb: 'Watch descent wind down a contour map — and zig-zag or diverge as you raise the learning rate.' },
  function (root) {
    const W = 540, H = 380, xmin = -5, xmax = 5, ymin = -3.4, ymax = 3.4, a = 0.12, b = 1.0;
    const { c, ctx } = canvas(root, W, H);
    const f = (x, y) => a * x * x + b * y * y, gx = x => 2 * a * x, gy = y => 2 * b * y;
    let lr = 0.4, start = [-4.5, 2.6], path = [], runH = null;
    const X = x => 40 + (x - xmin) / (xmax - xmin) * (W - 80), Y = y => H - 40 - (y - ymin) / (ymax - ymin) * (H - 80);
    const invX = px => xmin + (px - 40) / (W - 80) * (xmax - xmin), invY = py => ymin + (H - 40 - py) / (H - 80) * (ymax - ymin);
    const ctl = controls(root);
    slider(ctl, { label: 'learning rate', min: 0.05, max: 1.1, step: 0.05, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; } });
    const btns = controls(root);
    button(btns, '▶ Run', () => { if (runH) { runH.stop(); runH = null; } else { reset(); let fr = 0; runH = loop(() => { if (fr++ % 6 === 0) step(); }); } }, 'primary');
    button(btns, 'Step', () => step());
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    function reset() { if (runH) { runH.stop(); runH = null; } path = [start.slice()]; draw(); }
    function step() { const p = path[path.length - 1], nx = p[0] - lr * gx(p[0]), ny = p[1] - lr * gy(p[1]); if (Math.abs(nx) > 30 || Math.abs(ny) > 30) { draw(true); if (runH) { runH.stop(); runH = null; } return; } path.push([nx, ny]); if (path.length > 220) path.shift(); draw(); }
    c.addEventListener('mousedown', e => { const m = pointer(c, W, H, e); start = [invX(m.x), invY(m.y)]; reset(); e.preventDefault(); });
    function draw(diverged) {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      [0.3, 1, 2, 4, 7, 11].forEach(cv => { ctx.beginPath(); for (let t = 0; t <= 6.3; t += 0.1) { const x = Math.sqrt(cv / a) * Math.cos(t), y = Math.sqrt(cv / b) * Math.sin(t), q = { x: X(x), y: Y(y) }; t === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); } ctx.closePath(); ctx.stroke(); });
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(X(0), Y(0), 5, 0, 7); ctx.fill();
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); path.forEach((pt, i) => { const q = { x: X(pt[0]), y: Y(pt[1]) }; i === 0 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y); }); ctx.stroke();
      path.forEach((pt, i) => { ctx.fillStyle = p.gold; ctx.globalAlpha = 0.3 + 0.7 * i / path.length; ctx.beginPath(); ctx.arc(X(pt[0]), Y(pt[1]), 2.5, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      const cur = path[path.length - 1]; ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(cur[0]), Y(cur[1]), 6, 0, 7); ctx.fill();
      info.innerHTML = diverged
        ? `<span style="color:${p.rust}"><b>Diverged!</b> lr=${lr.toFixed(2)} overshoots the steep (y) axis — for $f=ax^2+by^2$, descent needs lr &lt; 2/(largest curvature).</span>`
        : `step ${path.length - 1} · f=${f(cur[0], cur[1]).toFixed(3)} · the elongated bowl makes descent <b>zig-zag</b> across the steep axis. Click anywhere to drop a new start point.`;
    }
    reset();
  });

  /* ========================================================
     18. k-means clustering (Lloyd's algorithm)
     ======================================================== */
  register({ id: 'algo-kmeans', topic: 'algorithms', title: 'k-Means Clustering', blurb: "Watch Lloyd's algorithm assign points to centroids and re-center until the clusters settle." },
  function (root) {
    const W = 540, H = 380, xmin = -5, xmax = 5, ymin = -5, ymax = 5;
    const { c, ctx } = canvas(root, W, H);
    const X = x => 30 + (x - xmin) / (xmax - xmin) * (W - 60), Y = y => H - 30 - (y - ymin) / (ymax - ymin) * (H - 60);
    function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    const centers = [[-2.3, -1.2], [2.2, 1.8], [0.3, -2.9]], pts = [];
    centers.forEach(ct => { for (let i = 0; i < 26; i++) pts.push([ct[0] + gauss() * 0.8, ct[1] + gauss() * 0.8]); });
    const COL = ['#e0a458', '#88a37a', '#9a8bc4', '#d2715a', '#c98fb0'];
    let k = 3, cents = [], assign = [], iter = 0, runH = null;
    const ctl = controls(root);
    select(ctl, { label: 'k', value: '3', options: ['2', '3', '4'].map(v => ({ value: v, label: v })), onChange: v => { k = +v; reset(); } });
    const btns = controls(root);
    button(btns, '▶ Run', () => { if (runH) { runH.stop(); runH = null; } else { let f = 0; runH = loop(() => { if (f++ % 30 === 0) step(); }); } }, 'primary');
    button(btns, 'Step', () => step());
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    function reset() { if (runH) { runH.stop(); runH = null; } cents = []; const used = []; while (cents.length < k) { const i = Math.floor(Math.random() * pts.length); if (used.indexOf(i) < 0) { used.push(i); cents.push(pts[i].slice()); } } assign = pts.map(() => -1); iter = 0; draw(true); }
    function step() {
      assign = pts.map(p => { let bi = 0, bd = 1e9; cents.forEach((ct, ci) => { const d = (p[0] - ct[0]) ** 2 + (p[1] - ct[1]) ** 2; if (d < bd) { bd = d; bi = ci; } }); return bi; });
      let moved = false;
      for (let ci = 0; ci < k; ci++) { const mem = pts.filter((p, i) => assign[i] === ci); if (mem.length) { const mx = mem.reduce((a, p) => a + p[0], 0) / mem.length, my = mem.reduce((a, p) => a + p[1], 0) / mem.length; if (Math.abs(mx - cents[ci][0]) > 1e-4 || Math.abs(my - cents[ci][1]) > 1e-4) moved = true; cents[ci] = [mx, my]; } }
      iter++; if (!moved && iter > 1 && runH) { runH.stop(); runH = null; }
      draw(moved);
    }
    function inertia() { let s = 0; pts.forEach((p, i) => { if (assign[i] >= 0) { const ct = cents[assign[i]]; s += (p[0] - ct[0]) ** 2 + (p[1] - ct[1]) ** 2; } }); return s; }
    function draw(moved) {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      pts.forEach((pt, i) => { ctx.fillStyle = assign[i] >= 0 ? COL[assign[i]] : p.mute; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(X(pt[0]), Y(pt[1]), 4, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      cents.forEach((ct, ci) => { const x = X(ct[0]), y = Y(ct[1]); ctx.strokeStyle = COL[ci]; ctx.fillStyle = p.bg; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = COL[ci]; ctx.font = 'bold 12px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText('✕', x, y + 4); });
      const conv = iter > 1 && moved === false;
      info.innerHTML = `k=${k} · iteration ${iter} · inertia ${inertia().toFixed(1)} ${conv ? '· <span style="color:' + p.sage + '">converged ✓</span>' : ''} — each step assigns points to the nearest centroid, then moves each centroid to its cluster's mean.`;
    }
    reset();
  });

  /* ========================================================
     19. Overfitting & the bias–variance tradeoff
     ======================================================== */
  register({ id: 'dl-overfitting', topic: 'deep-learning', title: 'Overfitting & Bias–Variance', blurb: 'Fit a polynomial to noisy data. Crank the degree: training error keeps dropping while held-out error U-turns — the model starts memorizing noise.' },
  function (root) {
    const W = 540, H = 360, pad = 38;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const truth = x => Math.sin(2 * Math.PI * x);          // hidden true function on [0,1]
    let deg = 3, sigma = 0.18, seed = 7;
    function rng() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    // fixed sample x-locations
    const N = 11, MT = 40;
    const trainX = Array.from({ length: N }, (_, i) => 0.03 + 0.94 * i / (N - 1));
    const testX = Array.from({ length: MT }, () => rng());
    let trainY = [], testY = [], w = [];
    function regenY() { trainY = trainX.map(x => truth(x) + sigma * gauss()); testY = testX.map(x => truth(x) + sigma * gauss()); }
    // polynomial least squares with tiny ridge (x normalized to [-1,1])
    const nx = x => 2 * x - 1;
    function solve(A, b) {
      const n = b.length, M = A.map((r, i) => r.concat(b[i]));
      for (let col = 0; col < n; col++) {
        let piv = col; for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
        const tmp = M[col]; M[col] = M[piv]; M[piv] = tmp;
        const d = M[col][col] || 1e-12;
        for (let r = 0; r < n; r++) { if (r === col) continue; const f = M[r][col] / d; for (let cc = col; cc <= n; cc++) M[r][cc] -= f * M[col][cc]; }
      }
      return M.map((r, i) => r[n] / (M[i][i] || 1e-12));
    }
    function fit() {
      const m = deg + 1, AtA = Array.from({ length: m }, () => new Array(m).fill(0)), Aty = new Array(m).fill(0);
      for (let i = 0; i < N; i++) {
        const pw = []; let p = 1; for (let k = 0; k < m; k++) { pw.push(p); p *= nx(trainX[i]); }
        for (let a = 0; a < m; a++) { Aty[a] += pw[a] * trainY[i]; for (let b2 = 0; b2 < m; b2++) AtA[a][b2] += pw[a] * pw[b2]; }
      }
      for (let a = 0; a < m; a++) AtA[a][a] += 1e-6;
      w = solve(AtA, Aty);
    }
    const pred = x => { let p = 1, s = 0, xn = nx(x); for (let k = 0; k < w.length; k++) { s += w[k] * p; p *= xn; } return s; };
    const rmse = (xs, ys) => Math.sqrt(xs.reduce((a, x, i) => a + (pred(x) - ys[i]) ** 2, 0) / xs.length);
    slider(ctl, { label: 'degree', min: 0, max: 10, step: 1, value: deg, fmt: v => 'd=' + v, onInput: v => { deg = v; fit(); draw(); } });
    slider(ctl, { label: 'noise', min: 0, max: 0.4, step: 0.02, value: sigma, fmt: v => v.toFixed(2), onInput: v => { sigma = v; regenY(); fit(); draw(); } });
    button(ctl, '↻ new sample', () => { regenY(); fit(); draw(); });
    const ymin = -1.8, ymax = 1.8;
    const X = x => pad + x * (W - 2 * pad);
    const Y = y => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, Y(0)); ctx.lineTo(W - pad, Y(0)); ctx.moveTo(X(0), pad); ctx.lineTo(X(0), H - pad); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.rect(pad, pad - 6, W - 2 * pad, H - 2 * pad + 12); ctx.clip();
      // true function
      ctx.strokeStyle = p.sage; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.8; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const x = i / 200, py = Y(truth(x)); i ? ctx.lineTo(X(x), py) : ctx.moveTo(X(x), py); } ctx.stroke(); ctx.setLineDash([]);
      // held-out test points (faint)
      ctx.fillStyle = p.mute; testX.forEach((x, i) => { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(X(x), Y(testY[i]), 2.4, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      // fitted curve
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = i / 240, py = Y(pred(x)); i ? ctx.lineTo(X(x), py) : ctx.moveTo(X(x), py); } ctx.stroke();
      ctx.restore();
      // training points (gold)
      trainX.forEach((x, i) => { ctx.fillStyle = p.gold; ctx.strokeStyle = p.bg; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(x), Y(trainY[i]), 4.5, 0, 7); ctx.fill(); ctx.stroke(); });
      const trE = rmse(trainX, trainY), teE = rmse(testX, testY);
      let verdict, vc;
      if (teE <= sigma * 1.45 + 0.04) { verdict = 'Good fit'; vc = p.sage; }
      else if (deg <= 1 || trE > sigma * 1.4 + 0.08) { verdict = 'Underfitting — too rigid'; vc = p.violet; }
      else { verdict = 'Overfitting — memorizing noise'; vc = p.rust; }
      info.innerHTML = `degree <b>${deg}</b> &nbsp;·&nbsp; <span style="color:${p.gold}">train RMSE ${trE.toFixed(3)}</span> &nbsp;·&nbsp; <span style="color:${p.mute}">test RMSE ${teE.toFixed(3)}</span> &nbsp;·&nbsp; <b style="color:${vc}">${verdict}</b><br><span style="color:${p.sage}">— true f(x)</span> &nbsp; <span style="color:${p.gold}">● train</span> &nbsp; <span style="color:${p.mute}">● held-out</span> — raise the degree and watch train error fall while held-out error turns back up.`;
    }
    regenY(); fit(); draw();
  });

  /* ========================================================
     20. Backpropagation — the chain rule on a computational graph
     ======================================================== */
  register({ id: 'dl-backprop', topic: 'deep-learning', title: 'Backpropagation', blurb: 'Watch the loss L=(w·x−y)² flow forward, then gradients flow back via the chain rule. ∂L/∂w is exactly the number gradient descent uses.' },
  function (root) {
    const W = 600, H = 380, BW = 96, BH = 58;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const DISP = "Fraunces, Georgia, serif", MONO = "JetBrains Mono, monospace";
    let w = 2, x = 1.5, y = 1;
    slider(ctl, { label: 'w', min: -3, max: 3, step: 0.5, value: w, fmt: v => v.toFixed(1), onInput: v => { w = v; draw(); } });
    slider(ctl, { label: 'x', min: -3, max: 3, step: 0.5, value: x, fmt: v => v.toFixed(1), onInput: v => { x = v; draw(); } });
    slider(ctl, { label: 'y (target)', min: -3, max: 3, step: 0.5, value: y, fmt: v => v.toFixed(1), onInput: v => { y = v; draw(); } });
    function rr(X, Y, w2, h2, r) { ctx.beginPath(); ctx.moveTo(X + r, Y); ctx.arcTo(X + w2, Y, X + w2, Y + h2, r); ctx.arcTo(X + w2, Y + h2, X, Y + h2, r); ctx.arcTo(X, Y + h2, X, Y, r); ctx.arcTo(X, Y, X + w2, Y, r); ctx.closePath(); }
    const N = {
      w: { cx: 82, cy: 70 }, x: { cx: 82, cy: 195 }, y: { cx: 82, cy: 318 },
      mul: { cx: 250, cy: 132 }, sub: { cx: 410, cy: 210 }, sq: { cx: 545, cy: 210 }
    };
    function box(p, n, title, val, grad) {
      const X = n.cx - BW / 2, Y = n.cy - BH / 2;
      ctx.fillStyle = p.panel; ctx.strokeStyle = p.line; ctx.lineWidth = 1.5; rr(X, Y, BW, BH, 9); ctx.fill(); ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = p.ink; ctx.font = '600 12px ' + DISP; ctx.fillText(title, n.cx, Y + 16);
      ctx.fillStyle = p.gold; ctx.font = '12px ' + MONO; ctx.fillText(val, n.cx, Y + 33);
      ctx.fillStyle = p.rust; ctx.font = '10.5px ' + MONO; ctx.fillText(grad, n.cx, Y + 49);
    }
    function edge(p, a, b, label) {
      const x1 = a.cx + BW / 2, y1 = a.cy, x2 = b.cx - BW / 2, y2 = b.cy;
      arrow(ctx, x1, y1, x2, y2, p.mute, 1.8);
      if (label) { ctx.fillStyle = p.soft; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 6); }
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const prod = w * x, err = prod - y, loss = err * err;
      const gErr = 2 * err, gProd = gErr, gW = gProd * x, gX = gProd * w, gY = -gErr;
      // forward edges + local derivatives
      edge(p, N.w, N.mul, '∂p/∂w=x=' + x.toFixed(1));
      edge(p, N.x, N.mul, '∂p/∂x=w=' + w.toFixed(1));
      edge(p, N.mul, N.sub, '∂e/∂p=1');
      edge(p, N.y, N.sub, '∂e/∂y=−1');
      edge(p, N.sub, N.sq, '∂L/∂e=2e=' + gErr.toFixed(1));
      // nodes (value in gold = forward, grad in rust = backward)
      box(p, N.w, 'w', '= ' + w.toFixed(1), '∂L/∂w=' + gW.toFixed(2));
      box(p, N.x, 'x', '= ' + x.toFixed(1), '∂L/∂x=' + gX.toFixed(2));
      box(p, N.y, 'y', '= ' + y.toFixed(1), '∂L/∂y=' + gY.toFixed(2));
      box(p, N.mul, '× : p=w·x', '= ' + prod.toFixed(2), '∂L/∂p=' + gProd.toFixed(2));
      box(p, N.sub, '− : e=p−y', '= ' + err.toFixed(2), '∂L/∂e=' + gErr.toFixed(2));
      box(p, N.sq, '( )² : L=e²', 'L = ' + loss.toFixed(2), '∂L/∂L=1');
      ctx.textAlign = 'left';
      info.innerHTML = `<b style="color:${p.gold}">Forward →</b> w·x=${prod.toFixed(2)}, −y=${err.toFixed(2)}, squared = <b>L=${loss.toFixed(2)}</b>. ` +
        `<b style="color:${p.rust}">← Backward</b> seeds ∂L/∂L=1 and multiplies by each local derivative (the chain rule): ` +
        `<b style="color:${p.rust}">∂L/∂w = 2e·x = ${gW.toFixed(2)}</b> — exactly the gradient that gradient descent subtracts from w. The whole backward pass costs about one forward pass.`;
    }
    draw();
  });

  /* ========================================================
     20b. Backprop step-by-step through a 2-weight chain (with activation)
     ======================================================== */
  register({ id: 'dl-backprop-graph', topic: 'deep-learning', title: 'Backprop step-by-step (with an activation)', blurb: 'Walk the chain rule through a tiny 2-layer network x→·w₁→z₁→σ→a₁→·w₂→ŷ→(ŷ−y)²→L. Step the forward pass, then the backward pass node-by-node — each gradient is the upstream gradient times one local derivative, and the activation contributes σ′(z₁). Toggle ReLU to see why its derivative (0 or 1) gates the gradient.' },
  function (root) {
    const W = 640, H = 410, BW = 96, BH = 56;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const ctl2 = controls(root);
    const info = note(root);
    const DISP = "Fraunces, Georgia, serif", MONO = "JetBrains Mono, monospace";
    let x = 1.5, w1 = 1.0, w2 = 1.5, y = 1.0, useRelu = false, step = 0;
    const MAXSTEP = 8;
    slider(ctl, { label: 'x', min: -3, max: 3, step: 0.5, value: x, fmt: v => v.toFixed(1), onInput: v => { x = v; draw(); } });
    slider(ctl, { label: 'w₁', min: -3, max: 3, step: 0.5, value: w1, fmt: v => v.toFixed(1), onInput: v => { w1 = v; draw(); } });
    slider(ctl, { label: 'w₂', min: -3, max: 3, step: 0.5, value: w2, fmt: v => v.toFixed(1), onInput: v => { w2 = v; draw(); } });
    slider(ctl, { label: 'y (target)', min: -3, max: 3, step: 0.5, value: y, fmt: v => v.toFixed(1), onInput: v => { y = v; draw(); } });
    button(ctl2, '◀ Prev', () => { step = Math.max(0, step - 1); draw(); });
    button(ctl2, 'Next ▶', () => { step = Math.min(MAXSTEP, step + 1); draw(); });
    button(ctl2, '↺ Reset', () => { step = 0; draw(); });
    const actBtn = button(ctl2, 'σ sigmoid', () => { useRelu = !useRelu; actBtn.innerHTML = useRelu ? 'ReLU' : 'σ sigmoid'; draw(); });
    function act(z) { return useRelu ? Math.max(0, z) : 1 / (1 + Math.exp(-z)); }
    function dact(z, a) { return useRelu ? (z > 0 ? 1 : 0) : a * (1 - a); }
    const N = {
      x: { cx: 60, cy: 210 }, w1: { cx: 196, cy: 76 }, z1: { cx: 196, cy: 210 },
      a1: { cx: 330, cy: 210 }, w2: { cx: 464, cy: 76 }, yh: { cx: 464, cy: 210 },
      y: { cx: 540, cy: 340 }, L: { cx: 586, cy: 210 }
    };
    function rr(X, Y, w2_, h2, r) { ctx.beginPath(); ctx.moveTo(X + r, Y); ctx.arcTo(X + w2_, Y, X + w2_, Y + h2, r); ctx.arcTo(X + w2_, Y + h2, X, Y + h2, r); ctx.arcTo(X, Y + h2, X, Y, r); ctx.arcTo(X, Y, X + w2_, Y, r); ctx.closePath(); }
    function box(p, n, title, val, grad, ring) {
      const X = n.cx - BW / 2, Y = n.cy - BH / 2;
      ctx.fillStyle = p.panel; ctx.strokeStyle = ring || p.line; ctx.lineWidth = ring ? 2.6 : 1.4; rr(X, Y, BW, BH, 9); ctx.fill(); ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = p.ink; ctx.font = '600 11.5px ' + DISP; ctx.fillText(title, n.cx, Y + 15);
      if (val !== null) { ctx.fillStyle = p.gold; ctx.font = '12px ' + MONO; ctx.fillText(val, n.cx, Y + 32); }
      if (grad !== null) { ctx.fillStyle = p.rust; ctx.font = '10.5px ' + MONO; ctx.fillText(grad, n.cx, Y + 48); }
    }
    function edge(p, a, b, label, hot) {
      const x1 = a.cx + BW / 2 - 4, y1 = a.cy, x2 = b.cx - BW / 2 + 4, y2 = b.cy;
      arrow(ctx, x1, y1, x2, y2, hot ? p.rust : p.mute, hot ? 2.4 : 1.6);
      if (label) { ctx.fillStyle = hot ? p.rust : p.soft; ctx.font = '9.5px ' + MONO; ctx.textAlign = 'center'; ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 6); }
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // forward values
      const z1 = w1 * x, a1 = act(z1), yh = w2 * a1, L = (yh - y) * (yh - y);
      // backward grads
      const gYh = 2 * (yh - y), gW2 = gYh * a1, gA1 = gYh * w2, gZ1 = gA1 * dact(z1, a1), gW1 = gZ1 * x, gX = gZ1 * w1;
      const f = n => v => step >= n ? v : null; // value shown once forward step n reached
      const ring = (fwdN, bwdN) => (step === fwdN ? p.gold : (step === bwdN ? p.rust : null));
      // edges (local derivatives); hot when the corresponding backward step is active
      edge(p, N.x, N.z1, '∂z₁/∂x=w₁', step === 8);
      edge(p, N.w1, N.z1, '∂z₁/∂w₁=x', step === 8);
      edge(p, N.z1, N.a1, '∂a₁/∂z₁=' + (step >= 7 ? dact(z1, a1).toFixed(2) : "σ′"), step === 7);
      edge(p, N.a1, N.yh, '∂ŷ/∂a₁=w₂', step === 6);
      edge(p, N.w2, N.yh, '∂ŷ/∂w₂=a₁', step === 6);
      edge(p, N.yh, N.L, '∂L/∂ŷ=2(ŷ−y)', step === 5);
      edge(p, N.y, N.L, '∂L/∂y=−2(ŷ−y)', false);
      // nodes: value gated by forward step, grad gated by backward step
      box(p, N.x, 'x (input)', '= ' + x.toFixed(2), step >= 8 ? '∂L/∂x=' + gX.toFixed(3) : null, ring(-1, 8));
      box(p, N.w1, 'w₁', '= ' + w1.toFixed(2), step >= 8 ? '∂L/∂w₁=' + gW1.toFixed(3) : null, ring(-1, 8));
      box(p, N.z1, '× : z₁=w₁·x', f(1)('= ' + z1.toFixed(2)), step >= 7 ? '∂L/∂z₁=' + gZ1.toFixed(3) : null, ring(1, 7));
      box(p, N.a1, (useRelu ? 'ReLU' : 'σ') + ' : a₁', f(2)('= ' + a1.toFixed(3)), step >= 6 ? '∂L/∂a₁=' + gA1.toFixed(3) : null, ring(2, 6));
      box(p, N.w2, 'w₂', '= ' + w2.toFixed(2), step >= 6 ? '∂L/∂w₂=' + gW2.toFixed(3) : null, ring(-1, 6));
      box(p, N.yh, '× : ŷ=w₂·a₁', f(3)('= ' + yh.toFixed(3)), step >= 5 ? '∂L/∂ŷ=' + gYh.toFixed(3) : null, ring(3, 5));
      box(p, N.y, 'y (target)', '= ' + y.toFixed(2), null, null);
      box(p, N.L, '( )² : L', f(4)('= ' + L.toFixed(3)), step >= 5 ? '∂L/∂L=1' : null, ring(4, 5));
      // narration
      ctx.textAlign = 'left';
      const steps = [
        `<b>Step 0 — ready.</b> Inputs <b style="color:${p.gold}">x=${x.toFixed(2)}, w₁=${w1.toFixed(2)}, w₂=${w2.toFixed(2)}, y=${y.toFixed(2)}</b> are set. Press <b>Next ▶</b> to run the forward pass.`,
        `<b style="color:${p.gold}">Forward 1.</b> Multiply: z₁ = w₁·x = ${w1.toFixed(2)}·${x.toFixed(2)} = <b>${z1.toFixed(2)}</b>.`,
        `<b style="color:${p.gold}">Forward 2.</b> Activation: a₁ = ${useRelu ? 'ReLU' : 'σ'}(z₁) = <b>${a1.toFixed(3)}</b>${useRelu ? ' = max(0, z₁)' : ' = 1/(1+e^−z₁)'}.`,
        `<b style="color:${p.gold}">Forward 3.</b> Multiply: ŷ = w₂·a₁ = ${w2.toFixed(2)}·${a1.toFixed(3)} = <b>${yh.toFixed(3)}</b>.`,
        `<b style="color:${p.gold}">Forward 4 — loss.</b> L = (ŷ−y)² = (${yh.toFixed(3)}−${y.toFixed(2)})² = <b>${L.toFixed(3)}</b>. Forward pass done — now go backward.`,
        `<b style="color:${p.rust}">Backward 1.</b> Seed ∂L/∂L=1, then ∂L/∂ŷ = 2(ŷ−y) = <b>${gYh.toFixed(3)}</b>. This is the gradient that will flow back through the graph.`,
        `<b style="color:${p.rust}">Backward 2.</b> Split at the ×: ∂L/∂w₂ = ∂L/∂ŷ·a₁ = ${gYh.toFixed(3)}·${a1.toFixed(3)} = <b>${gW2.toFixed(3)}</b>, and ∂L/∂a₁ = ∂L/∂ŷ·w₂ = <b>${gA1.toFixed(3)}</b> (upstream × local).`,
        `<b style="color:${p.rust}">Backward 3 — through the activation.</b> ∂L/∂z₁ = ∂L/∂a₁·${useRelu ? 'ReLU′' : 'σ′'}(z₁) = ${gA1.toFixed(3)}·${dact(z1, a1).toFixed(2)} = <b>${gZ1.toFixed(3)}</b>. The activation's slope ${useRelu ? '(0 or 1) <b>gates</b>' : '(≤0.25) <b>shrinks</b>'} the gradient — ${useRelu ? 'a dead ReLU passes nothing' : 'this is where vanishing gradients begin'}.`,
        `<b style="color:${p.rust}">Backward 4 — done.</b> ∂L/∂w₁ = ∂L/∂z₁·x = <b>${gW1.toFixed(3)}</b> and ∂L/∂x = ∂L/∂z₁·w₁ = <b>${gX.toFixed(3)}</b>. Every weight now has its gradient — one backward sweep, ~one forward pass of cost.`
      ];
      info.innerHTML = steps[step] + `<br><span style="color:${p.mute}">step ${step}/${MAXSTEP} · <span style="color:${p.gold}">gold = forward value</span> · <span style="color:${p.rust}">rust = gradient ∂L/∂·</span></span>`;
    }
    draw();
  });

  /* ========================================================
     20c. Regularization geometry — why L1 gives sparsity
     ======================================================== */
  register({ id: 'dl-regularization-geometry', topic: 'deep-learning', title: 'Why L1 gives sparsity (the geometry)', blurb: 'The regularized solution is where the loss contours first touch the constraint region. L2 is a circle (touch is generic, off the axes); L1 is a diamond whose corners sit on the axes, so the touch often lands on a corner — setting a weight to exactly 0. Drag the unconstrained optimum and watch L1 snap a coordinate to zero while L2 only shrinks it.' },
  function (root) {
    const W = 460, H = 460;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root); const ctl2 = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace", DISP = "Fraunces, Georgia, serif";
    let wx = 3, wy = 1, t = 2, useL1 = true;
    const RANGE = 4.2, cx = W / 2, cy = H / 2, s = (W / 2 - 30) / RANGE;
    const PX = (x) => cx + x * s, PY = (y) => cy - y * s;
    slider(ctl, { label: 'w₁* (unconstrained)', min: -4, max: 4, step: 0.1, value: wx, fmt: v => v.toFixed(1), onInput: v => { wx = v; draw(); } });
    slider(ctl, { label: 'w₂* (unconstrained)', min: -4, max: 4, step: 0.1, value: wy, fmt: v => v.toFixed(1), onInput: v => { wy = v; draw(); } });
    slider(ctl, { label: 'budget t', min: 0.5, max: 4, step: 0.1, value: t, fmt: v => v.toFixed(1), onInput: v => { t = v; draw(); } });
    const tog = button(ctl2, 'L1 (lasso)', () => { useL1 = !useL1; tog.innerHTML = useL1 ? 'L1 (lasso)' : 'L2 (ridge)'; draw(); });
    function projL2(x, y, R) { const n = Math.hypot(x, y); if (n <= R) return [x, y]; const k = R / n; return [x * k, y * k]; }
    function projL1(x, y, T) {
      const a = Math.abs(x), b = Math.abs(y); if (a + b <= T) return [x, y];
      const hi = Math.max(a, b), lo = Math.min(a, b), tau2 = (a + b - T) / 2; let rh, rl, tau;
      if (tau2 <= lo) { tau = tau2; rh = hi - tau; rl = lo - tau; } else { tau = hi - T; rh = T; rl = 0; }
      const aBig = a >= b, ra = aBig ? rh : rl, rb = aBig ? rl : rh; return [Math.sign(x) * ra, Math.sign(y) * rb];
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // grid + axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let g = -4; g <= 4; g++) { ctx.globalAlpha = g === 0 ? 1 : 0.35; ctx.beginPath(); ctx.moveTo(PX(g), PY(-RANGE)); ctx.lineTo(PX(g), PY(RANGE)); ctx.stroke(); ctx.beginPath(); ctx.moveTo(PX(-RANGE), PY(g)); ctx.lineTo(PX(RANGE), PY(g)); ctx.stroke(); }
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.mute; ctx.font = '11px ' + MONO; ctx.textAlign = 'left'; ctx.fillText('w₁', PX(RANGE) - 22, PY(0) - 6); ctx.fillText('w₂', PX(0) + 6, PY(RANGE) + 14);
      const sol = useL1 ? projL1(wx, wy, t) : projL2(wx, wy, t);
      // loss contours: circles centred at w*, the smallest passing through the solution
      const rSol = Math.hypot(wx - sol[0], wy - sol[1]);
      ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.5;
      [rSol, rSol + 0.7, rSol + 1.5].forEach((r, k) => { if (r <= 0) return; ctx.globalAlpha = k === 0 ? 0.85 : 0.3; ctx.lineWidth = k === 0 ? 2 : 1; ctx.beginPath(); ctx.arc(PX(wx), PY(wy), r * s, 0, 7); ctx.stroke(); });
      ctx.globalAlpha = 1;
      // constraint region at the origin
      ctx.fillStyle = p.sage; ctx.strokeStyle = p.sage; ctx.lineWidth = 2;
      ctx.globalAlpha = 0.14; ctx.beginPath();
      if (useL1) { ctx.moveTo(PX(t), PY(0)); ctx.lineTo(PX(0), PY(t)); ctx.lineTo(PX(-t), PY(0)); ctx.lineTo(PX(0), PY(-t)); ctx.closePath(); }
      else { ctx.arc(PX(0), PY(0), t * s, 0, 7); }
      ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
      // w* (gold) and solution (rust) + connector
      ctx.strokeStyle = p.mute; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(PX(wx), PY(wy)); ctx.lineTo(PX(sol[0]), PY(sol[1])); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(PX(wx), PY(wy), 5, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'left'; ctx.fillText('w*', PX(wx) + 8, PY(wy) - 6);
      ctx.fillStyle = p.rust; ctx.beginPath(); ctx.arc(PX(sol[0]), PY(sol[1]), 6, 0, 7); ctx.fill();
      const sparse = Math.abs(sol[0]) < 1e-4 || Math.abs(sol[1]) < 1e-4;
      const inside = (Math.abs(wx) + Math.abs(wy) <= t && useL1) || (Math.hypot(wx, wy) <= t && !useL1);
      ctx.textAlign = 'left';
      info.innerHTML = `<b style="color:${p.sage}">${useL1 ? 'L1 / lasso' : 'L2 / ridge'}</b> · solution <b style="color:${p.rust}">(${sol[0].toFixed(2)}, ${sol[1].toFixed(2)})</b>. ` +
        (inside ? `w* is inside the budget — no shrinkage needed.` :
          (sparse ? `<b style="color:${p.rust}">Sparse!</b> the contour touched a <b>corner</b> of the diamond, so a weight is exactly <b>0</b> — L1 performs feature selection.` :
            (useL1 ? `touched an edge (both weights nonzero) — drag w* more toward an axis to snap to a corner.` :
              `the circle has no corners, so both weights shrink but neither hits 0 — L2 never zeros a weight.`)));
    }
    draw();
  });

  /* ========================================================
     21. Decoding — temperature + nucleus (top-p) sampling
     ======================================================== */
  register({ id: 'llm-decoding', topic: 'llm', title: 'Decoding: Temperature & Top-p', blurb: 'Reshape a next-token distribution with temperature, then watch the nucleus (top-p) keep only the head of the distribution.' },
  function (root) {
    const W = 560, H = 380, padL = 34, padR = 16, padB = 54, padT = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace", DISP = "Fraunces, Georgia, serif";
    // a fixed next-token scenario after the prompt "The sky is __"
    const toks = ["blue", "clear", "grey", "falling", "the", "42"];
    const logits = [4.0, 3.0, 1.7, 1.2, 0.6, -1.0];
    let T = 1.0, topp = 1.0;
    slider(ctl, { label: 'temperature', min: 0.1, max: 3.0, step: 0.1, value: T, fmt: v => v.toFixed(1), onInput: v => { T = v; draw(); } });
    slider(ctl, { label: 'top-p (nucleus)', min: 0.1, max: 1.0, step: 0.05, value: topp, fmt: v => v.toFixed(2), onInput: v => { topp = v; draw(); } });
    function softmax() {
      const zs = logits.map(z => z / T), mx = Math.max.apply(null, zs);
      const ex = zs.map(z => Math.exp(z - mx)); const s = ex.reduce((a, b) => a + b, 0);
      return ex.map(e => e / s);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const probs = softmax();
      // order tokens by probability (descending) so the nucleus is the left prefix
      const order = probs.map((pr, i) => i).sort((a, b) => probs[b] - probs[a]);
      // nucleus: smallest prefix whose cumulative prob >= topp
      let cum = 0, nucleusCount = 0;
      for (let k = 0; k < order.length; k++) { cum += probs[order[k]]; nucleusCount = k + 1; if (cum >= topp - 1e-9) break; }
      const maxP = Math.max.apply(null, probs);
      const plotW = W - padL - padR, plotH = H - padT - padB, n = order.length, slot = plotW / n, bw = slot * 0.62;
      // baseline
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      let entropy = 0; probs.forEach(pr => { if (pr > 1e-12) entropy -= pr * Math.log2(pr); });
      order.forEach((idx, rank) => {
        const pr = probs[idx], x = padL + rank * slot + (slot - bw) / 2, h = (pr / maxP) * plotH, y = H - padB - h;
        const inNucleus = rank < nucleusCount;
        ctx.fillStyle = inNucleus ? p.gold : p.panel2;
        ctx.strokeStyle = inNucleus ? p.gold : p.line; ctx.lineWidth = 1.5;
        ctx.fillRect(x, y, bw, h); ctx.strokeRect(x, y, bw, h);
        // prob label on top
        ctx.fillStyle = inNucleus ? p.gold : p.mute; ctx.font = '11px ' + MONO; ctx.textAlign = 'center';
        ctx.fillText((pr * 100).toFixed(1) + '%', x + bw / 2, y - 6);
        // token label below
        ctx.fillStyle = inNucleus ? p.ink : p.mute; ctx.font = '12px ' + MONO;
        ctx.fillText('"' + toks[idx] + '"', x + bw / 2, H - padB + 18);
      });
      // nucleus boundary marker
      if (nucleusCount < n) {
        const bx = padL + nucleusCount * slot;
        ctx.strokeStyle = p.rust; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(bx, padT - 6); ctx.lineTo(bx, H - padB); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = p.rust; ctx.font = '10px ' + MONO; ctx.textAlign = 'left';
        ctx.fillText('top-p cutoff →', padL + 4, padT - 12);
      }
      ctx.textAlign = 'left';
      const lbl = T <= 0.4 ? '<span style="color:' + p.gold + '">near-greedy</span> (sharp, repetitive)' :
        T >= 1.6 ? '<span style="color:' + p.rust + '">high temperature</span> (flat, chaotic)' :
        '<span style="color:' + p.sage + '">balanced</span>';
      info.innerHTML = `T = <b>${T.toFixed(1)}</b> · top-p = <b>${topp.toFixed(2)}</b> · ${lbl} · entropy ${entropy.toFixed(2)} bits<br>` +
        `<span style="color:${p.gold}">gold</span> = the <b>${nucleusCount}</b> token${nucleusCount === 1 ? '' : 's'} in the nucleus you sample from (renormalized); ` +
        `the rest are cut. Lower T sharpens toward greedy; higher T flattens; smaller top-p keeps only the head.`;
    }
    draw();
  });

  /* ========================================================
     22. Central Limit Theorem — sampling distribution of the mean
     ======================================================== */
  register({ id: 'ps-clt', topic: 'probability-statistics', title: 'Central Limit Theorem', blurb: 'Average n samples from a skewed or bimodal source and watch the distribution of the mean converge to a bell — whatever the source.' },
  function (root) {
    const W = 560, H = 380, padL = 38, padR = 14, padB = 42, padT = 16;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    const sources = {
      Exponential: { mu: 1, sd: 1, draw: () => -Math.log(Math.random() || 1e-12) },
      Uniform:     { mu: 0.5, sd: Math.sqrt(1 / 12), draw: () => Math.random() },
      Bimodal:     { mu: 0.5, sd: 0.5, draw: () => (Math.random() < 0.5 ? 0 : 1) }
    };
    let srcKey = "Exponential", n = 1, running = null;
    const NB = 41, lo = -4, hi = 4, bw = (hi - lo) / NB;
    let bins = new Array(NB).fill(0), total = 0;
    function addSamples(k) {
      const s = sources[srcKey];
      for (let j = 0; j < k; j++) {
        let sum = 0; for (let i = 0; i < n; i++) sum += s.draw();
        const z = (sum / n - s.mu) / (s.sd / Math.sqrt(n));
        const bi = Math.floor((z - lo) / bw); if (bi >= 0 && bi < NB) { bins[bi]++; total++; }
      }
    }
    function reset(seed) { bins = new Array(NB).fill(0); total = 0; if (seed) addSamples(250); draw(); }
    select(ctl, { label: 'source', value: srcKey, options: Object.keys(sources).map(k => ({ value: k, label: k })), onChange: v => { srcKey = v; reset(true); } });
    slider(ctl, { label: 'sample size n', min: 1, max: 30, step: 1, value: n, fmt: v => 'n=' + v, onInput: v => { n = v; reset(true); } });
    const runBtn = button(ctl, '▶ Run', () => {
      if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; }
      else { runBtn.innerHTML = '⏸ Pause'; running = loop(() => { addSamples(14); if (total > 6000) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; } draw(); }); }
    });
    button(ctl, '↻ Reset', () => { if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; } reset(false); });
    const X = z => padL + (z - lo) / (hi - lo) * (W - padL - padR);
    const ymax = 0.52, Y = d => H - padB - (d / ymax) * (H - padT - padB);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      for (let i = 0; i < NB; i++) {
        const d = total ? bins[i] / (total * bw) : 0, x0 = X(lo + i * bw), x1 = X(lo + (i + 1) * bw), y = Y(d);
        if (d > 0) { ctx.fillStyle = p.gold; ctx.globalAlpha = 0.82; ctx.fillRect(x0 + 0.5, y, Math.max(1, x1 - x0 - 1), (H - padB) - y); ctx.globalAlpha = 1; }
      }
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 220; i++) { const z = lo + (hi - lo) * i / 220, d = Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); i ? ctx.lineTo(X(z), Y(d)) : ctx.moveTo(X(z), Y(d)); } ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      [-3, -2, -1, 0, 1, 2, 3].forEach(z => ctx.fillText(String(z), X(z), H - padB + 14));
      info.innerHTML = `source: <b>${srcKey}</b> &nbsp;·&nbsp; sample size <b>n=${n}</b> &nbsp;·&nbsp; ${total} sample means (standardized)<br>` +
        (n === 1
          ? `At <b>n=1</b> the bars trace the raw <b>${srcKey}</b> shape — often nothing like a bell. Now raise <b>n</b> and press Run.`
          : `Each bar is the standardized <b>average of ${n}</b> draws; as n grows it snaps toward the <span style="color:${p.rust}">standard normal</span> — the Central Limit Theorem, no matter the source.`);
    }
    reset(true);
  });

  /* ========================================================
     61. The Law of Large Numbers — the running average settles onto the true mean (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-lln', topic: 'probability-statistics', title: 'The Law of Large Numbers', blurb: 'Sample a die (or a coin) over and over and watch the running average wander at first, then settle onto the true mean as the count grows. Each draw stays random; their average becomes predictable — and the error shrinks like 1/√n.' },
  function (root) {
    const W = 540, H = 350, padL = 32, padR = 14, padT = 14, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const DIST = {
      die: { name: 'a fair die', f: () => 1 + Math.floor(Math.random() * 6), mu: 3.5, sd: Math.sqrt(35 / 12), lo: 1, hi: 6 },
      coin: { name: 'a coin (0 or 1)', f: () => Math.random() < 0.5 ? 0 : 1, mu: 0.5, sd: 0.5, lo: 0, hi: 1 }
    };
    const MAXN = 400;
    let dist = DIST.die, n = 0, sum = 0, avgs = [], anim = null;
    const X = i => padL + (i / MAXN) * (W - padL - padR);
    function reset() { if (anim) { anim.stop(); anim = null; } n = 0; sum = 0; avgs = []; draw(); }
    function addSamples(k) { for (let i = 0; i < k && n < MAXN; i++) { sum += dist.f(); n++; avgs.push(sum / n); } draw(); }
    function play() { if (anim) { anim.stop(); anim = null; return; } anim = loop(() => { addSamples(4); if (n >= MAXN && anim) { anim.stop(); anim = null; } }); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const yLo = dist.lo, yHi = dist.hi, Y = v => (H - padB) - (v - yLo) / (yHi - yLo) * (H - padB - padT);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'right';
      for (let g = Math.ceil(yLo); g <= yHi; g++) { ctx.beginPath(); ctx.moveTo(padL, Y(g)); ctx.lineTo(W - padR, Y(g)); ctx.stroke(); ctx.fillStyle = p.mute; ctx.fillText(g, padL - 5, Y(g) + 3); }
      // shrinking ±2σ/√n band around the mean
      ctx.fillStyle = p.sage; ctx.globalAlpha = 0.13; ctx.beginPath();
      for (let i = 1; i <= MAXN; i++) { const b = 2 * dist.sd / Math.sqrt(i), yy = Y(Math.min(yHi, dist.mu + b)); i === 1 ? ctx.moveTo(X(i), yy) : ctx.lineTo(X(i), yy); }
      for (let i = MAXN; i >= 1; i--) { const b = 2 * dist.sd / Math.sqrt(i); ctx.lineTo(X(i), Y(Math.max(yLo, dist.mu - b))); }
      ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      // true-mean line
      ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(padL, Y(dist.mu)); ctx.lineTo(W - padR, Y(dist.mu)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.font = '600 11px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('μ = ' + dist.mu, W - padR - 56, Y(dist.mu) - 5);
      // running-average curve
      if (avgs.length) {
        ctx.strokeStyle = p.violet; ctx.lineWidth = 2; ctx.beginPath();
        avgs.forEach((a, i) => { const xx = X(i + 1), yy = Y(Math.max(yLo, Math.min(yHi, a))); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
        const last = avgs[avgs.length - 1]; ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(avgs.length), Y(Math.max(yLo, Math.min(yHi, last))), 3.5, 0, 7); ctx.fill();
      }
      info.innerHTML = n === 0
        ? 'Press “+ 100” or Play to start sampling ' + dist.name + '. The running average will wander at first, then settle onto the true mean μ = ' + dist.mu + '.'
        : 'After <b>' + n + '</b> samples of ' + dist.name + ', the running average is <b style="color:' + p.violet + '">' + (sum / n).toFixed(3) + '</b> — converging to the true mean <b style="color:' + p.gold + '">μ = ' + dist.mu + '</b>. The error shrinks like 1/√n (the sage band): each draw is random, but the average is not.';
    }
    button(ctl, '▶ Play / pause', play);
    button(ctl, '+ 100', () => addSamples(100));
    button(ctl, 'Reset', reset);
    button(ctl, 'Fair die', () => { dist = DIST.die; reset(); });
    button(ctl, 'Coin', () => { dist = DIST.coin; reset(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Law of Large Numbers visualizer: as the sample count grows, the running average of die rolls or coin flips converges to the true mean, staying within a band of width about two sigma over the square root of n around the mean that shrinks as more samples accumulate.');
    draw();
  });

  /* ========================================================
     64. Student's t vs. the normal — fatter tails that converge as df grows (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-t-dist', topic: 'probability-statistics', title: "Student's t vs. the normal", blurb: 'The t-distribution has fatter tails than the normal — more room for extreme values — which is why a small-sample t-test uses a larger critical value. Slide the degrees of freedom and watch the t-curve rise and its tails pull in, converging to the standard normal by about df = 30.' },
  function (root) {
    const W = 540, H = 340, padL = 28, padR = 14, padT = 16, padB = 32, XLO = -5, XHI = 5;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let nu = 5;
    const tShape = (t, v) => Math.pow(1 + t * t / v, -(v + 1) / 2);
    const tNorm = v => { let Z = 0; for (let t = -40; t <= 40; t += 0.05) Z += tShape(t, v) * 0.05; return Z; };
    const normal = t => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI);
    slider(ctl, { label: 'degrees of freedom', min: 1, max: 40, step: 1, value: nu, fmt: v => '' + v, onInput: v => { nu = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const Z = tNorm(nu), tpdf = t => tShape(t, nu) / Z, ymax = 0.43;
      const X = t => padL + (t - XLO) / (XHI - XLO) * (W - padL - padR);
      const Y = y => (H - padB) - y / ymax * (H - padT - padB);
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.3; for (let t = XLO; t <= XHI; t++) { ctx.beginPath(); ctx.moveTo(X(t), padT); ctx.lineTo(X(t), H - padB); ctx.stroke(); } ctx.globalAlpha = 1;
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; for (let t = XLO; t <= XHI; t++) ctx.fillText(t, X(t), H - padB + 13);
      ctx.fillStyle = p.rust; ctx.globalAlpha = 0.18;
      [[2, XHI], [XLO, -2]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(X(a), H - padB); for (let t = a; t <= b; t += 0.05) ctx.lineTo(X(t), Y(tpdf(t))); ctx.lineTo(X(b), H - padB); ctx.closePath(); ctx.fill(); });
      ctx.globalAlpha = 1;
      ctx.strokeStyle = p.mute; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); for (let t = XLO; t <= XHI; t += 0.04) { const xx = X(t), yy = Y(normal(t)); t === XLO ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.4; ctx.beginPath(); for (let t = XLO; t <= XHI; t += 0.04) { const xx = X(t), yy = Y(tpdf(t)); t === XLO ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke();
      ctx.textAlign = 'left'; ctx.font = '11px ' + cssVar('--font-mono', 'monospace');
      ctx.fillStyle = p.violet; ctx.fillText('— t (' + nu + ' df)', padL + 6, padT + 6);
      ctx.fillStyle = p.mute; ctx.fillText('-- normal', padL + 6, padT + 20);
      let tail = 0; for (let t = 2; t <= 40; t += 0.02) tail += tShape(t, nu) / Z * 0.02;
      info.innerHTML = 'Student’s t with <b>' + nu + '</b> degrees of freedom. P(t &gt; 2) = <b style="color:' + p.rust + '">' + (tail * 100).toFixed(1) + '%</b> vs the normal’s 2.3% — ' + (nu < 15 ? 'noticeably fatter tails, so a small-sample t-test needs a larger critical value to hold the same 5% error rate.' : 'nearly identical to the normal now; by df ≈ 30 the difference all but vanishes.');
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Student's t-distribution versus the standard normal: a bell curve with fatter tails (shaded beyond plus or minus 2) for low degrees of freedom, rising and pulling its tails in toward the normal as the degrees of freedom increase.");
    draw();
  });

  /* ========================================================
     65. The ε–δ definition of a limit — for every tolerance there is an interval (Calculus)
     ======================================================== */
  register({ id: 'calc-limit-epsilon', topic: 'calculus', title: 'The ε–δ definition of a limit', blurb: 'The formal limit made visual: choose a tolerance ε (a horizontal band around L) and the widget finds a δ (an interval around a) that keeps the whole curve inside the band. Shrink ε and δ shrinks too — but one always exists. That "for every ε there is a δ" is exactly what lim f = L means.' },
  function (root) {
    const W = 540, H = 350, padL = 32, padR = 14, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const FUNCS = {
      hole: { f: x => x + 1, a: 1, L: 2, hole: true, lo: -1, hi: 3, name: 'f(x) = (x²−1)/(x−1)' },
      quad: { f: x => x * x, a: 1, L: 1, hole: false, lo: -0.5, hi: 2.5, name: 'f(x) = x²' }
    };
    let fn = FUNCS.hole, eps = 0.6;
    slider(ctl, { label: 'tolerance ε', min: 0.1, max: 1, step: 0.05, value: eps, fmt: v => v.toFixed(2), onInput: v => { eps = v; draw(); } });
    button(ctl, 'f(x)=(x²−1)/(x−1)', () => { fn = FUNCS.hole; draw(); });
    button(ctl, 'f(x)=x²', () => { fn = FUNCS.quad; draw(); });
    function findDelta() {
      let d = 0; const step = 0.002, max = Math.min(fn.a - fn.lo, fn.hi - fn.a);
      while (d < max) { const dn = d + step; if (Math.abs(fn.f(fn.a - dn) - fn.L) > eps || Math.abs(fn.f(fn.a + dn) - fn.L) > eps) break; d = dn; }
      return d;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const a = fn.a, L = fn.L, lo = fn.lo, hi = fn.hi, yspan = 2.2, yLo = L - yspan, yHi = L + yspan;
      const X = x => padL + (x - lo) / (hi - lo) * (W - padL - padR);
      const Y = y => (H - padB) - (y - yLo) / (yHi - yLo) * (H - padT - padB);
      const d = findDelta();
      ctx.fillStyle = p.sage; ctx.globalAlpha = 0.14; ctx.fillRect(padL, Y(L + eps), W - padL - padR, Y(L - eps) - Y(L + eps)); ctx.globalAlpha = 1;
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.14; ctx.fillRect(X(a - d), padT, X(a + d) - X(a - d), H - padT - padB); ctx.globalAlpha = 1;
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(padL, Y(L)); ctx.lineTo(W - padR, Y(L)); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(a), padT); ctx.lineTo(X(a), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.2; ctx.beginPath(); let started = false;
      for (let x = lo; x <= hi; x += (hi - lo) / 320) { if (fn.hole && Math.abs(x - a) < 0.012) { started = false; continue; } const yy = Y(fn.f(x)); if (yy < padT || yy > H - padB) { started = false; continue; } const xx = X(x); started ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); started = true; }
      ctx.stroke();
      if (fn.hole) { ctx.fillStyle = p.bg; ctx.strokeStyle = p.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(a), Y(L), 4, 0, 7); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = p.gold; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.fillText('a = ' + a, X(a), H - padB + 13);
      ctx.fillStyle = p.sage; ctx.textAlign = 'left'; ctx.fillText('L ± ε', W - padR - 36, Y(L + eps) - 4);
      info.innerHTML = 'For ' + fn.name + ' near x = ' + a + ', the limit is L = ' + L + '. With tolerance ε = <b style="color:' + p.sage + '">' + eps.toFixed(2) + '</b>, an interval δ = <b style="color:' + p.violet + '">' + d.toFixed(2) + '</b> around a keeps the whole curve inside L ± ε. ' + (fn.hole ? 'Note the open circle — the function isn’t even defined at a, yet the limit exists: the limit ignores f(a).' : 'Shrink ε and δ shrinks with it, but one always exists — that is exactly what lim f(x) = L means.');
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Epsilon-delta limit visualizer: a function curve with a horizontal epsilon band around the limit value L and a vertical delta interval around the point a; shrinking epsilon shrinks delta, but a delta interval keeping the curve inside the band always exists.');
    draw();
  });

  /* ========================================================
     66. Binary min-heap — the array you read as a tree (Algorithms)
     ======================================================== */
  register({ id: 'algo-heap', topic: 'algorithms', title: 'Binary Min-Heap', blurb: "A heap is an array you read as a tree: node i's children sit at 2i+1 and 2i+2, and every parent is ≤ its children. Insert a value and watch it sift up; extract the minimum and watch the last leaf sift down — both in O(log n), the engine behind priority queues and heapsort." },
  function (root) {
    const W = 540, H = 360, padT = 18, treeBottom = 250;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const START = [5, 9, 8, 15, 12, 11];
    let heap = START.slice(), hi = [];
    function siftUp(i) { const path = [i]; while (i > 0) { const p = (i - 1) >> 1; if (heap[p] <= heap[i]) break;[heap[p], heap[i]] = [heap[i], heap[p]]; i = p; path.push(i); } return path; }
    function siftDown(i) { const n = heap.length, path = [i]; for (;;) { let s = i, l = 2 * i + 1, r = 2 * i + 2; if (l < n && heap[l] < heap[s]) s = l; if (r < n && heap[r] < heap[s]) s = r; if (s === i) break;[heap[s], heap[i]] = [heap[i], heap[s]]; i = s; path.push(i); } return path; }
    const maxDepth = () => heap.length ? Math.floor(Math.log2(heap.length)) : 0;
    function nodePos(i) { const d = Math.floor(Math.log2(i + 1)), j = i - ((1 << d) - 1), slots = 1 << d; const x = (j + 0.5) / slots * (W - 36) + 18; const y = padT + 16 + d * ((treeBottom - padT - 26) / Math.max(1, maxDepth())); return { x, y }; }
    function draw(extracted) {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.5;
      for (let i = 1; i < heap.length; i++) { const a = nodePos((i - 1) >> 1), b = nodePos(i); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      heap.forEach((v, i) => { const { x, y } = nodePos(i); const onPath = hi.indexOf(i) >= 0; ctx.fillStyle = onPath ? p.gold : (i === 0 ? p.sage : p.violet); ctx.beginPath(); ctx.arc(x, y, 15, 0, 7); ctx.fill(); ctx.fillStyle = p.bg; ctx.font = '600 13px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(v, x, y); });
      ctx.textBaseline = 'alphabetic';
      // array row (the same data, contiguous) — the tree-array duality
      const n = heap.length, cw = Math.min(40, (W - 36) / Math.max(1, n)), ay = treeBottom + 34, ax = (W - cw * n) / 2;
      ctx.font = '12px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      ctx.fillStyle = p.mute; ctx.fillText('the same heap, stored as an array →', W / 2, ay - 16);
      heap.forEach((v, i) => { const x = ax + i * cw; const onPath = hi.indexOf(i) >= 0; ctx.fillStyle = onPath ? p.gold : p.bg; ctx.strokeStyle = p.line; ctx.fillRect(x, ay, cw - 2, 26); ctx.strokeRect(x, ay, cw - 2, 26); ctx.fillStyle = onPath ? p.bg : p.ink; ctx.fillText(v, x + cw / 2 - 1, ay + 17); ctx.fillStyle = p.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.fillText(i, x + cw / 2 - 1, ay + 38); ctx.font = '12px ' + cssVar('--font-mono', 'monospace'); });
      info.innerHTML = 'Array: [' + heap.join(', ') + ']. Min at the root = <b style="color:' + p.sage + '">' + (n ? heap[0] : '∅') + '</b>. ' + (extracted != null ? 'Extracted the min (<b>' + extracted + '</b>); the last leaf moved to the root and <b style="color:' + p.gold + '">sifted down</b>. ' : (hi.length > 1 ? 'The new value <b style="color:' + p.gold + '">sifted up</b> until its parent was no larger. ' : '')) + 'Children of index i sit at 2i+1 and 2i+2, every parent ≤ its children — so the minimum is always at index 0: O(1) to peek, O(log n) to insert or remove.';
    }
    button(ctl, '+ Insert', () => { heap.push(1 + Math.floor(Math.random() * 20)); hi = siftUp(heap.length - 1); draw(); });
    button(ctl, 'Extract min', () => { if (!heap.length) return; const m = heap[0]; heap[0] = heap[heap.length - 1]; heap.pop(); hi = heap.length ? siftDown(0) : []; draw(m); });
    button(ctl, 'Reset', () => { heap = START.slice(); hi = []; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Binary min-heap visualizer: values drawn as a binary tree above and as the equivalent contiguous array below, with the minimum at the root (array index 0). Inserting sifts a value up the tree; extracting the minimum moves the last leaf to the root and sifts it down.');
    draw();
  });

  /* ========================================================
     67. Conditional expectation E[Y|X] — the regression curve / best predictor (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-conditional-expectation', topic: 'probability-statistics', title: 'Conditional expectation E[Y|X] — the best predictor', blurb: 'Scatter Y against X and slice X into bins: the average Y in each slice is E[Y|X], the curve that best predicts Y from X (it minimizes mean squared error). The slice-averages trace the underlying relationship through the noise — exactly what regression estimates.' },
  function (root) {
    const W = 540, H = 350, padL = 30, padR = 14, padT = 18, padB = 26, TAU = 2 * Math.PI, N = 160;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const f = x => 3 + 2 * Math.sin(x);
    let amp = 1.1, showF = true;
    const jit = i => { const v = Math.sin(i * 127.1) * 43758.5453; return ((v - Math.floor(v)) - 0.5) * 2 * amp; };
    slider(ctl, { label: 'noise', min: 0, max: 2.5, step: 0.1, value: amp, fmt: v => v.toFixed(1), onInput: v => { amp = v; draw(); } });
    button(ctl, 'Toggle true curve', () => { showF = !showF; draw(); });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const pts = []; for (let i = 0; i < N; i++) { const x = (i + 0.5) / N * TAU; pts.push([x, f(x) + jit(i)]); }
      const yLo = -1, yHi = 7;
      const X = x => padL + x / TAU * (W - padL - padR);
      const Y = y => (H - padB) - (y - yLo) / (yHi - yLo) * (H - padT - padB);
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.3; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.fillStyle = p.mute; ctx.globalAlpha = 0.5; pts.forEach(pt => { ctx.beginPath(); ctx.arc(X(pt[0]), Y(pt[1]), 2, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      if (showF) { ctx.strokeStyle = p.sage; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = 0; x <= TAU; x += 0.05) { const xx = X(x), yy = Y(f(x)); x === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); ctx.setLineDash([]); }
      const BINS = 12, means = [];
      for (let b = 0; b < BINS; b++) { const lo = b / BINS * TAU, hi = (b + 1) / BINS * TAU; const ys = pts.filter(pt => pt[0] >= lo && pt[0] < hi).map(pt => pt[1]); if (!ys.length) continue; means.push([(lo + hi) / 2, ys.reduce((a, cc) => a + cc, 0) / ys.length]); }
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.6; ctx.beginPath(); means.forEach((mn, i) => { const xx = X(mn[0]), yy = Y(mn[1]); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
      ctx.fillStyle = p.violet; means.forEach(mn => { ctx.beginPath(); ctx.arc(X(mn[0]), Y(mn[1]), 3.5, 0, 7); ctx.fill(); });
      ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left';
      ctx.fillStyle = p.violet; ctx.fillText('— E[Y|X] (slice averages)', padL + 4, padT + 4);
      if (showF) { ctx.fillStyle = p.sage; ctx.fillText('-- true relationship', padL + 4, padT + 18); }
      info.innerHTML = 'Each violet point is the <b>average Y</b> within a vertical slice of X — an estimate of <b>E[Y|X]</b>. Joined up, they trace the curve that best predicts Y from X (the one minimizing mean squared error). Even at noise ' + amp.toFixed(1) + ' the slice-averages recover the underlying relationship, because averaging cancels the noise. <b>Regression learns exactly this curve</b> — and a straight-line fit is just its best linear approximation.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Conditional expectation visualizer: a scatter of Y against X with the underlying curve, and the average Y within each vertical bin of X plotted as the conditional-expectation curve E[Y given X], which traces the true relationship through the noise.');
    draw();
  });

  /* ========================================================
     68. Kruskal's MST — greedy edge-adding with a union-find cycle check (Algorithms)
     ======================================================== */
  register({ id: 'algo-kruskal', topic: 'algorithms', title: "Kruskal's MST (greedy + union-find)", blurb: "Kruskal builds a minimum spanning tree greedily: sort edges by weight and add each one unless it would close a cycle — a check union-find answers in near-constant time. Step through it and watch the cheapest safe edges accumulate into the lightest tree connecting every node." },
  function (root) {
    const W = 540, H = 340, N = 6;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const POS = [[140, 55], [400, 55], [120, 175], [420, 175], [150, 295], [395, 295]];
    const EDGES = [[0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2], [2, 3, 4], [3, 4, 2], [4, 5, 6], [3, 5, 5], [2, 4, 7]];
    const sorted = EDGES.map(e => ({ u: e[0], v: e[1], w: e[2] })).sort((a, b) => a.w - b.w);
    let parent, step, mst, last;
    const find = x => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    function reset() { parent = Array.from({ length: N }, (_, i) => i); step = 0; mst = []; last = null; draw(); }
    function doStep() { if (step >= sorted.length) return; const e = sorted[step]; const ra = find(e.u), rb = find(e.v); if (ra !== rb) { parent[ra] = rb; mst.push(e); last = { e, added: true }; } else last = { e, added: false }; step++; draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const inMst = new Set(mst.map(e => e.u + '-' + e.v)), cur = last ? last.e : null;
      EDGES.forEach(([u, v, w]) => {
        const a = POS[u], b = POS[v], isMst = inMst.has(u + '-' + v), isCur = cur && cur.u === u && cur.v === v;
        ctx.strokeStyle = isCur ? (last.added ? p.gold : p.rust) : (isMst ? p.sage : p.line);
        ctx.lineWidth = (isMst || isCur) ? 3 : 1.2; ctx.globalAlpha = (isMst || isCur) ? 1 : 0.45;
        if (isCur && !last.added) ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        ctx.fillStyle = p.bg; ctx.fillRect(mx - 8, my - 7, 16, 14);
        ctx.fillStyle = isMst ? p.sage : p.mute; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(w, mx, my);
      });
      POS.forEach((pt, i) => { ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(pt[0], pt[1], 15, 0, 7); ctx.fill(); ctx.fillStyle = p.bg; ctx.font = '600 13px ' + cssVar('--font-mono', 'monospace'); ctx.fillText(i, pt[0], pt[1]); });
      ctx.textBaseline = 'alphabetic';
      const total = mst.reduce((s, e) => s + e.w, 0);
      let msg = step === 0 ? 'Edges sorted by weight; press Step to consider the lightest first.'
        : 'Edge ' + last.e.u + '–' + last.e.v + ' (w=' + last.e.w + '): ' + (last.added
          ? '<b style="color:' + p.sage + '">added</b> — its ends were in different components.'
          : '<b style="color:' + p.rust + '">rejected</b> — both ends already connected, so it would close a cycle.');
      info.innerHTML = msg + ' MST so far: <b>' + mst.length + '</b> edge' + (mst.length === 1 ? '' : 's') + ', total weight <b style="color:' + p.sage + '">' + total + '</b>' + (mst.length === N - 1 ? ' — complete: the lightest tree connecting all ' + N + ' nodes.' : '.');
    }
    button(ctl, 'Step', doStep);
    button(ctl, 'Run', () => { while (step < sorted.length) doStep(); });
    button(ctl, 'Reset', reset);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Kruskal's minimum-spanning-tree visualizer: a weighted graph of 6 nodes; edges are considered in increasing weight order and added to the tree (sage) unless they would form a cycle (rejected, rust), with union-find tracking connected components. The running total weight reaches the minimum 13.");
    reset();
  });

  /* ========================================================
     69. Joint distributions, marginals & independence (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-joint', topic: 'probability-statistics', title: 'Joint distributions, marginals & independence', blurb: 'A joint distribution P(X,Y) shown as a heatmap; sum a column for the marginal P(X), a row for P(Y). Toggle between an independent pair (the joint is exactly the outer product of its marginals — independence error 0) and a correlated one (mass clusters on the diagonal and the joint no longer factors).' },
  function (root) {
    const W = 540, H = 360, n = 5, px = [0.1, 0.2, 0.4, 0.2, 0.1], py = [0.15, 0.25, 0.3, 0.2, 0.1];
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let mode = 'indep';
    function joint() {
      const J = [];
      if (mode === 'indep') { for (let i = 0; i < n; i++) { J[i] = []; for (let j = 0; j < n; j++) J[i][j] = px[i] * py[j]; } }
      else { let s = 0; for (let i = 0; i < n; i++) { J[i] = []; for (let j = 0; j < n; j++) { const w = Math.exp(-(i - j) * (i - j) / 1.2) * (px[i] + 0.05); J[i][j] = w; s += w; } } for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) J[i][j] /= s; }
      return J;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const J = joint(), mx = Array(n).fill(0), my = Array(n).fill(0);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { mx[i] += J[i][j]; my[j] += J[i][j]; }
      let peak = 0, ie = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { peak = Math.max(peak, J[i][j]); ie = Math.max(ie, Math.abs(J[i][j] - mx[i] * my[j])); }
      const cell = 46, gx = 120, gy = 22, mmx = Math.max.apply(null, mx), mmy = Math.max.apply(null, my);
      // heatmap (i = X column, j = Y row; j=0 drawn at bottom)
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const x = gx + i * cell, y = gy + (n - 1 - j) * cell, v = J[i][j] / peak;
        ctx.globalAlpha = 0.12 + 0.88 * v; ctx.fillStyle = p.violet; ctx.fillRect(x, y, cell - 2, cell - 2); ctx.globalAlpha = 1;
        ctx.fillStyle = v > 0.55 ? p.bg : p.mute; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText((J[i][j] * 100).toFixed(0), x + (cell - 2) / 2, y + (cell - 2) / 2);
      }
      const gw = n * cell, gridBottom = gy + gw;
      // P(X) marginal bars below each column (sage)
      ctx.fillStyle = p.sage; for (let i = 0; i < n; i++) { const h = mx[i] / mmx * 34; ctx.fillRect(gx + i * cell, gridBottom + 4, cell - 2, h); }
      // P(Y) marginal bars left of each row (sage)
      for (let j = 0; j < n; j++) { const wbar = my[j] / mmy * 34; const y = gy + (n - 1 - j) * cell; ctx.fillRect(gx - 6 - wbar, y, wbar, cell - 2); }
      // labels
      ctx.fillStyle = p.mute; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText('P(X,Y)', gx, gy - 7);
      ctx.fillText('P(X) →', gx, gridBottom + 50);
      ctx.save(); ctx.translate(gx - 48, gy + gw / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('← P(Y)', 0, 0); ctx.restore();
      info.innerHTML = (mode === 'indep' ? 'Independent X, Y. ' : 'Correlated X, Y. ') + 'Each cell is P(X=i, Y=j); summing a column gives the bottom bar P(X), summing a row gives the left bar P(Y). Independence error max|P(X,Y) − P(X)P(Y)| = <b style="color:' + (ie < 1e-6 ? p.sage : p.rust) + '">' + ie.toFixed(3) + '</b> — ' + (mode === 'indep' ? 'exactly 0, so the joint <em>is</em> the product of its marginals: X and Y are independent.' : 'nonzero: mass clusters where X≈Y, so the joint does not factor — X and Y are dependent.');
    }
    button(ctl, 'Independent', () => { mode = 'indep'; draw(); });
    button(ctl, 'Correlated', () => { mode = 'depend'; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Joint distribution visualizer: a 5 by 5 heatmap of P(X,Y) with marginal bars P(X) below and P(Y) to the left. In independent mode the joint equals the product of the marginals (independence error zero); in correlated mode mass concentrates on the diagonal and the joint no longer factors.');
    draw();
  });

  /* ========================================================
     70. The geometric distribution — waiting for the first success (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-geometric', topic: 'probability-statistics', title: 'The geometric distribution: waiting for the first success', blurb: 'How many independent trials until the first success? The geometric PMF P(X=k)=(1−p)^(k−1)·p decays geometrically — slide the success probability p and watch the wait stretch out, with mean 1/p. Like its continuous twin the exponential, it is memoryless: past failures never shorten the expected remaining wait.' },
  function (root) {
    const W = 540, H = 340, padL = 30, padR = 14, padT = 18, padB = 32, K = 16;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let p = 0.3;
    slider(ctl, { label: 'success probability p', min: 0.1, max: 0.9, step: 0.05, value: p, fmt: v => v.toFixed(2), onInput: v => { p = v; draw(); } });
    function draw() {
      const pr = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pr.bg; ctx.fillRect(0, 0, W, H);
      const pmf = k => Math.pow(1 - p, k - 1) * p, ymax = Math.max(p, 0.05), bw = (W - padL - padR) / K;
      const X = k => padL + (k - 1) * bw, Y = v => (H - padB) - v / ymax * (H - padT - padB);
      ctx.strokeStyle = pr.mute; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      for (let k = 1; k <= K; k++) { const v = pmf(k); ctx.fillStyle = pr.violet; ctx.globalAlpha = 0.9; ctx.fillRect(X(k) + 2, Y(v), bw - 4, (H - padB) - Y(v)); ctx.globalAlpha = 1; }
      const mean = 1 / p;
      if (mean <= K) { const mxp = X(mean) + bw / 2; ctx.strokeStyle = pr.gold; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(mxp, padT); ctx.lineTo(mxp, H - padB); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = pr.gold; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.fillText('mean = ' + mean.toFixed(1), mxp + 4, padT + 8); }
      ctx.fillStyle = pr.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      for (let k = 1; k <= K; k += 2) ctx.fillText(k, X(k) + bw / 2, H - padB + 12);
      ctx.fillText('trials until first success (k)', W / 2, H - 4);
      info.innerHTML = 'P(X=k) = (1−p)^(k−1)·p with p = <b>' + p.toFixed(2) + '</b>. The first bar is P(X=1) = p = ' + p.toFixed(2) + '; each next is (1−p)× the previous — a geometric decay. Mean E[X] = 1/p = <b style="color:' + pr.gold + '">' + mean.toFixed(2) + '</b> trials. It is <b>memoryless</b>: if the first m trials all failed, the distribution of the <em>remaining</em> wait is the same geometric — past failures don’t bring success closer (the discrete twin of the exponential).';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Geometric distribution visualizer: a bar chart of P(X=k)=(1-p)^(k-1)p, the probability the first success lands on trial k, decaying geometrically, with a dashed line at the mean 1/p. Lowering p stretches the wait and flattens the decay.');
    draw();
  });

  /* ========================================================
     71. Newton's method — root-finding by tangent lines (Calculus)
     ======================================================== */
  register({ id: 'calc-newton', topic: 'calculus', title: "Newton's method: root-finding by tangent lines", blurb: "Newton's method finds where f(x)=0 by repeatedly following the tangent line down to the x-axis: x ← x − f(x)/f′(x). Step through it on f(x)=x²−2 and watch the guesses rocket toward √2 — convergence is quadratic, roughly doubling the correct digits each step." },
  function (root) {
    const W = 540, H = 350, padL = 28, padR = 14, padT = 16, padB = 26, XLO = -0.3, XHI = 2.6;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const f = x => x * x - 2, fp = x => 2 * x, ROOT = Math.SQRT2;
    let xs = [2];
    function reset() { xs = [2]; draw(); }
    function step() { const x = xs[xs.length - 1]; if (Math.abs(f(x)) < 1e-9) return; xs.push(x - f(x) / fp(x)); draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const yLo = -2.5, yHi = 4.5;
      const X = x => padL + (x - XLO) / (XHI - XLO) * (W - padL - padR);
      const Y = y => (H - padB) - (y - yLo) / (yHi - yLo) * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.2; ctx.beginPath(); let st = false; for (let x = XLO; x <= XHI; x += 0.02) { const xx = X(x), yy = Y(f(x)); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(ROOT), Y(0), 4, 0, 7); ctx.fill(); ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.fillText('√2', X(ROOT), Y(0) + 15);
      for (let i = 0; i < xs.length - 1; i++) {
        const x0 = xs[i], x1 = xs[i + 1], latest = (i === xs.length - 2);
        ctx.strokeStyle = latest ? p.gold : p.line; ctx.globalAlpha = latest ? 1 : 0.5; ctx.lineWidth = latest ? 2 : 1;
        ctx.beginPath(); ctx.moveTo(X(x0), Y(f(x0))); ctx.lineTo(X(x1), Y(0)); ctx.stroke();
        ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(X(x0), Y(f(x0))); ctx.lineTo(X(x0), Y(0)); ctx.stroke(); ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(x0), Y(f(x0)), 3, 0, 7); ctx.fill();
        ctx.fillStyle = latest ? p.gold : p.mute; ctx.beginPath(); ctx.arc(X(x1), Y(0), 3, 0, 7); ctx.fill();
      }
      const cx = xs[xs.length - 1];
      info.innerHTML = 'Newton: x ← x − f(x)/f′(x), here x ← x − (x²−2)/(2x). After <b>' + (xs.length - 1) + '</b> step' + (xs.length - 1 === 1 ? '' : 's') + ', x = <b style="color:' + p.gold + '">' + cx.toFixed(6) + '</b> (√2 ≈ ' + ROOT.toFixed(6) + '). Each step follows the tangent to where it crosses zero; convergence is <b>quadratic</b> — the number of correct digits roughly doubles per step.';
    }
    button(ctl, 'Step', step);
    button(ctl, 'Run', () => { for (let i = 0; i < 6 && Math.abs(f(xs[xs.length - 1])) > 1e-9; i++) step(); });
    button(ctl, 'Reset', reset);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Newton's method visualizer: the parabola f(x)=x^2-2 with the x-axis; each step draws the tangent at the current guess down to where it crosses zero, giving the next guess, and the guesses converge quadratically to the root sqrt(2).");
    reset();
  });

  /* ========================================================
     72. Area between two curves (Calculus)
     ======================================================== */
  register({ id: 'calc-area', topic: 'calculus', title: 'Area between two curves', blurb: 'The area between an upper and a lower curve is the integral of their difference. Here the region between the line y=2x and the parabola y=x² on [0,2]: slide the right edge and watch the shaded area accumulate as ∫(2x−x²)dx = b²−b³/3, reaching 4/3 at b=2.' },
  function (root) {
    const W = 540, H = 350, padL = 32, padR = 14, padT = 16, padB = 28, XLO = -0.2, XHI = 2.4, YLO = 0, YHI = 4.3;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const f = x => 2 * x, g = x => x * x;
    let b = 1.2;
    slider(ctl, { label: 'right edge b', min: 0, max: 2, step: 0.05, value: b, fmt: v => v.toFixed(2), onInput: v => { b = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + (x - XLO) / (XHI - XLO) * (W - padL - padR);
      const Y = y => (H - padB) - (y - YLO) / (YHI - YLO) * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), padT); ctx.stroke();
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.26; ctx.beginPath();
      let first = true;
      for (let x = 0; x <= b + 1e-9; x += 0.02) { const xx = X(x), yy = Y(f(x)); first ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); first = false; }
      for (let x = b; x >= 0; x -= 0.02) ctx.lineTo(X(x), Y(g(x)));
      ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); first = true; for (let x = XLO; x <= XHI; x += 0.02) { const xx = X(x), yy = Y(f(x)); first ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); first = false; } ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.beginPath(); first = true; for (let x = XLO; x <= XHI; x += 0.02) { const xx = X(x), yy = Y(g(x)); first ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); first = false; } ctx.stroke();
      ctx.strokeStyle = p.sage; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(b), Y(g(b))); ctx.lineTo(X(b), Y(f(b))); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.fillText('y = 2x', X(1.62), Y(f(1.62)) - 6);
      ctx.fillStyle = p.ink; ctx.fillText('y = x²', X(2.02), Y(g(2.02)));
      const area = b * b - b * b * b / 3;
      info.innerHTML = 'Area between curves = ∫(upper − lower) dx. Here ∫₀ᵇ(2x − x²) dx = b² − b³/3 with b = <b>' + b.toFixed(2) + '</b>, a shaded area of <b style="color:' + p.violet + '">' + area.toFixed(3) + '</b>. At b = 2 the curves meet again and the full enclosed area is 4/3 ≈ 1.333. The recipe never changes: subtract the lower curve from the upper, then integrate.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Area-between-curves visualizer: the line y=2x above the parabola y=x^2 on [0,2], with the region between them shaded from 0 to a movable right edge b; the accumulated area b^2 - b^3/3 reaches 4/3 at b=2.');
    draw();
  });

  /* ========================================================
     73. Greedy activity selection (Algorithms)
     ======================================================== */
  register({ id: 'algo-greedy', topic: 'algorithms', title: 'Greedy activity selection', blurb: 'Choosing the most non-overlapping activities: sort by finish time and greedily take each one that starts after the last pick finishes. Step through it and watch the count grow — the earliest-finishing-compatible rule is provably optimal, beating tempting long intervals.' },
  function (root) {
    const W = 540, H = 320, padL = 14, padR = 14, padT = 18, padB = 24, T0 = 0, T1 = 10;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const ACTS = [{ s: 0, f: 2, n: 'A' }, { s: 5, f: 9, n: 'B' }, { s: 3, f: 5, n: 'C' }, { s: 6, f: 8, n: 'D' }, { s: 1, f: 9, n: 'E' }];
    const order = ACTS.slice().sort((a, b) => a.f - b.f);
    let step = 0;
    function compute() {
      let last = -Infinity, count = 0; const status = {};
      for (let i = 0; i < step; i++) { const a = order[i]; if (a.s >= last) { status[a.n] = 'pick'; last = a.f; count++; } else status[a.n] = 'skip'; }
      return { status, last, count };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = t => padL + (t - T0) / (T1 - T0) * (W - padL - padR);
      const { status, last, count } = compute();
      const rowH = (H - padT - padB) / order.length;
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      for (let t = T0; t <= T1; t += 1) ctx.fillText(t, X(t), H - padB + 12);
      if (last > -Infinity) { ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(last), padT); ctx.lineTo(X(last), H - padB); ctx.stroke(); ctx.setLineDash([]); }
      order.forEach((a, i) => {
        const y = padT + i * rowH + 3, h = rowH - 8, st = status[a.n];
        let col = p.line, alpha = 0.5;
        if (st === 'pick') { col = p.sage; alpha = 1; } else if (st === 'skip') { col = p.rust; alpha = 0.55; }
        ctx.globalAlpha = alpha; ctx.fillStyle = col; ctx.fillRect(X(a.s), y, X(a.f) - X(a.s), h); ctx.globalAlpha = 1;
        ctx.fillStyle = (st === 'pick') ? p.bg : p.ink; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(a.n + ' [' + a.s + ',' + a.f + ']', X(a.s) + 5, y + h / 2);
      });
      ctx.textBaseline = 'alphabetic';
      info.innerHTML = 'Sorted by finish time, take each activity that starts at or after the last pick’s finish. Considered <b>' + step + '/' + order.length + '</b>; selected <b style="color:' + p.sage + '">' + count + '</b> (sage), skipped (rust) where the start falls before the gold line (the last finish). The earliest-finish rule is optimal — it beats the tempting long interval E[1,9], which alone would block everything else.';
    }
    button(ctl, 'Step', () => { if (step < order.length) { step++; draw(); } });
    button(ctl, 'Run', () => { step = order.length; draw(); });
    button(ctl, 'Reset', () => { step = 0; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Greedy activity-selection visualizer: five activities as bars on a timeline, considered in finish-time order; each is selected (sage) if it starts at or after the previous pick's finish, otherwise skipped (rust). The greedy rule selects three non-overlapping activities.");
    draw();
  });

  /* ========================================================
     74. Hypothesis testing: p-value & rejection region (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-hyptest', topic: 'probability-statistics', title: 'Hypothesis testing: the p-value and rejection region', blurb: 'Under H0 the test statistic follows the standard normal. The rejection region |z| > 1.96 (α=0.05, two-tailed) is shaded; slide the observed z and watch the p-value — the tail area beyond ±|z| — and the reject / fail-to-reject decision.' },
  function (root) {
    const W = 540, H = 320, padL = 14, padR = 14, padT = 16, padB = 28, ZLO = -4, ZHI = 4, ZC = 1.96;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    function erf(x) { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    const pdf = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
    let zobs = 2.3;
    slider(ctl, { label: 'observed z', min: -3.5, max: 3.5, step: 0.05, value: zobs, fmt: v => v.toFixed(2), onInput: v => { zobs = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = z => padL + (z - ZLO) / (ZHI - ZLO) * (W - padL - padR);
      const ymax = pdf(0), Y = v => (H - padB) - v / ymax * (H - padT - padB);
      function fillArea(a, b, col, alpha) { ctx.fillStyle = col; ctx.globalAlpha = alpha; ctx.beginPath(); ctx.moveTo(X(a), Y(0)); for (let z = a; z <= b + 1e-9; z += 0.02) ctx.lineTo(X(z), Y(pdf(z))); ctx.lineTo(X(b), Y(0)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
      fillArea(ZLO, -ZC, p.rust, 0.18); fillArea(ZC, ZHI, p.rust, 0.18);
      const az = Math.abs(zobs);
      fillArea(ZLO, -az, p.violet, 0.42); fillArea(az, ZHI, p.violet, 0.42);
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2; ctx.beginPath(); let st = false; for (let z = ZLO; z <= ZHI; z += 0.02) { const xx = X(z), yy = Y(pdf(z)); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.strokeStyle = p.rust; ctx.setLineDash([3, 3]); [-ZC, ZC].forEach(zc => { ctx.beginPath(); ctx.moveTo(X(zc), Y(0)); ctx.lineTo(X(zc), padT); ctx.stroke(); }); ctx.setLineDash([]);
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(zobs), Y(0)); ctx.lineTo(X(zobs), Y(pdf(zobs))); ctx.stroke();
      ctx.fillStyle = p.gold; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.fillText('z=' + zobs.toFixed(2), X(zobs), padT + 8);
      ctx.fillStyle = p.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); [-3, -1.96, 0, 1.96, 3].forEach(z => ctx.fillText(z, X(z), H - padB + 12));
      const pv = 2 * (1 - Phi(az)), reject = az >= ZC;
      info.innerHTML = 'Under H₀, z follows the standard normal. The rust tails are the rejection region |z| &gt; 1.96 (α = 0.05, two-tailed). The violet area is the <b>p-value</b> = P(|Z| ≥ |z|) = <b style="color:' + p.violet + '">' + pv.toFixed(3) + '</b>. With z = ' + zobs.toFixed(2) + ' we <b style="color:' + (reject ? p.rust : p.sage) + '">' + (reject ? 'REJECT H₀' : 'FAIL TO REJECT H₀') + '</b> (' + (reject ? 'p &lt; 0.05; the statistic fell in the tail' : 'p ≥ 0.05; not extreme enough') + '). The p-value is the chance of data this extreme <em>if</em> H₀ were true — not the chance H₀ is true.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Hypothesis-test visualizer: the standard-normal curve with the two-tailed rejection region |z| beyond 1.96 shaded in rust; a movable observed-z line shades the p-value tail area in violet, and the note reports the p-value and the reject / fail-to-reject decision.');
    draw();
  });

  /* ========================================================
     75. Bias-variance tradeoff via shrinkage (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-estimator', topic: 'probability-statistics', title: 'Bias-variance tradeoff: why a little shrinkage helps', blurb: "An estimator's error decomposes as MSE = bias² + variance. For a shrinkage estimator θ̂=(1−λ)X, more shrinkage (λ up) adds bias but cuts variance — and the MSE is minimized at some λ>0, so a slightly biased estimator can beat the unbiased one. Slide λ and watch the decomposition." },
  function (root) {
    const W = 540, H = 330, padL = 38, padR = 14, padT = 16, padB = 30, LO = 0, HI = 0.5, YHI = 5;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const theta = 5, s2 = 4;
    const bias2 = l => (l * theta) * (l * theta), variance = l => (1 - l) * (1 - l) * s2, mse = l => bias2(l) + variance(l);
    const lamStar = s2 / (theta * theta + s2);
    let lam = 0.0;
    slider(ctl, { label: 'shrinkage λ', min: 0, max: 0.5, step: 0.01, value: lam, fmt: v => v.toFixed(2), onInput: v => { lam = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = l => padL + (l - LO) / (HI - LO) * (W - padL - padR);
      const Y = y => (H - padB) - Math.min(y, YHI) / YHI * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.moveTo(padL, H - padB); ctx.lineTo(padL, padT); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'right'; for (let y = 0; y <= YHI; y += 1) ctx.fillText(y, padL - 4, Y(y) + 3);
      function curve(fn, col, w) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); let st = false; for (let l = LO; l <= HI + 1e-9; l += 0.005) { const yy = Y(fn(l)), xx = X(l); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke(); }
      curve(bias2, p.rust, 1.6); curve(variance, p.violet, 1.6); curve(mse, p.gold, 2.4);
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(lamStar), Y(mse(lamStar)), 4, 0, 7); ctx.fill();
      ctx.strokeStyle = p.ink; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(lam), H - padB); ctx.lineTo(X(lam), padT); ctx.stroke(); ctx.setLineDash([]);
      [[bias2, p.rust], [variance, p.violet], [mse, p.gold]].forEach(d => { ctx.fillStyle = d[1]; ctx.beginPath(); ctx.arc(X(lam), Y(d[0](lam)), 3, 0, 7); ctx.fill(); });
      ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left';
      ctx.fillStyle = p.rust; ctx.fillText('bias²', X(0.42), Y(bias2(0.42)) - 4);
      ctx.fillStyle = p.violet; ctx.fillText('variance', padL + 6, Y(variance(0.0)) - 4);
      ctx.fillStyle = p.gold; ctx.fillText('MSE', X(0.27), Y(mse(0.27)) - 6);
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('shrinkage λ', W / 2, H - 4);
      info.innerHTML = 'MSE(λ) = bias² + variance. At λ = <b>' + lam.toFixed(2) + '</b>: bias² = <b style="color:' + p.rust + '">' + bias2(lam).toFixed(2) + '</b>, variance = <b style="color:' + p.violet + '">' + variance(lam).toFixed(2) + '</b>, MSE = <b style="color:' + p.gold + '">' + mse(lam).toFixed(2) + '</b>. The unbiased estimator (λ=0) has MSE ' + mse(0).toFixed(2) + ', but the minimum sits at λ ≈ ' + lamStar.toFixed(2) + ' with MSE ' + mse(lamStar).toFixed(2) + ' — a little bias buys a big cut in variance.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Bias-variance tradeoff visualizer: as shrinkage lambda increases, the bias-squared curve (rust) rises while variance (violet) falls; their sum, the MSE (gold), is U-shaped and minimized at a positive lambda, below the unbiased estimator at lambda zero.');
    draw();
  });

  /* ========================================================
     76. Critical points: min, max, saddle (Calculus)
     ======================================================== */
  register({ id: 'calc-saddle', topic: 'calculus', title: 'Critical points: min, max, and saddle', blurb: 'At a critical point (∇f=0) the Hessian decides the type: both eigenvalues positive → minimum, both negative → maximum, mixed signs → saddle. Switch between a bowl, a dome, and a saddle and read the classification off the surface curvature.' },
  function (root) {
    const W = 380, H = 380, N = 60, LO = -2, HI = 2;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const fns = {
      bowl: { f: (x, y) => x * x + y * y, ev: '+2, +2', cls: 'local MINIMUM', H: '[[2, 0], [0, 2]]' },
      saddle: { f: (x, y) => x * x - y * y, ev: '+2, −2', cls: 'SADDLE point', H: '[[2, 0], [0, −2]]' },
      dome: { f: (x, y) => -x * x - y * y, ev: '−2, −2', cls: 'local MAXIMUM', H: '[[−2, 0], [0, −2]]' }
    };
    let mode = 'saddle';
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const F = fns[mode].f, cw = W / N, ch = H / N;
      let mx = 0;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const x = LO + (i + 0.5) / N * (HI - LO), y = LO + (j + 0.5) / N * (HI - LO); mx = Math.max(mx, Math.abs(F(x, y))); }
      mx = mx || 1;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const x = LO + (i + 0.5) / N * (HI - LO), y = LO + (j + 0.5) / N * (HI - LO), v = F(x, y) / mx;
        ctx.fillStyle = v >= 0 ? p.violet : p.rust; ctx.globalAlpha = 0.1 + 0.85 * Math.abs(v);
        ctx.fillRect(i * cw, H - (j + 1) * ch, cw + 1, ch + 1);
      }
      ctx.globalAlpha = 1;
      const ox = W / 2, oy = H / 2;
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(ox, oy, 5, 0, 7); ctx.fill();
      ctx.strokeStyle = p.bg; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ox, oy, 5, 0, 7); ctx.stroke();
      const d = fns[mode];
      info.innerHTML = 'f(x,y) as a heatmap (violet = higher, rust = lower) with the critical point ∇f=0 at the gold origin. Hessian H = ' + d.H + ', eigenvalues ' + d.ev + ' → <b>' + d.cls + '</b>. Both eigenvalues positive ⇒ the surface curves up in every direction (a bowl); both negative ⇒ down (a dome); <em>mixed</em> signs ⇒ up one way and down another — a saddle, which is neither a max nor a min.';
    }
    button(ctl, 'Bowl (min)', () => { mode = 'bowl'; draw(); });
    button(ctl, 'Saddle', () => { mode = 'saddle'; draw(); });
    button(ctl, 'Dome (max)', () => { mode = 'dome'; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Critical-point visualizer: a heatmap of f(x,y) around the origin critical point. Bowl mode (x^2+y^2) curves up everywhere (minimum); dome mode curves down (maximum); saddle mode (x^2-y^2) curves up along one axis and down the other, classified by the signs of the two Hessian eigenvalues.');
    draw();
  });

  /* ========================================================
     77. Gradient-descent convergence: learning-rate regimes (Calculus)
     ======================================================== */
  register({ id: 'calc-gd', topic: 'calculus', title: 'Gradient-descent convergence: the learning-rate regimes', blurb: 'Gradient descent on f(x)=x² updates x ← x − η·2x = x(1−2η). It converges only when |1−2η| < 1, i.e. 0 < η < 1: too small crawls, η=0.5 lands in one step, between 0.5 and 1 it oscillates inward, and η ≥ 1 diverges. Slide the learning rate and watch the trajectory.' },
  function (root) {
    const W = 540, H = 340, padL = 28, padR = 14, padT = 18, padB = 26, XLO = -6, XHI = 6, YHI = 12;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const f = x => x * x;
    let lr = 0.1;
    slider(ctl, { label: 'learning rate η', min: 0.05, max: 1.2, step: 0.05, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; draw(); } });
    function traj() { let x = 2; const s = [x]; for (let i = 0; i < 8; i++) { x = x - lr * 2 * x; s.push(x); if (Math.abs(x) > 6) break; } return s; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + (x - XLO) / (XHI - XLO) * (W - padL - padR);
      const Y = y => (H - padB) - Math.min(y, YHI) / YHI * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), padT); ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2; ctx.beginPath(); let st = false; for (let x = XLO; x <= XHI; x += 0.05) { if (f(x) <= YHI) { const xx = X(x), yy = Y(f(x)); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } else st = false; } ctx.stroke();
      const T = traj();
      for (let i = 0; i < T.length; i++) {
        const cx = X(T[i]), cy = Y(f(T[i]));
        if (i > 0) { ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(T[i - 1]), Y(f(T[i - 1]))); ctx.lineTo(cx, cy); ctx.stroke(); }
        ctx.fillStyle = (i === T.length - 1) ? p.gold : p.violet; ctx.beginPath(); ctx.arc(cx, cy, i === T.length - 1 ? 5 : 3, 0, 7); ctx.fill();
      }
      const r = Math.abs(1 - 2 * lr); let regime, col;
      if (r >= 1) { regime = 'DIVERGES (η ≥ 1)'; col = p.rust; }
      else if (Math.abs(lr - 0.5) < 1e-9) { regime = 'converges in ONE step (η = 0.5)'; col = p.sage; }
      else if (lr > 0.5) { regime = 'oscillates but converges'; col = p.gold; }
      else { regime = 'converges slowly'; col = p.violet; }
      info.innerHTML = 'Gradient descent on f(x)=x²: x ← x − η·f′(x) = x(1−2η), from x=2. Convergence needs |1−2η| &lt; 1, i.e. 0 &lt; η &lt; 1; here |1−2η| = <b>' + r.toFixed(2) + '</b> → <b style="color:' + col + '">' + regime + '</b>. Too small a step crawls; η=0.5 hits the minimum in one jump; between 0.5 and 1 it overshoots and zig-zags inward; at η ≥ 1 each step grows — the same divergence that blows up real training when the learning rate is set too high.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Gradient-descent convergence visualizer: the parabola f(x)=x^2 with the descent trajectory from x=2 for an adjustable learning rate eta. Below 0.5 it converges slowly, at 0.5 in one step, between 0.5 and 1 it oscillates inward, and at eta 1 or above it diverges outward.');
    draw();
  });

  /* ========================================================
     78. The chain rule: rates multiply (Calculus)
     ======================================================== */
  register({ id: 'calc-chain', topic: 'calculus', title: 'The chain rule: rates multiply', blurb: 'For a composition y=f(g(x)) the derivative is f′(g(x))·g′(x) — the inner and outer rates multiply. Here y=sin²x: slide x and watch the tangent slope equal (2·sin x)·(cos x), the outer rate 2u (with u=sin x) times the inner rate cos x.' },
  function (root) {
    const W = 540, H = 320, padL = 28, padR = 14, padT = 18, padB = 26, XLO = 0, XHI = 2 * Math.PI, YLO = -0.1, YHI = 1.1;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const g = x => Math.sin(x), f = u => u * u, y = x => f(g(x)), slope = x => 2 * Math.sin(x) * Math.cos(x);
    let xp = 0.6;
    slider(ctl, { label: 'x', min: 0, max: 6.28, step: 0.02, value: xp, fmt: v => v.toFixed(2), onInput: v => { xp = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + (x - XLO) / (XHI - XLO) * (W - padL - padR);
      const Y = v => (H - padB) - (v - YLO) / (YHI - YLO) * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2; ctx.beginPath(); let st = false; for (let x = XLO; x <= XHI; x += 0.02) { const xx = X(x), yy = Y(y(x)); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      const m = slope(xp), y0 = y(xp), dx = 0.8;
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(xp - dx), Y(y0 - m * dx)); ctx.lineTo(X(xp + dx), Y(y0 + m * dx)); ctx.stroke();
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(xp), Y(y0), 5, 0, 7); ctx.fill();
      const gp = Math.cos(xp), fp = 2 * Math.sin(xp);
      info.innerHTML = 'y = sin²x = f(g(x)) with g(x)=sin x, f(u)=u². The gold tangent has slope dy/dx = <b style="color:' + p.gold + '">' + m.toFixed(3) + '</b>. The chain rule splits it: outer rate f′(g)=2·sin x = <b>' + fp.toFixed(3) + '</b>, inner rate g′(x)=cos x = <b>' + gp.toFixed(3) + '</b>, and their product ' + fp.toFixed(3) + ' × ' + gp.toFixed(3) + ' = <b>' + (fp * gp).toFixed(3) + '</b> matches the slope. A nudge in x is scaled by g′ into u, then by f′ into y — the rates multiply.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Chain-rule visualizer: the curve y=sin^2 x with a movable tangent line whose slope equals the product of the inner rate cos x and the outer rate 2 sin x, demonstrating dy/dx = f-prime(g(x)) times g-prime(x).');
    draw();
  });

  /* ========================================================
     79. Precision, recall & the classification threshold (Deep Learning)
     ======================================================== */
  register({ id: 'ml-threshold', topic: 'deep-learning', title: 'Precision, recall, and the classification threshold', blurb: 'A classifier scores each example; a threshold turns scores into yes/no. Slide it over two overlapping score distributions (negatives and positives) and watch precision rise as recall falls — the fundamental tradeoff, balanced by F1.' },
  function (root) {
    const W = 540, H = 320, padL = 22, padR = 14, padT = 16, padB = 28, XLO = -4, XHI = 4;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    function erf(x) { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    const pdf = (x, mu) => Math.exp(-(x - mu) * (x - mu) / 2) / Math.sqrt(2 * Math.PI);
    let thr = 0;
    slider(ctl, { label: 'threshold', min: -3, max: 3, step: 0.05, value: thr, fmt: v => v.toFixed(2), onInput: v => { thr = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + (x - XLO) / (XHI - XLO) * (W - padL - padR);
      const ymax = pdf(0, 0), Y = v => (H - padB) - v / ymax * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      function fillRight(mu, col, alpha) { ctx.fillStyle = col; ctx.globalAlpha = alpha; ctx.beginPath(); ctx.moveTo(X(thr), Y(0)); for (let x = thr; x <= XHI; x += 0.03) ctx.lineTo(X(x), Y(pdf(x, mu))); ctx.lineTo(X(XHI), Y(0)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
      fillRight(1, p.sage, 0.35); fillRight(-1, p.rust, 0.3);
      function curve(mu, col) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); let st = false; for (let x = XLO; x <= XHI; x += 0.03) { const xx = X(x), yy = Y(pdf(x, mu)); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke(); }
      curve(-1, p.rust); curve(1, p.sage);
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(thr), padT); ctx.lineTo(X(thr), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.fillText('t=' + thr.toFixed(2), X(thr), padT + 8);
      ctx.fillStyle = p.rust; ctx.fillText('negatives', X(-1), H - padB + 12); ctx.fillStyle = p.sage; ctx.fillText('positives', X(1), H - padB + 12);
      const recall = Phi(1 - thr), fpr = Phi(-1 - thr), precision = recall / (recall + fpr), f1 = 2 * precision * recall / (precision + recall);
      info.innerHTML = 'Two equal classes: negatives ~ N(−1,1) (rust), positives ~ N(+1,1) (sage). Predict "positive" when score ≥ t. At t = <b>' + thr.toFixed(2) + '</b>: recall = TP/(TP+FN) = <b style="color:' + p.sage + '">' + recall.toFixed(2) + '</b>, precision = TP/(TP+FP) = <b style="color:' + p.gold + '">' + precision.toFixed(2) + '</b>, F1 = <b>' + f1.toFixed(2) + '</b>. Raise the threshold → fewer false positives (precision up) but more missed positives (recall down); lower it for the reverse. F1 balances the two and peaks where the classes are best separated.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Precision-recall threshold visualizer: two overlapping score distributions (negatives and positives) with a movable decision threshold; raising the threshold increases precision and lowers recall, and the note reports precision, recall, and F1.');
    draw();
  });

  /* ========================================================
     80. PPO's clipped surrogate objective (Reinforcement Learning)
     ======================================================== */
  register({ id: 'rl-ppo-clip', topic: 'reinforcement-learning', title: "PPO's clipped surrogate objective", blurb: 'PPO maximizes min(r·A, clip(r,1−ε,1+ε)·A), where r is the new/old policy ratio and A the advantage. Toggle the advantage sign and watch the clip flatten the objective beyond r=1±ε — capping how far one update can move the policy.' },
  function (root) {
    const W = 540, H = 330, padL = 30, padR = 14, padT = 16, padB = 28, RLO = 0, RHI = 2, YLO = -2, YHI = 1.5, eps = 0.2;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const clip = (r, lo, hi) => Math.max(lo, Math.min(hi, r));
    let A = 1;
    const L = r => Math.min(r * A, clip(r, 1 - eps, 1 + eps) * A);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = r => padL + (r - RLO) / (RHI - RLO) * (W - padL - padR);
      const Y = v => (H - padB) - (v - YLO) / (YHI - YLO) * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.strokeStyle = p.line; ctx.setLineDash([3, 3]); [1 - eps, 1, 1 + eps].forEach(r => { ctx.beginPath(); ctx.moveTo(X(r), padT); ctx.lineTo(X(r), H - padB); ctx.stroke(); }); ctx.setLineDash([]);
      ctx.strokeStyle = p.mute; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X(RLO), Y(RLO * A)); ctx.lineTo(X(RHI), Y(RHI * A)); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.strokeStyle = A > 0 ? p.sage : p.rust; ctx.lineWidth = 2.4; ctx.beginPath(); let st = false; for (let r = RLO; r <= RHI; r += 0.01) { const yy = Y(L(r)), xx = X(r); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('1−ε', X(1 - eps), H - padB + 12); ctx.fillText('1', X(1), H - padB + 12); ctx.fillText('1+ε', X(1 + eps), H - padB + 12);
      ctx.fillText('policy ratio r', W / 2, H - 3);
      info.innerHTML = A > 0
        ? 'Advantage A = +1 (a good action). The raw objective r·A (faint) rises with r, but the clipped objective (sage) <b>flattens at r = 1+ε = 1.2</b>: once the new policy makes this good action 20% more likely, pushing further earns no extra reward — so the update is capped, with no incentive to over-commit on one batch.'
        : 'Advantage A = −1 (a bad action). The clip <b>floors the objective at r = 1−ε = 0.8</b> (decreasing the probability further earns nothing), but on the other side it keeps falling for r &gt; 1.2 — <em>unclipped</em>. That asymmetry is deliberate: if a bad action somehow became more likely, PPO still pushes hard to bring its probability back down (no cap on undoing a mistake).';
    }
    button(ctl, 'Positive advantage', () => { A = 1; draw(); });
    button(ctl, 'Negative advantage', () => { A = -1; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "PPO clipped-surrogate visualizer: the objective as a function of the policy ratio r. For positive advantage it rises then flattens at r=1+epsilon (capping the update); for negative advantage it is floored at r=1-epsilon but keeps decreasing past r=1+epsilon, showing the asymmetric clip.");
    draw();
  });

  /* ========================================================
     81. Anatomy of a transformer block (LLM)
     ======================================================== */
  register({ id: 'llm-transformer-block', topic: 'llm', title: 'Anatomy of a transformer block', blurb: 'A transformer block is two sublayers on a residual stream: multi-head self-attention (mix information across tokens) then a position-wise feed-forward network (compute per token), each wrapped in a residual add and a layer norm. Toggle the sublayers to see what each does.' },
  function (root) {
    const W = 460, H = 430;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let mode = 'attn';
    // boxes: {y, h, label, key}  (x centered band)
    const cx = W * 0.40, bw = 210;
    const boxes = [
      { y: 372, h: 40, label: 'Token + positional embeddings', key: 'in' },
      { y: 300, h: 46, label: 'Multi-Head Self-Attention', key: 'attn' },
      { y: 256, h: 30, label: 'Add  &  Norm', key: 'an1' },
      { y: 178, h: 46, label: 'Feed-Forward (MLP)', key: 'ffn' },
      { y: 134, h: 30, label: 'Add  &  Norm', key: 'an2' },
      { y: 58, h: 40, label: 'To the next block', key: 'out' }
    ];
    function rrect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // residual stream (vertical spine) connecting box centers
      ctx.strokeStyle = p.mute; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, boxes[0].y); ctx.lineTo(cx, boxes[boxes.length - 1].y + boxes[boxes.length - 1].h); ctx.stroke();
      // residual skip arrows (around attention, around FFN) on the right
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
      [[boxes[1], boxes[2]], [boxes[3], boxes[4]]].forEach(pair => {
        const xR = cx + bw / 2 + 16, yTop = pair[0].y, yBot = pair[1].y + pair[1].h;
        ctx.beginPath(); ctx.moveTo(cx + bw / 2, yBot - 6); ctx.lineTo(xR, yBot - 6); ctx.lineTo(xR, yTop + 8); ctx.lineTo(cx + bw / 2, yTop + 8); ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '9px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.fillText('residual', cx + bw / 2 + 20, 240); ctx.fillText('residual', cx + bw / 2 + 20, 118);
      // boxes
      boxes.forEach(b => {
        const x = cx - bw / 2, hot = (b.key === mode);
        let fill = p.line, edge = p.mute, txt = p.ink;
        if (b.key === 'attn') { edge = p.sage; if (mode === 'attn') { fill = p.sage; txt = p.bg; } }
        else if (b.key === 'ffn') { edge = p.violet; if (mode === 'ffn') { fill = p.violet; txt = p.bg; } }
        else if (b.key === 'in' || b.key === 'out') { edge = p.gold; }
        ctx.globalAlpha = hot ? 1 : (b.key === 'attn' || b.key === 'ffn' ? 0.85 : 0.6);
        ctx.fillStyle = fill; rrect(x, b.y, bw, b.h, 7); ctx.fill();
        ctx.globalAlpha = 1; ctx.strokeStyle = edge; ctx.lineWidth = hot ? 2.4 : 1.4; rrect(x, b.y, bw, b.h, 7); ctx.stroke();
        ctx.fillStyle = txt; ctx.font = (hot ? 'bold ' : '') + '12px ' + cssVar('--font-disp', 'sans-serif'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.label, cx, b.y + b.h / 2);
      });
      ctx.textBaseline = 'alphabetic';
      info.innerHTML = mode === 'attn'
        ? 'Highlighted: <b style="color:' + p.sage + '">Multi-Head Self-Attention</b> — the <em>communicate</em> step. Every token looks at every other and pulls in relevant context; it is the only place positions exchange information. Its output is <b>added back</b> to the residual stream (the gold skip) and layer-normalized, so the block learns a correction, not a replacement.'
        : 'Highlighted: <b style="color:' + p.violet + '">Feed-Forward (MLP)</b> — the <em>compute</em> step. The same little network is applied to each token independently (no cross-token mixing), transforming its now-contextualized vector. Roughly two-thirds of a transformer\'s parameters live here. Its output is also <b>added back</b> via the residual and normalized.';
    }
    button(ctl, 'Attention', () => { mode = 'attn'; draw(); });
    button(ctl, 'Feed-Forward', () => { mode = 'ffn'; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Transformer-block schematic: a residual stream rising from token+positional embeddings through Multi-Head Self-Attention (with Add and Norm), then a Feed-Forward MLP (with Add and Norm), to the next block. Gold dashed skip arrows mark the residual connections around each sublayer. Attention mixes information across tokens; the feed-forward network computes per token.');
    draw();
  });

  /* ========================================================
     82. The next-token loss: cross-entropy & perplexity (LLM)
     ======================================================== */
  register({ id: 'llm-cross-entropy', topic: 'llm', title: 'The next-token loss: cross-entropy & perplexity', blurb: 'Pretraining minimizes the cross-entropy of the next token: loss = −log(probability the model gave the actual next token). Slide the mass on the true token and watch the loss — and perplexity = e^loss — fall as the model grows confident in the right answer.' },
  function (root) {
    const W = 540, H = 320, padL = 28, padR = 14, padT = 18, padB = 46, N = 5;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const tokens = ['the', 'a', 'cat', 'of', 'to'], TRUE = 2;
    let p = 0.4;
    slider(ctl, { label: 'P(true token)', min: 0.05, max: 0.95, step: 0.05, value: p, fmt: v => v.toFixed(2), onInput: v => { p = v; draw(); } });
    function draw() {
      const pr = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pr.bg; ctx.fillRect(0, 0, W, H);
      const other = (1 - p) / (N - 1), probs = tokens.map((t, i) => i === TRUE ? p : other);
      const bw = (W - padL - padR) / N, ymax = Math.max(p, other, 0.05);
      const X = i => padL + i * bw, Y = v => (H - padB) - v / ymax * (H - padT - padB);
      ctx.strokeStyle = pr.mute; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      probs.forEach((q, i) => {
        ctx.fillStyle = (i === TRUE) ? pr.sage : pr.violet; ctx.globalAlpha = (i === TRUE) ? 1 : 0.55; ctx.fillRect(X(i) + 6, Y(q), bw - 12, (H - padB) - Y(q)); ctx.globalAlpha = 1;
        ctx.fillStyle = pr.mute; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.fillText('"' + tokens[i] + '"', X(i) + bw / 2, H - padB + 16);
        ctx.fillText(q.toFixed(2), X(i) + bw / 2, Y(q) - 4);
      });
      ctx.fillStyle = pr.sage; ctx.textAlign = 'center'; ctx.font = '10px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('↑ true next token', X(TRUE) + bw / 2, H - padB + 30);
      const loss = -Math.log(p), ppl = Math.exp(loss);
      info.innerHTML = 'The model predicts a distribution over the next token; the true one is <b style="color:' + pr.sage + '">"cat"</b>, given probability <b>' + p.toFixed(2) + '</b>. Cross-entropy loss = −log(p) = <b style="color:' + pr.gold + '">' + loss.toFixed(2) + '</b> nats; perplexity = e^loss = 1/p = <b>' + ppl.toFixed(2) + '</b>. The loss depends <em>only</em> on the mass placed on the true token — confident-and-right costs almost nothing; confident-and-wrong (p → 0) is punished without bound.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Next-token cross-entropy visualizer: a bar chart of the model probability over five candidate tokens with the true token highlighted; a slider sets the probability mass on the true token, and the note reports cross-entropy loss = minus log p and perplexity = 1/p.');
    draw();
  });

  /* ========================================================
     83. Why the KV cache makes generation linear (LLM)
     ======================================================== */
  register({ id: 'llm-kv-cache', topic: 'llm', title: 'Why the KV cache makes generation linear', blurb: 'Generating token t needs attention over the t tokens before it. Without a KV cache the model reprocesses the whole prefix every step — O(t²) per token; caching the keys/values makes it O(t). Slide the context length and watch the quadratic curve pull away from the linear one.' },
  function (root) {
    const W = 540, H = 320, padL = 30, padR = 14, padT = 18, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let N = 30;
    slider(ctl, { label: 'context length N', min: 10, max: 60, step: 2, value: N, fmt: v => v.toFixed(0), onInput: v => { N = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const YHI = N * N;
      const X = t => padL + (t / N) * (W - padL - padR);
      const Y = v => (H - padB) - Math.min(v, YHI) / YHI * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(padL, Y(0)); ctx.lineTo(padL, padT); ctx.stroke();
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2.4; ctx.beginPath(); let st = false; for (let t = 0; t <= N; t += 0.5) { const xx = X(t), yy = Y(t * t); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2.4; ctx.beginPath(); st = false; for (let t = 0; t <= N; t += 0.5) { const xx = X(t), yy = Y(t); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'right';
      ctx.fillStyle = p.rust; ctx.fillText('no cache: O(t²)', W - padR - 4, padT + 12);
      ctx.fillStyle = p.sage; ctx.fillText('with cache: O(t)', W - padR - 4, Y(N) - 6);
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('token position t', W / 2, H - 4);
      const totW = N * (N + 1) / 2, totN = N * (N + 1) * (2 * N + 1) / 6;
      info.innerHTML = 'To generate token t the model attends to the t tokens before it. <b style="color:' + p.sage + '">With a KV cache</b> it reuses stored keys/values, so each token costs O(t) (sage, linear); <b style="color:' + p.rust + '">without</b>, it reprocesses the whole prefix every step — O(t²) per token (rust, quadratic). Over N = ' + N + ' tokens the cumulative work is ≈ <b>' + totW + '</b> (cached) vs <b>' + totN + '</b> (uncached) — a <b>' + (totN / totW).toFixed(0) + '×</b> gap that widens with context length. The cache is what makes long-context decoding feasible.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'KV-cache visualizer: per-token generation work versus token position. With a KV cache the cost grows linearly O(t); without it the model reprocesses the whole prefix each step, growing quadratically O(t^2). A slider varies the context length and the quadratic curve pulls further away.');
    draw();
  });

  /* ========================================================
     84. The Intermediate Value Theorem (Calculus)
     ======================================================== */
  register({ id: 'calc-ivt', topic: 'calculus', title: 'The Intermediate Value Theorem', blurb: 'If f is continuous on [a, b], it must hit every value between f(a) and f(b). Drag the target level k and watch the curve cross it; toggle a jump discontinuity to see the guarantee break — a gap lets the function skip over k.' },
  function (root) {
    const W = 540, H = 320, padL = 34, padR = 16, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const a = 0, b = 4, YMIN = 0.5, YMAX = 6.3;
    let k = 2.5, jump = false, toggleBtn;
    function f(x) { let y = 1.0 + 0.9 * x + 0.6 * Math.sin(x * 1.4); if (jump && x >= 2) y += 1.7; return y; }
    const X = x => padL + (x - a) / (b - a) * (W - padL - padR);
    const Y = y => (H - padB) - (y - YMIN) / (YMAX - YMIN) * (H - padT - padB);
    slider(ctl, { label: 'target level k', min: 1.3, max: 4.5, step: 0.05, value: k, fmt: v => v.toFixed(2), onInput: v => { k = v; draw(); } });
    toggleBtn = button(ctl, 'Add a jump', () => { jump = !jump; toggleBtn.innerHTML = jump ? 'Make continuous' : 'Add a jump'; draw(); });
    function crossings() {
      const step = 0.004, res = []; let px = a, pv = f(a) - k;
      for (let x = a + step; x <= b; x += step) {
        if (jump && px < 2 && x >= 2) { px = x; pv = f(x) - k; continue; }   // don't bridge the discontinuity
        const v = f(x) - k;
        if (pv === 0 || (pv < 0) !== (v < 0)) res.push((px + x) / 2);
        px = x; pv = v;
      }
      return res;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(YMIN)); ctx.lineTo(W - padR, Y(YMIN)); ctx.moveTo(padL, Y(YMIN)); ctx.lineTo(padL, padT); ctx.stroke();
      ctx.font = '11px ' + cssVar('--font-mono', 'monospace');
      // target level k
      ctx.strokeStyle = p.gold; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(padL, Y(k)); ctx.lineTo(W - padR, Y(k)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.fillText('k = ' + k.toFixed(2), padL + 5, Y(k) - 4);
      // curve (break the path at the jump)
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2.5; ctx.beginPath(); let started = false;
      for (let x = a; x <= b; x += 0.01) {
        if (jump && x >= 2 && x < 2 + 0.011) { ctx.stroke(); ctx.beginPath(); started = false; }
        const xx = X(x), yy = Y(f(x)); started ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); started = true;
      }
      ctx.stroke();
      // endpoint dots
      ctx.fillStyle = p.mute; ctx.textAlign = 'center';
      [[a, 'a'], [b, 'b']].forEach(([x, lbl]) => { ctx.fillText(lbl, X(x), Y(YMIN) + 14); });
      // crossings
      const cr = crossings();
      cr.forEach(cx => {
        ctx.strokeStyle = p.violet; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(cx), Y(k)); ctx.lineTo(X(cx), Y(YMIN)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(cx), Y(k), 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillText('c', X(cx), Y(YMIN) + 14);
      });
      info.innerHTML = jump
        ? 'With a <b style="color:' + p.rust + '">jump discontinuity</b> the guarantee breaks: for a level k inside the gap the curve <b>never</b> equals k (here <b>' + cr.length + '</b> crossing' + (cr.length === 1 ? '' : 's') + '). Continuity is exactly what the theorem needs — a single break lets the function leap over values.'
        : 'f is <b style="color:' + p.sage + '">continuous</b> on [a, b], so the IVT guarantees: for any level k between f(a) and f(b) there is a point c with f(c) = k. At k = <b>' + k.toFixed(2) + '</b> the curve meets the level at <b>' + cr.length + '</b> point' + (cr.length === 1 ? '' : 's') + ' — no jumps means no value can be skipped over.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Intermediate Value Theorem visualizer: a continuous curve on an interval with a draggable horizontal target level k, marked where the curve crosses k. A toggle adds a jump discontinuity, after which a level inside the gap has no crossing — showing the theorem requires continuity.');
    draw();
  });

  /* ========================================================
     85. Monte Carlo estimation converges (RL)
     ======================================================== */
  register({ id: 'rl-mc-convergence', topic: 'reinforcement-learning', title: 'Monte Carlo estimation converges', blurb: 'Monte Carlo value estimation needs no model — just average the returns you actually observe. Slide the number of episodes and watch the running estimate settle onto the true value, its error shrinking like 1/√n.' },
  function (root) {
    const W = 540, H = 320, padL = 38, padR = 14, padT = 18, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MU = 2.0, SIG = Math.sqrt(1.2), MAXN = 500, YMIN = 0.5, YMAX = 3.5;
    let seed = 987654321; const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const vals = [0, 1, 2, 3, 4], probs = [0.1, 0.2, 0.4, 0.2, 0.1], cdf = []; let acc = 0; probs.forEach(p => { acc += p; cdf.push(acc); });
    const returns = []; for (let i = 0; i < MAXN; i++) { const u = rnd(); let v = 4; for (let k = 0; k < cdf.length; k++) { if (u <= cdf[k]) { v = vals[k]; break; } } returns.push(v); }
    const run = []; let s = 0; returns.forEach((r, i) => { s += r; run.push(s / (i + 1)); });
    let N = 50;
    slider(ctl, { label: 'episodes N', min: 5, max: MAXN, step: 5, value: N, fmt: v => v.toFixed(0), onInput: v => { N = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = n => padL + (n / N) * (W - padL - padR);
      const Y = y => (H - padB) - (y - YMIN) / (YMAX - YMIN) * (H - padT - padB);
      // standard-error band ±σ/√n around the true value
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.13; ctx.beginPath(); let st = false;
      for (let n = 1; n <= N; n++) { const xx = X(n), yy = Y(Math.min(YMAX, MU + SIG / Math.sqrt(n))); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; }
      for (let n = N; n >= 1; n--) { ctx.lineTo(X(n), Y(Math.max(YMIN, MU - SIG / Math.sqrt(n)))); }
      ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      // true value line
      ctx.strokeStyle = p.gold; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(padL, Y(MU)); ctx.lineTo(W - padR, Y(MU)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left'; ctx.fillText('true value ' + MU.toFixed(1), padL + 5, Y(MU) - 5);
      // running-average estimate
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2; ctx.beginPath(); st = false;
      for (let n = 1; n <= N; n++) { const xx = X(n), yy = Y(Math.max(YMIN, Math.min(YMAX, run[n - 1]))); st ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); st = true; } ctx.stroke();
      // axis
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(YMIN)); ctx.lineTo(W - padR, Y(YMIN)); ctx.moveTo(padL, Y(YMIN)); ctx.lineTo(padL, padT); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('episodes (1 … ' + N + ')', W / 2, H - 4);
      const est = run[N - 1], se = SIG / Math.sqrt(N);
      info.innerHTML = 'Averaging the returns from <b>' + N + '</b> episodes estimates the value as <b style="color:' + p.sage + '">' + est.toFixed(3) + '</b>, converging to the true <b style="color:' + p.gold + '">' + MU.toFixed(1) + '</b> — using <em>no model</em> of the environment, only observed returns. The shaded band is the standard error ±σ/√N = ±<b>' + se.toFixed(3) + '</b>; it narrows like 1/√N, so halving the error needs <em>four times</em> the episodes.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Monte Carlo convergence visualizer: the running average of sampled returns versus episode count, settling onto the true value, with a standard-error band that narrows like one over root n as a slider increases the number of episodes.');
    draw();
  });

  /* ========================================================
     86. The recursion tree: why divide & conquer is n log n (Algorithms)
     ======================================================== */
  register({ id: 'algo-recursion-tree', topic: 'algorithms', title: 'The recursion tree: why divide & conquer is n log n', blurb: 'Merge sort halves the array recursively until pieces of size 1 — a tree of depth log₂ n. Every level touches all n elements once, so the whole sort costs n log n. Slide n and watch the tree deepen by just one level each time n doubles.' },
  function (root) {
    const W = 540, H = 320, padL = 14, padR = 14, padT = 16, padB = 44;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let exp = 4;
    slider(ctl, { label: 'array size n', min: 1, max: 6, step: 1, value: exp, fmt: v => '2^' + v + ' = ' + Math.pow(2, v), onInput: v => { exp = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const n = Math.pow(2, exp), levels = exp + 1, usableW = W - padL - padR;
      const rowGap = 4, rowH = Math.min(30, (H - padT - padB) / levels - rowGap);
      ctx.font = '10px ' + cssVar('--font-mono', 'monospace');
      for (let L = 0; L <= exp; L++) {
        const count = Math.pow(2, L), boxW = usableW / count, y = padT + L * (rowH + rowGap);
        for (let i = 0; i < count; i++) {
          const x = padL + i * boxW;
          ctx.fillStyle = (L === exp) ? p.gold : p.sage; ctx.globalAlpha = 0.85;
          ctx.fillRect(x + 1.5, y, Math.max(1, boxW - 3), rowH); ctx.globalAlpha = 1;
        }
        ctx.fillStyle = (L === exp) ? p.gold : p.mute; ctx.textAlign = 'right';
        ctx.fillText(count + '×' + (n / count), padL + usableW - 3, y + rowH - 2);
      }
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('each level = n total work  ·  ' + (exp + 1) + ' levels = log₂ n + 1', W / 2, H - 6);
      const opsNLogN = n * exp, opsN2 = n * n;
      info.innerHTML = 'Splitting n = <b>' + n + '</b> in half until size 1 takes <b>' + exp + '</b> splits, giving <b style="color:' + p.sage + '">' + levels + ' levels</b> (log₂ n + 1). Each level\'s pieces re-cover all n elements during the merges, so <em>every row sums to n work</em> — total ≈ n·log₂ n = <b>' + opsNLogN + '</b>, versus n² = <b style="color:' + p.rust + '">' + opsN2 + '</b> for a quadratic sort. Doubling n adds just <em>one</em> level, which is why n log n scales so gently.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Recursion-tree visualizer for divide and conquer: a stack of bars, one per recursion level, each spanning the full width (n total work) but split into more pieces deeper down. The number of levels is log base 2 of n plus 1; a slider changes n and the note compares n log n against n squared.');
    draw();
  });

  /* ========================================================
     87. Curve sketching: the first derivative shapes the graph (Calculus)
     ======================================================== */
  register({ id: 'calc-curve-sketch', topic: 'calculus', title: 'Curve sketching: the first derivative shapes the graph', blurb: 'Where f′ > 0 the curve climbs; where f′ < 0 it falls; where f′ = 0 it turns. Slide the cubic f(x) = x³ − a·x and watch its max and min slide together and vanish as a → 0 — turning points need f′ to actually cross zero.' },
  function (root) {
    const W = 540, H = 320, padL = 30, padR = 14, padT = 18, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let a = 3;
    const X0 = -2.3, X1 = 2.3, Y0 = -4, Y1 = 4;
    const f = x => x * x * x - a * x, fp = x => 3 * x * x - a;
    slider(ctl, { label: 'a  (in x³ − a·x)', min: 0, max: 4, step: 0.1, value: a, fmt: v => v.toFixed(1), onInput: v => { a = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + (x - X0) / (X1 - X0) * (W - padL - padR);
      const Y = y => (H - padB) - (y - Y0) / (Y1 - Y0) * (H - padT - padB);
      ctx.strokeStyle = p.mute; ctx.globalAlpha = 0.4; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(X0), Y(0)); ctx.lineTo(X(X1), Y(0)); ctx.moveTo(X(0), Y(Math.max(Y0, -4))); ctx.lineTo(X(0), Y(Math.min(Y1, 4))); ctx.stroke(); ctx.globalAlpha = 1;
      // curve, colored by the sign of f': sage where increasing, rust where decreasing
      ctx.lineWidth = 2.6; let prev = null;
      for (let x = X0; x <= X1; x += 0.02) {
        const y = f(x), up = fp(x) >= 0;
        if (prev) { ctx.strokeStyle = up ? p.sage : p.rust; ctx.beginPath(); ctx.moveTo(X(prev.x), Y(prev.y)); ctx.lineTo(X(x), Y(y)); ctx.stroke(); }
        prev = { x: x, y: y };
      }
      // critical points
      let crit = [];
      if (a > 0) { const r = Math.sqrt(a / 3); crit = [{ x: -r, kind: 'max' }, { x: r, kind: 'min' }]; }
      ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      crit.forEach(cp => { const y = f(cp.x); ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(cp.x), Y(y), 5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = p.mute; ctx.fillText(cp.kind, X(cp.x), Y(y) + (cp.kind === 'max' ? -9 : 17)); });
      info.innerHTML = a > 0
        ? 'f′(x) = 3x² − a = 0 at x = ±√(a/3) = <b>±' + Math.sqrt(a / 3).toFixed(2) + '</b>: a <b style="color:' + p.rust + '">max</b> on the left, a <b>min</b> on the right. The curve is <b style="color:' + p.sage + '">green where f′ &gt; 0</b> (rising) and <b style="color:' + p.rust + '">rust where f′ &lt; 0</b> (falling); the turning points are exactly where it switches colour. As a shrinks the two critical points close in on each other.'
        : 'At a = 0, f′(x) = 3x² is <b>never negative</b>, so the curve only ever rises (with a momentary flat spot at x = 0). The max and min have <em>merged and annihilated</em> — with no sign change in f′ there are no turning points, just an inflection. Turning points require f′ to actually cross zero, not merely touch it.';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Curve-sketching visualizer: the cubic x^3 minus a x, drawn green where its derivative is positive (increasing) and rust where negative (decreasing), with gold dots at the maximum and minimum. A slider lowers a until the two turning points merge and vanish at a = 0.');
    draw();
  });

  /* ========================================================
     23. Normal-distribution explorer (μ/σ + empirical rule / interval probability)
     ======================================================== */
  register({ id: 'ps-normal-explorer', topic: 'probability-statistics', title: 'Normal Distribution Explorer', blurb: 'Slide μ and σ to move and stretch the bell, then read off probabilities — the 68–95–99.7 rule, or any interval P(a ≤ X ≤ b).' },
  function (root) {
    const W = 560, H = 380, padL = 30, padR = 14, padB = 42, padT = 22;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    let mu = 0, sd = 1, mode = 'empirical', za = -1, zb = 1;
    // standard normal CDF via the Abramowitz–Stegun erf approximation
    function erf(x) { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x);
      const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    const dom = () => [mu - 4 * sd, mu + 4 * sd];
    const X = x => { const [lo, hi] = dom(); return padL + (x - lo) / (hi - lo) * (W - padL - padR); };
    const pdf = x => { const z = (x - mu) / sd; return Math.exp(-(z * z) / 2) / (sd * Math.sqrt(2 * Math.PI)); };
    const peak = () => 1 / (sd * Math.sqrt(2 * Math.PI));
    const Y = d => H - padB - (d / peak()) * (H - padT - padB) * 0.92;
    function fillUnder(x0, x1, color, alpha) {
      ctx.fillStyle = color; ctx.globalAlpha = alpha; ctx.beginPath();
      const N = 180; ctx.moveTo(X(x0), H - padB);
      for (let i = 0; i <= N; i++) { const x = x0 + (x1 - x0) * i / N; ctx.lineTo(X(x), Y(pdf(x))); }
      ctx.lineTo(X(x1), H - padB); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    }
    function vline(x, color, dash) { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.4; if (dash) ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(X(x), Y(pdf(x))); ctx.lineTo(X(x), H - padB); ctx.stroke(); ctx.restore(); }
    select(ctl, { label: 'mode', value: mode, options: [{ value: 'empirical', label: 'empirical rule' }, { value: 'interval', label: 'interval P(a≤X≤b)' }], onChange: v => { mode = v; toggleIv(); draw(); } });
    slider(ctl, { label: 'mean μ', min: -3, max: 3, step: 0.1, value: mu, fmt: v => 'μ=' + v.toFixed(1), onInput: v => { mu = v; draw(); } });
    slider(ctl, { label: 'std dev σ', min: 0.4, max: 2.5, step: 0.1, value: sd, fmt: v => 'σ=' + v.toFixed(1), onInput: v => { sd = v; draw(); } });
    const ivA = slider(ctl, { label: 'lower bound (z)', min: -4, max: 4, step: 0.1, value: za, fmt: v => 'a=μ' + (v < 0 ? '−' : '+') + Math.abs(v).toFixed(1) + 'σ', onInput: v => { za = v; if (za > zb) zb = za; draw(); } });
    const ivB = slider(ctl, { label: 'upper bound (z)', min: -4, max: 4, step: 0.1, value: zb, fmt: v => 'b=μ' + (v < 0 ? '−' : '+') + Math.abs(v).toFixed(1) + 'σ', onInput: v => { zb = v; if (zb < za) za = zb; draw(); } });
    function toggleIv() { const show = mode === 'interval' ? '' : 'none'; ivA.parentElement.style.display = show; ivB.parentElement.style.display = show; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      if (mode === 'empirical') {
        fillUnder(mu - 3 * sd, mu + 3 * sd, p.sage, 0.16);
        fillUnder(mu - 2 * sd, mu + 2 * sd, p.gold, 0.20);
        fillUnder(mu - 1 * sd, mu + 1 * sd, p.rust, 0.30);
      } else {
        const a = mu + za * sd, b = mu + zb * sd;
        fillUnder(a, b, p.gold, 0.34); vline(a, p.gold, false); vline(b, p.gold, false);
      }
      // the bell
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.4; ctx.beginPath();
      const [lo, hi] = dom();
      for (let i = 0; i <= 240; i++) { const x = lo + (hi - lo) * i / 240; i ? ctx.lineTo(X(x), Y(pdf(x))) : ctx.moveTo(X(x), Y(pdf(x))); } ctx.stroke();
      // baseline + μ marker
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      vline(mu, p.mute, true);
      // x ticks at μ and μ±1,2,3σ
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let k = -3; k <= 3; k++) { const x = mu + k * sd; ctx.fillText((mu + k * sd).toFixed(k === 0 ? 1 : 1), X(x), H - padB + 14); }
      if (mode === 'empirical') {
        ctx.font = '600 12px ' + MONO; ctx.textAlign = 'center';
        ctx.fillStyle = p.rust; ctx.fillText('68.3%', X(mu), Y(peak()) - 6);
        ctx.fillStyle = p.gold; ctx.fillText('95.4%', X(mu + 1.5 * sd), Y(pdf(mu + 1.5 * sd)) - 6);
        ctx.fillStyle = p.sage; ctx.fillText('99.7%', X(mu + 2.6 * sd), Y(pdf(mu + 2.6 * sd)) - 6);
        info.innerHTML = `<b>N(μ=${mu.toFixed(1)}, σ=${sd.toFixed(1)})</b> — the <span style="color:${p.rust}">empirical rule</span>: ~<b>68%</b> of the mass lies within <b>±1σ</b> ` +
          `(${(mu - sd).toFixed(1)} to ${(mu + sd).toFixed(1)}), ~<b>95%</b> within ±2σ, ~<b>99.7%</b> within ±3σ — for <i>every</i> normal, whatever μ and σ.`;
      } else {
        const a = mu + za * sd, b = mu + zb * sd, prob = Phi(zb) - Phi(za);
        ctx.fillStyle = p.gold; ctx.font = '600 13px ' + MONO; ctx.textAlign = 'center';
        const midx = (X(a) + X(b)) / 2; ctx.fillText((prob * 100).toFixed(1) + '%', midx, Y(pdf((a + b) / 2)) - 8);
        info.innerHTML = `<b>P(${a.toFixed(2)} ≤ X ≤ ${b.toFixed(2)}) = <span style="color:${p.gold}">${(prob * 100).toFixed(2)}%</span></b><br>` +
          `Standardize: z<sub>a</sub>=${za.toFixed(1)}, z<sub>b</sub>=${zb.toFixed(1)}, so it equals Φ(${zb.toFixed(1)}) − Φ(${za.toFixed(1)}) = ${Phi(zb).toFixed(3)} − ${Phi(za).toFixed(3)}. ` +
          `The probability depends only on the <b>z-bounds</b>, never on μ or σ.`;
      }
    }
    toggleIv(); draw();
  });

  /* ========================================================
     24. Covariance & correlation scatter (tilt the cloud with ρ)
     ======================================================== */
  register({ id: 'ps-covariance-scatter', topic: 'probability-statistics', title: 'Covariance & Correlation', blurb: 'Drag the correlation ρ and watch a point cloud tilt from a formless blob to a tight line — with the best-fit line, the covariance ellipse, and the sample correlation updating live.' },
  function (root) {
    const W = 540, H = 400, padL = 34, padR = 14, padT = 14, padB = 38, D = 3.6, N = 200;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    let rho = 0.6;
    function randn() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    let base = [];
    function reseed() { base = []; for (let i = 0; i < N; i++) base.push([randn(), randn()]); }
    const X = dx => padL + (dx + D) / (2 * D) * (W - padL - padR);
    const Y = dy => padT + (D - dy) / (2 * D) * (H - padT - padB);
    function points() { const k = Math.sqrt(Math.max(0, 1 - rho * rho)); return base.map(([z1, z2]) => [z1, rho * z1 + k * z2]); }
    function sampleStats(pts) {
      let mx = 0, my = 0; pts.forEach(p => { mx += p[0]; my += p[1]; }); mx /= pts.length; my /= pts.length;
      let sxx = 0, syy = 0, sxy = 0; pts.forEach(p => { const a = p[0] - mx, b = p[1] - my; sxx += a * a; syy += b * b; sxy += a * b; });
      return { cov: sxy / pts.length, r: sxy / Math.sqrt(sxx * syy), mx, my };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes through origin
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(-D), Y(0)); ctx.lineTo(X(D), Y(0)); ctx.moveTo(X(0), Y(-D)); ctx.lineTo(X(0), Y(D)); ctx.stroke();
      const pts = points();
      // 2σ covariance ellipse: eigenvectors (1,1)/√2 and (1,-1)/√2, eigenvalues 1+ρ, 1-ρ
      const e1 = [Math.SQRT1_2, Math.SQRT1_2], e2 = [Math.SQRT1_2, -Math.SQRT1_2];
      const a1 = 2 * Math.sqrt(1 + rho), a2 = 2 * Math.sqrt(Math.max(0, 1 - rho));
      ctx.strokeStyle = p.violet; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.85; ctx.beginPath();
      for (let t = 0; t <= 80; t++) { const a = 2 * Math.PI * t / 80, dx = a1 * Math.cos(a) * e1[0] + a2 * Math.sin(a) * e2[0], dy = a1 * Math.cos(a) * e1[1] + a2 * Math.sin(a) * e2[1]; t ? ctx.lineTo(X(dx), Y(dy)) : ctx.moveTo(X(dx), Y(dy)); }
      ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1;
      // best-fit (regression) line: slope ρ through origin for standardized data
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(X(-D), Y(-D * rho)); ctx.lineTo(X(D), Y(D * rho)); ctx.stroke();
      // points
      ctx.fillStyle = p.gold; ctx.globalAlpha = 0.6;
      pts.forEach(([dx, dy]) => { if (Math.abs(dx) <= D && Math.abs(dy) <= D) { ctx.beginPath(); ctx.arc(X(dx), Y(dy), 2.6, 0, 2 * Math.PI); ctx.fill(); } });
      ctx.globalAlpha = 1;
      // axis labels
      ctx.fillStyle = p.mute; ctx.font = '11px ' + MONO; ctx.textAlign = 'right'; ctx.fillText('X', X(D) - 3, Y(0) - 5);
      ctx.textAlign = 'left'; ctx.fillText('Y', X(0) + 5, Y(D) + 11);
      const s = sampleStats(pts);
      const strength = Math.abs(rho) >= 0.85 ? 'a tight line' : Math.abs(rho) >= 0.4 ? 'a clear tilt' : Math.abs(rho) > 0.1 ? 'a faint tilt' : 'a formless blob';
      const dir = rho > 0.1 ? 'positive' : rho < -0.1 ? 'negative' : 'no';
      info.innerHTML = `set <b>ρ = ${rho.toFixed(2)}</b> &nbsp;·&nbsp; sample <b>r = ${s.r.toFixed(2)}</b> &nbsp;·&nbsp; sample <b>Cov ≈ ${s.cov.toFixed(2)}</b> &nbsp;(X,Y standardized, so Cov ≈ r)<br>` +
        `The cloud shows <b>${dir}</b> linear association — <b>${strength}</b>. The <span style="color:${p.rust}">red line</span> is the best fit (slope ρ); the <span style="color:${p.violet}">ellipse</span> is the 2σ contour. At ρ=±1 it collapses to the line (perfect dependence); at ρ=0 it is a circle.`;
    }
    slider(ctl, { label: 'correlation ρ', min: -1, max: 1, step: 0.05, value: rho, fmt: v => 'ρ=' + v.toFixed(2), onInput: v => { rho = v; draw(); } });
    button(ctl, '↻ Resample', () => { reseed(); draw(); });
    reseed(); draw();
  });

  /* ========================================================
     25. Confidence-interval coverage simulator (what "95% confident" means)
     ======================================================== */
  register({ id: 'ps-ci-coverage', topic: 'probability-statistics', title: 'Confidence-Interval Coverage', blurb: 'Draw confidence interval after confidence interval and watch ~95% of them capture the true mean (and ~5% miss) — the real meaning of "95% confidence".' },
  function (root) {
    const W = 560, H = 410, padL = 14, padR = 14, padT = 14, padB = 46, NVIS = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    const Z = { '80%': 1.282, '90%': 1.645, '95%': 1.960, '99%': 2.576 };
    let conf = '95%', n = 20, running = null;
    let total = 0, captured = 0, rows = [];
    function randn() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    const se = () => 1 / Math.sqrt(n);
    const D = () => (3 + Z[conf]) * se();           // value-axis half-range: fits mean spread (±3 SE) + interval width
    const X = v => { const d = D(); return padL + (v + d) / (2 * d) * (W - padL - padR); };
    function step() {
      const z = Z[conf], s = se(), mean = z * 0 + s * randn(), lo = mean - z * s, hi = mean + z * s;
      const hit = lo <= 0 && 0 <= hi;               // true mean is 0
      total++; if (hit) captured++;
      rows.push({ mean, lo, hi, hit }); if (rows.length > NVIS) rows.shift();
    }
    function reset() { total = 0; captured = 0; rows = []; draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // true-mean reference line
      ctx.strokeStyle = p.gold; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(X(0), padT - 2); ctx.lineTo(X(0), H - padB + 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '11px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('true μ', X(0), H - padB + 16);
      // interval rows
      const gap = (H - padT - padB) / NVIS;
      rows.forEach((r, i) => {
        const y = padT + (i + 0.5) * gap, col = r.hit ? p.sage : p.rust;
        ctx.strokeStyle = col; ctx.lineWidth = r.hit ? 2 : 2.6; ctx.globalAlpha = r.hit ? 0.8 : 1;
        ctx.beginPath(); ctx.moveTo(X(r.lo), y); ctx.lineTo(X(r.hi), y); ctx.stroke();
        // end caps
        ctx.beginPath(); ctx.moveTo(X(r.lo), y - 3); ctx.lineTo(X(r.lo), y + 3); ctx.moveTo(X(r.hi), y - 3); ctx.lineTo(X(r.hi), y + 3); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(r.mean), y, 2.4, 0, 2 * Math.PI); ctx.fill();
        ctx.globalAlpha = 1;
      });
      const pct = total ? (captured / total * 100) : 0, miss = total - captured;
      info.innerHTML = `confidence <b>${conf}</b> &nbsp;·&nbsp; sample size <b>n=${n}</b> &nbsp;·&nbsp; <span style="color:${p.sage}">captured ${captured}</span> / <span style="color:${p.rust}">missed ${miss}</span> of <b>${total}</b><br>` +
        (total === 0
          ? `Each horizontal bar is one ${conf} confidence interval from a fresh sample; the dot is its sample mean. Press <b>Run</b>.`
          : `<b>${pct.toFixed(1)}%</b> of intervals captured the true μ (target <b>${conf}</b>). The <span style="color:${p.rust}">red</span> ones missed — over many samples about ${conf.replace('%', '')}% capture μ, which is <em>all</em> "${conf} confidence" means. Widening n just narrows the bars; the capture rate is set by the confidence level, not n.`);
    }
    select(ctl, { label: 'confidence', value: conf, options: Object.keys(Z).map(k => ({ value: k, label: k })), onChange: v => { conf = v; reset(); } });
    slider(ctl, { label: 'sample size n', min: 5, max: 80, step: 5, value: n, fmt: v => 'n=' + v, onInput: v => { n = v; reset(); } });
    const runBtn = button(ctl, '▶ Run', () => {
      if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; }
      else { runBtn.innerHTML = '⏸ Pause'; let f = 0; running = loop(() => { f++; if (f % 6 === 0) { step(); draw(); } }); }
    });
    button(ctl, '+1', () => { step(); draw(); });
    button(ctl, '↻ Reset', () => { if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; } reset(); });
    reset();
  });

  /* ========================================================
     26. Diffusion forward/reverse process (data melts to noise and back)
     ======================================================== */
  register({ id: 'dl-diffusion', topic: 'deep-learning', title: 'Diffusion: Noising & Denoising', blurb: 'Watch structured data dissolve into Gaussian noise step by step (forward), then reassemble (reverse) — the core idea of diffusion models: xₜ = √ᾱₜ·x₀ + √(1−ᾱₜ)·ε.' },
  function (root) {
    const W = 560, H = 400, pad = 16, N = 700, T = 60;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    const cx = W / 2, cy = H / 2, S = 64;            // world->pixel scale
    let x0 = [], eps = [], step = 0, running = null, dir = 1;
    function randn() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function seed() {
      x0 = []; eps = [];
      for (let i = 0; i < N; i++) {
        const f = i / N, th = f * 7 * Math.PI, r = 0.25 + 2.1 * f;   // archimedean spiral = structured "data"
        x0.push([r * Math.cos(th), r * Math.sin(th)]);
        eps.push([randn(), randn()]);                                 // frozen noise per point
      }
    }
    // cosine schedule: ᾱ(s)=cos²(sπ/2), so signal=cos(sπ/2), noise=sin(sπ/2)
    const sOf = () => step / T;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const s = sOf(), sig = Math.cos(s * Math.PI / 2), noi = Math.sin(s * Math.PI / 2), abar = sig * sig;
      // a faint frame
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.strokeRect(pad, pad, W - 2 * pad, H - 2 * pad);
      // points: color shifts gold (data) -> violet (noise) with s
      for (let i = 0; i < N; i++) {
        const x = sig * x0[i][0] + noi * eps[i][0], y = sig * x0[i][1] + noi * eps[i][1];
        const px = cx + x * S, py = cy - y * S;
        if (px < pad || px > W - pad || py < pad || py > H - pad) continue;
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = i % 7 === 0 ? p.rust : (s < 0.5 ? p.gold : p.violet);
        ctx.beginPath(); ctx.arc(px, py, 1.7, 0, 2 * Math.PI); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.mute; ctx.font = '11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('t = ' + step + ' / ' + T, pad + 8, pad + 18);
      ctx.textAlign = 'right';
      ctx.fillText('√ᾱ = ' + sig.toFixed(2) + '   √(1−ᾱ) = ' + noi.toFixed(2), W - pad - 8, pad + 18);
      info.innerHTML = `step <b>t = ${step}/${T}</b> &nbsp;·&nbsp; signal weight <b>√ᾱ<sub>t</sub> = ${sig.toFixed(2)}</b> &nbsp;·&nbsp; noise weight <b>√(1−ᾱ<sub>t</sub>) = ${noi.toFixed(2)}</b><br>` +
        (step === 0
          ? `At <b>t=0</b> the points are the structured "data" (a spiral). Press <b>Run</b> to watch the <b>forward</b> process add noise — xₜ = √ᾱₜ·x₀ + √(1−ᾱₜ)·ε — until it becomes pure noise N(0,I), then the <b>reverse</b> process reassembles it.`
          : step >= T
            ? `At <b>t=T</b> all structure is gone: x_T ≈ N(0,I). Generation starts here and runs the arrow backward, denoising step by step.`
            : `The data is ${(abar * 100).toFixed(0)}% signal, ${((1 - abar) * 100).toFixed(0)}% noise (by energy). Forward = dissolve; reverse = the network predicting the noise to subtract at each step.`);
    }
    function tick() {
      step += dir;
      if (step >= T) { step = T; dir = -1; }
      else if (step <= 0) { step = 0; dir = 1; }
      draw();
    }
    slider(ctl, { label: 'step t', min: 0, max: T, step: 1, value: 0, fmt: v => 't=' + v, onInput: v => { if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; } step = v; draw(); } });
    const runBtn = button(ctl, '▶ Run', () => {
      if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Run'; }
      else { runBtn.innerHTML = '⏸ Pause'; let f = 0; running = loop(() => { f++; if (f % 3 === 0) tick(); }); }
    });
    button(ctl, '↻ New noise', () => { seed(); step = 0; dir = 1; draw(); });
    seed(); draw();
  });

  /* ========================================================
     27. Convex vs non-convex: gradient descent & the local-minimum trap
     ======================================================== */
  register({ id: 'calc-convex-landscape', topic: 'calculus', title: 'Convex vs. Non-convex: the Local-Minimum Trap', blurb: 'Drop a ball and run gradient descent: on a convex bowl it always finds the global minimum; on a bumpy landscape it gets stuck in whatever local valley it started above.' },
  function (root) {
    const W = 560, H = 380, padL = 36, padR = 14, padT = 16, padB = 40, lo = -4, hi = 4;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    const fns = {
      'convex bowl': { f: x => 0.25 * x * x, fp: x => 0.5 * x },
      'bumpy (non-convex)': { f: x => 0.12 * x * x + 0.8 * Math.cos(1.8 * x), fp: x => 0.24 * x - 1.44 * Math.sin(1.8 * x) }
    };
    let key = 'bumpy (non-convex)', startX = -3.2, eta = 0.15, ball = null, running = null, settled = null;
    function F() { return fns[key]; }
    // y-range over the domain
    function yrange() { let mn = 1e9, mx = -1e9; for (let i = 0; i <= 200; i++) { const x = lo + (hi - lo) * i / 200, y = F().f(x); mn = Math.min(mn, y); mx = Math.max(mx, y); } return [mn, mx]; }
    const X = x => padL + (x - lo) / (hi - lo) * (W - padL - padR);
    let YR = yrange();
    const Y = y => { const [mn, mx] = YR, pad = (mx - mn) * 0.12 || 1; return H - padB - (y - mn + pad) / (mx - mn + 2 * pad) * (H - padT - padB); };
    function globalMin() { let bx = lo, by = 1e9; for (let i = 0; i <= 400; i++) { const x = lo + (hi - lo) * i / 400, y = F().f(x); if (y < by) { by = y; bx = x; } } return { x: bx, y: by }; }
    function reset() { if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Drop ball'; } ball = { x: startX, trail: [] }; settled = null; YR = yrange(); draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      // the curve
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 300; i++) { const x = lo + (hi - lo) * i / 300; i ? ctx.lineTo(X(x), Y(F().f(x))) : ctx.moveTo(X(x), Y(F().f(x))); } ctx.stroke();
      // global-min marker
      const gm = globalMin();
      ctx.strokeStyle = p.sage; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(gm.x), Y(gm.y) + 8); ctx.lineTo(X(gm.x), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.sage; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('global min', X(gm.x), H - padB + 13);
      // start marker
      ctx.fillStyle = p.mute; ctx.fillText('start', X(startX), Y(F().f(startX)) - 12);
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(X(startX), Y(F().f(startX)), 3, 0, 2 * Math.PI); ctx.stroke();
      // trail + ball
      if (ball) {
        ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.4; ctx.lineWidth = 1.5; ctx.beginPath();
        ball.trail.forEach((tx, i) => { i ? ctx.lineTo(X(tx), Y(F().f(tx))) : ctx.moveTo(X(tx), Y(F().f(tx))); }); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.fillStyle = p.rust; ctx.beginPath(); ctx.arc(X(ball.x), Y(F().f(ball.x)), 6, 0, 2 * Math.PI); ctx.fill();
      }
      const gmx = gm.x;
      info.innerHTML = settled == null
        ? `<b>${key}</b> — the ball starts at <b>x=${startX.toFixed(1)}</b>. Press <b>Drop ball</b> to run gradient descent (each step rolls downhill by η·f′(x)).`
        : `Started at <b>x=${startX.toFixed(1)}</b>, settled at <b>x=${settled.toFixed(2)}</b> &nbsp;·&nbsp; global min at x=${gmx.toFixed(2)}.<br>` +
          (Math.abs(settled - gmx) < 0.25
            ? (key === 'convex bowl'
              ? `Reached the <span style="color:${p.sage}">global minimum</span> — and on a <b>convex</b> bowl it <em>always</em> will, from any start.`
              : `This time it happened to land in the global basin. Move the start and try again — on a bumpy landscape it won't always.`)
            : `<span style="color:${p.rust}">Trapped in a local minimum</span>, not the global one — gradient descent only rolls downhill into whatever valley it started above. This trap is exactly what convexity eliminates.`);
    }
    function dropStep() {
      if (!ball) return;
      const g = F().fp(ball.x); ball.trail.push(ball.x); ball.x = ball.x - eta * g;
      if (ball.x < lo) ball.x = lo; if (ball.x > hi) ball.x = hi;
      if (Math.abs(g) < 0.004 || ball.trail.length > 400) { settled = ball.x; running.stop(); running = null; runBtn.innerHTML = '▶ Drop ball'; }
    }
    select(ctl, { label: 'landscape', value: key, options: Object.keys(fns).map(k => ({ value: k, label: k })), onChange: v => { key = v; reset(); } });
    slider(ctl, { label: 'start x', min: -4, max: 4, step: 0.1, value: startX, fmt: v => 'x=' + v.toFixed(1), onInput: v => { startX = v; reset(); } });
    slider(ctl, { label: 'learning rate η', min: 0.02, max: 0.5, step: 0.01, value: eta, fmt: v => 'η=' + v.toFixed(2), onInput: v => { eta = v; } });
    const runBtn = button(ctl, '▶ Drop ball', () => {
      if (running) { running.stop(); running = null; runBtn.innerHTML = '▶ Drop ball'; return; }
      if (settled != null) reset();
      runBtn.innerHTML = '⏸ Pause'; let f = 0; running = loop(() => { f++; if (f % 4 === 0) { dropStep(); draw(); } });
    });
    button(ctl, '↻ Reset', () => reset());
    reset();
  });

  /* ========================================================
     28. Hypothesis test & p-value (null distribution, rejection region, p as tail area)
     ======================================================== */
  register({ id: 'ps-hypothesis-test', topic: 'probability-statistics', title: 'Hypothesis Testing & p-values', blurb: 'Drag the observed test statistic and watch the p-value (tail area beyond it) and the rejection region (tails of area α) — see exactly when and why you reject the null.' },
  function (root) {
    const W = 560, H = 380, padL = 30, padR = 14, padT = 16, padB = 42, lo = -4, hi = 4;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    function erf(x) { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x);
      const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    const phi = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
    // critical values: [two-sided, one-sided] per alpha
    const CRIT = { '0.10': { two: 1.645, one: 1.282 }, '0.05': { two: 1.960, one: 1.645 }, '0.01': { two: 2.576, one: 2.326 } };
    let mode = 'two', alpha = '0.05', z = 2.2;
    const X = v => padL + (v - lo) / (hi - lo) * (W - padL - padR);
    const ymax = phi(0) * 1.08, Y = d => H - padB - (d / ymax) * (H - padT - padB);
    function fillTail(from, to, color, alpha2) {       // shade area under curve in [from,to]
      ctx.fillStyle = color; ctx.globalAlpha = alpha2; ctx.beginPath(); ctx.moveTo(X(from), H - padB);
      const N = 120; for (let i = 0; i <= N; i++) { const v = from + (to - from) * i / N; ctx.lineTo(X(v), Y(phi(v))); }
      ctx.lineTo(X(to), H - padB); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    }
    function vline(v, color, dash) { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2; if (dash) ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(v), Y(phi(v))); ctx.lineTo(X(v), H - padB); ctx.stroke(); ctx.restore(); }
    function pValue() { if (mode === 'two') return 2 * (1 - Phi(Math.abs(z))); if (mode === 'right') return 1 - Phi(z); return Phi(z); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const crit = CRIT[alpha], zc = mode === 'two' ? crit.two : crit.one;
      // rejection region (area alpha) — rust, faint
      if (mode === 'two') { fillTail(lo, -zc, p.rust, 0.16); fillTail(zc, hi, p.rust, 0.16); }
      else if (mode === 'right') fillTail(zc, hi, p.rust, 0.16);
      else fillTail(lo, -zc, p.rust, 0.16);
      // p-value region — gold, stronger
      if (mode === 'two') { fillTail(lo, -Math.abs(z), p.gold, 0.34); fillTail(Math.abs(z), hi, p.gold, 0.34); }
      else if (mode === 'right') fillTail(z, hi, p.gold, 0.34);
      else fillTail(lo, z, p.gold, 0.34);
      // bell curve
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const v = lo + (hi - lo) * i / 240; i ? ctx.lineTo(X(v), Y(phi(v))) : ctx.moveTo(X(v), Y(phi(v))); } ctx.stroke();
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      // critical lines (rust dashed) + observed z (gold solid)
      if (mode !== 'right') vline(-zc, p.rust, true); if (mode !== 'left') vline(zc, p.rust, true);
      vline(z, p.gold, false);
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      [-3, -2, -1, 0, 1, 2, 3].forEach(t => ctx.fillText(String(t), X(t), H - padB + 14));
      ctx.fillStyle = p.gold; ctx.font = '600 11px ' + MONO; ctx.fillText('z = ' + z.toFixed(2), X(z), Y(phi(z)) - 6);
      const pv = pValue(), reject = pv <= parseFloat(alpha);
      info.innerHTML = `observed <b>z = ${z.toFixed(2)}</b> &nbsp;·&nbsp; <span style="color:${p.gold}">p-value = ${(pv * 100).toFixed(2)}%</span> &nbsp;·&nbsp; <span style="color:${p.rust}">α = ${alpha}</span> &nbsp;·&nbsp; <b>${reject ? 'REJECT H₀' : 'fail to reject H₀'}</b><br>` +
        `The <span style="color:${p.gold}">gold</span> tail area is the p-value: the chance, <em>if H₀ were true</em>, of a statistic at least this extreme. The <span style="color:${p.rust}">rust</span> tails are the rejection region (total area α). ` +
        (reject
          ? `Here the observed z lands <em>inside</em> the rejection region (p ≤ α), so we reject H₀.`
          : `Here z is <em>outside</em> the rejection region (p &gt; α), so we fail to reject — the data aren't surprising enough under H₀.`);
    }
    select(ctl, { label: 'test', value: mode, options: [{ value: 'two', label: 'two-sided' }, { value: 'right', label: 'one-sided (right)' }, { value: 'left', label: 'one-sided (left)' }], onChange: v => { mode = v; draw(); } });
    select(ctl, { label: 'α', value: alpha, options: Object.keys(CRIT).map(k => ({ value: k, label: k })), onChange: v => { alpha = v; draw(); } });
    slider(ctl, { label: 'observed z', min: -4, max: 4, step: 0.05, value: z, fmt: v => 'z=' + v.toFixed(2), onInput: v => { z = v; draw(); } });
    draw();
  });

  /* ========================================================
     59. Type I/II errors & statistical power — the two-distribution picture (Prob & Stats)
     ======================================================== */
  register({ id: 'ps-power', topic: 'probability-statistics', title: 'Type I/II Errors & Statistical Power', blurb: 'Two worlds — H₀ (no effect) and H₁ (a real effect of size d) — overlap. Slide the decision threshold and the effect size and watch the false-positive rate α, the miss rate β, and the power (1−β) trade off against each other.' },
  function (root) {
    const W = 560, H = 380, padL = 20, padR = 20, padB = 46, padT = 18;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let zc = 1.645, d = 2;   // decision threshold (in σ units) and effect size (separation of the two means)
    function erf(x) { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    const phi = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
    slider(ctl, { label: 'decision threshold (σ)', min: 0, max: 4, step: 0.005, value: zc, fmt: v => v.toFixed(2), onInput: v => { zc = v; draw(); } });
    slider(ctl, { label: 'effect size d', min: 0, max: 4, step: 0.05, value: d, fmt: v => v.toFixed(2), onInput: v => { d = v; draw(); } });
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const xMin = -4, xMax = Math.max(5, d + 4);
      const X = x => padL + (x - xMin) / (xMax - xMin) * (W - padL - padR);
      const peak = phi(0), Y = y => (H - padB) - y / peak * (H - padB - padT);
      // baseline axis
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(xMin), H - padB); ctx.lineTo(X(xMax), H - padB); ctx.stroke();
      const curve = mean => { const pts = []; for (let x = xMin; x <= xMax + 1e-9; x += (xMax - xMin) / 240) pts.push([x, phi(x - mean)]); return pts; };
      const fillRegion = (mean, from, to, color, alpha) => {
        ctx.beginPath(); ctx.moveTo(X(from), H - padB);
        for (let x = from; x <= to + 1e-9; x += (to - from) / 80) ctx.lineTo(X(x), Y(phi(x - mean)));
        ctx.lineTo(X(to), H - padB); ctx.closePath(); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1;
      };
      // shaded areas: power (H1 right of zc), beta (H1 left of zc), alpha (H0 right of zc)
      fillRegion(d, zc, xMax, p.sage, 0.45);     // power = 1 - beta
      fillRegion(d, xMin, zc, p.gold, 0.30);     // beta (Type II / miss)
      fillRegion(0, zc, xMax, p.rust, 0.45);     // alpha (Type I / false positive)
      // the two curves
      const stroke = (pts, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach((pt, i) => { const xx = X(pt[0]), yy = Y(pt[1]); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); };
      stroke(curve(0), p.ink); stroke(curve(d), p.violet);
      // threshold line
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(X(zc), padT - 4); ctx.lineTo(X(zc), H - padB); ctx.stroke(); ctx.setLineDash([]);
      // labels
      ctx.font = '600 12px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center';
      ctx.fillStyle = p.ink; ctx.fillText('H₀', X(0), Y(peak) - 6);
      ctx.fillStyle = p.violet; ctx.fillText('H₁', X(d), Y(peak) - 6);
      ctx.fillStyle = p.gold; ctx.fillText('reject →', X(zc) + 36, padT + 8);
      const alpha = 1 - Phi(zc), beta = Phi(zc - d), power = 1 - beta;
      info.innerHTML = `Threshold at z = ${zc.toFixed(2)}, effect size d = ${d.toFixed(2)}. `
        + `<b style="color:${p.rust}">α (Type I, false positive) = ${alpha.toFixed(3)}</b> · `
        + `<b style="color:${p.gold}">β (Type II, miss) = ${beta.toFixed(3)}</b> · `
        + `<b style="color:${p.sage}">power = 1 − β = ${power.toFixed(3)}</b>.<br>`
        + `Move the threshold right and α shrinks but β grows (you miss more real effects); push the curves apart (larger d) or shrink their spread (more data) and power climbs for free.`;
    }
    const pre = controls(root);
    button(pre, 'α = 0.05', () => { zc = 1.645; draw(); });
    button(pre, 'Large effect', () => { d = 3; draw(); });
    button(pre, 'Underpowered', () => { d = 1; zc = 1.645; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Statistical power visualizer: two overlapping normal curves, the null hypothesis H0 centered at 0 and the alternative H1 centered at the effect size d. A dashed decision threshold splits them; the area of H0 to its right is alpha (Type I error), the area of H1 to its left is beta (Type II error), and the area of H1 to its right is the power. Sliders adjust the threshold and the effect size.');
    draw();
  });

  /* ========================================================
     29. Byte-Pair Encoding — watch a tokenizer learn its merges (LLM)
     ======================================================== */
  register({ id: 'llm-bpe', topic: 'llm', title: 'Byte-Pair Encoding (BPE) Merges', blurb: 'Train a tokenizer step by step: start from characters, then repeatedly merge the most frequent adjacent pair. The vocabulary grows; the corpus shrinks.' },
  function (root) {
    // HuggingFace-tutorial toy corpus: clean, decisive winners (ug → un → hug …)
    const SEED = [{ w: 'hug', f: 10 }, { w: 'pug', f: 5 }, { w: 'pun', f: 12 }, { w: 'bun', f: 4 }, { w: 'hugs', f: 5 }];
    const alpha = new Set(); SEED.forEach(s => s.w.split('').forEach(ch => alpha.add(ch)));
    const BASE = alpha.size;        // size of the starting alphabet
    let words, merges;
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    const stage = el('div', 'bpe-stage', root);
    const corpusEl = el('div', 'bpe-corpus', stage);
    const sideEl = el('div', 'bpe-side', stage);
    const ctl = controls(root);
    const info = note(root);
    let stepBtn, runBtn;

    function pairCounts() {
      const m = new Map();
      words.forEach(wd => { for (let i = 0; i < wd.toks.length - 1; i++) { const k = wd.toks[i] + '' + wd.toks[i + 1]; m.set(k, (m.get(k) || 0) + wd.f); } });
      return m;
    }
    function bestPair() {
      let best = null, bc = 0;
      pairCounts().forEach((c, k) => { if (c > bc) { bc = c; best = k; } });   // strict > keeps the first of any tie
      if (!best || bc < 2) return null;
      const i = best.indexOf(''); return { a: best.slice(0, i), b: best.slice(i + 1), count: bc };
    }
    function corpusTokens() { return words.reduce((s, wd) => s + wd.toks.length * wd.f, 0); }
    function applyMerge() {
      const bp = bestPair(); if (!bp) return false;
      const merged = bp.a + bp.b;
      words.forEach(wd => {
        const out = [];
        for (let i = 0; i < wd.toks.length; i++) {
          if (i < wd.toks.length - 1 && wd.toks[i] === bp.a && wd.toks[i + 1] === bp.b) { out.push(merged); i++; }
          else out.push(wd.toks[i]);
        }
        wd.toks = out;
      });
      merges.push({ a: bp.a, b: bp.b, merged: merged, count: bp.count });
      return true;
    }
    function render() {
      const p = P(), bp = bestPair();
      corpusEl.innerHTML = '';
      el('div', 'bpe-clabel', corpusEl).textContent = 'Corpus — each word as a token sequence (× frequency)';
      words.forEach(wd => {
        const row = el('div', 'bpe-word', corpusEl);
        el('span', 'bpe-freq', row).textContent = wd.f + '×';
        const toks = el('span', 'bpe-toks', row);
        const pend = new Set();
        if (bp) for (let i = 0; i < wd.toks.length - 1; i++) { if (wd.toks[i] === bp.a && wd.toks[i + 1] === bp.b) { pend.add(i); pend.add(i + 1); i++; } }
        wd.toks.forEach((t, i) => {
          const chip = el('span', 'bpe-tok', toks); chip.textContent = t;
          if (t.length > 1) chip.classList.add('merged');
          if (pend.has(i)) chip.classList.add('pending');
        });
      });
      sideEl.innerHTML = '';
      const stats = el('div', 'bpe-stats', sideEl);
      stats.innerHTML = `<div><b>${merges.length}</b><span>merges</span></div><div><b>${BASE + merges.length}</b><span>vocab size</span></div><div><b>${corpusTokens()}</b><span>corpus tokens</span></div>`;
      const nx = el('div', 'bpe-next', sideEl);
      nx.innerHTML = bp
        ? `Most frequent pair → <span class="bpe-rule">${esc(bp.a)} + ${esc(bp.b)} = <b class="merged">${esc(bp.a + bp.b)}</b></span> <span class="bpe-c">${bp.count}×</span>`
        : `<span class="bpe-doneflag">✓ Converged — no adjacent pair repeats anymore.</span>`;
      const hist = el('div', 'bpe-hist', sideEl);
      hist.innerHTML = '<div class="bpe-clabel">Learned merge rules (the growing vocabulary)</div>' +
        (merges.length
          ? merges.map((m, k) => `<div class="bpe-hrow"><span class="bpe-hn">${k + 1}</span><span>${esc(m.a)} + ${esc(m.b)} → <b class="merged">${esc(m.merged)}</b></span><span class="bpe-c">${m.count}×</span></div>`).join('')
          : '<div class="bpe-empty">none yet — press “Merge next pair”.</div>');
      if (stepBtn) stepBtn.disabled = !bp;
      if (runBtn) runBtn.disabled = !bp;
      info.innerHTML = `BPE begins with the raw alphabet (here <b>${BASE}</b> characters) and repeatedly merges the <b>most frequent adjacent pair</b> into a new token. Every merge adds one entry to the vocabulary and shortens the corpus — frequent chunks like “ug”, “un”, “hug” collapse into single tokens while rare words stay split. Real tokenizers (GPT, LLaMA) run tens of thousands of these merges over web-scale text; the learned merge list IS the tokenizer.`;
    }
    function step() { if (applyMerge()) render(); }
    function runAll() { let g = 0; while (applyMerge() && g < 30) g++; render(); }
    function reset() { words = SEED.map(s => ({ toks: s.w.split(''), f: s.f })); merges = []; render(); }

    stepBtn = button(ctl, '▶ Merge next pair', step, 'primary');
    runBtn = button(ctl, '⏩ Run all merges', runAll);
    button(ctl, '↺ Reset', reset);
    reset();
  });

  /* ========================================================
     30. Learning-rate schedules — constant / step / exp / cosine / linear, with warmup (DL)
     ======================================================== */
  register({ id: 'dl-lr-schedules', topic: 'deep-learning', title: 'Learning-Rate Schedules', blurb: 'Compare constant, step, exponential, cosine and linear schedules — add warmup, set the peak and floor — and watch the learning rate trace its path across training.' },
  function (root) {
    const W = 560, H = 320, padL = 60, padR = 16, padT = 22, padB = 40, MONO = 'JetBrains Mono, monospace';
    const { ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let sched = 'cosine', warm = 0.08, minf = 0.05, peak = 0.0003, marker = 0;
    const X = p => padL + p * (W - padL - padR);
    const Y = lr => H - padB - (lr / (peak * 1.08)) * (H - padT - padB);
    function lrAt(p) {
      if (warm > 0 && p < warm) return peak * (p / warm);          // linear warmup
      const q = warm < 1 ? (p - warm) / (1 - warm) : 0, mn = peak * minf;
      if (sched === 'constant') return peak;
      if (sched === 'step') return peak * Math.pow(0.5, Math.floor(q * 2.999));
      if (sched === 'exp') return Math.max(mn, peak * Math.exp(-3 * q));
      if (sched === 'cosine') return mn + (peak - mn) * 0.5 * (1 + Math.cos(Math.PI * q));
      if (sched === 'linear') return peak + (mn - peak) * q;
      return peak;
    }
    const LABEL = { constant: 'Constant', step: 'Step decay', exp: 'Exponential decay', cosine: 'Cosine annealing', linear: 'Linear decay' };
    const DESC = {
      constant: 'A flat rate — simple, but usually leaves accuracy on the table: nothing anneals it down to settle into a minimum.',
      step: 'Hold, then cut by half at milestones — the classic ImageNet recipe. Effective, though the drops are abrupt.',
      exp: 'Multiply the rate down smoothly every step — gentle monotonic decay toward a small floor.',
      cosine: 'Anneal along a cosine from the peak to a small floor — the modern default for Transformers and LLMs; smooth, and ends very low.',
      linear: 'Ramp straight down from peak to floor — common with warmup for fine-tuning (the "linear" scheduler).'
    };
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      if (warm > 0) {                                              // warmup band
        ctx.fillStyle = p.violet; ctx.globalAlpha = 0.13; ctx.fillRect(X(0), padT, X(warm) - X(0), H - padT - padB); ctx.globalAlpha = 1;
        ctx.fillStyle = p.violet; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('warmup', (X(0) + X(warm)) / 2, padT + 12);
      }
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const pp = i / 240, x = X(pp), y = Y(lrAt(pp)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const ml = lrAt(marker), mx = X(marker), my = Y(ml);          // sweeping marker
      ctx.strokeStyle = p.sage; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      ctx.fillText(peak.toExponential(1), padL - 6, Y(peak) + 3); ctx.fillText('0', padL - 6, H - padB + 3);
      ctx.textAlign = 'center'; ctx.fillText('training step →', (padL + W - padR) / 2, H - 8);
      ctx.save(); ctx.translate(15, (padT + H - padB) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('learning rate', 0, 0); ctx.restore();
      info.innerHTML = `<b style="color:${p.gold}">${LABEL[sched]}</b>${warm > 0 ? ` · ${Math.round(warm * 100)}% warmup` : ''} · peak ${peak.toExponential(1)}${(sched === 'cosine' || sched === 'linear' || sched === 'exp') ? ` · floor ${Math.round(minf * 100)}%` : ''} &nbsp;·&nbsp; at step ${Math.round(marker * 100)}% → lr ≈ <b style="color:${p.sage}">${ml.toExponential(2)}</b><br>${DESC[sched]}`;
    }
    select(ctl, { label: 'schedule', value: sched, options: [{ value: 'cosine', label: 'cosine' }, { value: 'linear', label: 'linear' }, { value: 'step', label: 'step' }, { value: 'exp', label: 'exponential' }, { value: 'constant', label: 'constant' }], onChange: v => { sched = v; draw(); } });
    slider(ctl, { label: 'warmup %', min: 0, max: 25, step: 1, value: warm * 100, fmt: v => v + '%', onInput: v => { warm = v / 100; draw(); } });
    slider(ctl, { label: 'floor %', min: 0, max: 50, step: 1, value: minf * 100, fmt: v => v + '%', onInput: v => { minf = v / 100; draw(); } });
    slider(ctl, { label: 'peak LR', min: 1, max: 30, step: 1, value: peak * 1e4, fmt: v => (v * 1e-4).toExponential(0), onInput: v => { peak = v * 1e-4; draw(); } });
    draw();                                                        // synchronous first paint
    loop(() => { marker += 0.004; if (marker > 1) marker = 0; draw(); });
  });

  /* ========================================================
     31. Q-learning gridworld — an agent LEARNS a policy from experience (RL)
     ======================================================== */
  register({ id: 'rl-q-learning', topic: 'reinforcement-learning', title: 'Q-Learning Gridworld', blurb: 'Watch an agent learn by trial and error: it explores ε-greedily and updates Q-values from its own experience (no model of the world). Train it and watch the policy arrows snap toward the goal.' },
  function (root) {
    const cols = 5, rows = 5, cell = 70, W = cols * cell, H = rows * cell;
    const { ctx } = canvas(root, W, H);
    // '.'=empty '#'=wall 'G'=goal(+1) 'P'=pit(-1) 'S'=start
    const map = ['....G', '.###.', '...#.', '.#P#.', 'S....'];
    let Sr = 4, Sc = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (map[r][c] === 'S') { Sr = r; Sc = c; }
    let eps = 0.2, alpha = 0.5, gamma = 0.9;
    let Q, episodes, agent, totalR, lastEpR, playH = null;
    function reset() {
      Q = Array.from({ length: rows }, () => Array.from({ length: cols }, () => [0, 0, 0, 0]));
      episodes = 0; agent = null; totalR = 0; lastEpR = null;
      if (playH) { playH.stop(); playH = null; }
      draw();
    }
    function nextState(r, c, a) {
      const nr = r + [-1, 0, 1, 0][a], nc = c + [0, 1, 0, -1][a];
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || map[nr][nc] === '#') return [r, c];
      return [nr, nc];
    }
    function greedyA(r, c) { const q = Q[r][c]; let ba = 0; for (let a = 1; a < 4; a++) if (q[a] > q[ba]) ba = a; return ba; }
    function rewardOf(ch) { return ch === 'G' ? 1 : ch === 'P' ? -1 : -0.04; }
    // one Q-learning update from (r,c); returns [nr,nc,terminal]
    function qstep(r, c) {
      const a = Math.random() < eps ? Math.floor(Math.random() * 4) : greedyA(r, c);
      const [nr, nc] = nextState(r, c, a), ch = map[nr][nc];
      const terminal = ch === 'G' || ch === 'P', reward = rewardOf(ch);
      const maxNext = terminal ? 0 : Math.max(Q[nr][nc][0], Q[nr][nc][1], Q[nr][nc][2], Q[nr][nc][3]);
      Q[r][c][a] += alpha * (reward + gamma * maxNext - Q[r][c][a]);   // off-policy TD target uses max
      return [nr, nc, terminal, reward];
    }
    function stepOnce() {                                  // animated single step
      if (!agent) { agent = { r: Sr, c: Sc, steps: 0 }; totalR = 0; }
      const [nr, nc, terminal, reward] = qstep(agent.r, agent.c);
      totalR += reward; agent = { r: nr, c: nc, steps: agent.steps + 1 };
      if (terminal || agent.steps >= 80) { episodes++; lastEpR = totalR; agent = null; }
      draw();
    }
    function train(n) {                                    // fast: run n full episodes, no animation
      for (let e = 0; e < n; e++) {
        let r = Sr, c = Sc, steps = 0, term = false;
        while (steps < 200 && !term) { const res = qstep(r, c); r = res[0]; c = res[1]; term = res[2]; steps++; }
        episodes++;
      }
      agent = null; draw();
    }
    function stateValue(r, c) { return Math.max(Q[r][c][0], Q[r][c][1], Q[r][c][2], Q[r][c][3]); }
    function mix(a, b, t) { const pa = hx(a), pb = hx(b); return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`; }
    function hx(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); if (!/^[0-9a-f]{6}$/i.test(h)) return [40, 35, 31]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const ch = map[r][c], x = c * cell, y = r * cell, v = stateValue(r, c);
        let bg = p.panel;
        if (ch === '#') bg = p.line;
        else if (ch === 'G') bg = p.sage;
        else if (ch === 'P') bg = p.rust;
        else { const t = Math.max(-1, Math.min(1, v)); bg = t >= 0 ? mix(p.panel, p.sage, t * 0.8) : mix(p.panel, p.rust, -t * 0.8); }
        ctx.fillStyle = bg; ctx.fillRect(x + 2, y + 2, cell - 4, cell - 4);
        ctx.strokeStyle = p.bg; ctx.lineWidth = 2; ctx.strokeRect(x + 2, y + 2, cell - 4, cell - 4);
        if (ch !== '#') { ctx.fillStyle = p.ink; ctx.font = '12px JetBrains Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(ch === 'G' ? '+1' : ch === 'P' ? '−1' : v.toFixed(2), x + cell / 2, y + cell / 2 + 4); }
        if (ch === '.' || ch === 'S') { const a = greedyA(r, c); const ang = [-Math.PI / 2, 0, Math.PI / 2, Math.PI][a]; ctx.save(); ctx.translate(x + cell / 2, y + cell - 14); ctx.rotate(ang); arrow(ctx, -9, 0, 9, 0, p.gold, 1.6); ctx.restore(); }
        if (ch === 'S') { ctx.fillStyle = p.violet; ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'center'; ctx.fillText('START', x + cell / 2, y + 16); }
      }
      if (agent) { ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(agent.c * cell + cell / 2, agent.r * cell + cell / 2 - 4, 12, 0, 7); ctx.fill(); ctx.fillStyle = p.bg; ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🤖', agent.c * cell + cell / 2, agent.r * cell + cell / 2); }
      info.innerHTML = `episodes: <b>${episodes}</b> &nbsp;·&nbsp; ε=${eps.toFixed(2)} α=${alpha.toFixed(2)} γ=${gamma.toFixed(2)}${lastEpR != null ? ` &nbsp;·&nbsp; last return: <b style="color:${lastEpR > 0 ? p.sage : p.rust}">${lastEpR.toFixed(2)}</b>` : ''}<br>Numbers are learned state-values max<sub>a</sub>Q(s,a); arrows are the greedy policy. Untrained, the agent wanders; train it and the arrows line up toward the goal while avoiding the pit.`;
    }
    const sl = controls(root);
    slider(sl, { label: 'ε explore', min: 0, max: 0.6, step: 0.02, value: eps, fmt: v => v.toFixed(2), onInput: v => { eps = v; } });
    slider(sl, { label: 'α rate', min: 0.05, max: 0.9, step: 0.05, value: alpha, fmt: v => v.toFixed(2), onInput: v => { alpha = v; } });
    slider(sl, { label: 'γ discount', min: 0.5, max: 0.99, step: 0.01, value: gamma, fmt: v => v.toFixed(2), onInput: v => { gamma = v; } });
    const btns = controls(root);
    const playBtn = button(btns, '▶ Play', () => {
      if (playH) { playH.stop(); playH = null; playBtn.innerHTML = '▶ Play'; return; }
      playBtn.innerHTML = '⏸ Pause'; let f = 0;
      playH = loop(() => { if (f++ % 9 === 0) stepOnce(); });
    }, 'primary');
    button(btns, 'Step', () => { if (playH) { playH.stop(); playH = null; playBtn.innerHTML = '▶ Play'; } stepOnce(); });
    button(btns, '⚡ Train 200', () => { if (playH) { playH.stop(); playH = null; playBtn.innerHTML = '▶ Play'; } train(200); });
    button(btns, '↻ Reset', () => { playBtn.innerHTML = '▶ Play'; reset(); });
    const info = note(root);
    reset();
  });

  /* ========================================================
     32. Beam search — keep the k best partial sequences (LLM)
     ======================================================== */
  register({ id: 'llm-beam-search', topic: 'llm', title: 'Beam Search Decoding', blurb: 'Watch beam search keep the k most-probable partial sequences at each step — and reach a higher-probability sentence than greedy (k=1) by exploring more than one path. (Tokens/probabilities here are illustrative; the point is the search.)' },
  function (root) {
    const W = 600, H = 430, padL = 8, padR = 8, padT = 34, padB = 8, MONO = 'JetBrains Mono, monospace';
    const { ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const POOL = ["the", "a", "cat", "dog", "sat", "ran", "on", "mat", "fast", "red", "big", "sky", "sun", "old", "sea", "new"];
    let K = 2, STEPS = 3, kbtns = [];
    function hash(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
    function next(seq) {                              // deterministic toy LM: 3 candidate next-tokens
      const key = seq.join(" ") || "<start>", toks = [];
      for (let j = 0; toks.length < 3 && j < 40; j++) { const t = POOL[hash(key + "#" + j) % POOL.length]; if (toks.indexOf(t) < 0) toks.push(t); }
      const logits = toks.map((_, i) => (hash(key + "@" + i) % 1000) / 1000 * 2.6);
      const ex = logits.map(Math.exp), Z = ex.reduce((a, b) => a + b, 0);
      return toks.map((t, i) => ({ tok: t, prob: ex[i] / Z })).sort((a, b) => b.prob - a.prob);
    }
    function run(k) {                                 // beam search; return per-step candidate records
      let beams = [{ seq: [], lp: 0, id: 0 }], nid = 1; const steps = [];
      for (let s = 0; s < STEPS; s++) {
        const cands = [];
        beams.forEach(b => next(b.seq).forEach(c => cands.push({ seq: b.seq.concat(c.tok), tok: c.tok, prob: c.prob, lp: b.lp + Math.log(c.prob), parent: b.id, id: nid++ })));
        cands.sort((a, b) => b.lp - a.lp);
        cands.forEach((c, i) => c.kept = i < k);
        steps.push(cands);
        beams = cands.filter(c => c.kept);
      }
      return { steps, best: beams[0] };
    }
    function roundRect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
    function hx(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); if (!/^[0-9a-f]{6}$/i.test(h)) return [40, 35, 31]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
    function mix(a, b, t) { const pa = hx(a), pb = hx(b); return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`; }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    const info = note(root);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const res = run(K), greedy = run(1), colW = (W - padL - padR) / STEPS, pos = {};
      res.steps.forEach((cands, s) => {
        const n = cands.length, bh = Math.min(38, (H - padT - padB) / n - 6), gap = ((H - padT - padB) - n * bh) / (n + 1);
        cands.forEach((c, i) => { c._x = padL + s * colW + 5; c._y = padT + gap + i * (bh + gap); c._w = colW - 10; c._h = bh; pos[c.id] = c; });
      });
      res.steps.forEach((cands, s) => { if (!s) return; cands.forEach(c => { const par = pos[c.parent]; if (!par) return; ctx.strokeStyle = c.kept ? p.gold : p.line; ctx.globalAlpha = c.kept ? 0.8 : 0.22; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(par._x + par._w, par._y + par._h / 2); ctx.lineTo(c._x, c._y + c._h / 2); ctx.stroke(); }); });
      ctx.globalAlpha = 1;
      res.steps.forEach(cands => cands.forEach(c => {
        ctx.globalAlpha = c.kept ? 1 : 0.42;
        ctx.fillStyle = c.kept ? mix(p.panel, p.gold, 0.18) : p.panel; ctx.strokeStyle = c.kept ? p.gold : p.line; ctx.lineWidth = c.kept ? 1.8 : 1;
        roundRect(ctx, c._x, c._y, c._w, c._h, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = p.ink; ctx.font = '600 13px ' + MONO; ctx.textAlign = 'center'; ctx.fillText(c.tok, c._x + c._w / 2, c._y + c._h / 2 - 2);
        ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.fillText('logp ' + c.lp.toFixed(2), c._x + c._w / 2, c._y + c._h / 2 + 12);
        ctx.globalAlpha = 1;
      }));
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let s = 0; s < STEPS; s++) ctx.fillText('step ' + (s + 1), padL + s * colW + colW / 2, 16);
      const bestSeq = res.best ? res.best.seq.join(" ") : "", gSeq = greedy.best ? greedy.best.seq.join(" ") : "";
      const better = res.best.lp > greedy.best.lp + 1e-9;
      info.innerHTML = `<b style="color:${p.gold}">beam width k=${K}</b> — top-k kept each step (gold), the rest pruned (faded).<br>` +
        `Beam best: “<b>${esc(bestSeq)}</b>” &nbsp;logp ${res.best.lp.toFixed(2)} &nbsp;·&nbsp; Greedy (k=1): “${esc(gSeq)}” &nbsp;logp ${greedy.best.lp.toFixed(2)}. ` +
        (better ? `<span style="color:${p.sage}">Beam wins by ${(res.best.lp - greedy.best.lp).toFixed(2)} — greedy's locally-best first token led to a worse sentence.</span>` : `<span style="color:${p.mute}">(Here greedy already matches beam — widen k or change steps to see beam pull ahead.)</span>`);
    }
    kbtns = [1, 2, 3].map(k => button(ctl, 'k=' + k, () => { K = k; kbtns.forEach((b, j) => b.classList.toggle('primary', j + 1 === K)); draw(); }, K === k ? 'primary' : ''));
    slider(ctl, { label: 'steps', min: 2, max: 4, step: 1, value: STEPS, fmt: v => v, onInput: v => { STEPS = v; draw(); } });
    draw();
  });

  /* ========================================================
     33. Cross-entropy loss & perplexity — why confident-and-wrong is catastrophic (DL)
     ======================================================== */
  register({ id: 'dl-cross-entropy', topic: 'deep-learning', title: 'Cross-Entropy Loss & Perplexity', blurb: 'Slide the probability the model puts on the TRUE class and watch the cross-entropy loss −ln(p) explode as it drops — and perplexity (1/p) with it. The reason confident-but-wrong predictions are punished so hard.' },
  function (root) {
    const W = 580, H = 424, padL = 48, padR = 16, topT = 24, curveB = 228, barsT = 290, barsB = 400, MONO = 'JetBrains Mono, monospace';
    const { ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const PMIN = 0.02, LMAX = -Math.log(PMIN), K = 5, trueIdx = 2;
    let pTrue = 0.5;
    const Xc = p => padL + p * (W - padL - padR);
    const Yc = L => curveB - (L / LMAX) * (curveB - topT);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // ---- loss curve L(p) = -ln(p) ----
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, topT); ctx.lineTo(padL, curveB); ctx.lineTo(W - padR, curveB); ctx.stroke();
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const pp = PMIN + (1 - PMIN) * i / 200, x = Xc(pp), y = Yc(-Math.log(pp)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const L = -Math.log(pTrue), mx = Xc(pTrue), my = Yc(L);
      ctx.strokeStyle = p.sage; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, curveB); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(padL, my); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      [0, 1, 2, 3].forEach(v => ctx.fillText(v.toFixed(0), padL - 5, Yc(v) + 3));
      ctx.textAlign = 'center';
      [0.1, 0.25, 0.5, 0.75, 1].forEach(v => ctx.fillText(v.toFixed(2), Xc(v), curveB + 13));
      ctx.fillText('probability the model gives the TRUE class →', (padL + W - padR) / 2, curveB + 28);
      ctx.save(); ctx.translate(13, (topT + curveB) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('cross-entropy loss  −ln(p)  (nats)', 0, 0); ctx.restore();
      // ---- distribution bars ----
      const probs = []; for (let k = 0; k < K; k++) probs.push(k === trueIdx ? pTrue : (1 - pTrue) / (K - 1));
      const bw = (W - padL - padR) / K * 0.62, gap = (W - padL - padR) / K;
      probs.forEach((pr, k) => {
        const cx = padL + gap * (k + 0.5), h = pr * (barsB - barsT), x = cx - bw / 2;
        ctx.fillStyle = k === trueIdx ? p.sage : p.panel2 || p.panel; ctx.strokeStyle = k === trueIdx ? p.sage : p.line; ctx.lineWidth = 1;
        ctx.fillRect(x, barsB - h, bw, h); ctx.strokeRect(x, barsB - h, bw, h);
        ctx.fillStyle = p.mute; ctx.font = '9px ' + MONO; ctx.textAlign = 'center';
        ctx.fillText(k === trueIdx ? 'TRUE' : 'c' + (k + 1), cx, barsB + 12);
        ctx.fillStyle = k === trueIdx ? p.sage : p.mute; ctx.fillText(pr.toFixed(2), cx, barsB - h - 4);
      });
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'left'; ctx.fillText('predicted distribution (5 classes)', padL, barsT - 4);
      const ppl = 1 / pTrue;
      info.innerHTML = `p(true) = <b>${pTrue.toFixed(2)}</b> &nbsp;→&nbsp; loss = −ln(${pTrue.toFixed(2)}) = <b style="color:${p.gold}">${L.toFixed(2)} nats</b> &nbsp;·&nbsp; perplexity = 1/p = <b style="color:${p.sage}">${ppl.toFixed(1)}</b><br>` +
        `Confident <em>and</em> correct (p→1) drives the loss to ~0. But as the model's probability on the truth falls, −ln(p) <b>blows up</b> — a confidently wrong prediction (tiny p on the right answer) is punished enormously. Perplexity ≈ how many equally-likely options the model is effectively torn between.`;
    }
    slider(ctl, { label: 'p(true class)', min: 0.02, max: 0.99, step: 0.01, value: pTrue, fmt: v => v.toFixed(2), onInput: v => { pTrue = v; draw(); } });
    draw();
  });

  /* ========================================================
     34. Optimizer race: SGD vs Momentum vs RMSProp vs Adam
     ======================================================== */
  register({ id: 'dl-optimizers', topic: 'deep-learning', title: 'Optimizer Race: SGD vs Momentum vs RMSProp vs Adam', blurb: 'Drop four optimizers on the same ill-conditioned loss valley and watch them race to the minimum. Plain SGD zig-zags across the steep walls; momentum and the adaptive methods (RMSProp, Adam) cut straighter and arrive faster.' },
  function (root) {
    const W = 560, H = 392, xmin = -5, xmax = 5, ymin = -3.4, ymax = 3.4;
    const a = 0.06, b = 1.8, START = [-4.4, 2.6], MAXSTEP = 110;   // f = a x² + b y², κ = b/a = 30
    const gx = x => 2 * a * x, gy = y => 2 * b * y, f = (x, y) => a * x * x + b * y * y;
    const { c, ctx } = canvas(root, W, H);
    const MONO = "JetBrains Mono, monospace";
    const X = x => 44 + (x - xmin) / (xmax - xmin) * (W - 88);
    const Y = y => H - 30 - (y - ymin) / (ymax - ymin) * (H - 86);
    // each optimizer: base lr (tuned for a fair race) + per-step update of [dx,dy]
    const OPTS = [
      { name: 'SGD', key: 'sgd', col: 'rust', lr: 0.50, init: () => ({}), upd: (g, s, lr) => [lr * g[0], lr * g[1]] },
      { name: 'Momentum', key: 'mom', col: 'gold', lr: 0.08, init: () => ({ vx: 0, vy: 0 }), upd: (g, s, lr) => { s.vx = 0.9 * s.vx + g[0]; s.vy = 0.9 * s.vy + g[1]; return [lr * s.vx, lr * s.vy]; } },
      { name: 'RMSProp', key: 'rms', col: 'violet', lr: 0.15, init: () => ({ sx: 0, sy: 0 }), upd: (g, s, lr) => { s.sx = 0.9 * s.sx + 0.1 * g[0] * g[0]; s.sy = 0.9 * s.sy + 0.1 * g[1] * g[1]; return [lr * g[0] / (Math.sqrt(s.sx) + 1e-8), lr * g[1] / (Math.sqrt(s.sy) + 1e-8)]; } },
      { name: 'Adam', key: 'adam', col: 'sage', lr: 0.40, init: () => ({ mx: 0, my: 0, vx: 0, vy: 0 }), upd: (g, s, lr, t) => { s.mx = 0.9 * s.mx + 0.1 * g[0]; s.my = 0.9 * s.my + 0.1 * g[1]; s.vx = 0.999 * s.vx + 0.001 * g[0] * g[0]; s.vy = 0.999 * s.vy + 0.001 * g[1] * g[1]; const mhx = s.mx / (1 - Math.pow(0.9, t)), mhy = s.my / (1 - Math.pow(0.9, t)), vhx = s.vx / (1 - Math.pow(0.999, t)), vhy = s.vy / (1 - Math.pow(0.999, t)); return [lr * mhx / (Math.sqrt(vhx) + 1e-8), lr * mhy / (Math.sqrt(vhy) + 1e-8)]; } }
    ];
    let mult = 1.0, runH = null, runners = [], steps = 0;
    function reset() {
      if (runH) { runH.stop(); runH = null; runBtn.innerHTML = '▶ Race'; }
      steps = 0;
      runners = OPTS.map(o => ({ o: o, x: START[0], y: START[1], st: o.init(), path: [[START[0], START[1]]], conv: -1, dead: false }));
      draw();
    }
    function stepAll() {
      steps++;
      runners.forEach(r => {
        if (r.dead) return;
        const g = [gx(r.x), gy(r.y)];
        const d = r.o.upd(g, r.st, r.o.lr * mult, steps);
        const nx = r.x - d[0], ny = r.y - d[1];
        if (!isFinite(nx) || !isFinite(ny) || Math.abs(nx) > xmax + 1.2 || Math.abs(ny) > ymax + 1.2) { r.dead = true; return; } // diverged
        r.x = nx; r.y = ny; r.path.push([nx, ny]);
        if (r.conv < 0 && f(nx, ny) < 0.01) r.conv = steps;
      });
      const allDone = runners.every(r => r.dead || r.conv > 0);
      if ((allDone || steps >= MAXSTEP) && runH) { runH.stop(); runH = null; runBtn.innerHTML = '▶ Race'; }
      draw();
    }
    function draw() {
      const p = P(); const COL = k => p[k]; ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // contour ellipses of the loss valley
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      [0.2, 0.6, 1.3, 2.4, 4, 6.2, 9].forEach(cv => { ctx.beginPath(); for (let t = 0; t <= 6.3; t += 0.1) { const x = Math.sqrt(cv / a) * Math.cos(t), y = Math.sqrt(cv / b) * Math.sin(t); const px = X(x), py = Y(y); t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.closePath(); ctx.stroke(); });
      // minimum marker
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(X(0), Y(0), 4, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('min', X(0), Y(0) - 8);
      // start marker
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(X(START[0]), Y(START[1]), 3, 0, 7); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.fillText('start', X(START[0]), Y(START[1]) - 8);
      // each optimizer's path + head
      runners.forEach(r => {
        const col = COL(r.o.col);
        ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.globalAlpha = 0.9; ctx.beginPath();
        r.path.forEach((pt, i) => { const px = X(pt[0]), py = Y(pt[1]); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }); ctx.stroke(); ctx.globalAlpha = 1;
        const last = r.path[r.path.length - 1];
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(last[0]), Y(last[1]), r.conv > 0 ? 3.5 : 5, 0, 7); ctx.fill();
      });
      // legend (top-left), with live step / converged / diverged status
      ctx.textAlign = 'left'; ctx.font = '11px ' + MONO;
      runners.forEach((r, i) => {
        const lx = 52, ly = 20 + i * 16; const col = COL(r.o.col);
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(lx, ly - 3, 4, 0, 7); ctx.fill();
        const status = r.dead ? '✗ diverged' : r.conv > 0 ? '✓ ' + r.conv + ' steps' : steps > 0 ? '… ' + steps : '';
        ctx.fillStyle = r.dead ? p.rust : (r.conv > 0 ? p.soft : p.mute);
        ctx.fillText(r.o.name + '  ' + status, lx + 10, ly);
      });
      const done = runners.filter(r => r.conv > 0).sort((m, n) => m.conv - n.conv);
      const winner = done.length ? done[0] : null;
      info.innerHTML = steps === 0
        ? `An <b>ill-conditioned</b> loss valley ($f=${a}x^2+${b}y^2$, condition number ${(b / a).toFixed(0)}): steep across, shallow along. Press <b>Race</b> to drop all four optimizers from the same start. Watch <span style="color:${P().rust}">SGD</span> zig-zag across the steep walls while it crawls along the floor.`
        : `Step <b>${steps}</b>${winner ? ` &nbsp;·&nbsp; first to the minimum: <b style="color:${P()[winner.o.col]}">${winner.o.name}</b> (${winner.conv} steps)` : ''}.<br>` +
          `<span style="color:${P().rust}">SGD</span> is bounded by the <em>steep</em> direction — a step big enough to make progress along the valley overshoots across it, so it <b>zig-zags</b>. <span style="color:${P().gold}">Momentum</span> builds velocity along the consistent direction and cancels the oscillation; <span style="color:${P().violet}">RMSProp</span> and <span style="color:${P().sage}">Adam</span> rescale each coordinate by its own gradient history, so they step almost straight toward the minimum.`;
    }
    const ctl = controls(root);
    slider(ctl, { label: 'learning rate ×', min: 0.4, max: 1.6, step: 0.1, value: mult, fmt: v => '×' + v.toFixed(1), onInput: v => { mult = v; reset(); } });
    const btns = controls(root);
    const runBtn = button(btns, '▶ Race', () => {
      if (runH) { runH.stop(); runH = null; runBtn.innerHTML = '▶ Race'; return; }
      if (runners.every(r => r.dead || r.conv > 0) || steps >= MAXSTEP) reset();
      runBtn.innerHTML = '⏸ Pause'; let fr = 0; runH = loop(() => { if (fr++ % 5 === 0) stepAll(); });
    }, 'primary');
    button(btns, 'Step', () => { if (runners.every(r => r.dead || r.conv > 0) || steps >= MAXSTEP) reset(); stepAll(); });
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A contour map of an elongated loss valley with four colored optimizer paths racing from a shared start toward the minimum: SGD, Momentum, RMSProp, and Adam.');
    reset();
  });

  /* ========================================================
     35. Riemann sums: rectangles approximating the area under a curve
     ======================================================== */
  register({ id: 'calc-riemann', topic: 'calculus', title: 'Riemann Sums & the Definite Integral', blurb: 'Approximate the area under a curve with rectangles. Add more and watch the sum close in on the exact integral — and see how left, right, and midpoint rules over- or under-shoot.' },
  function (root) {
    const W = 560, H = 400, padL = 46, padR = 16, padT = 18, padB = 38;
    const MONO = "JetBrains Mono, monospace";
    const FNS = {
      'x²': { f: x => x * x, a: 0, b: 3, exact: 9, tex: 'f(x)=x^2' },
      '√x': { f: x => Math.sqrt(x), a: 0, b: 4, exact: 16 / 3, tex: 'f(x)=\\sqrt{x}' },
      '1+sin x': { f: x => 1 + Math.sin(x), a: 0, b: Math.PI, exact: Math.PI + 2, tex: 'f(x)=1+\\sin x' }
    };
    const { c, ctx } = canvas(root, W, H);
    let key = 'x²', n = 8, rule = 'left', runH = null;
    function F() { return FNS[key]; }
    function ymax() { const o = F(); let m = 0; for (let i = 0; i <= 240; i++) { const x = o.a + (o.b - o.a) * i / 240; m = Math.max(m, o.f(x)); } return m * 1.12 || 1; }
    let YM = ymax();
    const X = x => padL + (x - F().a) / (F().b - F().a) * (W - padL - padR);
    const Y = y => H - padB - (y / YM) * (H - padT - padB);
    function sample(i) { const o = F(), dx = (o.b - o.a) / n; return rule === 'left' ? o.a + i * dx : rule === 'right' ? o.a + (i + 1) * dx : o.a + (i + 0.5) * dx; }
    function sum() { const o = F(), dx = (o.b - o.a) / n; let s = 0; for (let i = 0; i < n; i++) s += o.f(sample(i)) * dx; return s; }
    function draw() {
      const p = P(), o = F(), dx = (o.b - o.a) / n; ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // rectangles
      for (let i = 0; i < n; i++) {
        const x0 = o.a + i * dx, h = o.f(sample(i));
        const px = X(x0), pw = X(x0 + dx) - px, py = Y(h), ph = Y(0) - py;
        ctx.fillStyle = p.gold; ctx.globalAlpha = 0.18; ctx.fillRect(px, py, pw, ph);
        ctx.globalAlpha = 0.9; ctx.strokeStyle = p.gold; ctx.lineWidth = 1; ctx.strokeRect(px, py, pw, ph);
      }
      ctx.globalAlpha = 1;
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, Y(0)); ctx.stroke();
      // curve
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = o.a + (o.b - o.a) * i / 240, q = { x: X(x), y: Y(o.f(x)) }; i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); } ctx.stroke();
      // x labels
      ctx.fillStyle = p.mute; ctx.font = '11px ' + MONO; ctx.textAlign = 'center';
      ctx.fillText('a=' + (+o.a.toFixed(2)), X(o.a), Y(0) + 16); ctx.fillText('b=' + (+o.b.toFixed(2)), X(o.b), Y(0) + 16);
      const s = sum(), err = s - o.exact, over = err > 0;
      info.innerHTML = `f(x) = ${key} &nbsp;·&nbsp; <b>${n}</b> rectangle${n === 1 ? '' : 's'} · <b>${rule}</b> rule<br>` +
        `approx area = <b style="color:${p.gold}">${s.toFixed(4)}</b> &nbsp;·&nbsp; exact area (∫) = <b style="color:${p.sage}">${o.exact.toFixed(4)}</b> &nbsp;·&nbsp; error = <b style="color:${Math.abs(err) < 0.02 ? p.sage : p.rust}">${(over ? '+' : '') + err.toFixed(4)}</b><br>` +
        `<span style="color:${p.mute}">Each rectangle has width Δx = (b−a)/n and height f at its ${rule} edge. Add more rectangles (n → ∞) and the sum converges to the definite integral — the exact area. Here the ${rule} rule ${Math.abs(err) < 0.02 ? 'is essentially exact' : over ? 'over-estimates' : 'under-estimates'} at this n.</span>`;
    }
    const ctl = controls(root);
    select(ctl, { label: 'function', value: key, options: Object.keys(FNS).map(k => ({ value: k, label: k })), onChange: v => { key = v; YM = ymax(); draw(); } });
    select(ctl, { label: 'rule', value: rule, options: [{ value: 'left', label: 'left' }, { value: 'right', label: 'right' }, { value: 'midpoint', label: 'midpoint' }], onChange: v => { rule = v; draw(); } });
    const nSlider = slider(ctl, { label: 'rectangles n', min: 1, max: 50, step: 1, value: n, fmt: v => 'n=' + v, onInput: v => { n = v; draw(); } });
    const btns = controls(root);
    const animBtn = button(btns, '▶ Refine', () => {
      if (runH) { runH.stop(); runH = null; animBtn.innerHTML = '▶ Refine'; return; }
      n = 1; nSlider.value = 1; animBtn.innerHTML = '⏸ Pause'; let fr = 0;
      runH = loop(() => { fr++; if (fr % 5 === 0) { if (n < 50) { n++; nSlider.value = n; draw(); } else { runH.stop(); runH = null; animBtn.innerHTML = '▶ Refine'; } } });
    }, 'primary');
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Rectangles approximating the area under a curve (a Riemann sum), with the exact curve drawn over them; sliders set the number of rectangles and the sampling rule.');
    draw();
  });

  /* ========================================================
     36. Taylor polynomials: successive approximations hugging a curve
     ======================================================== */
  register({ id: 'calc-taylor', topic: 'calculus', title: 'Taylor Polynomials: Approximating a Curve', blurb: 'Watch the Taylor polynomial close in on a function as you raise its degree. Degree 1 is exactly the tangent-line linearization; each extra term widens the region where the polynomial hugs the true curve.' },
  function (root) {
    const W = 560, H = 400, padL = 44, padR = 16, padT = 16, padB = 34;
    const MONO = "JetBrains Mono, monospace";
    function fact(k) { let r = 1; for (let i = 2; i <= k; i++) r *= i; return r; }
    const FNS = {
      'sin x': { f: Math.sin, c: k => k % 2 === 1 ? Math.pow(-1, (k - 1) / 2) / fact(k) : 0, xlo: -7, xhi: 7, ylo: -2.3, yhi: 2.3 },
      'cos x': { f: Math.cos, c: k => k % 2 === 0 ? Math.pow(-1, k / 2) / fact(k) : 0, xlo: -7, xhi: 7, ylo: -2.3, yhi: 2.3 },
      'eˣ': { f: Math.exp, c: k => 1 / fact(k), xlo: -3.3, xhi: 3, ylo: -1, yhi: 9 }
    };
    const { c, ctx } = canvas(root, W, H);
    let key = 'sin x', n = 1, runH = null;
    function F() { return FNS[key]; }
    const X = x => padL + (x - F().xlo) / (F().xhi - F().xlo) * (W - padL - padR);
    const Y = y => { const o = F(); return H - padB - (y - o.ylo) / (o.yhi - o.ylo) * (H - padT - padB); };
    function poly(x) { const o = F(); let s = 0; for (let k = 0; k <= n; k++) s += o.c(k) * Math.pow(x, k); return s; }
    function plot(fn, color, lw) {
      const o = F(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.beginPath(); let pen = false;
      for (let i = 0; i <= 480; i++) {
        const x = o.xlo + (o.xhi - o.xlo) * i / 480, y = fn(x);
        if (!isFinite(y) || y < o.ylo - 0.4 || y > o.yhi + 0.4) { pen = false; continue; }
        const px = X(x), py = Y(y);
        if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    function draw() {
      const p = P(), o = F(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      if (o.ylo <= 0 && o.yhi >= 0) { ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke(); }
      if (o.xlo <= 0 && o.xhi >= 0) { ctx.beginPath(); ctx.moveTo(X(0), padT); ctx.lineTo(X(0), H - padB); ctx.stroke(); }
      // true function (sage) and Taylor polynomial (gold)
      plot(o.f, p.sage, 2.6);
      plot(poly, p.gold, 2.2);
      // expansion point a=0
      if (o.xlo <= 0 && o.xhi >= 0) { ctx.fillStyle = p.rust; ctx.beginPath(); ctx.arc(X(0), Y(o.f(0)), 4, 0, 7); ctx.fill(); ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('a=0', X(0), Y(o.f(0)) + 16); }
      // legend
      ctx.textAlign = 'left'; ctx.font = '11px ' + MONO;
      ctx.fillStyle = p.sage; ctx.fillText('● ' + key, 52, 22);
      ctx.fillStyle = p.gold; ctx.fillText('● Taylor degree ' + n, 52, 38);
      // max error over the central half of the window (rough "how wide does it match")
      let maxE = 0; const lo = o.xlo / 2, hi = o.xhi / 2;
      for (let i = 0; i <= 60; i++) { const x = lo + (hi - lo) * i / 60, e = Math.abs(o.f(x) - poly(x)); if (isFinite(e)) maxE = Math.max(maxE, e); }
      info.innerHTML = `<b>${key}</b> · Taylor polynomial of degree <b>${n}</b> about a=0` + (n === 1 ? ' — this is exactly the tangent-line <b>linearization</b>' : '') + `<br>` +
        `<span style="color:${p.mute}">The gold degree-${n} polynomial matches ${key} near x=0 (max error over the central window: ${maxE < 0.001 ? maxE.toExponential(1) : maxE.toFixed(3)}); raise the degree and the match widens outward. A finite polynomial always eventually peels away far from the centre.</span>`;
    }
    const ctl = controls(root);
    select(ctl, { label: 'function', value: key, options: Object.keys(FNS).map(k => ({ value: k, label: k })), onChange: v => { key = v; draw(); } });
    const nSlider = slider(ctl, { label: 'degree', min: 0, max: 12, step: 1, value: n, fmt: v => 'n=' + v, onInput: v => { n = v; draw(); } });
    const btns = controls(root);
    const buildBtn = button(btns, '▶ Build up', () => {
      if (runH) { runH.stop(); runH = null; buildBtn.innerHTML = '▶ Build up'; return; }
      n = 0; nSlider.value = 0; buildBtn.innerHTML = '⏸ Pause'; let fr = 0;
      runH = loop(() => { fr++; if (fr % 18 === 0) { if (n < 12) { n++; nSlider.value = n; draw(); } else { runH.stop(); runH = null; buildBtn.innerHTML = '▶ Build up'; } } });
    }, 'primary');
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A function curve with its Taylor polynomial overlaid; a slider raises the polynomial degree and the approximation hugs the curve over a wider interval.');
    draw();
  });

  /* ========================================================
     58. Lagrange multipliers — the constrained optimum is where a level set kisses the constraint
     ======================================================== */
  register({ id: 'calc-lagrange', topic: 'calculus', title: 'Lagrange Multipliers: Tangency at the Optimum', blurb: 'Maximize f(x,y)=x+y on the unit circle. Slide the point around the constraint and watch the level line of f sweep with it — the constrained optimum is exactly where that line is TANGENT to the circle, i.e. where ∇f and ∇g point the same way (∇f = λ∇g).' },
  function (root) {
    const W = 540, H = 420, S = 86, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let theta = 20 * Math.PI / 180, anim = null;
    const toPx = (x, y) => ({ x: cx + x * S, y: cy - y * S });
    const sl = slider(ctl, { label: 'point angle θ', min: 0, max: 360, step: 1, value: 20, fmt: v => v + '°', onInput: v => { theta = v * Math.PI / 180; if (anim) { anim.stop(); anim = null; } draw(); } });
    function setSlider(deg) { const d = ((Math.round(deg) % 360) + 360) % 360; sl.value = d; const sv = sl.parentNode.querySelector('.viz-sval'); if (sv) sv.textContent = d + '°'; }
    function animateTo(targetDeg) {
      if (anim) anim.stop();
      const start = ((sl.value % 360) + 360) % 360;
      let delta = targetDeg - start; if (delta > 180) delta -= 360; if (delta < -180) delta += 360;   // shortest way round
      let t = 0;
      anim = loop(() => {
        t = Math.min(1, t + 0.04);
        const cur = start + delta * (t * t * (3 - 2 * t));   // smoothstep ease
        theta = cur * Math.PI / 180; setSlider(cur); draw();
        if (t >= 1 && anim) { anim.stop(); anim = null; }
      });
    }
    button(ctl, '▲ Maximize', () => animateTo(45));
    button(ctl, '▼ Minimize', () => animateTo(225));
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let gx = cx % S; gx < W; gx += S) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (let gy = cy % S; gy < H; gy += S) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      // faint family of level lines x + y = k (all slope -1) — f increases toward the top-right
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.globalAlpha = 0.6;
      for (let k = -3; k <= 3; k += 0.5) { const a = toPx(-3, k + 3), b = toPx(3, k - 3); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      ctx.globalAlpha = 1;
      // constraint circle x^2 + y^2 = 1
      const O = toPx(0, 0);
      ctx.strokeStyle = p.soft; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(O.x, O.y, S, 0, 7); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'left';
      ctx.fillText('g: x² + y² = 1', toPx(0.05, -1)[0] + 4, toPx(0, -1).y + 16);
      const px = Math.cos(theta), py = Math.sin(theta), Pp = toPx(px, py);
      const fval = px + py, tangent = Math.abs(py - px) < 0.04;   // ∇f ∥ ∇g  ⇔  sinθ = cosθ
      // the level line of f through the point (highlighted: sage at the tangency, gold otherwise)
      const k = fval, e1 = toPx(-2.6, k + 2.6), e2 = toPx(2.6, k - 2.6);
      ctx.strokeStyle = tangent ? p.sage : p.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(e1.x, e1.y); ctx.lineTo(e2.x, e2.y); ctx.stroke();
      // gradient arrows from the point: ∇f = (1,1) constant, ∇g ∝ (x,y) radial
      const norm = (vx, vy, len) => { const m = Math.hypot(vx, vy) || 1; return [vx / m * len, vy / m * len]; };
      const [gfx, gfy] = norm(1, 1, 0.85), [ggx, ggy] = norm(px, py, 0.85);
      const Pf = toPx(px + gfx, py + gfy), Pg = toPx(px + ggx, py + ggy);
      arrow(ctx, Pp.x, Pp.y, Pg.x, Pg.y, p.violet, 3);
      arrow(ctx, Pp.x, Pp.y, Pf.x, Pf.y, p.gold, 3);
      ctx.fillStyle = p.violet; ctx.font = '600 12px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('∇g', Pg.x + 5, Pg.y - 2);
      ctx.fillStyle = p.gold; ctx.fillText('∇f', Pf.x + 5, Pf.y - 2);
      ctx.fillStyle = tangent ? p.sage : p.gold; ctx.beginPath(); ctx.arc(Pp.x, Pp.y, 6, 0, 7); ctx.fill();
      info.innerHTML = `f(x,y) = x + y at (${px.toFixed(2)}, ${py.toFixed(2)}) equals <b style="color:${tangent ? p.sage : p.gold}">${fval.toFixed(3)}</b>. `
        + (tangent
          ? `<b style="color:${p.sage}">Tangent!</b> The level line just kisses the circle and <b>∇f ∥ ∇g</b> — a constrained ${fval > 0 ? 'maximum' : 'minimum'}. That parallel-gradients condition is exactly ∇f = λ∇g.`
          : `The gold level line <b>cuts</b> the circle, so sliding along the constraint reaches a higher line — not optimal yet. Move until ∇f and ∇g line up.`);
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Lagrange multipliers visualizer: maximizing f(x,y) = x + y on the unit circle constraint. A point moves around the circle; the level line of f through it, the constant diagonal gradient of f, and the radial gradient of g are drawn. At the constrained optimum the level line is tangent to the circle and the two gradients are parallel (∇f = λ∇g). Use the angle slider, or the Maximize / Minimize buttons.');
    draw();
  });

  /* ========================================================
     37. Dropout: each forward pass trains a different thinned sub-network
     ======================================================== */
  register({ id: 'dl-dropout', topic: 'deep-learning', title: 'Dropout: Training a Thinned Ensemble', blurb: 'Watch dropout zero out a random fraction of hidden units on every forward pass — each pass trains a different thinned sub-network that all share one set of weights. At test time every unit is kept (and scaled), averaging the ensemble.' },
  function (root) {
    const W = 560, H = 380, padX = 70, padY = 44, MONO = "JetBrains Mono, monospace";
    const sizes = [3, 6, 6, 2], isHidden = [false, true, true, false], LABELS = ['input', 'hidden', 'hidden', 'output'];
    const { c, ctx } = canvas(root, W, H);
    let p = 0.4, mode = 'train', kept = [], runH = null;
    function resample() {
      kept = sizes.map((n, li) => { const a = []; for (let j = 0; j < n; j++) a.push(mode === 'test' || !isHidden[li] ? true : (Math.random() >= p)); return a; });
      draw();
    }
    function pos(li, j) {
      const n = sizes[li], x = padX + li * (W - 2 * padX) / (sizes.length - 1);
      const gap = Math.min(44, (H - 2 * padY) / (Math.max.apply(null, sizes) - 1));
      return { x, y: H / 2 + (j - (n - 1) / 2) * gap };
    }
    function draw() {
      const pl = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pl.bg; ctx.fillRect(0, 0, W, H);
      // edges (drawn only when both endpoints survive)
      for (let li = 0; li < sizes.length - 1; li++) for (let a = 0; a < sizes[li]; a++) for (let b = 0; b < sizes[li + 1]; b++) {
        const on = kept[li][a] && kept[li + 1][b], A = pos(li, a), B = pos(li + 1, b);
        ctx.strokeStyle = pl.gold; ctx.globalAlpha = on ? (mode === 'test' ? 0.10 : 0.16) : 0.025; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // nodes
      let dropped = 0, hid = 0;
      for (let li = 0; li < sizes.length; li++) for (let j = 0; j < sizes[li]; j++) {
        const q = pos(li, j), k = kept[li][j];
        if (isHidden[li]) { hid++; if (!k) dropped++; }
        if (k) { ctx.fillStyle = isHidden[li] ? pl.gold : pl.sage; ctx.beginPath(); ctx.arc(q.x, q.y, 9, 0, 7); ctx.fill(); }
        else {
          ctx.fillStyle = pl.panel; ctx.strokeStyle = pl.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q.x, q.y, 9, 0, 7); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = pl.mute; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(q.x - 4, q.y - 4); ctx.lineTo(q.x + 4, q.y + 4); ctx.moveTo(q.x + 4, q.y - 4); ctx.lineTo(q.x - 4, q.y + 4); ctx.stroke();
        }
      }
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      LABELS.forEach((lab, li) => ctx.fillText(lab, pos(li, 0).x, padY - 16));
      const qv = (1 - p).toFixed(2);
      info.innerHTML = mode === 'test'
        ? `<b>Test time</b> · drop rate p=${p.toFixed(2)} — <b>all units kept</b>, with outputs scaled by q=${qv} (frameworks fold this scaling into training instead, via 'inverted dropout'). One deterministic network that approximates averaging the whole ensemble of training-time sub-networks.`
        : `<b>Training</b> · drop rate p=${p.toFixed(2)} — this pass dropped <b>${dropped}/${hid}</b> hidden units (crossed out, their edges gone). Each forward pass samples a different thinned sub-network; with n droppable units there are up to 2ⁿ of them, all sharing one set of weights. No unit can lean on a single teammate → robust, distributed features. Press Resample for a new mask.`;
    }
    const ctl = controls(root);
    slider(ctl, { label: 'drop rate p', min: 0, max: 0.8, step: 0.05, value: p, fmt: v => 'p=' + v.toFixed(2), onInput: v => { p = v; resample(); } });
    select(ctl, { label: 'phase', value: mode, options: [{ value: 'train', label: 'Training (dropout on)' }, { value: 'test', label: 'Test (all units kept)' }], onChange: v => { mode = v; if (runH) { runH.stop(); runH = null; animBtn.innerHTML = '▶ Animate'; } resample(); } });
    const btns = controls(root);
    button(btns, '🎲 Resample', () => { if (mode === 'train') resample(); }, 'primary');
    const animBtn = button(btns, '▶ Animate', () => {
      if (runH) { runH.stop(); runH = null; animBtn.innerHTML = '▶ Animate'; return; }
      if (mode !== 'train') return;
      animBtn.innerHTML = '⏸ Pause'; let fr = 0; runH = loop(() => { if (fr++ % 36 === 0) resample(); });
    });
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A small multilayer network; on each training pass a random fraction of the hidden units (and their connections) are dropped, leaving a different thinned sub-network. At test time all units are kept.');
    resample();
  });

  register({ id: 'llm-positional-encoding', topic: 'llm', title: 'Positional Encoding: The Sinusoidal Clock', blurb: 'Self-attention is order-blind — it sees a bag of tokens. Sinusoidal positional encodings fix that by adding a unique "fingerprint" to each position. See the iconic heatmap, the stack of frequencies behind it, and why nearby positions stay similar.' },
  function (root) {
    const W = 580, H = 408, MONO = "JetBrains Mono, monospace";
    const NPOS = 40;
    let d = 32, mode = 'heatmap', q = 12;
    const { c, ctx } = canvas(root, W, H);

    function pe(pos, idx) { const k = Math.floor(idx / 2), w = Math.pow(10000, -2 * k / d), a = pos * w; return (idx % 2 === 0) ? Math.sin(a) : Math.cos(a); }
    function toRGB(s) { s = String(s).trim(); if (s[0] === '#') { let h = s.slice(1); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; } const m = s.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/); return m ? [+m[1], +m[2], +m[3]] : [128, 128, 128]; }
    function mix(a, b, t) { const A = toRGB(a), B = toRGB(b); return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(A[2] + (B[2] - A[2]) * t)})`; }

    function draw() {
      const pl = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pl.bg; ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (mode === 'heatmap') drawHeatmap(pl);
      else if (mode === 'waves') drawWaves(pl);
      else drawSim(pl);
      setNote(pl);
    }

    function drawHeatmap(pl) {
      const padL = 50, padT = 26, padR = 16, padB = 34;
      const cw = (W - padL - padR) / d, ch = (H - padT - padB) / NPOS;
      for (let p = 0; p < NPOS; p++) for (let i = 0; i < d; i++) {
        const v = pe(p, i);
        ctx.fillStyle = v >= 0 ? mix(pl.panel, pl.sage, v) : mix(pl.panel, pl.rust, -v);
        ctx.fillRect(padL + i * cw, padT + p * ch, Math.ceil(cw) + 0.5, Math.ceil(ch) + 0.5);
      }
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1; ctx.strokeRect(padL, padT, d * cw, NPOS * ch);
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO;
      ctx.save(); ctx.translate(14, padT + NPOS * ch / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('token position  0 → ' + (NPOS - 1), 0, 0); ctx.restore();
      ctx.textAlign = 'center'; ctx.fillText('embedding dimension  0 → ' + (d - 1), padL + d * cw / 2, H - 12);
      ctx.textAlign = 'left'; ctx.fillStyle = pl.sage; ctx.fillText('■ +1', padL, 18); ctx.fillStyle = pl.rust; ctx.fillText('■ −1', padL + 52, 18);
    }

    function drawWaves(pl) {
      const padL = 46, padT = 22, padR = 14, padB = 40;
      const w = W - padL - padR, h = H - padT - padB, y0 = padT + h / 2;
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, y0); ctx.lineTo(padL + w, y0); ctx.stroke();           // zero line
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + h); ctx.stroke();        // y axis
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      ctx.fillText('+1', padL - 6, padT + 4); ctx.fillText('0', padL - 6, y0 + 4); ctx.fillText('−1', padL - 6, padT + h + 4);
      const dims = [0, 2, 8, 20].filter(k => k < d), cols = [pl.gold, pl.sage, pl.violet, pl.rust];
      const xOf = p => padL + (p / (NPOS - 1)) * w, yOf = v => y0 - v * (h / 2 - 4);
      dims.forEach((idx, di) => {
        ctx.strokeStyle = cols[di]; ctx.lineWidth = 2; ctx.beginPath();
        for (let p = 0; p < NPOS; p++) { const x = xOf(p), y = yOf(pe(p, idx)); p === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke();
        ctx.fillStyle = cols[di]; ctx.textAlign = 'left'; ctx.font = '10px ' + MONO;
        ctx.fillText('dim ' + idx + (idx === 0 ? ' (fast)' : idx === 20 ? ' (slow)' : ''), padL + 6 + di * 96, padT + h + 26);
      });
      ctx.fillStyle = pl.mute; ctx.textAlign = 'center'; ctx.fillText('token position →', padL + w / 2, padT + h + 13);
    }

    function drawSim(pl) {
      const padL = 50, padT = 24, padR = 16, padB = 38;
      const w = W - padL - padR, h = H - padT - padB;
      const sims = []; let lo = 1, hi = -1;
      for (let p = 0; p < NPOS; p++) { let s = 0; for (let i = 0; i < d; i++) s += pe(q, i) * pe(p, i); s = (2 / d) * s; sims.push(s); if (s < lo) lo = s; if (s > hi) hi = s; }
      lo = Math.min(lo, -0.2); hi = 1;
      const xOf = p => padL + (p / (NPOS - 1)) * w, yOf = s => padT + h - ((s - lo) / (hi - lo)) * h;
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, yOf(0)); ctx.lineTo(padL + w, yOf(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + h); ctx.stroke();
      // query marker
      ctx.strokeStyle = mix(pl.gold, pl.bg, 0.3); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(xOf(q), padT); ctx.lineTo(xOf(q), padT + h); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = pl.gold; ctx.lineWidth = 2; ctx.beginPath();
      sims.forEach((s, p) => { const x = xOf(p), y = yOf(s); p === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.stroke();
      sims.forEach((s, p) => { ctx.fillStyle = p === q ? pl.gold : pl.soft; ctx.beginPath(); ctx.arc(xOf(p), yOf(s), p === q ? 4 : 2, 0, 7); ctx.fill(); });
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      ctx.fillText('1.0', padL - 6, yOf(1) + 4); ctx.fillText('0', padL - 6, yOf(0) + 4);
      ctx.textAlign = 'center'; ctx.fillText('token position →   (query q = ' + q + ')', padL + w / 2, padT + h + 26);
    }

    function setNote(pl) {
      info.innerHTML = mode === 'heatmap'
        ? `<b>Heatmap.</b> Each row is a token position (0–${NPOS - 1}); each column an embedding dimension (0–${d - 1}). Colour = the sin/cos value (sage +1, rust −1). Left dimensions oscillate fast, right ones slowly — a "continuous binary clock" that fingerprints every position. This fixed matrix is simply <i>added</i> onto the token embeddings.`
        : mode === 'waves'
        ? `<b>Frequencies.</b> A few dimensions drawn as waves across positions. Dimension 2k is sin(pos·ω) with ω = 10000<sup>−2k/d</sup>: small k → short wavelength (fast), large k → long wavelength (slow). Stacking many frequencies makes each position's vector unique — the rows of the heatmap.`
        : `<b>Relative similarity.</b> Dot-product similarity between query position q = ${q} and every other position, scaled so the peak at q is 1. It falls off smoothly and symmetrically with distance — which is how the fixed sinusoids let attention recover <i>relative</i> position (the offset is a linear rotation of the encoding).`;
    }

    const ctl = controls(root);
    select(ctl, { label: 'view', value: mode, options: [{ value: 'heatmap', label: 'Heatmap (pos × dim)' }, { value: 'waves', label: 'Frequencies (waves)' }, { value: 'similarity', label: 'Relative similarity' }], onChange: v => { mode = v; draw(); } });
    slider(ctl, { label: 'dimensions d', min: 16, max: 64, step: 8, value: d, fmt: v => 'd=' + v, onInput: v => { d = v; if (q > NPOS - 1) q = NPOS - 1; draw(); } });
    slider(ctl, { label: 'query pos (similarity)', min: 0, max: NPOS - 1, step: 1, value: q, fmt: v => 'q=' + v, onInput: v => { q = v; draw(); } });
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Sinusoidal positional encoding. A heatmap of position by embedding dimension where low dimensions oscillate quickly and high dimensions slowly, giving each position a unique fingerprint; alternate views show the per-dimension sinusoids and the smooth decay of similarity with distance.');
    draw();
  });

  register({ id: 'dl-kl-divergence', topic: 'deep-learning', title: 'KL Divergence: Matching a Distribution to a Prior', blurb: "The VAE's latent regularizer is a KL divergence pulling the encoder's posterior toward a standard-normal prior. Drag the posterior and watch KL(q‖p) shrink to zero as it matches the prior — and see that KL is asymmetric: KL(p‖q) ≠ KL(q‖p)." },
  function (root) {
    const W = 560, H = 372, MONO = "JetBrains Mono, monospace";
    const XMIN = -5, XMAX = 5;
    let mu = 1.4, sig = 0.6;                 // posterior q = N(mu, sig^2); prior p = N(0,1) fixed
    const { c, ctx } = canvas(root, W, H);
    const gauss = (x, m, s) => Math.exp(-((x - m) * (x - m)) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
    const klG = (m1, s1, m2, s2) => Math.log(s2 / s1) + (s1 * s1 + (m1 - m2) * (m1 - m2)) / (2 * s2 * s2) - 0.5;  // KL(N1‖N2)
    function draw() {
      const pl = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pl.bg; ctx.fillRect(0, 0, W, H);
      const padL = 40, padR = 14, padT = 18, padB = 38, plotW = W - padL - padR, plotH = H - padT - padB;
      const xOf = x => padL + (x - XMIN) / (XMAX - XMIN) * plotW;
      const ymax = Math.max(0.45, gauss(mu, mu, sig), gauss(0, 0, 1)) * 1.14;
      const yOf = dns => padT + plotH - (dns / ymax) * plotH;
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let t = XMIN; t <= XMAX; t++) ctx.fillText(t, xOf(t), padT + plotH + 14);
      function curve(m, s, color, a) {
        ctx.beginPath();
        for (let px = 0; px <= plotW; px++) { const x = XMIN + (px / plotW) * (XMAX - XMIN), y = yOf(gauss(x, m, s)); px === 0 ? ctx.moveTo(padL + px, y) : ctx.lineTo(padL + px, y); }
        ctx.lineTo(padL + plotW, padT + plotH); ctx.lineTo(padL, padT + plotH); ctx.closePath();
        ctx.globalAlpha = a; ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
        for (let px = 0; px <= plotW; px++) { const x = XMIN + (px / plotW) * (XMAX - XMIN), y = yOf(gauss(x, m, s)); px === 0 ? ctx.moveTo(padL + px, y) : ctx.lineTo(padL + px, y); }
        ctx.stroke();
      }
      curve(0, 1, pl.sage, 0.13);            // prior
      curve(mu, sig, pl.gold, 0.16);         // posterior
      const klqp = klG(mu, sig, 0, 1), klpq = klG(0, 1, mu, sig);
      ctx.textAlign = 'left'; ctx.font = '11px ' + MONO;
      ctx.fillStyle = pl.sage; ctx.fillText('prior  p = N(0, 1)', padL + 8, padT + 13);
      ctx.fillStyle = pl.gold; ctx.fillText('posterior  q = N(' + mu.toFixed(1) + ', ' + (sig * sig).toFixed(2) + ')', padL + 8, padT + 29);
      ctx.textAlign = 'right'; ctx.fillStyle = pl.ink;
      ctx.fillText('KL(q‖p) = ' + klqp.toFixed(3), padL + plotW - 4, padT + 13);
      ctx.fillStyle = pl.mute; ctx.fillText('KL(p‖q) = ' + klpq.toFixed(3), padL + plotW - 4, padT + 29);
      const matched = Math.abs(mu) < 0.05 && Math.abs(sig - 1) < 0.05;
      info.innerHTML = `The VAE adds <b>KL(q‖p)</b> to its loss — a penalty for how far the encoder's posterior <span style="color:var(--gold)">q</span> drifts from the standard-normal prior <span style="color:var(--sage)">p</span>. Right now <b>KL(q‖p) = ${klqp.toFixed(3)} nats</b>${matched ? ' — <b>zero!</b> q matches the prior exactly.' : '; it reaches 0 only when q is exactly N(0,1) (μ=0, σ=1 — press “match the prior”).'} KL is <b>not symmetric</b>: KL(p‖q) = ${klpq.toFixed(3)} ≠ KL(q‖p). The forward KL(p‖q) is mode-<i>covering</i>; the reverse KL(q‖p) the VAE minimises is mode-<i>seeking</i> (it would rather be narrow and confident than cover mass where p has little).`;
    }
    const ctl = controls(root);
    const muS = slider(ctl, { label: 'posterior mean μ', min: -3, max: 3, step: 0.1, value: mu, fmt: v => 'μ=' + v.toFixed(1), onInput: v => { mu = v; draw(); } });
    const sigS = slider(ctl, { label: 'posterior std σ', min: 0.3, max: 2.5, step: 0.1, value: sig, fmt: v => 'σ=' + v.toFixed(1), onInput: v => { sig = v; draw(); } });
    const btns = controls(root);
    button(btns, '🎯 Match the prior', () => {       // dispatch real input events → updates thumb, label, and redraws
      muS.value = 0; muS.dispatchEvent(new Event('input'));
      sigS.value = 1; sigS.dispatchEvent(new Event('input'));
    }, 'primary');
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'KL divergence between an adjustable Gaussian posterior q and a fixed standard-normal prior p. KL(q‖p) shrinks to zero as q matches the prior, and the asymmetry KL(p‖q) ≠ KL(q‖p) is shown numerically.');
    draw();
  });

  register({ id: 'rl-td-mc', topic: 'reinforcement-learning', title: 'TD vs Monte Carlo: Learning to Predict', blurb: "The classic 5-state random walk (Sutton & Barto). Run episodes and watch TD(0) — which bootstraps off its own next estimate every step — and Monte Carlo — which waits for each episode's actual return — both crawl toward the true values 1/6…5/6. Watch the RMS errors: TD usually converges with lower variance." },
  function (root) {
    const W = 560, H = 384, MONO = "JetBrains Mono, monospace";
    const N = 5, START = 2;                       // states A..E (0..4); terminals at -1 (V=0) and 5 (V=1, reward +1)
    const TRUE = [1/6, 2/6, 3/6, 4/6, 5/6], LABELS = ['A', 'B', 'C', 'D', 'E'];
    let Vtd, Vmc, eps, alpha = 0.1;
    const { c, ctx } = canvas(root, W, H);
    function reset() { Vtd = [0.5, 0.5, 0.5, 0.5, 0.5]; Vmc = [0.5, 0.5, 0.5, 0.5, 0.5]; eps = 0; draw(); }
    function episode() {
      // generate a random-walk trajectory from the center
      const visited = []; let s = START, reachedRight = false;
      while (true) {
        const step = Math.random() < 0.5 ? -1 : 1, sp = s + step;
        const term = (sp < 0 || sp >= N);
        const r = (sp >= N) ? 1 : 0;              // +1 only on entering the right terminal
        // TD(0): bootstrap off the next state's current estimate (terminal value = 0)
        Vtd[s] += alpha * (r + (term ? 0 : Vtd[sp]) - Vtd[s]);
        visited.push(s);
        if (term) { reachedRight = (sp >= N); break; }
        s = sp;
      }
      // every-visit constant-alpha MC: gamma=1, only terminal reward, so the return G is the same for all visited states
      const G = reachedRight ? 1 : 0;
      visited.forEach(st => { Vmc[st] += alpha * (G - Vmc[st]); });
    }
    function runEpisodes(n) { for (let i = 0; i < n; i++) episode(); eps += n; draw(); }
    function rms(V) { let s = 0; for (let i = 0; i < N; i++) s += (V[i] - TRUE[i]) * (V[i] - TRUE[i]); return Math.sqrt(s / N); }
    function draw() {
      const pl = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pl.bg; ctx.fillRect(0, 0, W, H);
      const padL = 46, padR = 16, padT = 20, padB = 40, plotW = W - padL - padR, plotH = H - padT - padB;
      const xOf = i => padL + (i / (N - 1)) * plotW, yOf = v => padT + plotH - Math.max(0, Math.min(1, v)) * plotH;
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(v => ctx.fillText(v.toFixed(1), padL - 6, yOf(v) + 3));
      ctx.textAlign = 'center';
      for (let i = 0; i < N; i++) ctx.fillText(LABELS[i], xOf(i), padT + plotH + 15);
      function series(V, color, dash) {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash || []); ctx.beginPath();
        for (let i = 0; i < N; i++) { const x = xOf(i), y = yOf(V[i]); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke(); ctx.setLineDash([]);
        if (!dash) for (let i = 0; i < N; i++) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(xOf(i), yOf(V[i]), 3.5, 0, 7); ctx.fill(); }
      }
      series(TRUE, pl.mute, [5, 4]);               // true values (dashed)
      series(Vmc, pl.sage);                         // Monte Carlo
      series(Vtd, pl.gold);                         // TD(0)
      ctx.textAlign = 'left'; ctx.font = '11px ' + MONO;
      ctx.fillStyle = pl.gold; ctx.fillText('● TD(0)', padL + 6, padT + 12);
      ctx.fillStyle = pl.sage; ctx.fillText('● Monte Carlo', padL + 78, padT + 12);
      ctx.fillStyle = pl.mute; ctx.fillText('-- true', padL + 196, padT + 12);
      info.innerHTML = `<b>Random walk (5 states).</b> Episodes start at <b>C</b> and step left/right with equal probability until a terminal; reward is +1 only at the right end, so the true values rise linearly: A=1/6 … E=5/6 (dashed). <b>${eps} episodes run</b> (α=${alpha.toFixed(2)}). Current RMS error — <span style="color:var(--gold)">TD(0) = ${rms(Vtd).toFixed(3)}</span>, <span style="color:var(--sage)">MC = ${rms(Vmc).toFixed(3)}</span>. TD updates every step by <i>bootstrapping</i> off its own estimate of the next state; MC waits for each episode's actual return — noisier, so MC's curve is usually rougher and slower to settle.`;
    }
    const ctl = controls(root);
    slider(ctl, { label: 'step size α', min: 0.02, max: 0.3, step: 0.02, value: alpha, fmt: v => 'α=' + v.toFixed(2), onInput: v => { alpha = v; } });
    const btns = controls(root);
    button(btns, '▶ Run 10 episodes', () => runEpisodes(10), 'primary');
    button(btns, '▶▶ Run 100', () => runEpisodes(100));
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "The 5-state random walk. TD(0) and Monte Carlo value estimates are plotted against the true linear values 1/6 to 5/6; running more episodes drives both toward the truth, with TD typically lower-variance. RMS errors for each method are shown.");
    reset();
  });

  register({ id: 'rl-bandit', topic: 'reinforcement-learning', title: 'Multi-Armed Bandit: Explore vs Exploit', blurb: "Five slot machines, each with a hidden win-rate. Pull arms under ε-greedy, UCB, or pure-greedy and watch the estimates home in on the true means — while the cumulative-regret curve reveals which strategy wastes the fewest pulls on inferior arms." },
  function (root) {
    const W = 580, H = 410, MONO = "JetBrains Mono, monospace";
    const TRUE = [0.25, 0.50, 0.75, 0.40, 0.55];       // hidden win-rates; best = arm 2 (C) at 0.75
    const LBL = ['A', 'B', 'C', 'D', 'E'], K = TRUE.length, BEST = Math.max.apply(null, TRUE);
    let Q, N, t, regret, hist, strategy = 'epsilon', eps = 0.1, lastArm = -1;
    const { c, ctx } = canvas(root, W, H);
    function argmax(a) { let bi = 0; for (let i = 1; i < a.length; i++) if (a[i] > a[bi]) bi = i; return bi; }
    function reset() { Q = TRUE.map(() => 0); N = TRUE.map(() => 0); t = 0; regret = 0; hist = [0]; lastArm = -1; draw(); }
    function chooseArm() {
      for (let k = 0; k < K; k++) if (N[k] === 0) return k;            // pull each arm once first
      if (strategy === 'greedy') return argmax(Q);
      if (strategy === 'epsilon') return Math.random() < eps ? Math.floor(Math.random() * K) : argmax(Q);
      let bi = 0, bu = -Infinity;                                       // UCB1
      for (let k = 0; k < K; k++) { const u = Q[k] + Math.sqrt(2 * Math.log(t + 1) / N[k]); if (u > bu) { bu = u; bi = k; } }
      return bi;
    }
    function pull() { const k = chooseArm(); const r = Math.random() < TRUE[k] ? 1 : 0; N[k]++; Q[k] += (r - Q[k]) / N[k]; t++; regret += BEST - TRUE[k]; lastArm = k; if (t % 3 === 0) hist.push(regret); }
    function runPulls(n) { for (let i = 0; i < n; i++) pull(); hist.push(regret); draw(); }
    function draw() {
      const pl = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pl.bg; ctx.fillRect(0, 0, W, H);
      // ---- arm bars (top) ----
      const padL = 40, padR = 14, padT = 18, armsH = 188, base = padT + armsH, plotW = W - padL - padR;
      const greedy = argmax(Q);
      ctx.strokeStyle = pl.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, base); ctx.lineTo(padL + plotW, base); ctx.stroke();
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(v => ctx.fillText(v.toFixed(1), padL - 5, base - v * armsH + 3));
      const slot = plotW / K, bw = slot * 0.5;
      for (let k = 0; k < K; k++) {
        const cx = padL + (k + 0.5) * slot, x0 = cx - bw / 2;
        ctx.fillStyle = (k === greedy) ? pl.sage : pl.gold; ctx.globalAlpha = N[k] ? 0.85 : 0.25;
        ctx.fillRect(x0, base - Q[k] * armsH, bw, Q[k] * armsH); ctx.globalAlpha = 1;
        // true-mean tick
        ctx.strokeStyle = pl.rust; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 3, base - TRUE[k] * armsH); ctx.lineTo(x0 + bw + 3, base - TRUE[k] * armsH); ctx.stroke();
        ctx.fillStyle = pl.soft; ctx.font = '11px ' + MONO; ctx.textAlign = 'center';
        ctx.fillText(LBL[k], cx, base + 15); ctx.fillStyle = pl.mute; ctx.font = '9px ' + MONO; ctx.fillText('n=' + N[k], cx, base + 27);
      }
      ctx.textAlign = 'left'; ctx.font = '10px ' + MONO;
      ctx.fillStyle = pl.gold; ctx.fillText('▮ estimate', padL, padT - 4); ctx.fillStyle = pl.rust; ctx.fillText('— true rate', padL + 78, padT - 4);
      ctx.fillStyle = pl.sage; ctx.textAlign = 'right'; ctx.fillText('greedy = ' + LBL[greedy], padL + plotW, padT - 4);
      // ---- regret curve (bottom) ----
      const ry0 = base + 40, rH = H - ry0 - 16;
      ctx.strokeStyle = pl.line; ctx.beginPath(); ctx.moveTo(padL, ry0); ctx.lineTo(padL, ry0 + rH); ctx.lineTo(padL + plotW, ry0 + rH); ctx.stroke();
      const rmax = Math.max(1, hist[hist.length - 1]);
      ctx.strokeStyle = pl.violet; ctx.lineWidth = 2; ctx.beginPath();
      hist.forEach((v, i) => { const x = padL + (hist.length < 2 ? 0 : i / (hist.length - 1) * plotW), y = ry0 + rH - (v / rmax) * rH; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.stroke();
      ctx.fillStyle = pl.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('cumulative regret →  ' + regret.toFixed(1) + ' over ' + t + ' pulls', padL + 4, ry0 + 11);
      const optPct = t ? Math.round(N[argmax(TRUE)] / t * 100) : 0;
      info.innerHTML = `<b>${strategy === 'epsilon' ? 'ε-greedy (ε=' + eps.toFixed(2) + ')' : strategy === 'ucb' ? 'UCB1' : 'pure greedy'}.</b> Five arms with hidden win-rates; the best is <b>C (0.75)</b>. After <b>${t} pulls</b>: cumulative <b>regret = ${regret.toFixed(1)}</b> (reward lost vs. always pulling C), and <b>${optPct}%</b> of pulls landed on the best arm — lower, flatter regret is better. Watch the tradeoff: <b>pure greedy</b> commits after one look per arm (great when it guesses right, but it can lock onto a worse arm — <i>reset & re-run a few times to see its regret swing wildly</i>); <b>ε-greedy</b> pays a small, steady exploration tax forever; <b>UCB</b> is the most consistent (it explores arms it's still unsure about and tapers off), its edge over ε-greedy emerging over long horizons.`;
    }
    const ctl = controls(root);
    select(ctl, { label: 'strategy', value: strategy, options: [{ value: 'epsilon', label: 'ε-greedy' }, { value: 'ucb', label: 'UCB1' }, { value: 'greedy', label: 'pure greedy' }], onChange: v => { strategy = v; reset(); } });
    slider(ctl, { label: 'ε (for ε-greedy)', min: 0, max: 0.5, step: 0.02, value: eps, fmt: v => 'ε=' + v.toFixed(2), onInput: v => { eps = v; draw(); } });
    const btns = controls(root);
    button(btns, '▶ Pull ×50', () => runPulls(50), 'primary');
    button(btns, '▶▶ Pull ×500', () => runPulls(500));
    button(btns, '↻ Reset', () => reset());
    const info = note(root);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Multi-armed bandit. Five bars show each arm's estimated win-rate versus its true rate (red tick), with pull counts; a cumulative-regret curve below shows how much reward the chosen strategy (epsilon-greedy, UCB, or greedy) loses over time relative to always pulling the best arm.");
    reset();
  });

  register({ id: 'ps-binomial-poisson', topic: 'probability-statistics', title: 'Binomial ⇄ Poisson Explorer', blurb: 'Drag n and p to reshape the Binomial PMF — watch the mean np, the spread, and the bell emerge — then overlay Poisson(np) to see the law of rare events (many trials, tiny p).' },
  function (root) {
    const W = 560, H = 380, padL = 42, padR = 14, padB = 38, padT = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    let n = 10, p = 0.5, overlay = false;
    // Binomial PMF via a numerically-stable recurrence (no large factorials):
    //   P(0) = (1-p)^n ;  P(k) = P(k-1) · (n-k+1)/k · p/(1-p)
    function binomPMF(n, p) {
      const out = new Array(n + 1); let pk = Math.pow(1 - p, n); out[0] = pk;
      for (let k = 1; k <= n; k++) { pk = pk * ((n - k + 1) / k) * (p / (1 - p)); out[k] = pk; }
      return out;
    }
    // Poisson PMF: Q(0)=e^-λ ; Q(k)=Q(k-1)·λ/k
    function poissonPMF(lam, kmax) {
      const out = new Array(kmax + 1); let qk = Math.exp(-lam); out[0] = qk;
      for (let k = 1; k <= kmax; k++) { qk = qk * lam / k; out[k] = qk; }
      return out;
    }
    function draw() {
      const pal = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, W, H);
      const bp = binomPMF(n, p), lam = n * p;
      const pp = overlay ? poissonPMF(lam, n) : null;
      let ymax = Math.max.apply(null, bp); if (pp) ymax = Math.max(ymax, Math.max.apply(null, pp));
      ymax = (ymax || 1) * 1.14;
      const nb = n + 1, plotW = W - padL - padR, bw = plotW / nb;
      const X = k => padL + (k + 0.5) * bw;                  // center of bar k
      const Yb = v => H - padB - (v / ymax) * (H - padT - padB);
      // baseline
      ctx.strokeStyle = pal.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      // binomial bars
      for (let k = 0; k <= n; k++) {
        const x = padL + k * bw + bw * 0.14, w = Math.max(1, bw * 0.72), y = Yb(bp[k]);
        ctx.fillStyle = pal.gold; ctx.globalAlpha = 0.9; ctx.fillRect(x, y, w, (H - padB) - y); ctx.globalAlpha = 1;
      }
      // Poisson overlay: a line through the PMF tops + dots
      if (pp) {
        ctx.strokeStyle = pal.violet; ctx.lineWidth = 2; ctx.beginPath();
        for (let k = 0; k <= n; k++) { const px = X(k), py = Yb(pp[k]); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
        ctx.fillStyle = pal.violet;
        for (let k = 0; k <= n; k++) { ctx.beginPath(); ctx.arc(X(k), Yb(pp[k]), 2.4, 0, 7); ctx.fill(); }
      }
      // mean line at k = np
      ctx.save(); ctx.strokeStyle = pal.rust; ctx.lineWidth = 1.4; ctx.setLineDash([4, 4]);
      const mxc = padL + (lam + 0.5) * bw; ctx.beginPath(); ctx.moveTo(mxc, padT - 6); ctx.lineTo(mxc, H - padB); ctx.stroke(); ctx.restore();
      ctx.fillStyle = pal.rust; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('mean ' + lam.toFixed(1), mxc, padT - 10);
      // x ticks: ~9 evenly-spaced k labels
      ctx.fillStyle = pal.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      const step = Math.max(1, Math.ceil(n / 9));
      for (let k = 0; k <= n; k += step) ctx.fillText(k, X(k), H - padB + 14);
      // info note (plain unicode — NOT KaTeX)
      const variance = n * p * (1 - p), sd = Math.sqrt(variance);
      const shape = Math.abs(p - 0.5) < 0.04 ? 'symmetric' : (p < 0.5 ? 'right-skewed (tail toward larger k)' : 'left-skewed (tail toward smaller k)');
      let msg = `<b>Bin(n=${n}, p=${p.toFixed(2)})</b> — mean np = <b>${lam.toFixed(2)}</b>, variance np(1−p) = <b>${variance.toFixed(2)}</b>, σ ≈ ${sd.toFixed(2)}. Shape: ${shape}; it grows more bell-like as n increases.`;
      if (pp) msg += ` <span style="color:${pal.violet}">Poisson(λ=np=${lam.toFixed(2)})</span> overlaid: the two nearly coincide when <b>n is large and p small</b> — the <i>law of rare events</i>. (They diverge when p is large.)`;
      info.innerHTML = msg;
    }
    slider(ctl, { label: 'trials n', min: 1, max: 50, step: 1, value: n, fmt: v => 'n=' + v, onInput: v => { n = v; draw(); } });
    slider(ctl, { label: 'success p', min: 0.02, max: 0.98, step: 0.02, value: p, fmt: v => 'p=' + v.toFixed(2), onInput: v => { p = v; draw(); } });
    button(ctl, 'Poisson(np) overlay', function () { overlay = !overlay; this.classList.toggle('active', overlay); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Binomial distribution explorer: a bar chart of the Binomial PMF P(X=k) with sliders for the number of trials n and success probability p, a dashed line at the mean np, and an optional Poisson(np) overlay illustrating the law of rare events.');
    draw();
  });

  /* ========================================================
     43. GAN training: the adversarial minimax game (DL)
     ===================================================== */
  register({ id: 'dl-gan-training', topic: 'deep-learning', title: 'GAN Training: The Adversarial Game', blurb: 'Watch a generator (orange) and an optimal discriminator (purple) play their minimax game. Press play and the generator slides its distribution onto the real data (green) until D(x) collapses to 0.5 everywhere — a coin flip. Switch to two modes to watch the single-Gaussian generator mode-collapse onto just one peak.' },
  function (root) {
    const W = 560, H = 380, padL = 40, padR = 16, padB = 40, padT = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const MONO = "JetBrains Mono, monospace";
    const XMIN = -6, XMAX = 6, NX = 240, dx = (XMAX - XMIN) / NX, EPS = 1e-9;
    const xs = []; for (let i = 0; i <= NX; i++) xs.push(XMIN + i * dx);
    const START = { mu: -3.0, sig: 1.4 };
    let muG = START.mu, sigG = START.sig, lr = 0.4, iter = 0, playing = false, mode = 'single', frame = 0, playBtn = null;

    function gauss(x, mu, sig) { const z = (x - mu) / sig; return Math.exp(-0.5 * z * z) / (sig * Math.sqrt(2 * Math.PI)); }
    function pdata(x) {
      return mode === 'single' ? gauss(x, 1.0, 0.85)
        : 0.5 * gauss(x, -1.9, 0.6) + 0.5 * gauss(x, 1.9, 0.6);
    }
    // Optimal discriminator for the CURRENT generator: D*(x) = p_data / (p_data + p_g).
    function frozenD() { const D = new Array(NX + 1); for (let i = 0; i <= NX; i++) { const a = pdata(xs[i]), b = gauss(xs[i], muG, sigG); D[i] = a / (a + b + EPS); } return D; }
    // Generator objective with D held frozen: J = ∫ p_g(x;μ,σ) · log D(x) dx (the non-saturating "fool D" goal).
    function objective(mu, sig, D) { let J = 0; for (let i = 0; i <= NX; i++) J += gauss(xs[i], mu, sig) * Math.log(D[i] + EPS) * dx; return J; }
    function step() {
      const D = frozenD(), h = 0.04;                          // train D to its optimum, then one gradient step for G
      const dMu = (objective(muG + h, sigG, D) - objective(muG - h, sigG, D)) / (2 * h);
      const dSig = (objective(muG, sigG + h, D) - objective(muG, sigG - h, D)) / (2 * h);
      muG += lr * dMu; sigG += lr * dSig;
      sigG = Math.max(0.28, Math.min(3, sigG)); muG = Math.max(XMIN + 0.5, Math.min(XMAX - 0.5, muG));
      iter++;
    }
    function jsd() {                                          // Jensen–Shannon divergence (nats), 0 = perfect match
      let k1 = 0, k2 = 0;
      for (let i = 0; i <= NX; i++) { const a = pdata(xs[i]), b = gauss(xs[i], muG, sigG), m = 0.5 * (a + b) + EPS; if (a > EPS) k1 += a * Math.log(a / m) * dx; if (b > EPS) k2 += b * Math.log(b / m) * dx; }
      return Math.max(0, 0.5 * k1 + 0.5 * k2);
    }
    function setPlay(v) { playing = v; if (playBtn) { playBtn.innerHTML = v ? '⏸ Pause' : '▶ Play'; playBtn.classList.toggle('active', v); } }
    function reset() { muG = START.mu; sigG = START.sig; iter = 0; setPlay(false); draw(); }

    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const dens = []; let ymax = 0;
      for (let i = 0; i <= NX; i++) { const a = pdata(xs[i]), b = gauss(xs[i], muG, sigG); dens.push([a, b]); if (a > ymax) ymax = a; if (b > ymax) ymax = b; }
      ymax = (ymax || 1) * 1.18;
      const X = x => padL + ((x - XMIN) / (XMAX - XMIN)) * (W - padL - padR);
      const Yd = v => (H - padB) - (v / ymax) * (H - padT - padB);
      const YD = d => (H - padB) - d * (H - padT - padB);     // D ∈ [0,1] across full plot height
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.save(); ctx.strokeStyle = p.mute; ctx.setLineDash([3, 4]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, YD(0.5)); ctx.lineTo(W - padR, YD(0.5)); ctx.stroke(); ctx.restore();
      ctx.fillStyle = p.mute; ctx.font = '9px ' + MONO; ctx.textAlign = 'left'; ctx.fillText('D=0.5', W - padR - 40, YD(0.5) - 4);
      function fillCurve(idx, color) {
        ctx.beginPath(); ctx.moveTo(X(xs[0]), H - padB);
        for (let i = 0; i <= NX; i++) ctx.lineTo(X(xs[i]), Yd(dens[i][idx]));
        ctx.lineTo(X(xs[NX]), H - padB); ctx.closePath();
        ctx.fillStyle = color; ctx.globalAlpha = 0.30; ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i <= NX; i++) { const px = X(xs[i]), py = Yd(dens[i][idx]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      }
      fillCurve(0, p.sage);                                   // real data
      fillCurve(1, p.rust);                                   // generator
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= NX; i++) { const a = dens[i][0], b = dens[i][1], d = a / (a + b + EPS); const px = X(xs[i]), py = YD(d); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let x = -6; x <= 6; x += 2) ctx.fillText(x, X(x), H - padB + 14);
      ctx.textAlign = 'left'; ctx.font = '600 11px ' + MONO;
      ctx.fillStyle = p.sage; ctx.fillText('■ real', padL + 4, padT - 8);
      ctx.fillStyle = p.rust; ctx.fillText('■ generator', padL + 62, padT - 8);
      ctx.fillStyle = p.violet; ctx.fillText('— D(x)=P(real)', padL + 168, padT - 8);
      ctx.fillStyle = p.mute; ctx.textAlign = 'right'; ctx.fillText('iter ' + iter, W - padR - 2, padT - 8);
      const J = jsd();
      let msg = `<b>Generator</b> N(μ=${muG.toFixed(2)}, σ=${sigG.toFixed(2)}). <b>Jensen–Shannon divergence</b> = <b>${J.toFixed(3)}</b> nats (the quantity the game minimizes; 0 = indistinguishable). `;
      if (mode === 'single') {
        msg += J < 0.01
          ? `<span style="color:${p.sage}">Equilibrium reached:</span> the generator sits on the real data and <b>D(x) ≈ 0.5 everywhere</b> — the discriminator is reduced to a coin flip. This is the global optimum where p_g = p_data.`
          : `The discriminator (purple) still tells them apart — D ≈ 1 over real-only regions, D ≈ 0 over fake-only regions. Each step the generator climbs the gradient of "fool D," sliding toward the data.`;
      } else {
        msg += `<span style="color:${p.rust}">⚠ Mode collapse:</span> a single-Gaussian generator can cover only <b>one</b> of the two real modes, so JS divergence stalls (it can't reach 0). D(x) stays near 1 over the abandoned mode — those real samples are never imitated. Real GANs hit this too; remedies include minibatch discrimination, unrolled GANs, and the Wasserstein objective.`;
      }
      info.innerHTML = msg;
    }

    playBtn = button(ctl, '▶ Play', function () { setPlay(!playing); }, '');
    button(ctl, 'Step', function () { setPlay(false); step(); draw(); });
    button(ctl, 'Reset', reset);
    select(ctl, { label: 'real data', value: mode, options: [{ value: 'single', label: 'one mode' }, { value: 'two', label: 'two modes (collapse)' }], onChange: v => { mode = v; reset(); } });
    slider(ctl, { label: 'learning rate', min: 0.1, max: 1.0, step: 0.05, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'GAN training visualizer: a green curve is the real data density, an orange curve is the generator density, and a purple curve is the optimal discriminator D(x) = probability a point is real. Pressing play steps the adversarial game so the generator distribution converges onto the real one and D flattens to 0.5; a two-mode setting demonstrates mode collapse.');
    draw();                                                   // synchronous first paint
    loop(function () { if (playing) { frame++; if (frame % 8 === 0) { step(); draw(); if (mode === 'single' && jsd() < 0.004) setPlay(false); } } });
  });

  /* ========================================================
     44. Graph traversal: BFS (queue) vs DFS (stack) (Algorithms)
     ===================================================== */
  register({ id: 'algo-graph-traversal', topic: 'algorithms', title: 'Graph Traversal: BFS vs DFS', blurb: 'Press play and watch a graph get explored. BFS rides a queue and fans out in rings (shortest paths in an unweighted graph); DFS rides a stack and plunges deep down one branch before backtracking. Click any node to start from there.' },
  function (root) {
    const W = 560, H = 380, MONO = "JetBrains Mono, monospace";
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    // hand-placed graph: branching + cycles so BFS and DFS visibly differ
    const RX = [0.06, 0.28, 0.28, 0.28, 0.52, 0.52, 0.52, 0.76, 0.76];
    const RY = [0.50, 0.18, 0.52, 0.85, 0.10, 0.45, 0.80, 0.28, 0.63];
    const LBL = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const EDGES = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 7], [5, 7], [5, 8], [6, 8], [7, 8]];
    const N = RX.length;
    const adj = Array.from({ length: N }, () => []);
    EDGES.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u); });
    adj.forEach(a => a.sort((x, y) => x - y));
    const gx0 = 34, gy0 = 26, gw = W - 68, gh = 232;
    const NX = i => gx0 + RX[i] * gw, NY = i => gy0 + RY[i] * gh, RAD = 16;

    let mode = 'bfs', start = 0, playing = false, frame = 0, playBtn = null;
    let discovered, visited, order, frontier, current, treeEdge, counter, done;
    function reset() {
      discovered = new Set([start]); visited = new Set(); order = {};
      frontier = [start]; current = null; treeEdge = new Set(); counter = 0; done = false;
      setPlay(false); draw();
    }
    function step() {
      if (!frontier.length) { done = true; current = null; return; }
      const node = mode === 'bfs' ? frontier.shift() : frontier.pop();   // queue (FIFO) vs stack (LIFO)
      current = node; visited.add(node); order[node] = ++counter;
      adj[node].forEach(nb => { if (!discovered.has(nb)) { discovered.add(nb); frontier.push(nb); treeEdge.add(node < nb ? node + "-" + nb : nb + "-" + node); } });
      if (!frontier.length) done = true;
    }
    function setPlay(v) { playing = v; if (playBtn) { playBtn.innerHTML = v ? '⏸ Pause' : '▶ Play'; playBtn.classList.toggle('active', v); } }

    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // edges (discovery-tree edges highlighted)
      EDGES.forEach(([u, v]) => {
        const key = u < v ? u + "-" + v : v + "-" + u, tree = treeEdge.has(key);
        ctx.strokeStyle = tree ? p.sage : p.line; ctx.lineWidth = tree ? 3 : 1.5;
        ctx.beginPath(); ctx.moveTo(NX(u), NY(u)); ctx.lineTo(NX(v), NY(v)); ctx.stroke();
      });
      // nodes
      for (let i = 0; i < N; i++) {
        const x = NX(i), y = NY(i);
        let fill = p.panel2, ring = p.mute, txt = p.soft;
        if (i === current) { fill = p.rust; ring = p.rust; txt = '#fff'; }
        else if (visited.has(i)) { fill = p.sage; ring = p.sage; txt = '#1a1a1a'; }
        else if (discovered.has(i)) { fill = 'transparent'; ring = p.gold; txt = p.gold; }
        ctx.lineWidth = 2.5; ctx.strokeStyle = ring; ctx.fillStyle = fill === 'transparent' ? p.bg : fill;
        ctx.beginPath(); ctx.arc(x, y, RAD, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = txt; ctx.font = '600 13px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(LBL[i], x, y);
        if (order[i]) { ctx.fillStyle = p.ink; ctx.font = '600 10px ' + MONO; ctx.fillText('#' + order[i], x, y + RAD + 9); }
      }
      ctx.textBaseline = 'alphabetic';
      // frontier row
      const fy = H - 70, isQ = mode === 'bfs';
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText(isQ ? 'QUEUE (FIFO) — take from front →' : 'STACK (LIFO) — take from top →', gx0, fy - 8);
      const bw = 30, bh = 26;
      frontier.forEach((nd, k) => {
        const bx = gx0 + k * (bw + 6);
        // the "next to be taken" cell: front for BFS (k=0), back for DFS (last)
        const next = isQ ? (k === 0) : (k === frontier.length - 1);
        ctx.fillStyle = next ? p.gold : p.panel2; ctx.strokeStyle = next ? p.gold : p.line; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.rect(bx, fy, bw, bh); ctx.fill(); ctx.stroke();
        ctx.fillStyle = next ? '#1a1a1a' : p.soft; ctx.font = '600 13px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(LBL[nd], bx + bw / 2, fy + bh / 2);
      });
      ctx.textBaseline = 'alphabetic';
      if (!frontier.length) { ctx.fillStyle = p.mute; ctx.font = 'italic 12px ' + MONO; ctx.textAlign = 'left'; ctx.fillText(done ? '(empty — traversal complete)' : '(empty)', gx0, fy + 18); }
      // legend
      ctx.font = '10px ' + MONO; ctx.textAlign = 'right';
      ctx.fillStyle = p.gold; ctx.fillText('● discovered', W - 8, 18);
      ctx.fillStyle = p.rust; ctx.fillText('● current', W - 8, 32);
      ctx.fillStyle = p.sage; ctx.fillText('● visited', W - 8, 46);
      // note
      const seq = Object.keys(order).sort((a, b) => order[a] - order[b]).map(i => LBL[i]).join(" → ");
      let msg = `<b>${mode.toUpperCase()}</b> from <b>${LBL[start]}</b> — visited <b>${visited.size}/${N}</b>${seq ? `, order: ${seq}` : ""}. `;
      msg += isQ
        ? `A <b>queue</b> finishes every node at distance <i>k</i> before any at <i>k+1</i>, so BFS fans out in rings and finds <b>shortest paths</b> in an unweighted graph.`
        : `A <b>stack</b> always expands the most-recently-found node, so DFS <b>plunges deep</b> down one branch and backtracks only when stuck — the natural fit for recursion, cycle detection, and topological sort.`;
      info.innerHTML = msg;
    }

    c.addEventListener('click', ev => {
      const pt = pointer(c, W, H, ev);
      for (let i = 0; i < N; i++) { const dx = pt.x - NX(i), dy = pt.y - NY(i); if (dx * dx + dy * dy <= (RAD + 4) * (RAD + 4)) { start = i; reset(); return; } }
    });
    playBtn = button(ctl, '▶ Play', function () { if (done) reset(); setPlay(!playing); });
    button(ctl, 'Step', function () { setPlay(false); if (done) reset(); step(); draw(); });
    button(ctl, 'Reset', reset);
    select(ctl, { label: 'algorithm', value: mode, options: [{ value: 'bfs', label: 'BFS (queue)' }, { value: 'dfs', label: 'DFS (stack)' }], onChange: v => { mode = v; reset(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Graph traversal visualizer: a 9-node graph (A–I) explored by breadth-first search using a queue or depth-first search using a stack. Nodes are colored by state (discovered, current, visited), numbered in visit order, with the queue/stack contents shown below. Click a node to start from it.');
    reset();                                                  // synchronous first paint
    loop(function () { if (playing && !done) { frame++; if (frame % 9 === 0) { step(); draw(); if (done) setPlay(false); } } });
  });

  /* ========================================================
     45. Fundamental Theorem of Calculus: the accumulation function (Calculus)
     ===================================================== */
  register({ id: 'calc-ftc-accumulation', topic: 'calculus', title: 'The Fundamental Theorem: Area Accumulates', blurb: 'Sweep x and watch the signed area under f pile up into the accumulation function A(x)=∫f. Where f is tall, A climbs fast; where f=0, A is flat; where f<0, A falls. The slope of A is exactly f — that is the Fundamental Theorem of Calculus, made visible.' },
  function (root) {
    const W = 560, H = 408, padL = 44, padR = 16, MONO = "JetBrains Mono, monospace";
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const A0 = -3.5, B0 = 3.5, N = 280, dx = (B0 - A0) / N;
    const FNS = {
      hump: { label: 'a bump  f(x)=3e^(−x²)', f: x => 3 * Math.exp(-x * x) },
      sine: { label: 'a wave  f(x)=2 sin x', f: x => 2 * Math.sin(x) },
      line: { label: 'a line  f(x)=x', f: x => x }
    };
    let key = 'hump', xi = Math.round((0 - A0) / dx), playing = false, frame = 0, playBtn = null;
    let fv = [], cum = [];
    function rebuild() {
      const f = FNS[key].f; fv = []; cum = [];
      for (let i = 0; i <= N; i++) fv.push(f(A0 + i * dx));
      cum[0] = 0;
      for (let i = 1; i <= N; i++) cum[i] = cum[i - 1] + (fv[i - 1] + fv[i]) / 2 * dx;   // cumulative trapezoid = ∫ from A0
    }
    function setPlay(v) { playing = v; if (playBtn) { playBtn.innerHTML = v ? '⏸ Pause' : '▶ Play'; playBtn.classList.toggle('active', v); } }

    // panel geometry
    const plotW = W - padL - padR;
    const tT = 30, tB = 188, bT = 232, bB = H - 30;            // top panel [tT,tB], bottom [bT,bB]
    const Xpx = x => padL + (x - A0) / (B0 - A0) * plotW;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const x = A0 + xi * dx, fx = fv[xi], Ax = cum[xi];
      let fmax = 0; for (let i = 0; i <= N; i++) fmax = Math.max(fmax, Math.abs(fv[i])); fmax = (fmax || 1) * 1.18;
      let amin = Math.min.apply(null, cum), amax = Math.max.apply(null, cum); const apad = (amax - amin) * 0.12 || 1; amin -= apad; amax += apad;
      const Fpx = v => (tT + tB) / 2 - (v / fmax) * ((tB - tT) / 2);   // f-panel: zero line at vertical center
      const Apx = v => bB - (v - amin) / (amax - amin) * (bB - bT);
      // ---- top panel: f(t) with signed area [A0, x] ----
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('f(t) — the integrand', padL, tT - 12);
      // shaded area up to x (green where f>0, rust where f<0)
      for (let i = 0; i < xi; i++) {
        const x0 = Xpx(A0 + i * dx), x1 = Xpx(A0 + (i + 1) * dx), y0 = Fpx(fv[i]), y1 = Fpx(fv[i + 1]), zero = Fpx(0);
        ctx.beginPath(); ctx.moveTo(x0, zero); ctx.lineTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1, zero); ctx.closePath();
        const pos = (fv[i] + fv[i + 1]) >= 0;
        ctx.fillStyle = pos ? p.sage : p.rust; ctx.globalAlpha = 0.34; ctx.fill(); ctx.globalAlpha = 1;
      }
      // zero axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Fpx(0)); ctx.lineTo(W - padR, Fpx(0)); ctx.stroke();
      // f curve
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let i = 0; i <= N; i++) { const px = Xpx(A0 + i * dx), py = Fpx(fv[i]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      // sweep line + point (x, f(x))
      ctx.strokeStyle = p.violet; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(Xpx(x), tT - 4); ctx.lineTo(Xpx(x), bB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(Xpx(x), Fpx(fx), 4, 0, 7); ctx.fill();
      ctx.fillStyle = p.soft; ctx.font = '10px ' + MONO; ctx.textAlign = 'center'; ctx.fillText('f(x)=' + fx.toFixed(2), Xpx(x), Fpx(fx) - 8);
      // ---- bottom panel: A(x) = accumulated area ----
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('A(x) = ∫ from −3.5 to x of f  (signed area so far)', padL, bT - 12);
      if (amin < 0 && amax > 0) { ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Apx(0)); ctx.lineTo(W - padR, Apx(0)); ctx.stroke(); }
      // full A curve (faint), then solid up to x
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.4; ctx.beginPath();
      for (let i = 0; i <= N; i++) { const px = Xpx(A0 + i * dx), py = Apx(cum[i]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2.6; ctx.beginPath();
      for (let i = 0; i <= xi; i++) { const px = Xpx(A0 + i * dx), py = Apx(cum[i]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      // tangent to A at x with slope = f(x)  (the FTC: A'(x)=f(x))
      const hpx = 46, hdat = hpx / plotW * (B0 - A0);
      const x1d = x - hdat, x2d = x + hdat, y1d = Ax - fx * hdat, y2d = Ax + fx * hdat;
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(Xpx(x1d), Apx(y1d)); ctx.lineTo(Xpx(x2d), Apx(y2d)); ctx.stroke();
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(Xpx(x), Apx(Ax), 4.5, 0, 7); ctx.fill();
      ctx.fillStyle = p.rust; ctx.font = '10px ' + MONO; ctx.textAlign = 'left'; ctx.fillText("slope = f(x) = " + fx.toFixed(2), Xpx(x) + 8, Apx(Ax) - 6);
      // x-axis ticks (bottom)
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let t = -3; t <= 3; t++) ctx.fillText(t, Xpx(t), bB + 14);
      // note
      const trend = Math.abs(fx) < 0.12 ? `<b>f(x)≈0</b>, so A is momentarily <b>flat</b> — a turning point of the area` : (fx > 0 ? `<b>f(x)>0</b>, so area is being <b>added</b> and A <b>rises</b>` : `<b>f(x)<0</b>, so area is <b>subtracted</b> and A <b>falls</b>`);
      info.innerHTML = `At x = <b>${x.toFixed(2)}</b>: the accumulated signed area is A(x) = <b>${Ax.toFixed(2)}</b>. ${trend}. The red line is the <b>slope of A</b>, and it always equals the <b>height f(x)</b> of the top curve — that is the <b>Fundamental Theorem</b>: A′(x) = f(x), so differentiating the area-so-far gives back the integrand. Integration and differentiation are inverses.`;
    }
    playBtn = button(ctl, '▶ Play', function () { if (xi >= N) xi = 0; setPlay(!playing); draw(); });
    const xslider = slider(ctl, { label: 'sweep x', min: A0, max: B0, step: dx, value: A0 + xi * dx, fmt: v => 'x=' + v.toFixed(2), onInput: v => { xi = Math.max(0, Math.min(N, Math.round((v - A0) / dx))); setPlay(false); draw(); } });
    select(ctl, { label: 'integrand', value: key, options: Object.keys(FNS).map(k => ({ value: k, label: FNS[k].label })), onChange: v => { key = v; rebuild(); setPlay(false); draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Fundamental Theorem of Calculus visualizer: the top panel plots an integrand f with the signed area from the left endpoint up to a sweeping point x shaded; the bottom panel plots the accumulation function A(x), the running integral. A tangent line on A shows its slope always equals f(x), illustrating A prime of x equals f(x).');
    rebuild();
    draw();                                                   // synchronous first paint
    loop(function () { if (playing) { frame++; if (frame % 2 === 0) { xi += 1; if (xi >= N) { xi = N; setPlay(false); } if (xslider) xslider.value = (A0 + xi * dx).toFixed(3); draw(); } } });
  });

  /* ========================================================
     46. Orthogonal projection onto a line — least-squares geometry (Linear Algebra)
     ===================================================== */
  register({ id: 'la-projection', topic: 'linear-algebra', title: 'Orthogonal Projection: the Closest Point', blurb: 'Drag the target vector b and watch its shadow p land on the line — the closest point to b. The error e = b − p always meets the line at a right angle (aᵀe = 0, the normal equation). This perpendicular drop is the geometry behind least squares and linear regression.' },
  function (root) {
    const W = 520, H = 380, MONO = "JetBrains Mono, monospace";
    const { c, ctx } = canvas(root, W, H);
    const info = note(root);
    const Ox = 200, Oy = 250, s = 46;                          // origin + pixels-per-unit
    let bx = 2.3, by = 2.5, theta = 0.38, drag = null;        // b vector + line angle
    const PX = (x, y) => [Ox + x * s, Oy - y * s];            // data -> pixel
    const aVec = () => [Math.cos(theta), Math.sin(theta)];
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const [ax, ay] = aVec();
      const dot = bx * ax + by * ay;                           // a·b (a is unit) = projection length
      const px = dot * ax, py = dot * ay;                      // projection point p
      const ex = bx - px, ey = by - py;                        // residual e = b - p (⊥ to line)
      // light grid
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
      for (let gx = -3; gx <= 5; gx++) { ctx.beginPath(); ctx.moveTo(PX(gx, -3)[0], PX(gx, -3)[1]); ctx.lineTo(PX(gx, 4)[0], PX(gx, 4)[1]); ctx.stroke(); }
      for (let gy = -3; gy <= 4; gy++) { ctx.beginPath(); ctx.moveTo(PX(-3, gy)[0], PX(-3, gy)[1]); ctx.lineTo(PX(5, gy)[0], PX(5, gy)[1]); ctx.stroke(); }
      ctx.globalAlpha = 1;
      // the line (subspace) through origin, both directions
      const L = 6; ctx.strokeStyle = p.soft; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(PX(-L * ax, -L * ay)[0], PX(-L * ax, -L * ay)[1]); ctx.lineTo(PX(L * ax, L * ay)[0], PX(L * ax, L * ay)[1]); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('line = span(a)', PX(L * ax, L * ay)[0] - 90, PX(L * ax, L * ay)[1] - 8);
      // residual e (p -> b), dashed, with right-angle marker at p
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(PX(px, py)[0], PX(px, py)[1]); ctx.lineTo(PX(bx, by)[0], PX(bx, by)[1]); ctx.stroke(); ctx.setLineDash([]);
      // right-angle square at p
      const u = 0.32, sq1 = [px + u * ax, py + u * ay], en = Math.hypot(ex, ey) || 1, sq2 = [px + u * ex / en, py + u * ey / en], sq3 = [sq1[0] + u * ex / en, sq1[1] + u * ey / en];
      ctx.strokeStyle = p.rust; ctx.lineWidth = 1.4; ctx.beginPath();
      ctx.moveTo(PX(sq1[0], sq1[1])[0], PX(sq1[0], sq1[1])[1]); ctx.lineTo(PX(sq3[0], sq3[1])[0], PX(sq3[0], sq3[1])[1]); ctx.lineTo(PX(sq2[0], sq2[1])[0], PX(sq2[0], sq2[1])[1]); ctx.stroke();
      // projection p (sage arrow along the line)
      arrow(ctx, ...PX(0, 0), ...PX(px, py), p.sage, 3);
      // target b (gold arrow)
      arrow(ctx, ...PX(0, 0), ...PX(bx, by), p.gold, 3);
      // draggable handles
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(...PX(bx, by), 7, 0, 7); ctx.fill();
      ctx.fillStyle = p.ink; ctx.font = '600 12px ' + MONO; ctx.textAlign = 'left';
      ctx.fillText('b', PX(bx, by)[0] + 10, PX(bx, by)[1] - 6);
      ctx.fillStyle = p.sage; ctx.fillText('p', PX(px, py)[0] + 8, PX(px, py)[1] + 16);
      // a-direction handle (drag to rotate the line)
      const ah = [2.6 * ax, 2.6 * ay];
      ctx.strokeStyle = p.violet; ctx.fillStyle = p.violet; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(...PX(ah[0], ah[1]), 6, 0, 7); ctx.stroke();
      ctx.fillStyle = p.violet; ctx.font = '10px ' + MONO; ctx.fillText('drag to tilt', PX(ah[0], ah[1])[0] + 9, PX(ah[0], ah[1])[1] + 4);
      // origin dot
      ctx.fillStyle = p.mute; ctx.beginPath(); ctx.arc(Ox, Oy, 3, 0, 7); ctx.fill();
      // readout
      const elen = Math.hypot(ex, ey), aDotE = ax * ex + ay * ey;
      info.innerHTML = `<b style="color:${p.gold}">b</b> = (${bx.toFixed(2)}, ${by.toFixed(2)}). Its projection <b style="color:${p.sage}">p</b> = (aᵀb)a = (${px.toFixed(2)}, ${py.toFixed(2)}) is the <b>closest point on the line to b</b> — that minimization is exactly least squares. The error <b style="color:${p.rust}">e = b − p</b> has length ${elen.toFixed(2)} and is <b>perpendicular</b> to the line: aᵀe = ${aDotE.toFixed(3)} ≈ 0, the <b>normal equation</b>. Drag <b>b</b> (or tilt the line): p slides to stay directly under b and the right angle never breaks.`;
    }
    function hit(mx, my, dx, dy) { const [hx, hy] = PX(dx, dy); return (mx - hx) * (mx - hx) + (my - hy) * (my - hy) <= 196; }
    function down(ev) { ev.preventDefault(); const q = pointer(c, W, H, ev); const [ax, ay] = aVec(); if (hit(q.x, q.y, bx, by)) drag = 'b'; else if (hit(q.x, q.y, 2.6 * ax, 2.6 * ay)) drag = 'a'; }
    function move(ev) {
      if (!drag) return; ev.preventDefault(); const q = pointer(c, W, H, ev);
      const dx = (q.x - Ox) / s, dy = -(q.y - Oy) / s;
      if (drag === 'b') { bx = Math.max(-3, Math.min(5, dx)); by = Math.max(-3, Math.min(4, dy)); }
      else { theta = Math.atan2(dy, dx); }
      draw();
    }
    function up() { drag = null; }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Orthogonal projection visualizer: a target vector b, a line through the origin spanned by a, and the projection p of b onto the line (the closest point), with the residual e = b − p drawn perpendicular to the line. Drag b or tilt the line to see p track b while the right angle is preserved. Focus this canvas and use the arrow keys to move the target vector b.');
    // keyboard a11y: arrows move b (stored as scalars bx/by) — a getter/setter wrapper keeps the same clamp as dragging
    dragKeys(c, () => [{ get x() { return bx; }, set x(v) { bx = Math.max(-3, Math.min(5, v)); }, get y() { return by; }, set y(v) { by = Math.max(-3, Math.min(4, v)); } }], draw);
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     47. Hash tables: buckets, collisions & load factor (Algorithms)
     ===================================================== */
  register({ id: 'algo-hashing', topic: 'algorithms', title: 'Hash Tables: Collisions & Load Factor', blurb: 'Insert keys and watch them scatter into buckets by h(k)=k mod m. As the load factor α=n/m climbs, collisions pile up and chains grow — see why a good hash plus a low α keeps lookups O(1) on average, and why real tables resize.' },
  function (root) {
    const W = 560, H = 420, MONO = "JetBrains Mono, monospace";
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let m = 11, buckets = [], n = 0, last = null, found = null;
    function reset() { buckets = []; for (let i = 0; i < m; i++) buckets.push([]); n = 0; last = null; found = null; }
    function insert(key) { const h = ((key % m) + m) % m; buckets[h].push(key); n++; last = { h: h, i: buckets[h].length - 1 }; found = null; }
    function insertRandom(k) { for (let j = 0; j < (k || 1); j++) insert(1 + Math.floor(Math.random() * 98)); }
    function findRandom() {
      if (!n) return;
      const all = []; buckets.forEach((b, h) => b.forEach((k, i) => all.push({ k: k, h: h, i: i })));
      const pick = all[Math.floor(Math.random() * all.length)];
      found = { h: pick.h, i: pick.i, key: pick.k, comps: pick.i + 1 }; last = null;
    }
    const padL = 46, padT = 24, padB = 14, cellW = 30, cellH = 20, gap = 5;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const rowH = (H - padT - padB) / m;
      ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left';
      ctx.fillStyle = p.mute; ctx.fillText('bucket  h(k)=k mod ' + m + '   →   chain of keys', padL - 38, padT - 9);
      for (let i = 0; i < m; i++) {
        const y = padT + i * rowH + rowH / 2;
        // index label + slot box
        ctx.fillStyle = p.soft; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText('[' + i + ']', padL - 8, y);
        ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - 12, y); ctx.globalAlpha = 0.35; ctx.stroke(); ctx.globalAlpha = 1;
        const chain = buckets[i], len = chain.length;
        const sev = len >= 3 ? p.rust : len === 2 ? p.gold : p.sage;
        const maxCells = Math.floor((W - padL - 14) / (cellW + gap));
        for (let j = 0; j < len && j < maxCells; j++) {
          const x = padL + 4 + j * (cellW + gap);
          const isLast = last && last.h === i && last.i === j, isFound = found && found.h === i && found.i === j;
          ctx.fillStyle = sev; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.rect(x, y - cellH / 2, cellW, cellH); ctx.fill(); ctx.globalAlpha = 1;
          if (isLast || isFound) { ctx.strokeStyle = isFound ? p.violet : p.ink; ctx.lineWidth = 2.4; ctx.strokeRect(x - 1, y - cellH / 2 - 1, cellW + 2, cellH + 2); }
          ctx.fillStyle = '#1a1a1a'; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'center';
          ctx.fillText(chain[j], x + cellW / 2, y + 1);
        }
        if (len > maxCells) { ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.fillText('+' + (len - maxCells), padL + 4 + maxCells * (cellW + gap), y); }
      }
      ctx.textBaseline = 'alphabetic';
      const alpha = n / m, maxChain = buckets.reduce((a, b) => Math.max(a, b.length), 0), expComp = 1 + alpha / 2;
      let msg = `<b>n=${n}</b> keys in <b>m=${m}</b> buckets · <b>load factor α = n/m = ${alpha.toFixed(2)}</b>. Average chain length is α; the longest chain here is <b>${maxChain}</b>. Expected comparisons for a successful lookup ≈ 1 + α/2 = <b>${expComp.toFixed(2)}</b>. With a good hash and α kept low (real tables resize when α exceeds ~0.75), lookups stay <b>O(1)</b> on average; let α grow and the chains — and lookup time — grow with it (O(1+α)).`;
      if (found) msg += ` <span style="color:${P().violet}">Found key ${found.key} in bucket ${found.h} after ${found.comps} comparison${found.comps === 1 ? "" : "s"}.</span>`;
      info.innerHTML = msg;
    }
    button(ctl, '+1 key', function () { insertRandom(1); draw(); });
    button(ctl, '+8 keys', function () { insertRandom(8); draw(); });
    button(ctl, 'Find a key', function () { findRandom(); draw(); });
    button(ctl, 'Reset', function () { reset(); draw(); });
    slider(ctl, { label: 'table size m', min: 5, max: 15, step: 2, value: m, fmt: v => 'm=' + v, onInput: v => { m = v; reset(); draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Hash table visualizer: m buckets shown as rows; inserted keys are placed by h(k) = k mod m and chained within their bucket, colored by chain length. Buttons insert keys and run a lookup; a slider sets the table size. The note reports the load factor and expected lookup cost.');
    reset(); insertRandom(9);                                  // seed a few keys so the first paint is populated
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     48. Binary vs linear search — O(log n) vs O(n) race (Algorithms)
     ===================================================== */
  register({ id: 'algo-binary-search', topic: 'algorithms', title: 'Binary vs Linear Search: O(log n) vs O(n)', blurb: 'Race binary search against linear search on the same sorted array. Binary halves the window every comparison and homes in within a handful of steps; linear scans one cell at a time. Watch the gap — then imagine it on a million items.' },
  function (root) {
    const W = 560, H = 300, MONO = "JetBrains Mono, monospace", N = 21;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const vals = []; for (let i = 0; i < N; i++) vals.push(3 + i * 2);   // sorted: 3,5,7,…,43
    let target = vals[10], playing = false, frame = 0, playBtn = null;
    let blo, bhi, bmid, bComps, bFound, bDone, lptr, lComps, lFound, lDone, lastBmsg;
    function reset(newTarget) {
      if (newTarget) target = vals[Math.floor(Math.random() * N)];
      blo = 0; bhi = N - 1; bmid = (blo + bhi) >> 1; bComps = 0; bFound = -1; bDone = false; lastBmsg = "";
      lptr = 0; lComps = 0; lFound = -1; lDone = false; setPlay(false);
    }
    function stepBinary() {
      if (bDone) return;
      bmid = (blo + bhi) >> 1; bComps++;
      if (vals[bmid] === target) { bFound = bmid; bDone = true; lastBmsg = vals[bmid] + " = " + target + " → found!"; }
      else if (vals[bmid] < target) { lastBmsg = vals[bmid] + " < " + target + " → search right half"; blo = bmid + 1; }
      else { lastBmsg = vals[bmid] + " > " + target + " → search left half"; bhi = bmid - 1; }
      if (blo > bhi && bFound < 0) bDone = true;
    }
    function stepLinear() {
      if (lDone) return;
      lComps++;
      if (vals[lptr] === target) { lFound = lptr; lDone = true; }
      else if (lptr >= N - 1) lDone = true;
      else lptr++;
    }
    function step() { stepBinary(); stepLinear(); }
    function setPlay(v) { playing = v; if (playBtn) { playBtn.innerHTML = v ? '⏸ Pause' : '▶ Play'; playBtn.classList.toggle('active', v); } }

    const padX = 18, cw = (W - 2 * padX) / N, ch = 30;
    function drawRow(y, label, comps, classify) {
      const p = P();
      ctx.fillStyle = p.mute; ctx.font = '600 11px ' + MONO; ctx.textAlign = 'left'; ctx.fillText(label, padX, y - 8);
      ctx.textAlign = 'right'; ctx.fillStyle = p.soft; ctx.fillText(comps + " comparison" + (comps === 1 ? "" : "s"), W - padX, y - 8);
      for (let i = 0; i < N; i++) {
        const x = padX + i * cw, st = classify(i);
        let bg = p.panel2, fg = p.soft, bd = p.line;
        if (st === "found") { bg = p.sage; fg = "#16210f"; bd = p.sage; }
        else if (st === "cur") { bg = p.gold; fg = "#1a1a1a"; bd = p.gold; }
        else if (st === "out") { bg = p.bg; fg = p.mute; bd = p.line; }
        ctx.fillStyle = bg; ctx.strokeStyle = bd; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.rect(x + 1.5, y, cw - 3, ch); ctx.fill(); ctx.stroke();
        ctx.fillStyle = fg; ctx.font = '600 10px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(vals[i], x + cw / 2, y + ch / 2);
      }
      ctx.textBaseline = 'alphabetic';
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = p.ink; ctx.font = '600 13px ' + MONO; ctx.textAlign = 'center';
      ctx.fillText("target = " + target, W / 2, 22);
      drawRow(56, "Binary search · O(log n)", bComps, i => {
        if (i === bFound) return "found";
        if (!bDone && i === bmid) return "cur";
        if (i < blo || i > bhi) return "out";
        return "in";
      });
      drawRow(130, "Linear search · O(n)", lComps, i => {
        if (i === lFound) return "found";
        if (!lDone && i === lptr) return "cur";
        if (i < lptr) return "out";
        return "in";
      });
      // binary current-comparison caption
      ctx.fillStyle = p.gold; ctx.font = '11px ' + MONO; ctx.textAlign = 'left';
      if (lastBmsg) ctx.fillText("binary: " + lastBmsg, padX, 186);
      const maxB = Math.ceil(Math.log2(N + 1));
      info.innerHTML = `Searching for <b>${target}</b> in ${N} sorted values. <b style="color:${p.gold}">Binary</b> halves the window each comparison (at most ⌈log₂ n⌉ = <b>${maxB}</b>); <b>linear</b> checks one cell at a time (up to ${N}). ` +
        (bDone && lDone ? `Here: <b style="color:${p.sage}">binary ${bComps}</b> vs <b>linear ${lComps}</b> comparisons. ` : "") +
        `The gap explodes with scale: at a <b>million</b> items, binary needs ~20 comparisons; linear, up to a million.`;
    }
    playBtn = button(ctl, '▶ Play', function () { if (bDone && lDone) reset(false); setPlay(!playing); });
    button(ctl, 'Step', function () { setPlay(false); if (bDone && lDone) reset(false); step(); draw(); });
    button(ctl, 'New target', function () { reset(true); draw(); });
    button(ctl, 'Reset', function () { reset(false); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Search race: a sorted array of 21 values searched by binary search (top row, narrowing a lo–hi window around a highlighted midpoint) and linear search (bottom row, a pointer scanning left to right) for the same target, with a live comparison count for each showing binary finishing in far fewer steps.');
    reset(false);
    draw();                                                    // synchronous first paint
    loop(function () { if (playing && !(bDone && lDone)) { frame++; if (frame % 14 === 0) { step(); draw(); if (bDone && lDone) setPlay(false); } } });
  });

  /* ========================================================
     49. The discount factor γ: geometric decay & effective horizon (RL)
     ===================================================== */
  register({ id: 'rl-discounting', topic: 'reinforcement-learning', title: 'The Discount Factor γ: How Far an Agent Looks Ahead', blurb: 'Future reward is worth γ per step less than reward now, so its weight γᵗ decays geometrically. Drag γ and watch the agent’s horizon stretch or shrink — small γ is myopic (only the next reward matters), γ near 1 is far-sighted, and the effective horizon is 1/(1−γ).' },
  function (root) {
    const W = 560, H = 340, MONO = "JetBrains Mono, monospace", N = 24;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let gamma = 0.9;
    const padL = 40, padR = 16, padT = 26, padB = 38;
    const plotW = W - padL - padR, plotH = H - padT - padB, bw = plotW / (N + 1);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // discounted weight of reward at step t is gamma^t (reward = 1 each step)
      const w = []; for (let t = 0; t <= N; t++) w.push(Math.pow(gamma, t));
      const G = gamma >= 1 ? N + 1 : (1 - Math.pow(gamma, N + 1)) / (1 - gamma);   // sum of gamma^t
      const horizon = gamma >= 1 ? Infinity : 1 / (1 - gamma);
      const X = t => padL + t * bw + bw * 0.12, BW = bw * 0.76;
      const Y = v => (H - padB) - v * plotH;                  // weight in [0,1]
      // baseline
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      // effective-horizon marker
      if (horizon <= N + 0.5) {
        const hx = padL + horizon * bw + bw * 0.5;
        ctx.save(); ctx.strokeStyle = p.rust; ctx.lineWidth = 1.4; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(hx, padT - 4); ctx.lineTo(hx, H - padB); ctx.stroke(); ctx.restore();
        ctx.fillStyle = p.rust; ctx.font = '600 10px ' + MONO; ctx.textAlign = 'center';
        ctx.fillText('horizon 1/(1−γ) ≈ ' + horizon.toFixed(1), hx, padT - 8);
      } else {
        ctx.fillStyle = p.rust; ctx.font = '600 10px ' + MONO; ctx.textAlign = 'right';
        ctx.fillText('horizon 1/(1−γ) ≈ ' + (horizon === Infinity ? '∞' : horizon.toFixed(0)) + ' (off-chart)', W - padR, padT - 8);
      }
      // bars: discounted weight gamma^t
      for (let t = 0; t <= N; t++) {
        const x = X(t), y = Y(w[t]);
        ctx.fillStyle = t === 0 ? p.gold : p.sage; ctx.globalAlpha = t === 0 ? 1 : Math.max(0.28, w[t]);
        ctx.fillRect(x, y, BW, (H - padB) - y); ctx.globalAlpha = 1;
      }
      // x-axis ticks
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let t = 0; t <= N; t += 4) ctx.fillText(t, X(t) + BW / 2, H - padB + 14);
      ctx.fillText('future step t →', padL + plotW / 2, H - 6);
      ctx.save(); ctx.translate(12, padT + plotH / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('weight γᵗ', 0, 0); ctx.restore();
      // note
      info.innerHTML = `At <b>γ = ${gamma.toFixed(2)}</b>, a reward <i>t</i> steps away is worth <b>γ<sup>t</sup></b> of one now, so its weight decays geometrically. The total discounted return for a steady reward of 1/step is G = Σ γ<sup>t</sup> ≈ <b>${G.toFixed(2)}</b>, and the <b>effective horizon</b> 1/(1−γ) ≈ <b>${horizon === Infinity ? '∞' : horizon.toFixed(1)}</b> steps — beyond it, rewards barely register. ` +
        (gamma < 0.55 ? `This γ is <b>myopic</b>: the agent chases immediate reward and ignores the long run.` : gamma > 0.93 ? `This γ is <b>far-sighted</b>: distant rewards still matter — patient, but slower and less stable to learn.` : `A middle γ balances immediate and future reward.`);
    }
    slider(ctl, { label: 'discount γ', min: 0, max: 0.99, step: 0.01, value: gamma, fmt: v => 'γ=' + v.toFixed(2), onInput: v => { gamma = v; draw(); } });
    button(ctl, 'myopic (0.5)', function () { gamma = 0.5; draw(); });
    button(ctl, 'far-sighted (0.99)', function () { gamma = 0.99; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Discount factor visualizer: bars show the weight gamma-to-the-t of a reward t steps in the future, decaying geometrically; a dashed marker shows the effective horizon 1/(1-gamma). A slider sets gamma; the note reports the discounted return and horizon.');
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     50. Signal propagation across depth: vanishing / exploding (Deep Learning)
     ===================================================== */
  register({ id: 'dl-signal-propagation', topic: 'deep-learning', title: 'Why Initialization Matters: Signal Across Depth', blurb: 'Each layer multiplies the typical size of the signal by a gain g set by how big the weights are. Drag g: a touch below 1 and the signal vanishes to nothing across depth; a touch above 1 and it explodes. Good initialization (Xavier/He) is the art of keeping g ≈ 1, so the signal — and its gradients — survive deep networks.' },
  function (root) {
    const W = 560, H = 360, MONO = "JetBrains Mono, monospace", L = 24, MAXLOG = 4;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let g = 1.0;
    const padL = 40, padR = 16, padT = 26, padB = 38;
    const plotW = W - padL - padR, plotH = H - padT - padB, midY = padT + plotH / 2, bw = plotW / (L + 1);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // signal RMS after layer i = g^i ; plot log10 from a center baseline (preserved = flat at center)
      // healthy band: |log10(RMS)| <= 1 (within ~10x)
      const bandH = (1 / MAXLOG) * (plotH / 2);
      ctx.fillStyle = p.sage; ctx.globalAlpha = 0.10; ctx.fillRect(padL, midY - bandH, plotW, 2 * bandH); ctx.globalAlpha = 1;
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, midY); ctx.lineTo(W - padR, midY); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '9px ' + MONO; ctx.textAlign = 'left'; ctx.fillText('signal preserved (×1)', padL + 3, midY - 4);
      const lg = Math.log10(g);
      let finalLog = 0;
      for (let i = 0; i <= L; i++) {
        const vlog = i * lg; finalLog = i === L ? vlog : finalLog;
        const cl = Math.max(-1, Math.min(1, vlog / MAXLOG));
        const x = padL + i * bw + bw * 0.12, bwid = bw * 0.76, y = midY - cl * (plotH / 2);
        const danger = Math.abs(vlog) > 2;
        ctx.fillStyle = i === 0 ? p.gold : (danger ? p.rust : p.sage); ctx.globalAlpha = i === 0 ? 1 : 0.9;
        if (y <= midY) ctx.fillRect(x, y, bwid, midY - y); else ctx.fillRect(x, midY, bwid, y - midY);
        ctx.globalAlpha = 1;
      }
      // axis labels
      ctx.fillStyle = p.mute; ctx.font = '10px ' + MONO; ctx.textAlign = 'center';
      for (let i = 0; i <= L; i += 4) ctx.fillText(i, padL + i * bw + bw * 0.5, H - padB + 14);
      ctx.fillText('layer depth →', padL + plotW / 2, H - 6);
      ctx.textAlign = 'right'; ctx.fillStyle = p.rust; ctx.font = '9px ' + MONO;
      ctx.fillText('explode ↑', W - padR, padT + 8); ctx.fillText('vanish ↓', W - padR, H - padB - 4);
      // note
      const finalRMS = Math.pow(g, L);
      const fmt = finalRMS >= 1000 || finalRMS < 0.001 ? finalRMS.toExponential(1) : finalRMS.toFixed(3);
      const verdict = Math.abs(finalLog) < 0.5 ? `<span style="color:${p.sage}">stays healthy</span> — signal and gradients survive all ${L} layers (this is what good init buys you).`
        : (g < 1 ? `<span style="color:${p.rust}">vanishes</span> — by layer ${L} the signal is ×${fmt}, so gradients underflow to ~0 and early layers stop learning.`
          : `<span style="color:${p.rust}">explodes</span> — by layer ${L} the signal is ×${fmt}, so activations and gradients blow up (NaNs).`);
      info.innerHTML = `Per-layer gain <b>g = ${g.toFixed(3)}</b>. After ${L} layers the signal is multiplied by g<sup>${L}</sup> = <b>×${fmt}</b>, so it ${verdict} Because the effect is <b>exponential in depth</b>, even g = 0.9 or 1.1 is fatal deep enough — which is why <b>variance-preserving</b> initialization (Xavier for tanh, He for ReLU) aims for g ≈ 1, and why residual connections and normalization exist to hold it there.`;
    }
    slider(ctl, { label: 'per-layer gain g', min: 0.7, max: 1.4, step: 0.01, value: g, fmt: v => 'g=' + v.toFixed(2), onInput: v => { g = v; draw(); } });
    button(ctl, 'too small (0.85)', function () { g = 0.85; draw(); });
    button(ctl, 'good init (1.0)', function () { g = 1.0; draw(); });
    button(ctl, 'too big (1.15)', function () { g = 1.15; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Signal-propagation visualizer: bars show the log of the activation RMS after each of 24 layers, given a per-layer gain g. At g=1 the bars stay flat on the center line (signal preserved); below 1 they descend (vanishing) and above 1 they rise (exploding), exponentially in depth. A slider sets g.');
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     51. Causal masking: the attention triangle (LLM)
     ===================================================== */
  register({ id: 'llm-causal-mask', topic: 'llm', title: 'Causal Masking: the Attention Triangle', blurb: 'In a decoder LM, token i may attend only to tokens ≤ i — never the future. That mask makes the attention matrix lower-triangular, which is what lets every position train in parallel (teacher forcing) yet generate one token at a time. Toggle the mask and step through generation to see it.' },
  function (root) {
    const W = 520, H = 380, MONO = "JetBrains Mono, monospace";
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const toks = ["The", "cat", "sat", "on", "the", "mat", "."];
    const N = toks.length;
    let masked = true, step = N;                               // step = how many query rows are "generated" so far
    // recency-biased raw scores; weights are softmax over the ALLOWED keys of each row
    function rowWeights(i) {
      const allowed = [], sc = [];
      for (let j = 0; j < N; j++) { if (!masked || j <= i) { allowed.push(j); sc.push(-0.6 * Math.abs(i - j) + (j === i ? 0.4 : 0)); } }
      const m = Math.max.apply(null, sc), e = sc.map(s => Math.exp(s - m)), z = e.reduce((a, b) => a + b, 0);
      const w = {}; allowed.forEach((j, k) => w[j] = e[k] / z);
      return w;
    }
    const gx = 120, gy = 56, cell = 40;                        // grid origin + cell size
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '600 11px ' + MONO; ctx.fillStyle = p.mute;
      ctx.textAlign = 'center'; ctx.fillText('keys (attended-to tokens) →', gx + N * cell / 2, gy - 26);
      // column (key) labels
      ctx.fillStyle = p.soft; ctx.font = '10px ' + MONO;
      for (let j = 0; j < N; j++) { ctx.save(); ctx.translate(gx + j * cell + cell / 2, gy - 6); ctx.rotate(-0.5); ctx.textAlign = 'left'; ctx.fillText(toks[j], 0, 0); ctx.restore(); }
      for (let i = 0; i < N; i++) {
        // row (query) label
        ctx.fillStyle = i < step ? p.soft : p.mute; ctx.font = (i === step - 1 ? '700 ' : '') + '10px ' + MONO; ctx.textAlign = 'right';
        ctx.fillText(toks[i], gx - 8, gy + i * cell + cell / 2 + 4);
        const w = rowWeights(i);
        for (let j = 0; j < N; j++) {
          const x = gx + j * cell, y = gy + i * cell;
          const isMaskedCell = masked && j > i;
          const revealed = i < step;                            // rows beyond the generation step are dim
          if (isMaskedCell) {
            ctx.fillStyle = p.panel2; ctx.globalAlpha = 0.4; ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2); ctx.globalAlpha = 1;
            ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 7, y + 7); ctx.lineTo(x + cell - 7, y + cell - 7); ctx.moveTo(x + cell - 7, y + 7); ctx.lineTo(x + 7, y + cell - 7); ctx.stroke();
          } else {
            const a = (w[j] || 0);
            ctx.fillStyle = p.sage; ctx.globalAlpha = revealed ? Math.max(0.12, a) : 0.08; ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2); ctx.globalAlpha = 1;
          }
          ctx.strokeStyle = (i === step - 1 && !isMaskedCell) ? p.gold : p.line; ctx.lineWidth = (i === step - 1 && !isMaskedCell) ? 2 : 1; ctx.strokeRect(x + 1, y + 1, cell - 2, cell - 2);
        }
      }
      ctx.fillStyle = p.mute; ctx.font = '600 10px ' + MONO; ctx.save(); ctx.translate(gx - 78, gy + N * cell / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('queries (current token) →', 0, 0); ctx.restore();
      const cur = Math.max(0, Math.min(N - 1, step - 1));
      info.innerHTML = masked
        ? `<b>Causal mask ON.</b> The attention matrix is <b>lower-triangular</b>: row <i>i</i> (token "${toks[cur]}") attends only to tokens at positions ≤ <i>i</i> — the ✕ cells (the future) are blocked. Because each row depends only on the past, <b>all rows can be computed at once during training</b> (teacher forcing), while generation fills one row at a time, left to right.`
        : `<b>Causal mask OFF.</b> Every token attends to <b>all</b> tokens, future included (bidirectional, like BERT's encoder). Great for understanding a fixed sentence, but you <b>cannot generate</b> left-to-right with it — predicting the next token would let it peek at the answer.`;
    }
    button(ctl, 'mask: causal', function () { masked = !masked; this.innerHTML = masked ? 'mask: causal' : 'mask: none (BERT)'; draw(); });
    button(ctl, '◀ step', function () { step = Math.max(1, step - 1); draw(); });
    button(ctl, 'step ▶', function () { step = Math.min(N, step + 1); draw(); });
    button(ctl, 'all', function () { step = N; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Causal masking visualizer: a 7×7 attention matrix over tokens; with the causal mask on, cells above the diagonal (future positions) are blocked with an ✕, leaving a lower-triangular pattern of attention weights. A toggle removes the mask (bidirectional), and step buttons reveal query rows one at a time to mimic left-to-right generation.');
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     52. The dot product & angle — a·b = |a||b|cosθ, sign = geometry
     ======================================================== */
  register({ id: 'la-dot-product', topic: 'linear-algebra', title: 'The Dot Product & Angle', blurb: 'Drag two vectors and watch a·b = |a||b|cosθ: positive when the angle is acute, exactly zero at a right angle, negative when obtuse. The shaded bar is b’s scalar projection onto a.' },
  function (root) {
    const W = 540, H = 380, S = 40, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const info = note(root);
    let a = { x: 3, y: 1 }, b = { x: 1, y: 2.5 }, drag = null;
    const toPx = p => ({ x: cx + p.x * S, y: cy - p.y * S });
    const toMath = p => ({ x: (p.x - cx) / S, y: (cy - p.y) / S });
    const near = (mp, vec) => { const q = toPx(vec); return Math.hypot(q.x - mp.x, q.y - mp.y) < 16; };
    function down(ev) { const m = pointer(c, W, H, ev); if (near(m, a)) drag = 'a'; else if (near(m, b)) drag = 'b'; if (drag) ev.preventDefault(); }
    function move(ev) { if (!drag) return; const m = toMath(pointer(c, W, H, ev)); const g = x => Math.round(x * 2) / 2; const t = drag === 'a' ? a : b; t.x = g(m.x); t.y = g(m.y); draw(); ev.preventDefault(); }
    function up() { drag = null; }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    const pre = controls(root);
    button(pre, 'Acute', () => { a = { x: 3, y: 1 }; b = { x: 2, y: 2 }; draw(); });
    button(pre, '⊥ Right angle', () => { a = { x: 3, y: 1 }; b = { x: -1, y: 3 }; draw(); });
    button(pre, 'Obtuse', () => { a = { x: 3, y: 1 }; b = { x: -2, y: 2 }; draw(); });
    button(pre, 'Aligned', () => { a = { x: 3, y: 1 }; b = { x: 1.5, y: 0.5 }; draw(); });
    function fmt(n) { return (Math.round(n * 100) / 100).toString(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let x = cx % S; x < W; x += S) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = cy % S; y < H; y += S) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      const dot = a.x * b.x + a.y * b.y;
      const la = Math.hypot(a.x, a.y), lb = Math.hypot(b.x, b.y);
      const cos = (la > 1e-9 && lb > 1e-9) ? Math.max(-1, Math.min(1, dot / (la * lb))) : 0;
      const deg = Math.round(Math.acos(cos) * 180 / Math.PI);
      const O = toPx({ x: 0, y: 0 }), A = toPx(a), B = toPx(b);
      const sign = Math.abs(dot) < 1e-9 ? 0 : (dot > 0 ? 1 : -1);
      const signCol = sign === 0 ? p.gold : (sign > 0 ? p.sage : p.rust);
      // scalar projection of b onto a: foot = (a·b / |a|²) · a
      if (la > 1e-9) {
        const k = dot / (la * la), foot = toPx({ x: a.x * k, y: a.y * k });
        ctx.setLineDash([4, 4]); ctx.strokeStyle = p.mute; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(foot.x, foot.y); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = signCol; ctx.lineWidth = 6; ctx.globalAlpha = 0.45;
        ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(foot.x, foot.y); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // angle arc between a and b, sampled (math-angle space) so it spans the true angle
      if (la > 1e-9 && lb > 1e-9) {
        const aa = Math.atan2(a.y, a.x), ang = Math.atan2(a.x * b.y - a.y * b.x, dot), r = 30;
        ctx.strokeStyle = signCol; ctx.lineWidth = 2; ctx.beginPath();
        for (let s = 0; s <= 1.0001; s += 0.05) { const d = aa + ang * s, x = O.x + r * Math.cos(d), y = O.y - r * Math.sin(d); s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke();
        if (sign === 0) { ctx.fillStyle = p.gold; ctx.font = '13px ' + (cssVar('--font-mono', 'monospace')); ctx.fillText('⊥', O.x + 36 * Math.cos(aa + ang / 2), O.y - 36 * Math.sin(aa + ang / 2)); }
      }
      arrow(ctx, O.x, O.y, A.x, A.y, p.gold, 3);
      arrow(ctx, O.x, O.y, B.x, B.y, p.sage, 3);
      const kind = sign === 0 ? `<span style="color:${p.gold}">right angle — orthogonal, a·b = 0</span>`
        : sign > 0 ? `<span style="color:${p.sage}">acute — they point the same general way, a·b &gt; 0</span>`
        : `<span style="color:${p.rust}">obtuse — they point apart, a·b &lt; 0</span>`;
      info.innerHTML = `<b style="color:${p.gold}">a</b> = (${a.x}, ${a.y}) &nbsp; <b style="color:${p.sage}">b</b> = (${b.x}, ${b.y})<br>` +
        `a·b = (${a.x})(${b.x}) + (${a.y})(${b.y}) = <b>${fmt(dot)}</b> &nbsp;=&nbsp; |a||b|cosθ = ${fmt(la)}·${fmt(lb)}·${fmt(cos)} &nbsp;·&nbsp; θ = <b>${deg}°</b><br>${kind}`;
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Dot product visualizer: two draggable vectors a and b from the origin, the angle between them, and the scalar projection of b onto a shown as a shaded bar. The dot product is positive for an acute angle, zero at a right angle, and negative for an obtuse angle. Focus this canvas and use the arrow keys to move a, Shift+arrow keys to move b.');
    dragKeys(c, () => [a, b], draw);   // keyboard a11y: arrows move a, Shift+arrows move b
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     57. The determinant as signed area — det = how the unit area scales (sign = orientation)
     ======================================================== */
  register({ id: 'la-determinant', topic: 'linear-algebra', title: 'The Determinant as Signed Area', blurb: 'Drag the two columns of a 2×2 matrix and watch the parallelogram they span: its area is |det|, the sign flips when orientation flips, and it collapses to a line exactly when det = 0 — the matrix is singular (no inverse).' },
  function (root) {
    const W = 540, H = 380, S = 40, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const info = note(root);
    let col1 = { x: 2, y: 1 }, col2 = { x: -1, y: 2 }, drag = null;   // the two columns of M = [col1 | col2]
    const toPx = p => ({ x: cx + p.x * S, y: cy - p.y * S });
    const toMath = p => ({ x: (p.x - cx) / S, y: (cy - p.y) / S });
    const near = (mp, vec) => { const q = toPx(vec); return Math.hypot(q.x - mp.x, q.y - mp.y) < 16; };
    function down(ev) { const m = pointer(c, W, H, ev); if (near(m, col1)) drag = 'c1'; else if (near(m, col2)) drag = 'c2'; if (drag) ev.preventDefault(); }
    function move(ev) { if (!drag) return; const m = toMath(pointer(c, W, H, ev)); const g = x => Math.round(x * 2) / 2; const t = drag === 'c1' ? col1 : col2; t.x = g(m.x); t.y = g(m.y); draw(); ev.preventDefault(); }
    function up() { drag = null; }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    const pre = controls(root);
    button(pre, 'Identity', () => { col1 = { x: 1, y: 0 }; col2 = { x: 0, y: 1 }; draw(); });
    button(pre, 'Shear (area=1)', () => { col1 = { x: 1, y: 0 }; col2 = { x: 1.5, y: 1 }; draw(); });
    button(pre, 'Scale ×2 (area=4)', () => { col1 = { x: 2, y: 0 }; col2 = { x: 0, y: 2 }; draw(); });
    button(pre, 'Reflect (det<0)', () => { col1 = { x: 0, y: 1 }; col2 = { x: 1, y: 0 }; draw(); });
    button(pre, 'Singular (det=0)', () => { col1 = { x: 2, y: 1 }; col2 = { x: 4, y: 2 }; draw(); });
    function fmt(n) { return (Math.round(n * 100) / 100).toString(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let x = cx % S; x < W; x += S) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = cy % S; y < H; y += S) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      const det = col1.x * col2.y - col1.y * col2.x;
      const sing = Math.abs(det) < 1e-9;
      const fill = sing ? p.gold : (det > 0 ? p.sage : p.rust);
      const O = toPx({ x: 0, y: 0 }), C1 = toPx(col1), C2 = toPx(col2), SUM = toPx({ x: col1.x + col2.x, y: col1.y + col2.y });
      // faint unit square for reference (det = area-scale relative to this)
      ctx.setLineDash([3, 3]); ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.globalAlpha = 0.7;
      const q00 = toPx({ x: 0, y: 0 }), q10 = toPx({ x: 1, y: 0 }), q11 = toPx({ x: 1, y: 1 }), q01 = toPx({ x: 0, y: 1 });
      ctx.beginPath(); ctx.moveTo(q00.x, q00.y); ctx.lineTo(q10.x, q10.y); ctx.lineTo(q11.x, q11.y); ctx.lineTo(q01.x, q01.y); ctx.closePath(); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      // the parallelogram spanned by the columns
      ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(C1.x, C1.y); ctx.lineTo(SUM.x, SUM.y); ctx.lineTo(C2.x, C2.y); ctx.closePath();
      ctx.fillStyle = fill; ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = fill; ctx.lineWidth = 2; ctx.stroke();
      // column vectors
      arrow(ctx, O.x, O.y, C1.x, C1.y, p.gold, 3);
      arrow(ctx, O.x, O.y, C2.x, C2.y, p.violet, 3);
      info.innerHTML = `det = (<b style="color:${p.gold}">${fmt(col1.x)}</b>)(<b style="color:${p.violet}">${fmt(col2.y)}</b>) − (<b style="color:${p.violet}">${fmt(col2.x)}</b>)(<b style="color:${p.gold}">${fmt(col1.y)}</b>) = <b style="color:${fill}">${fmt(det)}</b> &nbsp;→&nbsp; area = <b>${fmt(Math.abs(det))}</b><br>` +
        (sing
          ? `<b style="color:${p.gold}">det = 0 → the columns are parallel, the parallelogram collapses to a line → the matrix is singular (no inverse).</b>`
          : `orientation ${det > 0 ? `<b style="color:${p.sage}">preserved</b> (det &gt; 0)` : `<b style="color:${p.rust}">flipped</b> (det &lt; 0)`} → the matrix is <b>invertible</b>.`);
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Determinant visualizer: two draggable column vectors of a 2x2 matrix span a parallelogram whose area equals the absolute value of the determinant. The fill is sage when the determinant is positive (orientation preserved), rust when negative (orientation flipped), and the shape collapses to a line when the determinant is zero (singular). Focus this canvas and use the arrow keys to move the first column, Shift+arrow keys to move the second.');
    dragKeys(c, () => [col1, col2], draw);   // keyboard a11y: arrows move column 1, Shift+arrows move column 2
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     53. Dynamic programming — the edit-distance (Levenshtein) table
     ======================================================== */
  register({ id: 'algo-dp-editdistance', topic: 'algorithms', title: 'Dynamic Programming: the Edit-Distance Table', blurb: 'Watch the Levenshtein DP table fill cell by cell — each cell is the diagonal neighbour on a character match, otherwise 1 + the min of its top/left/diagonal. Step or play, then trace one optimal edit path back from the corner.' },
  function (root) {
    const A = 'kitten', B = 'sitting';            // rows = A (+ε prefix), cols = B (+ε prefix)
    const R = A.length, Cn = B.length, TOT = R * Cn;
    const cell = 42, x0 = 64, y0 = 54;
    const W = x0 + (Cn + 1) * cell + 14, H = y0 + (R + 1) * cell + 16;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root), info = note(root);
    let dp = [], src = [], step = 0, anim = null, frame = 0, btnPlay = null;
    const idxOf = k => ({ i: Math.floor(k / Cn) + 1, j: (k % Cn) + 1 });
    function compute() {
      dp = []; src = [];
      for (let i = 0; i <= R; i++) { dp[i] = []; src[i] = []; for (let j = 0; j <= Cn; j++) { dp[i][j] = i === 0 ? j : (j === 0 ? i : null); src[i][j] = null; } }
      for (let t = 0; t < step; t++) {
        const { i, j } = idxOf(t), match = A[i - 1] === B[j - 1];
        if (match) { dp[i][j] = dp[i - 1][j - 1]; src[i][j] = 'diag'; }
        else { const top = dp[i - 1][j], left = dp[i][j - 1], diag = dp[i - 1][j - 1], m = Math.min(top, left, diag);
          dp[i][j] = 1 + m; src[i][j] = (diag <= top && diag <= left) ? 'diag' : (left <= top ? 'left' : 'top'); }
      }
    }
    function backtrace() {                         // only meaningful once the table is full
      const path = new Set(), ops = []; let i = R, j = Cn;
      while (i > 0 || j > 0) {
        path.add(i + ',' + j);
        if (i === 0) { ops.push('insert ' + B[j - 1]); j--; }
        else if (j === 0) { ops.push('delete ' + A[i - 1]); i--; }
        else { const s = src[i][j];
          if (s === 'diag') { ops.push(A[i - 1] === B[j - 1] ? 'keep ' + A[i - 1] : 'sub ' + A[i - 1] + '→' + B[j - 1]); i--; j--; }
          else if (s === 'left') { ops.push('insert ' + B[j - 1]); j--; }
          else { ops.push('delete ' + A[i - 1]); i--; } }
      }
      path.add('0,0');
      return { path, ops: ops.reverse() };
    }
    function draw() {
      compute();
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const cur = step < TOT ? idxOf(step) : null;
      const srcCell = cur ? (() => { const { i, j } = cur; const match = A[i - 1] === B[j - 1];
        if (match) return { i: i - 1, j: j - 1 };
        const top = dp[i - 1][j], left = dp[i][j - 1], diag = dp[i - 1][j - 1], m = Math.min(top, left, diag);
        return (diag <= top && diag <= left) ? { i: i - 1, j: j - 1 } : (left <= top ? { i, j: j - 1 } : { i: i - 1, j }); })() : null;
      const done = step >= TOT;
      const bt = done ? backtrace() : { path: new Set() };
      ctx.font = '600 15px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      // labels (ε + the two strings)
      ctx.fillStyle = p.mute;
      for (let j = 0; j <= Cn; j++) ctx.fillText(j === 0 ? 'ε' : B[j - 1], x0 + j * cell + cell / 2, y0 - 20);
      for (let i = 0; i <= R; i++) ctx.fillText(i === 0 ? 'ε' : A[i - 1], x0 - 22, y0 + i * cell + cell / 2);
      ctx.fillStyle = p.gold; ctx.font = '600 12px ' + cssVar('--font-disp', 'serif');
      ctx.fillText('B →', x0 + (Cn + 1) * cell / 2, 16); ctx.save(); ctx.translate(16, y0 + (R + 1) * cell / 2); ctx.rotate(-Math.PI / 2); ctx.fillStyle = p.sage; ctx.fillText('A →', 0, 0); ctx.restore();
      for (let i = 0; i <= R; i++) for (let j = 0; j <= Cn; j++) {
        const X = x0 + j * cell, Y = y0 + i * cell, v = dp[i][j];
        const isCur = cur && cur.i === i && cur.j === j, isSrc = srcCell && srcCell.i === i && srcCell.j === j;
        const isPath = bt.path.has(i + ',' + j), base = i === 0 || j === 0;
        ctx.fillStyle = isCur ? p.gold + '55' : isSrc ? p.sage + '44' : isPath ? p.violet + '44' : base ? p.panel2 : (v != null ? p.panel : 'transparent');
        ctx.fillRect(X + 1, Y + 1, cell - 2, cell - 2);
        ctx.strokeStyle = isCur ? p.gold : isPath ? p.violet : p.line; ctx.lineWidth = isCur || isPath ? 2 : 1;
        ctx.strokeRect(X + 1, Y + 1, cell - 2, cell - 2);
        if (v != null) { ctx.fillStyle = isCur ? p.gold : base ? p.mute : p.ink; ctx.font = '600 15px ' + cssVar('--font-mono', 'monospace'); ctx.fillText(String(v), X + cell / 2, Y + cell / 2); }
      }
      if (done) { const X = x0 + Cn * cell, Y = y0 + R * cell; ctx.strokeStyle = p.sage; ctx.lineWidth = 3; ctx.strokeRect(X + 1, Y + 1, cell - 2, cell - 2); }
      // note
      if (!done && cur) {
        const { i, j } = cur, ca = A[i - 1], cb = B[j - 1], match = ca === cb;
        info.innerHTML = match
          ? `Cell (${i},${j}): <b>'${ca}' = '${cb}'</b> — match, so copy the <span style="color:${p.sage}">diagonal</span> for free → <b style="color:${p.gold}">${dp[i - 1][j - 1]}</b>.`
          : `Cell (${i},${j}): <b>'${ca}' ≠ '${cb}'</b> → 1 + min(top ${dp[i - 1][j]}, left ${dp[i][j - 1]}, diag ${dp[i - 1][j - 1]}) = <b style="color:${p.gold}">${1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])}</b>. The chosen source is shaded <span style="color:${p.sage}">sage</span>.`;
      } else {
        const r = backtrace();
        info.innerHTML = `<b>Edit distance("${A}", "${B}") = <span style="color:${p.sage}">${dp[R][Cn]}</span></b> — the bottom-right cell. One optimal path (<span style="color:${p.violet}">violet</span>): ${r.ops.join(' · ')}.`;
      }
    }
    function stopPlay() { if (anim) { anim.stop(); anim = null; } if (btnPlay) btnPlay.innerHTML = '▶ play'; }
    btnPlay = button(ctl, '▶ play', function () {
      if (anim) { stopPlay(); return; }
      if (step >= TOT) { step = 0; }
      btnPlay.innerHTML = '⏸ pause'; frame = 0;
      anim = VIZUtil.loop(function () { frame++; if (frame % 14 === 0) { if (step < TOT) { step++; draw(); } else stopPlay(); } });
    });
    button(ctl, 'step ▶', function () { stopPlay(); if (step < TOT) { step++; draw(); } });
    button(ctl, 'skip ⏭', function () { stopPlay(); step = TOT; draw(); });
    button(ctl, '⏮ reset', function () { stopPlay(); step = 0; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Dynamic-programming edit-distance table between the words kitten and sitting. Each cell holds the edit distance between prefixes; on a character match it copies the diagonal neighbour, otherwise it is one plus the minimum of the top, left, and diagonal neighbours. The final bottom-right cell is the edit distance, 3, and an optimal sequence of edits is traced back through the table.');
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     54. Dijkstra's shortest paths — settle the nearest, relax its neighbours
     ======================================================== */
  register({ id: 'algo-dijkstra', topic: 'algorithms', title: "Dijkstra's Shortest Paths", blurb: 'Watch Dijkstra grow a shortest-path tree from a source: each step settles the closest unsettled node (gold), then relaxes its edges — lowering a neighbour\'s tentative distance only when a shorter route is found. Step or play; the sage edges are the final shortest-path tree.' },
  function (root) {
    const SRC = 'A';
    const POS = { A: [70, 190], B: [200, 78], C: [200, 302], D: [340, 190], E: [452, 88], F: [452, 292] };
    const NODES = Object.keys(POS);
    const EDGES = [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['C', 'E', 10], ['D', 'E', 2], ['D', 'F', 6], ['E', 'F', 3]];
    const adj = {}; NODES.forEach(n => adj[n] = []);
    EDGES.forEach(([a, b, w]) => { adj[a].push([b, w]); adj[b].push([a, w]); });
    const W = 524, H = 384;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root), info = note(root);
    // precompute the run: one event per settlement (node, dist snapshot, settled set, prev, which neighbours relaxed)
    function runDijkstra() {
      const dist = {}, prev = {}, settled = {}, events = [];
      NODES.forEach(n => { dist[n] = Infinity; prev[n] = null; });
      dist[SRC] = 0;
      for (let it = 0; it < NODES.length; it++) {
        let u = null; NODES.forEach(n => { if (!settled[n] && dist[n] < Infinity && (u === null || dist[n] < dist[u])) u = n; });
        if (u === null) break;
        settled[u] = true; const relaxed = [];
        adj[u].forEach(([v, w]) => { if (!settled[v] && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; relaxed.push([v, dist[v]]); } });
        events.push({ u: u, dist: Object.assign({}, dist), settled: Object.keys(settled).slice(), prev: Object.assign({}, prev), relaxed: relaxed });
      }
      return events;
    }
    const EV = runDijkstra(), TOT = EV.length;
    let step = 0, anim = null, frame = 0, btnPlay = null;
    function stateAt(k) {                                       // {dist, settled:Set, prev, cur}
      if (k <= 0) { const d = {}; NODES.forEach(n => d[n] = Infinity); d[SRC] = 0; return { dist: d, settled: new Set(), prev: {}, cur: null }; }
      const e = EV[k - 1]; return { dist: e.dist, settled: new Set(e.settled), prev: e.prev, cur: e.u, relaxed: e.relaxed };
    }
    function stopPlay() { if (anim) { anim.stop(); anim = null; } if (btnPlay) btnPlay.innerHTML = '▶ play'; }
    function draw() {
      const p = P(), s = stateAt(step); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // edges
      ctx.lineWidth = 1.5; ctx.font = '600 12px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      EDGES.forEach(([a, b, w]) => {
        const A = POS[a], B = POS[b];
        const tree = (s.prev[a] === b || s.prev[b] === a);    // an edge in the current shortest-path tree
        ctx.strokeStyle = tree ? p.sage : p.line; ctx.lineWidth = tree ? 3 : 1.5;
        ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
        const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        ctx.fillStyle = p.panel; ctx.fillRect(mx - 9, my - 8, 18, 16);
        ctx.fillStyle = tree ? p.sage : p.mute; ctx.fillText(String(w), mx, my);
      });
      // nodes
      NODES.forEach(n => {
        const [x, y] = POS[n], settled = s.settled.has(n), isCur = s.cur === n, d = s.dist[n];
        ctx.beginPath(); ctx.arc(x, y, 21, 0, 7);
        ctx.fillStyle = settled ? p.sage + '33' : (d < Infinity ? p.panel2 : p.panel); ctx.fill();
        ctx.lineWidth = isCur ? 3.5 : 2; ctx.strokeStyle = isCur ? p.gold : settled ? p.sage : (d < Infinity ? p.gold + '99' : p.line); ctx.stroke();
        ctx.fillStyle = settled ? p.sage : p.ink; ctx.font = '600 16px ' + cssVar('--font-disp', 'serif'); ctx.fillText(n, x, y - 1);
        // tentative distance badge above the node
        ctx.font = '600 12px ' + cssVar('--font-mono', 'monospace');
        ctx.fillStyle = p.panel; ctx.fillRect(x - 14, y - 38, 28, 17);
        ctx.strokeStyle = settled ? p.sage : (d < Infinity ? p.gold : p.line); ctx.lineWidth = 1; ctx.strokeRect(x - 14, y - 38, 28, 17);
        ctx.fillStyle = d < Infinity ? (settled ? p.sage : p.gold) : p.mute; ctx.fillText(d < Infinity ? String(d) : '∞', x, y - 29);
      });
      // note
      if (step === 0) info.innerHTML = `Start at <b style="color:${p.gold}">${SRC}</b>: its distance is 0, every other node is ∞. Each step settles the closest unsettled node, then relaxes its edges.`;
      else if (step >= TOT) { const fin = EV[TOT - 1].dist; info.innerHTML = `<b>All settled.</b> Shortest distances from ${SRC}: ${NODES.map(n => `${n}=<b style="color:${p.sage}">${fin[n]}</b>`).join(', ')}. The <span style="color:${p.sage}">sage</span> edges are the shortest-path tree.`; }
      else { const e = EV[step - 1]; const rel = e.relaxed.length ? e.relaxed.map(([v, d]) => `<b>${v}</b>→${d}`).join(', ') : 'nothing (no shorter route through it)'; info.innerHTML = `Settle <b style="color:${p.gold}">${e.u}</b> at distance <b>${e.dist[e.u]}</b> (the closest unsettled node). Relax its neighbours: ${rel}.`; }
    }
    btnPlay = button(ctl, '▶ play', function () {
      if (anim) { stopPlay(); return; }
      if (step >= TOT) step = 0;
      btnPlay.innerHTML = '⏸ pause'; frame = 0;
      anim = VIZUtil.loop(function () { frame++; if (frame % 24 === 0) { if (step < TOT) { step++; draw(); } else stopPlay(); } });
    });
    button(ctl, 'step ▶', function () { stopPlay(); if (step < TOT) { step++; draw(); } });
    button(ctl, 'skip ⏭', function () { stopPlay(); step = TOT; draw(); });
    button(ctl, '⏮ reset', function () { stopPlay(); step = 0; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Dijkstra's shortest-path visualizer on a 6-node weighted graph from source A. Each step settles the nearest unsettled node and relaxes its edges, lowering neighbours' tentative distances when a shorter route is found. The final shortest distances from A are B=3, C=2, D=8, E=10, F=13, and the settled tree edges form the shortest-path tree.");
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     55. Gram-Schmidt — subtract the projection to orthogonalize
     ======================================================== */
  register({ id: 'la-gram-schmidt', topic: 'linear-algebra', title: 'Gram-Schmidt Orthogonalization', blurb: 'Drag two vectors and watch Gram-Schmidt build an orthogonal set: keep u₁ = v₁, then subtract v₂\'s projection onto u₁ so the remainder u₂ is exactly perpendicular (u₂·u₁ = 0). Toggle "normalize" to get the orthonormal basis ê₁, ê₂.' },
  function (root) {
    const W = 540, H = 380, S = 42, cx = W / 2, cy = H / 2;
    const { c, ctx } = canvas(root, W, H);
    const info = note(root);
    let v1 = { x: 3, y: 0.5 }, v2 = { x: 1.5, y: 2.5 }, drag = null, normalized = false;
    const toPx = p => ({ x: cx + p.x * S, y: cy - p.y * S });
    const toMath = p => ({ x: (p.x - cx) / S, y: (cy - p.y) / S });
    const near = (mp, vec) => { const q = toPx(vec); return Math.hypot(q.x - mp.x, q.y - mp.y) < 16; };
    function down(ev) { const m = pointer(c, W, H, ev); if (near(m, v1)) drag = 'v1'; else if (near(m, v2)) drag = 'v2'; if (drag) ev.preventDefault(); }
    function move(ev) { if (!drag) return; const m = toMath(pointer(c, W, H, ev)); const g = x => Math.round(x * 2) / 2; const t = drag === 'v1' ? v1 : v2; t.x = g(m.x); t.y = g(m.y); draw(); ev.preventDefault(); }
    function up() { drag = null; }
    c.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', up);
    const ctl = controls(root);
    button(ctl, 'normalize', () => { normalized = !normalized; draw(); });
    button(ctl, 'reset', () => { v1 = { x: 3, y: 0.5 }; v2 = { x: 1.5, y: 2.5 }; normalized = false; draw(); });
    const fmt = n => (Math.round(n * 100) / 100).toString();
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      for (let x = cx % S; x < W; x += S) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = cy % S; y < H; y += S) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
      // Gram-Schmidt
      const u1 = { x: v1.x, y: v1.y };
      const u1sq = u1.x * u1.x + u1.y * u1.y;
      const dot = v2.x * u1.x + v2.y * u1.y;
      const k = u1sq > 1e-9 ? dot / u1sq : 0;
      const proj = { x: u1.x * k, y: u1.y * k };
      const u2 = { x: v2.x - proj.x, y: v2.y - proj.y };
      const n1 = Math.hypot(u1.x, u1.y) || 1, n2 = Math.hypot(u2.x, u2.y) || 1;
      const e1 = { x: u1.x / n1, y: u1.y / n1 }, e2 = { x: u2.x / n2, y: u2.y / n2 };
      const O = toPx({ x: 0, y: 0 });
      const D1 = normalized ? e1 : u1, D2 = normalized ? e2 : u2;
      if (normalized) {   // unit circle to show ê are length 1
        ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(O.x, O.y, S, 0, 7); ctx.stroke();
      } else {
        // show v2 (original) + its projection onto u1 + the dashed perpendicular drop (= u2 translated)
        const V2 = toPx(v2), Pp = toPx(proj);
        arrow(ctx, O.x, O.y, V2.x, V2.y, p.sage, 2.5);
        ctx.setLineDash([4, 4]); ctx.strokeStyle = p.mute; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(V2.x, V2.y); ctx.lineTo(Pp.x, Pp.y); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = p.gold; ctx.lineWidth = 5; ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(Pp.x, Pp.y); ctx.stroke(); ctx.globalAlpha = 1;  // the projection along u1
      }
      const A = toPx(D1), B = toPx(D2);
      // right-angle marker between the two orthogonal vectors
      if (n2 > 1e-6) {
        const a1 = Math.atan2(D1.y, D1.x), a2 = Math.atan2(D2.y, D2.x), r = 16;
        ctx.strokeStyle = p.sage; ctx.lineWidth = 1.5;
        const c1 = { x: O.x + r * Math.cos(a1), y: O.y - r * Math.sin(a1) }, c2 = { x: O.x + r * Math.cos(a2), y: O.y - r * Math.sin(a2) };
        ctx.beginPath(); ctx.moveTo(c1.x, c1.y); ctx.lineTo(c1.x + (c2.x - O.x), c1.y + (c2.y - O.y)); ctx.lineTo(c2.x, c2.y); ctx.stroke();
      }
      arrow(ctx, O.x, O.y, A.x, A.y, p.gold, 3);
      arrow(ctx, O.x, O.y, B.x, B.y, p.violet, 3);
      const orth = u2.x * u1.x + u2.y * u1.y;
      info.innerHTML = normalized
        ? `<b style="color:${p.gold}">ê₁</b> = u₁/|u₁| &nbsp; <b style="color:${p.violet}">ê₂</b> = u₂/|u₂| — an <b>orthonormal</b> basis: both unit length, mutually perpendicular (the dashed circle has radius 1).`
        : `<b style="color:${p.gold}">u₁</b> = v₁ = (${v1.x}, ${v1.y}) &nbsp; <b style="color:${p.sage}">v₂</b> = (${v2.x}, ${v2.y})<br>` +
          `subtract the projection: <b style="color:${p.violet}">u₂</b> = v₂ − (v₂·u₁ / u₁·u₁) u₁ = (${fmt(u2.x)}, ${fmt(u2.y)})<br>` +
          `now <b style="color:${p.violet}">u₂</b>·<b style="color:${p.gold}">u₁</b> = <b>${fmt(orth)}</b> — orthogonal. <span style="color:${p.mute}">(drag the tips; “normalize” for ê)</span>`;
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', "Gram-Schmidt visualizer: two draggable vectors. It keeps u1 equal to v1, then subtracts v2's projection onto u1 so the remainder u2 is perpendicular to u1 (their dot product is zero). A normalize toggle shows the orthonormal basis of unit vectors. Focus this canvas and use the arrow keys to move v1, Shift+arrow keys to move v2.");
    dragKeys(c, () => [v1, v2], draw);   // keyboard a11y: arrows move v1, Shift+arrows move v2
    draw();                                                    // synchronous first paint
  });

  /* ========================================================
     56. Policy gradient (REINFORCE) — raise the probability of high-advantage actions
     ======================================================== */
  register({ id: 'rl-policy-gradient', topic: 'reinforcement-learning', title: 'Policy Gradient (REINFORCE)', blurb: 'A one-step softmax policy over three actions, each with a fixed reward. Step the policy-gradient ascent and watch it push probability onto the actions whose reward beats the current average (positive advantage) — and the expected return climb toward the best action.' },
  function (root) {
    const ACTS = ['A', 'B', 'C'], REW = [-1, 2, 0.5];          // fixed rewards; B is best
    const W = 520, H = 360, alpha = 0.6;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root), info = note(root);
    let theta = [0, 0, 0], step = 0, anim = null, frame = 0, btnPlay = null, Jhist = [];
    function softmax(t) { const m = Math.max.apply(null, t), ex = t.map(v => Math.exp(v - m)), s = ex.reduce((a, b) => a + b, 0); return ex.map(e => e / s); }
    function expectedJ(p) { return p.reduce((a, _, i) => a + p[i] * REW[i], 0); }
    function reset() { theta = [0, 0, 0]; step = 0; Jhist = [expectedJ(softmax(theta))]; stopPlay(); draw(); }
    function gradStep() {                                       // exact policy-gradient ascent on J = Σ πᵢ Rᵢ : ∂J/∂θⱼ = πⱼ(Rⱼ − J)
      const p = softmax(theta), J = expectedJ(p);
      for (let j = 0; j < 3; j++) theta[j] += alpha * p[j] * (REW[j] - J);
      step++; Jhist.push(expectedJ(softmax(theta))); if (Jhist.length > 120) Jhist.shift();
    }
    function stopPlay() { if (anim) { anim.stop(); anim = null; } if (btnPlay) btnPlay.innerHTML = '▶ play'; }
    function draw() {
      const p = P(), pi = softmax(theta), J = expectedJ(pi);
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const x0 = 70, baseY = 250, bw = 84, gap = 56, maxH = 180;
      // axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 - 16, baseY); ctx.lineTo(W - 20, baseY); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      [0, 0.5, 1].forEach(t => { const y = baseY - t * maxH; ctx.fillText(t.toFixed(1), x0 - 22, y); ctx.strokeStyle = p.line + '88'; ctx.beginPath(); ctx.moveTo(x0 - 16, y); ctx.lineTo(W - 20, y); ctx.stroke(); });
      ctx.textAlign = 'center';
      for (let i = 0; i < 3; i++) {
        const x = x0 + i * (bw + gap), h = pi[i] * maxH, adv = REW[i] - J;
        const col = REW[i] > 0 ? p.sage : REW[i] < 0 ? p.rust : p.gold;
        ctx.fillStyle = col + '55'; ctx.fillRect(x, baseY - h, bw, h);
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.strokeRect(x, baseY - h, bw, h);
        ctx.fillStyle = p.ink; ctx.font = '600 15px ' + cssVar('--font-mono', 'monospace'); ctx.fillText((pi[i] * 100).toFixed(0) + '%', x + bw / 2, baseY - h - 14);
        ctx.fillStyle = col; ctx.font = '600 16px ' + cssVar('--font-disp', 'serif'); ctx.fillText(ACTS[i], x + bw / 2, baseY + 18);
        ctx.fillStyle = p.mute; ctx.font = '12px ' + cssVar('--font-mono', 'monospace'); ctx.fillText('R=' + REW[i], x + bw / 2, baseY + 36);
        // advantage arrow hint (which way this step pushes the probability)
        ctx.fillStyle = adv > 0.02 ? p.sage : adv < -0.02 ? p.rust : p.mute; ctx.font = '13px ' + cssVar('--font-mono', 'monospace');
        ctx.fillText(adv > 0.02 ? '▲' : adv < -0.02 ? '▼' : '·', x + bw / 2, baseY - h - 32);
      }
      // J history sparkline (expected return climbing)
      if (Jhist.length > 1) {
        const sx = x0, sw = W - 20 - x0, sy = 300, sh = 44, lo = -1, hi = 2;
        ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath();
        Jhist.forEach((v, k) => { const X = sx + sw * k / (Jhist.length - 1), Y = sy + sh - sh * (v - lo) / (hi - lo); k === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); });
        ctx.stroke();
      }
      info.innerHTML = `Step <b>${step}</b> · expected return <b style="color:${p.gold}">J = ${J.toFixed(3)}</b> (climbing toward the best reward, +2).<br>` +
        `Each step nudges every action by its <b>advantage</b> (R − J): <span style="color:${p.sage}">▲ raises</span> actions that beat the average, <span style="color:${p.rust}">▼ lowers</span> the rest. Probabilities concentrate on <b style="color:${p.sage}">B</b>.`;
    }
    btnPlay = button(ctl, '▶ play', function () {
      if (anim) { stopPlay(); return; }
      btnPlay.innerHTML = '⏸ pause'; frame = 0;
      anim = VIZUtil.loop(function () { frame++; if (frame % 8 === 0) { if (step < 80) { gradStep(); draw(); } else stopPlay(); } });
    });
    button(ctl, 'step ▶', function () { stopPlay(); if (step < 200) { gradStep(); draw(); } });
    button(ctl, '⏮ reset', function () { reset(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Policy-gradient (REINFORCE) visualizer: three actions A, B, C with fixed rewards -1, +2, +0.5 under a softmax policy. Each gradient-ascent step raises the probability of actions whose reward exceeds the current average return (positive advantage) and lowers the others, so probability concentrates on action B and the expected return climbs toward +2.');
    Jhist = [expectedJ(softmax(theta))];
    draw();                                                    // synchronous first paint
  });


  /* ========================================================
     90. k-Means clustering in action (Machine Learning)
     ======================================================== */
  register({ id: 'ml-kmeans-viz', topic: 'machine-learning', title: 'k-Means clustering in action', blurb: 'Watch Lloyd’s algorithm run: assign each point to the nearest centroid, then move each centroid to its cluster’s mean, repeating until the assignment stops changing. Step or Run, and watch the inertia fall to a (local) minimum.' },
  function (root) {
    const W = 540, H = 380, padL = 14, padR = 14, padT = 14, padB = 14;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 12345;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function clamp(v) { return Math.max(0.3, Math.min(9.7, v)); }
    let K = 3, pts = [], cents = [], assign = [], phase = 'assign', iter = 0, converged = false, dataSeed = 1;
    const COLS = () => { const p = P(); return [p.gold, p.sage, p.violet, p.rust]; };
    function genData() {
      seed = 1000 + dataSeed * 7; pts = [];
      const blobs = [[2.6, 7.2], [7.4, 7.6], [5.0, 2.6]];
      blobs.forEach(b => { for (let i = 0; i < 22; i++) pts.push({ x: clamp(b[0] + gauss() * 0.9), y: clamp(b[1] + gauss() * 0.9) }); });
    }
    function initCentroids() {
      seed = 7777 + dataSeed * 13 + K * 101;
      cents = []; const used = {};
      while (cents.length < K) { const i = Math.floor(rng() * pts.length); if (used[i]) continue; used[i] = 1; cents.push({ x: pts[i].x, y: pts[i].y }); }
      assign = pts.map(() => -1); phase = 'assign'; iter = 0; converged = false;
    }
    function reset() { initCentroids(); draw(); }
    function newData() { dataSeed++; genData(); initCentroids(); draw(); }
    function inertia() { let s = 0; pts.forEach((pt, i) => { if (assign[i] >= 0) { const cc = cents[assign[i]]; s += (pt.x - cc.x) * (pt.x - cc.x) + (pt.y - cc.y) * (pt.y - cc.y); } }); return s; }
    function doAssign() { pts.forEach((pt, i) => { let best = 0, bd = Infinity; for (let k = 0; k < K; k++) { const dx = pt.x - cents[k].x, dy = pt.y - cents[k].y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = k; } } assign[i] = best; }); }
    function doUpdate() { let moved = 0; for (let k = 0; k < K; k++) { let sx = 0, sy = 0, n = 0; pts.forEach((pt, i) => { if (assign[i] === k) { sx += pt.x; sy += pt.y; n++; } }); if (n > 0) { const nx = sx / n, ny = sy / n; moved += Math.abs(nx - cents[k].x) + Math.abs(ny - cents[k].y); cents[k] = { x: nx, y: ny }; } } return moved; }
    function step() {
      if (converged) return;
      if (phase === 'assign') { doAssign(); phase = 'update'; }
      else { const moved = doUpdate(); iter++; phase = 'assign'; if (moved < 0.001) converged = true; }
      draw();
    }
    function draw() {
      const p = P(), cols = COLS(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + x / 10 * (W - padL - padR), Y = y => (H - padB) - y / 10 * (H - padT - padB);
      pts.forEach((pt, i) => { const a = assign[i]; ctx.fillStyle = a >= 0 ? cols[a] : p.mute; ctx.globalAlpha = a >= 0 ? 0.85 : 0.6; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 4, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1;
      cents.forEach((ce, k) => { ctx.fillStyle = cols[k]; ctx.strokeStyle = p.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(X(ce.x), Y(ce.y), 9, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = p.bg; ctx.font = 'bold 11px ' + cssVar('--font-mono', 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✦', X(ce.x), Y(ce.y)); });
      ctx.textBaseline = 'alphabetic';
      const J = inertia();
      const next = converged ? '' : (phase === 'assign' ? 'next: assign points to the nearest centroid' : 'next: move each centroid to its cluster mean');
      info.innerHTML = 'k = <b>' + K + '</b> &middot; iteration <b>' + iter + '</b> &middot; inertia (within-cluster SSE) = <b style="color:' + p.gold + '">' + J.toFixed(2) + '</b>' + (converged ? ' &middot; <b style="color:' + p.sage + '">converged</b>' : '') + '<br>' + (converged ? 'Assignments stopped changing &mdash; a local optimum. Reset for new centroids (different start may give a different result), or New points.' : next + '. The ✦ markers are centroids; each point is colored by its current cluster.');
    }
    slider(ctl, { label: 'k', min: 2, max: 4, step: 1, value: K, onInput: v => { K = v; initCentroids(); draw(); } });
    button(ctl, 'Step', step);
    let auto = null;
    const runBtn = button(ctl, '▶ Run', function () {
      if (auto) { auto.stop(); auto = null; runBtn.innerHTML = '▶ Run'; return; }
      runBtn.innerHTML = '⏸ Pause'; let last = 0;
      auto = loop(function (t) { if (t - last > 650) { last = t; if (converged) { if (auto) { auto.stop(); auto = null; } runBtn.innerHTML = '▶ Run'; } else step(); } });
    });
    button(ctl, '⏮ reset', function () { reset(); });
    button(ctl, '🎲 new points', function () { newData(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'k-Means clustering visualizer: a 2-D scatter of points in three blobs with k centroids drawn as star markers. Stepping alternates two phases - assign each point to its nearest centroid (points recolor) and move each centroid to the mean of its assigned points (centroids jump) - and the within-cluster inertia falls each step until the assignment stops changing (convergence to a local optimum). A slider sets k; Run animates; Reset re-seeds centroids; New points regenerates the data.');
    genData(); initCentroids(); draw();
  });


  /* ========================================================
     91. k-Nearest Neighbors decision boundary (Machine Learning)
     ======================================================== */
  register({ id: 'ml-knn-viz', topic: 'machine-learning', title: 'kNN decision boundary: the bias-variance dial', blurb: 'Color the plane by what k-NN would predict everywhere, for two overlapping classes. Slide k: at k=1 the boundary is jagged and overfits noise (high variance); as k grows it smooths and eventually oversmooths (high bias). The classic bias-variance tradeoff, made visible.' },
  function (root) {
    const W = 540, H = 380, padL = 10, padR = 10, padT = 10, padB = 10;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 4242;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function clamp(v) { return Math.max(0.3, Math.min(9.7, v)); }
    let K = 1, pts = [], dataSeed = 1;
    function genData() {
      seed = 200 + dataSeed * 9; pts = [];
      const A = [3.6, 6.2], B = [6.6, 4.4];          // two overlapping blobs
      for (let i = 0; i < 22; i++) pts.push({ x: clamp(A[0] + gauss() * 1.6), y: clamp(A[1] + gauss() * 1.6), c: 0 });
      for (let i = 0; i < 22; i++) pts.push({ x: clamp(B[0] + gauss() * 1.6), y: clamp(B[1] + gauss() * 1.6), c: 1 });
    }
    function classify(x, y) {
      const d = pts.map(pt => ({ d: (pt.x - x) * (pt.x - x) + (pt.y - y) * (pt.y - y), c: pt.c }));
      d.sort((a, b) => a.d - b.d);
      let n0 = 0; for (let i = 0; i < K && i < d.length; i++) if (d[i].c === 0) n0++;
      const kk = Math.min(K, d.length); return n0 > kk - n0 ? 0 : (n0 < kk - n0 ? 1 : 0);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + x / 10 * (W - padL - padR), Y = y => (H - padB) - y / 10 * (H - padT - padB);
      const cw = 9, cellsX = Math.ceil((W - padL - padR) / cw), cellsY = Math.ceil((H - padT - padB) / cw);
      const colA = p.sage, colB = p.violet;
      for (let i = 0; i < cellsX; i++) for (let j = 0; j < cellsY; j++) {
        const px = padL + (i + 0.5) * cw, py = padT + (j + 0.5) * cw;
        const dx = (px - padL) / (W - padL - padR) * 10, dy = (Y(0) - py) / (H - padT - padB) * 10;
        const cls = classify(dx, dy);
        ctx.fillStyle = cls === 0 ? colA : colB; ctx.globalAlpha = 0.16; ctx.fillRect(padL + i * cw, padT + j * cw, cw, cw);
      }
      ctx.globalAlpha = 1;
      pts.forEach(pt => { ctx.fillStyle = pt.c === 0 ? colA : colB; ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 5, 0, 7); ctx.fill(); ctx.stroke(); });
      let verdict; if (K <= 1) verdict = 'jagged islands that wrap individual points — <b style="color:' + p.rust + '">overfitting</b> the noise (high variance).'; else if (K >= 21) verdict = 'a very smooth, almost-straight boundary that ignores local detail — <b style="color:' + p.gold + '">oversmoothing</b> (high bias).'; else verdict = 'a balanced boundary that follows the real class structure without chasing every point.';
      info.innerHTML = 'k = <b>' + K + '</b>. The plane is colored by what k-NN predicts at each location (sage = class A, violet = class B); dots are the training points. The boundary is ' + verdict + ' Slide k from 1 upward and watch variance fall and bias rise — the bias-variance tradeoff in one picture.';
    }
    slider(ctl, { label: 'k (neighbors)', min: 1, max: 31, step: 2, value: K, onInput: v => { K = v; draw(); } });
    button(ctl, '🎲 new points', function () { dataSeed++; genData(); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'k-Nearest-Neighbors decision-boundary visualizer: two overlapping classes of points on a plane, with the background shaded by the class k-NN would predict at each location. A slider sets k: at k=1 the boundary is jagged and wraps individual points (overfitting, high variance); as k increases the boundary smooths and eventually oversmooths (high bias) - the bias-variance tradeoff made visible.');
    genData(); draw();
  });


  /* ========================================================
     92. Decision-tree boundary: depth & overfitting (Machine Learning)
     ======================================================== */
  register({ id: 'ml-tree-viz', topic: 'machine-learning', title: 'Decision-tree boundary: depth & overfitting', blurb: 'A decision tree makes axis-aligned splits, so its decision regions are rectangles. Slide the max depth: shallow trees draw a few clean boxes (underfit); deep trees carve tiny boxes around individual points, driving training accuracy to 100% (overfit). Contrast the staircase boundary with kNN’s smooth one.' },
  function (root) {
    const W = 540, H = 380, padL = 10, padR = 10, padT = 10, padB = 10;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 909;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function clamp(v) { return Math.max(0.3, Math.min(9.7, v)); }
    let depth = 2, pts = [], dataSeed = 1;
    function genData() {
      seed = 300 + dataSeed * 11; pts = [];
      const A = [4.3, 5.7], B = [5.7, 4.3];
      for (let i = 0; i < 24; i++) pts.push({ x: clamp(A[0] + gss() * 1.9), y: clamp(A[1] + gss() * 1.9), c: 0 });
      for (let i = 0; i < 24; i++) pts.push({ x: clamp(B[0] + gss() * 1.9), y: clamp(B[1] + gss() * 1.9), c: 1 });
    }
    function gini(a) { if (!a.length) return 0; let n0 = 0; a.forEach(p => { if (p.c === 0) n0++; }); const p0 = n0 / a.length; return 1 - (p0 * p0 + (1 - p0) * (1 - p0)); }
    function build(a, d) {
      let n0 = 0; a.forEach(p => { if (p.c === 0) n0++; });
      const maj = n0 >= a.length - n0 ? 0 : 1;
      if (d <= 0 || a.length < 4 || n0 === 0 || n0 === a.length) return { leaf: true, c: maj };
      let best = null;
      ['x', 'y'].forEach(f => {
        const vals = a.map(p => p[f]).slice().sort((u, v) => u - v);
        for (let i = 0; i < vals.length - 1; i++) {
          if (vals[i] === vals[i + 1]) continue;
          const thr = (vals[i] + vals[i + 1]) / 2;
          const L = a.filter(p => p[f] <= thr), R = a.filter(p => p[f] > thr);
          if (!L.length || !R.length) continue;
          const g = (L.length * gini(L) + R.length * gini(R)) / a.length;
          if (!best || g < best.g) best = { g: g, f: f, thr: thr, L: L, R: R };
        }
      });
      if (!best) return { leaf: true, c: maj };
      return { leaf: false, f: best.f, thr: best.thr, left: build(best.L, d - 1), right: build(best.R, d - 1) };
    }
    function classify(node, x, y) { while (!node.leaf) { const v = node.f === 'x' ? x : y; node = v <= node.thr ? node.left : node.right; } return node.c; }
    function leaves(node) { return node.leaf ? 1 : leaves(node.left) + leaves(node.right); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const tree = build(pts, depth);
      const X = x => padL + x / 10 * (W - padL - padR), Y = y => (H - padB) - y / 10 * (H - padT - padB);
      const cw = 9, cellsX = Math.ceil((W - padL - padR) / cw), cellsY = Math.ceil((H - padT - padB) / cw);
      const colA = p.sage, colB = p.violet;
      for (let i = 0; i < cellsX; i++) for (let j = 0; j < cellsY; j++) {
        const px = padL + (i + 0.5) * cw, py = padT + (j + 0.5) * cw;
        const dx = (px - padL) / (W - padL - padR) * 10, dy = (Y(0) - py) / (H - padT - padB) * 10;
        ctx.fillStyle = classify(tree, dx, dy) === 0 ? colA : colB; ctx.globalAlpha = 0.16; ctx.fillRect(padL + i * cw, padT + j * cw, cw, cw);
      }
      ctx.globalAlpha = 1;
      pts.forEach(pt => { ctx.fillStyle = pt.c === 0 ? colA : colB; ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 5, 0, 7); ctx.fill(); ctx.stroke(); });
      let correct = 0; pts.forEach(pt => { if (classify(tree, pt.x, pt.y) === pt.c) correct++; });
      const acc = Math.round(correct / pts.length * 100), nleaf = leaves(tree);
      let msg; if (depth <= 1) msg = 'one split: a single straight cut (a coarse, underfit boundary).'; else if (depth >= 6) msg = 'deep: tiny boxes wrap individual points — <b style="color:' + p.rust + '">overfitting</b>, training accuracy near 100%.'; else msg = 'a staircase of axis-aligned rectangles tracing the two classes.';
      info.innerHTML = 'max depth = <b>' + depth + '</b> &middot; leaves = <b>' + nleaf + '</b> &middot; training accuracy = <b style="color:' + p.gold + '">' + acc + '%</b>. The tree carves the plane into ' + msg + ' Splits are always horizontal or vertical (axis-aligned), so the boundary is rectangular — unlike kNN’s smooth one. Raising depth fits the training points ever more tightly (toward 100%), the classic overfitting signal.';
    }
    slider(ctl, { label: 'max depth', min: 1, max: 7, step: 1, value: depth, onInput: v => { depth = v; draw(); } });
    button(ctl, '🎲 new points', function () { dataSeed++; genData(); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Decision-tree decision-boundary visualizer: two overlapping classes of points, with the background shaded by the class the tree predicts. A max-depth slider grows the tree: at depth 1 a single straight cut (underfit); at moderate depth a staircase of axis-aligned rectangles; at high depth tiny boxes wrap individual points and training accuracy approaches 100% (overfitting). The boundary is always rectangular because tree splits are axis-aligned, in contrast to kNN smooth boundary.');
    genData(); draw();
  });


  /* ========================================================
     93. Linear regression: gradient descent fits the line (Machine Learning)
     ======================================================== */
  register({ id: 'ml-linreg-viz', topic: 'machine-learning', title: 'Linear regression: gradient descent fits the line', blurb: 'Watch a model train. Each step nudges the slope and intercept downhill on the mean-squared-error surface, so the line rotates into the best fit and the MSE falls. Crank the learning rate too high and it diverges — the same knife-edge as every gradient-descent trainer.' },
  function (root) {
    const W = 540, H = 380, padL = 12, padR = 12, padT = 12, padB = 12, RANGE = 8;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 77;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    let lr = 0.02, w = 0, b = 0, iter = 0, pts = [];
    function genData() { seed = 77; pts = []; for (let i = 0; i < 12; i++) { const x = 0.3 + i * 0.5; pts.push({ x: x, y: 1.1 * x + 0.8 + gauss() * 0.6 }); } }
    function mse() { let s = 0; pts.forEach(p => { const e = w * p.x + b - p.y; s += e * e; }); return s / pts.length; }
    function gdStep() {
      let dw = 0, db = 0; const n = pts.length;
      pts.forEach(p => { const e = w * p.x + b - p.y; dw += 2 * e * p.x / n; db += 2 * e / n; });
      w -= lr * dw; b -= lr * db; iter++;
    }
    function reset() { w = 0; b = 0; iter = 0; draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + x / RANGE * (W - padL - padR), Y = y => (H - padB) - y / RANGE * (H - padT - padB);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(X(0), padT); ctx.lineTo(X(0), H - padB); ctx.stroke();
      // residual segments (faint)
      ctx.strokeStyle = p.rust; ctx.globalAlpha = 0.4; ctx.lineWidth = 1;
      pts.forEach(pt => { const yh = w * pt.x + b; ctx.beginPath(); ctx.moveTo(X(pt.x), Y(pt.y)); ctx.lineTo(X(pt.x), Y(yh)); ctx.stroke(); });
      ctx.globalAlpha = 1;
      // the fitted line
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(0), Y(b)); ctx.lineTo(X(RANGE), Y(w * RANGE + b)); ctx.stroke();
      // data points
      pts.forEach(pt => { ctx.fillStyle = p.gold; ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 5, 0, 7); ctx.fill(); ctx.stroke(); });
      const J = mse(), diverging = !isFinite(J) || J > 50;
      info.innerHTML = 'step <b>' + iter + '</b> &middot; line: ŷ = <b>' + (isFinite(w) ? w.toFixed(2) : '∞') + '</b> x + <b>' + (isFinite(b) ? b.toFixed(2) : '∞') + '</b> &middot; MSE = <b style="color:' + (diverging ? p.rust : p.gold) + '">' + (isFinite(J) ? J.toFixed(3) : '∞') + '</b>' + (diverging ? ' &mdash; <b style="color:' + p.rust + '">diverging! lower the learning rate</b>' : '') + '<br>Each step moves the slope and intercept opposite the gradient of the MSE, shrinking the red residuals. True line is roughly ŷ = 1.1x + 0.8; from a flat start it should converge there (try Run).';
    }
    slider(ctl, { label: 'learning rate', min: 0.005, max: 0.09, step: 0.005, value: lr, fmt: v => v.toFixed(3), onInput: v => { lr = v; } });
    button(ctl, 'Step', function () { for (let i = 0; i < 3; i++) gdStep(); draw(); });
    let auto = null;
    const runBtn = button(ctl, '▶ Run', function () {
      if (auto) { auto.stop(); auto = null; runBtn.innerHTML = '▶ Run'; return; }
      runBtn.innerHTML = '⏸ Pause'; let last = 0;
      auto = loop(function (t) { if (t - last > 55) { last = t; for (let i = 0; i < 4; i++) gdStep(); draw(); if (iter > 600 || !isFinite(mse())) { if (auto) { auto.stop(); auto = null; } runBtn.innerHTML = '▶ Run'; } } });
    });
    button(ctl, '⏮ reset', function () { reset(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Linear-regression gradient-descent visualizer: a scatter of points with a fitted line and vertical red residual segments. Each step updates the slope and intercept opposite the gradient of the mean squared error, so from a flat start the line rotates into the best fit and the MSE falls. A learning-rate slider controls step size; too large and the fit diverges. Run animates the training; Reset returns to a flat line.');
    genData(); draw();
  });


  /* ========================================================
     94. Logistic regression: learning a decision boundary (Machine Learning)
     ======================================================== */
  register({ id: 'ml-logreg-viz', topic: 'machine-learning', title: 'Logistic regression: learning a decision boundary', blurb: 'Train a classifier by gradient descent on cross-entropy. The background shades by the predicted probability — a smooth confidence ramp from one class to the other — and the straight decision boundary (p = 0.5) rotates into place as the loss falls. The boundary stays linear; the sigmoid only sets how fast confidence changes.' },
  function (root) {
    const W = 540, H = 380, padL = 10, padR = 10, padT = 10, padB = 10, RG = 8;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 55;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function sig(z) { return 1 / (1 + Math.exp(-z)); }
    let lr = 0.3, w1 = 0, w2 = 0, b = 0, iter = 0, pts = [];
    function genData() { seed = 55; pts = []; for (let i = 0; i < 16; i++) pts.push({ x: 2.6 + gss() * 1.3, y: 5.4 + gss() * 1.3, c: 0 }); for (let i = 0; i < 16; i++) pts.push({ x: 5.4 + gss() * 1.3, y: 2.6 + gss() * 1.3, c: 1 }); }
    function gdStep() { let d1 = 0, d2 = 0, db = 0; const n = pts.length; pts.forEach(p => { const e = sig(w1 * p.x + w2 * p.y + b) - p.c; d1 += e * p.x / n; d2 += e * p.y / n; db += e / n; }); w1 -= lr * d1; w2 -= lr * d2; b -= lr * db; iter++; }
    function loss() { let s = 0; pts.forEach(p => { const pr = sig(w1 * p.x + w2 * p.y + b); s += -(p.c * Math.log(pr + 1e-9) + (1 - p.c) * Math.log(1 - pr + 1e-9)); }); return s / pts.length; }
    function acc() { let k = 0; pts.forEach(p => { if ((sig(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0) === p.c) k++; }); return k / pts.length; }
    function reset() { w1 = 0; w2 = 0; b = 0; iter = 0; draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = x => padL + x / RG * (W - padL - padR), Y = y => (H - padB) - y / RG * (H - padT - padB);
      const cw = 10, cellsX = Math.ceil((W - padL - padR) / cw), cellsY = Math.ceil((H - padT - padB) / cw);
      const colA = p.sage, colB = p.violet;
      for (let i = 0; i < cellsX; i++) for (let j = 0; j < cellsY; j++) {
        const px = padL + (i + 0.5) * cw, py = padT + (j + 0.5) * cw;
        const dx = (px - padL) / (W - padL - padR) * RG, dy = (Y(0) - py) / (H - padT - padB) * RG;
        const pr = sig(w1 * dx + w2 * dy + b);
        ctx.fillStyle = colA; ctx.globalAlpha = (1 - pr) * 0.28; ctx.fillRect(padL + i * cw, padT + j * cw, cw, cw);
        ctx.fillStyle = colB; ctx.globalAlpha = pr * 0.28; ctx.fillRect(padL + i * cw, padT + j * cw, cw, cw);
      }
      ctx.globalAlpha = 1;
      // decision boundary p=0.5  <=>  w1 x + w2 y + b = 0
      if (Math.abs(w2) > 1e-6) { const y0 = -(w1 * 0 + b) / w2, y8 = -(w1 * RG + b) / w2; ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(0), Y(y0)); ctx.lineTo(X(RG), Y(y8)); ctx.stroke(); }
      pts.forEach(pt => { ctx.fillStyle = pt.c === 0 ? colA : colB; ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 5, 0, 7); ctx.fill(); ctx.stroke(); });
      info.innerHTML = 'step <b>' + iter + '</b> &middot; cross-entropy loss = <b style="color:' + p.gold + '">' + loss().toFixed(3) + '</b> &middot; training accuracy = <b style="color:' + p.sage + '">' + Math.round(acc() * 100) + '%</b><br>The shading is the predicted probability of the violet class (a smooth sigmoid ramp); the gold line is the decision boundary at p = 0.5. From a flat start it rotates into place as gradient descent lowers the loss. The boundary stays straight — only the steepness of the ramp changes.';
    }
    slider(ctl, { label: 'learning rate', min: 0.05, max: 0.8, step: 0.05, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; } });
    button(ctl, 'Step', function () { for (let i = 0; i < 5; i++) gdStep(); draw(); });
    let auto = null;
    const runBtn = button(ctl, '▶ Run', function () {
      if (auto) { auto.stop(); auto = null; runBtn.innerHTML = '▶ Run'; return; }
      runBtn.innerHTML = '⏸ Pause'; let last = 0;
      auto = loop(function (t) { if (t - last > 55) { last = t; for (let i = 0; i < 5; i++) gdStep(); draw(); if (iter > 1200) { if (auto) { auto.stop(); auto = null; } runBtn.innerHTML = '▶ Run'; } } });
    });
    button(ctl, '⏮ reset', function () { reset(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Logistic-regression visualizer: two classes of points on a plane, with the background shaded by the predicted probability of one class — a smooth sigmoid confidence ramp — and a straight decision boundary at probability 0.5. Gradient descent on cross-entropy rotates the boundary into place as the loss falls and accuracy rises; the boundary stays linear while the steepness of the probability ramp changes. A learning-rate slider, Step, Run, and Reset control the training.');
    genData(); draw();
  });


  /* ========================================================
     95. Bias-variance: polynomials of growing degree (Machine Learning)
     ======================================================== */
  register({ id: 'ml-bias-variance-viz', topic: 'machine-learning', title: 'Bias–variance: fitting polynomials of growing degree', blurb: 'Drag the degree. A low-degree polynomial underfits (high error everywhere); a very high degree wiggles through every noisy point, driving training error toward zero while the error on unseen data climbs back up. The sweet spot in between is the bias–variance trade-off — the heart of model selection.' },
  function (root) {
    const W = 540, H = 380, padL = 12, padR = 12, padT = 14, padB = 14;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 99;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    const truef = x => 0.6 * Math.sin(2.5 * x) + 0.15 * x;
    let pts = [], degree = 1;
    function genData() { seed = 99; pts = []; const N = 11; for (let i = 0; i < N; i++) { const x = -1 + 2 * i / (N - 1); pts.push({ x: x, y: truef(x) + gauss() * 0.12 }); } }
    function polyfit(deg) {
      const n = deg + 1, lambda = 1e-7;
      const X = pts.map(p => { const r = []; for (let j = 0; j < n; j++) r.push(Math.pow(p.x, j)); return r; });
      const A = [], b = [];
      for (let i = 0; i < n; i++) { A.push(new Array(n).fill(0)); b.push(0); }
      for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) { let s = 0; for (let k = 0; k < pts.length; k++) s += X[k][i] * X[k][j]; A[i][j] = s + (i === j ? lambda : 0); } let s2 = 0; for (let k = 0; k < pts.length; k++) s2 += X[k][i] * pts[k].y; b[i] = s2; }
      for (let col = 0; col < n; col++) { let piv = col; for (let r = col + 1; r < n; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r; const ta = A[col]; A[col] = A[piv]; A[piv] = ta; const tb = b[col]; b[col] = b[piv]; b[piv] = tb; for (let r = 0; r < n; r++) { if (r === col) continue; const f = A[r][col] / A[col][col]; for (let j = col; j < n; j++) A[r][j] -= f * A[col][j]; b[r] -= f * b[col]; } }
      const w = []; for (let i = 0; i < n; i++) w.push(b[i] / A[i][i]); return w;
    }
    const evalP = (w, x) => w.reduce((s, cf, j) => s + cf * Math.pow(x, j), 0);
    function errs(w) { let tr = 0; pts.forEach(p => { const e = evalP(w, p.x) - p.y; tr += e * e; }); tr /= pts.length; let te = 0, M = 120; for (let i = 0; i < M; i++) { const x = -1 + 2 * i / (M - 1); const e = evalP(w, x) - truef(x); te += e * e; } te /= M; return { train: tr, test: te }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const XR = 1.15, YR = 1.15;
      const X = x => padL + (x + XR) / (2 * XR) * (W - padL - padR), Y = y => (H / 2) - y / YR * (H / 2 - padT);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      // true function (faint)
      ctx.strokeStyle = p.sage; ctx.globalAlpha = 0.5; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath();
      for (let i = 0; i <= 160; i++) { const x = -1 + 2 * i / 160; const px = X(x), py = Y(truef(x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      const w = polyfit(degree);
      // fitted polynomial (clipped to plot area)
      ctx.save(); ctx.beginPath(); ctx.rect(padL, padT, W - padL - padR, H - padT - padB); ctx.clip();
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = -1.05 + 2.1 * i / 240; const px = X(x), py = Y(evalP(w, x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore();
      // training points
      pts.forEach(pt => { ctx.fillStyle = p.gold; ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 5, 0, 7); ctx.fill(); ctx.stroke(); });
      const e = errs(w);
      const verdict = e.train > 0.02 ? ['underfitting — too simple (high bias)', p.gold] : (e.test > e.train * 2.2 ? ['overfitting — chasing the noise (high variance)', p.rust] : ['good fit — near the sweet spot', p.sage]);
      info.innerHTML = 'degree <b>' + degree + '</b> &middot; training error <b style="color:' + p.gold + '">' + e.train.toFixed(4) + '</b> &middot; error on unseen data <b style="color:' + p.rust + '">' + e.test.toFixed(4) + '</b><br><b style="color:' + verdict[1] + '">' + verdict[0] + '</b>. The dashed line is the true signal, gold dots are noisy training data, the violet curve is the degree-' + degree + ' fit. Push the degree up: training error keeps falling, but the error on unseen data turns back up as the curve wiggles to hit every point.';
    }
    slider(ctl, { label: 'polynomial degree', min: 1, max: 10, step: 1, value: degree, fmt: v => String(v), onInput: v => { degree = v; draw(); } });
    button(ctl, '⏮ reset', function () { degree = 1; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Bias-variance visualizer: noisy training points sampled from a smooth true curve, fitted by a polynomial whose degree you set with a slider. At low degree the fit underfits (high bias); at high degree it wiggles through every point, driving training error toward zero while the error on unseen data climbs (high variance). Live training-error and unseen-data-error readouts and a verdict (underfitting / good fit / overfitting) update with the degree.');
    genData(); draw();
  });


  /* ========================================================
     96. Bagging: averaging tames variance (Machine Learning)
     ======================================================== */
  register({ id: 'ml-bagging-viz', topic: 'machine-learning', title: 'Bagging: averaging tames variance', blurb: 'Each model is a high-degree fit on a different bootstrap resample of the data — individually they overfit wildly (the thin spaghetti). Drag up the number of models and watch their average (the bold curve) collapse onto the true signal. Same idea as a random forest: many high-variance learners, averaged, become one low-variance predictor.' },
  function (root) {
    const W = 540, H = 380, padL = 12, padR = 12, padT = 14, padB = 14, DEG = 8, MAXM = 24;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let seed = 2024;
    function rng() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    function gauss() { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    const truef = x => 0.6 * Math.sin(2.5 * x) + 0.15 * x;
    const N = 11;
    let base = [], models = [], M = 1;
    function polyfit(pts, deg, lambda) {
      const n = deg + 1;
      const X = pts.map(p => { const r = []; for (let j = 0; j < n; j++) r.push(Math.pow(p.x, j)); return r; });
      const A = [], b = [];
      for (let i = 0; i < n; i++) { A.push(new Array(n).fill(0)); b.push(0); }
      for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) { let s = 0; for (let k = 0; k < pts.length; k++) s += X[k][i] * X[k][j]; A[i][j] = s + (i === j ? lambda : 0); } let s2 = 0; for (let k = 0; k < pts.length; k++) s2 += X[k][i] * pts[k].y; b[i] = s2; }
      for (let col = 0; col < n; col++) { let piv = col; for (let r = col + 1; r < n; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r; const ta = A[col]; A[col] = A[piv]; A[piv] = ta; const tb = b[col]; b[col] = b[piv]; b[piv] = tb; for (let r = 0; r < n; r++) { if (r === col) continue; const f = A[r][col] / A[col][col]; for (let j = col; j < n; j++) A[r][j] -= f * A[col][j]; b[r] -= f * b[col]; } }
      const w = []; for (let i = 0; i < n; i++) w.push(b[i] / A[i][i]); return w;
    }
    const evalP = (w, x) => w.reduce((s, cf, j) => s + cf * Math.pow(x, j), 0);
    function build() {
      seed = 2024; base = []; for (let i = 0; i < N; i++) { const x = -1 + 2 * i / (N - 1); base.push({ x: x, y: truef(x) + gauss() * 0.13 }); }
      models = []; for (let m = 0; m < MAXM; m++) { const s = []; for (let i = 0; i < N; i++) s.push(base[Math.floor(rng() * N)]); models.push(polyfit(s, DEG, 1e-6)); }
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const XR = 1.15, YR = 1.35;
      const X = x => padL + (x + XR) / (2 * XR) * (W - padL - padR), Y = y => (H / 2) - y / YR * (H / 2 - padT);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.rect(padL, padT, W - padL - padR, H - padT - padB); ctx.clip();
      // individual models (thin spaghetti)
      ctx.strokeStyle = p.rust; ctx.globalAlpha = Math.max(0.1, 0.5 / Math.sqrt(M)); ctx.lineWidth = 1;
      for (let m = 0; m < M; m++) { ctx.beginPath(); for (let i = 0; i <= 160; i++) { const x = -1.05 + 2.1 * i / 160; const px = X(x), py = Y(evalP(models[m], x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
      ctx.globalAlpha = 1;
      // true function (dashed)
      ctx.strokeStyle = p.sage; ctx.globalAlpha = 0.55; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath();
      for (let i = 0; i <= 160; i++) { const x = -1 + 2 * i / 160; const px = X(x), py = Y(truef(x)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      // ensemble average (bold)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const x = -1.05 + 2.1 * i / 200; let s = 0; for (let m = 0; m < M; m++) s += evalP(models[m], x); const px = X(x), py = Y(s / M); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      ctx.restore();
      base.forEach(pt => { ctx.fillStyle = p.ink2 || p.line; ctx.strokeStyle = p.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(X(pt.x), Y(pt.y), 3.5, 0, 7); ctx.fillStyle = p.violet; ctx.fill(); ctx.stroke(); });
      // errors vs true
      const G = 100; let single = 0, ens = 0;
      for (let i = 0; i <= G; i++) { const x = -1 + 2 * i / G; const t = truef(x); let avg = 0, sm = 0; for (let m = 0; m < M; m++) { const v = evalP(models[m], x); sm += (v - t) * (v - t); avg += v; } single += sm / M; const ed = avg / M - t; ens += ed * ed; }
      single /= (G + 1); ens /= (G + 1);
      info.innerHTML = 'models in the ensemble: <b>' + M + '</b> &middot; avg single-model error: <b style="color:' + p.rust + '">' + single.toFixed(2) + '</b> &middot; ensemble (averaged) error: <b style="color:' + p.gold + '">' + ens.toFixed(2) + '</b><br>Thin rust curves are individual degree-' + DEG + ' fits, each on a different bootstrap resample — wild on their own. The bold gold curve is their average; the dashed line is the true signal. Add models and the average collapses onto the truth even though no single model is good — that is bagging.';
    }
    slider(ctl, { label: 'number of models', min: 1, max: MAXM, step: 1, value: M, fmt: v => String(v), onInput: v => { M = v; draw(); } });
    button(ctl, '⏮ reset', function () { M = 1; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Bagging visualizer: many high-degree polynomial fits, each trained on a different bootstrap resample of the same noisy data, are drawn as thin curves that overfit wildly. A slider sets how many are averaged; their mean (a bold curve) collapses onto the true signal as the count grows, with the ensemble error dropping far below the average single-model error — the variance reduction behind bagging and random forests.');
    build(); draw();
  });


  /* ========================================================
     97. Binary entropy: uncertainty peaks in the middle (Information Theory)
     ======================================================== */
  register({ id: 'it-entropy-viz', topic: 'information-theory', title: 'Binary entropy: uncertainty peaks in the middle', blurb: 'The entropy of a coin with bias p. Drag p and watch the curve H(p) = -p log2 p - (1-p) log2(1-p): it rises to a maximum of exactly 1 bit at a fair coin (p = 0.5, maximal uncertainty) and falls to 0 at the certain extremes (p = 0 or 1). The whole of information theory starts here.' },
  function (root) {
    const W = 540, H = 360, padL = 46, padR = 16, padT = 18, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let p = 0.5;
    const log2 = x => Math.log(x) / Math.log(2);
    const Hb = q => (q <= 0 || q >= 1) ? 0 : -(q * log2(q) + (1 - q) * log2(1 - q));
    function draw() {
      const P_ = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = P_.bg; ctx.fillRect(0, 0, W, H);
      const X = v => padL + v * (W - padL - padR), Y = v => (H - padB) - v * (H - padT - padB);
      // axes
      ctx.strokeStyle = P_.line; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(0)); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(1.05)); ctx.stroke();
      ctx.fillStyle = P_.ink_mute || P_.line; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('0', X(0), Y(0) + 16); ctx.fillText('0.5', X(0.5), Y(0) + 16); ctx.fillText('1', X(1), Y(0) + 16);
      ctx.fillText('p (probability of heads)', X(0.5), H - 6);
      ctx.textAlign = 'right'; ctx.fillText('1 bit', X(0) - 6, Y(1) + 4); ctx.fillText('0', X(0) - 6, Y(0) + 4);
      // gridline at H=1
      ctx.strokeStyle = P_.line; ctx.globalAlpha = 0.4; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(1)); ctx.lineTo(X(1), Y(1)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      // the binary entropy curve
      ctx.strokeStyle = P_.sage; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const q = i / 240; const px = X(q), py = Y(Hb(q)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      // guide lines + dot at current p
      const hp = Hb(p);
      ctx.strokeStyle = P_.gold; ctx.globalAlpha = 0.55; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(X(p), Y(0)); ctx.lineTo(X(p), Y(hp)); ctx.lineTo(X(0), Y(hp)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      ctx.fillStyle = P_.gold; ctx.strokeStyle = P_.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(p), Y(hp), 6, 0, 7); ctx.fill(); ctx.stroke();
      // little coin distribution bars (top-right)
      const bx = X(1) - 92, by = padT + 6, bw = 34, bh = 54;
      [['heads', p, P_.gold], ['tails', 1 - p, P_.sage]].forEach((d, k) => {
        const x0 = bx + k * (bw + 12); ctx.fillStyle = P_.line; ctx.globalAlpha = 0.3; ctx.fillRect(x0, by, bw, bh); ctx.globalAlpha = 1;
        ctx.fillStyle = d[2]; ctx.fillRect(x0, by + bh * (1 - d[1]), bw, bh * d[1]);
        ctx.fillStyle = P_.ink_mute || P_.line; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText(d[1].toFixed(2), x0 + bw / 2, by + bh + 12);
      });
      const verdict = hp > 0.95 ? 'maximally uncertain (a fair coin)' : hp < 0.15 ? 'nearly certain — little information per flip' : 'partly predictable';
      info.innerHTML = 'p = <b>' + p.toFixed(2) + '</b> &middot; entropy H(p) = <b style="color:' + P_.gold + '">' + hp.toFixed(3) + '</b> bits &middot; ' + verdict + '.<br>Entropy is the average surprise per flip. It is largest (1 bit) at p = 0.5 where the coin is hardest to predict, and drops to 0 as p approaches 0 or 1, where the outcome is certain and a flip tells you nothing.';
    }
    slider(ctl, { label: 'bias p (heads)', min: 0.01, max: 0.99, step: 0.01, value: p, fmt: v => v.toFixed(2), onInput: v => { p = v; draw(); } });
    button(ctl, '⏮ fair coin', function () { p = 0.5; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Binary entropy visualizer: the curve H(p) = -p log2 p - (1-p) log2(1-p) plotted against the coin bias p. A draggable point shows the current entropy; it peaks at exactly 1 bit when p = 0.5 (a fair coin, maximal uncertainty) and falls to 0 at p = 0 or p = 1 (a certain outcome). Two bars show the current heads/tails probabilities.');
    draw();
  });


  /* ========================================================
     98. Mutual information: the overlap of two uncertainties (Information Theory)
     ======================================================== */
  register({ id: 'it-mutual-info-viz', topic: 'information-theory', title: 'Mutual information: the overlap of two uncertainties', blurb: 'Two circles, one for the uncertainty in X and one for Y (each 1 bit here). Their overlap is the mutual information I(X;Y) — what they share. Drag the dependence: independent variables (no overlap, I = 0) slide apart; as they become more dependent the circles merge until, when one determines the other, they coincide (I = 1 bit). The crescents are the conditional entropies that remain.' },
  function (root) {
    const W = 540, H = 360;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let dep = 0.5;
    const log2 = x => Math.log(x) / Math.log(2);
    const Hb = a => (a <= 0 || a >= 1) ? 0 : -(a * log2(a) + (1 - a) * log2(1 - a));
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const a = 0.5 + 0.5 * dep;          // agreement probability
      const I = 1 - Hb(a);                // mutual information (bits)
      const Hcond = Hb(a);                // H(X|Y) = H(Y|X) here
      const Hjoint = 1 + Hcond;           // H(X,Y)
      const R = 96, cy = 150;
      const d = 2 * R * (1 - I);          // center separation: I=0 -> tangent, I=1 -> coincident
      const cxL = W / 2 - d / 2, cxR = W / 2 + d / 2;
      // circles (semi-transparent so the lens blends)
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(cxL, cy, R, 0, 7); ctx.fill();
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(cxR, cy, R, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = p.ink; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cxL, cy, R, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.arc(cxR, cy, R, 0, 7); ctx.stroke();
      // labels
      ctx.fillStyle = p.ink; ctx.textAlign = 'center';
      ctx.font = 'bold 13px ' + (cssVar('--font-disp') || 'serif');
      ctx.fillText('H(X)', cxL - R * 0.55, cy - R - 8);
      ctx.fillText('H(Y)', cxR + R * 0.55, cy - R - 8);
      ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace');
      ctx.fillStyle = p.ink_mute || p.ink;
      if (d > 18) { ctx.fillText('H(X|Y)', cxL - d / 2 - R * 0.1, cy + 4); ctx.fillText('H(Y|X)', cxR + d / 2 + R * 0.1, cy + 4); }
      // I(X;Y) label in the lens
      if (I > 0.04) { ctx.fillStyle = p.gold; ctx.font = 'bold 13px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('I = ' + I.toFixed(2), W / 2, cy + 5); }
      info.innerHTML = 'dependence <b>' + dep.toFixed(2) + '</b> &middot; mutual information I(X;Y) = <b style="color:' + p.gold + '">' + I.toFixed(2) + '</b> bits' +
        '<br>H(X) = H(Y) = <b>1.00</b> &middot; H(X|Y) = <b>' + Hcond.toFixed(2) + '</b> &middot; joint H(X,Y) = <b>' + Hjoint.toFixed(2) + '</b>. ' +
        (I < 0.03 ? 'Independent: the circles barely touch — knowing one tells you nothing about the other.' : I > 0.97 ? 'Fully dependent: the circles coincide — one variable determines the other.' : 'Partly dependent: the overlap is the shared information; the crescents are what stays uncertain.');
    }
    slider(ctl, { label: 'dependence', min: 0, max: 1, step: 0.01, value: dep, fmt: v => v.toFixed(2), onInput: v => { dep = v; draw(); } });
    button(ctl, '⏮ independent', function () { dep = 0; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Mutual information Venn visualizer: two circles for the entropies H(X) and H(Y), each one bit. Their overlap is the mutual information I(X;Y). A dependence slider moves the circles: at zero dependence they are tangent with no overlap (I = 0, independent); as dependence rises the overlap grows until the circles coincide (I = 1 bit, one variable determines the other). Live readouts show I, the conditional entropy H(X|Y), and the joint entropy H(X,Y).');
    draw();
  });


  /* ========================================================
     99. Binary symmetric channel: noise vs capacity (Information Theory)
     ======================================================== */
  register({ id: 'it-channel-capacity-viz', topic: 'information-theory', title: 'Binary symmetric channel: noise versus capacity', blurb: 'A bit sent through a noisy channel arrives flipped with probability p. The left panel shows the channel (correct paths in sage, flips in rust, thickness = probability); the right plots the capacity C = 1 - H(p) in bits per use. Drag p: a clean channel (p=0) carries a full 1 bit, a useless one (p=0.5) carries 0, and noise in between cuts the rate. Capacity is symmetric — near p=1 you just invert every bit.' },
  function (root) {
    const W = 560, H = 340, padL = 250, padR = 16, padT = 22, padB = 38;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let p = 0.11;
    const log2 = x => Math.log(x) / Math.log(2);
    const Hb = q => (q <= 0 || q >= 1) ? 0 : -(q * log2(q) + (1 - q) * log2(1 - q));
    function arrow(x1, y1, x2, y2, col, w) {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const a = Math.atan2(y2 - y1, x2 - x1), s = 7;
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4)); ctx.lineTo(x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill();
    }
    function draw() {
      const pp = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pp.bg; ctx.fillRect(0, 0, W, H);
      const C = 1 - Hb(p);
      // ---------- left: BSC schematic ----------
      const ix = 70, ox = 188, yT = 116, yB = 214, r = 17;
      ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillStyle = pp.mute;
      ctx.fillText('send', ix, yT - 40); ctx.fillText('receive', ox, yT - 40);
      // flip arrows (rust) first so correct arrows sit on top
      arrow(ix + r, yT + 4, ox - r, yB - 4, pp.rust, 1 + 5 * p);
      arrow(ix + r, yB - 4, ox - r, yT + 4, pp.rust, 1 + 5 * p);
      // correct arrows (sage)
      arrow(ix + r, yT, ox - r, yT, pp.sage, 1 + 5 * (1 - p));
      arrow(ix + r, yB, ox - r, yB, pp.sage, 1 + 5 * (1 - p));
      [[ix, yT, '0'], [ix, yB, '1'], [ox, yT, '0'], [ox, yB, '1']].forEach(function (n) {
        ctx.fillStyle = pp.panel; ctx.strokeStyle = pp.line; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n[0], n[1], r, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = pp.ink; ctx.font = 'bold 14px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText(n[2], n[0], n[1] + 5);
      });
      ctx.fillStyle = pp.sage; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
      ctx.fillText('1−p = ' + (1 - p).toFixed(2), ix + 26, yT - 8);
      ctx.fillStyle = pp.rust; ctx.fillText('p = ' + p.toFixed(2) + '  (flip)', ix + 22, (yT + yB) / 2 + 4);
      // ---------- right: capacity curve C(p) ----------
      const X = v => padL + v * (W - padL - padR), Y = v => (H - padB) - v * (H - padT - padB);
      ctx.strokeStyle = pp.line; ctx.lineWidth = 1; ctx.textAlign = 'center';
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(0)); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(1.05)); ctx.stroke();
      ctx.fillStyle = pp.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace');
      ctx.fillText('0', X(0), Y(0) + 14); ctx.fillText('0.5', X(0.5), Y(0) + 14); ctx.fillText('1', X(1), Y(0) + 14);
      ctx.fillText('flip probability p', X(0.5), H - 8);
      ctx.textAlign = 'right'; ctx.fillText('C=1', X(0) - 5, Y(1) + 4); ctx.fillText('0', X(0) - 5, Y(0) + 4);
      ctx.strokeStyle = pp.line; ctx.globalAlpha = 0.4; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(1)); ctx.lineTo(X(1), Y(1)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      ctx.strokeStyle = pp.gold; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const q = i / 200, px = X(q), py = Y(1 - Hb(q)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      // current point
      ctx.strokeStyle = pp.gold; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(X(p), Y(0)); ctx.lineTo(X(p), Y(C)); ctx.lineTo(X(0), Y(C)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      ctx.fillStyle = pp.violet; ctx.strokeStyle = pp.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(p), Y(C), 6, 0, 7); ctx.fill(); ctx.stroke();
      const verdict = C > 0.97 ? 'a near-perfect channel' : C < 0.05 ? 'useless — output independent of input' : 'noise cuts the usable rate';
      info.innerHTML = 'flip probability p = <b>' + p.toFixed(2) + '</b> &middot; capacity C = 1 − H(p) = <b style="color:' + pp.gold + '">' + C.toFixed(3) + '</b> bits per use &middot; ' + verdict + '.<br>Reliable communication is possible at any rate below C and impossible above it. Capacity is highest at p = 0 or 1 (1 bit) and zero at the maximally-confusing p = 0.5.';
    }
    slider(ctl, { label: 'flip probability p', min: 0, max: 1, step: 0.01, value: p, fmt: v => v.toFixed(2), onInput: v => { p = v; draw(); } });
    button(ctl, '⏮ noiseless', function () { p = 0; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Binary symmetric channel visualizer. Left: two input bits 0 and 1 connect to two output bits; correct paths (probability 1 minus p) are drawn in sage and flip paths (probability p) in rust, with line thickness proportional to probability. Right: the channel capacity C = 1 minus the binary entropy H(p), plotted against the flip probability p, with a marker at the current p. Capacity is 1 bit at p = 0 or 1, falls to 0 at p = 0.5, and is symmetric about 0.5.');
    draw();
  });


  /* ========================================================
     100. Huffman coding: the optimal prefix code tree (Information Theory)
     ======================================================== */
  register({ id: 'it-source-coding-viz', topic: 'information-theory', title: 'Huffman coding: building the optimal prefix code', blurb: 'Huffman builds the optimal prefix code by repeatedly merging the two least-likely symbols into a binary tree. Each leaf is a symbol; reading the path from the root (left = 0, right = 1) gives its codeword. Frequent symbols sit near the root and get short codes. Compare distributions: the expected code length L equals the entropy H exactly for dyadic probabilities, and stays within 1 bit otherwise — never below, since entropy is the floor.' },
  function (root) {
    const W = 560, H = 384, padT = 30, padB = 60, padX = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const PRESETS = {
      Dyadic: [['A', 0.5], ['B', 0.25], ['C', 0.125], ['D', 0.125]],
      Skewed: [['A', 0.6], ['B', 0.2], ['C', 0.12], ['D', 0.08]],
      Uniform: [['A', 0.25], ['B', 0.25], ['C', 0.25], ['D', 0.25]]
    };
    let cur = 'Dyadic';
    const log2 = x => Math.log(x) / Math.log(2);
    function build(syms) {
      let nodes = syms.map(s => ({ p: s[1], sym: s[0] }));
      while (nodes.length > 1) { nodes.sort((a, b) => a.p - b.p); const a = nodes.shift(), b = nodes.shift(); nodes.push({ p: a.p + b.p, left: a, right: b }); }
      return nodes[0];
    }
    function draw() {
      const pp = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pp.bg; ctx.fillRect(0, 0, W, H);
      const syms = PRESETS[cur], tree = build(syms), leaves = [];
      (function walk(n, code, d) { if (n.sym !== undefined) { n.code = code; n.depth = d; leaves.push(n); return; } walk(n.left, code + '0', d + 1); walk(n.right, code + '1', d + 1); })(tree, '', 0);
      const maxD = Math.max(1, ...leaves.map(l => l.depth)), nL = leaves.length;
      const levelH = (H - padT - padB) / maxD, slotW = (W - 2 * padX) / nL;
      let li = 0;
      (function layout(n, d) { n.y = padT + d * levelH; if (n.sym !== undefined) { n.x = padX + (li + 0.5) * slotW; li++; return n.x; } const lx = layout(n.left, d + 1), rx = layout(n.right, d + 1); n.x = (lx + rx) / 2; return n.x; })(tree, 0);
      // edges + bit labels
      (function edges(n) { if (n.sym !== undefined) return;[['left', '0'], ['right', '1']].forEach(function (kb) { const ch = n[kb[0]], bit = kb[1]; ctx.strokeStyle = pp.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(ch.x, ch.y); ctx.stroke(); ctx.fillStyle = bit === '0' ? pp.sage : pp.gold; ctx.font = 'bold 12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText(bit, (n.x + ch.x) / 2 + (bit === '0' ? -9 : 9), (n.y + ch.y) / 2 - 1); edges(ch); }); })(tree);
      // nodes
      (function nodes(n) {
        if (n.sym !== undefined) {
          const bw = 50, bh = 36, x0 = n.x - bw / 2;
          ctx.fillStyle = pp.panel; ctx.strokeStyle = pp.violet; ctx.lineWidth = 1.5; ctx.fillRect(x0, n.y, bw, bh); ctx.strokeRect(x0, n.y, bw, bh);
          ctx.textAlign = 'center'; ctx.fillStyle = pp.ink; ctx.font = 'bold 13px ' + (cssVar('--font-disp') || 'serif'); ctx.fillText(n.sym + '  ' + n.p.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''), n.x, n.y + 15);
          ctx.fillStyle = pp.gold; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText(n.code, n.x, n.y + 29);
        } else { ctx.fillStyle = pp.gold; ctx.strokeStyle = pp.bg; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, 7); ctx.fill(); ctx.stroke(); nodes(n.left); nodes(n.right); }
      })(tree);
      const L = leaves.reduce((a, l) => a + l.p * l.depth, 0);
      const Hh = syms.reduce((a, s) => a - (s[1] > 0 ? s[1] * log2(s[1]) : 0), 0);
      info.innerHTML = 'Expected length L = <b style="color:' + pp.gold + '">' + L.toFixed(2) + '</b> bits/symbol &middot; entropy H = <b>' + Hh.toFixed(2) + '</b> bits &middot; efficiency ' + Math.round(Hh / L * 100) + '%.<br>' + (Math.abs(L - Hh) < 0.005 ? 'Dyadic probabilities — Huffman hits the entropy floor exactly (L = H).' : 'Huffman is optimal among prefix codes and within 1 bit of entropy (L is never below H).');
    }
    Object.keys(PRESETS).forEach(function (k) { button(ctl, k, function () { cur = k; draw(); }); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Huffman coding tree visualizer. For a chosen distribution over four symbols, the optimal prefix-code tree is drawn: internal nodes are gold dots, leaves are boxes showing each symbol, its probability, and its codeword. Edges are labelled 0 (left, sage) and 1 (right, gold), so a leaf\'s codeword is the path from the root. Frequent symbols get shorter codes. The readout gives the expected code length L and entropy H: equal for dyadic probabilities, otherwise L is within 1 bit of H and never below it.');
    draw();
  });


  /* ========================================================
     101. SVM: the maximum-margin boundary & support vectors (Machine Learning)
     ======================================================== */
  register({ id: 'ml-svm-viz', topic: 'machine-learning', title: 'SVM: the maximum-margin boundary & support vectors', blurb: 'Two classes split by a linear boundary. An SVM picks the boundary with the widest margin — and only the points ON the margin (the support vectors, circled) determine it; deleting any other point changes nothing. Drag C: a large C demands a hard, narrow margin (few support vectors); a small C allows a wider, softer margin (more support vectors), trading margin width against violations.' },
  function (root) {
    const W = 540, H = 360;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let C = 6;
    // points in a frame where signed distance to the boundary = fx (class = sign(fx)); fy runs along it
    const PTS = [
      [0.5, 0.2], [0.9, -0.4], [1.4, 0.5], [0.6, -0.8], [1.1, 0.9], [1.8, -0.1],   // class +1
      [-0.5, -0.3], [-0.9, 0.4], [-1.4, -0.5], [-0.6, 0.8], [-1.1, -0.9], [-1.8, 0.1] // class -1
    ];
    const th = 0.42, cs = Math.cos(th), sn = Math.sin(th), s = 66, cx = W / 2, cy = H / 2;
    const map = (fx, fy) => [cx + (fx * cs - fy * sn) * s, cy - (fx * sn + fy * cs) * s];
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const m = 0.5 + 1.1 * (1 - (C - 0.1) / 9.9);   // margin half-width: big C -> narrow, small C -> wide
      // margin band (shaded)
      const b1 = map(m, -3), b2 = map(m, 3), b3 = map(-m, 3), b4 = map(-m, -3);
      ctx.fillStyle = p.gold; ctx.globalAlpha = 0.08; ctx.beginPath(); ctx.moveTo(b1[0], b1[1]); ctx.lineTo(b2[0], b2[1]); ctx.lineTo(b3[0], b3[1]); ctx.lineTo(b4[0], b4[1]); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      // margin lines (dashed) + boundary (solid)
      ctx.strokeStyle = p.mute; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      [m, -m].forEach(off => { const a = map(off, -3), b = map(off, 3); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
      ctx.setLineDash([]); ctx.strokeStyle = p.ink; ctx.lineWidth = 2;
      { const a = map(0, -3), b = map(0, 3); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      // points; support vectors = within/on the margin (|fx| <= m)
      let nsv = 0;
      PTS.forEach(pt => {
        const [px, py] = map(pt[0], pt[1]); const sv = Math.abs(pt[0]) <= m + 0.001; if (sv) nsv++;
        const col = pt[0] > 0 ? p.violet : p.rust;
        if (sv) { ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(px, py, 10, 0, 7); ctx.stroke(); }
        ctx.fillStyle = col; ctx.strokeStyle = p.bg; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, 6, 0, 7); ctx.fill(); ctx.stroke();
      });
      // labels
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      const tlab = map(0, 3); ctx.fillText('boundary', tlab[0], tlab[1] - 8);
      info.innerHTML = 'C = <b>' + C.toFixed(1) + '</b> &middot; margin width <b style="color:' + p.gold + '">' + (2 * m).toFixed(2) + '</b> &middot; <b>' + nsv + '</b> support vector' + (nsv === 1 ? '' : 's') + ' (circled).<br>' + (C >= 5 ? 'High C: a hard, narrow margin — few support vectors, little tolerance for violations (low bias, higher variance).' : C <= 1 ? 'Low C: a wide, soft margin — many support vectors, more violations tolerated (higher bias, lower variance).' : 'Only the support vectors touch the margin; every other point could be deleted without moving the boundary.');
    }
    slider(ctl, { label: 'C (margin hardness)', min: 0.1, max: 10, step: 0.1, value: C, fmt: v => v.toFixed(1), onInput: v => { C = v; draw(); } });
    button(ctl, 'soft (C=0.5)', function () { C = 0.5; draw(); });
    button(ctl, 'hard (C=10)', function () { C = 10; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Support vector machine visualizer: two classes (violet and rust points) separated by a solid maximum-margin boundary with two dashed margin lines and a shaded margin band. Points lying on or inside the margin are the support vectors, circled in gold. A slider for C sets the margin hardness: large C gives a narrow margin with few support vectors; small C gives a wide, soft margin with more support vectors. Only the support vectors determine the boundary.');
    draw();
  });


  /* ========================================================
     102. L1 vs L2 regularization: why lasso zeros weights (Machine Learning)
     ======================================================== */
  register({ id: 'ml-reg-viz', topic: 'machine-learning', title: 'L1 vs L2: why lasso zeros coefficients', blurb: 'The unconstrained best fit sits off-axis (gold star). Regularization confines the solution to a budget region around the origin — a diamond for L1 (lasso), a circle for L2 (ridge) — and the answer is where the loss contours first touch that region. Shrink the budget: the L1 diamond has sharp corners ON the axes, so the touch point snaps to a corner and a coefficient becomes exactly 0 (sparsity); the smooth L2 circle touches off-axis, shrinking both but zeroing neither.' },
  function (root) {
    const W = 540, H = 360;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let mode = 'L1', t = 1.0;
    const ws = [2.6, 0.7];                 // unconstrained (OLS) optimum
    const loss = (a, b) => (a - ws[0]) * (a - ws[0]) + (b - ws[1]) * (b - ws[1]);
    const s = 64, cx = 150, cy = 232;
    const map = (a, b) => [cx + a * s, cy - b * s];
    function solve() {
      // inside the budget? then no shrinkage
      const norm = mode === 'L2' ? Math.hypot(ws[0], ws[1]) : Math.abs(ws[0]) + Math.abs(ws[1]);
      if (norm <= t) return ws.slice();
      let best = [1e9, 0, 0];
      if (mode === 'L2') { for (let i = 0; i < 720; i++) { const th = i * Math.PI / 360, a = t * Math.cos(th), b = t * Math.sin(th), L = loss(a, b); if (L < best[0]) best = [L, a, b]; } }
      else { const V = [[t, 0], [0, t], [-t, 0], [0, -t]]; for (let e = 0; e < 4; e++) { const p = V[e], q = V[(e + 1) % 4]; for (let k = 0; k <= 120; k++) { const f = k / 120, a = p[0] + (q[0] - p[0]) * f, b = p[1] + (q[1] - p[1]) * f, L = loss(a, b); if (L < best[0]) best = [L, a, b]; } } }
      return [best[1], best[2]];
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      const xa = map(-0.8, 0), xb = map(3.6, 0), ya = map(0, -1.4), yb = map(0, 2.0);
      ctx.beginPath(); ctx.moveTo(xa[0], xa[1]); ctx.lineTo(xb[0], xb[1]); ctx.moveTo(ya[0], ya[1]); ctx.lineTo(yb[0], yb[1]); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
      ctx.fillText('w1', xb[0] - 18, xb[1] + 16); ctx.fillText('w2', yb[0] + 6, yb[1] + 4);
      // loss contours around w*
      ctx.strokeStyle = p.sage; ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
      [0.45, 0.9, 1.4, 1.95].forEach(r => { ctx.beginPath(); ctx.ellipse(map(ws[0], ws[1])[0], map(ws[0], ws[1])[1], r * s, r * s, 0, 0, 7); ctx.stroke(); }); ctx.globalAlpha = 1;
      // budget region
      ctx.strokeStyle = p.gold; ctx.fillStyle = p.gold; ctx.lineWidth = 2; ctx.globalAlpha = 0.1;
      ctx.beginPath();
      if (mode === 'L2') { const o = map(0, 0); ctx.ellipse(o[0], o[1], t * s, t * s, 0, 0, 7); }
      else { const v = [map(t, 0), map(0, t), map(-t, 0), map(0, -t)]; ctx.moveTo(v[0][0], v[0][1]); ctx.lineTo(v[1][0], v[1][1]); ctx.lineTo(v[2][0], v[2][1]); ctx.lineTo(v[3][0], v[3][1]); ctx.closePath(); }
      ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
      // OLS optimum (star-ish) and constrained solution
      const wo = map(ws[0], ws[1]); ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(wo[0], wo[1], 5, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('best fit', wo[0], wo[1] - 10);
      const sol = solve(), sp = map(sol[0], sol[1]);
      const sparse = Math.abs(sol[0]) < 0.04 || Math.abs(sol[1]) < 0.04;
      ctx.fillStyle = sparse ? p.rust : p.violet; ctx.strokeStyle = p.bg; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(sp[0], sp[1], 7, 0, 7); ctx.fill(); ctx.stroke();
      info.innerHTML = '<b>' + (mode === 'L1' ? 'L1 (lasso) — diamond' : 'L2 (ridge) — circle') + '</b> &middot; budget t = <b>' + t.toFixed(2) + '</b> &middot; solution w = (<b>' + sol[0].toFixed(2) + ', ' + sol[1].toFixed(2) + '</b>)' + (sparse ? ' &middot; <b style="color:' + p.rust + '">a weight is exactly 0 — sparse!</b>' : '') + '.<br>' + (mode === 'L1' ? 'The diamond’s corners lie on the axes, so the contour usually first touches at a corner — driving the smaller weight to exactly 0. That is how lasso does feature selection.' : 'The circle is smooth, so the touch point sits off-axis: both weights shrink toward 0 but neither becomes exactly 0.');
    }
    button(ctl, 'L1 (lasso)', function () { mode = 'L1'; draw(); });
    button(ctl, 'L2 (ridge)', function () { mode = 'L2'; draw(); });
    slider(ctl, { label: 'budget t (smaller = stronger penalty)', min: 0.3, max: 3, step: 0.05, value: t, fmt: v => v.toFixed(2), onInput: v => { t = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Regularization geometry visualizer in the plane of two weights w1 and w2. Sage loss contours circle the unconstrained best-fit point (off-axis). A gold budget region around the origin is a diamond for L1 (lasso) or a circle for L2 (ridge); a slider shrinks it. The constrained solution is where the contours first touch the region: for L1 it snaps to a diamond corner on an axis, making one weight exactly zero (sparse, shown in rust); for L2 it sits off-axis so both weights merely shrink.');
    draw();
  });


  /* ========================================================
     103. Naive Bayes: how words tip the spam odds (Machine Learning)
     ======================================================== */
  register({ id: 'ml-nb-viz', topic: 'machine-learning', title: 'Naive Bayes: how words tip the spam odds', blurb: 'A spam filter as evidence on a log-odds line. Start at the prior, then each word present in the email shifts the odds by its likelihood ratio P(word|spam)/P(word|ham) — spammy words push right, hammy words push left. Because Naive Bayes treats words as independent, multiplying the ratios is just ADDING their shifts; the email is spam if the total lands past the midpoint (P = 0.5). Toggle words and watch the verdict move.' },
  function (root) {
    const W = 540, H = 360, padL = 40, padR = 24, yAx = 250;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const WORDS = [
      { w: 'free', ps: 0.5, ph: 0.1 }, { w: 'winner', ps: 0.3, ph: 0.02 }, { w: 'money', ps: 0.4, ph: 0.1 },
      { w: 'click', ps: 0.35, ph: 0.08 }, { w: 'meeting', ps: 0.05, ph: 0.4 }, { w: 'project', ps: 0.03, ph: 0.3 }
    ];
    const on = { free: true, winner: true };          // initial email
    const L0 = Math.log(0.4 / 0.6), LMAX = 6;
    const X = L => padL + (L + LMAX) / (2 * LMAX) * (W - padL - padR);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      let L = L0; WORDS.forEach(d => { if (on[d.w]) L += Math.log(d.ps / d.ph); });
      L = Math.max(-LMAX, Math.min(LMAX, L));
      const Pspam = 1 / (1 + Math.exp(-L));
      // axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(-LMAX), yAx); ctx.lineTo(X(LMAX), yAx); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('← ham', X(-LMAX) + 26, yAx + 22); ctx.fillText('spam →', X(LMAX) - 28, yAx + 22);
      // decision threshold at L=0
      ctx.strokeStyle = p.mute; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(0), yAx - 70); ctx.lineTo(X(0), yAx + 8); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.mute; ctx.fillText('decision (P=0.5)', X(0), yAx - 78);
      // waterfall of shifts from prior -> posterior
      let run = L0, y = yAx - 58;
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(L0), yAx, 5, 0, 7); ctx.fill();
      ctx.textAlign = 'center'; ctx.fillStyle = p.mute; ctx.fillText('prior', X(L0), yAx + 22 - 0);
      WORDS.forEach(d => {
        if (!on[d.w]) return; const sh = Math.log(d.ps / d.ph); const a = run, b = run + sh; run = b;
        const col = sh >= 0 ? p.rust : p.sage; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(X(a), y); ctx.lineTo(X(b), y); ctx.stroke();
        const ax = Math.atan2(0, X(b) - X(a)); const dir = X(b) >= X(a) ? 1 : -1;
        ctx.beginPath(); ctx.moveTo(X(b), y); ctx.lineTo(X(b) - dir * 6, y - 4); ctx.lineTo(X(b) - dir * 6, y + 4); ctx.closePath(); ctx.fill();
        ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('"' + d.w + '" ×' + (d.ps / d.ph).toFixed(1), (X(a) + X(b)) / 2, y - 7);
        y -= 0; // keep on one band; spread vertically:
        y = y; 
      });
      // posterior marker
      const col = Pspam >= 0.5 ? p.rust : p.sage;
      ctx.fillStyle = col; ctx.strokeStyle = p.bg; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(L), yAx, 8, 0, 7); ctx.fill(); ctx.stroke();
      // big readout
      ctx.fillStyle = col; ctx.font = 'bold 34px ' + (cssVar('--font-disp') || 'serif'); ctx.textAlign = 'center';
      ctx.fillText('P(spam) = ' + Math.round(Pspam * 100) + '%', W / 2, 60);
      ctx.font = '14px ' + (cssVar('--font-body') || 'sans-serif'); ctx.fillStyle = col;
      ctx.fillText(Pspam >= 0.5 ? 'classified: SPAM' : 'classified: HAM', W / 2, 86);
      const present = WORDS.filter(d => on[d.w]).map(d => d.w);
      info.innerHTML = 'Email contains: <b>' + (present.length ? present.join(', ') : '(no listed words)') + '</b>. Prior P(spam)=0.40. ' +
        'Each word multiplies the spam-odds by its likelihood ratio — equivalently, adds its shift on the log-odds line. Naive Bayes assumes words are independent, so the shifts simply sum; cross the midpoint and it is spam.';
    }
    WORDS.forEach(d => button(ctl, d.w + ' ' + (d.ps >= d.ph ? '↑' : '↓'), function () { on[d.w] = !on[d.w]; draw(); }));
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Naive Bayes spam-filter visualizer. A horizontal log-odds axis runs from ham (left) to spam (right) with a dashed decision threshold at the midpoint (probability 0.5). A gold marker shows the prior; each word present in the email adds a coloured arrow shifting the odds by its likelihood ratio P(word|spam)/P(word|ham) — rust arrows push toward spam, sage toward ham. The posterior marker and a large P(spam) percentage show the verdict; toggle word buttons to see it move. Because words are assumed independent, the shifts simply add.');
    draw();
  });


  /* ========================================================
     104. The Poisson distribution: counts of rare events (Probability & Statistics)
     ======================================================== */
  register({ id: 'ps-poisson-viz', topic: 'probability-statistics', title: 'The Poisson distribution: shape, mean, and variance', blurb: 'The probability of seeing exactly k events when they arrive independently at an average rate λ: P(X=k)=e^(−λ) λ^k / k!. Drag λ and watch the bars: the peak sits near λ, the spread is √λ, and uniquely the mean and the variance are BOTH equal to λ. For small λ the shape is lopsided toward 0 (rare events); for large λ it rounds into a bell.' },
  function (root) {
    const W = 540, H = 340, padL = 44, padR = 16, padT = 18, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let lam = 3;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const K = Math.min(28, Math.max(8, Math.ceil(lam + 4 * Math.sqrt(lam) + 3)));
      const pmf = []; let pk = Math.exp(-lam); pmf.push(pk);
      for (let k = 1; k <= K; k++) { pk = pk * lam / k; pmf.push(pk); }
      const maxP = Math.max.apply(null, pmf), n = K + 1;
      const plotW = W - padL - padR, plotH = H - padT - padB, bw = plotW / n;
      const X = k => padL + k * bw, Y = v => (H - padB) - v / maxP * plotH;
      // axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      for (let k = 0; k <= K; k += (K > 16 ? 4 : 2)) ctx.fillText(k, X(k) + bw / 2, H - padB + 14);
      ctx.fillText('k (number of events)', W / 2, H - 6);
      // std band (mean ± 1σ) shaded
      const sd = Math.sqrt(lam);
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.10; ctx.fillRect(X(Math.max(0, lam - sd)) + bw / 2, padT, (2 * sd) * bw, plotH); ctx.globalAlpha = 1;
      // bars
      pmf.forEach((v, k) => { ctx.fillStyle = p.sage; ctx.fillRect(X(k) + bw * 0.12, Y(v), bw * 0.76, (H - padB) - Y(v)); });
      // mean line at k=λ
      ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(lam) + bw / 2, padT); ctx.lineTo(X(lam) + bw / 2, H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.fillText('mean λ=' + lam.toFixed(1), X(lam) + bw / 2 + 4, padT + 10);
      info.innerHTML = 'λ = <b>' + lam.toFixed(1) + '</b> &middot; mean = <b style="color:' + p.gold + '">' + lam.toFixed(2) + '</b> &middot; variance = <b>' + lam.toFixed(2) + '</b> &middot; std = √λ = <b>' + sd.toFixed(2) + '</b> (violet band).<br>' + (lam < 1.5 ? 'Small λ: most outcomes are 0 or 1 — the law of rare events.' : lam >= 8 ? 'Large λ: the distribution rounds into a near-Gaussian bell centered at λ.' : 'The hallmark of the Poisson: mean and variance are equal (both λ).');
    }
    slider(ctl, { label: 'rate λ', min: 0.3, max: 12, step: 0.1, value: lam, fmt: v => v.toFixed(1), onInput: v => { lam = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Poisson distribution visualizer: a bar chart of P(X=k)=e^(-lambda) lambda^k / k! against k. A slider sets the rate lambda; a gold dashed line marks the mean at k=lambda and a violet band shows mean plus or minus one standard deviation (root lambda). For small lambda the bars pile up near 0 (rare events); for large lambda they form a symmetric bell. The mean and variance are both equal to lambda.');
    draw();
  });


  /* ========================================================
     105. The exponential distribution & memorylessness (Probability & Statistics)
     ======================================================== */
  register({ id: 'ps-exponential-viz', topic: 'probability-statistics', title: 'Exponential waiting & memorylessness', blurb: 'The survival curve P(X>x)=e^(−λx) for a random wait at rate λ. Slide how long you have ALREADY waited (s): the curve for the remaining wait (renormalized to start at s) is an identical copy of the original — having waited s tells you nothing. P(X>s+t | X>s)=e^(−λt)=P(X>t). The exponential is the only continuous distribution with this "no aging" memoryless property; its mean wait is 1/λ.' },
  function (root) {
    const W = 540, H = 340, padL = 46, padR = 18, padT = 18, padB = 40, XMAX = 10;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let lam = 0.6, s = 3;
    const X = x => padL + x / XMAX * (W - padL - padR), Y = p => (H - padB) - p * (H - padT - padB);
    function draw() {
      const pp = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pp.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = pp.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(XMAX), Y(0)); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(1.02)); ctx.stroke();
      ctx.fillStyle = pp.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      ctx.fillText('1', X(0) - 5, Y(1) + 4); ctx.fillText('0', X(0) - 5, Y(0) + 4);
      ctx.textAlign = 'center'; ctx.fillText('time waited x', W / 2, H - 6);
      // original survival S(x)=e^{-lam x}
      ctx.strokeStyle = pp.gold; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = i / 240 * XMAX, y = Math.exp(-lam * x); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke();
      // elapsed marker at s
      ctx.strokeStyle = pp.mute; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(X(s), Y(0)); ctx.lineTo(X(s), Y(1.0)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = pp.mute; ctx.fillText('waited s=' + s.toFixed(1), X(s), Y(1.0) - 4);
      // conditional remaining-wait curve from s, renormalized to 1 at s: C(x)=e^{-lam(x-s)}
      ctx.strokeStyle = pp.violet; ctx.lineWidth = 2.5; ctx.setLineDash([6, 4]); ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = s + i / 240 * (XMAX - s); if (x > XMAX) break; const y = Math.exp(-lam * (x - s)); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke(); ctx.setLineDash([]);
      // marker: remaining t=1 -> conditional prob e^{-lam}
      const t = 1, cond = Math.exp(-lam * t);
      ctx.fillStyle = pp.violet; ctx.beginPath(); ctx.arc(X(s + t), Y(cond), 5, 0, 7); ctx.fill();
      ctx.fillStyle = pp.sage; ctx.beginPath(); ctx.arc(X(t), Y(cond), 5, 0, 7); ctx.fill();
      ctx.textAlign = 'left'; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace');
      info.innerHTML = 'rate λ = <b>' + lam.toFixed(2) + '</b> &middot; mean wait = 1/λ = <b style="color:' + pp.gold + '">' + (1 / lam).toFixed(2) + '</b> &middot; already waited s = <b>' + s.toFixed(1) + '</b>.<br>' +
        'P(wait 1 more | waited ' + s.toFixed(1) + ') = <b style="color:' + pp.violet + '">' + cond.toFixed(3) + '</b> = P(wait &gt; 1 from scratch) = <b style="color:' + pp.sage + '">' + cond.toFixed(3) + '</b>. The violet (remaining-wait) curve is an exact copy of the gold one — <b>memoryless: no aging</b>.';
    }
    slider(ctl, { label: 'rate λ', min: 0.2, max: 2, step: 0.05, value: lam, fmt: v => v.toFixed(2), onInput: v => { lam = v; draw(); } });
    slider(ctl, { label: 'already waited s', min: 0, max: 6, step: 0.5, value: s, fmt: v => v.toFixed(1), onInput: v => { s = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Exponential-distribution memorylessness visualizer: the gold survival curve P(X>x)=e^(-lambda x) decays from 1. A dashed marker shows how long you have already waited (s); the violet dashed curve is the distribution of the REMAINING wait, renormalized to start at s. It is an identical copy of the original — the probability of waiting one more unit equals the probability of waiting more than one unit from scratch, both e^(-lambda). The exponential is the unique continuous memoryless distribution, mean 1/lambda.');
    draw();
  });


  /* ========================================================
     106. Expectation as the balance point (Probability & Statistics)
     ======================================================== */
  register({ id: 'ps-expectation-balance', topic: 'probability-statistics', title: 'Expectation = the balance point', blurb: 'A probability distribution is a set of weights on a number line, and the expected value E[X] is exactly the point where it balances — the center of mass. Drag the four weights and watch the gold fulcrum slide to the weighted average. The violet band is one standard deviation either side; piling weight far from the mean widens it (that is the variance growing).' },
  function (root) {
    const W = 540, H = 320, padL = 34, padR = 34, baseY = H - 96, DMAX = 9.5;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const pos = [1, 3, 5, 8];
    let w = [3, 3, 3, 3];
    const X = d => padL + d / DMAX * (W - padL - padR);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      let sum = w.reduce((a, b) => a + b, 0); if (sum <= 0) sum = 1;
      const pr = w.map(x => x / sum);
      const mu = pr.reduce((a, x, i) => a + x * pos[i], 0);
      const va = pr.reduce((a, x, i) => a + x * (pos[i] - mu) * (pos[i] - mu), 0);
      const sd = Math.sqrt(va);
      // sigma band
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.12; ctx.fillRect(X(Math.max(0, mu - sd)), baseY - 78, (X(mu + sd) - X(mu - sd)), 78); ctx.globalAlpha = 1;
      // beam (the number line that balances)
      ctx.strokeStyle = p.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(0), baseY); ctx.lineTo(X(DMAX), baseY); ctx.stroke();
      // ticks
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      for (let t = 0; t <= 9; t++) { ctx.fillRect(X(t), baseY - 3, 1, 6); }
      // masses
      pr.forEach((pi, i) => {
        const r = 6 + 30 * pi; ctx.fillStyle = p.sage; ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.arc(X(pos[i]), baseY - r, r, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.fillStyle = p.ink; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
        ctx.fillText(pi.toFixed(2), X(pos[i]), baseY - 2 * r - 6);
        ctx.fillStyle = p.mute; ctx.fillText('x=' + pos[i], X(pos[i]), baseY + 16);
      });
      // fulcrum at the mean
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.moveTo(X(mu), baseY + 2); ctx.lineTo(X(mu) - 15, baseY + 34); ctx.lineTo(X(mu) + 15, baseY + 34); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(mu), baseY - 82); ctx.lineTo(X(mu), baseY + 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('E[X] = ' + mu.toFixed(2), X(mu), baseY + 50);
      info.innerHTML = 'weights [' + w.join(', ') + '] &rarr; probabilities [' + pr.map(x => x.toFixed(2)).join(', ') + '].<br>' +
        '<b style="color:' + p.gold + '">E[X] = ' + mu.toFixed(2) + '</b> (the balance point) &middot; <b>Var = ' + va.toFixed(2) + '</b> &middot; SD = <b style="color:' + p.violet + '">' + sd.toFixed(2) + '</b> (violet band). Move weight away from the mean and the spread grows.';
    }
    pos.forEach((x, i) => slider(ctl, { label: 'weight @ x=' + x, min: 0, max: 10, step: 1, value: w[i], fmt: v => String(v), onInput: v => { w[i] = v; draw(); } }));
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Expectation-as-balance-point visualizer: four weights sit on a number line at x = 1, 3, 5 and 8. Sliders set each weight; the weights are normalized to probabilities. A gold fulcrum marks the expected value E[X], the weighted average where the line balances (the center of mass). A violet band spans one standard deviation either side of the mean; shifting weight farther from the mean widens it, showing the variance increase.');
    draw();
  });


  /* ========================================================
     107. Two events & inclusion-exclusion (Probability & Statistics)
     ======================================================== */
  register({ id: 'ps-set-events', topic: 'probability-statistics', title: 'Two events: union, intersection & inclusion–exclusion', blurb: 'Events are subsets of the sample space Ω. Slide P(A), P(B), and their overlap P(A∩B) and watch the four regions — only A, only B, both, and neither — with their probabilities. The point of inclusion–exclusion: P(A∪B)=P(A)+P(B)−P(A∩B), because adding the two circles counts the overlap twice, so you subtract it once.' },
  function (root) {
    const W = 540, H = 300, m = 18, boxB = H - 70;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let pa = 0.45, pb = 0.40, pab = 0.15;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      let a = pa, b = pb, ab = pab;
      const abMin = Math.max(0, a + b - 1), abMax = Math.min(a, b);
      ab = Math.min(abMax, Math.max(abMin, ab));
      const onlyA = a - ab, onlyB = b - ab, both = ab, uni = a + b - ab, neither = 1 - uni;
      // sample space box (Omega)
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.5; ctx.strokeRect(m, m, W - 2 * m, boxB - m);
      ctx.fillStyle = p.mute; ctx.font = '13px ' + (cssVar('--font-disp') || 'serif'); ctx.textAlign = 'left'; ctx.fillText('Ω', m + 8, m + 20);
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      ctx.fillStyle = p.mute; ctx.fillText('neither: ' + neither.toFixed(2), W - m - 8, boxB - 10);
      // circles
      const cy = (m + boxB) / 2, r = 74, cxA = W / 2 - 44, cxB = W / 2 + 44;
      ctx.globalAlpha = 0.38; ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(cxA, cy, r, 0, 7); ctx.fill();
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(cxB, cy, r, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5; ctx.strokeStyle = p.sage; ctx.beginPath(); ctx.arc(cxA, cy, r, 0, 7); ctx.stroke();
      ctx.strokeStyle = p.violet; ctx.beginPath(); ctx.arc(cxB, cy, r, 0, 7); ctx.stroke();
      // labels A / B
      ctx.textAlign = 'center'; ctx.font = '14px ' + (cssVar('--font-disp') || 'serif');
      ctx.fillStyle = p.sage; ctx.fillText('A', cxA - r / 2, cy - r + 22);
      ctx.fillStyle = p.violet; ctx.fillText('B', cxB + r / 2, cy - r + 22);
      // region probabilities
      ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillStyle = p.ink;
      ctx.fillText(onlyA.toFixed(2), cxA - 38, cy + 4);
      ctx.fillText(both.toFixed(2), (cxA + cxB) / 2, cy + 4);
      ctx.fillText(onlyB.toFixed(2), cxB + 38, cy + 4);
      // union bar below box
      const bx = m, bw = W - 2 * m, by = boxB + 14, bh = 16;
      ctx.fillStyle = p.panel; ctx.fillRect(bx, by, bw, bh);
      ctx.fillStyle = p.gold; ctx.globalAlpha = 0.55; ctx.fillRect(bx, by, bw * uni, bh); ctx.globalAlpha = 1;
      ctx.strokeStyle = p.line; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = p.ink; ctx.textAlign = 'left'; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      ctx.fillText('P(A∪B) = ' + uni.toFixed(2), bx + 6, by + bh + 16);
      info.innerHTML = 'P(A) = <b style="color:' + p.sage + '">' + a.toFixed(2) + '</b> &middot; P(B) = <b style="color:' + p.violet + '">' + b.toFixed(2) + '</b> &middot; P(A∩B) = <b>' + both.toFixed(2) + '</b>.<br>' +
        'Inclusion–exclusion: P(A∪B) = ' + a.toFixed(2) + ' + ' + b.toFixed(2) + ' − ' + both.toFixed(2) + ' = <b style="color:' + p.gold + '">' + uni.toFixed(2) + '</b>. Subtracting the overlap fixes the double-count; P(neither) = ' + neither.toFixed(2) + '.';
    }
    slider(ctl, { label: 'P(A)', min: 0, max: 1, step: 0.01, value: pa, fmt: v => v.toFixed(2), onInput: v => { pa = v; draw(); } });
    slider(ctl, { label: 'P(B)', min: 0, max: 1, step: 0.01, value: pb, fmt: v => v.toFixed(2), onInput: v => { pb = v; draw(); } });
    slider(ctl, { label: 'P(A∩B) overlap', min: 0, max: 1, step: 0.01, value: pab, fmt: v => v.toFixed(2), onInput: v => { pab = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Two-event Venn visualizer: a box is the sample space Omega; two overlapping circles A and B sit inside it. Sliders set P(A), P(B) and the overlap P(A and B), and the four regions (only A, only B, both, neither) show their probabilities. A gold bar and readout compute inclusion-exclusion: P(A or B) = P(A) + P(B) minus P(A and B), subtracting the overlap that the two circles would otherwise double-count.');
    draw();
  });


  /* ========================================================
     108. Slope fields & Euler's method (Calculus)
     ======================================================== */
  register({ id: 'calc-slope-field', topic: 'calculus', title: 'Slope fields: seeing the solutions of an ODE', blurb: 'A first-order ODE dy/dx = f(x,y) assigns a slope to every point in the plane — draw a tiny segment with that slope everywhere and you get a slope field. A solution is any curve that flows tangent to the field; pick a starting height y₀ and follow the arrows (Euler’s method) to trace one out. Switch between dy/dx = x − y (a slanted attractor) and the logistic dy/dx = y(1−y) (S-curves leveling off at y=1).' },
  function (root) {
    const W = 540, H = 340, padL = 36, padR = 16, padT = 14, padB = 30;
    const X0 = 0, X1 = 6, Y0 = -0.5, Y1 = 2.5;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let ode = 0, y0 = 0.2;
    const F = [(x, y) => x - y, (x, y) => 1.2 * y * (1 - y)];
    const NAME = ['dy/dx = x − y', 'dy/dx = y(1 − y)'];
    const X = x => padL + (x - X0) / (X1 - X0) * (W - padL - padR);
    const Y = y => (H - padB) - (y - Y0) / (Y1 - Y0) * (H - padT - padB);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const f = F[ode];
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(X0), Y(0)); ctx.lineTo(X(X1), Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X(0), Y(Y0)); ctx.lineTo(X(0), Y(Y1)); ctx.stroke();
      // slope field
      const L = 11;
      for (let gx = 0; gx <= 12; gx++) for (let gy = 0; gy <= 12; gy++) {
        const x = X0 + gx / 12 * (X1 - X0), y = Y0 + gy / 12 * (Y1 - Y0);
        const s = f(x, y); const ang = Math.atan(s * ((H - padT - padB) / (Y1 - Y0)) / ((W - padL - padR) / (X1 - X0)));
        const dx = Math.cos(ang) * L, dy = Math.sin(ang) * L;
        ctx.strokeStyle = p.mute; ctx.globalAlpha = 0.55; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(X(x) - dx / 2, Y(y) + dy / 2); ctx.lineTo(X(x) + dx / 2, Y(y) - dy / 2); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // logistic equilibria
      if (ode === 1) {
        ctx.strokeStyle = p.rust; ctx.setLineDash([3, 4]); ctx.globalAlpha = .7;
        ctx.beginPath(); ctx.moveTo(X(X0), Y(1)); ctx.lineTo(X(X1), Y(1)); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
        ctx.fillStyle = p.rust; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
        ctx.fillText('stable equilibrium y=1', X(0) + 6, Y(1) - 4);
      }
      // Euler solution from (X0, y0)
      const h = 0.03; let x = X0, y = y0;
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(x), Y(y));
      while (x < X1) { y += f(x, y) * h; x += h; ctx.lineTo(X(x), Y(Math.max(Y0 - 1, Math.min(Y1 + 1, y)))); }
      ctx.stroke();
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(X0), Y(y0), 4, 0, 7); ctx.fill();
      info.innerHTML = '<b>' + NAME[ode] + '</b> &middot; start y₀ = <b style="color:' + p.gold + '">' + y0.toFixed(2) + '</b>. ' +
        'The grey segments are the slope field; the gold curve follows them from the dot (Euler’s method). ' +
        (ode === 1 ? 'Every start drifts to the stable equilibrium y=1 (and away from y=0).' : 'Every start is pulled toward the slanted line y = x − 1.');
    }
    slider(ctl, { label: 'equation', min: 0, max: 1, step: 1, value: ode, fmt: v => NAME[v], onInput: v => { ode = v; draw(); } });
    slider(ctl, { label: 'initial y₀', min: Y0, max: Y1, step: 0.1, value: y0, fmt: v => v.toFixed(1), onInput: v => { y0 = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Slope-field visualizer for a first-order differential equation. Short grey segments show the slope dy/dx = f(x,y) at every grid point; a gold curve starts at a chosen height y-naught on the left edge and follows the field rightward by Euler’s method, tracing a solution. A selector switches between dy/dx = x minus y, whose solutions are pulled toward the line y = x minus 1, and the logistic dy/dx = y times (1 minus y), whose solutions level off at the stable equilibrium y = 1.');
    draw();
  });


  /* ========================================================
     109. Stack vs Queue: LIFO vs FIFO (Algorithms)
     ======================================================== */
  register({ id: 'algo-stack-queue', topic: 'algorithms', title: 'Stack vs Queue: LIFO vs FIFO', blurb: 'A stack and a queue are the same boxes under two different removal policies. Push the SAME sequence into both, then Remove: the stack hands back the most-recent item (Last-In-First-Out, like a stack of plates), while the queue hands back the oldest (First-In-First-Out, like a line at a counter). Watch the two diverge.' },
  function (root) {
    const W = 540, H = 290;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let stack = [], queue = [], n = 0, lastOut = null;
    function reset() { stack = []; queue = []; n = 0; lastOut = null; [1, 2, 3].forEach(() => { n++; stack.push(n); queue.push(n); }); draw(); }
    function push() { n++; stack.push(n); queue.push(n); lastOut = null; draw(); }
    function remove() { if (!stack.length) { draw(); return; } const s = stack.pop(); const q = queue.shift(); lastOut = { s: s, q: q }; draw(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const bw = 64, bh = 30, midX = W / 2;
      // ---- STACK (left): vertical pile, top at top ----
      ctx.fillStyle = p.ink; ctx.font = '14px ' + (cssVar('--font-disp') || 'serif'); ctx.textAlign = 'center';
      ctx.fillText('Stack — LIFO', 130, 26);
      const sx = 130 - bw / 2, baseY = H - 40;
      stack.forEach((v, i) => {
        const y = baseY - (i + 1) * (bh + 4);
        ctx.fillStyle = p.panel; ctx.strokeStyle = (i === stack.length - 1) ? p.gold : p.line; ctx.lineWidth = (i === stack.length - 1) ? 2 : 1;
        ctx.fillRect(sx, y, bw, bh); ctx.strokeRect(sx, y, bw, bh);
        ctx.fillStyle = p.ink; ctx.font = '13px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText(v, 130, y + bh / 2 + 4);
      });
      if (stack.length) { ctx.fillStyle = p.gold; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('↑ top (next out)', 130, baseY - stack.length * (bh + 4) - 4); }
      // ---- QUEUE (right): horizontal, front at left ----
      ctx.fillStyle = p.ink; ctx.font = '14px ' + (cssVar('--font-disp') || 'serif'); ctx.fillText('Queue — FIFO', midX + 135, 26);
      const qy = H / 2 - bh / 2 + 6, qx0 = midX + 24;
      queue.forEach((v, i) => {
        const x = qx0 + i * (52);
        ctx.fillStyle = p.panel; ctx.strokeStyle = (i === 0) ? p.gold : p.line; ctx.lineWidth = (i === 0) ? 2 : 1;
        ctx.fillRect(x, qy, 48, bh); ctx.strokeRect(x, qy, 48, bh);
        ctx.fillStyle = p.ink; ctx.font = '13px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText(v, x + 24, qy + bh / 2 + 4);
      });
      if (queue.length) { ctx.fillStyle = p.gold; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('↑ front (next out)', qx0, qy + bh + 16); ctx.textAlign = 'right'; ctx.fillStyle = p.mute; ctx.fillText('back ↑', qx0 + queue.length * 52 - 4, qy - 6); }
      ctx.textAlign = 'left';
      const peekS = stack.length ? stack[stack.length - 1] : '—', peekQ = queue.length ? queue[0] : '—';
      info.innerHTML = (lastOut ? 'Removed: stack popped <b style="color:' + p.gold + '">' + lastOut.s + '</b> (newest), queue dequeued <b style="color:' + p.gold + '">' + lastOut.q + '</b> (oldest).<br>' : 'Same items pushed into both. ') +
        'Next out → stack: <b>' + peekS + '</b> · queue: <b>' + peekQ + '</b>. ' + (stack.length ? '' : 'Both empty — Reset to refill.');
    }
    button(ctl, 'Push', push);
    button(ctl, 'Remove', remove);
    button(ctl, 'Reset', reset);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Stack-versus-queue visualizer. The same numbers are pushed into a vertical stack (left) and a horizontal queue (right). Pressing Remove pops the stack’s top element (the most recently added, Last-In-First-Out) and dequeues the queue’s front element (the oldest, First-In-First-Out), so the two structures return items in opposite orders.');
    reset();
  });


  /* ========================================================
     110. LoRA: low-rank adaptation (LLMs)
     ======================================================== */
  register({ id: 'llm-lora', topic: 'llm', title: 'LoRA: training a low-rank update', blurb: 'Full fine-tuning retrains the whole weight matrix W (d×d parameters). LoRA freezes W and learns a small update ΔW = B·A, where B is d×r and A is r×d with the rank r tiny — so you train only 2·d·r parameters. Slide the rank r and watch the trainable parameter count (gold) shrink against the frozen matrix (grey); at realistic widths the saving is hundreds of times.' },
  function (root) {
    const W = 540, H = 300, cell = 10, d = 12;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let r = 2;
    function grid(x, y, rows, cols, fill, stroke) {
      for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
        ctx.fillStyle = fill; ctx.fillRect(x + j * cell, y + i * cell, cell - 1, cell - 1);
      }
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.strokeRect(x - 0.5, y - 0.5, cols * cell, rows * cell);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const topY = 70, dPx = d * cell;
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillStyle = p.mute;
      // W frozen
      const wx = 28; grid(wx, topY, d, d, p.panel2 || p.panel, p.line);
      ctx.fillStyle = p.mute; ctx.fillText('W (frozen)', wx + dPx / 2, topY - 10); ctx.fillText('d×d = ' + (d * d), wx + dPx / 2, topY + dPx + 16);
      // plus sign
      ctx.fillStyle = p.ink; ctx.font = '20px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('+', wx + dPx + 18, topY + dPx / 2 + 6);
      // B (d×r) trainable gold
      const bx = wx + dPx + 38; grid(bx, topY, d, r, p.gold, p.gold);
      ctx.fillStyle = p.gold; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('B', bx + r * cell / 2, topY - 10); ctx.fillText('d×r', bx + r * cell / 2, topY + dPx + 16);
      // dot
      ctx.fillStyle = p.ink; ctx.font = '20px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('·', bx + r * cell + 12, topY + dPx / 2 + 6);
      // A (r×d) trainable sage
      const ax = bx + r * cell + 26; grid(ax, topY + dPx / 2 - r * cell / 2, r, d, p.sage, p.sage);
      ctx.fillStyle = p.sage; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('A', ax + dPx / 2, topY + dPx / 2 - r * cell / 2 - 8); ctx.fillText('r×d', ax + dPx / 2, topY + dPx / 2 + r * cell / 2 + 16);
      // arrow "= ΔW"
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.fillText('B·A = ΔW (the update)', ax, topY + dPx + 4);
      const full = d * d, lora = 2 * d * r, ratio = full / lora;
      const realD = 4096, realRatio = realD / (2 * r);
      info.innerHTML = 'rank r = <b>' + r + '</b> &middot; full fine-tune trains <b>' + full + '</b> params; LoRA trains <b style="color:' + p.gold + '">' + lora + '</b> (= 2·d·r) &rarr; <b>' + ratio.toFixed(1) + '×</b> fewer (here d=' + d + ').<br>' +
        'At a realistic width d=' + realD + ', rank ' + r + ' trains ~<b style="color:' + p.sage + '">' + Math.round(realRatio) + '×</b> fewer weights — and each task is just one small adapter you can swap in.';
    }
    slider(ctl, { label: 'rank r', min: 1, max: 12, step: 1, value: r, fmt: v => String(v), onInput: v => { r = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'LoRA low-rank-adaptation visualizer. A frozen d-by-d weight matrix W (grey) sits beside a trainable low-rank update B·A, where B is d-by-r (gold) and A is r-by-d (sage). A rank slider r controls the width of B and A; the readout compares the full fine-tuning parameter count d-squared against LoRA’s 2·d·r, showing the reduction grows large as r stays small relative to d — hundreds of times fewer at realistic widths.');
    draw();
  });


  /* ========================================================
     111. Trie: a prefix tree (Algorithms)
     ======================================================== */
  register({ id: 'algo-trie', topic: 'algorithms', title: 'Trie: sharing prefixes across a dictionary', blurb: 'A trie stores a set of words as a tree of characters, so words sharing a prefix share a path — "car", "card", "cat" all reuse the "ca" branch. Look up a query by walking one edge per character: reach a node marked as a word-end and it is in the dictionary; fall off the tree and it is not. Cost is the length of the word, independent of how many words the trie holds.' },
  function (root) {
    const W = 540, H = 320;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const words = ['car', 'card', 'cat', 'do', 'dog'];
    function mk() { return { ch: {}, end: false }; }
    const T = mk();
    words.forEach(w => { let n = T; for (const c of w) { if (!n.ch[c]) n.ch[c] = mk(); n = n.ch[c]; } n.end = true; });
    let leaf = 0, maxDepth = 0;
    (function layout(n, d) { n.depth = d; maxDepth = Math.max(maxDepth, d); const ks = Object.keys(n.ch); if (!ks.length) { n.x = leaf++; return; } ks.forEach(k => layout(n.ch[k], d + 1)); n.x = (n.ch[ks[0]].x + n.ch[ks[ks.length - 1]].x) / 2; })(T, 0);
    const nLeaf = leaf;
    let path = null, result = '';
    function search(q) {
      path = [T]; let n = T, ok = true;
      for (const c of q) { if (n.ch[c]) { n = n.ch[c]; path.push(n); } else { ok = false; break; } }
      result = !ok ? '“' + q + '” — not found (fell off the tree)' : (n.end ? '“' + q + '” — found, a complete word ✓' : '“' + q + '” — a prefix, but not a stored word');
      draw();
    }
    const padX = 40, padY = 36, levelH = (H - 2 * padY) / Math.max(1, maxDepth);
    const PX = x => padX + (nLeaf <= 1 ? (W - 2 * padX) / 2 : x / (nLeaf - 1) * (W - 2 * padX));
    const PY = d => padY + d * levelH;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const onPath = new Set(path || []);
      (function edges(n) { Object.keys(n.ch).forEach(k => { const m = n.ch[k];
        const hot = onPath.has(n) && onPath.has(m);
        ctx.strokeStyle = hot ? p.gold : p.line; ctx.lineWidth = hot ? 2.5 : 1.3;
        ctx.beginPath(); ctx.moveTo(PX(n.x), PY(n.depth)); ctx.lineTo(PX(m.x), PY(m.depth)); ctx.stroke();
        ctx.fillStyle = hot ? p.gold : p.mute; ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
        ctx.fillText(k, (PX(n.x) + PX(m.x)) / 2 + 7, (PY(n.depth) + PY(m.depth)) / 2 + 2);
        edges(m); }); })(T);
      (function nodes(n) {
        const hot = onPath.has(n);
        ctx.beginPath(); ctx.arc(PX(n.x), PY(n.depth), n === T ? 6 : 9, 0, 7);
        ctx.fillStyle = n.end ? p.sage : p.panel; ctx.fill();
        ctx.strokeStyle = hot ? p.gold : (n.end ? p.sage : p.line); ctx.lineWidth = hot ? 2.5 : 1.4; ctx.stroke();
        if (n.end) { ctx.fillStyle = p.bg; ctx.font = '9px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText('●', PX(n.x), PY(n.depth) + 3); }
        Object.keys(n.ch).forEach(k => nodes(n.ch[k]));
      })(T);
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
      ctx.fillText('root', PX(T.x) + 10, PY(0) + 3);
      ctx.fillStyle = p.sage; ctx.textAlign = 'right'; ctx.fillText('● = word end', W - 12, 18);
      info.innerHTML = 'Dictionary: <b>' + words.join(', ') + '</b>. ' + (result ? '<br>Search ' + result : 'Tap a query below to trace its path. Shared prefixes (“ca”, “do”) reuse one branch.');
    }
    ['car', 'ca', 'cab', 'dog', 'dot'].forEach(q => button(ctl, 'find “' + q + '”', () => search(q)));
    button(ctl, 'clear', () => { path = null; result = ''; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Trie (prefix tree) visualizer for the dictionary car, card, cat, do, dog. Edges are labelled by character and words that share a prefix share a path; nodes that complete a word are marked. Query buttons walk the tree one character at a time, highlighting the path in gold and reporting whether the query is a stored word, a prefix only, or absent.');
    draw();
  });


  /* ========================================================
     112. Max-flow / min-cut (Algorithms)
     ======================================================== */
  register({ id: 'algo-maxflow', topic: 'algorithms', title: 'Max-flow = min-cut', blurb: 'How much can flow from source S to sink T through a capacitated network? Ford–Fulkerson pushes flow along augmenting paths until none remain. The max-flow min-cut theorem says the answer always equals the cheapest “cut” — a way to split the nodes into an S-side and a T-side — whose capacity is the sum of edges crossing it. Drag the S→A capacity and watch the bottleneck (the min cut, in rust) move from the source edges to the sink edges.' },
  function (root) {
    const W = 540, H = 300;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const pos = [[64, 150], [255, 66], [255, 234], [468, 150]];
    const NAME = ['S', 'A', 'B', 'T'];
    const E = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3]];
    let capSA = 7;
    function solve() {
      const n = 4, C = { '0-1': capSA, '0-2': 6, '1-2': 3, '1-3': 5, '2-3': 8 };
      const cap = Array.from({ length: n }, () => Array(n).fill(0)); E.forEach(([u, v]) => cap[u][v] = C[u + '-' + v]);
      const flow = Array.from({ length: n }, () => Array(n).fill(0));
      function bfs() { const par = Array(n).fill(-1); par[0] = 0; const q = [0]; while (q.length) { const u = q.shift(); for (let v = 0; v < n; v++) if (par[v] < 0 && cap[u][v] - flow[u][v] > 0) { par[v] = u; if (v === 3) return par; q.push(v); } } return null; }
      let mf = 0, par; while ((par = bfs())) { let a = Infinity; for (let v = 3; v !== 0; v = par[v]) a = Math.min(a, cap[par[v]][v] - flow[par[v]][v]); for (let v = 3; v !== 0; v = par[v]) { flow[par[v]][v] += a; flow[v][par[v]] -= a; } mf += a; }
      const reach = Array(n).fill(false); reach[0] = true; const q = [0]; while (q.length) { const u = q.shift(); for (let v = 0; v < n; v++) if (!reach[v] && cap[u][v] - flow[u][v] > 0) { reach[v] = true; q.push(v); } }
      const cut = E.filter(([u, v]) => reach[u] && !reach[v]);
      return { mf, flow, C, reach, cut };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const s = solve();
      E.forEach(([u, v]) => {
        const isCut = s.cut.some(e => e[0] === u && e[1] === v);
        const f = s.flow[u][v], cp = s.C[u + '-' + v], sat = f >= cp;
        const x1 = pos[u][0], y1 = pos[u][1], x2 = pos[v][0], y2 = pos[v][1];
        const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, r = 18;
        const ax = x1 + ux * r, ay = y1 + uy * r, bx = x2 - ux * r, by = y2 - uy * r;
        ctx.strokeStyle = isCut ? p.rust : (sat ? p.gold : p.line); ctx.lineWidth = isCut ? 3 : 2;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        const ang = Math.atan2(dy, dx); ctx.fillStyle = isCut ? p.rust : (sat ? p.gold : p.mute);
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 9 * Math.cos(ang - 0.4), by - 9 * Math.sin(ang - 0.4)); ctx.lineTo(bx - 9 * Math.cos(ang + 0.4), by - 9 * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
        ctx.fillStyle = isCut ? p.rust : p.ink; ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; ctx.fillText(f + '/' + cp, mx + (uy) * 14, my - (ux) * 14);
      });
      pos.forEach((pt, i) => {
        ctx.beginPath(); ctx.arc(pt[0], pt[1], 18, 0, 7);
        ctx.fillStyle = s.reach[i] ? p.sage : p.panel; ctx.fill();
        ctx.strokeStyle = s.reach[i] ? p.sage : p.violet; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = s.reach[i] ? p.bg : p.ink; ctx.font = '14px ' + (cssVar('--font-disp') || 'serif'); ctx.textAlign = 'center'; ctx.fillText(NAME[i], pt[0], pt[1] + 5);
      });
      ctx.fillStyle = p.sage; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('green = S-side of the cut', 12, H - 10);
      const cutStr = s.cut.map(e => NAME[e[0]] + '→' + NAME[e[1]]).join(', ');
      info.innerHTML = 'S→A capacity = <b>' + capSA + '</b> &middot; <b style="color:' + p.gold + '">max-flow = ' + s.mf + '</b> = min-cut capacity. ' +
        'The cut (rust) crosses <b style="color:' + p.rust + '">' + cutStr + '</b> — exactly the edges leaving the green S-side. Labels are flow/capacity; gold edges are saturated.';
    }
    slider(ctl, { label: 'S→A capacity', min: 0, max: 12, step: 1, value: capSA, fmt: v => String(v), onInput: v => { capSA = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Max-flow min-cut visualizer on a small network from source S to sink T through nodes A and B. Each edge shows flow over capacity; saturated edges are gold. A slider sets the S-to-A capacity; the widget computes the maximum flow by Ford–Fulkerson and highlights the minimum cut in rust — the green S-side nodes versus the rest — whose crossing-edge capacity always equals the max-flow. Raising S-to-A moves the bottleneck from the source edges to the sink edges.');
    draw();
  });


  /* ========================================================
     113. P / NP / NP-complete containment (Algorithms)
     ======================================================== */
  register({ id: 'algo-pnp', topic: 'algorithms', title: 'P, NP, NP-complete: the map of difficulty', blurb: 'P is what we can SOLVE quickly; NP is what we can VERIFY quickly. Every P problem is in NP (P ⊆ NP). The NP-complete problems (SAT, TSP, clique…) are the hardest in NP — solve one in polynomial time and you solve them all. The open question: does P = NP? Toggle the two worlds — the believed P ≠ NP (NP-complete sits outside P) versus the collapse P = NP (everything tractable, and cryptography breaks).' },
  function (root) {
    const W = 540, H = 320;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let equal = 0; // 0 = P != NP, 1 = P = NP
    function lbl(t, x, y, col, sz) { ctx.fillStyle = col; ctx.font = (sz || 13) + 'px ' + (cssVar('--font-disp') || 'serif'); ctx.textAlign = 'center'; ctx.fillText(t, x, y); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = 158;
      if (!equal) {
        // NP-hard backdrop (extends beyond NP)
        ctx.fillStyle = p.violet; ctx.globalAlpha = 0.10; ctx.beginPath(); ctx.ellipse(cx + 86, cy, 150, 132, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.violet; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(cx + 86, cy, 150, 132, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        lbl('NP-hard', cx + 188, cy - 96, p.violet, 12);
        // NP ellipse
        ctx.fillStyle = p.panel; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.ellipse(cx, cy, 196, 116, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, cy, 196, 116, 0, 0, 7); ctx.stroke();
        lbl('NP  (verify fast)', cx - 96, cy - 92, p.gold, 13);
        // P circle (left, inside NP)
        ctx.fillStyle = p.sage; ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.arc(cx - 86, cy, 74, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.sage; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx - 86, cy, 74, 0, 7); ctx.stroke();
        lbl('P', cx - 86, cy - 30, p.sage, 18); lbl('solve fast', cx - 86, cy - 12, p.mute, 10);
        lbl('sorting,', cx - 86, cy + 16, p.ink, 11); lbl('shortest path', cx - 86, cy + 32, p.ink, 11);
        // NP-complete region (right, inside NP, touching NP boundary, disjoint from P)
        ctx.fillStyle = p.rust; ctx.globalAlpha = 0.30; ctx.beginPath(); ctx.ellipse(cx + 96, cy, 78, 96, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.rust; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx + 96, cy, 78, 96, 0, 0, 7); ctx.stroke();
        lbl('NP-complete', cx + 96, cy - 28, p.rust, 12);
        lbl('SAT, TSP,', cx + 96, cy + 4, p.ink, 11); lbl('clique', cx + 96, cy + 20, p.ink, 11);
        info.innerHTML = '<b>World 1: P ≠ NP</b> (what almost everyone believes). P sits strictly inside NP; the <b style="color:' + p.rust + '">NP-complete</b> problems live in NP but outside P — no known polynomial algorithm. NP-hard (dashed) is "at least as hard as NP-complete", reaching beyond NP.';
      } else {
        ctx.fillStyle = p.sage; ctx.globalAlpha = 0.26; ctx.beginPath(); ctx.arc(cx, cy, 138, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 138, 0, 7); ctx.stroke();
        lbl('P = NP = NP-complete', cx, cy - 12, p.gold, 15);
        lbl('everything verifiable is also solvable — fast', cx, cy + 14, p.ink, 12);
        lbl('SAT, TSP, sorting … all polynomial', cx, cy + 36, p.mute, 11);
        info.innerHTML = '<b>World 2: P = NP</b> (the collapse). If even one NP-complete problem had a polynomial algorithm, reductions would give one to <i>every</i> NP problem — the classes merge. Almost certainly false, and if true, most modern cryptography would break.';
      }
    }
    button(ctl, 'P ≠ NP (believed)', () => { equal = 0; draw(); });
    button(ctl, 'P = NP (collapse)', () => { equal = 1; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Complexity-class containment diagram. In the believed world P does not equal NP: a small set P (solve quickly, e.g. sorting and shortest path) sits strictly inside a larger set NP (verify quickly); the NP-complete problems (SAT, TSP, clique) lie inside NP but outside P, and NP-hard extends beyond NP. A toggle shows the alternative world P = NP, where all three classes collapse into one and every quickly-verifiable problem is also quickly solvable.');
    draw();
  });


  /* ========================================================
     114. Bayesian updating: Beta prior → posterior (Probability & Statistics)
     ======================================================== */
  register({ id: 'ps-beta-update', topic: 'probability-statistics', title: 'Bayesian updating: prior × likelihood → posterior', blurb: 'Watch Bayes’ rule for a coin’s bias θ. Set a Beta(α,β) prior (gold), then add data — k heads in n flips — and the normalized likelihood (sage) multiplies the prior into the posterior Beta(α+k, β+n−k) (violet). More data makes the likelihood, and so the posterior, sharper; the posterior always sits between prior and data, sliding toward the data as evidence accumulates.' },
  function (root) {
    const W = 540, H = 320, padL = 30, padR = 16, padT = 16, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let a = 2, b = 2, n = 10, k = 7;
    function lgamma(z) { const g = 7, cc = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z); z -= 1; let x = cc[0]; for (let i = 1; i < g + 2; i++) x += cc[i] / (z + i); const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x); }
    function betaPdf(x, A, B) { if (x <= 0 || x >= 1) return 0; return Math.exp((A - 1) * Math.log(x) + (B - 1) * Math.log(1 - x) - (lgamma(A) + lgamma(B) - lgamma(A + B))); }
    const X = t => padL + t * (W - padL - padR), Yb = H - padB;
    function curve(A, B, col, dash, fill) {
      const N = 240, pts = [];
      for (let i = 0; i <= N; i++) { const x = i / N; pts.push([x, betaPdf(x, A, B)]); }
      return pts;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const kk = Math.min(k, n);
      const prior = curve(a, b), like = curve(kk + 1, n - kk + 1), post = curve(a + kk, b + n - kk);
      let mx = 0; [prior, like, post].forEach(s => s.forEach(pt => { if (isFinite(pt[1])) mx = Math.max(mx, pt[1]); }));
      mx = mx || 1; const Y = v => Yb - Math.min(v / mx, 1) * (H - padT - padB);
      // axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), Yb); ctx.lineTo(X(1), Yb); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [0, 0.25, 0.5, 0.75, 1].forEach(t => ctx.fillText(t, X(t), Yb + 14));
      ctx.fillText('θ (probability of heads)', W / 2, H - 4);
      function plot(s, col, dash, fillA) {
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash(dash || []);
        ctx.beginPath(); s.forEach((pt, i) => { const xx = X(pt[0]), yy = Y(pt[1]); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); ctx.setLineDash([]);
        if (fillA) { ctx.globalAlpha = fillA; ctx.lineTo(X(1), Yb); ctx.lineTo(X(0), Yb); ctx.closePath(); ctx.fill && (ctx.fillStyle = col, ctx.fill()); ctx.globalAlpha = 1; }
      }
      plot(prior, p.gold, [5, 4]);
      plot(like, p.sage, [2, 3]);
      plot(post, p.violet, null, 0.18);
      // legend
      ctx.textAlign = 'left'; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      ctx.fillStyle = p.gold; ctx.fillText('— prior Beta(' + a + ',' + b + ')', X(0.04), padT + 8);
      ctx.fillStyle = p.sage; ctx.fillText('— likelihood (' + kk + '/' + n + ')', X(0.04), padT + 24);
      ctx.fillStyle = p.violet; ctx.fillText('— posterior Beta(' + (a + kk) + ',' + (b + n - kk) + ')', X(0.04), padT + 40);
      const priMean = a / (a + b), postMean = (a + kk) / (a + b + n);
      info.innerHTML = 'prior mean <b style="color:' + p.gold + '">' + priMean.toFixed(3) + '</b> &middot; data ' + kk + '/' + n + ' = <b>' + (n ? (kk / n).toFixed(3) : '—') + '</b> &middot; posterior mean <b style="color:' + p.violet + '">' + postMean.toFixed(3) + '</b> = (α+k)/(α+β+n). The posterior sits between prior and data and sharpens as n grows.';
    }
    slider(ctl, { label: 'prior α', min: 1, max: 12, step: 1, value: a, fmt: v => String(v), onInput: v => { a = v; draw(); } });
    slider(ctl, { label: 'prior β', min: 1, max: 12, step: 1, value: b, fmt: v => String(v), onInput: v => { b = v; draw(); } });
    slider(ctl, { label: 'trials n', min: 0, max: 40, step: 1, value: n, fmt: v => String(v), onInput: v => { n = v; if (k > n) k = n; draw(); } });
    slider(ctl, { label: 'heads k', min: 0, max: 40, step: 1, value: k, fmt: v => String(Math.min(v, n)), onInput: v => { k = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Bayesian updating visualizer over a coin-bias theta in [0,1]. A gold dashed Beta(alpha,beta) prior, a sage dashed normalized likelihood for k heads in n flips, and the violet filled posterior Beta(alpha+k, beta+n-k). Sliders set the prior parameters and the data; as the number of trials grows the likelihood and posterior become sharper, and the posterior mean (alpha+k)/(alpha+beta+n) sits between the prior mean and the data proportion, sliding toward the data.');
    draw();
  });


  /* ========================================================
     115. Differential entropy of a Gaussian (Information Theory)
     ======================================================== */
  register({ id: 'it-differential-entropy-viz', topic: 'information-theory', title: 'Differential entropy can go negative', blurb: 'For a continuous variable, entropy becomes h(X)=−∫f(x)log f(x)dx. For a Gaussian it is h=½log₂(2πeσ²) bits — it grows with the spread σ, and (unlike discrete entropy, which is always ≥0) it goes NEGATIVE once the distribution is concentrated enough (σ below ≈0.242). Slide σ and watch the curve sharpen and the entropy cross zero.' },
  function (root) {
    const W = 540, H = 320, padL = 40, padR = 16, padT = 16, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let sigma = 1;
    const XMAX = 6;
    const X = x => padL + (x + XMAX) / (2 * XMAX) * (W - padL - padR);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const pdf = x => Math.exp(-x * x / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));
      const peak = pdf(0), ymax = Math.max(peak, 0.5), Yb = H - padB;
      const Y = v => Yb - (v / ymax) * (H - padT - padB);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Yb); ctx.lineTo(W - padR, Yb); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [-4, -2, 0, 2, 4].forEach(t => ctx.fillText(t, X(t), Yb + 14));
      ctx.fillText('x', W / 2, H - 4);
      // pdf curve (color shifts toward rust when entropy is negative)
      const h = 0.5 * Math.log2(2 * Math.PI * Math.E * sigma * sigma);
      const col = h < 0 ? p.rust : p.sage;
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 300; i++) { const x = -XMAX + i / 300 * 2 * XMAX, y = pdf(x); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke();
      ctx.globalAlpha = 0.12; ctx.fillStyle = col; ctx.lineTo(X(XMAX), Yb); ctx.lineTo(X(-XMAX), Yb); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      info.innerHTML = 'σ = <b>' + sigma.toFixed(2) + '</b> &middot; differential entropy h(X) = ½·log₂(2πeσ²) = <b style="color:' + col + '">' + h.toFixed(2) + ' bits</b>. ' +
        (h < 0 ? 'Negative! The density is concentrated (and exceeds 1), so h dips below 0 — impossible for discrete entropy.' : 'As σ grows the distribution spreads and h rises; it crosses 0 at σ ≈ 0.242.');
    }
    slider(ctl, { label: 'spread σ', min: 0.1, max: 3, step: 0.01, value: sigma, fmt: v => v.toFixed(2), onInput: v => { sigma = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Differential-entropy visualizer: a zero-mean Gaussian density whose spread sigma is set by a slider. The readout shows h(X) = one-half log base 2 of (2 pi e sigma squared) in bits; as sigma shrinks the curve sharpens and the differential entropy decreases, turning negative below sigma about 0.242 (the curve turns rust) — something discrete entropy can never do.');
    draw();
  });


  /* ========================================================
     116. Value function approximation: tile coding (Reinforcement Learning)
     ======================================================== */
  register({ id: 'rl-value-approx', topic: 'reinforcement-learning', title: 'Value approximation: trading resolution for generalization', blurb: 'A table needs one entry per state — hopeless when states are continuous. The simplest fix is state aggregation (tile coding): chop the state space into tiles and store one value per tile, so the value function becomes a staircase. Slide the number of tiles: few tiles generalize broadly but blur the true value (coarse, high bias); many tiles fit it closely but need far more data to learn each one. This bias–capacity trade is the heart of function approximation.' },
  function (root) {
    const W = 540, H = 320, padL = 38, padR = 16, padT = 16, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let tiles = 5;
    const Vstar = x => Math.exp(-12 * (x - 0.65) * (x - 0.65)) + 0.6 * Math.exp(-30 * (x - 0.25) * (x - 0.25));
    const X = x => padL + x * (W - padL - padR), Yb = H - padB, ymax = 1.15;
    const Y = v => Yb - (v / ymax) * (H - padT - padB);
    function tileVal(x) { const i = Math.min(tiles - 1, Math.floor(x * tiles)); return Vstar((i + 0.5) / tiles); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), Yb); ctx.lineTo(X(1), Yb); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [0, 0.25, 0.5, 0.75, 1].forEach(t => ctx.fillText(t, X(t), Yb + 14)); ctx.fillText('state s', W / 2, H - 4);
      // tile boundaries
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5; ctx.setLineDash([2, 3]);
      for (let i = 1; i < tiles; i++) { ctx.beginPath(); ctx.moveTo(X(i / tiles), padT); ctx.lineTo(X(i / tiles), Yb); ctx.stroke(); }
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      // true V*(s)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 300; i++) { const x = i / 300, y = Vstar(x); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke();
      // tile-coded approximation (staircase) + error
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i < tiles; i++) { const v = Vstar((i + 0.5) / tiles), x0 = X(i / tiles), x1 = X((i + 1) / tiles), yy = Y(v); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); }
      ctx.stroke();
      let err = 0; const N = 400; for (let i = 0; i < N; i++) { const x = (i + 0.5) / N; err += Math.abs(Vstar(x) - tileVal(x)); } err /= N;
      ctx.fillStyle = p.gold; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('— true V*(s)', X(0.04), padT + 10);
      ctx.fillStyle = p.violet; ctx.fillText('— tile approximation', X(0.04), padT + 26);
      info.innerHTML = '<b>' + tiles + '</b> tiles &middot; ' + tiles + ' learned values &middot; mean abs error <b style="color:' + p.violet + '">' + err.toFixed(3) + '</b>. ' +
        (tiles <= 3 ? 'Coarse: broad generalization but high bias — the staircase misses the peaks.' : tiles >= 16 ? 'Fine: closely fits V*, but now there are many values to learn from data.' : 'More tiles lower the error but cost data per tile — the resolution/generalization trade.');
    }
    slider(ctl, { label: 'tiles', min: 1, max: 24, step: 1, value: tiles, fmt: v => String(v), onInput: v => { tiles = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Value-function-approximation visualizer over a continuous state s in [0,1]. A gold curve is the true value V*(s); a violet staircase is a tile-coded (state-aggregation) approximation that stores one value per tile. A slider sets the number of tiles: few tiles give a coarse, high-bias staircase that generalizes broadly, while many tiles track V* closely but require far more data per tile. The mean absolute error falls as tiles increase.');
    draw();
  });


  /* ========================================================
     117. Transfer learning: freeze vs fine-tune (Deep Learning)
     ======================================================== */
  register({ id: 'dl-transfer', topic: 'deep-learning', title: 'Transfer learning: how much to freeze', blurb: 'Start from a pretrained backbone and choose how many of its layers to FREEZE (reuse as-is, grey) versus FINE-TUNE (keep training, gold). Early layers learn general features (edges, textures) that transfer across tasks; later layers grow task-specific. Slide the freeze depth: freeze more → far fewer trainable parameters, so it works on tiny datasets but adapts little; freeze fewer → more capacity to adapt, but needs more data or it overfits.' },
  function (root) {
    const W = 540, H = 320;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const layers = [
      { name: 'Conv block 1  (edges)', p: 2 },
      { name: 'Conv block 2  (textures)', p: 8 },
      { name: 'Conv block 3  (parts)', p: 20 },
      { name: 'Conv block 4  (objects)', p: 30 },
      { name: 'Pooling + dense', p: 25 },
      { name: 'Classifier head', p: 5 }
    ];
    const L = layers.length, total = layers.reduce((a, l) => a + l.p, 0);
    let frozen = 4;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const x0 = 70, bw = W - 70 - 30, bh = 36, gap = 6, top = 20;
      // layers drawn bottom (input) to top (output): index 0 at bottom
      let trainP = 0;
      for (let i = 0; i < L; i++) {
        const li = L - 1 - i; // draw from top of canvas downward = output-side first
        const lay = layers[li];
        const isFrozen = li < frozen;
        if (!isFrozen) trainP += lay.p;
        const y = top + i * (bh + gap);
        ctx.fillStyle = isFrozen ? p.panel : p.gold; ctx.globalAlpha = isFrozen ? 0.5 : 0.32; ctx.fillRect(x0, y, bw, bh); ctx.globalAlpha = 1;
        ctx.strokeStyle = isFrozen ? p.line : p.gold; ctx.lineWidth = 1.6; ctx.strokeRect(x0, y, bw, bh);
        ctx.fillStyle = p.ink; ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
        ctx.fillText((isFrozen ? '🔒 ' : '✎ ') + lay.name, x0 + 10, y + bh / 2 + 4);
      }
      // side labels
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.save();
      ctx.translate(20, top + 30); ctx.rotate(-Math.PI / 2); ctx.fillText('task-specific  ↑   general', 0, 0); ctx.restore();
      const pct = Math.round(100 * trainP / total);
      info.innerHTML = 'frozen <b>' + frozen + '</b> of ' + L + ' layers &middot; training <b style="color:' + p.gold + '">' + (L - frozen) + '</b> layers ≈ <b>' + pct + '%</b> of weights. ' +
        (frozen >= 5 ? 'Feature extraction: only the head trains — great for tiny datasets, minimal adaptation.' : frozen === 0 ? 'Full fine-tuning: maximum adaptation, but needs the most data to avoid overfitting.' : 'Partial fine-tuning: freeze the general early layers, adapt the task-specific later ones.');
    }
    slider(ctl, { label: 'layers frozen', min: 0, max: 6, step: 1, value: frozen, fmt: v => String(v), onInput: v => { frozen = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Transfer-learning visualizer: a pretrained network drawn as a stack of layers from general (bottom, edges/textures) to task-specific (top, classifier head). A slider sets how many early layers are frozen (grey, locked, reused) versus fine-tuned (gold, still training). The readout shows the share of weights being trained: freezing more leaves only the head trainable (feature extraction, good for tiny datasets); freezing fewer trains most of the network (full fine-tuning, needs more data).');
    draw();
  });


  /* ========================================================
     118. Calibration: confidence vs accuracy (LLMs)
     ======================================================== */
  register({ id: 'llm-calibration', topic: 'llm', title: 'Calibration: does confidence match accuracy?', blurb: 'A model is calibrated when its stated confidence equals its real accuracy: of the answers it gives at 80% confidence, 80% should be right. Plot accuracy against confidence (a reliability diagram) — the diagonal is perfect calibration. Slide from over-confident (points below the line: it claims 90% but is right 80% — the seedbed of confident hallucinations) through calibrated to under-confident. The Expected Calibration Error (ECE) is the average gap.' },
  function (root) {
    const W = 540, H = 340, pad = 44;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let gamma = 2;
    const sz = Math.min(W - 2 * pad, H - 2 * pad);
    const x0 = pad, y0 = (H - sz) / 2;
    const X = v => x0 + v * sz, Y = v => y0 + sz - v * sz;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes box
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.strokeRect(x0, y0, sz, sz);
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('confidence', x0 + sz / 2, y0 + sz + 26);
      ctx.save(); ctx.translate(x0 - 28, y0 + sz / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('accuracy', 0, 0); ctx.restore();
      [0, 0.5, 1].forEach(t => { ctx.fillText(t, X(t), y0 + sz + 13); ctx.textAlign = 'right'; ctx.fillText(t, x0 - 6, Y(t) + 3); ctx.textAlign = 'center'; });
      // perfect-calibration diagonal
      ctx.strokeStyle = p.mute; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(1)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('perfect', X(0.72) + 4, Y(0.72) - 6);
      // bins
      let ece = 0; const over = gamma > 1.02, under = gamma < 0.98;
      const col = over ? p.rust : under ? p.violet : p.sage;
      for (let i = 0; i < 10; i++) {
        const cc = (i + 0.5) / 10, a = Math.pow(cc, gamma); ece += Math.abs(cc - a);
        ctx.strokeStyle = col; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(cc), Y(cc)); ctx.lineTo(X(cc), Y(a)); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(cc), Y(a), 4, 0, 7); ctx.fill();
      }
      ece /= 10;
      info.innerHTML = 'state: <b style="color:' + col + '">' + (over ? 'over-confident' : under ? 'under-confident' : 'well-calibrated') + '</b> &middot; Expected Calibration Error = <b>' + ece.toFixed(3) + '</b>. ' +
        (over ? 'Points sit below the diagonal — it claims more confidence than it earns, exactly how a fluent model states falsehoods with conviction.' : under ? 'Points sit above the diagonal — it is more accurate than it admits, hedging too much.' : 'Confidence matches accuracy — its 80% answers really are right ~80% of the time.');
    }
    slider(ctl, { label: 'over- ↔ under-confident', min: 0.3, max: 3, step: 0.05, value: gamma, fmt: v => v.toFixed(2), onInput: v => { gamma = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Calibration reliability diagram: accuracy versus confidence with a dashed diagonal marking perfect calibration. Ten points show the accuracy at each confidence level. A slider moves the model from over-confident (points below the diagonal — it claims more confidence than it earns, the seedbed of confident hallucinations) through well-calibrated (on the diagonal) to under-confident (above). The readout reports the Expected Calibration Error, the average gap, which is zero only when calibrated.');
    draw();
  });


  /* ========================================================
     119. Causal DAGs: fork, chain, collider & d-separation (Probability & Statistics)
     ======================================================== */
  register({ id: 'causal-dag', topic: 'probability-statistics', title: 'Causal graphs: when conditioning helps or hurts', blurb: 'The three building blocks of every causal diagram. A FORK (Z causes both X and Y) makes X and Y correlate with no causal link — conditioning on the confounder Z removes the spurious tie. A CHAIN (X→Z→Y) carries a real effect — conditioning on the mediator Z blocks it. A COLLIDER (X→Z←Y) leaves X and Y independent — but conditioning on Z (or its descendant) INDUCES a spurious association. Pick a structure and toggle "condition on Z" to see the path open or close.' },
  function (root) {
    const W = 540, H = 300;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let kind = 'fork', cond = false;
    const NODES = {
      fork:     { Z: [270, 70], X: [130, 220], Y: [410, 220], edges: [['Z', 'X'], ['Z', 'Y']] },
      chain:    { X: [110, 150], Z: [270, 150], Y: [430, 150], edges: [['X', 'Z'], ['Z', 'Y']] },
      collider: { Z: [270, 70], X: [130, 220], Y: [410, 220], edges: [['X', 'Z'], ['Y', 'Z']] }
    };
    function arrow(a, b, col) {
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, r = 26;
      const x0 = a[0] + ux * r, y0 = a[1] + uy * r, x1 = b[0] - ux * r, y1 = b[1] - uy * r;
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      const ah = 9, ang = Math.atan2(uy, ux);
      ctx.beginPath(); ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - ah * Math.cos(ang - 0.4), y1 - ah * Math.sin(ang - 0.4));
      ctx.lineTo(x1 - ah * Math.cos(ang + 0.4), y1 - ah * Math.sin(ang + 0.4));
      ctx.closePath(); ctx.fill();
    }
    function node(pos, label, fill, stroke) {
      ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(pos[0], pos[1], 26, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = stroke; ctx.font = 'bold 18px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, pos[0], pos[1] + 1);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const G = NODES[kind];
      // status: are X and Y associated (given current conditioning)?
      let assoc, msg;
      if (kind === 'fork') { assoc = !cond; msg = cond ? 'Conditioning on the confounder Z BLOCKS the backdoor path → X ⊥ Y. This is how adjustment removes confounding.' : 'Z is a common cause, so X and Y correlate with NO causal link (confounded).'; }
      else if (kind === 'chain') { assoc = !cond; msg = cond ? 'Z is a mediator; conditioning on it BLOCKS the causal path → X ⊥ Y given Z. You just removed the effect you wanted.' : 'The effect of X flows through Z to Y — a genuine causal association.'; }
      else { assoc = cond; msg = cond ? 'Conditioning on the collider Z OPENS a non-causal path → a SPURIOUS association appears (collider/selection bias).' : 'Z is a common effect; the path is naturally blocked → X ⊥ Y (do not condition on Z).'; }
      // optional spurious/active link between X and Y
      if (assoc) {
        ctx.strokeStyle = (kind === 'chain') ? p.sage : p.rust; ctx.globalAlpha = 0.5; ctx.setLineDash([4, 4]); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(G.X[0] + 24, G.X[1] + 14); ctx.quadraticCurveTo((G.X[0] + G.Y[0]) / 2, H - 20, G.Y[0] - 24, G.Y[1] + 14); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
      }
      G.edges.forEach(([a, b]) => arrow(G[a], G[b], p.line));
      // conditioning box on Z
      if (cond) { ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.setLineDash([5, 3]); ctx.strokeRect(G.Z[0] - 34, G.Z[1] - 34, 68, 68); ctx.setLineDash([]); }
      node(G.X, 'X', p.panel, p.ink);
      node(G.Y, 'Y', p.panel, p.ink);
      node(G.Z, 'Z', cond ? p.gold : p.panel, cond ? p.bg : p.ink);
      const col = assoc ? (kind === 'chain' ? p.sage : p.rust) : p.mute;
      info.innerHTML = '<b>' + kind.toUpperCase() + '</b> &middot; Z ' + (cond ? '<b style="color:' + p.gold + '">conditioned</b>' : 'free') + ' &middot; X and Y are <b style="color:' + col + '">' + (assoc ? 'ASSOCIATED' : 'INDEPENDENT') + '</b>. ' + msg;
      syncBtns();
    }
    const bFork = button(ctl, 'Fork (confounder)', () => { kind = 'fork'; draw(); });
    const bChain = button(ctl, 'Chain (mediator)', () => { kind = 'chain'; draw(); });
    const bColl = button(ctl, 'Collider', () => { kind = 'collider'; draw(); });
    const bCond = button(ctl, 'Condition on Z', () => { cond = !cond; draw(); });
    function syncBtns() {
      const km = { fork: bFork, chain: bChain, collider: bColl };
      [bFork, bChain, bColl].forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      km[kind].classList.add('active'); km[kind].setAttribute('aria-pressed', 'true');
      bCond.classList.toggle('active', cond); bCond.setAttribute('aria-pressed', cond ? 'true' : 'false');
      bCond.textContent = cond ? 'Conditioning on Z ✓' : 'Condition on Z';
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Causal-graph visualizer with three selectable structures over variables X, Y, Z. Fork: Z points to both X and Y (a confounder) — X and Y are associated until you condition on Z, which blocks the path. Chain: X to Z to Y (Z a mediator) — associated until conditioning on Z blocks the causal path. Collider: X and Y both point into Z — X and Y are independent until conditioning on Z opens a spurious association. A toggle conditions on Z (drawn as a gold box) and the readout reports whether X and Y are associated or independent.');
    draw();
  });


  /* ========================================================
     120. Lagrangian duality: the dual is a lower bound (Calculus)
     ======================================================== */
  register({ id: 'calc-duality', topic: 'calculus', title: 'Duality: the dual is a floor under the primal', blurb: 'For the problem "minimize x² subject to x ≥ 1" the primal optimum is p★ = 1. Its dual function g(λ) = λ − λ²/4 is concave and, by weak duality, never rises above p★ — it is a floor under the answer. Slide the multiplier λ: the gap p★ − g(λ) shrinks to zero exactly at the dual optimum λ★ = 2, where the floor touches the ceiling. That zero gap is strong duality.' },
  function (root) {
    const W = 540, H = 320, padL = 44, padR = 16, padT = 18, padB = 36;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let lam = 0.6;
    const LMAX = 4, pStar = 1, yMin = 0, yMax = 1.35;
    const dual = l => l - l * l / 4;
    const X = l => padL + (l / LMAX) * (W - padL - padR);
    const Y = v => (H - padB) - (v - yMin) / (yMax - yMin) * (H - padT - padB);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(yMin)); ctx.lineTo(W - padR, Y(yMin)); ctx.moveTo(padL, padT); ctx.lineTo(padL, Y(yMin)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [0, 1, 2, 3, 4].forEach(t => ctx.fillText(t, X(t), Y(yMin) + 14)); ctx.fillText('multiplier λ', W / 2, H - 4);
      // p* ceiling (primal optimum)
      ctx.strokeStyle = p.gold; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(padL, Y(pStar)); ctx.lineTo(W - padR, Y(pStar)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.fillText('p★ = 1  (primal optimum)', X(0.1), Y(pStar) - 6);
      // dual curve g(λ)
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const l = i / 240 * LMAX, v = dual(l); i ? ctx.lineTo(X(l), Y(v)) : ctx.moveTo(X(l), Y(v)); } ctx.stroke();
      ctx.fillStyle = p.violet; ctx.fillText('g(λ) = λ − λ²/4  (dual, concave)', X(1.15), Y(dual(3.4)) + 4);
      // gap bar at current λ
      const gv = dual(lam), gap = pStar - gv;
      ctx.strokeStyle = p.rust; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(lam), Y(gv)); ctx.lineTo(X(lam), Y(pStar)); ctx.stroke();
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(X(lam), Y(gv), 4.5, 0, 7); ctx.fill();
      // dual optimum marker
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(2), Y(1), 3.5, 0, 7); ctx.fill();
      info.innerHTML = 'λ = <b>' + lam.toFixed(2) + '</b> &middot; dual value g(λ) = <b style="color:' + p.violet + '">' + gv.toFixed(3) + '</b> &middot; duality gap p★ − g(λ) = <b style="color:' + (gap < 1e-6 ? p.gold : p.rust) + '">' + gap.toFixed(3) + '</b>. ' +
        (gap < 1e-6 ? 'Zero gap at λ★ = 2 — strong duality: solving the dual solved the primal.' : 'The dual is below p★ (weak duality). Push λ toward 2 to close the gap.');
    }
    slider(ctl, { label: 'multiplier λ', min: 0, max: 4, step: 0.05, value: lam, fmt: v => v.toFixed(2), onInput: v => { lam = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Lagrangian-duality visualizer for minimize x squared subject to x at least 1. A gold dashed horizontal line marks the primal optimum p-star = 1. A violet concave curve is the dual function g of lambda = lambda minus lambda squared over four, which stays at or below p-star (weak duality). A slider sets lambda; a rust bar shows the duality gap p-star minus g of lambda, which shrinks to zero at the dual optimum lambda-star = 2, illustrating strong duality.');
    draw();
  });


  /* ========================================================
     121. Integration by parts as area (Calculus)
     ======================================================== */
  register({ id: 'calc-by-parts', topic: 'calculus', title: 'Integration by parts is two areas tiling a rectangle', blurb: 'Integration by parts, ∫u dv = uv − ∫v du, is a picture. Take a curve v(u) from the origin to (u, v). The area UNDER it (∫v du, sage) and the area to its LEFT (∫u dv, violet) fit together perfectly to fill the rectangle of area u·v — no overlap, no gap. So the two integrals must sum to uv, which is exactly the by-parts identity rearranged. Slide the endpoint and watch the two pieces always tile the box.' },
  function (root) {
    const W = 540, H = 320, padL = 42, padR = 16, padT = 16, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let u1 = 1.1;
    const UMAX = 1.5, VMAX = 2.3;
    const f = u => u * u;                 // v = u^2 (monotonic through the origin)
    const X = u => padL + (u / UMAX) * (W - padL - padR);
    const Y = v => (H - padB) - (v / VMAX) * (H - padT - padB);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const v1 = f(u1), N = 80;
      // region UNDER the curve  =  ∫ v du   (sage)
      ctx.fillStyle = p.sage; ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.moveTo(X(0), Y(0));
      for (let i = 0; i <= N; i++) { const u = u1 * i / N; ctx.lineTo(X(u), Y(f(u))); }
      ctx.lineTo(X(u1), Y(0)); ctx.closePath(); ctx.fill();
      // region LEFT of the curve  =  ∫ u dv   (violet)
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(v1)); ctx.lineTo(X(u1), Y(v1));
      for (let i = N; i >= 0; i--) { const u = u1 * i / N; ctx.lineTo(X(u), Y(f(u))); }
      ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      // rectangle outline (area u*v)
      ctx.strokeStyle = p.gold; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.strokeRect(X(0), Y(v1), X(u1) - X(0), Y(0) - Y(v1)); ctx.setLineDash([]);
      // the curve
      ctx.strokeStyle = p.ink; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= N; i++) { const u = u1 * i / N; i ? ctx.lineTo(X(u), Y(f(u))) : ctx.moveTo(X(u), Y(f(u))); } ctx.stroke();
      ctx.fillStyle = p.ink; ctx.beginPath(); ctx.arc(X(u1), Y(v1), 4, 0, 7); ctx.fill();
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(padL, padT); ctx.lineTo(padL, Y(0)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('u', W - padR - 6, Y(0) + 16); ctx.save(); ctx.translate(padL - 26, padT + 10); ctx.rotate(-Math.PI / 2); ctx.fillText('v', 0, 0); ctx.restore();
      const below = u1 * u1 * u1 / 3, left = 2 * u1 * u1 * u1 / 3, rect = u1 * v1;
      info.innerHTML = '<b style="color:' + p.sage + '">∫v du = ' + below.toFixed(3) + '</b> &nbsp;+&nbsp; <b style="color:' + p.violet + '">∫u dv = ' + left.toFixed(3) + '</b> &nbsp;=&nbsp; <b style="color:' + p.gold + '">u·v = ' + rect.toFixed(3) + '</b>. The two areas tile the rectangle, so ∫u dv = uv − ∫v du — integration by parts.';
    }
    slider(ctl, { label: 'endpoint u', min: 0.3, max: 1.5, step: 0.02, value: u1, fmt: v => v.toFixed(2), onInput: v => { u1 = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Integration-by-parts area visualizer. A curve v = u squared runs from the origin to the point (u, v). The sage region under the curve is the integral of v du; the violet region to the left of the curve is the integral of u dv. Together they exactly fill the dashed gold rectangle of area u times v, with no overlap or gap — so the two integrals sum to u v, which rearranges to the by-parts identity integral of u dv = u v minus integral of v du. A slider moves the endpoint u.');
    draw();
  });


  /* ========================================================
     122. Compounding errors in behavioral cloning (Reinforcement Learning)
     ======================================================== */
  register({ id: 'rl-bc-compounding', topic: 'reinforcement-learning', title: 'Why behavioral cloning drifts: errors compound', blurb: 'Behavioral cloning trains a policy by supervised learning on expert demonstrations — but a tiny per-step error rate ε hurts far more than in ordinary supervised learning. One mistake nudges the agent to a state the expert never visited, where it is even more likely to err, so mistakes cascade. The total cost grows like ε·T² over a horizon T (quadratic), versus ε·T (linear) for a method like DAgger that trains on the agent’s own states. Slide the horizon and watch the gap explode.' },
  function (root) {
    const W = 540, H = 320, padL = 46, padR = 16, padT = 18, padB = 36;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const eps = 0.06, TMAX = 30;
    let T = 12;
    const lin = t => eps * t, quad = t => eps * t * t;
    const ymax = quad(TMAX);
    const X = t => padL + (t / TMAX) * (W - padL - padR);
    const Y = v => (H - padB) - (v / ymax) * (H - padT - padB);
    function curve(fn, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const t = i / 120 * TMAX; i ? ctx.lineTo(X(t), Y(fn(t))) : ctx.moveTo(X(t), Y(fn(t))); } ctx.stroke(); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.moveTo(padL, padT); ctx.lineTo(padL, Y(0)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [0, 10, 20, 30].forEach(t => ctx.fillText(t, X(t), Y(0) + 14)); ctx.fillText('horizon T (steps)', W / 2, H - 4);
      ctx.save(); ctx.translate(padL - 30, (padT + Y(0)) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('total error', 0, 0); ctx.restore();
      curve(quad, p.rust, 2.6); curve(lin, p.sage, 2.6);
      // marker at T
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(T), padT); ctx.lineTo(X(T), Y(0)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      ctx.fillStyle = p.rust; ctx.beginPath(); ctx.arc(X(T), Y(quad(T)), 4.5, 0, 7); ctx.fill();
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(X(T), Y(lin(T)), 4.5, 0, 7); ctx.fill();
      // labels
      ctx.textAlign = 'left'; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      ctx.fillStyle = p.rust; ctx.fillText('behavioral cloning  ε·T²', X(2), Y(quad(TMAX) * 0.92));
      ctx.fillStyle = p.sage; ctx.fillText('DAgger / supervised  ε·T', X(11), Y(lin(TMAX)) - 8);
      info.innerHTML = 'horizon T = <b>' + T + '</b> (ε = ' + eps + ') &middot; DAgger <b style="color:' + p.sage + '">' + lin(T).toFixed(2) + '</b> vs behavioral cloning <b style="color:' + p.rust + '">' + quad(T).toFixed(2) + '</b> &middot; BC is <b>' + T + '×</b> worse. The ratio ε·T²/ε·T = T grows without bound — clone-and-pray fails on long tasks; DAgger restores linear error by labeling the states the agent actually reaches.';
    }
    slider(ctl, { label: 'horizon T', min: 2, max: 30, step: 1, value: T, fmt: v => String(v), onInput: v => { T = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Compounding-error visualizer for behavioral cloning. Two curves of total error versus horizon T at a fixed per-step error rate epsilon: a sage line for DAgger/supervised growing linearly as epsilon times T, and a rust curve for behavioral cloning growing quadratically as epsilon times T squared. A slider moves T; the readout shows both errors and notes that behavioral cloning is T times worse, because the ratio epsilon T squared over epsilon T equals T and grows without bound.');
    draw();
  });


  /* ========================================================
     123. Mixture-of-Experts routing (LLMs)
     ======================================================== */
  register({ id: 'llm-moe-router', topic: 'llm', title: 'Mixture of Experts: sparse top-k routing', blurb: 'Each token is scored by a router and sent to only its top-k experts out of N — so capacity (total parameters) scales with N while compute (FLOPs per token) scales with k. Slide k: at k=1 (Switch-style) each token touches one expert and compute is minimal but some experts may go unused; raising k spreads tokens and lifts quality at higher cost. Lines show each token routed to its chosen experts; dim experts received no tokens this step.' },
  function (root) {
    const W = 540, H = 330, padT = 30, padB = 16;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const NE = 8;                       // experts
    const TOK = ['The', 'cat', 'sat', 'on', 'mat'];
    const scores = [
      [0.9, 0.2, 0.7, 0.1, 0.4, 0.8, 0.3, 0.5],
      [0.3, 0.85, 0.2, 0.6, 0.9, 0.1, 0.4, 0.5],
      [0.5, 0.4, 0.95, 0.3, 0.2, 0.6, 0.8, 0.1],
      [0.2, 0.6, 0.3, 0.9, 0.5, 0.4, 0.1, 0.75],
      [0.7, 0.3, 0.5, 0.2, 0.8, 0.95, 0.6, 0.4]
    ];
    let k = 2;
    const tokX = 70, expX = W - 90;
    const tokY = i => padT + 18 + i * ((H - padT - padB - 30) / (TOK.length - 1));
    const expY = i => padT + 6 + i * ((H - padT - padB - 12) / (NE - 1));
    function topk(row, k) { return row.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]).slice(0, k).map(p => p[1]); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('tokens', tokX, 16); ctx.fillText('router', W / 2, 16); ctx.fillText(NE + ' experts', expX, 16);
      const used = new Set();
      // edges
      for (let t = 0; t < TOK.length; t++) {
        const picks = topk(scores[t], k); picks.forEach(e => used.add(e));
        picks.forEach(e => {
          ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.45; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(tokX + 26, tokY(t)); ctx.quadraticCurveTo(W / 2, (tokY(t) + expY(e)) / 2, expX - 26, expY(e)); ctx.stroke();
        });
      }
      ctx.globalAlpha = 1;
      // tokens
      for (let t = 0; t < TOK.length; t++) {
        ctx.fillStyle = p.panel; ctx.strokeStyle = p.line; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(tokX, tokY(t), 16, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = p.ink; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(TOK[t], tokX, tokY(t) + 1);
      }
      // experts
      for (let e = 0; e < NE; e++) {
        const on = used.has(e);
        ctx.fillStyle = on ? p.sage : p.panel; ctx.globalAlpha = on ? 0.85 : 0.4; ctx.strokeStyle = on ? p.sage : p.line; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(expX, expY(e), 14, 0, 7); ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
        ctx.fillStyle = on ? p.bg : p.mute; ctx.fillText('E' + (e + 1), expX, expY(e) + 1);
      }
      const pct = Math.round(100 * k / NE);
      info.innerHTML = 'top-k = <b>' + k + '</b> of ' + NE + ' experts &middot; each token uses <b style="color:' + p.sage + '">' + pct + '%</b> of expert compute &middot; experts active this step: <b>' + used.size + '/' + NE + '</b>. ' +
        (k === 1 ? 'Switch-style top-1: cheapest, but some experts may sit idle (load-balancing matters).' : 'Capacity is still all ' + NE + ' experts; only the per-token FLOPs grow with k.');
    }
    slider(ctl, { label: 'top-k experts', min: 1, max: 4, step: 1, value: k, fmt: v => String(v), onInput: v => { k = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Mixture-of-Experts routing visualizer: five tokens on the left connect through a router to eight experts on the right. A slider sets top-k; each token routes to its k highest-scoring experts (gold lines), and experts that receive at least one token light up (sage). The readout shows that each token uses k/8 of the expert compute while total capacity stays at all eight experts, and that low k can leave some experts idle.');
    draw();
  });


  /* ========================================================
     124. Vision Transformer patchify (Deep Learning)
     ======================================================== */
  register({ id: 'dl-vit-patchify', topic: 'deep-learning', title: 'Vision Transformer: an image becomes a sequence of patches', blurb: 'A ViT chops an image into a grid of fixed-size patches and treats each patch as a token — so the image becomes a sequence the transformer can attend over. Slide the patch size: smaller patches give more tokens (finer detail) but cost grows fast, because self-attention is O(n²) in the number of patches. The strip on the right is the resulting token sequence.' },
  function (root) {
    const W = 540, H = 330;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let d = 7;                          // patches per side
    const IMG = 220, ix = 24, iy = 40;  // image square
    function imgColor(u, v) {           // a smooth "image": diagonal gold gradient + a soft blob
      const blob = Math.exp(-(((u - 0.65) ** 2 + (v - 0.35) ** 2) / 0.06));
      return 0.25 + 0.55 * (u * 0.5 + (1 - v) * 0.5) + 0.4 * blob;   // 0..~1 intensity
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left';
      ctx.fillText('image → ' + (d * d) + ' patches', ix, 26);
      ctx.textAlign = 'right'; ctx.fillText('token sequence', W - 18, 26); ctx.textAlign = 'left';
      // draw the patchified image
      const cell = IMG / d;
      for (let r = 0; r < d; r++) for (let col = 0; col < d; col++) {
        const u = (col + 0.5) / d, v = (r + 0.5) / d, t = Math.max(0, Math.min(1, imgColor(u, v)));
        // tint from panel to gold by intensity
        ctx.fillStyle = 'rgba(224,164,88,' + (0.12 + 0.8 * t) + ')';
        ctx.fillRect(ix + col * cell, iy + r * cell, cell - 1.2, cell - 1.2);
      }
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.strokeRect(ix, iy, IMG, IMG);
      // token strip on the right: N small squares wrapped in a column band
      const N = d * d, sx = ix + IMG + 26, sw = W - sx - 16;
      const cols = Math.max(1, Math.floor(sw / 16)), ts = Math.min(15, Math.floor(sw / cols) - 2);
      for (let i = 0; i < N; i++) {
        const u = ((i % d) + 0.5) / d, v = (Math.floor(i / d) + 0.5) / d, t = Math.max(0, Math.min(1, imgColor(u, v)));
        const tc = i % cols, tr = Math.floor(i / cols);
        const x = sx + tc * (ts + 2), y = iy + tr * (ts + 2);
        if (y + ts > iy + IMG + 2) continue;   // clip overflow gracefully
        ctx.fillStyle = 'rgba(108,174,143,' + (0.2 + 0.75 * t) + ')';
        ctx.fillRect(x, y, ts, ts);
      }
      const seq = N + 1, cost = N * N;
      info.innerHTML = 'patch grid <b>' + d + '×' + d + '</b> → <b>' + N + '</b> patch-tokens (+[CLS] = ' + seq + ') &middot; attention cost ∝ n² = <b>' + cost.toLocaleString() + '</b>. ' +
        (d >= 12 ? 'Many small patches: fine detail, but n² attention is now very expensive.' : 'Bigger patches = fewer tokens = cheaper attention, at the cost of spatial detail.');
    }
    slider(ctl, { label: 'patches per side', min: 2, max: 14, step: 1, value: d, fmt: v => v + '×' + v, onInput: v => { d = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Vision-Transformer patchify visualizer: an image on the left is divided into a d-by-d grid of patches; a slider sets d. The right strip shows the resulting d-squared patch-tokens as a sequence. The readout reports the token count (plus a CLS token) and that self-attention cost grows as n-squared in the number of patches, so smaller patches give finer detail but much higher cost.');
    draw();
  });


  /* ========================================================
     125. Curse of dimensionality: distance concentration (Machine Learning)
     ======================================================== */
  register({ id: 'ml-curse-dimensionality', topic: 'machine-learning', title: 'Curse of dimensionality: distances concentrate', blurb: 'Sample random points and look at all their pairwise distances. In low dimensions the distances are spread out — some pairs near, some far. Crank up the dimension and the histogram collapses into a narrow spike: every pair becomes almost equally distant, so the nearest/farthest ratio climbs toward 1 and "nearest neighbor" loses its meaning. This is why k-NN, clustering, and density estimation degrade in high dimensions — and why we reduce dimensions first.' },
  function (root) {
    const W = 540, H = 320, padL = 40, padR = 16, padT = 20, padB = 36;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let dim = 2; const N = 40;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function dists(d) {
      const r = prng(12345), P = [];
      for (let i = 0; i < N; i++) { const p = []; for (let k = 0; k < d; k++) p.push(r()); P.push(p); }
      const D = [];
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { let s = 0; for (let k = 0; k < d; k++) { const e = P[i][k] - P[j][k]; s += e * e; } D.push(Math.sqrt(s)); }
      return D;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const D = dists(dim), mn = Math.min(...D), mx = Math.max(...D);
      const mean = D.reduce((a, b) => a + b, 0) / D.length;
      const sd = Math.sqrt(D.reduce((a, b) => a + (b - mean) * (b - mean), 0) / D.length);
      // histogram over [0, mx]
      const BINS = 32, hi = new Array(BINS).fill(0);
      D.forEach(v => { let b = Math.floor(v / mx * BINS); if (b >= BINS) b = BINS - 1; if (b < 0) b = 0; hi[b]++; });
      const hmax = Math.max(...hi), Yb = H - padB, plotW = W - padL - padR, bw = plotW / BINS;
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Yb); ctx.lineTo(W - padR, Yb); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('0', padL, Yb + 14); ctx.fillText(mx.toFixed(1), W - padR, Yb + 14); ctx.fillText('pairwise distance', W / 2, H - 4);
      // bars
      for (let b = 0; b < BINS; b++) {
        const h = hi[b] / hmax * (Yb - padT);
        ctx.fillStyle = p.violet; ctx.globalAlpha = 0.85; ctx.fillRect(padL + b * bw, Yb - h, bw - 1, h); ctx.globalAlpha = 1;
      }
      // mean line
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.4; const mx2 = padL + mean / mx * plotW;
      ctx.beginPath(); ctx.moveTo(mx2, padT); ctx.lineTo(mx2, Yb); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.fillText('mean', mx2 + 4, padT + 8);
      const cv = sd / mean, ratio = mn / mx;
      info.innerHTML = 'dimension d = <b>' + dim + '</b> &middot; relative spread (std/mean) = <b style="color:' + p.violet + '">' + cv.toFixed(3) + '</b> &middot; nearest/farthest = <b style="color:' + p.gold + '">' + ratio.toFixed(3) + '</b>. ' +
        (dim >= 20 ? 'Concentrated: the histogram is a narrow spike and every pair is nearly equidistant — "nearest neighbor" is meaningless here.' : 'Low-d: distances are spread out, so near vs far is still informative.');
    }
    slider(ctl, { label: 'dimension d', min: 1, max: 50, step: 1, value: dim, fmt: v => String(v), onInput: v => { dim = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Curse-of-dimensionality visualizer: a histogram of all pairwise distances among 40 random points, with a dimension slider. At low dimension the distances are widely spread; as the dimension increases the histogram concentrates into a narrow spike far from zero, the relative spread (standard deviation over mean) shrinks toward zero, and the nearest-over-farthest distance ratio climbs toward 1 — so points become nearly equidistant and nearest-neighbor methods break down.');
    draw();
  });


  /* ========================================================
     126. GNN message passing & over-smoothing (Deep Learning)
     ======================================================== */
  register({ id: 'dl-gnn-message-passing', topic: 'deep-learning', title: 'GNN message passing (and over-smoothing)', blurb: 'Each message-passing layer replaces every node’s value with the average of itself and its neighbors. Slide the number of layers: information spreads along the edges (a node’s color blends toward its neighborhood), which is exactly how GNNs learn from graph structure. But push too far and every node converges to the same value — the over-smoothing that keeps GNNs shallow. Watch the spread shrink toward zero.' },
  function (root) {
    const W = 540, H = 320;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const adj = [[1, 5, 3], [0, 2, 4], [1, 3], [2, 4, 0], [3, 5, 1], [4, 0]];
    const init = [0.95, 0.15, 0.75, 0.25, 0.85, 0.35];
    let layers = 0;
    const cx = 230, cy = H / 2, R = 110;
    const pos = init.map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    function values(L) { let v = init.slice(); for (let s = 0; s < L; s++) v = v.map((x, i) => { const g = [i, ...adj[i]]; return g.reduce((acc, j) => acc + v[j], 0) / g.length; }); return v; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const v = values(layers);
      // edges
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.6;
      adj.forEach((ns, i) => ns.forEach(j => { if (j > i) { ctx.beginPath(); ctx.moveTo(pos[i][0], pos[i][1]); ctx.lineTo(pos[j][0], pos[j][1]); ctx.stroke(); } }));
      // nodes (gold opacity = value -> all similar = over-smoothed)
      v.forEach((val, i) => {
        const a = 0.12 + 0.85 * Math.max(0, Math.min(1, val));
        ctx.fillStyle = p.gold; ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(pos[i][0], pos[i][1], 22, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = p.gold; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = p.ink; ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(val.toFixed(2), pos[i][0], pos[i][1] + 1);
      });
      const mean = v.reduce((s, x) => s + x, 0) / v.length, sd = Math.sqrt(v.reduce((s, x) => s + (x - mean) * (x - mean), 0) / v.length);
      info.innerHTML = 'message-passing layers = <b>' + layers + '</b> &middot; spread (std of node values) = <b style="color:' + p.gold + '">' + sd.toFixed(4) + '</b>. ' +
        (layers === 0 ? 'Layer 0: the raw node features, spread out.' : sd < 0.01 ? 'Over-smoothed: every node has collapsed to nearly the same value — class information is gone.' : 'Each node has blended in its neighborhood; spread keeps shrinking with more layers.');
    }
    slider(ctl, { label: 'layers', min: 0, max: 8, step: 1, value: layers, fmt: v => String(v), onInput: v => { layers = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'GNN message-passing visualizer: a 6-node graph whose nodes hold values shown as gold-opacity circles. A slider sets the number of message-passing layers; each layer replaces every node value with the average of itself and its neighbors. As layers increase the values blend and the spread (standard deviation) shrinks toward zero, so all nodes converge to the same value — illustrating both how GNNs propagate information and the over-smoothing that limits their depth.');
    draw();
  });


  /* ========================================================
     127. The reparameterization trick: z = mu + sigma*eps (Deep Learning)
     ======================================================== */
  register({ id: 'dl-reparameterization', topic: 'deep-learning', title: 'The reparameterization trick: z = μ + σ·ε', blurb: 'A VAE needs to sample its latent z, but you cannot backprop through a random draw. The trick: pull the randomness OUT into a fixed noise ε ~ N(0,1) drawn once, and compute z = μ + σ·ε. Now z is a smooth, deterministic function of the encoder outputs μ and σ — slide them and watch the same ε points shift (μ) and spread (σ) in lockstep, so gradients ∂z/∂μ = 1 and ∂z/∂σ = ε flow straight back to the encoder.' },
  function (root) {
    const W = 540, H = 300, cx = W / 2, scale = 34, topY = 96, botY = 232;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const EPS = [-1.9, -1.3, -0.9, -0.55, -0.25, 0.25, 0.55, 0.9, 1.3, 1.9];
    let mu = 0, sg = 1;
    function gauss(ctx2, m, s, yBase, col, p) {
      ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.9; ctx.beginPath();
      for (let px = 0; px <= W; px += 3) { const x = (px - cx) / scale; const y = Math.exp(-0.5 * ((x - m) / s) * ((x - m) / s)); const yy = yBase - y * 46; if (px === 0) ctx.moveTo(px, yy); else ctx.lineTo(px, yy); }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textBaseline = 'alphabetic';
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(16, topY); ctx.lineTo(W - 16, topY); ctx.moveTo(16, botY); ctx.lineTo(W - 16, botY); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'left';
      ctx.fillText('ε ~ N(0, 1)   (fixed noise, drawn once)', 16, topY - 52);
      ctx.fillText('z = μ + σ·ε   ~ N(μ, σ²)', 16, botY - 52);
      // curves
      gauss(ctx, 0, 1, topY, p.sage, p);
      gauss(ctx, mu, sg, botY, p.gold, p);
      // connecting lines + points
      EPS.forEach(e => {
        const xt = cx + e * scale, z = mu + sg * e, xb = cx + z * scale;
        ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xt, topY); ctx.lineTo(xb, botY); ctx.stroke(); ctx.globalAlpha = 1;
        ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(xt, topY, 4.5, 0, 7); ctx.fill();
        ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(Math.max(8, Math.min(W - 8, xb)), botY, 4.5, 0, 7); ctx.fill();
      });
      // mu marker on bottom axis
      ctx.strokeStyle = p.rust; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(cx + mu * scale, botY - 50); ctx.lineTo(cx + mu * scale, botY + 6); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.rust; ctx.textAlign = 'center'; ctx.fillText('μ', cx + mu * scale, botY + 18);
      info.innerHTML = 'μ = <b style="color:' + p.rust + '">' + mu.toFixed(2) + '</b> · σ = <b style="color:' + p.gold + '">' + sg.toFixed(2) + '</b> · the noise ε never changes — z is a smooth function of μ, σ, so <b>∂z/∂μ = 1</b> and <b>∂z/∂σ = ε</b> carry gradients back to the encoder. (A raw <em>sample</em> z ~ N(μ, σ²) would block them.)';
    }
    slider(ctl, { label: 'μ (mean)', min: -3, max: 3, step: 0.05, value: mu, fmt: v => v.toFixed(2), onInput: v => { mu = v; draw(); } });
    slider(ctl, { label: 'σ (std)', min: 0.2, max: 2.5, step: 0.05, value: sg, fmt: v => v.toFixed(2), onInput: v => { sg = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Reparameterization-trick visualizer: a top axis shows ten fixed noise points drawn from a standard normal ε ~ N(0,1), and a bottom axis shows the latent z = μ + σ·ε under a N(μ, σ²) curve. Sliding the mean μ shifts every z point together and sliding the std σ spreads them, while the underlying ε points stay fixed — showing that z is a deterministic, differentiable function of μ and σ, so gradients flow back to the encoder, unlike a raw random sample.');
    draw();
  });


  /* ========================================================
     128. Contrastive learning: pull together, push apart (Deep Learning)
     ======================================================== */
  register({ id: 'dl-contrastive', topic: 'deep-learning', title: 'Contrastive learning: pull together, push apart', blurb: 'Six items, each with two "views" (a positive pair, same colour). At step 0 the embedding space is a random jumble. Drag the training slider: the contrastive objective pulls each positive pair together and pushes different items apart, so same-colour points collapse into tight clusters while the clusters themselves spread out — structure learned with no labels, just the pull/push of positives and negatives.' },
  function (root) {
    const W = 540, H = 320, pad = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const ITEMS = 6, SEED = 7;
    let steps = 0;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function run(n) {
      const r = prng(SEED); let P = [];
      for (let i = 0; i < ITEMS; i++) for (let v = 0; v < 2; v++) P.push({ x: r() * 2 - 1, y: r() * 2 - 1, item: i });
      for (let s = 0; s < n; s++) {
        const np = P.map(p => ({ x: p.x, y: p.y, item: p.item }));
        for (let i = 0; i < P.length; i++) {
          for (let j = 0; j < P.length; j++) {
            if (j === i) continue;
            const dx = P[j].x - P[i].x, dy = P[j].y - P[i].y, d = Math.hypot(dx, dy) + 1e-6;
            if (P[j].item === P[i].item) { np[i].x += 0.08 * dx; np[i].y += 0.08 * dy; }
            else { const f = Math.min(0.06 / (d * d), 0.05); np[i].x -= f * dx / d; np[i].y -= f * dy / d; }
          }
          np[i].x = Math.max(-1.4, Math.min(1.4, np[i].x)); np[i].y = Math.max(-1.4, Math.min(1.4, np[i].y));
        }
        P = np;
      }
      return P;
    }
    function metrics(P) {
      let pos = 0, pn = 0, cross = 0, cn = 0;
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y); if (P[i].item === P[j].item) { pos += d; pn++; } else { cross += d; cn++; } }
      return { posD: pos / pn, crossD: cross / cn };
    }
    const col = i => 'hsl(' + (i * 60) + ',62%,62%)';
    function mapX(x) { return pad + (x + 1.5) / 3 * (W - 2 * pad); }
    function mapY(y) { return pad + (y + 1.5) / 3 * (H - 2 * pad); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const pts = run(steps);
      // positive-pair connectors
      for (let i = 0; i < ITEMS; i++) {
        const a = pts[i * 2], b = pts[i * 2 + 1];
        ctx.strokeStyle = col(i); ctx.globalAlpha = 0.35; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(mapX(a.x), mapY(a.y)); ctx.lineTo(mapX(b.x), mapY(b.y)); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // points
      pts.forEach(pt => { ctx.fillStyle = col(pt.item); ctx.beginPath(); ctx.arc(mapX(pt.x), mapY(pt.y), 7, 0, 7); ctx.fill(); ctx.strokeStyle = p.bg; ctx.lineWidth = 1.5; ctx.stroke(); });
      const m = metrics(pts);
      info.innerHTML = 'training steps = <b>' + steps + '</b> · avg positive-pair distance = <b style="color:' + p.sage + '">' + m.posD.toFixed(2) + '</b> (want small) · avg cross distance = <b style="color:' + p.gold + '">' + m.crossD.toFixed(2) + '</b> (want large). ' +
        (steps === 0 ? 'Step 0: a random jumble — same-colour views are scattered.' : m.posD < 0.3 ? 'Converged: each colour has collapsed to a tight cluster, well separated from the rest — a useful representation, learned with no labels.' : 'Positives are pulling together; different items are pushing apart.');
    }
    slider(ctl, { label: 'training steps', min: 0, max: 40, step: 1, value: steps, fmt: v => String(v), onInput: v => { steps = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Contrastive-learning visualizer: twelve points (six coloured items, each a positive pair joined by a faint line) in a 2-D embedding space, with a training-steps slider. At step 0 the points are randomly scattered; as steps increase, each positive pair is pulled together and different items are pushed apart, so the average positive-pair distance shrinks toward zero and the average cross-item distance grows — the colours resolve into tight, well-separated clusters, a representation learned without labels.');
    draw();
  });


  /* ========================================================
     129. Double descent: test error vs model capacity (Machine Learning)
     ======================================================== */
  register({ id: 'ml-double-descent', topic: 'machine-learning', title: 'Double descent: capacity vs test error', blurb: 'The classic bias-variance story says test error is U-shaped: there is a sweet spot, and bigger models overfit. Slide model capacity rightward and watch the fuller picture — error dips (classical sweet spot), then spikes at the interpolation threshold where the model first fits the training data exactly, then descends a SECOND time, often below the old sweet spot. Modern over-parameterized networks live in that second descent: sometimes a bigger model, not a smaller one, cures overfitting.' },
  function (root) {
    const W = 540, H = 320, padL = 44, padR = 16, padT = 20, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const CMAX = 2;
    let cap = 0.55;
    function testErr(x) { return 0.18 + 0.60 * Math.exp(-3.0 * x) + 0.55 * Math.exp(-Math.pow((x - 1.0) / 0.16, 2)) + (x <= 1 ? 0.18 * x * x : 0.04); }
    function trainErr(x) { return x >= 1 ? 0 : 0.70 * Math.pow(1 - x, 1.5); }
    const X = x => padL + x / CMAX * (W - padL - padR);
    const Y = e => padT + (1 - e) * (H - padT - padB);
    function curve(fn, col, dash) {
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.setLineDash(dash || []); ctx.beginPath();
      for (let px = 0; px <= 1; px += 0.005) { const x = px * CMAX, y = Y(Math.min(1, fn(x))); if (px === 0) ctx.moveTo(X(x), y); else ctx.lineTo(X(x), y); }
      ctx.stroke(); ctx.setLineDash([]);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      // modern-regime shading (c > 1)
      ctx.fillStyle = p.panel2 || p.panel; ctx.globalAlpha = 0.35; ctx.fillRect(X(1), padT, X(CMAX) - X(1), H - padT - padB); ctx.globalAlpha = 1;
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'center';
      ctx.fillText('model capacity →', (padL + W - padR) / 2, H - 8);
      ctx.save(); ctx.translate(13, (padT + H - padB) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('error', 0, 0); ctx.restore();
      // interpolation threshold
      ctx.strokeStyle = p.rust; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(1), padT); ctx.lineTo(X(1), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.rust; ctx.fillText('interpolation', X(1), padT - 6);
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.fillText('classical', X(0.05), padT + 10); ctx.textAlign = 'right'; ctx.fillText('modern (interpolating)', X(CMAX) - 4, padT + 10);
      // curves
      curve(trainErr, p.sage); curve(testErr, p.gold);
      // legend
      ctx.textAlign = 'left'; ctx.fillStyle = p.gold; ctx.fillText('— test error', X(0.05), H - padB - 10); ctx.fillStyle = p.sage; ctx.fillText('— training error', X(0.05), H - padB + 2 - 10 + 14);
      // capacity marker
      const tx = X(cap), ty = Y(Math.min(1, testErr(cap)));
      ctx.strokeStyle = p.violet; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(tx, padT); ctx.lineTo(tx, H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.violet; ctx.beginPath(); ctx.arc(tx, ty, 5, 0, 7); ctx.fill();
      const regime = cap < 0.7 ? (cap < 0.4 ? 'underfitting (high bias)' : 'classical sweet spot') : cap < 1.08 ? 'interpolation peak (classic overfitting)' : 'modern regime — second descent';
      info.innerHTML = 'capacity = <b>' + cap.toFixed(2) + '</b> · test error = <b style="color:' + p.gold + '">' + testErr(cap).toFixed(2) + '</b> · <b style="color:' + p.violet + '">' + regime + '</b>. ' +
        (cap > 1.1 ? 'Past interpolation, error falls again — often below the classical sweet spot.' : cap > 1.0 ? 'Right at the threshold the model can just fit the data exactly — test error peaks here.' : 'The textbook U: bias falls, then variance rises toward the peak.');
    }
    slider(ctl, { label: 'model capacity', min: 0.05, max: 2, step: 0.05, value: cap, fmt: v => v.toFixed(2), onInput: v => { cap = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Double-descent visualizer: a plot of error versus model capacity. The training-error curve falls to zero at the interpolation threshold and stays there. The test-error curve shows the classical U (a sweet spot) then a spike at the interpolation threshold, then a second descent in the over-parameterized "modern" regime, often dropping below the classical sweet spot. A capacity slider moves a marker along the test curve and names the regime.');
    draw();
  });


  /* ========================================================
     130. The ReAct agent loop (LLM) — DOM step-through
     ======================================================== */
  register({ id: 'llm-react-loop', topic: 'llm', title: 'The ReAct agent loop: reason, act, observe, repeat', blurb: 'A plain LLM answers in one shot. An agent runs a loop: it has a Thought, takes an Action (calls a tool), reads the Observation, and feeds that back into the next Thought — repeating until it can answer. Step through an agent solving "France’s population, doubled": it searches, observes, calculates, observes, then answers. Two tool calls, one loop.' },
  function (root) {
    const STEPS = [
      { type: 'Thought',     text: 'I need France’s population, then double it.' },
      { type: 'Action',      text: 'search("population of France")' },
      { type: 'Observation', text: '≈ 68 million' },
      { type: 'Thought',     text: 'Now double 68 million using a calculator.' },
      { type: 'Action',      text: 'calculator("68000000 * 2")' },
      { type: 'Observation', text: '136000000' },
      { type: 'Answer',      text: '≈ 136 million.' }
    ];
    const COLORS = { Thought: 'violet', Action: 'gold', Observation: 'sage', Answer: 'rust' };
    const stage = el('div', 'react-stage', root);
    stage.style.cssText = 'min-height:150px;margin:4px 0 2px';
    const ctl = controls(root);
    const info = note(root);
    let shown = 0, nextBtn;
    function render() {
      const p = P(); stage.innerHTML = '';
      for (let i = 0; i < shown; i++) {
        const s = STEPS[i], col = p[COLORS[s.type]] || p.ink;
        const row = el('div', 'react-step', stage);
        row.style.cssText = 'display:flex;gap:10px;align-items:baseline;margin:6px 0;padding:8px 11px;border-left:3px solid ' + col + ';background:' + (p.panel || '#1b1b1b') + ';border-radius:7px';
        const badge = el('span', '', row); badge.textContent = s.type;
        badge.style.cssText = 'color:' + col + ';font-weight:700;min-width:104px;font-family:' + (cssVar('--font-mono') || 'monospace') + ';font-size:12px;letter-spacing:.3px';
        const txt = el('span', '', row); txt.textContent = s.text; txt.style.cssText = 'color:' + p.ink + ';font-size:14px';
      }
      const done = shown >= STEPS.length;
      if (nextBtn) { nextBtn.disabled = done; nextBtn.classList.toggle('disabled', done); }
      info.innerHTML = done
        ? 'Done in <b>' + STEPS.length + '</b> steps. The agent <b>looped</b> Thought → Action → Observation twice (search, then calculator) before answering — each Observation fed the next Thought. That loop is the whole idea.'
        : (shown === 0
          ? 'A plain model would answer in one shot. Click <b>Next step</b> to watch an <b>agent</b> work the problem with tools instead.'
          : 'Step <b>' + shown + ' / ' + STEPS.length + '</b> — reason, act, observe, repeat.');
    }
    nextBtn = button(ctl, 'Next step ▶', function () { if (shown < STEPS.length) { shown++; render(); } }, 'primary');
    button(ctl, 'Reset', function () { shown = 0; render(); });
    render();
  });


  /* ========================================================
     131. Time-series decomposition: observed = trend + seasonal + residual (Time Series)
     ======================================================== */
  register({ id: 'ts-decomposition', topic: 'time-series', title: 'Decomposition: observed = trend + seasonal + residual', blurb: 'Every classical time series is read as a sum of parts: a slow Trend, a repeating Seasonal pattern, and leftover Residual noise. The top panel is what you observe; the three below are the hidden pieces that add up to it. Slide the trend slope, the seasonal amplitude, and the noise level and watch the observed series — and its decomposition — change in lockstep.' },
  function (root) {
    const W = 540, H = 330, padL = 76, padR = 12, padT = 12, gap = 8;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 60, PERIOD = 12;
    let slope = 0.18, amp = 6, noiseAmp = 2;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function series() {
      const r = prng(20240617), trend = [], seasonal = [], residual = [], observed = [];
      for (let t = 0; t < N; t++) {
        trend.push(5 + slope * t);
        seasonal.push(amp * Math.sin(2 * Math.PI * t / PERIOD));
        residual.push(noiseAmp * (r() * 2 - 1));
        observed.push(trend[t] + seasonal[t] + residual[t]);
      }
      return { observed, trend, seasonal, residual };
    }
    function drawPanel(vals, label, col, y0, h) {
      const p = P();
      let lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals); if (hi - lo < 1e-6) { hi = lo + 1; lo -= 1; }
      const pad = (hi - lo) * 0.12; lo -= pad; hi += pad;
      const plotW = W - padL - padR;
      const X = i => padL + i / (N - 1) * plotW;
      const Y = v => y0 + h - (v - lo) / (hi - lo) * h;
      // baseline at 0 if in range
      if (lo < 0 && hi > 0) { ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath();
      vals.forEach((v, i) => { const x = X(i), yy = Y(v); if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); });
      ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillStyle = col; ctx.fillText(label, padL - 8, y0 + h / 2);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const s = series();
      const panelH = (H - padT - 3 * gap) / 4;
      drawPanel(s.observed, 'Observed', p.ink, padT, panelH);
      drawPanel(s.trend, 'Trend', p.gold, padT + (panelH + gap), panelH);
      drawPanel(s.seasonal, 'Seasonal', p.sage, padT + 2 * (panelH + gap), panelH);
      drawPanel(s.residual, 'Residual', p.rust, padT + 3 * (panelH + gap), panelH);
      info.innerHTML = '<b style="color:' + p.ink + '">Observed</b> = <b style="color:' + p.gold + '">Trend</b> + <b style="color:' + p.sage + '">Seasonal</b> + <b style="color:' + p.rust + '">Residual</b> &middot; trend slope ' + slope.toFixed(2) + ', seasonal amplitude ' + amp.toFixed(0) + ', noise ' + noiseAmp.toFixed(1) + '. The three lower panels add up, point by point, to the top one.';
    }
    slider(ctl, { label: 'trend slope', min: 0, max: 0.5, step: 0.01, value: slope, fmt: v => v.toFixed(2), onInput: v => { slope = v; draw(); } });
    slider(ctl, { label: 'seasonal amplitude', min: 0, max: 12, step: 0.5, value: amp, fmt: v => v.toFixed(0), onInput: v => { amp = v; draw(); } });
    slider(ctl, { label: 'noise level', min: 0, max: 6, step: 0.5, value: noiseAmp, fmt: v => v.toFixed(1), onInput: v => { noiseAmp = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Time-series decomposition visualizer: four stacked panels — Observed on top, then Trend, Seasonal, and Residual below. The observed series is the point-by-point sum of the three components. Sliders for trend slope, seasonal amplitude, and noise level change all panels together.');
    draw();
  });


  /* ========================================================
     132. AR(1) process explorer: phi controls the regime (Time Series)
     ======================================================== */
  register({ id: 'ts-ar-process', topic: 'time-series', title: 'AR(1) explorer: how φ sets the behaviour', blurb: 'An AR(1) series is yₜ = φ·yₜ₋₁ + noise. The single coefficient φ decides everything. Slide it: with 0 < φ < 1 the series mean-reverts (stationary); at φ = 1 it becomes a random walk that wanders without a fixed level (non-stationary — a unit root); past 1 it explodes; and negative φ makes it oscillate, flipping sign each step. Same noise throughout — only φ changes.' },
  function (root) {
    const W = 540, H = 300, padL = 14, padR = 14, padT = 16, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 80;
    let phi = 0.6;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function series() { const r = prng(99); const y = [0]; for (let t = 1; t < N; t++) y.push(phi * y[t - 1] + (r() * 2 - 1)); return y; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const y = series();
      let lo = Math.min.apply(null, y), hi = Math.max.apply(null, y); const span = Math.max(hi - lo, 2), pad = span * 0.12; lo -= pad; hi += pad;
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const X = i => padL + i / (N - 1) * plotW;
      const Y = v => padT + (1 - (v - lo) / (hi - lo)) * plotH;
      // zero line (the long-run mean for |phi|<1)
      if (lo < 0 && hi > 0) { ctx.strokeStyle = p.line; ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('mean 0', padL + 2, Y(0) - 3); }
      const abs = Math.abs(phi);
      const col = abs > 1.001 ? p.rust : Math.abs(phi - 1) < 0.02 ? p.gold : phi < 0 ? p.violet : p.sage;
      ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath();
      y.forEach((v, i) => { const x = X(i), yy = Y(v); if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); });
      ctx.stroke();
      const regime = abs > 1.001 ? 'explosive — non-stationary (runs off to infinity)'
        : Math.abs(phi - 1) < 0.02 ? 'random walk (unit root) — wanders, non-stationary'
        : phi < -0.02 ? 'stationary but oscillating — flips sign each step'
        : abs < 0.02 ? 'pure white noise (no memory)'
        : 'stationary — mean-reverts toward 0';
      info.innerHTML = 'φ = <b style="color:' + col + '">' + phi.toFixed(2) + '</b> · <b style="color:' + col + '">' + regime + '</b>. ' +
        (abs < 1 && abs > 0.02 ? 'Closer to 1 ⇒ slower reversion (more persistent); the stationarity condition is |φ| &lt; 1.' : abs > 1.001 ? 'Notice the vertical scale explode.' : '');
    }
    slider(ctl, { label: 'φ (AR coefficient)', min: -1.1, max: 1.1, step: 0.01, value: phi, fmt: v => v.toFixed(2), onInput: v => { phi = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'AR(1) process explorer: a line plot of y_t = phi*y_{t-1} + noise with a phi slider. For 0<phi<1 the series mean-reverts toward zero (stationary); at phi=1 it becomes a random walk that wanders (non-stationary unit root); for |phi|>1 it explodes; for negative phi it oscillates, flipping sign each step. The same fixed noise is used throughout so only phi changes the behaviour.');
    draw();
  });


  /* ========================================================
     133. Exponential smoothing: the alpha responsiveness dial (Time Series)
     ======================================================== */
  register({ id: 'ts-exp-smoothing', topic: 'time-series', title: 'Exponential smoothing: the α dial', blurb: 'Simple exponential smoothing tracks a noisy series with one knob, α. The dim line is the raw data (it jumps to a new level partway through); the bold line is the smoothed forecast. Slide α: near 0 it is silky-smooth but sluggish — it lags the level shift; near 1 it snaps to every wiggle, catching the shift instantly but echoing the noise. The art is the trade-off in between.' },
  function (root) {
    const W = 540, H = 300, padL = 30, padR = 14, padT = 16, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 64, STEP = 30;
    let alpha = 0.3;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function data() { const r = prng(42), y = []; for (let t = 0; t < N; t++) y.push((t < STEP ? 10 : 16) + (r() * 2 - 1) * 1.5); return y; }
    function smooth(y) { const s = [y[0]]; for (let t = 1; t < N; t++) s.push(alpha * y[t] + (1 - alpha) * s[t - 1]); return s; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const y = data(), s = smooth(y);
      let lo = Math.min.apply(null, y), hi = Math.max.apply(null, y); const pad = (hi - lo) * 0.12; lo -= pad; hi += pad;
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const X = i => padL + i / (N - 1) * plotW, Y = v => padT + (1 - (v - lo) / (hi - lo)) * plotH;
      // step marker
      ctx.strokeStyle = p.line; ctx.setLineDash([3, 4]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(STEP), padT); ctx.lineTo(X(STEP), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText('level shift', X(STEP), padT + 9);
      // raw data (dim)
      ctx.strokeStyle = p.mute; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.beginPath(); y.forEach((v, i) => { const x = X(i), yy = Y(v); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }); ctx.stroke();
      ctx.fillStyle = p.mute; y.forEach((v, i) => { ctx.beginPath(); ctx.arc(X(i), Y(v), 1.6, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
      // smoothed (bold)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.4; ctx.beginPath(); s.forEach((v, i) => { const x = X(i), yy = Y(v); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }); ctx.stroke();
      info.innerHTML = 'α = <b style="color:' + p.gold + '">' + alpha.toFixed(2) + '</b> · ' +
        (alpha < 0.2 ? 'very smooth but <b>laggy</b> — it crawls toward the new level long after the shift.'
          : alpha > 0.7 ? 'very <b>responsive</b> — it snaps to the shift fast but echoes the noise.'
          : 'a balance — fairly smooth, yet it tracks the level shift within a few steps.') +
        ' <span style="color:' + p.mute + '">(dim = raw data, bold = smoothed)</span>';
    }
    slider(ctl, { label: 'α (smoothing)', min: 0.02, max: 1, step: 0.02, value: alpha, fmt: v => v.toFixed(2), onInput: v => { alpha = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Exponential-smoothing explorer: a dim raw series that steps from one level to a higher one partway through, with a bold smoothed line and an alpha slider. Small alpha gives a smooth but laggy line that catches the level shift slowly; large alpha gives a responsive but noisy line that snaps to the shift quickly.');
    draw();
  });


  /* ========================================================
     134. Superposition: packing more features than dimensions (LLM / interpretability)
     ======================================================== */
  register({ id: 'dl-superposition', topic: 'llm', title: 'Superposition: more features than dimensions', blurb: 'A 2-D activation space can hold exactly 2 features cleanly — as perpendicular (orthogonal) directions with zero interference. Ask it to store more and they must squeeze together, overlapping as near-but-not-quite-orthogonal directions. Slide the number of features: at 2 there is no interference; beyond that the best the model can do is spread them evenly, and the unavoidable overlap (the largest pairwise cosine) climbs. Networks tolerate this because real features rarely fire at once — that is superposition.' },
  function (root) {
    const W = 540, H = 320, R = 116;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let N = 5;
    const cx = W / 2, cy = H / 2 + 6;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // axes (the 2 clean dimensions)
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - R - 14, cy); ctx.lineTo(cx + R + 14, cy); ctx.moveTo(cx, cy - R - 14); ctx.lineTo(cx, cy + R + 14); ctx.stroke(); ctx.globalAlpha = 1;
      const interference = Math.cos(Math.PI / N);
      // feature vectors spread evenly over a half-turn (180/N apart)
      const col = N <= 2 ? p.sage : interference < 0.7 ? p.gold : p.rust;
      for (let k = 0; k < N; k++) {
        const ang = k * Math.PI / N;  // 0..pi
        const x = cx + R * Math.cos(ang), y = cy - R * Math.sin(ang);
        ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
        ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('f' + (k + 1), cx + (R + 14) * Math.cos(ang), cy - (R + 14) * Math.sin(ang));
      }
      info.innerHTML = '<b>' + N + '</b> features in <b>2</b> dimensions · max interference (largest pairwise cosine) = <b style="color:' + col + '">' + interference.toFixed(2) + '</b>. ' +
        (N <= 2 ? 'They fit perfectly — orthogonal, zero overlap.' : 'No way to keep them all orthogonal in 2-D, so they overlap; the more features, the worse the interference — tolerated only because features are <em>sparse</em> (rarely active together).');
    }
    slider(ctl, { label: 'number of features', min: 2, max: 12, step: 1, value: N, fmt: v => String(v), onInput: v => { N = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Superposition visualizer: a 2-D plane with N feature directions drawn from the origin, spread evenly. At N=2 they are orthogonal with zero interference; as N increases beyond 2 the directions crowd together and the maximum pairwise cosine (interference) rises toward 1, illustrating how a network packs more features than dimensions by tolerating overlap, which works because features are sparse.');
    draw();
  });


  /* ========================================================
     135. ROC curve & AUC: sweep the threshold (Machine Learning)
     ======================================================== */
  register({ id: 'ml-roc', topic: 'machine-learning', title: 'ROC curve & AUC: the threshold-free score', blurb: 'A classifier outputs scores; you pick a threshold to call something positive. The ROC curve plots the true-positive rate against the false-positive rate as that threshold sweeps from strict to lenient. "Class separation" sets how distinguishable the two classes are: at 0 the classes overlap completely and the curve collapses to the diagonal (a coin flip, AUC 0.5); push it up and the curve bows toward the top-left corner (a perfect classifier, AUC 1). AUC — the area under the curve — summarises every threshold at once. The dot is your current operating point.' },
  function (root) {
    const W = 540, H = 330, padL = 46, padR = 16, padT = 16, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let d = 1.4, thr = 0.7;   // class separation, threshold (0..1 normalized across the score range)
    function erf(x) { const s = x < 0 ? -1 : 1; x = Math.abs(x); const p = 0.3275911, t = 1 / (1 + p * x); const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; }
    const Phi = x => 0.5 * (1 + erf(x / Math.SQRT2));
    const TPR = t => 1 - Phi(t - d), FPR = t => 1 - Phi(t);   // neg ~ N(0,1), pos ~ N(d,1)
    const LO = -4, HI = 7, tAt = u => LO + (HI - LO) * (1 - u);   // u in [0,1] → threshold (u=1 strict/high t? invert so dot moves intuitively)
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const X = fpr => padL + fpr * plotW, Y = tpr => padT + (1 - tpr) * plotH;
      // axes
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.strokeRect(padL, padT, plotW, plotH);
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      ctx.textAlign = 'center'; ctx.fillText('False-positive rate →', padL + plotW / 2, H - 12);
      ctx.save(); ctx.translate(13, padT + plotH / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('True-positive rate →', 0, 0); ctx.restore();
      // diagonal = random classifier
      ctx.strokeStyle = p.mute; ctx.setLineDash([5, 4]); ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(1)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      // ROC curve + AUC shading + AUC (trapezoid)
      const pts = []; for (let tt = HI; tt >= LO; tt -= 0.04) pts.push([FPR(tt), TPR(tt)]);
      ctx.fillStyle = 'rgba(224,164,88,0.13)'; ctx.beginPath(); ctx.moveTo(X(0), Y(0));
      pts.forEach(q => ctx.lineTo(X(q[0]), Y(q[1]))); ctx.lineTo(X(1), Y(0)); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.4; ctx.beginPath(); pts.forEach((q, i) => { const x = X(q[0]), y = Y(q[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
      let auc = 0; for (let i = 1; i < pts.length; i++) auc += (pts[i][0] - pts[i - 1][0]) * (pts[i][1] + pts[i - 1][1]) / 2;
      // operating point
      const t0 = tAt(thr), fx = FPR(t0), ty = TPR(t0);
      ctx.fillStyle = p.rust; ctx.strokeStyle = p.bg; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(fx), Y(ty), 6, 0, 7); ctx.fill(); ctx.stroke();
      const quality = auc >= 0.9 ? 'excellent' : auc >= 0.8 ? 'good' : auc >= 0.7 ? 'fair' : auc >= 0.6 ? 'poor' : 'near-random';
      info.innerHTML = 'AUC = <b style="color:' + p.gold + '">' + auc.toFixed(3) + '</b> (<b>' + quality + '</b>) · operating point: TPR <b style="color:' + p.rust + '">' + ty.toFixed(2) + '</b>, FPR <b style="color:' + p.rust + '">' + fx.toFixed(2) + '</b>. ' +
        (d < 0.1 ? 'The classes fully overlap — the curve <em>is</em> the diagonal; no threshold beats a coin flip.' : 'Slide the threshold to trade recall (TPR) against false alarms (FPR); raise separation to bow the curve toward the corner.');
    }
    slider(ctl, { label: 'class separation', min: 0, max: 3, step: 0.05, value: d, fmt: v => v.toFixed(2), onInput: v => { d = v; draw(); } });
    slider(ctl, { label: 'threshold (operating point)', min: 0, max: 1, step: 0.01, value: thr, fmt: v => v.toFixed(2), onInput: v => { thr = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'ROC curve explorer: true-positive rate versus false-positive rate as a decision threshold sweeps, for two Gaussian class-score distributions. A class-separation slider controls overlap — at 0 the curve is the diagonal (AUC 0.5, random); higher separation bows it toward the top-left corner (AUC toward 1). A threshold slider marks the current operating point on the curve, and AUC (area under the curve) is reported.');
    draw();
  });


  /* ========================================================
     136. k-fold cross-validation: every point validates once (Machine Learning)
     ======================================================== */
  register({ id: 'ml-cross-validation', topic: 'machine-learning', title: 'k-fold cross-validation', blurb: 'A single train/validation split wastes data and gives a noisy estimate that depends on which rows landed in validation. k-fold cross-validation splits the data into k equal parts and trains k times — each fold takes a turn as the validation set (gold) while the other k−1 train (sage). Every point is validated exactly once; averaging the k scores gives a far more stable estimate, and their spread tells you how sensitive the model is to the split. Slide k to see the trade-off: more folds ⇒ more training data per run (less bias) but more runs and higher-variance individual estimates.' },
  function (root) {
    const W = 540, H = 320, padL = 14, padT = 16, padB = 30, rowGap = 6, scoreW = 132;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let K = 5;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const gridW = W - padL - scoreW - padL, gridH = H - padT - padB;
      const rowH = (gridH - rowGap * (K - 1)) / K, cellW = gridW / K;
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      const r = prng(7 + K), scores = [];
      for (let i = 0; i < K; i++) {
        const y = padT + i * (rowH + rowGap);
        for (let j = 0; j < K; j++) {
          const x = padL + j * cellW, isVal = j === i;
          ctx.fillStyle = isVal ? p.gold : 'rgba(136,163,122,0.32)';
          ctx.fillRect(x + 1, y, cellW - 2, rowH);
        }
        // per-fold synthetic validation score (seeded), shown as a mini bar + number
        const sc = 0.78 + r() * 0.16; scores.push(sc);
        const bx = padL + gridW + padL, bw = scoreW - padL - 36;
        ctx.fillStyle = p.line; ctx.fillRect(bx, y + rowH / 2 - 4, bw, 8);
        ctx.fillStyle = p.sage; ctx.fillRect(bx, y + rowH / 2 - 4, bw * ((sc - 0.7) / 0.3), 8);
        ctx.fillStyle = p.soft; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText((sc * 100).toFixed(0) + '%', bx + bw + 6, y + rowH / 2);
      }
      // header labels
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText('each row = one training run', padL, H - 12);
      ctx.textAlign = 'left'; ctx.fillText('val score', padL + gridW + padL, H - 12);
      const mean = scores.reduce((a, b) => a + b, 0) / K;
      const sd = Math.sqrt(scores.reduce((a, b) => a + (b - mean) * (b - mean), 0) / K);
      info.innerHTML = '<b>k = ' + K + '</b> · <span style="color:' + p.gold + '">gold</span> = validation fold, <span style="color:' + p.sage + '">sage</span> = training. ' +
        'CV score = <b style="color:' + p.sage + '">' + (mean * 100).toFixed(1) + '%</b> ± ' + (sd * 100).toFixed(1) + '% (mean over ' + K + ' folds). ' +
        'Every point validates exactly once; the spread is your estimate’s uncertainty.';
    }
    slider(ctl, { label: 'k (number of folds)', min: 3, max: 10, step: 1, value: K, fmt: v => String(v), onInput: v => { K = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'k-fold cross-validation diagram: k rows, each a training run, with the dataset split into k cells across. In row i the i-th cell is the validation fold (gold) and the rest are training (sage), so every point is validated exactly once. Each row shows a synthetic validation score, and the mean plus or minus standard deviation across folds is the cross-validation estimate. A slider sets k from 3 to 10.');
    draw();
  });


  /* ========================================================
     137. Rolling-origin backtesting: train on past, test on next (Time Series)
     ======================================================== */
  register({ id: 'ts-backtesting', topic: 'time-series', title: 'Rolling-origin backtesting', blurb: 'You cannot shuffle a time series, so cross-validation has to respect the clock. Rolling-origin backtesting trains on the past (sage), forecasts the window that immediately follows (gold), then rolls the cut-point forward and repeats — each row is one train/test split, and every test window sits in the future of its training data. Toggle between an expanding window (training set keeps growing) and a sliding window (fixed size, forgetting old data when the process drifts). Averaging the gold-window errors gives an honest estimate of forecast skill.' },
  function (root) {
    const W = 540, H = 300, padL = 14, padR = 14, padT = 18, padB = 30, rowGap = 8;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 24, H_ = 3, K = 5, firstCut = 9;   // series length, horizon, splits, first cut-point
    let expanding = true;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const gridW = W - padL - padR, gridH = H - padT - padB;
      const rowH = (gridH - rowGap * (K - 1)) / K, unit = gridW / N;
      const win = firstCut;   // sliding-window train width
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      for (let i = 0; i < K; i++) {
        const y = padT + i * (rowH + rowGap);
        const cut = firstCut + i * H_;            // train ends here
        const valEnd = Math.min(cut + H_, N);
        const trainStart = expanding ? 0 : Math.max(0, cut - win);
        // baseline faint track
        ctx.fillStyle = 'rgba(150,136,113,0.13)'; ctx.fillRect(padL, y + rowH / 2 - 2, gridW, 4);
        // train segment (sage)
        ctx.fillStyle = 'rgba(136,163,122,0.5)'; ctx.fillRect(padL + trainStart * unit, y + 1, (cut - trainStart) * unit - 1, rowH - 2);
        // validation window (gold)
        ctx.fillStyle = p.gold; ctx.fillRect(padL + cut * unit, y + 1, (valEnd - cut) * unit - 1, rowH - 2);
        ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('split ' + (i + 1), padL + valEnd * unit + 6, y + rowH / 2);
      }
      // time axis arrow
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.beginPath(); ctx.moveTo(padL, H - padB + 10); ctx.lineTo(padL + gridW * 0.6, H - padB + 10); ctx.stroke();
      ctx.fillText('time →', padL, H - 8);
      info.innerHTML = '<b style="color:' + (expanding ? p.gold : p.mute) + '">' + (expanding ? 'Expanding' : 'Sliding') + ' window</b> · <span style="color:' + p.sage + '">sage</span> = train (past), <span style="color:' + p.gold + '">gold</span> = forecast & test (next). ' +
        'The cut-point rolls forward each split; every test window is strictly in the <em>future</em> of its training data — ' + (expanding ? 'and the training set keeps growing.' : 'with a fixed-width window that forgets old data.');
    }
    button(ctl, 'Toggle expanding / sliding', () => { expanding = !expanding; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Rolling-origin backtesting diagram: five stacked train/test splits on a left-to-right time axis. In each split the training portion (sage) covers the past up to a cut-point and the test window (gold) is the segment immediately after; the cut-point rolls forward each split so every test window lies in the future of its training data. A button toggles between an expanding training window that grows and a fixed-width sliding window.');
    draw();
  });


  /* ========================================================
     138. Fourier synthesis: a square wave from sine harmonics (signal processing)
     ======================================================== */
  register({ id: 'dl-fourier-synthesis', topic: 'deep-learning', title: 'Fourier synthesis: building a square wave from sines', blurb: 'The headline of Fourier analysis: ANY periodic signal is a sum of pure sine waves. Here the flat-topped square wave is rebuilt from odd harmonics — sin(x) + ⅓sin(3x) + ⅕sin(5x) + … Slide the number of harmonics: one sine is a crude bump, but each one you add sharpens the corners and flattens the top, closing in on the square. The stubborn overshoot at the jumps that never quite goes away is the famous Gibbs phenomenon. This decomposition into frequencies is exactly what makes the convolution theorem (and signal processing) work.' },
  function (root) {
    const W = 540, H = 300, padL = 14, padR = 14, padT = 16, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let N = 4;   // number of odd harmonics
    function partial(x) { let s = 0; for (let i = 0; i < N; i++) { const k = 2 * i + 1; s += Math.sin(k * x) / k; } return (4 / Math.PI) * s; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB, mid = padT + plotH / 2;
      const yScale = plotH / 2 / 1.35;   // leave headroom for the Gibbs overshoot (~1.18)
      const X = t => padL + (t / (2 * Math.PI)) * plotW;   // t in [0, 2pi]
      const Y = v => mid - v * yScale;
      // zero axis
      ctx.strokeStyle = p.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padL, mid); ctx.lineTo(W - padR, mid); ctx.stroke();
      // target square wave (faint dashed)
      ctx.strokeStyle = p.mute; ctx.globalAlpha = 0.6; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.beginPath();
      const sq = t => (Math.sin(t) >= 0 ? 1 : -1);
      let prev = null;
      for (let px = 0; px <= plotW; px++) { const t = (px / plotW) * 2 * Math.PI, v = sq(t); const x = padL + px, y = Y(v); if (prev !== null && prev !== v) { ctx.lineTo(x, Y(prev)); } prev === null ? ctx.moveTo(x, y) : ctx.lineTo(x, y); prev = v; }
      ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      // partial sum (bold gold)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let px = 0; px <= plotW; px++) { const t = (px / plotW) * 2 * Math.PI, x = padL + px, y = Y(partial(t)); px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
      const orders = []; for (let i = 0; i < Math.min(N, 4); i++) orders.push((i === 0 ? '' : (i === 1 ? '⅓' : i === 2 ? '⅕' : '⅐')) + 'sin(' + (2 * i + 1) + 'x)');
      info.innerHTML = '<b>' + N + '</b> harmonic' + (N > 1 ? 's' : '') + ': <span style="color:' + p.gold + '">' + orders.join(' + ') + (N > 4 ? ' + …' : '') + '</span>. ' +
        (N === 1 ? 'One sine — a smooth bump, nothing like a square yet.' : N < 6 ? 'The corners are sharpening and the top is flattening.' : 'Close to square — note the persistent <em>Gibbs</em> overshoot spikes at each jump.');
    }
    slider(ctl, { label: 'number of harmonics', min: 1, max: 15, step: 1, value: N, fmt: v => String(v), onInput: v => { N = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Fourier synthesis: a dashed target square wave with a bold partial sum of odd sine harmonics (sin x + one-third sin 3x + one-fifth sin 5x and so on). A slider sets the number of harmonics from 1 to 15; with one harmonic the sum is a smooth bump, and as harmonics are added the sum sharpens toward the square wave, leaving a persistent overshoot at the jumps known as the Gibbs phenomenon.');
    draw();
  });


  /* ========================================================
     139. VC dimension by shattering: a line shatters 3 points, not 4 (learning theory)
     ======================================================== */
  register({ id: 'dl-vc-shattering', topic: 'deep-learning', title: 'VC dimension: shattering points with a line', blurb: 'The VC dimension of a hypothesis class is the largest number of points it can shatter — label in every possible +/− way. Click a point to flip its label and watch a straight-line classifier try to separate the two colours. With 3 points (in general position) every one of the 8 labelings can be split, so a line shatters 3 points. Switch to 4 points and two labelings — the XOR/diagonal ones — can never be separated by a single line. That is why a linear classifier in 2-D has VC dimension exactly 3.' },
  function (root) {
    const W = 460, H = 320, R = 110;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const cx = W / 2, cy = H / 2 - 6;
    const TRI = [[0, 1], [-0.87, -0.5], [0.87, -0.5]];
    const SQ = [[-0.72, 0.72], [0.72, 0.72], [-0.72, -0.72], [0.72, -0.72]];
    let pts = TRI.slice(), labels = pts.map(() => 1);
    function separating(P, L) {            // returns {wx,wy,b} of a separating line, or null
      for (let a = 0; a < 180; a++) {
        const th = a * Math.PI / 180, wx = Math.cos(th), wy = Math.sin(th);
        let maxNeg = -1e9, minPos = 1e9, maxPos = -1e9, minNeg = 1e9, nPos = 0, nNeg = 0;
        for (let i = 0; i < P.length; i++) { const s = wx * P[i][0] + wy * P[i][1]; if (L[i] > 0) { nPos++; minPos = Math.min(minPos, s); maxPos = Math.max(maxPos, s); } else { nNeg++; minNeg = Math.min(minNeg, s); maxNeg = Math.max(maxNeg, s); } }
        if (!nPos || !nNeg) return { wx, wy, b: 0, trivial: true };
        if (maxNeg < minPos) return { wx, wy, b: (maxNeg + minPos) / 2 };
        if (maxPos < minNeg) return { wx, wy, b: (maxPos + minNeg) / 2 };
      }
      return null;
    }
    function shatterSummary(P) { let ok = 0, n = P.length; for (let m = 0; m < (1 << n); m++) { const L = []; for (let i = 0; i < n; i++) L.push((m >> i) & 1 ? 1 : -1); if (separating(P, L)) ok++; } return { ok, total: 1 << n }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = u => cx + u * R, Y = v => cy - v * R;
      const sep = separating(pts, labels);
      if (sep && !sep.trivial) {        // draw the separating line
        const { wx, wy, b } = sep, ox = b * wx, oy = b * wy, dx = -wy, dy = wx, Lr = 2.2;
        ctx.strokeStyle = p.sage; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.beginPath();
        ctx.moveTo(X(ox - Lr * dx), Y(oy - Lr * dy)); ctx.lineTo(X(ox + Lr * dx), Y(oy + Lr * dy)); ctx.stroke();
      }
      pts.forEach((pt, i) => { const x = X(pt[0]), y = Y(pt[1]);
        ctx.fillStyle = labels[i] > 0 ? p.gold : p.violet; ctx.strokeStyle = p.bg; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = p.bg; ctx.font = 'bold 13px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(labels[i] > 0 ? '+' : '−', x, y); });
      const sum = shatterSummary(pts), shattered = sum.ok === sum.total;
      info.innerHTML = 'This labeling: <b style="color:' + (sep ? p.sage : p.rust) + '">' + (sep ? 'separable by a line ✓' : 'no line can separate it ✗') + '</b>. ' +
        'Across all <b>' + sum.total + '</b> labelings of these <b>' + pts.length + '</b> points, <b>' + sum.ok + '</b> are separable — ' +
        (shattered ? '<b style="color:' + p.sage + '">all of them, so a line SHATTERS ' + pts.length + ' points</b> (VC ≥ ' + pts.length + ').' : '<b style="color:' + p.rust + '">not all, so ' + pts.length + ' points are NOT shattered</b> → a 2-D line has VC dimension 3.');
    }
    function rebuild() {
      ctl.innerHTML = '';
      button(ctl, pts.length === 3 ? 'Use 4 points' : 'Use 3 points', () => { pts = pts.length === 3 ? SQ.slice() : TRI.slice(); labels = pts.map(() => 1); rebuild(); });
      pts.forEach((_, i) => button(ctl, 'Flip ' + 'ABCD'[i], () => { labels[i] = -labels[i]; draw(); }));
      draw();
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'VC dimension shattering demo: 3 or 4 points on a plane, each labeled plus or minus, with a straight-line classifier trying to separate the two colours. Flipping labels shows that all 8 labelings of 3 points are linearly separable (a line shatters 3 points), but for 4 points two labelings (the XOR/diagonal cases) cannot be separated, so a 2-D linear classifier has VC dimension 3.');
    rebuild();
  });


  /* ========================================================
     140. 2x2 game / Nash equilibrium explorer (Game Theory)
     ======================================================== */
  register({ id: 'gt-nash-2x2', topic: 'game-theory', title: '2×2 games: best responses & Nash equilibria', blurb: 'Every 2-player, 2-strategy game fits in a 2×2 grid; each cell shows (row payoff, column payoff). A payoff is highlighted when it is a best response — the row player’s best reply to that column (sage), or the column player’s best reply to that row (violet). A cell where BOTH are best responses is a Nash equilibrium (gold). Cycle the classic games: the Prisoner’s Dilemma has one Nash equilibrium, Stag Hunt and Chicken have two, and Matching Pennies has none in pure strategies — proof that some games need randomization.' },
  function (root) {
    const W = 460, H = 320, cell = 116, gx = (W - 2 * cell) / 2 + 24, gy = 70;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const GAMES = [
      { name: "Prisoner’s Dilemma", rl: ["Silent", "Confess"], cl: ["Silent", "Confess"], R: [[-1, -10], [0, -5]], C: [[-1, 0], [-10, -5]], note: "One Nash equilibrium (Confess, Confess) — worse for both than mutual silence." },
      { name: "Stag Hunt", rl: ["Stag", "Hare"], cl: ["Stag", "Hare"], R: [[4, 0], [3, 3]], C: [[4, 3], [0, 3]], note: "Two Nash equilibria — coordinating on Stag is better, but Hare is the safe one." },
      { name: "Chicken", rl: ["Swerve", "Straight"], cl: ["Swerve", "Straight"], R: [[0, -1], [1, -10]], C: [[0, 1], [-1, -10]], note: "Two Nash equilibria, both off-diagonal: one swerves, the other goes straight." },
      { name: "Matching Pennies", rl: ["Heads", "Tails"], cl: ["Heads", "Tails"], R: [[1, -1], [-1, 1]], C: [[-1, 1], [1, -1]], note: "Zero-sum, NO pure Nash equilibrium — the only equilibrium is mixing 50/50." }
    ];
    let gi = 0;
    function draw() {
      const p = P(), G = GAMES[gi]; ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textBaseline = 'middle';
      // column headers
      ctx.fillStyle = p.mute; ctx.textAlign = 'center';
      ctx.fillText('Column player', gx + cell, gy - 30);
      for (let cc = 0; cc < 2; cc++) ctx.fillText(G.cl[cc], gx + cc * cell + cell / 2, gy - 12);
      // row header (rotated label)
      ctx.save(); ctx.translate(gx - 34, gy + cell); ctx.rotate(-Math.PI / 2); ctx.fillText('Row player', 0, 0); ctx.restore();
      for (let r = 0; r < 2; r++) { ctx.textAlign = 'right'; ctx.fillText(G.rl[r], gx - 8, gy + r * cell + cell / 2); }
      for (let r = 0; r < 2; r++) for (let cc = 0; cc < 2; cc++) {
        const x = gx + cc * cell, y = gy + r * cell;
        const rowBest = G.R[r][cc] >= G.R[1 - r][cc], colBest = G.C[r][cc] >= G.C[r][1 - cc], nash = rowBest && colBest;
        ctx.fillStyle = nash ? 'rgba(224,164,88,0.16)' : p.panel; ctx.fillRect(x, y, cell - 4, cell - 4);
        ctx.strokeStyle = nash ? p.gold : p.line; ctx.lineWidth = nash ? 2.5 : 1; ctx.strokeRect(x, y, cell - 4, cell - 4);
        ctx.textAlign = 'center'; ctx.font = 'bold 15px ' + (cssVar('--font-mono') || 'monospace');
        ctx.fillStyle = rowBest ? p.sage : p.soft; ctx.fillText(G.R[r][cc], x + (cell - 4) / 2 - 16, y + (cell - 4) / 2);
        ctx.fillStyle = p.mute; ctx.fillText(',', x + (cell - 4) / 2, y + (cell - 4) / 2);
        ctx.fillStyle = colBest ? p.violet : p.soft; ctx.fillText(G.C[r][cc], x + (cell - 4) / 2 + 16, y + (cell - 4) / 2);
        if (nash) { ctx.fillStyle = p.gold; ctx.font = '9px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('NASH', x + (cell - 4) / 2, y + cell - 18); }
      }
      let count = 0; for (let r = 0; r < 2; r++) for (let cc = 0; cc < 2; cc++) if (G.R[r][cc] >= G.R[1 - r][cc] && G.C[r][cc] >= G.C[r][1 - cc]) count++;
      info.innerHTML = '<b>' + G.name + '</b> · <span style="color:' + p.sage + '">sage</span> = row’s best reply, <span style="color:' + p.violet + '">violet</span> = column’s best reply, <span style="color:' + p.gold + '">gold</span> = Nash (both). ' +
        '<b>' + (count || 'No') + '</b> pure Nash equilibri' + (count === 1 ? 'um' : 'a') + '. ' + G.note;
    }
    button(ctl, 'Next game →', () => { gi = (gi + 1) % GAMES.length; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A 2x2 game payoff grid showing best responses and Nash equilibria. Each cell shows the row and column players’ payoffs; a payoff is highlighted when it is that player’s best response, and a cell where both are best responses is a Nash equilibrium outlined in gold. A button cycles classic games: Prisoner’s Dilemma (one equilibrium), Stag Hunt and Chicken (two each), and Matching Pennies (no pure equilibrium).');
    draw();
  });


  /* ========================================================
     141. Minimax / mixed-strategy lines: the indifference crossing (Game Theory)
     ======================================================== */
  register({ id: 'gt-minimax-lines', topic: 'game-theory', title: 'Mixed strategies: the minimax crossing', blurb: 'In a 2×2 zero-sum game the row player mixes row 0 with probability p. The two lines show the row player’s expected payoff if the column player picks column 0 or column 1. The column player (the minimizer) always takes the LOWER line, so the row player’s guaranteed payoff is the lower envelope (gold). Slide p: the row player maximizes that envelope, and its peak sits exactly where the two lines cross — the indifference point. That crossing is the minimax solution; its height is the value of the game.' },
  function (root) {
    const W = 480, H = 320, padL = 40, padR = 16, padT = 18, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const A = [[3, -1], [0, 2]];   // row player's payoffs (zero-sum)
    let p = 0.15;
    const V0 = q => q * A[0][0] + (1 - q) * A[1][0];   // column plays col 0
    const V1 = q => q * A[0][1] + (1 - q) * A[1][1];   // column plays col 1
    const pStar = (A[1][1] - A[1][0]) / ((A[0][0] - A[1][0]) - (A[0][1] - A[1][1]));
    const value = V0(pStar);
    function draw() {
      const P0 = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = P0.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const lo = -1.5, hi = 3.2;
      const X = q => padL + q * plotW, Y = v => padT + (1 - (v - lo) / (hi - lo)) * plotH;
      // axes
      ctx.strokeStyle = P0.line; ctx.lineWidth = 1; ctx.strokeRect(padL, padT, plotW, plotH);
      ctx.fillStyle = P0.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('p  (prob. row player plays row 0) →', padL + plotW / 2, H - 10);
      ctx.save(); ctx.translate(12, padT + plotH / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('row payoff', 0, 0); ctx.restore();
      if (lo < 0 && hi > 0) { ctx.strokeStyle = P0.line; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke(); ctx.setLineDash([]); }
      // lower envelope (gold, thick) = what the minimizing column player concedes
      ctx.strokeStyle = P0.gold; ctx.lineWidth = 3.2; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const q = i / 100, x = X(q), y = Y(Math.min(V0(q), V1(q))); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      // the two payoff lines
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = P0.sage; ctx.beginPath(); ctx.moveTo(X(0), Y(V0(0))); ctx.lineTo(X(1), Y(V0(1))); ctx.stroke();
      ctx.strokeStyle = P0.violet; ctx.beginPath(); ctx.moveTo(X(0), Y(V1(0))); ctx.lineTo(X(1), Y(V1(1))); ctx.stroke();
      // labels for the lines
      ctx.textAlign = 'left'; ctx.fillStyle = P0.sage; ctx.fillText('column plays 0', X(1) - 86, Y(V0(1)) - 8);
      ctx.fillStyle = P0.violet; ctx.fillText('column plays 1', X(0) + 4, Y(V1(0)) - 8);
      // equilibrium crossing
      ctx.fillStyle = P0.ink; ctx.strokeStyle = P0.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(pStar), Y(value), 5, 0, 7); ctx.fill(); ctx.stroke();
      // current p marker
      ctx.strokeStyle = P0.rust; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(p), padT); ctx.lineTo(X(p), H - padB); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = P0.rust; ctx.beginPath(); ctx.arc(X(p), Y(Math.min(V0(p), V1(p))), 3.5, 0, 7); ctx.fill();
      info.innerHTML = 'p = <b style="color:' + P0.rust + '">' + p.toFixed(2) + '</b> → row is guaranteed only <b style="color:' + P0.rust + '">' + Math.min(V0(p), V1(p)).toFixed(2) + '</b> (the column player takes the lower line). ' +
        'The lower envelope peaks at <b style="color:' + P0.gold + '">p* = ' + pStar.toFixed(2) + '</b>, where the lines cross — the minimax mix, with game value <b style="color:' + P0.gold + '">' + value.toFixed(2) + '</b>.';
    }
    slider(ctl, { label: 'p (row player mixes row 0)', min: 0, max: 1, step: 0.01, value: p, fmt: v => v.toFixed(2), onInput: v => { p = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Mixed-strategy minimax plot for a 2x2 zero-sum game. Two straight lines show the row player’s expected payoff when the column player picks column 0 (sage) or column 1 (violet), as a function of the row player’s mixing probability p. The minimizing column player always takes the lower line, so the row player’s guaranteed payoff is the lower envelope (gold), whose peak is exactly where the two lines cross — the minimax mixing probability and the value of the game. A draggable p marker shows the currently guaranteed payoff.');
    draw();
  });


  /* ========================================================
     142. Iterated Prisoner's Dilemma match visualizer (Game Theory)
     ======================================================== */
  register({ id: 'gt-ipd-match', topic: 'game-theory', title: 'Iterated Prisoner’s Dilemma: strategies face off', blurb: 'Pick two strategies and watch eight rounds of the iterated Prisoner’s Dilemma play out move by move (green = cooperate, red = defect), with running scores. Two Tit-for-Tats (or any two "nice" strategies) cooperate the whole way and both score 24; Always-Cooperate gets ruthlessly exploited by Always-Defect (0 vs 40); but Tit-for-Tat and Grim Trigger take just one hit from a defector and then defend themselves. Reciprocity beats both blind trust and blind betrayal.' },
  function (root) {
    const W = 480, H = 300, N = 8;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const STR = ["TFT", "AllD", "AllC", "Grim"];
    const NAME = { TFT: "Tit-for-Tat", AllD: "Always Defect", AllC: "Always Cooperate", Grim: "Grim Trigger" };
    let ai = 0, bi = 1;
    function move(s, oppLast, oppEverD) { return s === "AllC" ? "C" : s === "AllD" ? "D" : s === "TFT" ? oppLast : (oppEverD ? "D" : "C"); }
    function sim(A, B) { let sa = 0, sb = 0, la = "C", lb = "C", aD = false, bD = false; const mv = []; const pay = { CC: [3, 3], DD: [1, 1], CD: [0, 5], DC: [5, 0] };
      for (let i = 0; i < N; i++) { const ma = move(A, lb, bD), mb = move(B, la, aD); const p = pay[ma + mb]; sa += p[0]; sb += p[1]; if (ma === "D") aD = true; if (mb === "D") bD = true; la = ma; lb = mb; mv.push([ma, mb]); } return { sa, sb, mv }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const A = STR[ai], B = STR[bi], r = sim(A, B);
      const cw = 40, x0 = 120, y0 = 90, gap = 6;
      ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); ctx.textBaseline = 'middle';
      ['round'].forEach(() => {}); ctx.fillStyle = p.mute; ctx.textAlign = 'center';
      for (let i = 0; i < N; i++) ctx.fillText(String(i + 1), x0 + i * (cw + gap) + cw / 2, y0 - 18);
      ctx.fillText('round', x0 + N * (cw + gap) / 2, y0 - 36);
      [[A, r.sa, 0], [B, r.sb, 1]].forEach(row => {
        const [nm, score, ri] = row, y = y0 + ri * (cw + 16);
        ctx.fillStyle = p.soft; ctx.textAlign = 'right'; ctx.fillText(NAME[nm], x0 - 12, y + cw / 2);
        for (let i = 0; i < N; i++) { const mvv = r.mv[i][ri], x = x0 + i * (cw + gap);
          ctx.fillStyle = mvv === 'C' ? 'rgba(136,163,122,0.85)' : 'rgba(210,113,90,0.9)';
          ctx.fillRect(x, y, cw, cw); ctx.fillStyle = p.bg; ctx.font = 'bold 13px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText(mvv, x + cw / 2, y + cw / 2); ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace'); }
        ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.font = 'bold 15px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText(String(score), x0 + N * (cw + gap) + 8, y + cw / 2); ctx.font = '12px ' + (cssVar('--font-mono') || 'monospace');
      });
      const verdict = r.sa === r.sb ? (r.sa >= 20 ? 'Both stayed cooperative — top joint score.' : 'A stalemate of mutual defection.') :
        (Math.abs(r.sa - r.sb) >= 30 ? 'Blind cooperation is ruthlessly exploited.' : 'The reciprocator takes one hit, then refuses to be a sucker.');
      info.innerHTML = '<span style="color:rgba(136,163,122,1)">green = cooperate</span>, <span style="color:rgba(210,113,90,1)">red = defect</span>. ' +
        NAME[A] + ' scored <b style="color:' + p.gold + '">' + r.sa + '</b>, ' + NAME[B] + ' scored <b style="color:' + p.gold + '">' + r.sb + '</b> over ' + N + ' rounds. ' + verdict;
    }
    function rebuild() { ctl.innerHTML = '';
      button(ctl, 'Player A: ' + NAME[STR[ai]], () => { ai = (ai + 1) % STR.length; rebuild(); });
      button(ctl, 'Player B: ' + NAME[STR[bi]], () => { bi = (bi + 1) % STR.length; rebuild(); });
      draw();
    }
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Iterated Prisoner’s Dilemma match: two chosen strategies (Tit-for-Tat, Always Defect, Always Cooperate, or Grim Trigger) play eight rounds, shown as a grid of cooperate (green) and defect (red) moves with each side’s total score. Two nice strategies cooperate throughout and both score 24; Always Cooperate is exploited 0 to 40 by Always Defect; Tit-for-Tat and Grim Trigger take one loss against a defector then defect to limit the damage.');
    rebuild();
  });


  /* ========================================================
     143. Normalizing flow: an invertible warp reshapes a density (deep learning)
     ======================================================== */
  register({ id: 'dl-normalizing-flow', topic: 'deep-learning', title: 'Normalizing flow: warping a simple density', blurb: 'A normalizing flow turns a simple base distribution into a complex one by pushing samples through an invertible map. Here the base is a single Gaussian bump (faint); slide the warp strength and an invertible "shift-apart" map pulls its two halves away from the center, sculpting one bump into two — a bimodal target. Because the map is invertible, you can run it backwards to score any point’s exact likelihood. Real flows stack many such learnable warps; this is one, made visible.' },
  function (root) {
    const W = 520, H = 300, padL = 16, padR = 16, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let a = 1.2;
    const LO = -5, HI = 5, BINS = 44, N = 4000;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    const r = prng(7), Z = [];
    for (let i = 0; i < N; i++) { const u1 = Math.max(r(), 1e-9), u2 = r(); Z.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)); }
    function hist(xs) { const h = new Array(BINS).fill(0); for (const x of xs) { const b = Math.floor((x - LO) / (HI - LO) * BINS); if (b >= 0 && b < BINS) h[b]++; } return h; }
    const base = hist(Z);
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = hist(Z.map(z => z + a * Math.sign(z)));
      const plotW = W - padL - padR, plotH = H - padT - padB, bw = plotW / BINS;
      const maxH = Math.max.apply(null, base);
      const Y = v => padT + plotH - (v / maxH) * plotH;
      // base (faint)
      ctx.fillStyle = 'rgba(150,136,113,0.28)';
      for (let i = 0; i < BINS; i++) ctx.fillRect(padL + i * bw, Y(base[i]), bw - 1, padT + plotH - Y(base[i]));
      // warped (gold)
      ctx.fillStyle = 'rgba(224,164,88,0.85)';
      for (let i = 0; i < BINS; i++) ctx.fillRect(padL + i * bw, Y(X[i]), bw - 1, padT + plotH - Y(X[i]));
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, padT + plotH); ctx.lineTo(W - padR, padT + plotH); ctx.stroke();
      const modal = a < 0.35 ? 'still one bump (the base Gaussian)' : 'split into two modes — a bimodal density';
      info.innerHTML = 'warp strength a = <b style="color:' + p.gold + '">' + a.toFixed(2) + '</b> · map x = z + a·sign(z). ' +
        '<span style="color:rgba(150,136,113,1)">faint</span> = base Gaussian, <span style="color:' + p.gold + '">gold</span> = warped: ' + modal + '. ' +
        'The map is invertible, so its exact density follows from the change-of-variables formula.';
    }
    slider(ctl, { label: 'warp strength a', min: 0, max: 2.5, step: 0.05, value: a, fmt: v => v.toFixed(2), onInput: v => { a = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Normalizing-flow density warp: a histogram of samples from a base Gaussian (faint) and the same samples after an invertible shift-apart map x = z + a*sign(z) (gold). At warp strength 0 the warped histogram is the single Gaussian bump; as the slider increases, the map pulls the two halves away from the center, sculpting the unimodal base into a bimodal density, illustrating how an invertible flow reshapes a simple distribution into a complex one.');
    draw();
  });


  /* ========================================================
     144. Dark knowledge: hard label vs teacher's soft target (deep learning)
     ======================================================== */
  register({ id: 'dl-dark-knowledge', topic: 'deep-learning', title: 'Dark knowledge: hard labels vs soft targets', blurb: 'A hard one-hot label says only "this is a 7." A trained teacher’s softmax says "mostly 7, a little 1, a little 9 (similar digit shapes), basically never a cat" — the relative probabilities of the WRONG classes encode a similarity structure the one-hot label throws away. That extra signal is the dark knowledge distillation transfers. Slide the temperature: low T collapses toward the hard label, high T flattens the distribution and exposes the faint dark-knowledge bars that a student learns from.' },
  function (root) {
    const W = 500, H = 300, padT = 18, padB = 56, padL = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const labels = ["7", "1", "9", "4", "cat"];
    const logits = [5, 2, 1.5, 0.5, -3];
    const top = 0;
    let T = 1;
    function softmax(arr) { const z = arr.map(x => Math.exp(x / T)); const s = z.reduce((a, b) => a + b, 0); return z.map(v => v / s); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const soft = softmax(logits);
      const groups = [["Hard label (one-hot)", labels.map((_, i) => i === top ? 1 : 0), p.mute], ["Teacher (soft target)", soft, p.gold]];
      const gw = (W - padL - 16) / 2, plotH = H - padT - padB, baseY = padT + plotH;
      ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace');
      groups.forEach((G, gi) => {
        const [title, probs, col] = G, gx = padL + gi * (gw + 16);
        ctx.fillStyle = p.soft; ctx.textAlign = 'center'; ctx.fillText(title, gx + gw / 2, padT - 4);
        const bw = gw / labels.length;
        probs.forEach((pr, i) => {
          const x = gx + i * bw, h = pr * plotH;
          // dark-knowledge bars (soft, non-top, non-trivial) get a distinct tint
          const isDK = gi === 1 && i !== top && pr > 0.01;
          ctx.fillStyle = i === top ? col : (isDK ? p.rust : (gi === 1 ? 'rgba(210,113,90,0.4)' : p.line));
          ctx.fillRect(x + 3, baseY - h, bw - 6, h);
          ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(labels[i], x + bw / 2, baseY + 14);
          if (pr > 0.02) { ctx.fillStyle = p.soft; ctx.fillText(pr.toFixed(2), x + bw / 2, baseY - h - 4); }
        });
        ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(gx, baseY); ctx.lineTo(gx + gw, baseY); ctx.stroke();
      });
      info.innerHTML = 'temperature T = <b style="color:' + p.gold + '">' + T.toFixed(2) + '</b>. The hard label keeps only "7"; the teacher (soft) also puts weight on <span style="color:' + p.rust + '">1 and 9</span> — similar digit shapes — but never "cat". ' +
        'That <b>dark knowledge</b> is what the student learns. ' + (T < 0.7 ? 'Low T → almost a hard label (dark knowledge hidden).' : T > 2 ? 'High T → flattened, dark knowledge vivid.' : 'Raise T to expose more of it.');
    }
    slider(ctl, { label: 'temperature T', min: 0.4, max: 4, step: 0.05, value: T, fmt: v => v.toFixed(2), onInput: v => { T = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Dark knowledge demo: two bar charts of a five-class output for a handwritten 7. The hard one-hot label puts all weight on class 7; the teacher’s soft target (softmax with a temperature slider) puts most weight on 7 but also small amounts on the similar digits 1 and 9 and almost none on cat. Raising the temperature flattens the distribution and makes those dark-knowledge probabilities more visible, illustrating the similarity structure that knowledge distillation transfers to a student.');
    draw();
  });


  /* ========================================================
     145. Autocorrelation function (ACF): the time-series fingerprint (time series)
     ======================================================== */
  register({ id: 'ts-acf', topic: 'time-series', title: 'Autocorrelation function (ACF)', blurb: 'The ACF plots how strongly a series correlates with its own past at each lag — the first thing you compute to diagnose temporal structure. Slide the AR(1) coefficient φ: at φ=0 the series is white noise and every bar sits inside the (dashed) significance band; raise φ and the bars decay geometrically like φ^k; push φ near 1 and the ACF barely decays at all — the signature of a near-random-walk that is NOT stationary and needs differencing.' },
  function (root) {
    const W = 520, H = 300, padL = 34, padR = 12, padT = 16, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let phi = 0.7;
    const N = 200, K = 18;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function series() {
      const r = prng(42), g = () => { const u1 = Math.max(r(), 1e-9), u2 = r(); return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); };
      const x = [0]; for (let t = 1; t < N; t++) x.push(phi * x[t - 1] + g()); return x;
    }
    function acf(x) {
      const n = x.length, mean = x.reduce((a, b) => a + b, 0) / n;
      let d0 = 0; for (let t = 0; t < n; t++) d0 += (x[t] - mean) ** 2;
      const out = []; for (let k = 0; k <= K; k++) { let s = 0; for (let t = k; t < n; t++) s += (x[t] - mean) * (x[t - k] - mean); out.push(s / d0); } return out;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const a = acf(series());
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL;
      const yTop = padT, yBot = padT + plotH, lo = -0.4, hi = 1.0;
      const Y = v => yBot - (v - lo) / (hi - lo) * plotH;
      // axes + zero line
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(x0, yTop); ctx.lineTo(x0, yBot); ctx.stroke();
      ctx.strokeStyle = p.soft; ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      // significance band ±1.96/sqrt(N)
      const sig = 1.96 / Math.sqrt(N);
      ctx.fillStyle = 'rgba(150,136,113,0.13)'; ctx.fillRect(x0, Y(sig), plotW, Y(-sig) - Y(sig));
      ctx.strokeStyle = 'rgba(150,136,113,0.5)'; ctx.setLineDash([4, 3]);
      [sig, -sig].forEach(s => { ctx.beginPath(); ctx.moveTo(x0, Y(s)); ctx.lineTo(W - padR, Y(s)); ctx.stroke(); });
      ctx.setLineDash([]);
      // y ticks
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [1, 0.5, 0, -0.4].forEach(v => ctx.fillText(v.toFixed(1), x0 - 4, Y(v) + 3));
      // bars
      const bw = plotW / (K + 1);
      for (let k = 0; k <= K; k++) {
        const bx = x0 + k * bw + bw * 0.2, h = Y(a[k]) - Y(0);
        ctx.fillStyle = k === 0 ? p.soft : (Math.abs(a[k]) > sig ? p.gold : p.mute);
        ctx.fillRect(bx, a[k] >= 0 ? Y(a[k]) : Y(0), bw * 0.6, Math.abs(h));
      }
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; [0, 6, 12, 18].forEach(k => ctx.fillText(k, x0 + k * bw + bw * 0.5, yBot + 14));
      ctx.textAlign = 'left'; ctx.fillText('lag k', W - padR - 34, yBot + 14);
      const sigCount = a.slice(1).filter(v => Math.abs(v) > sig).length;
      const verdict = phi < 0.15 ? 'white noise — all bars inside the band (no structure to model).' :
        phi > 0.9 ? 'barely decaying — a near-random-walk: NOT stationary, difference it first.' :
        'geometric decay like φ^k — a stationary AR(1) signature.';
      info.innerHTML = 'AR(1) coefficient φ = <b style="color:' + p.gold + '">' + phi.toFixed(2) + '</b>. ' +
        sigCount + ' of ' + K + ' lags poke past the ±1.96/√N band. ' + verdict;
    }
    slider(ctl, { label: 'AR(1) coefficient φ', min: 0, max: 0.95, step: 0.05, value: phi, fmt: v => v.toFixed(2), onInput: v => { phi = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Autocorrelation function of an AR(1) time series. The chart is a bar plot of correlation versus lag with a shaded ±1.96 over square-root-N significance band. A slider sets the AR(1) coefficient phi: at phi near 0 the series is white noise and all bars fall inside the band; at moderate phi the bars decay geometrically like phi to the k, the signature of a stationary autoregressive process; at phi near 1 the bars barely decay, the signature of a near-random-walk that is not stationary and must be differenced.');
    draw();
  });


  /* ========================================================
     146. Replicator dynamics: a population converging to the ESS (game theory)
     ======================================================== */
  register({ id: 'gt-replicator', topic: 'game-theory', title: 'Replicator dynamics → the ESS', blurb: 'Evolutionary game theory replaces rational players with a population. In the Hawk–Dove game (resource value V=2, fight cost C=4), the share of hawks rises whenever hawks out-earn the population average and falls when they under-earn — the replicator equation. Faint curves start from many different hawk fractions; slide your own start (bold). No matter where you begin, the population converges to the same evolutionarily stable strategy at p* = V/C = 0.5: a stable MIX of hawks and doves, the mixed Nash equilibrium found by selection rather than reasoning.' },
  function (root) {
    const W = 520, H = 300, padL = 38, padR = 14, padT = 16, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const V = 2, C = 4, ESS = V / C, STEPS = 70, dt = 0.3;
    let p0 = 0.85;
    function traj(start) { let p = start; const out = [p]; for (let i = 0; i < STEPS; i++) { const fH = p * (V - C) / 2 + (1 - p) * V, fD = (1 - p) * V / 2; p += dt * p * (1 - p) * (fH - fD); out.push(p); } return out; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, y0 = padT;
      const X = t => x0 + t / STEPS * plotW, Y = v => y0 + (1 - v) * plotH;
      // axes
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + plotH); ctx.lineTo(x0 + plotW, y0 + plotH); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(v => ctx.fillText(v.toFixed(1), x0 - 4, Y(v) + 3));
      // ESS line
      ctx.strokeStyle = p.soft; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(x0, Y(ESS)); ctx.lineTo(x0 + plotW, Y(ESS)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.soft; ctx.textAlign = 'left'; ctx.fillText('ESS  p* = V/C = 0.5', x0 + 6, Y(ESS) - 4);
      // faint trajectories from many starts
      [0.05, 0.25, 0.55, 0.75, 0.95].forEach(s => {
        const tr = traj(s); ctx.strokeStyle = 'rgba(150,136,113,0.33)'; ctx.beginPath();
        tr.forEach((v, t) => t ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v))); ctx.stroke();
      });
      // bold slider trajectory
      const tb = traj(p0); ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath();
      tb.forEach((v, t) => t ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v))); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(X(0), Y(p0), 3.5, 0, 7); ctx.fill();
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('generations →', x0 + plotW / 2, y0 + plotH + 16);
      const end = tb[tb.length - 1];
      info.innerHTML = 'start = <b style="color:' + p.gold + '">' + (p0 * 100).toFixed(0) + '% hawks</b> → after ' + STEPS + ' generations the population sits at <b>' + (end * 100).toFixed(0) + '% hawks</b>, the ESS p* = V/C = 0.5. ' +
        'Every faint start lands there too: an all-dove world is invaded by hawks, an all-hawk world by doves, and selection settles on the stable mix.';
    }
    slider(ctl, { label: 'initial hawk fraction', min: 0.02, max: 0.98, step: 0.02, value: p0, fmt: v => (v * 100).toFixed(0) + '%', onInput: v => { p0 = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Replicator dynamics for the Hawk-Dove game. The chart plots the fraction of hawks in a population over generations, with a dashed line marking the evolutionarily stable strategy at p* = V/C = 0.5. Faint curves start from hawk fractions of 5, 25, 55, 75 and 95 percent and all converge to 0.5; a bold gold curve starts from a slider-controlled fraction and also converges to 0.5. The lesson: regardless of the starting mix, selection drives the population to the same stable mix of hawks and doves, the mixed Nash equilibrium reached without any reasoning.');
    draw();
  });


  /* ========================================================
     147. Forecast uncertainty cone: bounded vs unbounded (time series)
     ======================================================== */
  register({ id: 'ts-forecast-cone', topic: 'time-series', title: 'The forecast uncertainty cone', blurb: 'Every forecast comes with a widening cone of uncertainty. For an AR(1) process the point forecast decays toward the mean as φ^h, and the 95% interval grows with the horizon. Slide φ: a mean-reverting process (φ well below 1) has a cone that quickly plateaus — uncertainty is BOUNDED, you can forecast far ahead with stable error bars. Push φ toward 1 (a random walk) and the cone never stops widening — uncertainty grows like √h without limit, so long-range forecasts are essentially worthless. Persistence decides whether the future is foreseeable.' },
  function (root) {
    const W = 520, H = 300, padL = 30, padR = 12, padT = 14, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const H0 = 38, FH = 34, sigma = 1, YMAX = 12;
    let phi = 0.8;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function gauss(r) { const u1 = Math.max(r(), 1e-9), u2 = r(); return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); }
    function fcSD(h) { return phi >= 0.999 ? sigma * Math.sqrt(h) : sigma * Math.sqrt((1 - Math.pow(phi, 2 * h)) / (1 - phi * phi)); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // build history with the SAME phi so the seam is continuous
      const r = prng(7), hist = [0]; for (let t = 1; t < H0; t++) hist.push(phi * hist[t - 1] + gauss(r));
      const last = hist[H0 - 1];
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, total = H0 + FH;
      const X = t => x0 + t / (total - 1) * plotW, Y = v => padT + (1 - (v + YMAX) / (2 * YMAX)) * plotH;
      // zero line
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x0 + plotW, Y(0)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [YMAX, 0, -YMAX].forEach(v => ctx.fillText(v, x0 - 3, Y(v) + 3));
      // forecast cone (shaded), point forecast f(h)=last*phi^h
      ctx.fillStyle = 'rgba(224,164,88,0.18)'; ctx.beginPath();
      for (let h = 0; h <= FH; h++) { const f = last * Math.pow(phi, h), hi = f + 1.96 * fcSD(h); ctx.lineTo(X(H0 - 1 + h), Y(hi)); }
      for (let h = FH; h >= 0; h--) { const f = last * Math.pow(phi, h), lo = f - 1.96 * fcSD(h); ctx.lineTo(X(H0 - 1 + h), Y(lo)); }
      ctx.closePath(); ctx.fill();
      // point forecast (dashed)
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath();
      for (let h = 0; h <= FH; h++) { const f = last * Math.pow(phi, h); h ? ctx.lineTo(X(H0 - 1 + h), Y(f)) : ctx.moveTo(X(H0 - 1 + h), Y(f)); } ctx.stroke(); ctx.setLineDash([]);
      // history (solid)
      ctx.strokeStyle = p.soft; ctx.lineWidth = 1.5; ctx.beginPath();
      hist.forEach((v, t) => t ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v))); ctx.stroke(); ctx.lineWidth = 1;
      // "now" divider
      ctx.strokeStyle = 'rgba(150,136,113,0.4)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(X(H0 - 1), padT); ctx.lineTo(X(H0 - 1), padT + plotH); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('now', X(H0 - 1), padT + plotH + 14);
      const endSD = fcSD(FH), plateau = phi >= 0.999 ? Infinity : sigma / Math.sqrt(1 - phi * phi);
      info.innerHTML = 'φ = <b style="color:' + p.gold + '">' + phi.toFixed(2) + '</b>. ' +
        (phi >= 0.999 ? 'Random walk: the cone widens as √h and <b>never</b> stops — long-range forecasts are worthless.' :
         phi > 0.9 ? 'Highly persistent: the cone widens slowly toward a wide but <b>bounded</b> plateau (±' + (1.96 * plateau).toFixed(1) + ').' :
         'Mean-reverting: the cone plateaus fast at ±' + (1.96 * plateau).toFixed(1) + ' — uncertainty is <b>bounded</b>, the future stays foreseeable.');
    }
    slider(ctl, { label: 'persistence φ', min: 0.5, max: 1, step: 0.02, value: phi, fmt: v => v.toFixed(2), onInput: v => { phi = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Forecast uncertainty cone for an AR(1) process. The chart shows a history line up to "now", then a dashed point forecast decaying toward the mean and a shaded 95-percent prediction band fanning out to the right. A slider sets the persistence phi. For phi well below 1 the band plateaus quickly at a bounded width; as phi approaches 1 the band widens slowly toward a large bounded plateau; at phi equal to 1 (a random walk) the band widens without limit as the square root of the horizon, meaning long-range forecasts carry unbounded uncertainty.');
    draw();
  });


  /* ========================================================
     148. Batch normalization: a layer's inputs, standardized (deep learning)
     ======================================================== */
  register({ id: 'dl-batchnorm', topic: 'deep-learning', title: 'Batch normalization standardizes a layer’s inputs', blurb: 'As training proceeds, the distribution of values feeding each layer drifts and rescales — "internal covariate shift" — forcing every layer to chase a moving target. Batch norm fixes this: for each mini-batch it subtracts the mean and divides by the standard deviation, so the layer always sees a clean, zero-mean unit-variance input. Slide the incoming mean and spread: the faint raw histogram lurches around, but the gold batch-normed histogram stays locked at N(0,1). (A learnable scale γ and shift β, not shown, then let the network re-stretch it if it wants.)' },
  function (root) {
    const W = 520, H = 300, padL = 16, padR = 16, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let mu = 4, sig = 2.5;
    const LO = -10, HI = 10, BINS = 48, N = 1200;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    const r0 = prng(11), Z = [];
    for (let i = 0; i < N; i++) { const u1 = Math.max(r0(), 1e-9), u2 = r0(); Z.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)); }
    function hist(xs) { const h = new Array(BINS).fill(0); for (const x of xs) { const b = Math.floor((x - LO) / (HI - LO) * BINS); if (b >= 0 && b < BINS) h[b]++; } return h; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const raw = Z.map(z => mu + sig * z);                       // incoming activations N(mu, sig)
      const m = raw.reduce((a, b) => a + b, 0) / N, v = raw.reduce((a, b) => a + (b - m) * (b - m), 0) / N;
      const bn = raw.map(x => (x - m) / Math.sqrt(v + 1e-5));     // batch norm -> ~N(0,1)
      const hRaw = hist(raw), hBN = hist(bn);
      const plotW = W - padL - padR, plotH = H - padT - padB, bw = plotW / BINS;
      const maxH = Math.max(Math.max.apply(null, hBN), Math.max.apply(null, hRaw), 1);
      const Y = q => padT + plotH - (q / maxH) * plotH;
      ctx.fillStyle = 'rgba(150,136,113,0.30)';
      for (let i = 0; i < BINS; i++) ctx.fillRect(padL + i * bw, Y(hRaw[i]), bw - 1, padT + plotH - Y(hRaw[i]));
      ctx.fillStyle = 'rgba(224,164,88,0.85)';
      for (let i = 0; i < BINS; i++) ctx.fillRect(padL + i * bw, Y(hBN[i]), bw - 1, padT + plotH - Y(hBN[i]));
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, padT + plotH); ctx.lineTo(W - padR, padT + plotH); ctx.stroke();
      // zero tick
      const zx = padL + (0 - LO) / (HI - LO) * plotW; ctx.strokeStyle = p.soft; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(zx, padT); ctx.lineTo(zx, padT + plotH); ctx.stroke(); ctx.setLineDash([]);
      const bnM = bn.reduce((a, b) => a + b, 0) / N, bnV = bn.reduce((a, b) => a + (b - bnM) * (b - bnM), 0) / N;
      info.innerHTML = 'incoming <span style="color:rgba(150,136,113,1)">raw</span> ~ mean <b>' + mu.toFixed(1) + '</b>, std <b>' + sig.toFixed(1) + '</b>. ' +
        'After <span style="color:' + p.gold + '">batch norm</span>: mean <b>' + bnM.toFixed(2) + '</b>, std <b>' + Math.sqrt(bnV).toFixed(2) + '</b> — locked at N(0,1) no matter how the raw input drifts.';
    }
    slider(ctl, { label: 'incoming mean', min: -6, max: 6, step: 0.2, value: mu, fmt: v => v.toFixed(1), onInput: v => { mu = v; draw(); } });
    slider(ctl, { label: 'incoming spread (std)', min: 0.5, max: 4, step: 0.1, value: sig, fmt: v => v.toFixed(1), onInput: v => { sig = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Batch normalization demo: a faint histogram of a layer’s raw incoming activations drawn from a normal distribution whose mean and spread are set by two sliders, overlaid with a gold histogram of the same values after batch normalization. However far the raw histogram drifts or however wide it spreads, the batch-normed histogram stays centered at zero with unit standard deviation, illustrating how batch norm hands each layer a stable standardized input and cancels internal covariate shift.');
    draw();
  });


  /* ========================================================
     149. Shapley value: fair shares shift with coalition strength (game theory)
     ======================================================== */
  register({ id: 'gt-shapley', topic: 'game-theory', title: 'Shapley value: dividing the spoils fairly', blurb: 'Three players form a coalition worth 120; alone each is worth nothing. The Shapley value pays each their average marginal contribution over all six orders of joining — the unique fair split. Slide the value of the A+B partnership: as A and B become more productive together, the fair shares flow toward them and away from C, yet the three shares always sum to the full 120 (efficiency). Fairness here is not equal split — it tracks who actually contributes.' },
  function (root) {
    const W = 500, H = 300, padL = 30, padR = 14, padT = 18, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let v01 = 60;
    const names = ["A", "B", "C"];
    function shapley(x) {
      const v = { "": 0, "0": 0, "1": 0, "2": 0, "01": x, "02": 80, "12": 70, "012": 120 };
      function perms(a) { if (a.length <= 1) return [a]; return a.flatMap((e, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [e].concat(p))); }
      const orders = perms([0, 1, 2]), phi = [0, 0, 0];
      for (const o of orders) { let S = []; for (const p of o) { const b = v[[...S].sort().join("")]; S.push(p); phi[p] += v[[...S].sort().join("")] - b; } }
      return phi.map(z => z / orders.length);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const s = shapley(v01);
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, baseY = padT + plotH;
      const maxV = 70, Y = q => baseY - (q / maxV) * plotH;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(x0, baseY); ctx.lineTo(W - padR, baseY); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 35, 70].forEach(q => ctx.fillText(q, x0 - 4, Y(q) + 3));
      const cols = [p.gold, p.sage, p.violet], bw = plotW / 3;
      s.forEach((val, i) => {
        const bx = x0 + i * bw + bw * 0.2, h = (val / maxV) * plotH;
        ctx.fillStyle = cols[i]; ctx.fillRect(bx, baseY - h, bw * 0.6, h);
        ctx.fillStyle = p.soft; ctx.textAlign = 'center';
        ctx.fillText(val.toFixed(1), bx + bw * 0.3, baseY - h - 5);
        ctx.fillStyle = p.mute; ctx.fillText("player " + names[i], bx + bw * 0.3, baseY + 16);
      });
      info.innerHTML = 'value of the <b style="color:' + p.gold + '">A</b>+<b style="color:' + p.sage + '">B</b> partnership v(AB) = <b>' + v01.toFixed(0) + '</b>. ' +
        'Shapley shares: <b style="color:' + p.gold + '">' + s[0].toFixed(1) + '</b> · <b style="color:' + p.sage + '">' + s[1].toFixed(1) + '</b> · <b style="color:' + p.violet + '">' + s[2].toFixed(1) + '</b> (sum ' + s.reduce((a, b) => a + b, 0).toFixed(0) + '). ' +
        'A stronger A+B coalition pulls fair value toward them and away from C — never an equal split, always contribution-weighted.';
    }
    slider(ctl, { label: 'v(AB) — value of the A+B partnership', min: 0, max: 120, step: 5, value: v01, fmt: x => x.toFixed(0), onInput: x => { v01 = x; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Shapley value bar chart for a three-player cooperative game worth 120, with singletons worth nothing and a slider for the value of the A-plus-B partnership. Three bars show each player’s Shapley value — their average marginal contribution over all six join orders. As the A+B partnership value rises, the bars for A and B grow while C’s shrinks, and the three always sum to 120, showing that the fair split tracks contribution rather than splitting equally.');
    draw();
  });


  /* ========================================================
     150. The bootstrap: resampling to estimate uncertainty (probability & statistics)
     ======================================================== */
  register({ id: 'ps-bootstrap', topic: 'probability-statistics', title: 'The bootstrap: a confidence interval from one sample', blurb: 'You have a single sample and want to know how much its mean might vary — but you can’t collect new samples. The bootstrap fakes them: resample your data WITH replacement, recompute the mean, repeat thousands of times. The spread of those bootstrap means approximates the true sampling distribution, and its middle 95% is a confidence interval — with no formula and no normality assumption. Slide the number of resamples B: with few it is jagged and the interval jitters; with thousands it settles into a smooth, stable estimate.' },
  function (root) {
    const W = 520, H = 300, padL = 16, padR = 16, padT = 16, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const sample = [2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 12, 15, 18, 22];
    const n = sample.length, mean = sample.reduce((a, b) => a + b, 0) / n;
    const LO = 4, HI = 14, BINS = 40;
    let B = 400;
    function prng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function bootMeans() { const r = prng(99), out = []; for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < n; i++) s += sample[Math.floor(r() * n)]; out.push(s / n); } return out; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const means = bootMeans(), sorted = [...means].sort((a, b) => a - b);
      const lo = sorted[Math.floor(0.025 * B)], hi = sorted[Math.floor(0.975 * B)];
      const h = new Array(BINS).fill(0);
      for (const m of means) { const bi = Math.floor((m - LO) / (HI - LO) * BINS); if (bi >= 0 && bi < BINS) h[bi]++; }
      const plotW = W - padL - padR, plotH = H - padT - padB, bw = plotW / BINS, maxH = Math.max.apply(null, h) || 1;
      const X = v => padL + (v - LO) / (HI - LO) * plotW, Y = q => padT + plotH - (q / maxH) * plotH;
      // 95% CI band
      ctx.fillStyle = 'rgba(224,164,88,0.12)'; ctx.fillRect(X(lo), padT, X(hi) - X(lo), plotH);
      // bars
      ctx.fillStyle = 'rgba(125,154,154,0.85)';
      for (let i = 0; i < BINS; i++) ctx.fillRect(padL + i * bw, Y(h[i]), bw - 1, padT + plotH - Y(h[i]));
      // sample mean + CI lines
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); [lo, hi].forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), padT); ctx.lineTo(X(v), padT + plotH); ctx.stroke(); }); ctx.setLineDash([]);
      ctx.strokeStyle = p.soft; ctx.beginPath(); ctx.moveTo(X(mean), padT); ctx.lineTo(X(mean), padT + plotH); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [4, 6, 8, 10, 12, 14].forEach(v => ctx.fillText(v, X(v), padT + plotH + 14));
      info.innerHTML = '<b>' + B + '</b> resamples of the same ' + n + ' data points (sample mean <b>' + mean.toFixed(2) + '</b>). ' +
        '95% bootstrap CI = <b style="color:' + p.gold + '">[' + lo.toFixed(2) + ', ' + hi.toFixed(2) + ']</b> — the middle 95% of the bootstrap means, no formula or normality needed. ' +
        (B < 100 ? 'Few resamples → the interval still jitters.' : 'Thousands of resamples → a smooth, stable estimate.');
    }
    slider(ctl, { label: 'number of resamples B', min: 20, max: 2000, step: 20, value: B, fmt: v => v.toFixed(0), onInput: v => { B = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Bootstrap demonstration: a histogram of the means of many resamples-with-replacement drawn from a single fixed 15-point sample, with the middle 95 percent shaded as a confidence interval and dashed lines at its bounds and the sample mean. A slider sets the number of resamples B; at small B the histogram is jagged and the interval jitters, while at thousands of resamples it settles into a smooth, stable bootstrap distribution, illustrating how resampling estimates a sampling distribution and a confidence interval without any parametric formula.');
    draw();
  });


  /* ========================================================
     151. Gaussian process regression: prediction with error bars (probability & statistics)
     ======================================================== */
  register({ id: 'ps-gaussian-process', topic: 'probability-statistics', title: 'Gaussian process regression: a model that knows what it doesn’t know', blurb: 'A Gaussian process fits a smooth curve through the data AND reports how sure it is. The shaded band is ±2 standard deviations of the posterior: it pinches to nothing at each observed point (there, the answer is known) and balloons out between and beyond them (there, many curves remain plausible). Slide the kernel lengthscale: short values give a wiggly curve that trusts only nearby points; long values give a smooth curve that interpolates broadly. This calibrated uncertainty — tight near data, wide in the unknown — is exactly what plain regression cannot give you.' },
  function (root) {
    const W = 520, H = 300, padL = 24, padR = 12, padT = 14, padB = 24;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const X = [-4, -2, 0, 1, 3], Y = [-1.5, 0.5, 1.2, 0.8, -0.6];
    const XLO = -6, XHI = 6, YLO = -3, YHI = 3;
    let L = 1.2;
    function kern(a, b) { return Math.exp(-((a - b) * (a - b)) / (2 * L * L)); }
    function solve(A, b) {
      const n = b.length, M = A.map((r, i) => r.concat([b[i]]));
      for (let col = 0; col < n; col++) {
        let p = col; for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[p][col])) p = r;
        const t = M[col]; M[col] = M[p]; M[p] = t;
        for (let r = 0; r < n; r++) { if (r === col) continue; const f = M[r][col] / M[col][col]; for (let cc = col; cc <= n; cc++) M[r][cc] -= f * M[col][cc]; }
      }
      return M.map((r, i) => r[n] / M[i][i]);
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const PX = x => padL + (x - XLO) / (XHI - XLO) * plotW, PY = y => padT + (YHI - y) / (YHI - YLO) * plotH;
      const n = X.length, K = X.map((xi, i) => X.map((xj, j) => kern(xi, xj) + (i === j ? 1e-6 : 0)));
      const alpha = solve(K.map(r => r.slice()), Y.slice());
      const G = 90, mean = [], hi = [], lo = [], xs = [];
      for (let g = 0; g <= G; g++) {
        const x = XLO + (XHI - XLO) * g / G, ks = X.map(xi => kern(x, xi));
        const m = ks.reduce((s, v, i) => s + v * alpha[i], 0);
        const v = solve(K.map(r => r.slice()), ks.slice());
        const variance = Math.max(0, 1 - ks.reduce((s, kv, i) => s + kv * v[i], 0)), sd = Math.sqrt(variance);
        xs.push(x); mean.push(m); hi.push(m + 2 * sd); lo.push(m - 2 * sd);
      }
      // axes
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, PY(0)); ctx.lineTo(W - padR, PY(0)); ctx.stroke();
      // uncertainty band
      ctx.fillStyle = 'rgba(139,123,184,0.20)'; ctx.beginPath();
      xs.forEach((x, i) => i ? ctx.lineTo(PX(x), PY(hi[i])) : ctx.moveTo(PX(x), PY(hi[i])));
      for (let i = xs.length - 1; i >= 0; i--) ctx.lineTo(PX(xs[i]), PY(lo[i]));
      ctx.closePath(); ctx.fill();
      // mean
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2; ctx.beginPath();
      xs.forEach((x, i) => i ? ctx.lineTo(PX(x), PY(mean[i])) : ctx.moveTo(PX(x), PY(mean[i]))); ctx.stroke(); ctx.lineWidth = 1;
      // data points
      ctx.fillStyle = p.gold; X.forEach((xi, i) => { ctx.beginPath(); ctx.arc(PX(xi), PY(Y[i]), 4, 0, 7); ctx.fill(); });
      const sdAtGap = (function () { const x = 5, ks = X.map(xi => kern(x, xi)); const v = solve(K.map(r => r.slice()), ks.slice()); return Math.sqrt(Math.max(0, 1 - ks.reduce((s, kv, i) => s + kv * v[i], 0))); })();
      info.innerHTML = 'kernel lengthscale ℓ = <b style="color:' + p.violet + '">' + L.toFixed(2) + '</b>. ' +
        'The <span style="color:' + p.violet + '">posterior mean</span> threads the <span style="color:' + p.gold + '">data</span>; the band is ±2σ — <b>~0 at each point</b>, widening to ±' + (2 * sdAtGap).toFixed(1) + ' out where x=5 (no data). ' +
        (L < 0.7 ? 'Short ℓ → wiggly, distrusts anything far.' : L > 2 ? 'Long ℓ → very smooth, confident interpolation.' : 'Moderate ℓ → a balanced fit.');
    }
    slider(ctl, { label: 'kernel lengthscale ℓ', min: 0.3, max: 3, step: 0.1, value: L, fmt: v => v.toFixed(2), onInput: v => { L = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Gaussian process regression. A violet posterior-mean curve passes through five gold data points, surrounded by a shaded plus-or-minus two-standard-deviation band. The band pinches to zero width at each observed point and widens between and beyond them, where the data does not constrain the function. A slider sets the kernel lengthscale: small values make the curve wiggly and locally cautious, large values make it smooth and broadly confident, illustrating how a Gaussian process reports calibrated uncertainty that is tight near data and wide in unexplored regions.');
    draw();
  });


  /* ========================================================
     152. Power iteration: a vector converging to the dominant eigenvector (linear algebra)
     ======================================================== */
  register({ id: 'la-power-iteration', topic: 'linear-algebra', title: 'Power iteration converging to the dominant eigenvector', blurb: 'Why does repeatedly multiplying by a matrix and renormalizing find its dominant eigenvector? Because every vector is a blend of eigenvectors, and each step scales each component by its eigenvalue — so the largest eigenvalue’s direction grows fastest and quickly dominates. Here A = [[2,1],[1,2]] has eigenvectors along 45° (eigenvalue 3) and −45° (eigenvalue 1). Slide the iteration count: the gold vector starts off-axis and swings, step by step, onto the 45° dominant eigendirection — no matter where it began. This is exactly the loop behind PageRank.' },
  function (root) {
    const W = 480, H = 320, cx = 240, cy = 160, R = 120;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const A = [[2, 1], [1, 2]];
    let K = 3;
    function mul(v) { return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; }
    function norm(v) { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const PX = x => cx + x * R, PY = y => cy - y * R;
      // unit circle + axes
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - R - 14, cy); ctx.lineTo(cx + R + 14, cy); ctx.moveTo(cx, cy - R - 14); ctx.lineTo(cx, cy + R + 14); ctx.stroke();
      // eigendirection lines: (1,1)/sqrt2 dominant, (1,-1)/sqrt2 subordinate
      const e1 = norm([1, 1]), e2 = norm([1, -1]);
      ctx.strokeStyle = p.sage; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(PX(-e1[0]), PY(-e1[1])); ctx.lineTo(PX(e1[0]), PY(e1[1])); ctx.stroke();
      ctx.strokeStyle = p.mute; ctx.beginPath(); ctx.moveTo(PX(-e2[0]), PY(-e2[1])); ctx.lineTo(PX(e2[0]), PY(e2[1])); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.sage; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.fillText('λ=3 (dominant)', PX(e1[0]) + 4, PY(e1[1]) - 4);
      ctx.fillStyle = p.mute; ctx.fillText('λ=1', PX(e2[0]) + 4, PY(e2[1]) + 12);
      // trail of v_0..v_K
      let v = norm([Math.cos(0.3), Math.sin(0.3)]);
      const trail = [v];
      for (let k = 0; k < K; k++) { v = norm(mul(v)); trail.push(v); }
      trail.forEach((t, i) => { if (i === trail.length - 1) return; ctx.fillStyle = 'rgba(150,136,113,0.45)'; ctx.beginPath(); ctx.arc(PX(t[0]), PY(t[1]), 3, 0, 7); ctx.fill(); });
      // current vector (gold arrow)
      const vc = trail[trail.length - 1];
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(PX(vc[0]), PY(vc[1])); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(PX(vc[0]), PY(vc[1]), 4, 0, 7); ctx.fill();
      const angle = Math.atan2(vc[1], vc[0]) * 180 / Math.PI;
      info.innerHTML = 'after <b style="color:' + p.gold + '">' + K + '</b> iteration' + (K === 1 ? '' : 's') + ', the vector points at <b>' + angle.toFixed(1) + '°</b> — ' +
        (K === 0 ? 'the off-axis start (17°).' : Math.abs(angle - 45) < 0.5 ? 'locked onto the 45° dominant eigendirection.' : 'swinging toward the 45° dominant eigendirection.') +
        ' Each step multiplies the λ=3 component by 3 and the λ=1 component by 1, so the dominant direction wins.';
    }
    slider(ctl, { label: 'iterations k', min: 0, max: 12, step: 1, value: K, fmt: v => v.toFixed(0), onInput: v => { K = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Power iteration on the matrix [[2,1],[1,2]], whose eigenvectors lie along 45 degrees (eigenvalue 3) and minus 45 degrees (eigenvalue 1), drawn as dashed lines on a unit circle. A gold unit vector starts off-axis at 17 degrees; a slider advances the iteration count, and after each multiply-and-renormalize step the vector swings closer to the 45-degree dominant eigendirection, reaching it within a few steps regardless of the start, which is the mechanism behind power iteration and PageRank.');
    draw();
  });


  /* ========================================================
     153. Information gain at a decision-tree split (machine learning)
     ======================================================== */
  register({ id: 'ml-information-gain', topic: 'machine-learning', title: 'Information gain: how a tree picks its split', blurb: 'A decision tree chooses each split to maximize information gain — the parent node’s entropy minus the (size-weighted) entropy of the two children. Equivalently, it picks the question whose answer tells you the most about the label. Slide the split threshold across these eight points (four of each class): the gain is largest exactly where the cut cleanly separates the classes, driving both children to zero entropy. That gain IS the mutual information between the label and the "which side?" test.' },
  function (root) {
    const W = 500, H = 280, padL = 30, padR = 30, midY = 120;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const pos = [1, 2, 3, 4, 5, 6, 7, 8], cls = ["A", "A", "A", "A", "B", "B", "B", "B"];
    let t = 4.5;
    function ent(items) { const n = items.length; if (!n) return 0; const a = items.filter(x => x === "A").length / n; let h = 0; [a, 1 - a].forEach(p => { if (p > 0) h -= p * Math.log2(p); }); return h; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const X = v => padL + (v - 0.5) / 8 * (W - padL - padR);
      // axis line
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, midY); ctx.lineTo(W - padR, midY); ctx.stroke();
      // split line
      ctx.strokeStyle = p.gold; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(t), 40); ctx.lineTo(X(t), 200); ctx.stroke(); ctx.lineWidth = 1; ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText('split', X(t), 32);
      // points
      pos.forEach((x, i) => { ctx.fillStyle = cls[i] === "A" ? p.sage : p.violet; ctx.beginPath(); ctx.arc(X(x), midY, 9, 0, 7); ctx.fill(); ctx.fillStyle = p.bg; ctx.fillText(cls[i], X(x), midY + 4); });
      const L = cls.filter((_, i) => pos[i] < t), R = cls.filter((_, i) => pos[i] >= t);
      const n = cls.length, parentH = ent(cls), childH = (L.length / n) * ent(L) + (R.length / n) * ent(R), gain = parentH - childH;
      // gain bar
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.fillText('information gain', padL, 230);
      ctx.strokeStyle = p.line; ctx.strokeRect(padL, 238, W - padL - padR, 16);
      ctx.fillStyle = p.gold; ctx.fillRect(padL, 238, (gain / 1) * (W - padL - padR), 16);
      ctx.fillStyle = p.soft; ctx.textAlign = 'right'; ctx.fillText(gain.toFixed(3) + ' bits', W - padR, 250);
      info.innerHTML = 'split at <b style="color:' + p.gold + '">' + t.toFixed(1) + '</b> → left ' + L.length + ', right ' + R.length + '. ' +
        'parent entropy <b>' + parentH.toFixed(2) + '</b> − weighted child entropy <b>' + childH.toFixed(2) + '</b> = gain <b style="color:' + p.gold + '">' + gain.toFixed(3) + '</b> bits. ' +
        (Math.abs(gain - 1) < 0.001 ? 'A perfect split — both children are pure (zero entropy).' : 'Drag toward the class boundary to raise the gain.');
    }
    slider(ctl, { label: 'split threshold', min: 0.5, max: 8.5, step: 0.5, value: t, fmt: v => v.toFixed(1), onInput: v => { t = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Information gain at a decision-tree split. Eight points sit on a line, four of class A then four of class B, with a draggable vertical split threshold. A bar shows the information gain — parent entropy minus size-weighted child entropy — which is maximal (1 bit) when the split falls between the A group and the B group, making both children pure, and smaller for any split that leaves classes mixed.');
    draw();
  });


  /* ========================================================
     154. Fisher information: the likelihood sharpens with more data (probability & statistics)
     ======================================================== */
  register({ id: 'ps-fisher-information', topic: 'probability-statistics', title: 'Fisher information: how sharply data pins down a parameter', blurb: 'Estimating a Gaussian’s mean μ from n samples, the likelihood as a function of μ is itself a bell curve centered on the estimate. Its width is exactly the Cramér–Rao standard deviation σ/√n — the best precision any unbiased estimator can reach. Slide n: more data makes the likelihood spike sharply (high Fisher information = high curvature), and the shaded ±1σ band — the uncertainty in the estimate — shrinks like 1/√n. Fisher information is just how pointed this peak is.' },
  function (root) {
    const W = 520, H = 300, padL = 20, padR = 20, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const sigma = 2, xbar = 5, LO = 0, HI = 10;
    let n = 9;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const crStd = sigma / Math.sqrt(n), I = n / (sigma * sigma);
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, baseY = padT + plotH;
      const X = m => x0 + (m - LO) / (HI - LO) * plotW, Y = v => baseY - v * plotH;
      // CR ±1σ band around the MLE
      ctx.fillStyle = 'rgba(224,164,88,0.16)'; ctx.fillRect(X(xbar - crStd), padT, X(xbar + crStd) - X(xbar - crStd), plotH);
      // normalized likelihood bump L(mu) = exp(-n (mu-xbar)^2 / (2 sigma^2)), peak 1
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2; ctx.beginPath();
      for (let px = 0; px <= plotW; px++) { const m = LO + (HI - LO) * px / plotW; const L = Math.exp(-n * (m - xbar) * (m - xbar) / (2 * sigma * sigma)); const xx = x0 + px, yy = Y(L); px ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.stroke(); ctx.lineWidth = 1;
      // axes + MLE line
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(x0, baseY); ctx.lineTo(x0 + plotW, baseY); ctx.stroke();
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(xbar), padT); ctx.lineTo(X(xbar), baseY); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      [0, 2.5, 5, 7.5, 10].forEach(m => ctx.fillText(m, X(m), baseY + 14));
      ctx.fillStyle = p.gold; ctx.fillText('μ̂ = ' + xbar, X(xbar), padT - 2);
      info.innerHTML = 'sample size n = <b style="color:' + p.violet + '">' + n + '</b>. Fisher information I = n/σ² = <b>' + I.toFixed(2) + '</b>; ' +
        'the likelihood peak is that sharp. Cramér–Rao std = σ/√n = <b style="color:' + p.gold + '">' + crStd.toFixed(2) + '</b> (the shaded band) — ' +
        'the tightest any unbiased estimate of μ can be. Quadruple n and the peak doubles in sharpness, the band halves.';
    }
    slider(ctl, { label: 'sample size n', min: 1, max: 100, step: 1, value: n, fmt: v => v.toFixed(0), onInput: v => { n = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Fisher information: estimating a Gaussian mean. The likelihood as a function of the mean is a bell curve centered on the estimate, with a shaded plus-or-minus one Cramér-Rao standard-deviation band of width sigma over root n. A slider sets the sample size n; as n grows the likelihood peak becomes sharper (higher Fisher information, higher curvature) and the band shrinks like one over root n, showing how more data pins the parameter down more precisely.');
    draw();
  });


  /* ========================================================
     155. Gumbel-softmax: temperature morphs a sample from soft to one-hot (deep learning)
     ======================================================== */
  register({ id: 'dl-gumbel-softmax', topic: 'deep-learning', title: 'Gumbel-softmax: the temperature dial', blurb: 'To backprop through a discrete choice, Gumbel-softmax draws Gumbel noise, adds it to the category log-probabilities, and passes the result through a temperature-τ softmax: y = softmax((log π + g)/τ). The bars below are one such differentiable sample over four categories. Slide τ: near zero the output snaps to a near one-hot vector (a faithful but high-variance sample); large τ smooths it toward uniform (low-variance but biased). Resample to draw fresh Gumbel noise — every forward pass is a different soft sample.' },
  function (root) {
    const W = 460, H = 280, padL = 40, padB = 50, padT = 24;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const btns = controls(root);
    const info = note(root);
    const logits = [2.0, 1.0, 0.5, 0.0], labels = ['A', 'B', 'C', 'D'];
    let tau = 1, g = [];
    function gumbel() { return -Math.log(-Math.log(Math.random() * 0.9998 + 0.0001)); }
    function resample() { g = logits.map(() => gumbel()); draw(); }
    function softmax(z) { const m = Math.max.apply(null, z); const e = z.map(x => Math.exp(x - m)); const s = e.reduce((a, b) => a + b, 0); return e.map(x => x / s); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const y = softmax(logits.map((L, i) => (L + g[i]) / tau));
      const plotH = H - padT - padB, baseY = padT + plotH, n = logits.length;
      const bw = (W - padL - 20) / n * 0.6, gap = (W - padL - 20) / n;
      // y-axis gridlines
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(v => { const yy = baseY - v * plotH; ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - 20, yy); ctx.stroke(); ctx.fillText(v.toFixed(1), padL - 4, yy + 3); });
      // bars
      y.forEach((v, i) => {
        const x = padL + 10 + i * gap;
        ctx.fillStyle = i === 0 ? p.sage : p.violet;
        ctx.fillRect(x, baseY - v * plotH, bw, v * plotH);
        ctx.fillStyle = p.soft; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + bw / 2, baseY + 16);
        ctx.fillText(v.toFixed(2), x + bw / 2, baseY - v * plotH - 5);
      });
      const mx = Math.max.apply(null, y);
      info.innerHTML = 'temperature τ = <b style="color:' + p.gold + '">' + tau.toFixed(2) + '</b>. Largest weight = <b>' + mx.toFixed(2) + '</b>. ' +
        (tau <= 0.3 ? 'Almost a hard one-hot sample — faithful to a true draw, but the gradient is high-variance.'
          : tau >= 3 ? 'Heavily smoothed toward uniform — low-variance gradients, but a biased (blurry) sample.'
            : 'A soft, differentiable stand-in for a one-hot sample — gradients flow through it.');
    }
    slider(ctl, { label: 'temperature τ', min: 0.1, max: 5, step: 0.1, value: tau, fmt: v => v.toFixed(1), onInput: v => { tau = v; draw(); } });
    button(btns, '🎲 Resample noise', resample);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Gumbel-softmax over four categories A through D. Bars show the softmax of (log-probability plus Gumbel noise) divided by temperature tau. A slider sets tau: near 0.1 one bar rises to almost 1 and the rest collapse to near 0 (a near one-hot sample); at large tau the four bars flatten toward equal height (near uniform). A resample button draws fresh Gumbel noise, giving a different soft sample each time.');
    resample();
  });


  /* ========================================================
     156. GARCH: volatility clustering (time series)
     ======================================================== */
  register({ id: 'ts-garch-volatility', topic: 'time-series', title: 'GARCH: volatility clustering', blurb: 'A GARCH(1,1) process feeds yesterday’s squared shock and variance back into today’s variance: σ²ₜ = ω + α·ε²ₜ₋₁ + β·σ²ₜ₋₁. The top panel is the simulated returns; the bottom panel is the conditional volatility σₜ driving them. Slide the persistence α+β: near zero the volatility is almost flat (constant-variance, like ARIMA assumes); near one, calm and turbulent stretches bunch into long runs — the volatility clustering real markets show. The long-run variance is held at 1 so only the clustering changes, not the scale.' },
  function (root) {
    const W = 520, H = 320, padL = 34, padR = 12;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const btns = controls(root);
    const info = note(root);
    const N = 260, alpha = 0.15;
    let persist = 0.92, seed = 7;
    function sim() {
      let s = seed; const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
      const gauss = () => { const u1 = Math.max(rnd(), 1e-9), u2 = rnd(); return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); };
      const beta = Math.max(0, persist - alpha), omega = 1 - persist;
      let v = 1, eps = 0; const R = [], S = [];
      for (let t = 0; t < N; t++) { v = omega + alpha * eps * eps + beta * v; const sd = Math.sqrt(v); eps = sd * gauss(); R.push(eps); S.push(sd); }
      return { R, S };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const { R, S } = sim();
      const plotW = W - padL - padR, x = i => padL + i / (N - 1) * plotW;
      // top panel: returns (mid at y=70, range +/- 60)
      const midR = 72, scR = 11;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, midR); ctx.lineTo(W - padR, midR); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('returns εₜ', padL, 16);
      ctx.strokeStyle = p.violet; ctx.beginPath();
      R.forEach((r, i) => { const yy = midR - r * scR; i ? ctx.lineTo(x(i), yy) : ctx.moveTo(x(i), yy); }); ctx.stroke();
      // bottom panel: conditional volatility sigma_t (baseline y=300, up)
      const baseV = 300, scV = 60;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, baseV); ctx.lineTo(W - padR, baseV); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'left'; ctx.fillText('volatility σₜ', padL, 168);
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2; ctx.beginPath();
      S.forEach((sd, i) => { const yy = baseV - sd * scV; i ? ctx.lineTo(x(i), yy) : ctx.moveTo(x(i), yy); }); ctx.stroke(); ctx.lineWidth = 1;
      const mean = S.reduce((a, b) => a + b, 0) / N, cl = Math.sqrt(S.reduce((a, b) => a + (b - mean) * (b - mean), 0) / N);
      info.innerHTML = 'persistence α+β = <b style="color:' + p.gold + '">' + persist.toFixed(2) + '</b>. Volatility spread (clustering) = <b>' + cl.toFixed(3) + '</b>. ' +
        (persist <= 0.4 ? 'Nearly constant variance — shocks die instantly, no clustering (what plain ARIMA assumes).'
          : persist >= 0.85 ? 'Strong clustering — calm and turbulent runs persist, just like real returns.'
            : 'Moderate clustering — volatility drifts in waves.');
    }
    slider(ctl, { label: 'persistence α+β', min: 0.2, max: 0.97, step: 0.01, value: persist, fmt: v => v.toFixed(2), onInput: v => { persist = v; draw(); } });
    button(btns, '🎲 New path', () => { seed = (seed * 16807 + 1) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'GARCH volatility clustering. Top panel: simulated returns over time. Bottom panel: the conditional volatility sigma_t. A persistence slider (alpha plus beta) controls clustering: near 0.2 the volatility line is almost flat and returns look uniform; near 0.97 the volatility forms long high and low runs and the returns show clusters of large and small moves. A New-path button reseeds the simulation.');
    draw();
  });


  /* ========================================================
     157. Reservoir sampling: uniform despite the 1/i rule (algorithms)
     ======================================================== */
  register({ id: 'a-reservoir-sampling', topic: 'algorithms', title: 'Reservoir sampling: uniform out of a biased-looking rule', blurb: 'Reservoir sampling keeps one item from a stream of n: hold the first, then replace the held item with probability 1/i as the i-th arrives. The rule looks lopsided — early items face many chances to be evicted, late items almost none — yet every position ends up equally likely. Each bar is how often that position was the survivor across many simulated streams; the dashed line is the ideal 1/n. Slide the trial count: with few trials the bars are noisy, but they flatten onto 1/n as the trials pile up.' },
  function (root) {
    const W = 480, H = 290, padL = 40, padR = 16, padT = 20, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const n = 8;
    let T = 2000;
    function trial() { let held = 0; for (let i = 1; i < n; i++) { if (Math.random() < 1 / (i + 1)) held = i; } return held; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const cnt = new Array(n).fill(0);
      for (let t = 0; t < T; t++) cnt[trial()]++;
      const freq = cnt.map(x => x / T);
      const uni = 1 / n, yMax = 0.25;
      const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const Y = v => baseY - (v / yMax) * plotH;
      // y gridlines
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.125, 0.25].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(3), padL - 4, yy + 3); });
      // bars
      const bw = plotW / n * 0.62, gap = plotW / n;
      freq.forEach((f, i) => {
        const x = padL + i * gap + (gap - bw) / 2;
        ctx.fillStyle = p.violet; ctx.fillRect(x, Y(f), bw, baseY - Y(f));
        ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText(i + 1, x + bw / 2, baseY + 14);
      });
      // uniform reference line
      ctx.strokeStyle = p.gold; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(padL, Y(uni)); ctx.lineTo(W - padR, Y(uni)); ctx.stroke(); ctx.lineWidth = 1; ctx.setLineDash([]);
      ctx.fillStyle = p.gold; ctx.textAlign = 'left'; ctx.fillText('1/n', W - padR - 22, Y(uni) - 4);
      const spread = Math.max.apply(null, freq) - Math.min.apply(null, freq);
      info.innerHTML = 'trials = <b style="color:' + p.violet + '">' + T + '</b>. Spread (max − min frequency) = <b>' + spread.toFixed(3) + '</b>; the ideal is <b style="color:' + p.gold + '">' + uni.toFixed(3) + '</b> for every position. ' +
        (T >= 3000 ? 'With many trials the bars sit right on 1/n — uniform, exactly as the proof promises.' : 'Noisy so far — raise the trial count and watch the bars level off.');
    }
    slider(ctl, { label: 'trials', min: 50, max: 8000, step: 50, value: T, fmt: v => v.toFixed(0), onInput: v => { T = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Reservoir sampling uniformity. Eight bars show how often each stream position was the surviving sample across many simulated runs, against a dashed reference line at one over n. A trials slider increases the number of simulations; with few trials the bars are uneven, and as trials grow they converge onto the 1/n line, showing every position is equally likely despite the 1/i replacement rule.');
    draw();
  });


  /* ========================================================
     158. Distribution distances: TV, KL, and Pinsker's bound (information theory)
     ======================================================== */
  register({ id: 'it-distances', topic: 'information-theory', title: 'TV, KL, and Pinsker: measuring how far apart two distributions are', blurb: 'Two distributions over four outcomes: a fixed p (gold) and an adjustable q (violet). Total variation is half the summed bar-height gap — the largest probability difference any event can show. KL divergence is the information-theoretic gap. Slide q toward p and both shrink to zero together; Pinsker’s inequality guarantees TV never exceeds √(KL/2), so a small KL always means a small, operational TV.' },
  function (root) {
    const W = 500, H = 300, padL = 40, padR = 16, padT = 22, padB = 64;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const p = [0.40, 0.30, 0.20, 0.10], uni = [0.25, 0.25, 0.25, 0.25];
    let t = 0.0;
    function draw() {
      const pal = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, W, H);
      const q = p.map((pi, i) => (1 - t) * uni[i] + t * pi);
      const n = p.length, yMax = 0.5;
      const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const Y = v => baseY - (v / yMax) * plotH;
      ctx.strokeStyle = pal.line; ctx.fillStyle = pal.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.25, 0.5].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(2), padL - 4, yy + 3); });
      const grp = plotW / n, bw = grp * 0.34;
      p.forEach((pi, i) => {
        const x0 = padL + i * grp + grp * 0.5;
        ctx.fillStyle = pal.gold; ctx.fillRect(x0 - bw - 2, Y(pi), bw, baseY - Y(pi));
        ctx.fillStyle = pal.violet; ctx.fillRect(x0 + 2, Y(q[i]), bw, baseY - Y(q[i]));
        ctx.fillStyle = pal.mute; ctx.textAlign = 'center'; ctx.fillText((i + 1), x0, baseY + 14);
      });
      ctx.textAlign = 'left'; ctx.fillStyle = pal.gold; ctx.fillText('p', padL, H - 40); ctx.fillStyle = pal.violet; ctx.fillText('q', padL + 22, H - 40);
      const tv = 0.5 * p.reduce((s, pi, i) => s + Math.abs(pi - q[i]), 0);
      const kl = p.reduce((s, pi, i) => s + (pi > 0 && q[i] > 0 ? pi * Math.log(pi / q[i]) : 0), 0);
      const bound = Math.sqrt(kl / 2);
      info.innerHTML = 'q→p mix t = <b style="color:' + pal.violet + '">' + t.toFixed(2) + '</b>. ' +
        'TV = <b>' + tv.toFixed(3) + '</b>, KL(p‖q) = <b>' + kl.toFixed(3) + '</b> nats. ' +
        'Pinsker: TV ≤ √(KL/2) = <b style="color:' + pal.gold + '">' + bound.toFixed(3) + '</b> — ' +
        (tv <= bound + 1e-9 ? 'holds ✓' : 'VIOLATED') + '. ' +
        (t > 0.98 ? 'q equals p: both distances are zero.' : 'Slide q onto p to drive both to zero together.');
    }
    slider(ctl, { label: 'q → p (mix t)', min: 0, max: 1, step: 0.02, value: t, fmt: v => v.toFixed(2), onInput: v => { t = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Distribution distances. Paired bars over four outcomes show a fixed distribution p in gold and an adjustable q in violet. A slider mixes q from uniform toward p. A readout gives total variation, KL divergence in nats, and the Pinsker bound square-root of KL over two; total variation always stays at or below that bound, and both distances fall to zero as q reaches p.');
    draw();
  });


  /* ========================================================
     159. Conformal prediction: coverage you can trust (machine learning)
     ======================================================== */
  register({ id: 'ml-conformal', topic: 'machine-learning', title: 'Conformal prediction: the band that keeps its promise', blurb: 'A model predicts ŷ = 0.5x; conformal prediction wraps it in a band ŷ ± q̂, where q̂ is the (1−α) quantile of the calibration residuals. The remarkable part is the guarantee: whatever α you pick, the band covers about 1−α of fresh points — no distribution assumptions needed. Slide α and watch the empirical coverage track the target while the band tightens or widens to keep its word.' },
  function (root) {
    const W = 500, H = 300, padL = 36, padR = 14, padT = 18, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let alpha = 0.1;
    function mk(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function gauss(r) { return (r() + r() + r() + r() - 2); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // calibration residuals -> qhat
      const rc = mk(7); const cal = []; for (let i = 0; i < 200; i++) cal.push(Math.abs(gauss(rc))); cal.sort((a, b) => a - b);
      const k = Math.min(Math.ceil((1 - alpha) * (cal.length + 1)) - 1, cal.length - 1);
      const qhat = cal[k];
      // test points
      const rt = mk(99); const pts = []; for (let i = 0; i < 60; i++) { const x = rt() * 10; const y = 0.5 * x + gauss(rt); pts.push([x, y]); }
      const XLO = 0, XHI = 10, YLO = -2.5, YHI = 7.5;
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, baseY = padT + plotH;
      const X = x => x0 + (x - XLO) / (XHI - XLO) * plotW, Y = y => baseY - (y - YLO) / (YHI - YLO) * plotH;
      // band yhat = 0.5x +/- qhat
      ctx.fillStyle = 'rgba(224,164,88,0.16)'; ctx.beginPath();
      ctx.moveTo(X(XLO), Y(0.5 * XLO + qhat)); ctx.lineTo(X(XHI), Y(0.5 * XHI + qhat)); ctx.lineTo(X(XHI), Y(0.5 * XHI - qhat)); ctx.lineTo(X(XLO), Y(0.5 * XLO - qhat)); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = p.gold; ctx.beginPath(); ctx.moveTo(X(XLO), Y(0.5 * XLO)); ctx.lineTo(X(XHI), Y(0.5 * XHI)); ctx.stroke();
      // points colored by coverage
      let cov = 0;
      pts.forEach(pt => { const inside = Math.abs(pt[1] - 0.5 * pt[0]) <= qhat; if (inside) cov++; ctx.fillStyle = inside ? p.sage : p.rust; ctx.beginPath(); ctx.arc(X(pt[0]), Y(pt[1]), 3.2, 0, 7); ctx.fill(); });
      const emp = cov / pts.length;
      info.innerHTML = 'target coverage 1−α = <b style="color:' + p.gold + '">' + (1 - alpha).toFixed(2) + '</b>. ' +
        'Empirical (green points inside the band) = <b style="color:' + p.sage + '">' + emp.toFixed(2) + '</b>; band half-width q̂ = <b>' + qhat.toFixed(2) + '</b>. ' +
        'Tighten α and the band widens to keep the promise.';
    }
    slider(ctl, { label: 'miscoverage α', min: 0.05, max: 0.5, step: 0.05, value: alpha, fmt: v => v.toFixed(2), onInput: v => { alpha = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Conformal prediction. Scatter of test points around the line y = 0.5x, wrapped in a shaded band of half-width q-hat. Points inside the band are green, points outside red. A slider sets the miscoverage alpha; the band half-width is the one-minus-alpha quantile of calibration residuals, and the empirical fraction of green points stays near the target one minus alpha as alpha changes, with the band widening as alpha shrinks.');
    draw();
  });


  /* ========================================================
     160. Regression discontinuity: the jump at the cutoff (probability & statistics)
     ======================================================== */
  register({ id: 'ps-regression-discontinuity', topic: 'probability-statistics', title: 'Regression discontinuity: reading the effect off the jump', blurb: 'Treatment switches on at a cutoff in the running variable (here x = 5). Units just below get no treatment; units just above do — and are otherwise nearly identical. Fit a line on each side and the vertical gap where they meet the cutoff is the causal effect. Slide the true effect: the estimated jump tracks it, recovered purely from the discontinuity, with no control-vs-treatment matching required.' },
  function (root) {
    const W = 500, H = 300, padL = 36, padR = 14, padT = 18, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const cut = 5;
    let tau = 1.5;
    function mk(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function fit(pts) { const n = pts.length; let sx = 0, sy = 0, sxx = 0, sxy = 0; pts.forEach(p => { sx += p[0]; sy += p[1]; sxx += p[0] * p[0]; sxy += p[0] * p[1]; }); const sl = (n * sxy - sx * sy) / (n * sxx - sx * sx); const ic = (sy - sl * sx) / n; return x => sl * x + ic; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const r = mk(7); const pts = [];
      for (let i = 0; i < 120; i++) { const x = r() * 10; const noise = (r() + r() - 1) * 0.6; const y = 0.4 * x + (x >= cut ? tau : 0) + noise; pts.push([x, y]); }
      const XLO = 0, XHI = 10, YLO = -1, YHI = 9;
      const plotW = W - padL - padR, plotH = H - padT - padB, x0 = padL, baseY = padT + plotH;
      const X = x => x0 + (x - XLO) / (XHI - XLO) * plotW, Y = y => baseY - (y - YLO) / (YHI - YLO) * plotH;
      const L = fit(pts.filter(q => q[0] < cut)), Rg = fit(pts.filter(q => q[0] >= cut));
      // points
      pts.forEach(q => { ctx.fillStyle = q[0] < cut ? p.violet : p.sage; ctx.beginPath(); ctx.arc(X(q[0]), Y(q[1]), 2.8, 0, 7); ctx.fill(); });
      // cutoff line
      ctx.strokeStyle = p.line; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(cut), padT); ctx.lineTo(X(cut), baseY); ctx.stroke(); ctx.setLineDash([]);
      // fitted lines
      ctx.lineWidth = 2; ctx.strokeStyle = p.violet; ctx.beginPath(); ctx.moveTo(X(XLO), Y(L(XLO))); ctx.lineTo(X(cut), Y(L(cut))); ctx.stroke();
      ctx.strokeStyle = p.sage; ctx.beginPath(); ctx.moveTo(X(cut), Y(Rg(cut))); ctx.lineTo(X(XHI), Y(Rg(XHI))); ctx.stroke(); ctx.lineWidth = 1;
      // the jump
      ctx.strokeStyle = p.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(cut), Y(L(cut))); ctx.lineTo(X(cut), Y(Rg(cut))); ctx.stroke(); ctx.lineWidth = 1;
      const est = Rg(cut) - L(cut);
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center'; ctx.fillText('cutoff', X(cut), baseY + 14);
      info.innerHTML = 'true effect τ = <b style="color:' + p.gold + '">' + tau.toFixed(2) + '</b>. ' +
        'Estimated jump at the cutoff (gold bar) = <b style="color:' + p.gold + '">' + est.toFixed(2) + '</b>. ' +
        'Recovered from the discontinuity alone — the two sides agree everywhere except the gap.';
    }
    slider(ctl, { label: 'true effect τ', min: 0, max: 4, step: 0.25, value: tau, fmt: v => v.toFixed(2), onInput: v => { tau = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Regression discontinuity. Scatter of outcome versus a running variable with a dashed cutoff at x equals 5; points left of the cutoff are violet (untreated), right are green (treated). A line is fitted on each side, and a gold vertical bar marks the gap between them at the cutoff. A slider sets the true treatment effect; the estimated jump (the gold gap) tracks it.');
    draw();
  });


  /* ========================================================
     161. Cointegration: series that wander together (time series)
     ======================================================== */
  register({ id: 'ts-cointegration', topic: 'time-series', title: 'Cointegration: two random walks on a leash', blurb: 'Two non-stationary series (top) each wander like a random walk. What matters is their spread (bottom). When they are cointegrated they share a common stochastic trend, so the spread stays bounded and mean-reverting — a stationary combination of two non-stationary series. Slide the link strength λ: at λ=1 the spread hugs zero (cointegrated, the basis of pairs trading); drop λ and the two series drift apart and the spread itself becomes a random walk.' },
  function (root) {
    const W = 500, H = 320, padL = 32, padR = 12;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 120;
    let lam = 1.0, seed = 7;
    function mk(s) { return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function sim() {
      const r = mk(seed); let C = 0, C2 = 0; const A = [], B = [], sp = [];
      for (let t = 0; t < N; t++) { C += (r() - 0.5); C2 += (r() - 0.5); const na = (r() - 0.5) * 0.6, nb = (r() - 0.5) * 0.6; const a = C + na, b = lam * C + (1 - lam) * C2 + nb; A.push(a); B.push(b); sp.push(a - b); }
      return { A, B, sp };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const { A, B, sp } = sim();
      const all = A.concat(B); const lo = Math.min.apply(null, all), hi = Math.max.apply(null, all), pad = (hi - lo) * 0.1 + 0.5;
      const plotW = W - padL - padR, X = i => padL + i / (N - 1) * plotW;
      // top: series A & B (y in [0,150])
      const Yt = v => 18 + (1 - (v - lo + pad) / (hi - lo + 2 * pad)) * 120;
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('series A, B', padL, 14);
      ctx.strokeStyle = p.gold; ctx.beginPath(); A.forEach((v, i) => { i ? ctx.lineTo(X(i), Yt(v)) : ctx.moveTo(X(i), Yt(v)); }); ctx.stroke();
      ctx.strokeStyle = p.violet; ctx.beginPath(); B.forEach((v, i) => { i ? ctx.lineTo(X(i), Yt(v)) : ctx.moveTo(X(i), Yt(v)); }); ctx.stroke();
      // bottom: spread A-B around a fixed zero line (y in [180,300]), fixed scale so drift is visible
      const baseS = 250, scS = 7;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, baseS); ctx.lineTo(W - padR, baseS); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.fillText('spread A − B (0 line)', padL, 176);
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2; ctx.beginPath(); sp.forEach((v, i) => { const yy = Math.max(184, Math.min(312, baseS - v * scS)); i ? ctx.lineTo(X(i), yy) : ctx.moveTo(X(i), yy); }); ctx.stroke(); ctx.lineWidth = 1;
      const rng = Math.max.apply(null, sp) - Math.min.apply(null, sp);
      info.innerHTML = 'link strength λ = <b style="color:' + p.sage + '">' + lam.toFixed(2) + '</b>. Spread range = <b>' + rng.toFixed(1) + '</b>. ' +
        (lam >= 0.9 ? 'Cointegrated — the spread stays bounded and mean-reverting even as A and B wander.' : lam <= 0.2 ? 'Not cointegrated — the spread itself drifts like a random walk.' : 'Weakly linked — the spread wanders more the lower λ goes.');
    }
    slider(ctl, { label: 'link strength λ', min: 0, max: 1, step: 0.05, value: lam, fmt: v => v.toFixed(2), onInput: v => { lam = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Cointegration. Top panel: two wandering random-walk series A (gold) and B (violet). Bottom panel: their spread A minus B against a fixed zero line. A link-strength slider lambda controls how much they share a common trend: near lambda=1 the spread stays bounded and mean-reverting (cointegrated), and as lambda drops the spread drifts away like a random walk.');
    draw();
  });


  /* ========================================================
     162. Brownian motion: paths fanning within the √t envelope (probability & statistics)
     ======================================================== */
  register({ id: 'ps-brownian-motion', topic: 'probability-statistics', title: 'Brownian motion: the √t spread', blurb: 'Many Brownian paths all start at 0 and wander by independent Gaussian steps. Two things to see: the cloud of paths spreads like √t (the dashed envelope is ±1 and ±2 standard deviations, σ√t), and at any fixed time the paths are normally distributed. Add drift μ and the whole fan tilts along the line μt while still diffusing around it — exactly the SDE dX = μ dt + σ dW.' },
  function (root) {
    const W = 500, H = 300, padL = 32, padR = 14, padT = 14, padB = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const M = 26, STEPS = 100, T = 1, dt = T / STEPS, sigma = 1;
    let mu = 0, seed = 7;
    function mk(s) { return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const r = mk(seed); const gauss = () => (r() + r() + r() + r() - 2) * 1.0;
      const YLO = -3.2, YHI = 3.2, plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const X = t => padL + t / T * plotW, Y = v => baseY - (v - YLO) / (YHI - YLO) * plotH;
      // zero axis
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      // +/- 1 and 2 sigma*sqrt(t) envelope around mu*t
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]);
      [1, 2, -1, -2].forEach(k => { ctx.beginPath(); for (let s = 0; s <= STEPS; s++) { const t = s * dt; const m = mu * t + k * sigma * Math.sqrt(t); s ? ctx.lineTo(X(t), Y(m)) : ctx.moveTo(X(t), Y(m)); } ctx.stroke(); });
      ctx.setLineDash([]);
      // mean line mu*t
      ctx.strokeStyle = p.sage; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(T), Y(mu * T)); ctx.stroke(); ctx.lineWidth = 1;
      // paths
      ctx.strokeStyle = 'rgba(160,140,210,0.55)';
      let finalSum = 0;
      for (let m = 0; m < M; m++) { let v = 0; ctx.beginPath(); ctx.moveTo(X(0), Y(0)); for (let s = 1; s <= STEPS; s++) { v += mu * dt + sigma * gauss() * Math.sqrt(dt); ctx.lineTo(X(s * dt), Y(v)); } ctx.stroke(); finalSum += v; }
      info.innerHTML = 'drift μ = <b style="color:' + p.sage + '">' + mu.toFixed(2) + '</b>. At t=1 the spread is ≈ σ√t = <b style="color:' + p.gold + '">1.00</b> (the envelope), mean ≈ μt = <b>' + (mu * T).toFixed(2) + '</b>. ' +
        'Every path is continuous yet jagged at every scale — and Gaussian at each fixed time.';
    }
    slider(ctl, { label: 'drift μ', min: -2, max: 2, step: 0.25, value: mu, fmt: v => v.toFixed(2), onInput: v => { mu = v; draw(); } });
    button(controls(root), '🎲 New paths', () => { seed = (seed * 16807 + 1) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Brownian motion. Twenty-six random paths start at zero and fan outward over time within a dashed envelope at plus or minus one and two standard deviations, sigma times square-root t. A drift slider mu tilts the whole fan along the line mu times t while it keeps diffusing; a New-paths button reseeds.');
    draw();
  });


  /* ========================================================
     163. The maximum-entropy die: constrain the mean, get the Boltzmann shape (information theory)
     ======================================================== */
  register({ id: 'it-max-entropy', topic: 'information-theory', title: 'The maximum-entropy die', blurb: 'You are told only the average roll of a six-sided die. Of all distributions with that mean, which should you assume? The maximum-entropy one — the least-committal. It always comes out exponentially tilted, pᵢ ∝ e^{λi} (the Boltzmann / exponential-family form), with λ set to hit the mean. Slide the target mean: at 3.5 the tilt vanishes and you get the uniform die (entropy maxed at log₂6); push the mean off-center and the bars tilt while total entropy falls.' },
  function (root) {
    const W = 480, H = 290, padL = 38, padR = 14, padT = 16, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let mean = 3.5;
    function distMean(lam) { let num = 0, den = 0; for (let i = 1; i <= 6; i++) { const w = Math.exp(lam * i); num += i * w; den += w; } return num / den; }
    function solve(m) { let lo = -4, hi = 4; for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (distMean(mid) < m) lo = mid; else hi = mid; } return (lo + hi) / 2; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const lam = solve(mean); let den = 0; for (let i = 1; i <= 6; i++) den += Math.exp(lam * i);
      const pr = []; for (let i = 1; i <= 6; i++) pr.push(Math.exp(lam * i) / den);
      let H_ = 0; pr.forEach(q => { if (q > 0) H_ -= q * Math.log2(q); });
      const yMax = 0.5, plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const Y = v => baseY - (v / yMax) * plotH;
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.25, 0.5].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(2), padL - 4, yy + 3); });
      // uniform reference 1/6
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(padL, Y(1 / 6)); ctx.lineTo(W - padR, Y(1 / 6)); ctx.stroke(); ctx.setLineDash([]);
      const gap = plotW / 6, bw = gap * 0.6;
      pr.forEach((q, i) => { const x = padL + i * gap + (gap - bw) / 2; ctx.fillStyle = p.violet; ctx.fillRect(x, Y(q), bw, baseY - Y(q)); ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText(i + 1, x + bw / 2, baseY + 14); });
      info.innerHTML = 'target mean = <b style="color:' + p.violet + '">' + mean.toFixed(1) + '</b> → tilt λ = <b>' + lam.toFixed(2) + '</b>. ' +
        'Entropy = <b style="color:' + p.gold + '">' + H_.toFixed(3) + '</b> bits (max = log₂6 = 2.585). ' +
        (Math.abs(mean - 3.5) < 0.05 ? 'Mean centered → no tilt → the uniform die, entropy maxed.' : 'Off-center mean tilts the bars exponentially and costs entropy.');
    }
    slider(ctl, { label: 'target mean', min: 1.5, max: 5.5, step: 0.1, value: mean, fmt: v => v.toFixed(1), onInput: v => { mean = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'The maximum-entropy die. Six bars give the probabilities of faces 1 to 6, against a dashed uniform reference at one-sixth. A slider sets the target mean; the bars take the maximum-entropy shape consistent with it, which is exponentially tilted (p proportional to e to the lambda i). At mean 3.5 the tilt is zero and the bars are uniform with entropy at its maximum log base 2 of 6; moving the mean off-center tilts the bars and lowers the entropy.');
    draw();
  });


  /* ========================================================
     164. Fictitious play converging to Nash in Rock-Paper-Scissors (game theory)
     ======================================================== */
  register({ id: 'gt-fictitious-play', topic: 'game-theory', title: 'Fictitious play: learning your way to Nash', blurb: 'Each player repeatedly best-responds to the empirical frequency of the opponent’s past moves — a simple learning rule with no equilibrium reasoning at all. In Rock-Paper-Scissors the actual play cycles forever, yet the time-averaged frequencies settle onto the Nash mixed strategy (⅓, ⅓, ⅓). Slide the round count: with few rounds the bars are lopsided; let it run and they flatten onto the dashed ⅓ line. Learning finds the equilibrium even though no one is solving for it.' },
  function (root) {
    const W = 460, H = 280, padL = 36, padR = 14, padT = 18, padB = 40;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const labels = ['Rock', 'Paper', 'Scissors'];
    let rounds = 1000;
    function br(cnt) { let best = 0, bv = -1e9; for (let a = 0; a < 3; a++) { let v = 0; for (let o = 0; o < 3; o++) { const pay = (a === (o + 1) % 3) ? 1 : (o === (a + 1) % 3) ? -1 : 0; v += cnt[o] * pay; } if (v > bv) { bv = v; best = a; } } return best; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const cA = [1, 0, 0], cB = [0, 1, 0], fA = [0, 0, 0];
      for (let t = 0; t < rounds; t++) { const a = br(cB), b = br(cA); cA[a]++; cB[b]++; fA[a]++; }
      const fr = fA.map(x => x / rounds);
      const yMax = 0.6, plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH, Y = v => baseY - (v / yMax) * plotH;
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.33, 0.6].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(2), padL - 4, yy + 3); });
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(padL, Y(1 / 3)); ctx.lineTo(W - padR, Y(1 / 3)); ctx.stroke(); ctx.setLineDash([]);
      const gap = plotW / 3, bw = gap * 0.5;
      fr.forEach((q, i) => { const x = padL + i * gap + (gap - bw) / 2; ctx.fillStyle = p.violet; ctx.fillRect(x, Y(q), bw, baseY - Y(q)); ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText(labels[i], x + bw / 2, baseY + 14); });
      const spread = Math.max.apply(null, fr) - Math.min.apply(null, fr);
      info.innerHTML = 'rounds = <b style="color:' + p.violet + '">' + rounds + '</b>. Frequencies ' + fr.map(q => q.toFixed(2)).join(", ") + '; spread from the Nash ⅓ line = <b style="color:' + p.gold + '">' + spread.toFixed(3) + '</b>. ' +
        (rounds >= 500 ? 'Converged onto (⅓, ⅓, ⅓) — Nash, found by learning alone.' : 'Still lopsided — give it more rounds.');
    }
    slider(ctl, { label: 'rounds', min: 10, max: 2000, step: 10, value: rounds, fmt: v => v.toFixed(0), onInput: v => { rounds = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Fictitious play in Rock-Paper-Scissors. Three bars give the empirical frequencies of Rock, Paper, and Scissors as a player best-responds to the opponent history, against a dashed one-third Nash reference. A rounds slider increases the number of plays; with few rounds the bars are uneven, and as rounds grow they converge onto the one-third line, the Nash mixed strategy.');
    draw();
  });


  /* ========================================================
     165. Phase portrait of x' = Ax: the matrix exponential as a flow (linear algebra)
     ======================================================== */
  register({ id: 'la-phase-portrait', topic: 'linear-algebra', title: 'Phase portrait: the matrix exponential as flow', blurb: 'For a 2D linear system x′ = Ax the solution is x(t) = e^{At}x(0) — and with eigenvalues α ± βi each trajectory is a logarithmic spiral: radius scales as e^{αt}, angle advances by βt. Drag α (the real part) through zero and watch stability flip: α < 0 spirals every path into the origin (stable), α = 0 gives closed orbits (a center), α > 0 spirals them outward (unstable). β just sets how fast they rotate. The eigenvalues’ real part literally is the fate of the system.' },
  function (root) {
    const W = 360, H = 360, pad = 10;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let alpha = -0.4, beta = 1.4;
    const cx = W / 2, cy = H / 2, R = (Math.min(W, H) / 2) - pad, scale = R / 1.05;
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(cx, pad); ctx.lineTo(cx, H - pad); ctx.moveTo(pad, cy); ctx.lineTo(W - pad, cy); ctx.stroke();
      const T = 18, dt = 0.06, r0 = 0.82;
      for (let k = 0; k < 8; k++) {
        const th0 = k / 8 * 2 * Math.PI;
        ctx.strokeStyle = 'rgba(160,140,210,0.7)'; ctx.beginPath(); let started = false;
        for (let t = 0; t <= T; t += dt) {
          const rr = Math.exp(alpha * t) * r0; if (rr > 1.05 || rr < 0.004) break;
          const ang = th0 + beta * t, x = rr * Math.cos(ang), y = rr * Math.sin(ang);
          const px = cx + x * scale, py = cy - y * scale;
          if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
        // start dot
        ctx.fillStyle = p.gold; ctx.beginPath(); ctx.arc(cx + r0 * Math.cos(th0) * scale, cy - r0 * Math.sin(th0) * scale, 2.5, 0, 2 * Math.PI); ctx.fill();
      }
      // origin
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 2 * Math.PI); ctx.fill();
      const kind = Math.abs(alpha) < 0.02 ? 'a <b>center</b> — closed orbits (marginally stable)' : (alpha < 0 ? '<b style="color:' + p.sage + '">stable</b> — every path spirals into the origin' : '<b style="color:' + p.gold + '">unstable</b> — paths spiral outward');
      info.innerHTML = 'eigenvalues = <b>' + alpha.toFixed(2) + ' ± ' + beta.toFixed(2) + 'i</b>. Real part ' + (alpha < 0 ? '&lt; 0' : alpha > 0 ? '&gt; 0' : '= 0') + ' → ' + kind + '. Radius grows as e<sup>αt</sup>; β sets the spin.';
    }
    slider(ctl, { label: 'α (real part)', min: -0.8, max: 0.8, step: 0.05, value: alpha, fmt: v => v.toFixed(2), onInput: v => { alpha = v; draw(); } });
    slider(controls(root), { label: 'β (rotation)', min: 0.2, max: 3, step: 0.1, value: beta, fmt: v => v.toFixed(1), onInput: v => { beta = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Phase portrait of a two-dimensional linear system x prime equals A x with eigenvalues alpha plus or minus beta i. Eight trajectories spiral from gold start dots. When alpha is negative they spiral inward to the origin (stable); at alpha zero they form closed loops (a center); when alpha is positive they spiral outward (unstable). The alpha slider is the real part controlling stability, beta the rotation rate.');
    draw();
  });


  /* ========================================================
     166. GMM soft responsibilities sharpening to a hard k-means step (machine learning)
     ======================================================== */
  register({ id: 'ml-gmm-responsibility', topic: 'machine-learning', title: 'GMM responsibilities: soft vs hard (k-means)', blurb: 'Two Gaussian clusters sit at −1.5 and +1.5. A Gaussian mixture model assigns each point x a soft responsibility — the posterior probability it belongs to the right cluster, r(x) = N_B / (N_A + N_B) — shown as the rising curve. Widen the components (σ) and the curve is a gentle ramp: points in the middle are genuinely shared. Shrink σ and the ramp steepens into a hard step at the midpoint — that limit is exactly k-means, which commits every point to its nearest center. "k-means is hard GMM," made visible.' },
  function (root) {
    const W = 480, H = 300, padL = 36, padR = 14, padT = 16, padB = 28;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let sigma = 1.2;
    const muA = -1.5, muB = 1.5, XLO = -5, XHI = 5;
    function Ngauss(x, mu, s) { return Math.exp(-((x - mu) * (x - mu)) / (2 * s * s)); }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const X = x => padL + (x - XLO) / (XHI - XLO) * plotW, Y = v => baseY - v * plotH;
      // grid: 0, .5, 1 for responsibility
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(1), padL - 4, yy + 3); });
      // density curves (scaled to 0.42 height), A=sage, B=violet
      [[muA, p.sage], [muB, p.violet]].forEach(([mu, col]) => { ctx.strokeStyle = col; ctx.globalAlpha = 0.55; ctx.beginPath(); for (let i = 0; i <= 240; i++) { const x = XLO + i / 240 * (XHI - XLO); const d = Ngauss(x, mu, sigma) * 0.42; i ? ctx.lineTo(X(x), Y(d)) : ctx.moveTo(X(x), Y(d)); } ctx.stroke(); ctx.globalAlpha = 1; });
      // responsibility curve r_B(x) = N_B/(N_A+N_B)
      ctx.strokeStyle = p.gold; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = XLO + i / 240 * (XHI - XLO); const a = Ngauss(x, muA, sigma), b = Ngauss(x, muB, sigma); const r = b / (a + b); i ? ctx.lineTo(X(x), Y(r)) : ctx.moveTo(X(x), Y(r)); }
      ctx.stroke(); ctx.lineWidth = 1;
      // slope of r at midpoint = sharpness; compare to hard step
      const eps = 0.01, r1 = (() => { const a = Ngauss(eps, muA, sigma), b = Ngauss(eps, muB, sigma); return b / (a + b); })();
      const r0 = 0.5, slope = (r1 - r0) / eps;
      ctx.fillStyle = p.mute; ctx.textAlign = 'center'; ctx.fillText('A (−1.5)', X(muA), baseY + 16); ctx.fillText('B (+1.5)', X(muB), baseY + 16);
      info.innerHTML = 'σ = <b style="color:' + p.gold + '">' + sigma.toFixed(2) + '</b>. Midpoint slope of the responsibility curve = <b>' + slope.toFixed(2) + '</b>. ' +
        (sigma < 0.6 ? 'Steep ramp → a near-hard step: this is <b>k-means</b>.' : 'Gentle ramp → genuinely <b>soft</b> memberships; middle points are shared.');
    }
    slider(ctl, { label: 'component width σ', min: 0.35, max: 2.5, step: 0.05, value: sigma, fmt: v => v.toFixed(2), onInput: v => { sigma = v; draw(); } });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Gaussian mixture responsibilities. Two Gaussian density curves sit at minus 1.5 and plus 1.5, and a gold curve shows the responsibility (posterior probability) of the right cluster, rising from 0 to 1. A width slider sigma controls overlap: large sigma gives a gentle ramp (soft, shared memberships), small sigma steepens it into a hard step at the midpoint, which is k-means.');
    draw();
  });


  /* ========================================================
     167. Periodogram: a hidden cycle, invisible in time, a clear peak in frequency (time series)
     ======================================================== */
  register({ id: 'ts-periodogram', topic: 'time-series', title: 'The periodogram: finding a hidden cycle', blurb: 'The top panel is a noisy series — a single sinusoid buried under random noise; good luck reading its period off the wiggle. The bottom panel is its periodogram, the squared magnitude of its Fourier transform: one sharp peak sits exactly at the hidden frequency. Drag the cycle count and watch the peak track it. This is why spectral analysis matters — periodicity that is invisible in the time domain is unmistakable in the frequency domain.' },
  function (root) {
    const W = 500, H = 330, padL = 34, padR = 12;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 120; let f0 = 7, seed = 42;
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const r = mk(seed); const x = [];
      for (let t = 0; t < N; t++) x.push(Math.sin(2 * Math.PI * f0 * t / N) + 0.8 * (r() + r() + r() + r() - 2));
      // periodogram k=1..N/2
      const P_ = []; let pk = 1, pv = -1;
      for (let k = 1; k <= N / 2; k++) { let re = 0, im = 0; for (let t = 0; t < N; t++) { re += x[t] * Math.cos(2 * Math.PI * k * t / N); im += x[t] * Math.sin(2 * Math.PI * k * t / N); } const pw = (re * re + im * im) / N; P_.push(pw); if (pw > pv) { pv = pw; pk = k; } }
      // top: time series
      const topH = 120, topY = 14, midX = padL, plotW = W - padL - padR;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, topY + topH / 2); ctx.lineTo(W - padR, topY + topH / 2); ctx.stroke();
      let xmax = 0; x.forEach(v => { if (Math.abs(v) > xmax) xmax = Math.abs(v); });
      ctx.strokeStyle = p.sage; ctx.beginPath(); for (let t = 0; t < N; t++) { const px = padL + t / (N - 1) * plotW, py = topY + topH / 2 - x[t] / xmax * (topH / 2 - 4); t ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
      ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'left'; ctx.fillText('time series (noisy)', padL, topY + 2);
      // bottom: periodogram
      const botY = topY + topH + 28, botH = H - botY - 24;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, botY + botH); ctx.lineTo(W - padR, botY + botH); ctx.stroke();
      const bw = plotW / P_.length;
      P_.forEach((pw, idx) => { const k = idx + 1; const h = pw / pv * (botH - 4); const px = padL + idx / (P_.length - 1) * plotW; ctx.strokeStyle = (k === pk) ? p.gold : 'rgba(160,140,210,0.6)'; ctx.lineWidth = (k === pk) ? 2.5 : 1.5; ctx.beginPath(); ctx.moveTo(px, botY + botH); ctx.lineTo(px, botY + botH - h); ctx.stroke(); });
      ctx.lineWidth = 1; ctx.fillStyle = p.mute; ctx.fillText('periodogram (power vs frequency)', padL, botY - 4);
      info.innerHTML = 'hidden cycle = <b style="color:' + p.sage + '">' + f0 + '</b> cycles over the window. Periodogram peak at <b style="color:' + p.gold + '">' + pk + '</b> — ' +
        (pk === f0 ? 'spot on, dug straight out of the noise.' : 'near the true frequency (noise jitter).');
    }
    slider(ctl, { label: 'hidden cycles', min: 3, max: 18, step: 1, value: f0, fmt: v => v.toFixed(0), onInput: v => { f0 = v; draw(); } });
    button(controls(root), '🎲 New noise', () => { seed = (seed * 16807 + 7) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A periodogram demo. The top panel shows a noisy time series containing one hidden sinusoid. The bottom panel shows its periodogram, power versus frequency, with a single tall gold peak at the hidden cycle frequency. A slider sets the number of hidden cycles and the peak tracks it, illustrating that periodicity invisible in the time domain is clear in the frequency domain.');
    draw();
  });


  /* ========================================================
     168. SGD noise ball: constant vs decaying learning rate (calculus)
     ======================================================== */
  register({ id: 'c-sgd-noise-ball', topic: 'calculus', title: 'SGD: constant vs decaying step size', blurb: 'Minimize f(x)=½x² with noisy gradients (each step sees the true gradient plus random noise — one minibatch’s worth). Two runs from the same start: a constant step size and a decaying one (aₜ = a₀/t). On the log-scale distance-to-optimum plot, the constant rate plunges then flattens onto a noise floor — it rattles forever inside a ball whose radius grows with the step size. The decaying rate keeps descending past it. That is the Robbins-Monro condition Σaₜ²<∞ made visible: only a shrinking step lets the noise average out.' },
  function (root) {
    const W = 500, H = 300, padL = 44, padR = 14, padT = 16, padB = 30;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    let lr = 0.12, seed = 7;
    const T = 500, noise = 1.4, LO = -3, HI = 0.6; // log10 range
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function gauss(r) { return r() + r() + r() + r() - 2; }
    function trajectory(decay) {
      const r = mk(seed + (decay ? 999 : 0)); let x = 2.0; const out = [];
      for (let t = 1; t <= T; t++) { const a = decay ? (0.9 / t) : lr; x = x - a * (x + noise * gauss(r)); out.push(Math.abs(x) + 1e-9); }
      return out;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const X = t => padL + t / T * plotW, Y = v => { const l = Math.log(Math.max(v, 1e-9)) / Math.LN10; return baseY - (l - LO) / (HI - LO) * plotH; };
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [-3, -2, -1, 0].forEach(e => { const yy = Y(Math.pow(10, e)); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText('1e' + e, padL - 4, yy + 3); });
      const cT = trajectory(false), dT = trajectory(true);
      function plot(arr, col) { ctx.strokeStyle = col; ctx.beginPath(); for (let t = 1; t <= T; t++) { const px = X(t), py = Y(arr[t - 1]); t === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); }
      plot(cT, p.gold); plot(dT, p.sage);
      ctx.textAlign = 'left'; ctx.fillStyle = p.gold; ctx.fillText('constant a = ' + lr.toFixed(2), padL + 6, padT + 10); ctx.fillStyle = p.sage; ctx.fillText('decaying a = 0.9/t', padL + 6, padT + 24);
      const cf = cT.slice(-30).reduce((a, b) => a + b, 0) / 30, df = dT.slice(-30).reduce((a, b) => a + b, 0) / 30;
      info.innerHTML = 'final distance (avg last 30): constant <b style="color:' + p.gold + '">' + cf.toFixed(3) + '</b> vs decaying <b style="color:' + p.sage + '">' + df.toFixed(3) + '</b>. ' +
        'The constant step plateaus on a noise floor ≈ its step size; the decaying step keeps converging.';
    }
    slider(ctl, { label: 'constant step a', min: 0.02, max: 0.25, step: 0.01, value: lr, fmt: v => v.toFixed(2), onInput: v => { lr = v; draw(); } });
    button(controls(root), '🎲 New noise', () => { seed = (seed * 16807 + 3) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Stochastic gradient descent on a noisy quadratic, distance to the optimum on a logarithmic axis versus iteration. The gold curve uses a constant step size: it drops then flattens onto a noise floor proportional to the step. The sage curve uses a decaying step a-zero over t: it keeps descending below the floor. A slider sets the constant step size, raising or lowering its plateau.');
    draw();
  });


  /* ========================================================
     169. James-Stein shrinkage: error is lowest at an interior shrinkage (probability & statistics)
     ======================================================== */
  register({ id: 'ps-shrinkage', topic: 'probability-statistics', title: 'Shrinkage: why pulling toward the mean wins', blurb: 'Twelve noisy estimates of twelve true values. Shrink each toward the global mean by a factor λ — λ=0 keeps the raw estimates, λ=1 collapses everything to the mean. The curve is the total squared error vs λ, and its minimum sits strictly between 0 and 1: a little shrinkage beats both the raw estimates and full pooling. That dip below the λ=0 line is the James-Stein effect — borrowing strength across estimates lowers error even though it adds bias.' },
  function (root) {
    const W = 500, H = 300, padL = 48, padR = 16, padT = 18, padB = 34;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 12; let lam = 0.4, seed = 11;
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function build() {
      const r = mk(seed); const theta = [], x = [];
      for (let i = 0; i < N; i++) { const th = 2 * Math.sin(i); theta.push(th); x.push(th + 1.9 * (r() + r() + r() + r() - 2)); }
      const xbar = x.reduce((a, b) => a + b, 0) / N;
      const mse = L => { let s = 0; for (let i = 0; i < N; i++) { const e = (1 - L) * x[i] + L * xbar - theta[i]; s += e * e; } return s / N; };
      return mse;
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const mse = build();
      const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
      const ys = []; for (let k = 0; k <= 100; k++) ys.push(mse(k / 100));
      const ymax = Math.max.apply(null, ys) * 1.05, ymin = 0;
      const X = L => padL + L * plotW, Y = v => baseY - (v - ymin) / (ymax - ymin) * plotH;
      // axes
      ctx.strokeStyle = p.line; ctx.fillStyle = p.mute; ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'right';
      [0, ymax / 2, ymax].forEach(v => { const yy = Y(v); ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(W - padR, yy); ctx.stroke(); ctx.fillText(v.toFixed(1), padL - 4, yy + 3); });
      ctx.textAlign = 'center'; [0, 0.5, 1].forEach(v => ctx.fillText('λ=' + v, X(v), baseY + 14));
      // raw (lam=0) reference line
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(padL, Y(mse(0))); ctx.lineTo(W - padR, Y(mse(0))); ctx.stroke(); ctx.setLineDash([]);
      // MSE curve
      ctx.strokeStyle = p.violet; ctx.lineWidth = 2.5; ctx.beginPath(); ys.forEach((v, k) => { const px = X(k / 100), py = Y(v); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); ctx.lineWidth = 1;
      // optimum
      let best = 0, bv = 1e9; for (let k = 0; k <= 100; k++) { if (ys[k] < bv) { bv = ys[k]; best = k / 100; } }
      ctx.fillStyle = p.sage; ctx.beginPath(); ctx.arc(X(best), Y(bv), 4, 0, 2 * Math.PI); ctx.fill();
      // slider marker
      ctx.fillStyle = p.ink; ctx.beginPath(); ctx.arc(X(lam), Y(mse(lam)), 4.5, 0, 2 * Math.PI); ctx.fill();
      info.innerHTML = 'shrink λ = <b style="color:' + p.ink + '">' + lam.toFixed(2) + '</b> → error <b>' + mse(lam).toFixed(3) + '</b> vs raw (λ=0) <b style="color:' + p.gold + '">' + mse(0).toFixed(3) + '</b>. ' +
        'Minimum error at λ* = <b style="color:' + p.sage + '">' + best.toFixed(2) + '</b> — shrinkage beats the raw estimates.';
    }
    slider(ctl, { label: 'shrinkage λ', min: 0, max: 1, step: 0.02, value: lam, fmt: v => v.toFixed(2), onInput: v => { lam = v; draw(); } });
    button(controls(root), '🎲 New noise', () => { seed = (seed * 16807 + 5) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'James-Stein shrinkage. The curve plots total squared error against the shrinkage factor lambda from 0 to 1, with a dashed gold line at the raw lambda-equals-0 error. The curve dips below that line to a minimum at an interior lambda (sage dot) before rising again, showing that some shrinkage toward the mean lowers error. A slider moves a marker along the curve; a reseed button redraws the noise.');
    draw();
  });


  /* ========================================================
     170. CUSUM change-point detection: the statistic ramps after a mean shift (time series)
     ======================================================== */
  register({ id: 'ts-cusum', topic: 'time-series', title: 'CUSUM: catching a shift in the mean', blurb: 'The top panel is a series whose mean jumps partway through (dashed line = the true change). The bottom panel is the CUSUM statistic S = max(0, S + x − k): it hugs zero while the mean is steady, then ramps up once the shift begins, and trips an alarm (dot) when it crosses the threshold h. Raise h and the alarm comes later but false alarms get rarer — the detection-delay vs false-alarm trade in one slider.' },
  function (root) {
    const W = 500, H = 320, padL = 40, padR = 14, midGap = 26;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 120, cp = 70, shift = 1.6, k = 0.5; let h = 4, seed = 7;
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    function build() {
      const r = mk(seed); const x = [];
      for (let i = 0; i < N; i++) { const mean = (i >= cp) ? shift : 0; x.push(mean + (r() + r() + r() + r() - 2)); }
      const S = []; let s = 0, det = -1, fa = 0;
      for (let i = 0; i < N; i++) { s = Math.max(0, s + (x[i] - k)); S.push(s); if (s > h) { if (i < cp) { fa++; } else if (det < 0) { det = i; } } }
      return { x, S, det, fa };
    }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const d = build();
      const topY = 12, topH = (H - midGap - 24) / 2, botY = topY + topH + midGap, botH = topH;
      const X = i => padL + i / (N - 1) * (W - padL - padR);
      ctx.font = '10px ' + (cssVar('--font-mono') || 'monospace');
      // ---- top: series ----
      const xmin = -2.5, xmax = shift + 2.5, TY = v => topY + topH - (v - xmin) / (xmax - xmin) * topH;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, TY(0)); ctx.lineTo(W - padR, TY(0)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'right'; ctx.fillText('series', W - padR, topY + 9);
      // true change-point
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(cp), topY); ctx.lineTo(X(cp), topY + topH); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.violet; ctx.lineWidth = 1.4; ctx.beginPath(); d.x.forEach((v, i) => { const px = X(i), py = TY(v); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); ctx.lineWidth = 1;
      // ---- bottom: CUSUM ----
      const smax = Math.max(h * 1.5, Math.max.apply(null, d.S) * 1.05), BY = v => botY + botH - v / smax * botH;
      ctx.strokeStyle = p.line; ctx.beginPath(); ctx.moveTo(padL, BY(0)); ctx.lineTo(W - padR, BY(0)); ctx.stroke();
      ctx.fillStyle = p.mute; ctx.textAlign = 'right'; ctx.fillText('CUSUM S', W - padR, botY + 9);
      // threshold
      ctx.strokeStyle = p.rose || p.gold; ctx.setLineDash([5, 3]); ctx.beginPath(); ctx.moveTo(padL, BY(h)); ctx.lineTo(W - padR, BY(h)); ctx.stroke(); ctx.setLineDash([]);
      ctx.textAlign = 'left'; ctx.fillStyle = p.rose || p.gold; ctx.fillText('h = ' + h.toFixed(1), padL + 2, BY(h) - 3);
      ctx.strokeStyle = p.gold; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(cp), botY); ctx.lineTo(X(cp), botY + botH); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = p.sage; ctx.lineWidth = 1.8; ctx.beginPath(); d.S.forEach((v, i) => { const px = X(i), py = BY(v); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); ctx.lineWidth = 1;
      // detection marker
      if (d.det >= 0) { ctx.fillStyle = p.ink; ctx.beginPath(); ctx.arc(X(d.det), BY(d.S[d.det]), 4.5, 0, 2 * Math.PI); ctx.fill(); }
      info.innerHTML = 'threshold h = <b style="color:' + (p.rose || p.gold) + '">' + h.toFixed(1) + '</b> → ' +
        (d.det >= 0 ? 'alarm at t=' + d.det + ', <b>delay ' + (d.det - cp) + '</b> after the true change (t=' + cp + ')' : '<b>no alarm</b>') +
        '; false alarms before the change: <b>' + d.fa + '</b>.';
    }
    slider(ctl, { label: 'threshold h', min: 1, max: 12, step: 0.5, value: h, fmt: v => v.toFixed(1), onInput: v => { h = v; draw(); } });
    button(controls(root), '🎲 New noise', () => { seed = (seed * 16807 + 11) & 0x7fffffff; draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'CUSUM change-point detection. Top panel: a noisy series whose mean jumps upward at a dashed gold line (the true change-point). Bottom panel: the CUSUM statistic stays near zero before the change, then ramps upward and crosses a dashed threshold line h, where an alarm dot marks detection shortly after the true change. A slider raises or lowers h, trading detection delay against false alarms; a reseed button redraws the noise.');
    draw();
  });


  /* ========================================================
     171. Consistent hashing ring: adding a server remaps only its arc (algorithms)
     ======================================================== */
  register({ id: 'a-consistent-hashing', topic: 'algorithms', title: 'The consistent-hashing ring', blurb: 'Servers (big ticks) and keys (dots) hash onto a ring; each key belongs to the next server clockwise, shown by colour. Add a server and only the keys on its new arc change hands — the readout counts them, and they flash white. That "~K/N move, not all K" is the whole point: membership changes stay cheap.' },
  function (root) {
    const W = 460, H = 460;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const TAU = Math.PI * 2, K = 240;
    const PAL = ['#a78bfa', '#86c993', '#e3b341', '#e07a8a', '#cc7a52', '#5fb3c4', '#c084d8', '#9aa0a6'];
    let seed = 5;
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    let rnd = mk(seed);
    let keys = [], servers = [], owners = [], justMoved = new Set();
    function ownerOf(a) { let best = -1, bd = 1e9; for (let i = 0; i < servers.length; i++) { const d = (servers[i] - a + TAU) % TAU; if (d < bd) { bd = d; best = i; } } return best < 0 ? -1 : servers[best]; }
    function recompute(markMoves) {
      const before = owners;
      owners = keys.map(a => ownerOf(a));
      justMoved = new Set();
      if (markMoves && before.length === owners.length) for (let i = 0; i < owners.length; i++) if (before[i] !== owners[i]) justMoved.add(i);
    }
    function colorFor(srvAngle) { const sorted = servers.slice().sort((x, y) => x - y); const idx = sorted.indexOf(srvAngle); return PAL[((idx % PAL.length) + PAL.length) % PAL.length]; }
    function reset() { rnd = mk(seed); keys = []; for (let i = 0; i < K; i++) keys.push(rnd() * TAU); servers = []; for (let i = 0; i < 4; i++) servers.push(rnd() * TAU); recompute(false); }
    function draw(msg) {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2 - 6, R = 150;
      ctx.strokeStyle = p.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.lineWidth = 1;
      // keys
      keys.forEach((a, i) => {
        const x = cx + (R - 14) * Math.cos(a), y = cy + (R - 14) * Math.sin(a);
        ctx.fillStyle = colorFor(owners[i]);
        ctx.beginPath(); ctx.arc(x, y, justMoved.has(i) ? 4.5 : 2.6, 0, TAU); ctx.fill();
        if (justMoved.has(i)) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.lineWidth = 1; }
      });
      // servers
      servers.forEach(a => {
        const x1 = cx + (R - 4) * Math.cos(a), y1 = cy + (R - 4) * Math.sin(a), x2 = cx + (R + 16) * Math.cos(a), y2 = cy + (R + 16) * Math.sin(a);
        ctx.strokeStyle = colorFor(a); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.lineWidth = 1;
      });
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText(servers.length + ' servers · ' + K + ' keys', cx, cy + 4);
      info.innerHTML = msg || ('Each of the <b>' + K + '</b> keys is owned by the next server clockwise. Add or remove a server to see how few keys move.');
    }
    function addServer() { if (servers.length >= 8) { draw('At the 8-colour limit for this demo — remove one first.'); return; } servers.push(rnd() * TAU); recompute(true); draw('Added a server → <b style="color:#fff">' + justMoved.size + '</b> of ' + K + ' keys moved (' + Math.round(100 * justMoved.size / K) + '% ≈ 1/' + servers.length + '). The rest never budged.'); }
    function removeServer() { if (servers.length <= 1) { draw('Need at least one server.'); return; } servers.pop(); recompute(true); draw('Removed a server → <b style="color:#fff">' + justMoved.size + '</b> of ' + K + ' keys moved to the next server clockwise. Only its arc was affected.'); }
    button(ctl, '+ Add server', addServer);
    button(ctl, '− Remove server', removeServer);
    button(controls(root), '🎲 Reseed', () => { seed = (seed * 16807 + 7) & 0x7fffffff; reset(); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'A consistent-hashing ring. Servers are coloured ticks around a circle and keys are dots just inside it, each dot coloured to match the next server clockwise that owns it. Buttons add or remove a server; when you do, only the keys on the affected arc change colour and flash white, and the caption reports how few of the 240 keys moved — roughly one over the number of servers — illustrating that membership changes are cheap.');
    reset(); draw();
  });


  /* ========================================================
     172. Rectified flow: straight-line transport from noise to data (deep learning)
     ======================================================== */
  register({ id: 'dl-rectified-flow', topic: 'deep-learning', title: 'Rectified flow: noise → data on straight lines', blurb: 'Flow matching learns a velocity field that carries noise to data; rectified flow uses straight paths x(t) = (1−t)·x₀ + t·x₁. Drag t: the violet noise cloud slides along its (faint) straight trajectories and lands as the sage data ring at t = 1. Because every trajectory is a straight line, a sampler can jump far along it in one step — that is why rectified-flow models need so few sampling steps.' },
  function (root) {
    const W = 460, H = 380;
    const { c, ctx } = canvas(root, W, H);
    const ctl = controls(root);
    const info = note(root);
    const N = 150; let t = 0.35, seed = 9;
    function mk(s) { return function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
    let noisePts = [], dataPts = [];
    function build() {
      const r = mk(seed); noisePts = []; dataPts = [];
      const cx = W / 2, cy = H / 2 - 6;
      for (let i = 0; i < N; i++) {
        const gx = (r() + r() + r() + r() - 2) * 38, gy = (r() + r() + r() + r() - 2) * 38;
        noisePts.push([cx + gx, cy + gy]);
        const th = r() * Math.PI * 2, rad = 128 + (r() + r() - 1) * 14;
        dataPts.push([cx + rad * Math.cos(th), cy + rad * Math.sin(th) * 0.82]);
      }
      // random pairing: shuffle data indices
      for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const tmp = dataPts[i]; dataPts[i] = dataPts[j]; dataPts[j] = tmp; }
    }
    function lerp(a, b, u) { return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; }
    function draw() {
      const p = P(); ctx.clearRect(0, 0, W, H); ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
      // faint straight trajectories for a subset
      ctx.strokeStyle = p.line; ctx.globalAlpha = 0.5;
      for (let i = 0; i < N; i += 5) { ctx.beginPath(); ctx.moveTo(noisePts[i][0], noisePts[i][1]); ctx.lineTo(dataPts[i][0], dataPts[i][1]); ctx.stroke(); }
      ctx.globalAlpha = 1;
      // ghost endpoints
      ctx.fillStyle = p.violet; ctx.globalAlpha = 0.25;
      noisePts.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 2, 0, 2 * Math.PI); ctx.fill(); });
      ctx.fillStyle = p.sage;
      dataPts.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 2, 0, 2 * Math.PI); ctx.fill(); });
      ctx.globalAlpha = 1;
      // moving points, colour interpolates violet -> sage
      const mix = t;
      for (let i = 0; i < N; i++) {
        const q = lerp(noisePts[i], dataPts[i], t);
        ctx.fillStyle = mix < 0.5 ? p.violet : p.sage;
        ctx.beginPath(); ctx.arc(q[0], q[1], 3.1, 0, 2 * Math.PI); ctx.fill();
      }
      ctx.fillStyle = p.mute; ctx.font = '11px ' + (cssVar('--font-mono') || 'monospace'); ctx.textAlign = 'center';
      ctx.fillText('t = ' + t.toFixed(2) + '   ·   x(t) = (1−t)·x₀ + t·x₁', W / 2, H - 8);
      info.innerHTML = 't = <b>' + t.toFixed(2) + '</b> — each point sits at $(1-t)x_0 + t\\,x_1$ on its own straight line. The velocity a rectified-flow net regresses onto is the constant $x_1 - x_0$, so trajectories never curve — few (even one) sampler steps suffice.';
      if (window.typeset) window.typeset(info);
    }
    slider(ctl, { label: 'time t', min: 0, max: 1, step: 0.01, value: t, fmt: v => v.toFixed(2), onInput: v => { t = v; draw(); } });
    button(controls(root), '🎲 Reseed', () => { seed = (seed * 16807 + 3) & 0x7fffffff; build(); draw(); });
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', 'Rectified-flow transport. A violet Gaussian noise cloud in the centre and a sage data ring around it, joined by faint straight trajectory lines. A time slider moves every point along its straight line from noise at t equals 0 to the ring at t equals 1, the moving cloud recoloring from violet to sage; a reseed button redraws the random pairing.');
    build(); draw();
  });

})();
