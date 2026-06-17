/* Atlas course — Algorithms
   Generated & adversarially fact-checked + inline visualizations, worked examples & an expanded question bank. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "algorithms",
  "title": "Algorithms",
  "icon": "⊳",
  "color": "#9a8bc4",
  "blurb": "Complexity, data structures, and the problem-solving patterns behind efficient code.",
  "modules": [
    {
      "id": "a-foundations",
      "title": "Foundations: Analysis & Correctness",
      "lessons": [
        {
          "id": "a-asymptotic-analysis",
          "title": "Asymptotic Analysis: Big-O, Theta, Omega",
          "minutes": 16,
          "content": "<h3>Why we measure algorithms with a magnifying glass turned backwards</h3>\n<p>Suppose you write two functions that sort a list, and you want to know which is \"better.\" You could time them on your laptop. But that measurement is contaminated by everything that has nothing to do with the algorithm: your CPU clock speed, what else was running, the language, the compiler's mood, whether the data happened to be cache-friendly. Run the same code on a phone versus a server and the numbers flip. We need a way to talk about an algorithm's cost that survives all of these accidents.</p>\n<p>The trick is to ignore the constants and focus on <strong>how the cost grows as the input grows</strong>. If algorithm A does roughly $n^2$ operations and algorithm B does roughly $100\\,n$, then B is slower for tiny inputs but for any $n > 100$, B wins — and the gap widens without bound. <strong>Asymptotic analysis</strong> is the mathematics of \"what happens for large $n$,\" deliberately blind to constant factors and small inputs. That blindness is a feature: it isolates the property of the algorithm that you cannot fix by buying a faster machine.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Big-O is not \"how long does it take.\" It is \"how does the work scale.\" Doubling the input might double the work ($n$), quadruple it ($n^2$), or barely change it ($\\log n$). That scaling law is what we name, and it is invariant under the messiness of real hardware.</p>\n</div>\n\n<h3>The three growth bounds, formally</h3>\n<p>Let $f(n)$ be the cost of your algorithm (a count of basic operations) and let $g(n)$ be a clean reference function like $n^2$ or $n \\log n$. All three of the classic notations are statements about the <em>ratio</em> $f(n)/g(n)$ for large $n$, made precise with two quantifiers: a constant $c$ and a threshold $n_0$.</p>\n\n<h4>Big-O: an upper bound (grows no faster than)</h4>\n<p>$f(n) = O(g(n))$ means $f$ is eventually bounded above by a constant multiple of $g$:</p>\n$$O(g(n)) = \\{\\, f(n) : \\exists\\, c > 0,\\ \\exists\\, n_0 > 0 \\ \\text{such that}\\ 0 \\le f(n) \\le c\\,g(n)\\ \\text{for all}\\ n \\ge n_0 \\,\\}$$\n<p>Read it aloud: <em>there exist</em> a constant $c$ and a starting point $n_0$ <em>such that</em> for every input size at least $n_0$, the cost $f(n)$ never exceeds $c \\cdot g(n)$. The two escape hatches — you get to pick $c$, and you only have to win past $n_0$ — are exactly what let us discard constant factors and small-$n$ noise.</p>\n\n<h4>Big-Omega: a lower bound (grows no slower than)</h4>\n$$\\Omega(g(n)) = \\{\\, f(n) : \\exists\\, c > 0,\\ \\exists\\, n_0 > 0 \\ \\text{such that}\\ 0 \\le c\\,g(n) \\le f(n)\\ \\text{for all}\\ n \\ge n_0 \\,\\}$$\n<p>Same shape, inequality flipped: $f$ is eventually <em>at least</em> a constant multiple of $g$. Omega is how you say \"this problem is fundamentally hard\" — e.g., any comparison sort is $\\Omega(n \\log n)$, no cleverness can beat it.</p>\n\n<h4>Big-Theta: a tight bound (grows exactly like)</h4>\n$$\\Theta(g(n)) = \\{\\, f(n) : \\exists\\, c_1, c_2 > 0,\\ \\exists\\, n_0 > 0 \\ \\text{such that}\\ 0 \\le c_1\\,g(n) \\le f(n) \\le c_2\\,g(n)\\ \\text{for all}\\ n \\ge n_0 \\,\\}$$\n<p>Theta sandwiches $f$ between two constant multiples of $g$. It is the strongest and most honest statement, and the cleanest theorem ties it to the other two:</p>\n$$f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\ \\text{and}\\ f(n) = \\Omega(g(n)).$$\n<p>When we say merge sort \"is $\\Theta(n \\log n)$,\" we mean its running time is squeezed from both sides by $n \\log n$ — that is the precise, tight characterization.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Notation hygiene</div>\n<p>The \"$=$\" in $f(n) = O(g(n))$ is an abuse of notation — $O(g(n))$ is a <em>set</em>, so $f(n) \\in O(g(n))$ would be cleaner, and equality here is not symmetric ($n = O(n^2)$ but $n^2 \\ne O(n)$). Almost everyone writes \"$=$\" anyway; just remember it means \"belongs to / is bounded by,\" never genuine equality. Also: people routinely <em>misuse</em> Big-O to mean a tight bound. Saying binary search is $O(\\log n)$ is true but weak — it is also $O(n)$ and $O(2^n)$. The tight, informative claim is $\\Theta(\\log n)$.</p>\n</div>\n\n<h3>The little-o and little-omega: strict separation</h3>\n<p>Big-O allows $f$ and $g$ to grow at the same rate (the bound can be tight). The <strong>little-o</strong> notation insists $g$ grows <em>strictly faster</em> — the ratio vanishes:</p>\n$$f(n) = o(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0.$$\n<p>Equivalently with quantifiers: <em>for every</em> $c > 0$ there exists $n_0$ such that $0 \\le f(n) < c\\,g(n)$ for all $n \\ge n_0$. Notice the quantifier flip — in Big-O <em>some</em> $c$ works; in little-o <em>every</em> $c$ works, no matter how small. So $2n^2 = O(n^2)$ but $2n^2 \\neq o(n^2)$, while $2n^2 = o(n^3)$.</p>\n<p>Symmetrically, <strong>little-omega</strong> means $f$ grows strictly faster than $g$:</p>\n$$f(n) = \\omega(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty.$$\n<p>A useful mental map borrowing the analogy to real-number comparison:</p>\n<ul>\n<li>$f = O(g)$ is like $f \\le g$ (up to constants).</li>\n<li>$f = \\Omega(g)$ is like $f \\ge g$.</li>\n<li>$f = \\Theta(g)$ is like $f = g$.</li>\n<li>$f = o(g)$ is like $f < g$ (strictly).</li>\n<li>$f = \\omega(g)$ is like $f > g$ (strictly).</li>\n</ul>\n<p>The analogy is not perfect (some functions are simply <em>incomparable</em>, e.g. $n^{1+\\sin n}$ vs $n$), but it captures the spirit.</p>\n\n<h3>Worst, average, and best case — a separate axis</h3>\n<p>A subtle and frequently muddled point: <strong>worst/average/best case</strong> and <strong>O/Theta/Omega</strong> are <em>orthogonal</em> ideas, and conflating them causes endless confusion.</p>\n<ul>\n<li><strong>Best / average / worst case</strong> answers: <em>which input</em> of size $n$ are we measuring? Best case = the luckiest input, worst case = the most adversarial input, average case = expected cost over some input distribution.</li>\n<li><strong>O / Theta / Omega</strong> answers: <em>what kind of bound</em> are we putting on that chosen quantity?</li>\n</ul>\n<p>You can combine them freely. Consider linear search for a target in an unsorted array of length $n$:</p>\n<ul>\n<li><strong>Best case</strong> (target is first): $\\Theta(1)$.</li>\n<li><strong>Worst case</strong> (target absent, or last): $\\Theta(n)$.</li>\n<li><strong>Average case</strong> (target uniformly at random among present): $\\Theta(n)$ — on average $n/2$ comparisons, and $n/2 = \\Theta(n)$.</li>\n</ul>\n<p>So it is perfectly coherent — and precise — to say \"linear search runs in $\\Theta(n)$ in the worst case.\" The common shorthand \"linear search is $O(n)$\" silently means \"worst-case running time is $O(n)$.\" When unstated, <strong>worst case is the default</strong> because it gives a guarantee that holds for <em>all</em> inputs.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Why a single function can't capture cost</div>\n<p>For some algorithms the cases genuinely diverge. Quicksort is $\\Theta(n \\log n)$ on average but $\\Theta(n^2)$ in the worst case (already-sorted input with a naive pivot). That is why people say \"quicksort is fast in practice\" — the average case dominates real usage even though the worst case is bad. You cannot describe quicksort with one Theta over all inputs; you must specify the case first.</p>\n</div>\n\n<h3>The ranking of common growth classes</h3>\n<p>Here is the hierarchy you will use constantly, from slowest-growing (best) to fastest-growing (worst). For large $n$, each is $o(\\,$the next$\\,)$:</p>\n$$1 \\;\\prec\\; \\log n \\;\\prec\\; \\sqrt{n} \\;\\prec\\; n \\;\\prec\\; n \\log n \\;\\prec\\; n^2 \\;\\prec\\; n^3 \\;\\prec\\; 2^n \\;\\prec\\; n! \\;\\prec\\; n^n$$\n<p>where $a \\prec b$ means $a = o(b)$. A few rules generate almost all comparisons you will ever need:</p>\n<ul>\n<li><strong>Any positive power of $n$ beats any power of a log.</strong> Formally $(\\log n)^k = o(n^\\epsilon)$ for any constants $k > 0$ and $\\epsilon > 0$. So $\\log^{100} n$ still loses to $n^{0.01}$ eventually.</li>\n<li><strong>Polynomials are ranked by exponent.</strong> $n^a = o(n^b)$ whenever $a < b$. And $n^a = \\Theta(n^a)$ regardless of leading constant.</li>\n<li><strong>Any exponential beats any polynomial.</strong> $n^k = o(c^n)$ for any constants $k$ and any $c > 1$. This is the cliff between \"tractable\" and \"intractable.\"</li>\n<li><strong>Factorial beats every fixed exponential.</strong> $c^n = o(n!)$ for any constant $c$ (since $n!$ multiplies by an ever-growing factor $n$, while $c^n$ multiplies by the fixed $c$). And $n! = o(n^n)$.</li>\n<li><strong>The base of a log is irrelevant.</strong> $\\log_2 n = \\frac{\\log_{10} n}{\\log_{10} 2}$, a constant multiple — so $\\log_a n = \\Theta(\\log_b n)$. We write $\\log n$ with no base inside O-notation.</li>\n</ul>\n<p>To feel the difference: at $n = 50$, $\\log_2 n \\approx 5.6$, $n = 50$, $n^2 = 2500$, but $2^{50} \\approx 10^{15}$ and $50! \\approx 3 \\times 10^{64}$ — vastly more than the estimated number of stars in the observable universe (about $10^{24}$). An $O(2^n)$ algorithm is not \"slow\"; for $n=100$ it is \"will not finish before the heat death of the universe.\"</p>\n\n<h3>How to read code and extract a tight $\\Theta$ bound</h3>\n<p>The mechanical recipe: count how the number of basic operations depends on $n$, then drop constants and lower-order terms.</p>\n<ol>\n<li><strong>Straight-line code</strong> (no loops over the input): $\\Theta(1)$.</li>\n<li><strong>A loop running $\\Theta(n)$ times with $\\Theta(1)$ body</strong>: $\\Theta(n)$.</li>\n<li><strong>Nested loops</strong>: multiply. Two independent loops each to $n$ give $\\Theta(n^2)$.</li>\n<li><strong>Halving each step</strong> (<code>i = i / 2</code> or binary search): $\\Theta(\\log n)$, because you can halve $n$ only about $\\log_2 n$ times before reaching 1.</li>\n<li><strong>Sequential blocks add</strong>; the larger term dominates: $\\Theta(n) + \\Theta(n^2) = \\Theta(n^2)$.</li>\n</ol>\n<p>Watch out for loops whose <em>bounds depend on the outer variable</em> — they don't simply multiply by $n$. Here is a fully worked example.</p>\n\n<h4>Worked example: the triangular nested loop</h4>\n<pre><code>def count_pairs(a):        # a has length n\n    total = 0\n    for i in range(len(a)):          # i = 0 .. n-1\n        for j in range(i + 1, len(a)):   # j = i+1 .. n-1\n            if a[i] + a[j] == 0:\n                total += 1\n    return total</code></pre>\n<p>The inner body is $\\Theta(1)$. The question is how many times it runs. For a fixed $i$, the inner loop runs $n - 1 - i$ times. Summing over $i$ from $0$ to $n-1$:</p>\n$$T(n) = \\sum_{i=0}^{n-1} (n - 1 - i) = (n-1) + (n-2) + \\cdots + 1 + 0 = \\frac{n(n-1)}{2}.$$\n<p>Now simplify. Expand: $\\frac{n(n-1)}{2} = \\frac{1}{2}n^2 - \\frac{1}{2}n$. Drop the constant factor $\\frac{1}{2}$ and the lower-order term $-\\frac{1}{2}n$ (it is $o(n^2)$), leaving $\\Theta(n^2)$. To confirm it really is tight rather than just an upper bound, check both sides for some valid constants and $n_0$:</p>\n<ul>\n<li><strong>Upper ($O$):</strong> $\\frac{1}{2}n^2 - \\frac{1}{2}n \\le \\frac{1}{2}n^2$, so $c_2 = \\frac{1}{2}$ works for all $n \\ge 1$.</li>\n<li><strong>Lower ($\\Omega$):</strong> for $n \\ge 2$, $\\frac{1}{2}n^2 - \\frac{1}{2}n \\ge \\frac{1}{4}n^2$ (since $\\frac{1}{2}n \\le \\frac{1}{4}n^2$ once $n \\ge 2$), so $c_1 = \\frac{1}{4}$, $n_0 = 2$.</li>\n</ul>\n<p>Both bounds hold with the same $g(n) = n^2$, so $T(n) = \\Theta(n^2)$. Even though the loop \"only\" does half of the $n^2$ pairs, halving is a constant factor — asymptotically invisible. This is the single most common source of \"is it $n^2$ or $n^2/2$?\" confusion, and the answer is: same Theta class.</p>\n\n<h4>A trickier one: when the inner loop multiplies, not adds</h4>\n<pre><code>for i in range(n):\n    j = 1\n    while j < n:\n        j = j * 2     # j doubles each iteration\n        do_work()</code></pre>\n<p>The outer loop is $\\Theta(n)$. The inner <code>while</code> runs until $j$ reaches or exceeds $n$, doubling from 1, so it runs $\\lceil \\log_2 n \\rceil = \\Theta(\\log n)$ times. Multiplying: $\\Theta(n) \\cdot \\Theta(\\log n) = \\Theta(n \\log n)$. Recognize this pattern — it is exactly the cost profile of an efficient comparison sort.</p>\n\n<h3>Where this lands in machine learning and AI</h3>\n<div class=\"callout violet\">\n<div class=\"c-tag\">The deeper connection</div>\n<p>Asymptotics decide what is computable at scale, and ML lives at scale. Training a model on $n$ examples with a per-step cost of $O(n)$ versus $O(n^2)$ is the difference between a dataset of millions and a dataset of thousands. Several landmark advances are, at heart, asymptotic wins.</p>\n</div>\n<ul>\n<li><strong>Attention and the quadratic bottleneck.</strong> Standard self-attention in a Transformer compares every token with every other token, costing $\\Theta(n^2 d)$ in the sequence length $n$. That $n^2$ is precisely why long-context models are hard, and why \"linear attention\" / FlashAttention-style work (reducing memory and compute scaling) is such a big deal — it is an attack on a Big-O term.</li>\n<li><strong>Exact inference vs. approximation.</strong> Exact inference in general probabilistic graphical models is exponential, $O(2^n)$-ish in the treewidth; that intractability is why we resort to variational methods and sampling. The whole field of approximate inference exists because an exponential cannot be paid.</li>\n<li><strong>Nearest neighbors.</strong> Brute-force $k$-NN over $n$ points is $\\Theta(nd)$ per query; the $n$ factor is why vector databases use approximate indexes (HNSW, IVF) that trade exactness for sub-linear-ish query time. Big-O is the design pressure.</li>\n<li><strong>Gradient descent.</strong> A single epoch of full-batch GD is $\\Theta(nd)$ in samples $n$ and dimensions $d$; this linearity is what makes deep learning scale, and stochastic/mini-batch variants exist to control the constant and the $n$ dependence per update.</li>\n</ul>\n<p>When a researcher says a method \"scales linearly\" or \"is quadratic in sequence length,\" they are speaking exactly the language of this lesson — and the entire engineering strategy of modern AI is, in large part, the relentless lowering of asymptotic exponents.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>Big-O, Omega, Theta are upper, lower, and tight bounds defined by \"$\\exists c, n_0$ such that…\"; little-o and little-omega are the strict ($\\lim \\to 0$ or $\\infty$) versions.</li>\n<li>$f = \\Theta(g)$ iff $f = O(g)$ and $f = \\Omega(g)$. Theta is the precise statement; an unqualified Big-O is an upper bound that may be loose.</li>\n<li>Worst/average/best case (which input) is independent of O/Theta/Omega (which kind of bound); worst case is the default.</li>\n<li>Ranking: $1 \\prec \\log n \\prec n \\prec n\\log n \\prec n^2 \\prec 2^n \\prec n!$. Drop constants and lower-order terms; the base of a log doesn't matter.</li>\n<li>To analyze code: count operations as a function of $n$, sum nested/loop bounds (often via $\\sum$), then simplify to the dominant term.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"algo-bigo\"></div>",
          "mcq": [
            {
              "q": "Which statement is the strongest correct description of binary search's running time on a sorted array of $n$ elements?",
              "choices": [
                "$O(n)$ in the worst case",
                "$\\Omega(1)$ in the worst case",
                "$\\Theta(\\log n)$ in the worst case",
                "$O(\\log n)$ in the best case"
              ],
              "answer": 2,
              "explain": "All four can be true, but $\\Theta(\\log n)$ pins the worst-case cost from both sides and is the tight, informative claim; $O(n)$ and $\\Omega(1)$ are correct but loose."
            },
            {
              "q": "For which pair is $f(n) = o(g(n))$ true (i.e. $\\lim_{n\\to\\infty} f/g = 0$)?",
              "choices": [
                "$f(n) = 3n^2,\\ g(n) = n^2$",
                "$f(n) = (\\log n)^{10},\\ g(n) = n^{0.1}$",
                "$f(n) = 2^n,\\ g(n) = n^{100}$",
                "$f(n) = n!,\\ g(n) = 2^n$"
              ],
              "answer": 1,
              "explain": "Any positive power of $n$ eventually beats any power of $\\log n$, so $(\\log n)^{10} = o(n^{0.1})$. The first is $\\Theta$ not $o$; the third and fourth have the ratio going to infinity, not zero."
            },
            {
              "q": "A function's exact operation count is $T(n) = \\frac{n(n-1)}{2}$. What is the tightest correct bound?",
              "choices": [
                "$\\Theta(n)$ because the loop does about half the pairs",
                "$O(n^2)$ but not $\\Omega(n^2)$",
                "$\\Theta(n^2)$",
                "$\\Theta(n^2/2)$, which differs from $\\Theta(n^2)$"
              ],
              "answer": 2,
              "explain": "$\\frac{n(n-1)}{2} = \\frac12 n^2 - \\frac12 n$; dropping the constant $\\frac12$ and the lower-order $n$ term gives $\\Theta(n^2)$. Constant factors like $1/2$ never change the Theta class, so $\\Theta(n^2/2)$ is just $\\Theta(n^2)$."
            },
            {
              "q": "Quicksort with a naive pivot is described as 'fast.' Which characterization is precise?",
              "choices": [
                "$\\Theta(n \\log n)$ for all inputs",
                "$\\Theta(n \\log n)$ average case, $\\Theta(n^2)$ worst case",
                "$O(n \\log n)$ worst case",
                "$\\Omega(n^2)$ average case"
              ],
              "answer": 1,
              "explain": "Quicksort cannot be given a single Theta over all inputs: it is $\\Theta(n\\log n)$ on average but degrades to $\\Theta(n^2)$ on adversarial (e.g. already-sorted) input, which also makes the worst-case $O(n\\log n)$ claim false."
            },
            {
              "q": "In the formal definition $f(n) = O(g(n)) \\iff \\exists\\, c>0,\\ \\exists\\, n_0>0$ such that $0 \\le f(n) \\le c\\,g(n)$ for all $n \\ge n_0$, what is the role of the threshold $n_0$?",
              "choices": [
                "It lets us ignore the behavior on small inputs, so the bound only has to hold eventually",
                "It forces the bound to hold for every input size including $n=1$",
                "It is the constant factor we are allowed to hide inside Big-O",
                "It marks the input size at which $f$ and $g$ become exactly equal"
              ],
              "answer": 0,
              "explain": "The $n_0$ escape hatch means the inequality only has to hold for sufficiently large $n$, which is what lets asymptotic analysis discard small-$n$ noise. The constant factor is $c$, not $n_0$, and the bound need not hold at $n=1$ or imply any equality."
            },
            {
              "q": "The lesson notes that '$=$' in $f(n) = O(g(n))$ is an abuse of notation. Which fact best demonstrates that this '$=$' is not genuine equality?",
              "choices": [
                "$n = O(n^2)$ holds but $n^2 = O(n)$ does not, so the relation is not symmetric",
                "Both $n = O(n^2)$ and $n^2 = O(n)$ hold, contradicting equality",
                "$O(g(n))$ is a single function, not a set",
                "Big-O equality fails whenever the constant $c$ is greater than 1"
              ],
              "answer": 0,
              "explain": "Real equality is symmetric, but $n = O(n^2)$ is true while $n^2 = O(n)$ is false, exposing that the '$=$' really means 'belongs to / is bounded by.' (Note $O(g(n))$ is in fact a set, and the constant $c$ has no such threshold.)"
            },
            {
              "q": "Using the standard growth ranking rules, which ordering from slowest- to fastest-growing is correct for large $n$?",
              "choices": [
                "$(\\log n)^{5} \\prec \\sqrt{n} \\prec n^2 \\prec 3^n \\prec n!$",
                "$\\sqrt{n} \\prec (\\log n)^{5} \\prec 3^n \\prec n^2 \\prec n!$",
                "$(\\log n)^{5} \\prec n^2 \\prec \\sqrt{n} \\prec n! \\prec 3^n$",
                "$n^2 \\prec 3^n \\prec n! \\prec \\sqrt{n} \\prec (\\log n)^{5}$"
              ],
              "answer": 0,
              "explain": "Any power of a log loses to any positive power of $n$, polynomials rank by exponent ($\\sqrt n = n^{0.5} \\prec n^2$), every exponential beats every polynomial, and factorial beats any fixed exponential, giving $(\\log n)^5 \\prec \\sqrt n \\prec n^2 \\prec 3^n \\prec n!$."
            },
            {
              "q": "A theorem states that any comparison-based sorting algorithm must make $\\Omega(n \\log n)$ comparisons. What does this $\\Omega$ claim assert?",
              "choices": [
                "No comparison sort can run asymptotically faster than $n \\log n$ in the worst case, no matter how clever",
                "Every comparison sort runs in exactly $\\Theta(n \\log n)$ on all inputs",
                "Some comparison sort achieves $n \\log n$ comparisons, but most are slower",
                "Comparison sorts can never exceed $c\\,n \\log n$ comparisons for some constant $c$"
              ],
              "answer": 0,
              "explain": "$\\Omega(n\\log n)$ is a lower bound on the problem itself: the worst-case cost grows at least as fast as $n\\log n$, so no comparison sort can beat that rate. An upper-bound (never-exceed) statement would be Big-O, not $\\Omega$, and the bound is about the worst case, not all inputs."
            },
            {
              "q": "Saying $f(n) = \\Theta(g(n))$ is equivalent to which combined statement?",
              "choices": [
                "$f(n) = O(g(n))$ AND $f(n) = \\Omega(g(n))$",
                "$f(n) = O(g(n))$ OR $f(n) = \\Omega(g(n))$",
                "$f(n) = o(g(n))$ AND $f(n) = \\omega(g(n))$",
                "$f(n) = O(g(n))$ but NOT $f(n) = \\Omega(g(n))$"
              ],
              "answer": 0,
              "explain": "$\\Theta$ is a tight, two-sided bound: $g$ is both an asymptotic upper bound ($O$) and an asymptotic lower bound ($\\Omega$). The 'OR' version is too weak, and $o$/$\\omega$ are strict and mutually exclusive, so they can never both hold."
            },
            {
              "q": "An algorithm runs in $\\Theta(n^2)$ time. A student concludes: 'Therefore it can never run faster than $\\Theta(n^2)$ on any specific input.' Why is this reasoning flawed?",
              "choices": [
                "$\\Theta$ describes the growth of a chosen complexity measure (e.g. worst case) as a function of $n$, not the cost of every individual input; a particular input can finish far sooner",
                "$\\Theta$ only bounds the algorithm from above, so faster inputs are always allowed",
                "$\\Theta(n^2)$ secretly means the same as $O(n^2)$, which says nothing about lower bounds",
                "Constant factors hidden in $\\Theta$ can make any single input take exactly $n^2$ steps"
              ],
              "answer": 0,
              "explain": "Asymptotic bounds describe how a summary measure (such as worst-case time) scales with $n$; a specific easy input (e.g. an already-sorted array for some algorithms) can run much faster. $\\Theta$ is genuinely two-sided, so the claim that it only bounds from above is also wrong."
            },
            {
              "q": "What is the tightest bound for $T(n) = 5n^2 + 100n\\log n + 3000$?",
              "choices": [
                "$\\Theta(n^2)$",
                "$\\Theta(n^2 \\log n)$",
                "$\\Theta(n)$",
                "$\\Theta(n\\log n)$"
              ],
              "answer": 0,
              "explain": "The fastest-growing term is $5n^2$, and constant factors plus lower-order terms ($100n\\log n$, the constant $3000$) are dropped, giving $\\Theta(n^2)$. Multiplying by $\\log n$ ($\\Theta(n^2\\log n)$) overstates the growth, while $\\Theta(n)$ and $\\Theta(n\\log n)$ both understate it since $n^2$ grows strictly faster than $n\\log n$."
            },
            {
              "q": "Algorithm A is $\\Theta(n)$ and algorithm B is $\\Theta(n^2)$. For the input size $n = 5$ you actually need to handle, which statement is guaranteed by these bounds alone?",
              "choices": [
                "Nothing is guaranteed about $n = 5$; asymptotic bounds only constrain behavior for sufficiently large $n$, so B could easily be faster at $n = 5$",
                "A must be faster than B at $n = 5$, since $n < n^2$",
                "A and B must take the same time at $n = 5$ because both ignore constants",
                "B must be faster, because higher-degree polynomials have smaller constants"
              ],
              "answer": 0,
              "explain": "Asymptotic notation hides constants and only promises behavior as $n \\to \\infty$ (beyond some threshold $n_0$); at a small fixed $n=5$ a $\\Theta(n^2)$ routine with tiny constants can beat a $\\Theta(n)$ one with huge constants. The crossover where A wins may lie above $n=5$."
            },
            {
              "q": "An algorithm runs an $O(n^2)$ preprocessing phase and then a separate $O(n\\log n)$ phase, one after the other. What is the tightest big-O bound for the whole algorithm?",
              "choices": [
                "$O(n^2\\log n)$",
                "$O(n^2)$",
                "$O(n\\log n)$",
                "$O(n^3)$"
              ],
              "answer": 1,
              "explain": "Sequential phases <em>add</em>: $O(n^2)+O(n\\log n)=O(n^2+n\\log n)$, and a sum is dominated by its larger term, so the total is $O(n^2)$. Multiplying the bounds (giving $O(n^3\\log n)$) would be for <em>nested</em> phases, not sequential ones."
            },
            {
              "q": "Why can we write a logarithmic running time as $O(\\log n)$ without specifying the base of the logarithm?",
              "choices": [
                "Big-O notation discards all logarithmic factors",
                "In computer science logarithms are always base 2",
                "The base genuinely does not change the value of $\\log n$",
                "Changing the base only multiplies the logarithm by a constant factor, which big-O ignores"
              ],
              "answer": 3,
              "explain": "$\\log_a n = \\log_b n / \\log_b a$, so logs of different bases differ only by the constant factor $1/\\log_b a$. Big-O absorbs constant factors, so the base is irrelevant inside $O(\\cdot)$."
            },
            {
              "q": "Which function grows asymptotically faster as $n\\to\\infty$: $n^{100}$ or $2^{n}$?",
              "choices": [
                "$2^{n}$ — every exponential eventually overtakes every polynomial",
                "$n^{100}$ — its exponent is far larger",
                "They grow at the same rate",
                "It depends on the constant factors"
              ],
              "answer": 0,
              "explain": "For any fixed exponent $k$, $n^k = o(2^n)$: exponential growth dominates polynomial growth once $n$ is large enough, no matter how large $k$ is. The constant factors only shift <em>where</em> the crossover happens, not the eventual winner."
            },
            {
              "q": "An $O(n^2)$ algorithm takes about 1 second on an input of size $n$. Roughly how long should you expect it to take on an input of size $3n$?",
              "choices": [
                "About 6 seconds",
                "About 3 seconds",
                "About 9 seconds",
                "About 27 seconds"
              ],
              "answer": 2,
              "explain": "For a quadratic, scaling the input by a factor $k$ scales the running time by $k^2$. Here $k=3$, so $3^2 = 9\\times$ the time. (A cubic would scale by $27\\times$, a linear algorithm by $3\\times$.)"
            }
          ],
          "flashcards": [
            {
              "front": "State the formal definition of $f(n) = O(g(n))$.",
              "back": "There exist constants $c > 0$ and $n_0 > 0$ such that $0 \\le f(n) \\le c\\,g(n)$ for all $n \\ge n_0$. (Eventually bounded above by a constant multiple of $g$.)"
            },
            {
              "front": "How does little-o differ from Big-O in its quantifiers?",
              "back": "Big-O: there EXISTS a $c$ with $f \\le c\\,g$ eventually (bound may be tight). Little-o: for EVERY $c>0$, $f < c\\,g$ eventually, i.e. $\\lim f/g = 0$ (strictly slower growth)."
            },
            {
              "front": "What is the relationship between $\\Theta$, $O$, and $\\Omega$?",
              "back": "$f(n) = \\Theta(g(n))$ if and only if $f(n) = O(g(n))$ AND $f(n) = \\Omega(g(n))$ — bounded above and below by constant multiples of $g$."
            },
            {
              "front": "Rank the common growth classes from slowest to fastest growing.",
              "back": "$1 \\prec \\log n \\prec \\sqrt{n} \\prec n \\prec n\\log n \\prec n^2 \\prec n^3 \\prec 2^n \\prec n! \\prec n^n$ (each is little-o of the next)."
            },
            {
              "front": "Are 'worst case' and 'Big-O' the same thing?",
              "back": "No — they are orthogonal. Worst/average/best case = WHICH input of size $n$. O/Theta/Omega = WHICH KIND of bound. E.g. linear search is $\\Theta(n)$ in the worst case. Worst case is the default when unstated."
            },
            {
              "front": "Why does the base of a logarithm not matter in asymptotic notation?",
              "back": "$\\log_a n = \\log_b n / \\log_b a$, a constant multiple, so $\\log_a n = \\Theta(\\log_b n)$. The base only changes a constant factor, which Theta ignores; hence we write $\\log n$."
            }
          ],
          "homework": [
            {
              "prompt": "Give a tight $\\Theta$ bound for the running time of this code as a function of $n$:\n<pre><code>i = n\nwhile i > 1:\n    for j in range(n):\n        do_work()   # Theta(1)\n    i = i // 2</code></pre>",
              "hint": "Analyze the outer and inner loops separately. How many times does the outer 'while' run if $i$ is halved each step? What does the inner 'for' contribute per outer iteration?",
              "solution": "The outer while loop halves $i$ from $n$ down to 1, so it runs $\\lceil \\log_2 n \\rceil = \\Theta(\\log n)$ times. Each outer iteration runs the inner for-loop $n$ times with a $\\Theta(1)$ body, contributing $\\Theta(n)$. Multiplying the two independent factors: $\\Theta(\\log n) \\cdot \\Theta(n) = \\Theta(n \\log n)$."
            },
            {
              "prompt": "Using the formal definition, prove that $f(n) = 5n^2 + 3n + 7$ is $O(n^2)$. Then state (without full proof) why it is also $\\Theta(n^2)$.",
              "hint": "Find a single constant $c$ and threshold $n_0$ so that $5n^2 + 3n + 7 \\le c\\,n^2$ for all $n \\ge n_0$. Bound the lower-order terms by multiples of $n^2$.",
              "solution": "For $n \\ge 1$ we have $3n \\le 3n^2$ and $7 \\le 7n^2$. Therefore $5n^2 + 3n + 7 \\le 5n^2 + 3n^2 + 7n^2 = 15n^2$. So with $c = 15$ and $n_0 = 1$, $0 \\le f(n) \\le c\\,n^2$ for all $n \\ge n_0$, proving $f(n) = O(n^2)$. It is also $\\Omega(n^2)$ because $f(n) = 5n^2 + 3n + 7 \\ge 5n^2$ for all $n \\ge 0$ (take $c_1 = 5$). Since $f = O(n^2)$ and $f = \\Omega(n^2)$ with the same $g(n)=n^2$, we conclude $f(n) = \\Theta(n^2)$."
            },
            {
              "prompt": "True or false, with justification: 'If an algorithm is $O(n^2)$, then it is also $O(n^3)$, and if it is $\\Omega(n^2)$ then it is also $\\Omega(n)$. But an algorithm cannot be both $O(n^2)$ and $\\Omega(n^3)$.'",
              "hint": "Big-O is an upper bound and Omega a lower bound. Upper bounds can be loosened upward; lower bounds can be loosened downward. For the last clause, think about whether $n^2$ can simultaneously dominate and be dominated by $n^3$.",
              "solution": "True on all three counts. (1) $O(n^2) \\Rightarrow O(n^3)$: if $f \\le c\\,n^2$ eventually, then since $n^2 \\le n^3$ for $n \\ge 1$, also $f \\le c\\,n^3$ — a valid upper bound can always be replaced by a larger one. (2) $\\Omega(n^2) \\Rightarrow \\Omega(n)$: if $f \\ge c\\,n^2$ eventually, then since $n^2 \\ge n$ for $n \\ge 1$, also $f \\ge c\\,n$ — a lower bound can be replaced by a smaller one. (3) An algorithm cannot be both $O(n^2)$ and $\\Omega(n^3)$: that would require $c_1 n^3 \\le f(n) \\le c_2 n^2$ for large $n$, giving $c_1 n^3 \\le c_2 n^2$, i.e. $n \\le c_2/c_1$, a constant — impossible for all large $n$. The contradiction shows no such $f$ exists."
            }
          ],
          "examples": [
            {
              "title": "Prove a Big-O bound with explicit witnesses",
              "body": "Let $f(n) = 3n^2 + 5n + 7$. Prove that $f(n) = O(n^2)$ by exhibiting concrete constants $c$ and $n_0$ such that $f(n) \\le c\\,n^2$ for all $n \\ge n_0$.",
              "solution": "The definition of Big-O requires us to find constants $c > 0$ and $n_0 \\ge 1$ with $f(n) \\le c\\,n^2$ for every $n \\ge n_0$. The strategy is to bound each lower-order term by a multiple of the dominant term $n^2$.\n\n<strong>Step 1 — bound each term by $n^2$.</strong> For all $n \\ge 1$ we have $n \\le n^2$ and $1 \\le n^2$. So:\n$$3n^2 + 5n + 7 \\le 3n^2 + 5n^2 + 7n^2 = 15\\,n^2.$$\n\n<strong>Step 2 — read off the witnesses.</strong> The inequality $f(n) \\le 15\\,n^2$ holds for every $n \\ge 1$. Hence we may take\n$$c = 15, \\qquad n_0 = 1.$$\n\n<strong>Step 3 — verify on a concrete point.</strong> At $n = 10$: $f(10) = 3(100) + 5(10) + 7 = 357$, and $c\\,n^2 = 15 \\cdot 100 = 1500$. Indeed $357 \\le 1500$. \n\n<strong>Conclusion.</strong> Since there exist $c = 15$ and $n_0 = 1$ with $f(n) \\le c\\,n^2$ for all $n \\ge n_0$, we have $f(n) = O(n^2)$. (The witnesses are not unique — $c = 4$, $n_0 = 7$ also works, since $5n + 7 \\le n^2$ once $n \\ge 7$. Any valid pair proves the bound.)"
            },
            {
              "title": "Constant-blindness and a $\\Theta$ classification at the crossover",
              "body": "Algorithm A runs in $f(n) = n^2$ steps; algorithm B runs in $g(n) = 100\\,n$ steps. (a) Find the exact crossover $n$ beyond which A does more work than B. (b) Despite B being faster for large $n$, show that $g(n) = \\Theta(n)$ and $f(n) = \\Theta(n^2)$, so the two live in different growth classes regardless of the constant $100$.",
              "solution": "<strong>Part (a) — the crossover.</strong> A overtakes B when $n^2 > 100\\,n$. Dividing by $n > 0$ gives $n > 100$. So for $n \\le 100$ algorithm A is at least as fast (at $n = 100$ they tie: $100^2 = 10000 = 100 \\cdot 100$), and for every $n > 100$ algorithm B wins, with the gap widening without bound. The crossover is at $n = 100$.\n\n<strong>Part (b) — classify $g(n) = 100n$.</strong> $\\Theta$ requires both an upper ($O$) and a lower ($\\Omega$) bound by the same reference $g_{\\text{ref}}(n) = n$. We need $c_1\\,n \\le 100\\,n \\le c_2\\,n$ for large $n$. Taking $c_1 = 100$ and $c_2 = 100$ (or any $c_1 \\le 100 \\le c_2$) satisfies both for all $n \\ge n_0 = 1$. The constant $100$ is absorbed into $c_1, c_2$ and vanishes. Hence\n$$100\\,n = \\Theta(n).$$\n\n<strong>Classify $f(n) = n^2$.</strong> Trivially $1 \\cdot n^2 \\le n^2 \\le 1 \\cdot n^2$, so with $c_1 = c_2 = 1$, $n_0 = 1$ we get $n^2 = \\Theta(n^2)$.\n\n<strong>Why the constant cannot rescue A.</strong> Asymptotic classes ignore constant factors, so $\\Theta(n)$ and $\\Theta(n^2)$ are genuinely different — no choice of constant turns one into the other. Concretely, $\\lim_{n\\to\\infty} g(n)/f(n) = \\lim_{n\\to\\infty} 100n / n^2 = \\lim_{n\\to\\infty} 100/n = 0$, so $g$ grows strictly slower; in fact $100\\,n = O(n^2)$ but $n^2 \\ne O(n)$.\n\n<strong>Conclusion.</strong> (a) Crossover at $n = 100$. (b) $100\\,n = \\Theta(n)$ and $n^2 = \\Theta(n^2)$ — different growth classes — so algorithm B (linear) beats algorithm A (quadratic) for all $n > 100$, a verdict the constant $100$ only postpones, never reverses."
            }
          ]
        },
        {
          "id": "a-recurrences-master-theorem",
          "title": "Recurrences and the Master Theorem",
          "minutes": 18,
          "content": "<h3>Why recurrences exist</h3>\n<p>Recursive algorithms describe their own running time recursively. If a procedure solves a problem of size $n$ by doing some local work and then calling itself on smaller subproblems, then the cost of the size-$n$ call is \"the local work\" plus \"the cost of the subproblem calls.\" Writing that sentence in symbols gives a <strong>recurrence relation</strong>: an equation that defines $T(n)$ in terms of $T$ evaluated at smaller inputs.</p>\n<p>The canonical shape for divide-and-conquer algorithms is</p>\n$$T(n) = a\\,T(n/b) + f(n),$$\n<p>read as: a size-$n$ problem spawns $a$ subproblems, each of size $n/b$, and the cost of splitting the input and combining the answers is $f(n)$. Here $a \\ge 1$ (the <em>branching factor</em>), $b > 1$ (the <em>shrink factor</em>), and $f(n) \\ge 0$ is the per-call non-recursive work. We need a base case too, typically $T(1) = \\Theta(1)$, because the recursion must bottom out.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Three numbers control everything: how many children each call has ($a$), how much smaller each child is ($b$), and how much work happens at the current node before recursing ($f(n)$). The whole theory is just bookkeeping over the resulting tree of calls.</p>\n</div>\n\n<h4>Setting up a recurrence from code</h4>\n<p>Take merge sort. It splits the array in half ($a = 2$ calls on inputs of size $n/2$, so $b = 2$), and the merge step scans all $n$ elements linearly ($f(n) = \\Theta(n)$). So</p>\n$$T(n) = 2\\,T(n/2) + \\Theta(n).$$\n<p>Binary search recurses on one half and does constant comparison work: $a = 1$, $b = 2$, $f(n) = \\Theta(1)$, giving $T(n) = T(n/2) + \\Theta(1)$. The discipline is mechanical: count the recursive calls and their argument sizes, then add the work outside the calls.</p>\n<p>Two honest caveats. First, $n/b$ should really be $\\lceil n/b \\rceil$ or $\\lfloor n/b \\rfloor$; the floors and ceilings do not change the asymptotic answer for the functions we meet, so we drop them. Second, the base case contributes a constant that gets absorbed into $\\Theta$. Both simplifications are standard and rigorous for the asymptotic claims we make.</p>\n\n<h3>Solving by recursion trees</h3>\n<p>A <strong>recursion tree</strong> makes the cost concrete. The root is the original call; it has $a$ children, each of which has $a$ children, and so on. Label each node with its <em>local</em> cost $f(\\text{size at that node})$, then sum level by level. The total running time is the sum over all nodes.</p>\n<p>Solve $T(n) = 2T(n/2) + n$ this way. Let level $0$ be the root.</p>\n<ul>\n<li><strong>Level 0:</strong> 1 node of size $n$, local cost $n$. Row total $= n$.</li>\n<li><strong>Level 1:</strong> 2 nodes of size $n/2$, each costing $n/2$. Row total $= 2 \\cdot \\tfrac{n}{2} = n$.</li>\n<li><strong>Level 2:</strong> 4 nodes of size $n/4$, each costing $n/4$. Row total $= 4 \\cdot \\tfrac{n}{4} = n$.</li>\n<li><strong>Level $i$:</strong> $2^i$ nodes of size $n/2^i$, each costing $n/2^i$. Row total $= n$.</li>\n</ul>\n<p>The sizes shrink to $1$ when $n/2^i = 1$, i.e. at level $i = \\log_2 n$. So there are $\\log_2 n + 1$ levels, each contributing $n$, giving</p>\n$$T(n) = \\sum_{i=0}^{\\log_2 n} n = n(\\log_2 n + 1) = \\Theta(n \\log n).$$\n<p>The picture also tells you <em>where</em> the cost lives: it is spread evenly across all levels. That balance is exactly what produces the extra $\\log n$ factor.</p>\n\n<h4>The leaf count and why $n^{\\log_b a}$ appears</h4>\n<p>The number of leaves is the most important hidden quantity. The tree has depth $\\log_b n$ and branching factor $a$, so it has $a^{\\log_b n}$ leaves. Using the identity $a^{\\log_b n} = n^{\\log_b a}$ (take $\\log_b$ of both sides to check), the leaf count is</p>\n$$\\#\\text{leaves} = n^{\\log_b a}.$$\n<p>Each leaf is a base case costing $\\Theta(1)$, so the total leaf cost is $\\Theta(n^{\\log_b a})$. This quantity, $n^{\\log_b a}$, is the <em>watershed</em> of the whole subject. It measures how much work the recursion itself generates, independent of $f$. The Master Theorem is simply a contest between this leaf-driven cost and the root-driven cost $f(n)$.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>$n^{\\log_b a}$ is the cost contributed by the leaves of the recursion tree. Whether the algorithm is dominated by its leaves, its root, or shares the load evenly is decided by comparing $f(n)$ against $n^{\\log_b a}$. Memorize this comparison; it is the entire Master Theorem in one line.</p>\n</div>\n\n<h3>Solving by substitution (guess and verify)</h3>\n<p>The recursion tree is great for discovering an answer; <strong>substitution</strong> is how you <em>prove</em> it. You guess a bound and verify it by induction, choosing constants to make the inequality close.</p>\n<p>Claim: $T(n) = 2T(n/2) + n$ satisfies $T(n) \\le c\\,n\\log_2 n$ for a suitable constant $c$ and all $n \\ge 2$. Assume it holds for $n/2$ (strong induction). Then</p>\n$$T(n) = 2T(n/2) + n \\le 2\\Big(c\\,\\tfrac{n}{2}\\log_2 \\tfrac{n}{2}\\Big) + n = c\\,n(\\log_2 n - 1) + n = c\\,n\\log_2 n - cn + n.$$\n<p>This is $\\le c\\,n\\log_2 n$ exactly when $-cn + n \\le 0$, i.e. $c \\ge 1$. So with $c = 1$ the induction goes through (after fixing a base case constant), proving $T(n) = O(n\\log n)$. A symmetric argument with $\\ge$ proves $\\Omega(n\\log n)$, hence $\\Theta(n\\log n)$.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Watch out</div>\n<p>A classic trap: to prove $T(n) = O(n)$ for $T(n)=2T(n/2)+n$, one writes $T(n)\\le 2(c\\,n/2)+n = cn+n = (c+1)n$ and \"concludes\" $O(n)$. That is wrong — the constant grew from $c$ to $c+1$, so the induction does not close. You must reproduce the <em>same</em> constant $c$, not a larger one. The failure here is a feature: it correctly tells you $O(n)$ is too optimistic.</p>\n</div>\n\n<h3>The Master Theorem</h3>\n<p>For $T(n) = a\\,T(n/b) + f(n)$ with $a \\ge 1$, $b > 1$, define the watershed function $n^{\\log_b a}$. Compare $f(n)$ to it. There are three cases.</p>\n<ol>\n<li><strong>Case 1 (leaves win).</strong> If $f(n) = O\\!\\big(n^{\\log_b a - \\varepsilon}\\big)$ for some constant $\\varepsilon > 0$ — that is, $f$ is <em>polynomially smaller</em> than the watershed — then $T(n) = \\Theta\\!\\big(n^{\\log_b a}\\big)$. The recursion's branching dominates; cost piles up at the leaves.</li>\n<li><strong>Case 2 (balanced).</strong> If $f(n) = \\Theta\\!\\big(n^{\\log_b a}\\big)$ — $f$ matches the watershed — then $T(n) = \\Theta\\!\\big(n^{\\log_b a}\\log n\\big)$. Every level costs about the same; summing $\\log n$ equal levels adds the log factor.</li>\n<li><strong>Case 3 (root wins).</strong> If $f(n) = \\Omega\\!\\big(n^{\\log_b a + \\varepsilon}\\big)$ for some $\\varepsilon > 0$ <em>and</em> the regularity condition $a\\,f(n/b) \\le k\\,f(n)$ holds for some constant $k < 1$ and large $n$, then $T(n) = \\Theta(f(n))$. The top-level work dominates; the cost is concentrated at the root.</li>\n</ol>\n<p>The general (Case 2) statement can be slightly extended: if $f(n) = \\Theta\\!\\big(n^{\\log_b a}\\log^k n\\big)$ for $k \\ge 0$, then $T(n) = \\Theta\\!\\big(n^{\\log_b a}\\log^{k+1} n\\big)$. The plain $k=0$ version is the one to know first.</p>\n\n<h4>When the Master Theorem does NOT apply</h4>\n<p>The theorem is powerful but narrow. It is silent when:</p>\n<ul>\n<li><strong>The gap is not polynomial.</strong> Between Case 1 and 2 there is a no-man's-land: if $f(n)$ is smaller than $n^{\\log_b a}$ but only by a <em>sub-polynomial</em> factor (e.g. $f(n) = n^{\\log_b a}/\\log n$), no $\\varepsilon$ works and the theorem says nothing. Similarly $f(n) = n^{\\log_b a}\\log n$ falls in the gap above Case 2 (it is not polynomially larger, so Case 3 fails). The extended Case 2 above rescues the $\\log^k n$ family, but other functions still escape.</li>\n<li><strong>Case 3's regularity condition fails.</strong> $f$ being polynomially larger is necessary but not sufficient; the regularity check must also pass. It almost always does for polynomials, but pathological oscillating $f$ can break it.</li>\n<li><strong>The recurrence is not of the form $a\\,T(n/b)+f$.</strong> Unequal splits like $T(n) = T(n/3) + T(2n/3) + n$, subtractive recurrences like $T(n) = T(n-1) + n$, or variable numbers of subproblems are outside its scope. Use recursion trees, the Akra–Bazzi method, or substitution instead.</li>\n</ul>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>The three cases are a tug-of-war between two forces: the recursion's fan-out (captured by $n^{\\log_b a}$) and the per-call work $f(n)$. Either side can dominate, or they can tie. This same \"who dominates\" reasoning recurs throughout asymptotic analysis — and in ML it mirrors how, say, the dominant term in a complexity bound or a loss decomposition determines scaling behavior. Knowing which term wins is the whole game.</p>\n</div>\n\n<h3>Worked example: the three drill recurrences</h3>\n<p>We classify each by computing $n^{\\log_b a}$ and comparing it to $f(n)$.</p>\n\n<h4>(1) $T(n) = 2T(n/2) + n$</h4>\n<p>Here $a = 2$, $b = 2$, so $\\log_b a = \\log_2 2 = 1$ and the watershed is $n^{1} = n$. The driving term is $f(n) = n = \\Theta(n^{\\log_b a})$. That is an exact match, so we are in <strong>Case 2</strong>:</p>\n$$T(n) = \\Theta(n^{\\log_b a}\\log n) = \\Theta(n\\log n).$$\n<p>This agrees with our recursion tree and substitution proofs above, and explains merge sort's $\\Theta(n\\log n)$ cost: work is balanced across all $\\log n$ levels.</p>\n\n<h4>(2) $T(n) = T(n/2) + 1$</h4>\n<p>Here $a = 1$, $b = 2$, so $\\log_b a = \\log_2 1 = 0$ and the watershed is $n^{0} = 1$. The driving term is $f(n) = 1 = \\Theta(n^{0})$, again an exact match, so <strong>Case 2</strong>:</p>\n$$T(n) = \\Theta(n^{0}\\log n) = \\Theta(\\log n).$$\n<p>This is binary search. Intuition check via the tree: there is one node per level (no branching since $a=1$), each costing $1$, and there are $\\log_2 n + 1$ levels, so the total is $\\Theta(\\log n)$. Note that $n^{\\log_b a} = 1$ here means the leaf cost is constant — with a single leaf, all the cost is the per-level $\\Theta(1)$ summed over the depth.</p>\n\n<h4>(3) $T(n) = 2T(n/2) + n^2$</h4>\n<p>Here $a = 2$, $b = 2$, so $\\log_b a = 1$ and the watershed is $n^{1} = n$. The driving term is $f(n) = n^2$, which is $\\Omega(n^{1 + \\varepsilon})$ with, say, $\\varepsilon = 1$ (indeed $n^2 = n^{1+1}$) — polynomially <em>larger</em> than the watershed. Check regularity: $a\\,f(n/b) = 2\\,(n/2)^2 = 2 \\cdot n^2/4 = n^2/2 = \\tfrac12 f(n) \\le k\\,f(n)$ with $k = \\tfrac12 < 1$. Regularity holds, so <strong>Case 3</strong>:</p>\n$$T(n) = \\Theta(f(n)) = \\Theta(n^2).$$\n<p>Tree sanity check: level $i$ has $2^i$ nodes of size $n/2^i$, each costing $(n/2^i)^2 = n^2/4^i$, so the row total is $2^i \\cdot n^2/4^i = n^2/2^i$. Summing the geometric series $\\sum_i n^2/2^i \\le 2n^2 = \\Theta(n^2)$ — the root level dominates, exactly as Case 3 predicts.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Pattern to remember</div>\n<p>For the common family $T(n) = aT(n/b) + n^c$: compute $c^* = \\log_b a$. If $c &lt; c^*$ it's Case 1, $\\Theta(n^{c^*})$. If $c = c^*$ it's Case 2, $\\Theta(n^{c^*}\\log n)$. If $c &gt; c^*$ it's Case 3, $\\Theta(n^c)$. The three drills are $c=1$ vs $c^*=1$ (tie, Case 2), $c=0$ vs $c^*=0$ (tie, Case 2), and $c=2$ vs $c^*=1$ (root wins, Case 3).</p>\n</div>\n\n<h3>A connection worth seeing</h3>\n<p>Divide-and-conquer recurrences are not just for sorting. Strassen's matrix multiplication gives $T(n) = 7T(n/2) + \\Theta(n^2)$, so $\\log_2 7 \\approx 2.807 > 2$, putting it in Case 1 with $T(n) = \\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2.807})$ — sub-cubic matrix multiply, the algorithmic backbone of fast linear algebra that underlies much of numerical ML. The recurrence machinery is precisely what tells you that shaving the branching factor from $8$ to $7$ moves the exponent from $3$ to $2.807$. Small changes in $a$ move the watershed exponent $\\log_b a$, and the watershed exponent is the asymptotic verdict.</p>",
          "mcq": [
            {
              "q": "For $T(n) = 4T(n/2) + n^2$, which Master Theorem case applies and what is the solution?",
              "choices": [
                "Case 1: $\\Theta(n^2)$",
                "Case 2: $\\Theta(n^2 \\log n)$",
                "Case 3: $\\Theta(n^2)$",
                "Master Theorem does not apply"
              ],
              "answer": 1,
              "explain": "Here $\\log_b a = \\log_2 4 = 2$, so the watershed is $n^2$, which exactly matches $f(n) = n^2$. That is Case 2, giving $\\Theta(n^2 \\log n)$."
            },
            {
              "q": "Why does the Master Theorem fail to solve $T(n) = 2T(n/2) + n\\log n$?",
              "choices": [
                "Because $a$ is not a power of $b$",
                "Because $f(n) = n\\log n$ is larger than the watershed $n^{\\log_b a} = n$ but not POLYNOMIALLY larger, so Case 3's $\\Omega(n^{1+\\varepsilon})$ condition fails",
                "Because the regularity condition is violated",
                "Because $f(n)$ is not a polynomial"
              ],
              "answer": 1,
              "explain": "The watershed is $n^1$. The factor between $f$ and $n$ is $\\log n$, which is sub-polynomial: no $\\varepsilon > 0$ makes $n\\log n = \\Omega(n^{1+\\varepsilon})$. This lands in the gap above Case 2 where the plain theorem is silent."
            },
            {
              "q": "In the recursion tree for $T(n) = aT(n/b) + f(n)$, how many leaves are there, and what cost do they contribute?",
              "choices": [
                "$\\log_b n$ leaves, contributing $\\Theta(\\log n)$",
                "$n$ leaves, contributing $\\Theta(n)$",
                "$n^{\\log_b a}$ leaves, contributing $\\Theta(n^{\\log_b a})$",
                "$a \\cdot b$ leaves, contributing $\\Theta(ab)$"
              ],
              "answer": 2,
              "explain": "Depth $\\log_b n$ with branching factor $a$ gives $a^{\\log_b n} = n^{\\log_b a}$ leaves, each $\\Theta(1)$, so leaf cost is $\\Theta(n^{\\log_b a})$ — the watershed quantity the whole theorem hinges on."
            },
            {
              "q": "When proving $T(n) = 2T(n/2)+n = O(n\\log n)$ by substitution, why does the bound $T(n) \\le cn\\log_2 n$ succeed while attempting $T(n) \\le cn$ fails?",
              "choices": [
                "The $O(n)$ attempt produces $(c+1)n$, growing the constant, so the induction does not reproduce the same $c$",
                "The $O(n\\log n)$ guess uses a stronger induction hypothesis on more values",
                "Substitution only works for logarithmic bounds",
                "The base case is undefined for the linear bound"
              ],
              "answer": 0,
              "explain": "Plugging the linear guess gives $T(n) \\le 2(cn/2)+n = (c+1)n$; the constant inflated from $c$ to $c+1$, so it cannot equal $cn$ and the induction fails — correctly revealing $O(n)$ is too tight."
            },
            {
              "q": "A recursive procedure on input size $n$ does $\\Theta(n)$ work, then makes three recursive calls each on an input of size $n/4$. Which recurrence describes its running time?",
              "choices": [
                "$T(n) = 3\\,T(n/4) + \\Theta(n)$",
                "$T(n) = 4\\,T(n/3) + \\Theta(n)$",
                "$T(n) = 3\\,T(n/4) + \\Theta(1)$",
                "$T(n) = 3\\,T(n - 4) + \\Theta(n)$"
              ],
              "answer": 0,
              "explain": "The branching factor $a=3$ counts the calls, the shrink factor $b=4$ is how much smaller each child is, and $f(n)=\\Theta(n)$ is the non-recursive work, giving $T(n)=3T(n/4)+\\Theta(n)$."
            },
            {
              "q": "In the standard divide-and-conquer form $T(n) = a\\,T(n/b) + f(n)$, what does $f(n)$ represent?",
              "choices": [
                "The total cost summed over all nodes of the recursion tree",
                "The non-recursive work done at the current call to split the input and combine the subproblem answers",
                "The number of subproblems generated at each level",
                "The depth of the recursion tree"
              ],
              "answer": 1,
              "explain": "$f(n)$ is the per-call local cost of splitting and combining, done outside the recursive calls, not the total over all nodes."
            },
            {
              "q": "The lesson notes that we replace $\\lceil n/b \\rceil$ or $\\lfloor n/b \\rfloor$ with just $n/b$ and absorb the base-case constant into $\\Theta$. Why is this justified?",
              "choices": [
                "Because floors, ceilings, and the base-case constant do not affect the asymptotic answer for the functions encountered",
                "Because $n$ is always assumed to be an exact power of $b$ in every real input",
                "Because the Master Theorem requires the recurrence to have no constant terms",
                "Because rounding always makes the running time strictly smaller"
              ],
              "answer": 0,
              "explain": "Both simplifications are standard and rigorous because they leave the asymptotic ($\\Theta$) growth unchanged for the functions the analysis deals with."
            },
            {
              "q": "Binary search recurses on one half of the array and does constant comparison work per call. What are its parameters $a$, $b$, and $f(n)$, and the resulting recurrence?",
              "choices": [
                "$a=2$, $b=2$, $f(n)=\\Theta(1)$, giving $T(n)=2T(n/2)+\\Theta(1)$",
                "$a=1$, $b=2$, $f(n)=\\Theta(n)$, giving $T(n)=T(n/2)+\\Theta(n)$",
                "$a=1$, $b=2$, $f(n)=\\Theta(1)$, giving $T(n)=T(n/2)+\\Theta(1)$",
                "$a=1$, $b=1$, $f(n)=\\Theta(1)$, giving $T(n)=T(n-1)+\\Theta(1)$"
              ],
              "answer": 2,
              "explain": "Binary search makes a single recursive call ($a=1$) on a half-sized input ($b=2$) with constant local work ($f(n)=\\Theta(1)$), yielding $T(n)=T(n/2)+\\Theta(1)$."
            },
            {
              "q": "Consider $T(n) = 2T(n/2) + n^3$. Comparing $f(n) = n^3$ against $n^{\\log_b a} = n^{\\log_2 2} = n$, which Master Theorem case applies and what is the solution?",
              "choices": [
                "Case 1, $T(n) = \\Theta(n)$, because the work is dominated by the leaves",
                "Case 2, $T(n) = \\Theta(n^3 \\log n)$, because $f(n)$ and $n^{\\log_b a}$ grow at the same rate",
                "Case 3, $T(n) = \\Theta(n^3)$, because $f(n)$ grows polynomially faster than $n^{\\log_b a}$ and the regularity condition holds",
                "The Master Theorem does not apply because $f(n)$ is a polynomial of degree higher than 1"
              ],
              "answer": 2,
              "explain": "Here $n^{\\log_b a} = n$, and $f(n) = n^3 = \\Omega(n^{1+\\epsilon})$ grows polynomially faster, with $2(n/2)^3 = n^3/4 \\le c\\,n^3$ satisfying regularity, so Case 3 gives $T(n) = \\Theta(f(n)) = \\Theta(n^3)$. The root's work dominates, not the leaves (ruling out Case 1)."
            },
            {
              "q": "A student claims that in $T(n) = a\\,T(n/b) + f(n)$, increasing the branching factor $a$ from 2 to 4 (keeping $b = 2$) always increases the asymptotic running time. For which recurrence is this claim WRONG?",
              "choices": [
                "$T(n) = a\\,T(n/2) + n^3$, where the answer stays $\\Theta(n^3)$ whether $a = 2$ or $a = 4$",
                "$T(n) = a\\,T(n/2) + n$, where the answer changes from $\\Theta(n \\log n)$ to $\\Theta(n^2)$",
                "$T(n) = a\\,T(n/2) + 1$, where the answer changes from $\\Theta(n)$ to $\\Theta(n^2)$",
                "$T(n) = a\\,T(n/2) + n^2$, where the answer changes from $\\Theta(n^2)$ to $\\Theta(n^2 \\log n)$"
              ],
              "answer": 0,
              "explain": "For $f(n) = n^3$, $n^{\\log_2 a}$ is $n$ (a=2) or $n^2$ (a=4), both dominated by $n^3$, so the answer stays $\\Theta(n^3)$ either way (Case 3). In the other recurrences $f(n)$ is small enough that increasing $a$ raises $n^{\\log_2 a}$ and changes the leaf-dominated answer."
            },
            {
              "q": "For $T(n) = 9T(n/3) + n^2$, evaluate the cost at each level of the recursion tree. What pattern do the per-level costs follow, and what does this imply about the case?",
              "choices": [
                "Each level costs more than the one above by a factor of 9, so the leaves dominate (Case 1)",
                "Each level costs the same, $n^2$, so the total is $\\Theta(n^2 \\log n)$ (Case 2)",
                "Each level costs less than the one above, so the root dominates (Case 3)",
                "The first level costs $n^2$ and every subsequent level costs $\\Theta(1)$ (Case 1)"
              ],
              "answer": 1,
              "explain": "Level $i$ has $9^i$ nodes each costing $(n/3^i)^2 = n^2/9^i$, so each level costs exactly $n^2$; with $\\log_3 n$ levels the total is $\\Theta(n^2 \\log n)$, which is Case 2 since $n^{\\log_3 9} = n^2 = f(n)$."
            },
            {
              "q": "Two algorithms have recurrences $T_A(n) = 2T(n/2) + \\Theta(n)$ and $T_B(n) = 2T(n/2) + \\Theta(n^2)$. A classmate reasons that $T_B$ must be slower because it does more work, then concludes $T_B(n) = \\Theta(n^2 \\log n)$. What is the actual solution for $T_B$, and where did the reasoning go wrong?",
              "choices": [
                "$\\Theta(n^2 \\log n)$; the reasoning is correct because each of the $\\log n$ levels does $n^2$ work",
                "$\\Theta(n^2 \\log n)$; the $\\log n$ factor comes from the merge cost being superlinear",
                "$\\Theta(n^2)$; the per-level costs form a decreasing geometric series dominated by the root's $\\Theta(n^2)$ term",
                "$\\Theta(n^3)$; squaring the merge work also squares the depth contribution"
              ],
              "answer": 2,
              "explain": "For $T_B$, $n^{\\log_b a} = n$ while $f(n) = n^2$ dominates polynomially (Case 3), so $T_B(n) = \\Theta(n^2)$ with no log factor; the level costs $n^2, n^2/2, n^2/4, \\dots$ form a geometric series summing to $\\Theta(n^2)$. The classmate wrongly assumed every level costs the full $n^2$ as in $T_A$'s balanced Case 2."
            },
            {
              "q": "Apply the Master Theorem to $T(n) = 8\\,T(n/2) + n^2$. Here $a=8,\\ b=2$, so $n^{\\log_b a}=n^{\\log_2 8}=n^3$. What is the solution?",
              "choices": [
                "$\\Theta(n^2\\log n)$ — Case 2",
                "$\\Theta(n^2)$ — the root work dominates",
                "$\\Theta(n^3)$ — Case 1, the leaves dominate",
                "$\\Theta(n^3\\log n)$"
              ],
              "answer": 2,
              "explain": "Compare $f(n)=n^2$ with $n^{\\log_b a}=n^3$. Since $f(n)=O(n^{3-\\epsilon})$ is polynomially smaller, this is Case 1 and $T(n)=\\Theta(n^{\\log_b a})=\\Theta(n^3)$ — the cost accumulates in the exponentially many leaves."
            },
            {
              "q": "For which recurrence does the Master Theorem give $\\Theta(n\\log n)$?",
              "choices": [
                "$T(n)=2T(n/2)+\\Theta(n)$",
                "$T(n)=2T(n/2)+\\Theta(n^2)$",
                "$T(n)=4T(n/2)+\\Theta(n)$",
                "$T(n)=T(n/2)+\\Theta(1)$"
              ],
              "answer": 0,
              "explain": "$T(n)=2T(n/2)+\\Theta(n)$ has $n^{\\log_2 2}=n=f(n)$, so the work is balanced across all $\\log n$ levels (Case 2) → $\\Theta(n\\log n)$ — exactly mergesort. The others solve to $\\Theta(n^2)$, $\\Theta(n^2)$, and $\\Theta(\\log n)$."
            },
            {
              "q": "A divide-and-conquer algorithm of the form $T(n)=a\\,T(n/2)+f(n)$ halves the problem at each level. About how deep is its recursion tree?",
              "choices": [
                "$a^{n}$ levels",
                "$n$ levels",
                "$n/2$ levels",
                "$\\log_2 n$ levels"
              ],
              "answer": 3,
              "explain": "Each level divides the size by $b=2$, so it takes $\\log_2 n$ halvings to reach base cases of size 1. The branching factor $a$ controls how many leaves the tree has, not how deep it is."
            },
            {
              "q": "Why can the standard Master Theorem not be applied directly to $T(n)=T(n/3)+T(2n/3)+\\Theta(n)$?",
              "choices": [
                "$f(n)=\\Theta(n)$ is not a valid driving function",
                "The subproblems have unequal sizes, so it isn't of the form $a\\,T(n/b)+f(n)$",
                "The coefficients must be integers",
                "$n/3$ is not an integer for every $n$"
              ],
              "answer": 1,
              "explain": "The Master Theorem requires all subproblems to have the <em>same</em> size $n/b$. Here they are $n/3$ and $2n/3$, so it doesn't apply — you'd use a recursion tree or the Akra–Bazzi method (this one happens to solve to $\\Theta(n\\log n)$)."
            }
          ],
          "flashcards": [
            {
              "front": "What is the general divide-and-conquer recurrence form, and what does each symbol mean?",
              "back": "$T(n) = aT(n/b) + f(n)$: $a$ = number of subproblems (branching factor, $a\\ge1$), $b$ = factor by which input shrinks ($b>1$), $f(n)$ = non-recursive (split + combine) work per call."
            },
            {
              "front": "What is the 'watershed' quantity in the Master Theorem and where does it come from?",
              "back": "$n^{\\log_b a}$ = the cost of the leaves of the recursion tree (there are $a^{\\log_b n} = n^{\\log_b a}$ leaves). You compare $f(n)$ to it to pick the case."
            },
            {
              "front": "State the three Master Theorem cases for $T(n)=aT(n/b)+f(n)$.",
              "back": "Case 1: $f = O(n^{\\log_b a - \\varepsilon}) \\Rightarrow \\Theta(n^{\\log_b a})$. Case 2: $f = \\Theta(n^{\\log_b a}) \\Rightarrow \\Theta(n^{\\log_b a}\\log n)$. Case 3: $f = \\Omega(n^{\\log_b a + \\varepsilon})$ and regularity $af(n/b)\\le kf(n)$, $k<1$ $\\Rightarrow \\Theta(f(n))$."
            },
            {
              "front": "Solve and classify: $T(n)=2T(n/2)+n$, $T(n)=T(n/2)+1$, $T(n)=2T(n/2)+n^2$.",
              "back": "$2T(n/2)+n$: $\\log_b a=1$, $f=n$ matches $\\Rightarrow$ Case 2, $\\Theta(n\\log n)$. $T(n/2)+1$: $\\log_b a=0$, $f=1$ matches $\\Rightarrow$ Case 2, $\\Theta(\\log n)$. $2T(n/2)+n^2$: $\\log_b a=1$, $f=n^2$ larger $\\Rightarrow$ Case 3, $\\Theta(n^2)$."
            },
            {
              "front": "Name two situations where the Master Theorem does NOT apply.",
              "back": "(1) $f$ differs from $n^{\\log_b a}$ only by a sub-polynomial factor (e.g. $n^{\\log_b a}/\\log n$ or $n^{\\log_b a}\\log n$) — the gap between cases. (2) The recurrence isn't of form $aT(n/b)+f$, e.g. unequal splits $T(n/3)+T(2n/3)+n$ or subtractive $T(n-1)+n$. Also: Case 3 regularity condition fails."
            },
            {
              "front": "Quick rule for $T(n)=aT(n/b)+n^c$.",
              "back": "Let $c^*=\\log_b a$. If $c<c^*$: $\\Theta(n^{c^*})$ (Case 1). If $c=c^*$: $\\Theta(n^{c^*}\\log n)$ (Case 2). If $c>c^*$: $\\Theta(n^c)$ (Case 3)."
            }
          ],
          "homework": [
            {
              "prompt": "Classify and solve $T(n) = 3T(n/4) + n\\log n$ using the Master Theorem. State the case and justify the comparison carefully.",
              "hint": "Compute $\\log_b a = \\log_4 3$ first and compare it numerically to the exponent of $f(n)$. Is $n\\log n$ polynomially larger than $n^{\\log_4 3}$?",
              "solution": "Here $a=3$, $b=4$, so $\\log_b a = \\log_4 3 \\approx 0.793$, and the watershed is $n^{0.793}$. The driving term $f(n)=n\\log n = \\Omega(n)$, and $n$ is polynomially larger than $n^{0.793}$: choose $\\varepsilon = 0.2$, then $n\\log n = \\Omega(n^{1}) = \\Omega(n^{0.793+0.2})$. So Case 3's growth condition holds. Check regularity: $a f(n/b) = 3 \\cdot (n/4)\\log(n/4) = \\tfrac{3}{4} n \\log(n/4) \\le \\tfrac{3}{4} n \\log n = \\tfrac34 f(n)$, so $k = \\tfrac34 < 1$ works. Therefore Case 3 applies and $T(n) = \\Theta(f(n)) = \\Theta(n\\log n)$."
            },
            {
              "prompt": "The recurrence $T(n) = 2T(n/2) + n/\\log n$ cannot be solved by the standard three-case Master Theorem. Explain precisely why, then solve it with a recursion tree.",
              "hint": "Compute the watershed $n^{\\log_b a}$ and compare it to $f(n) = n/\\log n$. Is the gap polynomial? For the tree, sum the per-level costs, which involve a harmonic-like series.",
              "solution": "Watershed: $\\log_2 2 = 1$, so $n^{\\log_b a} = n$. We have $f(n) = n/\\log n$, which is smaller than $n$ but only by a factor of $\\log n$ — a sub-polynomial factor. No $\\varepsilon>0$ gives $n/\\log n = O(n^{1-\\varepsilon})$, so Case 1 fails; and it is not $\\Theta(n)$, so Case 2 fails. Hence the standard theorem does not apply. Recursion tree: level $i$ has $2^i$ nodes of size $n/2^i$, each costing $\\dfrac{n/2^i}{\\log(n/2^i)} = \\dfrac{n/2^i}{\\log n - i}$. Row total $= 2^i \\cdot \\dfrac{n/2^i}{\\log n - i} = \\dfrac{n}{\\log n - i}$. Summing over the internal levels $i = 0$ to $\\log_2 n - 1$: $\\sum_{i=0}^{\\log_2 n - 1} \\dfrac{n}{\\log_2 n - i} = n \\sum_{j=1}^{\\log_2 n} \\dfrac{1}{j} = n \\cdot H_{\\log_2 n} = \\Theta(n \\log\\log n)$, since the harmonic number $H_m = \\Theta(\\log m)$ with $m = \\log_2 n$. The leaf level adds $n^{\\log_b a} = n$ work, which is dominated by $n\\log\\log n$. So $T(n) = \\Theta(n \\log\\log n)$."
            },
            {
              "prompt": "Use the substitution method to prove that $T(n) = 2T(n/2) + n^2$ is $O(n^2)$ (Case 3 of the drills). Show explicitly that the constant does not grow.",
              "hint": "Guess $T(n) \\le cn^2$ and plug into the recurrence. You need to find a $c$ such that the right-hand side stays $\\le cn^2$ — the leftover $n^2$ term must be absorbable.",
              "solution": "Guess $T(n) \\le c n^2$ for all $n \\ge n_0$. Inductive step, assuming it holds for $n/2$: $T(n) = 2T(n/2) + n^2 \\le 2 \\cdot c (n/2)^2 + n^2 = 2 \\cdot c\\,\\dfrac{n^2}{4} + n^2 = \\dfrac{c}{2} n^2 + n^2 = \\left(\\dfrac{c}{2} + 1\\right) n^2$. We need $\\dfrac{c}{2} + 1 \\le c$, i.e. $1 \\le \\dfrac{c}{2}$, i.e. $c \\ge 2$. Pick $c = 2$: then the bound reproduces $\\le 2n^2 = cn^2$ with the SAME constant, so the induction closes. After choosing the base-case constant to satisfy $T(n_0) \\le c n_0^2$, we conclude $T(n) = O(n^2)$. A matching $\\Omega(n^2)$ follows since $T(n) \\ge n^2$, giving $\\Theta(n^2)$, consistent with the Master Theorem Case 3 answer."
            }
          ],
          "examples": [
            {
              "title": "Classifying a Case 1 recurrence with a leaf-count check",
              "body": "Solve $T(n) = 3\\,T(n/2) + n$ with $T(1) = \\Theta(1)$. Identify $a$, $b$, and $f(n)$, classify it with the Master Theorem, and confirm the answer by summing the recursion tree level by level.",
              "solution": "<strong>Step 1 — read off the parameters.</strong> Matching $T(n) = a\\,T(n/b) + f(n)$ gives $a = 3$ (three recursive calls), $b = 2$ (each child has half the size), and $f(n) = n$.\n\n<strong>Step 2 — compute the watershed $n^{\\log_b a}$.</strong> We have $\\log_b a = \\log_2 3 \\approx 1.585$, so the watershed is $n^{\\log_2 3} \\approx n^{1.585}$.\n\n<strong>Step 3 — compare $f(n)$ to the watershed.</strong> Here $f(n) = n = n^1$, and $1 < \\log_2 3$. So $f$ is <em>polynomially smaller</em> than $n^{\\log_2 3}$: pick $\\varepsilon = \\log_2 3 - 1 \\approx 0.585 > 0$, and then $f(n) = n = n^{\\log_2 3 - \\varepsilon} = O\\!\\big(n^{\\log_b a - \\varepsilon}\\big)$. This is <strong>Case 1 (leaves win)</strong>, so\n$$T(n) = \\Theta\\!\\big(n^{\\log_b a}\\big) = \\Theta\\!\\big(n^{\\log_2 3}\\big) \\approx \\Theta(n^{1.585}).$$\n\n<strong>Step 4 — recursion-tree sanity check.</strong> At level $i$ there are $3^i$ nodes, each of size $n/2^i$ with local cost $n/2^i$. The row total is\n$$3^i \\cdot \\frac{n}{2^i} = n\\left(\\frac{3}{2}\\right)^{i}.$$\nThese rows <em>grow</em> geometrically with ratio $\\tfrac32 > 1$, so the sum is dominated by its last term (the leaves), not the root. The tree has depth $\\log_2 n$, so summing the geometric series:\n$$T(n) = \\sum_{i=0}^{\\log_2 n} n\\left(\\tfrac{3}{2}\\right)^{i} = \\Theta\\!\\left(n\\left(\\tfrac{3}{2}\\right)^{\\log_2 n}\\right).$$\nNow simplify the last term using $(\\tfrac32)^{\\log_2 n} = \\tfrac{3^{\\log_2 n}}{2^{\\log_2 n}} = \\tfrac{n^{\\log_2 3}}{n} = n^{\\log_2 3 - 1}$, so $n \\cdot n^{\\log_2 3 - 1} = n^{\\log_2 3}$.\n\n<strong>Step 5 — cross-check via the leaf count.</strong> The number of leaves is $a^{\\log_b n} = 3^{\\log_2 n} = n^{\\log_2 3}$, each costing $\\Theta(1)$, for a leaf cost of $\\Theta(n^{\\log_2 3})$ — exactly the dominant term. Both checks agree with Case 1.\n\n<strong>Answer:</strong> $T(n) = \\Theta\\!\\big(n^{\\log_2 3}\\big) \\approx \\Theta(n^{1.585})$."
            },
            {
              "title": "An unequal split the Master Theorem cannot touch",
              "body": "Solve $T(n) = T(n/3) + T(2n/3) + n$ with $T(1) = \\Theta(1)$. First explain why the Master Theorem does not apply, then find a tight $\\Theta$-bound directly from the recursion tree.",
              "solution": "<strong>Step 1 — why the Master Theorem is silent.</strong> The theorem requires the form $a\\,T(n/b) + f(n)$: all subproblems must have the <em>same</em> size $n/b$. Here the two children have sizes $n/3$ and $2n/3$ — an <em>unequal split</em> — so there is no single $b$, and the recurrence is outside the theorem's scope. We fall back to the recursion tree.\n\n<strong>Step 2 — bound the work at each level.</strong> The key observation: at every level of the tree, the child sizes are fractions of the parent that <em>sum back to the parent's size</em> (since $\\tfrac{n}{3} + \\tfrac{2n}{3} = n$). So the total local work across all nodes on any one full level is still $n$. Concretely, label each node by its local cost (its own size):\n<ul><li><strong>Level 0:</strong> one node of size $n$, row total $= n$.</li><li><strong>Level 1:</strong> sizes $\\tfrac{n}{3}$ and $\\tfrac{2n}{3}$, row total $= \\tfrac{n}{3} + \\tfrac{2n}{3} = n$.</li><li><strong>Level 2:</strong> sizes $\\tfrac{n}{9}, \\tfrac{2n}{9}, \\tfrac{2n}{9}, \\tfrac{4n}{9}$, row total $= n$.</li></ul>\nSo each level contributes about $n$ (an exact $n$ until branches start hitting the base case).\n\n<strong>Step 3 — count the levels (the tree is lopsided).</strong> Because the split is uneven, the branches bottom out at different depths. The <em>shortest</em> root-to-leaf path keeps dividing by $3$: it has length $\\log_3 n$. The <em>longest</em> path keeps multiplying the size by $\\tfrac23$, reaching $1$ when $(\\tfrac{2}{3})^{k} n = 1$, i.e. $k = \\log_{3/2} n$.\n\n<strong>Step 4 — squeeze with upper and lower bounds.</strong> Until the shortest branch terminates (depth $\\log_3 n$), every level is full and contributes exactly $n$, giving a lower bound\n$$T(n) \\ge n \\cdot \\log_3 n = \\Omega(n \\log n).$$\nNo level ever contributes more than $n$, and there are at most $\\log_{3/2} n + 1$ levels, giving an upper bound\n$$T(n) \\le n \\cdot (\\log_{3/2} n + 1) = O(n \\log n).$$\nSince $\\log_3 n$ and $\\log_{3/2} n$ differ only by a constant factor (change of base: both are $\\Theta(\\log n)$), the upper and lower bounds match.\n\n<strong>Step 5 — conclude.</strong> The two bounds pinch the answer:\n$$T(n) = \\Theta(n \\log n).$$\n\n<strong>Answer:</strong> $T(n) = \\Theta(n\\log n)$ — the same growth as merge sort, found without the Master Theorem. (For unequal splits like this, the Akra–Bazzi method gives the same result mechanically, but the recursion tree already nails it here.)"
            }
          ]
        },
        {
          "id": "a-correctness-invariants",
          "title": "Correctness: Loop Invariants and Induction",
          "minutes": 14,
          "content": "<h3>Why correctness needs proof, not just testing</h3>\n<p>Testing shows the presence of bugs, never their absence. An algorithm that sorts correctly on a million random arrays may still fail on the one input you never tried. To <em>know</em> a loop does what it claims for <strong>all</strong> inputs of <strong>all</strong> sizes, we need a mathematical argument. The two workhorses are the <strong>loop invariant</strong> (for iterative code) and <strong>induction</strong> (the engine underneath it, and the tool of choice for recursion). They are really the same idea wearing two hats.</p>\n<p>This matters far beyond textbook sorting. When you implement gradient descent, an EM update, a beam search, or a replay-buffer eviction policy, the question \"does this loop preserve the property I rely on?\" is exactly a loop-invariant question. Getting it wrong silently corrupts results rather than crashing — the worst kind of bug.</p>\n\n<h3>Proof by induction: the foundation</h3>\n<p>To prove a statement $P(n)$ holds for every natural number $n \\geq n_0$, induction asks for two things:</p>\n<ul>\n<li><strong>Base case:</strong> prove $P(n_0)$ directly.</li>\n<li><strong>Inductive step:</strong> assume $P(k)$ (the <em>inductive hypothesis</em>) and prove $P(k+1)$.</li>\n</ul>\n<p>If both hold, $P(n)$ holds for all $n \\geq n_0$. Intuitively: you can reach any rung of an infinite ladder if you can stand on the first rung and can always step from rung $k$ to rung $k+1$.</p>\n<p><strong>Strong induction</strong> is a variant where the step may assume $P(n_0), P(n_0+1), \\dots, P(k)$ all at once to prove $P(k+1)$. It is logically equivalent to ordinary induction but often more convenient — e.g. analyzing divide-and-conquer where a problem of size $n$ depends on subproblems of sizes $n/2$, or any size $< n$.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A loop invariant is just induction in disguise. The \"rung number\" is the iteration count; the invariant is the property $P$; <em>initialization</em> is the base case; <em>maintenance</em> is the inductive step. Termination converts \"$P$ held at every rung\" into \"$P$ holds at the end, and the end gives the answer.\"</p>\n</div>\n\n<h3>The loop-invariant method</h3>\n<p>A <strong>loop invariant</strong> is a property that is true at a fixed reference point of the loop — conventionally, just before each iteration's guard test — no matter how many iterations have run. To use it as a correctness proof you must establish three things:</p>\n<ol>\n<li><strong>Initialization.</strong> The invariant is true before the first iteration. (Base case.)</li>\n<li><strong>Maintenance.</strong> If the invariant is true before an iteration, it remains true before the next iteration. (Inductive step.)</li>\n<li><strong>Termination.</strong> When the loop exits, the invariant — combined with the reason the loop stopped (the negated guard) — implies the property you actually wanted.</li>\n</ol>\n<p>Initialization and maintenance together show the invariant holds at <em>every</em> iteration boundary, including the last. Termination is what makes the invariant <em>useful</em>: a true-but-vacuous invariant proves nothing. The art is choosing an invariant that is (a) easy to maintain and (b) strong enough at exit to give you the goal. Too weak and termination fails; too strong and maintenance fails. Finding the right one is genuinely the creative part.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Loop invariants generalize to <em>monotone improvement</em> guarantees. The classic proof that the EM algorithm converges is a maintenance argument: each iteration does not decrease the data log-likelihood, an invariant of the form \"$\\mathcal{L}(\\theta_{t+1}) \\geq \\mathcal{L}(\\theta_t)$.\" Policy iteration in RL has the same shape: each step yields a policy at least as good as the last. Once you see the pattern, convergence proofs stop being mysterious.</p>\n</div>\n\n<h3>Worked example: correctness of insertion sort</h3>\n<p>Here is insertion sort on a 0-indexed array <code>A[0..n-1]</code>:</p>\n<pre><code>for j = 1 to n-1:          # outer loop\n    key = A[j]\n    i = j - 1\n    while i >= 0 and A[i] > key:   # inner loop\n        A[i+1] = A[i]\n        i = i - 1\n    A[i+1] = key\n</code></pre>\n\n<h4>The outer-loop invariant</h4>\n<p>State it precisely. At the start of each iteration of the <code>for</code> loop (before processing index $j$):</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Invariant (insertion sort)</div>\n<p>The subarray $A[0..j-1]$ contains exactly the elements that were originally in $A[0..j-1]$, and they are in sorted (non-decreasing) order.</p>\n</div>\n<p>Note both clauses matter: \"sorted\" alone is not enough — an algorithm could sort a prefix by deleting elements. We need the <em>same multiset</em>, sorted. Let us verify the three conditions.</p>\n\n<h4>Initialization</h4>\n<p>Before the first iteration, $j = 1$, so the prefix is $A[0..0]$, a single element. A one-element array is trivially sorted and trivially contains its own original element. The invariant holds. (This is the base case.)</p>\n\n<h4>Maintenance</h4>\n<p>Assume the invariant holds at the start of iteration $j$: $A[0..j-1]$ is a sorted permutation of its original contents. The body saves <code>key = A[j]</code>, then the inner <code>while</code> loop shifts every element of $A[0..j-1]$ that is strictly greater than <code>key</code> one slot to the right, and finally drops <code>key</code> into the gap.</p>\n<p>To be fully rigorous we also need an <strong>inner-loop invariant</strong>: just before each <code>while</code> test, the slot $A[i+1]$ is free (its value already copied), $A[0..i]$ holds the original $A[0..i]$ in sorted order, $A[i+2..j]$ holds the elements of the original $A[i+1..j-1]$ in sorted order and all $> \\texttt{key}$, and the entries $A[0..i] \\cup A[i+2..j] \\cup \\{\\texttt{key}\\}$ together are exactly the original $A[0..j]$. The loop stops when $i < 0$ (key is the new minimum) or $A[i] \\leq \\texttt{key}$. Placing <code>key</code> at $A[i+1]$ then inserts it immediately after an element $\\leq$ it and immediately before elements $>$ it, so $A[0..j]$ is sorted and is a permutation of the original $A[0..j]$.</p>\n<p>Thus at the end of iteration $j$ — i.e. at the <em>start</em> of iteration $j+1$ — the invariant holds for the prefix $A[0..j]$. (This is the inductive step.)</p>\n\n<h4>Termination</h4>\n<p>The <code>for</code> loop exits when $j = n$. Substituting $j = n$ into the invariant: $A[0..n-1]$ is a sorted permutation of the original $A[0..n-1]$ — i.e. the entire array is correctly sorted. That is precisely the specification of sorting. <strong>QED.</strong></p>\n<p>We should also confirm the loops actually <em>terminate</em>. The outer loop runs over finitely many $j$. The inner loop strictly decreases the integer $i$ each pass and stops at $i < 0$, so it cannot run forever. A quantity that strictly decreases toward a fixed bound is called a <strong>loop variant</strong> (or rank function); pairing an invariant with a variant proves <em>total</em> correctness (correct result <em>and</em> guaranteed to halt), versus mere <em>partial</em> correctness (correct <em>if</em> it halts).</p>\n\n<h3>Amortized analysis: averaging cost over a sequence</h3>\n<p>Worst-case-per-operation analysis can be needlessly pessimistic. Some operations are occasionally expensive but cheap the rest of the time, and the expensive ones <em>pay for</em> the cheap ones. <strong>Amortized analysis</strong> bounds the <em>average cost per operation across a worst-case sequence</em> of operations — with no probability involved. It is a worst-case guarantee on the total, divided out. There are three standard techniques.</p>\n\n<h4>1. Aggregate method</h4>\n<p>Bound the total cost $T(n)$ of any sequence of $n$ operations directly, then declare the amortized cost per operation to be $T(n)/n$. Simple, but gives one number for all operation types.</p>\n\n<h4>2. Accounting (banker's) method</h4>\n<p>Assign each operation an <em>amortized charge</em> that may differ from its real cost. When the charge exceeds the real cost, the surplus is stored as <strong>credit</strong> on specific data-structure elements; when an operation's real cost exceeds its charge, it spends stored credit. The method is valid as long as credit never goes negative — then the total charged is an upper bound on total real cost. The intuition: prepay for future expensive work while doing cheap work now.</p>\n\n<h4>3. Potential method</h4>\n<p>Define a <strong>potential function</strong> $\\Phi$ mapping each data-structure state to a real number, with $\\Phi(D_0) = 0$ and $\\Phi(D_i) \\geq 0$ for all $i$ (potential never drops below its start). The amortized cost of the $i$-th operation is its real cost plus the change in potential:</p>\n$$\\hat{c}_i = c_i + \\Phi(D_i) - \\Phi(D_{i-1}).$$\n<p>Summing telescopes the potential terms:</p>\n$$\\sum_{i=1}^{n} \\hat{c}_i = \\sum_{i=1}^{n} c_i + \\Phi(D_n) - \\Phi(D_0) = \\sum_{i=1}^{n} c_i + \\Phi(D_n) \\geq \\sum_{i=1}^{n} c_i.$$\n<p>So whenever $\\Phi(D_n) \\geq 0 = \\Phi(D_0)$, the total amortized cost is an upper bound on the total real cost. Potential is the \"stored credit\" of the accounting method made into a single global quantity — and it is the same idea as a Lyapunov function in dynamics or a potential in physics.</p>\n\n<h3>The canonical example: dynamic-array doubling</h3>\n<p>A dynamic array (C++ <code>vector</code>, Python <code>list</code>, Java <code>ArrayList</code>, Go slice) supports <code>append</code> in $O(1)$ amortized time despite occasionally copying everything. Mechanism: keep a fixed-capacity buffer; on <code>append</code>, if there is room, write in $O(1)$; if full, allocate a new buffer of <strong>double</strong> the capacity, copy all existing elements over (cost proportional to current size), then write. A single <code>append</code> can cost $\\Theta(n)$. Yet $n$ appends cost only $\\Theta(n)$ total — amortized $O(1)$ each. Let us prove it three ways.</p>\n\n<h4>Aggregate analysis</h4>\n<p>Start empty (capacity 1) and do $n$ appends. The cheap part is $n$ writes, cost $n$. Resizes happen when the array is full: copies of size $1, 2, 4, 8, \\dots$ up to the largest power of two below $n$. The copying cost is</p>\n$$\\sum_{k=0}^{\\lfloor \\log_2 n \\rfloor} 2^{k} < 2^{\\lfloor \\log_2 n \\rfloor + 1} \\leq 2n.$$\n<p>(Geometric series: the sum of powers of two is less than twice the last term.) Total cost $< n + 2n = 3n$, so amortized cost per append is $< 3 = O(1)$. The key is that capacity <em>multiplies</em> — geometric growth makes the copy costs a convergent geometric series. Growing by a fixed <em>additive</em> increment instead (say +10 slots) would make resizes cost $\\Theta(n^2)$ total, or $\\Theta(n)$ amortized — a real and common performance bug.</p>\n\n<h4>Accounting analysis</h4>\n<p>Charge each <code>append</code> an amortized cost of <strong>3</strong>. Spend 1 immediately to write the new element. Store 2 credits on that element. When the array next doubles from size $m$ to $2m$, the $m$ elements being copied each pay for their own move using one of their stored credits — and there is exactly enough, because every element since the last doubling deposited credit and was not yet moved. Each element is copied once per doubling and the doubling that moves it is funded by the credit it banked. Credit is never negative, so total real cost $\\leq 3n$. Amortized cost is $3 = O(1)$ per append. (A charge of 3 works for a fresh element plus re-funding; the precise constant depends on exactly when you count the copy, but it is a small constant either way.)</p>\n\n<h4>Potential analysis</h4>\n<p>Let $\\texttt{num}$ be the number of stored elements and $\\texttt{cap}$ the capacity. Define</p>\n$$\\Phi = 2\\cdot\\texttt{num} - \\texttt{cap}.$$\n<p>Right after a doubling, $\\texttt{num} = \\texttt{cap}/2$, so $\\Phi = 2(\\texttt{cap}/2) - \\texttt{cap} = 0$. Just before a doubling, $\\texttt{num} = \\texttt{cap}$, so $\\Phi = 2\\texttt{cap} - \\texttt{cap} = \\texttt{cap} = \\texttt{num}$ — exactly enough banked potential to pay for the imminent copy. And $\\Phi \\geq 0$ whenever the array is at least half full, which the doubling policy guarantees from the first resize onward (with $\\Phi(D_0)=0$). Now check amortized costs:</p>\n<ul>\n<li><strong>Append without resize</strong> (real cost 1): $\\texttt{num}$ rises by 1, $\\texttt{cap}$ unchanged, so $\\Delta\\Phi = 2$. Amortized $\\hat{c} = 1 + 2 = 3$.</li>\n<li><strong>Append with resize</strong> from $\\texttt{cap}=m=\\texttt{num}$ to $2m$: real cost is $m$ (copy) $+1$ (write) $= m+1$. Before: $\\Phi = 2m - m = m$. After: $\\texttt{num}=m+1$, $\\texttt{cap}=2m$, so $\\Phi = 2(m+1) - 2m = 2$. Thus $\\Delta\\Phi = 2 - m$ and $\\hat{c} = (m+1) + (2 - m) = 3$.</li>\n</ul>\n<p>Every append has amortized cost exactly 3, so $n$ appends cost $\\leq 3n$ real time. All three methods agree: <strong>$O(1)$ amortized per append.</strong></p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML/AI</div>\n<p>Doubling is everywhere in practice: growing a feature buffer during streaming feature extraction, accumulating tokens in a tokenizer, the dynamic resizing of an experience-replay buffer, or appending to a trajectory in an RL rollout. Knowing it is $O(1)$ amortized — not $O(n)$ — is why you can build vectors element-by-element in a tight loop without quadratic blowup. The same geometric-growth trick explains why exponential learning-rate warmup schedules and capacity-doubling hash tables behave well.</p>\n</div>\n\n<h3>Subtleties worth internalizing</h3>\n<ul>\n<li><strong>Amortized is not average-case.</strong> Amortized cost is a deterministic worst-case bound on a <em>sequence</em>; average-case is an expectation over random <em>inputs</em>. No randomness is involved in doubling.</li>\n<li><strong>Amortized bounds can be defeated by adversarial timing.</strong> If you mix appends with operations that shrink capacity poorly — e.g. halving capacity the instant the array drops below half full — an adversary can force a resize on every other op, destroying the amortized bound. The standard fix is to shrink only when the array falls below <em>one quarter</em> full (shrink to half), leaving hysteresis so growth and shrink thresholds don't thrash.</li>\n<li><strong>Invariant + variant = total correctness.</strong> Always ask both \"what is preserved?\" and \"what strictly decreases toward a bound?\" The second is what rules out infinite loops.</li>\n<li><strong>Strengthening the invariant.</strong> If maintenance won't go through, the usual fix is to <em>strengthen</em> the invariant (assume more) until the step closes — provided the stronger version still holds at initialization. This is the discrete analogue of strengthening an inductive hypothesis.</li>\n</ul>\n\n<h3>Summary</h3>\n<p>Correctness proofs for loops have three obligations — initialization, maintenance, termination — which are exactly the base case and inductive step of induction plus a payoff at exit. Total correctness additionally needs a decreasing variant. Amortized analysis bounds the cost of a worst-case <em>sequence</em>: the aggregate method totals directly, the accounting method banks credit on elements, and the potential method tracks a single global $\\Phi$ whose telescoping change funds expensive operations. Dynamic-array doubling is the canonical case: geometric growth turns occasional $\\Theta(n)$ copies into $O(1)$ amortized appends, a fact you rely on every time you build a list in a loop.</p>",
          "mcq": [
            {
              "q": "In the loop-invariant method, what is the specific role of the <em>termination</em> condition (as opposed to initialization and maintenance)?",
              "choices": [
                "It proves the loop runs in finite time",
                "It combines the invariant with the negated loop guard to show the desired final property holds",
                "It establishes the invariant before the first iteration",
                "It shows the invariant is preserved by one iteration"
              ],
              "answer": 1,
              "explain": "Initialization and maintenance prove the invariant holds at every iteration boundary; termination uses the invariant at exit together with why the loop stopped to derive the actual goal. Proving finite running time is the job of a separate loop variant."
            },
            {
              "q": "Why does a dynamic array that grows by a fixed additive increment of 10 slots (instead of doubling) have $\\Theta(n)$ amortized append cost rather than $O(1)$?",
              "choices": [
                "Because each individual append still writes one element",
                "Because copy costs form an arithmetic series summing to $\\Theta(n^2)$, so per-op cost is $\\Theta(n)$",
                "Because additive growth uses more total memory",
                "Because the potential function becomes negative"
              ],
              "answer": 1,
              "explain": "With +10 growth, resizes copy $10, 20, 30, \\dots, \\approx n$ elements, an arithmetic series of total cost $\\Theta(n^2)$; dividing by $n$ gives $\\Theta(n)$ amortized. Geometric (doubling) growth instead yields a convergent geometric series summing to $\\Theta(n)$ total."
            },
            {
              "q": "For the potential method to guarantee that total amortized cost upper-bounds total real cost, what must hold?",
              "choices": [
                "$\\Phi$ must be strictly decreasing",
                "$\\Phi(D_i) \\geq \\Phi(D_0)$ for all $i$, conventionally with $\\Phi(D_0)=0$ and $\\Phi(D_i)\\geq 0$",
                "Every operation must have equal real cost",
                "$\\Phi$ must equal the real cost of each operation"
              ],
              "answer": 1,
              "explain": "Telescoping gives $\\sum \\hat{c}_i = \\sum c_i + \\Phi(D_n) - \\Phi(D_0)$; the amortized sum bounds the real sum precisely when $\\Phi(D_n) \\geq \\Phi(D_0)$, which the standard requirements ($\\Phi(D_0)=0$, $\\Phi \\geq 0$) ensure for every prefix."
            },
            {
              "q": "What is the correct distinction between amortized cost and average-case cost?",
              "choices": [
                "They are the same thing computed differently",
                "Amortized is a worst-case bound over a sequence of operations with no randomness; average-case is an expectation over random inputs",
                "Amortized assumes random inputs; average-case is deterministic",
                "Amortized applies only to sorting; average-case applies only to data structures"
              ],
              "answer": 1,
              "explain": "Amortized analysis gives a deterministic guarantee on the total cost of a worst-case operation sequence (then divided per op). Average-case analysis takes an expectation over a probability distribution on inputs. Doubling is amortized, not average-case, since no randomness is involved."
            },
            {
              "q": "In the loop-invariant method, which part of the proof corresponds to the <strong>inductive step</strong> of a proof by induction?",
              "choices": [
                "Initialization",
                "Maintenance",
                "Termination",
                "The loop guard test"
              ],
              "answer": 1,
              "explain": "Maintenance shows that if the invariant holds before an iteration it still holds before the next one, exactly mirroring assuming $P(k)$ and proving $P(k+1)$. Initialization is the base case, and termination uses the invariant at exit to conclude correctness."
            },
            {
              "q": "Why does the lesson insist that correctness needs a proof rather than extensive testing?",
              "choices": [
                "Testing is slower than writing a proof",
                "Testing can demonstrate the presence of bugs but never their absence across all inputs",
                "Proofs run faster than test suites at runtime",
                "Random arrays are not representative of real workloads"
              ],
              "answer": 1,
              "explain": "Passing a million random tests cannot guarantee correctness on the one untried input, so only a proof covers all inputs of all sizes. This is Dijkstra's point: testing shows presence, not absence, of bugs."
            },
            {
              "q": "Strong induction is described as especially convenient for analyzing divide-and-conquer because it lets the inductive step assume:",
              "choices": [
                "Only $P(k)$, the single previous case",
                "Only the base case $P(n_0)$",
                "All of $P(n_0), P(n_0+1), \\dots, P(k)$ at once",
                "$P(k+1)$ in order to prove $P(k)$"
              ],
              "answer": 2,
              "explain": "A size-$n$ subproblem may depend on subproblems of size $n/2$ or smaller, so being able to assume every smaller case (not just the immediately preceding one) is what makes strong induction handy. Ordinary induction would only grant $P(k)$, which is awkward for halving recurrences."
            },
            {
              "q": "A property is claimed to be a loop invariant but is only verified to be true *after the loop finishes*, never before each guard test. What is the flaw?",
              "choices": [
                "It skips initialization and maintenance, so it proves nothing about the loop's behavior across iterations",
                "It is fine, since termination is the only part that matters",
                "It confuses strong induction with ordinary induction",
                "Invariants are required to hold inside the loop body, not at the guard test"
              ],
              "answer": 0,
              "explain": "An invariant must be established at initialization and preserved by maintenance at the reference point before each guard test; checking only the final state is just inspecting the output, not proving correctness. Without init+maintenance, you have not shown the property holds throughout the iterations."
            },
            {
              "q": "You prove a loop invariant's initialization and maintenance correctly, but the invariant you chose is so weak that, combined with the loop's exit condition, it does not imply the algorithm's postcondition. What does this tell you?",
              "choices": [
                "The proof is invalid because maintenance secretly failed",
                "The proof is structurally sound but useless — a correct invariant must be strong enough that invariant-plus-exit-condition yields the desired result",
                "The base case (initialization) must have been skipped",
                "Loop invariants cannot prove postconditions; only induction on input size can"
              ],
              "answer": 1,
              "explain": "Initialization and maintenance can both hold for a true-but-too-weak invariant; the missing piece is that termination must let you conclude the postcondition, so the invariant has to be chosen strong enough. The other options misattribute the gap to a failed step rather than to invariant selection."
            },
            {
              "q": "Consider summing an array: before each iteration $i$ (1-indexed, $i$ ranging from 1 to $n+1$), the invariant is \"$s$ equals the sum of $A[1..i-1]$.\" For the maintenance step you must show that:",
              "choices": [
                "The invariant holds when $i = 1$, i.e. $s = 0$",
                "Assuming $s = \\sum_{j=1}^{i-1} A[j]$ at the start of iteration $i$, after executing $s \\mathrel{+}= A[i]$ it equals $\\sum_{j=1}^{i} A[j]$, matching the invariant for $i+1$",
                "When the loop exits at $i = n+1$, $s = \\sum_{j=1}^{n} A[j]$",
                "$s$ never exceeds the maximum element of $A$"
              ],
              "answer": 1,
              "explain": "Maintenance is the inductive step: assume the invariant before iteration $i$, then show the body re-establishes it for the next iteration ($i+1$). Choice 0 is initialization, choice 2 is termination, and choice 3 is not the invariant at all."
            },
            {
              "q": "A common claim is \"strong induction is more powerful than ordinary induction, so some statements provable by strong induction cannot be proved by ordinary induction.\" Why is this misleading?",
              "choices": [
                "Strong induction has no base case, so it actually proves strictly fewer statements",
                "They are logically equivalent — any strong-induction proof can be mechanically converted to an ordinary-induction proof (e.g. by strengthening the hypothesis to \"$P$ holds for all values up to $k$\"); strong induction is a convenience, not extra deductive power",
                "Ordinary induction can only handle linear recurrences, while strong induction handles all recurrences",
                "Strong induction requires proving infinitely many base cases, making it weaker in practice"
              ],
              "answer": 1,
              "explain": "Strong and ordinary induction are interderivable: take $Q(n) = $ \"$P(m)$ for all $m \\le n$\" and an ordinary-induction proof of $Q$ yields the strong-induction conclusion. The 'more powerful' framing confuses convenience with logical strength."
            },
            {
              "q": "Why is the loop invariant for a recursive divide-and-conquer routine usually phrased as an induction on input size rather than on a loop counter?",
              "choices": [
                "Recursive procedures have no notion of state changing across iterations, so loop invariants are mathematically undefined for them",
                "Recursion has no explicit loop variable; the natural quantity that decreases toward a base case is the subproblem size, so the inductive hypothesis is best stated over smaller instances",
                "Induction on size is required because recursion always halves the input exactly",
                "Loop invariants and induction are unrelated, so recursion must use a fundamentally different proof technique"
              ],
              "answer": 1,
              "explain": "A recursive call's correctness rests on assuming correctness for smaller inputs, so induction on subproblem size is the natural framing — there is no loop counter to track. The lesson stresses that invariants and induction are the same idea, so the claim they are unrelated (choice 3) is wrong, and choice 2 wrongly assumes exact halving."
            },
            {
              "q": "A correctness proof by loop invariant has three parts. What are they?",
              "choices": [
                "Setup, Iteration, and Cleanup",
                "Base case, Hypothesis, and Conclusion",
                "Precondition, Loop body, and Postcondition",
                "Initialization, Maintenance, and Termination"
              ],
              "answer": 3,
              "explain": "You show the invariant holds before the loop (<strong>Initialization</strong>), that each iteration preserves it (<strong>Maintenance</strong>), and that on exit the invariant plus the loop's stopping condition give the desired result (<strong>Termination</strong>). The first two mirror the base case and inductive step of induction."
            },
            {
              "q": "In a proof by induction that a statement $P(n)$ holds for all $n\\ge 1$, what must the base case establish?",
              "choices": [
                "That $P(n)$ holds as $n\\to\\infty$",
                "That $P$ holds for the smallest value, $P(1)$",
                "That $P(n)$ implies $P(n+1)$",
                "That $P$ holds for all even $n$"
              ],
              "answer": 1,
              "explain": "The base case anchors the induction by proving the statement for the smallest value (here $P(1)$). Showing $P(n)\\Rightarrow P(n+1)$ is the separate inductive step; without a true base case the chain of implications has nothing to stand on."
            },
            {
              "q": "Linear search scans $a[0..n-1]$ for a key, examining indices $i=0,1,2,\\dots$ in order. Which statement is a correct loop invariant, holding just before the iteration that examines index $i$?",
              "choices": [
                "The array $a$ is sorted",
                "$a[i]$ is equal to the key",
                "The key does not appear anywhere in $a[0..i-1]$",
                "$i = n$"
              ],
              "answer": 2,
              "explain": "Before examining index $i$, the algorithm has already checked $a[0],\\dots,a[i-1]$ without finding the key — so 'the key is not in $a[0..i-1]$' is preserved each iteration. With the termination condition it proves the search correct whether or not the key exists."
            },
            {
              "q": "In a loop-invariant proof, what exactly does the <strong>maintenance</strong> step show?",
              "choices": [
                "If the invariant holds before an iteration, it still holds before the next iteration",
                "That the invariant is true before the loop begins",
                "That the loop eventually terminates",
                "That the invariant implies the postcondition"
              ],
              "answer": 0,
              "explain": "Maintenance is the inductive step: assuming the invariant holds at the start of an arbitrary iteration, the loop body re-establishes it for the next one. Being true initially is <em>initialization</em>; using it after the loop is <em>termination</em>."
            }
          ],
          "flashcards": [
            {
              "front": "What three conditions must a loop invariant satisfy to prove correctness, and which parts of induction do they correspond to?",
              "back": "Initialization (= base case): true before the first iteration. Maintenance (= inductive step): preserved by one iteration. Termination: at loop exit, invariant + negated guard implies the desired result."
            },
            {
              "front": "Partial vs. total correctness, and what proves each?",
              "back": "Partial correctness: produces the right answer IF it halts (proved by a loop invariant). Total correctness: right answer AND guaranteed to halt (invariant + a loop variant / rank function that strictly decreases toward a bound)."
            },
            {
              "front": "State the outer-loop invariant for insertion sort.",
              "back": "At the start of the iteration processing index $j$, the subarray $A[0..j-1]$ is a sorted (non-decreasing) permutation of the elements originally in $A[0..j-1]$. At exit ($j=n$) the whole array is sorted."
            },
            {
              "front": "Potential method: formula for amortized cost and the condition that makes it a valid upper bound.",
              "back": "$\\hat{c}_i = c_i + \\Phi(D_i) - \\Phi(D_{i-1})$. Telescoping gives $\\sum \\hat{c}_i = \\sum c_i + \\Phi(D_n) - \\Phi(D_0)$, an upper bound on real cost when $\\Phi(D_0)=0$ and $\\Phi(D_i) \\geq 0$ for all $i$."
            },
            {
              "front": "Why is appending to a doubling dynamic array $O(1)$ amortized despite worst-case $\\Theta(n)$ copies?",
              "back": "Capacity grows geometrically, so copy costs $1+2+4+\\cdots < 2n$ form a convergent geometric series. Total for $n$ appends is $< 3n$, hence $O(1)$ amortized. A valid potential is $\\Phi = 2\\cdot\\text{num} - \\text{cap}$, giving amortized cost 3 per append."
            },
            {
              "front": "The three amortized-analysis methods in one line each.",
              "back": "Aggregate: bound total cost $T(n)$, charge $T(n)/n$ each. Accounting/banker's: prepay operations and bank credit on elements (credit never negative). Potential: track one global $\\Phi$ whose decrease funds expensive ops."
            }
          ],
          "homework": [
            {
              "prompt": "Prove that the iterative algorithm computing the sum of an array $A[0..n-1]$ — initialize $s=0$, then for $i=0$ to $n-1$ do $s = s + A[i]$ — is correct, using a loop invariant. State the invariant and verify initialization, maintenance, and termination.",
              "hint": "Pick an invariant describing the value of $s$ in terms of how many elements have been processed so far. What should $s$ equal just before the iteration that handles index $i$?",
              "solution": "Invariant: at the start of the iteration with loop counter $i$, $s = \\sum_{k=0}^{i-1} A[k]$ (the sum of the first $i$ elements; an empty sum is 0). Initialization: when $i=0$, the claimed value is the empty sum $=0$, which matches the initialization $s=0$. Maintenance: assume $s = \\sum_{k=0}^{i-1} A[k]$ at the start of iteration $i$. The body executes $s = s + A[i]$, giving $s = \\sum_{k=0}^{i-1} A[k] + A[i] = \\sum_{k=0}^{i} A[k]$, which is exactly the invariant for counter $i+1$. Termination: the loop exits when $i = n$; substituting into the invariant gives $s = \\sum_{k=0}^{n-1} A[k]$, the sum of all elements. The loop runs over finitely many $i$, so it halts (total correctness). QED."
            },
            {
              "prompt": "Compute, exactly, the total number of element-copy operations performed by resizing during $n=1000$ appends to a dynamic array that starts at capacity 1 and doubles when full. Then give the amortized number of copies per append.",
              "hint": "Resizes occur as capacity passes through powers of two: copying $1, 2, 4, 8, \\dots$ elements. List which doublings happen before you exceed 1000, and sum the elements copied.",
              "solution": "Starting at capacity 1, a resize that copies $2^k$ elements happens when the array is full at size $2^k$ and you append the $(2^k+1)$-th element. With 1000 appends, capacities reached are $1,2,4,\\dots,512,1024$. Copies occur when growing past sizes $1,2,4,8,16,32,64,128,256,512$ (the resize past 512 happens on the 513th append, well within 1000; the next would be past 1024, which needs a 1025th append and does not occur). Total copies $= 1+2+4+8+16+32+64+128+256+512 = 2^{10}-1 = 1023$. Amortized copies per append $= 1023/1000 \\approx 1.02$, i.e. just over one copy per append — consistent with the bound of $< 2$ copies/append from the geometric series $\\sum 2^k < 2n$."
            },
            {
              "prompt": "Consider a stack with operations Push (cost 1) and a Multipop(k) that pops the top $\\min(k, \\text{size})$ elements, costing 1 per element actually popped. Prove that any sequence of $n$ operations (each Push or Multipop) on an initially empty stack costs $O(n)$ total, using the potential method. Define $\\Phi$ and compute amortized costs.",
              "hint": "What single nonnegative quantity grows by 1 on each Push and is the source of all popping cost? Choose $\\Phi$ equal to that quantity and check $\\hat{c}$ for both operations.",
              "solution": "Let $\\Phi(D) = $ number of elements currently on the stack. Then $\\Phi(D_0)=0$ (empty start) and $\\Phi \\geq 0$ always, so the potential method's preconditions hold. Push: real cost $c=1$; the stack grows by one element, so $\\Delta\\Phi = +1$; amortized $\\hat{c} = 1 + 1 = 2$. Multipop(k): suppose it pops $m = \\min(k,\\text{size})$ elements; real cost $c=m$; the stack shrinks by $m$, so $\\Delta\\Phi = -m$; amortized $\\hat{c} = m + (-m) = 0$. (If $m=0$ the stack was empty, cost 0, $\\Delta\\Phi=0$, $\\hat c=0$.) Every operation has amortized cost at most 2, so total cost $\\leq \\sum \\hat{c}_i = 2n$, and since $\\Phi(D_n)\\geq 0 = \\Phi(D_0)$ the real total $\\sum c_i \\leq \\sum \\hat c_i \\leq 2n = O(n)$. Each operation is therefore $O(1)$ amortized. Intuition: each element can be popped at most once after being pushed, so total pops cannot exceed total pushes; the Pushes (each prepaying 1 extra credit) fund all future Multipop work."
            }
          ],
          "examples": [
            {
              "title": "Tracing the loop invariant of insertion sort on $[5,2,4,1]$",
              "body": "Run insertion sort on the concrete array $A = [5,2,4,1]$ (0-indexed, $n=4$). For each outer iteration $j=1,2,3$, show the array after the iteration finishes and verify that the outer-loop invariant — <em>$A[0..j-1]$ is a sorted permutation of its original contents</em> — holds at the start of the next iteration.",
              "solution": "We use the code from the lesson: for $j=1$ to $n-1$, save $\\texttt{key}=A[j]$, shift every earlier element greater than $\\texttt{key}$ right by one, and drop $\\texttt{key}$ into the gap. We track the array and check the invariant at each iteration boundary.\n\n<strong>Initialization ($j=1$).</strong> The prefix is $A[0..0]=[5]$. A single element is trivially sorted and is its own original content, so the invariant holds. Full array: $[5,2,4,1]$.\n\n<strong>Iteration $j=1$.</strong> $\\texttt{key}=A[1]=2$, $i=0$. Inner test: $A[0]=5>2$, so shift: $A[1]\\leftarrow 5$, giving $[5,5,4,1]$, then $i=-1$. Loop stops ($i<0$). Place $\\texttt{key}$: $A[0]\\leftarrow 2$, giving $[2,5,4,1]$.\nInvariant check at start of $j=2$: prefix $A[0..1]=[2,5]$ — sorted, and a permutation of the original $\\{5,2\\}$. Holds.\n\n<strong>Iteration $j=2$.</strong> $\\texttt{key}=A[2]=4$, $i=1$. Test: $A[1]=5>4$, shift: $A[2]\\leftarrow 5$, giving $[2,5,5,1]$, $i=0$. Test: $A[0]=2>4$? No, stop. Place: $A[1]\\leftarrow 4$, giving $[2,4,5,1]$.\nInvariant check at start of $j=3$: prefix $A[0..2]=[2,4,5]$ — sorted, permutation of original $\\{5,2,4\\}$. Holds.\n\n<strong>Iteration $j=3$.</strong> $\\texttt{key}=A[3]=1$, $i=2$. Test: $A[2]=5>1$, shift $\\Rightarrow [2,4,5,5]$, $i=1$. Test: $A[1]=4>1$, shift $\\Rightarrow [2,4,4,5]$, $i=0$. Test: $A[0]=2>1$, shift $\\Rightarrow [2,2,4,5]$, $i=-1$. Stop. Place: $A[0]\\leftarrow 1$, giving $[1,2,4,5]$.\n\n<strong>Termination ($j=n=4$).</strong> The invariant with $j=4$ says $A[0..3]$ is a sorted permutation of the original — and indeed $[1,2,4,5]$ is exactly the sorted multiset of $\\{5,2,4,1\\}$. Each shift strictly decreased the integer $i$ toward the bound $i=-1$, so every inner loop halted; the outer loop ran over finitely many $j$. We have correct output and guaranteed halting.\n\n<strong>Answer:</strong> the array boundaries are $[5\\,|\\,2,4,1]\\to[2,5\\,|\\,4,1]\\to[2,4,5\\,|\\,1]\\to[1,2,4,5]$, and the invariant held at every boundary, so insertion sort is correct on this instance: $[1,2,4,5]$."
            },
            {
              "title": "Proving $\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$ and checking it against a running loop",
              "body": "Consider the loop that computes the sum of the first $n$ squares: initialize $s=0$, then for $i=1$ to $n$ do $s \\mathrel{+}= i^2$. Prove by induction that this loop's output equals the closed form $S(n)=\\frac{n(n+1)(2n+1)}{6}$, and verify the proof concretely for $n=3$ by also tracing the loop.",
              "solution": "We prove $P(n)$: \"$\\sum_{k=1}^{n} k^2 = \\dfrac{n(n+1)(2n+1)}{6}$\" for all $n\\ge 1$. This is the closed form the loop should produce, since the loop invariant <em>at the start of iteration $i$, $s=\\sum_{k=1}^{i-1}k^2$</em> gives $s=\\sum_{k=1}^{n}k^2$ at exit ($i=n+1$).\n\n<strong>Base case ($n=1$).</strong> Left side: $\\sum_{k=1}^{1}k^2 = 1$. Right side: $\\dfrac{1\\cdot 2\\cdot 3}{6}=\\dfrac{6}{6}=1$. Equal, so $P(1)$ holds.\n\n<strong>Inductive step.</strong> Assume $P(k)$: $\\displaystyle\\sum_{j=1}^{k} j^2 = \\frac{k(k+1)(2k+1)}{6}$ (the inductive hypothesis). We prove $P(k+1)$:\n$$\\sum_{j=1}^{k+1} j^2 = \\underbrace{\\sum_{j=1}^{k} j^2}_{\\text{use IH}} + (k+1)^2 = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2.$$\nFactor out $\\dfrac{k+1}{6}$:\n$$= \\frac{k+1}{6}\\Big[\\,k(2k+1) + 6(k+1)\\,\\Big] = \\frac{k+1}{6}\\big[2k^2 + 7k + 6\\big].$$\nFactor the bracket: $2k^2+7k+6 = (k+2)(2k+3)$. Hence\n$$\\sum_{j=1}^{k+1} j^2 = \\frac{(k+1)(k+2)(2k+3)}{6} = \\frac{(k+1)\\big((k+1)+1\\big)\\big(2(k+1)+1\\big)}{6},$$\nwhich is exactly $S(k+1)$. So $P(k)\\Rightarrow P(k+1)$.\n\nBy induction $P(n)$ holds for all $n\\ge 1$, so the loop's output equals $\\frac{n(n+1)(2n+1)}{6}$.\n\n<strong>Concrete check, $n=3$ (trace the loop).</strong> Invariant at start of each iteration $s=\\sum_{k=1}^{i-1}k^2$: start $s=0$ ($i=1$, empty sum $=0$ ✓). Iteration $i=1$: $s=0+1=1$; at start of $i=2$, $\\sum_{k=1}^{1}=1$ ✓. Iteration $i=2$: $s=1+4=5$; at start of $i=3$, $\\sum_{k=1}^{2}=5$ ✓. Iteration $i=3$: $s=5+9=14$; at exit ($i=4$), $\\sum_{k=1}^{3}=14$ ✓. Closed form: $\\dfrac{3\\cdot 4\\cdot 7}{6}=\\dfrac{84}{6}=14$.\n\n<strong>Answer:</strong> the identity $\\sum_{k=1}^{n}k^2 = \\frac{n(n+1)(2n+1)}{6}$ holds by induction, and both the loop trace and the formula give $14$ at $n=3$, confirming the algorithm is correct."
            }
          ]
        }
      ]
    },
    {
      "id": "a-data-structures",
      "title": "Core Data Structures",
      "lessons": [
        {
          "id": "a-arrays-lists-stacks-queues",
          "title": "Arrays, Linked Lists, Stacks, Queues",
          "minutes": 14,
          "content": "<h3>The One Idea Behind All Four Structures</h3>\n<p>Arrays, linked lists, stacks, and queues look like four separate topics in a textbook. They are really one idea seen from different angles. The idea is a single design decision that ripples through every operation you will ever perform on a collection:</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>How do you keep track of <em>where the next element lives</em>? You either put elements <strong>next to each other in memory</strong> (contiguous), so position is implied by arithmetic, or you let elements live <strong>anywhere</strong> and store an explicit <strong>pointer</strong> from each one to the next. Everything else — fast indexing, cheap insertion, resizing cost — falls out of that one choice.</p></div>\n<p>Stacks and queues are not a third option. They are <em>policies</em> (which end you are allowed to touch) layered on top of either an array or a linked list. So there are really two physical layouts and a couple of access disciplines. Master the layout tradeoff and the rest is bookkeeping.</p>\n\n<h3>Layout 1: Contiguous Memory (Arrays)</h3>\n<p>An array stores $n$ elements in one unbroken block of memory. If the block starts at address $b$ and each element occupies $s$ bytes, then element $i$ lives at</p>\n$$\\text{addr}(i) = b + s \\cdot i.$$\n<p>This is the whole reason arrays exist. To read or write element $i$, the CPU computes one multiply-add and dereferences — no traversal, no matter how large $i$ is. That is <strong>random access in $O(1)$</strong>: every position is equally cheap to reach.</p>\n<h4>Why arrays are fast in practice, not just in theory</h4>\n<p>The $O(1)$ formula undersells arrays. Because elements are adjacent, scanning an array streams cleanly through the CPU cache: when you touch element $i$, the hardware prefetches $i+1, i+2, \\dots$ into a cache line for free. This <strong>spatial locality</strong> often makes an array 10–50x faster than a pointer structure with the same asymptotic complexity. This is exactly why machine-learning tensors (NumPy <code>ndarray</code>, PyTorch tensors) are contiguous arrays under the hood: a matrix multiply or a gradient update streams through memory, and contiguity is what lets the BLAS kernels and the SIMD/GPU lanes stay fed.</p>\n<h4>The cost: insertion, deletion, and a fixed size</h4>\n<p>Contiguity is a promise that there are no gaps. To insert at position $i$, you must shift every later element one slot to the right to make room; to delete, you shift them left to close the hole. On average that is half the array, so insertion and deletion <em>in the middle</em> are $\\Theta(n)$. Inserting/removing at the very <em>end</em> touches nothing else and is $O(1)$.</p>\n\n<h3>Dynamic Arrays: Amortized $O(1)$ Append</h3>\n<p>A raw array has a fixed capacity. A <strong>dynamic array</strong> (C++ <code>std::vector</code>, Java <code>ArrayList</code>, Python <code>list</code>, Go slice) hides this by tracking two numbers: <code>size</code> (elements in use) and <code>capacity</code> (slots allocated). Appending is $O(1)$ while there is spare capacity. When full, it allocates a bigger block (typically $2\\times$), copies everything over, and frees the old block — an $O(n)$ event.</p>\n<p>That occasional $O(n)$ copy sounds alarming, but it is rare enough to vanish when averaged. Suppose we double capacity and append $n$ items starting from capacity 1. Copies happen at sizes $1, 2, 4, \\dots, n$, so total copy work is</p>\n$$1 + 2 + 4 + \\cdots + n = \\sum_{k=0}^{\\log_2 n} 2^k = 2n - 1 = O(n).$$\n<p>Spread across $n$ appends, that is $O(1)$ <strong>per append on average</strong>. This is <em>amortized</em> analysis: the cost of an expensive operation is charged in advance to the cheap ones around it.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why the growth factor matters</div><p>Doubling gives geometric growth, which is what makes the sum collapse to $O(n)$. If instead you grew by a <em>fixed</em> amount $c$ each time, resizes happen every $c$ appends, total copy work is $c + 2c + \\cdots + n \\approx n^2/(2c) = \\Theta(n^2)$, and each append costs $\\Theta(n)$ amortized. The lesson: grow <strong>multiplicatively</strong>, never additively. (Real implementations often use $1.5\\times$ to let freed blocks be reused by later allocations — a memory-fragmentation tradeoff, not an asymptotic one.)</p></div>\n\n<h3>Layout 2: Pointers (Linked Lists)</h3>\n<p>A linked list abandons contiguity. Each element is a <strong>node</strong>: a small struct holding the value plus a pointer to the next node. The list itself is just a reference to the first node (the <strong>head</strong>); the last node points to <code>null</code>.</p>\n<pre><code>// Singly linked list node\nstruct Node {\n    T     value;\n    Node* next;   // null at the tail\n};</code></pre>\n<h4>What pointers buy you</h4>\n<p>If you already hold a reference to a node, <strong>splicing</strong> a new node in or out is $O(1)$: you rewrite a constant number of pointers, with no shifting and no reallocation.</p>\n<pre><code>// Insert newNode after p  (singly linked)\nnewNode.next = p.next;\np.next       = newNode;</code></pre>\n<h4>What pointers cost you</h4>\n<p>There is no address arithmetic, so reaching element $i$ means walking from the head $i$ times: indexing is $\\Theta(n)$. Each node is a separate allocation scattered across the heap, so traversal jumps around memory, causing cache misses — the opposite of the array's streaming behavior. And every node pays a <strong>memory overhead</strong> of one pointer (8 bytes on a 64-bit machine; <em>two</em> for a doubly linked list), which can dwarf the payload for small values.</p>\n<h4>Singly vs doubly linked</h4>\n<p>A <strong>doubly linked list</strong> adds a <code>prev</code> pointer to every node, so you can traverse backward and, crucially, delete a node given <em>only</em> a reference to it (a singly linked list needs the predecessor, forcing an $O(n)$ search). Maintaining a <code>tail</code> pointer additionally makes append-at-end $O(1)$. The price is the extra pointer per node and more pointer-juggling on every update.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The array-vs-list split is the same tradeoff that reappears everywhere in systems: <strong>computed location vs stored location</strong>. Hash tables compute a slot from a key; B-trees and database indexes mix contiguous pages with pointers between them; even a neural network's weight matrix is a contiguous array precisely so the location of $w_{ij}$ is arithmetic, not a lookup. When you see \"we traded random access for cheap insertion\" you are watching this one decision play out.</p></div>\n\n<h3>The Operation Tables (Memorize These)</h3>\n<p>Below, \"by index\" means you are given a position $i$; \"by reference\" means you already hold the node. Amortized costs are marked.</p>\n<h4>Dynamic array</h4>\n<ul>\n<li>Access / update by index: $O(1)$</li>\n<li>Append at end: $O(1)$ amortized</li>\n<li>Pop from end: $O(1)$</li>\n<li>Insert / delete at front or middle: $O(n)$ (shifting)</li>\n<li>Search (unsorted): $O(n)$</li>\n</ul>\n<h4>Singly linked list (with head and tail pointers)</h4>\n<ul>\n<li>Access by index: $O(n)$</li>\n<li>Insert / delete at front: $O(1)$</li>\n<li>Insert at tail: $O(1)$ (with tail pointer)</li>\n<li>Delete at tail: $O(n)$ (must find the new tail's predecessor)</li>\n<li>Insert / delete after a given node: $O(1)$</li>\n</ul>\n<h4>Doubly linked list (with head and tail pointers)</h4>\n<ul>\n<li>Access by index: $O(n)$</li>\n<li>Insert / delete at either end: $O(1)$</li>\n<li>Delete a given node (by reference): $O(1)$</li>\n<li>Search: $O(n)$</li>\n</ul>\n<p>One row to never confuse: <em>deleting a known node</em> is $O(1)$ in a doubly linked list but $O(n)$ in a dynamic array (you still shift) — yet <em>random access</em> is $O(1)$ in the array and $O(n)$ in any list. They are mirror images.</p>\n\n<h3>Stacks and Queues: Policies, Not New Structures</h3>\n<p>A <strong>stack</strong> exposes one end. <code>push</code> adds to the top, <code>pop</code> removes the top: <strong>LIFO</strong> (last-in, first-out). Think of a stack of plates, the call stack of a running program, or undo history.</p>\n<p>A <strong>queue</strong> exposes both ends with opposite roles. <code>enqueue</code> adds at the back, <code>dequeue</code> removes from the front: <strong>FIFO</strong> (first-in, first-out). Think of a checkout line, a task scheduler, or BFS frontier exploration. A <strong>deque</strong> (double-ended queue) allows push/pop at <em>both</em> ends and generalizes both.</p>\n<p>Both are abstract data types — they say <em>what</em> operations exist and which obey $O(1)$, not <em>how</em>. You can build them on either layout:</p>\n<ul>\n<li><strong>Stack on a dynamic array:</strong> push = append, pop = remove-last. Both $O(1)$ amortized. This is the default and the cache-friendliest choice.</li>\n<li><strong>Queue on a singly linked list:</strong> enqueue at the tail pointer, dequeue at the head. Both $O(1)$, no resizing, no wasted slots.</li>\n<li><strong>Queue on a plain dynamic array (naively):</strong> dequeue from index 0 forces shifting $\\Rightarrow O(n)$. This is the trap the ring buffer below fixes.</li>\n</ul>\n<p>Why both are AI-relevant: BFS, Dijkstra's frontier, beam search, and replay buffers in reinforcement learning are all queues/deques; recursive algorithms and expression evaluation are stacks; a fixed-size <em>experience replay buffer</em> in RL is literally a ring-buffer deque that overwrites the oldest transition.</p>\n\n<h3>Worked Example: A Queue From Two Stacks</h3>\n<p>Classic puzzle: you are handed a stack (LIFO only) and must build a queue (FIFO). The trick is that reversing a stack into another stack flips the order, and flipping twice restores it — so two stacks together can present a FIFO face.</p>\n<p>Keep two stacks, <code>in</code> and <code>out</code>. Enqueue always pushes onto <code>in</code>. Dequeue pops from <code>out</code>; if <code>out</code> is empty, first pour all of <code>in</code> into <code>out</code> (which reverses it, putting the oldest element on top).</p>\n<pre><code>class QueueFromStacks:\n    def __init__(self):\n        self.inS  = []   # newest items on top\n        self.outS = []   # oldest items on top\n\n    def enqueue(self, x):\n        self.inS.append(x)                # O(1)\n\n    def _transfer(self):\n        if not self.outS:                 # only refill when empty\n            while self.inS:\n                self.outS.append(self.inS.pop())   # reverses order\n\n    def dequeue(self):\n        self._transfer()\n        if not self.outS:\n            raise IndexError(\"dequeue from empty queue\")\n        return self.outS.pop()            # oldest element\n\n    def peek(self):\n        self._transfer()\n        return self.outS[-1]</code></pre>\n<p>Trace <code>enqueue(1), enqueue(2), enqueue(3)</code>: <code>inS = [1,2,3]</code> (3 on top). First <code>dequeue()</code> finds <code>outS</code> empty, pours over to <code>outS = [3,2,1]</code> (1 on top), pops <strong>1</strong> — the oldest. Correct FIFO.</p>\n<h4>Why this is $O(1)$ amortized despite the $O(n)$ pour</h4>\n<p>A single dequeue can cost $\\Theta(n)$ when it triggers a transfer. But each element is moved across stacks <em>at most once</em>: pushed to <code>inS</code> once, moved to <code>outS</code> once, popped once — three constant-cost touches over its entire lifetime. Over a sequence of $m$ operations the total work is $O(m)$, so the amortized cost per operation is $O(1)$. This is the same charging argument as the dynamic array: rare expensive events paid for by the many cheap ones. (Two stacks also let you build a <em>persistent/functional</em> queue, which is why this shows up in functional-programming and immutable-data-structure design.)</p>\n\n<h3>Worked Example: A Ring-Buffer Queue</h3>\n<p>The other production-grade queue is the <strong>circular buffer</strong>: a fixed-size array used as if its ends were joined into a ring. Two indices, <code>head</code> (front) and <code>tail</code> (next free slot), march forward and wrap with modular arithmetic. Nothing is ever shifted; the indices just chase each other around the ring.</p>\n<pre><code>class RingBuffer:\n    def __init__(self, capacity):\n        self.buf  = [None] * capacity\n        self.cap  = capacity\n        self.head = 0      # index of front element\n        self.size = 0      # number of elements stored\n\n    def enqueue(self, x):\n        if self.size == self.cap:\n            raise OverflowError(\"queue full\")\n        tail = (self.head + self.size) % self.cap   # wrap around\n        self.buf[tail] = x\n        self.size += 1\n\n    def dequeue(self):\n        if self.size == 0:\n            raise IndexError(\"queue empty\")\n        x = self.buf[self.head]\n        self.buf[self.head] = None                  # release reference\n        self.head = (self.head + 1) % self.cap      # wrap around\n        self.size -= 1\n        return x</code></pre>\n<p>Every operation is genuinely $O(1)$ — no amortization, no copying — and the memory is one contiguous, cache-friendly block. The cost is a <em>fixed capacity</em>: the buffer holds at most <code>cap</code> items, so you either reject on overflow or overwrite the oldest entry. That overwrite-oldest variant is precisely how bounded log buffers, audio/streaming buffers, and RL replay buffers work.</p>\n<div class=\"callout\"><div class=\"c-tag\">The key trick: modular wraparound</div><p>Tracking <code>size</code> alongside <code>head</code> avoids the classic \"full vs empty look identical\" bug. If you instead track only <code>head</code> and <code>tail</code>, then <code>head == tail</code> is ambiguous (both an empty and a full ring); the usual fix is to leave one slot unused or keep a separate count. Computing <code>tail = (head + size) % cap</code> sidesteps the ambiguity entirely.</p></div>\n<p><strong>Two-stacks vs ring-buffer queue:</strong> the ring buffer wins on raw speed and locality but is capacity-bounded and array-based; the two-stack queue is unbounded and uses only the stack primitive, at the price of amortized (not worst-case) bounds and pointer/array churn. Same ADT, different engineering tradeoffs — which is the whole theme of this lesson.</p>\n\n<h3>How to Choose, in One Breath</h3>\n<ul>\n<li>Lots of random indexing or numeric/bulk work, mostly append/pop at the end: <strong>dynamic array</strong>.</li>\n<li>Frequent insert/delete in the middle <em>and</em> you already hold the node, order matters more than indexing: <strong>doubly linked list</strong>.</li>\n<li>LIFO discipline: <strong>stack</strong>, almost always on a dynamic array.</li>\n<li>FIFO discipline, bounded size, max speed: <strong>ring buffer</strong>; unbounded or only-a-stack-available: <strong>two stacks</strong> or a linked-list queue.</li>\n</ul>\n<p>The asymptotic table tells you the worst case; locality and constant factors decide the real winner. On modern hardware, \"contiguous unless proven otherwise\" is a sound default — which is exactly why the entire numerical-computing and ML stack is built on arrays.</p>",
          "mcq": [
            {
              "q": "You append $n$ elements one at a time to an empty dynamic array that grows by adding a fixed 10 slots each time it fills. What is the total time for all $n$ appends?",
              "choices": [
                "$O(n)$, because each append is $O(1)$ amortized",
                "$O(n \\log n)$, because of the resizing",
                "$O(n^2)$, because each fixed-size resize copies the whole current array and the number of resizes grows with $n$",
                "$O(n \\log n)$ only if 10 is replaced by a power of two"
              ],
              "answer": 2,
              "explain": "Fixed-increment growth resizes every 10 appends and copies $10, 20, \\dots, n$ elements, summing to $\\approx n^2/20 = \\Theta(n^2)$. Amortized $O(1)$ per append requires multiplicative (e.g. doubling) growth, not additive."
            },
            {
              "q": "In the two-stacks queue, a single dequeue can take $\\Theta(n)$ time when it triggers a transfer. Why is the amortized cost per operation still $O(1)$?",
              "choices": [
                "Because transfers happen at most $O(\\log n)$ times overall",
                "Because each element is pushed, transferred, and popped at most once, so total work over $m$ operations is $O(m)$",
                "Because the transfer is actually $O(1)$ if the stacks are linked lists",
                "Because dequeue is never called more than $\\sqrt{n}$ times"
              ],
              "answer": 1,
              "explain": "Every element crosses from the in-stack to the out-stack exactly once in its lifetime, giving a constant number of touches per element and $O(m)$ total work over $m$ operations."
            },
            {
              "q": "Which single operation is $O(1)$ for a doubly linked list but $\\Theta(n)$ for a dynamic array (and which is the reverse)?",
              "choices": [
                "Both deleting-a-known-node and random-access-by-index favor the array",
                "Deleting a node you already hold a reference to favors the list; random access by index favors the array",
                "Both operations favor the linked list",
                "Appending at the end favors the list; searching favors the array"
              ],
              "answer": 1,
              "explain": "Given a node reference, a doubly linked list splices it out in $O(1)$ while the array must shift ($\\Theta(n)$); conversely indexing is $O(1)$ in the array but $\\Theta(n)$ in any list. They are mirror images."
            },
            {
              "q": "In a ring-buffer queue tracking only $\\texttt{head}$ and $\\texttt{tail}$ (no size counter), why is the condition $\\texttt{head == tail}$ problematic?",
              "choices": [
                "It can never happen in a correct implementation",
                "It is ambiguous: it signals both a completely empty and a completely full buffer",
                "It means the buffer has exactly one element",
                "It forces an $O(n)$ recomputation of the front index"
              ],
              "answer": 1,
              "explain": "With wraparound, after filling the ring the tail catches up to the head, so head==tail looks identical to the empty state. Implementations resolve this by storing a size/count or leaving one slot unused."
            },
            {
              "q": "An array of 4-byte integers begins at memory address $b = 2000$. Using the array addressing formula, at what address does element $i = 7$ live?",
              "choices": [
                "$2007$",
                "$2028$",
                "$2032$",
                "$2056$"
              ],
              "answer": 1,
              "explain": "By $\\text{addr}(i) = b + s \\cdot i = 2000 + 4 \\cdot 7 = 2028$, which is the constant-time multiply-add that gives arrays their $O(1)$ random access."
            },
            {
              "q": "Two collections of $n$ elements both support $O(1)$ access asymptotically, yet sequentially scanning a contiguous array is often 10-50x faster than walking a linked list. What is the primary reason?",
              "choices": [
                "The array uses a smaller Big-O constant in the addressing formula",
                "Adjacent array elements share cache lines, so the hardware prefetches them and avoids the cache misses that scattered nodes cause",
                "Linked-list traversal recomputes $\\log n$ pointers per step",
                "Arrays skip bounds checking while linked lists cannot"
              ],
              "answer": 1,
              "explain": "Spatial locality lets the CPU stream contiguous data through the cache and prefetch ahead, whereas heap-scattered nodes force a cache miss on nearly every hop."
            },
            {
              "q": "In a singly linked list that maintains both a $\\texttt{head}$ and a $\\texttt{tail}$ pointer, which operation is still $\\Theta(n)$?",
              "choices": [
                "Inserting a new node at the tail",
                "Inserting a new node at the front",
                "Deleting the tail node",
                "Inserting a node immediately after a node you already hold a reference to"
              ],
              "answer": 2,
              "explain": "Deleting the tail requires setting the new tail's $\\texttt{next}$ to null, but finding the predecessor of the old tail means walking from the head, costing $\\Theta(n)$ without a $\\texttt{prev}$ pointer."
            },
            {
              "q": "You want a stack and need the fastest, most cache-friendly default implementation. Which layout and operation mapping is the standard choice?",
              "choices": [
                "Dynamic array, with push = append at end and pop = remove-last, both $O(1)$ amortized",
                "Dynamic array, with push = insert at index 0 and pop = remove index 0, both $O(1)$",
                "Singly linked list, with push = insert at tail and pop = delete at tail, both $O(1)$",
                "Doubly linked list, where the $\\texttt{prev}$ pointers are what make push $O(1)$"
              ],
              "answer": 0,
              "explain": "A stack only touches one end, so appending and removing at the end of a dynamic array gives $O(1)$ amortized push/pop with no shifting and the best cache behavior; pushing/popping at index 0 would force $\\Theta(n)$ shifts."
            },
            {
              "q": "A dynamic array uses the standard doubling strategy: when it fills, it allocates a new block of twice the capacity and copies all elements over. After many appends the *amortized* cost per append is $O(1)$. What property of the doubling makes the total copying work across $n$ appends only $O(n)$?",
              "choices": [
                "The copies form a geometric series $1 + 2 + 4 + \\dots + n$ whose sum is $\\Theta(n)$, so the rare expensive resizes are paid for by the many cheap appends.",
                "Each resize copies only the newly added elements, never the old ones, so copying is $O(1)$ every time.",
                "Doubling guarantees a resize happens at most $O(\\log n)$ times and each resize is $O(1)$, giving $O(\\log n)$ total.",
                "The operating system copies the block in hardware, so resize cost does not count toward the asymptotic bound."
              ],
              "answer": 0,
              "explain": "Resizes happen at sizes $1, 2, 4, \\dots$ and each copies that many elements; the geometric sum $1+2+\\dots+n < 2n = \\Theta(n)$, so total work is linear and amortized cost is $O(1)$. The 'copies only the newly added elements' option is wrong because each resize re-copies *all* current elements, not just the new ones. The '$O(\\log n)$ resizes each costing $O(1)$' option is wrong because, although there are indeed $\\Theta(\\log n)$ resizes, each one copies up to the current size, so it costs far more than $O(1)$; the work is dominated by the final resize alone."
            },
            {
              "q": "You must store a collection where you frequently insert and delete elements in the *middle* given a pointer/reference to the node, and you never need random indexed access. Which layout is the better fit and why?",
              "choices": [
                "Array, because contiguous memory always wins on cache locality regardless of the operation mix.",
                "Array, because middle insertion is $O(1)$ once you have computed the address with $b + s \\cdot i$.",
                "Doubly linked list, because given a node reference you can splice in or out in $O(1)$ by rewiring a constant number of pointers, with no shifting.",
                "Doubly linked list, because it also provides $O(1)$ random access by index just like an array."
              ],
              "answer": 2,
              "explain": "With a node reference in hand, a doubly linked list splices an element in or out by updating a fixed number of neighbor pointers, which is $O(1)$ and avoids shifting. An array must shift up to $n$ elements on a middle insert ($\\Theta(n)$), and the address formula only gives fast *read/write* at a known index, not cheap insertion; linked lists do not give $O(1)$ random indexing."
            },
            {
              "q": "A ring-buffer (circular) queue is backed by an array of capacity $C = 8$, and the number of stored elements is computed as $(\\texttt{tail} - \\texttt{head} + C) \\bmod C$. If $\\texttt{head} = 6$ and $\\texttt{tail} = 2$ (and the queue is known to be non-empty), how many elements does it currently hold, and which array slots are occupied?",
              "choices": [
                "$2$ elements, in slots $6$ and $7$.",
                "$4$ elements, in slots $6, 7, 0, 1$ (the buffer has wrapped around the end).",
                "$6$ elements, in slots $2, 3, 4, 5, 6, 7$.",
                "$8$ elements, because $\\texttt{head} > \\texttt{tail}$ means the buffer is full."
              ],
              "answer": 1,
              "explain": "$(2 - 6 + 8) \\bmod 8 = 4 \\bmod 8 = 4$, so the queue holds 4 elements. Reading forward from $\\texttt{head}=6$ they occupy slots $6, 7$, then wrap to $0, 1$, stopping just before $\\texttt{tail}=2$. The modular formula is exactly what handles this wrap, so $\\texttt{head} > \\texttt{tail}$ does not mean full."
            },
            {
              "q": "A student claims: \"A stack and a queue are fundamentally different *data structures*, so they require fundamentally different memory layouts.\" Why is this a misconception according to the one-idea framing?",
              "choices": [
                "Because stacks must use linked lists and queues must use arrays, which is the only valid pairing.",
                "Because a stack is LIFO and a queue is FIFO, which forces stacks into contiguous memory and queues into pointer-based memory.",
                "Because both are *access policies* (which end you may touch) layered on top of either a contiguous array or a pointer-based linked list; the policy is independent of the physical layout.",
                "Because stacks and queues are actually identical once implemented, so the LIFO/FIFO distinction does not exist."
              ],
              "answer": 2,
              "explain": "Stacks (LIFO) and queues (FIFO) are access disciplines that can each be built on either physical layout, so they are not a separate third layout. The tempting distractors wrongly bind a policy to one specific layout, but the LIFO/FIFO rule is about *which end you touch*, independent of contiguous-vs-pointer storage; and the policies are genuinely distinct, so they are not identical."
            },
            {
              "q": "Three items are pushed onto an empty stack in the order 1, 2, 3, then popped one at a time. In what order do they come off the stack?",
              "choices": [
                "2, 3, 1",
                "1, 2, 3",
                "3, 2, 1",
                "3, 1, 2"
              ],
              "answer": 2,
              "explain": "A stack is LIFO (last-in, first-out): the most recently pushed item (3) sits on top and pops first, giving 3, 2, 1 — the reverse of the insertion order."
            },
            {
              "q": "Which structure lets you read the $k$-th element by index in $O(1)$ time?",
              "choices": [
                "A singly linked list",
                "A contiguous array (address = base + $k\\cdot$elemSize)",
                "A doubly linked list",
                "A stack"
              ],
              "answer": 1,
              "explain": "An array stores elements contiguously, so element $k$ lives at $\\text{base}+k\\cdot(\\text{element size})$ — one arithmetic step, $O(1)$. A linked list must follow $k$ pointers from the head, which is $O(k)=O(n)$ in the worst case."
            },
            {
              "q": "A network printer should process documents strictly in the order they were submitted. Which abstract data type models this directly?",
              "choices": [
                "A hash table",
                "A stack (LIFO)",
                "A binary search tree",
                "A queue (FIFO)"
              ],
              "answer": 3,
              "explain": "'First submitted, first printed' is first-in, first-out — a queue. A stack would print the most recent document first; the others impose no arrival order at all."
            },
            {
              "q": "A dynamic array uses the doubling strategy and supports $O(1)$ <em>amortized</em> append. What is the worst-case time of a single, unlucky append?",
              "choices": [
                "$\\Theta(n)$ — the append that triggers a resize copies all $n$ existing elements",
                "$\\Theta(1)$ — every append is constant time",
                "$\\Theta(\\log n)$",
                "$\\Theta(n\\log n)$"
              ],
              "answer": 0,
              "explain": "Most appends are $O(1)$, but the one that fills the array must allocate a larger block and copy all $n$ elements — $\\Theta(n)$ for that operation. Doubling makes such resizes rare enough that the <em>amortized</em> cost stays $O(1)$."
            }
          ],
          "flashcards": [
            {
              "front": "Array element-address formula and what it buys you",
              "back": "$\\text{addr}(i) = b + s\\cdot i$ (base $b$, element size $s$). Position is computed by arithmetic, giving $O(1)$ random access plus cache-friendly contiguous scans."
            },
            {
              "front": "Why does a dynamic array give $O(1)$ amortized append, and what growth policy is required?",
              "back": "Doubling makes total copy work $1+2+4+\\dots+n = 2n-1 = O(n)$ over $n$ appends $\\Rightarrow O(1)$ each. It requires multiplicative growth; fixed-increment growth is $\\Theta(n)$ per append (i.e. $\\Theta(n^2)$ total)."
            },
            {
              "front": "Singly vs doubly linked list: the one capability the extra pointer unlocks",
              "back": "The $\\texttt{prev}$ pointer lets you delete a node in $O(1)$ given only a reference to it (and traverse backward). A singly linked list needs the predecessor, forcing an $O(n)$ search."
            },
            {
              "front": "Stack vs queue vs deque: discipline and mnemonic",
              "back": "Stack = LIFO (push/pop one end). Queue = FIFO (enqueue back, dequeue front). Deque = push/pop at both ends, generalizing both. They are access policies layered on an array or linked list, not new layouts."
            },
            {
              "front": "Two-stacks queue: the core mechanism",
              "back": "Enqueue pushes onto $\\texttt{inS}$. Dequeue pops from $\\texttt{outS}$; if $\\texttt{outS}$ is empty, pour all of $\\texttt{inS}$ into it (reversing order so the oldest is on top). Each element moved once $\\Rightarrow$ $O(1)$ amortized."
            },
            {
              "front": "Ring buffer: how front/back move and the main tradeoff",
              "back": "$\\texttt{head}$ and $\\texttt{tail}$ advance with modular arithmetic ($(i+1)\\bmod\\text{cap}$), never shifting data. Worst-case $O(1)$ ops and great locality, but fixed capacity (must reject or overwrite the oldest on overflow)."
            }
          ],
          "homework": [
            {
              "prompt": "A dynamic array starts at capacity 1 and grows by a factor of $g > 1$ (rounding up) on each resize. Derive the total element-copy work to grow from 1 to $n$ elements as a function of $g$ and $n$, and explain what happens to the per-append amortized cost as $g \\to 1^+$.",
              "hint": "Resizes occur at sizes $1, g, g^2, \\dots$ up to $n$. Each resize copies its current size. Sum the geometric series of copies, then divide by $n$.",
              "solution": "Resizes happen at sizes $\\approx 1, g, g^2, \\dots, g^k = n$ where $k = \\log_g n$. The $j$-th resize copies $g^{j}$ elements, so total copy work is $\\sum_{j=0}^{k} g^{j} = \\frac{g^{k+1}-1}{g-1} = \\frac{g\\cdot n - 1}{g-1} = O\\!\\left(\\frac{g}{g-1}\\,n\\right)$. Dividing by $n$ appends gives amortized cost $\\frac{g}{g-1}$ per append, a constant for any fixed $g>1$ (e.g. $g=2 \\Rightarrow 2$ copies/append; $g=1.5 \\Rightarrow 3$). As $g \\to 1^+$, the factor $\\frac{g}{g-1} \\to \\infty$: growth becomes nearly additive, the constant blows up, and you approach the $\\Theta(n)$-per-append (i.e. $\\Theta(n^2)$ total) regime. So smaller $g$ saves memory (less slack) but costs more copying — a time/space knob, with $O(1)$ amortized preserved for any constant $g>1$."
            },
            {
              "prompt": "Implement a fixed-capacity deque (double-ended queue) on a ring buffer supporting $\\texttt{pushFront}$, $\\texttt{pushBack}$, $\\texttt{popFront}$, $\\texttt{popBack}$, all in $O(1)$. State the index arithmetic for each, being careful with wraparound in both directions.",
              "hint": "Track $\\texttt{head}$ (index of the front element) and $\\texttt{size}$. The back element sits at $(\\texttt{head}+\\texttt{size}-1)\\bmod\\texttt{cap}$. To move an index backward with wraparound use $(i-1+\\texttt{cap})\\bmod\\texttt{cap}$ so it never goes negative.",
              "solution": "Maintain $\\texttt{buf}$ of length $\\texttt{cap}$, $\\texttt{head}$, and $\\texttt{size}$.\n\npushBack(x): if size==cap error; tail = (head + size) % cap; buf[tail] = x; size += 1.\n\npopBack(): if size==0 error; tail = (head + size - 1) % cap; x = buf[tail]; buf[tail]=None; size -= 1; return x.\n\npushFront(x): if size==cap error; head = (head - 1 + cap) % cap; buf[head] = x; size += 1.\n\npopFront(): if size==0 error; x = buf[head]; buf[head]=None; head = (head + 1) % cap; size -= 1; return x.\n\nThe '+ cap' before the modulo in pushFront/the backward moves guards against negative indices (many languages return a negative remainder for negative operands). Every operation does O(1) constant work — index arithmetic plus one array write — with no shifting, so all four are worst-case $O(1)$. Using size (rather than a separate tail index) keeps the full-vs-empty distinction unambiguous."
            },
            {
              "prompt": "Using the two-stacks queue from the lesson, you execute this sequence: enqueue(A), enqueue(B), dequeue(), enqueue(C), dequeue(), dequeue(). Show the contents of both stacks (mark the top) after each operation, give the dequeue outputs, and count how many individual element-moves the transfers cost in total.",
              "hint": "A transfer (pour inS into outS) happens only when a dequeue finds outS empty. Track when that condition is true; an element is 'moved' once each time it is pushed across during a transfer.",
              "solution": "Notation: inS / outS, rightmost = top.\n\n1) enqueue(A): inS=[A], outS=[].\n2) enqueue(B): inS=[A,B], outS=[].\n3) dequeue(): outS empty -> transfer: pop B then A into outS, giving outS=[B,A] (A on top); pop top A. OUTPUT A. Now inS=[], outS=[B]. (2 moves)\n4) enqueue(C): inS=[C], outS=[B].\n5) dequeue(): outS NOT empty -> no transfer; pop B. OUTPUT B. inS=[C], outS=[].\n6) dequeue(): outS empty -> transfer: pop C into outS=[C]; pop C. OUTPUT C. inS=[], outS=[]. (1 move)\n\nOutputs in order: A, B, C (correct FIFO). Total transfer moves: 2 (step 3) + 1 (step 6) = 3, exactly one move per element (A, B, C each crossed once), confirming the $O(1)$ amortized argument: each element is touched a constant number of times regardless of how the dequeues interleave."
            }
          ],
          "examples": [
            {
              "title": "Computing an Address and the Cost of Array Insertion",
              "body": "An array of 32-bit integers ($s = 4$ bytes each) begins at memory address $b = 1000$ and holds $[10, 20, 30, 40, 50]$. (a) What is the address of element index $3$? (b) You now insert the value $25$ at index $1$ (so it becomes the new second element), keeping the array contiguous. How many existing elements must move, and what is the resulting array?",
              "solution": "<strong>Part (a): the address.</strong> The whole point of contiguous layout is that position is implied by arithmetic, so we apply the address formula directly:\n$$\\text{addr}(i) = b + s \\cdot i.$$\nWith $b = 1000$, $s = 4$, and $i = 3$:\n$$\\text{addr}(3) = 1000 + 4 \\cdot 3 = 1000 + 12 = 1012.$$\nNotice no traversal was needed — one multiply-add gives the answer regardless of how large $i$ is. That is $O(1)$ random access.\n\n<strong>Part (b): the insertion.</strong> To insert $25$ at index $1$ while keeping every element packed in one unbroken block, each element from the insertion point onward must shift one slot to the right (toward higher addresses), starting from the back so we don't overwrite data.\n\nStart: $[10, 20, 30, 40, 50]$ (indices $0$–$4$).\n\nWe shift the elements currently at indices $1,2,3,4$ — that is $20, 30, 40, 50$ — one position right:\n- Move $50$ from index $4$ to index $5$: $[10, 20, 30, 40, \\_, 50]$\n- Move $40$ from index $3$ to index $4$: $[10, 20, 30, \\_, 40, 50]$\n- Move $30$ from index $2$ to index $3$: $[10, 20, \\_, 30, 40, 50]$\n- Move $20$ from index $1$ to index $2$: $[10, \\_, 20, 30, 40, 50]$\n\nNow index $1$ is free; write $25$ there:\n$$[10, 25, 20, 30, 40, 50].$$\n\n<strong>Count of moves.</strong> Every element at index $\\geq 1$ moved, which is $4$ elements. In general, inserting at index $i$ in an array of $n$ elements moves $n - i$ elements, so worst-case insertion (at the front, $i=0$) is $\\Theta(n)$. This is the price contiguous memory pays for its $O(1)$ indexing.\n\n<strong>Answer:</strong> (a) $\\text{addr}(3) = 1012$. (b) $4$ elements move; the result is $[10, 25, 20, 30, 40, 50]$."
            },
            {
              "title": "Simulating a Queue with Two Stacks",
              "body": "Stacks are LIFO and queues are FIFO, yet a queue can be built from two stacks named $\\text{In}$ and $\\text{Out}$. Push (enqueue) goes onto $\\text{In}$; pop (dequeue) takes from $\\text{Out}$, but if $\\text{Out}$ is empty you first pour all of $\\text{In}$ into $\\text{Out}$ one element at a time. Trace this structure through the operation sequence: $\\text{enq}(1)$, $\\text{enq}(2)$, $\\text{enq}(3)$, $\\text{deq}$, $\\text{enq}(4)$, $\\text{deq}$, $\\text{deq}$. Give the dequeued values in order and the final stack contents.",
              "solution": "I write each stack bottom-to-top as $[\\,\\text{bottom} \\ldots \\text{top}\\,]$, so the rightmost element is the one a pop removes. Both stacks start empty: $\\text{In}=[\\ ]$, $\\text{Out}=[\\ ]$.\n\n<strong>$\\text{enq}(1)$:</strong> push onto $\\text{In}$. $\\;\\text{In}=[1]$, $\\text{Out}=[\\ ]$.\n\n<strong>$\\text{enq}(2)$:</strong> push onto $\\text{In}$. $\\;\\text{In}=[1,2]$, $\\text{Out}=[\\ ]$.\n\n<strong>$\\text{enq}(3)$:</strong> push onto $\\text{In}$. $\\;\\text{In}=[1,2,3]$, $\\text{Out}=[\\ ]$.\n\n<strong>$\\text{deq}$:</strong> $\\text{Out}$ is empty, so first pour all of $\\text{In}$ into $\\text{Out}$, popping the top of $\\text{In}$ and pushing it onto $\\text{Out}$ repeatedly:\n- pop $3$ from $\\text{In}$ $\\to$ push to $\\text{Out}$: $\\text{In}=[1,2]$, $\\text{Out}=[3]$\n- pop $2$ from $\\text{In}$ $\\to$ push to $\\text{Out}$: $\\text{In}=[1]$, $\\text{Out}=[3,2]$\n- pop $1$ from $\\text{In}$ $\\to$ push to $\\text{Out}$: $\\text{In}=[\\ ]$, $\\text{Out}=[3,2,1]$\n\nThe pouring reversed the order, so the top of $\\text{Out}$ is now $1$ — the oldest element, exactly what FIFO wants. Pop it: <strong>dequeue $\\to 1$</strong>. $\\;\\text{In}=[\\ ]$, $\\text{Out}=[3,2]$.\n\n<strong>$\\text{enq}(4)$:</strong> push onto $\\text{In}$ (we never pour back). $\\;\\text{In}=[4]$, $\\text{Out}=[3,2]$.\n\n<strong>$\\text{deq}$:</strong> $\\text{Out}$ is non-empty, so just pop its top: <strong>dequeue $\\to 2$</strong>. $\\;\\text{In}=[4]$, $\\text{Out}=[3]$.\n\n<strong>$\\text{deq}$:</strong> $\\text{Out}$ is non-empty, pop its top: <strong>dequeue $\\to 3$</strong>. $\\;\\text{In}=[4]$, $\\text{Out}=[\\ ]$.\n\n<strong>Result.</strong> The dequeued values came out in the order $1, 2, 3$ — the same order they were enqueued, confirming FIFO behavior even though each component is LIFO. The $4$ enqueued last is still waiting.\n\n<strong>Why this is efficient.</strong> Each element is pushed onto $\\text{In}$ once, poured into $\\text{Out}$ at most once, and popped from $\\text{Out}$ once — at most $3$ stack operations over its lifetime. So although a single $\\text{deq}$ that triggers a pour costs $\\Theta(n)$, the cost averaged over all operations is $O(1)$ amortized per operation.\n\n<strong>Answer:</strong> dequeued order $= 1, 2, 3$; final state $\\text{In}=[4]$, $\\text{Out}=[\\ ]$."
            }
          ]
        },
        {
          "id": "a-hash-tables",
          "title": "Hash Tables and Hashing",
          "minutes": 18,
          "content": "<h3>Why Hash Tables Matter</h3>\n<p>Suppose you want a data structure that maps <em>keys</em> to <em>values</em> — a phone book, a symbol table in a compiler, a cache of model activations keyed by input, a word-to-embedding lookup. You want three operations: <code>insert(key, value)</code>, <code>lookup(key)</code>, and <code>delete(key)</code>. A balanced binary search tree gives you all three in $O(\\log n)$. A hash table promises something better: <strong>expected</strong> $O(1)$, independent of how many items you store. That promise is what makes hash tables one of the most-used data structures on Earth — Python's <code>dict</code>, Java's <code>HashMap</code>, database indexes, and the deduplication tables inside training-data pipelines all rest on it.</p>\n<p>But the promise comes with fine print. The $O(1)$ is <em>expected</em>, averaged over a randomness assumption, not <em>worst-case</em>. Understanding exactly when the promise holds — and how it breaks, including under an adversary deliberately feeding you bad keys — is the heart of this lesson.</p>\n\n<h3>The Core Idea: From Keys to Slots</h3>\n<p>A hash table is, underneath, just an array of $m$ slots (often called <em>buckets</em>), indexed $0$ to $m-1$. The challenge is that the universe of possible keys $U$ is enormous — all possible strings, all 64-bit integers — while $m$ is small. We need a function that crushes the giant key space down into the small slot space.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A <strong>hash function</strong> $h : U \\to \\{0, 1, \\dots, m-1\\}$ is a deterministic recipe that turns any key into a slot index. Think of it as the \"address calculator\": given a key, it computes <em>where the value should live</em> in $O(1)$ time, so we can jump straight there instead of searching.</p>\n</div>\n<p>To store key $k$ with value $v$, we compute $i = h(k)$ and put $v$ in slot $i$. To look up $k$, we recompute $h(k)$ and read slot $i$. No search, no comparison loop — direct indexed access. That is where the constant-time dream comes from.</p>\n\n<h3>Hash Functions</h3>\n<p>A good hash function has two jobs: it must be <strong>fast</strong> to compute, and it must <strong>spread keys uniformly</strong> across the slots so that no slot gets crowded. Let's look at the classic constructions.</p>\n\n<h4>The Division Method</h4>\n<p>The simplest scheme treats the key as an integer and takes the remainder:</p>\n$$h(k) = k \\bmod m.$$\n<p>This is one machine instruction, but the choice of $m$ matters enormously. If $m$ is a power of $2$, say $m = 2^p$, then $h(k)$ is just the low $p$ bits of $k$ — the high bits are ignored entirely. If your keys share patterns in their low bits (e.g., all even, or all multiples of $4$ because of memory alignment), they collide catastrophically. The standard remedy is to pick $m$ to be a <strong>prime</strong> not close to a power of $2$, so the remainder mixes all the bits of the key.</p>\n\n<h4>The Multiplication Method</h4>\n<p>Multiply the key by an irrational-ish constant $A \\in (0,1)$, take the fractional part, and scale to $m$:</p>\n$$h(k) = \\lfloor m \\cdot (k A \\bmod 1) \\rfloor,$$\n<p>where $kA \\bmod 1$ means the fractional part of $kA$. Here $m$ can be a power of $2$ (convenient for hardware), and the quality of spreading is insensitive to $m$. Knuth recommends $A \\approx (\\sqrt 5 - 1)/2 \\approx 0.618$, the inverse golden ratio, because its continued-fraction expansion makes the fractional parts spread out maximally evenly.</p>\n\n<h4>Hashing Strings and Compound Keys</h4>\n<p>Real keys are rarely single integers. A common string hash is the <em>polynomial rolling hash</em>: treat the characters $c_0, c_1, \\dots, c_{n-1}$ as coefficients of a polynomial evaluated at a base $b$ (e.g., $31$ or $257$), modulo $m$:</p>\n$$h(s) = \\left( \\sum_{i=0}^{n-1} c_i \\, b^{\\,n-1-i} \\right) \\bmod m.$$\n<p>This is computed with Horner's rule in one left-to-right pass. The base $b$ being coprime to $m$ ensures different-length and reordered strings tend to land differently.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>The <strong>hashing trick</strong> (a.k.a. feature hashing) uses exactly this machinery. Instead of building an explicit vocabulary dictionary for, say, millions of categorical features or n-grams, you hash each feature name directly into one of $m$ fixed dimensions: feature $f$ contributes to coordinate $h(f)$ with sign $\\pm 1$ given by a second hash. This bounds memory to $O(m)$ regardless of vocabulary size, needs no dictionary lookup, and is trivially parallel and online. The cost is <em>hash collisions</em> — two features sharing a dimension — which act as a small, usually tolerable, source of noise. Hash tables and hashing for features are the same idea: deterministically crush a huge key space into a fixed array.</p>\n</div>\n\n<h3>Collisions Are Inevitable</h3>\n<p>Because $|U| \\gg m$, the pigeonhole principle guarantees that some distinct keys map to the same slot: $h(k_1) = h(k_2)$ with $k_1 \\neq k_2$. This is a <strong>collision</strong>. Even with a perfect hash function, collisions appear shockingly early — this is the <em>birthday paradox</em>: among $m$ slots, you expect a collision after only about $\\sqrt{m}$ insertions, not $m$. So collision handling is not an edge case; it is the central design problem of hash tables. There are two great families of solutions.</p>\n\n<h3>Collision Resolution I: Separate Chaining</h3>\n<p>In <strong>separate chaining</strong>, each slot holds a pointer to a <em>linked list</em> (a \"chain\") of all elements that hashed there.</p>\n<ul>\n<li><strong>Insert</strong> $k$: compute $i = h(k)$, prepend (or append) the entry to the list at slot $i$. $O(1)$ to insert at the head.</li>\n<li><strong>Lookup</strong> $k$: compute $i = h(k)$, then linearly scan the list at slot $i$, comparing keys until found or the list ends.</li>\n<li><strong>Delete</strong> $k$: find it in the chain, unlink it.</li>\n</ul>\n<p>The cost of a lookup is dominated by the length of the chain you have to walk. Define the <strong>load factor</strong></p>\n$$\\alpha = \\frac{n}{m},$$\n<p>the ratio of stored elements $n$ to slots $m$ — i.e., the average number of elements per slot. Under <em>simple uniform hashing</em> (defined below), the expected length of any chain is exactly $\\alpha$. So an unsuccessful search examines $\\alpha$ elements on average, and a successful search examines about $1 + \\alpha/2$. Both are $O(1 + \\alpha)$. As long as we keep $\\alpha = O(1)$ (a bounded constant, e.g., at most $1$ or $2$), every operation is expected $O(1)$.</p>\n\n<h3>Collision Resolution II: Open Addressing</h3>\n<p>In <strong>open addressing</strong>, there are no external lists — <em>every element lives directly inside the array itself</em>. When a key's home slot is occupied, we follow a deterministic <em>probe sequence</em> to find another open slot. This requires $\\alpha \\le 1$ (you cannot store more items than slots) and tends to be very cache-friendly because everything is in one contiguous array.</p>\n<p>We generalize the hash to take a probe number $j = 0, 1, 2, \\dots$: $h(k, j)$ gives the $j$-th slot to try. We probe $h(k,0), h(k,1), \\dots$ until we hit an empty slot (insert) or find our key (lookup).</p>\n\n<h4>Linear Probing</h4>\n$$h(k, j) = \\big( h'(k) + j \\big) \\bmod m.$$\n<p>If the home slot $h'(k)$ is full, try the next slot, then the next, wrapping around. Simple and extremely cache-friendly (you scan contiguous memory). Its weakness is <strong>primary clustering</strong>: occupied slots tend to coalesce into long runs, because any key hashing anywhere into a run must walk to the end of it, extending the run. Clusters grow super-linearly as $\\alpha \\to 1$.</p>\n\n<h4>Quadratic Probing</h4>\n$$h(k, j) = \\big( h'(k) + c_1 j + c_2 j^2 \\big) \\bmod m.$$\n<p>The probe offsets grow quadratically, so we jump away from the home slot in increasingly large steps. This avoids primary clustering. It introduces a milder <strong>secondary clustering</strong> (keys with the same home slot follow the same probe sequence), but it is usually much better behaved than linear probing. The catch: the constants $c_1, c_2$ and $m$ must be chosen so the probe sequence actually visits enough distinct slots — a common safe choice is $m$ a power of $2$ with $h(k,j) = (h'(k) + (j^2 + j)/2) \\bmod m$, which is guaranteed to hit every slot.</p>\n\n<h4>Double Hashing</h4>\n<p>The gold standard for open addressing uses a <em>second</em> hash function for the step size:</p>\n$$h(k, j) = \\big( h_1(k) + j \\cdot h_2(k) \\big) \\bmod m.$$\n<p>Different keys get different step sizes, so even keys with the same home slot probe different sequences — eliminating secondary clustering. For this to visit all $m$ slots, $h_2(k)$ must be nonzero and coprime to $m$ (easy if $m$ is prime). Double hashing's performance is the closest of the open-addressing schemes to the idealized <em>uniform hashing</em> assumption.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Subtlety: deletion in open addressing</div>\n<p>You cannot simply blank out a deleted slot — doing so would break probe chains, making later keys unreachable (a lookup would hit the empty slot and stop early). Instead you write a special <strong>tombstone</strong> marker: lookups treat it as \"occupied, keep probing,\" while inserts treat it as \"reusable, stop here.\" Tombstones accumulate and must be cleared by periodic rehashing.</p>\n</div>\n\n<h3>Load Factor, Resizing, and Amortized Cost</h3>\n<p>The load factor $\\alpha = n/m$ is the single knob that governs performance. For chaining, expected cost is $O(1 + \\alpha)$ — graceful even past $\\alpha = 1$. For open addressing under uniform hashing, the expected number of probes for an <em>unsuccessful</em> search is</p>\n$$\\frac{1}{1 - \\alpha},$$\n<p>and for a <em>successful</em> search it is about $\\frac{1}{\\alpha}\\ln\\frac{1}{1-\\alpha}$. Stare at $\\frac{1}{1-\\alpha}$: at $\\alpha = 0.5$ you average $2$ probes; at $\\alpha = 0.9$ you average $10$; at $\\alpha = 0.99$, about $100$. The cost blows up as the table fills. This is why implementations keep $\\alpha$ comfortably below $1$ — Python's dict resizes around $\\alpha \\approx 2/3$, Java's HashMap around $0.75$.</p>\n\n<h4>Dynamic Resizing</h4>\n<p>To keep $\\alpha$ bounded as $n$ grows, we <strong>resize</strong>: when $\\alpha$ exceeds a threshold, allocate a new, larger array (typically <em>double</em> the size, $m \\to 2m$) and <strong>rehash</strong> every existing element into it — because $h(k) = k \\bmod m$ (and friends) depends on $m$, every key's slot must be recomputed. A single resize costs $O(n)$. That sounds like it ruins our $O(1)$, but the magic is <em>amortization</em>: because we double, resizes happen geometrically rarely. Inserting $n$ elements triggers resizes at sizes $1, 2, 4, \\dots, n$, and $1 + 2 + 4 + \\cdots + n < 2n$ total rehash work. Spread over $n$ inserts, that is $O(1)$ <strong>amortized</strong> per insert.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>Doubling on resize is what makes a dynamic hash table $O(1)$ amortized per operation. If instead you grew by a fixed amount (e.g., $m \\to m + 100$), total rehash work would be $O(n^2)$ and per-insert cost would degrade to $O(n)$. The geometric growth factor is essential — the same principle behind dynamic arrays / <code>std::vector</code> / Python <code>list</code>.</p>\n</div>\n\n<h3>Why Expected $O(1)$ Holds: Simple Uniform Hashing</h3>\n<p>The $O(1)$ guarantee rests on an assumption, stated precisely.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Definition — Simple Uniform Hashing (SUH)</div>\n<p>Each key is, independently of the others, equally likely to hash to any of the $m$ slots. Formally, for any key $k$, $\\Pr[h(k) = i] = 1/m$ for every slot $i$, and these events are independent across distinct keys.</p>\n</div>\n<p>Under SUH, consider chaining. Let $n$ keys be in the table and fix a slot $i$. Define an indicator $X_j = \\mathbf{1}[h(k_j) = i]$ for each key $k_j$. By SUH, $\\mathbb{E}[X_j] = \\Pr[h(k_j)=i] = 1/m$. The chain length at slot $i$ is $L_i = \\sum_{j=1}^{n} X_j$, so by linearity of expectation:</p>\n$$\\mathbb{E}[L_i] = \\sum_{j=1}^{n} \\mathbb{E}[X_j] = \\sum_{j=1}^{n} \\frac{1}{m} = \\frac{n}{m} = \\alpha.$$\n<p>An unsuccessful search at slot $i$ walks the whole chain: expected work $\\mathbb{E}[L_i] = \\alpha$. Including the constant cost of computing the hash and indexing, total expected cost is $O(1 + \\alpha)$. With $\\alpha$ held to a constant by resizing, this is $O(1)$. That is the entire argument — short, and it hinges completely on the uniformity-and-independence assumption.</p>\n\n<h3>The Dark Side: Worst Case and Adversarial Keys</h3>\n<p>SUH is an <em>assumption about the input distribution</em>, not a property of any fixed hash function. For any <em>deterministic</em> hash function $h$, the adversary can simply enumerate keys and pick a set that all collide — every $k$ with $h(k) = 0$, say. Then all $n$ elements land in one chain (or one probe cluster), and every lookup is $O(n)$. The whole table degenerates into a linked list. SUH says nothing here because the input was not drawn from a uniform distribution — it was hand-picked to be the worst case.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture — algorithmic complexity attacks</div>\n<p>This is not theoretical. <strong>Hash-flooding</strong> denial-of-service attacks send HTTP requests whose parameter names all hash to the same bucket, forcing the server's hash table into $O(n)$ behavior per insert and $O(n^2)$ overall, freezing the server. Real CVEs (e.g., the 2011 multi-language disclosure affecting PHP, Java, Python, Ruby) stemmed from exactly this. It is the security analog of an adversarial example fooling a neural net: a carefully crafted input exploiting a known deterministic decision rule.</p>\n</div>\n\n<h4>The Fix: Universal / Randomized Hashing</h4>\n<p>The defense is to make the hash function itself <em>random</em>, chosen at runtime from a family, so the adversary cannot know it in advance. A family $\\mathcal{H}$ of hash functions is <strong>universal</strong> if for any two distinct keys $k_1 \\neq k_2$, a function $h$ drawn uniformly at random from $\\mathcal{H}$ collides them with probability at most $1/m$:</p>\n$$\\Pr_{h \\in \\mathcal{H}}[\\,h(k_1) = h(k_2)\\,] \\le \\frac{1}{m}.$$\n<p>Crucially, the randomness is now over <em>our</em> coin flips (which $h$ we picked), not over the input. So <em>even on adversarial keys</em>, the expected chain length is $O(1 + \\alpha)$ — the adversary cannot target a function they cannot predict. A classic universal family for integer keys in $\\{0,\\dots,p-1\\}$ uses a prime $p > |U|$: $h_{a,b}(k) = ((ak + b) \\bmod p) \\bmod m$, with $a \\in \\{1,\\dots,p-1\\}$ and $b \\in \\{0,\\dots,p-1\\}$ chosen at random. Modern systems use keyed hashes like SipHash (Python, Rust, and many others seed their dict hashing with a random key per process) precisely to defeat hash-flooding.</p>\n\n<h3>Worked Example: Tracing Insertions and Lookups</h3>\n<p>Let $m = 7$ and use the division hash $h(k) = k \\bmod 7$. Insert, in order, the keys: <code>50, 700, 76, 85, 92, 73, 101</code>. Their home slots:</p>\n<pre><code>50  mod 7 = 1     (50 = 7*7 + 1)\n700 mod 7 = 0     (700 = 7*100)\n76  mod 7 = 6     (76 = 7*10 + 6)\n85  mod 7 = 1     (85 = 7*12 + 1)   -> collides with 50\n92  mod 7 = 1     (92 = 7*13 + 1)   -> collides with 50, 85\n73  mod 7 = 3     (73 = 7*10 + 3)\n101 mod 7 = 3     (101 = 7*14 + 3)  -> collides with 73</code></pre>\n\n<h4>(a) Separate chaining</h4>\n<p>Appending to the tail of each chain:</p>\n<pre><code>slot 0: 700\nslot 1: 50 -> 85 -> 92\nslot 2: (empty)\nslot 3: 73 -> 101\nslot 4: (empty)\nslot 5: (empty)\nslot 6: 76</code></pre>\n<p>Load factor $\\alpha = n/m = 7/7 = 1.0$. A lookup of <code>92</code>: compute $92 \\bmod 7 = 1$, walk slot 1's chain comparing keys: $50 \\ne 92$, $85 \\ne 92$, $92 = 92$ — found after 3 comparisons. A lookup of <code>99</code> ($99 \\bmod 7 = 1$): walk the chain $50, 85, 92$, none match, report absent — 3 comparisons, an unsuccessful search.</p>\n\n<h4>(b) Linear probing</h4>\n<p>Same home slots, but now everything lives in the array. Inserting in order:</p>\n<pre><code>50  -> slot 1 (empty)            -> place at 1\n700 -> slot 0 (empty)            -> place at 0\n76  -> slot 6 (empty)            -> place at 6\n85  -> slot 1 (taken by 50)      -> try 2 (empty) -> place at 2\n92  -> slot 1 (taken), 2 (taken) -> try 3 (empty) -> place at 3\n73  -> slot 3 (taken by 92)      -> try 4 (empty) -> place at 4\n101 -> slot 3 (taken), 4 (taken) -> try 5 (empty) -> place at 5\n\nFinal array:\nindex:  0    1   2   3   4   5    6\nvalue: 700  50  85  92  73  101  76</code></pre>\n<p>Notice the <strong>clustering</strong>: a contiguous run from index 1 through 6. The collisions of keys hashing to 1 pushed later keys (73, originally home at 3) out of their own home slots, lengthening probe sequences for everyone — primary clustering in action. To look up <code>101</code>: $101 \\bmod 7 = 3$, probe slot 3 (value 92, not it), slot 4 (73, not it), slot 5 (101, found) — 3 probes. Load factor is again $1.0$, which is the maximum open addressing can reach, and the table is now completely full.</p>\n\n<h4>(c) Quadratic probing</h4>\n<p>Using $h(k,j) = (h'(k) + j^2) \\bmod 7$ for the colliding key <code>92</code> (home slot 1, with 1 and 2 already taken by the linear run above — but let's redo cleanly for quadratic): probe $j=0 \\to 1$ (taken), $j=1 \\to (1+1)=2$ (taken), $j=2 \\to (1+4)=5$ (empty) — place 92 at slot 5, jumping over the cluster instead of extending it. That jump is exactly how quadratic probing breaks up primary clusters.</p>\n\n<h3>Connections and Takeaways</h3>\n<ul>\n<li><strong>Chaining vs open addressing:</strong> chaining tolerates $\\alpha > 1$ and degrades gracefully but uses pointers and has poor cache locality; open addressing is cache-friendly and memory-compact but demands $\\alpha &lt; 1$, careful deletion (tombstones), and degrades sharply near full.</li>\n<li><strong>Expected vs worst case:</strong> $O(1)$ is expected under (simple) uniform hashing; worst case is $O(n)$ when everything collides. Randomized/universal hashing restores expected $O(1)$ <em>even against an adversary</em>, by moving the randomness from the input to the algorithm.</li>\n<li><strong>Amortization:</strong> doubling-on-resize keeps $\\alpha$ bounded at $O(1)$ amortized cost per operation.</li>\n<li><strong>ML/AI links:</strong> feature hashing trades a dictionary for a fixed array at the price of collisions; Bloom filters and MinHash/LSH build on the same hash-to-buckets primitive (LSH deliberately <em>wants</em> similar items to collide, for approximate nearest-neighbor search over embeddings); and adversarial keys are the data-structure cousin of adversarial examples.</li>\n</ul>",
          "mcq": [
            {
              "q": "A hash table uses open addressing with linear probing and uniform hashing. Its load factor is $\\alpha = 0.9$. Roughly how many probes does an average unsuccessful search require, and why is this a problem?",
              "choices": [
                "About 1.1 probes; performance is essentially unaffected at this load.",
                "About 10 probes, because the expected unsuccessful-search cost is $\\tfrac{1}{1-\\alpha} = \\tfrac{1}{0.1} = 10$.",
                "About 0.9 probes, since the load factor directly equals the probe count.",
                "Exactly 90 probes, one per percent of fullness."
              ],
              "answer": 1,
              "explain": "For open addressing under uniform hashing, expected probes for an unsuccessful search is $\\frac{1}{1-\\alpha}$, which is $\\frac{1}{1-0.9}=10$. This blowup near $\\alpha\\to 1$ is exactly why tables resize well before becoming full."
            },
            {
              "q": "Why does a deterministic hash function alone NOT guarantee expected $O(1)$ lookups against a malicious user?",
              "choices": [
                "Deterministic functions are too slow to compute in constant time.",
                "Simple uniform hashing fails because keys are stored in arrays, not lists.",
                "An adversary who knows the fixed function can choose keys that all map to one slot, forcing $O(n)$ per operation; SUH assumed a random input that no longer holds.",
                "Deterministic functions always map every key to slot 0."
              ],
              "answer": 2,
              "explain": "SUH is an assumption about input randomness. For any fixed deterministic $h$, an adversary can pick colliding keys, collapsing the table to one chain/cluster and $O(n)$ operations. Randomized/universal hashing fixes this by making the function unpredictable."
            },
            {
              "q": "When a dynamic hash table doubles its array on resize, inserting $n$ elements costs $O(1)$ amortized per insert. What breaks this guarantee?",
              "choices": [
                "Growing the array by a fixed constant amount (e.g., +100 slots) each time, which makes total rehash work $O(n^2)$.",
                "Using a prime number of slots instead of a power of two.",
                "Choosing a load-factor threshold of 0.75 instead of 0.5.",
                "Computing the hash with the multiplication method instead of division."
              ],
              "answer": 0,
              "explain": "Geometric (doubling) growth makes total rehash work $\\sum 2^i < 2n$, i.e. $O(1)$ amortized. Additive growth triggers $\\Theta(n/c)$ resizes each costing $O(n)$, giving $O(n^2)$ total and $O(n)$ amortized per insert."
            },
            {
              "q": "In open addressing, why must a deleted element be replaced with a tombstone marker rather than simply emptied?",
              "choices": [
                "Tombstones save memory compared to leaving the slot occupied.",
                "An empty slot in the middle of a probe sequence would make later keys in that sequence unreachable, since lookups stop at the first empty slot.",
                "Emptying a slot would change the load factor incorrectly.",
                "Tombstones are required to recompute the hash function after deletion."
              ],
              "answer": 1,
              "explain": "Lookups stop probing at the first empty slot. Truly emptying a slot mid-sequence severs the chain so keys placed after it during probing can no longer be found; a tombstone says 'keep probing' to lookups while allowing inserts to reuse the slot."
            },
            {
              "q": "Using the division method $h(k) = k \\bmod m$, why is choosing $m = 2^p$ (a power of two) generally a poor decision?",
              "choices": [
                "It makes the hash function too slow because powers of two require floating-point division.",
                "It forces the load factor above 1, which open addressing cannot support.",
                "The hash then depends only on the low $p$ bits of $k$, so keys sharing low-bit patterns (e.g., all even, or aligned addresses) collide catastrophically while high bits are ignored.",
                "Powers of two are never coprime to the keys, so the remainder is always zero."
              ],
              "answer": 2,
              "explain": "When $m = 2^p$, $k \\bmod m$ is just the low $p$ bits of $k$, discarding all high bits; common low-bit regularities then collide heavily, which is why a prime $m$ far from a power of two is preferred."
            },
            {
              "q": "The birthday paradox tells us that with a perfect hash function over $m$ slots, the first collision is expected after roughly how many insertions?",
              "choices": [
                "About $\\sqrt{m}$ insertions.",
                "About $m$ insertions, since you need to fill every slot first.",
                "About $m/2$ insertions, exactly half the table.",
                "About $\\log_2 m$ insertions."
              ],
              "answer": 0,
              "explain": "By the birthday paradox, collisions among $m$ slots become likely after only about $\\sqrt{m}$ insertions, which is why collision handling is the central design problem rather than a rare edge case."
            },
            {
              "q": "A family $\\mathcal{H}$ of hash functions is called universal when, for any two distinct keys $k_1 \\neq k_2$, a randomly chosen $h \\in \\mathcal{H}$ satisfies which property?",
              "choices": [
                "$h(k_1) = h(k_2)$ is impossible, i.e. the collision probability is exactly $0$.",
                "$\\Pr_{h \\in \\mathcal{H}}[h(k_1) = h(k_2)] \\le 1/m$, with the randomness over the choice of $h$, not over the inputs.",
                "$h(k_1) \\ne h(k_2)$ for every $h$ in the family, on every possible input.",
                "Every $h$ in the family maps both keys to the same slot with probability $1/2$."
              ],
              "answer": 1,
              "explain": "Universality requires the collision probability of any fixed pair of distinct keys to be at most $1/m$ over the random choice of $h$, which moves the randomness from the (possibly adversarial) input to the algorithm and restores expected $O(1)$ even against an adversary."
            },
            {
              "q": "A program must store significantly more keys than it has slots, so the load factor will exceed 1, and pointer overhead is acceptable. Which collision-resolution strategy is appropriate, and why?",
              "choices": [
                "Open addressing with double hashing, because it gives the best cache locality.",
                "Open addressing with linear probing, because it tolerates any load factor.",
                "Separate chaining, because it supports $\\alpha > 1$ and degrades gracefully as $O(1 + \\alpha)$.",
                "Quadratic probing, because it eliminates secondary clustering at high load."
              ],
              "answer": 2,
              "explain": "Open addressing requires $\\alpha \\le 1$ since every element lives in the array itself, whereas separate chaining stores chains per slot, supports $\\alpha > 1$, and degrades gracefully with expected cost $O(1 + \\alpha)$."
            },
            {
              "q": "In double hashing with $h(k,j) = (h_1(k) + j\\cdot h_2(k)) \\bmod m$, suppose you carelessly let $h_2(k)$ return $0$ for some key $k$ whose home slot $h_1(k)$ is already occupied. What goes wrong?",
              "choices": [
                "Every probe revisits the same occupied slot $h_1(k)$, so the insert loops forever (or fails) instead of finding an open slot.",
                "The key is silently placed in slot $0$ regardless of $h_1(k)$.",
                "Nothing — the scheme just degenerates gracefully into linear probing.",
                "It causes secondary clustering identical to quadratic probing."
              ],
              "answer": 0,
              "explain": "With $h_2(k)=0$ the step size is zero, so $h(k,j)=h_1(k)$ for every $j$ — the probe sequence never moves off the (occupied) home slot. This is why $h_2(k)$ must be nonzero (and coprime to $m$) so the sequence visits all slots; it does not reduce to linear probing, which needs a step of $1$, not $0$."
            },
            {
              "q": "A student claims: 'Switching from a fixed deterministic hash to a universal family makes collisions impossible, so chains will all have length at most 1.' What is the correct view?",
              "choices": [
                "Correct — universality means $\\Pr[h(k_1)=h(k_2)] = 0$ for distinct keys.",
                "Incorrect — universal hashing only bounds the collision probability to at most $1/m$, so collisions still occur; it merely guarantees expected $O(1+\\alpha)$ chains even on adversarial keys.",
                "Correct — but only when the load factor satisfies $\\alpha < 1$.",
                "Incorrect — universal hashing actually increases the number of collisions to defeat the adversary."
              ],
              "answer": 1,
              "explain": "Universality bounds the pairwise collision probability by $1/m$ (not $0$); by the pigeonhole principle and the birthday effect, collisions are still inevitable. Its real payoff is moving the randomness from the input to the algorithm, so expected chain length stays $O(1+\\alpha)$ even against an adversary who cannot predict which $h$ was chosen."
            },
            {
              "q": "Using quadratic probing $h(k,j) = (h'(k) + j^2) \\bmod 11$ with $h'(k)=4$, and suppose slots $4$ and $5$ are already occupied. Which slot does the key land in?",
              "choices": [
                "Slot 5, because that is the next contiguous open position after the home slot.",
                "Slot 6, computed as $(4 + 2) \\bmod 11$.",
                "Slot 8, computed as $(4 + 2^2) \\bmod 11 = (4+4) \\bmod 11$.",
                "Slot 4, since the home slot is recomputed and reused."
              ],
              "answer": 2,
              "explain": "Probe $j=0$ gives $4$ (taken), $j=1$ gives $(4+1)=5$ (taken), $j=2$ gives $(4+4)=8$ (open) — so the key lands in slot 8. Quadratic probing jumps in growing steps $j^2$, so it skips past the immediate neighbors rather than scanning contiguously like linear probing."
            },
            {
              "q": "You must store $n = 3m$ items in a table of $m$ slots (load factor $\\alpha = 3$), and pointer overhead is acceptable. A teammate insists open addressing is fine 'as long as we accept slow lookups.' Why is this wrong, and what is the right choice?",
              "choices": [
                "Open addressing works fine at $\\alpha = 3$; it just needs more tombstones to compensate.",
                "Open addressing is impossible here because it requires $\\alpha \\le 1$ (you cannot fit more items than slots); separate chaining, whose cost is $O(1+\\alpha)$, handles $\\alpha > 1$ gracefully.",
                "Both fail at $\\alpha = 3$; you must resize until $\\alpha < 1$ before either scheme works.",
                "Separate chaining also caps at $\\alpha = 1$, so neither scheme can store $3m$ items."
              ],
              "answer": 1,
              "explain": "Open addressing stores every element inside the array, so it categorically cannot hold more items than slots — $\\alpha \\le 1$ is a hard structural limit, not a speed trade-off. Separate chaining uses external lists, so it tolerates $\\alpha > 1$ with expected cost $O(1+\\alpha)$, making it the correct choice when items far exceed slots and pointer overhead is acceptable."
            },
            {
              "q": "How does a hash table achieve expected $O(1)$ lookup?",
              "choices": [
                "It keeps the keys sorted and binary-searches them",
                "It applies a hash function to the key to compute an array index, jumping straight to the right bucket",
                "It compares the search key against every stored entry",
                "It stores the keys in a balanced tree"
              ],
              "answer": 1,
              "explain": "A hash function maps a key directly to a slot index, so a lookup is one index computation plus (with a good hash and a bounded load factor) a short constant-length search in that bucket — expected $O(1)$, with no scan over unrelated keys."
            },
            {
              "q": "What is a hash <em>collision</em>?",
              "choices": [
                "The hash function runs too slowly",
                "The table has become completely full",
                "A lookup fails to find its key",
                "Two distinct keys hash to the same slot"
              ],
              "answer": 3,
              "explain": "A collision is when two different keys produce the same index. Since there are usually far more possible keys than slots, collisions are inevitable (pigeonhole) — which is exactly why hash tables need a resolution scheme such as chaining or probing."
            },
            {
              "q": "For which task is a standard (unordered) hash table a poor choice compared with a balanced BST?",
              "choices": [
                "Listing the keys in sorted order, or answering range queries",
                "Looking up a single key by value",
                "Inserting a new key",
                "Deleting a key"
              ],
              "answer": 0,
              "explain": "Hashing scatters keys across slots with no order, so producing sorted output or a range needs an extra $O(n\\log n)$ sort. A balanced BST keeps keys ordered, giving $O(\\log n)$ range and successor queries — the payoff for its slower $O(\\log n)$ point lookups."
            },
            {
              "q": "A chained hash table doubles its number of slots once the load factor $\\alpha=n/m$ grows too large. Why is resizing necessary?",
              "choices": [
                "To keep the keys in sorted order",
                "To reduce the table's memory usage",
                "To keep $\\alpha$ (the average chain length) bounded so operations stay expected $O(1)$",
                "To eliminate collisions entirely"
              ],
              "answer": 2,
              "explain": "Lookup cost with chaining is $\\Theta(1+\\alpha)$. Inserting without resizing lets $\\alpha=n/m$ grow without bound, so chains lengthen and performance drifts toward $O(n)$. Doubling $m$ restores a small constant $\\alpha$ and keeps operations expected $O(1)$ (collisions can never be fully eliminated)."
            }
          ],
          "flashcards": [
            {
              "front": "Define the load factor $\\alpha$ of a hash table, and what it equals for separate chaining under simple uniform hashing.",
              "back": "$\\alpha = n/m$ (elements divided by slots) = the average number of elements per slot. Under SUH, the expected chain length at any slot is exactly $\\alpha$, so expected search cost is $O(1+\\alpha)$."
            },
            {
              "front": "State the Simple Uniform Hashing (SUH) assumption.",
              "back": "Each key is, independently of all other keys, equally likely to hash to each of the $m$ slots: $\\Pr[h(k)=i] = 1/m$ for all $i$. It is an assumption about the input distribution, not a property of any fixed function."
            },
            {
              "front": "Expected number of probes for an unsuccessful search in open addressing under uniform hashing (load factor $\\alpha$)?",
              "back": "$\\frac{1}{1-\\alpha}$. E.g. 2 probes at $\\alpha=0.5$, 10 at $\\alpha=0.9$, 100 at $\\alpha=0.99$ — motivating resizing well before the table is full."
            },
            {
              "front": "Linear vs. quadratic vs. double hashing probe sequences.",
              "back": "Linear: $h'(k)+j$ (suffers primary clustering). Quadratic: $h'(k)+c_1 j+c_2 j^2$ (avoids primary, has secondary clustering). Double hashing: $h_1(k)+j\\cdot h_2(k)$ (different step per key, eliminates secondary clustering)."
            },
            {
              "front": "What makes a family $\\mathcal{H}$ of hash functions universal, and why does it help against adversaries?",
              "back": "For all distinct $k_1\\neq k_2$: $\\Pr_{h\\in\\mathcal{H}}[h(k_1)=h(k_2)]\\le 1/m$. Picking $h$ randomly at runtime moves the randomness to our coin flips, so expected $O(1+\\alpha)$ holds even on adversarially chosen keys."
            },
            {
              "front": "Why must dynamic hash tables grow by a multiplicative factor (e.g., doubling) rather than a fixed additive amount?",
              "back": "Doubling makes total rehash work geometric ($\\sum 2^i < 2n$), giving $O(1)$ amortized per insert. Additive growth causes $\\Theta(n)$ resizes of $O(n)$ each → $O(n^2)$ total, $O(n)$ amortized."
            }
          ],
          "homework": [
            {
              "prompt": "Let $m=11$ and $h(k)=k\\bmod 11$. Insert the keys $22, 1, 13, 11, 24, 33, 12$ in this order using (a) separate chaining and (b) linear probing. Show the final structures and compute the final load factor.",
              "hint": "First compute every home slot $k\\bmod 11$. Watch which keys collide, then for linear probing walk forward (with wraparound) to the next free slot. Load factor is $n/m$ with $n$ = number of keys inserted.",
              "solution": "Home slots: $22\\to0$, $1\\to1$, $13\\to2$, $11\\to0$, $24\\to2$, $33\\to0$, $12\\to1$.\n\n(a) Separate chaining (append order):\nslot 0: 22 -> 11 -> 33\nslot 1: 1 -> 12\nslot 2: 13 -> 24\nslots 3-10: empty\n\n(b) Linear probing, step by step:\n22 -> slot 0 (empty) -> 0\n1  -> slot 1 (empty) -> 1\n13 -> slot 2 (empty) -> 2\n11 -> slot 0 taken -> try 1 taken -> try 2 taken -> try 3 (empty) -> 3\n24 -> slot 2 taken -> try 3 taken -> try 4 (empty) -> 4\n33 -> slot 0 taken -> 1,2,3,4 taken -> try 5 (empty) -> 5\n12 -> slot 1 taken -> 2,3,4,5 taken -> try 6 (empty) -> 6\nFinal array (index: value): 0:22, 1:1, 2:13, 3:11, 4:24, 5:33, 6:12, 7-10: empty.\n\nLoad factor for both: $\\alpha = n/m = 7/11 \\approx 0.636$. Note the severe clustering in (b): a single run from index 0 to 6, because three keys homed at slot 0 plus collisions at 1 and 2 coalesced."
            },
            {
              "prompt": "A hash table with separate chaining holds $n$ keys in $m$ slots under simple uniform hashing. Prove that the expected cost of an unsuccessful search is $\\Theta(1+\\alpha)$ where $\\alpha = n/m$.",
              "hint": "An unsuccessful search for key $k$ computes $h(k)$ in $O(1)$, then scans the entire chain at that slot. So the question reduces to: what is the expected length of the chain you land in? Use indicator variables and linearity of expectation.",
              "solution": "An unsuccessful search for $k$ costs the $O(1)$ to compute $h(k)=i$ and index slot $i$, plus the time to scan the entire chain at slot $i$ (we must reach the end to conclude $k$ is absent). So expected cost = $O(1) + \\mathbb{E}[\\text{length of chain at } i]$.\n\nFor each stored key $k_j$ ($j=1,\\dots,n$), define the indicator $X_j = \\mathbf{1}[h(k_j)=i]$. Under SUH each key independently lands in slot $i$ with probability $1/m$, so $\\mathbb{E}[X_j] = \\Pr[h(k_j)=i] = 1/m$.\n\nThe chain length is $L_i = \\sum_{j=1}^n X_j$. By linearity of expectation (no independence needed for the mean):\n$$\\mathbb{E}[L_i] = \\sum_{j=1}^n \\mathbb{E}[X_j] = \\sum_{j=1}^n \\frac{1}{m} = \\frac{n}{m} = \\alpha.$$\n\nTherefore the expected total cost is $O(1) + \\alpha = \\Theta(1+\\alpha)$. The '+1' covers the constant hash/index work (which dominates when $\\alpha$ is tiny), and the $\\alpha$ term covers the average chain walk. With resizing keeping $\\alpha=O(1)$, this is $\\Theta(1)$. (A successful search is slightly cheaper, expected $\\Theta(1+\\alpha/2)$, because on average it stops halfway through the chain.)"
            },
            {
              "prompt": "A web service stores incoming request-parameter names in a hash table with a fixed, publicly documented hash function $h(s)=\\left(\\sum_i c_i\\cdot 31^i\\right)\\bmod m$ with $m=2^{16}$. Explain how an attacker can degrade the table to $O(n)$ per insertion, why this is dangerous, and what concrete defense restores expected $O(1)$ even against this attacker. Reference the relevant assumption.",
              "hint": "The attacker knows $h$ exactly and $m$ is a power of two. What does that let them precompute? Then connect to the SUH assumption (whose randomness is being violated) and to the idea of randomizing the function itself.",
              "solution": "Attack: Because $h$ is deterministic and fully known, the attacker can compute, offline, many distinct parameter-name strings that all share the same hash value — e.g., all mapping to slot 0. (With $m=2^{16}$ a power of two, $h$ only depends on the low 16 bits, and strings colliding under base-31 polynomial hashing are easy to generate algebraically.) By sending one request whose body contains thousands of such colliding parameter names, every insertion collides in the same bucket. With separate chaining, the $k$-th insert scans a chain of length $k-1$ before appending, so inserting $n$ colliding keys costs $1+2+\\cdots+(n-1)=\\Theta(n^2)$ total; each individual operation is $O(n)$. (With open addressing the same blowup happens via one giant probe cluster.)\n\nWhy dangerous: This is a hash-flooding / algorithmic-complexity denial-of-service attack. A single small request consumes quadratic CPU time, letting a low-bandwidth attacker freeze the server — the data-structure analog of an adversarial example exploiting a known deterministic decision rule. (Historically this hit PHP, Java, Python, Ruby, etc.)\n\nAssumption being violated: The expected-$O(1)$ guarantee relies on Simple Uniform Hashing, which assumes the inputs are effectively random with respect to $h$. The attacker deliberately chooses non-random, worst-case inputs, so SUH does not hold and the worst-case $O(n)$ bound governs.\n\nDefense: Randomize the hash function so the attacker cannot predict it. Use a universal/keyed family and choose the key at startup with a secret random seed — e.g., SipHash with a per-process random key (as Python, Rust, and others now do), or a universal family like $h_{a,b}(k)=((ak+b)\\bmod p)\\bmod m$ with random $a,b$. A family is universal when $\\Pr_{h\\in\\mathcal{H}}[h(k_1)=h(k_2)]\\le 1/m$ for all distinct $k_1,k_2$. Now the randomness lives in our secret choice of $h$, not in the input, so for ANY fixed set of attacker keys the expected collisions — and thus expected operation cost — return to $O(1+\\alpha)$. The attacker cannot target a function they cannot see."
            }
          ],
          "examples": [
            {
              "title": "Insert into a chained hash table",
              "body": "Insert the keys $5, 28, 19, 15, 20, 33, 12, 17$ (in this order) into a hash table with $m=9$ slots using chaining and the division-method hash $h(k) = k \\bmod 9$. Show the final table and compute the load factor.",
              "solution": "Compute each $h(k) = k \\bmod 9$, prepending new keys to the front of each bucket's linked list:\n\n- $h(5)=5$ → slot 5: [5]\n- $h(28)=1$ (since $28 = 3\\cdot 9 + 1$) → slot 1: [28]\n- $h(19)=1$ (since $19 = 2\\cdot 9 + 1$) → <strong>collision</strong>, slot 1: [19, 28]\n- $h(15)=6$ → slot 6: [15]\n- $h(20)=2$ → slot 2: [20]\n- $h(33)=6$ (since $33 = 3\\cdot 9 + 6$) → <strong>collision</strong>, slot 6: [33, 15]\n- $h(12)=3$ → slot 3: [12]\n- $h(17)=8$ → slot 8: [17]\n\nFinal table:\n\n| slot | chain |\n|---|---|\n| 0 | — |\n| 1 | 19 → 28 |\n| 2 | 20 |\n| 3 | 12 |\n| 4 | — |\n| 5 | 5 |\n| 6 | 33 → 15 |\n| 7 | — |\n| 8 | 17 |\n\nWe inserted $n=8$ keys into $m=9$ slots, so the <strong>load factor</strong> is $\\alpha = n/m = 8/9 \\approx 0.89$. Two slots (1 and 6) hold collisions of length 2; the longest chain has length 2, so a lookup costs at most 2 key comparisons here — consistent with expected $O(1+\\alpha)$ work."
            },
            {
              "title": "Linear probing and a deletion pitfall",
              "body": "Insert into an open-addressing table of size $m=7$ with linear probing, hash $h(k)=k \\bmod 7$ and probe sequence $h(k,i) = (h(k)+i)\\bmod 7$. Insert keys $10, 22, 31, 4, 15$ in order, then delete $22$ and try to look up $15$. Show why a naive delete (leaving an empty slot) breaks the lookup, and how a tombstone fixes it.",
              "solution": "Compute base hashes: $h(10)=3$, $h(22)=1$, $h(31)=3$, $h(4)=4$, $h(15)=1$.\n\nInsert with linear probing (try $h$, then $h+1$, $h+2$, … mod 7):\n\n- $10$: slot 3 empty → place at 3.\n- $22$: slot 1 empty → place at 1.\n- $31$: slot 3 taken (by 10) → try slot 4, empty → place at 4.\n- $4$: slot 4 taken (by 31) → try slot 5, empty → place at 5.\n- $15$: slot 1 taken (by 22) → try slot 2, empty → place at 2.\n\nTable now:\n\n| 0 | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| — | 22 | 15 | 10 | 31 | 4 | — |\n\n<strong>Naive delete of 22</strong> (just empty slot 1):\n\n| 0 | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| — | — | 15 | 10 | 31 | 4 | — |\n\nNow <strong>look up 15</strong>: its probe sequence starts at $h(15)=1$. Slot 1 is now empty, so the search concludes \"not found\" and stops — even though $15$ is sitting in slot 2. The empty slot at 1 severed the probe chain that 15 relied on. <strong>The lookup is broken.</strong>\n\n<strong>Fix with a tombstone</strong>: mark slot 1 as $\\textsf{DELETED}$ rather than empty. A lookup treats a tombstone as \"keep probing\" (occupied for search purposes), while an insert may reuse it. Re-running lookup of 15: slot 1 is a tombstone → continue to slot 2 → find $15$. Lookup succeeds.\n\n<strong>Answer:</strong> naive deletion leaves a gap that terminates future probe scans early, causing false \"not found\" results for any key that probed past the deleted slot; tombstones preserve probe-chain continuity, so lookups stay correct — at the cost of slots that must eventually be reclaimed by a rehash."
            }
          ]
        },
        {
          "id": "a-trees-heaps",
          "title": "Binary Search Trees, Balancing, and Heaps",
          "minutes": 20,
          "content": "<h3>Why ordered structures matter</h3>\n<p>Suppose you need a collection that answers questions like \"what's the smallest element?\", \"is 42 in here?\", and \"give me everything between 10 and 20\", while also supporting fast insertion and deletion. A sorted array gives you $O(\\log n)$ lookup via binary search, but insertion costs $O(n)$ because you must shift elements. A hash table gives $O(1)$ membership but throws away order entirely — it cannot tell you the minimum or iterate in sorted order. The two structures in this lesson, the <strong>binary search tree (BST)</strong> and the <strong>binary heap</strong>, are the classic answers when you need <em>order</em> plus <em>fast mutation</em>. They are also the workhorses underneath things you use every day in ML systems: priority queues drive Dijkstra and A* search, beam search in sequence decoding, and the frontier in many planning algorithms; balanced trees back ordered maps, interval queries, and nearest-neighbor partitioning ideas (k-d trees are BSTs in disguise).</p>\n\n<h3>Binary search trees: the structure and its invariant</h3>\n<p>A binary search tree is a binary tree where every node stores a key, and the keys obey the <strong>BST property</strong>: for every node $x$, all keys in $x$'s left subtree are less than $x.\\text{key}$, and all keys in its right subtree are greater. (We assume distinct keys for clarity; duplicates are handled with a count field or a consistent tie-break rule.)</p>\n<p>This single invariant is what makes the structure useful. It means an <strong>in-order traversal</strong> — recurse left, visit node, recurse right — emits the keys in sorted order. It also means searching is just a guided walk: at each node you compare and go left or right, never both.</p>\n<pre><code>search(node, k):\n    while node is not null and node.key != k:\n        if k &lt; node.key: node = node.left\n        else:            node = node.right\n    return node    # null if not found\n</code></pre>\n<p>The work done is proportional to the length of the path from the root to where the key is (or to where it would be). That path length is at most the <strong>height</strong> $h$ of the tree. So search, insert, and delete are all $O(h)$. Everything hinges on keeping $h$ small.</p>\n\n<h4>Insertion</h4>\n<p>To insert a key, do exactly the search you would do to find it; when you fall off the tree (reach a null child), that null spot is where the key belongs. Link a new leaf there.</p>\n<pre><code>insert(root, k):\n    if root is null: return Node(k)\n    if k &lt; root.key: root.left  = insert(root.left,  k)\n    else:            root.right = insert(root.right, k)\n    return root\n</code></pre>\n\n<h4>Deletion</h4>\n<p>Deletion is the one genuinely fiddly BST operation. There are three cases for the node $z$ to delete:</p>\n<ol>\n<li><strong>No children (leaf):</strong> just remove it.</li>\n<li><strong>One child:</strong> splice it out — connect its parent directly to its single child.</li>\n<li><strong>Two children:</strong> you cannot simply remove $z$ without orphaning a subtree. Instead, replace $z$'s key with its <strong>in-order successor</strong> — the smallest key in $z$'s right subtree (equivalently, the leftmost node of that subtree). That successor has at most one child (it has no left child, by definition of \"leftmost\"), so deleting <em>it</em> falls back to case 1 or 2.</li>\n</ol>\n<p>Using the successor preserves the BST property because the successor is, by definition, the smallest key larger than everything in the left subtree and smaller than everything else in the right subtree — exactly the role $z$ played. (Using the in-order <em>predecessor</em>, the max of the left subtree, works symmetrically.)</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Every BST operation is \"the search, plus a little cleanup.\" Search is the skeleton; insert adds a leaf where the search ended; delete does the search then patches the hole using a successor that is itself easy to remove. If you can do the search, you are 80% of the way to all three.</p></div>\n\n<h3>The balance problem</h3>\n<p>Here is the catch. Insert $1, 2, 3, 4, 5$ in that order into an empty BST. Each new key is larger than everything present, so it always goes to the right. You get a degenerate tree — a linked list — with height $n-1$. Now search is $O(n)$, and we've gained nothing over an array.</p>\n<p>A perfectly balanced binary tree on $n$ nodes has height $\\lfloor \\log_2 n \\rfloor$, because each level can hold twice as many nodes as the one above it: a tree of height $h$ holds at most $1 + 2 + 4 + \\dots + 2^h = 2^{h+1} - 1$ nodes, so fitting $n$ nodes requires $2^{h+1} - 1 \\ge n$, i.e. $h \\ge \\log_2(n+1) - 1$. Thus any binary tree has height $\\Omega(\\log n)$, and balance achieves this bound. So the <em>best</em> possible height is $\\Theta(\\log n)$ and the <em>worst</em> is $\\Theta(n)$. The entire theory of balanced BSTs exists to guarantee we stay near the best case <em>regardless of insertion order</em>.</p>\n\n<h4>Rotations: the universal repair tool</h4>\n<p>A <strong>rotation</strong> is a local, $O(1)$ restructuring that changes the shape (and height) of a subtree while preserving the BST property. A right rotation at node $y$ with left child $x$ does this:</p>\n<pre><code>      y                 x\n     / \\               / \\\n    x   C    ===>      A   y\n   / \\                    / \\\n  A   B                  B   C\n</code></pre>\n<p>Check the invariant: before, the in-order sequence is $A, x, B, y, C$. After, it is still $A, x, B, y, C$. The relative order is untouched — that's the whole point, and it's why rotations are always legal. A left rotation is the mirror image. Rotations are the atomic moves that <em>every</em> self-balancing scheme uses to fix imbalance; the schemes differ only in <em>when</em> and <em>which</em> rotations they trigger.</p>\n\n<h4>AVL trees</h4>\n<p>An AVL tree enforces a strict balance invariant: for every node, the heights of its two subtrees differ by at most 1. Define a node's <strong>balance factor</strong> as $\\text{height(right)} - \\text{height(left)} \\in \\{-1, 0, +1\\}$. After an insert or delete, you walk back up toward the root updating heights; if any node's balance factor reaches $\\pm 2$, you fix it with one or two rotations (the four cases: LL, RR, LR, RL — named for the direction of the two steps down to the deeper grandchild).</p>\n<p>This invariant forces height $h \\le 1.44 \\log_2 n$, so all operations are $O(\\log n)$. AVL trees are the <em>tightest</em> common balance scheme — shortest trees, hence fastest lookups — at the cost of more rotations on updates.</p>\n\n<h4>Red-black trees</h4>\n<p>Red-black trees relax balance to a clever coloring. Each node is red or black, and the rules are: the root is black; red nodes have black children (no two reds in a row); and every root-to-leaf path passes through the same number of black nodes (the <strong>black height</strong>). These constraints imply that the longest path is at most twice the shortest, giving $h \\le 2 \\log_2(n+1)$ — looser than AVL but still $O(\\log n)$.</p>\n<p>The trade-off: red-black trees do <em>fewer</em> rotations per update (at most 2 on insert, at most 3 on delete) and tolerate more imbalance, making them faster for write-heavy workloads. This is why they back so many standard libraries: C++ <code>std::map</code>/<code>std::set</code>, Java <code>TreeMap</code>, and the Linux kernel's scheduler all use red-black trees.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>AVL vs red-black is the classic <em>read-vs-write</em> dial. AVL keeps trees shorter (faster queries) but rebalances more aggressively; red-black rebalances less (faster updates) at the cost of slightly taller trees. Both guarantee $O(\\log n)$ for search, insert, and delete; they differ only in constants.</p></div>\n\n<h3>Binary heaps and the priority queue</h3>\n<p>Often you don't need full ordering — you only repeatedly need <em>the most extreme element</em>: the smallest distance to expand next, the highest-priority job to run, the largest-loss example to inspect. That abstraction is the <strong>priority queue</strong>: insert elements with keys, and extract the min (or max) on demand. A BST can do this, but a binary heap does it more simply, with better constants, and in a flat array with no pointers.</p>\n\n<h4>The shape and the heap property</h4>\n<p>A binary heap is a <strong>complete binary tree</strong>: every level is full except possibly the last, which is filled left to right. That rigid shape lets us store it in an array with no pointers at all. Using 0-based indexing, the node at index $i$ has:</p>\n$$\\text{parent}(i) = \\left\\lfloor \\tfrac{i-1}{2} \\right\\rfloor, \\qquad \\text{left}(i) = 2i+1, \\qquad \\text{right}(i) = 2i+2.$$\n<p>The ordering rule is the <strong>(min-)heap property</strong>: every node's key is $\\le$ both of its children's keys. This is much weaker than the BST property — it says nothing about left-vs-right ordering between siblings. The only global guarantee is that the minimum sits at the root, index 0. That weakness is exactly why heaps are cheap to maintain.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>BST and heap make opposite bargains. A BST imposes a <em>total</em> order across the whole structure — expensive to maintain, but you get sorted iteration, range queries, predecessor/successor. A heap imposes only a <em>partial</em> order (parent $\\le$ children) — cheap to maintain, but you get only the single extreme element fast. Choose the structure by how much order you actually need. Paying for total order when you only need the min is a common over-engineering mistake.</p></div>\n\n<h4>Sift-up (insert) and sift-down (extract-min)</h4>\n<p>To <strong>insert</strong>, append the new element at the end of the array (the next leaf, preserving completeness), then <strong>sift it up</strong>: while it is smaller than its parent, swap them. It climbs until its parent is smaller or it reaches the root. The path length is the height, so insert is $O(\\log n)$.</p>\n<pre><code>sift_up(A, i):\n    while i &gt; 0 and A[i] &lt; A[parent(i)]:\n        swap(A[i], A[parent(i)])\n        i = parent(i)\n</code></pre>\n<p>To <strong>extract-min</strong>, the answer is <code>A[0]</code>. Move the last element to the root (keeping the tree complete), shrink the array by one, then <strong>sift it down</strong>: repeatedly swap it with its smaller child until it is $\\le$ both children or becomes a leaf. Again $O(\\log n)$.</p>\n<pre><code>sift_down(A, i, n):\n    while true:\n        l, r, smallest = left(i), right(i), i\n        if l &lt; n and A[l] &lt; A[smallest]: smallest = l\n        if r &lt; n and A[r] &lt; A[smallest]: smallest = r\n        if smallest == i: break\n        swap(A[i], A[smallest]); i = smallest\n</code></pre>\n<p>Note we always swap with the <em>smaller</em> child — swapping with the larger one would violate the heap property between the new parent and the other child.</p>\n\n<h4>Build-heap in O(n) — a beautiful argument</h4>\n<p>Given an arbitrary array of $n$ elements, you could build a heap by inserting them one at a time: $n$ inserts at $O(\\log n)$ each gives $O(n \\log n)$. But there's a better way: treat the array as an already-shaped (but unordered) complete tree, and <strong>sift-down every internal node, from the last one up to the root</strong>.</p>\n<pre><code>build_heap(A, n):\n    for i from floor(n/2) - 1 down to 0:\n        sift_down(A, i, n)\n</code></pre>\n<p>Why bottom-up and why only the first half? The leaves (indices $\\lfloor n/2 \\rfloor$ to $n-1$) are already trivially valid heaps of size 1. Processing upward means that when we sift-down a node, its two subtrees are already valid heaps — exactly the precondition sift-down needs.</p>\n<p>The surprising part is the running time. A loose bound says each of $\\sim n/2$ sift-downs costs $O(\\log n)$, giving $O(n \\log n)$. But that's pessimistic: most nodes are near the bottom and barely move. A node at height $\\ell$ above the leaves costs $O(\\ell)$, and there are at most $\\lceil n / 2^{\\ell+1} \\rceil$ such nodes. Summing:</p>\n$$\\sum_{\\ell=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{\\ell+1}} \\cdot O(\\ell) \\;=\\; O\\!\\left(n \\sum_{\\ell=0}^{\\infty} \\frac{\\ell}{2^{\\ell}}\\right) \\;=\\; O(2n) \\;=\\; O(n),$$\n<p>using the identity $\\sum_{\\ell \\ge 0} \\ell / 2^{\\ell} = 2$. So build-heap is <strong>linear</strong>. The intuition: there are many cheap nodes (leaves move 0) and few expensive ones (only the root can move $\\log n$), and the geometric decay makes the cheap ones dominate. This is also the heart of <strong>heapsort</strong>: build a max-heap in $O(n)$, then repeatedly extract-max in $O(\\log n)$ for an in-place $O(n \\log n)$ sort.</p>\n\n<h3>Worked example: build-heap step by step</h3>\n<p>Build a min-heap from <code>A = [5, 3, 8, 1, 9, 2]</code> ($n = 6$, 0-indexed). Internal nodes are indices $0, 1, 2$ (since $\\lfloor 6/2 \\rfloor - 1 = 2$); we process $i = 2, 1, 0$.</p>\n<p>The initial tree (drawn from the array) is:</p>\n<pre><code>          5(0)\n        /      \\\n      3(1)      8(2)\n     /   \\      /\n   1(3)  9(4) 2(5)\n</code></pre>\n<ul>\n<li><strong>$i = 2$ (value 8):</strong> children are index 5 (value 2); the only child 2 &lt; 8, so swap. Array becomes <code>[5, 3, 2, 1, 9, 8]</code>.</li>\n<li><strong>$i = 1$ (value 3):</strong> children are index 3 (value 1) and index 4 (value 9); smallest is 1 &lt; 3, so swap with index 3. Array becomes <code>[5, 1, 2, 3, 9, 8]</code>. Index 3 is now a leaf; stop.</li>\n<li><strong>$i = 0$ (value 5):</strong> children are index 1 (value 1) and index 2 (value 2); smallest is 1, swap with index 1 → <code>[1, 5, 2, 3, 9, 8]</code>. Now value 5 sits at index 1; its children are index 3 (value 3) and index 4 (value 9); smallest is 3 &lt; 5, swap → <code>[1, 3, 2, 5, 9, 8]</code>. Index 3 is a leaf; stop.</li>\n</ul>\n<p>Final heap array: <code>[1, 3, 2, 5, 9, 8]</code>. Verify the heap property: $A[0]=1 \\le \\{3, 2\\}$; $A[1]=3 \\le \\{5, 9\\}$; $A[2]=2 \\le \\{8\\}$. The minimum, 1, is correctly at the root. Note the result is <em>not</em> sorted — a heap is only partially ordered.</p>\n\n<h3>Choosing heap vs BST</h3>\n<table>\n<tr><th>You need...</th><th>Use</th></tr>\n<tr><td>Repeatedly get the min/max, with inserts (Dijkstra, A*, beam search, job scheduling, top-k stream)</td><td><strong>Heap</strong> — simplest, best constants, $O(1)$ peek</td></tr>\n<tr><td>Sorted iteration, range queries, predecessor/successor, find-by-rank</td><td><strong>Balanced BST</strong> — heaps cannot do these</td></tr>\n<tr><td>Search for an arbitrary key in $O(\\log n)$</td><td><strong>BST</strong> — heap search is $O(n)$ (no left/right ordering to guide it)</td></tr>\n<tr><td>Build a structure once from a batch, then drain the extremes</td><td><strong>Heap</strong> — $O(n)$ build beats $O(n \\log n)$ for a BST</td></tr>\n</table>\n<p>Concrete ML/AI tie-in: in <strong>A* and Dijkstra</strong>, the open set is a min-heap keyed by $f = g + h$; you only ever want the most promising node next, so a heap is ideal. In <strong>top-$k$ retrieval</strong> (e.g., keeping the $k$ nearest neighbors or $k$ highest-scoring candidates while streaming), maintain a <em>size-$k$ min-heap</em> of the current best: each new item is compared to the root in $O(1)$ and inserted in $O(\\log k)$ only if it beats the worst kept — total $O(n \\log k)$ and $O(k)$ memory. By contrast, a <strong>BST/ordered map</strong> is the right choice when you need an ordered index — say, querying all events in a time window, or maintaining sorted feature thresholds for a decision-tree split.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Heaps make beam search and best-first search tractable: keeping the top-$b$ hypotheses each step is a bounded-size heap operation, not a full sort. And the $O(n)$ build-heap is why heapsort and median-of-medians-style selection are efficient — the same partial-order-is-cheaper principle shows up wherever you need extremes without full ordering.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>BST:</strong> total order via the BST property; search/insert/delete are $O(h)$. In-order traversal yields sorted output. Delete-with-two-children uses the in-order successor.</li>\n<li><strong>Balance:</strong> unbalanced BSTs degrade to $O(n)$. Rotations are $O(1)$ shape changes that preserve order. AVL (strict, shorter, more rotations) and red-black (looser, fewer rotations) both guarantee $h = O(\\log n)$.</li>\n<li><strong>Heap:</strong> complete tree in a pointerless array; only the partial heap property (parent $\\le$ children). Insert/extract-min are $O(\\log n)$ via sift-up/sift-down; peek-min is $O(1)$; build-heap is $O(n)$.</li>\n<li><strong>Choice:</strong> heap when you need only the extreme; balanced BST when you need order, range, or arbitrary search.</li>\n</ul>",
          "mcq": [
            {
              "q": "When deleting a node with two children from a BST, why do we replace it with its in-order successor (the minimum of the right subtree) rather than an arbitrary node?",
              "choices": [
                "The successor is always a leaf, so removing it is free",
                "The successor is the smallest key larger than everything in the left subtree and smaller than everything else in the right subtree, so it preserves the BST property, and it has at most one child so it is easy to splice out",
                "The successor is always the root of the right subtree",
                "It is the only choice that keeps the tree's height balanced"
              ],
              "answer": 1,
              "explain": "The successor exactly fills the deleted node's ordering role (preserving the invariant) and, being the leftmost node of the right subtree, has no left child, so its own removal reduces to the easy zero/one-child case. (It is not necessarily a leaf, and ordinary BST deletion does not guarantee balance.)"
            },
            {
              "q": "Why is build-heap $O(n)$ rather than $O(n \\log n)$, even though it calls sift-down on about $n/2$ nodes?",
              "choices": [
                "Sift-down is actually $O(1)$ amortized",
                "Only $\\log n$ nodes are ever processed",
                "Most nodes are near the bottom and sift down only a constant amount; the cost is $\\sum_\\ell (n/2^{\\ell+1})\\cdot O(\\ell) = O(n)$ because of geometric decay",
                "The leaves are sorted in advance"
              ],
              "answer": 2,
              "explain": "Cost is dominated by the many cheap low nodes, not the few expensive high ones. The sum $n\\sum \\ell/2^\\ell$ converges to $2n$, giving linear time."
            },
            {
              "q": "You are streaming millions of scored items and must keep the 100 highest-scoring at all times with minimal memory. What is the best structure?",
              "choices": [
                "A balanced BST of all items, then read the top 100 at the end",
                "A min-heap of size 100: compare each new item to the root, replace if larger",
                "A max-heap of all items",
                "A sorted array, inserting each item in order"
              ],
              "answer": 1,
              "explain": "A size-100 min-heap holds the current best 100; its root is the weakest kept item, so each new item is an $O(1)$ comparison and only an $O(\\log 100)$ insert if it wins. This uses $O(k)$ memory and $O(n\\log k)$ time, beating structures that store all $n$ items."
            },
            {
              "q": "What is the essential difference between the heap property and the BST property?",
              "choices": [
                "The heap property orders left vs right children; the BST property does not",
                "The BST property gives a total order (left < node < right) enabling sorted traversal and search; the heap property is only partial (parent ≤ children) with no sibling ordering, guaranteeing only the extreme at the root",
                "They are equivalent; both put the minimum at the root",
                "The heap property requires a balanced tree but the BST property does not"
              ],
              "answer": 1,
              "explain": "The BST property totally orders keys across the structure (so in-order traversal sorts and search is guided), while the heap property only relates each parent to its children, guaranteeing nothing about siblings and thus only that the root is the extreme."
            },
            {
              "q": "In a 0-indexed binary heap stored as a flat array, the node at index 5 has its left child, right child, and parent at which indices, respectively?",
              "choices": [
                "left = 11, right = 12, parent = 2",
                "left = 10, right = 11, parent = 2",
                "left = 11, right = 12, parent = 3",
                "left = 6, right = 7, parent = 4"
              ],
              "answer": 0,
              "explain": "Applying $\\text{left}(i)=2i+1=11$, $\\text{right}(i)=2i+2=12$, and $\\text{parent}(i)=\\lfloor (i-1)/2\\rfloor=\\lfloor 4/2\\rfloor=2$ gives 11, 12, 2."
            },
            {
              "q": "A right rotation is performed at node $y$ whose left child is $x$, with subtrees arranged as in the lesson ($A$ under $x$ on the left, $B$ between them, $C$ to the right of $y$). Which property guarantees the rotation is always a legal BST operation?",
              "choices": [
                "It leaves the in-order traversal sequence ($A, x, B, y, C$) unchanged, so the BST ordering is preserved",
                "It always reduces the height of the subtree, so balance is restored",
                "It recolors the nodes so no two red nodes are adjacent",
                "It moves the smaller of the two keys to the root, satisfying the heap property"
              ],
              "answer": 0,
              "explain": "Rotations are legal precisely because they preserve the in-order key sequence ($A, x, B, y, C$ before and after); they do not necessarily reduce height, recolor, or impose a heap order."
            },
            {
              "q": "You are building an ordered map for a workload with very frequent insertions and deletions but comparatively few lookups. Between AVL and red-black trees, which is the better fit and why?",
              "choices": [
                "Red-black, because it tolerates more imbalance and does fewer rotations per update (at most 2 on insert, 3 on delete)",
                "AVL, because its stricter $\\le 1$ height-difference invariant makes updates cheaper",
                "AVL, because it guarantees $O(\\log n)$ while red-black only guarantees $O(\\log^2 n)$",
                "Red-black, because it produces strictly shorter trees than AVL"
              ],
              "answer": 0,
              "explain": "Red-black trees rebalance less aggressively ($\\le 2$ rotations on insert, $\\le 3$ on delete) and tolerate more imbalance, making them faster for write-heavy workloads, whereas AVL keeps trees shorter at the cost of more rotations. Both guarantee $O(\\log n)$ operations."
            },
            {
              "q": "Why is searching for an arbitrary key in a binary heap $O(n)$, whereas in a balanced BST it is $O(\\log n)$?",
              "choices": [
                "The heap property orders only parent vs. child, giving no left/right rule to prune a branch, so a search may have to scan all nodes",
                "Heaps are stored in arrays, and array access is inherently slower than pointer traversal",
                "The heap is unsorted, so you must first run an $O(n)$ build-heap before every search",
                "Heaps store keys only at the leaves, so internal nodes must all be visited"
              ],
              "answer": 0,
              "explain": "The heap property says nothing about left-vs-right sibling ordering, so a search has no comparison rule to choose a single branch and may need to examine every node, giving $O(n)$."
            },
            {
              "q": "You insert the keys $1, 2, 3, 4, 5$ into an initially empty, unbalanced BST in that exact order. What is the height of the resulting tree (counting edges on the longest root-to-leaf path), and what does this say about worst-case BST search?",
              "choices": [
                "Height 4; the tree degenerates into a linked list, so search is $O(n)$",
                "Height 2; the tree stays roughly balanced, so search is $O(\\log n)$",
                "Height 0; all keys collide at the root, so search is $O(1)$",
                "Height 5; search becomes $O(n \\log n)$ because of repeated comparisons"
              ],
              "answer": 0,
              "explain": "Inserting already-sorted keys makes each new key larger than all existing ones, so every node becomes the right child of the previous one, producing a chain of 5 nodes (4 edges). This degenerate shape is exactly why plain BSTs need balancing: search degrades to $O(n)$."
            },
            {
              "q": "A correct binary max-heap of distinct keys is given. Where is the second-largest element guaranteed to be located?",
              "choices": [
                "At the root, since the heap keeps the two largest at the top",
                "Among the children of the root (index 1 or 2 in a 0-indexed array)",
                "At a leaf node, since smaller elements sink toward the bottom",
                "Anywhere in the tree; the heap property says nothing about its position"
              ],
              "answer": 1,
              "explain": "Every element is smaller than the root, so the second-largest cannot be the root; but any node smaller than the second-largest cannot be its ancestor, meaning the second-largest must be a direct child of the root. The tempting distractor (\"anywhere\") ignores that the heap property forces the second-largest just below the maximum."
            },
            {
              "q": "Both AVL trees and red-black trees keep operations at $O(\\log n)$. A teammate claims an AVL tree's height is always strictly less than a red-black tree's height for the same set of keys. Why is this claim wrong?",
              "choices": [
                "Red-black trees are not actually balanced, so the comparison is meaningless",
                "Both guarantee the same exact height because both are binary search trees",
                "AVL trees enforce a tighter height bound on average but red-black trees are shorter in the worst case",
                "Height depends on insertion order and the specific keys, so neither is universally shorter; AVL only guarantees a tighter worst-case height bound (about $1.44\\log n$ vs roughly $2\\log n$)"
              ],
              "answer": 3,
              "explain": "AVL's stricter balancing gives a smaller worst-case height bound, but for any particular key set and insertion order either tree could end up shorter, so no universal per-instance ordering holds. The claim confuses a worst-case bound with an always-true comparison."
            },
            {
              "q": "You must repeatedly extract the minimum element and also occasionally delete an arbitrary element by value from a collection of $n$ items. Comparing a binary min-heap to a balanced BST, which structure better supports BOTH operations efficiently?",
              "choices": [
                "The binary heap, because both extract-min and arbitrary deletion are $O(1)$",
                "The balanced BST, because find-min and arbitrary deletion are both $O(\\log n)$ once the element's position is known",
                "The binary heap, because heaps are always faster than trees for any operation",
                "Neither; both require $O(n)$ time for extract-min"
              ],
              "answer": 1,
              "explain": "A balanced BST supports find-min in $O(\\log n)$ (leftmost node) and deletion of a located key in $O(\\log n)$, whereas a heap must first do an $O(n)$ search to find an arbitrary value before deleting it. The distractor wrongly assumes heap operations are uniformly cheap, ignoring that arbitrary-value lookup in a heap is $O(n)$."
            },
            {
              "q": "An in-order traversal of a binary search tree visits the keys in what order?",
              "choices": [
                "Descending sorted order",
                "The order in which they were inserted",
                "Level by level, top to bottom",
                "Ascending sorted order"
              ],
              "answer": 3,
              "explain": "In-order traversal (left subtree, then node, then right subtree) of a BST always yields keys in ascending sorted order — a direct consequence of the BST property: everything left of a node is smaller, everything right is larger."
            },
            {
              "q": "In a binary max-heap, where is the maximum element always located?",
              "choices": [
                "At the root (array index 0)",
                "At one of the leaves",
                "At the last filled array position",
                "It can be anywhere in the heap"
              ],
              "answer": 0,
              "explain": "The max-heap property — every parent $\\ge$ its children — forces the largest key up to the root, giving $O(1)$ access to the maximum (why heaps back priority queues). The <em>minimum</em>, by contrast, must sit at some leaf."
            },
            {
              "q": "Extracting the maximum from a binary max-heap of $n$ elements takes how long?",
              "choices": [
                "$O(n)$",
                "$O(1)$",
                "$O(\\log n)$",
                "$O(n\\log n)$"
              ],
              "answer": 2,
              "explain": "You return the root ($O(1)$), move the last element into the root, then sift it down — at most one swap per level, and the heap has height $\\Theta(\\log n)$. So extract-max is $O(\\log n)$. (Merely <em>reading</em> the max without removing it is $O(1)$.)"
            },
            {
              "q": "A binary heap most directly implements which abstract data type?",
              "choices": [
                "A stack",
                "A priority queue",
                "A FIFO queue",
                "A hash map"
              ],
              "answer": 1,
              "explain": "A heap gives $O(1)$ access to the highest- (or lowest-) priority element plus $O(\\log n)$ insert and extract — exactly the priority-queue operations. Stacks and FIFO queues order by insertion, not priority, and a hash map is unordered."
            }
          ],
          "flashcards": [
            {
              "front": "BST property (formal statement)",
              "back": "For every node x: all keys in x's left subtree are < x.key, and all keys in its right subtree are > x.key. Consequence: in-order traversal yields keys in sorted order; search/insert/delete are O(h)."
            },
            {
              "front": "How do you delete a node with two children from a BST?",
              "back": "Replace its key with its in-order successor (the minimum of the right subtree, i.e. the leftmost node there), then delete that successor. The successor has no left child, so its removal reduces to the leaf / one-child case, and the BST property is preserved."
            },
            {
              "front": "What is a rotation and why is it always legal?",
              "back": "An O(1) local restructuring (left or right) that changes subtree shape/height. It is always legal because it preserves the in-order key sequence — e.g., right-rotating y with left child x keeps the order A, x, B, y, C. Rotations are the atomic repair move for all self-balancing BSTs."
            },
            {
              "front": "AVL vs red-black trees",
              "back": "AVL: subtree heights differ by ≤1; height ≤ 1.44 log₂n; shorter trees (faster lookups) but more rotations. Red-black: coloring rules give height ≤ 2 log₂(n+1); fewer rotations per update (≤2 insert, ≤3 delete), better for writes. Both guarantee O(log n) operations."
            },
            {
              "front": "Array indexing for a 0-indexed binary heap",
              "back": "parent(i) = ⌊(i−1)/2⌋, left(i) = 2i+1, right(i) = 2i+2. The structure is a complete binary tree stored with no pointers; the min (min-heap) sits at index 0."
            },
            {
              "front": "Heap operation complexities + why build-heap is O(n)",
              "back": "peek-min O(1); insert (sift-up) and extract-min (sift-down) O(log n). Build-heap is O(n): bottom-up sift-down costs Σ (n/2^(ℓ+1))·O(ℓ) = O(n·Σ ℓ/2^ℓ) = O(2n), since most nodes are low and barely move."
            }
          ],
          "homework": [
            {
              "prompt": "Starting from an empty BST, insert the keys 50, 30, 70, 20, 40, 60, 80 in that order, then delete 50. Draw (describe) the tree after the deletion, and state which node's key replaces 50 and why.",
              "hint": "First build the tree using the BST insert rule (go left if smaller, right if larger). Node 50 has two children, so use the in-order successor: the minimum key in its right subtree.",
              "solution": "After the seven inserts the tree is: root 50, with left child 30 (children 20 and 40) and right child 70 (children 60 and 80). To delete 50 (two children), find its in-order successor = minimum of the right subtree rooted at 70 → walk left from 70 to 60; 60 has no left child, so the successor is 60. Replace 50's key with 60, then delete the original 60 node, which was a leaf (zero children) — trivial removal. Result: root 60, left child 30 (with 20, 40), right child 70 (with only right child 80; 60's old slot is now empty). The BST property holds: everything in the left subtree (20,30,40) < 60 < everything in the right subtree (70,80)."
            },
            {
              "prompt": "Show that inserting the elements 7, 6, 5, 4, 3 one at a time into an initially empty binary min-heap (sift-up each) yields the array [3, 4, 6, 7, 5]. Trace each insertion.",
              "hint": "Append at the end, then sift up while smaller than parent. Use 0-indexed parent(i)=⌊(i−1)/2⌋.",
              "solution": "Start []. Insert 7 → [7]. Insert 6: append → [7,6]; 6 at index 1, parent index 0 =7; 6<7 swap → [6,7]. Insert 5: append → [6,7,5]; 5 at index 2, parent index 0 =6; 5<6 swap → [5,7,6]; index 0 is root, stop. Insert 4: append → [5,7,6,4]; 4 at index 3, parent index 1 =7; 4<7 swap → [5,4,6,7]; 4 now at index 1, parent index 0 =5; 4<5 swap → [4,5,6,7]; stop. Insert 3: append → [4,5,6,7,3]; 3 at index 4, parent index 1 =5; 3<5 swap → [4,3,6,7,5]; 3 now at index 1, parent index 0 =4; 3<4 swap → [3,4,6,7,5]; stop. Final array [3,4,6,7,5]. Check heap property: A[0]=3≤{4,6}; A[1]=4≤{7,5}. Correct, min 3 at root."
            },
            {
              "prompt": "A real-time system must, on each tick, (a) insert new tasks with priorities, (b) repeatedly remove the single highest-priority task, and (c) occasionally report the median priority among all pending tasks. Which data structure(s) would you use and why? Could a single binary heap suffice?",
              "hint": "Separate the requirements. Which need only an extreme element, and which need order/rank information a heap cannot provide?",
              "solution": "Requirements (a) and (b) are exactly the priority-queue pattern: insert + extract-max, each O(log n), peek O(1) — a binary max-heap is ideal and a single heap suffices for those. But (c), the median, requires rank/order information that a heap does not maintain: a heap only guarantees the root is the extreme, with no usable ordering among the rest, so finding the median in a plain heap is O(n). Options: (1) use a balanced BST (order-statistics / augmented with subtree sizes) which gives extract-max in O(log n) AND select-the-median by rank in O(log n) — one structure for all three; or (2) keep the heap for (a)/(b) and add a two-heap median tracker (a max-heap of the lower half plus a min-heap of the upper half, rebalanced so sizes differ by ≤1), giving O(1) median and O(log n) updates. The two-heap trick is the standard streaming-median approach; the order-statistics BST is cleaner if you also need other rank queries. A single ordinary binary heap alone cannot serve (c) efficiently."
            }
          ],
          "examples": [
            {
              "title": "An AVL insertion that triggers a rotation",
              "body": "Insert the keys $10, 20, 30$ in that order into an empty AVL tree, using the balance-factor rule $\\text{bf}(x) = \\text{height(right)} - \\text{height(left)} \\in \\{-1, 0, +1\\}$. Show the tree after each insert, identify the case, and perform the rotation that restores balance.",
              "solution": "We insert exactly as a plain BST, then walk back up checking balance factors.\n\n<strong>Insert 10.</strong> The tree is a single node:\n$$10$$\nThis node is a leaf, $\\text{bf}(10) = 0 - 0 = 0$. Balanced.\n\n<strong>Insert 20.</strong> $20 > 10$, so it becomes the right child:\n$$10 \\to \\text{right child } 20$$\nNow $\\text{bf}(10) = \\text{height(right)} - \\text{height(left)} = 1 - 0 = +1$. Still within $\\{-1,0,+1\\}$, so balanced. No rotation.\n\n<strong>Insert 30.</strong> $30 > 10$ go right to $20$; $30 > 20$ go right again. So $30$ is the right child of $20$, giving the degenerate chain\n$$10 \\to 20 \\to 30 \\quad(\\text{all right children}).$$\nWalk back up updating heights. Node $20$: $\\text{bf} = 1 - 0 = +1$, fine. Node $10$: its right subtree (rooted at $20$) has height $2$, its left subtree is empty (height $0$), so $\\text{bf}(10) = 2 - 0 = +2$. This violates the AVL invariant.\n\n<strong>Identify the case.</strong> From the unbalanced node $10$, the path to the newly inserted node goes Right then Right $\\to$ this is the <strong>RR case</strong>, fixed by a single <em>left rotation</em> at $10$.\n\n<strong>Left rotation at $y = 10$ with right child $x = 20$.</strong> The mirror image of the lesson's right-rotation diagram: $x$'s left subtree ($B$, here empty) becomes $y$'s new right child, and $y$ becomes $x$'s left child. The result:\n$$\\begin{array}{c} 20 \\\\ \\swarrow \\quad \\searrow \\\\ 10 \\qquad 30 \\end{array}$$\n\n<strong>Verify.</strong> The in-order traversal is $10, 20, 30$ both before and after the rotation, so the BST property is preserved (this is why the rotation is legal). Balance factors now: $\\text{bf}(10)=0$, $\\text{bf}(30)=0$, $\\text{bf}(20) = 1 - 1 = 0$. Every node is in $\\{-1,0,+1\\}$, and the height dropped from $2$ to $1$. <strong>Answer:</strong> the final AVL tree is root $20$ with left child $10$ and right child $30$, perfectly balanced, fixed by one left rotation (the RR case)."
            },
            {
              "title": "Heapsort on a concrete array",
              "body": "Sort $A = [4, 10, 3, 5, 1]$ ($n=5$, 0-indexed) in ascending order using heapsort: build a <strong>max</strong>-heap with bottom-up sift-down, then repeatedly swap the root to the end and sift-down the reduced heap. Trace every step.",
              "solution": "Heapsort uses a <em>max</em>-heap (parent $\\ge$ children) so the largest element ends up at the root and gets swapped into the back, growing a sorted suffix.\n\n<strong>Phase 1 — build the max-heap.</strong> Internal nodes are indices $0,1$ (since $\\lfloor 5/2 \\rfloor - 1 = 1$); process $i = 1, 0$ with max-sift-down (swap with the <em>larger</em> child while smaller than it).\n\n<em>$i=1$ (value 10):</em> children are index $3{=}5$ and index $4{=}1$; larger child is $5 < 10$, so $10$ is already $\\ge$ both. No swap. $A = [4,10,3,5,1]$.\n\n<em>$i=0$ (value 4):</em> children are index $1{=}10$ and index $2{=}3$; larger is $10 > 4$, swap with index 1 $\\to A = [10,4,3,5,1]$. Now $4$ sits at index 1; its children are index $3{=}5$ and index $4{=}1$; larger is $5 > 4$, swap with index 3 $\\to A = [10,5,3,4,1]$. Index 3 is now a leaf; stop.\n\nMax-heap built: $A = [10,5,3,4,1]$. Check: $A[0]{=}10 \\ge \\{5,3\\}$, $A[1]{=}5 \\ge \\{4,1\\}$. Valid.\n\n<strong>Phase 2 — repeatedly extract the max to the back.</strong> Let the heap size be $m$, shrinking each round; the suffix $A[m..n{-}1]$ is the sorted region.\n\n<em>Round 1 ($m=5$):</em> swap root $A[0]{=}10$ with $A[4]{=}1 \\to [1,5,3,4,\\mathbf{10}]$; now treat $m=4$. Sift-down index 0 (value 1): children $A[1]{=}5,\\,A[2]{=}3$, larger 5, swap $\\to [5,1,3,4,\\mathbf{10}]$; value 1 at index 1, children $A[3]{=}4$ (index 4 is outside the heap), larger 4, swap $\\to [5,4,3,1,\\mathbf{10}]$. Heap region $[5,4,3,1]$ valid.\n\n<em>Round 2 ($m=4$):</em> swap $A[0]{=}5$ with $A[3]{=}1 \\to [1,4,3,\\mathbf{5},\\mathbf{10}]$; $m=3$. Sift-down index 0 (value 1): children $A[1]{=}4,\\,A[2]{=}3$, larger 4, swap $\\to [4,1,3,\\mathbf{5},\\mathbf{10}]$; value 1 at index 1 has no children inside $m=3$; stop. Heap region $[4,1,3]$ valid.\n\n<em>Round 3 ($m=3$):</em> swap $A[0]{=}4$ with $A[2]{=}3 \\to [3,1,\\mathbf{4},\\mathbf{5},\\mathbf{10}]$; $m=2$. Sift-down index 0 (value 3): only child $A[1]{=}1 < 3$; no swap. Heap region $[3,1]$ valid.\n\n<em>Round 4 ($m=2$):</em> swap $A[0]{=}3$ with $A[1]{=}1 \\to [1,\\mathbf{3},\\mathbf{4},\\mathbf{5},\\mathbf{10}]$; $m=1$. A single-element heap is trivially sorted; stop.\n\n<strong>Answer:</strong> $A = [1,3,4,5,10]$, sorted ascending. The cost was $O(n)$ to build the heap plus $n{-}1$ extract-down steps at $O(\\log n)$ each, giving the in-place $O(n \\log n)$ heapsort. Note that selecting the max each round and parking it just before the previous maxima is exactly what produces the ascending order from a max-heap."
            }
          ]
        }
      ]
    },
    {
      "id": "a-sorting-searching",
      "title": "Sorting & Searching",
      "lessons": [
        {
          "id": "a-comparison-sorts",
          "title": "Comparison Sorts and the n log n Bound",
          "minutes": 18,
          "content": "<h3>Why \"Comparison Sort\"? Setting the Rules of the Game</h3>\n<p>Before we compare algorithms, we need to fix the <em>model of computation</em>. A <strong>comparison sort</strong> is any algorithm that can learn about the relative order of elements <em>only</em> by asking questions of the form \"is $a_i \\le a_j$?\" It never looks at the bits of a key, never uses a key as an array index, never hashes. The only primitive is the pairwise comparison.</p>\n<p>This is not a pedantic distinction. It is exactly the line that separates merge sort, quicksort, and heapsort (all comparison sorts) from counting sort and radix sort (which exploit the structure of the keys and can beat $n \\log n$). When we prove the famous $\\Omega(n \\log n)$ lower bound, it holds <em>only</em> inside this model — and understanding why is more illuminating than the bound itself.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Sorting is the silent workhorse of machine learning. Computing AUC/ROC, ranking metrics like NDCG, percentile clipping for robust statistics, building decision-tree splits (sort feature values, then sweep candidate thresholds), nearest-neighbor heaps, and beam search all sit on a sort or a partial sort. The $\\Omega(n \\log n)$ barrier is precisely why <code>np.argsort</code> dominates the profile of a naive decision-tree trainer, and why approximate / radix-style tricks show up in high-performance gradient-boosting libraries.</p>\n</div>\n\n<h3>Three Properties We Will Track</h3>\n<p>For every algorithm we measure three things. Internalize these definitions; the entire lesson is a tour through their trade-offs.</p>\n<ul>\n<li><strong>Time complexity</strong> — number of comparisons (and moves) as a function of $n$, in the best, average, and worst case.</li>\n<li><strong>Space complexity</strong> — <em>auxiliary</em> memory beyond the input array. An algorithm is <strong>in-place</strong> if it uses $O(1)$ or $O(\\log n)$ extra space (the $O(\\log n)$ allowance covers a recursion stack).</li>\n<li><strong>Stability</strong> — a sort is <strong>stable</strong> if equal keys keep their original relative order. If records $(5, \\text{A})$ and $(5, \\text{B})$ appear in that order in the input, a stable sort guarantees they appear in that order in the output.</li>\n</ul>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Stability sounds like a footnote until you sort by multiple keys. Want records sorted by <em>last name, then first name</em>? Stable-sort by first name, then stable-sort by last name. The second pass preserves the first pass's order within each last-name group. This \"sort by secondary key first\" idiom is exactly how <code>pandas.sort_values</code> with multiple columns and radix sort both work.</p>\n</div>\n\n<h3>Merge Sort: Divide, Conquer, and Merge</h3>\n<p>Merge sort is the cleanest expression of divide-and-conquer. Split the array in half, recursively sort each half, then <strong>merge</strong> the two sorted halves into one sorted whole.</p>\n<pre><code>function merge_sort(A):\n    if length(A) <= 1: return A\n    mid = length(A) / 2\n    L = merge_sort(A[0 .. mid-1])\n    R = merge_sort(A[mid .. end])\n    return merge(L, R)\n\nfunction merge(L, R):\n    result = []\n    i = 0, j = 0\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]:        # note: <= , not <  — this is the key to stability\n            result.append(L[i]); i += 1\n        else:\n            result.append(R[j]); j += 1\n    append remaining of L, then remaining of R\n    return result</code></pre>\n\n<h4>The cost: solving the recurrence</h4>\n<p>Each merge of two lists totaling $n$ elements costs $\\Theta(n)$ comparisons and moves, because every element is appended exactly once. The recurrence is therefore</p>\n$$T(n) = 2\\,T\\!\\left(\\tfrac{n}{2}\\right) + \\Theta(n).$$\n<p>By the Master Theorem this is the balanced case ($a = b^d$ with $a=2$, $b=2$, $d=1$), giving $T(n) = \\Theta(n \\log n)$. The intuition is sharper than the formula: the recursion tree has $\\log_2 n$ levels, and <em>every level does $\\Theta(n)$ total work</em> (the merges at one level partition all $n$ elements). Height $\\times$ work-per-level $= \\log n \\times n$.</p>\n<p>Crucially, merge sort's $\\Theta(n \\log n)$ holds in <em>all</em> cases — best, average, and worst. There is no input that defeats it. The price is space.</p>\n\n<h4>Space and stability</h4>\n<p>The standard array merge needs a scratch buffer of size $n$, so merge sort is <strong>not in-place</strong>: it uses $\\Theta(n)$ auxiliary memory. (In-place merge variants exist but are slow or intricate, and a linked-list merge sort needs only $O(1)$ extra by relinking nodes.)</p>\n<p>Merge sort <strong>is stable</strong>, and the reason is a single character. In the merge step, when <code>L[i] == R[j]</code> we take from <code>L</code> first because the test is <code>L[i] <= R[j]</code>. Since <code>L</code> is the left half, its elements were <em>earlier in the original array</em>. Taking from the left on ties preserves original order. Flip the comparison to <code>L[i] < R[j]</code> (taking from <code>R</code> on ties) and you have silently created an <em>unstable</em> sort. Stability is not automatic — it is a deliberate tie-breaking convention, maintained recursively because each half is already stably sorted.</p>\n\n<h3>Quicksort: Partition in Place</h3>\n<p>Quicksort is also divide-and-conquer, but it does the hard work <em>before</em> the recursion rather than after. Choose a <strong>pivot</strong>; <strong>partition</strong> the array so everything $\\le$ pivot is on the left and everything $>$ pivot is on the right; then recurse on each side. There is no merge step — once partitioned, the pieces are already in their correct relative regions.</p>\n\n<h4>The Lomuto partition scheme</h4>\n<p>The simplest partition uses the last element as pivot and maintains an index <code>i</code> marking the boundary of the \"$\\le$ pivot\" region.</p>\n<pre><code>function partition(A, lo, hi):     # pivot = A[hi]\n    pivot = A[hi]\n    i = lo - 1                      # i = last index known <= pivot\n    for j = lo to hi-1:\n        if A[j] <= pivot:\n            i += 1\n            swap A[i], A[j]\n    swap A[i+1], A[hi]             # put pivot into its final slot\n    return i+1                      # pivot's final index\n\nfunction quicksort(A, lo, hi):\n    if lo < hi:\n        p = partition(A, lo, hi)\n        quicksort(A, lo, p-1)\n        quicksort(A, p+1, hi)</code></pre>\n<p>After <code>partition</code> returns <code>p</code>, the element at index <code>p</code> is in its <em>final sorted position</em> — it will never move again. That is the invariant that makes quicksort correct.</p>\n\n<h4>Average $\\Theta(n \\log n)$ vs. worst $\\Theta(n^2)$</h4>\n<p>Partitioning a subarray of size $m$ costs $\\Theta(m)$ comparisons. The recursion's shape — hence its total cost — depends entirely on how <em>balanced</em> the partitions are.</p>\n<ul>\n<li><strong>Balanced (ideal) case:</strong> each pivot lands near the median, splitting the array into two near-equal halves. Same recurrence as merge sort, $T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n \\log n)$.</li>\n<li><strong>Worst case:</strong> each pivot is the minimum or maximum, so one side has $0$ elements and the other has $m-1$. The recurrence degenerates to $T(n) = T(n-1) + \\Theta(n) = \\Theta(n^2)$. With the Lomuto \"last element as pivot\" rule, this happens on an <em>already-sorted</em> (or reverse-sorted) array — a nasty surprise in practice.</li>\n</ul>\n<p>The average case requires the key insight that you do not need <em>perfect</em> balance — you only need to avoid <em>consistently terrible</em> balance. Even a split as lopsided as $1:9$ at every level still gives $\\Theta(n \\log n)$, because the recursion depth is $\\log_{10/9} n = \\Theta(\\log n)$. Averaged over random pivot choices, the expected number of comparisons is $\\approx 1.39\\, n \\log_2 n$, only about 39% more than the optimum. The formal argument computes the probability that elements of ranks $i$ and $j$ are ever compared (it is $\\frac{2}{j-i+1}$) and sums to get $2n\\ln n$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Why is quicksort the default in most standard libraries despite an $O(n^2)$ worst case, while merge sort with its guaranteed $O(n\\log n)$ is often not? Two words: <em>constants</em> and <em>cache</em>. Quicksort partitions in place with tight, sequential memory access and a small inner loop, so its constant factor is tiny and it is friendly to CPU caches. Merge sort's $\\Theta(n)$ buffer means extra memory traffic. Real libraries also defend the worst case: <strong>introsort</strong> (used in C++ <code>std::sort</code>) runs quicksort but switches to heapsort once recursion depth exceeds $\\sim 2\\log_2 n$, guaranteeing $O(n \\log n)$ while keeping quicksort's speed in the common case.</p>\n</div>\n\n<h4>Pivot choice</h4>\n<p>The Achilles' heel is pivot selection. Common strategies, in increasing robustness:</p>\n<ul>\n<li><strong>First / last element</strong> — simple but $O(n^2)$ on sorted input. Avoid.</li>\n<li><strong>Random pivot</strong> — choose uniformly at random. Now no <em>fixed</em> input is bad; an adversary cannot pre-arrange a worst case. Expected $\\Theta(n \\log n)$.</li>\n<li><strong>Median-of-three</strong> — take the median of <code>A[lo]</code>, <code>A[mid]</code>, <code>A[hi]</code>. Cheap, and it makes already-sorted input a <em>best</em> case rather than the worst.</li>\n<li><strong>Median-of-medians</strong> — a deterministic $O(n)$ algorithm to find a guaranteed-good pivot, yielding worst-case $O(n \\log n)$. Beautiful in theory, large constants in practice.</li>\n</ul>\n\n<h4>Space and stability</h4>\n<p>Quicksort sorts <strong>in place</strong>: partitioning only swaps within the array. Its space cost is the recursion stack, $O(\\log n)$ if you always recurse into the smaller side first, $O(n)$ in the naive worst case. Quicksort is <strong>not stable</strong> — the long-distance swaps in partitioning reorder equal elements arbitrarily. (Stable quicksort variants exist but require $O(n)$ extra space, sacrificing its main advantage.)</p>\n\n<h3>Heapsort: Selection Sort Done Right</h3>\n<p>Heapsort gets the best of both prior algorithms' guarantees: $\\Theta(n \\log n)$ worst case <em>and</em> in-place — at the cost of stability and cache-friendliness. The idea: build a <strong>binary max-heap</strong> from the array, then repeatedly extract the maximum.</p>\n<p>A max-heap is a complete binary tree (stored implicitly in the array: node $i$ has children $2i+1$ and $2i+2$) where each parent $\\ge$ its children. So the maximum sits at the root, index 0.</p>\n<pre><code>function heapsort(A):\n    build_max_heap(A)              # O(n)  -- yes, linear, not n log n\n    for end = n-1 down to 1:\n        swap A[0], A[end]         # move current max to the end\n        sift_down(A, 0, end)      # restore heap on A[0 .. end-1]</code></pre>\n<p>Two cost facts worth knowing:</p>\n<ul>\n<li><strong>Building the heap is $O(n)$</strong>, not $O(n \\log n)$. Sifting down from the bottom up, most nodes are near the leaves and sift only a short distance; the sum $\\sum_h \\frac{n}{2^{h+1}} \\cdot O(h)$ converges to $O(n)$.</li>\n<li><strong>Each of the $n$ extractions costs $O(\\log n)$</strong> for the <code>sift_down</code>, giving $\\Theta(n \\log n)$ overall — in <em>every</em> case.</li>\n</ul>\n<p>Heapsort is <strong>in-place</strong> ($O(1)$ auxiliary) but <strong>not stable</strong> (swapping the root to the end jumbles equal keys) and tends to be slower in wall-clock terms than quicksort because its memory access pattern jumps around the array, defeating the cache. Its real value is the worst-case guarantee combined with $O(1)$ space — which is exactly why introsort falls back to it.</p>\n\n<h3>The $\\Omega(n \\log n)$ Lower Bound: The Decision-Tree Argument</h3>\n<p>We now prove that <em>no</em> comparison sort can beat $n \\log n$ in the worst case. This is a statement about a whole class of algorithms at once — a different and deeper kind of claim than analyzing one algorithm.</p>\n<p>Model any comparison sort as a <strong>decision tree</strong>. Each internal node is one comparison \"$a_i \\le a_j$?\"; the two outgoing edges are the yes/no answers; each <em>leaf</em> is a final output — a specific permutation of the input that the algorithm declares \"sorted.\" Running the algorithm on a particular input traces one root-to-leaf path: the sequence of comparison outcomes that input produces. The <strong>worst-case number of comparisons is the height of the tree</strong> (the longest path).</p>\n<p>Now the counting argument:</p>\n<ol>\n<li>A correct sort must produce the right ordering for <em>every</em> one of the $n!$ possible input permutations. Two different input permutations require two different rearrangements, so they must reach <em>different leaves</em>. Hence the tree has at least $n!$ leaves: $\\;\\text{leaves} \\ge n!$.</li>\n<li>A binary tree of height $h$ has at most $2^h$ leaves: $\\;\\text{leaves} \\le 2^h$.</li>\n<li>Combine: $2^h \\ge n!$, so $h \\ge \\log_2(n!)$.</li>\n</ol>\n<p>Finally, estimate $\\log_2(n!)$. By Stirling's approximation, $n! \\approx \\sqrt{2\\pi n}\\,(n/e)^n$, so</p>\n$$\\log_2(n!) = n \\log_2 n - n \\log_2 e + O(\\log n) = \\Theta(n \\log n).$$\n<p>A quick rigorous lower bound without Stirling: the top half of the factorial's terms are each $\\ge n/2$, so $n! \\ge (n/2)^{n/2}$, giving $\\log_2(n!) \\ge \\frac{n}{2}\\log_2\\frac{n}{2} = \\Omega(n \\log n)$. Either way, $h = \\Omega(n \\log n)$.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>This is a genuine <em>information-theoretic</em> lower bound, and the same template recurs all over CS and ML. To pin down which of $n!$ orderings is correct, you must extract $\\log_2(n!) \\approx n\\log_2 n$ bits of information, and each comparison yields at most 1 bit (one yes/no). You cannot get $n\\log n$ bits from fewer than $n\\log n$ binary questions. The identical reasoning bounds the number of queries in active learning, the depth of a decision tree needed to separate classes, the sample complexity hidden in $\\log|\\mathcal{H}|$ for a hypothesis class, and why \"20 questions\" can distinguish at most $2^{20}$ objects. Lower bounds like this tell you when you should <em>stop</em> trying to be clever — and they reveal that counting/radix sorts escape the bound precisely because they extract more than one bit per operation by reading key structure directly.</p>\n</div>\n\n<h3>Worked Example: Tracing a Lomuto Partition</h3>\n<p>Let's partition <code>A = [7, 2, 9, 3, 5]</code> with <code>lo = 0</code>, <code>hi = 4</code>, so the pivot is <code>A[4] = 5</code>. Recall the invariant: after processing index <code>j</code>, everything in <code>A[lo..i]</code> is $\\le$ pivot, and <code>A[i+1..j]</code> is $>$ pivot. Start with <code>i = -1</code>.</p>\n<pre><code>pivot = 5,  i = -1\nj=0: A[0]=7 <= 5? NO.   i stays -1.   A = [7, 2, 9, 3, | 5]\nj=1: A[1]=2 <= 5? YES.  i=0; swap A[0],A[1].  A = [2, 7, 9, 3, | 5]\nj=2: A[2]=9 <= 5? NO.   i stays 0.   A = [2, 7, 9, 3, | 5]\nj=3: A[3]=3 <= 5? YES.  i=1; swap A[1],A[3].  A = [2, 3, 9, 7, | 5]\nend of loop: swap A[i+1]=A[2] with A[hi]=A[4].  A = [2, 3, 5, 7, 9]\nreturn p = i+1 = 2</code></pre>\n<p>The pivot <code>5</code> now sits at index <code>2</code>, its final sorted position. Everything left of it (<code>2, 3</code>) is $\\le 5$; everything right (<code>7, 9</code>) is $> 5$. Quicksort then recurses on <code>A[0..1] = [2,3]</code> and <code>A[3..4] = [7,9]</code>. Notice the partition did <strong>not</strong> sort each side — it only established the two regions; the recursion handles the rest. Notice too that <code>7</code> and <code>9</code> got swapped around relative to each other versus the input order — a small illustration of why quicksort is not stable.</p>\n\n<h3>The Cheat Sheet: Matching Sorts to Profiles</h3>\n<table>\n<thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space (aux)</th><th>Stable?</th><th>In-place?</th></tr></thead>\n<tbody>\n<tr><td><strong>Merge sort</strong></td><td>$n\\log n$</td><td>$n\\log n$</td><td>$n\\log n$</td><td>$O(n)$</td><td>Yes</td><td>No</td></tr>\n<tr><td><strong>Quicksort</strong></td><td>$n\\log n$</td><td>$n\\log n$</td><td>$n^2$</td><td>$O(\\log n)$ stack</td><td>No</td><td>Yes</td></tr>\n<tr><td><strong>Heapsort</strong></td><td>$n\\log n$</td><td>$n\\log n$</td><td>$n\\log n$</td><td>$O(1)$</td><td>No</td><td>Yes</td></tr>\n</tbody>\n</table>\n<p>Read this table as a set of trade-offs, not a ranking. There is no comparison sort that is simultaneously worst-case $O(n\\log n)$, in-place, <em>and</em> stable with small constants — you pick two or three properties and pay for the rest. <strong>Merge sort</strong> buys stability and worst-case guarantees with $O(n)$ space. <strong>Quicksort</strong> buys speed and in-place operation by gambling on the worst case (mitigated by randomization). <strong>Heapsort</strong> buys the worst-case guarantee <em>and</em> $O(1)$ space by giving up stability and cache locality. The right default — used by Python's <code>sorted</code> (Timsort, a stable merge/insertion hybrid) and C++ <code>std::sort</code> (introsort) — is usually a clever hybrid that combines several of these.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Takeaways</div>\n<p>(1) All three sorts achieve $\\Theta(n\\log n)$ on average; they differ in worst case, space, and stability. (2) Stability is a tie-breaking convention you must engineer (merge's <code>&lt;=</code>), not a free property. (3) Quicksort's worst case is about <em>pivot balance</em>, fixed by randomization or median-of-three. (4) The $\\Omega(n\\log n)$ lower bound is information-theoretic — $\\log_2(n!) = \\Theta(n\\log n)$ bits must be learned, one bit per comparison — and applies to every comparison sort, which is why key-exploiting sorts can beat it.</p>\n</div>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"algo-sorting\"></div>\n<h4>Try it yourself</h4>\n<p>Run it, then tinker — change the inputs and re-run. The badge confirms when your output matches.</p>\n<div data-code=\"python\" data-expected=\"[1, 2, 3, 5, 7, 9]\">def bubble_sort(a):\n    a = a[:]\n    for i in range(len(a)):\n        for j in range(len(a) - 1 - i):\n            if a[j] &gt; a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a\n\nprint(bubble_sort([5, 2, 9, 1, 7, 3]))</div>",
          "mcq": [
            {
              "q": "In the merge step of merge sort, the comparison is written as $L[i] \\le R[j]$ (take from the left half on ties). What happens if you change it to $L[i] < R[j]$ (take from the right half on ties)?",
              "choices": [
                "Nothing changes; the sort behaves identically",
                "The sort becomes unstable but stays correct and $\\Theta(n\\log n)$",
                "The sort becomes incorrect (no longer sorted)",
                "The worst-case time degrades to $\\Theta(n^2)$"
              ],
              "answer": 1,
              "explain": "Both comparisons produce a correctly sorted output in $\\Theta(n\\log n)$ time. But taking from the right half on ties moves later-originating equal elements ahead of earlier ones, destroying stability. Stability hinges on this single tie-breaking choice."
            },
            {
              "q": "Using the Lomuto scheme with the last element as pivot, which input is the WORST case (drives quicksort to $\\Theta(n^2)$)?",
              "choices": [
                "A randomly shuffled array",
                "An already-sorted (ascending) array",
                "An array where all elements are distinct and roughly median-balanced",
                "An array of length 1"
              ],
              "answer": 1,
              "explain": "With last-element-as-pivot, a sorted array makes every pivot the maximum of its subarray, so each partition peels off just one element: $T(n)=T(n-1)+\\Theta(n)=\\Theta(n^2)$. Random/median-of-three pivoting fixes exactly this."
            },
            {
              "q": "The decision-tree lower bound shows any comparison sort needs $\\Omega(n\\log n)$ comparisons in the worst case. The core of the argument is that the tree must have at least how many leaves?",
              "choices": [
                "$2^n$",
                "$n^2$",
                "$n!$",
                "$\\log_2 n$"
              ],
              "answer": 2,
              "explain": "Each of the $n!$ input permutations needs a distinct rearrangement, hence a distinct leaf, so leaves $\\ge n!$. A binary tree of height $h$ has $\\le 2^h$ leaves, so $h \\ge \\log_2(n!) = \\Theta(n\\log n)$."
            },
            {
              "q": "Which single algorithm is worst-case $\\Theta(n\\log n)$ AND in-place ($O(1)$ auxiliary space)?",
              "choices": [
                "Merge sort",
                "Quicksort",
                "Heapsort",
                "None of these can be both"
              ],
              "answer": 2,
              "explain": "Heapsort builds a max-heap and extracts the max $n$ times, all within the array: $O(1)$ extra space and $\\Theta(n\\log n)$ in every case. Merge sort needs $O(n)$ space; quicksort's worst case is $\\Theta(n^2)$. Heapsort's cost is being unstable and cache-unfriendly."
            },
            {
              "q": "Counting sort can sort $n$ integers in $O(n+k)$ time, apparently beating the $\\Omega(n\\log n)$ bound. Why is this NOT a contradiction?",
              "choices": [
                "Counting sort is not a comparison sort, so the $\\Omega(n\\log n)$ bound (which only applies inside the comparison model) does not constrain it",
                "The bound is wrong; $\\Omega(n\\log n)$ is only an average-case bound and counting sort hits the best case",
                "Counting sort secretly performs $n\\log n$ comparisons hidden inside the counting array",
                "$O(n+k)$ is actually larger than $O(n\\log n)$ whenever $k > \\log n$"
              ],
              "answer": 0,
              "explain": "The $\\Omega(n\\log n)$ lower bound holds only within the comparison model, and counting sort escapes it precisely by using keys as array indices rather than pairwise comparisons."
            },
            {
              "q": "You have records $(3,\\text{X}),(1,\\text{Y}),(3,\\text{Z})$ to sort by the integer key. A sort returns $(1,\\text{Y}),(3,\\text{Z}),(3,\\text{X})$. What can you conclude?",
              "choices": [
                "The sort is not stable, because the equal keys $3$ appeared as X-then-Z in the input but Z-then-X in the output",
                "The sort is stable, because the keys are in non-decreasing order",
                "The sort is in-place, since the output reused the same positions",
                "Nothing about stability can be inferred from a single example"
              ],
              "answer": 0,
              "explain": "Stability requires equal keys to preserve their input order, and here X originally preceded Z but now follows it, so this single counterexample proves the sort is not stable."
            },
            {
              "q": "Per the lesson's definition, an algorithm is still considered in-place if its only extra memory is an $O(\\log n)$ recursion stack. Why is this allowance granted?",
              "choices": [
                "It accommodates the recursion-stack depth of divide-and-conquer sorts like quicksort, which is $O(\\log n)$ for balanced splits",
                "Because $O(\\log n)$ space rounds down to $O(1)$ for all practical input sizes",
                "Because the recursion stack is stored in the input array, not auxiliary memory",
                "Because comparisons, not space, are what the $\\Omega(n\\log n)$ bound counts"
              ],
              "answer": 0,
              "explain": "The lesson defines in-place as $O(1)$ or $O(\\log n)$ extra space precisely so that recursive divide-and-conquer sorts, whose stack depth is logarithmic with balanced partitions, still qualify."
            },
            {
              "q": "To sort records by last name, then by first name within each last-name group, the lesson's idiom is to:",
              "choices": [
                "Stable-sort by first name first, then stable-sort by last name",
                "Stable-sort by last name first, then stable-sort by first name",
                "Sort by last name only; first-name order is automatically preserved",
                "Concatenate last and first names into one key and sort once"
              ],
              "answer": 0,
              "explain": "You stable-sort by the secondary key (first name) first, then by the primary key (last name); the final stable pass groups by last name while preserving the first-name order within each group."
            },
            {
              "q": "A colleague claims their sort runs in $O(n)$ on any array of $n$ doubles by first scanning to find the min and max, then bucketing. You point out this is fine only under certain assumptions. Which statement is the most accurate critique within the lesson's framework?",
              "choices": [
                "A min/max scan is itself a comparison sort, so it is already bound by $\\Omega(n\\log n)$",
                "Bucketing exploits key values as indices, so it leaves the comparison model and its $O(n)$ claim is not contradicted by the $\\Omega(n\\log n)$ bound — but it relies on the keys' distribution/range, not on comparisons alone",
                "Finding min and max takes $\\Omega(n\\log n)$, so the overall claim is impossible",
                "Doubles cannot be bucketed at all, so the algorithm is simply incorrect"
              ],
              "answer": 1,
              "explain": "Bucketing uses key values to compute array positions, which steps outside the comparison-only model, so the $\\Omega(n\\log n)$ bound does not apply; its linear time depends on assumptions about the key range/distribution, not on comparisons. Finding min/max is $O(n)$, not $\\Omega(n\\log n)$, ruling out the other options."
            },
            {
              "q": "The decision-tree argument gives a height of at least $\\lceil \\log_2(n!) \\rceil$ comparisons. Using Stirling's approximation, $\\log_2(n!)$ is asymptotically closest to which expression?",
              "choices": [
                "$n^2/2$",
                "$n\\log_2 n - n\\log_2 e + O(\\log n)$",
                "$2^n$",
                "$\\log_2 n$"
              ],
              "answer": 1,
              "explain": "Stirling gives $\\ln n! = n\\ln n - n + O(\\ln n)$, so $\\log_2 n! = n\\log_2 n - n\\log_2 e + O(\\log n)$, whose leading term $n\\log_2 n$ yields the $\\Omega(n\\log n)$ bound. The $n^2/2$ count is the number of comparisons in bubble sort, not the information-theoretic minimum."
            },
            {
              "q": "Suppose someone proposes a comparison sort and argues it averages only $0.5\\,n$ comparisons over all $n!$ input permutations, beating $n\\log n$. What does the decision-tree model tell us is wrong with this claim?",
              "choices": [
                "The average path length (external path length / number of leaves) of a binary tree with $n!$ leaves is still $\\Omega(n\\log n)$, so no comparison sort can average fewer than that many comparisons",
                "The $\\Omega(n\\log n)$ bound only constrains the worst case, so a $0.5\\,n$ average is perfectly consistent with it",
                "Average-case analysis is meaningless because inputs are never uniformly distributed",
                "Such a sort must be unstable, which violates the comparison model"
              ],
              "answer": 0,
              "explain": "A binary tree with $n!$ leaves has average root-to-leaf depth $\\Omega(\\log(n!)) = \\Omega(n\\log n)$, so the average number of comparisons is also lower-bounded, not just the worst case. The tempting answer that the bound is worst-case-only is the misconception: the leaf-counting argument forces an average-case bound too."
            },
            {
              "q": "You sort $n=8$ already-sorted distinct keys with a textbook mergesort and, separately, with Lomuto-pivot quicksort that always picks the last element as pivot. Comparing only the number of element-to-element comparisons, what do you expect?",
              "choices": [
                "Both perform about the same because both are $\\Theta(n\\log n)$ on sorted input",
                "Quicksort makes far fewer comparisons because the array is already sorted",
                "Mergesort makes roughly $\\Theta(n\\log n)$ comparisons while quicksort degrades to roughly $\\Theta(n^2)$ on this sorted input",
                "Mergesort makes $\\Theta(n^2)$ comparisons because merging a sorted array is wasteful"
              ],
              "answer": 2,
              "explain": "On already-sorted input the last-element Lomuto pivot is always the maximum, producing maximally unbalanced partitions and $\\Theta(n^2)$ comparisons, while mergesort stays $\\Theta(n\\log n)$ regardless of input order. The trap is assuming sorted input is the easy case for quicksort — for this pivot rule it is the worst case."
            },
            {
              "q": "Merge sort runs in $\\Theta(n\\log n)$ but is not in-place. Why?",
              "choices": [
                "Because it is unstable",
                "Because it is recursive",
                "Because it compares elements",
                "It needs $\\Theta(n)$ auxiliary memory to merge the two halves"
              ],
              "answer": 3,
              "explain": "The merge step copies the two sorted halves into a temporary buffer of size $\\Theta(n)$. Recursion depth ($\\Theta(\\log n)$ stack) isn't the issue — it's that linear scratch array. (Merge sort is, in fact, stable.)"
            },
            {
              "q": "Quicksort's average-case running time is $\\Theta(n\\log n)$. What is its worst case?",
              "choices": [
                "$\\Theta(n\\log n)$",
                "$\\Theta(n^2)$",
                "$\\Theta(n)$",
                "$\\Theta(\\log n)$"
              ],
              "answer": 1,
              "explain": "With an unlucky pivot (e.g. always the smallest/largest, as on already-sorted input with a naive last-element pivot), each partition removes just one element, giving $n + (n-1) + \\dots = \\Theta(n^2)$. Randomized or median-of-three pivots make this case astronomically unlikely."
            },
            {
              "q": "How long does insertion sort take on an array of $n$ elements that is already sorted?",
              "choices": [
                "$\\Theta(n\\log n)$",
                "$\\Theta(n^2)$",
                "$\\Theta(n)$ — each element is compared once and never shifted",
                "$\\Theta(1)$"
              ],
              "answer": 2,
              "explain": "Insertion sort's best case is a sorted (or nearly-sorted) array: each new element needs just one comparison against its predecessor and no shifting, so the inner loop never runs — $\\Theta(n)$. Its worst case (reverse-sorted) is $\\Theta(n^2)$."
            },
            {
              "q": "What does it mean for a sorting algorithm to be <em>stable</em>?",
              "choices": [
                "Records with equal keys keep their original relative order",
                "It uses only $O(1)$ extra space",
                "It has no bad worst case",
                "It works on any data type"
              ],
              "answer": 0,
              "explain": "Stability means equal keys come out in the same order they went in — essential when sorting by one field after another (e.g. by first name, then a stable sort by last name). Using $O(1)$ space is <em>in-place</em>, a separate property."
            }
          ],
          "flashcards": [
            {
              "front": "State the recurrence for merge sort and its solution, and explain the per-level intuition.",
              "back": "$T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n\\log n)$. The recursion tree has $\\log_2 n$ levels, and each level does $\\Theta(n)$ total merge work, so total $= n \\times \\log n$. Holds in best, average, and worst case."
            },
            {
              "front": "Why is merge sort stable but quicksort and heapsort are not?",
              "back": "Merge sort breaks ties by taking from the left (earlier) half first ($L[i] \\le R[j]$), preserving original order of equal keys. Quicksort's long-distance partition swaps and heapsort's root-to-end swaps reorder equal elements arbitrarily."
            },
            {
              "front": "Quicksort: average vs. worst time, and what determines which you get?",
              "back": "Average $\\Theta(n\\log n)$ (about $1.39\\,n\\log_2 n$ comparisons), worst $\\Theta(n^2)$. It depends on pivot balance: near-median pivots give balanced splits; min/max pivots give a $0:(m\\!-\\!1)$ split. Randomized or median-of-three pivots avoid consistent worst cases."
            },
            {
              "front": "Outline the decision-tree proof of the $\\Omega(n\\log n)$ comparison-sort lower bound.",
              "back": "Model the sort as a binary tree of comparisons; worst-case comparisons = tree height $h$. Need $\\ge n!$ leaves (one per permutation); a binary tree has $\\le 2^h$ leaves. So $2^h \\ge n! \\Rightarrow h \\ge \\log_2(n!) = \\Theta(n\\log n)$."
            },
            {
              "front": "Define in-place and give the space cost of merge sort, quicksort, heapsort.",
              "back": "In-place = $O(1)$ or $O(\\log n)$ auxiliary memory. Merge sort: $O(n)$ (NOT in-place). Quicksort: $O(\\log n)$ recursion stack (in-place). Heapsort: $O(1)$ (in-place)."
            },
            {
              "front": "Why can counting/radix sort beat the $\\Omega(n\\log n)$ bound, and what is the information-theoretic reading of the bound?",
              "back": "The bound applies only to the comparison model (1 bit per comparison). To identify one of $n!$ orderings you must learn $\\log_2(n!)\\approx n\\log_2 n$ bits. Counting/radix sorts read key structure directly (index by value / process digits), extracting more than one bit per operation, so they aren't bound by it."
            }
          ],
          "homework": [
            {
              "prompt": "Trace the full Lomuto partition (last element as pivot) on $A = [4, 1, 8, 2, 6, 3]$ with $lo=0$, $hi=5$. Show the array after each step where a swap occurs, give the returned pivot index $p$, and state the two subarrays quicksort recurses on.",
              "hint": "Pivot is $A[5]=3$. Keep an index $i$ (start $i=-1$) for the boundary of the '$\\le$ pivot' region; for each $j$ from 0 to 4, if $A[j]\\le 3$ increment $i$ and swap $A[i],A[j]$. Finish by swapping $A[i+1]$ with the pivot.",
              "solution": "pivot = 3, i = -1.\\nj=0: A[0]=4 ≤ 3? No. A = [4,1,8,2,6,|3].\\nj=1: A[1]=1 ≤ 3? Yes. i=0; swap A[0],A[1] → [1,4,8,2,6,|3].\\nj=2: A[2]=8 ≤ 3? No.\\nj=3: A[3]=2 ≤ 3? Yes. i=1; swap A[1],A[3] → [1,2,8,4,6,|3].\\nj=4: A[4]=6 ≤ 3? No.\\nEnd: swap A[i+1]=A[2] with A[hi]=A[5] → [1,2,3,4,6,8]. Return p = i+1 = 2.\\nThe pivot 3 is now at index 2 (its final position): left region {1,2} ≤ 3, right region {4,6,8} > 3. Quicksort recurses on A[0..1] = [1,2] and A[3..5] = [4,6,8]."
            },
            {
              "prompt": "You must sort 50 million records by (lastName, then firstName). You have a stable sort and an unstable sort available. (a) Describe how to use a stable sort to achieve the two-key ordering. (b) Explain precisely why doing the passes in the reverse order, or using an unstable sort, breaks it.",
              "hint": "Think about which key you sort by FIRST when chaining stable sorts, and what property of a stable sort the second pass relies on.",
              "solution": "(a) Sort by the SECONDARY key first, then by the PRIMARY key: first stable-sort by firstName, then stable-sort by lastName. After the firstName pass, records are ordered by firstName. The lastName pass groups records by lastName, and because it is stable, within each lastName group it preserves the firstName order established by the first pass. Result: ordered by lastName, ties broken by firstName.\\n(b) If you sort by lastName first then firstName, the second pass reorders everything by firstName globally and obliterates the lastName ordering — you end up sorted by firstName only. If the final pass uses an UNSTABLE sort, it may permute records with equal lastName arbitrarily, destroying the firstName sub-ordering carefully built by the first pass. The whole 'sort by secondary key first' technique depends critically on the second sort being stable. (This is exactly the mechanism behind LSD radix sort, which stably sorts digit-by-digit from least to most significant.)"
            },
            {
              "prompt": "Prove that any comparison-based sorting algorithm requires $\\Omega(n\\log n)$ comparisons in the worst case. Then explain in one or two sentences why counting sort can sort $n$ integers in the range $[0, k]$ in $O(n+k)$ time without contradicting your proof.",
              "hint": "Model the algorithm as a binary decision tree; relate the number of leaves to permutations and the height to the worst-case comparison count. For the last part, ask which assumption of the model counting sort violates.",
              "solution": "Model any comparison sort as a binary decision tree: each internal node is a comparison $a_i \\le a_j$? with two children (yes/no), and each leaf outputs a specific permutation declared sorted. The worst-case number of comparisons equals the tree height $h$ (longest root-to-leaf path).\\nCorrectness requires a distinct leaf for each of the $n!$ input permutations: two permutations need different rearrangements, so they cannot end at the same leaf. Hence (number of leaves) $\\ge n!$. A binary tree of height $h$ has at most $2^h$ leaves. Therefore $2^h \\ge n!$, so $h \\ge \\log_2(n!)$.\\nBound $\\log_2(n!)$: the largest $n/2$ factors of $n!$ are each $\\ge n/2$, so $n! \\ge (n/2)^{n/2}$, giving $\\log_2(n!) \\ge (n/2)\\log_2(n/2) = \\Omega(n\\log n)$. (Stirling gives the tight $\\log_2(n!) = n\\log_2 n - n\\log_2 e + O(\\log n)$.) Thus $h = \\Omega(n\\log n)$. ∎\\nCounting sort does not contradict this because it is NOT a comparison sort: it never compares two elements. It uses each key directly as an array index (counting occurrences of each value in $[0,k]$ and reconstructing the output), extracting far more than one bit of information per operation. The lower bound only constrains algorithms restricted to pairwise comparisons, so key-indexing sorts legitimately escape it."
            }
          ],
          "examples": [
            {
              "title": "Counting comparisons: the decision tree for sorting 3 elements",
              "body": "You must sort three distinct keys $\\langle a_1, a_2, a_3\\rangle$ using only pairwise comparisons. Build the decision tree, find its height (worst-case number of comparisons), and check it against the information-theoretic lower bound $\\lceil \\log_2 3! \\rceil$.",
              "solution": "<strong>Step 1 — How many leaves must the tree have.</strong> A correct comparison sort must distinguish every possible ordering of the input, because each ordering needs a different sequence of swaps to be sorted. With $n=3$ distinct keys there are $3! = 6$ permutations, so the decision tree needs at least $6$ reachable leaves, one per permutation.\n\n<strong>Step 2 — The information-theoretic lower bound.</strong> A binary tree of height $h$ has at most $2^h$ leaves. To hold $6$ leaves we need $2^h \\ge 6$, i.e.\n$$h \\ge \\log_2 6 = \\log_2 3! \\approx 2.585.$$\nSince $h$ is an integer number of comparisons, $h \\ge \\lceil 2.585 \\rceil = 3$. So <em>no</em> comparison sort can guarantee fewer than $3$ comparisons on $3$ elements.\n\n<strong>Step 3 — Build a tree that achieves $h = 3$.</strong> First compare $a_1$ vs $a_2$, then branch:\n\nIf $a_1 \\le a_2$:\n- compare $a_2$ vs $a_3$. If $a_2 \\le a_3$: order is $a_1 \\le a_2 \\le a_3$ — <strong>done in 2 comparisons</strong>.\n- else (so $a_3 < a_2$) compare $a_1$ vs $a_3$. If $a_1 \\le a_3$: order is $a_1 \\le a_3 < a_2$ (3 comparisons). Else: $a_3 < a_1 \\le a_2$ (3 comparisons).\n\nIf $a_2 < a_1$ (symmetric):\n- compare $a_1$ vs $a_3$. If $a_1 \\le a_3$: order is $a_2 < a_1 \\le a_3$ (2 comparisons).\n- else compare $a_2$ vs $a_3$. If $a_2 \\le a_3$: $a_2 \\le a_3 < a_1$ (3 comparisons). Else: $a_3 < a_2 < a_1$ (3 comparisons).\n\n<strong>Step 4 — Verify.</strong> The tree has exactly $6$ leaves (one per permutation), its longest root-to-leaf path uses $3$ comparisons, and two paths finish in only $2$. The worst case is $3$.\n\n<strong>Answer.</strong> The minimum worst-case number of comparisons to sort $3$ elements is $\\boxed{3}$, matching $\\lceil \\log_2 3! \\rceil = 3$. (Note the average is $\\tfrac{1}{6}(2+3+3+2+3+3) = \\tfrac{16}{6} \\approx 2.67$ comparisons.)"
            },
            {
              "title": "Why merge sort hits the bound while insertion sort doesn't (on a concrete array)",
              "body": "Sort $A = [5,\\,2,\\,4,\\,1]$ ($n=4$) by hand with merge sort, counting key comparisons. Then compare your count against the lower bound $\\lceil \\log_2 4! \\rceil$, and against the worst case of insertion sort on the reverse-sorted input $[4,3,2,1]$.",
              "solution": "<strong>Step 1 — The lower bound for $n=4$.</strong> There are $4! = 24$ permutations, so any comparison sort needs height $h \\ge \\lceil \\log_2 24 \\rceil$. Since $2^4 = 16 < 24 \\le 32 = 2^5$, we get $h \\ge 5$. No algorithm can beat $5$ worst-case comparisons here.\n\n<strong>Step 2 — Merge sort on $[5,2,4,1]$ (divide).</strong> Split into $[5,2]$ and $[4,1]$.\n- Sort $[5,2]$: compare $5$ vs $2 \\Rightarrow 2 < 5$, giving $[2,5]$. <em>(1 comparison)</em>\n- Sort $[4,1]$: compare $4$ vs $1 \\Rightarrow 1 < 4$, giving $[1,4]$. <em>(1 comparison)</em>\n\n<strong>Step 3 — Merge $[2,5]$ with $[1,4]$.</strong> Use a two-pointer merge:\n- compare $2$ vs $1 \\Rightarrow$ take $1$. Output $[1]$. <em>(comparison 3)</em>\n- compare $2$ vs $4 \\Rightarrow$ take $2$. Output $[1,2]$. <em>(comparison 4)</em>\n- compare $5$ vs $4 \\Rightarrow$ take $4$. Output $[1,2,4]$. <em>(comparison 5)</em>\n- right list exhausted, append remaining $5$. Output $[1,2,4,5]$.\n\n<strong>Step 4 — Total.</strong> Comparisons $= 1 + 1 + 3 = 5$. This <em>matches</em> the lower bound $5$, so merge sort is optimal up to constants here. In general merge sort uses $\\Theta(n \\log n)$ comparisons, hugging the $\\log_2 n! = \\Theta(n \\log n)$ floor (by Stirling, $\\log_2 n! = n\\log_2 n - n\\log_2 e + \\Theta(\\log n)$).\n\n<strong>Step 5 — Contrast: insertion sort on the worst case $[4,3,2,1]$.</strong> Each new element must be compared against every sorted element to its left:\n- insert $3$ into $[4]$: $3<4$, shift — $1$ comparison $\\to [3,4]$.\n- insert $2$ into $[3,4]$: $2<4$, $2<3$ — $2$ comparisons $\\to [2,3,4]$.\n- insert $1$ into $[2,3,4]$: $1<4$, $1<3$, $1<2$ — $3$ comparisons $\\to [1,2,3,4]$.\nTotal $= 1+2+3 = 6$ comparisons. For general $n$ this is $\\binom{n}{2} = \\Theta(n^2)$ — quadratic, because each comparison removes at most one inversion and a reversed array has $\\binom{n}{2}$ inversions.\n\n<strong>Answer.</strong> Merge sort sorts $[5,2,4,1]$ in $\\boxed{5}$ comparisons, exactly the $\\lceil\\log_2 4!\\rceil = 5$ bound, while insertion sort needs $6$ on the reverse-sorted $[4,3,2,1]$. Both live inside the comparison model, but only $\\Theta(n\\log n)$ algorithms like merge sort approach the $\\Omega(n\\log n)$ floor; the $\\Omega(n\\log n)$ barrier itself is unbreakable by any comparison sort — which is exactly why counting/radix sort must step outside the model to go faster."
            }
          ]
        },
        {
          "id": "a-linear-sorts-selection",
          "title": "Linear-Time Sorts and Selection",
          "minutes": 14,
          "content": "<h3>Why $n \\log n$ is not the end of the story</h3>\n<p>Every comparison-based sort — quicksort, mergesort, heapsort — is shackled by a famous lower bound: <strong>any algorithm that sorts purely by comparing pairs of keys must use $\\Omega(n \\log n)$ comparisons in the worst case.</strong> The argument is a decision-tree counting argument. With $n$ distinct elements there are $n!$ possible orderings, so the algorithm must be able to reach $n!$ distinct leaves. A binary decision tree of height $h$ has at most $2^h$ leaves, so we need $2^h \\ge n!$, giving</p>\n$$h \\ge \\log_2(n!) = \\Theta(n \\log n)$$\n<p>using Stirling's approximation $\\log(n!) = n \\log n - n + O(\\log n)$. This bound is iron-clad <em>if your only tool is comparison</em>. The whole trick of linear-time sorting is to <strong>stop comparing keys and start using them as data</strong> — typically as array indices. When we do that, the decision-tree model no longer applies, and $O(n)$ becomes reachable. The price is always an <strong>assumption about the keys</strong>: their range, their distribution, or their structure.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Comparisons extract only one bit of information at a time (\"is $a < b$?\"). Reading a key as an integer and jumping to slot $A[\\text{key}]$ extracts $\\log_2(\\text{range})$ bits in one $O(1)$ operation. That is the entire source of the speedup — and the reason these sorts need bounded, integer-like keys.</p>\n</div>\n\n<h3>Counting sort</h3>\n<p>Counting sort sorts $n$ integers known to lie in a small range $\\{0, 1, \\dots, k\\}$. Instead of comparing, it <strong>tallies</strong> how many times each value occurs, then uses a prefix-sum of those tallies to place each element directly at its final position.</p>\n\n<h4>The algorithm</h4>\n<pre><code>COUNTING-SORT(A, k):           # A holds integers in [0, k]\n  C = array of zeros, size k+1\n  for x in A:                   # 1. tally counts\n      C[x] += 1\n  for i in 1..k:                # 2. prefix sums:\n      C[i] += C[i-1]            #    C[v] = #elements <= v\n  B = output array, size n\n  for j in n-1 down to 0:       # 3. place from the right\n      x = A[j]\n      C[x] -= 1\n      B[C[x]] = x\n  return B</code></pre>\n\n<p>After step 2, $C[v]$ equals the number of elements $\\le v$, which is exactly the index <em>one past</em> where the last element of value $v$ belongs. Step 3 walks $A$ <strong>from right to left</strong>, decrementing the counter before each placement. Two properties fall out:</p>\n<ul>\n<li><strong>Correctness:</strong> each value $v$ is dropped into the contiguous block of output slots reserved for it.</li>\n<li><strong>Stability:</strong> because we scan from the right and decrement, equal keys retain their original relative order. Stability is not a nicety — it is <em>the</em> property that makes radix sort possible.</li>\n</ul>\n\n<p><strong>Complexity:</strong> $O(n + k)$ time, $O(n + k)$ space. This is linear <em>only when $k = O(n)$</em>. If you try to counting-sort 32-bit integers ($k \\approx 4 \\times 10^9$) you allocate a four-billion-entry array — a disaster. The assumption is loud and explicit: <strong>the key range $k$ must be comparable to $n$.</strong></p>\n\n<h3>Radix sort</h3>\n<p>Radix sort removes counting sort's \"$k$ must be small\" handcuff. It sorts large integers (or fixed-length strings) one <strong>digit</strong> at a time, using a stable sort — almost always counting sort — on each digit. <strong>LSD radix sort</strong> (least-significant-digit first) processes digits from rightmost to leftmost.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>LSD radix sort is correct <em>only because</em> the per-digit sort is stable. After sorting on a more significant digit, ties on that digit must preserve the order established by the less significant digits already processed. Swap in an unstable per-digit sort and radix sort silently breaks.</p>\n</div>\n\n<p>Suppose each key has $d$ digits, each digit drawn from a radix-$b$ alphabet (so each digit is in $\\{0, \\dots, b-1\\}$). Each pass is a counting sort over $n$ items with range $b$, costing $O(n + b)$. With $d$ passes:</p>\n$$T(n) = O\\big(d \\,(n + b)\\big)$$\n<p>To sort $n$ integers in $[0, n^c)$ (a polynomial range), write them in radix $b = n$. Then each number has $d = \\lceil c \\rceil$ digits, a <em>constant</em>, and each pass costs $O(n + n) = O(n)$. Total: $O(cn) = O(n)$. This is the beautiful payoff — <strong>integers up to any fixed polynomial in $n$ sort in genuine linear time.</strong> More generally, $b$-bit keys split into chunks of $r$ bits sort in $O\\!\\big(\\frac{b}{r}(n + 2^r)\\big)$; choosing $r = \\log_2 n$ minimizes this to $O\\!\\big(\\frac{bn}{\\log n}\\big)$.</p>\n\n<h4>Worked digit-by-digit trace</h4>\n<p>Sort <code>[329, 457, 657, 839, 436, 720, 355]</code> by decimal digits (radix $b = 10$, $d = 3$ passes). At each pass the keys are stably ordered on the boxed digit.</p>\n<pre><code>input:   329 457 657 839 436 720 355\npass 1 (ones):   720 355 436 457 657 329 839\npass 2 (tens):   720 329 436 839 355 457 657\npass 3 (hundreds): 329 355 436 457 657 720 839   <- sorted</code></pre>\n<p>Trace the ties to see stability at work. After pass 1, both <code>457</code> and <code>657</code> end in 7 and appear in that relative order. In pass 2 they both have tens-digit 5; stability keeps <code>457</code> before <code>657</code>. In pass 3 they both have hundreds digit... different (4 vs 6), so they separate correctly. The invariant: <em>after pass $i$, the array is correctly sorted on the last $i$ digits.</em></p>\n\n<h3>Bucket sort</h3>\n<p>Bucket sort makes a <strong>distributional</strong> assumption instead of a range assumption. If the $n$ inputs are drawn independently and uniformly from $[0, 1)$, scatter them into $n$ buckets, bucket $i$ catching $[i/n, (i+1)/n)$. Sort each bucket (insertion sort is typical), then concatenate.</p>\n<pre><code>BUCKET-SORT(A):                 # A[i] in [0,1)\n  create n empty lists B[0..n-1]\n  for x in A:\n      B[floor(n*x)].append(x)\n  for i in 0..n-1:\n      insertion-sort(B[i])\n  return concat(B[0], B[1], ..., B[n-1])</code></pre>\n\n<p><strong>Expected time analysis.</strong> Let $n_i$ be the number of items landing in bucket $i$. Insertion sort on a bucket costs $O(n_i^2)$, so the expected total is $E\\big[\\sum_i O(n_i^2)\\big] = \\sum_i O(E[n_i^2])$. Each $n_i$ is $\\text{Binomial}(n, 1/n)$, for which $E[n_i^2] = \\text{Var}(n_i) + (E[n_i])^2 = (1 - \\tfrac1n) + 1 = 2 - \\tfrac1n < 2$. Hence the sum is $O(n)$, and adding the $O(n)$ scatter/concatenate gives <strong>$O(n)$ expected time</strong>. The worst case is still $O(n^2)$ — if every key lands in one bucket — but under the uniformity assumption that is astronomically unlikely.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Connection to ML</div>\n<p>Bucket sort is the algorithmic skeleton of <strong>histogram-based gradient boosting</strong> (LightGBM, XGBoost's <code>hist</code> mode). Instead of evaluating every candidate split threshold by sorting feature values (the slow $O(n \\log n)$ exact method), these systems bucket each feature into a fixed number of bins and search splits over bin boundaries — turning per-node split-finding into a linear histogram scan. Counting/bucketing keys instead of comparing them is precisely why histogram boosting scales to hundreds of millions of rows. The same idea reappears in <strong>locality-sensitive hashing</strong> for approximate nearest neighbors: hash points into buckets so that near points collide, then only compare within a bucket.</p>\n</div>\n\n<h3>Choosing the right linear sort</h3>\n<table>\n<tr><th>Situation</th><th>Use</th><th>Why</th></tr>\n<tr><td>Keys are small integers, $k = O(n)$ (e.g. exam scores 0–100, ages)</td><td>Counting sort</td><td>$O(n+k)$, dead simple, stable</td></tr>\n<tr><td>Keys are large integers / fixed strings, range up to $n^c$</td><td>Radix sort</td><td>$O(dn)$ with $d$ constant; counting sort would need a huge array</td></tr>\n<tr><td>Keys are reals from a known (≈uniform) distribution</td><td>Bucket sort</td><td>$O(n)$ expected under uniformity</td></tr>\n<tr><td>Keys are arbitrary comparables / unknown range</td><td>A comparison sort</td><td>None of the assumptions hold; $\\Omega(n \\log n)$ is unavoidable</td></tr>\n</table>\n\n<h3>Selection: finding the $k$-th smallest without fully sorting</h3>\n<p>Sorting answers \"what is the $k$-th smallest?\" in $O(n \\log n)$, but that is overkill — you computed the entire order to extract one element. <strong>Selection</strong> does it faster. The $k$-th order statistic (with $k=\\lceil n/2\\rceil$ this is the <em>median</em>) can be found in $O(n)$.</p>\n\n<h4>Quickselect</h4>\n<p>Quickselect is quicksort that recurses into <strong>only one side</strong>. Partition around a pivot; the pivot lands at its final sorted position $p$. If $p$ equals the target rank, you are done; otherwise recurse into the side that contains the target.</p>\n<pre><code>QUICKSELECT(A, lo, hi, k):       # find k-th smallest (1-indexed) in A[lo..hi]\n  if lo == hi: return A[lo]\n  p = PARTITION(A, lo, hi)        # pivot now at index p, in final place\n  rank = p - lo + 1              # pivot is the rank-th smallest in A[lo..hi]\n  if k == rank:  return A[p]\n  elif k < rank: return QUICKSELECT(A, lo, p-1, k)\n  else:          return QUICKSELECT(A, p+1, hi, k - rank)</code></pre>\n<p><strong>Average case $O(n)$.</strong> With a random pivot the expected work satisfies $T(n) \\le T(3n/4) + O(n)$ on average (the pivot splits off a constant fraction with good probability), and the geometric series $n + \\tfrac34 n + (\\tfrac34)^2 n + \\dots = 4n$ collapses to $O(n)$. Contrast with quicksort's $O(n \\log n)$: quickselect throws away one side each time, so the linear partition costs form a geometric (not arithmetic) series. <strong>Worst case is $O(n^2)$</strong> — adversarial input that always pivots on the extreme, recursing on $n-1$ elements each time.</p>\n\n<h4>Worked quickselect trace</h4>\n<p>Find the <strong>3rd smallest</strong> ($k=3$) of <code>[7, 2, 9, 4, 1, 8, 5]</code>, using the last element as pivot (Lomuto). The answer should be <code>4</code> (sorted: <code>1 2 4 5 7 8 9</code>).</p>\n<pre><code>A = [7,2,9,4,1,8,5]   lo=0 hi=6  k=3   pivot=5\n  partition around 5 -> [2,4,1, 5, 9,8,7]   pivot index p=3\n  rank = 3-0+1 = 4.   k=3 < 4  ->  recurse left A[0..2]=[2,4,1], k=3\nA = [2,4,1]   lo=0 hi=2  k=3   pivot=1\n  partition around 1 -> [1, 4,2]   pivot index p=0\n  rank = 0-0+1 = 1.   k=3 > 1  ->  recurse right A[1..2]=[4,2], k=3-1=2\nA = [4,2]   lo=1 hi=2  k=2   pivot=2\n  partition around 2 -> [2, 4]   pivot index p=1\n  rank = 1-1+1 = 1.   k=2 > 1  ->  recurse right A[2..2]=[4], k=2-1=1\nA=[4]  lo==hi  -> return 4    CORRECT</code></pre>\n<p>Notice how $k$ is <strong>re-indexed</strong> each time we recurse right: after discarding <code>rank</code> elements on the left (including the pivot), the target's rank within the right subarray drops by <code>rank</code>. Forgetting this re-indexing is the single most common quickselect bug.</p>\n\n<h4>Median of medians: guaranteed $O(n)$</h4>\n<p>Quickselect's $O(n^2)$ worst case comes from bad pivots. The <strong>median-of-medians</strong> algorithm (Blum–Floyd–Pratt–Rivest–Tarjan, 1973) deterministically picks a pivot guaranteed to be \"good enough\":</p>\n<ol>\n<li>Divide the $n$ elements into $\\lceil n/5 \\rceil$ groups of 5.</li>\n<li>Find the median of each group (constant work per group → $O(n)$ total).</li>\n<li>Recursively select the <strong>median of those $n/5$ medians</strong>; use it as the pivot.</li>\n<li>Partition around it and recurse into one side, as in quickselect.</li>\n</ol>\n<p><strong>Why the pivot is good.</strong> The median-of-medians $M$ exceeds at least half of the $n/5$ group medians, and each such median exceeds 2 others in its group of 5. Counting the qualifying group median itself plus those 2 smaller elements gives 3 elements per group. So $M$ is $\\ge$ at least $3 \\cdot \\tfrac12 \\cdot \\tfrac{n}{5} = \\tfrac{3n}{10}$ elements, and symmetrically $\\le$ at least $\\tfrac{3n}{10}$ elements. Therefore each recursive call shrinks to at most $\\tfrac{7n}{10}$ elements. The recurrence is</p>\n$$T(n) \\le \\underbrace{T(n/5)}_{\\text{find pivot}} + \\underbrace{T(7n/10)}_{\\text{recurse}} + \\underbrace{O(n)}_{\\text{partition}}.$$\n<p>Since $\\tfrac15 + \\tfrac{7}{10} = \\tfrac{9}{10} < 1$, the work geometrically decays and $T(n) = O(n)$ in the <strong>worst case</strong>. The magic of \"5\": groups of 3 give $\\tfrac13 + \\tfrac{2}{3} = 1$, which does not sum below 1, so the recurrence fails to be linear; 5 is the smallest odd group size that works cleanly. In practice the constants are large, so randomized quickselect is preferred unless adversarial worst-case guarantees are required.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Linear selection underlies things you use constantly: <strong>medians and percentiles</strong> for robust statistics (the median is the breakdown-point-maximizing location estimator), <strong>top-$k$ selection</strong> in recommendation and retrieval (you want the $k$ nearest neighbors, not a full ranking), and the partition primitive inside <strong>$k$-d tree</strong> construction, where each split picks the median coordinate. Quickselect for top-$k$ logits is also why you can sample from a language model's top tokens without sorting the full 100k-token vocabulary.</p>\n</div>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Comparison lower bound:</strong> $\\Omega(n \\log n)$ — escapable only by not comparing.</li>\n<li><strong>Counting sort:</strong> $O(n+k)$, stable, needs $k = O(n)$.</li>\n<li><strong>Radix sort:</strong> $O(d(n+b))$; linear for polynomial-range integers; relies on a stable per-digit sort.</li>\n<li><strong>Bucket sort:</strong> $O(n)$ expected under uniform inputs, $O(n^2)$ worst case.</li>\n<li><strong>Quickselect:</strong> $O(n)$ average, $O(n^2)$ worst, for the $k$-th order statistic.</li>\n<li><strong>Median of medians:</strong> $O(n)$ worst-case selection via a provably balanced pivot (groups of 5).</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"algo-sorting\"></div>",
          "mcq": [
            {
              "q": "You must sort 10 million 64-bit integers spread arbitrarily across the full 64-bit range. Which approach gives the best asymptotic guarantee without absurd memory use?",
              "choices": [
                "Plain counting sort with $k = 2^{64}$",
                "LSD radix sort with, say, 8-bit digits (8 passes of counting sort)",
                "Bucket sort assuming the values are uniform",
                "A comparison sort, since the range is too large for any linear method"
              ],
              "answer": 1,
              "explain": "Counting sort would need a $2^{64}$-entry array (impossible). Radix sort breaks each key into a constant number of small-range digits, each pass an $O(n + 2^8)$ counting sort, giving $O(n)$ overall with modest memory. Bucket sort needs a uniformity assumption we were not given."
            },
            {
              "q": "Why does LSD radix sort require the per-digit subroutine to be stable?",
              "choices": [
                "Stability makes counting sort faster per pass",
                "Stability lets it handle negative numbers",
                "After sorting on a higher digit, ties on that digit must keep the order from the lower digits already processed",
                "It is not actually required; any sort works per digit"
              ],
              "answer": 2,
              "explain": "The correctness invariant is that after pass $i$ the array is sorted on the last $i$ digits. Preserving that for the next pass requires equal higher-digit keys to retain their already-established lower-digit order, which is exactly stability."
            },
            {
              "q": "In quickselect, after partitioning you find the pivot's rank is 4 but you are searching for $k=7$ within the current subarray. What do you do?",
              "choices": [
                "Recurse on the left part with $k = 7$",
                "Recurse on the right part with $k = 7$",
                "Recurse on the right part with $k = 7 - 4 = 3$",
                "Return the pivot, since $7 > 4$"
              ],
              "answer": 2,
              "explain": "The target is to the right of the pivot, and the 4 left-plus-pivot elements are discarded, so the target's rank within the right subarray is $7 - 4 = 3$. Forgetting to subtract the rank is the classic quickselect bug."
            },
            {
              "q": "Median-of-medians achieves worst-case $O(n)$ selection because its recurrence is $T(n) \\le T(n/5) + T(7n/10) + O(n)$. What property of the constants guarantees linearity?",
              "choices": [
                "$1/5 < 7/10$",
                "$1/5 + 7/10 = 9/10 < 1$, so the subproblem sizes shrink geometrically",
                "Groups of 5 minimize the partition cost",
                "The recursion depth is $O(\\log n)$"
              ],
              "answer": 1,
              "explain": "When the sum of the recursive fractions is strictly below 1, the total work forms a convergent geometric series dominated by the $O(n)$ root term, yielding $T(n) = O(n)$. Group size 5 is what makes that sum (9/10) fall below 1."
            },
            {
              "q": "In counting sort, step 3 places elements by scanning the input array $A$ from right to left and decrementing $C[x]$ before each placement. If you instead scanned $A$ from left to right (still decrementing before placing), what breaks?",
              "choices": [
                "Nothing — the output is identical either way",
                "The sort becomes incorrect: some elements land in the wrong value-block",
                "The output is still correctly sorted but no longer stable (equal keys get reversed)",
                "It now requires $O(n^2)$ time"
              ],
              "answer": 2,
              "explain": "Scanning left to right with a pre-decrement still puts every value into its correct block (the prefix-sum counts still delimit each value's range), but equal keys are placed in reverse of their input order, so the result is sorted yet unstable."
            },
            {
              "q": "Bucket sort achieves $O(n)$ expected time on $n$ values drawn uniformly from $[0,1)$ because the expected cost of insertion-sorting each bucket is bounded. With $n_i \\sim \\text{Binomial}(n, 1/n)$, what makes the analysis work?",
              "choices": [
                "$E[n_i] = 0$, so buckets are almost always empty",
                "$E[n_i^2] = \\text{Var}(n_i) + (E[n_i])^2 = (1-\\tfrac1n) + 1 < 2$, a constant, so $\\sum_i O(E[n_i^2]) = O(n)$",
                "Insertion sort runs in $O(n_i \\log n_i)$, which sums to $O(n)$",
                "Each bucket is guaranteed to hold at most one element"
              ],
              "answer": 1,
              "explain": "Insertion sort costs $O(n_i^2)$ per bucket. Since $E[n_i]=1$ and $\\text{Var}(n_i)=1-\\tfrac1n$, we get $E[n_i^2]=\\text{Var}(n_i)+(E[n_i])^2=(1-\\tfrac1n)+1<2$, a constant, so summing over the $n$ buckets gives $O(n)$ expected total."
            },
            {
              "q": "The comparison-sort lower bound argues that a binary decision tree sorting $n$ distinct elements must have at least $n!$ leaves. Why must there be at least $n!$ leaves, rather than fewer?",
              "choices": [
                "Because each comparison has two outcomes, and there are $n!$ comparisons",
                "Because two different input permutations require different output rearrangements, so they cannot end at the same leaf",
                "Because $2^h = n!$ exactly for the optimal algorithm",
                "Because the tree must be perfectly balanced to be efficient"
              ],
              "answer": 1,
              "explain": "Each of the $n!$ input orderings needs a distinct rearrangement to be sorted, so no two can share a leaf, forcing at least $n!$ leaves and hence height $h \\ge \\log_2(n!) = \\Omega(n\\log n)$."
            },
            {
              "q": "If median-of-medians used groups of 3 instead of 5, the pivot is guaranteed to beat only about $n/3$ elements, so a recursive call can be on up to $2n/3$ elements (plus the $n/3$ pivot-finding call). Why does this fail to give $O(n)$?",
              "choices": [
                "The recurrence $T(n) \\le T(n/3) + T(2n/3) + O(n)$ has fraction sum $1/3 + 2/3 = 1$, so the work does not decay geometrically",
                "Groups of 3 cannot have a well-defined median",
                "Finding the median of 3 elements takes more than constant time",
                "The pivot would always be the global minimum"
              ],
              "answer": 0,
              "explain": "With groups of 3 the recursive fractions sum to exactly $1$ rather than below it, so the work no longer shrinks geometrically and the recurrence solves to $\\omega(n)$ (specifically $\\Theta(n\\log n)$) instead of $O(n)$."
            },
            {
              "q": "You need to sort $n$ integers in the range $\\{0,\\dots,k\\}$ with counting sort. For the algorithm to run in $O(n)$ time, which condition on $k$ is required?",
              "choices": [
                "$k = O(\\log n)$, so the count array fits in a logarithmic number of slots",
                "$k = O(n)$, so the count array and the prefix-sum pass cost $O(n)$",
                "$k = O(n \\log n)$, matching the comparison-sort lower bound",
                "$k = O(1)$, since otherwise the tally step is not constant per element"
              ],
              "answer": 1,
              "explain": "Counting sort costs $O(n + k)$: $O(n)$ to tally and place, plus $O(k)$ to build and scan the count array. This is $O(n)$ exactly when $k = O(n)$. If $k$ is much larger than $n$ (e.g. the full 64-bit range), the $O(k)$ term dominates and memory blows up."
            },
            {
              "q": "A radix sort processes $b$-bit keys by splitting each key into digits of $r$ bits and running a stable counting sort per digit. The total cost is roughly $\\Theta\\!\\left(\\frac{b}{r}(n + 2^r)\\right)$. For fixed $n$ and $b$, why does choosing $r \\approx \\log_2 n$ minimize the running time?",
              "choices": [
                "It makes the number of passes $b/r$ equal to exactly one, eliminating the outer loop",
                "It forces $2^r = n$, so the per-pass count array costs $O(n)$ — matching the $O(n)$ placement cost rather than dwarfing or being dwarfed by it",
                "It guarantees each digit is distinct, which is what stability requires",
                "It reduces the comparison count below the $\\Omega(n\\log n)$ lower bound"
              ],
              "answer": 1,
              "explain": "Making $r \\approx \\log_2 n$ sets $2^r \\approx n$, balancing the two terms in each pass so the count array ($2^r$) and the placement work ($n$) are the same order; pushing $r$ higher makes $2^r$ explode, pushing it lower adds more passes. Radix sort is not comparison-based, so the $\\Omega(n\\log n)$ bound never applied."
            },
            {
              "q": "A classmate claims: \"The $\\Omega(n\\log n)$ comparison lower bound proves no algorithm can sort faster than $n\\log n$, so counting sort's $O(n)$ claim must be wrong.\" What is the precise flaw in this reasoning?",
              "choices": [
                "The lower bound is only $\\Omega(n)$, not $\\Omega(n\\log n)$, so $O(n)$ is consistent with it",
                "Counting sort still performs $\\Omega(n\\log n)$ comparisons internally; its $O(n)$ figure ignores them",
                "The lower bound applies only to algorithms whose sole operation on keys is pairwise comparison; counting sort uses keys as array indices, escaping the decision-tree model",
                "Stirling's approximation overestimates $\\log(n!)$, so the true bound is below linear"
              ],
              "answer": 2,
              "explain": "The decision-tree argument bounds only comparison-based sorts, where each step learns at most one bit by comparing two keys. Counting sort uses key values directly as indices (a non-comparison operation), so the $n!$-leaf decision tree does not model it and the bound does not apply."
            },
            {
              "q": "Bucket sort runs in $O(n)$ expected time when $n$ inputs are drawn i.i.d. uniformly from $[0,1)$ and distributed into $n$ equal-width buckets. You instead receive inputs drawn from a sharply peaked distribution where 90% of values fall in $[0, 0.1)$. With the same uniform bucketing, what is the worst-case asymptotic running time?",
              "choices": [
                "$O(n)$ still, because the total number of elements across all buckets is always $n$",
                "$O(n \\log n)$, because the algorithm silently degrades to a comparison sort",
                "$O(n^2)$, because one bucket can receive $\\Theta(n)$ elements and insertion-sorting it costs $\\Theta(n^2)$",
                "$O(n + k)$, where $k$ is the number of distinct values, by reduction to counting sort"
              ],
              "answer": 2,
              "explain": "Bucket sort's $O(n)$ analysis relies on the uniformity assumption that keeps each bucket's expected size $O(1)$; with a skewed distribution a single bucket can hold $\\Theta(n)$ elements, and insertion-sorting that bucket alone costs $\\Theta(n^2)$. The 'total is still $n$' answer ignores that cost is quadratic within an overloaded bucket, not linear."
            },
            {
              "q": "Counting sort sorts $n$ small-integer keys in $O(n+k)$, beating the $\\Omega(n\\log n)$ comparison bound. How?",
              "choices": [
                "It runs the comparisons in parallel",
                "It uses a faster comparison operation",
                "It never compares two keys — it uses each key directly as an array index",
                "It sorts the array in place"
              ],
              "answer": 2,
              "explain": "The $\\Omega(n\\log n)$ bound applies only to <em>comparison</em> sorts. Counting sort tallies how many times each key value occurs by indexing into a count array — no key-vs-key comparison ever happens — so the bound simply doesn't apply (the catch: it needs keys in a small integer range)."
            },
            {
              "q": "Quickselect finds the $k$-th smallest element of an unsorted array in what <em>expected</em> time?",
              "choices": [
                "$O(n)$ (linear)",
                "$O(n\\log n)$",
                "$O(\\log n)$",
                "$O(n^2)$"
              ],
              "answer": 0,
              "explain": "Quickselect partitions like quicksort but recurses into only the <em>one</em> side containing rank $k$. The expected work is $n + n/2 + n/4 + \\dots = O(n)$. (Its worst case is $O(n^2)$; median-of-medians pivots make it worst-case $O(n)$.)"
            },
            {
              "q": "LSD radix sort processes $n$ integers as $d$ digits, each drawn from a range of size $k$, using a stable counting sort per digit. What is its running time?",
              "choices": [
                "$O(n\\,k)$",
                "$O(n\\log n)$",
                "$O(n^2)$",
                "$O(d\\,(n+k))$"
              ],
              "answer": 3,
              "explain": "Each of the $d$ passes is one counting sort costing $O(n+k)$, so the total is $O(d(n+k))$. When $d$ and $k$ are small constants this is linear in $n$ — the reason radix sort can beat comparison sorts on fixed-width keys."
            },
            {
              "q": "For which situation is counting sort a <em>poor</em> choice?",
              "choices": [
                "When there are many duplicate keys",
                "When the range of key values $k$ is huge relative to $n$ (e.g. $k \\approx n^2$)",
                "When the array is already sorted",
                "When $n$ is large"
              ],
              "answer": 1,
              "explain": "Counting sort uses $O(n+k)$ time and space, where $k$ is the size of the key range. If $k$ dwarfs $n$ (say 64-bit keys), that count array is enormous and the method becomes wasteful — switch to radix sort or a comparison sort. Duplicates and large $n$ are fine; it's <em>linear</em> in $n$."
            }
          ],
          "flashcards": [
            {
              "front": "Why can linear-time sorts beat the $\\Omega(n \\log n)$ comparison lower bound?",
              "back": "They do not compare keys; they use keys directly as array indices (counting/radix) or distribute by value (bucket). The decision-tree bound only applies to comparison-based algorithms. The cost is an assumption on the keys (bounded range or known distribution)."
            },
            {
              "front": "Counting sort: time, space, and required assumption?",
              "back": "$O(n+k)$ time and space, stable, where keys are integers in $[0,k]$. Linear only when $k = O(n)$; otherwise the count array is too large."
            },
            {
              "front": "Radix sort running time and the one property it depends on?",
              "back": "$O(d(n+b))$ for $d$ digits in radix $b$; linear for integers in a polynomial range $n^c$ (constant $d$). It requires a STABLE per-digit sort (typically counting sort)."
            },
            {
              "front": "Bucket sort: assumption and complexity (best vs worst)?",
              "back": "Assumes inputs are ~uniform over a known interval. $O(n)$ expected time (since $E[n_i^2] = 2 - 1/n < 2$ per bucket); $O(n^2)$ worst case if all keys collide in one bucket."
            },
            {
              "front": "Quickselect complexity (average and worst) and what it does differently from quicksort.",
              "back": "$O(n)$ average, $O(n^2)$ worst. It recurses into only ONE side after partitioning, so linear partition costs form a geometric series ($n + \\frac34 n + \\dots = 4n = O(n)$) instead of quicksort's $\\Theta(n \\log n)$."
            },
            {
              "front": "Median-of-medians: how it picks the pivot and the resulting guarantee.",
              "back": "Split into groups of 5, take each group's median, recursively select the median of those medians as pivot. This guarantees the pivot beats/loses to at least $3n/10$ elements, giving $T(n) \\le T(n/5) + T(7n/10) + O(n) = O(n)$ worst case."
            }
          ],
          "homework": [
            {
              "prompt": "You are given an array of $n$ employee records, each with an integer age in $[18, 65]$, and you must sort them by age while preserving the original order of employees with equal age (e.g. for a stable downstream join). Name the best algorithm, justify it, and give the exact time and space complexity in terms of $n$.",
              "hint": "How large is the key range here, and which linear sort is both stable and ideal for a tiny fixed integer range?",
              "solution": "Use counting sort. The key range is $k = 65 - 18 + 1 = 48$, a small constant, so counting sort runs in $O(n + k) = O(n + 48) = O(n)$ time and $O(n + 48) = O(n)$ space. Counting sort is stable when implemented with prefix sums and a right-to-left placement pass, so equal-age employees keep their original relative order, satisfying the stability requirement. (Radix sort would also work but is overkill for such a tiny range; a comparison sort would be slower at $O(n \\log n)$ and only stable if specifically chosen, e.g. mergesort.)"
            },
            {
              "prompt": "Trace quickselect to find the 2nd smallest element ($k=2$) of $[6, 3, 8, 1, 9, 2]$ using the LAST element as the Lomuto pivot at each step. Show the pivot, the partitioned array, the pivot's rank, and the recursion decision at every level.",
              "hint": "After each partition compute rank = (pivot index) - lo + 1. If $k <$ rank go left with the same $k$; if $k >$ rank go right with $k -$ rank.",
              "solution": "Sorted order is $1,2,3,6,8,9$ so the 2nd smallest is $2$.\\n\\nLevel 1: A=[6,3,8,1,9,2], lo=0 hi=5, k=2, pivot=2. Partition around 2 -> [1, 2, 8,6,9,3]; pivot index p=1. rank = 1-0+1 = 2. k==rank, so RETURN A[1] = 2.\\n\\nQuickselect terminates immediately at level 1 because the pivot happened to land at exactly rank 2. The answer is 2, which matches the sorted order. (If the first pivot had not matched, e.g. rank 4 > k=2, we would have recursed left into A[0..2] with k still 2.)"
            },
            {
              "prompt": "Suppose you change median-of-medians to use groups of 3 instead of 5. Show why the recurrence no longer proves $O(n)$, and explain qualitatively what goes wrong.",
              "hint": "Redo the 'pivot beats at least X elements' count with groups of 3, deduce the size of the larger recursive subproblem, then add the two recursive fractions and compare to 1.",
              "solution": "With groups of 3, the median-of-medians $M$ exceeds at least half of the $n/3$ group medians, and each such median exceeds 1 other element in its group of 3. Counting the qualifying median plus the 1 element below it gives 2 elements per group, so $M$ beats at least $2 \\cdot \\frac12 \\cdot \\frac{n}{3} = \\frac{n}{3}$ elements (and symmetrically loses to at least $n/3$). Thus the recursive call can be on as many as $n - n/3 = 2n/3$ elements. Finding the pivot now costs $T(n/3)$. The recurrence becomes $T(n) \\le T(n/3) + T(2n/3) + O(n)$. The recursive fractions sum to $\\frac13 + \\frac23 = 1$, NOT strictly less than 1. When the fractions sum to exactly 1, the $O(n)$ work is repeated at every level and the depth is $\\Theta(\\log n)$, giving $T(n) = \\Theta(n \\log n)$ rather than $O(n)$. Groups of 5 give $\\frac15 + \\frac{7}{10} = \\frac{9}{10} < 1$, which is what makes the series converge to linear; 5 is the smallest odd group size for which this holds (groups of 7, 9, ... also work but waste effort)."
            }
          ],
          "examples": [
            {
              "title": "Tracing counting sort on a small array",
              "body": "Run COUNTING-SORT on the array $A = [2, 5, 3, 0, 2, 3, 0, 3]$, where every key lies in the range $\\{0, 1, \\dots, 5\\}$ (so $k = 5$). Show the count array, the prefix-sum array, and the placement of each element into the output, ending with the sorted result.",
              "solution": "<strong>Step 1 — Tally occurrences.</strong> Build a count array $C[0\\dots5]$ where $C[v]$ is the number of times value $v$ appears in $A$. Scanning $A = [2,5,3,0,2,3,0,3]$:\n\n- $0$ appears twice, $2$ appears twice, $3$ appears three times, $5$ appears once, and $1,4$ never appear.\n\nSo $$C = [\\,2,\\ 0,\\ 2,\\ 3,\\ 0,\\ 1\\,]$$ (indices $0$ through $5$). As a sanity check the entries sum to $2+0+2+3+0+1 = 8 = n$. Good.\n\n<strong>Step 2 — Prefix-sum the counts.</strong> Convert $C$ into running totals so that $C[v]$ becomes the number of elements that are $\\le v$. Replacing each entry by the sum of itself and everything before it:\n\n- $C[0]=2$\n- $C[1]=2+0=2$\n- $C[2]=2+2=4$\n- $C[3]=4+3=7$\n- $C[4]=7+0=7$\n- $C[5]=7+1=8$\n\n$$C = [\\,2,\\ 2,\\ 4,\\ 7,\\ 7,\\ 8\\,]$$ Now $C[v]$ tells us: the last element with value $v$ belongs at output index $C[v]-1$ (using $0$-based output positions).\n\n<strong>Step 3 — Place elements right-to-left.</strong> To keep the sort <em>stable</em> we scan $A$ from the last element to the first, and after placing a value $v$ we decrement $C[v]$. Output array $B$ has $8$ slots, indices $0\\dots7$.\n\n- $A[7]=3$: place at $C[3]-1=6$, then $C[3]\\to6$. $B = [\\_,\\_,\\_,\\_,\\_,\\_,3,\\_]$\n- $A[6]=0$: place at $C[0]-1=1$, then $C[0]\\to1$. $B = [\\_,0,\\_,\\_,\\_,\\_,3,\\_]$\n- $A[5]=3$: place at $C[3]-1=5$, then $C[3]\\to5$. $B = [\\_,0,\\_,\\_,\\_,3,3,\\_]$\n- $A[4]=2$: place at $C[2]-1=3$, then $C[2]\\to3$. $B = [\\_,0,\\_,2,\\_,3,3,\\_]$\n- $A[3]=0$: place at $C[0]-1=0$, then $C[0]\\to0$. $B = [0,0,\\_,2,\\_,3,3,\\_]$\n- $A[2]=3$: place at $C[3]-1=4$, then $C[3]\\to4$. $B = [0,0,\\_,2,3,3,3,\\_]$\n- $A[1]=5$: place at $C[5]-1=7$, then $C[5]\\to7$. $B = [0,0,\\_,2,3,3,3,5]$\n- $A[0]=2$: place at $C[2]-1=2$, then $C[2]\\to2$. $B = [0,0,2,2,3,3,3,5]$\n\n<strong>Answer.</strong> $$B = [\\,0,\\ 0,\\ 2,\\ 2,\\ 3,\\ 3,\\ 3,\\ 5\\,]$$ Every key was placed by direct array indexing, never by a comparison. The total work is $\\Theta(n + k) = \\Theta(8 + 6)$, i.e. linear in the input size plus the value range."
            },
            {
              "title": "Two passes of LSD radix sort on 2-digit numbers",
              "body": "Counting sort is only cheap when the range $k$ is small. The numbers $A = [29, 13, 31, 24, 41, 12]$ lie in $\\{0,\\dots,99\\}$ — too wide to count comfortably. Sort them with <strong>LSD radix sort</strong>: a stable counting sort on the ones digit, then on the tens digit. Show the array after each pass and explain why the order survives.",
              "solution": "<strong>Why this works.</strong> Each number has $d=2$ decimal digits, so each digit lies in the tiny range $\\{0,\\dots,9\\}$. Radix sort runs a <em>stable</em> counting sort once per digit, from least-significant (ones) to most-significant (tens). Stability is the whole trick: when the more-significant pass groups numbers by tens digit, ties keep the order established by the earlier ones-digit pass, so the final result is fully sorted.\n\n<strong>Pass 1 — sort by the ones digit.</strong> Read off the ones digit of each element of $A = [29, 13, 31, 24, 41, 12]$:\n\n- $29\\to9,\\quad 13\\to3,\\quad 31\\to1,\\quad 24\\to4,\\quad 41\\to1,\\quad 12\\to2$\n\nStably distribute into buckets $0\\dots9$ by ones digit (within a bucket, keep input order):\n\n- bucket $1$: $31, 41$\n- bucket $2$: $12$\n- bucket $3$: $13$\n- bucket $4$: $24$\n- bucket $9$: $29$\n\nConcatenating buckets in order $0,1,2,\\dots,9$: $$A_1 = [\\,31,\\ 41,\\ 12,\\ 13,\\ 24,\\ 29\\,]$$ Note $31$ stays before $41$ because both had ones digit $1$ and $31$ came first in the input — that is stability at work.\n\n<strong>Pass 2 — sort by the tens digit.</strong> Now take $A_1 = [31, 41, 12, 13, 24, 29]$ and read off the tens digit of each:\n\n- $31\\to3,\\quad 41\\to4,\\quad 12\\to1,\\quad 13\\to1,\\quad 24\\to2,\\quad 29\\to2$\n\nStably distribute by tens digit, preserving the current left-to-right order within each bucket:\n\n- bucket $1$: $12, 13$ (in this order, since $12$ precedes $13$ in $A_1$)\n- bucket $2$: $24, 29$\n- bucket $3$: $31$\n- bucket $4$: $41$\n\nConcatenating buckets $0,1,2,\\dots,9$: $$A_2 = [\\,12,\\ 13,\\ 24,\\ 29,\\ 31,\\ 41\\,]$$\n\n<strong>Answer.</strong> $$A_2 = [\\,12,\\ 13,\\ 24,\\ 29,\\ 31,\\ 41\\,]$$ which is fully sorted. The second pass correctly ordered the tens digits, and where tens digits tied (the pairs $12,13$ and $24,29$) the stable carry-over from pass 1 had already ordered them by ones digit. With $d=2$ digits each handled in $\\Theta(n+10)$ work, the total cost is $\\Theta\\!\\big(d\\,(n+b)\\big)$ with base $b=10$ — linear in $n$ for a fixed number of digits, and no key comparison is ever performed."
            }
          ]
        },
        {
          "id": "a-binary-search",
          "title": "Binary Search and Its Variants",
          "minutes": 12,
          "content": "<h3>Why binary search is the prototype of a beautiful algorithm</h3>\n<p>Binary search looks trivial — \"guess the middle, halve the range\" — and yet a famous study found that the majority of professional programmers cannot write a bug-free version on the first try. The reason is instructive: the algorithm is short, but its <em>correctness</em> depends on an invariant that you must hold in your head at every line. Once you internalize that invariant, an entire family of problems — lower/upper bound, first/last occurrence, and the powerful \"binary search on the answer\" — collapse into one idea.</p>\n\n<p>The deep idea is this: binary search is not really about <em>arrays</em>. It is about <strong>finding the boundary of a monotone predicate</strong>. Everything else is a special case.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Imagine a long row of light switches, all the early ones OFF and all the later ones ON, with a single flip point somewhere. You want to find where OFF becomes ON without checking every switch. Each probe tells you which side of the flip point you are on, so you can throw away half the remaining switches every time. That flip point is the only thing binary search ever computes.</p></div>\n\n<h3>The classic problem and the overflow trap</h3>\n<p>Given a sorted array $a[0..n-1]$ and a target $x$, decide whether $x$ is present (and where). Maintain a half-open search interval $[\\text{lo}, \\text{hi})$ that is guaranteed to contain the answer if it exists.</p>\n\n<pre><code>// returns an index i with a[i] == x, or -1 if absent\nint binary_search(const vector&lt;int&gt;&amp; a, int x) {\n    int lo = 0, hi = (int)a.size();      // half-open [lo, hi)\n    while (lo &lt; hi) {\n        int mid = lo + (hi - lo) / 2;    // overflow-safe midpoint\n        if (a[mid] == x) return mid;\n        else if (a[mid] &lt; x) lo = mid + 1;\n        else hi = mid;\n    }\n    return -1;\n}</code></pre>\n\n<h4>The midpoint computation</h4>\n<p>The \"obvious\" line <code>mid = (lo + hi) / 2</code> is a real bug, not pedantry. If <code>lo</code> and <code>hi</code> are large 32-bit integers, <code>lo + hi</code> can exceed <code>INT_MAX</code> and overflow to a negative number, producing an out-of-bounds index. This exact bug lived undetected in the JDK's <code>Arrays.binarySearch</code> for nine years. The fix is algebraically identical but safe:</p>\n$$\\text{mid} = \\text{lo} + \\left\\lfloor \\frac{\\text{hi} - \\text{lo}}{2} \\right\\rfloor$$\n<p>Because $\\text{hi} - \\text{lo} \\ge 0$ is the (small) width of the live interval, the sum never overflows. Get into the habit of writing it this way always.</p>\n\n<h4>Correctness via the loop invariant</h4>\n<p>The whole proof hangs on one sentence. <strong>Invariant:</strong> if $x$ is in the array, its index lies in $[\\text{lo}, \\text{hi})$. This holds at entry (the interval is the whole array). Each branch preserves it: since the array is sorted, $a[\\text{mid}] &lt; x$ means every index $\\le \\text{mid}$ is too small, so the answer (if any) is in $[\\text{mid}+1, \\text{hi})$ — hence <code>lo = mid + 1</code>. Symmetrically $a[\\text{mid}] &gt; x$ gives <code>hi = mid</code>. The loop ends when $\\text{lo} = \\text{hi}$, an empty interval, which by the invariant means $x$ is absent.</p>\n\n<p><strong>Termination:</strong> with $\\text{mid} = \\lfloor (\\text{lo}+\\text{hi})/2 \\rfloor$ and $\\text{lo} &lt; \\text{hi}$ we have $\\text{lo} \\le \\text{mid} &lt; \\text{hi}$, so <code>lo = mid + 1</code> strictly raises <code>lo</code> and <code>hi = mid</code> strictly lowers <code>hi</code>. The width $\\text{hi} - \\text{lo}$ strictly decreases and is bounded below, so the loop terminates. It does so in $O(\\log n)$ iterations because the width roughly halves each step, giving the cost recurrence $T(n) = T(n/2) + O(1) = O(\\log n)$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why this matters</div><p>The single most common cause of off-by-one bugs in binary search is mixing conventions: half-open vs. closed intervals, and <code>hi = mid</code> vs. <code>hi = mid - 1</code>. Pick the half-open $[\\text{lo}, \\text{hi})$ convention and never deviate. Notice the asymmetry that makes it work: <code>lo = mid + 1</code> (we have ruled <code>mid</code> out on the low side) but <code>hi = mid</code> (in half-open form, <code>hi</code> is already exclusive). That asymmetry is the signature of a correct half-open search.</p></div>\n\n<h3>The real building block: lower_bound</h3>\n<p>Searching for equality is actually the <em>least</em> useful version. The workhorse is <code>lower_bound</code>: the index of the <strong>first</strong> element that is $\\ge x$ — equivalently, the number of elements strictly less than $x$, equivalently the insertion point that keeps the array sorted. This is exactly the \"flip point\" of the switch analogy with predicate $P(i) \\equiv (a[i] \\ge x)$, which is false then true.</p>\n\n<pre><code>// first index i in [0, n] with a[i] &gt;= x  (returns n if none)\nint lower_bound(const vector&lt;int&gt;&amp; a, int x) {\n    int lo = 0, hi = (int)a.size();       // answer lives in [lo, hi]\n    while (lo &lt; hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (a[mid] &lt; x) lo = mid + 1;     // mid too small -&gt; answer is after mid\n        else hi = mid;                    // a[mid] &gt;= x -&gt; mid is a candidate, keep it\n    }\n    return lo;                            // lo == hi == the boundary\n}</code></pre>\n\n<p>The invariant here is sharper: <strong>everything in $[0, \\text{lo})$ satisfies $a[\\cdot] &lt; x$, and everything in $[\\text{hi}, n)$ satisfies $a[\\cdot] \\ge x$.</strong> When the loop exits, $\\text{lo} = \\text{hi}$ is precisely the boundary between the two regions. The return value can legitimately be <code>n</code> (every element is smaller — the insertion point is at the end), which is why <code>hi</code> starts at <code>n</code>, not <code>n-1</code>.</p>\n\n<h4>upper_bound, first and last occurrence</h4>\n<p><code>upper_bound(x)</code> = first index with $a[i] &gt; x$. It is identical to <code>lower_bound</code> with the comparison <code>a[mid] &lt;= x</code> in place of <code>a[mid] &lt; x</code>. From these two, all occurrence queries follow with no extra code:</p>\n<ul>\n<li><strong>First occurrence of $x$:</strong> <code>i = lower_bound(x)</code>; it equals $x$ iff $i &lt; n$ and $a[i] = x$.</li>\n<li><strong>Last occurrence of $x$:</strong> <code>upper_bound(x) - 1</code> (valid only when $x$ is present).</li>\n<li><strong>Count of $x$:</strong> <code>upper_bound(x) - lower_bound(x)</code>.</li>\n<li><strong>Number of elements in $[L, R]$:</strong> <code>upper_bound(R) - lower_bound(L)</code>.</li>\n</ul>\n\n<div class=\"callout\"><div class=\"c-tag\">Mental model</div><p>Stop thinking \"find the value.\" Think \"find the boundary where my yes/no predicate flips.\" <code>lower_bound</code> finds the first index where $a[i] \\ge x$ becomes true. Once your predicate is monotone (all false, then all true), the very same six lines work. The hard part of any binary-search problem is never the loop — it is defining the right monotone predicate.</p></div>\n\n<h3>Binary search on the answer</h3>\n<p>Here is where binary search stops being an array technique and becomes a problem-solving strategy. Many optimization problems have the shape: <em>\"find the smallest (or largest) value $t$ such that something is achievable.\"</em> If \"achievable at budget $t$\" is <strong>monotone</strong> — once it's achievable at $t$, it stays achievable for all larger $t$ — then you never need to enumerate candidates. You binary-search over the answer space using a feasibility check $P(t)$ as your comparator.</p>\n\n<p>The recipe, which is worth memorizing:</p>\n<ol>\n<li>Identify the quantity you are optimizing; call its value $t$.</li>\n<li>Write a <strong>predicate</strong> $P(t)$ = \"is the goal feasible if we allow $t$?\" — return just yes/no.</li>\n<li><strong>Prove monotonicity:</strong> $P(t) \\Rightarrow P(t')$ for all $t' \\ge t$ (or $\\le t$ for a max problem). This is the step people skip and then wonder why their answer is wrong.</li>\n<li>Binary-search the smallest feasible $t$ over the value range $[\\text{lo}, \\text{hi}]$, calling $P$ as the test. Each call to $P$ should be cheap, typically a single $O(n)$ greedy or simulation pass.</li>\n</ol>\n<p>Total cost is $O(C \\cdot \\log R)$ where $C$ is the cost of one feasibility check and $R$ is the width of the answer range — exponentially better than scanning all $R$ candidates.</p>\n\n<h4>Fully worked example: minimize the maximum load</h4>\n<p><strong>Problem.</strong> You must ship $n$ packages on a conveyor, in order, with weights $w_0, \\dots, w_{n-1}$. You have $D$ days. Each day you load consecutive packages onto a ship of capacity $c$ (their total weight cannot exceed $c$). Find the <em>minimum</em> capacity $c$ that lets you ship everything within $D$ days.</p>\n\n<p>A naive search over every capacity is hopeless. But notice the predicate.</p>\n<p><strong>Predicate.</strong> $P(c)$ = \"can we finish in $\\le D$ days with capacity $c$?\" Check it greedily in $O(n)$: sweep the packages, keep a running day-load; whenever adding the next package would exceed $c$, start a new day. Count the days used and compare to $D$.</p>\n\n<pre><code>bool feasible(const vector&lt;int&gt;&amp; w, int D, long long c) {\n    long long load = 0; int days = 1;\n    for (int wi : w) {\n        if (wi &gt; c) return false;        // a single package can never fit\n        if (load + wi &gt; c) { days++; load = 0; }\n        load += wi;\n    }\n    return days &lt;= D;\n}\n\nlong long min_capacity(const vector&lt;int&gt;&amp; w, int D) {\n    long long lo = *max_element(w.begin(), w.end());  // must hold the heaviest\n    long long hi = accumulate(w.begin(), w.end(), 0LL); // one day = sum of all\n    while (lo &lt; hi) {\n        long long mid = lo + (hi - lo) / 2;\n        if (feasible(w, D, mid)) hi = mid;   // mid works -&gt; maybe smaller works too\n        else lo = mid + 1;                   // mid too small -&gt; need more capacity\n    }\n    return lo;\n}</code></pre>\n\n<p><strong>Monotonicity (the crux).</strong> If capacity $c$ suffices, then any $c' &gt; c$ also suffices: a larger ship can carry every grouping the smaller one could, so the greedy day count can only go down. Thus $P$ is false for small $c$ and true for large $c$ — a clean flip point — and binary search is valid.</p>\n\n<p><strong>Bounds.</strong> The smallest sensible capacity is $\\max_i w_i$ (you must at least carry the heaviest single package); the largest you would ever need is $\\sum_i w_i$ (ship everything in one day). The answer lives in $[\\max_i w_i, \\sum_i w_i]$, and binary search finds it in $O(n \\log \\sum_i w_i)$. Note the structure is <em>exactly</em> <code>lower_bound</code>: we are finding the first $c$ for which <code>feasible</code> turns true.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Connection to ML / AI</div><p>\"Binary search on a monotone predicate\" is everywhere in machine learning, usually in disguise.</p>\n<ul>\n<li><strong>Threshold tuning:</strong> picking a classifier's decision threshold to hit a target precision or recall is a binary search over a monotone metric of the threshold.</li>\n<li><strong>Calibration &amp; quantiles:</strong> finding the temperature in temperature scaling, or a quantile of a distribution from its CDF, is binary search on a monotone function.</li>\n<li><strong>Hyperparameter feasibility:</strong> finding the largest learning rate that keeps training stable, or the smallest model size meeting an accuracy bar, is feasibility binary search — when the property is monotone.</li>\n<li><strong>Bisection in optimization:</strong> root-finding by bisection is binary search on the sign of a continuous function; it's the discrete cousin of gradient methods. And the $O(\\log n)$ \"halve the uncertainty\" idea is the same one that makes balanced trees, and the depth of a decision tree, logarithmic.</li>\n</ul>\n<p>The transferable skill is step 3: spotting (and proving) monotonicity. If your metric isn't monotone in the parameter, binary search silently returns garbage — so always verify the flip-point structure first.</p></div>\n\n<h3>A checklist for writing it bug-free</h3>\n<ul>\n<li><strong>Fix one convention:</strong> half-open $[\\text{lo}, \\text{hi})$, <code>hi = mid</code>, <code>lo = mid + 1</code>.</li>\n<li><strong>Midpoint:</strong> always <code>lo + (hi - lo) / 2</code>, never <code>(lo + hi) / 2</code>.</li>\n<li><strong>State the invariant</strong> before coding: what is true of $[0,\\text{lo})$ and $[\\text{hi},n)$? The return value falls out of it.</li>\n<li><strong>Loop condition</strong> <code>lo &lt; hi</code>: the interval shrinks every iteration, so it cannot loop forever (a frequent infinite-loop bug is <code>hi = mid</code> with condition <code>lo &lt;= hi</code>).</li>\n<li><strong>Answer-search:</strong> set bounds to a provably-feasible high and provably-infeasible low (or vice versa), and prove the predicate is monotone before trusting the result.</li>\n</ul>\n<h4>Try it yourself</h4>\n<p>Run it, then tinker — change the inputs and re-run. The badge confirms when your output matches.</p>\n<div data-code=\"python\" data-expected=\"3\">def binary_search(a, target):\n    lo, hi = 0, len(a) - 1\n    while lo &lt;= hi:\n        mid = (lo + hi) // 2\n        if a[mid] == target:\n            return mid\n        elif a[mid] &lt; target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\n# index of 7 in this sorted list:\nprint(binary_search([1, 3, 5, 7, 9, 11], 7))</div>",
          "mcq": [
            {
              "q": "Why is $\\text{mid} = \\text{lo} + (\\text{hi} - \\text{lo}) / 2$ preferred over $\\text{mid} = (\\text{lo} + \\text{hi}) / 2$?",
              "choices": [
                "It rounds toward hi instead of lo, fixing off-by-one errors",
                "It is faster because subtraction is cheaper than addition",
                "It avoids integer overflow when lo and hi are both large, since hi - lo stays small",
                "It guarantees mid is strictly between lo and hi"
              ],
              "answer": 2,
              "explain": "lo + hi can exceed INT_MAX and overflow to a negative index; hi - lo is the small interval width, so the safe form never overflows. The two formulas are algebraically equal otherwise."
            },
            {
              "q": "In the half-open lower_bound loop, why does the false branch use $\\text{lo} = \\text{mid} + 1$ while the true branch uses $\\text{hi} = \\text{mid}$ (not $\\text{mid} - 1$)?",
              "choices": [
                "When a[mid] < x, mid is ruled out so we move past it; when a[mid] >= x, mid is still a valid candidate that hi (exclusive) must not discard",
                "It is an arbitrary choice; mid - 1 would also work",
                "Because the array is 0-indexed rather than 1-indexed",
                "To make the loop run in exactly log2(n) iterations"
              ],
              "answer": 0,
              "explain": "a[mid] < x eliminates mid, so lo jumps past it; a[mid] >= x makes mid a candidate for the answer, and since hi is exclusive, hi = mid keeps mid in the live range. Using mid - 1 there would skip the answer."
            },
            {
              "q": "You binary-search the smallest capacity c such that feasible(c) is true. What property of feasible must hold for this to be correct?",
              "choices": [
                "feasible must be computable in O(1) time",
                "feasible must be monotone: once true at some c, it stays true for all larger c",
                "feasible must be true at exactly one value of c",
                "feasible must be symmetric around the midpoint of the range"
              ],
              "answer": 1,
              "explain": "Binary search on the answer requires the predicate to flip from false to true exactly once (monotonicity). Without that, the algorithm can land in a false region above a true one and return a wrong value."
            },
            {
              "q": "Given a sorted array, how do you count the occurrences of a value $x$ using only lower_bound and upper_bound?",
              "choices": [
                "upper_bound(x) - lower_bound(x)",
                "lower_bound(x) - upper_bound(x)",
                "upper_bound(x) - lower_bound(x) + 1",
                "lower_bound(x) + upper_bound(x)"
              ],
              "answer": 0,
              "explain": "lower_bound(x) is the first index >= x and upper_bound(x) is the first index > x; their difference is exactly the number of elements equal to x (which can be 0)."
            },
            {
              "q": "The lesson claims binary search is \"not really about arrays.\" What is the single thing binary search actually computes?",
              "choices": [
                "The exact value stored at the middle index",
                "The boundary (flip point) of a monotone predicate",
                "The number of elements smaller than the target",
                "The sorted order of the input"
              ],
              "answer": 1,
              "explain": "The deep idea is that binary search finds the boundary where a monotone predicate flips from false to true; a sorted array is just one special case where the predicate is \"a[i] >= x.\""
            },
            {
              "q": "In the classic loop using a half-open interval $[\\text{lo}, \\text{hi})$, what does the loop invariant guarantee about the answer throughout execution?",
              "choices": [
                "The answer, if it exists, always lies within $[\\text{lo}, \\text{hi})$",
                "$a[\\text{mid}]$ always equals the target",
                "The interval width is always a power of two",
                "$\\text{lo}$ always points at the target"
              ],
              "answer": 0,
              "explain": "Correctness hinges on the invariant that the live interval $[\\text{lo}, \\text{hi})$ always contains the answer if it exists, so each step discards only positions proven not to be the answer, never a valid one."
            },
            {
              "q": "Why does the overflow bug in $\\text{mid} = (\\text{lo} + \\text{hi}) / 2$ disappear when written as $\\text{mid} = \\text{lo} + (\\text{hi} - \\text{lo}) / 2$, even though the two are algebraically identical for real numbers?",
              "choices": [
                "Division by two is performed before any addition, halving the operands",
                "$\\text{hi} - \\text{lo} \\ge 0$ is the small interval width, so adding half of it to $\\text{lo}$ never exceeds INT_MAX",
                "Subtraction is computed using 64-bit arithmetic automatically",
                "The compiler rounds the result down, avoiding the overflow"
              ],
              "answer": 1,
              "explain": "The intermediate term $\\text{hi} - \\text{lo} \\ge 0$ is the small live-interval width, so $\\text{lo} + (\\text{hi} - \\text{lo})/2$ stays between $\\text{lo}$ and $\\text{hi}$ and never overflows, unlike $\\text{lo} + \\text{hi}$ which can exceed INT_MAX."
            },
            {
              "q": "When the loop condition is written as while (lo < hi) over a half-open interval, what is true about the interval exactly when the loop terminates?",
              "choices": [
                "The interval still contains at least two candidates",
                "$\\text{lo} = \\text{hi}$, so the interval is empty and every candidate has been resolved",
                "$\\text{mid}$ equals the target index",
                "$\\text{hi}$ has wrapped around past $\\text{lo}$"
              ],
              "answer": 1,
              "explain": "Each iteration strictly shrinks the half-open interval, and the loop exits precisely when $\\text{lo} = \\text{hi}$, meaning the interval is empty and the boundary has been pinned down."
            },
            {
              "q": "A student copies the half-open <code>lower_bound</code> body but writes the loop as <code>while (lo <= hi)</code> instead of <code>while (lo < hi)</code>, keeping <code>hi = mid</code> on the true branch. What is the consequence when the search reaches a single-element interval where <code>a[mid] >= x</code>?",
              "choices": [
                "The loop infinite-loops, because <code>hi = mid</code> never shrinks the interval once $\\text{lo} = \\text{hi} = \\text{mid}$ but the condition $\\text{lo} \\le \\text{hi}$ stays true.",
                "It still terminates correctly but returns an index one too large.",
                "It terminates one iteration early, missing the boundary element.",
                "It throws an out-of-bounds error because <code>mid</code> exceeds $n$."
              ],
              "answer": 0,
              "explain": "With $\\text{lo} = \\text{hi}$ the condition $\\text{lo} \\le \\text{hi}$ still holds, $\\text{mid} = \\text{lo}$, the true branch sets $\\text{hi} = \\text{mid} = \\text{lo}$, and nothing changes — an infinite loop. The half-open convention requires <code>lo < hi</code> precisely so the empty interval ends the loop; pairing <code>hi = mid</code> with <code>lo <= hi</code> is the classic infinite-loop bug the checklist warns about."
            },
            {
              "q": "For a sorted array, <code>upper_bound(x)</code> is described as \"identical to <code>lower_bound</code> but with <code>a[mid] <= x</code> in place of <code>a[mid] < x</code>.\" What monotone predicate $P(i)$ is <code>upper_bound</code> actually finding the flip point of?",
              "choices": [
                "$P(i) \\equiv (a[i] = x)$, the first index equal to $x$.",
                "$P(i) \\equiv (a[i] > x)$, the first index strictly greater than $x$.",
                "$P(i) \\equiv (a[i] \\ge x)$, the first index at least $x$.",
                "$P(i) \\equiv (a[i] < x)$, the last index strictly less than $x$."
              ],
              "answer": 1,
              "explain": "<code>upper_bound</code> returns the first index with $a[i] > x$, so its predicate is $a[i] > x$ (false then true). Choice with $a[i] \\ge x$ is <code>lower_bound</code>'s predicate, and $a[i] = x$ is not monotone, so neither can be the flip point <code>upper_bound</code> computes."
            },
            {
              "q": "Using the conveyor-belt code, you must ship weights $w = [3, 2, 2, 4, 1]$ within $D = 2$ days. The answer-search runs over $[\\text{lo}, \\text{hi}]$ with $\\text{lo} = \\max_i w_i$ and $\\text{hi} = \\sum_i w_i$. What is the initial interval, and is capacity $c = 7$ feasible?",
              "choices": [
                "$[3, 12]$, and $c = 7$ is feasible (it ships in 2 days: $3{+}2{+}2$ then $4{+}1$).",
                "$[4, 12]$, and $c = 7$ is infeasible (it needs 3 days).",
                "$[4, 12]$, and $c = 7$ is feasible (it ships in 2 days: $3{+}2{+}2$ then $4{+}1$).",
                "$[3, 11]$, and $c = 7$ is feasible but not minimal; the minimum is $6$."
              ],
              "answer": 2,
              "explain": "$\\max_i w_i = 4$ and $\\sum_i w_i = 12$, so the interval is $[4, 12]$. With $c = 7$ the greedy sweep loads $3{+}2{+}2 = 7$ (day 1), then $4{+}1 = 5$ (day 2), using exactly $2 \\le D$ days, so it is feasible. The interval starting at $3$ is wrong because a single package of weight $4$ would never fit."
            },
            {
              "q": "You want the LARGEST value $t$ such that a property $Q(t)$ holds, and $Q$ is monotone: once $Q(t)$ is true it stays true for all smaller $t$ (true for low $t$, false for high $t$). A student reuses the <code>lower_bound</code>-style loop verbatim (<code>if (Q(mid)) hi = mid; else lo = mid + 1;</code>). Why does this return the wrong answer?",
              "choices": [
                "It is fine; the same loop finds both the smallest-true and largest-true boundaries.",
                "It returns the largest $t$ but off by one, since <code>lo = mid + 1</code> overshoots.",
                "It finds the first index where $Q$ is true, but here $Q$ is true-then-false, so it returns the low end instead of the high boundary; the branch directions must be swapped.",
                "It loops forever because a true-then-false predicate has no flip point."
              ],
              "answer": 2,
              "explain": "The <code>lower_bound</code> template assumes a false-then-true predicate and returns the first true index; a true-then-false predicate flips the other way, so keeping <code>hi = mid</code> on the true branch drives the search toward the wrong end. You must adapt the branches (e.g. <code>if (Q(mid)) lo = mid; else hi = mid - 1;</code>) to track the last-true boundary. A true-then-false predicate is perfectly monotone and does have a flip point, so it does not loop forever."
            },
            {
              "q": "Binary search on a sorted array of $n$ elements runs in what time?",
              "choices": [
                "$O(n)$",
                "$O(\\log n)$",
                "$O(1)$",
                "$O(n\\log n)$"
              ],
              "answer": 1,
              "explain": "Each step discards half of the remaining range, so the number of steps is the number of times $n$ can be halved to reach 1 — that's $\\log_2 n$, i.e. $O(\\log n)$."
            },
            {
              "q": "What must be true of an array for standard binary search to work correctly?",
              "choices": [
                "It must actually contain the target",
                "Its elements must all be distinct",
                "Its length must be a power of two",
                "It must be sorted by the key being searched"
              ],
              "answer": 3,
              "explain": "Binary search relies on order: comparing the target to the middle element tells you which half to keep only if the array is sorted. Duplicates are fine, any length works, and the target need not be present (the search just reports 'not found' / an insertion point)."
            },
            {
              "q": "About how many comparisons does binary search make, in the worst case, on a sorted array of 1,000,000 elements?",
              "choices": [
                "About 20",
                "About 1,000",
                "About 500,000",
                "About 1,000,000"
              ],
              "answer": 0,
              "explain": "The worst case is $\\lceil\\log_2 n\\rceil$ comparisons, and $\\log_2(10^6)\\approx 19.9$ — roughly 20. That logarithmic shrink is why binary search scales so well: a billion elements needs only ~30."
            },
            {
              "q": "How does binary search halve the search space at each step?",
              "choices": [
                "It hashes the target to a position",
                "It checks every other element",
                "It compares the target to the middle element and discards the half that cannot contain it",
                "It re-sorts the remaining range"
              ],
              "answer": 2,
              "explain": "Because the array is sorted, comparing the target to the middle element rules out an entire half: if the target is smaller, it can only be on the left; if larger, on the right. Discarding that half each step gives the logarithmic running time."
            }
          ],
          "flashcards": [
            {
              "front": "What is the overflow-safe midpoint formula, and why?",
              "back": "mid = lo + (hi - lo) / 2. Unlike (lo + hi) / 2, the term hi - lo is just the small interval width, so the computation never exceeds INT_MAX even when lo and hi are large."
            },
            {
              "front": "Define lower_bound(x) on a sorted array (three equivalent phrasings).",
              "back": "The first index i with a[i] >= x. Equivalently: the count of elements strictly less than x; equivalently: the insertion point that keeps the array sorted. Returns n if all elements are < x."
            },
            {
              "front": "Loop invariant for half-open lower_bound.",
              "back": "Everything in [0, lo) satisfies a[.] < x and everything in [hi, n) satisfies a[.] >= x. At exit lo == hi is the boundary between the two regions, which is the answer."
            },
            {
              "front": "How do you get first occurrence, last occurrence, and count of x from lower/upper bound?",
              "back": "First = lower_bound(x) (valid iff it is < n and a[i] equals x). Last = upper_bound(x) - 1 (valid only when x is present). Count = upper_bound(x) - lower_bound(x) (0 when x is absent)."
            },
            {
              "front": "What is the 4-step recipe for 'binary search on the answer'?",
              "back": "1) Identify the value t you optimize. 2) Write a yes/no feasibility predicate P(t). 3) Prove P is monotone (P(t) implies P(t') for all t' >= t). 4) Binary-search the smallest feasible t over [lo, hi] using P as the test. Cost: O(check * log range)."
            },
            {
              "front": "Why pick the half-open [lo, hi) convention with hi = mid?",
              "back": "It makes the asymmetry consistent: lo = mid + 1 (mid ruled out) vs. hi = mid (hi is exclusive, so mid stays a candidate). This avoids the classic off-by-one and infinite-loop bugs from mixing closed/half-open forms."
            }
          ],
          "homework": [
            {
              "prompt": "Implement upper_bound(a, x) = the first index i with a[i] > x, returning n if none. Then write a one-line expression using only lower_bound and upper_bound that returns the number of elements of a that lie in the closed range [L, R].",
              "hint": "upper_bound differs from lower_bound by exactly one comparison operator (loosen < to <=). For the range count, lower_bound(L) is the first index >= L and upper_bound(R) is the first index > R, so their difference counts the inclusive band.",
              "solution": "upper_bound is lower_bound with the strict comparison loosened:\n\nint upper_bound(const vector<int>& a, int x) {\n    int lo = 0, hi = (int)a.size();\n    while (lo < hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (a[mid] <= x) lo = mid + 1;   // note <= instead of <\n        else hi = mid;\n    }\n    return lo;\n}\n\nThe only change from lower_bound is a[mid] <= x (vs. a[mid] < x), which pushes the boundary past all elements equal to x.\n\nCount in [L, R]: upper_bound(a, R) - lower_bound(a, L). lower_bound(a, L) is the index of the first element >= L; upper_bound(a, R) is the index just past the last element <= R; the difference counts everything in between, inclusive. It correctly returns 0 when the range is empty."
            },
            {
              "prompt": "Koko eats bananas: there are n piles with pile[i] bananas. In one hour Koko picks a pile and eats up to k bananas from it (if the pile has fewer than k left, she eats it and stops for that hour). Find the minimum eating speed k so she finishes all piles within H hours (H >= n). Reframe this as a feasibility predicate, prove monotonicity, and give the binary-search bounds.",
              "hint": "At speed k, pile i takes ceil(pile[i] / k) hours. Is total hours a monotone function of k? What is the smallest speed that could possibly work, and the largest you would ever need (think about what speed makes every pile take exactly one hour)?",
              "solution": "Predicate: P(k) = 'total hours at speed k is <= H', where hours(k) = sum over i of ceil(pile[i] / k), computable in O(n).\n\nMonotonicity: ceil(pile[i] / k) is non-increasing in k (a faster speed never takes more hours on any pile), so hours(k) is non-increasing; therefore once P(k) is true it stays true for all larger k. P flips false -> true exactly once, so binary search is valid. We want the smallest feasible k = lower_bound of the predicate.\n\nBounds: lo = 1 (must eat at least 1 banana/hour; speed 0 never finishes). hi = max(pile) (at this speed every pile takes exactly 1 hour, using n <= H hours, which is always feasible). So the answer lies in [1, max(pile)].\n\nint minSpeed(vector<int>& pile, int H) {\n    long long lo = 1, hi = *max_element(pile.begin(), pile.end());\n    auto feasible = [&](long long k){\n        long long h = 0;\n        for (int p : pile) h += (p + k - 1) / k;  // ceil division\n        return h <= H;\n    };\n    while (lo < hi) {\n        long long mid = lo + (hi - lo) / 2;\n        if (feasible(mid)) hi = mid; else lo = mid + 1;\n    }\n    return (int)lo;\n}\n\nComplexity: O(n log(max pile))."
            },
            {
              "prompt": "A junior engineer writes this 'lower_bound' and reports it sometimes hangs forever:\n\nint lb(vector<int>& a, int x){\n    int lo = 0, hi = a.size() - 1;\n    while (lo <= hi){\n        int mid = (lo + hi) / 2;\n        if (a[mid] < x) lo = mid;\n        else hi = mid;\n    }\n    return lo;\n}\n\nIdentify every bug and give a corrected version.",
              "hint": "There are three independent issues: how lo is updated, the midpoint formula, and the choice of initial hi / loop condition. Ask which of these prevents the interval from shrinking when only two elements remain.",
              "solution": "Three bugs:\n\n1) Infinite loop (the hang). The false branch sets lo = mid, not lo = mid + 1. When hi - lo == 1, mid == lo, so lo = mid leaves lo unchanged and the interval never shrinks -> infinite loop. Fix: lo = mid + 1.\n\n2) Overflow. mid = (lo + hi) / 2 can overflow for large indices. Fix: mid = lo + (hi - lo) / 2.\n\n3) Wrong bounds / convention mismatch. With hi = a.size() - 1 and condition lo <= hi, the code mixes a closed interval with half-open updates and can never return the valid answer n (insertion at the end). The clean fix is the half-open convention: hi = a.size(), condition lo < hi.\n\nCorrected version:\n\nint lb(vector<int>& a, int x){\n    int lo = 0, hi = (int)a.size();   // half-open [lo, hi)\n    while (lo < hi){\n        int mid = lo + (hi - lo) / 2; // overflow-safe\n        if (a[mid] < x) lo = mid + 1; // mid ruled out\n        else hi = mid;                // mid is a candidate\n    }\n    return lo;                        // can return a.size()\n}\n\nThis terminates because every iteration strictly shrinks hi - lo, and it correctly returns the first index with a[i] >= x (or n if none)."
            }
          ],
          "examples": [
            {
              "title": "Trace a search",
              "body": "Find 7 in $[1,3,5,7,9,11]$ (0-indexed) with binary search.",
              "solution": "lo=0, hi=5, mid=2 → a[2]=5 < 7, so lo=3. mid=4 → a[4]=9 > 7, so hi=3. mid=3 → a[3]=7 = target → return index 3."
            },
            {
              "title": "Why O(log n)?",
              "body": "Why is binary search $O(\\log n)$, and how many steps for $n=1024$?",
              "solution": "Each comparison halves the remaining range, so it takes about $\\log_2 n$ steps. For $n=1024=2^{10}$, that's 10 steps."
            }
          ]
        }
      ]
    },
    {
      "id": "a-algorithm-design",
      "title": "Algorithm Design Paradigms",
      "lessons": [
        {
          "id": "a-divide-and-conquer",
          "title": "Divide and Conquer",
          "minutes": 16,
          "content": "<h3>The shape of an idea: divide, conquer, combine</h3>\n<p>Some problems get easier when you cut them in half. Not all of them — but enough that \"cut it in half\" deserves to be treated as a first-class algorithmic strategy rather than a lucky trick. <strong>Divide and conquer</strong> is the discipline of solving a problem by reducing it to smaller instances <em>of the same problem</em>, solving those recursively, and stitching the partial answers back together.</p>\n<p>The template has exactly three moving parts:</p>\n<ol>\n<li><strong>Divide:</strong> split the input of size $n$ into $a$ subproblems, each of size $n/b$ (with $b > 1$, so they are genuinely smaller).</li>\n<li><strong>Conquer:</strong> solve each subproblem recursively. When the input is small enough, solve it directly (the base case).</li>\n<li><strong>Combine:</strong> merge the subproblem answers into an answer for the original input.</li>\n</ol>\n<p>The art is almost never in the recursion — recursion is mechanical. The art lives in the <em>divide</em> and the <em>combine</em>. A clever divide makes the subproblems independent and cheap to recombine; a clever combine extracts more from the recursive answers than seems possible. Almost every famous divide-and-conquer algorithm is famous because of one surprising line in its combine step.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of the recursion as free labor and the combine step as the bill. Each level of recursion hands you answers to smaller problems for \"free\" (the recursion already paid for them); your only job at that level is the combine. The total running time is therefore <em>the sum of combine costs across all levels of the recursion tree</em>. Whoever controls that sum controls the algorithm.</p>\n</div>\n\n<h3>Reading the cost: recurrences and the recursion tree</h3>\n<p>Because a divide-and-conquer algorithm calls itself, its running time obeys a <strong>recurrence relation</strong>: the cost of size $n$ is written in terms of the cost of size $n/b$. The canonical form is</p>\n$$T(n) = a\\,T(n/b) + f(n),$$\n<p>where $a \\ge 1$ is the number of recursive calls, $b > 1$ is the shrink factor, and $f(n)$ is the non-recursive work — the cost of dividing plus the cost of combining at this level. To <em>solve</em> the recurrence (get a closed-form bound) the cleanest mental model is the <strong>recursion tree</strong>.</p>\n<p>Picture the calls as a tree. The root does $f(n)$ work. It has $a$ children, each doing $f(n/b)$. Level $i$ has $a^i$ nodes, each of size $n/b^i$, so the work on level $i$ is $a^i\\, f(n/b^i)$. The tree has depth $\\log_b n$ (you keep dividing by $b$ until you hit size 1). The total cost is the sum of work over all levels:</p>\n$$T(n) = \\sum_{i=0}^{\\log_b n} a^i\\, f\\!\\left(\\frac{n}{b^i}\\right) + (\\text{base-case cost}).$$\n<p>Three regimes are possible, and they are exactly the cases of the <strong>Master Theorem</strong>. Compare $f(n)$ against the \"leaf count\" $n^{\\log_b a}$ (the number of leaves in the tree, which is also the total base-case work):</p>\n<ul>\n<li><strong>Leaves dominate</strong> ($f(n) = O(n^{\\log_b a - \\epsilon})$ for some $\\epsilon > 0$): the combine work is cheap and the cost piles up at the bottom. Then $T(n) = \\Theta(n^{\\log_b a})$.</li>\n<li><strong>Balanced</strong> ($f(n) = \\Theta(n^{\\log_b a})$): every level costs about the same, and there are $\\log_b n$ levels. Then $T(n) = \\Theta(n^{\\log_b a}\\log n)$.</li>\n<li><strong>Root dominates</strong> ($f(n) = \\Omega(n^{\\log_b a + \\epsilon})$, plus a mild regularity condition): the combine at the top swamps everything below. Then $T(n) = \\Theta(f(n))$.</li>\n</ul>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>$n^{\\log_b a}$ is the hinge of every divide-and-conquer analysis. It is simultaneously (1) the number of leaves of the recursion tree and (2) the threshold that your per-level combine cost $f(n)$ must beat, tie, or lose to. Memorize the comparison \"$f(n)$ vs. $n^{\\log_b a}$\" and the Master Theorem is just bookkeeping.</p>\n</div>\n\n<h3>Example 1 — Merge sort: the balanced case</h3>\n<p>Merge sort is the cleanest possible illustration. To sort an array of size $n$:</p>\n<ul>\n<li><strong>Divide:</strong> split the array into two halves. (Trivial — just compute the midpoint, $O(1)$.)</li>\n<li><strong>Conquer:</strong> recursively sort each half.</li>\n<li><strong>Combine:</strong> <em>merge</em> two sorted halves into one sorted array in linear time, by repeatedly taking the smaller of the two front elements.</li>\n</ul>\n<pre><code>def merge_sort(A):\n    if len(A) <= 1:\n        return A\n    mid = len(A) // 2\n    L = merge_sort(A[:mid])      # conquer\n    R = merge_sort(A[mid:])      # conquer\n    return merge(L, R)           # combine\n\ndef merge(L, R):\n    out, i, j = [], 0, 0\n    while i < len(L) and j < len(R):\n        if L[i] <= R[j]:\n            out.append(L[i]); i += 1\n        else:\n            out.append(R[j]); j += 1\n    out.extend(L[i:]); out.extend(R[j:])\n    return out</code></pre>\n<p>Here $a = 2$ (two recursive calls), $b = 2$ (each half is size $n/2$), and $f(n) = \\Theta(n)$ (the merge scans every element once). The recurrence is</p>\n$$T(n) = 2\\,T(n/2) + \\Theta(n).$$\n<p>Now $n^{\\log_b a} = n^{\\log_2 2} = n^1 = n$, which equals $f(n) = \\Theta(n)$ — the <em>balanced</em> case. Every level of the tree does $\\Theta(n)$ work (level 0 merges one array of size $n$; level 1 merges two of size $n/2$; total $n$; and so on), and there are $\\log_2 n$ levels. Hence</p>\n$$T(n) = \\Theta(n \\log n).$$\n<p>That is the whole story, and it is worth pausing on the recursion-tree picture because it explains <em>why</em> sorting by comparison can't easily do better: the merge has to look at all $n$ elements at every one of the $\\log n$ levels, and there is no slack to remove.</p>\n\n<h3>Example 2 — Karatsuba: beating the obvious combine</h3>\n<p>Now a case where the surprise is real. You want to multiply two $n$-digit integers $x$ and $y$. The grade-school algorithm multiplies every digit of $x$ by every digit of $y$, costing $\\Theta(n^2)$.</p>\n<p>Try divide and conquer. Split each number into a high and low half (say in base $B = 10^{n/2}$, or base $2^{n/2}$ for binary):</p>\n$$x = x_1 B + x_0, \\qquad y = y_1 B + y_0,$$\n<p>where $x_1, x_0, y_1, y_0$ each have $n/2$ digits. Then</p>\n$$xy = x_1 y_1\\, B^2 + (x_1 y_0 + x_0 y_1)\\,B + x_0 y_0.$$\n<p>The naive reading needs <strong>four</strong> half-size multiplications: $x_1y_1$, $x_1y_0$, $x_0y_1$, $x_0y_0$. (The multiplications by $B$ and $B^2$ are just shifts — free.) That gives $T(n) = 4\\,T(n/2) + \\Theta(n)$, and since $n^{\\log_2 4} = n^2$ dominates the linear combine, the result is $T(n) = \\Theta(n^2)$ — no better than grade school. The recursion bought us nothing because we did too many subproblems.</p>\n<p><strong>Karatsuba's insight (1960):</strong> the middle coefficient $x_1y_0 + x_0y_1$ can be recovered from the two products we already need, plus <em>one</em> extra product, using an algebraic identity:</p>\n$$(x_1 + x_0)(y_1 + y_0) = x_1 y_1 + (x_1 y_0 + x_0 y_1) + x_0 y_0.$$\n<p>So define three half-size products:</p>\n<ul>\n<li>$P_1 = x_1 y_1$ (the high product),</li>\n<li>$P_2 = x_0 y_0$ (the low product),</li>\n<li>$P_3 = (x_1 + x_0)(y_1 + y_0)$.</li>\n</ul>\n<p>Then the elusive middle term is just $P_3 - P_1 - P_2$, recovered with subtractions (linear-time), and</p>\n$$xy = P_1\\,B^2 + (P_3 - P_1 - P_2)\\,B + P_2.$$\n<p>We traded one multiplication for a handful of additions and subtractions. The recurrence becomes</p>\n$$T(n) = 3\\,T(n/2) + \\Theta(n).$$\n<p>Now $n^{\\log_b a} = n^{\\log_2 3} \\approx n^{1.585}$, and the linear combine $f(n)=\\Theta(n)$ is dwarfed by it — the leaves dominate. Therefore</p>\n$$T(n) = \\Theta\\!\\left(n^{\\log_2 3}\\right) = \\Theta\\!\\left(n^{1.585}\\right).$$\n<p>That exponent dropping from $2$ to $1.585$ is enormous at scale: for $n = 10^6$ digits, $n^2 = 10^{12}$ but $n^{1.585} \\approx 10^{9.5}$ — roughly a 300x reduction in elementary operations. The lesson is structural: <em>the number of subproblems $a$ sits in the exponent</em>, so shaving even one recursive call (from 4 to 3) changes the asymptotic class. This is the opposite intuition from \"do less work per level\" — Karatsuba does slightly <em>more</em> combine work to do <em>fewer</em> subproblems, and wins big.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Karatsuba is the ancestor of a whole family. Toom-Cook generalizes the trick (split into $k$ parts, use clever evaluation/interpolation to need fewer than $k^2$ products), and the Fast Fourier Transform pushes <em>polynomial</em> multiplication to $\\Theta(n \\log n)$ (and FFT-based integer multiplication, à la Schönhage–Strassen, to $\\Theta(n \\log n \\log\\log n)$ — essentially $n\\log n$). The same \"fewer multiplications via algebraic identities\" idea is Strassen's matrix multiplication: $8$ recursive multiplies for the obvious block scheme become $7$, giving $\\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2.81})$. In modern ML this matters directly — matrix multiply is the bottleneck of training, and the entire sub-cubic matmul literature descends from this single observation that you can buy speed by reorganizing which products you compute.</p>\n</div>\n\n<h3>Example 3 — Closest pair of points: the clever combine</h3>\n<p>Given $n$ points in the plane, find the two closest. The brute-force check of all $\\binom{n}{2}$ pairs is $\\Theta(n^2)$. Divide and conquer gets $\\Theta(n \\log n)$ — but only because of a genuinely subtle combine step. This is the example that teaches you that \"combine\" can require real geometric insight.</p>\n<h4>Divide</h4>\n<p>Sort the points by $x$-coordinate once up front. Draw a vertical line that splits the points into a left half $L$ and a right half $R$ of $n/2$ each.</p>\n<h4>Conquer</h4>\n<p>Recursively find the closest pair within $L$ (distance $\\delta_L$) and within $R$ (distance $\\delta_R$). Let $\\delta = \\min(\\delta_L, \\delta_R)$ — the best pair seen so far that does not cross the dividing line.</p>\n<h4>Combine — the hard part</h4>\n<p>The closest pair overall might have one point in $L$ and one in $R$, straddling the line. Naively checking all cross pairs is again $\\Theta(n^2)$, which would ruin everything. Two observations rescue us:</p>\n<ol>\n<li><strong>Only a thin strip matters.</strong> Any cross pair closer than $\\delta$ must have both points within horizontal distance $\\delta$ of the dividing line. So discard everything outside this $2\\delta$-wide vertical strip.</li>\n<li><strong>Within the strip, each point has only a constant number of relevant neighbors.</strong> Sort the strip's points by $y$-coordinate. For a given point, any partner closer than $\\delta$ must lie within $\\delta$ in $y$ as well — and a packing argument shows at most a constant number of points (classically, you need only compare each point against the next <strong>7</strong>) can fit in the $\\delta \\times 2\\delta$ box without two of them already being closer than $\\delta$, which would contradict $\\delta$ being the in-half minimum.</li>\n</ol>\n<p>So the combine: build the strip, sort it by $y$, and for each point compare it to the next 7 points in $y$-order, updating the best distance. That is $\\Theta(n)$ work per level (if the $y$-sorted order is maintained cleverly, e.g., by merging during the recursion the way merge sort does).</p>\n<pre><code>def closest_pair(P_by_x):\n    n = len(P_by_x)\n    if n <= 3:\n        return brute_force(P_by_x)            # base case\n    mid = n // 2\n    midx = P_by_x[mid].x\n    dl = closest_pair(P_by_x[:mid])           # conquer left\n    dr = closest_pair(P_by_x[mid:])           # conquer right\n    delta = min(dl, dr)\n    strip = [p for p in P_by_x if abs(p.x - midx) < delta]\n    strip.sort(key=lambda p: p.y)             # by y within strip\n    for i in range(len(strip)):               # combine\n        j = i + 1\n        while j < len(strip) and strip[j].y - strip[i].y < delta:\n            delta = min(delta, dist(strip[i], strip[j]))\n            j += 1                            # inner loop runs O(1) times\n    return delta</code></pre>\n<p>With the $y$-sort folded into the recursion the per-level cost is $\\Theta(n)$, giving the merge-sort recurrence $T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n\\log n)$. (If you re-sort the strip from scratch at every node it becomes $2T(n/2) + \\Theta(n \\log n) = \\Theta(n \\log^2 n)$ — still far better than quadratic, and a perfectly fine first implementation.) The reason this example is beloved is that the speedup comes entirely from a counting argument in the combine: the constant \"7\" is what turns a quadratic cross-check into a linear scan.</p>\n\n<h3>How to attack a new problem</h3>\n<p>When you suspect divide and conquer, run this checklist:</p>\n<ol>\n<li><strong>What is the natural split?</strong> Halve an array, halve a number's digits, split points by a coordinate, split a range. Identify $a$ (how many pieces you recurse on) and $b$ (how much smaller each is).</li>\n<li><strong>What does the answer to a subproblem give you, and what's still missing?</strong> The missing part is the combine. Be honest about its cost $f(n)$ before optimizing.</li>\n<li><strong>Write the recurrence</strong> $T(n) = a\\,T(n/b) + f(n)$ and read off $n^{\\log_b a}$.</li>\n<li><strong>Compare $f(n)$ to $n^{\\log_b a}$</strong> to pick the Master Theorem case and get the bound.</li>\n<li><strong>If it's not better than brute force, attack the bottleneck</strong> — usually by reducing $a$ (Karatsuba/Strassen) or by pruning what the combine has to look at (closest pair's strip).</li>\n</ol>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML/AI</div>\n<p>Divide and conquer is everywhere in the stack you actually use. The FFT (a divide-and-conquer algorithm) underlies fast convolutions; <code>cuDNN</code> uses FFT- and Winograd-style fast-convolution algorithms that are direct descendants of the \"fewer multiplications\" idea. Tree-structured aggregation in distributed training (all-reduce across $\\log p$ rounds), batched recursive parallel scans behind efficient attention/state-space models, and k-d trees / ball trees for approximate nearest-neighbor search are all divide-and-conquer. When you reason about why an operation is $\\Theta(n\\log n)$ instead of $\\Theta(n^2)$, you are almost always reasoning about a recursion tree.</p>\n</div>\n\n<h3>The one-paragraph summary</h3>\n<p>Divide and conquer = split into self-similar subproblems, recurse, and combine. Its cost is a recurrence $T(n) = aT(n/b) + f(n)$, solved by comparing the per-level combine cost $f(n)$ against the leaf count $n^{\\log_b a}$. Merge sort sits at the balanced knife-edge ($\\Theta(n\\log n)$). Karatsuba wins by reducing the number of subproblems from 4 to 3, dropping the exponent to $\\log_2 3$. Closest-pair wins by a packing argument that makes the combine linear. In every case, the brilliance is in the divide or the combine — never in the recursion itself.</p>",
          "mcq": [
            {
              "q": "Karatsuba multiplies two $n$-digit numbers with the recurrence $T(n) = 3T(n/2) + \\Theta(n)$, beating the naive $T(n) = 4T(n/2) + \\Theta(n)$. What is the single most important reason Karatsuba is asymptotically faster?",
              "choices": [
                "Its combine step is cheaper than the naive algorithm's combine step",
                "It reduces the number of recursive subproblems from 4 to 3, which lowers the exponent $\\log_2 a$",
                "It uses a smaller shrink factor $b$, so the recursion tree is shallower",
                "It eliminates the base case, removing the leaf cost"
              ],
              "answer": 1,
              "explain": "The number of subproblems $a$ sits in the exponent $n^{\\log_b a}$; dropping $a$ from 4 to 3 changes the bound from $n^2$ to $n^{\\log_2 3}\\approx n^{1.585}$. The combine actually does slightly MORE work (extra additions/subtractions), so choice 0 is false."
            },
            {
              "q": "For $T(n) = aT(n/b) + f(n)$, the quantity $n^{\\log_b a}$ represents:",
              "choices": [
                "The depth of the recursion tree",
                "The combine cost at the root",
                "The number of leaves of the recursion tree (equivalently, total base-case work)",
                "The number of levels times the cost per level"
              ],
              "answer": 2,
              "explain": "Each node has $a$ children and depth is $\\log_b n$, so there are $a^{\\log_b n} = n^{\\log_b a}$ leaves. This is the threshold $f(n)$ is compared against in the Master Theorem."
            },
            {
              "q": "In the closest-pair-of-points algorithm, after recursing on left and right halves you get $\\delta = \\min(\\delta_L, \\delta_R)$. Why does the combine step run in $O(n)$ rather than $O(n^2)$ time (assuming points are kept sorted by $y$)?",
              "choices": [
                "Because the dividing line guarantees no cross pairs exist",
                "Because only points within the $2\\delta$-wide strip matter, and each such point need only be compared with a constant number of $y$-neighbors",
                "Because $\\delta$ is always achieved by an in-half pair, so cross pairs can be skipped",
                "Because sorting by $x$ once makes all later comparisons free"
              ],
              "answer": 1,
              "explain": "A packing argument shows at most a constant number of points (classically the next 7 in $y$-order) can sit in the $\\delta\\times 2\\delta$ box without violating the $\\delta$ minimum, so each strip point does $O(1)$ comparisons, giving $O(n)$ total."
            },
            {
              "q": "Merge sort's recurrence $T(n) = 2T(n/2) + \\Theta(n)$ yields $\\Theta(n\\log n)$. Which Master-Theorem regime is this, and what does it tell you about the recursion tree?",
              "choices": [
                "Leaves dominate: most work is at the base cases",
                "Root dominates: most work is in the top-level merge",
                "Balanced: every level does $\\Theta(n)$ work and there are $\\log n$ levels",
                "None of these; the Master Theorem does not apply to merge sort"
              ],
              "answer": 2,
              "explain": "Here $n^{\\log_2 2} = n = f(n)$, the balanced case. Each level merges a total of $n$ elements and there are $\\log_2 n$ levels, so total work is $\\Theta(n\\log n)$."
            },
            {
              "q": "In the recurrence $T(n) = a\\,T(n/b) + f(n)$, what does $f(n)$ represent?",
              "choices": [
                "The cost of the recursive calls themselves",
                "The non-recursive work: dividing the input plus combining the subproblem answers at one level",
                "The total running time across all levels of the recursion tree",
                "The number of leaves in the recursion tree"
              ],
              "answer": 1,
              "explain": "$f(n)$ is the per-level non-recursive work — the cost of the divide and combine steps at a node of size $n$, excluding the recursive calls counted by $a\\,T(n/b)$."
            },
            {
              "q": "According to the lesson's recursion-tree model, the work done at level $i$ (the root being level 0) is:",
              "choices": [
                "$f(n/b^i)$",
                "$a^i\\, f(n/b^i)$",
                "$a\\, f(n/b)$",
                "$a^i\\, f(n)$"
              ],
              "answer": 1,
              "explain": "Level $i$ has $a^i$ nodes, each of size $n/b^i$ doing $f(n/b^i)$ work, so the level's total is $a^i\\, f(n/b^i)$."
            },
            {
              "q": "The lesson says the recursion tree has depth $\\log_b n$. Why is the base of the logarithm $b$ rather than $a$?",
              "choices": [
                "Because $a$ counts how many subproblems are created, while $b$ is the factor by which size shrinks each level, and depth is set by how fast size reaches 1",
                "Because $a$ is always smaller than $b$ in divide and conquer",
                "Because the number of children per node determines the depth",
                "Because combining cost grows with $b$"
              ],
              "answer": 0,
              "explain": "Depth is governed by how many times you can divide the size by $b$ before hitting the base case (1), which takes $\\log_b n$ levels; $a$ controls how wide the tree gets, not how deep."
            },
            {
              "q": "The lesson claims 'the art lives in the divide and the combine,' not the recursion. What is the best justification?",
              "choices": [
                "The recursion is the slowest part, so optimizing it dominates the runtime",
                "The recursion is mechanical and 'free' once the subproblems are defined; the algorithm's cleverness and its total cost come from how cheaply and powerfully the subproblems are split and merged",
                "Combine steps never affect the asymptotic running time",
                "A clever divide always reduces the number of recursive calls to one"
              ],
              "answer": 1,
              "explain": "The lesson frames recursion as automatic 'free labor' while the divide and combine determine both the algorithm's insight and the sum of per-level costs that fixes its running time."
            },
            {
              "q": "You are designing a divide-and-conquer algorithm and have two candidate designs for the same problem of size $n$: Design A splits into 9 subproblems of size $n/3$ with a $\\Theta(n^2)$ combine; Design B splits into 2 subproblems of size $n/2$ with a $\\Theta(n^{1.5})$ combine. Which has the better asymptotic running time?",
              "choices": [
                "Design A, because $\\Theta(n^2)$ — the combine dominates and equals $n^{\\log_3 9}=n^2$, so $T(n)=\\Theta(n^2\\log n)$, which beats B",
                "Design B, because $T(n)=\\Theta(n^{1.5})$ — the combine $n^{1.5}$ dominates over $n^{\\log_2 2}=n$",
                "They tie at $\\Theta(n^2\\log n)$ since both are in the balanced Master-Theorem regime",
                "Design A, because more subproblems always means the recursion explores the input more finely and converges faster"
              ],
              "answer": 1,
              "explain": "For B, $n^{\\log_b a}=n^{\\log_2 2}=n^1$ and $f(n)=n^{1.5}$ dominates, giving $T(n)=\\Theta(n^{1.5})$ (leaf-light, root-heavy). For A, $n^{\\log_3 9}=n^2$ matches the combine, giving $\\Theta(n^2\\log n)$ — strictly worse than B's $n^{1.5}$."
            },
            {
              "q": "A student claims: 'Divide and conquer always gives a speedup, because cutting the problem in half cuts the work in half at each step.' What is the flaw in this reasoning?",
              "choices": [
                "There is no flaw — halving the input necessarily halves the total work, so D&C is always at least as fast",
                "The flaw is that recursion has function-call overhead, so D&C is slower in practice but the asymptotics still always improve",
                "The flaw is assuming subproblems are always independent; if they overlap, D&C is still optimal but just needs memoization",
                "The flaw is that the total work depends on the branching factor $a$ and the combine cost $f(n)$, not just the halving; e.g. $T(n)=4T(n/2)+\\Theta(n)=\\Theta(n^2)$ is no faster than the naive approach"
              ],
              "answer": 3,
              "explain": "Total cost is governed by $a$, $b$, and $f(n)$ together, not by 'halving' alone. With enough branching (e.g. $a=4, b=2$) the leaves dominate and you get $\\Theta(n^2)$, no better than brute force — which is exactly why Karatsuba's reduction from 4 to 3 subproblems matters."
            },
            {
              "q": "Consider the recurrence $T(n) = 2T(n/2) + \\Theta(n^2)$. Which best describes where the work concentrates in the recursion tree, and the resulting bound?",
              "choices": [
                "The work is spread evenly across all $\\log n$ levels, giving $\\Theta(n^2 \\log n)$",
                "The leaves dominate, giving $\\Theta(n)$ since there are $n$ base cases each costing $\\Theta(1)$",
                "The root dominates: work per level shrinks geometrically downward, so $T(n)=\\Theta(n^2)$",
                "The recurrence is invalid because the combine cost exceeds the input size"
              ],
              "answer": 2,
              "explain": "Here $n^{\\log_b a}=n^{\\log_2 2}=n$, and $f(n)=n^2$ grows faster, so this is the root-heavy regime: each level down does $1/2$ the work of the one above ($2\\cdot(n/2)^2 = n^2/2$), summing to $\\Theta(n^2)$. The top level alone dominates the total."
            },
            {
              "q": "Two divide-and-conquer algorithms for the same task have recurrences $T_1(n)=8T(n/2)+\\Theta(n^2)$ and $T_2(n)=7T(n/2)+\\Theta(n^2)$ (this is exactly the Strassen-vs-naive matrix-multiply situation). What are their asymptotic costs, and what does the comparison illustrate?",
              "choices": [
                "$T_1=\\Theta(n^3)$ and $T_2=\\Theta(n^{\\log_2 7})\\approx\\Theta(n^{2.81})$; dropping just one subproblem changes the dominant term and beats the cubic bound",
                "Both are $\\Theta(n^3)$ since the $\\Theta(n^2)$ combine is identical; the subproblem count only affects constants",
                "$T_1=\\Theta(n^2\\log n)$ and $T_2=\\Theta(n^2\\log n)$; both are combine-dominated, so they tie",
                "$T_2$ is slower because 7 is not a power of 2, forcing uneven subproblem sizes"
              ],
              "answer": 0,
              "explain": "$n^{\\log_2 8}=n^3$ dominates the $\\Theta(n^2)$ combine, so $T_1=\\Theta(n^3)$; reducing to 7 subproblems gives $n^{\\log_2 7}\\approx n^{2.81}$, still dominating the combine, so $T_2=\\Theta(n^{2.81})$. This shows that shaving the branching factor $a$ — not the combine — is what breaks the cubic barrier, the heart of Strassen's algorithm."
            },
            {
              "q": "What are the three phases of a divide-and-conquer algorithm?",
              "choices": [
                "Sort, Search, Merge",
                "Divide, Conquer (recurse on subproblems), Combine",
                "Split, Test, Repeat",
                "Recurse, Memoize, Return"
              ],
              "answer": 1,
              "explain": "Divide the problem into smaller subproblems, conquer them by recursing (until a base case), then combine their solutions into the answer for the original. Merge sort is the canonical example: split in half, sort each half, merge."
            },
            {
              "q": "Binary search is a divide-and-conquer algorithm in which the 'combine' step is…",
              "choices": [
                "summing the subresults",
                "merging two sorted halves",
                "comparing every pair of elements",
                "trivial — it recurses into only one half and returns that result directly"
              ],
              "answer": 3,
              "explain": "Binary search divides the range in two but recurses into just the <em>one</em> half that can contain the target, and returns its result unchanged — there's nothing to combine. That one-sided recursion is why it's $O(\\log n)$, not $O(n)$."
            },
            {
              "q": "Merge sort does its hard work in the <em>combine</em> (merge) step. Where does quicksort do its hard work?",
              "choices": [
                "In the divide step — partitioning the array around the pivot",
                "In the combine step — it merges sorted halves",
                "In the base case",
                "It does no real work; recursion handles everything"
              ],
              "answer": 0,
              "explain": "The two are mirror images: merge sort splits trivially (just take halves) and works hard to merge; quicksort works hard to partition around the pivot, after which the sorted pieces simply sit next to each other — its combine step is trivial."
            },
            {
              "q": "Why are divide-and-conquer algorithms often easy to parallelize?",
              "choices": [
                "Recursion is automatically parallel",
                "They use less memory than iterative algorithms",
                "The subproblems are independent, so they can be solved simultaneously on separate processors",
                "They skip the combine step"
              ],
              "answer": 2,
              "explain": "Divide-and-conquer breaks a problem into independent subproblems that don't depend on each other's results, so they can run concurrently on different cores/machines — only the final combine step needs their outputs."
            }
          ],
          "flashcards": [
            {
              "front": "State the canonical divide-and-conquer recurrence and name each symbol.",
              "back": "$T(n) = a\\,T(n/b) + f(n)$, where $a$ = number of recursive subproblems, $b$ = factor by which input shrinks ($b>1$), and $f(n)$ = non-recursive (divide + combine) work at this level."
            },
            {
              "front": "What is $n^{\\log_b a}$ and why does it matter?",
              "back": "It is the number of leaves of the recursion tree (and total base-case work). The Master Theorem decides the bound by comparing the per-level combine cost $f(n)$ against it: $f$ smaller -> $\\Theta(n^{\\log_b a})$; equal -> $\\Theta(n^{\\log_b a}\\log n)$; larger -> $\\Theta(f(n))$."
            },
            {
              "front": "Karatsuba: what algebraic identity removes the fourth multiplication?",
              "back": "$(x_1+x_0)(y_1+y_0) = x_1y_1 + (x_1y_0+x_0y_1) + x_0y_0$, so the middle term $= P_3 - P_1 - P_2$ where $P_1=x_1y_1,\\ P_2=x_0y_0,\\ P_3=(x_1+x_0)(y_1+y_0)$. Result: 3 multiplications, giving $\\Theta(n^{\\log_2 3})\\approx\\Theta(n^{1.585})$."
            },
            {
              "front": "Merge sort: recurrence and running time.",
              "back": "$T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n\\log n)$. Divide is $O(1)$ (split at midpoint); combine is the linear-time merge of two sorted halves (the balanced Master-Theorem case)."
            },
            {
              "front": "Closest pair of points: running time and the key combine insight.",
              "back": "$\\Theta(n\\log n)$. After recursion gives $\\delta=\\min(\\delta_L,\\delta_R)$, only points within a $2\\delta$ vertical strip can form a closer cross pair, and each strip point (sorted by $y$) need only be checked against a constant number of $y$-neighbors (classically 7)."
            },
            {
              "front": "What is the general recipe to speed up a divide-and-conquer algorithm that isn't beating brute force?",
              "back": "Either reduce the number of subproblems $a$ via algebraic identities (Karatsuba 4->3, Strassen 8->7), or prune what the combine must examine (closest-pair strip). $a$ lives in the exponent, so reducing it changes the asymptotic class."
            }
          ],
          "homework": [
            {
              "prompt": "Strassen's algorithm multiplies two $n\\times n$ matrices by splitting each into four $(n/2)\\times(n/2)$ blocks. The naive block method needs 8 recursive multiplications; Strassen uses clever additions to need only 7. (a) Write the recurrence for the naive block method and solve it. (b) Write the recurrence for Strassen and solve it. (c) State why Strassen is asymptotically faster in one sentence.",
              "hint": "Both have $b=2$ and combine cost $f(n)=\\Theta(n^2)$ (adding $(n/2)\\times(n/2)$ blocks). Only $a$ differs. Compare $f(n)$ to $n^{\\log_b a}$ in each case.",
              "solution": "(a) Naive: $T(n)=8T(n/2)+\\Theta(n^2)$. Here $n^{\\log_2 8}=n^3$, which dominates $f(n)=\\Theta(n^2)$, so leaves dominate and $T(n)=\\Theta(n^3)$ — same as schoolbook matrix multiply. (b) Strassen: $T(n)=7T(n/2)+\\Theta(n^2)$. Now $n^{\\log_2 7}\\approx n^{2.807}$, still dominating $f(n)=\\Theta(n^2)$, so $T(n)=\\Theta(n^{\\log_2 7})\\approx\\Theta(n^{2.81})$. (c) Reducing the number of recursive multiplications from 8 to 7 lowers the exponent from $\\log_2 8=3$ to $\\log_2 7\\approx 2.807$, and since the subproblem count $a$ appears in the exponent $n^{\\log_b a}$, even one fewer subproblem changes the asymptotic class."
            },
            {
              "prompt": "Consider this problem: given a sorted array $A$ of $n$ distinct integers, find an index $i$ such that $A[i] = i$ (a 'fixed point'), or report none exists. (a) Identify the divide and combine steps of a divide-and-conquer solution. (b) Write its recurrence. (c) State the running time and contrast it with the linear scan.",
              "hint": "Because $A$ is sorted with distinct integers, $A[i]-i$ is non-decreasing. Look at the middle element and ask whether $A[\\text{mid}]$ is less than, equal to, or greater than $\\text{mid}$ — does that tell you which half to discard?",
              "solution": "Since the integers are distinct and sorted, $A[i+1]\\ge A[i]+1$, so $g(i)=A[i]-i$ is non-decreasing. Divide: examine $\\text{mid}=\\lfloor n/2\\rfloor$. If $A[\\text{mid}]=\\text{mid}$, return it. If $A[\\text{mid}]<\\text{mid}$ then $g$ is negative there and (being non-decreasing) no fixed point lies to the left, so recurse only on the right half; symmetrically if $A[\\text{mid}]>\\text{mid}$, recurse only on the left half. Combine: trivial — at most one subproblem is solved and its answer is returned directly, no merging needed. (b) Recurrence: $T(n)=T(n/2)+\\Theta(1)$ (here $a=1$, $b=2$, $f(n)=\\Theta(1)$). (c) By the Master Theorem $n^{\\log_2 1}=n^0=1=f(n)$ (balanced case), giving $T(n)=\\Theta(\\log n)$. This beats the $\\Theta(n)$ linear scan because, like binary search, each step discards half the array; the key enabling fact is the monotonicity of $A[i]-i$."
            },
            {
              "prompt": "You are asked to count the number of inversions in an array (pairs $i<j$ with $A[i]>A[j]$) — a measure of how unsorted the array is, used in rank-correlation statistics. Brute force is $\\Theta(n^2)$. Design a divide-and-conquer algorithm in $\\Theta(n\\log n)$ by piggybacking on merge sort. State the divide step, the combine step (the crucial part), and the recurrence.",
              "hint": "Sort and count simultaneously. When merging two sorted halves, what does it mean when you pick an element from the RIGHT half while elements still remain in the LEFT half?",
              "solution": "Divide: split the array into two halves. Conquer: recursively (sort and) count inversions entirely within the left half ($x$) and within the right half ($y$). Combine (the key step): merge the two sorted halves as in merge sort, but while merging, count 'split inversions' — pairs with one element in each half. During the merge, whenever you take an element from the right half while $k$ elements still remain in the left half, every one of those $k$ remaining left elements is greater than the chosen right element (because both halves are sorted), so they each form an inversion with it; add $k$ to the count. Summing across the whole merge counts every split inversion exactly once, in $\\Theta(n)$ time. Total inversions $= x + y + (\\text{split count})$. Recurrence: $T(n)=2T(n/2)+\\Theta(n)=\\Theta(n\\log n)$, identical to merge sort, because the counting is folded into the linear-time merge for free."
            }
          ],
          "examples": [
            {
              "title": "Tracing merge sort on an 8-element array",
              "body": "Sort the array $[5,2,8,1,9,3,7,4]$ by hand using merge sort. Show the divide step, then every merge in the combine step, bottom-up.",
              "solution": "<strong>Divide</strong> (recursively split at the midpoint until each piece has size 1):\n$$[5,2,8,1\\,|\\,9,3,7,4] \\to [5,2\\,|\\,8,1]\\;[9,3\\,|\\,7,4] \\to [5][2]\\,[8][1]\\;[9][3]\\,[7][4].$$\nSingletons are already sorted, so the work is all in the <strong>combine</strong>. We merge bottom-up, always taking the smaller of the two front elements.\n\n<strong>Level 1 (merge pairs of size 1 into size 2):</strong>\n<ul>\n<li>$[5],[2]$: compare $5$ vs $2 \\Rightarrow [2,5]$</li>\n<li>$[8],[1]$: compare $8$ vs $1 \\Rightarrow [1,8]$</li>\n<li>$[9],[3]$: compare $9$ vs $3 \\Rightarrow [3,9]$</li>\n<li>$[7],[4]$: compare $7$ vs $4 \\Rightarrow [4,7]$</li>\n</ul>\nState: $[2,5]\\;[1,8]\\;[3,9]\\;[4,7]$.\n\n<strong>Level 2 (merge into size 4):</strong>\n<ul>\n<li>Merge $[2,5]$ and $[1,8]$: take $1$, then $2$, then $5$, then $8 \\Rightarrow [1,2,5,8]$.</li>\n<li>Merge $[3,9]$ and $[4,7]$: take $3$, then $4$, then $7$, then $9 \\Rightarrow [3,4,7,9]$.</li>\n</ul>\nState: $[1,2,5,8]\\;[3,4,7,9]$.\n\n<strong>Level 3 (final merge into size 8):</strong> merge $[1,2,5,8]$ and $[3,4,7,9]$. Compare front elements repeatedly:\n$1{<}3\\to 1$; $2{<}3\\to 2$; $5{>}3\\to 3$; $5{>}4\\to 4$; $5{<}7\\to 5$; $8{>}7\\to 7$; $8{<}9\\to 8$; then drain $\\to 9$.\nResult: $[1,2,3,4,5,7,8,9]$.\n\nNotice the recursion-tree structure: there are $\\log_2 8 = 3$ merge levels, and each level touches all $8$ elements, so the work is $3 \\times 8 = 24$ element-moves, matching the $\\Theta(n\\log n)$ prediction of $T(n)=2T(n/2)+\\Theta(n)$.\n\n<strong>Answer:</strong> $[1,2,3,4,5,7,8,9]$, sorted in $3$ merge levels of $\\Theta(n)$ work each."
            },
            {
              "title": "Solving a recurrence whose combine cost beats the leaves",
              "body": "An algorithm splits a size-$n$ problem into $a=2$ subproblems of size $n/4$ each, and its combine step costs $f(n)=\\Theta(n)$. Solve $T(n)=2\\,T(n/4)+\\Theta(n)$ with the recursion-tree method, then confirm with the Master Theorem.",
              "solution": "<strong>Identify the parameters:</strong> $a=2$, $b=4$, $f(n)=\\Theta(n)$. The hinge quantity (the leaf count) is\n$$n^{\\log_b a} = n^{\\log_4 2} = n^{1/2} = \\sqrt{n},$$\nsince $\\log_4 2 = \\tfrac{\\ln 2}{\\ln 4} = \\tfrac12$.\n\n<strong>Compare $f(n)$ to $n^{\\log_b a}$:</strong> here $f(n)=\\Theta(n)$ grows faster than $\\sqrt{n}$ — in fact $n = n^{1/2 + 1/2}$, so $f(n)=\\Omega(n^{\\log_b a + \\epsilon})$ with $\\epsilon = \\tfrac12 > 0$. This is the <strong>root-dominates</strong> regime (Master Theorem Case 3). We expect $T(n)=\\Theta(f(n))=\\Theta(n)$.\n\n<strong>Verify with the recursion tree.</strong> Level $i$ has $a^i = 2^i$ nodes, each of size $n/4^i$, so each does work $\\Theta(n/4^i)$. The total work on level $i$ is\n$$2^i \\cdot \\frac{n}{4^i} = n\\left(\\frac{2}{4}\\right)^i = n\\left(\\tfrac12\\right)^i.$$\nThe per-level cost <em>shrinks geometrically</em> as we descend — the root does the most work. Summing over all levels (down to depth $\\log_4 n$):\n$$T(n) = \\sum_{i=0}^{\\log_4 n} n\\left(\\tfrac12\\right)^i \\le n\\sum_{i=0}^{\\infty}\\left(\\tfrac12\\right)^i = n \\cdot \\frac{1}{1-\\tfrac12} = 2n.$$\nThe geometric series is dominated by its first term, so the sum is $\\Theta(n)$, and the cheap leaves ($\\Theta(\\sqrt n)$ total base-case work) are negligible.\n\n<strong>Check the regularity condition</strong> for Case 3: we need $a\\,f(n/b) \\le c\\,f(n)$ for some $c<1$. Here $a\\,f(n/b) = 2\\cdot \\tfrac{n}{4} = \\tfrac{n}{2} = \\tfrac12 f(n)$, so $c=\\tfrac12<1$ holds. Case 3 applies cleanly.\n\n<strong>Answer:</strong> $T(n)=\\Theta(n)$. The lesson: when the combine cost outgrows the leaf count $n^{\\log_b a}$, the recursion-tree sum is top-heavy and collapses to the cost of the single root call."
            }
          ]
        },
        {
          "id": "a-greedy",
          "title": "Greedy Algorithms",
          "minutes": 16,
          "content": "<h3>The Greedy Idea: Commit Now, Never Look Back</h3>\n<p>A <strong>greedy algorithm</strong> builds a solution incrementally, and at every step it makes the choice that looks best <em>right now</em> — the locally optimal move — without ever reconsidering. No backtracking, no recursion over alternatives, no dynamic-programming table. Just: sort or prioritize, then sweep through and grab.</p>\n<p>This is almost suspiciously simple. The deep question is never \"how do I write a greedy algorithm?\" (that part is easy) but rather \"<strong>is my greedy choice actually optimal, or am I fooling myself?</strong>\" Most problems do <em>not</em> yield to greed. The art is recognizing the rare, beautiful structure where local optimality compounds into global optimality — and proving it.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Greedy is the algorithmic version of climbing a hill by always stepping in the steepest upward direction. On a single smooth peak (a convex landscape) you reach the top. On a rugged landscape with many peaks you get stuck. Greedy correctness is exactly the claim that <em>this</em> landscape has the right shape.</p></div>\n\n<h3>The Two Ingredients That Make Greedy Work</h3>\n<p>A problem is provably solvable by a greedy algorithm when it has <strong>both</strong> of the following properties. Either one alone is not enough.</p>\n\n<h4>1. The greedy-choice property</h4>\n<p>There exists a globally optimal solution that <em>contains</em> the first greedy choice. Formally: if we pick the locally best element $g$, then some optimal solution includes $g$. This is what licenses committing to $g$ forever — we are not throwing away optimality by doing so.</p>\n<p>Contrast this with dynamic programming, where the choice at a step depends on the optimal solutions of subproblems you must <em>solve first</em>. Greedy makes its choice <em>before</em> solving any subproblem; it then has only one subproblem left.</p>\n\n<h4>2. Optimal substructure</h4>\n<p>An optimal solution to the whole problem contains within it optimal solutions to subproblems. After committing to the greedy choice $g$, the remaining problem (the original with $g$ removed/accounted for) is a smaller instance of the same problem, and an optimal solution to it, combined with $g$, is optimal overall.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>Greedy = <strong>optimal substructure</strong> + <strong>greedy-choice property</strong>. Optimal substructure is shared with dynamic programming. The greedy-choice property is the extra, stronger condition that collapses the \"try all choices\" of DP into \"make one choice.\" When you only have optimal substructure, you usually need DP, not greed.</p></div>\n\n<h3>The Exchange Argument: How You Actually Prove It</h3>\n<p>The standard tool for establishing the greedy-choice property is the <strong>exchange argument</strong> (a.k.a. exchange/swap proof). The skeleton:</p>\n<ol>\n<li>Let $G = (g_1, g_2, \\dots)$ be the greedy solution and let $O = (o_1, o_2, \\dots)$ be <em>any</em> optimal solution. Assume for contradiction (or just for comparison) that $O \\neq G$.</li>\n<li>Find the first place they differ. Argue that you can <strong>swap</strong> an element of $O$ for the corresponding greedy element <em>without making $O$ worse</em> (and without violating feasibility).</li>\n<li>Each swap makes $O$ agree with $G$ in one more position while keeping it optimal and feasible. Repeat. After finitely many swaps, $O$ has been transformed into $G$, so $G$ is also optimal.</li>\n</ol>\n<p>The phrase \"without making it worse\" is the whole game. You are showing the greedy choice is at least as good as whatever the optimal solution did, so adopting greed costs nothing.</p>\n\n<h3>Worked Example 1 — Interval Scheduling (Activity Selection)</h3>\n<p><strong>Problem.</strong> You have $n$ activities, each with a start time $s_i$ and finish time $f_i$. Two activities are compatible if their half-open intervals $[s_i, f_i)$ don't overlap. Select a maximum-size set of mutually compatible activities (one room, no double-booking).</p>\n<p><strong>The wrong greedies (build intuition for what fails).</strong></p>\n<ul>\n<li><em>Earliest start first</em>: a single activity starting at 6am and ending at midnight blocks everything. Fails.</li>\n<li><em>Shortest duration first</em>: a short activity in the middle can knock out two longer non-overlapping ones. Fails.</li>\n<li><em>Fewest conflicts first</em>: plausible, but constructible counterexamples exist. Fails.</li>\n</ul>\n<p><strong>The correct greedy: earliest finish time first.</strong> Sort activities by finish time. Repeatedly take the next activity whose start is $\\ge$ the finish of the last one taken.</p>\n<pre><code>sort activities so that f_1 <= f_2 <= ... <= f_n\nselected = [activity 1]\nlast_finish = f_1\nfor i = 2 .. n:\n    if s_i >= last_finish:\n        selected.append(activity i)\n        last_finish = f_i\nreturn selected</code></pre>\n<p>Runs in $O(n \\log n)$ (dominated by the sort).</p>\n<p><strong>Why it's optimal (exchange argument).</strong> Let $G = (a_1, a_2, \\dots, a_k)$ be greedy's picks in order, and let $O = (b_1, b_2, \\dots, b_m)$ be an optimal solution, also sorted by finish time. We claim $f(a_i) \\le f(b_i)$ for every $i$ (\"greedy stays ahead\").</p>\n<ul>\n<li><em>Base case:</em> greedy picks the globally earliest-finishing activity, so $f(a_1) \\le f(b_1)$.</li>\n<li><em>Inductive step:</em> suppose $f(a_{i-1}) \\le f(b_{i-1})$. Since $b_i$ is compatible with $b_{i-1}$ in $O$, we have $s(b_i) \\ge f(b_{i-1}) \\ge f(a_{i-1})$, so $b_i$ was a candidate available to greedy at step $i$. Greedy chose the available activity with the smallest finish, hence $f(a_i) \\le f(b_i)$.</li>\n</ul>\n<p>Now suppose, for contradiction, that $O$ has <em>more</em> activities than $G$, i.e. $m > k$. Consider $b_{k+1}$. We just showed $f(a_k) \\le f(b_k) \\le s(b_{k+1})$, so $b_{k+1}$ is compatible with greedy's last pick $a_k$ — meaning greedy would have selected it too, contradicting that greedy stopped at $k$. Therefore $m = k$ and greedy is optimal. $\\blacksquare$</p>\n<p>This is a slightly different flavor (a \"stays ahead\" argument) but it is an exchange argument in spirit: at each step the greedy element is interchangeable with the optimal one without loss.</p>\n\n<h3>Worked Example 2 — Fractional Knapsack</h3>\n<p><strong>Problem.</strong> Items $1 \\dots n$ with value $v_i$ and weight $w_i$, and a capacity $W$. You may take <em>fractions</em> of items. Maximize total value subject to total weight $\\le W$.</p>\n<p><strong>Greedy.</strong> Sort by value density $v_i / w_i$ descending. Pour items into the knapsack in that order; when the next whole item won't fit, take the fraction that exactly fills the remaining capacity, then stop.</p>\n<pre><code>sort items by v_i / w_i descending\nremaining = W; value = 0\nfor each item in sorted order:\n    if w_i <= remaining:\n        take all of it; value += v_i; remaining -= w_i\n    else:\n        take fraction (remaining / w_i); value += v_i * (remaining / w_i)\n        break\nreturn value</code></pre>\n<p><strong>Why it's optimal (exchange argument).</strong> Suppose an optimal solution takes a smaller amount of some high-density item $h$ than greedy does, and instead takes some lower-density item $\\ell$ (with $v_h/w_h > v_\\ell/w_\\ell$). Remove a tiny weight $\\delta$ of $\\ell$ and add weight $\\delta$ of $h$. Weight is unchanged (still feasible), but value changes by $\\delta(v_h/w_h - v_\\ell/w_\\ell) > 0$ — a strict improvement, contradicting optimality. So the optimal solution must already prefer denser items exactly as greedy does. Because we can take fractions, density-ordering is fully exploitable down to the last unit of capacity.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The fractional version is optimal precisely <em>because</em> the decision variable is continuous: you can always exchange an infinitesimal $\\delta$ of weight. This is a recurring theme in optimization — <strong>relaxing integrality makes a problem easy</strong>. Linear programming and its rounding are the grown-up version of this idea, and the LP relaxation of 0/1 knapsack is exactly the fractional knapsack.</p></div>\n\n<h3>Worked Example 3 — Huffman Coding</h3>\n<p><strong>Problem.</strong> Given symbols with frequencies $f_1, \\dots, f_n$, build a binary prefix-free code (no codeword is a prefix of another) minimizing the expected codeword length $\\sum_i f_i \\cdot \\text{len}(c_i)$. Equivalently, build a binary tree with the symbols at leaves minimizing $\\sum_i f_i \\cdot \\text{depth}(i)$.</p>\n<p><strong>Greedy.</strong> Repeatedly merge the two <em>least</em>-frequent nodes into a new internal node whose frequency is their sum, until one node remains. Use a min-heap.</p>\n<pre><code>build a min-heap of all symbols keyed by frequency\nwhile heap has more than one node:\n    x = extract_min(); y = extract_min()\n    z = new node with freq = x.freq + y.freq, children x and y\n    insert z into heap\nreturn the remaining node as the tree root</code></pre>\n<p>Time $O(n \\log n)$. Codewords are read off as left=0, right=1 down the tree.</p>\n<p><strong>Why it's optimal (the greedy-choice lemma).</strong> Let $x, y$ be the two lowest-frequency symbols. Claim: there is an optimal tree in which $x$ and $y$ are sibling leaves at maximum depth. Proof: take any optimal tree and let $a, b$ be two sibling leaves at maximum depth. If $x$ (lowest freq) is not already deepest, swap $x$ with $a$. Because $f_x$ is smallest and $a$ is at least as deep, moving the smaller frequency deeper cannot increase the cost $\\sum f_i \\cdot \\text{depth}_i$ (you traded a larger frequency at a deep spot for a smaller one). Similarly swap $y$ with $b$. After the swaps $x, y$ are deepest siblings and cost did not increase — so an optimal tree with this structure exists. That justifies merging $x$ and $y$ first.</p>\n<p>Optimal substructure then finishes it: replacing $\\{x, y\\}$ by a merged symbol $z$ of frequency $f_x + f_y$ yields a strictly smaller instance, and an optimal tree for the smaller instance expands to an optimal tree for the original (the cost differs by the fixed constant $f_x + f_y$ regardless of where $z$ sits). Induction gives global optimality. $\\blacksquare$</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML / AI</div><p>Huffman coding is the constructive heart of <strong>information theory</strong>: the expected code length it achieves is within one bit of the Shannon entropy $H = -\\sum_i p_i \\log_2 p_i$. Entropy, cross-entropy, and KL divergence — the loss functions behind classification and language models — are all \"expected optimal code length\" measured in bits. When a model minimizes cross-entropy, it is, in a precise sense, learning to compress: a better model assigns shorter codes (higher probability) to the data it actually sees. Modern arithmetic/range coders beat Huffman in practice, but the optimality principle is the same.</p></div>\n\n<h3>When Greedy Fails: 0/1 Knapsack</h3>\n<p>Make the knapsack items <em>indivisible</em> (take it whole or not at all) and the density-greedy collapses. Counterexample with capacity $W = 10$:</p>\n<ul>\n<li>Item A: value 60, weight 10, density 6.0</li>\n<li>Item B: value 100, weight 20 — too heavy alone, skip for $W=10$.</li>\n</ul>\n<p>Let me give a cleaner, classic counterexample with $W = 10$:</p>\n<ul>\n<li>Item A: value 60, weight 10 → density 6.0</li>\n<li>Item B: value 40, weight 6 → density 6.67</li>\n<li>Item C: value 30, weight 4 → density 7.5</li>\n</ul>\n<p>Greedy by density takes C (weight 4, value 30), then B (weight 6, value 40) — capacity now full at 10, total value <strong>70</strong>. But the optimal choice is just A: weight 10, value <strong>60</strong>? No — $70 > 60$, so greedy actually wins here. The point of a counterexample is to find where it <em>loses</em>; let me use the canonical one:</p>\n<p>Capacity $W = 50$:</p>\n<ul>\n<li>Item 1: value 60, weight 10 → density 6.0</li>\n<li>Item 2: value 100, weight 20 → density 5.0</li>\n<li>Item 3: value 120, weight 30 → density 4.0</li>\n</ul>\n<p>Density-greedy takes item 1 (10, 60), then item 2 (20, 100) — used weight 30, value 160 — then item 3 won't fit (would need 30, only 20 left). Greedy total = <strong>160</strong>. But the optimal is items 2 and 3: weight $20 + 30 = 50$, value $100 + 120 = $ <strong>220</strong>. Greedy loses by 60.</p>\n<p><strong>Why it breaks.</strong> The greedy-choice property is gone. Committing to the densest item (item 1) is <em>fatal</em>: here no optimal solution contains item 1. The discreteness means you can't shave off an infinitesimal to rebalance; you face an all-or-nothing interaction between items. 0/1 knapsack needs dynamic programming, running in $O(nW)$ (pseudo-polynomial) — and is NP-hard in the input-size sense.</p>\n<div class=\"callout\"><div class=\"c-tag\">Diagnostic</div><p>The tell-tale sign greedy will fail: a locally great choice can <em>foreclose</em> a much better combination later, and you cannot undo it cheaply. If choices interact (one selection changes the value/feasibility of others in a non-monotone way), suspect DP, not greed.</p></div>\n\n<h3>A Decision Checklist: Does My Problem Admit Greedy?</h3>\n<ol>\n<li><strong>Can I order the elements by a single priority</strong> (a key) such that \"take in that order, subject to feasibility\" plausibly works? If no natural key exists, greedy is unlikely.</li>\n<li><strong>Greedy-choice property:</strong> can I argue that the top-priority element belongs to <em>some</em> optimal solution? Try to write the exchange step: \"swap the optimal's choice for the greedy choice without loss.\"</li>\n<li><strong>Optimal substructure:</strong> after committing, is the remainder the same kind of problem?</li>\n<li><strong>Counterexample hunt:</strong> actively try to break it with a small instance where the greedy commitment forecloses a better combo (as in 0/1 knapsack). Failing to find one is weak evidence; <em>finding</em> one is conclusive proof greedy is wrong.</li>\n</ol>\n<p>If steps 2 and 3 both go through with a real proof, greedy is correct and you get a fast, simple algorithm. If the exchange step stalls or a counterexample appears, reach for dynamic programming or other tools.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>Greedy correctness has a profound abstract home: <strong>matroid theory</strong>. A matroid is a structure $(E, \\mathcal{I})$ of \"independent sets\" closed under subsets and satisfying an exchange axiom. The Greedy Algorithm correctly maximizes any linear weighting over a matroid — and matroids are essentially the <em>only</em> structures where greedy always works for every weighting. Minimum spanning tree (Kruskal's algorithm) is the headline example: forests form a matroid, which is the abstract reason sorting-and-grabbing-edges is optimal. The generalization to <strong>submodular maximization</strong> — where greedy is no longer exact but gives a provable $(1 - 1/e)$ approximation — underlies feature selection, active learning, data subset selection, and influence maximization across modern ML.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li>Greedy = make the locally optimal choice, commit, never revisit. Correct only with <strong>optimal substructure</strong> + the <strong>greedy-choice property</strong>.</li>\n<li>The <strong>exchange argument</strong> is the canonical proof: transform any optimal solution into the greedy one swap-by-swap without losing optimality.</li>\n<li><strong>Interval scheduling</strong> (earliest finish), <strong>fractional knapsack</strong> (densest first), and <strong>Huffman coding</strong> (merge two rarest) are the model success stories.</li>\n<li><strong>0/1 knapsack</strong> is the model failure: indivisibility kills the greedy-choice property; use DP.</li>\n<li>Connections run deep: Huffman ↔ entropy/cross-entropy, fractional relaxation ↔ LP, and matroids/submodularity ↔ when greedy is exact or near-exact in ML.</li>\n</ul>",
          "mcq": [
            {
              "q": "What distinguishes a problem solvable by a greedy algorithm from one that merely has optimal substructure (and thus typically needs dynamic programming)?",
              "choices": [
                "Greedy problems have smaller input sizes",
                "Greedy problems additionally satisfy the greedy-choice property: a locally optimal first choice is contained in some globally optimal solution, so no subproblems must be solved before committing",
                "Greedy problems never involve sorting",
                "Greedy problems are always solvable in $O(n)$ time without any preprocessing"
              ],
              "answer": 1,
              "explain": "Optimal substructure is shared with DP; the extra greedy-choice property lets you commit to the local choice before solving any subproblem, collapsing 'try all choices' into 'make one.'"
            },
            {
              "q": "For the interval scheduling (activity selection) problem, which greedy rule is provably optimal?",
              "choices": [
                "Pick the activity with the earliest start time first",
                "Pick the activity with the shortest duration first",
                "Pick the activity with the earliest finish time first",
                "Pick the activity with the fewest conflicts first"
              ],
              "answer": 2,
              "explain": "Earliest-finish-time leaves the most room for remaining activities and admits a 'greedy stays ahead' / exchange proof; the other three rules each have explicit counterexamples."
            },
            {
              "q": "Why does the density-greedy strategy solve fractional knapsack optimally but fail on 0/1 knapsack?",
              "choices": [
                "Fractional knapsack has fewer items by definition",
                "In the fractional case you can exchange an infinitesimal weight $\\delta$ of a lower-density item for a higher-density one to strictly improve, which is impossible when items are indivisible and choices foreclose better combinations",
                "0/1 knapsack has no optimal substructure at all",
                "Density ordering is only computable for continuous weights"
              ],
              "answer": 1,
              "explain": "Continuity enables the exchange argument down to the last unit of capacity; indivisibility destroys the greedy-choice property, so 0/1 knapsack needs DP."
            },
            {
              "q": "In Huffman coding, what is the greedy choice, and what guarantees it is safe?",
              "choices": [
                "Merge the two highest-frequency symbols; they should be near the root",
                "Merge the two lowest-frequency symbols; an exchange argument shows some optimal tree has them as deepest siblings",
                "Assign the shortest codeword to the rarest symbol to balance the tree",
                "Always split the alphabet in half by frequency to keep the tree balanced"
              ],
              "answer": 1,
              "explain": "The two rarest symbols can be made deepest siblings in an optimal tree (swapping a smaller frequency deeper never increases $\\sum f_i\\cdot\\text{depth}_i$), justifying merging them first."
            },
            {
              "q": "A problem is known to have optimal substructure but the greedy-choice property has NOT been established. What does the lesson say you should typically reach for?",
              "choices": [
                "A greedy algorithm, since optimal substructure alone guarantees correctness",
                "Dynamic programming, since you generally need it when only optimal substructure holds",
                "Backtracking is impossible, so the problem has no efficient solution",
                "Greedy will work as long as you sort the input first"
              ],
              "answer": 1,
              "explain": "The lesson states that optimal substructure is shared with DP; without the extra greedy-choice property you usually must explore subproblem solutions, which is exactly what DP does. So when you only have optimal substructure, you typically need DP, not greed."
            },
            {
              "q": "The lesson compares greedy to hill-climbing by always stepping in the steepest upward direction. On what kind of landscape does this reliably reach the global optimum?",
              "choices": [
                "A rugged landscape with many separate peaks",
                "A single smooth (convex) peak",
                "A perfectly flat plateau",
                "Any landscape, since steepest ascent never gets stuck"
              ],
              "answer": 1,
              "explain": "On a single smooth/convex peak, steepest ascent reaches the top, whereas a rugged multi-peak landscape traps the climber in a local optimum. Greedy correctness is precisely the claim that the landscape has this single-peak shape."
            },
            {
              "q": "What is the key difference in WHEN greedy versus dynamic programming makes its choice at a step?",
              "choices": [
                "Greedy makes its choice before solving any subproblem, while DP's choice depends on first solving optimal subproblems",
                "DP makes its choice first and greedy waits until all subproblems are solved",
                "Both make the choice only after solving all subproblems, but greedy uses a table",
                "Greedy chooses randomly while DP chooses optimally"
              ],
              "answer": 0,
              "explain": "Greedy commits to the locally best element before solving any subproblem, leaving only one subproblem, whereas DP's step choice depends on optimal solutions to subproblems it must solve first."
            },
            {
              "q": "The greedy-choice property states that after picking the locally best element $g$, some globally optimal solution must include $g$. Why is this property what licenses committing to $g$ forever?",
              "choices": [
                "Because it proves $g$ is the only element that can ever appear in any solution",
                "Because it guarantees that choosing $g$ does not throw away optimality, so no backtracking is needed",
                "Because it makes the remaining subproblem disappear entirely",
                "Because it replaces the need for optimal substructure"
              ],
              "answer": 1,
              "explain": "If an optimal solution containing $g$ exists, committing to $g$ cannot sacrifice optimality, which is precisely what justifies never reconsidering the choice. It does not eliminate the remaining subproblem (which still must be solved) nor replace optimal substructure (both properties are required)."
            },
            {
              "q": "You run the activity-selection greedy (repeatedly pick the compatible activity with the earliest finish time) on the intervals $[1,4], [3,5], [0,6], [5,7], [3,8], [5,9], [6,10], [8,11], [8,12], [2,13], [12,14]$. How many activities does it select?",
              "choices": [
                "3",
                "4",
                "5",
                "6"
              ],
              "answer": 1,
              "explain": "Greedy picks $[1,4]$ (finish 4), then $[5,7]$ (finish 7), then $[8,11]$ (finish 11), then $[12,14]$ — 4 activities. The earliest-finish rule maximizes the cardinality; choosing $[0,6]$ first (a tempting earliest-start choice) would block more activities and yields fewer."
            },
            {
              "q": "A standard exchange argument proves greedy optimality by taking an optimal solution $O$ that disagrees with the greedy choice $g$ and modifying it. What modification does the argument make, and why must it preserve optimality?",
              "choices": [
                "It swaps $g$ into $O$ in place of whatever element $O$ chose first; this can only improve or tie because $g$ was the locally best choice, so the result is still optimal and now agrees with greedy",
                "It deletes $g$ from $O$ and re-runs dynamic programming on the remainder, which is faster than greedy",
                "It adds $g$ to $O$ as an extra element, increasing the solution's size beyond optimal and proving greedy wins",
                "It proves $O$ never existed, since any optimal solution must already equal the greedy output exactly"
              ],
              "answer": 0,
              "explain": "The exchange argument substitutes $g$ for $O$'s first element and shows the swap keeps the solution feasible and no worse, so an optimal solution containing $g$ exists. Adding $g$ as extra (choice C) would violate feasibility/budget, and optimal solutions need not be unique (choice D)."
            },
            {
              "q": "For making change with coin denominations $\\{1, 3, 4\\}$ and target amount $6$, the greedy 'take the largest coin that fits' algorithm gives which result, and is it optimal?",
              "choices": [
                "Greedy gives $4+1+1$ (3 coins), which is optimal",
                "Greedy gives $4+1+1$ (3 coins), but the optimum is $3+3$ (2 coins), so greedy is not optimal here",
                "Greedy gives $3+3$ (2 coins), which is optimal",
                "Greedy gives $4+1+1$ (3 coins) and no 2-coin solution exists"
              ],
              "answer": 1,
              "explain": "Greedy grabs $4$, then $1+1$, using 3 coins, but $3+3$ uses only 2. This denomination set lacks the structure that makes the greedy coin-change choice safe, so greedy is suboptimal even though it always terminates with a valid answer."
            },
            {
              "q": "Greedy gave the correct answer on every test case a student tried for their new problem. What is the most accurate conclusion they can draw about whether greedy is actually optimal?",
              "choices": [
                "Passing many test cases is essentially a proof, since a counterexample would almost certainly have appeared by now",
                "Nothing is established without a correctness proof (e.g. exchange argument or greedy-choice property); empirical success on samples does not rule out a counterexample",
                "It proves the greedy-choice property holds but not optimal substructure",
                "It guarantees correctness on all inputs below the largest tested size, but not larger ones"
              ],
              "answer": 1,
              "explain": "Empirical success is not a proof; greedy correctness must be argued via the greedy-choice property plus optimal substructure (or an exchange argument). Counterexamples can hide at any input size and need not be small, so neither a size bound (D) nor 'almost certainly' (A) is justified."
            },
            {
              "q": "Which two properties must a problem have for a greedy algorithm to be guaranteed optimal?",
              "choices": [
                "Sorted input and recursion",
                "Optimal substructure and overlapping subproblems",
                "The greedy-choice property and optimal substructure",
                "A convex objective function"
              ],
              "answer": 2,
              "explain": "Greedy needs the <strong>greedy-choice property</strong> (a locally optimal choice is part of some global optimum) plus <strong>optimal substructure</strong> (an optimal solution contains optimal solutions to subproblems). Optimal substructure + <em>overlapping</em> subproblems is the signature of dynamic programming instead."
            },
            {
              "q": "Dijkstra's shortest-path algorithm is greedy because at each step it…",
              "choices": [
                "permanently settles the unvisited vertex with the smallest tentative distance, and never revisits it",
                "tries every possible path and keeps the best",
                "fills a dynamic-programming table over all edge subsets",
                "backtracks whenever it hits a longer edge"
              ],
              "answer": 0,
              "explain": "Dijkstra greedily 'finalizes' the closest unsettled vertex each round, trusting that its shortest distance is now known. That greedy choice is safe only with non-negative edge weights — negative edges break it (use Bellman–Ford instead)."
            },
            {
              "q": "Compared with dynamic programming for the same problem, a correct greedy algorithm is typically…",
              "choices": [
                "more memory-hungry",
                "always slower but always correct",
                "always correct on any problem",
                "faster and simpler — but only correct when the greedy-choice property holds"
              ],
              "answer": 3,
              "explain": "When greedy applies, it makes one pass of locally optimal choices — usually $O(n\\log n)$ or $O(n)$ with little memory, beating DP's table-filling. The catch is proving the greedy-choice property holds; without it, greedy can be confidently wrong and you need DP."
            },
            {
              "q": "A defining feature of a greedy algorithm is that once it commits to a choice, it…",
              "choices": [
                "tries all the alternatives to that choice later",
                "never reconsiders or undoes that choice",
                "stores it in a memoization table for reuse",
                "re-sorts the remaining input each time"
              ],
              "answer": 1,
              "explain": "Greedy makes an irrevocable locally optimal choice at each step and moves on — no reconsidering (that's backtracking) and no caching of overlapping subproblems (that's dynamic programming). Its speed comes precisely from never looking back."
            }
          ],
          "flashcards": [
            {
              "front": "The two properties a problem must have for a greedy algorithm to be provably optimal",
              "back": "(1) Optimal substructure: an optimal solution contains optimal solutions to subproblems. (2) Greedy-choice property: a locally optimal first choice is contained in some globally optimal solution."
            },
            {
              "front": "What is an exchange argument and what does it prove?",
              "back": "A proof technique establishing the greedy-choice property: take any optimal solution, repeatedly swap its elements for the greedy ones without making it worse or infeasible, until it equals the greedy solution — showing greedy is also optimal."
            },
            {
              "front": "Correct greedy rule for interval scheduling (activity selection) and its running time",
              "back": "Repeatedly select the compatible activity with the earliest finish time. Sort by finish time, then sweep: $O(n\\log n)$. Earliest-start, shortest-duration, and fewest-conflicts rules all fail."
            },
            {
              "front": "Fractional vs. 0/1 knapsack: which is greedy and which is not?",
              "back": "Fractional knapsack: greedy by value density $v_i/w_i$ descending is optimal (continuity allows infinitesimal exchange). 0/1 knapsack: greedy fails; needs DP in $O(nW)$ — indivisibility breaks the greedy-choice property."
            },
            {
              "front": "Huffman coding greedy step and its connection to information theory",
              "back": "Repeatedly merge the two lowest-frequency nodes (min-heap), $O(n\\log n)$. Achieves expected length within 1 bit of Shannon entropy $H=-\\sum_i p_i\\log_2 p_i$; cross-entropy loss in ML is expected optimal code length."
            },
            {
              "front": "Abstract structures where greedy is guaranteed optimal / near-optimal",
              "back": "Matroids: greedy maximizes any linear weighting exactly (e.g., MST via Kruskal). Submodular maximization: greedy gives a $(1-1/e)$ approximation — used in feature/subset selection and active learning."
            }
          ],
          "homework": [
            {
              "prompt": "Coin change: given coin denominations and a target amount, the greedy algorithm repeatedly takes the largest coin $\\le$ the remaining amount. For the US/canonical system $\\{1, 5, 10, 25\\}$ greedy is optimal. Construct a denomination set and a target for which greedy uses MORE coins than the true minimum, and state both counts.",
              "hint": "Pick denominations where a large coin forecloses a much more efficient combination of mid-sized coins, much like 0/1 knapsack. Try a set like $\\{1, 3, 4\\}$.",
              "solution": "Use denominations $\\{1, 3, 4\\}$ and target $6$. Greedy takes the largest coin $\\le 6$, which is $4$, leaving $2$; then $1 + 1$. That's $4 + 1 + 1 = 3$ coins. But the optimal is $3 + 3 = 2$ coins. Greedy uses 3, optimum uses 2. The greedy-choice property fails: committing to the $4$ excludes it from any optimal solution for target $6$, and the discreteness prevents rebalancing. (This is why general coin change requires DP in $O(\\text{amount}\\times\\text{#coins})$, while the canonical US system happens to be 'greedy-friendly.')"
            },
            {
              "prompt": "Prove, via an exchange argument, that scheduling to minimize maximum lateness is solved by the Earliest Deadline First (EDF) rule. Setup: $n$ jobs, job $j$ has processing time $t_j$ and deadline $d_j$; schedule all on one machine with no gaps starting at time 0; lateness of $j$ is $\\max(0, C_j - d_j)$ where $C_j$ is its completion time. Show ordering jobs by increasing deadline minimizes the maximum lateness.",
              "hint": "Take any optimal schedule. If it is not in deadline order, there exist two ADJACENT jobs out of order ($d_i > d_j$ but $i$ runs immediately before $j$). Swap them and show the maximum lateness does not increase.",
              "solution": "Take an optimal schedule $O$. If $O$ is not sorted by deadline, there is an adjacent inversion: jobs $i$ then $j$ with $d_i > d_j$. Swap them to get schedule $O'$. Only the lateness of $i$ and $j$ can change (all other jobs keep the same completion time, since $t_i+t_j$ is unchanged for the block). Let $C$ be the completion time of the block's second job. Before the swap, $j$ finishes at $C$ giving lateness $C - d_j$; $i$ finishes earlier. After the swap, $i$ finishes at $C$ giving lateness $C - d_i$. Since $d_i > d_j$, we have $C - d_i < C - d_j$, so the worse of the two latenesses does not increase: $\\max$ lateness over $\\{i,j\\}$ in $O'$ is $\\le$ that in $O$. Also $j$ now finishes earlier than $C$, so its lateness only drops. Hence $O'$ is still optimal and has one fewer inversion. Repeating eliminates all inversions, yielding the EDF schedule with no increase in maximum lateness. Therefore EDF is optimal. There are no idle-time benefits and exchanging adjacent inverted jobs is the canonical exchange step. $\\blacksquare$"
            },
            {
              "prompt": "Given symbol frequencies $A:5,\\ B:9,\\ C:12,\\ D:13,\\ E:16,\\ F:45$, run Huffman's algorithm. Report the codeword length assigned to each symbol and compute the expected (weighted average) bits per symbol. Compare against fixed-length 3-bit encoding.",
              "hint": "Repeatedly extract the two smallest-frequency nodes and merge. Track the merged frequencies. The most frequent symbol (F:45) should end up with the shortest codeword.",
              "solution": "Merge steps (always combine the two smallest): (1) A:5 + B:9 = 14. (2) Now smallest are C:12, D:13 → 25. (3) Smallest are 14 (=A,B) and E:16 → 30. (4) Smallest are 25 (=C,D) and 30 (=A,B,E) → 55. (5) Finally F:45 + 55 = 100 (root). Reading depths from the tree: F is one branch from the root (length 1); the other branch (55) splits into 25 (→ C,D) and 30 (→ E and 14). So C and D have length 3; E has length 3; A and B (under the 14 node, one more level down) have length 4. Lengths: F=1, C=3, D=3, E=3, A=4, B=4. Expected bits = $(45\\cdot1 + 12\\cdot3 + 13\\cdot3 + 16\\cdot3 + 5\\cdot4 + 9\\cdot4)/100 = (45 + 36 + 39 + 48 + 20 + 36)/100 = 224/100 = 2.24$ bits/symbol. Fixed-length needs $\\lceil\\log_2 6\\rceil = 3$ bits/symbol. Huffman saves about 25%. (For reference, Shannon entropy of this distribution is about 2.22 bits, confirming Huffman is within 1 bit of the entropy bound.)"
            }
          ],
          "examples": [
            {
              "title": "Tracing Activity Selection by Earliest Finish Time",
              "body": "You have 6 activities with (start, finish) times: $A=(1,4)$, $B=(3,5)$, $C=(0,6)$, $D=(5,7)$, $E=(3,9)$, $F=(8,10)$. Select the maximum number of mutually non-overlapping activities using the greedy rule \"always take the compatible activity that finishes earliest.\"",
              "solution": "<strong>Step 1 — Sort by finish time.</strong> The greedy choice is the earliest-finishing activity, so order the list by finish:\n\n$$A(1,4),\\ B(3,5),\\ C(0,6),\\ D(5,7),\\ E(3,9),\\ F(8,10).$$\n\n<strong>Step 2 — Sweep through, tracking the last finish time $f$.</strong> Initialize the selected set $S=\\{\\}$ and $f=-\\infty$. An activity $(s,t)$ is <em>compatible</em> if $s \\ge f$.\n\n- $A(1,4)$: $1 \\ge -\\infty$, take it. $S=\\{A\\}$, $f=4$.\n- $B(3,5)$: $3 \\ge 4$? No (overlaps $A$). Skip.\n- $C(0,6)$: $0 \\ge 4$? No. Skip.\n- $D(5,7)$: $5 \\ge 4$? Yes, take it. $S=\\{A,D\\}$, $f=7$.\n- $E(3,9)$: $3 \\ge 7$? No. Skip.\n- $F(8,10)$: $8 \\ge 7$? Yes, take it. $S=\\{A,D,F\\}$, $f=10$.\n\n<strong>Step 3 — Read off the result.</strong> The selected set is $\\{A(1,4),\\ D(5,7),\\ F(8,10)\\}$, of size $3$.\n\n<strong>Step 4 — Sanity-check optimality.</strong> The intervals $[1,4]$, $[5,7]$, $[8,10]$ are pairwise disjoint. Could 4 fit? Any feasible activity must end by time $10$, and each chosen one occupies its slot; trying $C(0,6)$ first forces a finish of $6$, leaving only $D$ then $F$ — still $3$. No selection of size $4$ exists because that would require 4 disjoint sub-intervals of $[0,10]$, but the available finish times leave too little room. The greedy-choice property holds here: taking the earliest finisher never blocks an optimal solution, since it frees up the most remaining time.\n\n<strong>Answer:</strong> The maximum is $\\boxed{3}$ activities: $A,\\ D,\\ F$."
            },
            {
              "title": "Greedy Coin Change — Where Greed Wins and Where It Fails",
              "body": "Make change for $48$ cents. First use the canonical US coin system $\\{25,10,5,1\\}$ with the greedy rule \"always take the largest coin that fits.\" Then test the same greedy rule on the non-canonical system $\\{25,20,1\\}$ for the amount $40$, and compare to the true optimum.",
              "solution": "<strong>Part 1 — Canonical system $\\{25,10,5,1\\}$, amount $48$.</strong>\n\nGreedily subtract the largest coin $\\le$ the remaining amount $r$:\n\n- $r=48$: largest coin $\\le 48$ is $25$. Take $25$, count $=1$, $r=23$.\n- $r=23$: largest is $10$. Take $10$, count $=2$, $r=13$.\n- $r=13$: largest is $10$. Take $10$, count $=3$, $r=3$.\n- $r=3$: largest is $1$. Take $1$, count $=4$, $r=2$.\n- $r=2$: take $1$, count $=5$, $r=1$.\n- $r=1$: take $1$, count $=6$, $r=0$.\n\nResult: $48 = 25 + 10 + 10 + 1 + 1 + 1$, using $\\mathbf{6}$ coins. For US denominations this is provably optimal — the system is <em>canonical</em>, so greedy matches the true minimum.\n\n<strong>Part 2 — Non-canonical system $\\{25,20,1\\}$, amount $40$.</strong>\n\nApply the identical greedy rule:\n\n- $r=40$: largest coin $\\le 40$ is $25$. Take $25$, count $=1$, $r=15$.\n- $r=15$: largest $\\le 15$ is $1$. Take $1$ fifteen times, count $=16$, $r=0$.\n\nGreedy gives $40 = 25 + 15\\times 1$, using $\\mathbf{16}$ coins.\n\nBut the <strong>true optimum</strong> is $40 = 20 + 20$, using only $\\mathbf{2}$ coins.\n\n<strong>Why greed failed.</strong> The locally best first move (grab the $25$) created a remainder of $15$ that the system handles terribly. The greedy-choice property does <em>not</em> hold here: no optimal solution contains a $25$ coin, yet greedy commits to it and never looks back. This is exactly the lesson's warning — greedy correctness is a structural claim about the denominations, not a free lunch. The same one-line algorithm is optimal on $\\{25,10,5,1\\}$ and badly wrong on $\\{25,20,1\\}$.\n\n<strong>Answer:</strong> Greedy is correct and uses $6$ coins for $48$ in the canonical system; it uses $16$ coins for $40$ in $\\{25,20,1\\}$ versus the optimal $2$, so greedy is <em>not</em> optimal there ($16 \\ne 2$)."
            }
          ]
        },
        {
          "id": "a-dynamic-programming",
          "title": "Dynamic Programming",
          "minutes": 20,
          "content": "<h3>1. Why Dynamic Programming Exists</h3>\n<p>Dynamic Programming (DP) is the art of solving a problem by solving smaller versions of the <em>same</em> problem and <strong>never solving the same subproblem twice</strong>. The name is historical and slightly misleading — Richard Bellman coined \"dynamic programming\" in the 1950s partly because it sounded impressive to his funders; \"programming\" here means <em>tabulation/planning</em>, not coding. What matters is the engineering reality: DP turns an exponential-time recursion into a polynomial-time computation by trading time for memory.</p>\n<p>Two structural properties must both hold before DP applies:</p>\n<ul>\n<li><strong>Optimal substructure:</strong> an optimal solution to the whole problem is built out of optimal solutions to its subproblems. Formally, if you knew the optimal answer to every \"smaller\" instance, you could combine them in $O(1)$ or polynomial work to get the answer to the bigger one.</li>\n<li><strong>Overlapping subproblems:</strong> the recursion revisits the <em>same</em> subproblem many times. This is what distinguishes DP from divide-and-conquer. Mergesort splits into disjoint halves (no overlap → no DP needed); naive Fibonacci recomputes $F(n-2)$ exponentially often (massive overlap → DP pays off).</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>If a problem has optimal substructure but <em>no</em> overlap, use divide-and-conquer. If it has overlap but <em>no</em> optimal substructure, you may need a different tool (greedy fails, search/branch-and-bound, etc.). DP is precisely the intersection: recurse <em>and</em> remember.</p></div>\n\n<h3>2. The Canonical Pitfall: Naive Fibonacci</h3>\n<p>The recurrence $F(n) = F(n-1) + F(n-2)$ with $F(0)=0, F(1)=1$ looks innocent. Coded naively:</p>\n<pre><code>def fib(n):\n    if n &lt; 2: return n\n    return fib(n-1) + fib(n-2)</code></pre>\n<p>The call tree has roughly $\\phi^n$ nodes where $\\phi = \\frac{1+\\sqrt{5}}{2} \\approx 1.618$, so this is $O(\\phi^n)$ — exponential. Yet there are only $n+1$ <em>distinct</em> subproblems $F(0), \\dots, F(n)$. We are recomputing each an exponential number of times. DP fixes this by computing each distinct subproblem once.</p>\n\n<h3>3. The Two Faces of DP: Memoization vs Tabulation</h3>\n<p>There is exactly one underlying recurrence; there are two ways to evaluate it.</p>\n<h4>Top-down (memoization)</h4>\n<p>Keep the natural recursion, but cache results in a lookup table (memo). Before computing a subproblem, check the cache; after computing, store it.</p>\n<pre><code>from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n &lt; 2: return n\n    return fib(n-1) + fib(n-2)</code></pre>\n<h4>Bottom-up (tabulation)</h4>\n<p>Identify a valid evaluation order (a topological order of the subproblem dependency graph) and fill a table iteratively, smallest subproblems first.</p>\n<pre><code>def fib(n):\n    if n &lt; 2: return n\n    dp = [0]*(n+1); dp[1] = 1\n    for i in range(2, n+1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]</code></pre>\n<p>Both are $O(n)$ time and $O(n)$ space (Fibonacci even drops to $O(1)$ space since only two predecessors matter). They are <strong>duals</strong>: the same DAG of subproblems, traversed lazily-on-demand vs eagerly-in-order.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">When each wins</div><p><strong>Top-down</strong> only computes subproblems that are actually reachable (good when the state space is large but sparsely visited) and is closer to the recurrence so it is easier to write correctly. <strong>Bottom-up</strong> has no recursion overhead or stack-overflow risk, gives explicit control over evaluation order (enabling space optimization like rolling arrays), and is usually faster by a constant factor.</p></div>\n<p><strong>ML connection.</strong> This memoize-the-overlapping-recursion idea is everywhere in machine learning. <em>Backpropagation</em> is dynamic programming over the computation graph: the chain rule has overlapping subexpressions (shared gradients), and reverse-mode autodiff computes each $\\partial L / \\partial v$ exactly once by traversing the graph in reverse topological order — precisely tabulation. The <em>Viterbi</em>, <em>forward-backward</em>, and <em>CTC</em> algorithms for sequence models are DP. <em>Value iteration</em> in reinforcement learning is the Bellman optimality equation solved by tabulation. Bellman, the father of DP, also gave us the Bellman equation at the heart of RL — not a coincidence.</p>\n\n<h3>4. The DP Design Recipe</h3>\n<p>Every DP problem yields to the same five-step discipline. Internalize this; the \"classic problems\" are just instances.</p>\n<ol>\n<li><strong>Define the state.</strong> What is the minimal information that fully describes a subproblem? Write it as $dp[\\dots]$ with explicit semantics in one English sentence. This is the single most important step — a wrong state definition dooms everything downstream.</li>\n<li><strong>Write the transition (recurrence).</strong> Express $dp[\\text{state}]$ in terms of strictly \"smaller\" states. This encodes the optimal-substructure decision: \"what is the last choice I make, and what subproblem remains?\"</li>\n<li><strong>Base cases.</strong> The smallest states whose answers are known directly.</li>\n<li><strong>Evaluation order.</strong> Ensure each state is computed after everything it depends on (topological order). For tabulation this dictates the loop directions.</li>\n<li><strong>Answer extraction (and reconstruction).</strong> Which state(s) hold the final answer, and how do you recover the actual optimal <em>solution</em> (not just its value) via backpointers.</li>\n</ol>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The <strong>state space</strong> is a DAG: nodes are subproblems, edges are transition dependencies. DP time = (number of states) × (work per transition). This product is your complexity. Minimizing the state space — finding the smallest sufficient description of a subproblem — is the real intellectual work, and it's the same skill as choosing good features or a good Markov state in ML.</p></div>\n\n<h3>5. Classic Problem 1: 0/1 Knapsack</h3>\n<p>You have $n$ items, item $i$ with weight $w_i$ and value $v_i$, and a knapsack of capacity $W$. Choose a subset to maximize total value subject to total weight $\\le W$. \"0/1\" means each item is taken whole or not at all.</p>\n<p><strong>State:</strong> $dp[i][c]$ = maximum value achievable using only the first $i$ items with capacity budget $c$.</p>\n<p><strong>Transition</strong> — the key decision is \"do I take item $i$?\":</p>\n$$dp[i][c] = \\begin{cases} dp[i-1][c] & \\text{if } w_i > c \\;(\\text{can't fit}) \\\\ \\max\\bigl(\\underbrace{dp[i-1][c]}_{\\text{skip } i},\\; \\underbrace{dp[i-1][c-w_i] + v_i}_{\\text{take } i}\\bigr) & \\text{otherwise} \\end{cases}$$\n<p><strong>Base case:</strong> $dp[0][c] = 0$ for all $c$ (no items → no value). <strong>Answer:</strong> $dp[n][W]$.</p>\n<p><strong>Complexity:</strong> $O(nW)$ time and space. Note this is <em>pseudo-polynomial</em> — it depends on the numeric value $W$, not just the input size in bits. Knapsack is NP-hard; DP works because $W$ is treated as \"small,\" but it blows up if $W$ is astronomically large.</p>\n<p>Space optimization: since row $i$ depends only on row $i-1$, use a 1D array and iterate $c$ from $W$ down to $w_i$ (the right-to-left order ensures $dp[c-w_i]$ still holds the <em>previous</em> row's value — a subtle but crucial detail).</p>\n\n<h3>6. Worked Example: Knapsack by Hand</h3>\n<p>Let $W = 5$ and four items:</p>\n<ul><li>Item 1: $w=1, v=1$</li><li>Item 2: $w=2, v=6$</li><li>Item 3: $w=3, v=10$</li><li>Item 4: $w=2, v=7$</li></ul>\n<p>We fill the table $dp[i][c]$, rows $i = 0..4$, columns $c = 0..5$.</p>\n<pre><code>          c=0  c=1  c=2  c=3  c=4  c=5\ni=0 (--)    0    0    0    0    0    0\ni=1 (w1v1)  0    1    1    1    1    1\ni=2 (w2v6)  0    1    6    7    7    7\ni=3 (w3v10) 0    1    6   10   11   16\ni=4 (w2v7)  0    1    7   10   13   17</code></pre>\n<p>Reading a few cells to build trust:</p>\n<ul>\n<li>$dp[2][3]$: capacity 3, items {1,2}. Take item 2 ($v=6$) then best of remaining capacity 1 with item 1 ($v=1$): $6+1=7$. ✓</li>\n<li>$dp[3][5]$: $\\max(dp[2][5]=7,\\; dp[2][5-3]+10 = dp[2][2]+10 = 6+10 = 16) = 16$. ✓</li>\n<li>$dp[4][5]$: $\\max(dp[3][5]=16,\\; dp[3][5-2]+7 = dp[3][3]+7 = 10+7 = 17) = 17$. ✓</li>\n</ul>\n<p>The optimal value is $dp[4][5] = 17$.</p>\n<h4>Reconstruction via backpointers</h4>\n<p>To recover <em>which items</em>, walk backward from $dp[n][W]$. At each $dp[i][c]$, ask: did taking item $i$ produce this value? If $dp[i][c] \\ne dp[i-1][c]$, item $i$ was taken — record it and move to $dp[i-1][c-w_i]$; otherwise move to $dp[i-1][c]$.</p>\n<pre><code>i=4, c=5: dp[4][5]=17 != dp[3][5]=16  -> take item 4, c -> 5-2=3\ni=3, c=3: dp[3][3]=10 != dp[2][3]=7   -> take item 3, c -> 3-3=0\ni=2, c=0: dp[2][0]=0  == dp[1][0]=0   -> skip item 2\ni=1, c=0: dp[1][0]=0  == dp[0][0]=0   -> skip item 1\nChosen: {item 4 (w2v7), item 3 (w3v10)}  total w=5, v=17  ✓</code></pre>\n<p>This backtracking trick — comparing a cell against the cell it would have been had we not made the choice — is the universal way to reconstruct solutions when you stored only values, not explicit pointers.</p>\n\n<h3>7. Classic Problem 2: Longest Common Subsequence (LCS)</h3>\n<p>Given strings $X = x_1\\dots x_m$ and $Y = y_1\\dots y_n$, find the longest sequence appearing in both as a (not necessarily contiguous) subsequence. LCS underlies <code>diff</code>, version control, and DNA alignment.</p>\n<p><strong>State:</strong> $dp[i][j]$ = length of the LCS of prefixes $X[1..i]$ and $Y[1..j]$.</p>\n<p><strong>Transition</strong> — compare the last characters:</p>\n$$dp[i][j] = \\begin{cases} 0 & i=0 \\text{ or } j=0 \\\\ dp[i-1][j-1] + 1 & x_i = y_j \\\\ \\max\\bigl(dp[i-1][j],\\, dp[i][j-1]\\bigr) & x_i \\ne y_j \\end{cases}$$\n<p>Intuition: if the last characters match, they can both be the end of the LCS, so add 1 and recurse on both shrunk prefixes. If they differ, at least one of them is not in the LCS, so try dropping each. <strong>Answer:</strong> $dp[m][n]$, in $O(mn)$ time/space. Reconstruction: walk from $dp[m][n]$; on a diagonal (match) step, prepend the character; otherwise move toward the larger neighbor.</p>\n\n<h3>8. Classic Problem 3: Edit Distance (Levenshtein)</h3>\n<p>The minimum number of single-character insertions, deletions, or substitutions to turn $X$ into $Y$. This is the engine behind spell-checkers, fuzzy search, and bioinformatics alignment.</p>\n<p><strong>State:</strong> $dp[i][j]$ = edit distance between $X[1..i]$ and $Y[1..j]$.</p>\n$$dp[i][j] = \\begin{cases} j & i = 0 \\quad (\\text{insert all of } Y) \\\\ i & j = 0 \\quad (\\text{delete all of } X) \\\\ dp[i-1][j-1] & x_i = y_j \\\\ 1 + \\min\\bigl(\\underbrace{dp[i-1][j]}_{\\text{delete } x_i},\\, \\underbrace{dp[i][j-1]}_{\\text{insert } y_j},\\, \\underbrace{dp[i-1][j-1]}_{\\text{substitute}}\\bigr) & x_i \\ne y_j \\end{cases}$$\n<p>Each cell encodes the cheapest of the three edit operations plus the case where characters already agree (free). $O(mn)$ time/space. Notice the strong family resemblance to LCS — same prefix-vs-prefix state, slightly different transition. Once you see the pattern, an entire class of string problems collapses into it.</p>\n\n<h3>9. Classic Problem 4: Coin Change</h3>\n<p>Given coin denominations $c_1, \\dots, c_k$ (unlimited supply) and a target amount $A$, find the <em>minimum number of coins</em> summing to $A$ (or report impossible).</p>\n<p><strong>State:</strong> $dp[a]$ = minimum coins to make amount $a$. This is a <em>1D</em> state — the cleanest illustration of the recipe.</p>\n$$dp[a] = \\begin{cases} 0 & a = 0 \\\\ \\displaystyle 1 + \\min_{\\;c_j \\le a}\\, dp[a - c_j] & a > 0 \\end{cases}$$\n<p>where a subproblem evaluates to $+\\infty$ (impossible) if every $dp[a-c_j]$ on the right is itself $+\\infty$. This is an <em>unbounded</em> knapsack flavor: because supply is unlimited, the subproblem $dp[a-c_j]$ may reuse coin $c_j$ again. Time $O(A \\cdot k)$. Contrast with the <em>greedy</em> \"always take the biggest coin\" — that works for canonical currency systems (US coins) but fails in general: for coins $\\{1,3,4\\}$ and $A=6$, greedy gives $4+1+1=3$ coins, but DP finds $3+3=2$ coins. <strong>This is exactly why DP exists where greedy fails: a locally optimal choice need not be globally optimal.</strong></p>\n<div class=\"callout\"><div class=\"c-tag\">Watch the variant</div><p>\"Minimum number of coins,\" \"number of distinct ways to make change,\" and \"can it be made at all\" are three different DPs over the same coins. The <em>order of loops</em> (coins-outer vs amount-outer) decides whether you count combinations or permutations in the counting variant. Always restate the exact question before writing the recurrence.</p></div>\n\n<h3>10. How to Recognize and Attack a New DP Problem</h3>\n<p>When you suspect DP, run this checklist:</p>\n<ul>\n<li>Is the answer an optimum (max/min/count) over a combinatorial set of choices made in sequence? → likely DP.</li>\n<li>Can you describe a subproblem with a few integer/string-prefix parameters? Those parameters <em>are</em> your state.</li>\n<li>\"What is the last decision?\" Peeling off the final choice (last item, last character, last coin) almost always reveals the transition.</li>\n<li>Count states × transition cost. If it's polynomial and fits in memory, you're done; if not, look for a smaller sufficient state (this is where cleverness lives).</li>\n</ul>\n<p>Two failure modes to avoid: (1) a state that is not <em>sufficient</em> (two different histories map to the same state but should be treated differently — your recurrence will be wrong), and (2) a state that is not <em>necessary</em> (carries redundant info, blowing up complexity). The right state is the minimal sufficient statistic for the future — once more, exactly the notion of a Markov state in reinforcement learning and of a sufficient statistic in inference.</p>\n\n<h3>11. Summary</h3>\n<p>DP = optimal substructure + overlapping subproblems, evaluated by memoization (lazy, top-down) or tabulation (eager, bottom-up). The whole craft reduces to: <strong>define a minimal sufficient state, write the transition by peeling off the last decision, order the computation topologically, and reconstruct via backpointers.</strong> Knapsack, LCS, edit distance, and coin change are not four tricks — they are four readings of the same recipe, and that recipe powers backprop, Viterbi, and value iteration alike.</p>\n<h4>Try it yourself</h4>\n<p>Run it, then tinker — change the inputs and re-run. The badge confirms when your output matches.</p>\n<div data-code=\"python\" data-expected=\"[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\"># Fibonacci by bottom-up DP: each value reuses the two before it.\ndef fib(n):\n    dp = [0, 1]\n    for i in range(2, n + 1):\n        dp.append(dp[-1] + dp[-2])\n    return dp[n]\n\nprint([fib(i) for i in range(10)])</div>",
          "mcq": [
            {
              "q": "In the 1D space-optimized 0/1 knapsack (single array $dp[c]$, $c=0\\dots W$), why must the capacity loop iterate from $W$ down to $w_i$ rather than from $w_i$ up to $W$?",
              "choices": [
                "Descending order is faster due to CPU cache behavior",
                "Descending order ensures $dp[c-w_i]$ still holds the previous item's value, preserving the 0/1 (use-each-item-once) semantics",
                "Ascending order would index out of bounds",
                "The order doesn't matter; both give the same result"
              ],
              "answer": 1,
              "explain": "Going descending guarantees $dp[c-w_i]$ has not yet been overwritten in this iteration, so it reflects row $i-1$. Ascending order would let item $i$ be reused, which actually computes unbounded knapsack."
            },
            {
              "q": "For coins $\\{1,3,4\\}$ and amount $A=6$, the greedy 'largest coin first' strategy gives 3 coins ($4+1+1$) but the DP optimum is 2 coins ($3+3$). What general principle does this illustrate?",
              "choices": [
                "Greedy is always wrong for coin change",
                "Coin change has no optimal substructure",
                "A locally optimal (greedy) choice need not be globally optimal, so DP is required when the greedy-choice property fails",
                "DP and greedy always give the same answer"
              ],
              "answer": 2,
              "explain": "Greedy works only for special (canonical) coin systems. When the greedy-choice property fails, you must consider all last-coin choices, which is exactly what the DP recurrence does."
            },
            {
              "q": "What fundamentally distinguishes problems suited to dynamic programming from those suited to plain divide-and-conquer?",
              "choices": [
                "DP requires recursion while divide-and-conquer does not",
                "DP problems have overlapping subproblems (the same subproblem recurs), making caching worthwhile; divide-and-conquer splits into disjoint, non-repeating subproblems",
                "Divide-and-conquer requires optimal substructure but DP does not",
                "DP is always faster than divide-and-conquer"
              ],
              "answer": 1,
              "explain": "Both exploit optimal substructure, but only DP has overlapping subproblems. Mergesort's halves never overlap, so memoization buys nothing there; Fibonacci's calls overlap exponentially, so caching is essential."
            },
            {
              "q": "Why is the standard $O(nW)$ knapsack DP called 'pseudo-polynomial' rather than polynomial?",
              "choices": [
                "Because it uses recursion internally",
                "Because its running time depends on the numeric magnitude $W$, which is exponential in the number of bits needed to write $W$, not polynomial in the input size",
                "Because it sometimes returns approximate answers",
                "Because the table can contain non-integer values"
              ],
              "answer": 1,
              "explain": "$W$ takes $\\log W$ bits to encode, so $O(nW)$ is exponential in the input bit-length. This is why an NP-hard problem can still have such a DP: it is efficient only when $W$ is numerically small."
            },
            {
              "q": "Naive recursive Fibonacci runs in $O(\\phi^n)$ time, yet the recurrence only has $n+1$ distinct subproblems. What does memoization exploit to bring this down to $O(n)$?",
              "choices": [
                "Optimal substructure — combining sub-answers in $O(1)$ work",
                "Overlapping subproblems — the same subproblem is recomputed many times, so caching each one eliminates the redundant work",
                "It changes the recurrence into a closed-form formula",
                "It removes the need for the base cases $F(0)$ and $F(1)$"
              ],
              "answer": 1,
              "explain": "The exponential blowup comes from recomputing identical subproblems, so caching each of the $n+1$ distinct values once collapses the cost to $O(n)$."
            },
            {
              "q": "A problem has optimal substructure but its recursion splits into completely disjoint, non-repeating subproblems (no overlap). Which technique does the lesson say fits best?",
              "choices": [
                "Dynamic programming",
                "Divide-and-conquer",
                "Greedy",
                "Branch-and-bound"
              ],
              "answer": 1,
              "explain": "DP is the intersection of optimal substructure AND overlapping subproblems; with optimal substructure but no overlap (e.g., mergesort), plain divide-and-conquer suffices."
            },
            {
              "q": "According to the lesson, the central engineering trade-off that dynamic programming makes is best described as:",
              "choices": [
                "Trading accuracy for speed",
                "Trading memory for time — using extra storage to avoid recomputation and turn exponential time into polynomial time",
                "Trading code simplicity for parallelism",
                "Trading optimality for a faster approximate answer"
              ],
              "answer": 1,
              "explain": "DP spends memory (a cache or table) to store each subproblem's answer once, converting exponential-time recursion into polynomial-time computation."
            },
            {
              "q": "The lesson notes the word 'programming' in 'dynamic programming' is historically misleading. What did Bellman actually mean by it?",
              "choices": [
                "Writing computer code",
                "Tabulation or planning, not coding",
                "Programming language design",
                "Linear constraint solving"
              ],
              "answer": 1,
              "explain": "Bellman used 'programming' in the sense of tabulation/planning (and partly because it sounded impressive to funders), not in the sense of writing software."
            },
            {
              "q": "You compute longest-common-subsequence lengths in a 2D table $dp[i][j]$ filling rows top-to-bottom, left-to-right. To reduce memory to $O(\\min(m,n))$ using two rolling rows, what is the essential requirement that makes this valid?",
              "choices": [
                "The recurrence for $dp[i][j]$ depends only on entries in the current and previous row (and the current row to the left), so all earlier rows are never read again",
                "The table must be symmetric, $dp[i][j]=dp[j][i]$, so half the entries can be discarded",
                "Each cell depends on the diagonal $dp[i-1][j-1]$ only, so a single 1D array suffices with no overwrite hazard",
                "LCS has no overlapping subproblems beyond two rows, so the rest of the table is wasted space"
              ],
              "answer": 0,
              "explain": "Rolling-array compression is valid exactly when a cell's dependencies are confined to a bounded window of recent rows; LCS reads only row $i-1$ and the current row, so older rows can be dropped. The table is not symmetric in general, and the recurrence depends on left and up cells too (not the diagonal alone)."
            },
            {
              "q": "A student claims any recursive function can be sped up to polynomial time just by adding memoization. Which problem best refutes this claim?",
              "choices": [
                "Computing the $n$-th Fibonacci number, where memoization gives $O(n)$",
                "Enumerating all $n!$ permutations of a list, where the 'subproblems' (each distinct permutation) never recur",
                "0/1 knapsack, which memoization reduces to $O(nW)$",
                "Matrix-chain multiplication, which memoization reduces to $O(n^3)$"
              ],
              "answer": 1,
              "explain": "Memoization only helps when subproblems overlap and are few; generating all $n!$ permutations has $n!$ distinct outputs with no repetition, so caching saves nothing and the cost stays factorial. Fibonacci, knapsack, and matrix-chain all have polynomially-many overlapping subproblems, which is why memoization works for them."
            },
            {
              "q": "For coins $\\{1,2,5\\}$ and amount $A=11$, you fill $dp[a]=\\min_i\\big(dp[a-c_i]+1\\big)$ for $a=0\\dots 11$ with $dp[0]=0$. What is $dp[11]$ (minimum number of coins)?",
              "choices": [
                "2",
                "4",
                "3",
                "5"
              ],
              "answer": 2,
              "explain": "The optimum is $5+5+1=3$ coins, so $dp[11]=3$. The DP confirms this by combining $dp[6]=2$ (i.e. $5+1$) with one more coin, never beating the $5+5+1$ decomposition."
            },
            {
              "q": "In a tabulated (bottom-up) DP, what determines a correct order in which to fill the table?",
              "choices": [
                "Always smallest index to largest index, since DP tables are filled in increasing order by definition",
                "Any order works, because each cell stores its own answer independently of the others",
                "A topological order of the subproblem dependency graph, so every cell is computed only after all subproblems it reads from are already filled",
                "Reverse order of the recursion's call stack, regardless of which cells each entry depends on"
              ],
              "answer": 2,
              "explain": "Bottom-up filling is valid precisely when each entry is computed after everything it depends on, i.e. in a topological order of the dependency DAG. Plain increasing-index order only works when dependencies happen to point to smaller indices, and 'any order' fails because cells reference each other."
            },
            {
              "q": "Which two properties make a problem a good fit for dynamic programming?",
              "choices": [
                "Convexity and continuity",
                "The greedy-choice property and optimal substructure",
                "Divide and combine steps",
                "Optimal substructure and overlapping subproblems"
              ],
              "answer": 3,
              "explain": "DP pays off when a problem has <strong>optimal substructure</strong> (optimal solutions built from optimal sub-solutions) AND <strong>overlapping subproblems</strong> (the same sub-solutions are needed repeatedly) — so caching each once avoids exponential recomputation. With <em>non</em>-overlapping subproblems you'd just use divide-and-conquer."
            },
            {
              "q": "What is the difference between memoization and tabulation in dynamic programming?",
              "choices": [
                "They are exactly the same technique",
                "Memoization is top-down (recursion + a cache); tabulation is bottom-up (fill a table iteratively)",
                "Memoization is asymptotically faster",
                "Tabulation uses recursion; memoization does not"
              ],
              "answer": 1,
              "explain": "Both store each subproblem's answer once. Memoization keeps the natural recursion and caches results as they're computed (top-down, lazy); tabulation iterates subproblems from smallest to largest, filling a table (bottom-up, eager). Same asymptotics — different control flow."
            },
            {
              "q": "In the longest-common-subsequence DP, when the current characters of the two strings <em>match</em>, the recurrence is $dp[i][j] = $",
              "choices": [
                "$dp[i-1][j-1]$",
                "$\\max(dp[i-1][j],\\, dp[i][j-1])$",
                "$dp[i-1][j-1] + 1$",
                "$0$"
              ],
              "answer": 2,
              "explain": "A match extends the best LCS of the two shorter prefixes by one character, so $dp[i][j]=dp[i-1][j-1]+1$. When the characters <em>differ</em>, you instead take $\\max(dp[i-1][j], dp[i][j-1])$ — drop one character from one string or the other."
            },
            {
              "q": "What distinguishes dynamic programming from plain divide-and-conquer?",
              "choices": [
                "In DP the subproblems overlap (the same ones recur), so it caches them; in divide-and-conquer they're independent",
                "DP never uses recursion",
                "Divide-and-conquer is always asymptotically faster",
                "They are the same technique under different names"
              ],
              "answer": 0,
              "explain": "Both break a problem into subproblems, but divide-and-conquer's subproblems are <em>disjoint</em> (e.g. merge sort's two halves), so there's nothing to reuse. DP's subproblems <em>overlap</em>, so solving each once and caching it turns exponential work into polynomial."
            }
          ],
          "flashcards": [
            {
              "front": "What two properties must a problem have for dynamic programming to apply?",
              "back": "Optimal substructure (an optimal solution is composed of optimal solutions to subproblems) AND overlapping subproblems (the same subproblem is solved repeatedly, so caching pays off)."
            },
            {
              "front": "Memoization vs tabulation: define each and their relationship.",
              "back": "Memoization = top-down recursion with a cache, computing only reachable states lazily. Tabulation = bottom-up iterative table fill in topological order. They are duals evaluating the same subproblem DAG; tabulation avoids recursion overhead and enables space tricks, memoization is easier to write and skips unneeded states."
            },
            {
              "front": "0/1 knapsack recurrence (state $dp[i][c]$ = best value using first $i$ items, capacity $c$).",
              "back": "$dp[i][c] = dp[i-1][c]$ if $w_i > c$; else $\\max(dp[i-1][c],\\; dp[i-1][c-w_i] + v_i)$. Base $dp[0][c]=0$. Answer $dp[n][W]$, time $O(nW)$."
            },
            {
              "front": "LCS recurrence for $dp[i][j]$ (LCS length of prefixes $X[1..i]$, $Y[1..j]$).",
              "back": "If $x_i = y_j$: $dp[i][j] = dp[i-1][j-1]+1$. Else $dp[i][j] = \\max(dp[i-1][j], dp[i][j-1])$. Base row/col $=0$. Answer $dp[m][n]$."
            },
            {
              "front": "Edit distance recurrence for $dp[i][j]$ (Levenshtein).",
              "back": "$dp[i][0]=i$, $dp[0][j]=j$. If $x_i=y_j$: $dp[i][j]=dp[i-1][j-1]$. Else $1+\\min(dp[i-1][j]\\,(\\text{delete}),\\; dp[i][j-1]\\,(\\text{insert}),\\; dp[i-1][j-1]\\,(\\text{substitute}))$."
            },
            {
              "front": "How do you reconstruct the chosen items in knapsack when you stored only the value table?",
              "back": "Walk back from $dp[n][W]$. At $dp[i][c]$, if $dp[i][c] \\ne dp[i-1][c]$ then item $i$ was taken: record it and go to $dp[i-1][c-w_i]$; otherwise go to $dp[i-1][c]$. Compare each cell to the value it would have had without the choice."
            }
          ],
          "homework": [
            {
              "prompt": "Coin change, minimum coins. Coins $\\{1,3,4\\}$, target $A=6$. (a) Define the state. (b) Fill the 1D table $dp[0..6]$ by hand. (c) Give the optimal coin multiset. (d) Briefly: which loop ordering would you use to instead count the number of distinct combinations summing to 6?",
              "hint": "State $dp[a]$ = min coins for amount $a$, with $dp[0]=0$. Transition $dp[a]=1+\\min_{c_j\\le a} dp[a-c_j]$. For counting combinations, put the coin loop OUTER and amount loop inner so each coin is considered once per amount in a fixed order.",
              "solution": "(a) $dp[a]$ = minimum number of coins to make amount $a$; $dp[0]=0$, others $+\\infty$ initially. (b) dp[0]=0; dp[1]=1+dp[0]=1; dp[2]=1+dp[1]=2; dp[3]=min(1+dp[2]=3, 1+dp[0]=1)=1; dp[4]=min(1+dp[3]=2, 1+dp[1]=2, 1+dp[0]=1)=1; dp[5]=min(1+dp[4]=2, 1+dp[2]=3, 1+dp[1]=2)=2; dp[6]=min(1+dp[5]=3, 1+dp[3]=2, 1+dp[2]=3)=2. Table: [0,1,2,1,1,2,2]. (c) $dp[6]=2$, achieved via the minimizer $1+dp[3]$, i.e. coin 3 plus the optimal way to make 3 (which is a single 3). Optimal multiset = {3,3}. (d) To count distinct combinations, loop coins on the OUTER loop and amounts on the inner loop (each coin processed once), accumulating $ways[a] {+}{=} ways[a-c]$; amount-outer/coin-inner would count ordered permutations instead."
            },
            {
              "prompt": "Compute the edit distance between $X=$ 'sunday' and $Y=$ 'saturday'. Fill the DP table and then reconstruct one optimal sequence of edit operations.",
              "hint": "Build a 7x9 table ($|X|+1=7$ rows, $|Y|+1=9$ cols) with $dp[i][0]=i$, $dp[0][j]=j$. Diagonal move is free when characters match, else $1+\\min$ of the three neighbors. Reconstruct by tracing which neighbor achieved each cell from $dp[6][8]$ back to $dp[0][0]$.",
              "solution": "The edit distance is 3. Backtracing the table from $dp[6][8]$ gives one optimal edit sequence: keep 's', insert 'a', insert 't', keep 'u', substitute 'n'->'r', keep 'd', keep 'a', keep 'y'. That is 2 insertions ('a','t') plus 1 substitution ('n'->'r') = 3 operations, turning 'sunday' into 'saturday'. The DP table's bottom-right cell $dp[6][8]=3$ confirms the minimum."
            },
            {
              "prompt": "Longest Common Subsequence. For $X=$ 'ABCBDAB' and $Y=$ 'BDCAB', (a) state the recurrence, (b) compute the LCS length, and (c) give one actual LCS string via backpointer reconstruction.",
              "hint": "$dp[i][j]=dp[i-1][j-1]+1$ on a match, else $\\max(dp[i-1][j], dp[i][j-1])$. After filling, start at $dp[m][n]$; on a match step diagonally and emit the character, otherwise move to the larger of the up/left neighbors.",
              "solution": "(a) $dp[i][j]=0$ if $i=0$ or $j=0$; $=dp[i-1][j-1]+1$ if $x_i=y_j$; else $\\max(dp[i-1][j], dp[i][j-1])$. (b) Filling the 8x6 table gives $dp[7][5]=4$, so LCS length = 4. (c) Reconstructing from $dp[7][5]$ yields the subsequence 'BCAB' (length 4), which is a subsequence of both X='ABCBDAB' and Y='BDCAB'. Another valid LCS is 'BDAB'; any correct length-4 common subsequence earns full credit."
            }
          ],
          "examples": [
            {
              "title": "Fibonacci, bottom-up",
              "body": "Use bottom-up DP to compute $F_6$, and state the time and space complexity.",
              "solution": "Start $dp=[0,1]$ and apply $dp[i]=dp[i-1]+dp[i-2]$: $0,1,1,2,3,5,8$, so $F_6=8$. Each of the $n$ entries is computed once, so it is $O(n)$ time. Keeping only the last two values makes it $O(1)$ space."
            },
            {
              "title": "Coin change (fewest coins)",
              "body": "With coins $\\{1,3,4\\}$, what is the minimum number of coins to make 6?",
              "solution": "Let $dp[a]=1+\\min_{c}dp[a-c]$. Then $dp[0..6]=0,1,2,1,1,2,2$. For $a=6$: $1+\\min(dp[5],dp[3],dp[2])=1+\\min(2,1,2)=2$ — e.g. $3+3$. Answer: 2 coins. (Greedy '4 then 1+1' would give 3, which is why DP is needed.)"
            }
          ]
        },
        {
          "id": "a-backtracking-branch-bound",
          "title": "Backtracking and Branch-and-Bound",
          "minutes": 14,
          "content": "<h3>The problem: searching an exponential space without drowning in it</h3>\n<p>Many of the hardest problems in computing share a structure: you must build a solution out of a sequence of choices, the number of complete candidate solutions is exponential, and yet most of those candidates are obviously hopeless. Think of placing 8 queens on a chessboard. There are $\\binom{64}{8} \\approx 4.4 \\times 10^9$ ways to drop 8 queens onto 64 squares, but the moment two queens share a row you can stop considering every arrangement that contains that pair. <strong>Backtracking</strong> and <strong>branch-and-bound</strong> are the two canonical disciplines for exploiting exactly this: search the space as a tree, and aggressively <em>prune</em> subtrees that cannot contain a valid (or optimal) solution.</p>\n<p>The mental model is a single rooted tree, the <strong>state-space tree</strong>. The root is the empty partial solution. Each edge extends a partial solution by one decision (place a queen in column 3 of the next row; include item 5 in the subset; assign value <code>R</code> to variable $x_7$). A leaf is a complete candidate. The naive algorithm — brute force — visits every leaf. Backtracking and branch-and-bound visit only the nodes they cannot rule out, and the entire art is in <em>ruling out as much as possible, as early as possible</em>.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Brute force enumerates leaves; backtracking enumerates <em>nodes</em> and abandons whole subtrees. Because a single cut near the root can erase an exponential number of leaves, the savings are not incremental — they can change the practical feasibility of a problem from \"never finishes\" to \"milliseconds.\"</p>\n</div>\n\n<h3>Backtracking: depth-first search with feasibility pruning</h3>\n<p>Backtracking is depth-first traversal of the state-space tree, augmented with a test that asks, at each partial solution, \"can this partial solution possibly be extended to a complete valid one?\" If the answer is provably no, we do not recurse — we <strong>backtrack</strong> (undo the last choice and try the next). The pruning test is called a <strong>feasibility check</strong> or <strong>constraint check</strong>, and it must be <em>sound</em>: it may only reject partial solutions that genuinely cannot lead to any valid completion. (It is allowed to be incomplete — it can let some doomed nodes through — but every node it kills must truly be dead.)</p>\n\n<h4>The universal template</h4>\n<p>Almost every backtracking solution is an instance of this single recursive shape. Internalize it; the rest is filling in three problem-specific hooks: <code>is_complete</code>, <code>candidates</code>, and <code>is_feasible</code> (the prune).</p>\n<pre><code>def backtrack(state, solutions):\n    if is_complete(state):              # reached a leaf / valid full solution\n        solutions.append(copy(state))\n        return                          # (or `return True` for \"find one\")\n\n    for choice in candidates(state):    # branch: each child of this node\n        if not is_feasible(state, choice):\n            continue                    # PRUNE: skip this subtree entirely\n        apply(state, choice)            # make the move (extend partial solution)\n        backtrack(state, solutions)     # recurse into the subtree\n        undo(state, choice)            # un-make the move (this is the \"back\")\n</code></pre>\n<p>Two structural points carry most of the performance. First, the <code>continue</code> on a failed feasibility check skips not just one node but the <em>entire subtree</em> rooted at it. Second, <code>apply</code>/<code>undo</code> let us mutate a single shared state in place instead of copying it at every node — important when the state is large. The <code>undo</code> is what makes it \"backtracking\": after exploring a branch we restore the world to exactly what it was before, then try the sibling.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>The earlier and cheaper your feasibility check, the more it prunes. Pushing a constraint test from the leaf up to a shallow internal node converts it from rejecting one candidate to rejecting an exponential family of candidates. This is the single most important lever in backtracking design.</p>\n</div>\n\n<h4>Worked example: N-Queens</h4>\n<p>Place $N$ non-attacking queens on an $N \\times N$ board. The crucial modeling insight prunes before we even write a constraint: <em>exactly one queen per row</em>. We decide row by row, so the partial solution is an array <code>col[0..r-1]</code> giving the column of the queen in each already-filled row. A queen in row $r$ at column $c$ attacks an earlier queen at row $r'$, column $c'$ iff $c = c'$ (same column) or $|r - r'| = |c - c'|$ (same diagonal). That is the entire feasibility predicate.</p>\n<pre><code>def solve_n_queens(N):\n    col = [-1] * N\n    solutions = []\n\n    def safe(r, c):\n        for r2 in range(r):                 # check against rows already placed\n            c2 = col[r2]\n            if c2 == c:                      # same column\n                return False\n            if abs(r - r2) == abs(c - c2):   # same diagonal\n                return False\n        return True\n\n    def backtrack(r):\n        if r == N:                           # placed a queen in every row\n            solutions.append(col[:])\n            return\n        for c in range(N):                   # candidates = columns 0..N-1\n            if safe(r, c):                   # PRUNE the unsafe columns\n                col[r] = c\n                backtrack(r + 1)\n                col[r] = -1                  # undo\n    backtrack(0)\n    return solutions\n</code></pre>\n<p>Why this wins: brute force over $\\binom{N^2}{N}$ placements is hopeless, but even the smarter \"one per row\" enumeration has $N^N$ leaves. The diagonal/column prune typically kills a partial assignment within the first two or three rows, so the realized tree is vastly smaller. For $N = 8$ the full one-per-row tree has $8^8 = 16{,}777{,}216$ leaves; backtracking explores only about 2{,}057 nodes to enumerate all 92 solutions — a reduction of roughly four orders of magnitude. You can sharpen the constant further by maintaining three boolean sets (used columns, used \"$r-c$\" diagonals, used \"$r+c$\" anti-diagonals) so <code>safe</code> becomes $O(1)$ instead of $O(r)$; this does not change which nodes are visited, only the cost per node.</p>\n\n<h4>Subsets and permutations: the two canonical shapes</h4>\n<p>A great many backtracking problems reduce to enumerating subsets or permutations, and each has a clean idiomatic tree.</p>\n<ul>\n<li><strong>Subsets / combinations</strong> — at each index, branch on \"include\" vs \"exclude,\" or iterate a <code>start</code> index forward so you never revisit earlier elements (this avoids generating the same subset in different orders). The tree has $2^n$ leaves.</li>\n<li><strong>Permutations</strong> — at each position, branch over the unused elements (track a <code>used[]</code> bitmask or set). The tree has $n!$ leaves.</li>\n</ul>\n<pre><code># Combinations of size k from [0..n-1], in increasing order (no duplicates by construction)\ndef combinations(n, k):\n    out, cur = [], []\n    def bt(start):\n        if len(cur) == k:\n            out.append(cur[:]); return\n        # PRUNE: stop if not enough elements remain to reach size k\n        for i in range(start, n - (k - len(cur)) + 1):\n            cur.append(i)\n            bt(i + 1)\n            cur.pop()\n    bt(0)\n    return out\n</code></pre>\n<p>Note the loop bound <code>n - (k - len(cur)) + 1</code>: it is a feasibility prune in disguise. If fewer than $k - |cur|$ elements remain, no completion can reach size $k$, so we never enter those branches. This is the same principle as N-Queens — encode the constraint into where you branch, not just into a post-hoc test.</p>\n\n<h3>Backtracking as constraint satisfaction (CSP)</h3>\n<p>Generalize: a <strong>constraint satisfaction problem</strong> is variables $X_1, \\dots, X_n$, each with a domain $D_i$, and constraints over subsets of variables; a solution assigns each variable a value from its domain so that all constraints hold. Sudoku, graph coloring, N-Queens, and scheduling are all CSPs. Backtracking is the workhorse solver, and decades of AI research gave us heuristics that shrink the tree dramatically without changing the answer:</p>\n<ul>\n<li><strong>Variable ordering — Minimum Remaining Values (MRV):</strong> always assign next the variable with the fewest legal values left. This \"fail-first\" rule pushes dead ends near the root, where pruning is most valuable.</li>\n<li><strong>Value ordering — Least Constraining Value:</strong> try the value that rules out the fewest choices for neighbors, keeping options open for a solution.</li>\n<li><strong>Constraint propagation — forward checking / arc consistency (AC-3):</strong> after each assignment, propagate its effect by deleting now-impossible values from other variables' domains. If any domain becomes empty, backtrack immediately. This is a <em>look-ahead</em> prune: it detects failure before you ever branch into it.</li>\n</ul>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Connection to AI / ML</div>\n<p>The DPLL algorithm at the heart of every modern SAT solver is backtracking over boolean variables with two superpowered propagation rules (unit propagation and conflict-driven clause learning). Classical AI search — including how a solver verifies a plan or a verifier checks a proof — is backtracking with smart heuristics. And the deeper idea (commit to a choice, look ahead, and abandon doomed paths early) reappears in beam search for sequence decoding and in Monte Carlo Tree Search, where a learned value network plays exactly the role of a bounding function to decide which branches deserve exploration.</p>\n</div>\n\n<h3>Branch-and-bound: pruning for optimization</h3>\n<p>Backtracking answers <em>feasibility</em> (\"is there a valid assignment?\"). <strong>Branch-and-bound (B&B)</strong> answers <em>optimization</em> (\"what is the best valid assignment?\") and adds a second, more powerful kind of pruning. We keep track of the best complete solution found so far — the <strong>incumbent</strong>, with objective value $B$ (for a maximization problem, the best lower bound on the optimum we can certify). At every partial solution we compute a <strong>bound</strong>: an optimistic estimate of the best objective achievable by any completion of this node. If that optimistic estimate is no better than the incumbent, the whole subtree is useless and we prune it.</p>\n<p>Formally, for a maximization problem let $f(\\text{leaf})$ be the objective and, for an internal node $v$, let $\\mathrm{ub}(v)$ be an <strong>upper bound</strong> satisfying</p>\n$$\\mathrm{ub}(v) \\;\\ge\\; \\max_{\\ell \\,\\in\\, \\text{leaves below } v} f(\\ell).$$\n<p>The bound must be <em>valid</em> (never under-estimate the true best in the subtree) — this is the optimization analogue of a sound feasibility check. The prune rule is then:</p>\n$$\\text{if } \\mathrm{ub}(v) \\le B \\text{ (the incumbent), discard the subtree at } v.$$\n<p>For minimization, flip the inequalities: maintain a lower bound on each subtree's best and prune when that lower bound is $\\ge$ the incumbent. Either way, B&B is provably correct — it returns the true optimum — because it only discards subtrees that cannot beat a solution we already have in hand.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>A B&B bound is a <em>relaxation</em>: solve an easier version of the subproblem to get an optimistic value. The classic example is integer programming, where you relax \"variables must be integers\" to \"variables may be fractional,\" solve the resulting linear program in polynomial time, and use its optimum as the bound. Tighter relaxations prune more. This relaxation-and-bound pattern is one of the most reused ideas in all of optimization.</p>\n</div>\n\n<h4>The two extra knobs B&B adds over backtracking</h4>\n<ul>\n<li><strong>Bounding function.</strong> Quality is everything: a bound close to the true optimum prunes aggressively; a loose bound prunes nothing and you degrade to brute force. There is a tension — tighter bounds cost more to compute per node.</li>\n<li><strong>Node selection order.</strong> Backtracking is rigidly depth-first. B&B can use a priority queue and expand the node with the best bound first (<strong>best-first search</strong>), which tends to find a strong incumbent quickly and so enables more pruning — at the cost of storing many open nodes in memory. Depth-first B&B uses little memory and finds <em>some</em> incumbent fast; best-first converges in fewer nodes but can blow up memory. Hybrids are common.</li>\n</ul>\n\n<h4>Worked example: 0/1 Knapsack via branch-and-bound</h4>\n<p>We have $n$ items with values $v_i$ and weights $w_i$, and a capacity $W$; choose a subset maximizing total value subject to total weight $\\le W$. The state-space tree branches at each item on take / don't-take ($2^n$ leaves). The magic is the bound. <strong>Sort items by value density $v_i / w_i$ descending.</strong> At a node where we have committed some items, compute the bound by <em>greedily fractionally</em> filling the remaining capacity with the not-yet-decided items in density order, allowing the last item to be split:</p>\n<pre><code>bound(node):\n    profit = value already committed\n    weight = weight already committed\n    for each remaining item i in descending density order:\n        if weight + w[i] <= W:          # take it whole\n            weight += w[i];  profit += v[i]\n        else:                            # take a FRACTION to fill capacity\n            profit += v[i] * (W - weight) / w[i]\n            break\n    return profit                        # an optimistic (upper) bound\n</code></pre>\n<p>This is the optimal solution to the <em>fractional</em> knapsack, which is a relaxation of the 0/1 problem, so it is a valid upper bound on any completion. Run B&B: maintain the best feasible (integer) value seen as the incumbent $B$; at each node compute <code>bound(node)</code>, and if <code>bound(node) <= B</code>, prune. Concretely, suppose at some node the fractional bound is 235 and we already have an incumbent worth 240 — every completion of that node is capped at 235, so we delete the subtree without ever exploring its $2^k$ leaves. In practice this turns the $2^n$ tree into something that finishes for $n$ in the hundreds, where naive enumeration of $2^{200}$ leaves is physically impossible.</p>\n\n<h3>Estimating the savings: how much does pruning buy you?</h3>\n<p>Make the comparison concrete. Brute force visits all $L$ leaves. Backtracking / B&B visit some number of nodes $N_{\\text{visited}}$. The speedup is roughly $L / N_{\\text{visited}}$, and because a prune at depth $d$ in a branching-factor-$b$ tree removes about $b^{(\\text{height} - d)}$ leaves, <em>shallow prunes dominate the savings</em>.</p>\n<p>A clean way to reason about it: the <strong>effective branching factor</strong> $b_{\\text{eff}}$ is defined so that $b_{\\text{eff}}^{\\,h} \\approx N_{\\text{visited}}$ for tree height $h$. If unpruned branching is $b$ and pruning multiplies the surviving children at each node by a survival fraction $s$ (so on average $s\\cdot b$ children survive the feasibility check), then to first approximation</p>\n$$N_{\\text{visited}} \\;\\approx\\; \\sum_{d=0}^{h} (s\\,b)^{d} \\;=\\; \\frac{(s b)^{h+1} - 1}{s b - 1}, \\qquad b_{\\text{eff}} \\approx s\\,b.$$\n<p>So pruning does not subtract from the exponent — it scales the <em>base</em>. Cutting the effective branching factor from $b$ to $sb$ improves runtime by a factor of about $(1/s)^{h}$, which is itself exponential in the depth. That is why even a modest per-node survival rate ($s = 0.5$, say) is transformative on a deep tree, and why a tighter bound (lower $s$) is worth a lot of per-node computation. For N-Queens above, $b = N$ but the diagonal constraints drive $s$ low enough that $b_{\\text{eff}}$ is small and nearly constant in practice.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Don't measure pruning by \"how many candidates did I skip at the leaves.\" Measure it by \"how far up the tree did I cut, and what was the branching factor below that cut.\" One cut at depth 2 of an $N=12$ board can erase more work than a million cuts at the leaves.</p>\n</div>\n\n<h3>When to reach for which — and the limits</h3>\n<ul>\n<li><strong>Use backtracking</strong> for feasibility / enumeration over a constrained discrete space: CSPs, generating all subsets/permutations satisfying constraints, puzzle solvers, parsing with choice points.</li>\n<li><strong>Use branch-and-bound</strong> for exact optimization over the same kind of space: knapsack, TSP, integer programming, assignment problems — whenever you can design a cheap, valid relaxation to bound subtrees.</li>\n<li><strong>Reality check:</strong> both are exponential in the worst case — they solve NP-hard problems, after all. Their value is empirical: on real instances, good pruning makes the realized tree small. There is no guarantee; a poorly chosen bound or variable order can leave you back at brute force. Profiling the realized node count, not the theoretical leaf count, is how you know whether your pruning is actually working.</li>\n</ul>\n<p>Finally, note the shared anatomy. Strip away the labels and backtracking and branch-and-bound are <em>the same algorithm</em>: depth-first (or best-first) traversal of a decision tree, with a predicate at each node that decides \"is this subtree worth entering?\" Backtracking's predicate is a hard feasibility test; B&B's is \"could the best thing in here beat what I already have?\" Both are special cases of the broader idea of <em>informed tree search with pruning</em> — the same idea that, with a learned heuristic in place of a hand-built bound, powers game-playing agents and modern search-based AI.",
          "mcq": [
            {
              "q": "In a backtracking search over a tree with branching factor $b$ and height $h$, where is a prune most valuable?",
              "choices": [
                "At the leaves, because that is where complete candidates are tested",
                "As deep as possible, to avoid wasting the undo step",
                "As shallow (near the root) as possible, because it removes an entire subtree of roughly $b^{(h-d)}$ leaves",
                "It does not matter where you prune; total savings are the same"
              ],
              "answer": 2,
              "explain": "A prune at depth $d$ eliminates the whole subtree below it, about $b^{(h-d)}$ leaves, so shallow prunes erase exponentially more work than leaf-level rejections."
            },
            {
              "q": "For a maximization problem, branch-and-bound prunes the subtree at node $v$ when:",
              "choices": [
                "The upper bound $\\mathrm{ub}(v)$ is less than or equal to the incumbent value $B$",
                "The upper bound $\\mathrm{ub}(v)$ is greater than the incumbent value $B$",
                "The partial solution at $v$ violates a hard constraint",
                "The node $v$ is a leaf"
              ],
              "answer": 0,
              "explain": "$\\mathrm{ub}(v)$ optimistically over-estimates the best completion below $v$; if even that optimistic value cannot beat the incumbent $B$, no completion can, so the subtree is safely discarded."
            },
            {
              "q": "Why is the fractional (greedy, density-ordered) knapsack value a valid upper bound for a node in 0/1-knapsack branch-and-bound?",
              "choices": [
                "Because it equals the optimal 0/1 solution for that subtree",
                "Because the fractional problem is a relaxation, so its optimum is at least as large as any integer completion",
                "Because greedy is always optimal for 0/1 knapsack",
                "Because it ignores the capacity constraint entirely"
              ],
              "answer": 1,
              "explain": "Allowing fractional items enlarges the feasible set (a relaxation), so the relaxed optimum can only be greater than or equal to the best integer solution below the node, making it a valid optimistic bound."
            },
            {
              "q": "What does the Minimum Remaining Values (MRV) heuristic do in a CSP backtracking solver, and why does it help?",
              "choices": [
                "Picks the variable with the most legal values, to keep the search broad",
                "Picks the value that constrains neighbors least, to find solutions faster",
                "Picks the variable with the fewest legal values left, to 'fail first' and push dead ends near the root",
                "Randomizes variable order to avoid worst-case behavior"
              ],
              "answer": 2,
              "explain": "MRV is a fail-first rule: assigning the most-constrained variable first surfaces contradictions high in the tree, where pruning eliminates the most subtree work."
            },
            {
              "q": "The lesson stresses that a backtracking feasibility check must be *sound*. What does soundness require?",
              "choices": [
                "It must reject every partial solution that cannot be completed (no doomed node survives)",
                "It may only reject partial solutions that genuinely cannot lead to any valid completion",
                "It must run in constant time at every node of the state-space tree",
                "It must always return the optimal completion of any partial solution it accepts"
              ],
              "answer": 1,
              "explain": "Soundness means the check only kills truly dead nodes; it is allowed to be incomplete (let some doomed nodes through), but it must never prune a node that could still be completed. Choice 0 describes completeness, not soundness."
            },
            {
              "q": "Why does the lesson claim that pruning can change a problem from 'never finishes' to 'milliseconds', rather than giving only a constant-factor speedup?",
              "choices": [
                "Because a single cut near the root removes an exponential number of leaves at once",
                "Because depth-first search uses less memory than breadth-first search",
                "Because the feasibility check converts the tree into a balanced binary tree",
                "Because each pruned node is replaced by a constant amount of cached work"
              ],
              "answer": 0,
              "explain": "A subtree rooted near the top contains exponentially many leaves, so cutting it eliminates an exponential amount of work in one decision, making the savings non-incremental rather than a constant factor."
            },
            {
              "q": "A queens-placement search rejects a partial board the instant two placed queens share a row. In the state-space-tree framework, this rejection is best described as:",
              "choices": [
                "Computing an optimistic upper bound on the objective",
                "A feasibility (constraint) check that prunes a subtree before recursing",
                "Reaching a leaf and recording a complete candidate",
                "The combine step of a divide-and-conquer recurrence"
              ],
              "answer": 1,
              "explain": "Detecting an outright constraint violation in a partial solution is exactly the sound feasibility check that lets backtracking abandon the whole subtree without descending into it."
            },
            {
              "q": "Brute force and backtracking traverse the same state-space tree. What is the essential difference in what they visit?",
              "choices": [
                "Brute force visits every node; backtracking visits only the leaves",
                "Brute force enumerates every leaf; backtracking enumerates nodes and abandons whole subtrees it can rule out",
                "Brute force is depth-first while backtracking is necessarily breadth-first",
                "Brute force prunes with a bound while backtracking never prunes at all"
              ],
              "answer": 1,
              "explain": "Brute force visits all leaves (complete candidates), whereas backtracking works node by node and skips entire subtrees once a partial solution is shown to be hopeless."
            },
            {
              "q": "In 0/1-knapsack branch-and-bound, two valid upper-bound functions are available at each node: bound $A$ is the *fractional* (greedy, density-ordered) relaxation, and bound $B$ simply sums the values of all remaining unselected items regardless of capacity. Both are admissible upper bounds. Which is the better choice for pruning, and why?",
              "choices": [
                "Bound $B$, because summing all remaining values is cheaper to compute than running the greedy relaxation",
                "Bound $A$, because a *tighter* (smaller) valid upper bound is at least as likely to fall at or below the incumbent and thus prune at least as many nodes",
                "They prune identically, since both are valid upper bounds for the same subtree",
                "Bound $B$, because a looser upper bound never risks discarding the optimal solution"
              ],
              "answer": 1,
              "explain": "For a maximization problem a node is pruned when its upper bound does not exceed the incumbent; a smaller (tighter) bound crosses that threshold more often, so the fractional bound $A$ dominates the loose sum-of-all bound $B$. Both are sound (neither discards the optimum), so safety does not distinguish them, and cheaper-to-compute does not help if it barely prunes."
            },
            {
              "q": "Consider the 4-queens state-space tree where level $k$ chooses the column for the queen in row $k$. A naive backtracker that only checks column conflicts (not diagonals) would still expand the partial board [row 1 -> col 1, row 2 -> col 2]. Why does a *correct* backtracker prune this node immediately?",
              "choices": [
                "Because columns 1 and 2 are adjacent, which always wastes board space",
                "Because the two queens lie on the same diagonal (|1-2| = |1-2|), violating feasibility, so the entire subtree below this node can be cut",
                "Because no solution to 4-queens ever places a queen in column 1",
                "Because the partial board is already a leaf and must be a complete failed candidate"
              ],
              "answer": 1,
              "explain": "Queens at (1,1) and (2,2) satisfy $|r_i-r_j| = |c_i-c_j|$, so they share a diagonal and the partial board is infeasible; pruning here removes every completion of this two-queen prefix. The node is at level 2, not a leaf, and column 1 does appear in valid 4-queens solutions, so the other options are false."
            },
            {
              "q": "A student claims: \"Backtracking and dynamic programming both prune work, so they are essentially the same technique with different names.\" What is the key conceptual error?",
              "choices": [
                "DP prunes by reusing solutions to *overlapping subproblems* (memoization), whereas backtracking prunes by discarding subtrees that *cannot* yield a feasible/optimal solution; these are different mechanisms",
                "Backtracking is always exponential while DP is always polynomial, so they can never solve the same problem",
                "DP never builds solutions incrementally, whereas backtracking always does",
                "Backtracking explores a tree and DP explores a graph, but both visit exactly the same number of states"
              ],
              "answer": 0,
              "explain": "DP saves work by caching and reusing answers to recurring subproblems, while backtracking saves work by feasibility/bound pruning of subtrees it can rule out — distinct ideas, even when both apply. The other claims are false: backtracking can be polynomial when pruning is strong, it builds incrementally just like a DP recurrence, and the two do not visit identical state counts."
            },
            {
              "q": "Best-first branch-and-bound expands the live node with the most promising bound first, while depth-first branch-and-bound dives to a leaf before backtracking. A common belief is that best-first is *strictly* better because it expands fewer nodes. What is the real trade-off the lesson's framework implies?",
              "choices": [
                "Best-first is strictly better in every respect and should always be preferred",
                "Depth-first finds the optimal solution but best-first may return a suboptimal one",
                "Best-first can expand fewer nodes but must store many live nodes (large memory), whereas depth-first reaches a feasible incumbent quickly with little memory, which can then prune aggressively",
                "Depth-first cannot use bounds at all; only best-first supports branch-and-bound pruning"
              ],
              "answer": 2,
              "explain": "Best-first often minimizes node expansions but keeps a priority queue of live nodes whose size can blow up in memory; depth-first uses stack-depth memory and quickly obtains an incumbent that tightens pruning. Both are correct (return the optimum) and both use bounds, so the trade-off is node count versus memory, not correctness."
            },
            {
              "q": "When a backtracking search reaches a partial solution that cannot be extended into any valid complete solution, it…",
              "choices": [
                "undoes the most recent choice and tries the next alternative (it 'backtracks')",
                "restarts the whole search from scratch",
                "accepts the partial solution anyway",
                "switches to brute-force enumeration"
              ],
              "answer": 0,
              "explain": "That retreat is the heart of backtracking: abandon the current dead-end, step back to the last decision point, and try a different option there — exploring the state-space tree depth-first while pruning whole branches that can't work."
            },
            {
              "q": "What does <em>branch and bound</em> add to plain backtracking?",
              "choices": [
                "A greedy choice at every node",
                "A hash table of visited states",
                "A bounding function that prunes any subtree whose best possible solution can't beat the best found so far",
                "Random restarts to escape dead ends"
              ],
              "answer": 2,
              "explain": "Branch and bound is backtracking for <em>optimization</em>: at each node it computes an optimistic bound on the best solution achievable below, and prunes the whole subtree if that bound is no better than the incumbent. Tighter bounds prune more."
            },
            {
              "q": "Backtracking is best suited to which kind of problem?",
              "choices": [
                "Sorting a list of numbers",
                "Constraint-satisfaction and combinatorial-search problems where partial solutions can be checked and extended (puzzles, permutations, N-queens)",
                "Multiplying two matrices",
                "Evaluating a single arithmetic formula"
              ],
              "answer": 1,
              "explain": "Backtracking shines when a solution is built incrementally and partial candidates can be tested for validity early — Sudoku, N-queens, graph colouring, subset/permutation generation. Problems with closed-form or simple iterative solutions don't need it."
            },
            {
              "q": "Adding a good pruning or bounding rule to an exponential backtracking search…",
              "choices": [
                "guarantees the optimal answer in linear time",
                "lowers the worst-case time to polynomial",
                "has no effect on running time",
                "often makes it fast enough in practice, even though the worst case stays exponential"
              ],
              "answer": 3,
              "explain": "Pruning can cut away enormous portions of the search tree, turning 'never finishes' into 'finishes quickly' on typical inputs. But an adversarial input can still force exploring exponentially many nodes — pruning improves the practical case, not the worst-case bound."
            }
          ],
          "flashcards": [
            {
              "front": "The universal backtracking template — what are its three problem-specific hooks?",
              "back": "is_complete(state) (leaf test), candidates(state) (children to branch over), and is_feasible(state, choice) (the prune). The skeleton is: if complete, record; else for each feasible choice: apply, recurse, undo."
            },
            {
              "front": "What makes a feasibility / bounding test 'sound' (valid)?",
              "back": "Backtracking: a feasibility check may only reject partial solutions that genuinely cannot be completed to any valid solution. B&B: a bound must never under-estimate (max) / over-estimate (min) the best achievable in the subtree. Soundness guarantees correctness; the test may be incomplete (let some doomed nodes through)."
            },
            {
              "front": "Backtracking vs. branch-and-bound: the one-line distinction.",
              "back": "Both are pruned tree search. Backtracking prunes with a hard feasibility test (answers 'does a valid solution exist?'). Branch-and-bound prunes with an optimistic bound vs. the best-so-far incumbent (answers 'what is the optimal solution?')."
            },
            {
              "front": "Where does a prune save the most, and how is the effect quantified?",
              "back": "Near the root. A prune at depth $d$ removes about $b^{(h-d)}$ leaves. Pruning scales the base of the exponential: effective branching factor $b_{eff} \\approx s\\cdot b$ where $s$ is the per-node survival fraction, giving roughly $(1/s)^h$ speedup."
            },
            {
              "front": "How do you derive a B&B bound in practice?",
              "back": "Solve a relaxation of the subproblem — an easier version with constraints dropped — and use its optimum as the optimistic bound. E.g., relax integrality to get an LP (integer programming) or allow fractional items (0/1 knapsack). Tighter relaxations prune more but cost more per node."
            },
            {
              "front": "Three classic CSP heuristics that shrink the backtracking tree.",
              "back": "MRV (assign the variable with fewest remaining legal values first — fail-first), Least Constraining Value (try the value that eliminates the fewest neighbor options), and constraint propagation / forward checking / AC-3 (delete now-impossible values and backtrack early if a domain empties)."
            }
          ],
          "homework": [
            {
              "prompt": "Write a backtracking solver for graph 3-coloring: given an undirected graph, assign each vertex one of 3 colors so no edge joins two same-colored vertices. State the candidates, the feasibility prune, and the apply/undo. Then explain how the MRV heuristic would change the search.",
              "hint": "Model it as a CSP: variables = vertices, domain = {0,1,2}, constraint = adjacent vertices differ. Decide vertices in some order; the prune checks already-colored neighbors only.",
              "solution": "Order the vertices v0..v(n-1). State: color[i] for assigned vertices. candidates(v) = {0,1,2}. is_feasible(v, c): for every neighbor u of v that is already colored, c != color[u]. Template:\n\n  def bt(i):\n      if i == n: record(color[:]); return True\n      for c in (0,1,2):\n          if all(color[u] != c for u in adj[i] if assigned(u)):\n              color[i] = c            # apply\n              if bt(i+1): return True\n              color[i] = UNSET       # undo\n      return False\n\nThe feasibility check only compares against already-colored neighbors, so a contradiction (a vertex all of whose colors are taken by neighbors) is caught the moment we reach it, pruning the entire subtree of remaining vertices. MRV improvement: instead of fixed order i, at each step pick the uncolored vertex with the fewest legal colors remaining (compute each uncolored vertex's available colors given its colored neighbors). A vertex with 0 legal colors triggers an immediate backtrack near the root; a vertex with 1 forced color removes branching entirely. This 'fail-first' ordering typically reduces the realized node count by orders of magnitude versus naive order without changing the set of solutions found."
            },
            {
              "prompt": "Consider 0/1 knapsack with capacity $W = 10$ and items (value, weight): A(10,5), B(8,4), C(9,6), D(5,3). Sort by value density, then compute the branch-and-bound upper bound at the ROOT node (nothing decided yet) using the fractional relaxation. Is this bound achievable by an integer solution? What is the actual integer optimum?",
              "hint": "Density v/w: A=2.0, B=2.0, C=1.5, D=1.67. Greedily fill capacity 10, splitting the last item if it doesn't fit wholly. The integer optimum requires checking feasible combinations within W=10.",
              "solution": "Densities: A=10/5=2.0, B=8/4=2.0, D=5/3=1.667, C=9/6=1.5. Sorted order: A, B, D, C (ties broken arbitrarily; put A before B). Fractional bound at root: take A (w=5, value=10, used=5), take B (w=4, value=8, used=9, remaining capacity=1), then D needs weight 3 but only 1 remains, so take fraction 1/3 of D: value += 5 * (1/3) = 1.667. Upper bound = 10 + 8 + 1.667 = 19.667. This is NOT achievable by an integer solution because it includes a fractional item. Integer optimum: try combinations with total weight <= 10. A+B = weight 9, value 18. A+D = weight 8, value 15. A+C = weight 11 (infeasible). B+C = weight 10, value 17. A+B+D = weight 12 (infeasible). B+D = weight 7, value 13; B+D+? nothing else fits in the remaining 3 units of capacity. So the best feasible integer solution is A+B with weight 9, value 18. The root bound 19.667 correctly over-estimates the true optimum 18 — it is a valid (optimistic) upper bound, and the gap 19.667 - 18 reflects the relaxation's looseness."
            }
          ],
          "examples": [
            {
              "title": "Tracing backtracking on 4-Queens",
              "body": "Solve the 4-Queens problem by backtracking: place 4 non-attacking queens on a $4\\times 4$ board, deciding row by row, where for row $r$ we choose a column $c \\in \\{0,1,2,3\\}$ and immediately reject any choice that shares a column or a diagonal with an already-placed queen. Trace the search until you reach the first complete solution.",
              "solution": "We build the partial solution as a list $q = [q_0, q_1, \\dots]$ where $q_r$ is the column of the queen in row $r$. Two queens in rows $r_1, r_2$ attack along a diagonal exactly when $|q_{r_1} - q_{r_2}| = |r_1 - r_2|$. At each node we try columns left-to-right and prune any that violates a constraint.\n\n<strong>Row 0.</strong> Try $c=0$. No prior queens, so accept. State: $q=[0]$.\n\n<strong>Row 1.</strong> Try $c=0$: same column as $q_0$, reject. Try $c=1$: $|1-0|=1=|1-0|$, same diagonal, reject. Try $c=2$: column $2\\neq 0$ and $|2-0|=2\\neq 1$, accept. State: $q=[0,2]$.\n\n<strong>Row 2.</strong> Try $c=0$: column clashes with $q_0$, reject. Try $c=1$: $|1-2|=1=|2-1|$ diagonal with $q_1$, reject. Try $c=2$: column clashes with $q_1$, reject. Try $c=3$: $|3-0|=3\\neq 2$ ok, $|3-2|=1=|2-1|$ diagonal with $q_1$, reject. All columns fail $\\Rightarrow$ <strong>dead end</strong>. Backtrack to row 1.\n\n<strong>Row 1 (resume).</strong> Try $c=3$: column $3\\neq 0$, $|3-0|=3\\neq 1$, accept. State: $q=[0,3]$.\n\n<strong>Row 2.</strong> Try $c=0$: clashes column with $q_0$, reject. Try $c=1$: $1\\neq 0,3$; $|1-0|=1\\neq 2$; $|1-3|=2=|2-1|$? $|2-1|=1\\neq 2$, accept. State: $q=[0,3,1]$.\n\n<strong>Row 3.</strong> Try $c=0,1,3$: each clashes in column with an existing queen $(0,3,1)$. Try $c=2$: columns ok; check diagonals: vs $q_0=0$, $|2-0|=2\\neq 3$; vs $q_1=3$, $|2-3|=1\\neq 2$; vs $q_2=1$, $|2-1|=1=|3-2|$ diagonal, reject. No column works $\\Rightarrow$ dead end. Backtrack to row 2, then row 1 (column 3 exhausted), then row 0.\n\n<strong>Row 0 (resume).</strong> Try $c=1$. Accept. State: $q=[1]$.\n\n<strong>Row 1.</strong> $c=3$ is the first valid choice ($|3-1|=2\\neq 1$). State: $q=[1,3]$.\n\n<strong>Row 2.</strong> $c=0$: $|0-1|=1\\neq 2$, $|0-3|=3\\neq 1$, accept. State: $q=[1,3,0]$.\n\n<strong>Row 3.</strong> $c=2$: columns ok; vs $q_0=1$, $|2-1|=1\\neq 3$; vs $q_1=3$, $|2-3|=1\\neq 2$; vs $q_2=0$, $|2-0|=2\\neq 1$. All pass, accept. State: $q=[1,3,0,2]$ — a complete solution.\n\nThe first solution found is $q=[1,3,0,2]$, i.e. queens at squares $(0,1),(1,3),(2,0),(3,2)$. Notice pruning kept the search tiny: brute force would inspect $4^4=256$ leaf placements (or $4!=24$ permutations), but backtracking explored only a handful of nodes before succeeding."
            },
            {
              "title": "Branch-and-bound for 0/1 Knapsack",
              "body": "Maximize total value in a knapsack of capacity $W=10$ given four items (value, weight): item 1 $(40,2)$, item 2 $(30,5)$, item 3 $(50,10)$, item 4 $(10,5)$. Use branch-and-bound with the LP (fractional) relaxation as an upper bound, deciding items in order of value density and choosing include/exclude at each level.",
              "solution": "<strong>Setup.</strong> Compute value densities $v/w$: item 1 $=20$, item 2 $=6$, item 3 $=5$, item 4 $=2$. The items are already in decreasing density order $1,2,3,4$, which is what makes the LP bound tight. For a node with chosen profit $p$ and used weight $w$, the upper <em>bound</em> is $p$ plus the value from greedily filling the remaining capacity $W-w$ with the not-yet-decided items, allowing a fraction of the last item.\n\n<strong>Root.</strong> Nothing decided, $p=0$, $w=0$, capacity $10$. Greedy fill: take item 1 ($+40$, $w=2$), item 2 ($+30$, $w=7$), then item 3 needs weight $10$ but only $3$ remains, take fraction $3/10$: $+0.3\\cdot 50 = 15$. Bound $=40+30+15=85$. Best-so-far $L = -\\infty$.\n\nWe explore <em>include</em> branches first (depth-first), since high-density items make inclusion promising.\n\n<strong>Node A: include item 1.</strong> $p=40$, $w=2$. Bound: fill remaining $8$ with item 2 ($+30$, $w=7$), item 3 fraction $3/10$: $+15$. Bound $=85$.\n\n<strong>Node B: include items 1,2.</strong> $p=70$, $w=7$. Remaining capacity $3$. Item 3 fraction $3/10\\cdot 50=15$. Bound $=85$.\n\n<strong>Node C: include items 1,2,3.</strong> Weight $=2+5+10=17 > 10$: infeasible, prune.\n\n<strong>Node D: include 1,2; exclude 3.</strong> $p=70$, $w=7$, capacity $3$. Remaining undecided: item 4 ($w=5$) does not fit. Leaf. Feasible value $=70$. Update $L=70$ with solution $\\{1,2\\}$.\n\nBacktrack. At node B both children are done. Backtrack to node A.\n\n<strong>Node E: include 1; exclude 2.</strong> $p=40$, $w=2$, capacity $8$. Bound: item 3 fraction $8/10\\cdot 50=40$ (item 4 worse and would not be reached). Bound $=80 > L=70$, so explore.\n\n<strong>Node F: include 1, exclude 2, include 3.</strong> Weight $=12>10$: infeasible, prune.\n\n<strong>Node G: include 1, exclude 2, exclude 3.</strong> $p=40$, $w=2$, capacity $8$. Item 4 ($v=10,w=5$) fits: include it. Leaf value $=50 < L=70$. No update.\n\nBacktrack to root.\n\n<strong>Node H: exclude item 1.</strong> $p=0$, $w=0$. Bound: best remaining is item 2 ($+30$, $w=5$), item 3 fraction $5/10\\cdot 50=25$. Bound $=55 < L=70$. <strong>Prune the entire exclude-item-1 subtree</strong> — no completion there can beat $70$.\n\nAll live nodes are exhausted or pruned. The optimal value is $\\boxed{70}$, achieved by selecting items $\\{1,2\\}$ (value $40+30$, weight $7\\le 10$). The bound at the root ($85$) was never met because no feasible integral packing reaches it; the key economy was node H, where one bound comparison erased half the search tree."
            }
          ]
        }
      ]
    },
    {
      "id": "a-graphs",
      "title": "Graph Algorithms",
      "lessons": [
        {
          "id": "a-graph-representations-traversal",
          "title": "Graph Representations, BFS, and DFS",
          "minutes": 16,
          "content": "<h3>Why graphs, and why representation comes first</h3>\n<p>A <strong>graph</strong> $G = (V, E)$ is a set of <strong>vertices</strong> $V$ together with a set of <strong>edges</strong> $E \\subseteq V \\times V$. That spare definition hides an enormous range of objects: social networks, web pages and hyperlinks, road maps, the dependency DAG of a build system, the computation graph of a neural network, the state space of a planning problem. Almost any time you have <em>things</em> and <em>relationships between things</em>, you have a graph, and the two workhorse traversals — <strong>breadth-first search (BFS)</strong> and <strong>depth-first search (DFS)</strong> — are the lens through which you read its structure.</p>\n<p>Before any algorithm runs, you must decide how to store the graph in memory. This choice is not cosmetic: it sets the asymptotic cost of every operation downstream. Let $n = |V|$ and $m = |E|$. We'll use these throughout.</p>\n\n<h3>Adjacency list vs. adjacency matrix</h3>\n<h4>Adjacency matrix</h4>\n<p>An $n \\times n$ matrix $A$ where $A_{ij} = 1$ if there is an edge from $i$ to $j$ (or the edge weight, for weighted graphs), and $0$ otherwise. For an undirected graph, $A$ is symmetric ($A = A^\\top$).</p>\n<pre><code>    0  1  2  3\n0 [ 0  1  1  0 ]\n1 [ 1  0  1  0 ]\n2 [ 1  1  0  1 ]\n3 [ 0  0  1  0 ]</code></pre>\n<p>Checking whether edge $(i,j)$ exists is $O(1)$ — a single array lookup. But the matrix always occupies $\\Theta(n^2)$ space regardless of how few edges there are, and listing a vertex's neighbors costs $\\Theta(n)$ because you must scan an entire row.</p>\n\n<h4>Adjacency list</h4>\n<p>An array (or hash map) of $n$ lists; entry $u$ holds the vertices adjacent to $u$. Total space is $\\Theta(n + m)$ — proportional to what actually exists. Iterating over $u$'s neighbors costs $O(\\deg(u))$, which is exactly optimal. The price: an edge-existence query $(u,v)$ takes $O(\\deg(u))$ in the worst case, since you may scan $u$'s whole list.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>The matrix is a <em>dense table</em>: instant random access, wasteful if mostly empty. The list is a <em>sparse ledger</em>: it records only what happened, and traversals that \"walk the edges\" pay only for edges that exist. The deciding question is always: <strong>how dense is the graph?</strong></p>\n</div>\n\n<h4>Picking by density</h4>\n<p>Define density as $\\rho = m / n^2$ (fraction of possible edges present). A graph is <strong>sparse</strong> when $m = O(n)$ or near it, and <strong>dense</strong> when $m = \\Theta(n^2)$.</p>\n<ul>\n<li><strong>Sparse</strong> ($m \\ll n^2$): use an adjacency list. Most real graphs are sparse — road networks, social graphs (bounded average degree), web graphs. Space $\\Theta(n+m)$ instead of $\\Theta(n^2)$ is the difference between feasible and impossible at scale.</li>\n<li><strong>Dense</strong> ($m \\approx n^2$), or when you do many random edge-existence queries: the matrix wins. Its $O(1)$ lookups and cache-friendly contiguous memory dominate, and you weren't going to save space anyway.</li>\n</ul>\n<p>A concrete rule of thumb: BFS/DFS cost $\\Theta(n + m)$ on a list but $\\Theta(n^2)$ on a matrix (because at each vertex you scan a full row). For sparse graphs that is the difference between linear and quadratic.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">ML connection</div>\n<p>Graph neural networks live on this same fork. <strong>Message passing</strong> (GraphSAGE, GAT) iterates over neighbor lists — perfect for sparse adjacency lists, cost $\\Theta(n+m)$ per layer. The <strong>spectral / GCN</strong> view multiplies by a normalized adjacency matrix $\\hat{A} = D^{-1/2}(A+I)D^{-1/2}$ (where $D$ is the degree matrix of $A+I$); on sparse graphs this is implemented as a sparse-dense matmul, which is morally still \"iterate the edges.\" The dense $n^2$ matrix is only used in theory or for tiny graphs. Same density tradeoff, dressed in linear algebra.</p>\n</div>\n\n<h3>Breadth-first search (BFS)</h3>\n<p>BFS explores a graph in <strong>layers</strong>: first the source $s$, then all vertices at distance 1, then distance 2, and so on. It uses a <strong>FIFO queue</strong> — the discipline of \"first in, first out\" is exactly what produces level order.</p>\n\n<pre><code>BFS(G, s):\n    for each u in V:  dist[u] = INF;  parent[u] = NIL\n    dist[s] = 0\n    Q = queue([s])\n    while Q not empty:\n        u = Q.dequeue()\n        for each v in adj[u]:\n            if dist[v] == INF:        # v not yet discovered\n                dist[v] = dist[u] + 1\n                parent[v] = u\n                Q.enqueue(v)</code></pre>\n\n<p><strong>Complexity.</strong> Each vertex is enqueued and dequeued at most once ($O(n)$), and each edge is examined once from its endpoint(s) (so $O(m)$ on a list). Total $\\Theta(n + m)$.</p>\n\n<h4>The key guarantee: shortest paths in unweighted graphs</h4>\n<p>BFS computes the <strong>fewest-edges distance</strong> from $s$ to every reachable vertex. Formally, when BFS finishes, $\\text{dist}[v]$ equals $\\delta(s,v)$, the minimum number of edges on any $s$–$v$ path.</p>\n<p><em>Why it works:</em> the queue is always \"monotone in distance.\" At any moment the queue holds vertices of distance $d$ followed possibly by vertices of distance $d+1$, and never anything larger. Because we discover $v$ the first time we reach it — and that first arrival comes from a vertex at the smallest possible distance — we assign the smallest possible $\\text{dist}[v]$. Following <code>parent</code> pointers back from $v$ to $s$ reconstructs an actual shortest path.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>BFS is a wavefront expanding uniformly from the source, like ripples on a pond. Every vertex is first touched by the wave that has traveled the fewest steps, so its recorded distance is minimal. This is why BFS — not DFS — solves unweighted shortest paths. (For <em>weighted</em> graphs the wavefront no longer expands uniformly, and you need Dijkstra; BFS is the special case where every edge has weight 1.)</p>\n</div>\n\n<h3>Depth-first search (DFS)</h3>\n<p>DFS goes as <strong>deep</strong> as possible along one path before backtracking. Where BFS uses a queue, DFS uses a <strong>stack</strong> — either an explicit one or the call stack of recursion. The natural recursive form also records <strong>timestamps</strong>, which turn out to encode the graph's structure.</p>\n\n<pre><code>DFS(G):\n    time = 0\n    for each u in V:  color[u] = WHITE\n    for each u in V:\n        if color[u] == WHITE:  DFS-VISIT(u)\n\nDFS-VISIT(u):\n    color[u] = GRAY            # discovered, still on the stack\n    time += 1;  d[u] = time    # discovery time\n    for each v in adj[u]:\n        if color[v] == WHITE:\n            parent[v] = u\n            DFS-VISIT(v)\n    color[u] = BLACK           # finished\n    time += 1;  f[u] = time    # finish time</code></pre>\n\n<p><strong>Complexity</strong> is again $\\Theta(n+m)$: each vertex is visited once and each adjacency entry scanned once. The three colors track state: <strong>WHITE</strong> = undiscovered, <strong>GRAY</strong> = discovered but not finished (still on the recursion stack — its descendants are being explored), <strong>BLACK</strong> = finished.</p>\n\n<h4>Discovery/finish times and the parenthesis structure</h4>\n<p>The intervals $[d[u], f[u]]$ nest like balanced parentheses. The <strong>Parenthesis Theorem</strong>: for any two vertices $u, v$, exactly one of these holds — the intervals are disjoint (neither is an ancestor of the other), or one contains the other (the container is an ancestor in the DFS forest). They can never partially overlap. This nesting is what makes DFS the engine behind topological sort, strongly-connected components, and articulation points.</p>\n\n<h4>Edge classification (directed graphs)</h4>\n<p>Using colors at the moment we look at edge $(u,v)$, every edge falls into exactly one type:</p>\n<ul>\n<li><strong>Tree edge</strong>: $v$ is WHITE — we discover $v$ through this edge. These edges form the DFS forest.</li>\n<li><strong>Back edge</strong>: $v$ is GRAY — $v$ is an ancestor of $u$ still on the stack. <em>A back edge means a cycle.</em></li>\n<li><strong>Forward edge</strong>: $v$ is BLACK and $d[u] &lt; d[v]$ — $v$ is a descendant reached by a non-tree edge.</li>\n<li><strong>Cross edge</strong>: $v$ is BLACK and $d[u] &gt; d[v]$ — $v$ is in an already-finished subtree (a \"sibling\" branch).</li>\n</ul>\n<p>In <strong>undirected</strong> graphs there are only tree edges and back edges (forward and cross edges cannot occur, because exploring an edge from the side discovered first turns it into a tree edge).</p>\n\n<h3>Connected components</h3>\n<p>In an <strong>undirected</strong> graph, a connected component is a maximal set of mutually reachable vertices. Run BFS or DFS from each still-unvisited vertex; each launch discovers exactly one whole component. Total cost $\\Theta(n+m)$ for all components combined.</p>\n<pre><code>components = 0\nfor each u in V:\n    if not visited[u]:\n        components += 1\n        BFS-or-DFS(u)          # marks the entire component visited</code></pre>\n<p>For <strong>directed</strong> graphs the analogous notion is <strong>strongly connected components</strong> (every pair mutually reachable, respecting direction), found with DFS — Tarjan's algorithm in a single DFS pass, or Kosaraju's algorithm in two DFS passes. That's a sequel to this lesson; the key idea to carry forward is that DFS finish times give the ordering Kosaraju needs.</p>\n\n<h3>Cycle detection</h3>\n<p>The method depends on whether the graph is directed, because the definition of a cycle does.</p>\n\n<h4>Directed graphs: look for a back edge</h4>\n<p>Run DFS; if you ever encounter an edge $(u,v)$ where $v$ is <strong>GRAY</strong> (currently on the recursion stack), you have found a back edge, hence a cycle. If DFS completes with no back edge, the graph is acyclic (a <strong>DAG</strong>), and its vertices can be topologically sorted in decreasing finish-time order.</p>\n<pre><code>has_cycle_directed(G):  run DFS; report cycle iff some edge (u,v) has color[v] == GRAY</code></pre>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Subtle point</div>\n<p>In a directed graph it is <em>not</em> enough to check \"have I seen $v$ before.\" Seeing a BLACK (already-finished) vertex is fine — that's a forward or cross edge, not a cycle. The cycle test is specifically the GRAY color: $v$ must be an <strong>ancestor still open on the current path</strong>. This is the single most common bug in hand-rolled cycle detectors.</p>\n</div>\n\n<h4>Undirected graphs: a back edge to a non-parent</h4>\n<p>Do DFS (or BFS). A cycle exists if you reach an already-visited vertex $v$ from $u$ where $v$ is <strong>not</strong> $u$'s parent. The \"not the parent\" exception matters because in an undirected graph the edge you just came in on appears again from the other side; that re-encounter is not a cycle.</p>\n<p>Alternatively, the classic counting fact: an undirected graph with $n$ vertices and $c$ connected components is a forest (acyclic) iff $m = n - c$. Any extra edge beyond that forces a cycle. A single connected tree has exactly $m = n - 1$ edges; edge number $n$ closes a loop.</p>\n\n<h3>Worked example — trace BFS and DFS, then detect a cycle</h3>\n<p>Take this <strong>directed</strong> graph on vertices $\\{0,1,2,3,4,5\\}$ with adjacency lists (neighbors in ascending order, which fixes the visit order):</p>\n<pre><code>0 -> [1, 2]\n1 -> [3]\n2 -> [3, 4]\n3 -> [4]\n4 -> [5]\n5 -> [2]</code></pre>\n\n<h4>BFS from 0</h4>\n<p>Process the queue level by level. Start: <code>dist[0]=0</code>, queue $[0]$.</p>\n<ul>\n<li>Dequeue 0 → discover 1, 2 (dist 1). Queue $[1,2]$.</li>\n<li>Dequeue 1 → discover 3 (dist 2). Queue $[2,3]$.</li>\n<li>Dequeue 2 → neighbor 3 already seen; discover 4 (dist 2). Queue $[3,4]$.</li>\n<li>Dequeue 3 → neighbor 4 already seen. Queue $[4]$.</li>\n<li>Dequeue 4 → discover 5 (dist 3). Queue $[5]$.</li>\n<li>Dequeue 5 → neighbor 2 already seen. Queue empty.</li>\n</ul>\n<p><strong>BFS order:</strong> 0, 1, 2, 3, 4, 5. <strong>Distances from 0:</strong> $\\text{dist} = [0,1,1,2,2,3]$. So the fewest-edges path $0 \\to 5$ has length 3 (e.g. $0\\to2\\to4\\to5$), and BFS proves no shorter one exists.</p>\n\n<h4>DFS from 0 (with timestamps)</h4>\n<p>Recurse, always taking the smallest-numbered WHITE neighbor first.</p>\n<pre><code>d[0]=1  enter 0\n d[1]=2  enter 1 (tree edge 0->1)\n  d[3]=3 enter 3 (tree edge 1->3)\n   d[4]=4 enter 4 (tree edge 3->4)\n    d[5]=5 enter 5 (tree edge 4->5)\n     edge 5->2: 2 is WHITE -> tree edge\n     d[2]=6 enter 2\n      edge 2->3: 3 is GRAY -> BACK EDGE  (cycle!)\n      edge 2->4: 4 is GRAY -> BACK EDGE\n     f[2]=7  finish 2\n    f[5]=8  finish 5\n   f[4]=9  finish 4\n  f[3]=10 finish 3\n f[1]=11 finish 1\n edge 0->2: 2 is BLACK, d[0]&lt;d[2] -> FORWARD EDGE\nf[0]=12 finish 0</code></pre>\n<p><strong>DFS discovery order:</strong> 0, 1, 3, 4, 5, 2. The edge $2 \\to 3$ targets a GRAY vertex (3 is an open ancestor on the path $0\\,1\\,3\\,4\\,5\\,2$), so it is a <strong>back edge</strong> — the graph <strong>contains a cycle</strong>, namely $2 \\to 3 \\to 4 \\to 5 \\to 2$. The edge $0 \\to 2$ reaches a BLACK vertex with $d[0] &lt; d[2]$, so it is a forward edge (not a cycle), illustrating exactly why the GRAY test, not \"already visited,\" is the correct cycle criterion.</p>\n\n<h4>Same edges, now undirected</h4>\n<p>Treat each arrow as a two-way edge. Now every vertex's neighbor list grows: in particular vertex 3 becomes adjacent to $\\{1,2,4\\}$, so the undirected DFS diverges from the directed one. DFS from 0, taking the smallest-numbered unvisited neighbor first, builds the tree path $0\\!-\\!1\\!-\\!3\\!-\\!2\\!-\\!4\\!-\\!5$ (from 3 we go to 2 before 4, since $2 &lt; 4$). When we enter 2 and look at the edge to 0, vertex 0 is visited and is <em>not</em> 2's parent (2's parent is 3), so that is a back edge — a cycle, e.g. $0\\!-\\!1\\!-\\!3\\!-\\!2\\!-\\!0$. Check by counting: 6 vertices, 1 component, and the undirected edge set $\\{01,02,13,23,24,34,45,52\\}$ has $m = 8 > n - 1 = 5$, so there must be cycles. Both methods agree.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML / AI</div>\n<p>BFS and DFS are the substrate of search and reasoning. Uninformed search in AI <em>is</em> BFS (optimal for unit-cost steps) or DFS (memory-light, the basis of iterative-deepening). Cycle detection on directed graphs powers dependency resolution in build systems and the autograd engines of PyTorch/TensorFlow, which require the computation graph to be a DAG before they can topologically order the backward pass. And the \"explore by layers\" idea reappears literally in GNNs: a $k$-layer GNN aggregates information from each node's $k$-hop BFS neighborhood. Master these two traversals and you hold the key to a startling fraction of applied graph work.</p>\n</div>",
          "mcq": [
            {
              "q": "You must store a graph with $n = 10^6$ vertices and average degree 8 (so $m \\approx 4 \\times 10^6$ undirected edges), and you will run BFS once. Which representation should you choose and why?",
              "choices": [
                "Adjacency matrix, because edge lookups are $O(1)$",
                "Adjacency list, because space is $\\Theta(n+m)$ and BFS runs in $\\Theta(n+m)$ rather than $\\Theta(n^2)$",
                "Adjacency matrix, because BFS needs random access to rows",
                "Either works equally well at this scale"
              ],
              "answer": 1,
              "explain": "The graph is sparse ($m \\approx 4\\times10^6 \\ll n^2 = 10^{12}$). A matrix would need $10^{12}$ entries and force BFS into $\\Theta(n^2)$; the list uses $\\Theta(n+m)$ space and runs BFS in $\\Theta(n+m)$."
            },
            {
              "q": "During DFS on a directed graph you examine edge $(u,v)$ and find $v$ is BLACK with $d[u] > d[v]$. What kind of edge is it, and does it imply a cycle?",
              "choices": [
                "Back edge; yes, it implies a cycle",
                "Cross edge; no, it does not imply a cycle",
                "Forward edge; no, it does not imply a cycle",
                "Tree edge; yes, it implies a cycle"
              ],
              "answer": 1,
              "explain": "A BLACK target means $v$'s subtree is already finished; $d[u] > d[v]$ means $v$ was discovered earlier in a different branch, so this is a cross edge. Only a GRAY target (a back edge) signals a directed cycle."
            },
            {
              "q": "Why does BFS, but not DFS, correctly compute shortest-path distances in an unweighted graph?",
              "choices": [
                "DFS does not visit every vertex, so some distances are missing",
                "BFS uses a FIFO queue so vertices are discovered in nondecreasing distance order, fixing each $\\text{dist}[v]$ to its minimum on first contact",
                "DFS uses more memory, which corrupts the distance values",
                "BFS revisits vertices to improve their distance, while DFS does not"
              ],
              "answer": 1,
              "explain": "The FIFO queue keeps the frontier monotone in distance, so a vertex's first discovery comes from the closest possible predecessor, giving the minimum edge count. DFS plunges deep and may reach a vertex via a long path first."
            },
            {
              "q": "An undirected graph has $n = 7$ vertices, $m = 6$ edges, and exactly 2 connected components. Is it acyclic?",
              "choices": [
                "Yes — a graph with $c$ components is a forest iff $m = n - c$, and $6 = 7 - 1 \\ne 7 - 2$",
                "No — it must contain a cycle because $m = 6 = n - 1$ would only be acyclic with 1 component, but here $c = 2$ so acyclicity needs $m = 5$; $m = 6$ forces a cycle",
                "Yes — $m = 6 < n = 7$ guarantees no cycle",
                "Cannot be determined without the edge list"
              ],
              "answer": 1,
              "explain": "A forest with $c$ components satisfies $m = n - c = 7 - 2 = 5$. Here $m = 6 > 5$, so there is at least one extra edge, which must close a cycle."
            },
            {
              "q": "A graph has $n = 5000$ vertices and $m \\approx 8000$ edges. You need an algorithm that repeatedly asks \"does edge $(u,v)$ exist?\" millions of times, with very few neighbor-iterations. Setting aside space concerns, which representation gives the best query time and what is that time?",
              "choices": [
                "Adjacency list, $O(1)$ per query",
                "Adjacency matrix, $O(1)$ per query",
                "Adjacency list, $O(\\deg(u))$ per query",
                "Adjacency matrix, $O(n)$ per query"
              ],
              "answer": 1,
              "explain": "An edge-existence check is a single array lookup $A_{ij}$ in the adjacency matrix, giving $O(1)$, whereas the list pays $O(\\deg(u))$ to scan $u$'s neighbors."
            },
            {
              "q": "For a graph stored as an adjacency list, what is the total cost of iterating over every vertex's entire neighbor list exactly once (i.e., touching every adjacency entry)?",
              "choices": [
                "$\\Theta(n^2)$",
                "$\\Theta(n + m)$",
                "$\\Theta(n \\cdot \\max_u \\deg(u))$",
                "$\\Theta(m^2)$"
              ],
              "answer": 1,
              "explain": "Summing $O(\\deg(u))$ over all vertices gives $\\sum_u \\deg(u) = \\Theta(m)$ edge-entries plus $\\Theta(n)$ to visit each list header, for $\\Theta(n+m)$ total."
            },
            {
              "q": "The lesson defines density as $\\rho = m/n^2$. For a dense graph where $m = \\Theta(n^2)$, why does the adjacency list lose its usual space advantage over the matrix?",
              "choices": [
                "Because the list's $\\Theta(n+m)$ space becomes $\\Theta(n^2)$, matching the matrix asymptotically",
                "Because the list cannot represent dense graphs at all",
                "Because the matrix shrinks to $\\Theta(n)$ when the graph is dense",
                "Because edge-existence queries become $O(1)$ in the list when dense"
              ],
              "answer": 0,
              "explain": "When $m = \\Theta(n^2)$ the list's $\\Theta(n+m)$ space collapses to $\\Theta(n^2)$, the same order as the matrix, so the list no longer saves space."
            },
            {
              "q": "For an undirected graph, the adjacency matrix $A$ has the property that $A = A^\\top$. What does this symmetry directly express about the edges?",
              "choices": [
                "Every vertex has the same degree",
                "If $(i,j)$ is an edge then $(j,i)$ is the same edge, so $A_{ij} = A_{ji}$",
                "The graph has no cycles",
                "The number of edges equals the number of vertices"
              ],
              "answer": 1,
              "explain": "In an undirected graph an edge between $i$ and $j$ is bidirectional, so $A_{ij} = A_{ji}$ for all pairs, which is exactly the statement $A = A^\\top$."
            },
            {
              "q": "You run BFS from a source $s$ on an undirected graph stored as an adjacency list, with $n$ vertices and $m$ edges, using a queue and a visited array. What is the tight worst-case running time?",
              "choices": [
                "$O(n^2)$ because every vertex may be compared against every other",
                "$O(n + m)$ because each vertex is enqueued once and each edge is scanned a constant number of times",
                "$O(m \\log n)$ because the queue operations dominate",
                "$O(n \\cdot m)$ because each of the $n$ vertices scans all $m$ edges"
              ],
              "answer": 1,
              "explain": "With an adjacency list, each vertex is enqueued/dequeued once ($O(n)$) and each edge is examined a constant number of times across all neighbor scans ($O(m)$ total, $2m$ for undirected), giving $O(n+m)$. The $O(n^2)$ answer is the cost on an adjacency MATRIX, not a list; BFS uses no priority queue, so the $\\log n$ factor is spurious."
            },
            {
              "q": "A team stores a directed graph as an adjacency matrix and is surprised BFS runs much slower than the $O(n+m)$ they expected, even though the graph is sparse ($m \\ll n^2$). Why?",
              "choices": [
                "The matrix makes edge-existence queries slow, bottlenecking the queue",
                "To list a vertex's neighbors, BFS must scan a full row of $n$ entries, so traversal costs $\\Theta(n^2)$ regardless of sparsity",
                "BFS is inherently $\\Theta(n^2)$ and the representation is irrelevant",
                "Adjacency matrices cannot represent directed graphs, forcing extra work"
              ],
              "answer": 1,
              "explain": "On a matrix, finding the neighbors of a vertex requires scanning its entire row of $n$ cells, so visiting all $n$ vertices costs $\\Theta(n^2)$ even when most cells are 0. Edge-existence is actually $O(1)$ on a matrix (not the bottleneck), and BFS is $O(n+m)$ only on an adjacency list."
            },
            {
              "q": "On an UNDIRECTED graph, you run DFS and encounter edge $(u,v)$ where $v$ is GRAY (currently on the recursion stack) and $v$ is not the parent of $u$. What does this tell you?",
              "choices": [
                "The graph contains a cycle",
                "Edge $(u,v)$ is a cross edge and is harmless",
                "The graph is necessarily disconnected",
                "$v$ was already finished, so $(u,v)$ is a forward edge"
              ],
              "answer": 0,
              "explain": "A back edge to a GRAY (still-active) ancestor that is not the immediate parent closes a cycle, so the undirected graph has a cycle. Cross edges do not occur in undirected DFS, and GRAY means active/on-stack (not finished), so the forward-edge claim is wrong."
            },
            {
              "q": "You convert an undirected adjacency list with $m$ edges into the corresponding adjacency matrix and count the number of 1-entries. How many are there, and what is the sum of all vertex degrees?",
              "choices": [
                "$m$ ones and total degree $m$, since each edge is one entry",
                "$2m$ ones and total degree $2m$, since each undirected edge appears in both endpoints' rows",
                "$n^2$ ones and total degree $n^2$, since the matrix is $n \\times n$",
                "$m$ ones and total degree $2m$, since the matrix stores each edge once"
              ],
              "answer": 1,
              "explain": "Each undirected edge $\\{i,j\\}$ sets both $A_{ij}=1$ and $A_{ji}=1$, so there are $2m$ ones; by the handshake lemma the degree sum is also $2m$. Storing only $m$ ones would describe a directed graph, breaking the symmetry $A=A^\\top$."
            },
            {
              "q": "BFS explores a graph using which data structure to manage its frontier?",
              "choices": [
                "A priority queue",
                "A stack (LIFO)",
                "A queue (FIFO)",
                "A hash set"
              ],
              "answer": 2,
              "explain": "Breadth-first search dequeues the oldest-discovered vertex first, so it fans out level by level — a FIFO queue. (A stack would turn it into depth-first search; a priority queue gives Dijkstra.)"
            },
            {
              "q": "How is depth-first search (DFS) naturally implemented?",
              "choices": [
                "With a queue (FIFO)",
                "With a stack (LIFO) — or equivalently the recursion call stack",
                "With a priority queue",
                "With a min-heap"
              ],
              "answer": 1,
              "explain": "DFS dives as deep as possible before backtracking, which is exactly LIFO behaviour: an explicit stack, or the implicit call stack of a recursive implementation."
            },
            {
              "q": "An adjacency matrix for a graph with $V$ vertices uses how much space, regardless of how many edges the graph has?",
              "choices": [
                "$\\Theta(V)$",
                "$\\Theta(V+E)$",
                "$\\Theta(E)$",
                "$\\Theta(V^2)$"
              ],
              "answer": 3,
              "explain": "The matrix is $V\\times V$ entries — $\\Theta(V^2)$ — whether the graph is sparse or dense. That's why adjacency <em>lists</em> ($\\Theta(V+E)$) are preferred for sparse graphs, where most matrix entries would be 0."
            },
            {
              "q": "A directed graph contains a cycle if and only if a depth-first search finds a…",
              "choices": [
                "back edge (an edge to an ancestor still on the recursion stack)",
                "cross edge",
                "forward edge",
                "tree edge"
              ],
              "answer": 0,
              "explain": "A back edge points from a vertex to one of its DFS ancestors (a GRAY/on-stack vertex), closing a loop — its presence is exactly equivalent to the directed graph having a cycle. This is the basis of DFS-based cycle detection."
            }
          ],
          "flashcards": [
            {
              "front": "Space and traversal cost: adjacency list vs. adjacency matrix (with $n$ vertices, $m$ edges).",
              "back": "List: $\\Theta(n+m)$ space, neighbor iteration $O(\\deg u)$, BFS/DFS $\\Theta(n+m)$, edge query $O(\\deg u)$. Matrix: $\\Theta(n^2)$ space, edge query $O(1)$, neighbor iteration $\\Theta(n)$, BFS/DFS $\\Theta(n^2)$. Use list for sparse, matrix for dense or query-heavy."
            },
            {
              "front": "What does BFS guarantee about the values it computes, and what data structure makes it work?",
              "back": "BFS uses a FIFO queue and computes $\\text{dist}[v] = \\delta(s,v)$, the minimum number of edges from source $s$ to $v$ (unweighted shortest path). Parent pointers reconstruct an actual shortest path. Runtime $\\Theta(n+m)$."
            },
            {
              "front": "DFS vertex colors and the cycle-detection rule for directed graphs.",
              "back": "WHITE = undiscovered, GRAY = discovered but unfinished (on the recursion stack), BLACK = finished. A directed graph has a cycle iff DFS finds a back edge: an edge $(u,v)$ with $v$ GRAY. BLACK targets (forward/cross edges) do NOT mean a cycle."
            },
            {
              "front": "DFS edge types in a directed graph, by the color of the target $v$ when edge $(u,v)$ is examined.",
              "back": "$v$ WHITE → tree edge; $v$ GRAY → back edge (cycle); $v$ BLACK with $d[u]<d[v]$ → forward edge; $v$ BLACK with $d[u]>d[v]$ → cross edge. Undirected graphs have only tree and back edges."
            },
            {
              "front": "Cycle test and forest condition for an UNDIRECTED graph.",
              "back": "Cycle exists if DFS/BFS reaches an already-visited vertex $v$ from $u$ where $v$ is not $u$'s parent. Counting form: a graph with $c$ components is acyclic (a forest) iff $m = n - c$; any extra edge forces a cycle."
            },
            {
              "front": "Parenthesis Theorem for DFS discovery/finish intervals $[d[u], f[u]]$.",
              "back": "For any two vertices, the intervals are either disjoint or one fully contains the other — never partially overlapping. Containment means the outer vertex is an ancestor of the inner in the DFS forest. This nesting underlies topological sort and SCC algorithms."
            }
          ],
          "homework": [
            {
              "prompt": "Consider the directed graph with adjacency lists (neighbors ascending): $0\\to[1,2]$, $1\\to[2,3]$, $2\\to[3]$, $3\\to[]$. (a) Give the BFS order and distances from vertex 0. (b) Give the DFS discovery order from 0 and classify every non-tree edge. (c) Is the graph cyclic?",
              "hint": "For BFS, expand level by level with a FIFO queue and record dist when a vertex is first discovered. For DFS, take the smallest WHITE neighbor first and watch the color (GRAY/BLACK) of each target when an edge is non-tree.",
              "solution": "(a) BFS from 0: dequeue 0 → discover 1,2 (dist 1); dequeue 1 → 2 seen, discover 3 (dist 2); dequeue 2 → 3 seen; dequeue 3. BFS order 0,1,2,3; dist = [0,1,1,2]. (b) DFS: enter 0; tree 0->1; enter 1; tree 1->2; enter 2; edge 2->3 tree; enter 3 (finishes); back up, finish 2; from 1 edge 1->3: 3 is BLACK with d[1]<d[3] → forward edge; finish 1; from 0 edge 0->2: 2 BLACK, d[0]<d[2] → forward edge; finish 0. Discovery order 0,1,2,3. Non-tree edges: 1->3 forward, 0->2 forward. (c) No back edge appears (no target is GRAY), so the graph is acyclic — a DAG."
            },
            {
              "prompt": "You are given a connected undirected graph and told only that it has exactly one cycle. Express the number of edges $m$ in terms of the number of vertices $n$, and describe an $O(n+m)$ algorithm that returns the vertices on that cycle.",
              "hint": "Start from the forest edge-count identity $m = n - c$ for an acyclic graph, and think about what 'exactly one extra edge' does. For finding the cycle, run DFS and use parent pointers when you meet a back edge.",
              "solution": "A connected ($c=1$) acyclic graph (tree) has $m = n - 1$. Exactly one cycle means one extra edge, so $m = n$. Algorithm: run DFS keeping parent[] pointers. The first (and only) back edge $(u,v)$ — an edge to an already-visited vertex that is not the parent — closes the cycle. Recover the cycle by walking parent pointers from $u$ up to $v$ and appending the edge $v\\!-\\!u$; the collected vertices are exactly the cycle. DFS is $\\Theta(n+m)$ and the walk is $O(n)$, so total $O(n+m)$."
            },
            {
              "prompt": "Suppose you must answer many random edge-existence queries 'is $(u,v) \\in E$?' on a graph that is moderately dense ($m \\approx n^2/4$) with $n = 2000$. Compare the adjacency-list and adjacency-matrix choices in terms of per-query time and total space, and recommend one. Then state how your recommendation changes if instead $n = 2{,}000{,}000$ and $m \\approx 8n$ (sparse).",
              "hint": "Per-query cost on a list is $O(\\deg u)$; on a matrix it is $O(1)$. Compare $n^2$ space against $n+m$ for each scenario, and weigh which cost dominates given 'many queries'.",
              "solution": "Dense case ($n=2000$, $m\\approx 10^6$): the matrix needs $n^2 = 4\\times10^6$ entries — entirely affordable — and answers each query in $O(1)$. The list answers in $O(\\deg u)$, with average degree $\\approx 2m/n = 1000$, far slower per query, while space ($n+m \\approx 10^6$) is comparable. Recommend the adjacency matrix: $O(1)$ queries dominate and space is fine. Sparse case ($n=2\\times10^6$, $m\\approx 1.6\\times10^7$): a matrix would need $4\\times10^{12}$ entries — infeasible (terabytes). Use the adjacency list: $\\Theta(n+m)\\approx 1.8\\times10^7$ space, and with average degree $2m/n = 16$ each query is $O(16)$ on average. Recommend the list; the matrix is impossible at this scale despite its $O(1)$ queries."
            }
          ],
          "examples": [
            {
              "title": "BFS shortest-path layers on an undirected graph",
              "body": "Run breadth-first search from source $s=0$ on the undirected graph with $n=6$ vertices and adjacency lists $0:[1,2]$, $1:[0,3,4]$, $2:[0,4]$, $3:[1,5]$, $4:[1,2,5]$, $5:[3,4]$ (neighbors listed in increasing order). Show the queue, the $\\texttt{dist}$ array, and the BFS-tree parent after every dequeue, and report the shortest-path distance from $0$ to every vertex.",
              "solution": "BFS uses a FIFO queue and a $\\texttt{dist}$ array initialized to $\\infty$ (shown as $-$) except $\\texttt{dist}[0]=0$. When we dequeue a vertex $u$, we relax each neighbor $w$ that is still undiscovered ($\\texttt{dist}[w]=-$): set $\\texttt{dist}[w]=\\texttt{dist}[u]+1$, record $\\texttt{parent}[w]=u$, and enqueue $w$. A vertex is enqueued exactly once, so it is processed once.\n\nInitial state: queue $=[0]$, $\\texttt{dist}=[0,-,-,-,-,-]$.\n\n<strong>Dequeue 0</strong> (dist 0). Neighbors $1,2$ are undiscovered: set $\\texttt{dist}[1]=\\texttt{dist}[2]=1$, $\\texttt{parent}[1]=\\texttt{parent}[2]=0$, enqueue both.\nqueue $=[1,2]$, $\\texttt{dist}=[0,1,1,-,-,-]$.\n\n<strong>Dequeue 1</strong> (dist 1). Neighbors $0$ (already known, skip), $3,4$ undiscovered: $\\texttt{dist}[3]=\\texttt{dist}[4]=2$, $\\texttt{parent}[3]=\\texttt{parent}[4]=1$, enqueue both.\nqueue $=[2,3,4]$, $\\texttt{dist}=[0,1,1,2,2,-]$.\n\n<strong>Dequeue 2</strong> (dist 1). Neighbors $0,4$ both already discovered, so nothing changes.\nqueue $=[3,4]$, $\\texttt{dist}=[0,1,1,2,2,-]$.\n\n<strong>Dequeue 3</strong> (dist 2). Neighbor $1$ known; neighbor $5$ undiscovered: $\\texttt{dist}[5]=3$, $\\texttt{parent}[5]=3$, enqueue.\nqueue $=[4,5]$, $\\texttt{dist}=[0,1,1,2,2,3]$.\n\n<strong>Dequeue 4</strong> (dist 2). Neighbors $1,2,5$ all already discovered; nothing changes.\nqueue $=[5]$, $\\texttt{dist}=[0,1,1,2,2,3]$.\n\n<strong>Dequeue 5</strong> (dist 3). Neighbors $3,4$ both discovered; nothing changes.\nqueue $=[\\,]$ — empty, so BFS halts.\n\nVisit (dequeue) order: $0,1,2,3,4,5$. Note that the queue is always nondecreasing in distance ($0;\\,1,1;\\,2,2;\\,3$), which is exactly why BFS discovers vertices in layers and the first time it reaches a vertex is along a shortest path.\n\n<strong>Answer.</strong> The shortest-path distances from $0$ are\n$$\\texttt{dist}=[\\,0,\\;1,\\;1,\\;2,\\;2,\\;3\\,].$$\nThe BFS tree (parent pointers) is $1\\!\\to\\!0,\\;2\\!\\to\\!0,\\;3\\!\\to\\!1,\\;4\\!\\to\\!1,\\;5\\!\\to\\!3$, so e.g. a shortest path to $5$ is $0\\!\\to\\!1\\!\\to\\!3\\!\\to\\!5$ of length $3$. The total work is $\\Theta(n+m)$: each vertex is enqueued/dequeued once and each adjacency list is scanned once."
            },
            {
              "title": "DFS timestamps and edge classification on a directed graph",
              "body": "Run recursive depth-first search on the directed graph with vertices $\\{0,1,2,3,4\\}$ and adjacency lists $0:[1,2,3]$, $1:[3]$, $2:[\\,]$, $3:[1]$, $4:[1]$ (neighbors in increasing order). Process vertices as DFS roots in increasing order $0,1,2,3,4$, exploring each list left to right. Give each vertex its discovery/finish times $d/f$, classify every edge as tree/back/forward/cross, and use the result to decide whether the graph has a directed cycle.",
              "solution": "Maintain a global clock that ticks on each discovery and each finish, and color vertices WHITE (undiscovered), GRAY (on the current recursion stack), BLACK (finished). When examining edge $u\\to w$: if $w$ is WHITE it is a <strong>tree</strong> edge (recurse); if $w$ is GRAY it is a <strong>back</strong> edge (points to an ancestor still on the stack); if $w$ is BLACK it is <strong>forward</strong> when $d[u]<d[w]$ (a finished descendant) and <strong>cross</strong> otherwise.\n\n<strong>Trace (clock in brackets):</strong>\n[1] discover $0$ (GRAY). Scan $0$'s list $[1,2,3]$.\n  Edge $0\\to1$: $1$ WHITE $\\Rightarrow$ TREE. [2] discover $1$. Scan $1:[3]$.\n    Edge $1\\to3$: $3$ WHITE $\\Rightarrow$ TREE. [3] discover $3$. Scan $3:[1]$.\n      Edge $3\\to1$: $1$ is GRAY (still on stack) $\\Rightarrow$ BACK. [4] finish $3$ (BLACK).\n    [5] finish $1$ (BLACK).\n  Edge $0\\to2$: $2$ WHITE $\\Rightarrow$ TREE. [6] discover $2$. List empty. [7] finish $2$.\n  Edge $0\\to3$: $3$ is BLACK and $d[0]=1<d[3]=3 \\Rightarrow$ FORWARD.\n[8] finish $0$.\nVertices $1,2,3$ are now BLACK; next WHITE root in order is $4$.\n[9] discover $4$. Scan $4:[1]$.\n  Edge $4\\to1$: $1$ is BLACK and $d[4]=9>d[1]=2 \\Rightarrow$ CROSS.\n[10] finish $4$.\n\n<strong>Timestamps</strong> $d/f$:\n$$0:1/8,\\quad 1:2/5,\\quad 2:6/7,\\quad 3:3/4,\\quad 4:9/10.$$\n\n<strong>Edge classification:</strong> tree $=\\{0\\!\\to\\!1,\\;1\\!\\to\\!3,\\;0\\!\\to\\!2\\}$; back $=\\{3\\!\\to\\!1\\}$; forward $=\\{0\\!\\to\\!3\\}$; cross $=\\{4\\!\\to\\!1\\}$.\n\n<strong>Sanity check via the parenthesis theorem.</strong> Writing each interval $[d,f]$ as a pair of parentheses, the intervals are either nested or disjoint, never crossing: $[1,8]_0$ contains $[2,5]_1 \\supset [3,4]_3$ and also $[6,7]_2$, while $[9,10]_4$ is disjoint from all of them. The forward edge $0\\to3$ connects $0$ to a vertex whose interval $[3,4]$ is strictly inside $0$'s interval $[1,8]$ (descendant); the cross edge $4\\to1$ connects two disjoint intervals with the tail discovered later. Both are consistent with the rules.\n\n<strong>Answer.</strong> DFS found a <strong>back</strong> edge $3\\to1$, and in a directed graph a back edge exists if and only if the graph contains a directed cycle. The tree path $1\\to3$ together with the back edge $3\\to1$ forms the cycle $1\\to3\\to1$, so the graph is <em>not</em> a DAG. (Had we found only tree, forward, and cross edges, the graph would have been acyclic.) The whole traversal is $\\Theta(n+m)$ since every vertex and every edge is examined exactly once."
            }
          ]
        },
        {
          "id": "a-shortest-paths-topo",
          "title": "Shortest Paths and Topological Sort",
          "minutes": 20,
          "content": "<h3>Why these three algorithms belong together</h3>\n<p>Shortest-path problems sit at the heart of an enormous range of applications: routing packets and cars, sequencing dependent tasks, propagating distances in a knowledge graph, and — in machine learning — computing graph distances for embeddings, running value iteration on a deterministic MDP, or backpropagating credit through a computation DAG. All three algorithms in this lesson answer one core question: <em>given a weighted graph, what is the cheapest way to get from a source to every other vertex?</em> They differ in the structure they exploit:</p>\n<ul>\n<li><strong>Dijkstra</strong> assumes all edge weights are non-negative and is the fast, greedy workhorse.</li>\n<li><strong>Bellman-Ford</strong> tolerates negative edges and can <em>detect</em> negative cycles, at a higher cost.</li>\n<li><strong>Topological sort</strong> exploits the absence of cycles (a DAG) to give a linear-time shortest path that even handles negative weights.</li>\n</ul>\n<p>The unifying primitive across all three is <strong>edge relaxation</strong>, so we start there.</p>\n\n<h3>The relaxation primitive</h3>\n<p>Let $G=(V,E)$ be a directed graph with edge weights $w(u,v)$. Fix a source $s$. We maintain an estimate $d[v]$ of the shortest-path distance from $s$ to $v$, initialized to $d[s]=0$ and $d[v]=\\infty$ for all other $v$. We also keep a predecessor $\\pi[v]$ to reconstruct paths.</p>\n<p><strong>Relaxing</strong> an edge $(u,v)$ asks a single question: can I reach $v$ more cheaply by going through $u$?</p>\n<pre><code>def relax(u, v, w):\n    if d[u] + w(u, v) < d[v]:\n        d[v] = d[u] + w(u, v)\n        pi[v] = u\n</code></pre>\n<p>Every estimate $d[v]$ is always either $\\infty$ or the length of <em>some</em> actual path from $s$ to $v$ — relaxation can only ever decrease estimates toward the true distance, never below it. We write $\\delta(s,v)$ for the true shortest-path distance. The invariant $d[v] \\ge \\delta(s,v)$ holds throughout. Each algorithm differs only in <em>which edges it relaxes, and in what order</em>.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of $d[v]$ as the best deal you've found so far to reach $v$. Relaxation is shopping: every time you discover a cheaper route through some neighbor, you update your best-known price. The whole game is ordering your shopping so you never have to revisit a finalized price.</p></div>\n\n<h3>Dijkstra's algorithm</h3>\n<p>Dijkstra assumes $w(u,v) \\ge 0$ for all edges. Its strategy is greedy: repeatedly pick the unfinalized vertex with the smallest current estimate, declare its estimate final (correct), and relax its outgoing edges. The set of finalized vertices grows by one each round.</p>\n\n<h4>Heap-based implementation</h4>\n<p>The \"pick the smallest\" step is exactly what a min-priority queue does. Using a binary heap keyed by $d[v]$:</p>\n<pre><code>import heapq\n\ndef dijkstra(graph, s):           # graph: u -> list of (v, w)\n    d = {v: float('inf') for v in graph}\n    d[s] = 0\n    pi = {v: None for v in graph}\n    pq = [(0, s)]                  # (distance, vertex)\n    done = set()\n    while pq:\n        du, u = heapq.heappop(pq)\n        if u in done:             # stale entry, skip\n            continue\n        done.add(u)               # d[u] is now FINAL\n        for v, w in graph[u]:\n            if d[u] + w < d[v]:\n                d[v] = d[u] + w\n                pi[v] = u\n                heapq.heappush(pq, (d[v], v))   # lazy decrease-key\n    return d, pi\n</code></pre>\n<p>Note the <strong>lazy deletion</strong> pattern: rather than performing an in-place <code>decrease-key</code> (awkward in most standard heaps), we push a fresh <code>(d[v], v)</code> entry and ignore any entry we pop whose vertex is already finalized. This keeps the code simple at the cost of a heap that can hold up to $O(E)$ entries.</p>\n\n<h4>Why Dijkstra is correct (the greedy argument)</h4>\n<p>The key claim: <em>when a vertex $u$ is popped and finalized, $d[u] = \\delta(s,u)$.</em> Suppose for contradiction $u$ is the first vertex popped with $d[u] > \\delta(s,u)$. Consider a true shortest path $s \\rightsquigarrow u$. Walk along it from $s$ (which is finalized and correct) until you cross from a finalized vertex $x$ to the first non-finalized vertex $y$ on that path. Because $x$ was finalized correctly and we relaxed edge $(x,y)$, we have $d[y] = \\delta(s,y)$. Since edge weights are non-negative, $y$ appears no later than $u$ on the path, so $\\delta(s,y) \\le \\delta(s,u) \\le d[u]$. But the priority queue pops the minimum, so it would have popped $y$ (with $d[y] = \\delta(s,y) \\le d[u]$) before $u$ — contradicting that $u$ was popped first with a wrong value.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Where non-negativity is load-bearing</div><p>The step \"$y$ appears no later than $u$, so $\\delta(s,y)\\le\\delta(s,u)$\" requires that extending a path can never <em>decrease</em> its length. That is precisely $w \\ge 0$. With a negative edge, a vertex you finalized early could later become reachable more cheaply — and Dijkstra never reopens a finalized vertex, so it would output a wrong answer.</p></div>\n\n<h4>Why Dijkstra fails on negative edges — concrete example</h4>\n<p>Consider three vertices with edges $A \\to B$ of weight $1$, $A \\to C$ of weight $5$, and $C \\to B$ of weight $-10$. Start at $A$.</p>\n<ul>\n<li>Pop $A$ ($d=0$). Relax: $d[B]=1$, $d[C]=5$.</li>\n<li>Pop $B$ ($d=1$, the current minimum) and <strong>finalize it</strong>. $B$ has no outgoing edges.</li>\n<li>Pop $C$ ($d=5$). Relax $C\\to B$: $d[B]$ would become $5 + (-10) = -5$.</li>\n</ul>\n<p>The true shortest distance to $B$ is $-5$ (via $A \\to C \\to B$), but Dijkstra already finalized $d[B]=1$ and will never correct it. The greedy assumption — \"the smallest current estimate is already optimal\" — is simply false when a later, longer-looking detour can plunge negative.</p>\n\n<h4>Complexity</h4>\n<p>With a binary heap: each vertex is popped once ($O(V \\log V)$ over the run, ignoring stale skips), and each edge triggers at most one push ($O(E \\log V)$). Total: $O((V+E)\\log V)$. With a Fibonacci heap (amortized $O(1)$ decrease-key) it improves to $O(E + V\\log V)$, mainly of theoretical interest. For dense graphs a simple array-scan for the minimum gives $O(V^2)$, which can beat the heap when $E = \\Theta(V^2)$.</p>\n\n<h3>Worked example: Dijkstra step by step</h3>\n<p>Graph (directed), source $S$:</p>\n<pre><code>S -> A (4)    S -> B (1)\nB -> A (2)    B -> C (5)\nA -> C (1)    C -> D (3)\n</code></pre>\n<p>We trace the priority queue. \"Finalized\" means popped for the first time.</p>\n<ol>\n<li>Init: $d = \\{S:0, A:\\infty, B:\\infty, C:\\infty, D:\\infty\\}$. PQ: $[(0,S)]$.</li>\n<li>Pop $(0,S)$, finalize $S$. Relax $S\\to A$: $d[A]=4$. Relax $S\\to B$: $d[B]=1$. PQ: $[(1,B),(4,A)]$.</li>\n<li>Pop $(1,B)$, finalize $B$. Relax $B\\to A$: $d[B]+w = 1+2=3 < 4$, so $d[A]=3$, $\\pi[A]=B$. Relax $B\\to C$: $1+5=6$, $d[C]=6$. PQ: $[(3,A),(4,A\\,\\text{stale}),(6,C)]$.</li>\n<li>Pop $(3,A)$, finalize $A$. Relax $A\\to C$: $3+1=4 < 6$, so $d[C]=4$, $\\pi[C]=A$. PQ: $[(4,A\\,\\text{stale}),(4,C),(6,C\\,\\text{stale})]$.</li>\n<li>Pop $(4,A)$ — $A$ already finalized, <strong>skip</strong> (stale).</li>\n<li>Pop $(4,C)$, finalize $C$. Relax $C\\to D$: $4+3=7$, $d[D]=7$. PQ: $[(6,C\\,\\text{stale}),(7,D)]$.</li>\n<li>Pop $(6,C)$ — stale, skip. Pop $(7,D)$, finalize $D$. PQ empty.</li>\n</ol>\n<p>Final distances: $d[S]=0,\\ d[B]=1,\\ d[A]=3,\\ d[C]=4,\\ d[D]=7$. Path to $D$: follow predecessors $D \\leftarrow C \\leftarrow A \\leftarrow B \\leftarrow S$, i.e. $S\\to B\\to A\\to C\\to D$. Notice $d[A]$ was improved from $4$ to $3$ <em>before</em> $A$ was finalized — the lazy stale entry $(4,A)$ was harmlessly skipped later.</p>\n\n<h3>Bellman-Ford: surviving negative edges</h3>\n<p>Bellman-Ford drops the greedy ordering entirely. Instead it relaxes <em>every</em> edge, $|V|-1$ times in a row.</p>\n<pre><code>def bellman_ford(vertices, edges, s):   # edges: list of (u, v, w)\n    d = {v: float('inf') for v in vertices}\n    d[s] = 0\n    for _ in range(len(vertices) - 1):       # |V| - 1 passes\n        for (u, v, w) in edges:\n            if d[u] != float('inf') and d[u] + w < d[v]:\n                d[v] = d[u] + w\n    # negative-cycle detection: one more pass\n    for (u, v, w) in edges:\n        if d[u] != float('inf') and d[u] + w < d[v]:\n            raise ValueError(\"negative-weight cycle reachable from s\")\n    return d\n</code></pre>\n<h4>Why $|V|-1$ passes suffice</h4>\n<p>Any shortest path with no repeated vertices has at most $|V|-1$ edges. Claim: <em>after $k$ passes, $d[v]$ equals the true distance for every $v$ whose shortest path uses at most $k$ edges.</em> Proof by induction. Base $k=0$: only $s$ has a 0-edge path, and $d[s]=0$. Inductive step: a shortest path to $v$ using $\\le k$ edges ends with edge $(u,v)$, where the prefix to $u$ uses $\\le k-1$ edges and so is correct after pass $k-1$. Pass $k$ relaxes all edges, including $(u,v)$, fixing $d[v]$. After $|V|-1$ passes, all simple shortest paths are found. The standard ordering of edges within a pass doesn't matter for correctness.</p>\n<h4>Negative-cycle detection</h4>\n<p>If a vertex's estimate can still be relaxed on a $|V|$-th pass, then some path to it beats every simple path — which is only possible if it goes around a negative-weight cycle. Note shortest paths are <em>undefined</em> (i.e. $-\\infty$) only for vertices reachable from such a cycle; this single extra pass flags their existence.</p>\n<p>Complexity is $O(V \\cdot E)$ — markedly slower than Dijkstra, the price of generality. The <strong>SPFA</strong> variant and early-termination (stop if a pass changes nothing) speed it up in practice but not in the worst case.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Connection to ML / RL</div><p>Bellman-Ford is the shortest-path face of the <em>Bellman equation</em>. In reinforcement learning, value iteration repeatedly applies $V(s) \\leftarrow \\min_a [c(s,a) + V(s')]$ — structurally identical to relaxing all \"edges\" (transitions) each sweep until convergence. Negative cycles correspond to infinitely improving loops; the discount factor $\\gamma<1$ in RL is exactly the mechanism that rules them out and guarantees convergence, just as $w\\ge 0$ does for Dijkstra.</p></div>\n\n<h3>Topological sort</h3>\n<p>A <strong>topological order</strong> of a directed acyclic graph (DAG) is a linear ordering of its vertices such that for every edge $(u,v)$, $u$ comes before $v$. Equivalently: every edge points \"forward\". Such an order exists <em>iff</em> the graph is acyclic — a cycle would force a vertex to precede itself. Topological orders are generally not unique.</p>\n\n<h4>Kahn's algorithm (BFS / in-degree based)</h4>\n<p>Repeatedly remove a vertex with in-degree 0 (no remaining prerequisites) and append it to the order.</p>\n<pre><code>from collections import deque\n\ndef kahn(graph):                      # graph: u -> list of v\n    indeg = {u: 0 for u in graph}\n    for u in graph:\n        for v in graph[u]:\n            indeg[v] += 1\n    q = deque(u for u in graph if indeg[u] == 0)\n    order = []\n    while q:\n        u = q.popleft()\n        order.append(u)\n        for v in graph[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                q.append(v)\n    if len(order) != len(graph):\n        raise ValueError(\"graph has a cycle\")   # leftover vertices\n    return order\n</code></pre>\n<p>If the loop ends with fewer than $|V|$ vertices emitted, the remaining vertices form (or feed) a cycle — Kahn's gives free cycle detection. Runs in $O(V+E)$.</p>\n\n<h4>DFS-based algorithm</h4>\n<p>Run depth-first search; when a vertex <em>finishes</em> (all its descendants are done), push it onto a stack. The reversed finish order is a valid topological order.</p>\n<pre><code>def topo_dfs(graph):\n    WHITE, GRAY, BLACK = 0, 1, 2\n    color = {u: WHITE for u in graph}\n    order = []\n    def visit(u):\n        color[u] = GRAY\n        for v in graph[u]:\n            if color[v] == GRAY:\n                raise ValueError(\"cycle (back edge) detected\")\n            if color[v] == WHITE:\n                visit(v)\n        color[u] = BLACK\n        order.append(u)          # post-order push\n    for u in graph:\n        if color[u] == WHITE:\n            visit(u)\n    order.reverse()\n    return order\n</code></pre>\n<p>The intuition: when $u$ finishes, every vertex reachable from $u$ has already finished and been pushed below $u$ on the stack — so $u$ ends up <em>before</em> all of them after reversing. Encountering a GRAY vertex means a <strong>back edge</strong>, the signature of a cycle.</p>\n\n<h4>Worked example: a valid topological order</h4>\n<p>DAG with edges: $A\\to C$, $B\\to C$, $C\\to D$, $C\\to E$, $D\\to F$, $E\\to F$.</p>\n<p>In-degrees: $A:0,\\ B:0,\\ C:2,\\ D:1,\\ E:1,\\ F:2$. Kahn's: start with $\\{A,B\\}$. Pop $A$ (emit $A$, $\\text{indeg}[C]\\to1$); pop $B$ (emit $B$, $\\text{indeg}[C]\\to0$, enqueue $C$); pop $C$ (emit $C$, decrement $D,E$ to $0$, enqueue both); pop $D$ (emit $D$, $\\text{indeg}[F]\\to1$); pop $E$ (emit $E$, $\\text{indeg}[F]\\to0$, enqueue $F$); pop $F$. Result: $A, B, C, D, E, F$. Every edge points forward — valid. (So does $B, A, C, E, D, F$; orders are not unique.)</p>\n\n<h3>DAG shortest paths in linear time</h3>\n<p>If the graph is a DAG, we can find shortest paths from $s$ in $O(V+E)$ — beating Dijkstra <em>and</em> handling negative weights — by relaxing edges in topological order.</p>\n<pre><code>def dag_shortest_paths(graph, s):     # graph: u -> list of (v, w)\n    order = kahn_or_dfs_topo(graph)\n    d = {v: float('inf') for v in graph}\n    d[s] = 0\n    for u in order:                   # process in topo order\n        if d[u] == float('inf'):\n            continue\n        for v, w in graph[u]:\n            if d[u] + w < d[v]:\n                d[v] = d[u] + w\n    return d\n</code></pre>\n<p>Why it works: process vertices in topological order. When we reach $u$, every predecessor of $u$ appears earlier in the order and has already been fully relaxed, so $d[u]$ is final by the time we use it. No greedy non-negativity assumption is needed — the DAG structure replaces it. One sweep of $|V|-1$-style relaxation collapses to a single pass because the order is exactly right.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">The unifying idea</div><p>All three algorithms relax edges; they only differ in <em>scheduling</em>. Dijkstra schedules by ascending estimate (needs $w\\ge0$). DAG shortest paths schedules by topological order (needs acyclicity). Bellman-Ford gives up on clever scheduling and brute-forces $|V|-1$ full sweeps (needs nothing, pays $O(VE)$). Pick the cheapest assumption your graph actually satisfies.</p></div>\n<p>Negating weights turns DAG-shortest-path into <strong>longest-path</strong> on a DAG — the basis of <em>critical-path</em> scheduling in project planning and of the longest chain in a computation graph. (Longest path is NP-hard in general graphs but trivial on DAGs, precisely because topological order exists.)</p>\n\n<h3>Choosing the right tool</h3>\n<table>\n<tr><th>Situation</th><th>Use</th><th>Time</th></tr>\n<tr><td>Non-negative weights, general graph</td><td>Dijkstra (heap)</td><td>$O((V+E)\\log V)$</td></tr>\n<tr><td>Negative edges possible / need cycle detection</td><td>Bellman-Ford</td><td>$O(VE)$</td></tr>\n<tr><td>Graph is a DAG (any weights)</td><td>Topo sort + relax</td><td>$O(V+E)$</td></tr>\n<tr><td>Just need a valid task ordering / cycle check</td><td>Kahn's or DFS topo</td><td>$O(V+E)$</td></tr>\n</table>",
          "mcq": [
            {
              "q": "While running heap-based Dijkstra, you pop the entry $(7, v)$ from the priority queue but $v$ was already finalized earlier with $d[v]=5$. What is the correct action?",
              "choices": [
                "Update $d[v]$ to 7 since it is the newest value",
                "Skip this entry entirely; it is a stale leftover from a lazy decrease-key",
                "Re-run relaxation on all of $v$'s outgoing edges",
                "Raise an error: the graph must contain a negative edge"
              ],
              "answer": 1,
              "explain": "With lazy deletion, a vertex can have multiple heap entries. Once finalized, its distance is correct (5), so any later popped entry like (7, v) is obsolete and is simply skipped."
            },
            {
              "q": "Why does Bellman-Ford run exactly $|V|-1$ relaxation passes (before the optional detection pass)?",
              "choices": [
                "Because a binary heap needs $\\log V$ rebalancing steps per vertex",
                "Because any shortest path without repeated vertices has at most $|V|-1$ edges, and after pass $k$ every vertex whose shortest path uses $\\le k$ edges has its correct distance",
                "Because each pass can only fix one vertex, so you need one pass per non-source vertex",
                "Because $|V|-1$ is the maximum number of negative cycles a graph can contain"
              ],
              "answer": 1,
              "explain": "By induction, after k passes every vertex with a shortest path of at most k edges is correct; a simple shortest path has at most |V|-1 edges, so |V|-1 passes suffice. A single pass can fix many vertices, and the bound is about path edge count."
            },
            {
              "q": "Which property is what actually breaks when you run Dijkstra on a graph with negative edge weights?",
              "choices": [
                "The priority queue can no longer be implemented with a binary heap",
                "Initialization $d[s]=0,\\ d[v]=\\infty$ becomes invalid",
                "The greedy claim that a popped (minimum-estimate) vertex is already final, since a later longer-looking detour can become cheaper via a negative edge",
                "Relaxation can no longer decrease an estimate"
              ],
              "answer": 2,
              "explain": "Non-negativity guarantees that extending a path never lowers its cost, which is exactly why the minimum current estimate is provably optimal; negative edges void that guarantee and Dijkstra never reopens a finalized vertex."
            },
            {
              "q": "You need single-source shortest paths on a directed acyclic graph that contains several negative edge weights (but no cycles, since it is a DAG). What is the best choice?",
              "choices": [
                "Dijkstra, because the heap handles any weights",
                "Bellman-Ford, because only it tolerates negative edges",
                "Topological sort followed by a single relaxation pass in that order, $O(V+E)$",
                "It is impossible; shortest paths are undefined with negative weights"
              ],
              "answer": 2,
              "explain": "A DAG has no cycles, so shortest paths are well-defined even with negative weights; relaxing edges in topological order gives correct distances in linear time, beating Bellman-Ford's $O(VE)$."
            },
            {
              "q": "Throughout any of these algorithms, the relaxation primitive maintains the invariant $d[v] \\ge \\delta(s,v)$, where $\\delta(s,v)$ is the true shortest distance. Why can $d[v]$ never drop strictly below $\\delta(s,v)$?",
              "choices": [
                "Because relaxation only runs $|V|-1$ times, which is too few iterations to overshoot the true distance",
                "Because every assignment sets $d[v] = d[u] + w(u,v)$, the length of an actual path through $u$, and no real path can be shorter than the shortest path",
                "Because the priority queue always pops vertices in non-decreasing order of $d$",
                "Because edge weights are required to be non-negative, so estimates can only increase"
              ],
              "answer": 1,
              "explain": "Each relaxation sets $d[v]$ to the cost of a genuine $s \\rightsquigarrow v$ path, and by definition no actual path can be cheaper than $\\delta(s,v)$, so estimates stay at or above the true distance regardless of the algorithm or edge signs."
            },
            {
              "q": "In the DFS-based topological sort, each vertex is pushed onto a list when it *finishes* (post-order), and the list is then reversed. Why is the reversal necessary?",
              "choices": [
                "Because DFS visits children before parents, so without reversal the order would list every vertex before its prerequisites",
                "Because when $u$ finishes, all vertices reachable from $u$ have already finished and been pushed, so $u$ lands below them and must be moved ahead by reversing",
                "Because reversal is what detects back edges and therefore cycles",
                "Because finish times are computed in random order and reversal sorts them"
              ],
              "answer": 1,
              "explain": "A vertex finishes only after all its descendants are already on the stack, so in raw finish order $u$ appears after everything it points to; reversing puts $u$ before all vertices reachable from it, which is exactly the topological requirement that edges point forward."
            },
            {
              "q": "The heap-based Dijkstra in the lesson uses lazy decrease-key: instead of updating a vertex's key in place, it pushes a fresh $(d[v], v)$ entry and skips any popped entry whose vertex is already finalized. What is the main cost of this simplification?",
              "choices": [
                "It can make Dijkstra return incorrect distances when several entries for one vertex coexist",
                "The heap may hold up to $O(E)$ entries at once, since each edge relaxation can push a new entry",
                "It raises the per-pop cost from $O(\\log V)$ to $O(\\log E)$, which dominates the runtime",
                "It forces an extra $|V|-1$ relaxation passes to clear stale entries"
              ],
              "answer": 1,
              "explain": "Because a new entry is pushed on every improving relaxation rather than updating in place, the heap can grow to $O(E)$ entries; this is the price paid for avoiding an in-place decrease-key, though it does not change the overall $O((V+E)\\log V)$ bound or correctness (note $\\log E = O(\\log V)$ since $E \\le V^2$)."
            },
            {
              "q": "The lesson connects Bellman-Ford to value iteration in reinforcement learning, where $V(s) \\leftarrow \\min_a [c(s,a) + \\gamma V(s')]$ is applied repeatedly. In this analogy, what plays the role that the condition $w \\ge 0$ plays for Dijkstra, ruling out infinitely improving loops?",
              "choices": [
                "The number of states $|S|$, which bounds the iteration count",
                "The discount factor $\\gamma < 1$, which guarantees convergence by preventing infinitely improving cycles",
                "The deterministic transition function, which makes every update a single edge relaxation",
                "The non-negativity of the cost function $c(s,a)$"
              ],
              "answer": 1,
              "explain": "A negative cycle in shortest paths corresponds to an infinitely improving loop in value iteration, and just as $w \\ge 0$ rules this out for Dijkstra, the discount factor $\\gamma < 1$ in the update $c(s,a) + \\gamma V(s')$ is the mechanism that guarantees the Bellman update converges."
            },
            {
              "q": "You run the single-source DAG shortest-path algorithm: topologically sort the vertices, then relax all outgoing edges of each vertex in that order. Why does relaxing edges in topological order guarantee correct distances after just one pass over the vertices?",
              "choices": [
                "Because the graph has no negative edges, so each $d[v]$ can only be updated downward once",
                "Because by the time a vertex $u$ is processed, every vertex that could lie before $u$ on a shortest path has already been finalized, so $d[u]$ is already correct",
                "Because topological order visits vertices in increasing distance from the source, exactly like Dijkstra's greedy order",
                "Because each edge is relaxed $|V|-1$ times across the single pass, matching Bellman-Ford"
              ],
              "answer": 1,
              "explain": "In topological order all predecessors of $u$ (anything that can reach $u$) appear before $u$, so $d[u]$ has received every relevant relaxation and is final before its own edges are relaxed. The Dijkstra distractor is wrong: topological order is by dependency, not by distance, which is exactly why this works even with negative edges."
            },
            {
              "q": "Bellman-Ford does its $|V|-1$ relaxation passes, then a final detection pass relaxes every edge once more. During this detection pass the edge $(u,v)$ succeeds in lowering $d[v]$ (i.e. $d[u]+w(u,v) < d[v]$). What does this single successful relaxation tell you?",
              "choices": [
                "Nothing conclusive yet; you must rerun all $|V|-1$ passes to confirm",
                "It only means vertex $v$ is unreachable from the source",
                "The graph contains a negative-weight cycle reachable from the source",
                "The graph is a DAG, since only DAGs allow improvement after convergence"
              ],
              "answer": 2,
              "explain": "After $|V|-1$ passes all distances are final if no negative cycle exists, so any further improvement is impossible unless a reachable negative cycle keeps driving distances down. A DAG would have fully converged, so the DAG option is exactly backwards."
            },
            {
              "q": "On a graph with $|V|=10^4$ vertices and $|E|=10^5$ edges, all weights non-negative, you must compute single-source shortest paths and you care about asymptotic running time. Which algorithm and bound is the best fit?",
              "choices": [
                "Bellman-Ford, $O(|V|\\cdot|E|)$, because it is the most general",
                "Topological-sort shortest paths, $O(|V|+|E|)$, since it is linear",
                "Heap-based Dijkstra, $O((|V|+|E|)\\log|V|)$",
                "Heap-based Dijkstra, $O(|V|^2)$, because every vertex examines every other"
              ],
              "answer": 2,
              "explain": "With non-negative weights and a general (possibly cyclic) graph, binary-heap Dijkstra runs in $O((|V|+|E|)\\log|V|)$, far better than Bellman-Ford's $O(|V|\\cdot|E|)$. The topological-sort bound only applies to DAGs, and $O(|V|^2)$ is the array (non-heap) Dijkstra variant, not the heap-based one described."
            },
            {
              "q": "After any of these algorithms finishes, you reconstruct the shortest path to $v$ by following $\\pi[v], \\pi[\\pi[v]], \\dots$ back to $s$. What does relaxation do to $\\pi$ that makes this reconstruction correct?",
              "choices": [
                "Whenever relaxing $(u,v)$ improves $d[v]$, it sets $\\pi[v]=u$, so $\\pi$ always records the predecessor on the current best path to $v$",
                "It sets $\\pi[v]$ to the vertex with the globally smallest $d$ value at that moment",
                "It appends $u$ to a list stored at $v$, so $\\pi[v]$ holds the entire path prefix",
                "It updates $\\pi[u]=v$ to record that $u$ now points forward toward $v$"
              ],
              "answer": 0,
              "explain": "Relaxation sets $\\pi[v]=u$ precisely when $d[u]+w(u,v)$ beats $d[v]$, so $\\pi[v]$ always names the predecessor of the best-known path; following $\\pi$ backward retraces that path. Storing whole prefixes would waste space, and pointing $\\pi[u]=v$ reverses the direction needed for backward reconstruction."
            },
            {
              "q": "Using a binary heap, Dijkstra's algorithm on a graph with $V$ vertices and $E$ edges runs in…",
              "choices": [
                "$O(VE)$",
                "$O((V+E)\\log V)$",
                "$O(V+E)$",
                "$O(V^3)$"
              ],
              "answer": 1,
              "explain": "Each vertex is extracted once ($O(\\log V)$ each) and each edge can trigger one heap push/decrease-key ($O(\\log V)$), giving $O((V+E)\\log V)$. A simple-array version is $O(V^2)$, which can be better on very dense graphs."
            },
            {
              "q": "A topological ordering of a directed graph exists if and only if the graph is…",
              "choices": [
                "complete",
                "connected",
                "bipartite",
                "acyclic (a DAG)"
              ],
              "answer": 3,
              "explain": "A topological order lists vertices so every edge points forward. That's possible exactly when there are no directed cycles — a directed acyclic graph (DAG). A cycle would require a vertex to come both before and after another."
            },
            {
              "q": "Why is 'shortest path' undefined on a graph that has a reachable negative-weight cycle?",
              "choices": [
                "You can loop the cycle again and again, driving the path cost toward $-\\infty$",
                "The graph becomes disconnected",
                "Dijkstra's priority queue overflows",
                "There are too many paths to enumerate"
              ],
              "answer": 0,
              "explain": "Each lap around a negative cycle lowers the total cost, so no finite minimum exists — the 'shortest' path is $-\\infty$. This is exactly the condition Bellman-Ford's extra relaxation pass detects."
            },
            {
              "q": "You need single-source shortest paths on a directed graph with some negative edge weights, but no negative cycle. Which algorithm should you use?",
              "choices": [
                "Breadth-first search",
                "Dijkstra",
                "Bellman-Ford",
                "Binary search"
              ],
              "answer": 2,
              "explain": "Dijkstra's greedy 'finalize the nearest vertex' step is unsafe with negative edges. Bellman-Ford relaxes all edges $|V|-1$ times and handles negative weights correctly (and can flag a negative cycle if one exists). BFS only handles unweighted graphs."
            }
          ],
          "flashcards": [
            {
              "front": "What does relaxing an edge $(u,v)$ do, and what invariant does it preserve?",
              "back": "If $d[u]+w(u,v)<d[v]$, set $d[v]=d[u]+w(u,v)$ and $\\pi[v]=u$. It only decreases estimates and preserves $d[v]\\ge\\delta(s,v)$ at all times (every $d[v]$ is the length of some real path or $\\infty$)."
            },
            {
              "front": "Dijkstra's correctness hinges on which assumption, and why?",
              "back": "Non-negative edge weights ($w\\ge0$). They guarantee that extending a path never lowers its cost, so the unfinalized vertex with the smallest estimate is already optimal — the greedy pop is safe."
            },
            {
              "front": "Time complexity of heap-based Dijkstra vs. Bellman-Ford vs. DAG shortest paths?",
              "back": "Dijkstra (binary heap): $O((V+E)\\log V)$. Bellman-Ford: $O(VE)$. DAG shortest paths (topo sort + one relaxation pass): $O(V+E)$."
            },
            {
              "front": "How does Bellman-Ford detect a negative-weight cycle?",
              "back": "After $|V|-1$ passes, run one more pass. If any edge can still be relaxed, a negative-weight cycle is reachable from the source (so some shortest paths are $-\\infty$)."
            },
            {
              "front": "Two ways to compute a topological order, and how each detects a cycle?",
              "back": "Kahn's: repeatedly emit in-degree-0 vertices; a cycle exists if fewer than $|V|$ are emitted. DFS: push vertices on finish (post-order), then reverse; a back edge to a GRAY vertex signals a cycle."
            },
            {
              "front": "Why can DAG shortest paths handle negative weights in linear time?",
              "back": "Processing vertices in topological order means every predecessor of $u$ is fully relaxed before $u$ is used, so $d[u]$ is final after one pass. Acyclicity replaces the non-negativity assumption Dijkstra needs."
            }
          ],
          "homework": [
            {
              "prompt": "Run Dijkstra from source $S$ on this directed graph and give the final distances and the shortest path to $T$. Edges: $S\\to A(2)$, $S\\to B(6)$, $A\\to B(3)$, $A\\to C(1)$, $C\\to B(1)$, $B\\to T(4)$, $C\\to T(8)$.",
              "hint": "Maintain the priority queue and finalize the smallest estimate each round. Watch for $d[B]$ being improved through $A$ then through $C$ before $B$ is finalized.",
              "solution": "Init d[S]=0, rest infinity. Pop S: d[A]=2, d[B]=6. Pop A (2): relax A->B gives 2+3=5<6 so d[B]=5; A->C gives 2+1=3 so d[C]=3. PQ has (3,C),(5,B),(6,B stale). Pop C (3): C->B gives 3+1=4<5 so d[B]=4; C->T gives 3+8=11 so d[T]=11. Pop B (4): B->T gives 4+4=8<11 so d[T]=8. Skip stale B entries. Pop T (8). Final: d[S]=0, d[A]=2, d[C]=3, d[B]=4, d[T]=8. Path to T: T<-B<-C<-A<-S, i.e. S->A->C->B->T (cost 2+1+1+4=8)."
            },
            {
              "prompt": "Construct the smallest graph you can (in number of edges) where Dijkstra returns an incorrect distance because of a negative edge, and explain precisely which finalization step is wrong.",
              "hint": "You need a vertex that gets finalized at a small value before a negative edge on a longer-looking route reaches it. Three vertices and three edges is enough.",
              "solution": "Vertices S, X, Y. Edges S->X(1), S->Y(2), Y->X(-3). True delta(S,X) = 2 + (-3) = -1 via S->Y->X. Dijkstra: pop S, set d[X]=1, d[Y]=2. The minimum unfinalized is X (1<2), so X is finalized at d[X]=1. Then Y is popped and relaxing Y->X computes 2-3=-1<1, but X is already finalized and never reopened, so Dijkstra outputs d[X]=1 instead of -1. The wrong step is finalizing X before the negative-edge route through Y was considered; non-negativity would have guaranteed no later route could beat 1."
            },
            {
              "prompt": "Given the DAG with edges $A\\to B(3)$, $A\\to C(6)$, $B\\to C(-4)$, $B\\to D(4)$, $C\\to D(-2)$, $C\\to E(5)$, $D\\to E(-1)$, first give a valid topological order, then compute shortest distances from $A$ to every vertex using DAG relaxation.",
              "hint": "Find a topo order (start from in-degree-0 vertex A), then relax outgoing edges of each vertex in that order. Negative weights are fine on a DAG.",
              "solution": "In-degrees: A:0, B:1, C:2, D:2, E:2. Topo order: A, B, C, D, E (A->B drops B to 0; B->C drops C to 1, B->D drops D to 1; C->D drops D to 0, C->E drops E to 1; D->E drops E to 0). Relax in order. d[A]=0. From A: d[B]=3, d[C]=6. From B (d=3): B->C gives 3-4=-1<6 so d[C]=-1; B->D gives 3+4=7 so d[D]=7. From C (d=-1): C->D gives -1-2=-3<7 so d[D]=-3; C->E gives -1+5=4 so d[E]=4. From D (d=-3): D->E gives -3-1=-4<4 so d[E]=-4. Final: d[A]=0, d[B]=3, d[C]=-1, d[D]=-3, d[E]=-4. Path to E: A->B->C->D->E."
            }
          ],
          "examples": [
            {
              "title": "Bellman-Ford on a graph with a negative edge",
              "body": "Run Bellman-Ford from source $S$ on the directed graph with edges $S\\to A\\ (6)$, $S\\to B\\ (7)$, $A\\to C\\ (5)$, $A\\to B\\ (-3)$, $B\\to C\\ (-4)$, and $C\\to A\\ (2)$. Fix the edge-processing order to be exactly that list, and report the final distances $d[\\cdot]$ after all passes. Then verify with the detection pass that there is no negative cycle.",
              "solution": "There are $|V|=4$ vertices, so we run $|V|-1=3$ relaxation passes, each sweeping the six edges in the given order. Recall a relaxation of $(u,v,w)$ fires only if $d[u]\\neq\\infty$ and $d[u]+w<d[v]$.\n\n<strong>Initialization.</strong> $d=\\{S:0,\\ A:\\infty,\\ B:\\infty,\\ C:\\infty\\}$.\n\n<strong>Pass 1.</strong>\n<ul>\n<li>$S\\to A\\ (6)$: $0+6=6<\\infty$, so $d[A]=6$.</li>\n<li>$S\\to B\\ (7)$: $0+7=7<\\infty$, so $d[B]=7$.</li>\n<li>$A\\to C\\ (5)$: $6+5=11<\\infty$, so $d[C]=11$.</li>\n<li>$A\\to B\\ (-3)$: $6+(-3)=3<7$, so $d[B]=3$.</li>\n<li>$B\\to C\\ (-4)$: $3+(-4)=-1<11$, so $d[C]=-1$.</li>\n<li>$C\\to A\\ (2)$: $-1+2=1<6$, so $d[A]=1$.</li>\n</ul>\nAfter pass 1: $d=\\{S:0,\\ A:1,\\ B:3,\\ C:-1\\}$.\n\n<strong>Pass 2.</strong>\n<ul>\n<li>$S\\to A\\ (6)$: $0+6=6\\not<1$. No change.</li>\n<li>$S\\to B\\ (7)$: $0+7=7\\not<3$. No change.</li>\n<li>$A\\to C\\ (5)$: $1+5=6\\not<-1$. No change.</li>\n<li>$A\\to B\\ (-3)$: $1+(-3)=-2<3$, so $d[B]=-2$.</li>\n<li>$B\\to C\\ (-4)$: $-2+(-4)=-6<-1$, so $d[C]=-6$.</li>\n<li>$C\\to A\\ (2)$: $-6+2=-4<1$, so $d[A]=-4$.</li>\n</ul>\nAfter pass 2: $d=\\{S:0,\\ A:-4,\\ B:-2,\\ C:-6\\}$.\n\n<strong>Pass 3.</strong>\n<ul>\n<li>$S\\to A\\ (6)$: $6\\not<-4$. $S\\to B\\ (7)$: $7\\not<-2$. $A\\to C\\ (5)$: $-4+5=1\\not<-6$. No change.</li>\n<li>$A\\to B\\ (-3)$: $-4+(-3)=-7<-2$, so $d[B]=-7$.</li>\n<li>$B\\to C\\ (-4)$: $-7+(-4)=-11<-6$, so $d[C]=-11$.</li>\n<li>$C\\to A\\ (2)$: $-11+2=-9<-4$, so $d[A]=-9$.</li>\n</ul>\nAfter pass 3: $d=\\{S:0,\\ A:-9,\\ B:-7,\\ C:-11\\}$.\n\n<strong>Detection pass.</strong> The estimates are <em>still</em> dropping after $|V|-1$ passes. Sweeping the edges once more, $A\\to B\\ (-3)$ gives $-9+(-3)=-12<-7$, which still relaxes. By the detection rule, this signals a <strong>negative-weight cycle reachable from $S$</strong>.\n\n<strong>Locating the cycle.</strong> Look at the loop $A\\to B\\to C\\to A$ with total weight $(-3)+(-4)+(2)=-5<0$. Each full lap around it shaves $5$ off the distances of $A,B,C$, so $\\delta(S,A)=\\delta(S,B)=\\delta(S,C)=-\\infty$ — no finite shortest path exists.\n\n<strong>Answer.</strong> Bellman-Ford does not converge; the detection pass fires, correctly reporting a negative-weight cycle $A\\to B\\to C\\to A$ of weight $-5$. The contrast with the intended outcome is the whole point: had we run only the $3$ passes and trusted the numbers $d=\\{A:-9,B:-7,C:-11\\}$, we would have reported nonsense. The extra $|V|$-th pass is what catches it."
            },
            {
              "title": "Critical path of a project via topological sort (DAG longest path)",
              "body": "A small build pipeline has tasks $S,A,B,C,D,T$ with durations encoded as edge weights. The dependency DAG has edges $S\\to A\\ (3)$, $S\\to B\\ (2)$, $A\\to C\\ (4)$, $B\\to C\\ (1)$, $B\\to D\\ (5)$, $C\\to T\\ (2)$, $D\\to T\\ (3)$. Find the longest (critical) path from $S$ to $T$ by topologically ordering the DAG and relaxing edges for <em>maximum</em> distance.",
              "solution": "Longest path on a DAG is shortest path with the comparison flipped: keep an estimate $\\ell[v]$ of the longest distance from $S$, initialize $\\ell[S]=0$ and $\\ell[v]=-\\infty$ otherwise, and relax with a $>$ test: if $\\ell[u]+w(u,v)>\\ell[v]$, set $\\ell[v]=\\ell[u]+w(u,v)$ and $\\pi[v]=u$. Processing vertices in topological order guarantees that when we reach $u$, every predecessor of $u$ is already final.\n\n<strong>Step 1: topological order (Kahn's).</strong> In-degrees: $S:0,\\ A:1,\\ B:1,\\ C:2,\\ D:1,\\ T:2$. Start queue $\\{S\\}$.\n<ul>\n<li>Pop $S$ (emit $S$): decrement $A\\to0$, $B\\to0$; enqueue $A,B$.</li>\n<li>Pop $A$ (emit $A$): decrement $C\\to1$.</li>\n<li>Pop $B$ (emit $B$): decrement $C\\to0$ (enqueue $C$), $D\\to0$ (enqueue $D$).</li>\n<li>Pop $C$ (emit $C$): decrement $T\\to1$.</li>\n<li>Pop $D$ (emit $D$): decrement $T\\to0$ (enqueue $T$).</li>\n<li>Pop $T$ (emit $T$).</li>\n</ul>\nAll $6$ vertices emitted, so the graph is acyclic. Order: $S, A, B, C, D, T$.\n\n<strong>Step 2: relax in that order (max version).</strong> Init $\\ell=\\{S:0,\\ A:-\\infty,\\ B:-\\infty,\\ C:-\\infty,\\ D:-\\infty,\\ T:-\\infty\\}$.\n<ul>\n<li>Process $S$ ($\\ell=0$): $S\\to A$: $0+3=3$, $\\ell[A]=3$, $\\pi[A]=S$. $S\\to B$: $0+2=2$, $\\ell[B]=2$, $\\pi[B]=S$.</li>\n<li>Process $A$ ($\\ell=3$): $A\\to C$: $3+4=7$, $\\ell[C]=7$, $\\pi[C]=A$.</li>\n<li>Process $B$ ($\\ell=2$): $B\\to C$: $2+1=3$, and $3\\not>7$, so $C$ unchanged. $B\\to D$: $2+5=7$, $\\ell[D]=7$, $\\pi[D]=B$.</li>\n<li>Process $C$ ($\\ell=7$): $C\\to T$: $7+2=9$, $\\ell[T]=9$, $\\pi[T]=C$.</li>\n<li>Process $D$ ($\\ell=7$): $D\\to T$: $7+3=10$, and $10>9$, so $\\ell[T]=10$, $\\pi[T]=D$.</li>\n<li>Process $T$ ($\\ell=10$): no outgoing edges.</li>\n</ul>\nFinal longest distances: $\\ell=\\{S:0,\\ A:3,\\ B:2,\\ C:7,\\ D:7,\\ T:10\\}$.\n\n<strong>Step 3: reconstruct the critical path.</strong> Follow predecessors back from $T$: $\\pi[T]=D$, $\\pi[D]=B$, $\\pi[B]=S$. So the critical path is $S\\to B\\to D\\to T$ with total length $2+5+3=10$.\n\n<strong>Answer.</strong> The critical path is $S\\to B\\to D\\to T$ of length $\\mathbf{10}$ — the minimum makespan of the whole project, since no schedule can finish faster than its longest dependency chain. Note the key moment at vertex $T$: the candidate via $C$ gave $9$, but the later-processed $D$ overrode it with $10$; because we visited vertices in topological order, both $\\ell[C]$ and $\\ell[D]$ were already final when $T$ used them, so a single linear pass sufficed — no $|V|-1$ sweeps and no non-negativity assumption needed."
            }
          ]
        },
        {
          "id": "a-mst-union-find",
          "title": "Minimum Spanning Trees and Union-Find",
          "minutes": 16,
          "content": "<h3>The Problem: Connecting Everything at Minimum Cost</h3>\n<p>Imagine you must lay fiber-optic cable to connect a set of data centers. Every potential link between two centers has a known installation cost, but you only need the network to be <em>connected</em> — every center reachable from every other. You do not need every possible link; you need the cheapest possible set of links that keeps the whole thing in one piece. This is the <strong>Minimum Spanning Tree (MST)</strong> problem, and it is one of the most beautiful entry points into the theory of greedy algorithms.</p>\n\n<p>Formally, let $G = (V, E)$ be a connected, undirected graph with a weight function $w: E \\to \\mathbb{R}$. A <strong>spanning tree</strong> is a subset $T \\subseteq E$ that (i) connects all vertices and (ii) contains no cycle. Such a $T$ always has exactly $|V| - 1$ edges. The <strong>minimum spanning tree</strong> is a spanning tree minimizing total weight:</p>\n$$w(T) = \\sum_{e \\in T} w(e).$$\n\n<p>Why a <em>tree</em>? Any connected subgraph with a cycle has a redundant edge: removing one edge of the cycle keeps the graph connected but lowers (or at worst preserves) cost. So an optimal connected subgraph is always acyclic — a tree. The MST captures the deep tension between two competing forces: <em>connectivity</em> (need enough edges) and <em>frugality</em> (want few, cheap edges).</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>An MST is the skeleton of a graph: the minimal set of relationships that holds everything together. This is exactly why MSTs appear in machine learning — single-linkage hierarchical clustering is <em>literally</em> Kruskal's algorithm, and the MST of a data cloud reveals its connectivity structure before any cluster boundaries are drawn.</p>\n</div>\n\n<h3>The Cut Property: One Theorem to Rule Them All</h3>\n<p>Both Kruskal's and Prim's algorithms are greedy — they repeatedly add the locally cheapest \"safe\" edge. Greedy algorithms are usually <em>wrong</em>; what makes them correct here is a single structural fact about MSTs called the <strong>cut property</strong>. Understanding it deeply means you never have to memorize the algorithms — you can rederive them.</p>\n\n<h4>Definitions</h4>\n<ul>\n<li>A <strong>cut</strong> $(S, V \\setminus S)$ is a partition of the vertices into two nonempty groups.</li>\n<li>An edge <strong>crosses</strong> the cut if it has one endpoint in $S$ and the other in $V \\setminus S$.</li>\n<li>A set of edges $A$ <strong>respects</strong> a cut if no edge of $A$ crosses it.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">The Cut Property</div>\n<p>Let $A$ be a subset of edges contained in <em>some</em> MST. Take any cut that $A$ respects, and let $e$ be a <strong>minimum-weight edge crossing that cut</strong>. Then $A \\cup \\{e\\}$ is also contained in some MST. We call such an $e$ a <strong>safe edge</strong>.</p>\n</div>\n\n<h4>Why it is true (exchange argument)</h4>\n<p>Suppose $A$ lies in some MST $T$. If the light crossing edge $e$ is already in $T$, we are done. Otherwise, adding $e$ to $T$ creates exactly one cycle (a tree plus one edge always has one cycle). That cycle must cross the cut at least twice — it leaves $S$ via $e$ and must return — so there is some <em>other</em> edge $e'$ on the cycle that also crosses the cut. Since $A$ respects the cut, $e' \\notin A$. Now exchange: $T' = T \\setminus \\{e'\\} \\cup \\{e\\}$ is still a spanning tree (we removed an edge from a cycle, preserving connectivity). Its weight is</p>\n$$w(T') = w(T) - w(e') + w(e) \\le w(T),$$\n<p>because $e$ is a minimum crossing edge so $w(e) \\le w(e')$. Since $T$ is an MST, $w(T') \\ge w(T)$, forcing $w(T') = w(T)$. Thus $T'$ is also an MST, and it contains $A \\cup \\{e\\}$. $\\blacksquare$</p>\n\n<p>This exchange argument is the engine. Every MST algorithm is a different strategy for repeatedly choosing a cut and grabbing its lightest crossing edge.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>There is a dual, the <strong>cycle property</strong>: the unique maximum-weight edge on any cycle is in <em>no</em> MST. Cut property says \"the lightest edge across a cut is in.\" Cycle property says \"the heaviest edge on a cycle is out.\" Together they give a complete characterization, and a useful corollary: <strong>if all edge weights are distinct, the MST is unique.</strong></p>\n</div>\n\n<h3>Kruskal's Algorithm: Greedy on Edges</h3>\n<p>Kruskal's strategy: consider edges in increasing order of weight, and add each edge if and only if it does not create a cycle.</p>\n\n<pre><code>sort E by weight ascending\nA = {}                       # the growing forest\nfor each (u, v) in sorted E:\n    if find(u) != find(v):   # u and v in different components\n        A = A ∪ {(u,v)}\n        union(u, v)\nreturn A</code></pre>\n\n<p><strong>Why it is correct.</strong> When we consider the lightest remaining edge $(u,v)$ and $u, v$ are in different components, consider the cut separating $u$'s current component from the rest of the graph. The current forest $A$ respects this cut (no edge of $A$ crosses it, by definition of \"component\"). Every edge already examined and rejected was heavier, so $(u,v)$ is a minimum-weight edge crossing this cut. By the cut property, it is safe. If $u, v$ are in the same component, adding the edge would form a cycle, so we skip it (cycle property guarantees we lose nothing).</p>\n\n<p>The bottleneck is sorting: $O(E \\log E) = O(E \\log V)$ (since $E \\le V^2$, $\\log E \\le 2\\log V$). The cycle checks are handled by union-find, which we will see is nearly free.</p>\n\n<h3>Prim's Algorithm: Greedy on Vertices</h3>\n<p>Prim's strategy: grow a <em>single</em> tree from an arbitrary start vertex. At each step, add the cheapest edge connecting the tree to a vertex outside it.</p>\n\n<pre><code>pick start vertex r; tree S = {r}\nmaintain a priority queue keyed by:\n    key[v] = min weight of an edge from v into S  (∞ if none)\nwhile S != V:\n    u = extract-min vertex not in S\n    add u (and its connecting edge) to the tree\n    for each neighbor v of u not in S:\n        if w(u,v) < key[v]:\n            key[v] = w(u,v); parent[v] = u</code></pre>\n\n<p><strong>Why it is correct.</strong> Take the cut $(S, V \\setminus S)$ where $S$ is the current tree. The tree edges all lie inside $S$, so the partial tree respects this cut. Prim's explicitly extracts the minimum-weight edge crossing it — the safe edge — over and over. Same theorem, different cut.</p>\n\n<p><strong>Complexity</strong> depends on the priority queue. With a binary heap: $O(E \\log V)$, matching Kruskal. With a Fibonacci heap (decrease-key in $O(1)$ amortized): $O(E + V \\log V)$, which is asymptotically better for dense graphs. For a complete graph stored as an adjacency matrix, a simple array-based Prim runs in $O(V^2)$, beating the heap version when $E = \\Theta(V^2)$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Kruskal grows a <em>forest</em> of many fragments that gradually merge — it is \"global,\" picking the cheapest legal edge anywhere. Prim grows <em>one</em> connected blob outward — it is \"local,\" like Dijkstra's shortest-path algorithm. In fact Prim and Dijkstra are nearly the same code; they differ only in the key (Prim: edge weight to frontier; Dijkstra: accumulated distance from source).</p>\n</div>\n\n<h3>Union-Find: Making Kruskal Fast</h3>\n<p>Kruskal needs to answer, repeatedly: \"are $u$ and $v$ already connected?\" and \"merge their components.\" This is the <strong>disjoint-set</strong> (union-find) abstract data type with three operations:</p>\n<ul>\n<li><code>make_set(x)</code> — create a singleton component containing $x$.</li>\n<li><code>find(x)</code> — return a canonical <em>representative</em> of $x$'s component (two elements are connected iff they have the same representative).</li>\n<li><code>union(x, y)</code> — merge the two components containing $x$ and $y$.</li>\n</ul>\n\n<p>The standard implementation represents each component as a rooted tree, where every node points to its parent and the root points to itself. <code>find</code> walks to the root; <code>union</code> attaches one root under the other. Naively, these trees can degenerate into long chains, making <code>find</code> cost $O(n)$. Two optimizations fix this completely.</p>\n\n<h4>Optimization 1: Union by Rank</h4>\n<p>Keep an integer <code>rank</code> for each root, an upper bound on its tree's height. When merging, <strong>attach the lower-rank root under the higher-rank root</strong>. This keeps trees bushy. If the two ranks are equal, pick either as the new root and increment its rank by 1.</p>\n<pre><code>union(x, y):\n    rx, ry = find(x), find(y)\n    if rx == ry: return\n    if rank[rx] < rank[ry]: swap(rx, ry)\n    parent[ry] = rx\n    if rank[rx] == rank[ry]: rank[rx] += 1</code></pre>\n<p>Alone, union by rank bounds tree height at $O(\\log n)$, because a root of rank $k$ governs a subtree of at least $2^k$ nodes (provable by induction). So <code>find</code> becomes $O(\\log n)$.</p>\n\n<h4>Optimization 2: Path Compression</h4>\n<p>During a <code>find</code>, after locating the root, make every node on the traversed path point <em>directly</em> to the root. Future <code>find</code>s on those nodes are then $O(1)$.</p>\n<pre><code>find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])   # recursive: flatten on the way back up\n    return parent[x]</code></pre>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>With <strong>both</strong> union by rank and path compression, any sequence of $m$ operations on $n$ elements runs in $O(m\\,\\alpha(n))$ time, where $\\alpha$ is the <strong>inverse Ackermann function</strong>. For every $n$ that could ever physically exist ($n < 2^{65536}$, say), $\\alpha(n) \\le 4$. So each operation is, for all practical purposes, <strong>constant time</strong> — though not literally $O(1)$ in the worst case.</p>\n</div>\n\n<p>Note: when using path compression, <code>rank</code> is no longer an exact height (compression shortens paths), so we call it \"rank,\" not \"height.\" It remains a valid upper bound and the analysis still holds.</p>\n\n<h3>Worked Example: One Graph, Both Algorithms, Live Union-Find</h3>\n<p>Consider 6 vertices $\\{A,B,C,D,E,F\\}$ with these weighted edges:</p>\n<pre><code>A-B: 4    A-C: 4    B-C: 2    C-D: 3\nD-E: 2    C-E: 4    D-F: 3    E-F: 3</code></pre>\n\n<h4>Kruskal, edge by edge (with union-find state)</h4>\n<p>Sort edges ascending: B-C(2), D-E(2), C-D(3), D-F(3), E-F(3), A-B(4), A-C(4), C-E(4).</p>\n<ol>\n<li><strong>B-C (2):</strong> find(B)=B, find(C)=C, different. <em>Add.</em> Union: ranks equal (0,0), make C root, rank[C]=1. Sets: {B,C}, {A}, {D}, {E}, {F}.</li>\n<li><strong>D-E (2):</strong> different. <em>Add.</em> Make E root, rank[E]=1. Sets: {B,C}, {D,E}, {A}, {F}.</li>\n<li><strong>C-D (3):</strong> find(C)=C (rank 1), find(D)=E (rank 1). Different. <em>Add.</em> Equal ranks, attach E under C, rank[C]=2. Sets: {B,C,D,E}, {A}, {F}.</li>\n<li><strong>D-F (3):</strong> find(D): D→E→C, root C (rank 2); find(F)=F (rank 0). Different. <em>Add.</em> F under C. Sets: {B,C,D,E,F}, {A}.</li>\n<li><strong>E-F (3):</strong> find(E)=C, find(F)=C. <em>Same component — skip</em> (would make a cycle).</li>\n<li><strong>A-B (4):</strong> find(A)=A, find(B)=C. Different. <em>Add.</em> A under C. Now all 6 vertices joined; we have $6-1=5$ edges. <strong>Stop.</strong></li>\n</ol>\n<p>MST edges: <code>B-C, D-E, C-D, D-F, A-B</code>, total weight $2+2+3+3+4 = 14$.</p>\n\n<h4>Path-compression effect, made concrete</h4>\n<p>Right after step 3 the structure of the big tree is: <code>C</code> is root; <code>B</code> and <code>E</code> point to <code>C</code>; and <code>D</code> still points to <code>E</code> (so the path D→E→C has length 2, since step 2 made D point to E and step 3 only re-rooted E under C). When step 4 processes edge D-F, it calls <code>find(D)</code>, which walks D→E→C, finds root C, then <strong>rewires D's parent directly to C</strong>. The chain collapses. A subsequent <code>find(D)</code> is now a single hop. This is the path-compression payoff: the very first deep lookup pays to flatten the path for everyone behind it.</p>\n\n<h4>Prim, starting from A</h4>\n<p>Grow one tree from $A$. Keys track the cheapest edge from each outside vertex into the tree.</p>\n<ol>\n<li>Start $S=\\{A\\}$. Edges from A: A-B(4), A-C(4). keys: B=4, C=4, others ∞.</li>\n<li>Tie between B and C at 4; pick <strong>B</strong>. Add edge A-B(4). $S=\\{A,B\\}$. Update from B: B-C(2) &lt; 4, so key[C]=2.</li>\n<li>Min outside is <strong>C</strong> at 2. Add edge B-C(2). $S=\\{A,B,C\\}$. Update from C: C-D(3)→key[D]=3, C-E(4)→key[E]=4.</li>\n<li>Min is <strong>D</strong> at 3. Add edge C-D(3). $S=\\{A,B,C,D\\}$. From D: D-E(2)&lt;4→key[E]=2, D-F(3)→key[F]=3.</li>\n<li>Min is <strong>E</strong> at 2. Add edge D-E(2). $S=\\{A,B,C,D,E\\}$. From E: E-F(3) ties key[F]=3, no improvement.</li>\n<li>Min is <strong>F</strong> at 3. Add edge D-F(3) (the edge that set key[F]). Done.</li>\n</ol>\n<p>Prim's MST: <code>A-B, B-C, C-D, D-E, D-F</code>, total $4+2+3+2+3 = 14$. Same weight as Kruskal — as it must be — even though the edge sets differ slightly (Kruskal took D-E and A-B; both trees are valid MSTs because the weight-3 edges among C-D, D-F, E-F created ties). With distinct weights they would be identical.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Connections to ML / AI</div>\n<p>Union-find is the backbone of <strong>connected-component labeling</strong> in computer vision and of incremental graph clustering. Kruskal's MST <em>is</em> single-linkage agglomerative clustering: cutting the $k-1$ heaviest MST edges yields $k$ clusters, which is exactly what single-linkage does. MSTs also underlie efficient graph-based methods like Felzenszwalb image segmentation, manifold-learning preprocessing (sparse neighborhood graphs), and approximation algorithms (e.g., the 2-approximation for metric TSP builds an MST and shortcuts an Euler tour). The cut/exchange-argument template you learned here is the same proof skeleton used to justify many greedy ML heuristics.</p>\n</div>\n\n<h3>Summary</h3>\n<ul>\n<li>An MST is a minimum-weight connected acyclic edge set; it has $|V|-1$ edges.</li>\n<li>The <strong>cut property</strong> (proved by an exchange argument) justifies all greedy MST algorithms: the lightest edge crossing any respected cut is safe.</li>\n<li><strong>Kruskal</strong>: sort edges, add if no cycle ($O(E\\log V)$), cycle-checks via union-find. <strong>Prim</strong>: grow one tree via a priority queue ($O(E\\log V)$ with a binary heap, $O(E + V\\log V)$ with a Fibonacci heap).</li>\n<li><strong>Union-find</strong> with union by rank + path compression gives $O(\\alpha(n))$ amortized per operation — effectively constant.</li>\n<li>MSTs are deeply tied to ML: single-linkage clustering, segmentation, and metric TSP approximation.</li>\n</ul>",
          "mcq": [
            {
              "q": "Why does the cut property require $e$ to be a minimum-weight edge crossing a cut that the current edge set $A$ *respects* (no edge of $A$ crosses it)?",
              "choices": [
                "Because otherwise $A$ would already be a complete spanning tree",
                "Because the exchange argument swaps $e$ for another crossing edge $e'$ that must lie outside $A$; if $A$ crossed the cut, $e'$ could be in $A$ and removing it would break the partial solution",
                "Because edges in $A$ are always heavier than $e$",
                "Because respecting the cut guarantees the graph stays connected"
              ],
              "answer": 1,
              "explain": "The proof adds $e$, finds the resulting cycle, and removes another crossing edge $e'$. Respecting the cut ensures $e' \\notin A$, so the swap preserves all of $A$ inside the new MST."
            },
            {
              "q": "On a *complete* graph with $V$ vertices (so $E = \\Theta(V^2)$), which MST approach has the best asymptotic running time?",
              "choices": [
                "Kruskal at $O(E \\log V) = O(V^2 \\log V)$",
                "Prim with a binary heap at $O(E \\log V) = O(V^2 \\log V)$",
                "Prim with an array/adjacency-matrix scan at $O(V^2)$, or Prim with a Fibonacci heap at $O(E + V\\log V) = O(V^2)$",
                "All approaches are $O(V^2)$ because the graph is dense"
              ],
              "answer": 2,
              "explain": "For dense graphs, array-based Prim ($O(V^2)$) and Fibonacci-heap Prim ($O(E + V\\log V) = O(V^2)$) beat the $O(V^2\\log V)$ of Kruskal or binary-heap Prim."
            },
            {
              "q": "Union-find uses union by rank AND path compression. Which statement about the resulting `rank` field is correct?",
              "choices": [
                "After path compression, rank equals the exact height of the tree",
                "Rank remains a valid upper bound on height even though path compression makes it no longer the exact height",
                "Rank counts the number of nodes in the component",
                "Rank must be recomputed after every path compression to stay correct"
              ],
              "answer": 1,
              "explain": "Path compression shortens paths without updating ranks, so rank overestimates the true height — but it stays a valid upper bound, which is all the analysis needs."
            },
            {
              "q": "Why is the MST guaranteed to be *unique* when all edge weights are distinct?",
              "choices": [
                "Because Kruskal and Prim always produce the same edge set regardless of weights",
                "Because with distinct weights every cut has a strictly lightest crossing edge and every cycle a strictly heaviest edge, so the cut/cycle properties force each edge's membership deterministically",
                "Because distinct weights make the graph complete",
                "Because uniqueness follows from there being exactly $V-1$ edges"
              ],
              "answer": 1,
              "explain": "Distinctness removes all ties: each cut has one strictly minimum crossing edge (must be in) and each cycle one strictly maximum edge (must be out), pinning down a single MST."
            },
            {
              "q": "A connected, undirected graph $G=(V,E)$ has $|V|=12$ vertices. How many edges does any spanning tree of $G$ contain, and why?",
              "choices": [
                "12 edges, since every vertex needs its own connecting edge",
                "11 edges, because a tree on $n$ vertices is connected and acyclic, forcing exactly $n-1$ edges",
                "It depends on $|E|$, since more edges in $G$ allow larger spanning trees",
                "13 edges, one per vertex plus one to close the structure"
              ],
              "answer": 1,
              "explain": "A spanning tree connects all $n$ vertices with no cycle, which forces exactly $n-1 = 11$ edges regardless of how many edges the original graph has."
            },
            {
              "q": "The lesson argues an optimal connected subgraph must be acyclic. What is the core reasoning?",
              "choices": [
                "A cycle always contains the single most expensive edge in the entire graph, so it can never be optimal",
                "Any cycle contains an edge whose removal keeps the graph connected while not increasing total cost, so cycles are never necessary for a minimum-cost connected subgraph",
                "Cycles make the graph disconnected, violating the spanning requirement",
                "Acyclic graphs are always cheaper to compute, so they are chosen for efficiency rather than optimality"
              ],
              "answer": 1,
              "explain": "Removing one edge of any cycle preserves connectivity but never increases cost, so an optimal connected subgraph can always be made acyclic, i.e., a tree."
            },
            {
              "q": "Given a cut $(S, V\\setminus S)$ and a set of edges $A$ contained in some MST, the cut property lets us safely add the minimum-weight crossing edge $e$ provided $A$ \"respects\" the cut. What does it mean that $A$ respects the cut?",
              "choices": [
                "Every edge of $A$ crosses the cut exactly once",
                "No edge of $A$ has one endpoint in $S$ and the other in $V\\setminus S$",
                "$A$ contains the minimum-weight edge crossing the cut",
                "$A$ spans all vertices in $S$ but none in $V\\setminus S$"
              ],
              "answer": 1,
              "explain": "$A$ respects the cut precisely when none of its edges crosses it, i.e., no edge of $A$ has one endpoint in $S$ and the other in $V\\setminus S$."
            },
            {
              "q": "The lesson notes that single-linkage hierarchical clustering is \"literally Kruskal's algorithm.\" What does this correspondence most directly imply?",
              "choices": [
                "The MST edges, processed in increasing weight order, trace the sequence in which clusters merge under single-linkage",
                "Single-linkage clustering requires computing the maximum spanning tree of the data cloud",
                "Each cluster corresponds to a distinct cut that no MST edge respects",
                "Clustering quality is optimized only when all pairwise distances are equal"
              ],
              "answer": 0,
              "explain": "Kruskal adds edges from cheapest to most expensive, each union merging two components, which exactly mirrors single-linkage merging the two closest clusters at each step."
            },
            {
              "q": "You run Kruskal on a graph and, partway through, you examine edge $e=(u,v)$ with $u$ and $v$ already in the same component. The lesson says skipping $e$ \"loses nothing\" and cites the cycle property. Which statement justifies the skip most precisely?",
              "choices": [
                "Adding $e$ would create a cycle, and since every earlier (lighter) edge on that cycle was already accepted, $e$ is the unique maximum-weight edge on the cycle, so it is in no MST",
                "Adding $e$ would create a cycle, and any edge that closes a cycle is automatically the heaviest globally",
                "$e$ must be skipped because $u$ and $v$ being connected means $e$ has weight $0$",
                "Skipping $e$ is a heuristic that usually works but can occasionally miss the true MST"
              ],
              "answer": 0,
              "explain": "Because Kruskal processes edges in increasing weight order, every other edge on the cycle $e$ would close was accepted earlier and is therefore $\\le w(e)$, making $e$ a maximum-weight edge on that cycle; the cycle property says such an edge is in no MST. It is the heaviest on *that* cycle, not necessarily globally, and the rule is exact, not heuristic."
            },
            {
              "q": "Prim's loop is famously \"nearly the same code\" as Dijkstra's, differing only in the key it minimizes. A student sets $\\text{key}[v]$ to the *accumulated distance from the start vertex along the tree* (Dijkstra-style) instead of the weight of the single cheapest edge from $v$ into the current tree. What goes wrong?",
              "choices": [
                "Nothing — both keys produce the same tree because the start vertex is arbitrary",
                "The algorithm now computes a shortest-path tree rooted at the start, which generally is not a minimum spanning tree",
                "It still finds an MST but runs slower by a $\\log V$ factor",
                "It fails to terminate because accumulated distances can grow without bound"
              ],
              "answer": 1,
              "explain": "Using accumulated distance from the source turns Prim into Dijkstra, which builds a shortest-path tree minimizing path lengths from one vertex, not total edge weight. The two trees differ in general (a shortest-path tree need not be an MST), so the result is simply the wrong optimization target."
            },
            {
              "q": "Using only union by rank (no path compression), the lesson states a tree whose root has rank $k$ contains at least $2^k$ nodes. From this fact, what is the tightest worst-case bound on the height of any union-find tree built over $n$ elements, and why?",
              "choices": [
                "$O(\\sqrt{n})$, because rank grows like the square root of the subtree size",
                "$O(n)$, because chains can still form when ranks happen to be equal",
                "$O(\\alpha(n))$, the inverse-Ackermann bound, which holds even without path compression",
                "$O(\\log n)$, because a root of rank $k$ needs $\\ge 2^k$ nodes, so $2^k \\le n$ forces $k \\le \\log_2 n$, and height never exceeds rank"
              ],
              "answer": 3,
              "explain": "Since a rank-$k$ root governs $\\ge 2^k$ nodes, $2^k \\le n$ gives $k \\le \\log_2 n$; because height is bounded by rank, every tree has height $O(\\log n)$. The $O(\\alpha(n))$ bound is amortized and requires path compression too, so it does not apply to union-by-rank alone."
            },
            {
              "q": "In the lesson's worked example, Kruskal returned edges $\\{$B-C, D-E, C-D, D-F, A-B$\\}$ while Prim (from A) returned $\\{$A-B, B-C, C-D, D-E, D-F$\\}$ — different edge sets, both of total weight 14. What does this most directly demonstrate?",
              "choices": [
                "The graph has multiple distinct MSTs because some edge weights are tied, so a graph's MST need not be unique unless all weights are distinct",
                "One of the two algorithms made an error, since a correct MST is always unique",
                "Kruskal and Prim optimize different objectives, so their outputs are expected to differ in weight",
                "The difference proves the graph is disconnected"
              ],
              "answer": 0,
              "explain": "The graph has tied weight-3 edges (C-D, D-F, E-F), so more than one spanning tree achieves the minimum total weight 14; both outputs are valid MSTs. Uniqueness is guaranteed only when all edge weights are distinct, and both algorithms always return optima of equal weight."
            },
            {
              "q": "Kruskal's algorithm builds a minimum spanning tree by…",
              "choices": [
                "running a depth-first search from each vertex",
                "growing a single tree outward from a start vertex",
                "repeatedly removing the heaviest edges from the graph",
                "sorting the edges by weight and adding the next-cheapest edge that doesn't form a cycle"
              ],
              "answer": 3,
              "explain": "Kruskal is edge-centric: consider edges from cheapest to most expensive, take an edge if its endpoints are in different components (no cycle), and stop once $V-1$ edges are chosen. The cut/cycle properties guarantee the result is an MST."
            },
            {
              "q": "Prim's algorithm builds a minimum spanning tree by…",
              "choices": [
                "growing one tree, repeatedly adding the cheapest edge that connects the tree to a new vertex",
                "sorting all edges first and adding them in order",
                "deleting cycles from the graph one at a time",
                "doing a breadth-first search from the lightest vertex"
              ],
              "answer": 0,
              "explain": "Prim is vertex-centric: start from any vertex and repeatedly attach the cheapest edge crossing from the in-tree set to an outside vertex (a min-priority-queue does this efficiently). Kruskal sorts edges globally; Prim grows one connected tree."
            },
            {
              "q": "In Kruskal's algorithm, what is the union-find (disjoint-set) data structure used for?",
              "choices": [
                "Storing each edge's weight",
                "Sorting the edges by weight",
                "Quickly testing whether two vertices are already in the same component — i.e. whether adding an edge would form a cycle",
                "Computing shortest paths between vertices"
              ],
              "answer": 2,
              "explain": "Each `find` tells you which component a vertex is in; if both endpoints of an edge share a component, adding it would close a cycle, so it's skipped. `union` merges components when an edge is accepted. With union-by-rank + path compression these run in near-constant amortized time."
            },
            {
              "q": "By definition, a minimum spanning tree minimizes which quantity?",
              "choices": [
                "The number of edges in the tree",
                "The total weight of the edges in a tree that connects (spans) all the vertices",
                "The length of the longest shortest-path in the graph",
                "The graph's diameter"
              ],
              "answer": 1,
              "explain": "An MST is a spanning tree (connects all $V$ vertices, no cycles, exactly $V-1$ edges) whose <em>sum</em> of edge weights is as small as possible. The edge count is fixed at $V-1$ for any spanning tree, so it's the total weight that's being optimized."
            }
          ],
          "flashcards": [
            {
              "front": "State the cut property for MSTs.",
              "back": "If an edge set $A$ is contained in some MST and a cut respects $A$ (no edge of $A$ crosses it), then a minimum-weight edge crossing that cut is 'safe': $A \\cup \\{e\\}$ is also contained in some MST."
            },
            {
              "front": "What proof technique justifies the cut property?",
              "back": "An exchange argument: add the light crossing edge $e$ to an MST $T$, this creates one cycle with another crossing edge $e'$ not in $A$; swap $e$ for $e'$. Since $w(e) \\le w(e')$, the result is still an MST containing $A \\cup \\{e\\}$."
            },
            {
              "front": "Kruskal vs. Prim: one-line summary of each strategy.",
              "back": "Kruskal: sort all edges, add the cheapest edge that doesn't form a cycle (grows a forest, cycle-check via union-find). Prim: grow one tree from a start vertex, repeatedly add the cheapest edge leaving the tree (via a priority queue)."
            },
            {
              "front": "Amortized cost of union-find with union by rank + path compression, and the practical value of the bound?",
              "back": "$O(\\alpha(n))$ per operation, where $\\alpha$ is the inverse Ackermann function. For any realistic $n$, $\\alpha(n) \\le 4$, so operations are effectively constant time."
            },
            {
              "front": "What does path compression do during find(x)?",
              "back": "After walking to the root, it rewires every node on the traversed path to point directly to the root, flattening the tree so future find calls on those nodes are O(1)."
            },
            {
              "front": "How does Kruskal's MST relate to a clustering method?",
              "back": "It is single-linkage agglomerative clustering: removing the $k-1$ heaviest MST edges partitions the vertices into $k$ single-linkage clusters."
            }
          ],
          "homework": [
            {
              "prompt": "Given vertices $\\{1,2,3,4,5\\}$ and edges 1-2:1, 2-3:3, 1-3:2, 3-4:4, 4-5:1, 3-5:5, run Kruskal's algorithm. List the MST edges in the order added, the rejected edge(s), and the total weight.",
              "hint": "Sort edges ascending and use union-find to detect cycles. Stop once you have $V-1 = 4$ edges. An edge is rejected exactly when both endpoints already share a representative.",
              "solution": "Sorted: 1-2(1), 4-5(1), 1-3(2), 2-3(3), 3-4(4), 3-5(5). Step 1: 1-2(1) add → {1,2}. Step 2: 4-5(1) add → {4,5}. Step 3: 1-3(2) add → {1,2,3}. Step 4: 2-3(3): find(2)=find(3) same component → REJECT (cycle). Step 5: 3-4(4) add → {1,2,3,4,5}; now 4 edges, done (3-5 never examined or would also be rejected). MST edges in order: 1-2, 4-5, 1-3, 3-4. Total weight = 1+1+2+4 = 8. Rejected: 2-3 (and 3-5 unnecessary)."
            },
            {
              "prompt": "Start with singletons {1},...,{8}, all rank 0. Perform: union(1,2), union(3,4), union(5,6), union(7,8), union(1,3), union(5,7), union(1,5), then find(8). Using union by rank (attach lower rank under higher; equal ranks bump the survivor's rank by 1) and path compression, give the final parent pointers and the rank of the overall root, and explain what path compression does during find(8).",
              "hint": "Track each root's rank as you merge. Equal-rank unions increase rank. The last find should collapse the path from 8 up to the global root.",
              "solution": "union(1,2): equal ranks, root 1, rank[1]=1. Similarly root 3 (rank 1), root 5 (rank 1), root 7 (rank 1). union(1,3): roots 1 and 3 both rank 1 → attach 3 under 1, rank[1]=2. union(5,7): both rank 1 → attach 7 under 5, rank[5]=2. union(1,5): roots 1 and 5 both rank 2 → attach 5 under 1, rank[1]=3. Global root is 1 with rank 3. Before find(8): 8→7→5→1 (since 7 was attached under 5, and 5 under 1). find(8) walks 8→7→5→1, returns root 1, and path compression rewires 8, 7, and 5 to point directly to 1. Final: parent[1]=1 (root, rank 3); parent[2]=parent[3]=parent[5]=parent[7]=parent[8]=1; parent[4]=3 (untouched); parent[6]=5 (untouched, and 5 now points to 1). Path compression flattened the 8→7→5→1 chain into direct links to 1."
            },
            {
              "prompt": "Prove the cycle property: in a connected weighted graph, if edge $e$ is the unique maximum-weight edge on some cycle $C$, then $e$ belongs to no MST.",
              "hint": "Assume for contradiction an MST $T$ contains $e$. Removing $e$ splits $T$ into two components; use the cycle to find a cheaper reconnecting edge.",
              "solution": "Suppose some MST $T$ contains $e = (u,v)$. Removing $e$ from $T$ splits it into two subtrees, inducing a cut $(S, V\\setminus S)$ with $u \\in S$, $v \\in V\\setminus S$. The cycle $C$ contains $e$, so traversing $C$ from $u$ to $v$ the 'other way' (not through $e$) must cross the cut at least once at some edge $e' \\ne e$ on $C$. Because $e$ is the *unique* maximum-weight edge of $C$, we have $w(e') < w(e)$. Form $T' = T \\setminus \\{e\\} \\cup \\{e'\\}$: removing $e$ disconnected the two sides and $e'$ crosses the same cut, so $T'$ is again a spanning tree, with $w(T') = w(T) - w(e) + w(e') < w(T)$. This contradicts $T$ being minimum. Hence no MST contains $e$. $\\blacksquare$"
            }
          ],
          "examples": [
            {
              "title": "Tracing Kruskal with Union-Find on a 5-vertex graph",
              "body": "Run Kruskal's algorithm on the undirected weighted graph with vertices $\\{A,B,C,D,E\\}$ and edges $AB{=}1$, $CD{=}2$, $AC{=}3$, $BD{=}4$, $DE{=}5$, $BC{=}6$, $AE{=}7$. Use a union-find (disjoint-set) structure and show the components and accepted edge set after processing each edge, then give the MST weight.",
              "solution": "Kruskal sorts edges by weight and greedily accepts an edge iff its two endpoints lie in <em>different</em> components (otherwise it would close a cycle). The union-find tracks components: $\\texttt{find}(v)$ returns $v$'s component representative, and we accept exactly when $\\texttt{find}(u) \\ne \\texttt{find}(v)$, then $\\texttt{union}$ them.\n\nSorted edge order: $AB(1),\\ CD(2),\\ AC(3),\\ BD(4),\\ DE(5),\\ BC(6),\\ AE(7)$.\n\nInitial components (each vertex alone): $\\{A\\},\\{B\\},\\{C\\},\\{D\\},\\{E\\}$. Accepted set $T=\\varnothing$.\n\n1. $AB(1)$: $\\texttt{find}(A)=A \\ne B=\\texttt{find}(B)$ → <strong>accept</strong>, union. Components: $\\{A,B\\},\\{C\\},\\{D\\},\\{E\\}$. $T=\\{AB\\}$.\n2. $CD(2)$: $C \\ne D$ → <strong>accept</strong>, union. Components: $\\{A,B\\},\\{C,D\\},\\{E\\}$. $T=\\{AB,CD\\}$.\n3. $AC(3)$: $\\texttt{find}(A)$ gives $\\{A,B\\}$, $\\texttt{find}(C)$ gives $\\{C,D\\}$ — different → <strong>accept</strong>, union. Components: $\\{A,B,C,D\\},\\{E\\}$. $T=\\{AB,CD,AC\\}$.\n4. $BD(4)$: $\\texttt{find}(B)$ and $\\texttt{find}(D)$ are both in $\\{A,B,C,D\\}$ — same component → <strong>reject</strong> (would create cycle $A\\!-\\!B\\!-\\!D\\!-\\!C\\!-\\!A$). Components unchanged.\n5. $DE(5)$: $\\texttt{find}(D)=\\{A,B,C,D\\}$, $\\texttt{find}(E)=\\{E\\}$ — different → <strong>accept</strong>, union. Components: $\\{A,B,C,D,E\\}$. $T=\\{AB,CD,AC,DE\\}$.\n\nWe now have $|V|-1 = 4$ edges and one component, so we can stop; the remaining edges $BC(6)$ and $AE(7)$ would both be rejected (endpoints already connected).\n\nThe MST is $T=\\{AB, CD, AC, DE\\}$ with total weight $$w(T) = 1+2+3+5 = 11.$$"
            },
            {
              "title": "Union by rank with path compression, and a cut-property check",
              "body": "Starting from singletons $\\{0\\},\\{1\\},\\dots,\\{6\\}$, perform $\\texttt{union}(0,1)$, $\\texttt{union}(2,3)$, $\\texttt{union}(0,2)$, $\\texttt{union}(4,5)$, $\\texttt{union}(0,4)$ using union by rank (ties: second root becomes parent). Then run $\\texttt{find}(3)$ with path compression and show the parent array. Finally, for the same vertex set with edges $\\{01{=}2,\\ 23{=}2,\\ 02{=}9,\\ 13{=}4\\}$, use the cut property to decide whether edge $02$ can be in any MST.",
              "solution": "We track the parent array $p[\\,]$ (a root has $p[i]=i$) and the rank array (an upper bound on tree height). Rule: attach the lower-rank root under the higher-rank one; on a tie, attach the first argument's root under the second's and increment the winner's rank.\n\nStart: $p=[0,1,2,3,4,5,6]$, all ranks $0$.\n\n1. $\\texttt{union}(0,1)$: roots $0,1$, equal rank $0$ → $p[0]=1$, $\\text{rank}[1]=1$. Now $p=[1,1,2,3,4,5,6]$.\n2. $\\texttt{union}(2,3)$: roots $2,3$, equal rank → $p[2]=3$, $\\text{rank}[3]=1$. $p=[1,1,3,3,4,5,6]$.\n3. $\\texttt{union}(0,2)$: $\\texttt{find}(0)=1$ (rank $1$), $\\texttt{find}(2)=3$ (rank $1$), tie → root of first ($1$) goes under root of second ($3$): $p[1]=3$, $\\text{rank}[3]=2$. $p=[1,3,3,3,4,5,6]$.\n4. $\\texttt{union}(4,5)$: equal rank → $p[4]=5$, $\\text{rank}[5]=1$. $p=[1,3,3,3,5,5,6]$.\n5. $\\texttt{union}(0,4)$: $\\texttt{find}(0)$: $0\\to1\\to3$, root $3$ (rank $2$); $\\texttt{find}(4)=5$ (rank $1$). Higher rank $3$ wins → $p[5]=3$. $p=[1,3,3,3,5,3,6]$.\n\nNow $\\texttt{find}(3)$ with <strong>path compression</strong>: $3$ is already its own root ($p[3]=3$), so nothing changes. To make compression visible, instead trace $\\texttt{find}(0)$: the path is $0\\to1\\to3$ (root $3$); compression re-points every node on the path directly to $3$, so $p[0]\\leftarrow3$ and $p[1]$ is already $3$. Result: $$p=[3,3,3,3,5,3,6].$$ Every element of the big set $\\{0,1,2,3,4,5\\}$ now points to root $3$ (note $4\\to5\\to3$ until $4$ is itself compressed), and $\\{6\\}$ stays separate — flattening keeps later $\\texttt{find}$ calls near $O(1)$.\n\n<strong>Cut-property check for edge $02$.</strong> The cut property states: for any partition (cut) of $V$ into two nonempty sides, the <em>minimum-weight</em> edge crossing the cut belongs to some MST; conversely, an edge that is the <em>unique maximum</em> on a cycle is in no MST. Consider the cut $\\{0,2\\}$ vs $\\{1,3\\}$. An edge crosses iff its endpoints lie on opposite sides: $01(2)$ crosses ($0\\!\\in\\!\\{0,2\\},\\,1\\!\\in\\!\\{1,3\\}$), $23(2)$ crosses ($2\\!\\in\\!\\{0,2\\},\\,3\\!\\in\\!\\{1,3\\}$), while $02$ does not cross (both endpoints in $\\{0,2\\}$) and $13(4)$ does not cross (both endpoints in $\\{1,3\\}$). So the only crossing edges are $01(2)$ and $23(2)$; the lightest crossing edge has weight $2$, far below $02$'s weight $9$, so $02$ is certainly not a minimum crossing edge for this cut. More directly, $02$ lies on the cycle $0\\!-\\!1\\!-\\!3\\!-\\!2\\!-\\!0$ with weights $2,4,2,9$; here $02(9)$ is the unique heaviest edge on that cycle. By the cycle property, the unique maximum edge on a cycle is in <strong>no</strong> MST. Therefore edge $02$ <strong>cannot appear in any MST</strong>."
            }
          ]
        }
      ]
    },
    {
      "id": "a-advanced-ml-connections",
      "title": "Complexity, Strings, and ML Connections",
      "lessons": [
        {
          "id": "a-np-completeness",
          "title": "P, NP, and NP-Completeness",
          "minutes": 18,
          "content": "<h3>Why this lesson matters</h3>\n<p>Every working engineer eventually hits a wall that is not a bug. You have a clean specification, correct code, and yet the program crawls to a halt on inputs of size 50. The instinct is to optimize the constant factors — faster language, better cache locality, more cores. Sometimes that wall is not an engineering failure at all: it is a <strong>structural</strong> property of the problem itself. The theory of <strong>NP-completeness</strong> is the vocabulary for recognizing such walls, proving they are real, and deciding what to do about them. It is one of the most consequential ideas in all of computer science, and the central open question it raises — <strong>does P equal NP?</strong> — is worth a million dollars and, more importantly, is the deepest unsolved question about the limits of computation.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The single most useful skill from this theory is not solving NP-complete problems — it is <em>recognizing</em> them. Once you can say \"this is just vertex cover in disguise,\" you stop searching for a fast exact algorithm that almost certainly does not exist, and you pivot to approximation, heuristics, or restricting the input. That pivot saves careers.</p></div>\n\n<h3>1. Decision problems and the class P</h3>\n<p>To talk precisely about difficulty, we restrict attention to <strong>decision problems</strong>: problems with a yes/no answer. This is less limiting than it sounds. \"Find the shortest tour\" becomes \"Is there a tour of length $\\le k$?\" — and if you can answer the decision version efficiently, you can usually recover the actual solution by binary-searching on $k$ and probing. A decision problem is formalized as a <strong>language</strong> $L \\subseteq \\{0,1\\}^*$: the set of input strings whose answer is \"yes.\"</p>\n\n<p>We measure cost as a function of the input size $n$ (the number of bits, or sometimes a natural parameter like number of vertices). A problem is <strong>tractable</strong> if it admits a <strong>polynomial-time</strong> algorithm — one running in $O(n^c)$ steps for some constant $c$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Definition: P</div><p>$\\mathbf{P}$ is the class of decision problems solvable by a deterministic algorithm in time $O(n^c)$ for some constant $c$. Examples: shortest path (Dijkstra/BFS), maximum bipartite matching, primality testing (AKS, 2002), 2-SAT, linear programming.</p></div>\n\n<p>Why pick polynomial as the dividing line between \"easy\" and \"hard\"? Two reasons. First, it is <strong>robust</strong>: polynomials are closed under addition, multiplication, and composition, so \"polynomial-time\" does not depend on your machine model (Turing machine, RAM, your laptop) up to polynomial factors — this is the <em>extended Church–Turing thesis</em>. Second, it is a useful proxy: an $O(n^{100})$ algorithm is technically polynomial yet useless, and a $2^{0.0001 n}$ algorithm is technically exponential yet fine for moderate $n$. But in practice, problems in P almost always have <em>small-degree</em> polynomial algorithms, and the line has held up remarkably well over 50 years.</p>\n\n<h3>2. Verifiers vs. solvers: the class NP</h3>\n<p>Here is the conceptual heart of the lesson. There is a profound asymmetry between <strong>finding</strong> a solution and <strong>checking</strong> one. Finding a needle in a haystack is hard; confirming that a given object <em>is</em> the needle is easy. NP captures exactly the problems where checking is easy.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Definition: NP</div><p>$\\mathbf{NP}$ is the class of decision problems for which a \"yes\" answer has a <strong>certificate</strong> (a witness, or proof) that can be <strong>verified</strong> in polynomial time. Formally, $L \\in \\mathbf{NP}$ if there is a polynomial-time verifier $V(x, w)$ and a polynomial $p$ such that:\n$$x \\in L \\iff \\exists\\, w \\text{ with } |w| \\le p(|x|) \\text{ and } V(x, w) = \\text{accept}.$$</p></div>\n\n<p>The certificate $w$ is the candidate solution; the verifier $V$ is the polynomial-time check. The name \"NP\" stands for <strong>Nondeterministic Polynomial time</strong>: an equivalent definition says a nondeterministic machine could <em>guess</em> the certificate and then verify it. The two definitions coincide — guessing-then-checking equals certificate-plus-verifier.</p>\n\n<h4>Worked example: SUBSET-SUM is in NP</h4>\n<p>Problem: given integers $a_1, \\dots, a_n$ and a target $t$, is there a subset summing to exactly $t$? Finding such a subset seems to require searching among $2^n$ subsets. But verifying is trivial: the <strong>certificate</strong> is the subset $S$ itself, encoded as a bit string. The <strong>verifier</strong> adds up the chosen elements and checks the sum equals $t$ — clearly $O(n)$ arithmetic on numbers whose size is polynomial in the input. So SUBSET-SUM $\\in$ NP. We do not know a polynomial-time <em>solver</em>, but a polynomial-time <em>verifier</em> obviously exists. That gap is the whole story.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>NP is the class of problems where a lucky guess, once made, is cheap to confirm. \"Is this Sudoku solvable?\" — show me the filled grid and I'll check it in seconds. \"Is this theorem provable in $k$ steps?\" — show me the proof and I'll verify it line by line. NP is the natural home of <em>search</em> problems.</p></div>\n\n<h4>The basic landscape</h4>\n<p>Clearly $\\mathbf{P} \\subseteq \\mathbf{NP}$: if you can solve a problem outright in polynomial time, you can ignore the certificate and just solve it. The trillion-dollar question is whether the containment is strict.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">P vs NP</div><p>Does $\\mathbf{P} = \\mathbf{NP}$? That is: whenever a solution can be <em>checked</em> efficiently, can one also be <em>found</em> efficiently? Almost everyone believes $\\mathbf{P} \\ne \\mathbf{NP}$ (finding is genuinely harder than checking), but no one has proved it. A proof either way would reshape mathematics, cryptography, optimization, and AI.</p></div>\n\n<p>A common misconception: NP does <em>not</em> mean \"not polynomial.\" P is a subset of NP, so every easy problem is also in NP. NP is the class of <em>efficiently verifiable</em> problems, which includes the easy ones.</p>\n\n<h3>3. Polynomial-time reductions: comparing difficulty</h3>\n<p>To say one problem is \"at least as hard as\" another, we need a way to transform problems into each other. The key tool is the <strong>polynomial-time many-one reduction</strong> (Karp reduction).</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Definition: reduction</div><p>$A \\le_p B$ (\"$A$ reduces to $B$\") means there is a polynomial-time computable function $f$ such that for every input $x$,\n$$x \\in A \\iff f(x) \\in B.$$\nThen a fast algorithm for $B$ gives a fast algorithm for $A$: to decide $x \\in A$, compute $f(x)$ and ask $B$. Hence $B$ is \"at least as hard as\" $A$.</p></div>\n\n<p>Two properties make reductions powerful. They are <strong>transitive</strong> ($A \\le_p B$ and $B \\le_p C$ imply $A \\le_p C$), and they <strong>preserve tractability</strong>: if $A \\le_p B$ and $B \\in \\mathbf{P}$, then $A \\in \\mathbf{P}$. The contrapositive is what we use in practice: if $A$ is known to be hard and $A \\le_p B$, then $B$ is hard too. <strong>The direction matters and is the most common student error: to prove $B$ is hard, reduce a known-hard $A$ <em>to</em> $B$, not the other way around.</strong> You are showing \"if I could solve $B$, I could solve the already-hard $A$.\"</p>\n\n<h3>4. NP-completeness and NP-hardness</h3>\n<div class=\"callout sage\"><div class=\"c-tag\">Definitions</div><p>A problem $B$ is <strong>NP-hard</strong> if <em>every</em> problem $A \\in \\mathbf{NP}$ satisfies $A \\le_p B$. Intuitively, $B$ is at least as hard as everything in NP. A problem is <strong>NP-complete</strong> if it is both NP-hard <em>and</em> itself in NP. NP-complete problems are the hardest problems in NP — and they all stand or fall together.</p></div>\n\n<p>The \"stand or fall together\" point is the crown jewel. If <em>any single</em> NP-complete problem had a polynomial-time algorithm, then by composing reductions <em>every</em> problem in NP would, so $\\mathbf{P} = \\mathbf{NP}$. Conversely, if $\\mathbf{P} \\ne \\mathbf{NP}$, then <em>no</em> NP-complete problem has a polynomial-time algorithm. Thousands of NP-complete problems across logic, graphs, scheduling, number theory, and games are linked into one fate.</p>\n\n<p>Note NP-hard is broader than NP-complete: an NP-hard problem need not be in NP (it may not even be a decision problem, or its certificates may not be checkable in polynomial time). For example, the <em>optimization</em> version of TSP (\"find the minimum tour\") and the halting problem are NP-hard but not in NP.</p>\n\n<h4>Cook–Levin: the first NP-complete problem</h4>\n<p>NP-completeness would be a vacuous definition if no NP-complete problem existed. The <strong>Cook–Levin theorem (1971)</strong> changed everything: it proved that <strong>SAT</strong> — the Boolean satisfiability problem — is NP-complete. SAT asks: given a Boolean formula like $(x_1 \\lor \\lnot x_2) \\land (x_2 \\lor x_3)$, is there an assignment of true/false to the variables making it evaluate to true?</p>\n<p>SAT is obviously in NP (certificate = the satisfying assignment; verify by plugging in). The hard part is NP-hardness. The proof's idea: any NP problem has a polynomial-time verifier, which is a computation. Cook and Levin showed how to encode the entire step-by-step execution of that verifier — its tape contents and states over time — as a giant Boolean formula that is satisfiable <em>exactly when</em> a valid certificate exists. A computation became a logic puzzle. Once SAT is the anchor, every other NP-completeness proof is just a reduction <em>from</em> SAT (or from something already reduced from SAT). The first proof is from scratch; all the rest stand on its shoulders.</p>\n\n<h3>5. The canonical NP-complete zoo</h3>\n<ul>\n<li><strong>SAT / 3-SAT.</strong> 3-SAT restricts every clause to exactly 3 literals and is still NP-complete — it is the favorite starting point for reductions because of its rigid structure.</li>\n<li><strong>VERTEX COVER.</strong> Given graph $G$ and integer $k$, is there a set of $\\le k$ vertices touching every edge?</li>\n<li><strong>INDEPENDENT SET / CLIQUE.</strong> A set of $k$ mutually non-adjacent (resp. mutually adjacent) vertices.</li>\n<li><strong>HAMILTONIAN CYCLE / TSP.</strong> A cycle visiting every vertex once; TSP adds weights and a budget $k$.</li>\n<li><strong>SUBSET-SUM / KNAPSACK.</strong> Hit a target sum / maximize value under a weight budget.</li>\n<li><strong>GRAPH COLORING.</strong> Can the graph be colored with $k$ colors so adjacent vertices differ? (3-coloring is NP-complete; 2-coloring is in P.)</li>\n</ul>\n\n<div class=\"callout\"><div class=\"c-tag\">Watch the boundary</div><p>Tiny changes flip tractability. 2-SAT is in P but 3-SAT is NP-complete. 2-coloring is in P but 3-coloring is NP-complete. Shortest path is in P but longest <em>simple</em> path is NP-complete. Knapsack with small integer weights is solvable in <em>pseudo-polynomial</em> time $O(nW)$ by dynamic programming, but that $W$ is exponential in the input's bit-length, so the problem is still NP-complete (it is \"weakly\" NP-complete). Always check exactly which version you have.</p></div>\n\n<h4>Fully worked reduction: 3-SAT $\\le_p$ VERTEX COVER</h4>\n<p>This is the classic gadget reduction; following it once makes the whole machinery click. We are given a 3-SAT formula $\\phi$ with $n$ variables and $m$ clauses, and we build a graph $G$ and number $k$ such that $G$ has a vertex cover of size $\\le k$ iff $\\phi$ is satisfiable.</p>\n\n<p><strong>Variable gadgets.</strong> For each variable $x_i$, create two vertices labeled $x_i$ and $\\lnot x_i$ joined by an edge (a \"literal edge\"). Any vertex cover must include at least one endpoint of each such edge — so it \"picks\" a truth value for each variable. There are $n$ such edges, contributing at least $n$ to the cover.</p>\n\n<p><strong>Clause gadgets.</strong> For each clause, e.g. $(x_1 \\lor \\lnot x_2 \\lor x_3)$, create a triangle of 3 vertices, one per literal. A triangle needs at least 2 of its 3 vertices in any cover, contributing at least $2m$.</p>\n\n<p><strong>Connecting edges.</strong> Connect each clause-triangle vertex to the corresponding literal vertex in its variable gadget (the $x_3$ corner of the triangle connects to the $x_3$ literal vertex, etc.).</p>\n\n<p><strong>The budget.</strong> Set $k = n + 2m$. This is the minimum forced by the gadgets alone, so a cover of size exactly $k$ has zero slack: exactly 1 vertex per literal edge and exactly 2 per triangle.</p>\n\n<p><strong>Correctness.</strong> Suppose $\\phi$ is satisfiable. Pick the true literal in each variable gadget into the cover ($n$ vertices) — this is the assignment. In each clause, at least one literal is true; leave that triangle vertex <em>out</em> and put the other two in ($2m$ vertices). Every connecting edge is covered: if a triangle vertex was left out, its corresponding literal vertex is in the cover (because that literal is true). Total $= n + 2m = k$. Conversely, a cover of size $k$ must, with no slack, choose one literal per variable (a consistent assignment) and leave one vertex out per triangle; the connecting edge of that left-out vertex forces its literal to be in the cover, i.e. true — so every clause has a true literal and $\\phi$ is satisfied. The construction is clearly polynomial: $2n + 3m$ vertices and $n + 3m + 3m$ edges. $\\blacksquare$</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Reduction recipe</div><p>Almost every reduction has this shape: (1) build <em>gadgets</em> that locally encode the source problem's pieces (variables, clauses), (2) wire them so global consistency in the target mirrors satisfiability in the source, (3) set the budget to remove slack, (4) prove both directions of the \"iff\", and (5) note it runs in polynomial time. The art is the gadget design.</p></div>\n\n<h3>6. What intractability means in practice</h3>\n<p>NP-completeness is a statement about <strong>worst-case</strong> behavior of <strong>exact</strong> algorithms on <strong>arbitrary</strong> inputs. It does <em>not</em> say your specific instance is hard. Practical responses when you hit an NP-complete problem:</p>\n<ul>\n<li><strong>Approximation algorithms.</strong> Don't insist on optimal. A greedy \"pick both endpoints of an uncovered edge\" gives a vertex cover within a factor 2 of optimal — provably, in linear time. Metric TSP has a 1.5-approximation (Christofides). Some problems resist this: general TSP and max-clique have no good approximation unless P = NP.</li>\n<li><strong>Exact but exponential, made fast.</strong> SAT solvers (CDCL), ILP solvers (branch-and-bound + cutting planes), and parameterized algorithms ($O(2^k \\cdot n)$ for vertex cover with parameter $k$) routinely crush \"hard\" instances with millions of variables. Worst case is exponential; real instances often are not.</li>\n<li><strong>Restrict the input.</strong> Many NP-complete problems are in P on trees, planar graphs, or bounded-treewidth graphs. Independent set is NP-complete in general but linear on trees via DP.</li>\n<li><strong>Heuristics / metaheuristics.</strong> Simulated annealing, genetic algorithms, local search — no guarantees, but often excellent in practice.</li>\n</ul>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Connections to ML / AI</div><p>The links run deep. (1) <strong>Cryptography depends on hardness.</strong> Public-key crypto rests on problems believed hard (factoring, discrete log); if P = NP, much of modern security collapses. (2) <strong>Training is often NP-hard.</strong> Finding the optimal decision tree, the optimal set of weights for even a tiny 3-node neural network, or the exact MAP assignment in a general graphical model are all NP-hard — which is precisely why ML uses gradient descent, greedy splitting, and approximate inference (variational methods, MCMC) instead of exact optimization. We trade optimality for tractability. (3) <strong>Verification vs. generation.</strong> The NP intuition — checking is easier than finding — underlies why LLM outputs are often easier to verify than to produce, motivating verifier-guided decoding, self-consistency, and \"generator + checker\" agent architectures. (4) <strong>The famous slogan:</strong> if P = NP, then any problem whose solution we can recognize, we could also generate — automated mathematicians, perfect learners, optimal everything. Scott Aaronson's quip: \"If P = NP, then the world would be a profoundly different place... creativity would be mechanizable.\" That this seems too good to be true is itself soft evidence that P ≠ NP.</p></div>\n\n<h3>7. Why P vs NP matters</h3>\n<p>If $\\mathbf{P} = \\mathbf{NP}$: every NP problem becomes efficiently solvable. Optimal logistics, protein folding by efficient search, automatic discovery of mathematical proofs (the proof is the certificate!), and the end of most public-key cryptography. The asymmetry between creating and verifying — between the artist and the critic — would vanish. If $\\mathbf{P} \\ne \\mathbf{NP}$ (the consensus): that asymmetry is a permanent feature of the universe, intractability is real, and our reliance on approximation, heuristics, and cryptographic hardness is well-founded. Either way, we currently cannot prove which world we live in — and the inability to prove even $\\mathbf{P} \\ne \\mathbf{NP}$, despite decades of effort and known barriers (relativization, natural proofs, algebrization), is humbling evidence of how little we understand about computation.</p>\n\n<h4>Quick classification table</h4>\n<ul>\n<li><strong>In P:</strong> shortest path, 2-SAT, 2-coloring, matching, primality, linear programming, min spanning tree, max flow.</li>\n<li><strong>NP-complete:</strong> 3-SAT, vertex cover, clique, independent set, Hamiltonian cycle, decision-TSP, subset-sum, knapsack (decision), 3-coloring.</li>\n<li><strong>Not known to be either:</strong> graph isomorphism is a famous \"intermediate\" candidate — in NP, not known to be in P, and not known to be NP-complete.</li>\n<li><strong>NP-hard but not in NP:</strong> optimization-TSP, halting problem, general game-playing (often PSPACE-hard or worse).</li>\n</ul>\n\n<p>The skill to practice: given a new problem, ask \"can I verify a solution fast?\" (NP membership) and \"does it smell like one of the zoo animals?\" (likely NP-complete). When both fire, stop hunting for an exact polynomial algorithm — design a reduction to prove the hardness, then reach for approximation or heuristics.</p>",
          "mcq": [
            {
              "q": "To prove that a new problem $B$ (already known to be in NP) is NP-complete, what must you show?",
              "choices": [
                "Reduce $B$ to a known NP-complete problem $A$ in polynomial time ($B \\le_p A$)",
                "Reduce a known NP-complete problem $A$ to $B$ in polynomial time ($A \\le_p B$)",
                "Show $B$ has no polynomial-time algorithm",
                "Show $B$ can be verified in exponential time"
              ],
              "answer": 1,
              "explain": "NP-hardness requires reducing a known-hard problem TO $B$: 'if I could solve $B$, I could solve the already-hard $A$.' Reducing $B$ to $A$ would only show $B$ is no harder than $A$, the wrong direction."
            },
            {
              "q": "Which statement about the relationship between P and NP is correct?",
              "choices": [
                "NP means 'not polynomial,' so P and NP are disjoint",
                "$\\mathbf{P} \\subseteq \\mathbf{NP}$, and it is proven that the containment is strict",
                "$\\mathbf{P} \\subseteq \\mathbf{NP}$, but whether the containment is strict is an open problem",
                "$\\mathbf{NP} \\subseteq \\mathbf{P}$ is known to be true"
              ],
              "answer": 2,
              "explain": "Every problem solvable in polynomial time is also verifiable in polynomial time, so $\\mathbf{P} \\subseteq \\mathbf{NP}$. Whether they are equal is the famous unsolved question; 'NP' stands for nondeterministic polynomial, not 'not polynomial.'"
            },
            {
              "q": "Knapsack with weights bounded by $W$ has an $O(nW)$ dynamic-programming algorithm, yet the problem is NP-complete. Why is there no contradiction?",
              "choices": [
                "The DP algorithm is actually incorrect for large instances",
                "$W$ can be exponential in the input's bit-length, so $O(nW)$ is not polynomial in input size",
                "NP-complete problems can still have polynomial algorithms",
                "Knapsack is in P, not NP-complete"
              ],
              "answer": 1,
              "explain": "The number $W$ takes only $\\log W$ bits to write down, so $O(nW)$ is exponential in the input length. Such algorithms are called pseudo-polynomial; the problem remains (weakly) NP-complete."
            },
            {
              "q": "Which problem is NP-hard but NOT in NP (as standardly formulated)?",
              "choices": [
                "3-SAT",
                "Decision version of TSP ('is there a tour of length $\\le k$?')",
                "Optimization version of TSP ('find the minimum-length tour')",
                "Vertex cover"
              ],
              "answer": 2,
              "explain": "The optimization version asks for the actual minimum, not a yes/no answer, so it is not a decision problem and not in NP; it is still NP-hard. The decision versions of TSP, 3-SAT, and vertex cover are all NP-complete (in NP and NP-hard)."
            },
            {
              "q": "Why does complexity theory restrict attention to $decision$ problems (yes/no answers) when classifying problems like the Traveling Salesman Problem, even though we usually want the actual optimal tour?",
              "choices": [
                "Decision problems are the only kind a computer can actually solve",
                "The decision version captures the difficulty: if you can answer 'is there a tour of length $\\le k$?' efficiently, you can typically recover the optimal solution via binary search and probing",
                "Optimization problems can never be in P, so they are excluded by definition",
                "Decision problems always have polynomial-time algorithms, unlike optimization problems"
              ],
              "answer": 1,
              "explain": "Restricting to yes/no answers gives a clean formalism (languages over $\\{0,1\\}^*$) while losing no essential difficulty, since an efficient decision procedure for 'is there a tour of length $\\le k$?' usually lets you reconstruct the optimal tour by binary-searching on the threshold $k$ and then fixing edges one at a time."
            },
            {
              "q": "The lesson chooses polynomial time, $O(n^c)$, as the dividing line between 'easy' and 'hard'. One stated reason is that the class is $robust$. What does this robustness specifically refer to?",
              "choices": [
                "Polynomial-time algorithms always run fast in practice, even for large $c$",
                "Polynomials are closed under addition, multiplication, and composition, so 'polynomial-time' is invariant across reasonable machine and encoding models",
                "Every polynomial-time algorithm can be converted to a linear-time algorithm",
                "Polynomial time guarantees the constant factors are small"
              ],
              "answer": 1,
              "explain": "Because polynomials are closed under addition, multiplication, and composition, a polynomial-time bound survives changes in computational model or input encoding (e.g., a polynomial-time simulation of one model by another). This makes 'polynomial' a model-independent notion of tractability rather than a promise of practical speed."
            },
            {
              "q": "Primality testing is listed as an example of a problem in $\\mathbf{P}$, citing the AKS algorithm (2002). What does membership in P require of such an algorithm?",
              "choices": [
                "A deterministic algorithm that decides the yes/no question in time $O(n^c)$ for some constant $c$, where $n$ is the input size in bits",
                "A randomized algorithm that is correct with high probability",
                "An algorithm that runs in time polynomial in the value of the number being tested",
                "An algorithm that merely verifies a given factorization quickly"
              ],
              "answer": 0,
              "explain": "P requires a deterministic algorithm running in time polynomial in the input size (number of bits $n$), which is exactly what AKS provides for primality. This distinguishes it from earlier randomized tests (Miller-Rabin, in RP/BPP) and from the unrelated, harder factoring problem."
            },
            {
              "q": "A subtlety the lesson hints at: for primality, the input number $N$ has size $n \\approx \\log_2 N$ bits. Why would an algorithm running in time proportional to $N$ itself NOT establish that primality is in P?",
              "choices": [
                "Because such an algorithm would have to read all of $N$, which P forbids",
                "Because runtime $\\propto N$ equals $\\propto 2^n$, which is exponential in the input size $n$, not polynomial",
                "Because P only allows algorithms whose runtime is independent of the input value",
                "Because trial division is randomized, not deterministic"
              ],
              "answer": 1,
              "explain": "Since the input size is the number of bits $n \\approx \\log_2 N$, an algorithm costing $\\Theta(N)$ steps costs $\\Theta(2^n)$ steps, which is exponential in $n$ and therefore fails the polynomial-in-input-size requirement for P. Such 'pseudo-polynomial' running times look polynomial only in the value $N$, not in its bit-length."
            },
            {
              "q": "You want to prove that a new decision problem $B$ is NP-hard. A classmate proposes: \"Take a known NP-complete problem like 3-SAT, and give a polynomial-time function $f$ such that $x \\in B \\iff f(x) \\in \\text{3-SAT}$ — i.e. reduce $B$ to 3-SAT.\" Does this argument establish that $B$ is NP-hard?",
              "choices": [
                "Yes — exhibiting any polynomial-time reduction involving $B$ and a known NP-complete problem proves $B$ is NP-hard.",
                "No — this shows $B \\le_p \\text{3-SAT}$, which only proves $B$ is no harder than 3-SAT (so $B \\in \\text{NP}$ at best); to prove $B$ hard you must reduce 3-SAT *to* $B$.",
                "Yes — because reductions are transitive, the direction of $f$ does not affect the conclusion.",
                "No — because 3-SAT may not reduce to $B$, you should instead reduce $B$ to the halting problem."
              ],
              "answer": 1,
              "explain": "The reduction is backwards: $B \\le_p \\text{3-SAT}$ means a fast solver for 3-SAT would solve $B$, so $B$ is *at most* as hard as 3-SAT (placing it in NP), not hard. To prove $B$ is NP-hard you need $\\text{3-SAT} \\le_p B$, showing a solver for $B$ would crack the known-hard problem."
            },
            {
              "q": "Suppose tomorrow someone publishes a correct $O(n^3)$ algorithm for VERTEX COVER (a single NP-complete problem). Which conclusion follows, and why?",
              "choices": [
                "Only VERTEX COVER and problems that reduce to it would gain fast algorithms; SUBSET-SUM and 3-SAT could still require exponential time.",
                "Nothing about other problems follows, because each NP-complete problem has its own independent gadget construction.",
                "Every problem in NP would have a polynomial-time algorithm, so $\\mathbf{P} = \\mathbf{NP}$, because every NP problem reduces in polynomial time to any NP-complete problem.",
                "It would prove $\\mathbf{P} \\ne \\mathbf{NP}$, since VERTEX COVER was believed to require exponential time."
              ],
              "answer": 2,
              "explain": "By definition every problem in NP reduces in polynomial time to any NP-complete problem; composing that reduction with the new fast algorithm solves every NP problem in polynomial time, giving $\\mathbf{P}=\\mathbf{NP}$. The 'stand or fall together' property is exactly why one fast algorithm collapses the whole class, not just one problem."
            },
            {
              "q": "The lesson notes a greedy algorithm that repeatedly picks *both* endpoints of an uncovered edge yields a vertex cover within a factor 2 of optimal. For a graph whose true minimum vertex cover has size 40, what does this 2-approximation guarantee about the cover the algorithm returns?",
              "choices": [
                "It returns a cover of size at most 80, with no promise it is optimal.",
                "It returns the optimal cover of size 40, just twice as slowly as an exact method.",
                "It returns a cover of size at most 42, since the additive error is bounded by 2.",
                "It returns a cover of size at least 80, since the algorithm overshoots the optimum."
              ],
              "answer": 0,
              "explain": "A factor-2 (multiplicative) approximation guarantees the output is at most $2 \\times 40 = 80$, but offers no claim of optimality. The distractors confuse a multiplicative ratio with an additive bound, or wrongly assume approximation yields the exact optimum."
            },
            {
              "q": "Graph isomorphism (GI) is in NP but, per the lesson, is *not known* to be in P and *not known* to be NP-complete. A colleague argues: \"Every hard-looking NP problem must be NP-complete, so GI is NP-complete.\" What is the flaw in this reasoning?",
              "choices": [
                "GI is actually NP-hard but not in NP, so it cannot be NP-complete.",
                "Unless $\\mathbf{P} = \\mathbf{NP}$, NP contains 'intermediate' problems that are neither in P nor NP-complete (Ladner's theorem), and GI is a leading candidate; membership in NP plus apparent difficulty does not imply NP-completeness.",
                "GI must be in P, because every problem with a polynomial-time verifier is automatically solvable in polynomial time.",
                "The reasoning is correct: any problem in NP without a known polynomial algorithm is by definition NP-complete."
              ],
              "answer": 1,
              "explain": "Assuming $\\mathbf{P} \\ne \\mathbf{NP}$, NP is not partitioned into just P and NP-complete; intermediate problems exist (Ladner's theorem) and GI is the classic candidate. Being in NP and lacking a known fast algorithm does not make a problem NP-complete — that requires a proof that every NP problem reduces to it."
            },
            {
              "q": "What does it mean for a decision problem to be in the class <strong>NP</strong>?",
              "choices": [
                "It can be <em>solved</em> in polynomial time",
                "A claimed 'yes' answer can be <em>verified</em> in polynomial time given a short certificate",
                "No algorithm for it exists",
                "It is undecidable"
              ],
              "answer": 1,
              "explain": "NP = problems whose yes-instances have a certificate (witness) checkable in polynomial time — e.g. a satisfying assignment for SAT. Being <em>solvable</em> in polynomial time is the (possibly smaller) class P; whether P = NP is the open question."
            },
            {
              "q": "A problem is <strong>NP-complete</strong> if it is…",
              "choices": [
                "merely in NP",
                "solvable in polynomial time",
                "harder than every NP problem but not itself in NP",
                "in NP, and every problem in NP reduces to it in polynomial time (i.e. it's also NP-hard)"
              ],
              "answer": 3,
              "explain": "NP-complete = the hardest problems <em>in</em> NP: in NP, and NP-hard (everything in NP polynomial-time-reduces to it). So a polynomial algorithm for any one NP-complete problem would solve all of NP, proving P = NP."
            },
            {
              "q": "Your problem is proven NP-complete. What's the right practical takeaway for an engineer?",
              "choices": [
                "Don't expect an efficient exact algorithm for all inputs — use approximation, heuristics, or exploit special structure",
                "The problem is literally unsolvable",
                "It can only ever be solved by brute force",
                "It can always be solved fast with enough memory"
              ],
              "answer": 0,
              "explain": "NP-completeness means no known polynomial exact algorithm (and probably none exists). Instances are still solvable — via approximation algorithms with guarantees, heuristics, exact solvers on small/structured inputs, or parameterized methods. It is not a proof of unsolvability."
            },
            {
              "q": "Why is Boolean satisfiability (SAT) historically pivotal in complexity theory?",
              "choices": [
                "It is solvable in polynomial time",
                "It is the only NP-complete problem",
                "The Cook–Levin theorem proved SAT is NP-complete — the first such problem, the root of later NP-hardness reductions",
                "It is not in NP"
              ],
              "answer": 2,
              "explain": "Cook (1971) and Levin showed every NP problem reduces to SAT, making it the first proven NP-complete problem. Thereafter you prove a new problem NP-hard by reducing a <em>known</em> NP-complete one (like SAT or 3-SAT) to it."
            }
          ],
          "flashcards": [
            {
              "front": "Define the class NP in terms of certificates and verifiers.",
              "back": "$L \\in \\mathbf{NP}$ if there is a polynomial-time verifier $V(x,w)$ and polynomial $p$ such that $x \\in L \\iff \\exists w$ with $|w| \\le p(|x|)$ and $V(x,w)$ accepts. NP = problems whose 'yes' instances have a short, polynomial-time-checkable certificate."
            },
            {
              "front": "What does $A \\le_p B$ mean and why does direction matter?",
              "back": "A polynomial-time function $f$ with $x \\in A \\iff f(x) \\in B$. It means $B$ is at least as hard as $A$. To prove $B$ is hard, reduce a known-hard $A$ TO $B$ (i.e. $A \\le_p B$), never the reverse."
            },
            {
              "front": "NP-hard vs. NP-complete?",
              "back": "$B$ is NP-hard if every $A \\in \\mathbf{NP}$ has $A \\le_p B$. $B$ is NP-complete if it is NP-hard AND in NP. NP-complete = hardest problems in NP; NP-hard can include problems outside NP (e.g. halting problem, optimization-TSP)."
            },
            {
              "front": "What did the Cook–Levin theorem establish, and why is it foundational?",
              "back": "SAT (Boolean satisfiability) is NP-complete — the first proven NP-complete problem. It works by encoding any NP verifier's computation as a Boolean formula. Every later NP-completeness proof is just a reduction from SAT (or its descendants)."
            },
            {
              "front": "If even ONE NP-complete problem had a polynomial-time algorithm, what would follow?",
              "back": "$\\mathbf{P} = \\mathbf{NP}$. Because every NP problem reduces to it in polynomial time, a fast algorithm for one NP-complete problem yields fast algorithms for all of NP."
            },
            {
              "front": "Name three practical responses to facing an NP-complete problem.",
              "back": "(1) Approximation algorithms with provable ratios (e.g. 2-approx vertex cover, Christofides 1.5 for metric TSP); (2) exact-but-exponential solvers that are fast on real instances (SAT/ILP solvers, FPT $O(2^k n)$); (3) restrict the input (trees, planar, bounded treewidth) or use heuristics."
            }
          ],
          "homework": [
            {
              "prompt": "Classify each of the following as (i) in P, or (ii) NP-complete, and give a one-line justification: (a) determining whether a graph is 2-colorable; (b) determining whether a graph is 3-colorable; (c) finding the shortest path between two vertices in a weighted graph with nonnegative weights; (d) finding the longest simple path between two vertices.",
              "hint": "Look for the tractability boundaries discussed in the lesson. Two of these flip from easy to hard with a seemingly small change (2-vs-3 and shortest-vs-longest).",
              "solution": "(a) IN P: 2-colorability is exactly testing whether the graph is bipartite, decidable by BFS/DFS 2-coloring in $O(V+E)$. (b) NP-COMPLETE: 3-coloring is a canonical NP-complete problem (reducible from 3-SAT). (c) IN P: Dijkstra's algorithm runs in $O((V+E)\\log V)$ with nonnegative weights. (d) NP-COMPLETE: longest simple path is NP-complete — a Hamiltonian path exists iff the longest simple path has $V-1$ edges, so it is at least as hard as Hamiltonian path. Note the symmetry of the boundaries: 2-vs-3 coloring and shortest-vs-longest path both flip from P to NP-complete."
            },
            {
              "prompt": "Sketch a polynomial-time reduction from INDEPENDENT SET to VERTEX COVER. Recall: an independent set is a set of pairwise non-adjacent vertices; a vertex cover is a set touching every edge. Use it to argue VERTEX COVER is NP-hard given that INDEPENDENT SET is.",
              "hint": "Consider the complement of a vertex set. What must be true about every edge if no edge has both endpoints inside an independent set?",
              "solution": "Key fact: in a graph $G=(V,E)$, a set $S$ is an independent set iff its complement $V \\setminus S$ is a vertex cover. Proof: $S$ independent means no edge has both endpoints in $S$, i.e. every edge has at least one endpoint in $V \\setminus S$, i.e. $V \\setminus S$ is a vertex cover (and the converse direction is identical). Reduction: map the instance '$G$ has an independent set of size $\\ge k$?' to '$G$ has a vertex cover of size $\\le |V|-k$?'. This is computable in $O(1)$ extra work (just arithmetic on $k$), hence polynomial, and the equivalence holds by the key fact: $G$ has an independent set of size $\\ge k$ iff $G$ has a vertex cover of size $\\le |V|-k$. Therefore INDEPENDENT SET $\\le_p$ VERTEX COVER, so since INDEPENDENT SET is NP-hard, VERTEX COVER is NP-hard. (Combined with VERTEX COVER $\\in$ NP — certificate is the cover, verify by checking every edge is touched — it is NP-complete.)"
            },
            {
              "prompt": "A colleague claims: 'I wrote a SAT solver that solves a real-world instance with 2 million clauses in under a second, so P = NP is basically resolved in practice and worst-case theory doesn't matter.' Identify the conceptual errors and explain what is and isn't true.",
              "hint": "Distinguish worst-case vs. typical-case, and exact-with-good-heuristics vs. a polynomial-time guarantee on all inputs.",
              "solution": "The colleague conflates several things. (1) NP-completeness is a WORST-CASE statement: it says there exist instances on which any algorithm (including this SAT solver) must, unless P = NP, take superpolynomial time. Solving particular real-world instances fast says nothing about the worst case — real instances often have exploitable structure (community structure, few backbone variables) that adversarial instances lack. (2) Modern CDCL SAT solvers are exact but their worst-case running time is still exponential; 'fast on this instance' is not a polynomial-time guarantee on all instances. (3) Therefore P = NP is in no way resolved — that is a mathematical claim about asymptotic worst-case complexity, not an empirical observation about benchmarks. What IS true and important: for many practical purposes, the worst case is irrelevant, and engineered solvers make NP-complete problems routinely solvable in practice. The correct takeaway is that NP-completeness tells you to abandon hope of a provable polynomial worst-case exact algorithm, NOT that you cannot solve your actual instances — those are very different conclusions, and the gap between them is exactly where practical algorithm engineering lives."
            }
          ],
          "examples": [
            {
              "title": "Verifying a certificate for Subset-Sum in polynomial time",
              "body": "Consider the multiset $S = \\{3, 7, 11, 14, 22\\}$ and target $t = 32$. The decision problem SUBSET-SUM asks: is there a sub-collection of $S$ whose elements sum to exactly $t$? Show that a proposed certificate can be checked quickly, and use this to argue SUBSET-SUM is in NP.",
              "solution": "<strong>Step 1 — Recall what NP means.</strong> A decision problem is in NP if every \"yes\" instance has a short certificate (a proposed answer / witness) that a verifier can check in time polynomial in the input size. The verifier does <em>not</em> have to find the certificate — only confirm it.\n\n<strong>Step 2 — Identify the certificate.</strong> For SUBSET-SUM, a natural certificate is the subset itself. Suppose someone hands us the candidate subset $C = \\{11, 7, 14\\}$.\n\n<strong>Step 3 — Run the verifier on this concrete instance.</strong> The verifier does two checks:\n\n(a) Membership: every element of $C$ appears in $S$. Scanning $S = \\{3,7,11,14,22\\}$: $11 \\in S$, $7 \\in S$, $14 \\in S$. Pass.\n\n(b) Sum: add the elements of $C$.\n$$11 + 7 + 14 = 32 = t.$$ Pass.\n\nBoth checks succeed, so the verifier outputs <strong>yes</strong>, and this is a valid certificate.\n\n<strong>Step 4 — Argue the running time is polynomial.</strong> Let $n$ be the number of items and let each number be at most $m$ bits. Checking membership is at most $n$ comparisons; summing the subset is at most $n$ additions of $O(m)$-bit numbers. Total work is $O(n \\cdot m)$, which is polynomial in the input size. Crucially, the verifier never enumerates the $2^n$ possible subsets — it only looks at the one it was given.\n\n<strong>Step 5 — Conclude.</strong> Because every yes-instance (like this one) admits a certificate checkable in polynomial time, SUBSET-SUM $\\in$ <strong>NP</strong>.\n\n<strong>Answer:</strong> Yes, $\\{7, 11, 14\\}$ is a valid certificate summing to $32$; verification costs $O(nm)$ time, so SUBSET-SUM is in NP. (Note: this argues membership in NP only — it says nothing about whether a fast algorithm to <em>find</em> such a subset exists.)"
            },
            {
              "title": "A reduction from 3-SAT to Independent Set on a concrete formula",
              "body": "Take the Boolean formula $\\phi = (x_1 \\lor x_2 \\lor \\lnot x_3) \\land (\\lnot x_1 \\lor x_2 \\lor x_3)$. Build the standard \"gadget\" graph $G$ for the 3-SAT $\\to$ INDEPENDENT-SET reduction, state the target $k$, and verify the reduction works by exhibiting a satisfying assignment and the corresponding independent set.",
              "solution": "<strong>Step 1 — Recall the gadget construction.</strong> Given a 3-CNF formula with $m$ clauses, build $G$ as follows: for each clause create a <em>triangle</em> of 3 vertices, one per literal (all three mutually connected). Then add an edge between any two vertices in different triangles whose literals are <em>complementary</em> (e.g. $x_1$ and $\\lnot x_1$). Set the target $k = m$ (one chosen literal per clause). The claim: $\\phi$ is satisfiable $\\iff$ $G$ has an independent set of size $k$.\n\n<strong>Step 2 — Build the vertices.</strong> Here $m = 2$, so $k = 2$. The two clause-triangles are:\n\nClause 1 vertices: $a = x_1,\\; b = x_2,\\; c = \\lnot x_3$ (triangle $a\\!-\\!b\\!-\\!c$).\n\nClause 2 vertices: $d = \\lnot x_1,\\; e = x_2,\\; f = x_3$ (triangle $d\\!-\\!e\\!-\\!f$).\n\n<strong>Step 3 — Add the conflict edges between triangles.</strong> Connect complementary literals across the two triangles:\n$$a=x_1 \\;\\leftrightarrow\\; d=\\lnot x_1 \\quad(\\text{edge}),$$\n$$c=\\lnot x_3 \\;\\leftrightarrow\\; f=x_3 \\quad(\\text{edge}).$$\nNo other cross pairs are complementary ($x_2$ vs $x_2$ are equal, not complementary, so no edge between $b$ and $e$).\n\n<strong>Step 4 — Why size-$k$ independent sets correspond to satisfying assignments.</strong> Within a triangle all three vertices are mutually adjacent, so an independent set can pick <em>at most one</em> vertex per triangle. To reach size $k = m = 2$ we must pick <em>exactly one per triangle</em> — that is, choose one true literal per clause. The cross edges forbid picking a literal and its negation simultaneously, guaranteeing the choices are consistent (we never set $x_i$ both true and false).\n\n<strong>Step 5 — Exhibit a satisfying assignment.</strong> Try $x_2 = \\text{true}$ (with $x_1, x_3$ arbitrary, say false). Clause 1: $x_2$ is true. Clause 2: $x_2$ is true. So $\\phi$ is satisfied.\n\n<strong>Step 6 — Read off the corresponding independent set.</strong> Pick the true literal $x_2$ in each clause: vertex $b$ from triangle 1 and vertex $e$ from triangle 2. Set $I = \\{b, e\\}$, size $2 = k$. Check independence: $b$ and $e$ are in different triangles, and $x_2$ is not the complement of $x_2$, so there is no edge between them. $I$ is a valid independent set of size $k$. ✓\n\n<strong>Step 7 — Note the reduction is polynomial.</strong> $G$ has $3m$ vertices and at most $\\binom{3m}{2}$ edges, all computable by scanning literal pairs once — clearly polynomial in the size of $\\phi$.\n\n<strong>Answer:</strong> The gadget graph has triangles $\\{x_1,x_2,\\lnot x_3\\}$ and $\\{\\lnot x_1,x_2,x_3\\}$ plus conflict edges $x_1\\!-\\!\\lnot x_1$ and $\\lnot x_3\\!-\\!x_3$, with $k=2$. The satisfying assignment $x_2=\\text{true}$ maps to the independent set $\\{b,e\\}$ of size $2$, confirming the \"satisfiable $\\Rightarrow$ has independent set of size $k$\" direction. Since 3-SAT is NP-complete and this reduction is polynomial-time, it certifies INDEPENDENT-SET is NP-hard."
            }
          ]
        },
        {
          "id": "a-approximation-randomized",
          "title": "Approximation and Randomized Algorithms",
          "minutes": 16,
          "content": "<h3>Why we settle for \"good enough\"</h3>\n<p>Many of the most important computational problems are <strong>NP-hard</strong>: unless P = NP, no algorithm solves them exactly in polynomial time on every input. Vertex Cover, Set Cover, Traveling Salesman, MAX-SAT, clustering objectives like $k$-means — all of these show up constantly in scheduling, networking, bioinformatics, and machine learning, and all of them are intractable to solve optimally at scale. We cannot wave away NP-hardness, so we change what we ask for. Two of the most powerful escape hatches are:</p>\n<ul>\n<li><strong>Approximation algorithms</strong> — give up <em>optimality</em>, keep <em>polynomial time</em>, and prove a guarantee on how far from optimal you can be.</li>\n<li><strong>Randomized algorithms</strong> — inject random choices so that the algorithm is simple and fast <em>in expectation</em> (or correct <em>with high probability</em>), even if a worst-case adversary is watching.</li>\n</ul>\n<p>These are not hacks. They come with theorems. The discipline is to <em>quantify</em> the compromise so you know exactly what you are buying.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>This is the same intellectual move that powers modern ML. Training a neural network is non-convex optimization (NP-hard in general), so we run <em>stochastic</em> gradient descent and accept an approximate local optimum. We do not demand the global minimum; we demand a provably useful descent in expectation, fast. Approximation + randomization <em>is</em> the operating philosophy of practical AI.</p></div>\n\n<h3>Part 1 — Approximation ratios: measuring \"how far off\"</h3>\n\n<h4>The definition</h4>\n<p>Consider a <strong>minimization</strong> problem (cost we want small). Let $\\text{OPT}(I)$ be the optimal cost on instance $I$, and let $\\text{ALG}(I)$ be the cost produced by our algorithm. We say the algorithm is a <strong>$\\rho$-approximation</strong> (with $\\rho \\ge 1$) if for <em>every</em> instance $I$:</p>\n$$\\text{ALG}(I) \\le \\rho \\cdot \\text{OPT}(I).$$\n<p>For a <strong>maximization</strong> problem (profit we want large, $\\rho \\le 1$) the inequality flips to $\\text{ALG}(I) \\ge \\rho \\cdot \\text{OPT}(I)$. The ratio $\\rho$ is the <strong>approximation ratio</strong>. Crucially it is a <em>worst-case, instance-independent</em> guarantee: a 2-approximation never costs more than twice optimal, no matter how adversarial the input.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The deep trick in proving an approximation ratio is that you usually <em>cannot compute</em> $\\text{OPT}$ (that's the whole point — it's NP-hard). So you compare your answer to a <strong>lower bound</strong> on $\\text{OPT}$ that you <em>can</em> reason about. If $\\text{ALG} \\le 2 \\cdot (\\text{lower bound}) \\le 2 \\cdot \\text{OPT}$, you win without ever knowing OPT. Finding the right lower bound is the art.</p></div>\n\n<h4>Worked example: a 2-approximation for Vertex Cover</h4>\n<p>A <strong>vertex cover</strong> of an undirected graph $G=(V,E)$ is a set $C \\subseteq V$ such that every edge has at least one endpoint in $C$. Minimum Vertex Cover (find the smallest such $C$) is NP-hard. Here is a beautifully simple algorithm:</p>\n<pre><code>VertexCover(G):\n    C = {}\n    while G still has an edge:\n        pick any remaining edge (u, v)\n        add BOTH u and v to C\n        delete u and v (and all their incident edges) from G\n    return C</code></pre>\n<p>It runs in linear time. Why is it a 2-approximation?</p>\n<p><strong>Step 1 — The edges we pick form a matching.</strong> Each time we grab an edge $(u,v)$ we delete both endpoints, so no two chosen edges share a vertex. The set $M$ of chosen edges is therefore a <em>matching</em> (pairwise vertex-disjoint edges).</p>\n<p><strong>Step 2 — The lower bound.</strong> Any valid vertex cover must cover every edge of $M$. But the edges in $M$ share no vertices, so covering them requires a <em>distinct</em> vertex for each — at least one endpoint per matched edge. Hence:</p>\n$$\\text{OPT} \\ge |M|.$$\n<p><strong>Step 3 — Our cost.</strong> We added exactly two vertices per chosen edge, so $|C| = 2|M|$. Combining:</p>\n$$|C| = 2|M| \\le 2 \\cdot \\text{OPT}.$$\n<p>That is the entire proof. Note we never computed OPT; the matching $M$ was our handle on the lower bound. The ratio 2 is <em>tight</em> for this algorithm: on a single edge it returns 2 vertices when 1 suffices, and on a perfect matching of $n/2$ edges it returns all $n$ vertices when $n/2$ would do.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>It is a famous open frontier that no polynomial algorithm is known with ratio better than $2 - o(1)$ for Vertex Cover, and under the Unique Games Conjecture, $2-\\varepsilon$ is impossible. So this five-line greedy algorithm is, as far as we know, <em>optimal among all efficient algorithms</em>. Simplicity and theoretical near-optimality coincide.</p></div>\n\n<h4>Greedy Set Cover and a logarithmic ratio</h4>\n<p>In <strong>Set Cover</strong> you are given a universe $U$ of $n$ elements and a collection of subsets $S_1,\\dots,S_m \\subseteq U$; pick the fewest subsets whose union is all of $U$. This models feature selection, sensor placement, and document summarization. The natural greedy algorithm:</p>\n<pre><code>SetCover(U, sets):\n    C = {}; covered = {}\n    while covered != U:\n        pick the set S that covers the MOST still-uncovered elements\n        add S to C; covered = covered ∪ S\n    return C</code></pre>\n<p>This greedy algorithm is an <strong>$H_n$-approximation</strong>, where $H_n = \\sum_{k=1}^{n} \\frac{1}{k}$ is the $n$-th harmonic number, and $H_n \\le \\ln n + 1$. So $\\text{ALG} \\le (\\ln n + 1)\\,\\text{OPT}$.</p>\n<p><strong>Sketch of the charging argument.</strong> Suppose OPT uses $k$ sets. At any moment, if $r$ elements remain uncovered, those $r$ elements are covered by OPT's $k$ sets, so by pigeonhole some available set covers at least $r/k$ of them. Greedy picks a set at least that good, so each round shrinks the uncovered count by a factor $(1 - 1/k)$. After $t$ rounds at most $n(1-1/k)^t < n e^{-t/k}$ remain; this drops below 1 once $t > k \\ln n$, giving roughly $k \\ln n$ sets. The careful per-element accounting (charge each newly covered element a cost of $1/(\\text{newly covered count})$) yields the exact $H_n$ bound.</p>\n<p>This $\\ln n$ factor is <em>also</em> essentially optimal: it is NP-hard to approximate Set Cover better than $(1-o(1))\\ln n$. Different problems have fundamentally different \"best achievable\" ratios — that landscape is what approximation theory maps out.</p>\n\n<h3>Part 2 — Randomized algorithms: Las Vegas vs Monte Carlo</h3>\n<p>A <strong>randomized algorithm</strong> makes decisions based on random bits (coin flips) in addition to its input. Its running time, its output, or both become <em>random variables</em>. Two flavors, named after gambling cities:</p>\n<ul>\n<li><strong>Las Vegas:</strong> <em>always correct</em>, running time is random. \"I will always find the right answer; I just can't promise exactly how long it takes.\" Example: randomized quicksort always sorts correctly.</li>\n<li><strong>Monte Carlo:</strong> <em>fixed running time</em>, output may be wrong with bounded probability. \"I'll finish on time, but with probability $\\le \\delta$ I'm wrong.\" Example: the Miller–Rabin primality test (each round catches a composite with prob $\\ge 3/4$; repeat to crush the error).</li>\n</ul>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Las Vegas trades <em>certainty of speed</em> for certainty of correctness; Monte Carlo trades <em>certainty of correctness</em> for certainty of speed. A Monte Carlo algorithm with a checkable answer can be converted to Las Vegas: keep re-running until a verification step confirms the output. The expected number of repeats is $1/(\\text{success prob})$.</p></div>\n\n<h4>Why randomize at all? Defeating the adversary</h4>\n<p>Deterministic quicksort with a fixed pivot rule (say \"always pick the first element\") has a worst case of $\\Theta(n^2)$, and an adversary who knows your rule can <em>construct</em> that worst case (feed it a sorted array). Randomization removes the adversary's power: if the pivot is chosen <em>uniformly at random</em>, no fixed input is bad, because the badness depends on coin flips the adversary cannot predict. The worst case still <em>exists</em> in principle, but it has vanishing probability. Randomness converts \"worst-case input\" into \"unlucky coin flips.\"</p>\n\n<h4>Worked example: expected running time of randomized quicksort</h4>\n<p>Randomized quicksort sorts $n$ distinct elements by picking a uniformly random pivot, partitioning, and recursing. Total work is dominated by the number of <strong>comparisons</strong>. We compute the expected number $E[X]$ of comparisons using a slick indicator-variable argument (Cormen et al.).</p>\n<p>Let the sorted order be $z_1 < z_2 < \\dots < z_n$. Define the indicator</p>\n$$X_{ij} = \\begin{cases} 1 & \\text{if } z_i \\text{ and } z_j \\text{ are ever compared} \\\\ 0 & \\text{otherwise.}\\end{cases}$$\n<p>Every comparison in quicksort is against a pivot, so any pair is compared <strong>at most once</strong>. Thus the total comparisons $X = \\sum_{i<j} X_{ij}$, and by linearity of expectation $E[X] = \\sum_{i<j} \\Pr[z_i \\text{ and } z_j \\text{ are compared}]$.</p>\n<p><strong>The key probability.</strong> Consider the set $Z_{ij} = \\{z_i, z_{i+1}, \\dots, z_j\\}$ of $j-i+1$ elements. Trace which of these is chosen as a pivot <em>first</em>. Two cases:</p>\n<ul>\n<li>If $z_i$ or $z_j$ is the first pivot from $Z_{ij}$, then $z_i$ and $z_j$ <em>are</em> compared (the pivot is compared to everything in its block, and they're still together).</li>\n<li>If some <em>middle</em> element $z_k$ ($i < k < j$) is the first pivot, then $z_i$ and $z_j$ get split into different partitions and are <em>never</em> compared.</li>\n</ul>\n<p>Since the first pivot among the $j-i+1$ elements of $Z_{ij}$ is equally likely to be any of them, the probability it is specifically $z_i$ or $z_j$ is $\\frac{2}{j-i+1}$. Therefore:</p>\n$$E[X] = \\sum_{i=1}^{n-1}\\sum_{j=i+1}^{n} \\frac{2}{j-i+1}.$$\n<p>Substitute $k = j-i$ (so $k$ ranges $1$ to $n-i$, and $j-i+1 = k+1$):</p>\n$$E[X] = \\sum_{i=1}^{n-1}\\sum_{k=1}^{n-i} \\frac{2}{k+1} < \\sum_{i=1}^{n-1}\\sum_{k=1}^{n} \\frac{2}{k} = \\sum_{i=1}^{n-1} 2 H_n < 2n H_n.$$\n<p>Since $H_n \\le \\ln n + 1 = O(\\log n)$, we get</p>\n$$E[X] = O(n \\log n).$$\n<p>So randomized quicksort runs in $O(n\\log n)$ <em>expected</em> time on <em>every</em> input — it is a <strong>Las Vegas</strong> algorithm. (The exact count works out to $2(n+1)H_n - 4n$; for $n=2000$ that's about $24{,}730$ comparisons, which I confirmed empirically matches simulation.) The $\\Theta(n^2)$ worst case still lurks but occurs only with probability that is astronomically small — for instance, the chance of always picking the min or max is $\\le 2^n / n!$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">ML connection</div><p>The indicator-variable + linearity-of-expectation technique is the workhorse of analyzing randomized ML methods: expected number of mistakes in the randomized perceptron, expected collisions in feature hashing / locality-sensitive hashing (the engine behind approximate nearest-neighbor search), and the variance of stochastic gradient estimates. \"Decompose into indicators, sum the probabilities, never touch the joint distribution\" is a reflex worth building.</p></div>\n\n<h4>Las Vegas vs Monte Carlo time, formally</h4>\n<p>For a Las Vegas algorithm we report <strong>expected running time</strong> $E[T]$. For a Monte Carlo algorithm we report a <strong>fixed</strong> running time plus an <strong>error probability</strong> $\\delta$. Error amplification is the bridge: if one Monte Carlo run is correct with probability $p > 1/2$ on a decision problem, running it $t$ times and taking the majority vote drives the error below any $\\delta$ with $t = O(\\log(1/\\delta))$ rounds — this is a Chernoff-bound consequence and the reason Monte Carlo methods are practical. One-sided-error variants (where a \"yes\" is always trustworthy but a \"no\" might be a fluke) amplify even faster: $t$ independent runs leave error $\\le (1-p)^t$.</p>\n\n<h3>Putting it together</h3>\n<p>Hardness is not a dead end; it is a fork in the road. When a problem is NP-hard you can (1) approximate — accept a provably bounded suboptimality in polynomial time, or (2) randomize — accept a probabilistic guarantee in exchange for speed and robustness against worst-case inputs. The two compose: many of the best approximation algorithms are themselves randomized (e.g., randomized rounding of a linear-program relaxation, combined with a uniform random assignment, gives a $\\frac{3}{4}$-approximation for MAX-SAT). And the entire framework — settle for approximate solutions, computed by randomized procedures, with guarantees stated in expectation or with high probability — is precisely the mathematical shape of modern machine learning.</p>",
          "mcq": [
            {
              "q": "The matching-based algorithm for Vertex Cover repeatedly picks an uncovered edge $(u,v)$ and adds BOTH endpoints. Why does this guarantee $|C| \\le 2\\,\\text{OPT}$ rather than just being a heuristic?",
              "choices": [
                "Because the chosen edges form a matching, so any cover needs $\\ge |M|$ vertices, and the algorithm uses exactly $2|M|$",
                "Because greedy algorithms are always within a factor 2 of optimal",
                "Because the algorithm computes OPT exactly and then doubles it for safety",
                "Because every graph has a vertex cover of size at most $2\\,\\text{OPT}$"
              ],
              "answer": 0,
              "explain": "The chosen edges are vertex-disjoint (a matching $M$), so OPT must spend at least one distinct vertex per matched edge, giving $\\text{OPT}\\ge|M|$; the algorithm uses $2|M|$, hence $2|M|\\le 2\\,\\text{OPT}$. The lower bound from the matching is the whole point."
            },
            {
              "q": "A Las Vegas algorithm differs from a Monte Carlo algorithm in that:",
              "choices": [
                "Las Vegas is always correct but its running time is random; Monte Carlo has fixed running time but may be wrong with bounded probability",
                "Las Vegas may be wrong; Monte Carlo is always correct",
                "Las Vegas uses no randomness at all; Monte Carlo uses randomness",
                "Las Vegas is faster on every input; Monte Carlo is slower but exact"
              ],
              "answer": 0,
              "explain": "Las Vegas trades certainty of speed for guaranteed correctness (e.g., randomized quicksort); Monte Carlo trades certainty of correctness for guaranteed running time (e.g., Miller-Rabin)."
            },
            {
              "q": "In the analysis of randomized quicksort, why is $\\Pr[z_i \\text{ and } z_j \\text{ are compared}] = \\frac{2}{j-i+1}$?",
              "choices": [
                "Among the $j-i+1$ elements between $z_i$ and $z_j$ inclusive, they are compared iff the FIRST one chosen as pivot is $z_i$ or $z_j$ (2 of the $j-i+1$ equally likely outcomes)",
                "Because each pair is compared on average twice per recursion level",
                "Because the pivot is always the median, so the gap is $j-i+1$",
                "Because there are $j-i+1$ recursive calls and 2 comparisons in each"
              ],
              "answer": 0,
              "explain": "If a middle element of $Z_{ij}$ is picked as pivot first, $z_i$ and $z_j$ are split apart and never compared; they are compared exactly when the first pivot drawn from the $j-i+1$ candidates is one of the two endpoints, probability $2/(j-i+1)$."
            },
            {
              "q": "Greedy Set Cover achieves an approximation ratio of $H_n \\le \\ln n + 1$. What does the $\\ln n$ factor fundamentally reflect about Set Cover compared to Vertex Cover?",
              "choices": [
                "Set Cover's best achievable polynomial-time ratio is logarithmic (and $\\ln n$ is essentially optimal), whereas Vertex Cover admits a constant ratio of 2",
                "Greedy is simply a worse algorithm and a constant-factor method for Set Cover exists",
                "The $\\ln n$ comes from the running time, not the solution quality",
                "Set Cover is easier than Vertex Cover, hence the larger-looking factor"
              ],
              "answer": 0,
              "explain": "Different NP-hard problems have different inherent approximability: Vertex Cover is constant-factor (2) approximable, while Set Cover cannot be approximated better than $(1-o(1))\\ln n$ unless P=NP, so the greedy $H_n$ bound is essentially the best possible."
            },
            {
              "q": "To prove an algorithm is a $\\rho$-approximation for an NP-hard minimization problem, the analysis almost always compares $\\text{ALG}(I)$ against a *lower bound* on $\\text{OPT}(I)$ rather than $\\text{OPT}(I)$ itself. Why?",
              "choices": [
                "Lower bounds are always tighter than $\\text{OPT}$, giving a smaller ratio",
                "Computing $\\text{OPT}(I)$ is itself NP-hard, so we reason about a quantity we can actually bound",
                "The approximation ratio is only defined relative to a lower bound, not to $\\text{OPT}$",
                "Lower bounds make the algorithm run faster"
              ],
              "answer": 1,
              "explain": "Since $\\text{OPT}$ is intractable to compute, the standard technique chains $\\text{ALG} \\le \\rho \\cdot (\\text{lower bound}) \\le \\rho \\cdot \\text{OPT}$ using a quantity we can analyze."
            },
            {
              "q": "For a *maximization* problem, an algorithm is a $\\rho$-approximation when:",
              "choices": [
                "$\\text{ALG}(I) \\le \\rho \\cdot \\text{OPT}(I)$ with $\\rho \\ge 1$",
                "$\\text{ALG}(I) \\ge \\rho \\cdot \\text{OPT}(I)$ with $\\rho \\le 1$",
                "$\\text{ALG}(I) = \\rho \\cdot \\text{OPT}(I)$ with $\\rho = 1$ on average",
                "$\\text{ALG}(I) \\ge \\rho \\cdot \\text{OPT}(I)$ with $\\rho \\ge 1$"
              ],
              "answer": 1,
              "explain": "For maximization the profit we report is at least a fraction $\\rho \\le 1$ of optimal, so the inequality is $\\text{ALG} \\ge \\rho \\cdot \\text{OPT}$ with $\\rho \\le 1$."
            },
            {
              "q": "The lesson frames training a neural network as the 'same intellectual move' as approximation plus randomization. Which mapping does it draw?",
              "choices": [
                "Non-convex optimization is NP-hard in general, so SGD accepts an approximate local optimum reached via random choices rather than demanding the global minimum",
                "Backpropagation is a Las Vegas algorithm that is always correct but has random runtime",
                "Neural network training is solved exactly in polynomial time using randomization",
                "Gradient descent is a 2-approximation algorithm for the global minimum"
              ],
              "answer": 0,
              "explain": "The lesson presents SGD as giving up the global optimum (approximation) while using randomness for a provably useful descent in expectation, fast."
            },
            {
              "q": "A guarantee that an algorithm is a 2-approximation for a minimization problem means which of the following?",
              "choices": [
                "On average over random inputs, the cost is at most twice optimal",
                "On every instance, no matter how adversarial, the cost is at most twice optimal",
                "On at least half of all instances the cost equals optimal",
                "With high probability the cost is at most twice optimal"
              ],
              "answer": 1,
              "explain": "The approximation ratio is a worst-case, instance-independent guarantee that holds for every input, not an average-case or probabilistic one."
            },
            {
              "q": "Suppose you run a Monte Carlo algorithm that returns the correct answer with probability $\\ge \\tfrac{2}{3}$ on each independent run, and you can cheaply verify whether any given output is correct. To boost the success probability to at least $1 - \\delta$, roughly how many independent runs do you need?",
              "choices": [
                "$\\Theta(1/\\delta)$ runs, because the failure probability shrinks linearly with the number of runs",
                "$\\Theta(\\log(1/\\delta))$ runs, because each run cuts the residual failure probability by a constant factor",
                "$\\Theta(1/\\delta^2)$ runs, by a Chernoff/concentration bound on the empirical success rate",
                "A single run already suffices, since $\\tfrac{2}{3} > \\tfrac{1}{2}$ guarantees correctness"
              ],
              "answer": 1,
              "explain": "Each independent run fails with probability $\\le \\tfrac{1}{3}$, so $k$ runs all fail with probability $\\le (1/3)^k$; setting $(1/3)^k \\le \\delta$ gives $k = \\Theta(\\log(1/\\delta))$. The $1/\\delta$ and $1/\\delta^2$ answers confuse geometric amplification with additive or variance-based bounds, and a single run gives no high-probability guarantee."
            },
            {
              "q": "An engineer runs the 2-approximation matching algorithm for Vertex Cover on a particular graph and finds it returns a cover of size exactly 40. Which conclusion is rigorously justified by the 2-approximation guarantee alone?",
              "choices": [
                "$\\text{OPT} = 20$, since the algorithm always returns exactly twice the optimum",
                "$\\text{OPT} \\le 40$, but the guarantee gives no nontrivial lower bound on $\\text{OPT}$",
                "$\\text{OPT} \\ge 20$, since the returned cover has size at most $2\\,\\text{OPT}$",
                "$\\text{OPT} \\ge 40$, because any cover the algorithm finds is a lower bound on the optimum"
              ],
              "answer": 2,
              "explain": "From $40 = |C| \\le 2\\,\\text{OPT}$ we get $\\text{OPT} \\ge 20$; also $\\text{OPT} \\le 40$ trivially since $C$ is a valid cover. The tempting wrong answer treats the ratio as exact equality, but a 2-approximation only bounds, never pins down, $\\text{OPT}$."
            },
            {
              "q": "For the greedy Set Cover analysis, the $H_n \\le \\ln n + 1$ ratio is shown to be essentially the best possible for any polynomial-time algorithm (assuming P $\\neq$ NP). What does this imply about searching for a constant-factor approximation for general Set Cover?",
              "choices": [
                "Such an algorithm is provably impossible in polynomial time unless P $=$ NP, so the logarithmic factor is inherent",
                "It exists but requires randomization rather than a greedy choice",
                "It is still open; the $H_n$ bound only reflects greedy's weakness, not a hardness limit",
                "It exists for instances where every set has bounded size, and that case is all that matters"
              ],
              "answer": 0,
              "explain": "Set Cover has a matching hardness result: no polynomial-time $(1-\\epsilon)\\ln n$-approximation exists unless P $=$ NP, so the $\\ln n$ factor is intrinsic, not an artifact of greedy. The distractor that it is 'just greedy's weakness' is the common misconception the hardness theorem refutes."
            },
            {
              "q": "A randomized algorithm has worst-case running time $O(n^2)$ but expected running time $O(n \\log n)$ over its internal coin flips, and always returns the correct answer. Which classification and reasoning is correct?",
              "choices": [
                "Monte Carlo, because randomness can make it slow on some coin-flip sequences",
                "Las Vegas, because it is always correct and randomness only affects the running time",
                "Neither, because a truly randomized algorithm must sometimes return a wrong answer",
                "Monte Carlo, because its expected time differs from its worst-case time"
              ],
              "answer": 1,
              "explain": "A Las Vegas algorithm is always correct, with randomness affecting only resource usage (here, running time) — exactly this case, like randomized quicksort. The Monte Carlo distractors wrongly tie the label to running-time variability rather than to the possibility of an incorrect output."
            },
            {
              "q": "Why use an approximation algorithm for an NP-hard optimization problem?",
              "choices": [
                "It is the only way to get the exact optimum",
                "Approximation is always both faster and exactly optimal",
                "Exact optimization is intractable, so you trade a <em>provable bound</em> on solution quality for polynomial running time",
                "It requires randomness to work"
              ],
              "answer": 2,
              "explain": "When the exact optimum is out of reach in polynomial time, an approximation algorithm returns a feasible solution with a guarantee — e.g. 'within a factor of 2 of optimal' — in polynomial time. The guarantee is what separates it from an ad-hoc heuristic."
            },
            {
              "q": "Randomized quicksort has expected running time $O(n\\log n)$. What about its worst case?",
              "choices": [
                "$O(n^2)$ — but it occurs with vanishingly small probability, and no fixed input can force it",
                "$O(n\\log n)$ on every input",
                "$O(n)$",
                "$O(n^2)$, triggered by already-sorted input"
              ],
              "answer": 0,
              "explain": "Randomizing the pivot means the $O(n^2)$ case still <em>exists</em> but depends on unlucky coin flips, not on the input — so an adversary choosing the input can't force it (unlike deterministic quicksort, which is $O(n^2)$ on sorted input). The expectation is $O(n\\log n)$."
            },
            {
              "q": "What does it mean that a randomized algorithm runs in <em>expected</em> $O(n\\log n)$ time?",
              "choices": [
                "It is guaranteed on every single run",
                "Averaged over randomly chosen inputs",
                "It is the best-case running time",
                "Averaged over the algorithm's own random choices — and this holds for <em>every</em> input"
              ],
              "answer": 3,
              "explain": "Expected-time bounds for a randomized algorithm average over its internal coin flips and hold for any fixed input — unlike average-case analysis, which averages over a distribution of inputs. Any individual run can still be slower."
            },
            {
              "q": "How does a provable approximation algorithm differ from an ordinary heuristic?",
              "choices": [
                "It is always slower than a heuristic",
                "It comes with a proven worst-case bound on how far its solution can be from optimal; a heuristic offers no such guarantee",
                "It always returns the exact optimum",
                "It only works on small inputs"
              ],
              "answer": 1,
              "explain": "Both run fast and return feasible solutions, but an approximation algorithm carries a theorem (e.g. 'cost ≤ 2·OPT'). A heuristic may work well in practice yet has no guarantee — it can be arbitrarily bad on a worst-case input."
            }
          ],
          "flashcards": [
            {
              "front": "Definition of a $\\rho$-approximation algorithm (minimization)",
              "back": "A polynomial-time algorithm such that for EVERY instance $I$, $\\text{ALG}(I) \\le \\rho \\cdot \\text{OPT}(I)$ with $\\rho \\ge 1$. The ratio is a worst-case, instance-independent guarantee. (For maximization, $\\text{ALG}\\ge\\rho\\,\\text{OPT}$ with $\\rho\\le 1$.)"
            },
            {
              "front": "Key proof trick for approximation ratios when OPT is uncomputable",
              "back": "Compare ALG to a LOWER BOUND on OPT that you can reason about (e.g., the size of a matching for Vertex Cover). If $\\text{ALG}\\le \\rho\\cdot(\\text{lower bound})\\le \\rho\\cdot\\text{OPT}$, you get the guarantee without ever computing OPT."
            },
            {
              "front": "Why is the matching algorithm a 2-approximation for Vertex Cover?",
              "back": "Chosen edges are vertex-disjoint (a matching $M$), so any cover needs $\\ge|M|$ vertices: $\\text{OPT}\\ge|M|$. The algorithm adds both endpoints of each, using $2|M|$. Thus $|C|=2|M|\\le 2\\,\\text{OPT}$."
            },
            {
              "front": "Las Vegas vs Monte Carlo",
              "back": "Las Vegas: ALWAYS correct, running time is a random variable (report expected time). Monte Carlo: FIXED running time, output wrong with bounded probability $\\delta$ (amplify by repetition)."
            },
            {
              "front": "Expected comparisons of randomized quicksort, and the technique",
              "back": "$E[X]=\\sum_{i<j}\\frac{2}{j-i+1} < 2nH_n = O(n\\log n)$. Technique: indicator $X_{ij}$ = 'are $z_i,z_j$ ever compared', linearity of expectation, and $\\Pr=\\frac{2}{j-i+1}$ (first pivot in $Z_{ij}$ is an endpoint)."
            },
            {
              "front": "Greedy Set Cover approximation ratio",
              "back": "$H_n$-approximation where $H_n=\\sum_{k=1}^n 1/k \\le \\ln n + 1$. Essentially optimal: NP-hard to approximate better than $(1-o(1))\\ln n$."
            }
          ],
          "homework": [
            {
              "prompt": "Run greedy Set Cover by hand. Universe $U=\\{1,2,3,4,5,6,7,8\\}$ and sets $S_1=\\{1,2,3,4,5\\}$, $S_2=\\{6,7\\}$, $S_3=\\{4,5,8\\}$, $S_4=\\{1,2,6,8\\}$, $S_5=\\{3,7\\}$. (a) Which sets does greedy pick, in order? (b) What is the true optimal cover? (c) State the ratio greedy achieved on THIS instance and compare it to the worst-case guarantee $H_8$.",
              "hint": "Greedy always grabs the set covering the most still-uncovered elements; break ties by lowest index. After each pick, recompute coverage counts on what remains. For OPT, look for a small combination that unions to all 8.",
              "solution": "(a) Greedy: $S_1$ covers 5 (the most) -> pick $S_1$, covered={1,2,3,4,5}, remaining={6,7,8}. Now $S_2$ covers {6,7}=2, $S_4$ covers {6,8}=2, $S_3$ covers {8}=1, $S_5$ covers {7}=1. Tie at 2 between $S_2$ and $S_4$; lowest index picks $S_2$, remaining={8}. Now only $S_3$ or $S_4$ cover 8 (one element each); pick $S_3$. Greedy = {S_1,S_2,S_3}, size 3. (b) Optimal: try $S_4=\\{1,2,6,8\\}$ + $S_3=\\{4,5,8\\}$ + $S_5=\\{3,7\\}$ = {1,2,3,4,5,6,7,8} -> size 3 (another optimal cover is {S_1,S_2,S_3}). Checking all pairs: no 2 sets union to all 8 (e.g. $S_1\\cup S_4=\\{1,2,3,4,5,6,8\\}$ misses 7; $S_1\\cup S_2=\\{1,2,3,4,5,6,7\\}$ misses 8). So OPT = 3. (c) Greedy ratio here = 3/3 = 1 (greedy was optimal on this instance). The worst-case guarantee is $H_8=1+\\tfrac12+\\cdots+\\tfrac18\\approx 2.718$, i.e. greedy could in principle be ~2.7x optimal; this instance was simply lucky. The point: the proven ratio is an upper bound, not the typical outcome."
            },
            {
              "prompt": "Consider a Monte Carlo algorithm for a decision problem that outputs the correct yes/no answer with probability $p=0.6$ on every input, independently across runs. You run it $t$ times and take the majority vote. (a) Why does majority voting reduce error? (b) Using the fact that for $t$ independent runs each correct with prob $p>1/2$, the majority-error decays exponentially in $t$, roughly how many runs do you need to get error below $\\delta$? Give the asymptotic form. (c) Contrast this with a ONE-SIDED-error Monte Carlo algorithm.",
              "hint": "Each run is a Bernoulli($p$) 'correct' trial; the majority is wrong only if fewer than half the runs are correct. Chernoff bounds give exponential decay in $t$ when $p>1/2$. For one-sided error, a single trustworthy answer settles it.",
              "solution": "(a) The number of correct runs is Binomial($t,p$) with mean $pt > t/2$. The majority vote is wrong only when correct runs $< t/2$, i.e. the empirical fraction deviates below its mean by $(p-1/2)$. By the law of large numbers this becomes rare as $t$ grows; Chernoff makes it exponentially rare: $\\Pr[\\text{majority wrong}] \\le e^{-2(p-1/2)^2 t}$. (b) Set $e^{-2(p-1/2)^2 t}\\le\\delta$, giving $t \\ge \\frac{\\ln(1/\\delta)}{2(p-1/2)^2} = O\\!\\big(\\log(1/\\delta)\\big)$ (the constant depends on the gap $p-1/2$; here $p-1/2=0.1$ so $\\frac{1}{2(0.1)^2}=50$, i.e. $t\\approx 50\\ln(1/\\delta)$, still logarithmic in $1/\\delta$). So error $\\delta=10^{-9}$ needs only on the order of a thousand runs ($50\\ln(10^9)\\approx 1036$). (c) For ONE-SIDED error (say the algorithm never outputs a false 'yes', only possibly a false 'no'), you do NOT need majority voting: a single 'yes' is definitively correct, so you just repeat until you see a 'yes', and $t$ runs leave error $\\le (1-p)^t$ -- decaying without the $1/2$-gap penalty, hence much faster amplification."
            },
            {
              "prompt": "Prove the lower bound used in the Vertex Cover 2-approximation, then exhibit a graph where the algorithm's output is exactly twice optimal (showing the ratio 2 is tight for this algorithm).",
              "hint": "For the lower bound, argue why a matching forces OPT to be large. For tightness, you want a graph that is itself a perfect matching so every chosen edge contributes 2 vertices but only 1 was necessary per edge.",
              "solution": "Lower bound: Let $M$ be the set of edges the algorithm selects. Each selection deletes both endpoints, so selected edges share no vertices -- $M$ is a matching. Any vertex cover $C^*$ must cover every edge, in particular every edge of $M$. Because the edges of $M$ are pairwise vertex-disjoint, covering edge $e_1\\in M$ and edge $e_2\\in M$ requires two DISTINCT vertices (a single vertex lies on at most one edge of a matching). Hence $C^*$ contains at least one distinct vertex per edge of $M$, so $|C^*|\\ge|M|$, i.e. $\\text{OPT}\\ge|M|$. The algorithm outputs $2|M|$ vertices, giving $|C|=2|M|\\le 2\\,\\text{OPT}$. Tightness: Take $G$ to be $k$ disjoint edges (a perfect matching on $2k$ vertices), e.g. $\\{a_1b_1, a_2b_2,\\dots,a_kb_k\\}$. The algorithm must pick all $k$ edges and adds both endpoints each time, returning all $2k$ vertices. But the optimal cover takes just one endpoint per edge -- size $k$. Thus $|C|/\\text{OPT} = 2k/k = 2$ exactly, so no analysis can prove a ratio better than 2 for this algorithm."
            }
          ],
          "examples": [
            {
              "title": "2-Approximation for Vertex Cover via Maximal Matching",
              "body": "Run the classic greedy 2-approximation for Vertex Cover on the graph with vertices $\\{1,2,3,4,5,6\\}$ and edges $E = \\{(1,2),(1,3),(3,4),(4,5),(5,6)\\}$. Report the cover the algorithm returns and prove it is at most twice the optimum.",
              "solution": "The algorithm: while there is an uncovered edge $(u,v)$, add <strong>both</strong> $u$ and $v$ to the cover and delete all edges touching either endpoint. The chosen edges form a matching $M$ (no two share a vertex), and the cover is exactly the set of matched endpoints.\n\n<strong>Trace</strong> (process uncovered edges in the listed order):\n\nStep 1: First uncovered edge is $(1,2)$. Add $1,2$. Cover $=\\{1,2\\}$. Delete every edge touching $1$ or $2$: that removes $(1,2)$ and $(1,3)$. Remaining edges: $(3,4),(4,5),(5,6)$.\n\nStep 2: First uncovered edge is $(3,4)$. Add $3,4$. Cover $=\\{1,2,3,4\\}$. Delete edges touching $3$ or $4$: removes $(3,4)$ and $(4,5)$. Remaining edges: $(5,6)$.\n\nStep 3: First uncovered edge is $(5,6)$. Add $5,6$. Cover $=\\{1,2,3,4,5,6\\}$. Delete $(5,6)$. No edges remain.\n\n<strong>Returned cover:</strong> $C = \\{1,2,3,4,5,6\\}$, of size $6$. The matching picked was $M = \\{(1,2),(3,4),(5,6)\\}$, with $|M| = 3$ and $|C| = 2|M| = 6$.\n\n<strong>Approximation guarantee.</strong> The edges in $M$ are pairwise vertex-disjoint, so any cover (including the optimum $C^*$) must use at least one distinct vertex per matched edge:\n$$|C^*| \\ge |M| = 3.$$\nSince $|C| = 2|M|$, we get $|C| \\le 2\\,|C^*|$ — a <strong>2-approximation</strong>.\n\n<strong>Checking against the true optimum.</strong> Here the path-like graph actually has an optimum of size $3$, e.g. $C^* = \\{1,4,5\\}$ covers $(1,2),(1,3),(3,4),(4,5),(5,6)$. So the algorithm returned $6$ versus optimal $3$, exactly hitting the worst-case ratio of $2$. The point is not that the heuristic found the best answer (it did not), but that we have a <em>proven</em> ceiling: the output never exceeds twice optimal, in polynomial time."
            },
            {
              "title": "Randomized MAX-SAT: the expected $7/8$ guarantee on a concrete formula",
              "body": "Consider the 3-CNF formula with variables $x_1,x_2,x_3$ and clauses $C_1=(x_1\\lor x_2\\lor x_3)$, $C_2=(\\lnot x_1\\lor x_2\\lor x_3)$, $C_3=(x_1\\lor \\lnot x_2\\lor x_3)$, $C_4=(\\lnot x_1\\lor \\lnot x_2\\lor x_3)$. Set each variable to true or false independently with probability $\\tfrac12$. Compute the expected number of satisfied clauses and show this beats a $7/8$-approximation in expectation.",
              "solution": "The randomized algorithm could not be simpler: flip a fair coin for each variable. The magic is in the analysis via <strong>linearity of expectation</strong>.\n\n<strong>Per-clause satisfaction probability.</strong> A clause of exactly $3$ distinct literals is <em>unsatisfied</em> only when all $3$ literals evaluate to false. Each literal is false with probability $\\tfrac12$, independently, so\n$$\\Pr[\\text{clause unsatisfied}] = \\left(\\tfrac12\\right)^3 = \\tfrac18, \\qquad \\Pr[\\text{clause satisfied}] = 1-\\tfrac18 = \\tfrac78.$$\n\n<strong>Expected total via indicators.</strong> Let $Y_j = 1$ if clause $C_j$ is satisfied. Then $\\mathbb{E}[Y_j] = \\tfrac78$ for each $j$, and by linearity (which needs <em>no</em> independence between clauses):\n$$\\mathbb{E}\\!\\left[\\sum_{j=1}^{4} Y_j\\right] = \\sum_{j=1}^{4}\\mathbb{E}[Y_j] = 4\\cdot\\tfrac78 = \\tfrac{28}{8} = 3.5.$$\nSo a random assignment satisfies $3.5$ of the $4$ clauses on average.\n\n<strong>Verifying by brute force (8 assignments).</strong> Write $(x_1,x_2,x_3)$ as bits. Count satisfied clauses for each of the $2^3=8$ settings:\n\n- $(0,0,0)$: $C_1$ fails; $C_2,C_3,C_4$ hold $\\Rightarrow 3$.\n- $(0,0,1)$: all hold $\\Rightarrow 4$.\n- $(0,1,0)$: $C_3$ fails $\\Rightarrow 3$.\n- $(0,1,1)$: all hold $\\Rightarrow 4$.\n- $(1,0,0)$: $C_2$ fails $\\Rightarrow 3$.\n- $(1,0,1)$: all hold $\\Rightarrow 4$.\n- $(1,1,0)$: $C_4$ fails $\\Rightarrow 3$.\n- $(1,1,1)$: all hold $\\Rightarrow 4$.\n\nAverage $= \\frac{3+4+3+4+3+4+3+4}{8} = \\frac{28}{8} = 3.5.$ This matches the formula exactly.\n\n<strong>Approximation guarantee.</strong> The optimum here is $\\mathrm{OPT}=4$ (e.g. $(0,0,1)$ satisfies all). The expected output is $3.5 = \\tfrac78\\cdot 4$, so the algorithm achieves $\\mathbb{E}[\\text{satisfied}] \\ge \\tfrac78\\,\\mathrm{OPT}$ — the $7/8$-approximation in expectation that holds for <em>any</em> exact-3-CNF formula.\n\n<strong>From expectation to a guaranteed assignment.</strong> Since the average over assignments is $3.5$, at least one assignment must satisfy $\\ge \\lceil 3.5\\rceil = 4$ clauses (you cannot have every outcome strictly below the mean). The 8-row table confirms four assignments hit $4$. This is the seed of the <em>method of conditional expectations</em>, which derandomizes the coin flips into a deterministic algorithm achieving the same $7/8$ bound."
            }
          ]
        },
        {
          "id": "a-string-algorithms",
          "title": "String Matching and Tries",
          "minutes": 14,
          "content": "<h3>Why Naive Matching Hurts, and What \"Efficient\" Means</h3>\n<p>The string-matching problem is deceptively simple to state: given a <strong>text</strong> $T$ of length $n$ and a <strong>pattern</strong> $P$ of length $m$, find all positions $i$ where $P$ occurs in $T$ (i.e. $T[i..i+m-1] = P$). The naive approach slides $P$ across $T$, comparing character by character at each offset. In the worst case — think $T = \\texttt{aaaa...a}$ and $P = \\texttt{aaa...ab}$ — every alignment fails on its last character, costing $\\Theta(nm)$ time.</p>\n<p>The deep insight that powers fast matching is this: <strong>when a mismatch occurs, the characters we already matched are not garbage — they tell us something.</strong> The naive algorithm throws that information away and restarts the pattern from scratch one position to the right. The clever algorithms keep it. We'll study three: <strong>KMP</strong> (exploits structure inside the pattern), <strong>Rabin-Karp</strong> (turns substrings into numbers via a rolling hash), and the <strong>trie</strong> (a tree that shares prefixes across many patterns at once).</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>All three techniques are about <em>amortizing work</em>. KMP precomputes the pattern's self-similarity so it never re-examines a text character. Rabin-Karp precomputes a hash so a window comparison is $O(1)$ instead of $O(m)$. A trie precomputes shared prefixes so $k$ words don't cost $k$ independent searches.</p>\n</div>\n\n<h3>KMP: The Prefix (Failure) Function</h3>\n<p>Knuth–Morris–Pratt (1977) achieves $O(n+m)$ worst-case time. Its engine is the <strong>prefix function</strong> (also called the <strong>failure function</strong>), computed on the pattern alone.</p>\n\n<h4>Definition</h4>\n<p>For a string $P$ of length $m$, the prefix function $\\pi$ is an array where $\\pi[i]$ is the length of the longest <strong>proper</strong> prefix of $P[0..i]$ that is also a <strong>suffix</strong> of $P[0..i]$. \"Proper\" means it is not the whole substring itself. Formally:</p>\n$$\\pi[i] = \\max\\{\\, k : 0 \\le k \\le i,\\ P[0..k-1] = P[i-k+1..i] \\,\\},$$\n<p>with $\\pi[0] = 0$ by convention (a single character has no proper prefix). This $k$ is sometimes called the longest <strong>border</strong> of the prefix $P[0..i]$ — a border being a string that is simultaneously a proper prefix and a proper suffix.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>If the first $j$ characters of $P$ matched the text and then character $j$ failed, we don't need to retreat in the text. The longest border $\\pi[j-1]$ tells us the longest already-matched prefix we can \"reuse\" — those characters are guaranteed to align — so we resume comparing from position $\\pi[j-1]$ of the pattern. The text pointer never moves backward. That single fact is the whole reason KMP is linear.</p>\n</div>\n\n<h4>Computing $\\pi$ in linear time</h4>\n<p>The construction is itself a self-matching of $P$ against $P$. We maintain a candidate border length $k$ and extend it:</p>\n<pre><code>def prefix_function(P):\n    m = len(P)\n    pi = [0] * m\n    k = 0                      # length of current longest border\n    for i in range(1, m):\n        while k > 0 and P[i] != P[k]:\n            k = pi[k - 1]      # fall back to next-shorter border\n        if P[i] == P[k]:\n            k += 1\n        pi[i] = k\n    return pi</code></pre>\n<p>The <code>while</code> loop looks dangerous, but $k$ increases by at most $1$ per iteration of the outer loop and never goes below $0$, so the total number of decrements across the whole run is bounded by the total increments — an amortized $O(m)$ argument. This is the same accounting trick that makes the search phase linear.</p>\n\n<h4>Worked example: the prefix table of <code>ABABCABAB</code></h4>\n<p>Index the pattern $0$-based: <code>A B A B C A B A B</code>. We fill $\\pi$ left to right.</p>\n<ul>\n<li>$i=0$ (<code>A</code>): $\\pi[0]=0$ by convention.</li>\n<li>$i=1$ (<code>AB</code>): does <code>B</code> match <code>A</code> (position $k=0$)? No. $\\pi[1]=0$.</li>\n<li>$i=2$ (<code>ABA</code>): <code>A</code> vs <code>A</code> ($k=0$): match, $k\\to 1$. $\\pi[2]=1$.</li>\n<li>$i=3$ (<code>ABAB</code>): <code>B</code> vs $P[1]=$<code>B</code>: match, $k\\to 2$. $\\pi[3]=2$.</li>\n<li>$i=4$ (<code>ABABC</code>): <code>C</code> vs $P[2]=$<code>A</code>: no. Fall back $k=\\pi[1]=0$. <code>C</code> vs $P[0]=$<code>A</code>: no. $\\pi[4]=0$.</li>\n<li>$i=5$ (<code>...CA</code>): <code>A</code> vs $P[0]=$<code>A</code>: match, $k\\to 1$. $\\pi[5]=1$.</li>\n<li>$i=6$: <code>B</code> vs $P[1]=$<code>B</code>: match, $k\\to 2$. $\\pi[6]=2$.</li>\n<li>$i=7$: <code>A</code> vs $P[2]=$<code>A</code>: match, $k\\to 3$. $\\pi[7]=3$.</li>\n<li>$i=8$: <code>B</code> vs $P[3]=$<code>B</code>: match, $k\\to 4$. $\\pi[8]=4$.</li>\n</ul>\n<p>So $\\pi = [0,0,1,2,0,1,2,3,4]$. Read $\\pi[8]=4$: the prefix <code>ABAB</code> (length 4) is both a prefix and a suffix of the whole pattern — exactly the kind of overlap KMP exploits.</p>\n\n<h4>The search phase</h4>\n<p>Searching mirrors the construction: slide a pattern pointer $q$ over the text, and on a mismatch fall back via $\\pi[q-1]$ instead of resetting to $0$.</p>\n<pre><code>def kmp_search(T, P):\n    pi = prefix_function(P)\n    q = 0                          # chars matched so far\n    hits = []\n    for i in range(len(T)):\n        while q > 0 and T[i] != P[q]:\n            q = pi[q - 1]\n        if T[i] == P[q]:\n            q += 1\n        if q == len(P):\n            hits.append(i - len(P) + 1)\n            q = pi[q - 1]          # keep searching for overlaps\n    return hits</code></pre>\n<p>Each text character is examined exactly once by the outer loop; the inner fallbacks are again amortized $O(1)$. Total: $O(n)$ search plus $O(m)$ preprocessing.</p>\n\n<h3>Rabin-Karp: Matching by Hashing</h3>\n<p>A different idea: compute a numeric hash of the pattern, and of each length-$m$ window of the text, then compare hashes. Equal strings always hash equal; if hashes differ, the strings differ — so we only do a full character comparison when hashes <em>collide</em>.</p>\n\n<h4>Polynomial hash and the rolling trick</h4>\n<p>Treat a string $s$ of length $m$ as a base-$b$ number modulo a large prime $M$:</p>\n$$h(s) = \\big(s[0]\\,b^{m-1} + s[1]\\,b^{m-2} + \\cdots + s[m-1]\\,b^{0}\\big) \\bmod M.$$\n<p>The magic is that adjacent windows share $m-1$ characters, so the hash can be <strong>rolled</strong> from one window to the next in $O(1)$. If the current window is $T[i..i+m-1]$ with hash $h$, the next window's hash is:</p>\n$$h' = \\big((h - T[i]\\,b^{m-1})\\cdot b + T[i+m]\\big) \\bmod M.$$\n<p>We subtract the contribution of the outgoing leading character, shift everything up one power of $b$ (multiply by $b$), and add the incoming character. Precompute $b^{m-1} \\bmod M$ once.</p>\n\n<h4>Worked trace</h4>\n<p>Let $T=\\texttt{31415}$, $P=\\texttt{14}$, base $b=10$, modulus $M=13$ (tiny, for illustration). Then $h(P) = (1\\cdot 10 + 4) \\bmod 13 = 14 \\bmod 13 = 1$. Precompute $b^{m-1}=10^{1}=10$.</p>\n<ul>\n<li>Window <code>31</code>: $h = 31 \\bmod 13 = 5$. $5 \\ne 1$, skip.</li>\n<li>Roll to <code>14</code>: $h' = ((5 - 3\\cdot 10)\\cdot 10 + 4)\\bmod 13 = ((5-30)\\cdot 10 + 4)\\bmod 13 = (-250+4)\\bmod 13 = -246 \\bmod 13 = 1$. Hash matches $h(P)=1$ — verify characters: <code>14</code> = <code>14</code>. <strong>Match at index 1.</strong></li>\n<li>Roll to <code>41</code>: $h' = ((1 - 1\\cdot 10)\\cdot 10 + 1)\\bmod 13 = ((1-10)\\cdot 10 + 1)\\bmod 13 = -89 \\bmod 13 = 2$. $2\\ne 1$, skip.</li>\n<li>Roll to <code>15</code>: $h' = ((2 - 4\\cdot 10)\\cdot 10 + 5)\\bmod 13 = (-380+5)\\bmod 13 = -375 \\bmod 13 = 2$. $2\\ne 1$, skip (correctly — <code>15</code> is not <code>14</code>, and the hashes agree on that).</li>\n</ul>\n<p>In this particular run no spurious hit arose. But note the safeguard built into the algorithm: whenever a window's hash <em>does</em> equal $h(P)$, we still compare the actual characters. That verification step is what protects correctness when the modulus is small and collisions are common — a different (hash, pattern) pairing could easily produce a window that hashes to $h(P)$ yet differs character-by-character, and only the explicit check would reject it.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Rabin-Karp's expected running time is $O(n+m)$ when $M$ is a large random-ish prime, because spurious collisions are rare. Its <em>worst</em> case is $O(nm)$ — an adversary who knows your hash can force a collision on every window. This adversarial fragility of a fixed deterministic hash is exactly why production systems use <strong>randomized</strong> bases (chosen at runtime) and why the same theme reappears in ML: feature hashing, MinHash for set similarity, SimHash for near-duplicate detection, and locality-sensitive hashing all trade exactness for $O(1)$ comparisons, and all must reckon with collisions.</p>\n</div>\n\n<h4>When to prefer which</h4>\n<ul>\n<li><strong>KMP</strong>: guaranteed linear, no false positives, single pattern. Best when you need worst-case guarantees.</li>\n<li><strong>Rabin-Karp</strong>: shines for <strong>multiple</strong> patterns of the same length (hash them all into a set, one text pass checks all) and for 2-D pattern matching. Probabilistic guarantee.</li>\n</ul>\n\n<h3>Tries: Sharing Prefixes Across a Dictionary</h3>\n<p>The previous algorithms search for one (or a few) fixed patterns. The <strong>trie</strong> (from re<em>trie</em>val; usually pronounced \"try\") flips the problem: store a whole <strong>set</strong> of strings so that membership, prefix, and autocomplete queries are fast. It is a rooted tree where each <strong>edge</strong> is labeled by a character and each <strong>node</strong> represents the prefix spelled out along the path from the root.</p>\n\n<h4>Structure and operations</h4>\n<p>Strings sharing a prefix share the corresponding path; the branching happens exactly where they diverge. A boolean flag marks nodes that are the end of a stored word (since a stored word may be a prefix of another, e.g. <code>car</code> and <code>card</code>).</p>\n<pre><code>class TrieNode:\n    def __init__(self):\n        self.children = {}      # char -> TrieNode\n        self.is_word  = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, w):\n        node = self.root\n        for ch in w:\n            node = node.children.setdefault(ch, TrieNode())\n        node.is_word = True\n\n    def search(self, w):                    # exact-word membership\n        node = self._walk(w)\n        return node is not None and node.is_word\n\n    def starts_with(self, prefix):          # any word with this prefix?\n        return self._walk(prefix) is not None\n\n    def _walk(self, s):\n        node = self.root\n        for ch in s:\n            if ch not in node.children:\n                return None\n            node = node.children[ch]\n        return node</code></pre>\n<p>Both <code>insert</code> and <code>search</code> run in $O(L)$ where $L$ is the length of the key — <strong>independent of how many words are stored</strong>. Compare this to a balanced BST ($O(L\\log N)$ because each of $\\log N$ comparisons may scan up to $L$ characters) or a hash set ($O(L)$ for exact lookup but with <em>no</em> ability to answer prefix/range queries).</p>\n\n<h4>Worked example: inserting a small dictionary</h4>\n<p>Insert <code>car</code>, <code>card</code>, <code>care</code>, <code>dog</code>. The resulting trie (★ marks <code>is_word</code>):</p>\n<pre><code>          (root)\n         /      \\\n        c        d\n        |        |\n        a        o\n        |        |\n        r ★      g ★\n       / \\\n      d ★ e ★\n   (card) (care)</code></pre>\n<p>Observations: <code>car</code>, <code>card</code>, <code>care</code> share the path <code>c-a-r</code>, so it is stored once; the node after <code>r</code> is flagged ★ because <code>car</code> is itself a word, and it branches to both <code>d</code> and <code>e</code>. Now:</p>\n<ul>\n<li><code>search(\"car\")</code> → walk <code>c,a,r</code>, node exists and <code>is_word=True</code> → <strong>True</strong>.</li>\n<li><code>search(\"ca\")</code> → walk <code>c,a</code>, node exists but <code>is_word=False</code> → <strong>False</strong> (it's a prefix, not a stored word).</li>\n<li><code>starts_with(\"car\")</code> → node exists → <strong>True</strong> (3 completions hang at or below it).</li>\n<li><code>search(\"cat\")</code> → after <code>c,a</code>, no child <code>t</code> → <strong>False</strong>.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Connections to ML / AI</div>\n<p>Tries underlie <strong>subword tokenization</strong> (the longest-match scans in WordPiece/BPE-style vocabularies are trie or trie-like lookups), efficient <strong>autocomplete and spell-correction</strong>, IP routing tables (radix tries), and <strong>constrained / grammar-guided decoding</strong> in LLMs, where a trie over allowed continuations masks the next-token logits so the model can only emit valid strings (JSON keys, SQL keywords, a fixed answer set). The <strong>Aho-Corasick</strong> automaton — a trie augmented with KMP-style failure links — matches thousands of patterns in one text pass and is the standard tool behind keyword filters, intrusion detection, and PII scrubbers in data pipelines. Notice the recurring motif: KMP's failure function reappears as the trie's failure links. They are the same idea at two scales.</p>\n</div>\n\n<h4>Cost trade-offs</h4>\n<p>A trie's weakness is <strong>space</strong>: a naive node with a hash-map of children, or worse an array of size $|\\Sigma|$ (alphabet) per node, can be memory-heavy when paths don't share much. Remedies include <strong>compressed (radix/Patricia) tries</strong> that collapse non-branching chains into single edges, and <strong>DAWGs</strong> (directed acyclic word graphs) that also merge shared suffixes. The right structure depends on whether your queries are exact-only (hash set), prefix-heavy (trie), or worst-case-critical (KMP/automaton).</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>KMP</strong>: prefix function $\\pi[i]$ = longest proper prefix that is also a suffix of $P[0..i]$; enables $O(n+m)$ search with no text backtracking.</li>\n<li><strong>Rabin-Karp</strong>: polynomial rolling hash gives $O(1)$ window updates and $O(n+m)$ expected time; always verify on a hash hit to reject collisions.</li>\n<li><strong>Trie</strong>: prefix tree giving $O(L)$ insert/search/prefix queries independent of dictionary size; the foundation of autocomplete, tokenization, and multi-pattern matching (Aho-Corasick).</li>\n</ul>",
          "mcq": [
            {
              "q": "For the pattern $P = \\texttt{ABABCABAB}$, what is the value of the KMP prefix function at the last index, $\\pi[8]$?",
              "choices": [
                "2",
                "3",
                "4",
                "5"
              ],
              "answer": 2,
              "explain": "The longest proper prefix of ABABCABAB that is also a suffix is ABAB (length 4); the next-longest border would be shorter, so $\\pi[8]=4$. Choice index 2 is \"4\"."
            },
            {
              "q": "Why does the KMP search phase run in $O(n)$ time even though it contains a nested while-loop that can fall back multiple times per character?",
              "choices": [
                "The while-loop runs at most a constant number of times for every character",
                "The pattern pointer $q$ is incremented at most $n$ times total and each fallback strictly decreases it, so total decrements are bounded by total increments (amortized $O(1)$)",
                "The prefix function guarantees the text contains no repeated characters",
                "Hashing makes each comparison constant time"
              ],
              "answer": 1,
              "explain": "This is an amortized argument: $q$ rises by at most 1 per text character (at most $n$ total) and every fallback decreases it, so the cumulative fallback work cannot exceed the cumulative increases."
            },
            {
              "q": "In Rabin-Karp, a length-$m$ text window's hash equals the pattern's hash. What must the algorithm do, and why?",
              "choices": [
                "Report a match immediately; equal hashes guarantee equal strings",
                "Compare the actual characters, because different strings can hash to the same value (a collision / spurious hit)",
                "Recompute the hash with a larger modulus to confirm",
                "Skip the window, since equal hashes usually indicate a false positive"
              ],
              "answer": 1,
              "explain": "Hashing is many-to-one, so equal hashes only suggest a match; a character-by-character verification is required to rule out collisions and keep the result correct."
            },
            {
              "q": "You store the words car, card, care in a trie, then call search(\"ca\"). What is returned and why?",
              "choices": [
                "True, because ca is a prefix of stored words",
                "False, because the node for ca exists but its is_word flag is not set",
                "True, because the path c-a exists in the trie",
                "An error, because ca was never inserted"
              ],
              "answer": 1,
              "explain": "search checks both that the path exists and that the terminal node is flagged as a complete word; ca is only an internal prefix, so is_word is False. starts_with(\"ca\"), by contrast, would return True."
            },
            {
              "q": "What does the value $\\pi[i]$ of the KMP prefix function represent for a pattern $P$?",
              "choices": [
                "The length of the longest proper prefix of $P[0..i]$ that is also a suffix of $P[0..i]$",
                "The number of times $P[i]$ appears in the entire pattern",
                "The index in the text where the current alignment of $P$ began",
                "The hash value of the substring $P[0..i]$ used for rolling comparisons"
              ],
              "answer": 0,
              "explain": "By definition $\\pi[i]$ is the length of the longest border (a string that is both a proper prefix and a proper suffix) of the prefix $P[0..i]$."
            },
            {
              "q": "When a mismatch occurs after matching $j$ characters of $P$, why does KMP avoid moving backward in the text $T$?",
              "choices": [
                "Because the already-matched prefix has a known border, so its first $\\pi[j-1]$ characters are guaranteed to still align with the text",
                "Because the text is preprocessed into a hash table that forbids backtracking",
                "Because moving backward would change the asymptotic time to $\\Theta(nm)$ only when $P$ is periodic",
                "Because the failure function deletes text characters as they are consumed"
              ],
              "answer": 0,
              "explain": "The matched characters carry information: the longest border $\\pi[j-1]$ tells KMP which already-aligned prefix to reuse, so the text pointer never retreats."
            },
            {
              "q": "In Rabin-Karp, what is the primary benefit of using a rolling hash over recomputing each window's hash from scratch?",
              "choices": [
                "Each window's hash is updated in $O(1)$ from the previous window instead of $O(m)$",
                "It eliminates the need to ever compare characters directly, even on a hash collision",
                "It reduces the pattern preprocessing from $O(m)$ to $O(1)$",
                "It guarantees zero false-positive matches regardless of the modulus chosen"
              ],
              "answer": 0,
              "explain": "A rolling hash removes the leaving character and adds the entering one in constant time, so sliding the window costs $O(1)$ rather than $O(m)$ to rehash."
            },
            {
              "q": "What advantage does a trie provide when searching for $k$ different words that share common prefixes, compared to running $k$ independent searches?",
              "choices": [
                "Shared prefixes are stored and traversed once, so overlapping work is amortized across all $k$ words",
                "It guarantees each individual word lookup runs in $O(1)$ regardless of word length",
                "It converts every word into a single integer hash to enable $O(1)$ comparison",
                "It avoids storing any prefix that is itself a complete word in the set"
              ],
              "answer": 0,
              "explain": "A trie merges shared prefixes into common paths, so $k$ words with overlapping prefixes do not pay for $k$ separate independent traversals."
            },
            {
              "q": "During KMP search you have matched $q=5$ characters of $P=\\texttt{ABABA}$ (so $\\pi=[0,0,1,2,3]$) when the next text character mismatches $P[5]$. To how many matched characters does $q$ fall back, and what guarantees those characters still align with the text without any re-comparison?",
              "choices": [
                "$q\\to 0$; KMP always discards all progress and restarts the pattern after a mismatch",
                "$q\\to 4$; it simply decrements $q$ by one and re-tests the previous character",
                "$q\\to 3$; the prefix $\\texttt{ABA}$ of length $\\pi[4]=3$ is a border, so it already matched the same text earlier",
                "$q\\to 3$; but the algorithm must re-read 3 text characters to confirm the new alignment"
              ],
              "answer": 2,
              "explain": "On a mismatch after $q$ matches, KMP sets $q\\to\\pi[q-1]=\\pi[4]=3$, reusing the longest border $\\texttt{ABA}$ which is simultaneously a prefix and suffix of the matched region, so those 3 characters are guaranteed to coincide with the text already matched. It is not a reset to 0 (that is the naive algorithm), nor a decrement by one, and crucially no text characters are re-read."
            },
            {
              "q": "An adversary gets to choose the text $T$ and pattern $P$ knowing your fixed Rabin-Karp base $b$ and modulus $M$. What is the worst-case running time they can force, and why does it not contradict the usual $O(n+m)$ claim?",
              "choices": [
                "$\\Theta(nm)$, because the adversary can make every window's hash collide with $h(P)$, forcing a full $O(m)$ character check at each of the $n$ positions",
                "$\\Theta(n+m)$, because the rolling hash makes each window $O(1)$ regardless of the inputs",
                "$\\Theta(n\\log m)$, because verifying a hash hit costs $O(\\log m)$ via binary search",
                "$\\Theta(m^2)$, because recomputing the pattern hash dominates"
              ],
              "answer": 0,
              "explain": "A fixed deterministic hash lets an adversary engineer collisions on every window, so each of the $n$ positions triggers an $O(m)$ verification, giving $\\Theta(nm)$. The $O(n+m)$ figure is only an expected bound that assumes collisions are rare (large random-ish $M$), which is why production code randomizes the base; the rolling step is $O(1)$ but verification is not free."
            },
            {
              "q": "You need a data structure over a dictionary of $N$ words that supports both exact-membership lookup and 'list all words beginning with a given prefix.' Why is a hash set a poor fit where a trie excels, despite both giving $O(L)$ exact lookup?",
              "choices": [
                "A hash set uses more memory per word than a trie in every case",
                "A hash set's exact lookup is actually $O(L\\log N)$, slower than the trie's $O(L)$",
                "A trie answers exact lookup in $O(1)$ while a hash set needs $O(L)$",
                "A hash set scatters keys by their full-string hash, so it cannot enumerate keys sharing a prefix without scanning all $N$ entries, whereas a trie groups them under one shared path"
              ],
              "answer": 3,
              "explain": "Hashing destroys any ordering or prefix relationship between keys, so retrieving all words with a given prefix requires scanning the entire set; a trie stores shared prefixes along a common path, so a prefix query lands on one node whose subtree holds exactly the matching words. Both do offer $O(L)$ exact lookup, so the difference is capability (prefix queries), not the exact-lookup cost."
            },
            {
              "q": "Aho-Corasick is described as 'a trie augmented with KMP-style failure links.' What problem do these failure links solve that a plain trie cannot, and what classic idea do they generalize?",
              "choices": [
                "They compress non-branching chains to save memory, generalizing Patricia/radix tries",
                "They mark word-ends so prefixes like $\\texttt{car}$ inside $\\texttt{card}$ are still recognized, generalizing the is_word flag",
                "They let one text pass match all dictionary words simultaneously by redirecting, after a mismatch, to the longest proper suffix of the consumed text that is also a trie prefix — generalizing KMP's prefix function to many patterns",
                "They randomize child pointers to avoid adversarial worst cases, generalizing Rabin-Karp's randomized base"
              ],
              "answer": 2,
              "explain": "A plain trie can only follow exact downward edges; failure links let the automaton, on a mismatch, jump to the node spelling the longest proper suffix of the text consumed so far that is still a trie prefix, so a single text pass matches every dictionary word at once. This is exactly KMP's prefix-function idea (longest border) lifted from one pattern to a whole set, not memory compression or word-end marking."
            },
            {
              "q": "The naive (brute-force) string matcher tries the pattern at every text position. For text length $n$ and pattern length $m$, its worst-case time is…",
              "choices": [
                "$O(m\\log n)$",
                "$O(n+m)$",
                "$O(n)$",
                "$O(nm)$"
              ],
              "answer": 3,
              "explain": "At each of the $\\sim n$ alignments it may compare up to $m$ characters before a mismatch (e.g. text $\\texttt{AAAA...}$, pattern $\\texttt{AAAB}$), giving $O(nm)$. KMP removes the redundant re-comparisons to reach $O(n+m)$."
            },
            {
              "q": "KMP matches a pattern (length $m$) in a text (length $n$) in total time…",
              "choices": [
                "$O(nm)$",
                "$O(n+m)$",
                "$O(n^2)$",
                "$O(m^2)$"
              ],
              "answer": 1,
              "explain": "Building the prefix-function table is $O(m)$, and the search scans the text without ever moving the text pointer backward, $O(n)$ — total $O(n+m)$, linear and worst-case-guaranteed."
            },
            {
              "q": "A trie (prefix tree) stores a set of strings so that…",
              "choices": [
                "strings are kept sorted by frequency",
                "all strings live in a single hash bucket",
                "strings sharing a common prefix share one path from the root, and a lookup costs $O(\\text{length of the key})$",
                "each string is an independent array with no sharing"
              ],
              "answer": 2,
              "explain": "Each edge is a character; a word is a root-to-node path. Shared prefixes are stored once, lookups/insertions take time proportional to the key length (independent of how many words are stored), and it naturally supports prefix queries like autocomplete."
            },
            {
              "q": "You must find a single pattern in a large text with a <em>guaranteed</em> linear-time worst case. Which algorithm fits best?",
              "choices": [
                "KMP — $O(n+m)$ worst-case, guaranteed",
                "Naive matching",
                "Rabin-Karp",
                "A trie"
              ],
              "answer": 0,
              "explain": "KMP guarantees $O(n+m)$ on every input. Naive is $O(nm)$ worst-case; Rabin-Karp is expected-linear but can degrade to $O(nm)$ under hash collisions (or an adversarial text); tries are for searching <em>many</em> words, not one pattern in a text."
            }
          ],
          "flashcards": [
            {
              "front": "Define the KMP prefix (failure) function $\\pi[i]$.",
              "back": "The length of the longest PROPER prefix of $P[0..i]$ that is also a suffix of $P[0..i]$ (the longest border of that prefix). $\\pi[0]=0$ by convention."
            },
            {
              "front": "What is the time complexity of KMP, split into phases, and what is its key non-backtracking property?",
              "back": "$O(m)$ to build the prefix function + $O(n)$ to search = $O(n+m)$. The text pointer never moves backward; on a mismatch the pattern pointer falls back via $\\pi$."
            },
            {
              "front": "Write the Rabin-Karp rolling-hash update from window $T[i..i+m-1]$ (hash $h$) to the next window.",
              "back": "$h' = \\big((h - T[i]\\,b^{m-1})\\cdot b + T[i+m]\\big) \\bmod M$. Subtract the leaving char's contribution, shift by multiplying by base $b$, add the entering char; precompute $b^{m-1}\\bmod M$."
            },
            {
              "front": "Rabin-Karp time complexity: expected vs worst case, and what causes the gap?",
              "back": "Expected $O(n+m)$ with a large/random prime modulus; worst case $O(nm)$ from many hash collisions (an adversary can force this against a fixed hash). Always verify characters on a hash hit."
            },
            {
              "front": "Trie insert/search complexity, and how does it compare to a hash set or BST?",
              "back": "$O(L)$ for a key of length $L$, independent of the number $N$ of stored words. Hash set: $O(L)$ exact lookup but no prefix queries. Balanced BST: $O(L\\log N)$. Trie uniquely supports fast prefix/autocomplete queries."
            },
            {
              "front": "How are KMP and tries connected via Aho-Corasick?",
              "back": "Aho-Corasick = a trie of all patterns plus KMP-style failure links (longest proper suffix that is a prefix of some pattern), enabling all patterns to be matched in one $O(n + \\text{total pattern length} + \\text{hits})$ text pass."
            }
          ],
          "homework": [
            {
              "prompt": "Compute the full KMP prefix function array $\\pi$ for the pattern $P = \\texttt{AABAACAABAA}$ (length 11).",
              "hint": "Maintain a border length $k$ starting at 0; on a mismatch fall back to $\\pi[k-1]$, on a match increment $k$ and set $\\pi[i]=k$. Be careful around the C, which breaks the run.",
              "solution": "Index 0-based: A A B A A C A A B A A.\n- i=0 (A): pi[0]=0.\n- i=1 (A vs P[0]=A): match, k=1, pi[1]=1.\n- i=2 (B vs P[1]=A): no; k=pi[0]=0; B vs P[0]=A: no; pi[2]=0.\n- i=3 (A vs P[0]=A): match, k=1, pi[3]=1.\n- i=4 (A vs P[1]=A): match, k=2, pi[4]=2.\n- i=5 (C vs P[2]=B): no; k=pi[1]=1; C vs P[1]=A: no; k=pi[0]=0; C vs P[0]=A: no; pi[5]=0.\n- i=6 (A vs P[0]=A): match, k=1, pi[6]=1.\n- i=7 (A vs P[1]=A): match, k=2, pi[7]=2.\n- i=8 (B vs P[2]=B): match, k=3, pi[8]=3.\n- i=9 (A vs P[3]=A): match, k=4, pi[9]=4.\n- i=10 (A vs P[4]=A): match, k=5, pi[10]=5.\nResult: pi = [0,1,0,1,2,0,1,2,3,4,5]. The final 5 means AABAA is both a prefix and suffix of the whole pattern."
            },
            {
              "prompt": "Using base $b=10$ and modulus $M=13$, run Rabin-Karp to find $P=\\texttt{26}$ in $T=\\texttt{2359023141526739}$ restricted to the first six characters $\\texttt{235902}$. Show $h(P)$ and the rolling hashes of each window, and identify any spurious hits.",
              "hint": "First $h(P)=26 \\bmod 13$. Compute the first window hash directly, then roll with $h' = ((h - T[i]\\cdot 10)\\cdot 10 + T[i+m]) \\bmod 13$, always feeding back the PREVIOUS window's hash. Verify characters on every hash match.",
              "solution": "h(P) = 26 mod 13 = 0. b^(m-1)=10^1=10. Windows of T='235902':\n- '23': 23 mod 13 = 10. 10!=0, skip.\n- roll to '35': ((10 - 2*10)*10 + 5) mod 13 = ((10-20)*10+5) mod 13 = (-95) mod 13. Since 13*8=104, -95+104=9. So 9. 9!=0, skip.\n- roll to '59': ((9 - 3*10)*10 + 9) mod 13 = ((9-30)*10+9) mod 13 = (-201) mod 13. Since 13*16=208, -201+208=7. So 7. skip.\n- roll to '90': ((7 - 5*10)*10 + 0) mod 13 = ((7-50)*10+0) mod 13 = (-430) mod 13. Since 13*34=442, -430+442=12. So 12. skip.\n- roll to '02': ((12 - 9*10)*10 + 2) mod 13 = ((12-90)*10+2) mod 13 = (-778) mod 13. Since 13*60=780, -778+780=2. So 2. h=2 != 0, skip.\nWindow hashes are 10, 9, 7, 12, 2 — none equal h(P)=0, so there are no hash hits and no matches (26 indeed does not occur in 235902). No spurious hits arose. (Sanity check on a known match: the substring '26' appears later in the full T; with this small M you would see it hash to 0 and then pass character verification.)"
            },
            {
              "prompt": "Insert the words {bat, batch, bath, bad, be} into a trie. (a) Draw or describe the resulting structure, marking which nodes have is_word=True. (b) State the results of search(\"bat\"), search(\"ba\"), starts_with(\"bat\"), search(\"batch\"), search(\"bate\").",
              "hint": "All five words share the path starting at b; they diverge after 'ba' (into 't', 'd') and after 'bat' (into 'c', 'h'). Remember is_word marks a complete stored word, not merely an existing node.",
              "solution": "(a) Structure (★ = is_word):\nroot -> b -> a -> t ★(bat) -> c -> h ★(batch)\n                         t -> h ★(bath)\n              a -> d ★(bad)\n     b -> e ★(be)\nMore explicitly: from root, child 'b'. From b: child 'a' and child 'e'★(be). From 'a': children 't' and 'd'★(bad). Node 't' is ★(bat) and has children 'c' and 'h'★(bath). Node 'c' has child 'h'★(batch).\n(b) Results:\n- search('bat') = True (node exists, is_word set).\n- search('ba') = False (node exists but is_word not set; it's an internal prefix).\n- starts_with('bat') = True (node exists; completions bat, batch, bath hang at or below it).\n- search('batch') = True (full path exists, is_word set).\n- search('bate') = False (after 'bat' there is no child 'e')."
            }
          ],
          "examples": [
            {
              "title": "Building the KMP Prefix Function",
              "body": "Compute the KMP prefix (failure) function $\\pi$ for the pattern $P = \\texttt{ababaca}$, where $\\pi[i]$ is the length of the longest proper prefix of $P[0..i]$ that is also a suffix of $P[0..i]$.",
              "solution": "We process indices $i = 0,1,\\dots,6$ left to right, maintaining $k$ = the length of the current candidate prefix. Start with $\\pi[0] = 0$ (a single character has no proper prefix) and $k = 0$.\n\n<strong>$i=1$, $P[1]=\\texttt{b}$:</strong> Compare $P[k]=P[0]=\\texttt{a}$ with $\\texttt{b}$ — mismatch. Since $k=0$ we cannot fall back further, so $\\pi[1]=0$.\n\n<strong>$i=2$, $P[2]=\\texttt{a}$:</strong> Compare $P[0]=\\texttt{a}$ with $\\texttt{a}$ — match. Increment $k$ to $1$, set $\\pi[2]=1$.\n\n<strong>$i=3$, $P[3]=\\texttt{b}$:</strong> Compare $P[k]=P[1]=\\texttt{b}$ with $\\texttt{b}$ — match. Increment $k$ to $2$, set $\\pi[3]=2$.\n\n<strong>$i=4$, $P[4]=\\texttt{a}$:</strong> Compare $P[k]=P[2]=\\texttt{a}$ with $\\texttt{a}$ — match. Increment $k$ to $3$, set $\\pi[4]=3$.\n\n<strong>$i=5$, $P[5]=\\texttt{c}$:</strong> Compare $P[k]=P[3]=\\texttt{b}$ with $\\texttt{c}$ — mismatch. Fall back: $k \\leftarrow \\pi[k-1] = \\pi[2] = 1$. Compare $P[1]=\\texttt{b}$ with $\\texttt{c}$ — still mismatch. Fall back again: $k \\leftarrow \\pi[0] = 0$. Now $k=0$ and $P[0]=\\texttt{a} \\neq \\texttt{c}$, so $\\pi[5]=0$.\n\n<strong>$i=6$, $P[6]=\\texttt{a}$:</strong> Compare $P[k]=P[0]=\\texttt{a}$ with $\\texttt{a}$ — match. Increment $k$ to $1$, set $\\pi[6]=1$.\n\nCollecting the values for $P = \\texttt{a\\,b\\,a\\,b\\,a\\,c\\,a}$:\n\n$$\\pi = [\\,0,\\ 0,\\ 1,\\ 2,\\ 3,\\ 0,\\ 1\\,]$$\n\nNotice the cascade at $i=5$: a single mismatch triggered two fallbacks, but each fallback only ever <em>decreases</em> $k$, while each match increases $k$ by one — this amortized accounting is exactly why the whole table costs $\\Theta(m)$."
            },
            {
              "title": "Rabin-Karp Rolling Hash with a Spurious Hit",
              "body": "Search for the pattern $P = \\texttt{bcd}$ in the text $T = \\texttt{abcde}$ using a Rabin-Karp rolling hash with base $b = 26$ (mapping $\\texttt{a}=0,\\texttt{b}=1,\\dots,\\texttt{z}=25$) and modulus $q = 11$. Show each window hash and identify any spurious match.",
              "solution": "We treat each length-3 window as a base-26 number reduced mod $11$. The pattern hash is\n$$h(P) = (1\\cdot 26^2 + 2\\cdot 26 + 3) \\bmod 11.$$\nReducing the powers first: $26 \\equiv 4$ and $26^2 = 676 \\equiv 5 \\pmod{11}$ (since $676 = 61\\cdot 11 + 5$). So\n$$h(P) = (1\\cdot 5 + 2\\cdot 4 + 3) \\bmod 11 = (5 + 8 + 3)\\bmod 11 = 16 \\bmod 11 = 5.$$\n\n<strong>Window 0, $T[0..2]=\\texttt{abc}$</strong> $= (0,1,2)$:\n$$h = (0\\cdot 5 + 1\\cdot 4 + 2)\\bmod 11 = 6.$$\nSince $6 \\neq 5$, no match — and we never compare characters.\n\n<strong>Roll to Window 1, $T[1..3]=\\texttt{bcd}$:</strong> Use the rolling update — drop the leading $\\texttt{a}=0$, shift, add the new $\\texttt{d}=3$:\n$$h = \\big((6 - 0\\cdot 5)\\cdot 26 + 3\\big)\\bmod 11 = (6\\cdot 26 + 3)\\bmod 11.$$\nWith $26 \\equiv 4$: $h = (6\\cdot 4 + 3)\\bmod 11 = 27\\bmod 11 = 5.$ This <strong>equals</strong> $h(P)=5$, so we do a full character check: $\\texttt{bcd} = \\texttt{bcd}$ — a genuine match at position $1$.\n\n<strong>Roll to Window 2, $T[2..4]=\\texttt{cde}$</strong> $=(2,3,4)$: drop $\\texttt{b}=1$, add $\\texttt{e}=4$:\n$$h = \\big((5 - 1\\cdot 5)\\cdot 26 + 4\\big)\\bmod 11 = (0\\cdot 26 + 4)\\bmod 11 = 4.$$\nSince $4 \\neq 5$, no match.\n\nSummary of window hashes: $\\texttt{abc}\\to 6$, $\\texttt{bcd}\\to 5$, $\\texttt{cde}\\to 4$. The only hash collision with $h(P)$ is at position $1$, and it was a <em>true</em> match.\n\n<strong>The spurious-hit lesson.</strong> Because $q=11$ is tiny, distinct windows easily collide. For instance the window $\\texttt{abc}=(0,1,2)$ gives hash $6$; a different string like $\\texttt{nop}=(13,14,15)$ would give $(13\\cdot5+14\\cdot4+15)\\bmod 11 = (65+56+15)\\bmod 11 = 136\\bmod 11 = 4$ — equal to the hash of $\\texttt{cde}$, even though the strings differ. That is exactly why Rabin-Karp <strong>must</strong> verify a hash equality with a direct character comparison: matching hashes are necessary but not sufficient.\n\n<strong>Answer:</strong> $P=\\texttt{bcd}$ occurs once, at position $1$ in $T$; no spurious hits arose here, but the small modulus shows how collisions force the verification step."
            }
          ]
        },
        {
          "id": "a-algorithms-for-ml",
          "title": "Algorithmic Foundations of Machine Learning",
          "minutes": 18,
          "content": "<h3>Why algorithms are the bedrock of machine learning</h3>\n<p>Machine learning often gets described in the language of statistics and calculus: loss functions, gradients, probability distributions. But underneath every trained model is an <strong>algorithm</strong> — a concrete computational procedure with a running time, a memory footprint, and convergence behavior. When a model takes three weeks to train, or an inference call must return in 10 milliseconds across a billion vectors, the bottleneck is almost never the math on paper. It is the algorithm and its complexity.</p>\n<p>In this lesson we connect four pillars of classical algorithms directly to the ML systems they power:</p>\n<ul>\n<li><strong>Gradient descent</strong> — iterative optimization, the workhorse that fits nearly every modern model.</li>\n<li><strong>Dynamic programming</strong> — the engine behind sequence models, made concrete through the Viterbi and forward algorithms.</li>\n<li><strong>k-means and k-NN</strong> — geometric algorithms whose complexity dictates whether they scale.</li>\n<li><strong>Approximate nearest neighbor (ANN) and vectorized linear algebra</strong> — the tricks that make the above usable at billion-item scale.</li>\n</ul>\n\n<h3>1. Gradient descent: optimization as iteration</h3>\n<p>Most of supervised learning reduces to a single sentence: choose parameters $\\theta$ that minimize a loss $L(\\theta)$ measuring how badly the model fits the data. For all but the simplest models there is no closed-form solution, so we minimize <em>iteratively</em>. Gradient descent is the canonical iteration:</p>\n$$\\theta_{t+1} = \\theta_t - \\eta \\, \\nabla L(\\theta_t)$$\n<p>Here $\\nabla L(\\theta_t)$ is the gradient — the vector of partial derivatives pointing in the direction of <em>steepest increase</em> of the loss. We step in the opposite direction, scaled by the <strong>learning rate</strong> $\\eta > 0$.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Picture standing on a foggy hillside trying to reach the valley floor. You cannot see far, but you can feel the slope under your feet. Gradient descent says: take a step downhill, re-measure the slope, repeat. The learning rate is how big a step you dare to take.</p></div>\n\n<h4>Why it converges — and when it doesn't</h4>\n<p>Convergence is not automatic; it depends on the geometry of $L$ and the size of $\\eta$. The clean theory lives in the <strong>convex, smooth</strong> case. Suppose $L$ has an $\\ell$-Lipschitz gradient, meaning $\\|\\nabla L(x) - \\nabla L(y)\\| \\le \\ell \\, \\|x - y\\|$. This bounds how fast the slope can change. A second-order Taylor argument gives the <em>descent guarantee</em>: for any step size</p>\n$$0 < \\eta \\le \\frac{1}{\\ell}, \\qquad L(\\theta_{t+1}) \\le L(\\theta_t) - \\frac{\\eta}{2}\\,\\|\\nabla L(\\theta_t)\\|^2 .$$\n<p>The loss strictly decreases whenever the gradient is nonzero, so we make monotone progress toward a minimum. For convex $L$ this gives an $O(1/t)$ convergence rate; if $L$ is additionally <strong>strongly convex</strong> (curved at least $\\mu > 0$ in every direction), the rate becomes <em>linear</em> (geometric):</p>\n$$L(\\theta_t) - L(\\theta^\\star) \\le \\left(1 - \\frac{\\mu}{\\ell}\\right)^{t}\\bigl(L(\\theta_0) - L(\\theta^\\star)\\bigr).$$\n<p>The ratio $\\kappa = \\ell/\\mu$ is the <strong>condition number</strong>. A large $\\kappa$ (long, narrow valley) means painfully slow progress — exactly why preconditioning, normalization, and adaptive methods like Adam exist.</p>\n\n<h4>The learning-rate tradeoff</h4>\n<p>The step size $\\eta$ is the single most consequential hyperparameter, and it embodies a sharp tradeoff:</p>\n<ul>\n<li><strong>$\\eta$ too small:</strong> Each step is safe but tiny. Training is correct but glacially slow, and you may stall in a flat region before the deadline.</li>\n<li><strong>$\\eta$ too large:</strong> Steps overshoot the minimum. The classic failure: on a quadratic bowl, if $\\eta > 2/\\ell$ the iterates <em>diverge</em>, oscillating outward with ever-growing loss. Just below that threshold you get a slow zig-zag across the valley.</li>\n<li><strong>The sweet spot:</strong> Often near $\\eta \\approx 1/\\ell$. In practice we use a <strong>learning-rate schedule</strong> — large early, decayed over time — to move fast initially then settle precisely.</li>\n</ul>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Full-batch gradient descent costs $O(nd)$ per step for $n$ examples and $d$ features — prohibitive on large datasets. <strong>Stochastic gradient descent (SGD)</strong> estimates the gradient from one example or a mini-batch, costing $O(\\text{batch}\\cdot d)$. The estimate is noisy but unbiased, so we trade per-step accuracy for vastly more steps per second. Essentially all deep learning runs on mini-batch SGD and its descendants.</p></div>\n\n<h4>Worked example: one step on a quadratic</h4>\n<p>Let $L(\\theta) = \\tfrac{1}{2}(\\theta_1^2 + 9\\theta_2^2)$, a bowl elongated 9:1. The gradient is $\\nabla L = (\\theta_1,\\ 9\\theta_2)$. The curvature (Hessian eigenvalues) is $\\mu = 1$ and $\\ell = 9$, so $\\kappa = 9$ and the divergence threshold is $\\eta = 2/\\ell = 2/9 \\approx 0.222$. Start at $\\theta_0 = (1, 1)$.</p>\n<p>Take $\\eta = 0.2$. The update decouples per coordinate, $\\theta_{t+1,i} = (1 - \\eta \\lambda_i)\\theta_{t,i}$, where $\\lambda_1 = 1,\\ \\lambda_2 = 9$:</p>\n$$\\theta_{1,1} = (1 - 0.2\\cdot 1)\\cdot 1 = 0.8, \\qquad \\theta_{1,2} = (1 - 0.2\\cdot 9)\\cdot 1 = -0.8.$$\n<p>The first coordinate shrinks gently toward 0 (factor $0.8$ each step), while the second <em>overshoots past zero and flips sign</em> (factor $-0.8$), producing the telltale zig-zag. Both factors have magnitude $< 1$, so it still converges — but slowly, governed by the worse coordinate. Had we picked $\\eta = 0.25 > 2/9$, the second coordinate's factor would be $1 - 0.25\\cdot 9 = -1.25$, magnitude $> 1$: <strong>divergence</strong>. This is the condition number biting: the safe step size is dictated by the steepest direction, but progress is dictated by the flattest.</p>\n\n<h3>2. Dynamic programming in sequence models: the Viterbi and forward algorithms</h3>\n<p>Dynamic programming (DP) solves problems that have <strong>optimal substructure</strong> (the best solution is built from best solutions of subproblems) and <strong>overlapping subproblems</strong> (the same subproblems recur). Instead of re-solving them exponentially many times, we store each answer once. In ML, the showcase application is inference in <strong>hidden Markov models (HMMs)</strong> and, more broadly, any model over sequences with Markovian structure.</p>\n\n<h4>The setup</h4>\n<p>An HMM has hidden states $z_1,\\dots,z_T$ (each one of $K$ values) generating observations $x_1,\\dots,x_T$. It is parameterized by transition probabilities $A_{ij} = P(z_{t}=j \\mid z_{t-1}=i)$ and emission probabilities $B_j(x_t) = P(x_t \\mid z_t = j)$, plus an initial distribution $\\pi$. Two natural questions arise, each solved by a DP:</p>\n<ul>\n<li><strong>Viterbi</strong> (a <em>max</em> recursion): what is the single most likely hidden path $z_{1:T}$ given the observations?</li>\n<li><strong>Forward</strong> (a <em>sum</em> recursion): what is the total likelihood $P(x_{1:T})$, summing over all possible paths?</li>\n</ul>\n\n<h4>The Viterbi recurrence</h4>\n<p>Let $\\delta_t(j)$ be the probability of the best path that ends in state $j$ at time $t$:</p>\n$$\\delta_t(j) = \\max_{z_{1:t-1}} P(z_{1:t-1},\\ z_t = j,\\ x_{1:t}).$$\n<p>The key observation — optimal substructure — is that the best path into $j$ at time $t$ must pass through some state $i$ at time $t-1$, and its prefix must itself be the best path into $i$. This yields the recurrence:</p>\n$$\\delta_t(j) = B_j(x_t)\\ \\cdot\\ \\max_{i}\\ \\bigl[\\,\\delta_{t-1}(i)\\, A_{ij}\\,\\bigr], \\qquad \\delta_1(j) = \\pi_j\\, B_j(x_1).$$\n<p>To recover the actual path we store a back-pointer $\\psi_t(j) = \\arg\\max_i\\,\\delta_{t-1}(i) A_{ij}$, then backtrack from $\\arg\\max_j \\delta_T(j)$.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">The deeper connection</div><p>The forward algorithm is the <em>exact same recurrence with <strong>max</strong> replaced by <strong>sum</strong></em>: $\\alpha_t(j) = B_j(x_t)\\sum_i \\alpha_{t-1}(i) A_{ij}$. This \"max vs sum\" duality is the <strong>semiring</strong> view of DP — Viterbi works in the (max, ×) semiring, forward in the (+, ×) semiring. The same template powers edit distance, sequence alignment in bioinformatics, the CKY parser, and the dynamic-programming layer (CRFs) in modern neural sequence taggers.</p></div>\n\n<h4>Complexity, and the log-space trick</h4>\n<p>Both algorithms fill a $T \\times K$ table; each cell does $O(K)$ work to scan predecessors. Total cost is</p>\n$$O(T K^2) \\ \\text{time}, \\qquad O(TK) \\ \\text{space (or } O(K) \\text{ if you only need the final probability).}$$\n<p>Compare this to the brute-force alternative of enumerating all $K^T$ paths — DP turns an exponential into a polynomial. One practical detail: multiplying $T$ probabilities underflows to zero in floating point. We work in <strong>log space</strong>, turning products into sums; Viterbi becomes $\\log\\delta_t(j) = \\log B_j(x_t) + \\max_i[\\log\\delta_{t-1}(i) + \\log A_{ij}]$, and forward uses the numerically stable <code>log-sum-exp</code>.</p>\n\n<h3>3. k-means and k-NN: geometry meets complexity</h3>\n<h4>k-means clustering</h4>\n<p>k-means partitions $n$ points into $k$ clusters to minimize within-cluster squared distance, $\\sum_{i}\\|x_i - \\mu_{c(i)}\\|^2$. <strong>Lloyd's algorithm</strong> alternates two steps — itself a form of coordinate descent:</p>\n<ol>\n<li><strong>Assign:</strong> attach each point to its nearest centroid. Cost $O(nkd)$.</li>\n<li><strong>Update:</strong> move each centroid to the mean of its assigned points. Cost $O(nd)$.</li>\n</ol>\n<p>Over $I$ iterations the total is $O(nkdI)$. Each step never increases the objective, so it converges — but only to a <em>local</em> optimum, and the result depends on initialization (hence <strong>k-means++</strong>, which seeds centroids spread apart and gives a provable $O(\\log k)$ approximation guarantee).</p>\n\n<h4>k-nearest neighbors (k-NN)</h4>\n<p>k-NN is the ultimate <em>lazy learner</em>: there is no training. To classify a query $q$, find the $k$ closest stored points and vote. The cost lives entirely at inference time:</p>\n$$\\text{per query: } O(nd) \\text{ to score all } n \\text{ points} + O(n \\log k) \\text{ to select the top } k.$$\n<p>For $Q$ queries against $n$ points in $d$ dimensions, brute-force k-NN is $O(Qnd)$. This is fine for thousands of points but catastrophic for millions or billions — exactly the regime of semantic search, recommendation, and retrieval-augmented generation (RAG), where every query embedding must be matched against a huge corpus of vectors.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>k-NN and k-means are not just toy algorithms. The <em>retrieval</em> step in modern RAG systems is exactly k-NN over text embeddings; product quantization and clustering (k-means) are how vector databases compress those embeddings. The complexity analysis below is what separates a demo from a production system.</p></div>\n\n<h3>4. Scaling up: approximate nearest neighbor and vectorized linear algebra</h3>\n<h4>Why exact k-NN breaks, and the ANN fix</h4>\n<p>Exact nearest-neighbor search in high dimensions suffers the <strong>curse of dimensionality</strong>: space-partitioning trees like k-d trees degrade to near-linear scans once $d$ grows beyond ~20, because volume concentrates and almost every cell must be inspected. The escape is to <em>give up exactness</em>: an <strong>approximate nearest neighbor (ANN)</strong> index returns neighbors that are <em>almost</em> always the true ones, in <em>sublinear</em> time.</p>\n<p>Two dominant families:</p>\n<ul>\n<li><strong>Graph-based (HNSW):</strong> build a navigable small-world graph; a greedy walk reaches the query's neighborhood in roughly $O(\\log n)$ hops. Query time is empirically $O(d\\log n)$, at the cost of higher memory and $O(n\\log n)$ build time.</li>\n<li><strong>Quantization / IVF (product quantization, inverted file):</strong> cluster vectors (k-means again!) and only search the few nearest cells, compressing each vector to a few bytes. This trades a small accuracy loss for a huge cut in memory and distance-computation cost.</li>\n</ul>\n\n<h4>The cost comparison that decides architectures</h4>\n<table>\n<tr><th>Approach</th><th>Build time</th><th>Per-query time</th><th>Exact?</th></tr>\n<tr><td>Brute-force k-NN</td><td>$O(1)$</td><td>$O(nd)$</td><td>Yes</td></tr>\n<tr><td>HNSW (ANN)</td><td>$O(n\\log n \\cdot d)$</td><td>$\\approx O(d\\log n)$</td><td>No (high recall)</td></tr>\n</table>\n<p>At $n = 10^9$ and $d = 768$, brute force does ~$7.7\\times10^{11}$ floating-point operations <em>per query</em>; HNSW does a few thousand. The price is a one-time index build and a recall slightly below 100%. For most ML retrieval, 99% recall at 1000× speedup is an obvious trade — which is why every vector database is ANN-based.</p>\n\n<h4>Vectorized linear algebra: the constant factor that is not constant</h4>\n<p>Even within brute force, <em>how</em> you compute distances matters enormously. A naive nested loop over examples and features is technically $O(nd)$ but runs orders of magnitude slower than the same work expressed as a single matrix multiplication. Vectorization wins because:</p>\n<ul>\n<li>It uses <strong>SIMD</strong> instructions and cache-friendly memory access (BLAS libraries are tuned to the CPU's cache hierarchy).</li>\n<li>It moves work onto <strong>GPUs/TPUs</strong>, where thousands of cores execute the same operation in parallel — the reason matrix multiply, not addition, is the unit of deep-learning cost.</li>\n<li>A useful identity lets you batch all pairwise squared distances as matrix products: $\\|x_i - y_j\\|^2 = \\|x_i\\|^2 + \\|y_j\\|^2 - 2\\,x_i^\\top y_j$, turning the cross-term into one big GEMM call.</li>\n</ul>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Asymptotic complexity tells you which algorithm survives at scale; vectorization and hardware tell you the constant factor, which can be 100×. Great ML engineering means reasoning about <em>both</em>: pick an algorithm with the right big-O (ANN over brute force, DP over enumeration, SGD over full-batch), then express its inner loop as dense linear algebra so the hardware can fly.</p></div>\n\n<h3>Putting it together</h3>\n<p>The four pillars rhyme. Gradient descent and Lloyd's k-means are both <em>iterative descent</em> on an objective, converging to local optima with cost-per-iteration you can compute. Viterbi and forward are the <em>same DP template</em> in two semirings, trading exponential enumeration for $O(TK^2)$. k-NN and ANN are the same retrieval task at two points on the accuracy-speed frontier. In every case the lesson is identical: write the recurrence or update rule, count its cost, and then exploit structure — convexity, optimal substructure, approximation, vectorization — to make it scale. That fluency is what turns ML math into ML systems.\n<h4>Interactive — explore it</h4>\n<div data-viz=\"algo-kmeans\"></div>",
          "mcq": [
            {
              "q": "For a smooth, strongly convex loss with Hessian eigenvalues bounded in $[\\mu, \\ell]$, gradient descent on a quadratic bowl $L(\\theta)=\\tfrac12\\sum_i \\lambda_i \\theta_i^2$ diverges when the learning rate exceeds which threshold?",
              "choices": [
                "$\\eta > 1/\\ell$",
                "$\\eta > 2/\\ell$",
                "$\\eta > 2/\\mu$",
                "$\\eta > 1/\\mu$"
              ],
              "answer": 1,
              "explain": "Per-coordinate the iterate scales by $(1-\\eta\\lambda_i)$; magnitude exceeds 1 (divergence) once $\\eta\\lambda_i > 2$ for the largest $\\lambda_i=\\ell$, i.e. $\\eta > 2/\\ell$. The flattest direction $\\mu$ governs speed, not the divergence cliff."
            },
            {
              "q": "The Viterbi and forward algorithms for an HMM share the same recurrence structure. What is the single difference between them?",
              "choices": [
                "Viterbi uses transition probabilities while forward uses emission probabilities",
                "Viterbi replaces the sum over predecessor states with a max (and stores back-pointers)",
                "Forward runs in $O(TK)$ time while Viterbi runs in $O(TK^2)$",
                "Viterbi requires log space but forward does not"
              ],
              "answer": 1,
              "explain": "Both fill a $T\\times K$ table over the same factors $A$ and $B$; Viterbi takes the max over predecessors (most likely path) while forward sums over them (total likelihood) — the (max,×) vs (+,×) semiring duality. Both are $O(TK^2)$ and both benefit from log space."
            },
            {
              "q": "You must match each of $Q$ query embeddings against $n=10^9$ stored vectors of dimension $d$. Why is an HNSW (ANN) index typically preferred over exact brute-force k-NN?",
              "choices": [
                "ANN is exact and also faster, so it dominates brute force in every metric",
                "ANN cuts per-query cost from $O(nd)$ to roughly $O(d\\log n)$, trading a small recall loss for orders-of-magnitude speedup",
                "Brute force cannot compute cosine similarity, only Euclidean distance",
                "ANN avoids the curse of dimensionality by being exact in high dimensions"
              ],
              "answer": 1,
              "explain": "ANN gives up exactness (recall slightly below 100%) in exchange for sublinear, roughly $O(d\\log n)$ queries via a navigable graph — a near-universal win at billion-scale retrieval. It is not exact, which is precisely the trade."
            },
            {
              "q": "Why is full-batch gradient descent usually replaced by mini-batch SGD in deep learning?",
              "choices": [
                "Mini-batch gradients are exact, removing the need for a learning rate",
                "Each full-batch step costs $O(nd)$; a mini-batch gives a noisy but unbiased gradient at far lower per-step cost, enabling many more updates per second",
                "SGD guarantees convergence to the global optimum even for non-convex losses",
                "Full-batch descent cannot be vectorized but SGD can"
              ],
              "answer": 1,
              "explain": "Mini-batch SGD trades per-step gradient accuracy (the estimate is noisy but unbiased) for dramatically cheaper steps, yielding far more progress per unit time on large datasets. It does not make gradients exact nor guarantee global optima."
            },
            {
              "q": "On the elongated bowl $L(\\theta)=\\tfrac12(\\theta_1^2 + 9\\theta_2^2)$ from the lesson, with $\\eta = 0.2$ the per-coordinate update factors are $0.8$ and $-0.8$. What does the negative factor on the second coordinate produce?",
              "choices": [
                "Divergence, because a negative factor always blows up",
                "A zig-zag: $\\theta_2$ overshoots past zero and flips sign each step while still shrinking in magnitude",
                "Faster convergence on $\\theta_2$ than on $\\theta_1$, since $|-0.8| = 0.8$",
                "Oscillation with constant amplitude, so $\\theta_2$ never converges"
              ],
              "answer": 1,
              "explain": "The update is $\\theta_2 \\leftarrow \\theta_2(1-9\\eta)=-0.8\\,\\theta_2$. A factor of $-0.8$ has magnitude below 1, so $\\theta_2$ converges but flips sign every step (overshooting zero), the telltale zig-zag from the large condition number; its magnitude factor equals $\\theta_1$'s $0.8$, so it is no faster, and the amplitude shrinks rather than staying constant."
            },
            {
              "q": "Lloyd's algorithm for k-means costs $O(nkdI)$ over $I$ iterations and never increases the within-cluster objective. What does this guarantee about its output?",
              "choices": [
                "It converges to the global optimum regardless of initialization",
                "It converges to a local optimum that depends on the initial centroids",
                "It may fail to converge because the objective can oscillate",
                "It always finds the true number of clusters $k$ automatically"
              ],
              "answer": 1,
              "explain": "Each assign/update step never increases the objective, so the monotone bounded sequence converges, but only to a local optimum sensitive to initialization, which is why k-means++ seeding (with its $O(\\log k)$ expected approximation guarantee) exists; it does not reach the global optimum nor discover $k$."
            },
            {
              "q": "Why do Viterbi and forward operate in log space, computing $\\log\\delta_t(j) = \\log B_j(x_t) + \\max_i[\\log\\delta_{t-1}(i) + \\log A_{ij}]$ rather than working directly with probabilities?",
              "choices": [
                "Logarithms make the recurrence run asymptotically faster than $O(TK^2)$",
                "Multiplying $T$ probabilities underflows to zero in floating point; logs turn products into sums to stay numerically stable",
                "Log space is required to convert the max recursion into a sum recursion",
                "Probabilities cannot be stored in floating point, only their logarithms can"
              ],
              "answer": 1,
              "explain": "Repeatedly multiplying many probabilities below 1 underflows to zero; taking logs converts products into sums (with log-sum-exp for the forward case), preserving accuracy without changing the $O(TK^2)$ cost. Logs do not change the asymptotics or alter the max-vs-sum structure of the recurrence."
            },
            {
              "q": "To batch all pairwise squared distances between matrices $X$ and $Y$, the lesson uses $\\|x_i - y_j\\|^2 = \\|x_i\\|^2 + \\|y_j\\|^2 - 2\\,x_i^\\top y_j$. Why is rewriting it this way a performance win even though it is still $O(nd)$ work per pair?",
              "choices": [
                "It reduces the asymptotic complexity below $O(nd)$",
                "It expresses the cross-term as one large matrix multiply (GEMM), which BLAS/GPUs execute with SIMD and parallel cores far faster than a naive loop",
                "It avoids computing the squared norms, which are the expensive part",
                "It makes the distances exact whereas the naive loop is only approximate"
              ],
              "answer": 1,
              "explain": "The identity isolates the cross-term $-2XY^\\top$ as a single dense GEMM that BLAS libraries and GPUs run with cache-friendly SIMD and parallel execution, slashing the constant factor (often ~100x) while the big-O stays $O(nd)$ per pair; the norms are cheap, and both forms are exact."
            },
            {
              "q": "For a strongly convex loss with condition number $\\kappa = \\ell/\\mu = 100$, gradient descent at the safe step size achieves the linear rate $(1-\\mu/\\ell)^t$. Roughly how many iterations are needed to shrink the suboptimality $L(\\theta_t)-L(\\theta^\\star)$ by a factor of $e$ (one $e$-fold)?",
              "choices": [
                "About $\\kappa = 100$ iterations, because the contraction per step is $1-1/\\kappa$",
                "About $\\log\\kappa \\approx 5$ iterations",
                "About $\\kappa^2 = 10^4$ iterations",
                "About $\\sqrt{\\kappa} = 10$ iterations, matching accelerated methods"
              ],
              "answer": 0,
              "explain": "Each step multiplies the gap by $(1-\\mu/\\ell)=1-1/\\kappa$, and $(1-1/\\kappa)^t\\approx e^{-t/\\kappa}$, so $t\\approx\\kappa=100$ steps give one $e$-fold reduction. The $\\sqrt{\\kappa}$ rate belongs to accelerated/momentum methods, not plain gradient descent."
            },
            {
              "q": "A team rewrites their pairwise-distance kernel using the identity $\\|x_i-y_j\\|^2 = \\|x_i\\|^2 + \\|y_j\\|^2 - 2\\,x_i^\\top y_j$ and routes the cross-term through a GEMM call, getting a 50x speedup over the naive triple loop. What is the correct way to describe this gain in complexity terms?",
              "choices": [
                "The asymptotic time dropped from $O(n^2 d)$ to $O(n^2 \\log d)$",
                "The big-O is unchanged; the win is entirely in the constant factor (SIMD, cache locality, GPU parallelism)",
                "The matrix form reduces the operation count, doing asymptotically fewer multiply-adds",
                "The identity removes the dependence on $d$, making distance computation $O(1)$ per pair"
              ],
              "answer": 1,
              "explain": "Both forms do $\\Theta(d)$ multiply-adds per pair, so the asymptotic cost is identical; the speedup comes from expressing the cross-term as a dense GEMM that BLAS/GPUs execute with SIMD and cache-friendly access — a constant-factor win, not a better big-O."
            },
            {
              "q": "k-means and Lloyd's algorithm minimize the within-cluster sum of squares but only reach a local optimum. A practitioner runs Lloyd's once from random centroids and gets a poor clustering. Which fix most directly addresses the root cause, and why?",
              "choices": [
                "Increase the number of iterations $I$, since more passes always escape local optima",
                "Switch the assignment metric from Euclidean to cosine distance to reshape the objective",
                "Use k-means++ seeding (or several random restarts), because the local optimum reached is determined by initialization",
                "Lower $k$, because fewer clusters guarantees the global optimum is found"
              ],
              "answer": 2,
              "explain": "Lloyd's monotonically decreases the objective to a local optimum whose quality is dictated by where the centroids start, so spreading initial seeds with k-means++ (which gives an $O(\\log k)$ approximation guarantee) or doing restarts is the direct fix. More iterations only refine the same basin, and changing $k$ or the metric changes the problem rather than the seeding issue."
            },
            {
              "q": "In log space the Viterbi recurrence is $\\log\\delta_t(j)=\\log B_j(x_t)+\\max_i[\\log\\delta_{t-1}(i)+\\log A_{ij}]$, while the forward algorithm needs <code>log-sum-exp</code> instead of a plain max. Why can Viterbi use a bare max but forward cannot just sum the logs directly?",
              "choices": [
                "Because $\\log$ distributes over $\\max$ (so $\\log\\max = \\max\\log$) but not over $+$, so a sum of probabilities cannot be written as a sum of their logs",
                "Because forward probabilities are larger than Viterbi probabilities and overflow instead of underflow",
                "Because the max operation is associative while addition of probabilities is not",
                "Because Viterbi works in the $(+,\\times)$ semiring and forward in the $(\\max,\\times)$ semiring"
              ],
              "answer": 0,
              "explain": "$\\log(\\max_i p_i)=\\max_i\\log p_i$, so taking the max commutes cleanly into log space, but $\\log(\\sum_i p_i)\\neq\\sum_i\\log p_i$, forcing forward to recover the sum via log-sum-exp ($\\log\\sum_i e^{a_i}$). The semiring labels in the last option are also swapped — Viterbi is $(\\max,\\times)$ and forward is $(+,\\times)$."
            },
            {
              "q": "On a <em>convex</em> loss function, gradient descent with a suitable step size is guaranteed to…",
              "choices": [
                "converge to a global minimum",
                "get stuck in a bad local minimum",
                "diverge to infinity",
                "find the global maximum"
              ],
              "answer": 0,
              "explain": "Convexity means every local minimum is global, so 'keep stepping downhill' reaches the global optimum (given a small enough learning rate). Non-convex losses — like deep networks — lose this guarantee, which is why initialization and optimizers matter so much there."
            },
            {
              "q": "Why do machine-learning implementations 'vectorize' computations (batched matrix/array operations) instead of writing explicit element-wise loops?",
              "choices": [
                "Vectorizing reduces memory usage to zero",
                "Loops compute the wrong answer",
                "Vectorized operations run on optimized SIMD/BLAS/GPU routines that are far faster and more cache-friendly than interpreted loops",
                "It changes the underlying mathematics"
              ],
              "answer": 2,
              "explain": "The math is identical, but a single matrix multiply dispatches to hand-tuned BLAS/SIMD/GPU kernels exploiting parallelism and memory locality — often orders of magnitude faster than a Python-level loop doing the same arithmetic."
            },
            {
              "q": "Why does algorithmic time complexity matter so much in machine learning?",
              "choices": [
                "ML is unaffected by complexity",
                "At ML scale the gap between $O(n)$, $O(n\\log n)$, and $O(n^2)$ decides what is even trainable on real datasets",
                "Only memory matters, never time",
                "Complexity changes a model's accuracy, not its speed"
              ],
              "answer": 1,
              "explain": "Datasets and models are enormous, so an $O(n^2)$ step that's harmless on 1,000 examples is hopeless on a billion. Picking linear or near-linear algorithms (and approximations like ANN search) is often what makes a method feasible at all."
            },
            {
              "q": "Stochastic gradient descent (SGD) estimates each gradient step using…",
              "choices": [
                "no data at all",
                "the full dataset on every single step",
                "the loss's second derivatives (the Hessian)",
                "a small random mini-batch (or a single example) rather than the entire dataset"
              ],
              "answer": 3,
              "explain": "SGD computes a noisy gradient estimate from a small random sample, making each update cheap and enabling many more steps per pass over the data. The noise even helps escape sharp/poor regions — full-batch GD is exact per step but far slower at scale."
            }
          ],
          "flashcards": [
            {
              "front": "Gradient descent update rule and the role of the learning rate $\\eta$",
              "back": "$\\theta_{t+1} = \\theta_t - \\eta\\,\\nabla L(\\theta_t)$. $\\eta$ sets step size: too small = slow; too large = overshoot/divergence. On a quadratic with top curvature $\\ell$, divergence occurs for $\\eta > 2/\\ell$."
            },
            {
              "front": "Condition number $\\kappa$ and its effect on gradient descent",
              "back": "$\\kappa = \\ell/\\mu$ (ratio of largest to smallest curvature). Large $\\kappa$ = long narrow valley = slow zig-zag convergence; linear rate factor is $(1-\\mu/\\ell)$ per step. Motivates normalization and adaptive optimizers."
            },
            {
              "front": "Viterbi recurrence for an HMM",
              "back": "$\\delta_t(j) = B_j(x_t)\\max_i[\\delta_{t-1}(i)A_{ij}]$, with $\\delta_1(j)=\\pi_j B_j(x_1)$. Store back-pointers $\\psi_t(j)=\\arg\\max_i$ and backtrack to recover the most likely state path."
            },
            {
              "front": "Forward vs Viterbi: the semiring duality",
              "back": "Same DP recurrence; Viterbi uses (max, ×) for the single most likely path, forward uses (+, ×) for total likelihood $P(x_{1:T})$. Forward: $\\alpha_t(j)=B_j(x_t)\\sum_i \\alpha_{t-1}(i)A_{ij}$."
            },
            {
              "front": "Time/space complexity of Viterbi and forward",
              "back": "$O(TK^2)$ time, $O(TK)$ space (or $O(K)$ if only the final value is needed), for sequence length $T$ and $K$ states. Replaces the brute-force $K^T$ path enumeration."
            },
            {
              "front": "Cost of brute-force k-NN vs an ANN (HNSW) index",
              "back": "Brute force: $O(nd)$ per query, exact. HNSW: $\\approx O(d\\log n)$ per query plus $O(n\\log n\\cdot d)$ build, approximate (high recall). ANN trades a small recall loss for sublinear queries at scale."
            }
          ],
          "homework": [
            {
              "prompt": "Consider minimizing $L(\\theta) = \\tfrac12(\\theta_1^2 + 25\\theta_2^2)$ with gradient descent from $\\theta_0 = (1, 1)$. (a) Give the per-coordinate update factor as a function of $\\eta$. (b) For what range of $\\eta$ does the iteration converge? (c) Explain qualitatively what happens at $\\eta = 0.1$.",
              "hint": "The gradient is $(\\theta_1, 25\\theta_2)$, so each coordinate updates independently as $\\theta_{t+1,i} = (1-\\eta\\lambda_i)\\theta_{t,i}$ with $\\lambda_1=1, \\lambda_2=25$. Convergence needs $|1-\\eta\\lambda_i|<1$ for BOTH coordinates.",
              "solution": "(a) $\\theta_{t+1,1}=(1-\\eta)\\theta_{t,1}$ and $\\theta_{t+1,2}=(1-25\\eta)\\theta_{t,2}$. (b) Need $|1-\\eta|<1$ (i.e. $0<\\eta<2$) AND $|1-25\\eta|<1$ (i.e. $0<\\eta<2/25=0.08$). The binding constraint is the steepest direction: convergence requires $0 < \\eta < 0.08$. (c) At $\\eta=0.1 > 0.08$, the second coordinate's factor is $1-25(0.1) = -1.5$, magnitude $1.5>1$, so $\\theta_2$ grows and oscillates in sign: the iteration DIVERGES even though the first coordinate ($\\theta_1$ factor $0.9$) would converge. This shows the condition number $\\kappa=25$ forces a tiny safe step dictated by the steepest direction."
            },
            {
              "prompt": "An HMM has $K=2$ hidden states (Rainy=R, Sunny=S). $\\pi=(0.6, 0.4)$ for $(R,S)$. Transitions: $A_{RR}=0.7, A_{RS}=0.3, A_{SR}=0.4, A_{SS}=0.6$. Emissions of observation 'umbrella': $B_R(u)=0.9, B_S(u)=0.2$. You observe umbrella on day 1 and umbrella on day 2. Use Viterbi to find the most likely 2-day weather path.",
              "hint": "Compute $\\delta_1(R)=\\pi_R B_R(u)$ and $\\delta_1(S)=\\pi_S B_S(u)$. Then $\\delta_2(j)=B_j(u)\\max_i[\\delta_1(i)A_{ij}]$, tracking which $i$ wins. Backtrack from the larger $\\delta_2$.",
              "solution": "Day 1: $\\delta_1(R)=0.6\\times0.9=0.54$; $\\delta_1(S)=0.4\\times0.2=0.08$. Day 2, state R: $\\max(\\delta_1(R)A_{RR}, \\delta_1(S)A_{SR}) = \\max(0.54\\times0.7, 0.08\\times0.4)=\\max(0.378, 0.032)=0.378$ (from R), times $B_R(u)=0.9$ gives $\\delta_2(R)=0.3402$. Day 2, state S: $\\max(\\delta_1(R)A_{RS}, \\delta_1(S)A_{SS})=\\max(0.54\\times0.3, 0.08\\times0.6)=\\max(0.162, 0.048)=0.162$ (from R), times $B_S(u)=0.2$ gives $\\delta_2(S)=0.0324$. The max at day 2 is $\\delta_2(R)=0.3402$; its back-pointer points to R on day 1. Most likely path: Rainy, Rainy, with probability $0.3402$. (Sanity: two umbrellas strongly favor rain, as expected.)"
            },
            {
              "prompt": "You run semantic search over $n=2\\times10^8$ document embeddings of dimension $d=512$, serving $Q=10^4$ queries per second. (a) Estimate the floating-point cost per second for brute-force k-NN (distance dominated, ~$2nd$ flops per query). (b) Roughly how does this change with an HNSW index whose query cost is $\\approx c\\cdot d\\log_2 n$ with $c\\approx 40$? (c) State the qualitative tradeoff you accept.",
              "hint": "Multiply per-query cost by $Q$. For (b) compute $\\log_2(2\\times10^8)\\approx 27.6$ and plug in. Compare the two totals as a ratio.",
              "solution": "(a) Per query $\\approx 2nd = 2\\times2\\times10^8\\times512 \\approx 2.05\\times10^{11}$ flops. Times $Q=10^4$ gives $\\approx 2.05\\times10^{15}$ flops/s — about 2 petaflops/s sustained just for search, completely infeasible on commodity hardware. (b) HNSW per query $\\approx 40\\times512\\times27.6 \\approx 5.65\\times10^5$ flops; times $10^4$ gives $\\approx 5.65\\times10^9$ flops/s (~5.6 gigaflops/s) — trivial. The ratio is roughly $2.05\\times10^{15}/5.65\\times10^9 \\approx 3.6\\times10^5$, i.e. ANN is about 360,000x cheaper at query time. (c) You accept (i) approximate results — recall below 100%, occasionally missing a true nearest neighbor — and (ii) a one-time $O(n\\log n)$ index build plus extra memory for the graph, in exchange for sublinear, production-viable query latency."
            }
          ],
          "examples": [
            {
              "title": "One step of gradient descent on a quadratic loss",
              "body": "Fit a single weight $w$ to minimize the squared-error loss $L(w) = (w - 3)^2$ using gradient descent. Start at $w_0 = 0$ with learning rate $\\eta = 0.1$, and compute the first three iterates $w_1, w_2, w_3$.",
              "solution": "Gradient descent repeats the update $w_{t+1} = w_t - \\eta\\, L'(w_t)$, taking a step opposite the gradient.\n\n<strong>Step 0 — the gradient.</strong> Differentiate the loss:\n$$L'(w) = \\frac{d}{dw}(w-3)^2 = 2(w-3).$$\nThe minimizer is where $L'(w)=0$, i.e. $w^\\star = 3$ — that is the answer the iteration should approach.\n\n<strong>Step 1.</strong> At $w_0 = 0$: $L'(0) = 2(0-3) = -6$. Then\n$$w_1 = 0 - 0.1\\cdot(-6) = 0.6.$$\n\n<strong>Step 2.</strong> At $w_1 = 0.6$: $L'(0.6) = 2(0.6-3) = -4.8$. Then\n$$w_2 = 0.6 - 0.1\\cdot(-4.8) = 0.6 + 0.48 = 1.08.$$\n\n<strong>Step 3.</strong> At $w_2 = 1.08$: $L'(1.08) = 2(1.08-3) = -3.84$. Then\n$$w_3 = 1.08 - 0.1\\cdot(-3.84) = 1.08 + 0.384 = 1.464.$$\n\n<strong>Pattern check.</strong> The distance to the optimum is $|w_t - 3|$: it goes $3 \\to 2.4 \\to 1.92 \\to 1.536$, shrinking by a constant factor each step. Indeed the update can be rewritten as\n$$w_{t+1} - 3 = (1 - 2\\eta)(w_t - 3) = 0.8\\,(w_t - 3),$$\nso the error decays geometrically as $0.8^t$ — linear convergence. (Note $0.8 = 1-2\\eta$; the step $\\eta=0.1$ is small enough that $|1-2\\eta|<1$, guaranteeing convergence.)\n\n<strong>Answer:</strong> $w_1 = 0.6,\\ w_2 = 1.08,\\ w_3 = 1.464$, converging geometrically (factor $0.8$ per step) toward $w^\\star = 3$."
            },
            {
              "title": "Cost per epoch: batch vs. stochastic gradient descent",
              "body": "A linear model has $d = 100$ features and is trained on $n = 1{,}000{,}000$ examples. One gradient contribution from a single example costs $\\Theta(d)$ work. Give the per-epoch time complexity of full-batch gradient descent versus stochastic gradient descent (SGD), and compute concrete operation counts for one epoch.",
              "solution": "An <em>epoch</em> means one full pass that uses all $n$ training examples. The two methods differ only in <strong>how often they update</strong> $\\theta$, not in how much data they touch per epoch — so the asymptotic cost is the same, but the constants and behavior differ. Let's trace both.\n\n<strong>Full-batch gradient descent.</strong> One update computes the gradient of the whole loss, which is the sum over all $n$ examples:\n$$\\nabla L(\\theta) = \\frac{1}{n}\\sum_{i=1}^{n} \\nabla \\ell_i(\\theta).$$\nEach of the $n$ terms costs $\\Theta(d)$, then we apply one parameter update of cost $\\Theta(d)$. Per epoch (= 1 update here):\n$$\\Theta(n d) + \\Theta(d) = \\Theta(n d).$$\nConcrete count: $n d = 10^6 \\times 10^2 = 10^8$ operations for the gradient, plus one update of $100$ ops $\\Rightarrow \\approx 1.0 \\times 10^8$ operations per epoch, yielding <strong>1 update</strong>.\n\n<strong>Stochastic gradient descent.</strong> SGD updates after <em>each</em> example using a single-example gradient estimate:\n$$\\theta \\leftarrow \\theta - \\eta\\,\\nabla \\ell_i(\\theta).$$\nPer example: $\\Theta(d)$ to compute the gradient plus $\\Theta(d)$ to update $= \\Theta(d)$. Over a full epoch of $n$ examples:\n$$n \\cdot \\Theta(d) = \\Theta(n d).$$\nConcrete count: each step does $\\approx 100$ ops for the gradient $+\\ 100$ ops for the update $= 200$ ops, times $n = 10^6$ steps $\\Rightarrow 2.0 \\times 10^8$ operations per epoch, yielding <strong>$10^6$ updates</strong>.\n\n<strong>Comparison.</strong> Both are $\\Theta(nd)$ per epoch — about $10^8$ work either way. The practical difference is update granularity: batch makes <strong>1</strong> high-quality update per epoch; SGD makes <strong>$10^6$</strong> noisy but cheap updates per epoch, so it typically reaches a good loss in far fewer epochs (often a fraction of one). The extra factor of $2$ in SGD's count comes from applying the $\\Theta(d)$ update a million times instead of once — a constant that vanishes in $\\Theta$-notation but is real wall-clock time.\n\n<strong>Answer:</strong> Per epoch both cost $\\Theta(nd) \\approx 10^8$ operations; full-batch performs $1$ update of $\\approx 1.0\\times10^8$ ops, while SGD performs $10^6$ updates totaling $\\approx 2.0\\times10^8$ ops."
            }
          ]
        }
      ]
    },
    {
      "id": "a-advanced-techniques",
      "title": "Advanced Algorithms & Analysis",
      "lessons": [
        {
          "id": "a-amortized-analysis",
          "title": "Amortized Analysis",
          "minutes": 16,
          "content": "<h3>1. The hook: when worst-case-per-operation lies</h3>\n<p>Some operations are <em>usually</em> cheap but <em>occasionally</em> expensive. A dynamic array append is instant — until the array is full and must be copied to a bigger block. Judging it by its worst single step ($O(n)$ for that one resize) wildly overstates the real cost of using it. <strong>Amortized analysis</strong> measures the average cost <em>per operation across a whole sequence</em>, giving an honest, <em>guaranteed</em> bound that the pessimistic per-operation worst case misses.</p>\n\n<h3>2. The idea: average over a sequence, with a guarantee</h3>\n<p>Amortized cost is the total cost of a sequence of $m$ operations divided by $m$. Crucially this is <strong>not</strong> average-case analysis: there is no probability involved. The amortized bound is a <em>worst-case guarantee over the sequence</em> — no matter which operations you run, the total is bounded, so the per-operation average holds even in the worst run. Three techniques compute it: the aggregate, accounting, and potential methods. They always agree; they are different lenses on the same total.</p>\n\n<h3>3. The aggregate method</h3>\n<p>The simplest approach: bound the <em>total</em> cost $T(m)$ of any sequence of $m$ operations, then declare the amortized cost per operation $T(m)/m$. No per-operation cleverness — just sum the whole thing. For a structure whose expensive steps are rare enough, the total stays linear even though individual steps spike.</p>\n\n<h3>4. The accounting (banker's) method</h3>\n<p>Here you <strong>overcharge</strong> cheap operations and store the surplus as <em>credit</em> on the data structure, then spend that saved credit to pay for the rare expensive operations. If you can pick per-operation charges (the amortized costs) so that the credit balance never goes negative, those charges are a valid amortized bound — because the real total can never exceed the total charged. The art is choosing a charge that prepays future blow-ups.</p>\n\n<h3>5. The potential method</h3>\n<p>The most powerful technique defines a <strong>potential function</strong> $\\Phi$ mapping the data structure's state to a non-negative number — \"stored energy.\" The amortized cost of an operation is its real cost plus the change in potential:\n$$\\hat{c}_i = c_i + \\Phi_i - \\Phi_{i-1}.$$\nSumming telescopes: $\\sum \\hat{c}_i = \\sum c_i + \\Phi_m - \\Phi_0$. If $\\Phi_m \\ge \\Phi_0$ (e.g. $\\Phi\\ge0$ and $\\Phi_0=0$), then $\\sum c_i \\le \\sum \\hat{c}_i$ — the amortized total bounds the real total. Cheap operations build potential; expensive ones release it.</p>\n\n<h3>6. The canonical example: a dynamic array</h3>\n<p>A growable array (Python's <code>list</code>, C++'s <code>vector</code>, Java's <code>ArrayList</code>) <strong>doubles</strong> its capacity when full. A single append that triggers a resize copies all $n$ elements — $O(n)$. Yet the amortized cost of append is $O(1)$. <strong>Aggregate view:</strong> across $n$ appends the resizes copy $1+2+4+\\cdots+n < 2n$ elements total, so $n$ appends cost $O(n)$ overall, i.e. $O(1)$ each. <strong>Accounting view:</strong> charge $3$ per append — $1$ to insert, and $2$ saved as credit; by the time the array fills, every element carries enough credit to pay for copying itself (and one earlier element) on the next doubling. <strong>Potential view:</strong> $\\Phi = 2\\cdot(\\text{size}) - (\\text{capacity})$ is $0$ right after a resize and rises to pay for the next one.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Why doubling, not adding a constant</div>\n<p>Growing by a fixed chunk (say $+10$) makes resizes frequent — $n$ appends would copy $O(n^2)$ elements total, an $O(n)$ amortized cost. <em>Geometric</em> growth (doubling) is exactly what makes the rare-but-big copies sum to $O(n)$, giving $O(1)$ amortized. The growth factor is the whole trick.</p>\n</div>\n\n<h3>7. Another: the binary counter</h3>\n<p>Incrementing a binary counter sometimes flips one bit ($0111 \\to 1000$ flips four) and sometimes flips just one. Worst case per increment is $O(\\text{bits})$, but amortized it is $O(1)$: over $n$ increments, bit $0$ flips $n$ times, bit $1$ flips $n/2$ times, bit $i$ flips $n/2^i$ times, so total flips $= n\\sum_i 2^{-i} < 2n$ — linear total, $O(1)$ amortized. The accounting view: charge $2$ per increment to set a bit and prepay its eventual reset.</p>\n\n<h3>8. Why this matters</h3>\n<p>Amortized analysis is how we honestly cost the data structures used everywhere: dynamic arrays, <strong>hash tables</strong> (which resize the same way — $O(1)$ amortized insert despite occasional rehash), splay trees, and union-find. Reporting a hash-table insert as \"$O(n)$ worst case\" would be technically true but practically misleading; \"$O(1)$ amortized\" is the number that actually predicts performance. Knowing the difference lets you choose and reason about structures correctly.</p>",
          "mcq": [
            {
              "q": "A data structure runs a sequence of $m$ operations costing $T(m) = 3m + 7\\sqrt{m}$ total. What is the amortized cost per operation as $m \\to \\infty$?",
              "choices": [
                "$O(\\sqrt{m})$ per operation",
                "$O(1)$ per operation",
                "$O(\\log m)$ per operation",
                "$O(m)$ per operation"
              ],
              "answer": 1,
              "explain": "Amortized cost is $T(m)/m = 3 + 7/\\sqrt{m}$, which tends to the constant $3$, so each operation costs $O(1)$ amortized. The $\\sqrt{m}$ term contributes a vanishing per-operation amount."
            },
            {
              "q": "Which statement best captures the difference between amortized analysis and average-case analysis?",
              "choices": [
                "Average-case analysis is always tighter than amortized analysis",
                "Amortized analysis assumes inputs are drawn uniformly at random",
                "Amortized analysis is a worst-case guarantee over a sequence with no probability involved, while average-case averages over a distribution of inputs",
                "They are two names for the exact same technique"
              ],
              "answer": 2,
              "explain": "Amortized analysis bounds the total cost of any sequence and divides by the length — no randomness is assumed, so it holds even in the worst run. Average-case analysis instead averages over an assumed probability distribution of inputs."
            },
            {
              "q": "A dynamic array starts empty and doubles its capacity (copying all elements) whenever it fills up. Over $n$ appends, what is the total copying cost from resizes?",
              "choices": [
                "$\\Theta(n^2)$, since each resize copies up to $n$ elements",
                "$\\Theta(n \\log n)$, one copy per level of doubling",
                "$\\Theta(n)$, since copy costs $1 + 2 + 4 + \\dots + n$ form a geometric series summing to under $2n$",
                "$\\Theta(\\sqrt{n})$, because resizes become rare"
              ],
              "answer": 2,
              "explain": "The copy costs at resizes are $1, 2, 4, \\dots, n$, a geometric series bounded by $2n$, so total copying is $\\Theta(n)$ and amortized $O(1)$ per append. The $\\Theta(n^2)$ answer wrongly assumes every append triggers a full copy."
            },
            {
              "q": "If a sequence of $m$ operations is proven to have amortized cost $O(1)$ per operation, which conclusion is guaranteed?",
              "choices": [
                "No single operation in the sequence ever costs more than $O(1)$",
                "The total cost of the whole sequence is $O(m)$",
                "The most expensive operation costs exactly $O(m)$",
                "Each operation costs $O(1)$ only on average over random inputs"
              ],
              "answer": 1,
              "explain": "Amortized $O(1)$ means total cost divided by $m$ is $O(1)$, hence total cost is $O(m)$. It does NOT bound any individual operation — a single resize can still cost $O(m)$ while the amortized average stays $O(1)$."
            },
            {
              "q": "Suppose a structure normally costs $1$ per operation, but every $k$-th operation triggers an expensive step costing $c \\cdot k$. Using the aggregate method over $m$ operations, what is the amortized cost per operation?",
              "choices": [
                "$O(c \\cdot k)$ per operation",
                "$O(m/k)$ per operation",
                "$O(1 + c)$ per operation",
                "$O(k)$ per operation"
              ],
              "answer": 2,
              "explain": "Total cost is roughly $m \\cdot 1 + (m/k)(ck) = m + cm$, so dividing by $m$ gives $1 + c = O(1+c)$. The tempting $O(c \\cdot k)$ is the cost of one expensive step, not the amortized average."
            },
            {
              "q": "The aggregate method computes amortized cost by which procedure?",
              "choices": [
                "Assigning each operation a credit and tracking a balance",
                "Defining a potential function and bounding its change",
                "Bounding the total cost $T(m)$ of any sequence of $m$ operations, then dividing by $m$",
                "Taking the worst-case cost of a single operation as the bound"
              ],
              "answer": 2,
              "explain": "The aggregate method directly bounds the whole sequence's total $T(m)$ and declares $T(m)/m$ as the amortized cost — no per-operation bookkeeping. Credits belong to the accounting method and potential functions to the potential method."
            },
            {
              "q": "Why is judging a dynamic array append by its single worst-case step ($O(n)$ for a resize) misleading?",
              "choices": [
                "Because the resize never actually happens in practice",
                "Because resizes are rare, so spreading their cost across the many cheap appends gives a much lower honest per-operation cost",
                "Because the worst case is actually $O(1)$, not $O(n)$",
                "Because amortized analysis ignores resizes entirely"
              ],
              "answer": 1,
              "explain": "Expensive resizes happen only occasionally; averaging their total cost over the whole sequence of cheap appends yields $O(1)$ amortized. The pessimistic per-operation worst case overstates the real cost of using the structure repeatedly."
            },
            {
              "q": "A student claims: 'Since the aggregate, accounting, and potential methods are different techniques, they can give different amortized bounds for the same structure.' What is wrong with this claim?",
              "choices": [
                "Nothing — each method genuinely produces a different true bound",
                "The three methods are different lenses on the same total cost, so they always agree on the amortized bound",
                "Only the potential method gives correct bounds; the others are approximations",
                "The accounting method always gives a looser bound than the aggregate method"
              ],
              "answer": 1,
              "explain": "All three methods analyze the same total cost of the sequence, so they necessarily agree on the amortized result. They differ only in the bookkeeping perspective used to reach it, not in the answer."
            },
            {
              "q": "An operation has true cost varying between $1$ and $n$, but its amortized cost is shown to be $O(\\log n)$. Over a sequence of $m$ such operations, the total cost is at most:",
              "choices": [
                "$O(m \\log n)$",
                "$O(n \\log n)$",
                "$O(m \\cdot n)$",
                "$O(\\log n)$"
              ],
              "answer": 0,
              "explain": "Amortized cost $O(\\log n)$ per operation means total cost over $m$ operations is at most $O(m \\log n)$. Using the per-operation worst case $n$ would give the looser, non-amortized bound $O(mn)$."
            },
            {
              "q": "A counter is incremented $m$ times; the total number of bit flips across all increments is known to be less than $2m$. By the aggregate method, the amortized number of bit flips per increment is:",
              "choices": [
                "$O(\\log m)$",
                "$O(1)$",
                "$O(m)$",
                "depends on the starting value of the counter"
              ],
              "answer": 1,
              "explain": "Total flips $< 2m$ divided by $m$ increments gives less than $2$, a constant, so amortized cost is $O(1)$. The worst single increment can flip many bits, but that does not affect the aggregate average."
            },
            {
              "q": "Which of the following is the most accurate definition of the amortized cost of an operation?",
              "choices": [
                "The cost of that operation in the best case",
                "The total cost of a sequence of $m$ operations divided by $m$",
                "The probability-weighted expected cost over random inputs",
                "The maximum cost any single execution of that operation can incur"
              ],
              "answer": 1,
              "explain": "Amortized cost is defined as total sequence cost divided by the number of operations $m$. The maximum single-execution cost is the per-operation worst case — exactly the pessimistic measure amortized analysis is meant to replace."
            },
            {
              "q": "Two implementations of a stack-with-multipop are compared. Implementation A has worst-case $O(n)$ per operation but amortized $O(1)$; Implementation B has worst-case $O(1)$ per operation. For minimizing the total time of a long sequence of $m$ operations, which guarantee is most directly useful?",
              "choices": [
                "Implementation A's $O(n)$ worst case, since it is the largest number",
                "Implementation A's amortized $O(1)$, because it directly bounds total sequence time at $O(m)$",
                "Neither, because amortized bounds say nothing about totals",
                "Only worst-case bounds can ever bound a total"
              ],
              "answer": 1,
              "explain": "Amortized $O(1)$ for A directly implies total time $O(m)$ for the whole sequence — the relevant quantity. Using A's per-operation $O(n)$ worst case would give a needlessly loose $O(mn)$ total, even though both A and B finish in $O(m)$."
            },
            {
              "q": "Amortized analysis has three standard methods. Which set names them?",
              "choices": [
                "Best, average, and worst case",
                "The aggregate, accounting (banker's), and potential methods",
                "Greedy, divide-and-conquer, and dynamic programming",
                "Induction, recursion, and iteration"
              ],
              "answer": 1,
              "explain": "All three bound the average cost over a worst-case sequence: the <strong>aggregate</strong> method totals the whole sequence and divides; the <strong>accounting</strong> method charges credits; the <strong>potential</strong> method tracks a stored-energy function. They always agree on the amortized cost."
            },
            {
              "q": "In the accounting (banker's) method, cheap operations are deliberately charged <em>more</em> than they cost so that…",
              "choices": [
                "operations can run in parallel",
                "the data structure uses less memory",
                "expensive operations can be skipped entirely",
                "the saved-up credit pays for later expensive operations, keeping the amortized cost bounded"
              ],
              "answer": 3,
              "explain": "You overcharge the common cheap ops and bank the surplus as credit; when a rare expensive op (like a resize) happens, it spends that stored credit. As long as the bank never goes negative, the assigned per-op charge is a valid amortized bound."
            },
            {
              "q": "In the potential method, the amortized cost of an operation is defined as…",
              "choices": [
                "its actual cost plus the change in potential, $\\Delta\\Phi$",
                "its actual cost times the change in potential",
                "just its actual cost",
                "the potential of the structure alone"
              ],
              "answer": 0,
              "explain": "Amortized cost $= c_i + \\Phi(\\text{after}) - \\Phi(\\text{before})$. A cheap op that raises $\\Phi$ 'saves up' for a costly op that releases it ($\\Delta\\Phi<0$), so the expensive op's amortized cost is small. Summed over a sequence, the $\\Phi$ terms telescope."
            },
            {
              "q": "A stack with a MULTIPOP(k) operation can cost $O(n)$ for one call, yet any sequence of $n$ push/pop/multipop operations is $O(n)$ total. Why?",
              "choices": [
                "Pushes are free",
                "Multipop is secretly $O(1)$",
                "Each item can be popped at most once after it is pushed, so total pops ≤ total pushes ≤ $n$",
                "The stack never grows"
              ],
              "answer": 2,
              "explain": "An item must be pushed before it can be popped, and once popped it's gone — so across the whole sequence the number of pops (including those inside multipops) can't exceed the number of pushes. Total work is therefore linear, giving $O(1)$ amortized per operation."
            }
          ],
          "flashcards": [
            {
              "front": "What does amortized analysis measure, and how does it differ from average-case analysis?",
              "back": "The average cost per operation over a worst-case <em>sequence</em> of operations — a guarantee with NO probability involved. Average-case uses a probability distribution over inputs; amortized is a deterministic worst-case-over-the-sequence bound."
            },
            {
              "front": "Name the three amortized-analysis methods.",
              "back": "Aggregate (bound total cost $T(m)$, divide by $m$), accounting/banker's (overcharge cheap ops, store credit to pay expensive ones), and potential (amortized cost $=c_i+\\Phi_i-\\Phi_{i-1}$). All give the same total."
            },
            {
              "front": "State the potential-method formula and why it bounds the real cost.",
              "back": "$\\hat c_i=c_i+\\Phi_i-\\Phi_{i-1}$. Summing telescopes: $\\sum\\hat c_i=\\sum c_i+\\Phi_m-\\Phi_0$. If $\\Phi_m\\ge\\Phi_0$ then $\\sum c_i\\le\\sum\\hat c_i$, so the amortized total upper-bounds the real total."
            },
            {
              "front": "Why is appending to a doubling dynamic array $O(1)$ amortized despite $O(n)$ worst-case resizes?",
              "back": "Across $n$ appends the doublings copy $1+2+4+\\cdots+n<2n$ elements total, so $n$ appends cost $O(n)$ overall → $O(1)$ each. The rare big copies sum to linear because growth is geometric."
            },
            {
              "front": "Why double the array instead of growing by a fixed constant?",
              "back": "Geometric (doubling) growth → total copies $O(n)$ → $O(1)$ amortized. Fixed-increment growth makes resizes too frequent → $O(n^2)$ total copies → $O(n)$ amortized. The growth factor is the trick."
            },
            {
              "front": "Why is incrementing a binary counter $O(1)$ amortized?",
              "back": "Over $n$ increments, bit $i$ flips $n/2^i$ times, so total flips $=n\\sum_i 2^{-i}<2n$ — linear total → $O(1)$ amortized, even though one increment can flip $O(\\log n)$ bits."
            }
          ],
          "homework": [
            {
              "prompt": "A dynamic array starts empty with capacity 1 and doubles on overflow. Trace the total number of element-copies caused by resizing during the first 8 appends, and confirm it is less than $2\\cdot8$.",
              "hint": "A resize happens when appending into a full array; it copies all current elements. Capacities go 1,2,4,8.",
              "solution": "Resizes trigger on appends 2, 3, 5, and 9 (when capacity 1,2,4,8 fills). Within the first 8 appends: append 2 copies 1, append 3 copies 2, append 5 copies 4 — total copies $=1+2+4=7$ (the doubling to capacity 16 happens on append 9, outside the window). $7 < 16 = 2\\cdot8$. ✓ The copies form a geometric series bounded by $2n$, giving $O(1)$ amortized."
            },
            {
              "prompt": "Using the potential method with $\\Phi = 2\\cdot\\text{size} - \\text{capacity}$ for a doubling array, compute the amortized cost of an append that does NOT trigger a resize (real cost 1).",
              "hint": "Appending without resize increases size by 1, capacity unchanged. $\\hat c = c + \\Delta\\Phi$.",
              "solution": "Real cost $c=1$. Size goes up by 1, so $\\Phi$ increases by $2\\cdot1=2$; capacity unchanged, so $\\Delta\\Phi=+2$. Amortized $\\hat c = 1 + 2 = 3$ — a constant. (On a resize append, the real cost spikes but $\\Phi$ drops by about the copy amount, keeping the amortized cost at the same constant $\\approx3$; that cancellation is the whole point.)"
            },
            {
              "prompt": "Explain why reporting a hash-table insert as \"$O(n)$ worst case\" is technically correct but practically misleading, and what bound you should report instead.",
              "hint": "Hash tables resize (rehash all elements) like dynamic arrays.",
              "solution": "A single insert can trigger a rehash that re-inserts all $n$ existing keys, so the worst-case <em>single</em> insert is indeed $O(n)$. But rehashes are rare and geometric (the table doubles), so across any sequence of inserts the total rehash work is $O(n)$, making each insert $O(1)$ <strong>amortized</strong>. Quoting only the $O(n)$ worst case predicts performance you will essentially never see in aggregate; the honest, useful bound is $O(1)$ amortized, which is what governs real throughput."
            }
          ],
          "examples": [
            {
              "title": "Three methods, one answer: the dynamic array",
              "body": "Show that $n$ appends to a doubling dynamic array cost $O(n)$ total — hence $O(1)$ amortized — using (a) the aggregate method and (b) the accounting method.",
              "solution": "(a) <strong>Aggregate.</strong> Each append does $O(1)$ base work, plus copies during resizes. Resizes occur at sizes $1,2,4,\\dots$ up to $n$, copying $1+2+4+\\cdots+2^{\\lfloor\\log_2 n\\rfloor} \\le 2n$ elements in total. So total cost $= O(n) + O(2n) = O(n)$, i.e. $O(1)$ per append amortized.\n\n(b) <strong>Accounting.</strong> Charge each append $\\$3$: $\\$1$ pays the immediate insertion, and $\\$2$ is banked on the newly inserted element. When the array (capacity $k$, now full with $k$ elements) doubles, each of the $k$ elements must be copied ($\\$1$ each). The $k/2$ elements inserted since the previous doubling each banked $\\$2$, totaling $\\$k$ in credit — exactly enough to pay for copying all $k$ elements. The balance never goes negative, so $\\$3$ amortized per append is valid: $O(1)$.\n\nBoth methods give $O(1)$ amortized — different bookkeeping, same conclusion."
            },
            {
              "title": "Amortized ≠ average-case",
              "body": "A colleague says \"amortized $O(1)$ just means it's $O(1)$ on average, so an adversary feeding worst-case inputs could still make every operation $O(n)$.\" Why is this wrong?",
              "solution": "Amortized analysis carries <em>no</em> probability and assumes <em>no</em> input distribution — it bounds the total cost of the <strong>worst possible sequence</strong> of operations. For a doubling array, <em>any</em> sequence of $n$ appends (adversarial or not) copies at most $2n$ elements total; there is no ordering of appends that makes the aggregate worse than $O(n)$. So an adversary cannot force every operation to be $O(n)$ — the geometric resize schedule guarantees the expensive operations are spaced out so their costs sum to linear. Average-case analysis <em>would</em> be defeatable by adversarial inputs (it assumes a distribution); amortized analysis is a hard worst-case guarantee over the whole sequence, which is exactly why it's the right tool here."
            }
          ]
        },
        {
          "id": "a-network-flow",
          "title": "Network Flow: Max-Flow & Min-Cut",
          "minutes": 18,
          "content": "<h3>1. The hook: pushing the most through a network</h3>\n<p>How much water can flow from a source to a sink through a network of pipes with capacity limits? How many goods can ship from factories to stores through a constrained logistics graph? These are <strong>maximum-flow</strong> problems, and their theory — crowned by the elegant <strong>max-flow min-cut theorem</strong> — solves a startling range of seemingly unrelated tasks: bipartite matching, scheduling, image segmentation, and network reliability.</p>\n\n<h3>2. Flow networks</h3>\n<p>A <strong>flow network</strong> is a directed graph where each edge $(u,v)$ has a non-negative <strong>capacity</strong> $c(u,v)$, with a designated <strong>source</strong> $s$ and <strong>sink</strong> $t$. A <strong>flow</strong> assigns each edge a value $f(u,v)$ obeying two rules:</p>\n<ul>\n<li><strong>Capacity:</strong> $0 \\le f(u,v) \\le c(u,v)$ — no edge carries more than its limit.</li>\n<li><strong>Conservation:</strong> at every node except $s$ and $t$, flow in equals flow out — nothing is created or lost mid-network.</li>\n</ul>\n<p>The <strong>value</strong> of a flow is the net amount leaving the source (equivalently, arriving at the sink). The goal is to maximize it.</p>\n\n<h3>3. Residual graphs and augmenting paths</h3>\n<p>The key engine is the <strong>residual graph</strong>. For each edge, its <em>residual capacity</em> is how much more flow you could push: $c(u,v) - f(u,v)$ forward, plus a <em>backward</em> residual edge of capacity $f(u,v)$ that lets you <em>cancel</em> existing flow. An <strong>augmenting path</strong> is any path from $s$ to $t$ in the residual graph; pushing flow along it (by the path's bottleneck residual capacity) strictly increases the total. The backward edges are what make this correct — they let the algorithm \"undo\" a greedy choice that turned out to block a better routing.</p>\n\n<h3>4. The Ford–Fulkerson method</h3>\n<p><strong>Ford–Fulkerson</strong> is the resulting loop: while an augmenting path exists in the residual graph, push flow along it and update residuals; when none remains, the flow is maximum. With integer capacities it always terminates, since each augmentation raises the integer flow value by at least 1. Choosing augmenting paths by <strong>BFS</strong> (shortest path in edges) gives the <strong>Edmonds–Karp</strong> algorithm, which runs in $O(VE^2)$ — polynomial regardless of capacity sizes.</p>\n\n<h3>5. The max-flow min-cut theorem</h3>\n<p>An <strong>s–t cut</strong> partitions the vertices into two sets, one containing $s$ and the other $t$; its <strong>capacity</strong> is the total capacity of edges crossing from the $s$-side to the $t$-side. Any cut is a bottleneck — flow can never exceed any cut's capacity. The celebrated theorem says the bound is tight:\n$$\\text{maximum flow value} = \\text{minimum cut capacity}.$$\nWhen Ford–Fulkerson halts, the nodes still reachable from $s$ in the residual graph form exactly the minimum cut — so the same run that finds the max flow also <em>certifies</em> it by exhibiting a saturated cut of equal capacity. Max-flow and min-cut are two faces of one optimum (a clean instance of linear-programming duality).</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why a certificate matters</div>\n<p>The min cut is a <em>proof</em> the flow is optimal: every unit must cross that cut, and the cut is full, so no more can pass. You don't have to trust the algorithm — the saturated cut is independently checkable.</p>\n</div>\n\n<h3>6. Application: bipartite matching</h3>\n<p>A beautiful reduction: to find a maximum <strong>matching</strong> in a bipartite graph (pair workers to jobs, students to schools), build a flow network — add a source $s$ connected to every left vertex, a sink $t$ from every right vertex, direct each original edge left-to-right, and give <em>every</em> edge capacity $1$. The maximum integer flow equals the maximum matching: each unit of flow is one matched pair, and unit capacities force the matching constraints. A whole combinatorial problem dissolves into one max-flow call.</p>\n\n<h3>7. Worked intuition: why backward edges are essential</h3>\n<p>Suppose a greedy first path saturates an edge that, in hindsight, should have routed elsewhere. Without backward edges the algorithm would be stuck at a suboptimal flow. The residual backward edge lets a later augmenting path send flow \"in reverse\" along that edge — effectively rerouting the earlier commitment — so Ford–Fulkerson can always reach the true maximum, never trapped by an early greedy mistake. That undo capability is precisely what separates a correct max-flow algorithm from naive greedy.</p>\n\n<h3>8. Why this matters</h3>\n<p>Network flow is one of the most <em>reduction-friendly</em> tools in algorithms: bipartite matching, assignment, project selection, edge/vertex-disjoint paths (Menger's theorem), baseball elimination, and image segmentation (graph cuts in vision) all reduce to max-flow/min-cut. Recognizing that a problem is \"secretly a flow problem\" turns it from a custom puzzle into a solved one. The duality of max-flow and min-cut is also a gateway to linear programming, where the same primal-dual structure appears throughout optimization and ML.</p>",
          "mcq": [
            {
              "q": "In a flow network, a node $v$ (other than $s$ or $t$) has incoming flow of $5$ on one edge and $3$ on another. What must be true of the flow leaving $v$?",
              "choices": [
                "The total flow leaving $v$ must equal $8$",
                "The total flow leaving $v$ must be at most $8$ (the rest is stored at $v$)",
                "The total flow leaving $v$ must equal the capacity of $v$'s outgoing edges",
                "The flow on each outgoing edge must individually equal $8$"
              ],
              "answer": 0,
              "explain": "Flow conservation requires flow in to equal flow out at every internal node, so $5+3=8$ must leave. Flow is never stored at a node, which rules out the 'at most 8' option."
            },
            {
              "q": "An edge $(u,v)$ has capacity $c(u,v)=10$ and currently carries flow $f(u,v)=7$. What residual edges does it contribute to the residual graph?",
              "choices": [
                "A forward residual edge $u\\to v$ of capacity $10$ and no backward edge",
                "A forward residual edge $u\\to v$ of capacity $3$ and a backward residual edge $v\\to u$ of capacity $7$",
                "A forward residual edge $u\\to v$ of capacity $7$ and a backward residual edge $v\\to u$ of capacity $3$",
                "Only a backward residual edge $v\\to u$ of capacity $7$"
              ],
              "answer": 1,
              "explain": "Forward residual capacity is $c-f=10-7=3$ (how much more you can push), and the backward edge has capacity $f=7$ (how much you can cancel). The third option swaps the two values."
            },
            {
              "q": "Why does pushing flow along a backward residual edge increase the total flow value, even though it reduces flow on the original edge?",
              "choices": [
                "It doesn't — backward edges only exist to detect cycles",
                "Because the augmenting path reroutes that canceled flow onto a more productive alternative, raising the path's net $s\\to t$ throughput",
                "Because backward edges have negative capacity that adds to the total",
                "Because canceling flow on an internal edge always frees source capacity directly"
              ],
              "answer": 1,
              "explain": "An augmenting path that uses a backward edge reroutes a prior commitment to a better path, and the path's bottleneck still adds net flow from $s$ to $t$. Backward edges undo greedy mistakes; they have positive capacity equal to the existing flow."
            },
            {
              "q": "A student claims: 'Once Ford-Fulkerson saturates an edge, that edge is permanently full in the final max flow.' Why is this wrong?",
              "choices": [
                "It's correct — saturated edges never change",
                "A later augmenting path can use the edge's backward residual to cancel some of that flow, so it may not be saturated at the end",
                "Saturated edges are removed from the graph and cannot be revisited",
                "Edges can only be saturated at the very last augmentation"
              ],
              "answer": 1,
              "explain": "Backward residual edges let later augmenting paths reduce flow on a previously saturated edge when rerouting yields a better solution, so saturation is not permanent. This is exactly the undo mechanism that prevents greedy lock-in."
            },
            {
              "q": "Consider an $s$-$t$ cut where the $s$-side is $\\{s,a\\}$ and the $t$-side is $\\{b,t\\}$. Edges: $s\\to b$ (cap 4), $a\\to t$ (cap 5), $a\\to b$ (cap 2), and $b\\to a$ (cap 9). What is the capacity of this cut?",
              "choices": [
                "$4+5+2+9 = 20$",
                "$4+5+2 = 11$",
                "$9$",
                "$4+5 = 9$"
              ],
              "answer": 1,
              "explain": "Cut capacity counts only edges crossing from the $s$-side to the $t$-side: $s\\to b$ (4), $a\\to t$ (5), and $a\\to b$ (2), totaling 11. The edge $b\\to a$ goes $t$-side to $s$-side, so it does not count."
            },
            {
              "q": "Ford-Fulkerson has just halted. Which procedure correctly extracts a minimum cut from the final state?",
              "choices": [
                "Take all saturated edges in the original graph; they form the cut",
                "Let $S$ be the vertices reachable from $s$ in the residual graph and $T$ the rest; the cut is $(S,T)$",
                "Let $S$ be the vertices that can reach $t$ in the residual graph; the cut is $(S,T)$",
                "Take the single edge with the largest capacity; it is the bottleneck cut"
              ],
              "answer": 1,
              "explain": "When no augmenting path remains, the set $S$ of residual-reachable vertices from $s$ (with $T$ the rest containing $t$) is a minimum cut, with every $S\\to T$ edge saturated. Saturated edges alone need not form a valid cut, and largest-capacity-edge is unrelated to the min cut."
            },
            {
              "q": "On a network with integer capacities, Ford-Fulkerson with poorly chosen augmenting paths can run slowly. What quantity can the number of augmentations scale with in the worst case?",
              "choices": [
                "The number of vertices $V$ only",
                "The maximum flow value (i.e., the magnitude of capacities), since each augmentation may add as little as 1 unit",
                "The number of edges $E$ only, independent of capacities",
                "$\\log$ of the maximum capacity"
              ],
              "answer": 1,
              "explain": "With bad path choices (e.g., repeatedly routing through a unit-capacity middle edge), each augmentation adds only 1 unit, so the count scales with the max flow value. Edmonds-Karp's BFS choice removes this dependence, bounding augmentations at $O(VE)$ combinatorially."
            },
            {
              "q": "What is the single algorithmic change that turns Ford-Fulkerson into Edmonds-Karp, guaranteeing $O(VE^2)$ time?",
              "choices": [
                "Use DFS to find the longest augmenting path each iteration",
                "Always choose the augmenting path by BFS (fewest edges) in the residual graph",
                "Push flow only along edges with the largest residual capacity",
                "Recompute the entire residual graph from scratch after every push"
              ],
              "answer": 1,
              "explain": "Edmonds-Karp specifies that each augmenting path be the shortest in edge count, found by BFS, which bounds augmentations at $O(VE)$ regardless of capacities. DFS or longest-path choices give no such guarantee."
            },
            {
              "q": "To find maximum bipartite matching via max-flow, you add source $s\\to$ each left vertex, each right vertex $\\to t$, direct original edges left-to-right, and assign capacities. What capacities make the max flow equal the max matching?",
              "choices": [
                "All edges capacity $1$",
                "Source and sink edges capacity $\\infty$, internal edges capacity $1$",
                "All edges capacity equal to the vertex degree",
                "Internal edges capacity $1$, source/sink edges capacity $0$"
              ],
              "answer": 0,
              "explain": "Unit capacity on every edge forces each left and right vertex to be matched at most once, so each unit of integer flow corresponds to exactly one matched pair. The other schemes either over-match a vertex or block all flow."
            },
            {
              "q": "You exhibit an $s$-$t$ cut of capacity 12 in a network. What does this alone let you conclude about the maximum flow?",
              "choices": [
                "The maximum flow equals exactly 12",
                "The maximum flow is at most 12 (an upper bound)",
                "The maximum flow is at least 12 (a lower bound)",
                "Nothing, because a single cut gives no information"
              ],
              "answer": 1,
              "explain": "Any cut's capacity upper-bounds the flow, since every unit must cross it. Equality (max flow = 12) holds only if this is the minimum cut, which a single cut does not establish; you would also need a matching flow of value 12."
            },
            {
              "q": "In the integer-capacity network $s\\to a$ (cap 3), $s\\to b$ (cap 2), $a\\to t$ (cap 2), $b\\to t$ (cap 3), $a\\to b$ (cap 1), what is the maximum $s$-$t$ flow?",
              "choices": [
                "$3$",
                "$4$",
                "$5$",
                "$6$"
              ],
              "answer": 2,
              "explain": "Send 2 on $s\\to a\\to t$, 2 on $s\\to b\\to t$, and 1 on $s\\to a\\to b\\to t$, giving value 5. The cut separating $\\{s\\}$ from the rest has capacity $3+2=5$, and the cut into $t$ has capacity $2+3=5$, certifying 5 as the maximum."
            },
            {
              "q": "A common misconception is that the max-flow min-cut theorem is just a heuristic. What is the precise relationship the theorem states?",
              "choices": [
                "Maximum flow value is approximately equal to minimum cut capacity, within a constant factor",
                "Maximum flow value is always strictly less than minimum cut capacity",
                "Maximum flow value exactly equals minimum cut capacity, an instance of linear-programming duality",
                "Minimum cut capacity equals the sum of all edge capacities leaving $s$"
              ],
              "answer": 2,
              "explain": "The theorem is an exact equality, max flow = min cut, a clean case of LP duality, not an approximation or strict inequality. The min cut also need not equal the total capacity leaving $s$ (that is merely one particular cut)."
            },
            {
              "q": "If every edge capacity in a flow network is an integer, what does the integrality theorem guarantee about the maximum flow?",
              "choices": [
                "All capacities have to be powers of two",
                "The maximum flow must be fractional",
                "There is always a maximum flow in which every edge carries an integer amount of flow",
                "Only Edmonds-Karp can find the maximum flow"
              ],
              "answer": 2,
              "explain": "Ford-Fulkerson only ever adds an integer bottleneck amount to an integer flow, so with integer capacities it terminates at an all-integer maximum flow. That integrality is exactly what lets the max-flow reduction for <em>bipartite matching</em> (all capacities 1) return a valid 0/1 matching."
            },
            {
              "q": "In a flow network, the flow $f(e)$ on an edge with capacity $c(e)$ must satisfy…",
              "choices": [
                "$0 \\le f(e) \\le c(e)$",
                "$f(e) = c(e)$ always",
                "$f(e)$ may exceed $c(e)$",
                "$f(e) \\ge c(e)$"
              ],
              "answer": 0,
              "explain": "The capacity constraint: flow is non-negative and never exceeds the edge's capacity. Together with conservation (flow in = flow out at every node but s and t), these define a valid flow."
            },
            {
              "q": "Ford-Fulkerson increases the total flow by repeatedly finding…",
              "choices": [
                "a negative-weight cycle",
                "the shortest path by number of edges",
                "a minimum spanning tree of the network",
                "an augmenting path from s to t in the residual graph (a path with spare capacity) and pushing flow along it"
              ],
              "answer": 3,
              "explain": "While the residual graph still has an s→t path with leftover capacity, push as much flow as that path's bottleneck allows; repeat. When no augmenting path remains, the flow is maximum (and the reachable set defines the min cut)."
            },
            {
              "q": "Edmonds-Karp is Ford-Fulkerson that always augments along the shortest path (fewest edges, via BFS). Its running time is…",
              "choices": [
                "exponential in the input size",
                "$O(VE^2)$ — polynomial, independent of the capacity values",
                "$O(V+E)$",
                "proportional to the largest capacity"
              ],
              "answer": 1,
              "explain": "Choosing the shortest augmenting path (BFS) bounds the number of augmentations at $O(VE)$, each found in $O(E)$, giving $O(VE^2)$. Plain Ford-Fulkerson with bad path choices can instead scale with the capacity magnitudes — pseudo-polynomial."
            }
          ],
          "flashcards": [
            {
              "front": "What two constraints define a valid flow in a flow network?",
              "back": "Capacity: $0\\le f(u,v)\\le c(u,v)$ on every edge. Conservation: at every node except source $s$ and sink $t$, flow in = flow out. The flow's value is the net amount leaving $s$ (= arriving at $t$)."
            },
            {
              "front": "What is a residual graph and an augmenting path?",
              "back": "The residual graph has forward residual capacity $c(u,v)-f(u,v)$ plus a backward edge of capacity $f(u,v)$ (to cancel flow). An augmenting path is any $s\\to t$ path in it; pushing its bottleneck capacity strictly increases total flow."
            },
            {
              "front": "Describe the Ford–Fulkerson method and the Edmonds–Karp refinement.",
              "back": "Ford–Fulkerson: while an augmenting path exists, push flow along it and update residuals; stop when none remains (flow is then max). Edmonds–Karp picks augmenting paths via BFS (shortest in edges), giving $O(VE^2)$."
            },
            {
              "front": "State the max-flow min-cut theorem.",
              "back": "The maximum $s$–$t$ flow value equals the minimum $s$–$t$ cut capacity. When Ford–Fulkerson halts, nodes reachable from $s$ in the residual graph form the min cut — certifying optimality."
            },
            {
              "front": "Why are backward (residual) edges essential to max-flow correctness?",
              "back": "They let later augmenting paths cancel/reroute flow committed by earlier greedy choices, so the algorithm is never trapped at a suboptimal flow. Without them, an early bad routing could block the true maximum."
            },
            {
              "front": "How does maximum bipartite matching reduce to max-flow?",
              "back": "Add source $s\\to$ all left vertices and all right vertices $\\to$ sink $t$, direct original edges left→right, give every edge capacity 1. The max integer flow = max matching (each flow unit = one matched pair; unit capacities enforce matching)."
            }
          ],
          "homework": [
            {
              "prompt": "A flow network has an $s$–$t$ cut whose crossing edges have capacities $\\{4, 3, 5\\}$ (from the $s$-side to the $t$-side). What does this tell you about the maximum flow, and what additional fact would confirm this cut is minimum?",
              "hint": "Cut capacity upper-bounds flow; the theorem says the min cut equals max flow.",
              "solution": "This cut has capacity $4+3+5=12$, so the maximum flow is at most $12$ (any cut bounds the flow). It confirms nothing about the exact max unless this is the <em>minimum</em> cut. If you also exhibit a valid flow of value $12$ (or run Ford–Fulkerson and find the residual graph leaves $s$ reachable to exactly this cut), then by max-flow min-cut the maximum flow is exactly $12$ and this is a minimum cut. A single cut gives only an upper bound; matching it with an equal-value flow proves optimality."
            },
            {
              "prompt": "Edmonds–Karp runs in $O(VE^2)$ while plain Ford–Fulkerson with poorly chosen augmenting paths can be much slower on large integer capacities. What single change produces the polynomial guarantee, and why does it remove the dependence on capacity values?",
              "hint": "Edmonds–Karp specifies HOW to choose the augmenting path.",
              "solution": "The change is choosing the augmenting path by <strong>BFS</strong> — always the shortest (fewest-edges) $s\\to t$ path in the residual graph. This caps the number of augmentations at $O(VE)$ regardless of capacities (one can show the BFS distance from $s$ to $t$ never decreases and each edge becomes \"critical\" $O(V)$ times), and each BFS is $O(E)$, giving $O(VE^2)$. Plain Ford–Fulkerson choosing paths badly can augment a number of times proportional to the max flow <em>value</em> (e.g. alternating through a tiny-capacity middle edge), which scales with capacity magnitude. BFS removes that dependence by bounding augmentations combinatorially, not by flow value."
            },
            {
              "prompt": "You must assign 4 workers to 4 jobs where each worker is qualified for only some jobs, maximizing the number of filled jobs. Frame this as a max-flow problem (nodes, edges, capacities).",
              "hint": "This is maximum bipartite matching; use the standard reduction.",
              "solution": "Build a flow network: a source $s$, a node per worker (left), a node per job (right), and a sink $t$. Add edge $s\\to w_i$ (capacity 1) for each worker, edge $j_k\\to t$ (capacity 1) for each job, and edge $w_i\\to j_k$ (capacity 1) whenever worker $i$ is qualified for job $k$. Compute the maximum integer flow from $s$ to $t$: its value is the maximum number of worker–job assignments (a matching), and the saturated $w_i\\to j_k$ edges are the assignments. Unit capacities ensure each worker takes at most one job and each job at most one worker."
            }
          ],
          "examples": [
            {
              "title": "Finding max-flow and reading off the min-cut",
              "body": "In a small network, Ford–Fulkerson finds augmenting paths until none remain, settling at flow value 7. Explain how to extract the minimum cut from the final residual graph and why its capacity must also be 7.",
              "solution": "When no augmenting path remains, run a graph search (BFS/DFS) from $s$ in the <em>residual</em> graph and let $S$ be the set of reachable vertices; $T$ is the rest (which must contain $t$, since $t$ is unreachable — that's why the algorithm stopped). The cut $(S,T)$ is the minimum cut.\n\nIts capacity equals 7 because: (1) every original edge from $S$ to $T$ must be <strong>saturated</strong> ($f=c$), otherwise it would have leftover residual capacity and $t$'s side would be reachable, contradicting $T$ being unreachable; (2) every edge from $T$ back to $S$ must carry <strong>zero</strong> flow, else a backward residual edge would reach into $T$. So the net flow across the cut equals the sum of the saturated forward capacities = the cut capacity, and that net flow equals the flow value 7. Hence max flow (7) = min cut (7), and the cut is a checkable certificate of optimality."
            },
            {
              "title": "Why naive greedy fails without backward edges",
              "body": "Consider a network where a greedy first augmenting path routes flow through a central edge that a better solution would avoid. Explain, in terms of residual backward edges, how Ford–Fulkerson recovers the optimum where pure greedy would stall.",
              "solution": "Pure greedy commits flow to the central edge and, finding no more <em>forward</em> capacity anywhere, would stop at a suboptimal value. Ford–Fulkerson instead works on the residual graph, which includes a <strong>backward edge</strong> for the committed central edge (capacity equal to the flow on it). A later augmenting path can travel along that backward edge — mathematically <em>subtracting</em> flow from the central edge — while adding flow on alternative edges, net-rerouting the earlier commitment to a better configuration and increasing the total. Because every greedy mistake leaves an undo path in the residual graph, the method can always keep augmenting until a true maximum is reached; the backward edges are precisely the mechanism that prevents greedy lock-in."
            }
          ]
        },
        {
          "id": "a-union-find-range",
          "title": "Advanced Data Structures: Union-Find & Range Queries",
          "minutes": 17,
          "content": "<h3>1. The hook: the right structure makes the impossible cheap</h3>\n<p>Two recurring needs defeat naive approaches at scale: repeatedly merging groups and asking \"are these two in the same group?\", and repeatedly querying a <em>range</em> of an array that keeps changing. Linear scans make each query $O(n)$. Two classic structures — <strong>union-find</strong> and the <strong>Fenwick/segment tree</strong> — crush these to near-constant and logarithmic time, and they power Kruskal's MST, connectivity, and countless competitive-programming and systems tasks.</p>\n\n<h3>2. Union-Find (disjoint-set union)</h3>\n<p><strong>Union-Find</strong> maintains a collection of disjoint sets under two operations: <strong>find(x)</strong> returns a canonical representative (\"root\") of x's set, and <strong>union(x,y)</strong> merges the two sets. Two elements are in the same set iff they share a root. The structure is a forest: each element points to a parent, and each tree's root represents one set. Naively, <code>find</code> walks to the root and <code>union</code> links one root under the other — but careless linking can build tall $O(n)$ chains.</p>\n\n<h3>3. Two optimizations → near-constant time</h3>\n<p>Two cheap tricks make it almost free:</p>\n<ul>\n<li><strong>Union by rank/size:</strong> always attach the <em>smaller</em> tree under the larger, keeping trees shallow.</li>\n<li><strong>Path compression:</strong> during <code>find</code>, re-point every node on the path directly to the root, flattening the tree for next time.</li>\n</ul>\n<p>Together they give an amortized cost of $O(\\alpha(n))$ per operation, where $\\alpha$ is the <strong>inverse Ackermann function</strong> — which is $\\le 4$ for any $n$ that could exist in the physical universe. So union and find are <em>effectively constant time</em>. (This is a famous triumph of amortized analysis — proving the $\\alpha(n)$ bound is deep.)</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Where you've seen it</div>\n<p>Union-Find is the engine of <strong>Kruskal's MST</strong> (add the next-cheapest edge unless it joins two nodes already connected — a single <code>find</code> check), of dynamic <strong>connectivity</strong> queries, of cycle detection in undirected graphs, and of connected-component labeling in image processing.</p>\n</div>\n\n<h3>4. Range queries: the static case first</h3>\n<p>Suppose you must answer many \"sum of $a[i..j]$\" queries on a <em>fixed</em> array. Precompute a <strong>prefix-sum</strong> array $P$ where $P[k]=a[0]+\\cdots+a[k-1]$; then any range sum is $P[j+1]-P[i]$ in $O(1)$, after $O(n)$ preprocessing. Elegant — but it breaks the moment the array changes: a single update forces recomputing $O(n)$ prefix sums. Dynamic data needs more.</p>\n\n<h3>5. Fenwick tree (binary indexed tree)</h3>\n<p>A <strong>Fenwick tree</strong> supports both a point <em>update</em> and a prefix-sum <em>query</em> in $O(\\log n)$, using a clever indexing where each position is responsible for a range whose length is the lowest set bit of its index. Walking up via $i \\mathrel{+}= i\\,\\&\\,(-i)$ (for updates) or down via $i \\mathrel{-}= i\\,\\&\\,(-i)$ (for queries) touches only $O(\\log n)$ entries. It is compact ($n$ integers), cache-friendly, and the go-to for dynamic prefix sums and inversion counting.</p>\n\n<h3>6. Segment tree: the general workhorse</h3>\n<p>A <strong>segment tree</strong> is more general: a balanced binary tree over the array where each node stores an aggregate (sum, min, max, gcd, …) of its segment. Both range query and point update run in $O(\\log n)$, and with <strong>lazy propagation</strong> it also supports $O(\\log n)$ <em>range</em> updates (e.g. \"add 5 to all of $a[i..j]$\"). It uses $O(n)$ space and handles any <em>associative</em> combine operation, making it the Swiss-army knife of range problems where Fenwick (sums only, less flexible) falls short.</p>\n\n<h3>7. Choosing the right tool</h3>\n<p>Match the structure to the access pattern: static range sums → <strong>prefix sums</strong> ($O(1)$ query, no updates); dynamic prefix sums → <strong>Fenwick</strong> (compact, fast, sum-like ops); range min/max/gcd or range updates → <strong>segment tree</strong> (most general). And for \"same group?\" connectivity under merges → <strong>union-find</strong>. Picking correctly turns an $O(nq)$ brute force over $q$ queries into $O((n+q)\\log n)$ or better — often the difference between a solution that runs and one that times out.</p>\n\n<h3>8. Why this matters</h3>\n<p>These structures are the backbone of efficient algorithms on changing data: union-find underlies MST and clustering (single-linkage is Kruskal-like), and range structures power databases, time-series aggregation, computational geometry, and competitive programming. More broadly they teach the central lesson of advanced data structures — that the <em>right representation</em>, often justified by amortized or logarithmic analysis, converts an intractable repeated query into a cheap one.</p>",
          "mcq": [
            {
              "q": "In a union-find forest using path compression but NOT union by rank/size, what does path compression alone guarantee about the amortized cost per operation over a sequence of $m$ operations on $n$ elements?",
              "choices": [
                "It stays $O(\\alpha(n))$ amortized, identical to using both optimizations",
                "It is $O(\\log n)$ amortized — worse than using both, but still far better than the naive $O(n)$",
                "It becomes $O(1)$ worst-case for every single find",
                "It degrades to $O(n)$ because compression destroys the rank invariant"
              ],
              "answer": 1,
              "explain": "Path compression alone gives $O(\\log n)$ amortized per operation; you need it combined with union by rank/size to reach the $O(\\alpha(n))$ bound. It does not reach $O(\\alpha(n))$ by itself, nor does it degrade to $O(n)$."
            },
            {
              "q": "A single $\\text{find}(x)$ call with path compression flattens the path from $x$ to the root. After this call, which nodes have their parent pointer set directly to the root?",
              "choices": [
                "Only $x$ itself",
                "Every node, in the entire tree",
                "Every node on the traversed path from $x$ up to the root",
                "Only the immediate child of the root"
              ],
              "answer": 2,
              "explain": "Path compression re-points every node encountered on the walk from $x$ to the root so it points directly at the root. Nodes not on that path (in other branches) are untouched, so it is not the whole tree."
            },
            {
              "q": "Why is $\\text{rank}$ (rather than exact tree $\\text{height}$) used as the name for the per-root counter once path compression is enabled?",
              "choices": [
                "Path compression can shorten paths, so the stored value is only an upper bound on the true height, not the exact height",
                "Rank counts the number of elements in the set, which is different from height",
                "Path compression increments rank on every find, decoupling it from height",
                "Height would overflow for large trees, so rank is stored modulo $\\log n$"
              ],
              "answer": 0,
              "explain": "After compression shortens paths, the true height may drop below the stored counter, so it remains only a valid upper bound — hence 'rank,' not 'height.' Rank tracks an upper bound on height, not the set size."
            },
            {
              "q": "With union by rank, when you union two roots whose ranks are EQUAL, what happens to the rank of the resulting tree?",
              "choices": [
                "The rank stays the same, since no node's depth actually increased",
                "The new root's rank is incremented by 1",
                "Both ranks are summed into the new root",
                "The rank is reset to 0 and recomputed lazily"
              ],
              "answer": 1,
              "explain": "When ranks are equal, you attach one root under the other and increment the surviving root's rank by 1, because the height grows by one in the worst case. If ranks differ, the smaller attaches under the larger and no rank changes."
            },
            {
              "q": "You start with singletons $\\{1\\},\\{2\\},\\dots,\\{8\\}$ and use union by rank (equal-rank ties increment the winner's rank). You perform $\\text{union}(1,2)$, $\\text{union}(3,4)$, $\\text{union}(1,3)$. What is the rank of the final combined set's root?",
              "choices": [
                "1",
                "2",
                "3",
                "0"
              ],
              "answer": 1,
              "explain": "$\\text{union}(1,2)$ and $\\text{union}(3,4)$ each merge two rank-0 trees, producing two roots of rank 1. $\\text{union}(1,3)$ merges two rank-1 trees, so the surviving root's rank becomes 2."
            },
            {
              "q": "A Fenwick tree uses the operation $i \\mathrel{-}= i \\,\\&\\, (-i)$ to walk during a prefix-sum query. What does the expression $i \\,\\&\\, (-i)$ compute?",
              "choices": [
                "The highest set bit of $i$",
                "The value $i$ rounded up to the next power of two",
                "The lowest set bit of $i$ (the smallest power of two dividing $i$)",
                "The number of set bits in $i$"
              ],
              "answer": 2,
              "explain": "In two's complement, $i \\,\\&\\, (-i)$ isolates the lowest set bit of $i$, which is the range length each Fenwick index is responsible for. It is not the highest bit nor a popcount."
            },
            {
              "q": "You want to support repeated 'add 5 to every element of $a[i..j]$' operations together with range-sum queries, each in $O(\\log n)$. Which structure is the natural fit?",
              "choices": [
                "A plain Fenwick tree with point updates",
                "A prefix-sum array recomputed after each update",
                "A sorted array with binary search",
                "A segment tree with lazy propagation"
              ],
              "answer": 3,
              "explain": "Lazy propagation lets a segment tree defer range updates so both range-update and range-query are $O(\\log n)$. A plain Fenwick tree handles point updates, and a prefix-sum array costs $O(n)$ per update."
            },
            {
              "q": "A static prefix-sum array $P$ with $P[k]=a[0]+\\cdots+a[k-1]$ gives $O(1)$ range-sum queries. Why does it fail for a frequently-updated array?",
              "choices": [
                "A single point update can force recomputing up to $O(n)$ prefix entries",
                "Prefix sums cannot represent negative numbers",
                "Each query becomes $O(\\log n)$ once any update occurs",
                "Prefix sums require the array to be sorted, which updates break"
              ],
              "answer": 0,
              "explain": "Changing $a[i]$ affects every $P[k]$ for $k>i$, so an update can cost $O(n)$. Queries staying $O(1)$ is exactly what makes prefix sums great for static data; the problem is the update cost, not query cost or sign or sorting."
            },
            {
              "q": "Which property must the combine operation of a segment tree satisfy for queries to be answered by merging node aggregates correctly?",
              "choices": [
                "Commutativity",
                "Associativity",
                "Idempotence",
                "Having an inverse"
              ],
              "answer": 1,
              "explain": "A segment tree merges aggregates of adjacent child segments, so the combine must be associative for the grouping to be correct (e.g., sum, min, max, gcd). Commutativity, idempotence, and invertibility are not required (e.g., string concatenation works and is non-commutative)."
            },
            {
              "q": "A common misconception is that union-find can efficiently SPLIT a set back into its previous pieces. Why does the standard rank+path-compression union-find NOT support efficient un-union (split)?",
              "choices": [
                "Splitting is supported in $O(\\alpha(n))$ just like union",
                "Because find is amortized constant, split must be too",
                "Path compression discards the original tree shape, so there is no record of how sets were merged to undo it",
                "Ranks store split information, but only up to $\\log n$ levels"
              ],
              "answer": 2,
              "explain": "Path compression destructively flattens trees, erasing the merge history, so the structure cannot reconstruct prior groupings to split. Union-find is designed for incremental merging, not deletion/splitting; that needs different structures (e.g., link-cut trees or offline tricks)."
            },
            {
              "q": "For Kruskal's algorithm, you sort $E$ edges and then do a constant number of union-find operations per edge. What is the overall time complexity, and what dominates it?",
              "choices": [
                "$O(E\\,\\alpha(V))$, dominated by the union-find operations",
                "$O(E\\log V)$, dominated by sorting the edges",
                "$O(V^2)$, dominated by initializing the disjoint sets",
                "$O(VE)$, dominated by repeated connectivity scans"
              ],
              "answer": 1,
              "explain": "The $O(E\\log E)=O(E\\log V)$ sort dominates, since the $O(E)$ union-find operations cost only $O(E\\,\\alpha(V))\\approx O(E)$. Union-find is what makes the cycle-checking essentially free, so the union-find work is not the bottleneck."
            },
            {
              "q": "You only need DYNAMIC prefix sums (point updates plus prefix/range-sum queries) on a large array, and memory is tight. Compared with a segment tree, why is a Fenwick tree often preferred here?",
              "choices": [
                "A Fenwick tree answers range-min and gcd queries that a segment tree cannot",
                "A Fenwick tree gives $O(1)$ updates whereas a segment tree gives $O(\\log n)$",
                "A Fenwick tree uses only $n$ integers and is more cache-friendly, while matching $O(\\log n)$ per operation",
                "A Fenwick tree supports lazy range updates that a segment tree lacks"
              ],
              "answer": 2,
              "explain": "For sum-like queries a Fenwick tree needs just $n$ entries with smaller constants and good cache behavior, matching the segment tree's $O(\\log n)$ per operation. It is less general (no arbitrary range-min, no built-in lazy range updates) and updates are $O(\\log n)$, not $O(1)$."
            },
            {
              "q": "The union-find (disjoint-set) data structure efficiently supports which two operations?",
              "choices": [
                "push and pop",
                "insert and delete",
                "sort and search",
                "find (which set an element belongs to) and union (merge two sets)"
              ],
              "answer": 3,
              "explain": "Union-find maintains a partition of elements into disjoint sets: <code>find(x)</code> returns a canonical representative of x's set (so two elements are in the same set iff their roots match), and <code>union(x,y)</code> merges their sets. It's the backbone of Kruskal's MST and connectivity queries."
            },
            {
              "q": "With BOTH union by rank and path compression, the amortized time per union-find operation is…",
              "choices": [
                "$O(\\log n)$",
                "$O(\\alpha(n))$ — inverse Ackermann, effectively constant for any practical $n$",
                "$O(n)$",
                "exactly $O(1)$ with no qualification"
              ],
              "answer": 1,
              "explain": "The two optimizations together give an amortized bound of $O(\\alpha(n))$, where $\\alpha$ is the inverse Ackermann function — below 5 for any $n$ that could ever be stored, so essentially (but not provably exactly) constant."
            },
            {
              "q": "Path compression speeds up union-find by…",
              "choices": [
                "sorting the elements by value",
                "balancing merges so the shorter tree hangs under the taller (that's union by rank)",
                "repointing every node visited during a find directly to the root, flattening the tree for future queries",
                "deleting interior nodes to save memory"
              ],
              "answer": 2,
              "explain": "During <code>find(x)</code>, after locating the root you set the parent of every node on the path straight to that root. Subsequent finds on those nodes are then nearly $O(1)$. It's complementary to union by rank, which keeps trees shallow in the first place."
            },
            {
              "q": "A Fenwick (binary indexed) tree supports a point update and a prefix-sum query each in…",
              "choices": [
                "$O(\\log n)$ time",
                "$O(1)$ time",
                "$O(n)$ time",
                "$O(\\sqrt{n})$ time"
              ],
              "answer": 0,
              "explain": "A Fenwick tree walks $O(\\log n)$ ancestors via the low-bit trick ($i \\mathrel{-}{=} i\\,\\&\\,(-i)$), giving $O(\\log n)$ point updates and prefix sums — the go-to structure for <em>dynamic</em> prefix sums, where a static prefix-sum array's $O(n)$ updates would be too slow."
            }
          ],
          "flashcards": [
            {
              "front": "What are the two union-find operations, and when are two elements in the same set?",
              "back": "<code>find(x)</code> returns the canonical root of x's set; <code>union(x,y)</code> merges two sets. Two elements share a set iff <code>find</code> returns the same root. Implemented as a parent-pointer forest."
            },
            {
              "front": "What two optimizations make union-find near-constant time, and what is the resulting bound?",
              "back": "Union by rank/size (attach smaller tree under larger) + path compression (re-point nodes to the root during find). Together: $O(\\alpha(n))$ amortized per op, $\\alpha$ = inverse Ackermann ($\\le4$ for all practical $n$)."
            },
            {
              "front": "How do prefix sums answer static range-sum queries, and why do they fail under updates?",
              "back": "Precompute $P[k]=a[0]+\\cdots+a[k-1]$ in $O(n)$; then range sum $a[i..j]=P[j+1]-P[i]$ in $O(1)$. A single element update forces recomputing $O(n)$ prefix sums, so it fails for dynamic arrays."
            },
            {
              "front": "What does a Fenwick tree (BIT) do and at what cost?",
              "back": "Supports point update and prefix-sum query in $O(\\log n)$ each, using lowest-set-bit indexing ($i\\mathrel{+}=i\\&(-i)$ / $i\\mathrel{-}=i\\&(-i)$). Compact ($n$ ints), cache-friendly; ideal for dynamic prefix sums."
            },
            {
              "front": "What does a segment tree offer beyond a Fenwick tree?",
              "back": "A balanced tree of segment aggregates: $O(\\log n)$ range query AND point update for any associative op (sum/min/max/gcd), plus $O(\\log n)$ <em>range</em> updates via lazy propagation. More general than Fenwick (which is sum-focused)."
            },
            {
              "front": "Which range structure fits: (a) static range sums, (b) dynamic prefix sums, (c) range min with range updates?",
              "back": "(a) prefix sums ($O(1)$ query, no updates); (b) Fenwick tree (compact, $O(\\log n)$); (c) segment tree with lazy propagation ($O(\\log n)$, any associative op + range updates)."
            }
          ],
          "homework": [
            {
              "prompt": "Using union-find with path compression and union by rank, you process the unions (1,2), (3,4), (2,3), then query whether 1 and 4 are connected. What is the answer, and roughly how many parent-pointer hops does the final find take?",
              "hint": "Track which sets merge; path compression flattens trees so finds are near-constant.",
              "solution": "After (1,2): {1,2}. After (3,4): {3,4}. After (2,3): the two sets merge into {1,2,3,4} (union by rank attaches one small tree under the other's root). So <code>find(1)</code> and <code>find(4)</code> return the same root — 1 and 4 <strong>are connected</strong>. With path compression, the trees stay essentially flat (height $\\le 2$), so each find takes about 1–2 hops to reach the root, and any longer path is compressed to direct root-pointers on first traversal — the source of the $O(\\alpha(n))\\approx O(1)$ amortized cost."
            },
            {
              "prompt": "You have an array of $n=10^6$ numbers and must process $q=10^6$ operations that mix point-updates and range-sum queries. Compare brute force vs. a Fenwick tree in total time, and explain why prefix sums alone are inadequate.",
              "hint": "Brute force is $O(n)$ per op; Fenwick is $O(\\log n)$ per op. Prefix sums can't handle updates cheaply.",
              "solution": "Brute force: each range-sum scan or naive update is $O(n)$, so $q$ operations cost $O(nq)=10^{12}$ — far too slow. A Fenwick tree does each update and each prefix-sum query in $O(\\log n)\\approx20$ steps, so total $\\approx q\\log n = 2\\times10^7$ — about five orders of magnitude faster, easily within limits. Static prefix sums give $O(1)$ queries but a single point update requires rebuilding $O(n)$ of the prefix array, so with $10^6$ updates that is again $O(nq)$; they are only suitable when the array never changes. The Fenwick tree is the right tool precisely because it makes <em>both</em> updates and queries logarithmic."
            },
            {
              "prompt": "For each task, name the most appropriate structure: (a) \"add 7 to every element in $a[3..9]$, repeatedly\" with range-sum queries; (b) detect whether adding an edge to an undirected graph creates a cycle; (c) static array, thousands of range-minimum queries, no updates.",
              "hint": "Range updates → lazy segment tree; connectivity/cycles → union-find; static range min → sparse table or precomputation.",
              "solution": "(a) <strong>Segment tree with lazy propagation</strong> — it supports $O(\\log n)$ range updates (\"add to a range\") together with range-sum queries; a plain Fenwick tree handles point updates well but range-update+range-query needs the lazy segment tree (or two BITs with a difference trick). (b) <strong>Union-Find</strong> — before adding edge $(u,v)$, check <code>find(u)==find(v)</code>; if equal, the edge closes a cycle; otherwise <code>union</code> them. (c) A <strong>sparse table</strong> (or any $O(n\\log n)$ precomputation) gives $O(1)$ static range-minimum queries; a segment tree also works at $O(\\log n)$ per query, but since there are no updates the static precomputation is ideal."
            }
          ],
          "examples": [
            {
              "title": "Union-Find powering Kruskal's MST",
              "body": "Explain precisely how union-find makes Kruskal's minimum-spanning-tree algorithm efficient, including what <code>find</code> and <code>union</code> do at each step and the resulting complexity.",
              "solution": "Kruskal's algorithm sorts all edges by weight, then scans them cheapest-first, adding an edge to the MST <em>only if</em> it connects two currently-separate components (adding an edge within one component would create a cycle). Union-Find tracks the components:\n\n· For each candidate edge $(u,v)$, call <code>find(u)</code> and <code>find(v)</code>. If the roots <strong>differ</strong>, the endpoints are in different components, so the edge is safe to add — include it and <code>union(u,v)</code> to merge the components. If the roots are <strong>equal</strong>, $u$ and $v$ are already connected, so the edge would form a cycle — skip it.\n\nComplexity: sorting the $E$ edges costs $O(E\\log E)$. Each of the $O(E)$ edges does a constant number of union-find operations at $O(\\alpha(V))\\approx O(1)$ amortized each, totaling $O(E\\,\\alpha(V))$. So Kruskal runs in $O(E\\log E)$ overall, dominated by the sort — and union-find is what makes the cycle-checking essentially free, turning a potential $O(VE)$ connectivity bottleneck into near-linear work."
            },
            {
              "title": "Why a Fenwick tree beats recomputing prefix sums",
              "body": "An array supports the operations: <code>update(i, delta)</code> (add delta to $a[i]$) and <code>prefixSum(k)</code> ($a[0]+\\cdots+a[k]$). Contrast maintaining a prefix-sum array vs. a Fenwick tree for a workload with many interleaved updates and queries.",
              "solution": "<strong>Prefix-sum array:</strong> <code>prefixSum(k)</code> is $O(1)$ (just read $P[k+1]$), but <code>update(i,delta)</code> must add delta to <em>every</em> prefix entry $P[i+1..n]$ — $O(n)$ per update. With many updates this is $O(n)$ each and dominates; the structure is only good when updates are rare or absent.\n\n<strong>Fenwick tree:</strong> stores partial sums indexed by lowest-set-bit ranges. <code>update(i,delta)</code> climbs $i \\mathrel{+}= i\\,\\&\\,(-i)$, touching $O(\\log n)$ entries; <code>prefixSum(k)</code> descends $k \\mathrel{-}= k\\,\\&\\,(-k)$, also $O(\\log n)$. So <em>both</em> operations are $O(\\log n)$, with no operation ever costing $O(n)$.\n\nFor an interleaved workload of $m$ mixed operations, the prefix-sum array costs up to $O(mn)$ (whenever updates are frequent) while the Fenwick tree costs $O(m\\log n)$ — the latter is the clear winner whenever updates and queries are mixed, which is the realistic case."
            }
          ]
        }
      ]
    }
  ]
}
);
