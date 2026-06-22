/* Atlas course — Calculus
   Generated & adversarially fact-checked + inline visualizations, worked examples & an expanded question bank. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "calculus",
  "title": "Calculus",
  "icon": "∂",
  "color": "#88a37a",
  "blurb": "Limits, derivatives, integrals, and the multivariable gradients that power gradient descent.",
  "modules": [
    {
      "id": "c-foundations",
      "title": "Foundations: Functions, Limits & Continuity",
      "lessons": [
        {
          "id": "c-functions-and-graphs",
          "title": "Functions, Graphs & the Language of Change",
          "minutes": 14,
          "content": "<h3>1. What a function really is</h3>\n<p>Strip away the formulas and a <strong>function</strong> is a rule for turning inputs into outputs <em>deterministically and unambiguously</em>. Formally, a function $f$ from a set $A$ to a set $B$, written $f : A \\to B$, assigns to <em>each</em> element $x \\in A$ <em>exactly one</em> element $f(x) \\in B$. Two words carry the whole definition: <strong>each</strong> (every input gets an output) and <strong>exactly one</strong> (no input maps to two outputs).</p>\n<ul>\n<li>The <strong>domain</strong> is $A$ — the set of legal inputs.</li>\n<li>The <strong>codomain</strong> is $B$ — the set the outputs are allowed to live in.</li>\n<li>The <strong>range</strong> (or image) is the set of outputs actually achieved: $\\{ f(x) : x \\in A \\} \\subseteq B$. The range can be a strict subset of the codomain.</li>\n</ul>\n<p>A clean way to test a candidate rule is the <strong>vertical line test</strong>: a curve in the plane is the graph of a function of $x$ if and only if every vertical line meets it at most once. That is just \"exactly one output per input\" drawn geometrically.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of a function as a deterministic machine, not an equation. Feed it 3, you always get the same thing back. The equation $x^2 + y^2 = 1$ is <em>not</em> a function of $x$ because $x = 0$ yields both $y = 1$ and $y = -1$ — the machine would be indecisive.</p>\n</div>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>A trained neural network is literally a function $f_\\theta : \\mathbb{R}^n \\to \\mathbb{R}^m$ parameterized by weights $\\theta$. \"Inference\" is just evaluating $f_\\theta(x)$. The domain is your feature space, the codomain might be logits in $\\mathbb{R}^{10}$, and the range after a softmax is the probability simplex. Everything you learn here about domain, range, and composition is the grammar of how models are built.</p>\n</div>\n\n<h3>2. Finding domain and range</h3>\n<p>When a function is given by a formula and no domain is stated, the convention is the <strong>natural domain</strong>: all real inputs for which the formula produces a real number. Three rules catch almost every case:</p>\n<ol>\n<li><strong>No division by zero.</strong> For $\\dfrac{1}{g(x)}$, exclude inputs where $g(x) = 0$.</li>\n<li><strong>No even roots of negatives.</strong> For $\\sqrt{g(x)}$, require $g(x) \\ge 0$.</li>\n<li><strong>No logarithm of nonpositive numbers.</strong> For $\\ln g(x)$, require $g(x) > 0$.</li>\n</ol>\n<p><strong>Example.</strong> Find the natural domain of $f(x) = \\dfrac{\\sqrt{x+2}}{x-3}$. The square root needs $x + 2 \\ge 0$, i.e. $x \\ge -2$; the denominator needs $x \\ne 3$. Intersecting: domain $= [-2, 3) \\cup (3, \\infty)$.</p>\n<p>Range is usually harder and is best read off the graph or by solving $y = f(x)$ for $x$ and asking which $y$ are attainable. For $f(x) = x^2$ the range is $[0, \\infty)$ because squares are never negative and every nonnegative number is a square.</p>\n\n<h3>3. The parent function zoo</h3>\n<div data-viz=\"calc-curve-sketch\"></div>\n<p>Almost every function you meet is a transformed, combined, or composed version of a handful of <strong>parent functions</strong>. Knowing their shapes by heart lets you sketch and reason without plotting points.</p>\n\n<h4>Linear: $f(x) = mx + b$</h4>\n<p>A straight line, slope $m$, intercept $b$. Domain and range are all of $\\mathbb{R}$ (unless $m = 0$, giving a constant with range $\\{b\\}$). The defining property: <strong>constant rate of change</strong>. This is the local model behind derivatives — zoom into any smooth curve and it looks linear.</p>\n\n<h4>Polynomial: $f(x) = a_n x^n + \\dots + a_1 x + a_0$</h4>\n<p>Smooth, no breaks or asymptotes, domain all of $\\mathbb{R}$. End behavior is dictated by the leading term $a_n x^n$. Degree bounds the number of turning points (at most $n-1$) and real roots (at most $n$). A degree-2 polynomial (parabola) opens up if $a_2 > 0$.</p>\n\n<h4>Rational: $f(x) = \\dfrac{p(x)}{q(x)}$</h4>\n<p>A ratio of polynomials. <strong>Vertical asymptotes</strong> occur where $q(x) = 0$ but $p(x) \\ne 0$; a <strong>horizontal asymptote</strong> is governed by comparing degrees of $p$ and $q$. The simplest is $f(x) = 1/x$: two branches, asymptotes along both axes, domain and range $\\mathbb{R} \\setminus \\{0\\}$.</p>\n\n<h4>Exponential: $f(x) = b^x$ (with $b > 0$, $b \\ne 1$)</h4>\n<p>Domain all of $\\mathbb{R}$, range $(0, \\infty)$ — exponentials are always positive. Passes through $(0, 1)$. Grows (if $b > 1$) or decays (if $0 < b < 1$) by a <strong>constant multiplicative factor</strong> per unit step: $f(x+1) = b \\cdot f(x)$. The natural base $e \\approx 2.718$ is special because $\\frac{d}{dx} e^x = e^x$.</p>\n\n<h4>Logarithmic: $f(x) = \\log_b x$</h4>\n<p>The inverse of $b^x$: domain $(0, \\infty)$, range all of $\\mathbb{R}$, passing through $(1, 0)$. It turns multiplication into addition, $\\log(xy) = \\log x + \\log y$, which is exactly why log-likelihoods replace likelihoods in ML — products of probabilities become tractable sums.</p>\n\n<h4>Trigonometric: $\\sin x$, $\\cos x$, $\\tan x$</h4>\n<p>$\\sin$ and $\\cos$ are <strong>periodic</strong> with period $2\\pi$, domain all of $\\mathbb{R}$, range $[-1, 1]$. They are the parent waves: any reasonable periodic signal decomposes into a sum of them (Fourier analysis). $\\tan x = \\sin x / \\cos x$ has period $\\pi$, range all of $\\mathbb{R}$, and vertical asymptotes where $\\cos x = 0$.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>These families are not arbitrary — they are the functions that are \"closed\" under the operations we care about. Exponentials are eigenfunctions of differentiation; sines and cosines are eigenfunctions of the shift operator. The reason $e^x$ and $\\sin x$ keep reappearing in physics, finance, and deep learning is that they are fixed points of natural transformations, not historical accident.</p>\n</div>\n\n<h3>4. Composition: chaining functions</h3>\n<p>Given $f$ and $g$, the <strong>composition</strong> $(f \\circ g)(x) = f(g(x))$ means \"do $g$ first, then feed the result into $f$.\" Order matters: in general $f \\circ g \\ne g \\circ f$.</p>\n<p>The domain of $f \\circ g$ is subtle: $x$ must be in the domain of $g$, <em>and</em> $g(x)$ must be in the domain of $f$.</p>\n<p><strong>Example.</strong> Let $f(x) = \\sqrt{x}$ and $g(x) = 1 - x^2$. Then</p>\n$$(f \\circ g)(x) = \\sqrt{1 - x^2}.$$\n<p>For this to be real we need $1 - x^2 \\ge 0$, i.e. $x \\in [-1, 1]$ — the upper unit semicircle. Reversed, $(g \\circ f)(x) = 1 - (\\sqrt{x})^2 = 1 - x$, but only for $x \\ge 0$ since $f$ requires it. Same algebra, different domains.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>A deep network is a composition $f_L \\circ f_{L-1} \\circ \\dots \\circ f_1$, each layer an affine map followed by a nonlinearity. \"Depth\" is just composition count. The chain rule for differentiating compositions, $\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)$, generalizes to backpropagation — gradients flow backward through the composition exactly as the chain rule prescribes.</p>\n</div>\n\n<h3>5. Inverses: undoing a function</h3>\n<p>The <strong>inverse</strong> $f^{-1}$ undoes $f$: $f^{-1}(f(x)) = x$ and $f(f^{-1}(y)) = y$. (Note: $f^{-1}$ does <em>not</em> mean $1/f$.) An inverse exists as a function only when $f$ is <strong>one-to-one (injective)</strong> — distinct inputs give distinct outputs — which geometrically is the <strong>horizontal line test</strong>: every horizontal line hits the graph at most once.</p>\n<p>Key facts:</p>\n<ul>\n<li>The domain of $f^{-1}$ is the range of $f$, and vice versa — inverting <strong>swaps domain and range</strong>.</li>\n<li>The graph of $f^{-1}$ is the reflection of the graph of $f$ across the line $y = x$.</li>\n<li>To find a formula: write $y = f(x)$, swap $x$ and $y$, solve for $y$.</li>\n</ul>\n<p><strong>Worked example.</strong> Find the inverse of $f(x) = \\dfrac{2x + 3}{x - 1}$.</p>\n<pre><code>Start:        y = (2x + 3) / (x - 1)\nSwap x, y:    x = (2y + 3) / (y - 1)\nClear denom:  x(y - 1) = 2y + 3\nExpand:       xy - x = 2y + 3\nCollect y:    xy - 2y = x + 3\nFactor:       y(x - 2) = x + 3\nSolve:        y = (x + 3) / (x - 2)\n</code></pre>\n<p>So $f^{-1}(x) = \\dfrac{x+3}{x-2}$. Check: the original is undefined at $x = 1$ and has horizontal asymptote $y = 2$ (so $2$ is not in its range); the inverse is undefined at $x = 2$ and has horizontal asymptote $y = 1$. Domain and range have swapped exactly as predicted — a satisfying consistency check.</p>\n<p>When a function fails the horizontal line test, we <strong>restrict the domain</strong> to make it injective. $f(x) = x^2$ is not invertible on $\\mathbb{R}$, but restricted to $[0, \\infty)$ its inverse is $\\sqrt{x}$. This is why $\\sin^{-1}$ (arcsine) is defined only on $[-1, 1]$ with outputs in $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ — a deliberate restriction to recover a function.</p>\n\n<h3>6. Putting it together</h3>\n<p>Functions are the objects calculus studies; limits and derivatives are tools for probing how they behave. Before differentiating anything, you should be able to: state a function's domain and range, recognize its parent family and rough shape, decompose it into compositions, and decide whether it can be inverted. These skills turn opaque formulas into structured, predictable objects — the same fluency that lets you read a model architecture and immediately know what each layer does to its input space.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: a function is a machine, a graph is its fingerprint</summary>\n<p>A <b>function</b> is a rule with one job: assign to each input exactly <em>one</em> output. That single-valued requirement is the whole definition — and it is what the <b>vertical line test</b> checks: if any vertical line meets a graph twice, two outputs share an input, so it is not a function. The graph is simply the set of all $(x, f(x))$ pairs drawn in the plane — a complete visual fingerprint of the rule.</p>\n<p>Reading a graph <em>is</em> reading the function. Where it crosses the axes = roots and the initial value; where it rises or falls = the sign of the rate of change (the future derivative); how steep = how fast the output responds; where it is flat or turns = maxima, minima, equilibria. Transformations of the formula are rigid motions of the graph: $f(x) + c$ shifts up, $f(x - c)$ shifts right, $-f(x)$ flips, $f(ax)$ scales horizontally.</p>\n<p>The \"aha\": \"function\" and \"graph\" are the same object in two languages — an algebraic rule and a geometric shape. Calculus studies how that shape changes (slope, the derivative) and accumulates (area, the integral), so fluency at translating formula into picture and back is the foundation everything else is built on.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: composition, inverses, and when an inverse exists</summary>\n<p>Beyond \"machine and fingerprint,\" two operations turn functions into a toolkit: <b>composing</b> them and <b>inverting</b> them.</p>\n<p><b>Composition chains machines.</b> $(f \\circ g)(x) = f(g(x))$ runs $g$, then feeds its output into $f$ — the output of one becomes the input of the next. Order matters: $f \\circ g \\ne g \\circ f$ in general. (This is the structure the chain rule differentiates, and that neural networks stack.)</p>\n<p><b>The inverse undoes the machine.</b> $f^{-1}$ satisfies $f^{-1}(f(x)) = x$ — it runs the machine backward. Graphically, $y = f^{-1}(x)$ is the reflection of $y = f(x)$ across the line $y = x$. But an inverse exists <em>only</em> if $f$ is <b>one-to-one</b> (each output comes from exactly one input); otherwise \"running backward\" is ambiguous. That is why $\\sqrt{\\cdot}$ inverts $x^2$ only after restricting to $x \\ge 0$, and why $\\arcsin$ needs a restricted domain.</p>\n<p>The \"aha\": functions are not just static graphs — they <em>compose</em> (the basis of deep models and the chain rule) and sometimes <em>invert</em> (only when one-to-one). Recognizing whether a function is invertible — does each output trace back to a single input? — is the key question behind logarithms, inverse trig, and solving equations.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: transformations — shift, scale, reflect</summary>\n<p>Once you know a function's graph, you get a whole family for free by <strong>transforming</strong> it — shifting, scaling, reflecting — without re-plotting a single point. Recognizing these turns \"what does $f$ look like?\" into \"it is the basic shape, moved.\"</p>\n<p><b>The four moves.</b> Start from $y=f(x)$. <em>Vertical shift</em>: $f(x)+c$ moves the graph up by $c$. <em>Horizontal shift</em>: $f(x-c)$ moves it <em>right</em> by $c$ (note the counterintuitive sign — inside the function everything runs backwards). <em>Scaling</em>: $a\\,f(x)$ stretches vertically by $a$, while $f(bx)$ <em>compresses</em> horizontally by $b$. <em>Reflection</em>: $-f(x)$ flips across the x-axis, $f(-x)$ across the y-axis.</p>\n<p><b>Inside vs outside.</b> The unifying rule: changes <em>outside</em> $f$ act on the output (vertical, intuitive direction); changes <em>inside</em> $f$ act on the input (horizontal, reversed direction). That single distinction explains every case.</p>\n<p>The \"aha\": you rarely graph from scratch — recognize the base shape and read off the transformations. Outside the function is vertical and intuitive; inside is horizontal and backwards. The same moves reappear as data normalization (shift by the mean, scale by the std).</p>\n</details>\n",
          "mcq": [
            {
              "q": "What is the natural domain of $f(x) = \\dfrac{\\ln(x-1)}{\\sqrt{4-x}}$?",
              "choices": [
                "$(1, 4)$",
                "$[1, 4]$",
                "$(1, 4]$",
                "$(-\\infty, 4)$"
              ],
              "answer": 0,
              "explain": "The log requires $x - 1 > 0$ (so $x > 1$), and the square root in the denominator requires $4 - x > 0$ strictly (so $x < 4$); intersecting gives the open interval $(1,4)$."
            },
            {
              "q": "If $f(x) = \\sqrt{x}$ and $g(x) = x - 5$, what is the domain of $(f \\circ g)(x) = \\sqrt{x-5}$?",
              "choices": [
                "all real $x$",
                "$x \\ge 5$",
                "$x \\ge 0$",
                "$x \\le 5$"
              ],
              "answer": 1,
              "explain": "We need $g(x) = x - 5$ to land in the domain of $f$, i.e. $x - 5 \\ge 0$, so $x \\ge 5$. The inner domain (all reals) imposes no extra restriction."
            },
            {
              "q": "Which statement about $f^{-1}$ is correct?",
              "choices": [
                "$f^{-1}$ exists as a function only if $f$ is one-to-one",
                "$f^{-1}(x)$ equals $1/f(x)$",
                "The graph of $f^{-1}$ is the reflection of $f$ across the $x$-axis",
                "$f^{-1}$ has the same domain as $f$"
              ],
              "answer": 0,
              "explain": "An inverse function requires injectivity (the horizontal line test). $f^{-1}$ is not the reciprocal, it reflects across $y=x$, and it swaps domain and range with $f$."
            },
            {
              "q": "Why is the range of $f(x) = b^x$ (with $b>0$, $b \\ne 1$) equal to $(0, \\infty)$ rather than all of $\\mathbb{R}$?",
              "choices": [
                "Because $b^x$ is always strictly positive and never zero, but takes every positive value",
                "Because exponentials are only defined for positive $x$",
                "Because the domain is restricted to positive numbers",
                "Because $b^x$ has a horizontal asymptote at $y = 1$"
              ],
              "answer": 0,
              "explain": "$b^x > 0$ for all real $x$ (it approaches but never reaches 0), and as $x$ ranges over $\\mathbb{R}$ the output sweeps every positive real, giving range $(0,\\infty)$."
            },
            {
              "q": "A neural network ends in a 10-way softmax, so we model it as $f_\\theta : \\mathbb{R}^n \\to \\mathbb{R}^{10}$. According to the lesson, what is $\\mathbb{R}^{10}$ called here, and how does it relate to the actual softmax outputs?",
              "choices": [
                "$\\mathbb{R}^{10}$ is the range; the codomain is the smaller probability simplex inside it",
                "$\\mathbb{R}^{10}$ is the codomain; the actual outputs (the probability simplex) form the range, which is a strict subset of it",
                "$\\mathbb{R}^{10}$ is the domain; the softmax outputs are its codomain",
                "$\\mathbb{R}^{10}$ is both the codomain and the range, since every point in it is achievable"
              ],
              "answer": 1,
              "explain": "The codomain is the declared output space the values are allowed to live in, while the range is the set actually achieved (here the probability simplex), which can be a strict subset of the codomain."
            },
            {
              "q": "Using the worked inverse $f(x) = \\dfrac{2x+3}{x-1}$, which has $f^{-1}(x) = \\dfrac{x+3}{x-2}$, what is the range of the original $f$?",
              "choices": [
                "All real numbers",
                "$(0, \\infty)$",
                "$\\mathbb{R} \\setminus \\{1\\}$ (every real except 1)",
                "$\\mathbb{R} \\setminus \\{2\\}$ (every real except 2)"
              ],
              "answer": 3,
              "explain": "Inverting swaps domain and range, so the range of $f$ equals the domain of $f^{-1}$, which excludes $x=2$ where $f^{-1}$ is undefined (matching $f$'s horizontal asymptote $y=2$)."
            },
            {
              "q": "Let $f(x) = \\sqrt{x}$ and $g(x) = 1 - x^2$. The lesson computes $(g \\circ f)(x) = 1 - x$. Why is the domain of this composition $[0, \\infty)$ rather than all of $\\mathbb{R}$, even though $1 - x$ is defined everywhere?",
              "choices": [
                "Because the simplified output $1 - x$ secretly fails for negative $x$",
                "Because $g$ only outputs values in $[0, \\infty)$",
                "Because $x$ must first be a legal input to the inner function $f$, which requires $x \\ge 0$",
                "Because composition is non-commutative, which always shrinks the domain"
              ],
              "answer": 2,
              "explain": "The domain of $g \\circ f$ requires $x$ to be a valid input of the inner function applied first; here $f$ runs first, so $x \\ge 0$ is forced before $1-x$ is ever evaluated."
            },
            {
              "q": "Which single statement correctly distinguishes the two line tests as described in the lesson?",
              "choices": [
                "The vertical line test checks injectivity; the horizontal line test checks whether a curve is a function at all",
                "Both tests check the same thing, but the horizontal one is used for inverses by convention",
                "The vertical line test checks whether a curve is a function; the horizontal line test checks whether that function is one-to-one (invertible)",
                "The horizontal line test checks the domain; the vertical line test checks the range"
              ],
              "answer": 2,
              "explain": "A curve passes the vertical line test iff each input has exactly one output (it is a function), while passing the horizontal line test means each output comes from at most one input (injective), which is what permits an inverse."
            },
            {
              "q": "A relation $R$ pairs students with the courses they are enrolled in this semester. Treating \"student\" as the input, under what condition is $R$ a function from students to courses?",
              "choices": [
                "Whenever every course has at least one student enrolled",
                "Whenever each student is enrolled in exactly one course",
                "Whenever no two students share the same course",
                "Whenever the number of students equals the number of courses"
              ],
              "answer": 1,
              "explain": "A function requires each input to map to exactly one output, so every student must have exactly one course. Conditions on courses (surjectivity, distinctness, counts) constrain the codomain side and are irrelevant to whether the rule is well-defined as a function."
            },
            {
              "q": "Consider $f : \\mathbb{R} \\to \\mathbb{R}$ defined by $f(x) = x^2$. A student claims \"$f$ is not really a function because both $-3$ and $3$ give output $9$.\" What is wrong with this reasoning?",
              "choices": [
                "Nothing is wrong; one output reached by two inputs violates the definition",
                "It is wrong only because the codomain should have been $[0, \\infty)$ instead of $\\mathbb{R}$",
                "It is wrong because $f$ fails the vertical line test at $x = 9$",
                "The definition forbids one input giving two outputs, not one output coming from two inputs"
              ],
              "answer": 3,
              "explain": "The rule \"exactly one output per input\" says nothing about how many inputs share an output; many-to-one is perfectly allowed (only one-to-many is forbidden). $f(x)=x^2$ passes the vertical line test, and the codomain choice does not affect functionhood."
            },
            {
              "q": "The unit circle $x^2 + y^2 = 1$ fails to define $y$ as a function of $x$. Using the lesson's geometric criterion, what is the precise reason?",
              "choices": [
                "Some horizontal line meets the curve more than once",
                "Some vertical line (e.g. $x = 0$) meets the curve more than once",
                "The curve is bounded, and functions must have unbounded graphs",
                "The equation cannot be solved algebraically for $y$"
              ],
              "answer": 1,
              "explain": "The vertical line test says a curve is the graph of a function of $x$ iff every vertical line meets it at most once; the line $x=0$ hits the circle at $y=1$ and $y=-1$, giving one input two outputs. Horizontal-line behavior and solvability are unrelated to this test."
            },
            {
              "q": "Let $g : \\{1, 2, 3\\} \\to \\{a, b, c, d\\}$ with $g(1)=a$, $g(2)=c$, $g(3)=a$. Which statement correctly identifies the codomain and range?",
              "choices": [
                "Codomain $= \\{a, c\\}$ and range $= \\{a, b, c, d\\}$",
                "Codomain and range are both $\\{a, b, c, d\\}$",
                "Codomain $= \\{1, 2, 3\\}$ and range $= \\{a, c\\}$",
                "Codomain $= \\{a, b, c, d\\}$ and range $= \\{a, c\\}$"
              ],
              "answer": 3,
              "explain": "The codomain is the declared target set $\\{a,b,c,d\\}$, while the range is the set of outputs actually achieved, $\\{a, c\\}$ (note $a$ is reached twice but listed once). The range is a strict subset of the codomain here, and the domain $\\{1,2,3\\}$ is neither."
            },
            {
              "q": "What property must a relation have to be a function?",
              "choices": [
                "Every output comes from exactly one input",
                "It must have the same number of inputs and outputs",
                "Every input is assigned exactly one output",
                "It must be invertible"
              ],
              "answer": 2,
              "explain": "A function assigns to each input (domain element) exactly one output — no input maps to two different values. (Requiring every *output* to have exactly one input is *injectivity*, a separate, stronger property; invertibility needs it.) This 'one output per input' rule is what the vertical line test checks graphically."
            },
            {
              "q": "The set of all possible output values a function actually takes is called its:",
              "choices": [
                "domain",
                "codomain",
                "inverse",
                "range"
              ],
              "answer": 3,
              "explain": "The *range* (or image) is the set of values $f$ actually produces; the *domain* is the set of allowed inputs. The *codomain* is the declared target set, which can be larger than the range — e.g. $f(x)=x^2$ has codomain $\\mathbb{R}$ but range $[0,\\infty)$."
            },
            {
              "q": "In the composition $(f \\circ g)(x) = f(g(x))$, which function is applied first?",
              "choices": [
                "both at the same time",
                "$f$, the outer function — then $g$",
                "$g$, the inner function — then $f$ acts on the result",
                "it depends on the value of $x$"
              ],
              "answer": 2,
              "explain": "Read inside-out: $(f\\circ g)(x) = f(g(x))$ means apply $g$ to $x$ first, then feed that output into $f$. Order matters — $f\\circ g$ and $g\\circ f$ are generally different functions."
            },
            {
              "q": "A linear function is written $f(x) = mx + b$. What do $m$ and $b$ represent?",
              "choices": [
                "$m$ is the slope (constant rate of change) and $b$ is the $y$-intercept (the value at $x=0$)",
                "both are slopes, in different units",
                "$m$ is the $y$-intercept and $b$ is the slope",
                "$m$ is the input and $b$ is the output"
              ],
              "answer": 0,
              "explain": "$m$ is the slope — the constant rate of change $\\Delta f/\\Delta x$ — and $b = f(0)$ is the $y$-intercept. A constant slope is exactly what makes the graph a straight line, and it foreshadows the derivative: a linear function's derivative is the constant $m$."
            }
          ],
          "flashcards": [
            {
              "front": "Define a function $f : A \\to B$ precisely. What two conditions must hold?",
              "back": "A rule assigning to EACH element of the domain $A$ EXACTLY ONE element of $B$. (Every input gets an output; no input maps to two outputs.)"
            },
            {
              "front": "Domain vs. codomain vs. range?",
              "back": "Domain = set of legal inputs. Codomain = set outputs are allowed to live in. Range (image) = set of outputs actually achieved; range $\\subseteq$ codomain."
            },
            {
              "front": "Domain and range of $b^x$ vs. $\\log_b x$ ($b>0$, $b\\ne 1$)?",
              "back": "$b^x$: domain $\\mathbb{R}$, range $(0,\\infty)$, through $(0,1)$. $\\log_b x$: domain $(0,\\infty)$, range $\\mathbb{R}$, through $(1,0)$. They are inverses, so domain/range swap."
            },
            {
              "front": "How do you find a formula for $f^{-1}$?",
              "back": "Write $y = f(x)$, swap $x$ and $y$, then solve for $y$. The result is $f^{-1}(x)$. (Inverse exists only if $f$ is one-to-one / passes the horizontal line test.)"
            },
            {
              "front": "What is the domain restriction for $(f \\circ g)(x) = f(g(x))$?",
              "back": "$x$ must be in the domain of $g$, AND $g(x)$ must be in the domain of $f$. Both conditions together."
            },
            {
              "front": "Defining behavior: linear vs. exponential growth?",
              "back": "Linear $mx+b$ changes by a constant ADDITIVE amount per unit step ($f(x+1)-f(x)=m$). Exponential $b^x$ changes by a constant MULTIPLICATIVE factor ($f(x+1)/f(x)=b$)."
            }
          ],
          "homework": [
            {
              "prompt": "Find the natural domain of $f(x) = \\dfrac{\\sqrt{x+4}}{x^2 - x - 6}$, and state which $x$-values are excluded and why.",
              "hint": "The numerator's square root needs a nonnegative radicand; the denominator must not be zero. Factor the denominator.",
              "solution": "Square root requires $x + 4 \\ge 0 \\Rightarrow x \\ge -4$. Denominator $x^2 - x - 6 = (x-3)(x+2)$, which is zero at $x = 3$ and $x = -2$, so exclude both. Combining: domain $= [-4, -2) \\cup (-2, 3) \\cup (3, \\infty)$. Excluded: $x < -4$ (square root of a negative), and $x = -2, 3$ (division by zero)."
            },
            {
              "prompt": "Let $f(x) = 3x - 1$ and $g(x) = x^2 + 2$. Compute both $(f \\circ g)(x)$ and $(g \\circ f)(x)$, and evaluate each at $x = 2$. Are the compositions equal?",
              "hint": "Compose carefully: $(f\\circ g)(x) = f(g(x))$ means substitute $g$ into $f$. Order matters.",
              "solution": "$(f \\circ g)(x) = f(x^2+2) = 3(x^2+2) - 1 = 3x^2 + 5$; at $x=2$: $3(4)+5 = 17$. $(g \\circ f)(x) = g(3x-1) = (3x-1)^2 + 2 = 9x^2 - 6x + 3$; at $x=2$: $9(4)-12+3 = 27$. They are not equal ($3x^2+5 \\ne 9x^2-6x+3$), confirming composition is generally non-commutative."
            },
            {
              "prompt": "Show that $f(x) = \\dfrac{x}{x+1}$ is one-to-one on its domain and find $f^{-1}(x)$. State the domain of $f^{-1}$.",
              "hint": "Set $y = f(x)$, swap variables, and solve for $y$. The range of $f$ becomes the domain of $f^{-1}$ (look for the horizontal asymptote).",
              "solution": "Write $y = \\frac{x}{x+1}$, swap: $x = \\frac{y}{y+1}$. Then $x(y+1) = y \\Rightarrow xy + x = y \\Rightarrow x = y - xy = y(1-x) \\Rightarrow y = \\frac{x}{1-x}$. So $f^{-1}(x) = \\frac{x}{1-x}$. Because we could solve uniquely for $y$, $f$ is one-to-one. The original $f$ has horizontal asymptote $y = 1$ (degree of numerator equals degree of denominator, leading-coefficient ratio $1/1$), so $1$ is not in its range; hence the domain of $f^{-1}$ is all reals except $x = 1$, consistent with $f^{-1}(x) = \\frac{x}{1-x}$ being undefined at $x = 1$."
            }
          ],
          "examples": [
            {
              "title": "Finding the Domain and Range of a Square-Root Rule",
              "body": "Consider the rule $f(x) = \\sqrt{x - 4}$. Determine the domain of $f$ (the set of legal inputs), and find its range (the set of outputs actually achieved).",
              "solution": "We treat $f$ as a machine and ask which inputs it can legally accept, then which outputs come out.\n\n<strong>Step 1 — Domain.</strong> The square root $\\sqrt{\\;\\cdot\\;}$ only accepts non-negative numbers (over the real numbers). So the expression inside must satisfy\n$$x - 4 \\geq 0.$$\nSolving gives $x \\geq 4$. Thus the domain is\n$$A = \\{\\, x : x \\geq 4 \\,\\} = [4, \\infty).$$\n\n<strong>Step 2 — Range.</strong> For any legal input, $x - 4 \\geq 0$, so $\\sqrt{x-4} \\geq 0$ — every output is at least $0$. Can it equal $0$? Yes: $f(4) = \\sqrt{0} = 0$. Can it get arbitrarily large? Yes: as $x \\to \\infty$, $\\sqrt{x-4} \\to \\infty$. Since $\\sqrt{\\;\\cdot\\;}$ is continuous, every value in between is hit. So the range is\n$$\\{\\, f(x) : x \\in A \\,\\} = [0, \\infty).$$\n\n<strong>Step 3 — Sanity check.</strong> Pick $x = 13$: $f(13) = \\sqrt{13 - 4} = \\sqrt{9} = 3$, which lies in $[0,\\infty)$. Good — exactly one output for that input, as a function requires.\n\n<strong>Answer:</strong> domain $[4, \\infty)$, range $[0, \\infty)$."
            },
            {
              "title": "Is It a Function? The Vertical Line Test on a Circle",
              "body": "The equation $x^2 + y^2 = 25$ describes a circle of radius $5$. Decide whether this relation defines $y$ as a function of $x$, and verify your conclusion algebraically at a specific input.",
              "solution": "A relation defines $y$ as a function of $x$ exactly when each input $x$ yields <strong>exactly one</strong> output $y$ — equivalently, when every vertical line meets the curve at most once.\n\n<strong>Step 1 — Solve for $y$.</strong> Rearrange:\n$$y^2 = 25 - x^2 \\quad\\Longrightarrow\\quad y = \\pm\\sqrt{25 - x^2}.$$\nThe $\\pm$ is the warning sign: a single $x$ can produce two $y$-values.\n\n<strong>Step 2 — Test a concrete input.</strong> Take $x = 3$:\n$$y = \\pm\\sqrt{25 - 9} = \\pm\\sqrt{16} = \\pm 4.$$\nSo the input $x = 3$ maps to <strong>both</strong> $y = 4$ and $y = -4$. The points $(3, 4)$ and $(3, -4)$ both lie on the circle.\n\n<strong>Step 3 — Vertical line test.</strong> The vertical line $x = 3$ crosses the circle at those two points — two intersections, not one. The test fails.\n\n<strong>Step 4 — Reconcile.</strong> Because the machine would be indecisive (feed it $3$, get back two different answers), $x^2 + y^2 = 25$ is <strong>not</strong> a function of $x$. Note this is a property of the whole relation, not a flaw fixable by choosing nicer numbers: any $-5 < x < 5$ gives two outputs.\n\n<strong>Remark (how to fix it).</strong> Restricting to one branch, $y = +\\sqrt{25 - x^2}$, *is* a function (the upper semicircle); each $x \\in [-5, 5]$ then gives exactly one $y \\geq 0$.\n\n<strong>Answer:</strong> No, $x^2 + y^2 = 25$ does not define $y$ as a function of $x$ — e.g. $x = 3$ gives $y = \\pm 4$, two outputs, failing the vertical line test."
            },
            {
              "title": "Composing functions (and shrinking the domain)",
              "body": "Let $f(x) = \\sqrt{x}$ and $g(x) = x - 4$. Find $(f \\circ g)(x)$, its domain, and evaluate it at $x = 8$.",
              "solution": "<strong>Compose inside-out.</strong> $(f \\circ g)(x) = f(g(x)) = f(x - 4) = \\sqrt{x - 4}$ — feed $g$'s output into $f$. Order matters: $(g \\circ f)(x) = \\sqrt{x} - 4$ is a different function.\n<strong>Find the domain.</strong> The composite is defined only where its <em>input to the square root</em> is valid: $x - 4 \\ge 0$, i.e. $x \\ge 4$. The domain is $[4, \\infty)$ — composition can <em>shrink</em> the domain: $g$ is fine everywhere, but $f$ rejects negatives, so the composite inherits that restriction.\n<strong>Evaluate.</strong> $(f \\circ g)(8) = \\sqrt{8 - 4} = \\sqrt{4} = 2$.\n<strong>The aha.</strong> Composition chains functions — the output of one becomes the input of the next — and the domain of the result is every $x$ that survives the <em>whole</em> chain: legal for $g$, and producing something legal for $f$. It is the same nesting the chain rule later differentiates."
            }
          ]
        },
        {
          "id": "c-limits-intuition",
          "title": "Limits: The Core Idea of Calculus",
          "minutes": 16,
          "content": "<h3>Why limits sit at the center of everything</h3>\n<p>Almost every idea in calculus is secretly a limit. The derivative is a limit of average rates of change. The definite integral is a limit of sums of thin rectangles. Continuity is defined with a limit. Even the number $e$ and the sum of an infinite series are limits. If you understand limits deeply, the rest of calculus stops feeling like a pile of rules and starts feeling like one idea applied over and over.</p>\n<p>The core question a limit answers is subtle and worth stating precisely: <strong>as the input gets arbitrarily close to some point, what value does the output get arbitrarily close to?</strong> Notice what this does <em>not</em> ask. It does not ask what the function equals at the point. It asks where the function is <em>headed</em>. That distinction — destination versus arrival — is the whole game.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>A limit describes a trend, not an event. Think of driving toward a town: the limit is the town the road points at, regardless of whether the road actually reaches it, has a pothole at the edge, or the town's sign says something different from where the road leads.</p></div>\n\n<h3>The notation, read carefully</h3>\n<p>We write</p>\n$$\\lim_{x \\to a} f(x) = L$$\n<p>and read it: \"the limit of $f(x)$, as $x$ approaches $a$, equals $L$.\" Unpacking each piece:</p>\n<ul>\n<li><code>x \\to a</code> means $x$ takes values <em>closer and closer</em> to $a$ — from both sides — but importantly $x \\neq a$. The point $a$ itself is excluded from the conversation.</li>\n<li>$L$ is the single number the outputs $f(x)$ home in on.</li>\n<li>The whole statement is a claim about behavior <em>near</em> $a$, deliberately silent about $a$ itself.</li>\n</ul>\n<p>Because $x = a$ is excluded, $f$ need not even be defined at $a$ for the limit to exist. This is not a technicality; it is the source of the limit's power. The expression $\\frac{\\sin x}{x}$ is undefined at $x = 0$ (you'd divide by zero), yet $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$. The function has a clear destination at $0$ even though it never arrives.</p>\n\n<h3>Reading a limit from a table (the numerical view)</h3>\n<p>Let's make this concrete with $f(x) = \\frac{x^2 - 1}{x - 1}$. At $x = 1$ this is $\\frac{0}{0}$, undefined. But watch what happens as $x$ creeps toward $1$ from both sides:</p>\n<pre><code>x        f(x) = (x^2 - 1)/(x - 1)\n0.9      1.9\n0.99     1.99\n0.999    1.999\n---------- 1 is here, but f(1) is undefined ----------\n1.001    2.001\n1.01     2.01\n1.1      2.1</code></pre>\n<p>From the left the outputs approach $2$; from the right they also approach $2$. The two sides agree, so $\\lim_{x\\to 1} f(x) = 2$. Algebraically this is no surprise: for $x \\neq 1$ we can factor and cancel, $\\frac{x^2-1}{x-1} = \\frac{(x-1)(x+1)}{x-1} = x+1$, which equals $2$ at $x=1$. The cancellation is legal <em>precisely because the limit ignores $x=1$</em>, where the cancelled factor would be zero. The graph is the line $y = x+1$ with a single point punched out (a \"removable\" hole) at $(1, 2)$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why this matters for ML</div><p>Numerical estimation of a limit by shrinking a step is exactly what <strong>finite-difference gradient checking</strong> does. To verify a hand-coded gradient, you compute $\\frac{f(x+h)-f(x-h)}{2h}$ for small $h$ and check it converges to your analytic derivative. You're literally estimating $\\lim_{h\\to 0}$ from a table. Too-large $h$ gives truncation error; too-small $h$ gives floating-point cancellation error — the practical echo of \"approach but never reach.\"</p></div>\n\n<h3>One-sided limits</h3>\n<p>Sometimes a function behaves differently depending on which direction you approach from. We split the idea in two:</p>\n<ul>\n<li><strong>Left-hand limit:</strong> $\\displaystyle\\lim_{x \\to a^-} f(x)$ — $x$ approaches $a$ through values <em>less than</em> $a$ (from the left on the number line).</li>\n<li><strong>Right-hand limit:</strong> $\\displaystyle\\lim_{x \\to a^+} f(x)$ — $x$ approaches $a$ through values <em>greater than</em> $a$ (from the right).</li>\n</ul>\n<p>The connection to the two-sided limit is the key theorem of this whole lesson:</p>\n$$\\lim_{x \\to a} f(x) = L \\quad\\Longleftrightarrow\\quad \\lim_{x \\to a^-} f(x) = L \\ \\text{ and } \\ \\lim_{x \\to a^+} f(x) = L.$$\n<p>In words: <strong>a two-sided limit exists if and only if both one-sided limits exist and are equal.</strong> If the left and right limits disagree, or either one fails, the two-sided limit does not exist (written DNE).</p>\n<p>Example: the Heaviside step $H(x) = 0$ for $x < 0$ and $H(x) = 1$ for $x \\ge 0$. Then $\\lim_{x\\to 0^-} H(x) = 0$ while $\\lim_{x\\to 0^+} H(x) = 1$. The sides disagree, so $\\lim_{x\\to 0} H(x)$ DNE — even though $H(0)$ is perfectly well defined and equals $1$. Once again: the value at the point is irrelevant to the limit.</p>\n\n<h3>The three ways a limit fails to exist</h3>\n<p>It is worth cataloging these, because exam questions and real bugs both live here:</p>\n<ol>\n<li><strong>Jump.</strong> The left and right limits each exist but are different numbers (the step function above). The graph has a vertical gap.</li>\n<li><strong>Blow-up (infinite).</strong> The outputs grow without bound, e.g. $\\lim_{x\\to 0}\\frac{1}{x^2} = +\\infty$. Since $\\infty$ is not a real number, we say the (finite) limit does not exist; the \"$=\\infty$\" notation describes <em>how</em> it fails. Note $\\frac{1}{x}$ is worse still: it goes to $-\\infty$ from the left and $+\\infty$ from the right.</li>\n<li><strong>Oscillation.</strong> The function wiggles forever and never settles, e.g. $\\lim_{x\\to 0}\\sin\\!\\left(\\frac{1}{x}\\right)$. As $x\\to 0$ the argument $\\frac1x$ races through infinitely many full cycles, so the output keeps sweeping all of $[-1,1]$ and approaches no single value.</li>\n</ol>\n\n<div class=\"callout\"><div class=\"c-tag\">Subtle point</div><p>Contrast oscillation case 3 with $\\lim_{x\\to 0} x\\sin\\!\\left(\\frac1x\\right)$, which <em>does</em> equal $0$. The $\\sin(1/x)$ still oscillates wildly, but the factor $x$ crushes the amplitude to zero. Since $-|x| \\le x\\sin(1/x) \\le |x|$ and both bounds go to $0$, the function is squeezed to $0$. Wild oscillation is survivable if the envelope collapses.</p></div>\n\n<h3>Worked example: a piecewise function, fully analyzed</h3>\n<p>Let</p>\n$$g(x) = \\begin{cases} x + 1 & x < 2 \\\\ 7 & x = 2 \\\\ x^2 - 1 & x > 2 \\end{cases}$$\n<p>Question: find $\\lim_{x\\to 2^-} g(x)$, $\\lim_{x\\to 2^+} g(x)$, decide whether $\\lim_{x\\to 2} g(x)$ exists, and compare with $g(2)$.</p>\n<p><strong>Left side.</strong> For $x < 2$ we use the rule $g(x) = x+1$. As $x\\to 2^-$, this approaches $2 + 1 = 3$. So $\\lim_{x\\to 2^-} g(x) = 3$.</p>\n<p><strong>Right side.</strong> For $x > 2$ we use $g(x) = x^2 - 1$. As $x\\to 2^+$, this approaches $2^2 - 1 = 3$. So $\\lim_{x\\to 2^+} g(x) = 3$.</p>\n<p><strong>Two-sided.</strong> Both one-sided limits exist and equal $3$, so by the theorem $\\lim_{x\\to 2} g(x) = 3$.</p>\n<p><strong>The value.</strong> But $g(2) = 7$ by the middle rule. So here $\\lim_{x\\to 2} g(x) = 3 \\neq 7 = g(2)$. The limit exists and is clean; the function is simply defined \"wrong\" at the single point $2$ — a removable discontinuity. (If instead the middle rule had been $g(2)=3$, the function would be continuous there. That equality of limit and value is exactly the definition of continuity, the topic that follows this one.)</p>\n\n<h3>The epsilon-delta definition (the formalism)</h3>\n<p>Everything above is intuition. Mathematicians needed a definition that does not lean on the vague phrase \"gets close to.\" The breakthrough, due to Weierstrass, reframes closeness as a <strong>challenge-and-response game</strong>.</p>\n<p>The formal statement: $\\lim_{x\\to a} f(x) = L$ means</p>\n$$\\forall \\varepsilon > 0,\\ \\exists\\, \\delta > 0 \\ \\text{ such that } \\ 0 < |x - a| < \\delta \\ \\Longrightarrow\\ |f(x) - L| < \\varepsilon.$$\n<p>Read it as a dialogue between a skeptic and you:</p>\n<ul>\n<li>The skeptic picks a tolerance $\\varepsilon > 0$ on the <em>output</em>: \"I demand $f(x)$ land within $\\varepsilon$ of $L$.\" Here $|f(x)-L|<\\varepsilon$ is exactly \"$f(x)$ is within $\\varepsilon$ of $L$.\"</li>\n<li>You must respond with a tolerance $\\delta > 0$ on the <em>input</em>: \"Then stay within $\\delta$ of $a$ (but not at $a$ — that's the $0 < |x-a|$ part) and I guarantee you'll be inside your $\\varepsilon$ band.\"</li>\n<li>If you can answer <em>every</em> challenge, no matter how tiny $\\varepsilon$, then $L$ truly is the limit.</li>\n</ul>\n<p>The logical order is everything: $\\varepsilon$ comes first, then $\\delta$ is allowed to depend on it ($\\delta$ usually shrinks as $\\varepsilon$ shrinks). The definition makes \"arbitrarily close\" precise without ever mentioning motion or infinity — it is a static statement about implications. And it automatically excludes $x = a$ via $0 < |x-a|$, encoding \"approach but don't arrive\" right into the logic.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The $\\varepsilon$-$\\delta$ structure — \"for every output tolerance there is an input tolerance\" — is the template for <strong>convergence</strong> everywhere in analysis and ML. Convergence of a training loss, of gradient descent to a minimizer, of stochastic estimators (the law of large numbers), and of an optimizer's stopping criterion (\"stop when the change is below $\\varepsilon$\") are all the same quantifier dance. The Lipschitz and continuity conditions that guarantee a neural net's optimization behaves are literally $\\varepsilon$-$\\delta$ statements with explicit $\\delta = \\varepsilon / \\text{(Lipschitz constant)}$. Learning to read this quantifier order pays off far beyond calculus.</p></div>\n\n<h4>A tiny epsilon-delta verification</h4>\n<p>Claim: $\\lim_{x\\to 3}(2x - 1) = 5$. Given $\\varepsilon > 0$, we need $|(2x-1) - 5| < \\varepsilon$. Simplify the left side: $|2x - 6| = 2|x - 3|$. We want $2|x-3| < \\varepsilon$, i.e. $|x-3| < \\varepsilon/2$. So <strong>choose $\\delta = \\varepsilon/2$.</strong> Then $0 < |x-3| < \\delta$ forces $|f(x) - 5| = 2|x-3| < 2\\delta = \\varepsilon$. Challenge met for every $\\varepsilon$, so the limit is indeed $5$. Notice we <em>found</em> $\\delta$ by working backward from the $\\varepsilon$ requirement — that reverse-engineering is the standard technique.</p>\n\n<h3>Putting it together</h3>\n<p>The mental checklist for any limit problem:</p>\n<ol>\n<li>Try direct substitution. If $f$ is \"nice\" (polynomial, etc.) at $a$, the limit is just $f(a)$ — this is what continuity will guarantee.</li>\n<li>If you hit $\\frac00$, that is an <em>invitation</em>, not a dead end: factor/cancel, rationalize, or use a known limit. The indeterminate form means the answer is hiding behind a removable hole.</li>\n<li>At a junction (piecewise rule, absolute value, defined-by-cases), compute both one-sided limits and apply the iff theorem.</li>\n<li>If outputs blow up or oscillate forever, the limit DNE; say precisely which failure mode it is.</li>\n<li>Remember throughout: the limit is about the neighborhood, not the point. $f(a)$ can be anything, or nothing, without affecting $\\lim_{x\\to a} f(x)$.</li>\n</ol>\n<p>Master this and you have the engine that drives derivatives, integrals, and the entire theory of convergence you'll meet again in optimization and statistics.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-limit-epsilon\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: a limit is about approach, not arrival</summary>\n<p>The limit $\\lim_{x \\to a} f(x) = L$ says: as $x$ gets <em>arbitrarily close</em> to $a$, $f(x)$ gets arbitrarily close to $L$. Crucially it says <b>nothing about $f(a)$ itself</b> — the value <em>at</em> the point is irrelevant; the limit is entirely about the neighbourhood <em>around</em> it.</p>\n<p>That is why three different situations share one limit. $f$ might be defined and equal $L$ there (continuous); or have a <b>hole</b> — undefined at $a$ but approaching $L$ (a removable discontinuity, like $\\frac{\\sin x}{x} \\to 1$ at $x = 0$ though $0/0$ is undefined); or be defined yet <em>misplaced</em>, $f(a) \\ne L$. The limit ignores all of that and asks only where the function is <em>heading</em>.</p>\n<p>The \"aha\": \"approaches\" is the whole content. The formal $\\varepsilon$-$\\delta$ definition makes \"arbitrarily close\" precise — for any tolerance $\\varepsilon$ there is a closeness $\\delta$ — but the intuition is just: trace the curve toward $a$ from both sides, and the limit is where it points, whether or not it lands there. That is exactly what lets derivatives (a $0/0$ form) and integrals (sums of vanishing pieces) be defined at all.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: limits at infinity and infinite limits</summary>\n<p>\"Approach, not arrival\" extends naturally to the unbounded: the thing approached — or the thing doing the approaching — can be $\\infty$. Two new flavors, both still limits.</p>\n<p><b>Limits <em>at</em> infinity (end behavior).</b> $\\lim_{x\\to\\infty} f(x) = L$ asks what value $f$ settles toward as the input runs off to the right — its <em>horizontal asymptote</em>. Example: $\\lim_{x\\to\\infty}\\frac{3x^2+1}{x^2-5} = 3$ (divide top and bottom by the dominant $x^2$); the graph flattens toward $y=3$.</p>\n<p><b>Infinite limits (blow-up).</b> $\\lim_{x\\to a} f(x) = \\infty$ says the <em>output</em> grows without bound as $x$ nears $a$ — a <em>vertical asymptote</em>. Example: $\\lim_{x\\to 0^+}\\frac{1}{x} = +\\infty$. (Note: \"$=\\infty$\" is shorthand for \"diverges to infinity,\" not a number the function reaches — the limit technically does not <em>exist</em> in the finite sense.)</p>\n<p>The \"aha\": the same idea — track where a function <em>heads</em> — covers three regimes by putting $\\infty$ in different slots: finite-to-finite (ordinary limit), <em>input</em> going to $\\infty$ (end behavior, horizontal asymptote), and <em>output</em> going to $\\infty$ (blow-up, vertical asymptote). Asymptotes are just limits with an infinity in them.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the ε–δ definition — making \"approach\" rigorous</summary>\n<p>\"$f(x)$ approaches $L$ as $x\\to a$\" (the other dives) is the right intuition — but mathematicians needed to pin down <em>approaches</em> precisely, with no hand-waving about motion or \"getting close.\" The <strong>epsilon–delta definition</strong> is that rigor.</p>\n<p><b>The definition.</b> $\\lim_{x\\to a}f(x)=L$ means: for <em>every</em> tolerance $\\varepsilon > 0$ there exists a $\\delta > 0$ such that whenever $0 < |x-a| < \\delta$, we have $|f(x)-L| < \\varepsilon$. Read it as a challenge–response game: you name how close to $L$ you demand ($\\varepsilon$), and I must find a neighborhood around $a$ (a $\\delta$) that guarantees it. If I can always answer, the limit is $L$.</p>\n<p><b>Why it matters.</b> This static, logical definition (no \"moving\" points) is what makes calculus airtight: continuity, derivatives, and integrals are all built on it, and it is how you <em>prove</em> a limit instead of guessing from a table. It cleanly handles the pathological cases a table misses, and it generalizes — swap absolute values for distances — to limits in any metric space, the foundation of real analysis.</p>\n<p>The \"aha\": \"approaches\" becomes a precise promise — for any $\\varepsilon$ you demand, a $\\delta$ exists making $|f(x)-L| < \\varepsilon$. The ε–δ game replaces intuition with logic, turning calculus from plausible into provable.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For $g(x)=\\frac{x^2-9}{x-3}$, what is $\\lim_{x\\to 3} g(x)$?",
              "choices": [
                "The limit does not exist, because $g(3)$ is undefined (division by zero)",
                "$0$",
                "$6$",
                "$3$"
              ],
              "answer": 2,
              "explain": "The limit ignores the point itself; factoring gives $\\frac{(x-3)(x+3)}{x-3}=x+3$ for $x\\neq3$, which approaches $3+3=6$. An undefined value at the point does not prevent a limit."
            },
            {
              "q": "A function has $\\lim_{x\\to 4^-} f(x)=2$, $\\lim_{x\\to 4^+} f(x)=5$, and $f(4)=2$. What is $\\lim_{x\\to 4} f(x)$?",
              "choices": [
                "It does not exist",
                "$3.5$, the average of the two sides",
                "$2$, because it matches both the left limit and the function value",
                "$5$"
              ],
              "answer": 0,
              "explain": "A two-sided limit exists only if the left and right limits are equal. Here they are $2$ and $5$ (a jump), so the limit DNE; the function value at the point is irrelevant."
            },
            {
              "q": "In the $\\varepsilon$-$\\delta$ definition of $\\lim_{x\\to a}f(x)=L$, which quantity is chosen first and which responds to it?",
              "choices": [
                "$\\delta$ is given first; then $\\varepsilon$ is chosen depending on $\\delta$",
                "$x$ is chosen first, then both $\\varepsilon$ and $\\delta$",
                "Both are chosen independently of each other",
                "$\\varepsilon$ is given first; then $\\delta$ is chosen depending on $\\varepsilon$"
              ],
              "answer": 3,
              "explain": "The output tolerance $\\varepsilon$ is the challenge given first; you then supply an input tolerance $\\delta$ (typically depending on $\\varepsilon$) that guarantees the output stays within $\\varepsilon$ of $L$."
            },
            {
              "q": "Why does $\\lim_{x\\to 0} x\\sin(1/x)=0$ even though $\\sin(1/x)$ oscillates without limit at $0$?",
              "choices": [
                "Because $\\sin(1/x)$ secretly approaches $0$ near the origin",
                "Because $-|x|\\le x\\sin(1/x)\\le |x|$ and both bounds go to $0$, squeezing the function to $0$",
                "Because the limit of a product is always the product of limits",
                "Because at $x=0$ the function equals $0$"
              ],
              "answer": 1,
              "explain": "The oscillation persists, but the amplitude is bounded by $|x|$, which collapses to $0$; the squeeze (sandwich) theorem forces the product to $0$ regardless of the wiggling factor."
            },
            {
              "q": "The statement $\\lim_{x \\to a} f(x) = L$ makes a claim about which of the following?",
              "choices": [
                "The value of $f$ exactly at $x = a$",
                "The largest value $f$ reaches on the interval around $a$",
                "The behavior of $f(x)$ as $x$ takes values near $a$ but not equal to $a$",
                "Whether $f$ is defined at $x = a$"
              ],
              "answer": 2,
              "explain": "A limit describes where the outputs head as $x$ approaches $a$ from both sides with $x \\neq a$, deliberately saying nothing about $f(a)$ itself."
            },
            {
              "q": "Why can $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$ even though $\\frac{\\sin x}{x}$ is undefined at $x = 0$?",
              "choices": [
                "Because dividing by zero secretly equals 1",
                "Because the limit only cares about the trend of the outputs near 0, not the value at 0",
                "Because $\\sin 0 = 1$, which fixes the division",
                "Because the function is redefined to equal 1 at $x = 0$"
              ],
              "answer": 1,
              "explain": "Since $x = 0$ is excluded from the limit, the function only needs a clear destination near 0, which it has even where it is undefined."
            },
            {
              "q": "For $f(x) = \\frac{x^2 - 1}{x - 1}$, why is canceling to get $f(x) = x + 1$ a legitimate step when computing $\\lim_{x\\to 1} f(x)$?",
              "choices": [
                "Because the limit excludes $x = 1$, so the factor $x - 1$ is never actually zero in the cancellation",
                "Because $\\frac{x-1}{x-1} = 1$ holds even at $x = 1$",
                "Because $x^2 - 1$ and $x - 1$ are always equal",
                "Because limits ignore all algebraic rules"
              ],
              "answer": 0,
              "explain": "The limit only considers $x \\neq 1$, so $x - 1 \\neq 0$ and the cancellation is valid, giving $\\lim_{x\\to 1}(x+1) = 2$."
            },
            {
              "q": "A table shows that as $x \\to 2$ from the left $f(x)$ approaches $3$, while from the right $f(x)$ approaches $7$. What can you conclude about $\\lim_{x\\to 2} f(x)$?",
              "choices": [
                "The limit equals $5$, the average of the two sides",
                "The limit equals $3$ because the left side is considered first",
                "The limit equals $f(2)$, whatever that value is",
                "The two-sided limit does not exist because the sides disagree"
              ],
              "answer": 3,
              "explain": "A two-sided limit exists only when the left and right behaviors agree on a single number, so disagreeing one-sided values means the limit does not exist."
            },
            {
              "q": "A function is defined so that $f(x) = x + 4$ for every $x \\neq 1$, but $f(1) = 100$. What is $\\lim_{x\\to 1} f(x)$?",
              "choices": [
                "$5$, because the limit cares about the trend near $x=1$, not the value at $x=1$",
                "$100$, because that is the function's value at the point",
                "The limit does not exist, because $f(1)$ disagrees with the trend",
                "$1$, because $x$ is approaching $1$"
              ],
              "answer": 0,
              "explain": "A limit describes where the function is headed as $x$ approaches $1$, which is $1+4=5$; the assigned value $f(1)=100$ is irrelevant. Choosing $100$ confuses 'arrival' (the value at the point) with 'destination' (the trend)."
            },
            {
              "q": "Which statement most accurately describes what $\\lim_{x\\to a} f(x) = L$ asserts?",
              "choices": [
                "$f(a) = L$, so the function must be defined and equal to $L$ at $a$",
                "$f(x)$ eventually equals $L$ exactly once $x$ is close enough to $a$",
                "$f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close to (but not equal to) $a$",
                "$f$ is increasing toward $L$ as $x$ increases toward $a$"
              ],
              "answer": 2,
              "explain": "The limit is about outputs getting arbitrarily close to $L$ as inputs approach $a$, with $x=a$ itself excluded. It does not require $f(a)=L$, does not require $f$ to ever exactly equal $L$, and says nothing about monotonicity."
            },
            {
              "q": "Evaluate $\\lim_{x\\to 4}\\dfrac{x^2 - 16}{x - 4}$.",
              "choices": [
                "$8$",
                "$0$",
                "$16$",
                "The limit does not exist because the expression is $\\tfrac{0}{0}$ at $x=4$"
              ],
              "answer": 0,
              "explain": "Factor the top: $\\frac{(x-4)(x+4)}{x-4} = x+4$ for $x\\neq 4$, so the limit is $4+4=8$. The form $\\frac{0}{0}$ signals you must simplify, not that the limit fails to exist."
            },
            {
              "q": "A road points straight at a town, but the road has a permanent pothole exactly where the town sign sits, and the sign reads a different town's name. In limit terms, which feature determines $\\lim_{x\\to a} f(x)$?",
              "choices": [
                "The town named on the sign (the assigned value $f(a)$)",
                "The direction the road points (where the outputs are headed as $x\\to a$)",
                "Whether the pothole exists (whether $f$ is defined at $a$)",
                "All three must agree for the limit to be defined"
              ],
              "answer": 1,
              "explain": "The limit tracks the destination the trend points toward, i.e. where $f(x)$ heads as $x\\to a$. The sign's name ($f(a)$) and the pothole (whether $f(a)$ exists) do not affect the limit's value."
            },
            {
              "q": "The two-sided limit $\\lim_{x\\to a} f(x)$ exists if and only if:",
              "choices": [
                "$f(a)$ is defined",
                "$f$ is continuous at $a$",
                "$f$ is a polynomial",
                "the left-hand and right-hand limits both exist and are equal"
              ],
              "answer": 3,
              "explain": "A two-sided limit exists exactly when the function approaches the *same* value from both sides: $\\lim_{x\\to a^-}f = \\lim_{x\\to a^+}f$. It does not require $f(a)$ to be defined or $f$ to be continuous — those are separate, stronger conditions."
            },
            {
              "q": "What are $\\lim_{x\\to a} c$ (with $c$ a constant) and $\\lim_{x\\to a} x$?",
              "choices": [
                "$0$ and $0$",
                "$c$ and $a$",
                "$a$ and $c$",
                "both are undefined"
              ],
              "answer": 1,
              "explain": "A constant function stays at $c$, so its limit is $c$; the identity function approaches $a$ as $x\\to a$, so its limit is $a$. These two base limits, together with the limit laws, let you evaluate the limit of any polynomial by substitution."
            },
            {
              "q": "For a polynomial $p(x)$, $\\lim_{x\\to a} p(x)$ equals:",
              "choices": [
                "$0$",
                "$\\infty$",
                "$p(a)$ — just substitute",
                "undefined unless $a=0$"
              ],
              "answer": 2,
              "explain": "Polynomials are continuous everywhere, so their limits are found by direct substitution: $\\lim_{x\\to a} p(x) = p(a)$. This is *why* substitution is always the first thing to try; only when it yields an indeterminate form do you need more work."
            },
            {
              "q": "If $\\lim_{x\\to a} f(x) = L$ and $\\lim_{x\\to a} g(x) = M$, then $\\lim_{x\\to a}\\big(f(x)+g(x)\\big)$ equals:",
              "choices": [
                "$L \\cdot M$",
                "$\\max(L, M)$",
                "$L / M$",
                "$L + M$"
              ],
              "answer": 3,
              "explain": "By the sum law for limits, the limit of a sum is the sum of the limits: $L + M$ (when both exist). Analogous laws hold for differences, products ($LM$), and quotients ($L/M$, if $M\\neq 0$) — these are what make limit computation systematic."
            }
          ],
          "flashcards": [
            {
              "front": "State the if-and-only-if theorem linking one-sided and two-sided limits.",
              "back": "$\\lim_{x\\to a} f(x)=L$ exists iff both $\\lim_{x\\to a^-} f(x)=L$ and $\\lim_{x\\to a^+} f(x)=L$ (both one-sided limits exist AND are equal)."
            },
            {
              "front": "Does $\\lim_{x\\to a} f(x)$ depend on the value $f(a)$?",
              "back": "No. The limit describes the behavior of $f$ near $a$ with $x\\neq a$; $f(a)$ may be different, or undefined, with no effect on the limit."
            },
            {
              "front": "What are the three ways a limit can fail to exist?",
              "back": "(1) Jump: left and right limits differ. (2) Blow-up: outputs go to $\\pm\\infty$. (3) Oscillation: outputs never settle (e.g. $\\sin(1/x)$ near $0$)."
            },
            {
              "front": "Write the epsilon-delta definition of $\\lim_{x\\to a} f(x)=L$.",
              "back": "$\\forall \\varepsilon>0,\\ \\exists \\delta>0$ such that $0<|x-a|<\\delta \\Rightarrow |f(x)-L|<\\varepsilon$."
            },
            {
              "front": "You hit the indeterminate form $0/0$ when substituting. What does it signal and what do you do?",
              "back": "It signals a removable hole, not a dead end. Factor/cancel, rationalize, or use a known limit to reveal the value (e.g. $\\frac{x^2-1}{x-1}\\to 2$ via cancelling $x-1$)."
            },
            {
              "front": "What is $\\lim_{x\\to 0}\\frac{\\sin x}{x}$, and why is it notable?",
              "back": "It equals $1$. Notable because $\\frac{\\sin x}{x}$ is undefined at $0$ (it's $0/0$), yet the function has a clear destination there."
            }
          ],
          "homework": [
            {
              "prompt": "Let $f(x)=\\frac{\\sqrt{x+4}-2}{x}$. Evaluate $\\lim_{x\\to 0} f(x)$.",
              "hint": "Direct substitution gives $0/0$. Rationalize the numerator by multiplying top and bottom by the conjugate $\\sqrt{x+4}+2$.",
              "solution": "Multiply by the conjugate: $\\frac{\\sqrt{x+4}-2}{x}\\cdot\\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2}=\\frac{(x+4)-4}{x(\\sqrt{x+4}+2)}=\\frac{x}{x(\\sqrt{x+4}+2)}$. For $x\\neq0$ cancel $x$ to get $\\frac{1}{\\sqrt{x+4}+2}$. Now substitute $x=0$: $\\frac{1}{\\sqrt{4}+2}=\\frac{1}{2+2}=\\frac{1}{4}$. So $\\lim_{x\\to0} f(x)=\\frac14$."
            },
            {
              "prompt": "Define $h(x)=\\frac{|x-3|}{x-3}$. Find $\\lim_{x\\to 3^-} h(x)$ and $\\lim_{x\\to 3^+} h(x)$, then state whether $\\lim_{x\\to 3} h(x)$ exists.",
              "hint": "Recall $|x-3|=x-3$ when $x>3$ and $|x-3|=-(x-3)$ when $x<3$. Handle each side with the matching sign.",
              "solution": "For $x>3$: $|x-3|=x-3$, so $h(x)=\\frac{x-3}{x-3}=1$, giving $\\lim_{x\\to3^+}h(x)=1$. For $x<3$: $|x-3|=-(x-3)$, so $h(x)=\\frac{-(x-3)}{x-3}=-1$, giving $\\lim_{x\\to3^-}h(x)=-1$. The one-sided limits are $-1$ and $1$; they are unequal (a jump), so $\\lim_{x\\to3} h(x)$ does NOT exist."
            },
            {
              "prompt": "Using the $\\varepsilon$-$\\delta$ definition, prove that $\\lim_{x\\to 2}(3x+1)=7$. Explicitly produce a $\\delta$ in terms of $\\varepsilon$.",
              "hint": "Start from the goal $|(3x+1)-7|<\\varepsilon$, simplify the absolute value to a constant times $|x-2|$, then solve for $|x-2|$ to read off $\\delta$.",
              "solution": "Let $\\varepsilon>0$ be given. We need $|(3x+1)-7|<\\varepsilon$. Simplify: $|3x-6|=3|x-2|$. We want $3|x-2|<\\varepsilon$, i.e. $|x-2|<\\varepsilon/3$. Choose $\\delta=\\varepsilon/3$. Then whenever $0<|x-2|<\\delta$, we have $|(3x+1)-7|=3|x-2|<3\\delta=3\\cdot\\frac{\\varepsilon}{3}=\\varepsilon$. Since a valid $\\delta$ exists for every $\\varepsilon>0$, the definition is satisfied and $\\lim_{x\\to2}(3x+1)=7$."
            }
          ],
          "examples": [
            {
              "title": "Factor and cancel through a 0/0 form",
              "body": "Evaluate $\\displaystyle\\lim_{x \\to 4} \\frac{x^2 - 3x - 4}{x - 4}$. Begin by trying direct substitution, then resolve whatever you find.",
              "solution": "Step 1 — Try substitution. Plug in $x = 4$: the numerator is $4^2 - 3(4) - 4 = 16 - 12 - 4 = 0$, and the denominator is $4 - 4 = 0$. So we get the indeterminate form $\\frac{0}{0}$. This is not a dead end — it signals a removable hole, so we factor.\n\nStep 2 — Factor the numerator. We need two numbers that multiply to $-4$ and add to $-3$: those are $-4$ and $+1$. Thus\n$$x^2 - 3x - 4 = (x - 4)(x + 1).$$\n\nStep 3 — Cancel the common factor. For $x \\neq 4$ we have\n$$\\frac{x^2 - 3x - 4}{x - 4} = \\frac{(x - 4)(x + 1)}{x - 4} = x + 1.$$\nThe cancellation is legal precisely because the limit excludes $x = 4$, so the factor $x - 4$ is never actually zero along the way.\n\nStep 4 — Substitute into the simplified form. Since $\\frac{x^2 - 3x - 4}{x - 4}$ and $x + 1$ agree everywhere except at $x = 4$, they share the same limit there:\n$$\\lim_{x \\to 4} \\frac{x^2 - 3x - 4}{x - 4} = \\lim_{x \\to 4} (x + 1) = 4 + 1 = 5.$$\n\nAnswer: $\\displaystyle\\lim_{x \\to 4} \\frac{x^2 - 3x - 4}{x - 4} = 5$. The graph is the line $y = x + 1$ with a single point punched out at $(4, 5)$."
            },
            {
              "title": "Choosing a constant so a piecewise limit exists",
              "body": "Let $\\displaystyle f(x) = \\begin{cases} x^2 + c & x < 3 \\\\ 2x + 4 & x \\ge 3 \\end{cases}$ for some constant $c$. Find the value of $c$ that makes $\\lim_{x \\to 3} f(x)$ exist, and state the value of that limit.",
              "solution": "Step 1 — Recall the governing theorem. A two-sided limit exists if and only if both one-sided limits exist and are equal:\n$$\\lim_{x \\to 3} f(x) = L \\iff \\lim_{x \\to 3^-} f(x) = L \\ \\text{ and } \\ \\lim_{x \\to 3^+} f(x) = L.$$\nSo our job is to force the left and right limits to match.\n\nStep 2 — Compute the right-hand limit. For $x \\ge 3$ the rule is $f(x) = 2x + 4$, a polynomial, so substitute directly:\n$$\\lim_{x \\to 3^+} f(x) = 2(3) + 4 = 10.$$\n\nStep 3 — Compute the left-hand limit. For $x < 3$ the rule is $f(x) = x^2 + c$, also a polynomial, so substitute:\n$$\\lim_{x \\to 3^-} f(x) = 3^2 + c = 9 + c.$$\n\nStep 4 — Set the two sides equal. For the limit to exist we need the left and right values to agree:\n$$9 + c = 10 \\quad\\Longrightarrow\\quad c = 1.$$\n\nStep 5 — State the limit. With $c = 1$, both one-sided limits equal $10$, so\n$$\\lim_{x \\to 3} f(x) = 10.$$\nNote that the function value $f(3) = 2(3) + 4 = 10$ also matches here, so this choice of $c$ in fact makes $f$ continuous at $3$. For any other value of $c$ the sides would jump apart and the limit would fail to exist.\n\nAnswer: $c = 1$, and then $\\displaystyle\\lim_{x \\to 3} f(x) = 10$."
            },
            {
              "title": "The squeeze theorem: trapping a wild function",
              "body": "Evaluate $\\lim_{x \\to 0} x^2 \\sin\\!\\left(\\tfrac{1}{x}\\right)$ — even though $\\sin(1/x)$ oscillates infinitely fast near 0.",
              "solution": "<strong>Bounded times tiny.</strong> Direct substitution fails: $\\sin(1/x)$ has no limit at 0 (it oscillates between $-1$ and $1$ forever). But it is <em>bounded</em>: $-1 \\le \\sin(1/x) \\le 1$ for all $x \\ne 0$.\n<strong>Squeeze it.</strong> Multiplying that bound by $x^2 \\ge 0$ preserves the inequalities: $-x^2 \\le x^2\\sin(1/x) \\le x^2$. As $x \\to 0$, both the lower bound $-x^2$ and the upper bound $x^2$ go to $0$, trapping the function between two things heading to the same place:\n$$\\lim_{x \\to 0} x^2 \\sin\\!\\left(\\tfrac{1}{x}\\right) = 0.$$\n<strong>Why it works.</strong> The <b>squeeze (sandwich) theorem</b>: if $g(x) \\le f(x) \\le h(x)$ near $a$ and $g, h \\to L$, then $f \\to L$ — you never evaluate $f$ directly, only bound it between two functions that agree in the limit.\n<strong>The aha.</strong> A limit does not require the function to be tame — only to be <em>trapped</em>. Squeeze converts \"I can't evaluate this\" into \"I can bound this,\" which is exactly how $\\lim_{x\\to 0}\\tfrac{\\sin x}{x} = 1$ and many other stubborn limits are pinned down."
            }
          ]
        },
        {
          "id": "c-computing-limits",
          "title": "Computing Limits & Indeterminate Forms",
          "minutes": 16,
          "content": "<h3>Why \"plug in the number\" sometimes fails</h3>\n<p>If a function is continuous at a point, computing a limit is trivial: $\\lim_{x \\to a} f(x) = f(a)$. You just substitute. The entire art of <em>computing</em> limits is about the cases where substitution breaks — where you get nonsense like $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$. These are called <strong>indeterminate forms</strong>, and the whole game is learning the algebraic moves that resolve them.</p>\n\n<p>Here is the key mental model. The limit $\\lim_{x\\to a} f(x)$ asks: as $x$ approaches $a$ (but is never equal to $a$), what value does $f(x)$ get arbitrarily close to? Because $x \\ne a$ along the way, we are allowed to rewrite $f$ using any algebra that holds <em>except possibly at the single point $a$ itself</em>. That single-point freedom is what makes cancellation legal.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A limit ignores the value at the destination and only cares about the journey. Two functions that agree everywhere except at $x=a$ have the <em>same</em> limit at $a$ — even if one of them is undefined there. This is precisely why we can cancel a factor of $(x-a)$ that produces $0/0$.</p>\n</div>\n\n<h3>The limit laws (your algebraic toolkit)</h3>\n<p>Suppose $\\lim_{x\\to a} f(x) = L$ and $\\lim_{x\\to a} g(x) = M$, both finite. Then:</p>\n<ul>\n<li><strong>Sum/difference:</strong> $\\lim (f \\pm g) = L \\pm M$</li>\n<li><strong>Product:</strong> $\\lim (f \\cdot g) = L \\cdot M$</li>\n<li><strong>Quotient:</strong> $\\lim \\frac{f}{g} = \\frac{L}{M}$, provided $M \\ne 0$</li>\n<li><strong>Constant multiple:</strong> $\\lim (c \\cdot f) = c L$</li>\n<li><strong>Power/root:</strong> $\\lim [f(x)]^n = L^n$, and $\\lim \\sqrt[n]{f(x)} = \\sqrt[n]{L}$ (for $L \\ge 0$ when $n$ is even)</li>\n<li><strong>Composition:</strong> if $g$ is continuous at $L$, then $\\lim_{x\\to a} g(f(x)) = g(L)$</li>\n</ul>\n<p>These laws are the reason substitution works for \"nice\" functions: polynomials, and rational functions <em>where the denominator is nonzero</em>, are built entirely from sums, products, and quotients, so the limit equals the value. The laws only stall when a denominator limit $M = 0$. That is the doorway to indeterminate forms.</p>\n\n<h3>Recognizing indeterminate forms</h3>\n<div data-viz=\"calc-limit-epsilon\"></div>\n<p>An <strong>indeterminate form</strong> is a symbolic pattern whose value is <em>not determined</em> by the pattern alone — the answer depends on the specific functions involved. The seven classic forms are:</p>\n$$\\frac{0}{0}, \\quad \\frac{\\infty}{\\infty}, \\quad 0 \\cdot \\infty, \\quad \\infty - \\infty, \\quad 0^0, \\quad \\infty^0, \\quad 1^\\infty.$$\n<p>Crucially, <strong>not every expression with a $0$ or $\\infty$ is indeterminate.</strong> Contrast these:</p>\n<ul>\n<li>$\\frac{0}{0}$ is indeterminate — could be anything. $\\lim_{x\\to 0}\\frac{2x}{x}=2$, but $\\lim_{x\\to 0}\\frac{x^2}{x}=0$, and $\\lim_{x\\to 0}\\frac{x}{x^3}=\\infty$. Same form, different answers.</li>\n<li>$\\frac{5}{0}$ (nonzero over zero) is <strong>not</strong> indeterminate — it blows up to $\\pm\\infty$ (check the sign from each side).</li>\n<li>$\\frac{0}{5}$ is just $0$. $\\frac{\\infty}{5}$ is $\\infty$. $5^\\infty = \\infty$, $5^{-\\infty}=0$. All determinate.</li>\n</ul>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Indeterminate forms are not academic. In machine learning you constantly compute things like the cross-entropy term $p \\log p$ as $p \\to 0^+$ (a $0\\cdot(-\\infty)$ form, which limits to $0$), or normalize by a denominator that can vanish. The softmax uses the \"log-sum-exp\" trick precisely to avoid $\\frac{\\infty}{\\infty}$ overflow. Knowing which forms are genuinely indeterminate — and how they resolve — is exactly what keeps a loss function from returning <code>NaN</code>.</p>\n</div>\n\n<h3>Technique 1 — Factoring (the $0/0$ workhorse)</h3>\n<p>When a rational function gives $0/0$ at $x=a$, both numerator and denominator have a root at $a$, so both contain a factor of $(x-a)$. Factor it out, cancel, then substitute.</p>\n$$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = \\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x-3} = \\lim_{x \\to 3} (x+3) = 6.$$\n<p>The cancellation is legal because for all $x \\ne 3$ the two expressions are identical, and the limit only sees $x \\ne 3$.</p>\n<p>Trust, then verify: the factored answer should equal what the raw $0/0$ expression creeps toward. Check it numerically for $\\lim_{x\\to 2}\\frac{x^2-4}{x-2}$, which factors to $x+2 \\to 4$:</p>\n<div data-code=\"javascript\" data-expected=\"x=2.01: 4.010, x=2.001: 4.001\">// (x^2 - 4)/(x - 2) is 0/0 right at x=2, but nearby values close in on the factored answer, 4.\nfunction f(x) {\n  return (x * x - 4) / (x - 2);\n}\nconsole.log(\"x=2.01: \" + f(2.01).toFixed(3) + \", x=2.001: \" + f(2.001).toFixed(3));</div>\n\n<h3>Technique 2 — Rationalizing with conjugates</h3>\n<p>When square roots create a $0/0$, multiply by the conjugate to turn a difference of roots into a difference of squares, which then factors and cancels.</p>\n$$\\lim_{x\\to 0}\\frac{\\sqrt{x+4}-2}{x} = \\lim_{x\\to 0}\\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)} = \\lim_{x\\to 0}\\frac{(x+4)-4}{x(\\sqrt{x+4}+2)} = \\lim_{x\\to 0}\\frac{x}{x(\\sqrt{x+4}+2)}.$$\n<p>Cancel the $x$, then substitute:</p>\n$$= \\lim_{x\\to 0}\\frac{1}{\\sqrt{x+4}+2} = \\frac{1}{\\sqrt{4}+2} = \\frac{1}{4}.$$\n\n<h3>A fully worked example combining ideas</h3>\n<p>Evaluate $\\displaystyle \\lim_{x\\to 1}\\frac{x-1}{\\sqrt{x}-1}$.</p>\n<p><strong>Step 0 — classify.</strong> Substituting $x=1$ gives $\\frac{0}{0}$: indeterminate, so work is required.</p>\n<p><strong>Step 1 — pick a tool.</strong> A root in the denominator suggests rationalizing. Multiply by the conjugate $\\sqrt{x}+1$:</p>\n$$\\frac{x-1}{\\sqrt{x}-1}\\cdot\\frac{\\sqrt{x}+1}{\\sqrt{x}+1} = \\frac{(x-1)(\\sqrt{x}+1)}{(\\sqrt{x})^2 - 1^2} = \\frac{(x-1)(\\sqrt{x}+1)}{x-1}.$$\n<p><strong>Step 2 — cancel.</strong> For $x \\ne 1$, $(x-1)$ cancels:</p>\n$$= \\sqrt{x}+1.$$\n<p><strong>Step 3 — substitute.</strong> Now the expression is continuous at $x=1$:</p>\n$$\\lim_{x\\to 1}(\\sqrt{x}+1) = \\sqrt{1}+1 = 2.$$\n<p>Notice we could also have factored $x - 1 = (\\sqrt{x}-1)(\\sqrt{x}+1)$ directly — different route, same answer. Most $0/0$ limits have more than one valid path.</p>\n\n<h3>The Squeeze Theorem</h3>\n<p>Some functions oscillate or are too tangled to manipulate directly. The <strong>Squeeze Theorem</strong> (a.k.a. Sandwich Theorem) lets you trap them.</p>\n<p><strong>Statement.</strong> If $g(x) \\le f(x) \\le h(x)$ for all $x$ near $a$ (except possibly at $a$), and</p>\n$$\\lim_{x\\to a} g(x) = \\lim_{x\\to a} h(x) = L,$$\n<p>then $\\lim_{x\\to a} f(x) = L$ as well. The middle function has nowhere to go.</p>\n<p>A canonical use: $\\lim_{x\\to 0} x^2 \\sin(1/x)$. Since $-1 \\le \\sin(1/x) \\le 1$, we have $-x^2 \\le x^2\\sin(1/x) \\le x^2$. Both bounds go to $0$, so the limit is $0$ — even though $\\sin(1/x)$ itself has no limit at $0$.</p>\n\n<h4>The flagship: $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$</h4>\n<p>This $0/0$ limit cannot be done by factoring; it is the foundation of differential calculus for trig functions. The classic proof uses a geometric squeeze. For $0 < x < \\pi/2$, comparing the areas of a triangle, a circular sector, and a larger triangle inside a unit circle gives</p>\n$$\\sin x \\le x \\le \\tan x.$$\n<p>Divide through by $\\sin x > 0$:</p>\n$$1 \\le \\frac{x}{\\sin x} \\le \\frac{1}{\\cos x} \\quad\\Longrightarrow\\quad \\cos x \\le \\frac{\\sin x}{x} \\le 1.$$\n<p>As $x\\to 0^+$, $\\cos x \\to 1$ and the constant $1$ stays $1$, so the squeeze forces $\\frac{\\sin x}{x} \\to 1$. Because $\\frac{\\sin x}{x}$ is even, the same holds from the left. Hence the limit is $1$.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>$\\frac{\\sin x}{x}\\to 1$ is the statement that $\\sin x \\approx x$ for small $x$ — the first-order Taylor approximation. This \"small-angle\" linearization is the same idea behind gradient descent (a function looks linear up close) and behind activation-function behavior near zero. Many deep linear approximations in ML are just this limit wearing different clothes.</p>\n</div>\n\n<h3>Limits at infinity</h3>\n<p>Now $x$ grows without bound and we ask what $f(x)$ settles toward — this describes <strong>horizontal asymptotes</strong> and the end-behavior of a model. For rational functions the trick is to <strong>divide numerator and denominator by the highest power of $x$ in the denominator.</strong></p>\n$$\\lim_{x\\to\\infty}\\frac{3x^2 - 5x + 1}{2x^2 + 7} = \\lim_{x\\to\\infty}\\frac{3 - 5/x + 1/x^2}{2 + 7/x^2} = \\frac{3 - 0 + 0}{2 + 0} = \\frac{3}{2}.$$\n<p>The shortcut for rational functions of degrees $p$ (top) and $q$ (bottom):</p>\n<ul>\n<li>$p < q$: limit is $0$ (denominator wins).</li>\n<li>$p = q$: limit is the ratio of leading coefficients.</li>\n<li>$p > q$: limit is $\\pm\\infty$ (numerator wins; check sign).</li>\n</ul>\n<p>Be careful with roots and signs. $\\sqrt{x^2} = |x|$, which equals $-x$ when $x \\to -\\infty$. For example $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{x} = -1$, not $+1$, because $\\sqrt{x^2+1}\\approx |x| = -x$ for large negative $x$.</p>\n\n<h3>A decision procedure</h3>\n<ol>\n<li><strong>Substitute first.</strong> If you get a finite number, you're done — the function was continuous there.</li>\n<li><strong>If you get nonzero / 0,</strong> it's $\\pm\\infty$ (a vertical asymptote); determine the sign from each side. Not indeterminate.</li>\n<li><strong>If you get $0/0$ or $\\infty/\\infty$,</strong> it's indeterminate — deploy a technique: factor, rationalize, divide by highest power, or squeeze.</li>\n<li><strong>For $0\\cdot\\infty$ or $\\infty-\\infty$,</strong> rewrite algebraically (common denominator, or convert a product to a quotient) into $0/0$ or $\\infty/\\infty$ first.</li>\n</ol>\n<p>(L'Hôpital's rule is the calculus-powered shortcut for $0/0$ and $\\infty/\\infty$, but it requires derivatives — we'll meet it after the derivative chapter. Everything above is purely algebraic and works without it.)</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: indeterminate forms aren't answers — they're questions</summary>\n<p>When direct substitution gives $0/0$, $\\infty - \\infty$, or $\\infty/\\infty$, the limit is not \"undefined\" — these are <b>indeterminate forms</b>, and the name is precise: the form alone does not determine the answer.</p>\n<p>Compare three $0/0$ limits as $x \\to 0$: $\\frac{x}{x} \\to 1$, $\\frac{x^2}{x} \\to 0$, and $\\frac{x}{x^2} \\to \\infty$. All three read as \"$0/0$\" by substitution, yet they converge to 1, 0, and $\\infty$. The form is identical; the answers differ — because what matters is the <em>rate</em> at which numerator and denominator approach zero. The algebra of limits (factor-and-cancel, rationalize, L'Hôpital) is all machinery for exposing that rate.</p>\n<p>The \"aha\": an indeterminate form is a signal to do more work, not a verdict. It says \"the naive substitution lost the information — dig into how fast each part goes to its limit.\" Determinate forms (like $3/7$, or $5/0 \\to \\infty$) you can read off; indeterminate ones you must resolve.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the toolkit for resolving indeterminate forms</summary>\n<p>An indeterminate form like $\\tfrac{0}{0}$ or $\\tfrac{\\infty}{\\infty}$ is a <em>question</em>, not an answer — and there is a small toolkit of algebraic moves that answers it.</p>\n<p><b>Factor and cancel.</b> A $\\tfrac{0}{0}$ from a shared root means a removable factor. $\\lim_{x\\to 1}\\tfrac{x^2-1}{x-1} = \\lim_{x\\to 1}\\tfrac{(x-1)(x+1)}{x-1} = \\lim_{x\\to 1}(x+1) = 2$ — cancel the offending $(x-1)$ and evaluate.</p>\n<p><b>Rationalize.</b> For roots, multiply by the conjugate: $\\tfrac{\\sqrt{x}-2}{x-4}\\cdot\\tfrac{\\sqrt{x}+2}{\\sqrt{x}+2}$ turns the numerator into $x-4$, which cancels.</p>\n<p><b>Divide by the highest power.</b> For $\\tfrac{\\infty}{\\infty}$ as $x\\to\\infty$, divide top and bottom by the dominant term: $\\tfrac{3x^2+x}{2x^2-5} \\to \\tfrac{3}{2}$ (the lower-order terms vanish).</p>\n<p><b>Squeeze.</b> When direct algebra fails, trap the function between two others with the same limit: since $-x^2 \\le x^2\\sin\\tfrac1x \\le x^2$ and both bounds go to $0$, so does the middle.</p>\n<p>The \"aha\": \"indeterminate\" means \"the form alone does not decide — do more work.\" Factoring, rationalizing, dividing by the dominant term, and squeezing are the standard ways to extract the true limit (and L'Hôpital is the calculus-powered shortcut when those stall).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the squeeze theorem</summary>\n<p>Some limits resist every algebraic trick (the toolkit from the other dive) because the function <em>oscillates</em> or is otherwise untouchable head-on. The <strong>squeeze theorem</strong> (the sandwich theorem) cracks them by trapping the function between two others.</p>\n<p><b>The idea.</b> If $g(x)\\le f(x)\\le h(x)$ near a point, and $g$ and $h$ both head to the same limit $L$ there, then $f$ is <em>forced</em> to $L$ too — it has nowhere else to go. You evaluate a hard limit by bounding it above and below with easy ones that pinch together.</p>\n<p><b>The classic.</b> $\\lim_{x\\to 0}x^2\\sin(\\tfrac{1}{x})$: the $\\sin$ wiggles infinitely fast and has no limit on its own, but it stays in $[-1,1]$, so $-x^2\\le x^2\\sin(\\tfrac{1}{x})\\le x^2$. Both bounds go to $0$, so the squeezed function does too. The squeeze theorem is also how one rigorously proves $\\lim_{x\\to 0}\\tfrac{\\sin x}{x}=1$ — the limit that makes the derivative of $\\sin$ equal $\\cos$ in the first place.</p>\n<p>The \"aha\": when you cannot evaluate a limit head-on, <em>trap</em> it — bound $f$ between two functions that converge to the same value and $f$ is squeezed to it. It is the standard tool for oscillating functions and the foundation under $\\sin x / x \\to 1$.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Which of the following is NOT an indeterminate form?",
              "choices": [
                "$\\frac{0}{0}$",
                "$\\frac{5}{0}$",
                "$\\infty - \\infty$",
                "$1^\\infty$"
              ],
              "answer": 1,
              "explain": "A nonzero constant over zero is not indeterminate — it diverges to $\\pm\\infty$ (sign depends on the side). The other three genuinely depend on the specific functions and can equal different values."
            },
            {
              "q": "Evaluate $\\lim_{x\\to\\infty}\\dfrac{4x^3 - x}{2x^3 + 100x^2}$.",
              "choices": [
                "$0$",
                "$\\infty$",
                "$2$",
                "$\\frac{1}{50}$"
              ],
              "answer": 2,
              "explain": "Numerator and denominator have equal degree (3), so the limit is the ratio of leading coefficients $4/2 = 2$. The lower-degree terms vanish after dividing by $x^3$."
            },
            {
              "q": "To apply the Squeeze Theorem to show $\\lim_{x\\to 0} x^2\\sin(1/x) = 0$, which bounds do you use?",
              "choices": [
                "$0 \\le x^2\\sin(1/x) \\le x^2$",
                "$-1 \\le x^2\\sin(1/x) \\le 1$",
                "$-x^2 \\le x^2\\sin(1/x) \\le x^2$",
                "$-x \\le x^2\\sin(1/x) \\le x$"
              ],
              "answer": 2,
              "explain": "Since $-1 \\le \\sin(1/x) \\le 1$, multiplying by $x^2 \\ge 0$ gives $-x^2 \\le x^2\\sin(1/x) \\le x^2$. Both bounds tend to $0$, so the middle does too."
            },
            {
              "q": "Why is canceling the $(x-3)$ factor legal in $\\lim_{x\\to 3}\\frac{(x-3)(x+3)}{x-3}$?",
              "choices": [
                "Because $x-3$ equals zero at $x=3$, so it can be removed",
                "Because the limit only considers $x \\ne 3$, where the two expressions are identical",
                "Because limit laws always permit canceling common factors",
                "Because the function is continuous at $x=3$"
              ],
              "answer": 1,
              "explain": "A limit ignores the value at the destination; for all $x \\ne 3$ the simplified and original expressions agree, so they share the same limit even though the original is undefined at $3$."
            },
            {
              "q": "Evaluate $\\lim_{x\\to 4} \\dfrac{\\sqrt{x} - 2}{x - 4}$.",
              "choices": [
                "$\\dfrac{1}{4}$",
                "$0$",
                "$\\dfrac{1}{2}$",
                "The limit does not exist"
              ],
              "answer": 0,
              "explain": "This is a $0/0$ form. Multiply numerator and denominator by the conjugate $\\sqrt{x}+2$: $\\frac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}=\\frac{x-4}{(x-4)(\\sqrt{x}+2)}=\\frac{1}{\\sqrt{x}+2}$, which at $x=4$ gives $\\frac{1}{2+2}=\\frac{1}{4}$."
            },
            {
              "q": "Which of the following limits is a genuine $\\infty - \\infty$ indeterminate form?",
              "choices": [
                "$\\lim_{x\\to\\infty}\\left(x - \\dfrac{1}{x}\\right)$",
                "$\\lim_{x\\to 0^+}\\left(\\dfrac{1}{x} - \\dfrac{1}{x^2}\\right)$",
                "$\\lim_{x\\to\\infty}(x + x^2)$",
                "$\\lim_{x\\to 0}\\left(\\dfrac{1}{x} - 5\\right)$"
              ],
              "answer": 1,
              "explain": "As $x\\to 0^+$ both $\\frac{1}{x}$ and $\\frac{1}{x^2}$ tend to $+\\infty$, so option 0 is the genuine $\\infty-\\infty$ pattern (it resolves to $-\\infty$ after combining). In option 1 the subtracted $\\frac{1}{x}\\to 0$ giving $\\infty-0$; option 2 is $\\infty+\\infty$, not a difference; option 3 is $\\infty-5$ with a finite term."
            },
            {
              "q": "A student computes $\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}$ by canceling to get $\\lim_{x\\to 2}(x+2)=4$. Why does this give the correct limit even though $\\dfrac{x^2-4}{x-2}$ is undefined at $x=2$?",
              "choices": [
                "Because $x^2-4$ is continuous, so direct substitution into the original quotient is automatically valid",
                "Because $\\frac{0}{0}$ always equals the simplified expression evaluated at the point",
                "Because dividing by zero is permitted as long as it happens inside a limit",
                "Because $\\frac{x^2-4}{x-2}$ and $x+2$ agree at every point except $x=2$, and a limit depends only on nearby values, not the value at the point itself"
              ],
              "answer": 3,
              "explain": "For $x\\ne 2$ the factor $x-2$ is nonzero, so $\\frac{x^2-4}{x-2}=x+2$ on the punctured neighborhood. Two functions that agree everywhere except at the target point share the same limit there, since a limit never uses the value at $x=2$ itself."
            },
            {
              "q": "Which expression below has a value fully determined by its form (i.e., it is NOT an indeterminate form)?",
              "choices": [
                "$\\dfrac{7}{0^+}$ (a nonzero constant divided by a quantity approaching $0$ from above)",
                "$1^{\\infty}$",
                "$0^0$",
                "$0\\cdot\\infty$"
              ],
              "answer": 0,
              "explain": "A nonzero constant over a quantity shrinking to $0^+$ is forced to $+\\infty$, so its value is determined by the form alone. In contrast, $1^{\\infty}$, $0^0$, and $0\\cdot\\infty$ are classic indeterminate forms whose values depend on the specific functions involved."
            },
            {
              "q": "A student writes: \"Since $\\lim_{x\\to 0}\\dfrac{\\sin x}{x}$ gives $\\frac{0}{0}$, the limit does not exist.\" What is wrong with this reasoning?",
              "choices": [
                "Nothing is wrong; $\\frac{0}{0}$ always means the limit fails to exist",
                "The student should have plugged in $x=0$ to get $\\sin(0)=0$, so the limit is undefined",
                "The limit is actually $0$ because the numerator is $0$",
                "The form $\\frac{0}{0}$ is indeterminate, meaning the limit's value is not determined by the form alone and could still exist (here it equals $1$)"
              ],
              "answer": 3,
              "explain": "$\\frac{0}{0}$ is indeterminate: it signals that substitution failed, not that the limit fails to exist. In fact $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$, so concluding nonexistence from the form is the core misconception."
            },
            {
              "q": "Evaluate $\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + 6x} - x\\right)$.",
              "choices": [
                "$0$",
                "$\\infty$",
                "$6$",
                "$3$"
              ],
              "answer": 3,
              "explain": "Multiply by the conjugate: $\\frac{(x^2+6x)-x^2}{\\sqrt{x^2+6x}+x}=\\frac{6x}{\\sqrt{x^2+6x}+x}$. Dividing top and bottom by $x$ gives $\\frac{6}{\\sqrt{1+6/x}+1}\\to\\frac{6}{2}=3$. The tempting $0$ wrongly assumes $\\sqrt{x^2+6x}\\approx x$ exactly."
            },
            {
              "q": "Consider $f(x)=\\dfrac{x-5}{|x-5|}$. What can you say about $\\lim_{x\\to 5} f(x)$?",
              "choices": [
                "It equals $1$",
                "It equals $0$",
                "It does not exist, because the left-hand limit is $-1$ and the right-hand limit is $1$",
                "It equals $-1$"
              ],
              "answer": 2,
              "explain": "For $x>5$, $f(x)=\\frac{x-5}{x-5}=1$; for $x<5$, $f(x)=\\frac{x-5}{-(x-5)}=-1$. Since the one-sided limits disagree, the two-sided limit does not exist — this is not a $0/0$ cancellation situation."
            },
            {
              "q": "You want to compute $\\lim_{x\\to 1}\\dfrac{x^2 - 1}{x^2 - 3x + 2}$. Which first step correctly sets up the cancellation?",
              "choices": [
                "Plug in $x=1$ directly to get $\\frac{0}{0}=1$",
                "Factor to $\\dfrac{(x-1)(x+1)}{(x-1)(x-2)}$, cancel $(x-1)$, then substitute to get $-2$",
                "Factor to $\\dfrac{(x-1)(x+1)}{(x-1)(x-2)}$, cancel $(x-1)$, then substitute to get $2$",
                "Conclude the limit is $\\infty$ because the denominator approaches $0$"
              ],
              "answer": 1,
              "explain": "Both factor as $(x-1)(x+1)$ and $(x-1)(x-2)$; canceling the common $(x-1)$ leaves $\\frac{x+1}{x-2}$, which at $x=1$ gives $\\frac{2}{-1}=-2$. The distractor $2$ comes from forgetting the sign of $(x-2)=-1$ at $x=1$."
            },
            {
              "q": "When computing a limit $\\lim_{x\\to a} f(x)$, what should you always try first?",
              "choices": [
                "direct substitution — plug in $x=a$",
                "the Squeeze Theorem",
                "factoring the denominator",
                "L'Hôpital's rule"
              ],
              "answer": 0,
              "explain": "Always substitute $x=a$ first. If it gives a definite value (and $f$ is continuous there), that *is* the limit. Only when substitution produces an *indeterminate* form like $\\tfrac00$ do you reach for algebra (factoring, rationalizing), the Squeeze Theorem, or L'Hôpital."
            },
            {
              "q": "What is $\\lim_{x\\to\\infty}\\dfrac{1}{x}$?",
              "choices": [
                "$1$",
                "$\\infty$",
                "$0$",
                "undefined"
              ],
              "answer": 2,
              "explain": "As $x$ grows without bound, $1/x$ shrinks toward $0$ (never negative, never quite reaching $0$). This basic fact drives limits at infinity of rational functions: divide through by the highest power of $x$ and every $1/x^k$ term vanishes."
            },
            {
              "q": "To find $\\lim_{x\\to\\infty}$ of a rational function (a polynomial over a polynomial), you compare:",
              "choices": [
                "the degrees of the numerator and denominator (the leading terms dominate)",
                "the constant terms",
                "the number of terms in each",
                "the values at $x=0$"
              ],
              "answer": 0,
              "explain": "At infinity the highest-degree terms dominate. Equal degrees ⟹ the limit is the ratio of leading coefficients; numerator degree smaller ⟹ the limit is $0$; numerator degree larger ⟹ it diverges to $\\pm\\infty$. The lower-order terms become negligible."
            },
            {
              "q": "If $\\lim_{x\\to a} f(x) = +\\infty$, the correct statement is that the limit:",
              "choices": [
                "equals a very large finite number",
                "is an indeterminate form",
                "equals $0$",
                "does not exist as a finite value — $f$ diverges to $+\\infty$"
              ],
              "answer": 3,
              "explain": "$+\\infty$ is not a real number, so strictly the limit *does not exist* (it isn't finite); writing $=+\\infty$ is shorthand for *how* it fails — $f$ grows without bound near $a$. This differs from an indeterminate form, which is an *expression* whose value isn't fixed by its form."
            }
          ],
          "flashcards": [
            {
              "front": "List the seven classic indeterminate forms.",
              "back": "$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $0\\cdot\\infty$, $\\infty-\\infty$, $0^0$, $\\infty^0$, $1^\\infty$."
            },
            {
              "front": "What is $\\lim_{x\\to 0}\\frac{\\sin x}{x}$, and how is it proven?",
              "back": "It equals $1$. Proven by the Squeeze Theorem from the geometric inequality $\\cos x \\le \\frac{\\sin x}{x} \\le 1$, since $\\cos x \\to 1$."
            },
            {
              "front": "Limit at infinity of a rational function with top degree $p$, bottom degree $q$?",
              "back": "$p<q$: limit $0$. $p=q$: ratio of leading coefficients. $p>q$: $\\pm\\infty$."
            },
            {
              "front": "State the Squeeze Theorem.",
              "back": "If $g(x)\\le f(x)\\le h(x)$ near $a$ and $\\lim_{x\\to a}g = \\lim_{x\\to a}h = L$, then $\\lim_{x\\to a}f = L$."
            },
            {
              "front": "Which technique resolves a $0/0$ limit containing a square root?",
              "back": "Multiply by the conjugate to convert a difference of roots into a difference of squares, then factor and cancel."
            },
            {
              "front": "Is $\\frac{5}{0}$ an indeterminate form?",
              "back": "No. Nonzero over zero diverges to $\\pm\\infty$ (check the sign from each side). Only $\\frac{0}{0}$ is the indeterminate quotient form."
            }
          ],
          "homework": [
            {
              "prompt": "Evaluate $\\displaystyle\\lim_{x\\to 2}\\frac{x^2 - x - 2}{x^2 - 4}$.",
              "hint": "Substituting gives $0/0$. Factor both the numerator and the denominator; they share a common factor.",
              "solution": "Numerator: $x^2 - x - 2 = (x-2)(x+1)$. Denominator: $x^2 - 4 = (x-2)(x+2)$. Cancel $(x-2)$ (valid for $x\\ne 2$): $\\frac{x+1}{x+2}$. Substitute $x=2$: $\\frac{3}{4}$."
            },
            {
              "prompt": "Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + x} - x\\right)$ and identify which indeterminate form it starts as.",
              "hint": "This is an $\\infty - \\infty$ form. Multiply and divide by the conjugate $\\sqrt{x^2+x}+x$, then divide through by $x$ (for $x>0$, $\\sqrt{x^2}=x$).",
              "solution": "It is $\\infty-\\infty$. Multiply by the conjugate: $\\frac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x} = \\frac{(x^2+x)-x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}$. Divide numerator and denominator by $x$ (using $\\sqrt{x^2+x}=x\\sqrt{1+1/x}$ for $x>0$): $\\frac{1}{\\sqrt{1+1/x}+1}$. As $x\\to\\infty$, $1/x\\to 0$, giving $\\frac{1}{\\sqrt{1}+1} = \\frac{1}{2}$."
            },
            {
              "prompt": "Use the Squeeze Theorem to evaluate $\\displaystyle\\lim_{x\\to 0} x\\cos\\!\\left(\\frac{1}{x}\\right)$.",
              "hint": "The cosine factor is bounded between $-1$ and $1$ no matter how wildly it oscillates. Bound the whole expression using $|x|$.",
              "solution": "Since $-1 \\le \\cos(1/x) \\le 1$ for all $x \\ne 0$, multiplying by $x$ gives the bound $-|x| \\le x\\cos(1/x) \\le |x|$. As $x\\to 0$, both $-|x|\\to 0$ and $|x|\\to 0$. By the Squeeze Theorem the trapped function satisfies $\\lim_{x\\to 0} x\\cos(1/x) = 0$."
            }
          ],
          "examples": [
            {
              "title": "Resolving 0/0 by Factoring and Canceling",
              "body": "Compute $\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$.",
              "solution": "First, try direct substitution to see what happens. Plugging in $x = 3$ gives $$\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0},$$ which is an indeterminate form. Substitution fails, so we need an algebraic move.\n\nThe numerator factors as a difference of squares: $x^2 - 9 = (x-3)(x+3)$. So for $x \\ne 3$,\n$$\\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3.$$\n\nThe cancellation of $(x-3)$ is legal because a limit only cares about values near $x = 3$, never at $x = 3$ itself. The original function and $x + 3$ agree everywhere except at the single point $x = 3$, so they share the same limit there.\n\nNow the new expression $x + 3$ is a polynomial (continuous everywhere), so we substitute:\n$$\\lim_{x \\to 3} (x + 3) = 3 + 3 = 6.$$\n\nThe limit is $\\boxed{6}$."
            },
            {
              "title": "A 0/0 Form with a Square Root: Rationalizing",
              "body": "Compute $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x}$.",
              "solution": "Try direct substitution first. At $x = 0$,\n$$\\frac{\\sqrt{0 + 4} - 2}{0} = \\frac{\\sqrt{4} - 2}{0} = \\frac{2 - 2}{0} = \\frac{0}{0},$$\nan indeterminate form. Factoring won't help here because of the square root, so we use a different tool: multiply by the conjugate.\n\nMultiply numerator and denominator by the conjugate of the numerator, $\\sqrt{x+4} + 2$:\n$$\\frac{\\sqrt{x+4} - 2}{x} \\cdot \\frac{\\sqrt{x+4} + 2}{\\sqrt{x+4} + 2} = \\frac{(\\sqrt{x+4})^2 - 2^2}{x\\left(\\sqrt{x+4} + 2\\right)}.$$\n\nThe numerator simplifies using $(a-b)(a+b) = a^2 - b^2$:\n$$(\\sqrt{x+4})^2 - 2^2 = (x + 4) - 4 = x.$$\n\nSo the expression becomes, for $x \\ne 0$,\n$$\\frac{x}{x\\left(\\sqrt{x+4} + 2\\right)} = \\frac{1}{\\sqrt{x+4} + 2}.$$\n\nWe canceled the factor of $x$ that was causing the $0/0$ — legal because $x \\ne 0$ along the way to the limit. The remaining expression is continuous at $x = 0$, so substitute:\n$$\\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4} + 2} = \\frac{1}{\\sqrt{4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}.$$\n\nThe limit is $\\boxed{\\dfrac{1}{4}}$."
            },
            {
              "title": "Limits at infinity: divide by the highest power",
              "body": "What is $\\lim_{x \\to \\infty} \\frac{3x^2 + 2x}{x^2 - 5}$? You can't just plug in $\\infty$ — it is an $\\infty/\\infty$ form.",
              "solution": "<strong>Divide top and bottom by the highest power</strong> of $x$ in the denominator, here $x^2$:\n$$\\frac{3x^2 + 2x}{x^2 - 5} = \\frac{3 + \\frac{2}{x}}{1 - \\frac{5}{x^2}}.$$\n<strong>Let $x \\to \\infty$.</strong> Every term with $x$ in a denominator vanishes — $\\frac{2}{x} \\to 0$ and $\\frac{5}{x^2} \\to 0$ — leaving\n$$\\lim_{x \\to \\infty} \\frac{3x^2 + 2x}{x^2 - 5} = \\frac{3 + 0}{1 - 0} = 3.$$\n<strong>The shortcut.</strong> For a ratio of polynomials of the <em>same</em> degree, the limit at infinity is just the ratio of leading coefficients ($3/1 = 3$). If the top's degree were lower the limit would be $0$; if higher, it diverges to $\\pm\\infty$.\n<strong>Why it is rigorous.</strong> \"Divide by the highest power\" turns the indeterminate $\\infty/\\infty$ into a sum of terms with known limits — the move behind every limit-at-infinity of a rational function."
            }
          ]
        },
        {
          "id": "c-continuity",
          "title": "Continuity & the Intermediate Value Theorem",
          "minutes": 12,
          "content": "<h3>Why continuity is the bridge from limits to everything else</h3>\n<p>In the previous lesson you learned to ask: <em>where is a function heading as the input approaches a point?</em> That is the limit. Continuity asks a sharper question: <em>does the function actually arrive where it is heading, and is that the value it takes there?</em> A function is continuous when the limit and the value agree — no holes, no jumps, no blow-ups. This sounds modest, but it is the structural assumption underneath almost every powerful theorem in calculus: the Intermediate Value Theorem, the Extreme Value Theorem, differentiability, the Fundamental Theorem of Calculus. It is also the implicit promise behind gradient-based optimization in machine learning: when we nudge a parameter a little, we expect the loss to change a little, not teleport. That promise is exactly continuity.</p>\n\n<h3>1. Continuity at a point: the three-part contract</h3>\n<p>We say $f$ is <strong>continuous at a point $a$</strong> if</p>\n$$\\lim_{x \\to a} f(x) = f(a).$$\n<p>This single equation is deceptively compact. For it to even make sense, three separate things must all hold. Spelling them out is the practical checklist you will actually use:</p>\n<ol>\n<li><strong>$f(a)$ is defined.</strong> The point $a$ is in the domain — there is a value to land on.</li>\n<li><strong>$\\lim_{x \\to a} f(x)$ exists.</strong> The two-sided limit exists (so the left and right limits agree and are finite).</li>\n<li><strong>They are equal.</strong> The limit equals the function value.</li>\n</ol>\n<p>If any one of these fails, $f$ is discontinuous at $a$. Notice the order of dependence: condition 3 presupposes 1 and 2. A common student error is to check only that the limit exists and forget that the function must also be defined there and take that exact value.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Continuity at $a$ means you can draw the graph through $x=a$ without lifting your pen. More precisely, you can make $f(x)$ as close as you like to $f(a)$ purely by keeping $x$ close enough to $a$ — including at $x=a$ itself. The value the function <em>aims at</em> is the value it <em>takes</em>.</p>\n</div>\n\n<h4>The epsilon–delta version (the formalism)</h4>\n<p>The pen-lifting picture is intuition; here is the rigorous statement. $f$ is continuous at $a$ if for every $\\varepsilon > 0$ there exists a $\\delta > 0$ such that</p>\n$$|x - a| < \\delta \\;\\Longrightarrow\\; |f(x) - f(a)| < \\varepsilon.$$\n<p>Read it as a game: an adversary names a tolerance $\\varepsilon$ around the target value $f(a)$; you must produce a radius $\\delta$ around $a$ so small that every input within $\\delta$ gets mapped within $\\varepsilon$ of the target. Continuity means you can always win, no matter how tight the tolerance. The crucial difference from the bare limit definition is that here $x = a$ is <em>allowed</em> (we use $|x-a| < \\delta$, not $0 < |x-a| < \\delta$) — which is automatically fine because at $x=a$ we get $|f(a) - f(a)| = 0 < \\varepsilon$.</p>\n\n<h4>One-sided continuity and continuity on an interval</h4>\n<p>$f$ is <strong>continuous from the right at $a$</strong> if $\\lim_{x \\to a^+} f(x) = f(a)$, and <strong>from the left</strong> if $\\lim_{x \\to a^-} f(x) = f(a)$. A function is continuous on an open interval $(a,b)$ if it is continuous at every point inside. On a closed interval $[a,b]$ we additionally require right-continuity at the left endpoint $a$ and left-continuity at the right endpoint $b$ — because there is no graph to the left of $a$ or right of $b$ to demand a two-sided match.</p>\n\n<h4>What is continuous \"for free\"</h4>\n<p>You rarely run the epsilon–delta game by hand. Instead you lean on closure theorems: sums, differences, products, and quotients (where the denominator is nonzero) of continuous functions are continuous, and compositions of continuous functions are continuous. Combined with the base facts that polynomials, $\\sin$, $\\cos$, $e^x$, and $|x|$ are continuous everywhere, and $\\sqrt{x}$, $\\ln x$, and rational functions are continuous on their domains, you can certify continuity for almost any expression by inspection. This is why the ReLU activation $\\max(0,x)$ — a composition/combination of continuous pieces — is continuous everywhere, even though it has a corner at $0$.</p>\n\n<h3>2. Classifying discontinuities</h3>\n<p>When continuity fails, the <em>way</em> it fails matters. There are three standard types.</p>\n\n<h4>Removable discontinuity</h4>\n<p>The two-sided limit $\\lim_{x\\to a} f(x) = L$ exists (finite), but either $f(a)$ is undefined or $f(a) \\neq L$. The graph has a single \"hole\" (or a misplaced dot). It is called <em>removable</em> because redefining $f(a) := L$ patches it into a continuous function. Classic example:</p>\n$$f(x) = \\frac{x^2 - 1}{x - 1} = x + 1 \\quad (x \\neq 1).$$\n<p>Here $\\lim_{x\\to 1} f(x) = 2$ exists, but $f(1)$ is undefined. Define $f(1) = 2$ and the discontinuity vanishes.</p>\n\n<h4>Jump discontinuity</h4>\n<p>The left and right limits both exist and are finite, but they disagree: $\\lim_{x\\to a^-} f(x) \\neq \\lim_{x\\to a^+} f(x)$. The graph leaps. No single redefinition of $f(a)$ can fix it, because there is no single limiting value. The Heaviside step $H(x) = 0$ for $x<0$, $H(x)=1$ for $x \\geq 0$ has a jump of size $1$ at $0$. Jumps are exactly the discontinuities a hard threshold introduces — e.g. a classifier that outputs a discrete label once a score crosses a cutoff.</p>\n\n<h4>Infinite discontinuity</h4>\n<p>At least one one-sided limit is $\\pm\\infty$ — the function has a vertical asymptote. Example: $f(x) = 1/x^2$ at $x=0$, where both sides go to $+\\infty$, or $f(x)=1/x$ at $0$, where the two sides diverge to opposite infinities. Because a limit must be a finite number to \"exist,\" these are genuinely non-removable.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Decision procedure</div>\n<p>To classify a discontinuity at $a$: compute the one-sided limits. <strong>Both finite and equal</strong> (but $\\neq f(a)$ or $f(a)$ undefined) → removable. <strong>Both finite, unequal</strong> → jump. <strong>Either is infinite</strong> → infinite. If a one-sided limit oscillates and fails to settle (like $\\sin(1/x)$ near $0$), it is an <em>essential</em> discontinuity — none of the three clean types apply.</p>\n</div>\n\n<h3>3. The Intermediate Value Theorem (IVT)</h3>\n<p><strong>Statement.</strong> If $f$ is continuous on the closed interval $[a,b]$, and $N$ is any value strictly between $f(a)$ and $f(b)$, then there exists at least one $c \\in (a,b)$ with $f(c) = N$.</p>\n<p>In words: a continuous function cannot skip any value between its endpoint outputs. If it starts below $N$ and ends above $N$, it must cross $N$ somewhere. The pen never lifts, so it cannot hop over the horizontal line $y=N$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>You hike from an altitude of 800 m to 2200 m. At some moment you must have been at exactly 1500 m — you cannot teleport past it. The hike (a continuous path in time) is forced to hit every altitude in between. That inevitability is the entire content of IVT.</p>\n</div>\n\n<h4>Three things to respect about the hypotheses</h4>\n<ul>\n<li><strong>Continuity is essential.</strong> Drop it and the conclusion fails: the step function $H$ goes from $0$ to $1$ but never equals $0.5$. The jump is precisely the escape hatch IVT closes.</li>\n<li><strong>The closed interval matters.</strong> We need $f$ defined and continuous all the way across $[a,b]$, endpoints included.</li>\n<li><strong>It is an existence theorem, not a count or a construction.</strong> IVT guarantees <em>at least one</em> $c$; there may be many, and it does not tell you where $c$ is. Locating it is a separate (numerical) problem.</li>\n</ul>\n\n<h4>The root-finding corollary (Bolzano's theorem)</h4>\n<p>The most-used special case takes $N = 0$: <strong>if $f$ is continuous on $[a,b]$ and $f(a)$ and $f(b)$ have opposite signs (i.e. $f(a)\\cdot f(b) < 0$), then $f$ has a root in $(a,b)$.</strong> A sign change across a continuous function forces a zero crossing. This is the rigorous license for the <em>bisection method</em>: keep halving the interval, always keeping the half whose endpoints have opposite signs, and you trap the root in a shrinking window with guaranteed convergence.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Connection to ML / numerics</div>\n<p>IVT is the existence guarantee behind robust root-finding and is the reason bisection <em>cannot fail</em> on a continuous sign-changing function (unlike Newton's method, which can diverge). In ML you meet the same idea constantly: solving for a calibration threshold where a monotone metric hits a target, inverting a continuous CDF to sample, or finding the temperature that makes softmax outputs hit a desired entropy. More deeply, continuity is what makes the <em>loss landscape</em> navigable — small parameter steps yield small, predictable loss changes — which is the premise every gradient method silently relies on.</p>\n</div>\n\n<h3>4. Fully worked example: prove a root exists, then trap it</h3>\n<p><strong>Problem.</strong> Show that $f(x) = x^3 - x - 1$ has a real root, and locate it to within an interval of width $0.25$.</p>\n<p><strong>Step 1 — Establish continuity.</strong> $f$ is a polynomial, and polynomials are continuous on all of $\\mathbb{R}$. In particular $f$ is continuous on any closed interval we choose, so the IVT hypothesis is satisfied automatically.</p>\n<p><strong>Step 2 — Find a sign change.</strong> Evaluate at convenient integers:</p>\n$$f(1) = 1 - 1 - 1 = -1 < 0, \\qquad f(2) = 8 - 2 - 1 = 5 > 0.$$\n<p>Since $f(1) < 0 < f(2)$ and $f$ is continuous on $[1,2]$, the IVT (with $N=0$) guarantees a $c \\in (1,2)$ with $f(c) = 0$. A root exists. Done with the existence claim.</p>\n<p><strong>Step 3 — Bisect to shrink the interval.</strong> Test the midpoint and keep the half with opposite signs:</p>\n<pre><code>Interval [1, 2]      midpoint 1.5:  f(1.5) = 3.375 - 1.5 - 1 = 0.875 > 0\n  -> root in [1, 1.5]   (f(1)<0, f(1.5)>0)\n\nInterval [1, 1.5]    midpoint 1.25: f(1.25) = 1.9531 - 1.25 - 1 = -0.2969 < 0\n  -> root in [1.25, 1.5]   (f(1.25)<0, f(1.5)>0)\n</code></pre>\n<p>The interval $[1.25, 1.5]$ has width $0.25$ and brackets a root, as required. (The true root is $\\approx 1.3247$, the \"plastic number.\" Two more bisection steps would pin it to width $0.0625$.)</p>\n<p><strong>What we did and did not prove.</strong> IVT gave us certainty that a root exists and a guaranteed enclosing interval; bisection gave us a way to make that interval as small as we like. Neither step required a formula for the root, and indeed this cubic has no nice rational root — which is exactly the situation where IVT plus bisection earns its keep.</p>\n\n<p>The IVT only <em>promises</em> a root; <b>bisection</b> traps it. Since $f(x)=x^2-2$ is negative at $1$ and positive at $2$, a root (namely $\\sqrt 2$) lies between — repeatedly halve the interval, keeping the half that still straddles zero:</p>\n<div data-code=\"javascript\" data-expected=\"root ~ 1.4142\">// IVT guarantees a root of f on [1,2]; bisection narrows the bracket to find it.\nfunction f(x) { return x * x - 2; }   // f(1) = -1 &lt; 0,  f(2) = 2 &gt; 0\nlet lo = 1, hi = 2;\nfor (let i = 0; i &lt; 20; i++) {\n  const mid = (lo + hi) / 2;\n  if (f(lo) * f(mid) &lt;= 0) hi = mid;   // sign change is in [lo, mid]\n  else lo = mid;                       // otherwise it is in [mid, hi]\n}\nconsole.log(\"root ~ \" + ((lo + hi) / 2).toFixed(4));   // approximates sqrt(2)</div>\n<p class=\"see-also\"><b>See also:</b> this is exactly <a href=\"#/lesson/algorithms/a-binary-search\" data-route>binary search</a> — bisection runs the same halving on a continuous function that binary search runs on a sorted array.</p>\n<h3>5. Summary</h3>\n<ul>\n<li><strong>Continuity at $a$:</strong> $\\lim_{x\\to a} f(x) = f(a)$ — value defined, limit exists, and they match. Formalized by the $\\varepsilon$–$\\delta$ game where $x=a$ is allowed.</li>\n<li><strong>On an interval:</strong> continuous at every interior point, with one-sided continuity at closed endpoints.</li>\n<li><strong>Discontinuities:</strong> removable (limit exists, value wrong/missing), jump (finite one-sided limits disagree), infinite (a one-sided limit is $\\pm\\infty$).</li>\n<li><strong>IVT:</strong> continuous on $[a,b]$ ⇒ $f$ attains every value between $f(a)$ and $f(b)$. Special case $f(a)f(b)<0$ ⇒ a root exists — the foundation of bisection and the existence backbone of numerical root-finding used throughout ML and scientific computing.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the IVT guarantees roots without finding them</summary>\n<p>The <b>Intermediate Value Theorem</b> says: if $f$ is continuous on $[a, b]$, it takes <em>every</em> value between $f(a)$ and $f(b)$ somewhere on the interval. A continuous curve can't get from one height to another without passing through everything in between — no teleporting.</p>\n<p>Its most useful consequence is root-finding by sign change. If $f(a) \\lt 0$ and $f(b) \\gt 0$, then since $0$ lies between them there <em>must</em> be a $c$ in $(a, b)$ with $f(c) = 0$ — even though the theorem says nothing about <em>where</em>. That's an <b>existence</b> guarantee, and it's exactly what justifies <b>bisection</b>: keep halving the interval, always keeping a sign change inside, and you trap the root as tightly as you like.</p>\n<p>The \"aha\": continuity converts \"the function changes sign\" into \"the function has a root.\" You get a promise that a solution exists before doing any work to locate it — the foundation of every bracketing root-finder.</p>\n</details>\n<h4>Interactive — the Intermediate Value Theorem</h4>\n<div data-viz=\"calc-ivt\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the formal definition and the three kinds of discontinuity</summary>\n<p>\"Draw it without lifting your pen\" is the picture; the precise version is one equation, and it classifies <em>exactly</em> how continuity can fail.</p>\n<p><b>The definition.</b> $f$ is continuous at $a$ when $\\lim_{x\\to a} f(x) = f(a)$. That single line secretly demands <em>three</em> things: $f(a)$ is defined, the limit <em>exists</em> (left and right limits agree), and the two are <em>equal</em>. Break any one and you have a discontinuity.</p>\n<p><b>The three failure modes.</b> <em>Removable</em>: the limit exists but $f(a)$ is missing or set to the \"wrong\" value — a single-point hole you could patch by redefining $f(a)$. <em>Jump</em>: the left and right limits both exist but <em>disagree</em>, so the limit does not exist — a step you cannot patch (a piecewise switch, $\\text{sign}(x)$ at 0). <em>Infinite</em>: the function blows up, $\\lim = \\pm\\infty$ — a vertical asymptote ($1/x$ at 0).</p>\n<p>The \"aha\": continuity is the clean statement \"the value equals the limit,\" and its three requirements (defined, limit exists, they match) map one-to-one onto the three ways it breaks — removable (fixable), jump (limit fails), infinite (value explodes). Knowing which kind tells you whether a single redefinition can save it.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why continuity matters (optimization, ML, and the EVT)</summary>\n<p>Continuity can feel like a technicality — until you realize it is the <em>precondition</em> for almost every optimization and machine-learning method.</p>\n<p><b>Continuity enables search.</b> The <strong>Extreme Value Theorem</strong>: a continuous function on a closed interval $[a,b]$ <em>attains</em> a maximum and a minimum. Without continuity, there is no guarantee an optimum even exists. The IVT (the other dive) likewise guarantees solutions exist. These existence results are what let optimization say \"there <em>is</em> a best point to find.\"</p>\n<p><b>Differentiability enables gradient descent.</b> Gradient-based training needs a <em>differentiable</em> (hence continuous) loss: gradient descent follows the slope, so a loss with jumps or kinks offers no usable gradient there. This is exactly why we replace the discontinuous 0/1 \"misclassification count\" with smooth surrogates — cross-entropy, hinge — and why the non-differentiable ReLU kink or L1's corner needs care (subgradients). A tiny input change must cause a tiny output change for learning to be stable.</p>\n<p><b>Continuity is robustness.</b> A continuous model degrades gracefully — small input perturbations move the output only a little. Discontinuities are where models behave unpredictably (and where adversarial examples and numerical blow-ups lurk).</p>\n<p>The \"aha\": continuity is not pedantry — it is the foundation that makes optimization possible. The EVT guarantees an optimum exists; differentiability (a stronger form of continuity) makes gradient descent work; and smoothness is why we design <em>differentiable</em> losses instead of the discrete quantities we actually care about.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Consider $f(x) = \\dfrac{\\sin x}{x}$ at $x = 0$, where $f(0)$ is left undefined. What kind of discontinuity is at $x=0$?",
              "choices": [
                "Jump discontinuity",
                "Removable discontinuity",
                "Infinite discontinuity",
                "No discontinuity — the function is continuous there"
              ],
              "answer": 1,
              "explain": "The two-sided limit exists and equals 1, but $f(0)$ is undefined, so it is removable: defining $f(0)=1$ makes it continuous."
            },
            {
              "q": "Which set of conditions is exactly equivalent to '$f$ is continuous at $a$'?",
              "choices": [
                "$f(a)$ is defined, $\\lim_{x\\to a} f(x)$ exists, and the two are equal",
                "$f(a)$ is defined and $\\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x)$",
                "$\\lim_{x\\to a} f(x)$ exists",
                "$f$ is defined on an open interval around $a$"
              ],
              "answer": 0,
              "explain": "All three parts are required: the value must exist, the two-sided limit must exist, and they must be equal. Options that drop the value-equals-limit requirement miss removable discontinuities."
            },
            {
              "q": "$f$ is continuous on $[0,3]$ with $f(0) = -2$ and $f(3) = 4$. Which statement is guaranteed by the IVT?",
              "choices": [
                "$f$ has exactly one root in $(0,3)$",
                "$f$ takes the value $1$ somewhere in $(0,3)$",
                "$f$ is increasing on $[0,3]$",
                "$f$ has a maximum value of $4$ on $[0,3]$"
              ],
              "answer": 1,
              "explain": "Since $1$ lies between $f(0)=-2$ and $f(3)=4$, IVT guarantees some $c$ with $f(c)=1$. IVT gives existence, not uniqueness, monotonicity, or where the max occurs."
            },
            {
              "q": "Why does the IVT fail for the step function $H(x)=0$ for $x<0$, $H(x)=1$ for $x\\ge 0$ on $[-1,1]$, even though $H(-1)=0$ and $H(1)=1$?",
              "choices": [
                "Because $H$ has a jump discontinuity at $0$, violating the continuity hypothesis",
                "Because $H$ is not defined at $0$",
                "Because $0$ and $1$ are not strictly between the endpoint values",
                "Because the interval is not closed"
              ],
              "answer": 0,
              "explain": "IVT requires continuity on the whole closed interval; the jump at $0$ lets $H$ skip every value strictly between $0$ and $1$, so no $c$ gives $H(c)=0.5$."
            },
            {
              "q": "In the epsilon-delta definition of continuity at $a$, the condition is written $|x-a|<\\delta \\Rightarrow |f(x)-f(a)|<\\varepsilon$, whereas the limit definition uses $0<|x-a|<\\delta$. Why is dropping the '$0<$' harmless for continuity?",
              "choices": [
                "Because at $x=a$ we get $|f(a)-f(a)|=0<\\varepsilon$, so the point $x=a$ never violates the inequality",
                "Because $f$ might not be defined at $a$, so that case is excluded anyway",
                "Because $\\delta$ can always be chosen large enough to ignore $x=a$",
                "Because continuity only concerns one-sided behavior, where $x=a$ is irrelevant"
              ],
              "answer": 0,
              "explain": "Including $x=a$ is automatically safe since $|f(a)-f(a)|=0$ is less than every $\\varepsilon$, and continuity (unlike a bare limit) actually demands the value at $a$ match."
            },
            {
              "q": "The ReLU activation $\\max(0,x)$ has a sharp corner at $x=0$. Based on the lesson's closure theorems, is it continuous at $0$, and why?",
              "choices": [
                "No — the corner is a jump discontinuity",
                "No — a function cannot be continuous where it is non-differentiable",
                "Yes — it is built from continuous pieces (a composition/combination of continuous functions), and a corner does not break continuity",
                "Yes — but only from the right, not the left"
              ],
              "answer": 2,
              "explain": "Continuity only requires the limit to equal the value; a corner has matching one-sided limits equal to the value, and ReLU is a combination of continuous functions, so it is continuous everywhere despite not being differentiable at 0."
            },
            {
              "q": "For $f$ to be called continuous on the closed interval $[a,b]$, what is required at the endpoints specifically?",
              "choices": [
                "Two-sided limits must exist and match $f$ at both $a$ and $b$",
                "Nothing extra — interior continuity automatically covers the endpoints",
                "$f(a)=f(b)$ so the graph connects",
                "Right-continuity at $a$ and left-continuity at $b$"
              ],
              "answer": 3,
              "explain": "There is no graph to the left of $a$ or right of $b$ to demand a two-sided match, so we require only right-continuity at the left endpoint and left-continuity at the right endpoint."
            },
            {
              "q": "Using the root-finding corollary, which interval is guaranteed to contain a root of $f(x)=x^3-x-1$, given $f(1)=-1$, $f(1.5)=0.875$, and $f(2)=5$?",
              "choices": [
                "$[1.5, 2]$, because both values are positive",
                "$[1, 1.5]$, because the endpoint values have opposite signs",
                "$[1, 2]$ only, because that is where we first checked",
                "No interval is guaranteed without knowing the exact root"
              ],
              "answer": 1,
              "explain": "Bolzano's corollary guarantees a root where a continuous function changes sign, and $f(1)=-1<0<0.875=f(1.5)$ is the sign change, so a root lies in $[1,1.5]$."
            },
            {
              "q": "Let $f(x) = \\dfrac{x^2 - 4}{x - 2}$ for $x \\neq 2$. What single value should we assign to $f(2)$ to make $f$ continuous at $x = 2$?",
              "choices": [
                "No value works; the discontinuity is not removable",
                "$f(2) = 0$",
                "$f(2) = 4$",
                "$f(2) = 2$"
              ],
              "answer": 2,
              "explain": "For $x \\neq 2$, $\\frac{x^2-4}{x-2} = \\frac{(x-2)(x+2)}{x-2} = x+2$, so $\\lim_{x\\to 2} f(x) = 4$. Defining $f(2) = 4$ makes the value equal the limit. The discontinuity is removable, ruling out the 'no value' distractor."
            },
            {
              "q": "The IVT guarantees that a continuous $f$ on $[a,b]$ attains every value between $f(a)$ and $f(b)$. Which converse-style claim is a COMMON misconception that the IVT does NOT support?",
              "choices": [
                "If $f(a)$ and $f(b)$ have opposite signs, some $c$ in $(a,b)$ has $f(c)=0$",
                "If $f$ attains every intermediate value on $[a,b]$, then $f$ must be continuous on $[a,b]$",
                "A continuous $f$ on $[a,b]$ attains the value $\\tfrac{f(a)+f(b)}{2}$ somewhere",
                "The IVT says nothing about how many times a given value is attained"
              ],
              "answer": 1,
              "explain": "Attaining every intermediate value (the 'Darboux property') does not imply continuity; e.g. $\\sin(1/x)$ extended by $f(0)=0$ takes all intermediate values near 0 yet is discontinuous there. The other three are all correct consequences or limitations of the IVT."
            },
            {
              "q": "Suppose $f$ and $g$ are both continuous at $a$, but $h(x) = \\dfrac{f(x)}{g(x)}$ where $g(a) = 0$. What does the lesson's closure theorem for quotients let you conclude about $h$ at $a$?",
              "choices": [
                "The quotient theorem does not apply, since it requires $g(a) \\neq 0$, so continuity of $h$ at $a$ is not guaranteed",
                "$h$ has a removable discontinuity at $a$ in every case",
                "$h$ is automatically continuous at $a$ because $f$ and $g$ are",
                "$h$ must have a jump discontinuity at $a$"
              ],
              "answer": 0,
              "explain": "The quotient closure theorem only certifies continuity of $f/g$ at points where the denominator is nonzero; with $g(a)=0$ the hypothesis fails, so no conclusion follows (the behavior could be a vertical asymptote or a removable hole depending on $f$). Choices claiming a specific outcome over-state what the theorem provides."
            },
            {
              "q": "A continuous function $f$ satisfies $f(0) = 5$ and $f(4) = 5$. A student claims 'by the IVT, $f$ must equal $5$ everywhere on $[0,4]$.' What is the precise error?",
              "choices": [
                "The IVT requires the endpoints to have different values, so it cannot be applied here at all",
                "The IVT guarantees a maximum but not that it equals $5$",
                "The claim is actually correct: equal endpoints force a constant function",
                "The IVT only guarantees values are attained between $f(0)$ and $f(4)$; since both are $5$ it guarantees nothing beyond $f(0)=f(4)=5$, and $f$ may take many other values in between"
              ],
              "answer": 3,
              "explain": "The IVT only promises that every value strictly between $f(0)$ and $f(4)$ is attained; when those endpoints are equal the 'between' set collapses, so the theorem imposes no constraint on interior values. A continuous $f$ with $f(0)=f(4)=5$ (e.g. a bump) can clearly be non-constant, refuting the student's claim."
            },
            {
              "q": "Informally, a function is continuous on an interval when:",
              "choices": [
                "it is always increasing",
                "it has an inverse",
                "you can draw its graph over that interval without lifting your pen",
                "it is a straight line"
              ],
              "answer": 2,
              "explain": "The intuitive picture of continuity is an unbroken curve — no jumps, holes, or vertical asymptotes — so you can trace it without lifting your pen. The formal $\\varepsilon$–$\\delta$ definition makes this precise: inputs that are close enough give outputs that are arbitrarily close."
            },
            {
              "q": "Where is a polynomial function continuous?",
              "choices": [
                "only where it is positive",
                "only on bounded intervals",
                "nowhere; polynomials have corners",
                "everywhere — at every real number"
              ],
              "answer": 3,
              "explain": "Polynomials are continuous on all of $\\mathbb{R}$: they are built from $x$ and constants via addition and multiplication, and continuity is preserved under those operations. This is why $\\lim_{x\\to a} p(x) = p(a)$ for any polynomial — substitution simply works."
            },
            {
              "q": "If $\\lim_{x\\to a^-} f(x)$ and $\\lim_{x\\to a^+} f(x)$ both exist but are *different* finite values, the discontinuity at $a$ is a:",
              "choices": [
                "removable discontinuity",
                "infinite discontinuity",
                "there is no discontinuity",
                "jump discontinuity"
              ],
              "answer": 3,
              "explain": "Two different finite one-sided limits make the graph 'jump' at $a$ — a *jump* discontinuity. Contrast a *removable* discontinuity (the one-sided limits agree but $f(a)$ is missing or wrong — a single fixable hole) and an *infinite* discontinuity (a one-sided limit is $\\pm\\infty$, a vertical asymptote)."
            },
            {
              "q": "If $f$ is continuous at $a$, then $\\lim_{x\\to a} f(x)$ equals:",
              "choices": [
                "$+\\infty$",
                "$0$",
                "$f(a)$",
                "the derivative $f'(a)$"
              ],
              "answer": 2,
              "explain": "Continuity at $a$ *means* the limit equals the function value: $\\lim_{x\\to a} f(x) = f(a)$ (with $f(a)$ defined and the two-sided limit existing). That is precisely why limits of continuous functions can be evaluated by direct substitution."
            }
          ],
          "flashcards": [
            {
              "front": "State the definition of continuity of $f$ at a point $a$.",
              "back": "$f$ is continuous at $a$ iff $\\lim_{x\\to a} f(x) = f(a)$: (1) $f(a)$ is defined, (2) the two-sided limit exists, (3) they are equal."
            },
            {
              "front": "Epsilon-delta definition of continuity at $a$?",
              "back": "For every $\\varepsilon>0$ there exists $\\delta>0$ such that $|x-a|<\\delta \\Rightarrow |f(x)-f(a)|<\\varepsilon$. (Note: $x=a$ is allowed, unlike the limit definition.)"
            },
            {
              "front": "The three types of discontinuity and how to tell them apart.",
              "back": "Removable: two-sided limit exists but value missing/wrong. Jump: finite one-sided limits disagree. Infinite: a one-sided limit is $\\pm\\infty$ (vertical asymptote)."
            },
            {
              "front": "State the Intermediate Value Theorem.",
              "back": "If $f$ is continuous on $[a,b]$ and $N$ lies between $f(a)$ and $f(b)$, then there exists $c\\in(a,b)$ with $f(c)=N$. (Existence only, at least one such $c$.)"
            },
            {
              "front": "How does IVT justify root-finding by bisection?",
              "back": "If $f$ is continuous on $[a,b]$ and $f(a)f(b)<0$, a root exists in $(a,b)$. Repeatedly halve the interval, keeping the half where endpoints have opposite signs, to trap the root."
            },
            {
              "front": "What goes 'continuous for free' without an epsilon-delta proof?",
              "back": "Sums, products, quotients (nonzero denom), and compositions of continuous functions; polynomials, $\\sin$, $\\cos$, $e^x$, $|x|$ everywhere; $\\sqrt{x}$, $\\ln x$, rationals on their domains."
            }
          ],
          "homework": [
            {
              "prompt": "Let $f(x) = \\dfrac{x^2 - 4}{x - 2}$ for $x \\neq 2$, with $f(2) = 5$. Determine whether $f$ is continuous at $x=2$. If not, classify the discontinuity and state how (or whether) it can be removed.",
              "hint": "Simplify the rational expression for $x \\neq 2$, take the limit as $x\\to 2$, then compare it with the assigned value $f(2)=5$.",
              "solution": "For $x\\neq 2$, $\\frac{x^2-4}{x-2} = \\frac{(x-2)(x+2)}{x-2} = x+2$. So $\\lim_{x\\to 2} f(x) = 2+2 = 4$. The limit exists (finite), but $f(2)=5 \\neq 4$, so $f$ is discontinuous at $2$. Because the two-sided limit exists, this is a REMOVABLE discontinuity. It is removed by redefining $f(2) = 4$ instead of $5$, which makes $f(x)=x+2$ continuous everywhere."
            },
            {
              "prompt": "Prove that the equation $\\cos x = x$ has a solution in the interval $[0, 1]$.",
              "hint": "Move everything to one side: define $g(x) = \\cos x - x$ and look for a root. Check continuity and the signs of $g$ at the endpoints.",
              "solution": "Let $g(x) = \\cos x - x$. Then $g$ is continuous on $[0,1]$ since $\\cos x$ and $x$ are continuous and differences of continuous functions are continuous. Evaluate the endpoints: $g(0) = \\cos 0 - 0 = 1 > 0$, and $g(1) = \\cos 1 - 1 \\approx 0.5403 - 1 = -0.4597 < 0$. Since $g(0) > 0 > g(1)$ and $g$ is continuous, by the IVT (with $N=0$) there exists $c \\in (0,1)$ with $g(c)=0$, i.e. $\\cos c = c$. Hence the equation has a solution in $[0,1]$. (The solution is the Dottie number $\\approx 0.739$.)"
            },
            {
              "prompt": "Define $f(x) = \\begin{cases} x+1 & x < 0 \\\\ x^2 & 0 \\le x \\le 1 \\\\ 3 - x & x > 1 \\end{cases}$. Identify all points where $f$ is discontinuous and classify each.",
              "hint": "The only candidates for discontinuity are the boundaries between pieces, $x=0$ and $x=1$. At each, compute the left limit, the right limit, and the actual value, then compare.",
              "solution": "Each piece is a polynomial, hence continuous on its open interval; only the junctions $x=0$ and $x=1$ need checking.\n\nAt $x=0$: left limit $\\lim_{x\\to 0^-}(x+1)=1$; right limit $\\lim_{x\\to 0^+}x^2 = 0$; value $f(0)=0^2=0$. The one-sided limits are finite but unequal ($1\\neq 0$), so this is a JUMP discontinuity (jump of size $1$).\n\nAt $x=1$: left limit $\\lim_{x\\to 1^-}x^2 = 1$; right limit $\\lim_{x\\to 1^+}(3-x)=2$; value $f(1)=1^2=1$. Again finite but unequal one-sided limits ($1\\neq 2$), so this is a JUMP discontinuity (jump of size $1$).\n\nConclusion: $f$ is continuous everywhere except at $x=0$ and $x=1$, each a jump discontinuity."
            }
          ],
          "examples": [
            {
              "title": "Choosing a constant to remove a discontinuity",
              "body": "Find the value of the constant $k$ that makes the piecewise function $$f(x) = \\begin{cases} \\dfrac{x^2 - 9}{x - 3}, & x \\neq 3 \\\\[2mm] k, & x = 3 \\end{cases}$$ continuous at $x = 3$.",
              "solution": "Continuity at $x=3$ requires the three-part contract to hold: $f(3)$ defined, $\\lim_{x\\to 3} f(x)$ exists, and the two are equal — i.e. $\\lim_{x\\to 3} f(x) = f(3)$.\n\nStep 1 — Compute the limit. For $x \\neq 3$ we may simplify, since the limit ignores the single point $x=3$. Factor the numerator: $x^2 - 9 = (x-3)(x+3)$. Then $$\\frac{x^2-9}{x-3} = \\frac{(x-3)(x+3)}{x-3} = x+3 \\quad (x \\neq 3).$$ So $$\\lim_{x\\to 3} f(x) = \\lim_{x\\to 3}(x+3) = 3 + 3 = 6.$$ The two-sided limit exists and is finite.\n\nStep 2 — Match the value to the limit. By definition $f(3) = k$. Continuity demands $f(3) = \\lim_{x\\to 3} f(x)$, that is $k = 6$.\n\nStep 3 — Check. With $k=6$, $f(x) = x+3$ everywhere (the hole at $x=3$ is filled exactly where the curve was heading), so $f$ is continuous at $3$. Any other $k$ would leave a removable discontinuity — the graph would have a single misplaced point.\n\nAnswer: $k = 6$."
            },
            {
              "title": "Using the IVT to trap a cube root",
              "body": "Show that the equation $x^3 + x = 5$ has a real solution, locate it between two consecutive integers, then use one more application of the Intermediate Value Theorem to narrow it to an interval of width $\\tfrac12$.",
              "solution": "Step 1 — Set up a continuous function whose zero is the solution. Move everything to one side and define $$g(x) = x^3 + x - 5.$$ A solution of $x^3 + x = 5$ is exactly a root $g(c) = 0$. As a polynomial, $g$ is continuous on all of $\\mathbb{R}$, so the IVT applies on any closed interval $[a,b]$: if $g(a)$ and $g(b)$ have opposite signs, then $g$ takes the value $0$ somewhere strictly between $a$ and $b$.\n\nStep 2 — Find a sign change between consecutive integers. Evaluate at small integers: $$g(1) = 1 + 1 - 5 = -3 < 0, \\qquad g(2) = 8 + 2 - 5 = 5 > 0.$$ Since $g(1) < 0 < g(2)$ and $g$ is continuous on $[1,2]$, the IVT guarantees a root $c$ with $1 < c < 2$. So the solution lies between the consecutive integers $1$ and $2$ (an interval of width $1$).\n\nStep 3 — Bisect once to halve the interval. Test the midpoint $x = 1.5$: $$g(1.5) = (1.5)^3 + 1.5 - 5 = 3.375 + 1.5 - 5 = -0.125 < 0.$$ Now compare signs on the two halves. On $[1,\\,1.5]$ both endpoints are negative ($g(1)=-3$, $g(1.5)=-0.125$), so no guaranteed crossing there. On $[1.5,\\,2]$ we have $$g(1.5) = -0.125 < 0 < 5 = g(2),$$ a sign change, so by the IVT the root lies in $(1.5,\\,2)$ — an interval of width $\\tfrac12$, as required.\n\nStep 4 — Confirm uniqueness via monotonicity (a bonus the IVT pairs well with). Both $x^3$ and $x$ are strictly increasing, so $g(x) = x^3 + x - 5$ is strictly increasing; a strictly increasing continuous function crosses any level at most once. Hence the root the IVT found is the only real solution. (Numerically it is about $c \\approx 1.516$, comfortably inside the trapped interval $(1.5,\\,2)$.)\n\nAnswer: The equation $x^3 + x = 5$ has exactly one real solution. The IVT traps it: $g(1) = -3 < 0 < 5 = g(2)$ places it in $(1,2)$, and the further test $g(1.5) = -0.125 < 0$ narrows it to $(1.5,\\,2)$, an interval of width $\\tfrac12$."
            },
            {
              "title": "A jump discontinuity can't be patched",
              "body": "Is $f(x) = \\begin{cases} x & x \\lt 1 \\\\ x + 2 & x \\ge 1 \\end{cases}$ continuous at $x = 1$? Could redefining $f(1)$ fix it?",
              "solution": "<strong>Check the one-sided limits.</strong> As $x \\to 1^-$, $f(x) = x \\to 1$. As $x \\to 1^+$, $f(x) = x + 2 \\to 3$. The left and right limits <em>disagree</em> ($1 \\ne 3$), so $\\lim_{x \\to 1} f(x)$ does not exist.\n<strong>So it is discontinuous</strong> — and the gap is unfixable. Continuity at $x=1$ needs $\\lim_{x\\to 1} f = f(1)$, but no single value of $f(1)$ can equal both one-sided limits at once. This is a <b>jump discontinuity</b>.\n<strong>Contrast with removable.</strong> A <em>removable</em> discontinuity has both one-sided limits agreeing (the two-sided limit exists) but the function missing or misplaced at that one point — redefining $f$ there patches it. A jump has the limits themselves disagreeing, so there is nothing to patch to.\n<strong>The aha.</strong> \"Continuous\" means the two-sided limit exists <em>and</em> equals the function value. A removable hole fails only the second condition (fixable); a jump fails the first (the limit does not exist) — no redefinition can mend a genuine break in the graph."
            }
          ]
        }
      ]
    },
    {
      "id": "c-derivatives",
      "title": "The Derivative: Definition & Rules",
      "lessons": [
        {
          "id": "c-derivative-definition",
          "title": "The Derivative as Limit, Slope & Rate",
          "minutes": 16,
          "content": "<h3>From Average to Instantaneous: The Core Idea</h3>\n<p>Suppose you drive 120 km in 2 hours. Your <strong>average</strong> speed is 60 km/h. But your speedometer almost never reads exactly 60 — it shows your speed <em>right now</em>, at an instant. How can \"speed at an instant\" even mean anything? An instant has no duration, so over it you travel zero distance in zero time, and $0/0$ is nonsense. The derivative is the precise, rigorous answer to this puzzle, and it is arguably the single most important construction in all of applied mathematics — including the gradient-based optimization that powers modern machine learning.</p>\n\n<p>The trick is to compute the average rate of change over a <em>tiny</em> interval and then watch what happens as the interval shrinks toward zero. We never plug in zero; we take a <strong>limit</strong>.</p>\n\n<h3>The Difference Quotient</h3>\n<p>Let $f$ be a function and fix a point $x$. Move a small amount $h \\neq 0$ away to $x + h$. The <strong>average rate of change</strong> of $f$ between these two points is</p>\n$$\\frac{f(x+h) - f(x)}{h}.$$\n<p>Geometrically this is the slope of the <strong>secant line</strong> through the points $(x, f(x))$ and $(x+h, f(x+h))$: rise over run. This quantity is called the <strong>difference quotient</strong>. It is perfectly well-defined for any $h \\neq 0$.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>As $h$ gets smaller, the second point slides along the curve toward the first, and the secant line pivots toward the line that just \"grazes\" the curve at $x$ — the <strong>tangent line</strong>. The slope of that limiting line is the derivative.</p></div>\n\n<h3>The Definition</h3>\n<p>The <strong>derivative of $f$ at $x$</strong>, written $f'(x)$ or $\\frac{df}{dx}$, is the limit of the difference quotient as $h \\to 0$:</p>\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h},$$\n<p>provided this limit exists. When it does, we say $f$ is <strong>differentiable at $x$</strong>. An equivalent form fixes a moving point $t$ and lets it approach $x$:</p>\n$$f'(x) = \\lim_{t \\to x} \\frac{f(t) - f(x)}{t - x}.$$\n<p>These are the same statement with the substitution $t = x + h$. The first form is usually easier for hand computation; the second makes the \"two points merging\" picture explicit.</p>\n\n<h4>Why \"the limit exists\" is doing real work</h4>\n<p>The expression $\\frac{f(x+h)-f(x)}{h}$ is literally $\\frac{0}{0}$ at $h = 0$, so we cannot evaluate it directly. A limit asks a different question: as $h$ approaches $0$ <em>from both sides</em>, does the difference quotient approach a single finite number? If the left-hand and right-hand limits disagree (a corner), or blow up (a vertical tangent), or oscillate, the derivative does not exist there.</p>\n\n<h3>Three Interpretations of the Same Number</h3>\n<p>$f'(x)$ is one number with three faces. Fluency means switching between them effortlessly.</p>\n\n<h4>1. Instantaneous rate of change</h4>\n<p>If $f(t)$ is position at time $t$, then $f'(t)$ is velocity — the exact rate at which position is changing at that instant. More generally, $f'(x)$ answers: \"per unit increase in the input, how fast is the output changing <em>right here</em>?\" Units matter: if $f$ is in meters and $x$ in seconds, $f'$ is in meters/second. In economics this is <em>marginal</em> cost or revenue; in physics it is velocity, acceleration, current, flux.</p>\n\n<h4>2. Slope of the tangent line</h4>\n<p>$f'(x)$ is the slope of the line tangent to the graph of $f$ at the point $(x, f(x))$. This gives us the <strong>tangent line equation</strong> in point-slope form:</p>\n$$y = f(a) + f'(a)\\,(x - a).$$\n<p>Read it as: start at the height $f(a)$, then change linearly at rate $f'(a)$ as you move away from $a$.</p>\n\n<h4>3. Local linearization (the best linear approximation)</h4>\n<p>Near $x = a$, the tangent line is the best straight-line approximation to $f$. We write</p>\n$$f(x) \\approx f(a) + f'(a)\\,(x - a) \\quad \\text{for } x \\text{ near } a.$$\n<p>This is the <strong>linearization</strong> $L(x)$. \"Best\" has a precise meaning: it is the unique linear function whose error $f(x) - L(x)$ shrinks <em>faster</em> than $|x - a|$ as $x \\to a$. The derivative is exactly the coefficient that makes this happen.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Local linearization is the conceptual engine of calculus: complicated nonlinear things become simple linear things if you zoom in far enough. In several variables this becomes the <strong>gradient</strong> $\\nabla f$, and the linearization $f(\\mathbf{x}) \\approx f(\\mathbf{a}) + \\nabla f(\\mathbf{a})^\\top (\\mathbf{x} - \\mathbf{a})$ is precisely what gradient descent exploits: it trusts the local linear model to decide which direction reduces a loss, takes a small step, then re-linearizes. Every training step of a neural network is \"compute a derivative, then move along it.\" Backpropagation is just the chain rule applied to this difference-quotient idea, automated.</p></div>\n\n<h3>Worked Example: Derivative from the Definition</h3>\n<p>Let $f(x) = x^2 - 3x$. Compute $f'(x)$ directly from the limit definition, then find the tangent line at $x = 2$.</p>\n<p><strong>Step 1 — Form the difference quotient.</strong> Expand $f(x+h)$:</p>\n$$f(x+h) = (x+h)^2 - 3(x+h) = x^2 + 2xh + h^2 - 3x - 3h.$$\n<p><strong>Step 2 — Subtract $f(x)$.</strong></p>\n$$f(x+h) - f(x) = \\big(x^2 + 2xh + h^2 - 3x - 3h\\big) - \\big(x^2 - 3x\\big) = 2xh + h^2 - 3h.$$\n<p><strong>Step 3 — Divide by $h$.</strong> Every surviving term has a factor of $h$, which is what lets the $0/0$ resolve:</p>\n$$\\frac{f(x+h)-f(x)}{h} = \\frac{h(2x + h - 3)}{h} = 2x + h - 3 \\quad (h \\neq 0).$$\n<p><strong>Step 4 — Take the limit $h \\to 0$.</strong> Now there is no division by zero; just substitute:</p>\n$$f'(x) = \\lim_{h \\to 0} (2x + h - 3) = 2x - 3.$$\n<p><strong>Tangent line at $x = 2$.</strong> We need the point and the slope. The point: $f(2) = 4 - 6 = -2$, so $(2, -2)$. The slope: $f'(2) = 2(2) - 3 = 1$. Therefore</p>\n$$y = -2 + 1\\cdot(x - 2) = x - 4.$$\n<p>Sanity check: at $x = 2$ this gives $y = -2$, matching the point, and the slope $1$ matches $f'(2)$. The same line is the linearization, so for $x$ near $2$, $f(x) \\approx x - 4$ (e.g. $f(2.1) = -1.89$ vs. $L(2.1) = -1.9$ — close, with error $\\approx 0.01 = (0.1)^2$, exactly the squared term we dropped).</p>\n\n<h3>Differentiability Implies Continuity</h3>\n<p>A key structural fact: <strong>if $f$ is differentiable at $x = a$, then $f$ is continuous at $a$.</strong> Differentiability is the stronger property.</p>\n\n<h4>The proof (short and worth knowing)</h4>\n<p>Continuity at $a$ means $\\lim_{x \\to a} f(x) = f(a)$, equivalently $\\lim_{x \\to a}\\big(f(x) - f(a)\\big) = 0$. Assume $f'(a)$ exists. For $x \\neq a$, multiply and divide by $(x - a)$:</p>\n$$f(x) - f(a) = \\frac{f(x) - f(a)}{x - a} \\cdot (x - a).$$\n<p>Take the limit as $x \\to a$. The first factor tends to $f'(a)$ (a finite number, by assumption); the second factor tends to $0$. The product tends to $f'(a) \\cdot 0 = 0$. Hence $\\lim_{x\\to a} f(x) = f(a)$, so $f$ is continuous at $a$. $\\blacksquare$</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>The implication runs <strong>one way only</strong>: differentiable $\\Rightarrow$ continuous, but continuous $\\not\\Rightarrow$ differentiable. Continuity says \"no jumps or holes\"; differentiability adds \"and the graph is smooth enough to have a single well-defined slope.\"</p></div>\n\n<h4>Why the converse fails: $f(x) = |x|$ at $x = 0$</h4>\n<p>The absolute value is continuous everywhere — its graph is an unbroken V. But at $x = 0$ the difference quotient is</p>\n$$\\frac{|0 + h| - |0|}{h} = \\frac{|h|}{h} = \\begin{cases} +1 & h > 0 \\\\ -1 & h < 0. \\end{cases}$$\n<p>The right-hand limit is $+1$, the left-hand limit is $-1$. They disagree, so the two-sided limit does not exist, and $f'(0)$ does not exist. The <strong>corner</strong> at the origin has no single tangent slope. Continuity holds; differentiability fails.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>This is not a pedantic edge case. The <code>ReLU</code> activation $\\max(0, x)$ has exactly this corner at $0$ — it is continuous but not differentiable there. Frameworks paper over it with a <em>subgradient</em> (they just pick $0$ or $1$ at the kink). The L1 loss $|y - \\hat{y}|$ and L1 regularization (lasso) have the same non-differentiable corner, which is precisely why lasso drives weights to exactly zero and why those losses need subgradient or proximal methods rather than vanilla derivatives. Knowing where differentiability breaks tells you where naive gradient descent needs special handling.</p></div>\n\n<p>Other ways differentiability can fail even when $f$ is continuous: a <strong>vertical tangent</strong> (e.g. $f(x) = x^{1/3}$ at $0$, where the slope is \"infinite\"), and wild <strong>oscillation</strong> (e.g. $x\\sin(1/x)$ extended by $0$, which is continuous at $0$ but whose difference quotient oscillates and has no limit).</p>\n\n<h3>Notation and a Caution</h3>\n<p>Several notations denote the same object: $f'(x)$ (Lagrange), $\\frac{df}{dx}$ (Leibniz), $\\dot{x}$ (Newton, for time derivatives), $Df$ (operator). Leibniz notation $\\frac{df}{dx}$ is suggestive of \"tiny rise over tiny run\" and is invaluable for the chain rule, but remember it is a <em>limit</em>, not an actual fraction — though it behaves like one often enough to be dangerous in the best way.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Common trap</div><p>Do not \"cancel the $h$\" before factoring. The cancellation in Step 3 of the worked example is legal only because $h \\neq 0$ throughout the limiting process — we never set $h = 0$, we let it <em>approach</em> $0$. Simplifying the difference quotient to remove the $0/0$ form, <em>then</em> substituting, is the entire technique.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li>The derivative is the limit of the difference quotient: $f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$, the instantaneous version of average rate of change.</li>\n<li>It has three equivalent meanings: instantaneous rate of change, slope of the tangent line, and the slope of the best local linear approximation.</li>\n<li>Tangent line / linearization: $y = f(a) + f'(a)(x - a)$.</li>\n<li>Differentiable $\\Rightarrow$ continuous, but not conversely; corners (like $|x|$ and ReLU), vertical tangents, and oscillation break differentiability while preserving continuity.</li>\n<li>This single idea — linearize locally, then move — is the foundation of gradient-based learning.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-derivative\"></div>\n<h4>Try it in code</h4>\n<p>The derivative <em>is</em> the limit of the secant slope. Shrink <code>h</code> in the code and watch the numeric slope home in on the exact answer:</p>\n<div data-code=\"javascript\" data-expected=\"6.00\">// The derivative is the limit of the secant slope (f(x+h) - f(x)) / h as h -&gt; 0.\n// For f(x) = x^2 the exact derivative is f'(x) = 2x, so f'(3) should be 6.\nfunction f(x) { return x * x; }\nfunction deriv(f, x, h) { return (f(x + h) - f(x)) / h; }\nconsole.log(deriv(f, 3, 0.001).toFixed(2));   // ~ 6.00</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the derivative is a secant line in the limit</summary>\n<p>The derivative $f'(a)$ is <em>defined</em> as a limit of difference quotients: $f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$. Each quotient is the slope of a <b>secant line</b> through two points on the curve, $(a, f(a))$ and $(a+h, f(a+h))$ — an <em>average</em> rate of change over an interval of width $h$.</p>\n<p>As $h \\to 0$ the second point slides toward the first, the secant pivots, and in the limit it becomes the <b>tangent line</b> — the <em>instantaneous</em> rate of change at the single point $a$. The subtlety is that we never divide by zero: we take the limit of the ratio as $h$ shrinks, which exists for a smooth function even though plugging in $h=0$ gives the indeterminate $0/0$.</p>\n<p>The \"aha\": \"instantaneous rate\" sounds paradoxical — change seems to need an interval — and the resolution is the limit: the average rate over an ever-smaller interval converges to one number. Velocity from position, marginal cost, the slope of a curve are all this same secant-to-tangent limit.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: differentiable ⟹ continuous (but not the reverse)</summary>\n<p>The secant-to-tangent limit only exists if the function is \"smooth enough\" — and that requirement creates a strict hierarchy.</p>\n<p><b>Differentiable implies continuous.</b> If $f$ has a derivative at $a$, it must be continuous there: a jump or hole would make the secant slopes blow up, so no finite limit could exist. Differentiability is the <em>stronger</em> condition.</p>\n<p><b>But continuous does <em>not</em> imply differentiable.</b> The classic counterexample is $f(x) = |x|$ at $x = 0$: it is perfectly continuous (no jump), but the slope is $-1$ coming from the left and $+1$ from the right — the secant slope has no single limit, so there is a <b>corner</b>, not a tangent. Continuous functions can have corners, cusps, even be continuous everywhere yet differentiable nowhere (the Weierstrass function).</p>\n<p><b>Why ML cares.</b> $\\text{ReLU}(x) = \\max(0, x)$ is exactly this: continuous, with a kink at 0 where the derivative is undefined. Training handles it with a <em>subgradient</em> (pick 0 or 1 at the kink) — which works because the kink is hit with probability about 0 and the subgradient is still a valid descent direction.</p>\n<p>The \"aha\": smoothness is a ladder — continuous (no breaks) is weaker than differentiable (has a tangent). Every differentiable function is continuous, but corners like $|x|$ and ReLU show the converse fails, which is why \"is the loss differentiable?\" is a real question in optimization.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the derivative is the best linear approximation</summary>\n<p>The secant-to-tangent limit gives a <em>number</em> (the slope) — but the deeper reading is that the derivative defines a whole <em>function</em>: the <b>best linear approximation</b> to $f$ near a point.</p>\n<p><b>Local linearity.</b> Near $x=a$, $f(x) \\approx f(a) + f'(a)(x-a)$ — the tangent line. The defining property of differentiability is that this approximation's error shrinks <em>faster than linearly</em>: $f(x) = f(a) + f'(a)(x-a) + o(x-a)$, where the leftover $o(x-a)$ vanishes faster than $(x-a)$ itself. In picture form: zoom in on any differentiable curve and it becomes <em>indistinguishable from a straight line</em> — that line's slope is $f'(a)$.</p>\n<p><b>Why this view wins.</b> \"Slope of the tangent\" does not generalize past 1D, but \"best linear approximation\" does — it becomes the <em>gradient</em> (best linear approximation of a scalar function of many variables) and the <em>Jacobian</em> (of a vector function). It is also why <em>linearization</em>, <em>Newton's method</em> (step using the tangent), and <em>Taylor series</em> (the derivative is the first-order term) all work: each replaces a hard function by its local linear model.</p>\n<p>The \"aha\": a derivative is not just \"rise over run in the limit\" — it is the unique linear function that hugs $f$ at a point to first order. \"Differentiable\" means \"locally looks linear,\" and that single idea scales from a tangent line to gradients, Jacobians, and the whole machinery of optimization.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Using the limit definition, what is $f'(x)$ for $f(x) = 3x^2 + x$?",
              "choices": [
                "$6x^2 + 1$",
                "$3x + 1$",
                "$6x + 1$",
                "$6x$"
              ],
              "answer": 2,
              "explain": "The difference quotient is $(6xh + 3h^2 + h)/h = 6x + 3h + 1$; letting $h\\to 0$ gives $6x + 1$. The constant term $x$ contributes its slope $1$."
            },
            {
              "q": "Which statement is TRUE about the relationship between differentiability and continuity at a point?",
              "choices": [
                "Continuity implies differentiability",
                "Neither implies the other",
                "The two properties are equivalent",
                "Differentiability implies continuity, but not conversely"
              ],
              "answer": 3,
              "explain": "Differentiability is strictly stronger: it implies continuity (proved via $f(x)-f(a) = \\frac{f(x)-f(a)}{x-a}(x-a)\\to f'(a)\\cdot 0$), but $|x|$ is continuous yet not differentiable at $0$."
            },
            {
              "q": "Why does $f(x) = |x|$ fail to be differentiable at $x = 0$ even though it is continuous there?",
              "choices": [
                "The function is undefined at $0$",
                "There is a jump discontinuity at $0$",
                "The left and right limits of the difference quotient are $-1$ and $+1$, so the two-sided limit does not exist",
                "The function value is zero at $0$"
              ],
              "answer": 2,
              "explain": "The difference quotient $|h|/h$ equals $+1$ for $h>0$ and $-1$ for $h<0$; the one-sided limits disagree, so the derivative limit does not exist — a corner, not a jump."
            },
            {
              "q": "The linearization $L(x) = f(a) + f'(a)(x-a)$ is called the BEST linear approximation near $a$ because:",
              "choices": [
                "It passes through the origin",
                "Its error $f(x)-L(x)$ shrinks faster than $|x-a|$ as $x\\to a$",
                "It has the largest possible slope",
                "It equals $f(x)$ exactly for all $x$"
              ],
              "answer": 1,
              "explain": "Among all lines through $(a,f(a))$, only the tangent makes the approximation error vanish faster than first order in $|x-a|$; that property uniquely pins down the slope as $f'(a)$."
            },
            {
              "q": "Geometrically, what does the difference quotient $\\frac{f(x+h) - f(x)}{h}$ represent for a fixed $h \\neq 0$?",
              "choices": [
                "The slope of the tangent line to $f$ at $x$",
                "The instantaneous rate of change of $f$ at $x$",
                "The area under $f$ between $x$ and $x+h$",
                "The slope of the secant line through $(x, f(x))$ and $(x+h, f(x+h))$"
              ],
              "answer": 3,
              "explain": "Before taking the limit, the difference quotient is rise over run between two points, i.e. the slope of the secant line; only after $h \\to 0$ does it become the tangent slope."
            },
            {
              "q": "Why is it incorrect to find the instantaneous speed by simply substituting $h = 0$ into the difference quotient?",
              "choices": [
                "Because at $h = 0$ the expression becomes $0/0$, which is undefined, so we must take a limit instead",
                "Because the difference quotient is only valid for large $h$",
                "Because the result would always be negative",
                "Because substituting $h = 0$ gives the average speed, not the instantaneous speed"
              ],
              "answer": 0,
              "explain": "At $h = 0$ both numerator and denominator vanish, giving the indeterminate form $0/0$, so the derivative is defined as the limit of the quotient as $h \\to 0$ rather than direct substitution."
            },
            {
              "q": "The two forms $\\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$ and $\\lim_{t \\to x} \\frac{f(t)-f(x)}{t-x}$ are related by which substitution?",
              "choices": [
                "$t = h/x$",
                "$t = x - h$",
                "$t = x + h$",
                "$t = xh$"
              ],
              "answer": 2,
              "explain": "Setting $t = x + h$ means $h = t - x$, and $h \\to 0$ corresponds to $t \\to x$, converting one form into the other."
            },
            {
              "q": "At a point where $f$ has a corner (its left-hand and right-hand difference quotients approach different values), what can we conclude?",
              "choices": [
                "$f'(x)$ equals the average of the two one-sided limits",
                "$f'(x)$ does not exist because the two-sided limit fails to give a single value",
                "$f'(x)$ exists and equals zero",
                "$f'(x)$ is automatically infinite"
              ],
              "answer": 1,
              "explain": "The derivative requires the difference quotient to approach one single finite number from both sides; if the one-sided limits disagree, the limit does not exist and $f$ is not differentiable there."
            },
            {
              "q": "A particle's position is $s(t) = t^2 - 4t$ (meters, seconds). Using the limit definition, what is its instantaneous velocity $s'(t)$ at $t = 3$?",
              "choices": [
                "$2$ m/s",
                "$-3$ m/s",
                "$9$ m/s",
                "$6$ m/s"
              ],
              "answer": 0,
              "explain": "$\\frac{s(3+h)-s(3)}{h} = \\frac{(9+6h+h^2-12-4h)-(-3)}{h} = \\frac{2h+h^2}{h} = 2+h \\to 2$. The distractor $-3$ is the value of $s(3)$ itself, not the rate of change."
            },
            {
              "q": "For $f(x) = x^2$ at the point $x = 1$, what happens to the slope of the secant line as $h \\to 0$, and what does it approach?",
              "choices": [
                "It approaches the slope of the tangent line, which is $2$",
                "It approaches $0/0$, which is undefined, so no slope exists",
                "It stays constant at the average slope $1$ for all $h$",
                "It approaches $1$, the value of $f$ at $x=1$"
              ],
              "answer": 0,
              "explain": "The secant slope $\\frac{(1+h)^2-1}{h} = 2+h \\to 2$, the tangent slope. We never substitute $h=0$; we take a limit, so the $0/0$ objection does not apply, and the limit is a single finite number, not the constant or the function value."
            },
            {
              "q": "A student computes the difference quotient $\\frac{f(x+h)-f(x)}{h}$ for $f(x)=x^3$, simplifies to $3x^2 + 3xh + h^2$, then writes $f'(x) = 3x^2 + 3xh + h^2$. What is the error?",
              "choices": [
                "The algebraic simplification of the cubic is wrong",
                "They forgot to take the limit as $h \\to 0$, which removes the $h$-terms and gives $3x^2$",
                "The difference quotient should not have been simplified before taking the limit",
                "The derivative of $x^3$ cannot be found from the limit definition"
              ],
              "answer": 1,
              "explain": "The simplification is correct, but the difference quotient is not yet the derivative — one must take $\\lim_{h\\to 0}$, which sends the $3xh$ and $h^2$ terms to $0$, leaving $f'(x)=3x^2$. Leaving $h$ in the answer means the limit step was skipped."
            },
            {
              "q": "Which units correctly describe the derivative $f'(t)$ if $f(t)$ measures the temperature (in $^\\circ$C) of a cooling cup of coffee as a function of time $t$ (in minutes)?",
              "choices": [
                "$^\\circ$C $\\cdot$ min",
                "$^\\circ$C per minute",
                "$^\\circ$C",
                "minutes"
              ],
              "answer": 1,
              "explain": "The derivative is a limit of $\\frac{f(t+h)-f(t)}{h}$, whose units are (units of $f$)/(units of $t$) = $^\\circ$C/min — a rate of change. Plain $^\\circ$C are the units of $f$ itself, not its rate."
            },
            {
              "q": "Which of the following are all standard notations for the derivative of $y = f(x)$?",
              "choices": [
                "$\\int f\\,dx$, $\\;\\Delta y$, $\\;f(x)/x$",
                "$f^2(x)$, $\\;\\bar f$, $\\;|f|$",
                "$\\Delta f$, $\\;\\delta f$, $\\;\\partial^2 f$",
                "$f'(x)$, $\\;\\dfrac{dy}{dx}$, $\\;\\dfrac{df}{dx}$"
              ],
              "answer": 3,
              "explain": "$f'(x)$ (Lagrange/prime) and $\\dfrac{dy}{dx},\\ \\dfrac{df}{dx}$ (Leibniz) all denote the same object — the derivative. By contrast $\\int f\\,dx$ is an antiderivative, and $\\Delta y$ is a finite change, not the instantaneous rate."
            },
            {
              "q": "Using the limit definition, what is the derivative of a linear function $f(x) = mx + b$?",
              "choices": [
                "$mx$",
                "$b$",
                "$mx + b$",
                "$m$"
              ],
              "answer": 3,
              "explain": "$\\dfrac{f(x+h)-f(x)}{h} = \\dfrac{[m(x+h)+b]-[mx+b]}{h} = \\dfrac{mh}{h} = m$ for every $h$, so $f'(x)=m$ — a line has a constant slope. This is why linear approximation works: near a point a curve looks like a line of slope $f'(a)$."
            },
            {
              "q": "What does the second derivative $f''(x)$ measure?",
              "choices": [
                "the area under $f$",
                "the slope of $f$ at $x$",
                "the rate of change of the derivative — how the slope itself is changing (concavity; for position, acceleration)",
                "the original function $f$"
              ],
              "answer": 2,
              "explain": "$f''$ is the derivative of $f'$, so it measures how fast the slope is changing: $f''>0$ means the slope is increasing (concave up), $f''<0$ concave down. If $f$ is position, then $f'$ is velocity and $f''$ is acceleration."
            },
            {
              "q": "The quotient $\\dfrac{f(b)-f(a)}{b-a}$ over an interval gives the ___ rate of change, while the derivative gives the ___ rate.",
              "choices": [
                "average; instantaneous",
                "instantaneous; average",
                "total; partial",
                "maximum; minimum"
              ],
              "answer": 0,
              "explain": "$\\dfrac{f(b)-f(a)}{b-a}$ is the *average* rate of change over $[a,b]$ (the slope of the secant line). Shrinking the interval to a point — the limit as $b\\to a$ — gives the *instantaneous* rate $f'(a)$, the slope of the tangent line."
            }
          ],
          "flashcards": [
            {
              "front": "State the limit definition of the derivative $f'(x)$.",
              "back": "$f'(x) = \\lim_{h\\to 0}\\dfrac{f(x+h)-f(x)}{h}$ (equivalently $\\lim_{t\\to x}\\dfrac{f(t)-f(x)}{t-x}$), when the limit exists."
            },
            {
              "front": "What are the three interpretations of the derivative?",
              "back": "(1) Instantaneous rate of change of output per unit input; (2) slope of the tangent line at $(x,f(x))$; (3) slope of the best local linear approximation (linearization)."
            },
            {
              "front": "Equation of the tangent line / linearization at $x=a$.",
              "back": "$y = f(a) + f'(a)(x-a)$. Start at height $f(a)$, change at rate $f'(a)$."
            },
            {
              "front": "Does differentiability imply continuity, or vice versa?",
              "back": "Differentiable $\\Rightarrow$ continuous (one direction only). Continuous does NOT imply differentiable — e.g. $|x|$ at $0$."
            },
            {
              "front": "Give a continuous-but-not-differentiable example and the ML analog.",
              "back": "$f(x)=|x|$ has a corner at $0$ (difference quotient $\\to +1$ from right, $-1$ from left). ML analog: ReLU $\\max(0,x)$ and L1 loss/lasso, handled via subgradients."
            },
            {
              "front": "Why can't you just plug $h=0$ into the difference quotient?",
              "back": "It gives the indeterminate form $0/0$. You algebraically simplify (factor and cancel the $h$, valid since $h\\neq 0$), THEN take the limit."
            }
          ],
          "homework": [
            {
              "prompt": "Use the limit definition (not shortcut rules) to compute $f'(x)$ for $f(x) = \\frac{1}{x}$, and state where it fails to exist.",
              "hint": "Combine $\\frac{1}{x+h} - \\frac{1}{x}$ over a common denominator before dividing by $h$.",
              "solution": "Difference quotient: $\\frac{1}{h}\\left(\\frac{1}{x+h}-\\frac{1}{x}\\right) = \\frac{1}{h}\\cdot\\frac{x-(x+h)}{x(x+h)} = \\frac{1}{h}\\cdot\\frac{-h}{x(x+h)} = \\frac{-1}{x(x+h)}$. Let $h\\to 0$: $f'(x) = \\frac{-1}{x^2}$. It exists for all $x\\neq 0$; at $x=0$ the function is undefined so no derivative exists there."
            },
            {
              "prompt": "For $g(x) = \\sqrt{x}$, find the tangent line to the graph at $x = 9$ using $g'(x)=\\frac{1}{2\\sqrt{x}}$, then use it to estimate $\\sqrt{9.2}$.",
              "hint": "Tangent line is $y = g(a)+g'(a)(x-a)$ with $a=9$; the linearization gives the estimate at $x=9.2$.",
              "solution": "$g(9)=3$ and $g'(9)=\\frac{1}{2\\sqrt 9}=\\frac{1}{6}$. Tangent line: $y = 3 + \\frac{1}{6}(x-9)$. Estimate $\\sqrt{9.2}\\approx 3 + \\frac{1}{6}(0.2) = 3 + 0.0333\\ldots = 3.0333$. (True value $\\approx 3.0332$, so the linearization is excellent for small steps.)"
            },
            {
              "prompt": "Consider $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ 2x - 1 & x > 1 \\end{cases}$. Is $f$ continuous at $x=1$? Is it differentiable at $x=1$? Justify both.",
              "hint": "Check that the two pieces agree in value at $x=1$ (continuity), then check that the one-sided slopes agree (differentiability).",
              "solution": "Continuity: left value $1^2 = 1$; right limit $2(1)-1 = 1$; and $f(1)=1$. All equal, so $f$ is continuous at $1$. Differentiability: left derivative from $x^2$ is $2x = 2$ at $x=1$; right derivative from $2x-1$ is $2$. Both one-sided slopes equal $2$, so the two-sided derivative limit exists and $f'(1)=2$. Hence $f$ is BOTH continuous and differentiable at $1$ — the pieces meet smoothly with matching slope (note this is the tangent-line-like 'smooth gluing,' unlike $|x|$ where the slopes were $\\pm 1$)."
            }
          ],
          "examples": [
            {
              "title": "Slope of the tangent from the limit definition",
              "body": "Let $f(x) = x^2 - 4x + 1$. Use the limit definition of the derivative to find the slope of the tangent line to the curve at the point $x = 3$, and then write the equation of that tangent line.",
              "solution": "We want $f'(3)$, defined as the limit of the difference quotient $$f'(3) = \\lim_{h \\to 0} \\frac{f(3+h) - f(3)}{h}.$$\n\n<strong>Step 1 — evaluate the two function values.</strong> First the anchor point: $f(3) = 3^2 - 4(3) + 1 = 9 - 12 + 1 = -2$. Now the shifted point, expanding carefully: $$f(3+h) = (3+h)^2 - 4(3+h) + 1 = (9 + 6h + h^2) - (12 + 4h) + 1 = -2 + 2h + h^2.$$\n\n<strong>Step 2 — form the difference quotient.</strong> Subtract and notice the constant terms cancel: $$\\frac{f(3+h) - f(3)}{h} = \\frac{(-2 + 2h + h^2) - (-2)}{h} = \\frac{2h + h^2}{h}.$$\n\n<strong>Step 3 — cancel the $h$ (legal because $h \\neq 0$).</strong> Factor $h$ out of the numerator: $$\\frac{2h + h^2}{h} = \\frac{h(2 + h)}{h} = 2 + h.$$ This is the slope of the <em>secant</em> line for a step of size $h$; we never divided by zero.\n\n<strong>Step 4 — take the limit.</strong> Now that the expression is a polynomial in $h$, substitute $h = 0$: $$f'(3) = \\lim_{h\\to 0}(2 + h) = 2.$$\n\nThe tangent slope at $x = 3$ is $2$. The tangent passes through $(3, f(3)) = (3, -2)$ with slope $2$, so in point-slope form $y - (-2) = 2(x - 3)$, i.e. $$y = 2x - 8.$$\n\n<strong>Answer:</strong> $f'(3) = 2$, and the tangent line is $y = 2x - 8$."
            },
            {
              "title": "Instantaneous velocity for a square-root position function",
              "body": "A particle moves along a line so that its position (in meters) after $t$ seconds is $s(t) = \\sqrt{2t + 3}$. Using the limit definition of the derivative, find the particle's instantaneous velocity at $t = 3$ s.",
              "solution": "Instantaneous velocity is the derivative of position: $$v(3) = s'(3) = \\lim_{h\\to 0} \\frac{s(3+h) - s(3)}{h}.$$\n\n<strong>Step 1 — write out the difference quotient.</strong> Here $s(3) = \\sqrt{2(3)+3} = \\sqrt{9} = 3$, and $s(3+h) = \\sqrt{2(3+h)+3} = \\sqrt{9 + 2h}$. So $$\\frac{s(3+h) - s(3)}{h} = \\frac{\\sqrt{9 + 2h} - 3}{h}.$$ Substituting $h = 0$ directly gives $\\frac{0}{0}$, an indeterminate form — the square root blocks a clean cancellation, so we rationalize.\n\n<strong>Step 2 — multiply by the conjugate.</strong> Multiply top and bottom by $\\sqrt{9+2h} + 3$ to turn the difference of roots into a difference of squares: $$\\frac{\\sqrt{9+2h} - 3}{h}\\cdot\\frac{\\sqrt{9+2h} + 3}{\\sqrt{9+2h} + 3} = \\frac{(9 + 2h) - 9}{h\\left(\\sqrt{9+2h} + 3\\right)} = \\frac{2h}{h\\left(\\sqrt{9+2h} + 3\\right)}.$$\n\n<strong>Step 3 — cancel the $h$.</strong> Since $h \\neq 0$ throughout the limit process, we may cancel it from numerator and denominator: $$\\frac{2h}{h\\left(\\sqrt{9+2h} + 3\\right)} = \\frac{2}{\\sqrt{9+2h} + 3}.$$\n\n<strong>Step 4 — take the limit.</strong> The remaining expression is continuous at $h = 0$, so substitute: $$v(3) = \\lim_{h\\to 0}\\frac{2}{\\sqrt{9+2h} + 3} = \\frac{2}{\\sqrt{9} + 3} = \\frac{2}{3 + 3} = \\frac{1}{3}.$$\n\n<strong>Answer:</strong> the instantaneous velocity at $t = 3$ s is $v(3) = \\dfrac{1}{3}$ m/s. (Reassuringly positive and small — the position curve is rising but flattening, exactly what a square root does.)"
            },
            {
              "title": "When the derivative doesn't exist: a corner",
              "body": "The derivative is a limit — and a limit exists only if it agrees from both sides. Show that $f(x) = |x|$ has no derivative at $x = 0$.",
              "solution": "<strong>Set up the difference quotient.</strong> At $x = 0$, $f'(0) = \\lim_{h \\to 0} \\frac{|0 + h| - |0|}{h} = \\lim_{h \\to 0} \\frac{|h|}{h}$.\n<strong>From the right</strong> ($h \\gt 0$): then $|h| = h$, so $\\frac{|h|}{h} = \\frac{h}{h} = 1$.\n<strong>From the left</strong> ($h \\lt 0$): then $|h| = -h$, so $\\frac{|h|}{h} = \\frac{-h}{h} = -1$.\n<strong>The two-sided limit fails.</strong> The right limit is $+1$, the left is $-1$; since they disagree, $\\lim_{h \\to 0} |h|/h$ does not exist — so $f'(0)$ does not exist. Geometrically, $|x|$ has a <em>corner</em> at the origin: no single tangent line.\n<strong>The lesson.</strong> Continuity is not enough for differentiability — $|x|$ is continuous everywhere yet fails to be differentiable at its corner. A derivative needs the difference quotient to converge to <em>one</em> value, the same from both directions."
            }
          ]
        },
        {
          "id": "c-differentiation-rules",
          "title": "Power, Product, Quotient & Constant Rules",
          "minutes": 14,
          "content": "<h3>From limits to rules: why we need shortcuts</h3>\n<p>You already know the formal definition of the derivative:</p>\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}.$$\n<p>This limit is the <em>ground truth</em> of differentiation — but computing it by hand for every function is slow and error-prone. The whole point of this lesson is to never have to take that limit again for ordinary algebraic functions. We will derive a small toolkit of <strong>algebraic rules</strong> that let you read off a derivative the way you read off a sum. Each rule is itself <em>proved</em> from the limit, so you keep the rigor while gaining the speed.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Backpropagation is nothing more than these rules applied billions of times by a computer. Every framework — PyTorch, JAX, TensorFlow — implements the power rule, the product rule, and (via the chain rule, next lesson) automatic differentiation. Understanding <em>which rule fires when</em> is exactly the bookkeeping an autodiff engine does in its computational graph. The intuition you build here is the intuition behind gradient computation.</p>\n</div>\n\n<h3>The constant rule and the constant-multiple rule</h3>\n<h4>Derivative of a constant</h4>\n<p>If $f(x) = c$ for a constant $c$, the graph is a flat horizontal line — its slope is zero everywhere. Formally:</p>\n$$\\frac{d}{dx}[c] = \\lim_{h \\to 0} \\frac{c - c}{h} = \\lim_{h \\to 0} \\frac{0}{h} = 0.$$\n<p>The function never changes, so its rate of change is $0$.</p>\n\n<h4>Constant-multiple rule</h4>\n<p>Scaling a function vertically by a factor $c$ scales its slope by the same factor:</p>\n$$\\frac{d}{dx}\\big[c \\cdot f(x)\\big] = c \\cdot f'(x).$$\n<p>This follows immediately because the constant $c$ factors out of the limit. Intuitively, if you stretch a curve twice as tall, every slope doubles.</p>\n\n<p><b>Try it in code.</b> Estimate a derivative numerically from the difference quotient — the very limit these rules are shortcuts for.</p>\n<div data-code=\"javascript\" data-expected=\"6.001\">// Estimate the derivative of f(x) = x^2 at x = 3\n// from the difference quotient with a tiny step h.\nconst f = x => x * x;\nconst x0 = 3, h = 0.001;\nconst slope = (f(x0 + h) - f(x0)) / h;\nconsole.log(slope.toFixed(3));   // approaches the exact f'(3) = 6</div>\n<h3>The power rule</h3>\n<p>The single most-used rule in all of calculus:</p>\n$$\\boxed{\\;\\frac{d}{dx}\\big[x^n\\big] = n\\,x^{n-1}\\;}$$\n<p>It holds for <em>any</em> real exponent $n$ — positive integers, negative integers, fractions, irrationals. \"Bring the power down in front, then subtract one from the power.\"</p>\n\n<h4>Why it's true (integer case)</h4>\n<p>For a positive integer $n$, expand $(x+h)^n$ with the binomial theorem:</p>\n$$(x+h)^n = x^n + n\\,x^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n.$$\n<p>Subtract $x^n$, divide by $h$:</p>\n$$\\frac{(x+h)^n - x^n}{h} = n\\,x^{n-1} + \\binom{n}{2}x^{n-2}h + \\cdots + h^{n-1}.$$\n<p>Every term after the first still contains a factor of $h$, so as $h \\to 0$ they vanish and only $n\\,x^{n-1}$ survives. That's the power rule.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of $x^n$ as the volume of an $n$-dimensional cube of side $x$. Nudging the side by a tiny $h$ adds a thin slab on each of the $n$ faces, each slab of \"area\" $x^{n-1}$. The total new material is $\\approx n\\,x^{n-1}h$, so the rate of growth is $n\\,x^{n-1}$. The higher-order corners ($h^2$ and smaller) are negligible.</p>\n</div>\n\n<h4>Negative and fractional exponents</h4>\n<p>The power rule shines when you first <em>rewrite</em> roots and reciprocals as powers:</p>\n<ul>\n<li>$\\dfrac{1}{x} = x^{-1} \\;\\Rightarrow\\; \\dfrac{d}{dx}\\Big[\\dfrac{1}{x}\\Big] = -1\\cdot x^{-2} = -\\dfrac{1}{x^2}$</li>\n<li>$\\sqrt{x} = x^{1/2} \\;\\Rightarrow\\; \\dfrac{d}{dx}\\big[\\sqrt{x}\\big] = \\dfrac{1}{2}x^{-1/2} = \\dfrac{1}{2\\sqrt{x}}$</li>\n<li>$\\dfrac{1}{x^3} = x^{-3} \\;\\Rightarrow\\; \\dfrac{d}{dx}\\Big[\\dfrac{1}{x^3}\\Big] = -3x^{-4} = -\\dfrac{3}{x^4}$</li>\n</ul>\n<p>Rewriting first is the cleanest way to differentiate; only fall back to the quotient rule when the denominator is genuinely a non-trivial expression.</p>\n\n<h3>The sum rule and differentiating polynomials</h3>\n<p>The derivative of a sum is the sum of the derivatives:</p>\n$$\\frac{d}{dx}\\big[f(x) + g(x)\\big] = f'(x) + g'(x).$$\n<p>This is because the limit of a sum is the sum of the limits. We say differentiation is a <strong>linear operator</strong>: combining the sum rule and the constant-multiple rule gives</p>\n$$\\frac{d}{dx}\\big[a\\,f(x) + b\\,g(x)\\big] = a\\,f'(x) + b\\,g'(x).$$\n<p>Together these three facts (power, constant-multiple, sum) let you differentiate <em>any</em> polynomial term by term. Example:</p>\n$$\\frac{d}{dx}\\big[7x^4 - 3x^2 + 5x - 9\\big] = 28x^3 - 6x + 5.$$\n<p>Note how the constant $-9$ vanishes and the linear term $5x$ contributes its slope $5$.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Linearity is profound. It means differentiation respects vector-space structure: the set of differentiable functions is a vector space, and $\\frac{d}{dx}$ is a linear map on it. This is exactly why the gradient $\\nabla$ in ML is linear in the loss — the gradient of a sum of per-example losses is the sum of the per-example gradients, which is what makes mini-batch training and the entire structure of $\\nabla\\big(\\sum_i \\mathcal{L}_i\\big) = \\sum_i \\nabla \\mathcal{L}_i$ work.</p>\n</div>\n\n<h3>The product rule</h3>\n<p>Here is the rule people most often get wrong. The derivative of a product is <strong>not</strong> the product of the derivatives. Instead:</p>\n$$\\boxed{\\;\\frac{d}{dx}\\big[f(x)\\,g(x)\\big] = f'(x)\\,g(x) + f(x)\\,g'(x)\\;}$$\n<p>In words: \"derivative of the first times the second, plus the first times the derivative of the second.\"</p>\n\n<h4>Why it's true</h4>\n<p>Form the difference quotient and add-and-subtract a clever middle term:</p>\n$$\\frac{f(x+h)g(x+h) - f(x)g(x)}{h}.$$\n<p>Insert $-f(x+h)g(x) + f(x+h)g(x)$ (which is zero) into the numerator and regroup:</p>\n$$= f(x+h)\\cdot\\frac{g(x+h)-g(x)}{h} + g(x)\\cdot\\frac{f(x+h)-f(x)}{h}.$$\n<p>As $h \\to 0$: $f(x+h) \\to f(x)$, the first quotient $\\to g'(x)$, the second $\\to f'(x)$. We get $f(x)g'(x) + g(x)f'(x)$. Done.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Picture a rectangle with width $f$ and height $g$, so its area is $f\\cdot g$. Grow the width a little ($f'$) and the height grows a little ($g'$). The area gained is one strip along the height ($f'\\,g$) plus one strip along the width ($f\\,g'$). The tiny corner square ($f'g' \\cdot$ higher order) is negligible. Two terms, one per dimension you wiggled — that's why there are <em>two</em> terms, not one.</p>\n</div>\n\n<h3>The quotient rule</h3>\n<p>For a ratio $\\dfrac{f(x)}{g(x)}$ with $g(x) \\neq 0$:</p>\n$$\\boxed{\\;\\frac{d}{dx}\\!\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)\\,g(x) - f(x)\\,g'(x)}{\\big[g(x)\\big]^2}\\;}$$\n<p>The order in the numerator matters — it's \"low d-high minus high d-low, over low squared,\" a common mnemonic where \"low\" $=g$ and \"high\" $=f$. The minus sign and the squared denominator are the two things to never forget.</p>\n\n<h4>A memory aid that's also a derivation</h4>\n<p>Write $\\dfrac{f}{g} = f \\cdot g^{-1}$ and use the product rule plus (a peek at) the chain rule: $\\frac{d}{dx}[g^{-1}] = -g^{-2}g'$. Then</p>\n$$\\frac{d}{dx}\\big[f g^{-1}\\big] = f' g^{-1} + f\\cdot(-g^{-2}g') = \\frac{f'}{g} - \\frac{fg'}{g^2} = \\frac{f'g - fg'}{g^2}.$$\n<p>So the quotient rule is not a separate axiom — it's the product rule in disguise.</p>\n\n<h3>Choosing the right rule</h3>\n<p>Before differentiating, classify the expression's <em>top-level structure</em>:</p>\n<ul>\n<li><strong>A sum/difference of terms?</strong> Differentiate term by term (linearity). Most polynomials live here.</li>\n<li><strong>A single term that's a power (after rewriting roots/reciprocals)?</strong> Power rule.</li>\n<li><strong>Two genuinely different factors multiplied?</strong> Product rule — e.g. $x^2(3x-1)$ <em>or</em> just expand it first.</li>\n<li><strong>A ratio whose denominator isn't a single power of $x$?</strong> Quotient rule — e.g. $\\dfrac{x+1}{x^2+3}$.</li>\n</ul>\n<p>Pro tip: always ask \"can I simplify <em>before</em> differentiating?\" Expanding a product or splitting a fraction often turns a product/quotient problem into a trivial power-rule problem and eliminates a class of sign errors.</p>\n\n<h3>Fully worked example</h3>\n<p>Differentiate $\\displaystyle h(x) = \\frac{x^2 + 1}{x^3}$ in two ways and confirm they agree.</p>\n<p><strong>Method 1 — rewrite, then power rule (preferred).</strong> Split the fraction:</p>\n$$h(x) = \\frac{x^2}{x^3} + \\frac{1}{x^3} = x^{-1} + x^{-3}.$$\n$$h'(x) = -x^{-2} - 3x^{-4} = -\\frac{1}{x^2} - \\frac{3}{x^4}.$$\n<p><strong>Method 2 — quotient rule.</strong> Let $f = x^2+1$, $g = x^3$, so $f' = 2x$, $g' = 3x^2$:</p>\n$$h'(x) = \\frac{(2x)(x^3) - (x^2+1)(3x^2)}{(x^3)^2} = \\frac{2x^4 - 3x^4 - 3x^2}{x^6} = \\frac{-x^4 - 3x^2}{x^6}.$$\n<p>Simplify by dividing numerator and denominator by $x^2$:</p>\n$$h'(x) = \\frac{-x^2 - 3}{x^4} = -\\frac{1}{x^2} - \\frac{3}{x^4}.$$\n<p>Both methods give the identical answer — and notice Method 1 was far less error-prone. When a quotient can be rewritten, rewrite it.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>Constant: $\\frac{d}{dx}[c] = 0$. Constant multiple: $\\frac{d}{dx}[cf] = cf'$.</li>\n<li>Power: $\\frac{d}{dx}[x^n] = nx^{n-1}$ for all real $n$; rewrite roots and reciprocals as powers first.</li>\n<li>Sum/linearity: $\\frac{d}{dx}[af+bg] = af'+bg'$; differentiate polynomials term by term.</li>\n<li>Product: $f'g + fg'$ (two terms — one per factor wiggled).</li>\n<li>Quotient: $\\dfrac{f'g - fg'}{g^2}$ (mind the minus sign and the squared denominator).</li>\n<li>Strategy: identify the top-level structure, and simplify before differentiating whenever possible.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-derivative\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the rules are linearity plus product/chain structure</summary>\n<p>The differentiation rules are not a grab-bag to memorize — they follow from how the derivative interacts with the operations that build functions. <b>Linearity</b>: $(af + bg)' = af' + bg'$ — the derivative of a sum is the sum of derivatives, and constants pull out. That is why you can differentiate a polynomial term by term.</p>\n<p>The two non-linear rules capture how rates combine. The <b>product rule</b> $(fg)' = f'g + fg'$ — two varying factors each contribute, weighted by the other (the rectangle-area picture). The <b>chain rule</b> $(f \\circ g)' = f'(g)\\,g'$ — composed functions multiply their rates. The <b>quotient rule</b> is just the product rule on $f \\cdot g^{-1}$. Together with a handful of base derivatives ($x^n$, $\\sin$, $e^x$, $\\ln$), these compose to differentiate <em>anything</em> built from them.</p>\n<p>The \"aha\": you do not memorize a rule per function — you learn how the derivative distributes over $+$, $\\times$, and $\\circ$, plus a few atoms. Every differentiation is then a mechanical descent through the expression tree: linearity at sums, the product rule at products, the chain rule at compositions.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: logarithmic differentiation</summary>\n<p>The product, quotient, and chain rules cover most derivatives — but some functions resist them directly, and a single trick cracks them: take the <b>logarithm first</b>.</p>\n<p><b>The move.</b> To differentiate $y = f(x)$, write $\\ln y = \\ln f(x)$, differentiate <em>implicitly</em> (the left side gives $\\tfrac{y'}{y}$), then solve $y' = y \\cdot \\tfrac{d}{dx}\\ln f(x)$. Logs turn the hard structure soft: products become sums ($\\ln(ab)=\\ln a+\\ln b$), quotients become differences, and exponents come down as factors ($\\ln a^b = b\\ln a$).</p>\n<p><b>The case nothing else handles: a variable base <em>and</em> exponent.</b> For $y = x^x$, neither the power rule (the exponent is not constant) nor the exponential rule (the base is not constant) applies. Take logs: $\\ln y = x\\ln x$, so $\\tfrac{y'}{y} = \\ln x + 1$, giving $y' = x^x(\\ln x + 1)$. (Check at $x=1$: $y' = 1\\cdot(0+1) = 1$.)</p>\n<p><b>Also a shortcut for big products.</b> A messy $y = \\tfrac{(x^2+1)^3\\sqrt{x-1}}{(3x+2)^5}$ becomes a <em>sum</em> of simple log terms before differentiating — far easier than nested product and quotient rules.</p>\n<p>The \"aha\": when a derivative is tangled by products, quotients, or a variable exponent, differentiate its <em>logarithm</em> instead. Logs flatten multiplication into addition, and $\\tfrac{y'}{y}$ hands you $y'$ back — the rule that reaches what the basic rules cannot.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: where derivatives don't exist (kinks, corners, and subgradients)</summary>\n<p>The rules (the other dives) assume the derivative <em>exists</em>. But plenty of useful functions have points where it does not — and those points matter enormously in machine learning.</p>\n<p><b>Where it breaks.</b> A derivative fails to exist at a <em>corner</em> (the slope jumps, like $|x|$ at $0$: $-1$ from the left, $+1$ from the right), a <em>cusp</em> (the slope shoots to $\\pm\\infty$, like $x^{2/3}$ at $0$), a <em>vertical tangent</em>, or any <em>discontinuity</em>. The test: the left and right difference quotients must agree.</p>\n<p><b>Why ML cares.</b> Two of its workhorses have corners. <em>ReLU</em>, $\\max(0,x)$, has a kink at $0$. The <em>L1 penalty</em>, $|w|$, has one too — and that corner is exactly why L1 drives weights to <em>exactly</em> zero (sparsity). Gradient descent still needs <em>some</em> slope there, so we use a <strong>subgradient</strong>: any value between the left and right slopes (for $|x|$ at $0$, anything in $[-1,1]$) is a valid descent direction. Subgradient methods optimize these non-smooth objectives perfectly well.</p>\n<p>The \"aha\": derivatives can fail to exist — at corners, cusps, vertical tangents, jumps — wherever the left and right slopes disagree. ML lives with this: ReLU and the L1 penalty have kinks, and we just pick a <em>subgradient</em> (any slope between the one-sided ones) to keep optimizing.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What is $\\dfrac{d}{dx}\\big[x^2 \\cdot x^3\\big]$?",
              "choices": [
                "$2x \\cdot 3x^2 = 6x^3$ (product of the derivatives)",
                "$6x^5$",
                "$5x^4$",
                "$x^4 + x^4 = 2x^4$"
              ],
              "answer": 2,
              "explain": "The product of the derivatives is wrong. Simplify first: $x^2 x^3 = x^5$, so the derivative is $5x^4$. The product rule gives the same: $2x\\cdot x^3 + x^2\\cdot 3x^2 = 5x^4$."
            },
            {
              "q": "Differentiate $f(x) = \\dfrac{1}{x^4}$.",
              "choices": [
                "$-\\dfrac{4}{x^5}$",
                "$\\dfrac{1}{4x^3}$",
                "$-\\dfrac{1}{4x^3}$",
                "$\\dfrac{4}{x^3}$"
              ],
              "answer": 0,
              "explain": "Rewrite as $x^{-4}$; the power rule gives $-4x^{-5} = -4/x^5$. Forgetting the negative exponent's sign is the classic error."
            },
            {
              "q": "For $\\dfrac{f}{g}$, which sign convention is correct in the numerator of the quotient rule?",
              "choices": [
                "$fg' - f'g$ over $g^2$",
                "$f'g - fg'$ over $g$",
                "$f'g + fg'$ over $g^2$",
                "$f'g - fg'$ over $g^2$"
              ],
              "answer": 3,
              "explain": "The quotient rule is $(f'g - fg')/g^2$: derivative of top times bottom, minus top times derivative of bottom, all over bottom squared. The order of subtraction and the squared denominator are both essential."
            },
            {
              "q": "Why does differentiation distribute over a sum, i.e. $(f+g)' = f' + g'$?",
              "choices": [
                "It is an unprovable axiom of calculus",
                "Because of the binomial theorem",
                "Because constants have zero derivative",
                "Because the limit of a sum equals the sum of the limits, making $d/dx$ a linear operator"
              ],
              "answer": 3,
              "explain": "The difference quotient of $f+g$ splits into the difference quotients of $f$ and $g$, and the limit of a sum is the sum of limits. This linearity underlies why gradients of summed losses split across examples in ML."
            },
            {
              "q": "Using the power rule, what is $\\dfrac{d}{dx}\\big[x^{3/2}\\big]$?",
              "choices": [
                "$\\dfrac{2}{3}x^{5/2}$",
                "$\\dfrac{3}{2}x^{1/2}$",
                "$\\dfrac{3}{2}x^{3/2}$",
                "$\\dfrac{1}{2}x^{1/2}$"
              ],
              "answer": 1,
              "explain": "Bring the power down in front and subtract one: $\\frac{3}{2}x^{3/2-1} = \\frac{3}{2}x^{1/2}$, valid since the power rule holds for any real exponent."
            },
            {
              "q": "When proving the power rule via the binomial expansion of $(x+h)^n$, why do all terms except $n\\,x^{n-1}$ disappear as $h \\to 0$?",
              "choices": [
                "Every remaining term still contains a factor of $h$, which goes to zero",
                "The binomial coefficients $\\binom{n}{k}$ all equal zero for $k \\ge 2$",
                "Those terms cancel against the subtracted $x^n$",
                "The limit definition only keeps the first term by convention"
              ],
              "answer": 0,
              "explain": "After subtracting $x^n$ and dividing by $h$, every term beyond $n\\,x^{n-1}$ retains at least one factor of $h$, so each vanishes in the limit."
            },
            {
              "q": "Given $f'(x) = 4x$, what is $\\dfrac{d}{dx}\\big[7\\,f(x)\\big]$?",
              "choices": [
                "$28x$",
                "$4x$",
                "$7 + 4x$",
                "$11x$"
              ],
              "answer": 0,
              "explain": "By the constant-multiple rule the factor pulls out of the limit, so $\\frac{d}{dx}[7f(x)] = 7f'(x) = 7 \\cdot 4x = 28x$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}\\big[\\pi^2\\big]$?",
              "choices": [
                "$2\\pi$",
                "$2\\pi^2$",
                "$\\pi$",
                "$0$"
              ],
              "answer": 3,
              "explain": "$\\pi^2$ is a constant (not a variable raised to a power), so by the constant rule its derivative is $0$."
            },
            {
              "q": "Differentiate $f(x) = x^2(3x - 1)$ using the product rule.",
              "choices": [
                "$2x \\cdot 3 = 6x$",
                "$9x^2 - 2x$",
                "$3x^2 - x$",
                "$6x^2$"
              ],
              "answer": 1,
              "explain": "With $f'=2x,\\,g=3x-1$ and $g'=3$: $2x(3x-1) + x^2(3) = 6x^2 - 2x + 3x^2 = 9x^2 - 2x$. Expanding first to $3x^3 - x^2$ then differentiating gives the same $9x^2 - 2x$; the tempting $2x\\cdot 3$ wrongly multiplies the two derivatives."
            },
            {
              "q": "A student claims $\\dfrac{d}{dx}\\big[f(x)g(x)\\big] = f'(x)g'(x)$. What is the single best reason this is wrong?",
              "choices": [
                "The correct rule is $f'(x)g'(x)$ but with the factors in the opposite order",
                "It is actually correct whenever both $f$ and $g$ are polynomials",
                "The product rule has two terms because wiggling each factor contributes its own strip of area; $f'g'$ keeps only the negligible corner",
                "Products can never be differentiated without first expanding them"
              ],
              "answer": 2,
              "explain": "The rectangle-area picture shows the change in $fg$ comes from a strip $f'g$ plus a strip $fg'$; the product $f'g'$ corresponds only to the tiny corner square, a higher-order term that vanishes. So the correct rule is the two-term $f'g + fg'$, never $f'g'$."
            },
            {
              "q": "What is the fastest correct way to find $\\dfrac{d}{dx}\\!\\left[\\dfrac{x^3 + x}{x}\\right]$, and what is the result?",
              "choices": [
                "Apply the quotient rule directly to get $\\dfrac{3x^2+1}{x}$",
                "The expression cannot be simplified, so the quotient rule gives $3x^2$",
                "Differentiate top and bottom separately to get $\\dfrac{3x^2+1}{1}$",
                "Simplify to $x^2 + 1$ first, then differentiate to get $2x$"
              ],
              "answer": 3,
              "explain": "Splitting the fraction gives $\\frac{x^3}{x} + \\frac{x}{x} = x^2 + 1$, whose derivative is $2x$ by the power and constant rules. Simplifying before differentiating avoids the quotient rule entirely and the sign errors that come with it; differentiating numerator and denominator separately is never valid."
            },
            {
              "q": "The lesson derives the quotient rule by writing $\\dfrac{f}{g} = f\\cdot g^{-1}$. What does this show about the quotient rule?",
              "choices": [
                "That the quotient rule follows from the product rule combined with differentiating $g^{-1}$",
                "That the quotient rule is a separate axiom independent of the other rules",
                "That the quotient rule only works when $f$ and $g$ are powers of $x$",
                "That $\\dfrac{f}{g}$ and $f\\cdot g^{-1}$ have different derivatives"
              ],
              "answer": 0,
              "explain": "Treating $f/g$ as $f\\cdot g^{-1}$ and applying the product rule (with $\\frac{d}{dx}[g^{-1}] = -g^{-2}g'$) reproduces $\\frac{f'g - fg'}{g^2}$ exactly. So the quotient rule is not a new axiom — it is the product rule in disguise, valid for any differentiable $f,g$ with $g\\neq 0$."
            },
            {
              "q": "The power rule states that $\\dfrac{d}{dx}\\big[x^n\\big]$ equals:",
              "choices": [
                "$x^{n-1}$",
                "$n\\,x^{n-1}$",
                "$n\\,x^n$",
                "$(n-1)\\,x^n$"
              ],
              "answer": 1,
              "explain": "Bring the exponent down as a coefficient and reduce it by one: $\\dfrac{d}{dx}x^n = n\\,x^{n-1}$. It holds for any real $n$ — e.g. $\\frac{d}{dx}x^3 = 3x^2$, $\\frac{d}{dx}x^{1/2} = \\tfrac12 x^{-1/2}$, $\\frac{d}{dx}x^{-1} = -x^{-2}$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}[x]$?",
              "choices": [
                "$0$",
                "$1$",
                "$x^2$",
                "$x$"
              ],
              "answer": 1,
              "explain": "$x = x^1$, so by the power rule $\\frac{d}{dx}x = 1\\cdot x^0 = 1$. Geometrically the line $y=x$ has constant slope $1$. (Contrast $\\frac{d}{dx}[c] = 0$ for a constant.)"
            },
            {
              "q": "The product rule states that $(fg)'$ equals:",
              "choices": [
                "$f'g - fg'$",
                "$f'g'$",
                "$f'g + fg'$",
                "$fg$"
              ],
              "answer": 2,
              "explain": "$(fg)' = f'g + fg'$ — differentiate each factor in turn and add. It is *not* $f'g'$: e.g. $\\frac{d}{dx}[x\\cdot x] = 1\\cdot x + x\\cdot 1 = 2x$, matching $\\frac{d}{dx}x^2$, whereas $f'g'$ would give $1$."
            },
            {
              "q": "Differentiate $f(x) = 3x^4 - 2x + 7$.",
              "choices": [
                "$12x^3 - 2x$",
                "$12x^3 - 2 + 7$",
                "$12x^3 - 2$",
                "$3x^3 - 2$"
              ],
              "answer": 2,
              "explain": "Apply the power, constant-multiple, sum, and constant rules term by term: $\\frac{d}{dx}3x^4 = 12x^3$, $\\frac{d}{dx}(-2x) = -2$, and $\\frac{d}{dx}7 = 0$. So $f'(x) = 12x^3 - 2$ — the constant $7$ vanishes."
            }
          ],
          "flashcards": [
            {
              "front": "Power rule: $\\dfrac{d}{dx}[x^n] = ?$",
              "back": "$n\\,x^{n-1}$, valid for every real exponent $n$ (integer, negative, fractional)."
            },
            {
              "front": "Product rule: $\\dfrac{d}{dx}[fg] = ?$",
              "back": "$f'g + fg'$ — derivative of the first times the second, plus the first times the derivative of the second."
            },
            {
              "front": "Quotient rule: $\\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = ?$",
              "back": "$\\dfrac{f'g - fg'}{g^2}$ — low d-high minus high d-low, over low squared."
            },
            {
              "front": "Derivative of a constant $c$, and the constant-multiple rule?",
              "back": "$\\dfrac{d}{dx}[c] = 0$; and $\\dfrac{d}{dx}[c\\,f] = c\\,f'$ (the constant factors out)."
            },
            {
              "front": "Why is $\\dfrac{d}{dx}$ called a linear operator?",
              "back": "Because $\\dfrac{d}{dx}[a f + b g] = a f' + b g'$ — it respects scalar multiples and sums, so polynomials differentiate term by term."
            },
            {
              "front": "How do you differentiate $\\sqrt{x}$ and $\\dfrac{1}{x}$?",
              "back": "Rewrite as powers: $\\sqrt{x}=x^{1/2}\\to \\tfrac{1}{2}x^{-1/2}=\\tfrac{1}{2\\sqrt{x}}$; $\\tfrac{1}{x}=x^{-1}\\to -x^{-2}=-\\tfrac{1}{x^2}$."
            }
          ],
          "homework": [
            {
              "prompt": "Differentiate $f(x) = 5x^3 - \\dfrac{2}{x^2} + 4\\sqrt{x} - 7$.",
              "hint": "Rewrite every term as a power of $x$ first: $\\dfrac{2}{x^2} = 2x^{-2}$ and $4\\sqrt{x} = 4x^{1/2}$. Then apply the power rule term by term and remember the constant $-7$ vanishes.",
              "solution": "Rewrite: $f(x) = 5x^3 - 2x^{-2} + 4x^{1/2} - 7$. Differentiate each term: $\\frac{d}{dx}[5x^3] = 15x^2$; $\\frac{d}{dx}[-2x^{-2}] = -2\\cdot(-2)x^{-3} = 4x^{-3}$; $\\frac{d}{dx}[4x^{1/2}] = 4\\cdot\\tfrac{1}{2}x^{-1/2} = 2x^{-1/2}$; $\\frac{d}{dx}[-7] = 0$. So $f'(x) = 15x^2 + \\dfrac{4}{x^3} + \\dfrac{2}{\\sqrt{x}}$."
            },
            {
              "prompt": "Use the product rule to differentiate $g(x) = (2x^2 + 1)(x^3 - 5x)$. Then check your answer by expanding first.",
              "hint": "Let $f = 2x^2+1$ (so $f' = 4x$) and $h = x^3 - 5x$ (so $h' = 3x^2 - 5$). Apply $f'h + fh'$, then collect like terms.",
              "solution": "Product rule: $g'(x) = f'h + fh' = (4x)(x^3 - 5x) + (2x^2+1)(3x^2 - 5)$. Expand: $(4x^4 - 20x^2) + (6x^4 - 10x^2 + 3x^2 - 5) = 4x^4 - 20x^2 + 6x^4 - 7x^2 - 5 = 10x^4 - 27x^2 - 5$. Check by expanding first: $g(x) = 2x^5 - 10x^3 + x^3 - 5x = 2x^5 - 9x^3 - 5x$, so $g'(x) = 10x^4 - 27x^2 - 5$. The answers match."
            },
            {
              "prompt": "Differentiate $r(x) = \\dfrac{x^2 - 1}{x^2 + 1}$ using the quotient rule, and simplify.",
              "hint": "Let $f = x^2-1$ ($f' = 2x$) and $g = x^2+1$ ($g' = 2x$). Plug into $(f'g - fg')/g^2$ and watch the numerator cancellation.",
              "solution": "Quotient rule: $r'(x) = \\dfrac{(2x)(x^2+1) - (x^2-1)(2x)}{(x^2+1)^2}$. Factor $2x$ from the numerator: $2x\\big[(x^2+1) - (x^2-1)\\big] = 2x\\cdot 2 = 4x$. Therefore $r'(x) = \\dfrac{4x}{(x^2+1)^2}$. This is positive for $x>0$ and negative for $x<0$, confirming $r$ has a minimum at $x=0$ (where $r(0) = -1$)."
            }
          ],
          "examples": [
            {
              "title": "Differentiating a Polynomial Term by Term",
              "body": "Find the derivative of $f(x) = 4x^5 - 3x^2 + 7x - 9$. Use the power rule together with the constant-multiple, sum, and constant rules.",
              "solution": "We differentiate one term at a time. The <strong>sum rule</strong> lets us split the work, and the <strong>constant-multiple rule</strong> lets us pull each coefficient outside the derivative.\n\n<strong>Term 1:</strong> $\\frac{d}{dx}[4x^5] = 4 \\cdot 5x^{4} = 20x^4$ by the power rule $\\frac{d}{dx}[x^n] = nx^{n-1}$.\n\n<strong>Term 2:</strong> $\\frac{d}{dx}[-3x^2] = -3 \\cdot 2x^{1} = -6x$.\n\n<strong>Term 3:</strong> $\\frac{d}{dx}[7x] = 7 \\cdot 1x^{0} = 7$, since $x^0 = 1$.\n\n<strong>Term 4:</strong> $\\frac{d}{dx}[-9] = 0$ by the constant rule — a constant has zero slope.\n\nAdding the pieces together:\n$$f'(x) = 20x^4 - 6x + 7.$$\n\n<strong>Answer:</strong> $f'(x) = 20x^4 - 6x + 7$."
            },
            {
              "title": "Quotient Rule with a Negative Exponent Check",
              "body": "Differentiate $g(x) = \\dfrac{x^2 + 1}{x - 3}$ using the quotient rule, then evaluate the slope at $x = 1$.",
              "solution": "The <strong>quotient rule</strong> states that for $g(x) = \\dfrac{u}{v}$,\n$$g'(x) = \\frac{u'v - uv'}{v^2}.$$\n\nIdentify the pieces:\n- $u = x^2 + 1 \\;\\Rightarrow\\; u' = 2x$ (power rule on $x^2$, constant rule on $1$).\n- $v = x - 3 \\;\\Rightarrow\\; v' = 1$ (power rule on $x$, constant rule on $-3$).\n\nSubstitute into the formula:\n$$g'(x) = \\frac{(2x)(x-3) - (x^2+1)(1)}{(x-3)^2}.$$\n\nExpand the numerator carefully:\n$$2x(x-3) = 2x^2 - 6x, \\qquad (x^2 + 1)(1) = x^2 + 1.$$\n$$\\text{numerator} = (2x^2 - 6x) - (x^2 + 1) = x^2 - 6x - 1.$$\n\nSo\n$$g'(x) = \\frac{x^2 - 6x - 1}{(x-3)^2}.$$\n\n<strong>Evaluate at $x = 1$:</strong>\n$$g'(1) = \\frac{(1)^2 - 6(1) - 1}{(1-3)^2} = \\frac{1 - 6 - 1}{(-2)^2} = \\frac{-6}{4} = -\\frac{3}{2}.$$\n\n<strong>Answer:</strong> $g'(x) = \\dfrac{x^2 - 6x - 1}{(x-3)^2}$, and the slope at $x = 1$ is $-\\dfrac{3}{2}$."
            },
            {
              "title": "The product rule",
              "body": "Differentiate $f(x) = x^2 \\sin x$. It is a product of two functions, so neither the power rule nor term-by-term differentiation applies directly.",
              "solution": "<strong>The product rule.</strong> For a product $f = u \\cdot v$, the derivative is $f' = u'v + uv'$ — <em>not</em> $u'v'$ (a common trap). Differentiate each factor in turn, keeping the other intact.\n<strong>Apply it.</strong> With $u = x^2$ (so $u' = 2x$) and $v = \\sin x$ (so $v' = \\cos x$):\n$$f'(x) = (2x)(\\sin x) + (x^2)(\\cos x) = 2x \\sin x + x^2 \\cos x.$$\n<strong>Why it isn't $u'v'$.</strong> Picture a rectangle with sides $u$ and $v$; its area is $uv$. Nudge $x$ a little: the area grows by a strip along the $v$ side ($u'v$) plus a strip along the $u$ side ($uv'$). The two contributions add — and the tiny corner term vanishes in the limit.\n<strong>The takeaway.</strong> The product rule is the workhorse behind the chain rule and integration by parts: whenever two varying quantities multiply, their rates of change combine additively, each weighted by the other's current value."
            }
          ]
        },
        {
          "id": "c-chain-rule",
          "title": "The Chain Rule & Composite Functions",
          "minutes": 16,
          "content": "<h3>The Chain Rule: Differentiating Functions Inside Functions</h3>\n\n<p>Almost nothing interesting in the real world is a single, atomic function. Quantities depend on quantities that depend on other quantities. Temperature depends on time of day; energy cost depends on temperature; your bill depends on energy cost. The <strong>chain rule</strong> is the tool that lets us differentiate through that entire chain of dependence — and it is, quite literally, the mathematical engine that makes modern deep learning possible.</p>\n\n<p>If you understand one rule of calculus deeply, make it this one. A neural network with a billion parameters is, structurally, a gigantic composite function, and training it is nothing more than the chain rule applied a billion times in a clever order. We'll build the intuition, state the formalism carefully, work through nested examples, and then connect it directly to <strong>backpropagation</strong>.</p>\n\n<h3>What is a composite function?</h3>\n\n<p>A <strong>composite function</strong> is what you get when you feed the output of one function into another. If $u = g(x)$ and $y = f(u)$, then $y = f(g(x))$ is the composition, written $f \\circ g$. We call $f$ the <strong>outer function</strong> and $g$ the <strong>inner function</strong>.</p>\n\n<p>Concretely, take $y = \\sin(x^2)$. Here the inner function is $u = g(x) = x^2$, and the outer function is $y = f(u) = \\sin(u)$. To evaluate at $x=3$: first compute $u = 9$, then $\\sin(9)$. The order matters enormously — $\\sin(x^2)$ is a very different beast from $(\\sin x)^2$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Decomposition is the whole game. Before you differentiate anything composite, ask: \"What is the last operation I would perform if I were computing this by hand?\" That last operation is your outer function; everything fed into it is the inner function. For $\\sin(x^2)$, the last thing you do is take a sine — so sine is outer.</p>\n</div>\n\n<h3>The chain rule, stated</h3>\n\n<p>If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then the composite $f \\circ g$ is differentiable at $x$, and</p>\n\n$$\\frac{d}{dx}\\,f(g(x)) = f'(g(x)) \\cdot g'(x).$$\n\n<p>In Leibniz notation, with $y = f(u)$ and $u = g(x)$, this reads beautifully as a \"cancellation\":</p>\n\n$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}.$$\n\n<p>The slogan: <strong>derivative of the outer (evaluated at the inner), times derivative of the inner.</strong> Notice the crucial detail — $f'$ is evaluated <em>at $g(x)$</em>, not at $x$. Forgetting to keep the inner function \"alive\" inside the outer derivative is the single most common chain-rule mistake.</p>\n\n<h4>Why the Leibniz form is a lie that tells the truth</h4>\n\n<p>It is tempting to \"prove\" the rule by saying $\\frac{dy}{du}\\cdot\\frac{du}{dx}$ has the $du$'s cancel. That's a useful mnemonic but not a proof — $dy/du$ is a single symbol for a limit, not a fraction. The honest reason it works: a derivative is a <em>local linear scaling factor</em>. Near a point, $g$ stretches inputs by a factor of $g'(x)$, and $f$ stretches its inputs by $f'(g(x))$. Apply two stretches in sequence and the total stretch is their product. That is the entire idea.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>A neuron computes something like $a = \\sigma(w \\cdot x + b)$ — a composition of a linear map and a nonlinearity. Stack $L$ layers and you have a composition $f_L \\circ f_{L-1} \\circ \\cdots \\circ f_1$. The gradient of the loss with respect to an early weight is a <em>product</em> of local derivatives, one per layer. That product structure is exactly why \"vanishing\" and \"exploding\" gradients happen: multiply many numbers smaller than 1 and the result decays toward zero; multiply many numbers larger than 1 and it blows up.</p>\n</div>\n\n<h3>A first worked example</h3>\n\n<p>Differentiate $y = (3x^2 + 1)^5$.</p>\n\n<ul>\n<li><strong>Decompose.</strong> The last operation is \"raise to the 5th power,\" so the outer function is $f(u) = u^5$ and the inner is $u = g(x) = 3x^2 + 1$.</li>\n<li><strong>Differentiate each.</strong> $f'(u) = 5u^4$ and $g'(x) = 6x$.</li>\n<li><strong>Assemble:</strong> outer-derivative-at-inner times inner-derivative.</li>\n</ul>\n\n$$\\frac{dy}{dx} = 5(3x^2+1)^4 \\cdot 6x = 30x\\,(3x^2+1)^4.$$\n\n<p>Note how $3x^2+1$ stays untouched inside the power — we did <em>not</em> simplify it to $x$. The factor $6x$ is the price we pay for the inner function not being a plain $x$.</p>\n\n<h3>Nested compositions: chaining the chain rule</h3>\n\n<p>The rule extends to any depth. For a triple composition $y = f(g(h(x)))$,</p>\n\n$$\\frac{dy}{dx} = f'\\big(g(h(x))\\big) \\cdot g'\\big(h(x)\\big) \\cdot h'(x).$$\n\n<p>You peel the onion from the outside in, multiplying the derivative of each layer (evaluated at everything inside it) as you go. Let's do a genuinely nested one.</p>\n\n<h4>Worked example: triple nesting</h4>\n\n<p>Differentiate $y = \\sqrt{\\sin(x^3)}$, i.e. $y = \\big(\\sin(x^3)\\big)^{1/2}$.</p>\n\n<p>Layers, outside to inside:</p>\n<ol>\n<li>Outer: $f(u) = u^{1/2}$, so $f'(u) = \\tfrac{1}{2}u^{-1/2}$.</li>\n<li>Middle: $g(v) = \\sin v$, so $g'(v) = \\cos v$.</li>\n<li>Inner: $h(x) = x^3$, so $h'(x) = 3x^2$.</li>\n</ol>\n\n<p>Multiply each derivative evaluated at the appropriate inner expression:</p>\n\n$$\\frac{dy}{dx} = \\underbrace{\\frac{1}{2}\\big(\\sin(x^3)\\big)^{-1/2}}_{f'(\\text{inner})} \\cdot \\underbrace{\\cos(x^3)}_{g'(\\text{inner})} \\cdot \\underbrace{3x^2}_{h'(x)} = \\frac{3x^2\\cos(x^3)}{2\\sqrt{\\sin(x^3)}}.$$\n\n<p>Read left to right: that is exactly the order a forward pass would compute the values $x^3$, then $\\sin(x^3)$, then its square root — and the derivative is the running product of local sensitivities along that same path.</p>\n\n<h3>Combining the chain rule with product and quotient rules</h3>\n\n<p>Real expressions mix operations, and the chain rule must cooperate with the product and quotient rules. The discipline is the same: identify the <em>outermost</em> structure first, apply the matching rule, and reach for the chain rule whenever a \"piece\" is itself composite.</p>\n\n<h4>Worked example: product meets chain</h4>\n\n<p>Differentiate $y = x^2 \\, e^{3x}$.</p>\n\n<p>The outermost operation is a <strong>product</strong> of $x^2$ and $e^{3x}$, so start with the product rule $(uv)' = u'v + uv'$:</p>\n\n<ul>\n<li>$u = x^2 \\Rightarrow u' = 2x$.</li>\n<li>$v = e^{3x}$. This is composite, so $v' = e^{3x}\\cdot 3 = 3e^{3x}$ by the chain rule.</li>\n</ul>\n\n$$\\frac{dy}{dx} = 2x\\,e^{3x} + x^2\\cdot 3e^{3x} = x e^{3x}(2 + 3x).$$\n\n<h4>Worked example: quotient meets chain</h4>\n\n<p>Differentiate $y = \\dfrac{\\cos(2x)}{1 + x^2}$. Outermost structure is a quotient, so use $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$ with $u = \\cos(2x)$ (composite: $u' = -2\\sin(2x)$) and $v = 1+x^2$ ($v' = 2x$):</p>\n\n$$\\frac{dy}{dx} = \\frac{-2\\sin(2x)(1+x^2) - \\cos(2x)\\cdot 2x}{(1+x^2)^2}.$$\n\n<p>The lesson: the chain rule is rarely used alone. It's the subroutine you call whenever a sub-expression is itself a composition.</p>\n\n<h3>From the chain rule to backpropagation</h3>\n\n<p>Here is the payoff. A feedforward neural network computes a scalar loss $\\mathcal{L}$ by composing many functions. Schematically:</p>\n\n$$x \\xrightarrow{\\;W_1\\;} z_1 \\xrightarrow{\\;\\sigma\\;} a_1 \\xrightarrow{\\;W_2\\;} z_2 \\xrightarrow{\\;\\sigma\\;} a_2 \\;\\cdots\\; \\longrightarrow \\mathcal{L}.$$\n\n<p>To train it, we need $\\frac{\\partial \\mathcal{L}}{\\partial W_k}$ for every weight matrix. By the chain rule, the gradient with respect to an early parameter is a product of local Jacobians from the loss all the way back to that parameter. <strong>Backpropagation is simply the chain rule evaluated efficiently, from the output backward.</strong></p>\n\n<p>Why <em>backward</em>? Because of how the products associate. Consider the scalar chain $\\frac{d\\mathcal{L}}{dx} = \\frac{d\\mathcal{L}}{da_2}\\cdot\\frac{da_2}{da_1}\\cdot\\frac{da_1}{dx}$. You could multiply left-to-right (forward) or right-to-left (backward). For a network with a scalar loss and many parameters, multiplying from the loss backward means you carry a small vector (the \"gradient signal\") and reuse it across all parameters of a layer at once. Forward-mode would force you to recompute a separate pass per parameter. The backward order turns an astronomically expensive computation into one comparable in cost to a single forward pass.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>The quantity backprop sends backward — often written $\\delta$, the gradient of the loss with respect to a layer's pre-activation — is exactly the \"$f'(\\text{inner})$ accumulated so far\" in the chain rule. Each layer receives $\\delta$ from the layer above, multiplies by its own <em>local</em> derivative (the analogue of $g'(x)$), and passes the result down. The chain rule isn't merely <em>used</em> in deep learning; deep learning's core algorithm <em>is</em> the chain rule, organized to maximize reuse. Frameworks like PyTorch and JAX implement this as <strong>automatic differentiation</strong>: every elementary operation knows its local derivative, and the framework chains them for you.</p>\n</div>\n\n<h4>Gradient flow intuition, made concrete</h4>\n\n<p>Suppose each layer's local derivative is roughly a number $r$ (think of the slope of the activation times the weight scale). After $L$ layers, the gradient reaching the first layer scales like $r^L$:</p>\n\n<ul>\n<li>If $r \\approx 0.7$ and $L = 30$, then $r^L \\approx 0.7^{30} \\approx 2\\times 10^{-5}$ — the <strong>vanishing gradient</strong> problem: early layers barely learn.</li>\n<li>If $r \\approx 1.3$ and $L = 30$, then $r^L \\approx 1.3^{30} \\approx 2.6\\times 10^{3}$ — the <strong>exploding gradient</strong> problem: updates diverge.</li>\n</ul>\n\n<p>This is not a metaphor; it is the chain rule's product of local derivatives, observed at scale. It explains a remarkable amount of practical deep-learning engineering: <strong>ReLU</strong> (whose derivative is exactly 1 on the active region, so $r$ doesn't shrink), <strong>residual/skip connections</strong> (which add a \"+1\" path so a derivative term stays near 1), careful <strong>weight initialization</strong> (chosen to keep $r \\approx 1$), and <strong>normalization layers</strong> all exist largely to keep that product of local derivatives well-behaved.</p>\n\n<h3>A note on rigor: when does the chain rule hold?</h3>\n\n<p>The clean statement requires $g$ differentiable at $x$ and $f$ differentiable at $g(x)$. The subtle point in a careful proof is that you cannot simply write $\\frac{f(g(x+h))-f(g(x))}{g(x+h)-g(x)}\\cdot\\frac{g(x+h)-g(x)}{h}$ and take limits, because $g(x+h)-g(x)$ can be zero for arbitrarily small $h$ (consider a constant function), making the first fraction $\\frac{0}{0}$. The standard fix defines an auxiliary function that equals the difference quotient of $f$ when the denominator is nonzero and equals $f'(g(x))$ otherwise; this patched function is continuous, and the limit goes through cleanly. The takeaway: the rule is true exactly as stated, but the naive cancellation argument has a genuine gap worth knowing about.</p>\n\n<h3>Summary</h3>\n\n<ul>\n<li><strong>Decompose first:</strong> the last operation you'd compute by hand is the outer function.</li>\n<li><strong>Chain rule:</strong> $\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$ — outer-derivative-at-inner times inner-derivative.</li>\n<li><strong>Nesting:</strong> peel from outside in, multiplying each layer's local derivative evaluated at everything inside it.</li>\n<li><strong>Combine:</strong> use product/quotient rules for the outer structure, calling the chain rule for any composite sub-piece.</li>\n<li><strong>ML connection:</strong> backpropagation is the chain rule run backward for efficiency; the product of per-layer local derivatives explains vanishing/exploding gradients and motivates ReLU, residuals, initialization, and normalization.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the chain rule is the entire engine of backpropagation</summary>\n<p>A neural network is one enormous composite function — a loss $L = \\ell\\big(f_n(\\cdots f_2(f_1(x))\\cdots)\\big)$. Training needs the derivative of $L$ with respect to every weight, and the chain rule is what delivers it: the derivative of a composition is the <strong>product</strong> of the derivatives of each stage, $\\frac{d}{dx}g(h(x)) = g'(h(x))\\,h'(x)$, extended to a long chain by multiplying all the local derivatives along the way.</p>\n<p><strong>Backpropagation is just the chain rule applied right-to-left, reusing work.</strong> The gradient for a weight deep in the network is the product of local derivatives running from the loss back to that weight. Computing that separately for every weight repeats an enormous amount of multiplication; backprop instead computes each layer's \"upstream gradient\" <em>once</em> and passes it backward — the same memoization idea as dynamic programming, applied to the chain rule.</p>\n<p>Why right-to-left specifically (reverse mode)? The loss is a single <em>scalar</em> while the weights number in the millions. Multiplying the Jacobian chain starting from the scalar output keeps every intermediate object small (a vector), whereas going left-to-right would drag large matrices through. Reverse-mode autodiff thus computes the gradient of one scalar with respect to millions of inputs for roughly the cost of <em>one</em> forward pass — the efficiency that makes deep learning feasible at all.</p>\n<p>It even explains vanishing and exploding gradients: the backward pass multiplies many per-layer factors, so if they are persistently smaller than $1$ the product decays toward $0$, and if persistently larger than $1$ it blows up — exponentially in depth. Vanishing gradients are simply the chain rule's multiplication compounding across many layers.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The chain rule says <code>d/dx f(g(x)) = f'(g(x))·g'(x)</code>. Verify it numerically — the central-difference slope of the composite should match the analytic product:</p>\n<div data-code=\"javascript\" data-expected=\"54 54\">// Chain rule: d/dx f(g(x)) = f'(g(x)) * g'(x). Check it numerically at x = 1 for\n// f(u) = u^3 and g(x) = 2x+1.  Analytic: f'(g)*g' = 3*(g)^2 * 2 = 6*(2x+1)^2 = 54.\nconst h = 1e-5;\nconst g = x =&gt; 2 * x + 1;\nconst f = u =&gt; u * u * u;\nconst comp = x =&gt; f(g(x));\nconst numeric = (comp(1 + h) - comp(1 - h)) / (2 * h);   // central difference\nconsole.log(Math.round(numeric), 6 * (2 * 1 + 1) ** 2);   // numeric, analytic -&gt; 54 54</div>\n<h4>Interactive — rates multiply</h4>\n<div data-viz=\"calc-chain\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the multivariable chain rule — sum over paths</summary>\n<p>The single-variable chain rule <em>multiplies</em> derivatives along a chain. When a quantity reaches the output through <em>several</em> routes, you also <em>add</em> — and that sum is exactly why backprop accumulates gradients.</p>\n<p><b>Multiple paths add.</b> If $z = f(x,y)$ and both $x = x(t)$ and $y = y(t)$ depend on $t$, then $t$ influences $z$ through <em>two</em> paths, so $\\dfrac{dz}{dt} = \\dfrac{\\partial z}{\\partial x}\\dfrac{dx}{dt} + \\dfrac{\\partial z}{\\partial y}\\dfrac{dy}{dt}$. Multiply along each path; sum across paths. (Single-variable is just the one-path special case.)</p>\n<p><b>This is why backprop sums.</b> In a computation graph a node often <em>fans out</em> — its output feeds several later operations. Each downstream use is a separate path back to that node, so its total gradient is the <em>sum</em> of the gradients flowing in from every branch. \"Add the incoming gradients at a fan-out\" is not a special rule; it is the multivariable chain rule's sum-over-paths.</p>\n<p>The \"aha\": the chain rule has two motions — <em>multiply</em> along a path, <em>add</em> across paths. Single-variable calculus shows only the multiply; the moment a variable affects the output more than one way (every real network), the addition appears — and that is precisely the gradient accumulation at the heart of backpropagation.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: rates multiply — the Leibniz view</summary>\n<p>The other dives cover backprop and the multivariable case. The single-variable chain rule has its own beautiful intuition, hiding in <strong>Leibniz notation</strong>: $$\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}.$$ The $du$ terms look like they \"cancel,\" and that is exactly the right mnemonic.</p>\n<p><b>Rates multiply.</b> If $y$ changes 3 times as fast as $u$, and $u$ changes 2 times as fast as $x$, then $y$ changes $3\\times 2=6$ times as fast as $x$. Composition chains rates, and rates <em>multiply</em> — gears in a gear train, or currency conversion: dollars-per-euro times euros-per-yen gives dollars-per-yen, the inner unit cancelling.</p>\n<p><b>But it is not really fractions.</b> $\\frac{dy}{dx}$ is a single symbol (a limit), not a quotient, so the \"cancellation\" is a mnemonic, not a proof. The real proof multiplies the two difference quotients $\\frac{\\Delta y}{\\Delta u}\\cdot\\frac{\\Delta u}{\\Delta x}$ — where the $\\Delta u$ terms genuinely <em>do</em> cancel — and only then takes the limit. Leibniz notation is \"lucky\" because it remembers this.</p>\n<p>The \"aha\": the chain rule says <em>rates multiply along a composition</em>, $\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}$, with the inner variable \"cancelling\" like units. It is a mnemonic, not literal fraction algebra (derivatives are limits) — but it is why Leibniz notation makes the rule unforgettable.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What is the derivative of $y = \\sin(x^2)$?",
              "choices": [
                "$\\cos(x^2)$",
                "$2x\\cos(2x)$",
                "$2x\\cos(x^2)$",
                "$\\cos(2x)$"
              ],
              "answer": 2,
              "explain": "Outer derivative $\\cos$ evaluated at the inner $x^2$, times the inner derivative $2x$: $\\cos(x^2)\\cdot 2x$. Choice 0 forgets the inner derivative $2x$."
            },
            {
              "q": "For $y = f(g(h(x)))$, the chain rule gives $\\frac{dy}{dx} =$",
              "choices": [
                "$f'(x)\\cdot g'(x)\\cdot h'(x)$",
                "$f'(h(x))\\cdot g'(g(x))\\cdot h'(x)$",
                "$f'(g(h(x)))\\cdot g'(x)\\cdot h'(x)$",
                "$f'(g(h(x)))\\cdot g'(h(x))\\cdot h'(x)$"
              ],
              "answer": 3,
              "explain": "Each factor is the derivative of one layer evaluated at everything inside it: $f'$ at $g(h(x))$, $g'$ at $h(x)$, and $h'$ at $x$."
            },
            {
              "q": "Why is backpropagation computed from the output (loss) backward rather than from the inputs forward?",
              "choices": [
                "Forward-mode would give the wrong gradients",
                "Reverse order lets a single scalar loss reuse one gradient signal across all parameters, making the cost comparable to one forward pass",
                "The chain rule only works in the backward direction",
                "Backward computation avoids the product rule"
              ],
              "answer": 1,
              "explain": "With one scalar output and many parameters, associating the Jacobian products from the loss backward reuses the propagated gradient, so total cost is roughly that of a single forward pass instead of one pass per parameter."
            },
            {
              "q": "If each layer contributes a local derivative of about $r$ and the network has $L$ layers, the gradient reaching the first layer scales roughly like $r^L$. What does this explain?",
              "choices": [
                "Why deeper networks always train faster",
                "Vanishing gradients when $r<1$ and exploding gradients when $r>1$",
                "Why the chain rule fails for large $L$",
                "Why learning rates must be negative"
              ],
              "answer": 1,
              "explain": "A product of $L$ local derivatives decays toward 0 if each is below 1 and blows up if each exceeds 1 — exactly the vanishing/exploding gradient phenomena that motivate ReLU, residual connections, and careful initialization."
            },
            {
              "q": "Using the decomposition strategy from the lesson, what is the derivative of $y = (\\sin x)^2$ (note: this is NOT $\\sin(x^2)$)?",
              "choices": [
                "$2\\sin x \\cdot \\cos x$",
                "$\\cos(x^2)$",
                "$2x\\cos x$",
                "$2\\sin x$"
              ],
              "answer": 0,
              "explain": "The last operation is squaring, so the outer is $u^2$ giving $2(\\sin x)$, times the inner derivative $\\cos x$, yielding $2\\sin x\\cos x$."
            },
            {
              "q": "The lesson stresses that $f'$ must be evaluated at $g(x)$, not at $x$. For $y = \\cos(3x)$, which expression respects this rule?",
              "choices": [
                "$-\\sin(3x)$",
                "$-\\sin(x)\\cdot 3$",
                "$-\\sin(3x)\\cdot 3$",
                "$-3x\\sin(3x)$"
              ],
              "answer": 2,
              "explain": "The outer derivative $-\\sin$ must keep the inner function $3x$ alive inside it, then multiply by the inner derivative $3$, giving $-3\\sin(3x)$."
            },
            {
              "q": "According to the lesson, what is the FIRST thing you should ask before differentiating a composite function?",
              "choices": [
                "What is the last operation I would perform if computing it by hand?",
                "What is the value of the function at $x = 0$?",
                "Is the function continuous everywhere?",
                "Which variable appears most often?"
              ],
              "answer": 0,
              "explain": "Identifying the last operation reveals the outer function, and everything fed into it is the inner function, which drives the whole decomposition."
            },
            {
              "q": "The lesson calls the Leibniz form $\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$ a 'lie that tells the truth.' Why is the $du$ 'cancellation' not a real proof?",
              "choices": [
                "Leibniz notation is mathematically incorrect",
                "The chain rule only holds for polynomials",
                "$dy$, $du$, $dx$ are not genuine fractions that can be algebraically cancelled",
                "The derivatives must be evaluated at different points so they cannot multiply"
              ],
              "answer": 2,
              "explain": "The cancellation is a useful mnemonic, but $\\frac{dy}{du}$ and $\\frac{du}{dx}$ are limits of difference quotients, not fractions whose differentials literally cancel."
            },
            {
              "q": "What is the derivative of $y = e^{3x^2}$?",
              "choices": [
                "$6x\\,e^{3x^2}$",
                "$e^{3x^2}$",
                "$6x\\,e^{6x}$",
                "$3x^2\\,e^{3x^2 - 1}$"
              ],
              "answer": 0,
              "explain": "Outer $f(u)=e^u$ gives $f'(u)=e^u$ evaluated at $u=3x^2$, times inner derivative $\\frac{d}{dx}(3x^2)=6x$, yielding $6x\\,e^{3x^2}$. Choice 0 forgets the inner derivative entirely; the exponent does not change under differentiation of $e^u$."
            },
            {
              "q": "Suppose $y = f(g(x))$ with $g(2) = 5$, $g'(2) = 3$, and $f'(5) = 4$. What is $\\left.\\frac{dy}{dx}\\right|_{x=2}$?",
              "choices": [
                "$7$",
                "$20$",
                "$8$",
                "$12$"
              ],
              "answer": 3,
              "explain": "By the chain rule $\\frac{dy}{dx}=f'(g(x))\\cdot g'(x)$, so at $x=2$ we need $f'(g(2))\\cdot g'(2)=f'(5)\\cdot g'(2)=4\\cdot 3=12$. The trap is using $f'(2)$ or $g(2)$ instead of evaluating $f'$ at $g(2)=5$, and the values multiply, they do not add."
            },
            {
              "q": "A student differentiates $y = \\sqrt{x^2 + 1}$ and writes $\\frac{dy}{dx} = \\frac{1}{2\\sqrt{x^2+1}}$. What did they do wrong?",
              "choices": [
                "The power rule does not apply to square roots, so the derivative is undefined",
                "Nothing — the answer is correct as written",
                "They should have evaluated the outer derivative at $x$ instead of $x^2+1$",
                "They forgot to multiply by the inner derivative $2x$, so the answer should be $\\frac{x}{\\sqrt{x^2+1}}$"
              ],
              "answer": 3,
              "explain": "They differentiated the outer function $\\sqrt{u}$ correctly to $\\frac{1}{2\\sqrt{u}}$ but stopped before multiplying by the inner derivative $\\frac{d}{dx}(x^2+1)=2x$; the correct result is $\\frac{2x}{2\\sqrt{x^2+1}}=\\frac{x}{\\sqrt{x^2+1}}$. Forgetting the inner factor is the single most common chain-rule error."
            },
            {
              "q": "Which of these functions is NOT a genuine composition that requires the chain rule to differentiate?",
              "choices": [
                "$y = \\tan(5x)$",
                "$y = x^2 + \\sin x$",
                "$y = (x^3 - 2)^{10}$",
                "$y = \\cos(e^x)$"
              ],
              "answer": 1,
              "explain": "$y = x^2 + \\sin x$ is a sum of two basic functions of $x$, not one function nested inside another, so it needs only the sum rule. The other three each feed a non-trivial inner function into an outer function, which is exactly when the chain rule is required."
            },
            {
              "q": "The chain rule states that $\\dfrac{d}{dx}\\big[f(g(x))\\big]$ equals:",
              "choices": [
                "$f'(x)\\cdot g'(x)$",
                "$f'(g'(x))$",
                "$f(g'(x))$",
                "$f'(g(x))\\cdot g'(x)$"
              ],
              "answer": 3,
              "explain": "Differentiate the outer function $f$ *evaluated at the inner* $g(x)$, then multiply by the derivative of the inner: $f'(g(x))\\cdot g'(x)$. The key subtlety is evaluating $f'$ at $g(x)$, not at $x$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}\\big[(2x+1)^5\\big]$?",
              "choices": [
                "$5(2x+1)^4$",
                "$10(2x+1)^4$",
                "$10(2x+1)^5$",
                "$(2x+1)^4$"
              ],
              "answer": 1,
              "explain": "Outer is $u^5$ (derivative $5u^4$), inner is $u = 2x+1$ (derivative $2$): $5(2x+1)^4\\cdot 2 = 10(2x+1)^4$. Forgetting the inner derivative $2$ — giving $5(2x+1)^4$ — is the most common chain-rule slip."
            },
            {
              "q": "The chain rule captures the idea that rates multiply: if $y$ changes $k$ times as fast as $u$, and $u$ changes $m$ times as fast as $x$, then $y$ changes how fast relative to $x$?",
              "choices": [
                "$k + m$ times",
                "$k / m$ times",
                "$k \\cdot m$ times",
                "$k$ times"
              ],
              "answer": 2,
              "explain": "Rates compose by multiplying: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx} = k\\cdot m$. This Leibniz form makes the chain rule intuitive — like meshed gears, where each stage scales the rate of the next."
            },
            {
              "q": "What is $\\dfrac{d}{dx}\\big[\\sin(5x)\\big]$?",
              "choices": [
                "$5\\cos(5x)$",
                "$\\cos(5x)$",
                "$5\\cos(x)$",
                "$-5\\cos(5x)$"
              ],
              "answer": 0,
              "explain": "Outer $\\sin u$ (derivative $\\cos u$), inner $u = 5x$ (derivative $5$): $\\cos(5x)\\cdot 5 = 5\\cos(5x)$. The inner derivative $5$ must be carried along — dropping it gives the common wrong answer $\\cos(5x)$."
            }
          ],
          "flashcards": [
            {
              "front": "State the chain rule for $\\frac{d}{dx}f(g(x))$.",
              "back": "$f'(g(x))\\cdot g'(x)$ — the derivative of the outer function evaluated at the inner function, times the derivative of the inner function."
            },
            {
              "front": "When differentiating a composite, how do you identify the outer function?",
              "back": "It's the last operation you would perform when evaluating the expression by hand. Everything fed into that operation is the inner function."
            },
            {
              "front": "Chain rule for a triple composition $f(g(h(x)))$?",
              "back": "$f'(g(h(x)))\\cdot g'(h(x))\\cdot h'(x)$ — peel outside-in, evaluating each derivative at everything nested inside it."
            },
            {
              "front": "In one sentence, what is backpropagation?",
              "back": "The chain rule applied to a network's composite loss function, evaluated from the output backward so a single gradient signal is reused across all parameters efficiently."
            },
            {
              "front": "Why do vanishing/exploding gradients occur?",
              "back": "The gradient to an early layer is a product of per-layer local derivatives; if each is <1 the product vanishes ($r^L\\to 0$), if each is >1 it explodes ($r^L\\to\\infty$)."
            },
            {
              "front": "Leibniz form of the chain rule for $y=f(u)$, $u=g(x)$?",
              "back": "$\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$ — a mnemonic 'cancellation', justified rigorously because derivatives are local linear scaling factors that compose multiplicatively."
            }
          ],
          "homework": [
            {
              "prompt": "Differentiate $y = e^{\\cos(3x)}$. Identify the outer, middle, and inner functions explicitly.",
              "hint": "Three layers: an exponential on the outside, a cosine in the middle, and a linear function $3x$ inside. Multiply the three local derivatives, keeping each evaluated at what's nested inside it.",
              "solution": "Layers: outer $f(u)=e^u$ ($f'=e^u$); middle $g(v)=\\cos v$ ($g'=-\\sin v$); inner $h(x)=3x$ ($h'=3$). Chain them: $\\frac{dy}{dx} = e^{\\cos(3x)}\\cdot(-\\sin(3x))\\cdot 3 = -3\\sin(3x)\\,e^{\\cos(3x)}$."
            },
            {
              "prompt": "Differentiate $y = x^3\\,\\sqrt{2x+1}$, combining the product and chain rules.",
              "hint": "Outermost structure is a product $u\\cdot v$ with $u=x^3$ and $v=(2x+1)^{1/2}$. You'll need the chain rule to differentiate $v$.",
              "solution": "Product rule: $y' = u'v + uv'$. Here $u'=3x^2$ and $v=(2x+1)^{1/2}$, so by the chain rule $v' = \\tfrac{1}{2}(2x+1)^{-1/2}\\cdot 2 = (2x+1)^{-1/2}$. Thus $y' = 3x^2\\sqrt{2x+1} + x^3\\cdot\\frac{1}{\\sqrt{2x+1}}$. Combining over a common denominator: $y' = \\frac{3x^2(2x+1) + x^3}{\\sqrt{2x+1}} = \\frac{7x^3 + 3x^2}{\\sqrt{2x+1}} = \\frac{x^2(7x+3)}{\\sqrt{2x+1}}$."
            },
            {
              "prompt": "A 3-layer network has local per-layer derivative magnitudes (loss-to-pre-activation) of approximately $0.5$, $0.5$, and $0.5$. Using the chain-rule product intuition, estimate the gradient magnitude reaching the first layer relative to the loss, and state one architectural change that would mitigate the problem you observe.",
              "hint": "The gradient reaching the earliest layer is the product of all the local derivatives along the path. Then think about what keeps each local factor near 1.",
              "solution": "The gradient to the first layer scales like the product $0.5\\times 0.5\\times 0.5 = 0.125$, so it is about $\\tfrac{1}{8}$ the strength of the signal at the output — a vanishing-gradient effect that worsens exponentially with depth ($0.5^L$). Mitigations include: using ReLU activations (derivative exactly 1 on the active region, so the factor doesn't shrink), adding residual/skip connections (which inject a '+1' path keeping a derivative term near 1), better weight initialization (e.g., He/Xavier to keep each factor near 1), or normalization layers (batch/layer norm) to stabilize the per-layer scale."
            }
          ],
          "examples": [
            {
              "title": "Power of a function",
              "body": "Differentiate $f(x)=(3x^2+1)^4$.",
              "solution": "Outer function $u^4$ has derivative $4u^3$; inner $u=3x^2+1$ has derivative $6x$. Chain rule: $f'(x)=4(3x^2+1)^3\\cdot 6x=24x(3x^2+1)^3$."
            },
            {
              "title": "Trig composite",
              "body": "Differentiate $f(x)=\\sin(x^2)$.",
              "solution": "Outer $\\sin u\\to\\cos u$, inner $x^2\\to 2x$: $f'(x)=\\cos(x^2)\\cdot 2x=2x\\cos(x^2)$."
            },
            {
              "title": "Exponential composite",
              "body": "Differentiate $f(x)=e^{\\sin x}$.",
              "solution": "Outer $e^u\\to e^u$, inner $\\sin x\\to\\cos x$: $f'(x)=e^{\\sin x}\\cos x$."
            }
          ]
        },
        {
          "id": "c-derivatives-special-functions",
          "title": "Derivatives of Exponential, Log & Trig Functions",
          "minutes": 14,
          "content": "<h3>Why these functions deserve their own lesson</h3>\n<div data-viz=\"calc-derivative\"></div>\n<p>Polynomials are the comfortable part of calculus: power rule, done. But almost every interesting model in science, finance, and machine learning is built from three families that the power rule cannot touch — <strong>exponentials</strong>, <strong>logarithms</strong>, and the <strong>trigonometric</strong> functions. Compound interest, radioactive decay, neural-network activations, signal processing, the loss function you minimize when training a classifier — all of them live and die by the derivatives in this lesson.</p>\n<p>The good news: there are only a handful of formulas, they are deeply interconnected, and one number — $e$ — ties the whole exponential and logarithmic story together. Once you understand <em>why</em> $e$ is special, the rest stops being memorization and starts being inevitable.</p>\n\n<h3>The exponential: $e^x$ is its own derivative</h3>\n<p>Consider a general exponential $f(x) = a^x$ with base $a > 0$. Apply the limit definition of the derivative:</p>\n$$f'(x) = \\lim_{h \\to 0} \\frac{a^{x+h} - a^x}{h} = \\lim_{h \\to 0} \\frac{a^x \\, a^h - a^x}{h} = a^x \\cdot \\lim_{h \\to 0} \\frac{a^h - 1}{h}.$$\n<p>Something remarkable happened. The factor $a^x$ pulled straight out of the limit, and what's left — $\\lim_{h\\to 0}\\frac{a^h - 1}{h}$ — does not depend on $x$ at all. It is just a constant that depends on the base $a$. Call it $M(a)$. So <strong>every exponential is proportional to its own derivative</strong>:</p>\n$$\\frac{d}{dx}\\, a^x = M(a)\\cdot a^x, \\qquad M(a) = \\lim_{h\\to 0}\\frac{a^h - 1}{h}.$$\n<p>This is the structural fact that makes exponentials model growth: the rate of change is proportional to the current amount. A bacterial colony grows faster when it's bigger; money compounds faster when there's more of it. That is the differential equation $y' = k y$, and its solution is an exponential.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The number $M(a)$ is just the <em>slope of $a^x$ at $x=0$</em> (plug $x=0$ into the formula: $f'(0) = M(a)\\cdot a^0 = M(a)$). For $a=2$ that slope is about $0.693$; for $a=3$ it's about $1.099$. Somewhere between 2 and 3 there is a base whose slope at zero is <strong>exactly 1</strong>. We name that base $e \\approx 2.71828$.</p></div>\n\n<p>By <em>definition</em>, $e$ is the base for which $M(e) = 1$. That collapses the formula into the most elegant identity in calculus:</p>\n$$\\boxed{\\frac{d}{dx}\\, e^x = e^x.}$$\n<p>The exponential function $e^x$ is a fixed point of the differentiation operator — differentiate it as many times as you like and nothing changes. No other function (up to a constant multiple) has this property.</p>\n\n<h4>A second, equivalent definition of $e$</h4>\n<p>The same number falls out of compound interest. If you compound a 100% annual rate over $n$ ever-smaller periods, the growth factor is $(1 + 1/n)^n$, and</p>\n$$e = \\lim_{n\\to\\infty}\\left(1 + \\frac{1}{n}\\right)^n \\approx 2.718281828.$$\n<p>Continuous compounding and \"the function that is its own derivative\" are the same idea viewed from two angles. That's why $e$ shows up everywhere from finance to physics to probability.</p>\n\n<h3>General base $a^x$ and the natural log</h3>\n<p>We still owe an honest value for $M(a)$. Write any base in terms of $e$: since $a = e^{\\ln a}$, we have $a^x = e^{(\\ln a)\\,x}$. Now differentiate using the chain rule (derivative of $e^{u}$ is $e^{u}u'$, with $u = (\\ln a)x$):</p>\n$$\\frac{d}{dx}\\, a^x = e^{(\\ln a)x}\\cdot \\ln a = a^x \\ln a.$$\n<p>So $M(a) = \\ln a$. That confirms the numbers above: $\\ln 2 \\approx 0.693$, $\\ln 3 \\approx 1.099$, and $\\ln e = 1$. Memorize:</p>\n$$\\frac{d}{dx}\\, a^x = a^x \\ln a.$$\n\n<h4>Logarithms by inverse-function reasoning</h4>\n<p>The natural log $\\ln x$ is the inverse of $e^x$. We can differentiate it without a new limit. Let $y = \\ln x$, so $e^{y} = x$. Differentiate both sides with respect to $x$, using the chain rule on the left:</p>\n$$e^{y}\\,\\frac{dy}{dx} = 1 \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = \\frac{1}{e^{y}} = \\frac{1}{x}.$$\n$$\\boxed{\\frac{d}{dx}\\, \\ln x = \\frac{1}{x}} \\qquad (x > 0).$$\n<p>For a general base, use change of base $\\log_a x = \\dfrac{\\ln x}{\\ln a}$ (note $\\ln a$ is a constant), giving</p>\n$$\\frac{d}{dx}\\, \\log_a x = \\frac{1}{x \\ln a}.$$\n<p>This is why $\\ln$ is called the \"natural\" logarithm: its derivative is the clean $1/x$ with no stray constant. Every other base drags along a $\\frac{1}{\\ln a}$ tax.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The derivative $\\frac{d}{dx}\\ln x = \\frac{1}{x}$ powers <strong>cross-entropy loss</strong>. Training a classifier minimizes $-\\sum y_i \\ln \\hat{y}_i$; the gradient involves these $1/\\hat{y}$ terms. And $\\frac{d}{dx}e^x = e^x$ is exactly why the <strong>softmax</strong> and <strong>sigmoid</strong> have such clean gradients — the backprop math stays simple precisely because exponentials differentiate into themselves.</p></div>\n\n<h3>Logarithmic differentiation: a bonus technique</h3>\n<p>What about a tower like $x^x$? The power rule needs a constant exponent; the exponential rule needs a constant base. Here both move. Take $\\ln$ of both sides, then differentiate implicitly. For $y = x^x$:</p>\n$$\\ln y = x\\ln x \\;\\Longrightarrow\\; \\frac{1}{y}\\,y' = \\ln x + 1 \\;\\Longrightarrow\\; y' = x^x(\\ln x + 1).$$\n<p>This trick — \"take the log, then differentiate\" — also turns nasty products and quotients into sums, which is often easier in practice.</p>\n\n<h3>The trigonometric six</h3>\n<p>The two foundational facts come from the geometric limit $\\lim_{h\\to 0}\\frac{\\sin h}{h} = 1$ (which, like $M(e)=1$, says the slope of $\\sin$ at the origin is exactly 1). From there:</p>\n$$\\frac{d}{dx}\\sin x = \\cos x, \\qquad \\frac{d}{dx}\\cos x = -\\sin x.$$\n<p>Note the <strong>minus sign</strong> on cosine — the single most common student error. The other four follow by the quotient rule, since they're all built from $\\sin$ and $\\cos$:</p>\n<ul>\n<li>$\\dfrac{d}{dx}\\tan x = \\sec^2 x$</li>\n<li>$\\dfrac{d}{dx}\\cot x = -\\csc^2 x$</li>\n<li>$\\dfrac{d}{dx}\\sec x = \\sec x \\tan x$</li>\n<li>$\\dfrac{d}{dx}\\csc x = -\\csc x \\cot x$</li>\n</ul>\n<p>A clean pattern to lock these in: <strong>every \"co-\" function gets a minus sign</strong> (cosine, cotangent, cosecant) and its derivative is built from co-partners. Derive $\\tan$ yourself to see the machinery:</p>\n$$\\frac{d}{dx}\\tan x = \\frac{d}{dx}\\frac{\\sin x}{\\cos x} = \\frac{\\cos x\\cos x - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x.$$\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>$\\sin$ and $\\cos$ are a coupled pair: differentiating cycles $\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin$ with period 4. This is the real-valued shadow of Euler's formula $e^{ix} = \\cos x + i\\sin x$, which unifies <em>all</em> the functions in this lesson: trig functions are exponentials in disguise, rotated into the complex plane. The reason $e^x$, $\\sin$, and $\\cos$ all satisfy clean differential equations is that they are siblings.</p></div>\n\n<h3>Putting it together with the chain rule</h3>\n<p>Real problems never hand you a bare $e^x$ or $\\sin x$. They give you compositions, and the chain rule does the gluing: $\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$. The standard chained versions worth recognizing on sight:</p>\n<ul>\n<li>$\\dfrac{d}{dx}e^{g(x)} = e^{g(x)}\\,g'(x)$</li>\n<li>$\\dfrac{d}{dx}\\ln(g(x)) = \\dfrac{g'(x)}{g(x)}$</li>\n<li>$\\dfrac{d}{dx}\\sin(g(x)) = \\cos(g(x))\\,g'(x)$</li>\n</ul>\n\n<h4>Fully worked example</h4>\n<p>Differentiate the sigmoid activation $\\sigma(x) = \\dfrac{1}{1+e^{-x}}$, the workhorse of logistic regression and classic neural nets. Rewrite it as $\\sigma(x) = (1 + e^{-x})^{-1}$ and apply the chain rule outward.</p>\n<pre><code>Let u = 1 + e^(-x).        Then sigma = u^(-1).\nd/dx (u^(-1)) = -u^(-2) * u'      (power + chain rule)\nu' = d/dx (1 + e^(-x)) = e^(-x) * (-1) = -e^(-x)\nSo  sigma'(x) = -(1 + e^(-x))^(-2) * (-e^(-x))\n            = e^(-x) / (1 + e^(-x))^2\n</code></pre>\n<p>A short algebra check confirms the elegant form quoted earlier: dividing numerator and denominator through shows $\\sigma'(x) = \\dfrac{e^{-x}}{(1+e^{-x})^2} = \\dfrac{1}{1+e^{-x}}\\cdot\\dfrac{e^{-x}}{1+e^{-x}} = \\sigma(x)\\bigl(1-\\sigma(x)\\bigr)$, since $\\dfrac{e^{-x}}{1+e^{-x}} = 1 - \\sigma(x)$. That self-referential form is exactly what makes sigmoid backprop cheap.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: eˣ is its own derivative — and why that is the point</summary>\n<p>Among all exponential functions $a^x$, one is special: $e^x$ is the unique function (up to scaling) that is <b>its own derivative</b>, $\\frac{d}{dx}e^x = e^x$. That is not a quirk of notation — it is the <em>definition</em> of $e$: the base for which the growth rate at every point equals the current value.</p>\n<p>This is why $e$ appears wherever growth is proportional to size. Any process with $\\frac{dy}{dx} = ky$ (compound interest, populations, radioactive decay, RC circuits) is solved by $y = Ce^{kx}$ — only the exponential reproduces itself under differentiation. The logarithm is its mirror: $\\frac{d}{dx}\\ln x = \\frac{1}{x}$ turns multiplication into addition, which is why $\\ln$ linearizes power laws and tames products into sums. The trig derivatives ($\\frac{d}{dx}\\sin x = \\cos x$) close a similar loop — differentiate four times and you return to $\\sin$.</p>\n<p>The \"aha\": these \"special\" derivatives are not arbitrary facts to memorize — each function is defined by its self-referential rate of change. $e^x$ <em>is</em> \"the function equal to its own slope,\" and that single property is why it is the natural language of growth, and why $e$ (not 10 or 2) is the natural base.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the trig derivatives cycle (and the link to eˣ)</summary>\n<p>If $e^x$ is special for being its own derivative, sine and cosine are special for a different reason: differentiating them <em>cycles</em>.</p>\n<p><b>A period-4 loop.</b> $\\dfrac{d}{dx}\\sin x = \\cos x$, $\\dfrac{d}{dx}\\cos x = -\\sin x$, $\\dfrac{d}{dx}(-\\sin x) = -\\cos x$, $\\dfrac{d}{dx}(-\\cos x) = \\sin x$ — back to the start after <em>four</em> derivatives. So $\\dfrac{d^4}{dx^4}\\sin x = \\sin x$: sine is a fixed point of the fourth derivative, the way $e^x$ is a fixed point of the first.</p>\n<p><b>Why they are secretly the same.</b> Euler's formula $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ ties them together: $\\sin$ and $\\cos$ are the real and imaginary shadows of a point spinning around the unit circle. Differentiating multiplies $e^{i\\theta}$ by $i$ (a 90° rotation), and four 90° rotations return you to the start — which is <em>exactly</em> the 4-cycle of the trig derivatives. The \"self-derivative\" of $e^x$ and the \"4-cycle\" of $\\sin/\\cos$ are one phenomenon viewed along the real versus imaginary axis.</p>\n<p>The \"aha\": the trig functions differentiate in a closed loop because they are $e^x$ in disguise (with an imaginary exponent). That is why sinusoids are the natural language of oscillation, waves, and Fourier analysis — differentiation just rotates them.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the inverse-function derivative rule</summary>\n<p>You never need to memorize the derivatives of $\\ln x$, $\\arcsin x$, or $\\arctan x$ separately — they all fall out of one rule relating a function's slope to its <b>inverse</b>'s slope.</p>\n<p><b>The rule.</b> If $g$ is the inverse of $f$ (so $f(g(y))=y$), differentiate both sides with the chain rule: $f'(g(y))\\,g'(y) = 1$, giving $g'(y) = \\dfrac{1}{f'(g(y))}$. Geometrically, the graph of the inverse is the <em>reflection</em> across $y=x$, and reflecting swaps rise and run — so the inverse's slope is the <em>reciprocal</em> of the original's slope (at the matching point).</p>\n<p><b>It generates the famous ones.</b> <em>Logarithm:</em> $\\ln$ is the inverse of $e^x$, and $(e^x)'=e^x$, so $\\dfrac{d}{dy}\\ln y = \\dfrac{1}{e^{\\ln y}} = \\dfrac{1}{y}$ — the $1/x$ rule, derived not memorized. <em>arcsin:</em> the inverse of $\\sin$, and since $(\\sin)'=\\cos$, $\\dfrac{d}{dy}\\arcsin y = \\dfrac{1}{\\cos(\\arcsin y)} = \\dfrac{1}{\\sqrt{1-y^2}}$ (using $\\cos = \\sqrt{1-\\sin^2}$). The same move gives $\\arctan$'s $\\dfrac{1}{1+y^2}$.</p>\n<p>The \"aha\": an inverse function's derivative is just the reciprocal of the original's, evaluated at the right point — $g' = 1/f'(g)$. That single fact (a reflection across $y=x$ swaps the roles of rise and run) manufactures the derivatives of logs and inverse-trig functions, so they are consequences, not separate rules to memorize.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Why is $e$ singled out as the \"natural\" base for exponentials and logarithms?",
              "choices": [
                "Because $e$ is the largest base for which $a^x$ stays finite",
                "Because $e$ is a rational number that simplifies arithmetic",
                "Because $e^x$ is the unique exponential (up to scaling) that equals its own derivative, i.e. its slope at $x=0$ is exactly 1",
                "Because $\\ln x$ is only defined when the base is $e$"
              ],
              "answer": 2,
              "explain": "For $a^x$ the derivative is $a^x \\ln a$; choosing $a=e$ makes $\\ln a = 1$, so $\\frac{d}{dx}e^x = e^x$. Equivalently the slope of $e^x$ at $x=0$ is 1."
            },
            {
              "q": "What is $\\frac{d}{dx}\\,\\ln(\\cos x)$?",
              "choices": [
                "$\\frac{1}{\\cos x}$",
                "$-\\frac{\\sin x}{\\cos^2 x}$",
                "$\\tan x$",
                "$-\\tan x$"
              ],
              "answer": 3,
              "explain": "Chain rule: $\\frac{d}{dx}\\ln(g) = g'/g = \\frac{-\\sin x}{\\cos x} = -\\tan x$. Forgetting the minus from $\\frac{d}{dx}\\cos x$ gives the common wrong answer $\\tan x$."
            },
            {
              "q": "The sigmoid $\\sigma(x) = \\frac{1}{1+e^{-x}}$ has derivative $\\sigma(x)(1-\\sigma(x))$. What practical consequence does this have for training deep networks?",
              "choices": [
                "The gradient is largest in the tails, so learning speeds up for extreme inputs",
                "The derivative is undefined at $x=0$, causing instability",
                "The gradient peaks at $0.25$ (at $x=0$) and vanishes in the tails, contributing to the vanishing-gradient problem",
                "Because the derivative needs a logarithm, backprop through sigmoid is expensive"
              ],
              "answer": 2,
              "explain": "$\\sigma(1-\\sigma)$ is maximized at $\\sigma=0.5$ giving $0.25$, and shrinks toward 0 as inputs grow large in magnitude — small gradients stall learning in deep stacks of sigmoids."
            },
            {
              "q": "Which is the correct derivative of $f(x) = 3^{x}$?",
              "choices": [
                "$x\\,3^{x-1}$",
                "$3^x$",
                "$3^x \\ln 3$",
                "$\\frac{3^x}{\\ln 3}$"
              ],
              "answer": 2,
              "explain": "Exponential rule: $\\frac{d}{dx}a^x = a^x \\ln a$, so $\\frac{d}{dx}3^x = 3^x\\ln 3$ (choice index 2). The first choice wrongly applies the power rule, which is for a variable base with constant exponent, not a constant base with variable exponent."
            },
            {
              "q": "The lesson derives that $\\frac{d}{dx}\\,a^x = M(a)\\cdot a^x$ where $M(a) = \\lim_{h\\to 0}\\frac{a^h-1}{h}$. What does $M(a)$ represent geometrically?",
              "choices": [
                "The slope of the tangent line to $a^x$ at $x = 0$",
                "The y-intercept of the curve $a^x$",
                "The area under $a^x$ from $0$ to $1$",
                "The slope of $a^x$ at $x = 1$"
              ],
              "answer": 0,
              "explain": "Plugging $x=0$ into $f'(x)=M(a)\\cdot a^x$ gives $f'(0)=M(a)\\cdot a^0=M(a)$, so $M(a)$ is exactly the slope at $x=0$."
            },
            {
              "q": "Why is the factor $a^x$ able to be pulled out of the limit $\\lim_{h\\to 0}\\frac{a^{x+h}-a^x}{h}$?",
              "choices": [
                "Because $a^x$ equals $h$ in the limit",
                "Because $a^x$ approaches zero as $h\\to 0$",
                "Because the power rule lets any base factor out",
                "Because $a^{x+h}=a^x a^h$, so $a^x$ is constant with respect to the limit variable $h$"
              ],
              "answer": 3,
              "explain": "Using $a^{x+h}=a^x a^h$, the common factor $a^x$ does not depend on $h$, so it can be factored outside the limit over $h$."
            },
            {
              "q": "The lesson calls $e^x$ a 'fixed point of the differentiation operator.' Which statement best captures this property?",
              "choices": [
                "$e^x$ equals its own integral plus a constant only",
                "$e^x$ has a horizontal tangent at every point",
                "Differentiating $e^x$ any number of times leaves it unchanged",
                "The graph of $e^x$ never moves under translation"
              ],
              "answer": 2,
              "explain": "Since $\\frac{d}{dx}e^x=e^x$, repeated differentiation returns $e^x$ each time, making it invariant (a fixed point) under the operator."
            },
            {
              "q": "The lesson states $M(2)\\approx 0.693$ and $M(3)\\approx 1.099$, and defines $e$ by $M(e)=1$. What does this imply about $e$?",
              "choices": [
                "$e$ lies strictly between 2 and 3",
                "$e$ is slightly less than 2",
                "$e$ is greater than 3",
                "$e$ equals exactly 2.5"
              ],
              "answer": 0,
              "explain": "Because $M$ increases with the base and $M(2)<1<M(3)$, the base $e$ with $M(e)=1$ must fall between 2 and 3 (about 2.71828)."
            },
            {
              "q": "Compute $\\frac{d}{dx}\\left[x^2 \\sin x\\right]$.",
              "choices": [
                "$2x\\cos x$",
                "$x^2\\cos x$",
                "$2x\\sin x - x^2\\cos x$",
                "$2x\\sin x + x^2\\cos x$"
              ],
              "answer": 3,
              "explain": "This needs the product rule: $(uv)' = u'v + uv'$ with $u=x^2,\\ v=\\sin x$, giving $2x\\sin x + x^2\\cos x$. Choices 0 and 3 are the classic error of differentiating the factors separately and multiplying or dropping a term; choice 2 has the wrong sign on the second term."
            },
            {
              "q": "A radioactive sample decays as $N(t) = N_0\\,e^{-kt}$ with $k>0$. What is the instantaneous rate of change $N'(t)$?",
              "choices": [
                "$-k\\,N_0\\,e^{-kt}$",
                "$N_0\\,e^{-kt}$",
                "$-kt\\,N_0\\,e^{-kt}$",
                "$k\\,N_0\\,e^{-kt}$"
              ],
              "answer": 0,
              "explain": "By the chain rule, $\\frac{d}{dt}e^{-kt} = -k\\,e^{-kt}$, so $N'(t) = -k\\,N_0\\,e^{-kt}$, which is negative (decay). Forgetting the inner derivative $-k$ gives the distractor $N_0 e^{-kt}$, and writing $-kt$ instead of $-k$ confuses the exponent with the chain-rule factor."
            },
            {
              "q": "A student claims $\\frac{d}{dx}\\,e^{x^2} = e^{x^2}$ because '$e^x$ is its own derivative.' What is the actual derivative, and why is the student wrong?",
              "choices": [
                "$e^{x^2}$ — the student is correct.",
                "$2x\\,e^{x^2}$ — the exponent is not just $x$, so the chain rule contributes the factor $\\frac{d}{dx}(x^2)=2x$.",
                "$x^2 e^{x^2-1}$ — apply the power rule to the exponent.",
                "$2x\\,e^{2x}$ — bring the exponent down and reduce it."
              ],
              "answer": 1,
              "explain": "The rule $\\frac{d}{dx}e^u = e^u\\,u'$ requires multiplying by the derivative of the inner function $u=x^2$, giving $2x\\,e^{x^2}$. The 'self-derivative' shortcut only holds when the exponent is exactly $x$; treating $e^{x^2}$ like a power function or like $e^{2x}$ are common slips."
            },
            {
              "q": "Using $\\frac{d}{dx}\\ln x = \\frac{1}{x}$ and the chain rule, what is $\\frac{d}{dx}\\,\\ln(3x)$?",
              "choices": [
                "$\\frac{3}{x}$",
                "$\\frac{1}{3x}$",
                "$\\frac{3}{x^2}$",
                "$\\frac{1}{x}$"
              ],
              "answer": 3,
              "explain": "By the chain rule $\\frac{d}{dx}\\ln(3x) = \\frac{1}{3x}\\cdot 3 = \\frac{1}{x}$; equivalently $\\ln(3x)=\\ln 3 + \\ln x$ and the constant $\\ln 3$ differentiates to 0. The tempting wrong answer $\\frac{1}{3x}$ forgets to multiply by the inner derivative $3$; $\\frac{3}{x}$ keeps the factor but drops the $3$ in the denominator, and $\\frac{3}{x^2}$ mistakenly applies a power-rule-style $x^{-2}$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}\\big[e^x\\big]$?",
              "choices": [
                "$x\\,e^{x-1}$",
                "$e^x$",
                "$x\\,e^x$",
                "$1$"
              ],
              "answer": 1,
              "explain": "$e^x$ is its own derivative: $\\dfrac{d}{dx}e^x = e^x$. This fixed-point property is exactly what makes $e$ the *natural* base — the curve's height equals its slope at every point. (By the chain rule $\\frac{d}{dx}e^{g(x)} = g'(x)e^{g(x)}$, so $\\frac{d}{dx}e^{x^2} = 2x\\,e^{x^2}$, not $e^{x^2}$.)"
            },
            {
              "q": "What are $\\dfrac{d}{dx}[\\sin x]$ and $\\dfrac{d}{dx}[\\cos x]$?",
              "choices": [
                "$-\\cos x$ and $\\sin x$",
                "$\\cos x$ and $-\\sin x$",
                "both stay the same",
                "$\\cos x$ and $\\sin x$"
              ],
              "answer": 1,
              "explain": "$\\dfrac{d}{dx}\\sin x = \\cos x$ and $\\dfrac{d}{dx}\\cos x = -\\sin x$ (note the minus sign on cosine). Differentiating four times cycles back to the start: $\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}[\\ln x]$ (the natural logarithm, $x>0$)?",
              "choices": [
                "$\\ln x$",
                "$\\dfrac{1}{x}$",
                "$x$",
                "$\\dfrac{1}{x\\ln 10}$"
              ],
              "answer": 1,
              "explain": "$\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}$. For a general base, $\\frac{d}{dx}\\log_b x = \\frac{1}{x\\ln b}$, which is why the natural log (base $e$, $\\ln b = 1$) gives the cleanest derivative. With the chain rule this extends to $\\frac{d}{dx}\\ln(g(x)) = g'(x)/g(x)$."
            },
            {
              "q": "What is $\\dfrac{d}{dx}[\\tan x]$?",
              "choices": [
                "$\\sec^2 x$",
                "$-\\csc^2 x$",
                "$\\sec x\\tan x$",
                "$\\dfrac{1}{\\cos x}$"
              ],
              "answer": 0,
              "explain": "Writing $\\tan x = \\dfrac{\\sin x}{\\cos x}$ and applying the quotient rule gives $\\dfrac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\dfrac{1}{\\cos^2 x} = \\sec^2 x$. ($-\\csc^2 x$ is the derivative of $\\cot x$; $\\sec x\\tan x$ is the derivative of $\\sec x$.)"
            }
          ],
          "flashcards": [
            {
              "front": "$\\frac{d}{dx} e^x = ?$",
              "back": "$e^x$ — the exponential is its own derivative (this defines what makes $e$ special)."
            },
            {
              "front": "$\\frac{d}{dx} a^x = ?$ (general base $a>0$)",
              "back": "$a^x \\ln a$. Equivalently, write $a^x = e^{(\\ln a)x}$ and chain-rule it."
            },
            {
              "front": "$\\frac{d}{dx} \\ln x = ?$ and $\\frac{d}{dx}\\log_a x = ?$",
              "back": "$\\frac{1}{x}$ and $\\frac{1}{x\\ln a}$. The natural log gives the clean $1/x$; other bases pick up a $1/\\ln a$ factor."
            },
            {
              "front": "Derivatives of $\\sin x$ and $\\cos x$?",
              "back": "$\\frac{d}{dx}\\sin x = \\cos x$; $\\frac{d}{dx}\\cos x = -\\sin x$ (mind the minus sign)."
            },
            {
              "front": "Derivatives of $\\tan x$, $\\sec x$, $\\cot x$, $\\csc x$?",
              "back": "$\\tan' = \\sec^2 x$, $\\sec' = \\sec x\\tan x$, $\\cot' = -\\csc^2 x$, $\\csc' = -\\csc x\\cot x$. Every \"co-\" function carries a minus sign."
            },
            {
              "front": "Sigmoid $\\sigma(x)=\\frac{1}{1+e^{-x}}$: what is $\\sigma'(x)$?",
              "back": "$\\sigma(x)(1-\\sigma(x))$ — expressible in terms of the function's own output, which makes backprop cheap."
            }
          ],
          "homework": [
            {
              "prompt": "Differentiate $f(x) = e^{3x}\\sin(2x)$.",
              "hint": "It's a product, so use the product rule. Each factor is itself a composition, so the chain rule supplies the inner derivatives (a factor of 3 from $e^{3x}$, a factor of 2 from $\\sin 2x$).",
              "solution": "Product rule: $f' = (e^{3x})'\\sin(2x) + e^{3x}(\\sin 2x)'$. Chain rule gives $(e^{3x})' = 3e^{3x}$ and $(\\sin 2x)' = 2\\cos 2x$. So $f'(x) = 3e^{3x}\\sin(2x) + 2e^{3x}\\cos(2x) = e^{3x}\\bigl(3\\sin 2x + 2\\cos 2x\\bigr)$."
            },
            {
              "prompt": "Use logarithmic differentiation to find $\\frac{dy}{dx}$ for $y = x^{\\sin x}$ (with $x>0$).",
              "hint": "Both the base and the exponent contain $x$, so neither the power rule nor the exponential rule alone applies. Take $\\ln$ of both sides first, then differentiate implicitly.",
              "solution": "Take logs: $\\ln y = \\sin x \\cdot \\ln x$. Differentiate both sides (product rule on the right, implicit on the left): $\\frac{1}{y}y' = \\cos x \\ln x + \\sin x \\cdot \\frac{1}{x}$. Multiply by $y = x^{\\sin x}$: $y' = x^{\\sin x}\\left(\\cos x \\ln x + \\frac{\\sin x}{x}\\right)$."
            },
            {
              "prompt": "The softplus activation is $f(x) = \\ln(1 + e^{x})$. Show that its derivative is exactly the sigmoid $\\sigma(x) = \\frac{1}{1+e^{-x}}$.",
              "hint": "Use the chain rule on $\\ln(g(x))$ with $g(x)=1+e^x$. Then multiply numerator and denominator by $e^{-x}$ to match the sigmoid's standard form.",
              "solution": "$f'(x) = \\frac{g'(x)}{g(x)} = \\frac{e^x}{1+e^x}$. Multiply top and bottom by $e^{-x}$: $\\frac{e^x\\cdot e^{-x}}{(1+e^x)e^{-x}} = \\frac{1}{e^{-x}+1} = \\frac{1}{1+e^{-x}} = \\sigma(x)$. This is why softplus is called a \"smooth ReLU\": its slope is the sigmoid, ramping smoothly from 0 to 1."
            }
          ],
          "examples": [
            {
              "title": "Differentiating a general-base exponential",
              "body": "A bacterial colony has population $P(t) = 5 \\cdot 2^{3t}$ (in thousands), where $t$ is measured in hours. Find $P'(t)$, and determine the instantaneous growth rate at $t = 1$ hour.",
              "solution": "The base here is $2$, not $e$, so we use the general rule $\\frac{d}{dx}a^x = a^x \\ln a$ together with the chain rule.\n\n<strong>Step 1 — Identify the structure.</strong> Write $P(t) = 5 \\cdot a^{u}$ with $a = 2$ and inner function $u = 3t$. The constant $5$ stays out front by the constant-multiple rule.\n\n<strong>Step 2 — Apply the exponential rule with the chain rule.</strong> Differentiating $a^u$ gives $a^u \\ln a \\cdot u'$. Here $u' = \\frac{d}{dt}(3t) = 3$, so\n$$P'(t) = 5 \\cdot 2^{3t} \\ln 2 \\cdot 3 = 15 \\ln 2 \\cdot 2^{3t}.$$\n\n<strong>Step 3 — Sanity check the $\\ln 2$ factor.</strong> Recall that $2^{3t} = e^{3t \\ln 2}$. Differentiating this form with the chain rule gives $e^{3t\\ln 2}\\cdot 3\\ln 2 = 2^{3t}\\cdot 3\\ln 2$ — matching what we got. The $\\ln 2$ is exactly the constant $M(2)$ from the limit definition; it is what makes base $2$ grow slower than base $e$.\n\n<strong>Step 4 — Evaluate at $t = 1$.</strong> Then $2^{3(1)} = 2^3 = 8$, so\n$$P'(1) = 15 \\ln 2 \\cdot 8 = 120 \\ln 2 \\approx 120 (0.6931) \\approx 83.2.$$\n\n<strong>Answer:</strong> $P'(t) = 15\\ln 2 \\cdot 2^{3t}$, and the colony is growing at about $83.2$ thousand bacteria per hour at $t = 1$."
            },
            {
              "title": "Deriving the derivative of tangent via the quotient rule",
              "body": "Show from scratch that $\\frac{d}{dx}\\tan x = \\sec^2 x$ by applying the quotient rule to $\\tan x = \\dfrac{\\sin x}{\\cos x}$. Then use the result to find the slope of $y = \\tan x$ at $x = \\dfrac{\\pi}{4}$.",
              "solution": "We treat $\\tan x$ not as a memorized formula but as the quotient $\\frac{\\sin x}{\\cos x}$, then differentiate.\n\n<strong>Step 1 — Set up the quotient rule.</strong> With $f = \\sin x$ and $g = \\cos x$, the quotient rule says $\\left(\\frac{f}{g}\\right)' = \\dfrac{f'g - fg'}{g^2}$. We need the two basic trig derivatives: $f' = \\cos x$ and $g' = -\\sin x$ (note the minus sign on cosine's derivative).\n\n<strong>Step 2 — Substitute.</strong>\n$$\\frac{d}{dx}\\tan x = \\frac{(\\cos x)(\\cos x) - (\\sin x)(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x}.$$\nThe minus times minus turned the second term positive — a common place to slip.\n\n<strong>Step 3 — Simplify with the Pythagorean identity.</strong> Since $\\cos^2 x + \\sin^2 x = 1$,\n$$\\frac{d}{dx}\\tan x = \\frac{1}{\\cos^2 x} = \\sec^2 x.$$\nThis confirms the standard formula.\n\n<strong>Step 4 — Evaluate the slope at $x = \\frac{\\pi}{4}$.</strong> Here $\\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$, so $\\cos^2\\frac{\\pi}{4} = \\frac{1}{2}$, giving\n$$\\sec^2\\frac{\\pi}{4} = \\frac{1}{1/2} = 2.$$\n\n<strong>Answer:</strong> $\\dfrac{d}{dx}\\tan x = \\sec^2 x$, and the slope of $y = \\tan x$ at $x = \\frac{\\pi}{4}$ is $2$ — the tangent curve is rising at twice the rate of $y = x$ as it passes through the point $\\left(\\frac{\\pi}{4}, 1\\right)$."
            },
            {
              "title": "Logarithmic differentiation: the derivative of xˣ",
              "body": "How do you differentiate $y = x^x$? It is neither $x^n$ (the exponent isn't constant) nor $a^x$ (the base isn't constant). The trick is to take logs first.",
              "solution": "<strong>Take the log of both sides.</strong> $\\ln y = \\ln(x^x) = x \\ln x$ — turning the awkward power into a product.\n<strong>Differentiate implicitly.</strong> The left side is $\\frac{d}{dx}\\ln y = \\frac{y'}{y}$ (chain rule); the right, by the product rule, is $\\frac{d}{dx}(x \\ln x) = \\ln x + x \\cdot \\frac{1}{x} = \\ln x + 1$. So\n$$\\frac{y'}{y} = \\ln x + 1.$$\n<strong>Solve for $y'$.</strong> Multiply back by $y = x^x$:\n$$y' = x^x (\\ln x + 1).$$\nAt $x = 2$ that is $4(\\ln 2 + 1) \\approx 4(1.693) \\approx 6.77$.\n<strong>The technique.</strong> Logarithmic differentiation turns powers into products and products into sums (via $\\ln$), making otherwise-impossible derivatives routine — the standard move for variable base-and-exponent expressions and for big products or quotients the log splits apart."
            }
          ]
        }
      ]
    },
    {
      "id": "c-applications-derivatives",
      "title": "Applications of the Derivative",
      "lessons": [
        {
          "id": "c-implicit-related-rates",
          "title": "Implicit Differentiation & Related Rates",
          "minutes": 16,
          "content": "<h3>Why we need implicit differentiation</h3>\n<p>So far you've differentiated functions written in the explicit form $y = f(x)$ — output isolated on the left, a recipe in $x$ on the right. But many curves refuse to be written that way. Consider the unit circle:</p>\n$$x^2 + y^2 = 1.$$\n<p>Solving for $y$ forces a choice of branch: $y = +\\sqrt{1-x^2}$ or $y = -\\sqrt{1-x^2}$. The curve as a whole is not the graph of a single function. Worse, something like</p>\n$$x^3 + y^3 = 6xy$$\n<p>(the folium of Descartes) cannot be solved for $y$ in elementary closed form at all. Yet these curves obviously have well-defined tangent lines almost everywhere. We need a way to compute the slope $\\frac{dy}{dx}$ <em>without ever isolating $y$</em>.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>The trick is a change of attitude: treat $y$ not as an unknown to be solved for, but as an <strong>unspecified differentiable function of $x$</strong> that happens to satisfy the equation. Wherever the curve looks locally like a function (which is generically everywhere), this is legitimate, and the chain rule does all the work.</p>\n</div>\n\n<h3>The mechanics: differentiate both sides, then solve for the slope</h3>\n<p>The procedure is short:</p>\n<ol>\n<li>Differentiate <strong>both sides</strong> of the equation with respect to $x$, treating $y$ as a function of $x$.</li>\n<li>Every time you differentiate a term containing $y$, the chain rule produces a factor of $\\frac{dy}{dx}$ (often written $y'$).</li>\n<li>Collect all terms containing $\\frac{dy}{dx}$ on one side, factor it out, and solve.</li>\n</ol>\n\n<p>The one rule people forget: $\\frac{d}{dx}\\big[g(y)\\big] = g'(y)\\cdot \\frac{dy}{dx}$. For example,</p>\n$$\\frac{d}{dx}\\big[y^2\\big] = 2y\\,\\frac{dy}{dx}, \\qquad \\frac{d}{dx}\\big[\\sin y\\big] = \\cos y \\,\\frac{dy}{dx}, \\qquad \\frac{d}{dx}\\big[y\\big] = \\frac{dy}{dx}.$$\n<p>Contrast with $\\frac{d}{dx}[x^2] = 2x$, which has no extra factor because differentiating $x$ with respect to $x$ gives $1$. And watch products: a term like $xy$ needs the <strong>product rule</strong>:</p>\n$$\\frac{d}{dx}\\big[xy\\big] = 1\\cdot y + x\\cdot \\frac{dy}{dx} = y + x\\,y'.$$\n\n<h4>Worked example 1 — the circle</h4>\n<p>Differentiate $x^2 + y^2 = 1$:</p>\n$$2x + 2y\\,\\frac{dy}{dx} = 0 \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = -\\frac{x}{y}.$$\n<p>Sanity check on the upper branch $y=\\sqrt{1-x^2}$: explicit differentiation gives $\\frac{dy}{dx} = \\frac{-x}{\\sqrt{1-x^2}} = -\\frac{x}{y}$. Identical — but the implicit form $-\\frac{x}{y}$ is cleaner and works on <em>both</em> branches at once. Geometrically it says the tangent is perpendicular to the radius (slope of radius is $y/x$, slope of tangent is $-x/y$): their product is $-1$.</p>\n\n<h4>Worked example 2 — the folium of Descartes</h4>\n<p>Find the tangent slope to $x^3 + y^3 = 6xy$ at the point $(3,3)$.</p>\n<pre><code>Differentiate both sides w.r.t. x:\n  3x^2 + 3y^2 y' = 6( y + x y' )       # product rule on 6xy\n\nExpand:\n  3x^2 + 3y^2 y' = 6y + 6x y'\n\nCollect y' terms on the left, others on the right:\n  3y^2 y' - 6x y' = 6y - 3x^2\n  y'(3y^2 - 6x)   = 6y - 3x^2\n\nSolve:\n  y' = (6y - 3x^2) / (3y^2 - 6x) = (2y - x^2) / (y^2 - 2x)</code></pre>\n<p>At $(3,3)$: $y' = \\dfrac{2\\cdot 3 - 3^2}{3^2 - 2\\cdot 3} = \\dfrac{6-9}{9-6} = \\dfrac{-3}{3} = -1$. The tangent line there is $y - 3 = -1(x-3)$, i.e. $y = -x + 6$. Notice we never solved for $y$ — we only needed the coordinates of the point, which is exactly what implicit differentiation buys us.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Implicit differentiation is the conceptual seed of two pillars of modern AI. First, <strong>backpropagation</strong> is the chain rule applied through a deep composition where intermediate activations play the role of \"$y$ depending on $x$.\" Second, <strong>implicit-function differentiation</strong> lets you backprop through things defined only by an equation $F(x,\\theta)=0$ — fixed points, optimization solutions, ODE solvers — without unrolling them. Deep equilibrium models, OptNet layers, and the adjoint method in neural ODEs all rest on the identity you just used: differentiate the constraint, then solve for the derivative you want.</p>\n</div>\n\n<h3>When is this actually valid? (The honest version)</h3>\n<p>We assumed \"$y$ is a differentiable function of $x$.\" The <strong>Implicit Function Theorem</strong> tells us when that assumption is justified. If $F(x,y)=0$ and at a point $(a,b)$ on the curve we have $F$ continuously differentiable with $\\frac{\\partial F}{\\partial y}(a,b) \\neq 0$, then near that point the curve <em>is</em> the graph of a differentiable function $y(x)$, and</p>\n$$\\frac{dy}{dx} = -\\frac{\\partial F/\\partial x}{\\partial F/\\partial y}.$$\n<p>Look at the circle: $F = x^2+y^2-1$, so $-F_x/F_y = -\\frac{2x}{2y} = -\\frac{x}{y}$ — matching what we found, and the formula visibly breaks where $F_y = 2y = 0$, i.e. at $(\\pm 1, 0)$, exactly the points with vertical tangents where no function $y(x)$ exists. So the requirement \"solve for $\\frac{dy}{dx}$\" failing (division by zero) is not a bookkeeping accident; it flags genuine geometric features.</p>\n\n<h3>Related rates: implicit differentiation in time</h3>\n<div data-viz=\"calc-chain\"></div>\n<p>Related-rates problems are implicit differentiation with respect to <strong>time $t$</strong>. The setup: several quantities are linked by an equation (a geometric or physical <em>constraint</em>), and they all change as time passes. Differentiating the constraint with respect to $t$ links their rates. The chain rule again supplies factors like $\\frac{dx}{dt}$ wherever a space variable appears.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>One equation, differentiated, becomes a relationship among rates. This is the same move as <em>differentiating a constraint to get a velocity constraint</em> in robotics and physics engines, or differentiating a conservation law to get a flux balance. \"Related rates\" is just the first place a learner meets the deep idea: <strong>derivatives of constraints are themselves constraints.</strong></p>\n</div>\n\n<h4>A reliable recipe</h4>\n<ol>\n<li><strong>Draw and label.</strong> Name every changing quantity with a variable; mark which rates are given and which is asked.</li>\n<li><strong>Find the constraint equation</strong> relating the variables — Pythagoras, similar triangles, a volume/area formula, etc. It must hold <em>at all times</em>, not just the instant of interest.</li>\n<li><strong>Eliminate constants early.</strong> If a quantity is fixed (a wall height, a fixed cone shape), substitute its value <em>before</em> differentiating, or use it to reduce variables.</li>\n<li><strong>Differentiate the constraint with respect to $t$.</strong> Every variable picks up its own rate via the chain rule.</li>\n<li><strong>Plug in the instant.</strong> Substitute the known values and rates only <em>after</em> differentiating — never before, or you'll differentiate away the very motion you care about.</li>\n<li><strong>Solve and interpret</strong> (units, sign).</li>\n</ol>\n\n<div class=\"callout\">\n<div class=\"c-tag\">The #1 mistake</div>\n<p>Do not plug in the numeric values of the changing variables until <em>after</em> you differentiate. If you substitute \"$x=6$\" into the constraint first, $x$ becomes a constant and its rate $\\frac{dx}{dt}$ vanishes from your equation. Substitute the instantaneous snapshot only at the very last step.</p>\n</div>\n\n<h4>Worked example 3 — the sliding ladder</h4>\n<p>A 10-ft ladder leans against a vertical wall. The base is pulled away from the wall at $2$ ft/s. How fast is the top sliding down when the base is $6$ ft from the wall?</p>\n<p><strong>Label.</strong> Let $x$ = distance from wall to base, $y$ = height of top. Given $\\frac{dx}{dt} = +2$ ft/s; find $\\frac{dy}{dt}$ when $x=6$.</p>\n<p><strong>Constraint</strong> (Pythagoras, ladder length fixed at 10):</p>\n$$x^2 + y^2 = 100.$$\n<p><strong>Differentiate w.r.t. $t$:</strong></p>\n$$2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\quad\\Longrightarrow\\quad \\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt}.$$\n<p><strong>Plug in the instant.</strong> When $x=6$, the constraint gives $y = \\sqrt{100-36} = 8$. So</p>\n$$\\frac{dy}{dt} = -\\frac{6}{8}\\cdot 2 = -1.5 \\text{ ft/s}.$$\n<p>The top slides <em>down</em> at $1.5$ ft/s (negative = decreasing height). Insight: as $y \\to 0$ the factor $\\frac{x}{y}$ blows up, so the top accelerates without bound near the ground — a real, if idealized, phenomenon. Note we used $\\frac{d}{dt}[100]=0$ because the ladder length is constant; that zero is what couples the two rates.</p>\n\n<h4>Worked example 4 — the inflating balloon</h4>\n<p>Air is pumped into a spherical balloon at $100\\ \\text{cm}^3/\\text{s}$. How fast is the radius growing when $r = 5$ cm?</p>\n<p><strong>Constraint:</strong> $V = \\frac{4}{3}\\pi r^3$. <strong>Differentiate w.r.t. $t$:</strong></p>\n$$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}.$$\n<p>Note $4\\pi r^2$ is exactly the surface area — volume grows at (rate of radius) $\\times$ (surface area), which makes physical sense: new volume is a thin shell. Solve and substitute the instant:</p>\n$$\\frac{dr}{dt} = \\frac{1}{4\\pi r^2}\\frac{dV}{dt} = \\frac{100}{4\\pi (25)} = \\frac{1}{\\pi} \\approx 0.318 \\text{ cm/s}.$$\n<p>Even at constant inflow, $\\frac{dr}{dt} \\propto 1/r^2$, so the radius grows ever more slowly as the balloon enlarges.</p>\n\n<h4>Worked example 5 — the walking shadow (similar triangles)</h4>\n<p>A 6-ft person walks away from a 15-ft lamppost at $4$ ft/s. How fast is the tip of their shadow moving?</p>\n<p><strong>Label.</strong> Let $x$ = person's distance from the post, $s$ = length of shadow. The tip of the shadow is at distance $x+s$ from the post; we want $\\frac{d}{dt}(x+s)$.</p>\n<p><strong>Constraint</strong> (similar triangles — big triangle post/tip, small triangle person/tip):</p>\n$$\\frac{15}{x+s} = \\frac{6}{s} \\;\\Longrightarrow\\; 15 s = 6(x+s) \\;\\Longrightarrow\\; 9s = 6x \\;\\Longrightarrow\\; s = \\tfrac{2}{3}x.$$\n<p><strong>Differentiate:</strong> $\\frac{ds}{dt} = \\frac{2}{3}\\frac{dx}{dt} = \\frac{2}{3}(4) = \\frac{8}{3}$ ft/s. The shadow tip's speed is</p>\n$$\\frac{d}{dt}(x+s) = \\frac{dx}{dt} + \\frac{ds}{dt} = 4 + \\frac{8}{3} = \\frac{20}{3} \\approx 6.67 \\text{ ft/s}.$$\n<p>Strikingly, the tip's speed depends only on the height ratio, <em>not</em> on $x$ — it's the same whether the person is near or far. That \"the answer is independent of the snapshot\" is a hint you set up the constraint cleanly.</p>\n\n<h3>Common pitfalls, collected</h3>\n<ul>\n<li><strong>Forgetting the $\\frac{dy}{dx}$ factor</strong> on $y$-terms. $\\frac{d}{dx}[y^3] = 3y^2 y'$, never $3y^2$.</li>\n<li><strong>Missing the product rule</strong> on mixed terms like $xy$, $x^2 y$, $xy^2$.</li>\n<li><strong>Plugging in numbers before differentiating</strong> in related rates — kills the motion.</li>\n<li><strong>Using a constraint that only holds at one instant.</strong> The equation must be true for an interval of time so its time-derivative is meaningful. (E.g. don't write \"$x=6$\" as your constraint.)</li>\n<li><strong>Sign confusion:</strong> a quantity that decreases has a negative rate. Let the math report the sign; interpret it afterward.</li>\n</ul>\n\n<h3>Takeaways</h3>\n<ul>\n<li>Implicit differentiation = chain rule with $y$ treated as a hidden function of $x$; differentiate both sides, solve for $\\frac{dy}{dx}$.</li>\n<li>The Implicit Function Theorem guarantees this is valid wherever $\\partial F/\\partial y \\neq 0$, and the closed form is $\\frac{dy}{dx} = -F_x/F_y$.</li>\n<li>Related rates = implicit differentiation in $t$: find the constraint, differentiate it, then substitute the instant.</li>\n<li>The unifying idea — differentiate a constraint to get a relation among rates — reappears across physics, robotics, and the differentiable-optimization layers of modern ML.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: related rates are just the chain rule wearing a clock</summary>\n<p>When a curve is given implicitly — like $x^2 + y^2 = 25$ — you often can't solve for $y$, but you can still differentiate. <b>Implicit differentiation</b> treats $y$ as a function of $x$ and applies the chain rule: $\\frac{d}{dx}(y^2) = 2y\\,\\frac{dy}{dx}$. The $\\frac{dy}{dx}$ falls out precisely because $y$ rides on $x$.</p>\n<p><b>Related rates</b> are the identical move with <em>time</em> as the hidden variable. Differentiate a relationship with respect to $t$ and every quantity contributes its own rate through the chain rule. A ladder of length $L$ sliding down a wall obeys $x^2 + y^2 = L^2$; differentiating with respect to $t$ gives $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$ — one equation linking the two speeds, so knowing how fast the base slides gives how fast the top falls.</p>\n<p>The \"aha\": you never solve for the variables themselves. The chain rule turns a static constraint into a <em>relationship between rates</em>, which is why a single geometric fact (Pythagoras) tells you the falling speed the instant you know the base's speed and position.</p>\n</details>\n<h4>Try it in code</h4>\n<p>Implicitly differentiate the circle <code>x² + y² = 25</code>: <code>2x + 2y·y' = 0</code> gives <code>y' = −x/y</code>. Run it at the point (3,4):</p>\n<div data-code=\"javascript\" data-expected=\"-0.75\">// Implicit differentiation of x^2 + y^2 = 25: 2x + 2y y' = 0  -&gt;  y' = -x/y.\nfunction dydx(x, y) {\n  return -x / y;\n}\nconsole.log(dydx(3, 4).toFixed(2));   // -0.75 -- the slope of the circle at (3,4)</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: implicit differentiation</summary>\n<p>Related rates differentiate with respect to <em>time</em>; the same trick handles a different problem — finding a slope on a curve that <em>is not</em> written as $y = f(x)$.</p>\n<p><b>The idea.</b> A circle $x^2 + y^2 = 25$ is not a function (two $y$'s per $x$). To get its slope you do not solve for $y$ — you differentiate <em>both sides</em> with respect to $x$, treating $y$ as an unknown function $y(x)$ and applying the chain rule to anything with $y$: $2x + 2y\\,\\dfrac{dy}{dx} = 0$, so $\\dfrac{dy}{dx} = -\\dfrac{x}{y}$.</p>\n<p><b>Read it off.</b> At the point $(3,4)$ the slope is $-\\tfrac34$ — the tangent to the circle there, with no need to write $y = \\sqrt{25-x^2}$ first. The key move is $\\dfrac{d}{dx}\\,y^2 = 2y\\,\\dfrac{dy}{dx}$: since $y$ is a function of $x$, its derivative carries a $\\dfrac{dy}{dx}$ factor (exactly the chain rule).</p>\n<p>The \"aha\": implicit differentiation and related rates are the <em>same</em> technique — differentiate a relation while respecting that some variables depend on another. Related rates differentiate in $t$; implicit differentiation differentiates in $x$ — both let you find a rate you want without ever isolating the variable.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the implicit function theorem and inverse derivatives</summary>\n<p>Implicit differentiation (the other dives) <em>works</em> — but <em>when</em> is it valid, and what does it tell you? The <strong>implicit function theorem</strong> (IFT) answers both.</p>\n<p><b>When a curve defines a function.</b> An equation $F(x,y)=0$ (like $x^2+y^2=1$) traces a curve, not necessarily a function. The IFT says: near a point where $\\frac{\\partial F}{\\partial y}\\neq 0$, you <em>can</em> solve for $y$ as a smooth function of $x$, and its derivative is $\\frac{dy}{dx}=-\\dfrac{\\partial F/\\partial x}{\\partial F/\\partial y}$ — exactly what implicit differentiation computes. Where $\\partial F/\\partial y=0$ (the top and bottom of the circle, with vertical tangents) the trick fails — and the IFT predicts precisely that.</p>\n<p><b>Inverse-function derivatives.</b> A special case: applied to $y=f(x)$ it gives $(f^{-1})'(y)=\\frac{1}{f'(x)}$ — the slope of the inverse is the reciprocal of the slope. That is how $\\frac{d}{dx}\\ln x=\\frac{1}{x}$ and the derivative of $\\arcsin x$ are obtained, by differentiating the inverse relationship.</p>\n<p>The \"aha\": implicit differentiation is licensed by the implicit function theorem — near any point where $\\frac{\\partial F}{\\partial y}\\neq 0$, $F(x,y)=0$ secretly defines $y(x)$ with slope $-\\frac{F_x}{F_y}$. The same idea, applied to $f$ and $f^{-1}$, gives the reciprocal-slope rule for inverse derivatives.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Differentiating $x^2 y + y^3 = 7$ implicitly with respect to $x$ gives which left-hand side before solving for $y'$?",
              "choices": [
                "$2x + 3y^2 y' = 0$",
                "$2xy + x^2 y' + 3y^2 y' = 0$",
                "$2xy + 3y^2 y' = 0$",
                "$x^2 y' + 3y^2 = 0$"
              ],
              "answer": 1,
              "explain": "The term $x^2 y$ needs the product rule: $2xy + x^2 y'$. The term $y^3$ gives $3y^2 y'$. The constant 7 differentiates to 0."
            },
            {
              "q": "In the sliding-ladder problem, why must you wait until after differentiating to substitute $x = 6$?",
              "choices": [
                "Because the Pythagorean theorem only holds when $x = 6$",
                "Because $y$ is unknown until $x$ is fixed",
                "Because the chain rule cannot be applied to numbers",
                "Because substituting $x = 6$ first makes $x$ a constant, so its rate $dx/dt$ disappears from the equation"
              ],
              "answer": 3,
              "explain": "The constraint must hold over an interval of time so its time-derivative captures the motion; fixing $x$ early zeroes out $dx/dt$, the very rate driving the problem."
            },
            {
              "q": "For a curve $F(x,y)=0$, implicit differentiation fails to yield a finite $dy/dx$ exactly when:",
              "choices": [
                "$\\partial F/\\partial x = 0$",
                "$\\partial F/\\partial y = 0$",
                "$F(x,y) \\neq 0$",
                "both partials are nonzero"
              ],
              "answer": 1,
              "explain": "Since $dy/dx = -F_x/F_y$, the slope is undefined (vertical tangent) when $F_y = 0$ — precisely where the Implicit Function Theorem's hypothesis fails."
            },
            {
              "q": "Air enters a spherical balloon at a constant rate. As the balloon gets larger, the radius's rate of growth $dr/dt$:",
              "choices": [
                "increases proportionally to $r$",
                "stays constant",
                "decreases proportionally to $1/r^2$",
                "decreases proportionally to $1/r$"
              ],
              "answer": 2,
              "explain": "From $dV/dt = 4\\pi r^2\\, dr/dt$, we get $dr/dt = (dV/dt)/(4\\pi r^2)$, which scales as $1/r^2$ for fixed inflow."
            },
            {
              "q": "When differentiating both sides of $\\sin(xy) = x$ with respect to $x$, what is $\\frac{d}{dx}[\\sin(xy)]$?",
              "choices": [
                "$\\cos(xy)$",
                "$\\cos(xy)\\cdot x\\,y'$",
                "$\\cos(xy)\\cdot(y + x\\,y')$",
                "$\\cos(xy)\\cdot y'$"
              ],
              "answer": 2,
              "explain": "The chain rule gives $\\cos(xy)$ times the derivative of the inside $xy$, which by the product rule is $y + x\\,y'$."
            },
            {
              "q": "Using $\\frac{dy}{dx} = -\\frac{x}{y}$ for the unit circle, what is the slope of the tangent line at the point $\\left(\\frac{1}{2}, -\\frac{\\sqrt{3}}{2}\\right)$?",
              "choices": [
                "$-\\frac{\\sqrt{3}}{3}$",
                "$-\\sqrt{3}$",
                "$\\sqrt{3}$",
                "$\\frac{\\sqrt{3}}{3}$"
              ],
              "answer": 3,
              "explain": "Substituting gives $-\\frac{1/2}{-\\sqrt{3}/2} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$, positive because $x>0$ and $y<0$ make $-x/y$ positive."
            },
            {
              "q": "Why does the chain rule produce a factor of $\\frac{dy}{dx}$ when differentiating a term like $y^2$ but NOT when differentiating $x^2$?",
              "choices": [
                "Because $\\frac{dy}{dx}$ only appears in equations that cannot be solved explicitly",
                "Because $y^2$ is always larger than $x^2$ near the curve",
                "Because squaring $y$ requires the product rule but squaring $x$ does not",
                "Because $y$ is being treated as a function of $x$, while $x$ differentiated with respect to itself gives a factor of $1$"
              ],
              "answer": 3,
              "explain": "We treat $y$ as an unspecified differentiable function of $x$, so $\\frac{d}{dx}[y^2] = 2y\\,y'$, whereas $\\frac{dx}{dx} = 1$ leaves no extra factor."
            },
            {
              "q": "After implicitly differentiating, you obtain $2x + 2y\\,y' = 4y' + 4x$. Which expression correctly solves for $y'$?",
              "choices": [
                "$y' = \\frac{2x - 4x}{2y - 4}$",
                "$y' = \\frac{4x - 2x}{2y - 4}$",
                "$y' = \\frac{4x - 2x}{4 - 2y}$",
                "$y' = \\frac{2y - 4}{4x - 2x}$"
              ],
              "answer": 1,
              "explain": "Move the $y'$ terms to one side and the rest to the other: $2y\\,y' - 4y' = 4x - 2x$, so $y'(2y - 4) = 4x - 2x$, giving $y' = \\frac{4x - 2x}{2y - 4}$."
            },
            {
              "q": "For the folium of Descartes $x^3 + y^3 = 6xy$, differentiating implicitly gives $3x^2 + 3y^2 y' = 6y + 6x y'$. Solving for $y'$ yields:",
              "choices": [
                "$y' = \\dfrac{6y - 3x^2}{3y^2 - 6x}$",
                "$y' = \\dfrac{3x^2 - 6y}{3y^2 - 6x}$",
                "$y' = \\dfrac{6y - 3x^2}{6x - 3y^2}$",
                "$y' = \\dfrac{3x^2 + 6y}{3y^2 + 6x}$"
              ],
              "answer": 0,
              "explain": "Collect the $y'$ terms on one side: $3y^2 y' - 6x y' = 6y - 3x^2$, so $y'(3y^2 - 6x) = 6y - 3x^2$, giving the first option. The product term $6xy$ requires the product rule, producing both $6y$ and $6x y'$, which the sign-flipped distractors mishandle."
            },
            {
              "q": "A 13-ft ladder slides down a wall with the base moving away at $\\frac{dx}{dt} = 2$ ft/s. Using $x^2 + y^2 = 169$, what is the correct first step toward finding $\\frac{dy}{dt}$?",
              "choices": [
                "Solve for $y$ as $\\sqrt{169 - x^2}$ and plug in the numbers before differentiating",
                "Differentiate to get $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$, then solve for $\\frac{dy}{dt}$",
                "Set $\\frac{dy}{dt} = -\\frac{dx}{dt}$ since the ladder length is constant",
                "Differentiate to get $2x + 2y\\frac{dy}{dt} = 0$, treating $x$ as a constant"
              ],
              "answer": 1,
              "explain": "Both $x$ and $y$ are functions of time, so differentiating $x^2+y^2=169$ with respect to $t$ gives $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$ via the chain rule. The last option wrongly drops $\\frac{dx}{dt}$, and the third ignores that the rates relate through the geometry, not by a fixed ratio."
            },
            {
              "q": "Differentiating $e^{y} = x + y$ implicitly with respect to $x$ gives which equation?",
              "choices": [
                "$e^{y} = 1 + y'$",
                "$y' \\, e^{y} = 1$",
                "$e^{y} y' = 1 + y'$",
                "$e^{y} = 1$"
              ],
              "answer": 2,
              "explain": "The chain rule sends $\\frac{d}{dx}[e^y] = e^y \\cdot y'$, while the right side $x+y$ differentiates to $1 + y'$. Forgetting the $y'$ factor on $e^y$ (first option) is the classic error; the second option drops the $+y$ term's derivative."
            },
            {
              "q": "Water drains from a cone so the volume satisfies $V = \\frac{1}{3}\\pi r^2 h$ with $r$ and $h$ both shrinking. Treating all quantities as functions of $t$, $\\frac{dV}{dt}$ equals:",
              "choices": [
                "$\\frac{1}{3}\\pi \\left(2r\\frac{dr}{dt}\\cdot h + r^2 \\frac{dh}{dt}\\right)$",
                "$\\frac{1}{3}\\pi r^2 \\frac{dh}{dt}$",
                "$\\frac{1}{3}\\pi \\left(2r\\frac{dr}{dt}\\right) h$",
                "$\\frac{1}{3}\\pi \\left(2r\\,h + r^2\\right)$"
              ],
              "answer": 0,
              "explain": "Since $r^2 h$ is a product of two time-varying factors, the product rule and chain rule give $\\frac{d}{dt}[r^2 h] = 2r\\frac{dr}{dt}\\,h + r^2\\frac{dh}{dt}$. The first two options each hold one variable artificially constant, and the last forgets the $\\frac{dr}{dt}$ and $\\frac{dh}{dt}$ chain-rule factors entirely."
            },
            {
              "q": "When is implicit differentiation the right tool?",
              "choices": [
                "When $y$ is defined implicitly by an equation and is hard or impossible to solve explicitly for $y$",
                "When $x$ and $y$ are independent variables",
                "When the function has no derivative",
                "When the equation is linear"
              ],
              "answer": 0,
              "explain": "Implicit differentiation finds $dy/dx$ directly from an equation $F(x,y)=0$ — e.g. $x^3+y^3=6xy$ — without first solving for $y$ explicitly (often impossible). Differentiate both sides w.r.t. $x$ treating $y$ as a function of $x$ (so $\\frac{d}{dx}y^n = ny^{n-1}y'$ by the chain rule), then solve for $y'$."
            },
            {
              "q": "In a related-rates problem, you differentiate the equation relating the quantities with respect to:",
              "choices": [
                "time $t$ (every quantity is a function of $t$, so the chain rule applies)",
                "$x$ only",
                "the largest variable",
                "a constant"
              ],
              "answer": 0,
              "explain": "Related rates link how quantities change *over time*, so you differentiate the relating equation with respect to $t$. Each variable is a function of $t$, so the chain rule brings in its rate (e.g. $\\frac{d}{dt}r^2 = 2r\\frac{dr}{dt}$). Plug in the known values/rates only *after* differentiating."
            },
            {
              "q": "For $xy = 12$, what is $\\dfrac{dy}{dx}$ by implicit differentiation?",
              "choices": [
                "$\\dfrac{y}{x}$",
                "$-\\dfrac{x}{y}$",
                "$\\dfrac{12}{x^2}$",
                "$-\\dfrac{y}{x}$"
              ],
              "answer": 3,
              "explain": "Differentiate $xy=12$ with the product rule: $1\\cdot y + x\\cdot y' = 0$, so $x y' = -y$ and $y' = -\\dfrac{y}{x}$. Check against the explicit form $y = 12/x$: $y' = -12/x^2 = -y/x$. ✓"
            },
            {
              "q": "For a curve defined implicitly by $F(x,y)=0$, the value $\\dfrac{dy}{dx}$ at a point gives:",
              "choices": [
                "the area enclosed by the curve",
                "the curvature of the curve",
                "the slope of the tangent line to the curve at that point",
                "the $y$-coordinate at that point"
              ],
              "answer": 2,
              "explain": "As for explicit functions, $\\frac{dy}{dx}$ is the slope of the tangent line — here to the implicit curve at the chosen point. For the unit circle $x^2+y^2=1$, $\\frac{dy}{dx}=-x/y$, so at $\\left(\\tfrac{\\sqrt2}{2},\\tfrac{\\sqrt2}{2}\\right)$ the tangent slope is $-1$."
            }
          ],
          "flashcards": [
            {
              "front": "What extra factor appears when you differentiate a $y$-term with respect to $x$ in implicit differentiation?",
              "back": "A factor of $dy/dx$ (the chain rule): $\\frac{d}{dx}[g(y)] = g'(y)\\,\\frac{dy}{dx}$. E.g. $\\frac{d}{dx}[y^2] = 2y\\,y'$."
            },
            {
              "front": "Closed-form slope of an implicitly defined curve $F(x,y)=0$?",
              "back": "$\\frac{dy}{dx} = -\\dfrac{\\partial F/\\partial x}{\\partial F/\\partial y}$, valid where $\\partial F/\\partial y \\neq 0$ (Implicit Function Theorem)."
            },
            {
              "front": "The single most important ordering rule in related-rates problems?",
              "back": "Differentiate the constraint with respect to $t$ FIRST; substitute the instantaneous numeric values only AFTER differentiating."
            },
            {
              "front": "Differentiate the sphere volume to relate volume and radius rates.",
              "back": "$V=\\frac{4}{3}\\pi r^3 \\Rightarrow \\frac{dV}{dt} = 4\\pi r^2\\frac{dr}{dt}$ (the coefficient $4\\pi r^2$ is the surface area)."
            },
            {
              "front": "What is the constraint equation for the sliding-ladder problem (length $L$)?",
              "back": "$x^2 + y^2 = L^2$; differentiating gives $x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0$, so $\\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt}$."
            },
            {
              "front": "How does implicit differentiation connect to modern ML?",
              "back": "Backprop is the chain rule through compositions; implicit-function differentiation lets you backprop through equation-defined layers (deep equilibrium models, OptNet, neural-ODE adjoint) by differentiating the constraint $F(x,\\theta)=0$ and solving for the derivative."
            }
          ],
          "homework": [
            {
              "prompt": "Find $\\frac{dy}{dx}$ for the curve $\\sin(xy) = x + y$, and evaluate it at the origin $(0,0)$.",
              "hint": "The left side needs the chain rule (outer $\\sin$) AND the product rule (inner $xy$). Collect all $y'$ terms after differentiating.",
              "solution": "Differentiate both sides w.r.t. $x$. Left: $\\frac{d}{dx}[\\sin(xy)] = \\cos(xy)\\cdot\\frac{d}{dx}[xy] = \\cos(xy)\\,(y + x y')$. Right: $\\frac{d}{dx}[x+y] = 1 + y'$. So $\\cos(xy)(y + x y') = 1 + y'$. Expand: $y\\cos(xy) + x\\cos(xy)\\,y' = 1 + y'$. Collect $y'$: $y'(x\\cos(xy) - 1) = 1 - y\\cos(xy)$, giving $y' = \\dfrac{1 - y\\cos(xy)}{x\\cos(xy) - 1}$. At $(0,0)$, $\\cos(0)=1$, so $y' = \\dfrac{1 - 0}{0 - 1} = -1$."
            },
            {
              "prompt": "A conical tank (point down) has height 12 ft and top radius 6 ft. Water is poured in at $9\\ \\text{ft}^3/\\text{min}$. How fast is the water level rising when the water is 4 ft deep?",
              "hint": "Use similar triangles to eliminate the radius: the water cone has the same shape as the tank, so $r/h = 6/12$. Substitute that into $V=\\frac{1}{3}\\pi r^2 h$ BEFORE differentiating, so $V$ depends on $h$ alone.",
              "solution": "By similar triangles $\\frac{r}{h} = \\frac{6}{12} = \\frac12$, so $r = h/2$. Then $V = \\frac13\\pi r^2 h = \\frac13\\pi\\left(\\frac{h}{2}\\right)^2 h = \\frac{\\pi}{12}h^3$. Differentiate w.r.t. $t$: $\\frac{dV}{dt} = \\frac{\\pi}{12}\\cdot 3h^2\\frac{dh}{dt} = \\frac{\\pi}{4}h^2\\frac{dh}{dt}$. Solve for $\\frac{dh}{dt} = \\frac{4}{\\pi h^2}\\frac{dV}{dt}$. At $h=4$ with $\\frac{dV}{dt}=9$: $\\frac{dh}{dt} = \\frac{4}{\\pi\\cdot 16}\\cdot 9 = \\frac{36}{16\\pi} = \\frac{9}{4\\pi} \\approx 0.716$ ft/min."
            },
            {
              "prompt": "Two cars leave the same intersection at the same time: car A drives north at 30 mph, car B drives east at 40 mph. How fast is the straight-line distance between them increasing 2 hours later?",
              "hint": "Let $a$ and $b$ be the cars' distances from the intersection and $D$ the distance between them. The constraint is $D^2 = a^2 + b^2$. Differentiate, then plug in the positions at $t=2$.",
              "solution": "Constraint: $D^2 = a^2 + b^2$. Differentiate w.r.t. $t$: $2D\\frac{dD}{dt} = 2a\\frac{da}{dt} + 2b\\frac{db}{dt}$, i.e. $D\\frac{dD}{dt} = a\\frac{da}{dt} + b\\frac{db}{dt}$. At $t=2$: $a = 30\\cdot 2 = 60$, $b = 40\\cdot 2 = 80$, so $D = \\sqrt{60^2+80^2} = \\sqrt{3600+6400} = \\sqrt{10000} = 100$. With $\\frac{da}{dt}=30$, $\\frac{db}{dt}=40$: $100\\frac{dD}{dt} = 60(30) + 80(40) = 1800 + 3200 = 5000$, so $\\frac{dD}{dt} = 50$ mph. (Makes sense: $\\sqrt{30^2+40^2}=50$, the constant separation speed.)"
            }
          ],
          "examples": [
            {
              "title": "Slope of the Unit Circle at a Point",
              "body": "The point $\\left(\\tfrac{1}{2}, \\tfrac{\\sqrt{3}}{2}\\right)$ lies on the unit circle $x^2 + y^2 = 1$. Use implicit differentiation to find $\\frac{dy}{dx}$ in general, then evaluate the slope of the tangent line at that point.",
              "solution": "We treat $y$ as a differentiable function of $x$ and differentiate both sides of $x^2 + y^2 = 1$ with respect to $x$.\n\n<strong>Differentiate term by term.</strong> The term $x^2$ gives $2x$. The term $y^2$ requires the chain rule: differentiating $y^2$ with respect to $x$ gives $2y \\cdot \\frac{dy}{dx}$. The constant $1$ gives $0$:\n$$2x + 2y\\,\\frac{dy}{dx} = 0.$$\n\n<strong>Solve for $\\frac{dy}{dx}$.</strong> Isolate the derivative term and divide:\n$$2y\\,\\frac{dy}{dx} = -2x \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = -\\frac{x}{y}.$$\n\n<strong>Evaluate at the point.</strong> Substitute $x = \\tfrac{1}{2}$ and $y = \\tfrac{\\sqrt{3}}{2}$:\n$$\\frac{dy}{dx} = -\\frac{\\tfrac{1}{2}}{\\tfrac{\\sqrt{3}}{2}} = -\\frac{1}{\\sqrt{3}} = -\\frac{\\sqrt{3}}{3}.$$\n\n<strong>Sanity check.</strong> On a circle the radius to a point is perpendicular to the tangent there. The radius has slope $\\frac{\\sqrt{3}/2}{1/2} = \\sqrt{3}$, and the tangent slope $-\\frac{1}{\\sqrt{3}}$ is its negative reciprocal — exactly as expected.\n\n$$\\boxed{\\dfrac{dy}{dx} = -\\dfrac{x}{y}, \\qquad \\left.\\dfrac{dy}{dx}\\right|_{\\left(\\frac{1}{2},\\,\\frac{\\sqrt{3}}{2}\\right)} = -\\dfrac{\\sqrt{3}}{3}.}$$"
            },
            {
              "title": "Related Rates: The Sliding Ladder",
              "body": "A $10$-foot ladder leans against a vertical wall. The base is pulled away from the wall at a constant rate of $2$ ft/s. How fast is the top of the ladder sliding down the wall at the instant the base is $6$ feet from the wall?",
              "solution": "Let $x$ be the distance from the wall to the base of the ladder and $y$ the height of the top of the ladder, both functions of time $t$. The ladder length is fixed, so the Pythagorean relation holds at all times:\n$$x^2 + y^2 = 10^2 = 100.$$\n\n<strong>Differentiate both sides with respect to time.</strong> Here every variable is an unspecified function of $t$, so the chain rule attaches a rate to each term:\n$$2x\\,\\frac{dx}{dt} + 2y\\,\\frac{dy}{dt} = 0.$$\nDividing by $2$:\n$$x\\,\\frac{dx}{dt} + y\\,\\frac{dy}{dt} = 0.$$\n\n<strong>Find the missing geometric value.</strong> At the instant in question $x = 6$. From $x^2 + y^2 = 100$:\n$$y = \\sqrt{100 - 36} = \\sqrt{64} = 8 \\text{ ft}.$$\n\n<strong>Insert the known rate and solve for $\\frac{dy}{dt}$.</strong> The base moves away from the wall, so $\\frac{dx}{dt} = +2$ ft/s. Substitute $x = 6$, $y = 8$:\n$$6(2) + 8\\,\\frac{dy}{dt} = 0 \\quad\\Longrightarrow\\quad 12 + 8\\,\\frac{dy}{dt} = 0.$$\nSolving:\n$$\\frac{dy}{dt} = -\\frac{12}{8} = -\\frac{3}{2} = -1.5 \\text{ ft/s}.$$\n\n<strong>Interpret the sign.</strong> The negative value means $y$ is decreasing: the top slides *down* the wall, which matches the physical picture.\n\n$$\\boxed{\\dfrac{dy}{dt} = -1.5 \\text{ ft/s} \\;\\;(\\text{the top descends at } 1.5 \\text{ ft/s}).}$$"
            },
            {
              "title": "Related rates: the expanding balloon",
              "body": "A spherical balloon is inflated at $\\frac{dV}{dt} = 100$ cm³/s. How fast is its radius growing when $r = 5$ cm?",
              "solution": "<strong>Relate the quantities.</strong> Volume and radius are linked by $V = \\frac{4}{3}\\pi r^3$. Both change with time, so differentiate <em>implicitly</em> with respect to $t$ (chain rule on $r^3$):\n$$\\frac{dV}{dt} = 4\\pi r^2 \\, \\frac{dr}{dt}.$$\n<strong>Solve for the unknown rate.</strong> We want $\\frac{dr}{dt}$:\n$$\\frac{dr}{dt} = \\frac{1}{4\\pi r^2}\\,\\frac{dV}{dt} = \\frac{100}{4\\pi (5)^2} = \\frac{100}{100\\pi} = \\frac{1}{\\pi} \\approx 0.318 \\text{ cm/s}.$$\n<strong>Read it.</strong> Even though air pours in at a constant $100$ cm³/s, the radius grows <em>slower</em> as the balloon enlarges — since $\\frac{dr}{dt} \\propto 1/r^2$, the same volume spreads over an ever-larger surface.\n<strong>The recipe.</strong> Related rates is always: write the equation linking the quantities, differentiate both sides with respect to time, then plug in the known rate and value to solve for the unknown. The chain rule does all the work."
            }
          ]
        },
        {
          "id": "c-extrema-curve-sketching",
          "title": "Extrema, Monotonicity & Curve Sketching",
          "minutes": 18,
          "content": "<h3>Why the derivative tells you the shape of a function</h3>\n<p>The derivative $f'(x)$ measures instantaneous rate of change. But its real power as a tool is geometric: the <em>sign</em> of $f'$ tells you where $f$ rises and falls, and the sign of $f''$ tells you how $f$ bends. Master these two signs and you can reconstruct the qualitative shape of almost any function — and, crucially, locate its maxima and minima. That last skill is the entire game in optimization, which is the engine underneath nearly every machine learning model.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Training a neural network is just <em>finding a minimum of a loss function</em>. Gradient descent walks downhill using $f'$ (the gradient). Second-order methods (Newton, L-BFGS) use $f''$ (the Hessian) to decide step size and to distinguish minima from saddle points. Everything in this lesson is the one-dimensional skeleton of that machinery.</p></div>\n\n<h3>Critical points: the only places extrema can hide</h3>\n<p>A <strong>local maximum</strong> of $f$ at $c$ means $f(c) \\ge f(x)$ for all $x$ near $c$; a <strong>local minimum</strong> flips the inequality. The foundational result that narrows the search:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Fermat's Theorem</div><p>If $f$ has a local extremum at an interior point $c$ <em>and</em> $f'(c)$ exists, then $f'(c) = 0$.</p></div>\n\n<p>The intuition: at the top of a smooth hill the tangent line is horizontal — if it had any slope you could move slightly along it to go higher, contradicting \"maximum.\" This gives the definition that organizes the whole search:</p>\n\n<p>A <strong>critical point</strong> of $f$ is a point $c$ in the domain where either $f'(c) = 0$ or $f'(c)$ does not exist.</p>\n\n<p>Fermat's theorem says <em>every interior extremum is a critical point</em>. The converse is false — a critical point need not be an extremum. The classic counterexample is $f(x) = x^3$ at $x = 0$: here $f'(0) = 0$, yet $f$ is strictly increasing through the origin, so it is neither a max nor a min. This is the 1-D shadow of a <strong>saddle point</strong>, the bane of high-dimensional optimization.</p>\n\n<h3>Monotonicity: reading where f goes up and down</h3>\n<p>The increasing/decreasing behavior of $f$ is governed entirely by the sign of $f'$. This follows from the Mean Value Theorem (stated below), but the statement is clean:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Increasing/Decreasing Test</div><p>On an interval $I$: if $f'(x) > 0$ for all $x \\in I$, then $f$ is increasing on $I$; if $f'(x) < 0$ for all $x \\in I$, then $f$ is decreasing on $I$.</p></div>\n\n<p>Practical procedure to find monotonic intervals:</p>\n<ol>\n<li>Compute $f'$ and find all critical points (where $f' = 0$ or is undefined).</li>\n<li>These critical points partition the domain into open intervals. On each interval $f'$ has constant sign (assuming $f'$ is continuous there).</li>\n<li>Test one convenient point per interval to read off the sign.</li>\n</ol>\n\n<h4>The First Derivative Test</h4>\n<p>Once you know how $f'$ behaves around a critical point $c$, you classify it by the <em>change of sign</em> of $f'$ as $x$ passes through $c$:</p>\n<ul>\n<li>$f'$ changes <strong>$+$ to $-$</strong> at $c$ $\\Rightarrow$ local <strong>maximum</strong> (function rises then falls).</li>\n<li>$f'$ changes <strong>$-$ to $+$</strong> at $c$ $\\Rightarrow$ local <strong>minimum</strong> (falls then rises).</li>\n<li>$f'$ does <strong>not</strong> change sign $\\Rightarrow$ neither (e.g. $x^3$ at $0$).</li>\n</ul>\n\n<h3>Concavity and the Second Derivative Test</h3>\n<p>Where monotonicity is about the first derivative, <strong>concavity</strong> is about the second. A function is <strong>concave up</strong> on $I$ if its graph lies above its tangent lines (it \"holds water,\" shaped like $\\cup$); <strong>concave down</strong> if it lies below them (shaped like $\\cap$). The test:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Concavity Test</div><p>If $f''(x) > 0$ on $I$, then $f$ is concave up on $I$. If $f''(x) < 0$ on $I$, then $f$ is concave down on $I$.</p></div>\n\n<p>Intuition: $f'' > 0$ means $f'$ is increasing — the slope is getting steeper as you move right, which is exactly the $\\cup$ shape. An <strong>inflection point</strong> is a point where $f$ is continuous and concavity <em>changes</em> (from up to down or vice versa). A necessary condition is $f''=0$ or $f''$ undefined there, but — exactly as with critical points — that condition alone is not sufficient. For $f(x)=x^4$ we have $f''(0)=0$, yet $f''>0$ on both sides, so concavity never changes and $0$ is <em>not</em> an inflection point.</p>\n\n<p>Concavity gives a second, often faster, way to classify a critical point where the second derivative is easy to evaluate:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Second Derivative Test</div><p>Suppose $f'(c) = 0$ and $f''$ is continuous near $c$.</p>\n<ul>\n<li>$f''(c) > 0 \\Rightarrow$ local <strong>minimum</strong> at $c$ (a $\\cup$ with a flat bottom).</li>\n<li>$f''(c) < 0 \\Rightarrow$ local <strong>maximum</strong> at $c$ (a $\\cap$ with a flat top).</li>\n<li>$f''(c) = 0 \\Rightarrow$ <strong>inconclusive</strong> — fall back to the First Derivative Test.</li>\n</ul></div>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>In several variables the analogue is the <strong>Hessian</strong> $H = \\nabla^2 f$. A critical point ($\\nabla f = 0$) is a minimum if $H$ is positive definite (all eigenvalues $> 0$), a maximum if negative definite, and a <strong>saddle point</strong> if eigenvalues have mixed signs. The 1-D \"$f''(c)=0$ is inconclusive\" case corresponds to a singular Hessian — degenerate directions where curvature vanishes, which is why flat regions of loss landscapes are so hard to optimize.</p></div>\n\n<h3>Local vs. global extrema</h3>\n<p>A local extremum is best only in a neighborhood; a <strong>global</strong> (absolute) extremum is best over the entire domain. The <strong>Extreme Value Theorem</strong> guarantees their existence under the right conditions:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Extreme Value Theorem</div><p>If $f$ is continuous on a <em>closed, bounded</em> interval $[a,b]$, then $f$ attains both a global maximum and a global minimum on $[a,b]$.</p></div>\n\n<p>This yields the <strong>Closed Interval Method</strong> for global extrema on $[a,b]$: (1) find all critical points in $(a,b)$; (2) evaluate $f$ at those points and at the endpoints $a, b$; (3) the largest value is the global max, the smallest the global min. Endpoints matter — global extrema can occur there even when no derivative condition flags them, because Fermat's theorem only applies to interior points.</p>\n\n<h3>The Mean Value Theorem</h3>\n<p>The MVT is the theoretical backbone that makes \"sign of $f'$ controls monotonicity\" rigorous. Start with its special case:</p>\n\n<p><strong>Rolle's Theorem.</strong> If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then there exists $c \\in (a,b)$ with $f'(c) = 0$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Mean Value Theorem</div><p>If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists at least one $c \\in (a,b)$ such that\n$$f'(c) = \\frac{f(b) - f(a)}{b - a}.$$</p></div>\n\n<p>In words: somewhere inside the interval, the <em>instantaneous</em> rate of change equals the <em>average</em> rate of change over $[a,b]$. Geometrically, there is a point where the tangent line is parallel to the secant line joining the endpoints. (Driving 120 miles in 2 hours, you must have been going exactly 60 mph at some instant.)</p>\n\n<p>The MVT is not just decorative — it proves the increasing/decreasing test. If $f' > 0$ on an interval and $x_1 < x_2$, then by the MVT $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) > 0$, so $f(x_2) > f(x_1)$: $f$ is increasing. The same one-line argument proves the famous corollary that <em>if $f' \\equiv 0$ on an interval then $f$ is constant</em>, which underwrites the \"$+C$\" in every antiderivative.</p>\n\n<h3>Worked example: a full curve sketch</h3>\n<p>Let $f(x) = x^3 - 3x^2 + 2$ on all of $\\mathbb{R}$, and also find its global extrema on $[-1, 4]$.</p>\n\n<p><strong>Step 1 — Critical points.</strong> $f'(x) = 3x^2 - 6x = 3x(x - 2)$. Setting $f'=0$ gives $x = 0$ and $x = 2$. (The derivative exists everywhere, so these are the only critical points.)</p>\n\n<p><strong>Step 2 — Monotonicity via sign of $f'$.</strong> The points $0$ and $2$ split the line into three intervals. Testing one point in each:</p>\n<pre><code>Interval     test pt   f'(test)        behavior\n(-inf, 0)    x = -1    3(-1)(-3)=+9    increasing\n(0, 2)       x =  1    3(1)(-1)=-3     decreasing\n(2, +inf)    x =  3    3(3)(1)=+9      increasing</code></pre>\n<p>By the First Derivative Test: $f'$ goes $+\\to-$ at $x=0$, so $x=0$ is a <strong>local max</strong> with $f(0)=2$. It goes $-\\to+$ at $x=2$, so $x=2$ is a <strong>local min</strong> with $f(2)= 8-12+2 = -2$.</p>\n\n<p><strong>Step 3 — Concavity via sign of $f''$.</strong> $f''(x) = 6x - 6 = 6(x-1)$. So $f''<0$ for $x<1$ (concave down) and $f''>0$ for $x>1$ (concave up). Concavity changes at $x=1$, and $f$ is continuous there, so $x=1$ is an <strong>inflection point</strong>, with $f(1) = 1 - 3 + 2 = 0$.</p>\n\n<p><strong>Step 4 — Cross-check with the Second Derivative Test.</strong> $f''(0) = -6 < 0 \\Rightarrow$ local max at $0$. $f''(2) = 6 > 0 \\Rightarrow$ local min at $2$. Consistent with Step 2 — good.</p>\n\n<p><strong>Step 5 — Assemble the sketch.</strong> Reading left to right: $f$ rises, peaks at $(0,2)$, falls through the inflection point $(1,0)$ where it switches from $\\cap$ to $\\cup$, bottoms out at $(2,-2)$, then rises forever. The end behavior of a cubic with positive leading coefficient is $f\\to -\\infty$ as $x\\to-\\infty$ and $f\\to+\\infty$ as $x\\to+\\infty$. That single mental picture is the curve sketch.</p>\n\n<p><strong>Step 6 — Global extrema on $[-1, 4]$ (Closed Interval Method).</strong> Evaluate $f$ at the interior critical points and the endpoints:</p>\n<pre><code>x = -1:  -1 - 3 + 2  = -2\nx =  0:   2                 (local max)\nx =  2:  -2                 (local min)\nx =  4:  64 - 48 + 2 = 18</code></pre>\n<p>The largest value is $18$ at $x=4$ (an endpoint!), so the <strong>global maximum on $[-1,4]$ is $18$</strong>. The smallest is $-2$, attained at <em>both</em> $x=-1$ and $x=2$, so the <strong>global minimum is $-2$</strong>. Note the global max occurs at an endpoint, not at any critical point — a vivid reminder of why endpoints must always be checked.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The whole curve-sketching workflow is a hierarchy of questions: <em>Where can extrema be?</em> (critical points, $f'=0$). <em>Which are they?</em> (sign change of $f'$, or sign of $f''$). <em>How does it bend between them?</em> (sign of $f''$, inflection points). <em>What about the boundary and infinity?</em> (endpoints / end behavior). Answer those four in order and the graph draws itself.</p></div>\n\n<h3>Summary checklist for sketching f</h3>\n<ul>\n<li><strong>Domain &amp; symmetry:</strong> note any gaps, even/odd structure.</li>\n<li><strong>$f' = 0$ or undefined:</strong> critical points → candidate extrema.</li>\n<li><strong>Sign chart of $f'$:</strong> increasing/decreasing intervals; classify extrema.</li>\n<li><strong>Sign chart of $f''$:</strong> concavity intervals; locate inflection points.</li>\n<li><strong>Endpoints / limits at $\\pm\\infty$ / asymptotes:</strong> end behavior and global extrema.</li>\n<li><strong>Plot key points</strong> $(x, f(x))$ and connect respecting slope and concavity.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the first and second derivatives draw the whole shape</summary>\n<p>You can sketch a function's graph from two pieces of derivative information, no plotting needed. The <b>first derivative</b> $f'$ gives <em>direction</em>: where $f' \\gt 0$ the curve rises, where $f' \\lt 0$ it falls, and where $f' = 0$ (or is undefined) sit the <b>critical points</b> — candidate peaks and valleys.</p>\n<p>The <b>second derivative</b> $f''$ gives <em>curvature</em>: where $f'' \\gt 0$ the curve is concave up (cupping upward, holding water), where $f'' \\lt 0$ concave down, and where $f''$ changes sign sit the <b>inflection points</b>. The second-derivative test then classifies a critical point: $f' = 0$ with $f'' \\gt 0$ is a local minimum (a valley), with $f'' \\lt 0$ a local maximum (a peak).</p>\n<p>The \"aha\": $f'$ is the slope and $f''$ is how the slope is changing. Reading their signs across the domain reconstructs the entire qualitative shape — rises, falls, peaks, valleys, and the bends between — turning calculus into a recipe for drawing curves you have never plotted.</p>\n</details>\n<h4>Try it in code</h4>\n<p>Critical points are where the slope is zero, <code>f'(x)=0</code>. For <code>f(x)=x³−3x</code>, solve <code>f'(x)=3x²−3=0</code>:</p>\n<div data-code=\"javascript\" data-expected=\"-1 1\">// Critical points: where f'(x) = 0. For f(x)=x^3-3x, f'(x)=3x^2-3.\n// Solve 3x^2 - 3 = 0  -&gt;  x^2 = 3/3  -&gt;  x = +- sqrt(3/3).\nfunction criticalPoints() {\n  var r = Math.sqrt(3 / 3);\n  return [-r, r];\n}\nconsole.log(criticalPoints().join(\" \"));   // -1 1 -- the slope is zero at a max and a min</div>\n<h4>Interactive — first derivative shapes the curve</h4>\n<div data-viz=\"calc-curve-sketch\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Fermat's theorem — why extrema hide at critical points</summary>\n<p>Curve-sketching tells you to \"find the critical points\" — but <em>why</em> are those the only places to look? <b>Fermat's theorem</b> is the guarantee that turns an infinite search into a short checklist.</p>\n<p><b>The theorem.</b> If $f$ has a local maximum or minimum at an <em>interior</em> point $c$ and $f'(c)$ exists, then $f'(c) = 0$. In words: at an interior peak or valley, the tangent line is horizontal.</p>\n<p><b>Why it is true (one line).</b> Suppose $f'(c) \\gt 0$ at an interior point. Then $f$ is increasing through $c$ — you can step slightly <em>right</em> to get a larger value and slightly <em>left</em> to get a smaller one, so $c$ is neither a max nor a min. The same argument rules out $f'(c) \\lt 0$. The only way an interior point can be an extremum is $f'(c) = 0$ — or $f'(c)$ does not exist (a corner, like $|x|$ at 0).</p>\n<p><b>The payoff.</b> Extrema can therefore occur <em>only</em> at <b>critical points</b> ($f'=0$ or undefined) and, on a closed interval, the <b>endpoints</b>. That is a finite candidate list — evaluate $f$ at each and compare. Fermat's theorem is exactly what justifies the whole \"find critical points, then test\" procedure.</p>\n<p>The \"aha\": you never have to check infinitely many points. Fermat's theorem proves an interior extremum forces a horizontal (or nonexistent) tangent, so the maxima and minima of a function are trapped at a handful of critical points and endpoints — that reduction is the engine of optimization, from curve sketching to training neural nets ($\\nabla = 0$).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: convexity — why some functions have no bad local minima</summary>\n<p>The first and second derivatives (the other dives) find and classify critical points — but a deeper property decides whether optimization is <em>easy</em> or <em>hard</em>: <strong>convexity</strong>.</p>\n<p><b>What it means.</b> A function is <em>convex</em> if its graph curves upward everywhere — formally $f''(x)\\ge 0$ for all $x$ (in higher dimensions, the Hessian is positive semidefinite). The straight segment between any two points on the graph lies <em>above</em> the graph. Bowls like $x^2$, exponentials, and norms are convex; wavy functions are not.</p>\n<p><b>Why it is the dividing line.</b> A convex function has <em>exactly one</em> kind of critical point — a global minimum. There are <em>no</em> local minima to get trapped in and no saddle points, so $f'(x)=0$ immediately means you have found <em>the</em> answer. Gradient descent on a convex loss is therefore guaranteed to reach the global optimum. Linear and logistic regression, SVMs, and LASSO all have <em>convex</em> losses — which is why they train reliably.</p>\n<p><b>The contrast.</b> Deep neural networks have <em>non-convex</em> losses — a wild landscape of many local minima and saddles — which is exactly why their training is finicky. Convexity is the property that separates \"optimization just works\" from \"optimization is an art.\"</p>\n<p>The \"aha\": convexity ($f''\\ge 0$, a bowl shape) guarantees a single global minimum and no traps, so $f'=0$ pinpoints the answer. It is the hidden line between models that train effortlessly (convex: regression, SVM) and those that do not (non-convex: deep nets).</p>\n</details>\n",
          "mcq": [
            {
              "q": "For $f(x) = x^3$, the point $x = 0$ satisfies $f'(0) = 0$. What is $x=0$?",
              "choices": [
                "A critical point that is neither a max nor a min",
                "A local maximum",
                "A local minimum",
                "An inflection point that is also a local maximum"
              ],
              "answer": 0,
              "explain": "$f'(x)=3x^2$ does not change sign at $0$ (it stays $\\ge 0$), so the First Derivative Test gives no extremum. It is a critical point and an inflection point, but not an extremum — the 1-D analogue of a saddle."
            },
            {
              "q": "$f'(c)=0$ and $f''(c)=0$. What can you conclude with the Second Derivative Test?",
              "choices": [
                "$c$ is definitely an inflection point",
                "The test is inconclusive; use the First Derivative Test",
                "$c$ is a local minimum",
                "$c$ cannot be an extremum"
              ],
              "answer": 1,
              "explain": "When $f''(c)=0$ the Second Derivative Test gives no information (consider $x^4$ at $0$, a min, vs $x^3$ at $0$, not an extremum). You must examine the sign change of $f'$."
            },
            {
              "q": "On $[a,b]$, where can the global maximum of a continuous $f$ occur?",
              "choices": [
                "Only at interior critical points",
                "Only at the endpoints $a$ and $b$",
                "Only where $f''<0$",
                "At an interior critical point OR at an endpoint"
              ],
              "answer": 3,
              "explain": "The Closed Interval Method requires checking both interior critical points and the endpoints; Fermat's theorem only constrains interior extrema, so endpoints must be tested separately."
            },
            {
              "q": "The Mean Value Theorem guarantees a point $c\\in(a,b)$ where $f'(c)$ equals which quantity?",
              "choices": [
                "$0$",
                "$f(b)-f(a)$",
                "$\\frac{f(b)-f(a)}{b-a}$, the average rate of change",
                "$\\frac{f'(b)-f'(a)}{b-a}$"
              ],
              "answer": 2,
              "explain": "The MVT states the instantaneous rate $f'(c)$ equals the average rate of change (the secant slope). Setting that secant slope to $0$ (i.e. $f(a)=f(b)$) recovers the special case, Rolle's Theorem."
            },
            {
              "q": "A continuous function has $f'(x) > 0$ on $(-\\infty, 2)$ and $f'(x) < 0$ on $(2, \\infty)$. By the First Derivative Test, what happens at $x = 2$?",
              "choices": [
                "Local maximum",
                "Local minimum",
                "Saddle / inflection point",
                "Cannot be determined"
              ],
              "answer": 0,
              "explain": "Since $f'$ changes from positive (increasing) to negative (decreasing) at $x=2$, the function peaks there, giving a local maximum."
            },
            {
              "q": "Which statement about critical points is correct?",
              "choices": [
                "Every critical point is a local extremum",
                "Every interior local extremum (where $f'$ exists) is a critical point, but not every critical point is an extremum",
                "A critical point only occurs where $f'(c) = 0$, never where $f'$ is undefined",
                "Fermat's Theorem proves the converse: $f'(c)=0$ implies an extremum"
              ],
              "answer": 1,
              "explain": "Fermat's Theorem makes critical points necessary for interior extrema, but the converse fails — e.g. $f(x)=x^3$ has $f'(0)=0$ yet no extremum."
            },
            {
              "q": "In the optimization analogy from the lesson, what role does the second derivative $f''$ (the Hessian in higher dimensions) play?",
              "choices": [
                "It computes the gradient that gradient descent follows downhill",
                "It guarantees a function is continuous on a closed interval",
                "Second-order methods use it to set step size and distinguish minima from saddle points",
                "It locates where $f'$ is undefined"
              ],
              "answer": 2,
              "explain": "The lesson states second-order methods like Newton and L-BFGS use $f''$ (the Hessian) to decide step size and tell minima apart from saddle points."
            },
            {
              "q": "A function $f$ is defined only on the closed interval $[0, 5]$ and is continuous and differentiable on it, with no interior critical points. Where must its absolute (global) maximum occur?",
              "choices": [
                "At an interior point where $f''=0$",
                "Exactly at the midpoint $x=2.5$",
                "Nowhere — without an interior critical point no global max exists",
                "At one of the endpoints, $x=0$ or $x=5$"
              ],
              "answer": 3,
              "explain": "By the Extreme Value Theorem a max exists; the candidates are interior critical points and endpoints, so with no interior critical points it must occur at an endpoint."
            },
            {
              "q": "Find the absolute minimum value of $f(x) = x^3 - 3x$ on the interval $[0, 2]$.",
              "choices": [
                "$0$",
                "$-2$",
                "$2$",
                "$-1$"
              ],
              "answer": 1,
              "explain": "$f'(x) = 3x^2 - 3 = 0$ gives $x = 1$ (the one critical point in $[0,2]$). Comparing $f(0)=0$, $f(1)=-2$, $f(2)=2$, the smallest is $-2$ at $x=1$."
            },
            {
              "q": "A function has $f''(x) > 0$ for all $x$. Which statement is necessarily true?",
              "choices": [
                "$f$ is concave up everywhere, so any critical point is a local minimum",
                "$f$ is increasing everywhere",
                "$f$ has no critical points",
                "$f$ is concave down everywhere"
              ],
              "answer": 0,
              "explain": "$f'' > 0$ means the graph bends upward (concave up); by the Second Derivative Test any point with $f'(c)=0$ is a local minimum. The sign of $f''$ controls bending, not whether $f$ rises (that is the sign of $f'$), so 'increasing everywhere' is the tempting but wrong choice."
            },
            {
              "q": "If $f'(c) = 0$ and $f''(c) > 0$ at an interior point $c$, the Second Derivative Test concludes that $f$ has at $c$ a:",
              "choices": [
                "local maximum",
                "saddle point (inconclusive)",
                "local minimum",
                "inflection point"
              ],
              "answer": 2,
              "explain": "A horizontal tangent ($f'(c)=0$) combined with concave-up bending ($f''(c)>0$) means the curve sits in a valley, so $c$ is a local minimum. A positive second derivative rules out the local maximum case, which requires $f''(c) < 0$."
            },
            {
              "q": "Consider $f(x) = x^4$. At $x = 0$ we have $f'(0) = 0$ and $f''(0) = 0$, yet $x=0$ is clearly the global minimum. What does this illustrate?",
              "choices": [
                "$x=0$ must be an inflection point because $f''(0)=0$",
                "Fermat's Theorem fails for polynomials",
                "A point with $f''=0$ can never be an extremum",
                "The Second Derivative Test can be inconclusive ($f''=0$) even when an extremum genuinely exists"
              ],
              "answer": 3,
              "explain": "When $f''(c)=0$ the Second Derivative Test gives no information, but $x^4$ still has a true minimum at $0$ (confirmed by the First Derivative Test, since $f'$ goes negative-to-positive). The misconception is that $f''=0$ forces an inflection point or rules out an extremum, which $x^4$ disproves."
            },
            {
              "q": "If $f'$ changes sign from negative to positive at $c$, the First Derivative Test says $c$ is a:",
              "choices": [
                "local maximum",
                "inflection point",
                "local minimum",
                "saddle point"
              ],
              "answer": 2,
              "explain": "$f$ decreasing then increasing ($f'<0$ then $f'>0$) carves a valley, so $c$ is a *local minimum*. The reverse sign change (positive→negative) gives a local maximum, and no sign change means $c$ is neither."
            },
            {
              "q": "An inflection point of $f$ is a point where:",
              "choices": [
                "$f'(x) = 0$",
                "the concavity changes (typically $f''$ changes sign)",
                "$f''(x) > 0$",
                "$f$ attains a maximum"
              ],
              "answer": 1,
              "explain": "An inflection point is where the graph switches from concave up to concave down or vice versa — i.e. $f''$ changes sign. It need not be a critical point ($f'$ can be nonzero there), and $f''=0$ alone isn't enough (e.g. $f=x^4$ at $0$: $f''=0$ but no concavity change)."
            },
            {
              "q": "If $f'(x) > 0$ on an interval, then on that interval $f$ is:",
              "choices": [
                "increasing",
                "decreasing",
                "constant",
                "concave up"
              ],
              "answer": 0,
              "explain": "A positive derivative means the slope is positive throughout the interval, so $f$ is *increasing* there. (Concavity is governed by $f''$, not $f'$; a function can be increasing while concave either up or down.)"
            },
            {
              "q": "The Extreme Value Theorem guarantees that a function continuous on a *closed* interval $[a,b]$:",
              "choices": [
                "has no extrema",
                "is monotonic",
                "has $f'(c)=0$ somewhere",
                "attains both an absolute maximum and an absolute minimum on $[a,b]$"
              ],
              "answer": 3,
              "explain": "Continuity on a closed, bounded interval guarantees the function achieves a highest and a lowest value somewhere on $[a,b]$ — the Extreme Value Theorem. (Drop 'closed' or 'continuous' and it can fail: $f(x)=1/x$ on $(0,1]$ has no maximum.) Those extrema occur at critical points or endpoints."
            }
          ],
          "flashcards": [
            {
              "front": "State Fermat's Theorem.",
              "back": "If $f$ has a local extremum at an interior point $c$ and $f'(c)$ exists, then $f'(c)=0$. (So interior extrema are critical points — but not every critical point is an extremum.)"
            },
            {
              "front": "First Derivative Test: how do you classify a critical point $c$?",
              "back": "Look at the sign change of $f'$ across $c$: $+\\to-$ is a local max; $-\\to+$ is a local min; no sign change means neither."
            },
            {
              "front": "Second Derivative Test (given $f'(c)=0$).",
              "back": "$f''(c)>0 \\Rightarrow$ local min; $f''(c)<0 \\Rightarrow$ local max; $f''(c)=0 \\Rightarrow$ inconclusive (use the First Derivative Test)."
            },
            {
              "front": "What is an inflection point, and what is the necessary condition?",
              "back": "A point where $f$ is continuous and concavity changes (up↔down). Necessary: $f''=0$ or undefined there — but not sufficient (e.g. $x^4$ at $0$)."
            },
            {
              "front": "State the Mean Value Theorem.",
              "back": "If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, there exists $c\\in(a,b)$ with $f'(c)=\\dfrac{f(b)-f(a)}{b-a}$ (instantaneous rate = average rate)."
            },
            {
              "front": "Closed Interval Method for global extrema on $[a,b]$.",
              "back": "Evaluate $f$ at all interior critical points AND at both endpoints $a,b$; the largest output is the global max, the smallest is the global min."
            }
          ],
          "homework": [
            {
              "prompt": "Let $f(x) = x^4 - 4x^3$. Find all critical points, classify each as local max/min/neither, find intervals of increase/decrease, find concavity intervals, and identify all inflection points.",
              "hint": "Factor $f'$ and $f''$ completely. Remember that a zero of $f''$ is only an inflection point if concavity actually changes sign there.",
              "solution": "$f'(x)=4x^3-12x^2=4x^2(x-3)$, so critical points are $x=0$ and $x=3$. Sign of $f'$: for $x<0$, $4x^2>0$ and $(x-3)<0$ so $f'<0$ (decreasing); for $0<x<3$, still $(x-3)<0$ so $f'<0$ (decreasing); for $x>3$, $f'>0$ (increasing). At $x=0$ no sign change ($-\\to-$) so $x=0$ is neither. At $x=3$, $f'$ goes $-\\to+$ so $x=3$ is a local min, $f(3)=81-108=-27$. Concavity: $f''(x)=12x^2-24x=12x(x-2)$, zero at $x=0,2$. $f''>0$ for $x<0$ (concave up), $f''<0$ for $0<x<2$ (concave down), $f''>0$ for $x>2$ (concave up). Concavity changes at both $x=0$ ($f(0)=0$) and $x=2$ ($f(2)=16-32=-16$), so both are inflection points. Note $x=0$ is a critical point AND an inflection point but NOT an extremum."
            },
            {
              "prompt": "Find the global maximum and global minimum of $g(x)=2\\sin x + \\cos 2x$ on $[0, 2\\pi]$.",
              "hint": "Use the identity $\\cos 2x = 1 - 2\\sin^2 x$ to write $g'$ in terms of $\\cos x$ and $\\sin x$, then apply the Closed Interval Method including the endpoints $0$ and $2\\pi$.",
              "solution": "$g'(x)=2\\cos x - 2\\sin 2x = 2\\cos x - 4\\sin x\\cos x = 2\\cos x(1-2\\sin x)$. Setting $g'=0$: either $\\cos x=0 \\Rightarrow x=\\tfrac{\\pi}{2},\\tfrac{3\\pi}{2}$, or $\\sin x=\\tfrac12 \\Rightarrow x=\\tfrac{\\pi}{6},\\tfrac{5\\pi}{6}$. Evaluate $g$ (using $\\cos 2x=1-2\\sin^2 x$): at $x=\\tfrac{\\pi}{6}$: $2(\\tfrac12)+\\cos\\tfrac{\\pi}{3}=1+\\tfrac12=\\tfrac32$. At $x=\\tfrac{\\pi}{2}$: $2(1)+\\cos\\pi=2-1=1$. At $x=\\tfrac{5\\pi}{6}$: $2(\\tfrac12)+\\cos\\tfrac{5\\pi}{3}=1+\\tfrac12=\\tfrac32$. At $x=\\tfrac{3\\pi}{2}$: $2(-1)+\\cos 3\\pi=-2-1=-3$. Endpoints: $g(0)=0+\\cos 0=1$; $g(2\\pi)=0+\\cos 4\\pi=1$. Comparing all values, the global maximum is $\\tfrac32$ (attained at $x=\\tfrac{\\pi}{6}$ and $x=\\tfrac{5\\pi}{6}$) and the global minimum is $-3$ (at $x=\\tfrac{3\\pi}{2}$)."
            },
            {
              "prompt": "Use the Mean Value Theorem to prove that for all real $a, b$, $|\\sin a - \\sin b| \\le |a - b|$.",
              "hint": "Apply the MVT to $f(x)=\\sin x$ on the interval with endpoints $a$ and $b$, then bound $|f'(c)|=|\\cos c|$.",
              "solution": "If $a=b$ the inequality is trivial ($0\\le 0$). Otherwise let $f(x)=\\sin x$, which is continuous and differentiable everywhere. Apply the MVT on the closed interval between $a$ and $b$: there exists $c$ strictly between them with $f'(c)=\\dfrac{\\sin a - \\sin b}{a-b}$, i.e. $\\sin a - \\sin b = \\cos(c)\\,(a-b)$. Taking absolute values, $|\\sin a - \\sin b| = |\\cos c|\\,|a-b|$. Since $|\\cos c|\\le 1$ for all $c$, we get $|\\sin a - \\sin b| \\le |a-b|$. (This shows $\\sin$ is Lipschitz with constant $1$ — a property that, in higher dimensions, guarantees gradient-descent stability when the gradient is Lipschitz.)"
            }
          ],
          "examples": [
            {
              "title": "Classifying critical points with the first derivative",
              "body": "Find all critical points of $f(x) = x^3 - 6x^2 + 9x + 1$, then determine the intervals where $f$ is increasing and decreasing, and classify each critical point as a local maximum, local minimum, or neither.",
              "solution": "<strong>Step 1 — Differentiate and find critical points.</strong> Since $f$ is a polynomial, $f'$ exists everywhere, so the only critical points come from $f'(x) = 0$.\n$$f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3).$$\nSetting $f'(x) = 0$ gives $x = 1$ and $x = 3$.\n\n<strong>Step 2 — Sign chart for $f'$.</strong> The roots $x=1$ and $x=3$ split the line into three intervals. Test one point in each:\n- $x = 0$: $f'(0) = 3(-1)(-3) = 9 > 0$, so $f$ is <strong>increasing</strong> on $(-\\infty, 1)$.\n- $x = 2$: $f'(2) = 3(1)(-1) = -3 < 0$, so $f$ is <strong>decreasing</strong> on $(1, 3)$.\n- $x = 4$: $f'(4) = 3(3)(1) = 9 > 0$, so $f$ is <strong>increasing</strong> on $(3, \\infty)$.\n\n<strong>Step 3 — Apply the First Derivative Test.</strong> At each critical point, read how the sign of $f'$ changes:\n- At $x = 1$: $f'$ goes $+ \\to -$ (increasing then decreasing), so $f$ has a <strong>local maximum</strong>.\n- At $x = 3$: $f'$ goes $- \\to +$ (decreasing then increasing), so $f$ has a <strong>local minimum</strong>.\n\n<strong>Step 4 — Compute the extreme values.</strong>\n$$f(1) = 1 - 6 + 9 + 1 = 5, \\qquad f(3) = 27 - 54 + 27 + 1 = 1.$$\n\n<strong>Answer.</strong> $f$ increases on $(-\\infty,1)$, decreases on $(1,3)$, increases on $(3,\\infty)$. There is a local maximum of $5$ at $x = 1$ and a local minimum of $1$ at $x = 3$."
            },
            {
              "title": "Second derivative test, concavity, and an inflection point",
              "body": "For $f(x) = x^4 - 4x^3$, locate the critical points and use the Second Derivative Test to classify them. Then find all inflection points and the intervals of concavity, noting any place where the test is inconclusive.",
              "solution": "<strong>Step 1 — First derivative and critical points.</strong>\n$$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3).$$\nSetting $f'(x) = 0$ gives $x = 0$ (a double root) and $x = 3$.\n\n<strong>Step 2 — Second derivative.</strong>\n$$f''(x) = 12x^2 - 24x = 12x(x - 2).$$\n\n<strong>Step 3 — Second Derivative Test at each critical point.</strong>\n- At $x = 3$: $f''(3) = 12(3)(1) = 36 > 0$. The curve is concave up, so $f$ has a <strong>local minimum</strong> at $x = 3$, with $f(3) = 81 - 108 = -27$.\n- At $x = 0$: $f''(0) = 12(0)(-2) = 0$. The test is <strong>inconclusive</strong> — we must fall back on the First Derivative Test. Near $x = 0$, $f'(x) = 4x^2(x-3)$. The factor $4x^2 \\ge 0$ always, and for $x$ near $0$ the factor $(x-3) < 0$, so $f'(x) \\le 0$ on both sides of $0$. Since $f'$ does <strong>not</strong> change sign at $x=0$, this critical point is <strong>neither a max nor a min</strong> (the curve flattens but keeps decreasing).\n\n<strong>Step 4 — Concavity and inflection points.</strong> Set $f''(x) = 12x(x-2) = 0$, giving candidate inflection points at $x = 0$ and $x = 2$. Build a sign chart for $f''$:\n- $x = -1$: $f''(-1) = 12(-1)(-3) = 36 > 0 \\Rightarrow$ concave <strong>up</strong> on $(-\\infty, 0)$.\n- $x = 1$: $f''(1) = 12(1)(-1) = -12 < 0 \\Rightarrow$ concave <strong>down</strong> on $(0, 2)$.\n- $x = 3$: $f''(3) = 12(3)(1) = 36 > 0 \\Rightarrow$ concave <strong>up</strong> on $(2, \\infty)$.\n\nConcavity changes at both $x = 0$ and $x = 2$, so both are genuine inflection points:\n$$f(0) = 0, \\qquad f(2) = 16 - 32 = -16.$$\n\n<strong>Answer.</strong> Local minimum $-27$ at $x = 3$; the critical point at $x = 0$ is neither a max nor a min (here the Second Derivative Test fails and the First Derivative Test settles it). $f$ is concave up on $(-\\infty,0)$ and $(2,\\infty)$, concave down on $(0,2)$, with inflection points at $(0, 0)$ and $(2, -16)$."
            },
            {
              "title": "Extreme values on a closed interval: don't forget the endpoints",
              "body": "Find the maximum and minimum of $f(x) = x^3 - 3x$ on the closed interval $[0, 2]$.",
              "solution": "<strong>The Extreme Value Theorem</strong> guarantees a continuous function on a closed interval attains a max and a min — and they occur only at <em>critical points</em> or <em>endpoints</em>, so you check both.\n<strong>Critical points.</strong> $f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$; only $x = 1$ lies in $[0, 2]$.\n<strong>Evaluate the candidates</strong> — the critical point and both endpoints:\n$$f(0) = 0, \\qquad f(1) = 1 - 3 = -2, \\qquad f(2) = 8 - 6 = 2.$$\n<strong>Compare.</strong> The maximum is $\\mathbf{2}$ at $x = 2$ — an <em>endpoint</em> — and the minimum is $\\mathbf{-2}$ at the critical point $x = 1$.\n<strong>The lesson.</strong> The biggest value sits at an endpoint, which the derivative test alone would never flag (it isn't where $f' = 0$). On a closed interval the global extremes live among critical points <em>and</em> endpoints — skip the endpoints and you can miss the answer."
            }
          ]
        },
        {
          "id": "c-optimization",
          "title": "Optimization & Gradient Descent Intuition",
          "minutes": 18,
          "content": "<h3>Why Optimization Is the Whole Game</h3>\n<p>Once you can take a derivative, the single most valuable thing you can do with it is <strong>optimize</strong>: find the input that makes some quantity as large or as small as possible. Engineers minimize cost and weight; economists maximize profit; physicists find equilibria where energy is least; and machine-learning systems do exactly one thing during training — they <strong>minimize a loss function</strong>. The derivative is the universal compass for all of it, because at a smooth peak or valley the function momentarily stops changing, and \"stops changing\" means the derivative is zero.</p>\n<p>This lesson builds the full workflow: name the objective, identify the domain, find the candidate points, and prove which one wins. Then we connect that classical machinery to <strong>gradient descent</strong>, the algorithm that trains essentially every modern neural network. The punchline you should hold in your head from the start: <em>\"set the derivative to zero\" and \"follow the gradient downhill\" are two faces of the same idea.</em></p>\n\n<h3>The Vocabulary of Extrema</h3>\n<h4>Local vs. global</h4>\n<p>Let $f$ be defined on a domain $D$. We say $f$ has a <strong>global (absolute) maximum</strong> at $c$ if $f(c) \\ge f(x)$ for all $x \\in D$. It has a <strong>local (relative) maximum</strong> at $c$ if $f(c) \\ge f(x)$ for all $x$ in some open interval around $c$. Minima are defined with the inequalities reversed. A local extremum is a \"best in its neighborhood\"; a global extremum is \"best on the entire domain.\" Every global extremum (in the interior) is also local, but the reverse is emphatically false — this gap is exactly what makes ML optimization hard.</p>\n\n<h4>Critical points</h4>\n<p>A <strong>critical point</strong> of $f$ is a point $c$ in the domain where either $f'(c) = 0$ or $f'(c)$ does not exist. The foundational result is <strong>Fermat's Theorem</strong>: if $f$ has a local extremum at an interior point $c$ and $f'(c)$ exists, then $f'(c) = 0$.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>At an interior peak, the curve must be rising just before and falling just after. The instantaneous slope can't be positive (that would mean still climbing) nor negative (already past the top), so by elimination it is exactly $0$. The tangent line is horizontal.</p>\n</div>\n<p>Two warnings that catch everyone:</p>\n<ul>\n<li><strong>Critical does not imply extremum.</strong> For $f(x) = x^3$, $f'(0) = 0$, yet $x = 0$ is neither a max nor a min — it's an inflection with a horizontal tangent. Fermat's theorem is a <em>one-way</em> implication.</li>\n<li><strong>Extrema can hide where the derivative doesn't exist.</strong> $f(x) = |x|$ has a minimum at $0$, but $f'(0)$ is undefined. That's why the definition of \"critical point\" includes non-differentiable points — and it's why ML loss functions with kinks (like the L1 / absolute-value penalty or the ReLU activation) still have meaningful minima.</li>\n</ul>\n\n<h3>Two Derivative Tests for Classifying Critical Points</h3>\n<h4>First-derivative test</h4>\n<p>Examine the <em>sign</em> of $f'$ on either side of a critical point $c$:</p>\n<ul>\n<li>$f'$ goes $+ \\to -$ across $c$: local <strong>maximum</strong> (rising then falling).</li>\n<li>$f'$ goes $- \\to +$ across $c$: local <strong>minimum</strong> (falling then rising).</li>\n<li>$f'$ keeps the same sign: <strong>neither</strong> (e.g., $x^3$ at $0$).</li>\n</ul>\n<p>This test always applies, even at non-differentiable critical points, because it only needs the sign of the slope nearby.</p>\n\n<h4>Second-derivative test</h4>\n<p>If $f'(c) = 0$ and $f''(c)$ exists, then concavity decides:</p>\n<ul>\n<li>$f''(c) > 0 \\Rightarrow$ concave up, a \"bowl\" $\\Rightarrow$ local <strong>minimum</strong>.</li>\n<li>$f''(c) < 0 \\Rightarrow$ concave down, a \"dome\" $\\Rightarrow$ local <strong>maximum</strong>.</li>\n<li>$f''(c) = 0 \\Rightarrow$ <strong>inconclusive</strong>; fall back to the first-derivative test.</li>\n</ul>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why ML cares</div>\n<p>The multivariable analog of the second-derivative test is the <strong>Hessian</strong> matrix $H$ of second partials. A critical point is a local min when $H$ is positive-definite (all eigenvalues $> 0$), a max when negative-definite, and a <strong>saddle point</strong> when eigenvalues have mixed signs. In high-dimensional loss landscapes saddles vastly outnumber true minima, and a big part of why optimizers like momentum and Adam exist is to escape these saddles efficiently.</p>\n</div>\n\n<h3>Global Extrema: Two Domains, Two Procedures</h3>\n<h4>Closed, bounded interval — the Extreme Value Theorem</h4>\n<p>If $f$ is continuous on a closed interval $[a,b]$, the <strong>Extreme Value Theorem (EVT)</strong> guarantees $f$ attains both a global max and a global min on $[a,b]$. The procedure — the <strong>Closed Interval Method</strong> — is mechanical and complete:</p>\n<ol>\n<li>Find all critical points in $(a,b)$.</li>\n<li>Evaluate $f$ at those critical points <em>and</em> at the two endpoints $a$ and $b$.</li>\n<li>The largest value is the global max; the smallest is the global min.</li>\n</ol>\n<p>Because the candidate set is finite, no derivative test is even needed for the global question — you just compare numbers. Endpoints matter: the extreme value often sits at a boundary, not at an interior critical point.</p>\n\n<h4>Unbounded domains and open intervals</h4>\n<p>Drop continuity or boundedness and the guarantee evaporates. On $(0, \\infty)$, $f(x) = 1/x$ has no minimum (it approaches but never reaches $0$) and no maximum (it blows up near $0$). So on open or infinite domains you must reason about <strong>end behavior</strong> with limits:</p>\n<ul>\n<li>Compute $\\lim_{x \\to \\pm\\infty} f(x)$ (or limits toward open endpoints).</li>\n<li>A single interior critical point on a domain where $f \\to +\\infty$ at both ends must be the <strong>global minimum</strong> (and symmetrically for a max). This \"one valley, walls going up on both sides\" argument is rigorous and is exactly the structure that makes <strong>convex</strong> problems so well-behaved.</li>\n</ul>\n\n<h3>Worked Example: The Optimization Workflow End-to-End</h3>\n<p><strong>Problem.</strong> You're fabricating an open-top rectangular box with a square base from a sheet of material. The box must hold a fixed volume of $V = 32{,}000\\,\\text{cm}^3$. Minimize the material used (the surface area). Find the dimensions.</p>\n\n<p><strong>Step 1 — Objective and variables.</strong> Let the base be $x \\times x$ and the height be $h$. Surface area of an open-top box (one base + four sides):</p>\n$$A = x^2 + 4xh.$$\n\n<p><strong>Step 2 — Constraint, to reduce variables.</strong> Volume fixes a relationship: $x^2 h = 32000$, so $h = \\dfrac{32000}{x^2}$. Substitute to get $A$ as a function of one variable:</p>\n$$A(x) = x^2 + 4x \\cdot \\frac{32000}{x^2} = x^2 + \\frac{128000}{x}, \\qquad x > 0.$$\n\n<p><strong>Step 3 — Domain.</strong> Physically $x > 0$, an <em>open, unbounded</em> domain. There's no closed interval, so we'll need end behavior, not the closed-interval method.</p>\n\n<p><strong>Step 4 — Critical points.</strong> Differentiate and set to zero:</p>\n$$A'(x) = 2x - \\frac{128000}{x^2} = 0 \\;\\Longrightarrow\\; 2x = \\frac{128000}{x^2} \\;\\Longrightarrow\\; x^3 = 64000 \\;\\Longrightarrow\\; x = 40.$$\n\n<p><strong>Step 5 — Verify it's a minimum.</strong> Use the second-derivative test:</p>\n$$A''(x) = 2 + \\frac{256000}{x^3}, \\qquad A''(40) = 2 + \\frac{256000}{64000} = 2 + 4 = 6 > 0,$$\n<p>so $A$ is concave up at $x = 40$: a local minimum. Is it global? On $(0,\\infty)$ we have $A(x) \\to +\\infty$ as $x \\to 0^+$ (the $128000/x$ term explodes) and $A(x) \\to +\\infty$ as $x \\to \\infty$ (the $x^2$ term explodes). A single interior critical point with both walls rising is the <strong>global minimum</strong>. Done — rigorously.</p>\n\n<p><strong>Step 6 — Report real-world quantities.</strong> $h = \\dfrac{32000}{40^2} = \\dfrac{32000}{1600} = 20$ cm. Minimum surface area $A(40) = 1600 + 3200 = 4800\\,\\text{cm}^2$. The optimal box is $40 \\times 40 \\times 20$ cm.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Pattern to remember</div>\n<p>Every applied optimization problem follows the same six beats: (1) write the objective, (2) use constraints to cut down to one variable, (3) pin the domain, (4) set the derivative to zero, (5) verify with a derivative test or end-behavior, (6) translate back to the question asked. Step 5 is the one beginners skip — and it's the difference between a guess and a proof.</p>\n</div>\n\n<h3>From \"Set the Derivative to Zero\" to Gradient Descent</h3>\n<p>In the box problem we solved $A'(x) = 0$ <em>algebraically</em>. That worked because the equation was a clean cubic. But the loss function of a neural network with millions of parameters has no closed-form solution to $\\nabla L = 0$ — you cannot isolate the weights. So instead of <em>solving</em> for where the slope is zero, we <strong>search</strong> for it iteratively, letting the derivative tell us which way is downhill.</p>\n\n<h4>The multivariable jump: the gradient</h4>\n<p>When $f$ depends on many variables $\\mathbf{w} = (w_1, \\dots, w_n)$, the role of the single derivative is played by the <strong>gradient</strong>, the vector of all partial derivatives:</p>\n$$\\nabla f(\\mathbf{w}) = \\left( \\frac{\\partial f}{\\partial w_1}, \\frac{\\partial f}{\\partial w_2}, \\dots, \\frac{\\partial f}{\\partial w_n} \\right).$$\n<p>Two facts make the gradient the engine of ML:</p>\n<ul>\n<li>$\\nabla f$ points in the direction of <strong>steepest ascent</strong> — the fastest way to increase $f$. So $-\\nabla f$ points in the direction of <strong>steepest descent</strong>.</li>\n<li>At any extremum (or saddle) the gradient is the <strong>zero vector</strong>: $\\nabla f = \\mathbf{0}$. This is the exact generalization of $f'(c) = 0$ — every partial slope must vanish simultaneously.</li>\n</ul>\n\n<h4>The algorithm</h4>\n<p>Gradient descent starts at a guess $\\mathbf{w}_0$ and repeatedly steps a small amount in the downhill direction:</p>\n$$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta\\, \\nabla L(\\mathbf{w}_t).$$\n<p>Here $L$ is the <strong>loss</strong> (the objective we minimize), and $\\eta > 0$ is the <strong>learning rate</strong> — the step size. Read the update literally: at each step, measure the slope of the loss with respect to every weight, then nudge every weight in the direction that <em>decreases</em> the loss. When the gradient shrinks toward zero, the steps shrink too and the process settles at a critical point — exactly the $\\nabla L = \\mathbf{0}$ condition that classical calculus told us to look for.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">The big-picture connection</div>\n<p>Classical optimization and gradient descent answer the same question — \"where is $f' = 0$?\" — but with opposite strategies. Calculus class solves the equation <em>exactly</em> when it can. ML <em>approximates</em> the solution by walking downhill, because the equation is unsolvable in closed form at scale. The derivative test you learned to <em>verify</em> a minimum becomes, in ML, the very <em>mechanism</em> that <em>finds</em> it: training is just rolling a ball into the nearest valley of a billion-dimensional surface.</p>\n</div>\n\n<h4>Why the learning rate is a derivative-test story</h4>\n<p>The step size $\\eta$ controls everything. Too small, and convergence is glacial — you crawl down the valley. Too large, and you overshoot the minimum and bounce up the far wall, possibly <strong>diverging</strong> to ever-higher loss. The well-behaved regime is governed by the <em>curvature</em> — the second derivative. For a quadratic bowl $L(w) = \\tfrac{1}{2}k w^2$, gradient descent converges iff $\\eta < 2/k$, where $k = L''$ is the curvature. So the same $f''$ from the second-derivative test reappears as the quantity that sets the safe learning rate. Curvature isn't just for classifying extrema; it dictates how fast you're allowed to descend.</p>\n\n<h4>Convex vs. non-convex: why ML is subtle</h4>\n<p>If a loss is <strong>convex</strong> (think a single bowl, $f'' \\ge 0$ everywhere), every local minimum is the global minimum, and gradient descent provably finds it. Linear and logistic regression have convex losses — clean and reliable. But deep networks are <strong>non-convex</strong>: their loss landscapes are riddled with many local minima, plateaus, and saddle points. Gradient descent only guarantees you reach <em>a</em> critical point near where you started, not the best one. This is precisely the local-vs-global gap from the start of the lesson, scaled to millions of dimensions — and it's why initialization, momentum, and adaptive optimizers matter so much in practice.</p>\n\n<h3>Putting It Together</h3>\n<p>Optimization is the discipline of finding best inputs, and the derivative is its core instrument. On a closed interval, the Extreme Value Theorem plus the Closed Interval Method give a complete, finite recipe. On open or unbounded domains, you replace \"check the endpoints\" with \"analyze the limits.\" The first- and second-derivative tests certify <em>which kind</em> of critical point you found. And when you step from one variable to millions and from solvable to unsolvable, the gradient generalizes the derivative, $\\nabla L = \\mathbf{0}$ generalizes $f'(c) = 0$, and gradient descent turns the abstract condition into a concrete, iterative search. Master the one-variable workflow and you've already understood, in miniature, how every modern model learns.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-gradient-descent\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ∇f = 0 is necessary, not sufficient</summary>\n<p>To optimize a function you hunt for <b>critical points</b> where the derivative (or gradient) is zero. But $\\nabla f = 0$ is a <em>necessary</em> condition for an interior extremum, not a <em>sufficient</em> one — it is satisfied by minima, maxima, <em>and</em> saddle points alike.</p>\n<p>Two more checks pin down the answer. The <b>second-order condition</b> classifies a critical point (in 1-D, $f'' \\gt 0$ is a min, $f'' \\lt 0$ a max; in higher dimensions, the signs of the Hessian's eigenvalues). And on a <em>bounded</em> domain you must also check the <b>boundary and endpoints</b>, since a constrained optimum can sit where the gradient is nonzero (pushing against the constraint). Gradient descent only ever reaches points where $\\nabla f \\approx 0$, so on a non-convex landscape it can land in a saddle or a poor local minimum.</p>\n<p>The \"aha\": setting the gradient to zero <em>narrows</em> the search to candidates; it does not hand you the optimum. Classification (second derivative / Hessian) plus boundary checks — or convexity, which guarantees the lone critical point is the global minimum — finish the job.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: don't forget the endpoints (the closed-interval method)</summary>\n<p>Setting $f'(x) = 0$ finds the <em>interior</em> critical points — but on a closed interval $[a, b]$ that is not enough. The maximum or minimum can sit at an <b>endpoint</b>, where the derivative need not be zero.</p>\n<p><b>The closed-interval method.</b> To find the absolute max/min of a continuous $f$ on $[a, b]$: (1) find the critical points in $(a, b)$ where $f'=0$ or $f'$ is undefined, (2) evaluate $f$ at those points <em>and</em> at both endpoints $a, b$, (3) the largest value is the max, the smallest the min. The Extreme Value Theorem guarantees both exist on a closed bounded interval.</p>\n<p><b>Why endpoints bite.</b> $f(x) = x$ on $[0, 1]$ has $f' = 1 \\neq 0$ everywhere — no interior critical point at all — yet its max ($1$ at $x=1$) and min ($0$ at $x=0$) are both at endpoints. Optimizing only where $\\nabla f = 0$ would miss them entirely.</p>\n<p>The \"aha\": $\\nabla f = 0$ locates <em>interior</em> candidates; a complete optimization also checks the <em>boundary</em>. On a bounded domain that means the endpoints (in higher dimensions, the edge — exactly what Lagrange multipliers handle for constrained boundaries); on an unbounded domain you also examine the limits at infinity.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: constrained optimization and Lagrange multipliers</summary>\n<p>The other dives handle <em>unconstrained</em> optimization (find where $\\nabla f = 0$, then check endpoints). But most real problems carry <em>constraints</em> — maximize profit <em>subject to</em> a budget, minimize a loss <em>subject to</em> a norm limit. <strong>Lagrange multipliers</strong> solve these.</p>\n<p><b>The geometric idea.</b> To maximize $f(x,y)$ subject to a constraint $g(x,y)=c$, walk along the constraint curve. The optimum sits where that curve is <em>tangent</em> to a level curve of $f$ — because if it crossed, you could slide along the constraint to a higher level. At tangency the gradients are parallel: $$\\nabla f = \\lambda\\,\\nabla g.$$ The scalar $\\lambda$ (the <em>Lagrange multiplier</em>) measures how much the optimum would improve if you relaxed the constraint by one unit — its \"shadow price.\"</p>\n<p><b>Why it matters in ML.</b> Constrained optimization is everywhere: <em>SVMs</em> maximize the margin subject to classifying points correctly (solved via Lagrange duality); <em>ridge / L2</em> regularization is \"minimize the loss subject to a weight-norm budget\"; maximum-entropy models and much of physics are Lagrange problems. The multiplier $\\lambda$ often <em>is</em> the regularization strength.</p>\n<p>The \"aha\": to optimize under a constraint, do not search the whole space — walk the constraint and stop where its tangent matches a level set of the objective, i.e. where $\\nabla f = \\lambda\\,\\nabla g$. Lagrange multipliers turn a constrained problem into solving these gradient equations, and $\\lambda$ itself prices the constraint.</p>\n</details>\n",
          "mcq": [
            {
              "q": "You must minimize $f(x) = x^3 - 3x$ on the closed interval $[0, 2]$. Where does the global minimum occur?",
              "choices": [
                "At the right endpoint $x = 2$",
                "At the left endpoint $x = 0$",
                "At the critical point $x = 1$, where $f' = 0$",
                "At $x = -1$, the other critical point"
              ],
              "answer": 2,
              "explain": "Critical points: $f'(x)=3x^2-3=0 \\Rightarrow x=\\pm1$, but only $x=1$ is in $[0,2]$. Comparing candidates: $f(0)=0$, $f(1)=-2$, $f(2)=2$. The smallest is $f(1)=-2$. ($x=-1$ is outside the domain and is irrelevant.)"
            },
            {
              "q": "A function has $f'(c) = 0$ and $f''(c) = 0$ at an interior point $c$. What can you conclude?",
              "choices": [
                "$c$ is definitely an inflection point, not an extremum",
                "$c$ is a local minimum because the second derivative is non-negative",
                "The second-derivative test is inconclusive; use the first-derivative test",
                "$c$ cannot be a critical point"
              ],
              "answer": 2,
              "explain": "When $f''(c)=0$ the second-derivative test gives no information (consider $x^4$ which has a min, vs. $x^3$ which has neither, both with $f''(0)=0$). You must examine the sign of $f'$ around $c$."
            },
            {
              "q": "In gradient descent $\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta\\,\\nabla L(\\mathbf{w}_t)$, why is the gradient subtracted rather than added?",
              "choices": [
                "Because $\\nabla L$ points toward steepest ascent, so $-\\nabla L$ points downhill toward lower loss",
                "To keep the weights from growing without bound",
                "Because the learning rate $\\eta$ is negative",
                "Because the gradient is always negative near a minimum"
              ],
              "answer": 0,
              "explain": "The gradient points in the direction of fastest increase of $L$; to minimize loss we move opposite to it, i.e., subtract $\\eta \\nabla L$. The learning rate $\\eta$ is positive."
            },
            {
              "q": "Why does training a deep neural network use gradient descent instead of directly solving $\\nabla L = \\mathbf{0}$ the way you'd solve $f'(x)=0$ in a calculus problem?",
              "choices": [
                "Because $\\nabla L = \\mathbf{0}$ is never true for a neural network",
                "Because $\\nabla L = \\mathbf{0}$ has no closed-form algebraic solution for millions of parameters, so the minimum must be searched for iteratively",
                "Because derivatives of neural networks cannot be computed",
                "Because gradient descent always finds the global minimum and direct solving does not"
              ],
              "answer": 1,
              "explain": "With huge non-convex networks you cannot isolate the weights to solve $\\nabla L=\\mathbf{0}$ in closed form, so you iteratively step downhill. Gradient descent does NOT guarantee the global minimum on non-convex losses."
            },
            {
              "q": "Which statement correctly describes the relationship between critical points and local extrema?",
              "choices": [
                "Every interior local extremum (where $f'$ exists) is a critical point, but not every critical point is a local extremum",
                "Every critical point is a local extremum, and every local extremum is a critical point",
                "Every critical point is a local extremum, but some local extrema are not critical points",
                "A point is a local extremum if and only if $f'$ does not exist there"
              ],
              "answer": 0,
              "explain": "Fermat's theorem is one-way: extrema at interior differentiable points force $f'=0$, but $f'=0$ alone (e.g. $f(x)=x^3$ at $0$) need not give an extremum."
            },
            {
              "q": "Why does the definition of a critical point include points where $f'(c)$ does not exist?",
              "choices": [
                "Because such points always have a horizontal tangent line",
                "Because the derivative is always zero at points where it fails to exist",
                "Because non-differentiable points are never extrema and must be excluded by hand",
                "Because extrema can occur at kinks where the derivative is undefined, such as the minimum of $f(x)=|x|$ at $0$"
              ],
              "answer": 3,
              "explain": "Functions like $|x|$ attain a minimum at a kink where $f'$ is undefined, so candidate-point searches must include non-differentiable points to avoid missing extrema."
            },
            {
              "q": "A function $f$ is continuous on the closed interval $[a,b]$. To guarantee you find its global maximum, which set of points must you compare?",
              "choices": [
                "Only the interior points where $f'(x)=0$",
                "Only the two endpoints $a$ and $b$",
                "All interior critical points (where $f'=0$ or $f'$ is undefined) together with the endpoints $a$ and $b$",
                "Only the inflection points where $f''(x)=0$"
              ],
              "answer": 2,
              "explain": "On a closed interval a global extremum can occur at an interior critical point or at a boundary, so you must evaluate $f$ at all critical points and both endpoints and take the largest value."
            },
            {
              "q": "The lesson says \"set the derivative to zero\" and \"follow the gradient downhill\" are two faces of the same idea. What does this mean for where gradient descent tends to stop?",
              "choices": [
                "It stops only at the unique global minimum of the loss",
                "It stops at the endpoints of the domain regardless of the gradient",
                "It tends to settle near points where the gradient is (near) zero, which may be a local minimum rather than the global one",
                "It stops wherever the second derivative is exactly zero"
              ],
              "answer": 2,
              "explain": "Following the gradient downhill drives the gradient toward zero, and since a zero gradient marks any critical point, descent can halt at a local minimum rather than the global one."
            },
            {
              "q": "You want to maximize $f(x) = 6x^2 - x^3$ on the closed interval $[1, 5]$. After finding the critical points, what is the global maximum value?",
              "choices": [
                "$f(0) = 0$, the only place the derivative vanishes",
                "$f(5) = 25$, the right endpoint",
                "$f(1) = 5$, the left endpoint",
                "$f(4) = 32$, the interior critical point"
              ],
              "answer": 3,
              "explain": "$f'(x) = 12x - 3x^2 = 3x(4 - x)$ vanishes at $x=0$ (outside $[1,5]$) and $x=4$. Comparing the candidates inside the domain, $f(1)=5$, $f(4)=32$, $f(5)=25$, so the interior critical point $x=4$ wins; $x=0$ is irrelevant because it lies outside the domain."
            },
            {
              "q": "A loss surface $L(w)$ has a flat plateau where $\\nabla L \\approx \\mathbf{0}$ but the point is not a minimum. With a fixed learning rate $\\eta$, what does gradient descent do there?",
              "choices": [
                "It overshoots wildly because zero gradient makes the step size blow up",
                "It takes very small steps and can stall, since the update $-\\eta\\,\\nabla L$ is nearly zero",
                "It immediately jumps to the global minimum because flat regions are always optimal",
                "It reverses direction and climbs back uphill"
              ],
              "answer": 1,
              "explain": "The update is $-\\eta\\,\\nabla L$, so when the gradient is near zero the step is near zero regardless of $\\eta$, causing slow progress or stalling. Zero gradient cannot cause overshoot (it makes steps smaller, not larger), and a vanishing gradient does not distinguish a plateau or saddle from a true minimum."
            },
            {
              "q": "A student claims: 'If $\\eta$ is small the loss always goes down, so to train fastest I should just pick the largest $\\eta$ possible.' What is the flaw?",
              "choices": [
                "A large $\\eta$ has no downside; bigger steps always reach the minimum sooner",
                "Too large an $\\eta$ can overshoot the valley, making the loss oscillate or diverge instead of decrease",
                "Large $\\eta$ keeps the loss decreasing but rounds the answer incorrectly",
                "The learning rate has no effect on convergence, only on memory usage"
              ],
              "answer": 1,
              "explain": "Gradient descent is guaranteed to decrease the loss only for sufficiently small $\\eta$; an overly large step can jump past the minimum and land somewhere with a higher loss, producing oscillation or divergence. The 'bigger is always faster' intuition is exactly the common misconception."
            },
            {
              "q": "Consider $f(x) = x^4 - 4x^3$. At $x = 0$ we have $f'(0) = 0$ and $f''(0) = 0$. Using the sign of $f'(x) = 4x^3 - 12x^2 = 4x^2(x-3)$ near $x=0$, what kind of point is $x=0$?",
              "choices": [
                "A local minimum, because $f'(c) = 0$",
                "Impossible to classify without computing $f'''$",
                "A local maximum, because $f''(0) = 0$",
                "Neither a max nor a min, because $f'$ is negative on both sides of $0$"
              ],
              "answer": 3,
              "explain": "For $x$ slightly less than $0$ and slightly greater than $0$ (but below $3$), the factor $4x^2 \\ge 0$ while $(x-3) < 0$, so $f'(x) < 0$ on both sides; the function decreases through $x=0$ with no sign change, giving neither a max nor a min. The first-derivative sign test resolves it directly, so $f'''$ is unnecessary."
            },
            {
              "q": "To find the absolute maximum and minimum of a continuous $f$ on $[a,b]$, evaluate $f$ at:",
              "choices": [
                "the critical points in $(a,b)$ AND the endpoints $a$ and $b$, then compare",
                "only the endpoints $a$ and $b$",
                "only the midpoint",
                "only the critical points in $(a,b)$"
              ],
              "answer": 0,
              "explain": "On a closed interval the extremes occur either at an interior critical point ($f'=0$ or undefined) or at an endpoint. So list the critical points in $(a,b)$, add $a$ and $b$, evaluate $f$ at each, and pick the largest and smallest — the 'closed-interval method'."
            },
            {
              "q": "For a convex function, any local minimum is:",
              "choices": [
                "also the global minimum",
                "a saddle point",
                "actually a maximum",
                "never unique"
              ],
              "answer": 0,
              "explain": "Convexity (a single bowl, no separate valleys) guarantees a local minimum is *the* global minimum — nowhere lower to get stuck. This is why convex problems are 'easy': gradient descent can't be trapped in a suboptimal local minimum, unlike on the non-convex loss surfaces of deep nets."
            },
            {
              "q": "At an interior point where a differentiable function attains a local maximum or minimum, its derivative must be:",
              "choices": [
                "positive",
                "zero",
                "negative",
                "undefined"
              ],
              "answer": 1,
              "explain": "Fermat's theorem: at an interior extremum of a differentiable function, $f'(c)=0$ — the tangent is horizontal, with no uphill or downhill direction. This is why optimization starts by solving $f'(x)=0$ (or $\\nabla L=\\mathbf{0}$). The converse fails: $f'(c)=0$ can also mark a saddle or inflection."
            },
            {
              "q": "In the gradient-descent update $\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta\\,\\nabla L$, the learning rate $\\eta$ controls:",
              "choices": [
                "the final value of the loss",
                "the direction of the step",
                "the number of parameters",
                "the step size — how far you move at each update"
              ],
              "answer": 3,
              "explain": "$\\eta$ scales the step: too small and training crawls; too large and you overshoot or diverge. The *direction* is fixed by $-\\nabla L$ (steepest descent); $\\eta$ only sets how far along that direction you move each iteration."
            }
          ],
          "flashcards": [
            {
              "front": "Fermat's Theorem (and its one-way nature)",
              "back": "If $f$ has a local extremum at an interior point $c$ and $f'(c)$ exists, then $f'(c)=0$. The converse fails: $f'(c)=0$ does not imply an extremum (e.g., $x^3$ at $0$)."
            },
            {
              "front": "What is a critical point?",
              "back": "A point $c$ in the domain where $f'(c)=0$ OR $f'(c)$ does not exist. Both kinds can host extrema (e.g., $|x|$ has its min where the derivative is undefined)."
            },
            {
              "front": "Closed Interval Method for global extrema on $[a,b]$ (continuous $f$)",
              "back": "1) Find critical points in $(a,b)$. 2) Evaluate $f$ at those points AND at endpoints $a,b$. 3) Largest value = global max, smallest = global min. (Guaranteed to exist by the Extreme Value Theorem.)"
            },
            {
              "front": "Second-derivative test",
              "back": "If $f'(c)=0$: $f''(c)>0 \\Rightarrow$ local min (concave up); $f''(c)<0 \\Rightarrow$ local max (concave down); $f''(c)=0 \\Rightarrow$ inconclusive, use first-derivative test. Multivariable analog: the Hessian (positive-definite = min, mixed eigenvalues = saddle)."
            },
            {
              "front": "Gradient descent update rule and its meaning",
              "back": "$\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta\\,\\nabla L(\\mathbf{w}_t)$. Step opposite the gradient (steepest descent) by step size $\\eta$ (learning rate). Converges toward $\\nabla L = \\mathbf{0}$, the multivariable version of $f'(c)=0$."
            },
            {
              "front": "Convex vs. non-convex loss landscapes",
              "back": "Convex (single bowl, $f''\\ge 0$): every local min is the global min; gradient descent provably finds it (linear/logistic regression). Non-convex (deep nets): many local minima and saddle points; gradient descent only reaches a nearby critical point, not necessarily the best."
            }
          ],
          "homework": [
            {
              "prompt": "A farmer has 200 meters of fencing to enclose a rectangular field bordered on one side by a straight river (so no fence is needed along the river). Find the dimensions that maximize the enclosed area, and state the maximum area. Verify your extremum with a derivative test.",
              "hint": "Only three sides are fenced. If the two sides perpendicular to the river each have length $x$ and the side parallel to the river has length $y$, the constraint is $2x + y = 200$. Express area $A$ in terms of $x$ alone, then optimize.",
              "solution": "Let the two perpendicular sides be $x$ and the river-parallel side be $y$. Fencing constraint: $2x + y = 200 \\Rightarrow y = 200 - 2x$. Area: $A(x) = x\\,y = x(200 - 2x) = 200x - 2x^2$, with domain $0 < x < 100$. Differentiate: $A'(x) = 200 - 4x = 0 \\Rightarrow x = 50$. Verify with the second-derivative test: $A''(x) = -4 < 0$, so $A$ is concave down and $x=50$ is a local maximum; since it is the only critical point on the interval and $A\\to 0$ at both ends, it is the global max. Then $y = 200 - 2(50) = 100$. Maximum area $= 50 \\times 100 = 5000\\,\\text{m}^2$. Dimensions: $50$ m (each perpendicular side) by $100$ m (parallel to river)."
            },
            {
              "prompt": "Find the global minimum of $f(x) = x + \\frac{4}{x}$ on the open domain $x > 0$. Explain why the critical point you find is the GLOBAL minimum even though the domain is not a closed interval.",
              "hint": "The domain is open and unbounded, so the Closed Interval Method does not apply. Find the critical point with $f'=0$, then analyze the end behavior as $x\\to 0^+$ and $x\\to\\infty$.",
              "solution": "Differentiate: $f'(x) = 1 - \\frac{4}{x^2} = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (taking $x>0$). Value: $f(2) = 2 + \\frac{4}{2} = 4$. Confirm a local min via the second derivative: $f''(x) = \\frac{8}{x^3}$, and $f''(2) = \\frac{8}{8} = 1 > 0$, concave up, so $x=2$ is a local minimum. For the global claim, examine end behavior: as $x \\to 0^+$, $\\frac{4}{x} \\to +\\infty$ so $f\\to+\\infty$; as $x \\to \\infty$, $x \\to +\\infty$ so $f\\to+\\infty$. With both 'walls' rising to infinity and only one interior critical point, that point must be the global minimum. Global minimum value is $4$, attained at $x = 2$. (This is the AM-GM bound $x + 4/x \\ge 2\\sqrt{4} = 4$, confirming the answer.)"
            },
            {
              "prompt": "Consider the 1-D quadratic loss $L(w) = \\tfrac{1}{2}k w^2$ with $k > 0$, optimized by gradient descent $w_{t+1} = w_t - \\eta\\,L'(w_t)$. (a) Write the update explicitly. (b) Find the value $w^*$ that minimizes $L$ and confirm it via $L'$. (c) Explain, using the update from (a), why the learning rate must satisfy $\\eta < 2/k$ for the iterates to converge to $w^*$.",
              "hint": "Compute $L'(w) = kw$, substitute into the update to get $w_{t+1}$ as a constant times $w_t$. Convergence of a geometric recursion $w_{t+1} = r\\,w_t$ requires $|r| < 1$.",
              "solution": "(a) $L'(w) = kw$, so the update is $w_{t+1} = w_t - \\eta(k w_t) = (1 - \\eta k)\\,w_t$. (b) Setting $L'(w)=kw=0$ gives $w^* = 0$; since $L''(w)=k>0$, this is a minimum (the bottom of the bowl). (c) The recursion $w_{t+1} = (1-\\eta k)w_t$ is geometric with ratio $r = 1 - \\eta k$, so $w_t = (1-\\eta k)^t w_0$. This converges to $0 = w^*$ iff $|1 - \\eta k| < 1$, i.e. $-1 < 1 - \\eta k < 1$, which gives $0 < \\eta k < 2$, i.e. $\\eta < 2/k$. Interpretation: the curvature $k = L''$ caps the safe step size. If $\\eta > 2/k$ the factor $|1-\\eta k|>1$ and the iterates overshoot and diverge; if $\\eta = 1/k$ you land exactly on $w^*$ in a single step. This is the same $f''$ from the second-derivative test now governing how fast you may descend."
            }
          ],
          "examples": [
            {
              "title": "Minimize a quadratic",
              "body": "Find the minimum of $f(x)=x^2-4x+7$.",
              "solution": "Set $f'(x)=2x-4=0\\Rightarrow x=2$. Since $f''(x)=2>0$ it's a minimum; $f(2)=4-8+7=3$."
            },
            {
              "title": "A gradient-descent step",
              "body": "For $f(x)=x^2$ starting at $x=5$ with learning rate $\\eta=0.1$, what is $x$ after one step?",
              "solution": "$f'(x)=2x$, so $x\\leftarrow 5-0.1\\cdot(2\\cdot5)=5-1=4$. Each step moves toward the minimum at $0$."
            },
            {
              "title": "Maximizing area with a fixed perimeter",
              "body": "You have $20$ metres of fence to enclose a rectangular garden (no walls to lean on). What dimensions maximize the area?",
              "solution": "<strong>Reduce to one variable.</strong> With perimeter $2x + 2y = 20$ we get $y = 10 - x$, so the area depends on $x$ alone:\n$$A(x) = x(10 - x) = 10x - x^2.$$\n<strong>Find the critical point.</strong> $A'(x) = 10 - 2x = 0 \\Rightarrow x = 5$, and $A''(x) = -2 \\lt 0$ confirms a maximum.\n<strong>Solve.</strong> Then $y = 10 - 5 = 5$ — a $5 \\times 5$ <em>square</em>, area $A(5) = 25\\ \\text{m}^2$ (beating, say, a $4 \\times 6$ at $24$).\n<strong>The pattern.</strong> Among all rectangles of fixed perimeter the square is always optimal — optimization under a constraint pushes toward symmetry. The recipe never changes: express the quantity in one variable using the constraint, set the derivative to zero, confirm with the second derivative."
            }
          ]
        },
        {
          "id": "c-linearization-lhopital",
          "title": "Linear Approximation, Differentials & L'Hôpital's Rule",
          "minutes": 14,
          "content": "<h3>The Big Idea: Trade a Curve for Its Tangent Line</h3>\n<p>The derivative $f'(a)$ is the slope of the tangent line at $x = a$. That single number contains a powerful promise: <strong>near $a$, the curve and its tangent line are almost indistinguishable.</strong> This is the engine behind almost every numerical method you'll ever meet — from Newton's root-finder to backpropagation. If you understand how to replace a complicated function with a straight line locally, and how to track the error you incur, you understand the operational core of differential calculus.</p>\n<p>This lesson builds three connected tools out of that one idea:</p>\n<ul>\n<li><strong>Linear approximation (linearization):</strong> estimate $f(x)$ for $x$ near $a$ using the tangent line.</li>\n<li><strong>Differentials:</strong> a clean notation for propagating <em>small changes and measurement errors</em> through a function.</li>\n<li><strong>L'Hôpital's rule:</strong> evaluate indeterminate limits ($0/0$, $\\infty/\\infty$) by comparing derivatives — itself a consequence of local linearity.</li>\n</ul>\n\n<h3>1. Linear Approximation</h3>\n<p>Fix a point $a$ where $f$ is differentiable. The tangent line at $a$ is</p>\n$$L(x) = f(a) + f'(a)(x - a).$$\n<p>We call $L$ the <strong>linearization of $f$ at $a$</strong>, and the approximation $f(x) \\approx L(x)$ is the <strong>local linear approximation</strong>. Geometrically: zoom far enough into a smooth curve and it looks straight; $L$ is the line you converge to.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$f(a)$ is \"where you are,\" and $f'(a)$ is \"the rate you're moving.\" So $L(x)$ just says: start at the known value $f(a)$, then walk a distance $(x-a)$ along a road whose steepness is $f'(a)$. The error is only whatever <em>curvature</em> bends you away from that straight road.</p>\n</div>\n\n<h4>Worked example: estimate $\\sqrt{50}$ by hand</h4>\n<p>Let $f(x) = \\sqrt{x}$. We want $f(50)$, and we know $\\sqrt{49} = 7$ exactly — so choose $a = 49$. Then $f'(x) = \\frac{1}{2\\sqrt{x}}$, giving $f'(49) = \\frac{1}{14}$. The linearization is</p>\n$$L(x) = 7 + \\tfrac{1}{14}(x - 49).$$\n<p>Plug in $x = 50$:</p>\n$$\\sqrt{50} \\approx 7 + \\tfrac{1}{14}(1) = 7.0714\\ldots$$\n<p>The true value is $7.07107\\ldots$, so our estimate is right to four decimal places using only mental arithmetic. The trick is always the same: <strong>anchor at a nearby point where the function is easy to evaluate exactly.</strong></p>\n\n<h4>How big is the error?</h4>\n<p>Taylor's theorem makes the error precise. If $f$ is twice differentiable, then for some $\\xi$ between $a$ and $x$,</p>\n$$f(x) - L(x) = \\tfrac{1}{2} f''(\\xi)\\,(x - a)^2.$$\n<p>Three things to read off this formula:</p>\n<ul>\n<li>The error is governed by $f''$ — by <strong>curvature</strong>. A straight function ($f'' = 0$) has zero approximation error; that's why linearization is exact for linear functions.</li>\n<li>The error shrinks like $(x-a)^2$. Halve your distance from $a$ and the error drops by a factor of <strong>four</strong>. This quadratic decay is why \"local\" is the operative word.</li>\n<li>The sign of $f''$ tells you the <em>direction</em> of error. For $\\sqrt{x}$, $f'' < 0$ (concave down), so the tangent line lies <em>above</em> the curve — and indeed $7.0714 > 7.07107$. The linearization overestimates.</li>\n</ul>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Linearization is the order-1 truncation of the <strong>Taylor series</strong> $f(x) = f(a) + f'(a)(x-a) + \\tfrac{1}{2}f''(a)(x-a)^2 + \\cdots$. Differentials and L'Hôpital are both special readings of this same expansion. Almost all of applied analysis is the art of choosing how many Taylor terms you can afford to keep.</p>\n</div>\n\n<div data-viz=\"calc-taylor\"></div>\n<h3>2. Differentials</h3>\n<p>Differentials repackage linear approximation in the language of <em>small changes</em>. Define the independent differential $dx$ as any change in $x$, and the dependent differential</p>\n$$dy = f'(x)\\,dx.$$\n<p>Here $dy$ is the change in height <em>along the tangent line</em> when $x$ changes by $dx$. Compare it with the true change in the function, $\\Delta y = f(x + dx) - f(x)$. The two agree to first order:</p>\n$$\\Delta y \\approx dy = f'(x)\\,dx, \\qquad \\text{error} = O\\big((dx)^2\\big).$$\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$\\Delta y$ is what the function <em>actually</em> does; $dy$ is what the tangent line <em>predicts</em> it does. They diverge only because of curvature, and for small $dx$ that gap is negligible. Differentials are just linear approximation wearing a notation that's convenient for bookkeeping.</p>\n</div>\n\n<h4>Error propagation: the killer application</h4>\n<p>Suppose you measure a quantity $x$ with some uncertainty $dx$, then compute $y = f(x)$. How much uncertainty does $y$ inherit? Differentials answer directly: the propagated <strong>absolute error</strong> is</p>\n$$dy = f'(x)\\,dx,$$\n<p>and the <strong>relative error</strong> (often what you actually care about) is $\\dfrac{dy}{y}$.</p>\n\n<h4>Worked example: error in a sphere's volume</h4>\n<p>You measure a ball bearing's radius as $r = 10\\text{ mm}$ with a tolerance of $\\pm 0.1\\text{ mm}$. The volume is $V = \\frac{4}{3}\\pi r^3$, so $\\frac{dV}{dr} = 4\\pi r^2$. The propagated absolute error in volume:</p>\n$$dV = 4\\pi r^2\\,dr = 4\\pi (10)^2 (0.1) = 40\\pi \\approx 126\\text{ mm}^3.$$\n<p>The relative error is more illuminating:</p>\n$$\\frac{dV}{V} = \\frac{4\\pi r^2\\,dr}{\\tfrac{4}{3}\\pi r^3} = 3\\,\\frac{dr}{r} = 3 \\cdot \\frac{0.1}{10} = 3\\%.$$\n<p>That factor of $3$ is the exponent — a takeaway worth internalizing: <strong>for $y = x^n$, the relative error in $y$ is $n$ times the relative error in $x$.</strong> (Differentiate $\\ln y = n \\ln x$ to get $\\frac{dy}{y} = n\\frac{dx}{x}$.) A 1% error in a measured length becomes a 3% error in any volume derived from it.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Differentials <em>are</em> the multivariable chain rule that powers backpropagation. The total differential $df = \\frac{\\partial f}{\\partial x_1}dx_1 + \\cdots + \\frac{\\partial f}{\\partial x_n}dx_n = \\nabla f \\cdot d\\mathbf{x}$ is exactly how a small perturbation of weights propagates to a small change in the loss. Gradient descent is \"differentials run in reverse\": pick $d\\mathbf{x} = -\\eta\\,\\nabla f$ so that $df = -\\eta\\,\\|\\nabla f\\|^2 < 0$, guaranteeing the loss decreases for a small enough step. The same first-order error analysis tells you why too large a learning rate overshoots — you've left the regime where the linear model is trustworthy.</p>\n</div>\n\n<p><b>Try it in code.</b> Newton's method finds a root by repeatedly replacing the curve with its tangent line — linearization in action.</p>\n<div data-code=\"javascript\" data-expected=\"1.41421\">// Newton's method: find the square root of 2 by\n// repeatedly replacing the curve with its tangent line.\nlet x = 2;\nfor (let k = 4; k >= 1; k--) x = (x + 2 / x) / 2;\nconsole.log(x.toFixed(5));   // converges to 1.41421...</div>\n<h3>3. L'Hôpital's Rule</h3>\n<p>Some limits resist direct substitution because they produce a meaningless symbol like $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$. These are <strong>indeterminate forms</strong>: the answer genuinely depends on <em>how fast</em> numerator and denominator approach their limits, and substitution throws that information away.</p>\n\n<h4>Statement</h4>\n<p>Suppose $f$ and $g$ are differentiable near $a$ (except possibly at $a$), $g'(x) \\neq 0$ near $a$, and</p>\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} \\quad\\text{has the form } \\frac{0}{0} \\text{ or } \\frac{\\pm\\infty}{\\pm\\infty}.$$\n<p>Then, <strong>provided the right-hand limit exists (or is $\\pm\\infty$)</strong>,</p>\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}.$$\n<p>The rule holds equally for one-sided limits and for $a = \\pm\\infty$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Why <em>derivatives</em>? In the $0/0$ case with $f(a)=g(a)=0$, linearize both: $f(x) \\approx f'(a)(x-a)$ and $g(x) \\approx g'(a)(x-a)$. The shared factor $(x-a)$ cancels, leaving $\\frac{f'(a)}{g'(a)}$. L'Hôpital is local linearity comparing two slopes: the limit of a $0/0$ \"race\" is just the ratio of the rates at which the two functions leave zero.</p>\n</div>\n\n<h4>Worked example: $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x}$</h4>\n<p>Substitution gives $\\frac{0}{0}$. Apply the rule: $\\frac{d}{dx}\\sin x = \\cos x$, $\\frac{d}{dx}x = 1$, so</p>\n$$\\lim_{x\\to 0}\\frac{\\sin x}{x} = \\lim_{x\\to 0}\\frac{\\cos x}{1} = \\cos 0 = 1.$$\n<p>(A logical caveat for purists: deriving $\\frac{d}{dx}\\sin x = \\cos x$ from first principles already <em>uses</em> this limit, so this is a circular proof of that famous limit — but it's a perfectly valid evaluation given the derivative rules.)</p>\n\n<h4>When you may need to apply it more than once</h4>\n<p>If $\\frac{f'}{g'}$ is still indeterminate, differentiate again:</p>\n$$\\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2} \\overset{0/0}{=} \\lim_{x\\to 0}\\frac{\\sin x}{2x} \\overset{0/0}{=} \\lim_{x\\to 0}\\frac{\\cos x}{2} = \\frac{1}{2}.$$\n\n<h4>When L'Hôpital does NOT apply — read this twice</h4>\n<p>The most common errors are misapplications. Guard against these:</p>\n<ul>\n<li><strong>Not actually indeterminate.</strong> $\\displaystyle\\lim_{x\\to 0}\\frac{\\cos x}{x+1} = \\frac{1}{1} = 1$ by substitution — it's $\\frac{1}{1}$, not $\\frac{0}{0}$. Differentiating top and bottom here gives $\\frac{-\\sin x}{1} \\to 0$, a <em>wrong</em> answer. <strong>Always confirm the form is indeterminate before applying the rule.</strong></li>\n<li><strong>The derivative limit fails to exist.</strong> The rule only says: <em>if</em> $\\lim \\frac{f'}{g'}$ exists, <em>then</em> it equals the original. The converse is false. For $\\displaystyle\\lim_{x\\to\\infty}\\frac{x + \\sin x}{x}$, the original limit is clearly $1$ (since $\\frac{\\sin x}{x}\\to 0$), but $\\frac{f'}{g'} = \\frac{1 + \\cos x}{1}$ <em>oscillates and has no limit</em>. L'Hôpital is silent here; it doesn't give a wrong answer, it gives no answer — you must use another method.</li>\n<li><strong>Differentiating the quotient.</strong> You differentiate numerator and denominator <em>separately</em>. You do <strong>not</strong> apply the quotient rule to $\\frac{f}{g}$.</li>\n</ul>\n\n<h4>Other indeterminate forms: convert first</h4>\n<p>L'Hôpital natively handles only $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$. The forms $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$, $0^0$, $\\infty^0$ must be <em>algebraically rewritten</em> into a quotient first.</p>\n<ul>\n<li><strong>$0\\cdot\\infty$:</strong> rewrite a product $f\\cdot g$ as $\\frac{f}{1/g}$. Example: $\\displaystyle\\lim_{x\\to 0^+} x\\ln x = \\lim_{x\\to 0^+}\\frac{\\ln x}{1/x} \\overset{-\\infty/\\infty}{=} \\lim_{x\\to 0^+}\\frac{1/x}{-1/x^2} = \\lim_{x\\to 0^+}(-x) = 0.$</li>\n<li><strong>$1^\\infty,\\ 0^0,\\ \\infty^0$:</strong> take logarithms. To find $\\lim x^x$ as $x\\to 0^+$, set $y = x^x$, so $\\ln y = x\\ln x \\to 0$ (just computed), hence $y \\to e^0 = 1$.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Indeterminate forms haunt numerical code. The softmax/cross-entropy combination, $\\log\\sum_i e^{z_i}$, naively overflows ($\\infty$) or underflows ($0$); the <strong>log-sum-exp trick</strong> subtracts $\\max_i z_i$ to dodge the indeterminate regime. The same theme — understanding the <em>relative rates</em> at which terms blow up or vanish — underlies why we use $\\log$-space probabilities, $\\epsilon$-smoothing in denominators, and the numerically stable variants of activations like the sigmoid. L'Hôpital is the analytic discipline behind that engineering instinct.</p>\n</div>\n\n<h3>Putting It Together</h3>\n<p>All three tools spring from one fact: near a point, a differentiable function is essentially its tangent line. Linearization uses that line to estimate values; differentials use it to propagate errors; L'Hôpital uses the <em>comparison of two such lines</em> to resolve $0/0$. The unifying object is the Taylor expansion, and the recurring discipline — keep the leading-order behavior, control the rest — is exactly the mindset that makes numerical computing and machine learning tractable.</p>\n<h4>Interactive — Newton's method</h4>\n<div data-viz=\"calc-newton\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why L'Hôpital's rule works</summary>\n<p>L'Hôpital's rule says that for a $0/0$ (or $\\infty/\\infty$) limit, $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$ — replace the functions by their derivatives. Why is that legal?</p>\n<p>Near a point $a$ where $f(a) = g(a) = 0$, each function is approximated by its tangent line: $f(x) \\approx f'(a)(x - a)$ and $g(x) \\approx g'(a)(x - a)$ (the linearization, with no constant term since both vanish at $a$). Their ratio is then $\\frac{f'(a)(x-a)}{g'(a)(x-a)} = \\frac{f'(a)}{g'(a)}$ — the $(x-a)$ factors cancel, leaving the ratio of slopes. The indeterminate $0/0$ was just two quantities heading to zero at <em>rates</em> $f'(a)$ and $g'(a)$, and the limit is the ratio of those rates.</p>\n<p>The \"aha\": $0/0$ is not \"undefined\" so much as \"the answer depends on <em>how fast</em> each part goes to zero.\" L'Hôpital measures those speeds with derivatives. It is the same linear-approximation idea behind Newton's method — locally, every smooth function looks like its tangent line.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: linearization — every smooth function is locally a line</summary>\n<p>The single most reused idea in applied calculus: near a point $a$, a differentiable function is almost exactly its <b>tangent line</b>. The <em>linear approximation</em> is $f(x) \\approx f(a) + f'(a)(x - a)$ — the first-order Taylor expansion, valid for $x$ near $a$.</p>\n<p><b>It actually works.</b> Estimate $\\sqrt{4.1}$ with $f(x)=\\sqrt x$ at $a=4$: $f(4)=2$, $f'(4)=\\tfrac{1}{2\\sqrt4}=0.25$, so $\\sqrt{4.1} \\approx 2 + 0.25(0.1) = 2.025$ — the true value is $2.0248$. A one-step mental calculation, accurate to three decimals.</p>\n<p><b>Why it is everywhere.</b> \"Locally linear\" is the engine behind <b>Newton's method</b> (follow the tangent to its root), <b>error propagation</b> ($\\delta f \\approx f'\\,\\delta x$), the physicist's $\\sin\\theta \\approx \\theta$, and <em>gradient descent</em> — each step moves along the local linear model $f(x) \\approx f(a) + \\nabla f\\cdot(x-a)$. Differentiability <em>means</em> \"has a good linear approximation.\"</p>\n<p>The \"aha\": the derivative is not just a slope — it is a <em>local model</em>. Replacing a curve by its tangent turns hard nonlinear questions into easy linear ones, which is why so much of science and optimization runs on first-order approximations.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Taylor series — linearization to higher order</summary>\n<p>Linearization (the other dive) replaces a curve with its tangent <em>line</em> — matching the function's value and first derivative at a point. <strong>Taylor series</strong> is the natural sequel: keep matching <em>higher</em> derivatives for ever-better polynomial approximations.</p>\n<p><b>The idea.</b> Near $x=a$, $$f(x)\\approx f(a)+f'(a)(x-a)+\\tfrac{f''(a)}{2!}(x-a)^2+\\tfrac{f'''(a)}{3!}(x-a)^3+\\cdots$$ The degree-1 truncation <em>is</em> linearization; the quadratic term adds curvature, the cubic the next bend, and so on. With enough terms the polynomial hugs the true function over a widening interval.</p>\n<p><b>Why it matters.</b> Taylor series are how computers actually evaluate $\\sin$, $e^x$, and $\\log$ (a few polynomial terms); how physics linearizes-plus-corrects (\"to second order...\"); and the second-order term — the <em>Hessian</em> in many variables — is what Newton's method and quasi-Newton optimizers use to take smarter steps than plain gradient descent. The <em>remainder</em> term bounds the error, telling you how many terms you need.</p>\n<p>The \"aha\": linearization is just the first two terms of Taylor. Keep matching derivatives — $f(a)+f'(a)(x-a)+\\tfrac{f''(a)}{2}(x-a)^2+\\cdots$ — and a polynomial approximates any smooth function as closely as you like near a point. It is how functions get computed, how physics keeps correction terms, and where second-order optimization comes from.</p>\n</details>\n",
          "mcq": [
            {
              "q": "You estimate $\\sqrt[3]{8.1}$ using the linearization of $f(x)=x^{1/3}$ at $a=8$. Which is true about the estimate?",
              "choices": [
                "It overestimates, because $f$ is concave down there ($f''<0$), so the tangent lies above the curve",
                "It underestimates, because the tangent line always lies below any curve",
                "It is exact, because cube root is a linear function",
                "It overestimates, because $f'(8) > 0$"
              ],
              "answer": 0,
              "explain": "For $f=x^{1/3}$, $f''(x) = -\\frac{2}{9}x^{-5/3} < 0$, so the graph is concave down and the tangent line sits above it, making the linear estimate an overestimate. The sign of $f'$ does not determine over/underestimation; the sign of $f''$ does."
            },
            {
              "q": "A cube's side is measured as $s = 5$ cm with error $\\pm 1\\%$. Using differentials, the relative error in its volume $V = s^3$ is approximately:",
              "choices": [
                "About $3\\%$",
                "About $1\\%$",
                "About $0.33\\%$",
                "About $5\\%$"
              ],
              "answer": 0,
              "explain": "Since $\\frac{dV}{V} = 3\\frac{ds}{s}$, the relative error triples: a $1\\%$ length error yields a $3\\%$ volume error. The exponent $n=3$ becomes the multiplier on relative error."
            },
            {
              "q": "Evaluate $\\displaystyle\\lim_{x\\to\\infty}\\frac{x + \\cos x}{x}$. Can L'Hôpital's rule be applied directly?",
              "choices": [
                "Yes; differentiating gives $\\frac{1 - \\sin x}{1}$, so the limit is $1$",
                "L'Hôpital gives $0$, so the limit is $0$",
                "The limit does not exist because $\\cos x$ oscillates",
                "The limit is $1$, but L'Hôpital fails here because $\\frac{1-\\sin x}{1}$ has no limit; use $\\frac{\\cos x}{x}\\to 0$ instead"
              ],
              "answer": 3,
              "explain": "The form is $\\infty/\\infty$ so the rule is eligible, but its conclusion requires $\\lim f'/g'$ to exist; here $1-\\sin x$ oscillates, so the rule is inconclusive. Directly, $\\frac{x+\\cos x}{x} = 1 + \\frac{\\cos x}{x} \\to 1$."
            },
            {
              "q": "Why does applying L'Hôpital to $\\displaystyle\\lim_{x\\to 0}\\frac{\\cos x}{x + 1}$ give a wrong answer?",
              "choices": [
                "Because you must use the quotient rule, not separate derivatives",
                "Because the limit is actually $\\infty$",
                "Because $\\cos x$ is not differentiable at $0$",
                "Because the form is $\\frac{1}{1}$, not indeterminate, so the rule does not apply — just substitute to get $1$"
              ],
              "answer": 3,
              "explain": "Substitution gives $\\frac{\\cos 0}{0+1} = \\frac{1}{1} = 1$, a determinate value. L'Hôpital is only valid for indeterminate forms; applying it to a determinate quotient produces the spurious answer $\\frac{-\\sin x}{1}\\to 0$."
            },
            {
              "q": "The linearization of $f$ at $a$ is $L(x) = f(a) + f'(a)(x-a)$. What does the term $f'(a)(x-a)$ represent geometrically?",
              "choices": [
                "The exact change in $f$ between $a$ and $x$",
                "The curvature error you incur near $a$",
                "The change in height predicted by traveling along the tangent line a horizontal distance $(x-a)$",
                "The average rate of change of $f$ on $[a,x]$"
              ],
              "answer": 2,
              "explain": "$f'(a)$ is the tangent line's slope, so $f'(a)(x-a)$ is the rise obtained by walking a horizontal distance $(x-a)$ along that straight tangent road, not the curve's exact change."
            },
            {
              "q": "You use the tangent line at $a$ to estimate $f(x)$ for a function that is concave down (i.e. $f''<0$) on the relevant interval. Compared to the true value, your linear approximation will be:",
              "choices": [
                "Exact",
                "An underestimate",
                "An overestimate",
                "Sometimes over, sometimes under, depending on the sign of $x-a$"
              ],
              "answer": 2,
              "explain": "By the error formula $f(x)-L(x)=\\tfrac12 f''(\\xi)(x-a)^2$, when $f''<0$ the quantity $f(x)-L(x)$ is negative, so $L(x)>f(x)$ and the tangent line overestimates a concave-down curve."
            },
            {
              "q": "A linear approximation has error governed by $f(x)-L(x)=\\tfrac12 f''(\\xi)(x-a)^2$. If you cut your distance from the anchor point $a$ in half, the approximation error is reduced by roughly a factor of:",
              "choices": [
                "2",
                "4",
                "$\\sqrt{2}$",
                "It is unchanged because $f''$ depends on $\\xi$"
              ],
              "answer": 1,
              "explain": "The error scales like $(x-a)^2$, so halving the distance multiplies the error by $(1/2)^2 = 1/4$, a fourfold reduction."
            },
            {
              "q": "Evaluate $\\displaystyle\\lim_{x\\to 0}\\frac{e^{x}-1-x}{x^{2}}$ using L'Hôpital's rule.",
              "choices": [
                "$0$",
                "$1$",
                "The limit does not exist",
                "$\\tfrac{1}{2}$"
              ],
              "answer": 3,
              "explain": "Both numerator and denominator give $0/0$; differentiating once gives $\\frac{e^x-1}{2x}$ (still $0/0$), and again gives $\\frac{e^x}{2}\\to\\frac12$ as $x\\to 0$."
            },
            {
              "q": "Use the linearization of $f(x)=\\ln x$ at $a=1$ to estimate $\\ln(1.1)$. What value does it give?",
              "choices": [
                "$0.0953$",
                "$1.1$",
                "$0.1$",
                "$0$"
              ],
              "answer": 2,
              "explain": "Here $f(1)=0$ and $f'(x)=1/x$ so $f'(1)=1$, giving $L(x)=0+1\\cdot(x-1)=x-1$; thus $\\ln(1.1)\\approx 0.1$. The choice $0.0953$ is the true value, not the linear estimate, and $1.1$ confuses the input with the output."
            },
            {
              "q": "For the indeterminate form $\\lim_{x\\to 0^+} x\\ln x$, what is the correct first step before applying L'Hôpital's rule?",
              "choices": [
                "Rewrite it as $\\dfrac{\\ln x}{1/x}$ to get an $\\infty/\\infty$ form",
                "Apply L'Hôpital directly to $x\\ln x$ since it is $0\\cdot\\infty$",
                "Conclude the limit is $0$ because $x\\to 0$",
                "Rewrite it as $\\dfrac{x}{1/\\ln x}$, which is already a determinate form"
              ],
              "answer": 0,
              "explain": "L'Hôpital requires a $0/0$ or $\\infty/\\infty$ quotient, so the product $0\\cdot\\infty$ must first be rewritten as a fraction; $\\frac{\\ln x}{1/x}$ gives $\\infty/\\infty$ (the limit then works out to $0$). Concluding $0$ from $x\\to 0$ alone ignores that $\\ln x\\to-\\infty$, which is exactly why it is indeterminate."
            },
            {
              "q": "A sphere's radius is measured as $r=10$ cm. Using differentials with $V=\\tfrac{4}{3}\\pi r^3$, what is the approximate change in volume $dV$ if the radius increases by $dr=0.1$ cm?",
              "choices": [
                "$4\\pi(10)^2(0.1) \\approx 126$ cm$^3$",
                "$4\\pi(10)^2 \\approx 1257$ cm$^3$",
                "$\\dfrac{4}{3}\\pi (0.1)^3 \\approx 0.004$ cm$^3$",
                "$\\dfrac{4}{3}\\pi(10.1)^3 \\approx 4316$ cm$^3$"
              ],
              "answer": 0,
              "explain": "Since $dV = V'(r)\\,dr = 4\\pi r^2\\,dr = 4\\pi(10)^2(0.1)\\approx 126$ cm$^3$. The value $1257$ forgets to multiply by $dr$, and $4316$ computes the full new volume rather than the small change $dV$."
            },
            {
              "q": "You estimate $f(x)$ with its tangent line at $a$. As you move farther from $a$, what generally happens to the linear approximation, and why?",
              "choices": [
                "The error stays constant, because the slope $f'(a)$ is fixed",
                "The approximation becomes exact once $x$ is far enough from $a$",
                "The error shrinks, because the curve eventually straightens out",
                "The error grows, because the tangent line ignores curvature ($f''$) that increasingly matters far from $a$"
              ],
              "answer": 3,
              "explain": "The remainder term $\\tfrac12 f''(\\xi)(x-a)^2$ grows with $(x-a)^2$, so error increases with distance because the line cannot capture the curvature the true function has. A fixed slope does not keep error constant, since the gap between line and curve widens."
            },
            {
              "q": "L'Hôpital's rule may be applied to $\\lim \\dfrac{f}{g}$ only when direct substitution gives:",
              "choices": [
                "any value at all",
                "an indeterminate form, $\\tfrac{0}{0}$ or $\\tfrac{\\infty}{\\infty}$",
                "only $\\tfrac{0}{0}$",
                "a finite nonzero number"
              ],
              "answer": 1,
              "explain": "L'Hôpital requires the indeterminate forms $\\tfrac00$ or $\\tfrac{\\infty}{\\infty}$. Applying it to a *determinate* limit gives wrong answers — e.g. $\\lim_{x\\to0}\\frac{\\cos x}{x+1}=\\frac11=1$ by substitution, but differentiating top and bottom would wrongly give $\\frac{-\\sin x}{1}\\to 0$. (Forms like $0\\cdot\\infty$ or $\\infty-\\infty$ must first be rewritten as $\\tfrac00$ or $\\tfrac\\infty\\infty$.)"
            },
            {
              "q": "To apply L'Hôpital's rule to an indeterminate $\\lim\\dfrac{f(x)}{g(x)}$, you take the limit of:",
              "choices": [
                "$\\left(\\dfrac{f}{g}\\right)'$ via the quotient rule",
                "$\\dfrac{f'(x)}{g'(x)}$ — derivative of the top over derivative of the bottom",
                "$f'(x)\\cdot g'(x)$",
                "$\\dfrac{f(x)}{g'(x)}$"
              ],
              "answer": 1,
              "explain": "L'Hôpital replaces the ratio by the ratio of derivatives: $\\lim\\frac{f}{g} = \\lim\\frac{f'}{g'}$ (when the form is indeterminate and the new limit exists). A common error is to apply the *quotient rule* to $f/g$ instead — that is not what the rule says."
            },
            {
              "q": "Using L'Hôpital's rule, what is $\\displaystyle\\lim_{x\\to 0}\\frac{e^x - 1}{x}$?",
              "choices": [
                "$0$",
                "$1$",
                "$\\infty$",
                "$e$"
              ],
              "answer": 1,
              "explain": "Substitution gives $\\tfrac{e^0-1}{0}=\\tfrac00$, an indeterminate form, so apply L'Hôpital: differentiate top and bottom to get $\\lim_{x\\to0}\\frac{e^x}{1}=e^0=1$. (This also confirms that the slope of $e^x$ at $0$ is $1$.)"
            },
            {
              "q": "Geometrically, the linearization $L(x) = f(a) + f'(a)(x-a)$ is:",
              "choices": [
                "the second-order Taylor polynomial of $f$",
                "a secant line through two points of $f$",
                "the tangent line to $f$ at $x=a$",
                "the derivative $f'$"
              ],
              "answer": 2,
              "explain": "$L(x)$ is exactly the tangent line at $a$: it passes through $(a,f(a))$ with slope $f'(a)$. Near $a$ the curve and its tangent nearly coincide, which is why $L(x)\\approx f(x)$ for $x$ close to $a$ — the basis of linear approximation."
            }
          ],
          "flashcards": [
            {
              "front": "Linearization of $f$ at $a$ (formula and meaning)",
              "back": "$L(x) = f(a) + f'(a)(x-a)$, the tangent line at $a$. For $x$ near $a$, $f(x) \\approx L(x)$. Anchor $a$ at a point where $f$ is easy to evaluate exactly."
            },
            {
              "front": "Error bound for linear approximation",
              "back": "$f(x) - L(x) = \\tfrac{1}{2}f''(\\xi)(x-a)^2$ for some $\\xi$ between $a$ and $x$. Error is driven by curvature ($f''$) and decays like $(x-a)^2$. Concave down ($f''<0$) means tangent above the curve, so the estimate overestimates."
            },
            {
              "front": "Differential $dy$ vs. actual change $\\Delta y$",
              "back": "$dy = f'(x)\\,dx$ is the change along the tangent line; $\\Delta y = f(x+dx)-f(x)$ is the true change. $\\Delta y \\approx dy$ with error $O((dx)^2)$. Used for error propagation: absolute error $dy$, relative error $dy/y$."
            },
            {
              "front": "Relative-error rule for powers",
              "back": "For $y = x^n$: $\\dfrac{dy}{y} = n\\,\\dfrac{dx}{x}$. The relative error multiplies by the exponent (e.g. volume $\\propto r^3$ triples a radius's relative error)."
            },
            {
              "front": "L'Hôpital's rule — statement and the key precondition",
              "back": "If $f/g \\to 0/0$ or $\\infty/\\infty$, $g'\\neq 0$ near $a$, AND $\\lim f'/g'$ exists (or is $\\pm\\infty$), then $\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}$. Differentiate top and bottom separately, NOT via the quotient rule."
            },
            {
              "front": "Two ways L'Hôpital gets misused",
              "back": "(1) Applying it when the form is NOT indeterminate (e.g. $1/1$) — always check first. (2) Concluding 'no limit' when $f'/g'$ has no limit — the rule is then inconclusive, not a verdict; use another method. Convert $0\\cdot\\infty$, $1^\\infty$, $0^0$, $\\infty^0$ to a quotient/log first."
            }
          ],
          "homework": [
            {
              "prompt": "Use a linear approximation to estimate $\\tan(46^\\circ)$, working in radians. State whether your estimate is an over- or underestimate and justify it.",
              "hint": "Anchor at $a = 45^\\circ = \\pi/4$, where $\\tan a = 1$ and $\\sec^2 a$ is easy. Convert the $1^\\circ$ increment to radians: $1^\\circ = \\pi/180 \\approx 0.01745$.",
              "solution": "Let $f(x) = \\tan x$, $a = \\pi/4$. Then $f(a)=1$ and $f'(x)=\\sec^2 x$, so $f'(\\pi/4) = (\\sqrt2)^2 = 2$. Linearization: $L(x) = 1 + 2(x - \\pi/4)$. With $x - a = \\pi/180 \\approx 0.017453$: $\\tan 46^\\circ \\approx 1 + 2(0.017453) = 1.034907$. (True value $\\approx 1.03553$.) Over/under: $f''(x) = 2\\sec^2 x\\tan x$, and at/near $\\pi/4$ this is positive (concave up), so the tangent line lies below the curve — the estimate is an UNDERestimate, consistent with $1.0349 < 1.0355$."
            },
            {
              "prompt": "The period of a simple pendulum is $T = 2\\pi\\sqrt{L/g}$. If the length $L$ is measured with a relative error of $2\\%$ (and $g$ is exact), estimate the resulting relative error in the period $T$.",
              "hint": "Take logarithms before differentiating: $\\ln T = \\ln(2\\pi) + \\tfrac12\\ln L - \\tfrac12\\ln g$. The relative error in $T$ is $dT/T$.",
              "solution": "Write $T = 2\\pi g^{-1/2} L^{1/2}$, so $\\ln T = \\text{const} + \\tfrac12 \\ln L$. Differentiating: $\\frac{dT}{T} = \\tfrac12\\,\\frac{dL}{L}$. With $\\frac{dL}{L} = 0.02$: $\\frac{dT}{T} = \\tfrac12(0.02) = 0.01 = 1\\%$. Because $T \\propto L^{1/2}$, the relative error is halved (exponent $\\tfrac12$): a $2\\%$ length error gives a $1\\%$ period error."
            },
            {
              "prompt": "Evaluate $\\displaystyle\\lim_{x\\to 0^+} \\left(\\frac{1}{x} - \\frac{1}{\\sin x}\\right)$. Identify the indeterminate form and show each step.",
              "hint": "This is $\\infty - \\infty$. Combine over a common denominator to turn it into a $0/0$ quotient, then apply L'Hôpital (possibly twice). Watch the form at each stage.",
              "solution": "As $x\\to 0^+$ both terms blow up: form $\\infty - \\infty$. Combine: $\\frac{1}{x} - \\frac{1}{\\sin x} = \\frac{\\sin x - x}{x\\sin x}$. As $x\\to 0$: numerator $\\to 0$, denominator $\\to 0$, so it's $0/0$. Apply L'Hôpital: $\\frac{\\cos x - 1}{\\sin x + x\\cos x}$. Still $0/0$. Apply again: numerator derivative $-\\sin x$, denominator derivative $\\cos x + \\cos x - x\\sin x = 2\\cos x - x\\sin x$. So we get $\\frac{-\\sin x}{2\\cos x - x\\sin x}$. Now substitute $x=0$: $\\frac{-0}{2 - 0} = \\frac{0}{2} = 0$. Therefore the limit is $0$. (Sanity check via Taylor: $\\sin x - x \\approx -x^3/6$ and $x\\sin x \\approx x^2$, so the ratio $\\approx -x/6 \\to 0$.)"
            }
          ],
          "examples": [
            {
              "title": "Estimating a cube root with a linearization",
              "body": "Use a linear approximation to estimate $\\sqrt[3]{8.12}$ without a calculator. Then state how good the estimate is.",
              "solution": "Let $f(x) = \\sqrt[3]{x} = x^{1/3}$ and choose the nearby easy point $a = 8$, since $\\sqrt[3]{8} = 2$ exactly.\n\n<strong>Step 1 — Evaluate $f$ and $f'$ at $a$.</strong> We have $f(a) = f(8) = 8^{1/3} = 2$. The derivative is $f'(x) = \\frac{1}{3}x^{-2/3} = \\frac{1}{3\\sqrt[3]{x^2}}$, so\n$$f'(8) = \\frac{1}{3\\sqrt[3]{8^2}} = \\frac{1}{3\\cdot 4} = \\frac{1}{12}.$$\n\n<strong>Step 2 — Write the linearization.</strong> $$L(x) = f(a) + f'(a)(x-a) = 2 + \\tfrac{1}{12}(x - 8).$$\n\n<strong>Step 3 — Plug in $x = 8.12$.</strong> Here $x - a = 0.12$, so\n$$\\sqrt[3]{8.12} \\approx L(8.12) = 2 + \\frac{1}{12}(0.12) = 2 + 0.01 = 2.01.$$\n\n<strong>Step 4 — Check the quality.</strong> The true value is $\\sqrt[3]{8.12} \\approx 2.00995$, so the error is about $5 \\times 10^{-5}$ — excellent, because $0.12$ is small relative to $a = 8$ and the curve is nearly straight there.\n\n<strong>Answer:</strong> $\\sqrt[3]{8.12} \\approx 2.01$."
            },
            {
              "title": "Error propagation by differentials, plus a $0^0$ limit",
              "body": "Part (a): A sphere's radius is measured as $r = 10$ cm with a possible error of $dr = 0.05$ cm. Use differentials to estimate the resulting error in the computed volume $V = \\frac{4}{3}\\pi r^3$, and give the relative error. Part (b): Evaluate $\\lim_{x \\to 0^+} x^x$, a trickier indeterminate form, using L'Hôpital's rule.",
              "solution": "<strong>Part (a) — Differentials for error propagation.</strong>\nThe differential of $V = \\frac{4}{3}\\pi r^3$ is $dV = V'(r)\\,dr$. Differentiating, $V'(r) = 4\\pi r^2$ (this is just the surface area), so\n$$dV = 4\\pi r^2\\, dr.$$\nWith $r = 10$ and $dr = 0.05$:\n$$dV = 4\\pi (10)^2 (0.05) = 4\\pi (100)(0.05) = 20\\pi \\approx 62.8 \\text{ cm}^3.$$\nFor the relative error, divide by $V = \\frac{4}{3}\\pi r^3$:\n$$\\frac{dV}{V} = \\frac{4\\pi r^2\\,dr}{\\frac{4}{3}\\pi r^3} = \\frac{3\\,dr}{r} = \\frac{3(0.05)}{10} = 0.015 = 1.5\\%.$$\nNote the clean rule: a $0.5\\%$ error in radius ($dr/r = 0.005$) triples to a $1.5\\%$ error in volume, because $V \\propto r^3$.\n\n<strong>Part (b) — L'Hôpital on a $0^0$ form.</strong>\nDirect substitution gives $0^0$, which is indeterminate. Convert the power to a product using the logarithm: let $y = x^x$, so\n$$\\ln y = x \\ln x.$$\nNow find $\\lim_{x\\to 0^+} x\\ln x$, which is the $0 \\cdot (-\\infty)$ form. Rewrite it as a quotient to apply L'Hôpital:\n$$x \\ln x = \\frac{\\ln x}{1/x} \\quad (\\text{the } \\tfrac{-\\infty}{\\infty}\\text{ form}).$$\nDifferentiate top and bottom separately:\n$$\\lim_{x\\to 0^+} \\frac{\\ln x}{1/x} = \\lim_{x\\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x\\to 0^+} (-x) = 0.$$\nSo $\\lim_{x\\to 0^+} \\ln y = 0$. Since $y = e^{\\ln y}$ and $\\exp$ is continuous,\n$$\\lim_{x\\to 0^+} x^x = e^{0} = 1.$$\n\n<strong>Answers:</strong> (a) $dV = 20\\pi \\approx 62.8\\text{ cm}^3$, a relative error of $1.5\\%$. (b) $\\lim_{x\\to 0^+} x^x = 1$."
            },
            {
              "title": "Linear approximation: the tangent line as a calculator",
              "body": "Estimate $\\sqrt{4.1}$ without a calculator, using the linearization of $f(x) = \\sqrt{x}$ at $a = 4$.",
              "solution": "<strong>The tangent-line formula.</strong> Near $a$, a differentiable function is well approximated by its tangent line: $f(x) \\approx f(a) + f'(a)(x - a)$. For $f(x) = \\sqrt{x}$, $f'(x) = \\tfrac{1}{2\\sqrt{x}}$.\n<strong>Evaluate at $a = 4$.</strong> $f(4) = 2$ and $f'(4) = \\tfrac{1}{2\\cdot 2} = 0.25$, so the linearization is $L(x) = 2 + 0.25\\,(x - 4)$. Then\n$$\\sqrt{4.1} \\approx L(4.1) = 2 + 0.25(0.1) = 2.025.$$\nThe true value is $2.0248\\ldots$ — the estimate is off by under $0.0002$.\n<strong>Why it is so accurate.</strong> The error of a linear approximation is governed by the <em>second</em> derivative and shrinks like $(x - a)^2$: move only $0.1$ from the anchor and the squared term is $0.01$, scaled by a small curvature. Stay close to $a$ and the tangent line is nearly the curve.\n<strong>The aha.</strong> \"Differentiable\" means \"locally linear\" — zoom in far enough on any smooth curve and it looks straight. Linearization just uses that straight line as a stand-in, the same idea behind Newton's method, error propagation, and every \"small-signal\" approximation in science."
            }
          ]
        }
      ]
    },
    {
      "id": "c-integration",
      "title": "Integration: Antiderivatives & the Definite Integral",
      "lessons": [
        {
          "id": "c-antiderivatives",
          "title": "Antiderivatives & Indefinite Integrals",
          "minutes": 14,
          "content": "<h3>Running differentiation backwards</h3>\n<div data-viz=\"calc-ftc-accumulation\"></div>\n<p>Differentiation takes a function and tells you its instantaneous rate of change. The natural inverse question is: <em>given a rate of change, can we recover the original function?</em> That reverse operation is <strong>antidifferentiation</strong>, and it is the conceptual heart of integral calculus.</p>\n<p>Formally, a function $F$ is an <strong>antiderivative</strong> of $f$ on an interval $I$ if</p>\n$$F'(x) = f(x) \\quad \\text{for all } x \\in I.$$\n<p>For example, $F(x) = x^2$ is an antiderivative of $f(x) = 2x$, because $\\frac{d}{dx}x^2 = 2x$. So is $G(x) = x^2 + 7$, and so is $x^2 - \\sqrt{2}$. This is the crucial observation: antiderivatives are <strong>not unique</strong>. Any two of them differ by a constant.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>The derivative throws away constant information — the slope of a curve is unchanged if you slide the whole curve up or down. So when you reverse the process, you cannot recover <em>which</em> vertical shift you started from. That lost degree of freedom is exactly the $+C$.</p>\n</div>\n\n<h4>Why \"differ by a constant\" is a theorem, not a guess</h4>\n<p>Suppose $F$ and $G$ are both antiderivatives of $f$ on an interval. Let $H = F - G$. Then $H'(x) = F'(x) - G'(x) = f(x) - f(x) = 0$ everywhere on the interval. A function with zero derivative on an interval is constant — this follows from the Mean Value Theorem. Hence $H(x) = C$, so $G(x) = F(x) + C$. The \"interval\" hypothesis matters: on a disconnected domain like $\\mathbb{R}\\setminus\\{0\\}$ the constant can be different on each piece.</p>\n\n<h3>The indefinite integral and $+C$</h3>\n<p>We write the family of all antiderivatives of $f$ using the integral sign:</p>\n$$\\int f(x)\\,dx = F(x) + C, \\quad \\text{where } F'(x) = f(x).$$\n<p>Read it as \"the indefinite integral of $f$ with respect to $x$.\" A few notational points worth internalizing:</p>\n<ul>\n<li>The $\\int$ symbol is an elongated \"S\" (for <em>sum</em>) — a historical hint that integrals are built from summation, which the definite integral will make precise.</li>\n<li>The <code>dx</code> is not decoration. It names the variable of integration and, later, behaves like an infinitesimal width that you can manipulate algebraically (as in substitution). It also disambiguates: $\\int x t\\,dx = \\tfrac{1}{2}x^2 t + C$ treats $t$ as constant, while $\\int x t\\,dt = \\tfrac{1}{2}x t^2 + C$ treats $x$ as constant.</li>\n<li>The $+C$, the <strong>constant of integration</strong>, is mandatory. An indefinite integral denotes an entire <em>family</em> of functions, one for each value of $C$. Dropping it is the single most common error in this topic.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Indefinite vs. definite</div>\n<p>An <strong>indefinite</strong> integral $\\int f\\,dx$ is a <em>function</em> (a family of them). A <strong>definite</strong> integral $\\int_a^b f\\,dx$ is a <em>number</em>. The Fundamental Theorem of Calculus links them: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ for any antiderivative $F$ — and the $+C$ cancels in the subtraction, which is why it never appears in a definite answer.</p>\n</div>\n\n<h3>The core formulas (each one is a derivative rule read in reverse)</h3>\n<p>Every integration formula below is just a differentiation fact you already know, stated backwards. The discipline that makes this topic easy is: <strong>to check any antiderivative, differentiate it.</strong> If you get the integrand back, you are correct — no exceptions.</p>\n\n<h4>Power rule for integrals</h4>\n$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1).$$\n<p>The recipe is \"raise the exponent by one, divide by the new exponent.\" Verify by differentiating the right side: $\\frac{d}{dx}\\frac{x^{n+1}}{n+1} = \\frac{(n+1)x^{n}}{n+1} = x^n$. The exclusion $n \\neq -1$ is not arbitrary — at $n=-1$ the new exponent is $0$ and you would divide by zero. That single missing case is handled separately and gives the logarithm.</p>\n\n<h4>The exception: $1/x$</h4>\n$$\\int \\frac{1}{x}\\,dx = \\ln|x| + C.$$\n<p>The absolute value matters. For $x>0$, $\\frac{d}{dx}\\ln x = \\frac{1}{x}$. For $x<0$, $\\frac{d}{dx}\\ln(-x) = \\frac{-1}{-x} = \\frac{1}{x}$ by the chain rule. Writing $\\ln|x|$ captures both branches in one expression, so the formula is valid on any interval not containing $0$.</p>\n\n<h4>Exponentials</h4>\n$$\\int e^x\\,dx = e^x + C, \\qquad \\int a^x\\,dx = \\frac{a^x}{\\ln a} + C \\quad (a>0,\\ a\\neq 1).$$\n<p>The first is the famous fixed point of differentiation: $e^x$ is its own derivative, so it is its own antiderivative (up to $+C$). The second follows because $\\frac{d}{dx}a^x = a^x\\ln a$, so we must divide by $\\ln a$ to compensate.</p>\n\n<h4>Trigonometric</h4>\n$$\\int \\cos x\\,dx = \\sin x + C, \\qquad \\int \\sin x\\,dx = -\\cos x + C,$$\n$$\\int \\sec^2 x\\,dx = \\tan x + C, \\qquad \\int \\sec x\\tan x\\,dx = \\sec x + C.$$\n<p>The sign flip in $\\int \\sin x\\,dx = -\\cos x + C$ trips people up. Reason it out: $\\frac{d}{dx}\\cos x = -\\sin x$, so to get $+\\sin x$ as the integrand we need an extra minus sign out front. Always verify by differentiating: $\\frac{d}{dx}(-\\cos x) = \\sin x$. Correct.</p>\n\n<h4>Two algebraic rules that make everything composable</h4>\n<p>Integration is <strong>linear</strong>, mirroring the linearity of the derivative:</p>\n$$\\int \\big(\\alpha f(x) + \\beta g(x)\\big)\\,dx = \\alpha\\int f(x)\\,dx + \\beta\\int g(x)\\,dx.$$\n<p>Constants pull out and sums split. There is <strong>no product rule or quotient rule for integrals</strong> — those reverse into the more advanced techniques of integration by parts and partial fractions. Many integrals of elementary functions (e.g. $\\int e^{-x^2}\\,dx$) have no elementary antiderivative at all, which is a sharp contrast with differentiation where every elementary function has an elementary derivative.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Connection to ML</div>\n<p>Antiderivatives are how you move from a <em>density</em> to a <em>cumulative</em> quantity. In machine learning the probability density $p(x)$ and the cumulative distribution function $F(x) = \\int_{-\\infty}^{x} p(t)\\,dt$ are an antiderivative pair: $F' = p$. Normalizing a distribution, computing expectations, deriving the softmax's relationship to the log-partition function, and the reparameterization trick all rest on this density-to-cumulative inversion. And the constant of integration reappears as the <em>normalization constant</em> $Z$ — the thing you must fix so probabilities sum to one. Recovering a function from its rate of change is also literally what an ODE solver does at every step of a neural ODE or a diffusion model's sampling chain.</p>\n</div>\n\n<h3>Initial-value problems: pinning down $C$</h3>\n<p>The $+C$ is a free parameter, so an indefinite integral describes infinitely many curves — a whole vertical stack of parallel graphs. In applications we usually know <em>one</em> point the true curve passes through. That single fact is an <strong>initial condition</strong>, and it selects exactly one member of the family. The combination of a derivative equation plus an initial condition is an <strong>initial-value problem (IVP)</strong>.</p>\n<p>The workflow is always the same:</p>\n<ol>\n<li>Integrate to get the general antiderivative <em>with</em> $+C$.</li>\n<li>Substitute the known point to form an equation in $C$.</li>\n<li>Solve for $C$ and write the particular solution.</li>\n</ol>\n\n<h4>Worked example (IVP)</h4>\n<p>A particle moves so that its velocity is $v(t) = 3t^2 - 4\\sin t + \\dfrac{1}{t}$ for $t>0$, and its position at $t=1$ is $s(1) = 5$. Find the position function $s(t)$.</p>\n<p><strong>Step 1 — integrate term by term</strong> using linearity, the power rule, the sine rule, and the $1/x$ rule:</p>\n$$s(t) = \\int \\Big(3t^2 - 4\\sin t + \\tfrac{1}{t}\\Big)\\,dt = 3\\cdot\\frac{t^3}{3} - 4(-\\cos t) + \\ln|t| + C = t^3 + 4\\cos t + \\ln t + C.$$\n<p>(We can drop the absolute value since $t>0$.)</p>\n<p><strong>Step 2 — apply the initial condition</strong> $s(1)=5$:</p>\n$$5 = (1)^3 + 4\\cos 1 + \\ln 1 + C = 1 + 4\\cos 1 + 0 + C.$$\n<p><strong>Step 3 — solve for $C$:</strong></p>\n$$C = 4 - 4\\cos 1.$$\n<p>So the particular solution is</p>\n$$s(t) = t^3 + 4\\cos t + \\ln t + 4 - 4\\cos 1.$$\n<p><strong>Verify:</strong> differentiate — $s'(t) = 3t^2 - 4\\sin t + \\tfrac{1}{t} = v(t)$, and $s(1) = 1 + 4\\cos 1 + 0 + 4 - 4\\cos 1 = 5$. Both conditions hold.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of integration as building a function whose <em>shape</em> (every slope) is dictated by the integrand, while the initial condition fixes its <em>height</em>. Shape from the integral, height from the data. This is exactly the picture behind solving differential equations: the equation constrains the dynamics, the initial state pins down the trajectory.</p>\n</div>\n\n<h3>The dictionary: each derivative rule and its integral mirror</h3>\n<p>Hold the two columns side by side. Reading left to right is differentiation; reading right to left is integration. Internalizing this table <em>as a mirror</em> rather than as two separate lists is the single biggest leverage point in this lesson.</p>\n<ul>\n<li>$\\dfrac{d}{dx}x^{n+1} = (n+1)x^n \\;\\;\\Longleftrightarrow\\;\\; \\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$</li>\n<li>$\\dfrac{d}{dx}\\ln|x| = \\dfrac{1}{x} \\;\\;\\Longleftrightarrow\\;\\; \\int \\dfrac{1}{x}\\,dx = \\ln|x|+C$</li>\n<li>$\\dfrac{d}{dx}e^x = e^x \\;\\;\\Longleftrightarrow\\;\\; \\int e^x\\,dx = e^x+C$</li>\n<li>$\\dfrac{d}{dx}\\sin x = \\cos x \\;\\;\\Longleftrightarrow\\;\\; \\int \\cos x\\,dx = \\sin x+C$</li>\n<li>$\\dfrac{d}{dx}\\cos x = -\\sin x \\;\\;\\Longleftrightarrow\\;\\; \\int \\sin x\\,dx = -\\cos x+C$</li>\n<li>$\\dfrac{d}{dx}\\tan x = \\sec^2 x \\;\\;\\Longleftrightarrow\\;\\; \\int \\sec^2 x\\,dx = \\tan x+C$</li>\n</ul>\n\n<h3>Takeaways</h3>\n<ul>\n<li>An antiderivative reverses differentiation; the full set of them is the indefinite integral, written $\\int f\\,dx = F(x)+C$.</li>\n<li>On an interval, any two antiderivatives differ by a constant — that is the meaning of $+C$, and it is provably (via the MVT) the only freedom you have.</li>\n<li>Memorize the core formulas as <em>reversed</em> derivative rules, and always check an answer by differentiating it.</li>\n<li>The power rule excludes $n=-1$; that lone gap is filled by $\\ln|x|$.</li>\n<li>An initial condition collapses the family to one curve — the engine behind every initial-value problem and, more broadly, behind recovering a function from its rate of change.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the +C, and why integration is harder than differentiation</summary>\n<p>Differentiation has a unique answer: every function has exactly one derivative. Antidifferentiation does <em>not</em> — and that asymmetry is the <b>+C</b>. Because $\\frac{d}{dx}(C) = 0$ for any constant, $F(x)$ and $F(x) + 5$ and $F(x) - 100$ share the <em>same</em> derivative, so all are valid antiderivatives of $f$.</p>\n<p>So the indefinite integral $\\int f(x)\\,dx = F(x) + C$ isn't one curve — it's a <b>whole family</b> of parallel curves, each a vertical shift of the others. The constant is pinned down only by extra information: an <b>initial condition</b> like $F(0) = 2$ picks out the single curve through that point.</p>\n<p>The \"aha\": differentiation throws constants away (their slope is zero), so antidifferentiation can't recover them — hence the $+C$. It's also why integration is genuinely harder: a derivative is a mechanical rule, but recovering a function from its rate means recognizing \"what was this the derivative of?\", and even then only up to a constant.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: substitution, the reverse chain rule</summary>\n<p>Differentiation has the chain rule; integration's mirror image is <b>u-substitution</b> — the single most useful technique for undoing it.</p>\n<p><b>The pattern.</b> The chain rule says $\\dfrac{d}{dx}F(g(x)) = F'(g(x))\\,g'(x)$ — it leaves behind an extra $g'(x)$ factor. So when an integrand <em>contains</em> an inner function and (a multiple of) its derivative, you run the chain rule backward: $\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du$ with $u = g(x)$, $du = g'(x)\\,dx$.</p>\n<p><b>Example.</b> $\\int 2x\\cos(x^2)\\,dx$: let $u = x^2$, so $du = 2x\\,dx$, and it collapses to $\\int \\cos u\\,du = \\sin u + C = \\sin(x^2) + C$. Check by differentiating: $\\dfrac{d}{dx}\\sin(x^2) = \\cos(x^2)\\cdot 2x$. ✓</p>\n<p>The \"aha\": substitution is \"spot the inner function whose derivative is also present, and absorb it.\" Because the chain rule <em>creates</em> that $g'$ factor going forward, integration's main job is recognizing it going backward — which is also <em>why</em> integration is harder: there is no guaranteed pattern to spot, unlike differentiation's mechanical rules.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: most functions have no elementary antiderivative</summary>\n<p>Differentiation is mechanical — every elementary function has an elementary derivative. Integration is not: <strong>most functions have no antiderivative expressible in elementary terms</strong>, no matter how clever you are.</p>\n<p><b>The famous examples.</b> $\\int e^{-x^2}\\,dx$ (the Gaussian, the backbone of statistics), $\\int \\tfrac{\\sin x}{x}\\,dx$, $\\int \\tfrac{1}{\\ln x}\\,dx$, $\\int \\sqrt{1+x^3}\\,dx$ — none can be written with the usual functions (polynomials, exp, log, trig, roots). This is not a failure of technique; it is a <em>theorem</em> (Liouville's), as provable as the irrationality of $\\sqrt 2$.</p>\n<p><b>What we do instead.</b> Three responses: (1) <em>define a new function</em> — the Gaussian integral is named <em>erf</em> (the error function), tabulated and built into libraries; (2) <em>numerical integration</em> — approximate the definite integral directly with Riemann sums, Simpson's rule, or Gaussian quadrature (no antiderivative needed); (3) <em>series</em> — integrate the Taylor series term by term. This is exactly why definite integrals are so often computed numerically rather than symbolically.</p>\n<p>The \"aha\": \"find the antiderivative\" usually has <em>no</em> elementary answer — even $\\int e^{-x^2}\\,dx$ does not — so much of practical calculus is numerical (Simpson, quadrature) or names a new function (erf). Integration being genuinely harder than differentiation is not your weakness; it is a proven fact.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What is $\\int \\sin x\\,dx$?",
              "choices": [
                "$-\\cos x + C$",
                "$\\cos x + C$",
                "$-\\sin x + C$",
                "$\\sec^2 x + C$"
              ],
              "answer": 0,
              "explain": "Since $\\frac{d}{dx}\\cos x = -\\sin x$, we need a leading minus sign so that differentiating $-\\cos x$ returns $+\\sin x$. The common error is forgetting the sign flip."
            },
            {
              "q": "Why does the power rule $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C$ require $n \\neq -1$?",
              "choices": [
                "Because $x^{-1}$ is not a polynomial",
                "Because at $n=-1$ the formula divides by $n+1 = 0$; that case integrates to $\\ln|x|+C$ instead",
                "Because negative exponents have no antiderivative",
                "Because $x^{-1}$ is discontinuous everywhere"
              ],
              "answer": 1,
              "explain": "At $n=-1$ the new exponent is $0$ and you would divide by zero. That single excluded case is exactly $\\int \\frac{1}{x}\\,dx = \\ln|x|+C$."
            },
            {
              "q": "A function satisfies $f'(x) = 6x^2$ and $f(1) = 10$. What is $f(x)$?",
              "choices": [
                "$2x^3 + 10$",
                "$2x^3 + 8$",
                "$12x + C$",
                "$2x^3 + C$ (cannot determine further)"
              ],
              "answer": 1,
              "explain": "Integrating gives $f(x)=2x^3+C$; then $f(1)=2+C=10$ forces $C=8$, so $f(x)=2x^3+8$. The initial condition determines $C$ uniquely."
            },
            {
              "q": "Which statement about $\\int_a^b f(x)\\,dx$ versus $\\int f(x)\\,dx$ is correct?",
              "choices": [
                "Both are families of functions and both carry a $+C$",
                "Neither requires an antiderivative to evaluate",
                "The definite integral is a family of functions; the indefinite integral is a number",
                "The definite integral is a number and the $+C$ cancels via $F(b)-F(a)$; the indefinite integral is a family of functions"
              ],
              "answer": 3,
              "explain": "$\\int_a^b f\\,dx = F(b)-F(a)$ is a single number and the constant cancels in the subtraction, whereas $\\int f\\,dx = F(x)+C$ denotes an entire family of antiderivatives."
            },
            {
              "q": "On an interval $I$, suppose $F$ and $G$ are both antiderivatives of the same function $f$. Which fact guarantees that $F(x) - G(x)$ must be constant?",
              "choices": [
                "The product rule applied to $F$ and $G$",
                "A function whose derivative is zero on an interval is constant (a consequence of the Mean Value Theorem)",
                "The fact that $f$ is continuous on $I$",
                "The chain rule applied to $F \\circ G$"
              ],
              "answer": 1,
              "explain": "Since $(F-G)' = f - f = 0$ on $I$, the MVT corollary forces $F-G$ to be constant."
            },
            {
              "q": "What is $\\int x t\\,dt$?",
              "choices": [
                "$\\tfrac{1}{2} x^2 t^2 + C$",
                "$\\tfrac{1}{2} x^2 t + C$",
                "$x t + C$",
                "$\\tfrac{1}{2} x t^2 + C$"
              ],
              "answer": 3,
              "explain": "The $dt$ marks $t$ as the variable of integration, so $x$ is held constant and $\\int t\\,dt = \\tfrac12 t^2$ gives $\\tfrac{1}{2} x t^2 + C$."
            },
            {
              "q": "Why does the proof that two antiderivatives differ by a single constant require the domain to be an interval (connected)?",
              "choices": [
                "On a disconnected domain like $\\mathbb{R}\\setminus\\{0\\}$, the difference can take a different constant value on each piece",
                "Disconnected domains make the derivative undefined",
                "The integral sign only applies to connected sets",
                "On a disconnected domain the antiderivative fails to exist at all"
              ],
              "answer": 0,
              "explain": "The 'zero derivative implies constant' result holds piece by piece, so across separated pieces the constant need not match."
            },
            {
              "q": "A student computes $\\int 2x\\,dx$ and writes the answer as just $x^2$. What is wrong with this answer?",
              "choices": [
                "Nothing is wrong; $x^2$ is the complete and correct answer",
                "It omits the $+C$, so it names a single function rather than the whole family of antiderivatives",
                "The derivative of $x^2$ is not $2x$, so the antiderivative is incorrect",
                "An indefinite integral should evaluate to a number, not a function"
              ],
              "answer": 1,
              "explain": "An indefinite integral denotes the entire family of antiderivatives, so the mandatory $+C$ must be included."
            },
            {
              "q": "Which of the following is the most general antiderivative of $f(x) = e^{2x}$?",
              "choices": [
                "$\\frac{1}{2}e^{2x} + C$",
                "$2e^{2x} + C$",
                "$e^{2x} + C$",
                "$\\frac{1}{3}e^{3x} + C$"
              ],
              "answer": 0,
              "explain": "Since $\\frac{d}{dx}\\left(\\frac{1}{2}e^{2x}\\right) = \\frac{1}{2}\\cdot 2 e^{2x} = e^{2x}$, the antiderivative is $\\frac{1}{2}e^{2x}+C$. The tempting answer $2e^{2x}+C$ reverses the chain-rule factor instead of dividing by it."
            },
            {
              "q": "A student claims that since both $F(x)=\\tan^2 x$ and $G(x)=\\sec^2 x$ have the same derivative, the theorem says they must differ by a constant. Is this reasoning sound?",
              "choices": [
                "No, because $\\tan^2 x$ and $\\sec^2 x$ have different derivatives",
                "Yes, but the constant they differ by is $0$",
                "No, because the theorem only applies to polynomial functions",
                "Yes, and indeed $\\sec^2 x - \\tan^2 x = 1$, a constant, consistent with the theorem"
              ],
              "answer": 3,
              "explain": "Both have derivative $2\\sec^2 x\\tan x$, so the theorem guarantees a constant difference; the identity $\\sec^2 x - \\tan^2 x = 1$ confirms it. The constant is $1$, not $0$."
            },
            {
              "q": "Suppose $f'(x) = \\frac{1}{x}$ on the domain $(-\\infty,0)\\cup(0,\\infty)$, and you know $f(1)=0$ and $f(-1)=5$. What does this reveal?",
              "choices": [
                "The antiderivative is forced to be $\\ln|x|$ everywhere, contradicting the data",
                "The two conditions are inconsistent, so no such $f$ exists",
                "The domain is two separate intervals, so $f$ can use a different constant on each piece",
                "$f$ cannot exist because $1/x$ has no antiderivative"
              ],
              "answer": 2,
              "explain": "The 'differ by a constant' theorem requires a connected interval; on a disconnected domain each piece carries its own independent constant, so $f(x)=\\ln|x|$ on the positive side and $\\ln|x|+5$ on the negative side is perfectly valid. Antiderivatives of $1/x$ certainly exist on each interval."
            },
            {
              "q": "If $g'(x) = 3x^2 - 4x + 1$ and the graph of $g$ passes through the origin, what is $g(x)$?",
              "choices": [
                "$6x - 4$",
                "$x^3 - 2x^2 + x + C$",
                "$x^3 - 2x^2 + x$",
                "$x^3 - 4x^2 + x$"
              ],
              "answer": 2,
              "explain": "Antidifferentiating gives $x^3 - 2x^2 + x + C$, and passing through the origin means $g(0)=0$, which forces $C=0$. Leaving $+C$ in the final answer (third option) ignores the initial condition that pins down the unique solution."
            },
            {
              "q": "What is $\\int x^n\\,dx$ for $n \\neq -1$?",
              "choices": [
                "$\\dfrac{x^{n-1}}{n-1} + C$",
                "$n\\,x^{n-1} + C$",
                "$\\dfrac{x^{n+1}}{n+1} + C$",
                "$x^{n+1} + C$"
              ],
              "answer": 2,
              "explain": "Reverse the power rule: raise the exponent by one and divide by the new exponent, $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$. Check by differentiating: $\\frac{d}{dx}\\frac{x^{n+1}}{n+1} = x^n$. The case $n=-1$ is excluded (it would divide by zero); there $\\int x^{-1}\\,dx = \\ln|x|+C$."
            },
            {
              "q": "An antiderivative $F$ of a function $f$ is a function satisfying:",
              "choices": [
                "$F'(x) = f(x)$",
                "$F(x) = f'(x)$",
                "$F''(x) = f(x)$",
                "$F(x) = f(x) + C$"
              ],
              "answer": 0,
              "explain": "Antidifferentiation reverses differentiation: $F$ is an antiderivative of $f$ exactly when $F'(x)=f(x)$. Since the derivative of a constant is $0$, any two antiderivatives differ only by a constant — hence the $+C$ in $\\int f\\,dx = F(x)+C$."
            },
            {
              "q": "What is $\\int \\cos x\\,dx$?",
              "choices": [
                "$-\\sin x + C$",
                "$\\cos x + C$",
                "$\\sin x + C$",
                "$-\\cos x + C$"
              ],
              "answer": 2,
              "explain": "Since $\\frac{d}{dx}\\sin x = \\cos x$, the antiderivative of $\\cos x$ is $\\sin x + C$. (Contrast $\\int \\sin x\\,dx = -\\cos x + C$, because $\\frac{d}{dx}(-\\cos x) = \\sin x$ — the sign flips.)"
            },
            {
              "q": "What is $\\int \\dfrac{1}{x}\\,dx$?",
              "choices": [
                "$-\\dfrac{1}{x^2} + C$",
                "$\\ln(x^2) + C$",
                "$\\dfrac{x^{0}}{0} + C$",
                "$\\ln|x| + C$"
              ],
              "answer": 3,
              "explain": "This is the $n=-1$ case the power rule can't handle (it would divide by zero). Since $\\frac{d}{dx}\\ln|x| = \\frac1x$, we get $\\int \\frac1x\\,dx = \\ln|x| + C$. The absolute value matters — it makes the antiderivative valid for negative $x$ too."
            }
          ],
          "flashcards": [
            {
              "front": "Definition: $F$ is an antiderivative of $f$ on an interval $I$ when ___?",
              "back": "$F'(x) = f(x)$ for all $x \\in I$. Antiderivatives are not unique: any two differ by a constant (provable via the Mean Value Theorem)."
            },
            {
              "front": "Power rule for integrals",
              "back": "$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ for $n \\neq -1$. (Raise exponent by 1, divide by the new exponent.)"
            },
            {
              "front": "$\\int \\frac{1}{x}\\,dx = ?$ (the $n=-1$ case)",
              "back": "$\\ln|x| + C$. The absolute value covers both $x>0$ and $x<0$."
            },
            {
              "front": "Integrals of $\\sin x$, $\\cos x$, $e^x$",
              "back": "$\\int \\sin x\\,dx = -\\cos x + C$; $\\;\\int \\cos x\\,dx = \\sin x + C$; $\\;\\int e^x\\,dx = e^x + C$. Note the sign flip on $\\sin$."
            },
            {
              "front": "How do you find the constant $C$ in an initial-value problem?",
              "back": "Integrate to get the general antiderivative with $+C$, substitute the given point (initial condition) to form an equation in $C$, then solve for $C$ to get the particular solution."
            },
            {
              "front": "Foolproof way to check any antiderivative",
              "back": "Differentiate your answer. If you recover the original integrand, it is correct — always works, no exceptions."
            }
          ],
          "homework": [
            {
              "prompt": "Find $\\int \\left(4x^3 - \\frac{2}{x} + 5e^x - \\sec^2 x\\right) dx$.",
              "hint": "Use linearity to integrate each term separately. Remember the $1/x$ term uses $\\ln|x|$ (not the power rule), and watch the sign on $\\sec^2 x$.",
              "solution": "Apply the rules term by term: $\\int 4x^3\\,dx = x^4$; $\\int \\frac{-2}{x}\\,dx = -2\\ln|x|$; $\\int 5e^x\\,dx = 5e^x$; $\\int -\\sec^2 x\\,dx = -\\tan x$. Combining with a single constant: $$x^4 - 2\\ln|x| + 5e^x - \\tan x + C.$$ Check by differentiating: $4x^3 - \\frac{2}{x} + 5e^x - \\sec^2 x$, which is the integrand."
            },
            {
              "prompt": "Solve the initial-value problem: $f'(x) = \\cos x + \\frac{1}{x}$ with $f(1) = 2$, for $x>0$.",
              "hint": "Integrate to get the general solution with $+C$, then plug in $x=1$. Recall $\\sin 1$ and $\\ln 1$ as exact values where possible.",
              "solution": "Integrate: $f(x) = \\sin x + \\ln|x| + C$. For $x>0$ this is $f(x)=\\sin x + \\ln x + C$. Apply $f(1)=2$: $2 = \\sin 1 + \\ln 1 + C = \\sin 1 + 0 + C$, so $C = 2 - \\sin 1$. The particular solution is $$f(x) = \\sin x + \\ln x + 2 - \\sin 1.$$ Verify: $f'(x) = \\cos x + \\frac{1}{x}$ and $f(1) = \\sin 1 + 0 + 2 - \\sin 1 = 2$."
            },
            {
              "prompt": "An object has acceleration $a(t) = 6t$ (constant gravity-like forcing scaled), with initial velocity $v(0) = 4$ and initial position $s(0) = 1$. Find the position function $s(t)$. (This is a two-stage IVP.)",
              "hint": "Integrate acceleration once to get velocity (introduces $C_1$, fixed by $v(0)$), then integrate velocity to get position (introduces $C_2$, fixed by $s(0)$).",
              "solution": "Stage 1: $v(t) = \\int 6t\\,dt = 3t^2 + C_1$. Use $v(0)=4$: $4 = 0 + C_1$, so $C_1 = 4$ and $v(t) = 3t^2 + 4$. Stage 2: $s(t) = \\int (3t^2 + 4)\\,dt = t^3 + 4t + C_2$. Use $s(0)=1$: $1 = 0 + 0 + C_2$, so $C_2 = 1$. Therefore $$s(t) = t^3 + 4t + 1.$$ Check: $s'(t) = 3t^2 + 4 = v(t)$, $s''(t) = 6t = a(t)$, $v(0)=4$, $s(0)=1$. All conditions hold."
            }
          ],
          "examples": [
            {
              "title": "Antidifferentiating a polynomial term by term",
              "body": "Find the most general antiderivative of $f(x) = 6x^2 - 4x + 5$. Then verify your answer by differentiating it.",
              "solution": "We reverse the power rule on each term. The power rule for antiderivatives says $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$ (for $n \\neq -1$): raise the exponent by one, then divide by the new exponent.\n\n<strong>Term $6x^2$:</strong> raise $2 \\to 3$ and divide by $3$: $6 \\cdot \\frac{x^3}{3} = 2x^3$.\n\n<strong>Term $-4x$:</strong> here $x = x^1$, so raise $1 \\to 2$ and divide by $2$: $-4 \\cdot \\frac{x^2}{2} = -2x^2$.\n\n<strong>Term $5$:</strong> since $5 = 5x^0$, raise $0 \\to 1$ and divide by $1$: $5 \\cdot \\frac{x^1}{1} = 5x$.\n\nAdding the pieces and including the constant of integration (because antiderivatives are unique only up to a constant):\n$$F(x) = 2x^3 - 2x^2 + 5x + C.$$\n\n<strong>Verify by differentiating:</strong>\n$$F'(x) = 6x^2 - 4x + 5 + 0 = f(x).\\ \\checkmark$$\n\nThe $+C$ differentiates to $0$, which is exactly why it doesn't change the check — and exactly why we must include it.\n\n$$\\boxed{\\,\\int (6x^2 - 4x + 5)\\,dx = 2x^3 - 2x^2 + 5x + C\\,}$$"
            },
            {
              "title": "Pinning down +C with an initial condition",
              "body": "A particle's velocity is $f'(x) = 3\\sqrt{x} + \\dfrac{1}{x^2}$ for $x > 0$, and we know $f(1) = 2$. Find the specific function $f(x)$.",
              "solution": "First find the *general* antiderivative, then use the condition $f(1) = 2$ to solve for $C$.\n\n<strong>Rewrite using exponents</strong> so the power rule applies cleanly:\n$$f'(x) = 3x^{1/2} + x^{-2}.$$\n\n<strong>Antidifferentiate term by term</strong> with $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$:\n\n- $3x^{1/2}$: raise $\\tfrac12 \\to \\tfrac32$, divide by $\\tfrac32$ (i.e. multiply by $\\tfrac23$): $3 \\cdot \\frac{x^{3/2}}{3/2} = 3 \\cdot \\frac{2}{3} x^{3/2} = 2x^{3/2}$.\n- $x^{-2}$: raise $-2 \\to -1$, divide by $-1$: $\\frac{x^{-1}}{-1} = -\\frac{1}{x}$.\n\nSo the general antiderivative is\n$$f(x) = 2x^{3/2} - \\frac{1}{x} + C.$$\n\n<strong>Apply the initial condition</strong> $f(1) = 2$. Substitute $x = 1$ (note $1^{3/2} = 1$ and $\\frac{1}{1} = 1$):\n$$2(1) - \\frac{1}{1} + C = 2 \\;\\Longrightarrow\\; 2 - 1 + C = 2 \\;\\Longrightarrow\\; C = 1.$$\n\nThe initial condition selected one curve out of the whole vertical family. The result:\n$$\\boxed{\\,f(x) = 2x^{3/2} - \\frac{1}{x} + 1\\,}$$\n\n<strong>Sanity check:</strong> $f'(x) = 2 \\cdot \\tfrac32 x^{1/2} - (-1)x^{-2} = 3x^{1/2} + x^{-2} = 3\\sqrt{x} + \\frac{1}{x^2}$, and $f(1) = 2 - 1 + 1 = 2$. Both conditions hold. $\\checkmark$"
            },
            {
              "title": "The power rule's one exception: n = −1",
              "body": "The antiderivative power rule is $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C$. Why does it fail for $n = -1$, and what is $\\int \\frac{1}{x}\\,dx$ instead?",
              "solution": "<strong>The formula breaks.</strong> Plugging $n = -1$ into $\\frac{x^{n+1}}{n+1}$ gives $\\frac{x^{0}}{0}$ — division by zero. The rule simply does not apply, because raising the exponent by one lands on $x^0$, whose antiderivative is not a power.\n<strong>The real answer.</strong> Instead recall a known derivative: $\\frac{d}{dx}\\ln|x| = \\frac{1}{x}$. So\n$$\\int \\frac{1}{x}\\,dx = \\ln|x| + C.$$\nThe absolute value lets it cover $x \\lt 0$ as well as $x \\gt 0$.\n<strong>Check the others.</strong> For $n = 3$: $\\int x^3\\,dx = \\frac{x^4}{4} + C$ (since $n+1 = 4 \\ne 0$); differentiate back and you recover $x^3$. The power rule works for every real $n$ <em>except</em> $-1$.\n<strong>The aha.</strong> The exception is not arbitrary — it is exactly where the formula would divide by zero, and it is filled by the logarithm. That single gap is why $\\ln$ appears throughout calculus: it is the missing antiderivative of $1/x$."
            }
          ]
        },
        {
          "id": "c-definite-integral-riemann",
          "title": "Riemann Sums & the Definite Integral",
          "minutes": 16,
          "content": "<h3>From \"area under a curve\" to a precise number</h3>\n<p>You already know how to find the area of a rectangle, a triangle, a circle. But what is the area of the region trapped between the curve $y = f(x)$, the $x$-axis, and the vertical lines $x = a$ and $x = b$? For a curvy boundary, no elementary formula applies. The genius move — due in spirit to Archimedes and made rigorous in the 19th century by Bernhard Riemann — is to <em>approximate</em> the region with shapes we <em>can</em> measure (rectangles), and then take a limit as those rectangles get infinitely thin. The number that limit converges to is the <strong>definite integral</strong>.</p>\n<p>This single idea — chop a hard quantity into many tiny pieces, sum them, take a limit — is one of the most reusable patterns in all of quantitative work. It is how we compute total distance from a velocity curve, total cost from a marginal-cost curve, total probability from a density, and total loss accumulated over a training run. Master the mechanics of Riemann sums and you have a mental model that pays off far beyond calculus.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>An integral is just a very organized, infinitely fine sum. The integral sign $\\int$ is literally a stretched-out \"S\" for <em>sum</em>. Whenever you see $\\int f(x)\\,dx$, read it as \"add up $f(x)$ times a tiny width $dx$, across the whole interval.\"</p>\n</div>\n\n<h3>The partition and the Riemann sum</h3>\n<p>Fix an interval $[a, b]$ and a function $f$ defined on it. We carve $[a,b]$ into $n$ subintervals using a <strong>partition</strong> — a set of points</p>\n$$a = x_0 < x_1 < x_2 < \\cdots < x_n = b.$$\n<p>The $i$-th subinterval is $[x_{i-1}, x_i]$ and has width $\\Delta x_i = x_i - x_{i-1}$. For the common case of a <strong>regular partition</strong>, every subinterval has the same width</p>\n$$\\Delta x = \\frac{b - a}{n}, \\qquad x_i = a + i\\,\\Delta x.$$\n<p>On each subinterval we pick a <strong>sample point</strong> $x_i^* \\in [x_{i-1}, x_i]$, build a rectangle of height $f(x_i^*)$ and width $\\Delta x_i$, and add up the rectangle areas. That sum is a <strong>Riemann sum</strong>:</p>\n$$S_n = \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x_i.$$\n<p>Each term $f(x_i^*)\\,\\Delta x_i$ is \"height times width\" — a rectangle's signed area. The whole sum is our staircase approximation to the region under the curve.</p>\n\n<h4>Three standard choices of sample point</h4>\n<p>The freedom in choosing $x_i^*$ gives three named rules (assume a regular partition):</p>\n<ul>\n<li><strong>Left Riemann sum:</strong> take the left endpoint, $x_i^* = x_{i-1} = a + (i-1)\\Delta x$.\n$$L_n = \\sum_{i=1}^{n} f\\big(a + (i-1)\\Delta x\\big)\\,\\Delta x.$$</li>\n<li><strong>Right Riemann sum:</strong> take the right endpoint, $x_i^* = x_i = a + i\\,\\Delta x$.\n$$R_n = \\sum_{i=1}^{n} f\\big(a + i\\,\\Delta x\\big)\\,\\Delta x.$$</li>\n<li><strong>Midpoint Riemann sum:</strong> take the center, $x_i^* = a + \\big(i - \\tfrac{1}{2}\\big)\\Delta x$.\n$$M_n = \\sum_{i=1}^{n} f\\!\\left(a + \\big(i - \\tfrac{1}{2}\\big)\\Delta x\\right)\\Delta x.$$</li>\n</ul>\n<p>A useful sanity check: for an <em>increasing</em> function, the left sum underestimates and the right sum overestimates the true area (the rectangles sit below or poke above the curve). For a <em>decreasing</em> function the roles flip. The midpoint rule is usually far more accurate than either, because its over- and under-shoots tend to cancel on each subinterval.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>This left/right/midpoint distinction is exactly the difference between numerical integration schemes you meet later (trapezoidal, Simpson, Gauss quadrature) — and it is the same flavor of choice as <em>where to evaluate</em> in finite-difference gradient estimates. Midpoint/central evaluation cancels first-order error; that is why central differences ($\\frac{f(x+h)-f(x-h)}{2h}$) beat forward differences for numerical gradients.</p>\n</div>\n\n<div data-viz=\"calc-riemann\"></div>\n<h3>The definite integral as a limit</h3>\n<p>As we refine the partition — more rectangles, each thinner — the staircase hugs the curve ever more tightly. Define the <strong>mesh</strong> (or norm) of a partition as the width of its widest subinterval, $\\|P\\| = \\max_i \\Delta x_i$. The <strong>definite integral</strong> is the limit of Riemann sums as the mesh goes to zero:</p>\n$$\\int_a^b f(x)\\,dx \\;=\\; \\lim_{\\|P\\| \\to 0} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x_i.$$\n<p>When this limit exists and is the same number regardless of how we choose the partitions and sample points, we say $f$ is <strong>integrable</strong> on $[a,b]$. The notation decodes cleanly: $\\int$ is the limit-of-a-sum, $f(x)$ is the height, and $dx$ is the infinitesimal width — the limiting form of $\\Delta x$. The variable $x$ here is a <em>dummy</em>: $\\int_a^b f(x)\\,dx$ and $\\int_a^b f(t)\\,dt$ are the same number.</p>\n<p>For a regular partition the mesh is $\\Delta x = (b-a)/n$, so $\\|P\\| \\to 0$ is the same as $n \\to \\infty$, and the cleanest working definition is</p>\n$$\\int_a^b f(x)\\,dx \\;=\\; \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x, \\qquad \\Delta x = \\frac{b-a}{n}.$$\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>Not everything is integrable, but the functions you care about almost always are. <strong>Every continuous function on a closed interval $[a,b]$ is integrable.</strong> More generally, a bounded function is Riemann-integrable iff its set of discontinuities has \"measure zero\" — so a function with finitely many jumps is still fine.</p>\n</div>\n\n<h3>Signed area and net accumulation</h3>\n<p>Here is the subtlety that trips up many learners. A rectangle's contribution is $f(x_i^*)\\,\\Delta x$. When $f(x_i^*) < 0$, that term is <em>negative</em>. So the integral does not measure raw geometric area — it measures <strong>signed area</strong>: area above the $x$-axis counts positive, area below counts negative.</p>\n<p>If $f$ dips below the axis on part of $[a,b]$, then</p>\n$$\\int_a^b f(x)\\,dx = (\\text{area above the axis}) - (\\text{area below the axis}).$$\n<p>The integral is the <em>net</em> accumulation. For example, $\\int_0^{2\\pi} \\sin x\\,dx = 0$: the hump above the axis on $[0,\\pi]$ exactly cancels the dip below on $[\\pi, 2\\pi]$. If you instead want the total <em>physical</em> area, you integrate $|f(x)|$.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>\"Net signed area\" is the right mental model for <strong>accumulation</strong>. If $v(t)$ is velocity (which can be negative when you move backward), then $\\int_a^b v(t)\\,dt$ is <em>displacement</em> — your net change in position, not the total distance walked. Total distance is $\\int_a^b |v(t)|\\,dt$. The same split shows up everywhere: net cash flow vs. gross flow, net charge vs. total charge, expected value of a signed random quantity. Accumulating a rate over time gives you the net change in the underlying stock — this is the Fundamental Theorem of Calculus waiting in the wings.</p>\n</div>\n\n<h3>Summation notation, made fluent</h3>\n<p>Riemann sums force you to be comfortable with $\\sum$. Three identities do most of the heavy lifting when computing sums in closed form:</p>\n$$\\sum_{i=1}^{n} 1 = n, \\qquad \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}, \\qquad \\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}.$$\n<p>Plus linearity, which lets you break sums apart and pull constants out:</p>\n$$\\sum_{i=1}^{n}\\big(c\\,a_i + b_i\\big) = c\\sum_{i=1}^{n} a_i + \\sum_{i=1}^{n} b_i.$$\n<p>These are precisely the tools we need to evaluate a Riemann sum for a polynomial and then take its limit — turning the definition itself into an exact answer.</p>\n\n<h3>Fully worked example: $\\int_0^2 x^2\\,dx$ from the definition</h3>\n<p>Let us compute the exact value of $\\displaystyle\\int_0^2 x^2\\,dx$ using a right Riemann sum and a limit — no antiderivative shortcuts, just the definition.</p>\n\n<p><strong>Step 1 — set up the partition.</strong> Here $a = 0$, $b = 2$, so</p>\n$$\\Delta x = \\frac{2 - 0}{n} = \\frac{2}{n}, \\qquad x_i = 0 + i\\,\\Delta x = \\frac{2i}{n}.$$\n\n<p><strong>Step 2 — write the right sum.</strong> Using $x_i^* = x_i = 2i/n$ and $f(x) = x^2$,</p>\n$$R_n = \\sum_{i=1}^{n} f(x_i)\\,\\Delta x = \\sum_{i=1}^{n} \\left(\\frac{2i}{n}\\right)^2 \\cdot \\frac{2}{n} = \\sum_{i=1}^{n} \\frac{4i^2}{n^2}\\cdot\\frac{2}{n} = \\frac{8}{n^3}\\sum_{i=1}^{n} i^2.$$\n\n<p><strong>Step 3 — apply the closed form for $\\sum i^2$.</strong></p>\n$$R_n = \\frac{8}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6} = \\frac{8\\,(n+1)(2n+1)}{6n^2} = \\frac{4\\,(n+1)(2n+1)}{3n^2}.$$\n\n<p><strong>Step 4 — take the limit $n \\to \\infty$.</strong> Expand the numerator and divide by $n^2$:</p>\n$$\\frac{(n+1)(2n+1)}{n^2} = \\frac{2n^2 + 3n + 1}{n^2} = 2 + \\frac{3}{n} + \\frac{1}{n^2} \\;\\xrightarrow[n\\to\\infty]{}\\; 2.$$\n<p>Therefore</p>\n$$\\int_0^2 x^2\\,dx = \\lim_{n\\to\\infty} R_n = \\frac{4}{3}\\cdot 2 = \\frac{8}{3}.$$\n\n<p><strong>Step 5 — sanity check.</strong> The antiderivative power rule gives $\\int_0^2 x^2\\,dx = \\big[\\tfrac{x^3}{3}\\big]_0^2 = \\tfrac{8}{3} - 0 = \\tfrac{8}{3}$. The limit-of-sums machinery agrees with the shortcut — which is the whole point: the shortcut (the Fundamental Theorem) exists <em>because</em> this limit exists. Notice also that for any finite $n$, $R_n = \\tfrac{4(n+1)(2n+1)}{3n^2} > \\tfrac{8}{3}$; the right sum overestimates, exactly as expected for the increasing function $x^2$.</p>\n\n<h3>Estimating numerically when there is no clean formula</h3>\n<p>In practice you rarely sum to infinity by hand. You pick a moderate $n$ and compute a numerical estimate — this is the core of every numerical-integration routine. Here is the midpoint rule in a few lines of Python, the way you would actually approximate an integral that has no elementary antiderivative (like $e^{-x^2}$):</p>\n<pre><code>import math\n\ndef midpoint(f, a, b, n):\n    dx = (b - a) / n\n    total = 0.0\n    for i in range(n):\n        x_mid = a + (i + 0.5) * dx   # center of subinterval i\n        total += f(x_mid) * dx\n    return total\n\n# Estimate the (non-elementary) integral of exp(-x^2) on [0, 1]\nprint(midpoint(lambda x: math.exp(-x*x), 0, 1, 1000))\n# ~ 0.7468241...  (true value 0.746824132...)</code></pre>\n<p>With $n = 1000$ the midpoint rule already nails several digits. The error of the midpoint rule shrinks like $O(1/n^2)$ for smooth $f$, whereas the left/right rules only shrink like $O(1/n)$ — a concrete payoff for choosing the smarter sample point.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">ML connection</div>\n<p>This exact loop reappears constantly in machine learning. Expectations are integrals: $\\mathbb{E}[g(X)] = \\int g(x)\\,p(x)\\,dx$. When the integral is intractable, we approximate it with a finite sample average $\\frac{1}{N}\\sum_{j=1}^{N} g(x_j)$ — Monte Carlo integration, which is a randomized Riemann sum. The empirical loss $\\frac{1}{N}\\sum_i \\ell(f_\\theta(x_i), y_i)$ that you minimize during training is a sample-based estimate of the true risk $\\int \\ell\\,dP$. \"Sum of little pieces, scaled by a width, approximating an integral\" is the structural backbone of stochastic optimization.</p>\n</div>\n\n<h3>Properties worth memorizing</h3>\n<p>Directly from the limit definition, the definite integral inherits clean algebraic rules. For integrable $f, g$ and constant $c$:</p>\n<ul>\n<li><strong>Linearity:</strong> $\\displaystyle\\int_a^b \\big(c\\,f + g\\big)\\,dx = c\\int_a^b f\\,dx + \\int_a^b g\\,dx.$</li>\n<li><strong>Additivity over intervals:</strong> $\\displaystyle\\int_a^b f\\,dx = \\int_a^c f\\,dx + \\int_c^b f\\,dx$ for any $c$.</li>\n<li><strong>Orientation:</strong> $\\displaystyle\\int_a^b f\\,dx = -\\int_b^a f\\,dx$, and $\\displaystyle\\int_a^a f\\,dx = 0.$</li>\n<li><strong>Monotonicity:</strong> if $f(x) \\le g(x)$ on $[a,b]$, then $\\displaystyle\\int_a^b f\\,dx \\le \\int_a^b g\\,dx.$</li>\n<li><strong>Constant:</strong> $\\displaystyle\\int_a^b c\\,dx = c\\,(b - a)$ — the area of a rectangle, as a degenerate check.</li>\n</ul>\n<p>The first three are just bookkeeping facts about sums that survive the limit. They are also what makes the integral so composable in proofs and in code.</p>\n\n<h3>Wrap-up</h3>\n<p>The definite integral is the limit of Riemann sums $\\sum f(x_i^*)\\Delta x$ as the rectangles become infinitely thin. It computes <em>net signed area</em> — accumulation of a quantity where sign matters. Left, right, and midpoint sums are different sample-point choices that approximate the same limit, with the midpoint rule converging fastest. You can evaluate simple integrals exactly by summing in closed form and taking $n \\to \\infty$, and you can approximate any integral numerically with a finite sum. In the next lesson, the Fundamental Theorem of Calculus will reveal why antiderivatives let us skip the limit entirely — but the Riemann-sum picture is the meaning underneath the shortcut.</p>\n<h4>Code it: a Riemann sum</h4>\n<p>Approximate a definite integral the way the limit defines it: chop [a,b] into n rectangles, sample the height at each midpoint, and sum the areas. With n=1000 it nails the exact value of ∫₀¹ x² dx = 1/3. Crank n up or down and watch the approximation tighten or loosen.</p>\n<div data-code=\"javascript\" data-expected=\"0.3333\">// Midpoint Riemann sum: approximate the area under f from a to b with n rectangles.\nfunction riemann(f, a, b, n) {\n  const dx = (b - a) / n;\n  let sum = 0;\n  for (let i = 0; i &lt; n; i++) sum += f(a + (i + 0.5) * dx) * dx;   // sample at each midpoint\n  return sum;\n}\n// integral of x^2 from 0 to 1 is exactly 1/3 = 0.3333...\nconsole.log(riemann(x =&gt; x * x, 0, 1, 1000).toFixed(4));</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the integral is a limit of rectangles</summary>\n<p>The definite integral $\\int_a^b f(x)\\,dx$ is <em>defined</em> as the limit of a <b>Riemann sum</b>: slice $[a, b]$ into $n$ strips of width $\\Delta x = (b-a)/n$, approximate each strip's area by a rectangle $f(x_i)\\,\\Delta x$, sum them, and let $n \\to \\infty$:\n$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i)\\,\\Delta x.$$\nAs the rectangles get infinitely thin, the staircase of tops converges to the true area under the curve.</p>\n<p>The notation encodes the idea: the $\\int$ sign is a stretched \"S\" for <em>sum</em>, and $dx$ is the width of an infinitesimal strip — the discrete $\\sum f(x_i)\\,\\Delta x$ becomes the continuous $\\int f(x)\\,dx$. It is signed area, too: where $f$ is negative the rectangles count negatively.</p>\n<p>The \"aha\": an integral is not a mysterious new object — it is addition taken to a limit. That is why it computes <em>any</em> accumulated total (distance from velocity, mass from density, probability from a density), and why the Fundamental Theorem — linking this limit to antiderivatives — is such a shock: a limit of sums turns out to be undone by differentiation.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the integral is signed area</summary>\n<p>\"A limit of rectangles\" hides a sign: the rectangles in a Riemann sum use the function's <em>value</em>, which can be negative — so the definite integral measures <b>signed</b> area, not geometric area.</p>\n<p><b>Below the axis subtracts.</b> Where $f(x) \\lt 0$, each term $f(x_i)\\,\\Delta x$ is negative, so that region counts <em>against</em> the total. Thus $\\int_a^b f\\,dx$ is (area above the axis) minus (area below). A symmetric example: $\\int_{-1}^{1} x\\,dx = 0$ — the negative area on $[-1,0]$ exactly cancels the positive area on $[0,1]$, even though the graph encloses real area.</p>\n<p><b>When you want true area.</b> Geometric (\"how much paint\") area is $\\int_a^b |f(x)|\\,dx$ — integrate the <em>absolute value</em>, or split at the roots and add the magnitudes. Net versus total again: $\\int v\\,dt$ gives displacement (signed), $\\int |v|\\,dt$ gives distance traveled.</p>\n<p>The \"aha\": the definite integral is an <em>accumulator with sign</em>, not a paint-bucket area. That signed bookkeeping is exactly what makes it the right tool for net change, averages, and work — and it is why $\\int_a^b f\\,dx$ can be zero or negative even when the curve clearly encloses space.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Fundamental Theorem of Calculus — the bridge</summary>\n<p>Defining the integral as a limit of rectangles (the other dives) is conceptually perfect but computationally hopeless — nobody sums infinitely many areas by hand. The <strong>Fundamental Theorem of Calculus (FTC)</strong> is the miracle that makes integration practical, by tying it to differentiation.</p>\n<p><b>The two parts.</b> Part 1: if $F(x)=\\int_a^x f(t)\\,dt$ (the \"area so far\" function), then $F'(x)=f(x)$ — <em>differentiating an integral gives back the integrand</em>. Part 2 (the workhorse): $\\int_a^b f(x)\\,dx = F(b)-F(a)$ for <em>any</em> antiderivative $F$ of $f$. So to integrate you do not sum rectangles — you find an antiderivative and subtract its values at the endpoints.</p>\n<p><b>Why it is astonishing.</b> It says two seemingly unrelated operations — <em>accumulation</em> (area, a global limit of sums) and <em>rate of change</em> (the derivative, a local slope) — are <em>inverses</em>. The area under a curve up to $x$ changes, as $x$ moves, at exactly the height of the curve. That is why antiderivatives (the previous lesson) are the key to definite integrals.</p>\n<p>The \"aha\": the FTC is the bridge between the two halves of calculus. $\\int_a^b f = F(b)-F(a)$ turns an impossible infinite sum into a subtraction, because differentiation and integration undo each other — accumulation and rate of change are two views of one thing.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For an increasing function $f$ on $[a,b]$ with a regular partition, which inequality always holds?",
              "choices": [
                "$R_n \\le \\int_a^b f\\,dx \\le L_n$",
                "$L_n \\le \\int_a^b f\\,dx \\le R_n$",
                "$M_n \\le L_n \\le R_n$",
                "$\\int_a^b f\\,dx \\le L_n \\le R_n$"
              ],
              "answer": 1,
              "explain": "For an increasing function the left endpoints give the smallest height on each subinterval (underestimate) and right endpoints the largest (overestimate), so $L_n \\le \\int \\le R_n$."
            },
            {
              "q": "What does $\\int_0^{2\\pi} \\sin x\\,dx = 0$ tell us?",
              "choices": [
                "The function $\\sin x$ is zero on the whole interval",
                "The total geometric area enclosed is zero",
                "The area above the axis on $[0,\\pi]$ exactly cancels the area below on $[\\pi,2\\pi]$, so net signed area is zero",
                "The integral was computed incorrectly; it should be positive"
              ],
              "answer": 2,
              "explain": "The integral is net signed area; the positive hump and negative dip have equal magnitude and cancel. The total geometric area $\\int_0^{2\\pi}|\\sin x|\\,dx = 4$ is nonzero."
            },
            {
              "q": "If $v(t)$ is a velocity that is positive then negative over $[0,T]$, then $\\int_0^T v(t)\\,dt$ represents:",
              "choices": [
                "Net displacement (final minus initial position)",
                "Average speed",
                "Total distance traveled",
                "Maximum position reached"
              ],
              "answer": 0,
              "explain": "Integrating a rate gives net accumulated change; with signed velocity that is net displacement. Total distance traveled is $\\int_0^T |v(t)|\\,dt$ instead."
            },
            {
              "q": "In the limit $\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\,\\Delta x$ with a regular partition, what is $\\Delta x$?",
              "choices": [
                "$\\frac{1}{n}$",
                "$\\frac{b-a}{n}$",
                "$x_i^* - a$",
                "$b - a$"
              ],
              "answer": 1,
              "explain": "A regular partition splits $[a,b]$ into $n$ equal pieces, so each has width $\\Delta x = (b-a)/n$, which tends to zero as $n\\to\\infty$."
            },
            {
              "q": "Using a regular partition of $[a,b]$ into $n$ subintervals, what is the right endpoint $x_i$ of the $i$-th subinterval?",
              "choices": [
                "$x_i = a + i\\,\\Delta x$, where $\\Delta x = \\frac{b-a}{n}$",
                "$x_i = a + (i-1)\\,\\Delta x$, where $\\Delta x = \\frac{b-a}{n}$",
                "$x_i = a + \\frac{i}{n}$",
                "$x_i = i\\,\\frac{b-a}{n}$"
              ],
              "answer": 0,
              "explain": "For a regular partition the width is $\\Delta x = (b-a)/n$ and the $i$-th cut point is $x_i = a + i\\,\\Delta x$, so the first choice is correct. The second is the left endpoint, while the others omit the correct scaling or base point."
            },
            {
              "q": "On $[1,5]$ with $n=4$ subintervals (so $\\Delta x = 1$), what sample point does the midpoint rule use on the first subinterval $[1,2]$?",
              "choices": [
                "$1$",
                "$2$",
                "$1.5$",
                "$1.25$"
              ],
              "answer": 2,
              "explain": "The midpoint rule takes the center of each subinterval, and the center of $[1,2]$ is $\\frac{1+2}{2} = 1.5$."
            },
            {
              "q": "Why does the integral sign $\\int$ have the shape it does, and what does $\\int f(x)\\,dx$ represent intuitively?",
              "choices": [
                "It is a stylized 'I' for 'integral'; it represents the inverse of a derivative only",
                "It is an arbitrary symbol; it represents the average height of $f$",
                "It is a Greek letter sigma rotated; it represents the maximum value of $f$ on the interval",
                "It is a stretched-out 'S' for 'sum'; it represents adding $f(x)$ times tiny widths $dx$ across the interval"
              ],
              "answer": 3,
              "explain": "The integral sign is literally an elongated 'S' for sum, reflecting that an integral adds up $f(x)\\,dx$ contributions across the whole interval."
            },
            {
              "q": "As the number of rectangles $n \\to \\infty$ in a Riemann sum $\\sum_{i=1}^n f(x_i^*)\\,\\Delta x_i$, what happens, and what is the resulting object?",
              "choices": [
                "The widths $\\Delta x_i$ grow without bound, and the sum diverges to infinity for every $f$",
                "The widths $\\Delta x_i$ shrink toward zero, and the limit (when it exists) is the definite integral",
                "The number of terms stays fixed, and the sum equals the maximum rectangle's area",
                "The sample points $x_i^*$ must all coincide, and the limit equals $f(a)(b-a)$"
              ],
              "answer": 1,
              "explain": "Taking more and more rectangles drives each width $\\Delta x_i \\to 0$, and the limit of the Riemann sums, when it converges, defines the definite integral."
            },
            {
              "q": "On $[0,2]$ with $f(x)=x^2$ and $n=2$ equal subintervals (so $\\Delta x = 1$), what is the right-endpoint Riemann sum approximation of $\\int_0^2 x^2\\,dx$?",
              "choices": [
                "$2$",
                "$1$",
                "$\\tfrac{8}{3}$",
                "$5$"
              ],
              "answer": 3,
              "explain": "The right endpoints are $x=1$ and $x=2$, giving $f(1)\\cdot 1 + f(2)\\cdot 1 = 1 + 4 = 5$. The value $8/3$ is the exact integral (the limit), not this two-rectangle estimate."
            },
            {
              "q": "For a function that is concave up (like $f(x)=e^x$) and increasing on $[a,b]$, how does the midpoint Riemann sum compare to the exact value of $\\int_a^b f(x)\\,dx$?",
              "choices": [
                "It always overestimates, because $f$ is increasing",
                "It always overestimates, because the curve bulges upward",
                "It equals the exact value, because midpoints are unbiased",
                "It slightly underestimates, because each midpoint rectangle sits below the chord of a concave-up curve"
              ],
              "answer": 3,
              "explain": "For a concave-up curve the tangent at the midpoint lies below the curve while the chord lies above; the midpoint rectangle equals the area under that tangent, so it underestimates. The 'increasing means overestimate' reasoning confuses the midpoint rule with the right-endpoint rule."
            },
            {
              "q": "If $\\int_a^b f(x)\\,dx = 0$ for some function $f$, which conclusion is justified?",
              "choices": [
                "The signed area above the $x$-axis exactly cancels the signed area below it on $[a,b]$",
                "$f$ must be an odd function on $[a,b]$",
                "$f(x) = 0$ everywhere on $[a,b]$",
                "The interval has zero width, so $a = b$"
              ],
              "answer": 0,
              "explain": "A zero definite integral means the positive (above-axis) and negative (below-axis) contributions cancel; the function need not be zero, odd, nor the interval degenerate. For example $\\int_0^{2\\pi}\\sin x\\,dx = 0$ even though $\\sin x$ is not identically zero."
            },
            {
              "q": "Acceleration $a(t)=t$ (m/s$^2$) acts on an object over $[0,4]$ seconds. What does the definite integral $\\int_0^4 t\\,dt$ compute, and what is its value?",
              "choices": [
                "The object's position at $t=4$, equal to $4$ m",
                "The average acceleration, equal to $2$ m/s$^2$",
                "The change in velocity over the interval, equal to $8$ m/s",
                "The total distance traveled, equal to $16$ m"
              ],
              "answer": 2,
              "explain": "Integrating a rate (acceleration) accumulates the total change in its antiderivative quantity (velocity): $\\int_0^4 t\\,dt = \\tfrac{1}{2}(4)^2 = 8$ m/s. Integrating acceleration gives change in velocity, not position or distance, and $8$ is a sum of rate$\\times$time, not an average."
            },
            {
              "q": "The definite integral $\\int_a^b f(x)\\,dx$ represents:",
              "choices": [
                "the slope of $f$ at $x=b$",
                "the value $f(b) - f(a)$",
                "the signed area between the curve $f$ and the $x$-axis from $a$ to $b$ (area above minus area below)",
                "the arc length of the curve"
              ],
              "answer": 2,
              "explain": "Geometrically the definite integral accumulates *signed* area: regions where $f>0$ count positively and regions where $f<0$ count negatively. That's why $\\int_0^{2\\pi}\\sin x\\,dx = 0$ — the area above the axis cancels the area below."
            },
            {
              "q": "What is $\\int_a^a f(x)\\,dx$ (equal lower and upper limits)?",
              "choices": [
                "$f(a)$",
                "undefined",
                "$1$",
                "$0$"
              ],
              "answer": 3,
              "explain": "Integrating over a zero-width interval accumulates nothing, so $\\int_a^a f(x)\\,dx = 0$ for any $f$ — the integral analogue of 'no distance covered in zero time'."
            },
            {
              "q": "How does $\\int_b^a f(x)\\,dx$ compare to $\\int_a^b f(x)\\,dx$?",
              "choices": [
                "they are equal",
                "$\\int_b^a f = -\\int_a^b f$ — swapping the limits flips the sign",
                "$\\int_b^a f = 2\\int_a^b f$",
                "$\\int_b^a f = 0$"
              ],
              "answer": 1,
              "explain": "Reversing the direction of integration negates the result: $\\int_b^a f\\,dx = -\\int_a^b f\\,dx$. This is consistent with $\\Delta x=(b-a)/n$ flipping sign, and it keeps the rule $\\int_a^b + \\int_b^c = \\int_a^c$ valid for any order of $a,b,c$."
            },
            {
              "q": "In a regular partition of $[a,b]$ into $n$ subintervals, each subinterval has width $\\Delta x = $",
              "choices": [
                "$\\dfrac{b-a}{n}$",
                "$\\dfrac{b}{n}$",
                "$\\dfrac{a-b}{n}$",
                "$\\dfrac{n}{b-a}$"
              ],
              "answer": 0,
              "explain": "A 'regular' partition splits $[a,b]$ into $n$ equal pieces, so each has width $\\Delta x = \\dfrac{b-a}{n}$ (total length over count). As $n\\to\\infty$, $\\Delta x\\to 0$ and the Riemann sum $\\sum f(x_i^*)\\Delta x$ converges to the integral."
            }
          ],
          "flashcards": [
            {
              "front": "Definition: the definite integral as a limit of Riemann sums (regular partition).",
              "back": "$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\,\\Delta x$, where $\\Delta x = \\frac{b-a}{n}$ and $x_i^* \\in [x_{i-1},x_i]$."
            },
            {
              "front": "Left vs. right vs. midpoint sample points (regular partition).",
              "back": "Left: $x_i^* = a+(i-1)\\Delta x$. Right: $x_i^* = a+i\\,\\Delta x$. Midpoint: $x_i^* = a+(i-\\tfrac12)\\Delta x$. Midpoint is usually most accurate ($O(1/n^2)$ vs $O(1/n)$)."
            },
            {
              "front": "What does the definite integral actually measure when $f$ goes below the axis?",
              "back": "Net signed area = (area above axis) − (area below axis). Total geometric area requires integrating $|f(x)|$."
            },
            {
              "front": "Three summation closed forms used to evaluate Riemann sums.",
              "back": "$\\sum_{i=1}^n 1 = n$, $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$, $\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$."
            },
            {
              "front": "Which functions are guaranteed Riemann-integrable on $[a,b]$?",
              "back": "Every continuous function on a closed interval. More generally, any bounded function whose discontinuities have measure zero (e.g., finitely many jumps)."
            },
            {
              "front": "Accumulation interpretation: integral of a rate.",
              "back": "$\\int_a^b v(t)\\,dt$ is the net change in the accumulated quantity. For velocity it is displacement; total distance is $\\int_a^b |v(t)|\\,dt$."
            }
          ],
          "homework": [
            {
              "prompt": "Use a right Riemann sum and take the limit $n\\to\\infty$ to evaluate $\\int_0^3 (2x+1)\\,dx$ directly from the definition. Then verify geometrically.",
              "hint": "With $\\Delta x = 3/n$ and $x_i = 3i/n$, write $R_n = \\sum_{i=1}^n (2x_i+1)\\Delta x$, split into two sums, and use $\\sum i = n(n+1)/2$ and $\\sum 1 = n$.",
              "solution": "Here $\\Delta x = 3/n$, $x_i = 3i/n$. Then $R_n = \\sum_{i=1}^n\\big(2\\cdot\\tfrac{3i}{n}+1\\big)\\tfrac{3}{n} = \\sum_{i=1}^n\\big(\\tfrac{6i}{n}+1\\big)\\tfrac{3}{n} = \\tfrac{18}{n^2}\\sum_{i=1}^n i + \\tfrac{3}{n}\\sum_{i=1}^n 1$. Using the closed forms: $= \\tfrac{18}{n^2}\\cdot\\tfrac{n(n+1)}{2} + \\tfrac{3}{n}\\cdot n = \\tfrac{9(n+1)}{n} + 3 = 9 + \\tfrac{9}{n} + 3$. As $n\\to\\infty$, $R_n \\to 12$. So $\\int_0^3(2x+1)\\,dx = 12$. Geometric check: the region is a trapezoid under the line from $(0,1)$ to $(3,7)$ with parallel sides $1$ and $7$ and width $3$: area $= \\tfrac{1}{2}(1+7)\\cdot 3 = 12$. They agree."
            },
            {
              "prompt": "Let $f(x) = 3 - x$ on $[0,4]$. Compute $\\int_0^4 f(x)\\,dx$ as net signed area, and separately compute the total geometric area between the curve and the $x$-axis. Explain why they differ.",
              "hint": "The line crosses the axis at $x=3$. Split $[0,4]$ at $x=3$: a triangle above the axis on $[0,3]$ and a triangle below on $[3,4]$. Net area subtracts; total area adds.",
              "solution": "$f$ is positive on $[0,3)$ and negative on $(3,4]$, crossing at $x=3$. On $[0,3]$: a triangle with base 3 and height $f(0)=3$, area $\\tfrac{1}{2}(3)(3)=\\tfrac{9}{2}$ (above axis, positive). On $[3,4]$: a triangle with base 1 and height $|f(4)|=1$, area $\\tfrac{1}{2}(1)(1)=\\tfrac{1}{2}$ (below axis, counts negative in the integral). Net signed integral: $\\int_0^4 f\\,dx = \\tfrac{9}{2} - \\tfrac{1}{2} = 4$. (Check via antiderivative: $[3x - x^2/2]_0^4 = 12 - 8 = 4$.) Total geometric area: $\\tfrac{9}{2} + \\tfrac{1}{2} = 5$. They differ because the integral counts the sub-axis region as negative (net accumulation), while total area takes absolute values; total area $= \\int_0^4 |f|\\,dx = 5$."
            },
            {
              "prompt": "A particle has velocity $v(t) = t^2 - 4$ (meters/second) for $t \\in [0,3]$. Find the net displacement over $[0,3]$, then state how you would set up the total distance traveled (you may leave total distance as a sum of integrals).",
              "hint": "Net displacement is $\\int_0^3 v\\,dt$. For total distance, find where $v$ changes sign in $[0,3]$ and integrate $|v|$ by splitting there.",
              "solution": "Net displacement: $\\int_0^3 (t^2-4)\\,dt = \\big[\\tfrac{t^3}{3} - 4t\\big]_0^3 = (9 - 12) - 0 = -3$ meters. The negative sign means the particle ends 3 m behind its start. For total distance, note $v(t)=t^2-4=0$ at $t=2$ (within $[0,3]$); $v<0$ on $[0,2)$ and $v>0$ on $(2,3]$. Total distance $= \\int_0^3 |v|\\,dt = -\\int_0^2 (t^2-4)\\,dt + \\int_2^3 (t^2-4)\\,dt$. Evaluating: $\\int_0^2(t^2-4)\\,dt = \\tfrac{8}{3}-8 = -\\tfrac{16}{3}$, so its negative is $\\tfrac{16}{3}$; $\\int_2^3(t^2-4)\\,dt = (9-12)-(\\tfrac{8}{3}-8) = -3 + \\tfrac{16}{3} = \\tfrac{7}{3}$. Total distance $= \\tfrac{16}{3} + \\tfrac{7}{3} = \\tfrac{23}{3} \\approx 7.67$ meters, which exceeds the net displacement magnitude of 3 m, as it must."
            }
          ],
          "examples": [
            {
              "title": "A right-endpoint Riemann sum for $x^2$",
              "body": "Estimate the area under $f(x) = x^2$ on $[0, 2]$ using a right-endpoint Riemann sum with $n = 4$ equal subintervals. Then say whether your estimate is larger or smaller than the true area, and why.",
              "solution": "Step 1 — Find the subinterval width. With $a=0$, $b=2$, and $n=4$, every rectangle has width\n$$\\Delta x = \\frac{b-a}{n} = \\frac{2-0}{4} = 0.5.$$\n\nStep 2 — List the partition points. Starting at $a=0$ and stepping by $\\Delta x = 0.5$: $x_0 = 0,\\; x_1 = 0.5,\\; x_2 = 1,\\; x_3 = 1.5,\\; x_4 = 2$. The four subintervals are $[0,0.5],\\,[0.5,1],\\,[1,1.5],\\,[1.5,2]$.\n\nStep 3 — Pick the sample points (right endpoints). The right endpoint of each subinterval is $x_1, x_2, x_3, x_4 = 0.5,\\,1,\\,1.5,\\,2$.\n\nStep 4 — Evaluate $f$ at each sample point:\n$$f(0.5)=0.25,\\quad f(1)=1,\\quad f(1.5)=2.25,\\quad f(2)=4.$$\n\nStep 5 — Form the Riemann sum $\\sum_{i=1}^{4} f(x_i)\\,\\Delta x$. Factor out the common width $\\Delta x = 0.5$:\n$$R_4 = 0.5\\,(0.25 + 1 + 2.25 + 4) = 0.5 \\times 7.5 = 3.75.$$\n\nStep 6 — Interpret. So the estimate is $R_4 = \\dfrac{15}{4} = 3.75$. The true area is $\\displaystyle\\int_0^2 x^2\\,dx = \\frac{8}{3} \\approx 2.667$. Because $f(x)=x^2$ is increasing on $[0,2]$, each right endpoint gives the *tallest* value on its subinterval, so every rectangle pokes above the curve and the sum <strong>overestimates</strong> the area — consistent with $3.75 > 2.667$.\n\n<strong>Answer:</strong> $R_4 = \\dfrac{15}{4} = 3.75$, an overestimate of the exact area $\\dfrac{8}{3}$."
            },
            {
              "title": "From a Riemann sum to an exact integral via a limit",
              "body": "Compute $\\displaystyle\\int_1^3 (3x+1)\\,dx$ directly from the definition: set up the right-endpoint Riemann sum for general $n$, simplify it to a formula in $n$, and take the limit as $n \\to \\infty$.",
              "solution": "Step 1 — Set up the width and sample points. Here $a=1$, $b=3$, so\n$$\\Delta x = \\frac{3-1}{n} = \\frac{2}{n}, \\qquad x_i = a + i\\,\\Delta x = 1 + \\frac{2i}{n}, \\quad i = 1,2,\\dots,n.$$\nThese $x_i$ are the right endpoints of the $n$ equal subintervals.\n\nStep 2 — Evaluate $f(x)=3x+1$ at the sample points:\n$$f(x_i) = 3\\!\\left(1 + \\frac{2i}{n}\\right) + 1 = 3 + \\frac{6i}{n} + 1 = 4 + \\frac{6i}{n}.$$\n\nStep 3 — Write the Riemann sum and pull constants out of the sum:\n$$S_n = \\sum_{i=1}^{n} f(x_i)\\,\\Delta x = \\sum_{i=1}^{n}\\left(4 + \\frac{6i}{n}\\right)\\frac{2}{n} = \\frac{2}{n}\\sum_{i=1}^{n} 4 \\;+\\; \\frac{2}{n}\\cdot\\frac{6}{n}\\sum_{i=1}^{n} i.$$\n\nStep 4 — Apply the summation formulas $\\sum_{i=1}^{n} 4 = 4n$ and $\\sum_{i=1}^{n} i = \\dfrac{n(n+1)}{2}$:\n$$S_n = \\frac{2}{n}(4n) + \\frac{12}{n^2}\\cdot\\frac{n(n+1)}{2} = 8 + \\frac{6(n+1)}{n} = 8 + 6 + \\frac{6}{n} = 14 + \\frac{6}{n}.$$\n\nStep 5 — Take the limit as the rectangles get infinitely thin:\n$$\\int_1^3 (3x+1)\\,dx = \\lim_{n\\to\\infty} S_n = \\lim_{n\\to\\infty}\\left(14 + \\frac{6}{n}\\right) = 14.$$\n\nStep 6 — Sanity check with geometry. The region under $y=3x+1$ over $[1,3]$ is a trapezoid with parallel vertical sides $f(1)=4$ and $f(3)=10$ and horizontal width $2$, giving area $\\dfrac{4+10}{2}\\times 2 = 14$. The limit matches.\n\n<strong>Answer:</strong> $\\displaystyle\\int_1^3 (3x+1)\\,dx = 14.$ Notice how the term $\\frac{6}{n}$ — the leftover error of the finite sum — vanishes in the limit, which is exactly the point of letting $n \\to \\infty$."
            },
            {
              "title": "Left, right, midpoint: which Riemann sum wins",
              "body": "Estimate $\\int_0^2 x^2\\,dx$ (exact value $\\tfrac{8}{3} \\approx 2.667$) with $n = 2$ rectangles, using left, right, and midpoint sums.",
              "solution": "<strong>Two subintervals,</strong> each of width $\\Delta x = 1$: $[0,1]$ and $[1,2]$, with $f(x) = x^2$.\n<strong>Left endpoints</strong> ($x = 0, 1$): $L = (0^2 + 1^2)\\cdot 1 = 1$ — an <em>under</em>estimate (the function is increasing, so the left edge is the lowest point of each strip).\n<strong>Right endpoints</strong> ($x = 1, 2$): $R = (1^2 + 2^2)\\cdot 1 = 5$ — an <em>over</em>estimate.\n<strong>Midpoints</strong> ($x = 0.5, 1.5$): $M = (0.5^2 + 1.5^2)\\cdot 1 = 0.25 + 2.25 = 2.5$ — much closer to the true $2.667$ than either endpoint rule.\n<strong>The aha.</strong> Left and right sums err in opposite directions and only as $O(1/n)$; the midpoint rule lets each rectangle's over- and under-shoot cancel within the strip, so its error shrinks as $O(1/n^2)$. All three converge to the same value as $n \\to \\infty$ — the definite integral <em>is</em> that limit — but where you sample inside each strip decides how fast you arrive."
            }
          ]
        },
        {
          "id": "c-fundamental-theorem",
          "title": "The Fundamental Theorem of Calculus",
          "minutes": 16,
          "content": "<h3>The Theorem That Glued Calculus Together</h3>\n<p>Before the late 17th century, two problems lived in separate worlds. One was the <strong>tangent problem</strong>: given a curve, find its slope at a point — what we now call differentiation. The other was the <strong>area problem</strong>: given a curve, find the area underneath it — what we now call integration. People had been computing areas since Archimedes, more than 1,800 years before Newton, by laboriously summing infinitely many slivers. Slopes felt like a different kind of question entirely.</p>\n<p>The <strong>Fundamental Theorem of Calculus</strong> (FTC) is the stunning discovery that these two problems are inverses of each other. Differentiation undoes integration, and integration undoes differentiation. This is why we can compute a definite integral — fundamentally a limit of a sum of millions of tiny areas — without ever summing anything, just by finding an antiderivative. It is, without exaggeration, one of the most useful theorems ever proved.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The FTC turns an <em>analysis</em> problem (a limit of Riemann sums) into an <em>algebra</em> problem (finding an antiderivative and subtracting). Almost every closed-form integral you will ever evaluate by hand relies on this bridge.</p></div>\n\n<h3>Setting the Stage: Two Different Objects</h3>\n<p>It helps to be precise about what we're relating, because the FTC connects two things that look nothing alike.</p>\n<h4>The definite integral</h4>\n<p>For a function $f$ that is continuous (or at least integrable) on $[a, b]$, the definite integral is a <em>number</em>, defined as a limit of Riemann sums:</p>\n$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x, \\qquad \\Delta x = \\frac{b-a}{n}.$$\n<p>Geometrically, this is the signed area between the graph of $f$ and the $x$-axis: area above the axis counts as positive, area below as negative.</p>\n<h4>The antiderivative</h4>\n<p>An <strong>antiderivative</strong> of $f$ is any function $F$ whose derivative is $f$, i.e. $F'(x) = f(x)$. Antiderivatives are not unique: if $F$ works, so does $F + C$ for any constant $C$, because the derivative of a constant is zero. The whole family $\\{F + C\\}$ is what the <em>indefinite</em> integral $\\int f(x)\\,dx$ denotes.</p>\n<p>One object is a single number tied to an interval. The other is a whole function (a family of functions, really). The FTC says they are two faces of the same coin.</p>\n\n<h3>The Accumulation Function: The Heart of Part 1</h3>\n<p>The key idea that links the two worlds is to stop treating the upper limit of integration as fixed and let it <em>vary</em>. Define the <strong>accumulation function</strong> (also called the area function):</p>\n$$g(x) = \\int_a^x f(t)\\,dt.$$\n<p>Read this carefully. For each input $x$, $g(x)$ is the signed area accumulated from the fixed left endpoint $a$ up to the moving right endpoint $x$. As $x$ slides right, $g$ accumulates more area; if $f$ dips below the axis, $g$ accumulates negative area and decreases.</p>\n<div class=\"callout\"><div class=\"c-tag\">Notation</div><p>We use $t$ as the integration variable inside and reserve $x$ for the upper limit. Writing $\\int_a^x f(x)\\,dx$ is sloppy — the variable being integrated over is a \"dummy\" and should not collide with the limit. Use a different letter: $\\int_a^x f(t)\\,dt$.</p></div>\n\n<h4>FTC Part 1 (the derivative of accumulated area)</h4>\n<p>If $f$ is continuous on $[a, b]$, then $g(x) = \\int_a^x f(t)\\,dt$ is differentiable on $(a, b)$ and</p>\n$$g'(x) = \\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x).$$\n<p>In words: <strong>the rate at which area accumulates at $x$ equals the height of the curve at $x$.</strong> Differentiating an accumulation function just hands you back the integrand, evaluated at the upper limit.</p>\n\n<h4>Why is this true? The intuition</h4>\n<p>Consider how much new area $g$ picks up when $x$ moves a tiny bit, from $x$ to $x + h$. That extra area is $g(x+h) - g(x) = \\int_x^{x+h} f(t)\\,dt$ — the area of a thin sliver of width $h$. Because $f$ is continuous, over that tiny width it is nearly constant at the value $f(x)$, so the sliver is almost a rectangle of width $h$ and height $f(x)$:</p>\n$$g(x+h) - g(x) \\approx f(x)\\cdot h.$$\n<p>Divide by $h$ and let $h \\to 0$:</p>\n$$g'(x) = \\lim_{h \\to 0}\\frac{g(x+h)-g(x)}{h} = f(x).$$\n<p>Made rigorous, the approximation is pinned down by the <strong>Mean Value Theorem for integrals</strong>: $\\int_x^{x+h} f(t)\\,dt = f(c)\\cdot h$ for some $c$ between $x$ and $x+h$. As $h \\to 0$, $c \\to x$, and continuity gives $f(c) \\to f(x)$. That's the whole proof.</p>\n<div data-viz=\"calc-ftc-accumulation\"></div>\n\n<h3>Variable Limits and the Chain Rule</h3>\n<p>Part 1 in its raw form handles an upper limit equal to exactly $x$. Real problems throw curveballs: the limit might be a function of $x$, the variable might be on the bottom, or both limits might move. All of these reduce to Part 1 plus the chain rule.</p>\n\n<h4>Upper limit is a function $u(x)$</h4>\n<p>Let $G(x) = \\int_a^{u(x)} f(t)\\,dt$. Write $G(x) = g(u(x))$ where $g$ is the accumulation function. By the chain rule, $G'(x) = g'(u(x))\\cdot u'(x) = f(u(x))\\cdot u'(x)$:</p>\n$$\\frac{d}{dx}\\int_a^{u(x)} f(t)\\,dt = f\\!\\big(u(x)\\big)\\cdot u'(x).$$\n\n<h4>Variable on the lower limit</h4>\n<p>Flipping limits flips the sign: $\\int_{v(x)}^{b} f(t)\\,dt = -\\int_{b}^{v(x)} f(t)\\,dt$, so</p>\n$$\\frac{d}{dx}\\int_{v(x)}^{b} f(t)\\,dt = -\\,f\\!\\big(v(x)\\big)\\cdot v'(x).$$\n\n<h4>Both limits move — split at any constant</h4>\n<p>Split the integral at any convenient point $c$ in the domain and apply the two rules above:</p>\n$$\\frac{d}{dx}\\int_{v(x)}^{u(x)} f(t)\\,dt = f\\!\\big(u(x)\\big)\\,u'(x) - f\\!\\big(v(x)\\big)\\,v'(x).$$\n<p>This compact formula is worth memorizing: <strong>plug the upper limit into $f$ and multiply by the upper limit's derivative, then subtract the same thing for the lower limit.</strong></p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Worth a quick check</div><p>If you ever blank on the sign, sanity-check with the simplest case: $\\frac{d}{dx}\\int_a^x f(t)\\,dt$ should be $+f(x)$ (here $u(x)=x$, $u'=1$, no lower term). If your formula gives that, the signs are right.</p></div>\n\n<h3>FTC Part 2: The Evaluation Theorem</h3>\n<p>Part 1 is conceptual glue. Part 2 is the computational workhorse — it's the rule you'll actually use to evaluate integrals.</p>\n<h4>Statement</h4>\n<p>If $f$ is continuous on $[a, b]$ and $F$ is <em>any</em> antiderivative of $f$ (so $F' = f$), then</p>\n$$\\int_a^b f(x)\\,dx = F(b) - F(a).$$\n<p>We write the right-hand side compactly as $\\big[F(x)\\big]_a^b$ or $F(x)\\Big|_a^b$. To compute a definite integral: find one antiderivative, plug in the top, plug in the bottom, subtract. No Riemann sums, no limits.</p>\n\n<h4>Why \"any\" antiderivative works</h4>\n<p>Suppose $F$ and $H$ are both antiderivatives of $f$. Then $(F - H)' = f - f = 0$, so $F - H$ is a constant. When you compute the difference $F(b) - F(a)$, that constant cancels: $(F(b)+C) - (F(a)+C) = F(b)-F(a)$. So it doesn't matter which antiderivative you pick — drop the $+C$ for definite integrals.</p>\n\n<h4>Why Part 2 follows from Part 1</h4>\n<p>By Part 1, $g(x) = \\int_a^x f(t)\\,dt$ is an antiderivative of $f$. Any other antiderivative $F$ differs from $g$ by a constant: $F(x) = g(x) + C$. Now evaluate the difference, using that $g(a) = \\int_a^a f = 0$ and $g(b) = \\int_a^b f$:</p>\n$$F(b) - F(a) = \\big(g(b)+C\\big) - \\big(g(a)+C\\big) = g(b) - g(a) = \\int_a^b f(t)\\,dt - 0 = \\int_a^b f(t)\\,dt.$$\n<p>That's it. Part 2 is just Part 1 cashed out at the two endpoints.</p>\n\n<h3>Worked Example (start to finish)</h3>\n<p><strong>Problem.</strong> Evaluate $\\displaystyle\\int_1^3 \\left(6x^2 - 4x + \\frac{1}{x}\\right)dx$, and separately find $\\dfrac{d}{dx}\\displaystyle\\int_{x^2}^{\\,\\sin x} e^{t^2}\\,dt$.</p>\n\n<h4>Part A — a definite integral via FTC Part 2</h4>\n<p>Step 1: find an antiderivative term by term using the power rule $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$ and $\\int \\frac{1}{x}\\,dx = \\ln|x|$.</p>\n$$F(x) = 6\\cdot\\frac{x^3}{3} - 4\\cdot\\frac{x^2}{2} + \\ln|x| = 2x^3 - 2x^2 + \\ln|x|.$$\n<p>Step 2: evaluate at the endpoints and subtract.</p>\n$$F(3) = 2(27) - 2(9) + \\ln 3 = 54 - 18 + \\ln 3 = 36 + \\ln 3,$$\n$$F(1) = 2(1) - 2(1) + \\ln 1 = 0 + 0 = 0.$$\n$$\\int_1^3 \\left(6x^2 - 4x + \\tfrac{1}{x}\\right)dx = (36 + \\ln 3) - 0 = 36 + \\ln 3 \\approx 37.10.$$\n\n<h4>Part B — differentiating with two variable limits</h4>\n<p>Here $f(t) = e^{t^2}$, the upper limit is $u(x) = \\sin x$ (so $u'(x) = \\cos x$), and the lower limit is $v(x) = x^2$ (so $v'(x) = 2x$). Note $e^{t^2}$ has <em>no</em> elementary antiderivative — yet we can still differentiate this accumulation function exactly, which is the whole power of Part 1. Apply the both-limits formula:</p>\n$$\\frac{d}{dx}\\int_{x^2}^{\\sin x} e^{t^2}\\,dt = e^{(\\sin x)^2}\\cdot \\cos x - e^{(x^2)^2}\\cdot 2x = e^{\\sin^2 x}\\cos x - 2x\\,e^{x^4}.$$\n<p>No integration required — and good thing, since the integral itself has no closed form.</p>\n\n<h3>Why Differentiation and Integration Are Inverse</h3>\n<p>The two parts of the FTC, read together, are precisely the statement that $\\frac{d}{dx}$ and $\\int$ undo each other — up to the natural slack each operation carries.</p>\n<ul>\n<li><strong>Integrate then differentiate (Part 1):</strong> $\\dfrac{d}{dx}\\displaystyle\\int_a^x f(t)\\,dt = f(x)$. Accumulating $f$ and then taking the rate of change gives $f$ back exactly.</li>\n<li><strong>Differentiate then integrate (Part 2):</strong> $\\displaystyle\\int_a^b F'(x)\\,dx = F(b) - F(a)$. Integrating a derivative recovers the <em>net change</em> in $F$. This is the \"net change theorem\": the integral of a rate of change over an interval is the total change.</li>\n</ul>\n<p>The asymmetry is exactly the constant of integration. Differentiation destroys additive constants (their derivative is zero), so integrating a derivative can only recover changes, never the absolute baseline — hence $F(b)-F(a)$, a difference, rather than $F$ itself.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Connection to ML / AI</div><p>The net-change reading is everywhere in machine learning. Continuous-time models — <em>neural ODEs</em> — define a hidden state by $h(T) = h(0) + \\int_0^T f_\\theta(h(t), t)\\,dt$, which is FTC Part 2 in disguise: the state is the initial value plus the accumulated change. Training them uses the <em>adjoint method</em>, itself an application of the FTC and the chain rule to compute gradients of an integral with respect to parameters. And in probability, a CDF is an accumulation function $F(x)=\\int_{-\\infty}^{x} p(t)\\,dt$; Part 1 says its derivative is the density $p(x)$ — the link every normalizing-flow and diffusion model exploits when it converts between densities and cumulative probabilities.</p></div>\n\n<h3>Common Pitfalls</h3>\n<ul>\n<li><strong>Forgetting the chain-rule factor.</strong> $\\frac{d}{dx}\\int_0^{x^2} \\cos t\\,dt$ is $\\cos(x^2)\\cdot 2x$, not $\\cos(x^2)$. The $2x$ is the derivative of the upper limit and is mandatory.</li>\n<li><strong>Sign on the lower limit.</strong> A variable lower limit contributes a <em>minus</em>: $\\frac{d}{dx}\\int_x^5 g(t)\\,dt = -g(x)$.</li>\n<li><strong>Using FTC across a discontinuity.</strong> Part 2 requires $f$ continuous on $[a,b]$. The classic trap is $\\int_{-1}^{1}\\frac{1}{x^2}\\,dx$. Blindly using $F(x)=-1/x$ gives $-1-(1)=-2$, a negative \"area\" under a positive function — nonsense, because the integrand blows up at $x=0$. The integral is actually divergent.</li>\n<li><strong>Dropping the dummy-variable distinction.</strong> Keep the integration variable ($t$) different from the limit ($x$).</li>\n</ul>\n\n<h3>Recap</h3>\n<ul>\n<li><strong>Part 1:</strong> $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$ — the derivative of accumulated area is the integrand. With variable limits, $\\frac{d}{dx}\\int_{v(x)}^{u(x)} f\\,dt = f(u)\\,u' - f(v)\\,v'$.</li>\n<li><strong>Part 2:</strong> $\\int_a^b f(x)\\,dx = F(b)-F(a)$ for any antiderivative $F$ — evaluate integrals by antidifferentiation, no Riemann sums.</li>\n<li><strong>Together:</strong> differentiation and integration are inverse operations; the constant of integration is the only slack between them.</li>\n</ul>\n<h4>Try it in code</h4>\n<p>The Fundamental Theorem turns a definite integral into subtraction: <code>∫ₐᵇ f = F(b) − F(a)</code> for any antiderivative F. No limits of sums needed. Run it for <code>∫₀² 3x² dx</code> (antiderivative <code>F(x)=x³</code>):</p>\n<div data-code=\"javascript\" data-expected=\"8\">// FTC: a definite integral equals F(b) - F(a), F any antiderivative of f.\n// For f(x) = 3x^2, an antiderivative is F(x) = x^3.\nfunction F(x) { return x * x * x; }\nconsole.log(F(2) - F(0));   // integral of 3x^2 from 0 to 2 = 8</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the two halves of calculus are inverses</summary>\n<p>The Fundamental Theorem of Calculus says differentiation and integration undo each other — the single fact that ties the whole subject together. It has two parts. <b>Part 1</b>: if $F(x) = \\int_a^x f(t)\\,dt$ (accumulated area), then $F'(x) = f(x)$ — differentiating an accumulation returns the integrand. <b>Part 2</b>: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ for any antiderivative $F$ — definite integrals are computed by evaluation, not by summing infinitely many rectangles.</p>\n<p>Why it is astonishing: integration was <em>defined</em> as a limit of Riemann sums (a hard, global, additive process) and differentiation as a local limit of slopes. There is no obvious reason these should be related — yet the FTC says one inverts the other. Accumulating a rate recovers the total; the rate of an accumulation is the thing accumulated.</p>\n<p>The \"aha\": you never have to evaluate a Riemann sum to find an area — just find an antiderivative and subtract. The FTC is what makes integration <em>practical</em>, converting an infinite-sum problem into an algebra problem, and it is why \"find the antiderivative\" is the central skill of integral calculus.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: net change — integrate a rate to get the total</summary>\n<p>Read the FTC from right to left and it becomes the most useful sentence in applied calculus: <b>the integral of a rate of change is the total change</b>.</p>\n<p><b>The net-change theorem.</b> Since $F' = f$, the FTC says $\\int_a^b f'(x)\\,dx = f(b) - f(a)$. In words: if $f'$ is how fast a quantity changes, then accumulating that rate from $a$ to $b$ gives the <em>net change</em> in the quantity itself.</p>\n<p><b>Everywhere in practice.</b> Integrate <em>velocity</em> over time to get <em>displacement</em>: $\\int_{t_1}^{t_2} v(t)\\,dt = s(t_2) - s(t_1)$. Integrate <em>marginal cost</em> over units to get total added cost. Integrate a <em>rate of flow</em> to get total volume. Integrate <em>acceleration</em> to get the change in velocity. The recurring move: you know how fast something changes and want the total amount it changed.</p>\n<p><b>Signed, naturally.</b> Because it is a <em>net</em> change, intervals where $f'$ is negative subtract — integrating a velocity that goes forward then backward gives <em>displacement</em> (net), not <em>distance</em> (which needs $\\int |v|\\,dt$). That signed bookkeeping is a feature, not a bug.</p>\n<p>The \"aha\": the two halves of calculus being inverses is not just abstract — it means \"rate\" and \"total\" are two views of the same thing. Differentiate a total to get a rate; integrate a rate to recover the total. Nearly every applied use of the definite integral is this one idea.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Leibniz rule (variable limits and under the integral sign)</summary>\n<p>The FTC tells you $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$ when the <em>upper</em> limit is $x$. Two powerful generalizations handle the cases real problems throw at you.</p>\n<p><b>Both limits move — the Leibniz rule.</b> When <em>both</em> limits depend on $x$, apply the chain rule to each: $$\\frac{d}{dx}\\int_{a(x)}^{b(x)} f(t)\\,dt = f(b(x))\\,b'(x) - f(a(x))\\,a'(x).$$ Each limit contributes the integrand evaluated there, times how fast that limit moves; the lower limit enters with a minus sign (shrinking the region removes area). The plain FTC is just the case $a(x)=a$ (constant), $b(x)=x$.</p>\n<p><b>The integrand moves — differentiating under the integral sign.</b> If instead the <em>integrand</em> carries a parameter, you can swap the order of differentiation and integration: $\\frac{d}{dx}\\int_a^b f(x,t)\\,dt = \\int_a^b \\frac{\\partial f}{\\partial x}(x,t)\\,dt$. This is <b>Feynman's trick</b> — introduce a parameter, differentiate under the sign, solve the easier integral, then integrate back — a famous way to crack integrals that resist every standard technique.</p>\n<p>The \"aha\": the FTC is not a single formula but a family. Moving limits bring in the chain rule (Leibniz's rule, with the lower limit subtracted), and a parameter in the integrand lets you differentiate <em>under</em> the integral — two moves that turn the FTC into a genuine problem-solving toolkit.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Compute $\\dfrac{d}{dx}\\displaystyle\\int_{2}^{x^3} \\ln(t^2+1)\\,dt$.",
              "choices": [
                "$\\ln(x^6 + 1)$",
                "$\\ln(x^2 + 1)\\cdot 3x^2$",
                "$\\ln(x^6 + 1)\\cdot 3x^2$",
                "$\\dfrac{2x^3}{x^6+1}\\cdot 3x^2$"
              ],
              "answer": 2,
              "explain": "By FTC Part 1 with the chain rule, plug the upper limit $u=x^3$ into the integrand and multiply by $u'=3x^2$: $\\ln((x^3)^2+1)\\cdot 3x^2 = \\ln(x^6+1)\\cdot 3x^2$. Choice 0 forgets the chain-rule factor."
            },
            {
              "q": "A student evaluates $\\displaystyle\\int_{-1}^{1}\\frac{1}{x^2}\\,dx$ as $\\left[-\\frac1x\\right]_{-1}^{1} = -1-(1) = -2$. What is wrong?",
              "choices": [
                "The antiderivative of $1/x^2$ is wrong",
                "Nothing — the answer is $-2$",
                "FTC Part 2 doesn't apply because $1/x^2$ is discontinuous (blows up) at $x=0$ inside the interval; the integral actually diverges",
                "They forgot a chain-rule factor"
              ],
              "answer": 2,
              "explain": "FTC Part 2 requires the integrand to be continuous on the whole interval. Since $1/x^2 \\to \\infty$ at $x=0 \\in [-1,1]$, the theorem doesn't apply and the (improper) integral diverges. A negative value for a strictly positive integrand is the giveaway."
            },
            {
              "q": "Which statement best captures why $F(b)-F(a)$ gives the same answer no matter which antiderivative $F$ you choose?",
              "choices": [
                "Any two antiderivatives differ by a constant, which cancels in the subtraction $F(b)-F(a)$",
                "Antiderivatives are unique, so there is only one $F$",
                "The constant of integration is always zero for definite integrals by definition",
                "Because $f$ is continuous, all its antiderivatives are equal"
              ],
              "answer": 0,
              "explain": "If $F'=H'=f$, then $(F-H)'=0$ so $F-H$ is constant; that constant appears in both $F(b)$ and $F(a)$ and cancels on subtraction. Antiderivatives are not unique, so choices 0 and 3 are false."
            },
            {
              "q": "Interpreting $\\int_a^b F'(x)\\,dx = F(b)-F(a)$: if $v(t)$ is the velocity of an object, what does $\\int_0^{10} v(t)\\,dt$ represent?",
              "choices": [
                "The net displacement (change in position) over $[0,10]$",
                "The object's speed at $t=10$",
                "The total distance traveled, always",
                "The acceleration over $[0,10]$"
              ],
              "answer": 0,
              "explain": "Velocity is the derivative of position $s$, so by FTC Part 2 the integral equals $s(10)-s(0)$, the net change in position (displacement). Total distance would require $\\int|v|\\,dt$, which differs when $v$ changes sign."
            },
            {
              "q": "Let $g(x) = \\int_a^x f(t)\\,dt$ be the accumulation function for a continuous $f$. On an interval where $f(t) < 0$ for all $t$, what is happening to $g$?",
              "choices": [
                "$g$ is increasing, because area is always positive",
                "$g$ is decreasing, because $g'(x) = f(x) < 0$",
                "$g$ is constant, because the integral of a negative function is zero",
                "$g$ is negative but increasing"
              ],
              "answer": 1,
              "explain": "By FTC Part 1, $g'(x) = f(x)$, so where $f$ is negative the accumulation function has negative slope and is decreasing."
            },
            {
              "q": "Which pair correctly describes the *type* of object on each side?",
              "choices": [
                "$\\int_a^b f(x)\\,dx$ is a function; $\\int f(x)\\,dx$ is a number",
                "Both $\\int_a^b f(x)\\,dx$ and $\\int f(x)\\,dx$ are numbers",
                "$\\int_a^b f(x)\\,dx$ is a number; $\\int f(x)\\,dx$ is a family of functions",
                "Both are families of functions differing by a constant"
              ],
              "answer": 2,
              "explain": "The definite integral is a single number tied to $[a,b]$, while the indefinite integral denotes the whole family $\\{F+C\\}$ of antiderivatives."
            },
            {
              "q": "The accumulation function $g(x) = \\int_a^x f(t)\\,dt$ uses a dummy variable $t$ inside while $x$ is the upper limit. Why is the variable of integration written as $t$ rather than $x$?",
              "choices": [
                "Because changing the letter changes the value of the integral",
                "Because the integral is only valid for the variable $t$, not $x$",
                "Because $t$ must always denote time in any integral",
                "Because $x$ already names the varying upper limit, so a different letter is needed to avoid clashing with the integration variable"
              ],
              "answer": 3,
              "explain": "The upper limit $x$ and the integration variable are different roles, so a distinct dummy letter $t$ avoids confusing the bound that varies with the variable being summed over."
            },
            {
              "q": "Evaluating Part 2, a student writes $\\int_0^{\\pi} \\cos x\\,dx = [\\sin x]_0^{\\pi} = \\sin(\\pi) - \\sin(0) = 0$. Is this correct, and what does the answer mean?",
              "choices": [
                "Incorrect; they should have used $-\\sin x$ as the antiderivative",
                "Correct; the positive signed area on $[0,\\pi/2]$ and the equal negative signed area on $[\\pi/2,\\pi]$ cancel to a net zero",
                "Incorrect; a definite integral can never be zero",
                "Correct, but only because $\\cos x$ is never negative on $[0,\\pi]$"
              ],
              "answer": 1,
              "explain": "$\\sin x$ is a valid antiderivative of $\\cos x$ and the computation is right: the positive area on $[0,\\pi/2]$ and the equal negative area on $[\\pi/2,\\pi]$ (where $\\cos x \\le 0$) cancel as signed area."
            },
            {
              "q": "Let $g(x) = \\displaystyle\\int_{x}^{5} e^{-t^2}\\,dt$. Compute $g'(x)$.",
              "choices": [
                "$e^{-x^2}$",
                "$-2x\\,e^{-x^2}$",
                "$e^{-25}$",
                "$-e^{-x^2}$"
              ],
              "answer": 3,
              "explain": "Here $x$ is the LOWER limit, so swap the limits to get $g(x) = -\\int_5^x e^{-t^2}\\,dt$; FTC Part 1 then gives $g'(x) = -e^{-x^2}$. The tempting $e^{-x^2}$ forgets the sign flip from $x$ being the lower limit."
            },
            {
              "q": "A continuous function $f$ has antiderivative $F$ with $F(1)=3$ and $F(4)=10$. What is $\\displaystyle\\int_{1}^{4} f(x)\\,dx$, and would the answer change if you used a different antiderivative $G$ of $f$?",
              "choices": [
                "$7$, and it is unchanged for any antiderivative of $f$",
                "$7$, but only because $F(1)$ and $F(4)$ happened to be given",
                "$13$, and it could change since $G$ differs from $F$",
                "Cannot be determined without knowing the formula for $f$"
              ],
              "answer": 0,
              "explain": "FTC Part 2 gives $F(4)-F(1)=10-3=7$. Any other antiderivative $G=F+C$ yields $G(4)-G(1)=(F(4)+C)-(F(1)+C)=7$, so the constant cancels and the formula for $f$ is never needed."
            },
            {
              "q": "For which integral does the equation $\\displaystyle\\int_a^b f(x)\\,dx = F(b)-F(a)$ (with $F$ an antiderivative of $f$) FAIL to apply directly as stated?",
              "choices": [
                "$\\displaystyle\\int_{1}^{2} \\frac{1}{x}\\,dx$",
                "$\\displaystyle\\int_{0}^{3} \\frac{1}{x-1}\\,dx$",
                "$\\displaystyle\\int_{0}^{\\pi} \\sin x\\,dx$",
                "$\\displaystyle\\int_{-2}^{2} x^3\\,dx$"
              ],
              "answer": 1,
              "explain": "FTC Part 2 requires $f$ to be continuous on $[a,b]$; $\\frac{1}{x-1}$ has an infinite discontinuity at $x=1$ inside $[0,3]$, so the theorem does not apply directly (the integral is improper). The other integrands are continuous on their stated intervals."
            },
            {
              "q": "Let $g(x) = \\displaystyle\\int_0^x f(t)\\,dt$ where $f$ is continuous, $f(c)=0$, and $f$ changes from positive to negative as $t$ increases through $c$. What can you conclude about $g$ at $x=c$?",
              "choices": [
                "$g$ has an inflection point at $x=c$",
                "$g$ has a local minimum at $x=c$",
                "$g(c)=0$",
                "$g$ has a local maximum at $x=c$"
              ],
              "answer": 3,
              "explain": "By FTC Part 1, $g'(x)=f(x)$, so $g'(c)=f(c)=0$ and $g'$ changes from $+$ to $-$ at $c$, the first-derivative test condition for a local maximum. The distractor $g(c)=0$ confuses the value of the derivative $f(c)=0$ with the value of the accumulated area $g(c)$."
            },
            {
              "q": "The Fundamental Theorem of Calculus (Part 2) states that $\\int_a^b f(x)\\,dx$ equals (where $F$ is any antiderivative of $f$):",
              "choices": [
                "$F(b) - F(a)$",
                "$f(b) - f(a)$",
                "$F'(b) - F'(a)$",
                "$F(a) - F(b)$"
              ],
              "answer": 0,
              "explain": "FTC Part 2: to evaluate a definite integral, find any antiderivative $F$ (so $F'=f$) and compute $F(b)-F(a)$. This turns the hard limit-of-Riemann-sums definition into simple subtraction — the reason integration is practical at all."
            },
            {
              "q": "By the Fundamental Theorem of Calculus (Part 1), if $g(x) = \\int_a^x f(t)\\,dt$ with $f$ continuous, then $g'(x) = $",
              "choices": [
                "$f'(x)$",
                "$f(x) - f(a)$",
                "$f(x)$",
                "$F(x)$"
              ],
              "answer": 2,
              "explain": "FTC Part 1: the derivative of an accumulation function returns the integrand, $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$ — differentiation undoes integration. (With a variable upper limit like $x^3$, the chain rule adds a factor: $\\frac{d}{dx}\\int_a^{x^3} f = f(x^3)\\cdot 3x^2$.)"
            },
            {
              "q": "Using the Fundamental Theorem, what is $\\int_0^1 x^2\\,dx$?",
              "choices": [
                "$1$",
                "$\\dfrac{1}{2}$",
                "$3$",
                "$\\dfrac{1}{3}$"
              ],
              "answer": 3,
              "explain": "An antiderivative of $x^2$ is $\\frac{x^3}{3}$, so $\\int_0^1 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}$."
            },
            {
              "q": "The Fundamental Theorem of Calculus establishes that differentiation and integration are:",
              "choices": [
                "completely unrelated",
                "inverse operations — each undoes the other",
                "the same operation",
                "both forms of multiplication"
              ],
              "answer": 1,
              "explain": "The FTC ties the two halves of calculus together: Part 1 shows differentiating an integral returns the integrand, and Part 2 shows integrating a derivative returns the original function's net change. Differentiation (local slope) and integration (accumulated area) are inverse processes."
            }
          ],
          "flashcards": [
            {
              "front": "State FTC Part 1 (derivative of an accumulation function).",
              "back": "If $f$ is continuous, then $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$. The rate of area accumulation equals the integrand at the upper limit."
            },
            {
              "front": "State FTC Part 2 (the evaluation theorem).",
              "back": "If $f$ is continuous on $[a,b]$ and $F'=f$, then $\\int_a^b f(x)\\,dx = F(b)-F(a)$ for any antiderivative $F$."
            },
            {
              "front": "Differentiate $\\int_{v(x)}^{u(x)} f(t)\\,dt$ with respect to $x$.",
              "back": "$f(u(x))\\,u'(x) - f(v(x))\\,v'(x)$: plug each limit into $f$, multiply by that limit's derivative, subtract the lower from the upper."
            },
            {
              "front": "Why do differentiation and integration count as inverse operations, and what is the 'slack'?",
              "back": "Integrate-then-differentiate recovers $f$ exactly (Part 1); differentiate-then-integrate recovers the net change $F(b)-F(a)$ (Part 2). The slack is the constant of integration, which differentiation destroys."
            },
            {
              "front": "What condition must hold to use FTC Part 2, and what's the classic violation?",
              "back": "$f$ must be continuous on all of $[a,b]$. Classic trap: $\\int_{-1}^{1}\\frac1{x^2}dx$ — the integrand blows up at $0$, so FTC doesn't apply and the integral diverges."
            },
            {
              "front": "What is an accumulation (area) function, and why use $t$ vs $x$?",
              "back": "$g(x)=\\int_a^x f(t)\\,dt$ = signed area from fixed $a$ to moving $x$. Use $t$ for the dummy integration variable so it doesn't collide with the limit $x$."
            }
          ],
          "homework": [
            {
              "prompt": "Evaluate $\\displaystyle\\int_0^{\\pi/4} \\sec^2 x\\,dx$ and $\\displaystyle\\int_1^{4} \\left(\\sqrt{x} - \\frac{2}{x^2}\\right)dx$ using FTC Part 2.",
              "hint": "Recall $\\frac{d}{dx}\\tan x = \\sec^2 x$, and rewrite $\\sqrt{x}=x^{1/2}$ and $2/x^2 = 2x^{-2}$ before applying the power rule.",
              "solution": "First integral: an antiderivative of $\\sec^2 x$ is $\\tan x$. So $\\int_0^{\\pi/4}\\sec^2 x\\,dx = \\tan(\\pi/4)-\\tan(0) = 1 - 0 = 1.$\n\nSecond integral: $\\int (x^{1/2} - 2x^{-2})dx = \\frac{x^{3/2}}{3/2} - 2\\cdot\\frac{x^{-1}}{-1} = \\frac{2}{3}x^{3/2} + \\frac{2}{x}$. Evaluate from 1 to 4. At $x=4$: $\\frac{2}{3}(8) + \\frac{2}{4} = \\frac{16}{3} + \\frac12 = \\frac{32}{6}+\\frac{3}{6} = \\frac{35}{6}$. At $x=1$: $\\frac{2}{3}(1) + 2 = \\frac{2}{3}+2 = \\frac{8}{3} = \\frac{16}{6}$. Difference: $\\frac{35}{6}-\\frac{16}{6} = \\frac{19}{6} \\approx 3.17.$"
            },
            {
              "prompt": "Let $g(x) = \\displaystyle\\int_{\\cos x}^{x^2} \\frac{1}{1+t^4}\\,dt$. Find $g'(x)$.",
              "hint": "Two variable limits. Use $\\frac{d}{dx}\\int_{v(x)}^{u(x)} f\\,dt = f(u)u' - f(v)v'$ with $u=x^2$, $v=\\cos x$. Don't forget the derivative of $\\cos x$.",
              "solution": "Here $f(t)=\\frac{1}{1+t^4}$, $u(x)=x^2$ with $u'(x)=2x$, and $v(x)=\\cos x$ with $v'(x)=-\\sin x$. Apply the both-limits formula:\n$$g'(x) = f(x^2)\\cdot 2x - f(\\cos x)\\cdot(-\\sin x) = \\frac{2x}{1+(x^2)^4} + \\frac{\\sin x}{1+\\cos^4 x}.$$\nSimplify the first denominator: $(x^2)^4 = x^8$, giving $g'(x) = \\dfrac{2x}{1+x^8} + \\dfrac{\\sin x}{1+\\cos^4 x}$. Note the lower-limit term becomes $+$ because $v'=-\\sin x$ and the formula already carries a minus, so the two negatives cancel."
            },
            {
              "prompt": "Define $g(x)=\\int_0^x f(t)\\,dt$ where $f$ is continuous, $f(2)=0$, $f$ is positive on $[0,2)$, and $f$ is negative on $(2,5]$. On the interval $[0,5]$, where does $g$ attain its maximum value, and is $g(2)$ a local max or min of $g$? Justify using the FTC.",
              "hint": "By FTC Part 1, $g'(x)=f(x)$. Use the sign of $f$ to determine where $g$ increases/decreases, then apply the first-derivative test at $x=2$.",
              "solution": "By FTC Part 1, $g'(x)=f(x)$. Since $f>0$ on $[0,2)$, $g'>0$ there, so $g$ is increasing on $[0,2)$. Since $f<0$ on $(2,5]$, $g'<0$ there, so $g$ is decreasing on $(2,5]$. The critical point is at $x=2$ where $g'(2)=f(2)=0$. Because $g'$ changes from positive to negative at $x=2$, the first-derivative test says $x=2$ is a local maximum. As $g$ increases up to $x=2$ then decreases afterward, $x=2$ is also where $g$ attains its maximum value on $[0,5]$. Intuitively: $g$ accumulates positive area until $x=2$, then starts losing area, so the accumulated total peaks right at $x=2$."
            }
          ],
          "examples": [
            {
              "title": "Evaluating a Definite Integral by Antiderivative",
              "body": "Use the Fundamental Theorem of Calculus to evaluate $\\int_1^3 (2x + 1)\\, dx$ exactly, without computing any Riemann sum.",
              "solution": "The FTC (Part 2, the evaluation version) says that if $F$ is any antiderivative of $f$ — meaning $F'(x) = f(x)$ — then\n\n$$\\int_a^b f(x)\\, dx = F(b) - F(a).$$\n\nSo the whole job is to find one antiderivative of the integrand and then subtract its values at the endpoints.\n\n<strong>Step 1: Find an antiderivative.</strong> We need $F$ with $F'(x) = 2x + 1$. Using the power rule in reverse (raise the exponent by one, divide by the new exponent):\n\n$$F(x) = \\frac{2x^2}{2} + x = x^2 + x.$$\n\nQuick check: $F'(x) = 2x + 1$. Good. (We don't need the $+C$ here — any constant cancels in the subtraction.)\n\n<strong>Step 2: Evaluate at the endpoints.</strong> A handy notation is $\\big[F(x)\\big]_a^b = F(b) - F(a)$.\n\n$$\\int_1^3 (2x+1)\\, dx = \\big[x^2 + x\\big]_1^3 = F(3) - F(1).$$\n\n$$F(3) = 3^2 + 3 = 9 + 3 = 12, \\qquad F(1) = 1^2 + 1 = 1 + 1 = 2.$$\n\n<strong>Step 3: Subtract.</strong>\n\n$$F(3) - F(1) = 12 - 2 = 10.$$\n\n<strong>Answer:</strong> $\\displaystyle \\int_1^3 (2x+1)\\, dx = 10$.\n\nSanity check via geometry: the region under $y = 2x+1$ from $x=1$ to $x=3$ is a trapezoid with parallel side-heights $3$ and $7$ and width $2$, so its area is $\\frac{1}{2}(3+7)(2) = 10$. The FTC gave us the same number with no slicing required."
            },
            {
              "title": "Differentiating an Integral with a Variable Upper Limit",
              "body": "Let $G(x) = \\displaystyle\\int_2^{x^2} \\cos(t)\\, dt$. Find $G'(x)$, and then evaluate $G'(\\sqrt{\\pi})$.",
              "solution": "This example uses the *other* direction of the FTC: Part 1, which says differentiation undoes integration. If\n\n$$A(x) = \\int_a^x f(t)\\, dt,$$\n\nthen $A$ is an antiderivative of $f$, i.e. $A'(x) = f(x)$. The accumulated-area function, differentiated, just hands back the integrand evaluated at the moving endpoint.\n\n<strong>Step 1: Notice the upper limit is not just $x$.</strong> Here the top limit is $x^2$, not $x$, so we have a composition. Write $G(x) = A(x^2)$ where $A(u) = \\int_2^u \\cos(t)\\, dt$. By FTC Part 1, $A'(u) = \\cos(u)$.\n\n<strong>Step 2: Apply the chain rule.</strong> With $u = x^2$,\n\n$$G'(x) = A'(u) \\cdot \\frac{du}{dx} = \\cos(u) \\cdot \\frac{d}{dx}(x^2) = \\cos(x^2) \\cdot 2x.$$\n\nThe pattern to remember: plug the upper limit into the integrand, then multiply by the derivative of the upper limit.\n\n$$\\boxed{G'(x) = 2x\\,\\cos(x^2)}.$$\n\n<strong>Step 3: Evaluate at $x = \\sqrt{\\pi}$.</strong> Then $x^2 = \\pi$, so\n\n$$G'(\\sqrt{\\pi}) = 2\\sqrt{\\pi}\\,\\cos(\\pi) = 2\\sqrt{\\pi}\\,(-1) = -2\\sqrt{\\pi}.$$\n\n<strong>Answer:</strong> $G'(x) = 2x\\cos(x^2)$, and $G'(\\sqrt{\\pi}) = -2\\sqrt{\\pi}$.\n\nNotice we never had to find a closed form for the antiderivative of $\\cos$ inside $G$ itself — the FTC let us differentiate the integral directly, which is exactly the labor-saving 'inverse operations' idea at the heart of the theorem."
            },
            {
              "title": "The average value of a function",
              "body": "The FTC lets you average a continuous function, not just a list of numbers. Find the average value of $f(x) = x^2$ on $[0, 3]$.",
              "solution": "<strong>The formula.</strong> The average value of $f$ on $[a, b]$ is the integral divided by the width:\n$$\\bar{f} = \\frac{1}{b - a} \\int_a^b f(x)\\,dx.$$\n<strong>Evaluate the integral</strong> by the FTC, using the antiderivative $x^3/3$:\n$$\\int_0^3 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^3 = \\frac{27}{3} = 9.$$\n<strong>Divide by the width</strong> $b - a = 3$:\n$$\\bar{f} = \\frac{9}{3} = 3.$$\n<strong>What it means.</strong> A constant height of $3$ sweeps out the same area ($3 \\times 3 = 9$) over $[0, 3]$ as $x^2$ does — it's the height of the equal-area rectangle. Sanity check: $x^2$ runs from 0 to 9 here, and the average sits below the midpoint because the curve stays small for most of the interval."
            }
          ]
        },
        {
          "id": "c-integration-techniques",
          "title": "Integration Techniques: Substitution & By Parts",
          "minutes": 18,
          "content": "<h3>Why \"techniques\" at all? The asymmetry of differentiation and integration</h3>\n<p>Differentiation is an algorithm. Hand me any expression built from polynomials, exponentials, logs, and trig functions, and I can mechanically crank out its derivative using the product, quotient, and chain rules. There is no creativity required — it is bookkeeping.</p>\n<p>Integration is the reverse problem: given $f$, find an $F$ with $F'(x) = f(x)$ (an <strong>antiderivative</strong>). And reversing an algorithm is generally hard. There is no universal procedure; in fact many perfectly innocent functions, like $e^{-x^2}$, have <em>no</em> antiderivative expressible in elementary terms. So instead of one algorithm we collect a toolbox of <strong>techniques</strong>, each of which is the reverse of a differentiation rule. The two most important — and the two you will use 90% of the time — are:</p>\n<ul>\n<li><strong>u-substitution</strong>, which reverses the <em>chain rule</em>.</li>\n<li><strong>Integration by parts</strong>, which reverses the <em>product rule</em>.</li>\n</ul>\n<p>Master these two and the meta-skill of <em>choosing</em> between them, and you can handle the overwhelming majority of integrals you'll meet — including the ones lurking inside probability densities, expected values, and the normalizing constants of machine-learning models.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Every integration technique is a differentiation rule read backwards. If you ever forget a formula, re-derive it: write down the corresponding product/chain rule and integrate both sides. This is not just a memory trick — it is the actual logical source of the formula.</p>\n</div>\n\n<h3>u-substitution: the reverse chain rule</h3>\n<p>Recall the chain rule. If $F$ is an antiderivative of $f$, then</p>\n$$\\frac{d}{dx}\\,F(g(x)) = f(g(x))\\,g'(x).$$\n<p>Read that right-to-left as a statement about antiderivatives:</p>\n$$\\int f(g(x))\\,g'(x)\\,dx = F(g(x)) + C.$$\n<p>The whole technique is recognizing an integrand that has the shape \"<strong>(something composed with $g$) times $g'$</strong>.\" When you see it, substitute $u = g(x)$, so that $du = g'(x)\\,dx$, and the integral collapses to the much simpler</p>\n$$\\int f(u)\\,du = F(u) + C.$$\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$du = g'(x)\\,dx$ is the precise statement of the heuristic \"$u$ changes $g'(x)$ times as fast as $x$.\" Substitution is a change of the variable you're measuring along. The $g'(x)\\,dx$ factor is the conversion rate between the two rulers — it is exactly the leftover piece the chain rule would have produced.</p>\n</div>\n\n<h4>The mechanical recipe</h4>\n<ol>\n<li>Pick $u = g(x)$ — usually the \"inside\" of a composition, or whatever sits under a power/root/exponent.</li>\n<li>Compute $du = g'(x)\\,dx$.</li>\n<li>Rewrite the <em>entire</em> integrand and the $dx$ in terms of $u$ and $du$. Nothing in $x$ may survive.</li>\n<li>Integrate in $u$.</li>\n<li>Substitute back $u = g(x)$ (for indefinite integrals) — or, better for definite ones, change the limits (next section).</li>\n</ol>\n\n<h4>Worked example (indefinite)</h4>\n<p>Evaluate $\\displaystyle\\int 2x\\,e^{x^2}\\,dx$. The exponent's inside is $x^2$, and its derivative $2x$ appears as a factor — a textbook substitution. Let $u = x^2$, so $du = 2x\\,dx$:</p>\n$$\\int 2x\\,e^{x^2}\\,dx = \\int e^{u}\\,du = e^{u} + C = e^{x^2} + C.$$\n<p>Check by differentiating: $\\frac{d}{dx}e^{x^2} = e^{x^2}\\cdot 2x$. It matches, so we are done.</p>\n\n<h4>When $g'$ is \"almost\" there: fixing constants</h4>\n<p>Substitution tolerates missing <em>constant</em> factors but not missing variable factors. For $\\displaystyle\\int x\\cos(x^2)\\,dx$, set $u = x^2$, $du = 2x\\,dx$, so $x\\,dx = \\tfrac{1}{2}\\,du$:</p>\n$$\\int x\\cos(x^2)\\,dx = \\int \\cos(u)\\cdot\\tfrac{1}{2}\\,du = \\tfrac{1}{2}\\sin(u) + C = \\tfrac{1}{2}\\sin(x^2) + C.$$\n<p>If instead you faced $\\int \\cos(x^2)\\,dx$ with <em>no</em> $x$ factor at all, no algebraic fudge can manufacture one — and indeed this integral has no elementary antiderivative. The presence of (a constant multiple of) $g'$ is what licenses the whole move.</p>\n\n<h3>Definite integrals: change the limits, don't change back</h3>\n<p>For a definite integral, you have two honest options.</p>\n<p><strong>Option A — substitute back.</strong> Find the antiderivative in $x$, then plug in the original limits. Always correct, but wasteful.</p>\n<p><strong>Option B — change the limits.</strong> When you switch variables, switch the bounds too. The clean statement is the <strong>change-of-variables formula</strong>:</p>\n$$\\int_{a}^{b} f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du.$$\n<p>The new limits are the $u$-values corresponding to $x = a$ and $x = b$. Once you've changed the limits, you never convert back to $x$ — you finish entirely in $u$.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Common trap</div>\n<p>The number-one error in definite substitution is keeping the old $x$-limits while integrating in $u$. If you write $\\int_{0}^{1}$ before substituting, those $0$ and $1$ are <em>x</em>-values; after substituting $u = g(x)$ they are no longer the right bounds. Either relabel them as $g(0)$ and $g(1)$, or drop them, finish indefinitely, and re-substitute. Never mix the two.</p>\n</div>\n\n<h4>Worked example (definite, changing limits)</h4>\n<p>Evaluate $\\displaystyle\\int_{0}^{2} x\\,e^{x^2}\\,dx$. Let $u = x^2$, $du = 2x\\,dx$, so $x\\,dx = \\tfrac12 du$. Convert the limits: when $x = 0$, $u = 0$; when $x = 2$, $u = 4$. Then</p>\n$$\\int_{0}^{2} x\\,e^{x^2}\\,dx = \\int_{0}^{4} \\tfrac12 e^{u}\\,du = \\tfrac12\\big[e^{u}\\big]_{0}^{4} = \\tfrac12\\big(e^{4} - 1\\big) \\approx 26.80.$$\n<p>Notice the $x = 2$ limit became $u = 4$, not $u = 2$. That re-mapping of the bounds <em>is</em> the technique.</p>\n\n<h3>Integration by parts: the reverse product rule</h3>\n<div data-viz=\"calc-by-parts\"></div>\n<p>Start from the product rule for two functions $u(x)$ and $v(x)$:</p>\n$$\\frac{d}{dx}\\big(u v\\big) = u\\,v' + u'\\,v.$$\n<p>Integrate both sides over $x$. The left side integrates to $uv$; rearrange to isolate one of the two pieces on the right:</p>\n$$\\int u\\,v'\\,dx = uv - \\int u'\\,v\\,dx.$$\n<p>In the slick differential notation ($dv = v'\\,dx$, $du = u'\\,dx$) this is the form worth memorizing:</p>\n$$\\boxed{\\;\\int u\\,dv = uv - \\int v\\,du\\;}$$\n<p>The strategy: split the integrand into two parts, one labeled $u$ (which you will <em>differentiate</em>) and one labeled $dv$ (which you will <em>integrate</em> to get $v$). The bet is that the new integral $\\int v\\,du$ is easier than the one you started with. By-parts doesn't solve the integral outright — it <em>trades</em> it for a hopefully simpler one.</p>\n\n<h4>LIATE: how to pick <code>u</code></h4>\n<p>Choosing which factor is $u$ is the whole game. The <strong>LIATE</strong> heuristic ranks function types by how good a choice for $u$ they are — pick $u$ to be whichever factor comes <em>first</em> on this list:</p>\n<ul>\n<li><strong>L</strong> — Logarithmic ($\\ln x$, $\\log x$)</li>\n<li><strong>I</strong> — Inverse trig ($\\arctan x$, $\\arcsin x$)</li>\n<li><strong>A</strong> — Algebraic (polynomials, $x^n$)</li>\n<li><strong>T</strong> — Trigonometric ($\\sin x$, $\\cos x$)</li>\n<li><strong>E</strong> — Exponential ($e^x$, $a^x$)</li>\n</ul>\n<p>The logic: things near the top (logs, inverse trig) get <em>simpler</em> when differentiated — perfect for $u$. Things near the bottom (exponentials, sines) integrate back to themselves cleanly — perfect for $dv$. LIATE is a heuristic, not a theorem, but it works astonishingly often.</p>\n\n<h4>Worked example: $\\int x\\,e^{x}\\,dx$</h4>\n<p>Here we have Algebraic times Exponential. LIATE says A beats E, so $u = x$ (the algebraic factor) and $dv = e^{x}\\,dx$. Then $du = dx$ and $v = e^{x}$:</p>\n$$\\int x\\,e^{x}\\,dx = uv - \\int v\\,du = x e^{x} - \\int e^{x}\\,dx = x e^{x} - e^{x} + C = e^{x}(x - 1) + C.$$\n<p>Why was that the right split? Choosing $u = x$ replaced $x$ with $1$ in the leftover integral (differentiation shrank it), while $\\int e^x\\,dx$ is trivial. Had we chosen $u = e^x$ instead (so $dv = x\\,dx$), then $du = e^x dx$ and $v = x^2/2$ would have left us with $\\int \\frac{x^2}{2}e^x\\,dx$ — a <em>harder</em> integral. The bad choice makes things worse; LIATE steers you to the good one.</p>\n\n<h4>The \"trick\" example: $\\int \\ln x\\,dx$</h4>\n<p>There seems to be only one factor — but write it as $\\ln x \\cdot 1$. LIATE: L beats (the invisible) A, so $u = \\ln x$ and $dv = 1\\,dx$. Then $du = \\tfrac{1}{x}\\,dx$ and $v = x$:</p>\n$$\\int \\ln x\\,dx = x\\ln x - \\int x\\cdot\\tfrac{1}{x}\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C.$$\n<p>This is the standard way to integrate <em>any</em> \"lone\" function whose derivative is nice but whose antiderivative is not obvious (logs, $\\arctan$, $\\arcsin$): pair it with $dv = dx$.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>By-parts is a \"borrow against the future\" move. You can't integrate $\\ln x$ directly, but you <em>can</em> differentiate it (into $1/x$) and integrate the trivial $1$. By-parts lets you spend a derivative on the hard factor in exchange for an integral on the easy one. The bet pays off whenever the hard factor differentiates into something tame.</p>\n</div>\n\n<h4>Definite integration by parts</h4>\n<p>The definite version just evaluates the boundary term:</p>\n$$\\int_{a}^{b} u\\,dv = \\big[uv\\big]_{a}^{b} - \\int_{a}^{b} v\\,du.$$\n<p>For instance, $\\displaystyle\\int_{0}^{1} x e^{x}\\,dx = \\big[e^{x}(x-1)\\big]_{0}^{1} = \\big(e^{1}\\cdot 0\\big) - \\big(e^{0}\\cdot(-1)\\big) = 0 - (-1) = 1.$</p>\n\n<h3>Choosing the technique: a quick decision procedure</h3>\n<ol>\n<li>Is the integrand (a function of $g(x)$) times (a constant multiple of $g'(x)$)? If a chunk's derivative appears as a factor → <strong>u-substitution</strong>.</li>\n<li>Is it a <em>product of two different kinds</em> of function (poly × exp, poly × trig, $\\ln$ × anything, a lone $\\ln$/$\\arctan$)? → <strong>integration by parts</strong>, with $u$ chosen by LIATE.</li>\n<li>Sometimes you need both: substitute first to clean things up, then by-parts (or vice versa).</li>\n</ol>\n<p>A fast diagnostic: substitution wants to see a function <em>and its own derivative</em> together; by-parts wants to see a product of <em>unrelated</em> functions where one simplifies under differentiation.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>These two techniques are the workhorses of probability and hence of machine learning. The expected value $\\mathbb{E}[X] = \\int x\\,p(x)\\,dx$ for many distributions, the moments of the Gaussian, and the evidence/normalizing constants in Bayesian models are computed exactly this way. The Gamma function $\\Gamma(n) = \\int_0^\\infty x^{n-1}e^{-x}\\,dx$ — which underlies the Gamma, Beta, and Dirichlet priors everywhere in Bayesian ML — satisfies $\\Gamma(n) = (n-1)\\Gamma(n-1)$ precisely <em>because</em> of integration by parts on $x^{n-1}e^{-x}$ (algebraic × exponential, exactly the $x e^x$ pattern). And the change-of-variables formula for substitution generalizes directly to the Jacobian-determinant change of variables that makes <strong>normalizing flows</strong> work.</p>\n</div>\n\n<h3>Putting it together: a mixed worked example</h3>\n<p>Evaluate $\\displaystyle\\int x\\,\\ln(x^2 + 1)\\,dx$... actually let's do a cleaner combined case: $\\displaystyle\\int_0^1 \\arctan(x)\\,dx$ would need only by-parts, so instead consider $\\displaystyle\\int x^3 e^{x^2}\\,dx$, which genuinely needs both.</p>\n<p><strong>Step 1 — substitution.</strong> The exponent's inside is $x^2$. Let $u = x^2$, $du = 2x\\,dx$. Rewrite $x^3 = x^2\\cdot x$, and $x\\,dx = \\tfrac12\\,du$:</p>\n$$\\int x^3 e^{x^2}\\,dx = \\int x^2 e^{x^2}\\,(x\\,dx) = \\int u\\,e^{u}\\,\\tfrac12\\,du = \\tfrac12\\int u\\,e^{u}\\,du.$$\n<p><strong>Step 2 — by-parts</strong> on $\\int u e^u\\,du$. We already did this pattern: it equals $e^u(u-1)$. So</p>\n$$\\int x^3 e^{x^2}\\,dx = \\tfrac12\\,e^{u}(u - 1) + C = \\tfrac12\\,e^{x^2}\\big(x^2 - 1\\big) + C.$$\n<p>Verify by differentiating: $\\tfrac12\\big[e^{x^2}\\cdot 2x\\cdot(x^2-1) + e^{x^2}\\cdot 2x\\big] = \\tfrac12 e^{x^2}\\,2x\\,(x^2 - 1 + 1) = x^3 e^{x^2}.$ Correct. This \"substitute to simplify, then by-parts\" pattern is extremely common.</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>u-substitution</strong> reverses the chain rule: $\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du$. Spot a function and (a constant multiple of) its own derivative.</li>\n<li>For <strong>definite</strong> integrals, change the limits to $g(a)$ and $g(b)$ and finish in $u$ — or substitute back. Never mix old limits with the new variable.</li>\n<li><strong>Integration by parts</strong> reverses the product rule: $\\int u\\,dv = uv - \\int v\\,du$. It trades your integral for a (hopefully) easier one.</li>\n<li>Use <strong>LIATE</strong> (Log, Inverse-trig, Algebraic, Trig, Exponential) to pick $u$ — earlier = better $u$. Lone $\\ln x$ and $\\arctan x$ are integrated by pairing with $dv = dx$.</li>\n<li>Hard integrals often need substitution <em>then</em> by-parts.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the integration tricks are just derivative rules in reverse</summary>\n<p>Integration has no universal algorithm the way differentiation does — but its two workhorse techniques aren't ad hoc: each is a differentiation rule run <em>backward</em>.</p>\n<p><b>Substitution</b> is the chain rule reversed. The chain rule says $\\frac{d}{dx}F(g(x)) = F'(g(x))\\,g'(x)$; spotting an integrand of that shape lets you set $u = g(x)$, $du = g'(x)\\,dx$, and collapse $\\int f(g(x))\\,g'(x)\\,dx$ into the simpler $\\int f(u)\\,du$. <b>Integration by parts</b> is the product rule reversed: integrating $(uv)' = u'v + uv'$ and rearranging gives $\\int u\\,dv = uv - \\int v\\,du$ — trading one integral for another you hope is easier.</p>\n<p>The \"aha\": you aren't memorizing tricks, you're pattern-matching the output of a derivative rule and undoing it. That reframing is why \"what was this the derivative of?\" is the most useful question in all of integration.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: partial fractions for rational functions</summary>\n<p>$u$-substitution and integration by parts handle a lot, but <em>rational functions</em> (a polynomial over a polynomial) need their own move: <b>partial fractions</b> — split one complicated fraction into a <em>sum</em> of simple ones you already know how to integrate.</p>\n<p><b>The method.</b> Factor the denominator, then write the fraction as a sum with unknown numerators over each factor. Example: $\\dfrac{1}{(x-1)(x+1)} = \\dfrac{A}{x-1} + \\dfrac{B}{x+1}$. Clear denominators: $1 = A(x+1) + B(x-1)$. Plug in the roots — $x=1$ gives $A=\\tfrac12$, $x=-1$ gives $B=-\\tfrac12$. So the integral becomes $\\int\\!\\Big(\\tfrac{1/2}{x-1} - \\tfrac{1/2}{x+1}\\Big)dx = \\tfrac12\\ln|x-1| - \\tfrac12\\ln|x+1| + C$.</p>\n<p><b>Why it always works (for proper rationals).</b> Every proper rational function decomposes into terms of just a few types: $\\tfrac{A}{(x-r)^k}$ (integrates to logs or powers) and $\\tfrac{Bx+C}{(x^2+bx+c)^k}$ (integrates to logs and arctangents). So <em>any</em> rational integrand reduces to a sum of logs, powers, and arctangents — there is no rational function you cannot integrate this way (after polynomial long division if the top's degree is too high).</p>\n<p>The \"aha\": do not fight a big fraction whole — <em>break it apart</em>. Partial fractions turns an intimidating rational integrand into a sum of textbook pieces, which is why integrating rational functions is a fully solved, mechanical problem.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: when symbolic integration fails — numerical quadrature</summary>\n<p>The substitution and by-parts tricks (the other dives) handle the integrals that <em>have</em> a closed form — but most do not. When symbolic integration fails, you compute the definite integral <em>numerically</em>: approximate the area directly.</p>\n<p><b>From rectangles to parabolas.</b> The crudest estimate is a Riemann sum (rectangles). The <em>trapezoid rule</em> joins sample points with straight lines, with error shrinking like $h^2$. <strong>Simpson's rule</strong> fits <em>parabolas</em> through triples of points, $\\int_a^b f \\approx \\frac{h}{3}\\big(f_0+4f_1+2f_2+\\cdots+f_n\\big)$, with error $\\sim h^4$ — dramatically more accurate for the same number of samples.</p>\n<p><b>Gaussian quadrature.</b> Instead of evenly spaced points, <em>choose</em> both the sample locations and their weights to integrate polynomials exactly up to high degree. With $n$ cleverly placed points it nails every polynomial of degree up to $2n-1$ — the gold standard when you can evaluate $f$ anywhere.</p>\n<p>The \"aha\": when no antiderivative exists (the common case), you do not give up — you <em>approximate the area</em>. The trapezoid and especially Simpson's rule (error $\\sim h^4$) and Gaussian quadrature turn integration into evaluate-and-sum, which is how definite integrals are actually computed in practice.</p>\n</details>\n",
          "mcq": [
            {
              "q": "To evaluate the definite integral $\\int_{1}^{3} 2x\\,e^{x^2}\\,dx$ using $u = x^2$, what are the correct limits of integration in terms of $u$?",
              "choices": [
                "From $u=1$ to $u=3$ (keep the original limits)",
                "From $u=1$ to $u=9$",
                "From $u=2$ to $u=6$",
                "From $u=0$ to $u=9$"
              ],
              "answer": 1,
              "explain": "The limits must be re-mapped through $u=g(x)=x^2$: $x=1\\Rightarrow u=1$ and $x=3\\Rightarrow u=9$. Keeping $1$ and $3$ is the classic error of mixing x-limits with the u-variable."
            },
            {
              "q": "For $\\int x^2 \\ln x\\,dx$, which choice of $u$ does LIATE recommend, and why?",
              "choices": [
                "$u = x^2$, because the polynomial is simpler to differentiate",
                "$u = \\ln x$, because Logarithmic precedes Algebraic in LIATE",
                "$u = x^2 \\ln x$, integrating the whole thing as $dv = dx$",
                "Either works equally well; LIATE does not apply to this case"
              ],
              "answer": 1,
              "explain": "L (logarithmic) comes before A (algebraic), so $u=\\ln x$ (which differentiates to the tame $1/x$) and $dv = x^2\\,dx$, giving $v=x^3/3$. This leaves $\\int v\\cdot\\frac1x\\,dx = \\int \\frac{x^2}{3}\\,dx$, a simple polynomial integral."
            },
            {
              "q": "Which integral is a good candidate for u-substitution rather than integration by parts?",
              "choices": [
                "$\\int \\frac{\\cos x}{\\sin x}\\,dx$",
                "$\\int x\\sin x\\,dx$",
                "$\\int \\ln x\\,dx$",
                "$\\int x e^{x}\\,dx$"
              ],
              "answer": 0,
              "explain": "In $\\int \\frac{\\cos x}{\\sin x}dx$, the numerator $\\cos x$ is exactly the derivative of $\\sin x$, so $u=\\sin x$ gives $\\int du/u$. The other three are products of unrelated function types, calling for by-parts."
            },
            {
              "q": "Why does choosing $u = e^x$ (instead of $u = x$) fail for $\\int x e^x\\,dx$?",
              "choices": [
                "Because $e^x$ has no antiderivative",
                "Because LIATE forbids exponentials from ever being $u$",
                "Because it leaves the harder integral $\\int \\frac{x^2}{2}e^x\\,dx$",
                "Because $du$ would then be undefined"
              ],
              "answer": 2,
              "explain": "With $u=e^x$ (so $dv=x\\,dx$), we get $du=e^x dx$ and $v=x^2/2$, so $\\int v\\,du = \\int \\frac{x^2}{2}e^x\\,dx$ — a higher power of $x$, i.e. harder. A good $u$ should simplify under differentiation, which is why $u=x$ (LIATE: A before E) is correct."
            },
            {
              "q": "The lesson says every integration technique is \"a differentiation rule read backwards.\" Integrating both sides of the product rule $\\frac{d}{dx}[uv] = u\\,\\frac{dv}{dx} + v\\,\\frac{du}{dx}$ and rearranging gives which formula?",
              "choices": [
                "$\\int u\\,dv = uv - \\int v\\,du$",
                "$\\int u\\,dv = uv + \\int v\\,du$",
                "$\\int u\\,dv = \\frac{1}{2}(uv)^2 + C$",
                "$\\int u\\,dv = \\int u\\,du \\cdot \\int v\\,dv$"
              ],
              "answer": 0,
              "explain": "Integrating $\\frac{d}{dx}[uv]$ gives $uv = \\int u\\,dv + \\int v\\,du$, which rearranges to the integration-by-parts formula $\\int u\\,dv = uv - \\int v\\,du$."
            },
            {
              "q": "The lesson notes that $e^{-x^2}$ \"has no antiderivative expressible in elementary terms.\" What is the correct takeaway from this fact?",
              "choices": [
                "Its derivative also fails to exist in elementary terms",
                "The function $e^{-x^2}$ is not integrable and has no area under its curve",
                "You can always find its antiderivative with u-substitution if you pick the right $u$",
                "Integration has no single universal algorithm, so some elementary functions simply cannot be antidifferentiated in closed form"
              ],
              "answer": 3,
              "explain": "The lesson uses $e^{-x^2}$ to illustrate that, unlike differentiation, integration has no universal procedure and some innocent-looking functions lack elementary antiderivatives even though the area (a definite integral) still exists."
            },
            {
              "q": "In the mechanical recipe for u-substitution, the lesson stresses that when you rewrite the integrand, \"nothing in $x$ may survive.\" After setting $u = x^2$ for $\\int x^3 e^{x^2}\\,dx$, which rewrite correctly leaves the integral entirely in $u$?",
              "choices": [
                "$\\frac{1}{2}\\int u\\,e^{u}\\,du$",
                "$\\int x\\,e^{u}\\,du$",
                "$\\frac{1}{2}\\int u\\,e^{u}\\,dx$",
                "$\\int u^{3}\\,e^{u}\\,du$"
              ],
              "answer": 0,
              "explain": "With $u=x^2$, $du=2x\\,dx$ so $x\\,dx=\\tfrac{1}{2}du$, and writing $x^3\\,dx = x^2\\cdot x\\,dx = u\\cdot\\tfrac12 du$ converts the integral fully to $\\frac{1}{2}\\int u\\,e^{u}\\,du$ with no $x$ remaining."
            },
            {
              "q": "The lesson describes $du = g'(x)\\,dx$ as the precise statement of which intuition about substitution?",
              "choices": [
                "That $g'(x)$ should be ignored because it cancels with the antiderivative",
                "That $du$ and $dx$ are always equal as long as $g$ is continuous",
                "That the constant $+C$ must be multiplied by $g'(x)$ after substituting back",
                "That $u$ changes $g'(x)$ times as fast as $x$, so $g'(x)\\,dx$ is the conversion rate between the two measuring rulers"
              ],
              "answer": 3,
              "explain": "The lesson frames $du = g'(x)\\,dx$ as the heuristic that $u$ changes $g'(x)$ times as fast as $x$, making $g'(x)\\,dx$ the conversion rate between variables and exactly the leftover piece the chain rule produces."
            },
            {
              "q": "Evaluate $\\int_0^{\\pi/2} \\sin x \\cos x \\, dx$ using the substitution $u = \\sin x$.",
              "choices": [
                "$1$",
                "$\\tfrac{1}{2}$",
                "$0$",
                "$\\tfrac{\\pi}{4}$"
              ],
              "answer": 1,
              "explain": "With $u=\\sin x$, $du=\\cos x\\,dx$; the limits become $u=0$ to $u=1$, giving $\\int_0^1 u\\,du = \\tfrac{1}{2}u^2\\big|_0^1 = \\tfrac12$. The value $\\tfrac{\\pi}{4}$ is a distractor from mistakenly keeping the original $x$-limits."
            },
            {
              "q": "When applying integration by parts $\\int u\\,dv = uv - \\int v\\,du$, what is the role of the constant of integration when finding $v$ from $dv$?",
              "choices": [
                "You must include $+C$ in $v$, or the final answer will be wrong",
                "You must include $+C$ only when the integral is definite",
                "Any antiderivative works for $v$; choosing $C=0$ is simplest and does not change the result",
                "$v$ must be the antiderivative whose value is zero at the lower limit"
              ],
              "answer": 2,
              "explain": "Adding a constant $C$ to $v$ contributes $Cu - \\int C\\,du = Cu - Cu = 0$, so it always cancels; hence $C=0$ is chosen for simplicity. Believing you must carry $+C$ in $v$ is a common misconception."
            },
            {
              "q": "A student tries to integrate $\\int 2x\\sqrt{x^2+1}\\,dx$ by parts, setting $u=2x$ and $dv=\\sqrt{x^2+1}\\,dx$. Why is this the wrong technique here?",
              "choices": [
                "Integration by parts never works on products containing a square root",
                "The factor $2x$ is (up to a constant) the derivative of the inside $x^2+1$, so u-substitution applies directly and by parts needs $\\int\\sqrt{x^2+1}\\,dx$, which is harder",
                "LIATE says the algebraic factor $2x$ should be $dv$, not $u$",
                "By parts requires $u$ to be a trig or exponential function"
              ],
              "answer": 1,
              "explain": "Spotting that $2x\\,dx = d(x^2+1)$ signals u-substitution ($u=x^2+1$), giving $\\int\\sqrt{u}\\,du$ immediately. Choosing by parts forces you to compute $\\int\\sqrt{x^2+1}\\,dx$ for $v$, which is genuinely harder than the original problem."
            },
            {
              "q": "For $\\int e^x \\sin x\\,dx$, applying integration by parts twice returns the original integral with a coefficient. What does this 'circular' outcome tell you to do?",
              "choices": [
                "The integral diverges and has no antiderivative",
                "Switch to u-substitution since by parts has failed",
                "You picked $u$ and $dv$ inconsistently, so restart with a different choice each step",
                "Treat the result as an algebraic equation in the unknown integral $I$ and solve for $I$"
              ],
              "answer": 3,
              "explain": "Two consistent applications give $I = e^x\\sin x - e^x\\cos x - I$, an equation you solve to get $I = \\tfrac12 e^x(\\sin x - \\cos x) + C$. The recurrence is the intended mechanism, not a sign of failure or divergence."
            },
            {
              "q": "$u$-substitution is the integration technique that reverses which differentiation rule?",
              "choices": [
                "the chain rule",
                "the product rule",
                "the quotient rule",
                "the power rule"
              ],
              "answer": 0,
              "explain": "$u$-substitution undoes the chain rule: spot an inner function $u=g(x)$ together with its derivative $g'(x)\\,dx = du$, and the integral collapses to $\\int f(u)\\,du$. (Integration by parts, in contrast, reverses the *product* rule.)"
            },
            {
              "q": "The integration-by-parts formula is $\\int u\\,dv = $",
              "choices": [
                "$uv + \\int v\\,du$",
                "$\\int v\\,du - uv$",
                "$u'v - \\int u v\\,dx$",
                "$uv - \\int v\\,du$"
              ],
              "answer": 3,
              "explain": "$\\int u\\,dv = uv - \\int v\\,du$. It comes from integrating the product rule $(uv)' = u'v + uv'$ and rearranging. The art is choosing $u$ (something that simplifies when differentiated) and $dv$ (something you can integrate) — the LIATE guideline helps."
            },
            {
              "q": "Evaluate $\\int \\dfrac{2x}{x^2+1}\\,dx$.",
              "choices": [
                "$\\dfrac{1}{x^2+1} + C$",
                "$2\\ln(x^2+1) + C$",
                "$\\ln(x^2+1) + C$",
                "$\\arctan x + C$"
              ],
              "answer": 2,
              "explain": "Substitute $u = x^2+1$, so $du = 2x\\,dx$ — exactly the numerator. The integral becomes $\\int \\frac{du}{u} = \\ln|u| + C = \\ln(x^2+1)+C$ (the argument is always positive, so no absolute value needed). Spotting 'derivative of the denominator on top' is the classic $\\ln$ pattern."
            },
            {
              "q": "Integration by parts is the natural choice for an integral that is a:",
              "choices": [
                "composition $f(g(x))\\cdot g'(x)$",
                "ratio of two polynomials",
                "product of two different kinds of functions (e.g. a polynomial times an exponential, log, or trig) where one factor simplifies when differentiated",
                "single power of $x$"
              ],
              "answer": 2,
              "explain": "Integration by parts shines on products like $x e^x$, $x\\ln x$, or $x\\sin x$ — pick the factor that gets simpler when differentiated as $u$. A composition with its inner derivative present (option 3) calls for $u$-substitution instead; a single power uses the power rule."
            }
          ],
          "flashcards": [
            {
              "front": "State the u-substitution formula and what differentiation rule it reverses.",
              "back": "$\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du$ where $u=g(x)$, $du=g'(x)\\,dx$. It reverses the chain rule."
            },
            {
              "front": "When doing a definite integral by substitution $u=g(x)$, what happens to the limits?",
              "back": "They change to $u$-values: $\\int_a^b f(g(x))g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$. Finish in $u$ with the new limits — don't reuse the old x-limits."
            },
            {
              "front": "State the integration-by-parts formula and the rule it reverses.",
              "back": "$\\int u\\,dv = uv - \\int v\\,du$. It reverses the product rule $(uv)' = u'v + uv'$."
            },
            {
              "front": "What does LIATE stand for, and how is it used?",
              "back": "Logarithmic, Inverse-trig, Algebraic, Trigonometric, Exponential. For by-parts, pick $u$ to be whichever factor comes FIRST in this list (it differentiates to something simpler); the rest is $dv$."
            },
            {
              "front": "How do you integrate $\\ln x$ (or $\\arctan x$) when it's the only factor?",
              "back": "Pair it with $dv = 1\\,dx$. For $\\ln x$: $u=\\ln x$, $dv=dx$ gives $x\\ln x - x + C$."
            },
            {
              "front": "What is $\\int x e^x\\,dx$?",
              "back": "$e^x(x-1)+C$, i.e. $xe^x - e^x + C$, via by-parts with $u=x$, $dv=e^x dx$."
            }
          ],
          "homework": [
            {
              "prompt": "Evaluate $\\int_{0}^{\\pi/2} \\sin(x)\\cos(x)\\,dx$ using substitution, and change the limits correctly.",
              "hint": "Let $u = \\sin x$. Then $du = \\cos x\\,dx$, and the $\\cos x\\,dx$ in the integrand is exactly $du$. Re-map both limits through $u=\\sin x$.",
              "solution": "Let $u=\\sin x$, so $du=\\cos x\\,dx$. Limits: $x=0\\Rightarrow u=\\sin 0=0$; $x=\\pi/2\\Rightarrow u=\\sin(\\pi/2)=1$. Then $\\int_0^{\\pi/2}\\sin x\\cos x\\,dx = \\int_0^1 u\\,du = \\big[\\tfrac{u^2}{2}\\big]_0^1 = \\tfrac12 - 0 = \\tfrac12.$"
            },
            {
              "prompt": "Evaluate $\\int x^2 e^{x}\\,dx$.",
              "hint": "By-parts with $u=x^2$ (LIATE: Algebraic before Exponential). You will need to apply integration by parts a second time to the leftover $\\int x e^x\\,dx$.",
              "solution": "First pass: $u=x^2$, $dv=e^x dx \\Rightarrow du=2x\\,dx$, $v=e^x$. So $\\int x^2 e^x dx = x^2 e^x - \\int 2x e^x dx = x^2 e^x - 2\\int x e^x dx.$ We know $\\int x e^x dx = e^x(x-1)$. Thus the answer is $x^2 e^x - 2e^x(x-1) + C = e^x(x^2 - 2x + 2) + C.$ (Check: differentiating gives $e^x(x^2-2x+2) + e^x(2x-2) = e^x x^2$.)"
            },
            {
              "prompt": "Evaluate $\\int \\frac{\\ln x}{x}\\,dx$. Decide which technique applies before computing.",
              "hint": "Don't reach for by-parts. Notice that $\\frac{1}{x}$ is the derivative of $\\ln x$ — this is a substitution in disguise.",
              "solution": "This is u-substitution, not by-parts. Let $u=\\ln x$, so $du = \\frac{1}{x}\\,dx$. Then $\\int \\frac{\\ln x}{x}\\,dx = \\int u\\,du = \\frac{u^2}{2} + C = \\frac{(\\ln x)^2}{2} + C.$ Recognizing that a function and its own derivative both appear is the cue for substitution over by-parts."
            }
          ],
          "examples": [
            {
              "title": "A clean u-substitution: reversing the chain rule",
              "body": "Evaluate the definite integral $$\\int_0^2 x\\, e^{x^2}\\, dx.$$ Notice the integrand contains a function and (a constant multiple of) its derivative — the signature of a substitution problem.",
              "solution": "The key observation is that $x$ is almost exactly the derivative of the inner function $x^2$. This is the fingerprint of a chain-rule-in-reverse, so we substitute the inner function.\n\n<strong>Step 1 — Choose $u$.</strong> Let $u = x^2$. Then\n$$\\frac{du}{dx} = 2x \\quad\\Longrightarrow\\quad du = 2x\\,dx \\quad\\Longrightarrow\\quad x\\,dx = \\tfrac{1}{2}\\,du.$$\nThe integrand splits neatly: $e^{x^2}$ becomes $e^{u}$, and the leftover $x\\,dx$ becomes $\\tfrac12\\,du$.\n\n<strong>Step 2 — Convert the limits.</strong> Because this is a definite integral, change the bounds to $u$-values instead of substituting back later:\n$$x = 0 \\;\\Rightarrow\\; u = 0^2 = 0, \\qquad x = 2 \\;\\Rightarrow\\; u = 2^2 = 4.$$\n\n<strong>Step 3 — Rewrite and integrate.</strong>\n$$\\int_0^2 x\\,e^{x^2}\\,dx = \\int_0^4 e^{u}\\cdot \\tfrac12\\,du = \\frac12\\int_0^4 e^{u}\\,du = \\frac12\\Big[e^{u}\\Big]_0^4.$$\n\n<strong>Step 4 — Evaluate.</strong>\n$$\\frac12\\big(e^{4} - e^{0}\\big) = \\frac12\\big(e^4 - 1\\big).$$\n\n<strong>Answer:</strong>\n$$\\int_0^2 x\\,e^{x^2}\\,dx = \\frac{e^4 - 1}{2} \\approx 26.80.$$\n\n*Sanity check:* differentiate $\\tfrac12 e^{x^2}$ via the chain rule: $\\tfrac12 \\cdot e^{x^2}\\cdot 2x = x e^{x^2}$, the original integrand. The substitution exactly undid the chain rule."
            },
            {
              "title": "Integration by parts twice: a polynomial times a sine",
              "body": "Compute the indefinite integral $$\\int x^2 \\sin x \\, dx.$$ There is no inner function whose derivative appears, so substitution fails — this is a job for integration by parts, applied more than once.",
              "solution": "Integration by parts reverses the product rule. The formula is\n$$\\int u\\,dv = uv - \\int v\\,du.$$\nThe art is choosing $u$ and $dv$. Differentiating the polynomial $x^2$ lowers its degree, so we pick $u = x^2$ to make the remaining integral simpler — the LIATE heuristic (Logs, Inverse trig, Algebraic, Trig, Exponential) also flags the algebraic factor for $u$.\n\n<strong>Step 1 — First application.</strong> Let\n$$u = x^2,\\quad dv = \\sin x\\,dx \\;\\Longrightarrow\\; du = 2x\\,dx,\\quad v = -\\cos x.$$\nThen\n$$\\int x^2 \\sin x\\,dx = -x^2\\cos x - \\int (-\\cos x)(2x)\\,dx = -x^2\\cos x + 2\\int x\\cos x\\,dx.$$\nThe new integral $\\int x\\cos x\\,dx$ has a lower-degree polynomial — progress.\n\n<strong>Step 2 — Second application</strong> on $\\int x\\cos x\\,dx$. Let\n$$u = x,\\quad dv = \\cos x\\,dx \\;\\Longrightarrow\\; du = dx,\\quad v = \\sin x.$$\nThen\n$$\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x - (-\\cos x) = x\\sin x + \\cos x.$$\n\n<strong>Step 3 — Combine.</strong> Substitute this result back into Step 1:\n$$\\int x^2 \\sin x\\,dx = -x^2\\cos x + 2\\big(x\\sin x + \\cos x\\big) + C.$$\n$$= -x^2\\cos x + 2x\\sin x + 2\\cos x + C.$$\n\n<strong>Answer:</strong>\n$$\\int x^2 \\sin x \\, dx = -x^2\\cos x + 2x\\sin x + 2\\cos x + C.$$\n\n*Sanity check:* differentiate the result. By the product rule,\n$$\\frac{d}{dx}\\big[-x^2\\cos x\\big] = -2x\\cos x + x^2\\sin x,$$\n$$\\frac{d}{dx}\\big[2x\\sin x\\big] = 2\\sin x + 2x\\cos x,$$\n$$\\frac{d}{dx}\\big[2\\cos x\\big] = -2\\sin x.$$\nAdding these, the $-2x\\cos x$ and $+2x\\cos x$ cancel and $+2\\sin x$ and $-2\\sin x$ cancel, leaving exactly $x^2\\sin x$. The two-step by-parts unwound the product rule correctly."
            },
            {
              "title": "Definite integrals by substitution: change the limits",
              "body": "Evaluate $\\int_0^1 2x\\,e^{x^2}\\,dx$ using the substitution $u = x^2$.",
              "solution": "<strong>Substitute, and transform the limits too.</strong> Let $u = x^2$, so $du = 2x\\,dx$ — the integrand's $2x\\,dx$ becomes $du$. Convert the bounds: $x = 0 \\Rightarrow u = 0$ and $x = 1 \\Rightarrow u = 1$. The integral becomes\n$$\\int_{x=0}^{x=1} 2x\\,e^{x^2}\\,dx = \\int_{u=0}^{u=1} e^u\\,du.$$\n<strong>Integrate in $u$.</strong> $\\int_0^1 e^u\\,du = e^u\\big|_0^1 = e^1 - e^0 = e - 1 \\approx 1.718$.\n<strong>Why change the limits.</strong> For a <em>definite</em> integral, once the bounds are rewritten in terms of $u$ you never back-substitute to $x$ — you evaluate directly in $u$. (For an <em>indefinite</em> integral you would substitute back, since there are no bounds.)\n<strong>The aha.</strong> Substitution is the chain rule run backward: it recognizes $2x\\,e^{x^2}$ as $\\tfrac{d}{dx}e^{x^2}$ in disguise. Spotting \"an inner function and a multiple of its derivative\" is the whole trick — then the integral collapses to an elementary one in $u$."
            }
          ]
        }
      ]
    },
    {
      "id": "c-applications-integration",
      "title": "Applications of Integration & Differential Equations",
      "lessons": [
        {
          "id": "c-area-volume",
          "title": "Area Between Curves & Volumes of Revolution",
          "minutes": 16,
          "content": "<h3>Why this lesson matters</h3>\n<p>The definite integral $\\int_a^b f(x)\\,dx$ is the engine for \"accumulate a quantity that varies continuously.\" Once you can set up an integral by <em>slicing</em> a region or solid into infinitesimal pieces, you can compute almost any geometric quantity — and, more importantly, you internalize the slicing pattern that reappears everywhere in applied math: expected values in probability, accumulated loss over a training run, the total work done by a varying force. In this lesson we use four classic applications — area between curves, disk/washer volumes, shell volumes, and average value — as a workshop for one transferable skill: <strong>write down the right Riemann slice, then integrate it.</strong></p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Every formula below is the same three-step move. (1) Cut the region into thin strips (or the solid into thin slabs/shells). (2) Write the area/volume of <em>one</em> generic slice as a function of its position, times its thickness $dx$ or $dy$. (3) Sum the slices with an integral. If you can do step 2 honestly, you never have to memorize a formula again.</p></div>\n\n<h3>1. Area between two curves</h3>\n<p>Suppose $f(x) \\ge g(x)$ on $[a,b]$. The region trapped between them has area equal to the accumulated gap between the curves. A vertical strip at position $x$ has height $f(x)-g(x)$ (top minus bottom) and width $dx$, so its area is $\\big(f(x)-g(x)\\big)\\,dx$. Summing:</p>\n$$A = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx = \\int_a^b (\\text{top} - \\text{bottom})\\,dx.$$\n<p>Two things matter and beginners get both wrong:</p>\n<ul>\n<li><strong>It is always top minus bottom, not the absolute value of the antiderivative difference.</strong> The integrand $f-g$ must be nonnegative on $[a,b]$. If the curves cross inside $[a,b]$, split the interval at the crossing points and flip the order on each piece, or integrate $|f-g|$ piecewise. Curves cross where $f(x)=g(x)$ — solving that equation is usually how you find $a$ and $b$ in the first place.</li>\n<li><strong>Sometimes integrating in $y$ is far easier.</strong> If the boundaries are naturally functions of $y$ (e.g. $x = h(y)$ on the right, $x = k(y)$ on the left), use horizontal strips of height $dy$ and width $(\\text{right} - \\text{left})$:\n$$A = \\int_c^d \\big(h(y) - k(y)\\big)\\,dy = \\int_c^d (\\text{right} - \\text{left})\\,dy.$$\n</li>\n</ul>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Choosing dx vs dy</div><p>Pick the slicing direction so that <em>one</em> strip touches the same pair of curves all the way across the region. If a vertical strip would hit different boundaries in different parts of the region (a common situation when a curve \"turns back\"), a horizontal strip — or splitting the region — saves you from setting up two or three separate integrals.</p></div>\n\n<h4>Worked micro-example (area)</h4>\n<p>Find the area enclosed by $y = x$ and $y = x^2$. Set them equal: $x = x^2 \\Rightarrow x(x-1)=0 \\Rightarrow x=0,1$. On $(0,1)$, $x \\ge x^2$ (test $x=\\tfrac12$: $0.5 > 0.25$), so the line is on top. Then\n$$A = \\int_0^1 (x - x^2)\\,dx = \\Big[\\tfrac{x^2}{2} - \\tfrac{x^3}{3}\\Big]_0^1 = \\tfrac12 - \\tfrac13 = \\tfrac16.$$</p>\n\n<p><b>Try it in code.</b> Approximate the area under a curve as a Riemann sum of thin rectangles — more rectangles, closer to the exact integral.</p>\n<div data-code=\"javascript\" data-expected=\"0.338\">// Approximate the area under f(x) = x^2 from 0 to 1\n// by summing n thin rectangles (a Riemann sum).\nconst f = x => x * x;\nconst n = 100, dx = 1 / n;\nlet area = 0;\nfor (let i = n; i >= 1; i--) area += f(i * dx) * dx;\nconsole.log(area.toFixed(3));   // approaches the exact integral 1/3</div>\n<h3>2. Volumes of revolution: the slicing philosophy</h3>\n<p>Revolve a planar region around a line (the <em>axis</em>) and you sweep out a solid. There are two natural ways to slice that solid, and they correspond to slicing the <em>original region</em> in two different directions.</p>\n<ul>\n<li><strong>Disk / washer (slices perpendicular to the axis).</strong> Each slice is a thin coin. If the region touches the axis, the coin is a solid disk; if there's a gap, it's a washer (a disk with a hole). The slice thickness runs <em>along</em> the axis.</li>\n<li><strong>Shell (slices parallel to the axis).</strong> Each slice is a thin cylindrical shell, like a soup-can label of infinitesimal thickness. The slice thickness runs <em>perpendicular</em> to the axis.</li>\n</ul>\n\n<h4>Disk and washer method</h4>\n<p>The area of a circle of radius $r$ is $\\pi r^2$. A disk of thickness $dx$ has volume $\\pi r^2\\,dx$. When revolving the region under $y=f(x)$ around the $x$-axis, the radius of the slice at position $x$ is exactly $f(x)$:</p>\n$$V = \\int_a^b \\pi\\,[f(x)]^2\\,dx \\quad(\\text{disk, axis} = x\\text{-axis}).$$\n<p>If the region lies between an outer boundary $R(x)$ and an inner boundary $r(x)$ (a gap between the region and the axis), each slice is a washer with area $\\pi R^2 - \\pi r^2$:</p>\n$$V = \\int_a^b \\pi\\big([R(x)]^2 - [r(x)]^2\\big)\\,dx.$$\n<div class=\"callout\"><div class=\"c-tag\">Watch the trap</div><p>$\\;R^2 - r^2 \\ne (R-r)^2$. You subtract the <em>squares of the radii</em>, not the square of the difference. Geometrically you're subtracting two circular areas, and area scales with radius squared.</p></div>\n<p>Two rules of thumb make the method foolproof. (a) Each radius is the <strong>distance from the axis of revolution to the curve</strong> — not the curve's value, unless the axis is the coordinate axis. If you revolve around $y = c$, the radius is $|f(x) - c|$. (b) The integration variable is whichever runs <em>along</em> the axis: revolve around a horizontal axis $\\Rightarrow$ integrate in $x$; revolve around a vertical axis $\\Rightarrow$ integrate in $y$ (and express boundaries as functions of $y$).</p>\n\n<h4>Cylindrical shell method</h4>\n<p>Unroll a thin cylindrical shell of radius $r$, height $h$, thickness $dr$ and it becomes a flat sheet: length = circumference $2\\pi r$, height $h$, thickness $dr$. So one shell has volume $2\\pi r\\, h\\, dr$. For a region revolved around the $y$-axis, slice the region into vertical strips at position $x$; each strip has radius $x$ (distance to the axis) and height $f(x)$:</p>\n$$V = \\int_a^b 2\\pi\\, x\\, f(x)\\,dx \\quad(\\text{shells, axis} = y\\text{-axis}).$$\n<p>More generally $V = \\int 2\\pi\\,(\\text{radius})\\,(\\text{height})\\,(\\text{thickness})$, where radius = distance from the strip to the axis and height = the strip's length.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">How to choose disk/washer vs shell</div><p>Match the strip direction to what you can integrate. <strong>Disk/washer slices are perpendicular to the axis; shell slices are parallel to it.</strong> Practical heuristic: if revolving around a vertical axis and the curves are given as $y=f(x)$, <em>shells in $x$</em> avoid solving for $x$ in terms of $y$. If revolving around a horizontal axis with $y=f(x)$, <em>disks/washers in $x$</em> are natural. When one method forces an ugly inverse function or a region split, the other method usually doesn't. Both always give the same number — choose the easier setup.</p></div>\n\n<h3>3. Fully worked example: same solid, two methods</h3>\n<p>Let the region $\\mathcal{R}$ be bounded by $y = x^2$, $y = 0$, and $x = 2$. Revolve $\\mathcal{R}$ about the $y$-axis and find the volume.</p>\n\n<h4>Method A — shells (the easy way here)</h4>\n<p>Revolving about a vertical axis with the curve given as $y=x^2$, vertical strips are ideal. A strip at position $x$ (for $0 \\le x \\le 2$) has:</p>\n<ul>\n<li>radius (distance to $y$-axis) $= x$,</li>\n<li>height $= x^2 - 0 = x^2$,</li>\n<li>thickness $= dx$.</li>\n</ul>\n$$V = \\int_0^2 2\\pi\\, x \\cdot x^2\\,dx = 2\\pi \\int_0^2 x^3\\,dx = 2\\pi\\Big[\\tfrac{x^4}{4}\\Big]_0^2 = 2\\pi \\cdot \\tfrac{16}{4} = 8\\pi.$$\n\n<h4>Method B — washers (the harder way, as a check)</h4>\n<p>Now slice perpendicular to the $y$-axis, so we integrate in $y$, with $y$ running from $0$ to $4$ (since at $x=2$, $y=4$). At height $y$, the slice is a washer:</p>\n<ul>\n<li>outer radius $R = 2$ (the line $x=2$),</li>\n<li>inner radius $r = \\sqrt{y}$ (from $y = x^2 \\Rightarrow x = \\sqrt{y}$),</li>\n<li>thickness $= dy$.</li>\n</ul>\n$$V = \\int_0^4 \\pi\\big(2^2 - (\\sqrt{y})^2\\big)\\,dy = \\pi \\int_0^4 (4 - y)\\,dy = \\pi\\Big[4y - \\tfrac{y^2}{2}\\Big]_0^4 = \\pi\\big(16 - 8\\big) = 8\\pi.$$\n<p>Both give $8\\pi$. Notice the washer setup forced us to (i) invert $y=x^2$ to $x=\\sqrt y$ and (ii) recognize the outer radius is the vertical line $x=2$, not the parabola — exactly the kind of subtlety the shell method sidestepped. This is the practical reason to learn both.</p>\n\n<h3>4. Average value of a function</h3>\n<p>The average of finitely many numbers is their sum over the count. The continuous analogue replaces the sum with an integral and the count with the length of the interval:</p>\n$$\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx.$$\n<p>Geometrically, $\\bar f$ is the height of the rectangle over $[a,b]$ whose area equals the area under $f$. The <strong>Mean Value Theorem for Integrals</strong> guarantees that if $f$ is continuous on $[a,b]$, there is at least one point $c \\in (a,b)$ where $f$ actually attains this average: $f(c) = \\bar f$. So the average value isn't just a formal quantity — the function literally equals its average somewhere.</p>\n<p>Example: the average of $f(x)=x^2$ on $[0,3]$ is $\\frac{1}{3}\\int_0^3 x^2\\,dx = \\frac{1}{3}\\cdot\\frac{27}{3} = 3$. And indeed $f(c)=3$ at $c=\\sqrt3 \\in (0,3)$.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Connection to ML / AI</div><p>The average-value integral is the deterministic skeleton of an <strong>expectation</strong>. For a continuous random variable $X$ with density $p(x)$, $\\mathbb{E}[g(X)] = \\int g(x)\\,p(x)\\,dx$ — a weighted average where the \"weight\" is the probability density. The uniform-distribution case ($p(x) = \\tfrac{1}{b-a}$ on $[a,b]$) is <em>exactly</em> the average-value formula. When you minimize an expected loss $\\mathbb{E}_{x\\sim p}[\\ell(x)]$ during training, you're computing an integral of this form; mini-batch gradient descent is literally a Monte-Carlo Riemann-style estimate of it. And the disk/washer/shell idea — decompose a hard quantity into a sum of slices whose contributions you can compute — is the same decomposition behind marginalizing a joint distribution and behind every integral that shows up in a continuous probabilistic model.</p></div>\n\n<h3>5. Setup checklist (use this every time)</h3>\n<ol>\n<li><strong>Sketch</strong> the region and find intersection points (set curves equal). These become your limits.</li>\n<li><strong>Choose strip direction</strong>: vertical ($dx$) or horizontal ($dy$), aiming for a single integral with consistent boundaries.</li>\n<li><strong>Write one slice</strong>: for area, $(\\text{far}-\\text{near})$; for volume, $\\pi(R^2-r^2)$ (washer) or $2\\pi r h$ (shell).</li>\n<li><strong>Match the variable to the axis</strong> for volumes: integrate along the axis for disks/washers, perpendicular to it for shells.</li>\n<li><strong>Express radii as distances to the axis</strong> (subtract the axis location), then integrate.</li>\n</ol>\n<p>Master that loop and area, volume, average value, work, and expectation all become the same problem wearing different clothes.</p>\n<h4>Interactive — area between curves</h4>\n<div data-viz=\"calc-area\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: slice, approximate, integrate</summary>\n<p>Every area-and-volume formula comes from one template: <b>slice the region into thin pieces, approximate each piece's measure, sum, and take the limit</b> — which turns the sum into an integral. Only the slice shape changes.</p>\n<p><b>Area between curves</b>: vertical strips of width $dx$ and height (top minus bottom), so $A = \\int (f - g)\\,dx$. <b>Volume by disks</b>: rotate a region; each thin slice is a disk of radius $r(x)$ and thickness $dx$, area $\\pi r^2$, so $V = \\int \\pi r(x)^2\\,dx$. <b>Shells</b>: concentric cylindrical shells of radius $x$, height $h(x)$, thickness $dx$, so $V = \\int 2\\pi x\\,h(x)\\,dx$. Same idea, different slice geometry.</p>\n<p>The \"aha\": you never memorize a zoo of formulas — you set up <em>one representative slice</em>, write its infinitesimal contribution ($dA$ or $dV$), and integrate. The whole subject of applications of integration (also mass, work, arc length, probability) is: find the right slice, then sum it up.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: disks vs shells for volumes of revolution</summary>\n<p>\"Slice, approximate, integrate\" adapts to 3D — and for a solid of revolution there are <em>two</em> natural ways to slice, giving the disk/washer and shell methods.</p>\n<p><b>Disk / washer: slice perpendicular to the axis.</b> Cut the solid into thin coins. Each cross-section is a disk (or a washer, if there is a hole) of radius $R$, area $\\pi R^2$, so the volume is $V = \\int \\pi\\,[R(x)^2 - r(x)^2]\\,dx$. Natural when the radius is an easy function of position along the axis.</p>\n<p><b>Shell: slice parallel to the axis.</b> Cut the solid into nested cylindrical shells of radius $x$, height $h(x)$, thickness $dx$; each unrolls into a thin sheet of area $2\\pi x\\,h(x)$, giving $V = \\int 2\\pi x\\,h(x)\\,dx$. Natural when slicing perpendicular would need awkward inverse functions.</p>\n<p><b>Same volume, different integral.</b> Both methods compute the identical solid — you choose whichever makes the integral easier (rotating $y=f(x)$ about the $y$-axis is often far simpler with shells than washers, because shells avoid solving for $x$ in terms of $y$).</p>\n<p>The \"aha\": there is no single formula for \"volume of revolution\" — there is the principle (slice, approximate each slice, integrate) and two slicing directions. Recognizing which slicing yields the cleaner integrand is the whole skill.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: arc length and surface area (same slicing, new integrand)</summary>\n<p>\"Slice, approximate, integrate\" is not only for areas and volumes — the very same move measures the <em>length of a curve</em> and the <em>area of a surface</em>, just with a different infinitesimal piece.</p>\n<p><b>Arc length.</b> Cut a curve $y=f(x)$ into tiny segments. Each is the hypotenuse of a little right triangle with legs $dx$ and $dy$, so its length is $\\sqrt{dx^2 + dy^2} = \\sqrt{1 + (dy/dx)^2}\\,dx$. Summing (integrating) them gives the <b>arc length</b> $L = \\int_a^b \\sqrt{1 + \\big(\\tfrac{dy}{dx}\\big)^2}\\,dx$. Same recipe — slice, approximate each piece, integrate — but the piece is now a length, not an area.</p>\n<p><b>Surface of revolution.</b> Spin that curve around an axis and each tiny arc-length segment sweeps out a thin band (a frustum) of area $2\\pi\\,(\\text{radius})\\,ds$, where $ds$ is the arc-length element above. Integrating gives the <b>surface area</b> $\\int 2\\pi\\,y\\,\\sqrt{1+(dy/dx)^2}\\,dx$ — arc length carried around a circle.</p>\n<p>The \"aha\": the integral is not tied to \"area under a curve.\" Its real content is \"add up infinitely many infinitesimal pieces,\" and the piece can be a sliver of area, a disk of volume, a hypotenuse of length, or a band of surface. Recognize the right infinitesimal element and the same slice-approximate-integrate machinery measures all of them.</p>\n</details>\n",
          "mcq": [
            {
              "q": "To find the area between $y=f(x)$ and $y=g(x)$ on $[a,b]$ where the curves cross at an interior point $m$, which setup is correct?",
              "choices": [
                "$\\int_a^b (f-g)\\,dx$ regardless of crossings",
                "$\\int_a^m (\\text{top}-\\text{bottom})\\,dx + \\int_m^b (\\text{top}-\\text{bottom})\\,dx$, choosing top/bottom on each piece",
                "$\\left|\\int_a^b (f-g)\\,dx\\right|$",
                "$\\int_a^b (f-g)^2\\,dx$"
              ],
              "answer": 1,
              "explain": "Area is always (top - bottom) with a nonnegative integrand. When curves cross, you split at the crossing and reassign which curve is on top in each subinterval; a single signed integral or its absolute value can undercount."
            },
            {
              "q": "Revolving the region under $y=\\sqrt{x}$ on $[0,4]$ about the $x$-axis, the volume is:",
              "choices": [
                "$\\int_0^4 2\\pi x\\sqrt{x}\\,dx$",
                "$\\int_0^4 \\pi(4-\\sqrt{x})^2\\,dx$",
                "$\\int_0^4 \\pi\\sqrt{x}\\,dx$",
                "$\\int_0^4 \\pi(\\sqrt{x})^2\\,dx = \\int_0^4 \\pi x\\,dx$"
              ],
              "answer": 3,
              "explain": "Revolving around the x-axis, slices perpendicular to it are disks of radius $f(x)=\\sqrt{x}$, so each disk has area $\\pi(\\sqrt{x})^2=\\pi x$. The shell-style $2\\pi x\\cdot h$ form would apply for a vertical axis, not here."
            },
            {
              "q": "You revolve the region between $y=x^2$ and the $y$-axis (for $0\\le y\\le 1$) about the $y$-axis, with the curve given as $y=x^2$. Which method most directly avoids inverting the function?",
              "choices": [
                "Washers in $y$ (must write $x=\\sqrt{y}$)",
                "Shells in $x$ (radius $x$, height $1-x^2$)",
                "Disks in $x$",
                "Either method requires the same algebra"
              ],
              "answer": 1,
              "explain": "A vertical axis plus a curve given as $y=f(x)$ is the canonical case for cylindrical shells in $x$: radius $=x$, height $=1-x^2$, no inverse needed. Washers would force solving for $x$ in terms of $y$."
            },
            {
              "q": "The average value of $f$ on $[a,b]$ equals $\\frac{1}{b-a}\\int_a^b f\\,dx$. The Mean Value Theorem for Integrals adds that, if $f$ is continuous,",
              "choices": [
                "$f$ never actually equals its average on $(a,b)$",
                "the average equals $\\frac{f(a)+f(b)}{2}$",
                "there exists $c\\in(a,b)$ with $f(c)$ equal to that average value",
                "the average equals the maximum of $f$ on $[a,b]$"
              ],
              "answer": 2,
              "explain": "Continuity guarantees the function attains its average value at some interior point $c$; this is the integral form of the Mean Value Theorem. The endpoint-average and maximum formulas are not generally equal to the average value."
            },
            {
              "q": "A region is bounded by an outer radius $R(x)$ and an inner radius $r(x)$ from the axis of revolution. Which integrand correctly gives the volume of one washer slice of thickness $dx$?",
              "choices": [
                "$\\pi\\big(R(x)-r(x)\\big)^2\\,dx$",
                "$\\pi\\big([R(x)]^2+[r(x)]^2\\big)\\,dx$",
                "$2\\pi\\big(R(x)-r(x)\\big)\\,dx$",
                "$\\pi\\big([R(x)]^2-[r(x)]^2\\big)\\,dx$"
              ],
              "answer": 3,
              "explain": "A washer's area is the big circle minus the hole, $\\pi R^2 - \\pi r^2$, and crucially $R^2 - r^2 \\ne (R-r)^2$ because area scales with the square of the radius."
            },
            {
              "q": "You revolve the region under $y=f(x)$ on $[a,b]$ about the horizontal line $y=3$ (with the curve staying below $y=3$). Using disks, what is the radius of a slice at position $x$?",
              "choices": [
                "$f(x)$",
                "$3$",
                "$3 - f(x)$",
                "$f(x) - 3$"
              ],
              "answer": 2,
              "explain": "The radius is the distance from the axis of revolution to the curve, $|f(x)-3|$, which equals $3-f(x)$ when the curve lies below the line $y=3$."
            },
            {
              "q": "Why is the shell method often the easier choice when revolving a region given as $y=f(x)$ about the $y$-axis?",
              "choices": [
                "Shells require no value of $\\pi$ in the formula",
                "Shells always give a smaller volume, which is easier to compute",
                "It lets you integrate in $x$ without solving $y=f(x)$ for $x$ in terms of $y$",
                "The washer method cannot be used for vertical axes at all"
              ],
              "answer": 2,
              "explain": "Shells use vertical strips integrated in $x$ (radius $x$, height $f(x)$), avoiding the inversion to $x=f^{-1}(y)$ that the washer method in $y$ would force."
            },
            {
              "q": "The Mean Value Theorem for Integrals says that for $f$ continuous on $[a,b]$, there is some $c\\in(a,b)$ with $f(c)$ equal to which quantity?",
              "choices": [
                "$\\int_a^b f(x)\\,dx$",
                "$\\dfrac{f(a)+f(b)}{2}$",
                "$\\dfrac{f(b)-f(a)}{b-a}$",
                "$\\dfrac{1}{b-a}\\int_a^b f(x)\\,dx$"
              ],
              "answer": 3,
              "explain": "The theorem guarantees the function actually attains its average value $\\bar f = \\frac{1}{b-a}\\int_a^b f\\,dx$ at some interior point $c$; choice 3 is the average of the endpoints and choice 4 is the secant slope from the derivative MVT."
            },
            {
              "q": "You computed the average value of $f$ on $[a,b]$ as $\\bar f=\\frac{1}{b-a}\\int_a^b f\\,dx$. A student claims the Mean Value Theorem for Integrals guarantees the function actually hits $\\bar f$ somewhere on the interval. For which function does this guarantee FAIL?",
              "choices": [
                "$f(x)=\\begin{cases}0,&x<1\\\\1,&x\\ge 1\\end{cases}$ on $[0,2]$",
                "$f(x)=\\sin x$ on $[0,\\pi]$",
                "$f(x)=x^2$ on $[0,3]$",
                "$f(x)=e^x$ on $[0,1]$"
              ],
              "answer": 0,
              "explain": "The MVT for Integrals requires $f$ to be continuous; the step function is discontinuous at $x=1$, has average value $\\tfrac12$, yet never equals $\\tfrac12$, so the guarantee fails. The other three are continuous, so the theorem applies."
            },
            {
              "q": "Find the area enclosed between $y=4-x^2$ and $y=x^2-4$.",
              "choices": [
                "$\\dfrac{64}{3}$",
                "$\\dfrac{32}{3}$",
                "$16$",
                "$\\dfrac{128}{3}$"
              ],
              "answer": 0,
              "explain": "The curves meet where $4-x^2=x^2-4\\Rightarrow x=\\pm 2$, and on $(-2,2)$ the upper curve is $4-x^2$. So $A=\\int_{-2}^{2}\\big[(4-x^2)-(x^2-4)\\big]dx=\\int_{-2}^{2}(8-2x^2)dx=\\big[8x-\\tfrac{2x^3}{3}\\big]_{-2}^{2}=\\tfrac{64}{3}$. The distractor $\\tfrac{32}{3}$ comes from integrating only over $[0,2]$ and forgetting the region's symmetry."
            },
            {
              "q": "The region bounded by $y=x$ and $y=x^2$ is revolved about the $x$-axis. Which integral correctly gives the volume by washers?",
              "choices": [
                "$\\displaystyle\\int_0^1 \\pi\\big(x^2-x^4\\big)\\,dx$",
                "$\\displaystyle\\int_0^1 \\pi\\big(x-x^2\\big)\\,dx$",
                "$\\displaystyle\\int_0^1 \\pi\\big(x-x^2\\big)^2\\,dx$",
                "$\\displaystyle\\int_0^1 2\\pi\\, x\\,(x-x^2)\\,dx$"
              ],
              "answer": 0,
              "explain": "On $[0,1]$ the line $y=x$ is the outer radius and $y=x^2$ the inner, so each washer is $\\pi(R^2-r^2)=\\pi\\big(x^2-(x^2)^2\\big)=\\pi(x^2-x^4)$. Choice (a) is the classic error of squaring the difference of radii instead of subtracting the squares; choice (b) integrates $\\pi$ times the height difference $x-x^2$ (the region's area, not a washer cross-section); choice (d) is a shell integrand for the wrong axis."
            },
            {
              "q": "The region under $y=\\sqrt{x}$ on $[0,4]$ is revolved about the $y$-axis. Using cylindrical shells in $x$, what is the correct volume integral?",
              "choices": [
                "$\\displaystyle\\int_0^4 2\\pi\\, x\\,\\sqrt{x}\\,dx$",
                "$\\displaystyle\\int_0^2 2\\pi\\, y\\,(4-y^2)\\,dy$",
                "$\\displaystyle\\int_0^4 2\\pi\\,\\sqrt{x}\\,(\\sqrt{x})\\,dx$",
                "$\\displaystyle\\int_0^4 \\pi\\,(\\sqrt{x})^2\\,dx$"
              ],
              "answer": 0,
              "explain": "A shell at position $x$ has radius $x$ (distance to the $y$-axis), height $\\sqrt{x}$, and thickness $dx$, giving $\\int_0^4 2\\pi\\, x\\sqrt{x}\\,dx=\\tfrac{128\\pi}{5}$. Choice (c) wrongly uses $\\sqrt{x}$ as the radius (that is the height, not the distance to the axis), and choice (a) is a disk integrand about the wrong axis."
            },
            {
              "q": "The area between an upper curve $y=f(x)$ and a lower curve $y=g(x)$ on $[a,b]$ (with $f \\ge g$ throughout) is:",
              "choices": [
                "$\\int_a^b [f(x)+g(x)]\\,dx$",
                "$\\int_a^b [f(x)-g(x)]\\,dx$",
                "$\\int_a^b f(x)g(x)\\,dx$",
                "$\\int_a^b |f(x)|\\,dx$"
              ],
              "answer": 1,
              "explain": "Sum the vertical gaps (top minus bottom) across the interval: $\\int_a^b [f(x)-g(x)]\\,dx$. If the curves cross, split at the crossing points and integrate (upper − lower) on each piece so every contribution stays positive."
            },
            {
              "q": "Revolving the region under $y=f(x)$ on $[a,b]$ about the $x$-axis sweeps out a solid of volume (disk method):",
              "choices": [
                "$\\int_a^b f(x)\\,dx$",
                "$\\pi\\int_a^b [f(x)]^2\\,dx$",
                "$\\pi\\int_a^b f(x)\\,dx$",
                "$2\\pi\\int_a^b f(x)\\,dx$"
              ],
              "answer": 1,
              "explain": "Each thin slice perpendicular to the axis is a disk of radius $f(x)$ and area $\\pi[f(x)]^2$; integrating that area gives $V=\\pi\\int_a^b [f(x)]^2\\,dx$. The square is essential — it's the disk's area, not its radius."
            },
            {
              "q": "Revolving the region under $y=f(x)$ (for $0 \\le a \\le x \\le b$) about the $y$-axis, the cylindrical-shell method gives volume:",
              "choices": [
                "$\\int_a^b f(x)\\,dx$",
                "$\\pi\\int_a^b [f(x)]^2\\,dx$",
                "$2\\pi\\int_a^b x\\,f(x)\\,dx$",
                "$2\\pi\\int_a^b f(x)\\,dx$"
              ],
              "answer": 2,
              "explain": "Each shell at position $x$ has radius $x$, height $f(x)$, and thickness $dx$; unrolled it's a thin sheet of area $2\\pi x\\cdot f(x)$, so $V=2\\pi\\int_a^b x\\,f(x)\\,dx$. Shells avoid solving $y=f(x)$ for $x$, which is why they're handy for revolution about the $y$-axis."
            },
            {
              "q": "Find the area of the region between $y=x$ and $y=x^2$ on $[0,1]$.",
              "choices": [
                "$1$",
                "$\\dfrac{1}{3}$",
                "$\\dfrac{1}{2}$",
                "$\\dfrac{1}{6}$"
              ],
              "answer": 3,
              "explain": "On $[0,1]$, $x \\ge x^2$, so the area is $\\int_0^1 (x - x^2)\\,dx = \\left[\\tfrac{x^2}{2}-\\tfrac{x^3}{3}\\right]_0^1 = \\tfrac12 - \\tfrac13 = \\tfrac16$."
            }
          ],
          "flashcards": [
            {
              "front": "Area between two curves (vertical strips)",
              "back": "$A=\\int_a^b(\\text{top}-\\text{bottom})\\,dx$, with the integrand $\\ge 0$ throughout. Split at crossing points and swap top/bottom if the curves cross inside $[a,b]$."
            },
            {
              "front": "Washer method volume",
              "back": "$V=\\int \\pi\\big(R^2-r^2\\big)\\,d(\\text{var along axis})$, where $R$ and $r$ are the distances from the axis to the outer and inner boundaries. Note $R^2-r^2\\ne(R-r)^2$."
            },
            {
              "front": "Cylindrical shell volume",
              "back": "$V=\\int 2\\pi\\,(\\text{radius})\\,(\\text{height})\\,(\\text{thickness})$. For revolution about the $y$-axis: $V=\\int_a^b 2\\pi x\\,f(x)\\,dx$; radius = distance to axis, height = strip length."
            },
            {
              "front": "Disk vs washer vs shell: which variable to integrate?",
              "back": "Disk/washer slices are perpendicular to the axis -> integrate ALONG the axis. Shell slices are parallel to the axis -> integrate PERPENDICULAR to the axis. Pick whichever avoids inverting functions or splitting the region."
            },
            {
              "front": "Average value of a function",
              "back": "$\\bar f=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$. MVT for Integrals: if $f$ is continuous, some $c\\in(a,b)$ has $f(c)=\\bar f$."
            },
            {
              "front": "Why average value connects to ML",
              "back": "It is the expectation $\\mathbb{E}[g(X)]=\\int g(x)p(x)\\,dx$ under a uniform density $p=\\tfrac{1}{b-a}$. Expected-loss minimization is an integral of this form; mini-batch estimates approximate it."
            }
          ],
          "homework": [
            {
              "prompt": "Find the area of the region enclosed by $y=6-x^2$ and $y=x$.",
              "hint": "First find the intersection points by setting $6-x^2=x$. Then decide which curve is on top between them.",
              "solution": "Set $6-x^2=x \\Rightarrow x^2+x-6=0 \\Rightarrow (x+3)(x-2)=0$, so $x=-3$ and $x=2$. Test $x=0$: parabola gives $6$, line gives $0$, so the parabola is on top throughout $(-3,2)$. Then $A=\\int_{-3}^{2}\\big((6-x^2)-x\\big)\\,dx=\\int_{-3}^{2}(6-x-x^2)\\,dx=\\big[6x-\\tfrac{x^2}{2}-\\tfrac{x^3}{3}\\big]_{-3}^{2}$. At $x=2$: $12-2-\\tfrac{8}{3}=\\tfrac{22}{3}$. At $x=-3$: $-18-\\tfrac{9}{2}+9=-\\tfrac{27}{2}$. So $A=\\tfrac{22}{3}-(-\\tfrac{27}{2})=\\tfrac{44}{6}+\\tfrac{81}{6}=\\tfrac{125}{6}.$"
            },
            {
              "prompt": "The region bounded by $y=x^2$, $y=0$, and $x=1$ is revolved about the $y$-axis. Compute the volume using BOTH the shell method and the washer method, and confirm they agree.",
              "hint": "Shells: radius $x$, height $x^2$, integrate $x$ from 0 to 1. Washers: integrate in $y$ from 0 to 1, with outer radius 1 and inner radius $\\sqrt{y}$.",
              "solution": "Shells: $V=\\int_0^1 2\\pi x\\cdot x^2\\,dx=2\\pi\\int_0^1 x^3\\,dx=2\\pi\\cdot\\tfrac14=\\tfrac{\\pi}{2}$. Washers (in $y$, from 0 to 1, since $x=1\\Rightarrow y=1$): outer radius $R=1$, inner radius $r=\\sqrt{y}$, so $V=\\int_0^1\\pi\\big(1^2-(\\sqrt{y})^2\\big)\\,dy=\\pi\\int_0^1(1-y)\\,dy=\\pi\\big[y-\\tfrac{y^2}{2}\\big]_0^1=\\pi(1-\\tfrac12)=\\tfrac{\\pi}{2}$. Both methods give $\\tfrac{\\pi}{2}$."
            },
            {
              "prompt": "Find the average value of $f(x)=\\sin x$ over $[0,\\pi]$, and find a point $c\\in(0,\\pi)$ where $f(c)$ equals that average.",
              "hint": "Use $\\bar f=\\frac{1}{b-a}\\int_a^b f\\,dx$, then solve $\\sin c=\\bar f$.",
              "solution": "$\\bar f=\\frac{1}{\\pi-0}\\int_0^\\pi \\sin x\\,dx=\\frac{1}{\\pi}\\big[-\\cos x\\big]_0^\\pi=\\frac{1}{\\pi}\\big(-\\cos\\pi+\\cos 0\\big)=\\frac{1}{\\pi}(1+1)=\\frac{2}{\\pi}\\approx 0.6366$. To find $c$: solve $\\sin c=\\tfrac{2}{\\pi}$ on $(0,\\pi)$, giving $c=\\arcsin\\!\\big(\\tfrac{2}{\\pi}\\big)\\approx 0.690$ and also its supplement $c=\\pi-0.690\\approx 2.452$; both lie in $(0,\\pi)$, consistent with the Mean Value Theorem for Integrals."
            }
          ],
          "examples": [
            {
              "title": "Area between a parabola and a line",
              "body": "Find the area of the region enclosed by the parabola $y = 6 - x^2$ and the line $y = x$.",
              "solution": "Step 1 — Find where the curves meet (these give the limits $a$ and $b$). Set them equal:\n$$6 - x^2 = x \\;\\Rightarrow\\; x^2 + x - 6 = 0 \\;\\Rightarrow\\; (x+3)(x-2) = 0,$$\nso the curves cross at $x = -3$ and $x = 2$. The region runs over $[-3, 2]$.\n\nStep 2 — Decide which curve is on top. Test a point inside, say $x = 0$: the parabola gives $y = 6$, the line gives $y = 0$. So $6 - x^2 \\ge x$ on the whole interval, and a vertical strip has height $(\\text{top} - \\text{bottom}) = (6 - x^2) - x$.\n\nStep 3 — Integrate the strip area over $[-3, 2]$:\n$$A = \\int_{-3}^{2}\\big[(6 - x^2) - x\\big]\\,dx = \\int_{-3}^{2}\\big(6 - x - x^2\\big)\\,dx.$$\nAn antiderivative is $6x - \\frac{x^2}{2} - \\frac{x^3}{3}$. Evaluate at the endpoints:\n$$\\text{at } x=2:\\quad 12 - 2 - \\tfrac{8}{3} = 10 - \\tfrac{8}{3} = \\tfrac{22}{3},$$\n$$\\text{at } x=-3:\\quad -18 - \\tfrac{9}{2} + 9 = -9 - \\tfrac{9}{2} = -\\tfrac{27}{2}.$$\nSubtract:\n$$A = \\frac{22}{3} - \\left(-\\frac{27}{2}\\right) = \\frac{44}{6} + \\frac{81}{6} = \\frac{125}{6}.$$\n\nAnswer: the enclosed area is $\\dfrac{125}{6} \\approx 20.83$ square units. (Sanity check: the answer is positive, as an area must be, because we integrated top minus bottom.)"
            },
            {
              "title": "Washer volume about a line that is not a coordinate axis",
              "body": "The region bounded by $y = 2x$ and $y = x^2$ is revolved about the horizontal line $y = -1$. Find the volume of the resulting solid using the washer method.",
              "solution": "Step 1 — Find the region. Set the curves equal: $2x = x^2 \\Rightarrow x^2 - 2x = 0 \\Rightarrow x(x-2) = 0$, so they meet at $x = 0$ and $x = 2$. Test $x = 1$: the line gives $2$, the parabola gives $1$, so the line $y = 2x$ is the upper boundary and $y = x^2$ is the lower boundary on $[0, 2]$.\n\nStep 2 — Set up the radii as distances to the axis. We revolve about $y = -1$, not the $x$-axis, so each radius is the distance from that line to a curve, i.e. $(\\text{curve}) - (-1) = (\\text{curve}) + 1$. The curve farther from the axis gives the outer radius. Since $2x \\ge x^2$ on $[0,2]$, the upper curve $y = 2x$ is farther from $y = -1$, so:\n$$R(x) = 2x + 1 \\quad(\\text{outer}), \\qquad r(x) = x^2 + 1 \\quad(\\text{inner}).$$\n\nStep 3 — Each washer slice has area $\\pi\\big(R^2 - r^2\\big)$ and thickness $dx$. Remember $R^2 - r^2 \\ne (R-r)^2$; you subtract the squares of the radii. Expand:\n$$R^2 - r^2 = (2x+1)^2 - (x^2+1)^2 = (4x^2 + 4x + 1) - (x^4 + 2x^2 + 1) = -x^4 + 2x^2 + 4x.$$\n\nStep 4 — Integrate over $[0, 2]$:\n$$V = \\pi\\int_0^2 \\big(-x^4 + 2x^2 + 4x\\big)\\,dx = \\pi\\left[-\\frac{x^5}{5} + \\frac{2x^3}{3} + 2x^2\\right]_0^2.$$\nAt $x = 2$: $-\\dfrac{32}{5} + \\dfrac{16}{3} + 8$. Over a common denominator of $15$:\n$$-\\frac{96}{15} + \\frac{80}{15} + \\frac{120}{15} = \\frac{104}{15}.$$\n\nAnswer: $V = \\dfrac{104\\pi}{15} \\approx 21.78$ cubic units. (Note the key subtlety: had we revolved about the $x$-axis instead, the radii would have been $2x$ and $x^2$, giving $\\frac{64\\pi}{15}$ — the shift to $y=-1$ enlarges every radius by $1$ and changes the answer, which is why each radius must be measured as a distance to the actual axis.)"
            },
            {
              "title": "Volume by cylindrical shells",
              "body": "Rotate the region under $y = x^2$ on $[0, 2]$ about the <em>y</em>-axis. Find the volume — using shells, not washers.",
              "solution": "<strong>The shell picture.</strong> Slice the region into thin vertical strips at position $x$. Spun about the $y$-axis, each strip sweeps a thin cylindrical shell of radius $x$, height $f(x) = x^2$, and thickness $dx$ — lateral area $2\\pi x \\cdot f(x)$, so volume $2\\pi x\\,f(x)\\,dx$.\n<strong>Integrate the shells.</strong>\n$$V = \\int_0^2 2\\pi x \\cdot x^2\\,dx = 2\\pi \\int_0^2 x^3\\,dx = 2\\pi \\left[\\frac{x^4}{4}\\right]_0^2 = 2\\pi \\cdot 4 = 8\\pi \\approx 25.13.$$\n<strong>Shells vs washers.</strong> About the $y$-axis, washers would force you to invert $y = x^2$ into $x = \\sqrt{y}$ and integrate in $y$; shells integrate in $x$ — the variable the region is already written in — so you skip the inversion.\n<strong>Rule of thumb:</strong> shells shine when the axis of rotation is parallel to the strips you would naturally draw."
            }
          ]
        },
        {
          "id": "c-improper-integrals",
          "title": "Improper Integrals & Probability Connections",
          "minutes": 14,
          "content": "<h3>From Finite to Infinite: Why We Need Improper Integrals</h3>\n<p>The Riemann integral $\\int_a^b f(x)\\,dx$ is built for a <em>finite</em> interval $[a,b]$ and a <em>bounded</em> integrand. But many of the most useful quantities in science and machine learning live outside those guardrails. What is the total probability that a random waiting time is positive? That is $\\int_0^\\infty (\\text{density})\\,dx$ — an infinite interval. What is the area under a spike like $1/\\sqrt{x}$ near zero? That is $\\int_0^1 x^{-1/2}\\,dx$ — an integrand that blows up at an endpoint. These are <strong>improper integrals</strong>, and the entire theory of continuous probability rests on them.</p>\n<p>The central idea is disarmingly simple: we never actually integrate \"to infinity\" or \"through a singularity.\" Instead we integrate over a proper region, get an honest number depending on a parameter, and then take a <strong>limit</strong>. If the limit exists (and is finite), we say the integral <strong>converges</strong> and assign it that value; otherwise it <strong>diverges</strong>.</p>\n\n<h3>Type I: Infinite Intervals</h3>\n<p>When one or both limits of integration are infinite, define:</p>\n$$\\int_a^\\infty f(x)\\,dx = \\lim_{t\\to\\infty} \\int_a^t f(x)\\,dx, \\qquad \\int_{-\\infty}^b f(x)\\,dx = \\lim_{t\\to-\\infty} \\int_t^b f(x)\\,dx.$$\n<p>Each of these is a single limit. For a doubly-infinite integral we must split at any convenient finite point $c$ and require <em>both</em> halves to converge independently:</p>\n$$\\int_{-\\infty}^\\infty f(x)\\,dx = \\int_{-\\infty}^c f(x)\\,dx + \\int_c^\\infty f(x)\\,dx.$$\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>You are asking: as I push the boundary out forever, does the accumulated area settle down to a finite number, or does it keep growing without bound (or oscillate forever)? Convergence means the \"tail\" contributes ever-diminishing area fast enough that the total is finite.</p>\n</div>\n<p>A subtle but important warning: you may <strong>not</strong> compute $\\int_{-\\infty}^\\infty f$ as the symmetric limit $\\lim_{t\\to\\infty}\\int_{-t}^t f$ unless you already know convergence. That symmetric limit is the <strong>Cauchy principal value</strong>, and it can be finite even when the true integral diverges. For example $\\int_{-\\infty}^\\infty x\\,dx$ has principal value $0$ (the limits cancel), but the genuine integral diverges because $\\int_0^\\infty x\\,dx = \\infty$. In probability we always require true convergence, never just a principal value, so that expectations are well defined regardless of how we approach the limits.</p>\n\n<h4>The benchmark family: $p$-integrals at infinity</h4>\n<p>One result is worth memorizing because almost every convergence question reduces to it. For $a>0$:</p>\n$$\\int_a^\\infty \\frac{1}{x^p}\\,dx \\quad \\text{converges} \\iff p > 1.$$\n<p>Why? For $p\\neq 1$, $\\int_a^t x^{-p}\\,dx = \\dfrac{t^{1-p}-a^{1-p}}{1-p}$. As $t\\to\\infty$, $t^{1-p}\\to 0$ exactly when $1-p<0$, i.e. $p>1$. For $p=1$ we get $\\ln t - \\ln a \\to \\infty$. So $1/x$ diverges (the harmonic borderline), $1/x^2$ converges, $1/x^{1.001}$ converges. The decay must be <em>strictly</em> faster than $1/x$.</p>\n\n<h3>Type II: Unbounded Integrands (Singularities)</h3>\n<p>If $f$ has a vertical asymptote at an endpoint, the interval is finite but the function is not bounded, so the Riemann integral does not directly apply. We again retreat to a limit. If $f$ is continuous on $[a,b)$ but blows up as $x\\to b^-$:</p>\n$$\\int_a^b f(x)\\,dx = \\lim_{t\\to b^-} \\int_a^t f(x)\\,dx,$$\n<p>and symmetrically if the trouble is at the left endpoint $a$. If the singularity is at an <em>interior</em> point $c\\in(a,b)$, split there and require both pieces to converge:</p>\n$$\\int_a^b f = \\int_a^c f + \\int_c^b f.$$\n<div class=\"callout sage\">\n<div class=\"c-tag\">Common trap</div>\n<p>If you ignore an interior singularity and blindly apply the Fundamental Theorem of Calculus, you can get a confidently wrong (even negative) answer for a positive integrand. Example: $\\int_{-1}^{1} \\frac{1}{x^2}\\,dx$. Mechanically applying $[-1/x]_{-1}^1 = -1-1 = -2$ is nonsense — a positive function cannot have negative area. The function blows up at $x=0$; splitting shows each half diverges, so the integral diverges. Always scan the interval for points where the integrand is undefined before integrating.</p>\n</div>\n\n<h4>The benchmark family: $p$-integrals at a singularity</h4>\n<p>The mirror image of the tail result governs singularities. For the standard model singularity at $0$:</p>\n$$\\int_0^1 \\frac{1}{x^p}\\,dx \\quad \\text{converges} \\iff p < 1.$$\n<p>Note the inequality <em>flips</em>. Near a singularity, a milder blow-up (smaller $p$) is forgivable; near infinity, a faster decay (larger $p$) is needed. So $\\int_0^1 x^{-1/2}\\,dx = [2\\sqrt{x}]_0^1 = 2$ converges, while $\\int_0^1 x^{-1}\\,dx = \\ln x\\big|_0^1$ diverges. The two thresholds together — $p>1$ at infinity, $p<1$ at zero — are the backbone of convergence intuition.</p>\n\n<h3>Deciding Convergence Without Evaluating: Comparison Tests</h3>\n<p>Often we cannot find an antiderivative (think $e^{-x^2}$), yet we only need to know <em>whether</em> the integral is finite. Comparison tests answer that by bounding our function against a known benchmark. Assume $f,g$ are nonnegative and integrable on every finite subinterval.</p>\n<h4>Direct Comparison Test</h4>\n<ul>\n<li>If $0 \\le f(x) \\le g(x)$ and $\\int_a^\\infty g$ <strong>converges</strong>, then $\\int_a^\\infty f$ converges (a smaller nonnegative area under a finite ceiling is finite).</li>\n<li>If $0 \\le g(x) \\le f(x)$ and $\\int_a^\\infty g$ <strong>diverges</strong>, then $\\int_a^\\infty f$ diverges (it sits above something already infinite).</li>\n</ul>\n<h4>Limit Comparison Test</h4>\n<p>If $f,g>0$ and $\\displaystyle\\lim_{x\\to\\infty}\\frac{f(x)}{g(x)} = L$ with $0<L<\\infty$, then $\\int f$ and $\\int g$ either <strong>both converge or both diverge</strong>. This is usually easier: pick $g$ as the dominant-term benchmark and just check the ratio. For instance, $\\frac{x^2+1}{x^4+3x}$ behaves like $\\frac{x^2}{x^4}=\\frac{1}{x^2}$ as $x\\to\\infty$; since $\\int_1^\\infty x^{-2}$ converges ($p=2>1$), so does the original.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>The Gaussian $e^{-x^2}$ has no elementary antiderivative, yet its tails decay faster than any power of $1/x$, so $\\int_{-\\infty}^\\infty e^{-x^2}\\,dx$ converges (to $\\sqrt{\\pi}$). That convergence is exactly why the normal distribution — the workhorse prior in Bayesian inference, the limiting distribution of the Central Limit Theorem, the noise model in countless loss functions — is a valid probability density. Heavy-tailed alternatives (Cauchy, Student-$t$) decay only polynomially; whether their <em>moments</em> exist is a convergence question that decides whether mean and variance are even defined, which in turn governs whether estimators are stable.</p>\n</div>\n\n<h3>The Probability Connection: Densities and Expectation</h3>\n<p>A continuous random variable $X$ is described by a <strong>probability density function (PDF)</strong> $f(x)$. It must satisfy two axioms:</p>\n<ol>\n<li><strong>Nonnegativity:</strong> $f(x) \\ge 0$ for all $x$.</li>\n<li><strong>Normalization:</strong> $\\displaystyle\\int_{-\\infty}^\\infty f(x)\\,dx = 1$. The total probability mass is exactly one.</li>\n</ol>\n<p>That normalization integral is almost always improper — it runs over $(-\\infty,\\infty)$ or has a density that spikes at an endpoint. Probabilities of events are areas: $P(a \\le X \\le b) = \\int_a^b f(x)\\,dx$. Note that for a continuous variable $P(X=a)=\\int_a^a f = 0$; only intervals carry probability.</p>\n<p>The <strong>expected value</strong> (mean) and <strong>variance</strong> are themselves improper integrals:</p>\n$$E[X] = \\int_{-\\infty}^\\infty x\\,f(x)\\,dx, \\qquad \\mathrm{Var}(X) = E[(X-\\mu)^2] = \\int_{-\\infty}^\\infty (x-\\mu)^2 f(x)\\,dx.$$\n<p>Here convergence is not automatic. A density can be perfectly valid (integrates to 1) yet have <em>no</em> mean, because $\\int x f(x)\\,dx$ diverges. The Cauchy distribution $f(x)=\\frac{1}{\\pi(1+x^2)}$ is the classic example: it normalizes fine, but $\\int_{-\\infty}^\\infty \\frac{x}{\\pi(1+x^2)}\\,dx$ diverges, so its expectation is undefined. This is not a curiosity — it is why averaging Cauchy-distributed samples never converges, a real failure mode in robust statistics and in modeling outliers.</p>\n\n<h3>Fully Worked Example: The Exponential Distribution</h3>\n<p>The exponential distribution models waiting times — time until a request arrives, time until a component fails, the gap between Poisson events. Its candidate density, for a rate parameter $\\lambda > 0$, is</p>\n$$f(x) = \\begin{cases} \\lambda e^{-\\lambda x}, & x \\ge 0 \\\\ 0, & x < 0. \\end{cases}$$\n<p><strong>Step 1 — Nonnegativity.</strong> For $x\\ge 0$, $\\lambda>0$ and $e^{-\\lambda x}>0$, so $f(x)\\ge 0$. Done.</p>\n<p><strong>Step 2 — Verify normalization (an improper Type I integral).</strong> Because $f=0$ for $x<0$:</p>\n$$\\int_{-\\infty}^\\infty f(x)\\,dx = \\int_0^\\infty \\lambda e^{-\\lambda x}\\,dx = \\lim_{t\\to\\infty}\\int_0^t \\lambda e^{-\\lambda x}\\,dx.$$\n<p>Compute the proper integral first. An antiderivative of $\\lambda e^{-\\lambda x}$ is $-e^{-\\lambda x}$:</p>\n$$\\int_0^t \\lambda e^{-\\lambda x}\\,dx = \\Big[-e^{-\\lambda x}\\Big]_0^t = -e^{-\\lambda t} - (-e^{0}) = 1 - e^{-\\lambda t}.$$\n<p>Now take the limit. Since $\\lambda>0$, $e^{-\\lambda t}\\to 0$ as $t\\to\\infty$:</p>\n$$\\lim_{t\\to\\infty}\\left(1 - e^{-\\lambda t}\\right) = 1 - 0 = 1. \\checkmark$$\n<p>The density integrates to one, so it is a legitimate PDF for every $\\lambda>0$.</p>\n<p><strong>Step 3 — Expected value via integration by parts.</strong> Compute $E[X]=\\int_0^\\infty x\\,\\lambda e^{-\\lambda x}\\,dx$. Use parts with $u=x$, $dv=\\lambda e^{-\\lambda x}\\,dx$, so $du=dx$, $v=-e^{-\\lambda x}$:</p>\n$$\\int_0^t x\\,\\lambda e^{-\\lambda x}\\,dx = \\Big[-x e^{-\\lambda x}\\Big]_0^t + \\int_0^t e^{-\\lambda x}\\,dx = -t e^{-\\lambda t} + \\left[\\frac{-e^{-\\lambda x}}{\\lambda}\\right]_0^t.$$\n<p>As $t\\to\\infty$: the boundary term $t e^{-\\lambda t}\\to 0$ (exponential beats linear — a recurring theme), and the remaining integral $\\to \\frac{1}{\\lambda}$. Therefore</p>\n$$E[X] = \\frac{1}{\\lambda}.$$\n<p>This matches intuition: a higher arrival rate $\\lambda$ means shorter expected waits. The mean waiting time is the reciprocal of the rate. (A similar computation gives $\\mathrm{Var}(X)=1/\\lambda^2$.)</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>The single most useful technical fact for these problems: <strong>exponentials dominate polynomials.</strong> For any power $k$ and any $\\lambda>0$, $\\;x^k e^{-\\lambda x}\\to 0$ as $x\\to\\infty$. This is what makes every moment $E[X^k]=\\int_0^\\infty x^k \\lambda e^{-\\lambda x}\\,dx$ converge, and it is why the boundary terms in integration-by-parts vanish at infinity.</p>\n</div>\n\n<h3>A Recipe You Can Reuse</h3>\n<ol>\n<li><strong>Diagnose the impropriety.</strong> Is the interval infinite (Type I)? Does the integrand blow up somewhere on the interval, including interior points (Type II)? It can be both — then split into pieces each with a single source of trouble.</li>\n<li><strong>Replace each bad endpoint with a variable</strong> ($t$) and write the integral as a proper integral plus a limit.</li>\n<li><strong>Evaluate the proper integral</strong> (antiderivative, parts, substitution).</li>\n<li><strong>Take the limit.</strong> Finite and unique $\\Rightarrow$ converges to that value. Infinite, nonexistent, or one piece diverging $\\Rightarrow$ the whole thing diverges.</li>\n<li><strong>If you only need convergence, not the value,</strong> compare against a $p$-benchmark ($1/x^p$ at infinity needs $p>1$; $1/x^p$ at a singularity needs $p<1$) using the direct or limit comparison test.</li>\n</ol>\n<p>With this toolkit, \"does this integral mean anything?\" becomes a mechanical question, and the bridge to probability — densities that must integrate to one, expectations that may or may not exist — is built directly on top of it.\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-bayes\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: an improper integral is a limit in disguise</summary>\n<p>An ordinary definite integral has finite limits and a bounded integrand. An <b>improper</b> integral breaks one of those — an infinite limit of integration, or a blow-up inside the interval — so it isn't defined directly. The fix: replace the offending edge with a variable and take a <b>limit</b>. $\\int_1^{\\infty} f\\,dx$ <em>means</em> $\\lim_{b\\to\\infty}\\int_1^{b} f\\,dx$; it converges if that limit is a finite number and diverges otherwise.</p>\n<p>The classic boundary is the family $\\int_1^{\\infty} x^{-p}\\,dx$, which converges exactly when $p > 1$. So $\\int_1^{\\infty} x^{-2}\\,dx = 1$ (finite — the tail shrinks fast enough), but $\\int_1^{\\infty} x^{-1}\\,dx = \\infty$ (the harmonic tail dies too slowly). A hair's difference in the exponent flips convergence.</p>\n<p>The \"aha\": \"area out to infinity\" is never evaluated <em>at</em> infinity — it's the limit of ordinary finite areas. That's also why a probability density can integrate to exactly 1 over an unbounded range, and why $x^{-2}$-type tails decide whether an expectation even exists.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The p-test: ∫₁^∞ x^(−p) dx converges to <code>1/(p−1)</code> when p>1, and diverges otherwise. Evaluate it for p=2:</p>\n<div data-code=\"javascript\" data-expected=\"1\">// Improper integral of x^(-p) from 1 to infinity: converges to 1/(p-1) for p &gt; 1.\nfunction pIntegral(p) {\n  return p &gt; 1 ? 1 / (p - 1) : Infinity;   // Infinity signals divergence\n}\nconsole.log(pIntegral(2));   // 1 -- area under 1/x^2 is finite; 1/x (p=1) would diverge</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: convergence tests and the p-integral</summary>\n<p>Often you do not need an improper integral's <em>value</em> — only whether it is <b>finite</b>. Two tools answer that without evaluating.</p>\n<p><b>The benchmark: the p-integral.</b> $\\int_1^\\infty \\frac{dx}{x^p}$ <em>converges iff</em> $p \\gt 1$. Quick check: the antiderivative is $\\tfrac{x^{1-p}}{1-p}$, whose limit at $\\infty$ is finite exactly when $1 - p \\lt 0$. So $\\int_1^\\infty x^{-2}\\,dx = 1$ (converges), but $\\int_1^\\infty \\tfrac{dx}{x} = \\lim \\ln x = \\infty$ (diverges) — the boundary case $p=1$ just barely loses.</p>\n<p><b>The comparison test.</b> If $0 \\le f(x) \\le g(x)$ and the <em>bigger</em> $\\int g$ converges, so does $\\int f$; if the <em>smaller</em> $\\int f$ diverges, so does $\\int g$. So to judge a messy integrand, bound it by a p-integral: e.g. $\\frac{1}{x^2 + 1} \\le \\frac{1}{x^2}$, and since $\\int_1^\\infty x^{-2}$ converges, so does $\\int_1^\\infty \\frac{dx}{x^2+1}$.</p>\n<p>The \"aha\": convergence is about how fast the tail <em>decays</em>, and $1/x^p$ is the universal yardstick — faster than $1/x$ (that is, $p \\gt 1$) converges, $1/x$ or slower diverges. Comparing an ugly integrand to the right p-integral settles \"finite or not\" without ever computing the area (the same logic powers the p-<em>series</em> test for infinite sums).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: where improper integrals actually show up</summary>\n<p>Improper integrals (infinite limits, or unbounded integrands) can feel like a technical sideshow — until you notice they underpin probability, statistics, and machine learning.</p>\n<p><b>Probability densities normalize over an infinite range.</b> A continuous distribution must integrate to 1 over all of $\\mathbb{R}$: $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$. For the normal distribution that is the famous improper Gaussian integral $\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$. Every expectation $\\mathbb{E}[X]=\\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx$ and every variance is an improper integral, as are tail probabilities $P(X \\gt a)=\\int_a^{\\infty} f$.</p>\n<p><b>The Gamma function extends the factorial.</b> $\\Gamma(s)=\\int_0^{\\infty} x^{s-1}e^{-x}\\,dx$ — an improper integral that equals $(s-1)!$ at the integers but is defined for all real $s$. It is the backbone of the Gamma, Beta, chi-squared, and Student's-t distributions you meet in statistics.</p>\n<p><b>Transforms integrate to infinity.</b> The Laplace transform $\\int_0^{\\infty} f(t)e^{-st}\\,dt$ and the Fourier transform $\\int_{-\\infty}^{\\infty} f(t)e^{-i\\omega t}\\,dt$ — the workhorses of signals, differential equations, and convolution — are improper integrals by construction.</p>\n<p>The \"aha\": improper integrals are the native language of continuous probability and transforms. Normalizing a density, taking an expectation, the Gamma function behind half the named distributions, the Laplace and Fourier transforms — all are integrals over an infinite range, and convergence (the previous dive) is exactly what guarantees they are finite.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For which values of $p$ does $\\int_1^\\infty \\frac{1}{x^p}\\,dx$ converge?",
              "choices": [
                "$p < 1$",
                "$p > 1$",
                "$p \\le 1$",
                "all $p > 0$"
              ],
              "answer": 1,
              "explain": "At infinity the decay must be strictly faster than $1/x$, so convergence requires $p>1$. The threshold flips to $p<1$ for the singularity integral $\\int_0^1 x^{-p}\\,dx$ — a frequent source of confusion."
            },
            {
              "q": "Why is $\\int_{-1}^{1} \\frac{1}{x^2}\\,dx$ divergent even though applying $[-1/x]_{-1}^1 = -2$ gives a finite number?",
              "choices": [
                "Because the integrand has an interior singularity at $x=0$ that must be handled by splitting, and each half diverges",
                "Because $1/x^2$ is negative on part of the interval",
                "Because the antiderivative was computed incorrectly",
                "Because the Cauchy principal value is nonzero"
              ],
              "answer": 0,
              "explain": "There is a vertical asymptote at $x=0$ inside the interval. Splitting at 0 gives $\\int_0^1 x^{-2}\\,dx$, which diverges ($p=2>1$ at a singularity), so the whole integral diverges; the FTC shortcut is invalid across a singularity."
            },
            {
              "q": "A function $f(x)\\ge 0$ satisfies $\\int_{-\\infty}^\\infty f(x)\\,dx = 1$. Which conclusion is guaranteed?",
              "choices": [
                "$f$ is a valid PDF and $E[X]=\\int x f(x)\\,dx$ is necessarily finite",
                "$f$ must be symmetric about 0",
                "$f$ must be bounded",
                "$f$ is a valid PDF, but its mean may fail to exist if $\\int x f(x)\\,dx$ diverges"
              ],
              "answer": 3,
              "explain": "Nonnegativity plus normalization make $f$ a valid PDF, but normalization says nothing about moments. The Cauchy density integrates to 1 yet has a divergent mean integral, so $E[X]$ is undefined."
            },
            {
              "q": "To decide convergence of $\\int_1^\\infty \\frac{x^2+1}{x^4+3x}\\,dx$ quickly, the best benchmark $g(x)$ for a limit comparison is:",
              "choices": [
                "$1/x$",
                "$e^{-x}$",
                "$1/x^4$",
                "$1/x^2$"
              ],
              "answer": 3,
              "explain": "For large $x$ the integrand behaves like $x^2/x^4 = 1/x^2$. The ratio to $g=1/x^2$ tends to a finite positive limit, and since $\\int_1^\\infty x^{-2}$ converges ($p=2>1$), the original converges too."
            },
            {
              "q": "For the singularity benchmark $\\int_0^1 \\frac{1}{x^p}\\,dx$, for which values of $p$ does the integral converge?",
              "choices": [
                "$p > 1$",
                "$p = 1$ only",
                "$p < 1$",
                "all $p > 0$"
              ],
              "answer": 2,
              "explain": "Near the singularity at $x=0$ the inequality flips relative to the tail case: a milder blow-up (smaller $p$) is forgivable. Since $\\int_0^1 x^{-p}\\,dx = \\left[\\frac{x^{1-p}}{1-p}\\right]_0^1$ requires the exponent $1-p>0$, it converges exactly when $p < 1$."
            },
            {
              "q": "For the exponential density $f(x)=\\lambda e^{-\\lambda x}$ on $x\\ge 0$ with rate $\\lambda > 0$, what is the expected value $E[X]=\\int_0^\\infty x\\,\\lambda e^{-\\lambda x}\\,dx$?",
              "choices": [
                "$\\lambda$",
                "$\\frac{1}{\\lambda^2}$",
                "$\\frac{1}{\\lambda}$",
                "$\\lambda^2$"
              ],
              "answer": 2,
              "explain": "Integration by parts gives $E[X]=1/\\lambda$, matching the intuition that a higher arrival rate $\\lambda$ means a shorter expected wait."
            },
            {
              "q": "In the integration-by-parts computation of $E[X]$ for the exponential distribution, the boundary term $-t\\,e^{-\\lambda t}$ vanishes as $t\\to\\infty$. What general fact guarantees this?",
              "choices": [
                "Polynomials grow faster than exponentials",
                "The term is multiplied by zero at the lower limit",
                "Exponentials dominate polynomials, so $x^k e^{-\\lambda x}\\to 0$ for any power $k$ and $\\lambda>0$",
                "L'Hopital's rule does not apply to products"
              ],
              "answer": 2,
              "explain": "Because $x^k e^{-\\lambda x}\\to 0$ as $x\\to\\infty$ for any power $k$ and $\\lambda>0$, the linear factor $t$ is overwhelmed by the decaying exponential and the boundary term goes to zero."
            },
            {
              "q": "The Cauchy density $f(x)=\\frac{1}{\\pi(1+x^2)}$ is a valid PDF (it integrates to 1), yet its expected value is undefined. Why?",
              "choices": [
                "The integral $\\int_{-\\infty}^\\infty \\frac{x}{\\pi(1+x^2)}\\,dx$ does not converge, so $E[X]$ is not defined",
                "The normalization integral diverges",
                "The density is negative for some $x$, violating nonnegativity",
                "Its variance is zero, which makes the mean undefined"
              ],
              "answer": 0,
              "explain": "Even though the density normalizes to 1, the mean integral $\\int x f(x)\\,dx$ fails to converge as a true (non-principal-value) integral, so the expectation is undefined."
            },
            {
              "q": "Evaluate $\\int_0^\\infty x e^{-x}\\,dx$ (the area under $xe^{-x}$ over all positive $x$).",
              "choices": [
                "$0$, because $xe^{-x}\\to 0$ as $x\\to\\infty$",
                "$e$",
                "$\\infty$, because the interval is infinite",
                "$1$"
              ],
              "answer": 3,
              "explain": "Compute $\\int_0^t xe^{-x}\\,dx = [-(x+1)e^{-x}]_0^t = 1-(t+1)e^{-t}$, and the boundary term $\\to 0$, so the limit is $1$. The choice $0$ confuses the integrand's limit with the integral's value, and the interval being infinite does not force divergence when the integrand decays fast enough."
            },
            {
              "q": "Which statement about $\\int_1^\\infty f(x)\\,dx$ for a continuous $f(x)\\ge 0$ is TRUE?",
              "choices": [
                "If $f(x)\\to 0$ as $x\\to\\infty$, then $\\int_1^\\infty f(x)\\,dx$ must converge",
                "If $\\int_1^\\infty f(x)\\,dx$ converges then $\\int_1^\\infty f(x)^2\\,dx$ must also converge",
                "Convergence of $\\int_1^\\infty f(x)\\,dx$ requires $f$ to be eventually decreasing",
                "$\\int_1^\\infty f(x)\\,dx$ can converge even though $f(x)$ never reaches $0$ for any finite $x$"
              ],
              "answer": 3,
              "explain": "A positive integrand like $1/x^2$ stays strictly above $0$ everywhere yet has a finite improper integral, so convergence does not require the function to hit zero. The first claim is the classic trap ($1/x\\to 0$ but its integral diverges), monotonicity is not required, and squaring can ruin convergence (e.g. behavior near a singularity)."
            },
            {
              "q": "Evaluate $\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx$, an integral whose integrand blows up at the left endpoint.",
              "choices": [
                "It diverges, since $1/\\sqrt{x}\\to\\infty$ as $x\\to 0^+$",
                "$2$",
                "$1$",
                "$\\tfrac{1}{2}$"
              ],
              "answer": 1,
              "explain": "Define it as $\\lim_{t\\to 0^+}\\int_t^1 x^{-1/2}\\,dx = \\lim_{t\\to 0^+}[2\\sqrt{x}]_t^1 = 2-2\\sqrt{t} \\to 2$. An infinite integrand at an endpoint does not by itself force divergence; here $p=\\tfrac12<1$ so it converges, unlike the $1/x^2$ case."
            },
            {
              "q": "You want to prove $\\int_1^\\infty \\frac{1}{x^2+x}\\,dx$ converges by comparison. Which single comparison correctly settles it?",
              "choices": [
                "$\\frac{1}{x^2+x}\\le \\frac{1}{x}$ for $x\\ge 1$, and $\\int_1^\\infty \\frac{1}{x}\\,dx$ converges",
                "$\\frac{1}{x^2+x}\\ge \\frac{1}{2x^2}$ for $x\\ge 1$, and $\\int_1^\\infty \\frac{1}{2x^2}\\,dx$ converges",
                "$\\frac{1}{x^2+x}\\le \\frac{1}{x^2}$ for $x\\ge 1$, and $\\int_1^\\infty \\frac{1}{x^2}\\,dx$ converges",
                "$\\frac{1}{x^2+x}\\ge \\frac{1}{x^2}$ for $x\\ge 1$, and $\\int_1^\\infty \\frac{1}{x^2}\\,dx$ converges"
              ],
              "answer": 2,
              "explain": "To prove convergence you bound the integrand ABOVE by a convergent benchmark: since $x^2+x>x^2$, we get $\\frac{1}{x^2+x}<\\frac{1}{x^2}$, whose integral converges. Bounding below proves nothing about convergence, and the $1/x$ comparison fails because $\\int_1^\\infty \\tfrac1x$ diverges."
            },
            {
              "q": "An integral is called *improper* when:",
              "choices": [
                "a limit of integration is infinite, or the integrand becomes unbounded on the interval",
                "the answer is irrational",
                "the integrand is negative somewhere",
                "it cannot be computed at all"
              ],
              "answer": 0,
              "explain": "Two situations make an integral improper: an infinite limit (like $\\int_1^\\infty$) or an integrand with a vertical asymptote on the interval (like $\\int_0^1 \\frac1{\\sqrt x}$). Either way it is defined through a limit of ordinary integrals."
            },
            {
              "q": "The improper integral $\\int_1^\\infty f(x)\\,dx$ is defined as:",
              "choices": [
                "$f(\\infty) - f(1)$",
                "$\\displaystyle\\lim_{b\\to\\infty}\\int_1^{b} f(x)\\,dx$",
                "the sum $\\sum_{n=1}^{\\infty} f(n)$",
                "simply $\\int_1^\\infty f$, evaluated directly"
              ],
              "answer": 1,
              "explain": "Integrate up to a finite cutoff $b$ and let $b\\to\\infty$: $\\int_1^\\infty f = \\lim_{b\\to\\infty}\\int_1^b f$. If that limit is finite the integral *converges*; otherwise it *diverges*. (It is an integral, not a discrete sum.)"
            },
            {
              "q": "Evaluate $\\int_0^\\infty e^{-x}\\,dx$.",
              "choices": [
                "$1$",
                "$\\infty$",
                "$e$",
                "$0$"
              ],
              "answer": 0,
              "explain": "$\\int_0^b e^{-x}\\,dx = [-e^{-x}]_0^b = 1 - e^{-b}$; as $b\\to\\infty$, $e^{-b}\\to 0$, so the integral converges to $1$. (This is why $\\lambda e^{-\\lambda x}$ is a valid probability density.)"
            },
            {
              "q": "Direct comparison test: if $0 \\le f(x) \\le g(x)$ for all $x$ and $\\int g$ converges, then $\\int f$:",
              "choices": [
                "diverges",
                "also converges",
                "equals $\\int g$",
                "is undefined"
              ],
              "answer": 1,
              "explain": "If the larger area $\\int g$ is finite, the smaller area $\\int f$ (squeezed between $0$ and $g$) must be finite too, so $\\int f$ converges. Conversely, if the *smaller* $\\int f$ diverges, the larger $\\int g$ must diverge. This settles convergence without evaluating the integral."
            }
          ],
          "flashcards": [
            {
              "front": "Define $\\int_a^\\infty f(x)\\,dx$ rigorously.",
              "back": "$\\int_a^\\infty f(x)\\,dx = \\lim_{t\\to\\infty}\\int_a^t f(x)\\,dx$. It converges if this limit exists and is finite; otherwise it diverges."
            },
            {
              "front": "Convergence thresholds for the two $p$-integral benchmarks.",
              "back": "At infinity: $\\int_a^\\infty x^{-p}\\,dx$ converges iff $p>1$. At a singularity: $\\int_0^1 x^{-p}\\,dx$ converges iff $p<1$. The inequality flips between the two cases."
            },
            {
              "front": "Two axioms a function must satisfy to be a probability density function (PDF).",
              "back": "(1) Nonnegativity: $f(x)\\ge 0$ everywhere. (2) Normalization: $\\int_{-\\infty}^\\infty f(x)\\,dx = 1$ (an improper integral that must converge to exactly 1)."
            },
            {
              "front": "Limit Comparison Test (for positive $f,g$).",
              "back": "If $\\lim_{x\\to\\infty} f(x)/g(x) = L$ with $0<L<\\infty$, then $\\int f$ and $\\int g$ both converge or both diverge. Choose $g$ as the dominant-term benchmark."
            },
            {
              "front": "Normalization and mean of the exponential density $f(x)=\\lambda e^{-\\lambda x}$, $x\\ge 0$.",
              "back": "$\\int_0^\\infty \\lambda e^{-\\lambda x}\\,dx = \\lim_{t\\to\\infty}(1-e^{-\\lambda t}) = 1$, so it is a valid PDF. Its mean is $E[X]=1/\\lambda$ (and $\\mathrm{Var}=1/\\lambda^2$)."
            },
            {
              "front": "Can a valid PDF have an undefined mean? Give the canonical example.",
              "back": "Yes. The Cauchy density $f(x)=\\frac{1}{\\pi(1+x^2)}$ integrates to 1, but $\\int_{-\\infty}^\\infty \\frac{x}{\\pi(1+x^2)}\\,dx$ diverges, so $E[X]$ is undefined. Normalization does not guarantee moments exist."
            }
          ],
          "homework": [
            {
              "prompt": "Evaluate $\\int_0^\\infty x\\,e^{-x^2}\\,dx$, or show it diverges.",
              "hint": "This integrand is not a pure power, but a substitution turns it into something elementary. Let $u = x^2$.",
              "solution": "Let $u=x^2$, so $du = 2x\\,dx$, i.e. $x\\,dx = \\tfrac12\\,du$. As $x:0\\to t$, $u:0\\to t^2$. Then $\\int_0^t x e^{-x^2}\\,dx = \\tfrac12\\int_0^{t^2} e^{-u}\\,du = \\tfrac12[-e^{-u}]_0^{t^2} = \\tfrac12(1 - e^{-t^2})$. Taking $t\\to\\infty$, $e^{-t^2}\\to 0$, so the integral converges to $\\tfrac12$."
            },
            {
              "prompt": "Determine whether $\\int_0^1 \\frac{1}{\\sqrt{1-x}}\\,dx$ converges, and if so find its value.",
              "hint": "The singularity is at the upper endpoint $x=1$, not at 0. Replace 1 with a variable $t\\to 1^-$ and integrate.",
              "solution": "The integrand blows up as $x\\to 1^-$ (Type II at the right endpoint). Write $\\int_0^1 (1-x)^{-1/2}\\,dx = \\lim_{t\\to 1^-}\\int_0^t (1-x)^{-1/2}\\,dx$. An antiderivative is $-2\\sqrt{1-x}$ (check by differentiating). So $\\int_0^t = [-2\\sqrt{1-x}]_0^t = -2\\sqrt{1-t} + 2\\sqrt{1} = 2 - 2\\sqrt{1-t}$. As $t\\to 1^-$, $\\sqrt{1-t}\\to 0$, giving the value $2$. It converges (consistent with $p=1/2<1$ at a singularity)."
            },
            {
              "prompt": "Find the constant $c$ that makes $f(x) = \\dfrac{c}{x^2}$ for $x \\ge 1$ (and $0$ otherwise) a valid probability density, then determine whether $E[X]$ exists.",
              "hint": "First impose normalization $\\int_1^\\infty f = 1$ to solve for $c$. Then separately test convergence of $\\int_1^\\infty x f(x)\\,dx$.",
              "solution": "Normalization: $\\int_1^\\infty \\frac{c}{x^2}\\,dx = c\\lim_{t\\to\\infty}[-1/x]_1^t = c\\lim_{t\\to\\infty}(1 - 1/t) = c\\cdot 1 = c$. Setting this to 1 gives $c=1$, so $f(x)=1/x^2$ on $[1,\\infty)$. Mean: $E[X]=\\int_1^\\infty x\\cdot\\frac{1}{x^2}\\,dx = \\int_1^\\infty \\frac{1}{x}\\,dx = \\lim_{t\\to\\infty}\\ln t = \\infty$. This is the $p=1$ borderline, which diverges. So $f$ is a valid PDF but its expected value does not exist — a clean illustration that normalization does not guarantee a finite mean."
            }
          ],
          "examples": [
            {
              "title": "Convergence of a Decaying Tail",
              "body": "Determine whether the improper integral $\\int_1^\\infty \\frac{1}{x^2}\\,dx$ converges, and if so, find its value.",
              "solution": "This is a Type I improper integral (infinite upper limit), so we replace $\\infty$ with a parameter $t$ and take a limit at the end.\n\n$$\\int_1^\\infty \\frac{1}{x^2}\\,dx = \\lim_{t\\to\\infty} \\int_1^t x^{-2}\\,dx.$$\n\nStep 1 — Evaluate the proper integral. Using the power rule $\\int x^{-2}\\,dx = -x^{-1}$:\n\n$$\\int_1^t x^{-2}\\,dx = \\left[-\\frac{1}{x}\\right]_1^t = -\\frac{1}{t} - \\left(-\\frac{1}{1}\\right) = 1 - \\frac{1}{t}.$$\n\nStep 2 — Take the limit. As $t\\to\\infty$, the term $\\frac{1}{t}\\to 0$:\n\n$$\\lim_{t\\to\\infty}\\left(1 - \\frac{1}{t}\\right) = 1 - 0 = 1.$$\n\nThe limit exists and is finite, so the integral <strong>converges</strong>.\n\n$$\\boxed{\\int_1^\\infty \\frac{1}{x^2}\\,dx = 1}$$\n\nIntuition check: even though the region under $1/x^2$ stretches infinitely far to the right, the curve decays fast enough ($p=2>1$ in the $p$-test) that the accumulated area is finite — exactly $1$."
            },
            {
              "title": "A Probability Density and Its Mean Waiting Time",
              "body": "A random waiting time has the exponential density $f(x) = 2e^{-2x}$ for $x\\ge 0$ (and $0$ otherwise). First verify that the total probability is $1$, then compute the mean $\\mu = \\int_0^\\infty x\\,f(x)\\,dx$.",
              "solution": "Both quantities are Type I improper integrals over $[0,\\infty)$. We handle each with a limit at $t\\to\\infty$.\n\n<strong>Part 1 — Total probability.</strong>\n\n$$\\int_0^\\infty 2e^{-2x}\\,dx = \\lim_{t\\to\\infty} \\int_0^t 2e^{-2x}\\,dx.$$\n\nSince $\\int 2e^{-2x}\\,dx = -e^{-2x}$, we get\n\n$$\\int_0^t 2e^{-2x}\\,dx = \\left[-e^{-2x}\\right]_0^t = -e^{-2t} - (-e^{0}) = 1 - e^{-2t}.$$\n\nAs $t\\to\\infty$, $e^{-2t}\\to 0$, so the total probability is $1-0 = 1$. Good — $f$ is a valid density.\n\n<strong>Part 2 — Mean waiting time.</strong> Now compute\n\n$$\\mu = \\int_0^\\infty x\\cdot 2e^{-2x}\\,dx = \\lim_{t\\to\\infty}\\int_0^t 2x e^{-2x}\\,dx.$$\n\nThis needs integration by parts. Let $u = x$ and $dv = 2e^{-2x}\\,dx$, so $du = dx$ and $v = -e^{-2x}$:\n\n$$\\int 2x e^{-2x}\\,dx = -x e^{-2x} - \\int (-e^{-2x})\\,dx = -x e^{-2x} - \\tfrac{1}{2} e^{-2x}.$$\n\nEvaluate from $0$ to $t$:\n\n$$\\left[-x e^{-2x} - \\tfrac{1}{2}e^{-2x}\\right]_0^t = \\left(-t e^{-2t} - \\tfrac{1}{2}e^{-2t}\\right) - \\left(0 - \\tfrac{1}{2}\\right).$$\n\nTake the limit. As $t\\to\\infty$, both $t e^{-2t}\\to 0$ (exponential beats the linear factor) and $e^{-2t}\\to 0$, leaving\n\n$$\\mu = 0 - 0 + \\tfrac{1}{2} = \\tfrac{1}{2}.$$\n\n$$\\boxed{\\int_0^\\infty 2e^{-2x}\\,dx = 1, \\qquad \\mu = \\frac{1}{2}}$$\n\nThis matches the known fact that an exponential density with rate $\\lambda$ has mean $1/\\lambda$; here $\\lambda = 2$, so $\\mu = 1/2$."
            },
            {
              "title": "An improper integral from a vertical asymptote",
              "body": "Evaluate $\\int_0^1 \\tfrac{1}{\\sqrt x}\\,dx$. The integrand blows up at $x = 0$ — does the area still converge?",
              "solution": "<strong>Improper at the lower limit.</strong> $\\tfrac{1}{\\sqrt x} \\to \\infty$ as $x \\to 0^+$, so this is an improper integral of the <em>second kind</em> (unbounded integrand at a finite endpoint, not an infinite limit). Handle it with a limit: $\\int_0^1 x^{-1/2}\\,dx = \\lim_{a \\to 0^+}\\int_a^1 x^{-1/2}\\,dx$.\n<strong>Compute.</strong> $\\int x^{-1/2}\\,dx = 2x^{1/2}$, so $\\int_a^1 = 2\\sqrt 1 - 2\\sqrt a = 2 - 2\\sqrt a$. As $a \\to 0^+$, $2\\sqrt a \\to 0$, giving $2$. The area is finite even though the function is unbounded.\n<strong>The mirror of the tail test.</strong> For $\\int_0^1 x^{-p}\\,dx$ the rule flips: it converges iff $p \\lt 1$ (here $p = \\tfrac12$), whereas the infinite tail $\\int_1^\\infty x^{-p}\\,dx$ converges iff $p \\gt 1$. A milder singularity ($p \\lt 1$) has integrable area; a steeper one ($p \\ge 1$, like $\\tfrac1x$) diverges.\n<strong>The aha.</strong> \"Improper\" means a limit is hiding somewhere — at infinity <em>or</em> at a point where the integrand explodes. Both are handled the same way: cut out the bad point, integrate, take the limit. Unbounded height does not preclude finite area, as long as the spike is thin enough."
            }
          ]
        },
        {
          "id": "c-intro-differential-equations",
          "title": "Introduction to Differential Equations",
          "minutes": 16,
          "content": "<h3>What is a differential equation?</h3>\n<p>Most of the equations you met before calculus were <em>algebraic</em>: they constrain an unknown <strong>number</strong>. Solve $x^2 - 5x + 6 = 0$ and you get $x = 2$ or $x = 3$ — two numbers. A <strong>differential equation</strong> (DE) raises the stakes: the unknown is an entire <strong>function</strong>, and the equation constrains that function by relating it to its own derivatives.</p>\n<p>The canonical first-order example is</p>\n$$\\frac{dy}{dt} = f(t, y).$$\n<p>Read this out loud as a sentence: \"the rate at which $y$ changes, at any instant, is some known rule $f$ applied to the current time $t$ and the current value $y$.\" That reading is the whole conceptual key. A differential equation is a <strong>local rule for change</strong>. It does not hand you the trajectory directly; it tells you, from wherever you currently stand, which direction to step next. A <strong>solution</strong> is a function $y(t)$ that obeys this stepping rule at every single instant of its domain.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>An algebraic equation asks \"which numbers are consistent with this constraint?\" A differential equation asks \"which <em>trajectories</em> are consistent with this rule of motion?\" You are not solving for a point — you are solving for a path that is everywhere tangent to a prescribed velocity.</p>\n</div>\n<p>Why do these matter so much? Because the laws of nature, economics, and engineering are almost never stated as \"here is the value.\" They are stated as \"here is the rate.\" Newton's second law $F = ma$ is a statement about acceleration — the second derivative of position. Radioactive decay is a statement about how fast atoms disintegrate. Population dynamics, heat flow, the spread of a virus, the price of an option, the charging of a capacitor — all are naturally phrased as relationships between a quantity and its rate of change. Differential equations are the language in which the dynamic world is written.</p>\n\n<h4>Order, and why \"first-order\" is the right place to start</h4>\n<p>The <strong>order</strong> of a DE is the highest derivative that appears. $\\frac{dy}{dt} = ky$ is first-order; the oscillator equation $\\frac{d^2y}{dt^2} = -y$ is second-order. We focus on first-order equations because they are both genuinely useful and pedagogically clean: a first-order equation says the velocity is determined by the current state, which is exactly the structure of a <em>flow</em>.</p>\n\n<h4>General vs. particular solutions, and initial conditions</h4>\n<p>Consider the simplest possible DE, $\\frac{dy}{dt} = 2t$. Integrating, $y(t) = t^2 + C$ for <em>any</em> constant $C$. This is the <strong>general solution</strong> — an entire family of parabolas stacked vertically. The equation alone is not enough to pin down one curve, because knowing the slope everywhere does not tell you the starting height. To select a single member, you supply an <strong>initial condition</strong> such as $y(0) = 5$, which forces $C = 5$. A differential equation plus an initial condition is called an <strong>initial value problem</strong> (IVP), and that is what real models look like.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Training a neural network by gradient descent <em>is</em> solving a differential equation. The update $\\theta_{k+1} = \\theta_k - \\eta\\,\\nabla L(\\theta_k)$ is the explicit Euler discretization (step size $\\eta$) of the <strong>gradient flow</strong> $\\frac{d\\theta}{dt} = -\\nabla L(\\theta)$. The loss landscape defines a local rule for change; the optimizer integrates it. \"Neural ODEs\" make this literal by replacing layers with a learned $f(t, h)$ and letting an ODE solver compute the forward pass.</p>\n</div>\n\n<h3>Separable first-order equations</h3>\n<p>Not every DE can be solved with a tidy formula — most cannot. But one large and important class can: the <strong>separable</strong> equations, where the right-hand side factors into a part depending only on $t$ and a part depending only on $y$:</p>\n$$\\frac{dy}{dt} = g(t)\\,h(y).$$\n<p>The name comes from the solution method. The trick is to algebraically herd everything involving $y$ to one side and everything involving $t$ to the other, then integrate each side independently.</p>\n\n<h4>The method, step by step</h4>\n<ol>\n<li><strong>Separate.</strong> Divide by $h(y)$ and multiply by $dt$ to get $\\dfrac{1}{h(y)}\\,dy = g(t)\\,dt$.</li>\n<li><strong>Integrate both sides.</strong> $\\displaystyle\\int \\frac{1}{h(y)}\\,dy = \\int g(t)\\,dt + C$. (One constant of integration suffices.)</li>\n<li><strong>Solve for $y$</strong> if possible (sometimes you must leave the answer implicit), then use the initial condition to fix $C$.</li>\n</ol>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Why this is legitimate</div>\n<p>It feels like cheating to \"multiply both sides by $dt$\" as if $\\frac{dy}{dt}$ were a fraction — it is not. The honest justification is the <strong>chain rule</strong> / $u$-substitution. Start from $\\frac{1}{h(y)}\\frac{dy}{dt} = g(t)$ and integrate both sides with respect to $t$: $\\int \\frac{1}{h(y(t))}\\frac{dy}{dt}\\,dt = \\int g(t)\\,dt$. On the left, substitute $u = y(t)$, $du = \\frac{dy}{dt}\\,dt$, turning it into $\\int \\frac{1}{h(u)}\\,du$. The differential shuffling is exactly $u$-substitution wearing a disguise — which is why it always works.</p>\n</div>\n\n<h4>One caution: lost solutions</h4>\n<p>Dividing by $h(y)$ is illegal wherever $h(y) = 0$. Each root $y^*$ of $h$ gives a constant <strong>equilibrium solution</strong> $y(t) = y^*$ that the algebra silently drops. Always check these separately. For $\\frac{dy}{dt} = y(1-y)$, dividing by $y(1-y)$ loses the two equilibria $y \\equiv 0$ and $y \\equiv 1$, both of which are perfectly valid solutions.</p>\n\n<h4>Worked example</h4>\n<p>Solve the IVP $\\dfrac{dy}{dt} = -2t\\,y^2$ with $y(0) = 1$.</p>\n<p>This is separable with $g(t) = -2t$ and $h(y) = y^2$. The equilibrium check: $h(y) = 0$ at $y = 0$, so $y \\equiv 0$ is a solution — but it fails our initial condition $y(0) = 1$, so we move on. Separate and integrate:</p>\n$$\\int y^{-2}\\,dy = \\int -2t\\,dt \\quad\\Longrightarrow\\quad -\\frac{1}{y} = -t^2 + C.$$\n<p>Apply $y(0) = 1$: $-\\frac{1}{1} = -0 + C$, so $C = -1$. Therefore $-\\frac{1}{y} = -t^2 - 1$, which rearranges to</p>\n$$y(t) = \\frac{1}{t^2 + 1}.$$\n<p>Verify by differentiating: $y' = -\\frac{2t}{(t^2+1)^2} = -2t\\left(\\frac{1}{t^2+1}\\right)^2 = -2t\\,y^2.$ It checks, and $y(0) = 1$. Notice this solution is a smooth bump (a Lorentzian/Cauchy shape) that decays toward $0$ as $t \\to \\pm\\infty$ — it approaches the equilibrium we set aside.</p>\n\n<h3>Exponential growth and decay: $\\frac{dy}{dt} = ky$</h3>\n<p>The single most important differential equation in all of applied mathematics is</p>\n$$\\frac{dy}{dt} = k\\,y.$$\n<p>In words: <strong>the rate of change is proportional to the current amount</strong>. This describes any process where \"the more you have, the faster it grows (or shrinks)\": compound interest, unconstrained population, radioactive decay, drug elimination from the bloodstream, charging RC circuits (to leading order), and chain reactions.</p>\n<p>It is separable, so we can solve it cleanly. With $h(y) = y$ note $y \\equiv 0$ is an equilibrium; for $y \\neq 0$:</p>\n$$\\int \\frac{1}{y}\\,dy = \\int k\\,dt \\;\\Longrightarrow\\; \\ln|y| = kt + C \\;\\Longrightarrow\\; |y| = e^{C}e^{kt}.$$\n<p>Absorbing the sign and $e^C$ into a single constant $A$ gives $y(t) = A\\,e^{kt}$. Applying the initial condition $y(0) = y_0$ forces $A = y_0$, so we get the famous formula:</p>\n$$\\boxed{\\,y(t) = y_0\\,e^{kt}\\,}$$\n<p>The sign of $k$ controls everything:</p>\n<ul>\n<li>$k > 0$: <strong>exponential growth</strong>. The quantity multiplies by a fixed factor in each fixed time interval. Its <strong>doubling time</strong> is $T_2 = \\frac{\\ln 2}{k}$.</li>\n<li>$k < 0$: <strong>exponential decay</strong>. Its <strong>half-life</strong> is $T_{1/2} = \\frac{\\ln 2}{|k|}$.</li>\n<li>$k = 0$: nothing changes; $y$ is constant.</li>\n</ul>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Why $e$, of all numbers? Because $e^{kt}$ is the unique function (up to scale) that is its own derivative times $k$ — it is the eigenfunction of the derivative operator. Asking \"what function's growth rate is proportional to itself?\" <em>defines</em> the exponential. The constant $e$ is not chosen; it is forced by the question.</p>\n</div>\n\n<h4>Fitting a model to data</h4>\n<p>In practice $k$ is unknown and you infer it from observations. The recipe: plug a known data point into $y(t) = y_0 e^{kt}$ and take a logarithm. <strong>Example:</strong> a radioactive sample is $1000$ units now and $800$ units after $4$ hours. Then $800 = 1000\\,e^{4k}$, so $e^{4k} = 0.8$, giving $k = \\frac{\\ln 0.8}{4} \\approx -0.0558$ per hour. The half-life is $\\frac{\\ln 2}{0.0558} \\approx 12.4$ hours. A useful diagnostic: pure exponential data becomes a <em>straight line</em> when you plot $\\ln y$ against $t$, because $\\ln y = \\ln y_0 + kt$. A linear semi-log plot is the visual signature of exponential behavior, and its slope is $k$.</p>\n\n<h4>The shifted model: Newton's law of cooling</h4>\n<p>Real systems often decay toward a nonzero baseline rather than toward $0$. A hot coffee cools toward room temperature $T_a$, not toward absolute zero. Newton's law of cooling captures this:</p>\n$$\\frac{dT}{dt} = -k(T - T_a), \\qquad k > 0.$$\n<p>The substitution $u = T - T_a$ gives $\\frac{du}{dt} = -ku$, our old friend, with solution $u(t) = u_0 e^{-kt}$. Undoing the substitution:</p>\n$$T(t) = T_a + (T_0 - T_a)\\,e^{-kt}.$$\n<p>This is the same exponential, just relaxing toward the equilibrium $T = T_a$ instead of $T = 0$. The \"gap to equilibrium\" is what decays exponentially — a pattern you will see again and again.</p>\n\n<h3>Slope fields: seeing solutions without solving</h3>\n<div data-viz=\"calc-slope-field\"></div>\n<p>Most differential equations have no closed-form solution. This is not a defeat — it just means we need <em>qualitative</em> tools. The best one is the <strong>slope field</strong> (or direction field).</p>\n<p>The idea is to take the DE literally as a rule. Since $\\frac{dy}{dt} = f(t,y)$ gives the slope of the solution at every point $(t, y)$ of the plane, we can draw a tiny line segment with that slope at a grid of points <em>before solving anything</em>. The resulting field of tick marks is a picture of \"which way the flow is pointing everywhere.\" Any solution curve must thread through this field <strong>tangent to the segments</strong>, like an iron filing aligning with a magnetic field. Pick a starting point (your initial condition) and follow the segments — that traces the solution.</p>\n\n<pre><code>Slope field for dy/dt = y   (k = 1, exponential growth)\n\n y\n  2 |  /   /   /   /   /     steep up: large positive slope\n  1 |  -   -   -   -   -     gentler up\n  0 |  .   .   .   .   .  &lt;-- equilibrium: all slopes zero (flat)\n -1 |  \\   \\   \\   \\   \\     gentler down\n -2 |  \\   \\   \\   \\   \\     steep down\n    +------------------------ t\n</code></pre>\n<p>Three things to read off a slope field, no formula required:</p>\n<ul>\n<li><strong>Equilibria.</strong> Horizontal rows of flat segments mark constant solutions, where $f = 0$. In the picture above, $y = 0$ is an equilibrium.</li>\n<li><strong>Stability.</strong> Do nearby segments point <em>toward</em> the equilibrium (stable — perturbations die out) or <em>away</em> from it (unstable — perturbations amplify)? For $\\frac{dy}{dt} = ky$ the equilibrium $y=0$ is unstable when $k>0$ (the case above: arrows flee upward and downward) and stable when $k<0$ (arrows converge).</li>\n<li><strong>Long-run behavior.</strong> Trace the flow to see whether solutions blow up, settle to a limit, or oscillate — all without integrating.</li>\n</ul>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>A slope field is exactly a <strong>vector field</strong>, and the gradient $-\\nabla L$ defines one over parameter space. Optimization intuition — basins of attraction, saddle points you can escape, minima as stable equilibria — is slope-field reasoning in many dimensions. \"Phase portrait\" thinking is how researchers reason about training dynamics, GAN equilibria, and the stability of recurrent networks, often long before (or instead of) any explicit solution.</p>\n</div>\n\n<h3>Connecting it all: modeling real-world rates</h3>\n<p>The workflow for turning a real situation into mathematics you can solve is worth stating explicitly, because it is the transferable skill:</p>\n<ol>\n<li><strong>Identify the state variable</strong> — the quantity whose evolution you care about ($y$, temperature $T$, population $P$, concentration $C$).</li>\n<li><strong>Translate the verbal rate law into a DE.</strong> \"Grows proportionally to its size\" $\\to \\frac{dy}{dt} = ky$. \"Cools proportionally to the temperature gap\" $\\to \\frac{dT}{dt} = -k(T - T_a)$. \"Grows but saturates at carrying capacity $M$\" $\\to \\frac{dP}{dt} = kP(1 - P/M)$ (the logistic equation — also separable).</li>\n<li><strong>Attach the initial condition</strong> from the data.</li>\n<li><strong>Solve</strong> (separation if you can) <strong>or analyze qualitatively</strong> (slope field, equilibria, stability) if you cannot.</li>\n<li><strong>Validate and interpret</strong> against reality — does the long-run behavior make sense? Fit constants to data.</li>\n</ol>\n<p>Exponential models are the natural <em>first</em> draft of any growth or decay process. They are exact when the per-capita rate is truly constant and an excellent local approximation otherwise. When resources run out or saturation kicks in, you upgrade $\\frac{dy}{dt} = ky$ to something like the logistic equation — but you start from the exponential, because near an equilibrium almost everything looks exponential (that is precisely what linearization tells you). Master $\\frac{dy}{dt} = ky$ and its slope field, and you hold the seed of the entire subject.\n<details class=\"deep-dive\">\n<summary>Deeper dive: a differential equation is a slope field waiting to be threaded</summary>\n<p>An equation like $y' = f(x, y)$ doesn't hand you $y$ — it hands you the <em>slope</em> the solution must have at every point $(x, y)$. Picture a tiny arrow of that slope drawn at each point of the plane: a <b>slope field</b>. A solution is then any curve that threads through the field staying tangent to every arrow it crosses.</p>\n<p>That picture explains the two facts beginners find slippery. First, why one ODE has <em>infinitely many</em> solutions — a whole family of curves: you can start threading from anywhere. Second, why an <b>initial condition</b> $y(x_0) = y_0$ pins down exactly one — it says where to drop your pencil, and from that point the arrows determine the rest of the curve.</p>\n<p>The \"aha\": solving an ODE is geometry before it is algebra. The equation prescribes direction everywhere; a solution is the curve whose direction matches, and the initial condition just selects which member of the family you mean.</p>\n</details>\n<h4>Try it in code</h4>\n<p>Euler's method walks along the slope field: from a point, step in the direction the ODE prescribes, repeat. Solve <code>y' = y</code> from <code>y(0) = 1</code> to <code>x = 1</code> — the true answer is <code>e ≈ 2.718</code>, and Euler undershoots:</p>\n<div data-code=\"javascript\" data-expected=\"2.25\">// Euler's method: y' = f(x, y); take y &lt;- y + h * f each step.\nfunction euler(f, y0, h, steps) {\n  var y = y0;\n  for (var k = 0; k &lt; steps; k++) y = y + h * f(y);\n  return y;\n}\n// y' = y, starting at y(0) = 1, step h = 0.5, two steps to reach x = 1\nconsole.log(euler(function (y) { return y; }, 1, 0.5, 2).toFixed(2));   // 2.25</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: separable equations and the exponential model</summary>\n<p>The slope field shows a DE's solutions qualitatively — but a huge, important class can be solved <em>exactly</em> by <b>separation of variables</b>.</p>\n<p><b>The canonical DE.</b> $\\dfrac{dy}{dt} = ky$ says \"the rate of change is proportional to the current amount.\" Separate the variables — gather $y$ on one side, $t$ on the other — $\\dfrac{dy}{y} = k\\,dt$, then integrate both sides: $\\ln|y| = kt + C$, so $y = y_0\\,e^{kt}$. The solution is <b>exponential</b>: growth if $k \\gt 0$, decay if $k \\lt 0$.</p>\n<p><b>Why it is everywhere.</b> \"Rate proportional to amount\" describes population growth, radioactive decay, continuously compounded interest, charging and discharging RC circuits, and Newton's cooling (with a shift). Whenever something's rate of change scales with its size, you get $e^{kt}$ — which is exactly why $e^x$ (its own derivative) is the natural base for growth.</p>\n<p><b>The technique generalizes.</b> Any equation you can write as $g(y)\\,dy = h(t)\\,dt$ is <em>separable</em>: integrate each side independently. It is the first and most useful solving method, the bridge from \"slope field\" (qualitative) to \"closed-form solution\" (exact).</p>\n<p>The \"aha\": the simplest nontrivial DE, $\\dfrac{dy}{dt}=ky$, generates the exponential — the most important function in applied math — and separation of variables is the lever that turns a differential equation back into ordinary integration.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Euler's method — solving ODEs you can't solve</summary>\n<p>Most differential equations have <em>no</em> closed-form solution — separable and linear ones are the lucky exceptions. The rest are solved <em>numerically</em>, and the simplest such method is the most intuitive: follow the slope field, one small step at a time.</p>\n<p><b>Euler's method.</b> A first-order ODE $\\frac{dy}{dx}=f(x,y)$ <em>tells you the slope</em> at every point. Start at a known point $(x_0,y_0)$, take a small step $h$ in $x$, and move along the current slope: $$y_{n+1}=y_n+h\\,f(x_n,y_n),\\qquad x_{n+1}=x_n+h.$$ Repeat. You are walking through the slope field, approximating the true curve by a chain of tiny straight segments — literally \"the derivative is the slope\" turned into an algorithm.</p>\n<p><b>Accuracy and better methods.</b> A smaller $h$ is more accurate but needs more steps; Euler's error per step shrinks like $h^2$. Euler is crude (it always lags a curving solution), so practice uses higher-order methods — <em>Runge–Kutta (RK4)</em> is the standard workhorse — which sample the slope at several points per step for far better accuracy at the same $h$.</p>\n<p>The \"aha\": when you cannot solve an ODE on paper (the usual case), you <em>step</em> through it — Euler's method follows the slope field in small increments, $y_{n+1}=y_n+h\\,f(x_n,y_n)$. This is the foundation of all simulation (physics engines, epidemic models, and the \"neural ODE\" view of ResNets), with Runge–Kutta the accurate default.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Which of these first-order equations is separable?",
              "choices": [
                "$\\frac{dy}{dt} = t y^2$",
                "$\\frac{dy}{dt} = t + y$",
                "$\\frac{dy}{dt} = \\sin(t + y)$",
                "$\\frac{dy}{dt} = \\frac{t}{1 + y - t}$"
              ],
              "answer": 0,
              "explain": "$ty^2 = g(t)h(y)$ with $g(t)=t$ and $h(y)=y^2$, so the variables separate. The others mix $t$ and $y$ inside a sum or argument that cannot be factored into a $t$-only times a $y$-only piece."
            },
            {
              "q": "A sample decays according to $\\frac{dy}{dt} = ky$ and loses half its mass in 10 years. What is $k$?",
              "choices": [
                "$k = \\frac{\\ln 2}{10} \\approx 0.069$",
                "$k = -\\frac{\\ln 2}{10} \\approx -0.069$",
                "$k = -\\frac{1}{2 \\cdot 10} = -0.05$",
                "$k = \\frac{1}{10} = 0.1$"
              ],
              "answer": 1,
              "explain": "Half-life satisfies $\\tfrac12 = e^{k \\cdot 10}$, so $k = \\frac{\\ln(1/2)}{10} = -\\frac{\\ln 2}{10} \\approx -0.069$. Decay requires $k<0$, which rules out the positive options."
            },
            {
              "q": "For $\\frac{dy}{dt} = ky$ with $k > 0$, what does the equilibrium $y = 0$ look like in the slope field, and is it stable?",
              "choices": [
                "A row of flat (zero-slope) segments, and it is unstable (solutions flee it)",
                "A row of flat (zero-slope) segments, and it is stable (solutions approach it)",
                "A vertical line, and stability is undefined",
                "There is no equilibrium because $e^{kt}$ is never zero"
              ],
              "answer": 0,
              "explain": "At $y=0$ the slope $ky=0$, so segments are flat there. For $k>0$, any tiny positive $y$ has positive slope and grows while any tiny negative $y$ grows more negative — solutions run away, so $y=0$ is unstable."
            },
            {
              "q": "Why can the 'multiply both sides by $dt$' move for separable equations be trusted, even though $\\frac{dy}{dt}$ is not literally a fraction?",
              "choices": [
                "Because derivatives genuinely are fractions of real numbers",
                "Because the constant of integration cancels the error",
                "Because it is shorthand for the chain rule / $u$-substitution: $\\int \\frac{1}{h(y)}\\frac{dy}{dt}\\,dt = \\int g(t)\\,dt$",
                "It cannot be trusted; it only works by coincidence for exponentials"
              ],
              "answer": 2,
              "explain": "The differential manipulation is rigorously justified by substituting $u = y(t)$, $du = \\frac{dy}{dt}\\,dt$ inside the integral — separation of variables is u-substitution in disguise."
            },
            {
              "q": "What fundamentally distinguishes a differential equation from an algebraic equation like $x^2 - 5x + 6 = 0$?",
              "choices": [
                "A differential equation always has infinitely many solutions while an algebraic equation has finitely many",
                "The unknown in a differential equation is an entire function, constrained by relating it to its own derivatives, whereas an algebraic equation constrains an unknown number",
                "A differential equation can only be solved using integration",
                "A differential equation requires calculus while an algebraic equation does not"
              ],
              "answer": 1,
              "explain": "The lesson's core point is that an algebraic equation constrains an unknown number, while a DE's unknown is an entire function constrained by its relationship to its own derivatives."
            },
            {
              "q": "The DE $\\frac{dy}{dt} = f(t, y)$ is described as a 'local rule for change.' What does this phrase mean?",
              "choices": [
                "It only applies to a small local region of the domain",
                "It gives the full trajectory $y(t)$ explicitly once you know $f$",
                "From wherever you currently stand, it tells you which direction to step next rather than handing you the trajectory directly",
                "It can only be solved locally near the initial condition"
              ],
              "answer": 2,
              "explain": "A DE is a local rule because it specifies the rate of change at the current state, telling you the next direction to step rather than the trajectory outright."
            },
            {
              "q": "The general solution of $\\frac{dy}{dt} = 2t$ is $y(t) = t^2 + C$. Why is the equation alone insufficient to pin down a single curve?",
              "choices": [
                "Because $f(t,y) = 2t$ does not depend on $y$",
                "Because the equation is nonlinear and has multiple branches",
                "Because integration introduces an arbitrary constant, so knowing the slope everywhere still leaves the vertical position undetermined",
                "Because second-order equations are needed to determine the constant"
              ],
              "answer": 2,
              "explain": "Integrating $2t$ yields $t^2 + C$, where the arbitrary constant means an entire family of vertically stacked parabolas all satisfy the same slope rule, so an initial condition is needed."
            },
            {
              "q": "Why does the lesson identify first-order equations as the right starting point pedagogically?",
              "choices": [
                "First-order equations are the only ones that arise in physics",
                "A first-order equation says the velocity is determined by the current state, which is exactly the structure of a flow",
                "Higher-order equations have no solutions in closed form",
                "First-order equations never require initial conditions"
              ],
              "answer": 1,
              "explain": "First-order equations are clean because they say the velocity is determined by the current state, capturing the essential structure of a flow."
            },
            {
              "q": "Is the function $y(t) = 3e^{2t}$ a solution of the differential equation $\\frac{dy}{dt} = 2y$?",
              "choices": [
                "Yes, because $\\frac{dy}{dt} = 6e^{2t}$ and $2y = 6e^{2t}$ agree for every $t$",
                "No, because plugging in $t = 0$ gives $y = 3$, not $0$",
                "No, because a solution must pass through the origin",
                "Yes, but only at the single instant $t = 0$"
              ],
              "answer": 0,
              "explain": "To verify a solution you substitute and check the equation holds at every $t$: here $\\frac{dy}{dt}=6e^{2t}$ equals $2y=2(3e^{2t})=6e^{2t}$ identically, so it is a solution. The distractors confuse a solution with an initial condition or a single-point match, but a solution must obey the rule at every instant, and the constant $3$ is perfectly allowed."
            },
            {
              "q": "The differential equation $\\frac{dy}{dt} = f(t, y)$ assigns a slope to every point $(t, y)$ in the plane. Geometrically, what is a solution curve?",
              "choices": [
                "The single point where the slope equals zero",
                "Any straight line drawn through the slope field",
                "The set of all points where $f(t, y) = 0$",
                "A curve whose slope at each point it passes through matches the value $f(t,y)$ there"
              ],
              "answer": 3,
              "explain": "A solution is a trajectory that is everywhere tangent to the prescribed slope field, so at each point on the curve its slope equals $f(t,y)$. The other options describe equilibrium points or unrelated lines, not the everywhere-tangent path the DE demands."
            },
            {
              "q": "A population grows at a rate proportional to its current size: $\\frac{dy}{dt} = 0.05\\, y$, with $y(0) = 200$. What is the population $y(t)$?",
              "choices": [
                "$y(t) = 0.05\\, t^2 + 200$",
                "$y(t) = 200 + 0.05 t$",
                "$y(t) = 200 e^{t} + 0.05$",
                "$y(t) = 200 e^{0.05 t}$"
              ],
              "answer": 3,
              "explain": "Equations of the form $\\frac{dy}{dt}=ky$ have exponential solutions $y(t)=y_0 e^{kt}$, and the initial condition fixes $y_0 = 200$. The linear and quadratic options describe constant or constant-acceleration growth, not growth proportional to the current value."
            },
            {
              "q": "A student claims that since $\\frac{dy}{dt} = 2t$ has general solution $y(t) = t^2 + C$, the 'differential equation has infinitely many solutions, so it tells us almost nothing.' What is the best response?",
              "choices": [
                "The student is right; without a unique answer the equation is not useful",
                "The constant $C$ should always be taken as $0$ by convention, so there is really one solution",
                "Differential equations never have unique solutions, which is why they are rarely used in science",
                "The equation pins down the entire shape of every solution curve; $C$ only shifts it vertically, and one initial condition selects a single curve"
              ],
              "answer": 3,
              "explain": "The DE fully determines the rule of change and hence the shape of the family $t^2 + C$; the free constant merely reflects a vertical shift, and supplying one initial condition selects exactly one curve. The misconception is treating the constant of integration as a failure rather than the expected freedom that an initial condition resolves."
            },
            {
              "q": "The *order* of a differential equation is:",
              "choices": [
                "the order of the highest derivative that appears",
                "the number of terms in the equation",
                "the number of solutions it has",
                "the highest power of $y$ that appears"
              ],
              "answer": 0,
              "explain": "Order = the highest derivative present. $\\frac{dy}{dt}=ky$ is first-order (only $y'$); an equation involving $y''$ is second-order. It has nothing to do with powers of $y$ — $(y')^2 = y$ is still first-order."
            },
            {
              "q": "The general solution of $\\dfrac{dy}{dt} = k y$ is:",
              "choices": [
                "$y = kt + C$",
                "$y = C e^{k t}$",
                "$y = C\\,k^{t}$",
                "$y = e^{k t} + C$"
              ],
              "answer": 1,
              "explain": "A quantity whose rate of change is proportional to itself grows or decays exponentially: $y = Ce^{kt}$ (check: $y' = kCe^{kt} = ky$). $k>0$ gives growth, $k<0$ decay; $C=y(0)$ is fixed by an initial condition. This one model underlies compound interest, radioactive decay, and unchecked population growth."
            },
            {
              "q": "To check whether a given function is a solution of a differential equation, you:",
              "choices": [
                "solve the equation for $x$",
                "integrate the function once",
                "check that it passes through the origin",
                "substitute the function and its derivative into the equation and see if both sides agree"
              ],
              "answer": 3,
              "explain": "Plug the candidate in. For $y=3e^{2t}$ and $\\frac{dy}{dt}=2y$: the left side is $y'=6e^{2t}$ and the right side is $2y=6e^{2t}$ — they match, so it is a solution. You don't need to *solve* the DE to *verify* a proposed solution."
            },
            {
              "q": "To solve a separable equation $\\dfrac{dy}{dx} = g(x)\\,h(y)$, the first step is to:",
              "choices": [
                "set $y = 0$",
                "differentiate both sides again",
                "separate the variables — collect all $y$-terms (with $dy$) on one side and all $x$-terms (with $dx$) on the other, then integrate both sides",
                "take the determinant of the coefficient matrix"
              ],
              "answer": 2,
              "explain": "Rewrite as $\\frac{dy}{h(y)} = g(x)\\,dx$, then integrate each side separately. 'Separable' means the right-hand side factors into an $x$-only part times a $y$-only part — exactly what lets you split the variables this way."
            }
          ],
          "flashcards": [
            {
              "front": "What is a differential equation, in one sentence?",
              "back": "An equation relating an unknown function to its own derivatives; it specifies a local rule for change ($\\frac{dy}{dt} = f(t,y)$) whose solution is a function obeying that rule everywhere."
            },
            {
              "front": "Separation of variables: the three steps for $\\frac{dy}{dt} = g(t)h(y)$.",
              "back": "1) Rewrite as $\\frac{1}{h(y)}dy = g(t)dt$. 2) Integrate both sides: $\\int \\frac{1}{h(y)}dy = \\int g(t)dt + C$. 3) Solve for $y$ and apply the initial condition to fix $C$. (Also check $h(y)=0$ for lost equilibrium solutions.)"
            },
            {
              "front": "Solution of the exponential model $\\frac{dy}{dt} = ky$ with $y(0)=y_0$?",
              "back": "$y(t) = y_0 e^{kt}$. Growth if $k>0$ (doubling time $\\frac{\\ln 2}{k}$); decay if $k<0$ (half-life $\\frac{\\ln 2}{|k|}$)."
            },
            {
              "front": "What is a slope field and why is it useful?",
              "back": "At each grid point $(t,y)$ draw a short segment with slope $f(t,y)$; solution curves are everywhere tangent to it. It reveals qualitative behavior (equilibria, stability, growth, blow-up) without solving the DE."
            },
            {
              "front": "What is an equilibrium solution, and what makes it stable vs. unstable?",
              "back": "A constant solution $y=y^*$ where $f=0$ (zero slope). Stable if nearby solutions move toward it, unstable if they move away. For $\\frac{dy}{dt}=ky$: $y=0$ is stable when $k<0$, unstable when $k>0$."
            },
            {
              "front": "Newton's law of cooling and its solution.",
              "back": "$\\frac{dT}{dt} = -k(T - T_a)$ gives $T(t) = T_a + (T_0 - T_a)e^{-kt}$: the temperature gap decays exponentially, so $T$ relaxes toward the ambient $T_a$ (not toward zero)."
            }
          ],
          "homework": [
            {
              "prompt": "Solve the initial value problem $\\frac{dy}{dt} = \\frac{2t}{y}$ with $y(0) = 3$. Give $y(t)$ explicitly and state its domain.",
              "hint": "It is separable: write it as $y\\,dy = 2t\\,dt$, then integrate. Use $y(0)=3$ to find the constant, and pick the sign of the square root that matches $y(0)>0$.",
              "solution": "Separate: $y\\,dy = 2t\\,dt$. Integrate: $\\frac{y^2}{2} = t^2 + C$, i.e. $y^2 = 2t^2 + C'$ (with $C' = 2C$). Apply $y(0)=3$: $9 = 0 + C'$, so $C' = 9$. Thus $y^2 = 2t^2 + 9$, and since $y(0)=3>0$ we take the positive root: $y(t) = \\sqrt{2t^2 + 9}$. The radicand is always positive, so the domain is all real $t$. Check: $y' = \\frac{4t}{2\\sqrt{2t^2+9}} = \\frac{2t}{y}$. ✓"
            },
            {
              "prompt": "A cup of coffee at $90^\\circ$C is left in a $20^\\circ$C room. After 5 minutes it has cooled to $70^\\circ$C. Using Newton's law of cooling, find $k$ and predict the temperature after 15 minutes.",
              "hint": "Use $T(t) = T_a + (T_0 - T_a)e^{-kt}$ with $T_a = 20$, $T_0 = 90$. Plug in the 5-minute data point to solve for $k$, then evaluate at $t=15$ (you can reuse $e^{-5k}$ cubed).",
              "solution": "Model: $T(t) = 20 + 70e^{-kt}$. At $t=5$: $70 = 20 + 70e^{-5k}$, so $50 = 70e^{-5k}$, giving $e^{-5k} = \\frac{5}{7}$, hence $k = \\frac{\\ln(7/5)}{5} \\approx 0.0673$ per minute. At $t=15$: $e^{-15k} = (e^{-5k})^3 = (5/7)^3 = 125/343 \\approx 0.3644$. So $T(15) = 20 + 70(0.3644) \\approx 45.5^\\circ$C."
            },
            {
              "prompt": "An investment grows continuously with $\\frac{dA}{dt} = 0.04\\,A$ (4% continuous rate) and $A(0) = 10{,}000$. How long until it reaches $25{,}000$? Then identify the equilibrium of this DE and state whether it is stable.",
              "hint": "The solution is $A(t) = 10000\\,e^{0.04t}$. Set it equal to 25000 and solve with a logarithm. For the equilibrium, find where $\\frac{dA}{dt}=0$ and use the sign of $k$.",
              "solution": "Solution: $A(t) = 10000\\,e^{0.04t}$. Set $25000 = 10000\\,e^{0.04t}$: $e^{0.04t} = 2.5$, so $0.04t = \\ln 2.5 \\approx 0.9163$, giving $t = \\frac{\\ln 2.5}{0.04} \\approx 22.9$ years. Equilibrium: $\\frac{dA}{dt} = 0.04A = 0$ only at $A = 0$. Since $k = 0.04 > 0$, this equilibrium is unstable — any positive balance grows away from zero without bound, which is exactly the appeal of compound growth."
            }
          ],
          "examples": [
            {
              "title": "Verifying a solution and pinning down the constant",
              "body": "Show that $y(t) = Ce^{3t}$ satisfies the differential equation $\\dfrac{dy}{dt} = 3y$ for every constant $C$. Then find the particular solution whose value at $t=0$ is $y(0)=4$.",
              "solution": "A function is a solution exactly when plugging it into the equation makes both sides agree at every instant, so we compute each side separately.\n\n<strong>Step 1 — differentiate the candidate.</strong> With $y(t)=Ce^{3t}$, the chain rule gives\n$$\\frac{dy}{dt} = C\\cdot e^{3t}\\cdot 3 = 3Ce^{3t}.$$\n\n<strong>Step 2 — build the right-hand side from the same candidate.</strong> The rule says the rate should equal $3y$, and $3y = 3\\cdot Ce^{3t} = 3Ce^{3t}$.\n\n<strong>Step 3 — compare.</strong> Left side $=3Ce^{3t}$, right side $=3Ce^{3t}$. They are identical for every $t$ and every value of $C$, so $y(t)=Ce^{3t}$ is a solution no matter what $C$ is. This is why a single first-order DE has a whole <em>family</em> of solutions, one curve per choice of $C$ — the equation fixes the rule of motion, not the starting height.\n\n<strong>Step 4 — use the initial condition to select one member.</strong> We need $y(0)=4$. Since $y(0)=Ce^{3\\cdot 0}=Ce^{0}=C$, the condition forces $C=4$.\n\n<strong>Answer.</strong> The particular solution is\n$$y(t) = 4e^{3t}.$$\nQuick check: $y(0)=4e^{0}=4$ as required, and $\\frac{dy}{dt}=12e^{3t}=3(4e^{3t})=3y.$"
            },
            {
              "title": "From \"here is the rate\" to a direction, and verifying the trajectory",
              "body": "A quantity $y(t)$ obeys the local rule $\\dfrac{dy}{dt} = 2t - y$ with $y(0)=3$. (a) Using only the rule, find the slope of the solution's graph at the starting point $(0,3)$ and say whether $y$ is rising or falling there. (b) Verify that $y(t) = 2t - 2 + 5e^{-t}$ is the solution.",
              "solution": "This DE is the canonical form $\\frac{dy}{dt}=f(t,y)$ with $f(t,y)=2t-y$. Read it as a sentence: at any instant the velocity of $y$ equals \"twice the current time minus the current value.\" That sentence is all we need for part (a).\n\n<strong>Part (a) — read the direction off the rule.</strong> The whole point of a DE is that it tells you which way to step from wherever you stand, without first knowing the trajectory. We stand at $t=0$, $y=3$. Plug those current values into the rule:\n$$\\left.\\frac{dy}{dt}\\right|_{(0,3)} = 2(0) - 3 = -3.$$\nThe slope there is $-3$. Since it is negative, $y$ is <em>decreasing</em> at the start: from $(0,3)$ the solution curve heads downward with slope $-3$ (it is tangent to the prescribed velocity, exactly the \"path tangent to a velocity field\" picture).\n\n<strong>Part (b) — verify the proposed trajectory.</strong> Let $y(t)=2t-2+5e^{-t}$.\n\nFirst differentiate:\n$$\\frac{dy}{dt} = 2 - 5e^{-t}.$$\n\nNow build the right-hand side $2t-y$ from the candidate:\n$$2t - y = 2t - \\bigl(2t - 2 + 5e^{-t}\\bigr) = 2t - 2t + 2 - 5e^{-t} = 2 - 5e^{-t}.$$\n\nThe two expressions match: $\\frac{dy}{dt} = 2 - 5e^{-t} = 2t - y$ for all $t$, so the stepping rule holds at every instant. Finally check the initial condition: $y(0) = 2(0) - 2 + 5e^{0} = -2 + 5 = 3.$ Both the equation and the starting value are satisfied.\n\n<strong>Consistency check with part (a).</strong> The verified solution gives $\\frac{dy}{dt}\\big|_{t=0} = 2 - 5e^{0} = 2 - 5 = -3$, the same slope we read directly off the rule — confirming that the local rule and the actual trajectory agree at the start.\n\n<strong>Answer.</strong> (a) Slope $=-3$ at $(0,3)$, so $y$ is decreasing there. (b) $y(t)=2t-2+5e^{-t}$ satisfies $\\frac{dy}{dt}=2t-y$ with $y(0)=3$, so it is the solution."
            },
            {
              "title": "Solving a separable ODE: exponential growth",
              "body": "Solve $\\frac{dy}{dx} = 2y$ with initial condition $y(0) = 3$, and verify your answer.",
              "solution": "<strong>Separate the variables.</strong> Put all $y$ on one side, all $x$ on the other: $\\frac{dy}{y} = 2\\,dx$. Integrate both sides: $\\ln|y| = 2x + C$, so $y = A e^{2x}$ (with $A = e^C$).\n<strong>Apply the initial condition.</strong> $y(0) = A e^0 = A = 3$, so $y = 3e^{2x}$.\n<strong>Verify.</strong> $y' = 3 \\cdot 2 e^{2x} = 6e^{2x}$, and $2y = 2 \\cdot 3e^{2x} = 6e^{2x}$ — they match, and $y(0) = 3$.\n<strong>The aha.</strong> \"Rate proportional to amount\" ($y' = ky$) <em>always</em> solves to an exponential $y = y_0 e^{kx}$ — the only function equal to a constant times its own derivative. This one ODE models compound interest, population growth, radioactive decay ($k \\lt 0$), and RC-circuit discharge; the constant $k$ sets the doubling or half-life time."
            }
          ]
        }
      ]
    },
    {
      "id": "c-multivariable-bridge",
      "title": "Bridge to Multivariable Calculus for ML",
      "lessons": [
        {
          "id": "c-partial-derivatives",
          "title": "Functions of Several Variables & Partial Derivatives",
          "minutes": 16,
          "content": "<h3>From One Slope to Many: Why Multivariable Calculus Matters</h3>\n<p>In single-variable calculus, a function $f(x)$ has a single derivative $f'(x)$ that answers one question: \"if I nudge $x$, how fast does $f$ change?\" But almost nothing interesting depends on a single number. A neural network's loss depends on millions of weights. A house price depends on square footage, location, age, and lot size. A physical system's energy depends on position and momentum. To do calculus on these, we need to ask the same question — \"if I nudge an input, how fast does the output change?\" — but now there are <em>many</em> inputs to nudge.</p>\n<p>This lesson builds the foundation: <strong>functions of several variables</strong>, the <strong>partial derivative</strong> (the slope along one input direction), <strong>higher-order partials</strong>, and the <strong>tangent plane / local linearization</strong> picture that ties it all together. This is the precise machinery that, scaled up, becomes the gradient — the object every gradient-descent optimizer in machine learning consumes.</p>\n\n<h3>1. Functions of Several Variables</h3>\n<p>A <strong>function of several variables</strong> takes a vector of inputs and returns a single number:</p>\n$$ f: \\mathbb{R}^n \\to \\mathbb{R}, \\qquad f(x_1, x_2, \\ldots, x_n) = z. $$\n<p>The domain is a set of points in $n$-dimensional space; the output is a scalar. For $n=2$ we write $f(x, y)$, and we can visualize it: the <strong>graph</strong> $z = f(x,y)$ is a surface sitting over the $xy$-plane, like a landscape of hills and valleys. For example,</p>\n$$ f(x, y) = x^2 + y^2 $$\n<p>is a bowl (a paraboloid) with its lowest point at the origin. For $n > 2$ we can no longer draw the graph, but the algebra and the intuition carry over unchanged — which is exactly why we lean on algebra rather than pictures once we get to ML, where $n$ is in the millions.</p>\n\n<h4>Level sets: the topographic-map view</h4>\n<p>A powerful way to \"see\" a function of two variables without leaving the plane is the <strong>level set</strong> (or <strong>contour line</strong>): the set of all inputs that produce a fixed output $c$,</p>\n$$ \\{(x, y) : f(x, y) = c\\}. $$\n<p>For the bowl $f = x^2 + y^2$, the level sets are circles $x^2 + y^2 = c$. This is exactly how a topographic map encodes elevation, and exactly how a 2D loss-surface plot shows the \"valleys\" an optimizer descends into. Where contour lines bunch together, the function is steep; where they spread out, it is nearly flat.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>In ML, the <em>loss</em> $L(\\mathbf{w})$ is a function of several (often millions of) variables — the weights $\\mathbf{w}$. Training is the search for an input point where this function is as small as possible. Every concept in this lesson is a tool for understanding the shape of that surface near the point you are currently standing on.</p>\n</div>\n\n<h3>2. The Partial Derivative</h3>\n<div data-viz=\"calc-saddle\"></div>\n<p>How do we differentiate when there are several inputs? The key idea is disarmingly simple: <strong>vary one input, hold all the others fixed</strong>, and take an ordinary single-variable derivative.</p>\n<p>The <strong>partial derivative</strong> of $f$ with respect to $x$ is</p>\n$$ \\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x + h,\\, y) - f(x,\\, y)}{h}, $$\n<p>and with respect to $y$,</p>\n$$ \\frac{\\partial f}{\\partial y} = \\lim_{h \\to 0} \\frac{f(x,\\, y + h) - f(x,\\, y)}{h}. $$\n<p>Notice the curly $\\partial$ (\"del\" or \"partial\") instead of the straight $d$ — this signals that other variables are present and being held constant. Common notations are interchangeable:</p>\n$$ \\frac{\\partial f}{\\partial x} = f_x = \\partial_x f = D_x f. $$\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Stand on the surface $z = f(x,y)$ at some point. The partial $\\partial f/\\partial x$ is the slope you would feel if you walked due east (the $+x$ direction) holding your north-south position fixed. The partial $\\partial f/\\partial y$ is the slope walking due north. Each partial is a <strong>directional slope</strong> along one coordinate axis.</p>\n</div>\n\n<h4>The computational rule</h4>\n<p>To compute $\\partial f/\\partial x$, treat <em>every other variable as a constant</em> and differentiate as usual. That's the whole trick. Example:</p>\n$$ f(x, y) = x^2 y + 3y^3 + \\sin x. $$\n<p>For $\\partial f / \\partial x$, treat $y$ as a number:</p>\n<ul>\n<li>$\\frac{\\partial}{\\partial x}(x^2 y) = 2xy$  (the $y$ is a constant multiplier)</li>\n<li>$\\frac{\\partial}{\\partial x}(3y^3) = 0$  (no $x$ appears — it's a constant)</li>\n<li>$\\frac{\\partial}{\\partial x}(\\sin x) = \\cos x$</li>\n</ul>\n$$ \\frac{\\partial f}{\\partial x} = 2xy + \\cos x. $$\n<p>For $\\partial f / \\partial y$, treat $x$ as a number:</p>\n<ul>\n<li>$\\frac{\\partial}{\\partial y}(x^2 y) = x^2$</li>\n<li>$\\frac{\\partial}{\\partial y}(3y^3) = 9y^2$</li>\n<li>$\\frac{\\partial}{\\partial y}(\\sin x) = 0$</li>\n</ul>\n$$ \\frac{\\partial f}{\\partial y} = x^2 + 9y^2. $$\n\n<h4>The gradient: packaging the partials</h4>\n<p>Collecting all first partials into a vector gives the <strong>gradient</strong>:</p>\n$$ \\nabla f = \\left( \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\ldots, \\frac{\\partial f}{\\partial x_n} \\right). $$\n<p>For the example above, $\\nabla f = (2xy + \\cos x,\\; x^2 + 9y^2)$. The gradient is the central object of optimization: it points in the direction of steepest ascent, and $-\\nabla f$ points in the direction of steepest descent. We will study the gradient in depth in a later lesson, but it is nothing more than \"all the partial derivatives, stacked.\"</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Backpropagation is precisely the efficient computation of the partial derivatives $\\partial L / \\partial w_i$ of the loss with respect to every weight. Each such partial answers \"if I nudge this one weight up a little, holding all others fixed, does the loss go up or down, and how fast?\" That single number determines how the optimizer adjusts that weight. Partial derivatives are not an abstraction in ML — they are the literal update signal.</p>\n</div>\n\n<h3>3. Higher-Order Partial Derivatives</h3>\n<p>Partials are themselves functions of several variables, so we can differentiate again. With two variables we get <strong>four</strong> second-order partials:</p>\n$$ f_{xx} = \\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\!\\left(\\frac{\\partial f}{\\partial x}\\right), \\qquad f_{yy} = \\frac{\\partial^2 f}{\\partial y^2}, $$\n$$ f_{xy} = \\frac{\\partial^2 f}{\\partial y\\, \\partial x} = \\frac{\\partial}{\\partial y}\\!\\left(\\frac{\\partial f}{\\partial x}\\right), \\qquad f_{yx} = \\frac{\\partial^2 f}{\\partial x\\, \\partial y} = \\frac{\\partial}{\\partial x}\\!\\left(\\frac{\\partial f}{\\partial y}\\right). $$\n<p>The last two, $f_{xy}$ and $f_{yx}$, are the <strong>mixed partials</strong>: differentiate once with respect to each variable, in some order.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Notation warning</div>\n<p>The subscript order and the $\\partial$-fraction order are <em>opposite by convention</em>. The subscript form $f_{xy}$ reads left to right: \"first $x$, then $y$.\" The fraction form $\\frac{\\partial^2 f}{\\partial y\\,\\partial x}$ reads right to left (inner operation first): again \"first $x$, then $y$.\" Both denote the same thing. Fortunately, the next theorem makes the order rarely matter.</p>\n</div>\n\n<h4>Clairaut's Theorem (symmetry of mixed partials)</h4>\n<p><strong>If the mixed partials $f_{xy}$ and $f_{yx}$ are continuous on an open region, then they are equal there:</strong></p>\n$$ f_{xy} = f_{yx}. $$\n<p>The order of differentiation does not matter. This is not obvious a priori — it says two genuinely different computations always agree — but it holds for essentially every function you will meet in practice (any function built from polynomials, exponentials, logs, and trig functions is smooth where defined). The deep consequence is that the matrix of second partials, the <strong>Hessian</strong></p>\n$$ H = \\begin{bmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{bmatrix}, $$\n<p>is <strong>symmetric</strong>. Symmetry is what makes the Hessian's eigenvalues real and gives the clean second-derivative test for classifying maxima, minima, and saddle points — and it is why second-order optimizers (Newton's method, L-BFGS) can exploit curvature so effectively.</p>\n\n<h3>4. Worked Example: All First and Second Partials</h3>\n<p>Let</p>\n$$ f(x, y) = x^3 y^2 + e^{xy} + 4x. $$\n<p><strong>Step 1 — First partials.</strong> Treat $y$ as constant for $f_x$. Use the chain rule on $e^{xy}$: its derivative with respect to $x$ is $e^{xy}\\cdot \\frac{\\partial}{\\partial x}(xy) = y\\,e^{xy}$.</p>\n$$ f_x = 3x^2 y^2 + y\\,e^{xy} + 4. $$\n<p>Treat $x$ as constant for $f_y$; here $\\frac{\\partial}{\\partial y}(xy) = x$:</p>\n$$ f_y = 2x^3 y + x\\,e^{xy}. $$\n<p><strong>Step 2 — Pure second partials.</strong> Differentiate $f_x$ again by $x$:</p>\n$$ f_{xx} = 6x y^2 + y \\cdot \\frac{\\partial}{\\partial x}\\big(e^{xy}\\big) = 6x y^2 + y^2 e^{xy}. $$\n<p>Differentiate $f_y$ again by $y$:</p>\n$$ f_{yy} = 2x^3 + x \\cdot \\frac{\\partial}{\\partial y}\\big(e^{xy}\\big) = 2x^3 + x^2 e^{xy}. $$\n<p><strong>Step 3 — Mixed partials.</strong> Differentiate $f_x = 3x^2 y^2 + y\\,e^{xy} + 4$ with respect to $y$. The term $y\\,e^{xy}$ needs the product rule (it has $y$ both as a factor and inside the exponent):</p>\n$$ \\frac{\\partial}{\\partial y}\\big(y\\,e^{xy}\\big) = 1\\cdot e^{xy} + y\\cdot x\\,e^{xy} = e^{xy}(1 + xy). $$\n$$ f_{xy} = 6x^2 y + e^{xy}(1 + xy). $$\n<p>Now differentiate $f_y = 2x^3 y + x\\,e^{xy}$ with respect to $x$. The term $x\\,e^{xy}$ again needs the product rule:</p>\n$$ \\frac{\\partial}{\\partial x}\\big(x\\,e^{xy}\\big) = 1\\cdot e^{xy} + x\\cdot y\\,e^{xy} = e^{xy}(1 + xy). $$\n$$ f_{yx} = 6x^2 y + e^{xy}(1 + xy). $$\n<p><strong>Step 4 — Verify Clairaut.</strong> $f_{xy} = f_{yx} = 6x^2 y + e^{xy}(1 + xy)$. The mixed partials agree, exactly as the theorem promised. (Computing both ways is a cheap, reliable self-check on an exam.)</p>\n\n<h3>5. The Tangent Plane and Local Linearization</h3>\n<p>In one variable, the tangent line $L(x) = f(a) + f'(a)(x - a)$ is the best <em>linear</em> approximation to $f$ near $x = a$. The multivariable analogue replaces the line with a <strong>tangent plane</strong>. At a point $(a, b)$ where $f$ is differentiable,</p>\n$$ z = f(a, b) + f_x(a, b)\\,(x - a) + f_y(a, b)\\,(y - b). $$\n<p>Read this geometrically: start at the height $f(a,b)$, then add the rise from moving in $x$ (slope $f_x$ times the run $x - a$) plus the rise from moving in $y$ (slope $f_y$ times the run $y - b$). The two partials are exactly the slopes of the plane along the two axis directions.</p>\n<p>Written as an approximation for small steps, this is the <strong>local linearization</strong>:</p>\n$$ f(a + \\Delta x,\\, b + \\Delta y) \\approx f(a, b) + f_x(a,b)\\,\\Delta x + f_y(a,b)\\,\\Delta y, $$\n<p>or compactly, with the gradient and the step vector $\\Delta \\mathbf{x} = (\\Delta x, \\Delta y)$,</p>\n$$ f(\\mathbf{a} + \\Delta \\mathbf{x}) \\approx f(\\mathbf{a}) + \\nabla f(\\mathbf{a}) \\cdot \\Delta \\mathbf{x}. $$\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>This single formula is the engine of gradient descent. The update $\\Delta \\mathbf{w} = -\\eta\\,\\nabla L$ is chosen precisely because, by local linearization, it makes $\\nabla L \\cdot \\Delta \\mathbf{w} = -\\eta\\,\\|\\nabla L\\|^2 < 0$ — guaranteeing the loss <em>decreases</em> for a small enough learning rate $\\eta$. Optimizers trust the surface to look like its tangent plane over one small step; the learning rate is how far you dare to walk before re-checking. The breakdown of this flat approximation over large steps is exactly why too-large learning rates diverge.</p>\n</div>\n\n<h4>A concrete linearization</h4>\n<p>Approximate $f(x,y) = \\sqrt{x^2 + y^2}$ near $(3, 4)$, where $f(3,4) = 5$. The partials are $f_x = x/\\sqrt{x^2+y^2}$ and $f_y = y/\\sqrt{x^2+y^2}$, so $f_x(3,4) = 3/5$ and $f_y(3,4) = 4/5$. Then</p>\n$$ f(3.1, 3.9) \\approx 5 + \\tfrac{3}{5}(0.1) + \\tfrac{4}{5}(-0.1) = 5 - 0.02 = 4.98. $$\n<p>The exact value is $\\sqrt{3.1^2 + 3.9^2} = \\sqrt{24.82} \\approx 4.982$. The linear estimate is off by only about $0.002$ over a small step — and it required only the two partials, no square root re-evaluation.</p>\n\n<h3>6. A Subtlety: Partials Exist but Tell an Incomplete Story</h3>\n<p>Here is a trap worth internalizing. The existence of both partial derivatives at a point does <em>not</em> guarantee that $f$ is even continuous there, let alone that the tangent-plane approximation is valid. The classic example is</p>\n$$ f(x, y) = \\frac{xy}{x^2 + y^2} \\quad (\\text{with } f(0,0) = 0). $$\n<p>Along the axes $f$ is identically $0$, so $f_x(0,0) = f_y(0,0) = 0$ both exist. Yet along the line $y = x$ we have $f = x^2/(2x^2) = 1/2$ everywhere except the origin, so $f$ is discontinuous at $(0,0)$. The partials see only the axis directions and miss the bad behavior in between.</p>\n<p>The fix is the stronger notion of <strong>differentiability</strong>: $f$ is differentiable at a point when the tangent-plane approximation's error shrinks faster than the step size, in <em>every</em> direction at once. A clean sufficient condition you can actually check: <strong>if all partial derivatives exist and are continuous near the point, then $f$ is differentiable there.</strong> The smooth functions of everyday ML (compositions of linear maps, smooth activations, log-sum-exp, etc.) satisfy this, so in practice the tangent-plane picture is trustworthy — but knowing the distinction keeps you from being fooled by pathological surfaces.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>A function of several variables $f:\\mathbb{R}^n \\to \\mathbb{R}$ maps an input vector to a scalar; for $n=2$ its graph is a surface and its level sets are contour lines.</li>\n<li>The <strong>partial derivative</strong> $\\partial f/\\partial x_i$ is the ordinary derivative taken while holding all other variables constant — a directional slope along one axis. Stacking all partials gives the <strong>gradient</strong> $\\nabla f$.</li>\n<li><strong>Higher-order partials</strong> differentiate repeatedly; <strong>Clairaut's theorem</strong> says mixed partials are equal when continuous, making the Hessian symmetric.</li>\n<li>The <strong>tangent plane</strong> / <strong>local linearization</strong> $f(\\mathbf{a} + \\Delta\\mathbf{x}) \\approx f(\\mathbf{a}) + \\nabla f(\\mathbf{a})\\cdot\\Delta\\mathbf{x}$ is the multivariable best-linear-fit and the foundation of gradient descent.</li>\n<li>Existence of partials is weaker than differentiability; continuity of the partials is the clean sufficient condition.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: a partial derivative freezes the world except one axis</summary>\n<p>For a function of several variables $f(x, y)$ there is no single \"slope\" — it depends which direction you move. A <b>partial derivative</b> $\\partial f / \\partial x$ answers the simplest version: hold $y$ fixed and differentiate in $x$ alone, the slope along the $x$-axis.</p>\n<p>Assembled, the partials build everything. The <b>gradient</b> $\\nabla f = (\\partial f/\\partial x,\\, \\partial f/\\partial y)$ packages them into the direction of steepest ascent; the <b>tangent plane</b> uses them as its two slopes, the 2-D analogue of the tangent line. And for well-behaved functions the <b>mixed partials commute</b>, $\\partial^2 f/\\partial x\\,\\partial y = \\partial^2 f/\\partial y\\,\\partial x$ (Clairaut's theorem), so the order of differentiation doesn't matter.</p>\n<p>The \"aha\": multivariable calculus reduces to one-variable calculus done one axis at a time. Freeze every variable but one, apply the ordinary rules, and the partials you collect reconstruct the full local behaviour — slope, steepest direction, and tangent plane.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: mixed partials commute (Clairaut's theorem)</summary>\n<p>Once you can take partial derivatives, you can take them <em>again</em> — and a surprising symmetry appears: the order does not matter.</p>\n<p><b>Clairaut's (Schwarz's) theorem.</b> For a function whose second partials are continuous, $\\dfrac{\\partial^2 f}{\\partial x\\,\\partial y} = \\dfrac{\\partial^2 f}{\\partial y\\,\\partial x}$ — differentiating by $x$ then $y$ gives the same result as $y$ then $x$.</p>\n<p><b>Check it.</b> For $f = x^2 y$: $\\tfrac{\\partial f}{\\partial x} = 2xy$, then $\\tfrac{\\partial}{\\partial y}(2xy) = 2x$. The other way: $\\tfrac{\\partial f}{\\partial y} = x^2$, then $\\tfrac{\\partial}{\\partial x}(x^2) = 2x$. Same answer, $2x$, by both routes.</p>\n<p><b>Why it matters.</b> This symmetry is exactly why the <b>Hessian</b> (the matrix of second partials) is <em>symmetric</em> — and symmetric matrices have real eigenvalues and orthogonal eigenvectors (the spectral theorem), which underpins the second-derivative test for optimization and the curvature used in Newton's method. (It can fail for pathological functions whose second partials are discontinuous, but those do not arise in practice.)</p>\n<p>The \"aha\": \"differentiate in either order\" is not a lucky coincidence — it is Clairaut's theorem, and it is the reason the Hessian is symmetric. The order-independence of mixed partials quietly guarantees the clean curvature structure that calculus-based optimization relies on.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: from partials to the gradient and Jacobian</summary>\n<p>A partial derivative (the other dives) is one number — the slope along one axis. Collect them and they assemble into the central objects of multivariable calculus and ML.</p>\n<p><b>The gradient.</b> For a scalar function $f(x_1,\\dots,x_n)$, stack all its partials into a vector: $\\nabla f=\\big(\\tfrac{\\partial f}{\\partial x_1},\\dots,\\tfrac{\\partial f}{\\partial x_n}\\big)$. That vector points uphill, and its negative is the descent direction — the gradient every optimizer follows is literally the partials, boxed up.</p>\n<p><b>The Jacobian.</b> For a <em>vector</em>-valued function $F:\\mathbb{R}^n\\to\\mathbb{R}^m$, the partials form a whole $m\\times n$ matrix $J$, with $J_{ij}=\\tfrac{\\partial F_i}{\\partial x_j}$. It is the best <em>linear</em> approximation of $F$ near a point (the multivariable derivative), and the <em>multivariable chain rule</em> is just Jacobian multiplication: $J_{g\\circ f}=J_g\\,J_f$. That product of Jacobians is exactly what backpropagation computes, layer by layer.</p>\n<p>The \"aha\": a single partial is a slope along one axis; gather them and you get the <em>gradient</em> (scalar outputs — the direction optimizers follow) and the <em>Jacobian</em> (vector outputs — the linear map whose chain-rule product is backprop). The whole machinery of multivariable calculus and deep learning is built from stacked partial derivatives.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For $f(x,y) = x^2 y + \\sin(xy)$, what is $\\frac{\\partial f}{\\partial y}$?",
              "choices": [
                "$x^2 + x\\cos(xy)$",
                "$2xy + \\cos(xy)$",
                "$x^2 + \\cos(xy)$",
                "$2xy + x\\cos(xy)$"
              ],
              "answer": 0,
              "explain": "Hold $x$ constant: $\\partial_y(x^2 y) = x^2$, and $\\partial_y(\\sin(xy)) = \\cos(xy)\\cdot x$ by the chain rule, giving $x^2 + x\\cos(xy)$. The common error is forgetting the inner factor $x$ from the chain rule."
            },
            {
              "q": "Clairaut's theorem guarantees $f_{xy} = f_{yx}$ under which condition?",
              "choices": [
                "Always, for every function",
                "When the mixed partials are continuous on an open region",
                "Only when $f$ is a polynomial",
                "When the first partials are equal"
              ],
              "answer": 1,
              "explain": "Equality of mixed partials requires continuity of the mixed partials on an open region. It is not unconditional — pathological functions with discontinuous mixed partials can have $f_{xy} \\neq f_{yx}$."
            },
            {
              "q": "Using local linearization, the change in loss from a small weight step $\\Delta\\mathbf{w}$ is approximately $\\nabla L \\cdot \\Delta\\mathbf{w}$. Why does gradient descent choose $\\Delta\\mathbf{w} = -\\eta\\,\\nabla L$?",
              "choices": [
                "It maximizes the step length",
                "It makes $\\nabla L \\cdot \\Delta\\mathbf{w} = -\\eta\\|\\nabla L\\|^2 < 0$, so the loss decreases",
                "It makes the Hessian symmetric",
                "It guarantees convergence for any learning rate"
              ],
              "answer": 1,
              "explain": "Substituting gives $\\nabla L \\cdot (-\\eta\\nabla L) = -\\eta\\|\\nabla L\\|^2$, which is negative, so the linear approximation predicts the loss drops. It does not guarantee convergence for any $\\eta$ — too large an $\\eta$ breaks the approximation and can diverge."
            },
            {
              "q": "Both $f_x(0,0)$ and $f_y(0,0)$ exist for a function $f$. What can you conclude?",
              "choices": [
                "$f$ is continuous at $(0,0)$",
                "$f$ is differentiable at $(0,0)$",
                "The tangent plane approximation is valid at $(0,0)$",
                "Nothing about continuity or differentiability follows automatically"
              ],
              "answer": 3,
              "explain": "Existence of both partials is strictly weaker than continuity or differentiability; $f = xy/(x^2+y^2)$ has both partials at the origin yet is discontinuous there. Continuity of the partials would be needed to conclude differentiability."
            },
            {
              "q": "For the paraboloid $f(x,y) = x^2 + y^2$, what do the level sets look like, and what does their spacing tell you?",
              "choices": [
                "Parabolas; evenly spaced everywhere",
                "Straight lines through the origin; spacing is irrelevant to steepness",
                "Circles centered at the origin; they spread farther apart as you move away from the origin, indicating the surface gets steeper",
                "Circles centered at the origin; they bunch closer together as you move away from the origin, indicating the surface gets steeper"
              ],
              "answer": 3,
              "explain": "Level sets $x^2+y^2=c$ are circles centered at the origin. Because the bowl steepens as you move outward, equally-spaced elevation contours must crowd closer together there."
            },
            {
              "q": "For $f(x,y) = 3x^2 y^3$, what is the mixed second partial $f_{xy}$?",
              "choices": [
                "$6xy^3$",
                "$18xy^2$",
                "$9x^2y^2$",
                "$18x^2y^2$"
              ],
              "answer": 1,
              "explain": "Differentiating with respect to $x$ gives $f_x = 6xy^3$; then differentiating with respect to $y$ gives $f_{xy} = 18xy^2$ (and by Clairaut's theorem $f_{yx}$ matches)."
            },
            {
              "q": "When computing the partial derivative $\\partial f/\\partial x$ of $f(x,y)$, how are the other variables treated?",
              "choices": [
                "They are set to zero",
                "They are held constant, treated as fixed numbers",
                "They are differentiated simultaneously and the results summed",
                "They are also varied to capture the full rate of change"
              ],
              "answer": 1,
              "explain": "A partial derivative measures the slope along one input direction, so every other variable is frozen as a constant while you differentiate with respect to the chosen variable."
            },
            {
              "q": "The tangent plane to $z = f(x,y)$ at a point gives the local linearization of $f$. As you scale this idea up to a loss surface $L(\\mathbf{w})$ in millions of dimensions, what object does the collection of partial derivatives become?",
              "choices": [
                "The Hessian, which gradient descent multiplies the step by",
                "A single second derivative $f''$",
                "The level set, which the optimizer follows to stay at constant loss",
                "The gradient, the vector of partials that every gradient-descent optimizer consumes"
              ],
              "answer": 3,
              "explain": "Stacking the first-order partial derivatives into a vector yields the gradient, the exact object the tangent-plane/linearization picture scales up to and that gradient-descent optimizers use to step downhill."
            },
            {
              "q": "For $f(x,y) = e^{xy}$, what is $f_x(1,2)$?",
              "choices": [
                "$e^2$",
                "$xy\\,e^{xy}$",
                "$2e^2$",
                "$2e$"
              ],
              "answer": 2,
              "explain": "Treating $y$ as a constant, $f_x = y\\,e^{xy}$, so $f_x(1,2) = 2\\,e^{(1)(2)} = 2e^2$. The distractor $e^2$ forgets the factor $y=2$ that the chain rule pulls down from the exponent."
            },
            {
              "q": "A student computes $f_x$ for $f(x,y)=x^2+3y$ and gets $2x+3$. What mistake did they make?",
              "choices": [
                "No mistake; $2x+3$ is correct",
                "They should have gotten $2x+3y$ because the $y$ stays attached",
                "They forgot to apply the chain rule to $x^2$",
                "They treated $y$ as a variable instead of a constant, so $3y$ should differentiate to $0$ (giving $f_x=2x$)"
              ],
              "answer": 3,
              "explain": "When taking $\\partial/\\partial x$, the term $3y$ is constant in $x$ and differentiates to $0$, so $f_x = 2x$. Carrying along a $+3$ wrongly treats $y$ as if it varied with $x$."
            },
            {
              "q": "Using the tangent-plane linearization $L(x,y)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$, estimate $f(3.1,3.9)$ for $f(x,y)=x^2+y^2$ at $(a,b)=(3,4)$.",
              "choices": [
                "$24.6$",
                "$25.0$",
                "$24.8$",
                "$25.4$"
              ],
              "answer": 2,
              "explain": "With $f(3,4)=25$, $f_x=2x=6$, and $f_y=2y=8$, we get $L=25+6(0.1)+8(-0.1)=25+0.6-0.8=24.8$. Choosing $25.0$ ignores the linear correction terms entirely."
            },
            {
              "q": "Both $f_x(0,0)$ and $f_y(0,0)$ exist. What does differentiability (a valid tangent plane) require beyond this that the partials alone do NOT guarantee?",
              "choices": [
                "That the linear approximation approximates $f$ well along every direction of approach to $(0,0)$, not just along the axes",
                "That $f_{xy}=f_{yx}$ at the origin",
                "That $f$ is bounded near $(0,0)$",
                "Nothing more — existence of both partials guarantees differentiability"
              ],
              "answer": 0,
              "explain": "Partials only probe the two axis directions; differentiability demands the linear map approximate $f$ along all approach directions, which can fail even when both partials exist. Assuming partials alone imply differentiability is the classic misconception."
            },
            {
              "q": "For $f(x,y) = x^2 y^3$, what is $\\dfrac{\\partial f}{\\partial x}$?",
              "choices": [
                "$3x^2 y^2$",
                "$2x + 3y^2$",
                "$2x y^3$",
                "$2x$"
              ],
              "answer": 2,
              "explain": "Differentiate with respect to $x$ while treating $y$ (and hence $y^3$) as a constant: $\\frac{\\partial}{\\partial x}(x^2 y^3) = 2x\\cdot y^3 = 2xy^3$. Holding $y$ fixed is the whole idea of a partial derivative."
            },
            {
              "q": "Geometrically, the partial derivative $\\partial f/\\partial x$ at a point gives:",
              "choices": [
                "the slope of the surface $z=f(x,y)$ in the $x$-direction (moving along $x$ with $y$ held fixed)",
                "the slope in the $y$-direction",
                "the total change in $f$ in every direction at once",
                "the height $f$ at that point"
              ],
              "answer": 0,
              "explain": "Slicing the surface with the plane $y=\\text{const}$ leaves a curve in $x$; $\\partial f/\\partial x$ is that curve's slope. Likewise $\\partial f/\\partial y$ is the slope of the slice $x=\\text{const}$. Each partial is a one-direction slope — the gradient gathers them."
            },
            {
              "q": "How many first-order partial derivatives does a function $f(x,y,z)$ of three variables have?",
              "choices": [
                "one",
                "two",
                "three — one for each variable ($\\partial f/\\partial x,\\ \\partial f/\\partial y,\\ \\partial f/\\partial z$)",
                "nine"
              ],
              "answer": 2,
              "explain": "There is exactly one first-order partial per input variable, so $f(x,y,z)$ has three: $f_x, f_y, f_z$. They are the components of the gradient $\\nabla f$, a vector in $\\mathbb{R}^3$. (Second-order partials would number up to $3\\times 3 = 9$.)"
            },
            {
              "q": "For $f(x,y) = x^3 y$, what is the second partial $f_{xx}$?",
              "choices": [
                "$6x y$",
                "$3x^2 y$",
                "$3x^2$",
                "$x^3$"
              ],
              "answer": 0,
              "explain": "Differentiate twice with respect to $x$, holding $y$ fixed: $f_x = 3x^2 y$, then $f_{xx} = \\frac{\\partial}{\\partial x}(3x^2 y) = 6xy$. ($f_{xx}$ means 'apply $\\partial/\\partial x$ twice', not square anything.)"
            }
          ],
          "flashcards": [
            {
              "front": "How do you compute the partial derivative $\\partial f/\\partial x$ of a multivariable function?",
              "back": "Treat every variable other than $x$ as a constant, then take an ordinary single-variable derivative with respect to $x$."
            },
            {
              "front": "What is the gradient $\\nabla f$ and what is its geometric meaning?",
              "back": "The vector of all first partial derivatives, $\\nabla f = (\\partial f/\\partial x_1, \\ldots, \\partial f/\\partial x_n)$. It points in the direction of steepest ascent; $-\\nabla f$ is steepest descent."
            },
            {
              "front": "State Clairaut's theorem on mixed partial derivatives.",
              "back": "If $f_{xy}$ and $f_{yx}$ are continuous on an open region, then $f_{xy} = f_{yx}$ there — the order of differentiation does not matter. This makes the Hessian symmetric."
            },
            {
              "front": "Write the tangent-plane / local linearization formula for $f$ at point $\\mathbf{a}$.",
              "back": "$f(\\mathbf{a} + \\Delta\\mathbf{x}) \\approx f(\\mathbf{a}) + \\nabla f(\\mathbf{a}) \\cdot \\Delta\\mathbf{x}$. For two variables: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$."
            },
            {
              "front": "Does the existence of both partial derivatives at a point imply $f$ is continuous there?",
              "back": "No. Partials only probe the axis directions and can miss bad behavior in between (e.g. $xy/(x^2+y^2)$ at the origin). A sufficient condition for differentiability is that the partials exist and are continuous near the point."
            },
            {
              "front": "What is the Hessian matrix and why does its symmetry matter?",
              "back": "The matrix of second partials $H = \\begin{bmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{bmatrix}$. By Clairaut it is symmetric, giving real eigenvalues, a clean second-derivative (max/min/saddle) test, and structure that second-order optimizers exploit."
            }
          ],
          "homework": [
            {
              "prompt": "Let $f(x, y) = x^2 y^3 - 4xy + 2y$. Compute all first partials $f_x, f_y$ and all four second partials $f_{xx}, f_{yy}, f_{xy}, f_{yx}$, and verify Clairaut's theorem.",
              "hint": "Hold one variable fixed at a time. For the mixed partials, differentiate $f_x$ by $y$ and separately $f_y$ by $x$, then check they match.",
              "solution": "First partials: $f_x = 2xy^3 - 4y$ (treating $y$ as constant); $f_y = 3x^2 y^2 - 4x + 2$ (treating $x$ as constant). Pure second partials: $f_{xx} = \\partial_x(2xy^3 - 4y) = 2y^3$; $f_{yy} = \\partial_y(3x^2 y^2 - 4x + 2) = 6x^2 y$. Mixed partials: $f_{xy} = \\partial_y(2xy^3 - 4y) = 6xy^2 - 4$; $f_{yx} = \\partial_x(3x^2 y^2 - 4x + 2) = 6xy^2 - 4$. Since $f_{xy} = f_{yx} = 6xy^2 - 4$, Clairaut's theorem is verified."
            },
            {
              "prompt": "Use local linearization to approximate $f(x,y) = \\ln(x^2 + y^2)$ near the point $(1, 0)$; specifically estimate $f(1.1, 0.1)$. Then compare to the exact value.",
              "hint": "Find $f(1,0)$, then $f_x$ and $f_y$ at $(1,0)$, and apply $f(a+\\Delta x, b+\\Delta y) \\approx f(a,b) + f_x \\Delta x + f_y \\Delta y$ with $\\Delta x = 0.1, \\Delta y = 0.1$.",
              "solution": "Base value: $f(1,0) = \\ln(1) = 0$. Partials: $f_x = \\frac{2x}{x^2+y^2}$, so $f_x(1,0) = 2/1 = 2$; $f_y = \\frac{2y}{x^2+y^2}$, so $f_y(1,0) = 0/1 = 0$. Linearization: $f(1.1, 0.1) \\approx 0 + 2(0.1) + 0(0.1) = 0.2$. Exact value: $\\ln(1.1^2 + 0.1^2) = \\ln(1.21 + 0.01) = \\ln(1.22) \\approx 0.1989$. The linear estimate $0.2$ matches to two decimals, with error about $0.001$."
            },
            {
              "prompt": "Consider $f(x,y) = e^{x} \\cos y$. (a) Show that $f$ satisfies Laplace's equation $f_{xx} + f_{yy} = 0$. (b) Compute the mixed partial $f_{xy}$ and confirm it equals $f_{yx}$.",
              "hint": "For (a), compute $f_{xx}$ and $f_{yy}$ separately and add. Remember $\\partial_y(\\cos y) = -\\sin y$ and $\\partial_y(-\\sin y) = -\\cos y$.",
              "solution": "First partials: $f_x = e^x \\cos y$, $f_y = -e^x \\sin y$. (a) $f_{xx} = \\partial_x(e^x \\cos y) = e^x \\cos y$; $f_{yy} = \\partial_y(-e^x \\sin y) = -e^x \\cos y$. Sum: $f_{xx} + f_{yy} = e^x \\cos y - e^x \\cos y = 0$, so Laplace's equation holds (this $f$ is harmonic). (b) $f_{xy} = \\partial_y(e^x \\cos y) = -e^x \\sin y$; $f_{yx} = \\partial_x(-e^x \\sin y) = -e^x \\sin y$. They agree: $f_{xy} = f_{yx} = -e^x \\sin y$, consistent with Clairaut's theorem."
            }
          ],
          "examples": [
            {
              "title": "Partial Derivatives of a Polynomial Surface",
              "body": "Let $f(x, y) = 3x^2 y + 4y^3 - 5x + 7$. Compute both first-order partial derivatives, $f_x$ and $f_y$, and then evaluate each at the point $(2, 1)$.",
              "solution": "A partial derivative measures the slope of the surface along one input direction. To find $f_x$, treat $y$ as a constant and differentiate with respect to $x$; to find $f_y$, treat $x$ as a constant and differentiate with respect to $y$.\n\n<strong>Step 1: Compute $f_x$ (hold $y$ fixed).</strong>\nGo term by term through $f(x,y) = 3x^2 y + 4y^3 - 5x + 7$:\n- $\\frac{\\partial}{\\partial x}(3x^2 y) = 3y \\cdot 2x = 6xy$ (the constant $3y$ multiplies the derivative of $x^2$).\n- $\\frac{\\partial}{\\partial x}(4y^3) = 0$ (no $x$ appears, so it is a constant).\n- $\\frac{\\partial}{\\partial x}(-5x) = -5$.\n- $\\frac{\\partial}{\\partial x}(7) = 0$.\n\nSo\n$$ f_x(x, y) = 6xy - 5. $$\n\n<strong>Step 2: Compute $f_y$ (hold $x$ fixed).</strong>\nNow $x$ is the constant:\n- $\\frac{\\partial}{\\partial y}(3x^2 y) = 3x^2$ (the constant $3x^2$ multiplies the derivative of $y$, which is $1$).\n- $\\frac{\\partial}{\\partial y}(4y^3) = 12y^2$.\n- $\\frac{\\partial}{\\partial y}(-5x) = 0$.\n- $\\frac{\\partial}{\\partial y}(7) = 0$.\n\nSo\n$$ f_y(x, y) = 3x^2 + 12y^2. $$\n\n<strong>Step 3: Evaluate at $(2, 1)$.</strong>\n$$ f_x(2, 1) = 6(2)(1) - 5 = 12 - 5 = 7. $$\n$$ f_y(2, 1) = 3(2)^2 + 12(1)^2 = 12 + 12 = 24. $$\n\n<strong>Answer:</strong> $f_x = 6xy - 5$ and $f_y = 3x^2 + 12y^2$; at $(2,1)$ these equal $f_x(2,1) = 7$ and $f_y(2,1) = 24$. Interpretation: at the point $(2,1)$, nudging $x$ increases $f$ at rate $7$ per unit, while nudging $y$ increases it more steeply, at rate $24$ per unit."
            },
            {
              "title": "Mixed Second-Order Partials and the Tangent-Plane Approximation",
              "body": "Let $f(x, y) = e^{x} \\sin y$. Verify Clairaut's theorem by showing $f_{xy} = f_{yx}$, then write the linearization (tangent plane) of $f$ at the point $(0, 0)$ and use it to estimate $f(0.1, 0.2)$.",
              "solution": "This example combines two skills: higher-order partials (using the product/chain rules carefully) and the local linearization that the tangent plane provides.\n\n<strong>Step 1: First-order partials.</strong>\nTreat the other variable as constant each time:\n$$ f_x = \\frac{\\partial}{\\partial x}\\big(e^x \\sin y\\big) = e^x \\sin y, \\qquad f_y = \\frac{\\partial}{\\partial y}\\big(e^x \\sin y\\big) = e^x \\cos y. $$\nHere $\\sin y$ is constant when differentiating in $x$, and $e^x$ is constant when differentiating in $y$.\n\n<strong>Step 2: The two mixed second-order partials.</strong>\nDifferentiate $f_x$ with respect to $y$:\n$$ f_{xy} = \\frac{\\partial}{\\partial y}\\big(e^x \\sin y\\big) = e^x \\cos y. $$\nDifferentiate $f_y$ with respect to $x$:\n$$ f_{yx} = \\frac{\\partial}{\\partial x}\\big(e^x \\cos y\\big) = e^x \\cos y. $$\nSince $f_{xy} = e^x \\cos y = f_{yx}$, Clairaut's theorem is confirmed: the order of mixed differentiation does not matter (it holds because these partials are continuous).\n\n<strong>Step 3: Build the linearization at $(0,0)$.</strong>\nThe tangent plane / local linearization is\n$$ L(x, y) = f(a,b) + f_x(a,b)\\,(x - a) + f_y(a,b)\\,(y - b). $$\nEvaluate the pieces at $(a,b) = (0,0)$:\n- $f(0,0) = e^0 \\sin 0 = 1 \\cdot 0 = 0.$\n- $f_x(0,0) = e^0 \\sin 0 = 0.$\n- $f_y(0,0) = e^0 \\cos 0 = 1 \\cdot 1 = 1.$\n\nSubstituting:\n$$ L(x, y) = 0 + 0\\cdot(x - 0) + 1\\cdot(y - 0) = y. $$\nSo near the origin, $f(x,y) = e^x \\sin y \\approx y$.\n\n<strong>Step 4: Estimate $f(0.1, 0.2)$.</strong>\n$$ f(0.1, 0.2) \\approx L(0.1, 0.2) = 0.2. $$\n\n<strong>Check against the true value:</strong> $f(0.1, 0.2) = e^{0.1}\\sin(0.2) \\approx (1.10517)(0.19867) \\approx 0.2196.$ The linear estimate $0.2$ is within about $9\\%$ of the true value — exactly the kind of cheap, local approximation that, scaled up to many variables, becomes the gradient step in machine-learning optimizers.\n\n<strong>Answer:</strong> $f_{xy} = f_{yx} = e^x \\cos y$ (Clairaut confirmed); the tangent plane at $(0,0)$ is $L(x,y) = y$, giving the estimate $f(0.1, 0.2) \\approx 0.2$ (true value $\\approx 0.2196$)."
            },
            {
              "title": "The gradient points uphill: directional derivatives",
              "body": "For $f(x,y) = x^2 + y^2$, find the rate of change at $(1, 2)$ in the direction of $(3, 4)$, and the direction of steepest ascent.",
              "solution": "<strong>The gradient.</strong> The partials are $f_x = 2x$ and $f_y = 2y$, so $\\nabla f = (2x, 2y)$. At $(1, 2)$ that is $\\nabla f = (2, 4)$.\n<strong>Directional derivative = gradient dotted with a unit direction.</strong> Normalize: $(3,4)$ has length 5, so $\\hat{u} = (\\tfrac{3}{5}, \\tfrac{4}{5})$. Then\n$$D_{\\hat u} f = \\nabla f \\cdot \\hat u = 2\\cdot\\tfrac{3}{5} + 4\\cdot\\tfrac{4}{5} = \\tfrac{6 + 16}{5} = 4.4.$$\n<strong>Steepest ascent.</strong> Since $\\nabla f \\cdot \\hat u = |\\nabla f|\\cos\\theta$ is largest when $\\hat u$ points along $\\nabla f$, the gradient itself is the direction of fastest increase, and the maximum rate is $|\\nabla f| = \\sqrt{2^2 + 4^2} = \\sqrt{20} \\approx 4.47$. Perpendicular to $\\nabla f$ the rate is zero — you are walking along a level curve.\n<strong>The aha.</strong> The gradient packs every directional derivative into one vector: its <em>direction</em> is steepest ascent, its <em>length</em> is that steepest rate, and the rate along any unit $\\hat u$ is the projection $\\nabla f \\cdot \\hat u$. That is exactly why gradient descent steps along $-\\nabla f$ — straight downhill."
            }
          ]
        },
        {
          "id": "c-gradient-directional",
          "title": "The Gradient, Directional Derivatives & Optimization",
          "minutes": 18,
          "content": "<h3>From one slope to many: why the gradient exists</h3>\n<p>In single-variable calculus the derivative $f'(x)$ answers a simple question: if I nudge $x$ a little, how much does $f$ change, and in which direction (up or down)? With a function of several variables, $f(x_1, x_2, \\dots, x_n)$, there is no longer a single \"slope.\" You can nudge in infinitely many directions, and the function responds differently to each. The <strong>gradient</strong> is the object that packages all of this local information into a single vector, and from it we can reconstruct the rate of change in <em>any</em> direction. This is the central tool behind essentially every model trained by gradient descent — from linear regression to deep neural networks.</p>\n\n<h3>Partial derivatives: holding everything else still</h3>\n<p>The first step is to ask the one-dimensional question along each coordinate axis. The <strong>partial derivative</strong> of $f$ with respect to $x_i$ is the ordinary derivative you get by treating every other variable as a constant:</p>\n$$\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(\\dots, x_i + h, \\dots) - f(\\dots, x_i, \\dots)}{h}.$$\n<p>Operationally: to differentiate $f(x,y) = x^2 y + \\sin y$ with respect to $x$, pretend $y$ is a number. You get $\\partial f / \\partial x = 2xy$. With respect to $y$, pretend $x$ is a number: $\\partial f / \\partial y = x^2 + \\cos y$. Each partial tells you the slope of $f$ as you move parallel to one axis, frozen at the current point.</p>\n\n<h3>Defining the gradient</h3>\n<p>The <strong>gradient</strong> of $f$ at a point is the vector whose components are the partial derivatives:</p>\n$$\\nabla f = \\begin{bmatrix} \\dfrac{\\partial f}{\\partial x_1} \\\\[6pt] \\dfrac{\\partial f}{\\partial x_2} \\\\[4pt] \\vdots \\\\[2pt] \\dfrac{\\partial f}{\\partial x_n} \\end{bmatrix}.$$\n<p>The symbol $\\nabla$ (\"nabla\" or \"del\") turns a scalar-valued function into a vector field: at every point, $\\nabla f$ is a vector living in the same space as the inputs. For $f(x,y) = x^2 y + \\sin y$ we have $\\nabla f = (2xy,\\; x^2 + \\cos y)$. Evaluated at $(1, 0)$ this is $(0, 2)$.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Do not confuse the gradient with the graph of $f$. The gradient lives in the <em>input</em> space (the $xy$-plane here), not on the surface. Picture standing on a hillside described by $f$: the gradient is an arrow drawn on the <em>map</em> beneath your feet, pointing in the compass direction of steepest uphill.</p></div>\n\n<h3>Directional derivatives: the rate of change in any direction</h3>\n<p>Partials only measure change along the axes. We usually want the rate of change in an arbitrary direction given by a <strong>unit vector</strong> $\\mathbf{u}$ (so $\\|\\mathbf{u}\\| = 1$). The <strong>directional derivative</strong> is</p>\n$$D_{\\mathbf{u}} f = \\lim_{h \\to 0} \\frac{f(\\mathbf{x} + h\\mathbf{u}) - f(\\mathbf{x})}{h}.$$\n<p>The miracle of differentiability is that we do not need a new limit for every direction. For a differentiable function, the directional derivative is just the dot product of the gradient with the direction:</p>\n$$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}.$$\n<p>This is the multivariable chain rule in disguise: walking along the line $g(h) = f(\\mathbf{x} + h\\mathbf{u})$, we get $g'(0) = \\sum_i \\frac{\\partial f}{\\partial x_i} u_i = \\nabla f \\cdot \\mathbf{u}$. One vector, the gradient, encodes the answer for <em>all</em> directions at once.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>The reason $\\mathbf{u}$ must be a unit vector is that we want a <em>rate per unit distance traveled</em>. If you allow $\\mathbf{u}$ to have length 2, the dot product doubles simply because you are taking bigger steps — that is not a property of the terrain. Always normalize: $\\mathbf{u} = \\mathbf{v}/\\|\\mathbf{v}\\|$.</p></div>\n\n<h3>Steepest ascent: the geometric heart of the gradient</h3>\n<p>Now the payoff. Using the geometric form of the dot product, with $\\theta$ the angle between $\\nabla f$ and $\\mathbf{u}$:</p>\n$$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = \\|\\nabla f\\|\\,\\|\\mathbf{u}\\|\\cos\\theta = \\|\\nabla f\\|\\cos\\theta.$$\n<p>Since $\\cos\\theta$ ranges over $[-1, 1]$, the directional derivative is:</p>\n<ul>\n<li><strong>Maximized</strong> when $\\theta = 0$, i.e. $\\mathbf{u}$ points the same way as $\\nabla f$. The maximum rate of increase is exactly $\\|\\nabla f\\|$.</li>\n<li><strong>Minimized</strong> (most negative) when $\\theta = \\pi$, i.e. $\\mathbf{u}$ points opposite to $\\nabla f$. The steepest <em>descent</em> direction is $-\\nabla f$, with rate $-\\|\\nabla f\\|$.</li>\n<li><strong>Zero</strong> when $\\theta = \\pi/2$, i.e. $\\mathbf{u}$ is perpendicular to $\\nabla f$. Moving this way keeps $f$ momentarily constant — you are walking along a <em>level set</em> (contour line).</li>\n</ul>\n<p>Three facts fall out of this single calculation, and they are the most important facts in the lesson:</p>\n<ol>\n<li>The gradient points in the direction of <strong>steepest ascent</strong>.</li>\n<li>Its magnitude $\\|\\nabla f\\|$ is the slope in that steepest direction (how fast $f$ climbs).</li>\n<li>The gradient is always <strong>perpendicular to the level sets</strong> of $f$.</li>\n</ol>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The contour-perpendicularity is worth pausing on. On a topographic map, the steepest path uphill always crosses the contour lines at right angles — never along them. That orthogonality is not a coincidence; it is forced by the algebra above. In ML, the \"terrain\" is the loss surface over parameter space, the contours are sets of equal loss, and we descend by always stepping perpendicular to them, downhill.</p></div>\n\n<h3>The multivariable chain rule</h3>\n<p>Suppose the inputs themselves depend on a parameter $t$: $\\mathbf{x}(t) = (x_1(t), \\dots, x_n(t))$, and we care about $f(\\mathbf{x}(t))$. The chain rule generalizes beautifully:</p>\n$$\\frac{d}{dt} f(\\mathbf{x}(t)) = \\sum_{i=1}^{n} \\frac{\\partial f}{\\partial x_i}\\frac{dx_i}{dt} = \\nabla f \\cdot \\frac{d\\mathbf{x}}{dt}.$$\n<p>Each path of influence from $t$ to $f$ contributes a product of derivatives, and we sum over all paths. This \"sum over paths\" structure is precisely what <strong>backpropagation</strong> computes: a neural network is a long composition of functions, and the gradient of the loss with respect to an early weight is a sum of products of local derivatives along every route from that weight to the output. The chain rule is the entire mathematical content of backprop; the rest is bookkeeping (and reusing intermediate results to do it efficiently).</p>\n\n<h3>Worked example</h3>\n<p>Let $f(x, y) = x^2 + 3xy + y^2$. Evaluate everything at the point $P = (1, 2)$.</p>\n<p><strong>Step 1 — Partials and gradient.</strong></p>\n$$\\frac{\\partial f}{\\partial x} = 2x + 3y, \\qquad \\frac{\\partial f}{\\partial y} = 3x + 2y.$$\n<p>At $P=(1,2)$: $\\partial f/\\partial x = 2(1) + 3(2) = 8$ and $\\partial f/\\partial y = 3(1) + 2(2) = 7$. So</p>\n$$\\nabla f(P) = (8, 7).$$\n<p><strong>Step 2 — Directional derivative toward $(3, 4)$ from $P$.</strong> The direction vector is $\\mathbf{v} = (3,4)$, with $\\|\\mathbf{v}\\| = \\sqrt{9+16} = 5$, so the unit vector is $\\mathbf{u} = (3/5, 4/5)$. Then</p>\n$$D_{\\mathbf{u}} f(P) = \\nabla f(P) \\cdot \\mathbf{u} = (8)(3/5) + (7)(4/5) = \\frac{24 + 28}{5} = \\frac{52}{5} = 10.4.$$\n<p>So $f$ increases at a rate of $10.4$ units per unit distance traveled in that direction.</p>\n<p><strong>Step 3 — Steepest ascent and descent.</strong> The steepest-ascent direction at $P$ is $\\nabla f(P) = (8,7)$, or as a unit vector $(8,7)/\\sqrt{113}$. The maximum rate of increase is</p>\n$$\\|\\nabla f(P)\\| = \\sqrt{8^2 + 7^2} = \\sqrt{113} \\approx 10.63.$$\n<p>Note $10.4 < 10.63$: our chosen direction was close to steepest but not quite, exactly as the theory demands. The steepest <em>descent</em> direction is $-(8,7) = (-8,-7)$, with rate $-\\sqrt{113}$. A direction of zero change is anything perpendicular to $(8,7)$, e.g. $(7, -8)$ (check: $(8)(7)+(7)(-8)=0$).</p>\n\n<h3>Gradient descent: turning calculus into learning</h3>\n<p>In machine learning we have a <strong>loss function</strong> $L(\\theta)$ that measures how badly a model with parameters $\\theta$ fits the data. Training means finding $\\theta$ that makes $L$ small. We rarely can solve $\\nabla L = 0$ in closed form (millions of parameters, nonconvex surface), so we descend iteratively. Since $-\\nabla L$ is the direction of steepest decrease, the natural move is to take a small step that way:</p>\n$$\\boxed{\\;\\theta \\leftarrow \\theta - \\alpha\\,\\nabla L(\\theta)\\;}$$\n<p>Here $\\alpha > 0$ is the <strong>learning rate</strong> (step size). Reading the update piece by piece:</p>\n<ul>\n<li>$\\nabla L(\\theta)$ points uphill (toward worse loss), so we subtract it to go downhill.</li>\n<li>The magnitude of each component scales the step: parameters with steep slope move more, flat ones barely move.</li>\n<li>$\\alpha$ controls how far we trust the local linear approximation. Too small and learning crawls; too large and you overshoot the valley, possibly diverging (the loss climbs instead of falling). The gradient only tells you the best <em>infinitesimal</em> direction — it says nothing about how far that direction stays good.</li>\n<li>At a minimum, $\\nabla L = 0$, so the update stops moving. (Plateaus and saddle points, where the gradient is also near zero, are a real practical nuisance for exactly this reason.)</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">ML connection</div><p>Every variant you have heard of is a tweak to this one line. <strong>Stochastic gradient descent</strong> estimates $\\nabla L$ from a mini-batch instead of the full dataset (cheaper, noisier). <strong>Momentum</strong> averages past gradients to push through flat regions. <strong>Adam</strong> rescales each coordinate by a running estimate of its gradient magnitude. None of them change the core idea: walk opposite the gradient.</p></div>\n\n<h3>Common pitfalls to internalize</h3>\n<ul>\n<li><strong>Forgetting to normalize.</strong> $D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u}$ only gives a true rate-per-distance when $\\|\\mathbf{u}\\|=1$.</li>\n<li><strong>Sign confusion.</strong> The gradient is steepest <em>ascent</em>. To minimize, you must subtract it — hence the minus sign in $\\theta \\leftarrow \\theta - \\alpha\\nabla L$.</li>\n<li><strong>Treating $\\|\\nabla f\\|$ as the value of $f$.</strong> The magnitude is a slope, not a height. A large gradient means a steep region, not a large function value.</li>\n<li><strong>Expecting the gradient to point at the minimum.</strong> It points along the local steepest direction only; on a curved surface that direction generally does <em>not</em> aim straight at the optimum, which is why descent zig-zags.</li>\n</ul>\n<p>With these in hand, you have the conceptual core of optimization for ML: compute a gradient, read off its direction and magnitude, and step against it to learn.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-gd2d\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the gradient points straight uphill — and crosses the contours at right angles</summary>\n<p>The directional derivative of $f$ at a point, in a unit direction $u$, is $D_u f = \\nabla f \\cdot u$ — the rate of change as you step that way. Because a dot product is $a \\cdot b = \\lVert a\\rVert\\,\\lVert b\\rVert \\cos\\theta$, this equals $D_u f = \\lVert \\nabla f\\rVert \\cos\\theta$, where $\\theta$ is the angle between your step direction and the gradient.</p>\n<p>That cosine is largest at $\\theta = 0$. Stepping in the <em>same</em> direction as $\\nabla f$ gives the greatest possible increase, of size $\\lVert\\nabla f\\rVert$. So the gradient <strong>is</strong> the direction of steepest ascent, and its length is the steepest slope; step the opposite way, $-\\nabla f$, for steepest descent — precisely what gradient descent does.</p>\n<p><strong>Perpendicular to the level sets:</strong> along a contour where $f$ is constant, the rate of change is zero, so $D_u f = \\nabla f \\cdot u = 0$ for every direction $u$ tangent to that contour. A zero dot product means $\\nabla f$ is orthogonal to every tangent of the level set — the gradient always points straight <em>across</em> the contour lines, never along them. On a topographic map, the steepest path crosses the contours at right angles.</p>\n<p>This one fact powers a surprising amount: descent follows $-\\nabla f$; at a constrained optimum the gradient lines up parallel to the constraint's gradient (the Lagrange condition); and it is why contour/level-set plots are the right way to actually <em>see</em> a multivariable function and its optimization.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The directional derivative is <code>D_u f = ∇f · u</code> with <code>u</code> a unit vector. In the gradient's own direction it equals <code>|∇f|</code> — the steepest-ascent rate. Run it for ∇f=[3,4] along [3,4]:</p>\n<div data-code=\"javascript\" data-expected=\"5.00\">// Directional derivative D_u f = grad(f) . u, with u a UNIT vector.\nfunction dirDeriv(grad, dir) {\n  var norm = Math.hypot(dir[0], dir[1]);\n  var u = [dir[0] / norm, dir[1] / norm];\n  return grad[0] * u[0] + grad[1] * u[1];\n}\nconsole.log(dirDeriv([3, 4], [3, 4]).toFixed(2));   // 5.00 -- equals |grad|, the steepest direction</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the directional derivative is ∇f·û</summary>\n<p>The gradient points uphill and crosses contours at right angles — both facts fall out of one formula: the <b>directional derivative</b>.</p>\n<p><b>One vector holds every slope.</b> The rate of change of $f$ as you step in a unit direction $\\hat{\\mathbf{u}}$ is $D_{\\hat{\\mathbf{u}}}f = \\nabla f \\cdot \\hat{\\mathbf{u}}$ — just dot the gradient with the direction. So $\\nabla f$ is not one slope; it is a compact package of <em>all</em> directional slopes at a point, any of which you recover with a single dot product.</p>\n<p><b>Why uphill and why perpendicular.</b> Since $\\nabla f \\cdot \\hat{\\mathbf{u}} = \\lVert \\nabla f\\rVert \\cos\\theta$, the slope is <em>largest</em> when $\\theta = 0$ (step along $\\nabla f$ — steepest ascent), <em>most negative</em> at $\\theta = 180^\\circ$ (steepest descent — what gradient descent follows), and <em>zero</em> when $\\theta = 90^\\circ$ (perpendicular to $\\nabla f$, which is exactly the contour direction, where $f$ does not change).</p>\n<p><b>Check it.</b> For $f = x^2 + y^2$, $\\nabla f = (2x, 2y)$; at $(1,1)$ that is $(2,2)$. Along $\\hat{\\mathbf{u}} = (\\tfrac{1}{\\sqrt2}, \\tfrac{1}{\\sqrt2})$ (toward the gradient) the slope is $\\tfrac{2+2}{\\sqrt2} = 2\\sqrt2$ (the max); along $(\\tfrac{1}{\\sqrt2}, -\\tfrac{1}{\\sqrt2})$ (perpendicular) it is $0$ — exactly the contour.</p>\n<p>The \"aha\": the gradient is \"the derivative\" of a multivariable function precisely because $\\nabla f \\cdot \\hat{\\mathbf{u}}$ regenerates the slope in <em>any</em> direction. Uphill, downhill, and along-the-contour are just the three special angles of one dot product.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the gradient is the engine of optimization</summary>\n<p>The two facts from the other dives — the gradient $\\nabla f$ points in the direction of <em>steepest ascent</em>, and its negative points steepest <em>downhill</em> — make the gradient the single most important object in machine learning. Nearly all training is one idea: <strong>follow the negative gradient downhill.</strong></p>\n<p><b>Gradient descent.</b> To minimize a loss $L(\\theta)$ over millions of parameters $\\theta$, you cannot search the space. Instead you compute $\\nabla L$ and take a small step <em>against</em> it: $$\\theta \\leftarrow \\theta - \\eta\\,\\nabla L(\\theta),$$ where $\\eta$ is the learning rate. Each step lowers the loss the most for its size, because $-\\nabla L$ is the steepest-descent direction. Repeat millions of times and you have trained a neural network.</p>\n<p><b>Why the gradient and not something else.</b> Among all unit directions $\\hat u$, the directional derivative $\\nabla f\\cdot\\hat u$ is most negative when $\\hat u$ points along $-\\nabla f$ (the other dive's formula, via Cauchy–Schwarz). So $-\\nabla f$ is not just <em>a</em> downhill direction — it is the <em>steepest</em> one, which is why first-order optimization uses it everywhere from linear regression to LLMs.</p>\n<p>The \"aha\": the gradient turns \"minimize this function\" into a mechanical loop — step against $\\nabla f$, repeat. Because $-\\nabla f$ is provably the steepest-descent direction, gradient descent (and its cousins SGD and Adam) is how essentially every model in modern ML is trained.</p>\n</details>\n",
          "mcq": [
            {
              "q": "At a point $P$, $\\nabla f(P) = (3, 4)$. What is the maximum rate of increase of $f$ at $P$, and in which direction does it occur?",
              "choices": [
                "Rate $7$, in direction $(3,4)$",
                "Rate $5$, in direction $(3,4)/5$",
                "Rate $25$, in direction $(4,-3)/5$",
                "Rate $5$, in direction $(-3,-4)/5$"
              ],
              "answer": 1,
              "explain": "The maximum rate equals $\\|\\nabla f\\| = \\sqrt{9+16}=5$, achieved in the gradient's own (unit) direction $(3,4)/5$. The opposite direction gives steepest descent, and $(4,-3)$ is the zero-change direction."
            },
            {
              "q": "You compute $\\nabla f \\cdot \\mathbf{v} = 12$ where $\\mathbf{v} = (3, 4)$. Why is $12$ NOT the directional derivative of $f$ along $\\mathbf{v}$?",
              "choices": [
                "$\\mathbf{v}$ is not a unit vector ($\\|\\mathbf{v}\\| = 5$), so you must divide by its length: the directional derivative is $12/5$",
                "The dot product is the wrong operation; you should use the cross product",
                "Directional derivatives are always between $-1$ and $1$",
                "The gradient must be evaluated at the origin for the formula to hold"
              ],
              "answer": 0,
              "explain": "$D_{\\mathbf{u}}f = \\nabla f\\cdot\\mathbf{u}$ requires a unit vector. Here $\\|\\mathbf{v}\\|=5$, so the true rate per unit distance is $12/5 = 2.4$, not $12$."
            },
            {
              "q": "In the gradient descent update $\\theta \\leftarrow \\theta - \\alpha\\nabla L(\\theta)$, why is there a minus sign?",
              "choices": [
                "To convert the gradient into a unit vector",
                "It is a convention with no mathematical meaning; $+\\alpha$ works equally well",
                "Because the learning rate $\\alpha$ is always negative",
                "Because $\\nabla L$ points toward increasing loss, and we want to decrease loss, so we move in the opposite ($-\\nabla L$) direction of steepest descent"
              ],
              "answer": 3,
              "explain": "The gradient points in the direction of steepest ascent of the loss. To minimize, we step in $-\\nabla L$, the steepest-descent direction; the minus sign encodes exactly this."
            },
            {
              "q": "Which statement about the gradient and the level sets (contours) of $f$ is correct?",
              "choices": [
                "The gradient is tangent to the level set at each point",
                "The gradient is perpendicular to the level set, because moving along a contour gives directional derivative zero",
                "The gradient lies on the graph (surface) of $f$, not in the input space",
                "The gradient points along the contour toward the minimum"
              ],
              "answer": 1,
              "explain": "Along a contour $f$ is constant, so the directional derivative is $0$, meaning the direction is perpendicular to $\\nabla f$. Equivalently, $\\nabla f$ is orthogonal to every level set."
            },
            {
              "q": "For $f(x,y) = x^2 y + \\sin y$, what is $\\partial f / \\partial y$?",
              "choices": [
                "$2xy$",
                "$x^2 - \\cos y$",
                "$x^2 + \\cos y$",
                "$2xy + \\cos y$"
              ],
              "answer": 2,
              "explain": "Treating $x$ as a constant, the derivative of $x^2 y$ with respect to $y$ is $x^2$, and the derivative of $\\sin y$ is $\\cos y$, giving $x^2 + \\cos y$."
            },
            {
              "q": "The directional derivative of $f$ in the direction of a vector $\\mathbf{u}$ is defined as $\\nabla f \\cdot \\mathbf{u}$. What requirement must $\\mathbf{u}$ satisfy for this to correctly measure the rate of change per unit distance?",
              "choices": [
                "$\\mathbf{u}$ must be parallel to $\\nabla f$",
                "$\\mathbf{u}$ must be orthogonal to a level set",
                "$\\mathbf{u}$ must be a unit vector, $\\|\\mathbf{u}\\| = 1$",
                "$\\mathbf{u}$ must point uphill"
              ],
              "answer": 2,
              "explain": "If $\\mathbf{u}$ is not normalized to length 1, the dot product scales with $\\|\\mathbf{u}\\|$ and no longer reports the rate of change per unit of distance traveled."
            },
            {
              "q": "For $f(x,y)$, the gradient $\\nabla f$ at a point is a vector that lives in which space?",
              "choices": [
                "In the input space — the $xy$-plane",
                "On the surface of the graph of $f$, tangent to it",
                "In a one-dimensional space, since $f$ is scalar-valued",
                "In the three-dimensional space containing the graph"
              ],
              "answer": 0,
              "explain": "The gradient is built from partial derivatives with respect to the inputs, so it is a vector in the same space as the inputs (the $xy$-plane), drawn on the 'map' beneath your feet, not on the surface itself."
            },
            {
              "q": "At a point where $\\nabla f = (1, -2)$, in which direction does $f$ decrease most rapidly?",
              "choices": [
                "$(1, -2)$",
                "$(-1, 2)$",
                "$(2, 1)$",
                "$(-2, -1)$"
              ],
              "answer": 1,
              "explain": "The direction of steepest descent is the negative of the gradient, $-\\nabla f = (-1, 2)$, which is exactly the direction gradient descent steps along."
            },
            {
              "q": "Compute the directional derivative of $f(x,y) = x^2 + 3xy$ at the point $(1, 2)$ in the direction of $\\mathbf{v} = (3, 4)$.",
              "choices": [
                "$\\frac{27}{5}$",
                "$36$",
                "$\\frac{36}{5}$",
                "$\\frac{30}{5}$"
              ],
              "answer": 2,
              "explain": "$\\nabla f = (2x + 3y,\\ 3x) = (8, 3)$ at $(1,2)$. Normalizing $\\mathbf{v}=(3,4)$ to the unit vector $(3/5, 4/5)$, $D_{\\mathbf{u}}f = (8,3)\\cdot(3/5, 4/5) = (24+12)/5 = 36/5$. The distractor $36$ forgets to divide by $\\lVert\\mathbf v\\rVert = 5$."
            },
            {
              "q": "At a point $P$ where $\\nabla f(P) = (0, 0)$, which conclusion is justified about $f$ at $P$?",
              "choices": [
                "$P$ must be a local maximum of $f$",
                "$f$ has no well-defined tangent plane at $P$",
                "$f$ must be constant in a neighborhood of $P$",
                "The directional derivative of $f$ at $P$ is zero in every direction"
              ],
              "answer": 3,
              "explain": "Since $D_{\\mathbf u}f = \\nabla f\\cdot\\mathbf u = (0,0)\\cdot\\mathbf u = 0$ for every unit $\\mathbf u$, the instantaneous rate of change vanishes in all directions. A zero gradient marks a critical point, which may be a max, min, or saddle, so claiming a maximum or constancy is the tempting but unjustified leap."
            },
            {
              "q": "Two unit vectors $\\mathbf{u}$ and $\\mathbf{w}$ point in opposite directions. If the directional derivative $D_{\\mathbf{u}} f = 5$ at a point, what is $D_{\\mathbf{w}} f$ there?",
              "choices": [
                "$5$",
                "$0$",
                "Cannot be determined without knowing $\\nabla f$",
                "$-5$"
              ],
              "answer": 3,
              "explain": "With $\\mathbf w = -\\mathbf u$, $D_{\\mathbf w}f = \\nabla f\\cdot(-\\mathbf u) = -(\\nabla f\\cdot\\mathbf u) = -5$. The directional derivative is odd in direction; expecting the same value $5$ ignores the sign flip, and it is fully determined by the given quantity."
            },
            {
              "q": "A student rescales the gradient before a step: instead of $\\theta \\leftarrow \\theta - \\alpha\\nabla L$, they use $\\theta \\leftarrow \\theta - \\alpha\\,\\frac{\\nabla L}{\\lVert \\nabla L \\rVert}$. Compared to plain gradient descent, what changes?",
              "choices": [
                "The step still points downhill, but its length no longer shrinks as the gradient gets small near a minimum",
                "The step now points uphill because dividing by the norm flips the sign",
                "Convergence is guaranteed in one step regardless of $\\alpha$",
                "The descent direction is reversed relative to the level sets"
              ],
              "answer": 0,
              "explain": "Dividing by $\\lVert\\nabla L\\rVert$ keeps the same downhill direction (the sign is unchanged) but fixes the step length at $\\alpha$, so it no longer automatically tapers near a minimum where $\\nabla L\\to 0$. The other options misread normalization as a sign change or a magic convergence guarantee."
            },
            {
              "q": "For a function $f(x,y)$, the gradient $\\nabla f$ is the vector:",
              "choices": [
                "$\\left(\\dfrac{\\partial f}{\\partial x} - \\dfrac{\\partial f}{\\partial y}\\right)$",
                "the matrix of second derivatives",
                "$\\left(\\dfrac{\\partial f}{\\partial x},\\ \\dfrac{\\partial f}{\\partial y}\\right)$",
                "a single scalar, $\\dfrac{\\partial f}{\\partial x}\\cdot\\dfrac{\\partial f}{\\partial y}$"
              ],
              "answer": 2,
              "explain": "The gradient stacks the first partial derivatives into a vector: $\\nabla f = (f_x, f_y)$ (in $n$ dimensions, $(f_{x_1},\\dots,f_{x_n})$). It points in the direction of steepest ascent, and its length is the maximum rate of increase."
            },
            {
              "q": "Compute the gradient of $f(x,y) = x^2 + y^2$ at the point $(1, 2)$.",
              "choices": [
                "$(2, 4)$",
                "$(x^2, y^2)$",
                "$(4, 2)$",
                "$(2, 2)$"
              ],
              "answer": 0,
              "explain": "$\\nabla f = (\\partial f/\\partial x,\\ \\partial f/\\partial y) = (2x,\\ 2y)$. At $(1,2)$ that is $(2\\cdot1,\\ 2\\cdot2) = (2, 4)$ — pointing radially outward, the direction of steepest ascent on the bowl."
            },
            {
              "q": "To compute the directional derivative of $f$ in the direction of a (non-unit) vector $\\mathbf{v}$, you first:",
              "choices": [
                "square $\\mathbf{v}$",
                "just dot $\\nabla f$ with $\\mathbf{v}$ as given",
                "multiply $\\mathbf{v}$ by $\\|\\mathbf{v}\\|$",
                "normalize $\\mathbf{v}$ to a unit vector $\\hat{\\mathbf{v}} = \\mathbf{v}/\\|\\mathbf{v}\\|$, then take $\\nabla f \\cdot \\hat{\\mathbf{v}}$"
              ],
              "answer": 3,
              "explain": "The directional derivative $D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u}$ is defined for a *unit* vector $\\mathbf{u}$. Dotting with a non-unit $\\mathbf{v}$ scales the answer by $\\|\\mathbf{v}\\|$, so normalize first. This is exactly why $\\nabla f\\cdot\\mathbf v$ alone can over- or under-state the true rate."
            },
            {
              "q": "If a unit vector $\\mathbf{u}$ is perpendicular to $\\nabla f$ at a point, the directional derivative $D_{\\mathbf{u}}f$ there is:",
              "choices": [
                "maximal",
                "$0$ — you're moving along a level curve, so $f$ is momentarily unchanged",
                "$\\|\\nabla f\\|$",
                "negative"
              ],
              "answer": 1,
              "explain": "$D_{\\mathbf{u}}f = \\nabla f\\cdot\\mathbf{u} = \\|\\nabla f\\|\\cos\\theta$; when $\\mathbf{u}\\perp\\nabla f$, $\\theta=90^\\circ$ and $\\cos\\theta = 0$. Geometrically you're moving along a contour (level set), where $f$ doesn't change — which is why the gradient is always perpendicular to level curves."
            }
          ],
          "flashcards": [
            {
              "front": "What is the gradient $\\nabla f$ of a scalar function, as a vector?",
              "back": "The vector of partial derivatives: $\\nabla f = (\\partial f/\\partial x_1, \\dots, \\partial f/\\partial x_n)$. It lives in the input space and points in the direction of steepest ascent."
            },
            {
              "front": "Formula for the directional derivative of $f$ along a unit vector $\\mathbf{u}$?",
              "back": "$D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u}$ (valid when $\\|\\mathbf{u}\\|=1$). Geometrically $= \\|\\nabla f\\|\\cos\\theta$, where $\\theta$ is the angle between $\\nabla f$ and $\\mathbf{u}$."
            },
            {
              "front": "In what direction does $f$ increase fastest, and what is that maximum rate?",
              "back": "Fastest increase is along $\\nabla f$ itself; the maximum rate of increase equals $\\|\\nabla f\\|$. Steepest decrease is along $-\\nabla f$ with rate $-\\|\\nabla f\\|$."
            },
            {
              "front": "How is the gradient related to the level sets (contours) of $f$?",
              "back": "It is always perpendicular to the level sets, because moving along a contour keeps $f$ constant (directional derivative $= 0$)."
            },
            {
              "front": "State the multivariable chain rule for $f(\\mathbf{x}(t))$.",
              "back": "$\\dfrac{d}{dt}f(\\mathbf{x}(t)) = \\sum_i \\dfrac{\\partial f}{\\partial x_i}\\dfrac{dx_i}{dt} = \\nabla f \\cdot \\dfrac{d\\mathbf{x}}{dt}$. This 'sum over paths' is the math behind backpropagation."
            },
            {
              "front": "Write and explain the gradient descent update rule.",
              "back": "$\\theta \\leftarrow \\theta - \\alpha\\nabla L(\\theta)$. We step opposite the gradient (steepest descent) to reduce loss $L$; $\\alpha > 0$ is the learning rate controlling step size."
            }
          ],
          "homework": [
            {
              "prompt": "Let $f(x, y) = x^2 y - y^3$. (a) Find $\\nabla f$. (b) Evaluate the gradient at $P = (2, 1)$. (c) Find the directional derivative at $P$ in the direction of $\\mathbf{v} = (1, 1)$.",
              "hint": "Differentiate treating the other variable as constant. Remember to normalize $\\mathbf{v}$ before dotting it with the gradient.",
              "solution": "(a) $\\partial f/\\partial x = 2xy$ and $\\partial f/\\partial y = x^2 - 3y^2$, so $\\nabla f = (2xy,\\; x^2 - 3y^2)$. (b) At $(2,1)$: $\\partial f/\\partial x = 2(2)(1) = 4$, $\\partial f/\\partial y = 4 - 3 = 1$, so $\\nabla f(P) = (4, 1)$. (c) $\\|\\mathbf{v}\\| = \\sqrt{2}$, so $\\mathbf{u} = (1/\\sqrt2, 1/\\sqrt2)$. Then $D_{\\mathbf{u}}f = (4)(1/\\sqrt2) + (1)(1/\\sqrt2) = 5/\\sqrt2 = \\tfrac{5\\sqrt2}{2} \\approx 3.54$."
            },
            {
              "prompt": "At a point, the loss gradient is $\\nabla L = (-2, 4)$ and the learning rate is $\\alpha = 0.1$. Current parameters are $\\theta = (1, 3)$. (a) Perform one gradient descent step. (b) In which unit direction would the loss increase fastest, and what is that rate?",
              "hint": "Apply $\\theta \\leftarrow \\theta - \\alpha\\nabla L$ component by component. For (b) recall steepest ascent is along $\\nabla L$ itself with rate $\\|\\nabla L\\|$.",
              "solution": "(a) $\\theta_{\\text{new}} = (1,3) - 0.1\\,(-2,4) = (1 + 0.2,\\; 3 - 0.4) = (1.2,\\; 2.6)$. Notice the first parameter increased and the second decreased — each moves opposite its gradient component, downhill on $L$. (b) Loss increases fastest along $\\nabla L = (-2,4)$, i.e. unit direction $(-2,4)/\\sqrt{20} = (-1/\\sqrt5,\\; 2/\\sqrt5)$, with rate $\\|\\nabla L\\| = \\sqrt{4+16} = \\sqrt{20} = 2\\sqrt5 \\approx 4.47$."
            },
            {
              "prompt": "For $f(x,y) = e^{x}\\cos y$ at the point $P = (0, 0)$: (a) find $\\nabla f(P)$; (b) find a unit direction in which the directional derivative is exactly zero; (c) explain geometrically what such a direction represents.",
              "hint": "A direction of zero change is perpendicular to the gradient. Use the dot-product-equals-zero condition.",
              "solution": "(a) $\\partial f/\\partial x = e^x\\cos y$ and $\\partial f/\\partial y = -e^x\\sin y$. At $(0,0)$: $\\partial f/\\partial x = e^0\\cos 0 = 1$, $\\partial f/\\partial y = -e^0\\sin 0 = 0$. So $\\nabla f(P) = (1, 0)$. (b) We need $\\mathbf{u}$ with $\\nabla f\\cdot\\mathbf{u} = 0$, i.e. $u_1 = 0$. The unit vector $(0, 1)$ (or $(0,-1)$) works: $(1,0)\\cdot(0,1) = 0$. (c) This direction is tangent to the level curve of $f$ through $P$; moving along it keeps $f$ momentarily constant, so you are traveling along a contour line, perpendicular to the gradient."
            }
          ],
          "examples": [
            {
              "title": "Computing the Gradient and a Single Directional Derivative",
              "body": "Let $f(x, y) = x^2 y + 3y^2$. Compute the gradient $\\nabla f$, then find the directional derivative of $f$ at the point $(2, 1)$ in the direction of the vector $\\mathbf{v} = (3, 4)$.",
              "solution": "Step 1 — Find the partials. Treat $y$ as constant for $\\partial f/\\partial x$, and $x$ as constant for $\\partial f/\\partial y$:\n$$\\frac{\\partial f}{\\partial x} = 2xy, \\qquad \\frac{\\partial f}{\\partial y} = x^2 + 6y.$$\nSo the gradient is the vector of partials:\n$$\\nabla f(x,y) = (2xy,\\; x^2 + 6y).$$\n\nStep 2 — Evaluate the gradient at $(2, 1)$:\n$$\\nabla f(2,1) = (2\\cdot 2 \\cdot 1,\\; 2^2 + 6\\cdot 1) = (4,\\; 10).$$\n\nStep 3 — Normalize the direction. The directional derivative requires a unit vector. The length of $\\mathbf{v} = (3,4)$ is $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$, so the unit direction is\n$$\\hat{\\mathbf{u}} = \\left(\\tfrac{3}{5},\\; \\tfrac{4}{5}\\right).$$\n\nStep 4 — Take the dot product of the gradient with $\\hat{\\mathbf{u}}$:\n$$D_{\\hat{\\mathbf{u}}} f(2,1) = \\nabla f(2,1) \\cdot \\hat{\\mathbf{u}} = 4\\cdot\\tfrac{3}{5} + 10\\cdot\\tfrac{4}{5} = \\tfrac{12}{5} + \\tfrac{40}{5} = \\tfrac{52}{5}.$$\n\nAnswer: $\\nabla f = (2xy,\\, x^2+6y)$, and the directional derivative at $(2,1)$ toward $(3,4)$ is $D_{\\hat{\\mathbf{u}}} f = \\dfrac{52}{5} = 10.4$."
            },
            {
              "title": "Direction of Steepest Descent and One Gradient Step",
              "body": "A loss surface is modeled by $L(w_1, w_2) = w_1^2 + 2w_1 w_2 + 3w_2^2$. At the current parameters $(w_1, w_2) = (1, 2)$, find the unit direction of steepest descent and the maximum rate of decrease, then take one gradient-descent step with learning rate $\\eta = 0.1$.",
              "solution": "Step 1 — Compute the gradient. Differentiate term by term, treating the other variable as constant:\n$$\\frac{\\partial L}{\\partial w_1} = 2w_1 + 2w_2, \\qquad \\frac{\\partial L}{\\partial w_2} = 2w_1 + 6w_2.$$\nSo $\\nabla L = (2w_1 + 2w_2,\\; 2w_1 + 6w_2)$.\n\nStep 2 — Evaluate at $(1, 2)$:\n$$\\nabla L(1,2) = (2\\cdot 1 + 2\\cdot 2,\\; 2\\cdot 1 + 6\\cdot 2) = (6,\\; 14).$$\n\nStep 3 — Steepest ascent vs. descent. The gradient points in the direction of steepest *increase*, so steepest *descent* is the opposite direction, $-\\nabla L = (-6, -14)$. To report it as a unit vector, divide by the gradient's length:\n$$\\|\\nabla L\\| = \\sqrt{6^2 + 14^2} = \\sqrt{36 + 196} = \\sqrt{232} = 2\\sqrt{58}.$$\nThe unit direction of steepest descent is\n$$\\hat{\\mathbf{d}} = \\frac{(-6, -14)}{2\\sqrt{58}} = \\left(\\frac{-3}{\\sqrt{58}},\\; \\frac{-7}{\\sqrt{58}}\\right).$$\n\nStep 4 — Maximum rate of change. The steepest slope at a point equals $\\|\\nabla L\\|$; descent moves at the negative of this:\n$$\\text{max rate of decrease} = -\\|\\nabla L\\| = -2\\sqrt{58} \\approx -15.23.$$\n\nStep 5 — One gradient-descent step. Update the parameters using $\\mathbf{w}_{\\text{new}} = \\mathbf{w} - \\eta\\,\\nabla L$:\n$$\\mathbf{w}_{\\text{new}} = (1, 2) - 0.1\\,(6, 14) = (1 - 0.6,\\; 2 - 1.4) = (0.4,\\; 0.6).$$\n\nCheck (optional): the loss drops from $L(1,2) = 1 + 4 + 12 = 17$ to $L(0.4, 0.6) = 0.16 + 0.48 + 1.08 = 1.72$, confirming the step moved downhill.\n\nAnswer: steepest-descent unit direction $\\hat{\\mathbf{d}} = \\left(\\tfrac{-3}{\\sqrt{58}}, \\tfrac{-7}{\\sqrt{58}}\\right)$, maximum rate of decrease $-2\\sqrt{58} \\approx -15.23$, and after one step $(w_1, w_2) = (0.4,\\, 0.6)$."
            },
            {
              "title": "Moving along a level curve: the directional derivative is zero",
              "body": "For $f(x,y) = x^2 + y^2$, the gradient at $(1,1)$ is $\\nabla f = (2, 2)$. Find the directional derivative in the direction $\\hat u = \\tfrac{1}{\\sqrt 2}(1, -1)$, and say what the answer means.",
              "solution": "<strong>Dot the gradient with the unit direction.</strong> $D_{\\hat u} f = \\nabla f \\cdot \\hat u = 2\\cdot\\tfrac{1}{\\sqrt 2} + 2\\cdot\\tfrac{-1}{\\sqrt 2} = \\tfrac{2 - 2}{\\sqrt 2} = 0$.\n<strong>Zero means no change, to first order.</strong> The direction $(1, -1)$ is <em>perpendicular</em> to the gradient $(2, 2)$ (dot product 0), and along a direction perpendicular to $\\nabla f$ the function is momentarily flat — you are moving <b>along a level curve</b> (here the circle $x^2 + y^2 = 2$), where $f$ stays constant.\n<strong>The geometry of the gradient.</strong> $D_{\\hat u} f = |\\nabla f|\\cos\\theta$ is maximal along $\\nabla f$ ($\\theta = 0$, steepest ascent), minimal opposite it (steepest descent), and <em>zero</em> at right angles ($\\theta = 90°$). So the gradient is always perpendicular to the level curves it crosses.\n<strong>The aha.</strong> The gradient points straight uphill, and its perpendicular directions are exactly the ones that keep you at the same height. That orthogonality — gradient perpendicular to level set — is why contour lines and gradient arrows meet at right angles, and why constrained optimization (Lagrange) balances the two."
            }
          ]
        },
        {
          "id": "c-multivariable-optimization",
          "title": "Critical Points, Hessians & Multivariable Optimization",
          "minutes": 16,
          "content": "<h3>From One Variable to Many: Why Critical Points Matter</h3>\n<p>In single-variable calculus, optimization is almost a reflex: set $f'(x) = 0$, solve, and check the sign of $f''(x)$. Machine learning lives in a different world. A neural network's loss is a function of <em>millions</em> of parameters, $L(\\theta_1, \\theta_2, \\dots, \\theta_n)$. Training is nothing more than searching this high-dimensional landscape for a low point. To reason about that search — why gradient descent stalls, why some \"flat\" spots are traps and others are treasure — you need the multivariable generalization of \"derivative equals zero\" and \"second derivative tells you the shape.\" That generalization is the <strong>gradient</strong>, the <strong>Hessian</strong>, and the <strong>second-derivative test</strong>.</p>\n<p>This lesson builds three tools. First, locating <strong>critical points</strong> where the gradient vanishes. Second, the <strong>Hessian test</strong> that classifies each critical point as a minimum, maximum, or the uniquely multivariable creature, the <strong>saddle point</strong>. Third, a conceptual introduction to <strong>Lagrange multipliers</strong>, the machinery for optimizing under constraints (think: minimize loss subject to a budget on weights).</p>\n\n<h3>Critical Points: Where the Gradient Is Zero</h3>\n<p>Let $f:\\mathbb{R}^n \\to \\mathbb{R}$ be a smooth scalar function. Its <strong>gradient</strong> is the vector of partial derivatives:</p>\n$$\\nabla f(\\mathbf{x}) = \\left[\\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_n}\\right]^{\\!\\top}.$$\n<p>Geometrically, $\\nabla f$ points in the direction of steepest <em>increase</em>, and its magnitude is the rate of that increase. At a peak, a valley, or a mountain pass, there is no uphill direction that the function is currently climbing — the slope in every direction is momentarily zero. That is the definition of a critical point.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Definition</div>\n<p>A point $\\mathbf{x}^*$ is a <strong>critical point</strong> (or stationary point) of $f$ if $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$, i.e. every partial derivative vanishes simultaneously. Local maxima, local minima, and saddle points are all critical points.</p>\n</div>\n<p>The phrase \"every partial derivative vanishes simultaneously\" is the crux. A point is <em>not</em> critical just because $\\partial f / \\partial x_1 = 0$; we need all $n$ equations $\\partial f/\\partial x_i = 0$ to hold at once. Solving that system is exactly what setting the gradient to zero means.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Gradient descent updates parameters via $\\theta \\leftarrow \\theta - \\eta \\nabla L(\\theta)$. When $\\nabla L = \\mathbf{0}$, the update stops — the optimizer has reached a critical point. Understanding <em>which kind</em> of critical point determines whether your model has actually learned something or merely gotten stuck.</p>\n</div>\n\n<h3>The Second-Derivative Test in Many Dimensions: The Hessian</h3>\n<p>In 1D, $f''(x)$ measures concavity: positive means a cup (local min), negative means a cap (local max). In $n$ dimensions, curvature is richer — the function can curve up in one direction and down in another. We collect <em>all</em> second partial derivatives into a matrix, the <strong>Hessian</strong>:</p>\n$$H_f(\\mathbf{x}) = \\begin{bmatrix} \\dfrac{\\partial^2 f}{\\partial x_1^2} & \\dfrac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\cdots & \\dfrac{\\partial^2 f}{\\partial x_1 \\partial x_n} \\\\[6pt] \\dfrac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\dfrac{\\partial^2 f}{\\partial x_2^2} & \\cdots & \\dfrac{\\partial^2 f}{\\partial x_2 \\partial x_n} \\\\[2pt] \\vdots & \\vdots & \\ddots & \\vdots \\\\[2pt] \\dfrac{\\partial^2 f}{\\partial x_n \\partial x_1} & \\dfrac{\\partial^2 f}{\\partial x_n \\partial x_2} & \\cdots & \\dfrac{\\partial^2 f}{\\partial x_n^2} \\end{bmatrix}.$$\n<p>The entry $H_{ij} = \\partial^2 f / \\partial x_i \\partial x_j$ captures how the slope in direction $i$ changes as you move in direction $j$. By <strong>Clairaut's theorem</strong>, if $f$ has continuous second partials, mixed partials are equal ($\\partial^2 f/\\partial x_i \\partial x_j = \\partial^2 f/\\partial x_j \\partial x_i$), so the Hessian is <strong>symmetric</strong>. Symmetry is not a technicality: it guarantees the Hessian has real eigenvalues and a full set of orthogonal eigenvectors — the backbone of the classification test.</p>\n\n<h4>Eigenvalues tell you the shape</h4>\n<p>The cleanest way to read a Hessian is through its eigenvalues. Diagonalize $H$ along its eigenvectors; each eigenvalue $\\lambda_i$ is the curvature along the corresponding eigenvector direction. The local quadratic behavior of $f$ near a critical point $\\mathbf{x}^*$ is the Taylor approximation</p>\n$$f(\\mathbf{x}^* + \\mathbf{v}) \\approx f(\\mathbf{x}^*) + \\tfrac{1}{2}\\,\\mathbf{v}^\\top H\\, \\mathbf{v},$$\n<p>(the gradient term drops out because $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$). The quadratic form $\\mathbf{v}^\\top H \\mathbf{v}$ governs everything:</p>\n<ul>\n<li><strong>All eigenvalues $> 0$</strong> ($H$ positive definite): the surface curves up in every direction — a <strong>local minimum</strong>.</li>\n<li><strong>All eigenvalues $< 0$</strong> ($H$ negative definite): curves down everywhere — a <strong>local maximum</strong>.</li>\n<li><strong>Mixed signs</strong> (some $> 0$, some $< 0$): up in some directions, down in others — a <strong>saddle point</strong>.</li>\n<li><strong>At least one eigenvalue $= 0$</strong> (and none of the opposite sign forcing a saddle): the test is <strong>inconclusive</strong>; higher-order terms decide.</li>\n</ul>\n\n<h4>The 2×2 shortcut: the determinant test</h4>\n<p>For $f(x,y)$ you rarely need to compute eigenvalues by hand. Write $f_{xx}, f_{yy}, f_{xy}$ for the second partials and define the discriminant</p>\n$$D = \\det H = f_{xx}\\,f_{yy} - \\left(f_{xy}\\right)^2.$$\n<p>Then at a critical point:</p>\n<ul>\n<li>$D > 0$ and $f_{xx} > 0$ &rArr; local <strong>minimum</strong>.</li>\n<li>$D > 0$ and $f_{xx} < 0$ &rArr; local <strong>maximum</strong>.</li>\n<li>$D < 0$ &rArr; <strong>saddle point</strong>.</li>\n<li>$D = 0$ &rArr; <strong>inconclusive</strong>.</li>\n</ul>\n<p>Why it works: for a $2\\times 2$ symmetric matrix, $D = \\det H = \\lambda_1 \\lambda_2$ and $\\operatorname{tr} H = f_{xx} + f_{yy} = \\lambda_1 + \\lambda_2$. If $D>0$ the eigenvalues share a sign (product positive), and $f_{xx}$ — equivalently the trace — reveals which sign. If $D<0$ the eigenvalues have opposite signs, forcing a saddle. This is exactly the eigenvalue rule in disguise.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Saddle points are the defining surprise of multivariable optimization — they have no analogue in 1D where curvature is a single number. In deep learning, theory and experiment (Dauphin et al., 2014) suggest that in very high dimensions the <em>dominant</em> obstacle to optimization is not bad local minima but a profusion of saddle points: places where the gradient is tiny and progress crawls. For a random critical point of a high-dimensional function, having <em>all</em> eigenvalues line up with the same sign is exponentially unlikely, so most critical points are saddles. This reframes the folklore \"neural nets get stuck in local minima\" — they more often dawdle on saddle plateaus.</p>\n</div>\n\n<h3>Worked Example: Classifying Every Critical Point</h3>\n<p>Consider</p>\n$$f(x,y) = x^3 - 3x + y^2.$$\n<p><strong>Step 1 — Gradient.</strong> Compute the partials and set both to zero:</p>\n$$\\frac{\\partial f}{\\partial x} = 3x^2 - 3 = 0, \\qquad \\frac{\\partial f}{\\partial y} = 2y = 0.$$\n<p>The second equation gives $y = 0$. The first gives $x^2 = 1$, so $x = 1$ or $x = -1$. The critical points are $(1, 0)$ and $(-1, 0)$.</p>\n<p><strong>Step 2 — Hessian.</strong> Second partials: $f_{xx} = 6x$, $f_{yy} = 2$, $f_{xy} = 0$. So</p>\n$$H(x,y) = \\begin{bmatrix} 6x & 0 \\\\ 0 & 2 \\end{bmatrix}, \\qquad D = (6x)(2) - 0^2 = 12x.$$\n<p><strong>Step 3 — Classify each point.</strong></p>\n<ul>\n<li>At $(1,0)$: $D = 12(1) = 12 > 0$ and $f_{xx} = 6 > 0$ &rArr; <strong>local minimum</strong>. (Eigenvalues $6$ and $2$, both positive — a genuine bowl.)</li>\n<li>At $(-1,0)$: $D = 12(-1) = -12 < 0$ &rArr; <strong>saddle point</strong>. (Eigenvalues $-6$ and $2$: the surface dips along $x$ but rises along $y$.)</li>\n</ul>\n<p>Notice how the same function harbors both a minimum and a saddle. Because $f$ contains the cubic $x^3$, it is unbounded below as $x \\to -\\infty$, so there is no global minimum — a reminder that critical-point analysis is fundamentally <em>local</em>.</p>\n\n<h3>Constrained Optimization: Lagrange Multipliers</h3>\n<p>Often we don't want the lowest point anywhere — we want the lowest point <em>on a constraint surface</em>. Minimize $f(\\mathbf{x})$ subject to $g(\\mathbf{x}) = c$. Examples: maximize portfolio return subject to fixed variance; in ML, minimize a loss subject to a norm budget $\\|\\theta\\|^2 = c$ (the hard-constraint cousin of weight-decay regularization).</p>\n<p>The key geometric insight: at a constrained optimum, you cannot improve $f$ by moving <em>along</em> the constraint. Any allowed step keeps $g$ fixed (moves tangent to the constraint surface), and at the optimum no tangent direction increases or decreases $f$. That happens precisely when the gradient of $f$ has no component along the surface — i.e. $\\nabla f$ is <strong>parallel to $\\nabla g$</strong>, since $\\nabla g$ is perpendicular to the constraint surface. Formally, there exists a scalar $\\lambda$ (the <strong>Lagrange multiplier</strong>) with</p>\n$$\\nabla f(\\mathbf{x}^*) = \\lambda\\, \\nabla g(\\mathbf{x}^*), \\qquad g(\\mathbf{x}^*) = c.$$\n<p>The slick bookkeeping trick is to build the <strong>Lagrangian</strong></p>\n$$\\mathcal{L}(\\mathbf{x}, \\lambda) = f(\\mathbf{x}) - \\lambda\\,\\big(g(\\mathbf{x}) - c\\big),$$\n<p>and set its full gradient (with respect to both $\\mathbf{x}$ <em>and</em> $\\lambda$) to zero. The $\\mathbf{x}$-equations reproduce $\\nabla f = \\lambda \\nabla g$; the $\\lambda$-equation $\\partial \\mathcal{L}/\\partial \\lambda = 0$ recovers the constraint $g(\\mathbf{x}) = c$. So the constrained problem becomes an unconstrained critical-point hunt for $\\mathcal{L}$.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">What $\\lambda$ actually means</div>\n<p>The multiplier is not just algebraic scaffolding. It is a <strong>shadow price</strong>: $\\lambda = \\dfrac{d f^*}{d c}$, the rate at which the optimal value changes as you relax the constraint level $c$. A large $|\\lambda|$ says the constraint is \"expensive\" — loosening it would help a lot. This sensitivity interpretation is why Lagrange multipliers appear throughout economics, SVMs (where multipliers identify support vectors), and the KKT conditions that generalize them to inequalities.</p>\n</div>\n\n<h4>Quick example</h4>\n<p>Maximize $f(x,y) = xy$ subject to $g(x,y) = x + y = 10$. The Lagrange conditions: $\\nabla f = (y, x)$, $\\nabla g = (1,1)$, so $y = \\lambda$ and $x = \\lambda$, giving $x = y$. The constraint then forces $x = y = 5$, with maximum product $25$. Here $\\lambda = 5$ means each extra unit of budget $c$ raises the optimal product by about $5$ — and indeed for budget $c$ the optimum is $(c/2)^2$, whose derivative $c/2$ equals $5$ at $c=10$. The shadow-price story checks out.</p>\n\n<h3>Putting It Together</h3>\n<p>The workflow for unconstrained problems: (1) compute $\\nabla f$ and solve $\\nabla f = \\mathbf{0}$ for all critical points; (2) build the Hessian; (3) at each critical point read off definiteness via eigenvalue signs (or, in 2D, the determinant test) to label min, max, or saddle. For constrained problems, replace step (1) with the Lagrangian system $\\nabla f = \\lambda \\nabla g$ together with the constraint. These are the same tools that, scaled to millions of dimensions, underlie every modern optimizer — gradient descent chases $\\nabla L = 0$, second-order methods exploit the Hessian's curvature, and constrained/regularized training quietly invokes the spirit of Lagrange.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Hessian's eigenvalues classify every critical point</summary>\n<p>At a critical point the gradient vanishes ($\\nabla f = 0$), so the linear term is gone and, zooming in, the surface looks like a pure quadratic bowl whose shape is set entirely by the <b>Hessian</b> $H$ (the matrix of second derivatives). Because $H$ is symmetric, it has orthogonal eigenvectors and real eigenvalues — and those eigenvalues are the <em>curvatures</em> along the principal axes of the bowl.</p>\n<p>That single fact classifies the point. All eigenvalues positive: the bowl curves up in every direction — a <b>local minimum</b>. All negative: a dome — a <b>local maximum</b>. Mixed signs: up along one eigen-direction, down along another — a <b>saddle</b>. The familiar 2-D second-derivative test, $f_{xx}f_{yy} - f_{xy}^2 > 0$, is just \"the $2\\times 2$ Hessian's determinant (the product of its eigenvalues) is positive, so they share a sign.\"</p>\n<p>The \"aha\": curvature isn't a number, it's a <em>matrix</em>, and its eigen-decomposition turns \"is this a min, max, or saddle?\" into \"what's the sign pattern of the curvatures?\" — the same eigenvalue lens that governs convexity (all $\\ge 0$ everywhere) and why gradient descent crawls through saddles.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The 2-D second-derivative test classifies a critical point by the Hessian determinant <code>D = f_xx·f_yy − f_xy²</code>. Run it for <code>f(x,y)=x²+xy+y²</code> (where f_xx=2, f_yy=2, f_xy=1):</p>\n<div data-code=\"javascript\" data-expected=\"3\">// Second-derivative test in 2D: D = f_xx * f_yy - f_xy^2 at a critical point.\nfunction hessianDet(fxx, fyy, fxy) {\n  return fxx * fyy - fxy * fxy;\n}\nconsole.log(hessianDet(2, 2, 1));   // 3 -- D&gt;0 and f_xx&gt;0 means a local minimum</div>\n<h4>Interactive — min, max, or saddle?</h4>\n<div data-viz=\"calc-saddle\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the 2D second-derivative test</summary>\n<p>In one variable you classify a critical point by the sign of $f''$. In two variables the analog uses the <b>discriminant</b> $D = f_{xx}f_{yy} - f_{xy}^2$, evaluated where $\\nabla f = 0$:</p>\n<p>$D \\gt 0$ with $f_{xx} \\gt 0$ gives a local <b>minimum</b>; $D \\gt 0$ with $f_{xx} \\lt 0$ a local <b>maximum</b>; $D \\lt 0$ a <b>saddle</b> (up one way, down another); $D = 0$ is inconclusive. Example: $f = x^2 + y^2$ has $f_{xx}=f_{yy}=2$ and $f_{xy}=0$, so $D = 4 \\gt 0$ with $f_{xx} \\gt 0$ — a minimum, as expected.</p>\n<p>This is the Hessian eigenvalue test in disguise: $D = \\det(H) = \\lambda_1 \\lambda_2$ (the product of eigenvalues). So $D \\gt 0$ means both eigenvalues share a sign (definite, hence max or min, with $f_{xx}$ telling you which), and $D \\lt 0$ means they differ (indefinite, a saddle).</p>\n<p>The \"aha\": the determinant of the Hessian packages \"do the curvatures agree?\" into one number. A positive determinant means the surface curves the same way in every direction (a bowl or a dome); a negative one means it curves up one way and down another. The 2D test is the eigenvalue story made computable without finding eigenvalues.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: in high dimensions, saddles dominate (not local minima)</summary>\n<p>The Hessian test classifies a critical point by its eigenvalues — but in <em>high</em> dimensions that classification has a startling statistical consequence: almost every critical point is a <b>saddle</b>, not a local minimum.</p>\n<p><b>The counting argument.</b> A critical point is a local minimum only if <em>all</em> $n$ Hessian eigenvalues are positive. If you treat each eigenvalue's sign as roughly a coin flip, the chance that <em>all $n$</em> come up positive is about $2^{-n}$ — vanishingly small once $n$ is large. With even hundreds of parameters, local minima are astronomically rarer than saddles (where some eigenvalues are positive and some negative).</p>\n<p><b>Why it reframes deep learning.</b> Old intuition (from 1D and 2D) feared getting \"stuck in a bad local minimum.\" In a million-dimensional neural-net loss, that almost never happens — the real obstacles are <em>saddle points</em>, where the gradient is tiny and training <em>plateaus</em>. The good news: most saddles have a downhill escape direction (a negative-eigenvalue direction), and the <em>noise</em> in SGD nudges the iterate off the ridge — part of why stochastic gradient descent works so well.</p>\n<p>The \"aha\": low-dimensional intuition misleads. As dimension grows, the requirement \"all eigenvalues positive\" gets exponentially hard to satisfy, so loss landscapes are seas of saddles with few true minima — and optimization is really the art of <em>escaping saddles</em>, not dodging local minima.</p>\n</details>\n",
          "mcq": [
            {
              "q": "At a critical point of $f(x,y)$ you compute $f_{xx}=4$, $f_{yy}=1$, and $f_{xy}=3$. What is the point's nature?",
              "choices": [
                "Local minimum, since $f_{xx}>0$ and $f_{yy}>0$",
                "Inconclusive, because $f_{xy}\\neq 0$",
                "Local maximum, since the off-diagonal term dominates",
                "Saddle point, since $D = f_{xx}f_{yy}-f_{xy}^2 = 4-9 = -5 < 0$"
              ],
              "answer": 3,
              "explain": "The discriminant is $D = (4)(1)-3^2 = -5 < 0$, which always means a saddle regardless of the diagonal signs. The large mixed partial creates a direction of negative curvature."
            },
            {
              "q": "Why are saddle points considered the primary obstacle for optimizing high-dimensional loss surfaces in deep learning?",
              "choices": [
                "In high dimensions, a random critical point almost surely has eigenvalues of mixed sign, so most critical points are saddles rather than minima",
                "They have a zero gradient AND zero Hessian, so optimizers cannot detect them",
                "They are local maxima that gradient descent climbs toward",
                "They only occur when the learning rate is too large"
              ],
              "answer": 0,
              "explain": "For all eigenvalues to share a sign (a true min or max) becomes exponentially unlikely as dimension grows, so the overwhelming majority of critical points are saddles where the gradient is small and progress slows."
            },
            {
              "q": "For minimizing $f(\\mathbf{x})$ subject to $g(\\mathbf{x})=c$, what condition characterizes a constrained optimum $\\mathbf{x}^*$?",
              "choices": [
                "$\\nabla f(\\mathbf{x}^*) = \\lambda\\,\\nabla g(\\mathbf{x}^*)$ for some scalar $\\lambda$, with $g(\\mathbf{x}^*)=c$",
                "$\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$",
                "$\\nabla f(\\mathbf{x}^*) \\perp \\nabla g(\\mathbf{x}^*)$",
                "The Hessian of $f$ is positive definite at $\\mathbf{x}^*$"
              ],
              "answer": 0,
              "explain": "At the optimum the gradient of $f$ must be parallel to the gradient of the constraint (so $f$ cannot improve along the surface), giving $\\nabla f = \\lambda \\nabla g$ together with the constraint itself."
            },
            {
              "q": "A critical point of $f(x,y)$ has Hessian eigenvalues $\\lambda_1 = 5$ and $\\lambda_2 = 0$. What can you conclude from the second-derivative test?",
              "choices": [
                "It is a local minimum because no eigenvalue is negative",
                "It is a saddle point because the eigenvalues differ",
                "It is a local maximum because one eigenvalue is zero",
                "The test is inconclusive; higher-order terms determine the behavior"
              ],
              "answer": 3,
              "explain": "A zero eigenvalue (with none of opposite sign forcing a saddle) makes the second-order test inconclusive—the quadratic approximation is flat along that direction, so cubic or higher terms decide."
            },
            {
              "q": "For a smooth function $f:\\mathbb{R}^n \\to \\mathbb{R}$, what does it mean geometrically that $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$ at a critical point?",
              "choices": [
                "The function value at $\\mathbf{x}^*$ is zero",
                "The point is necessarily a global minimum",
                "The Hessian is positive definite there",
                "There is no direction of momentary increase or decrease — the slope in every direction is zero"
              ],
              "answer": 3,
              "explain": "A zero gradient means the directional slope vanishes in every direction, which is what makes peaks, valleys, and passes all critical points."
            },
            {
              "q": "A student claims that because $\\partial f/\\partial x_1 = 0$ at a point, that point must be a critical point of $f(x_1, x_2, x_3)$. Why is this reasoning flawed?",
              "choices": [
                "A critical point requires the function value to also be zero",
                "$\\partial f/\\partial x_1 = 0$ already guarantees a minimum",
                "A critical point requires all $n$ partial derivatives to vanish simultaneously, not just one",
                "Partial derivatives are irrelevant to critical points"
              ],
              "answer": 2,
              "explain": "The gradient is zero only when every partial derivative vanishes at once, so one vanishing partial is necessary but far from sufficient."
            },
            {
              "q": "During gradient descent with update $\\theta \\leftarrow \\theta - \\eta \\nabla L(\\theta)$, what happens to the parameter updates once the optimizer reaches a critical point of the loss?",
              "choices": [
                "The learning rate $\\eta$ automatically increases",
                "The loss is guaranteed to equal zero",
                "The update step becomes zero, so the parameters stop changing",
                "The gradient flips sign and the parameters reverse"
              ],
              "answer": 2,
              "explain": "At a critical point $\\nabla L = \\mathbf{0}$, so the update term $\\eta \\nabla L$ is zero and the optimizer stalls regardless of which type of critical point it is."
            },
            {
              "q": "The lesson describes the saddle point as 'the uniquely multivariable creature.' What property best captures why a saddle point cannot occur in single-variable optimization?",
              "choices": [
                "It is a point that increases along some directions while decreasing along others, which requires more than one dimension",
                "It is a critical point where the gradient is nonzero",
                "It is simply a local maximum viewed from below",
                "It is any point where the second derivative is exactly zero"
              ],
              "answer": 0,
              "explain": "A saddle is a critical point that curves up in some directions and down in others, a mixed behavior impossible with a single variable's single direction."
            },
            {
              "q": "You find a critical point of $f(x,y)$ with $f_{xx}=-2$, $f_{yy}=-8$, and $f_{xy}=1$. Using the discriminant $D = f_{xx}f_{yy} - f_{xy}^2$, classify the point.",
              "choices": [
                "Saddle point, because $f_{xy} \\neq 0$",
                "Inconclusive, because $D = 0$",
                "Local minimum, because both pure second partials are nonzero",
                "Local maximum, because $D = 15 > 0$ and $f_{xx} < 0$"
              ],
              "answer": 3,
              "explain": "$D = (-2)(-8) - 1^2 = 16 - 1 = 15 > 0$, so it is a genuine extremum, and since $f_{xx} = -2 < 0$ the surface curves down in every direction, giving a local maximum. The off-diagonal $f_{xy}$ being nonzero does not by itself signal a saddle; only the sign of $D$ determines that."
            },
            {
              "q": "A neural network's loss reaches a flat region where the gradient is essentially zero, yet it is NOT a minimum. The Hessian there has eigenvalues that are all $\\geq 0$ with several exactly equal to zero. What does the second-derivative test conclude, and what is actually going on?",
              "choices": [
                "It concludes a strict local minimum, since no eigenvalue is negative",
                "It is inconclusive; the zero eigenvalues mark flat directions the second-order test cannot classify",
                "It concludes a saddle point, since some eigenvalues are zero",
                "It concludes a maximum, since the Hessian is not positive definite"
              ],
              "answer": 1,
              "explain": "When the Hessian is positive semidefinite but singular (zero eigenvalues present), the test is inconclusive: along the zero-eigenvalue directions curvature vanishes and higher-order terms decide the behavior. A strict-minimum claim requires all eigenvalues strictly positive, which fails here."
            },
            {
              "q": "Two students debate the gradient condition $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$ at a critical point. Which statement is correct about its relationship to extrema?",
              "choices": [
                "Every point where $\\nabla f = \\mathbf{0}$ is a local minimum or maximum",
                "$\\nabla f = \\mathbf{0}$ is necessary but not sufficient for a local extremum",
                "$\\nabla f = \\mathbf{0}$ is sufficient but not necessary for a local extremum",
                "A local extremum can occur where $\\nabla f \\neq \\mathbf{0}$ in the interior of the domain"
              ],
              "answer": 1,
              "explain": "A vanishing gradient is necessary for an interior extremum (otherwise you could descend or ascend along the gradient), but it is not sufficient because saddle points also satisfy $\\nabla f = \\mathbf{0}$. The first option ignores saddles, and the last is false for smooth interior points."
            },
            {
              "q": "Minimizing $f(\\mathbf{x})$ subject to $g(\\mathbf{x}) = c$, a student writes the Lagrangian $\\mathcal{L} = f - \\lambda g$ and finds a stationary point with $\\lambda = 0$. What does $\\lambda = 0$ indicate about the solution?",
              "choices": [
                "The constraint is active and tightly binding at the optimum",
                "The constraint is effectively inactive: the unconstrained gradient already vanishes there",
                "The problem has no solution because $\\lambda$ must be positive",
                "The point is automatically a saddle of the constrained problem"
              ],
              "answer": 1,
              "explain": "The stationarity condition is $\\nabla f = \\lambda \\nabla g$, so $\\lambda = 0$ forces $\\nabla f = \\mathbf{0}$, meaning the optimum coincides with an unconstrained critical point and the constraint exerts no pull. A nonzero $\\lambda$ is what signals a binding constraint, so the first option is exactly backwards."
            },
            {
              "q": "At a critical point, the second-derivative (Hessian) test distinguishes:",
              "choices": [
                "only local minima",
                "the global minimum from everything else",
                "local minima, local maxima, and saddle points",
                "continuous from discontinuous functions"
              ],
              "answer": 2,
              "explain": "Once $\\nabla f = \\mathbf{0}$ (a critical point), the Hessian's curvature decides the type: a local minimum (curves up in all directions), a local maximum (curves down in all), or a saddle (up in some, down in others). It's the multivariable analogue of the single-variable $f''$ test."
            },
            {
              "q": "At a critical point, if the Hessian is *positive definite* (all its eigenvalues are positive), the point is a:",
              "choices": [
                "local maximum",
                "local minimum",
                "saddle point",
                "inflection point"
              ],
              "answer": 1,
              "explain": "Positive definite means the surface curves upward in every direction — a bowl — so the critical point is a local minimum. This generalizes $f''(c) > 0 \\Rightarrow$ minimum from single-variable calculus."
            },
            {
              "q": "The Hessian matrix of $f(x,y)$ is:",
              "choices": [
                "the matrix of second partial derivatives, $\\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix}$",
                "the gradient $(f_x, f_y)$",
                "the vector of first partial derivatives",
                "the value of $f$ at the critical point"
              ],
              "answer": 0,
              "explain": "The Hessian collects all second-order partials into a square matrix; for nice functions it is symmetric ($f_{xy}=f_{yx}$, by Clairaut). Its eigenvalues — or, in 2D, the discriminant $f_{xx}f_{yy}-f_{xy}^2$ — classify each critical point."
            },
            {
              "q": "At a critical point, if the Hessian is *negative definite* (all eigenvalues negative), the point is a:",
              "choices": [
                "local minimum",
                "saddle point",
                "local maximum",
                "inflection point"
              ],
              "answer": 2,
              "explain": "Negative definite means the surface curves downward in every direction — a dome — so the critical point is a local maximum (the analogue of $f''(c) < 0$). Mixed-sign eigenvalues give a saddle; any zero eigenvalue makes the test inconclusive."
            }
          ],
          "flashcards": [
            {
              "front": "Definition of a critical (stationary) point of $f:\\mathbb{R}^n\\to\\mathbb{R}$",
              "back": "A point $\\mathbf{x}^*$ where $\\nabla f(\\mathbf{x}^*)=\\mathbf{0}$, i.e. all partial derivatives vanish simultaneously. Local maxima, minima, and saddle points are all critical points."
            },
            {
              "front": "What is the Hessian, and why is it symmetric?",
              "back": "The matrix of all second partial derivatives, $H_{ij}=\\partial^2 f/\\partial x_i\\partial x_j$. By Clairaut's theorem (continuous second partials), mixed partials are equal, so $H$ is symmetric and thus has real eigenvalues."
            },
            {
              "front": "Hessian eigenvalue test for classifying a critical point",
              "back": "All eigenvalues $>0$ (pos. definite) = local min; all $<0$ (neg. definite) = local max; mixed signs = saddle point; any eigenvalue $=0$ (no opposite-sign conflict) = inconclusive."
            },
            {
              "front": "2×2 determinant (discriminant) test with $D = f_{xx}f_{yy}-f_{xy}^2$",
              "back": "$D>0,\\ f_{xx}>0$ = min; $D>0,\\ f_{xx}<0$ = max; $D<0$ = saddle; $D=0$ = inconclusive. ($D=\\lambda_1\\lambda_2$, so its sign reveals whether eigenvalues agree.)"
            },
            {
              "front": "Lagrange multiplier condition for minimizing $f$ subject to $g(\\mathbf{x})=c$",
              "back": "$\\nabla f(\\mathbf{x}^*)=\\lambda\\,\\nabla g(\\mathbf{x}^*)$ together with $g(\\mathbf{x}^*)=c$. Equivalently, find critical points of the Lagrangian $\\mathcal{L}=f-\\lambda(g-c)$."
            },
            {
              "front": "Interpretation of the Lagrange multiplier $\\lambda$ (shadow price)",
              "back": "$\\lambda = df^*/dc$: the sensitivity of the optimal value to relaxing the constraint level $c$. Large $|\\lambda|$ means the constraint is binding/expensive."
            }
          ],
          "homework": [
            {
              "prompt": "Find and classify all critical points of $f(x,y) = x^2 + y^2 - 4xy$.",
              "hint": "Set both partials to zero to find the critical point, then use the discriminant $D = f_{xx}f_{yy}-f_{xy}^2$.",
              "solution": "Gradient: $f_x = 2x - 4y = 0$ and $f_y = 2y - 4x = 0$. From the first, $x = 2y$; substituting into the second gives $2y - 8y = -6y = 0$, so $y=0$ and then $x=0$. The only critical point is $(0,0)$. Second partials: $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=-4$. Discriminant $D = (2)(2)-(-4)^2 = 4 - 16 = -12 < 0$. Therefore $(0,0)$ is a saddle point. (Eigenvalues of $\\begin{bmatrix}2&-4\\\\-4&2\\end{bmatrix}$ are $2\\pm 4 = 6$ and $-2$, confirming mixed signs.)"
            },
            {
              "prompt": "Use Lagrange multipliers to find the point(s) on the circle $x^2 + y^2 = 1$ that maximize $f(x,y) = x + 2y$, and state the maximum value.",
              "hint": "Take $g(x,y)=x^2+y^2$. Set $\\nabla f = \\lambda\\nabla g$, solve for $x$ and $y$ in terms of $\\lambda$, then substitute into the constraint.",
              "solution": "With $g=x^2+y^2=1$: $\\nabla f=(1,2)$ and $\\nabla g=(2x,2y)$. The conditions $1=2\\lambda x$ and $2=2\\lambda y$ give $x=\\frac{1}{2\\lambda}$ and $y=\\frac{1}{\\lambda}$. Substitute into the constraint: $\\frac{1}{4\\lambda^2}+\\frac{1}{\\lambda^2}=\\frac{5}{4\\lambda^2}=1$, so $\\lambda^2=\\frac54$ and $\\lambda=\\pm\\frac{\\sqrt5}{2}$. Taking $\\lambda=+\\frac{\\sqrt5}{2}$ (the one giving the maximum): $x=\\frac{1}{\\sqrt5}$, $y=\\frac{2}{\\sqrt5}$. Then $f=\\frac{1}{\\sqrt5}+\\frac{4}{\\sqrt5}=\\frac{5}{\\sqrt5}=\\sqrt5$. So the maximum value is $\\sqrt5$ at $\\left(\\tfrac{1}{\\sqrt5},\\tfrac{2}{\\sqrt5}\\right)$. (The other sign gives the minimum $-\\sqrt5$, matching $|\\nabla f|=\\sqrt5$.)"
            },
            {
              "prompt": "Consider $f(x,y)=x^4 + y^4$. Show that the origin is a critical point and explain why the second-derivative (Hessian) test fails there, then determine the true nature of the point by direct reasoning.",
              "hint": "Compute the Hessian at the origin and look at its eigenvalues; then think about the sign of $f$ near (but not at) the origin.",
              "solution": "Gradient: $f_x=4x^3$, $f_y=4y^3$, both zero at $(0,0)$, so the origin is a critical point. Second partials: $f_{xx}=12x^2$, $f_{yy}=12y^2$, $f_{xy}=0$. At the origin $H=\\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$, with both eigenvalues $0$, so $D=0$ and the test is inconclusive (the quadratic approximation is completely flat). Direct reasoning: for any $(x,y)\\neq(0,0)$, $f(x,y)=x^4+y^4 > 0 = f(0,0)$. Since $f$ is strictly greater than its value at the origin in every direction, $(0,0)$ is a strict local (indeed global) minimum. This illustrates that an inconclusive Hessian does not mean 'no extremum'—higher-order terms (here the quartics) settle the matter."
            }
          ],
          "examples": [
            {
              "title": "Classifying a Critical Point with the Hessian",
              "body": "Find every critical point of $f(x,y) = x^2 + xy + y^2 - 3x - 6y$, then use the second-derivative (Hessian) test to classify it as a local minimum, local maximum, or saddle point.",
              "solution": "<strong>Step 1 — Compute the gradient.</strong> The gradient is the vector of first partials:\n$$\\frac{\\partial f}{\\partial x} = 2x + y - 3, \\qquad \\frac{\\partial f}{\\partial y} = x + 2y - 6.$$\n\n<strong>Step 2 — Set the gradient to zero.</strong> A critical point requires $\\nabla f = \\mathbf{0}$, giving the linear system\n$$2x + y = 3, \\qquad x + 2y = 6.$$\nFrom the first equation, $y = 3 - 2x$. Substitute into the second: $x + 2(3 - 2x) = 6$, so $x + 6 - 4x = 6$, hence $-3x = 0$ and $x = 0$. Then $y = 3 - 2(0) = 3$. The only critical point is $(0, 3)$.\n\n<strong>Step 3 — Build the Hessian.</strong> The Hessian collects the second partials:\n$$H = \\begin{bmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{bmatrix} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$\nBecause $f$ is a quadratic, $H$ is constant — it has the same value at every point, including $(0,3)$.\n\n<strong>Step 4 — Apply the second-derivative test.</strong> Compute the determinant:\n$$\\det H = (2)(2) - (1)(1) = 3 > 0.$$\nSince $\\det H > 0$, the critical point is a genuine extremum (not a saddle). Now check the sign of the top-left entry: $f_{xx} = 2 > 0$, which means $H$ is positive definite, so $f$ curves upward in every direction.\n\n<strong>Step 5 — Conclude and evaluate.</strong> The point $(0,3)$ is a <strong>local minimum</strong>. Its value is\n$$f(0,3) = 0 + 0 + 9 - 0 - 18 = -9.$$\n\n<strong>Answer:</strong> The unique critical point is $(0,3)$, a local minimum with $f(0,3) = -9$."
            },
            {
              "title": "Hunting a Saddle Point in a Cubic Surface",
              "body": "The surface $g(x,y) = x^3 - 3xy + y^3$ has more than one critical point. Locate all of its (real) critical points and classify each one, paying attention to the case the Hessian test calls inconclusive.",
              "solution": "<strong>Step 1 — Compute the gradient.</strong>\n$$\\frac{\\partial g}{\\partial x} = 3x^2 - 3y, \\qquad \\frac{\\partial g}{\\partial y} = -3x + 3y^2.$$\n\n<strong>Step 2 — Solve $\\nabla g = \\mathbf{0}$.</strong> Setting both partials to zero and dividing by $3$:\n$$x^2 - y = 0 \\;\\Rightarrow\\; y = x^2, \\qquad -x + y^2 = 0 \\;\\Rightarrow\\; x = y^2.$$\nSubstitute $y = x^2$ into $x = y^2$: $x = (x^2)^2 = x^4$, so $x^4 - x = 0$, i.e. $x(x^3 - 1) = 0$. Over the reals this gives $x = 0$ or $x = 1$.\n- If $x = 0$: $y = x^2 = 0 \\Rightarrow (0,0)$.\n- If $x = 1$: $y = x^2 = 1 \\Rightarrow (1,1)$.\n\nThe other roots of $x^3 = 1$ are complex, so we discard them. The real critical points are $(0,0)$ and $(1,1)$.\n\n<strong>Step 3 — Form the Hessian.</strong> Here the Hessian depends on the point:\n$$H(x,y) = \\begin{bmatrix} g_{xx} & g_{xy} \\\\ g_{yx} & g_{yy} \\end{bmatrix} = \\begin{bmatrix} 6x & -3 \\\\ -3 & 6y \\end{bmatrix}, \\qquad \\det H = 36xy - 9.$$\n\n<strong>Step 4 — Classify $(0,0)$.</strong>\n$$\\det H(0,0) = 36(0)(0) - 9 = -9 < 0.$$\nA negative determinant means the Hessian has one positive and one negative eigenvalue: the surface curves up in one direction and down in another. So $(0,0)$ is a <strong>saddle point</strong> — the distinctively multivariable creature with no single-variable analogue.\n\n<strong>Step 5 — Classify $(1,1)$.</strong>\n$$\\det H(1,1) = 36(1)(1) - 9 = 27 > 0.$$\nThe extremum is genuine; check the top-left entry $g_{xx} = 6(1) = 6 > 0$, so $H$ is positive definite and the surface curves upward in all directions. Thus $(1,1)$ is a <strong>local minimum</strong>, with value $g(1,1) = 1 - 3 + 1 = -1$.\n\n<strong>Step 6 — A word on the inconclusive case.</strong> Notice the test would stall only where $\\det H = 0$ (e.g. if a critical point landed on $xy = \\tfrac14$); there the second-derivative test gives no verdict and you must inspect $g$ directly. Neither of our points hits that wall, so both are cleanly classified.\n\n<strong>Answer:</strong> $(0,0)$ is a saddle point; $(1,1)$ is a local minimum with $g(1,1) = -1$."
            },
            {
              "title": "Lagrange multipliers: optimizing under a constraint",
              "body": "Maximize $f(x,y) = xy$ subject to the constraint $x + y = 10$ (the largest-area rectangle with a fixed half-perimeter).",
              "solution": "<strong>The Lagrange condition.</strong> At a constrained optimum the gradient of $f$ is parallel to the gradient of the constraint $g$: $\\nabla f = \\lambda \\nabla g$. Here $\\nabla f = (y, x)$ and $\\nabla g = (1, 1)$, so\n$$(y, x) = \\lambda(1, 1) \\;\\Rightarrow\\; y = \\lambda,\\ x = \\lambda \\;\\Rightarrow\\; x = y.$$\n<strong>Use the constraint.</strong> With $x = y$ and $x + y = 10$, we get $x = y = 5$, so $f = xy = 25$.\n<strong>Why the gradients align.</strong> Along the constraint line you can still move to increase $f$ <em>unless</em> $\\nabla f$ has no component along that line — i.e. $\\nabla f$ is perpendicular to the constraint, parallel to $\\nabla g$. The multiplier $\\lambda$ is the rate the optimum would improve if you relaxed the constraint by one unit — its shadow price.\n<strong>The aha.</strong> Unconstrained optimization sets $\\nabla f = 0$; constrained optimization sets $\\nabla f = \\lambda \\nabla g$ — stop not where the gradient vanishes, but where it points <em>straight out of</em> the feasible set, with no allowed direction left to climb."
            }
          ]
        }
      ]
    },
    {
      "id": "c-convex-optimization",
      "title": "Convex & Constrained Optimization",
      "lessons": [
        {
          "id": "c-convexity",
          "title": "Convex Sets, Convex Functions & Why They Matter",
          "minutes": 17,
          "content": "<h3>1. The hook: the property that makes optimization tractable</h3>\n<p>Training a model means minimizing a loss — finding the bottom of a landscape. For a general function that landscape can be a nightmare of false valleys, and you can never be sure the dip you found is the deepest. <strong>Convexity</strong> is the single property that tames this: for a convex problem, the bottom you find is guaranteed to be <em>the</em> bottom. It is the dividing line between optimization that is provably solvable and optimization that is, in general, hopeless.</p>\n\n<h3>2. Convex sets</h3>\n<p>A set $C$ is <strong>convex</strong> if the straight line segment between any two of its points stays entirely inside it: for all $x, y \\in C$ and $\\lambda \\in [0,1]$,\n$$\\lambda x + (1-\\lambda) y \\in C.$$\nA filled disk, a cube, a half-plane, and all of $\\mathbb{R}^n$ are convex; a crescent or a donut is not (a chord can poke outside). Convex <em>sets</em> are the natural arenas in which to pose optimization problems, because you can always move in a straight line toward a better point without leaving the feasible region.</p>\n\n<h3>3. Convex functions</h3>\n<p>A function $f$ is <strong>convex</strong> if the chord connecting any two points on its graph lies on or above the graph between them: for all $x, y$ and $\\lambda\\in[0,1]$,\n$$f\\big(\\lambda x + (1-\\lambda) y\\big) \\le \\lambda f(x) + (1-\\lambda) f(y).$$\nGeometrically the function \"holds water\" — it curves upward like a bowl. A function is <strong>concave</strong> if $-f$ is convex (it sheds water, like a dome); maximizing a concave function is the same as minimizing a convex one.</p>\n\n<h3>4. How to test for convexity</h3>\n<p>Two practical tests:</p>\n<ul>\n<li><strong>Second derivative (1-D):</strong> $f$ is convex on an interval iff $f''(x)\\ge 0$ throughout — the slope is non-decreasing. So $x^2$, $e^x$, and $-\\log x$ are convex; $x^3$ is not (its $f''=6x$ changes sign).</li>\n<li><strong>Hessian (multivariable):</strong> $f$ is convex iff its Hessian $\\nabla^2 f(x)$ is <strong>positive semidefinite</strong> everywhere (all eigenvalues $\\ge 0$) — the multidimensional version of \"curves upward in every direction.\"</li>\n</ul>\n<p>Convexity is also preserved by helpful operations: a nonnegative weighted sum of convex functions is convex, and the max of convex functions is convex — which is how complicated losses are shown convex by assembling them from convex pieces.</p>\n\n<h3>5. The payoff: every local minimum is global</h3>\n<p>Here is why all this matters. <strong>For a convex function on a convex set, every local minimum is a global minimum.</strong> There are no deceptive side-valleys to get stuck in: if you reach a point where you cannot improve locally, you are done — that point is optimal. (If the function is <em>strictly</em> convex, the minimizer is moreover unique.) This is the guarantee that turns optimization from \"hope you found the best\" into \"you provably found the best,\" and it is why convex problems can be solved reliably at massive scale.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Drop a marble anywhere into a bowl (convex) and it always rolls to the same lowest point. Drop it into an egg carton (non-convex) and where it lands depends on where you let go — that is the local-minimum trap convexity eliminates.</p>\n</div>\n<p>See it for yourself below: drop a ball and run gradient descent. On the <b>convex bowl</b> it reaches the global minimum from <em>any</em> start; switch to the <b>bumpy</b> landscape and move the start point — the ball settles into whichever local valley it happened to start above, often missing the global minimum entirely. That trap is exactly what convexity rules out.</p>\n<div data-viz=\"calc-convex-landscape\"></div>\n\n<h3>6. Jensen's inequality</h3>\n<p>Convexity has a probabilistic face. <strong>Jensen's inequality</strong> states that for a convex $f$ and any random variable $X$,\n$$f\\big(\\mathbb{E}[X]\\big) \\le \\mathbb{E}\\big[f(X)\\big].$$\n\"The function of the average is at most the average of the function.\" It is the engine behind countless bounds in machine learning and information theory — the derivation of the VAE's ELBO, the non-negativity of KL divergence, and the AM–GM inequality are all one application of Jensen away. (For concave $f$ the inequality flips.)</p>\n\n<h3>7. Convex and non-convex losses in ML</h3>\n<p>Convexity is exactly why some models are easy to train and others are not. <strong>Linear regression</strong> (squared error) and <strong>logistic regression</strong> have convex losses, so gradient descent finds the global optimum and the solution is reproducible. A <strong>deep neural network</strong>'s loss is decidedly <em>non-convex</em> — riddled with many local minima and saddle points — which is why training is an art of initialization, learning-rate schedules, and stochasticity rather than a solved problem. Knowing which regime you are in sets your expectations entirely.</p>\n\n<h3>8. Why this matters</h3>\n<p>Convexity is the great organizing principle of optimization: it decides whether \"find the minimum\" is a guarantee or a gamble. Recognizing a convex problem means you can deploy fast, reliable solvers with global guarantees; recognizing a non-convex one tells you to lean on the heuristics that make deep learning work. The next lesson makes the guarantee concrete — showing exactly why gradient descent converges to the global optimum when the function is convex.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why convexity makes optimization easy — every local minimum is global</summary>\n<p>Here is the single property that makes convexity the most sought-after structure in optimization: <strong>for a convex function, every local minimum is a global minimum.</strong> Geometrically, convex means the straight segment between any two points on the graph lies on or above the graph,</p>\n$$f\\big(\\lambda x + (1-\\lambda) y\\big) \\le \\lambda f(x) + (1-\\lambda) f(y), \\qquad \\lambda \\in [0,1],$$\n<p>so the surface is a single bowl with no hidden dips. There is simply nowhere for gradient descent to get <em>stuck</em>: follow the slope downhill and you arrive at <em>the</em> minimum, not merely <em>a</em> minimum. Formally, the first-order condition $\\nabla f = 0$ flips from <em>necessary</em> to <em>sufficient</em> — a flat point can only be the global optimum.</p>\n<p>This is why we bend over backwards to cast problems as convex: linear and logistic regression, SVMs, and LASSO are convex, so they are <em>solved</em> — fast, with a global guarantee and no random restarts. Deep networks are violently non-convex, which is why their training has no such promise and remains an empirical art of initialization, schedules, and luck. Convexity is the line between \"optimize it\" and \"hope.\"</p>\n</details>\n<h4>Try it in code</h4>\n<p>A function is convex when its chord lies above the curve: <code>(f(a)+f(b))/2 ≥ f((a+b)/2)</code>. The non-negative gap confirms it. Run it for <code>f(x)=x²</code> on [1,3]:</p>\n<div data-code=\"javascript\" data-expected=\"1.00\">// Convexity (chord above curve): gap = (f(a)+f(b))/2 - f((a+b)/2) &gt;= 0.\nfunction convexGap(f, a, b) {\n  return (f(a) + f(b)) / 2 - f((a + b) / 2);\n}\nconsole.log(convexGap(function (x) { return x * x; }, 1, 3).toFixed(2));   // 1.00 -- gap &gt;= 0, so x^2 is convex here</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: how to recognize (and build) convex functions</summary>\n<p>Convexity makes optimization easy — but how do you <em>know</em> a function is convex? There is a mechanical test and a calculus.</p>\n<p><b>The second-order test.</b> A twice-differentiable function is convex iff its second derivative is $\\ge 0$ everywhere (1D), or its <b>Hessian is positive semi-definite</b> (all eigenvalues $\\ge 0$) in higher dimensions — the curvature never bends downward. So $x^2$ (with $f'' = 2 \\gt 0$) is convex; $x^3$ is not (its second derivative changes sign).</p>\n<p><b>The convex calculus.</b> Convexity survives operations, so you can build convex objectives compositionally: a <em>nonnegative weighted sum</em> of convex functions is convex; the <em>pointwise maximum</em> of convex functions is convex; an <em>affine composition</em> $g(Ax + b)$ of a convex $g$ is convex. That is why $\\|Ax - b\\|^2 + \\lambda\\|x\\|_1$ (least squares plus L1) is convex — each piece is, and the sum stays convex.</p>\n<p>The \"aha\": you rarely prove convexity from the definition. You either check that the Hessian is PSD, or recognize the objective as built from convex atoms via convexity-preserving rules. Designing ML losses to be convex (when possible) is exactly this game — it is what guarantees the optimizer finds the global optimum.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why deep learning is non-convex (and works anyway)</summary>\n<p>Convexity is the dream — one global minimum, no traps. But almost every <em>real</em> machine-learning loss is <b>non-convex</b>, with countless local minima and saddle points. So why does training work at all?</p>\n<p><b>Why neural losses are non-convex.</b> Stack nonlinear layers and the loss as a function of the weights becomes a wildly non-convex surface — there is no guarantee a local minimum is global, and the convexity theorems (local = global, gradient descent converges to the optimum) simply do not apply. By the textbook, optimization should be hopeless.</p>\n<p><b>Why it is fine in practice.</b> Three reasons. (1) <em>Saddles, not bad minima, dominate</em> in high dimensions — a point is a poor local min only if <em>every</em> direction curves up, which is exponentially unlikely; most critical points are saddles with an escape direction (and SGD noise nudges you off them). (2) <em>Most local minima are good</em> — empirically, the many minima of a large net have <em>similar</em>, near-optimal loss, so finding \"a\" minimum is usually fine. (3) <em>Overparameterization smooths the landscape</em> — huge models have many equivalent ways to fit the data.</p>\n<p>The \"aha\": convexity is the friendly regime where the guarantees live, and deep learning lives <em>outside</em> it. It succeeds not because the loss is convex (it is not) but because high-dimensional non-convex landscapes are mostly escapable saddles and roughly-equivalent minima — so plain gradient descent reliably finds a <em>good enough</em> bottom, even without a global guarantee.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Consider the set $C=\\{(x,y): x^2+y^2 = 1\\}$ (the unit circle, i.e. just the boundary curve, not the filled disk). Is $C$ convex, and why?",
              "choices": [
                "Yes — it is a closed, bounded, smooth curve, and all smooth bounded curves are convex.",
                "No — but only because the circle is not a filled region; any bounded set fails convexity.",
                "Yes — every point is equidistant from the center, so segments between them stay on the circle.",
                "No — the chord between two distinct points on the circle passes through the interior, which is not part of $C$."
              ],
              "answer": 3,
              "explain": "Convexity requires the entire segment $\\lambda x+(1-\\lambda)y$ to lie in the set. For two distinct points on a circle the connecting chord cuts through the interior, which the curve does not contain, so it fails. The filled disk is convex; the bare circle is not."
            },
            {
              "q": "A classmate argues: \"$f(x)=x^3$ is convex because $f''(x)=6x$ and we can find points where $6x\\ge 0$.\" What is the precise error?",
              "choices": [
                "The second-derivative test does not apply to cubics; you must use the chord definition only.",
                "$f''(x)=3x^2$, not $6x$, so the premise of the argument is wrong.",
                "Convexity on an interval requires $f''\\ge 0$ throughout that interval; since $f''=6x<0$ for $x<0$, $f$ is not convex on $\\mathbb{R}$ (only on $x\\ge 0$).",
                "$x^3$ is concave everywhere because odd powers shed water, so the conclusion is reversed."
              ],
              "answer": 2,
              "explain": "Convexity demands $f''(x)\\ge 0$ at every point of the interval, not merely at some points. Since $6x<0$ for $x<0$, $x^3$ fails on $\\mathbb{R}$; it is convex only on $[0,\\infty)$."
            },
            {
              "q": "Let $f$ and $g$ both be convex functions on $\\mathbb{R}$. Which of the following is guaranteed to be convex?",
              "choices": [
                "$h(x)=\\min\\{f(x),\\,g(x)\\}$",
                "$h(x)=f(x)\\cdot g(x)$ (the product)",
                "$h(x)=\\max\\{f(x),\\,g(x)\\}$",
                "$h(x)=f(g(x))$ for arbitrary convex $f,g$"
              ],
              "answer": 2,
              "explain": "The pointwise maximum of convex functions is always convex (the chord above each lies above the max). The pointwise min can dip below (creating a non-convex notch), products of convex functions need not be convex, and composition requires extra monotonicity conditions."
            },
            {
              "q": "For the quadratic $f(x,y)=2x^2 + 3y^2 + bxy$, the Hessian is $\\nabla^2 f=\\begin{pmatrix}4 & b\\\\ b & 6\\end{pmatrix}$. For which values of $b$ is $f$ convex on $\\mathbb{R}^2$?",
              "choices": [
                "$|b|\\le \\sqrt{24}=2\\sqrt{6}$, so that the Hessian stays positive semidefinite.",
                "$b>0$ only, since off-diagonal coupling must be positive.",
                "Any real $b$, because the diagonal entries $4$ and $6$ are already positive.",
                "$b=0$ only, since a nonzero cross term always breaks convexity."
              ],
              "answer": 0,
              "explain": "A symmetric $2\\times2$ matrix is positive semidefinite iff its diagonal entries are $\\ge 0$ and its determinant $\\ge 0$. Here $\\det = 24-b^2\\ge 0$ gives $|b|\\le 2\\sqrt6$. Positive diagonals alone are not sufficient."
            },
            {
              "q": "Why does convexity of a loss function matter so much for training, according to the lesson's central payoff?",
              "choices": [
                "Convex losses always have a closed-form solution, so gradient descent is never needed.",
                "For a convex function on a convex set, every local minimum is automatically a global minimum, so reaching a point you cannot locally improve means you are provably optimal.",
                "Convex losses are computed faster per step than non-convex ones.",
                "Convexity guarantees the gradient is zero everywhere, making the landscape flat and easy to search."
              ],
              "answer": 1,
              "explain": "The defining payoff is local = global: there are no deceptive side-valleys, so a local optimum is the global optimum. Convex problems still generally need iterative solvers, and the gradient is certainly not zero everywhere."
            },
            {
              "q": "Jensen's inequality for a convex $f$ states $f(\\mathbb{E}[X])\\le \\mathbb{E}[f(X)]$. Using $f(x)=x^2$ (convex), what well-known fact does Jensen immediately reproduce?",
              "choices": [
                "$(\\mathbb{E}[X])^2 = \\mathbb{E}[X]\\cdot \\mathbb{E}[X^2]$, the Cauchy–Schwarz identity.",
                "$\\mathbb{E}[X^2]\\le (\\mathbb{E}[X])^2$, i.e. squaring reduces the mean.",
                "$\\mathbb{E}[X]=\\mathbb{E}[X^2]$ whenever $X$ is centered.",
                "$\\mathbb{E}[X^2]\\ge (\\mathbb{E}[X])^2$, i.e. the variance is non-negative."
              ],
              "answer": 3,
              "explain": "Plugging $f(x)=x^2$ into Jensen gives $(\\mathbb{E}[X])^2\\le \\mathbb{E}[X^2]$, equivalent to $\\operatorname{Var}(X)=\\mathbb{E}[X^2]-(\\mathbb{E}[X])^2\\ge 0$. The inequality direction is fixed by $x^2$ being convex, so the reversed option is wrong."
            },
            {
              "q": "A student runs gradient descent twice from different random initializations on logistic regression and gets two noticeably different final losses. What is the most likely correct diagnosis?",
              "choices": [
                "This is expected; logistic regression is non-convex and has many local minima.",
                "Something is wrong (a bug, non-convergence, or bad step size) — logistic regression's loss is convex, so both runs should reach essentially the same loss.",
                "The data must be linearly separable, which is the only way convex losses produce different minima.",
                "Logistic regression has no minimum, so any two losses are equally valid."
              ],
              "answer": 1,
              "explain": "Logistic regression has a convex loss, so every local minimum is the global one; different starts should converge to essentially the same loss. Divergent results signal a bug or non-convergence, not multiple basins (that symptom is normal for non-convex deep nets)."
            },
            {
              "q": "The intersection of two convex sets is always convex. What does this fail to guarantee about their union?",
              "choices": [
                "The union can be non-convex — e.g. two disjoint disks, where a segment between them leaves the union.",
                "The union is convex only if the two sets overlap.",
                "The union is also always convex, by the same segment argument.",
                "The union is never convex unless one set contains the other entirely."
              ],
              "answer": 0,
              "explain": "Take two separate filled disks: each is convex, but a segment joining a point in one to a point in the other passes through the empty gap, so the union is not convex. Intersection preserves convexity; union does not in general."
            },
            {
              "q": "Which statement correctly distinguishes a convex function from a concave one using the chord test?",
              "choices": [
                "Both convex and concave functions have chords lying above the graph; the difference is only in the domain.",
                "Convex: the chord lies on or below the graph; concave: the chord lies on or above the graph.",
                "Convex: the chord lies on or above the graph; concave: the chord lies on or below the graph.",
                "Convex functions have no chords because their graphs are straight lines."
              ],
              "answer": 2,
              "explain": "By definition a convex function satisfies $f(\\lambda x+(1-\\lambda)y)\\le \\lambda f(x)+(1-\\lambda)f(y)$ — the chord sits on or above the curve (it \"holds water\"). Concave is the reverse ($-f$ convex), with the chord on or below."
            },
            {
              "q": "Is the affine function $f(x)=3x+5$ convex, concave, both, or neither?",
              "choices": [
                "Neither, because its second derivative is zero and convexity requires $f''>0$.",
                "Convex only, since lines never dip below their chords.",
                "Concave only, since a positive slope makes it shed water.",
                "Both convex and concave, because the chord coincides exactly with the graph (equality holds)."
              ],
              "answer": 3,
              "explain": "For an affine function the chord lies exactly on the graph, so $f(\\lambda x+(1-\\lambda)y)=\\lambda f(x)+(1-\\lambda)f(y)$ with equality — satisfying both the $\\le$ (convex) and $\\ge$ (concave) conditions. Convexity allows $f''=0$; strict convexity is what needs $f''>0$."
            },
            {
              "q": "We want to confirm $f(x)=-\\log x$ is convex on $x>0$ from the lesson's tests. Which computation correctly establishes this?",
              "choices": [
                "$f'(x)=1/x$ and $f''(x)=-1/x^2<0$, so $f$ is convex.",
                "$f'(x)=-1/x$ and $f''(x)=-1/x^2<0$, so $f$ is concave, not convex.",
                "$f'(x)=-1/x$ and $f''(x)=1/x^2>0$ for all $x>0$, so $f$ is convex.",
                "$f(x)=-\\log x$ is linear, so it is convex by default with $f''=0$."
              ],
              "answer": 2,
              "explain": "Differentiating, $f'(x)=-1/x$ and $f''(x)=1/x^2$, which is strictly positive on $x>0$, confirming convexity. The sign-error options misplace the negative; $-\\log x$ is a standard strictly convex function (its convexity underlies log-loss)."
            },
            {
              "q": "Mean squared error in linear regression, $L(w,b)=\\frac1n\\sum_i (wx_i+b-y_i)^2$, is convex in $(w,b)$. Which reasoning shows this from convexity-preserving operations?",
              "choices": [
                "Each term is a convex function ($t\\mapsto t^2$) of an affine map of $(w,b)$, hence convex; and a nonnegative sum of convex functions is convex.",
                "Each $x_i$ is convex in $w$, and a product of convex functions is convex, so $L$ is convex.",
                "$L$ is convex because the data $y_i$ are fixed constants, and constants are convex.",
                "$L$ is the minimum of convex terms, and the min of convex functions is convex."
              ],
              "answer": 0,
              "explain": "$wx_i+b-y_i$ is affine in $(w,b)$, and composing an affine map with the convex $t\\mapsto t^2$ keeps it convex; summing convex terms with nonnegative weights ($1/n$) preserves convexity. The 'min of convex' claim is false, and products/constants reasoning is irrelevant."
            },
            {
              "q": "A set $C$ is *convex* if:",
              "choices": [
                "it contains the origin",
                "it is symmetric about the origin",
                "it is bounded",
                "for any two points in $C$, the entire line segment joining them also lies in $C$"
              ],
              "answer": 3,
              "explain": "Convexity of a set means 'no dents': pick any two points in $C$ and the straight segment between them stays inside $C$. A filled disk is convex; a crescent — or the unit *circle* (just the boundary curve) — is not, since a chord leaves the set."
            },
            {
              "q": "A twice-differentiable function $f:\\mathbb{R}^n\\to\\mathbb{R}$ is convex if and only if its Hessian is ___ everywhere.",
              "choices": [
                "positive semidefinite",
                "zero",
                "the identity matrix",
                "negative definite"
              ],
              "answer": 0,
              "explain": "Convexity is upward curvature in every direction, captured by a positive *semi*definite Hessian (all eigenvalues $\\ge 0$) at every point. In 1-D this reduces to $f''(x)\\ge 0$. (A negative definite Hessian would make it concave.)"
            },
            {
              "q": "Which of the following functions is convex on all of $\\mathbb{R}$?",
              "choices": [
                "$x^3$",
                "$e^x$",
                "$\\sin x$",
                "$-x^2$"
              ],
              "answer": 1,
              "explain": "$e^x$ has $f''(x)=e^x>0$ everywhere, so it is convex. $x^3$ has $f''=6x$, negative for $x<0$ (not convex); $\\sin x$ alternates concavity; $-x^2$ is concave ($f''=-2<0$)."
            },
            {
              "q": "If $f$ is a convex function, then $-f$ is:",
              "choices": [
                "also convex",
                "concave",
                "linear",
                "undefined"
              ],
              "answer": 1,
              "explain": "Negating flips curvature: if $f$ curves upward (convex), $-f$ curves downward (concave), and vice versa. This is why maximizing a concave function is the same problem as minimizing a convex one — the well-behaved case optimization theory loves."
            }
          ],
          "flashcards": [
            {
              "front": "Define a convex set.",
              "back": "A set $C$ where the segment between any two points stays inside: for all $x,y\\in C$, $\\lambda\\in[0,1]$, $\\lambda x+(1-\\lambda)y\\in C$. (Disk, cube, half-plane — yes; crescent, donut — no.)"
            },
            {
              "front": "Define a convex function (chord condition).",
              "back": "$f(\\lambda x+(1-\\lambda)y)\\le \\lambda f(x)+(1-\\lambda)f(y)$ for $\\lambda\\in[0,1]$ — the chord lies on/above the graph; the function \"holds water\" like a bowl. Concave = $-f$ convex."
            },
            {
              "front": "How do you test convexity via derivatives?",
              "back": "1-D: $f''(x)\\ge 0$ everywhere (slope non-decreasing). Multivariable: the Hessian $\\nabla^2 f$ is positive semidefinite (all eigenvalues $\\ge 0$) everywhere."
            },
            {
              "front": "What is the key payoff of convexity for optimization?",
              "back": "For a convex function on a convex set, <strong>every local minimum is a global minimum</strong> (and strictly convex ⇒ unique minimizer). No deceptive local valleys — finding a local optimum means you've found the global one."
            },
            {
              "front": "State Jensen's inequality and one ML use.",
              "back": "For convex $f$: $f(\\mathbb{E}[X])\\le \\mathbb{E}[f(X)]$ (\"function of the average ≤ average of the function\"). Used to derive the VAE's ELBO, the non-negativity of KL divergence, and AM–GM. Flips for concave $f$."
            },
            {
              "front": "Which common ML losses are convex, and which are not?",
              "back": "Convex: linear-regression squared error, logistic-regression loss → gradient descent finds the global optimum. Non-convex: deep neural network losses (many local minima/saddles) → training relies on heuristics."
            }
          ],
          "homework": [
            {
              "prompt": "Determine whether each function is convex, concave, or neither on $\\mathbb{R}$ (or its natural domain): (a) $f(x)=x^2$, (b) $f(x)=x^3$, (c) $f(x)=e^{-x}$, (d) $f(x)=\\log x$ on $x>0$.",
              "hint": "Compute $f''$ and check its sign over the domain.",
              "solution": "(a) $f''=2>0$ → <strong>convex</strong>. (b) $f''=6x$ changes sign (negative for $x<0$, positive for $x>0$) → <strong>neither</strong> (convex only on $x\\ge0$). (c) $f''=e^{-x}>0$ → <strong>convex</strong>. (d) $f''=-1/x^2<0$ → <strong>concave</strong> on $x>0$."
            },
            {
              "prompt": "Use Jensen's inequality to show that for a positive random variable $X$, $\\mathbb{E}[1/X] \\ge 1/\\mathbb{E}[X]$.",
              "hint": "Is $f(x)=1/x$ convex on $x>0$? Apply Jensen.",
              "solution": "$f(x)=1/x$ has $f''(x)=2/x^3>0$ for $x>0$, so it is convex. Jensen for convex $f$ gives $f(\\mathbb{E}[X])\\le\\mathbb{E}[f(X)]$, i.e. $\\frac{1}{\\mathbb{E}[X]}\\le\\mathbb{E}\\!\\left[\\frac1X\\right]$. Hence $\\mathbb{E}[1/X]\\ge 1/\\mathbb{E}[X]$ — averaging reciprocals overshoots the reciprocal of the average."
            },
            {
              "prompt": "A student claims: \"I ran gradient descent twice from different random starts on my model and got two different final losses — the optimizer must be broken.\" For (a) logistic regression and (b) a deep neural network, is this symptom expected? Explain via convexity.",
              "hint": "Different starts converging to different minima points to multiple local minima.",
              "solution": "(a) Logistic regression has a <em>convex</em> loss, so every local min is the global min — different starts should converge to essentially the same loss. Two very different final losses would indeed signal a bug (or non-convergence / bad step size). (b) A deep network's loss is <em>non-convex</em> with many local minima and saddles, so different random initializations routinely land in different basins with different final losses — this is expected, not a bug. Convexity is exactly what distinguishes the two cases."
            }
          ],
          "examples": [
            {
              "title": "Proving a function convex two ways",
              "body": "Show that $f(x)=x^2$ is convex (i) directly from the chord definition, and (ii) via the second-derivative test. Then explain what this guarantees about minimizing it.",
              "solution": "(ii) Second derivative: $f''(x)=2\\ge0$ everywhere, so $f$ is convex (in fact strictly convex since $f''>0$).\n\n(i) Chord definition: we need $(\\lambda x+(1-\\lambda)y)^2 \\le \\lambda x^2+(1-\\lambda)y^2$. Move everything to one side; the difference simplifies to $-\\lambda(1-\\lambda)(x-y)^2$. Since $\\lambda\\in[0,1]$ makes $\\lambda(1-\\lambda)\\ge0$ and $(x-y)^2\\ge0$, this difference is $\\le 0$, i.e. the left side $\\le$ the right side. Convexity confirmed.\n\nGuarantee: because $x^2$ is strictly convex, it has a unique global minimum (at $x=0$) and gradient descent will find it from any starting point — no local-minimum traps."
            },
            {
              "title": "Why mean squared error is a convex loss",
              "body": "In linear regression we fit $\\hat y = wx+b$ by minimizing $L(w,b)=\\frac1n\\sum_i (wx_i+b-y_i)^2$. Argue that $L$ is convex in the parameters $(w,b)$, and state why this is the practical reason linear regression \"just works.\"",
              "solution": "Each term $(wx_i+b-y_i)^2$ is a squared <em>affine</em> function of $(w,b)$. An affine function composed with the convex function $t\\mapsto t^2$ is convex (a convex function of an affine map stays convex), so each term is convex in $(w,b)$. A nonnegative sum of convex functions is convex, so $L$ — the average of these terms — is convex in $(w,b)$. (Equivalently, its Hessian, proportional to $\\frac1n\\sum_i\\left(\\begin{smallmatrix}x_i^2 & x_i\\\\ x_i & 1\\end{smallmatrix}\\right)$, is positive semidefinite.) Convexity means every local minimum is global, so gradient descent (or the closed-form normal equations) reliably finds the one best fit regardless of initialization — the reason linear/logistic regression are dependable workhorses while deep nets need far more care."
            },
            {
              "title": "Jensen's inequality: convexity bends averages",
              "body": "For a convex function $f$, how do $f$ of the average and the average of $f$ compare? Test it with $f(x) = x^2$ on the values $x = 1$ and $x = 3$ (equal weights).",
              "solution": "<strong>Jensen's inequality</strong> says that for a convex $f$, $f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$ — the function of the average is at most the average of the function.\n<strong>Compute both sides.</strong> The mean is $\\mathbb{E}[X] = (1 + 3)/2 = 2$, so $f(\\mathbb{E}[X]) = 2^2 = 4$. The average of $f$ is $\\mathbb{E}[f(X)] = (1^2 + 3^2)/2 = (1 + 9)/2 = 5$. Indeed $4 \\le 5$.\n<strong>The gap is the variance.</strong> The difference $5 - 4 = 1$ is exactly $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = \\mathrm{Var}(X)$ — convexity turns spread into an upward bias.\n<strong>Why it matters.</strong> Jensen is everywhere: concave $\\log$ flips it to $\\mathbb{E}[\\log X] \\le \\log \\mathbb{E}[X]$ (behind the ELBO and entropy bounds), and a risk-averse (concave-utility) gambler prefers the sure thing to a fair bet. Convexity isn't just a shape — it's an inequality engine."
            }
          ]
        },
        {
          "id": "c-gradient-descent-convergence",
          "title": "Gradient Descent on Convex Functions",
          "minutes": 16,
          "content": "<h3>1. The hook: when does gradient descent actually work?</h3>\n<p>Gradient descent is the workhorse of machine learning, but on a general function it offers no promises — it can stall at a saddle or a shallow local dip. <strong>Convexity changes the contract.</strong> On a convex function, gradient descent is not just a heuristic that often works; it is a method with a <em>proof</em> that it converges to the global minimum, at a rate you can quantify in advance. This lesson connects the convexity of the last lesson to a concrete guarantee.</p>\n\n<h3>2. The algorithm, briefly</h3>\n<p><strong>Gradient descent</strong> repeatedly steps downhill, opposite the gradient:\n$$x_{k+1} = x_k - \\eta\\,\\nabla f(x_k),$$\nwhere $\\eta>0$ is the <strong>learning rate (step size)</strong>. The gradient points in the direction of steepest <em>increase</em>, so its negative is steepest decrease; $\\eta$ controls how far you move each step.</p>\n\n<h3>3. Convexity turns \"a local min\" into \"the answer\"</h3>\n<p>On a general landscape, the most gradient descent can promise is to reach a point where $\\nabla f = 0$ — which might be a local min, a saddle, or a plateau. On a <em>convex</em> function this is enough: a stationary point of a convex function is a global minimum (from the previous lesson). So if gradient descent converges at all on a convex problem, it converges to the global optimum. Convexity removes every trap that makes the algorithm's output untrustworthy.</p>\n\n<h3>4. The learning rate and smoothness</h3>\n<p>Convergence still hinges on choosing $\\eta$ well. The relevant property is <strong>smoothness</strong>: $f$ is $L$-smooth if its gradient doesn't change too fast (the gradient is $L$-Lipschitz, equivalently the Hessian's eigenvalues are bounded above by $L$). For an $L$-smooth convex function, a constant step size $\\eta \\le 1/L$ guarantees the loss decreases every step and converges. The failure modes are familiar:</p>\n<ul>\n<li>$\\eta$ <strong>too small</strong>: stable but painfully slow — many tiny steps.</li>\n<li>$\\eta$ <strong>too large</strong> (beyond $\\sim 2/L$): the steps overshoot the valley and the loss oscillates or diverges.</li>\n</ul>\n\n<h3>5. Strong convexity gives speed</h3>\n<p>Plain convexity guarantees you <em>arrive</em>; <strong>strong convexity</strong> guarantees you arrive <em>fast</em>. A function is $\\mu$-strongly convex if it curves up at least as much as a quadratic with curvature $\\mu$ (Hessian eigenvalues bounded <em>below</em> by $\\mu>0$) — it has a definite bowl shape, no flat directions. Strong convexity gives a unique minimum and, crucially, a fast convergence rate.</p>\n\n<p>See the geometry for yourself. Minimizing $f(x)=x^2$ (gradient $2x$) with step size $\\eta=0.1$, each update multiplies $x$ by $1-2\\eta=0.8$ — so the distance to the minimum shrinks by a constant factor every step. That constant-factor shrinkage <em>is</em> linear (geometric) convergence:</p>\n<div data-code=\"javascript\" data-expected=\"x: 10 -> 8 -> 6.4 -> 5.12 -> 4.096 -> 3.277\">// Gradient descent on f(x) = x^2 (gradient 2x), step size 0.1, starting at x = 10.\nlet x = 10, eta = 0.1;\nconst path = [x];\nfor (let i = 0; i &lt; 5; i++) {\n  x = x - eta * 2 * x;                 // x <- x - eta*f'(x)  =  0.8 * x\n  path.push(Math.round(x * 1000) / 1000);\n}\nconsole.log(\"x: \" + path.join(\" -> \"));   // each step multiplies x by 0.8 -> geometric convergence</div>\n<h3>6. Convergence rates</h3>\n<p>The rates make the distinction precise. For an $L$-smooth function with step $\\eta=1/L$:</p>\n<ul>\n<li><strong>Convex</strong>: the error shrinks like $f(x_k)-f^\\star = O(1/k)$ — a <em>sublinear</em> rate; halving the error takes twice as many steps.</li>\n<li><strong>Strongly convex</strong>: the error shrinks like $O\\big((1-\\mu/L)^k\\big)$ — a <em>linear</em> (geometric) rate; each step multiplies the error by a constant factor $<1$, so accuracy improves exponentially fast.</li>\n</ul>\n<p>The ratio $\\kappa = L/\\mu$ is the <strong>condition number</strong>: when $\\kappa$ is large (a long, narrow valley) convergence crawls and the iterates zig-zag; when $\\kappa\\approx1$ (a round bowl) it races straight to the bottom. This is exactly why <em>feature scaling</em> and <em>preconditioning</em> help — they shrink $\\kappa$.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>It explains the whole toolkit: momentum and Adam fight ill-conditioning (large $\\kappa$); normalizing inputs rounds out the bowl; the learning rate must respect smoothness $L$ or training diverges. The convex theory is the clean model that the messier deep-learning practice imitates.</p>\n</div>\n\n<h3>7. But deep learning is non-convex — so why does GD work?</h3>\n<p>Neural-network losses are non-convex, so none of these global guarantees strictly apply. Yet gradient descent works remarkably well in practice, for reasons still being researched: in very high dimensions most critical points are <em>saddles</em> rather than bad local minima; massive <strong>over-parameterization</strong> smooths the landscape and creates wide, connected basins of good solutions; and the noise in <strong>stochastic</strong> gradient descent helps escape saddles and sharp minima. The convex picture remains the indispensable mental model — and locally, near a minimum, a smooth loss looks convex (its Hessian is PSD there).</p>\n\n<h3>8. Why this matters</h3>\n<p>Understanding convergence under convexity is what lets you reason about training instead of just turning knobs: it tells you why the learning rate has a ceiling, why a poorly scaled problem trains slowly, what momentum and adaptive methods are really fixing, and what \"convergence\" can and cannot be promised. It is the theoretical backbone beneath every optimizer you will ever use.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why gradient descent zigzags (the condition number)</summary>\n<p>On a nicely round bowl, gradient descent walks straight to the minimum. On a long, narrow valley it <em>zigzags</em> — ricocheting between the steep walls while creeping along the gentle floor. The culprit is the <b>condition number</b> $\\kappa = \\lambda_{\\max}/\\lambda_{\\min}$, the ratio of largest to smallest curvature (the Hessian's eigenvalues).</p>\n<p>A single learning rate has to serve every direction at once. To stay stable it must be small enough for the <em>steepest</em> direction ($\\lambda_{\\max}$), which leaves it far too small for the <em>flattest</em> ($\\lambda_{\\min}$) — so progress along the valley floor is throttled. The number of steps to converge grows with $\\kappa$: a well-conditioned problem ($\\kappa \\approx 1$) converges fast, while an ill-conditioned one ($\\kappa \\gg 1$) crawls.</p>\n<p>The \"aha\": the difficulty isn't the slope, it's the <em>mismatch</em> in curvature across directions. That is exactly what momentum, adaptive methods like Adam, and preconditioning address — they let each direction move at its own sensible pace instead of being shackled to one global step size.</p>\n</details>\n<h4>Interactive — the learning-rate regimes</h4>\n<div data-viz=\"calc-gd\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: momentum smooths the zigzag</summary>\n<p>The first dive showed <em>why</em> gradient descent zigzags: in an ill-conditioned valley (large condition number $\\kappa$) the steepest direction and the direction to the minimum disagree, so steps oscillate across the narrow axis while crawling along the long one. <b>Momentum</b> is the fix.</p>\n<p>Momentum keeps a velocity $v \\leftarrow \\beta v + \\nabla f$ and steps with $v$ instead of the raw gradient. Across the oscillating axis, successive gradients point in <em>opposite</em> directions and largely cancel in the running average; along the shallow axis they point the <em>same</em> way and accumulate. The result is damped oscillation and accelerated progress toward the minimum — effectively a larger usable step without diverging. For a quadratic, momentum improves the convergence rate's dependence on $\\kappa$ to roughly $\\sqrt{\\kappa}$.</p>\n<p>The \"aha\": momentum is a low-pass filter on the gradient — it averages out the high-frequency zigzag and amplifies the consistent low-frequency drift. That is why nearly every modern optimizer (Adam included) carries a momentum term: it directly attacks the conditioning problem that makes plain gradient descent slow.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the convergence rate and why preconditioning helps</summary>\n<p>The zigzag has a precise cost: on a convex quadratic, gradient descent's error shrinks by a <em>fixed factor each step</em>, and that factor is set entirely by the <b>condition number</b> $\\kappa = \\lambda_{\\max}/\\lambda_{\\min}$.</p>\n<p><b>The rate.</b> With a well-tuned step size, the distance to the minimum contracts like $\\left(\\dfrac{\\kappa-1}{\\kappa+1}\\right)$ per step. When $\\kappa$ is small (well-conditioned, $\\approx 1$) the factor is near 0 — convergence in a few steps. When $\\kappa$ is large (a long thin valley, say $\\kappa=100$) the factor is $\\approx 0.98$ — it crawls, shaving off under 2% per step. The condition number does not just <em>cause</em> the zigzag; it <em>quantifies</em> how slow it is.</p>\n<p><b>Two ways to speed up.</b> <em>Momentum</em> improves the dependence from $\\kappa$ to $\\sqrt{\\kappa}$ (for $\\kappa=100$, the factor drops from $0.98$ to about $0.82$ — dramatically faster). <em>Preconditioning</em> attacks $\\kappa$ directly: rescale the problem so its curvature is more uniform. Normalizing or whitening inputs, batch norm, and Adam's per-coordinate scaling are all cheap preconditioners that shrink the <em>effective</em> condition number — which is the real reason they accelerate training.</p>\n<p>The \"aha\": convergence speed is governed by a single number, $\\kappa$. You either lower it (precondition: normalize, Adam) or weaken its grip (momentum: $\\kappa \\to \\sqrt{\\kappa}$). \"Make the bowl rounder, or build up speed across it\" — both target the same enemy, the condition number.</p>\n</details>\n",
          "mcq": [
            {
              "q": "On a general (non-convex) function, what is the strongest guarantee plain gradient descent can offer if it converges?",
              "choices": [
                "It reaches a point where $\\nabla f = 0$, which may be a local min, saddle, or plateau.",
                "It reaches the global minimum of $f$.",
                "It reaches a point where $f$ is strictly decreasing.",
                "It reaches a point where the Hessian is positive definite."
              ],
              "answer": 0,
              "explain": "Gradient descent only zeros the gradient; on a general landscape such a stationary point could be a saddle, plateau, or local dip. The global-minimum guarantee (choice 0) requires convexity, which the question explicitly excludes."
            },
            {
              "q": "Why does convexity make gradient descent's output trustworthy, when on a general function reaching $\\nabla f = 0$ proves nothing?",
              "choices": [
                "Convexity forces the gradient to never vanish until the minimum.",
                "On a convex function every stationary point ($\\nabla f = 0$) is automatically a global minimum.",
                "Convexity makes every step strictly decrease the loss regardless of $\\eta$.",
                "Convexity guarantees the Hessian is the identity matrix."
              ],
              "answer": 1,
              "explain": "For a convex function a stationary point is a global minimum, so converging to $\\nabla f = 0$ converges to the global optimum. Choice 1 is false (descent still requires a small enough $\\eta$), and choice 0 misstates the role of convexity."
            },
            {
              "q": "A loss is $L$-smooth and convex. Which constant step size is guaranteed to make the loss decrease every step and converge?",
              "choices": [
                "$\\eta \\le 1/L$",
                "Any $\\eta > 0$",
                "$\\eta = 3/L$",
                "$\\eta = 1/\\mu$"
              ],
              "answer": 0,
              "explain": "For $L$-smooth convex $f$, a constant step $\\eta \\le 1/L$ guarantees descent and convergence. Choice 2 ($3/L$) exceeds the $\\sim 2/L$ divergence threshold, and 'any $\\eta>0$' ignores the smoothness ceiling entirely."
            },
            {
              "q": "For a quadratic loss with $L$-smoothness $L$, gradient descent diverges once the step size exceeds roughly which value?",
              "choices": [
                "$2/L$",
                "$1/(2L)$",
                "$L/2$",
                "$1/L^2$"
              ],
              "answer": 0,
              "explain": "Steps beyond about $2/L$ overshoot the valley and the loss oscillates with growing amplitude. The safe-descent ceiling is $1/L$; the strict divergence boundary is $\\sim 2/L$, so choice 0 is correct."
            },
            {
              "q": "For $f(x)=\\tfrac12 a x^2$ with $a>0$, gradient descent gives $x_{k+1}=(1-\\eta a)x_k$. Which step size sends $x_1=0$ in a single step?",
              "choices": [
                "$\\eta = 2/a$",
                "$\\eta = 1/a$",
                "$\\eta = a$",
                "$\\eta = 1/(2a)$"
              ],
              "answer": 1,
              "explain": "The multiplier $1-\\eta a$ is zero exactly when $\\eta = 1/a$, so $x_1 = 0$ immediately. At $\\eta=2/a$ the multiplier is $-1$ and the iterates oscillate forever without converging."
            },
            {
              "q": "What does strong convexity ($\\mu$-strong convexity, $\\mu>0$) add beyond plain convexity for gradient descent?",
              "choices": [
                "It removes the need to choose a learning rate.",
                "It guarantees convergence even when $\\eta > 2/L$.",
                "It makes the function $L$-smooth automatically.",
                "It upgrades the convergence from sublinear $O(1/k)$ to a linear (geometric) rate $O((1-\\mu/L)^k)$."
              ],
              "answer": 3,
              "explain": "Strong convexity gives a unique minimum and a linear/geometric error decay $O((1-\\mu/L)^k)$, far faster than the sublinear $O(1/k)$ of plain convexity. It does not relax the step-size ceiling (choice 3) nor remove the need to pick $\\eta$."
            },
            {
              "q": "A loss has Hessian eigenvalues ranging from $\\mu = 2$ (flattest direction) to $L = 50$ (steepest). What is the condition number $\\kappa$?",
              "choices": [
                "$25$",
                "$52$",
                "$0.04$",
                "$48$"
              ],
              "answer": 0,
              "explain": "The condition number is $\\kappa = L/\\mu = 50/2 = 25$. Choices 0 and 1 wrongly subtract or add the eigenvalues; choice 2 inverts the ratio."
            },
            {
              "q": "Minimize $f(x)=x^2-4x+5$ with gradient descent from $x_0=0$ and $\\eta=0.1$. What is $x_1$?",
              "choices": [
                "$-0.4$",
                "$0.4$",
                "$0.8$",
                "$-4$"
              ],
              "answer": 1,
              "explain": "$f'(x)=2x-4$, so $f'(0)=-4$ and $x_1 = 0 - 0.1(-4) = 0.4$. Choice 1 flips the sign of the update, and choice 3 forgets to multiply by $\\eta$."
            },
            {
              "q": "Why does a large condition number $\\kappa = L/\\mu$ slow gradient descent down?",
              "choices": [
                "It forces the gradient to become zero too early.",
                "It causes the learning rate to grow without bound.",
                "It makes the function non-convex, removing all guarantees.",
                "A single step size cannot suit both a steep and a flat direction at once, so the iterates take tiny steps and zig-zag across a long narrow valley."
              ],
              "answer": 3,
              "explain": "With a stretched valley, the step must stay small ($\\eta\\le 1/L$) to remain stable in the steep direction, leaving the flat direction crawling, so GD zig-zags slowly. A large $\\kappa$ does not break convexity (choice 2); it just ill-conditions it."
            },
            {
              "q": "An engineer reports that feature scaling and normalizing inputs noticeably speed up training. In the convex-convergence picture, what are these techniques doing?",
              "choices": [
                "Increasing $L$ so larger steps are allowed.",
                "Replacing gradient descent with Newton's method.",
                "Shrinking the condition number $\\kappa$ by rounding out the loss bowl.",
                "Making the loss strongly convex when it was only convex."
              ],
              "answer": 2,
              "explain": "Scaling and normalization round out the bowl, lowering $\\kappa = L/\\mu$, which makes GD race straight to the bottom instead of zig-zagging. They don't change the algorithm (choice 2) or manufacture strong convexity from nowhere (choice 3)."
            },
            {
              "q": "Neural-network losses are non-convex, yet gradient descent works well in practice. Which explanation is consistent with the lesson?",
              "choices": [
                "Deep-net losses are secretly globally convex once trained.",
                "Gradient descent provably finds the global minimum of any non-convex loss given a small enough $\\eta$.",
                "In very high dimensions most critical points are saddles (not bad minima), over-parameterization creates wide good basins, and SGD noise helps escape saddles.",
                "Backpropagation cancels out all saddle points before training begins."
              ],
              "answer": 2,
              "explain": "The lesson attributes practical success to high-dimensional saddle prevalence, over-parameterized smooth landscapes, and stochastic-gradient noise — not to any global-convexity or global-minimum guarantee (choices 0 and 1 are false)."
            },
            {
              "q": "A student argues: 'Since the negative gradient always points downhill, any positive learning rate must decrease the loss.' Why is this reasoning wrong for an $L$-smooth convex function?",
              "choices": [
                "The loss only decreases when $\\eta$ is negative.",
                "The negative gradient actually points uphill on convex functions.",
                "Convex functions have no downhill direction at all.",
                "The negative gradient only gives the local slope; a step much larger than $\\sim 1/L$ can overshoot the valley and land higher than where it started."
              ],
              "answer": 3,
              "explain": "The gradient is just a local linear approximation trusted over a distance set by smoothness ($\\eta\\le 1/L$); too large a step overshoots and the loss rises, even though the direction is locally downhill. The other options misstate basic facts about gradients and convexity."
            },
            {
              "q": "Minimize $f(x)=x^2$ by gradient descent from $x_0 = 4$ with step size $\\eta = 0.1$. What is $x_1$?",
              "choices": [
                "$4.8$",
                "$3.2$",
                "$0.8$",
                "$3.6$"
              ],
              "answer": 1,
              "explain": "$x_1 = x_0 - \\eta f'(x_0)$ with $f'(x)=2x$: $x_1 = 4 - 0.1\\cdot(2\\cdot4) = 4 - 0.8 = 3.2$. Each step moves a fraction of the way toward the minimum at $x=0$."
            },
            {
              "q": "Gradient descent has reached a minimum of a convex function when the gradient is:",
              "choices": [
                "equal to the learning rate",
                "maximal",
                "zero ($\\nabla f = \\mathbf{0}$)",
                "negative"
              ],
              "answer": 2,
              "explain": "At a minimum the slope is flat, so $\\nabla f = \\mathbf{0}$ and the update $x \\leftarrow x - \\eta\\nabla f$ stops moving. For a convex function this stationary point is the global minimum."
            },
            {
              "q": "If the learning rate is set too large, gradient descent tends to:",
              "choices": [
                "converge faster with no downside",
                "do nothing",
                "always still converge, just slowly",
                "overshoot the minimum and oscillate or diverge"
              ],
              "answer": 3,
              "explain": "Too big a step jumps past the minimum and can land higher than it started, bouncing outward and diverging. For an $L$-smooth loss, steps above $2/L$ are guaranteed to diverge. (Too *small* a step is safe but crawls — hence tuning the learning rate matters.)"
            },
            {
              "q": "Gradient descent is called a *first-order* method because it uses only:",
              "choices": [
                "the function value $f(x)$",
                "the second derivative (Hessian)",
                "the first derivative — the gradient $\\nabla f$ — and not the Hessian",
                "random sampling"
              ],
              "answer": 2,
              "explain": "First-order methods rely solely on the gradient (first derivatives). Second-order methods like Newton's also use the Hessian (curvature) to take smarter steps, but at much higher cost per step — which is why gradient descent dominates large-scale deep learning."
            }
          ],
          "flashcards": [
            {
              "front": "Write the gradient descent update and name its parts.",
              "back": "$x_{k+1}=x_k-\\eta\\,\\nabla f(x_k)$: step opposite the gradient (steepest decrease) with learning rate / step size $\\eta>0$ controlling how far you move."
            },
            {
              "front": "Why does gradient descent's output become trustworthy on a convex function?",
              "back": "A stationary point ($\\nabla f=0$) of a convex function is a <em>global</em> minimum. So if GD converges on a convex problem, it converges to the global optimum — no saddle/local-min traps."
            },
            {
              "front": "What is $L$-smoothness and what step size does it permit?",
              "back": "$f$ is $L$-smooth if its gradient is $L$-Lipschitz (Hessian eigenvalues $\\le L$). For $L$-smooth convex $f$, a constant step $\\eta\\le 1/L$ guarantees descent and convergence; $\\eta\\gtrsim 2/L$ overshoots and diverges."
            },
            {
              "front": "Convex vs. strongly convex: how do the convergence rates differ?",
              "back": "Convex (L-smooth, $\\eta=1/L$): error $O(1/k)$ — sublinear. Strongly convex ($\\mu>0$): error $O((1-\\mu/L)^k)$ — linear/geometric, exponentially fast. Strong convexity also gives a unique minimum."
            },
            {
              "front": "What is the condition number $\\kappa$ and why does it matter?",
              "back": "$\\kappa=L/\\mu$ (ratio of largest to smallest curvature). Large $\\kappa$ = long narrow valley → slow, zig-zagging GD; $\\kappa\\approx1$ = round bowl → fast. Feature scaling/preconditioning shrink $\\kappa$."
            },
            {
              "front": "If deep-net losses are non-convex, why does gradient descent still work?",
              "back": "In high dimensions most critical points are saddles (not bad minima); over-parameterization creates wide, connected good basins; and SGD noise escapes saddles/sharp minima. Locally near a minimum the loss looks convex."
            }
          ],
          "homework": [
            {
              "prompt": "For $f(x)=\\tfrac12 a x^2$ (with $a>0$), gradient descent is $x_{k+1}=x_k-\\eta a x_k=(1-\\eta a)x_k$. (a) For what range of $\\eta$ does $x_k\\to 0$? (b) What $\\eta$ converges fastest, and what happens at $\\eta=2/a$?",
              "hint": "Convergence needs $|1-\\eta a|<1$. Fastest is when the multiplier is 0.",
              "solution": "(a) $x_k=(1-\\eta a)^k x_0\\to0$ iff $|1-\\eta a|<1$, i.e. $0<\\eta<2/a$. (b) Fastest when $1-\\eta a=0$, i.e. $\\eta=1/a$, which sends $x_1=0$ in a single step. At $\\eta=2/a$ the multiplier is $1-2=-1$, so $|{-1}|=1$: the iterates oscillate $x_0,-x_0,x_0,\\dots$ forever without converging; beyond $2/a$ they diverge. (Here $L=a$, so $\\eta\\le1/L=1/a$ is the safe regime.)"
            },
            {
              "prompt": "A loss has Hessian eigenvalues ranging from $\\mu=1$ (flattest direction) to $L=100$ (steepest). (a) What is the condition number? (b) Qualitatively, how will vanilla gradient descent behave, and name one fix.",
              "hint": "$\\kappa=L/\\mu$. Large $\\kappa$ means a stretched valley.",
              "solution": "(a) $\\kappa=L/\\mu=100/1=100$ — a badly ill-conditioned, long narrow valley. (b) A single step size cannot suit both directions: to stay stable in the steep direction ($\\eta\\le1/L=0.01$) the step is tiny in the flat direction, so GD takes many steps and zig-zags slowly across the valley toward the minimum. Fixes: feature scaling/normalization (rounds the bowl, lowering $\\kappa$), momentum (damps the zig-zag), or adaptive/preconditioned methods like Adam (per-direction step sizes)."
            },
            {
              "prompt": "Explain why, for an $L$-smooth convex function, setting the learning rate far above $1/L$ causes training loss to increase rather than decrease, despite each step moving \"downhill\" along the gradient.",
              "hint": "The gradient is only a local linear approximation; smoothness bounds how fast it changes.",
              "solution": "The negative gradient gives the steepest-descent <em>direction</em>, but only the <em>local</em> slope; smoothness $L$ bounds how quickly that slope changes. A step of size $\\eta$ moves a distance where the linear approximation is only trusted for about $\\eta\\le1/L$. If $\\eta$ is much larger, the step overshoots past the valley floor and up the opposite wall, landing at a point <em>higher</em> than where it started — so the loss rises. Repeated overshooting makes the loss oscillate with growing amplitude (divergence). This is why the step size must respect the curvature ceiling $L$, not just follow the downhill direction."
            }
          ],
          "examples": [
            {
              "title": "One step of gradient descent on a quadratic",
              "body": "Minimize $f(x)=x^2-4x+5$ starting at $x_0=0$ with learning rate $\\eta=0.1$. (i) Find the exact minimizer. (ii) Take two gradient-descent steps. (iii) Comment on whether convexity guarantees this converges to the true minimum.",
              "solution": "(i) $f'(x)=2x-4=0\\Rightarrow x^\\star=2$, with $f(2)=4-8+5=1$. ($f''=2>0$, so $f$ is convex with a unique global min.)\n\n(ii) Update $x_{k+1}=x_k-\\eta(2x_k-4)$. Step 1: $f'(0)=-4$, so $x_1=0-0.1(-4)=0.4$. Step 2: $f'(0.4)=2(0.4)-4=-3.2$, so $x_2=0.4-0.1(-3.2)=0.72$. The iterates climb toward $x^\\star=2$.\n\n(iii) Yes — $f$ is convex and smooth ($L=2$), and $\\eta=0.1\\le1/L=0.5$, so gradient descent provably converges to the unique global minimizer $x^\\star=2$. (Here $1-\\eta\\cdot2=0.8$, so the distance to $2$ shrinks by 20% each step: $|x_k-2|=0.8^k\\cdot2$.)"
            },
            {
              "title": "Reading a learning-rate sweep through the convex lens",
              "body": "Training a logistic-regression model (convex loss, smoothness $L\\approx4$), an engineer tries three learning rates and observes: $\\eta=0.05$ → loss decreases very slowly; $\\eta=0.25$ → loss decreases quickly and smoothly; $\\eta=1.0$ → loss bounces around and increases. Explain each outcome using the convex-convergence theory.",
              "solution": "The safe ceiling is about $\\eta\\le1/L=0.25$.\n\n· $\\eta=0.05$: well below the ceiling — stable and guaranteed to converge, but each step is conservative, so progress is slow (the sublinear/linear rate with a small effective factor).\n\n· $\\eta=0.25\\approx1/L$: near the optimal constant step for an $L$-smooth problem — large stable steps, fast smooth decrease to the global optimum (convexity guarantees there are no traps).\n\n· $\\eta=1.0$: far above $2/L=0.5$, so steps overshoot the valley and the linear approximation breaks down; the loss oscillates and grows (divergence).\n\nThe convex theory predicts exactly this U-shaped behavior: too small wastes steps, too large diverges, and the sweet spot sits around $1/L$. Because the loss is convex, the good run is also guaranteed to reach the <em>global</em> optimum, not just some local dip."
            },
            {
              "title": "The learning-rate window: too big and it diverges",
              "body": "Gradient descent on $f(x) = \\tfrac{1}{2}a x^2$ (with $a = 2$) updates $x \\leftarrow x - \\eta f'(x)$. For which learning rates $\\eta$ does it converge, and which is fastest?",
              "solution": "<strong>One step is a multiplication.</strong> Since $f'(x) = a x$, the update is $x \\leftarrow x - \\eta a x = (1 - \\eta a)\\,x$ — each step multiplies $x$ by the fixed factor $(1 - \\eta a)$.\n<strong>Convergence needs $|1 - \\eta a| \\lt 1$.</strong> The iterates shrink to 0 only if that factor has magnitude below 1: $-1 \\lt 1 - \\eta a \\lt 1$, i.e. $0 \\lt \\eta \\lt \\tfrac{2}{a}$. With $a = 2$ that is $0 \\lt \\eta \\lt 1$. At $\\eta \\ge \\tfrac{2}{a}$ the factor is $\\le -1$ and the iterates <em>grow</em> — gradient descent diverges, overshooting more each step.\n<strong>The fastest rate.</strong> The factor is smallest (zero) at $\\eta = \\tfrac{1}{a} = 0.5$, landing on the minimum in a <em>single</em> step. Below it you converge monotonically; between $\\tfrac{1}{a}$ and $\\tfrac{2}{a}$ you converge while flipping sign each step.\n<strong>The aha.</strong> The safe rate is set by the curvature $a$ (the second derivative): $\\eta \\lt 2/a$. In many dimensions $a$ becomes the largest Hessian eigenvalue, so the step that keeps the steepest direction stable bounds the whole rate — and a wide spread of curvatures (a large condition number) is what forces a small, slow $\\eta$."
            }
          ]
        },
        {
          "id": "c-lagrange-multipliers",
          "title": "Constrained Optimization & Lagrange Multipliers",
          "minutes": 17,
          "content": "<h3>1. The hook: optimizing with strings attached</h3>\n<p>Real problems rarely let you optimize freely. Maximize a portfolio's return <em>subject to</em> a fixed budget; minimize a model's error <em>subject to</em> a cap on its weights; find the most likely distribution <em>subject to</em> matching observed averages. These are <strong>constrained optimization</strong> problems, and the elegant tool that solves the equality-constrained case is the method of <strong>Lagrange multipliers</strong> — one of the most useful ideas in all of applied calculus.</p>\n\n<h3>2. The setup and the geometric insight</h3>\n<p>We want to optimize $f(x)$ subject to a constraint $g(x)=0$. The constraint confines us to a curve or surface; we slide along it seeking the highest (or lowest) value of $f$. The key picture: at the constrained optimum, the contour line of $f$ is <strong>tangent</strong> to the constraint curve. If they merely crossed, you could slide along the constraint to a better $f$-value — so at the best point they just touch. Tangency means their gradients point along the same line:\n$$\\nabla f(x) = \\lambda\\,\\nabla g(x),$$\nfor some scalar $\\lambda$, the <strong>Lagrange multiplier</strong>. (Gradients are perpendicular to contours, so parallel gradients = tangent contours.)</p>\n\n<h3>3. The Lagrangian</h3>\n<p>This condition is packaged neatly by the <strong>Lagrangian</strong>, which folds the constraint into a single function:\n$$\\mathcal{L}(x, \\lambda) = f(x) - \\lambda\\,g(x).$$\nSetting its gradient (with respect to both $x$ and $\\lambda$) to zero recovers everything at once: $\\nabla_x \\mathcal{L}=0$ gives $\\nabla f = \\lambda\\nabla g$ (the tangency condition), and $\\partial \\mathcal{L}/\\partial\\lambda = 0$ gives back the constraint $g(x)=0$. A constrained problem in $x$ becomes an <em>unconstrained</em> stationary-point problem in $(x,\\lambda)$.</p>\n\n<h3>4. The recipe</h3>\n<p>To optimize $f$ subject to $g(x)=0$:</p>\n<ul>\n<li>Form $\\mathcal{L}(x,\\lambda) = f(x) - \\lambda g(x)$.</li>\n<li>Solve the system $\\nabla_x \\mathcal{L} = 0$ and $g(x)=0$ for $x$ and $\\lambda$.</li>\n<li>Compare $f$ at the resulting candidate points to identify the max/min.</li>\n</ul>\n<p>The multiplier $\\lambda$ is not just bookkeeping — it carries meaning, as the next section shows.</p>\n\n<h3>5. What the multiplier means: the shadow price</h3>\n<p>The value of $\\lambda$ at the optimum is the <strong>sensitivity</strong> of the optimal objective to loosening the constraint. If the constraint is $g(x)=c$, then\n$$\\frac{d f^\\star}{dc} = \\lambda.$$\nIn economics $\\lambda$ is the <strong>shadow price</strong> — how much more optimal value you would gain per unit of extra budget. A large $\\lambda$ means the constraint is \"expensive\" (binding hard); $\\lambda=0$ means it isn't really limiting you. This interpretation is why multipliers appear throughout economics, physics, and ML.</p>\n\n<h3>6. Inequality constraints: a glimpse of KKT</h3>\n<p>Many problems involve <em>inequality</em> constraints, $g(x)\\le 0$. The generalization is the <strong>Karush–Kuhn–Tucker (KKT)</strong> conditions, which add two ideas: the multiplier must be nonnegative ($\\lambda\\ge0$), and <strong>complementary slackness</strong> holds — $\\lambda\\,g(x)=0$, meaning either the constraint is <em>active</em> ($g(x)=0$, like an equality) or its multiplier is zero ($\\lambda=0$, the constraint is slack and ignorable). KKT is the foundation of constrained convex optimization and the engine behind support vector machines.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A hiker maximizing altitude while staying on a fixed trail stops where the trail runs tangent to a contour of the hillside — pushing further along the trail would only take her downhill. The multiplier measures how much higher she could get if the trail were nudged outward a little.</p>\n</div>\n\n<h3>7. Worked example</h3>\n<p>Maximize $f(x,y)=xy$ subject to $x+y=10$. Lagrangian: $\\mathcal{L}=xy-\\lambda(x+y-10)$. Stationarity: $\\partial_x\\mathcal{L}=y-\\lambda=0$ and $\\partial_y\\mathcal{L}=x-\\lambda=0$, so $x=y=\\lambda$. The constraint $x+y=10$ then gives $2\\lambda=10$, $\\lambda=5$, so $x=y=5$ and $f=25$. The multiplier $\\lambda=5$ predicts that raising the budget to $x+y=11$ would raise the optimum by about $5$ — and indeed the new optimum is $5.5\\times5.5=30.25$, an increase of $5.25\\approx\\lambda$. (This also proves AM–GM for two numbers: the product is largest when they're equal.)</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>Constrained optimization and multipliers are everywhere in ML. <strong>Support vector machines</strong> are a constrained quadratic program solved through its KKT conditions, where the multipliers identify the support vectors. <strong>Regularization</strong> has a constrained reading: ridge/LASSO are equivalent to minimizing loss subject to a budget on the weights ($\\lVert w\\rVert\\le t$), with the penalty strength playing the role of a multiplier. And the <strong>maximum-entropy</strong> derivation of the softmax, and constrained policy updates in RL, are Lagrangian arguments. Mastering this turns \"minimize subject to\" from a roadblock into a routine.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-lagrange\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: KKT and complementary slackness — you only pay for the fences you lean on</summary>\n<p>Inequality constraints ($g(\\mathbf{x}) \\le 0$) add one beautifully intuitive rule on top of Lagrange multipliers: <strong>complementary slackness</strong>, $\\lambda_i\\, g_i(\\mathbf{x}^\\star) = 0$. For each constraint, <em>either</em> its multiplier is zero <em>or</em> the constraint is tight at the optimum — they are never both nonzero.</p>\n<p>Read it as a market for constraints, using the shadow-price meaning of $\\lambda$ (what the optimum would improve if you relaxed that constraint a touch). If a constraint is <strong>inactive</strong> — you sit strictly inside it, $g_i<0$ — then relaxing it buys you nothing, so its price must be $\\lambda_i = 0$. If a constraint is <strong>active</strong> — you are pressed right against it, $g_i=0$ — then it genuinely holds you back, so it may carry a positive price. You only pay for the fences you are actually leaning on.</p>\n<p>That single condition is what makes KKT <em>practical</em>: solving a constrained problem becomes a search over <strong>which constraints are active</strong>. It is exactly the logic behind support vectors in an SVM — only the points on the margin (the active constraints) get nonzero multipliers and define the boundary; every other point has $\\lambda_i=0$ and could be deleted without changing the answer — and behind active-set solvers in general.</p>\n</details>\n<h4>Try it in code</h4>\n<p>Minimize <code>f(x,y)=x²+y²</code> subject to <code>x+y=S</code>. Lagrange gives <code>∇f=(2x,2y)=λ(1,1)</code>, so x=y=S/2 — the point on the line closest to the origin. Run it for S=4:</p>\n<div data-code=\"javascript\" data-expected=\"8\">// Minimize x^2 + y^2 on the line x + y = S. Lagrange =&gt; x = y = S/2.\nfunction minOnLine(S) {\n  var x = S / 2;\n  return 2 * x * x;\n}\nconsole.log(minOnLine(4));   // 8 -- nearest point to the origin is (2,2)</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ∇f is parallel to ∇g at the optimum</summary>\n<p>Beyond the KKT bookkeeping, Lagrange multipliers have a one-picture core: at a constrained optimum, the objective's gradient is <b>parallel</b> to the constraint's gradient.</p>\n<p><b>The condition.</b> To maximize $f(\\mathbf{x})$ subject to $g(\\mathbf{x}) = c$, the optimum satisfies $\\nabla f = \\lambda\\,\\nabla g$ for some scalar $\\lambda$ (the multiplier). Geometrically: a level curve of $f$ is <em>tangent</em> to the constraint curve there.</p>\n<p><b>Why parallel?</b> Walk along the constraint. Your movement direction is always <em>perpendicular</em> to $\\nabla g$ (moving along $g=c$ does not change $g$). At a max of $f$, you cannot increase $f$ by stepping either way along the constraint — so $f$ has <em>no rate of change</em> in your allowed directions, meaning $\\nabla f$ is also perpendicular to every along-constraint direction. Two vectors perpendicular to the same tangent line must be <em>parallel</em>: $\\nabla f \\parallel \\nabla g$. If they were not, $\\nabla f$ would have a component <em>along</em> the constraint, and you could slide that way to improve $f$ — so you were not at the optimum.</p>\n<p>The \"aha\": \"introduce a multiplier $\\lambda$ and set $\\nabla f = \\lambda\\nabla g$\" is not a magic recipe — it is the statement \"the level set of $f$ kisses the constraint.\" Optimality is exactly tangency; $\\lambda$ is the scale factor that makes the two gradients line up (and, as the shadow-price example shows, it measures how the optimum responds to loosening the constraint).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: λ is the shadow price (what the multiplier means)</summary>\n<p>The multiplier $\\lambda$ in $\\nabla f = \\lambda \\nabla g$ looks like a throwaway algebraic unknown you solve for and discard. In fact <em>its value carries the most useful information in the whole method</em>.</p>\n<p><b>The sensitivity interpretation.</b> Suppose the constraint is $g(x) = c$. Let $f^*(c)$ be the optimal value as a function of the constraint level $c$. Then, remarkably, $$\\lambda = \\frac{d f^*}{d c}.$$ The multiplier is exactly the <em>rate at which the optimum improves as you loosen the constraint by one unit</em>. It is not bookkeeping — it is a derivative of the answer.</p>\n<p><b>Why it is called a shadow price.</b> In economics, if $f$ is profit and the constraint is a budget or resource limit $c$, then $\\lambda$ is how much <em>one more unit</em> of that resource is worth to you — the price you would rationally pay for it. A large $\\lambda$ means the constraint is biting hard (relaxing it pays off a lot); $\\lambda = 0$ means the constraint is not really limiting you (the complementary-slackness case from the other dive — an inactive constraint has zero shadow price).</p>\n<p>The \"aha\": do not discard $\\lambda$ after solving — read it. It measures how sensitive the optimal value is to the constraint, that is, the value of relaxing it by one unit. That \"shadow price\" is why Lagrange multipliers are central to economics, resource allocation, and the dual view of optimization.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Maximize $f(x,y)=xy$ subject to $g(x,y)=x+y-10=0$. Solving the Lagrange conditions, what is the optimal $(x,y)$ and the maximum value?",
              "choices": [
                "$(0,10)$, max $=0$",
                "$(10,0)$, max $=0$",
                "$(2,8)$, max $=16$",
                "$(5,5)$, max $=25$"
              ],
              "answer": 3,
              "explain": "$\\nabla f=(y,x)$ and $\\nabla g=(1,1)$, so $y=\\lambda$ and $x=\\lambda$, giving $x=y$; the constraint then forces $x=y=5$ and $f=25$. The corner choices have zero product and are not interior tangency solutions."
            },
            {
              "q": "When solving $\\nabla f=\\lambda\\nabla g$ together with $g(\\mathbf{x})=0$ in $\\mathbb{R}^n$ with one constraint, how many scalar equations and unknowns are there?",
              "choices": [
                "$n+1$ equations in $n+1$ unknowns (the $n$ components of $\\mathbf{x}$ plus $\\lambda$)",
                "$n$ equations in $n$ unknowns ($\\mathbf{x}$ only)",
                "$2n$ equations in $n$ unknowns",
                "$n-1$ equations in $n$ unknowns"
              ],
              "answer": 0,
              "explain": "The vector equation $\\nabla f=\\lambda\\nabla g$ supplies $n$ scalar equations, and the constraint $g=0$ adds one more, for $n+1$ equations; the unknowns are the $n$ coordinates plus the multiplier $\\lambda$, also $n+1$. Forgetting to count $\\lambda$ as an unknown (and the constraint as an equation) is the common slip."
            },
            {
              "q": "The Lagrange multiplier $\\lambda$ at the optimum of 'maximize $f$ subject to $g(\\mathbf{x})=c$' has a famous interpretation. What does it measure?",
              "choices": [
                "The slope of the constraint curve at the optimum",
                "The distance from the optimum to the unconstrained maximum",
                "The rate of change of the optimal value $f^*$ with respect to the constraint level $c$, i.e. $\\lambda=\\frac{df^*}{dc}$",
                "The curvature of $f$ along the constraint"
              ],
              "answer": 2,
              "explain": "By the envelope theorem, $\\lambda$ equals the marginal change in the optimal objective value per unit relaxation of the constraint, $df^*/dc$ — its 'shadow price.' It is not a slope or distance; it tells you how much loosening the budget would buy you."
            },
            {
              "q": "A student forms $\\mathcal{L}(x,y,\\lambda)=f(x,y)-\\lambda\\,g(x,y)$ and wants the stationarity conditions. Differentiating $\\mathcal{L}$ with respect to $\\lambda$ and setting it to zero recovers which equation?",
              "choices": [
                "$\\nabla f=\\mathbf{0}$",
                "The original constraint $g(x,y)=0$",
                "$\\lambda=0$",
                "$\\nabla f=\\lambda\\nabla g$"
              ],
              "answer": 1,
              "explain": "Since $\\mathcal{L}=f-\\lambda g$, we have $\\partial\\mathcal{L}/\\partial\\lambda=-g$, so setting it to zero gives back $g(x,y)=0$. The $x$- and $y$-derivatives produce $\\nabla f=\\lambda\\nabla g$; the $\\lambda$-derivative is precisely what re-imposes the constraint."
            },
            {
              "q": "Why does the method of Lagrange multipliers require the constraint qualification $\\nabla g(\\mathbf{x}^*)\\neq\\mathbf{0}$ at the candidate point?",
              "choices": [
                "Because $\\lambda$ would otherwise be negative",
                "Because if $\\nabla g=\\mathbf{0}$ the equation $\\nabla f=\\lambda\\nabla g$ cannot capture the tangency, so a genuine optimum may exist with no valid $\\lambda$",
                "Because the Lagrangian would no longer be differentiable",
                "Because $f$ must also have zero gradient there"
              ],
              "answer": 1,
              "explain": "If $\\nabla g=\\mathbf{0}$, the right-hand side of $\\nabla f=\\lambda\\nabla g$ is the zero vector for every $\\lambda$, so the condition cannot represent the gradient of $f$ unless $\\nabla f$ is also zero — the method can silently miss the true optimum. Such points must be checked separately."
            },
            {
              "q": "For a problem with TWO equality constraints, $g_1(\\mathbf{x})=0$ and $g_2(\\mathbf{x})=0$, what is the correct stationarity condition at a constrained optimum (assuming the constraint gradients are independent)?",
              "choices": [
                "$\\nabla f=\\lambda_1\\nabla g_1+\\lambda_2\\nabla g_2$ for some scalars $\\lambda_1,\\lambda_2$",
                "$\\nabla f=\\lambda_1\\nabla g_1=\\lambda_2\\nabla g_2$ with $\\lambda_1=\\lambda_2$",
                "$\\nabla f=\\lambda(\\nabla g_1+\\nabla g_2)$ for a single $\\lambda$",
                "$\\nabla f\\cdot\\nabla g_1=\\nabla f\\cdot\\nabla g_2=0$"
              ],
              "answer": 0,
              "explain": "With several constraints, $\\nabla f$ must lie in the span of the constraint gradients, so it is a linear combination $\\sum_i\\lambda_i\\nabla g_i$ — one multiplier per constraint. Using a single shared $\\lambda$ or forcing the multipliers equal wrongly collapses the feasible-direction analysis."
            },
            {
              "q": "Minimize $f(x,y)=x^2+y^2$ subject to $x+2y=5$. What is the minimum value of $f$?",
              "choices": [
                "$1$",
                "$25$",
                "$5$",
                "$0$"
              ],
              "answer": 2,
              "explain": "$\\nabla f=(2x,2y)=\\lambda(1,2)$ gives $x=\\lambda/2,\\ y=\\lambda$, so $y=2x$; substituting into $x+2y=5$ yields $5x=5$, $x=1,y=2$, and $f=1+4=5$. The value $25$ comes from mistakenly squaring the constraint constant."
            },
            {
              "q": "A student insists that any solution of $\\nabla f=\\lambda\\nabla g$ together with $g=0$ must be the constrained MAXIMUM. Why is this wrong?",
              "choices": [
                "Because $\\lambda$ must be positive for a maximum",
                "Because the equations actually only find minima, never maxima",
                "The equations are only necessary first-order conditions, so they also flag minima and other stationary points; you must compare values or use a second-order test to identify the maximum",
                "Because the method ignores the constraint"
              ],
              "answer": 2,
              "explain": "Lagrange conditions are first-order necessary conditions satisfied by constrained maxima, minima, and saddle-type stationary points alike. You must evaluate $f$ at all candidates (or apply a bordered-Hessian/second-order test) to know which is the maximum."
            },
            {
              "q": "Geometrically, the condition $\\nabla f=\\lambda\\nabla g$ says the contour of $f$ is tangent to the constraint curve. What goes wrong at a point where the contour of $f$ instead CROSSES the constraint transversally?",
              "choices": [
                "Moving a little along the constraint in one direction increases $f$, so the point cannot be a constrained extremum",
                "$f$ is undefined along the constraint",
                "The gradient of $g$ vanishes there",
                "The multiplier $\\lambda$ becomes infinite"
              ],
              "answer": 0,
              "explain": "If the contour crosses the constraint, the constraint passes through to both higher and lower contour values, so you can slide along it to improve $f$ — proving the point is not optimal. Tangency is exactly the condition that removes any such improving direction."
            },
            {
              "q": "In regularized regression, minimizing training loss subject to $\\|\\mathbf{w}\\|_2^2\\le t$ is, by Lagrangian duality, equivalent to which unconstrained problem?",
              "choices": [
                "Minimize $\\text{loss}(\\mathbf{w})\\cdot\\lambda\\|\\mathbf{w}\\|_2^2$",
                "Minimize $\\text{loss}(\\mathbf{w})+\\lambda\\|\\mathbf{w}\\|_2^2$ for some $\\lambda\\ge 0$ (ridge regression)",
                "Maximize $\\text{loss}(\\mathbf{w})-\\lambda\\|\\mathbf{w}\\|_2^2$",
                "Minimize $\\|\\mathbf{w}\\|_2^2$ with no loss term"
              ],
              "answer": 1,
              "explain": "Folding the squared-norm budget into the objective with a multiplier gives the penalized form $\\text{loss}+\\lambda\\|\\mathbf{w}\\|_2^2$, which is ridge regression; tightening the budget $t$ corresponds to a larger $\\lambda$. The penalty is additive, not multiplicative, and you minimize (not maximize) it."
            },
            {
              "q": "Why can the sign convention of the multiplier (writing $\\nabla f=\\lambda\\nabla g$ versus $\\nabla f=-\\lambda\\nabla g$, or $\\mathcal{L}=f-\\lambda g$ versus $f+\\lambda g$) be chosen freely for an EQUALITY constraint?",
              "choices": [
                "Because the choice only flips the sign of the recovered $\\lambda$; the located point $\\mathbf{x}^*$ is identical either way",
                "Because $\\lambda$ is always zero for equality constraints",
                "Because the constraint is automatically satisfied regardless",
                "Because equality constraints have no gradient"
              ],
              "answer": 0,
              "explain": "Replacing $\\lambda$ by $-\\lambda$ just relabels the multiplier, so the system has the same solution set for $\\mathbf{x}$ — only the sign/value reported for $\\lambda$ changes. (For inequality constraints the sign matters via KKT, but for a pure equality it is a free convention.)"
            },
            {
              "q": "Suppose at a Lagrange candidate you find $\\lambda=3$ for 'maximize profit $f$ subject to spending exactly $g=c$ dollars.' What is the best practical reading?",
              "choices": [
                "The constraint is irrelevant since $\\lambda\\neq 0$",
                "The optimal profit equals $3c$",
                "You should spend $3$ times the current budget",
                "Each extra dollar of budget would raise the optimal profit by about $3$ units"
              ],
              "answer": 3,
              "explain": "As the shadow price, $\\lambda\\approx df^*/dc$, so $\\lambda=3$ means relaxing the budget by one dollar increases optimal profit by roughly $3$ units — the marginal value of the resource. It does not mean profit equals $3c$ nor that you should scale spending."
            },
            {
              "q": "Maximize $f(x,y)=x+y$ subject to $x^2+y^2=2$. What is the maximum value?",
              "choices": [
                "$\\sqrt{2}$",
                "$2$",
                "$4$",
                "$1$"
              ],
              "answer": 1,
              "explain": "Lagrange: $\\nabla f=(1,1)=\\lambda(2x,2y)$ forces $x=y$; the constraint $x^2+y^2=2$ then gives $x=y=1$ (the maximum), so $f=1+1=2$. (The point $x=y=-1$ gives the minimum $-2$.)"
            },
            {
              "q": "In 'optimize $f$ subject to $g(\\mathbf{x})=c$', the constraint restricts the search to:",
              "choices": [
                "only the origin",
                "the boundary of $f$",
                "the entire space (the constraint is just a hint)",
                "the set of points satisfying $g(\\mathbf{x})=c$ — a lower-dimensional surface or curve, not all of space"
              ],
              "answer": 3,
              "explain": "Constrained optimization searches only the *feasible set* $\\{\\mathbf{x}: g(\\mathbf{x})=c\\}$ — e.g. a curve in the plane or a surface in 3-D. The best point on that restricted set generally differs from the unconstrained optimum, which is why a special method is needed."
            },
            {
              "q": "For 'optimize $f$ subject to $g(\\mathbf{x})=0$', the Lagrangian is $\\mathcal{L}(\\mathbf{x},\\lambda) = $",
              "choices": [
                "$f(\\mathbf{x})\\cdot g(\\mathbf{x})$",
                "$f(\\mathbf{x}) + g(\\mathbf{x})$",
                "$f(\\mathbf{x}) - \\lambda\\,g(\\mathbf{x})$",
                "$f(\\mathbf{x}) / g(\\mathbf{x})$"
              ],
              "answer": 2,
              "explain": "The Lagrangian folds the constraint into the objective with a multiplier: $\\mathcal{L} = f - \\lambda g$. Setting $\\nabla_{\\mathbf{x}}\\mathcal{L}=\\mathbf{0}$ recovers $\\nabla f = \\lambda\\nabla g$, and $\\partial\\mathcal{L}/\\partial\\lambda = 0$ recovers the constraint $g=0$. (The sign of the $\\lambda$ term is just convention.)"
            },
            {
              "q": "If the Lagrange multiplier $\\lambda = 0$ at a solution, it means:",
              "choices": [
                "$f$ is automatically maximized",
                "there is no solution",
                "the constraint is violated",
                "the constraint is not binding — the unconstrained optimum already satisfies it, so the constraint isn't 'pushing' the solution"
              ],
              "answer": 3,
              "explain": "$\\nabla f = \\lambda\\nabla g$ with $\\lambda=0$ gives $\\nabla f = \\mathbf{0}$ — the point is already a critical point of $f$ ignoring the constraint. The constraint is satisfied but exerts no 'force' on the optimum (its shadow price is zero: relaxing it wouldn't change the optimal value)."
            }
          ],
          "flashcards": [
            {
              "front": "What is the geometric condition at an equality-constrained optimum?",
              "back": "The contour of $f$ is tangent to the constraint curve $g(x)=0$, so their gradients are parallel: $\\nabla f(x)=\\lambda\\nabla g(x)$. If they crossed instead, you could slide along the constraint to improve $f$."
            },
            {
              "front": "Define the Lagrangian and what setting its gradient to zero gives.",
              "back": "$\\mathcal{L}(x,\\lambda)=f(x)-\\lambda g(x)$. $\\nabla_x\\mathcal{L}=0$ gives the tangency condition $\\nabla f=\\lambda\\nabla g$; $\\partial\\mathcal{L}/\\partial\\lambda=0$ gives back the constraint $g(x)=0$ — turning a constrained problem into an unconstrained stationary-point problem in $(x,\\lambda)$."
            },
            {
              "front": "What does the Lagrange multiplier $\\lambda$ mean at the optimum?",
              "back": "The shadow price / sensitivity: for constraint $g(x)=c$, $\\dfrac{df^\\star}{dc}=\\lambda$ — how much the optimal objective improves per unit of loosened constraint. Large $\\lambda$ = binding hard; $\\lambda=0$ = not limiting."
            },
            {
              "front": "State the extra KKT conditions for an inequality constraint $g(x)\\le 0$.",
              "back": "Nonnegative multiplier $\\lambda\\ge0$ and <strong>complementary slackness</strong> $\\lambda\\,g(x)=0$ (the constraint is either active, $g=0$, or its multiplier is zero). Plus stationarity of the Lagrangian and primal feasibility."
            },
            {
              "front": "Give the recipe for optimizing $f$ subject to $g(x)=0$.",
              "back": "Form $\\mathcal{L}=f-\\lambda g$; solve $\\nabla_x\\mathcal{L}=0$ together with $g(x)=0$ for $x,\\lambda$; compare $f$ at the candidate points to pick the max/min."
            },
            {
              "front": "How does regularization relate to constrained optimization?",
              "back": "Ridge/LASSO penalties are equivalent to minimizing the loss subject to a budget on the weights ($\\lVert w\\rVert\\le t$); the penalty strength acts as a Lagrange multiplier. SVMs and max-entropy/softmax are likewise Lagrangian/KKT arguments."
            }
          ],
          "homework": [
            {
              "prompt": "Use Lagrange multipliers to find the minimum of $f(x,y)=x^2+y^2$ subject to $x+2y=5$.",
              "hint": "Set $\\nabla f=\\lambda\\nabla g$ with $g=x+2y-5$, then use the constraint.",
              "solution": "$\\nabla f=(2x,2y)$, $\\nabla g=(1,2)$. Stationarity: $2x=\\lambda$ and $2y=2\\lambda$, so $x=\\lambda/2$ and $y=\\lambda$. Constraint: $x+2y=\\lambda/2+2\\lambda=\\tfrac{5\\lambda}{2}=5\\Rightarrow\\lambda=2$. Then $x=1$, $y=2$, and $f=1^2+2^2=5$. (Geometrically, the closest point on the line to the origin — the gradient of the distance is perpendicular to the line.)"
            },
            {
              "prompt": "Maximize $f(x,y)=2x+3y$ subject to $x^2+y^2=13$. Find the optimum and interpret the multiplier.",
              "hint": "$\\nabla f=\\lambda\\nabla g$ gives $x,y$ proportional to the objective coefficients.",
              "solution": "$\\nabla f=(2,3)$, $\\nabla g=(2x,2y)$. So $2=2\\lambda x$ and $3=2\\lambda y$, giving $x=\\frac{1}{\\lambda}$, $y=\\frac{3}{2\\lambda}$. Constraint: $x^2+y^2=\\frac{1}{\\lambda^2}+\\frac{9}{4\\lambda^2}=\\frac{13}{4\\lambda^2}=13\\Rightarrow \\lambda^2=\\tfrac14\\Rightarrow\\lambda=\\tfrac12$ (take $+$ for the max). Then $x=2$, $y=3$, and $f=2(2)+3(3)=13$. Interpretation: $\\lambda=\\tfrac12$ means increasing the radius² budget from $13$ to $14$ would raise the maximum by about $\\tfrac12$."
            },
            {
              "prompt": "Explain the constrained-optimization view of ridge regression: minimizing $\\lVert Xw-y\\rVert^2 + \\alpha\\lVert w\\rVert^2$ is equivalent to a constrained problem. State the constraint and the role of $\\alpha$.",
              "hint": "Penalty form and constraint form are related by Lagrangian duality.",
              "solution": "The penalized objective $\\lVert Xw-y\\rVert^2+\\alpha\\lVert w\\rVert^2$ is the Lagrangian of the constrained problem \"minimize $\\lVert Xw-y\\rVert^2$ subject to $\\lVert w\\rVert^2\\le t$\" for some budget $t$. Here $\\alpha$ plays the role of the Lagrange multiplier on the weight-norm constraint: a larger $\\alpha$ corresponds to a tighter budget $t$ (more shrinkage), and $\\alpha\\to0$ corresponds to an unconstrained (loose) budget. So the regularization strength is literally the shadow price of the constraint on model complexity — increasing $\\alpha$ trades fit for smaller weights exactly as tightening $t$ would."
            }
          ],
          "examples": [
            {
              "title": "Maximizing area for a fixed perimeter",
              "body": "A farmer has 40 m of fence for a rectangular pen against an existing wall (so only 3 sides need fencing: two widths $w$ and one length $\\ell$). Maximize the enclosed area $A=\\ell w$ subject to $\\ell+2w=40$ using Lagrange multipliers, and interpret the multiplier.",
              "solution": "Lagrangian: $\\mathcal{L}=\\ell w-\\lambda(\\ell+2w-40)$. Stationarity: $\\partial_\\ell\\mathcal{L}=w-\\lambda=0$ and $\\partial_w\\mathcal{L}=\\ell-2\\lambda=0$, so $w=\\lambda$ and $\\ell=2\\lambda$. Constraint: $\\ell+2w=2\\lambda+2\\lambda=4\\lambda=40\\Rightarrow\\lambda=10$. Thus $w=10$, $\\ell=20$, and $A=20\\times10=200\\,\\text{m}^2$.\n\nInterpretation: $\\lambda=10$ is the shadow price of fence — one extra meter of fence would add about $10\\,\\text{m}^2$ of area at the optimum. (Indeed re-solving with 41 m gives $A\\approx210.25$, an increase of $\\approx10.25\\approx\\lambda$.) The structural result — the optimal length equals twice the width — falls straight out of the multiplier conditions."
            },
            {
              "title": "Lagrange multipliers behind the support vector machine",
              "body": "Conceptually explain how Lagrange multipliers / KKT conditions appear in a (hard-margin) SVM, and what the multipliers tell you about the data points.",
              "solution": "A hard-margin SVM minimizes $\\tfrac12\\lVert w\\rVert^2$ subject to the inequality constraints $y_i(w^\\top x_i+b)\\ge1$ for every training point (each point must lie on the correct side of the margin). This is an inequality-constrained convex (quadratic) program, so it is solved via its KKT conditions, attaching a multiplier $\\alpha_i\\ge0$ to each point's constraint.\n\nComplementary slackness, $\\alpha_i\\,[\\,y_i(w^\\top x_i+b)-1\\,]=0$, is the punchline: for points strictly outside the margin the constraint is slack, so $\\alpha_i=0$ — they have <em>no</em> influence on the solution. Only points exactly on the margin can have $\\alpha_i>0$; these are the <strong>support vectors</strong>, and the optimal weight vector is a combination of them alone, $w=\\sum_i \\alpha_i y_i x_i$. So the multipliers literally select which data points define the boundary — the geometric heart of the SVM, delivered by Lagrangian/KKT theory."
            },
            {
              "title": "The multiplier λ is a shadow price",
              "body": "Maximize $f = xy$ subject to $x + y = S$. Beyond solving it, what does the Lagrange multiplier $\\lambda$ actually <em>mean</em>?",
              "solution": "<strong>Solve it.</strong> $\\nabla f = (y, x) = \\lambda(1,1)$ gives $x = y$, and the constraint forces $x = y = \\tfrac{S}{2}$, so the optimal value is $f^* = \\tfrac{S^2}{4}$ and $\\lambda = x = \\tfrac{S}{2}$.\n<strong>λ is the rate the optimum improves as you relax the constraint.</strong> Differentiate the optimal value with respect to the constraint level: $\\dfrac{df^*}{dS} = \\dfrac{d}{dS}\\tfrac{S^2}{4} = \\tfrac{S}{2}$ — exactly $\\lambda$. This is no coincidence (the envelope theorem): the multiplier equals the sensitivity of the best achievable value to loosening the constraint by one unit.\n<strong>Why \"shadow price.\"</strong> If the constraint is a budget, $\\lambda$ is how much more objective you gain per extra dollar — the most you would rationally pay to relax it. At $S = 10$: $\\lambda = 5$, so one more unit of total ($S \\to 11$) buys about $5$ more area.\n<strong>The aha.</strong> The Lagrange multiplier is not just bookkeeping to solve the system — it is a <em>price</em>. It measures how binding the constraint is: a large $\\lambda$ means the constraint costs you a lot, a zero $\\lambda$ means it is not binding at all. That reading drives sensitivity analysis, SVM margins, and regularization strength."
            }
          ]
        },
        {
          "id": "c-duality-kkt",
          "title": "Lagrangian Duality & the KKT Conditions",
          "minutes": 18,
          "content": "<h3>1. The hook: every constrained problem casts a shadow</h3>\n<p>Take a constrained minimization — the <b>primal</b> problem. Hidden inside it is a second optimization, the <b>dual</b>, built from the constraint multipliers. The dual is always a <em>lower bound</em> on the primal, it is always concave (even when the primal is not convex), and for the convex problems at the heart of ML it gives the <em>exact</em> same answer. Duality is how the SVM becomes a kernel method and how \"minimize subject to\" turns into something solvable.</p>\n<h3>2. The Lagrangian, recapped</h3>\n<p>For \"minimize $f(x)$ subject to $g_i(x)\\le 0$ and $h_j(x)=0$\", fold the constraints into one function with multipliers: $$L(x,\\lambda,\\nu)=f(x)+\\sum_i \\lambda_i\\, g_i(x)+\\sum_j \\nu_j\\, h_j(x),\\qquad \\lambda_i\\ge 0.$$ The inequality multipliers $\\lambda_i$ must be nonnegative; the equality multipliers $\\nu_j$ are free.</p>\n<h3>3. The dual function</h3>\n<p>Minimize the Lagrangian over $x$ — with the multipliers held fixed — to get the <b>dual function</b> $$g(\\lambda,\\nu)=\\inf_x L(x,\\lambda,\\nu).$$ Because it is an infimum of functions that are <em>affine</em> in $(\\lambda,\\nu)$, the dual function is always <b>concave</b>, no matter how ugly $f$ and the constraints are. Each feasible $(\\lambda,\\nu)$ with $\\lambda\\ge 0$ hands you a number.</p>\n<h3>4. Weak duality: the dual is a floor</h3>\n<p>For any $\\lambda\\ge 0$, $g(\\lambda,\\nu)\\le p^\\star$, where $p^\\star$ is the primal optimum. The best lower bound is the <b>dual problem</b> $d^\\star=\\max_{\\lambda\\ge 0,\\,\\nu} g(\\lambda,\\nu)$, and <b>weak duality</b> guarantees $d^\\star\\le p^\\star$ always. The shortfall $p^\\star-d^\\star\\ge 0$ is the <b>duality gap</b>.</p>\n<div data-viz=\"calc-duality\"></div>\n<h3>5. Strong duality and Slater's condition</h3>\n<p>When the gap is zero, $d^\\star=p^\\star$ and solving the (often easier, always concave) dual solves the primal. This <b>strong duality</b> holds for convex problems under a mild qualification — <b>Slater's condition</b>: there exists a strictly feasible point (some $x$ with every $g_i(x)\\lt 0$). Most ML formulations satisfy it, which is why duality is so useful in practice.</p>\n<h3>6. The KKT conditions</h3>\n<p>At an optimum of a convex problem with strong duality, $(x^\\star,\\lambda^\\star,\\nu^\\star)$ satisfy the <b>Karush–Kuhn–Tucker</b> conditions: <b>stationarity</b> $\\nabla_x L=0$; <b>primal feasibility</b> $g_i(x^\\star)\\le 0,\\ h_j(x^\\star)=0$; <b>dual feasibility</b> $\\lambda_i^\\star\\ge 0$; and <b>complementary slackness</b> $\\lambda_i^\\star\\, g_i(x^\\star)=0$. The last is the gem: a constraint is either <em>active</em> (tight, $g_i=0$) or its multiplier is zero — the \"support vectors\" of an SVM are exactly the points with active constraints.</p>\n<div data-viz=\"calc-lagrange\"></div>\n<h3>7. A worked dual</h3>\n<p>Minimize $x^2$ subject to $x\\ge 1$. The Lagrangian is $L=x^2+\\lambda(1-x)$; minimizing over $x$ gives $x=\\lambda/2$ and the dual $g(\\lambda)=\\lambda-\\lambda^2/4$. Maximizing over $\\lambda\\ge 0$ gives $\\lambda^\\star=2$, $d^\\star=1$ — equal to the primal optimum $x^\\star=1$, $f=1$. Zero gap, and complementary slackness holds. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"primal x*=1, f=1\ndual lambda*=2, g=1\nduality gap = 0\">// Primal:  minimize x^2  subject to  x >= 1\n// Lagrangian L = x^2 + lambda*(1 - x);  dual g(lambda) = min_x L = lambda - lambda^2/4\nconst g = lam => lam - lam * lam / 4;       // (minimized at x = lambda/2)\nconst lamStar = 2, xStar = lamStar / 2;     // dual optimum: maximize g over lambda >= 0\nconsole.log(\"primal x*=\" + xStar + \", f=\" + (xStar * xStar));\nconsole.log(\"dual lambda*=\" + lamStar + \", g=\" + g(lamStar));\nconsole.log(\"duality gap = \" + (xStar * xStar - g(lamStar)));   // 0 -> strong duality holds</div>\n<h3>8. Why this matters for machine learning</h3>\n<p>The dual is everywhere in ML. The <b>SVM</b> is solved in its dual, where the data appear only as inner products — the opening for the <b>kernel trick</b>. Complementary slackness picks out the <b>support vectors</b>. Regularization is a constraint in disguise (ridge = a norm budget), and Lagrangian relaxation, dual decomposition, and primal–dual methods power large-scale and constrained learning.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the dual is always concave</summary>\n<p>For each fixed $x$, the map $(\\lambda,\\nu)\\mapsto L(x,\\lambda,\\nu)$ is <em>affine</em> (linear plus a constant) in the multipliers. The dual $g(\\lambda,\\nu)=\\inf_x L$ is therefore a pointwise infimum of affine functions, and an infimum of affine functions is always concave. This is why the dual problem is a concave maximization even when the primal is a wild non-convex mess — and why weak duality gives a usable bound for hard combinatorial problems.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: complementary slackness, intuitively</summary>\n<p>Complementary slackness says $\\lambda_i^\\star g_i(x^\\star)=0$ for every inequality. Read it as: if a constraint is <em>slack</em> (strictly satisfied, $g_i\\lt 0$) then its price $\\lambda_i^\\star$ is zero — it is not binding, so loosening it buys nothing. If the price is positive, the constraint must be <em>tight</em> ($g_i=0$). The multiplier is a <b>shadow price</b>: it measures how much the optimum would improve per unit of relaxation of an active constraint.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the SVM dual in one breath</summary>\n<p>The hard-margin SVM minimizes $\\tfrac12\\lVert w\\rVert^2$ subject to $y_i(w^\\top x_i+b)\\ge 1$. Its dual maximizes $\\sum_i \\alpha_i-\\tfrac12\\sum_{i,j}\\alpha_i\\alpha_j y_i y_j\\, x_i^\\top x_j$ over $\\alpha\\ge 0$. The inputs enter <em>only</em> through the inner products $x_i^\\top x_j$ — replace them with a kernel $k(x_i,x_j)$ and you get nonlinear classification for free. By complementary slackness, only points on the margin have $\\alpha_i\\gt 0$: the support vectors.</p>\n</details>",
          "mcq": [
            {
              "q": "The dual function $g(\\lambda,\\nu)=\\inf_x L(x,\\lambda,\\nu)$ is always:",
              "choices": [
                "Concave, regardless of whether the primal is convex",
                "Convex only if the primal is convex",
                "Linear in $x$",
                "Equal to the primal objective"
              ],
              "answer": 0,
              "explain": "An infimum of affine-in-(λ,ν) functions is concave."
            },
            {
              "q": "Weak duality states that:",
              "choices": [
                "$d^\\star\\ge p^\\star$ always",
                "$d^\\star\\le p^\\star$ — the dual optimum lower-bounds the primal optimum",
                "$d^\\star=p^\\star$ always",
                "The duality gap is always zero"
              ],
              "answer": 1,
              "explain": "The dual is always a lower bound; equality is strong duality."
            },
            {
              "q": "Strong duality (zero gap) is guaranteed for a convex problem under:",
              "choices": [
                "A large enough sample",
                "Any condition at all",
                "Slater's condition — a strictly feasible point exists",
                "Nonnegative objective values"
              ],
              "answer": 2,
              "explain": "Slater's constraint qualification closes the gap for convex problems."
            },
            {
              "q": "Complementary slackness says, for each inequality constraint:",
              "choices": [
                "$g_i(x^\\star)\\gt 0$",
                "$\\lambda_i^\\star=g_i(x^\\star)$",
                "$\\lambda_i^\\star\\gt 0$ always",
                "$\\lambda_i^\\star\\, g_i(x^\\star)=0$ — it is active or its multiplier is zero"
              ],
              "answer": 3,
              "explain": "Either the constraint binds (g=0) or its price is zero."
            },
            {
              "q": "In the KKT conditions, dual feasibility requires:",
              "choices": [
                "The inequality multipliers satisfy $\\lambda_i\\ge 0$",
                "The gradient of $f$ is zero",
                "All constraints are equalities",
                "$x$ is strictly feasible"
              ],
              "answer": 0,
              "explain": "Inequality multipliers must be nonnegative."
            },
            {
              "q": "The duality gap is defined as:",
              "choices": [
                "$d^\\star-p^\\star$",
                "$p^\\star-d^\\star\\ge 0$",
                "$f(x)-g(x)$ for any $x$",
                "Always exactly zero"
              ],
              "answer": 1,
              "explain": "Primal optimum minus dual optimum, nonnegative by weak duality."
            },
            {
              "q": "The SVM is solved in its dual primarily because:",
              "choices": [
                "Duality avoids needing labels",
                "The dual has fewer constraints to type",
                "The data enter only as inner products, enabling the kernel trick",
                "The primal has no solution"
              ],
              "answer": 2,
              "explain": "Inner-product-only structure is what kernels exploit."
            },
            {
              "q": "A constraint with multiplier $\\lambda_i^\\star=0$ at the optimum is:",
              "choices": [
                "A support vector",
                "Necessarily violated",
                "The binding constraint",
                "Generically inactive — it does not influence the solution"
              ],
              "answer": 3,
              "explain": "Zero price means no pressure: slack, non-binding."
            },
            {
              "q": "For \"minimize $f(x)$ subject to $g_i(x)\\le 0$\", the Lagrangian is:",
              "choices": [
                "$f(x)+\\sum_i\\lambda_i g_i(x)$ with $\\lambda_i\\ge 0$",
                "$f(x)-\\sum_i\\lambda_i g_i(x)$ with $\\lambda_i$ free",
                "$\\sum_i\\lambda_i g_i(x)$ only",
                "$f(x)\\cdot\\prod_i g_i(x)$"
              ],
              "answer": 0,
              "explain": "Add each constraint times a nonnegative multiplier to the objective."
            },
            {
              "q": "The KKT <b>stationarity</b> condition is:",
              "choices": [
                "$\\lambda^\\star=0$",
                "$\\nabla_x L(x^\\star,\\lambda^\\star)=0$",
                "$g(x^\\star)=0$",
                "$f(x^\\star)=0$"
              ],
              "answer": 1,
              "explain": "The Lagrangian's gradient in x vanishes at the optimum."
            },
            {
              "q": "Slater's condition, which guarantees strong duality for convex problems, requires:",
              "choices": [
                "A bounded objective",
                "A unique optimum",
                "A strictly feasible point (some $x$ with every $g_i(x)\\lt 0$)",
                "Linear constraints only"
              ],
              "answer": 2,
              "explain": "Strict feasibility is the standard constraint qualification."
            },
            {
              "q": "The dual problem is:",
              "choices": [
                "Maximize $f(x)$ over $x$",
                "Minimize $g(\\lambda,\\nu)$ over all $\\lambda$",
                "Minimize $f(x)$ over $x$",
                "Maximize $g(\\lambda,\\nu)$ over $\\lambda\\ge 0$ — a concave maximization"
              ],
              "answer": 3,
              "explain": "Maximize the (concave) dual function subject to nonnegative inequality multipliers."
            },
            {
              "q": "In an SVM, the points with a nonzero dual multiplier $\\alpha_i\\gt 0$ are:",
              "choices": [
                "The support vectors (active-constraint points on the margin)",
                "The misclassified points only",
                "Every training point",
                "The points farthest from the boundary"
              ],
              "answer": 0,
              "explain": "Complementary slackness: nonzero multiplier ⇔ active margin constraint."
            },
            {
              "q": "A practical reason to solve the dual instead of the primal is that the dual is:",
              "choices": [
                "Always linear",
                "Always concave, so its maximization is well-behaved even if the primal is not convex",
                "Always smaller by exactly one variable",
                "Independent of the constraints"
              ],
              "answer": 1,
              "explain": "Concavity of the dual makes it tractable regardless of the primal."
            },
            {
              "q": "The multiplier $\\lambda_i^\\star$ acts as a \"shadow price,\" meaning it measures:",
              "choices": [
                "The value of the objective at zero",
                "The number of constraints",
                "How much the optimum improves per unit relaxation of constraint $i$",
                "The size of the feasible set"
              ],
              "answer": 2,
              "explain": "The multiplier is the sensitivity of the optimum to the constraint bound."
            },
            {
              "q": "For a convex problem satisfying strong duality, the KKT conditions are:",
              "choices": [
                "Irrelevant to optimality",
                "Necessary but never sufficient",
                "Sufficient but never necessary",
                "Necessary and sufficient for optimality"
              ],
              "answer": 3,
              "explain": "Under convexity + strong duality, KKT exactly characterizes the optimum."
            }
          ],
          "flashcards": [
            {
              "front": "The dual function $g(\\lambda,\\nu)$",
              "back": "$g(\\lambda,\\nu)=\\inf_x L(x,\\lambda,\\nu)$ — minimize the Lagrangian over $x$. Always <b>concave</b> (an inf of affine functions)."
            },
            {
              "front": "Weak duality",
              "back": "$d^\\star\\le p^\\star$ always: the dual optimum is a lower bound on the primal optimum. The difference is the <b>duality gap</b>."
            },
            {
              "front": "Strong duality (and when it holds)",
              "back": "$d^\\star=p^\\star$ (zero gap). Holds for convex problems under <b>Slater's condition</b> (a strictly feasible point exists)."
            },
            {
              "front": "The four KKT conditions",
              "back": "Stationarity ($\\nabla_x L=0$), primal feasibility, dual feasibility ($\\lambda\\ge 0$), and complementary slackness ($\\lambda_i g_i(x)=0$)."
            },
            {
              "front": "Complementary slackness",
              "back": "$\\lambda_i^\\star g_i(x^\\star)=0$: each inequality is either active ($g_i=0$) or has zero multiplier. Picks out SVM support vectors."
            },
            {
              "front": "Why is the SVM solved in its dual?",
              "back": "The dual depends on data only through inner products $x_i^\\top x_j$ — enabling the kernel trick; support vectors are the points with $\\alpha_i\\gt 0$."
            }
          ],
          "homework": [
            {
              "prompt": "State weak duality and explain why it holds for <em>any</em> optimization problem, convex or not.",
              "hint": "Think about what $g(\\lambda)$ is an infimum of.",
              "solution": "Weak duality: $d^\\star\\le p^\\star$. For any feasible primal $x$ and any $\\lambda\\ge 0$, $L(x,\\lambda)=f(x)+\\sum_i\\lambda_i g_i(x)\\le f(x)$ (since $\\lambda_i\\ge 0$ and $g_i(x)\\le 0$). Taking $\\inf_x$ on the left gives $g(\\lambda)\\le f(x)$ for every feasible $x$, hence $g(\\lambda)\\le p^\\star$; maximizing over $\\lambda$ gives $d^\\star\\le p^\\star$. Convexity is never used — it only matters for closing the gap."
            },
            {
              "prompt": "For \"minimize $x^2$ subject to $x\\ge 2$\", form the Lagrangian, find the dual function, and the dual optimum.",
              "hint": "Constraint as $2-x\\le 0$.",
              "solution": "$L=x^2+\\lambda(2-x)$. Minimizing over $x$: $x=\\lambda/2$, so $g(\\lambda)=(\\lambda/2)^2+\\lambda(2-\\lambda/2)=2\\lambda-\\lambda^2/4$. Maximize over $\\lambda\\ge 0$: $g'(\\lambda)=2-\\lambda/2=0\\Rightarrow\\lambda^\\star=4$, $d^\\star=2\\cdot4-4=4$. This equals the primal optimum $x^\\star=2$, $f=4$ — zero gap."
            },
            {
              "prompt": "What does complementary slackness tell you about a constraint that is strictly satisfied at the optimum?",
              "hint": "If $g_i(x^\\star)\\lt 0$ then ...?",
              "solution": "If $g_i(x^\\star)\\lt 0$ (the constraint is slack/not binding), then complementary slackness $\\lambda_i^\\star g_i(x^\\star)=0$ forces $\\lambda_i^\\star=0$. The constraint exerts no \"pressure\" on the solution — relaxing it would not change the optimum (its shadow price is zero)."
            }
          ],
          "examples": [
            {
              "title": "Reading the KKT conditions",
              "body": "For $\\min x^2$ s.t. $x\\ge 1$, the optimum is $x^\\star=1$. Verify the KKT conditions hold with $\\lambda^\\star=2$.",
              "solution": "Constraint $g(x)=1-x\\le 0$, $L=x^2+\\lambda(1-x)$. Stationarity: $\\partial_x L=2x-\\lambda=0\\Rightarrow x=\\lambda/2=1$ ✓. Primal feasibility: $1-1=0\\le 0$ ✓. Dual feasibility: $\\lambda=2\\ge 0$ ✓. Complementary slackness: $\\lambda(1-x)=2\\cdot 0=0$ ✓. All four hold, confirming optimality."
            },
            {
              "title": "Active vs inactive constraints",
              "body": "You solve a problem with two inequality constraints and find $\\lambda_1^\\star=3$, $\\lambda_2^\\star=0$. What does each tell you?",
              "solution": "$\\lambda_1^\\star=3\\gt 0$ means constraint 1 is <b>active</b> (binding, $g_1(x^\\star)=0$) and has a positive shadow price — tightening it would cost you. $\\lambda_2^\\star=0$ means constraint 2 is (generically) <b>inactive</b>: it is satisfied with slack and does not influence the optimum. This is complementary slackness in action."
            },
            {
              "title": "Why the kernel trick works",
              "body": "An SVM's dual objective contains the data only as $x_i^\\top x_j$. Why does that enable nonlinear classification?",
              "solution": "Since the inputs appear only through inner products, you can replace $x_i^\\top x_j$ with a kernel $k(x_i,x_j)=\\phi(x_i)^\\top\\phi(x_j)$ for some (possibly infinite-dimensional) feature map $\\phi$ — without ever computing $\\phi$. The dual stays the same size (one $\\alpha_i$ per point), so you get a nonlinear decision boundary at the cost of a linear one. This is only visible <em>in the dual</em>."
            }
          ]
        },
        {
          "id": "c-proximal-projected",
          "title": "Projected & Proximal Gradient: Constraints and Sparsity",
          "minutes": 18,
          "content": "<h3>1. The hook: plain gradient descent ignores walls and kinks</h3>\n<p>Ordinary gradient descent assumes the objective is smooth and the variable is free to roam all of space. Real ML problems break both assumptions: weights must satisfy <b>constraints</b> (stay in a set), and regularizers like the $\\ell_1$ norm have <b>kinks</b> where no gradient exists. Two elegant fixes — <b>projected</b> and <b>proximal</b> gradient descent — extend GD to exactly these cases, and they are what actually trains lasso and many constrained models.</p>\n<div data-viz=\"calc-gd2d\"></div>\n<h3>2. Projected gradient descent</h3>\n<p>To minimize $f(x)$ subject to $x\\in C$ (a feasible set), take a normal gradient step and then <b>project back</b> onto $C$: $$x_{k+1}=\\Pi_C\\!\\big(x_k-\\eta\\,\\nabla f(x_k)\\big),\\qquad \\Pi_C(y)=\\arg\\min_{z\\in C}\\lVert z-y\\rVert.$$ The projection $\\Pi_C$ snaps an infeasible point to the nearest feasible one. Step, then snap — repeat. For convex $C$ it converges just like GD.</p>\n<h3>3. Projections you can compute</h3>\n<p>Projection is cheap for the sets ML cares about. Onto a <b>box</b> $[a,b]$: clip each coordinate. Onto the <b>ball</b> $\\lVert x\\rVert\\le r$: rescale if too long. Onto the <b>probability simplex</b> (nonnegative, sums to one): a sort-and-shift. Nonnegativity constraints — common in NMF and many models — are just a clip at zero.</p>\n<h3>4. Non-smooth objectives and subgradients</h3>\n<p>The $\\ell_1$ penalty $\\lambda\\lVert x\\rVert_1$ is convex but not differentiable at $0$ (a kink). The fix is the <b>subgradient</b>: any slope that stays below the function. At a kink there is a whole interval of valid subgradients — for $|x|$ at $0$, every slope in $[-1,1]$. Subgradients let convex optimization proceed through corners.</p>\n<h3>5. The proximal operator</h3>\n<p>The <b>proximal operator</b> generalizes projection to any convex function $h$: $$\\mathrm{prox}_{\\lambda h}(y)=\\arg\\min_x\\Big(h(x)+\\tfrac{1}{2\\lambda}\\lVert x-y\\rVert^2\\Big).$$ It takes a step toward minimizing $h$ while staying near $y$. When $h$ is the indicator of a set $C$ (zero inside, $+\\infty$ outside), the prox <em>is</em> the projection $\\Pi_C$ — so projection is just a special case.</p>\n<h3>6. Proximal gradient descent (ISTA)</h3>\n<p>Split the objective into a smooth part $f$ and a non-smooth part $h$: minimize $f(x)+h(x)$. <b>Proximal gradient</b> alternates a gradient step on $f$ with a prox step on $h$: $$x_{k+1}=\\mathrm{prox}_{\\eta h}\\!\\big(x_k-\\eta\\,\\nabla f(x_k)\\big).$$ For lasso ($f$ = least squares, $h=\\lambda\\lVert x\\rVert_1$) this is <b>ISTA</b>, and the prox step is the famous soft-thresholding operator.</p>\n<h3>7. Soft-thresholding = the prox of the $\\ell_1$ norm</h3>\n<p>The prox of $\\lambda|x|$ is <b>soft-thresholding</b> $S_\\lambda(x)=\\mathrm{sign}(x)\\max(|x|-\\lambda,0)$: shrink every coordinate toward zero by $\\lambda$, and set to <em>exactly</em> zero anything smaller than $\\lambda$. That hard zeroing is why lasso produces <b>sparse</b> models. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"before: 2.5, -0.4, 0.9, -1.8, 0.2\nafter:  1.5, 0, 0, -0.8, 0\nzeros:  3 of 5\">// Soft-thresholding = proximal operator of the L1 penalty (lambda * |x|)\nconst soft = (x, lam) => Math.sign(x) * Math.max(Math.abs(x) - lam, 0);\nconst w = [2.5, -0.4, 0.9, -1.8, 0.2];   // a weight vector\nconst lam = 1.0;                          // regularization strength\nconst sparse = w.map(x => soft(x, lam));\nconsole.log(\"before: \" + w.join(\", \"));\nconsole.log(\"after:  \" + sparse.join(\", \"));\nconsole.log(\"zeros:  \" + sparse.filter(x => x === 0).length + \" of \" + w.length);\n// Coefficients smaller than lambda are driven to EXACTLY zero -> lasso sparsity.</div>\n<h3>8. Why this matters for machine learning</h3>\n<p>Proximal and projected methods are everywhere \"plain GD\" is not enough: <b>lasso</b> and sparse models (soft-thresholding), <b>nonnegativity</b> and simplex constraints (projection), and large-scale constrained learning via <b>ADMM</b> and operator splitting. They keep the cheap, scalable gradient step while handling the constraint or the kink with one extra, closed-form operation.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: projection as the prox of an indicator</summary>\n<p>Define the indicator $\\iota_C(x)=0$ if $x\\in C$ and $+\\infty$ otherwise. Then $\\mathrm{prox}_{\\lambda\\iota_C}(y)=\\arg\\min_x\\big(\\iota_C(x)+\\tfrac{1}{2\\lambda}\\lVert x-y\\rVert^2\\big)=\\arg\\min_{x\\in C}\\lVert x-y\\rVert=\\Pi_C(y)$, independent of $\\lambda$. So projected gradient descent is exactly proximal gradient descent with $h=\\iota_C$ — one framework covers both constraints and regularizers.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why soft-thresholding zeroes coefficients</summary>\n<p>Minimizing $\\lambda|x|+\\tfrac{1}{2}(x-y)^2$ coordinate-wise: for $x\\gt 0$ the derivative is $\\lambda+x-y=0\\Rightarrow x=y-\\lambda$ (valid only if $y\\gt\\lambda$); symmetrically $x=y+\\lambda$ when $y\\lt-\\lambda$; and if $|y|\\le\\lambda$ the kink's subgradient interval contains $0$, so $x=0$. That dead zone $[-\\lambda,\\lambda]\\to 0$ is the source of sparsity — unlike ridge's $\\ell_2$ prox $x=y/(1+\\lambda)$, which only shrinks and never zeroes.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: convergence and FISTA</summary>\n<p>For convex $f$ with an $L$-Lipschitz gradient and any convex $h$, proximal gradient (ISTA) with step $\\eta\\le 1/L$ converges at rate $O(1/k)$ — the same as smooth GD, despite the non-smooth $h$. Nesterov's accelerated version, <b>FISTA</b>, adds a momentum-like extrapolation and improves this to $O(1/k^2)$, which is why it is the default solver for lasso-type problems.</p>\n</details>",
          "mcq": [
            {
              "q": "Projected gradient descent handles a constraint $x\\in C$ by:",
              "choices": [
                "Taking a gradient step, then projecting back onto $C$",
                "Adding $C$ to the objective",
                "Ignoring infeasible steps",
                "Increasing the learning rate"
              ],
              "answer": 0,
              "explain": "Step then snap to the nearest feasible point."
            },
            {
              "q": "The projection $\\Pi_C(y)$ returns:",
              "choices": [
                "The center of $C$",
                "The point of $C$ nearest to $y$",
                "The farthest point of $C$ from $y$",
                "The gradient at $y$"
              ],
              "answer": 1,
              "explain": "Projection minimizes distance to the feasible set."
            },
            {
              "q": "The proximal operator $\\mathrm{prox}_{\\lambda h}(y)$ minimizes:",
              "choices": [
                "only $h(x)$",
                "$h(x)\\cdot\\lVert x-y\\rVert$",
                "$h(x)+\\tfrac{1}{2\\lambda}\\lVert x-y\\rVert^2$",
                "only $\\lVert x-y\\rVert^2$"
              ],
              "answer": 2,
              "explain": "Trade off reducing h against staying near y."
            },
            {
              "q": "Soft-thresholding $S_\\lambda(x)=\\mathrm{sign}(x)\\max(|x|-\\lambda,0)$ is the proximal operator of:",
              "choices": [
                "The objective's gradient",
                "The $\\ell_2$ penalty",
                "A box constraint",
                "The $\\ell_1$ penalty $\\lambda|x|$"
              ],
              "answer": 3,
              "explain": "L1 prox = soft-thresholding, the lasso step."
            },
            {
              "q": "Lasso produces sparse solutions because soft-thresholding:",
              "choices": [
                "Sets coordinates smaller than $\\lambda$ exactly to zero",
                "Doubles small coordinates",
                "Never changes any coordinate",
                "Only rescales by a constant"
              ],
              "answer": 0,
              "explain": "The dead zone |y|<=λ maps to exactly 0."
            },
            {
              "q": "A subgradient of a convex function at a kink is:",
              "choices": [
                "The unique derivative",
                "Any slope of a line lying below the function there",
                "Always zero",
                "The function's value"
              ],
              "answer": 1,
              "explain": "At a kink an interval of supporting slopes exists."
            },
            {
              "q": "Projection is a special case of the proximal operator when $h$ is:",
              "choices": [
                "A smooth quadratic",
                "The $\\ell_1$ norm",
                "The indicator of the feasible set $C$",
                "The gradient of $f$"
              ],
              "answer": 2,
              "explain": "prox of the set indicator = projection onto the set."
            },
            {
              "q": "Proximal gradient descent (ISTA) is used when the objective is:",
              "choices": [
                "Constant",
                "Purely smooth everywhere",
                "Non-convex and discrete",
                "A smooth part plus a non-smooth convex part"
              ],
              "answer": 3,
              "explain": "Split f (smooth) + h (non-smooth): grad step then prox step."
            },
            {
              "q": "Projection onto a box $[a,b]$ (per coordinate) is computed by:",
              "choices": [
                "Clipping each coordinate to the range $[a,b]$",
                "Normalizing the vector to unit length",
                "Sorting the coordinates",
                "Setting every coordinate to $a$"
              ],
              "answer": 0,
              "explain": "Box projection clamps each entry into [a,b]."
            },
            {
              "q": "Projection onto the nonnegative orthant ($x\\ge 0$) is:",
              "choices": [
                "$|x|$",
                "$\\max(x,0)$ coordinate-wise",
                "$-x$",
                "$x/\\lVert x\\rVert$"
              ],
              "answer": 1,
              "explain": "Clip negatives to zero."
            },
            {
              "q": "Proximal gradient descent (ISTA) on a convex problem converges at the rate:",
              "choices": [
                "$O(1/\\sqrt{k})$",
                "$O(1/k^2)$ always",
                "$O(1/k)$, the same as smooth gradient descent",
                "It does not converge"
              ],
              "answer": 2,
              "explain": "ISTA matches smooth GD; FISTA accelerates to O(1/k^2)."
            },
            {
              "q": "The proximal operator of the $\\ell_2$ (ridge) penalty $\\tfrac{\\lambda}{2}x^2$ is:",
              "choices": [
                "$y$ unchanged",
                "$\\mathrm{sign}(y)\\max(|y|-\\lambda,0)$",
                "$\\max(y,0)$",
                "$y/(1+\\lambda)$ — it shrinks but never zeroes"
              ],
              "answer": 3,
              "explain": "Ridge prox scales y down; it never produces exact zeros."
            },
            {
              "q": "In proximal gradient descent for $f+h$, the proximal step is applied to:",
              "choices": [
                "The non-smooth part $h$, after a gradient step on the smooth part $f$",
                "The smooth part $f$",
                "Both parts simultaneously",
                "Neither part"
              ],
              "answer": 0,
              "explain": "Gradient on f, prox on h."
            },
            {
              "q": "The set of subgradients of $|x|$ at $x=0$ is:",
              "choices": [
                "Just $\\{0\\}$",
                "The interval $[-1,1]$",
                "The single value $1$",
                "Empty"
              ],
              "answer": 1,
              "explain": "Any slope in [-1,1] stays below |x| at the kink."
            },
            {
              "q": "FISTA improves on ISTA by adding:",
              "choices": [
                "Random restarts",
                "A second gradient evaluation per step",
                "A momentum-like extrapolation (Nesterov acceleration) → $O(1/k^2)$",
                "A larger regularization term"
              ],
              "answer": 2,
              "explain": "Accelerated proximal gradient via extrapolation."
            },
            {
              "q": "Beyond zeroing small coefficients, soft-thresholding also:",
              "choices": [
                "Makes all coefficients equal",
                "Doubles the surviving coefficients",
                "Leaves surviving coefficients unchanged",
                "Shrinks the surviving coefficients toward zero by $\\lambda$"
              ],
              "answer": 3,
              "explain": "Survivors are shifted toward 0 by lambda (a bias lasso introduces)."
            }
          ],
          "flashcards": [
            {
              "front": "Projected gradient descent",
              "back": "$x_{k+1}=\\Pi_C(x_k-\\eta\\nabla f(x_k))$ — take a gradient step, then project back onto the feasible set $C$."
            },
            {
              "front": "The projection operator $\\Pi_C(y)$",
              "back": "$\\arg\\min_{z\\in C}\\lVert z-y\\rVert$ — the nearest feasible point to $y$. Cheap for boxes, balls, and the simplex."
            },
            {
              "front": "The proximal operator $\\mathrm{prox}_{\\lambda h}(y)$",
              "back": "$\\arg\\min_x\\big(h(x)+\\tfrac{1}{2\\lambda}\\lVert x-y\\rVert^2\\big)$ — minimize $h$ while staying near $y$. Generalizes projection."
            },
            {
              "front": "Proximal gradient (ISTA)",
              "back": "For $f+h$ ($f$ smooth, $h$ non-smooth): $x_{k+1}=\\mathrm{prox}_{\\eta h}(x_k-\\eta\\nabla f(x_k))$ — gradient step on $f$, prox step on $h$."
            },
            {
              "front": "Soft-thresholding $S_\\lambda(x)$",
              "back": "$\\mathrm{sign}(x)\\max(|x|-\\lambda,0)$ — the prox of $\\lambda|x|$. Shrinks toward $0$ and zeroes anything below $\\lambda$ → lasso sparsity."
            },
            {
              "front": "A subgradient",
              "back": "Any slope of a line that stays below a convex function. At a kink (e.g. $|x|$ at $0$) there is an interval of them ($[-1,1]$)."
            }
          ],
          "homework": [
            {
              "prompt": "Write the projected-gradient update for minimizing $f(x)$ subject to $x\\ge 0$ (nonnegativity), and state what the projection does.",
              "hint": "Projection onto the nonnegative orthant.",
              "solution": "$x_{k+1}=\\Pi_{\\ge 0}(x_k-\\eta\\nabla f(x_k))$, where $\\Pi_{\\ge 0}(y)=\\max(y,0)$ coordinate-wise — clip every negative entry to $0$. So: take a gradient step, then zero out any coordinate that went negative."
            },
            {
              "prompt": "Apply soft-thresholding with $\\lambda=0.5$ to the vector $(1.2,\\,-0.3,\\,0.5)$.",
              "hint": "$S_\\lambda(x)=\\mathrm{sign}(x)\\max(|x|-\\lambda,0)$.",
              "solution": "$S_{0.5}(1.2)=1.2-0.5=0.7$; $S_{0.5}(-0.3)=-\\max(0.3-0.5,0)=0$; $S_{0.5}(0.5)=\\max(0.5-0.5,0)=0$. Result: $(0.7,\\,0,\\,0)$ — two coordinates zeroed."
            },
            {
              "prompt": "Why does the $\\ell_1$ proximal step produce exact zeros while an $\\ell_2$ (ridge) step does not?",
              "hint": "Compare $S_\\lambda$ to $y/(1+\\lambda)$.",
              "solution": "The $\\ell_1$ prox is soft-thresholding, which maps the whole interval $|y|\\le\\lambda$ to exactly $0$ (a dead zone created by the kink's subgradient). The $\\ell_2$ prox is $x=y/(1+\\lambda)$, which merely scales $y$ down — it approaches $0$ only as $y\\to 0$ and never sets a nonzero coordinate exactly to zero. Hence lasso is sparse and ridge is not."
            }
          ],
          "examples": [
            {
              "title": "Projecting onto a box",
              "body": "A gradient step lands at $x=(1.4,\\,-0.2,\\,0.6)$ but each weight must lie in $[0,1]$. Where does projection put it?",
              "solution": "Clip coordinate-wise to $[0,1]$: $1.4\\to 1$, $-0.2\\to 0$, $0.6\\to 0.6$. Projected point $(1,\\,0,\\,0.6)$. Box projection is just per-coordinate clipping."
            },
            {
              "title": "One ISTA step for lasso",
              "body": "With smooth part gradient giving $x-\\eta\\nabla f=(0.9,\\,0.2,\\,-1.1)$ and $\\eta\\lambda=0.3$, what is the next iterate?",
              "solution": "Apply soft-thresholding $S_{0.3}$: $0.9\\to 0.6$, $0.2\\to 0$ (since $0.2\\lt 0.3$), $-1.1\\to -0.8$. Next iterate $(0.6,\\,0,\\,-0.8)$ — the small coordinate was eliminated, the others shrunk by $0.3$."
            },
            {
              "title": "Constraint or regularizer?",
              "body": "You want weights that are nonnegative AND sparse. Which operator(s) handle each?",
              "solution": "Nonnegativity is a <em>constraint</em> $x\\ge 0$ → handled by projection $\\max(x,0)$. Sparsity comes from an $\\ell_1$ <em>regularizer</em> → handled by the proximal soft-threshold. Because projection is a prox, you can combine them (e.g. nonnegative soft-thresholding $\\max(x-\\lambda,0)$) in one proximal-gradient method."
            }
          ]
        }
      ]
    }
  ]
}
);
