/* Atlas course — Linear Algebra
   Generated & adversarially fact-checked + inline visualizations, worked examples & an expanded question bank. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "linear-algebra",
  "title": "Linear Algebra",
  "icon": "∑",
  "color": "#e0a458",
  "blurb": "Vectors, matrices, and the geometry of linear maps — the language underneath all of ML.",
  "modules": [
    {
      "id": "la-foundations",
      "title": "Vectors, Spaces, and Geometry",
      "lessons": [
        {
          "id": "la-vectors-operations",
          "title": "Vectors and Vector Operations",
          "minutes": 14,
          "content": "<h3>Two faces of the same object</h3>\n<p>A <strong>vector</strong> is one idea wearing two costumes. In geometry it is an <strong>arrow</strong>: a quantity with both a <em>magnitude</em> (length) and a <em>direction</em>. In algebra it is an <strong>ordered tuple</strong> of numbers: a list like $(3, -2, 5)$ where position matters. The central insight of linear algebra — and the reason it powers nearly all of machine learning — is that these two pictures are perfectly interchangeable. Every geometric statement about arrows has an exact algebraic counterpart in coordinates, and vice versa.</p>\n\n<p>Formally, the set of all $n$-tuples of real numbers is called <strong>$\\mathbb{R}^n$</strong> (read \"R-n\"):</p>\n$$\\mathbb{R}^n = \\{ (x_1, x_2, \\dots, x_n) : x_i \\in \\mathbb{R} \\}.$$\n<p>An element $\\mathbf{v} = (v_1, \\dots, v_n)$ is a vector; the individual numbers $v_i$ are its <strong>components</strong> (or coordinates). We write vectors in bold ($\\mathbf{v}$) or with an arrow ($\\vec{v}$), and we usually treat them as <strong>column vectors</strong>:</p>\n$$\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix}.$$\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>In machine learning, almost everything is a vector in some $\\mathbb{R}^n$. A grayscale image is a vector of pixel intensities; a word embedding is a vector of a few hundred learned numbers; a single training example with $n$ features is a point in $\\mathbb{R}^n$. Understanding vectors geometrically is what lets you reason about \"similarity,\" \"direction,\" and \"distance\" between data points — concepts that look abstract in numbers but are intuitive as arrows.</p>\n</div>\n\n<h3>Arrows vs. points, and why \"position-free\" matters</h3>\n<p>Here is a subtlety worth getting right early. A geometric vector encodes <em>displacement</em>, not location. The arrow from $(1,1)$ to $(4,3)$ and the arrow from $(0,0)$ to $(3,2)$ are the <strong>same vector</strong> $(3,2)$ — both say \"move 3 right, 2 up.\" A vector is free to slide around the plane as long as its length and direction are preserved.</p>\n<p>By convention we draw most vectors in <strong>standard position</strong>, with their tail at the origin. Then the arrow's tip lands exactly at the point whose coordinates equal the vector's components. This is the bridge between the two costumes: the tuple $(3,2)$ <em>is</em> the tip of the arrow, when the tail sits at the origin.</p>\n\n<h3>Vector addition: tip-to-tail</h3>\n<p>To add two vectors algebraically, add them <strong>component-wise</strong>:</p>\n$$\\mathbf{u} + \\mathbf{v} = \\begin{bmatrix} u_1 \\\\ \\vdots \\\\ u_n \\end{bmatrix} + \\begin{bmatrix} v_1 \\\\ \\vdots \\\\ v_n \\end{bmatrix} = \\begin{bmatrix} u_1 + v_1 \\\\ \\vdots \\\\ u_n + v_n \\end{bmatrix}.$$\n<p>You can only add vectors of the same dimension — adding a vector in $\\mathbb{R}^2$ to one in $\\mathbb{R}^3$ is undefined.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Geometrically, addition is <strong>tip-to-tail</strong>: draw $\\mathbf{u}$, then start $\\mathbf{v}$ at the tip of $\\mathbf{u}$; the sum $\\mathbf{u}+\\mathbf{v}$ is the arrow from the original tail to the final tip. Because order doesn't change the answer, $\\mathbf{u}+\\mathbf{v}$ and $\\mathbf{v}+\\mathbf{u}$ trace the two different side-paths of the same parallelogram and arrive at the same point — that shared arrow is one diagonal of the parallelogram. This is the <strong>parallelogram rule</strong>. (The other diagonal, by the way, is $\\mathbf{u}-\\mathbf{v}$.)</p>\n</div>\n\n<p>For example, with $\\mathbf{u} = (2,1)$ and $\\mathbf{v} = (1,3)$:</p>\n$$\\mathbf{u} + \\mathbf{v} = (2+1,\\; 1+3) = (3, 4).$$\n<p>Walking 2-right-1-up and then 1-right-3-up lands you at the same spot as walking straight to $(3,4)$.</p>\n\n<h3>Scalar multiplication: scaling</h3>\n<p>A <strong>scalar</strong> is just a real number $\\lambda$ (the word distinguishes it from a vector). Multiplying a vector by a scalar scales every component:</p>\n$$\\lambda \\mathbf{v} = \\lambda \\begin{bmatrix} v_1 \\\\ \\vdots \\\\ v_n \\end{bmatrix} = \\begin{bmatrix} \\lambda v_1 \\\\ \\vdots \\\\ \\lambda v_n \\end{bmatrix}.$$\n<p>Geometrically, $\\lambda \\mathbf{v}$ <strong>stretches or shrinks</strong> the arrow:</p>\n<ul>\n<li>$\\lambda > 1$ lengthens it; $0 < \\lambda < 1$ shortens it; same direction either way.</li>\n<li>$\\lambda < 0$ flips it to point the opposite way (and scales its length by $|\\lambda|$).</li>\n<li>$\\lambda = 0$ collapses it to the zero vector.</li>\n</ul>\n<p>Example: $3 \\cdot (1,-2) = (3,-6)$, and $-\\tfrac{1}{2}\\cdot(4,2) = (-2,-1)$.</p>\n\n<h3>The zero vector and the negative of a vector</h3>\n<p>The <strong>zero vector</strong> $\\mathbf{0} = (0,0,\\dots,0)$ is the additive identity: $\\mathbf{v} + \\mathbf{0} = \\mathbf{v}$ for every $\\mathbf{v}$. Geometrically it is the \"arrow\" of zero length — a point with no direction. (Note: $\\mathbf{0}$ the vector is different from $0$ the scalar, even though we often write both as 0.)</p>\n<p>The <strong>negative</strong> of $\\mathbf{v}$ is $-\\mathbf{v} = (-1)\\mathbf{v}$, the same arrow pointing backwards. It satisfies $\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}$. Subtraction is then defined as adding the negative:</p>\n$$\\mathbf{u} - \\mathbf{v} = \\mathbf{u} + (-\\mathbf{v}) = (u_1 - v_1,\\; \\dots,\\; u_n - v_n).$$\n<p>A useful geometric reading: $\\mathbf{u} - \\mathbf{v}$ is the arrow <strong>from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$</strong> (when both start at the origin). This is exactly why displacement-between-points problems reduce to subtraction.</p>\n\n<h3>Linear combinations: the workhorse operation</h3>\n<p>Combining the two operations gives the single most important construction in linear algebra. A <strong>linear combination</strong> of vectors $\\mathbf{v}_1, \\dots, \\mathbf{v}_k$ is any vector of the form</p>\n$$c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\cdots + c_k \\mathbf{v}_k, \\qquad c_i \\in \\mathbb{R}.$$\n<p>Every vector in $\\mathbb{R}^n$ is a linear combination of the <strong>standard basis vectors</strong> $\\mathbf{e}_1=(1,0,\\dots), \\mathbf{e}_2=(0,1,0,\\dots), \\dots$ For instance $(3,4) = 3\\mathbf{e}_1 + 4\\mathbf{e}_2$. The components <em>are</em> the coefficients. Linear combinations are exactly what a single layer of a neural network computes: a weighted sum of input vectors plus a bias.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>These rules — component-wise addition and scalar multiplication, with a zero and negatives — are precisely the axioms of a <strong>vector space</strong>. $\\mathbb{R}^n$ is the prototype, but the same eight axioms hold for polynomials, continuous functions, and matrices. Once you internalize them here, you get geometry \"for free\" in spaces you can't visualize — which is the whole game in high-dimensional ML, where data lives in $\\mathbb{R}^{784}$ or $\\mathbb{R}^{1536}$ and intuition must come from the algebra.</p>\n</div>\n\n<h3>When are two vectors parallel?</h3>\n<p>Two nonzero vectors $\\mathbf{u}$ and $\\mathbf{v}$ are <strong>parallel</strong> (also called <em>collinear</em>) exactly when one is a scalar multiple of the other:</p>\n$$\\mathbf{u} \\parallel \\mathbf{v} \\iff \\mathbf{u} = \\lambda \\mathbf{v} \\text{ for some scalar } \\lambda \\neq 0.$$\n<p>If $\\lambda > 0$ they point the same way; if $\\lambda < 0$ they point in opposite directions (sometimes called <em>anti-parallel</em>). A quick component test in $\\mathbb{R}^2$: $\\mathbf{u}=(u_1,u_2)$ and $\\mathbf{v}=(v_1,v_2)$ are parallel iff their components are proportional, $u_1 v_2 - u_2 v_1 = 0$ (the cross-multiplication / \"cross-product\" check). For example $(2,3)$ and $(4,6)$ are parallel since $4 = 2\\cdot 2$ and $6 = 2 \\cdot 3$ (and indeed $2\\cdot 6 - 3 \\cdot 4 = 0$), while $(2,3)$ and $(4,5)$ are not, since $2\\cdot 5 - 3 \\cdot 4 = -2 \\neq 0$.</p>\n\n<h3>Worked example</h3>\n<p>Let $\\mathbf{a} = (1, 2)$ and $\\mathbf{b} = (3, -1)$. Compute and interpret the linear combination $\\mathbf{w} = 2\\mathbf{a} - \\mathbf{b}$, then decide whether $\\mathbf{w}$ is parallel to $\\mathbf{a}$.</p>\n<p><strong>Step 1 — scale.</strong> First scale each vector:</p>\n$$2\\mathbf{a} = 2(1,2) = (2, 4), \\qquad -\\mathbf{b} = (-1)(3,-1) = (-3, 1).$$\n<p><strong>Step 2 — add component-wise.</strong></p>\n$$\\mathbf{w} = 2\\mathbf{a} - \\mathbf{b} = (2 + (-3),\\; 4 + 1) = (-1, 5).$$\n<p><strong>Step 3 — interpret geometrically.</strong> Starting at the origin, double the arrow $\\mathbf{a}$ to reach $(2,4)$, then walk backwards along $\\mathbf{b}$ (the arrow $-\\mathbf{b}=(-3,1)$) to land at $(-1,5)$.</p>\n<p><strong>Step 4 — parallel check.</strong> Is $\\mathbf{w} = (-1,5)$ a scalar multiple of $\\mathbf{a}=(1,2)$? We'd need $-1 = \\lambda \\cdot 1$, giving $\\lambda = -1$; but then the second component would have to be $\\lambda \\cdot 2 = -2 \\neq 5$. No single $\\lambda$ works, so <strong>$\\mathbf{w}$ is not parallel to $\\mathbf{a}$</strong>. (Cross-check: $(-1)(2) - (5)(1) = -7 \\neq 0$.)</p>\n\n<h3>The algebraic laws (and why they're trustworthy)</h3>\n<p>Because the operations act component-wise on ordinary real numbers, all the familiar arithmetic laws carry over. For any vectors $\\mathbf{u},\\mathbf{v},\\mathbf{w}$ and scalars $\\lambda,\\mu$:</p>\n<ul>\n<li><strong>Commutativity:</strong> $\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$</li>\n<li><strong>Associativity:</strong> $(\\mathbf{u}+\\mathbf{v})+\\mathbf{w} = \\mathbf{u}+(\\mathbf{v}+\\mathbf{w})$</li>\n<li><strong>Distributivity over vector sums:</strong> $\\lambda(\\mathbf{u}+\\mathbf{v}) = \\lambda\\mathbf{u} + \\lambda\\mathbf{v}$</li>\n<li><strong>Distributivity over scalar sums:</strong> $(\\lambda+\\mu)\\mathbf{v} = \\lambda\\mathbf{v} + \\mu\\mathbf{v}$</li>\n<li><strong>Identities:</strong> $\\mathbf{v} + \\mathbf{0} = \\mathbf{v}$ and $1\\cdot\\mathbf{v} = \\mathbf{v}$</li>\n</ul>\n<p>These are not arbitrary rules to memorize — they are inherited directly from the arithmetic of real numbers, one coordinate at a time. That inheritance is exactly why the geometric arrow-picture and the algebraic tuple-picture never disagree.</p>\n\n<h3>Takeaways</h3>\n<ul>\n<li>A vector in $\\mathbb{R}^n$ is simultaneously an arrow (magnitude + direction) and an ordered tuple of components.</li>\n<li>Addition is component-wise = tip-to-tail = the parallelogram rule.</li>\n<li>Scalar multiplication scales length; a negative scalar also reverses direction.</li>\n<li>$\\mathbf{0}$ is the additive identity; $-\\mathbf{v}$ undoes $\\mathbf{v}$; subtraction points tip-to-tip.</li>\n<li>A linear combination $c_1\\mathbf{v}_1+\\cdots+c_k\\mathbf{v}_k$ is the fundamental operation; two vectors are parallel iff one is a scalar multiple of the other.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-vector-add\"></div>",
          "mcq": [
            {
              "q": "Given $\\mathbf{u} = (3, -1)$ and $\\mathbf{v} = (-2, 4)$, what is $2\\mathbf{u} + \\mathbf{v}$?",
              "choices": [
                "$(4, 2)$",
                "$(1, 3)$",
                "$(4, -6)$",
                "$(8, -4)$"
              ],
              "answer": 0,
              "explain": "Scale first: $2\\mathbf{u} = (6,-2)$. Then add component-wise: $(6 + (-2),\\, -2 + 4) = (4, 2)$."
            },
            {
              "q": "Which pair of vectors is parallel?",
              "choices": [
                "$(1, 2)$ and $(2, 1)$",
                "$(2, -3)$ and $(-6, 9)$",
                "$(1, 0)$ and $(0, 1)$",
                "$(3, 4)$ and $(4, 3)$"
              ],
              "answer": 1,
              "explain": "$(-6, 9) = -3 \\cdot (2, -3)$, so one is a scalar multiple of the other (here pointing the opposite way). The others fail the proportionality test $u_1 v_2 - u_2 v_1 = 0$: $(1,2),(2,1)$ give $1-4=-3$; $(1,0),(0,1)$ give $1$; $(3,4),(4,3)$ give $9-16=-7$."
            },
            {
              "q": "A vector is described as 'the same idea in two costumes.' Which statement about the arrow-vs-tuple correspondence is correct?",
              "choices": [
                "The arrow from $(1,1)$ to $(4,3)$ and the arrow from $(0,0)$ to $(3,2)$ are different vectors because they sit in different places",
                "A vector's components equal its tip's coordinates only when its tail is at the origin (standard position)",
                "Two arrows of equal length are always the same vector",
                "Adding a vector in $\\mathbb{R}^2$ to one in $\\mathbb{R}^3$ gives a vector in $\\mathbb{R}^5$"
              ],
              "answer": 1,
              "explain": "Vectors are position-free displacements; the tuple equals the tip's coordinates precisely in standard position. Equal length alone isn't enough (direction matters), and you can't add vectors of different dimensions."
            },
            {
              "q": "What is $\\mathbf{u} - \\mathbf{v}$ for $\\mathbf{u} = (5, 1)$ and $\\mathbf{v} = (2, 4)$, and what does it represent geometrically?",
              "choices": [
                "$(7, 5)$; the diagonal of the parallelogram",
                "$(3, -3)$; the arrow from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$",
                "$(3, -3)$; the arrow from the tip of $\\mathbf{u}$ to the tip of $\\mathbf{v}$",
                "$(-3, 3)$; the arrow from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$"
              ],
              "answer": 1,
              "explain": "$\\mathbf{u} - \\mathbf{v} = (5-2,\\, 1-4) = (3,-3)$. Geometrically it is the displacement from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$ (both in standard position)."
            },
            {
              "q": "An arrow goes from the point $(2, 5)$ to the point $(6, 1)$. Drawn in standard position (tail at the origin), where does its tip land?",
              "choices": [
                "$(8, 6)$",
                "$(4, -4)$",
                "$(6, 1)$",
                "$(-4, 4)$"
              ],
              "answer": 1,
              "explain": "A geometric vector encodes displacement, so the vector is (tip - tail) = (6-2, 1-5) = (4, -4), and in standard position its tip lands at those coordinates."
            },
            {
              "q": "Why is the expression $(1, 2) + (1, 2, 3)$ undefined?",
              "choices": [
                "Because vectors can only be added when they have the same number of components (same dimension)",
                "Because the components are not all positive",
                "Because one vector must be a scalar multiple of the other to add them",
                "Because addition is only defined for vectors written as rows, not columns"
              ],
              "answer": 0,
              "explain": "Component-wise addition pairs up entries by position, so it only makes sense between vectors of the same dimension."
            },
            {
              "q": "Let $\\mathbf{v} = (2, -3)$. Which statement about $-2\\mathbf{v}$ is correct?",
              "choices": [
                "It equals $(-4, 6)$ and points in the opposite direction to $\\mathbf{v}$, twice as long",
                "It equals $(-4, 6)$ and points the same direction as $\\mathbf{v}$, twice as long",
                "It equals $(0, -5)$ because you subtract 2 from each component",
                "It equals $(-4, -6)$ and has the same length as $\\mathbf{v}$"
              ],
              "answer": 0,
              "explain": "Scalar multiplication scales every component (giving (-4, 6), twice the length), and a negative scalar also reverses the direction."
            },
            {
              "q": "Geometrically, the difference $\\mathbf{u} - \\mathbf{v}$ (with both drawn in standard position) is the arrow that:",
              "choices": [
                "points from the tip of $\\mathbf{v}$ to the tip of $\\mathbf{u}$",
                "points from the tip of $\\mathbf{u}$ to the tip of $\\mathbf{v}$",
                "is the other diagonal of the parallelogram, found by tip-to-tail of $\\mathbf{u}$ and $\\mathbf{v}$",
                "always has length equal to $|\\mathbf{u}| - |\\mathbf{v}|$"
              ],
              "answer": 0,
              "explain": "Since $\\mathbf{v} + (\\mathbf{u}-\\mathbf{v}) = \\mathbf{u}$, the difference is the tip-to-tip arrow running from $\\mathbf{v}$'s tip to $\\mathbf{u}$'s tip."
            }
          ],
          "flashcards": [
            {
              "front": "Define a vector in $\\mathbb{R}^n$ in its two equivalent forms.",
              "back": "Geometrically: an arrow with magnitude (length) and direction. Algebraically: an ordered tuple $(v_1, \\dots, v_n)$ of real numbers. In standard position (tail at origin), the tuple equals the coordinates of the arrow's tip."
            },
            {
              "front": "How do you add two vectors, algebraically and geometrically?",
              "back": "Algebraically: component-wise, $\\mathbf{u}+\\mathbf{v} = (u_1+v_1, \\dots, u_n+v_n)$ (same dimension required). Geometrically: tip-to-tail, equivalently the parallelogram rule."
            },
            {
              "front": "What does scalar multiplication $\\lambda\\mathbf{v}$ do?",
              "back": "Scales every component: $\\lambda\\mathbf{v} = (\\lambda v_1, \\dots, \\lambda v_n)$. Geometrically it stretches/shrinks the arrow by $|\\lambda|$; if $\\lambda < 0$ it also reverses direction; $\\lambda = 0$ gives $\\mathbf{0}$."
            },
            {
              "front": "What are the zero vector and the negative of a vector?",
              "back": "$\\mathbf{0} = (0,\\dots,0)$ is the additive identity: $\\mathbf{v}+\\mathbf{0}=\\mathbf{v}$. The negative $-\\mathbf{v} = (-1)\\mathbf{v}$ points the opposite way and satisfies $\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}$."
            },
            {
              "front": "When are two nonzero vectors $\\mathbf{u}$ and $\\mathbf{v}$ parallel?",
              "back": "Exactly when one is a scalar multiple of the other: $\\mathbf{u} = \\lambda\\mathbf{v}$ for some $\\lambda \\neq 0$. In $\\mathbb{R}^2$ this is the test $u_1 v_2 - u_2 v_1 = 0$ (proportional components)."
            },
            {
              "front": "What is a linear combination of $\\mathbf{v}_1, \\dots, \\mathbf{v}_k$?",
              "back": "Any vector $c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots + c_k\\mathbf{v}_k$ with scalar coefficients $c_i$. It is the fundamental operation of linear algebra (e.g., the weighted sum a neural-network layer computes)."
            }
          ],
          "homework": [
            {
              "prompt": "Let $\\mathbf{a} = (2, 1)$, $\\mathbf{b} = (-1, 3)$, and $\\mathbf{c} = (0, -2)$. Compute the linear combination $\\mathbf{w} = 3\\mathbf{a} - 2\\mathbf{b} + \\mathbf{c}$, and sketch the tip-to-tail construction on graph paper.",
              "hint": "Scale each vector first, then add the three results one component at a time. For the sketch, draw $3\\mathbf{a}$ from the origin, then attach $-2\\mathbf{b}$ at its tip, then attach $\\mathbf{c}$.",
              "solution": "Scale: $3\\mathbf{a} = (6,3)$, $-2\\mathbf{b} = (2,-6)$, $\\mathbf{c} = (0,-2)$. Add component-wise: $\\mathbf{w} = (6+2+0,\\; 3+(-6)+(-2)) = (8, -5)$. For the sketch: from the origin draw $(6,3)$; from $(6,3)$ draw the displacement $(2,-6)$ ending at $(8,-3)$; from $(8,-3)$ draw $(0,-2)$ ending at $(8,-5)$. The single arrow from the origin to $(8,-5)$ is $\\mathbf{w}$."
            },
            {
              "prompt": "Find the scalar $t$ (if any) that makes $\\mathbf{u} = (t, 6)$ parallel to $\\mathbf{v} = (2, 4)$. Then state whether the resulting $\\mathbf{u}$ points the same direction as $\\mathbf{v}$ or the opposite direction.",
              "hint": "Parallel means $\\mathbf{u} = \\lambda\\mathbf{v}$ for some scalar $\\lambda$. Use the second components to find $\\lambda$ first, since both are known there.",
              "solution": "From the second components: $6 = \\lambda \\cdot 4 \\Rightarrow \\lambda = \\tfrac{3}{2}$. Then the first component must satisfy $t = \\lambda \\cdot 2 = \\tfrac{3}{2}\\cdot 2 = 3$. So $t = 3$, giving $\\mathbf{u} = (3,6) = \\tfrac{3}{2}(2,4)$. Since $\\lambda = \\tfrac{3}{2} > 0$, $\\mathbf{u}$ points in the SAME direction as $\\mathbf{v}$. (Check: $3\\cdot 4 - 6 \\cdot 2 = 0$, confirming parallel.)"
            },
            {
              "prompt": "Express the vector $\\mathbf{p} = (7, -2)$ as a linear combination of $\\mathbf{e}_1 = (1,0)$ and $\\mathbf{e}_2 = (0,1)$, and separately as a linear combination of $\\mathbf{f}_1 = (1,1)$ and $\\mathbf{f}_2 = (1,-1)$.",
              "hint": "For the standard basis the coefficients are just the components. For the second pair, set $\\mathbf{p} = a\\mathbf{f}_1 + b\\mathbf{f}_2$ and solve the two-equation system $a+b=7$, $a-b=-2$.",
              "solution": "Standard basis: $\\mathbf{p} = 7\\mathbf{e}_1 - 2\\mathbf{e}_2$, since the components are the coefficients. For $\\mathbf{f}_1, \\mathbf{f}_2$: writing $a(1,1) + b(1,-1) = (a+b,\\, a-b) = (7,-2)$ gives $a+b = 7$ and $a-b = -2$. Adding the equations: $2a = 5 \\Rightarrow a = \\tfrac{5}{2}$; then $b = 7 - \\tfrac{5}{2} = \\tfrac{9}{2}$. So $\\mathbf{p} = \\tfrac{5}{2}\\mathbf{f}_1 + \\tfrac{9}{2}\\mathbf{f}_2$. (Verify: $\\tfrac{5}{2}(1,1) + \\tfrac{9}{2}(1,-1) = (\\tfrac{5}{2}+\\tfrac{9}{2},\\, \\tfrac{5}{2}-\\tfrac{9}{2}) = (7,-2)$.)"
            }
          ],
          "examples": [
            {
              "title": "Vector Addition, Scalar Multiplication, and Magnitude",
              "body": "Let $\\mathbf{u} = \\begin{bmatrix} 4 \\\\ -1 \\\\ 2 \\end{bmatrix}$ and $\\mathbf{v} = \\begin{bmatrix} -2 \\\\ 3 \\\\ 5 \\end{bmatrix}$ be vectors in $\\mathbb{R}^3$.\n\n(a) Compute the linear combination $\\mathbf{w} = 2\\mathbf{u} - \\mathbf{v}$.\n\n(b) Find the magnitude (length) $\\|\\mathbf{w}\\|$ of the resulting vector.",
              "solution": "**Part (a): Compute $\\mathbf{w} = 2\\mathbf{u} - \\mathbf{v}$.**\n\nFirst scale $\\mathbf{u}$ by the scalar $2$. Scalar multiplication acts component-wise:\n$$2\\mathbf{u} = 2\\begin{bmatrix} 4 \\\\ -1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 4 \\\\ 2 \\cdot (-1) \\\\ 2 \\cdot 2 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ -2 \\\\ 4 \\end{bmatrix}.$$\n\nSubtraction is also component-wise (it is addition of $-\\mathbf{v}$):\n$$\\mathbf{w} = 2\\mathbf{u} - \\mathbf{v} = \\begin{bmatrix} 8 \\\\ -2 \\\\ 4 \\end{bmatrix} - \\begin{bmatrix} -2 \\\\ 3 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 8 - (-2) \\\\ -2 - 3 \\\\ 4 - 5 \\end{bmatrix} = \\begin{bmatrix} 10 \\\\ -5 \\\\ -1 \\end{bmatrix}.$$\n\nSo $\\mathbf{w} = (10, -5, -1)$.\n\n**Part (b): Find $\\|\\mathbf{w}\\|$.**\n\nThe magnitude of a vector in $\\mathbb{R}^n$ is the square root of the sum of the squares of its components:\n$$\\|\\mathbf{w}\\| = \\sqrt{w_1^2 + w_2^2 + w_3^2}.$$\n\nSubstitute the components of $\\mathbf{w} = (10, -5, -1)$:\n$$\\|\\mathbf{w}\\| = \\sqrt{10^2 + (-5)^2 + (-1)^2} = \\sqrt{100 + 25 + 1} = \\sqrt{126}.$$\n\nSimplify by factoring out the perfect square $9$:\n$$\\sqrt{126} = \\sqrt{9 \\cdot 14} = 3\\sqrt{14}.$$\n\nThus $\\|\\mathbf{w}\\| = 3\\sqrt{14} \\approx 11.22$."
            },
            {
              "title": "Finding a Displacement Vector and a Unit Vector",
              "body": "A data point starts at $P = (1, 4, -2)$ and ends at $Q = (5, -2, 4)$ in $\\mathbb{R}^3$.\n\n(a) Find the displacement vector $\\vec{PQ}$ (the vector that moves you from $P$ to $Q$).\n\n(b) Find the unit vector $\\hat{\\mathbf{d}}$ pointing in the same direction as $\\vec{PQ}$, and verify it has length $1$.",
              "solution": "**Part (a): Find $\\vec{PQ}$.**\n\nA displacement vector encodes how far and in what direction you move, independent of where you start. To get the vector from $P$ to $Q$, subtract the tail coordinates from the tip coordinates component-wise ($\\text{tip} - \\text{tail}$):\n$$\\vec{PQ} = Q - P = \\begin{bmatrix} 5 \\\\ -2 \\\\ 4 \\end{bmatrix} - \\begin{bmatrix} 1 \\\\ 4 \\\\ -2 \\end{bmatrix} = \\begin{bmatrix} 5 - 1 \\\\ -2 - 4 \\\\ 4 - (-2) \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ -6 \\\\ 6 \\end{bmatrix}.$$\n\nSo $\\vec{PQ} = (4, -6, 6)$. This says: \"move 4 right, 6 down, 6 forward,\" regardless of the starting point $P$.\n\n**Part (b): Find the unit vector $\\hat{\\mathbf{d}}$.**\n\nA unit vector has length $1$ and is obtained by dividing a vector by its own magnitude (this is called *normalizing*). First compute the magnitude of $\\mathbf{d} = \\vec{PQ} = (4, -6, 6)$:\n$$\\|\\mathbf{d}\\| = \\sqrt{4^2 + (-6)^2 + 6^2} = \\sqrt{16 + 36 + 36} = \\sqrt{88}.$$\n\nSimplify: $\\sqrt{88} = \\sqrt{4 \\cdot 22} = 2\\sqrt{22}$.\n\nNow divide each component by this magnitude (scalar multiplication by $\\tfrac{1}{\\|\\mathbf{d}\\|}$):\n$$\\hat{\\mathbf{d}} = \\frac{1}{\\|\\mathbf{d}\\|}\\mathbf{d} = \\frac{1}{2\\sqrt{22}}\\begin{bmatrix} 4 \\\\ -6 \\\\ 6 \\end{bmatrix} = \\begin{bmatrix} \\dfrac{4}{2\\sqrt{22}} \\\\[2mm] \\dfrac{-6}{2\\sqrt{22}} \\\\[2mm] \\dfrac{6}{2\\sqrt{22}} \\end{bmatrix} = \\begin{bmatrix} \\dfrac{2}{\\sqrt{22}} \\\\[2mm] \\dfrac{-3}{\\sqrt{22}} \\\\[2mm] \\dfrac{3}{\\sqrt{22}} \\end{bmatrix}.$$\n\n**Verification that $\\|\\hat{\\mathbf{d}}\\| = 1$:**\n$$\\|\\hat{\\mathbf{d}}\\| = \\sqrt{\\left(\\frac{2}{\\sqrt{22}}\\right)^2 + \\left(\\frac{-3}{\\sqrt{22}}\\right)^2 + \\left(\\frac{3}{\\sqrt{22}}\\right)^2} = \\sqrt{\\frac{4}{22} + \\frac{9}{22} + \\frac{9}{22}} = \\sqrt{\\frac{22}{22}} = \\sqrt{1} = 1.$$\n\nThe direction is preserved (each component is just $\\vec{PQ}$ scaled by the same positive factor) and the length is exactly $1$, as required."
            }
          ]
        },
        {
          "id": "la-dot-product-norms",
          "title": "Dot Product, Norms, and Angles",
          "minutes": 16,
          "content": "<p>If a vector is an arrow — a magnitude and a direction — then a single number quietly governs almost everything geometric we can say about a <em>pair</em> of arrows: how long they are, how far apart they point, whether they are perpendicular, and how much one \"agrees\" with the other. That number is the <strong>dot product</strong>. In this lesson we build it from scratch, connect its algebraic and geometric faces, and then watch it reappear as <strong>cosine similarity</strong> — the workhorse of how modern AI systems decide that two pieces of text mean roughly the same thing.</p>\n\n<h3>1. Two faces of the dot product</h3>\n\n<p>Given two vectors $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$, the dot product (also called the <strong>inner product</strong> in this Euclidean setting) is defined algebraically as</p>\n\n$$\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^{n} u_i v_i = u_1 v_1 + u_2 v_2 + \\cdots + u_n v_n.$$\n\n<p>It eats two vectors and returns a single <em>scalar</em>. That output type is the whole point: the dot product compresses high-dimensional geometric information into one comparable number.</p>\n\n<p>The remarkable fact — the bridge of this entire lesson — is that this purely arithmetic operation has a purely geometric meaning:</p>\n\n$$\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta,$$\n\n<p>where $\\theta$ is the angle between the two vectors and $\\|\\cdot\\|$ denotes length. We will define length and prove this identity below, but absorb the slogan first.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The dot product measures <strong>aligned magnitude</strong>: \"how much of $\\mathbf{u}$ points along $\\mathbf{v}$, scaled by how big $\\mathbf{v}$ is.\" When the vectors point the same way it is large and positive; when they are perpendicular it is exactly zero; when they oppose, it goes negative.</p></div>\n\n<h4>Basic algebraic properties</h4>\n<p>Straight from the sum definition, the dot product is:</p>\n<ul>\n<li><strong>Symmetric:</strong> $\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{v} \\cdot \\mathbf{u}$.</li>\n<li><strong>Linear in each argument (bilinear):</strong> $(a\\mathbf{u} + b\\mathbf{w}) \\cdot \\mathbf{v} = a(\\mathbf{u}\\cdot\\mathbf{v}) + b(\\mathbf{w}\\cdot\\mathbf{v})$.</li>\n<li><strong>Positive-definite:</strong> $\\mathbf{u} \\cdot \\mathbf{u} = \\sum_i u_i^2 \\ge 0$, with equality only when $\\mathbf{u} = \\mathbf{0}$.</li>\n</ul>\n<p>That last property is what lets us define length from the dot product itself.</p>\n\n<h3>2. The Euclidean norm</h3>\n\n<p>The <strong>Euclidean norm</strong> (or $\\ell_2$ norm, or simply \"length\") of a vector is</p>\n\n$$\\|\\mathbf{u}\\| = \\sqrt{\\mathbf{u}\\cdot\\mathbf{u}} = \\sqrt{u_1^2 + u_2^2 + \\cdots + u_n^2}.$$\n\n<p>In $\\mathbb{R}^2$ and $\\mathbb{R}^3$ this is just the Pythagorean theorem; in higher dimensions we <em>define</em> length this way, and it behaves exactly as length should. A few consequences worth internalizing:</p>\n\n<ul>\n<li>$\\|\\mathbf{u}\\|^2 = \\mathbf{u}\\cdot\\mathbf{u}$. Squaring removes the square root and is almost always the cleaner quantity to manipulate.</li>\n<li><strong>Absolute homogeneity:</strong> $\\|c\\,\\mathbf{u}\\| = |c|\\,\\|\\mathbf{u}\\|$. Scaling a vector by $c$ scales its length by $|c|$.</li>\n<li><strong>Triangle inequality:</strong> $\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$. The direct route is never longer than a detour.</li>\n</ul>\n\n<p>The Euclidean distance between two points is then just the norm of their difference: $d(\\mathbf{u},\\mathbf{v}) = \\|\\mathbf{u} - \\mathbf{v}\\|$.</p>\n\n<h4>Unit vectors and normalization</h4>\n<p>A <strong>unit vector</strong> is any vector with norm exactly $1$. To <strong>normalize</strong> a nonzero vector — to extract its pure direction, discarding magnitude — divide by its own length:</p>\n\n$$\\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{\\|\\mathbf{u}\\|}, \\qquad \\|\\hat{\\mathbf{u}}\\| = 1.$$\n\n<p>The hat notation $\\hat{\\mathbf{u}}$ conventionally signals \"unit vector in the direction of $\\mathbf{u}$.\" Normalization is ubiquitous: it is how we compare directions independently of scale, and it is precisely the step that turns the dot product into cosine similarity.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Many models care about <em>direction, not magnitude</em>. A word embedding for \"king\" might have a larger raw norm than one for \"queen\" simply due to training artifacts, yet they should be judged similar in meaning. Normalizing every vector to unit length removes that nuisance and is so common it has a name: <strong>L2 normalization</strong>.</p></div>\n\n<h3>3. From algebra to geometry: deriving $\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$</h3>\n\n<p>Consider the triangle formed by $\\mathbf{u}$, $\\mathbf{v}$, and the side $\\mathbf{u} - \\mathbf{v}$ joining their tips. The Law of Cosines from trigonometry states</p>\n\n$$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2 - 2\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta.$$\n\n<p>Now expand the left side using bilinearity of the dot product:</p>\n\n$$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = (\\mathbf{u}-\\mathbf{v})\\cdot(\\mathbf{u}-\\mathbf{v}) = \\mathbf{u}\\cdot\\mathbf{u} - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|^2 - 2\\,\\mathbf{u}\\cdot\\mathbf{v} + \\|\\mathbf{v}\\|^2.$$\n\n<p>Set the two expressions equal. The $\\|\\mathbf{u}\\|^2$ and $\\|\\mathbf{v}\\|^2$ terms cancel, leaving</p>\n\n$$-2\\,\\mathbf{u}\\cdot\\mathbf{v} = -2\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta \\quad\\Longrightarrow\\quad \\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta.$$\n\n<p>The algebraic and geometric definitions are one and the same. Rearranging gives the formula for the angle directly:</p>\n\n$$\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}, \\qquad \\theta = \\arccos\\!\\left(\\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}\\right).$$\n\n<h3>4. Orthogonality</h3>\n\n<p>Since $\\cos 90^\\circ = 0$, the geometric formula tells us two nonzero vectors are perpendicular exactly when their dot product vanishes. We promote this to a definition that works in <em>any</em> dimension, where \"perpendicular\" is otherwise hard to picture:</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Definition</div><p>Two vectors $\\mathbf{u}$ and $\\mathbf{v}$ are <strong>orthogonal</strong> if and only if $\\mathbf{u}\\cdot\\mathbf{v} = 0$. By convention the zero vector is orthogonal to everything. Orthogonality is the central organizing idea of linear algebra — it underlies coordinate axes, Fourier analysis, least squares, and PCA, all of which are \"decompose into perpendicular pieces.\"</p></div>\n\n<p>The sign of the dot product gives a cheap directional read even without computing the angle: positive means an acute angle (broadly same direction), zero means perpendicular, negative means an obtuse angle (broadly opposite).</p>\n\n<h3>5. Projection of one vector onto another</h3>\n\n<p>\"How much of $\\mathbf{u}$ lies along the direction of $\\mathbf{v}$?\" is answered by the <strong>projection</strong>. Drop a perpendicular from the tip of $\\mathbf{u}$ onto the line through $\\mathbf{v}$; the resulting shadow is $\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}$.</p>\n\n<p>The <strong>scalar projection</strong> (signed length of the shadow) is</p>\n\n$$\\operatorname{comp}_{\\mathbf{v}}\\mathbf{u} = \\|\\mathbf{u}\\|\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{v}\\|} = \\mathbf{u}\\cdot\\hat{\\mathbf{v}}.$$\n\n<p>The <strong>vector projection</strong> attaches that length to $\\mathbf{v}$'s direction:</p>\n\n$$\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\left(\\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\mathbf{v}\\cdot\\mathbf{v}}\\right)\\mathbf{v} = (\\mathbf{u}\\cdot\\hat{\\mathbf{v}})\\,\\hat{\\mathbf{v}}.$$\n\n<p>A clean way to remember it: <em>scalar shadow times unit direction</em>. The leftover piece $\\mathbf{u} - \\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}$ is, by construction, orthogonal to $\\mathbf{v}$ — you can verify this by taking its dot product with $\\mathbf{v}$ and watching it collapse to zero. This <strong>orthogonal decomposition</strong> of $\\mathbf{u}$ into a part along $\\mathbf{v}$ plus a part perpendicular to $\\mathbf{v}$ is the seed of the Gram-Schmidt process and of linear regression's \"fit plus residual.\"</p>\n\n<h3>6. The Cauchy-Schwarz inequality</h3>\n\n<p>Because $-1 \\le \\cos\\theta \\le 1$, the geometric formula immediately bounds the dot product by the product of the lengths:</p>\n\n$$\\boxed{\\,|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\,}$$\n\n<p>This is the <strong>Cauchy-Schwarz inequality</strong>, one of the most-used inequalities in all of mathematics. Equality holds precisely when the vectors are <strong>parallel</strong> (linearly dependent), i.e. $\\cos\\theta = \\pm 1$. Two things to note:</p>\n<ul>\n<li>It is what <em>guarantees</em> that $\\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}$ always lands in $[-1, 1]$, so the $\\arccos$ for the angle is always well-defined. The geometry is consistent.</li>\n<li>It does not actually require the geometric formula to prove — it can be derived purely algebraically (e.g. the discriminant of $\\|\\mathbf{u} + t\\mathbf{v}\\|^2 \\ge 0$ as a quadratic in $t$ is $\\le 0$), which is why the inner-product framework extends cleanly to function spaces and probability, where \"angle\" is less obvious.</li>\n</ul>\n\n<h3>7. Worked example</h3>\n\n<p>Let $\\mathbf{u} = (3, 4, 0)$ and $\\mathbf{v} = (4, 0, 3)$ in $\\mathbb{R}^3$. We compute the norms, the angle, the projection, and check Cauchy-Schwarz.</p>\n\n<p><strong>Dot product:</strong></p>\n$$\\mathbf{u}\\cdot\\mathbf{v} = (3)(4) + (4)(0) + (0)(3) = 12.$$\n\n<p><strong>Norms:</strong></p>\n$$\\|\\mathbf{u}\\| = \\sqrt{3^2+4^2+0^2} = \\sqrt{25} = 5, \\qquad \\|\\mathbf{v}\\| = \\sqrt{4^2+0^2+3^2} = \\sqrt{25} = 5.$$\n\n<p><strong>Angle:</strong></p>\n$$\\cos\\theta = \\frac{12}{5\\cdot 5} = \\frac{12}{25} = 0.48 \\quad\\Longrightarrow\\quad \\theta = \\arccos(0.48) \\approx 61.3^\\circ.$$\n<p>Positive cosine, so the angle is acute — the vectors broadly agree, but they are far from parallel.</p>\n\n<p><strong>Vector projection of $\\mathbf{u}$ onto $\\mathbf{v}$:</strong> with $\\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{v}\\|^2 = 25$,</p>\n$$\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{12}{25}\\,(4,0,3) = \\left(\\tfrac{48}{25},\\, 0,\\, \\tfrac{36}{25}\\right) = (1.92,\\, 0,\\, 1.44).$$\n\n<p><strong>Check the residual is orthogonal to $\\mathbf{v}$:</strong> $\\mathbf{u} - \\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = (1.08,\\, 4,\\, -1.44)$, and</p>\n$$(1.08)(4) + (4)(0) + (-1.44)(3) = 4.32 - 4.32 = 0. \\checkmark$$\n\n<p><strong>Cauchy-Schwarz:</strong> $|\\mathbf{u}\\cdot\\mathbf{v}| = 12 \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\| = 25$. Holds comfortably, with slack because the vectors are not parallel.</p>\n\n<h3>8. The ML connection: cosine similarity</h3>\n\n<p>Modern AI represents words, sentences, images, and users as high-dimensional vectors called <strong>embeddings</strong>. To ask \"how similar are these two things?\" we compare their embedding vectors — and the standard tool is <strong>cosine similarity</strong>, which is nothing but the angle formula:</p>\n\n$$\\operatorname{cos\\_sim}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|} = \\hat{\\mathbf{u}}\\cdot\\hat{\\mathbf{v}} \\in [-1, 1].$$\n\n<p>It ranges from $1$ (same direction, identical meaning) through $0$ (orthogonal, unrelated) to $-1$ (opposite). Cosine similarity is preferred over raw dot product or Euclidean distance for embeddings because it ignores magnitude: a longer document and its one-paragraph summary may have different vector lengths but should still count as highly similar in <em>direction</em>.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>If you <strong>L2-normalize every vector first</strong>, then cosine similarity is just the plain dot product $\\hat{\\mathbf{u}}\\cdot\\hat{\\mathbf{v}}$. This is exactly what vector databases do: they normalize embeddings once, then reduce \"find the most semantically similar items\" to \"find the largest dot products\" — a single fast matrix multiplication. Retrieval-augmented generation (RAG), semantic search, and recommendation systems all run on this identity.</p></div>\n\n<p>A tiny, concrete illustration with toy 2-D embeddings. Suppose \"cat\" $= (2, 1)$, \"kitten\" $= (4, 2)$, and \"car\" $= (1, -3)$:</p>\n<pre><code>cos_sim(cat, kitten) = (2·4 + 1·2) / (sqrt(5)·sqrt(20))\n                     = 10 / (2.236 · 4.472) = 10 / 10 = 1.0   (perfectly aligned)\n\ncos_sim(cat, car)    = (2·1 + 1·(-3)) / (sqrt(5)·sqrt(10))\n                     = -1 / (2.236 · 3.162) = -0.141          (nearly unrelated)</code></pre>\n<p>\"cat\" and \"kitten\" point the same way (one is just a scaled copy of the other, hence similarity exactly $1$), while \"cat\" and \"car\" are nearly orthogonal. The geometry of angles, computed by a dot product, is doing the semantic reasoning.</p>\n\n<h3>9. Summary</h3>\n<ul>\n<li>The dot product $\\mathbf{u}\\cdot\\mathbf{v} = \\sum_i u_i v_i = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ unifies arithmetic and geometry into one scalar.</li>\n<li>Norm $\\|\\mathbf{u}\\| = \\sqrt{\\mathbf{u}\\cdot\\mathbf{u}}$ is length; normalize via $\\hat{\\mathbf{u}} = \\mathbf{u}/\\|\\mathbf{u}\\|$ to get pure direction.</li>\n<li>Orthogonal $\\iff$ dot product is $0$. The sign of the dot product reveals acute / right / obtuse.</li>\n<li>Projection $\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\mathbf{v}\\cdot\\mathbf{v}}\\mathbf{v}$ splits $\\mathbf{u}$ into a part along $\\mathbf{v}$ plus an orthogonal residual.</li>\n<li>Cauchy-Schwarz $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$ keeps the angle well-defined; equality means parallel.</li>\n<li>Cosine similarity = the angle formula = dot product of normalized vectors, and it is how AI compares embeddings.</li>\n</ul>",
          "mcq": [
            {
              "q": "Two nonzero vectors satisfy $\\mathbf{u}\\cdot\\mathbf{v} = 0$. What does this tell you?",
              "choices": [
                "They are parallel (point in the same direction)",
                "They are orthogonal (perpendicular)",
                "They are equal",
                "The angle between them is $0^\\circ$"
              ],
              "answer": 1,
              "explain": "Since $\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ and the lengths are nonzero, a zero dot product forces $\\cos\\theta = 0$, i.e. $\\theta = 90^\\circ$ — orthogonal."
            },
            {
              "q": "For $\\mathbf{u} = (1, 2, 2)$, what is the unit vector $\\hat{\\mathbf{u}}$?",
              "choices": [
                "$(1, 2, 2)$",
                "$(\\tfrac{1}{3}, \\tfrac{2}{3}, \\tfrac{2}{3})$",
                "$(\\tfrac{1}{5}, \\tfrac{2}{5}, \\tfrac{2}{5})$",
                "$(\\tfrac{1}{9}, \\tfrac{2}{9}, \\tfrac{2}{9})$"
              ],
              "answer": 1,
              "explain": "The norm is $\\sqrt{1+4+4} = \\sqrt{9} = 3$, so normalize by dividing each component by 3, giving $(1/3, 2/3, 2/3)$."
            },
            {
              "q": "Why is cosine similarity often preferred over the raw dot product for comparing text embeddings?",
              "choices": [
                "It is faster to compute than the dot product",
                "It ignores vector magnitude and compares only direction, so length artifacts don't distort similarity",
                "It can return values outside $[-1, 1]$ for more resolution",
                "It only works in two dimensions"
              ],
              "answer": 1,
              "explain": "Cosine similarity divides out both norms, so it depends only on the angle (direction). This makes a long document and its short summary count as similar despite different magnitudes."
            },
            {
              "q": "Which statement about the Cauchy-Schwarz inequality $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$ is correct?",
              "choices": [
                "Equality holds when the vectors are orthogonal",
                "It can fail in dimensions higher than 3",
                "Equality holds precisely when the vectors are parallel (linearly dependent)",
                "It implies the dot product is always positive"
              ],
              "answer": 2,
              "explain": "Equality corresponds to $\\cos\\theta = \\pm 1$, meaning the vectors are parallel. The inequality holds in every dimension and the dot product can certainly be negative."
            },
            {
              "q": "For $\\mathbf{u} = (3, -1, 2)$ and $\\mathbf{v} = (-2, 4, 1)$, what is $\\mathbf{u} \\cdot \\mathbf{v}$?",
              "choices": [
                "$-8$",
                "$0$",
                "$4$",
                "$-12$"
              ],
              "answer": 0,
              "explain": "Multiply componentwise and sum: $(3)(-2) + (-1)(4) + (2)(1) = -6 - 4 + 2 = -8$."
            },
            {
              "q": "Two unit vectors $\\mathbf{u}$ and $\\mathbf{v}$ point in nearly opposite directions. What is the approximate value of $\\mathbf{u} \\cdot \\mathbf{v}$?",
              "choices": [
                "Close to $+1$",
                "Close to $0$",
                "Close to $-1$",
                "Much larger than $1$"
              ],
              "answer": 2,
              "explain": "For unit vectors $\\mathbf{u}\\cdot\\mathbf{v}=\\cos\\theta$, and as $\\theta$ approaches $180^\\circ$ the cosine approaches $-1$."
            },
            {
              "q": "Why does the positive-definite property $\\mathbf{u}\\cdot\\mathbf{u} \\ge 0$ matter for defining the Euclidean norm?",
              "choices": [
                "It guarantees the dot product is always symmetric",
                "It ensures $\\sqrt{\\mathbf{u}\\cdot\\mathbf{u}}$ is a real, non-negative number that can serve as a length",
                "It makes the dot product linear in each argument",
                "It forces every vector to have length exactly $1$"
              ],
              "answer": 1,
              "explain": "Since $\\mathbf{u}\\cdot\\mathbf{u}\\ge 0$, its square root is a well-defined real non-negative quantity, exactly what a length must be."
            },
            {
              "q": "Given $\\|\\mathbf{u}\\| = 4$, $\\|\\mathbf{v}\\| = 5$, and the angle between them is $60^\\circ$, what is $\\mathbf{u}\\cdot\\mathbf{v}$?",
              "choices": [
                "$20$",
                "$10$",
                "$\\frac{1}{2}$",
                "$10\\sqrt{3}$"
              ],
              "answer": 1,
              "explain": "Using $\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta = 4\\cdot 5\\cdot\\cos 60^\\circ = 20\\cdot\\tfrac{1}{2} = 10$."
            }
          ],
          "flashcards": [
            {
              "front": "Algebraic and geometric definitions of the dot product",
              "back": "$\\mathbf{u}\\cdot\\mathbf{v} = \\sum_i u_i v_i = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta$. A scalar that equals both the sum of componentwise products and the product of lengths times the cosine of the angle."
            },
            {
              "front": "Euclidean norm and how to normalize a vector",
              "back": "Norm: $\\|\\mathbf{u}\\| = \\sqrt{\\mathbf{u}\\cdot\\mathbf{u}} = \\sqrt{\\sum_i u_i^2}$. Normalize to a unit vector: $\\hat{\\mathbf{u}} = \\mathbf{u}/\\|\\mathbf{u}\\|$, which has length 1 and keeps only the direction."
            },
            {
              "front": "Condition for two vectors to be orthogonal",
              "back": "$\\mathbf{u}\\cdot\\mathbf{v} = 0$. (The zero vector is orthogonal to everything by convention.)"
            },
            {
              "front": "Vector projection of $\\mathbf{u}$ onto $\\mathbf{v}$",
              "back": "$\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\mathbf{v}\\cdot\\mathbf{v}}\\,\\mathbf{v} = (\\mathbf{u}\\cdot\\hat{\\mathbf{v}})\\,\\hat{\\mathbf{v}}$. The residual $\\mathbf{u} - \\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}$ is orthogonal to $\\mathbf{v}$."
            },
            {
              "front": "Cauchy-Schwarz inequality and its equality case",
              "back": "$|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$, with equality iff $\\mathbf{u}$ and $\\mathbf{v}$ are parallel. It guarantees $\\cos\\theta \\in [-1,1]$."
            },
            {
              "front": "Cosine similarity (the ML connection)",
              "back": "$\\operatorname{cos\\_sim}(\\mathbf{u},\\mathbf{v}) = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|} = \\hat{\\mathbf{u}}\\cdot\\hat{\\mathbf{v}} \\in [-1,1]$. After L2-normalizing, similarity is just the dot product — the basis of semantic search and RAG."
            }
          ],
          "homework": [
            {
              "prompt": "Let $\\mathbf{a} = (2, -1, 2)$ and $\\mathbf{b} = (1, 2, 2)$. (i) Compute $\\mathbf{a}\\cdot\\mathbf{b}$ and the angle $\\theta$ between them. (ii) Compute the cosine similarity. (iii) Are they closer to parallel or to orthogonal?",
              "hint": "First find $\\mathbf{a}\\cdot\\mathbf{b}$ and both norms, then use $\\cos\\theta = (\\mathbf{a}\\cdot\\mathbf{b})/(\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|)$. Cosine similarity IS that cosine value.",
              "solution": "Dot product: $(2)(1)+(-1)(2)+(2)(2) = 2 - 2 + 4 = 4$. Norms: $\\|\\mathbf{a}\\| = \\sqrt{4+1+4} = 3$ and $\\|\\mathbf{b}\\| = \\sqrt{1+4+4} = 3$. (i) $\\cos\\theta = 4/(3\\cdot 3) = 4/9 \\approx 0.444$, so $\\theta = \\arccos(0.444) \\approx 63.6^\\circ$. (ii) Cosine similarity is the same value, $4/9 \\approx 0.444$. (iii) Since the cosine $0.444$ is between 0 and 1 but well below 1, the angle is acute but far from $0^\\circ$ — they are closer to orthogonal than to parallel (an exactly orthogonal pair would give similarity 0, parallel would give 1)."
            },
            {
              "prompt": "Find the vector projection of $\\mathbf{u} = (3, 3)$ onto $\\mathbf{v} = (4, 0)$, and verify that the residual $\\mathbf{u} - \\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}$ is orthogonal to $\\mathbf{v}$.",
              "hint": "Use $\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\mathbf{v}\\cdot\\mathbf{v}}\\mathbf{v}$. Since $\\mathbf{v}$ points along the x-axis, the projection should keep only the x-component of $\\mathbf{u}$.",
              "solution": "$\\mathbf{u}\\cdot\\mathbf{v} = (3)(4) + (3)(0) = 12$ and $\\mathbf{v}\\cdot\\mathbf{v} = 16$. So $\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{12}{16}(4,0) = \\frac{3}{4}(4,0) = (3, 0)$. The residual is $\\mathbf{u} - (3,0) = (0, 3)$. Check orthogonality: $(0,3)\\cdot(4,0) = 0\\cdot4 + 3\\cdot0 = 0$. The residual is orthogonal to $\\mathbf{v}$, as expected — it is the purely perpendicular part of $\\mathbf{u}$."
            },
            {
              "prompt": "Two unit vectors $\\hat{\\mathbf{x}}$ and $\\hat{\\mathbf{y}}$ have cosine similarity $0.8$. Compute the squared Euclidean distance $\\|\\hat{\\mathbf{x}} - \\hat{\\mathbf{y}}\\|^2$ between them, and state the general relationship between cosine similarity and Euclidean distance for unit vectors.",
              "hint": "Expand $\\|\\hat{\\mathbf{x}} - \\hat{\\mathbf{y}}\\|^2$ using bilinearity, and remember that for unit vectors $\\hat{\\mathbf{x}}\\cdot\\hat{\\mathbf{x}} = \\hat{\\mathbf{y}}\\cdot\\hat{\\mathbf{y}} = 1$ and $\\hat{\\mathbf{x}}\\cdot\\hat{\\mathbf{y}}$ equals the cosine similarity.",
              "solution": "Expand: $\\|\\hat{\\mathbf{x}} - \\hat{\\mathbf{y}}\\|^2 = \\hat{\\mathbf{x}}\\cdot\\hat{\\mathbf{x}} - 2\\,\\hat{\\mathbf{x}}\\cdot\\hat{\\mathbf{y}} + \\hat{\\mathbf{y}}\\cdot\\hat{\\mathbf{y}} = 1 - 2(0.8) + 1 = 2 - 1.6 = 0.4$. General relationship: for unit vectors, $\\|\\hat{\\mathbf{x}} - \\hat{\\mathbf{y}}\\|^2 = 2 - 2\\,\\operatorname{cos\\_sim}(\\hat{\\mathbf{x}},\\hat{\\mathbf{y}})$. Squared Euclidean distance is a strictly decreasing function of cosine similarity, so ranking nearest neighbors by largest cosine similarity is equivalent to ranking by smallest Euclidean distance — which is why L2-normalized vector search can use either metric interchangeably."
            }
          ],
          "examples": [
            {
              "title": "Computing a Dot Product, Norms, and the Angle Between Two Vectors",
              "body": "Let $\\mathbf{u} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}$ and $\\mathbf{v} = \\begin{bmatrix} 6 \\\\ 8 \\end{bmatrix}$ be vectors in $\\mathbb{R}^2$. Compute the dot product $\\mathbf{u} \\cdot \\mathbf{v}$, both norms $\\|\\mathbf{u}\\|$ and $\\|\\mathbf{v}\\|$, and the angle $\\theta$ between the two vectors.",
              "solution": "Step 1 — Dot product (algebraic definition). Multiply matching components and add:\n$$\\mathbf{u} \\cdot \\mathbf{v} = (3)(6) + (4)(8) = 18 + 32 = 50.$$\n\nStep 2 — Norms. Each norm is the square root of the dot product of the vector with itself:\n$$\\|\\mathbf{u}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5,$$\n$$\\|\\mathbf{v}\\| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10.$$\n\nStep 3 — Angle. Rearrange the geometric identity $\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta$ to solve for $\\cos\\theta$:\n$$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|} = \\frac{50}{(5)(10)} = \\frac{50}{50} = 1.$$\n\nStep 4 — Interpret. Since $\\cos\\theta = 1$, we have $\\theta = 0$. The vectors point in exactly the same direction, which makes sense because $\\mathbf{v} = 2\\mathbf{u}$ — $\\mathbf{v}$ is simply $\\mathbf{u}$ scaled by a positive factor, so they are perfectly aligned.\n\nAnswer: $\\mathbf{u} \\cdot \\mathbf{v} = 50$, $\\|\\mathbf{u}\\| = 5$, $\\|\\mathbf{v}\\| = 10$, and $\\theta = 0$ (or $0^\\circ$)."
            },
            {
              "title": "Testing Orthogonality and Finding an Angle in $\\mathbb{R}^3$",
              "body": "Consider the three vectors in $\\mathbb{R}^3$:\n$$\\mathbf{a} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}, \\quad \\mathbf{b} = \\begin{bmatrix} 2 \\\\ -2 \\\\ 1 \\end{bmatrix}, \\quad \\mathbf{c} = \\begin{bmatrix} 0 \\\\ 3 \\\\ 4 \\end{bmatrix}.$$\n(a) Show that $\\mathbf{a}$ and $\\mathbf{b}$ are orthogonal (perpendicular). (b) Find the angle $\\theta$ between $\\mathbf{a}$ and $\\mathbf{c}$, giving an exact expression for $\\cos\\theta$ and then a decimal approximation in degrees.",
              "solution": "Part (a) — Orthogonality test. Two vectors are orthogonal exactly when their dot product is zero (since $\\cos 90^\\circ = 0$). Compute:\n$$\\mathbf{a} \\cdot \\mathbf{b} = (1)(2) + (2)(-2) + (2)(1) = 2 - 4 + 2 = 0.$$\nThe dot product is $0$, so $\\mathbf{a}$ and $\\mathbf{b}$ are orthogonal.\n\nPart (b) — Angle between $\\mathbf{a}$ and $\\mathbf{c}$.\n\nStep 1 — Dot product.\n$$\\mathbf{a} \\cdot \\mathbf{c} = (1)(0) + (2)(3) + (2)(4) = 0 + 6 + 8 = 14.$$\n\nStep 2 — Norms.\n$$\\|\\mathbf{a}\\| = \\sqrt{1^2 + 2^2 + 2^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3,$$\n$$\\|\\mathbf{c}\\| = \\sqrt{0^2 + 3^2 + 4^2} = \\sqrt{0 + 9 + 16} = \\sqrt{25} = 5.$$\n\nStep 3 — Cosine of the angle.\n$$\\cos\\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{c}}{\\|\\mathbf{a}\\|\\,\\|\\mathbf{c}\\|} = \\frac{14}{(3)(5)} = \\frac{14}{15}.$$\n\nStep 4 — Angle in degrees. Take the inverse cosine:\n$$\\theta = \\arccos\\!\\left(\\frac{14}{15}\\right) = \\arccos(0.9333\\ldots) \\approx 21.04^\\circ.$$\n\nSince $\\frac{14}{15}$ is positive and close to $1$, the angle is small and acute — the vectors point in broadly similar directions.\n\nAnswer: (a) $\\mathbf{a} \\cdot \\mathbf{b} = 0$, so they are orthogonal. (b) $\\cos\\theta = \\frac{14}{15}$, giving $\\theta \\approx 21.04^\\circ$."
            }
          ]
        },
        {
          "id": "la-span-independence",
          "title": "Linear Combinations, Span, and Independence",
          "minutes": 18,
          "content": "<h3>From One Vector to Many: The Algebra of Reach</h3>\n<p>So far you have met individual vectors and the two operations that act on them: <strong>scaling</strong> (multiply by a number) and <strong>adding</strong> (combine two vectors tip-to-tail). It turns out that essentially <em>everything</em> in linear algebra — solving systems, fitting models, compressing data, understanding what a neural network layer can and cannot represent — is built from repeatedly applying just those two operations. The recipe that mixes them is called a <strong>linear combination</strong>, and this lesson is about what you can <em>reach</em> with such recipes and when some ingredients are <em>redundant</em>.</p>\n\n<h3>1. Linear Combinations</h3>\n<p>Given vectors $v_1, v_2, \\dots, v_k$ in $\\mathbb{R}^n$ and scalars (numbers) $c_1, c_2, \\dots, c_k$, the vector</p>\n$$ c_1 v_1 + c_2 v_2 + \\cdots + c_k v_k $$\n<p>is called a <strong>linear combination</strong> of the $v_i$. The scalars $c_i$ are the <em>weights</em> or <em>coefficients</em>. That is the entire definition — you are allowed to stretch/shrink/flip each vector and add the results. No other operations (no multiplying vectors together, no dividing) are involved.</p>\n\n<p>A concrete example in $\\mathbb{R}^2$. With $v_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ and $v_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$, the combination $3v_1 + (-2)v_2 = \\begin{bmatrix} 3 \\\\ -2 \\end{bmatrix}$. By choosing the two weights freely you can hit <em>any</em> point in the plane — every $\\begin{bmatrix} a \\\\ b \\end{bmatrix}$ equals $a\\,v_1 + b\\,v_2$. Hold that thought; it is the seed of \"span.\"</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A linear combination is a \"weighted blend\" of directions. If $v_1$ points east and $v_2$ points north, then $c_1 v_1 + c_2 v_2$ is \"go $c_1$ east, then $c_2$ north.\" Every reachable destination is some such blend. Negative weights just mean \"go the other way.\"</p>\n</div>\n\n<h4>Why this is the central operation in ML</h4>\n<p>A single neuron computes $w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n + b$ — a linear combination of its inputs (plus a bias), followed by a nonlinearity. The \"weights\" of a network are literally the coefficients $c_i$ above. A matrix-vector product $A x$ is nothing but a linear combination of the <em>columns</em> of $A$, with the entries of $x$ as the weights:</p>\n$$ A x = x_1 \\,(\\text{col}_1 \\text{ of } A) + x_2 \\,(\\text{col}_2 \\text{ of } A) + \\cdots + x_n \\,(\\text{col}_n \\text{ of } A). $$\n<p>This \"columns view\" of $Ax$ is one of the most useful mental models in the whole subject — remember it.</p>\n\n<h3>2. Span: the Set of All Reachable Points</h3>\n<p>The <strong>span</strong> of a set of vectors is the set of <em>all</em> linear combinations you can form from them:</p>\n$$ \\operatorname{span}\\{v_1, \\dots, v_k\\} = \\{\\, c_1 v_1 + \\cdots + c_k v_k \\;:\\; c_1, \\dots, c_k \\in \\mathbb{R} \\,\\}. $$\n<p>Read it aloud as \"everything you can reach by blending these vectors.\" The span is always a flat object passing through the origin (a <em>subspace</em>), because $0 = 0\\cdot v_1 + \\cdots + 0 \\cdot v_k$ is always reachable.</p>\n\n<h4>The geometric zoo of spans in $\\mathbb{R}^3$</h4>\n<ul>\n<li><strong>The zero vector alone</strong> spans just $\\{0\\}$ — a single point.</li>\n<li><strong>One nonzero vector</strong> spans a <strong>line</strong> through the origin (all its scalar multiples).</li>\n<li><strong>Two vectors pointing in different directions</strong> span a <strong>plane</strong> through the origin.</li>\n<li><strong>Two vectors pointing along the same line</strong> (one is a multiple of the other) still span only a <strong>line</strong> — the second adds nothing new.</li>\n<li><strong>Three \"genuinely different\" vectors</strong> span <strong>all of $\\mathbb{R}^3$</strong>.</li>\n</ul>\n<p>Notice the pattern: adding a vector grows the span only if that vector points <em>outside</em> the current span. If it already lies inside, the span does not grow — that vector is <em>redundant</em>. This observation is exactly what independence will formalize.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>$\\operatorname{span}\\{v_1,\\dots,v_k\\} = \\mathbb{R}^n$ means the vectors can reach <em>every</em> point. This is the same as saying the system $Ax = b$ (with the $v_i$ as columns of $A$) has a solution for <em>every</em> right-hand side $b$. \"Span = whole space\" and \"always solvable\" are two phrasings of one idea.</p>\n</div>\n\n<h4>Checking membership: is $b$ in the span?</h4>\n<p>Asking \"is $b \\in \\operatorname{span}\\{v_1,\\dots,v_k\\}$?\" is asking \"do weights $c_i$ exist with $c_1 v_1 + \\cdots + c_k v_k = b$?\" Stack the $v_i$ as columns of a matrix $A$; then this is precisely the question \"does $Ax = b$ have a solution?\" — answerable by row reducing the augmented matrix $[\\,A \\mid b\\,]$ and checking for consistency.</p>\n\n<h3>3. Linear Independence vs. Dependence</h3>\n<p>Here is the crux of the lesson, stated two equivalent ways.</p>\n\n<p><strong>Definition (the clean algebraic one).</strong> The vectors $v_1, \\dots, v_k$ are <strong>linearly independent</strong> if the only way to make</p>\n$$ c_1 v_1 + c_2 v_2 + \\cdots + c_k v_k = 0 $$\n<p>is the <strong>trivial</strong> choice $c_1 = c_2 = \\cdots = c_k = 0$. If there is <em>any</em> other solution — some nonzero weights producing $0$ — the vectors are <strong>linearly dependent</strong>.</p>\n\n<p><strong>Equivalent characterization (the intuitive one).</strong> The vectors are dependent if and only if <em>at least one of them is a linear combination of the others</em> (i.e. it lies in the span of the rest, so it is redundant). They are independent exactly when no vector is reachable from the others — each one genuinely adds a new direction.</p>\n\n<p>Why are these the same? Suppose $c_1 v_1 + \\cdots + c_k v_k = 0$ with, say, $c_1 \\neq 0$. Then we can solve for $v_1$:</p>\n$$ v_1 = -\\frac{c_2}{c_1} v_2 - \\cdots - \\frac{c_k}{c_1} v_k, $$\n<p>expressing $v_1$ through the others. Conversely, if some $v_j$ equals a combination of the others, move it to one side to get a nontrivial dependence (its coefficient is $-1 \\neq 0$). The \"$=0$ with nonzero weights\" form is preferred because it is symmetric in all the vectors and mechanical to test.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Independence = \"no free lunch.\" Every vector pulls its own weight; remove any one and you lose access to part of the span. Dependence = \"someone is along for the ride\" — at least one vector can be rebuilt from the others, so deleting it costs you nothing.</p>\n</div>\n\n<h4>Quick facts worth memorizing</h4>\n<ul>\n<li>Any set containing the <strong>zero vector</strong> is automatically dependent ($1\\cdot 0 + 0\\cdot(\\text{rest}) = 0$ is a nontrivial relation).</li>\n<li>Two vectors are dependent $\\iff$ one is a scalar multiple of the other (they are parallel/collinear).</li>\n<li><strong>More vectors than dimensions forces dependence:</strong> any $k$ vectors in $\\mathbb{R}^n$ with $k > n$ are <em>always</em> dependent. You cannot have 4 independent vectors in $\\mathbb{R}^3$.</li>\n<li>$n$ independent vectors in $\\mathbb{R}^n$ automatically span all of $\\mathbb{R}^n$ — they form a <em>basis</em> (next lesson).</li>\n</ul>\n\n<h3>4. The Computational Test: Row Reduction</h3>\n<p>Testing independence by inspection works for two or three small vectors, but the reliable, general method is row reduction. The procedure:</p>\n<ol>\n<li>Form the matrix $A$ whose <strong>columns</strong> are the vectors $v_1, \\dots, v_k$.</li>\n<li>Row reduce $A$ to echelon form (you do not need full reduced echelon form to read off the answer).</li>\n<li>Count the <strong>pivots</strong> (leading nonzero entries, one per pivot row/column).</li>\n</ol>\n<p><strong>Verdict:</strong> the vectors are independent $\\iff$ every column is a pivot column $\\iff$ the number of pivots equals $k$ (the number of vectors). Each <em>pivot column</em> corresponds to an independent vector; each <strong>free column</strong> (no pivot) corresponds to a <em>redundant</em> vector — and the echelon form even tells you how to write that redundant vector in terms of the pivot ones.</p>\n\n<p>The number of pivots is called the <strong>rank</strong>. Rank measures how many independent directions are present, and the span is a $(\\text{rank})$-dimensional flat through the origin: rank 1 = line, rank 2 = plane, and so on.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why ML cares</div>\n<p>Rank is the headline diagnostic for redundancy in data. If your feature matrix has rank less than the number of columns, some features are exact linear combinations of others — perfectly collinear. That makes a least-squares / linear-regression solution non-unique and the normal-equations matrix singular (you cannot invert it), which is why pipelines drop redundant features or add regularization. Low-rank structure is also the entire premise of PCA, matrix factorization, and LoRA fine-tuning.</p>\n</div>\n\n<h3>5. Fully Worked Example</h3>\n<p>Determine whether the following three vectors in $\\mathbb{R}^3$ are independent, describe their span, and identify any redundant vector.</p>\n$$ v_1 = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}, \\quad v_2 = \\begin{bmatrix} 2 \\\\ 4 \\\\ 6 \\end{bmatrix}, \\quad v_3 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}. $$\n\n<p><strong>Step 1 — set up the matrix with these as columns.</strong></p>\n$$ A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 1 \\\\ 3 & 6 & 0 \\end{bmatrix}. $$\n\n<p><strong>Step 2 — row reduce.</strong> Use the first row to clear column 1: $R_2 \\leftarrow R_2 - 2R_1$ and $R_3 \\leftarrow R_3 - 3R_1$:</p>\n$$ \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & -1 \\\\ 0 & 0 & -3 \\end{bmatrix}. $$\n<p>Now clear the third column below the second pivot: $R_3 \\leftarrow R_3 - 3R_2$:</p>\n$$ \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & -1 \\\\ 0 & 0 & 0 \\end{bmatrix}. $$\n\n<p><strong>Step 3 — read off pivots.</strong> Pivots sit in <em>column 1</em> (the leading $1$) and <em>column 3</em> (the $-1$). Column 2 has <strong>no pivot</strong> — it is a free column. So the rank is $2$, but we have $k = 3$ vectors. Since pivots ($2$) $<$ vectors ($3$), the set is <strong>linearly dependent</strong>.</p>\n\n<p><strong>Step 4 — identify the redundant vector.</strong> The free column is column 2, i.e. $v_2$. Indeed by inspection $v_2 = 2 v_1$ (the original first two columns were proportional). So $v_2$ is the redundant one: it adds no new direction, and</p>\n$$ \\operatorname{span}\\{v_1, v_2, v_3\\} = \\operatorname{span}\\{v_1, v_3\\}. $$\n\n<p><strong>Step 5 — describe the span.</strong> The surviving vectors $v_1$ and $v_3$ are <em>not</em> multiples of each other (rank 2), so they span a <strong>plane through the origin</strong> in $\\mathbb{R}^3$ — a 2-dimensional subspace, not all of $\\mathbb{R}^3$. A point lies in this plane exactly when it is some $a\\,v_1 + b\\,v_3$.</p>\n\n<p><strong>Sanity check via the nontrivial relation.</strong> Independence asks whether $c_1 v_1 + c_2 v_2 + c_3 v_3 = 0$ has a nonzero solution. From $v_2 = 2v_1$ we get $2 v_1 - 1\\cdot v_2 + 0 \\cdot v_3 = 0$ — weights $(2, -1, 0)$, not all zero. A nontrivial relation exists, confirming dependence. </p>\n\n<h3>6. Putting It Together</h3>\n<ul>\n<li><strong>Linear combination</strong>: weighted blend $c_1 v_1 + \\cdots + c_k v_k$. The atomic operation; $Ax$ is a combination of $A$'s columns.</li>\n<li><strong>Span</strong>: the set of all such blends — a flat through the origin whose dimension is the rank (point, line, plane, ..., all of $\\mathbb{R}^n$).</li>\n<li><strong>Independence</strong>: only the trivial combination gives $0$; equivalently no vector lies in the span of the rest. Test by row reduction — independent iff every column is a pivot (rank $=$ number of vectors).</li>\n<li><strong>Redundancy</strong>: free (non-pivot) columns are vectors rebuildable from the pivot columns; deleting them never shrinks the span.</li>\n</ul>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>These three ideas answer the two questions you will ask of <em>every</em> linear system and every dataset. \"What can I reach?\" is span (the <em>column space</em>, the range of a model). \"Did I bring any duplicate directions?\" is independence (rank, redundancy, conditioning). A matrix that is square, full-rank, and whose columns are independent is invertible — every $b$ is reached exactly once. When independence fails, solutions become non-unique and problems become ill-posed: precisely the failure mode that regularization, pseudoinverses, and dimensionality reduction are designed to tame.</p>\n</div>",
          "mcq": [
            {
              "q": "The vectors $v_1=\\begin{bmatrix}1\\\\2\\end{bmatrix}$, $v_2=\\begin{bmatrix}2\\\\4\\end{bmatrix}$, $v_3=\\begin{bmatrix}0\\\\1\\end{bmatrix}$ in $\\mathbb{R}^2$ are:",
              "choices": [
                "Linearly independent, spanning all of $\\mathbb{R}^2$",
                "Linearly dependent, but they still span all of $\\mathbb{R}^2$",
                "Linearly dependent, and they span only a line",
                "Independent, spanning only a line"
              ],
              "answer": 1,
              "explain": "Three vectors in $\\mathbb{R}^2$ ($k>n$) are always dependent ($v_2=2v_1$). But $v_1$ and $v_3$ are non-parallel, so the rank is 2 and the span is all of $\\mathbb{R}^2$."
            },
            {
              "q": "After row reducing a $4\\times 5$ matrix whose columns are five vectors in $\\mathbb{R}^4$, you find exactly 3 pivots. Which statement is correct?",
              "choices": [
                "The 5 vectors are independent and span $\\mathbb{R}^4$",
                "The vectors are dependent; their span is a 3-dimensional subspace and 2 columns are redundant",
                "The vectors are independent but span only a 3-dimensional subspace",
                "The vectors span $\\mathbb{R}^4$ but are dependent"
              ],
              "answer": 1,
              "explain": "Rank = 3 < 5 means dependent, with 2 free (redundant) columns. The span has dimension equal to the rank (3), so it is a 3D subspace, not all of $\\mathbb{R}^4$."
            },
            {
              "q": "Which condition is exactly equivalent to '$v_1,\\dots,v_k$ are linearly independent'?",
              "choices": [
                "At least one $v_i$ can be written as a combination of the others",
                "The equation $c_1v_1+\\cdots+c_kv_k=0$ forces every $c_i=0$",
                "Their span equals $\\mathbb{R}^n$",
                "None of the vectors is the zero vector"
              ],
              "answer": 1,
              "explain": "Independence is precisely 'only the trivial combination yields 0.' Option A is the definition of dependence; spanning $\\mathbb{R}^n$ and being nonzero are neither necessary nor sufficient for independence."
            },
            {
              "q": "In a linear regression feature matrix, one column equals 3 times another column. What is the consequence?",
              "choices": [
                "Nothing — regression handles it automatically with a unique answer",
                "The columns are linearly dependent, the matrix is rank-deficient, and the least-squares solution is not unique",
                "The span of the features increases, improving the fit",
                "The features become orthogonal"
              ],
              "answer": 1,
              "explain": "Perfect collinearity makes the columns dependent (rank-deficient), so the normal-equations matrix is singular and the optimal weights are not unique — hence feature pruning or regularization is needed."
            },
            {
              "q": "Using the 'columns view' of matrix-vector multiplication, what does the product $Ax$ represent?",
              "choices": [
                "A linear combination of the columns of $A$, with the entries of $x$ as the weights",
                "A linear combination of the rows of $A$, with the entries of $x$ as the weights",
                "The dot product of every column of $A$ with itself",
                "The span of the rows of $A$ scaled by $x$"
              ],
              "answer": 0,
              "explain": "The columns view states $Ax = x_1(\\text{col}_1) + x_2(\\text{col}_2) + \\cdots + x_n(\\text{col}_n)$, a linear combination of $A$'s columns weighted by the entries of $x$."
            },
            {
              "q": "Which of the following is NOT a permitted operation when forming a linear combination of vectors $v_1, \\dots, v_k$?",
              "choices": [
                "Scaling a vector by a negative number",
                "Multiplying two of the vectors together component-wise",
                "Adding two scaled vectors together",
                "Scaling a vector by zero"
              ],
              "answer": 1,
              "explain": "A linear combination only allows scaling each vector by a scalar (including negatives and zero) and adding the results; multiplying two vectors together component-wise is not part of the definition."
            },
            {
              "q": "What is the geometric meaning of $\\operatorname{span}\\{v_1, \\dots, v_k\\}$?",
              "choices": [
                "The single vector obtained by summing $v_1$ through $v_k$",
                "The set of all points reachable as linear combinations $c_1 v_1 + \\cdots + c_k v_k$",
                "The largest vector among $v_1, \\dots, v_k$ by length",
                "The set of weights $c_1, \\dots, c_k$ used in the combination"
              ],
              "answer": 1,
              "explain": "The span is precisely the set of all reachable points, i.e. all linear combinations $c_1 v_1 + \\cdots + c_k v_k$ of the given vectors."
            },
            {
              "q": "A single neuron computes $w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n + b$ before applying a nonlinearity. In the language of this lesson, the weights $w_i$ play the role of which quantity?",
              "choices": [
                "The vectors $v_i$ being combined",
                "The scalar coefficients $c_i$ in a linear combination",
                "The dimension $n$ of the space",
                "The nonlinearity applied after the combination"
              ],
              "answer": 1,
              "explain": "The pre-activation is a linear combination of the inputs $x_i$, so the weights $w_i$ are exactly the scalar coefficients $c_i$ (with $b$ as an added bias)."
            }
          ],
          "flashcards": [
            {
              "front": "Define a linear combination of $v_1,\\dots,v_k$.",
              "back": "Any vector of the form $c_1v_1+c_2v_2+\\cdots+c_kv_k$ where the $c_i$ are scalars (weights). Only scaling and addition are used."
            },
            {
              "front": "What is the span of a set of vectors?",
              "back": "The set of ALL their linear combinations: $\\{c_1v_1+\\cdots+c_kv_k : c_i\\in\\mathbb{R}\\}$. It is always a flat subspace through the origin (point, line, plane, ..., or all of $\\mathbb{R}^n$)."
            },
            {
              "front": "Definition of linear independence (algebraic form).",
              "back": "$v_1,\\dots,v_k$ are independent if $c_1v_1+\\cdots+c_kv_k=0$ has ONLY the trivial solution $c_1=\\cdots=c_k=0$. Any nonzero solution means dependent."
            },
            {
              "front": "Intuitive characterization of linear dependence.",
              "back": "At least one vector is a linear combination of the others (it lies in their span) — i.e. it is redundant and can be deleted without shrinking the span."
            },
            {
              "front": "How do you test independence by row reduction, and what does rank tell you?",
              "back": "Put the vectors as columns, row reduce, count pivots. Independent iff #pivots = #vectors. Rank (= #pivots) is the number of independent directions and the dimension of the span. Free columns are redundant vectors."
            },
            {
              "front": "Why must any $k$ vectors in $\\mathbb{R}^n$ with $k>n$ be dependent?",
              "back": "Row reduction gives at most $n$ pivots (one per row), so if $k>n$ there are fewer pivots than vectors — at least one column is free, forcing a nontrivial dependence relation."
            }
          ],
          "homework": [
            {
              "prompt": "Determine whether $v_1=\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$, $v_2=\\begin{bmatrix}0\\\\1\\\\1\\end{bmatrix}$, $v_3=\\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix}$ are linearly independent, and describe their span.",
              "hint": "Form the matrix with these as columns and row reduce; count pivots. Three pivots in $\\mathbb{R}^3$ means span is all of $\\mathbb{R}^3$.",
              "solution": "Matrix $A=\\begin{bmatrix}1&0&1\\\\1&1&0\\\\0&1&1\\end{bmatrix}$. Row reduce: $R_2\\leftarrow R_2-R_1$ gives row $(0,1,-1)$. Then $R_3\\leftarrow R_3-R_2$ gives $(0,0,2)$. Echelon form $\\begin{bmatrix}1&0&1\\\\0&1&-1\\\\0&0&2\\end{bmatrix}$ has pivots in all three columns. Rank = 3 = number of vectors, so the vectors are LINEARLY INDEPENDENT. Since there are 3 independent vectors in $\\mathbb{R}^3$, their span is ALL of $\\mathbb{R}^3$ (they form a basis). Equivalently, $c_1v_1+c_2v_2+c_3v_3=0$ forces $c_1=c_2=c_3=0$."
            },
            {
              "prompt": "Show that $w_1=\\begin{bmatrix}1\\\\2\\\\1\\end{bmatrix}$, $w_2=\\begin{bmatrix}3\\\\1\\\\2\\end{bmatrix}$, $w_3=\\begin{bmatrix}5\\\\5\\\\4\\end{bmatrix}$ are dependent, find an explicit dependence relation, and identify the redundant vector.",
              "hint": "Try to write $w_3$ as $a\\,w_1+b\\,w_2$; solve the resulting linear system from two coordinates and check the third.",
              "solution": "Seek $w_3=a\\,w_1+b\\,w_2$. The three coordinates give: $a+3b=5$ (row 1), $2a+b=5$ (row 2), $a+2b=4$ (row 3). Solve the first two: from row 2, $b=5-2a$; substitute into row 1: $a+3(5-2a)=5\\Rightarrow a+15-6a=5\\Rightarrow -5a=-10\\Rightarrow a=2$, hence $b=5-4=1$. Check the third coordinate: $a+2b=2+2=4$. ✓ So $w_3=2w_1+w_2$, giving the dependence relation $2w_1+w_2-w_3=0$ (nontrivial weights $(2,1,-1)$). The set is DEPENDENT, and $w_3$ is the redundant vector since it lies in $\\operatorname{span}\\{w_1,w_2\\}$. The span of all three equals the span of $w_1,w_2$ — a plane through the origin (rank 2)."
            },
            {
              "prompt": "Is $b=\\begin{bmatrix}4\\\\7\\end{bmatrix}$ in $\\operatorname{span}\\left\\{\\begin{bmatrix}1\\\\1\\end{bmatrix},\\begin{bmatrix}2\\\\3\\end{bmatrix}\\right\\}$? If so, give the weights.",
              "hint": "Membership in a span = solvability of $c_1v_1+c_2v_2=b$. Row reduce the augmented matrix or solve the $2\\times2$ system directly.",
              "solution": "Solve $c_1\\begin{bmatrix}1\\\\1\\end{bmatrix}+c_2\\begin{bmatrix}2\\\\3\\end{bmatrix}=\\begin{bmatrix}4\\\\7\\end{bmatrix}$, i.e. $c_1+2c_2=4$ and $c_1+3c_2=7$. Subtract the first from the second: $c_2=3$. Then $c_1=4-2(3)=-2$. So $b=-2\\,v_1+3\\,v_2$ — YES, $b$ is in the span, with weights $(c_1,c_2)=(-2,3)$. (Since $v_1,v_2$ are independent they span all of $\\mathbb{R}^2$, so every $b$ is reachable, and the weights are unique.)"
            }
          ],
          "examples": [
            {
              "title": "Writing a Vector as a Linear Combination",
              "body": "In $\\mathbb{R}^2$, let $v_1 = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$ and $v_2 = \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}$. Express the vector $b = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix}$ as a linear combination $c_1 v_1 + c_2 v_2$, or explain why it is impossible.",
              "solution": "We need scalars $c_1, c_2$ with $c_1 v_1 + c_2 v_2 = b$. Writing this out coordinate by coordinate:\n\n$$ c_1 \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + c_2 \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} c_1 + 3c_2 \\\\ 2c_1 + c_2 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix}. $$\n\nThis is exactly the linear system\n\n$$ \\begin{cases} c_1 + 3c_2 = 5 \\\\ 2c_1 + c_2 = 5 \\end{cases} $$\n\n**Step 1 — solve.** From the first equation, $c_1 = 5 - 3c_2$. Substitute into the second:\n\n$$ 2(5 - 3c_2) + c_2 = 5 \\;\\Longrightarrow\\; 10 - 6c_2 + c_2 = 5 \\;\\Longrightarrow\\; -5c_2 = -5 \\;\\Longrightarrow\\; c_2 = 1. $$\n\nThen $c_1 = 5 - 3(1) = 2$.\n\n**Step 2 — verify.** Plug the weights back in:\n\n$$ 2\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + 1\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} + \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix} = b. \\checkmark $$\n\n**Conclusion.** Yes, $b$ is a linear combination of $v_1$ and $v_2$, with weights $c_1 = 2$ and $c_2 = 1$:\n\n$$ b = 2v_1 + v_2. $$\n\nNote that a unique solution existed because $v_1$ and $v_2$ point in different directions (they are not scalar multiples of each other), so they span all of $\\mathbb{R}^2$ — every target $b$ can be reached, and in exactly one way."
            },
            {
              "title": "Testing Linear Independence and Finding a Dependence Relation",
              "body": "Determine whether the vectors $v_1 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 2 \\end{bmatrix}$, $v_2 = \\begin{bmatrix} 2 \\\\ 0 \\\\ 2 \\end{bmatrix}$, $v_3 = \\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix}$ in $\\mathbb{R}^3$ are linearly independent. If they are dependent, exhibit an explicit dependence relation and state the dimension of their span.",
              "solution": "By definition, the vectors are **linearly independent** if the only solution to\n\n$$ x_1 v_1 + x_2 v_2 + x_3 v_3 = \\mathbf{0} $$\n\nis $x_1 = x_2 = x_3 = 0$. If a nonzero solution exists, they are **dependent**. Coordinate by coordinate this gives the homogeneous system\n\n$$ \\begin{cases} x_1 + 2x_2 + x_3 = 0 \\\\ x_1 + 0x_2 + 3x_3 = 0 \\\\ 2x_1 + 2x_2 + 4x_3 = 0 \\end{cases} $$\n\n**Step 1 — row reduce.** Form the coefficient matrix (columns are $v_1, v_2, v_3$):\n\n$$ A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 1 & 0 & 3 \\\\ 2 & 2 & 4 \\end{bmatrix}. $$\n\nReplace $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - 2R_1$:\n\n$$ \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & -2 & 2 \\\\ 0 & -2 & 2 \\end{bmatrix}. $$\n\nNow $R_3 \\to R_3 - R_2$:\n\n$$ \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & -2 & 2 \\\\ 0 & 0 & 0 \\end{bmatrix}. $$\n\n**Step 2 — interpret.** There are only **2 pivots** (columns 1 and 2) and a row of zeros, so column 3 is a free variable. A nonzero solution exists, hence the vectors are **linearly dependent**.\n\n**Step 3 — find the relation.** Let $x_3 = t$ be free. From row 2: $-2x_2 + 2x_3 = 0 \\Rightarrow x_2 = x_3 = t$. From row 1: $x_1 + 2x_2 + x_3 = 0 \\Rightarrow x_1 = -2t - t = -3t$. Choosing $t = -1$ gives the clean integer solution $(x_1, x_2, x_3) = (3, -1, -1)$, i.e.\n\n$$ 3v_1 - v_2 - v_3 = \\mathbf{0}. $$\n\n**Step 4 — verify.** Compute componentwise:\n\n$$ 3\\begin{bmatrix} 1 \\\\ 1 \\\\ 2 \\end{bmatrix} - \\begin{bmatrix} 2 \\\\ 0 \\\\ 2 \\end{bmatrix} - \\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 3 - 2 - 1 \\\\ 3 - 0 - 3 \\\\ 6 - 2 - 4 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix}. \\checkmark $$\n\n**Conclusion.** The vectors are linearly dependent; one dependence relation is $3v_1 - v_2 - v_3 = 0$, equivalently $v_3 = 3v_1 - v_2$, so $v_3$ is redundant. Since the row-reduced matrix has 2 pivots, the span has **dimension 2** — these three vectors all lie in a single plane through the origin in $\\mathbb{R}^3$."
            }
          ]
        },
        {
          "id": "la-basis-dimension",
          "title": "Basis, Coordinates, and Dimension",
          "minutes": 16,
          "content": "<h3>Why \"basis\" is the central idea of linear algebra</h3>\n<p>So far you've met two notions that pull in opposite directions. <strong>Spanning</strong> asks: do these vectors reach everywhere? A spanning set might be wastefully large. <strong>Linear independence</strong> asks: is any vector redundant? An independent set might be too small to reach everywhere. A <strong>basis</strong> is the perfect compromise — the Goldilocks set that is simultaneously big enough to span and small enough to have no redundancy.</p>\n<p>Once you fix a basis, every vector in the space gets a unique address: its list of <strong>coordinates</strong>. This is the moment abstract vectors turn into concrete columns of numbers you can feed to a computer. Every time you store a word embedding, a pixel array, or a layer's activations as a tuple of floats, you are silently committing to a basis.</p>\n\n<h3>Definition: what a basis is</h3>\n<p>Let $V$ be a vector space (think $\\mathbb{R}^n$ if you like). A set of vectors $B = \\{v_1, v_2, \\dots, v_k\\}$ is a <strong>basis</strong> for $V$ if it satisfies both conditions:</p>\n<ol>\n<li><strong>Spanning:</strong> $\\operatorname{span}(B) = V$. Every vector in $V$ can be written as a linear combination of the $v_i$.</li>\n<li><strong>Linear independence:</strong> the only solution to $c_1 v_1 + \\cdots + c_k v_k = \\mathbf{0}$ is $c_1 = \\cdots = c_k = 0$. No vector is redundant.</li>\n</ol>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Spanning is \"enough vectors to reach every point.\" Independence is \"no wasted vectors.\" A basis is the unique balance point: drop one vector and you lose the ability to reach everything; add one and you create redundancy. It is a minimal spanning set <em>and</em> a maximal independent set at the same time.</p></div>\n\n<h4>The defining property: unique coordinates</h4>\n<p>The two conditions combine into one clean theorem, which is the real reason bases matter.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>$B = \\{v_1, \\dots, v_n\\}$ is a basis of $V$ <strong>if and only if</strong> every vector $x \\in V$ can be written as a linear combination of the $v_i$ in <strong>exactly one way</strong>.</p></div>\n<p>Why does uniqueness follow from the two conditions? <em>Existence</em> of a representation is just spanning. For <em>uniqueness</em>, suppose a vector had two representations:</p>\n$$x = \\sum_i c_i v_i \\quad \\text{and} \\quad x = \\sum_i d_i v_i.$$\n<p>Subtracting gives $\\sum_i (c_i - d_i) v_i = \\mathbf{0}$. By independence every coefficient must vanish, so $c_i = d_i$ for all $i$. The two representations were the same all along. Conversely, if representations are always unique, then in particular $\\mathbf{0}$ has only the trivial representation — which is exactly independence — and existence of representations is spanning. The biconditional is tight.</p>\n\n<h3>Coordinates: turning a vector into a list of numbers</h3>\n<p>Fix an <strong>ordered</strong> basis $B = (v_1, \\dots, v_n)$ (order matters now, because we want the numbers in a definite slot order). For $x \\in V$, the unique scalars $c_1, \\dots, c_n$ with</p>\n$$x = c_1 v_1 + c_2 v_2 + \\cdots + c_n v_n$$\n<p>are the <strong>coordinates of $x$ relative to $B$</strong>. We collect them into the <strong>coordinate vector</strong></p>\n$$[x]_B = \\begin{bmatrix} c_1 \\\\ c_2 \\\\ \\vdots \\\\ c_n \\end{bmatrix}.$$\n<p>This is a genuine dictionary between the abstract space $V$ and the concrete column space $\\mathbb{R}^n$. It respects the vector-space operations: $[x + y]_B = [x]_B + [y]_B$ and $[\\alpha x]_B = \\alpha [x]_B$. In the language you'll meet later, the map $x \\mapsto [x]_B$ is a linear <strong>isomorphism</strong> $V \\to \\mathbb{R}^n$. Any $n$-dimensional real vector space is, structurally, just $\\mathbb{R}^n$ wearing a costume; choosing a basis removes the costume.</p>\n\n<h4>The standard basis</h4>\n<p>In $\\mathbb{R}^n$ there is one basis so natural we usually forget we're using it: the <strong>standard basis</strong> $\\{e_1, \\dots, e_n\\}$ where $e_i$ has a $1$ in slot $i$ and $0$ everywhere else. In $\\mathbb{R}^3$:</p>\n$$e_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix},\\quad e_2 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix},\\quad e_3 = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}.$$\n<p>For the standard basis, a vector <em>is</em> its own coordinate vector: $\\begin{bmatrix} 4 \\\\ -2 \\\\ 7 \\end{bmatrix} = 4 e_1 - 2 e_2 + 7 e_3$, so $[x]_E = x$. The numbers you usually write down for a vector are already coordinates — you just never had to choose, because the standard basis was the default. The whole subject of <em>change of basis</em> exists precisely because other bases give the same vector different coordinates.</p>\n\n<h3>Worked example: are these a basis, and what are the coordinates?</h3>\n<p><strong>Problem.</strong> In $\\mathbb{R}^2$, let $v_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ and $v_2 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$. (a) Show $B = (v_1, v_2)$ is a basis. (b) Find the coordinates of $x = \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix}$ relative to $B$.</p>\n\n<h4>(a) Is it a basis?</h4>\n<p>Put the vectors as columns of a matrix and check the determinant (for a square matrix, nonzero determinant means the columns are independent <em>and</em> spanning, hence a basis):</p>\n$$A = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix},\\qquad \\det A = (1)(-1) - (1)(1) = -2 \\neq 0.$$\n<p>Since $\\det A \\neq 0$, the columns are linearly independent and span $\\mathbb{R}^2$. So $B$ is a basis. (Notice we also used a fact we'll justify below: two vectors are exactly the right count for a basis of $\\mathbb{R}^2$.)</p>\n\n<h4>(b) The coordinates</h4>\n<p>We need scalars $c_1, c_2$ with $c_1 v_1 + c_2 v_2 = x$, i.e. solve $A\\, [x]_B = x$:</p>\n$$\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix}.$$\n<p>The equations are $c_1 + c_2 = 5$ and $c_1 - c_2 = 1$. Adding: $2c_1 = 6 \\Rightarrow c_1 = 3$. Then $c_2 = 5 - 3 = 2$. So</p>\n$$[x]_B = \\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix}, \\qquad \\text{check: } 3\\begin{bmatrix}1\\\\1\\end{bmatrix} + 2\\begin{bmatrix}1\\\\-1\\end{bmatrix} = \\begin{bmatrix}5\\\\1\\end{bmatrix}.\\ \\checkmark$$\n<p>The same arrow in the plane that has standard coordinates $(5,1)$ has coordinates $(3,2)$ in the basis $B$. Same vector, different address — because we changed the rulers. Formally, $[x]_B = A^{-1} x$: the matrix whose columns are the basis vectors converts coordinates <em>back</em> to standard, so its inverse converts standard coordinates <em>into</em> the new basis.</p>\n\n<h3>Dimension: an invariant, not an accident</h3>\n<p>A space can have infinitely many different bases (we just saw two for $\\mathbb{R}^2$: the standard one and $\\{v_1, v_2\\}$). The remarkable fact is that they all have the <strong>same number of vectors</strong>. That common number is the <strong>dimension</strong> of the space, written $\\dim V$.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p><strong>Dimension is well-defined.</strong> Any two bases of the same vector space have the same number of elements. So $\\dim V$ depends only on $V$, not on which basis you happened to pick.</p></div>\n\n<h4>Why every basis has the same size</h4>\n<p>The whole thing rests on one workhorse lemma, sometimes called the <strong>Steinitz exchange lemma</strong> or just the counting lemma:</p>\n<p style=\"margin-left:1.5em\"><em>If a set of $m$ vectors spans $V$, then any linearly independent set in $V$ has at most $m$ vectors.</em></p>\n<p>In one sentence: <strong>independent $\\le$ spanning</strong>. The intuition is a counting argument. A spanning set of size $m$ means every vector is a combination of $m$ \"ingredients.\" If you had $m+1$ supposedly independent vectors, writing each in terms of the $m$ ingredients gives you a homogeneous linear system with more unknowns ($m+1$) than equations ($m$). Such a system always has a nontrivial solution — which is exactly a nontrivial linear dependence among your $m+1$ vectors. Contradiction. So you can never have more independent vectors than spanning vectors.</p>\n<p>Now suppose $B_1$ and $B_2$ are both bases, with $|B_1| = m$ and $|B_2| = n$.</p>\n<ul>\n<li>$B_1$ spans and $B_2$ is independent, so by the lemma $n \\le m$.</li>\n<li>$B_2$ spans and $B_1$ is independent, so by the lemma $m \\le n$.</li>\n</ul>\n<p>Therefore $m = n$. Both inequalities come from the same lemma applied with the roles swapped, and they squeeze the sizes to be equal. That is the entire proof that dimension is well-defined.</p>\n<p>Examples: $\\dim \\mathbb{R}^n = n$ (the standard basis has $n$ vectors). A line through the origin has dimension $1$; a plane through the origin has dimension $2$. The space of $2\\times 2$ matrices has dimension $4$; polynomials of degree $\\le 3$ form a $4$-dimensional space with basis $\\{1, t, t^2, t^3\\}$.</p>\n\n<h4>Two shortcuts you'll use constantly</h4>\n<p>Once you <em>know</em> $\\dim V = n$, checking \"is this set a basis?\" gets dramatically cheaper. You no longer need to verify both conditions:</p>\n<ul>\n<li>If a set has exactly $n$ vectors and is <strong>linearly independent</strong>, it is automatically a basis (it can't be too small to span, and an independent set can always be extended to a basis — but it's already maximal).</li>\n<li>If a set has exactly $n$ vectors and <strong>spans</strong> $V$, it is automatically a basis (any spanning set can be trimmed to a basis, but it's already minimal).</li>\n<li>A set with <strong>more than $n$</strong> vectors is automatically dependent; a set with <strong>fewer than $n$</strong> vectors cannot span. So a basis of an $n$-dimensional space must have <em>exactly</em> $n$ vectors — getting the count right is necessary, and for the right count you only need to check <em>one</em> of the two conditions.</li>\n</ul>\n<p>This is why the determinant trick worked in the worked example: for $n$ vectors in $\\mathbb{R}^n$, a nonzero determinant of the matrix of columns certifies independence, and the count is automatically right, so it's a basis.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture for ML / AI</div><p>Dimension is the honest count of \"independent degrees of freedom\" in your data, and it is the gap between the size of a representation and its true information content. A dataset stored as $1000$-dimensional vectors may actually lie near a $20$-dimensional subspace — <strong>PCA</strong> finds an orthonormal basis ordered by variance and keeps the top few coordinates, throwing away directions that carry little signal. <strong>Embeddings</strong> are deliberate low-dimensional coordinate systems for words or images. The <em>rank</em> of a weight matrix is the dimension of its output span, which is why <strong>low-rank adaptation (LoRA)</strong> can fine-tune giant models cheaply: it constrains updates to a low-dimensional subspace. And the \"curse of dimensionality\" is, at bottom, a statement about how volume and distance behave as $\\dim$ grows. Every one of these ideas is \"basis, coordinates, and dimension\" in applied clothing.</p></div>\n\n<h3>Common pitfalls</h3>\n<ul>\n<li><strong>\"More vectors = better spanning.\"</strong> Extra vectors don't help reach more of the space once you already span; they only destroy independence. A basis is minimal on purpose.</li>\n<li><strong>Confusing a vector with its coordinates.</strong> $[x]_B$ is a list of numbers <em>relative to a chosen basis</em>. The same geometric vector has different coordinate vectors in different bases. Only with the standard basis do \"the vector\" and \"its coordinates\" coincide.</li>\n<li><strong>Forgetting the count.</strong> Three independent vectors in $\\mathbb{R}^4$ are <em>not</em> a basis — they're independent but don't span. The dimension tells you the magic number; matching it is mandatory.</li>\n<li><strong>Order amnesia.</strong> Coordinates require an <em>ordered</em> basis. Permuting the basis vectors permutes the entries of every coordinate vector.</li>\n</ul>\n\n<h3>Summary</h3>\n<ul>\n<li>A <strong>basis</strong> is a linearly independent spanning set — minimal spanning and maximal independent at once.</li>\n<li>Equivalently, a basis is exactly a set giving every vector a <strong>unique</strong> representation; those unique scalars are its <strong>coordinates</strong> $[x]_B$.</li>\n<li>The <strong>standard basis</strong> $\\{e_i\\}$ makes a vector equal to its own coordinates; other bases relabel the same vectors via $[x]_B = A^{-1}x$.</li>\n<li><strong>Dimension</strong> is the common size of all bases, well-defined because <em>independent $\\le$ spanning</em> forces every basis to the same count.</li>\n<li>Knowing the dimension turns basis-checking into a one-condition test on the right number of vectors.</li>\n</ul>",
          "mcq": [
            {
              "q": "A set $S$ of vectors in $\\mathbb{R}^5$ has $4$ vectors and is linearly independent. Which statement is correct?",
              "choices": [
                "$S$ is a basis of $\\mathbb{R}^5$",
                "$S$ spans $\\mathbb{R}^5$ but is not independent",
                "$S$ is not a basis of $\\mathbb{R}^5$ because it cannot span",
                "$S$ has too many vectors to be independent"
              ],
              "answer": 2,
              "explain": "A basis of $\\mathbb{R}^5$ needs exactly $5$ vectors. With only $4$, $S$ cannot span $\\mathbb{R}^5$, so despite being independent it is not a basis."
            },
            {
              "q": "Which property is the precise reason a basis gives every vector $x$ a UNIQUE coordinate vector $[x]_B$?",
              "choices": [
                "Spanning alone guarantees uniqueness",
                "Linear independence forces any two representations of $x$ to be identical",
                "Orthogonality of the basis vectors",
                "The basis vectors all have length 1"
              ],
              "answer": 1,
              "explain": "If $\\sum c_i v_i = \\sum d_i v_i$ then $\\sum (c_i-d_i)v_i = 0$, and independence forces every $c_i = d_i$. Spanning only gives existence, not uniqueness."
            },
            {
              "q": "Why do all bases of a finite-dimensional space $V$ have the same number of vectors?",
              "choices": [
                "Because every vector space has a unique basis",
                "Because any independent set is no larger than any spanning set, applied both ways",
                "Because the standard basis is always the smallest",
                "Because determinants are basis-independent"
              ],
              "answer": 1,
              "explain": "The exchange lemma gives 'independent $\\le$ spanning.' Applying it to two bases $B_1,B_2$ yields $|B_2|\\le|B_1|$ and $|B_1|\\le|B_2|$, forcing equality."
            },
            {
              "q": "Let $B=(v_1,v_2)$ with $v_1=\\begin{bmatrix}2\\\\0\\end{bmatrix}$, $v_2=\\begin{bmatrix}0\\\\3\\end{bmatrix}$. What is $[x]_B$ for $x=\\begin{bmatrix}6\\\\3\\end{bmatrix}$?",
              "choices": [
                "$\\begin{bmatrix}6\\\\3\\end{bmatrix}$",
                "$\\begin{bmatrix}3\\\\1\\end{bmatrix}$",
                "$\\begin{bmatrix}12\\\\9\\end{bmatrix}$",
                "$\\begin{bmatrix}1\\\\3\\end{bmatrix}$"
              ],
              "answer": 1,
              "explain": "We need $c_1\\cdot 2 = 6$ and $c_2\\cdot 3 = 3$, so $c_1=3$, $c_2=1$. The coordinates differ from the standard-coordinate entries $(6,3)$ because $B$ is not the standard basis."
            },
            {
              "q": "Let $A$ be the matrix whose columns are the vectors of an ordered basis $B=(v_1,\\dots,v_n)$ of $\\mathbb{R}^n$. Which formula recovers the coordinate vector $[x]_B$ from the standard-coordinate vector $x$?",
              "choices": [
                "$[x]_B = A x$",
                "$[x]_B = A^{-1} x$",
                "$[x]_B = A^{\\top} x$",
                "$[x]_B = x$ always"
              ],
              "answer": 1,
              "explain": "The columns of $A$ convert $B$-coordinates back to standard ones via $x = A[x]_B$, so inverting gives $[x]_B = A^{-1}x$; $[x]_B = x$ holds only when $A=I$, i.e. the standard basis."
            },
            {
              "q": "What is the dimension of the vector space $P_3$ of polynomials of degree at most $3$ (e.g. $a + bt + ct^2 + dt^3$)?",
              "choices": [
                "$3$",
                "$4$",
                "Infinite, since polynomials can be evaluated at infinitely many points"
              ],
              "answer": 1,
              "explain": "The set $\\{1, t, t^2, t^3\\}$ is a basis with $4$ elements, so $\\dim P_3 = 4$ even though it is not literally $\\mathbb{R}^4$."
            },
            {
              "q": "You are told that $\\dim V = 5$ and you are handed a set $S$ of exactly $5$ vectors in $V$. To prove $S$ is a basis, what is the minimal sufficient check?",
              "choices": [
                "Verify both that $S$ is linearly independent and that $S$ spans $V$",
                "Verify just one of the two: that $S$ is linearly independent, OR that $S$ spans $V$",
                "Verify that the vectors of $S$ are mutually orthogonal",
                "Nothing to check: any $5$ vectors in a $5$-dimensional space form a basis"
              ],
              "answer": 1,
              "explain": "When the count already equals the dimension, independence and spanning become equivalent, so checking either one alone certifies a basis; but five arbitrary vectors can still fail (e.g. if two coincide), ruling out the 'nothing to check' option."
            },
            {
              "q": "A student computes that a vector $x$ has coordinate vector $[x]_B = \\begin{bmatrix}3\\\\2\\end{bmatrix}$ in an ordered basis $B=(v_1,v_2)$. If we reorder the basis to $B'=(v_2,v_1)$, what is $[x]_{B'}$?",
              "choices": [
                "$\\begin{bmatrix}3\\\\2\\end{bmatrix}$ — reordering the basis does not change coordinates",
                "$\\begin{bmatrix}2\\\\3\\end{bmatrix}$ — the entries swap with the basis vectors",
                "$\\begin{bmatrix}-3\\\\-2\\end{bmatrix}$ — reordering negates the coordinates"
              ],
              "answer": 1,
              "explain": "Since $x = 3v_1 + 2v_2 = 2v_2 + 3v_1$, coordinates are tied to an ordered basis, so permuting the basis vectors permutes the corresponding coordinate entries: $[x]_{B'} = \\begin{bmatrix}2\\\\3\\end{bmatrix}$."
            }
          ],
          "flashcards": [
            {
              "front": "Define a basis of a vector space $V$.",
              "back": "A set that is (1) linearly independent and (2) spans $V$. Equivalently: a minimal spanning set / maximal independent set, giving every vector a unique representation."
            },
            {
              "front": "What are the coordinates $[x]_B$ of $x$ relative to an ordered basis $B=(v_1,\\dots,v_n)$?",
              "back": "The unique scalars $c_1,\\dots,c_n$ with $x = c_1 v_1 + \\cdots + c_n v_n$, stacked as a column vector. Unique because $B$ is independent."
            },
            {
              "front": "What makes coordinates unique, and what guarantees they exist?",
              "back": "Existence comes from spanning; uniqueness comes from linear independence. Both together = basis."
            },
            {
              "front": "Define the dimension of $V$ and why it is well-defined.",
              "back": "$\\dim V$ = the number of vectors in any basis. Well-defined because 'independent $\\le$ spanning' (exchange lemma) forces all bases to the same size."
            },
            {
              "front": "Shortcut: testing whether $n$ vectors form a basis of an $n$-dimensional space.",
              "back": "You only need ONE condition: if the $n$ vectors are independent (or if they span), they are automatically a basis. In $\\mathbb{R}^n$, $\\det\\neq 0$ of the column matrix certifies it."
            },
            {
              "front": "What is special about the standard basis $\\{e_1,\\dots,e_n\\}$ of $\\mathbb{R}^n$?",
              "back": "Each $e_i$ has a 1 in slot $i$ and 0 elsewhere; a vector equals its own coordinate vector, $[x]_E = x$. For a general basis with column matrix $A$, $[x]_B = A^{-1}x$."
            }
          ],
          "homework": [
            {
              "prompt": "Determine whether $B=\\left\\{\\begin{bmatrix}1\\\\2\\\\3\\end{bmatrix}, \\begin{bmatrix}0\\\\1\\\\4\\end{bmatrix}, \\begin{bmatrix}5\\\\6\\\\0\\end{bmatrix}\\right\\}$ is a basis of $\\mathbb{R}^3$.",
              "hint": "There are exactly $3$ vectors in $\\mathbb{R}^3$, so you only need to check one condition. Use the determinant of the matrix whose columns are these vectors.",
              "solution": "Form $A=\\begin{bmatrix}1&0&5\\\\2&1&6\\\\3&4&0\\end{bmatrix}$. Expand along the first row: $\\det A = 1\\cdot\\det\\begin{bmatrix}1&6\\\\4&0\\end{bmatrix} - 0 + 5\\cdot\\det\\begin{bmatrix}2&1\\\\3&4\\end{bmatrix}$. The first minor is $(1)(0)-(6)(4) = -24$; the third minor is $(2)(4)-(1)(3) = 5$. So $\\det A = 1(-24) + 5(5) = -24 + 25 = 1 \\neq 0$. Since the determinant is nonzero, the three columns are linearly independent, and three independent vectors in the $3$-dimensional space $\\mathbb{R}^3$ automatically form a basis. So YES, $B$ is a basis."
            },
            {
              "prompt": "Using the basis $B=(v_1,v_2)$ with $v_1=\\begin{bmatrix}1\\\\1\\end{bmatrix}$, $v_2=\\begin{bmatrix}1\\\\-1\\end{bmatrix}$ from the lesson, find $[x]_B$ for $x=\\begin{bmatrix}0\\\\4\\end{bmatrix}$, then verify your answer.",
              "hint": "Solve $c_1 v_1 + c_2 v_2 = x$, i.e. the system $c_1+c_2=0$, $c_1-c_2=4$. Or use $[x]_B = A^{-1}x$.",
              "solution": "We need $c_1+c_2 = 0$ and $c_1 - c_2 = 4$. Adding the equations: $2c_1 = 4 \\Rightarrow c_1 = 2$. Then $c_2 = -c_1 = -2$. So $[x]_B = \\begin{bmatrix}2\\\\-2\\end{bmatrix}$. Verify: $2\\begin{bmatrix}1\\\\1\\end{bmatrix} + (-2)\\begin{bmatrix}1\\\\-1\\end{bmatrix} = \\begin{bmatrix}2-2\\\\2+2\\end{bmatrix} = \\begin{bmatrix}0\\\\4\\end{bmatrix} = x.$ Correct. (Equivalently, $A^{-1}=\\frac{1}{-2}\\begin{bmatrix}-1&-1\\\\-1&1\\end{bmatrix}$, and $A^{-1}\\begin{bmatrix}0\\\\4\\end{bmatrix}=\\begin{bmatrix}2\\\\-2\\end{bmatrix}$.)"
            },
            {
              "prompt": "Prove that any $4$ vectors in $\\mathbb{R}^3$ must be linearly dependent, citing the relevant counting principle.",
              "hint": "What is a spanning set of $\\mathbb{R}^3$ of known size, and what does the exchange lemma ('independent $\\le$ spanning') say?",
              "solution": "The standard basis $\\{e_1,e_2,e_3\\}$ spans $\\mathbb{R}^3$ and has $3$ elements, so $\\mathbb{R}^3$ has a spanning set of size $3$. By the exchange (counting) lemma, any linearly independent set in $\\mathbb{R}^3$ has at most $3$ vectors. A set of $4$ vectors exceeds this bound, so it cannot be linearly independent; therefore it must be linearly dependent. Equivalently: writing the $4$ vectors as columns of a $3\\times 4$ matrix gives a homogeneous system $Ac=0$ with $4$ unknowns and only $3$ equations, which has more unknowns than equations and hence a nontrivial solution — a nontrivial dependence relation. Since $\\dim\\mathbb{R}^3 = 3$, any set with more than $3$ vectors is automatically dependent."
            }
          ],
          "examples": [
            {
              "title": "Finding coordinates in a non-standard basis of $\\mathbb{R}^2$",
              "body": "The set $B = \\{v_1, v_2\\}$ with $v_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ and $v_2 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$ is a basis of $\\mathbb{R}^2$. Find the coordinate vector $[x]_B$ of $x = \\begin{bmatrix} 7 \\\\ 4 \\end{bmatrix}$ with respect to $B$.",
              "solution": "Finding coordinates means solving for the unique scalars $c_1, c_2$ such that $x = c_1 v_1 + c_2 v_2$. (Uniqueness is guaranteed precisely because $B$ is a basis.)\n\n**Set up the linear combination.**\n$$c_1 \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + c_2 \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 4 \\end{bmatrix}.$$\nReading off each component gives the system\n$$\\begin{cases} c_1 + c_2 = 7 \\\\ c_1 - c_2 = 4. \\end{cases}$$\n\n**Solve the system.** Add the two equations to eliminate $c_2$:\n$$2c_1 = 11 \\quad\\Longrightarrow\\quad c_1 = \\frac{11}{2}.$$\nSubstitute back into $c_1 + c_2 = 7$:\n$$c_2 = 7 - \\frac{11}{2} = \\frac{3}{2}.$$\n\n**Verify.**\n$$\\frac{11}{2}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + \\frac{3}{2}\\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} \\tfrac{11}{2} + \\tfrac{3}{2} \\\\ \\tfrac{11}{2} - \\tfrac{3}{2} \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 4 \\end{bmatrix}. \\checkmark$$\n\n**Result.** The coordinate vector is\n$$[x]_B = \\begin{bmatrix} \\tfrac{11}{2} \\\\ \\tfrac{3}{2} \\end{bmatrix}.$$\nNote that the *same* vector $x$ has the address $(7,4)$ in the standard basis but the address $\\left(\\tfrac{11}{2}, \\tfrac{3}{2}\\right)$ in $B$. The vector is unchanged; only its coordinates depend on the chosen basis."
            },
            {
              "title": "Verifying a basis of $\\mathbb{R}^3$ and computing coordinates",
              "body": "Consider the three vectors $v_1 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}$, $v_2 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 1 \\end{bmatrix}$, $v_3 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix}$ in $\\mathbb{R}^3$.\n\n(a) Show that $B = \\{v_1, v_2, v_3\\}$ is a basis of $\\mathbb{R}^3$.\n(b) Find the coordinates of $x = \\begin{bmatrix} 3 \\\\ 4 \\\\ 5 \\end{bmatrix}$ with respect to $B$.",
              "solution": "**(a) Is $B$ a basis?** Place the three vectors as the columns of a matrix:\n$$A = \\begin{bmatrix} 1 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ 0 & 1 & 1 \\end{bmatrix}.$$\nFor three vectors in $\\mathbb{R}^3$ (a space of dimension $3$), being linearly independent is equivalent to spanning, and both hold exactly when $\\det A \\neq 0$. Expand along the first row:\n$$\\det A = 1\\cdot\\det\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix} - 0\\cdot(\\cdots) + 1\\cdot\\det\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}.$$\n$$\\det A = 1\\cdot(1\\cdot 1 - 0\\cdot 1) + 1\\cdot(1\\cdot 1 - 1\\cdot 0) = 1 + 1 = 2.$$\nSince $\\det A = 2 \\neq 0$, the columns are linearly independent. Three independent vectors in $3$-dimensional $\\mathbb{R}^3$ automatically span it, so $B$ is a basis. $\\checkmark$\n\n**(b) Finding the coordinates.** We solve $c_1 v_1 + c_2 v_2 + c_3 v_3 = x$, i.e. $A\\,c = x$, which is the system\n$$\\begin{cases} c_1 + c_3 = 3 \\\\ c_1 + c_2 = 4 \\\\ c_2 + c_3 = 5. \\end{cases}$$\nForm the augmented matrix and row reduce:\n$$\\left[\\begin{array}{ccc|c} 1 & 0 & 1 & 3 \\\\ 1 & 1 & 0 & 4 \\\\ 0 & 1 & 1 & 5 \\end{array}\\right] \\xrightarrow{R_2 \\to R_2 - R_1} \\left[\\begin{array}{ccc|c} 1 & 0 & 1 & 3 \\\\ 0 & 1 & -1 & 1 \\\\ 0 & 1 & 1 & 5 \\end{array}\\right].$$\nNow eliminate the second column from row 3:\n$$\\xrightarrow{R_3 \\to R_3 - R_2} \\left[\\begin{array}{ccc|c} 1 & 0 & 1 & 3 \\\\ 0 & 1 & -1 & 1 \\\\ 0 & 0 & 2 & 4 \\end{array}\\right].$$\n**Back-substitute.** From row 3: $2c_3 = 4 \\Rightarrow c_3 = 2$. From row 2: $c_2 - c_3 = 1 \\Rightarrow c_2 = 1 + 2 = 3$. From row 1: $c_1 + c_3 = 3 \\Rightarrow c_1 = 3 - 2 = 1$.\n\n**Verify.**\n$$1\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix} + 3\\begin{bmatrix} 0 \\\\ 1 \\\\ 1 \\end{bmatrix} + 2\\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1+0+2 \\\\ 1+3+0 \\\\ 0+3+2 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 4 \\\\ 5 \\end{bmatrix}. \\checkmark$$\n\n**Result.**\n$$[x]_B = \\begin{bmatrix} 1 \\\\ 3 \\\\ 2 \\end{bmatrix}.$$\nBecause $\\det A \\neq 0$ guaranteed a basis, this solution is the *only* one — the coordinates are unique, exactly as the key theorem promises. (Since $B$ has $3$ vectors and is a basis, this also confirms $\\dim \\mathbb{R}^3 = 3$: every basis of a space has the same number of elements.)"
            }
          ]
        }
      ]
    },
    {
      "id": "la-matrices",
      "title": "Matrices and Linear Maps",
      "lessons": [
        {
          "id": "la-matrices-as-transformations",
          "title": "Matrices as Linear Transformations",
          "minutes": 18,
          "content": "<h3>A matrix is a function</h3>\n<p>You have probably met a matrix as a rectangular grid of numbers, and matrix multiplication as a clunky rule you memorize. That picture is correct but spiritually empty. The honest way to understand a matrix is this: <strong>a matrix is a function that takes a vector in and gives a vector out.</strong> It is a machine. You feed it $\\mathbf{x}$, it returns $A\\mathbf{x}$.</p>\n<p>An $m \\times n$ matrix $A$ defines a map</p>\n$$ T_A : \\mathbb{R}^n \\to \\mathbb{R}^m, \\qquad T_A(\\mathbf{x}) = A\\mathbf{x}. $$\n<p>The number of <em>columns</em> $n$ is the dimension of the input space; the number of <em>rows</em> $m$ is the dimension of the output space. A $2\\times 3$ matrix eats 3D vectors and spits out 2D vectors. This is the first thing to internalize: a matrix is not a static table, it is an <strong>action</strong>.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Stop reading $A\\mathbf{x}$ as \"multiply these numbers.\" Read it as \"apply the transformation $A$ to the vector $\\mathbf{x}$.\" Every fully-connected layer in a neural network is exactly this: $\\mathbf{h} = W\\mathbf{x} + \\mathbf{b}$ is a linear map $W$ followed by a shift. The weights <em>are</em> a linear transformation.</p></div>\n\n<h3>What makes a map <em>linear</em>?</h3>\n<p>Not every function $\\mathbb{R}^n \\to \\mathbb{R}^m$ comes from a matrix. The ones that do are exactly the <strong>linear</strong> ones. A map $T$ is linear if it respects the two operations that define a vector space — addition and scalar multiplication:</p>\n<ul>\n<li><strong>Additivity:</strong> $T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$.</li>\n<li><strong>Homogeneity:</strong> $T(c\\,\\mathbf{v}) = c\\,T(\\mathbf{v})$ for every scalar $c$.</li>\n</ul>\n<p>These two conditions combine into one tidy statement: $T$ preserves <strong>linear combinations</strong>,</p>\n$$ T(a\\mathbf{u} + b\\mathbf{v}) = a\\,T(\\mathbf{u}) + b\\,T(\\mathbf{v}). $$\n<p>Geometrically this is strong. Linearity forces the origin to stay fixed (take $c = 0$: $T(\\mathbf{0}) = \\mathbf{0}$), it sends straight lines to straight lines (or to a single point), and it keeps parallel lines parallel and evenly-spaced grids evenly spaced. A linear map can rotate, stretch, squash, flip, and shear the grid of space — but it can never bend it or translate it off the origin.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>Because $T(\\mathbf{0}) = \\mathbf{0}$, a pure shift like $\\mathbf{x} \\mapsto \\mathbf{x} + \\mathbf{b}$ is <em>not</em> linear — it is <em>affine</em>. That is precisely why a neural layer carries a separate bias term $\\mathbf{b}$: the weight matrix can only do linear things, so the offset must be added on. (Trick: stack a constant $1$ onto $\\mathbf{x}$ and the bias becomes an extra matrix column — \"homogeneous coordinates.\")</p></div>\n\n<h3>The columns are the secret</h3>\n<p>Here is the single most useful fact in this entire subject. <strong>The columns of a matrix are the images of the standard basis vectors.</strong></p>\n<p>Let $\\mathbf{e}_1, \\mathbf{e}_2, \\dots, \\mathbf{e}_n$ be the standard basis of $\\mathbb{R}^n$ — the vectors with a single $1$ and zeros elsewhere. Watch what $A$ does to $\\mathbf{e}_1$ in the $2\\times 2$ case:</p>\n$$ A\\mathbf{e}_1 = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} a \\\\ c \\end{bmatrix}, \\qquad A\\mathbf{e}_2 = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} b \\\\ d \\end{bmatrix}. $$\n<p>The first column $\\begin{bmatrix} a \\\\ c \\end{bmatrix}$ is literally where $\\mathbf{e}_1$ lands; the second column is where $\\mathbf{e}_2$ lands. <strong>That is all a matrix is: a record of where the basis vectors go.</strong></p>\n<p>Why does knowing the images of the basis vectors determine the <em>whole</em> map? Because every vector is a linear combination of the basis vectors, and linearity says the map respects combinations. Write $\\mathbf{x} = x_1\\mathbf{e}_1 + x_2\\mathbf{e}_2$. Then</p>\n$$ T(\\mathbf{x}) = T(x_1\\mathbf{e}_1 + x_2\\mathbf{e}_2) = x_1\\,T(\\mathbf{e}_1) + x_2\\,T(\\mathbf{e}_2). $$\n<p>So $A\\mathbf{x}$ is just $x_1$ times the first column plus $x_2$ times the second column. <strong>Matrix–vector multiplication is a linear combination of the columns, weighted by the entries of $\\mathbf{x}$.</strong> This \"column picture\" is far more illuminating than the row-by-row dot-product recipe.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>This is the bridge between abstract linear maps and concrete matrices. Pick a basis, ask where each basis vector goes, stack those answers as columns — you get a matrix. Every linear map between finite-dimensional spaces is a matrix once you fix bases. \"Matrix\" and \"linear map\" are two names for the same object, the matrix being the coordinate-dependent shadow of the basis-free map.</p></div>\n\n<h3>Reading a transformation off the columns</h3>\n<p>Because the columns tell you where $\\mathbf{e}_1$ and $\\mathbf{e}_2$ go, you can <em>see</em> what a $2\\times 2$ matrix does just by plotting its two columns. Sketch the unit square spanned by $\\mathbf{e}_1$ and $\\mathbf{e}_2$; the columns show you the parallelogram it becomes.</p>\n<p>Take</p>\n$$ A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}. $$\n<p>Column 1 is $\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix}$: $\\mathbf{e}_1$ got stretched to length 2 along the $x$-axis. Column 2 is $\\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix}$: $\\mathbf{e}_2$ got stretched to length 3 along the $y$-axis. So $A$ stretches space by $2\\times$ horizontally and $3\\times$ vertically. The unit square becomes a $2\\times 3$ rectangle. No formula needed — you read it straight off the columns.</p>\n\n<h3>The 2D transformation zoo</h3>\n<p>A handful of $2\\times 2$ matrices cover the geometric transforms you meet everywhere — graphics, robotics, data augmentation, PCA. Learn to recognize them by their columns.</p>\n\n<h4>Scaling</h4>\n$$ S = \\begin{bmatrix} s_x & 0 \\\\ 0 & s_y \\end{bmatrix}. $$\n<p>Stretches by $s_x$ in $x$ and $s_y$ in $y$. If $s_x = s_y$ it is a uniform zoom. A negative entry flips the corresponding axis. Diagonal matrices are exactly the axis-aligned scalings.</p>\n\n<h4>Rotation (counterclockwise by angle $\\theta$)</h4>\n$$ R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}. $$\n<p>Where does this come from? Just rotate the basis vectors. $\\mathbf{e}_1 = (1,0)$ swung CCW by $\\theta$ lands at $(\\cos\\theta, \\sin\\theta)$ — that is column 1. And $\\mathbf{e}_2 = (0,1)$ swung by $\\theta$ lands at $(-\\sin\\theta, \\cos\\theta)$ — that is column 2. Stack them and you have the matrix. Rotations preserve all lengths and angles; their columns are unit vectors at right angles to each other (an <strong>orthogonal</strong> matrix, $R^{\\top}R = I$).</p>\n\n<h4>Shear</h4>\n$$ H_x = \\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}. $$\n<p>Column 1 is $\\mathbf{e}_1$, unmoved. Column 2 is $\\begin{bmatrix} k \\\\ 1 \\end{bmatrix}$ — $\\mathbf{e}_2$ tilted sideways. The effect: points slide horizontally by an amount proportional to their height ($x \\mapsto x + ky$). A rectangle becomes a parallelogram of the <em>same area</em> — this is the \"italic font\" transform.</p>\n\n<h4>Reflection</h4>\n$$ F_x = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\;\\;(\\text{across the } x\\text{-axis}), \\qquad F_{y=x} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\;\\;(\\text{across the line } y=x). $$\n<p>A reflection flips orientation (a right hand becomes a left hand). More generally, reflecting across the line through the origin at angle $\\phi$ is $\\begin{bmatrix} \\cos 2\\phi & \\sin 2\\phi \\\\ \\sin 2\\phi & -\\cos 2\\phi \\end{bmatrix}$.</p>\n\n<h4>Projection</h4>\n$$ P_x = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}\\;\\;(\\text{onto the } x\\text{-axis}). $$\n<p>Column 2 is $\\mathbf{0}$: the entire $y$-direction is crushed to nothing. Everything collapses onto the $x$-axis, so 2D information is lost — projections are <strong>not invertible</strong>. Applying it twice changes nothing ($P^2 = P$, the defining \"idempotent\" property of a projection). Projection onto an arbitrary unit vector $\\mathbf{u}$ is $P = \\mathbf{u}\\mathbf{u}^{\\top}$, which is the heart of how PCA reduces dimensionality: project the data onto the directions of greatest variance.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The <em>determinant</em> of a $2\\times 2$ matrix is the signed area-scaling factor of its transform. Rotations and shears have determinant $1$ (area preserved); scalings have determinant $s_x s_y$; reflections have negative determinant (orientation flipped); projections have determinant $0$ (space collapsed, information destroyed, not invertible). A zero determinant is the geometric signature of a non-invertible — \"singular\" — matrix.</p></div>\n\n<h3>Worked example: build a matrix from a description</h3>\n<p><strong>Task.</strong> Construct the single matrix that first <em>scales</em> the plane by a factor of $2$, then <em>rotates</em> the result counterclockwise by $90^\\circ$. Then verify it on the vector $\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$.</p>\n<p><strong>Step 1 — write each transform as a matrix.</strong> Uniform scale by 2:</p>\n$$ S = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}. $$\n<p>Rotation by $90^\\circ$: $\\cos 90^\\circ = 0$, $\\sin 90^\\circ = 1$, so</p>\n$$ R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}. $$\n<p><strong>Step 2 — compose them in the right order.</strong> \"First scale, then rotate\" means we apply $S$ first and $R$ second: $\\mathbf{x} \\mapsto R(S\\mathbf{x}) = (RS)\\mathbf{x}$. Composition of linear maps is matrix multiplication, and the <em>first map applied sits on the right</em>. So the combined matrix is</p>\n$$ M = RS = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix} = \\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}. $$\n<p><strong>Step 3 — sanity check via the columns.</strong> Column 1 of $M$ is $\\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix}$: $\\mathbf{e}_1$ should be scaled to $(2,0)$ then rotated $90^\\circ$ CCW to $(0,2)$. Correct. Column 2 is $\\begin{bmatrix} -2 \\\\ 0 \\end{bmatrix}$: $\\mathbf{e}_2$ scaled to $(0,2)$ then rotated to $(-2,0)$. Correct.</p>\n<p><strong>Step 4 — apply to $\\mathbf{v}$.</strong></p>\n$$ M\\mathbf{v} = \\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix}. $$\n<p>As expected: $(1,0)$ scaled to $(2,0)$, then turned a quarter-turn up to $(0,2)$.</p>\n<div class=\"callout\"><div class=\"c-tag\">Watch out</div><p>Order matters: matrix multiplication is <em>not</em> commutative. \"Scale then rotate\" $= RS$, but \"rotate then scale\" $= SR$. For uniform scaling these happen to coincide, but with <em>non-uniform</em> scaling (say $s_x \\ne s_y$) the two orders give genuinely different transforms. Always apply the right-most matrix to the vector first.</p></div>\n\n<h3>The recipe, both directions</h3>\n<p>You now have a two-way street between geometry and matrices:</p>\n<ul>\n<li><strong>Matrix → transform (read it off):</strong> plot the columns. They are the new homes of $\\mathbf{e}_1$ and $\\mathbf{e}_2$; the unit square becomes the parallelogram they span. Determinant tells you the area scaling and whether orientation flipped.</li>\n<li><strong>Transform → matrix (build it):</strong> ask \"where does $\\mathbf{e}_1$ go? where does $\\mathbf{e}_2$ go?\" Put those two answers in as columns. Done.</li>\n</ul>\n<p>This is the whole game in two dimensions, and it generalizes verbatim to $n$ dimensions — only now you have $n$ columns recording the images of $n$ basis vectors. The reason this matters far beyond geometry class: every linear operation in data science — a change of basis, a whitening transform, a PCA projection, a neural network's weight layer, an embedding map — is one of these column-recipes in disguise, just in higher dimensions where you can no longer draw the picture but the algebra is identical.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-linear-transform\"></div>",
          "mcq": [
            {
              "q": "A linear map $T:\\mathbb{R}^2 \\to \\mathbb{R}^2$ satisfies $T\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}3\\\\1\\end{bmatrix}$ and $T\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\begin{bmatrix}-2\\\\4\\end{bmatrix}$. What is the matrix of $T$?",
              "choices": [
                "$\\begin{bmatrix}3 & 1\\\\-2 & 4\\end{bmatrix}$",
                "$\\begin{bmatrix}3 & -2\\\\1 & 4\\end{bmatrix}$",
                "$\\begin{bmatrix}1 & -2\\\\3 & 4\\end{bmatrix}$",
                "$\\begin{bmatrix}1 & 0\\\\0 & 1\\end{bmatrix}$"
              ],
              "answer": 1,
              "explain": "The images of the basis vectors are the columns of the matrix, in order: $T(\\mathbf{e}_1) = (3,1)$ is column 1 and $T(\\mathbf{e}_2) = (-2,4)$ is column 2, giving $\\begin{bmatrix}3 & -2\\\\1 & 4\\end{bmatrix}$. The common mistake is to place the images as rows, which gives choice 1, $\\begin{bmatrix}3 & 1\\\\-2 & 4\\end{bmatrix}$."
            },
            {
              "q": "Which transformation is NOT linear?",
              "choices": [
                "Rotation by $30^\\circ$ about the origin",
                "The map $\\mathbf{x} \\mapsto \\mathbf{x} + \\begin{bmatrix}1\\\\1\\end{bmatrix}$ (translation)",
                "Projection onto the $x$-axis",
                "Reflection across the line $y = x$"
              ],
              "answer": 1,
              "explain": "Translation moves the origin: $T(\\mathbf{0}) = \\begin{bmatrix}1\\\\1\\end{bmatrix} \\ne \\mathbf{0}$, so it fails linearity. It is affine, not linear, which is why neural layers need a separate bias term."
            },
            {
              "q": "A $2\\times 2$ matrix has determinant $0$. Geometrically, what does its transformation do?",
              "choices": [
                "Preserves area and orientation",
                "Rotates space without distortion",
                "Collapses the plane onto a line (or point), losing information and becoming non-invertible",
                "Doubles every area"
              ],
              "answer": 2,
              "explain": "Determinant is the signed area-scaling factor; a value of $0$ means area is crushed to zero, so the plane collapses to a lower dimension and the map cannot be inverted (it is singular)."
            },
            {
              "q": "You want to 'first rotate by $\\theta$, then scale by $S$.' Which product applied to $\\mathbf{x}$ does this?",
              "choices": [
                "$(SR)\\mathbf{x}$",
                "$(RS)\\mathbf{x}$",
                "$(R + S)\\mathbf{x}$",
                "$(RS^{\\top})\\mathbf{x}$"
              ],
              "answer": 0,
              "explain": "The first transform applied sits on the right (closest to $\\mathbf{x}$): rotate first means $R\\mathbf{x}$, then scale gives $S(R\\mathbf{x}) = (SR)\\mathbf{x}$. Order matters because matrix multiplication is not commutative."
            },
            {
              "q": "A matrix $A$ defines the map $T_A(\\mathbf{x}) = A\\mathbf{x}$. If $A$ is a $2 \\times 3$ matrix, what are the input and output spaces of $T_A$?",
              "choices": [
                "Input $\\mathbb{R}^2$, output $\\mathbb{R}^3$",
                "Input $\\mathbb{R}^3$, output $\\mathbb{R}^2$",
                "Input $\\mathbb{R}^3$, output $\\mathbb{R}^3$",
                "Input $\\mathbb{R}^2$, output $\\mathbb{R}^2$"
              ],
              "answer": 1,
              "explain": "The number of columns (3) is the input dimension and the number of rows (2) is the output dimension, so $T_A : \\mathbb{R}^3 \\to \\mathbb{R}^2$."
            },
            {
              "q": "In a neural network layer $\\mathbf{h} = W\\mathbf{x} + \\mathbf{b}$, why is a separate bias term $\\mathbf{b}$ needed instead of folding it into the matrix $W$?",
              "choices": [
                "Because matrix multiplication is not associative",
                "Because a linear map must fix the origin, so the constant shift cannot come from $W$ alone",
                "Because $W$ must always be square to be invertible",
                "Because the bias makes training faster but is mathematically redundant"
              ],
              "answer": 1,
              "explain": "A linear map sends $\\mathbf{0}$ to $\\mathbf{0}$, so any nonzero shift must be added separately as the affine bias $\\mathbf{b}$."
            },
            {
              "q": "Suppose $T$ is linear and you know $T(\\mathbf{u}) = \\mathbf{p}$ and $T(\\mathbf{v}) = \\mathbf{q}$. What is $T(3\\mathbf{u} - 2\\mathbf{v})$?",
              "choices": [
                "$3\\mathbf{p} - 2\\mathbf{q}$",
                "$\\mathbf{p} - \\mathbf{q}$",
                "$6\\mathbf{p}\\mathbf{q}$",
                "$3\\mathbf{q} - 2\\mathbf{p}$"
              ],
              "answer": 0,
              "explain": "Linearity preserves linear combinations, so $T(3\\mathbf{u} - 2\\mathbf{v}) = 3T(\\mathbf{u}) - 2T(\\mathbf{v}) = 3\\mathbf{p} - 2\\mathbf{q}$."
            },
            {
              "q": "A linear transformation is applied to an evenly-spaced square grid drawn on the plane. Which outcome is impossible for a linear map?",
              "choices": [
                "The grid lines become parallel but tilted",
                "The grid is uniformly stretched into rectangles",
                "The grid lines bend into curves",
                "The grid is collapsed onto a single line"
              ],
              "answer": 2,
              "explain": "Linear maps send straight lines to straight lines and keep grid lines evenly spaced, so they can stretch, shear, or collapse the grid but never bend it into curves."
            }
          ],
          "flashcards": [
            {
              "front": "What do the columns of a matrix represent geometrically?",
              "back": "The images of the standard basis vectors: column $j$ is $T(\\mathbf{e}_j)$, i.e. where the $j$-th basis vector lands under the transformation. Knowing them determines the entire linear map."
            },
            {
              "front": "Define a linear map by its two defining properties.",
              "back": "$T$ is linear if (1) $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ (additivity) and (2) $T(c\\mathbf{v}) = cT(\\mathbf{v})$ (homogeneity). Equivalently, $T$ preserves all linear combinations and fixes the origin."
            },
            {
              "front": "Matrix for counterclockwise rotation by angle $\\theta$?",
              "back": "$R(\\theta) = \\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$ — its columns are $\\mathbf{e}_1$ and $\\mathbf{e}_2$ each rotated by $\\theta$."
            },
            {
              "front": "What does the determinant of a $2\\times 2$ matrix tell you about its transform?",
              "back": "The signed area-scaling factor. $|{\\det}|$ scales areas; sign $<0$ flips orientation; $\\det = 0$ means the map collapses space (non-invertible/singular)."
            },
            {
              "front": "Why does a neural network layer use $W\\mathbf{x} + \\mathbf{b}$ rather than just $W\\mathbf{x}$?",
              "back": "Because $W\\mathbf{x}$ is a linear map and must fix the origin ($T(\\mathbf{0})=\\mathbf{0}$). The bias $\\mathbf{b}$ adds a translation, making the layer affine and able to shift outputs off the origin."
            },
            {
              "front": "Matrix–vector product, column interpretation of $A\\mathbf{x}$?",
              "back": "$A\\mathbf{x}$ is a linear combination of the columns of $A$, weighted by the entries of $\\mathbf{x}$: $A\\mathbf{x} = x_1(\\text{col}_1) + x_2(\\text{col}_2) + \\dots$"
            }
          ],
          "homework": [
            {
              "prompt": "Construct the $2\\times 2$ matrix that reflects the plane across the $y$-axis and simultaneously stretches by a factor of $3$ in the vertical direction. Then state where the point $(2, -1)$ lands.",
              "hint": "Ask where $\\mathbf{e}_1 = (1,0)$ and $\\mathbf{e}_2 = (0,1)$ each go under the described transform, then put those as the two columns.",
              "solution": "Reflecting across the $y$-axis flips the sign of the $x$-coordinate, and stretching vertically by 3 multiplies the $y$-coordinate by 3. So $\\mathbf{e}_1 = (1,0) \\mapsto (-1, 0)$ (column 1) and $\\mathbf{e}_2 = (0,1) \\mapsto (0, 3)$ (column 2). The matrix is $M = \\begin{bmatrix} -1 & 0 \\\\ 0 & 3 \\end{bmatrix}$. Applying it: $M\\begin{bmatrix}2\\\\-1\\end{bmatrix} = \\begin{bmatrix}-1\\cdot 2 + 0\\\\ 0 + 3\\cdot(-1)\\end{bmatrix} = \\begin{bmatrix}-2 \\\\ -3\\end{bmatrix}$. So $(2,-1)$ lands at $(-2, -3)$."
            },
            {
              "prompt": "Determine, by inspecting its columns, what geometric transformation $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ performs. Compute its determinant and explain what that says about areas.",
              "hint": "Plot where $\\mathbf{e}_1$ and $\\mathbf{e}_2$ go. One column is unchanged; the other has tilted. Compare to the shear matrix $\\begin{bmatrix}1 & k\\\\0 & 1\\end{bmatrix}$.",
              "solution": "Column 1 is $\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\mathbf{e}_1$, unchanged. Column 2 is $\\begin{bmatrix}2\\\\1\\end{bmatrix}$, which is $\\mathbf{e}_2$ slid 2 units to the right. This matches the horizontal shear $\\begin{bmatrix}1 & k\\\\0 & 1\\end{bmatrix}$ with $k = 2$: each point moves horizontally by $2y$ (proportional to its height), turning the unit square into a parallelogram. The determinant is $(1)(1) - (2)(0) = 1$, so areas are preserved exactly — characteristic of a shear."
            },
            {
              "prompt": "Prove that the map $T(x, y) = (x + y,\\; xy)$ is NOT linear, and identify which property fails.",
              "hint": "Try testing homogeneity with a scalar $c$, or additivity on two specific vectors. Look at the second component $xy$.",
              "solution": "Test homogeneity. For scalar $c$: $T(c(x,y)) = T(cx, cy) = (cx + cy,\\; (cx)(cy)) = (c(x+y),\\; c^2 xy)$. But $c\\,T(x,y) = (c(x+y),\\; c\\,xy)$. The second components differ: $c^2 xy \\ne c\\,xy$ in general (e.g. $c=2$, $x=y=1$ gives $4 \\ne 2$). So homogeneity fails. (Additivity fails too: the $xy$ term is quadratic, not linear, so $T$ cannot be written as $A\\begin{bmatrix}x\\\\y\\end{bmatrix}$ for any matrix $A$.) The map is therefore nonlinear."
            }
          ],
          "examples": [
            {
              "title": "Applying a matrix transformation and verifying linearity",
              "body": "Let $A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\\\ 1 & 1 \\end{bmatrix}$ define the linear map $T_A : \\mathbb{R}^2 \\to \\mathbb{R}^3$, $T_A(\\mathbf{x}) = A\\mathbf{x}$.\n\n(a) Compute $T_A(\\mathbf{u})$ for $\\mathbf{u} = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}$ and $T_A(\\mathbf{v})$ for $\\mathbf{v} = \\begin{bmatrix} -2 \\\\ 5 \\end{bmatrix}$.\n\n(b) Verify the linearity identity $T_A(3\\mathbf{u} + 2\\mathbf{v}) = 3\\,T_A(\\mathbf{u}) + 2\\,T_A(\\mathbf{v})$ directly.",
              "solution": "**Part (a): apply the matrix to each vector.**\n\nReading $A\\mathbf{x}$ as \"apply the transformation,\" each output coordinate is a row of $A$ dotted with $\\mathbf{x}$. Note $A$ has $2$ columns (it eats $2$D vectors) and $3$ rows (it outputs $3$D vectors), so $T_A : \\mathbb{R}^2 \\to \\mathbb{R}^3$.\n\nFor $\\mathbf{u} = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}$:\n$$ T_A(\\mathbf{u}) = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 2(4) + (-1)(1) \\\\ 0(4) + 3(1) \\\\ 1(4) + 1(1) \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 3 \\\\ 5 \\end{bmatrix}. $$\n\nFor $\\mathbf{v} = \\begin{bmatrix} -2 \\\\ 5 \\end{bmatrix}$:\n$$ T_A(\\mathbf{v}) = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} -2 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 2(-2) + (-1)(5) \\\\ 0(-2) + 3(5) \\\\ 1(-2) + 1(5) \\end{bmatrix} = \\begin{bmatrix} -9 \\\\ 15 \\\\ 3 \\end{bmatrix}. $$\n\n**Part (b): verify linearity.**\n\n*Right-hand side first.* Scale the outputs from part (a):\n$$ 3\\,T_A(\\mathbf{u}) = 3\\begin{bmatrix} 7 \\\\ 3 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 21 \\\\ 9 \\\\ 15 \\end{bmatrix}, \\qquad 2\\,T_A(\\mathbf{v}) = 2\\begin{bmatrix} -9 \\\\ 15 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} -18 \\\\ 30 \\\\ 6 \\end{bmatrix}. $$\nAdding,\n$$ 3\\,T_A(\\mathbf{u}) + 2\\,T_A(\\mathbf{v}) = \\begin{bmatrix} 21 + (-18) \\\\ 9 + 30 \\\\ 15 + 6 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 39 \\\\ 21 \\end{bmatrix}. $$\n\n*Left-hand side.* First form the input combination:\n$$ 3\\mathbf{u} + 2\\mathbf{v} = 3\\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} + 2\\begin{bmatrix} -2 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 12 \\\\ 3 \\end{bmatrix} + \\begin{bmatrix} -4 \\\\ 10 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 13 \\end{bmatrix}. $$\nNow apply $T_A$ once:\n$$ T_A\\!\\left(\\begin{bmatrix} 8 \\\\ 13 \\end{bmatrix}\\right) = \\begin{bmatrix} 2(8) + (-1)(13) \\\\ 0(8) + 3(13) \\\\ 1(8) + 1(13) \\end{bmatrix} = \\begin{bmatrix} 16 - 13 \\\\ 39 \\\\ 21 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 39 \\\\ 21 \\end{bmatrix}. $$\n\nBoth sides equal $\\begin{bmatrix} 3 \\\\ 39 \\\\ 21 \\end{bmatrix}$, confirming $T_A(3\\mathbf{u} + 2\\mathbf{v}) = 3\\,T_A(\\mathbf{u}) + 2\\,T_A(\\mathbf{v})$. The matrix preserves linear combinations, exactly as a linear map must."
            },
            {
              "title": "Deciding whether a given map is linear (and finding its matrix)",
              "body": "Two candidate maps from $\\mathbb{R}^2$ to $\\mathbb{R}^2$ are proposed:\n$$ S\\!\\left(\\begin{bmatrix} x \\\\ y \\end{bmatrix}\\right) = \\begin{bmatrix} x - 2y \\\\ 3x \\end{bmatrix}, \\qquad F\\!\\left(\\begin{bmatrix} x \\\\ y \\end{bmatrix}\\right) = \\begin{bmatrix} x + y \\\\ xy \\end{bmatrix} + \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}. $$\n\nFor each map, determine whether it is linear. If it is linear, find the matrix $A$ such that the map equals $\\mathbf{x} \\mapsto A\\mathbf{x}$. If it is not, give a specific reason.",
              "solution": "**Map $S$: test the linearity conditions.**\n\nTake general inputs $\\mathbf{u} = \\begin{bmatrix} x_1 \\\\ y_1 \\end{bmatrix}$, $\\mathbf{v} = \\begin{bmatrix} x_2 \\\\ y_2 \\end{bmatrix}$ and scalars $a, b$. Then\n$$ a\\mathbf{u} + b\\mathbf{v} = \\begin{bmatrix} ax_1 + bx_2 \\\\ ay_1 + by_2 \\end{bmatrix}, $$\nso\n$$ S(a\\mathbf{u} + b\\mathbf{v}) = \\begin{bmatrix} (ax_1 + bx_2) - 2(ay_1 + by_2) \\\\ 3(ax_1 + bx_2) \\end{bmatrix}. $$\nRegroup by $a$ and $b$:\n$$ = a\\begin{bmatrix} x_1 - 2y_1 \\\\ 3x_1 \\end{bmatrix} + b\\begin{bmatrix} x_2 - 2y_2 \\\\ 3x_2 \\end{bmatrix} = a\\,S(\\mathbf{u}) + b\\,S(\\mathbf{v}). $$\nThe map preserves linear combinations, so $S$ **is linear**.\n\n*Finding its matrix.* Each output coordinate is a linear expression in $x, y$; read the coefficients off as rows. Equivalently, the columns of $A$ are the images of the standard basis vectors:\n$$ S\\!\\left(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\right) = \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix}, \\qquad S\\!\\left(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}\\right) = \\begin{bmatrix} -2 \\\\ 0 \\end{bmatrix}. $$\nStacking these as columns:\n$$ A = \\begin{bmatrix} 1 & -2 \\\\ 3 & 0 \\end{bmatrix}. $$\nCheck: $A\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} x - 2y \\\\ 3x \\end{bmatrix}$, matching $S$. \n\n**Map $F$: look for a violation.**\n\nThere are two warning signs. First, the constant offset $\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$: a linear map must fix the origin, but\n$$ F\\!\\left(\\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}\\right) = \\begin{bmatrix} 0 + 0 \\\\ 0 \\cdot 0 \\end{bmatrix} + \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\neq \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}. $$\nSince $T(\\mathbf{0}) = \\mathbf{0}$ fails, $F$ **is not linear** (the shift makes it affine at best).\n\nSecond, even ignoring the shift, the $xy$ term breaks homogeneity. Test with $\\mathbf{v} = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$ and scalar $c = 2$, focusing on the second coordinate $g(x,y) = xy$:\n$$ g(2\\mathbf{v}) = (2)(2) = 4, \\qquad 2\\,g(\\mathbf{v}) = 2 \\cdot (1)(1) = 2. $$\nSince $4 \\neq 2$, homogeneity $g(c\\mathbf{v}) = c\\,g(\\mathbf{v})$ fails. The product of coordinates is genuinely nonlinear, so no matrix can represent $F$.\n\n**Summary.** $S$ is linear with matrix $A = \\begin{bmatrix} 1 & -2 \\\\ 3 & 0 \\end{bmatrix}$; $F$ is not linear, failing both $T(\\mathbf{0}) = \\mathbf{0}$ (because of the bias $\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$) and homogeneity (because of the $xy$ term)."
            }
          ]
        },
        {
          "id": "la-matrix-multiplication",
          "title": "Matrix Multiplication as Composition",
          "minutes": 16,
          "content": "<h3>The one idea that unlocks matrix multiplication</h3>\n<p>Most people first meet matrix multiplication as an arbitrary, slightly painful ritual: \"go across the rows, down the columns, multiply, add.\" It works, but it feels like a rule handed down from nowhere. The goal of this lesson is to replace that feeling with a single organizing idea that makes every other fact about matrix multiplication obvious:</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>A matrix <em>is</em> a linear map. Multiplying two matrices is <strong>composing</strong> the two maps. Everything else — the row-column rule, the dimension rule, non-commutativity, the identity matrix — is a consequence of that one fact.</p></div>\n<p>If you internalize this, you will never again wonder why the inner dimensions have to match, or why $AB \\neq BA$. You'll be able to read it off geometrically.</p>\n\n<h3>1. A matrix turns vectors into vectors</h3>\n<p>A linear map $T$ is a function that respects addition and scaling: $T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ and $T(c\\,\\mathbf{u}) = c\\,T(\\mathbf{u})$. Geometrically these are the transformations that keep grid lines straight, evenly spaced, and parallel, and keep the origin fixed: rotations, scalings, shears, projections, and combinations of them.</p>\n<p>The central theorem of this whole subject is that <strong>every</strong> linear map from $\\mathbb{R}^n$ to $\\mathbb{R}^m$ is given by multiplication by some $m \\times n$ matrix $A$, and that matrix is built from where the map sends the standard basis vectors. If $\\mathbf{e}_1, \\dots, \\mathbf{e}_n$ are the standard basis vectors of the input space, then</p>\n$$A = \\begin{bmatrix} | & | & & | \\\\ T(\\mathbf{e}_1) & T(\\mathbf{e}_2) & \\cdots & T(\\mathbf{e}_n) \\\\ | & | & & | \\end{bmatrix}.$$\n<p>In words: <strong>the columns of a matrix are the images of the basis vectors.</strong> Column $j$ tells you where the map sends $\\mathbf{e}_j$. This is worth saying out loud because it is the key to everything that follows.</p>\n\n<h4>Matrix-vector product = \"weighted sum of the columns\"</h4>\n<p>Because any input vector is a combination of basis vectors, $\\mathbf{x} = x_1\\mathbf{e}_1 + \\cdots + x_n\\mathbf{e}_n$, linearity forces</p>\n$$A\\mathbf{x} = x_1\\,T(\\mathbf{e}_1) + \\cdots + x_n\\,T(\\mathbf{e}_n) = x_1(\\text{col}_1) + \\cdots + x_n(\\text{col}_n).$$\n<p>So $A\\mathbf{x}$ is a <em>linear combination of the columns of $A$</em>, with the entries of $\\mathbf{x}$ as the weights. This \"column picture\" is the deeper view. Concretely:</p>\n$$\\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}\\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix} = 4\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} + 5\\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 4 \\end{bmatrix} + \\begin{bmatrix} 0 \\\\ 15 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 19 \\end{bmatrix}.$$\n<p>The familiar \"dot each row with $\\mathbf{x}$\" recipe gives the same numbers — $2\\cdot4 + 0\\cdot5 = 8$ and $1\\cdot4 + 3\\cdot5 = 19$ — but the column picture explains <em>why</em>: you're rebuilding the output from the transformed basis vectors.</p>\n\n<h3>2. Composition: do the right map first, then the left</h3>\n<p>Now suppose you have two maps. $B: \\mathbb{R}^n \\to \\mathbb{R}^k$ sends $\\mathbf{x}$ to $B\\mathbf{x}$, and then $A: \\mathbb{R}^k \\to \\mathbb{R}^m$ takes that result and produces $A(B\\mathbf{x})$. The combined operation \"first $B$, then $A$\" is itself a linear map, so it must be <em>some</em> matrix. We define that matrix to be the product $AB$:</p>\n$$(AB)\\mathbf{x} := A(B\\mathbf{x}) \\quad \\text{for every } \\mathbf{x}.$$\n<p>That equation is the entire definition of matrix multiplication. The product $AB$ is not a new arbitrary operation — it is exactly the matrix that performs $B$ followed by $A$ in one step.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Read $AB\\mathbf{x}$ right to left, like nested function calls: $A(B(\\mathbf{x}))$. The matrix nearest the vector acts first. This is the same convention as $f \\circ g$ meaning \"$g$ then $f$\" — matrices inherit the backwards-looking order of function composition.</p></div>\n\n<h4>Deriving the columns of $AB$</h4>\n<p>How do we actually compute $AB$? Use the column principle from Section 1: the $j$-th column of any matrix is its action on $\\mathbf{e}_j$. So the $j$-th column of $AB$ is</p>\n$$(AB)\\mathbf{e}_j = A(B\\mathbf{e}_j) = A(\\text{col}_j \\text{ of } B).$$\n<p>That is: <strong>to build $AB$, apply $A$ to each column of $B$.</strong> Column by column,</p>\n$$AB = \\begin{bmatrix} | & & | \\\\ A\\mathbf{b}_1 & \\cdots & A\\mathbf{b}_n \\\\ | & & | \\end{bmatrix}, \\qquad \\text{where } B = \\begin{bmatrix} | & & | \\\\ \\mathbf{b}_1 & \\cdots & \\mathbf{b}_n \\\\ | & & | \\end{bmatrix}.$$\n<p>Each $A\\mathbf{b}_j$ is itself a weighted sum of the columns of $A$, exactly as in Section 1. The notorious row-column rule is just this computation written out entry by entry.</p>\n\n<h4>The row-column rule, recovered</h4>\n<p>Pinning down a single entry: $(AB)_{ij}$ is the $i$-th coordinate of the vector $A\\mathbf{b}_j$. The $i$-th coordinate of $A$ times any vector is the dot product of row $i$ of $A$ with that vector. Hence the formula you already know:</p>\n$$(AB)_{ij} = \\sum_{p} A_{ip}\\,B_{pj} = (\\text{row } i \\text{ of } A)\\cdot(\\text{column } j \\text{ of } B).$$\n<p>So \"row dot column\" is a <em>theorem</em>, not a definition. It falls out of composition the moment you accept that columns are images of basis vectors.</p>\n\n<h3>3. Why the dimensions have to match</h3>\n<p>Composition only makes sense if the output of $B$ can be fed into $A$. $B$ produces vectors in $\\mathbb{R}^k$; $A$ must accept vectors in $\\mathbb{R}^k$. In matrix terms, if $A$ is $m \\times k$ and $B$ is $k \\times n$, then $AB$ is defined and is $m \\times n$:</p>\n$$\\underbrace{(m \\times k)}_{A}\\;\\underbrace{(k \\times n)}_{B} \\;=\\; \\underbrace{(m \\times n)}_{AB}.$$\n<p>The two inner numbers ($k$ and $k$) must agree — that is the shared intermediate space — and they vanish from the answer. The two outer numbers ($m$ and $n$) survive as the shape of the result. The mnemonic is purely a restatement of \"the outputs of the first map are the inputs of the second.\"</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>This is the rule you live by when wiring up a neural network. A layer that maps a 768-dimensional embedding to a 3072-dimensional hidden vector is a $3072 \\times 768$ weight matrix. To stack layers, the inner dimensions must line up — a \"shape mismatch\" error in PyTorch or NumPy is literally a broken composition of linear maps. Reading dimensions left-to-right as outputs and right-to-left as the data flowing in is the same skill as tracing tensor shapes through a forward pass.</p></div>\n\n<h3>4. A fully worked example</h3>\n<p>Let's compose two concrete geometric maps in the plane. Let</p>\n$$A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} \\quad(\\text{rotation by } 90^\\circ \\text{ counterclockwise}), \\qquad B = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}\\quad(\\text{stretch } x \\text{ by } 2).$$\n<p>You can verify $A$ is a rotation by checking its columns: $A\\mathbf{e}_1 = (0,1)$ and $A\\mathbf{e}_2=(-1,0)$ — the basis vectors swing a quarter turn. $B$ leaves the $y$-direction alone and doubles the $x$-direction.</p>\n<p><strong>Compute $AB$ (first stretch, then rotate)</strong> by applying $A$ to each column of $B$:</p>\n$$A\\,\\mathbf{b}_1 = A\\begin{bmatrix}2\\\\0\\end{bmatrix} = 2\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\begin{bmatrix}0\\\\2\\end{bmatrix}, \\qquad A\\,\\mathbf{b}_2 = A\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\begin{bmatrix}-1\\\\0\\end{bmatrix}.$$\n$$AB = \\begin{bmatrix} 0 & -1 \\\\ 2 & 0 \\end{bmatrix}.$$\n<p><strong>Now compute $BA$ (first rotate, then stretch)</strong>, applying $B$ to each column of $A$:</p>\n$$B\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\begin{bmatrix}0\\\\1\\end{bmatrix}, \\qquad B\\begin{bmatrix}-1\\\\0\\end{bmatrix} = \\begin{bmatrix}-2\\\\0\\end{bmatrix} \\;\\Longrightarrow\\; BA = \\begin{bmatrix} 0 & -2 \\\\ 1 & 0 \\end{bmatrix}.$$\n<p>The two products are different. Watch what happens to a single test vector, say $\\mathbf{e}_1 = (1,0)$:</p>\n<ul>\n<li><strong>$AB$ (stretch then rotate):</strong> stretch sends $(1,0)\\to(2,0)$; rotating that gives $(0,2)$ — a vector of length 2 pointing up.</li>\n<li><strong>$BA$ (rotate then stretch):</strong> rotation sends $(1,0)\\to(0,1)$; stretching the $x$-axis does nothing to a purely vertical vector, so you get $(0,1)$ — a vector of length 1 pointing up.</li>\n</ul>\n<p>Same start, different end. The stretch acts along the horizontal axis, so it matters enormously <em>whether the vector is horizontal at the moment the stretch happens</em>. Rotating first moves the vector off the horizontal axis, defusing the stretch; stretching first lets it bite. That is the geometric meaning of non-commutativity.</p>\n\n<h3>5. Non-commutativity: $AB \\neq BA$ in general</h3>\n<p>Once you see multiplication as composition, the surprise flips: the surprising thing would be if order <em>didn't</em> matter. \"Put on socks, then shoes\" is not the same as \"put on shoes, then socks.\" Composition of operations is order-sensitive almost everywhere in life and mathematics.</p>\n<ul>\n<li><strong>Dimensions alone can forbid it.</strong> If $A$ is $2\\times 3$ and $B$ is $3\\times 2$, then $AB$ is $2\\times 2$ but $BA$ is $3\\times 3$ — they aren't even the same shape, so equality is impossible. And if $A$ is $2\\times3$ and $B$ is $2\\times3$, $AB$ doesn't exist at all while you might still form $A B^\\top$.</li>\n<li><strong>Even for square matrices, order usually changes the answer,</strong> as the rotation-vs-stretch example shows.</li>\n<li><strong>Some special pairs <em>do</em> commute:</strong> any matrix with the identity, any matrix with its own powers ($A\\,A^2 = A^2 A$), diagonal matrices with each other, and a matrix with its inverse. Commuting is the exception worth noticing, not the rule.</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Attention, convolutions, and most network layers are non-commutative compositions: you cannot reorder \"project to queries\" and \"apply softmax-weighted sum\" and expect the same model. Non-commutativity is also why the order of factors matters when you optimize compute — $A(BC)$ and $(AB)C$ give the <em>same</em> result (multiplication is associative) but can cost wildly different numbers of operations. Choosing the cheaper grouping (\"matrix chain ordering\") is a real performance lever in deep learning kernels.</p></div>\n<p>Two properties that <em>do</em> always hold and are easy to confuse with commutativity: matrix multiplication is <strong>associative</strong>, $(AB)C = A(BC)$ — because composing functions is associative — and <strong>distributive</strong>, $A(B+C) = AB + AC$. You may regroup and expand freely; you may not reorder.</p>\n\n<h3>6. The identity matrix: the \"do nothing\" map</h3>\n<p>Among all linear maps, one does absolutely nothing: $T(\\mathbf{x}) = \\mathbf{x}$ for every $\\mathbf{x}$. Its matrix is the identity $I_n$, the $n\\times n$ matrix with 1's on the diagonal and 0's elsewhere:</p>\n$$I_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}.$$\n<p>Its columns are exactly $\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3$ — each basis vector maps to itself, as a \"do nothing\" map should. For any compatible $A$,</p>\n$$AI = A \\quad \\text{and} \\quad IA = A.$$\n<p>$I$ is the multiplicative identity, the matrix analogue of the number 1, and it is one of the rare matrices that commutes with everything. It is also the anchor for the definition of an <strong>inverse</strong>: $A^{-1}$ is the map that undoes $A$, so that $A^{-1}A = AA^{-1} = I$ — \"do $A$, then undo it\" returns you to where you started. (When $A^{-1}$ exists, $A$ and $A^{-1}$ always commute, even though most pairs don't.)</p>\n\n<h3>7. How to actually compute by hand — and how to check yourself</h3>\n<ol>\n<li><strong>Check shapes first.</strong> Write the dimensions $(m\\times k)(k\\times n)$. If the inner numbers differ, stop — the product doesn't exist. Otherwise the answer is $m\\times n$, and you now know exactly how many entries to produce.</li>\n<li><strong>For each output entry $(i,j)$:</strong> slide row $i$ of $A$ against column $j$ of $B$, multiply pairwise, and sum. Point a left finger along the row and a right finger down the column to stay aligned.</li>\n<li><strong>Sanity check with the column view:</strong> the first column of $AB$ should equal $A$ times the first column of $B$. If you're unsure of an entry, recompute it as a weighted sum of $A$'s columns.</li>\n<li><strong>Sanity check with a test vector:</strong> for square maps, pick $\\mathbf{e}_1$ and confirm $(AB)\\mathbf{e}_1 = A(B\\mathbf{e}_1)$. This catches sign and ordering mistakes instantly.</li>\n</ol>\n<p>With practice, predicting the output shape becomes automatic and the entry-by-entry grind becomes a rote inner loop — but the meaning underneath every product is always the same: you are composing two transformations of space into one.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">The takeaway</div><p>Don't memorize matrix multiplication as a rule. Hold one sentence in your head — <em>\"$AB$ is the matrix that does $B$ then $A$, and columns are where basis vectors go\"</em> — and rederive the row-column rule, the dimension rule, and non-commutativity from it whenever you need them.</p></div>",
          "mcq": [
            {
              "q": "If $A$ is a $4 \\times 2$ matrix and $B$ is a $2 \\times 5$ matrix, which products are defined and what are their shapes?",
              "choices": [
                "$AB$ is $4 \\times 5$; $BA$ is undefined",
                "$AB$ is $2 \\times 2$; $BA$ is $5 \\times 4$",
                "Both $AB$ and $BA$ are $4 \\times 5$",
                "$AB$ is undefined; $BA$ is $5 \\times 4$"
              ],
              "answer": 0,
              "explain": "For $AB$ the inner dimensions match ($2=2$), giving the outer shape $4\\times5$. For $BA$ the inner dimensions are $5$ and $4$, which disagree, so $BA$ is undefined."
            },
            {
              "q": "In the product $AB\\mathbf{x}$, in what order do the transformations act on the vector $\\mathbf{x}$?",
              "choices": [
                "$A$ acts first, then $B$",
                "$B$ acts first, then $A$",
                "They act simultaneously and order is irrelevant",
                "It depends on whether the matrices are square"
              ],
              "answer": 1,
              "explain": "By definition $(AB)\\mathbf{x} = A(B\\mathbf{x})$: the matrix nearest the vector applies first, so $B$ acts then $A$ — the same backwards order as function composition $f\\circ g$."
            },
            {
              "q": "Why is the $j$-th column of $AB$ equal to $A$ times the $j$-th column of $B$?",
              "choices": [
                "Because matrix multiplication is commutative",
                "Because the columns of any matrix are its action on the standard basis vectors, and $(AB)\\mathbf{e}_j = A(B\\mathbf{e}_j)$",
                "Because $A$ and $B$ must be square for the product to exist",
                "It is a coincidence that only holds for the identity matrix"
              ],
              "answer": 1,
              "explain": "Column $j$ of any matrix $M$ is $M\\mathbf{e}_j$. So column $j$ of $AB$ is $(AB)\\mathbf{e}_j = A(B\\mathbf{e}_j) = A(\\text{col}_j\\text{ of }B)$, which is exactly the composition principle."
            },
            {
              "q": "Which statement about matrix multiplication is TRUE in general?",
              "choices": [
                "$AB = BA$ for all square matrices of the same size",
                "$(AB)C = A(BC)$ for any conformable matrices",
                "If $AB$ is defined then $BA$ is also defined",
                "$A(B+C) = AB + CA$"
              ],
              "answer": 1,
              "explain": "Matrix multiplication is associative because composition of functions is associative. It is generally NOT commutative, $BA$ need not even exist, and distributivity gives $A(B+C)=AB+AC$ (order preserved)."
            },
            {
              "q": "A linear map $T$ sends $\\mathbf{e}_1 \\mapsto \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$ and $\\mathbf{e}_2 \\mapsto \\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix}$. What is the matrix $A$ representing $T$?",
              "choices": [
                "$\\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$",
                "$\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}$",
                "$\\begin{bmatrix} 2 & 3 \\\\ 1 & 0 \\end{bmatrix}$"
              ],
              "answer": 0,
              "explain": "The images of the basis vectors become the columns of $A$, so $T(\\mathbf{e}_1)=\\begin{bmatrix}2\\\\1\\end{bmatrix}$ is the first column and $T(\\mathbf{e}_2)=\\begin{bmatrix}0\\\\3\\end{bmatrix}$ is the second, giving $\\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}$."
            },
            {
              "q": "Using the column picture, what is $\\begin{bmatrix} 1 & 2 \\\\ 0 & 4 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}$?",
              "choices": [
                "$\\begin{bmatrix} 5 \\\\ 4 \\end{bmatrix}$",
                "$\\begin{bmatrix} 3 \\\\ 7 \\end{bmatrix}$",
                "$\\begin{bmatrix} 6 \\\\ 2 \\end{bmatrix}$"
              ],
              "answer": 0,
              "explain": "$A\\mathbf{x}$ is the weighted sum of columns $3\\begin{bmatrix}1\\\\0\\end{bmatrix} + 1\\begin{bmatrix}2\\\\4\\end{bmatrix} = \\begin{bmatrix}5\\\\4\\end{bmatrix}$."
            },
            {
              "q": "According to the lesson's big-picture idea, why must the inner dimensions match for a product $AB$ to be defined (i.e. $A$ is $m\\times n$ and $B$ must be $n\\times k$)?",
              "choices": [
                "The outputs of the map $B$ must live in the space that the map $A$ takes as input, so composing requires $B$'s output dimension to equal $A$'s input dimension",
                "It is an arbitrary bookkeeping convention chosen to make the row-column rule line up",
                "Both matrices must be square for multiplication to make sense"
              ],
              "answer": 0,
              "explain": "Since $AB$ is the composition 'do $B$, then $A$', the vectors $B$ produces must be valid inputs to $A$, forcing $B$'s output dimension to equal $A$'s input dimension."
            },
            {
              "q": "Geometrically, which of these is NOT a linear map (one that keeps grid lines straight, evenly spaced, parallel, and fixes the origin)?",
              "choices": [
                "A translation that shifts every vector by a fixed nonzero amount",
                "A rotation about the origin",
                "A horizontal shear"
              ],
              "answer": 0,
              "explain": "A translation moves the origin, so it violates $T(\\mathbf{0})=\\mathbf{0}$ and fails to respect addition and scaling, making it non-linear. Rotations about the origin and shears both fix the origin and are linear."
            }
          ],
          "flashcards": [
            {
              "front": "What does the product $AB$ represent in terms of linear maps?",
              "back": "The single linear map that applies $B$ first and then $A$: $(AB)\\mathbf{x} = A(B\\mathbf{x})$. Matrix multiplication is composition of the two maps, read right to left."
            },
            {
              "front": "What do the columns of a matrix $A$ represent?",
              "back": "The images of the standard basis vectors: column $j$ of $A$ equals $A\\mathbf{e}_j$, i.e. where the map sends $\\mathbf{e}_j$. Hence $A\\mathbf{x}$ is a linear combination of $A$'s columns weighted by the entries of $\\mathbf{x}$."
            },
            {
              "front": "Dimension rule: when is $AB$ defined and what shape is it?",
              "back": "If $A$ is $m\\times k$ and $B$ is $k\\times n$, the inner dimensions must match ($k=k$); then $AB$ is $m\\times n$. The shared inner dimension is the intermediate space and disappears from the result."
            },
            {
              "front": "State the row-column formula for $(AB)_{ij}$.",
              "back": "$(AB)_{ij} = \\sum_p A_{ip}B_{pj}$ = (row $i$ of $A$) $\\cdot$ (column $j$ of $B$). It is a consequence of composition, not a separate definition."
            },
            {
              "front": "Is matrix multiplication commutative? Associative? Distributive?",
              "back": "NOT commutative in general ($AB\\neq BA$). It IS associative ($(AB)C=A(BC)$) and distributive ($A(B+C)=AB+AC$). You may regroup and expand, but never reorder."
            },
            {
              "front": "What is the identity matrix $I_n$ and its defining property?",
              "back": "The $n\\times n$ matrix with 1's on the diagonal, 0's elsewhere; its columns are $\\mathbf{e}_1,\\dots,\\mathbf{e}_n$. It is the 'do nothing' map: $AI=IA=A$, and it commutes with every matrix."
            }
          ],
          "homework": [
            {
              "prompt": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ (a horizontal shear) and $B = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}$ (a vertical shear). Compute both $AB$ and $BA$, and confirm they differ.",
              "hint": "Use the column method: the $j$-th column of $AB$ is $A$ applied to the $j$-th column of $B$. Then check your work entry by entry with the row-column rule.",
              "solution": "Column method for $AB$: $A\\begin{bmatrix}1\\\\3\\end{bmatrix}=\\begin{bmatrix}1+6\\\\3\\end{bmatrix}=\\begin{bmatrix}7\\\\3\\end{bmatrix}$ and $A\\begin{bmatrix}0\\\\1\\end{bmatrix}=\\begin{bmatrix}2\\\\1\\end{bmatrix}$, so $AB=\\begin{bmatrix}7&2\\\\3&1\\end{bmatrix}$. For $BA$: $B\\begin{bmatrix}1\\\\0\\end{bmatrix}=\\begin{bmatrix}1\\\\3\\end{bmatrix}$ and $B\\begin{bmatrix}2\\\\1\\end{bmatrix}=\\begin{bmatrix}2\\\\7\\end{bmatrix}$, so $BA=\\begin{bmatrix}1&2\\\\3&7\\end{bmatrix}$. Since $\\begin{bmatrix}7&2\\\\3&1\\end{bmatrix}\\neq\\begin{bmatrix}1&2\\\\3&7\\end{bmatrix}$, the matrices do not commute. (Row-column check on $(AB)_{11}$: $1\\cdot1+2\\cdot3=7$. Correct.)"
            },
            {
              "prompt": "Without fully computing the entries, give the shape of the result (or state 'undefined') for each: (a) $(3\\times 4)(4\\times 2)$, (b) $(2\\times 5)(2\\times 5)$, (c) $(6\\times 1)(1\\times 6)$, (d) $(1\\times 6)(6\\times 1)$.",
              "hint": "Match the inner dimensions; if they agree the result takes the two outer dimensions. A $1\\times1$ result is just a single number (a dot product).",
              "solution": "(a) Inner dims $4=4$ match, result is $3\\times2$. (b) Inner dims $5\\neq2$, so it is undefined. (c) Inner dims $1=1$ match, result is $6\\times6$ (an 'outer product', a full matrix). (d) Inner dims $6=6$ match, result is $1\\times1$ — a single scalar (the dot product of the two vectors). Note how (c) and (d) use the same two vectors but, because order/shape differs, produce a $6\\times6$ matrix versus a single number."
            },
            {
              "prompt": "Let $R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ (rotation by $90^\\circ$). Compute $R^2$, $R^3$, and $R^4$. Interpret each result geometrically, and explain why $R$ commutes with $R^2$ even though matrices usually don't commute.",
              "hint": "$R^2 = RR$, $R^3 = R\\,R^2$, etc. Think about what repeated $90^\\circ$ rotations do, and recall that a matrix always commutes with its own powers.",
              "solution": "$R^2 = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} = \\begin{bmatrix}-1&0\\\\0&-1\\end{bmatrix} = -I$ (rotation by $180^\\circ$). $R^3 = R\\cdot R^2 = -R = \\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$ (rotation by $270^\\circ$, i.e. $90^\\circ$ clockwise). $R^4 = (R^2)^2 = (-I)^2 = I$ (rotation by $360^\\circ$ = identity). Geometrically, four quarter-turns return every vector to its start. $R$ commutes with $R^2$ because they are both rotations about the same center: doing 'one quarter turn then a half turn' and 'a half turn then a quarter turn' both give a three-quarter turn. More generally any matrix commutes with its own powers since $R\\cdot R^2 = R^3 = R^2\\cdot R$ — the operations are just repetitions of the same single map, so order cannot matter."
            }
          ],
          "examples": [
            {
              "title": "Composing a scaling with a rotation",
              "body": "Let $B=\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$ be the map that scales the $x$-axis by $2$ and the $y$-axis by $3$, and let $A=\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ be the map that rotates the plane by $90^\\circ$ counterclockwise. Compute the single matrix that represents \"first scale, then rotate,\" and confirm it agrees with applying the two maps one after the other to the vector $\\mathbf{v}=\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$.",
              "solution": "\"First scale ($B$), then rotate ($A$)\" is the composition $A\\circ B$, which as a matrix is the product $AB$ — read right-to-left, exactly like function composition $A(B\\mathbf{x})$.\n\n**Step 1 — Multiply the matrices via the column picture.** The columns of $AB$ are $A$ applied to each column of $B$.\n\nColumn 1 of $B$ is $\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix}$, so\n$$A\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} = 2\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} + 0\\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix}.$$\n\nColumn 2 of $B$ is $\\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix}$, so\n$$A\\begin{bmatrix} 0 \\\\ 3 \\end{bmatrix} = 0\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} + 3\\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 0 \\end{bmatrix}.$$\n\nStacking these as columns:\n$$AB = \\begin{bmatrix} 0 & -3 \\\\ 2 & 0 \\end{bmatrix}.$$\n\n**Step 2 — Check against doing the maps one at a time.** First scale $\\mathbf{v}$:\n$$B\\mathbf{v} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}.$$\nThen rotate the result:\n$$A(B\\mathbf{v}) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} (0)(2)+(-1)(3) \\\\ (1)(2)+(0)(3) \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 2 \\end{bmatrix}.$$\nNow apply the single composed matrix directly:\n$$(AB)\\mathbf{v} = \\begin{bmatrix} 0 & -3 \\\\ 2 & 0 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 2 \\end{bmatrix}.$$\nThe two results match, confirming $(AB)\\mathbf{v} = A(B\\mathbf{v})$ — multiplying the matrices really does compose the maps.\n\n**Step 3 — See non-commutativity geometrically.** Reverse the order (\"first rotate, then scale\") gives\n$$BA = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & -2 \\\\ 3 & 0 \\end{bmatrix} \\neq AB.$$\nScaling-then-rotating is not the same transformation as rotating-then-scaling, which is exactly why $AB\\neq BA$."
            },
            {
              "title": "A product of non-square maps and why the inner dimensions must match",
              "body": "Let $A=\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & -1 \\end{bmatrix}$ (a map $\\mathbb{R}^3\\to\\mathbb{R}^2$) and $B=\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\\\ 1 & 4 \\end{bmatrix}$ (a map $\\mathbb{R}^2\\to\\mathbb{R}^3$). Compute the composition $AB$, explain from the map viewpoint why $AB$ exists but the row-column rule for, say, $A$ times a $2\\times 2$ matrix would fail, and compute $BA$ to compare its shape.",
              "solution": "**Step 1 — Read off the dimensions from the maps.** $B$ sends $\\mathbb{R}^2\\to\\mathbb{R}^3$ and $A$ sends $\\mathbb{R}^3\\to\\mathbb{R}^2$. The composition $A\\circ B$ takes a vector in $\\mathbb{R}^2$, lands it in $\\mathbb{R}^3$ via $B$, then sends it to $\\mathbb{R}^2$ via $A$: overall $\\mathbb{R}^2\\to\\mathbb{R}^2$. So $AB$ is a $2\\times 2$ matrix.\n\nThis is the dimension rule made obvious: $A$ is $2\\times 3$ and $B$ is $3\\times 2$. The output space of $B$ (dimension $3$) must equal the input space of $A$ (dimension $3$) for the chain to connect — that shared $3$ is precisely the matching inner dimension. The surviving outer dimensions, $2$ and $2$, give the size of $AB$.\n\n**Step 2 — Compute $AB$ with the column picture.** Each column of $AB$ is $A$ applied to a column of $B$.\n\nColumn 1: $A\\begin{bmatrix} 2 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} (1)(2)+(2)(0)+(0)(1) \\\\ (0)(2)+(1)(0)+(-1)(1) \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ -1 \\end{bmatrix}.$\n\nColumn 2: $A\\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} (1)(1)+(2)(3)+(0)(4) \\\\ (0)(1)+(1)(3)+(-1)(4) \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ -1 \\end{bmatrix}.$\n\nTherefore\n$$AB = \\begin{bmatrix} 2 & 7 \\\\ -1 & -1 \\end{bmatrix}.$$\n\n**Step 3 — Why $A$ times a $2\\times 2$ matrix would be undefined.** A $2\\times 2$ matrix $M$ is a map $\\mathbb{R}^2\\to\\mathbb{R}^2$. To form $AM$ you would feed the output of $M$ (in $\\mathbb{R}^2$) into $A$, but $A$ demands an input from $\\mathbb{R}^3$. The pipes do not connect, so the product is undefined — equivalently, $A$ has $3$ columns but $M$ has only $2$ rows, and the row-column rule needs one number per column of $A$ to pair with. The inner dimensions $3$ and $2$ disagree.\n\n**Step 4 — Compute $BA$ to see the shape flip.** Here $A$ acts first ($\\mathbb{R}^3\\to\\mathbb{R}^2$) then $B$ ($\\mathbb{R}^2\\to\\mathbb{R}^3$), giving $\\mathbb{R}^3\\to\\mathbb{R}^3$, a $3\\times 3$ matrix. Using the column picture (apply $B$ to each column of $A$):\n\n$B\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 0 \\\\ 1 \\end{bmatrix}, \\quad B\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} (2)(2)+(1)(1) \\\\ (0)(2)+(3)(1) \\\\ (1)(2)+(4)(1) \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 3 \\\\ 6 \\end{bmatrix}, \\quad B\\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ -3 \\\\ -4 \\end{bmatrix}.$\n\nSo\n$$BA = \\begin{bmatrix} 2 & 5 & -1 \\\\ 0 & 3 & -3 \\\\ 1 & 6 & -4 \\end{bmatrix}.$$\n\n$AB$ is $2\\times 2$ while $BA$ is $3\\times 3$: they are not even the same size, so $AB\\neq BA$ in the strongest possible way. Composing maps in the other order produces a genuinely different transformation, on a different space."
            }
          ]
        },
        {
          "id": "la-inverse-and-systems",
          "title": "Inverses and Solving Linear Systems",
          "minutes": 18,
          "content": "<h3>The Central Question of Linear Algebra</h3>\n<p>Almost everything in applied linear algebra circles back to one deceptively simple equation:</p>\n$$A\\mathbf{x} = \\mathbf{b}$$\n<p>Here $A$ is a known $m \\times n$ matrix, $\\mathbf{b}$ is a known vector in $\\mathbb{R}^m$, and $\\mathbf{x} \\in \\mathbb{R}^n$ is unknown. Fitting a linear regression, computing the steady state of a Markov chain, projecting onto a subspace, solving the normal equations behind least squares — all of these reduce to \"solve $A\\mathbf{x} = \\mathbf{b}$.\" So it is worth understanding this equation deeply, not just mechanically.</p>\n<p>There are two complementary readings of $A\\mathbf{x} = \\mathbf{b}$:</p>\n<ul>\n<li><strong>Row picture:</strong> each row of $A$ is the coefficients of a linear equation. The solution set is the <em>intersection</em> of $m$ hyperplanes.</li>\n<li><strong>Column picture:</strong> $A\\mathbf{x}$ is a <em>linear combination of the columns of $A$</em>, with weights $x_1, \\dots, x_n$. Solving $A\\mathbf{x}=\\mathbf{b}$ asks: can $\\mathbf{b}$ be written as a combination of $A$'s columns, and if so, how?</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The column picture is the one that pays off later. \"$A\\mathbf{x}=\\mathbf{b}$ is solvable\" literally means \"$\\mathbf{b}$ lies in the column space (span of the columns) of $A$.\" Whether the solution is unique depends on whether the columns are linearly independent. Keep both pictures in your head, but reach for the column picture when reasoning about existence and uniqueness.</p></div>\n\n<h3>Gaussian Elimination: Triangulating the System</h3>\n<p>The workhorse algorithm is <strong>Gaussian elimination</strong>: use a sequence of reversible operations to transform $A$ into a triangular (and then diagonal-ish) shape from which the answer can be read off. The three <strong>elementary row operations</strong> are:</p>\n<ol>\n<li><strong>Swap</strong> two rows ($R_i \\leftrightarrow R_j$).</li>\n<li><strong>Scale</strong> a row by a nonzero constant ($R_i \\to cR_i$, $c \\neq 0$).</li>\n<li><strong>Replace</strong> a row by itself plus a multiple of another ($R_i \\to R_i + cR_j$).</li>\n</ol>\n<p>The crucial fact: <strong>each of these operations is invertible and preserves the solution set</strong> of $A\\mathbf{x}=\\mathbf{b}$. So we apply them freely to the <em>augmented matrix</em> $[A \\mid \\mathbf{b}]$, knowing the solutions never change.</p>\n\n<h4>Row echelon form (REF) and reduced row echelon form (RREF)</h4>\n<p>A matrix is in <strong>row echelon form</strong> when:</p>\n<ul>\n<li>all-zero rows are at the bottom;</li>\n<li>each row's leading nonzero entry (its <strong>pivot</strong>) is strictly to the right of the pivot above it.</li>\n</ul>\n<p>It is in <strong>reduced</strong> row echelon form (RREF) when additionally every pivot equals $1$ and is the <em>only</em> nonzero entry in its column. RREF is <strong>unique</strong> for a given matrix — REF is not. The columns containing pivots are <strong>pivot columns</strong>; the variables they correspond to are <strong>basic variables</strong>. Columns without pivots correspond to <strong>free variables</strong>.</p>\n\n<h4>A worked elimination</h4>\n<p>Solve the system\n$$\\begin{aligned} x_1 + 2x_2 + x_3 &= 2\\\\ 2x_1 + 5x_2 + 3x_3 &= 5\\\\ -x_1 - 4x_2 - x_3 &= -1\\end{aligned}$$\nForm the augmented matrix and eliminate below the first pivot:</p>\n<pre><code>[ 1   2   1 | 2 ]\n[ 2   5   3 | 5 ]      R2 -> R2 - 2 R1\n[-1  -4  -1 |-1 ]      R3 -> R3 + 1 R1\n\n[ 1   2   1 | 2 ]\n[ 0   1   1 | 1 ]\n[ 0  -2   0 | 1 ]      R3 -> R3 + 2 R2\n\n[ 1   2   1 | 2 ]\n[ 0   1   1 | 1 ]\n[ 0   0   2 | 3 ]      <- now in REF, three pivots</code></pre>\n<p>This is REF. We could <strong>back-substitute</strong> now: the last row gives $2x_3 = 3 \\Rightarrow x_3 = \\tfrac{3}{2}$; the second gives $x_2 + x_3 = 1 \\Rightarrow x_2 = -\\tfrac{1}{2}$; the first gives $x_1 = 2 - 2x_2 - x_3 = 2 + 1 - \\tfrac{3}{2} = \\tfrac{3}{2}$. Or we continue all the way to RREF (Gauss-Jordan), clearing entries above each pivot:</p>\n<pre><code>[ 1   2   1 | 2  ]   R3 -> (1/2) R3\n[ 0   1   1 | 1  ]\n[ 0   0   1 | 3/2]\n\n[ 1   2   0 | 1/2 ]  R1 -> R1 - R3,  R2 -> R2 - R3\n[ 0   1   0 |-1/2 ]\n[ 0   0   1 | 3/2 ]\n\n[ 1   0   0 | 3/2 ]  R1 -> R1 - 2 R2\n[ 0   1   0 |-1/2 ]\n[ 0   0   1 | 3/2 ]</code></pre>\n<p>Now the solution is read off directly: $\\mathbf{x} = (\\tfrac{3}{2}, -\\tfrac{1}{2}, \\tfrac{3}{2})$. Three pivots in three columns means a unique solution.</p>\n\n<h3>Existence, Uniqueness, and the Three Outcomes</h3>\n<p>Once $[A\\mid\\mathbf{b}]$ is in echelon form, the entire fate of the system is visible from the pivot pattern. There are exactly three cases.</p>\n<h4>1. Inconsistent (no solution)</h4>\n<p>If elimination produces a row of the form $[\\,0\\ 0\\ \\cdots\\ 0 \\mid c\\,]$ with $c \\neq 0$, the system asserts $0 = c$, a contradiction. Equivalently, $\\mathbf{b}$ is <em>not</em> in the column space of $A$. The criterion is rank-based: the system is consistent iff $\\operatorname{rank}(A) = \\operatorname{rank}([A\\mid\\mathbf{b}])$.</p>\n<h4>2. Unique solution</h4>\n<p>If the system is consistent and <strong>every</strong> column of $A$ is a pivot column (i.e. $\\operatorname{rank}(A) = n$, the number of unknowns — full <em>column</em> rank, no free variables), there is exactly one solution.</p>\n<h4>3. Infinitely many solutions (underdetermined)</h4>\n<p>If the system is consistent but there is at least one free variable ($\\operatorname{rank}(A) &lt; n$), there are infinitely many solutions. The free variables are parameters; the basic variables are determined in terms of them. The solution set is an affine subspace: <em>(one particular solution)</em> $+$ <em>(any vector in the null space of $A$)</em>.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>This trichotomy is the linear-algebra skeleton of regression. With more data points than features ($m &gt; n$) and noise, $A\\mathbf{x}=\\mathbf{b}$ is typically <em>inconsistent</em> — no exact fit exists — which is exactly why we minimize $\\lVert A\\mathbf{x}-\\mathbf{b}\\rVert^2$ instead (least squares). With more features than data ($n &gt; m$, the overparameterized regime of modern deep nets), the system is <em>underdetermined</em>: infinitely many zero-error solutions exist, and the choice among them — the inductive bias of the optimizer toward minimum-norm solutions — is what governs generalization.</p></div>\n\n<h4>Reading off the parametric solution</h4>\n<p>Suppose RREF of $[A\\mid\\mathbf{b}]$ is\n$$\\left[\\begin{array}{ccc|c} 1 & 0 & 2 & 5\\\\ 0 & 1 & -3 & 1\\\\ 0 & 0 & 0 & 0\\end{array}\\right].$$\nColumns 1 and 2 are pivots ($x_1, x_2$ basic); column 3 is free ($x_3 = t$). The first two rows say $x_1 = 5 - 2t$ and $x_2 = 1 + 3t$. So\n$$\\mathbf{x} = \\begin{bmatrix}5\\\\1\\\\0\\end{bmatrix} + t\\begin{bmatrix}-2\\\\3\\\\1\\end{bmatrix}.$$\nThe first vector is a particular solution; the second spans the null space. Every solution has this form.</p>\n\n<h3>The Matrix Inverse</h3>\n<p>For a <strong>square</strong> $n \\times n$ matrix $A$, the inverse $A^{-1}$ (when it exists) is the unique matrix with\n$$A^{-1}A = AA^{-1} = I_n.$$\nIf $A$ is invertible, then $A\\mathbf{x}=\\mathbf{b}$ has the unique solution $\\mathbf{x} = A^{-1}\\mathbf{b}$ for <em>every</em> $\\mathbf{b}$. Conceptually, $A$ is the matrix of a linear map; $A^{-1}$ is the matrix that exactly undoes it.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>\"Invertible\" is a single condition wearing many disguises. For a square $A$, the following are <em>all equivalent</em> (the Invertible Matrix Theorem): $A$ is invertible; $A\\mathbf{x}=\\mathbf{0}$ has only the trivial solution; the columns of $A$ are linearly independent; the columns span $\\mathbb{R}^n$; $\\operatorname{rank}(A) = n$ (full rank); RREF of $A$ is $I_n$; $\\det(A) \\neq 0$; and $A\\mathbf{x}=\\mathbf{b}$ has a unique solution for every $\\mathbf{b}$. Internalize this list — much of the subject is the discovery that these notions coincide.</p></div>\n\n<h4>When does it exist?</h4>\n<p>An inverse exists <strong>if and only if $A$ is square and has full rank</strong> ($\\operatorname{rank}(A)=n$). Non-square matrices are never invertible in this two-sided sense (they can have only one-sided, \"pseudo,\" inverses). A square matrix that fails to be full rank is called <strong>singular</strong>; its columns are linearly dependent, its determinant is $0$, and $A\\mathbf{x}=\\mathbf{0}$ has nontrivial solutions.</p>\n\n<h4>The 2×2 formula</h4>\n<p>For $A = \\begin{bmatrix} a & b\\\\ c & d\\end{bmatrix}$, the determinant is $\\det A = ad - bc$, and provided $\\det A \\neq 0$,\n$$A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b\\\\ -c & a\\end{bmatrix}.$$\nMemorize the pattern: <em>swap the diagonal, negate the off-diagonal, divide by the determinant.</em> For example, $\\begin{bmatrix}2&1\\\\5&3\\end{bmatrix}$ has $\\det = 6-5 = 1$, so its inverse is $\\begin{bmatrix}3&-1\\\\-5&2\\end{bmatrix}$ (you can verify the product is $I$).</p>\n\n<h4>Computing $A^{-1}$ by Gauss-Jordan</h4>\n<p>There is no closed-form formula worth memorizing for $3\\times 3$ and larger; instead use Gauss-Jordan elimination. Form the augmented block $[\\,A \\mid I\\,]$ and row-reduce until the left half becomes $I$. The right half is then $A^{-1}$:\n$$[\\,A \\mid I\\,] \\xrightarrow{\\text{row reduce}} [\\,I \\mid A^{-1}\\,].$$\n<strong>Why this works:</strong> each row operation is left-multiplication by an elementary matrix $E_k$. Reducing $A$ to $I$ means $E_k\\cdots E_1 A = I$, so $E_k\\cdots E_1 = A^{-1}$. Applying the same operations to $I$ computes exactly that product. If the left half cannot be reduced to $I$ (a zero row appears), then $A$ is singular and has no inverse.</p>\n\n<h4>Worked 3×3 inversion</h4>\n<p>Invert $A = \\begin{bmatrix} 2 & 1 & 1\\\\ 1 & 3 & 2\\\\ 1 & 0 & 0\\end{bmatrix}$. Augment with $I$ and reduce:</p>\n<pre><code>[ 2 1 1 | 1 0 0 ]\n[ 1 3 2 | 0 1 0 ]   R1 <-> R3  (get a 1 in the corner)\n[ 1 0 0 | 0 0 1 ]\n\n[ 1 0 0 | 0 0 1 ]\n[ 1 3 2 | 0 1 0 ]   R2 -> R2 - R1,  R3 -> R3 - 2 R1\n[ 2 1 1 | 1 0 0 ]\n\n[ 1 0 0 | 0 0  1 ]\n[ 0 3 2 | 0 1 -1 ]\n[ 0 1 1 | 1 0 -2 ]  R2 <-> R3\n\n[ 1 0 0 | 0 0  1 ]\n[ 0 1 1 | 1 0 -2 ]\n[ 0 3 2 | 0 1 -1 ]  R3 -> R3 - 3 R2\n\n[ 1 0 0 | 0  0  1 ]\n[ 0 1 1 | 1  0 -2 ]\n[ 0 0 -1|-3  1  5 ]  R3 -> -R3\n\n[ 1 0 0 | 0  0  1 ]\n[ 0 1 1 | 1  0 -2 ]  R2 -> R2 - R3\n[ 0 0 1 | 3 -1 -5 ]\n\n[ 1 0 0 | 0  0  1 ]\n[ 0 1 0 |-2  1  3 ]\n[ 0 0 1 | 3 -1 -5 ]</code></pre>\n<p>So\n$$A^{-1} = \\begin{bmatrix} 0 & 0 & 1\\\\ -2 & 1 & 3\\\\ 3 & -1 & -5\\end{bmatrix}.$$\nSanity check the last row of $A$ times the columns of $A^{-1}$: row $(1,0,0)$ dotted with the columns of $A^{-1}$ gives $(0,0,1)$ — the third standard basis vector, as required by $AA^{-1}=I$.</p>\n\n<h3>Inverse vs. Elimination: A Practical Warning</h3>\n<p>Although $\\mathbf{x} = A^{-1}\\mathbf{b}$ is elegant, you should almost never compute $A^{-1}$ explicitly to solve a system. Forming the inverse costs roughly three times the work of a single elimination, amplifies rounding error, and destroys any sparsity in $A$. The professional move is to <strong>factor</strong> $A$ once (e.g. $A = LU$, or $A = QR$, or a Cholesky factorization $A = LL^\\top$ for symmetric positive-definite matrices) and then solve by cheap triangular substitutions — reusing the factorization for many right-hand sides. Library calls like NumPy's <code>np.linalg.solve(A, b)</code> do this for you; reach for <code>np.linalg.inv</code> only when you genuinely need the inverse matrix as an object.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The textbook closed-form for linear regression, $\\hat{\\mathbf{w}} = (X^\\top X)^{-1}X^\\top\\mathbf{y}$, is written with an inverse but should be <em>computed</em> by solving the normal equations $(X^\\top X)\\mathbf{w} = X^\\top\\mathbf{y}$ via a Cholesky or QR factorization. When $X^\\top X$ is singular or nearly so (collinear features), the inverse blows up — which is precisely why ridge regression adds $\\lambda I$ to make $X^\\top X + \\lambda I$ invertible and well-conditioned. Understanding rank and invertibility tells you exactly when and why regularization is needed.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li>Gaussian elimination uses three reversible row operations to reach (R)REF without changing the solution set; RREF is unique.</li>\n<li>Pivots reveal everything: a pivot in the augmented column means inconsistent; full column rank (no free variables) means unique; free variables mean infinitely many solutions, written as particular $+$ null-space.</li>\n<li>A square matrix is invertible iff it has full rank iff $\\det \\neq 0$ iff RREF is $I$ — and then $A\\mathbf{x}=\\mathbf{b}$ has the unique solution $A^{-1}\\mathbf{b}$.</li>\n<li>Invert $2\\times2$ by formula; invert larger matrices by reducing $[A\\mid I] \\to [I\\mid A^{-1}]$.</li>\n<li>In practice, solve by factorization, not by explicit inversion — this is the bridge to numerically sound least squares and regularization in ML.</li>\n</ul>",
          "mcq": [
            {
              "q": "An augmented matrix $[A\\mid\\mathbf{b}]$ for a system in 4 unknowns reduces to RREF with exactly 3 pivots, none of which is in the last (augmented) column. What is the solution set?",
              "choices": [
                "No solution (inconsistent)",
                "Exactly one solution",
                "Infinitely many solutions, with 1 free variable",
                "Infinitely many solutions, with 3 free variables"
              ],
              "answer": 2,
              "explain": "No pivot in the augmented column means consistent. With 4 unknowns and 3 pivot columns among them, there are 4 - 3 = 1 free variables, giving infinitely many solutions."
            },
            {
              "q": "Which statement is NOT equivalent to '$A$ is an invertible $n\\times n$ matrix'?",
              "choices": [
                "$\\det(A) \\neq 0$",
                "The columns of $A$ are linearly independent",
                "$A\\mathbf{x}=\\mathbf{0}$ has only the trivial solution",
                "$A$ has more rows than columns"
              ],
              "answer": 3,
              "explain": "Invertibility requires $A$ to be square; 'more rows than columns' contradicts that. The other three are all standard equivalent characterizations from the Invertible Matrix Theorem."
            },
            {
              "q": "For $A=\\begin{bmatrix}3 & 6\\\\1 & 2\\end{bmatrix}$, what can you conclude?",
              "choices": [
                "$A^{-1} = \\frac{1}{0}\\begin{bmatrix}2 & -6\\\\-1 & 3\\end{bmatrix}$, so the inverse is large",
                "$A$ is singular because $\\det A = 3\\cdot2 - 6\\cdot1 = 0$",
                "$A$ is invertible because its entries are all nonzero",
                "$A^{-1} = \\begin{bmatrix}2 & -6\\\\-1 & 3\\end{bmatrix}$"
              ],
              "answer": 1,
              "explain": "The determinant is $ad-bc = 6-6 = 0$, so $A$ is singular and has no inverse (its second column is twice the first, i.e. dependent columns)."
            },
            {
              "q": "Why is solving $A\\mathbf{x}=\\mathbf{b}$ via $\\mathbf{x}=A^{-1}\\mathbf{b}$ generally discouraged in numerical practice?",
              "choices": [
                "It gives the wrong answer",
                "It only works for symmetric matrices",
                "It costs more work, is less numerically stable, and destroys sparsity compared to factor-and-substitute",
                "Inverses do not exist for most square matrices"
              ],
              "answer": 2,
              "explain": "Explicit inversion is roughly 3x the cost of one elimination, amplifies rounding error, and fills in zeros; factorizations (LU, QR, Cholesky) solve more accurately and can be reused across right-hand sides."
            },
            {
              "q": "Under the column picture, the statement \"$A\\mathbf{x}=\\mathbf{b}$ has at least one solution\" is exactly equivalent to which condition?",
              "choices": [
                "$\\mathbf{b}$ lies in the column space (span of the columns) of $A$",
                "The columns of $A$ are linearly independent",
                "$A$ is a square matrix",
                "Every row of $A$ contains a pivot after elimination"
              ],
              "answer": 0,
              "explain": "In the column picture, $A\\mathbf{x}$ is a linear combination of $A$'s columns, so the system is solvable exactly when $\\mathbf{b}$ can be written as such a combination, i.e. $\\mathbf{b}$ lies in the column space. Independent columns concern uniqueness, squareness is irrelevant, and 'a pivot in every row' guarantees solvability for every $\\mathbf{b}$ (a stronger condition), not equivalence for a particular $\\mathbf{b}$."
            },
            {
              "q": "Two students each correctly reduce the same matrix $A$ to row echelon form but get visibly different REFs. What is the best explanation?",
              "choices": [
                "At least one of them made an arithmetic error, since the result is determined",
                "REF is not unique, so different valid pivot/elimination choices give different REFs — but RREF would be identical",
                "They must have started from different matrices",
                "REF is unique but RREF is not, so they should compare RREFs to find the mistake"
              ],
              "answer": 1,
              "explain": "RREF is unique for a given matrix while REF is not, so two correct reductions can yield different REFs from different valid choices; reducing all the way to RREF would give identical results."
            },
            {
              "q": "Which of the following is NOT one of the three elementary row operations, and would in general change the solution set of $A\\mathbf{x}=\\mathbf{b}$?",
              "choices": [
                "Swapping two rows",
                "Scaling a row by a nonzero constant",
                "Scaling a row by zero",
                "Adding a multiple of one row to another row"
              ],
              "answer": 2,
              "explain": "The three elementary row operations are row swaps, scaling by a nonzero constant ($c\\neq 0$), and adding a multiple of one row to another; each is reversible and preserves the solution set. Scaling by zero is not allowed because it is not reversible and destroys an equation, in general changing the solution set."
            },
            {
              "q": "After reducing $[A\\mid\\mathbf{b}]$, a column of $A$ contains no pivot. What does that column's variable become?",
              "choices": [
                "A basic variable, fixed by the pivot in its column",
                "A free variable, signaling the solution (if any exists) is not unique",
                "An inconsistent variable, meaning no solution exists",
                "A leading variable that must equal a corresponding entry of $\\mathbf{b}$"
              ],
              "answer": 1,
              "explain": "Pivot columns correspond to basic variables; a non-pivot column corresponds to a free variable, so any solution that exists is not unique. (A non-pivot column does not by itself signal inconsistency — that comes from a pivot in the augmented column.)"
            }
          ],
          "flashcards": [
            {
              "front": "What are the three elementary row operations, and what key property do they share?",
              "back": "Swap two rows; scale a row by a nonzero constant; add a multiple of one row to another. All three are invertible and preserve the solution set of $A\\mathbf{x}=\\mathbf{b}$."
            },
            {
              "front": "How do you read existence and uniqueness from the echelon form of $[A\\mid\\mathbf{b}]$ (system with $n$ unknowns)?",
              "back": "Pivot in the augmented column -> inconsistent (no solution). Otherwise consistent: if rank = n (no free variables) -> unique; if rank < n (free variables exist) -> infinitely many."
            },
            {
              "front": "State the 2x2 inverse formula.",
              "back": "For $A=\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$ with $\\det A = ad-bc \\neq 0$: $A^{-1}=\\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$ (swap diagonal, negate off-diagonal, divide by det)."
            },
            {
              "front": "How do you compute $A^{-1}$ for a general $n\\times n$ matrix via Gauss-Jordan?",
              "back": "Row-reduce the augmented block $[A\\mid I]$ until the left half is $I$; the right half becomes $A^{-1}$. If a zero row appears on the left, $A$ is singular (no inverse)."
            },
            {
              "front": "List several equivalent conditions for a square matrix $A$ to be invertible.",
              "back": "$\\operatorname{rank}(A)=n$ (full rank); $\\det(A)\\neq 0$; columns linearly independent / span $\\mathbb{R}^n$; RREF is $I$; $A\\mathbf{x}=\\mathbf{0}$ has only $\\mathbf{x}=\\mathbf{0}$; $A\\mathbf{x}=\\mathbf{b}$ has a unique solution for every $\\mathbf{b}$."
            },
            {
              "front": "Why does row-reducing $[A\\mid I]\\to[I\\mid A^{-1}]$ actually produce the inverse?",
              "back": "Each row op is left-multiplication by an elementary matrix $E_k$. Reducing $A$ to $I$ means $E_k\\cdots E_1 A=I$, so $E_k\\cdots E_1=A^{-1}$; applying the same ops to $I$ computes that product."
            }
          ],
          "homework": [
            {
              "prompt": "Solve the system, or show it is inconsistent: $\\begin{aligned} x_1 + 2x_2 - x_3 &= 1\\\\ 2x_1 + 4x_2 + x_3 &= 5\\\\ x_1 + 2x_2 + 2x_3 &= 4\\end{aligned}$. If there are infinitely many solutions, give the full parametric form.",
              "hint": "Row-reduce the augmented matrix. Notice that columns 1 and 2 are proportional in the coefficient pattern, so watch for a free variable.",
              "solution": "Augment and eliminate. R2 -> R2 - 2R1 gives [0 0 3 | 3]; R3 -> R3 - R1 gives [0 0 3 | 3]. So:\n[1 2 -1 | 1]\n[0 0  3 | 3]\n[0 0  3 | 3]\nThen R3 -> R3 - R2 zeros the last row, and R2 -> (1/3)R2 gives a pivot: x3 = 1. R1 -> R1 + R2 gives [1 2 0 | 2]. Columns 1 (pivot) and 3 (pivot); column 2 is free. Let x2 = t. Then x1 = 2 - 2t and x3 = 1. Solution set: x = (2,0,1) + t(-2,1,0). Consistent with infinitely many solutions (one free variable)."
            },
            {
              "prompt": "Compute the inverse of $A=\\begin{bmatrix}1 & 2 & 3\\\\0 & 1 & 4\\\\5 & 6 & 0\\end{bmatrix}$ using Gauss-Jordan, and verify by checking one entry of $AA^{-1}$.",
              "hint": "Augment with the 3x3 identity and reduce $[A\\mid I]\\to[I\\mid A^{-1}]$. This matrix is invertible (its determinant is 1).",
              "solution": "Reducing [A | I]:\nUse R1 to clear column 1: R3 -> R3 - 5R1 gives row [0 -4 -15 | -5 0 1].\nWith R2 = [0 1 4 | 0 1 0] as the column-2 pivot, clear column 2: R1 -> R1 - 2R2 = [1 0 -5 | 1 -2 0]; R3 -> R3 + 4R2 = [0 0 1 | -5 4 1].\nNow R3 is the column-3 pivot. Clear column 3: R1 -> R1 + 5R3 = [1 0 0 | -24 18 5]; R2 -> R2 - 4R3 = [0 1 0 | 20 -15 -4].\nThus A^{-1} = [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]].\nVerify the (1,1) entry of A A^{-1}: row1 of A = (1,2,3) dotted with column1 of A^{-1} = (-24,20,-5): 1(-24)+2(20)+3(-5) = -24+40-15 = 1. Correct (equals the (1,1) entry of I)."
            },
            {
              "prompt": "Let $A$ be $5\\times 7$ with $\\operatorname{rank}(A)=5$. (a) For a given $\\mathbf{b}\\in\\mathbb{R}^5$, how many solutions does $A\\mathbf{x}=\\mathbf{b}$ have? (b) Is $A$ invertible? (c) Briefly relate this to the overparameterized regime in machine learning.",
              "hint": "Compare the rank to the number of rows (for existence) and to the number of columns/unknowns (for uniqueness). Recall invertibility requires squareness.",
              "solution": "(a) rank = 5 = number of rows, so the rows span R^5 and the column space is all of R^5; hence A x = b is consistent for every b (no inconsistency possible). Number of unknowns n = 7 > rank = 5, so there are 7 - 5 = 2 free variables: infinitely many solutions, an affine subspace of dimension 2 (a particular solution plus the 2-dimensional null space). (b) No. A is not square (5x7), so it has no two-sided inverse; at best a right inverse exists. (c) This is the underdetermined / overparameterized regime: more parameters (7) than constraints/data (5). Infinitely many exact-fit solutions exist, and which one a learning algorithm selects (e.g. gradient descent's implicit bias toward the minimum-norm solution) determines generalization. This motivates regularization to pick a well-behaved solution from the infinite set."
            }
          ],
          "examples": [
            {
              "title": "Solving a 3x3 System by Gaussian Elimination",
              "body": "Solve the linear system $A\\mathbf{x} = \\mathbf{b}$ by Gaussian elimination, where\n$$A = \\begin{bmatrix} 2 & 1 & -1 \\\\ -3 & -1 & 2 \\\\ -2 & 1 & 2 \\end{bmatrix}, \\qquad \\mathbf{b} = \\begin{bmatrix} 8 \\\\ -11 \\\\ -3 \\end{bmatrix}.$$\nReduce the augmented matrix $[A \\mid \\mathbf{b}]$ to row echelon form, then back-substitute.",
              "solution": "**Step 1 — Write the augmented matrix.**\n$$[A \\mid \\mathbf{b}] = \\left[\\begin{array}{ccc|c} 2 & 1 & -1 & 8 \\\\ -3 & -1 & 2 & -11 \\\\ -2 & 1 & 2 & -3 \\end{array}\\right].$$\n\n**Step 2 — Clear column 1 below the pivot $2$.** Use the operations $R_2 \\to R_2 + \\tfrac{3}{2}R_1$ and $R_3 \\to R_3 + R_1$.\n\nFor $R_2$: $(-3,-1,2,-11) + \\tfrac{3}{2}(2,1,-1,8) = (0,\\ \\tfrac{1}{2},\\ \\tfrac{1}{2},\\ 1)$.\n\nFor $R_3$: $(-2,1,2,-3) + (2,1,-1,8) = (0,\\ 2,\\ 1,\\ 5)$.\n$$\\left[\\begin{array}{ccc|c} 2 & 1 & -1 & 8 \\\\ 0 & \\tfrac{1}{2} & \\tfrac{1}{2} & 1 \\\\ 0 & 2 & 1 & 5 \\end{array}\\right].$$\n\n**Step 3 — Clear column 2 below the second pivot $\\tfrac{1}{2}$.** The multiplier is $2 \\div \\tfrac{1}{2} = 4$, so apply $R_3 \\to R_3 - 4R_2$.\n\n$(0,2,1,5) - 4\\left(0,\\tfrac{1}{2},\\tfrac{1}{2},1\\right) = (0,\\ 0,\\ -1,\\ 1)$.\n$$\\left[\\begin{array}{ccc|c} 2 & 1 & -1 & 8 \\\\ 0 & \\tfrac{1}{2} & \\tfrac{1}{2} & 1 \\\\ 0 & 0 & -1 & 1 \\end{array}\\right].$$\nThis is row echelon form, with three pivots ($2,\\ \\tfrac{1}{2},\\ -1$), so the system has a unique solution.\n\n**Step 4 — Back-substitute.** From the last row, $-z = 1 \\Rightarrow z = -1$.\n\nSecond row: $\\tfrac{1}{2}y + \\tfrac{1}{2}z = 1 \\Rightarrow \\tfrac{1}{2}y + \\tfrac{1}{2}(-1) = 1 \\Rightarrow \\tfrac{1}{2}y = \\tfrac{3}{2} \\Rightarrow y = 3$.\n\nFirst row: $2x + y - z = 8 \\Rightarrow 2x + 3 - (-1) = 8 \\Rightarrow 2x = 4 \\Rightarrow x = 2$.\n\n**Solution:** $\\mathbf{x} = \\begin{bmatrix} 2 \\\\ 3 \\\\ -1 \\end{bmatrix}$.\n\n**Check.** Row 1: $2(2)+3-(-1)=4+3+1=8$. Row 2: $-3(2)-3+2(-1)=-6-3-2=-11$. Row 3: $-2(2)+3+2(-1)=-4+3-2=-3$. All match $\\mathbf{b}$, so the solution is correct."
            },
            {
              "title": "Solving a System via the Matrix Inverse",
              "body": "Consider the system\n$$\\begin{cases} 4x + 3y = 10 \\\\ 6x + 3y = 12 \\end{cases}$$\nWrite it as $A\\mathbf{x} = \\mathbf{b}$, compute $A^{-1}$ using the $2 \\times 2$ inverse formula, and solve via $\\mathbf{x} = A^{-1}\\mathbf{b}$.",
              "solution": "**Step 1 — Identify $A$ and $\\mathbf{b}$.**\n$$A = \\begin{bmatrix} 4 & 3 \\\\ 6 & 3 \\end{bmatrix}, \\qquad \\mathbf{b} = \\begin{bmatrix} 10 \\\\ 12 \\end{bmatrix}.$$\n\n**Step 2 — Compute the determinant.** For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $\\det A = ad - bc$.\n$$\\det A = (4)(3) - (3)(6) = 12 - 18 = -6.$$\nSince $\\det A = -6 \\neq 0$, $A$ is invertible and the system has a unique solution.\n\n**Step 3 — Apply the $2 \\times 2$ inverse formula** $A^{-1} = \\dfrac{1}{\\det A}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.\n$$A^{-1} = \\frac{1}{-6}\\begin{bmatrix} 3 & -3 \\\\ -6 & 4 \\end{bmatrix} = \\begin{bmatrix} -\\tfrac{1}{2} & \\tfrac{1}{2} \\\\ 1 & -\\tfrac{2}{3} \\end{bmatrix}.$$\n\n**Step 4 — Verify the inverse** by checking $A A^{-1} = I$.\n$$\\begin{bmatrix} 4 & 3 \\\\ 6 & 3 \\end{bmatrix}\\begin{bmatrix} -\\tfrac{1}{2} & \\tfrac{1}{2} \\\\ 1 & -\\tfrac{2}{3} \\end{bmatrix} = \\begin{bmatrix} 4(-\\tfrac{1}{2})+3(1) & 4(\\tfrac{1}{2})+3(-\\tfrac{2}{3}) \\\\ 6(-\\tfrac{1}{2})+3(1) & 6(\\tfrac{1}{2})+3(-\\tfrac{2}{3}) \\end{bmatrix} = \\begin{bmatrix} -2+3 & 2-2 \\\\ -3+3 & 3-2 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}.\\ \\checkmark$$\n\n**Step 5 — Solve** $\\mathbf{x} = A^{-1}\\mathbf{b}$.\n$$\\mathbf{x} = \\begin{bmatrix} -\\tfrac{1}{2} & \\tfrac{1}{2} \\\\ 1 & -\\tfrac{2}{3} \\end{bmatrix}\\begin{bmatrix} 10 \\\\ 12 \\end{bmatrix} = \\begin{bmatrix} -\\tfrac{1}{2}(10) + \\tfrac{1}{2}(12) \\\\ 1(10) - \\tfrac{2}{3}(12) \\end{bmatrix} = \\begin{bmatrix} -5 + 6 \\\\ 10 - 8 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}.$$\n\n**Solution:** $x = 1,\\ y = 2$.\n\n**Check.** Equation 1: $4(1) + 3(2) = 4 + 6 = 10$. Equation 2: $6(1) + 3(2) = 6 + 6 = 12$. Both hold.\n\n**Remark.** Forming $A^{-1}$ explicitly is fine for a single $2 \\times 2$ system, but for larger systems or when only the solution is needed, Gaussian elimination is faster and more numerically stable than computing the full inverse."
            }
          ]
        }
      ]
    },
    {
      "id": "la-structure",
      "title": "Rank, Subspaces, and Determinants",
      "lessons": [
        {
          "id": "la-four-subspaces-rank",
          "title": "Rank, Null Space, and the Four Fundamental Subspaces",
          "minutes": 18,
          "content": "<h3>The Big Picture: A Matrix Is a Map Between Two Worlds</h3>\n<p>An $m \\times n$ matrix $A$ is not just a grid of numbers. It is a <strong>linear map</strong> $A: \\mathbb{R}^n \\to \\mathbb{R}^m$ that takes a vector $x$ with $n$ coordinates and produces a vector $Ax$ with $m$ coordinates. Almost everything important about that map is captured by <strong>four subspaces</strong> — two living in the input world $\\mathbb{R}^n$ and two living in the output world $\\mathbb{R}^m$. Gilbert Strang calls them the <em>four fundamental subspaces</em>, and understanding them is the single most useful lens in applied linear algebra.</p>\n<p>Here is the entire story in one sentence, which we will spend the rest of the lesson unpacking: a matrix <em>collapses</em> some directions of its input to zero (the <strong>null space</strong>) and <em>reaches</em> only some directions of its output (the <strong>column space</strong>), and the dimension that survives — the <strong>rank</strong> — is shared by the input and output sides in a perfectly symmetric way.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>A matrix multiplication $x \\mapsto Ax$ is built from exactly two operations: a <strong>projection</strong> that throws away the null-space part of the input, and an <strong>injection</strong> that places what remains into the column space of the output. The rank-nullity theorem is the conservation law that bookkeeps how much is thrown away versus how much survives.</p></div>\n\n<h3>Two Subspaces in the Output World $\\mathbb{R}^m$</h3>\n\n<h4>The column space $C(A)$</h4>\n<p>Write $A$ in terms of its columns $a_1, a_2, \\dots, a_n$. Then\n$$Ax = x_1 a_1 + x_2 a_2 + \\cdots + x_n a_n,$$\nwhich is exactly a <strong>linear combination of the columns</strong>. So the set of <em>all</em> outputs $Ax$ — as $x$ ranges over every input — is precisely the span of the columns. We call this the <strong>column space</strong>:\n$$C(A) = \\{\\, Ax : x \\in \\mathbb{R}^n \\,\\} = \\operatorname{span}(a_1, \\dots, a_n) \\subseteq \\mathbb{R}^m.$$\nThis is also called the <strong>range</strong> or <strong>image</strong> of the map. The system $Ax = b$ has a solution <strong>if and only if</strong> $b \\in C(A)$ — because solving $Ax=b$ literally means expressing $b$ as a combination of the columns.</p>\n\n<h4>The left null space $N(A^\\top)$</h4>\n<p>The second output-world subspace is the <strong>left null space</strong>: all vectors $y \\in \\mathbb{R}^m$ that $A^\\top$ sends to zero,\n$$N(A^\\top) = \\{\\, y \\in \\mathbb{R}^m : A^\\top y = 0 \\,\\} = \\{\\, y : y^\\top A = 0 \\,\\}.$$\nThe name \"left\" comes from $y^\\top A = 0$: $y$ multiplies $A$ from the left. Geometrically these are the directions in the output space that are <strong>orthogonal to every column</strong> of $A$ — the directions the map cannot reach. Indeed $N(A^\\top)$ is the orthogonal complement of $C(A)$ inside $\\mathbb{R}^m$.</p>\n\n<h3>Two Subspaces in the Input World $\\mathbb{R}^n$</h3>\n\n<h4>The null space $N(A)$ (the kernel)</h4>\n<p>The <strong>null space</strong> (or <strong>kernel</strong>) collects every input that the map crushes to zero:\n$$N(A) = \\{\\, x \\in \\mathbb{R}^n : Ax = 0 \\,\\} \\subseteq \\mathbb{R}^n.$$\nThis is the set of solutions to the homogeneous system $Ax = 0$. It always contains $x = 0$, and it is genuinely a subspace: if $Ax_1 = 0$ and $Ax_2 = 0$ then $A(c_1 x_1 + c_2 x_2) = 0$. The null space is the engine behind solution structure: if $x_p$ is one particular solution of $Ax = b$, then the <em>complete</em> solution set is the shifted subspace $x_p + N(A)$. Different inputs collapse to the same output exactly when they differ by a null-space vector.</p>\n\n<h4>The row space $C(A^\\top)$</h4>\n<p>The <strong>row space</strong> is the span of the rows of $A$, equivalently the column space of $A^\\top$:\n$$C(A^\\top) = \\operatorname{span}(\\text{rows of } A) \\subseteq \\mathbb{R}^n.$$\nA beautiful fact: the row space is the <strong>orthogonal complement of the null space</strong>. Every row $r_i$ satisfies $r_i \\cdot x = 0$ for any $x \\in N(A)$ (that is what $Ax = 0$ says, one row at a time), so the row space and null space are perpendicular and together fill all of $\\mathbb{R}^n$.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Split the input space $\\mathbb{R}^n$ into two perpendicular pieces: the <strong>row space</strong> (what the map \"sees\" and faithfully maps onward) and the <strong>null space</strong> (what the map ignores). Any input $x$ decomposes as $x = x_{\\text{row}} + x_{\\text{null}}$, and $Ax = A x_{\\text{row}}$ — the null-space part contributes nothing. The map is actually a perfect one-to-one correspondence between the row space and the column space.</p></div>\n\n<h3>Rank: The Number That Ties It All Together</h3>\n<p>The <strong>rank</strong> of $A$ is the dimension of its column space:\n$$r = \\operatorname{rank}(A) = \\dim C(A).$$\nThe deepest elementary theorem in the subject is that this equals the dimension of the row space too:\n$$\\dim C(A) = \\dim C(A^\\top) = r.$$\nIn words: <strong>the number of independent columns equals the number of independent rows.</strong> This is not obvious — columns live in $\\mathbb{R}^m$ and rows live in $\\mathbb{R}^n$ — yet the count is identical. The rank is the \"true size\" of the map: the number of dimensions that actually pass through it.</p>\n\n<p>The <strong>nullity</strong> is the dimension of the null space, $\\dim N(A)$. The dimensions of all four subspaces are:</p>\n<ul>\n<li>$\\dim C(A) = r$ (column space, in $\\mathbb{R}^m$)</li>\n<li>$\\dim C(A^\\top) = r$ (row space, in $\\mathbb{R}^n$)</li>\n<li>$\\dim N(A) = n - r$ (null space, in $\\mathbb{R}^n$)</li>\n<li>$\\dim N(A^\\top) = m - r$ (left null space, in $\\mathbb{R}^m$)</li>\n</ul>\n\n<h3>The Rank-Nullity Theorem</h3>\n<p>The conservation law promised at the start:\n$$\\boxed{\\ \\operatorname{rank}(A) + \\operatorname{nullity}(A) = n\\ } \\qquad (n = \\text{number of columns}).$$\nWhy $n$ and not $m$? Because rank and nullity both measure how the <em>input</em> space $\\mathbb{R}^n$ is partitioned. Every one of the $n$ input dimensions is either preserved (counted by the rank, via the row space) or destroyed (counted by the nullity, via the null space). There is nowhere else for a dimension to go. Formally, $\\mathbb{R}^n = C(A^\\top) \\oplus N(A)$, an orthogonal direct sum, and the dimensions of the two pieces must add to $n$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Rank is the working definition of \"effective dimensionality.\" A data matrix that is theoretically $n$-dimensional but has rank $r \\ll n$ has redundant features — this is exactly what PCA exploits, and what <strong>low-rank</strong> approximations (truncated SVD, LoRA fine-tuning of large models, matrix-factorization recommenders) are built on. Nullity measures redundancy / unidentifiability: if your feature matrix $X$ has a nontrivial null space, the least-squares weights $w$ are <strong>not unique</strong> — you can add any null-space vector to $w$ without changing predictions $Xw$. That is precisely why regularization (ridge) is needed for rank-deficient problems.</p></div>\n\n<h3>Finding Bases from RREF — The Master Algorithm</h3>\n<p>Reduced row echelon form (RREF) hands you bases for every subspace. Row reduction performs invertible row operations, so it <strong>changes the column space but preserves the row space and the null space exactly.</strong> Keep three facts straight:</p>\n<ol>\n<li><strong>Null space basis:</strong> read off the special solutions, one per free column.</li>\n<li><strong>Row space basis:</strong> the nonzero rows of the RREF (they are already independent).</li>\n<li><strong>Column space basis:</strong> take the columns <em>of the original $A$</em> that correspond to <strong>pivot positions</strong> — NOT the columns of the RREF. (Row reduction scrambles the column space, so you must reach back to $A$.)</li>\n</ol>\n<p>The number of pivots is the rank. Pivot columns $\\to$ rank; free columns $\\to$ nullity.</p>\n\n<h3>Fully Worked Example</h3>\n<p>Take the $3 \\times 4$ matrix\n$$A = \\begin{bmatrix} 1 & 2 & 2 & 4 \\\\ 1 & 2 & 3 & 6 \\\\ 2 & 4 & 5 & 10 \\end{bmatrix}.$$\nHere $m = 3$ (output space $\\mathbb{R}^3$) and $n = 4$ (input space $\\mathbb{R}^4$).</p>\n\n<h4>Step 1 — Row reduce to RREF</h4>\n<p>Subtract row 1 from row 2, and $2\\times$ row 1 from row 3:\n$$\\begin{bmatrix} 1 & 2 & 2 & 4 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 1 & 2 \\end{bmatrix}.$$\nSubtract the new row 2 from row 3, then clear the entry above the second pivot (subtract $2\\times$ row 2 from row 1):\n$$R = \\begin{bmatrix} 1 & 2 & 0 & 0 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}.$$\nPivots sit in <strong>columns 1 and 3</strong>. So $r = \\operatorname{rank}(A) = 2$. Free columns are 2 and 4, so nullity $= n - r = 4 - 2 = 2$. Check rank-nullity: $2 + 2 = 4 = n$. </p>\n\n<h4>Step 2 — Column space basis</h4>\n<p>Pivots are in columns 1 and 3, so take columns 1 and 3 <strong>of the original $A$</strong>:\n$$C(A) = \\operatorname{span}\\!\\left( \\begin{bmatrix} 1 \\\\ 1 \\\\ 2 \\end{bmatrix},\\ \\begin{bmatrix} 2 \\\\ 3 \\\\ 5 \\end{bmatrix} \\right) \\subseteq \\mathbb{R}^3, \\qquad \\dim = 2.$$\nA common trap: do <em>not</em> use $\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix},\\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}$ from $R$ — those span the column space of $R$, not of $A$.</p>\n\n<h4>Step 3 — Row space basis</h4>\n<p>The nonzero rows of $R$ form a basis for the row space (which equals the row space of $A$):\n$$C(A^\\top) = \\operatorname{span}\\!\\big( (1,2,0,0),\\ (0,0,1,2) \\big) \\subseteq \\mathbb{R}^4, \\qquad \\dim = 2.$$</p>\n\n<h4>Step 4 — Null space basis (special solutions)</h4>\n<p>Solve $Rx = 0$ with $x = (x_1, x_2, x_3, x_4)$. The pivot variables are $x_1, x_3$; the free variables are $x_2, x_4$. The equations read $x_1 + 2x_2 = 0$ and $x_3 + 2x_4 = 0$, i.e. $x_1 = -2x_2$ and $x_3 = -2x_4$.</p>\n<ul>\n<li>Set $x_2 = 1,\\ x_4 = 0$: $\\;s_1 = (-2,\\, 1,\\, 0,\\, 0)$.</li>\n<li>Set $x_2 = 0,\\ x_4 = 1$: $\\;s_2 = (0,\\, 0,\\, -2,\\, 1)$.</li>\n</ul>\n<p>So\n$$N(A) = \\operatorname{span}\\!\\left( \\begin{bmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\end{bmatrix},\\ \\begin{bmatrix} 0 \\\\ 0 \\\\ -2 \\\\ 1 \\end{bmatrix} \\right) \\subseteq \\mathbb{R}^4, \\qquad \\dim = 2.$$\nSanity check: each $s_i$ is orthogonal to both row-space basis vectors, e.g. $(1,2,0,0)\\cdot(-2,1,0,0) = -2+2 = 0$. Row space $\\perp$ null space, as promised.</p>\n\n<h4>Step 5 — Left null space basis</h4>\n<p>We need $y \\in \\mathbb{R}^3$ with $A^\\top y = 0$, i.e. $y$ orthogonal to all columns of $A$. Its dimension is $m - r = 3 - 2 = 1$. Solve $y^\\top A = 0$: writing $y = (y_1, y_2, y_3)$, the column conditions reduce (using columns 1 and 3, the others are dependent) to $y_1 + y_2 + 2y_3 = 0$ and $2y_1 + 3y_2 + 5y_3 = 0$. Subtracting twice the first from the second gives $y_2 + y_3 = 0$, so $y_2 = -y_3$; back-substituting, $y_1 = -y_2 - 2y_3 = -y_3$. Choosing $y_3 = 1$:\n$$N(A^\\top) = \\operatorname{span}\\!\\left( \\begin{bmatrix} -1 \\\\ -1 \\\\ 1 \\end{bmatrix} \\right) \\subseteq \\mathbb{R}^3, \\qquad \\dim = 1.$$\nVerify against the original rows: $A^\\top y = 0$ means $-1\\cdot(\\text{row }1) - 1\\cdot(\\text{row }2) + 1\\cdot(\\text{row }3) = 0$. Indeed row $3 = $ row $1 + $ row $2$ for this matrix, so the combination vanishes. The left null space records exactly the linear dependencies <em>among the rows</em>.</p>\n\n<p><strong>Final dimension check.</strong> Output side: $\\dim C(A) + \\dim N(A^\\top) = 2 + 1 = 3 = m$. Input side: $\\dim C(A^\\top) + \\dim N(A) = 2 + 2 = 4 = n$. Everything balances.</p>\n\n<h3>Rank, Invertibility, and Solution Structure</h3>\n<p>The four subspaces let you read off the entire behavior of $Ax = b$ at a glance:</p>\n<ul>\n<li><strong>Existence.</strong> $Ax=b$ is solvable $\\iff b \\in C(A)$. If $r = m$ (\"full row rank\"), then $C(A) = \\mathbb{R}^m$ and there is <em>always</em> a solution for every $b$ (the map is onto/surjective). Equivalently the left null space is trivial.</li>\n<li><strong>Uniqueness.</strong> When a solution exists, it is unique $\\iff N(A) = \\{0\\} \\iff$ nullity $= 0 \\iff r = n$ (\"full column rank\"). Then the map is one-to-one (injective): no two inputs collide.</li>\n<li><strong>Square invertible case.</strong> For an $n \\times n$ matrix, the following are equivalent: $r = n$; $\\det A \\neq 0$; $N(A) = \\{0\\}$; columns are independent; $A^{-1}$ exists; $Ax=b$ has a unique solution for every $b$. A square matrix is invertible <strong>exactly when it is full rank</strong>.</li>\n</ul>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Connection to determinants</div><p>For a square matrix, rank deficiency and a zero determinant are the same phenomenon viewed two ways. The determinant is the signed volume scaling factor of the map; if the map collapses any dimension (nontrivial null space, $r < n$), it squashes volume to zero, so $\\det A = 0$. This is the bridge from this lesson to the determinant material in this module: <strong>$\\det A = 0 \\iff A$ is singular $\\iff \\operatorname{rank}(A) < n \\iff N(A) \\neq \\{0\\}$.</strong></p></div>\n\n<h3>A Note on Numerical Rank (Real-World Caveat)</h3>\n<p>Exact rank via RREF is a clean idea but fragile with floating-point data: real measured matrices are essentially never <em>exactly</em> rank-deficient, just <em>nearly</em> so. In practice rank is computed from the <strong>singular value decomposition</strong>: the numerical rank is the number of singular values above a tolerance. Tiny-but-nonzero singular values signal \"almost a null space\" — directions that are nearly collapsed. This effective-rank viewpoint is what underlies dimensionality estimation, denoising, and the low-rank structure that makes modern ML compression (and LoRA-style adapters) possible.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>A matrix $A$ is a map $\\mathbb{R}^n \\to \\mathbb{R}^m$ with four fundamental subspaces.</li>\n<li>Output world $\\mathbb{R}^m$: column space $C(A)$ (dim $r$) and its complement, the left null space $N(A^\\top)$ (dim $m-r$).</li>\n<li>Input world $\\mathbb{R}^n$: row space $C(A^\\top)$ (dim $r$) and its complement, the null space $N(A)$ (dim $n-r$).</li>\n<li>Rank-nullity: $r + (n-r) = n$. Row rank equals column rank.</li>\n<li>From RREF: pivot count = rank; pivot columns of the original $A$ = column space basis; nonzero RREF rows = row space basis; special solutions = null space basis.</li>\n<li>Full column rank $\\Rightarrow$ unique solutions; full row rank $\\Rightarrow$ solutions always exist; square full rank $\\iff$ invertible $\\iff \\det \\neq 0$.</li>\n</ul>",
          "mcq": [
            {
              "q": "Let $A$ be a $5 \\times 8$ matrix with $\\operatorname{rank}(A) = 3$. What is the dimension of the null space $N(A)$?",
              "choices": [
                "2",
                "5",
                "3",
                "8"
              ],
              "answer": 1,
              "explain": "Nullity $= n - r$ where $n$ is the number of columns. Here $n = 8$ and $r = 3$, so nullity $= 8 - 3 = 5$. (The distractor 2 = m - r is the dimension of the left null space, not the null space.)"
            },
            {
              "q": "After row-reducing $A$ to RREF $R$, which set is a correct basis for the column space $C(A)$?",
              "choices": [
                "The nonzero rows of $R$",
                "The pivot columns of $R$",
                "The pivot columns of the original matrix $A$",
                "All columns of $A$"
              ],
              "answer": 2,
              "explain": "Row operations change the column space, so the pivot columns of R do NOT span C(A). You must select the corresponding pivot columns from the original A. (The nonzero rows of R give the row space, not the column space.)"
            },
            {
              "q": "For an $m \\times n$ matrix $A$, the system $Ax = b$ has a unique solution for every $b \\in \\mathbb{R}^m$ exactly when:",
              "choices": [
                "$A$ has full column rank, $r = n$",
                "$A$ is square ($m = n$) and invertible",
                "$A$ has full row rank, $r = m$",
                "The null space is the entire space $\\mathbb{R}^n$"
              ],
              "answer": 1,
              "explain": "Existence for every b needs full row rank (onto); uniqueness needs full column rank (one-to-one). Both at once force r = m = n, i.e. a square invertible matrix. Full column rank alone gives uniqueness but not existence for every b."
            },
            {
              "q": "Which statement about the row space and null space of a real $m \\times n$ matrix is true?",
              "choices": [
                "They are orthogonal complements in $\\mathbb{R}^n$, with dimensions summing to $n$",
                "They are orthogonal complements in $\\mathbb{R}^m$, with dimensions summing to $m$",
                "They always intersect only in subspaces of dimension $r$",
                "The row space lives in $\\mathbb{R}^m$ and the null space in $\\mathbb{R}^n$"
              ],
              "answer": 0,
              "explain": "Both subspaces live in the input space $\\mathbb{R}^n$; every row is orthogonal to every null-space vector (that is what $Ax=0$ says), and $\\dim(\\text{row}) + \\dim(\\text{null}) = r + (n-r) = n$, so they are orthogonal complements in $\\mathbb{R}^n$."
            },
            {
              "q": "A particular solution to $Ax = b$ is $x_p$, and the null space $N(A)$ is two-dimensional. Which statement best describes the complete solution set of $Ax = b$?",
              "choices": [
                "The single point $x_p$, since a particular solution is unique",
                "All vectors of the form $x_p + n$ where $n \\in N(A)$ — a 2-dimensional plane shifted off the origin",
                "The 2-dimensional subspace $N(A)$ itself",
                "There is no solution because the null space is nontrivial"
              ],
              "answer": 1,
              "explain": "The complete solution set is the shifted subspace $x_p + N(A)$; with a 2-dimensional null space it is a 2-dimensional affine plane (not a subspace, since it does not pass through the origin unless $b=0$)."
            },
            {
              "q": "For the worked $3\\times4$ matrix in the lesson, the left null space is spanned by $(-1,-1,1)$. What does this vector directly encode about $A$?",
              "choices": [
                "A linear dependence among the rows of $A$: namely row 3 = row 1 + row 2",
                "A linear dependence among the columns of $A$",
                "A particular solution of $Ax = b$",
                "The direction of largest stretching by $A$"
              ],
              "answer": 0,
              "explain": "The left null space satisfies $A^\\top y = 0$, i.e. $y^\\top A = 0$, so its vectors record the linear dependencies among the rows of $A$ — here $-\\text{row}_1 - \\text{row}_2 + \\text{row}_3 = 0$, equivalently row 3 = row 1 + row 2."
            },
            {
              "q": "The fact that $\\dim C(A) = \\dim C(A^\\top)$ (row rank equals column rank) is considered deep mainly because:",
              "choices": [
                "The columns of $A$ live in $\\mathbb{R}^m$ while the rows live in $\\mathbb{R}^n$, yet their independent counts are identical",
                "It only holds for square matrices",
                "It follows trivially from the definition of a matrix transpose",
                "Row reduction obviously preserves both the row space and the column space"
              ],
              "answer": 0,
              "explain": "Columns are vectors in the output space $\\mathbb{R}^m$ and rows are vectors in the input space $\\mathbb{R}^n$ — different spaces — so it is non-obvious that the number of independent columns must equal the number of independent rows. (Row reduction preserves the row space but changes the column space, so it cannot make the equality obvious.)"
            },
            {
              "q": "A feature matrix $X$ has a nontrivial null space. Why does this make the least-squares weight vector $w$ (minimizing $\\|Xw - y\\|$) non-unique?",
              "choices": [
                "Because $X$ has more rows than columns",
                "Because for any null-space vector $n$, $X(w+n) = Xw$, so $w$ and $w+n$ give identical predictions and identical loss",
                "Because the null space changes the value of $Xw$ at each step",
                "Because least squares requires $X$ to be square"
              ],
              "answer": 1,
              "explain": "If $Xn = 0$ then $X(w+n) = Xw + Xn = Xw$, so adding any null-space vector to $w$ leaves predictions and loss unchanged — hence the optimum is not unique, which is exactly why ridge regularization is used."
            }
          ],
          "flashcards": [
            {
              "front": "State the rank-nullity theorem and say why the right-hand side is $n$ (columns), not $m$ (rows).",
              "back": "$\\operatorname{rank}(A) + \\operatorname{nullity}(A) = n$, the number of columns. Both quantities partition the INPUT space $\\mathbb{R}^n$: each input dimension is either preserved (row space, counted by rank) or destroyed (null space, counted by nullity)."
            },
            {
              "front": "Dimensions of all four fundamental subspaces of an $m \\times n$ matrix of rank $r$.",
              "back": "Column space $C(A)$: $r$ (in $\\mathbb{R}^m$). Row space $C(A^\\top)$: $r$ (in $\\mathbb{R}^n$). Null space $N(A)$: $n-r$ (in $\\mathbb{R}^n$). Left null space $N(A^\\top)$: $m-r$ (in $\\mathbb{R}^m$)."
            },
            {
              "front": "From the RREF of $A$, how do you read off bases for column space, row space, and null space?",
              "back": "Column space: pivot columns of the ORIGINAL $A$. Row space: nonzero rows of the RREF. Null space: the special solutions (one free variable set to 1, rest 0, per free column)."
            },
            {
              "front": "What are the orthogonal-complement relationships among the four subspaces?",
              "back": "In $\\mathbb{R}^n$: row space $\\perp$ null space ($C(A^\\top) \\oplus N(A) = \\mathbb{R}^n$). In $\\mathbb{R}^m$: column space $\\perp$ left null space ($C(A) \\oplus N(A^\\top) = \\mathbb{R}^m$)."
            },
            {
              "front": "For a square $n \\times n$ matrix, list equivalent conditions to 'invertible'.",
              "back": "$r = n$ (full rank) $\\iff \\det A \\neq 0 \\iff N(A) = \\{0\\}$ $\\iff$ columns (and rows) independent $\\iff Ax = b$ has a unique solution for every $b$."
            },
            {
              "front": "Why does a nontrivial null space make least-squares weights non-unique, and what fixes it?",
              "back": "If $X$ has $N(X) \\neq \\{0\\}$, then $X(w + v) = Xw$ for any null-space $v$, so predictions don't pin down $w$. Ridge/L2 regularization restores a unique solution."
            }
          ],
          "homework": [
            {
              "prompt": "Let $A = \\begin{bmatrix} 1 & 3 & 1 & 4 \\\\ 2 & 7 & 3 & 9 \\\\ 1 & 5 & 3 & 1 \\end{bmatrix}$. Find the rank, the nullity, and a basis for the null space $N(A)$. Verify rank-nullity.",
              "hint": "Row reduce to RREF. Identify pivot vs. free columns; the free columns give the special solutions for the null space basis.",
              "solution": "Row reduce. R2 - 2*R1 = (0,1,1,1); R3 - R1 = (0,2,2,-3). Then R3 - 2*(new R2) = (0,0,0,-5) -> normalize to (0,0,0,1). Back-substitute to clear: with pivots in columns 1,2,4 we get RREF\n$$R = \\begin{bmatrix} 1 & 0 & -2 & 0 \\\\ 0 & 1 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}.$$\nPivots in columns 1, 2, 4 => rank $r = 3$. Free column is 3 only, so nullity $= n - r = 4 - 3 = 1$. Rank-nullity: $3 + 1 = 4 = n$. \nNull space: free variable $x_3 = 1$. Equations from R: $x_1 - 2x_3 = 0 \\Rightarrow x_1 = 2$; $x_2 + x_3 = 0 \\Rightarrow x_2 = -1$; $x_4 = 0$. So\n$$N(A) = \\operatorname{span}\\left(\\begin{bmatrix} 2 \\\\ -1 \\\\ 1 \\\\ 0 \\end{bmatrix}\\right), \\quad \\dim = 1.$$\nCheck: $A(2,-1,1,0)^\\top = (2-3+1,\\ 4-7+3,\\ 2-5+3)^\\top = (0,0,0)^\\top$. Correct."
            },
            {
              "prompt": "A linear map $T: \\mathbb{R}^4 \\to \\mathbb{R}^3$ is given by a matrix $A$ with $\\operatorname{rank}(A) = 3$. Is $T$ injective? Is it surjective? For a given $b \\in \\mathbb{R}^3$, describe the full solution set of $Ax = b$.",
              "hint": "Compare rank to the number of rows (m=3) for surjectivity and to the number of columns (n=4) for injectivity. Recall complete solution = particular + null space.",
              "solution": "Here $m = 3$, $n = 4$, $r = 3$. \nSurjective? Full row rank means $r = m = 3$, so $C(A) = \\mathbb{R}^3$ and every $b$ is reachable: YES, $T$ is surjective (onto). \nInjective? Need $N(A) = \\{0\\}$, i.e. nullity $= 0$. But nullity $= n - r = 4 - 3 = 1 > 0$, so the null space is 1-dimensional: NO, $T$ is not injective. \nSolution set: since $b \\in C(A)$, a particular solution $x_p$ exists, and the complete solution is the affine line\n$$\\{\\, x_p + t\\,v : t \\in \\mathbb{R} \\,\\}, \\quad \\text{where } v \\text{ spans } N(A).$$\nThere are infinitely many solutions (a 1-parameter family) for every $b$."
            },
            {
              "prompt": "Without computing an RREF, explain why a $4 \\times 6$ matrix can never have a trivial null space, and state the smallest possible nullity. Then state what the rank and nullity must be for the columns to be linearly independent, and explain whether that is achievable here.",
              "hint": "Use rank-nullity with the constraint that rank cannot exceed the smaller of m and n.",
              "solution": "For a $4 \\times 6$ matrix, $\\operatorname{rank}(A) \\le \\min(m,n) = \\min(4,6) = 4$. By rank-nullity, nullity $= n - r = 6 - r \\ge 6 - 4 = 2$. So the nullity is at least 2 and can never be 0 — the null space is always nontrivial. The smallest possible nullity is 2 (attained when rank is the maximum, 4). \nColumns are linearly independent iff $N(A) = \\{0\\}$ iff nullity $= 0$ iff rank $= n = 6$. But rank $\\le 4 < 6$, so this is impossible: a matrix with more columns than rows ALWAYS has dependent columns. (Intuitively, 6 vectors in $\\mathbb{R}^4$ cannot be independent — you can have at most 4.)"
            }
          ]
        },
        {
          "id": "la-determinants",
          "title": "Determinants: Volume, Orientation, and Invertibility",
          "minutes": 16,
          "content": "<h3>The Determinant as a Volume-Scaling Factor</h3>\n\n<p>Every square matrix $A$ acts as a linear transformation: it stretches, rotates, shears, and reflects space. Among all the numbers you can extract from $A$, one captures something deeply geometric in a single scalar — the <strong>determinant</strong>, written $\\det(A)$ or $|A|$. The cleanest way to understand it is this:</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>$\\det(A)$ is the <strong>signed factor by which $A$ scales volume</strong>. Take any region of space; apply $A$; the new volume equals the old volume times $|\\det(A)|$. The sign tells you whether $A$ preserves or flips orientation.</p></div>\n\n<p>Concretely, in 2D, the unit square (spanned by $e_1=\\begin{bmatrix}1\\\\0\\end{bmatrix}$ and $e_2=\\begin{bmatrix}0\\\\1\\end{bmatrix}$) has area 1. After applying $A$, those basis vectors become the columns of $A$, and the square becomes a parallelogram. The <em>area</em> of that parallelogram is $|\\det(A)|$. In 3D the unit cube becomes a parallelepiped whose volume is $|\\det(A)|$. The same idea holds in every dimension with $n$-dimensional volume.</p>\n\n<h3>Why Sign? Orientation</h3>\n\n<p>A transformation can flip space inside-out — a reflection turns a right-handed coordinate frame into a left-handed one. The determinant records this with its sign:</p>\n\n<ul>\n<li>$\\det(A) > 0$: orientation <strong>preserved</strong> (no flip).</li>\n<li>$\\det(A) < 0$: orientation <strong>reversed</strong> (a reflection is involved).</li>\n<li>$\\det(A) = 0$: space is <strong>collapsed</strong> onto a lower-dimensional subspace — volume becomes zero.</li>\n</ul>\n\n<p>In 2D, think of sweeping from the first column of $A$ to the second. If the shorter sweep is counterclockwise, the determinant is positive; if clockwise, negative. For $A=\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ (which swaps axes — a reflection across the line $y=x$), $\\det(A)=-1$: area is unchanged in magnitude, but orientation flips.</p>\n\n<h3>det = 0 and Invertibility</h3>\n\n<p>This is the single most important consequence. If $\\det(A)=0$, the transformation squashes $n$-dimensional volume down to zero. That can only happen if it collapses space into a lower dimension — a line, a plane, a point. Once you've collapsed information, you cannot recover it: the map is not one-to-one, distinct inputs land on the same output, and there is no inverse.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>$A$ is <strong>invertible</strong> $\\iff$ $\\det(A) \\neq 0$. Equivalently: $\\det(A)=0$ $\\iff$ the columns of $A$ are <strong>linearly dependent</strong> $\\iff$ $\\operatorname{rank}(A) < n$ $\\iff$ $A$ has a nontrivial null space $\\iff$ $Ax=0$ has a nonzero solution.</p></div>\n\n<p>This ties the determinant directly into everything else in this module. A zero determinant <em>is</em> rank deficiency, expressed as a number. The columns failing to span all of $\\mathbb{R}^n$ means they enclose zero volume.</p>\n\n<h3>Computing 2×2 Determinants</h3>\n\n<p>For $A=\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$, the determinant is</p>\n\n$$\\det(A) = ad - bc.$$\n\n<p>This is exactly the signed area of the parallelogram spanned by the columns $\\begin{bmatrix}a\\\\c\\end{bmatrix}$ and $\\begin{bmatrix}b\\\\d\\end{bmatrix}$. Example: $\\begin{bmatrix}3&1\\\\2&4\\end{bmatrix}$ has $\\det = 3\\cdot4 - 1\\cdot2 = 10$. Area scales by 10, orientation preserved.</p>\n\n<h3>Computing 3×3 Determinants: Cofactor Expansion</h3>\n\n<p>For larger matrices we use <strong>cofactor (Laplace) expansion</strong>. Pick a row or column, and for each entry multiply it by (a) a sign and (b) the determinant of the smaller matrix you get by deleting that entry's row and column (its <strong>minor</strong>). The sign pattern alternates like a checkerboard:</p>\n\n$$\\begin{bmatrix}+&-&+\\\\-&+&-\\\\+&-&+\\end{bmatrix}$$\n\n<p>Formally, expanding along the first row of $A=\\begin{bmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{bmatrix}$:</p>\n\n$$\\det(A) = a\\begin{vmatrix}e&f\\\\h&i\\end{vmatrix} - b\\begin{vmatrix}d&f\\\\g&i\\end{vmatrix} + c\\begin{vmatrix}d&e\\\\g&h\\end{vmatrix}$$\n\n$$= a(ei-fh) - b(di-fg) + c(dh-eg).$$\n\n<div class=\"callout\"><div class=\"c-tag\">Tip</div><p>You may expand along <strong>any</strong> row or column and get the same answer. Choose the one with the most zeros — each zero entry kills a whole minor computation. This is the single biggest time-saver for hand computation.</p></div>\n\n<h4>Fully Worked Example</h4>\n\n<p>Compute the determinant of</p>\n\n$$A = \\begin{bmatrix}2&-3&1\\\\4&0&5\\\\-2&1&3\\end{bmatrix}.$$\n\n<p>The second row has a zero, but the second <em>column</em> $(-3,0,1)$ also has a zero and slightly smaller numbers. Let's expand along the first row to show the full mechanics, then sanity-check.</p>\n\n<pre><code>det(A) = 2 * det([0,5; 1,3])  -  (-3) * det([4,5; -2,3])  +  1 * det([4,0; -2,1])\n\n  det([0,5; 1,3])   = 0*3  - 5*1   = -5\n  det([4,5; -2,3])  = 4*3  - 5*(-2) = 12 + 10 = 22\n  det([4,0; -2,1])  = 4*1  - 0*(-2) = 4\n\ndet(A) = 2*(-5)  + 3*(22)  + 1*(4)\n       = -10 + 66 + 4\n       = 60</code></pre>\n\n<p>So $\\det(A)=60 \\neq 0$: $A$ is invertible, it scales volume by a factor of 60, and (positive sign) it preserves orientation. As a check, expand along column 2 — the entries are $-3, 0, 1$ with signs $-,+,-$:</p>\n\n$$\\det(A) = -(-3)\\begin{vmatrix}4&5\\\\-2&3\\end{vmatrix} + 0 - (1)\\begin{vmatrix}2&1\\\\4&5\\end{vmatrix} = 3(22) - (10-4) = 66 - 6 = 60. \\checkmark$$\n\n<h3>Key Properties (and Why They're True)</h3>\n\n<h4>1. Triangular matrices: product of the diagonal</h4>\n\n<p>If $A$ is upper- or lower-triangular (all entries below or above the diagonal are zero), then</p>\n\n$$\\det(A) = a_{11}\\, a_{22} \\cdots a_{nn}.$$\n\n<p>Geometrically, a triangular matrix maps the unit cube to a box that's been sheared but whose \"axis extents\" are exactly the diagonal entries; shears don't change volume, so only the diagonal scaling survives. This is why elimination is the fast way to compute determinants: reduce to triangular form, then multiply the pivots.</p>\n\n<h4>2. Multiplicativity</h4>\n\n$$\\det(AB) = \\det(A)\\,\\det(B).$$\n\n<p>This is almost obvious from the volume picture: apply $B$ (volume scales by $\\det B$), then apply $A$ (scales again by $\\det A$); the combined factor is the product. Two immediate corollaries: $\\det(A^{-1}) = 1/\\det(A)$ (since $\\det(A)\\det(A^{-1}) = \\det(I) = 1$), and $\\det(A^k) = (\\det A)^k$.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Warning</div><p>The determinant is multiplicative but <strong>not</strong> additive: in general $\\det(A+B) \\neq \\det(A) + \\det(B)$. Don't distribute it over sums.</p></div>\n\n<h4>3. Effect of row operations</h4>\n\n<ul>\n<li><strong>Swap two rows:</strong> multiplies $\\det$ by $-1$ (each swap is a reflection, flipping orientation).</li>\n<li><strong>Scale a row by $k$:</strong> multiplies $\\det$ by $k$ (stretching one axis stretches volume proportionally).</li>\n<li><strong>Add a multiple of one row to another:</strong> $\\det$ is <strong>unchanged</strong> (a shear preserves volume).</li>\n</ul>\n\n<p>The third one is what makes Gaussian elimination so powerful for determinants: you can clear a column to zeros for free (no change to $\\det$), reach triangular form, and read off the answer as the product of pivots — tracking only the sign flips from any row swaps and the factors from any scalings.</p>\n\n<h4>Other useful facts</h4>\n<ul>\n<li>$\\det(A^\\top) = \\det(A)$ — transposing doesn't change it, which is why row and column operations have symmetric effects.</li>\n<li>$\\det(cA) = c^n \\det(A)$ for an $n\\times n$ matrix — scaling <em>all</em> entries scales every one of the $n$ axes.</li>\n<li>If any two rows (or columns) are equal, or any row is all zeros, $\\det(A)=0$.</li>\n</ul>\n\n<h3>Connections to Machine Learning / AI</h3>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The \"$\\det = 0 \\Rightarrow$ collapse / lost information\" theme shows up everywhere in ML. The determinant measures whether a transformation throws away dimensions, and many algorithms need it to be nonzero.</p></div>\n\n<ul>\n<li><strong>Change of variables in probability.</strong> When you transform a random variable through a function, densities pick up a factor of $|\\det J|$, the absolute value of the determinant of the Jacobian. This is the engine behind <strong>normalizing flows</strong>: they deliberately build invertible neural layers whose Jacobian determinant is cheap to compute (often triangular, so it's just the product of diagonals — exactly property 1 above).</li>\n<li><strong>Multivariate Gaussians.</strong> The density of a Gaussian with covariance $\\Sigma$ contains $\\frac{1}{\\sqrt{(2\\pi)^n \\det\\Sigma}}$. A near-zero $\\det\\Sigma$ signals a nearly-degenerate (collinear) distribution — a red flag for numerical instability.</li>\n<li><strong>Conditioning and collinearity.</strong> A determinant near zero warns that features are nearly linearly dependent, so $X^\\top X$ is close to singular and least-squares / linear regression becomes unstable. (In practice people watch the related singular values / condition number, but the determinant tells the same \"is volume collapsing?\" story, since $\\det = \\prod \\sigma_i$ for the singular values of a square matrix up to sign.)</li>\n<li><strong>Log-determinants.</strong> Because determinants of large matrices are products of many numbers (and overflow/underflow), ML code almost always works with $\\log\\det A = \\sum \\log(\\text{pivots})$ — turning multiplicativity into additivity and staying numerically safe.</li>\n</ul>\n\n<h3>Summary</h3>\n<p>The determinant compresses a whole transformation into one number: its <em>magnitude</em> is the volume-scaling factor, its <em>sign</em> is orientation, and its <em>vanishing</em> is exactly non-invertibility / rank deficiency. Compute small ones by $ad-bc$ and cofactor expansion (along the sparsest line), large ones by elimination to triangular form. Remember the three structural rules — triangular = product of diagonal, $\\det(AB)=\\det(A)\\det(B)$, and the row-operation effects — and you can reason about invertibility, conditioning, and probability transforms with confidence.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-linear-transform\"></div>",
          "mcq": [
            {
              "q": "A $3\\times 3$ matrix $A$ has $\\det(A) = -2$. Which statement is correct?",
              "choices": [
                "$A$ is not invertible because the determinant is negative",
                "$A$ is invertible; it scales volume by a factor of 2 and reverses orientation",
                "$A$ is invertible; it scales volume by a factor of $-2$ and preserves orientation",
                "$A$ has linearly dependent columns"
              ],
              "answer": 1,
              "explain": "Nonzero determinant means invertible. The magnitude $|-2|=2$ is the volume-scaling factor, and the negative sign means orientation is reversed. Volume scaling is always reported as a nonnegative magnitude."
            },
            {
              "q": "If $A$ and $B$ are $n\\times n$ with $\\det(A)=3$ and $\\det(B)=5$, what is $\\det(A^{-1}B)$?",
              "choices": [
                "$15$",
                "$5/3$",
                "$3/5$",
                "$8$"
              ],
              "answer": 1,
              "explain": "$\\det(A^{-1}B) = \\det(A^{-1})\\det(B) = \\tfrac{1}{\\det(A)}\\det(B) = \\tfrac{1}{3}\\cdot 5 = 5/3$, using multiplicativity and $\\det(A^{-1})=1/\\det(A)$."
            },
            {
              "q": "You perform Gaussian elimination on a matrix, swapping two rows once and adding multiples of rows to other rows several times, ending in upper-triangular form with diagonal entries $2, 3, -1$. What was the original determinant?",
              "choices": [
                "$-6$",
                "$6$",
                "$0$",
                "$5$"
              ],
              "answer": 1,
              "explain": "Adding multiples of rows leaves the determinant unchanged; the single row swap multiplies it by $-1$. The triangular determinant is $2\\cdot3\\cdot(-1)=-6$, so the original was $(-6)/(-1)=6$."
            },
            {
              "q": "Which of these does NOT generally hold for square matrices $A,B$?",
              "choices": [
                "$\\det(AB)=\\det(A)\\det(B)$",
                "$\\det(A^\\top)=\\det(A)$",
                "$\\det(A+B)=\\det(A)+\\det(B)$",
                "$\\det(A^{-1})=1/\\det(A)$ when $A$ is invertible"
              ],
              "answer": 2,
              "explain": "The determinant is multiplicative but not additive: $\\det(A+B)\\neq\\det(A)+\\det(B)$ in general. The other three identities are standard and always hold."
            },
            {
              "q": "A linear map $A$ on $\\mathbb{R}^3$ has $\\det(A) = 4$. If you apply $A$ to a solid region of volume 5, what is the volume of the image, and is orientation preserved?",
              "choices": [
                "Volume 20, orientation preserved",
                "Volume 20, orientation reversed",
                "Volume 9, orientation preserved",
                "Volume 1.25, orientation reversed"
              ],
              "answer": 0,
              "explain": "Volume scales by $|\\det(A)| = 4$ giving $5 \\times 4 = 20$, and since $\\det(A) > 0$ orientation is preserved."
            },
            {
              "q": "For which value of $k$ is the matrix $A=\\begin{bmatrix}2 & 6 \\\\ 1 & k\\end{bmatrix}$ NOT invertible?",
              "choices": [
                "$k = 12$",
                "$k = 3$",
                "$k = 0$",
                "$k = -3$"
              ],
              "answer": 1,
              "explain": "$\\det(A) = 2k - 6$, which is zero exactly when $k = 3$, making the columns linearly dependent so $A$ is not invertible."
            },
            {
              "q": "The columns of a $4\\times 4$ matrix $A$ are linearly dependent. Which statement must be true?",
              "choices": [
                "$\\det(A) = 0$ and the 4D unit cube maps to a region of zero 4-volume",
                "$\\det(A) < 0$ because orientation is reversed",
                "$\\det(A) = 1$ since dependent columns still span $\\mathbb{R}^4$",
                "$A$ is invertible but has $\\operatorname{rank}(A) = 4$"
              ],
              "answer": 0,
              "explain": "Linearly dependent columns collapse space into a lower-dimensional subspace, so the image has zero volume and $\\det(A) = 0$."
            },
            {
              "q": "A 2D transformation maps the unit square to a parallelogram of area 3, and sweeping from the first column of $A$ to the second is the shorter way clockwise. What is $\\det(A)$?",
              "choices": [
                "$3$",
                "$-3$",
                "$0$",
                "$\\tfrac{1}{3}$"
              ],
              "answer": 1,
              "explain": "The magnitude of the determinant equals the area (3), and a clockwise sweep indicates reversed orientation, giving a negative sign: $\\det(A) = -3$."
            }
          ],
          "flashcards": [
            {
              "front": "What does $|\\det(A)|$ measure geometrically, and what does its sign tell you?",
              "back": "$|\\det(A)|$ is the factor by which $A$ scales $n$-dimensional volume (unit cube to parallelepiped). The sign gives orientation: positive = preserved, negative = reversed (reflection)."
            },
            {
              "front": "State the invertibility criterion in terms of the determinant, and three equivalent conditions.",
              "back": "$A$ invertible $\\iff \\det(A)\\neq 0$. Equivalently $\\det(A)=0 \\iff$ columns linearly dependent $\\iff \\operatorname{rank}(A)<n \\iff Ax=0$ has a nonzero solution."
            },
            {
              "front": "Determinant of a triangular matrix?",
              "back": "The product of its diagonal entries: $\\det(A)=a_{11}a_{22}\\cdots a_{nn}$. (Shears don't change volume, so only the diagonal scaling matters.)"
            },
            {
              "front": "How do the three elementary row operations affect the determinant?",
              "back": "Swap two rows: multiply det by $-1$. Scale a row by $k$: multiply det by $k$. Add a multiple of one row to another: det unchanged."
            },
            {
              "front": "Formula for a 2x2 determinant and cofactor expansion idea for larger matrices.",
              "back": "$\\det\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}=ad-bc$. For larger: pick a row/column, sum entry x checkerboard sign x minor (det of submatrix deleting that row+column). Expand along the sparsest line."
            },
            {
              "front": "Key multiplicative identities for determinants.",
              "back": "$\\det(AB)=\\det(A)\\det(B)$; $\\det(A^{-1})=1/\\det(A)$; $\\det(A^k)=(\\det A)^k$; $\\det(cA)=c^n\\det(A)$; $\\det(A^\\top)=\\det(A)$. NOT additive: $\\det(A+B)\\neq\\det(A)+\\det(B)$."
            }
          ],
          "homework": [
            {
              "prompt": "Compute $\\det\\begin{bmatrix}1&2&0\\\\3&-1&4\\\\2&0&1\\end{bmatrix}$ by cofactor expansion, then state whether the matrix is invertible and whether it preserves orientation.",
              "hint": "The third row $(2,0,1)$ has a zero — expanding along it (signs $+,-,+$) means you only compute two minors.",
              "solution": "Expand along row 3: $\\det = 2\\cdot(+)\\begin{vmatrix}2&0\\\\-1&4\\end{vmatrix} - 0 + 1\\cdot(+)\\begin{vmatrix}1&2\\\\3&-1\\end{vmatrix}$. First minor: $2\\cdot4 - 0\\cdot(-1)=8$, contributing $2\\cdot8=16$. Third minor: $1\\cdot(-1)-2\\cdot3=-1-6=-7$, contributing $1\\cdot(-7)=-7$. So $\\det = 16 - 7 = 9$. Since $9\\neq 0$, the matrix is invertible; since $9>0$, it preserves orientation (and scales volume by 9)."
            },
            {
              "prompt": "Let $A$ be $4\\times 4$ with $\\det(A)=2$. Compute (a) $\\det(3A)$, (b) $\\det(A^\\top A)$, (c) $\\det(2A^{-1})$.",
              "hint": "Use $\\det(cA)=c^n\\det(A)$ with $n=4$, plus multiplicativity and $\\det(A^{-1})=1/\\det(A)$.",
              "solution": "(a) $\\det(3A)=3^4\\det(A)=81\\cdot 2=162$. (b) $\\det(A^\\top A)=\\det(A^\\top)\\det(A)=\\det(A)^2=2^2=4$. (c) $\\det(2A^{-1})=2^4\\det(A^{-1})=16\\cdot\\tfrac{1}{2}=8$."
            },
            {
              "prompt": "For which value(s) of $t$ is the matrix $\\begin{bmatrix}t&1&1\\\\1&t&1\\\\1&1&t\\end{bmatrix}$ singular (non-invertible)?",
              "hint": "Compute the determinant as a function of $t$, set it to zero. The structure suggests factoring; try subtracting one row from the others first to simplify.",
              "solution": "Subtract row 1 from rows 2 and 3 (this doesn't change the determinant): $\\begin{bmatrix}t&1&1\\\\1-t&t-1&0\\\\1-t&0&t-1\\end{bmatrix}$. Alternatively expand directly: $\\det = t(t^2-1) - 1(t-1) + 1(1-t) = t^3 - t - (t-1) - (t-1) = t^3 - 3t + 2$. Factor: $t^3-3t+2=(t-1)(t^2+t-2)=(t-1)(t-1)(t+2)=(t-1)^2(t+2)$. This is zero when $t=1$ (the matrix becomes all 1's, rank 1) or $t=-2$. So the matrix is singular for $t=1$ and $t=-2$."
            }
          ],
          "examples": [
            {
              "title": "Compute a 2×2 determinant",
              "body": "Evaluate $\\det\\begin{bmatrix}3&2\\\\1&4\\end{bmatrix}$.",
              "solution": "$ad-bc = 3\\cdot4 - 2\\cdot1 = 12-2 = 10$. Since it's nonzero, the matrix is invertible and scales areas by 10."
            },
            {
              "title": "When is it singular?",
              "body": "For which $k$ is $\\begin{bmatrix}k&2\\\\2&k\\end{bmatrix}$ singular (non-invertible)?",
              "solution": "Set the determinant to zero: $k^2-4=0\\Rightarrow k=\\pm2$. At those values the columns are linearly dependent."
            }
          ]
        }
      ]
    },
    {
      "id": "la-eigen",
      "title": "Eigenvalues, Eigenvectors, and Diagonalization",
      "lessons": [
        {
          "id": "la-eigenvalues-eigenvectors",
          "title": "Eigenvalues and Eigenvectors",
          "minutes": 18,
          "content": "<h3>The Idea: Directions That Survive a Transformation</h3>\n<p>A square matrix $A$ is a machine that takes a vector $v$ and spits out a new vector $Av$. For most inputs the output points in a <em>different</em> direction — the matrix rotates, shears, and stretches space all at once. But for special inputs something clean happens: the output points along exactly the same line as the input. It got longer, shorter, or flipped, but it did not turn. Those special directions are the <strong>eigenvectors</strong>, and the scaling factor along each is its <strong>eigenvalue</strong>.</p>\n\n<p>Formally, a nonzero vector $v$ is an eigenvector of $A$ with eigenvalue $\\lambda$ if</p>\n$$A v = \\lambda v, \\qquad v \\neq 0.$$\n<p>Read it as: <em>\"$A$ acting on $v$ is the same as just scaling $v$ by the number $\\lambda$.\"</em> The matrix, on that one direction, collapses from a complicated linear map into plain multiplication by a scalar. We require $v \\neq 0$ because $A \\cdot 0 = \\lambda \\cdot 0$ holds trivially for every $\\lambda$, so the zero vector tells us nothing. The eigenvalue $\\lambda$, however, <em>can</em> be zero — that case is important and we will return to it.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Picture stretching a sheet of rubber. Most arrows drawn on the sheet rotate as you pull. The eigenvectors are the arrows that lie along the \"grain\" of the stretch — they stay on their own line. The eigenvalue is how much that line gets stretched ($\\lambda &gt; 1$), squashed ($0 &lt; \\lambda &lt; 1$), flipped ($\\lambda &lt; 0$), or annihilated ($\\lambda = 0$).</p>\n</div>\n\n<h3>The Eigenline, Not Just the Eigenvector</h3>\n<p>Notice that if $Av = \\lambda v$, then for any scalar $c \\neq 0$ we also have $A(cv) = \\lambda (cv)$. So eigenvectors are never unique — the whole line through $v$ (and in fact any nonzero scalar multiple) is \"the same\" eigenvector. What is geometrically meaningful is the <strong>invariant direction</strong>, the line that maps into itself. When we report an eigenvector we typically pick a convenient representative, often normalized to unit length. Software like NumPy returns unit eigenvectors for exactly this reason.</p>\n\n<h3>How to Find Eigenvalues: The Characteristic Equation</h3>\n<p>Rewrite the eigen equation by moving everything to one side. Using the identity matrix $I$ so that $\\lambda v = \\lambda I v$:</p>\n$$A v = \\lambda v \\;\\Longleftrightarrow\\; A v - \\lambda I v = 0 \\;\\Longleftrightarrow\\; (A - \\lambda I)\\, v = 0.$$\n<p>This says $v$ is a nonzero vector that the matrix $(A - \\lambda I)$ sends to zero — that is, $v$ lives in the <strong>null space (kernel)</strong> of $A - \\lambda I$. A nonzero null-space vector exists if and only if $A - \\lambda I$ is <strong>not invertible</strong>, which happens exactly when its determinant vanishes:</p>\n$$\\boxed{\\;\\det(A - \\lambda I) = 0\\;}$$\n<p>This is the <strong>characteristic equation</strong>. Expanding the determinant gives a polynomial in $\\lambda$ of degree $n$ (for an $n \\times n$ matrix), called the <strong>characteristic polynomial</strong> $p(\\lambda)$. Its roots are precisely the eigenvalues.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>The logic chain is the whole game: <em>scaling on a direction</em> $\\Rightarrow$ <em>nontrivial kernel of</em> $A - \\lambda I$ $\\Rightarrow$ <em>singular matrix</em> $\\Rightarrow$ <em>zero determinant</em>. Eigenvalues come first (solve the polynomial), eigenvectors come second (solve a homogeneous system for each eigenvalue).</p>\n</div>\n\n<h3>How to Find Eigenvectors: The Null Space</h3>\n<p>Once you have an eigenvalue $\\lambda_i$, plug it back in and solve the homogeneous linear system</p>\n$$(A - \\lambda_i I)\\, v = 0.$$\n<p>By construction this matrix is singular, so it has infinitely many solutions forming a subspace — the <strong>eigenspace</strong> of $\\lambda_i$, written $E_{\\lambda_i} = \\ker(A - \\lambda_i I)$. The eigenspace always includes $0$ (as a subspace must), but the <em>eigenvectors</em> are the nonzero members. The dimension of $E_{\\lambda_i}$ is the <strong>geometric multiplicity</strong> of $\\lambda_i$ — how many independent invariant directions share that scaling factor.</p>\n\n<h3>A Fully Worked 2×2 Example</h3>\n<p>Let</p>\n$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$\n<p><strong>Step 1 — characteristic polynomial.</strong> Form $A - \\lambda I$ and take its determinant:</p>\n$$A - \\lambda I = \\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix}, \\qquad \\det(A-\\lambda I) = (2-\\lambda)^2 - (1)(1).$$\n<p>Expand: $(2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 4 - 1 = \\lambda^2 - 4\\lambda + 3$. Factor:</p>\n$$\\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) = 0 \\;\\Rightarrow\\; \\lambda_1 = 1,\\; \\lambda_2 = 3.$$\n\n<p><strong>Step 2 — eigenvector for $\\lambda_1 = 1$.</strong> Solve $(A - 1\\cdot I)v = 0$:</p>\n$$\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} \\;\\Rightarrow\\; x + y = 0 \\;\\Rightarrow\\; y = -x.$$\n<p>So $v_1 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$ (any nonzero multiple works). Check: $A v_1 = \\begin{bmatrix} 2\\cdot 1 + 1\\cdot(-1) \\\\ 1\\cdot 1 + 2\\cdot(-1) \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix} = 1 \\cdot v_1$. ✓</p>\n\n<p><strong>Step 3 — eigenvector for $\\lambda_2 = 3$.</strong> Solve $(A - 3I)v = 0$:</p>\n$$\\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = 0 \\;\\Rightarrow\\; -x + y = 0 \\;\\Rightarrow\\; y = x.$$\n<p>So $v_2 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$. Check: $A v_2 = \\begin{bmatrix} 3 \\\\ 3 \\end{bmatrix} = 3 \\cdot v_2$. ✓</p>\n\n<p>Geometrically, $A$ leaves the line $y=x$ stretched by $3$ and the perpendicular line $y=-x$ untouched (scaled by $1$). Because $A$ is symmetric, the two eigenvectors are <strong>orthogonal</strong> — a fact we will lean on heavily later (it powers PCA and the spectral theorem).</p>\n\n<h3>Reading Eigenvalues Geometrically</h3>\n<p>Each real eigenvalue describes what happens <em>along its own eigenline</em>:</p>\n<ul>\n<li>$\\lambda &gt; 1$: <strong>stretch</strong> — the eigenline gets longer.</li>\n<li>$\\lambda = 1$: <strong>fixed</strong> — vectors on this line are unchanged (a direction of equilibrium).</li>\n<li>$0 &lt; \\lambda &lt; 1$: <strong>shrink</strong> — the line is compressed toward the origin.</li>\n<li>$\\lambda = 0$: <strong>collapse</strong> — that direction is mapped to $0$; the matrix is singular and the eigenvector spans (part of) its null space.</li>\n<li>$\\lambda &lt; 0$: <strong>flip and scale</strong> — vectors reverse direction and rescale by $|\\lambda|$.</li>\n</ul>\n<p>Two natural connections: $\\lambda = 0$ occurring means $\\det A = 0$, i.e. the matrix is non-invertible — a clean detector of singularity. And $|\\lambda|$ governs <em>dynamics</em>: iterating $v_{k+1} = A v_k$ makes components along eigenvectors with $|\\lambda| &gt; 1$ blow up and those with $|\\lambda| &lt; 1$ decay. This is exactly why eigenvalues control the stability of dynamical systems, the convergence of iterative solvers, and the long-run behavior of Markov chains (where the eigenvalue $\\lambda = 1$ pins down the stationary distribution).</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Eigenvectors are the coordinate system in which a linear map is \"honest.\" In the eigenbasis, the tangled matrix becomes diagonal — pure independent scalings. Principal Component Analysis is precisely this idea applied to a covariance matrix: its eigenvectors are the orthogonal directions of greatest variance in your data, and the eigenvalues are how much variance each direction carries. Keeping the top few eigenpairs is dimensionality reduction.</p>\n</div>\n\n<h3>Trace and Determinant: Free Sanity Checks</h3>\n<p>The coefficients of the characteristic polynomial are not arbitrary — they encode two scalars you already know how to compute. For an $n \\times n$ matrix with eigenvalues $\\lambda_1, \\dots, \\lambda_n$ (counted with multiplicity, complex roots included):</p>\n$$\\sum_{i=1}^{n} \\lambda_i = \\operatorname{tr}(A), \\qquad \\prod_{i=1}^{n} \\lambda_i = \\det(A).$$\n<p>The <strong>trace</strong> is the sum of the diagonal entries; the <strong>determinant</strong> is the signed volume-scaling factor of the map. So the eigenvalues' sum equals the trace and their product equals the determinant. These give cheap, powerful checks.</p>\n\n<p>For a $2\\times 2$ matrix this is especially handy. The characteristic polynomial is always</p>\n$$\\lambda^2 - \\operatorname{tr}(A)\\,\\lambda + \\det(A) = 0.$$\n<p>Check our example: $\\operatorname{tr}(A) = 2 + 2 = 4 = \\lambda_1 + \\lambda_2 = 1 + 3$. ✓ And $\\det(A) = 2\\cdot 2 - 1 \\cdot 1 = 3 = \\lambda_1 \\lambda_2 = 1 \\cdot 3$. ✓</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Practical check</div>\n<p>After computing eigenvalues by hand, <em>always</em> verify that they sum to the trace and multiply to the determinant. It catches almost every arithmetic slip in seconds and requires no extra theory.</p>\n</div>\n\n<h3>A 3×3 Computation</h3>\n<p>Consider the upper-triangular matrix</p>\n$$B = \\begin{bmatrix} 4 & 1 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}.$$\n<p>For any triangular matrix the determinant of $B - \\lambda I$ is the product of its diagonal entries, so</p>\n$$\\det(B - \\lambda I) = (4-\\lambda)(3-\\lambda)(2-\\lambda) = 0 \\;\\Rightarrow\\; \\lambda = 4,\\,3,\\,2.$$\n<p><strong>The eigenvalues of a triangular (or diagonal) matrix are just its diagonal entries.</strong> Sanity check: $\\operatorname{tr}(B) = 4+3+2 = 9 = 4+3+2$, and $\\det(B) = 4\\cdot 3 \\cdot 2 = 24 = 4\\cdot 3\\cdot 2$. Both hold. To get the eigenvector for, say, $\\lambda = 2$, solve $(B - 2I)v = 0$; you would find $v = \\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$, the third standard basis vector.</p>\n\n<h3>Subtleties Worth Knowing</h3>\n<h4>Eigenvalues can be complex.</h4>\n<p>A pure rotation in the plane turns <em>every</em> real direction, so it has no real eigenvectors — its eigenvalues are complex conjugates $e^{\\pm i\\theta}$. Real matrices can have complex eigenvalues; they come in conjugate pairs and encode rotation-plus-scaling.</p>\n<h4>Eigenvalues can repeat — and multiplicity has two flavors.</h4>\n<p>A root of $p(\\lambda)$ repeated $k$ times has <strong>algebraic multiplicity</strong> $k$. Its eigenspace has dimension equal to its <strong>geometric multiplicity</strong>, and always $1 \\le \\text{geometric} \\le \\text{algebraic}$. When they are equal for every eigenvalue, the matrix is <strong>diagonalizable</strong> (it has a full basis of eigenvectors). When geometric &lt; algebraic, the matrix is <strong>defective</strong> — it lacks enough eigenvectors to diagonalize. (The shear $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ is the classic defective example: $\\lambda=1$ twice but only one eigendirection.) This distinction is the bridge to the next lesson on diagonalization.</p>\n<h4>Symmetric matrices are the friendly case.</h4>\n<p>If $A = A^\\top$, then all eigenvalues are real and eigenvectors for distinct eigenvalues are orthogonal — and it is always diagonalizable. Covariance matrices, Gram matrices, and graph Laplacians are symmetric, which is why eigen-methods dominate machine learning on those objects.</p>\n\n<h3>Computing in Practice</h3>\n<p>By hand we factor the characteristic polynomial, but for $n &gt; 4$ there is no general algebraic formula (a consequence of Galois theory), and even for small $n$ the polynomial route is numerically unstable. Real software never expands the determinant; it uses iterative algorithms (the QR algorithm, power iteration, Lanczos). In NumPy:</p>\n<pre><code>import numpy as np\nA = np.array([[2, 1],\n              [1, 2]])\nvals, vecs = np.linalg.eig(A)        # general matrices\n# vals -> [3., 1.] ; vecs columns are the unit eigenvectors\nvals_sym, vecs_sym = np.linalg.eigh(A)  # use this for symmetric/Hermitian A\n</code></pre>\n<p>Use <code>eigh</code> for symmetric matrices: it is faster, more accurate, and returns real, sorted eigenvalues with orthonormal eigenvectors — exactly what PCA and spectral clustering need.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>An eigenvector is a nonzero direction that $A$ only scales: $Av = \\lambda v$; the scale factor $\\lambda$ is its eigenvalue.</li>\n<li>Find eigenvalues by solving $\\det(A - \\lambda I) = 0$; find each eigenvector as the null space of $A - \\lambda I$.</li>\n<li>Geometrically $\\lambda$ stretches ($&gt;1$), fixes ($=1$), shrinks ($0&lt;\\lambda&lt;1$), collapses ($=0$, singular), or flips ($&lt;0$) along its eigenline.</li>\n<li>Quick checks: $\\sum \\lambda_i = \\operatorname{tr}(A)$ and $\\prod \\lambda_i = \\det(A)$; triangular matrices wear their eigenvalues on the diagonal.</li>\n<li>Symmetric matrices give real eigenvalues and orthogonal eigenvectors — the foundation for PCA, spectral clustering, and much of applied ML.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-eigen\"></div>",
          "mcq": [
            {
              "q": "For $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ you find candidate eigenvalues $\\lambda = 1$ and $\\lambda = 3$. Which single fact most quickly confirms this is consistent?",
              "choices": [
                "$1 + 3 = 4 = \\operatorname{tr}(A)$ and $1 \\cdot 3 = 3 = \\det(A)$",
                "Both eigenvalues are positive, so $A$ is invertible",
                "The eigenvectors are orthogonal",
                "$A$ is symmetric, so the eigenvalues must be 1 and 3"
              ],
              "answer": 0,
              "explain": "The sum of eigenvalues equals the trace and the product equals the determinant; both hold ($4$ and $3$), giving an instant consistency check. The other statements are true or true-ish but do not verify the specific values."
            },
            {
              "q": "A real $2\\times 2$ matrix has $\\det(A - \\lambda I) = 0$ at $\\lambda = 0$ (with the other eigenvalue nonzero). What does $\\lambda = 0$ tell you?",
              "choices": [
                "$A$ is the zero matrix",
                "$A$ is singular (non-invertible) and has a nontrivial null space",
                "$A$ rotates every vector by 90 degrees",
                "$A$ must be symmetric"
              ],
              "answer": 1,
              "explain": "An eigenvalue of $0$ means some nonzero vector maps to $0$, so $A$ has a nontrivial kernel and $\\det A = \\prod \\lambda_i = 0$, i.e. $A$ is singular. It need not be the zero matrix."
            },
            {
              "q": "Which statement about the eigenvectors of $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ is correct?",
              "choices": [
                "It has two independent eigenvectors, one per repeated root",
                "It is symmetric, so its eigenvectors are orthogonal",
                "It has the repeated eigenvalue $\\lambda = 1$ but only a one-dimensional eigenspace (it is defective)",
                "Its eigenvalues are $1$ and $-1$"
              ],
              "answer": 2,
              "explain": "This shear is triangular, so $\\lambda = 1$ with algebraic multiplicity 2, but solving $(A - I)v = 0$ gives only the line spanned by $\\begin{bmatrix}1\\\\0\\end{bmatrix}$ (geometric multiplicity 1), making it defective and non-diagonalizable."
            },
            {
              "q": "Why do practitioners prefer NumPy's $\\texttt{eigh}$ over $\\texttt{eig}$ for a covariance matrix?",
              "choices": [
                "$\\texttt{eigh}$ works for non-square matrices",
                "Covariance matrices are symmetric, so $\\texttt{eigh}$ returns real eigenvalues and orthonormal eigenvectors more accurately and quickly",
                "$\\texttt{eig}$ cannot compute eigenvectors",
                "$\\texttt{eigh}$ guarantees all eigenvalues are exactly 1"
              ],
              "answer": 1,
              "explain": "A covariance matrix is symmetric, and $\\texttt{eigh}$ exploits that to return sorted real eigenvalues with orthonormal eigenvectors (the spectral theorem guarantees these), which is exactly what PCA needs."
            },
            {
              "q": "Suppose $Av = \\lambda v$ for a nonzero vector $v$. Which of the following is also guaranteed to be an eigenvector of $A$ with the same eigenvalue $\\lambda$?",
              "choices": [
                "$3v$",
                "$v + w$ for an arbitrary nonzero vector $w$",
                "The zero vector $0$",
                "$Av$ only if $\\lambda = 1$"
              ],
              "answer": 0,
              "explain": "Since $A(cv) = \\lambda(cv)$ for any scalar $c \\neq 0$, every nonzero multiple of $v$ (like $3v$) lies on the same invariant eigenline and shares the eigenvalue $\\lambda$."
            },
            {
              "q": "Why does the lesson insist on $v \\neq 0$ in the definition $Av = \\lambda v$?",
              "choices": [
                "Because the zero vector cannot be normalized to unit length",
                "Because $A \\cdot 0 = \\lambda \\cdot 0$ holds for every $\\lambda$, so $0$ carries no information about any specific eigenvalue",
                "Because eigenvalues must be nonzero",
                "Because $(A - \\lambda I)$ would become invertible"
              ],
              "answer": 1,
              "explain": "The equation $A \\cdot 0 = \\lambda \\cdot 0$ is trivially true for every scalar $\\lambda$, so allowing $v = 0$ would make every number an 'eigenvalue' and tell us nothing."
            },
            {
              "q": "Geometrically, what does it mean for a vector $v$ to be an eigenvector of $A$?",
              "choices": [
                "$A$ leaves $v$ completely unchanged",
                "$A$ maps $v$ to a vector on the same line through the origin, possibly stretched, squashed, or flipped",
                "$A$ rotates $v$ by a fixed angle while preserving its length",
                "$v$ is sent to the zero vector by $A$"
              ],
              "answer": 1,
              "explain": "An eigenvector's direction (its line through the origin) is invariant under $A$: the output $Av = \\lambda v$ stays on that line, only scaled by $\\lambda$."
            },
            {
              "q": "The lesson derives that eigenvalues satisfy $\\det(A - \\lambda I) = 0$. What is the key reason this determinant condition is required?",
              "choices": [
                "A nonzero vector $v$ with $(A - \\lambda I)v = 0$ exists only if $A - \\lambda I$ is not invertible, which forces its determinant to vanish",
                "Invertible matrices always have determinant zero",
                "The determinant of $A$ itself must equal $\\lambda$",
                "It guarantees the eigenvectors are automatically unit vectors"
              ],
              "answer": 0,
              "explain": "A nontrivial null-space vector for $A - \\lambda I$ exists exactly when that matrix is singular (non-invertible), and a matrix is singular precisely when its determinant is zero."
            }
          ],
          "flashcards": [
            {
              "front": "Definition: what makes $v$ an eigenvector of $A$ with eigenvalue $\\lambda$?",
              "back": "$v \\neq 0$ and $Av = \\lambda v$ — the matrix only scales $v$ along its own line by the factor $\\lambda$. The vector must be nonzero, but $\\lambda$ may be zero."
            },
            {
              "front": "How do you find the eigenvalues of $A$?",
              "back": "Solve the characteristic equation $\\det(A - \\lambda I) = 0$. Its roots (degree-$n$ polynomial) are the eigenvalues, counted with multiplicity."
            },
            {
              "front": "Given an eigenvalue $\\lambda$, how do you get its eigenvectors?",
              "back": "Find the null space of $A - \\lambda I$: solve the homogeneous system $(A - \\lambda I)v = 0$. The nonzero solutions form the eigenspace $E_\\lambda$."
            },
            {
              "front": "Trace/determinant relations for eigenvalues",
              "back": "$\\sum_i \\lambda_i = \\operatorname{tr}(A)$ (sum of diagonal) and $\\prod_i \\lambda_i = \\det(A)$. For $2\\times2$: $\\lambda^2 - \\operatorname{tr}(A)\\lambda + \\det(A) = 0$."
            },
            {
              "front": "Geometric meaning of an eigenvalue $\\lambda$ along its eigenline",
              "back": "$\\lambda>1$ stretch; $\\lambda=1$ fixed; $0<\\lambda<1$ shrink; $\\lambda=0$ collapse to origin (A singular); $\\lambda<0$ flip and scale by $|\\lambda|$."
            },
            {
              "front": "Eigenvalues of a triangular or diagonal matrix?",
              "back": "They are exactly the diagonal entries, because $\\det(A-\\lambda I)$ is the product of the diagonal terms $(a_{ii}-\\lambda)$."
            }
          ],
          "homework": [
            {
              "prompt": "Find all eigenvalues and a corresponding eigenvector for each, for $A = \\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}$. Then verify your eigenvalues against the trace and determinant.",
              "hint": "Use $\\lambda^2 - \\operatorname{tr}(A)\\lambda + \\det(A) = 0$. Here $\\operatorname{tr}(A) = -3$ and $\\det(A) = (0)(-3) - (1)(-2) = 2$.",
              "solution": "Characteristic equation: $\\lambda^2 - (-3)\\lambda + 2 = \\lambda^2 + 3\\lambda + 2 = (\\lambda+1)(\\lambda+2) = 0$, so $\\lambda_1 = -1$, $\\lambda_2 = -2$.\n\nFor $\\lambda_1 = -1$: solve $(A + I)v = 0$, i.e. $\\begin{bmatrix} 1 & 1 \\\\ -2 & -2 \\end{bmatrix}v = 0 \\Rightarrow x + y = 0 \\Rightarrow v_1 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$. Check: $Av_1 = \\begin{bmatrix} -1 \\\\ 1 \\end{bmatrix} = -1\\,v_1$. \n\nFor $\\lambda_2 = -2$: solve $(A + 2I)v = 0$, i.e. $\\begin{bmatrix} 2 & 1 \\\\ -2 & -1 \\end{bmatrix}v = 0 \\Rightarrow 2x + y = 0 \\Rightarrow v_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}$. Check: $Av_2 = \\begin{bmatrix} -2 \\\\ 4 \\end{bmatrix} = -2\\,v_2$. \n\nVerification: $\\lambda_1 + \\lambda_2 = -3 = \\operatorname{tr}(A)$ ✓ and $\\lambda_1\\lambda_2 = 2 = \\det(A)$ ✓. Both eigenvalues are negative, so iterating $v_{k+1}=Av_k$ flips direction each step; since $|\\lambda_1|=1$ and $|\\lambda_2|=2$, the $v_1$-component holds its magnitude while the $v_2$-component grows."
            },
            {
              "prompt": "Without solving any polynomial, state all eigenvalues of $C = \\begin{bmatrix} 5 & 7 & -3 \\\\ 0 & -2 & 4 \\\\ 0 & 0 & 1 \\end{bmatrix}$ and explain why. What does the presence (or absence) of a zero eigenvalue tell you about whether $C$ is invertible?",
              "hint": "Look at the shape of the matrix. What is $\\det(C - \\lambda I)$ for a triangular matrix?",
              "solution": "$C$ is upper-triangular, so $\\det(C - \\lambda I) = (5-\\lambda)(-2-\\lambda)(1-\\lambda)$, whose roots are the diagonal entries: $\\lambda = 5,\\ -2,\\ 1$. No eigenvalue is zero, and indeed $\\det(C) = 5 \\cdot (-2) \\cdot 1 = -10 \\neq 0$, so $C$ is invertible. (General principle: $C$ is singular iff $0$ is an eigenvalue, since $\\det(C) = \\prod_i \\lambda_i$.)"
            },
            {
              "prompt": "Let $A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$. Find its eigenvalues and describe its eigenspace(s). How does this differ from the shear $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, which also has a single repeated eigenvalue?",
              "hint": "Compute $\\det(A - \\lambda I)$, then solve $(A - \\lambda I)v = 0$. Pay attention to the dimension of the null space (the geometric multiplicity).",
              "solution": "For $A = 3I$: $\\det(A - \\lambda I) = (3-\\lambda)^2 = 0 \\Rightarrow \\lambda = 3$ with algebraic multiplicity 2. Solving $(A - 3I)v = 0$ gives the equation $0 = 0$, so EVERY vector in $\\mathbb{R}^2$ is an eigenvector: the eigenspace is all of $\\mathbb{R}^2$ (geometric multiplicity 2). $A$ scales every direction by 3 — a uniform dilation — and is trivially diagonalizable (it is already diagonal).\n\nContrast: the shear $S = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ also has one repeated eigenvalue ($\\lambda = 1$, algebraic multiplicity 2), but $(S - I)v = 0$ gives $\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}v = 0 \\Rightarrow y = 0$, so the eigenspace is only the $x$-axis (geometric multiplicity 1 < 2). The shear is DEFECTIVE and cannot be diagonalized. Same repeated eigenvalue, completely different eigenstructure — the difference is geometric multiplicity."
            }
          ],
          "examples": [
            {
              "title": "Eigenvalues of a 2×2",
              "body": "Find the eigenvalues of $A=\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$.",
              "solution": "Solve the characteristic equation $\\det(A-\\lambda I)=(2-\\lambda)^2-1=0$. So $(2-\\lambda)^2=1\\Rightarrow 2-\\lambda=\\pm1\\Rightarrow \\lambda=1$ and $\\lambda=3$."
            },
            {
              "title": "Finding an eigenvector",
              "body": "For the same $A=\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$, find an eigenvector for $\\lambda=3$.",
              "solution": "Solve $(A-3I)\\mathbf{v}=\\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}\\mathbf{v}=\\mathbf{0}$. Both rows give $-v_1+v_2=0$, i.e. $v_1=v_2$. So $\\mathbf{v}=\\begin{bmatrix}1\\\\1\\end{bmatrix}$ (or any nonzero multiple)."
            },
            {
              "title": "A shear: repeated eigenvalue",
              "body": "What are the eigenvalues of the shear $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$, and is it diagonalizable?",
              "solution": "$\\det(A-\\lambda I)=(1-\\lambda)^2=0\\Rightarrow \\lambda=1$ (repeated). The eigenvectors solve $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\mathbf{v}=0\\Rightarrow v_2=0$, so they are only multiples of $\\begin{bmatrix}1\\\\0\\end{bmatrix}$. With just one independent eigenvector, it is NOT diagonalizable."
            }
          ]
        },
        {
          "id": "la-diagonalization",
          "title": "Diagonalization and Matrix Powers",
          "minutes": 18,
          "content": "<h3>The big idea: stop fighting the matrix, change your coordinates</h3>\n<p>A square matrix $A$ is a linear map. In the standard basis it can look like a tangled mess — applying it mixes every coordinate into every other coordinate. <strong>Diagonalization</strong> is the discovery that, very often, this tangle is an illusion of the coordinate system. If you look at $A$ in the <em>right</em> basis — a basis made of its eigenvectors — the map collapses into something almost embarrassingly simple: independent stretching along each axis. No mixing. Just scaling.</p>\n<p>Formally, to <strong>diagonalize</strong> $A$ means to write</p>\n$$A = P D P^{-1}$$\n<p>where $D$ is a diagonal matrix and $P$ is invertible. Once you have this, almost every hard question about $A$ — its powers, its long-term behavior, its exponential, its determinant, its rank — becomes a question about $D$, which is trivial because $D$ is diagonal.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of $P^{-1}$ as a translator that rewrites a vector in the eigenvector \"language,\" $D$ as the simple operation (scale each axis), and $P$ as the translator that converts the answer back to standard coordinates. $A = PDP^{-1}$ literally reads right-to-left: <em>translate in, do the easy thing, translate out</em>.</p></div>\n\n<h3>Where the formula comes from</h3>\n<p>Recall the eigen-equation: $\\lambda$ is an eigenvalue of $A$ with eigenvector $v \\neq 0$ when</p>\n$$A v = \\lambda v.$$\n<p>Suppose $A$ is $n \\times n$ and we are lucky enough to find $n$ <strong>linearly independent</strong> eigenvectors $v_1, \\dots, v_n$ with eigenvalues $\\lambda_1, \\dots, \\lambda_n$. Stack the eigenvectors as the columns of a matrix $P = \\begin{bmatrix} v_1 & v_2 & \\cdots & v_n \\end{bmatrix}$. Then look at $AP$ column by column:</p>\n$$A P = \\begin{bmatrix} A v_1 & \\cdots & A v_n \\end{bmatrix} = \\begin{bmatrix} \\lambda_1 v_1 & \\cdots & \\lambda_n v_n \\end{bmatrix} = P D, \\qquad D = \\begin{bmatrix} \\lambda_1 & & \\\\ & \\ddots & \\\\ & & \\lambda_n \\end{bmatrix}.$$\n<p>Because the columns of $P$ are linearly independent, $P$ is invertible, so we can multiply on the right by $P^{-1}$:</p>\n$$A P = P D \\quad\\Longrightarrow\\quad A = P D P^{-1}.$$\n<p>That is the whole derivation. Notice what was load-bearing: we needed $n$ <em>independent</em> eigenvectors so that $P^{-1}$ exists. This is the entire crux of when diagonalization works.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>An $n \\times n$ matrix is diagonalizable <strong>if and only if</strong> it has $n$ linearly independent eigenvectors — equivalently, its eigenvectors span $\\mathbb{R}^n$ (a full <em>eigenbasis</em>). The $D$ holds the eigenvalues; the matching columns of $P$ hold their eigenvectors. Order matters: column $j$ of $P$ must be an eigenvector for the eigenvalue in position $(j,j)$ of $D$.</p></div>\n\n<h3>This is a change of basis — nothing more</h3>\n<p>Here is the conceptual payoff. The columns of $P$ form a basis $\\mathcal{B} = \\{v_1, \\dots, v_n\\}$. For any vector $x$, the product $P^{-1} x$ gives the <em>coordinates of $x$ in the basis $\\mathcal{B}$</em>. So the factorization $A = PDP^{-1}$ says:</p>\n<ul>\n<li>$P^{-1}$: take a vector and express it in eigenvector coordinates.</li>\n<li>$D$: in those coordinates, $A$ just multiplies the $i$-th coordinate by $\\lambda_i$. The map is decoupled — each eigen-axis evolves on its own.</li>\n<li>$P$: convert the result back to standard coordinates.</li>\n</ul>\n<p>$D$ and $A$ are the <strong>same linear map</strong> written in two different bases. They are called <em>similar</em> matrices. Similar matrices share all basis-independent properties: same eigenvalues, same determinant ($\\det A = \\prod \\lambda_i$), same trace ($\\operatorname{tr} A = \\sum \\lambda_i$), same characteristic polynomial, same rank.</p>\n\n<h3>The headline application: matrix powers become trivial</h3>\n<p>This is where diagonalization earns its keep. Suppose you need $A^k$ for large $k$. Multiplying $A$ by itself $k$ times costs roughly $k$ matrix multiplications and, worse, gives no insight. But with $A = PDP^{-1}$, watch the cancellation:</p>\n$$A^2 = (PDP^{-1})(PDP^{-1}) = PD\\,\\underbrace{(P^{-1}P)}_{I}\\,DP^{-1} = P D^2 P^{-1}.$$\n<p>The inner $P^{-1}P$ telescopes to the identity. Iterating, for any positive integer $k$,</p>\n$$\\boxed{A^k = P D^k P^{-1}}$$\n<p>and $D^k$ is trivial because powering a diagonal matrix just powers each diagonal entry:</p>\n$$D^k = \\begin{bmatrix} \\lambda_1^k & & \\\\ & \\ddots & \\\\ & & \\lambda_n^k \\end{bmatrix}.$$\n<p>So instead of $k$ expensive matrix products you do one diagonalization plus one cheap entrywise power. The same trick gives polynomials of $A$, the inverse ($A^{-1} = P D^{-1} P^{-1}$, valid when no eigenvalue is $0$), and even the matrix exponential $e^{A} = P e^{D} P^{-1}$ with $e^{D} = \\operatorname{diag}(e^{\\lambda_1}, \\dots, e^{\\lambda_n})$ — the workhorse of continuous-time linear systems.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>This is the spiritual core of the <strong>spectral / eigendecomposition</strong> view that pervades ML. PCA diagonalizes a covariance matrix; spectral clustering uses the eigenvectors of a graph Laplacian; the convergence rate of gradient descent on a quadratic is governed by the eigenvalues of the Hessian; and analyzing a recurrent network or a linear dynamical system reduces to powers $A^k$ of a transition matrix. In every case the move is the same: find the eigenbasis, and the coupled problem falls apart into independent one-dimensional problems.</p></div>\n\n<h3>Worked example: diagonalize and take a power</h3>\n<p>Let</p>\n$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$\n<p><strong>Step 1 — eigenvalues.</strong> Solve $\\det(A - \\lambda I) = 0$:</p>\n$$\\det\\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix} = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) = 0,$$\n<p>so $\\lambda_1 = 1$ and $\\lambda_2 = 3$. Two distinct eigenvalues in a $2\\times 2$ matrix guarantees diagonalizability (more on that rule below).</p>\n<p><strong>Step 2 — eigenvectors.</strong> For $\\lambda_1 = 1$, solve $(A - I)v = 0$:</p>\n$$\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} v = 0 \\;\\Rightarrow\\; v_1 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}.$$\n<p>For $\\lambda_2 = 3$, solve $(A - 3I)v = 0$:</p>\n$$\\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix} v = 0 \\;\\Rightarrow\\; v_2 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}.$$\n<p><strong>Step 3 — assemble $P$, $D$, $P^{-1}$.</strong></p>\n$$P = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}, \\qquad D = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}, \\qquad P^{-1} = \\frac{1}{2}\\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}.$$\n<p>(For the $2\\times 2$ inverse, $\\det P = 1\\cdot 1 - 1\\cdot(-1) = 2$, then swap the diagonal, negate the off-diagonal, divide by the determinant.) You should sanity-check $PDP^{-1} = A$; it does.</p>\n<p><strong>Step 4 — a power for free.</strong> Compute $A^{5}$:</p>\n$$A^5 = P D^5 P^{-1} = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}\\begin{bmatrix} 1^5 & 0 \\\\ 0 & 3^5 \\end{bmatrix}\\frac{1}{2}\\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}.$$\n<p>With $3^5 = 243$, multiply it out: $A^5 = \\dfrac{1}{2}\\begin{bmatrix} 1 & 243 \\\\ -1 & 243 \\end{bmatrix}\\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix} = \\dfrac{1}{2}\\begin{bmatrix} 244 & 242 \\\\ 242 & 244 \\end{bmatrix} = \\begin{bmatrix} 122 & 121 \\\\ 121 & 122 \\end{bmatrix}.$ One diagonalization handled <em>every</em> power at once.</p>\n\n<h3>When does it fail? Defective matrices</h3>\n<p>Diagonalization is common but not guaranteed. The obstruction is a shortage of eigenvectors. To name it precisely, every eigenvalue $\\lambda$ carries two numbers:</p>\n<ul>\n<li><strong>Algebraic multiplicity</strong> $a(\\lambda)$: how many times $\\lambda$ is a root of the characteristic polynomial.</li>\n<li><strong>Geometric multiplicity</strong> $g(\\lambda)$: the dimension of the eigenspace $\\ker(A - \\lambda I)$ — i.e., how many independent eigenvectors $\\lambda$ actually provides.</li>\n</ul>\n<p>It is always true that $1 \\le g(\\lambda) \\le a(\\lambda)$. The matrix is <strong>diagonalizable iff $g(\\lambda) = a(\\lambda)$ for every eigenvalue</strong> (then the eigenvectors total $n$ and span the space). When $g(\\lambda) < a(\\lambda)$ for some $\\lambda$ — a repeated eigenvalue that fails to produce enough eigenvectors — the matrix is called <strong>defective</strong> and cannot be diagonalized.</p>\n<p>The classic defective example is the shear</p>\n$$A = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}.$$\n<p>Its only eigenvalue is $\\lambda = 2$ with $a(2) = 2$. But $A - 2I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$ has a one-dimensional null space (only $\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$), so $g(2) = 1 < 2$. There is no second independent eigenvector, no eigenbasis, and no $P$. Such matrices are handled by the more general <em>Jordan form</em>, but they are not diagonalizable.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Useful sufficient conditions</div><p><strong>(1)</strong> If an $n\\times n$ matrix has $n$ <em>distinct</em> eigenvalues, it is automatically diagonalizable (eigenvectors for distinct eigenvalues are always independent). The converse is false — repeated eigenvalues <em>can</em> still be diagonalizable, e.g. the identity. <strong>(2)</strong> Every real <em>symmetric</em> matrix ($A = A^\\top$) is diagonalizable, and moreover by an <em>orthonormal</em> eigenbasis: $A = Q D Q^\\top$ with $Q^\\top Q = I$. This <em>spectral theorem</em> is why covariance matrices, Gram matrices, and Hessians (all symmetric) are so well-behaved in ML.</p></div>\n\n<h3>Application: discrete dynamical systems and Fibonacci</h3>\n<p>A discrete linear dynamical system is $x_{k+1} = A x_k$, so $x_k = A^k x_0$. Diagonalization tells you exactly how it evolves. Expand the start state in the eigenbasis, $x_0 = c_1 v_1 + \\dots + c_n v_n$. Then</p>\n$$x_k = A^k x_0 = c_1 \\lambda_1^k v_1 + c_2 \\lambda_2^k v_2 + \\dots + c_n \\lambda_n^k v_n.$$\n<p>Each eigen-component evolves independently, scaled by $\\lambda_i^k$. The long-run behavior is dictated by the eigenvalue of largest magnitude (the <em>dominant</em> eigenvalue): the system aligns with its eigenvector, growing if $|\\lambda| > 1$, decaying if $|\\lambda| < 1$. For a <strong>Markov chain</strong> the transition matrix has dominant eigenvalue exactly $1$, and its eigenvector is the stationary distribution every initial state converges to (PageRank is precisely this).</p>\n<p><strong>Fibonacci as a $2\\times 2$ system.</strong> With $F_{k+1} = F_k + F_{k-1}$, set $x_k = \\begin{bmatrix} F_{k+1} \\\\ F_k \\end{bmatrix}$ so that</p>\n$$x_k = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix} x_{k-1}, \\qquad A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix}.$$\n<p>The eigenvalues solve $\\lambda^2 - \\lambda - 1 = 0$, giving $\\lambda = \\frac{1 \\pm \\sqrt 5}{2}$ — the golden ratio $\\varphi \\approx 1.618$ and its conjugate $\\psi \\approx -0.618$. Because $|\\varphi| > 1 > |\\psi|$, the $\\psi^k$ term decays and $F_k$ grows like $\\varphi^k$. Carrying the constants through yields the exact closed form (Binet's formula):</p>\n$$F_k = \\frac{\\varphi^k - \\psi^k}{\\sqrt 5}.$$\n<p>That a famous integer sequence has an irrational closed form is the diagonalization story in miniature: the messy recurrence is just two independent geometric sequences, $\\varphi^k$ and $\\psi^k$, viewed in the wrong basis.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Practitioner's note</div><p>Even when a matrix is technically diagonalizable, doing it by hand is for $2\\times 2$ and $3\\times 3$ understanding. In practice you call a library (<code>numpy.linalg.eig</code>, or <code>eigh</code> for symmetric matrices, which is faster and numerically more stable). And beware: matrices that are <em>nearly</em> defective have an ill-conditioned $P$, so $A = PDP^{-1}$ can be numerically fragile. For symmetric matrices $P$ is orthogonal and perfectly conditioned — another reason the symmetric case is the one you most often rely on.</p></div>\n\n<h3>Recap</h3>\n<ul>\n<li>$A = PDP^{-1}$: $P$'s columns are eigenvectors, $D$'s diagonal holds the matching eigenvalues. It is a change into the eigenbasis where $A$ acts by pure scaling.</li>\n<li>Possible iff there is a full eigenbasis ($n$ independent eigenvectors), i.e. $g(\\lambda) = a(\\lambda)$ for all $\\lambda$. Distinct eigenvalues and symmetry are easy guarantees.</li>\n<li>Powers are free: $A^k = P D^k P^{-1}$, and the same idea gives inverses, polynomials, and $e^A$.</li>\n<li>Dynamical systems $x_k = A^k x_0$ decompose into independent modes $\\lambda_i^k v_i$; the dominant eigenvalue rules the long run (Markov stationarity, Fibonacci's golden ratio).</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-eigen\"></div>",
          "mcq": [
            {
              "q": "You diagonalize $A = PDP^{-1}$ and want $A^{10}$. Which is the correct and efficient expression?",
              "choices": [
                "$A^{10} = P^{10} D^{10} (P^{-1})^{10}$",
                "$A^{10} = P D^{10} P^{-1}$, where $D^{10}$ powers each diagonal entry",
                "$A^{10} = P D P^{-1}$ raised entrywise to the 10th power",
                "$A^{10} = 10 \\, P D P^{-1}$"
              ],
              "answer": 1,
              "explain": "The inner $P^{-1}P$ factors telescope to the identity, leaving $A^k = PD^kP^{-1}$; powering diagonal $D$ just powers each diagonal entry. Powering $P$ separately is wrong, and matrix powers are not entrywise."
            },
            {
              "q": "A $4\\times 4$ matrix has characteristic polynomial $(\\lambda-2)^3(\\lambda-5)$, and the eigenspace for $\\lambda=2$ is 2-dimensional. Is it diagonalizable?",
              "choices": [
                "Yes, because it has a repeated eigenvalue",
                "Yes, because eigenvalue 5 is simple",
                "No, because the geometric multiplicity of $\\lambda=2$ (2) is less than its algebraic multiplicity (3)",
                "Cannot be determined without the entries"
              ],
              "answer": 2,
              "explain": "Diagonalizability requires geometric = algebraic multiplicity for every eigenvalue. Here $\\lambda=2$ has $a=3$ but $g=2$, so it is defective: only 3 independent eigenvectors total, not 4."
            },
            {
              "q": "For the system $x_{k+1}=Ax_k$ with $A$ diagonalizable, eigenvalues $\\lambda_1 = 1$, $\\lambda_2 = 0.4$, $\\lambda_3 = -0.7$, what happens to $x_k$ as $k\\to\\infty$ for a generic start $x_0$?",
              "choices": [
                "It blows up to infinity",
                "It converges to a multiple of the eigenvector for $\\lambda=1$",
                "It converges to the zero vector",
                "It oscillates forever without settling"
              ],
              "answer": 1,
              "explain": "Write $x_k = \\sum c_i\\lambda_i^k v_i$. The $0.4^k$ and $(-0.7)^k$ components decay to 0, while the $\\lambda=1$ component is constant, so $x_k \\to c_1 v_1$ (the stationary/dominant mode)."
            },
            {
              "q": "Which statement about a real symmetric matrix $A = A^\\top$ is guaranteed?",
              "choices": [
                "It may be defective if it has repeated eigenvalues",
                "It is diagonalizable by an orthogonal matrix, $A = QDQ^\\top$ with $Q^\\top Q = I$",
                "Its eigenvalues are always positive",
                "It is diagonalizable only if all eigenvalues are distinct"
              ],
              "answer": 1,
              "explain": "The spectral theorem guarantees every real symmetric matrix has an orthonormal eigenbasis, so $A=QDQ^\\top$, even with repeated eigenvalues. Eigenvalues are real but not necessarily positive (that is positive-definiteness)."
            },
            {
              "q": "A $3\\times 3$ matrix has eigenvalue $\\lambda = 4$ with algebraic multiplicity 2, but the eigenspace for $\\lambda = 4$ is only 1-dimensional (the third eigenvalue is distinct). Is $A$ diagonalizable?",
              "choices": [
                "No, because it cannot produce 3 linearly independent eigenvectors",
                "Yes, because every $3\\times 3$ matrix with 2 distinct eigenvalues is diagonalizable",
                "Yes, because the algebraic multiplicities add up to 3",
                "It is impossible to tell without knowing the entries of $A$"
              ],
              "answer": 0,
              "explain": "With only 1 eigenvector from the repeated eigenvalue (geometric multiplicity 1 < algebraic multiplicity 2) plus 1 from the distinct eigenvalue, you get just 2 independent eigenvectors, so $P$ cannot be a $3\\times 3$ invertible matrix and $A$ is not diagonalizable."
            },
            {
              "q": "In the factorization $A = PDP^{-1}$, what is the precise role of $P^{-1}$ in the right-to-left reading of the product acting on a vector?",
              "choices": [
                "It rewrites the input vector in eigenvector coordinates so $D$ can simply scale each component",
                "It converts the final answer from eigenvector coordinates back to standard coordinates",
                "It guarantees the eigenvalues in $D$ are sorted from largest to smallest",
                "It rotates the vector so that the eigenvectors become orthonormal"
              ],
              "answer": 0,
              "explain": "Reading $PDP^{-1}\\mathbf{x}$ right-to-left, $P^{-1}$ first translates the vector into the eigenvector basis, then $D$ scales each coordinate by its eigenvalue, then $P$ translates back to standard coordinates. (Choice B describes the role of $P$, not $P^{-1}$.)"
            },
            {
              "q": "Suppose $A = PDP^{-1}$. Swapping the order of two columns of $P$ (say columns 1 and 2) while leaving $D$ unchanged generally produces a matrix that:",
              "choices": [
                "No longer equals $A$, because column $j$ of $P$ must match the eigenvalue in position $(j,j)$ of $D$",
                "Still equals $A$, since reordering eigenvectors never matters",
                "Equals $A^{-1}$ instead of $A$",
                "Equals $A^\\top$, the transpose of the original"
              ],
              "answer": 0,
              "explain": "The pairing between each eigenvector column of $P$ and its eigenvalue in the matching diagonal slot of $D$ is essential. If you also permute $D$'s diagonal the same way you recover $A$, but reordering $P$'s columns alone breaks the pairing and gives a different matrix."
            },
            {
              "q": "Why does diagonalization make the determinant of $A$ trivial to compute once $A = PDP^{-1}$ is known?",
              "choices": [
                "Because $\\det(A) = \\det(P)\\det(D)\\det(P^{-1}) = \\det(D)$, which is just the product of the eigenvalues",
                "Because $\\det(A) = \\det(P) + \\det(D) - \\det(P^{-1})$",
                "Because $\\det(A)$ always equals the trace of $D$",
                "Because $\\det(P^{-1}) = 0$, which forces $\\det(A) = \\det(D)$"
              ],
              "answer": 0,
              "explain": "Determinants are multiplicative and $\\det(P^{-1}) = 1/\\det(P)$, so the $P$ factors cancel: $\\det(A) = \\det(P)\\det(D)\\det(P^{-1}) = \\det(D)$, the product of the diagonal entries (the eigenvalues). Note $\\det(P^{-1})\\neq 0$ since $P$ is invertible, ruling out choice D."
            }
          ],
          "flashcards": [
            {
              "front": "What does $A = PDP^{-1}$ mean for the columns of $P$ and the diagonal of $D$?",
              "back": "Each column of $P$ is an eigenvector of $A$; the corresponding diagonal entry of $D$ is its eigenvalue. $P$ changes coordinates into the eigenbasis, where $A$ acts as pure scaling $D$."
            },
            {
              "front": "An $n\\times n$ matrix is diagonalizable if and only if...",
              "back": "...it has $n$ linearly independent eigenvectors (a full eigenbasis), equivalently geometric multiplicity = algebraic multiplicity for every eigenvalue."
            },
            {
              "front": "Why is $A^k = PD^kP^{-1}$?",
              "back": "In $A^k = (PDP^{-1})^k$ the inner $P^{-1}P$ pairs telescope to $I$, leaving $PD^kP^{-1}$. And $D^k$ is just each diagonal entry raised to the $k$-th power."
            },
            {
              "front": "What is a defective matrix? Give the standard example.",
              "back": "A matrix with an eigenvalue whose geometric multiplicity is strictly less than its algebraic multiplicity, so it lacks a full eigenbasis and is NOT diagonalizable. Example: $\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}$ ($\\lambda=2$ has $a=2$, $g=1$)."
            },
            {
              "front": "Two easy sufficient conditions for diagonalizability.",
              "back": "(1) $n$ distinct eigenvalues guarantee it. (2) Any real symmetric matrix is diagonalizable by an orthonormal basis ($A=QDQ^\\top$) — the spectral theorem."
            },
            {
              "front": "In a dynamical system $x_k = A^k x_0$ with $A$ diagonalizable, what governs long-run behavior?",
              "back": "Writing $x_0 = \\sum c_i v_i$, we get $x_k = \\sum c_i \\lambda_i^k v_i$. The eigenvalue of largest magnitude (dominant eigenvalue) dominates: growth if $|\\lambda|>1$, decay if $<1$; Markov chains have dominant $\\lambda=1$ (stationary distribution)."
            }
          ],
          "homework": [
            {
              "prompt": "Diagonalize $A = \\begin{bmatrix} 4 & -2 \\\\ 1 & 1 \\end{bmatrix}$ (find $P$ and $D$), then use it to compute $A^3$.",
              "hint": "Find eigenvalues from $\\det(A-\\lambda I)=0$, then solve $(A-\\lambda I)v=0$ for each. For $A^3$ use $A^3 = PD^3P^{-1}$ rather than multiplying $A$ three times.",
              "solution": "Characteristic polynomial: $\\det\\begin{bmatrix}4-\\lambda & -2\\\\ 1 & 1-\\lambda\\end{bmatrix} = (4-\\lambda)(1-\\lambda) + 2 = \\lambda^2 - 5\\lambda + 6 = (\\lambda-2)(\\lambda-3)$, so $\\lambda_1=2,\\ \\lambda_2=3$. For $\\lambda=2$: $(A-2I)v=\\begin{bmatrix}2&-2\\\\1&-1\\end{bmatrix}v=0 \\Rightarrow v_1=\\begin{bmatrix}1\\\\1\\end{bmatrix}$. For $\\lambda=3$: $(A-3I)v=\\begin{bmatrix}1&-2\\\\1&-2\\end{bmatrix}v=0 \\Rightarrow v_2=\\begin{bmatrix}2\\\\1\\end{bmatrix}$. So $P=\\begin{bmatrix}1&2\\\\1&1\\end{bmatrix}$, $D=\\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}$. $\\det P = -1$, so $P^{-1}=\\begin{bmatrix}-1&2\\\\1&-1\\end{bmatrix}$. Then $A^3 = P D^3 P^{-1}$ with $D^3=\\begin{bmatrix}8&0\\\\0&27\\end{bmatrix}$: first $PD^3 = \\begin{bmatrix}8&54\\\\8&27\\end{bmatrix}$, then times $P^{-1}$ gives $A^3 = \\begin{bmatrix}8\\cdot(-1)+54\\cdot1 & 8\\cdot2+54\\cdot(-1)\\\\ 8\\cdot(-1)+27\\cdot1 & 8\\cdot2+27\\cdot(-1)\\end{bmatrix} = \\begin{bmatrix}46 & -38\\\\ 19 & -11\\end{bmatrix}$."
            },
            {
              "prompt": "Show that $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix}$ is NOT diagonalizable, by computing the algebraic and geometric multiplicities of its eigenvalue.",
              "hint": "Find the eigenvalue(s) first, then the dimension of the null space of $A-\\lambda I$.",
              "solution": "The matrix is upper triangular, so eigenvalues are the diagonal entries: $\\lambda = 3$ repeated, giving algebraic multiplicity $a(3)=2$. Now the eigenspace: $A-3I = \\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}$. Its null space requires the second coordinate to be 0, so it is spanned by $\\begin{bmatrix}1\\\\0\\end{bmatrix}$ alone — dimension 1, so geometric multiplicity $g(3)=1$. Since $g(3)=1 < 2 = a(3)$, there are not enough independent eigenvectors to form an eigenbasis of $\\mathbb{R}^2$. The matrix is defective and therefore not diagonalizable."
            },
            {
              "prompt": "A population is split between city (C) and suburb (S). Each year 90% of city dwellers stay and 10% move to suburb; 20% of suburb dwellers move to city and 80% stay. With state $x_k=\\begin{bmatrix}C_k\\\\S_k\\end{bmatrix}$ and $x_{k+1}=Ax_k$, find $A$, its eigenvalues, and the long-run fraction in each region (the stationary distribution).",
              "hint": "Columns of a Markov matrix sum to 1. One eigenvalue of a Markov matrix is always exactly 1; its eigenvector (normalized to sum to 1) is the stationary distribution.",
              "solution": "Reading the flows into each region: $C_{k+1}=0.9C_k + 0.2S_k$ and $S_{k+1}=0.1C_k + 0.8S_k$, so $A=\\begin{bmatrix}0.9 & 0.2\\\\ 0.1 & 0.8\\end{bmatrix}$ (columns sum to 1). Eigenvalues: $\\det(A-\\lambda I)=(0.9-\\lambda)(0.8-\\lambda)-0.02 = \\lambda^2 -1.7\\lambda +0.7 = (\\lambda-1)(\\lambda-0.7)$, so $\\lambda_1=1,\\ \\lambda_2=0.7$. Since $|0.7|<1$, that mode decays and the system converges to the $\\lambda=1$ eigenvector. Solve $(A-I)v=0$: $\\begin{bmatrix}-0.1 & 0.2\\\\ 0.1 & -0.2\\end{bmatrix}v=0 \\Rightarrow v=\\begin{bmatrix}2\\\\1\\end{bmatrix}$. Normalizing so entries sum to 1 gives the stationary distribution $\\begin{bmatrix}2/3\\\\1/3\\end{bmatrix}$: in the long run 2/3 of the population lives in the city and 1/3 in the suburb, regardless of the starting split."
            }
          ]
        },
        {
          "id": "la-symmetric-spectral",
          "title": "Symmetric Matrices and the Spectral Theorem",
          "minutes": 16,
          "content": "<h3>Why symmetric matrices are special</h3>\n<p>Most of the matrices that matter in machine learning are not arbitrary square matrices — they are <strong>symmetric</strong>: a matrix $A$ with $A = A^T$, meaning $a_{ij} = a_{ji}$. Covariance matrices, Gram matrices $X^T X$, kernel matrices, the Hessian of any smooth scalar loss, and graph Laplacians are all symmetric. The reason this matters is the <strong>Spectral Theorem</strong>, which says symmetric matrices have the cleanest possible eigenstructure — clean enough that you can read off the entire geometry of a quadratic loss surface from its eigenvalues.</p>\n<p>Recall the general eigenvalue problem $A v = \\lambda v$. For a generic real matrix, eigenvalues can be complex, eigenvectors need not be orthogonal, and a matrix may not even be diagonalizable (defective matrices exist). Symmetry erases <em>all</em> of these pathologies at once. That is a remarkable structural payoff for such a mild-looking condition.</p>\n\n<h3>The Spectral Theorem</h3>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>If $A \\in \\mathbb{R}^{n\\times n}$ is symmetric ($A = A^T$), then: (1) all eigenvalues are <strong>real</strong>; (2) eigenvectors from <strong>distinct</strong> eigenvalues are <strong>orthogonal</strong>; and (3) $A$ has a full set of $n$ orthonormal eigenvectors. Equivalently, $A$ can be written $$A = Q \\Lambda Q^T = \\sum_{i=1}^{n} \\lambda_i\\, q_i q_i^T,$$ where $Q$ is an <strong>orthogonal</strong> matrix ($Q^TQ = I$) whose columns $q_i$ are orthonormal eigenvectors, and $\\Lambda = \\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)$.</p></div>\n\n<p>This is <strong>orthogonal diagonalization</strong>. Compare with general diagonalization $A = P \\Lambda P^{-1}$: for symmetric matrices we can choose $P = Q$ orthogonal, so $P^{-1} = Q^T$ — no inverse to compute, just a transpose. The decomposition $A = \\sum_i \\lambda_i q_i q_i^T$ is especially illuminating: each $q_i q_i^T$ is a rank-1 orthogonal projector onto the line spanned by $q_i$, and $A$ acts by scaling each of these mutually perpendicular directions by its eigenvalue $\\lambda_i$.</p>\n\n<h4>Why the eigenvalues are real</h4>\n<p>Let $Av = \\lambda v$ with $v \\neq 0$, allowing complex entries for now. Take the conjugate transpose: $\\bar v^T A = \\bar\\lambda\\, \\bar v^T$ (using $A$ real and symmetric, $A^T = A$, so $\\overline{(Av)}^T = \\bar v^T A$). Then</p>\n$$\\bar v^T A v = \\lambda\\, \\bar v^T v, \\qquad \\text{and also} \\qquad \\bar v^T A v = \\bar\\lambda\\, \\bar v^T v.$$\n<p>Subtracting, $(\\lambda - \\bar\\lambda)\\,\\bar v^T v = 0$. Since $\\bar v^T v = \\sum_i |v_i|^2 > 0$, we get $\\lambda = \\bar\\lambda$, i.e. $\\lambda$ is real. The real symmetric structure forces the Rayleigh quotient to be real, which forces the eigenvalue to be real.</p>\n\n<h4>Why eigenvectors are orthogonal</h4>\n<p>Suppose $A v_1 = \\lambda_1 v_1$ and $A v_2 = \\lambda_2 v_2$ with $\\lambda_1 \\neq \\lambda_2$. Then</p>\n$$\\lambda_1\\, v_2^T v_1 = v_2^T (A v_1) = (A v_2)^T v_1 = \\lambda_2\\, v_2^T v_1,$$\n<p>where the middle step uses $v_2^T A = (A^T v_2)^T = (A v_2)^T$ by symmetry. Hence $(\\lambda_1 - \\lambda_2)\\, v_2^T v_1 = 0$, and since the eigenvalues differ, $v_2^T v_1 = 0$. (When an eigenvalue is repeated, its eigenspace is multi-dimensional; you simply pick an orthonormal basis within it via Gram–Schmidt. This is the one extra step the full proof needs.)</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Symmetric matrices are exactly the linear maps that <em>stretch space along perpendicular axes</em> with no rotation or shear left over. A circle (or sphere) maps to an ellipse (ellipsoid) whose principal axes are the eigenvectors $q_i$ and whose semi-axis lengths are governed by the eigenvalues. The orthogonal matrix $Q$ rotates you into the axis-aligned frame, $\\Lambda$ does pure scaling, and $Q^T$ rotates back.</p></div>\n\n<h3>Quadratic forms</h3>\n<p>A <strong>quadratic form</strong> is a function $f(x) = x^T A x$ for a symmetric $A$. Writing it out for $n=2$:</p>\n$$x^T A x = a_{11}x_1^2 + 2a_{12}x_1 x_2 + a_{22}x_2^2.$$\n<p>(Any quadratic in $x$ can be put in this symmetric form: replace any $A$ by $\\tfrac12(A + A^T)$ without changing $x^T A x$, so we always assume $A$ symmetric WLOG.) The power of the spectral theorem is that it <strong>diagonalizes the form</strong>. Substitute $A = Q\\Lambda Q^T$ and let $y = Q^T x$ (a rotation into eigen-coordinates):</p>\n$$x^T A x = x^T Q \\Lambda Q^T x = (Q^Tx)^T \\Lambda (Q^T x) = y^T \\Lambda y = \\sum_{i=1}^n \\lambda_i\\, y_i^2.$$\n<p>In the right coordinate system, every quadratic form is just a weighted sum of squares with the eigenvalues as weights. All the cross terms vanish. The sign and magnitude of each $\\lambda_i$ tells you whether the form curves up, curves down, or is flat along the $i$-th principal axis.</p>\n\n<h3>Definiteness</h3>\n<p>Classify a symmetric $A$ (equivalently, its quadratic form) by the signs of its eigenvalues:</p>\n<ul>\n<li><strong>Positive definite</strong> (PD): all $\\lambda_i > 0$ $\\iff$ $x^T A x > 0$ for all $x \\neq 0$. The form is a \"bowl\"; the only minimum of $f$ is at the origin.</li>\n<li><strong>Positive semidefinite</strong> (PSD): all $\\lambda_i \\geq 0$ $\\iff$ $x^T A x \\geq 0$ for all $x$. A bowl that may be flat in some directions (zero eigenvalues).</li>\n<li><strong>Negative (semi)definite</strong>: flip all the signs — a dome.</li>\n<li><strong>Indefinite</strong>: mixed signs, $\\lambda_i > 0$ and $\\lambda_j < 0$ for some $i,j$. A <strong>saddle</strong>: up in some directions, down in others.</li>\n</ul>\n<p>From $\\sum_i \\lambda_i y_i^2$ this is immediate: if every weight is positive the sum is positive whenever some $y_i \\neq 0$, and $y = Q^Tx = 0$ only when $x=0$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why ML cares</div><p>The <strong>Hessian</strong> $H = \\nabla^2 f$ of a loss is symmetric (mixed partials commute). At a critical point ($\\nabla f = 0$), definiteness of $H$ classifies it: PD $\\Rightarrow$ local minimum, ND $\\Rightarrow$ local maximum, indefinite $\\Rightarrow$ saddle point. Deep learning loss surfaces are riddled with saddles, not local minima — a fact that motivated momentum and adaptive optimizers. A <strong>covariance matrix</strong> $\\Sigma = \\mathbb{E}[(x-\\mu)(x-\\mu)^T]$ is always PSD, because $a^T\\Sigma a = \\operatorname{Var}(a^T x) \\geq 0$; its eigenvectors are the principal components (PCA) and eigenvalues are the variances along them.</p></div>\n\n<h4>Quick tests for definiteness</h4>\n<p>You rarely need the full spectrum to test definiteness:</p>\n<ul>\n<li><strong>Eigenvalue test</strong>: compute the eigenvalues, check signs. Definitive but most work.</li>\n<li><strong>Leading principal minors (Sylvester's criterion)</strong>: $A$ is PD $\\iff$ every leading principal minor (the determinants of the top-left $1\\times1, 2\\times2, \\dots, n\\times n$ blocks) is positive. For $2\\times2$: $a_{11} > 0$ and $\\det A > 0$.</li>\n<li><strong>Pivots</strong>: $A$ is PD $\\iff$ all pivots in (symmetric) Gaussian elimination / Cholesky are positive. Cholesky succeeding <em>is</em> a PD test, which is why it is the standard numerical check.</li>\n<li><strong>Gram structure</strong>: any $A = B^T B$ is automatically PSD (and PD iff $B$ has full column rank), since $x^T B^T B x = \\|Bx\\|^2 \\geq 0$.</li>\n</ul>\n\n<h3>Worked example: orthogonally diagonalize and classify</h3>\n<p>Let</p>\n$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$\n<p><strong>Step 1 — eigenvalues.</strong> $\\det(A - \\lambda I) = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3)$. So $\\lambda_1 = 1$, $\\lambda_2 = 3$ — both real and positive (as guaranteed; $A$ is symmetric).</p>\n<p><strong>Step 2 — eigenvectors.</strong> For $\\lambda = 1$: $(A - I)v = \\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}v = 0 \\Rightarrow v_1 = (1, -1)^T$. For $\\lambda = 3$: $(A - 3I)v = \\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}v = 0 \\Rightarrow v_2 = (1, 1)^T$. Note $v_1^T v_2 = 1\\cdot1 + (-1)\\cdot1 = 0$: orthogonal, exactly as the theorem promises.</p>\n<p><strong>Step 3 — normalize and assemble.</strong> Each has length $\\sqrt2$, so $q_1 = \\tfrac{1}{\\sqrt2}(1,-1)^T$, $q_2 = \\tfrac{1}{\\sqrt2}(1,1)^T$. Then</p>\n$$Q = \\frac{1}{\\sqrt2}\\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}, \\qquad \\Lambda = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}, \\qquad A = Q\\Lambda Q^T.$$\n<p>You can verify $Q^TQ = I$ and multiply out $Q\\Lambda Q^T$ to recover $A$. The rank-1 form reads $A = 1\\cdot q_1 q_1^T + 3\\cdot q_2 q_2^T$.</p>\n<p><strong>Step 4 — classify.</strong> Both eigenvalues positive $\\Rightarrow$ <strong>positive definite</strong>. Cross-check with Sylvester: $a_{11} = 2 > 0$ and $\\det A = 4 - 1 = 3 > 0$. Consistent. The quadratic form is $x^T A x = 2x_1^2 + 2x_1x_2 + 2x_2^2$, which in eigen-coordinates becomes $1\\cdot y_1^2 + 3\\cdot y_2^2$ — an ellipse, steepest along $q_2$ (the $(1,1)$ direction, eigenvalue 3) and gentlest along $q_1$.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The ratio of the largest to smallest eigenvalue of a PD matrix is its <strong>condition number</strong> $\\kappa = \\lambda_{\\max}/\\lambda_{\\min}$. For a quadratic loss $\\tfrac12 x^T A x$, gradient descent converges at a rate controlled by $\\kappa$: an ill-conditioned bowl (long thin valley, $\\kappa \\gg 1$) makes vanilla GD zig-zag painfully. This single number — read straight off the spectrum of the Hessian — explains why we normalize features, why batch norm helps, and what preconditioners and second-order methods are really trying to fix: they reshape the eigenvalue spectrum to bring $\\kappa$ toward 1.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li>Symmetric $\\Rightarrow$ real eigenvalues, orthonormal eigenbasis, $A = Q\\Lambda Q^T$ with $Q$ orthogonal.</li>\n<li>Quadratic forms diagonalize to $\\sum_i \\lambda_i y_i^2$ in the eigenbasis $y = Q^Tx$; cross terms disappear.</li>\n<li>Definiteness = signs of eigenvalues: PD (bowl/min), ND (dome/max), indefinite (saddle), with semidefinite for the boundary cases.</li>\n<li>This is the geometric engine behind Hessians (critical-point classification), covariance/PCA, conditioning, and convexity in ML.</li>\n</ul>",
          "mcq": [
            {
              "q": "A symmetric matrix $A$ has eigenvalues $\\{4, 0, -2\\}$. What is its definiteness classification?",
              "choices": [
                "Positive definite",
                "Positive semidefinite",
                "Indefinite",
                "Negative definite"
              ],
              "answer": 2,
              "explain": "It has both a positive eigenvalue (4) and a negative eigenvalue (-2), so the quadratic form takes both positive and negative values: indefinite. The zero eigenvalue alone would only block strict definiteness."
            },
            {
              "q": "For a real symmetric matrix, which decomposition is always available with $Q$ orthogonal ($Q^TQ=I$)?",
              "choices": [
                "$A = Q\\Lambda Q^{-1}$ where $Q$ may be non-orthogonal",
                "$A = Q\\Lambda Q^T$ with $\\Lambda$ real diagonal",
                "$A = Q\\Lambda Q^T$ but $\\Lambda$ may be complex",
                "$A = QR$ with $R$ upper triangular only"
              ],
              "answer": 1,
              "explain": "The spectral theorem gives orthogonal diagonalization $A=Q\\Lambda Q^T$ with real eigenvalues, so $Q^{-1}=Q^T$. The eigenvalues of a real symmetric matrix are always real, ruling out complex $\\Lambda$."
            },
            {
              "q": "Why is every covariance matrix $\\Sigma = \\mathbb{E}[(x-\\mu)(x-\\mu)^T]$ guaranteed to be positive semidefinite?",
              "choices": [
                "Because all its entries are nonnegative",
                "Because $a^T\\Sigma a = \\operatorname{Var}(a^Tx) \\ge 0$ for every $a$",
                "Because it is square and symmetric",
                "Because its determinant is always positive"
              ],
              "answer": 1,
              "explain": "For any direction $a$, $a^T\\Sigma a$ equals the variance of the scalar projection $a^Tx$, which can never be negative; hence PSD. Symmetry alone does not imply PSD, and covariance matrices can have zero eigenvalues (so determinant need not be positive)."
            },
            {
              "q": "At a critical point of a smooth loss, the Hessian is symmetric with eigenvalues $\\{5, 3, -1\\}$. The point is a:",
              "choices": [
                "Local minimum",
                "Local maximum",
                "Saddle point",
                "Flat / inconclusive region"
              ],
              "answer": 2,
              "explain": "Mixed-sign eigenvalues mean the surface curves up along some eigen-directions and down along others — the defining feature of a saddle point. A minimum would need all eigenvalues positive."
            },
            {
              "q": "In the spectral decomposition $A = \\sum_{i=1}^{n} \\lambda_i\\, q_i q_i^T$ of a symmetric matrix, what does each term $q_i q_i^T$ represent geometrically?",
              "choices": [
                "A rank-1 orthogonal projector onto the line spanned by $q_i$",
                "A rotation by angle $\\lambda_i$ about the axis $q_i$",
                "The inverse of the projection onto $q_i$",
                "A full-rank scaling matrix with all diagonal entries equal to $\\lambda_i$"
              ],
              "answer": 0,
              "explain": "Since $q_i$ is a unit vector, $q_i q_i^T$ is symmetric and idempotent ($q_i q_i^T q_i q_i^T = q_i q_i^T$ because $q_i^T q_i = 1$) with rank 1, so it projects any vector orthogonally onto the line through $q_i$."
            },
            {
              "q": "For a real symmetric matrix $A$, the lesson notes that orthogonal diagonalization $A = Q\\Lambda Q^T$ is computationally nicer than general diagonalization $A = P\\Lambda P^{-1}$. Why?",
              "choices": [
                "Because $Q$ is orthogonal, $P^{-1}$ is just $Q^T$, so no matrix inverse needs to be computed",
                "Because $\\Lambda$ becomes the identity matrix, eliminating eigenvalues",
                "Because $Q$ is triangular, making the product trivial",
                "Because the eigenvalues of $Q$ are all 1, so $Q$ can be dropped"
              ],
              "answer": 0,
              "explain": "Orthogonality gives $Q^TQ = I$, hence $Q^{-1} = Q^T$, replacing an expensive inverse with a cheap transpose."
            },
            {
              "q": "The proof that a real symmetric matrix has real eigenvalues relies on the quantity $\\bar v^T v$. Which property of $\\bar v^T v$ is the crucial step that lets us conclude $\\lambda = \\bar\\lambda$?",
              "choices": [
                "$\\bar v^T v = \\sum_i |v_i|^2 > 0$ for $v \\neq 0$, so it can be divided out",
                "$\\bar v^T v$ equals zero, forcing the eigenvalue to vanish",
                "$\\bar v^T v$ is purely imaginary, canceling the imaginary part of $\\lambda$",
                "$\\bar v^T v$ equals $\\lambda$, so it directly gives the eigenvalue"
              ],
              "answer": 0,
              "explain": "From $(\\lambda - \\bar\\lambda)\\,\\bar v^T v = 0$ and $\\bar v^T v = \\sum_i|v_i|^2 > 0$, we can divide to force $\\lambda = \\bar\\lambda$, i.e. $\\lambda$ is real."
            },
            {
              "q": "A student claims that because every real matrix has a Jordan form, the Spectral Theorem adds nothing new. Which statement correctly identifies what symmetry guarantees that a generic real matrix may lack?",
              "choices": [
                "Real eigenvalues, mutually orthogonal eigenvectors, and a full set of $n$ orthonormal eigenvectors (no defectiveness)",
                "That all eigenvalues are positive and the matrix is invertible",
                "That the matrix commutes with every other matrix of the same size",
                "That the determinant equals the sum of the eigenvalues"
              ],
              "answer": 0,
              "explain": "A generic real matrix can have complex eigenvalues, non-orthogonal eigenvectors, and may even be defective; symmetry removes all three pathologies at once. (The determinant equals the product, not the sum, of the eigenvalues, and symmetry implies neither positivity nor universal commutativity.)"
            }
          ],
          "flashcards": [
            {
              "front": "State the Spectral Theorem for real symmetric matrices.",
              "back": "If $A=A^T$ (real), then $A$ has all real eigenvalues and an orthonormal eigenbasis, so $A = Q\\Lambda Q^T$ with $Q$ orthogonal ($Q^TQ=I$) and $\\Lambda$ real diagonal. Equivalently $A=\\sum_i \\lambda_i q_i q_i^T$."
            },
            {
              "front": "How does a quadratic form $x^TAx$ look in the eigenbasis?",
              "back": "Setting $y=Q^Tx$, $x^TAx = y^T\\Lambda y = \\sum_i \\lambda_i y_i^2$ — a weighted sum of squares with eigenvalues as weights; all cross terms vanish."
            },
            {
              "front": "Definiteness in terms of eigenvalues.",
              "back": "PD: all $\\lambda_i>0$ (bowl/min). PSD: all $\\lambda_i\\ge0$. ND: all $\\lambda_i<0$ (dome/max). Indefinite: mixed signs (saddle). Equivalent to the sign of $x^TAx$ for all $x\\neq0$."
            },
            {
              "front": "Sylvester's criterion for positive definiteness.",
              "back": "A symmetric $A$ is positive definite iff every leading principal minor (top-left $k\\times k$ determinant) is positive. For $2\\times2$: $a_{11}>0$ and $\\det A>0$."
            },
            {
              "front": "Why is any $A=B^TB$ positive semidefinite?",
              "back": "$x^T B^TB x = \\|Bx\\|^2 \\ge 0$ for all $x$. It is positive definite iff $B$ has full column rank (so $Bx\\neq0$ whenever $x\\neq0$). Gram and covariance matrices are of this form."
            },
            {
              "front": "What does the condition number $\\kappa=\\lambda_{\\max}/\\lambda_{\\min}$ of a PD Hessian tell you in ML?",
              "back": "It measures how elongated/ill-conditioned the loss bowl is. Large $\\kappa$ makes gradient descent zig-zag and converge slowly; feature scaling, normalization, and preconditioning aim to push $\\kappa$ toward 1."
            }
          ],
          "homework": [
            {
              "prompt": "Orthogonally diagonalize $A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}$: find $Q$ and $\\Lambda$ with $A=Q\\Lambda Q^T$, and state whether $A$ is positive definite.",
              "hint": "Solve $\\det(A-\\lambda I)=0$ for the eigenvalues, find an eigenvector for each, then normalize. By the spectral theorem the two eigenvectors should come out orthogonal automatically.",
              "solution": "$\\det(A-\\lambda I)=(3-\\lambda)^2-1=\\lambda^2-6\\lambda+8=(\\lambda-2)(\\lambda-4)$, so $\\lambda_1=2,\\ \\lambda_2=4$. For $\\lambda=2$: $\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}v=0\\Rightarrow v_1=(1,-1)^T$. For $\\lambda=4$: $\\begin{bmatrix}-1&1\\\\1&-1\\end{bmatrix}v=0\\Rightarrow v_2=(1,1)^T$. They are orthogonal; normalize by $1/\\sqrt2$: $Q=\\tfrac1{\\sqrt2}\\begin{bmatrix}1&1\\\\-1&1\\end{bmatrix}$, $\\Lambda=\\begin{bmatrix}2&0\\\\0&4\\end{bmatrix}$, and $A=Q\\Lambda Q^T$. Both eigenvalues are positive, so $A$ is positive definite (cross-check: $a_{11}=3>0$, $\\det A=8>0$)."
            },
            {
              "prompt": "Classify the quadratic form $f(x_1,x_2) = x_1^2 - 4x_1x_2 + x_2^2$ as PD, ND, indefinite, or semidefinite, and identify the type of critical point it has at the origin.",
              "hint": "First write $f$ as $x^TAx$ with a symmetric $A$ — remember the off-diagonal entries each get half of the cross-term coefficient. Then find the eigenvalues or use Sylvester.",
              "solution": "The symmetric matrix is $A=\\begin{bmatrix}1&-2\\\\-2&1\\end{bmatrix}$ (off-diagonals are $-4/2=-2$). Eigenvalues: $\\det(A-\\lambda I)=(1-\\lambda)^2-4=0\\Rightarrow 1-\\lambda=\\pm2\\Rightarrow \\lambda=3$ or $\\lambda=-1$. Mixed signs $\\Rightarrow$ indefinite. Equivalently, Sylvester fails: $\\det A = 1-4=-3<0$. The origin is therefore a saddle point: $f$ increases along the $\\lambda=3$ eigen-direction and decreases along the $\\lambda=-1$ direction."
            },
            {
              "prompt": "Let $B = \\begin{bmatrix} 1 & 2 \\\\ 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$. Show that $A = B^TB$ is positive definite, and explain in one sentence the general principle this illustrates about Gram matrices.",
              "hint": "Compute $A=B^TB$ (a $2\\times2$ matrix), then test definiteness via Sylvester. For the principle, think about what $x^TB^TBx$ equals geometrically and when it can be zero.",
              "solution": "$B^TB = \\begin{bmatrix}1&1&0\\\\2&0&1\\end{bmatrix}\\begin{bmatrix}1&2\\\\1&0\\\\0&1\\end{bmatrix} = \\begin{bmatrix}2&2\\\\2&5\\end{bmatrix}$. Sylvester: $a_{11}=2>0$ and $\\det A = 10-4=6>0$, so $A$ is positive definite. General principle: any $A=B^TB$ is PSD because $x^TAx=\\|Bx\\|^2\\ge0$, and it is strictly PD exactly when $B$ has full column rank (here the two columns of $B$ are linearly independent, so $Bx=0$ only for $x=0$)."
            }
          ]
        }
      ]
    },
    {
      "id": "la-orthogonality",
      "title": "Orthogonality, Projection, and Least Squares",
      "lessons": [
        {
          "id": "la-orthonormal-gram-schmidt",
          "title": "Orthonormal Bases and Gram-Schmidt",
          "minutes": 16,
          "content": "<h3>Why orthogonality is the secret sauce of linear algebra</h3>\n<p>Most of linear algebra gets dramatically easier the moment your basis vectors are mutually perpendicular and have unit length. Coordinates become dot products. Inverses become transposes. Least-squares regression collapses into a sum of independent one-dimensional projections. Whole families of numerical algorithms — QR, the SVD, PCA, the modern attention mechanism's stability tricks — lean on this single idea. This lesson builds that machinery from scratch: orthonormal sets, orthogonal matrices, the Gram-Schmidt process, and the QR factorization.</p>\n\n<h3>Orthogonal and orthonormal sets</h3>\n<p>Recall the dot (inner) product in $\\mathbb{R}^n$: $\\langle u, v\\rangle = u^\\top v = \\sum_i u_i v_i$, with norm $\\|v\\| = \\sqrt{\\langle v, v\\rangle}$. Two vectors are <strong>orthogonal</strong> when $\\langle u, v\\rangle = 0$.</p>\n<p>A set $\\{q_1, \\dots, q_k\\}$ is:</p>\n<ul>\n<li><strong>orthogonal</strong> if $\\langle q_i, q_j\\rangle = 0$ for all $i \\ne j$;</li>\n<li><strong>orthonormal</strong> if additionally each $\\|q_i\\| = 1$, i.e. $\\langle q_i, q_j\\rangle = \\delta_{ij}$ (the Kronecker delta: $1$ if $i=j$, else $0$).</li>\n</ul>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Orthonormal vectors are a set of perfectly square, unit-length measuring axes. Unlike a skewed coordinate system, there is no \"leakage\" between axes: moving along one direction changes none of your other coordinates. That independence is what makes everything downstream cheap.</p>\n</div>\n\n<h4>Orthogonal sets are automatically independent</h4>\n<p>A nonzero orthogonal set is linearly independent. Suppose $\\sum_i c_i q_i = 0$. Take the dot product with a fixed $q_j$:</p>\n$$0 = \\left\\langle q_j, \\sum_i c_i q_i \\right\\rangle = \\sum_i c_i \\langle q_j, q_i\\rangle = c_j \\|q_j\\|^2.$$\n<p>Since $q_j \\ne 0$, we get $c_j = 0$. As $j$ was arbitrary, all coefficients vanish. So orthogonality is a <em>strong</em> form of independence you get for free — no row reduction needed.</p>\n\n<h3>Coordinates become trivial</h3>\n<p>Here is the first big payoff. If $\\{q_1,\\dots,q_n\\}$ is an orthonormal basis of $\\mathbb{R}^n$ and $x$ is any vector, then the coordinates of $x$ in that basis are just dot products:</p>\n$$x = \\sum_{i=1}^{n} \\langle q_i, x\\rangle \\, q_i.$$\n<p>To see why, write $x = \\sum_j c_j q_j$ (possible since it's a basis), then dot with $q_i$: every cross term dies and $\\langle q_i, x\\rangle = c_i$. Compare this with a general basis, where finding coordinates means <em>solving a linear system</em> $Bc = x$. With an orthonormal basis you skip the solve entirely and read off each coordinate with one inner product.</p>\n<p>The term $\\langle q_i, x\\rangle\\, q_i$ is the <strong>projection of $x$ onto the line spanned by $q_i$</strong>. So expanding in an orthonormal basis is literally decomposing $x$ into independent projections. This is the engine behind Fourier series, wavelets, and PCA scores — all \"expand a signal in an orthonormal basis and keep the big coefficients.\"</p>\n\n<h4>Projection onto a subspace</h4>\n<p>If $\\{q_1,\\dots,q_k\\}$ is an orthonormal basis for a subspace $W$ (with possibly $k < n$), the orthogonal projection of any $x \\in \\mathbb{R}^n$ onto $W$ is</p>\n$$\\operatorname{proj}_W x = \\sum_{i=1}^{k} \\langle q_i, x\\rangle\\, q_i.$$\n<p>No matrix inverse appears. Contrast with a non-orthonormal basis stored as columns of $A$, where $\\operatorname{proj}_W x = A(A^\\top A)^{-1}A^\\top x$. Orthonormality makes $A^\\top A = I$, and the ugly normal-equations inverse simply evaporates.</p>\n\n<h3>Orthogonal matrices</h3>\n<p>Collect orthonormal vectors as the columns of a square matrix $Q = [\\,q_1 \\;\\cdots\\; q_n\\,]$. The condition $\\langle q_i, q_j\\rangle = \\delta_{ij}$ is exactly the statement</p>\n$$Q^\\top Q = I.$$\n<p>For a square matrix this also gives $QQ^\\top = I$, so $Q^{-1} = Q^\\top$. Such a matrix is called <strong>orthogonal</strong>. (The name is a historical quirk: \"orthogonal matrix\" really means <em>orthonormal columns</em>.)</p>\n\n<h4>They preserve lengths and angles</h4>\n<p>Orthogonal matrices are exactly the linear maps that are rigid motions about the origin — rotations and reflections. For any $x, y$:</p>\n$$\\langle Qx, Qy\\rangle = (Qx)^\\top(Qy) = x^\\top Q^\\top Q\\, y = x^\\top y = \\langle x, y\\rangle.$$\n<p>Setting $y = x$ gives $\\|Qx\\| = \\|x\\|$: lengths are preserved. Because both lengths and inner products are preserved, the angle $\\cos\\theta = \\langle x,y\\rangle / (\\|x\\|\\|y\\|)$ is preserved too. A few consequences:</p>\n<ul>\n<li>Eigenvalues of $Q$ lie on the unit circle: $|\\lambda| = 1$.</li>\n<li>$\\det Q = \\pm 1$ ($+1$ for rotations, $-1$ for reflections).</li>\n<li>$Q$ has condition number $1$ — the gold standard for numerical stability.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Length preservation is why orthogonal transforms are numerically beloved. Multiplying by $Q$ never amplifies error or blows up gradients. Orthogonal weight initialization and orthogonal/unitary recurrent layers exploit exactly this to fight vanishing and exploding gradients in deep and recurrent networks. The same property makes QR and SVD the workhorses of stable numerical linear algebra.</p>\n</div>\n\n<h3>The Gram-Schmidt process</h3>\n<p>Given a linearly independent set $\\{a_1,\\dots,a_k\\}$, Gram-Schmidt manufactures an orthonormal set $\\{q_1,\\dots,q_k\\}$ spanning the same subspace, processing the vectors one at a time. The idea: take the next vector, <em>subtract off its components along everything you've already orthonormalized</em>, then normalize what's left.</p>\n<p>Write the projection of $v$ onto a unit vector $q$ as $(q^\\top v)\\,q$. The algorithm:</p>\n<ol>\n<li>$u_1 = a_1$, &nbsp; $q_1 = u_1 / \\|u_1\\|$.</li>\n<li>$u_2 = a_2 - (q_1^\\top a_2)\\,q_1$, &nbsp; $q_2 = u_2 / \\|u_2\\|$.</li>\n<li>In general, $\\displaystyle u_j = a_j - \\sum_{i=1}^{j-1} (q_i^\\top a_j)\\,q_i$, &nbsp; $q_j = u_j / \\|u_j\\|$.</li>\n</ol>\n<p>Each $u_j$ is, by construction, orthogonal to all earlier $q_i$ (subtracting the projection removes precisely the part that wasn't perpendicular). The $a_j$ being independent guarantees $u_j \\ne 0$, so division is safe.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Gram-Schmidt is the constructive proof that <em>every</em> finite-dimensional subspace has an orthonormal basis. That existence theorem underwrites the spectral theorem (symmetric matrices have orthonormal eigenvectors), the SVD, and the whole theory of orthogonal projections. The procedure is also the conceptual ancestor of QR-based eigenvalue algorithms.</p>\n</div>\n\n<h4>A numerical caution</h4>\n<p>The \"classical\" Gram-Schmidt above loses orthogonality badly in floating point when vectors are nearly parallel. <strong>Modified Gram-Schmidt</strong> — subtract each projection from the running remainder immediately, rather than all at once from the original $a_j$ — is mathematically identical but far more stable. Production code (LAPACK) typically uses Householder reflections instead, but the underlying factorization is the same QR you are about to meet.</p>\n\n<h3>QR factorization</h3>\n<p>Gram-Schmidt secretly computes a matrix factorization. Stack the inputs as columns $A = [\\,a_1\\;\\cdots\\;a_k\\,]$. Reversing each Gram-Schmidt step expresses each $a_j$ in terms of the $q_i$ produced <em>so far</em>:</p>\n$$a_j = \\sum_{i=1}^{j} r_{ij}\\, q_i, \\qquad r_{ij} = q_i^\\top a_j \\ (i<j), \\quad r_{jj} = \\|u_j\\|.$$\n<p>Because $a_j$ uses only $q_1,\\dots,q_j$, the coefficient matrix is upper triangular. In matrix form:</p>\n$$A = QR,$$\n<p>where $Q$ has orthonormal columns ($Q^\\top Q = I$) and $R$ is upper triangular with positive diagonal $r_{jj} = \\|u_j\\| > 0$. This is the <strong>QR factorization</strong>. Every matrix with independent columns has one, and it is unique under the positive-diagonal convention.</p>\n\n<h4>Why QR is everywhere</h4>\n<p>QR turns the least-squares normal equations $A^\\top A\\,\\hat{x} = A^\\top b$ into something stable. Substituting $A=QR$ and using $Q^\\top Q = I$:</p>\n$$R^\\top R\\,\\hat{x} = R^\\top Q^\\top b \\;\\Longrightarrow\\; R\\,\\hat{x} = Q^\\top b.$$\n<p>Solving an upper-triangular system by back-substitution is fast and avoids forming the ill-conditioned matrix $A^\\top A$ (which squares the condition number). This is how robust regression solvers — including the default in NumPy's <code>lstsq</code> and most statistics packages — actually fit linear models.</p>\n\n<h3>Worked example: orthonormalize and factor</h3>\n<p>Let $a_1 = \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$, $a_2 = \\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix}$. We'll run Gram-Schmidt and read off $A = QR$.</p>\n<p><strong>Step 1.</strong> $u_1 = a_1$, $\\|u_1\\| = \\sqrt{1^2+1^2+0^2} = \\sqrt2$. So</p>\n$$q_1 = \\frac{1}{\\sqrt2}\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}.$$\n<p><strong>Step 2.</strong> Project $a_2$ onto $q_1$: $q_1^\\top a_2 = \\frac{1}{\\sqrt2}(1\\cdot1 + 1\\cdot0 + 0\\cdot1) = \\frac{1}{\\sqrt2}$. Subtract the projection $(q_1^\\top a_2)\\,q_1 = \\frac{1}{\\sqrt2}\\,q_1$:</p>\n$$u_2 = a_2 - \\tfrac{1}{\\sqrt2}\\,q_1 = \\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix} - \\tfrac{1}{\\sqrt2}\\cdot\\tfrac{1}{\\sqrt2}\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix} = \\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix} - \\tfrac{1}{2}\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix} = \\begin{bmatrix}1/2\\\\-1/2\\\\1\\end{bmatrix}.$$\n<p>Check orthogonality: $q_1^\\top u_2 = \\frac{1}{\\sqrt2}(\\tfrac12 - \\tfrac12 + 0) = 0$. Good. Now $\\|u_2\\| = \\sqrt{\\tfrac14 + \\tfrac14 + 1} = \\sqrt{3/2} = \\frac{\\sqrt6}{2}$, so</p>\n$$q_2 = \\frac{2}{\\sqrt6}\\begin{bmatrix}1/2\\\\-1/2\\\\1\\end{bmatrix} = \\frac{1}{\\sqrt6}\\begin{bmatrix}1\\\\-1\\\\2\\end{bmatrix}.$$\n<p><strong>Assemble $R$.</strong> The entries are $r_{11} = \\|u_1\\| = \\sqrt2$, $r_{12} = q_1^\\top a_2 = \\frac{1}{\\sqrt2}$, $r_{22} = \\|u_2\\| = \\frac{\\sqrt6}{2}$. Therefore</p>\n$$Q = \\begin{bmatrix} 1/\\sqrt2 & 1/\\sqrt6 \\\\ 1/\\sqrt2 & -1/\\sqrt6 \\\\ 0 & 2/\\sqrt6 \\end{bmatrix}, \\qquad R = \\begin{bmatrix} \\sqrt2 & 1/\\sqrt2 \\\\ 0 & \\sqrt6/2 \\end{bmatrix}.$$\n<p><strong>Verify.</strong> Column 1 of $QR$: $\\sqrt2\\,q_1 = a_1$. Column 2: $\\frac{1}{\\sqrt2}q_1 + \\frac{\\sqrt6}{2}q_2 = \\frac12\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix} + \\begin{bmatrix}1/2\\\\-1/2\\\\1\\end{bmatrix} = \\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix} = a_2$. And $Q^\\top Q = I$ since the columns are orthonormal by construction.</p>\n\n<h4>The same thing in code</h4>\n<pre><code>import numpy as np\n\nA = np.array([[1.0, 1.0],\n              [1.0, 0.0],\n              [0.0, 1.0]])\n\nQ, R = np.linalg.qr(A)          # economy QR by default\nprint(np.round(Q, 4))\nprint(np.round(R, 4))\nprint(np.allclose(Q.T @ Q, np.eye(2)))   # True: orthonormal columns\nprint(np.allclose(Q @ R, A))             # True: factorization holds\n</code></pre>\n<p>Note: NumPy may choose signs so its $R$ has negative diagonal entries (it uses Householder, not Gram-Schmidt). The factorization is still valid; uniqueness only holds once you fix the diagonal-sign convention, e.g. by flipping the sign of any column $q_j$ and row $r_{j\\cdot}$ together.</p>\n\n<h3>Recap</h3>\n<ul>\n<li><strong>Orthonormal set:</strong> $\\langle q_i,q_j\\rangle = \\delta_{ij}$; automatically linearly independent.</li>\n<li><strong>Coordinates for free:</strong> $x = \\sum_i \\langle q_i,x\\rangle q_i$ — projection via dot products, no system solve.</li>\n<li><strong>Orthogonal matrix:</strong> $Q^\\top Q = I$, hence $Q^{-1}=Q^\\top$; preserves lengths, angles, and norms; $\\det Q = \\pm1$.</li>\n<li><strong>Gram-Schmidt:</strong> subtract projections onto earlier $q_i$, then normalize; constructs an orthonormal basis for the same span.</li>\n<li><strong>QR:</strong> $A = QR$ with $Q$ orthonormal-columned and $R$ upper triangular; the stable foundation of least squares.</li>\n</ul>",
          "mcq": [
            {
              "q": "$Q$ is a square matrix with orthonormal columns. Which statement is FALSE?",
              "choices": [
                "$Q^{-1} = Q^\\top$",
                "$\\|Qx\\| = \\|x\\|$ for all $x$",
                "Every eigenvalue of $Q$ satisfies $|\\lambda| = 1$",
                "$\\det Q$ can be any nonzero real number"
              ],
              "answer": 3,
              "explain": "Orthogonal matrices have $\\det Q = \\pm 1$ only, since they preserve volume up to a reflection. The other three are all true consequences of $Q^\\top Q = I$."
            },
            {
              "q": "When you expand a vector $x$ in an orthonormal basis $\\{q_1,\\dots,q_n\\}$, the $i$-th coordinate is:",
              "choices": [
                "the $i$-th entry of $B^{-1}x$, where $B$ holds a different (non-orthonormal) basis as its columns",
                "$\\langle q_i, x\\rangle$",
                "$\\langle q_i, x\\rangle / \\|q_i\\|^2$",
                "obtained by solving the linear system $Qc = x$ with Gaussian elimination"
              ],
              "answer": 1,
              "explain": "Orthonormality makes coordinates equal to plain dot products: $c_i = \\langle q_i, x\\rangle$. Choice 2 divides by $\\|q_i\\|^2$, which is the formula for a merely orthogonal (not normalized) set and is wrong when $\\|q_i\\|=1$ is needed only as an extra step. Choices 0 and 4 describe the general-basis 'solve a system' procedure that orthonormality lets you skip entirely (note choice 0 uses a different basis $B$, not the $q_i$ themselves)."
            },
            {
              "q": "In the QR factorization $A = QR$ produced by Gram-Schmidt, why is $R$ upper triangular?",
              "choices": [
                "Because $Q$ is orthogonal, its inverse forces triangularity",
                "Because $a_j$ is a combination of only $q_1,\\dots,q_j$ (the ones produced up to step $j$)",
                "Because $A$ was assumed to be upper triangular to begin with",
                "Because normalization always zeroes out the lower triangle"
              ],
              "answer": 1,
              "explain": "Each input column $a_j$ lies in the span of the orthonormal vectors built so far, $q_1,\\dots,q_j$, so its expansion has no $q_i$ component for $i>j$ — exactly the upper-triangular pattern."
            },
            {
              "q": "Why do numerical least-squares solvers prefer solving $R\\hat{x} = Q^\\top b$ (via QR) over the normal equations $A^\\top A\\,\\hat{x} = A^\\top b$?",
              "choices": [
                "QR is the only method that gives an exact answer",
                "Forming $A^\\top A$ squares the condition number, amplifying error, while QR avoids it",
                "The normal equations have no solution when columns are independent",
                "$Q^\\top b$ is cheaper to compute than $A^\\top b$, dominating the cost"
              ],
              "answer": 1,
              "explain": "$A^\\top A$ has condition number $\\kappa(A)^2$, which can be disastrous for ill-conditioned $A$; QR works with $R$ directly and keeps the conditioning at $\\kappa(A)$."
            },
            {
              "q": "You have an orthonormal basis $\\{q_1,\\dots,q_n\\}$ of $\\mathbb{R}^n$ and want the coordinates of a vector $x$. Compared with a general (non-orthonormal) basis $B$, what work does orthonormality save?",
              "choices": [
                "Nothing — you must still solve $Bc = x$ either way",
                "You skip solving a linear system; each coordinate is read off as a single inner product $\\langle q_i, x\\rangle$",
                "You must invert $B$ but the inverse is cheaper to compute",
                "You still solve a system, but only an upper-triangular one"
              ],
              "answer": 1,
              "explain": "For a general basis you solve $Bc=x$. With an orthonormal basis the columns satisfy $\\langle q_i,q_j\\rangle=\\delta_{ij}$, so the cross terms vanish and each coordinate is read off directly as $c_i=\\langle q_i,x\\rangle$, eliminating the linear solve entirely."
            },
            {
              "q": "The lesson proves a nonzero orthogonal set is automatically linearly independent. In the proof, after assuming $\\sum_i c_i q_i = 0$ and dotting with $q_j$, what equation forces $c_j = 0$?",
              "choices": [
                "$c_j \\langle q_j, q_j \\rangle^{1/2} = 0$",
                "$c_j \\|q_j\\|^2 = 0$ with $q_j \\ne 0$",
                "$\\sum_i c_i = 0$ and all $c_i$ equal",
                "$c_j + \\sum_{i \\ne j} c_i = 0$"
              ],
              "answer": 1,
              "explain": "Dotting $\\sum_i c_i q_i=0$ with $q_j$ gives $\\sum_i c_i\\langle q_j,q_i\\rangle=0$. Every cross term $\\langle q_j,q_i\\rangle$ vanishes for $i\\ne j$, leaving $c_j\\|q_j\\|^2=0$; since $q_j\\ne 0$ we have $\\|q_j\\|^2>0$, so $c_j=0$."
            },
            {
              "q": "An orthogonal set has $\\langle q_i, q_j \\rangle = 0$ for $i \\ne j$. What ADDITIONAL condition upgrades it to orthonormal, captured by writing $\\langle q_i, q_j \\rangle = \\delta_{ij}$?",
              "choices": [
                "The vectors must also span $\\mathbb{R}^n$",
                "Each vector must have unit length, $\\|q_i\\| = 1$",
                "The vectors must be sorted by increasing norm",
                "There must be exactly $n$ of them"
              ],
              "answer": 1,
              "explain": "Orthogonality already gives the off-diagonal $0$. The extra requirement is unit length, $\\|q_i\\|=1$, equivalently $\\langle q_i,q_i\\rangle=1$, which fills in the diagonal so that $\\langle q_i,q_j\\rangle=\\delta_{ij}$."
            },
            {
              "q": "In the expansion $x = \\sum_i \\langle q_i, x\\rangle\\, q_i$ over an orthonormal basis, how should the single term $\\langle q_i, x\\rangle\\, q_i$ be interpreted geometrically?",
              "choices": [
                "The reflection of $x$ across the hyperplane orthogonal to $q_i$",
                "The projection of $x$ onto the line spanned by $q_i$",
                "The component of $x$ removed by Gram-Schmidt",
                "The rejection of $x$ from all other axes simultaneously"
              ],
              "answer": 1,
              "explain": "The scalar $\\langle q_i, x\\rangle$ times the unit vector $q_i$ is exactly the orthogonal projection of $x$ onto the line through $q_i$, so the full expansion writes $x$ as a sum of its one-dimensional projections onto the basis axes."
            }
          ],
          "flashcards": [
            {
              "front": "Define an orthonormal set and state the one-line condition.",
              "back": "Vectors $q_1,\\dots,q_k$ with $\\langle q_i,q_j\\rangle = \\delta_{ij}$: mutually orthogonal and each of unit length. Equivalently the matrix $Q=[q_1\\cdots q_k]$ satisfies $Q^\\top Q = I$."
            },
            {
              "front": "How do you find the coordinates of $x$ in an orthonormal basis $\\{q_i\\}$?",
              "back": "$x = \\sum_i \\langle q_i, x\\rangle\\, q_i$ — each coordinate is just the dot product $\\langle q_i,x\\rangle$. No linear system to solve."
            },
            {
              "front": "What properties does an orthogonal matrix $Q$ ($Q^\\top Q = I$) have?",
              "back": "$Q^{-1}=Q^\\top$; preserves inner products, lengths, and angles ($\\|Qx\\|=\\|x\\|$); eigenvalues have $|\\lambda|=1$; $\\det Q = \\pm1$; condition number 1."
            },
            {
              "front": "State the Gram-Schmidt update for the $j$-th vector.",
              "back": "$u_j = a_j - \\sum_{i=1}^{j-1}(q_i^\\top a_j)\\,q_i$, then $q_j = u_j/\\|u_j\\|$. Subtract components along earlier orthonormal vectors, then normalize."
            },
            {
              "front": "What is the QR factorization and what are $Q$ and $R$?",
              "back": "$A = QR$ where $Q$ has orthonormal columns ($Q^\\top Q = I$) and $R$ is upper triangular with $r_{ij}=q_i^\\top a_j$ for $i<j$ and $r_{jj}=\\|u_j\\|>0$. Unique under the positive-diagonal convention."
            },
            {
              "front": "Why is QR preferred over the normal equations for least squares?",
              "back": "$A=QR$ reduces $A^\\top A\\hat{x}=A^\\top b$ to the triangular system $R\\hat{x}=Q^\\top b$, solved by back-substitution. It avoids forming $A^\\top A$, which would square the condition number."
            }
          ],
          "homework": [
            {
              "prompt": "Apply Gram-Schmidt to $a_1=\\begin{bmatrix}2\\\\0\\\\0\\end{bmatrix}$, $a_2=\\begin{bmatrix}1\\\\3\\\\0\\end{bmatrix}$, $a_3=\\begin{bmatrix}1\\\\1\\\\5\\end{bmatrix}$ to produce an orthonormal basis $\\{q_1,q_2,q_3\\}$ of $\\mathbb{R}^3$.",
              "hint": "$a_1$ is along the x-axis, so $q_1=e_1$. After subtracting projections, you should find $q_2=e_2$ and $q_3=e_3$ — these vectors already point 'mostly' along the axes.",
              "solution": "Step 1: $\\|a_1\\|=2$, so $q_1=(1,0,0)^\\top=e_1$. Step 2: $q_1^\\top a_2 = 1$, so $u_2 = a_2 - 1\\cdot q_1 = (0,3,0)^\\top$; $\\|u_2\\|=3$, giving $q_2=(0,1,0)^\\top=e_2$. Step 3: $q_1^\\top a_3 = 1$ and $q_2^\\top a_3 = 1$, so $u_3 = a_3 - 1\\cdot q_1 - 1\\cdot q_2 = (0,0,5)^\\top$; $\\|u_3\\|=5$, giving $q_3=(0,0,1)^\\top=e_3$. The orthonormal basis is the standard basis $\\{e_1,e_2,e_3\\}$. (This makes sense: the original vectors were already upper-triangular, so $A$ was its own $R$ up to scaling, with $Q=I$.)"
            },
            {
              "prompt": "Determine whether $Q = \\frac{1}{3}\\begin{bmatrix}2 & -2 & 1\\\\1 & 2 & 2\\\\2 & 1 & -2\\end{bmatrix}$ is an orthogonal matrix.",
              "hint": "Check that each column has norm 1 and that distinct columns are orthogonal — equivalently verify $Q^\\top Q = I$.",
              "solution": "Columns: $c_1=\\frac13(2,1,2)$, $c_2=\\frac13(-2,2,1)$, $c_3=\\frac13(1,2,-2)$. Norms: $\\|c_1\\|^2=\\frac19(4+1+4)=1$; $\\|c_2\\|^2=\\frac19(4+4+1)=1$; $\\|c_3\\|^2=\\frac19(1+4+4)=1$. Cross terms: $c_1^\\top c_2=\\frac19(-4+2+2)=0$; $c_1^\\top c_3=\\frac19(2+2-4)=0$; $c_2^\\top c_3=\\frac19(-2+4-2)=0$. All conditions hold, so $Q^\\top Q=I$ and $Q$ is orthogonal. Its determinant is $\\det Q = \\frac{1}{27}\\det\\begin{bmatrix}2&-2&1\\\\1&2&2\\\\2&1&-2\\end{bmatrix} = \\frac{-27}{27} = -1$, so $Q$ is a reflection (an improper rotation), not a pure rotation."
            },
            {
              "prompt": "Compute the QR factorization of $A=\\begin{bmatrix}1 & 2\\\\0 & 1\\\\1 & 0\\end{bmatrix}$, then use it to solve the least-squares problem $\\min_x\\|Ax-b\\|$ for $b=\\begin{bmatrix}1\\\\1\\\\1\\end{bmatrix}$ via $R\\hat{x}=Q^\\top b$.",
              "hint": "Run Gram-Schmidt on the two columns to get $Q$ and $R$, then form $Q^\\top b$ and back-substitute.",
              "solution": "Column 1: $u_1=(1,0,1)^\\top$, $\\|u_1\\|=\\sqrt2$, so $q_1=\\frac{1}{\\sqrt2}(1,0,1)^\\top$ and $r_{11}=\\sqrt2$. Column 2: $r_{12}=q_1^\\top a_2 = \\frac{1}{\\sqrt2}(1\\cdot2+0\\cdot1+1\\cdot0)=\\frac{2}{\\sqrt2}=\\sqrt2$. Then $u_2=a_2-\\sqrt2\\,q_1 = (2,1,0)^\\top-(1,0,1)^\\top=(1,1,-1)^\\top$, with $\\|u_2\\|=\\sqrt3$, so $q_2=\\frac{1}{\\sqrt3}(1,1,-1)^\\top$ and $r_{22}=\\sqrt3$. Thus $Q=\\begin{bmatrix}1/\\sqrt2 & 1/\\sqrt3\\\\0 & 1/\\sqrt3\\\\1/\\sqrt2 & -1/\\sqrt3\\end{bmatrix}$, $R=\\begin{bmatrix}\\sqrt2 & \\sqrt2\\\\0 & \\sqrt3\\end{bmatrix}$. Now $Q^\\top b$: first entry $\\frac{1}{\\sqrt2}(1+0+1)=\\frac{2}{\\sqrt2}=\\sqrt2$; second entry $\\frac{1}{\\sqrt3}(1+1-1)=\\frac{1}{\\sqrt3}$. Back-substitute $R\\hat{x}=Q^\\top b$: from row 2, $\\sqrt3\\,\\hat{x}_2=\\frac{1}{\\sqrt3}\\Rightarrow \\hat{x}_2=\\frac13$. From row 1, $\\sqrt2\\,\\hat{x}_1+\\sqrt2\\,\\hat{x}_2=\\sqrt2\\Rightarrow \\hat{x}_1+\\hat{x}_2=1\\Rightarrow \\hat{x}_1=\\frac23$. So $\\hat{x}=(\\tfrac23,\\tfrac13)^\\top$."
            }
          ],
          "examples": [
            {
              "title": "Gram-Schmidt on two vectors in $\\mathbb{R}^3$",
              "body": "Apply the Gram-Schmidt process to the linearly independent set\n$$a_1 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\qquad a_2 = \\begin{bmatrix} 2 \\\\ 0 \\\\ 2 \\end{bmatrix}$$\nto produce an orthonormal basis $\\{q_1, q_2\\}$ for the plane they span.",
              "solution": "**Step 1 — Normalize the first vector.** We keep the direction of $a_1$ and scale it to unit length:\n$$\\|a_1\\| = \\sqrt{1^2 + 1^2 + 0^2} = \\sqrt{2}, \\qquad q_1 = \\frac{a_1}{\\|a_1\\|} = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}.$$\n\n**Step 2 — Subtract from $a_2$ its component along $q_1$.** Since $q_1$ is already a unit vector, the projection coefficient is simply the dot product:\n$$\\langle q_1, a_2\\rangle = \\frac{1}{\\sqrt{2}}(1\\cdot 2 + 1\\cdot 0 + 0\\cdot 2) = \\frac{2}{\\sqrt{2}} = \\sqrt{2}.$$\nThe part of $a_2$ left over after removing its $q_1$-component is\n$$v_2 = a_2 - \\langle q_1, a_2\\rangle\\, q_1 = \\begin{bmatrix} 2 \\\\ 0 \\\\ 2 \\end{bmatrix} - \\sqrt{2}\\cdot\\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 0 \\\\ 2 \\end{bmatrix} - \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix}.$$\nQuick sanity check that we really removed all of the $q_1$-direction: $\\langle q_1, v_2\\rangle = \\frac{1}{\\sqrt{2}}(1 - 1 + 0) = 0.$ Good — $v_2 \\perp q_1$.\n\n**Step 3 — Normalize $v_2$.**\n$$\\|v_2\\| = \\sqrt{1^2 + (-1)^2 + 2^2} = \\sqrt{6}, \\qquad q_2 = \\frac{v_2}{\\|v_2\\|} = \\frac{1}{\\sqrt{6}}\\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix}.$$\n\n**Result.** An orthonormal basis for $\\operatorname{span}\\{a_1, a_2\\}$ is\n$$q_1 = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\qquad q_2 = \\frac{1}{\\sqrt{6}}\\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix}.$$\nFinal verification: $\\|q_1\\| = 1$, $\\|q_2\\| = 1$, and $\\langle q_1, q_2\\rangle = \\frac{1}{\\sqrt{2}\\sqrt{6}}(1 - 1 + 0) = 0$, so $\\{q_1, q_2\\}$ is orthonormal as required."
            },
            {
              "title": "Full QR factorization of a $3\\times 3$ matrix",
              "body": "Use the Gram-Schmidt process to compute the QR factorization $A = QR$, where $Q$ has orthonormal columns and $R$ is upper triangular, for\n$$A = \\begin{bmatrix} 1 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}.$$\nThe columns are $a_1 = (1,1,1)$, $a_2 = (1,0,1)$, $a_3 = (0,1,1)$.",
              "solution": "The key bookkeeping fact: as Gram-Schmidt runs, the coefficients it computes are exactly the entries of $R$. Specifically $r_{ii} = \\|v_i\\|$ (the norm before normalizing) and $r_{ij} = \\langle q_i, a_j\\rangle$ for $i<j$.\n\n**Column 1.**\n$$r_{11} = \\|a_1\\| = \\sqrt{1^2+1^2+1^2} = \\sqrt{3}, \\qquad q_1 = \\frac{1}{\\sqrt{3}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}.$$\n\n**Column 2.** Project $a_2$ onto $q_1$ and subtract:\n$$r_{12} = \\langle q_1, a_2\\rangle = \\frac{1}{\\sqrt{3}}(1+0+1) = \\frac{2}{\\sqrt{3}}.$$\n$$v_2 = a_2 - r_{12}\\,q_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} - \\frac{2}{\\sqrt{3}}\\cdot\\frac{1}{\\sqrt{3}}\\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} - \\frac{2}{3}\\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1/3 \\\\ -2/3 \\\\ 1/3 \\end{bmatrix}.$$\n$$r_{22} = \\|v_2\\| = \\sqrt{\\tfrac{1}{9}+\\tfrac{4}{9}+\\tfrac{1}{9}} = \\sqrt{\\tfrac{6}{9}} = \\frac{\\sqrt{6}}{3}, \\qquad q_2 = \\frac{v_2}{r_{22}} = \\frac{1}{\\sqrt{6}}\\begin{bmatrix} 1 \\\\ -2 \\\\ 1 \\end{bmatrix}.$$\n(Check: $\\frac{1/3}{\\sqrt{6}/3} = \\frac{1}{\\sqrt{6}}$, matching the normalized form.)\n\n**Column 3.** Remove both the $q_1$- and $q_2$-components from $a_3$:\n$$r_{13} = \\langle q_1, a_3\\rangle = \\frac{1}{\\sqrt{3}}(0+1+1) = \\frac{2}{\\sqrt{3}}, \\qquad r_{23} = \\langle q_2, a_3\\rangle = \\frac{1}{\\sqrt{6}}(0 - 2 + 1) = -\\frac{1}{\\sqrt{6}}.$$\n$$v_3 = a_3 - r_{13}\\,q_1 - r_{23}\\,q_2 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 1 \\end{bmatrix} - \\frac{2}{3}\\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} - \\left(-\\frac{1}{6}\\right)\\begin{bmatrix} 1 \\\\ -2 \\\\ 1 \\end{bmatrix}.$$\nHere $r_{13}q_1 = \\frac{2}{\\sqrt3}\\cdot\\frac{1}{\\sqrt3}(1,1,1) = \\frac{2}{3}(1,1,1)$ and $r_{23}q_2 = -\\frac{1}{\\sqrt6}\\cdot\\frac{1}{\\sqrt6}(1,-2,1) = -\\frac{1}{6}(1,-2,1)$. Carrying out the arithmetic componentwise:\n$$v_3 = \\begin{bmatrix} 0 - \\tfrac{2}{3} + \\tfrac{1}{6} \\\\ 1 - \\tfrac{2}{3} - \\tfrac{2}{6} \\\\ 1 - \\tfrac{2}{3} + \\tfrac{1}{6} \\end{bmatrix} = \\begin{bmatrix} -1/2 \\\\ 0 \\\\ 1/2 \\end{bmatrix}.$$\n$$r_{33} = \\|v_3\\| = \\sqrt{\\tfrac{1}{4} + 0 + \\tfrac{1}{4}} = \\frac{1}{\\sqrt{2}}, \\qquad q_3 = \\frac{v_3}{r_{33}} = \\frac{1}{\\sqrt{2}}\\begin{bmatrix} -1 \\\\ 0 \\\\ 1 \\end{bmatrix}.$$\n\n**Assemble $Q$ and $R$.**\n$$Q = \\begin{bmatrix} 1/\\sqrt{3} & 1/\\sqrt{6} & -1/\\sqrt{2} \\\\ 1/\\sqrt{3} & -2/\\sqrt{6} & 0 \\\\ 1/\\sqrt{3} & 1/\\sqrt{6} & 1/\\sqrt{2} \\end{bmatrix}, \\qquad R = \\begin{bmatrix} \\sqrt{3} & 2/\\sqrt{3} & 2/\\sqrt{3} \\\\ 0 & \\sqrt{6}/3 & -1/\\sqrt{6} \\\\ 0 & 0 & 1/\\sqrt{2} \\end{bmatrix}.$$\n\n**Verification.** $Q^\\top Q = I$ (the three columns are pairwise orthogonal unit vectors — e.g. $\\langle q_1, q_3\\rangle = \\frac{1}{\\sqrt{3}\\sqrt{2}}(-1+0+1)=0$). Reconstructing the columns of $A$ confirms the factorization: column 1 is $r_{11}q_1 = \\sqrt{3}\\cdot\\frac{1}{\\sqrt3}(1,1,1) = (1,1,1)^\\top$; column 2 is $r_{12}q_1 + r_{22}q_2 = \\frac{2}{3}(1,1,1) + \\frac{1}{3}(1,-2,1) = (1,0,1)^\\top$; column 3 is $r_{13}q_1 + r_{23}q_2 + r_{33}q_3 = \\frac{2}{3}(1,1,1) - \\frac{1}{6}(1,-2,1) + \\frac{1}{2}(-1,0,1) = (0,1,1)^\\top$. All match $A$, so $A = QR$."
            }
          ]
        },
        {
          "id": "la-projection-least-squares",
          "title": "Projections and Least Squares Regression",
          "minutes": 18,
          "content": "<h3>From \"Solve Ax = b\" to \"Get as Close as Possible\"</h3>\n<p>Most linear systems you meet in the wild have <strong>no exact solution</strong>. You have a tall, skinny matrix $A \\in \\mathbb{R}^{m \\times n}$ with $m > n$ — more equations than unknowns. You measured $m$ data points but you only have $n$ parameters to fit them. Demanding $Ax = b$ exactly is asking $m$ constraints to be satisfied by a vector living in an $n$-dimensional world. Generically, $b$ simply does not lie in the column space of $A$, and the system is <em>inconsistent</em>.</p>\n<p>The least-squares idea is a profound shift in goal. Instead of insisting on equality, we ask: <strong>which vector in the column space of $A$ is closest to $b$?</strong> \"Closest\" means smallest Euclidean distance, i.e. we minimize $\\lVert b - Ax \\rVert^2$. The machinery that answers this — orthogonal projection — is one of the most reused ideas in all of applied mathematics. It is literally what happens under the hood when you call a linear-regression fit.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Linear regression, the <code>X.T @ X</code> in countless ML pipelines, the normal equations, PCA's reconstruction error, and even the projection step in Kalman filters are all the <em>same</em> geometric act: drop a perpendicular from a point onto a subspace. Master projection once and you understand all of them.</p></div>\n\n<h3>The Geometry of Orthogonal Projection</h3>\n<h4>Projection onto a line</h4>\n<p>Start with the simplest case. Given a nonzero vector $a$, we want the point on the line $\\{ t\\,a : t \\in \\mathbb{R}\\}$ closest to a target $b$. Call it $p = \\hat{x}\\, a$. The defining property is that the <strong>error</strong> $e = b - p$ is orthogonal to the line:</p>\n$$a^{\\top}(b - \\hat{x}\\,a) = 0 \\quad\\Longrightarrow\\quad \\hat{x} = \\frac{a^{\\top} b}{a^{\\top} a}.$$\n<p>So the projection is</p>\n$$p = a\\,\\hat{x} = \\frac{a\\,a^{\\top}}{a^{\\top} a}\\, b = P\\,b, \\qquad P = \\frac{a\\,a^{\\top}}{a^{\\top} a}.$$\n<p>Notice $P$ is an $m \\times m$ matrix (an outer product $a a^{\\top}$ divided by a scalar), and it acts on <em>any</em> $b$ to return its shadow on the line. This $P$ is the prototype <strong>projection matrix</strong>.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The orthogonality condition $a^\\top e = 0$ is not an arbitrary trick — it <em>is</em> the optimality condition. Among all points on the line, the closest one is exactly where the residual makes a right angle with the line. Any other choice has a longer hypotenuse (Pythagoras). \"Closest\" and \"perpendicular error\" are the same statement.</p></div>\n\n<h4>Projection onto a subspace</h4>\n<p>Now let the target subspace be the <strong>column space</strong> $\\mathcal{C}(A)$ of a full-column-rank matrix $A \\in \\mathbb{R}^{m\\times n}$ (columns linearly independent, so $\\text{rank}(A) = n$). Any point in $\\mathcal{C}(A)$ is $A x$ for some coefficient vector $x \\in \\mathbb{R}^n$. We want $p = A\\hat{x}$ minimizing $\\lVert b - A\\hat{x}\\rVert$.</p>\n<p>The error $e = b - A\\hat{x}$ must be orthogonal to the <em>entire</em> subspace — equivalently, orthogonal to each column of $A$. Stacking those $n$ conditions:</p>\n$$A^{\\top}(b - A\\hat{x}) = 0.$$\n<p>Rearranging gives the celebrated <strong>normal equations</strong>:</p>\n$$\\boxed{\\,A^{\\top} A\\,\\hat{x} = A^{\\top} b\\,}$$\n<p>When $A$ has independent columns, $A^{\\top}A$ is symmetric positive definite, hence invertible, and</p>\n$$\\hat{x} = (A^{\\top}A)^{-1} A^{\\top} b, \\qquad p = A\\hat{x} = \\underbrace{A(A^{\\top}A)^{-1}A^{\\top}}_{P}\\, b.$$\n<p>The matrix $P = A(A^{\\top}A)^{-1}A^{\\top}$ is the orthogonal projector onto $\\mathcal{C}(A)$. (If $A$ is just a single column $a$, this collapses exactly to $a a^\\top / a^\\top a$ from before — good consistency check.)</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>In linear regression, $A$ is your <strong>design matrix</strong> (rows = examples, columns = features), $b$ is the target vector, and $\\hat{x}$ is the learned weight vector. The normal-equation solution $\\hat{x} = (A^\\top A)^{-1}A^\\top b$ is the exact closed-form ordinary-least-squares estimator. Gradient descent on the MSE loss converges to this same point — the normal equations are just $\\nabla_x \\lVert b - Ax\\rVert^2 = 0$.</p></div>\n\n<h3>Properties of the Projection Matrix</h3>\n<p>A matrix $P$ is an <strong>orthogonal projector</strong> if and only if it is both <em>idempotent</em> and <em>symmetric</em>:</p>\n<ul>\n<li><strong>Idempotent:</strong> $P^2 = P$. Projecting an already-projected vector changes nothing — the shadow of a shadow is itself.</li>\n<li><strong>Symmetric:</strong> $P^{\\top} = P$. This is what makes the projection <em>orthogonal</em> (as opposed to an oblique projection along some skew direction).</li>\n</ul>\n<p>Quick verification for $P = A(A^{\\top}A)^{-1}A^{\\top}$:</p>\n<pre><code>P^T = (A (A^T A)^{-1} A^T)^T\n    = A ((A^T A)^{-1})^T A^T\n    = A (A^T A)^{-1} A^T = P        (since A^T A is symmetric)\n\nP^2 = A (A^T A)^{-1} A^T  A (A^T A)^{-1} A^T\n    = A (A^T A)^{-1} (A^T A) (A^T A)^{-1} A^T\n    = A (A^T A)^{-1} A^T = P        (middle (A^T A)(A^T A)^{-1} = I)</code></pre>\n<p>A few more facts worth internalizing:</p>\n<ul>\n<li>The eigenvalues of any projector are only $0$ and $1$. The 1-eigenspace is the subspace you project onto; the 0-eigenspace is its orthogonal complement.</li>\n<li><strong>$I - P$ projects onto the orthogonal complement</strong> $\\mathcal{C}(A)^{\\perp}$, which equals the left null space $\\mathcal{N}(A^{\\top})$. The residual is $e = b - p = (I-P)b$, and indeed $A^\\top e = 0$.</li>\n<li>$P$ and $I-P$ split every vector uniquely: $b = Pb + (I-P)b$, the in-subspace part plus the perpendicular part, and these two pieces are orthogonal.</li>\n<li>$\\text{trace}(P) = \\text{rank}(P) = n$ (the dimension of the subspace). In regression, $\\text{trace}(P)$ is the \"effective degrees of freedom\" of the model — the projector is called the <strong>hat matrix</strong> $H$ because it puts the hat on $b$: $\\hat{b} = Hb$.</li>\n</ul>\n\n<h3>Worked Example: Fitting a Line to Data</h3>\n<p>Suppose we have three data points $(t, y)$: $(0, 1)$, $(1, 2)$, $(2, 2)$, and we want the best-fit line $y = c + d\\,t$. There is no line through all three (they're not collinear), so we least-squares it.</p>\n<p>Write the model as $A x = b$ where $x = \\begin{bmatrix} c \\\\ d \\end{bmatrix}$:</p>\n$$A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}, \\qquad b = \\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}.$$\n<p>The first column of $A$ (all ones) is the intercept; the second column holds the $t$-values. Now form the normal-equation pieces:</p>\n$$A^{\\top}A = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}, \\qquad A^{\\top}b = \\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix}.$$\n<p>(Check: $A^\\top A$ top-left is $1+1+1=3$; off-diagonal is $0+1+2=3$; bottom-right is $0+1+4=5$. And $A^\\top b$ is $[1+2+2,\\; 0+2+4] = [5,6]$.)</p>\n<p>Solve $\\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}\\begin{bmatrix} c \\\\ d \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix}$. The determinant is $3\\cdot5 - 3\\cdot3 = 6$, so</p>\n$$\\begin{bmatrix} c \\\\ d \\end{bmatrix} = \\frac{1}{6}\\begin{bmatrix} 5 & -3 \\\\ -3 & 3 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix} = \\frac{1}{6}\\begin{bmatrix} 25 - 18 \\\\ -15 + 18 \\end{bmatrix} = \\frac{1}{6}\\begin{bmatrix} 7 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 7/6 \\\\ 1/2 \\end{bmatrix}.$$\n<p>So the best-fit line is $y = \\tfrac{7}{6} + \\tfrac{1}{2}t$. The fitted values (projection $p = A\\hat{x}$) are</p>\n$$p = \\begin{bmatrix} 7/6 \\\\ 7/6 + 1/2 \\\\ 7/6 + 1 \\end{bmatrix} = \\begin{bmatrix} 7/6 \\\\ 10/6 \\\\ 13/6 \\end{bmatrix}, \\qquad e = b - p = \\begin{bmatrix} 1 - 7/6 \\\\ 2 - 10/6 \\\\ 2 - 13/6 \\end{bmatrix} = \\begin{bmatrix} -1/6 \\\\ \\;\\,2/6 \\\\ -1/6 \\end{bmatrix}.$$\n<p><strong>Sanity check the orthogonality.</strong> The residual must be perpendicular to both columns of $A$:</p>\n<ul>\n<li>Against the ones column: $-\\tfrac16 + \\tfrac26 - \\tfrac16 = 0$. ✓ (residuals sum to zero — the fitted line \"balances\" the data)</li>\n<li>Against the $t$ column: $0\\cdot(-\\tfrac16) + 1\\cdot\\tfrac26 + 2\\cdot(-\\tfrac16) = \\tfrac26 - \\tfrac26 = 0$. ✓</li>\n</ul>\n<p>Those two checks are $A^\\top e = 0$ in disguise — the normal equations holding exactly. The fitting-a-plane case is identical in spirit: to fit $z = c_0 + c_1 x + c_2 y$, just add a third column for the $y$-values, and $A^\\top A$ becomes $3\\times 3$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>That \"residuals sum to zero\" fact is not a coincidence — it holds whenever your model includes an intercept (a column of ones). It guarantees that the model's average prediction equals the average target on the training set (the mean residual is exactly zero). Drop the intercept and you lose this guarantee.</p></div>\n\n<h3>Why Not Just Invert? Conditioning and QR</h3>\n<p>The closed form $\\hat{x} = (A^{\\top}A)^{-1}A^{\\top}b$ is beautiful for theory but <strong>numerically dangerous</strong>. Forming $A^{\\top}A$ squares the condition number of $A$: $\\kappa(A^{\\top}A) = \\kappa(A)^2$. If $A$ is even mildly ill-conditioned (correlated features), you lose roughly twice as many digits of accuracy as necessary, and the matrix can become numerically singular.</p>\n<p>Production solvers therefore avoid the normal equations and instead use the <strong>QR factorization</strong> $A = QR$ (with $Q$ orthonormal columns, $R$ upper triangular). Then $A^\\top A = R^\\top Q^\\top Q R = R^\\top R$, the normal equations reduce to $R\\hat{x} = Q^\\top b$, solved by simple back-substitution with no squaring. This is what <code>numpy.linalg.lstsq</code> and <code>scipy</code> do internally (via QR or SVD).</p>\n<pre><code># What linear regression really computes:\nimport numpy as np\nA = np.array([[1,0],[1,1],[1,2]], dtype=float)\nb = np.array([1,2,2], dtype=float)\n\nx_hat, *_ = np.linalg.lstsq(A, b, rcond=None)   # preferred: QR/SVD\n# x_hat -> [1.1666..., 0.5]  == [7/6, 1/2]\n\n# The \"textbook\" (don't ship this) version:\nx_hat2 = np.linalg.solve(A.T @ A, A.T @ b)       # normal equations</code></pre>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>When $A$ does <em>not</em> have full column rank (collinear features, $m < n$, etc.), $A^\\top A$ is singular and there are infinitely many least-squares solutions. The clean fix is the <strong>Moore–Penrose pseudoinverse</strong> $A^{+}$, which selects the minimum-norm solution $\\hat{x} = A^{+}b$. This is exactly the regime that motivates <strong>ridge regression</strong>: adding $\\lambda I$ gives $\\hat{x} = (A^\\top A + \\lambda I)^{-1}A^\\top b$, which is always invertible and stabilizes the projection. So regularization is, geometrically, a controlled tilt of the projection to tame ill-conditioning.</p></div>\n\n<h3>Recap</h3>\n<ul>\n<li>Inconsistent $Ax=b$ is solved in the <em>least-squares</em> sense by projecting $b$ onto $\\mathcal{C}(A)$.</li>\n<li>Optimality $\\Leftrightarrow$ the residual $e=b-A\\hat{x}$ is orthogonal to $\\mathcal{C}(A)$, giving the <strong>normal equations</strong> $A^\\top A\\,\\hat{x} = A^\\top b$.</li>\n<li>The orthogonal projector is $P = A(A^\\top A)^{-1}A^\\top$, satisfying $P^2=P$ and $P^\\top=P$; $I-P$ projects onto the complement.</li>\n<li>Curve fitting (lines, planes, polynomials) is least squares with cleverly chosen columns of $A$.</li>\n<li>In practice, use QR/SVD (not explicit inversion) for stability; regularize when features are collinear.</li>\n</ul>",
          "mcq": [
            {
              "q": "You want to solve an overdetermined, inconsistent system $Ax=b$ ($A$ has full column rank). Which equation gives the least-squares solution $\\hat{x}$?",
              "choices": [
                "$A\\hat{x} = b$",
                "$A^{\\top}A\\,\\hat{x} = A^{\\top}b$",
                "$AA^{\\top}\\hat{x} = b$",
                "$A^{\\top}\\hat{x} = A^{\\top}b$"
              ],
              "answer": 1,
              "explain": "The normal equations $A^\\top A\\,\\hat{x}=A^\\top b$ come from requiring the residual $b-A\\hat{x}$ to be orthogonal to every column of $A$, i.e. $A^\\top(b-A\\hat{x})=0$."
            },
            {
              "q": "Which pair of properties characterizes an orthogonal projection matrix $P$?",
              "choices": [
                "Invertible and symmetric",
                "Idempotent ($P^2=P$) and symmetric ($P^{\\top}=P$)",
                "Orthogonal ($P^{\\top}P=I$) and idempotent",
                "Symmetric and trace equal to its number of rows"
              ],
              "answer": 1,
              "explain": "Orthogonal projectors are exactly the symmetric idempotent matrices. They are NOT orthogonal matrices (those preserve length); a projector with rank < m has eigenvalue 0 and is singular."
            },
            {
              "q": "In the best-fit line example, the residual vector $e = b - A\\hat{x}$ satisfies which condition?",
              "choices": [
                "$e = 0$",
                "$A^{\\top}e = 0$ (e is orthogonal to the column space of A)",
                "$Ae = 0$ (e is in the null space of A)",
                "$\\lVert e \\rVert = \\lVert b \\rVert$"
              ],
              "answer": 1,
              "explain": "Optimality means the error is perpendicular to the column space, which is precisely $A^\\top e = 0$ — equivalently, $e$ lies in the left null space $\\mathcal{N}(A^\\top)$."
            },
            {
              "q": "Why do numerical libraries solve least squares with QR or SVD instead of forming $A^{\\top}A$ and inverting it?",
              "choices": [
                "QR is the only method that handles non-square matrices",
                "Forming $A^{\\top}A$ squares the condition number, $\\kappa(A^\\top A)=\\kappa(A)^2$, amplifying round-off error",
                "The normal equations give the wrong answer mathematically",
                "Inversion cannot be computed for symmetric matrices"
              ],
              "answer": 1,
              "explain": "The normal equations are mathematically correct but numerically worse: squaring the condition number roughly doubles the digits of accuracy lost, so QR ($R\\hat{x}=Q^\\top b$) is preferred."
            },
            {
              "q": "For an orthogonal projector $P$ onto $\\mathcal{C}(A)$, what does the matrix $I - P$ do?",
              "choices": [
                "It inverts the projection, recovering the original $b$ from $Pb$",
                "It projects onto the orthogonal complement $\\mathcal{C}(A)^{\\perp}$, producing the residual $e = (I-P)b$",
                "It projects onto $\\mathcal{C}(A)$ a second time, doubling the shadow",
                "It rotates $b$ by 90 degrees within the column space"
              ],
              "answer": 1,
              "explain": "$I-P$ is itself a projector (symmetric and idempotent) onto the orthogonal complement, the left null space $\\mathcal{N}(A^{\\top})$, and $(I-P)b$ is exactly the residual $e$."
            },
            {
              "q": "An orthogonal projector $P$ projects onto an $n$-dimensional subspace of $\\mathbb{R}^m$. What are its eigenvalues and what is $\\text{trace}(P)$?",
              "choices": [
                "Eigenvalues are all $1$; $\\text{trace}(P) = m$",
                "Eigenvalues are $0$ and $1$; $\\text{trace}(P) = n$",
                "Eigenvalues are $\\pm 1$; $\\text{trace}(P) = 0$",
                "Eigenvalues are $0$ and $1$; $\\text{trace}(P) = m - n$"
              ],
              "answer": 1,
              "explain": "A projector has only eigenvalues $0$ (on the complement) and $1$ (on the subspace), and $\\text{trace}(P) = \\text{rank}(P) = n$, the dimension projected onto (the 'effective degrees of freedom' of the hat matrix)."
            },
            {
              "q": "In the worked best-fit-line example, the residual vector came out to $e = [-1/6,\\ 2/6,\\ -1/6]^{\\top}$, whose entries sum to zero. Which design choice guarantees this 'residuals sum to zero' property?",
              "choices": [
                "Including a column of ones (an intercept) in $A$, which forces $\\mathbf{1}^{\\top} e = 0$",
                "Having exactly three data points, one more than the number of parameters",
                "Using QR factorization instead of the normal equations to solve",
                "The data points being equally spaced in $t$"
              ],
              "answer": 0,
              "explain": "Orthogonality $A^{\\top}e=0$ applied to the all-ones intercept column gives $\\mathbf{1}^{\\top}e=0$, so the residuals sum to zero whenever the model includes an intercept; drop it and the guarantee is lost."
            },
            {
              "q": "Suppose the features of $A$ are collinear, so $A$ lacks full column rank and $A^{\\top}A$ is singular. Which statement is correct?",
              "choices": [
                "The least-squares problem has a unique solution given by $(A^{\\top}A)^{-1}A^{\\top}b$ as usual",
                "There is no vector in $\\mathcal{C}(A)$ closest to $b$, so least squares is undefined",
                "There are infinitely many least-squares solutions; the pseudoinverse picks the minimum-norm one, and ridge regression's $(A^{\\top}A + \\lambda I)^{-1}$ restores invertibility",
                "The projection $p = Pb$ no longer exists because $P$ requires $A^{\\top}A$ to be invertible"
              ],
              "answer": 2,
              "explain": "Rank deficiency makes $A^{\\top}A$ singular and the solution non-unique; the Moore-Penrose pseudoinverse selects the minimum-norm $\\hat{x}$, while adding $\\lambda I$ (ridge) makes the system invertible again. The projection $p=Pb$ itself still exists and is unique."
            }
          ],
          "flashcards": [
            {
              "front": "What are the normal equations for least-squares $Ax=b$, and where do they come from?",
              "back": "$A^{\\top}A\\,\\hat{x} = A^{\\top}b$. They come from forcing the residual $e=b-A\\hat{x}$ to be orthogonal to the column space: $A^{\\top}(b-A\\hat{x})=0$."
            },
            {
              "front": "Formula for the orthogonal projection matrix onto the column space of $A$ (full column rank)?",
              "back": "$P = A(A^{\\top}A)^{-1}A^{\\top}$. It satisfies $P^2=P$ and $P^{\\top}=P$, and $\\hat{b}=Pb$ is the closest point in $\\mathcal{C}(A)$ to $b$."
            },
            {
              "front": "Two defining algebraic properties of an orthogonal projector?",
              "back": "Idempotent ($P^2=P$) and symmetric ($P^{\\top}=P$). Its eigenvalues are only 0 and 1."
            },
            {
              "front": "What does $I-P$ do, and what is the residual in terms of it?",
              "back": "$I-P$ projects onto the orthogonal complement $\\mathcal{C}(A)^{\\perp}=\\mathcal{N}(A^{\\top})$. The residual is $e=(I-P)b$, and $b = Pb + (I-P)b$ splits $b$ into orthogonal in-subspace and perpendicular parts."
            },
            {
              "front": "How is fitting a line $y=c+dt$ to data set up as a matrix least-squares problem?",
              "back": "$A$ has a column of ones (intercept) and a column of the $t$-values; $x=[c,d]^{\\top}$; $b$ is the $y$-values. Solve $A^{\\top}A\\,x = A^{\\top}b$. For a plane, add a column of the second predictor."
            },
            {
              "front": "Why prefer QR/SVD over the normal equations numerically, and how does ridge regression relate?",
              "back": "Forming $A^{\\top}A$ squares the condition number ($\\kappa^2$), losing accuracy. QR solves $R\\hat{x}=Q^{\\top}b$ stably. Ridge adds $\\lambda I$: $\\hat{x}=(A^{\\top}A+\\lambda I)^{-1}A^{\\top}b$, always invertible, stabilizing collinear/rank-deficient cases."
            }
          ],
          "homework": [
            {
              "prompt": "Project the vector $b=\\begin{bmatrix}1\\\\1\\\\1\\end{bmatrix}$ onto the line spanned by $a=\\begin{bmatrix}1\\\\2\\\\2\\end{bmatrix}$. Find the scalar $\\hat{x}$, the projection $p$, the residual $e$, and verify $a^{\\top}e=0$.",
              "hint": "Use $\\hat{x}=\\dfrac{a^{\\top}b}{a^{\\top}a}$, then $p=\\hat{x}\\,a$ and $e=b-p$.",
              "solution": "$a^{\\top}b = 1+2+2 = 5$ and $a^{\\top}a = 1+4+4 = 9$, so $\\hat{x}=5/9$. Then $p=\\frac{5}{9}\\begin{bmatrix}1\\\\2\\\\2\\end{bmatrix}=\\begin{bmatrix}5/9\\\\10/9\\\\10/9\\end{bmatrix}$. The residual is $e=b-p=\\begin{bmatrix}1-5/9\\\\1-10/9\\\\1-10/9\\end{bmatrix}=\\begin{bmatrix}4/9\\\\-1/9\\\\-1/9\\end{bmatrix}$. Check: $a^{\\top}e = 1\\cdot\\frac{4}{9}+2\\cdot(-\\frac{1}{9})+2\\cdot(-\\frac{1}{9}) = \\frac{4}{9}-\\frac{2}{9}-\\frac{2}{9}=0$. ✓"
            },
            {
              "prompt": "Fit the best least-squares line $y=c+dt$ to the data points $(1,1)$, $(2,2)$, $(3,2)$. Give $c$, $d$, and the fitted values.",
              "hint": "Build $A$ with a ones column and a $t$ column; form $A^{\\top}A$ and $A^{\\top}b$, then solve the 2x2 system.",
              "solution": "$A=\\begin{bmatrix}1&1\\\\1&2\\\\1&3\\end{bmatrix}$, $b=\\begin{bmatrix}1\\\\2\\\\2\\end{bmatrix}$. Then $A^{\\top}A=\\begin{bmatrix}3&6\\\\6&14\\end{bmatrix}$ and $A^{\\top}b=\\begin{bmatrix}5\\\\11\\end{bmatrix}$ (since $1+2+2=5$, $1\\cdot1+2\\cdot2+3\\cdot2=11$). Determinant $=3\\cdot14-36=6$. So $\\begin{bmatrix}c\\\\d\\end{bmatrix}=\\frac{1}{6}\\begin{bmatrix}14&-6\\\\-6&3\\end{bmatrix}\\begin{bmatrix}5\\\\11\\end{bmatrix}=\\frac{1}{6}\\begin{bmatrix}70-66\\\\-30+33\\end{bmatrix}=\\frac{1}{6}\\begin{bmatrix}4\\\\3\\end{bmatrix}=\\begin{bmatrix}2/3\\\\1/2\\end{bmatrix}$. Line: $y=\\frac{2}{3}+\\frac{1}{2}t$. Fitted values: $t=1\\!:\\!7/6$, $t=2\\!:\\!5/3$, $t=3\\!:\\!13/6$. (Residuals $-1/6,1/3,-1/6$ sum to 0, confirming optimality.)"
            },
            {
              "prompt": "Let $P=A(A^{\\top}A)^{-1}A^{\\top}$ be the projector onto $\\mathcal{C}(A)$. Prove that $I-P$ is also a projection matrix, and identify the subspace it projects onto.",
              "hint": "Show $(I-P)^2=I-P$ and $(I-P)^{\\top}=I-P$. Use $P^2=P$ and $P^{\\top}=P$.",
              "solution": "Symmetry: $(I-P)^{\\top}=I^{\\top}-P^{\\top}=I-P$ since $P$ is symmetric. Idempotent: $(I-P)^2=I-2P+P^2=I-2P+P=I-P$ (using $P^2=P$). Hence $I-P$ is symmetric and idempotent, so it is an orthogonal projector. It projects onto the orthogonal complement of $\\mathcal{C}(A)$, namely the left null space $\\mathcal{N}(A^{\\top})$: for any $b$, $(I-P)b$ is the residual $e$, and $A^{\\top}e=A^{\\top}(I-P)b=(A^{\\top}-A^{\\top})b=0$ because $A^{\\top}P=A^{\\top}A(A^{\\top}A)^{-1}A^{\\top}=A^{\\top}$. So $e\\in\\mathcal{N}(A^{\\top})=\\mathcal{C}(A)^{\\perp}$."
            }
          ],
          "examples": [
            {
              "title": "Projecting a Vector onto a Line",
              "body": "Let $a = \\begin{bmatrix} 2 \\\\ 1 \\\\ 2 \\end{bmatrix}$ and $b = \\begin{bmatrix} 4 \\\\ 5 \\\\ 1 \\end{bmatrix}$. Find the scalar $\\hat{x}$ and the point $p = \\hat{x}\\,a$ on the line $\\{t\\,a : t \\in \\mathbb{R}\\}$ that is closest to $b$. Then verify that the error $e = b - p$ is orthogonal to $a$.",
              "solution": "**Step 1 — Set up the closeness condition.** The closest point on the line is $p = \\hat{x}\\,a$, where the error $e = b - p$ must be perpendicular to the line, i.e. $a^{\\top}(b - \\hat{x}\\,a) = 0$. Solving gives the formula\n$$\\hat{x} = \\frac{a^{\\top} b}{a^{\\top} a}.$$\n\n**Step 2 — Compute the two inner products.**\n$$a^{\\top} b = (2)(4) + (1)(5) + (2)(1) = 8 + 5 + 2 = 15,$$\n$$a^{\\top} a = (2)^2 + (1)^2 + (2)^2 = 4 + 1 + 4 = 9.$$\n\n**Step 3 — Form the scalar.**\n$$\\hat{x} = \\frac{15}{9} = \\frac{5}{3}.$$\n\n**Step 4 — Build the projection $p = \\hat{x}\\,a$.**\n$$p = \\frac{5}{3}\\begin{bmatrix} 2 \\\\ 1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 10/3 \\\\ 5/3 \\\\ 10/3 \\end{bmatrix}.$$\n\n**Step 5 — Compute the error $e = b - p$.**\n$$e = \\begin{bmatrix} 4 \\\\ 5 \\\\ 1 \\end{bmatrix} - \\begin{bmatrix} 10/3 \\\\ 5/3 \\\\ 10/3 \\end{bmatrix} = \\begin{bmatrix} 12/3 - 10/3 \\\\ 15/3 - 5/3 \\\\ 3/3 - 10/3 \\end{bmatrix} = \\begin{bmatrix} 2/3 \\\\ 10/3 \\\\ -7/3 \\end{bmatrix}.$$\n\n**Step 6 — Verify orthogonality (the key check).**\n$$a^{\\top} e = (2)\\!\\left(\\tfrac{2}{3}\\right) + (1)\\!\\left(\\tfrac{10}{3}\\right) + (2)\\!\\left(-\\tfrac{7}{3}\\right) = \\frac{4}{3} + \\frac{10}{3} - \\frac{14}{3} = \\frac{0}{3} = 0. \\;\\checkmark$$\nThe error is perpendicular to $a$, confirming $p$ is genuinely the closest point on the line.\n\n**Answer:** $\\hat{x} = \\dfrac{5}{3}$ and $p = \\left(\\dfrac{10}{3},\\, \\dfrac{5}{3},\\, \\dfrac{10}{3}\\right)$, with the minimum squared distance $\\lVert e \\rVert^2 = \\left(\\tfrac{2}{3}\\right)^2 + \\left(\\tfrac{10}{3}\\right)^2 + \\left(-\\tfrac{7}{3}\\right)^2 = \\dfrac{4 + 100 + 49}{9} = \\dfrac{153}{9} = 17.$"
            },
            {
              "title": "Fitting a Best-Fit Line by Least Squares",
              "body": "Find the straight line $y = C + D\\,t$ that best fits (in the least-squares sense) the four data points\n$$(t,\\,y) = (0,\\,1),\\ (1,\\,2),\\ (2,\\,2),\\ (3,\\,4).$$\nSet up the overdetermined system $Ax = b$, solve the normal equations $A^{\\top}A\\,\\hat{x} = A^{\\top}b$, and verify that the residual is orthogonal to the columns of $A$.",
              "solution": "**Step 1 — Build the overdetermined system.** Each point demands $C + D\\,t_i = y_i$. With unknown vector $x = \\begin{bmatrix} C \\\\ D \\end{bmatrix}$, the four equations form $Ax = b$ where each row is $[\\,1 \\quad t_i\\,]$:\n$$A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}, \\qquad b = \\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\\\ 4 \\end{bmatrix}.$$\nFour equations, two unknowns — generically inconsistent, so we minimize $\\lVert b - Ax \\rVert^2$ instead.\n\n**Step 2 — Form $A^{\\top}A$.**\n$$A^{\\top}A = \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 0 & 1 & 2 & 3 \\end{bmatrix} \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & 6 \\\\ 6 & 14 \\end{bmatrix}.$$\nHere the top-left entry is $\\sum 1 = 4$, the off-diagonal is $\\sum t_i = 0+1+2+3 = 6$, and the bottom-right is $\\sum t_i^2 = 0+1+4+9 = 14$.\n\n**Step 3 — Form $A^{\\top}b$.**\n$$A^{\\top}b = \\begin{bmatrix} \\sum y_i \\\\ \\sum t_i y_i \\end{bmatrix} = \\begin{bmatrix} 1+2+2+4 \\\\ (0)(1)+(1)(2)+(2)(2)+(3)(4) \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ 18 \\end{bmatrix}.$$\n\n**Step 4 — Solve the normal equations $A^{\\top}A\\,\\hat{x} = A^{\\top}b$.**\n$$\\begin{bmatrix} 4 & 6 \\\\ 6 & 14 \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ 18 \\end{bmatrix}.$$\nInvert the $2\\times 2$ matrix. Its determinant is $\\det = (4)(14) - (6)(6) = 56 - 36 = 20$, so\n$$\\begin{bmatrix} 4 & 6 \\\\ 6 & 14 \\end{bmatrix}^{-1} = \\frac{1}{20}\\begin{bmatrix} 14 & -6 \\\\ -6 & 4 \\end{bmatrix}.$$\nTherefore\n$$\\begin{bmatrix} C \\\\ D \\end{bmatrix} = \\frac{1}{20}\\begin{bmatrix} 14 & -6 \\\\ -6 & 4 \\end{bmatrix}\\begin{bmatrix} 9 \\\\ 18 \\end{bmatrix} = \\frac{1}{20}\\begin{bmatrix} (14)(9) - (6)(18) \\\\ (-6)(9) + (4)(18) \\end{bmatrix} = \\frac{1}{20}\\begin{bmatrix} 126 - 108 \\\\ -54 + 72 \\end{bmatrix} = \\frac{1}{20}\\begin{bmatrix} 18 \\\\ 18 \\end{bmatrix} = \\begin{bmatrix} 9/10 \\\\ 9/10 \\end{bmatrix}.$$\n\n**Step 5 — State the best-fit line.**\n$$\\boxed{\\,y = \\frac{9}{10} + \\frac{9}{10}\\,t = 0.9 + 0.9\\,t.\\,}$$\n\n**Step 6 — Compute the fitted values and residuals.** The projection $p = A\\hat{x}$ holds the on-line predictions:\n$$p = \\begin{bmatrix} 0.9 + 0.9(0) \\\\ 0.9 + 0.9(1) \\\\ 0.9 + 0.9(2) \\\\ 0.9 + 0.9(3) \\end{bmatrix} = \\begin{bmatrix} 0.9 \\\\ 1.8 \\\\ 2.7 \\\\ 3.6 \\end{bmatrix}, \\qquad e = b - p = \\begin{bmatrix} 0.1 \\\\ 0.2 \\\\ -0.7 \\\\ 0.4 \\end{bmatrix}.$$\n\n**Step 7 — Verify orthogonality $A^{\\top}e = 0$ (the defining property of the least-squares solution).**\n$$\\sum e_i = 0.1 + 0.2 - 0.7 + 0.4 = 0, \\qquad \\sum t_i e_i = (0)(0.1)+(1)(0.2)+(2)(-0.7)+(3)(0.4) = 0.2 - 1.4 + 1.2 = 0.$$\nBoth components vanish, so $A^{\\top}e = 0$: the residual is perpendicular to the column space of $A$, exactly as the geometry demands. The minimum sum of squared errors is $\\lVert e\\rVert^2 = (0.1)^2 + (0.2)^2 + (-0.7)^2 + (0.4)^2 = 0.01 + 0.04 + 0.49 + 0.16 = 0.7.$"
            }
          ]
        }
      ]
    },
    {
      "id": "la-svd-applications",
      "title": "SVD and Applications to Machine Learning",
      "lessons": [
        {
          "id": "la-svd",
          "title": "The Singular Value Decomposition",
          "minutes": 20,
          "content": "<h3>The decomposition every matrix has</h3>\n<p>Eigen-decomposition is a beautiful tool, but it has a frustrating limitation: it only applies cleanly to square matrices, and even then only to certain ones. Your data matrices — $1000$ users by $50$ features, $784$ pixels by $60000$ images — are almost never square, and even square matrices may not be diagonalizable. We need a factorization that works for <em>any</em> matrix. That factorization is the <strong>Singular Value Decomposition (SVD)</strong>, and it is arguably the single most useful matrix factorization in all of applied mathematics and machine learning.</p>\n\n<p>The central claim is short enough to memorize:</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>Every real $m \\times n$ matrix $A$ can be written as $$A = U \\Sigma V^{\\mathsf{T}}$$ where $U$ is an $m \\times m$ orthogonal matrix, $V$ is an $n \\times n$ orthogonal matrix, and $\\Sigma$ is an $m \\times n$ \"diagonal\" matrix with non-negative entries $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0$ on its diagonal. No assumptions on $A$ are required.</p></div>\n\n<p>The numbers $\\sigma_i$ are the <strong>singular values</strong>. The columns of $U$ are the <strong>left singular vectors</strong>; the columns of $V$ are the <strong>right singular vectors</strong>. Orthogonal means $U^{\\mathsf{T}}U = I$ and $V^{\\mathsf{T}}V = I$ — the columns form an orthonormal basis. That orthogonality is the source of nearly all of the SVD's power.</p>\n\n<h3>Reading the equation as a sentence</h3>\n<p>The most illuminating way to absorb $A = U\\Sigma V^{\\mathsf{T}}$ is to multiply both sides on the right by $V$. Since $V^{\\mathsf{T}}V = I$, we get $AV = U\\Sigma$. Writing this column by column gives the relation that <em>defines</em> singular vectors:</p>\n\n$$A v_i = \\sigma_i u_i.$$\n\n<p>Read it aloud: \"$A$ takes the orthonormal input direction $v_i$ and maps it to the orthonormal output direction $u_i$, stretched by the factor $\\sigma_i$.\" This is the whole idea. A general linear map mangles space — it shears, rotates, and stretches in a tangled way. The SVD says there is always a special orthonormal set of input directions (the $v_i$) that $A$ maps to a special orthonormal set of output directions (the $u_i$), with each direction simply scaled. The mess is gone; all that remains is independent scaling along orthogonal axes.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Eigenvectors answer \"which directions does $A$ leave pointing the same way?\" — they live in <em>one</em> space, and $Av = \\lambda v$ keeps input and output aligned. Singular vectors answer the more general question \"which orthonormal input directions become orthonormal output directions?\" — and they live in <em>two</em> spaces ($v_i$ in input space $\\mathbb{R}^n$, $u_i$ in output space $\\mathbb{R}^m$), connected by $Av_i = \\sigma_i u_i$. This is exactly why SVD survives when eigen-decomposition fails: it never needs input and output to be the same space.</p></div>\n\n<h3>The geometric picture: rotate, stretch, rotate</h3>\n<p>Because $U$ and $V$ are orthogonal, they are <strong>rigid motions</strong> — rotations (possibly with a reflection). They preserve lengths and angles. The only matrix in the product that distorts shape is the diagonal $\\Sigma$, which stretches along the coordinate axes. So applying $A = U\\Sigma V^{\\mathsf{T}}$ to a vector decomposes into three clean steps, read right to left:</p>\n<ol>\n<li><strong>$V^{\\mathsf{T}}$ — rotate.</strong> Align the special input directions $v_i$ with the coordinate axes.</li>\n<li><strong>$\\Sigma$ — stretch.</strong> Scale axis $i$ by $\\sigma_i$ (and project onto the right number of dimensions).</li>\n<li><strong>$U$ — rotate.</strong> Move the stretched axes into their final output directions $u_i$.</li>\n</ol>\n<p>The classic visual: feed the unit circle (or sphere) into $A$. A linear map always sends it to an ellipse (or ellipsoid). The SVD reads that ellipse off directly — the <strong>singular values are the lengths of the ellipse's semi-axes</strong>, and the <strong>left singular vectors $u_i$ are the directions of those axes</strong>. The largest singular value $\\sigma_1$ is the maximum stretch factor; in fact $\\sigma_1 = \\max_{\\|x\\|=1}\\|Ax\\|$, which is precisely the spectral norm (operator 2-norm) of $A$.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>\"Rotate–stretch–rotate\" is the geometric content of $A = U\\Sigma V^{\\mathsf{T}}$. Any linear map, no matter how it looks, is just a rotation, then axis-aligned scaling, then another rotation. There is no fourth kind of thing a matrix can do.</p></div>\n\n<h3>The connection to $A^{\\mathsf{T}}A$ and eigen-decomposition</h3>\n<p>Where do $U$, $\\Sigma$, $V$ actually come from? The SVD is secretly the eigen-decomposition of two symmetric matrices. Watch what happens when we form $A^{\\mathsf{T}}A$ using $A = U\\Sigma V^{\\mathsf{T}}$:</p>\n\n$$A^{\\mathsf{T}}A = (U\\Sigma V^{\\mathsf{T}})^{\\mathsf{T}}(U\\Sigma V^{\\mathsf{T}}) = V\\Sigma^{\\mathsf{T}}U^{\\mathsf{T}}U\\Sigma V^{\\mathsf{T}} = V\\,(\\Sigma^{\\mathsf{T}}\\Sigma)\\,V^{\\mathsf{T}}.$$\n\n<p>We used $U^{\\mathsf{T}}U = I$. Now $\\Sigma^{\\mathsf{T}}\\Sigma$ is an $n \\times n$ diagonal matrix with entries $\\sigma_i^2$. So this last line is exactly an <strong>eigen-decomposition of the symmetric matrix $A^{\\mathsf{T}}A$</strong>: its eigenvectors are the right singular vectors $v_i$, and its eigenvalues are $\\sigma_i^2$. Symmetrically,</p>\n\n$$A A^{\\mathsf{T}} = U\\,(\\Sigma\\Sigma^{\\mathsf{T}})\\,U^{\\mathsf{T}},$$\n\n<p>so the left singular vectors $u_i$ are the eigenvectors of $AA^{\\mathsf{T}}$, with the same eigenvalues $\\sigma_i^2$. This gives both an existence proof and a recipe:</p>\n<ul>\n<li>$A^{\\mathsf{T}}A$ and $AA^{\\mathsf{T}}$ are symmetric and positive semidefinite, so by the spectral theorem they have orthonormal eigenvectors and real, non-negative eigenvalues. That guarantees $V$, $U$, and real $\\sigma_i \\ge 0$ exist — which is exactly why <em>every</em> matrix has an SVD.</li>\n<li><strong>Singular values are square roots of eigenvalues of $A^{\\mathsf{T}}A$:</strong> $\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf{T}}A)}$.</li>\n<li>Given the $v_i$, recover the $u_i$ for $\\sigma_i > 0$ via $u_i = \\frac{1}{\\sigma_i}A v_i$ — no separate eigen-problem needed.</li>\n</ul>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why ML cares</div><p>This is the bridge to <strong>Principal Component Analysis</strong>. If you center your data matrix $X$ (rows = samples), then $\\frac{1}{n}X^{\\mathsf{T}}X$ is the covariance matrix. Its eigenvectors are the principal components — and they are exactly the right singular vectors $v_i$ of $X$. The variance captured by component $i$ is $\\sigma_i^2/n$. PCA is SVD wearing a statistics costume. In practice you run SVD on $X$ directly rather than forming $X^{\\mathsf{T}}X$, because squaring the matrix squares the condition number and wrecks numerical precision.</p></div>\n\n<h3>Rank, range, and null space — read straight off $\\Sigma$</h3>\n<p>Suppose exactly $r$ of the singular values are nonzero: $\\sigma_1 \\ge \\cdots \\ge \\sigma_r > 0$ and $\\sigma_{r+1} = \\cdots = 0$. Then a great deal of the matrix's structure falls out for free, because orthonormal columns are linearly independent and the zero singular values kill their directions entirely:</p>\n<ul>\n<li><strong>Rank:</strong> $\\operatorname{rank}(A) = r$, the number of nonzero singular values. (Counting nonzero <em>eigenvalues</em> does <em>not</em> give the rank in general — singular values do, always.)</li>\n<li><strong>Range / column space:</strong> spanned by the first $r$ left singular vectors $u_1, \\ldots, u_r$. These are an orthonormal basis for everything $A$ can output.</li>\n<li><strong>Null space:</strong> spanned by the last $n - r$ right singular vectors $v_{r+1}, \\ldots, v_n$ — exactly the input directions that get scaled by zero, so $Av_i = 0$.</li>\n<li><strong>Row space:</strong> spanned by $v_1, \\ldots, v_r$; <strong>left null space:</strong> spanned by $u_{r+1}, \\ldots, u_m$.</li>\n</ul>\n<p>The SVD therefore hands you orthonormal bases for all four fundamental subspaces at once. It also gives the cleanest definition of <strong>numerical rank</strong>: in floating point, no singular value is ever exactly zero, so you count how many exceed a small tolerance. A sharp drop in the singular value spectrum — say $\\sigma_5 = 12$ but $\\sigma_6 = 0.003$ — tells you the data is effectively $5$-dimensional, even though the matrix has full mathematical rank.</p>\n\n<h4>The economy of low-rank: outer-product form</h4>\n<p>Multiplying out $U\\Sigma V^{\\mathsf{T}}$ and dropping the zero terms gives the SVD's most actionable form, a sum of rank-one pieces:</p>\n$$A = \\sum_{i=1}^{r}\\sigma_i\\, u_i v_i^{\\mathsf{T}}.$$\n<p>Each $u_i v_i^{\\mathsf{T}}$ is a rank-one matrix, weighted by its singular value. Because $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots$, the first terms carry the most \"energy.\" The celebrated <strong>Eckart–Young theorem</strong> says that truncating this sum after $k$ terms, $A_k = \\sum_{i=1}^{k}\\sigma_i u_i v_i^{\\mathsf{T}}$, gives the <em>best possible</em> rank-$k$ approximation of $A$ in both the spectral and Frobenius norms. The error is governed entirely by the discarded singular values: $\\|A - A_k\\|_2 = \\sigma_{k+1}$. This single fact underlies image compression, latent semantic analysis, recommender systems (low-rank matrix completion), noise reduction, and model compression — keep the big singular directions, throw away the small ones.</p>\n\n<h3>Worked example: a full $2\\times 2$ SVD by hand</h3>\n<p>Let us compute the SVD of</p>\n$$A = \\begin{bmatrix} 3 & 0 \\\\ 4 & 5 \\end{bmatrix}.$$\n\n<p><strong>Step 1 — form $A^{\\mathsf{T}}A$.</strong></p>\n$$A^{\\mathsf{T}}A = \\begin{bmatrix} 3 & 4 \\\\ 0 & 5 \\end{bmatrix}\\begin{bmatrix} 3 & 0 \\\\ 4 & 5 \\end{bmatrix} = \\begin{bmatrix} 25 & 20 \\\\ 20 & 25 \\end{bmatrix}.$$\n\n<p><strong>Step 2 — eigenvalues of $A^{\\mathsf{T}}A$.</strong> For a symmetric $\\begin{bmatrix} a & b \\\\ b & a \\end{bmatrix}$ the eigenvalues are $a \\pm b$, so $\\lambda = 25 + 20 = 45$ and $\\lambda = 25 - 20 = 5$. Hence the singular values are</p>\n$$\\sigma_1 = \\sqrt{45} = 3\\sqrt{5} \\approx 6.708, \\qquad \\sigma_2 = \\sqrt{5} \\approx 2.236.$$\n\n<p><strong>Step 3 — right singular vectors $v_i$ (eigenvectors of $A^{\\mathsf{T}}A$).</strong> For $\\lambda = 45$, the equation $b\\,x = b\\,y$ gives $x = y$, so $v_1 = \\frac{1}{\\sqrt{2}}\\begin{bmatrix}1\\\\1\\end{bmatrix}$. For $\\lambda = 5$ we get $x = -y$, so $v_2 = \\frac{1}{\\sqrt{2}}\\begin{bmatrix}1\\\\-1\\end{bmatrix}$. They are orthonormal, as the spectral theorem promised.</p>\n\n<p><strong>Step 4 — left singular vectors via $u_i = \\frac{1}{\\sigma_i}A v_i$.</strong></p>\n$$A v_1 = \\begin{bmatrix} 3 & 0 \\\\ 4 & 5 \\end{bmatrix}\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1\\\\1\\end{bmatrix} = \\frac{1}{\\sqrt{2}}\\begin{bmatrix}3\\\\9\\end{bmatrix}, \\quad u_1 = \\frac{1}{3\\sqrt{5}}\\cdot\\frac{1}{\\sqrt{2}}\\begin{bmatrix}3\\\\9\\end{bmatrix} = \\frac{1}{\\sqrt{10}}\\begin{bmatrix}1\\\\3\\end{bmatrix}.$$\n$$A v_2 = \\frac{1}{\\sqrt{2}}\\begin{bmatrix}3\\\\-1\\end{bmatrix}, \\quad u_2 = \\frac{1}{\\sqrt{5}}\\cdot\\frac{1}{\\sqrt{2}}\\begin{bmatrix}3\\\\-1\\end{bmatrix} = \\frac{1}{\\sqrt{10}}\\begin{bmatrix}3\\\\-1\\end{bmatrix}.$$\n<p>Check: $u_1 \\cdot u_2 = \\frac{1}{10}(1\\cdot 3 + 3\\cdot(-1)) = 0$, orthonormal as required.</p>\n\n<p><strong>Step 5 — assemble.</strong></p>\n$$A = U\\Sigma V^{\\mathsf{T}} = \\frac{1}{\\sqrt{10}}\\begin{bmatrix} 1 & 3 \\\\ 3 & -1 \\end{bmatrix}\\begin{bmatrix} 3\\sqrt{5} & 0 \\\\ 0 & \\sqrt{5} \\end{bmatrix}\\frac{1}{\\sqrt{2}}\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}.$$\n<p>Both singular values are nonzero, so $\\operatorname{rank}(A) = 2$ and $A$ is invertible — consistent with $\\det A = 15 \\ne 0$. As a sanity check, $\\sigma_1 \\sigma_2 = 3\\sqrt{5}\\cdot\\sqrt{5} = 15 = |\\det A|$, which always holds for square matrices: the product of singular values is the absolute value of the determinant (the volume scaling factor).</p>\n\n<h3>SVD versus eigen-decomposition: a precise contrast</h3>\n<p>These two factorizations are cousins, and conflating them is one of the most common mistakes. Hold them side by side:</p>\n<ul>\n<li><strong>Applicability.</strong> Eigen-decomposition $A = P D P^{-1}$ needs $A$ square and diagonalizable; SVD works for every matrix of any shape.</li>\n<li><strong>Bases.</strong> Eigenvectors need not be orthogonal and $P^{-1} \\ne P^{\\mathsf{T}}$ in general; SVD's $U$ and $V$ are always orthonormal. This makes SVD numerically stable and easy to invert.</li>\n<li><strong>One space vs two.</strong> Eigenvectors map a space to itself ($Av = \\lambda v$); singular vectors connect two spaces ($Av_i = \\sigma_i u_i$).</li>\n<li><strong>Sign and reality.</strong> Eigenvalues can be negative or complex; singular values are always real and $\\ge 0$.</li>\n<li><strong>When they coincide.</strong> If $A$ is symmetric positive semidefinite, its SVD and eigen-decomposition are the same, with $\\sigma_i = \\lambda_i$ and $U = V = $ the eigenvectors. If $A$ is symmetric but indefinite, then $\\sigma_i = |\\lambda_i|$, and a sign flip moves into $U$ versus $V$.</li>\n</ul>\n<p>A clean way to remember it: SVD relates to eigen-decomposition the way the absolute value relates to a signed number. The singular values are the \"magnitudes\" of how $A$ acts, stripped of the orientation information that eigenvalues' signs and complex phases carry.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>The SVD also delivers the <strong>Moore–Penrose pseudoinverse</strong> $A^{+} = V\\Sigma^{+}U^{\\mathsf{T}}$, where $\\Sigma^{+}$ inverts the nonzero singular values and transposes. This is the engine behind least-squares regression: the minimum-norm solution to $\\min_x\\|Ax - b\\|$ is $x = A^{+}b$. Ridge regression is the same machine with each $\\sigma_i$ replaced by $\\sigma_i/(\\sigma_i^2 + \\lambda)$, which gracefully damps the tiny, noise-dominated singular directions — regularization made geometric. Once you see least squares, PCA, and matrix approximation as three readings of one decomposition, the SVD stops being a formula and becomes a lens.</p></div>",
          "mcq": [
            {
              "q": "For an $m \\times n$ matrix $A$ with SVD $A = U\\Sigma V^{\\mathsf{T}}$, how is the rank of $A$ determined?",
              "choices": [
                "The number of nonzero diagonal entries of $\\Sigma$ (nonzero singular values)",
                "The number of nonzero entries in $U$",
                "The larger of $m$ and $n$",
                "The number of negative singular values"
              ],
              "answer": 0,
              "explain": "Rank equals the count of nonzero singular values. The zero singular values correspond to input directions sent to zero, which span the null space; singular values are never negative."
            },
            {
              "q": "How are the singular values $\\sigma_i$ of $A$ related to the eigenvalues $\\lambda_i$ of $A^{\\mathsf{T}}A$?",
              "choices": [
                "$\\sigma_i = \\lambda_i$",
                "$\\sigma_i = \\sqrt{\\lambda_i}$",
                "$\\sigma_i = \\lambda_i^2$",
                "$\\sigma_i = 1/\\lambda_i$"
              ],
              "answer": 1,
              "explain": "Since $A^{\\mathsf{T}}A = V(\\Sigma^{\\mathsf{T}}\\Sigma)V^{\\mathsf{T}}$, the eigenvalues of $A^{\\mathsf{T}}A$ are $\\sigma_i^2$, which are non-negative; hence $\\sigma_i = \\sqrt{\\lambda_i}$."
            },
            {
              "q": "Which statement about the geometric action of $A = U\\Sigma V^{\\mathsf{T}}$ on the unit sphere is correct?",
              "choices": [
                "$A$ maps the unit sphere to a sphere of a different radius",
                "$A$ maps the unit sphere to an ellipsoid whose semi-axis lengths are the singular values and whose axis directions are the left singular vectors $u_i$",
                "$A$ maps the unit sphere to a parallelepiped",
                "$A$ maps the unit sphere to an ellipsoid whose axes are the eigenvectors of $A$"
              ],
              "answer": 1,
              "explain": "Because $U,V$ are rigid rotations and only $\\Sigma$ stretches, the image is an ellipsoid with semi-axes of length $\\sigma_i$ pointing along the left singular vectors $u_i$."
            },
            {
              "q": "When do the SVD and the eigen-decomposition of a square matrix $A$ coincide (same orthonormal vectors, $\\sigma_i = \\lambda_i$)?",
              "choices": [
                "For any invertible matrix",
                "For any symmetric matrix",
                "For a symmetric positive semidefinite matrix",
                "Never, they are unrelated"
              ],
              "answer": 2,
              "explain": "If $A$ is symmetric PSD its eigenvalues are non-negative and its eigenvectors orthonormal, so $U = V$ and $\\sigma_i = \\lambda_i$. A merely symmetric (indefinite) matrix gives $\\sigma_i = |\\lambda_i|$ with sign absorbed into $U$ vs $V$."
            },
            {
              "q": "In the SVD $A = U\\Sigma V^{\\mathsf{T}}$ of an $m \\times n$ matrix, what are the shapes of $U$, $\\Sigma$, and $V$ respectively?",
              "choices": [
                "$U$ is $m \\times m$, $\\Sigma$ is $m \\times n$, $V$ is $n \\times n$",
                "$U$ is $n \\times n$, $\\Sigma$ is $n \\times m$, $V$ is $m \\times m$",
                "$U$, $\\Sigma$, and $V$ are all $m \\times n$",
                "$U$ is $m \\times n$, $\\Sigma$ is $n \\times n$, $V$ is $n \\times n$"
              ],
              "answer": 0,
              "explain": "The lesson states $U$ is the $m \\times m$ orthogonal matrix, $\\Sigma$ is the $m \\times n$ diagonal matrix, and $V$ is the $n \\times n$ orthogonal matrix. Note $\\Sigma$ matches $A$'s shape so the product $U\\Sigma V^{\\mathsf{T}}$ is again $m \\times n$."
            },
            {
              "q": "Multiplying $A = U\\Sigma V^{\\mathsf{T}}$ on the right by $V$ and reading column by column yields which defining relation for singular vectors?",
              "choices": [
                "$A v_i = \\sigma_i u_i$",
                "$A u_i = \\sigma_i v_i$",
                "$A v_i = \\lambda_i v_i$",
                "$U^{\\mathsf{T}} v_i = \\sigma_i u_i$"
              ],
              "answer": 0,
              "explain": "Because $V^{\\mathsf{T}}V = I$, multiplying on the right by $V$ gives $AV = U\\Sigma$; reading column by column produces $A v_i = \\sigma_i u_i$, mapping the orthonormal input direction $v_i$ to the orthonormal output direction $u_i$ scaled by $\\sigma_i$."
            },
            {
              "q": "According to the lesson, what key conceptual difference distinguishes singular vectors from eigenvectors?",
              "choices": [
                "Singular vectors live in two spaces ($v_i$ in input $\\mathbb{R}^n$, $u_i$ in output $\\mathbb{R}^m$), while eigenvectors live in one space with input and output aligned",
                "Singular vectors only exist for diagonalizable matrices, whereas eigenvectors exist for all matrices",
                "Singular vectors are never orthonormal, whereas eigenvectors always are",
                "Eigenvectors map input directions to different output directions, while singular vectors keep them aligned"
              ],
              "answer": 0,
              "explain": "The lesson contrasts eigenvectors ($Av = \\lambda v$, one space, input and output aligned) with singular vectors, which connect orthonormal input directions in $\\mathbb{R}^n$ to orthonormal output directions in $\\mathbb{R}^m$ via $Av_i = \\sigma_i u_i$. This two-space nature is why SVD survives when eigen-decomposition fails."
            },
            {
              "q": "What does it mean for $U$ and $V$ to be orthogonal, and why does the lesson emphasize this property?",
              "choices": [
                "$U^{\\mathsf{T}}U = I$ and $V^{\\mathsf{T}}V = I$, meaning their columns form orthonormal bases — the source of nearly all of the SVD's power",
                "$U + U^{\\mathsf{T}} = I$ and $V + V^{\\mathsf{T}} = I$, ensuring the singular values are positive",
                "Their columns are mutually perpendicular but not unit length, which guarantees $\\Sigma$ is square",
                "$U$ and $V$ commute with $A$, which is what allows any matrix to be factored"
              ],
              "answer": 0,
              "explain": "The lesson defines orthogonal as $U^{\\mathsf{T}}U = I$ and $V^{\\mathsf{T}}V = I$ (columns form an orthonormal basis) and identifies that orthogonality as the source of nearly all of the SVD's power, since it makes the factorization a numerically stable rotate-stretch-rotate."
            }
          ],
          "flashcards": [
            {
              "front": "State the SVD theorem (shapes and properties of each factor).",
              "back": "Every real $m\\times n$ matrix factors as $A = U\\Sigma V^{\\mathsf{T}}$, with $U$ ($m\\times m$) and $V$ ($n\\times n$) orthogonal ($U^{\\mathsf{T}}U=I$, $V^{\\mathsf{T}}V=I$) and $\\Sigma$ ($m\\times n$) diagonal with entries $\\sigma_1\\ge\\sigma_2\\ge\\cdots\\ge 0$."
            },
            {
              "front": "What is the defining relation between a right singular vector $v_i$ and a left singular vector $u_i$?",
              "back": "$Av_i = \\sigma_i u_i$: $A$ maps the orthonormal input direction $v_i$ to the orthonormal output direction $u_i$, scaled by the singular value $\\sigma_i$."
            },
            {
              "front": "How do you obtain $V$, $\\Sigma$, and $U$ from $A$ via eigen-decompositions?",
              "back": "$V$ = eigenvectors of $A^{\\mathsf{T}}A$; $\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf{T}}A)}$; then $u_i = \\tfrac{1}{\\sigma_i}Av_i$ for $\\sigma_i>0$. Equivalently $U$ = eigenvectors of $AA^{\\mathsf{T}}$."
            },
            {
              "front": "What are the four fundamental subspaces in terms of singular vectors (rank $r$)?",
              "back": "Column space = span$(u_1,\\dots,u_r)$; left null space = span$(u_{r+1},\\dots,u_m)$; row space = span$(v_1,\\dots,v_r)$; null space = span$(v_{r+1},\\dots,v_n)$."
            },
            {
              "front": "State the Eckart–Young theorem (best low-rank approximation).",
              "back": "$A_k=\\sum_{i=1}^k \\sigma_i u_i v_i^{\\mathsf{T}}$ is the best rank-$k$ approximation of $A$ in spectral and Frobenius norms, with spectral error $\\|A-A_k\\|_2=\\sigma_{k+1}$."
            },
            {
              "front": "How does SVD relate to PCA?",
              "back": "For a centered data matrix $X$, the right singular vectors $v_i$ are the principal components (eigenvectors of the covariance $\\tfrac{1}{n}X^{\\mathsf{T}}X$), and the variance along component $i$ is $\\sigma_i^2/n$."
            }
          ],
          "homework": [
            {
              "prompt": "Compute the full SVD of $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & -3 \\end{bmatrix}$. Give $U$, $\\Sigma$, $V$, and state the rank. Comment on how the singular values relate to the eigenvalues here.",
              "hint": "Form $A^{\\mathsf{T}}A$ (it is diagonal). Singular values are square roots of its eigenvalues. Remember singular values must be non-negative, so handle the $-3$ carefully — the sign must go somewhere.",
              "solution": "$A^{\\mathsf{T}}A = \\begin{bmatrix} 4 & 0 \\\\ 0 & 9 \\end{bmatrix}$, eigenvalues $9$ and $4$. Ordered, $\\sigma_1=3,\\ \\sigma_2=2$, so $\\Sigma=\\begin{bmatrix}3&0\\\\0&2\\end{bmatrix}$. The eigenvectors of $A^{\\mathsf{T}}A$ are the standard basis vectors; ordering by descending singular value, $v_1=\\begin{bmatrix}0\\\\1\\end{bmatrix},\\ v_2=\\begin{bmatrix}1\\\\0\\end{bmatrix}$, so $V=\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$. Then $u_1=\\tfrac{1}{3}Av_1=\\tfrac{1}{3}\\begin{bmatrix}0\\\\-3\\end{bmatrix}=\\begin{bmatrix}0\\\\-1\\end{bmatrix}$ and $u_2=\\tfrac{1}{2}Av_2=\\begin{bmatrix}1\\\\0\\end{bmatrix}$, so $U=\\begin{bmatrix}0&1\\\\-1&0\\end{bmatrix}$. Rank $=2$. The eigenvalues of $A$ are $2$ and $-3$; the singular values are $2$ and $3=|-3|$. The negative sign of the eigenvalue is absorbed into $U$ (note $u_1=-e_2$), illustrating $\\sigma_i=|\\lambda_i|$ for a symmetric matrix and that singular values discard sign information."
            },
            {
              "prompt": "A data matrix $A$ has singular values $\\sigma = (10,\\ 8,\\ 0.05,\\ 0.02)$. (a) What is the mathematical rank? (b) What is a sensible numerical/effective rank, and why? (c) If you form the best rank-2 approximation $A_2$, what is the spectral-norm error $\\|A-A_2\\|_2$?",
              "hint": "All four singular values are nonzero, but two are tiny relative to the others. Eckart–Young ties the rank-$k$ truncation error to the first discarded singular value.",
              "solution": "(a) All four singular values are nonzero, so the mathematical rank is 4. (b) There is a sharp drop from $8$ to $0.05$ (a factor of ~160). The last two singular values are essentially noise, so the effective/numerical rank is 2 — the data lies very close to a 2-dimensional subspace. (c) By Eckart–Young, $\\|A-A_2\\|_2 = \\sigma_3 = 0.05$, the largest discarded singular value. This tiny error confirms that keeping only the top two singular directions loses almost nothing, which is the basis for compression and denoising."
            },
            {
              "prompt": "Prove that for any matrix $A$, the nonzero eigenvalues of $A^{\\mathsf{T}}A$ equal the nonzero eigenvalues of $AA^{\\mathsf{T}}$, and explain why this means the count of nonzero singular values (the rank) is the same whether computed from $A^{\\mathsf{T}}A$ or $AA^{\\mathsf{T}}$.",
              "hint": "Suppose $A^{\\mathsf{T}}A\\,v=\\lambda v$ with $\\lambda\\ne 0$. Apply $A$ to both sides and see what eigenvector of $AA^{\\mathsf{T}}$ pops out.",
              "solution": "Let $A^{\\mathsf{T}}A\\,v=\\lambda v$ with $\\lambda\\ne 0$ and $v\\ne 0$. Multiply on the left by $A$: $A A^{\\mathsf{T}}(Av)=\\lambda (Av)$. So $Av$ is an eigenvector of $AA^{\\mathsf{T}}$ with the same eigenvalue $\\lambda$, provided $Av\\ne 0$. It is nonzero, because $\\|Av\\|^2 = v^{\\mathsf{T}}A^{\\mathsf{T}}A v=\\lambda\\|v\\|^2\\ne 0$. By symmetry (swap the roles of $A$ and $A^{\\mathsf{T}}$), every nonzero eigenvalue of $AA^{\\mathsf{T}}$ is also a nonzero eigenvalue of $A^{\\mathsf{T}}A$. Hence the two matrices share the same multiset of nonzero eigenvalues. Since singular values are the square roots of these nonzero eigenvalues, and rank equals the number of nonzero singular values, both $A^{\\mathsf{T}}A$ ($n\\times n$) and $AA^{\\mathsf{T}}$ ($m\\times m$) yield the identical rank — even though the two matrices have different sizes and differ in their number of zero eigenvalues."
            }
          ]
        },
        {
          "id": "la-low-rank-pca",
          "title": "Low-Rank Approximation, PCA, and Dimensionality Reduction",
          "minutes": 18,
          "content": "<h3>From SVD to \"the best simpler version of your data\"</h3>\n<p>By now you know that any real matrix $A \\in \\mathbb{R}^{m \\times n}$ admits a <strong>singular value decomposition</strong> $A = U\\Sigma V^\\top$, where $U \\in \\mathbb{R}^{m\\times m}$ and $V \\in \\mathbb{R}^{n\\times n}$ are orthogonal, and $\\Sigma$ is diagonal with the singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge \\sigma_r > 0$ (with $r = \\operatorname{rank}(A)$). This lesson takes that factorization and turns it into the workhorse of practical machine learning: <strong>low-rank approximation</strong>, the <strong>pseudoinverse</strong>, and <strong>Principal Component Analysis (PCA)</strong>. The unifying idea is simple and powerful: the singular values rank the directions of your data by how much \"stuff\" lives along them, so keeping the top few gives you the best possible simplified copy.</p>\n\n<p>It helps to write the SVD in its <em>outer-product</em> (dyadic) form. If $u_i$ and $v_i$ are the $i$-th columns of $U$ and $V$, then</p>\n$$A = \\sum_{i=1}^{r} \\sigma_i\\, u_i v_i^\\top.$$\n<p>Each term $\\sigma_i u_i v_i^\\top$ is a rank-1 matrix — the \"$i$-th layer\" of $A$ — and the layers are ordered from most important ($\\sigma_1$) to least. Low-rank approximation is just the act of keeping the first $k$ layers and throwing away the rest.</p>\n\n<h3>The Eckart–Young theorem: truncated SVD is optimal</h3>\n<p>Define the <strong>rank-$k$ truncation</strong></p>\n$$A_k = \\sum_{i=1}^{k} \\sigma_i\\, u_i v_i^\\top = U_k \\Sigma_k V_k^\\top,$$\n<p>where $U_k$, $V_k$ hold the first $k$ columns and $\\Sigma_k = \\operatorname{diag}(\\sigma_1,\\dots,\\sigma_k)$. The remarkable fact is that you cannot do better than this with <em>any</em> rank-$k$ matrix.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact — Eckart–Young–Mirsky</div><p>Among all matrices $B$ with $\\operatorname{rank}(B) \\le k$, the truncated SVD $A_k$ minimizes the approximation error in both the spectral and Frobenius norms:\n$$\\min_{\\operatorname{rank}(B)\\le k} \\lVert A - B\\rVert_2 = \\lVert A - A_k\\rVert_2 = \\sigma_{k+1},$$\n$$\\min_{\\operatorname{rank}(B)\\le k} \\lVert A - B\\rVert_F = \\lVert A - A_k\\rVert_F = \\sqrt{\\sigma_{k+1}^2 + \\cdots + \\sigma_r^2}.$$\nThe theorem holds for <em>every</em> unitarily invariant norm.</p></div>\n\n<p>The intuition is worth internalizing. Because $U$ and $V$ are orthogonal, the SVD rotates your data into a coordinate system where $A$ acts as pure scaling along orthogonal axes. In that frame, the \"energy\" of the matrix is $\\lVert A\\rVert_F^2 = \\sum_i \\sigma_i^2$ — each rank-1 layer $\\sigma_i u_i v_i^\\top$ lives along its own orthogonal direction (the layers are mutually orthogonal in the Frobenius inner product), so their squared magnitudes $\\sigma_i^2$ add up as independent contributions to the total. To shed rank cheaply you should discard the directions carrying the least energy, which are exactly the smallest singular values. Any other rank-$k$ matrix is forced to spend its budget worse, because it cannot align its rank-1 layers with the orthogonal energy axes more efficiently than the SVD already does.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of an image as a matrix of pixel intensities. $\\sigma_1 u_1 v_1^\\top$ captures the coarsest large-scale pattern; later layers add finer detail. A photo that \"looks fine\" at rank 50 out of 500 means 90% of the layers were mostly noise and texture — perceptually cheap. That is image compression by SVD in one sentence.</p></div>\n\n<h4>Why this powers compression, denoising, and embeddings</h4>\n<ul>\n<li><strong>Compression.</strong> Storing $A_k$ costs $k(m+n+1)$ numbers instead of $mn$. Whenever $k \\ll \\min(m,n)$ and the spectrum decays, you save dramatically while losing only $\\sqrt{\\sum_{i>k}\\sigma_i^2}$ of error.</li>\n<li><strong>Denoising.</strong> If the true signal is low-rank and noise is spread isotropically across all directions, the signal concentrates in the top singular values while noise leaks into the long tail of small ones. Truncating removes mostly noise — this is the basis of many spectral denoising and matrix-completion methods (e.g., recommender systems imputing a low-rank ratings matrix).</li>\n<li><strong>Embeddings.</strong> Latent Semantic Analysis embeds documents and words by truncating the term–document matrix; the rows of $U_k\\Sigma_k$ and $V_k\\Sigma_k$ become dense vectors in a $k$-dimensional \"concept\" space. This is the linear-algebra ancestor of modern learned embeddings.</li>\n</ul>\n\n<h3>The Moore–Penrose pseudoinverse</h3>\n<p>The SVD also gives the cleanest definition of the <strong>pseudoinverse</strong> $A^{+}$, which generalizes matrix inversion to non-square or rank-deficient matrices. If $A = U\\Sigma V^\\top$, then</p>\n$$A^{+} = V \\Sigma^{+} U^\\top, \\qquad \\Sigma^{+} = \\operatorname{diag}\\!\\Big(\\tfrac{1}{\\sigma_1},\\dots,\\tfrac{1}{\\sigma_r},\\,0,\\dots,0\\Big).$$\n<p>That is: invert the nonzero singular values, leave the zeros as zeros, and transpose the shape. The pseudoinverse is the unique matrix satisfying the four Moore–Penrose conditions ($AA^{+}A=A$, $A^{+}AA^{+}=A^{+}$, and $AA^{+}$, $A^{+}A$ symmetric).</p>\n\n<p>Its central use is the <strong>least-squares problem</strong>. The vector $x = A^{+} b$ is the solution to $\\min_x \\lVert Ax - b\\rVert_2$ that itself has the <em>smallest norm</em> $\\lVert x\\rVert_2$ among all minimizers. When $A$ has full column rank this reduces to the familiar normal-equations formula $A^{+} = (A^\\top A)^{-1}A^\\top$, but the SVD version stays well-defined even when $A^\\top A$ is singular (collinear features), which is exactly when the naive formula blows up.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>Ridge regression is what you get by softening the pseudoinverse: $\\sigma_i^{-1}$ becomes $\\sigma_i/(\\sigma_i^2+\\lambda)$. Tiny singular values — the directions where data is nearly degenerate — get damped instead of exploding to $1/\\sigma_i$. So regularization and low-rank truncation are two flavors of the same idea: distrust the directions where the signal is weak.</p></div>\n\n<h3>Principal Component Analysis as SVD of centered data</h3>\n<p>Let your data be $n$ samples in $\\mathbb{R}^d$, stacked as rows of $X \\in \\mathbb{R}^{n\\times d}$. PCA finds the orthogonal directions of maximum variance. The recipe:</p>\n<ol>\n<li><strong>Center.</strong> Subtract the column means: $\\tilde{X} = X - \\mathbf{1}\\bar{x}^\\top$ where $\\bar{x} = \\frac1n \\sum_i x_i$. Centering is not optional — PCA is about variance about the mean, and skipping it makes the first component chase the mean offset.</li>\n<li><strong>Covariance.</strong> Form the sample covariance $C = \\frac{1}{n-1}\\tilde{X}^\\top \\tilde{X} \\in \\mathbb{R}^{d\\times d}$, a symmetric PSD matrix.</li>\n<li><strong>Decompose.</strong> Either eigendecompose $C = W\\Lambda W^\\top$, or — numerically preferable — take the SVD $\\tilde{X} = U\\Sigma V^\\top$ directly.</li>\n</ol>\n\n<p>The two routes are the same object. Since $\\tilde{X}^\\top \\tilde{X} = V\\Sigma^2 V^\\top$, we get</p>\n$$C = \\frac{1}{n-1} V \\Sigma^2 V^\\top \\;\\Rightarrow\\; \\underbrace{W = V}_{\\text{principal directions}}, \\qquad \\underbrace{\\lambda_i = \\frac{\\sigma_i^2}{n-1}}_{\\text{variance along PC}_i}.$$\n<p>So the <strong>principal components (loadings)</strong> are the right singular vectors $v_i$ — the eigenvectors of the covariance. The <strong>variance captured by PC$_i$</strong> equals its eigenvalue $\\lambda_i = \\sigma_i^2/(n-1)$. The <strong>scores</strong> — the coordinates of each sample in the new basis — are the rows of $\\tilde{X}V = U\\Sigma$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why ML people prefer the SVD route</div><p>Forming $C = \\tilde{X}^\\top\\tilde{X}$ squares the condition number and can lose precision when singular values are small. Running SVD on $\\tilde{X}$ directly is more numerically stable and, with randomized/truncated SVD, far cheaper when you only need the top $k$ components of a tall-and-wide matrix. This is what <code>sklearn.decomposition.PCA</code> does under the hood.</p></div>\n\n<h4>Choosing $k$ via explained variance</h4>\n<p>The fraction of total variance retained by the first $k$ components is</p>\n$$\\text{explained variance ratio}(k) = \\frac{\\sum_{i=1}^{k}\\sigma_i^2}{\\sum_{i=1}^{r}\\sigma_i^2} = \\frac{\\sum_{i=1}^{k}\\lambda_i}{\\sum_{i=1}^{r}\\lambda_i}.$$\n<p>Common rules of thumb: pick the smallest $k$ reaching a target like 95% or 99%; or look for an \"elbow\" in the <em>scree plot</em> of $\\sigma_i^2$ (or $\\lambda_i$) where the curve flattens; or in some statistical settings keep components with $\\lambda_i > 1$ (the Kaiser criterion, valid only on standardized data where total variance equals $d$). Note the direct link to Eckart–Young: the reconstruction error of projecting onto the top $k$ PCs is $\\sum_{i>k}\\sigma_i^2$, so PCA <em>is</em> the optimal rank-$k$ approximation of the centered data.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Practical note</div><p>If your features have different units (kilometers vs. dollars), variance is not comparable across them, so PCA on raw covariance is dominated by whichever feature happens to have a big numeric scale. Standardize each feature to unit variance first — this is PCA on the <em>correlation</em> matrix, and it is usually what you want for heterogeneous tabular data.</p></div>\n\n<h3>Worked example: PCA on a small dataset by hand</h3>\n<p>Take four 2-D points:</p>\n$$X = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\\\ -2 & 0 \\\\ 0 & -1 \\end{bmatrix}.$$\n<p><strong>Step 1 — center.</strong> Column means are $\\bar{x}=(0,0)$, so $\\tilde{X}=X$ already.</p>\n<p><strong>Step 2 — covariance.</strong> Using $C = \\frac{1}{n-1}\\tilde X^\\top \\tilde X$ with $n=4$:</p>\n$$\\tilde X^\\top \\tilde X = \\begin{bmatrix} 2^2+0+(-2)^2+0 & 0 \\\\ 0 & 0+1+0+1 \\end{bmatrix} = \\begin{bmatrix} 8 & 0 \\\\ 0 & 2\\end{bmatrix},\\quad C = \\frac{1}{3}\\begin{bmatrix} 8 & 0 \\\\ 0 & 2\\end{bmatrix}.$$\n<p><strong>Step 3 — eigen/SVD.</strong> $C$ is already diagonal, so the principal directions are the axes: $v_1=(1,0)$ with $\\lambda_1 = 8/3 \\approx 2.667$, and $v_2=(0,1)$ with $\\lambda_2 = 2/3 \\approx 0.667$. The singular values of $\\tilde X$ are $\\sigma_1=\\sqrt{8}=2\\sqrt2$ and $\\sigma_2=\\sqrt2$ (check: $\\sigma_i^2/(n-1)=\\lambda_i$).</p>\n<p><strong>Step 4 — explained variance.</strong> Total variance $=\\lambda_1+\\lambda_2 = 10/3$. PC$_1$ explains $\\frac{8/3}{10/3}=0.8$, i.e. <strong>80%</strong>. So projecting onto $v_1$ alone keeps 80% of the variance.</p>\n<p><strong>Step 5 — scores and reconstruction.</strong> Projecting onto PC$_1$, the score of point $(2,0)$ is $\\tilde x^\\top v_1 = 2$; its rank-1 reconstruction is $2\\cdot v_1 = (2,0)$ — captured exactly. The point $(0,1)$ has score $0$ on PC$_1$, so it reconstructs to $(0,0)$, an error of $1$. Summing squared reconstruction error over all points gives $0+1+0+1 = 2 = \\sigma_2^2$, exactly matching Eckart–Young's $\\sum_{i>k}\\sigma_i^2$ with $k=1$. The theory and the arithmetic agree.</p>\n\n<h4>The same thing in code</h4>\n<pre><code>import numpy as np\nX = np.array([[2,0],[0,1],[-2,0],[0,-1]], float)\nXc = X - X.mean(axis=0)                 # center\nU, S, Vt = np.linalg.svd(Xc, full_matrices=False)\nexplained = S**2 / np.sum(S**2)         # [0.8, 0.2]\nscores = U * S                          # = Xc @ Vt.T, the PCA coordinates\nXk = (U[:, :1] * S[:1]) @ Vt[:1, :]     # best rank-1 reconstruction\nerr = np.linalg.norm(Xc - Xk, 'fro')**2 # == S[1]**2 == 2.0\n</code></pre>\n\n<h3>Putting it together: the mental model</h3>\n<p>One decomposition — the SVD — answers three questions at once. <em>What is the best low-rank summary of this matrix?</em> Truncate it (Eckart–Young). <em>How do I invert a non-invertible system stably?</em> Reciprocate the singular values (pseudoinverse). <em>What are the dominant patterns of variation in my data?</em> Take the SVD of the centered matrix (PCA). In every case the singular values act as a built-in importance ranking, and keeping the top $k$ is provably the best you can do under that budget. That is why the SVD shows up everywhere from JPEG-like compression and recommender systems to the embedding layers and spectral methods that underpin modern AI.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"la-pca\"></div>",
          "mcq": [
            {
              "q": "According to the Eckart–Young theorem, the best rank-$k$ approximation $A_k$ of $A$ in the Frobenius norm achieves an error $\\lVert A - A_k\\rVert_F$ equal to:",
              "choices": [
                "$\\sigma_{k+1}$",
                "$\\sqrt{\\sigma_{k+1}^2 + \\cdots + \\sigma_r^2}$",
                "$\\sigma_1 - \\sigma_k$",
                "$\\sum_{i=k+1}^{r}\\sigma_i$"
              ],
              "answer": 1,
              "explain": "Frobenius error is the square root of the sum of the squared discarded singular values; $\\sigma_{k+1}$ alone is the spectral-norm error, a common mix-up."
            },
            {
              "q": "In PCA, if $\\tilde{X} = U\\Sigma V^\\top$ is the SVD of the centered $n\\times d$ data, the variance captured by the $i$-th principal component is:",
              "choices": [
                "$\\sigma_i$",
                "$\\sigma_i^2$",
                "$\\sigma_i^2/(n-1)$",
                "$\\sigma_i/(n-1)$"
              ],
              "answer": 2,
              "explain": "The covariance is $C=\\frac{1}{n-1}V\\Sigma^2 V^\\top$, so its eigenvalues — the per-PC variances — are $\\lambda_i=\\sigma_i^2/(n-1)$."
            },
            {
              "q": "Why do practitioners compute PCA via the SVD of the centered data matrix rather than eigendecomposing the covariance $C=\\tilde{X}^\\top\\tilde{X}/(n-1)$?",
              "choices": [
                "The SVD gives different principal directions that fit the data better",
                "Forming $C$ squares the condition number and loses numerical precision, while SVD on $\\tilde{X}$ is more stable",
                "The covariance matrix does not have real eigenvalues",
                "Only the SVD can center the data automatically"
              ],
              "answer": 1,
              "explain": "Both routes yield the same directions ($W=V$), but explicitly forming $\\tilde X^\\top \\tilde X$ squares the condition number; SVD on $\\tilde X$ avoids that and supports cheap truncated/randomized variants."
            },
            {
              "q": "The Moore–Penrose pseudoinverse $A^{+}=V\\Sigma^{+}U^\\top$ is built by, for the diagonal of $\\Sigma^{+}$:",
              "choices": [
                "Reciprocating every diagonal entry of $\\Sigma$, including zeros",
                "Reciprocating only the nonzero singular values and leaving structural zeros as zeros",
                "Negating each singular value",
                "Squaring each singular value"
              ],
              "answer": 1,
              "explain": "$\\Sigma^{+}$ inverts the nonzero $\\sigma_i$ and keeps zeros as zeros; reciprocating zeros would be undefined and is the typical wrong answer."
            },
            {
              "q": "A rank-5 matrix $A$ has singular values $\\sigma_1=10,\\ \\sigma_2=6,\\ \\sigma_3=3,\\ \\sigma_4=2,\\ \\sigma_5=1$. What is the spectral-norm error $\\lVert A - A_2\\rVert_2$ of the best rank-2 approximation?",
              "choices": [
                "$3$",
                "$\\sqrt{14}$",
                "$16$",
                "$6$"
              ],
              "answer": 0,
              "explain": "By Eckart-Young, the spectral-norm error of the best rank-$k$ approximation equals $\\sigma_{k+1}$, which here is $\\sigma_3=3$. (The Frobenius error would be $\\sqrt{\\sigma_3^2+\\sigma_4^2+\\sigma_5^2}=\\sqrt{14}$, and $6=\\sigma_2$ is the rank-1 spectral error.)"
            },
            {
              "q": "Using the same singular values $\\sigma=(10,6,3,2,1)$, what fraction of the total Frobenius 'energy' $\\sum_i \\sigma_i^2$ is captured by the rank-2 truncation $A_2$?",
              "choices": [
                "$16/22$",
                "$136/150$",
                "$100/150$",
                "$60/100$"
              ],
              "answer": 1,
              "explain": "The captured energy is $(\\sigma_1^2+\\sigma_2^2)/\\sum_i\\sigma_i^2 = (100+36)/(100+36+9+4+1)=136/150$."
            },
            {
              "q": "Why do the squared singular values $\\sigma_i^2$ simply add up to give $\\lVert A\\rVert_F^2$ rather than interacting through cross terms?",
              "choices": [
                "Because the singular values are sorted in decreasing order",
                "Because $U$ and $V$ are orthogonal, so the rank-1 layers $\\sigma_i u_i v_i^\\top$ are mutually orthogonal in the Frobenius inner product",
                "Because every matrix is automatically full rank",
                "Because the Frobenius norm ignores off-diagonal entries of $A$"
              ],
              "answer": 1,
              "explain": "Orthogonality of $U$ and $V$ makes the rank-1 layers mutually orthogonal in the Frobenius inner product, so their squared magnitudes add as independent contributions with no cross terms."
            },
            {
              "q": "A colleague claims that for some clever rank-$k$ matrix $B$ they beat the truncated SVD, achieving $\\lVert A-B\\rVert_F < \\lVert A-A_k\\rVert_F$. What does the Eckart-Young-Mirsky theorem say about this claim?",
              "choices": [
                "It is possible only if $A$ is square",
                "It is possible whenever $B$ is also orthogonal",
                "It is impossible; $A_k$ is the minimizer over all rank-$\\le k$ matrices in every unitarily invariant norm",
                "It is impossible in the spectral norm but achievable in the Frobenius norm"
              ],
              "answer": 2,
              "explain": "Eckart-Young-Mirsky guarantees the truncated SVD $A_k$ is the optimal rank-$\\le k$ approximation in every unitarily invariant norm (Frobenius included), so no rank-$k$ matrix can do strictly better."
            }
          ],
          "flashcards": [
            {
              "front": "State the Eckart–Young theorem (Frobenius norm).",
              "back": "Among all matrices of rank ≤ k, the truncated SVD $A_k=\\sum_{i=1}^k \\sigma_i u_i v_i^\\top$ minimizes $\\lVert A-B\\rVert_F$, with error $\\sqrt{\\sigma_{k+1}^2+\\cdots+\\sigma_r^2}$ (and spectral-norm error $\\sigma_{k+1}$)."
            },
            {
              "front": "How is the pseudoinverse defined via the SVD?",
              "back": "If $A=U\\Sigma V^\\top$ then $A^{+}=V\\Sigma^{+}U^\\top$, where $\\Sigma^{+}$ reciprocates nonzero singular values and keeps zeros as zeros. $x=A^{+}b$ is the minimum-norm least-squares solution."
            },
            {
              "front": "What are the principal directions, variances, and scores in PCA, in terms of the SVD of centered data $\\tilde X=U\\Sigma V^\\top$?",
              "back": "Principal directions = right singular vectors $v_i$ (eigenvectors of covariance). Variance of PC$_i$ = $\\sigma_i^2/(n-1)$. Scores (new coordinates) = $\\tilde X V = U\\Sigma$."
            },
            {
              "front": "Formula for the explained variance ratio of the first k principal components.",
              "back": "$\\dfrac{\\sum_{i=1}^k \\sigma_i^2}{\\sum_{i=1}^r \\sigma_i^2}=\\dfrac{\\sum_{i=1}^k \\lambda_i}{\\sum_{i=1}^r \\lambda_i}$. Pick the smallest k reaching a target (e.g. 95%) or the scree-plot elbow."
            },
            {
              "front": "Why must data be centered before PCA, and when should it also be standardized?",
              "back": "Centering makes PCA capture variance about the mean (otherwise PC1 chases the mean offset). Standardize to unit variance when features have different units/scales, so no feature dominates by sheer numeric size."
            },
            {
              "front": "How does ridge regression relate to the pseudoinverse?",
              "back": "Ridge replaces each $1/\\sigma_i$ in the pseudoinverse by $\\sigma_i/(\\sigma_i^2+\\lambda)$, damping (instead of exploding) the small-singular-value directions — a soft version of low-rank truncation / regularization."
            }
          ],
          "homework": [
            {
              "prompt": "A matrix $A$ has singular values $\\sigma = (10, 6, 3, 1, 0.4)$. (a) What is the smallest k such that the rank-k truncated SVD retains at least 95% of the Frobenius energy? (b) What is the relative Frobenius approximation error $\\lVert A-A_k\\rVert_F/\\lVert A\\rVert_F$ at that k?",
              "hint": "Frobenius energy is $\\sum_i \\sigma_i^2$. Compute the cumulative fraction of $\\sigma_i^2$ and find where it crosses 0.95. The relative error is the square root of the discarded fraction.",
              "solution": "Squared singular values: 100, 36, 9, 1, 0.16; total = 146.16. Cumulative fractions: k=1: 100/146.16 = 0.684; k=2: 136/146.16 = 0.930; k=3: 145/146.16 = 0.9921. So k=2 gives 93.0% (below 95%) and k=3 gives 99.21% (above). (a) k = 3. (b) Discarded energy fraction = 1 - 0.9921 = 0.00794, so relative error = sqrt(0.00794) ≈ 0.0891, about 8.9%."
            },
            {
              "prompt": "Given centered data $\\tilde X = \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\\\ -3 & 0 \\\\ 0 & -1 \\end{bmatrix}$ (n=4), compute the principal directions, the variance along each, and the percentage of variance explained by the first principal component.",
              "hint": "Form $C=\\frac{1}{n-1}\\tilde X^\\top \\tilde X$. If it comes out diagonal, the principal directions are just the coordinate axes and the variances are the diagonal entries.",
              "solution": "$\\tilde X^\\top \\tilde X = \\begin{bmatrix} 18 & 0 \\\\ 0 & 2 \\end{bmatrix}$, so $C = \\frac13\\begin{bmatrix}18&0\\\\0&2\\end{bmatrix}=\\begin{bmatrix}6&0\\\\0&2/3\\end{bmatrix}$. Principal directions: $v_1=(1,0)$, $v_2=(0,1)$. Variances: $\\lambda_1 = 6$, $\\lambda_2 = 2/3 \\approx 0.667$. Total variance $= 6 + 2/3 = 20/3$. PC1 explains $6/(20/3) = 18/20 = 0.9 = 90\\%$."
            },
            {
              "prompt": "Let $A=\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$. Compute the pseudoinverse $A^{+}$ and use it to find the minimum-norm least-squares solution to $Ax=b$ for $b=(2,5,7)^\\top$.",
              "hint": "Read off the SVD directly: A is already diagonal-ish. Only the single nonzero singular value gets reciprocated. Then $x=A^{+}b$.",
              "solution": "A has one nonzero singular value $\\sigma_1=1$ with $u_1=(1,0,0)^\\top$, $v_1=(1,0)^\\top$. So $A^{+}=v_1\\frac{1}{\\sigma_1}u_1^\\top = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Then $x = A^{+}b = (2, 0)^\\top$. Check: $Ax=(2,0,0)^\\top$, residual $b-Ax=(0,5,7)^\\top$ which lies in the orthogonal complement of the column space — confirming it is the least-squares fit. Among all minimizers, $x=(2,0)$ has the smallest norm because the second coordinate is unconstrained by A and is set to 0."
            }
          ]
        }
      ]
    }
  ]
}
);
