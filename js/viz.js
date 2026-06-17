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

  window.VIZ = VIZ; window.VIZ_CATALOG = CATALOG;
  window.VIZUtil = { register, P, el, canvas, controls, slider, button, select, note, loop, stopAll, pointer, arrow };

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

})();
