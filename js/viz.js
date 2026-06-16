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
    const val = el('span', 'viz-sval', wrap);
    const upd = () => { val.textContent = o.fmt ? o.fmt(parseFloat(inp.value)) : inp.value; };
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

})();
