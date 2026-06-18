/* ============================================================
   ATLAS — Interactive Visualization Lab
   Self-contained canvas widgets. Register with VIZUtil.register.
   Embed in a lesson with: <div data-viz="ID"></div>
   App calls VIZ[id](container) to hydrate; VIZUtil.stopAll() on nav.
   ============================================================ */
(function () {
  "use strict";
  const VIZ = {}, CATALOG = [];
  function register(meta, fn) { VIZ[meta.id] = fn; CATALOG.push(meta); }

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
    c.style.width = w + 'px'; c.style.height = h + 'px';
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

})();
