/* ============================================================
   ATLAS — in-browser Code Playground
   Python via Pyodide (lazy-loaded from CDN, needs internet),
   JavaScript run natively. Embed in a lesson with:
     <div data-code="python" data-expected="...">starter code</div>
   ============================================================ */
(function () {
  "use strict";
  let pyodidePromise = null;

  function loadPyodide_() {
    if (pyodidePromise) return pyodidePromise;
    pyodidePromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
      s.onload = async () => { try { resolve(await window.loadPyodide()); } catch (e) { reject(e); } };
      s.onerror = () => reject(new Error("Couldn't load Pyodide (needs an internet connection)."));
      document.head.appendChild(s);
    });
    return pyodidePromise;
  }

  const SNIPPETS = {
    python: [
      { name: "Bubble sort", topic: "algorithms", code: "def bubble_sort(a):\n    a = a[:]\n    for i in range(len(a)):\n        for j in range(len(a) - 1 - i):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a\n\nprint(bubble_sort([5, 2, 9, 1, 7, 3]))" },
      { name: "Binary search", topic: "algorithms", code: "def binary_search(a, target):\n    lo, hi = 0, len(a) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == target:\n            return mid\n        elif a[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nprint(binary_search([1, 3, 5, 7, 9, 11], 7))  # -> 3" },
      { name: "Gradient descent", topic: "calculus", code: "# minimize f(x) = x**4/4 - x**2  (minima at +/- sqrt(2))\ndef f(x):  return x**4/4 - x**2\ndef df(x): return x**3 - 2*x\n\nx, lr = 1.9, 0.1\nfor step in range(20):\n    x -= lr * df(x)\nprint(f'x = {x:.4f},  f(x) = {f(x):.4f}')" },
      { name: "Matrix × vector (numpy)", topic: "linear-algebra", code: "import numpy as np\nA = np.array([[0, -1], [1, 0]])   # 90-degree rotation\nv = np.array([3, 0])\nprint('A @ v =', A @ v)\nprint('det A =', np.linalg.det(A))\nprint('eigenvalues:', np.linalg.eigvals([[2, 1], [1, 2]]))" },
      { name: "Tiny neural neuron", topic: "deep-learning", code: "import numpy as np\ndef relu(z): return np.maximum(0, z)\nw = np.array([2.0, -1.0]); b = 1.0\nx = np.array([3.0, 4.0])\nz = w @ x + b\nprint('pre-activation z =', z)\nprint('relu(z) =', relu(z))" }
    ],
    javascript: [
      { name: "Quicksort", topic: "algorithms", code: "function quicksort(a) {\n  if (a.length <= 1) return a;\n  const [p, ...rest] = a;\n  const lo = rest.filter(x => x < p);\n  const hi = rest.filter(x => x >= p);\n  return [...quicksort(lo), p, ...quicksort(hi)];\n}\nconsole.log(quicksort([5, 2, 9, 1, 7, 3]));" },
      { name: "Sigmoid", topic: "deep-learning", code: "const sigmoid = z => 1 / (1 + Math.exp(-z));\nfor (const z of [-2, -1, 0, 1, 2]) {\n  console.log(`sigmoid(${z}) = ${sigmoid(z).toFixed(4)}`);\n}" }
    ]
  };

  function mount(root, opts) {
    opts = opts || {};
    const lang0 = opts.lang || "python";
    root.classList.add("pg");
    root.innerHTML = `
      <div class="pg-bar">
        <select class="pg-lang" aria-label="Language">${["python", "javascript"].map(l => `<option value="${l}" ${l === lang0 ? "selected" : ""}>${l === "python" ? "🐍 Python" : "🟨 JavaScript"}</option>`).join("")}</select>
        <select class="pg-ex" aria-label="Example snippets"></select>
        <button class="viz-btn primary pg-run">▶ Run</button>
        <span class="pg-status" aria-live="polite"></span>
      </div>
      <textarea class="pg-code" spellcheck="false" aria-label="Code editor"></textarea>
      <div class="pg-out-wrap" role="status" aria-live="polite"><div class="pg-out-label">Output</div><pre class="pg-out"></pre></div>`;
    const langSel = root.querySelector(".pg-lang"), exSel = root.querySelector(".pg-ex");
    const ta = root.querySelector(".pg-code"), out = root.querySelector(".pg-out"), status = root.querySelector(".pg-status");

    function fillExamples() {
      const list = SNIPPETS[langSel.value] || [];
      exSel.innerHTML = `<option value="-1">— examples —</option>` + list.map((s, i) => `<option value="${i}">${s.name}</option>`).join("");
    }
    function setLang(l) { langSel.value = l; fillExamples(); ta.value = (SNIPPETS[l] && SNIPPETS[l][0] ? SNIPPETS[l][0].code : ""); exSel.value = "0"; out.textContent = ""; status.textContent = ""; }
    if (opts.code != null) { fillExamples(); ta.value = opts.code; } else setLang(lang0);

    langSel.addEventListener("change", () => setLang(langSel.value));
    exSel.addEventListener("change", () => { const i = parseInt(exSel.value, 10); const s = (SNIPPETS[langSel.value] || [])[i]; if (s) ta.value = s.code; });
    ta.addEventListener("keydown", e => { if (e.key === "Tab") { e.preventDefault(); const s = ta.selectionStart; ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 4; } });

    root.querySelector(".pg-run").addEventListener("click", () => run());
    async function run() {
      out.className = "pg-out"; out.textContent = "";
      if (langSel.value === "javascript") { runJS(); return; }
      status.textContent = "loading Python…";
      try {
        const py = await loadPyodide_();
        if (/\b(import|from)\s+numpy\b/.test(ta.value) || /\bnp\./.test(ta.value)) { status.textContent = "loading numpy…"; await py.loadPackage("numpy"); }
        status.textContent = "running…";
        py.runPython("import sys, io\n_buf = io.StringIO()\nsys.stdout = _buf\nsys.stderr = _buf");
        try {
          py.runPython(ta.value);
          out.textContent = py.runPython("_buf.getvalue()") || "(no output)";
          check(out.textContent);
        } catch (err) {
          out.className = "pg-out err";
          out.textContent = (py.runPython("_buf.getvalue()") || "") + String(err.message || err);
        }
        status.textContent = "";
      } catch (e) { out.className = "pg-out err"; out.textContent = String(e.message || e); status.textContent = ""; }
    }
    function runJS() {
      const logs = [], orig = console.log;
      console.log = (...a) => logs.push(a.map(x => typeof x === "object" ? JSON.stringify(x) : String(x)).join(" "));
      try { new Function(ta.value)(); out.textContent = logs.join("\n") || "(no output)"; check(out.textContent); }
      catch (e) { out.className = "pg-out err"; out.textContent = logs.concat("Error: " + e.message).join("\n"); }
      finally { console.log = orig; }
    }
    function check(text) {
      if (opts.expected == null) return;
      const ok = text.trim() === String(opts.expected).trim();
      const tag = document.createElement("div"); tag.className = "pg-check " + (ok ? "ok" : "no");
      tag.textContent = ok ? "✓ Output matches expected" : "✗ Doesn't match expected output yet";
      out.parentNode.appendChild(tag); setTimeout(() => tag.remove(), 4000);
      if (ok && typeof opts.onSolve === "function") { try { opts.onSolve(); } catch (e) {} }
    }
  }

  window.Playground = { mount, SNIPPETS };
})();
