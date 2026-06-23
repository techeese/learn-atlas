/* Atlas course — Probability & Statistics
   The 7th subject. Generated & adversarially fact-checked. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "probability-statistics",
  "title": "Probability & Statistics",
  "icon": "ℙ",
  "color": "#7aa7d0",
  "blurb": "From sample spaces to Bayes, distributions, and expectation — the mathematics of uncertainty that underpins all of machine learning.",
  "modules": [
    {
      "id": "ps-foundations",
      "title": "Foundations of Probability",
      "lessons": [
        {
          "id": "ps-sample-spaces-events",
          "title": "Sample Spaces, Events & the Axioms of Probability",
          "minutes": 14,
          "content": "<h3>1. The hook: taming chance with sets</h3>\\n<p>Flip a coin. You cannot predict the single outcome, yet over thousands of flips a stubborn regularity emerges: about half land heads. Probability is the mathematics of that regularity. The genius move, due to <strong>Andrey Kolmogorov</strong> in 1933, was to stop arguing about what randomness <em>is</em> and instead measure it with the same machinery we use for areas and weights: we list every possible outcome as a <em>set</em>, treat events as <em>subsets</em>, and assign each subset a number between 0 and 1. Everything that follows is bookkeeping on sets.</p>\\n\\n<h3>2. Random experiments, outcomes, and the sample space</h3>\\n<p>A <strong>random experiment</strong> is any procedure whose outcome is uncertain in advance but whose set of possible outcomes is known. Each indivisible result is an <strong>outcome</strong> (or sample point). The <strong>sample space</strong> $\\\\Omega$ is the set of <em>all</em> outcomes — they must be mutually exclusive and exhaustive, so exactly one occurs each trial.</p>\\n<ul>\\n<li>One coin flip: $\\\\Omega = \\\\{H, T\\\\}$.</li>\\n<li>One fair die: $\\\\Omega = \\\\{1, 2, 3, 4, 5, 6\\\\}$.</li>\\n<li>Two dice (ordered): $\\\\Omega = \\\\{(i,j) : 1 \\\\le i, j \\\\le 6\\\\}$, so $|\\\\Omega| = 36$.</li>\\n<li>Drawing one card: $|\\\\Omega| = 52$.</li>\\n</ul>\\n\\n<h3>3. Events as subsets of $\\\\Omega$</h3>\\n<p>An <strong>event</strong> is any subset $A \\\\subseteq \\\\Omega$; we say \\\"$A$ <em>occurs</em>\\\" when the realized outcome lies in $A$. For one die, \\\"even\\\" is the event $A = \\\\{2, 4, 6\\\\}$. The whole space $\\\\Omega$ is the <em>certain</em> event; the empty set $\\\\varnothing$ is the <em>impossible</em> event. Because events are sets, the language of set theory becomes the language of chance:</p>\\n<ul>\\n<li><strong>Union</strong> $A \\\\cup B$ — \\\"$A$ <em>or</em> $B$\\\" (at least one occurs).</li>\\n<li><strong>Intersection</strong> $A \\\\cap B$ — \\\"$A$ <em>and</em> $B$\\\" (both occur).</li>\\n<li><strong>Complement</strong> $A^c = \\\\Omega \\\\setminus A$ — \\\"<em>not</em> $A$\\\".</li>\\n<li><strong>Mutually exclusive / disjoint</strong>: $A \\\\cap B = \\\\varnothing$, meaning $A$ and $B$ cannot occur together.</li>\\n</ul>\\n<p><strong>Example.</strong> Roll one die. Let $A = \\\\{2,4,6\\\\}$ (even) and $B = \\\\{4,5,6\\\\}$ (greater than 3). Then $A \\\\cup B = \\\\{2,4,5,6\\\\}$, $A \\\\cap B = \\\\{4,6\\\\}$, and $A^c = \\\\{1,3,5\\\\}$. The events $A$ and $\\\\{1,3,5\\\\}$ are disjoint and together fill $\\\\Omega$.</p>\\n\\n<h3>4. The Kolmogorov axioms</h3>\\n<p>A <strong>probability measure</strong> $P$ assigns to each event a real number obeying three rules. Everything in probability is a logical consequence of them.</p>\\n<ul>\\n<li><strong>Axiom 1 (Nonnegativity).</strong> $P(A) \\\\ge 0$ for every event $A$.</li>\\n<li><strong>Axiom 2 (Normalization).</strong> $P(\\\\Omega) = 1$ — something certainly happens.</li>\\n<li><strong>Axiom 3 (Countable additivity).</strong> If $A_1, A_2, \\\\dots$ are pairwise disjoint, then $$P\\\\!\\\\left(\\\\bigcup_{i=1}^{\\\\infty} A_i\\\\right) = \\\\sum_{i=1}^{\\\\infty} P(A_i).$$</li>\\n</ul>\\n<p>The third axiom is the workhorse: probabilities of <em>non-overlapping</em> events simply add. From it everything else is derived — there are no extra assumptions hidden anywhere.</p>\\n\\n<h3>5. Equally likely outcomes and counting</h3>\\n<p>When $\\\\Omega$ is finite and every outcome is <em>equally likely</em> (a fair die, a well-shuffled deck), each of the $|\\\\Omega|$ outcomes carries probability $1/|\\\\Omega|$, and additivity gives the classical formula $$P(A) = \\\\frac{|A|}{|\\\\Omega|} = \\\\frac{\\\\text{favorable outcomes}}{\\\\text{total outcomes}}.$$</p>\\n<p><strong>Example.</strong> Roll two fair dice. What is $P(\\\\text{sum} = 7)$? The favorable outcomes are $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ — six of them — out of $36$, so $P = 6/36 = 1/6 \\\\approx 0.167$. The \\\"equally likely\\\" assumption must hold over the right $\\\\Omega$: here the $36$ <em>ordered</em> pairs are equally likely, while the $11$ possible sums are <em>not</em>.</p>\\n\\n<p>Count it directly. When every outcome is equally likely, a probability is just <em>favorable ÷ total</em>. Enumerate all $36$ rolls of two dice and count those summing to 7:</p>\n<div data-code=\"javascript\" data-expected=\"P(sum=7) = 6/36 = 0.167\">// Equally likely outcomes: probability = (favorable outcomes) / (total outcomes).\nlet favorable = 0, total = 0;\nfor (let a = 1; a &lt;= 6; a++)\n  for (let b = 1; b &lt;= 6; b++) {\n    total++;\n    if (a + b === 7) favorable++;   // (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\n  }\nconsole.log(\"P(sum=7) = \" + favorable + \"/\" + total + \" = \" + (favorable / total).toFixed(3));</div>\n<h3>6. The complement rule</h3>\\n<p>Since $A$ and $A^c$ are disjoint and $A \\\\cup A^c = \\\\Omega$, Axioms 2 and 3 give $P(A) + P(A^c) = 1$, hence $$P(A^c) = 1 - P(A).$$ This is the lazy mathematician's best friend: \\\"at least one\\\" problems are usually easier through their complement \\\"none\\\". Two consequences fall out immediately: $P(\\\\varnothing) = 1 - P(\\\\Omega) = 0$, and $0 \\\\le P(A) \\\\le 1$ for every event.</p>\\n<p><strong>Example.</strong> Roll a die twice; find $P(\\\\text{at least one } 6)$. The complement \\\"no 6 either roll\\\" has probability $(5/6)^2 = 25/36$, so the answer is $1 - 25/36 = 11/36 \\\\approx 0.306$.</p>\\n\\n<h3>7. Inclusion–exclusion for two events</h3>\n<div data-viz=\"ps-set-events\"></div>\\n<p>When $A$ and $B$ <em>overlap</em>, you cannot just add $P(A) + P(B)$ — outcomes in $A \\\\cap B$ get counted twice. Subtract the overlap once: $$P(A \\\\cup B) = P(A) + P(B) - P(A \\\\cap B).$$ If $A$ and $B$ are mutually exclusive then $P(A\\\\cap B)=0$ and this collapses to plain additivity.</p>\\n<p><strong>Example.</strong> Draw one card from $52$. Let $A = \\\\text{heart}$ and $B = \\\\text{face card}$ (J, Q, K). Then $P(A) = 13/52$, $P(B) = 12/52$, and the overlap (heart face cards: J, Q, K of hearts) is $P(A\\\\cap B) = 3/52$. So $$P(A \\\\cup B) = \\\\frac{13}{52} + \\\\frac{12}{52} - \\\\frac{3}{52} = \\\\frac{22}{52} = \\\\frac{11}{26} \\\\approx 0.423.$$</p>\\n\\n<h3>8. The big picture</h3>\\n<p>You now have the entire grammar of probability: a sample space $\\\\Omega$, events as subsets, three axioms, and two indispensable corollaries — the complement rule and inclusion–exclusion. Conditional probability, independence, and random variables are all built on exactly this foundation. Master the move of <em>translating a word problem into sets and then counting</em>, and the rest of the course is elaboration.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: probability is set theory with a measure</summary>\n<p>Before any formula, probability rests on three plain objects. The <b>sample space</b> $\\Omega$ is the set of all possible outcomes; an <b>event</b> is any subset of $\\Omega$ (the outcomes you care about); and a <b>probability</b> assigns each event a number obeying three axioms — it is never negative, $P(\\Omega) = 1$, and for disjoint events the probabilities add.</p>\n<p>Everything downstream is bookkeeping on this. \"A <em>or</em> B\" is the union $A \\cup B$; \"A <em>and</em> B\" the intersection $A \\cap B$; \"not A\" the complement. Inclusion-exclusion, $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$, is just counting outcomes without double-counting the overlap. Conditional probability, independence, and random variables are all defined on top of this set-plus-measure scaffold.</p>\n<p>The \"aha\": a messy \"what are the chances?\" becomes precise the moment you write down the sample space and the event as a subset of it. Naming $\\Omega$ first is the single most useful habit in probability.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the axioms and inclusion-exclusion</summary>\n<p>\"Probability is set theory with a measure\" — and that measure obeys just <b>three axioms</b> (Kolmogorov), from which every rule follows.</p>\n<p><b>The axioms.</b> (1) $P(A) \\ge 0$ for any event; (2) $P(\\Omega) = 1$ (something happens); (3) for <em>disjoint</em> events, $P(A \\cup B) = P(A) + P(B)$ (countable additivity). That is it — complements ($P(A^c) = 1 - P(A)$), monotonicity, and everything else are <em>derived</em>, not assumed.</p>\n<p><b>Inclusion-exclusion for overlaps.</b> The additivity axiom needs <em>disjoint</em> events. When $A$ and $B$ can both happen, naively adding double-counts the overlap, so $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. Example (one die): $A=\\{2,4,6\\}$ ($P=\\tfrac12$), $B=\\{4,5,6\\}$ ($P=\\tfrac12$), overlap $\\{4,6\\}$ ($P=\\tfrac13$), giving $P(A\\cup B) = \\tfrac12 + \\tfrac12 - \\tfrac13 = \\tfrac23$ — matching $\\{2,4,5,6\\}$. For three sets you add singles, subtract pairs, add the triple, and so on.</p>\n<p>The \"aha\": probability is not a pile of formulas — it is three axioms plus the bookkeeping to avoid double-counting. Inclusion-exclusion is just \"additivity, corrected for overlap,\" and it generalizes to any number of events (and underlies the union bound used all over ML theory).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: continuous sample spaces and why measure theory appears</summary>\n<p>The set-and-axioms picture works perfectly for dice and cards (finite outcomes). For <em>continuous</em> outcomes — a random real number in $[0,1]$ — it springs a subtle leak that leads straight to <strong>measure theory</strong>.</p>\n<p><b>Every point has probability zero.</b> Pick a uniform random real in $[0,1]$. Any <em>single</em> value $x$ has probability exactly $0$ (there are uncountably many, all equally likely). Yet the outcome <em>is</em> some value, and $P([0,1])=1$. So probability lives not on individual outcomes but on <em>sets</em> (intervals): $P([a,b])=b-a$. Probability becomes a way of measuring the \"size\" of a set — a <em>measure</em>.</p>\n<p><b>You can't measure every set.</b> The deeper surprise: you cannot consistently assign a probability to <em>every</em> subset of $[0,1]$ — pathological (non-measurable) sets exist for which no consistent value works. So the axioms are stated over a restricted family of \"nice\" sets, a <strong>σ-algebra</strong> of <em>measurable</em> events, closed under complements and countable unions. Kolmogorov's axioms (which you met for finite spaces) are really defined on this $(\\Omega, \\mathcal{F}, P)$ triple — sample space, σ-algebra, measure.</p>\n<p>The \"aha\": for continuous outcomes, probability shifts from points to <em>sets</em> (intervals carry probability; points carry zero), and because not every set can be measured, the rigorous foundation is measure theory — events form a σ-algebra and $P$ is a measure on it. The finite-case axioms you learned are the friendly shadow of this deeper structure.</p>\n</details>\n",
          "mcq": [
            {
              "q": "In Kolmogorov's framework, why is it useful to model events as *subsets* of the sample space $\\Omega$ rather than as informal verbal descriptions?",
              "choices": [
                "It lets us combine and manipulate events using set operations (union, intersection, complement) with established rules",
                "It guarantees every event has probability exactly $\\tfrac{1}{|\\Omega|}$",
                "It removes the need to specify $\\Omega$ in the first place",
                "It forces all outcomes to be equally likely"
              ],
              "answer": 0,
              "explain": "Modeling events as subsets means logical combinations of events become set operations, so all the algebra of sets applies directly. Equal probabilities are a special-case assumption, not a consequence of the set model."
            },
            {
              "q": "For the two-ordered-dice experiment with $|\\Omega| = 36$, let $A$ be the event \"the sum is 7.\" How many outcomes are in $A$?",
              "choices": [
                "5",
                "7",
                "6",
                "11"
              ],
              "answer": 2,
              "explain": "The ordered pairs summing to 7 are $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ — exactly 6 outcomes. The value 11 confuses the number of possible sums with the count of favorable outcomes."
            },
            {
              "q": "A student says, \"For two dice, the sample space is the set of possible sums $\\{2,3,\\dots,12\\}$, so there are 11 equally likely outcomes.\" What is the flaw?",
              "choices": [
                "The flaw is real: there really are 11 equally likely sums",
                "Sums cannot form a valid sample space at all",
                "The sample space should have 12 elements, not 11",
                "Sums are not equally likely; the natural equiprobable space is the 36 ordered pairs"
              ],
              "answer": 3,
              "explain": "The 11 sums are mutually exclusive and exhaustive, so they form a valid sample space, but they are NOT equally likely (a sum of 7 has 6 ways, a sum of 2 has 1). Equiprobability holds for the 36 ordered pairs, not the sums."
            },
            {
              "q": "Which property must the outcomes of a sample space $\\Omega$ satisfy?",
              "choices": [
                "They must be equally likely",
                "They must each be a subset of some larger set",
                "They must be finite in number",
                "They must be mutually exclusive and exhaustive, so exactly one occurs per trial"
              ],
              "answer": 3,
              "explain": "By definition the outcomes partition every trial: mutually exclusive (no two happen together) and exhaustive (at least one happens), so exactly one occurs. Outcomes need not be equally likely nor finite."
            },
            {
              "q": "Two events $A$ and $B$ are called *mutually exclusive* (disjoint) when:",
              "choices": [
                "$A \\cup B = \\Omega$",
                "$A \\subseteq B$",
                "$A = B^c$",
                "$A \\cap B = \\varnothing$"
              ],
              "answer": 3,
              "explain": "Mutually exclusive means the events cannot both occur, i.e. they share no outcomes: $A \\cap B = \\varnothing$. The condition $A \\cup B = \\Omega$ describes exhaustive (collectively covering) events, and $A = B^c$ is the stronger 'complementary' relationship."
            },
            {
              "q": "For a single fair die, let $A = \\{2,4,6\\}$ (even) and $B = \\{4,5,6\\}$ (greater than 3). What is the event \"$A$ occurs but $B$ does not,\" i.e. $A \\cap B^c$?",
              "choices": [
                "$\\{2\\}$",
                "$\\{2,4,6\\}$",
                "$\\{4,6\\}$",
                "$\\{1,3\\}$"
              ],
              "answer": 0,
              "explain": "$B^c = \\{1,2,3\\}$, and $A \\cap B^c = \\{2,4,6\\} \\cap \\{1,2,3\\} = \\{2\\}$. The choice $\\{4,6\\}$ is the opposite event $A\\cap B$."
            },
            {
              "q": "How many distinct events (subsets, including $\\varnothing$ and $\\Omega$) can be formed from a sample space with $|\\Omega| = 4$?",
              "choices": [
                "4",
                "16",
                "8",
                "24"
              ],
              "answer": 1,
              "explain": "The number of subsets of a set with $n$ elements is $2^n$, so $2^4 = 16$. The value 24 is $4!$ (orderings, not subsets), and 8 would be $2^3$."
            },
            {
              "q": "Which of the following is the correct statement of the three Kolmogorov axioms?",
              "choices": [
                "$P(A) > 0$; $P(\\Omega) = 1$; $P(A \\cup B) = P(A) + P(B)$ for all $A,B$",
                "$P(A) \\ge 0$; $P(\\Omega) = 1$; for disjoint $A,B$, $P(A \\cup B) = P(A) + P(B)$",
                "$0 \\le P(A) \\le 1$; $P(\\varnothing) = 1$; $P(A \\cap B) = P(A)P(B)$",
                "$P(A) \\ge 0$; $P(\\Omega) = \\infty$; $P(A \\cup B) = P(A)\\,P(B)$"
              ],
              "answer": 1,
              "explain": "The axioms are non-negativity ($P(A)\\ge 0$), normalization ($P(\\Omega)=1$), and additivity for disjoint events ($P(A\\cup B)=P(A)+P(B)$). Additivity requires disjointness, $P(A)$ can be 0, and $P(A)P(B)$ describes independence — a separate notion, not an axiom."
            },
            {
              "q": "A student claims $P(A \\cup B) = P(A) + P(B)$ for the events $A=\\{2,4,6\\}$ and $B=\\{4,5,6\\}$ on a fair die, computing $\\tfrac{3}{6}+\\tfrac{3}{6}=1$. Why is this wrong, and what is the correct value?",
              "choices": [
                "It is correct; $P(A\\cup B)=1$",
                "The correct value is $\\tfrac{6}{6}=1$ because the die has 6 faces",
                "Additivity needs disjoint events; here $A\\cap B=\\{4,6\\}$, so $P(A\\cup B)=\\tfrac{4}{6}$",
                "Additivity always holds, so $P(A\\cup B)=\\tfrac{3}{6}$"
              ],
              "answer": 2,
              "explain": "The additivity axiom only applies to disjoint events. Since $A$ and $B$ overlap in $\\{4,6\\}$, we must use inclusion-exclusion: $A\\cup B = \\{2,4,5,6\\}$, giving $P(A\\cup B)=\\tfrac{4}{6}=\\tfrac{2}{3}$, not 1."
            },
            {
              "q": "Using only the axioms, which statement about the complement $A^c$ must hold?",
              "choices": [
                "$P(A^c) = P(A)$",
                "$P(A^c) = 1 - P(A)$",
                "$P(A^c) = 1 + P(A)$",
                "$P(A^c) = \\tfrac{1}{P(A)}$"
              ],
              "answer": 1,
              "explain": "Since $A$ and $A^c$ are disjoint with $A \\cup A^c = \\Omega$, additivity and normalization give $P(A)+P(A^c)=P(\\Omega)=1$, hence $P(A^c)=1-P(A)$. This is a derived theorem, not a separate axiom."
            },
            {
              "q": "One card is drawn from a standard deck ($|\\Omega|=52$). What is the probability the card is a face card (J, Q, or K) OR a heart?",
              "choices": [
                "$\\frac{12}{52}$",
                "$\\frac{25}{52}$",
                "$\\frac{16}{52}$",
                "$\\frac{22}{52}$"
              ],
              "answer": 3,
              "explain": "There are 12 face cards and 13 hearts, overlapping in 3 (J, Q, K of hearts). By inclusion-exclusion: $\\tfrac{12}{52}+\\tfrac{13}{52}-\\tfrac{3}{52}=\\tfrac{22}{52}$. The answer $\\tfrac{25}{52}$ is the common error of forgetting to subtract the overlap."
            },
            {
              "q": "If $A \\subseteq B$ as events, which inequality between their probabilities is guaranteed by the axioms (monotonicity)?",
              "choices": [
                "$P(A) \\ge P(B)$",
                "$P(A) \\le P(B)$",
                "$P(A) = P(B)$",
                "$P(A) + P(B) = 1$"
              ],
              "answer": 1,
              "explain": "Write $B = A \\cup (B \\setminus A)$ as a disjoint union; additivity gives $P(B)=P(A)+P(B\\setminus A)$, and since $P(B\\setminus A)\\ge 0$ we get $P(A)\\le P(B)$. A smaller event can never be more probable than the larger one containing it."
            },
            {
              "q": "You roll a fair die twice. Using the complement rule, what is $P(\\text{at least one } 6)$?",
              "choices": [
                "$1 - \\left(\\frac{5}{6}\\right)^2 = \\frac{11}{36}$ — one minus the probability of \"no 6 on either roll.\"",
                "$\\frac{2}{6} = \\frac{1}{3}$, by adding the chance of a 6 on each roll.",
                "$\\left(\\frac{1}{6}\\right)^2 = \\frac{1}{36}$, the chance of a 6 on both rolls.",
                "$\\frac{6}{36} = \\frac{1}{6}$, since there are 6 faces that could be a 6."
              ],
              "answer": 0,
              "explain": "\"At least one\" is easiest through its complement \"none.\" $P(\\text{no 6 on a roll}) = \\frac{5}{6}$, and the rolls are independent, so $P(\\text{no 6 either roll}) = (5/6)^2 = 25/36$. Thus $P(\\text{at least one } 6) = 1 - 25/36 = 11/36 \\approx 0.306$. (Adding $\\frac16+\\frac16$ double-counts the $(6,6)$ outcome.)"
            },
            {
              "q": "Which of the following is a *derived consequence* of Kolmogorov's axioms, NOT one of the three axioms itself?",
              "choices": [
                "$P(A) \\ge 0$ for every event $A$.",
                "$P(\\Omega) = 1$.",
                "$P(A^c) = 1 - P(A)$ (the complement rule).",
                "For pairwise-disjoint events, the probability of their union equals the sum of their probabilities."
              ],
              "answer": 2,
              "explain": "The three axioms are nonnegativity ($P(A)\\ge 0$), normalization ($P(\\Omega)=1$), and countable additivity (disjoint unions add). The complement rule is a *theorem* derived from them: since $A$ and $A^c$ are disjoint and union to $\\Omega$, additivity + normalization give $P(A)+P(A^c)=1$. So too are $P(\\varnothing)=0$ and $0\\le P(A)\\le 1$."
            },
            {
              "q": "Roll two fair dice (the 36 ordered pairs are equally likely). What is the probability of rolling \"doubles\" (both dice show the same number)?",
              "choices": [
                "$\\frac{1}{36}$",
                "$\\frac{11}{36}$",
                "$\\frac{6}{36} = \\frac{1}{6}$",
                "$\\frac{12}{36} = \\frac{1}{3}$"
              ],
              "answer": 2,
              "explain": "By the classical formula $P(A)=|A|/|\\Omega|$, count the favorable outcomes: $(1,1),(2,2),(3,3),(4,4),(5,5),(6,6)$ — six of them — out of $|\\Omega|=36$ equally-likely ordered pairs. So $P(\\text{doubles}) = 6/36 = 1/6$."
            },
            {
              "q": "For two events, $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \\cup B) = 0.6$. What is $P(A \\cap B)$?",
              "choices": [
                "$0.3$, from $P(A\\cap B) = P(A) + P(B) - P(A \\cup B)$.",
                "$0.9$, since $P(A \\cap B) = P(A) + P(B)$.",
                "$0$, because the events must be mutually exclusive.",
                "$0.2$, since $P(A\\cap B) = P(A)\\,P(B)$."
              ],
              "answer": 0,
              "explain": "Rearrange inclusion–exclusion $P(A\\cup B) = P(A)+P(B)-P(A\\cap B)$ to solve for the overlap: $P(A\\cap B) = 0.5+0.4-0.6 = 0.3$. Choice D assumes independence ($P(A)P(B)=0.2$), which is not given and is false here; choice B forgets to subtract the overlap; the events clearly overlap since $0.5+0.4>0.6$."
            }
          ],
          "flashcards": [
            {
              "front": "What is the sample space $\\Omega$ of a random experiment?",
              "back": "The set of <strong>all</strong> possible outcomes, which are mutually exclusive and exhaustive (exactly one occurs each trial). Example: one die gives $\\Omega = \\{1,2,3,4,5,6\\}$; two ordered dice give $|\\Omega| = 36$."
            },
            {
              "front": "State the three Kolmogorov axioms.",
              "back": "(1) <strong>Nonnegativity:</strong> $P(A) \\ge 0$. (2) <strong>Normalization:</strong> $P(\\Omega) = 1$. (3) <strong>Countable additivity:</strong> for pairwise-disjoint $A_1, A_2, \\dots$, $P\\!\\left(\\bigcup_i A_i\\right) = \\sum_i P(A_i)$."
            },
            {
              "front": "What does it mean for events $A$ and $B$ to be mutually exclusive (disjoint), and what is $P(A\\cup B)$ then?",
              "back": "$A \\cap B = \\varnothing$: they cannot both occur. Then the overlap term vanishes, so $P(A \\cup B) = P(A) + P(B)$."
            },
            {
              "front": "The classical (equally-likely) probability formula.",
              "back": "If $\\Omega$ is finite with all outcomes equally likely, then $$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{\\text{favorable}}{\\text{total}}.$$ Requires the equally-likely assumption to hold over the correct $\\Omega$."
            },
            {
              "front": "State and justify the complement rule.",
              "back": "$P(A^c) = 1 - P(A)$. Because $A$ and $A^c$ are disjoint with $A \\cup A^c = \\Omega$, Axioms 2 and 3 give $P(A) + P(A^c) = P(\\Omega) = 1$. It also yields $P(\\varnothing)=0$."
            },
            {
              "front": "State the inclusion–exclusion rule for two events and why the subtraction is needed.",
              "back": "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. Adding $P(A)+P(B)$ double-counts the outcomes in $A\\cap B$, so the overlap is subtracted once."
            }
          ],
          "homework": [
            {
              "prompt": "A single fair die is rolled. Let $A = \\{$even$\\} = \\{2,4,6\\}$ and $B = \\{$at least 5$\\} = \\{5,6\\}$. Find $P(A)$, $P(B)$, $P(A \\cap B)$, $P(A \\cup B)$, and $P(A^c)$.",
              "hint": "Use $P(\\cdot) = |\\cdot|/6$, list the intersection explicitly, then apply inclusion–exclusion and the complement rule.",
              "solution": "$|\\Omega| = 6$. $P(A) = 3/6 = 1/2$ and $P(B) = 2/6 = 1/3$. The intersection $A \\cap B = \\{6\\}$, so $P(A\\cap B) = 1/6$. By inclusion–exclusion, $$P(A \\cup B) = \\tfrac{3}{6} + \\tfrac{2}{6} - \\tfrac{1}{6} = \\tfrac{4}{6} = \\tfrac{2}{3}.$$ (Check: $A \\cup B = \\{2,4,5,6\\}$, indeed $4/6$.) The complement rule gives $P(A^c) = 1 - 1/2 = 1/2$ (namely $\\{1,3,5\\}$)."
            },
            {
              "prompt": "Two fair dice are rolled. Find the probability that the sum is at least $4$.",
              "hint": "\"At least 4\" is the complement of \"sum is 2 or 3.\" Count the few outcomes giving sums of 2 and 3 over the 36 equally-likely ordered pairs.",
              "solution": "Work with the complement $C = \\{$sum $\\le 3\\} = \\{$sum is 2 or 3$\\}$. Sum $= 2$: only $(1,1)$. Sum $= 3$: $(1,2)$ and $(2,1)$. So $|C| = 3$ and $P(C) = 3/36 = 1/12$. Therefore $$P(\\text{sum} \\ge 4) = 1 - \\tfrac{1}{12} = \\tfrac{11}{12} \\approx 0.917.$$"
            },
            {
              "prompt": "One card is drawn from a standard 52-card deck. Let $A$ be the event the card is a $\\spadesuit$ (spade) and $B$ the event the card is an ace. Find $P(A \\cup B)$, then $P(\\text{neither a spade nor an ace})$.",
              "hint": "There are 13 spades, 4 aces, and exactly one card that is both (the ace of spades). Apply inclusion–exclusion, then take the complement of the union.",
              "solution": "$P(A) = 13/52$, $P(B) = 4/52$, and $A \\cap B = \\{$ace of spades$\\}$ so $P(A \\cap B) = 1/52$. By inclusion–exclusion, $$P(A \\cup B) = \\tfrac{13}{52} + \\tfrac{4}{52} - \\tfrac{1}{52} = \\tfrac{16}{52} = \\tfrac{4}{13} \\approx 0.308.$$ \"Neither a spade nor an ace\" is $(A \\cup B)^c$, so by the complement rule $$P((A\\cup B)^c) = 1 - \\tfrac{16}{52} = \\tfrac{36}{52} = \\tfrac{9}{13} \\approx 0.692.$$ (Check: 39 non-spades minus the 3 non-spade aces $= 36$ favorable cards.)"
            }
          ],
          "examples": [
            {
              "title": "Reading a two-dice sample space",
              "body": "Two fair dice are rolled. Using the sample space of $36$ equally-likely ordered pairs $(i,j)$, compute the probability that the sum equals $8$, and separately the probability that the sum equals $8$ <em>or</em> a double (both dice show the same face) is rolled.",
              "solution": "The sample space has $|\\Omega| = 6 \\times 6 = 36$ equally-likely outcomes.\n\n<strong>Sum equals 8.</strong> The favorable pairs are $(2,6),(3,5),(4,4),(5,3),(6,2)$ — five of them. So $$P(\\text{sum}=8) = \\frac{5}{36} \\approx 0.139.$$\n\n<strong>Sum is 8 OR a double.</strong> Let $A = \\{\\text{sum}=8\\}$ (the 5 pairs above) and $B = \\{\\text{doubles}\\} = \\{(1,1),(2,2),\\dots,(6,6)\\}$, so $|B| = 6$. The overlap is $A \\cap B = \\{(4,4)\\}$, the only double summing to 8, giving $|A \\cap B| = 1$. By inclusion–exclusion, $$P(A \\cup B) = \\frac{5}{36} + \\frac{6}{36} - \\frac{1}{36} = \\frac{10}{36} = \\frac{5}{18} \\approx 0.278.$$ Adding $5/36 + 6/36$ without subtracting would wrongly count $(4,4)$ twice."
            },
            {
              "title": "At least one head in three coin flips",
              "body": "A fair coin is flipped three times. Find the probability of getting <em>at least one</em> head. Then find the probability of getting <em>exactly two</em> heads.",
              "solution": "Each flip is independent with two equally-likely results, so $\\Omega$ has $2^3 = 8$ equally-likely sequences (e.g. $HHT$, $TTH$, $\\dots$).\n\n<strong>At least one head.</strong> The complement is \"no heads at all,\" i.e. the single outcome $TTT$, with $P(TTT) = 1/8$. By the complement rule, $$P(\\text{at least one head}) = 1 - \\frac{1}{8} = \\frac{7}{8} = 0.875.$$ This is far cleaner than summing the cases of one, two, and three heads separately.\n\n<strong>Exactly two heads.</strong> The favorable sequences are $HHT, HTH, THH$ — three of them — so $$P(\\text{exactly two heads}) = \\frac{3}{8} = 0.375.$$ (These are the $\\binom{3}{2} = 3$ ways to choose which two of the three flips are heads.)"
            },
            {
              "title": "Inclusion-exclusion: don't double-count the overlap",
              "body": "Draw one card from a standard 52-card deck. What is the probability it is a <em>heart or a face card</em> (J, Q, K)?",
              "solution": "<strong>Naively adding overcounts.</strong> There are 13 hearts and 12 face cards, but $13 + 12 = 25$ is wrong — the three cards that are <em>both</em> (J, Q, K of hearts) got counted twice.\n<strong>Inclusion-exclusion.</strong> $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ — add the two events, then subtract their overlap once to fix the double-count:\n$$P(\\text{heart} \\cup \\text{face}) = \\frac{13}{52} + \\frac{12}{52} - \\frac{3}{52} = \\frac{22}{52} = \\frac{11}{26} \\approx 0.423.$$\n<strong>Why the subtraction.</strong> Each card in the overlap is included in both $P(A)$ and $P(B)$, so summing counts it twice; subtracting $P(A \\cap B)$ once restores a single count. For disjoint events ($A \\cap B = \\varnothing$) the correction is zero and probabilities simply add.\n<strong>The aha.</strong> \"Or\" is addition <em>minus</em> the overlap. The principle scales: for three sets you add singles, subtract pairs, add the triple — the alternating inclusion-exclusion that fixes every layer of double-counting."
            }
          ]
        },
        {
          "id": "ps-conditional-independence-bayes",
          "title": "Conditional Probability, Independence & Bayes' Theorem",
          "minutes": 16,
          "content": "<h3>1. The intuition: information changes the odds</h3>\n<p>Probability is not a fixed property of an event — it is a measure of belief <em>relative to what you know</em>. Draw a card from a shuffled deck and the chance it is the ace of spades is $1/52$. But if a friend peeks and tells you the card is black, that single fact slashes the field from 52 cards to 26, and the probability jumps to $1/26$. Nothing about the card changed; <strong>your information did</strong>. Conditional probability is the machinery for revising beliefs in light of evidence, and it culminates in <strong>Bayes' theorem</strong>, the engine behind spam filters, medical diagnosis, and every learning system that updates as data arrives.</p>\n<div data-viz=\"calc-bayes\"></div>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Conditioning on $B$ means <em>throwing away the part of the universe where $B$ is false and renormalizing</em>. You zoom into $B$ and treat it as your new sample space. Everything else follows from that one move.</p>\n</div>\n\n<h3>2. Conditional probability, formally</h3>\n<p>Given events $A$ and $B$ with $P(B) > 0$, the <strong>conditional probability of $A$ given $B$</strong> is</p>\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}.$$\n<p>The denominator $P(B)$ is the renormalization: we restrict attention to outcomes in $B$ and ask what fraction of <em>those</em> also lie in $A$. <strong>Concrete example.</strong> Roll a fair die. Let $A = \\{\\text{outcome is } 2\\}$ and $B = \\{\\text{outcome is even}\\}$. Then $P(A \\cap B) = P(\\{2\\}) = 1/6$ and $P(B) = 3/6$, so</p>\n$$P(A \\mid B) = \\frac{1/6}{3/6} = \\frac{1}{3}.$$\n<p>Knowing the roll is even raised the chance it is a 2 from $1/6$ to $1/3$ — exactly because we discarded the three odd outcomes.</p>\n\n<h3>3. The multiplication rule</h3>\n<p>Rearranging the definition gives the <strong>multiplication rule</strong>, a way to compute the probability of a joint event step by step:</p>\n$$P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A).$$\n<p>This chains: $P(A \\cap B \\cap C) = P(A)\\,P(B \\mid A)\\,P(C \\mid A \\cap B)$. <strong>Example.</strong> Draw two cards without replacement. The probability both are aces is $P(\\text{ace}_1)\\,P(\\text{ace}_2 \\mid \\text{ace}_1) = \\frac{4}{52}\\cdot\\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$.</p>\n\n<h3>4. Independence (and why it is not mutual exclusivity)</h3>\n<p>Events $A$ and $B$ are <strong>independent</strong> if knowing one tells you nothing about the other: $P(A \\mid B) = P(A)$. Multiplying through by $P(B)$ gives the symmetric, clean definition</p>\n$$P(A \\cap B) = P(A)\\,P(B).$$\n<p>A frequent confusion is conflating <strong>independent</strong> with <strong>mutually exclusive</strong> (disjoint). They are nearly opposite. If $A$ and $B$ are mutually exclusive with positive probabilities, then $A \\cap B = \\varnothing$, so $P(A \\cap B) = 0 \\ne P(A)P(B)$ — and learning $B$ happened tells you $A$ <em>cannot</em> have. <strong>Disjoint events with positive probability are maximally dependent, never independent.</strong> In the die example, $\\{2\\}$ and \"even\" are dependent; $\\{2\\}$ and \"odd\" are mutually exclusive.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>The \"naive\" in <em>naive Bayes</em> is the assumption that features are conditionally independent given the label. Likelihoods of i.i.d. data factor into a product, $\\prod_i P(x_i \\mid \\theta)$, precisely because of independence — and taking logs turns that product into the sums you minimize during training.</p>\n</div>\n\n<h3>5. The law of total probability</h3>\n<p>Suppose events $B_1, \\dots, B_n$ form a <strong>partition</strong> of the sample space: they are mutually exclusive and together exhaustive ($\\bigcup_i B_i = \\Omega$). Then any event $A$ can be reassembled from its slices inside each $B_i$:</p>\n$$P(A) = \\sum_{i=1}^{n} P(A \\mid B_i)\\,P(B_i).$$\n<p>This is a weighted average of conditional probabilities, weighted by how likely each scenario $B_i$ is. <strong>Example.</strong> Two factories make light bulbs: Factory 1 supplies $60\\%$ with a $2\\%$ defect rate, Factory 2 supplies $40\\%$ with a $5\\%$ rate. The chance a random bulb is defective is $P(D) = (0.02)(0.6) + (0.05)(0.4) = 0.012 + 0.020 = 0.032$, or $3.2\\%$.</p>\n\n<h3>6. Bayes' theorem: reversing the conditional</h3>\n<p>We often know $P(\\text{evidence} \\mid \\text{cause})$ but want $P(\\text{cause} \\mid \\text{evidence})$. Combining the multiplication rule with the law of total probability yields <strong>Bayes' theorem</strong>:</p>\n$$P(B_i \\mid A) = \\frac{P(A \\mid B_i)\\,P(B_i)}{\\sum_{j} P(A \\mid B_j)\\,P(B_j)}.$$\n<p>Read it as <em>posterior</em> $\\propto$ <em>likelihood</em> $\\times$ <em>prior</em>. The prior $P(B_i)$ is your belief before evidence; the likelihood $P(A \\mid B_i)$ says how well cause $B_i$ explains the evidence; the denominator just normalizes so the posteriors sum to 1. Continuing the bulb example: given a bulb is defective, the probability it came from Factory 2 is $\\frac{(0.05)(0.4)}{0.032} = \\frac{0.020}{0.032} = 0.625$ — even though Factory 2 supplies the minority of bulbs, it dominates the defectives.</p>\n\n<h3>7. The base-rate trap: why most positives can be false</h3>\n<p>Here is the example that breaks everyone's intuition. A disease afflicts $1$ in $1000$ people. A test is $99\\%$ accurate: it catches $99\\%$ of sick people (sensitivity) and gives a false positive for only $1\\%$ of healthy people. You test positive. What is the chance you are sick? Let $D$ = disease, $+$ = positive test. The prior is $P(D) = 0.001$. By the law of total probability,</p>\n$$P(+) = \\underbrace{(0.99)(0.001)}_{\\text{true positives}} + \\underbrace{(0.01)(0.999)}_{\\text{false positives}} = 0.00099 + 0.00999 = 0.01098.$$\n$$P(D \\mid +) = \\frac{0.00099}{0.01098} \\approx 0.090.$$\n<p>Only about <strong>9%</strong>. Despite the impressive-sounding \"99% accurate,\" a positive result is wrong over $90\\%$ of the time — because the healthy population is so vast that its $1\\%$ error rate produces ten times more false positives than there are true cases. This is <strong>base-rate neglect</strong>: ignore the prior and you will badly overestimate the posterior.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the same result in plain counts (natural frequencies)</summary>\n<p>If the probabilities feel slippery, drop them entirely and think in <strong>whole people</strong>. Imagine $10{,}000$ individuals:</p>\n<ul>\n<li>About $10$ actually have the disease ($1$ in $1000$). The test catches $99\\%$ of them, so $\\approx 10$ test positive.</li>\n<li>The other $9{,}990$ are healthy. The test wrongly flags $1\\%$ of them, so $\\approx 100$ test positive.</li>\n</ul>\n<p>So $\\approx 110$ people test positive in total, but only $\\approx 10$ are truly sick: $10/110 \\approx 9\\%$ — the same answer Bayes gave, with no fractions to juggle. Recasting a Bayes problem as counts out of a fixed population is a well-known way (Gigerenzer's \"natural frequencies\") to make the base-rate effect <em>obvious</em>: the $100$ false alarms simply swamp the $10$ true cases. When a Bayesian calculation feels counterintuitive, re-run it in head-count form.</p>\n</details>\n\n<h3>8. Tree diagrams and the visualization</h3>\n<p>A <strong>tree diagram</strong> makes these computations visceral. Branch first on the hidden cause (sick vs. healthy), labeling each branch with its prior; then branch on the evidence (test result), labeling with the likelihoods. Each leaf's probability is the product along its path (the multiplication rule), the law of total probability is the <em>sum</em> of leaves matching the evidence, and Bayes' theorem is the <em>ratio</em> of one favorable leaf to that sum. Try the interactive <strong>Bayes visualization</strong> in this course: drag the base rate and watch the posterior collapse — it shows, in real time, why a great test can still mislead when the disease is rare.</p>\n<h3>Code it: Bayes' rule and the false-alarm trap</h3>\n<p>The famous counter-intuitive result, in eight lines. A test that is 99% accurate, applied to a disease only 1% of people have, gives a positive result that is <em>wrong about 83% of the time</em>. Run it — then drop <code>pD</code> to <code>0.001</code> and watch the posterior collapse further.</p>\n<div data-code=\"javascript\" data-expected=\"P(+)     = 0.0594\nP(D | +) = 0.1667\nMost positives are FALSE alarms when the disease is rare.\">// Bayes' theorem: a 99%-accurate test for a rare (1%) disease.\nconst pD   = 0.01;   // prior: P(disease)        — 1% prevalence\nconst sens = 0.99;   // P(+ | disease)           — sensitivity\nconst fpr  = 0.05;   // P(+ | no disease)        — false-positive rate\n\n// Law of total probability — how often the test fires at all:\nconst pPos = sens * pD + fpr * (1 - pD);\n\n// Posterior: given a POSITIVE test, how likely is disease?\nconst post = (sens * pD) / pPos;\n\nconsole.log(\"P(+)     = \" + pPos.toFixed(4));\nconsole.log(\"P(D | +) = \" + post.toFixed(4));\nconsole.log(\"Most positives are FALSE alarms when the disease is rare.\");</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: what \"naive\" Bayes naively assumes</summary>\n<p>The lesson's other half — <b>conditional independence</b> — is the engine behind the naive Bayes classifier. Two features are conditionally independent given the class if $P(x_1, x_2 \\mid c) = P(x_1 \\mid c)\\,P(x_2 \\mid c)$: once you know the class, one feature tells you nothing extra about the other.</p>\n<p>Naive Bayes <em>assumes</em> this for all features, so the joint likelihood factorizes into a product of simple per-feature terms — $P(c \\mid x) \\propto P(c)\\prod_i P(x_i \\mid c)$ — turning an intractable joint distribution into a handful of easy 1-D estimates. The catch: the assumption is usually <b>false</b> (words in an email are not really independent), so the probability <em>estimates</em> come out poorly calibrated.</p>\n<p>The \"aha\": naive Bayes works well anyway — because classification needs only the <em>argmax</em>, not accurate probabilities. Even when conditional independence is violated and the numbers are off, the <em>ranking</em> of classes is often still right, so the decision survives. It is a striking case of a wrong assumption yielding a useful model: fast, data-efficient, and a strong baseline for text.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the odds form of Bayes (likelihood-ratio updating)</summary>\n<p>Bayes' theorem is cleanest in <b>odds form</b>, where updating on evidence becomes a single multiplication: <em>posterior odds = prior odds × likelihood ratio</em>.</p>\n<p><b>The rule.</b> For a hypothesis $H$ and evidence $E$, $\\dfrac{P(H\\mid E)}{P(\\lnot H\\mid E)} = \\dfrac{P(H)}{P(\\lnot H)} \\times \\dfrac{P(E\\mid H)}{P(E\\mid \\lnot H)}$. The last factor is the <b>likelihood ratio</b> (LR) — how much more likely the evidence is under $H$ than under $\\lnot H$. The annoying normalizing constant $P(E)$ cancels entirely.</p>\n<p><b>Worked example.</b> A disease has prevalence $0.1\\%$, so prior odds $1:999$. A test is 99% sensitive and 99% specific, so $\\text{LR}^+ = \\tfrac{0.99}{0.01} = 99$. A positive result updates the odds to $1\\times99 : 999 = 99:999 \\approx 1:10$ — a posterior probability of only about $9\\%$. The strong test moved the odds by 99x, but the tiny prior still wins: the base-rate effect, made arithmetic.</p>\n<p><b>Why it is powerful.</b> Multiple independent pieces of evidence just <em>multiply their LRs</em>: $\\text{odds}_{\\text{post}} = \\text{odds}_{\\text{prior}} \\times \\text{LR}_1 \\times \\text{LR}_2 \\times \\cdots$. Sequential belief updating becomes repeated multiplication — the engine behind spam filters, medical diagnosis, and Bayesian inference. (Working in log-odds turns it into addition, which is exactly a logistic-regression score.)</p>\n<p>The \"aha\": stop juggling $P(E)$. In odds form, each new clue simply multiplies your prior odds by its likelihood ratio — evidence <em>scales</em> belief. It is the most usable form of Bayes, and it makes the base-rate effect a one-line calculation.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A fair die is rolled. Let $A = \\{\\text{outcome is } 2\\}$ and $B = \\{\\text{outcome is even}\\}$. What is $P(A \\mid B)$?",
              "choices": [
                "$\\frac{1}{6}$",
                "$\\frac{1}{2}$",
                "$\\frac{1}{3}$",
                "$\\frac{2}{3}$"
              ],
              "answer": 2,
              "explain": "$P(A \\cap B) = P(\\{2\\}) = 1/6$ and $P(B) = 3/6 = 1/2$, so $P(A\\mid B) = (1/6)/(1/2) = 1/3$. Conditioning on 'even' restricts the sample space to $\\{2,4,6\\}$, of which one is a 2."
            },
            {
              "q": "In the deck example, a card is drawn and a friend says 'it is black.' Why does the probability it is the ace of spades become $1/26$ rather than staying $1/52$?",
              "choices": [
                "The information changed which physical card is on top",
                "The deck was reshuffled after the friend peeked",
                "Black cards are intrinsically more likely to be aces",
                "Conditioning discards the 26 red outcomes and renormalizes over the 26 black ones"
              ],
              "answer": 3,
              "explain": "Conditioning on $B$ throws away the part of the sample space where $B$ is false (the 26 red cards) and renormalizes over the 26 black cards. The card itself did not change; only the information did."
            },
            {
              "q": "Which expression correctly rearranges the definition of conditional probability into the multiplication (chain) rule for $P(A \\cap B)$?",
              "choices": [
                "$P(A \\cap B) = P(A \\mid B) + P(B)$",
                "$P(A \\cap B) = P(A \\mid B)\\,P(B)$",
                "$P(A \\cap B) = \\frac{P(A \\mid B)}{P(B)}$",
                "$P(A \\cap B) = P(A \\mid B) \\, P(A)$"
              ],
              "answer": 1,
              "explain": "Multiplying both sides of $P(A\\mid B) = P(A\\cap B)/P(B)$ by $P(B)$ gives $P(A\\cap B) = P(A\\mid B)\\,P(B)$. The version with $P(A)$ would only hold under independence, not in general."
            },
            {
              "q": "Two events $A$ and $B$ are independent. Which equality must hold?",
              "choices": [
                "$P(A \\cap B) = P(A) + P(B)$",
                "$P(A \\mid B) = P(B \\mid A)$",
                "$P(A \\cap B) = P(A)\\,P(B)$",
                "$P(A \\cup B) = P(A)\\,P(B)$"
              ],
              "answer": 2,
              "explain": "Independence is defined by $P(A\\cap B) = P(A)P(B)$, equivalently $P(A\\mid B)=P(A)$ when $P(B)>0$. The first option describes (almost) disjoint behavior, and $P(A\\mid B)=P(B\\mid A)$ holds only when $P(A)=P(B)$."
            },
            {
              "q": "A student says: 'If $A$ and $B$ are mutually exclusive (disjoint) and both have positive probability, then they are independent.' Why is this wrong?",
              "choices": [
                "Disjoint events have $P(A \\cap B) = 0$, but $P(A)P(B) > 0$, so they cannot be independent",
                "Disjoint events satisfy $P(A \\cap B) = P(A)P(B)$ automatically",
                "Mutual exclusivity is the same as independence by definition",
                "Independence requires $P(A \\cup B) = 1$"
              ],
              "answer": 0,
              "explain": "For disjoint events $P(A\\cap B)=0$, yet if both have positive probability then $P(A)P(B)>0$, so $P(A\\cap B)\\ne P(A)P(B)$. In fact disjoint positive-probability events are strongly dependent: knowing $B$ happened guarantees $A$ did not."
            },
            {
              "q": "Bayes' theorem expresses $P(A \\mid B)$ in terms of $P(B \\mid A)$. Which form is correct?",
              "choices": [
                "$P(A \\mid B) = P(B \\mid A)\\,\\frac{P(B)}{P(A)}$",
                "$P(A \\mid B) = \\frac{P(B \\mid A)\\,P(B)}{P(A)}$",
                "$P(A \\mid B) = \\frac{P(B \\mid A)}{P(A)\\,P(B)}$",
                "$P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}$"
              ],
              "answer": 3,
              "explain": "Bayes' theorem follows from $P(A\\cap B)=P(B\\mid A)P(A)=P(A\\mid B)P(B)$, giving $P(A\\mid B)=P(B\\mid A)P(A)/P(B)$. The prior $P(A)$ is multiplied in the numerator, not divided."
            },
            {
              "q": "A disease affects $1\\%$ of a population. A test is $99\\%$ sensitive ($P(+\\mid D)=0.99$) and $99\\%$ specific ($P(-\\mid D^c)=0.99$). A person tests positive. What is the probability they actually have the disease?",
              "choices": [
                "$0.99$",
                "About $0.50$",
                "About $0.91$",
                "$0.01$"
              ],
              "answer": 1,
              "explain": "$P(D\\mid +) = \\frac{0.99 \\cdot 0.01}{0.99\\cdot 0.01 + 0.01\\cdot 0.99} = \\frac{0.0099}{0.0198} = 0.5$. The intuitive answer $0.99$ ignores the base rate: with only $1\\%$ prevalence, false positives from the $99\\%$ healthy people roughly equal the true positives."
            },
            {
              "q": "The 'base-rate fallacy' in the disease-testing example refers to which mistake?",
              "choices": [
                "Confusing the test's sensitivity with its specificity",
                "Assuming the test is never wrong",
                "Treating $P(D \\mid +)$ as equal to $P(+ \\mid D)$ while ignoring the prior $P(D)$",
                "Multiplying instead of adding probabilities"
              ],
              "answer": 2,
              "explain": "The fallacy is conflating $P(D\\mid +)$ with $P(+\\mid D)$ and neglecting the low prior $P(D)$. Bayes' theorem shows the prior heavily discounts the posterior when the disease is rare."
            },
            {
              "q": "Using the law of total probability, if $\\{B_1, B_2\\}$ partition the sample space, then $P(A)$ equals:",
              "choices": [
                "$P(A \\mid B_1)\\,P(B_1) + P(A \\mid B_2)\\,P(B_2)$",
                "$P(A \\mid B_1) + P(A \\mid B_2)$",
                "$P(A \\mid B_1)\\,P(A \\mid B_2)$",
                "$\\frac{P(A \\mid B_1)}{P(B_1)} + \\frac{P(A \\mid B_2)}{P(B_2)}$"
              ],
              "answer": 0,
              "explain": "The law of total probability weights each conditional by the probability of its conditioning event: $P(A)=\\sum_i P(A\\mid B_i)P(B_i)$. Simply adding the conditionals (option 1) forgets the weights and can even exceed 1."
            },
            {
              "q": "It is true that $P(A \\mid B) = 0.9$. A student concludes $P(B \\mid A) = 0.9$ as well. What is the correct relationship?",
              "choices": [
                "$P(B \\mid A) = P(A \\mid B)\\,\\frac{P(B)}{P(A)}$",
                "$P(B \\mid A) = P(A \\mid B)$ always",
                "$P(B \\mid A) = 1 - P(A \\mid B)$",
                "$P(B \\mid A) = P(A \\mid B)\\,\\frac{P(A)}{P(B)}$"
              ],
              "answer": 0,
              "explain": "By Bayes, $P(B\\mid A) = P(A\\mid B)P(B)/P(A)$, so the two conditionals are equal only when $P(A)=P(B)$. Assuming $P(A\\mid B)=P(B\\mid A)$ is the 'confusion of the inverse,' the same error behind the base-rate fallacy."
            },
            {
              "q": "Suppose $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \\cap B) = 0.2$. Are $A$ and $B$ independent?",
              "choices": [
                "Yes, because $P(A)P(B) = 0.2 = P(A \\cap B)$",
                "No, because $P(A \\cap B) \\ne P(A) + P(B)$",
                "No, because $P(A) \\ne P(B)$",
                "Cannot be determined without $P(A \\cup B)$"
              ],
              "answer": 0,
              "explain": "Independence holds iff $P(A\\cap B)=P(A)P(B)$; here $0.5\\times 0.4 = 0.2$, which matches, so they are independent. Independence does not require equal marginal probabilities."
            },
            {
              "q": "You roll a fair die. Let $C = \\{\\text{outcome} \\le 3\\}$ and $D = \\{\\text{outcome is odd}\\}$. What is $P(D \\mid C)$?",
              "choices": [
                "$\\frac{1}{2}$",
                "$\\frac{2}{3}$",
                "$\\frac{1}{3}$",
                "$\\frac{1}{6}$"
              ],
              "answer": 1,
              "explain": "Conditioning on $C$ restricts the sample space to $\\{1,2,3\\}$, of which the odd outcomes are $\\{1,3\\}$, giving $2/3$. Equivalently $P(C\\cap D)=P(\\{1,3\\})=2/6$ and $P(C)=3/6$, so $(2/6)/(3/6)=2/3$."
            },
            {
              "q": "You draw two cards from a standard 52-card deck without replacement. Using the multiplication (chain) rule, what is the probability both are aces?",
              "choices": [
                "$\\left(\\frac{4}{52}\\right)^2 = \\frac{16}{2704}$, treating the draws as independent.",
                "$\\frac{4}{52} + \\frac{3}{51}$, adding the two conditional probabilities.",
                "$\\frac{4}{52} = \\frac{1}{13}$, the chance the first card is an ace.",
                "$\\frac{4}{52}\\cdot\\frac{3}{51} = \\frac{1}{221}$, by $P(\\text{ace}_1)\\,P(\\text{ace}_2 \\mid \\text{ace}_1)$."
              ],
              "answer": 3,
              "explain": "Without replacement the draws are dependent, so use the multiplication rule with the conditional: $P(A\\cap B)=P(\\text{ace}_1)\\,P(\\text{ace}_2\\mid \\text{ace}_1) = \\frac{4}{52}\\cdot\\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$. Squaring (choice A) wrongly assumes independence; adding (choice B) confuses \"and\" with \"or.\""
            },
            {
              "q": "Factory 1 makes 60% of bulbs with a 2% defect rate; Factory 2 makes 40% with a 5% defect rate. By the law of total probability, what fraction of all bulbs are defective?",
              "choices": [
                "$0.07$ — just adding the two defect rates $2\\% + 5\\%$.",
                "$(0.02)(0.6) + (0.05)(0.4) = 0.032$, a weighted average of the defect rates by production share.",
                "$0.035$, the simple average of $2\\%$ and $5\\%$.",
                "$(0.02)(0.05) = 0.001$, multiplying the two defect rates."
              ],
              "answer": 1,
              "explain": "The factories partition the bulbs, so $P(D) = P(D\\mid F_1)P(F_1) + P(D\\mid F_2)P(F_2) = (0.02)(0.6)+(0.05)(0.4) = 0.012+0.020 = 0.032$ — each defect rate weighted by how many bulbs that factory makes. A plain average ignores the unequal production shares."
            },
            {
              "q": "What does the \"naive\" in *naive Bayes* refer to, and why is it computationally convenient?",
              "choices": [
                "It assumes the prior and posterior are identical, so no update is ever needed.",
                "It assumes every feature is equally likely, so all probabilities are $1/n$.",
                "It ignores Bayes' theorem entirely and just uses the prior.",
                "It assumes the features are conditionally independent given the label — so the joint likelihood factors into a product $\\prod_i P(x_i \\mid \\theta)$, which becomes a sum once you take logs."
              ],
              "answer": 3,
              "explain": "Naive Bayes makes the (often unrealistic, hence \"naive\") assumption that features are conditionally independent given the class label. Independence lets the joint likelihood factor into a product of per-feature terms; taking logs converts that product into a sum, which is what you actually optimize. The same factorization underlies the likelihood of i.i.d. data."
            },
            {
              "q": "In Bayes' theorem $P(B_i \\mid A) = \\dfrac{P(A \\mid B_i)\\,P(B_i)}{\\sum_j P(A \\mid B_j)\\,P(B_j)}$, which reading of the parts is correct?",
              "choices": [
                "$P(B_i)$ is the posterior and $P(B_i \\mid A)$ is the prior.",
                "$P(A \\mid B_i)$ is the posterior; the denominator is the likelihood.",
                "$P(B_i)$ is the prior (belief before evidence), $P(A \\mid B_i)$ is the likelihood (how well cause $B_i$ explains the evidence), $P(B_i \\mid A)$ is the posterior, and the denominator just normalizes — so posterior $\\propto$ likelihood $\\times$ prior.",
                "All four quantities are equal whenever the evidence $A$ is observed."
              ],
              "answer": 2,
              "explain": "Read it as posterior $\\propto$ likelihood $\\times$ prior. $P(B_i)$ is your belief before seeing $A$ (prior); $P(A\\mid B_i)$ is how well hypothesis $B_i$ predicts the evidence (likelihood); $P(B_i\\mid A)$ is the updated belief (posterior); the denominator $\\sum_j P(A\\mid B_j)P(B_j)=P(A)$ is the normalizer that makes the posteriors sum to 1."
            }
          ],
          "flashcards": [
            {
              "front": "Define conditional probability $P(A \\mid B)$.",
              "back": "For $P(B) > 0$, $\\;P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$. It restricts the sample space to $B$ and renormalizes: the fraction of $B$-outcomes that also lie in $A$."
            },
            {
              "front": "State the multiplication rule (chain rule for two events).",
              "back": "$P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A)$. For three events: $P(A \\cap B \\cap C) = P(A)\\,P(B \\mid A)\\,P(C \\mid A \\cap B)$."
            },
            {
              "front": "What does it mean for events $A$ and $B$ to be independent, and how does that differ from mutually exclusive?",
              "back": "Independent: $P(A \\cap B) = P(A)P(B)$, equivalently $P(A \\mid B) = P(A)$ — one event carries no information about the other. Mutually exclusive: $A \\cap B = \\varnothing$, so $P(A \\cap B) = 0$. Disjoint events with positive probability are dependent (maximally so), not independent."
            },
            {
              "front": "State the law of total probability for a partition $B_1,\\dots,B_n$ of $\\Omega$.",
              "back": "If the $B_i$ are mutually exclusive and exhaustive, then for any event $A$, $\\;P(A) = \\sum_{i=1}^{n} P(A \\mid B_i)\\,P(B_i)$ — a weighted average of conditional probabilities weighted by the priors $P(B_i)$."
            },
            {
              "front": "State Bayes' theorem and name its three pieces.",
              "back": "$P(B_i \\mid A) = \\dfrac{P(A \\mid B_i)\\,P(B_i)}{\\sum_j P(A \\mid B_j)\\,P(B_j)}$. In words, $\\text{posterior} \\propto \\text{likelihood} \\times \\text{prior}$, with the denominator $P(A)$ normalizing the posteriors to sum to 1."
            },
            {
              "front": "Why can a 99%-accurate test still give mostly false positives for a rare disease (base-rate neglect)?",
              "back": "When the disease is rare, the healthy group is huge, so even a small false-positive rate produces many false positives — often outnumbering the few true positives. With base rate $0.001$, $99\\%$ sensitivity, $1\\%$ false-positive rate: $P(D \\mid +) = \\frac{(0.99)(0.001)}{(0.99)(0.001)+(0.01)(0.999)} \\approx 0.09$. The prior dominates; ignoring it overestimates the posterior."
            }
          ],
          "homework": [
            {
              "prompt": "A fair six-sided die is rolled. Let $A$ be the event \"the result is at least 4\" and $B$ be the event \"the result is even.\" (a) Compute $P(A \\mid B)$. (b) Are $A$ and $B$ independent?",
              "hint": "List the outcomes in $B$, then in $A \\cap B$. Use $P(A \\mid B) = P(A \\cap B)/P(B)$. For independence, compare $P(A \\mid B)$ with $P(A)$ (or check $P(A \\cap B) = P(A)P(B)$).",
              "solution": "The even outcomes are $B = \\{2,4,6\\}$ with $P(B) = 3/6 = 1/2$. The outcomes at least 4 are $A = \\{4,5,6\\}$ with $P(A) = 3/6 = 1/2$. Their intersection is $A \\cap B = \\{4,6\\}$, so $P(A \\cap B) = 2/6 = 1/3$.\n\n(a) $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{1/3}{1/2} = \\dfrac{2}{3}.$\n\n(b) Independence requires $P(A \\mid B) = P(A)$. Here $P(A \\mid B) = 2/3$ but $P(A) = 1/2$, and $2/3 \\ne 1/2$. Equivalently $P(A)P(B) = (1/2)(1/2) = 1/4 \\ne 1/3 = P(A \\cap B)$. So $A$ and $B$ are <strong>not independent</strong> — knowing the roll is even raises the chance it is at least 4."
            },
            {
              "prompt": "An urn holds 3 red and 2 blue balls. You draw two balls without replacement. (a) What is the probability both are red? (b) What is the probability the second ball is red?",
              "hint": "For (a) use the multiplication rule with updated counts on the second draw. For (b) use the law of total probability, conditioning on the color of the first ball.",
              "solution": "(a) $P(R_1) = 3/5$. Given the first is red, 2 reds remain out of 4 balls, so $P(R_2 \\mid R_1) = 2/4 = 1/2$. By the multiplication rule:\n$$P(R_1 \\cap R_2) = \\frac{3}{5}\\cdot\\frac{1}{2} = \\frac{3}{10}.$$\n\n(b) Partition on the first draw. If the first is red ($P=3/5$), then $P(R_2 \\mid R_1) = 2/4$. If the first is blue ($P=2/5$), then 3 reds remain of 4, so $P(R_2 \\mid B_1) = 3/4$. Law of total probability:\n$$P(R_2) = \\frac{3}{5}\\cdot\\frac{2}{4} + \\frac{2}{5}\\cdot\\frac{3}{4} = \\frac{6}{20} + \\frac{6}{20} = \\frac{12}{20} = \\frac{3}{5}.$$\nNote $P(R_2) = 3/5 = P(R_1)$: without any information about the first draw, the second ball is red with the same marginal probability as the first — a nice symmetry of exchangeable draws."
            },
            {
              "prompt": "A factory has two machines. Machine A produces 70% of items with a 3% defect rate; Machine B produces 30% with an 8% defect rate. An item is selected at random and found to be defective. What is the probability it was made by Machine B? Then state how the answer compares to the prior 30%.",
              "hint": "Define events, write down the priors $P(A), P(B)$ and likelihoods $P(\\text{def}\\mid A), P(\\text{def}\\mid B)$. Use the law of total probability for $P(\\text{def})$, then Bayes' theorem for $P(B \\mid \\text{def})$.",
              "solution": "Let $A,B$ be the machines and $D$ the event \"defective.\" Priors: $P(A)=0.7$, $P(B)=0.3$. Likelihoods: $P(D\\mid A)=0.03$, $P(D\\mid B)=0.08$.\n\nLaw of total probability:\n$$P(D) = P(D\\mid A)P(A) + P(D\\mid B)P(B) = (0.03)(0.7) + (0.08)(0.3) = 0.021 + 0.024 = 0.045.$$\n\nBayes' theorem:\n$$P(B \\mid D) = \\frac{P(D\\mid B)P(B)}{P(D)} = \\frac{0.024}{0.045} \\approx 0.533.$$\n\nSo there is about a <strong>53.3%</strong> chance the defective item came from Machine B. This is well above the prior of $30\\%$: although Machine B makes fewer items, its higher defect rate means it contributes the majority of defectives, so observing a defect shifts our belief strongly toward B. (As a check, $P(A \\mid D) = 0.021/0.045 \\approx 0.467$, and the two posteriors sum to 1.)"
            }
          ],
          "examples": [
            {
              "title": "The rare-disease test: base rates in action",
              "body": "A disease affects 1 in 1000 people. A screening test has sensitivity 99% (it correctly flags 99% of people who have the disease) and a false-positive rate of 1% (it wrongly flags 1% of healthy people). A randomly chosen person tests positive. What is the probability they actually have the disease? Build the tree and apply Bayes' theorem.",
              "solution": "Let $D$ be \"has the disease\" and $+$ be \"tests positive.\" Translate the words into numbers:\n<ul>\n<li>Prior: $P(D) = 0.001$, so $P(D^c) = 0.999$.</li>\n<li>Sensitivity: $P(+ \\mid D) = 0.99$.</li>\n<li>False-positive rate: $P(+ \\mid D^c) = 0.01$.</li>\n</ul>\nLaw of total probability gives the overall positive rate (two leaves of the tree that say '+'):\n$$P(+) = P(+\\mid D)P(D) + P(+\\mid D^c)P(D^c) = (0.99)(0.001) + (0.01)(0.999).$$\n$$P(+) = 0.00099 + 0.00999 = 0.01098.$$\nBayes' theorem:\n$$P(D \\mid +) = \\frac{P(+\\mid D)P(D)}{P(+)} = \\frac{0.00099}{0.01098} \\approx 0.0902.$$\nOnly about <strong>9%</strong>. Intuitively: out of 100,000 people, roughly 100 are sick and about 99 of them test positive (true positives); but of the 99,900 healthy people, about 999 test positive anyway (false positives). So positives number $99 + 999 = 1098$, of whom only $99$ are truly sick — and $99/1098 \\approx 9\\%$. The takeaway: with a rare condition, even a very accurate test produces mostly false positives, which is why screening positives are followed by confirmatory tests."
            },
            {
              "title": "Two coins, one bag: updating from a flip",
              "body": "A bag contains two coins. One is fair ($P(\\text{heads}) = 0.5$); the other is biased with $P(\\text{heads}) = 0.8$. You pick a coin at random, flip it once, and it lands heads. What is the probability you picked the biased coin? Then flip the same coin again and get a second heads — update once more.",
              "solution": "Let $F$ = picked the fair coin, $B$ = picked the biased coin, each with prior $1/2$. Let $H$ = the first flip is heads.\n\n<strong>After one heads.</strong> Likelihoods: $P(H \\mid F) = 0.5$, $P(H \\mid B) = 0.8$. Total probability of heads:\n$$P(H) = (0.5)(0.5) + (0.8)(0.5) = 0.25 + 0.40 = 0.65.$$\nBayes' theorem:\n$$P(B \\mid H) = \\frac{(0.8)(0.5)}{0.65} = \\frac{0.40}{0.65} \\approx 0.615.$$\nOne heads nudges belief in the biased coin from $50\\%$ to about $61.5\\%$.\n\n<strong>After a second heads.</strong> Use the updated posterior as the new prior: $P(B) = 0.615$, $P(F) = 0.385$. Flips of the same coin are independent given which coin it is, so likelihoods of a single heads are unchanged. New normalizer:\n$$P(H_2) = (0.5)(0.385) + (0.8)(0.615) = 0.1925 + 0.4920 = 0.6845.$$\n$$P(B \\mid H_2) = \\frac{(0.8)(0.615)}{0.6845} = \\frac{0.4920}{0.6845} \\approx 0.719.$$\nTwo heads raise belief in the biased coin to about $72\\%$. Equivalently, condition on both heads at once: $P(B \\mid HH) = \\dfrac{(0.8^2)(0.5)}{(0.8^2)(0.5) + (0.5^2)(0.5)} = \\dfrac{0.32}{0.32 + 0.125} = \\dfrac{0.32}{0.445} \\approx 0.719$ — the same answer, confirming that sequential Bayesian updating equals one batch update. This is exactly how learning systems accumulate evidence over time."
            },
            {
              "title": "Monty Hall: why switching wins",
              "body": "Three doors hide one car and two goats. You pick door 1. The host — who knows where the car is — opens a <em>different</em> door revealing a goat, then offers you the switch. Should you switch?",
              "solution": "<strong>Pin down the prior.</strong> When you first pick, the car is behind your door with probability $\\frac{1}{3}$ and behind one of the other two with probability $\\frac{2}{3}$.\n<strong>The host's action carries information.</strong> The host <em>always</em> opens a goat door among the ones you didn't choose. That doesn't change the $\\frac{1}{3}$ that your door is right — but it funnels the whole $\\frac{2}{3}$ that the car is elsewhere onto the <em>single</em> remaining unopened door.\n$$P(\\text{win} \\mid \\text{stay}) = \\frac{1}{3}, \\qquad P(\\text{win} \\mid \\text{switch}) = \\frac{2}{3}.$$\n<strong>Switch</strong> — it doubles your odds. The paradox dissolves once you notice the host's choice is <em>not</em> random; it's conditioned on knowing where the car is, which is exactly the extra information Bayes' theorem formalizes. (Picture 100 doors: you pick one, the host opens 98 goats — would you really keep your 1-in-100 guess?)"
            }
          ]
        },
        {
          "id": "ps-random-variables-distributions",
          "title": "Random Variables & Their Distributions",
          "minutes": 15,
          "content": "<h3>1. The idea: turning chance into numbers</h3>\n<p>Suppose you flip a coin twice. The raw outcomes live in a sample space $\\Omega = \\{HH, HT, TH, TT\\}$ — these are <em>events</em>, not numbers, and you cannot average a \"TH\". A <strong>random variable</strong> fixes this. It is simply a <strong>function that assigns a number to every outcome</strong>. If $X$ counts the number of heads, then $X(HH)=2$, $X(HT)=X(TH)=1$, $X(TT)=0$. The randomness lives in <em>which</em> outcome occurs; once it does, $X$ reads off a number deterministically.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A random variable is a measuring instrument pointed at the universe. The universe rolls the dice; the instrument turns the result into something you can add, average, and graph. The word \"variable\" is a little misleading — it is really a <strong>function</strong>, written $X : \\Omega \\to \\mathbb{R}$.</p>\n</div>\n<p>Formally, $X$ maps the sample space to the real line. We then talk about probabilities of <em>numeric</em> events like $\\{X = 1\\}$, which secretly means \"the set of outcomes $\\omega$ with $X(\\omega)=1$.\" Here $P(X=1) = P(\\{HT, TH\\}) = \\tfrac{2}{4} = \\tfrac12$.</p>\n\n<h3>2. Discrete vs. continuous</h3>\n<p>Random variables come in two flavors, distinguished by the set of values they can take.</p>\n<ul>\n<li>A <strong>discrete</strong> random variable takes values in a countable set — typically integers. Counts (heads, defects, customers) are discrete.</li>\n<li>A <strong>continuous</strong> random variable takes values in an interval of $\\mathbb{R}$, an uncountable continuum. Measurements (height, waiting time, voltage) are continuous.</li>\n</ul>\n<p>The split matters because <em>how we assign probability differs</em>: discrete variables put lumps of probability on individual points; continuous variables spread probability smoothly so that any single point has probability <strong>zero</strong>.</p>\n\n<h3>3. The probability mass function (PMF)</h3>\n<div data-viz=\"ps-binomial-poisson\"></div>\n<p>For a discrete $X$, the <strong>probability mass function</strong> is $p_X(x) = P(X = x)$ — the probability piled on each value. It must satisfy two properties:</p>\n<ul>\n<li><strong>Nonnegativity:</strong> $p_X(x) \\ge 0$ for all $x$.</li>\n<li><strong>Normalization:</strong> $\\sum_x p_X(x) = 1$ — all the mass sums to one.</li>\n</ul>\n<p><strong>Fair die.</strong> Let $X$ be the face shown. Then $p_X(x) = \\tfrac16$ for $x \\in \\{1,2,3,4,5,6\\}$ and $0$ otherwise. Check: $6 \\times \\tfrac16 = 1$. The probability of rolling at most $2$ is $p_X(1)+p_X(2) = \\tfrac16+\\tfrac16 = \\tfrac13$.</p>\n<p><strong>Bernoulli.</strong> A single yes/no trial with success probability $p$ gives $X \\in \\{0,1\\}$ with $p_X(1)=p$ and $p_X(0)=1-p$. Its mean is $\\mathbb{E}[X] = 0\\cdot(1-p) + 1\\cdot p = p$ and its variance is $\\text{Var}(X) = p(1-p)$.</p>\n\n<h3>4. The probability density function (PDF): probability is area</h3>\n<div data-viz=\"ps-normal-explorer\"></div>\n<p>For continuous $X$ we cannot list $P(X=x)$ — every such probability is $0$. Instead we use a <strong>probability density function</strong> $f_X(x)$, where probability is the <em>area under the curve</em>:</p>\n$$P(a \\le X \\le b) = \\int_a^b f_X(x)\\,dx.$$\n<p>The density itself is not a probability (it can exceed $1$); only areas are. It must satisfy:</p>\n<ul>\n<li><strong>Nonnegativity:</strong> $f_X(x) \\ge 0$.</li>\n<li><strong>Total area one:</strong> $\\displaystyle\\int_{-\\infty}^{\\infty} f_X(x)\\,dx = 1$.</li>\n</ul>\n<p>Because a single point has zero width, $P(X=a)=0$, and consequently the endpoints do not matter: $P(a \\le X \\le b) = P(a < X < b)$.</p>\n<p><strong>Uniform on $[0,1]$.</strong> Here $f_X(x) = 1$ for $0 \\le x \\le 1$ and $0$ elsewhere. The area is $1 \\times 1 = 1$, good. Then $P(0.2 \\le X \\le 0.5) = \\int_{0.2}^{0.5} 1\\,dx = 0.3$. On a general interval $[\\alpha,\\beta]$ the uniform density is the constant $\\tfrac{1}{\\beta-\\alpha}$.</p>\n\n<h3>5. The cumulative distribution function (CDF)</h3>\n<p>One object describes <em>both</em> types: the <strong>cumulative distribution function</strong></p>\n$$F_X(x) = P(X \\le x).$$\n<p>It accumulates probability from the left. Its universal properties are:</p>\n<ul>\n<li><strong>Monotone nondecreasing</strong>: if $a \\le b$ then $F_X(a) \\le F_X(b)$.</li>\n<li><strong>Limits</strong>: $F_X(-\\infty)=0$ and $F_X(+\\infty)=1$.</li>\n<li><strong>Right-continuous</strong> everywhere.</li>\n</ul>\n<p>For discrete $X$ the CDF is a <strong>staircase</strong> that jumps by $p_X(x)$ at each value. For the fair die, $F_X(3) = P(X\\le 3) = \\tfrac36 = \\tfrac12$. For continuous $X$ the CDF is smooth and $F_X'(x) = f_X(x)$ — the density is the slope of the CDF. For the uniform on $[0,1]$, $F_X(x)=x$ on $[0,1]$, a straight ramp from $0$ to $1$.</p>\n\n<h3>6. Reading probabilities off a distribution</h3>\n<p>The CDF turns probability questions into subtraction. For <em>any</em> random variable,</p>\n$$P(a < X \\le b) = F_X(b) - F_X(a).$$\n<p>For the uniform on $[0,1]$, $P(0.2 < X \\le 0.5) = F_X(0.5) - F_X(0.2) = 0.5 - 0.2 = 0.3$, matching the area we integrated. To get a tail, complement: $P(X > a) = 1 - F_X(a)$. These three moves — accumulate, subtract, complement — answer almost every elementary distribution question.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Big picture</div>\n<p>The PMF/PDF and the CDF are two views of the same information: one is the \"local\" weight at or near a point, the other is the \"running total.\" Differentiate the CDF to recover the density; integrate (or sum) the density to recover the CDF. Mastering this translation is the foundation for every named distribution you will meet next.</p>\n</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: a random variable is a function, not a number</summary>\n<p>The name misleads: a <b>random variable</b> isn't a variable that happens to be random — it's a <em>function</em> $X$ mapping each outcome in the sample space to a number. Roll two dice; the outcome is a pair like $(3, 5)$, but \"the sum\" is a function $X$ sending that pair to $8$. The randomness lives in <em>which outcome occurs</em>; $X$ merely reads a number off it.</p>\n<p>That reframing makes probability quantitative. Once outcomes become numbers you can average them (expectation), measure their spread (variance), and add independent ones. The <b>distribution</b> of $X$ is the bookkeeping — which values $X$ takes and with what probability — inherited from the underlying outcomes: $P(X = 8)$ is just the chance of all pairs summing to 8.</p>\n<p>The \"aha\": \"random variable\" is a function and its \"distribution\" is the pushforward — the sample space's probabilities carried over to the number line. Seeing $X$ as a function is what lets you stop wrestling with messy outcomes and start doing arithmetic with numbers.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The expected value of a discrete random variable weights each outcome by its probability: <code>E[X] = Σ x·p(x)</code>. Run it for X ∈ {1,2,3} with probabilities [0.2, 0.3, 0.5]:</p>\n<div data-code=\"javascript\" data-expected=\"2.30\">// E[X] = sum of value * probability over all outcomes.\nfunction expectation(xs, ps) {\n  return xs.reduce(function (s, x, i) { return s + x * ps[i]; }, 0);\n}\nconsole.log(expectation([1, 2, 3], [0.2, 0.3, 0.5]).toFixed(2));   // 2.30 -- the long-run average</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: PMF, PDF, CDF — and why P(X=x)=0 for continuous</summary>\n<p>A random variable is described by its <em>distribution</em>, but the form depends on whether it is discrete or continuous — and the continuous case has a famous subtlety.</p>\n<p><b>Discrete: the PMF.</b> A discrete RV (a die, a count) has a <b>probability mass function</b> $P(X=x)$ giving the probability of each value; these are real probabilities in $[0,1]$ that sum to 1.</p>\n<p><b>Continuous: the PDF, and $P(X=x)=0$.</b> A continuous RV (a height, a wait time) has a <b>probability density function</b> $f(x)$ — but $f(x)$ is <em>not</em> a probability. The probability of any <em>exact</em> value is $P(X=x)=0$ (there are infinitely many possible values); probability is the <em>area under the density over an interval</em>: $P(a \\le X \\le b) = \\int_a^b f(x)\\,dx$. Density can even exceed 1 (only the total area must equal 1).</p>\n<p><b>The CDF unifies both.</b> The <b>cumulative distribution function</b> $F(x) = P(X \\le x)$ works for either type — it steps up at each mass (discrete) or rises smoothly (continuous), always from 0 to 1. The PDF is its derivative; the PMF is its jump sizes.</p>\n<p>The \"aha\": \"what is the probability it equals exactly 5.0000?\" has answer <b>0</b> for a continuous variable — you can only ask about ranges. Density is probability <em>per unit</em>, integrated to get probability; that shift from mass to density is the whole leap from discrete to continuous.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: expectation and variance — the first two moments</summary>\n<p>A full distribution (PMF/PDF/CDF, the other dive) can be complicated; two numbers summarize most of what you usually need — the <strong>mean</strong> and <strong>variance</strong>, the first two <em>moments</em>.</p>\n<p><b>Expectation</b> is the probability-weighted average, the distribution's \"center of mass\": $\\mathbb{E}[X]=\\sum_x x\\,p(x)$ (discrete) or $\\int x\\,f(x)\\,dx$ (continuous). It is <em>linear</em>: $\\mathbb{E}[aX+bY]=a\\,\\mathbb{E}[X]+b\\,\\mathbb{E}[Y]$ <em>always</em>, even when $X$ and $Y$ are dependent — which is what makes it so easy to work with.</p>\n<p><b>Variance</b> measures spread: $\\operatorname{Var}(X)=\\mathbb{E}[(X-\\mu)^2]=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$. Unlike the mean it is <em>not</em> linear — $\\operatorname{Var}(aX)=a^2\\operatorname{Var}(X)$, and $\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)$ only when $X$ and $Y$ are uncorrelated. Its square root, the standard deviation, lives in the same units as $X$.</p>\n<p><b>Why two numbers go far.</b> Estimators are judged by exactly these (the bias–variance decomposition); the Gaussian is <em>entirely</em> determined by its mean and variance; and the CLT makes sums of many variables Gaussian, so mean and variance describe the aggregate even when the pieces are weird. Higher moments (skew, kurtosis) refine the picture, but the first two carry the load.</p>\n<p>The \"aha\": you rarely need the whole distribution — its first two moments, the mean ($\\mathbb{E}[X]$, always linear) and the variance ($\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$, scaling by $a^2$), capture center and spread, and for a Gaussian they tell you <em>everything</em>.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A random variable $X$ is best described as which of the following?",
              "choices": [
                "A subset of the sample space $\\Omega$",
                "A numerical value chosen at random from $\\mathbb{R}$ each time you look at it",
                "A probability between 0 and 1 attached to an event",
                "A function $X:\\Omega\\to\\mathbb{R}$ that assigns a real number to each outcome"
              ],
              "answer": 3,
              "explain": "Despite its name, a random variable is a deterministic function from the sample space to the reals; the randomness is in which outcome occurs. It is not itself a probability (choice 2) nor an event/subset (choice 3)."
            },
            {
              "q": "For the two-coin-flip example with $X$ counting heads, the notation $\\{X=1\\}$ formally denotes which object?",
              "choices": [
                "The set of outcomes $\\{\\omega : X(\\omega)=1\\} = \\{HT, TH\\}$",
                "The probability $\\tfrac12$",
                "The number 1",
                "The function value $X(HT)$"
              ],
              "answer": 0,
              "explain": "A numeric event like $\\{X=1\\}$ is shorthand for the set of sample-space outcomes that $X$ maps to 1, here $\\{HT,TH\\}$. Its probability is $\\tfrac12$, but the event itself is the set, not the number or the probability."
            },
            {
              "q": "Which of these random variables is continuous rather than discrete?",
              "choices": [
                "The number of defective items in a shipment of 100",
                "The number of heads in ten coin flips",
                "The face shown on a rolled die",
                "The exact time in seconds until the next customer arrives"
              ],
              "answer": 3,
              "explain": "A waiting time can take any value in an interval of $\\mathbb{R}$, an uncountable continuum, so it is continuous. The other three are counts taking values in a countable (integer) set, hence discrete."
            },
            {
              "q": "A friend claims a function $f$ with $f(x)=2$ on $[0,0.5]$ and $f(x)=0$ elsewhere cannot be a valid PDF because $f(x)=2>1$. What is the correct response?",
              "choices": [
                "They are right; a PDF can never exceed 1 anywhere",
                "They are right; densities must lie in $[0,1]$ just like probabilities",
                "They are wrong; a density is not a probability, and here the area is $2\\times 0.5 = 1$, so it is valid",
                "They are wrong, but only because $f$ should equal exactly 1 on its support"
              ],
              "answer": 2,
              "explain": "A density value is not a probability; only areas under it are. Since $\\int f = 2\\times 0.5 = 1$ and $f\\ge 0$, this is a legitimate PDF even though the height exceeds 1. The common misconception is treating density like a bounded probability."
            },
            {
              "q": "A discrete random variable has PMF $p_X(x)=c(4-x)$ for $x\\in\\{0,1,2,3\\}$ and 0 otherwise. What is $c$?",
              "choices": [
                "$\\tfrac{1}{4}$",
                "$\\tfrac{1}{6}$",
                "$\\tfrac{1}{10}$",
                "$\\tfrac{1}{12}$"
              ],
              "answer": 2,
              "explain": "Normalization requires $\\sum_x p_X(x)=c(4+3+2+1)=10c=1$, so $c=\\tfrac{1}{10}$. The values $4-x$ for $x=0,1,2,3$ are $4,3,2,1$, summing to 10."
            },
            {
              "q": "For a continuous random variable $X$, what is $P(X=a)$ for any single fixed value $a$?",
              "choices": [
                "$f_X(a)$, the density at $a$",
                "$F_X(a)$, the CDF at $a$",
                "Always exactly 0",
                "It depends on how peaked the density is at $a$"
              ],
              "answer": 2,
              "explain": "A single point has zero width, so $\\int_a^a f_X(x)\\,dx = 0$; hence $P(X=a)=0$ for every $a$, regardless of the density's value or shape there. The density $f_X(a)$ is not a probability."
            },
            {
              "q": "$X$ is uniform on $[0,10]$. What is $P(3 \\le X \\le 7)$?",
              "choices": [
                "$0.7$",
                "$0.3$",
                "$0.5$",
                "$0.4$"
              ],
              "answer": 3,
              "explain": "The uniform density on $[0,10]$ is $\\tfrac{1}{10}$, so $P(3\\le X\\le 7)=\\int_3^7 \\tfrac{1}{10}\\,dx = \\tfrac{7-3}{10}=0.4$. Equivalently $F_X(7)-F_X(3)=0.7-0.3$."
            },
            {
              "q": "Which property is NOT guaranteed for the CDF $F_X(x)=P(X\\le x)$ of a general random variable?",
              "choices": [
                "$F_X$ is continuous (no jumps) everywhere",
                "$F_X(-\\infty)=0$ and $F_X(+\\infty)=1$",
                "$F_X$ is nondecreasing",
                "$F_X$ is right-continuous everywhere"
              ],
              "answer": 0,
              "explain": "Every CDF is nondecreasing, has the correct limits, and is right-continuous, but it need not be continuous: a discrete random variable's CDF is a staircase with jumps. Right-continuity (choice 4) always holds, but full continuity (choice 3) does not."
            },
            {
              "q": "A continuous random variable has CDF $F_X(x)=x^2$ for $0\\le x\\le 1$ (and 0 below, 1 above). What is its density $f_X(x)$ on $(0,1)$?",
              "choices": [
                "$\\tfrac{x^3}{3}$",
                "$x^2$",
                "$2x$",
                "$x$"
              ],
              "answer": 2,
              "explain": "For a continuous variable the density is the derivative of the CDF: $f_X(x)=F_X'(x)=\\tfrac{d}{dx}x^2=2x$. Differentiating, not integrating, recovers the density from the CDF."
            },
            {
              "q": "For the fair-die variable $X$ with $F_X$ the staircase CDF, which expression correctly gives $P(2 \\le X \\le 4)$ using the CDF?",
              "choices": [
                "$F_X(4)-F_X(1)$",
                "$F_X(4)-F_X(2)$",
                "$F_X(4)-F_X(3)$",
                "$F_X(2)-F_X(4)$"
              ],
              "answer": 0,
              "explain": "To include the value 2, you must subtract $F_X$ evaluated just below 2, which for an integer-valued variable is $F_X(1)$: $P(2\\le X\\le 4)=F_X(4)-F_X(1)=\\tfrac46-\\tfrac16=\\tfrac36$. Using $F_X(4)-F_X(2)$ wrongly drops the mass at $x=2$."
            },
            {
              "q": "A Bernoulli($p$) variable has $P(X=1)=p$ and $P(X=0)=1-p$. Using $X^2=X$, what is $\\mathbb{E}[X^2]$?",
              "choices": [
                "$p^2$",
                "$p$",
                "$p(1-p)$",
                "$1-p$"
              ],
              "answer": 1,
              "explain": "Since $0^2=0$ and $1^2=1$, we have $X^2=X$, so $\\mathbb{E}[X^2]=\\mathbb{E}[X]=p$. (This is why $\\text{Var}(X)=p-p^2=p(1-p)$; the tempting $p^2$ confuses $\\mathbb{E}[X^2]$ with $(\\mathbb{E}[X])^2$.)"
            },
            {
              "q": "The general continuous-vs-discrete distinction matters most because it changes which of the following?",
              "choices": [
                "Whether the random variable can be negative",
                "How probability is assigned: lumps on points (summed) versus area under a curve (integrated)",
                "Whether expectation is defined for the variable",
                "Whether the CDF exists for the variable"
              ],
              "answer": 1,
              "explain": "The split governs the probability mechanism: discrete variables place mass on points described by a PMF and summed, while continuous variables spread density described by a PDF and integrated. Both can be negative, both have a CDF, and both can have an expectation, so those do not distinguish the two types."
            },
            {
              "q": "For a *continuous* random variable $X$, why does $P(a \\le X \\le b) = P(a < X < b)$?",
              "choices": [
                "Because a single point has zero width, so $P(X = a) = P(X = b) = 0$; including or excluding the endpoints adds nothing.",
                "Because continuous variables are always uniform, so every interval has equal probability.",
                "Because the CDF is right-continuous, so the left endpoint is automatically dropped.",
                "It is not true — including the endpoints always makes the probability strictly larger."
              ],
              "answer": 0,
              "explain": "For a continuous RV, probability is area under the density, and the area over a single point (zero width) is $0$, so $P(X=a)=0$ for every $a$. Adding or removing the endpoints therefore changes nothing: $P(a\\le X\\le b)=P(a<X<b)$. (This is false for *discrete* variables, where individual points carry positive mass.)"
            },
            {
              "q": "A continuous random variable's density satisfies $f_X(x) = 2$ on part of its range. How can a \"probability\" density exceed 1?",
              "choices": [
                "Only discrete distributions allow values above 1; this $f_X$ must therefore be a PMF.",
                "It cannot; any valid density must satisfy $f_X(x) \\le 1$ everywhere.",
                "The value 2 means there is a 200% chance, which is rounded down to 100% in practice.",
                "$f_X(x)$ is a *density*, not a probability — only the *area* $\\int f_X\\,dx$ over an interval is a probability. A density can take any nonnegative value as long as its total area is 1."
              ],
              "answer": 3,
              "explain": "The density is \"probability per unit length,\" not a probability itself. What must lie in $[0,1]$ is the *area* over an interval, and the total area must equal 1 — but the density can rise above 1 over a short interval (e.g. uniform on $[0,0.5]$ has $f=2$). The only requirements are $f_X \\ge 0$ and $\\int f_X\\,dx = 1$."
            },
            {
              "q": "For what constant $c$ is $f(x) = cx$ on $[0, 2]$ (and $0$ elsewhere) a valid probability density?",
              "choices": [
                "$c = 1$",
                "$c = \\frac{1}{2}$",
                "$c = \\frac{1}{4}$",
                "$c = 2$"
              ],
              "answer": 1,
              "explain": "A density must integrate to 1: $\\int_0^2 cx\\,dx = c\\,\\frac{x^2}{2}\\Big|_0^2 = c\\cdot 2 = 1$, so $c = \\frac{1}{2}$. (Check: $f(x)=x/2$ is nonnegative on $[0,2]$ and its triangle has area $\\tfrac12\\cdot 2\\cdot 1 = 1$.)"
            },
            {
              "q": "A continuous random variable has CDF $F_X(x) = x^3$ for $0 \\le x \\le 1$ (with $0$ below and $1$ above). What is $P(X > 0.5)$?",
              "choices": [
                "$0.5^3 = 0.125$, reading $F_X(0.5)$ directly.",
                "$1 - 0.5^3 = 0.875$, using $P(X > a) = 1 - F_X(a)$.",
                "$0.5$, since $0.5$ is the midpoint of $[0,1]$.",
                "$3 \\times 0.5^2 = 0.75$, using the density at $0.5$."
              ],
              "answer": 1,
              "explain": "A tail probability is the complement of the CDF: $P(X > a) = 1 - F_X(a)$. Here $F_X(0.5) = 0.5^3 = 0.125$ is $P(X \\le 0.5)$, so $P(X > 0.5) = 1 - 0.125 = 0.875$. (Choice A gives the left tail; choice D evaluates the density $f_X = F_X' = 3x^2$, which is not a probability.)"
            }
          ],
          "flashcards": [
            {
              "front": "What is a random variable, formally?",
              "back": "A function $X : \\Omega \\to \\mathbb{R}$ that assigns a real number to every outcome in the sample space. The randomness is in which outcome occurs; $X$ reads off a number deterministically. Numeric events like $\\{X=x\\}$ mean $\\{\\omega : X(\\omega)=x\\}$."
            },
            {
              "front": "Discrete vs. continuous random variable",
              "back": "<strong>Discrete</strong>: takes values in a countable set (e.g. integers); probability sits in lumps on points, described by a PMF. <strong>Continuous</strong>: takes values in an interval of $\\mathbb{R}$; probability is spread smoothly, described by a PDF, and $P(X=x)=0$ for every single point $x$."
            },
            {
              "front": "The two defining properties of a PMF $p_X(x)=P(X=x)$",
              "back": "1) Nonnegativity: $p_X(x)\\ge 0$ for all $x$. 2) Normalization: $\\sum_x p_X(x) = 1$. Probabilities of sets are sums of masses, e.g. $P(X\\le 2)=\\sum_{x\\le 2} p_X(x)$."
            },
            {
              "front": "How does a PDF $f_X$ give probabilities, and what are its properties?",
              "back": "Probability is area: $P(a\\le X\\le b)=\\int_a^b f_X(x)\\,dx$. Properties: $f_X(x)\\ge 0$ and $\\int_{-\\infty}^{\\infty} f_X(x)\\,dx = 1$. The density is <em>not</em> a probability (it may exceed 1); only areas are. Since points have zero width, $P(X=a)=0$ and endpoints don't matter."
            },
            {
              "front": "Definition and three properties of the CDF $F_X$",
              "back": "$F_X(x)=P(X\\le x)$. It is (1) nondecreasing, (2) has limits $F_X(-\\infty)=0$, $F_X(+\\infty)=1$, and (3) right-continuous. For discrete $X$ it is a staircase jumping by $p_X(x)$; for continuous $X$ it is smooth with $F_X'(x)=f_X(x)$."
            },
            {
              "front": "Bernoulli($p$) and the uniform on $[0,1]$: PMF/PDF and key facts",
              "back": "<strong>Bernoulli($p$)</strong>: $X\\in\\{0,1\\}$, $p_X(1)=p$, $p_X(0)=1-p$; $\\mathbb{E}[X]=p$, $\\text{Var}(X)=p(1-p)$. <strong>Uniform$[0,1]$</strong>: $f_X(x)=1$ on $[0,1]$ (else 0); $F_X(x)=x$ on $[0,1]$; $P(a\\le X\\le b)=b-a$."
            }
          ],
          "homework": [
            {
              "prompt": "A discrete random variable $X$ has PMF $p_X(x) = c\\,x$ for $x \\in \\{1,2,3,4\\}$ and $0$ otherwise. (a) Find the constant $c$. (b) Compute $P(X \\ge 3)$. (c) Find the CDF value $F_X(2)$.",
              "hint": "Use the normalization property: all the masses must sum to 1. Then $P(X\\ge 3)$ is a sum of the relevant masses, and $F_X(2)=P(X\\le 2)$.",
              "solution": "<p><strong>(a)</strong> Normalization requires $\\sum_{x=1}^{4} c\\,x = 1$, i.e. $c(1+2+3+4) = 10c = 1$, so $c = \\tfrac{1}{10}$.</p><p><strong>(b)</strong> $P(X\\ge 3) = p_X(3)+p_X(4) = \\tfrac{3}{10}+\\tfrac{4}{10} = \\tfrac{7}{10} = 0.7$.</p><p><strong>(c)</strong> $F_X(2)=P(X\\le 2)=p_X(1)+p_X(2)=\\tfrac{1}{10}+\\tfrac{2}{10}=\\tfrac{3}{10}=0.3$.</p>"
            },
            {
              "prompt": "A continuous random variable $X$ has PDF $f_X(x) = k\\,x$ for $0 \\le x \\le 2$ and $0$ otherwise. (a) Find $k$. (b) Compute $P(1 \\le X \\le 2)$. (c) Derive the CDF $F_X(x)$ for $0\\le x\\le 2$ and verify it gives the same answer to (b).",
              "hint": "Total area must equal 1, so integrate $kx$ from 0 to 2 and set it to 1. For (b) integrate the density over $[1,2]$. For the CDF, integrate the density from $0$ up to $x$.",
              "solution": "<p><strong>(a)</strong> $\\int_0^2 kx\\,dx = k\\cdot\\frac{x^2}{2}\\Big|_0^2 = k\\cdot 2 = 1 \\Rightarrow k=\\tfrac12$.</p><p><strong>(b)</strong> $P(1\\le X\\le 2)=\\int_1^2 \\tfrac12 x\\,dx = \\tfrac12\\cdot\\frac{x^2}{2}\\Big|_1^2 = \\tfrac14(4-1)=\\tfrac34 = 0.75$.</p><p><strong>(c)</strong> For $0\\le x\\le 2$: $F_X(x)=\\int_0^x \\tfrac12 t\\,dt = \\tfrac12\\cdot\\frac{t^2}{2}\\Big|_0^x = \\frac{x^2}{4}$. Then $P(1\\le X\\le 2)=F_X(2)-F_X(1)=\\frac{4}{4}-\\frac{1}{4}=\\tfrac34$, matching (b). (Check: $F_X(0)=0$, $F_X(2)=1$, and $F_X'(x)=\\tfrac{x}{2}=f_X(x)$.)</p>"
            },
            {
              "prompt": "The lifetime $X$ (in hours) of a component has CDF $F_X(x) = 1 - e^{-x/5}$ for $x \\ge 0$ and $F_X(x)=0$ for $x<0$. (a) Find the PDF $f_X(x)$. (b) Compute the probability the component lasts more than 5 hours, $P(X>5)$. (c) Compute $P(2 < X \\le 8)$.",
              "hint": "The PDF is the derivative of the CDF. For tails use $P(X>a)=1-F_X(a)$. For an interval use $F_X(b)-F_X(a)$. Recall $e^{-1}\\approx 0.3679$.",
              "solution": "<p><strong>(a)</strong> $f_X(x)=F_X'(x)=\\frac{d}{dx}\\left(1-e^{-x/5}\\right)=\\tfrac15 e^{-x/5}$ for $x\\ge 0$ (and $0$ for $x<0$). This is an exponential density with rate $\\tfrac15$.</p><p><strong>(b)</strong> $P(X>5)=1-F_X(5)=1-\\left(1-e^{-5/5}\\right)=e^{-1}\\approx 0.3679$.</p><p><strong>(c)</strong> $P(2<X\\le 8)=F_X(8)-F_X(2)=\\left(1-e^{-8/5}\\right)-\\left(1-e^{-2/5}\\right)=e^{-0.4}-e^{-1.6}\\approx 0.6703-0.2019=0.4684$.</p>"
            }
          ],
          "examples": [
            {
              "title": "From PMF to CDF: a fair die",
              "body": "Let $X$ be the result of rolling a fair six-sided die, so $p_X(x)=\\tfrac16$ for $x\\in\\{1,2,3,4,5,6\\}$. Build the cumulative distribution function $F_X(x)=P(X\\le x)$, then use it to find $P(2 \\le X \\le 4)$ and $P(X > 4)$.",
              "solution": "<p>The CDF accumulates mass from the left, jumping by $\\tfrac16$ at each integer. It is a staircase:</p>$$F_X(x)=\\begin{cases}0 & x<1\\\\ \\tfrac{1}{6} & 1\\le x<2\\\\ \\tfrac{2}{6} & 2\\le x<3\\\\ \\tfrac{3}{6} & 3\\le x<4\\\\ \\tfrac{4}{6} & 4\\le x<5\\\\ \\tfrac{5}{6} & 5\\le x<6\\\\ 1 & x\\ge 6.\\end{cases}$$<p>For $P(2\\le X\\le 4)$ we want the masses on $\\{2,3,4\\}$. Summing directly: $p_X(2)+p_X(3)+p_X(4)=\\tfrac36=\\tfrac12$. Via the CDF, since $X$ is integer-valued, $P(2\\le X\\le 4)=F_X(4)-F_X(1)=\\tfrac46-\\tfrac16=\\tfrac36=\\tfrac12$ (note we subtract $F_X$ just below 2, i.e. at 1, to keep the value 2 included).</p><p>For the tail: $P(X>4)=1-F_X(4)=1-\\tfrac46=\\tfrac26=\\tfrac13$, which equals $p_X(5)+p_X(6)=\\tfrac26$ as a check.</p>"
            },
            {
              "title": "Probability as area: the uniform distribution",
              "body": "A bus arrives at a random time $X$ uniformly distributed over the interval $[0,10]$ minutes after you reach the stop. Write the PDF and CDF, then find: (a) $P(X \\le 4)$, (b) $P(3 \\le X \\le 7)$, and (c) the probability you wait <em>exactly</em> 5 minutes, $P(X=5)$.",
              "solution": "<p>A uniform on $[\\alpha,\\beta]$ has constant density $\\tfrac{1}{\\beta-\\alpha}$. Here $\\beta-\\alpha=10$, so</p>$$f_X(x)=\\tfrac{1}{10}\\ \\text{for}\\ 0\\le x\\le 10,\\quad f_X(x)=0\\ \\text{otherwise.}$$<p>Check: total area $=\\tfrac{1}{10}\\times 10 = 1$. The CDF is the running area: $F_X(x)=\\int_0^x \\tfrac{1}{10}\\,dt=\\tfrac{x}{10}$ for $0\\le x\\le 10$ (a straight ramp from 0 to 1).</p><p><strong>(a)</strong> $P(X\\le 4)=F_X(4)=\\tfrac{4}{10}=0.4$. Equivalently, the area of a rectangle of width 4 and height $\\tfrac{1}{10}$.</p><p><strong>(b)</strong> $P(3\\le X\\le 7)=\\int_3^7 \\tfrac{1}{10}\\,dx=\\tfrac{7-3}{10}=\\tfrac{4}{10}=0.4$, or $F_X(7)-F_X(3)=0.7-0.3$.</p><p><strong>(c)</strong> $P(X=5)=\\int_5^5 \\tfrac{1}{10}\\,dx=0$. A single point has zero width, hence zero area — for any continuous variable the probability of an exact value is $0$. This is why $P(3\\le X\\le 7)=P(3<X<7)$: the endpoints contribute nothing.</p>"
            },
            {
              "title": "Mean and variance of a fair die",
              "body": "A fair six-sided die has $P(X=k) = \\tfrac{1}{6}$ for $k = 1, \\dots, 6$. Find $\\mathbb{E}[X]$ and $\\operatorname{Var}(X)$.",
              "solution": "<strong>Mean.</strong> $\\mathbb{E}[X] = \\sum_{k=1}^{6} k \\cdot \\tfrac{1}{6} = \\tfrac{1+2+3+4+5+6}{6} = \\tfrac{21}{6} = 3.5$. (Note the mean is not an attainable face — it is the balance point.)\n<strong>Variance via $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$.</strong> $\\mathbb{E}[X^2] = \\tfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \\tfrac{91}{6} \\approx 15.17$. Then\n$$\\operatorname{Var}(X) = \\tfrac{91}{6} - 3.5^2 = 15.17 - 12.25 = \\tfrac{35}{12} \\approx 2.92,$$\nso the standard deviation is $\\sigma = \\sqrt{35/12} \\approx 1.71$.\n<strong>Sanity check.</strong> The spread (about 1.71) is a bit over a third of the range 1–6, matching a flat distribution — a uniform pushes mass to the extremes, giving a larger variance than a bell shape over the same range.\n<strong>The aha.</strong> Expectation is the probability-weighted average (the distribution's center of mass); variance is the average squared distance from it — fastest as \"mean of the square minus square of the mean.\" For a uniform die these are pure arithmetic over the six equally likely faces."
            }
          ]
        },
        {
          "id": "ps-expectation-variance",
          "title": "Expectation, Variance & the Shape of a Distribution",
          "minutes": 15,
          "content": "<h3>1. The center of mass of randomness</h3>\n<div data-viz=\"ps-expectation-balance\"></div>\n<p>Imagine spinning a roulette of outcomes thousands of times and writing down the value each time. If you average those numbers, the average <em>settles down</em> to a single, predictable figure. That figure is the <strong>expected value</strong> $\\mathbb{E}[X]$ — not a value you necessarily ever observe, but the <strong>long-run average</strong> and the <strong>balance point</strong> of the distribution. Place the probability mass of $X$ on a weightless ruler; $\\mathbb{E}[X]$ is where it balances.</p>\n<p>For a <strong>discrete</strong> random variable taking values $x_i$ with probabilities $p_i = \\mathbb{P}(X = x_i)$,</p>\n$$\\mathbb{E}[X] = \\sum_i x_i \\, p_i.$$\n<p>For a <strong>continuous</strong> variable with probability density $f(x)$, sums become integrals:</p>\n$$\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\, f(x)\\,dx.$$\n<p><strong>Numeric example.</strong> Roll one fair die, $X \\in \\{1,\\dots,6\\}$ each with probability $\\tfrac16$. Then $\\mathbb{E}[X] = \\tfrac16(1+2+3+4+5+6) = \\tfrac{21}{6} = 3.5$. The mean is $3.5$ even though no face shows $3.5$ — the balance point need not be attainable.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$\\mathbb{E}[X]$ is a <em>weighted</em> average: each possible value pulls on the balance point with force equal to its probability. Rare values contribute little; likely values dominate. This is the physicist's center of mass with mass replaced by probability.</p>\n</div>\n\n<h3>2. Linearity of expectation</h3>\n<p>The single most useful property in all of probability: expectation is <strong>linear</strong>. For any random variables $X, Y$ and constants $a, b$,</p>\n$$\\mathbb{E}[aX + bY] = a\\,\\mathbb{E}[X] + b\\,\\mathbb{E}[Y].$$\n<p>The remarkable part is the fine print: <strong>this holds even when $X$ and $Y$ are dependent</strong>. No independence assumption is needed. You can split the expectation of a sum into a sum of expectations no matter how tangled the variables are.</p>\n<p><strong>Example.</strong> Sum of two dice, $S = X_1 + X_2$. Even though we could enumerate all 36 outcomes, linearity gives the answer instantly: $\\mathbb{E}[S] = \\mathbb{E}[X_1] + \\mathbb{E}[X_2] = 3.5 + 3.5 = 7$. The same trick scales effortlessly: the expected sum of $100$ dice is $350$, computed without touching a single joint distribution.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Mini-batch training relies on linearity: the expected gradient over a batch equals the average of per-example expected gradients, so a small random batch is an unbiased estimate of the full-data gradient. Linearity is what makes stochastic gradient descent <em>correct in expectation</em>.</p>\n</div>\n\n<h3>3. The Law of the Unconscious Statistician</h3>\n<p>Often we want the expectation not of $X$ but of some transformation $g(X)$ — say $X^2$ or $e^X$. You might think you must first find the distribution of $g(X)$. You do not. The <strong>Law of the Unconscious Statistician (LOTUS)</strong> says you can reuse the distribution of $X$ directly:</p>\n$$\\mathbb{E}[g(X)] = \\sum_i g(x_i)\\,p_i \\quad\\text{(discrete)}, \\qquad \\mathbb{E}[g(X)] = \\int_{-\\infty}^{\\infty} g(x)\\,f(x)\\,dx \\quad\\text{(continuous)}.$$\n<p>Just push every value through $g$ and weight by the <em>original</em> probabilities. For our die, $\\mathbb{E}[X^2] = \\tfrac16(1+4+9+16+25+36) = \\tfrac{91}{6} \\approx 15.17$. Note this is <em>not</em> $(\\mathbb{E}[X])^2 = 12.25$; in general $\\mathbb{E}[g(X)] \\ne g(\\mathbb{E}[X])$ unless $g$ is linear.</p>\n\n<h3>4. Variance: how far things spread</h3>\n<p>The mean tells you <em>where</em> a distribution sits, not <em>how spread out</em> it is. A bet paying $\\$0$ or $\\$100$ on a coin flip and a guaranteed $\\$50$ both have mean $50$, but they feel utterly different. <strong>Variance</strong> measures spread as the expected squared distance from the mean $\\mu = \\mathbb{E}[X]$:</p>\n$$\\text{Var}(X) = \\mathbb{E}\\big[(X-\\mu)^2\\big].$$\n<p>Squaring keeps deviations positive and punishes large excursions heavily. Expanding the square and using linearity gives the indispensable <strong>computational formula</strong>:</p>\n$$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2.$$\n<p>For our die: $\\text{Var}(X) = \\tfrac{91}{6} - 3.5^2 = 15.1\\overline{6} - 12.25 = 2.91\\overline{6} = \\tfrac{35}{12}$. Because variance is in squared units (dollars-squared, say), we usually report the <strong>standard deviation</strong> $\\sigma = \\sqrt{\\text{Var}(X)}$, here $\\sigma = \\sqrt{35/12} \\approx 1.71$ — a spread in the same units as $X$ itself. Variance is always $\\ge 0$, and equals $0$ exactly when $X$ is a constant.</p>\n\n<h3>5. How variance reacts to shifts and scales</h3>\n<p>Suppose you transform $X$ linearly into $aX + b$. Shifting by $b$ slides the whole distribution sideways — it moves the center but changes <em>nothing</em> about spread. Scaling by $a$ stretches deviations by $a$, so squared deviations stretch by $a^2$:</p>\n$$\\text{Var}(aX + b) = a^2\\,\\text{Var}(X), \\qquad \\sigma(aX+b) = |a|\\,\\sigma(X).$$\n<p>The additive constant $b$ vanishes; only the multiplier survives, and it comes out <em>squared</em>. Converting Celsius to Fahrenheit, $F = 1.8C + 32$, multiplies the standard deviation of temperatures by $1.8$ and the variance by $1.8^2 = 3.24$, while the $+32$ does nothing to the spread.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Mean is a <em>linear</em> functional (constants pass through additively); variance is <em>quadratic</em> (constants pass through squared, shifts disappear). This split — first moment linear, second central moment quadratic — echoes throughout statistics, from error bars to the bias-variance decomposition.</p>\n</div>\n\n<h3>6. A word on skew</h3>\n<p>Mean and variance fix the center and width but not the <strong>shape</strong>. A distribution is <strong>symmetric</strong> if it mirrors around its mean, where mean and median coincide. When a long tail stretches to the right (a few very large values), we call it <strong>right-skewed</strong> (positive skew) — incomes are the classic case, with the mean dragged above the median by the wealthy few. A long left tail is <strong>left-skewed</strong>. Skew, formally a normalized third central moment $\\mathbb{E}[(X-\\mu)^3]/\\sigma^3$, is the next layer of detail after center and spread: it tells you <em>which way the surprises lean</em>.</p>\n<p>Together, $\\mathbb{E}[X]$ (where), $\\sigma$ (how wide), and skew (which way) give a compact, powerful sketch of any distribution before you ever draw it.</p>\n<h3>Code it: expectation &amp; variance</h3>\n<p>The formulas are just weighted sums — so let the computer do the weighting. Run this, then change the values or the probabilities in <code>p</code> (keep them summing to 1) and watch the mean and spread move.</p>\n<div data-code=\"javascript\" data-expected=\"E[X]   = 1.90\nVar[X] = 0.89\nSD[X]  = 0.9434\">// A discrete random variable X and its probability mass function.\nconst x = [0, 1, 2, 3];\nconst p = [0.1, 0.2, 0.4, 0.3];   // the PMF — must sum to 1\n\n// E[X] = Σ xᵢ·pᵢ  (the long-run average)\nlet EX = 0;\nfor (let i = 0; i &lt; x.length; i++) EX += x[i] * p[i];\n\n// Var[X] = E[X²] − (E[X])²  (spread around the mean)\nlet EX2 = 0;\nfor (let i = 0; i &lt; x.length; i++) EX2 += x[i] * x[i] * p[i];\nconst Var = EX2 - EX * EX;\n\nconsole.log(\"E[X]   = \" + EX.toFixed(2));\nconsole.log(\"Var[X] = \" + Var.toFixed(2));\nconsole.log(\"SD[X]  = \" + Math.sqrt(Var).toFixed(4));</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: expectation always adds; variance is pickier</summary>\n<p>Two rules that look alike behave very differently. <b>Linearity of expectation</b>: $\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ <em>always</em> — even if $X$ and $Y$ are dependent or correlated. This is why expectation is so powerful: break a messy quantity into a sum and average the pieces with no independence assumption.</p>\n<p><b>Variance is not linear.</b> $\\mathrm{Var}(X + Y) = \\mathrm{Var}(X) + \\mathrm{Var}(Y) + 2\\,\\mathrm{Cov}(X, Y)$ — the variances add <em>only</em> when the covariance is zero (e.g. independent variables). For scaling, $\\mathrm{Var}(aX + b) = a^2 \\mathrm{Var}(X)$: the constant $b$ shifts everything without changing spread (so it drops out), while the factor $a$ scales spread by $a^2$ (variance lives in squared units).</p>\n<p>The \"aha\": expectation passes through sums for free; variance carries a covariance correction and squares its scaling. That asymmetry is exactly why \"the variance of an average shrinks like $1/n$\" (independent terms, covariances vanish) — the engine behind the law of large numbers.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why variance squares (and where std comes from)</summary>\n<p>Variance is the average <em>squared</em> deviation, $\\text{Var}(X) = \\mathbb{E}[(X - \\mu)^2]$. Why square, rather than take absolute values?</p>\n<p><b>Three reasons.</b> (1) <em>Sign</em>: deviations above and below the mean must not cancel; squaring (like $|\\cdot|$) fixes that. (2) <em>Algebra</em>: squares are smooth and differentiable everywhere (absolute value has a kink at 0), which makes variance tractable in calculus-based derivations and least squares. (3) <em>Additivity</em>: for <em>independent</em> variables variances add, $\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y)$ — a clean identity that mean-absolute-deviation does not satisfy.</p>\n<p><b>The cost: units.</b> Squaring also squares the units (dollars become dollars²), so variance is not directly interpretable. That is why we report the <b>standard deviation</b> $\\sigma = \\sqrt{\\text{Var}(X)}$ — it undoes the square and lives in the <em>same units as the data</em>, so \"$\\pm 1\\sigma$\" is a spread you can picture.</p>\n<p>The \"aha\": variance and standard deviation are two views of one spread. Variance is the algebraically convenient one (it adds, it differentiates nicely); standard deviation is the human-readable one (right units). Squaring is the price of that convenience, and the square root pays it back.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the indicator method (linearity of expectation as a superpower)</summary>\n<p>Linearity of expectation — $\\mathbb{E}[X+Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ — has a hidden caveat that makes it astonishingly powerful: it holds <em>even when $X$ and $Y$ are dependent</em>. No independence required. That turns hard counting problems into one-liners.</p>\n<p><b>The indicator method.</b> To find the expected <em>count</em> of something, write the count as a sum of <b>indicator variables</b> $X = \\sum_i \\mathbf{1}_i$, where $\\mathbf{1}_i = 1$ if event $i$ happens and $0$ otherwise. Then $\\mathbb{E}[X] = \\sum_i \\mathbb{E}[\\mathbf{1}_i] = \\sum_i P(\\text{event } i)$ — and $\\mathbb{E}[\\mathbf{1}_i]$ is just a probability, usually trivial. The events may overlap or depend on each other wildly; linearity does not care.</p>\n<p><b>The classic.</b> How many people, on average, get their own hat back when $n$ hats are returned at random? Let $\\mathbf{1}_i$ mark \"person $i$ gets their hat.\" Then $P(\\mathbf{1}_i=1) = \\tfrac1n$, so the expected number of matches is $\\sum_{i=1}^n \\tfrac1n = 1$ — exactly one, for <em>any</em> $n$. Computing this from the messy joint distribution would be a nightmare; the indicator method makes it a single line.</p>\n<p>The \"aha\": because expectation adds <em>regardless of dependence</em>, you never need the joint distribution to find an expected count — decompose into indicators and sum their probabilities. It is the most leverage you get from one rule in all of probability.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A fair six-sided die has $\\mathbb{E}[X] = 3.5$. A player wins \\$2 for each pip showing. By linearity of expectation, what is the expected winnings $\\mathbb{E}[2X]$?",
              "choices": [
                "\\$3.5",
                "\\$12",
                "\\$7",
                "\\$21"
              ],
              "answer": 2,
              "explain": "$\\mathbb{E}[2X] = 2\\,\\mathbb{E}[X] = 2(3.5) = 7$. Expectation scales linearly with constant multipliers, so the dollar value is twice the expected pip count."
            },
            {
              "q": "A discrete random variable $X$ takes value $0$ with probability $0.9$ and value $100$ with probability $0.1$. What is $\\mathbb{E}[X]$?",
              "choices": [
                "$50$, the midpoint of the two values",
                "$0$, the most likely value",
                "$10$",
                "$100$, the largest possible value"
              ],
              "answer": 2,
              "explain": "$\\mathbb{E}[X] = 0(0.9) + 100(0.1) = 10$. The mean is a probability-weighted average, not the midpoint of the range nor the mode; the rare large value pulls the balance point only slightly toward $100$."
            },
            {
              "q": "Why can the expected value $\\mathbb{E}[X]$ of a discrete random variable be a number that $X$ never actually takes?",
              "choices": [
                "Because probabilities do not have to sum to $1$",
                "Because the formula for $\\mathbb{E}[X]$ contains a rounding error",
                "Because $\\mathbb{E}[X]$ is really the median, not the mean",
                "Because $\\mathbb{E}[X]$ is the balance point of the probability mass, which need not coincide with any single outcome"
              ],
              "answer": 3,
              "explain": "$\\mathbb{E}[X]$ is the center of mass of the distribution; like balancing a ruler, the balance point can fall between the weighted points and need not be an attainable outcome (e.g. $3.5$ for a die)."
            },
            {
              "q": "A continuous random variable has density $f(x) = 2x$ for $x \\in [0,1]$ and $0$ elsewhere. What is $\\mathbb{E}[X] = \\int_0^1 x \\cdot 2x\\,dx$?",
              "choices": [
                "$\\tfrac23$",
                "$1$",
                "$\\tfrac12$",
                "$\\tfrac13$"
              ],
              "answer": 0,
              "explain": "$\\int_0^1 2x^2\\,dx = \\tfrac{2}{3}x^3\\big|_0^1 = \\tfrac23$. The density grows toward $x=1$, so the balance point sits past the midpoint $\\tfrac12$, ruling out that tempting symmetric-looking answer."
            },
            {
              "q": "Interpreting $\\mathbb{E}[X] = \\sum_i x_i p_i$ as a weighted average, which statement is correct?",
              "choices": [
                "Each outcome contributes equally regardless of its probability",
                "Likely values pull the balance point more strongly than rare values",
                "Only the largest value $x_i$ determines $\\mathbb{E}[X]$",
                "Rare values dominate because they are more surprising"
              ],
              "answer": 1,
              "explain": "Each value pulls on the balance point with force equal to its probability $p_i$, so high-probability values dominate and rare values contribute little. Surprise does not enter the expectation formula."
            },
            {
              "q": "Two distributions have the same mean $\\mu = 0$. Distribution A is concentrated near $0$; distribution B has mass spread far out toward $\\pm 100$. What does this tell you about their variances?",
              "choices": [
                "B has the larger variance",
                "A has the larger variance",
                "They must have equal variance since the means are equal",
                "Variance cannot be compared without knowing the medians"
              ],
              "answer": 0,
              "explain": "Variance measures average squared spread about the mean; B's mass sits far from $0$, producing large squared deviations and thus larger variance. Equal means say nothing about spread."
            },
            {
              "q": "For a fair die with $\\mathbb{E}[X]=3.5$, a common error is to compute variance as $\\mathbb{E}[X]^2 = 3.5^2 = 12.25$. Why is this wrong as a formula for $\\mathrm{Var}(X)$?",
              "choices": [
                "Variance is always negative for a die",
                "Variance equals $\\mathbb{E}[X]$ for any distribution",
                "$3.5^2$ should be computed as $7$",
                "Variance is $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$, not $(\\mathbb{E}[X])^2$"
              ],
              "answer": 3,
              "explain": "Variance is $\\mathrm{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$; squaring the mean alone ignores $\\mathbb{E}[X^2]$. The two quantities differ because $\\mathbb{E}[X^2] \\ge (\\mathbb{E}[X])^2$ by Jensen's inequality."
            },
            {
              "q": "A constant $c$ is added to every outcome of $X$. How do the mean and variance change?",
              "choices": [
                "Mean increases by $c$; variance is unchanged",
                "Mean increases by $c$; variance increases by $c$",
                "Mean is unchanged; variance increases by $c^2$",
                "Both mean and variance are unchanged"
              ],
              "answer": 0,
              "explain": "Shifting all values by $c$ slides the balance point: $\\mathbb{E}[X+c]=\\mathbb{E}[X]+c$. But spread about the (also shifted) mean is identical, so $\\mathrm{Var}(X+c)=\\mathrm{Var}(X)$."
            },
            {
              "q": "A random variable $X$ is scaled to $Y = 3X$. If $\\mathrm{Var}(X) = 4$, what is $\\mathrm{Var}(Y)$?",
              "choices": [
                "$12$",
                "$36$",
                "$7$",
                "$4$"
              ],
              "answer": 1,
              "explain": "Variance scales by the square of the multiplier: $\\mathrm{Var}(3X) = 3^2\\,\\mathrm{Var}(X) = 9 \\cdot 4 = 36$. The tempting $12 = 3\\cdot 4$ forgets that deviations are squared inside the variance."
            },
            {
              "q": "Standard deviation is defined as $\\sigma = \\sqrt{\\mathrm{Var}(X)}$. Why is $\\sigma$ often preferred over variance when reporting spread?",
              "choices": [
                "Because $\\sigma$ is always smaller than the variance",
                "Because variance can be negative but $\\sigma$ cannot",
                "Because $\\sigma$ ignores the mean entirely",
                "Because $\\sigma$ has the same units as $X$, making it directly interpretable"
              ],
              "answer": 3,
              "explain": "Squaring deviations gives variance units of $X$ squared; taking the square root restores the original units, so $\\sigma$ is comparable to the values of $X$ itself. Variance is never negative, so that is not the reason."
            },
            {
              "q": "A right-skewed distribution (a long tail to the right, e.g. household incomes) typically has which ordering of its mean and median?",
              "choices": [
                "Mean $=$ median, because skew does not affect either",
                "Mean $<$ median, because the tail lowers the average",
                "Mean $>$ median, because the long right tail pulls the balance point up",
                "Mean $=$ mode, regardless of skew"
              ],
              "answer": 2,
              "explain": "The mean is the balance point and is dragged toward the long tail, so for right skew the mean exceeds the median. The median, a positional middle, resists the tail's pull."
            },
            {
              "q": "Suppose $\\mathbb{E}[X] = 5$ for some random variable. Which conclusion is justified?",
              "choices": [
                "At least half of all observations of $X$ equal $5$",
                "The single most likely value of $X$ is $5$",
                "Over many independent trials, the sample average of $X$ tends toward $5$",
                "Every observed value of $X$ lies within a small range around $5$"
              ],
              "answer": 2,
              "explain": "$\\mathbb{E}[X]$ is the long-run average: across many trials the running mean settles toward $5$. It is neither the median, the mode, nor a guarantee about any individual observation's proximity to the mean."
            },
            {
              "q": "Linearity of expectation says $\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$. Under what condition on $X$ and $Y$ does this hold?",
              "choices": [
                "Only when $X$ and $Y$ are independent.",
                "Always — it holds even when $X$ and $Y$ are dependent; no independence assumption is needed.",
                "Only when $X$ and $Y$ are identically distributed.",
                "Only when $X$ and $Y$ are uncorrelated."
              ],
              "answer": 1,
              "explain": "Linearity of expectation is unconditional: $\\mathbb{E}[aX+bY]=a\\mathbb{E}[X]+b\\mathbb{E}[Y]$ for *any* $X,Y$, however dependent. (Independence is needed for the expectation of a *product*, $\\mathbb{E}[XY]=\\mathbb{E}[X]\\mathbb{E}[Y]$, and for $\\text{Var}(X+Y)=\\text{Var}(X)+\\text{Var}(Y)$ — but never for the expectation of a sum.) This is why $\\mathbb{E}[\\text{sum of two dice}]=3.5+3.5=7$ needs no joint analysis."
            },
            {
              "q": "You want $\\mathbb{E}[X^2]$ for a fair die ($X \\in \\{1,\\dots,6\\}$). What does the Law of the Unconscious Statistician (LOTUS) let you do?",
              "choices": [
                "Square the mean: $(\\mathbb{E}[X])^2 = 3.5^2 = 12.25$.",
                "Push each value through $g(x)=x^2$ and weight by the *original* probabilities: $\\mathbb{E}[X^2]=\\sum_i x_i^2\\,p_i = \\tfrac{1}{6}(1+4+9+16+25+36) = \\tfrac{91}{6} \\approx 15.17$.",
                "First derive the full distribution of $Y = X^2$, then average $Y$ — there is no shortcut.",
                "Use $\\mathbb{E}[X^2] = \\mathbb{E}[X]\\cdot\\mathbb{E}[X] = 12.25$, because expectation is multiplicative."
              ],
              "answer": 1,
              "explain": "LOTUS: $\\mathbb{E}[g(X)] = \\sum_i g(x_i)\\,p_i$ using $X$'s own distribution — no need to find the distribution of $X^2$. So $\\mathbb{E}[X^2] = \\tfrac16(1+4+9+16+25+36)=91/6\\approx 15.17$. Note this is *not* $(\\mathbb{E}[X])^2=12.25$; in general $\\mathbb{E}[g(X)]\\ne g(\\mathbb{E}[X])$ for nonlinear $g$."
            },
            {
              "q": "Temperatures with standard deviation $\\sigma_C = 5$°C are converted to Fahrenheit by $F = 1.8\\,C + 32$. What is the standard deviation in Fahrenheit?",
              "choices": [
                "$1.8 \\times 5 = 9$°F — the additive $+32$ does not affect spread, and the scale factor multiplies $\\sigma$ by $|1.8|$.",
                "$1.8 \\times 5 + 32 = 41$°F.",
                "$1.8^2 \\times 5 = 16.2$°F.",
                "$5$°F — a linear conversion leaves the standard deviation unchanged."
              ],
              "answer": 0,
              "explain": "For $Y=aX+b$, $\\sigma(Y)=|a|\\,\\sigma(X)$: shifting by $b$ slides the distribution without changing its spread, while scaling by $a$ stretches $\\sigma$ by $|a|$. So $\\sigma_F = 1.8\\times 5 = 9$°F. (The *variance* scales by $a^2=3.24$; the $+32$ never affects spread.)"
            },
            {
              "q": "A random variable has $\\mathbb{E}[X] = 2$ and $\\mathbb{E}[X^2] = 6$. What is $\\text{Var}(X)$?",
              "choices": [
                "$6$, which is $\\mathbb{E}[X^2]$ directly.",
                "$4$, which is $(\\mathbb{E}[X])^2$.",
                "$8 = \\mathbb{E}[X^2] + (\\mathbb{E}[X])^2$.",
                "$2 = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = 6 - 4$."
              ],
              "answer": 3,
              "explain": "The computational formula is $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = 6 - 2^2 = 6 - 4 = 2$. (It follows from expanding $\\mathbb{E}[(X-\\mu)^2]$ and using linearity.) The standard deviation would be $\\sigma=\\sqrt{2}\\approx 1.41$."
            }
          ],
          "flashcards": [
            {
              "front": "Define the expected value $\\mathbb{E}[X]$ for discrete and continuous random variables.",
              "back": "It is the long-run average / balance point of the distribution.<br>Discrete: $\\mathbb{E}[X] = \\sum_i x_i\\, p_i$.<br>Continuous: $\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x\\, f(x)\\,dx$."
            },
            {
              "front": "State the linearity of expectation and its crucial caveat.",
              "back": "$\\mathbb{E}[aX + bY] = a\\,\\mathbb{E}[X] + b\\,\\mathbb{E}[Y]$ for any constants $a,b$. It holds <strong>even when $X$ and $Y$ are dependent</strong> — no independence is required."
            },
            {
              "front": "What does the Law of the Unconscious Statistician (LOTUS) let you compute, and how?",
              "back": "$\\mathbb{E}[g(X)]$ without finding the distribution of $g(X)$: just reweight transformed values by the original probabilities.<br>$\\mathbb{E}[g(X)] = \\sum_i g(x_i)\\,p_i$ or $\\int g(x) f(x)\\,dx$. In general $\\mathbb{E}[g(X)] \\ne g(\\mathbb{E}[X])$ unless $g$ is linear."
            },
            {
              "front": "Give the two equivalent formulas for variance and what it measures.",
              "back": "Variance measures spread: the expected squared deviation from the mean $\\mu$.<br>$\\text{Var}(X) = \\mathbb{E}[(X-\\mu)^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$.<br>It is always $\\ge 0$, and $=0$ iff $X$ is constant."
            },
            {
              "front": "How do variance and standard deviation transform under $X \\mapsto aX + b$?",
              "back": "$\\text{Var}(aX+b) = a^2\\,\\text{Var}(X)$ and $\\sigma(aX+b) = |a|\\,\\sigma(X)$. The shift $b$ does not affect spread; the scale $a$ comes out squared for variance."
            },
            {
              "front": "What is standard deviation, and what is right (positive) skew?",
              "back": "Standard deviation $\\sigma = \\sqrt{\\text{Var}(X)}$ — spread expressed in the same units as $X$. <strong>Right-skew</strong> means a long right tail (a few large values), pulling the mean above the median (e.g. income)."
            }
          ],
          "homework": [
            {
              "prompt": "A loaded coin shows Heads with probability $0.6$ and Tails with probability $0.4$. You win $\\$10$ on Heads and lose $\\$5$ on Tails. Let $X$ be your profit. Find $\\mathbb{E}[X]$ and $\\text{Var}(X)$.",
              "hint": "$X$ takes value $10$ with prob $0.6$ and $-5$ with prob $0.4$. Use $\\mathbb{E}[X]=\\sum x_i p_i$, then $\\text{Var}(X)=\\mathbb{E}[X^2]-(\\mathbb{E}[X])^2$ via LOTUS on $g(x)=x^2$.",
              "solution": "Mean: $\\mathbb{E}[X] = (10)(0.6) + (-5)(0.4) = 6 - 2 = \\$4$.<br>Second moment (LOTUS): $\\mathbb{E}[X^2] = (10^2)(0.6) + ((-5)^2)(0.4) = (100)(0.6) + (25)(0.4) = 60 + 10 = 70$.<br>Variance: $\\text{Var}(X) = 70 - 4^2 = 70 - 16 = 54$ (dollars-squared).<br>Standard deviation: $\\sigma = \\sqrt{54} \\approx \\$7.35$, so the game is favorable on average but quite volatile."
            },
            {
              "prompt": "Let $X$ be the outcome of one fair die (so $\\mathbb{E}[X]=3.5$, $\\text{Var}(X)=\\tfrac{35}{12}$). Define $Y = 2X - 1$. Find $\\mathbb{E}[Y]$, $\\text{Var}(Y)$, and $\\sigma(Y)$. Explain why the $-1$ does not appear in the variance.",
              "hint": "Use linearity for the mean and the rule $\\text{Var}(aX+b)=a^2\\text{Var}(X)$ for the variance. Here $a=2$, $b=-1$.",
              "solution": "Mean (linearity): $\\mathbb{E}[Y] = 2\\,\\mathbb{E}[X] - 1 = 2(3.5) - 1 = 6$.<br>Variance (scale-shift rule): $\\text{Var}(Y) = 2^2\\,\\text{Var}(X) = 4 \\cdot \\tfrac{35}{12} = \\tfrac{140}{12} = \\tfrac{35}{3} \\approx 11.67$.<br>Standard deviation: $\\sigma(Y) = |2|\\,\\sigma(X) = 2\\sqrt{35/12} \\approx 2(1.708) \\approx 3.42$.<br>The $-1$ slides every value left by $1$, moving the center but preserving all distances between values; since variance depends only on deviations from the mean, an additive constant cancels out. Only the multiplier $a=2$ stretches the spread, and it enters squared."
            },
            {
              "prompt": "A continuous random variable $X$ is uniform on $[0,2]$, so its density is $f(x)=\\tfrac12$ for $0\\le x\\le 2$ and $0$ otherwise. Compute $\\mathbb{E}[X]$, $\\mathbb{E}[X^2]$, $\\text{Var}(X)$, and $\\sigma$.",
              "hint": "Use the integral definitions: $\\mathbb{E}[X]=\\int_0^2 x f(x)\\,dx$ and (LOTUS) $\\mathbb{E}[X^2]=\\int_0^2 x^2 f(x)\\,dx$. Then apply the computational variance formula.",
              "solution": "Mean: $\\mathbb{E}[X] = \\int_0^2 x\\cdot\\tfrac12\\,dx = \\tfrac12\\left[\\tfrac{x^2}{2}\\right]_0^2 = \\tfrac12\\cdot\\tfrac{4}{2} = \\tfrac12\\cdot 2 = 1.$ (The midpoint, as symmetry demands.)<br>Second moment (LOTUS): $\\mathbb{E}[X^2] = \\int_0^2 x^2\\cdot\\tfrac12\\,dx = \\tfrac12\\left[\\tfrac{x^3}{3}\\right]_0^2 = \\tfrac12\\cdot\\tfrac{8}{3} = \\tfrac{4}{3}.$<br>Variance: $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = \\tfrac{4}{3} - 1^2 = \\tfrac{1}{3}.$<br>Standard deviation: $\\sigma = \\sqrt{1/3} \\approx 0.577.$<br>(This matches the general uniform-on-$[a,b]$ result $\\text{Var}=\\tfrac{(b-a)^2}{12} = \\tfrac{4}{12} = \\tfrac13$.)"
            }
          ],
          "examples": [
            {
              "title": "Expected value and variance of an indicator (Bernoulli) variable",
              "body": "Let $X$ be an indicator that equals $1$ if a randomly chosen email is spam and $0$ otherwise, where the spam rate is $p = 0.3$. Find $\\mathbb{E}[X]$ and $\\text{Var}(X)$, and then find the mean and variance of the <em>count</em> of spam emails in a batch of $50$ independent emails.",
              "solution": "Single indicator: $X$ takes value $1$ with probability $0.3$ and $0$ with probability $0.7$.<br>$\\mathbb{E}[X] = (1)(0.3) + (0)(0.7) = 0.3 = p.$<br>Since $X^2 = X$ (because $0^2=0$, $1^2=1$), LOTUS gives $\\mathbb{E}[X^2] = \\mathbb{E}[X] = 0.3.$<br>$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = 0.3 - 0.09 = 0.21 = p(1-p).$<br><br>Count in a batch: let $S = X_1 + \\dots + X_{50}$. By <strong>linearity of expectation</strong> (no independence needed), $\\mathbb{E}[S] = 50p = 50(0.3) = 15$ spam emails on average.<br>Because the $X_i$ are independent, variances add: $\\text{Var}(S) = 50\\,p(1-p) = 50(0.21) = 10.5$, giving $\\sigma(S) = \\sqrt{10.5} \\approx 3.24$ emails. So we expect about $15 \\pm 3.2$ spam emails per batch of 50."
            },
            {
              "title": "Mean is linear, but a nonlinear transform is not: $\\mathbb{E}[g(X)] \\ne g(\\mathbb{E}[X])$",
              "body": "A random variable $X$ takes the values $1, 2, 3$ with probabilities $0.2, 0.5, 0.3$. Compute $\\mathbb{E}[X]$. Then use LOTUS to compute $\\mathbb{E}[X^2]$ and compare it with $(\\mathbb{E}[X])^2$. Finally compute $\\text{Var}(X)$ and confirm the gap between the two equals the variance.",
              "solution": "Mean: $\\mathbb{E}[X] = (1)(0.2) + (2)(0.5) + (3)(0.3) = 0.2 + 1.0 + 0.9 = 2.1.$<br><br>Apply $g(x)=x^2$ via LOTUS (square the values, keep the original probabilities):<br>$\\mathbb{E}[X^2] = (1^2)(0.2) + (2^2)(0.5) + (3^2)(0.3) = (1)(0.2) + (4)(0.5) + (9)(0.3) = 0.2 + 2.0 + 2.7 = 4.9.$<br><br>Compare: $(\\mathbb{E}[X])^2 = 2.1^2 = 4.41$, which is <em>not</em> equal to $\\mathbb{E}[X^2] = 4.9$. Squaring is nonlinear, so it does not commute with expectation.<br><br>Variance: $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = 4.9 - 4.41 = 0.49.$<br>The gap between $\\mathbb{E}[X^2]$ and $(\\mathbb{E}[X])^2$ <em>is</em> the variance — a clean illustration that the difference $0.49 = \\text{Var}(X) \\ge 0$ is always nonnegative, which is exactly why $\\mathbb{E}[X^2] \\ge (\\mathbb{E}[X])^2$ in general (a form of Jensen's inequality for the convex function $g(x)=x^2$). Here $\\sigma = \\sqrt{0.49} = 0.7.$"
            },
            {
              "title": "Variance = mean of the square minus square of the mean",
              "body": "A random variable $X$ takes values $\\{1, 2, 3\\}$ with probabilities $[0.2, 0.3, 0.5]$. Find its variance and standard deviation.",
              "solution": "<strong>Mean first.</strong> $\\mathbb{E}[X] = \\sum x\\,p(x) = 1(0.2) + 2(0.3) + 3(0.5) = 2.3$.\n<strong>The shortcut formula.</strong> Instead of averaging squared deviations directly, use $\\operatorname{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$. The mean of the squares is $\\mathbb{E}[X^2] = 1(0.2) + 4(0.3) + 9(0.5) = 5.9$, so\n$$\\operatorname{Var}(X) = 5.9 - (2.3)^2 = 5.9 - 5.29 = 0.61,$$\nand the standard deviation is $\\sigma = \\sqrt{0.61} \\approx 0.781$ — in the same units as $X$.\n<strong>Why the formula works.</strong> Expand $\\mathbb{E}[(X - \\mu)^2] = \\mathbb{E}[X^2 - 2\\mu X + \\mu^2] = \\mathbb{E}[X^2] - 2\\mu\\,\\mathbb{E}[X] + \\mu^2 = \\mathbb{E}[X^2] - \\mu^2$ (using $\\mathbb{E}[X] = \\mu$). It is algebraically identical to the deviation definition but needs only one pass over the data.\n<strong>The aha.</strong> Variance measures spread as the gap between the <em>mean of the squares</em> and the <em>square of the mean</em> — a gap that is zero only when $X$ is constant. The standard deviation rescales it back to $X$'s units, which is why $\\sigma$, not variance, is what you report alongside a mean."
            }
          ]
        }
      ]
    },
    {
      "id": "ps-distributions",
      "title": "Common Distributions",
      "lessons": [
        {
          "id": "ps-bernoulli-binomial",
          "title": "Bernoulli & Binomial Distributions",
          "minutes": 15,
          "content": "<h3>1. The hook: counting your way through luck</h3>\n<p>You flip a fair coin 10 times. How many heads will you see? Not exactly 5 — sometimes 4, sometimes 7, occasionally even 0. But there is a precise, knowable <em>pattern</em> behind that scatter. The <strong>Binomial distribution</strong> is the mathematics of that pattern: it answers \"how many successes in $n$ repeated yes/no attempts?\" Before we can count many trials, though, we must master one. That single trial is the <strong>Bernoulli</strong> — the atom from which the binomial molecule is built.</p>\n\n<h3>2. The Bernoulli trial: a single yes/no</h3>\n<p>A <strong>Bernoulli trial</strong> is an experiment with exactly two outcomes, conventionally labeled <em>success</em> (coded $1$) and <em>failure</em> (coded $0$). Let $p$ be the probability of success, so failure has probability $1-p$. A random variable $X \\in \\{0,1\\}$ with $P(X=1)=p$ and $P(X=0)=1-p$ is <strong>Bernoulli($p$)</strong>.</p>\n<p>Its moments are quick to derive. The mean is\n$$\\mathbb{E}[X] = 1\\cdot p + 0\\cdot(1-p) = p.$$\nBecause $X^2 = X$ (since $0^2=0$ and $1^2=1$), we get $\\mathbb{E}[X^2]=p$, so the variance is\n$$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = p - p^2 = p(1-p).$$\nNotice variance is largest at $p=0.5$ (maximum uncertainty, value $0.25$) and shrinks to $0$ as $p\\to 0$ or $p\\to 1$ (near-certain outcomes carry little surprise).</p>\n\n<h3>3. From one trial to many: defining the Binomial</h3>\n<p>Now run $n$ <em>independent</em> Bernoulli($p$) trials and add up the successes. Let $X_1,\\dots,X_n$ be those indicators and define\n$$X = X_1 + X_2 + \\cdots + X_n.$$\nThen $X$ counts total successes and is called <strong>Binomial($n,p$)</strong>, written $X \\sim \\text{Bin}(n,p)$. The Bernoulli is just the special case $n=1$.</p>\n\n<h3>4. The PMF: why the binomial coefficient appears</h3>\n<p>What is $P(X=k)$, the probability of exactly $k$ successes? Any <em>one specific</em> sequence with $k$ successes and $n-k$ failures — say SSF...F — has probability $p^k(1-p)^{n-k}$ by independence (multiply the per-trial probabilities). But many distinct sequences yield $k$ successes; we must count them. The number of ways to choose <em>which</em> $k$ of the $n$ positions are successes is the <strong>binomial coefficient</strong>\n$$\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}.$$\nSumming the equal probability over all these arrangements gives the <strong>Binomial PMF</strong>:\n$$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\qquad k = 0,1,\\dots,n.$$\nThese probabilities sum to $1$ by the binomial theorem: $\\sum_{k=0}^{n}\\binom{n}{k}p^k(1-p)^{n-k} = (p + (1-p))^n = 1$.</p>\n\n<h3>5. Mean and variance via linearity</h3>\n<p>You could grind out $\\mathbb{E}[X]=\\sum_k k\\binom{n}{k}p^k(1-p)^{n-k}$ — but the indicator decomposition makes it effortless. <strong>Linearity of expectation</strong> needs no independence:\n$$\\mathbb{E}[X] = \\sum_{i=1}^{n}\\mathbb{E}[X_i] = \\sum_{i=1}^{n} p = np.$$\nVariance <em>does</em> use independence (cross-covariances vanish), so variances add:\n$$\\text{Var}(X) = \\sum_{i=1}^{n}\\text{Var}(X_i) = \\sum_{i=1}^{n} p(1-p) = np(1-p).$$\nThe standard deviation is $\\sigma = \\sqrt{np(1-p)}$.</p>\n\n<h3>6. Worked example: heads in 10 flips</h3>\n<p>Let $X \\sim \\text{Bin}(10, 0.5)$ count heads in 10 fair flips. Then $\\mathbb{E}[X] = 10(0.5) = 5$ and $\\text{Var}(X) = 10(0.5)(0.5) = 2.5$, so $\\sigma \\approx 1.58$. The chance of exactly 7 heads is\n$$P(X=7) = \\binom{10}{7}(0.5)^7(0.5)^3 = 120 \\cdot (0.5)^{10} = \\frac{120}{1024} \\approx 0.117.$$\nSo roughly an 11.7% chance. By symmetry this equals $P(X=3)$. It is rarer than exactly 4 heads, $P(X=4)=\\binom{10}{4}/1024 = 210/1024 \\approx 0.205$, and rarer still than the symmetric peak at 5, $P(X=5)=252/1024 \\approx 0.246$ — values farther from the center are less likely.</p>\n\n<h4>Interactive — reshape the distribution</h4>\n<div data-viz=\"ps-binomial-poisson\"></div>\n\n<h3>7. When does the Binomial model apply?</h3>\n<p>Check the <strong>BINS</strong> conditions before reaching for $\\text{Bin}(n,p)$:</p>\n<ul>\n<li><strong>Binary</strong> — each trial has two outcomes (success/failure).</li>\n<li><strong>Independent</strong> — trials do not influence one another.</li>\n<li><strong>Number fixed</strong> — $n$ is decided in advance, not random.</li>\n<li><strong>Same $p$</strong> — the success probability is identical every trial.</li>\n</ul>\n<p>Flipping a coin 20 times fits perfectly. Drawing 5 cards <em>without replacement</em> does <em>not</em> — the probabilities shift each draw (dependence), which calls for the hypergeometric distribution instead. Sampling a few items from a huge factory batch is approximately binomial because removing one item barely changes $p$.</p>\n<h3>Code it: build the binomial PMF</h3>\n<p>Turn the formula into code: count the ways with <code>C(n,k)</code>, weight each by its probability, and the whole distribution falls out. Run it, confirm the probabilities sum to 1, then try <code>p = 0.5</code> to see the symmetric bell.</p>\n<div data-code=\"javascript\" data-expected=\"P(X=0) = 0.1681\nP(X=1) = 0.3601\nP(X=2) = 0.3087\nP(X=3) = 0.1323\nP(X=4) = 0.0283\nP(X=5) = 0.0024\nsum      = 1.0000\">// Binomial PMF: P(X=k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ  — k successes in n trials.\nfunction choose(n, k) {           // C(n,k), the binomial coefficient\n  let c = 1;\n  for (let i = 0; i &lt; k; i++) c = c * (n - i) / (i + 1);\n  return c;\n}\nfunction binomPMF(n, k, p) {\n  return choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);\n}\n\nconst n = 5, p = 0.3;             // 5 trials, 30% success each\nlet total = 0;\nfor (let k = 0; k &lt;= n; k++) {\n  const pk = binomPMF(n, k, p);\n  total += pk;\n  console.log(\"P(X=\" + k + \") = \" + pk.toFixed(4));\n}\nconsole.log(\"sum      = \" + total.toFixed(4));   // a valid PMF sums to 1</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: where the binomial formula comes from</summary>\n<p>The binomial probability $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$ can look arbitrary until you build it from one coin flip. A single <b>Bernoulli trial</b> succeeds with probability $p$ and fails with $1-p$; the binomial counts successes across $n$ <em>independent</em> such trials.</p>\n<p>Two pieces. <b>One specific sequence</b> with $k$ successes and $n-k$ failures — say SSF…F in a fixed order — has probability $p^k (1-p)^{n-k}$, because independent probabilities multiply. <b>How many such sequences exist?</b> Any choice of <em>which</em> $k$ of the $n$ positions hold the successes — that is $\\binom{n}{k}$ orderings, each with the same probability. Multiply the two and the formula appears.</p>\n<p>The \"aha\": $p^k(1-p)^{n-k}$ is the probability of one arrangement; $\\binom{n}{k}$ counts the arrangements. The binomial coefficient is there purely because we do not care <em>which</em> trials succeeded, only <em>how many</em> — so we sum over all equally likely orderings.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: mean np, variance np(1−p), and why p = ½ is the most uncertain</summary>\n<p>Beyond the formula, two numbers summarize a binomial $\\text{Bin}(n, p)$: its <b>mean</b> $np$ and <b>variance</b> $np(1-p)$. Both follow instantly from viewing the count as a sum of $n$ independent Bernoulli trials, each with mean $p$ and variance $p(1-p)$ — means, and (for independents) variances, just add.</p>\n<p><b>The variance peaks at $p = \\tfrac12$.</b> The factor $p(1-p)$ is a downward parabola maximized at $p = 0.5$. For $n = 10$ the variance is $2.5$ at $p = 0.5$, but only $0.9$ at $p = 0.1$ or $p = 0.9$. A fair coin is the <em>most</em> unpredictable; a heavily biased one is nearly certain, so its outcomes barely spread.</p>\n<p><b>Why it matters.</b> This is why estimating a proportion near $50\\%$ needs the largest sample (max variance, widest confidence interval), and why a balanced class label carries the most information. The same $p(1-p)$ is the Bernoulli variance and the slope of the logistic, and it peaks where entropy does.</p>\n<p>The \"aha\": the binomial's spread is not constant — it is governed by $p(1-p)$, biggest at the 50/50 knife-edge and vanishing as the process becomes deterministic. Uncertainty is maximized exactly when you can least predict a single trial.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the binomial becomes a bell (normal approximation)</summary>\n<p>For large $n$, the binomial distribution stops looking like discrete spikes and turns into a smooth bell curve — the <b>normal approximation</b>, and historically the <em>first</em> central limit theorem.</p>\n<p><b>The result.</b> Since a binomial count is a <em>sum</em> of $n$ independent Bernoulli trials, the CLT applies: for large $n$, $$\\text{Binomial}(n,p) \\approx \\mathcal{N}\\big(np,\\; np(1-p)\\big),$$ matching the binomial's own mean $np$ and variance $np(1-p)$. This is the <b>de Moivre–Laplace theorem</b> (1730s) — the bell curve was <em>discovered</em> as the limit of coin-flip counts, long before the general CLT.</p>\n<p><b>The continuity correction.</b> You are approximating a <em>discrete</em> distribution with a <em>continuous</em> one, so to estimate $P(X \\le k)$ you integrate the normal up to $k + \\tfrac12$, not $k$ — the half-unit \"continuity correction\" accounts for the bar's width and noticeably sharpens the estimate for moderate $n$.</p>\n<p>The \"aha\": the binomial <em>is</em> a sum of Bernoullis, so by the CLT it becomes normal for large $n$ — $\\mathcal{N}(np, np(1-p))$. That is why proportions get normal-based confidence intervals and z-tests, and why the bell curve shows up the moment you count a lot of yes/no trials. (Use the $\\pm\\tfrac12$ continuity correction when $n$ is only moderate.)</p>\n</details>\n",
          "mcq": [
            {
              "q": "For a Bernoulli($p$) variable, at which value of $p$ is the variance $p(1-p)$ largest, and what is that maximum?",
              "choices": [
                "At $p=0.5$, where the variance equals $0.25$",
                "At $p=1$, where the variance equals $1$",
                "At $p=0$, where the variance equals $0$",
                "At $p=0.5$, where the variance equals $0.5$"
              ],
              "answer": 0,
              "explain": "The parabola $p(1-p)$ peaks at $p=0.5$ with value $0.5\\cdot0.5=0.25$ — maximum uncertainty. The tempting $0.5$ confuses the maximizing $p$ with the maximum value itself."
            },
            {
              "q": "A student writes that for $X\\sim\\text{Bin}(n,p)$ the variance is $\\sqrt{np(1-p)}$. What did they get wrong?",
              "choices": [
                "Nothing — that is the correct variance",
                "The variance is $np(1-p)^2$ because failures are squared",
                "The variance is $np$, the same as the mean",
                "$\\sqrt{np(1-p)}$ is the standard deviation; the variance is $np(1-p)$"
              ],
              "answer": 3,
              "explain": "Variance is $np(1-p)$; taking its square root gives the standard deviation $\\sigma=\\sqrt{np(1-p)}$. Mean equals variance only for the Poisson, not the binomial."
            },
            {
              "q": "You draw 5 cards from a standard 52-card deck without replacement and count the aces. Why is the count NOT Binomial?",
              "choices": [
                "The success probability $p$ changes from draw to draw, violating independence and constant $p$",
                "Each draw has more than two outcomes",
                "The number of trials is not fixed in advance",
                "The mean would be negative"
              ],
              "answer": 0,
              "explain": "Without replacement, removing a card alters the remaining composition, so $p$ shifts each draw and trials are dependent — that breaks the I and S of BINS, calling for the hypergeometric. $n=5$ is fixed and outcomes are binary (ace / not ace), so those are fine."
            },
            {
              "q": "Let $X\\sim\\text{Bin}(10,0.5)$. Using the symmetry of the distribution, what is $P(X\\ge 4)+P(X\\le 6)$ worth relative to $1$?",
              "choices": [
                "It equals $1$, since the events partition the sample space",
                "It is less than $1$, because the tails are excluded",
                "It cannot be computed without the full PMF",
                "It exceeds $1$, because the events overlap on $4\\le X\\le 6$"
              ],
              "answer": 3,
              "explain": "The two events overlap on $\\{4,5,6\\}$, so their probabilities double-count that middle region; the sum is therefore greater than $1$. They do not partition the space, so the answer is not $1$."
            },
            {
              "q": "Two independent counts $X\\sim\\text{Bin}(3,0.4)$ and $Y\\sim\\text{Bin}(5,0.4)$ are added. What is the distribution and mean of $X+Y$?",
              "choices": [
                "Not binomial, because two binomials never add to a binomial",
                "$\\text{Bin}(15,0.4)$ with mean $6$",
                "$\\text{Bin}(8,0.8)$ with mean $6.4$",
                "$\\text{Bin}(8,0.4)$ with mean $3.2$"
              ],
              "answer": 3,
              "explain": "Independent binomials with the SAME $p$ add by pooling trials: $\\text{Bin}(n_1+n_2,p)=\\text{Bin}(8,0.4)$, mean $8(0.4)=3.2$. The $p$ values do not add, and $n$ is $3+5=8$, not $3\\times5$."
            },
            {
              "q": "A factory makes items that are defective independently with probability $p=0.02$; a batch has $n=100$ items. What are the mean and standard deviation of the number of defectives?",
              "choices": [
                "Mean $2$, standard deviation $1.96$",
                "Mean $0.02$, standard deviation $0.14$",
                "Mean $2$, standard deviation $1.4$",
                "Mean $98$, standard deviation $1.4$"
              ],
              "answer": 2,
              "explain": "Mean $=np=100(0.02)=2$; variance $=np(1-p)=100(0.02)(0.98)=1.96$, so $\\sigma=\\sqrt{1.96}=1.4$. The tempting $1.96$ is the variance, not the standard deviation."
            },
            {
              "q": "Why does the factor $\\binom{n}{k}$ appear in the Binomial PMF $\\binom{n}{k}p^k(1-p)^{n-k}$?",
              "choices": [
                "It is the probability of any one sequence with $k$ successes",
                "It counts the number of distinct orderings (which $k$ of the $n$ trials succeed), all sharing the same probability $p^k(1-p)^{n-k}$",
                "It normalizes the probabilities so they exceed $1$",
                "It corrects for the trials not being independent"
              ],
              "answer": 1,
              "explain": "A single specific sequence has probability $p^k(1-p)^{n-k}$; the coefficient counts how many such sequences exist, $\\binom{n}{k}$ ways to choose which trials succeed. It is a count of arrangements, not a probability itself."
            },
            {
              "q": "After 6 straight tails on a fair coin, a gambler bets heavily on heads next, reasoning heads is 'overdue.' From the Bernoulli/Binomial viewpoint, what is the flaw?",
              "choices": [
                "He is right — the long-run frequency must force a head soon",
                "Each flip is an independent Bernoulli($0.5$); past results do not change $P(\\text{heads})=0.5$ on the next flip",
                "The flips are not really independent, so the bet is justified",
                "The next flip's probability of heads rises to compensate, but only slightly"
              ],
              "answer": 1,
              "explain": "Independence means the coin has no memory: $P(\\text{heads})=0.5$ regardless of history. The 'due' belief is the gambler's fallacy — long-run frequency convergence does not require short-run compensation."
            },
            {
              "q": "Let $X\\sim\\text{Bin}(9,0.5)$. Because $(n+1)p=10\\cdot0.5=5$ is an integer, what is true about the most likely value(s) of $X$?",
              "choices": [
                "Every value is equally likely since $p=0.5$",
                "There is a unique mode at $k=5$",
                "There are two equally likely modes, at $k=4$ and $k=5$",
                "The mode is the mean, $4.5$, which $X$ can attain"
              ],
              "answer": 2,
              "explain": "When $(n+1)p$ is an integer, the PMF ties at $k=(n+1)p-1$ and $k=(n+1)p$, here $k=4$ and $k=5$ (each $\\approx0.246$). The mean $4.5$ is not an attainable value of an integer-valued $X$."
            },
            {
              "q": "Two independent Bernoulli($p$) indicators $X_1,X_2$ are added. For their sum $S=X_1+X_2$, what is $P(S=1)$?",
              "choices": [
                "$2p(1-p)$",
                "$p^2$",
                "$p(1-p)$",
                "$2p$"
              ],
              "answer": 0,
              "explain": "$S\\sim\\text{Bin}(2,p)$, and $P(S=1)=\\binom{2}{1}p(1-p)=2p(1-p)$ — exactly one of the two succeeds, and there are two ways for that to happen. Forgetting the factor of $2$ (the ordering) gives the tempting $p(1-p)$."
            },
            {
              "q": "For $X\\sim\\text{Bin}(10,0.2)$, what is $P(X=0)$?",
              "choices": [
                "$0.2^{10}$",
                "$(0.8)^{10}\\approx0.107$",
                "$0$, since at least one success is guaranteed",
                "$1-0.2=0.8$"
              ],
              "answer": 1,
              "explain": "Zero successes means all 10 trials fail: $P(X=0)=(1-p)^{10}=(0.8)^{10}\\approx0.107$. The choice $0.2^{10}$ would be the probability of all successes, and nothing forces at least one success."
            },
            {
              "q": "A coin is biased with $p=0.9$ for heads. Compared with a fair coin, how does the variance of the number of heads in $n=10$ flips change?",
              "choices": [
                "It rises, because heads are more frequent",
                "It stays at $2.5$, since variance depends only on $n$",
                "It becomes negative, reflecting the bias",
                "It falls (from $2.5$ to $0.9$), because outcomes are more predictable near $p=1$"
              ],
              "answer": 3,
              "explain": "Variance $np(1-p)$ is maximal at $p=0.5$ ($10\\cdot0.25=2.5$) and shrinks toward the extremes: at $p=0.9$ it is $10(0.9)(0.1)=0.9$. A near-certain outcome carries little uncertainty, so the spread drops; variance can never be negative."
            },
            {
              "answer": 2,
              "q": "For $X \\sim \\text{Bin}(20, 0.3)$, what are the mean and variance?",
              "choices": [
                "Mean $0.3$, variance $0.21$ (the per-trial values).",
                "Mean $6$, variance $\\sqrt{4.2} \\approx 2.05$.",
                "Mean $np = 6$, variance $np(1-p) = 20(0.3)(0.7) = 4.2$.",
                "Mean $20$, variance $20$."
              ],
              "explain": "A Binomial is a sum of $n$ independent Bernoulli($p$) indicators, so $\\mathbb{E}[X]=np=20(0.3)=6$ and (variances add under independence) $\\text{Var}(X)=np(1-p)=20(0.3)(0.7)=4.2$. Choice B confuses variance with standard deviation; A gives the per-trial moments."
            },
            {
              "answer": 0,
              "q": "You flip a coin repeatedly and stop as soon as you get your 3rd head, recording the total number of flips. Why is that count NOT Binomial?",
              "choices": [
                "The number of trials is not fixed in advance — you stop based on the outcomes (waiting for the 3rd success), so $n$ is random. (This is a negative-binomial count, not Binomial.)",
                "The trials aren't independent, since later flips depend on earlier ones.",
                "The success probability $p$ changes from flip to flip.",
                "The trials aren't binary — \"heads/tails\" is two outcomes, which violates the Binary condition."
              ],
              "explain": "Binomial requires the BINS conditions, including a Number of trials fixed ahead of time. Here you keep flipping until the 3rd head, so the trial count is itself random — a stopping rule, not a fixed $n$. That makes it a negative-binomial random variable. (Binary, Independent, and Same-$p$ all still hold for a fair coin.)"
            },
            {
              "answer": 1,
              "q": "For a Binomial, $\\mathbb{E}[X]=np$ follows from linearity of expectation, but $\\text{Var}(X)=np(1-p)$ requires an extra assumption the mean did not. Which assumption, and why?",
              "choices": [
                "The mean secretly needs independence too; both formulas require it equally.",
                "Variance needs the trials to be independent (so the cross-covariances vanish and variances add); linearity of expectation holds even for dependent variables, so the mean needs no such assumption.",
                "Variance needs the trials to be identically distributed, while the mean does not.",
                "Variance needs $n$ to be large (a normal approximation); the mean is exact for any $n$."
              ],
              "explain": "Expectation is linear unconditionally: $\\mathbb{E}[\\sum X_i]=\\sum\\mathbb{E}[X_i]=np$ regardless of dependence. But $\\text{Var}(\\sum X_i)=\\sum\\text{Var}(X_i)$ only when the covariance terms are zero — i.e. when the trials are independent. With independence, $\\text{Var}(X)=np(1-p)$."
            },
            {
              "answer": 2,
              "q": "How is the Bernoulli($p$) distribution related to the Binomial?",
              "choices": [
                "Bernoulli($p$) equals $\\text{Bin}(p, n)$ with the arguments swapped.",
                "Bernoulli is the continuous version of the Binomial.",
                "Bernoulli($p$) is exactly $\\text{Bin}(1, p)$ — the single-trial special case; a Binomial($n,p$) is the sum of $n$ independent Bernoulli($p$) trials.",
                "They are unrelated — Bernoulli counts failures, Binomial counts successes."
              ],
              "explain": "A Bernoulli trial is one yes/no experiment; summing $n$ independent Bernoulli($p$) indicators gives Binomial($n,p$). So Bernoulli($p$) is precisely the $n=1$ case, $\\text{Bin}(1,p)$, with mean $p$ and variance $p(1-p)$."
            }
          ],
          "flashcards": [
            {
              "front": "Define a Bernoulli($p$) random variable and give its mean and variance.",
              "back": "$X \\in \\{0,1\\}$ with $P(X=1)=p$, $P(X=0)=1-p$. Mean $\\mathbb{E}[X]=p$; variance $\\text{Var}(X)=p(1-p)$ (maximal at $p=0.5$, value $0.25$)."
            },
            {
              "front": "What is the Binomial PMF, and what does each factor mean?",
              "back": "$P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}$. $\\binom{n}{k}$ counts the arrangements of $k$ successes among $n$ trials; $p^k(1-p)^{n-k}$ is the probability of any one such sequence."
            },
            {
              "front": "Why does the binomial coefficient $\\binom{n}{k}$ appear in the PMF?",
              "back": "Each specific sequence with $k$ successes has probability $p^k(1-p)^{n-k}$, but there are $\\binom{n}{k}=\\frac{n!}{k!(n-k)!}$ different sequences (ways to choose which trials succeed). Summing equal terms multiplies by $\\binom{n}{k}$."
            },
            {
              "front": "How are the mean ($np$) and variance ($np(1-p)$) of a Binomial derived from indicators?",
              "back": "Write $X=\\sum_{i=1}^n X_i$ of i.i.d. Bernoulli($p$). Linearity gives $\\mathbb{E}[X]=\\sum p = np$. Independence makes variances add: $\\text{Var}(X)=\\sum p(1-p)=np(1-p)$."
            },
            {
              "front": "State the four conditions (BINS) for a Binomial model.",
              "back": "Binary outcomes; Independent trials; Number of trials $n$ fixed in advance; Same success probability $p$ each trial."
            },
            {
              "front": "Coin example: for $X\\sim\\text{Bin}(10,0.5)$, give $\\mathbb{E}[X]$, $\\text{Var}(X)$, and $P(X=7)$.",
              "back": "$\\mathbb{E}[X]=5$, $\\text{Var}(X)=2.5$ ($\\sigma\\approx1.58$). $P(X=7)=\\binom{10}{7}(0.5)^{10}=120/1024\\approx0.117$."
            }
          ],
          "homework": [
            {
              "prompt": "A basketball player makes a free throw with probability $p=0.8$. Model a single attempt as Bernoulli($0.8$). Find its mean and variance.",
              "hint": "For Bernoulli($p$): mean is $p$, variance is $p(1-p)$. Just substitute $p=0.8$.",
              "solution": "Mean $\\mathbb{E}[X]=p=0.8$. Variance $\\text{Var}(X)=p(1-p)=0.8\\times0.2=0.16$, so $\\sigma=\\sqrt{0.16}=0.4$."
            },
            {
              "prompt": "A factory produces items that are defective independently with probability $p=0.05$. In a batch of $n=20$ items, let $X$ be the number of defectives. Compute $\\mathbb{E}[X]$, $\\text{Var}(X)$, and $P(X=2)$.",
              "hint": "$X\\sim\\text{Bin}(20,0.05)$. Use $np$, $np(1-p)$, and the PMF with $\\binom{20}{2}=190$.",
              "solution": "$\\mathbb{E}[X]=np=20\\times0.05=1$. $\\text{Var}(X)=np(1-p)=20\\times0.05\\times0.95=0.95$. For exactly two defectives: $P(X=2)=\\binom{20}{2}(0.05)^2(0.95)^{18}=190\\times0.0025\\times(0.95)^{18}$. Since $(0.95)^{18}\\approx0.3972$, this is $190\\times0.0025\\times0.3972\\approx0.475\\times0.3972\\approx0.189$. So about a 18.9% chance of exactly 2 defectives."
            },
            {
              "prompt": "A multiple-choice quiz has 12 questions, each with 4 options; a student guesses every answer at random. Let $X$ be the number correct. Find $\\mathbb{E}[X]$ and $\\text{Var}(X)$, then compute $P(X\\ge 1)$ (at least one correct). Briefly justify why the binomial model applies.",
              "hint": "Each guess is Bernoulli with $p=1/4$, independent across questions, $n=12$ fixed — so $X\\sim\\text{Bin}(12,0.25)$. For 'at least one', use the complement $1-P(X=0)$.",
              "solution": "The model fits because the 12 guesses are Binary (right/wrong), Independent, Number fixed at 12, and Same $p=0.25$ each. So $X\\sim\\text{Bin}(12,0.25)$. Mean $\\mathbb{E}[X]=np=12\\times0.25=3$. Variance $\\text{Var}(X)=np(1-p)=12\\times0.25\\times0.75=2.25$ ($\\sigma=1.5$). For at least one correct, use the complement: $P(X\\ge1)=1-P(X=0)=1-\\binom{12}{0}(0.25)^0(0.75)^{12}=1-(0.75)^{12}$. Since $(0.75)^{12}\\approx0.0317$, we get $P(X\\ge1)\\approx1-0.0317=0.968$. So a random guesser is about 96.8% likely to get at least one right."
            }
          ],
          "examples": [
            {
              "title": "Heads in five fair coin flips",
              "body": "Flip a fair coin 5 times and let $X$ be the number of heads. Each flip is Bernoulli($0.5$) and the flips are independent with $n=5$ fixed, so $X\\sim\\text{Bin}(5,0.5)$. Find the full probability of getting exactly 3 heads, plus the mean and variance.",
              "solution": "PMF: $P(X=3)=\\binom{5}{3}(0.5)^3(0.5)^2=\\binom{5}{3}(0.5)^5$. Here $\\binom{5}{3}=\\frac{5!}{3!\\,2!}=10$ and $(0.5)^5=\\frac{1}{32}$, so $P(X=3)=\\frac{10}{32}=0.3125$. The 10 counts the distinct sequences of 3 H and 2 T (e.g. HHHTT, HHTHT, ...). Mean $\\mathbb{E}[X]=np=5\\times0.5=2.5$; variance $\\text{Var}(X)=np(1-p)=5\\times0.5\\times0.5=1.25$, so $\\sigma\\approx1.118$. As a check, the full distribution $\\{1,5,10,10,5,1\\}/32$ sums to $32/32=1$."
            },
            {
              "title": "Defective light bulbs from a large shipment",
              "body": "A large shipment of light bulbs has a true defect rate of $p=0.10$. A quality inspector samples $n=8$ bulbs (the shipment is large enough that removing 8 barely changes $p$, so trials are effectively independent and identical). Let $X$ be the number of defective bulbs found. What is the probability of finding at most one defective bulb, and what is the expected number?",
              "solution": "Model: $X\\sim\\text{Bin}(8,0.10)$ — the large-shipment assumption is what justifies treating the draws as independent with constant $p$. 'At most one' means $X=0$ or $X=1$: $P(X\\le1)=P(X=0)+P(X=1)$. $P(X=0)=\\binom{8}{0}(0.1)^0(0.9)^8=(0.9)^8\\approx0.4305$. $P(X=1)=\\binom{8}{1}(0.1)^1(0.9)^7=8\\times0.1\\times(0.9)^7=0.8\\times0.4783\\approx0.3826$. Adding: $P(X\\le1)\\approx0.4305+0.3826=0.8131$, about 81.3%. Expected defectives: $\\mathbb{E}[X]=np=8\\times0.10=0.8$, with variance $\\text{Var}(X)=np(1-p)=8\\times0.1\\times0.9=0.72$."
            },
            {
              "title": "Mean and variance of a binomial",
              "body": "A factory's bulbs are defective with probability $p = 0.3$. In a box of $n = 20$, how many defectives do you expect, and how spread out is that count?",
              "solution": "<strong>A binomial is a sum of Bernoullis.</strong> $X = \\sum_{i=1}^{n} X_i$, where each $X_i$ is 1 (defective) with probability $p$. That makes its moments fall out of the single-trial ones.\n<strong>Mean.</strong> By linearity of expectation, $\\mathbb{E}[X] = n p = 20 \\times 0.3 = 6$ defectives.\n<strong>Variance.</strong> The trials are independent, so variances add: $\\mathrm{Var}(X) = n p (1 - p) = 20 \\times 0.3 \\times 0.7 = 4.2$, a standard deviation of $\\sqrt{4.2} \\approx 2.05$.\n<strong>Reading it.</strong> Expect about $6 \\pm 2$ defectives per box. The variance is largest at $p = 0.5$ (maximum uncertainty) and vanishes at $p = 0$ or $1$ (no randomness) — the $p(1-p)$ factor is one coin flip's spread, scaled up by $n$."
            }
          ]
        },
        {
          "id": "ps-poisson",
          "title": "The Poisson Distribution",
          "minutes": 14,
          "content": "<p><em>Imagine you run a small bakery. On a quiet Tuesday afternoon, customers wander in seemingly at random — sometimes three in a minute, sometimes none for five minutes. You can't predict <strong>when</strong> the next one arrives, but over a whole afternoon you average about 6 customers per hour. How many customers should you expect in the next 20 minutes? What's the chance that <em>nobody</em> shows up? The Poisson distribution is the mathematical machine built precisely for counting rare, independent events over a fixed window.</em></p>\n\n<h3>1. The intuition: counting random arrivals</h3>\n<p>Many real situations involve <strong>counting how many times something happens</strong> in a fixed interval of time, space, or volume, where each occurrence is independent and the average rate is steady:</p>\n<ul>\n<li>Phone calls reaching a help desk in an hour</li>\n<li>Typos (defects) on a printed page</li>\n<li>Radioactive decays detected per second</li>\n<li>Emails arriving in your inbox per minute</li>\n</ul>\n<p>The key features are: events are <strong>rare in any tiny slice</strong> of the interval, they occur <strong>independently</strong>, and they happen at a <strong>constant average rate</strong>. If a single number $\\lambda$ (the expected count) captures the average, the Poisson distribution tells you the full probability of seeing exactly $0, 1, 2, \\dots$ events.</p>\n\n<div data-viz=\"ps-poisson-viz\"></div>\n<h3>2. The formula (PMF)</h3>\n<p>A random variable $X$ follows a <strong>Poisson distribution</strong> with parameter $\\lambda > 0$, written $X \\sim \\text{Poisson}(\\lambda)$, if for $k = 0, 1, 2, \\dots$:</p>\n$$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$$\n<p>Here $\\lambda$ is the <strong>average number of events</strong> in the interval, $e \\approx 2.71828$, and $k!$ is the factorial. The factor $e^{-\\lambda}$ is exactly what makes the probabilities sum to 1, because the Taylor series gives $\\sum_{k=0}^{\\infty} \\frac{\\lambda^k}{k!} = e^{\\lambda}$, so $\\sum_k P(X=k) = e^{-\\lambda} e^{\\lambda} = 1$.</p>\n<p><em>Quick numeric check.</em> With $\\lambda = 2$, the chance of seeing exactly $k=3$ events is $P(X=3) = \\frac{2^3 e^{-2}}{3!} = \\frac{8 \\cdot 0.1353}{6} \\approx 0.180$ — about an 18% chance.</p>\n\n<h3>3. The striking fact: mean = variance = λ</h3>\n<p>The single parameter $\\lambda$ plays a double role: it is <strong>both the mean and the variance</strong>:</p>\n$$\\mathbb{E}[X] = \\lambda, \\qquad \\text{Var}(X) = \\lambda$$\n<p>This is unusual and useful. It means the standard deviation is $\\sigma = \\sqrt{\\lambda}$. As $\\lambda$ grows, the absolute spread $\\sqrt{\\lambda}$ grows but the <em>relative</em> spread $\\sqrt{\\lambda}/\\lambda = 1/\\sqrt{\\lambda}$ shrinks — busy systems are proportionally more predictable. Practically, the equality is a diagnostic: if your count data has variance much larger than its mean (<em>overdispersion</em>), a plain Poisson model is probably wrong.</p>\n\n<div data-viz=\"ps-binomial-poisson\"></div>\n<h3>4. Poisson as the limit of the Binomial (law of rare events)</h3>\n<p>Where does $e^{-\\lambda}$ come from? Split the interval into $n$ tiny sub-slices, each so small that at most one event can occur, with success probability $p$ per slice. The count is then $\\text{Binomial}(n, p)$. Now let $n \\to \\infty$ and $p \\to 0$ while holding $np = \\lambda$ fixed. Then:</p>\n$$\\binom{n}{k} p^k (1-p)^{n-k} \\;\\longrightarrow\\; \\frac{\\lambda^k e^{-\\lambda}}{k!}$$\n<p>The pieces: $\\binom{n}{k}p^k \\approx \\frac{n^k}{k!}\\left(\\frac{\\lambda}{n}\\right)^k = \\frac{\\lambda^k}{k!}$, and $(1-p)^{n-k} = \\left(1 - \\frac{\\lambda}{n}\\right)^{n-k} \\to e^{-\\lambda}$. This is the <strong>law of rare events</strong>: a huge number of trials, each with a tiny success chance, gives Poisson counts. That is why typos on a page (thousands of characters, each rarely a mistake) or accidents in a city (many drivers, each rarely crashing) follow Poisson so well.</p>\n\n<p><b>Try it in code.</b> Plug straight into the Poisson PMF $P(X=k)=\\lambda^k e^{-\\lambda}/k!$ for $\\lambda=2,\\,k=3$.</p>\n<div data-code=\"javascript\" data-expected=\"0.180\">// Poisson PMF: P(X = k) = lambda^k * e^(-lambda) / k!\nconst lambda = 2, k = 3;\nlet fact = 1;\nfor (let i = k; i >= 1; i--) fact *= i;   // k! = 6\nconst p = Math.pow(lambda, k) * Math.exp(-lambda) / fact;\nconsole.log(p.toFixed(3));</div>\n<h3>5. A fully worked example</h3>\n<p>A call center receives an average of $\\lambda = 4$ calls per minute. What is the probability of receiving <strong>exactly 2 calls</strong> in a given minute?</p>\n$$P(X = 2) = \\frac{4^2 e^{-4}}{2!} = \\frac{16 \\cdot 0.018316}{2} = \\frac{0.29306}{2} \\approx 0.1465$$\n<p>So about a <strong>14.7%</strong> chance. And the probability of <strong>at least one</strong> call uses the complement: $P(X \\geq 1) = 1 - P(X=0) = 1 - e^{-4} \\approx 1 - 0.0183 = 0.9817$. Almost certainly the phone rings. Notice we never needed $n$ or $p$ — just the rate $\\lambda$.</p>\n\n<p><strong>Takeaway:</strong> when you count independent rare events at a steady rate, reach for Poisson. One number $\\lambda$ gives you the entire distribution, its mean, and its variance all at once.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Poisson distribution is the law of rare events</summary>\n<p>Where does the Poisson come from? Start with a binomial: $n$ independent trials, each a success with small probability $p$. Now let $n \\to \\infty$ and $p \\to 0$ while holding the <em>expected</em> count $\\lambda = np$ fixed. The binomial PMF converges exactly to the Poisson PMF $P(k) = e^{-\\lambda}\\lambda^k / k!$. Poisson <em>is</em> the binomial in the limit of <b>many trials, each almost never succeeding</b>.</p>\n<p>That's why it models counts of rare events in a fixed interval — calls per minute, mutations per genome, typos per page: a huge number of \"opportunities,\" each with a tiny chance, at a stable average rate. The single parameter $\\lambda$ is <em>both</em> the mean and the variance ($\\mathbb{E}[X] = \\mathrm{Var}(X) = \\lambda$) — a fingerprint you can test for (if the variance far exceeds the mean, the events aren't independent Poisson).</p>\n<p>The \"aha\": you never need $n$ and $p$ separately — only their product $\\lambda$. The rare-event limit washes out everything else, which is why one tidy parameter captures so many real-world counts.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Poisson is the binomial's limit, and mean = variance</summary>\n<p>The \"law of rare events\" has a precise origin: the Poisson distribution is the <b>limit of the binomial</b> when trials are many and each success is rare. Take $\\text{Binomial}(n, p)$ with $n \\to \\infty$ and $p \\to 0$ while the mean $np = \\lambda$ stays fixed — the distribution converges to $\\text{Poisson}(\\lambda)$.</p>\n<p><b>Check it numerically.</b> $\\text{Binomial}(1000,\\, 0.005)$ has $\\lambda = np = 5$; its probability at $k=5$ is $\\approx 0.176$, essentially identical to $\\text{Poisson}(5)$'s $\\approx 0.175$. Many independent rare chances — radioactive decays, typos per page, requests per second — become Poisson.</p>\n<p><b>The signature: mean = variance = $\\lambda$.</b> A Poisson has $\\mathbb{E}[X] = \\text{Var}(X) = \\lambda$ — its spread is locked to its mean. That is also a <em>diagnostic</em>: if count data has variance noticeably <em>larger</em> than its mean, it is <b>overdispersed</b> and not Poisson (reach for a negative binomial instead).</p>\n<p>The \"aha\": Poisson is not a separate magic formula — it is the binomial pushed to its many-trials-rare-success limit, which is why it appears wherever you count independent rare events. And the mean-equals-variance identity is both its defining fingerprint and a quick test for whether your data is actually Poisson.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Poisson process and exponential waiting times</summary>\n<p>The Poisson distribution counts events; pair it with <em>when</em> those events happen and you get the <strong>Poisson process</strong> — the canonical model of random arrivals in continuous time, and the bridge to the exponential distribution.</p>\n<p><b>The setup.</b> Events occur independently at a constant average rate $\\lambda$ per unit time. Then the <em>number</em> of events in any window of length $t$ is Poisson with mean $\\lambda t$ — and the <em>gap</em> between consecutive events is <strong>Exponential</strong> with rate $\\lambda$ (mean $1/\\lambda$). One process, two faces: count the events (Poisson) or time the waits (exponential).</p>\n<p><b>Why they are linked.</b> \"No event in the next $t$\" is a Poisson count of zero: $P(N=0)=e^{-\\lambda t}$. But \"no event in the next $t$\" is also \"the wait exceeds $t$\", so $P(T>t)=e^{-\\lambda t}$ — exactly the exponential survival function. The exponential's famous <em>memorylessness</em> falls straight out: the process has no clock, so the wait from now is always fresh.</p>\n<p>The \"aha\": the Poisson distribution and the exponential are two views of one random-arrivals process — counts in a window are Poisson($\\lambda t$), gaps between arrivals are Exponential($\\lambda$), linked by $P(\\text{no event in } t)=e^{-\\lambda t}$. It models calls to a server, radioactive decays, mutations, web requests — anything that happens at a steady rate but at random instants.</p>\n</details>\n",
          "mcq": [
            {
              "q": "At the bakery, customers arrive at an average rate of 6 per hour. If arrivals follow a Poisson process, what is the expected number of customers in the next 20 minutes?",
              "choices": [
                "6",
                "18",
                "2",
                "0.3"
              ],
              "answer": 2,
              "explain": "The rate scales with the window: 20 minutes is $1/3$ of an hour, so $\\lambda = 6 \\times \\frac{1}{3} = 2$. The value 6 ignores the shorter window, and 18 wrongly multiplies instead of dividing."
            },
            {
              "q": "With an expected $\\lambda = 2$ customers in 20 minutes, what is the probability that nobody shows up in that window?",
              "choices": [
                "$1 - 2 = -1$",
                "$\\frac{2^0}{0!} = 1$",
                "$\\frac{1}{2} = 0.5$",
                "$e^{-2} \\approx 0.135$"
              ],
              "answer": 3,
              "explain": "$P(X=0) = \\frac{\\lambda^0 e^{-\\lambda}}{0!} = e^{-2} \\approx 0.135$. Forgetting the $e^{-\\lambda}$ factor (just using $\\lambda^0/0! = 1$) is the classic mistake."
            },
            {
              "q": "For a Poisson random variable $X$ with parameter $\\lambda$, what are its mean and variance?",
              "choices": [
                "Mean $\\lambda$, variance $\\lambda^2$",
                "Mean $\\lambda$, variance $\\lambda$",
                "Mean $\\lambda$, variance $\\sqrt{\\lambda}$",
                "Mean $\\lambda$, variance $1$"
              ],
              "answer": 1,
              "explain": "A defining property of the Poisson distribution is that its mean and variance are both equal to $\\lambda$. Confusing it with other distributions leads to guessing $\\lambda^2$ or $\\sqrt{\\lambda}$."
            },
            {
              "q": "A help desk receives calls following a Poisson distribution with $\\lambda = 3$ per hour. What is the probability of receiving exactly 2 calls in an hour?",
              "choices": [
                "$\\frac{3^2}{2!} \\approx 4.5$",
                "$\\frac{2^3 e^{-2}}{3!} \\approx 0.180$",
                "$e^{-3} \\approx 0.050$",
                "$\\frac{3^2 e^{-3}}{2!} \\approx 0.224$"
              ],
              "answer": 3,
              "explain": "Plug into the PMF: $P(X=2) = \\frac{3^2 e^{-3}}{2!} = \\frac{9 e^{-3}}{2} \\approx 0.224$. Choice 0 drops the $e^{-\\lambda}$ term (and yields an impossible probability $> 1$); choice 3 swaps the roles of $k$ and $\\lambda$."
            },
            {
              "q": "Why must a valid count from a Poisson distribution be a non-negative integer ($0, 1, 2, \\dots$) even though $\\lambda$ can be a decimal like $2.5$?",
              "choices": [
                "Because $\\lambda$ is always rounded to an integer before use",
                "Because the Poisson distribution is continuous, not discrete",
                "Because the PMF is only defined when $\\lambda$ is an integer",
                "Because you cannot observe a fractional number of discrete events, but the average of those counts can be fractional"
              ],
              "answer": 3,
              "explain": "You can never count 2.5 customers in a single window, but averaging many windows can give a non-integer mean. $\\lambda$ is the expected value, not a possible outcome, and the distribution is discrete."
            },
            {
              "q": "Emails arrive at $\\lambda = 4$ per hour. Using the recurrence $P(X=k+1) = \\frac{\\lambda}{k+1}P(X=k)$, which count $k$ has the HIGHEST probability (the mode)?",
              "choices": [
                "$k = 0$",
                "$k = 4$ only",
                "$k = 3$ and $k = 4$ (tied)",
                "$k = 8$"
              ],
              "answer": 2,
              "explain": "When $\\lambda$ is an integer, the modes are at $k = \\lambda$ and $k = \\lambda - 1$, which are tied; here that is $k = 3$ and $k = 4$. The ratio $\\frac{\\lambda}{k+1}$ equals 1 exactly when $k+1 = \\lambda$, making those two values equal."
            },
            {
              "q": "Two independent Poisson processes feed one inbox: work emails at $\\lambda_1 = 5$/hour and personal emails at $\\lambda_2 = 3$/hour. What is the distribution of the total number of emails per hour?",
              "choices": [
                "Poisson with $\\lambda = \\sqrt{34}$",
                "Poisson with $\\lambda = 15$",
                "Poisson with $\\lambda = 8$",
                "Not Poisson; the sum of two Poissons is never Poisson"
              ],
              "answer": 2,
              "explain": "The sum of independent Poisson variables is Poisson with parameter equal to the sum of the rates: $\\lambda = 5 + 3 = 8$. Rates add (not multiply, giving 15), and the sum remains Poisson."
            },
            {
              "q": "A printed page has on average $\\lambda = 0.5$ typos. What is the probability a page has AT LEAST one typo?",
              "choices": [
                "$0.5$",
                "$1 - e^{-0.5} \\approx 0.393$",
                "$e^{-0.5} \\approx 0.607$",
                "$1 - 0.5 = 0.5$"
              ],
              "answer": 1,
              "explain": "Use the complement: $P(X \\ge 1) = 1 - P(X=0) = 1 - e^{-0.5} \\approx 0.393$. Confusing $\\lambda$ itself with a probability gives the tempting (wrong) answer 0.5."
            },
            {
              "q": "A student computes $P(X=3)$ for $\\lambda = 2$ and gets $1.33$. What is the most likely error?",
              "choices": [
                "They used the wrong value of $k$",
                "They forgot the $e^{-\\lambda}$ factor, since $\\frac{2^3}{3!} = 1.33$",
                "Nothing — probabilities can exceed 1 for Poisson",
                "They should have used $\\lambda = 3$ instead"
              ],
              "answer": 1,
              "explain": "$\\frac{2^3}{3!} = \\frac{8}{6} \\approx 1.33$, exactly the PMF without the $e^{-\\lambda}$ multiplier. Any probability above 1 is impossible, signalling the missing decay factor $e^{-2} \\approx 0.135$ that brings it to $\\approx 0.180$."
            },
            {
              "q": "Which assumption, if violated, would make the Poisson model INAPPROPRIATE for counting bakery arrivals over an afternoon?",
              "choices": [
                "Customers tend to arrive in coordinated tour-bus groups, so arrivals are not independent",
                "The average rate is a non-integer like 6.5 per hour",
                "Some afternoons had zero customers in a 5-minute slice",
                "The window of interest is only 20 minutes rather than a full hour"
              ],
              "answer": 0,
              "explain": "Poisson requires events to occur independently; clustered tour-bus arrivals break that assumption. A non-integer rate, occasional empty windows, and short windows are all perfectly compatible with the Poisson model."
            },
            {
              "q": "As the rate $\\lambda$ grows large, the Poisson distribution becomes increasingly well-approximated by which distribution?",
              "choices": [
                "The normal (Gaussian) distribution with mean $\\lambda$ and variance $\\lambda$",
                "The uniform distribution on $[0, \\lambda]$",
                "The exponential distribution with rate $\\lambda$",
                "The Bernoulli distribution"
              ],
              "answer": 0,
              "explain": "For large $\\lambda$, the Poisson distribution approaches a normal distribution with mean $\\lambda$ and variance $\\lambda$ (matching its moments). The exponential describes the waiting time between events, not the count itself."
            },
            {
              "q": "At the bakery, $\\lambda = 6$ customers per hour. Which statement correctly interprets the constant-rate assumption?",
              "choices": [
                "Customers are equally likely to arrive at any instant, so two disjoint 30-minute windows each have $\\lambda = 3$ on average",
                "Exactly 6 customers arrive in every hour-long window",
                "Once 6 customers have arrived, no more can come that hour",
                "The probability of an arrival doubles after each customer leaves"
              ],
              "answer": 0,
              "explain": "A constant rate means arrivals are spread uniformly in expectation, so any 30-minute slice averages $6 \\times \\frac{1}{2} = 3$. The count varies randomly around its mean, so it is not fixed at exactly 6, nor capped, nor dependent on prior arrivals."
            },
            {
              "answer": 3,
              "q": "The lesson derives Poisson as a limiting case of the Binomial (the \"law of rare events\"). Which limit produces it?",
              "choices": [
                "$n \\to \\infty$ with $p$ held fixed, so $np \\to \\infty$.",
                "$n \\to 0$ and $p \\to \\infty$ with $n/p$ fixed.",
                "$p \\to 1$ with $n$ fixed, so successes become certain.",
                "$n \\to \\infty$ and $p \\to 0$ together, with the product $np = \\lambda$ held fixed."
              ],
              "explain": "Split a window into $n$ tiny slices, each with success probability $p$ and at most one event; the count is $\\text{Bin}(n,p)$. Letting $n\\to\\infty$, $p\\to 0$ with $np=\\lambda$ fixed, $\\binom{n}{k}p^k(1-p)^{n-k}\\to \\frac{\\lambda^k e^{-\\lambda}}{k!}$. Many trials, each rarely succeeding, give Poisson counts."
            },
            {
              "answer": 0,
              "q": "You model daily counts as Poisson, but the data's sample variance is about 5× its sample mean. What does this most likely indicate?",
              "choices": [
                "Overdispersion — a plain Poisson model is probably wrong, because Poisson forces $\\text{Var}(X)=\\mathbb{E}[X]=\\lambda$ (variance and mean equal).",
                "The data fits Poisson perfectly, since the variance should be the square of the mean.",
                "The rate $\\lambda$ must be negative.",
                "Nothing — Poisson allows variance and mean to differ freely."
              ],
              "explain": "A defining feature of the Poisson is $\\text{Var}(X)=\\mathbb{E}[X]=\\lambda$ — variance equals mean. If the observed variance greatly exceeds the mean (overdispersion), that assumption is violated and a plain Poisson is a poor fit (a negative-binomial model is a common alternative)."
            },
            {
              "answer": 1,
              "q": "For Poisson($\\lambda$), $\\sigma = \\sqrt{\\lambda}$. As $\\lambda$ grows, how does the *relative* spread (coefficient of variation $\\sigma/\\mathbb{E}[X]$) behave?",
              "choices": [
                "It grows like $\\sqrt{\\lambda}$, so busier systems are proportionally noisier.",
                "It shrinks like $1/\\sqrt{\\lambda}$, so busier systems (large $\\lambda$) are proportionally *more* predictable.",
                "It grows linearly with $\\lambda$.",
                "It stays constant at 1, regardless of $\\lambda$."
              ],
              "explain": "The coefficient of variation is $\\sigma/\\mathbb{E}[X] = \\sqrt{\\lambda}/\\lambda = 1/\\sqrt{\\lambda}$. The absolute spread $\\sqrt{\\lambda}$ grows with $\\lambda$, but relative to the mean it shrinks — a system averaging 10,000 events/day is proportionally far steadier than one averaging 4."
            },
            {
              "answer": 2,
              "q": "Radioactive decays are detected at an average rate of $\\lambda = 3$ per second. What is the probability of detecting exactly 2 in a given second? (Use $e^{-3} \\approx 0.0498$.)",
              "choices": [
                "$\\frac{3^2}{2!} = 4.5$",
                "$e^{-3} \\approx 0.0498$",
                "$\\frac{3^2 e^{-3}}{2!} = \\frac{9(0.0498)}{2} \\approx 0.224$",
                "$\\frac{2^3 e^{-3}}{3!} \\approx 0.066$"
              ],
              "explain": "$P(X=k)=\\frac{\\lambda^k e^{-\\lambda}}{k!}$. With $\\lambda=3, k=2$: $\\frac{3^2 e^{-3}}{2!} = \\frac{9\\cdot 0.0498}{2} \\approx 0.224$, about a 22% chance. Choice A drops the $e^{-\\lambda}$ (and exceeds 1); choice D swaps $\\lambda$ and $k$."
            }
          ],
          "flashcards": [
            {
              "front": "What is the Poisson PMF?",
              "back": "For $X \\sim \\text{Poisson}(\\lambda)$ and $k = 0,1,2,\\dots$: $P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$, where $\\lambda > 0$ is the average number of events in the interval."
            },
            {
              "front": "What are the mean and variance of a Poisson($\\lambda$) variable?",
              "back": "Both equal $\\lambda$: $\\mathbb{E}[X] = \\lambda$ and $\\text{Var}(X) = \\lambda$. So the standard deviation is $\\sigma = \\sqrt{\\lambda}$. (Mean equals variance is a signature property.)"
            },
            {
              "front": "When is the Poisson distribution the right model?",
              "back": "When counting independent, rare events over a fixed interval of time, space, or volume at a constant average rate — e.g. calls per hour, defects per page, decays per second."
            },
            {
              "front": "Why does $e^{-\\lambda}$ appear in the PMF (normalization)?",
              "back": "Because the Taylor series gives $\\sum_{k=0}^{\\infty} \\frac{\\lambda^k}{k!} = e^{\\lambda}$. Multiplying by $e^{-\\lambda}$ makes $\\sum_k P(X=k) = e^{-\\lambda} e^{\\lambda} = 1$."
            },
            {
              "front": "State the law of rare events (Binomial → Poisson limit).",
              "back": "If $n \\to \\infty$ and $p \\to 0$ with $np = \\lambda$ fixed, then $\\binom{n}{k} p^k (1-p)^{n-k} \\to \\frac{\\lambda^k e^{-\\lambda}}{k!}$. Many trials, each with tiny success probability, give Poisson counts."
            },
            {
              "front": "How do you compute $P(X \\geq 1)$ for a Poisson variable?",
              "back": "Use the complement: $P(X \\geq 1) = 1 - P(X=0) = 1 - e^{-\\lambda}$. For $\\lambda = 4$ this is $1 - e^{-4} \\approx 0.982$."
            }
          ],
          "homework": [
            {
              "prompt": "A website receives an average of $\\lambda = 5$ visitors per minute, following a Poisson process. Find the probability of receiving exactly 4 visitors in a given minute.",
              "hint": "Plug $\\lambda = 5$ and $k = 4$ into $P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$. You'll need $e^{-5} \\approx 0.0067379$.",
              "solution": "With $X \\sim \\text{Poisson}(5)$:\n$$P(X=4) = \\frac{5^4 e^{-5}}{4!} = \\frac{625 \\cdot 0.0067379}{24} = \\frac{4.2112}{24} \\approx 0.1755.$$\nSo about a 17.5% chance of exactly 4 visitors in that minute."
            },
            {
              "prompt": "A bookstore sells on average 2 copies of a rare title per week (Poisson). What is the probability it sells at least 3 copies in a given week? Then state the expected number sold and the standard deviation.",
              "hint": "'At least 3' is easiest via the complement: $P(X \\geq 3) = 1 - P(X=0) - P(X=1) - P(X=2)$. Use $e^{-2} \\approx 0.135335$.",
              "solution": "With $X \\sim \\text{Poisson}(2)$:\n$P(X=0) = e^{-2} = 0.135335$,\n$P(X=1) = 2e^{-2} = 0.270671$,\n$P(X=2) = \\frac{2^2 e^{-2}}{2!} = 2e^{-2} = 0.270671$.\nSum $= 0.676676$. Therefore\n$$P(X \\geq 3) = 1 - 0.676676 \\approx 0.3233,$$\nabout 32.3%. The expected number sold is $\\mathbb{E}[X] = \\lambda = 2$ copies, and the standard deviation is $\\sigma = \\sqrt{2} \\approx 1.41$ copies."
            },
            {
              "prompt": "A factory's screws are defective with probability $p = 0.001$. A box contains $n = 2000$ screws. Using the Poisson approximation, find the probability that a box contains at most 1 defective screw. Briefly justify why the approximation is valid here.",
              "hint": "Set $\\lambda = np$. 'At most 1' means $P(X=0) + P(X=1)$. The approximation is valid because $n$ is large and $p$ is small (law of rare events).",
              "solution": "The exact distribution is $\\text{Binomial}(2000, 0.001)$. Since $n$ is large and $p$ is small, approximate by Poisson with\n$$\\lambda = np = 2000 \\cdot 0.001 = 2.$$\nThen with $e^{-2} \\approx 0.135335$:\n$P(X=0) = e^{-2} = 0.135335$,\n$P(X=1) = 2e^{-2} = 0.270671$.\nSo\n$$P(X \\leq 1) = P(X=0) + P(X=1) = 0.135335 + 0.270671 \\approx 0.4060,$$\nabout 40.6%. The Poisson approximation is justified because each screw is an independent trial with a tiny defect probability and there are many trials, so $\\text{Binomial}(n,p) \\to \\text{Poisson}(np)$ as $n \\to \\infty$, $p \\to 0$ with $np$ fixed."
            }
          ],
          "examples": [
            {
              "title": "Defects on a production line",
              "body": "A factory produces fabric rolls. On average, a 50-meter roll has $\\lambda = 3$ defects, and defects occur independently at a constant rate. (a) What is the probability a roll has exactly 1 defect? (b) What is the probability it has no defects at all? (c) What is the expected number of defects and the standard deviation?",
              "solution": "Model the defect count as $X \\sim \\text{Poisson}(3)$.\n\n(a) $P(X=1) = \\frac{3^1 e^{-3}}{1!} = 3 \\cdot e^{-3} = 3 \\cdot 0.049787 \\approx 0.1494$, about 14.9%.\n\n(b) $P(X=0) = \\frac{3^0 e^{-3}}{0!} = e^{-3} \\approx 0.0498$, about 5.0%. So only 1 roll in 20 is defect-free.\n\n(c) Mean $= \\lambda = 3$ defects. Variance $= \\lambda = 3$, so standard deviation $= \\sqrt{3} \\approx 1.73$ defects."
            },
            {
              "title": "Binomial-to-Poisson approximation",
              "body": "A vaccine has a rare side effect occurring in $p = 0.002$ of patients. A clinic vaccinates $n = 1000$ patients. Use the Poisson approximation to estimate the probability that exactly 3 patients experience the side effect.",
              "solution": "The exact model is $\\text{Binomial}(1000, 0.002)$, but with large $n$ and small $p$ we approximate by Poisson with $\\lambda = np = 1000 \\cdot 0.002 = 2$.\n\nThen $P(X=3) = \\frac{2^3 e^{-2}}{3!} = \\frac{8 \\cdot 0.135335}{6} = \\frac{1.08268}{6} \\approx 0.1804$.\n\nSo about an 18.0% chance. (The exact binomial value is also $\\approx 0.1806$ — the approximation is excellent because $n$ is large and $p$ is tiny, exactly the law-of-rare-events regime.)"
            },
            {
              "title": "The probability of at least one event",
              "body": "A web server receives an average of $\\lambda = 3$ requests per second. Using a Poisson model, what's the chance of <em>at least one</em> request in a given second?",
              "solution": "<strong>The complement trick.</strong> \"At least one\" is easiest through its complement — one minus the probability of <em>zero</em>:\n$$P(X \\geq 1) = 1 - P(X = 0).$$\n<strong>The PMF at zero.</strong> With $P(X = k) = e^{-\\lambda}\\lambda^k / k!$, the $k = 0$ term is simply\n$$P(X = 0) = e^{-\\lambda} = e^{-3} \\approx 0.0498.$$\n<strong>So:</strong>\n$$P(X \\geq 1) = 1 - 0.0498 \\approx 0.950.$$\nAbout a <strong>95%</strong> chance of at least one request. <strong>The pattern.</strong> $P(\\text{at least one}) = 1 - e^{-\\lambda}$ appears everywhere rare events are counted — the higher the rate $\\lambda$, the closer to certainty that <em>something</em> happens."
            }
          ]
        },
        {
          "id": "ps-geometric-waiting",
          "title": "Geometric & Waiting-Time Distributions",
          "minutes": 14,
          "content": "<h3>1. The hook: how long until the first success?</h3>\n<p>You are rolling a fair die, hunting for your first six. It might come on roll one — or you might suffer through ten misses first. The <strong>Geometric distribution</strong> answers the question lurking behind every such wait: <em>how many independent attempts until something finally works?</em> Whether it is calls until the first sale, coin flips until the first heads, or job applications until the first offer, the same shape governs the wait. And it hides a property so strange it feels like a paradox — the dice have <em>no memory</em> of how long you have already been waiting.</p>\n\n<h3>2. Setup: a stream of Bernoulli trials</h3>\n<p>Imagine a sequence of <strong>independent</strong> trials, each a coin-flip-like <em>Bernoulli trial</em> with the same success probability $p$ (and failure probability $1-p$). Let $X$ count the <strong>number of trials up to and including the first success</strong>. Then $X$ can be $1, 2, 3, \\dots$ — there is no upper bound. We write $X \\sim \\text{Geometric}(p)$.</p>\n<p><em>Caution:</em> some textbooks instead count only the <em>failures before</em> the first success (support $0,1,2,\\dots$). We use the <strong>trials-until-success</strong> convention, the most common in intro courses.</p>\n\n<h3>3. The PMF and why it has that form</h3>\n<p>For $X = k$ to happen, the first $k-1$ trials must <em>all</em> fail and the $k$-th must succeed. Because trials are independent, we multiply: $$P(X = k) = (1-p)^{k-1}\\,p, \\qquad k = 1, 2, 3, \\dots$$</p>\n<p><strong>Concrete example.</strong> Rolling a die for the first six, $p = \\tfrac{1}{6}$. The chance the first six arrives exactly on roll 3 is $$P(X=3) = \\left(\\tfrac{5}{6}\\right)^{2}\\cdot \\tfrac{1}{6} = \\tfrac{25}{216} \\approx 0.116.$$ These probabilities form a geometric series that sums to 1: $\\sum_{k=1}^{\\infty}(1-p)^{k-1}p = p \\cdot \\frac{1}{1-(1-p)} = 1$. That is exactly why it earns the name <em>geometric</em>.</p>\n\n<h3>4. The mean: why $\\mathbb{E}[X] = 1/p$</h3>\n<p>The expected wait is $$\\mathbb{E}[X] = \\frac{1}{p}.$$ The intuition is irresistibly clean: if a success happens a fraction $p$ of the time, then on average you need $1/p$ tries to see one. Rare events ($p$ small) make for long waits — for the die, $p=\\tfrac16$ gives a mean of <strong>6 rolls</strong>. The variance is $\\text{Var}(X) = \\frac{1-p}{p^{2}}$; for the die that is $\\frac{5/6}{1/36} = 30$, so a standard deviation of about $5.5$ rolls — the wait is highly variable.</p>\n<p>A slick derivation: condition on the first trial. With probability $p$ you are done in 1 step; with probability $1-p$ you have \"wasted\" one trial and start over, so $\\mathbb{E}[X] = p\\cdot 1 + (1-p)(1 + \\mathbb{E}[X])$. Solving gives $\\mathbb{E}[X] = 1/p$.</p>\n\n<p>Put both facts in one place — the PMF $P(K=k)=(1-p)^{k-1}p$ and the mean $\\mathbb{E}[K]=1/p$. For a success probability $p=0.25$ (one in four), the average wait is 4 trials, and the chance the first success lands exactly on trial 3 is:</p>\n<div data-code=\"javascript\" data-expected=\"E[wait]=4.0, P(K=3)=0.141\">// Geometric distribution: trials until the first success, each succeeding with prob p.\nconst p = 0.25;\nconst expectedWait = 1 / p;                      // E[K] = 1/p\nconst pThird = Math.pow(1 - p, 3 - 1) * p;       // P(K=3) = (1-p)^(3-1) * p\nconsole.log(\"E[wait]=\" + expectedWait.toFixed(1) + \", P(K=3)=\" + pThird.toFixed(3));</div>\n<h3>5. The survival function and memorylessness</h3>\n<p>The probability the wait <em>exceeds</em> $n$ trials is the chance the first $n$ trials all fail: $$P(X > n) = (1-p)^{n}.$$ Now the magic. Suppose you have already failed $m$ times and are still waiting. What is the chance you must endure at least $n$ <em>more</em>? $$P(X > m+n \\mid X > m) = \\frac{P(X > m+n)}{P(X > m)} = \\frac{(1-p)^{m+n}}{(1-p)^{m}} = (1-p)^{n} = P(X > n).$$</p>\n<p>This is the <strong>memorylessness property</strong>: the past leaves no trace. The dice do not \"owe\" you a six for your earlier misses; your remaining wait has the <em>same</em> distribution as a fresh start. Strikingly, the geometric is the <strong>only</strong> discrete distribution with this property (its continuous cousin is the exponential distribution). It is also the source of the gambler's fallacy — believing a long drought makes success \"due\" is precisely the error memorylessness forbids.</p>\n<p><strong>Numeric check</strong> ($p = 0.2$): $P(X > 5 \\mid X > 2) = \\frac{(0.8)^5}{(0.8)^2} = (0.8)^3 = 0.512$, identical to $P(X > 3) = 0.512$.</p>\n\n<h3>6. Waiting for $r$ successes: the negative binomial</h3>\n<p>What if you want not the first success but the $r$-th? Let $Y$ be the number of trials until the $r$-th success — the <strong>Negative Binomial</strong> distribution. The last trial must be a success, and among the first $Y-1$ trials exactly $r-1$ must succeed: $$P(Y = k) = \\binom{k-1}{r-1}(1-p)^{k-r}\\,p^{\\,r}, \\qquad k = r, r+1, \\dots$$ Since $Y$ is a sum of $r$ independent geometric waits, its mean is simply $\\mathbb{E}[Y] = r/p$. The geometric is the special case $r = 1$.</p>\n\n<h3>7. The big picture</h3>\n<p>The geometric distribution is the discrete clock of \"keep trying until it works\": PMF $(1-p)^{k-1}p$, mean $1/p$, and a unique amnesia about the past. Stack $r$ of these clocks and you get the negative binomial. Whenever a problem says \"until the first / $r$-th time something happens,\" reach for these tools.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-geometric\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the geometric is the discrete memoryless wait</summary>\n<p>The geometric distribution counts trials until the first success — and it is the <em>only</em> discrete distribution that is <b>memoryless</b>: $P(X > m + n \\mid X > m) = P(X > n)$. Having already failed $m$ times tells you nothing about how many failures remain; the process has no memory of its past.</p>\n<p>Why? Each trial is independent with the same success probability $p$, so the \"clock\" resets every step — past failures do not make success any more \"due.\" The survival function $P(X > k) = (1-p)^k$ decays at a <em>constant rate</em> per step (a constant hazard), which is exactly what memorylessness means. The mean wait $1/p$ is likewise unaffected by how long you have already waited.</p>\n<p>The \"aha\": memorylessness is the gambler's fallacy formalized and, here, <em>true</em> — for genuinely independent trials a long dry spell does <em>not</em> make a hit more likely next. The geometric is the discrete twin of the exponential (continuous memoryless waits); both model purely random arrivals with no aging.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the expected wait is 1/p</summary>\n<p>If each independent trial succeeds with probability $p$, the number of trials until the first success has mean exactly $\\mathbb{E}[X] = \\tfrac{1}{p}$. A fair die ($p = \\tfrac16$) takes 6 rolls on average to show a six; a 1-in-100 event waits 100 trials.</p>\n<p><b>The slick derivation (from memorylessness).</b> Condition on the first trial. With probability $p$ you succeed immediately (1 trial). With probability $1-p$ you fail and — because the process is memoryless — you are back at the start, having \"wasted\" one trial: expected total $1 + \\mathbb{E}[X]$. So $\\mathbb{E}[X] = p\\cdot 1 + (1-p)\\,(1 + \\mathbb{E}[X])$, which solves to $\\mathbb{E}[X] = \\tfrac{1}{p}$ in one line.</p>\n<p><b>Sanity and surprise.</b> Smaller $p$ means longer waits, linearly: halving the success rate doubles the expected wait. But the <em>variance</em> is large ($\\tfrac{1-p}{p^2}$) — rare-event waits are not just long on average, they are highly unpredictable, so \"expected 100 trials\" routinely takes far more or far fewer.</p>\n<p>The \"aha\": memorylessness turns the expected wait into a one-step recursion — fail once and you are exactly where you began — giving the clean answer $1/p$. It is the discrete twin of the exponential's mean $1/\\lambda$.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the coupon collector problem</summary>\n<p>The geometric distribution times <em>one</em> success; chain several together and you get one of probability's most charming results — the <strong>coupon collector problem</strong>: how long to collect <em>all</em> $n$ distinct coupons when each draw is uniformly random?</p>\n<p><b>The setup.</b> Once you hold $k$ distinct coupons, the chance the next draw is <em>new</em> is $\\frac{n-k}{n}$, so the wait for a new one is <em>geometric</em> with that probability — expected $\\frac{n}{n-k}$ draws. The total expected time sums over $k=0,\\dots,n-1$: $$\\mathbb{E}[T]=\\sum_{k=0}^{n-1}\\frac{n}{n-k}=n\\sum_{j=1}^{n}\\frac{1}{j}=n\\,H_n \\approx n\\ln n.$$</p>\n<p><b>The punchline.</b> Collecting $n$ coupons takes about $n\\ln n$ draws, not $n$ — and the last few are agonizing (the final coupon alone averages $\\approx n$ draws). For $n=50$ it is roughly $50\\ln 50\\approx 195$ draws. The same math governs how long to see every outcome: test coverage, cache warming, sampling every class.</p>\n<p>The \"aha\": \"collect them all\" is a sum of geometric waits, and it grows like $n\\ln n$, not $n$ — the harmonic series sneaking in. The tail dominates: most of the time goes to hunting the last few rare coupons.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Under the trials-until-success convention used here, what is the support (set of possible values) of $X \\sim \\text{Geometric}(p)$?",
              "choices": [
                "$\\{0, 1, 2, 3, \\dots\\}$",
                "$\\{1, 2, 3, \\dots\\}$",
                "$\\{0, 1\\}$",
                "$\\{1, 2, \\dots, n\\}$ for some fixed $n$"
              ],
              "answer": 1,
              "explain": "Counting trials up to and including the first success, the smallest possible value is 1 (success on the first trial) with no upper bound. The choice $\\{0,1,2,\\dots\\}$ is the rival 'failures-before-success' convention, not the one used here."
            },
            {
              "q": "A machine produces a defective part independently with probability $0.05$. Let $X$ be the number of parts inspected until the first defective. What is the expected number of parts inspected?",
              "choices": [
                "$0.05$",
                "$20$",
                "$19$",
                "$5$"
              ],
              "answer": 1,
              "explain": "For a geometric variable $\\mathbb{E}[X] = 1/p = 1/0.05 = 20$. The tempting answer $19$ is the mean number of failures before the first success ($\\frac{1-p}{p}$), which belongs to the other convention."
            },
            {
              "q": "For $X \\sim \\text{Geometric}(p)$, which expression correctly gives $P(X = k)$ for $k = 1, 2, 3, \\dots$?",
              "choices": [
                "$(1-p)^{k-1}\\,p$",
                "$\\binom{k}{1}p(1-p)^{k-1}$",
                "$(1-p)^{k}\\,p$",
                "$p^{k-1}(1-p)$"
              ],
              "answer": 0,
              "explain": "The first $k-1$ trials must fail (probability $(1-p)^{k-1}$) and the $k$-th must succeed (probability $p$), giving $(1-p)^{k-1}p$. The exponent $k$ instead of $k-1$ would double-count an extra failure."
            },
            {
              "q": "A gambler has just lost 8 spins in a row on a machine that pays out independently with probability $p$ each spin. Compared with someone who has only played once and lost, how is the gambler's remaining wait until a win distributed?",
              "choices": [
                "It has exactly the same distribution as a fresh start",
                "It is shorter on average, because a win is now 'overdue'",
                "It is longer on average, because the machine is on a cold streak",
                "It cannot be determined without knowing the value of $p$"
              ],
              "answer": 0,
              "explain": "Memorylessness means $P(X > m+n \\mid X > m) = P(X > n)$, so the past run of losses leaves no trace and the remaining wait is distributed like a brand-new one. Believing a win is 'overdue' is exactly the gambler's fallacy."
            },
            {
              "q": "Rolling a fair die for the first six ($p = 1/6$), what is the probability the first six does NOT appear within the first 4 rolls, i.e. $P(X > 4)$?",
              "choices": [
                "$\\left(\\tfrac{1}{6}\\right)^{4}$",
                "$4 \\cdot \\tfrac{5}{6} \\cdot \\tfrac{1}{6}$",
                "$1 - \\left(\\tfrac{1}{6}\\right)^{4}$",
                "$\\left(\\tfrac{5}{6}\\right)^{4}$"
              ],
              "answer": 3,
              "explain": "$P(X > n) = (1-p)^n$, so $P(X>4) = (5/6)^4$ — the event that all four rolls fail to show a six. The option $(1/6)^4$ wrongly uses the success probability for repeated failures."
            },
            {
              "q": "The variance of $X \\sim \\text{Geometric}(p)$ is $\\frac{1-p}{p^2}$. As $p \\to 0$ (very rare successes), what happens to the standard deviation relative to the mean $1/p$?",
              "choices": [
                "The standard deviation grows much faster than the mean, so the wait becomes relatively more variable",
                "The standard deviation shrinks to zero, so the wait becomes nearly deterministic",
                "The standard deviation and mean stay roughly equal, so relative variability is about constant",
                "The standard deviation stays fixed while the mean grows, so relative variability vanishes"
              ],
              "answer": 2,
              "explain": "The SD is $\\sqrt{(1-p)/p^2} = \\sqrt{1-p}/p$, and the mean is $1/p$; their ratio is $\\sqrt{1-p} \\to 1$ as $p \\to 0$. So the SD tracks the mean closely and relative variability stays near 1 (a hallmark of the geometric)."
            },
            {
              "q": "A salesperson closes each call independently with probability $0.3$. Let $Y$ be the number of calls until the SECOND sale. Which distribution does $Y$ follow, and what is $\\mathbb{E}[Y]$?",
              "choices": [
                "Geometric, with $\\mathbb{E}[Y] = 1/0.3 \\approx 3.33$",
                "Negative Binomial ($r=2$), with $\\mathbb{E}[Y] = 2/0.3 \\approx 6.67$",
                "Negative Binomial ($r=2$), with $\\mathbb{E}[Y] = 1/0.3 \\approx 3.33$",
                "Binomial, with $\\mathbb{E}[Y] = 2 \\cdot 0.3 = 0.6$"
              ],
              "answer": 1,
              "explain": "Waiting for the $r$-th success is Negative Binomial with mean $r/p$; here $2/0.3 \\approx 6.67$. Because $Y$ is the sum of two independent geometric waits, its mean is twice the single-success mean of $3.33$."
            },
            {
              "q": "A free-throw shooter makes each shot independently with probability $0.9$. If $X$ is the number of shots until her first MISS, what is the success probability for the geometric model of $X$?",
              "choices": [
                "$0.5$, since make and miss must be combined",
                "$0.9$, since that is the make probability",
                "$0.1$, since the event we are waiting for is a miss",
                "$0.81$, the probability of two makes"
              ],
              "answer": 2,
              "explain": "The geometric 'success' is whatever event ends the wait — here a MISS, with probability $1 - 0.9 = 0.1$. Using $0.9$ confuses the per-trial outcome we are counting against with the one we are waiting for."
            },
            {
              "q": "For $X \\sim \\text{Geometric}(p)$, what is the CDF $P(X \\le n)$ for a positive integer $n$?",
              "choices": [
                "$(1-p)^{n}$",
                "$1 - p^{n}$",
                "$n\\,p\\,(1-p)^{n-1}$",
                "$1 - (1-p)^{n}$"
              ],
              "answer": 3,
              "explain": "Since $P(X > n) = (1-p)^n$, complementing gives $P(X \\le n) = 1 - (1-p)^n$. The bare $(1-p)^n$ is the survival (tail) probability, not the CDF."
            },
            {
              "q": "Which property makes the Geometric distribution UNIQUE among all discrete distributions?",
              "choices": [
                "It has the largest possible variance for a given mean",
                "It is the only discrete distribution that is memoryless",
                "It is the only discrete distribution whose probabilities sum to 1",
                "It is the only discrete distribution defined on the positive integers"
              ],
              "answer": 1,
              "explain": "The geometric is the unique discrete memoryless distribution (its continuous analogue is the exponential). All valid PMFs sum to 1, and many distributions live on the positive integers, so those choices are not distinguishing properties."
            },
            {
              "q": "A web server's requests succeed independently with probability $0.8$; let $X$ count attempts until the first success. The probabilities $P(X=1), P(X=2), P(X=3), \\dots$ form what kind of sequence, and why must they sum to 1?",
              "choices": [
                "An arithmetic sequence; they sum to 1 by the trapezoid rule",
                "A harmonic sequence; they sum to 1 because the terms shrink",
                "A geometric sequence with ratio $p$; they sum to 1 because $p < 1$",
                "A geometric sequence with ratio $1-p$; they sum to 1 as a convergent geometric series"
              ],
              "answer": 3,
              "explain": "Successive PMF values $(1-p)^{k-1}p$ differ by the factor $(1-p)$, forming a geometric sequence with ratio $1-p$ (=0.2 here). Their sum is $p \\cdot \\frac{1}{1-(1-p)} = 1$ by the geometric-series formula — which is exactly where the distribution gets its name."
            },
            {
              "q": "With $X \\sim \\text{Geometric}(0.25)$, you are told $X > 3$ (the first three trials all failed). What is $P(X > 7 \\mid X > 3)$?",
              "choices": [
                "$(0.75)^{4} \\approx 0.316$",
                "$(0.75)^{7} \\approx 0.133$",
                "$(0.75)^{10} \\approx 0.056$",
                "$(0.25)^{4} \\approx 0.004$"
              ],
              "answer": 0,
              "explain": "By memorylessness $P(X > 3+4 \\mid X > 3) = P(X > 4) = (0.75)^4 \\approx 0.316$; equivalently $(0.75)^7 / (0.75)^3 = (0.75)^4$. Using $(0.75)^7$ ignores the conditioning, and $(0.75)^{10}$ wrongly adds the exponents."
            },
            {
              "answer": 2,
              "q": "Why is the Geometric distribution called \"geometric\"?",
              "choices": [
                "Because its PMF graph is a geometric shape (a triangle).",
                "Because it describes geometric figures like circles and squares.",
                "Because its PMF values $(1-p)^{k-1}p$ for $k=1,2,3,\\dots$ form a geometric series (each term a constant ratio $(1-p)$ times the previous), and that series sums to 1.",
                "Because the mean $1/p$ is the geometric mean of the trials."
              ],
              "explain": "The probabilities $p, (1-p)p, (1-p)^2 p, \\dots$ are a geometric sequence with common ratio $1-p$. Their sum is $p\\cdot\\frac{1}{1-(1-p)}=1$ (a geometric series), which is exactly why the distribution bears that name."
            },
            {
              "answer": 3,
              "q": "A slick way to show $\\mathbb{E}[X]=1/p$ for $X\\sim\\text{Geometric}(p)$ conditions on the first trial. Which equation captures that argument?",
              "choices": [
                "$\\mathbb{E}[X] = p\\cdot 0 + (1-p)\\cdot 1$, averaging the success and failure values.",
                "$\\mathbb{E}[X] = \\sum_k k^2 (1-p)^{k-1}p$, the second moment.",
                "$\\mathbb{E}[X] = 1 - (1-p)^{\\mathbb{E}[X]}$, the survival equation.",
                "$\\mathbb{E}[X] = p\\cdot 1 + (1-p)(1 + \\mathbb{E}[X])$ — with prob $p$ you finish in 1 trial; with prob $1-p$ you've used 1 trial and start over — which solves to $1/p$."
              ],
              "explain": "Condition on the first trial: success (prob $p$) finishes in exactly 1 step; failure (prob $1-p$) wastes a step and, by memorylessness, restarts the same wait, contributing $1+\\mathbb{E}[X]$. So $\\mathbb{E}[X]=p(1)+(1-p)(1+\\mathbb{E}[X])$, which solves to $\\mathbb{E}[X]=1/p$."
            },
            {
              "answer": 2,
              "q": "A salesperson closes each independent call with probability $p=0.2$. Let $Y$ be the number of calls until the 3rd sale (negative binomial). What is $\\mathbb{E}[Y]$?",
              "choices": [
                "$3 \\times 0.2 = 0.6$ calls.",
                "$1/p = 5$ calls.",
                "$r/p = 3/0.2 = 15$ calls, since $Y$ is the sum of 3 independent Geometric($0.2$) waits.",
                "$3$ calls, one per sale."
              ],
              "explain": "Waiting for the $r$-th success is a sum of $r$ independent geometric waits, each with mean $1/p$, so $\\mathbb{E}[Y]=r/p$. Here $3/0.2=15$ calls on average. ($1/p=5$ is the mean wait for just the first sale.)"
            },
            {
              "answer": 0,
              "q": "The Geometric is the unique *discrete* memoryless distribution. What is its *continuous* counterpart?",
              "choices": [
                "The Exponential distribution — the unique continuous memoryless distribution, modeling the waiting *time* until a randomly-arriving event.",
                "The Normal distribution.",
                "The Uniform distribution.",
                "The Binomial distribution."
              ],
              "explain": "Memorylessness — the remaining wait being independent of how long you've already waited — is shared by exactly two distributions: the Geometric (discrete, counting trials) and the Exponential (continuous, measuring time). The Exponential is the geometric's continuous cousin."
            }
          ],
          "flashcards": [
            {
              "front": "What does a Geometric($p$) random variable count, and what is its PMF?",
              "back": "It counts the number of independent Bernoulli trials up to and including the first success (support $k = 1, 2, 3, \\dots$). Its PMF is $P(X=k) = (1-p)^{k-1}p$: the first $k-1$ trials fail (each with prob $1-p$) and the $k$-th succeeds (prob $p$)."
            },
            {
              "front": "What is the mean of a Geometric($p$) distribution, and the one-line intuition?",
              "back": "$\\mathbb{E}[X] = 1/p$. Intuition: if successes occur a fraction $p$ of the time, you need on average $1/p$ trials to see one. E.g. $p = 1/6$ gives a mean wait of 6 rolls."
            },
            {
              "front": "State the memorylessness property of the geometric distribution.",
              "back": "$P(X > m+n \\mid X > m) = P(X > n)$. Having already waited $m$ trials gives no information about the remaining wait — it is distributed exactly as a fresh start. The geometric is the only discrete distribution with this property."
            },
            {
              "front": "What is the survival function $P(X > n)$ for Geometric($p$), and why?",
              "back": "$P(X > n) = (1-p)^n$. The wait exceeds $n$ trials exactly when the first $n$ trials all fail, and by independence those probabilities multiply: $(1-p)^n$."
            },
            {
              "front": "How does memorylessness explain the gambler's fallacy?",
              "back": "The fallacy is believing a long run of failures makes a success 'due.' Memorylessness says the trials have no memory: after any number of misses, the chance of success on the next trial is still just $p$. The remaining wait has the same distribution as at the start, so nothing is ever 'owed.'"
            },
            {
              "front": "What does the Negative Binomial distribution model, and how is it related to the geometric?",
              "back": "It counts the number of trials until the $r$-th success: $P(Y=k) = \\binom{k-1}{r-1}(1-p)^{k-r}p^r$ for $k \\ge r$. It is a sum of $r$ independent geometric waits, so $\\mathbb{E}[Y] = r/p$. The geometric is the special case $r = 1$."
            }
          ],
          "homework": [
            {
              "prompt": "A basketball player sinks each free throw independently with probability $p = 0.8$. Let $X$ be the number of attempts until her first miss. (a) What kind of random variable is $X$, and what is its success probability? (b) Compute $P(X = 3)$. (c) What is the expected number of attempts until the first miss?",
              "hint": "Here the 'success' is the event we are waiting for — a MISS — which has probability $1 - 0.8 = 0.2$. Use the geometric PMF with that probability, and recall $\\mathbb{E}[X] = 1/p$.",
              "solution": "(a) $X$ is Geometric with the 'success' being a miss, so its parameter is $p_{\\text{miss}} = 1 - 0.8 = 0.2$. (b) For the first miss to occur on attempt 3, the first two are makes (each prob $0.8$) and the third is a miss (prob $0.2$): $P(X=3) = (0.8)^2(0.2) = 0.64 \\times 0.2 = 0.128$. (c) $\\mathbb{E}[X] = 1/p_{\\text{miss}} = 1/0.2 = 5$ attempts on average."
            },
            {
              "prompt": "A quality inspector tests items one by one; each is defective independently with probability $p = 0.1$. Let $X$ be the number of items inspected until the first defective is found. (a) Find $P(X \\le 3)$. (b) Given that the first 4 items were all good, what is the probability the inspector needs at least 3 more items (i.e. more than 7 total) before finding a defective? Justify using a named property.",
              "hint": "For (a) use the complement: $P(X \\le 3) = 1 - P(X > 3)$ with $P(X > n) = (1-p)^n$. For (b) the conditioning on 4 good items is a setup for memorylessness — the answer should not depend on the 4.",
              "solution": "(a) $P(X > 3) = (0.9)^3 = 0.729$, so $P(X \\le 3) = 1 - 0.729 = 0.271$. (b) We want $P(X > 7 \\mid X > 4)$. By memorylessness, $P(X > 4 + 3 \\mid X > 4) = P(X > 3) = (0.9)^3 = 0.729$. The earlier 4 good items are irrelevant: the remaining wait behaves like a fresh start, so the probability of at least 3 more inspections is $0.729$."
            },
            {
              "prompt": "A telemarketer makes calls that result in a sale independently with probability $p = 0.3$. (a) Let $X$ be the number of calls until the first sale; find $\\mathbb{E}[X]$ and $\\text{Var}(X)$. (b) Let $Y$ be the number of calls until the second sale. Identify the distribution of $Y$ and compute $P(Y = 5)$. (c) What is $\\mathbb{E}[Y]$, and how does it relate to your answer in (a)?",
              "hint": "Part (a): mean $1/p$, variance $(1-p)/p^2$. Part (b): $Y$ is Negative Binomial with $r=2$; use $P(Y=k) = \\binom{k-1}{r-1}(1-p)^{k-r}p^r$. Part (c): a negative binomial is a sum of $r$ independent geometrics.",
              "solution": "(a) $\\mathbb{E}[X] = 1/0.3 = 10/3 \\approx 3.33$ calls. $\\text{Var}(X) = (1-p)/p^2 = 0.7/0.09 = 70/9 \\approx 7.78$. (b) $Y \\sim \\text{NegBinomial}(r=2, p=0.3)$. For $Y = 5$: exactly one of the first four calls is a sale and the fifth is a sale, $P(Y=5) = \\binom{4}{1}(0.3)^2(0.7)^3 = 4 \\times 0.09 \\times 0.343 = 0.12348$. (c) $\\mathbb{E}[Y] = r/p = 2/0.3 = 20/3 \\approx 6.67$, which is exactly twice $\\mathbb{E}[X]$ — because $Y$ is the sum of two independent geometric waits, each with mean $10/3$."
            }
          ],
          "examples": [
            {
              "title": "Rolling a die for the first six",
              "body": "You roll a fair six-sided die repeatedly until a six appears. Let $X$ be the number of rolls needed. (a) What is the probability the first six appears on exactly the 4th roll? (b) What is the probability it takes more than 6 rolls? (c) What is the expected number of rolls, and the standard deviation?",
              "solution": "Here $X \\sim \\text{Geometric}(p)$ with $p = 1/6$ (each roll independently shows a six with prob $1/6$). (a) The first three rolls are non-sixes and the fourth is a six: $P(X=4) = (5/6)^3(1/6) = \\frac{125}{1296} \\approx 0.0965$. (b) $P(X > 6) = (5/6)^6 = \\frac{15625}{46656} \\approx 0.335$ — there is a 33.5% chance of still waiting after six rolls, surprisingly high. (c) $\\mathbb{E}[X] = 1/p = 6$ rolls. The variance is $\\text{Var}(X) = (1-p)/p^2 = (5/6)/(1/36) = 30$, so the standard deviation is $\\sqrt{30} \\approx 5.48$ rolls — the wait is nearly as variable as its mean."
            },
            {
              "title": "Memorylessness on a slot machine",
              "body": "A slot machine pays out on each independent pull with probability $p = 0.2$. A gambler has already pulled the lever 2 times with no payout and grumbles that a win is 'overdue.' (a) Compute the unconditional probability that the first win takes more than 5 pulls. (b) Given the 2 losses so far, compute the probability the gambler needs more than 3 additional pulls. (c) What does comparing (a)'s building block with (b) reveal about the gambler's belief?",
              "solution": "Let $X \\sim \\text{Geometric}(0.2)$, so $P(X > n) = (0.8)^n$. (a) $P(X > 5) = (0.8)^5 = 0.32768 \\approx 0.328$. (b) We want $P(X > 2 + 3 \\mid X > 2) = \\frac{P(X > 5)}{P(X > 2)} = \\frac{(0.8)^5}{(0.8)^2} = (0.8)^3 = 0.512$. (c) Notice $P(X > 2 + 3 \\mid X > 2) = 0.512 = P(X > 3)$ — exactly the probability a brand-new gambler would wait more than 3 pulls. The two prior losses changed nothing; the machine has no memory. The win is never 'overdue,' which is precisely the gambler's fallacy laid bare: each pull still wins with probability $0.2$ regardless of history."
            },
            {
              "title": "Expected wait and the survival function",
              "body": "You roll a fair die until the first six. On average how many rolls? And what is the chance it takes more than 3 rolls?",
              "solution": "<strong>Expected number of trials.</strong> For a geometric distribution with success probability $p$, the mean is $\\mathbb{E}[X] = 1/p$. With $p = 1/6$ you expect $\\mathbb{E}[X] = 6$ rolls — intuitive, since a $1/6$ chance each time means about 6 tries on average.\n<strong>The survival function.</strong> \"More than $k$ rolls\" means the first $k$ all failed: $P(X > k) = (1 - p)^k$. For $k = 3$: $P(X > 3) = (5/6)^3 = 125/216 \\approx 0.579$ — more likely than not to still be waiting after three rolls.\n<strong>Why $\\mathbb{E}[X] = 1/p$.</strong> A one-line argument: either you succeed now (prob $p$, taking 1 trial) or you fail (prob $1-p$) and start over, having used 1 trial — so $\\mathbb{E}[X] = 1 + (1-p)\\,\\mathbb{E}[X]$, which solves to $1/p$.\n<strong>The aha.</strong> Rare events mean long waits ($1/p$ grows as $p$ shrinks), and the geometric tail decays as $(1-p)^k$ — the memoryless, constant-hazard signature of waiting for a first success."
            }
          ]
        },
        {
          "id": "ps-uniform-exponential",
          "title": "Uniform & Exponential Distributions",
          "minutes": 15,
          "content": "<p>Imagine waiting for a bus that's promised \"sometime in the next 10 minutes,\" with no further information. Every instant in that window feels equally likely — your ignorance is perfectly flat. That is the <strong>continuous Uniform</strong> distribution. Now imagine instead waiting for the next radioactive decay, or the next customer to walk through a door: events that arrive at random with no memory of the past. That is the <strong>Exponential</strong> distribution. These two are the workhorses of continuous probability — one models <em>total ignorance over an interval</em>, the other models <em>pure random waiting</em>.</p>\n\n<h3>1. The Continuous Uniform — flat ignorance</h3>\n<p>We write $X \\sim \\text{Uniform}(a,b)$ when $X$ is equally likely to fall anywhere in $[a,b]$. \"Equally likely\" means the density is <strong>constant</strong>. Since the total area under a density must equal 1, and the base has width $b-a$, the height must be</p>\n$$f(x) = \\frac{1}{b-a}, \\quad a \\le x \\le b,$$\n<p>and $f(x)=0$ elsewhere. The CDF accumulates area linearly: for $a \\le x \\le b$,</p>\n$$F(x) = \\frac{x-a}{b-a}.$$\n<p>By symmetry the mean sits at the midpoint, $\\mathbb{E}[X] = \\frac{a+b}{2}$. The variance comes from $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$ and works out to</p>\n$$\\text{Var}(X) = \\frac{(b-a)^2}{12}.$$\n<p><em>Concrete:</em> for $X \\sim \\text{Uniform}(0,10)$ (the bus), $\\mathbb{E}[X]=5$ minutes, $\\text{Var}(X)=100/12 \\approx 8.33$, and $P(X > 7) = \\frac{10-7}{10} = 0.3$.</p>\n\n<h3>2. The Exponential — pure random waiting</h3>\n<p>We write $T \\sim \\text{Exponential}(\\lambda)$ for the time until a randomly-arriving event, where $\\lambda > 0$ is the <strong>rate</strong> (events per unit time). Its density and CDF are</p>\n$$f(t) = \\lambda e^{-\\lambda t}, \\qquad F(t) = 1 - e^{-\\lambda t}, \\quad t \\ge 0.$$\n<p>The density is largest at $t=0$ and decays — short waits are most common, but a long tail allows occasional long waits. The mean is the reciprocal of the rate:</p>\n$$\\mathbb{E}[T] = \\frac{1}{\\lambda}, \\qquad \\text{Var}(T) = \\frac{1}{\\lambda^2}.$$\n<p>Intuitively: if calls arrive at $\\lambda = 3$ per hour, you wait on average $1/3$ hour = 20 minutes for the next one. The survival function $P(T > t) = e^{-\\lambda t}$ is especially handy.</p>\n\n<p><b>Try it in code.</b> Evaluate the exponential CDF — the probability a wait of rate λ finishes within time t.</p>\n<div data-code=\"javascript\" data-expected=\"0.632\">// Exponential CDF: P(X at most t) = 1 - e^(-lambda*t)\nconst lambda = 0.5, t = 2;\nconst cdf = 1 - Math.exp(-lambda * t);\nconsole.log(cdf.toFixed(3));</div>\n<div data-viz=\"ps-exponential-viz\"></div>\n<h3>3. Memorylessness — the defining property</h3>\n<p>The Exponential is the <em>only</em> continuous distribution that is <strong>memoryless</strong>:</p>\n$$P(T > s + t \\mid T > s) = P(T > t).$$\n<p>If you've already waited $s$ minutes with no event, the remaining wait has the <em>same</em> distribution as if you'd just started. The check is one line: $P(T>s+t \\mid T>s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t}$. A used lightbulb (under this model) is as good as new. This makes the Exponential the <strong>continuous analogue of the Geometric</strong> distribution, which is the unique <em>discrete</em> memoryless law counting trials until the first success.</p>\n\n<h3>4. Exponential waiting and the Poisson process</h3>\n<p>These ideas fuse in the <strong>Poisson process</strong>. Suppose events occur at rate $\\lambda$ such that the count $N(t)$ in an interval of length $t$ is $\\text{Poisson}(\\lambda t)$. Then:</p>\n<ul>\n<li>The <strong>waiting time between consecutive events</strong> (interarrival time) is $\\text{Exponential}(\\lambda)$.</li>\n<li>The link is direct: \"no event by time $t$\" means $N(t)=0$, and $P(N(t)=0) = e^{-\\lambda t} = P(T > t)$ — exactly the Exponential survival function.</li>\n<li>The sum of $k$ independent Exponential gaps (time to the $k$-th event) follows a Gamma (Erlang) distribution.</li>\n</ul>\n<p>So Poisson counts <em>how many</em> events in a window; Exponential measures <em>how long</em> between them. They are two views of the same random clock.</p>\n\n<h3>5. Putting it together</h3>\n<p>Both distributions answer probability questions by integrating the density — or, more cheaply, by reading off the CDF. For the Uniform, probabilities are ratios of lengths. For the Exponential, probabilities are exponentials of $-\\lambda t$. <em>Worked:</em> if a webpage's load time is $T \\sim \\text{Exponential}(\\lambda = 0.5)$ seconds$^{-1}$, the mean load is $1/0.5 = 2$ s, and $P(T > 4) = e^{-0.5 \\cdot 4} = e^{-2} \\approx 0.135$ — about a 13.5% chance of waiting over 4 seconds.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the exponential distribution forgets</summary>\n<p>The exponential is the continuous law of waiting times, and it has a startling property: it is <b>memoryless</b>. Formally $P(X > s + t \\mid X > s) = P(X > t)$ — given you've already waited $s$, the distribution of the <em>remaining</em> wait is identical to the wait from scratch.</p>\n<p>A worn machine and a brand-new one have the same expected time to the next failure under this model; a bus that's \"due\" is no likelier to arrive in the next minute than when you first sat down. The reason is the form $P(X > t) = e^{-\\lambda t}$: dividing $e^{-\\lambda(s+t)}$ by $e^{-\\lambda s}$ leaves $e^{-\\lambda t}$ — the conditioning cancels. It is the <em>only</em> continuous distribution with this property (the geometric is its discrete twin).</p>\n<p>The \"aha\": \"memoryless\" doesn't mean events are evenly spaced — it means the process has no internal clock, no aging. That's exactly why it models radioactive decay and the gaps between Poisson arrivals, and why the past tells you nothing about how much longer you'll wait.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: exponential waits between Poisson events</summary>\n<p>The exponential distribution and the Poisson distribution are two faces of the same random process — the <b>Poisson process</b>, a stream of independent events arriving at a constant average rate $\\lambda$.</p>\n<p><b>Count vs wait.</b> A <b>Poisson</b>$(\\lambda t)$ answers \"how many events in a window of length $t$?\" The <b>exponential</b>$(\\lambda)$ answers \"how long until the next event?\" If buses arrive as a Poisson process at rate $\\lambda = 4$ per hour, the count per hour is Poisson(4), and the <em>gap</em> between consecutive buses is Exponential(4), with mean wait $\\tfrac{1}{\\lambda} = 15$ minutes.</p>\n<p><b>Why the wait is exponential.</b> \"No event in the next $t$\" has probability $e^{-\\lambda t}$ (the Poisson probability of zero events), so the time to the next event has CDF $1 - e^{-\\lambda t}$ — exactly the exponential. Its memorylessness is the process restarting fresh after every instant: a Poisson process keeps no memory of when the last event happened.</p>\n<p>The \"aha\": Poisson counts and exponential gaps are the same coin. Whenever events are independent and occur at a steady rate, the number per interval is Poisson and the time between them is exponential — which is why both show up together in queueing, reliability, and traffic modeling.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the uniform is the seed of all sampling</summary>\n<p>The uniform distribution looks like the most boring random variable — every value equally likely. But it is the <em>universal source</em>: from a single $\\text{Uniform}(0,1)$ draw you can generate a sample from <em>any</em> distribution at all.</p>\n<p><b>Inverse-transform sampling.</b> Let $F$ be the CDF of the distribution you want, and $F^{-1}$ its inverse (the quantile function). Draw $U \\sim \\text{Uniform}(0,1)$ and set $X = F^{-1}(U)$. Then $X$ has exactly distribution $F$ — because $P(X \\le x) = P(F^{-1}(U) \\le x) = P(U \\le F(x)) = F(x)$, using that $U$ is uniform on $[0,1]$. The uniform draw picks a \"percentile,\" and $F^{-1}$ maps that percentile back to a value.</p>\n<p><b>Why it matters.</b> This is how computers sample non-uniform distributions: the hardware RNG produces (pseudo-)uniform numbers, and everything else — exponential ($X=-\\frac1\\lambda\\ln(1-U)$), normal, custom distributions — is built on top, via $F^{-1}$ or related transforms. The exponential's clean inverse is exactly why it is the easy one to simulate.</p>\n<p>The \"aha\": the uniform is not boring — it is the seed crystal of randomness. Apply the inverse CDF $F^{-1}$ to a $\\text{Uniform}(0,1)$ draw and you get a sample from <em>any</em> distribution $F$, which is why every random-number generator starts uniform and transforms from there.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For $X \\sim \\text{Uniform}(2, 8)$, what is the height of the density $f(x)$ on the interval $[2,8]$?",
              "choices": [
                "$\\frac{1}{8}$",
                "$\\frac{1}{6}$",
                "$\\frac{1}{10}$",
                "$\\frac{1}{3}$"
              ],
              "answer": 1,
              "explain": "The density is constant at $\\frac{1}{b-a} = \\frac{1}{8-2} = \\frac{1}{6}$ so the total area equals 1. Using $\\frac{1}{b}$ or $\\frac{1}{a+b}$ ignores that the width is $b-a$."
            },
            {
              "q": "A friend says: 'For a continuous Uniform random variable, $P(X = 5)$ is small but positive because 5 is inside the support.' What is the correct statement?",
              "choices": [
                "$P(X=5)$ equals the density $f(5)$",
                "$P(X=5)$ depends on whether 5 is the midpoint",
                "$P(X=5)$ is positive and equals $\\frac{1}{b-a}$",
                "$P(X=5) = 0$ because any single point has probability zero for a continuous variable"
              ],
              "answer": 3,
              "explain": "For any continuous distribution, the probability of an exact single point is zero; probability comes from area over an interval, not height at a point. The density $f(5)$ is not a probability, which is the tempting confusion."
            },
            {
              "q": "For $X \\sim \\text{Uniform}(0, 10)$, what is $P(3 < X < 7)$?",
              "choices": [
                "$0.4$",
                "$0.7$",
                "$0.3$",
                "$0.5$"
              ],
              "answer": 0,
              "explain": "For a Uniform, probability is the ratio of lengths: $\\frac{7-3}{10-0} = \\frac{4}{10} = 0.4$. Picking $0.3$ or $0.7$ confuses this with a single one-sided tail like $P(X>7)$."
            },
            {
              "q": "Two Uniform variables have the same midpoint but $X \\sim \\text{Uniform}(4,6)$ and $Y \\sim \\text{Uniform}(0,10)$. How do their variances compare?",
              "choices": [
                "$\\text{Var}(X) < \\text{Var}(Y)$ because $Y$ spans a wider interval",
                "$\\text{Var}(X) > \\text{Var}(Y)$ because $X$ is more concentrated",
                "They are equal because the means are equal",
                "Variance cannot be compared without knowing the densities"
              ],
              "answer": 0,
              "explain": "Variance is $\\frac{(b-a)^2}{12}$, which depends only on the width: $X$ gives $\\frac{4}{12}\\approx0.33$ while $Y$ gives $\\frac{100}{12}\\approx8.33$. Equal means do not imply equal spread."
            },
            {
              "q": "If a webpage's load time is $T \\sim \\text{Exponential}(\\lambda)$ with mean 4 seconds, what is $\\lambda$?",
              "choices": [
                "$\\lambda = 4$ per second",
                "$\\lambda = 16$ per second",
                "$\\lambda = 0.25$ per second",
                "$\\lambda = 2$ per second"
              ],
              "answer": 2,
              "explain": "The mean of an Exponential is $\\frac{1}{\\lambda}$, so $\\frac{1}{\\lambda} = 4$ gives $\\lambda = 0.25$ per second. Setting $\\lambda = 4$ confuses the rate with the mean wait, which are reciprocals."
            },
            {
              "q": "Calls arrive at rate $\\lambda = 3$ per hour with interarrival time $T \\sim \\text{Exponential}(3)$. What is $P(T > 1)$ (probability of waiting more than 1 hour)?",
              "choices": [
                "$e^{-1/3} \\approx 0.717$",
                "$1 - e^{-3} \\approx 0.950$",
                "$3e^{-3} \\approx 0.149$",
                "$e^{-3} \\approx 0.050$"
              ],
              "answer": 3,
              "explain": "The survival function is $P(T>t) = e^{-\\lambda t} = e^{-3 \\cdot 1} = e^{-3} \\approx 0.050$. The answer $1-e^{-3}$ is the CDF $P(T \\le 1)$, the complementary event."
            },
            {
              "q": "A lightbulb with Exponential lifetime has already burned for 1000 hours without failing. What is the distribution of its remaining lifetime?",
              "choices": [
                "Exponential with a smaller mean, since it is partly used up",
                "Exponential with a larger rate $\\lambda$ because it is aging",
                "Uniform over the remaining expected hours",
                "The same Exponential distribution as a brand-new bulb"
              ],
              "answer": 3,
              "explain": "By memorylessness, $P(T > 1000 + t \\mid T > 1000) = P(T > t)$, so the remaining life has the identical Exponential distribution. The intuition that the bulb is 'partly used up' is exactly what memorylessness contradicts."
            },
            {
              "q": "Which statement correctly characterizes memorylessness among continuous distributions?",
              "choices": [
                "Both the Uniform and the Exponential are memoryless",
                "The Uniform is the unique continuous memoryless distribution",
                "The Exponential is the unique continuous memoryless distribution",
                "No continuous distribution can be memoryless; only discrete ones can"
              ],
              "answer": 2,
              "explain": "The Exponential is the only continuous distribution satisfying $P(T>s+t\\mid T>s)=P(T>t)$. The Uniform is not memoryless (a used bulb on a bounded interval has obviously less time left), and the Geometric is the discrete analogue."
            },
            {
              "q": "In a Poisson process of rate $\\lambda$, why does the event 'no arrivals by time $t$' have probability $e^{-\\lambda t}$ both as a Poisson and as an Exponential statement?",
              "choices": [
                "It is a coincidence specific to $t=1$",
                "Because the Poisson mean $\\lambda t$ always equals the Exponential mean $1/\\lambda$",
                "Because $\\{N(t)=0\\}$ is the same event as $\\{T > t\\}$, where $T$ is the wait to the first arrival",
                "Because the Exponential variance equals the Poisson variance"
              ],
              "answer": 2,
              "explain": "'No event by time $t$' means $N(t)=0$, which is identical to 'the first arrival comes after $t$', i.e. $T>t$; both give $e^{-\\lambda t}$. The agreement is structural, not a coincidence and not about matching moments."
            },
            {
              "q": "Server response time is $T \\sim \\text{Exponential}(\\lambda = 0.5)$ seconds$^{-1}$. What is $P(2 < T < 4)$?",
              "choices": [
                "$e^{-1} - e^{-2} \\approx 0.233$",
                "$e^{-2} - e^{-4} \\approx 0.117$",
                "$e^{-1} + e^{-2} \\approx 0.503$",
                "$1 - e^{-2} \\approx 0.865$"
              ],
              "answer": 0,
              "explain": "Using the survival function, $P(2<T<4) = P(T>2) - P(T>4) = e^{-0.5\\cdot2} - e^{-0.5\\cdot4} = e^{-1} - e^{-2} \\approx 0.368 - 0.135 = 0.233$. The choice $e^{-2}-e^{-4}$ wrongly uses $\\lambda=1$."
            },
            {
              "q": "A student claims the median of $T \\sim \\text{Exponential}(\\lambda)$ equals its mean $\\frac{1}{\\lambda}$. Why is this wrong?",
              "choices": [
                "The mean and median are equal for all distributions",
                "The median is $\\frac{2}{\\lambda}$, larger than the mean",
                "The median is $\\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}$, smaller than the mean because the long right tail pulls the mean up",
                "The Exponential has no median because it is continuous"
              ],
              "answer": 2,
              "explain": "Solving $1 - e^{-\\lambda m} = 0.5$ gives $m = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda} < \\frac{1}{\\lambda}$. The right-skewed tail makes the mean exceed the median; the mean equals the median only for symmetric distributions."
            },
            {
              "q": "If $X \\sim \\text{Uniform}(a,b)$, what is the value of the CDF $F\\left(\\frac{a+b}{2}\\right)$ at the midpoint?",
              "choices": [
                "$0$",
                "$\\frac{1}{b-a}$",
                "$1$",
                "$\\frac{1}{2}$"
              ],
              "answer": 3,
              "explain": "By symmetry the midpoint is the median, so $F\\left(\\frac{a+b}{2}\\right) = \\frac{(a+b)/2 - a}{b-a} = \\frac{(b-a)/2}{b-a} = \\frac{1}{2}$. The value $\\frac{1}{b-a}$ is the density height, not the accumulated probability."
            },
            {
              "answer": 1,
              "q": "For $X \\sim \\text{Uniform}(0, 12)$, what is the variance?",
              "choices": [
                "$\\frac{a+b}{2} = 6$ (that's the mean, not the variance).",
                "$\\frac{(b-a)^2}{12} = \\frac{12^2}{12} = 12$.",
                "$\\frac{1}{b-a} = \\frac{1}{12}$ (that's the density height).",
                "$\\frac{12^2}{2} = 72$."
              ],
              "explain": "The continuous Uniform on $[a,b]$ has variance $\\frac{(b-a)^2}{12}$. With $a=0,b=12$: $\\frac{144}{12}=12$. (The mean is $\\frac{a+b}{2}=6$ and the density height is $\\frac{1}{b-a}=\\frac{1}{12}$ — different quantities.)"
            },
            {
              "answer": 1,
              "q": "In a Poisson process of rate $\\lambda$, how do the Poisson and Exponential distributions relate?",
              "choices": [
                "They are the same distribution under two names.",
                "Poisson counts *how many* events occur in a fixed window (count $\\sim \\text{Poisson}(\\lambda t)$); Exponential measures *how long* between consecutive events (interarrival time $\\sim \\text{Exponential}(\\lambda)$) — two views of one random clock.",
                "Exponential gives the count and Poisson gives the time, but only when $\\lambda < 1$.",
                "Poisson measures waiting times; Exponential counts events."
              ],
              "explain": "A Poisson process has two linked descriptions: the number of events in an interval of length $t$ is $\\text{Poisson}(\\lambda t)$ (how many), and the gap between consecutive events is $\\text{Exponential}(\\lambda)$ (how long). \"No event by time $t$\" ($N(t)=0$) has probability $e^{-\\lambda t}$ — exactly the Exponential survival function — which is how the two connect."
            },
            {
              "answer": 0,
              "q": "For $T \\sim \\text{Exponential}(\\lambda)$ with density $f(t)=\\lambda e^{-\\lambda t}$ ($t\\ge 0$), where is the density largest, and what does that imply?",
              "choices": [
                "Largest at $t = 0$ and monotonically decaying — short waits are the most common, but a long right tail allows occasional long waits.",
                "Largest at $t = 1/\\lambda$ (the mean), so waits near the mean are most common.",
                "Largest as $t \\to \\infty$, so long waits are the most common.",
                "Constant for all $t \\ge 0$, just like a uniform density."
              ],
              "explain": "$f(t)=\\lambda e^{-\\lambda t}$ is maximized at $t=0$ (value $\\lambda$) and decreases monotonically. So the most probable outcome is a *short* wait, yet the exponential tail means long waits still happen occasionally — the mean $1/\\lambda$ sits to the right of the (zero) mode."
            },
            {
              "answer": 1,
              "q": "Server response time is $T \\sim \\text{Exponential}(\\lambda = 0.5)$ per second. What are its mean and variance?",
              "choices": [
                "Mean $0.5$, variance $0.25$.",
                "Mean $\\frac{1}{\\lambda} = 2$ s, variance $\\frac{1}{\\lambda^2} = 4$ s$^2$.",
                "Mean $2$, variance $2$.",
                "Mean $0.5$, variance $0.5$."
              ],
              "explain": "For Exponential($\\lambda$), $\\mathbb{E}[T]=1/\\lambda$ and $\\text{Var}(T)=1/\\lambda^2$ (so $\\sigma=1/\\lambda$, equal to the mean). With $\\lambda=0.5$: mean $=2$ s, variance $=1/0.25=4$ s$^2$. Note variance equals mean only for the *Poisson*, not the Exponential."
            }
          ],
          "flashcards": [
            {
              "front": "For $X \\sim \\text{Uniform}(a,b)$, state the density, mean, and variance.",
              "back": "Density $f(x) = \\frac{1}{b-a}$ on $[a,b]$ (zero elsewhere); mean $\\mathbb{E}[X] = \\frac{a+b}{2}$; variance $\\text{Var}(X) = \\frac{(b-a)^2}{12}$."
            },
            {
              "front": "What is the CDF of $\\text{Uniform}(a,b)$ for $a \\le x \\le b$, and how do you compute $P(X>c)$?",
              "back": "$F(x) = \\frac{x-a}{b-a}$. Probabilities are length ratios: $P(X>c) = \\frac{b-c}{b-a}$ for $c$ in $[a,b]$."
            },
            {
              "front": "For $T \\sim \\text{Exponential}(\\lambda)$, give the density, CDF, survival function, and mean.",
              "back": "Density $f(t)=\\lambda e^{-\\lambda t}$; CDF $F(t)=1-e^{-\\lambda t}$; survival $P(T>t)=e^{-\\lambda t}$; mean $\\mathbb{E}[T]=1/\\lambda$ (variance $1/\\lambda^2$). All for $t \\ge 0$."
            },
            {
              "front": "State and verify the memoryless property of the Exponential.",
              "back": "$P(T>s+t \\mid T>s)=P(T>t)$. Proof: $\\frac{P(T>s+t)}{P(T>s)}=\\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}}=e^{-\\lambda t}$. The Exponential is the unique continuous memoryless distribution."
            },
            {
              "front": "What is the discrete analogue of the Exponential distribution, and why?",
              "back": "The Geometric distribution. It is the unique discrete memoryless distribution (trials until first success), just as the Exponential is the unique continuous memoryless one (waiting time until an event)."
            },
            {
              "front": "How are the Exponential and Poisson distributions linked in a Poisson process of rate $\\lambda$?",
              "back": "Counts $N(t) \\sim \\text{Poisson}(\\lambda t)$; interarrival times $\\sim \\text{Exponential}(\\lambda)$. They agree because $P(N(t)=0)=e^{-\\lambda t}=P(T>t)$. Time to the $k$-th event is Gamma/Erlang."
            }
          ],
          "homework": [
            {
              "prompt": "A train departs at a uniformly random time in the 15-minute window $[0,15]$ minutes after you arrive at the platform. Let $X \\sim \\text{Uniform}(0,15)$. (a) What is the mean wait and its variance? (b) What is $P(X > 10)$? (c) What is $P(5 < X < 12)$?",
              "hint": "Use $\\mathbb{E}[X]=\\frac{a+b}{2}$ and $\\text{Var}(X)=\\frac{(b-a)^2}{12}$. For probabilities use the CDF $F(x)=\\frac{x-a}{b-a}$, or directly take ratios of interval lengths to the total width $b-a=15$.",
              "solution": "Here $a=0$, $b=15$. (a) $\\mathbb{E}[X]=\\frac{0+15}{2}=7.5$ minutes; $\\text{Var}(X)=\\frac{(15-0)^2}{12}=\\frac{225}{12}=18.75$ (so SD $\\approx 4.33$ min). (b) $P(X>10)=\\frac{15-10}{15}=\\frac{5}{15}=\\frac{1}{3}\\approx 0.333$. (c) $P(5<X<12)=F(12)-F(5)=\\frac{12-5}{15}=\\frac{7}{15}\\approx 0.467$."
            },
            {
              "prompt": "The lifetime of a server component is $T \\sim \\text{Exponential}(\\lambda)$ with mean 5 years. (a) Find $\\lambda$. (b) Compute $P(T > 8)$. (c) Given the component has already survived 5 years, find the probability it lasts at least 8 more years, and explain why your answer relates to part (b).",
              "hint": "Mean $=1/\\lambda$ gives $\\lambda$. Use the survival function $P(T>t)=e^{-\\lambda t}$. For (c) invoke the memoryless property: $P(T>5+8 \\mid T>5)=P(T>8)$.",
              "solution": "(a) $\\mathbb{E}[T]=1/\\lambda=5 \\Rightarrow \\lambda=0.2$ per year. (b) $P(T>8)=e^{-0.2\\cdot 8}=e^{-1.6}\\approx 0.202$. (c) By memorylessness, $P(T>13 \\mid T>5)=\\frac{e^{-0.2\\cdot 13}}{e^{-0.2\\cdot 5}}=\\frac{e^{-2.6}}{e^{-1.0}}=e^{-1.6}\\approx 0.202$. This equals the probability of a brand-new component lasting 8 more years (part b): a used component is statistically 'as good as new.'"
            },
            {
              "prompt": "Emails arrive at your inbox as a Poisson process with rate $\\lambda = 4$ per hour. Let $T$ be the time until the next email. (a) State the distribution of $T$ and find $P(T < 10\\text{ minutes})$. (b) What is the probability that exactly 0 emails arrive in the next 15 minutes, and confirm it matches $P(T>15\\text{ min})$. (c) What is the probability the next email takes between 10 and 30 minutes?",
              "hint": "Convert minutes to hours (10 min $=1/6$ h, 15 min $=1/4$ h, 30 min $=1/2$ h). $T \\sim \\text{Exponential}(4)$. Use $F(t)=1-e^{-\\lambda t}$ for (a) and (c). For (b) compare $P(N(t)=0)=e^{-\\lambda t}$ with the Exponential survival function.",
              "solution": "(a) $T \\sim \\text{Exponential}(\\lambda=4)$ per hour. For 10 min $=1/6$ h: $P(T<1/6)=1-e^{-4/6}=1-e^{-0.667}\\approx 1-0.513=0.487$. (b) For 15 min $=1/4$ h, the count is $N \\sim \\text{Poisson}(\\lambda t)=\\text{Poisson}(4\\cdot 0.25)=\\text{Poisson}(1)$, so $P(N=0)=e^{-1}\\approx 0.368$. The Exponential survival gives $P(T>1/4)=e^{-4\\cdot 0.25}=e^{-1}\\approx 0.368$ — identical, since 'no email by time $t$' is the same event as $\\{N(t)=0\\}$. (c) For 10 to 30 min, i.e. $t \\in (1/6, 1/2)$: $P=e^{-4/6}-e^{-4/2}=e^{-0.667}-e^{-2}\\approx 0.513-0.135=0.378$."
            }
          ],
          "examples": [
            {
              "title": "Uniform: rounding error in measurements",
              "body": "A digital scale rounds every weight to the nearest gram. The rounding error $X$ — the true weight minus the displayed weight — is modeled as $X \\sim \\text{Uniform}(-0.5, 0.5)$ grams. Find the mean error, the standard deviation of the error, and the probability that the rounding error exceeds 0.3 grams in absolute value, $P(|X| > 0.3)$.",
              "solution": "Here $a=-0.5$, $b=0.5$, so the width is $b-a=1$ and the density is $f(x)=1/1=1$ on $[-0.5,0.5]$. Mean: $\\mathbb{E}[X]=\\frac{a+b}{2}=\\frac{-0.5+0.5}{2}=0$ — the scale is unbiased. Variance: $\\text{Var}(X)=\\frac{(b-a)^2}{12}=\\frac{1}{12}\\approx 0.0833$, so the standard deviation is $\\sqrt{1/12}\\approx 0.289$ g. For $P(|X|>0.3)$: the favorable region is $x<-0.3$ or $x>0.3$, total length $0.2+0.2=0.4$, over total width $1$. Hence $P(|X|>0.3)=\\frac{0.4}{1}=0.4$. So 40% of measurements have a rounding error larger than 0.3 g in magnitude."
            },
            {
              "title": "Exponential: customer service waiting time",
              "body": "Calls to a help desk are answered after a waiting time $T \\sim \\text{Exponential}(\\lambda)$ with an average wait of 4 minutes. (a) Find $\\lambda$ and write the density. (b) What fraction of callers wait more than 6 minutes? (c) The company advertises that 'most callers are answered within 2 minutes.' Evaluate this claim by computing $P(T \\le 2)$.",
              "solution": "(a) Mean $=1/\\lambda=4$ minutes, so $\\lambda=0.25$ per minute. Density: $f(t)=0.25\\,e^{-0.25 t}$ for $t\\ge 0$. (b) Using the survival function, $P(T>6)=e^{-0.25\\cdot 6}=e^{-1.5}\\approx 0.223$ — about 22.3% of callers wait more than 6 minutes. (c) $P(T\\le 2)=1-e^{-0.25\\cdot 2}=1-e^{-0.5}\\approx 1-0.607=0.393$. Only about 39.3% of callers are answered within 2 minutes — fewer than half. The advertising claim that 'most' (i.e., a majority) are answered within 2 minutes is false; the median wait is actually $\\frac{\\ln 2}{\\lambda}=\\frac{0.693}{0.25}\\approx 2.77$ minutes."
            },
            {
              "title": "The exponential is memoryless",
              "body": "A service desk's wait time is exponential with rate $\\lambda = 0.5$ per minute. You have already waited 3 minutes. What is the probability you wait at least 2 more — and how does it compare to a fresh 2-minute wait?",
              "solution": "<strong>The survival function.</strong> For an exponential, $P(X > t) = e^{-\\lambda t}$. A fresh wait of at least 2 minutes is $P(X > 2) = e^{-0.5 \\cdot 2} = e^{-1} \\approx 0.368$.\n<strong>The conditional wait.</strong> Given you have already waited 3 minutes, the chance of 2 more is $P(X > 5 \\mid X > 3) = \\frac{P(X > 5)}{P(X > 3)} = \\frac{e^{-2.5}}{e^{-1.5}} = e^{-1} \\approx 0.368$ — <em>identical</em> to the fresh wait.\n<strong>Memorylessness.</strong> In general $P(X > s + t \\mid X > s) = e^{-\\lambda t} = P(X > t)$: the time already spent is forgotten. The exponential is the <em>only</em> continuous distribution with this property (the geometric is its discrete twin).\n<strong>The aha.</strong> A memoryless wait has a constant <em>hazard rate</em> — at every instant the event is equally likely to happen next, regardless of history. That is why exponentials model truly random arrivals (radioactive decay, Poisson-process gaps) but <em>not</em> things that age — a worn part is more likely to fail soon, so its lifetime is not exponential."
            }
          ]
        },
        {
          "id": "ps-normal-distribution",
          "title": "The Normal Distribution & Standardization",
          "minutes": 16,
          "content": "<h3>1. The hook: the shape that nature keeps drawing</h3>\n<p>Measure the heights of 10,000 adults, the weights of bags of flour off a factory line, the errors a telescope makes pointing at a star, or the average of 50 dice rolls repeated endlessly — and the same silhouette appears again and again: a single hump, symmetric, fat in the middle, thin at the tails. This is the <strong>normal</strong> (or <strong>Gaussian</strong>) distribution, the most important curve in all of statistics. It shows up so relentlessly that for a century people simply called it the \"law of errors.\" The deep reason for its ubiquity is the <em>Central Limit Theorem</em>, which we tease at the end — but first, let us understand the bell itself.</p>\n\n<h3>2. The bell-curve density</h3>\n<p>A continuous random variable $X$ is <strong>normal</strong> with mean $\\mu$ and variance $\\sigma^2$, written $X \\sim N(\\mu, \\sigma^2)$, when its probability density function is\n$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}.$$\nDo not memorize this in a panic — read its anatomy. The term $-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2$ is a downward parabola in the exponent: it is zero at $x=\\mu$ (where $e^0=1$, the peak) and grows negative as $x$ moves away, so $e^{(\\cdot)}$ decays. The squaring makes it <em>symmetric</em> about $\\mu$. The front constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is just the normalizing factor that forces $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$.</p>\n\n<h3>3. The roles of $\\mu$ and $\\sigma$</h3>\n<p>The two parameters do two visually distinct jobs:</p>\n<ul>\n<li><strong>$\\mu$ (the mean) is the <em>center</em>.</strong> It locates the peak and the axis of symmetry. Changing $\\mu$ slides the whole bell left or right without changing its shape. Here $\\mathbb{E}[X]=\\mu$.</li>\n<li><strong>$\\sigma$ (the standard deviation) is the <em>spread</em>.</strong> Small $\\sigma$ gives a tall, narrow, concentrated bell; large $\\sigma$ gives a short, wide, diffuse one. Here $\\text{Var}(X)=\\sigma^2$. The points $x=\\mu\\pm\\sigma$ are the <em>inflection points</em> where the curve switches from concave-down to concave-up.</li>\n</ul>\n<p>Crucially, the total area is always 1, so a narrower bell must be taller — squeezing horizontally pushes the curve upward.</p>\n\n<h3>4. The standard normal and standardization</h3>\n<p>There are infinitely many normal curves, one per $(\\mu,\\sigma)$. We tame them all with a single reference: the <strong>standard normal</strong> $Z \\sim N(0,1)$, with mean 0 and standard deviation 1. Any normal variable becomes standard by <strong>standardizing</strong>:\n$$z = \\frac{x-\\mu}{\\sigma}.$$\nThe resulting number is a <strong>z-score</strong>: it reports <em>how many standard deviations $x$ lies above ($z>0$) or below ($z<0$) the mean</em>. A z-score of $+2$ means \"two standard deviations above average,\" regardless of the original units. This is the master trick — it converts apples-and-oranges problems onto one universal ruler. The key fact: if $X\\sim N(\\mu,\\sigma^2)$ then $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)$, so every probability question reduces to the single standard curve.</p>\n<p><strong>Concrete number.</strong> Exam scores are $N(70, 8^2)$. A score of $x=86$ standardizes to $z=\\frac{86-70}{8}=\\frac{16}{8}=2.0$ — exactly two standard deviations above the mean. A score of $x=66$ gives $z=\\frac{66-70}{8}=-0.5$, half a standard deviation below.</p>\n\n<h3>5. The 68–95–99.7 empirical rule</h3>\n<p>Because the standard normal is fixed, the fraction of data within a given number of standard deviations is fixed too. The <strong>empirical rule</strong> records the three you must know cold:</p>\n<ul>\n<li>About <strong>68%</strong> of values fall within $\\mu\\pm 1\\sigma$ (i.e. $|z|\\le 1$).</li>\n<li>About <strong>95%</strong> fall within $\\mu\\pm 2\\sigma$ (i.e. $|z|\\le 2$).</li>\n<li>About <strong>99.7%</strong> fall within $\\mu\\pm 3\\sigma$ (i.e. $|z|\\le 3$).</li>\n</ul>\n<p>By symmetry, the leftover tail mass splits evenly. For example, outside $\\mu\\pm 2\\sigma$ lies $100\\%-95\\%=5\\%$, so each tail holds $2.5\\%$. Thus $P(Z>2)\\approx 0.025$ and $P(Z<-1)\\approx \\frac{1-0.68}{2}=0.16$. (More precise values are $P(|Z|\\le1)=0.6827$, $P(|Z|\\le2)=0.9545$, $P(|Z|\\le3)=0.9973$.)</p>\n<p>Use the explorer below to feel all of this at once. Drag <strong>μ</strong> and watch the whole bell slide; drag <strong>σ</strong> and watch it stretch or pinch while the shaded 68–95–99.7 bands keep the <em>same</em> percentages. Switch to <strong>interval</strong> mode and slide the bounds to read off $P(a\\le X\\le b)$ for any region — notice the answer depends only on the z-bounds, never on μ or σ.</p>\n<div data-viz=\"ps-normal-explorer\"></div>\n\n<div data-viz=\"ps-clt\"></div>\n<h3>6. Why the normal is everywhere — a CLT teaser</h3>\n<p>The normal is not a coincidence imposed on data; it is forced by addition. The <strong>Central Limit Theorem</strong> says that when you <em>sum or average many independent small effects</em> — no matter how each individual effect is distributed — the result is approximately normal. A person's height is the accumulation of countless genetic and environmental nudges; measurement error is the sum of many tiny perturbations. Anywhere randomness piles up additively, the bell emerges. That is why we invest so heavily in mastering this one curve.</p>\n\n<h3>7. Worked example: putting it together</h3>\n<p>Suppose IQ scores are $N(100, 15^2)$, so $\\mu=100$, $\\sigma=15$. <em>What fraction of people score above 130?</em> Standardize: $z=\\frac{130-100}{15}=\\frac{30}{15}=2.0$. We want $P(Z>2)$. The empirical rule says $95\\%$ lie within $|z|\\le 2$, leaving $5\\%$ in the two tails, so the upper tail alone is $\\frac{5\\%}{2}=2.5\\%$. Therefore about <strong>2.5%</strong> of people score above 130. And <em>between 85 and 115?</em> Those are $z=\\pm 1$, the $\\mu\\pm 1\\sigma$ band, so about <strong>68%</strong>. The z-score plus the empirical rule answers both in seconds, with no calculus.</p>\n<h4>Try it in code</h4>\n<p>A z-score standardizes a value: how many standard deviations it sits above or below the mean, <code>z = (x − μ) / σ</code>. It puts any normal variable on the same scale. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"2.00\">// z-score: standardize x given the mean (mu) and standard deviation (sigma).\nfunction z(x, mu, sigma) { return (x - mu) / sigma; }\nconsole.log(z(130, 100, 15).toFixed(2));   // 2.00 -- x is two standard deviations above the mean</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the normal distribution is everywhere</summary>\n<p>The bell curve shows up so often it can seem like magic. There are three concrete reasons. <b>The Central Limit Theorem</b>: the sum (or average) of many independent small effects tends to a normal <em>regardless</em> of each effect's own distribution — so any quantity built from lots of little additive contributions (measurement error, height, aggregated scores) is approximately normal.</p>\n<p><b>Maximum entropy</b>: among all distributions with a given mean and variance, the normal has the most entropy — the least-assuming choice when you know only those two moments. <b>Convenience</b>: it is closed under sums and linear maps, fully described by $\\mu$ and $\\sigma^2$, and gives the clean $68$–$95$–$99.7$ rule (that fraction of mass within $1$, $2$, $3$ standard deviations).</p>\n<p>The \"aha\": the normal is not assumed because it is pretty — it is <em>forced</em> by the CLT whenever randomness accumulates additively, and it is the honest default when you know only a mean and a spread. That is why \"assume it's Gaussian\" is so often the right first move — and why heavy-tailed data, where rare large events dominate, is exactly where the assumption bites.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: standardization and the 68-95-99.7 rule</summary>\n<p>Every normal distribution is a shifted, scaled copy of one: the <b>standard normal</b> $Z \\sim \\mathcal{N}(0,1)$. Convert any $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$ with the <b>z-score</b> $z = \\tfrac{x - \\mu}{\\sigma}$ — \"how many standard deviations from the mean.\" That is why a single table (one $\\Phi$ function) handles all normals.</p>\n<p>The z-score gives instant intuition via the <b>empirical rule</b>: about <b>68%</b> of values lie within $1\\sigma$ of the mean, <b>95%</b> within $2\\sigma$, and <b>99.7%</b> within $3\\sigma$. So a value 2 SDs out sits in the top ~2.5% tail; 3 SDs out ($z = 3$) is roughly a 1-in-740 event per tail — which is why \"$3\\sigma$\" and \"$6\\sigma$\" became shorthand for \"rare\" and \"essentially never.\"</p>\n<p>The \"aha\": standardization collapses the entire two-parameter family of normals onto one curve, so \"unusual\" becomes a single universal number — the z-score. A test score, a sensor reading, and a stock return all reduce to \"how many sigmas?\"</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the normal is the maximum-entropy distribution</summary>\n<p>The CLT explains why sums become normal — but there is a second, deeper reason the bell curve is the <em>default</em>: among all distributions with a given mean and variance, the normal has the <b>most entropy</b>.</p>\n<p><b>Maximum entropy = fewest assumptions.</b> Entropy measures uncertainty, or \"spread-out-ness.\" If all you know about a quantity is its mean $\\mu$ and variance $\\sigma^2$, the <em>most honest</em> distribution to assume is the one that is maximally uncertain <em>subject to those two facts</em> — adding no extra structure you cannot justify. That maximum-entropy distribution is <em>exactly</em> the Gaussian $\\mathcal{N}(\\mu,\\sigma^2)$. Any other distribution with the same mean and variance secretly encodes <em>more</em> assumptions.</p>\n<p><b>Why it matters.</b> This is the principled reason \"assume Gaussian noise\" is the safe default — it is the least-committal choice consistent with knowing only the first two moments (an Occam's razor for distributions). It is why maximum-entropy reasoning in physics and ML keeps producing Gaussians, and it pairs with the MLE view: assuming Gaussian noise and maximizing likelihood gives least squares — so \"minimize squared error\" <em>is</em> \"assume the most-noncommittal noise with a fixed variance.\"</p>\n<p>The \"aha\": the normal is not just where sums <em>land</em> (CLT) — it is the distribution that says the <em>least</em> for a given mean and variance. Defaulting to a bell curve is choosing maximum honesty about your ignorance, which is why it is the natural model whenever you only trust the mean and the spread.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Brownian motion — the random walk in continuous time</summary>\n<p>Take a random walk and shrink its steps toward zero in both size and time, holding the variance proportional to elapsed time. The limit is <b>Brownian motion</b> (the Wiener process) $W_t$ — a continuous path that is, remarkably, nowhere differentiable. Three properties define it: it starts at $W_0=0$, its increments over disjoint intervals are independent, and each increment is Gaussian, $W_t - W_s \\sim \\mathcal{N}(0,\\, t-s)$.</p>\n<p>So the normal distribution is literally the law of Brownian increments, and the variance growing linearly with time means the path spreads like $\\sqrt{t}$ — the diffusive scaling you see in every random-walk-to-bell-curve picture. The Gaussian increments are no accident: each one is a sum of many tiny independent shocks, so the central limit theorem hands you normality for free.</p>\n<p>Brownian motion is the canonical noise term of a stochastic differential equation, $\\mathrm{d}X_t = \\mu\\,\\mathrm{d}t + \\sigma\\,\\mathrm{d}W_t$. That single object drives the forward process of <a href=\"#/lesson/deep-learning/dl-diffusion-models\" data-route>diffusion models</a>, the geometric-Brownian-motion model of stock prices behind Black–Scholes, and Einstein's original 1905 account of pollen grains jiggling in water.</p>\n</details>\n<div data-viz=\"ps-brownian-motion\"></div>\n",
          "mcq": [
            {
              "q": "For $X \\sim N(\\mu, \\sigma^2)$, what is the value of the density $f(x)$ at the peak $x = \\mu$?",
              "choices": [
                "$1$",
                "$\\frac{1}{\\sigma\\sqrt{2\\pi}}$",
                "$\\frac{1}{\\sqrt{2\\pi}}$",
                "$\\frac{1}{2}$"
              ],
              "answer": 1,
              "explain": "At $x=\\mu$ the exponent is $0$ so $e^0=1$, leaving only the front constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$. The value is not $1$: a probability density at a point is not a probability and need not be $\\le 1$."
            },
            {
              "q": "A student claims '$f(\\mu) = 1$ because that's where the curve is tallest, and the total probability is 1.' What is the key error in this reasoning?",
              "choices": [
                "The peak height $f(\\mu)$ is a density, not a probability, so it can exceed $1$ (e.g. when $\\sigma$ is small)",
                "The curve is actually tallest at the tails, not at $\\mu$",
                "The total area is $\\sigma$, not $1$, so the peak must be $\\sigma$",
                "The peak is always exactly $0.5$ for symmetric distributions"
              ],
              "answer": 0,
              "explain": "$f$ is a probability density; only areas under it are probabilities. The peak height $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ grows without bound as $\\sigma\\to 0$, so it can be far larger than $1$."
            },
            {
              "q": "How does the standardization $Z = \\frac{X-\\mu}{\\sigma}$ transform the distribution of $X \\sim N(\\mu, \\sigma^2)$?",
              "choices": [
                "It makes $Z$ uniform on $[0,1]$",
                "It squares the variable to remove negative values",
                "It gives $Z \\sim N(\\mu, 1)$, keeping the original mean",
                "It gives $Z \\sim N(0, 1)$, the standard normal"
              ],
              "answer": 3,
              "explain": "Subtracting $\\mu$ recenters to mean $0$ and dividing by $\\sigma$ rescales to variance $1$, yielding $Z\\sim N(0,1)$. The mean becomes $0$, not $\\mu$, and the shape stays normal (not uniform)."
            },
            {
              "q": "If $X \\sim N(100, 16)$ (so $\\sigma = 4$), what is the $z$-score of the observation $x = 108$?",
              "choices": [
                "$8$",
                "$2$",
                "$0.5$",
                "$1.5$"
              ],
              "answer": 1,
              "explain": "$z = \\frac{108-100}{4} = \\frac{8}{4} = 2$. The common trap is dividing by $\\sigma^2 = 16$ to get $0.5$, but standardization divides by the standard deviation $\\sigma$, not the variance."
            },
            {
              "q": "Under the empirical (68-95-99.7) rule, approximately what fraction of a normal distribution lies within $\\pm 2\\sigma$ of the mean?",
              "choices": [
                "$68\\%$",
                "$95\\%$",
                "$99.7\\%$",
                "$50\\%$"
              ],
              "answer": 1,
              "explain": "About $95\\%$ falls within two standard deviations of the mean. The $68\\%$ figure is for $\\pm 1\\sigma$ and $99.7\\%$ is for $\\pm 3\\sigma$."
            },
            {
              "q": "Test scores are $N(500, 100^2)$. Roughly what proportion of scores exceed $600$?",
              "choices": [
                "About $16\\%$",
                "About $32\\%$",
                "About $5\\%$",
                "About $2.5\\%$"
              ],
              "answer": 0,
              "explain": "A score of $600$ is $z=+1$. Since $\\approx 68\\%$ lies within $\\pm 1\\sigma$, about $32\\%$ lies in the two tails, and by symmetry half of that, $\\approx 16\\%$, is in the upper tail. The $32\\%$ answer mistakenly keeps both tails."
            },
            {
              "q": "Two normal curves have the same mean but $\\sigma_1 = 2$ and $\\sigma_2 = 5$. How do their shapes compare?",
              "choices": [
                "The $\\sigma_1 = 2$ curve is taller and narrower; the $\\sigma_2 = 5$ curve is shorter and wider",
                "The $\\sigma_2 = 5$ curve is taller and narrower",
                "Both curves have identical peak heights since they share a mean",
                "The $\\sigma_1 = 2$ curve has more total area under it"
              ],
              "answer": 0,
              "explain": "Smaller $\\sigma$ concentrates probability near the mean, giving a taller, narrower peak (height $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is larger). Both curves enclose total area $1$; sharing a mean does not equalize peak heights."
            },
            {
              "q": "The exponent in the normal density contains the term $-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2$. Why does this guarantee the curve is symmetric about $\\mu$?",
              "choices": [
                "Because the squaring makes the exponent depend only on the distance $|x-\\mu|$, so $x = \\mu+a$ and $x = \\mu-a$ give equal density",
                "Because $e^{(\\cdot)}$ is an even function for all inputs",
                "Because $\\sigma$ is always positive",
                "Because the front constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is symmetric"
              ],
              "answer": 0,
              "explain": "Squaring $(x-\\mu)$ erases the sign, so points equidistant from $\\mu$ on either side share the same exponent and hence the same density. Symmetry comes from the squared deviation, not from properties of $e$ or the front constant."
            },
            {
              "q": "Heights are $N(170, 6^2)$ cm. A person with height $z = -1.5$ has what actual height?",
              "choices": [
                "$179$ cm",
                "$168.5$ cm",
                "$161$ cm",
                "$155$ cm"
              ],
              "answer": 2,
              "explain": "Inverting standardization: $x = \\mu + z\\sigma = 170 + (-1.5)(6) = 170 - 9 = 161$ cm. The sign of $z$ matters: a negative $z$ is below the mean, so the answer must be less than $170$."
            },
            {
              "q": "Which statement about the standard normal $N(0,1)$ is TRUE?",
              "choices": [
                "$P(Z = 0) = \\frac{1}{\\sqrt{2\\pi}}$, the peak density",
                "$P(Z = 0)$ is undefined",
                "$P(Z \\le 0) = 0$ since $0$ is the smallest value",
                "$P(Z = 0) = 0$ because $Z$ is continuous, even though density is highest there"
              ],
              "answer": 3,
              "explain": "For any continuous distribution the probability of an exact single value is $0$, regardless of how tall the density is there. The value $\\frac{1}{\\sqrt{2\\pi}}$ is the density $f(0)$, not a probability, and $P(Z\\le 0)=0.5$ by symmetry."
            },
            {
              "q": "Standardizing to $z$-scores is useful primarily because it lets you:",
              "choices": [
                "Guarantee all values become positive",
                "Turn a skewed distribution into a normal one",
                "Convert any normal distribution to $N(0,1)$ so a single table or formula handles all probability questions",
                "Change the variance to match the mean"
              ],
              "answer": 2,
              "explain": "Standardization maps every $N(\\mu,\\sigma^2)$ onto the same standard curve $N(0,1)$, so one reference suffices for all of them. It does not fix skewness (it preserves shape) nor force positivity ($z$ can be negative)."
            },
            {
              "q": "The lesson teases that the normal distribution arises 'relentlessly' — e.g. for the average of 50 dice rolls. Which principle explains why averages of many independent quantities tend to look normal?",
              "choices": [
                "The Law of Large Numbers",
                "Bayes' Theorem",
                "The Central Limit Theorem",
                "The Empirical Rule"
              ],
              "answer": 2,
              "explain": "The Central Limit Theorem states that sums or averages of many independent random variables approach a normal distribution regardless of the original shape. The Law of Large Numbers concerns the average converging to the mean, not the bell shape of its distribution."
            },
            {
              "answer": 1,
              "q": "On the normal density curve, what is special about the points $x = \\mu \\pm \\sigma$?",
              "choices": [
                "They are where the density equals zero.",
                "They are the *inflection points*, where the curve switches from concave-down (near the peak) to concave-up (out in the tails).",
                "They are the two peaks of a (bimodal) curve.",
                "They are where the density equals 1."
              ],
              "explain": "A normal curve has a single peak at $\\mu$; one standard deviation out, at $x=\\mu\\pm\\sigma$, the curvature changes sign — concave-down between them, concave-up beyond. These inflection points are a visual read of $\\sigma$: wider spacing means a larger spread."
            },
            {
              "answer": 3,
              "q": "Maria scored 82 on a biology test ($N(70, 6^2)$) and 88 on a chemistry test ($N(80, 10^2)$). Relative to each class, on which did she do better?",
              "choices": [
                "Chemistry — 88 is a higher raw score than 82.",
                "Chemistry — it has the larger standard deviation, so more spread means a better result.",
                "They are exactly equal, since both are above their class means.",
                "Biology — her z-scores are $z_{\\text{bio}}=\\frac{82-70}{6}=2.0$ vs $z_{\\text{chem}}=\\frac{88-80}{10}=0.8$, so biology is further above its mean in standard-deviation units."
              ],
              "explain": "Standardizing puts both on one ruler: $z_{\\text{bio}}=12/6=2.0$, $z_{\\text{chem}}=8/10=0.8$. A higher z-score means further above the class average in SD units, so Maria's biology result (2 SD above) is the stronger relative performance — even though its raw score is lower."
            },
            {
              "answer": 2,
              "q": "Using the 68–95–99.7 rule, approximately what is $P(Z < -1)$ for the standard normal?",
              "choices": [
                "$68\\%$, the mass within one standard deviation.",
                "$32\\%$, the total mass outside $\\pm 1\\sigma$.",
                "About $16\\%$ — outside $\\mu\\pm 1\\sigma$ lies $\\approx 32\\%$, split evenly between the two tails by symmetry.",
                "$2.5\\%$."
              ],
              "explain": "About 68% lies within $|z|\\le 1$, leaving $\\approx 32\\%$ in the two tails combined; by symmetry each tail holds half, $\\approx 16\\%$. So $P(Z<-1)\\approx 0.16$. (The $2.5\\%$ figure is the *two*-sigma tail, $P(Z<-2)$.)"
            },
            {
              "answer": 3,
              "q": "Adult heights are $N(170, 10^2)$ cm. Using the empirical rule, roughly what fraction are between 150 cm and 190 cm?",
              "choices": [
                "About $50\\%$, since the interval is centered on the mean.",
                "About $68\\%$, since any symmetric interval captures roughly two-thirds.",
                "About $99.7\\%$.",
                "About $95\\%$ — those bounds are $z = \\frac{150-170}{10} = -2$ and $z = \\frac{190-170}{10} = +2$, i.e. $\\mu \\pm 2\\sigma$."
              ],
              "explain": "Standardize the bounds: $150\\to z=-2$ and $190\\to z=+2$, so the interval is exactly $\\mu\\pm 2\\sigma$. The empirical rule puts $\\approx 95\\%$ of a normal distribution within two standard deviations of the mean."
            }
          ],
          "flashcards": [
            {
              "front": "What is the probability density function of $X \\sim N(\\mu, \\sigma^2)$?",
              "back": "$f(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$. It is symmetric about $\\mu$ (the peak), with spread set by $\\sigma$; the front constant normalizes the total area to 1."
            },
            {
              "front": "What do the parameters $\\mu$ and $\\sigma$ each control in a normal distribution?",
              "back": "$\\mu$ is the center: it locates the peak/axis of symmetry and equals $\\mathbb{E}[X]$. $\\sigma$ is the spread: small $\\sigma$ gives a tall narrow bell, large $\\sigma$ a short wide one, with $\\text{Var}(X)=\\sigma^2$ and inflection points at $\\mu\\pm\\sigma$."
            },
            {
              "front": "What is a z-score and how do you compute it?",
              "back": "A z-score standardizes a value: $z=\\dfrac{x-\\mu}{\\sigma}$. It measures how many standard deviations $x$ lies above ($z>0$) or below ($z<0$) the mean, converting any $N(\\mu,\\sigma^2)$ value onto the universal $N(0,1)$ ruler."
            },
            {
              "front": "State the 68–95–99.7 empirical rule.",
              "back": "For a normal distribution, about 68% of values lie within $\\mu\\pm 1\\sigma$, about 95% within $\\mu\\pm 2\\sigma$, and about 99.7% within $\\mu\\pm 3\\sigma$. (Precise: 0.6827, 0.9545, 0.9973.)"
            },
            {
              "front": "If $X\\sim N(\\mu,\\sigma^2)$, what is the distribution of $Z=\\frac{X-\\mu}{\\sigma}$, and why is this useful?",
              "back": "$Z\\sim N(0,1)$, the standard normal. This is useful because it reduces every normal probability question — across all units and parameters — to a single fixed reference curve."
            },
            {
              "front": "Using the empirical rule and symmetry, how do you turn a band like $|z|\\le 2$ into a single-tail probability and a percentile?",
              "back": "The two tails together hold $100\\%-95\\%=5\\%$; by symmetry each tail is $2.5\\%$, so $P(Z>2)\\approx 0.025$. Hence $z=2$ sits at about the $100\\%-2.5\\%=97.5$th percentile. Likewise $|z|\\le 1$ leaves $32\\%$ in the tails, so $P(Z>1)\\approx 16\\%$ (about the 84th percentile)."
            },
            {
              "front": "Why does the normal distribution appear so often in nature (the CLT teaser)?",
              "back": "The Central Limit Theorem: when you sum or average many independent small effects, the result is approximately normal regardless of each effect's individual distribution. Heights, measurement errors, and sample means all arise this way."
            }
          ],
          "homework": [
            {
              "prompt": "Heights of adult women are approximately $N(64, 3^2)$ inches (mean 64, standard deviation 3). (a) Find the z-score of a woman who is 70 inches tall. (b) Find the z-score for 58 inches. (c) Interpret each in words.",
              "hint": "Use $z=\\dfrac{x-\\mu}{\\sigma}$ with $\\mu=64$ and $\\sigma=3$. A positive z is above the mean, negative is below.",
              "solution": "(a) $z=\\dfrac{70-64}{3}=\\dfrac{6}{3}=2.0$. (b) $z=\\dfrac{58-64}{3}=\\dfrac{-6}{3}=-2.0$. (c) The 70-inch woman is 2 standard deviations above average height; the 58-inch woman is 2 standard deviations below average. By symmetry they are equally 'extreme' relative to the population."
            },
            {
              "prompt": "Battery lifetimes are $N(40, 5^2)$ hours. Using only the empirical rule, estimate (a) the probability a battery lasts between 30 and 50 hours, and (b) the probability a battery lasts longer than 45 hours.",
              "hint": "Convert the cutoffs to z-scores first. Then match $|z|\\le 1$ or $|z|\\le 2$ to the empirical-rule percentages, and split leftover tail mass in half by symmetry.",
              "solution": "Here $\\mu=40$, $\\sigma=5$. (a) $30\\to z=\\frac{30-40}{5}=-2$ and $50\\to z=\\frac{50-40}{5}=+2$, so we want $P(-2\\le Z\\le 2)\\approx 95\\%$. (b) $45\\to z=\\frac{45-40}{5}=+1$, so we want $P(Z>1)$. Within $\\mu\\pm1\\sigma$ is 68%, leaving $32\\%$ in the two tails, so each tail has $16\\%$. Thus $P(Z>1)\\approx 16\\%$, i.e. about 0.16."
            },
            {
              "prompt": "Two students take different standardized tests. Aisha scores 88 on a test with $\\mu=80,\\ \\sigma=4$. Ben scores 250 on a test with $\\mu=200,\\ \\sigma=40$. (a) Who performed better relative to their peers? (b) Using the empirical rule, roughly what percentile is the stronger score, and what percentage of test-takers scored higher?",
              "hint": "You cannot compare raw scores across different tests — standardize both to z-scores, then compare. For the percentile, recall the upper-tail mass beyond a given z from the 68–95–99.7 rule.",
              "solution": "(a) Aisha: $z=\\frac{88-80}{4}=\\frac{8}{4}=2.0$. Ben: $z=\\frac{250-200}{40}=\\frac{50}{40}=1.25$. Aisha's z-score (2.0) exceeds Ben's (1.25), so Aisha performed better relative to her peers despite the smaller raw number. (b) Aisha is at $z=2.0$. About 95% lie within $|z|\\le 2$, leaving 5% in the two tails, so $2.5\\%$ lie above $z=2$. Hence roughly $100\\%-2.5\\%=97.5\\%$ of test-takers scored below her (about the 97.5th percentile), and about $2.5\\%$ scored higher."
            }
          ],
          "examples": [
            {
              "title": "Standardizing and reading the empirical rule for SAT scores",
              "body": "SAT section scores are designed to be approximately $N(500, 100^2)$: mean $\\mu=500$, standard deviation $\\sigma=100$. A student scores $x=700$. We want to know (i) the z-score, (ii) what fraction of students score between 400 and 600, and (iii) what fraction score above 700.",
              "solution": "(i) Standardize: $z=\\dfrac{700-500}{100}=\\dfrac{200}{100}=2.0$. The score is exactly 2 standard deviations above the mean.\n\n(ii) The interval 400 to 600 is $500\\pm 100=\\mu\\pm 1\\sigma$, i.e. $-1\\le z\\le 1$. By the empirical rule this captures about $68\\%$ of students.\n\n(iii) Scoring above 700 means $z>2.0$. The empirical rule gives $95\\%$ within $|z|\\le 2$, so $5\\%$ lies in the two tails combined; by symmetry the upper tail alone is $\\frac{5\\%}{2}=2.5\\%$. About $2.5\\%$ of students score above 700, placing this student near the 97.5th percentile."
            },
            {
              "title": "Comparing spreads: same mean, different $\\sigma$",
              "body": "Two factories fill 500 mL water bottles. Factory A's fills are $N(500, 2^2)$ mL; Factory B's are $N(500, 8^2)$ mL. Both have the same mean, 500 mL. A bottle is acceptable if it contains between 496 mL and 504 mL. Which factory produces a higher fraction of acceptable bottles, and what are those fractions (using the empirical rule)?",
              "solution": "Both factories share $\\mu=500$, so we compare spreads via standardization of the limits 496 and 504.\n\nFactory A ($\\sigma=2$): $496\\to z=\\frac{496-500}{2}=-2$ and $504\\to z=\\frac{504-500}{2}=+2$. The acceptance window is $\\mu\\pm 2\\sigma$, so about $95\\%$ of A's bottles are acceptable.\n\nFactory B ($\\sigma=8$): $496\\to z=\\frac{496-500}{8}=-0.5$ and $504\\to z=\\frac{504-500}{8}=+0.5$. The same physical window is now only $\\mu\\pm 0.5\\sigma$ — a much narrower z-band around the center — so it captures well under 68% (numerically about $38\\%$).\n\nConclusion: with identical means, the tighter machine (smaller $\\sigma$) wins decisively, $\\approx 95\\%$ acceptable versus $\\approx 38\\%$. This illustrates that $\\sigma$, not $\\mu$, governs how much product falls inside fixed tolerance limits."
            },
            {
              "title": "A z-score beyond the empirical rule",
              "body": "IQ scores follow $X \\sim N(\\mu = 100,\\ \\sigma = 15)$. What fraction of people score at most $120$? (Unlike $85$, $115$, or $130$, the value $120$ is not a whole number of standard deviations from the mean, so the empirical rule alone won't answer it — we need a $z$-score and the standard-normal table.)",
              "solution": "<strong>Standardize.</strong> Convert $X = 120$ to a $z$-score — how many standard deviations above the mean it lies:\n$$z = \\frac{X - \\mu}{\\sigma} = \\frac{120 - 100}{15} = \\frac{20}{15} \\approx 1.33.$$\n<strong>Read the cumulative probability.</strong> The standard-normal CDF $\\Phi(z)$ gives the area to the <em>left</em> of $z$. From a $z$-table, $\\Phi(1.33) \\approx 0.9082$.\n<strong>Interpret.</strong> So $P(X \\le 120) = \\Phi(1.33) \\approx 0.9082$ — about $\\mathbf{91\\%}$ of people score at most $120$. The empirical rule only nails the round cases ($z = 1, 2, 3$); the $z$-score plus the CDF handles <em>any</em> value, which is exactly the machinery behind $p$-values and confidence intervals."
            }
          ]
        }
      ]
    },
    {
      "id": "ps-joint",
      "title": "Joint Distributions & Dependence",
      "lessons": [
        {
          "id": "ps-joint-distributions",
          "title": "Joint Distributions, Marginals & Independence",
          "minutes": 16,
          "content": "<h3>1. From one random variable to many</h3>\n<p>Real questions rarely involve a single random quantity in isolation. A doctor tracks blood pressure <em>and</em> cholesterol; an investor watches two stocks at once; a language model scores the next token given everything that came before. To reason about several random variables together we need their <strong>joint distribution</strong> — the one object that records how they co-occur, and from which every question about any subset can be recovered.</p>\n\n<h3>2. The joint PMF (discrete case)</h3>\n<p>For two discrete random variables $X$ and $Y$, the <strong>joint probability mass function</strong> is\n$$p_{X,Y}(x,y) = P(X = x,\\ Y = y),$$\nthe probability that $X$ equals $x$ <em>and</em> $Y$ equals $y$ at the same time. It is a genuine PMF: every entry is nonnegative and the whole thing sums to one,\n$$p_{X,Y}(x,y) \\ge 0, \\qquad \\sum_{x}\\sum_{y} p_{X,Y}(x,y) = 1.$$\nPicture a grid — rows indexed by the values of $X$, columns by the values of $Y$ — with each cell holding the probability of that exact pair.</p>\n\n<h3>3. Marginal distributions: collapsing the grid</h3>\n<p>From the joint, the distribution of $X$ <em>alone</em> — ignoring $Y$ — is its <strong>marginal</strong>, obtained by summing each row across all columns:\n$$p_X(x) = \\sum_{y} p_{X,Y}(x,y), \\qquad p_Y(y) = \\sum_{x} p_{X,Y}(x,y).$$\nThe name is literal: write the joint table on paper and the row sums land in the right <em>margin</em>, the column sums along the bottom. Marginalizing discards information — you can always pass from joint to marginal, but never reverse the trip without extra assumptions about how $X$ and $Y$ relate.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>The joint distribution is the full picture; a marginal is its shadow on one axis. Two very different joints can cast the <em>same</em> pair of shadows — which is exactly why marginals alone cannot tell you whether the variables move together.</p>\n</div>\n\n<h3>4. The continuous case: joint densities</h3>\n<p>When $X$ and $Y$ are continuous, a single <strong>joint density</strong> $f_{X,Y}(x,y) \\ge 0$ plays the role of the table, and probabilities become <em>volumes</em> under the surface:\n$$P\\big((X,Y) \\in A\\big) = \\iint_{A} f_{X,Y}(x,y)\\,dx\\,dy, \\qquad \\int_{-\\infty}^{\\infty}\\!\\!\\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dx\\,dy = 1.$$\nMarginals are recovered by <em>integrating out</em> the unwanted variable — the continuous analogue of summing a row:\n$$f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dy.$$</p>\n\n<h3>5. Independence of random variables</h3>\n<p>Two random variables are <strong>independent</strong> when their joint factors into the product of their marginals for <em>every</em> pair of values:\n$$p_{X,Y}(x,y) = p_X(x)\\,p_Y(y) \\quad\\text{(discrete)}, \\qquad f_{X,Y}(x,y) = f_X(x)\\,f_Y(y) \\quad\\text{(continuous)}.$$\nEquivalently, knowing $Y$ tells you nothing about $X$. This is the direct lift of event independence $P(A\\cap B)=P(A)P(B)$ to variables, and it must hold at <em>all</em> points — a single cell that violates the product rule breaks independence everywhere.</p>\n<p><strong>A quick test.</strong> If the support of the joint is not a rectangle — if the <em>allowed</em> values of $X$ depend on $Y$ — the variables cannot be independent, no matter what the numbers are. (For independent variables every row has the same <em>shape</em>, just rescaled.)</p>\n\n<h3>6. Conditional distributions</h3>\n<p>Slice the joint at a fixed value of $Y$ and renormalize, and you get the <strong>conditional distribution</strong> of $X$ given $Y=y$:\n$$p_{X\\mid Y}(x\\mid y) = \\frac{p_{X,Y}(x,y)}{p_Y(y)}, \\qquad f_{X\\mid Y}(x\\mid y) = \\frac{f_{X,Y}(x,y)}{f_Y(y)}.$$\nThis is conditional probability applied to a whole distribution: fix what you learned ($Y=y$), zoom into that slice, and rescale so it sums (or integrates) to 1. Independence is precisely the case where the conditional does not depend on $y$ at all: $p_{X\\mid Y}(x\\mid y) = p_X(x)$.</p>\n\n<h3>7. Worked intuition: a joint table</h3>\n<p>Let $X\\in\\{0,1\\}$ and $Y\\in\\{0,1\\}$ have joint probabilities $p(0,0)=0.4,\\ p(0,1)=0.2,\\ p(1,0)=0.1,\\ p(1,1)=0.3$ (they sum to 1). The marginals are $p_X(0)=0.4+0.2=0.6$, $p_X(1)=0.4$, and $p_Y(0)=0.4+0.1=0.5$, $p_Y(1)=0.5$. Are $X$ and $Y$ independent? Check one cell: $p_X(0)p_Y(0)=0.6\\times 0.5=0.30$, but the joint says $p(0,0)=0.40\\ne 0.30$. Not independent — learning $Y=0$ shifts the odds on $X$.</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>Almost every probabilistic model is a claim about a joint distribution. <strong>Naive Bayes</strong> assumes features are conditionally independent given the label so the joint factors into a cheap product. <strong>Generative models</strong> learn (or sample from) the joint $p(\\text{data})$ directly. And the entire game of <strong>inference</strong> — predicting a label from inputs — is computing a conditional $p(y\\mid x)$ by slicing and renormalizing a joint. Master the joint $\\to$ marginal $\\to$ conditional pipeline here and the rest of probabilistic ML is variations on it.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: \"independent\" and \"uncorrelated\" are <em>not</em> the same thing</summary>\n<p>These two get conflated constantly, and the difference is the whole point of a joint distribution. $X$ and $Y$ are <strong>independent</strong> when the joint factorizes — $p(x,y) = p(x)\\,p(y)$ — meaning knowing one tells you <em>nothing</em> about the other. <strong>Uncorrelated</strong> is far weaker: it only says $\\operatorname{Cov}(X,Y)=0$, i.e. there is no <em>linear</em> relationship.</p>\n<p>Independence implies uncorrelated, but the reverse is false — and the classic counterexample makes it vivid. Let $X$ be uniform on $[-1,1]$ and $Y = X^2$. Then $Y$ is a <em>deterministic function of $X$</em> (about as dependent as two variables can be!), yet</p>\n$$\\operatorname{Cov}(X,Y) = \\mathbb{E}[X^3] - \\mathbb{E}[X]\\,\\mathbb{E}[X^2] = 0,$$\n<p>because the symmetric distribution makes every odd moment vanish. Correlation only ever sees straight lines; it is blind to the parabola staring it in the face. The one important place the two notions coincide is the <strong>jointly Gaussian</strong> case, where uncorrelated really does imply independent — a special property we lean on constantly, and which does <em>not</em> hold for distributions in general.</p>\n</details>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-joint\"></div>\n<h4>Try it in code</h4>\n<p>To get a marginal from a joint distribution, sum out the other variable: <code>P(X=0) = Σ_y P(X=0, Y=y)</code>. Run it on a 2×2 joint table:</p>\n<div data-code=\"javascript\" data-expected=\"0.30\">// Marginal P(X=0): sum the joint over all Y for the fixed X row.\nfunction marginalX(joint, xRow) {\n  return joint[xRow].reduce(function (a, b) { return a + b; }, 0);\n}\nvar joint = [[0.1, 0.2], [0.3, 0.4]];   // joint[x][y]\nconsole.log(marginalX(joint, 0).toFixed(2));   // 0.30 -- sum the row to marginalize out Y</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: marginalization — recovering one variable from the joint</summary>\n<p>The joint distribution $P(X,Y)$ holds <em>everything</em> about how two variables behave together. Two operations pull what you need out of it.</p>\n<p><b>Marginalize: sum out the other variable.</b> To get $X$'s distribution alone, add up the joint over all values of $Y$: $P(X=x) = \\sum_y P(X=x, Y=y)$ (an integral for continuous variables). It is the <em>marginal</em> because, in a joint table, you compute it by summing each row into the margin. From $\\begin{bmatrix}0.1 & 0.2\\\\0.3 & 0.4\\end{bmatrix}$ (rows $X$, columns $Y$): $P(X=0)=0.1+0.2=0.3$ and $P(X=1)=0.7$.</p>\n<p><b>Condition: slice, then renormalize.</b> The other operation fixes $Y=y$ and rescales that slice to sum to 1: $P(X\\mid Y=y) = \\tfrac{P(X,\\,Y=y)}{P(Y=y)}$. Marginalizing <em>averages over</em> a variable; conditioning <em>fixes</em> it.</p>\n<p>The \"aha\": the joint is the master object — marginals and conditionals are both <em>derived</em> from it (sum out to marginalize, slice-and-renormalize to condition). You cannot in general go the other way: marginals alone do not determine the joint (you also need the dependence structure), which is exactly why \"independent vs merely uncorrelated\" matters.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: covariance and the covariance matrix</summary>\n<p>\"Uncorrelated\" (the other dive) hinges on a single number — the <strong>covariance</strong> — and its multivariate generalization, the <strong>covariance matrix</strong>, is one of the most important objects in statistics and ML.</p>\n<p><b>Covariance.</b> $\\operatorname{Cov}(X,Y)=\\mathbb{E}[(X-\\mu_X)(Y-\\mu_Y)]$ measures how two variables move <em>together</em>: positive if they tend to rise together, negative if one rises as the other falls, zero if there is no <em>linear</em> relationship. <em>Correlation</em> is just covariance normalized to $[-1,1]$ by dividing out both standard deviations, so it is scale-free.</p>\n<p><b>The covariance matrix.</b> For a vector of $d$ variables, collect all pairwise covariances into a $d\\times d$ symmetric matrix $\\Sigma$, with the variances on the diagonal. It captures the entire <em>second-order</em> structure of the data — every variable's spread and every pair's co-movement — in one object. It is positive semidefinite, and its shape is literally the ellipsoidal \"cloud\" the data forms.</p>\n<p><b>Why it is everywhere.</b> <em>PCA</em> diagonalizes $\\Sigma$: its eigenvectors are the principal axes of that cloud and its eigenvalues the variance along each (the low-rank structure from the linear-algebra dive). The multivariate Gaussian is defined by its mean and $\\Sigma$; Mahalanobis distance, Kalman filters, Gaussian processes, and whitening all run on the covariance matrix.</p>\n<p>The \"aha\": covariance turns \"do these move together?\" into a number, and stacking all pairwise covariances into the matrix $\\Sigma$ captures a dataset's whole second-order shape. Diagonalizing it <em>is</em> PCA — which is why the covariance matrix sits at the foundation of dimensionality reduction, Gaussians, and much of ML.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A joint PMF table for $X\\in\\{0,1\\}$ and $Y\\in\\{0,1\\}$ has cells $p(0,0)=0.3,\\ p(0,1)=0.1,\\ p(1,0)=0.2$. What must $p(1,1)$ equal for this to be a valid joint PMF?",
              "choices": [
                "$0.5$",
                "$0.6$",
                "$0.4$",
                "It cannot be determined from the information given"
              ],
              "answer": 2,
              "explain": "A valid joint PMF must sum to 1, so $p(1,1)=1-(0.3+0.1+0.2)=0.4$. The normalization constraint pins it down exactly."
            },
            {
              "q": "Two students each compute marginals from the same joint table but get different $p_X$ values. Without seeing their work, which mistake is most likely the cause?",
              "choices": [
                "Marginals require the conditional distribution first, which they skipped",
                "One forgot that marginals can be negative",
                "The joint table does not have unique marginals",
                "One summed the joint over the wrong variable (summing across $x$ instead of $y$)"
              ],
              "answer": 3,
              "explain": "$p_X(x)=\\sum_y p_{X,Y}(x,y)$ sums out $Y$; summing out $X$ instead yields $p_Y$, not $p_X$. Marginals are uniquely determined by the joint and never negative, so the only viable error is collapsing the wrong axis."
            },
            {
              "q": "You are told only the two marginals $p_X$ and $p_Y$ (not the joint). What can you conclude about the joint distribution?",
              "choices": [
                "The joint is uniquely determined as $p_X(x)p_Y(y)$",
                "Many different joints are consistent with these marginals",
                "The joint must equal the larger of $p_X(x)$ and $p_Y(y)$ in each cell",
                "The joint is fully determined only if both marginals are uniform"
              ],
              "answer": 1,
              "explain": "Marginals are shadows on each axis; many joints cast the same shadows because the marginals carry no information about co-movement. Writing $p_X(x)p_Y(y)$ assumes independence, which is just one of the many compatible joints."
            },
            {
              "q": "For the joint $p(0,0)=0.4,\\ p(0,1)=0.2,\\ p(1,0)=0.1,\\ p(1,1)=0.3$, what is the conditional probability $P(Y=0\\mid X=1)$?",
              "choices": [
                "$0.10$",
                "$0.50$",
                "$0.25$",
                "$0.40$"
              ],
              "answer": 2,
              "explain": "$p_X(1)=0.1+0.3=0.4$, so $P(Y=0\\mid X=1)=p(1,0)/p_X(1)=0.1/0.4=0.25$. The tempting $0.10$ forgets to renormalize by the marginal."
            },
            {
              "q": "A joint density satisfies $f_{X,Y}(x,y)>0$ exactly on the triangle $\\{0\\le y\\le x\\le 1\\}$ and is $0$ elsewhere. What can you immediately say about $X$ and $Y$?",
              "choices": [
                "They are independent, since the density is a valid surface",
                "They are independent only if $f_{X,Y}$ is constant on the triangle",
                "Independence depends on the exact formula, which is not given",
                "They cannot be independent, because the support is not a rectangle"
              ],
              "answer": 3,
              "explain": "The allowed values of $Y$ (namely $0\\le y\\le x$) depend on $X$, so the support is not a product set. Independence forces a rectangular (product-shaped) support, so it fails here regardless of the formula's exact values."
            },
            {
              "q": "For independent random variables, how does the conditional distribution $p_{X\\mid Y}(x\\mid y)$ behave as $y$ changes?",
              "choices": [
                "It scales up linearly with $y$",
                "It does not depend on $y$ and equals the marginal $p_X(x)$",
                "It equals the joint $p_{X,Y}(x,y)$ at every $y$",
                "It becomes uniform over the values of $X$"
              ],
              "answer": 1,
              "explain": "Independence means $p_{X,Y}(x,y)=p_X(x)p_Y(y)$, so $p_{X\\mid Y}(x\\mid y)=p_X(x)p_Y(y)/p_Y(y)=p_X(x)$ — constant in $y$. Knowing $Y$ tells you nothing new about $X$; it need not be uniform."
            },
            {
              "q": "Machines A and B fail independently on a given day with probabilities $0.1$ and $0.2$. What is the probability that at least one machine fails?",
              "choices": [
                "$0.30$",
                "$0.02$",
                "$0.28$",
                "$0.72$"
              ],
              "answer": 2,
              "explain": "By independence, $P(\\text{neither fails})=(0.9)(0.8)=0.72$, so $P(\\text{at least one})=1-0.72=0.28$. The naive $0.1+0.2=0.30$ double-counts the both-fail outcome instead of using the complement."
            },
            {
              "q": "Someone claims: 'If every row of a joint table has the same shape after rescaling, then $X$ and $Y$ are independent.' Is this correct?",
              "choices": [
                "No — equal row shapes are irrelevant to independence",
                "Yes — proportional rows are exactly the independence condition",
                "Only if the columns are also identical, not merely proportional",
                "Only when the table is square"
              ],
              "answer": 1,
              "explain": "Independence means each conditional $p_{X\\mid Y}(\\cdot\\mid y)$ equals the same marginal $p_X$, i.e. every row is a rescaled copy of one fixed shape. Proportional rows (and columns) are precisely the factorization $p_{X,Y}=p_X p_Y$."
            },
            {
              "q": "A continuous joint density is $f_{X,Y}(x,y)=6e^{-2x-3y}$ for $x,y\\ge 0$ and $0$ otherwise. Are $X$ and $Y$ independent?",
              "choices": [
                "No, because the constant $6$ cannot be split between two marginals",
                "Cannot tell without computing both marginals first",
                "No, because the exponents differ ($2$ vs $3$)",
                "Yes, because the density factors as $(2e^{-2x})(3e^{-3y})$"
              ],
              "answer": 3,
              "explain": "The density factors into a function of $x$ alone times a function of $y$ alone over a rectangular support: $6e^{-2x-3y}=(2e^{-2x})(3e^{-3y})$, each a valid marginal density. That factorization is exactly independence; differing rates and the constant are no obstacle."
            },
            {
              "q": "From a joint PMF you correctly compute $p_X(2)=0.5$ and $p_{X\\mid Y}(2\\mid 1)=0.5$. With only this information, can you conclude $X$ and $Y$ are independent?",
              "choices": [
                "Yes — the conditional matches the marginal, so they are independent",
                "No — independence can never be checked from conditionals",
                "Yes — equality at any single point forces independence everywhere",
                "No — independence must hold for every pair of values, not just one"
              ],
              "answer": 3,
              "explain": "Independence requires $p_{X\\mid Y}(x\\mid y)=p_X(x)$ for all $x$ and all $y$. Agreement at a single $(x,y)$ pair is necessary but far from sufficient; some other cell could still violate the product rule."
            },
            {
              "q": "A six-sided die is rolled. Let $X$ be the number rolled and $Y=1$ if the roll is even, else $Y=0$. What is $p_{X,Y}(3,1)$?",
              "choices": [
                "$0$",
                "$1/6$",
                "$1/12$",
                "$1/2$"
              ],
              "answer": 0,
              "explain": "$Y=1$ means the roll is even, but $X=3$ is odd, so the event $\\{X=3,\\ Y=1\\}$ is impossible and has probability $0$. The distractor $1/6$ ignores the deterministic link forcing many joint cells to vanish."
            },
            {
              "q": "In the continuous case, why do we recover the marginal $f_X(x)$ by integrating $f_{X,Y}(x,y)$ over $y$ rather than over $x$?",
              "choices": [
                "Because integrating over $x$ would not converge",
                "Because integrating over $y$ removes (averages out) the variable we want to ignore, leaving a function of $x$",
                "Because $f_X(x)$ is defined as the partial derivative in $x$",
                "Because the marginal is the value of the joint at $y=0$"
              ],
              "answer": 1,
              "explain": "Marginalizing means eliminating the unwanted variable: integrating out $y$ sums the density over all $y$-slices and returns a function of $x$ alone, the continuous analogue of summing a row. Integrating over $x$ would instead remove $X$ and give $f_Y(y)$."
            },
            {
              "answer": 0,
              "q": "For continuous random variables with joint density $f_{X,Y}(x,y)$, how is $P\\big((X,Y)\\in A\\big)$ obtained, and what must the total be?",
              "choices": [
                "Integrate the density over $A$ — a *volume* under the surface, $\\iint_A f_{X,Y}\\,dx\\,dy$ — and the total volume over the whole plane must equal 1.",
                "Read $f_{X,Y}$ at the center of $A$; the density there must equal 1.",
                "Differentiate $f_{X,Y}$ over $A$; the total derivative must equal 1.",
                "Sum $f_{X,Y}$ over the points in $A$; the total over all points must equal 1."
              ],
              "explain": "In the continuous case the joint density is a surface, and probability is the volume beneath it over the region: $P((X,Y)\\in A)=\\iint_A f_{X,Y}\\,dx\\,dy$, with $\\iint_{\\mathbb{R}^2} f_{X,Y}\\,dx\\,dy=1$. (Summing is the discrete analogue; the density itself is not a probability.)"
            },
            {
              "answer": 0,
              "q": "What does it take for two random variables to be independent via the factorization $p_{X,Y}(x,y)=p_X(x)\\,p_Y(y)$?",
              "choices": [
                "The factorization must hold at *every* pair $(x,y)$ — a single cell where $p_{X,Y}(x,y)\\ne p_X(x)p_Y(y)$ breaks independence entirely.",
                "The factorization need hold at just one representative pair $(x,y)$.",
                "The factorization must hold on average (summed over all pairs), even if individual cells differ.",
                "Only the marginals must match; the individual joint values are irrelevant."
              ],
              "explain": "Independence is an all-points condition: the joint must equal the product of marginals for *every* $(x,y)$. Find even one pair where it fails and the variables are dependent — exactly what the worked example showed when $p(0,0)=0.40\\ne p_X(0)p_Y(0)=0.30$."
            },
            {
              "answer": 0,
              "q": "A joint PMF has $p(0,0)=0.4,\\ p(0,1)=0.2,\\ p(1,0)=0.1,\\ p(1,1)=0.3$. What is $P(X=1\\mid Y=1)$?",
              "choices": [
                "$0.6$, from $\\frac{p(1,1)}{p_Y(1)} = \\frac{0.3}{0.2+0.3} = \\frac{0.3}{0.5}$.",
                "$0.5$, since $Y=1$ has probability $0.5$.",
                "$0.3$, the joint probability $p(1,1)$ itself.",
                "$0.75$, from $\\frac{p(1,1)}{p_X(1)} = \\frac{0.3}{0.4}$."
              ],
              "explain": "Condition on $Y=1$: slice to that column and renormalize by its total. $p_Y(1)=p(0,1)+p(1,1)=0.2+0.3=0.5$, so $P(X=1\\mid Y=1)=\\frac{p(1,1)}{p_Y(1)}=\\frac{0.3}{0.5}=0.6$. (Dividing by $p_X(1)=0.4$ would instead give $P(Y=1\\mid X=1)$.)"
            },
            {
              "answer": 2,
              "q": "The lesson says the \"joint → marginal → conditional\" pipeline underlies probabilistic ML. How does *inference* (predicting a label $y$ from input $x$) fit in?",
              "choices": [
                "It sums the joint to 1, which directly yields the prediction.",
                "It computes a marginal $p(y)$, ignoring $x$ entirely.",
                "It computes a conditional $p(y\\mid x)$ — slicing the joint at the observed $x$ and renormalizing — which is exactly the conditional-distribution operation.",
                "It requires the marginals only; the joint is never used."
              ],
              "explain": "Predicting $y$ from $x$ means evaluating $p(y\\mid x)=\\frac{p(x,y)}{p(x)}$ — fix the observed $x$ (slice), renormalize over $y$. Generative models learn the joint $p(x,y)$; inference reads a conditional off it. That slice-and-renormalize move is the same one used throughout the lesson."
            }
          ],
          "flashcards": [
            {
              "front": "What is the joint PMF $p_{X,Y}(x,y)$, and what two conditions make it valid?",
              "back": "$p_{X,Y}(x,y)=P(X=x,\\,Y=y)$ — the probability the two variables take those values simultaneously. Valid when every entry is $\\ge 0$ and the entire table sums to 1: $\\sum_x\\sum_y p_{X,Y}(x,y)=1$."
            },
            {
              "front": "How do you get the marginal $p_X(x)$ from a joint PMF?",
              "back": "Sum the joint over all values of the other variable: $p_X(x)=\\sum_y p_{X,Y}(x,y)$ (the row sums in the margin). For densities, integrate: $f_X(x)=\\int f_{X,Y}(x,y)\\,dy$."
            },
            {
              "front": "State the definition of independence for two random variables.",
              "back": "The joint factors into the product of marginals at every point: $p_{X,Y}(x,y)=p_X(x)\\,p_Y(y)$ (or $f_{X,Y}=f_X f_Y$). Equivalently, the conditional distribution does not depend on the conditioning value."
            },
            {
              "front": "What is the conditional distribution $p_{X\\mid Y}(x\\mid y)$?",
              "back": "$p_{X\\mid Y}(x\\mid y)=\\dfrac{p_{X,Y}(x,y)}{p_Y(y)}$ — slice the joint at $Y=y$ and renormalize by the marginal $p_Y(y)$ so it sums to 1."
            },
            {
              "front": "Why can't you reconstruct the joint distribution from the two marginals alone?",
              "back": "Marginals are shadows on each axis; many different joints cast the same shadows. The marginals carry no information about how $X$ and $Y$ co-vary, so the dependence structure is lost."
            },
            {
              "front": "A \"support shape\" shortcut: when can you immediately rule out independence?",
              "back": "If the set of allowed values of one variable depends on the other (the joint support is not a rectangle/product set), the variables cannot be independent — independence forces a product-shaped support."
            }
          ],
          "homework": [
            {
              "prompt": "A fair coin is flipped twice. Let $X$ be the number of heads on the first flip ($0$ or $1$) and $Y$ the total number of heads ($0,1,2$). Write the joint PMF table, find both marginals, and determine whether $X$ and $Y$ are independent.",
              "hint": "List the 4 equally likely outcomes HH, HT, TH, TT, each with probability $1/4$, and read off $(X,Y)$ for each. Then check whether $p(x,y)=p_X(x)p_Y(y)$ for even one cell.",
              "solution": "Outcomes (prob $1/4$ each): HH$\\to(1,2)$, HT$\\to(1,1)$, TH$\\to(0,1)$, TT$\\to(0,0)$. Joint: $p(0,0)=p(0,1)=p(1,1)=p(1,2)=1/4$; all other cells $0$. Marginals: $p_X(0)=p_X(1)=1/2$; $p_Y(0)=1/4,\\ p_Y(1)=1/2,\\ p_Y(2)=1/4$. Independence fails: $p(0,2)=0$ but $p_X(0)p_Y(2)=\\tfrac12\\cdot\\tfrac14=\\tfrac18\\ne 0$. (Intuitively, knowing the first flip constrains the possible totals.)"
            },
            {
              "prompt": "The joint density of $(X,Y)$ is $f(x,y)=4xy$ for $0\\le x\\le 1,\\ 0\\le y\\le 1$ and $0$ elsewhere. Find the marginal $f_X(x)$ and decide whether $X$ and $Y$ are independent.",
              "hint": "Integrate out $y$ over $[0,1]$. Then compare the joint with the product $f_X(x)f_Y(y)$.",
              "solution": "$f_X(x)=\\int_0^1 4xy\\,dy = 4x\\cdot\\tfrac{y^2}{2}\\Big|_0^1 = 2x$ for $0\\le x\\le 1$. By symmetry $f_Y(y)=2y$. Then $f_X(x)f_Y(y)=2x\\cdot 2y=4xy=f(x,y)$, so $X$ and $Y$ <strong>are</strong> independent."
            },
            {
              "prompt": "From the joint table $p(0,0)=0.4,\\ p(0,1)=0.2,\\ p(1,0)=0.1,\\ p(1,1)=0.3$, compute the conditional distribution of $X$ given $Y=1$.",
              "hint": "First find $p_Y(1)$ by summing the column $y=1$. Then divide each matching joint entry by it.",
              "solution": "$p_Y(1)=p(0,1)+p(1,1)=0.2+0.3=0.5$. So $p_{X\\mid Y}(0\\mid 1)=0.2/0.5=0.4$ and $p_{X\\mid Y}(1\\mid 1)=0.3/0.5=0.6$. (Compare to the marginal $p_X(0)=0.6$: conditioning on $Y=1$ changed it to $0.4$, confirming dependence.)"
            }
          ],
          "examples": [
            {
              "title": "Reading marginals and a conditional from a joint table",
              "body": "A small shop records, for each customer, whether they buy coffee ($X=1$) and whether they buy a pastry ($Y=1$). The joint probabilities are $p(0,0)=0.30,\\ p(1,0)=0.35,\\ p(0,1)=0.05,\\ p(1,1)=0.30$. (i) Find the marginal probability a customer buys coffee. (ii) Find $P(\\text{pastry}\\mid\\text{coffee})$. (iii) Are coffee and pastry purchases independent?",
              "solution": "(i) $p_X(1)=p(1,0)+p(1,1)=0.35+0.30=0.65$. So $65\\%$ buy coffee.\n\n(ii) $P(Y=1\\mid X=1)=\\dfrac{p(1,1)}{p_X(1)}=\\dfrac{0.30}{0.65}\\approx 0.46$. Among coffee buyers, about $46\\%$ also get a pastry.\n\n(iii) The marginal pastry rate is $p_Y(1)=p(0,1)+p(1,1)=0.05+0.30=0.35$, i.e. $35\\%$. Since $P(Y=1\\mid X=1)\\approx 0.46 \\ne 0.35 = P(Y=1)$, the purchases are <strong>not independent</strong> — buying coffee makes a pastry markedly more likely (a classic cross-sell signal)."
            },
            {
              "title": "Using independence to build a joint from marginals",
              "body": "A factory's two machines fail independently on a given day. Machine A fails with probability $0.1$, machine B with probability $0.2$. Find the probability that (i) both fail, (ii) exactly one fails, (iii) neither fails.",
              "solution": "Because the failures are independent, the joint is the product of marginals.\n\n(i) Both fail: $P(A)P(B)=0.1\\times 0.2 = 0.02$.\n\n(ii) Exactly one fails $=P(A\\text{ only})+P(B\\text{ only}) = (0.1)(0.8) + (0.9)(0.2) = 0.08 + 0.18 = 0.26$.\n\n(iii) Neither fails: $(0.9)(0.8)=0.72$. Check: $0.02+0.26+0.72=1.00$. Independence is what let us multiply marginals cell-by-cell instead of needing a measured joint table."
            },
            {
              "title": "Testing independence from a joint table",
              "body": "A joint distribution over $X, Y \\in \\{0, 1\\}$ is $P = \\begin{bmatrix} 0.1 & 0.2 \\\\ 0.3 & 0.4 \\end{bmatrix}$ (rows = $X$, columns = $Y$). Are $X$ and $Y$ independent?",
              "solution": "<strong>Get the marginals.</strong> Sum across rows for $P(X)$ and down columns for $P(Y)$: $P(X=0) = 0.1 + 0.2 = 0.3$ and $P(Y=0) = 0.1 + 0.3 = 0.4$.\n<strong>Does the joint factor?</strong> $X$ and $Y$ are independent iff $P(X, Y) = P(X)\\,P(Y)$ in <em>every</em> cell. Check the top-left: $P(X=0)\\,P(Y=0) = 0.3 \\times 0.4 = 0.12$, but the table has $P(X=0, Y=0) = 0.1$. Since $0.12 \\ne 0.1$, the factorization fails — so $X$ and $Y$ are <b>dependent</b>.\n<strong>One failing cell is enough.</strong> Independence needs the product rule to hold in <em>all</em> cells; a single violation breaks it. (Conversely, if every cell equals its row-sum times its column-sum, the variables are independent.)\n<strong>The aha.</strong> Independence is exactly \"the joint is the outer product of the marginals\" — knowing $X$ tells you nothing about $Y$. The gap between $P(X,Y)$ and $P(X)\\,P(Y)$ is what covariance and mutual information measure; here it is nonzero, so the variables carry information about each other."
            }
          ]
        },
        {
          "id": "ps-covariance-correlation",
          "title": "Covariance & Correlation",
          "minutes": 16,
          "content": "<h3>1. The question: do two variables move together?</h3>\n<p>Marginals tell you how each variable behaves alone; the joint hides a richer fact — whether $X$ and $Y$ tend to rise and fall <em>together</em>. Tall people tend to be heavier; hours studied tend to track exam scores; two tech stocks often lurch in unison. <strong>Covariance</strong> and its normalized cousin <strong>correlation</strong> put a single signed number on that co-movement.</p>\n\n<h3>2. Covariance: the average co-deviation</h3>\n<p>The <strong>covariance</strong> of $X$ and $Y$ is the expected product of their deviations from their means:\n$$\\operatorname{Cov}(X,Y) = \\mathbb{E}\\big[(X-\\mu_X)(Y-\\mu_Y)\\big].$$\nRead the sign off the typical term: when $X$ is above its mean <em>and</em> $Y$ is too, the product is positive; when both are below, the product of two negatives is again positive. Only when high-$X$ pairs with low-$Y$ (and vice versa) is the term negative. So $\\operatorname{Cov}>0$ means \"move together,\" $\\operatorname{Cov}<0$ means \"move oppositely,\" and $\\operatorname{Cov}=0$ means no <em>linear</em> co-movement on average.</p>\n\n<h3>3. The computational formula</h3>\n<p>Expanding the product and using linearity of expectation gives the formula you will actually compute with:\n$$\\operatorname{Cov}(X,Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\,\\mathbb{E}[Y].$$\nIt mirrors the variance shortcut $\\operatorname{Var}(X)=\\mathbb{E}[X^2]-(\\mathbb{E}[X])^2$ — and indeed covariance generalizes variance: setting $Y=X$ gives\n$$\\operatorname{Cov}(X,X) = \\mathbb{E}[X^2]-(\\mathbb{E}[X])^2 = \\operatorname{Var}(X).$$</p>\n\n<h3>4. Properties: covariance is bilinear</h3>\n<p>Covariance behaves like a (symmetric) product, linear in each slot:</p>\n<ul>\n<li><strong>Symmetry:</strong> $\\operatorname{Cov}(X,Y)=\\operatorname{Cov}(Y,X)$.</li>\n<li><strong>Scaling & shifts:</strong> $\\operatorname{Cov}(aX+b,\\ cY+d) = ac\\,\\operatorname{Cov}(X,Y)$ — additive constants vanish (they don't deviate), multiplicative ones factor out.</li>\n<li><strong>Additivity:</strong> $\\operatorname{Cov}(X+Z,\\ Y) = \\operatorname{Cov}(X,Y)+\\operatorname{Cov}(Z,Y)$.</li>\n</ul>\n<p>Because constants shift the mean by the same amount they shift the value, they never change a covariance — covariance sees only fluctuations.</p>\n\n<h3>5. The variance of a sum</h3>\n<p>Covariance is exactly the correction term when you add random variables:\n$$\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X,Y).$$\nIf $X$ and $Y$ are independent (so $\\operatorname{Cov}=0$), variances simply add — the basis for \"errors add in quadrature\" and for why averaging $n$ independent samples cuts variance by $1/n$. Positive covariance inflates the spread of the sum; negative covariance damps it (the principle behind diversifying a portfolio).</p>\n\n<h3>6. Correlation: covariance on a fixed scale</h3>\n<p>Covariance has awkward units (the product of $X$'s and $Y$'s units) and an unbounded size, so it is hard to compare across problems. Dividing by both standard deviations removes units and pins the value to a fixed range — the <strong>(Pearson) correlation coefficient</strong>:\n$$\\rho_{X,Y} = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y}, \\qquad -1 \\le \\rho_{X,Y} \\le 1.$$\nThe bound (a consequence of the Cauchy–Schwarz inequality) makes $\\rho$ interpretable: $\\rho=+1$ means $Y$ is an exactly increasing linear function of $X$; $\\rho=-1$ an exactly decreasing one; $\\rho=0$ no linear relationship. Values near $\\pm 1$ mean a tight line, values near $0$ a formless cloud.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Careful</div>\n<p>Correlation measures <em>linear</em> association only. A variable can determine another completely yet have $\\rho=0$ if the relationship is curved — see the next section.</p>\n</div>\n\n<p>Drag the correlation in the explorer below: watch the cloud tilt from a formless blob ($\\rho=0$) toward a tight line ($\\rho=\\pm1$), with the best-fit line and the 2σ covariance ellipse tracking it. Notice the <em>sample</em> correlation computed from the points stays close to the $\\rho$ you set.</p>\n<div data-viz=\"ps-covariance-scatter\"></div>\n\n<h3>7. Independence vs. uncorrelated — not the same thing</h3>\n<p>Independence is strictly stronger than zero correlation:\n$$\\text{independent} \\;\\Longrightarrow\\; \\operatorname{Cov}(X,Y)=0, \\qquad\\text{but}\\qquad \\operatorname{Cov}(X,Y)=0 \\;\\not\\Longrightarrow\\; \\text{independent}.$$\nThe forward direction holds because independence gives $\\mathbb{E}[XY]=\\mathbb{E}[X]\\mathbb{E}[Y]$. The converse fails for nonlinear dependence. <strong>Counterexample.</strong> Let $X$ be uniform on $\\{-1,0,1\\}$ and $Y=X^2$. Then $Y$ is a deterministic function of $X$ (maximal dependence!), yet $\\mathbb{E}[XY]=\\mathbb{E}[X^3]=0$ and $\\mathbb{E}[X]=0$, so $\\operatorname{Cov}(X,Y)=0$ and $\\rho=0$. Uncorrelated, but anything but independent.</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>Stack the pairwise covariances of a random vector and you get the <strong>covariance matrix</strong> $\\Sigma$, the central object of multivariate statistics. <strong>PCA</strong> diagonalizes $\\Sigma$ to find the directions of greatest variance; the <strong>multivariate normal</strong> is parameterized by a mean vector and $\\Sigma$; feature <strong>de-correlation</strong> (whitening) and the warning that \"correlation is not causation\" both live here. Correlation is also the first thing a data scientist computes to sniff out which features carry signal about a target.</p>\n<h4>Try it in code</h4>\n<p>Pearson correlation rescales covariance to <code>[-1, 1]</code> by dividing out both spreads, so it measures the <em>direction and tightness</em> of a linear relationship regardless of units. Run it on two small series:</p>\n<div data-code=\"javascript\" data-expected=\"0.60\">// Pearson correlation: covariance normalized by the two standard deviations.\nfunction corr(x, y) {\n  var n = x.length, mx = 0, my = 0;\n  for (var i = 0; i &lt; n; i++) { mx += x[i]; my += y[i]; }\n  mx /= n; my /= n;\n  var c = 0, vx = 0, vy = 0;\n  for (var i = 0; i &lt; n; i++) { var dx = x[i] - mx, dy = y[i] - my; c += dx * dy; vx += dx * dx; vy += dy * dy; }\n  return c / Math.sqrt(vx * vy);\n}\nconsole.log(corr([1, 2, 3, 4], [2, 1, 4, 3]).toFixed(2));   // 0.60 — a moderate positive relationship</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: correlation is covariance with the units divided out</summary>\n<p>Covariance $\\mathrm{Cov}(X,Y) = \\mathbb{E}[(X-\\mu_X)(Y-\\mu_Y)]$ measures whether two variables move together: positive if they rise together, negative if one rises as the other falls. But its <em>magnitude</em> is meaningless alone — it scales with the units (measure height in cm vs m and the covariance shifts by 100×).</p>\n<p><b>Correlation</b> fixes this by normalizing: $\\rho = \\mathrm{Cov}(X,Y) / (\\sigma_X \\sigma_Y)$, dividing out both standard deviations. The result is <em>unitless</em> and pinned to $[-1, 1]$: $\\pm 1$ is a perfect line, $0$ is no linear relationship. Now you can compare the strength of association across totally different pairs of variables.</p>\n<p>The \"aha\": covariance gives the <em>direction</em> of a linear relationship, correlation its <em>strength</em> on a universal scale. The crucial caveat survives both — they see only <em>linear</em> structure, so $\\rho = 0$ means \"no line,\" not \"independent\": a perfect parabola $Y = X^2$ can have zero correlation.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: correlation only sees lines (and isn't causation)</summary>\n<p>Correlation $r$ is a powerful summary, but two caveats keep it honest.</p>\n<p><b>$r = 0$ does not mean independent.</b> Correlation measures only the <em>linear</em> association. A relationship can be perfectly deterministic yet have $r = 0$. Take $y = x^2$ with $x$ symmetric about $0$ (say $x \\in \\{-2,-1,0,1,2\\}$): $y$ is completely determined by $x$, yet $\\text{cov}(x, y) = 0$ and so $r = 0$. The U-shape's rising and falling halves cancel. Zero correlation rules out a <em>line</em>, not dependence.</p>\n<p><b>Correlation is not causation.</b> A strong $r$ can arise from $X$ causing $Y$, $Y$ causing $X$, or a hidden <em>confounder</em> $Z$ driving both (ice-cream sales and drownings correlate via summer heat). Correlation is symmetric and direction-blind; causation needs more — an experiment, or causal assumptions.</p>\n<p>The \"aha\": $r$ answers exactly one narrow question — \"how well does a straight line fit?\" — on a tidy $[-1,1]$ scale. It is silent about nonlinear structure (use a scatterplot or mutual information) and about <em>why</em> two things move together (use a controlled study). High $r$, low $r$, and $r=0$ are all easy to misread without those two reminders.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the covariance matrix</summary>\n<p>Covariance between two variables generalizes to many at once as the <b>covariance matrix</b> $\\Sigma$ — the central object of multivariate statistics.</p>\n<p><b>What it packages.</b> For a random vector $\\mathbf{x} = (X_1,\\dots,X_n)$, the covariance matrix $\\Sigma$ is $n\\times n$ with $\\Sigma_{ij} = \\text{Cov}(X_i, X_j)$. The <em>diagonal</em> holds the variances ($\\Sigma_{ii} = \\text{Var}(X_i)$); the <em>off-diagonal</em> holds every pairwise covariance. So one matrix captures the spread of each variable <em>and</em> how every pair moves together. It is <em>symmetric</em> ($\\Sigma_{ij}=\\Sigma_{ji}$) and <em>positive semidefinite</em> (no direction can have negative variance).</p>\n<p><b>Why it is everywhere.</b> A <em>multivariate Gaussian</em> is fully specified by its mean vector and $\\Sigma$. <b>PCA</b> is the eigendecomposition of $\\Sigma$ — its eigenvectors are the principal axes, its eigenvalues the variance along each (which is why \"covariance matrix\" links straight to the spectral theorem). The <em>Mahalanobis distance</em> uses $\\Sigma^{-1}$ to measure distance in standard-deviation units that account for correlations. Whitening, Gaussian processes, and Kalman filters all revolve around $\\Sigma$.</p>\n<p>The \"aha\": covariance is not only a pairwise number — gathered into the matrix $\\Sigma$, it is the complete second-order description of a random vector. Its symmetry and positive-semidefiniteness are why the spectral theorem applies, and diagonalizing it (PCA) reveals the independent directions of variation.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For random variables with $\\mathbb{E}[XY]=10$, $\\mathbb{E}[X]=3$, and $\\mathbb{E}[Y]=4$, what is $\\operatorname{Cov}(X,Y)$?",
              "choices": [
                "$10$",
                "$-2$",
                "$22$",
                "$120$"
              ],
              "answer": 1,
              "explain": "Using $\\operatorname{Cov}(X,Y)=\\mathbb{E}[XY]-\\mathbb{E}[X]\\mathbb{E}[Y]=10-(3)(4)=-2$. The tempting wrong answer $10$ ignores the subtraction of the product of means."
            },
            {
              "q": "If $Y = aX + b$ with $a>0$ (a perfect increasing linear relationship), what is the correlation $\\rho_{X,Y}$?",
              "choices": [
                "$+1$",
                "$a$",
                "$a/\\sigma_X$",
                "It depends on $b$"
              ],
              "answer": 0,
              "explain": "A perfect increasing linear relationship gives $\\rho=+1$ regardless of the slope $a$ or intercept $b$, since $\\operatorname{Cov}(X,aX+b)=a\\operatorname{Var}(X)$ and $\\sigma_{aX+b}=a\\sigma_X$, so the ratio is $a\\sigma_X^2/(\\sigma_X \\cdot a\\sigma_X)=1$. The slope cancels out in the normalization, so $\\rho$ is not $a$."
            },
            {
              "q": "A student computes a correlation of $\\rho = 1.4$ for two variables. What must be true?",
              "choices": [
                "The variables are very strongly positively related",
                "A computational error was made — $\\rho$ cannot exceed $1$",
                "The covariance must have been negative",
                "The standard deviations were measured in different units"
              ],
              "answer": 1,
              "explain": "By the Cauchy–Schwarz inequality, $-1 \\le \\rho \\le 1$ always, so $\\rho=1.4$ is impossible and signals an arithmetic mistake. A larger covariance never pushes $\\rho$ past $1$ because dividing by $\\sigma_X\\sigma_Y$ always rescales it into $[-1,1]$."
            },
            {
              "q": "Suppose $\\operatorname{Cov}(X,Y)=0$ for two random variables. Which conclusion is justified?",
              "choices": [
                "$X$ and $Y$ are independent",
                "There is no linear association between $X$ and $Y$, but they could still be dependent",
                "$X$ and $Y$ are deterministic functions of each other",
                "$\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)\\cdot\\operatorname{Var}(Y)$"
              ],
              "answer": 1,
              "explain": "Zero covariance means no linear co-movement, but dependence can still exist nonlinearly (e.g., $X$ uniform on $\\{-1,0,1\\}$ and $Y=X^2$). Independence implies zero covariance, not the reverse, so concluding independence is the classic mistake."
            },
            {
              "q": "Given $\\operatorname{Var}(X)=4$, $\\operatorname{Var}(Y)=9$, and $\\operatorname{Cov}(X,Y)=-3$, what is $\\operatorname{Var}(X+Y)$?",
              "choices": [
                "$13$",
                "$19$",
                "$7$",
                "$10$"
              ],
              "answer": 2,
              "explain": "$\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)+2\\operatorname{Cov}(X,Y)=4+9+2(-3)=7$. The distractor $13$ forgets the covariance term; $19$ wrongly adds rather than subtracts the negative covariance contribution."
            },
            {
              "q": "What is $\\operatorname{Cov}(3X+5,\\ -2Y+7)$ in terms of $\\operatorname{Cov}(X,Y)$?",
              "choices": [
                "$-6\\,\\operatorname{Cov}(X,Y)$",
                "$-6\\,\\operatorname{Cov}(X,Y)+35$",
                "$6\\,\\operatorname{Cov}(X,Y)$",
                "$\\operatorname{Cov}(X,Y)$"
              ],
              "answer": 0,
              "explain": "By bilinearity, $\\operatorname{Cov}(aX+b, cY+d)=ac\\,\\operatorname{Cov}(X,Y)$; the additive constants $5$ and $7$ vanish. Here $ac=(3)(-2)=-6$, so the answer is $-6\\,\\operatorname{Cov}(X,Y)$ — the constant $35$ never enters."
            },
            {
              "q": "Why is correlation often preferred over covariance for comparing the strength of association across different pairs of variables?",
              "choices": [
                "Correlation can detect nonlinear relationships that covariance misses",
                "Covariance can be negative but correlation is always positive",
                "Correlation is always larger than covariance",
                "Correlation is unitless and bounded in $[-1,1]$, while covariance has units and an unbounded magnitude"
              ],
              "answer": 3,
              "explain": "Dividing covariance by $\\sigma_X\\sigma_Y$ strips the units and confines the value to $[-1,1]$, making magnitudes comparable across problems. Both measure only linear association, and correlation shares the same sign as covariance, so the other options are false."
            },
            {
              "q": "Two fair dice are rolled; $X$ is the first die and $S=X+Y$ is the sum (with $Y$ the independent second die). What is $\\operatorname{Cov}(X,S)$?",
              "choices": [
                "$0$",
                "$\\operatorname{Var}(X)+\\operatorname{Var}(Y)$",
                "$\\operatorname{Var}(X)\\cdot\\operatorname{Var}(Y)$",
                "$\\operatorname{Var}(X)$"
              ],
              "answer": 3,
              "explain": "By bilinearity, $\\operatorname{Cov}(X,X+Y)=\\operatorname{Cov}(X,X)+\\operatorname{Cov}(X,Y)=\\operatorname{Var}(X)+0=\\operatorname{Var}(X)$, since $X$ and $Y$ are independent. It is not zero because $X$ is part of the sum $S$."
            },
            {
              "q": "For a joint PMF with $p(0,0)=0.4$, $p(0,1)=0.2$, $p(1,0)=0.1$, $p(1,1)=0.3$, what is $\\mathbb{E}[XY]$?",
              "choices": [
                "$0.3$",
                "$1.0$",
                "$0.2$",
                "$0.5$"
              ],
              "answer": 0,
              "explain": "The product $XY$ equals $1$ only at $(1,1)$ and $0$ everywhere else, so $\\mathbb{E}[XY]=1\\cdot p(1,1)=0.3$. The other cells contribute zero because at least one variable is $0$ there."
            },
            {
              "q": "An analyst finds zero correlation between ice-cream sales and sweater sales and concludes neither influences the other. What is the most important flaw?",
              "choices": [
                "Correlation of zero proves the variables are independent, so the conclusion is actually correct",
                "Correlation always implies causation, so the analyst reversed the direction",
                "A near-zero correlation can hide a strong nonlinear or seasonally-mediated relationship; $\\rho$ only captures linear association",
                "Zero correlation means the covariance is undefined"
              ],
              "answer": 2,
              "explain": "Pearson $\\rho$ measures only linear association, so a strong nonlinear or confounded (e.g., seasonal) relationship can still produce $\\rho \\approx 0$. Zero correlation does not establish independence, and covariance is perfectly well-defined when it equals zero."
            },
            {
              "q": "Setting $Y=X$ in the covariance definition shows that covariance generalizes which quantity?",
              "choices": [
                "The mean $\\mathbb{E}[X]$",
                "The correlation $\\rho_{X,X}$",
                "The standard deviation $\\sigma_X$",
                "The variance $\\operatorname{Var}(X)$"
              ],
              "answer": 3,
              "explain": "$\\operatorname{Cov}(X,X)=\\mathbb{E}[X^2]-(\\mathbb{E}[X])^2=\\operatorname{Var}(X)$, so variance is the special case of covariance with both slots equal. (Note $\\rho_{X,X}=1$ always, which is the normalized version, not what the definition directly yields.)"
            },
            {
              "q": "Two assets each have variance $\\sigma^2$ and correlation $\\rho$. An equal-weight portfolio $P=\\tfrac12 X+\\tfrac12 Y$ has variance $\\tfrac{\\sigma^2}{2}(1+\\rho)$. Which value of $\\rho$ minimizes the portfolio's risk?",
              "choices": [
                "$\\rho=+1$",
                "$\\rho=0$",
                "$\\rho=-1$",
                "$\\rho=0.5$"
              ],
              "answer": 2,
              "explain": "The portfolio variance $\\tfrac{\\sigma^2}{2}(1+\\rho)$ is smallest when $\\rho=-1$, giving variance $0$ — the assets perfectly cancel. This is the mathematical heart of diversification: the most negative covariance damps the spread of the sum the most."
            },
            {
              "answer": 3,
              "q": "Two variables have $\\operatorname{Cov}(X,Y)=4$, $\\operatorname{Var}(X)=4$, and $\\operatorname{Var}(Y)=25$. What is the correlation $\\rho_{X,Y}$?",
              "choices": [
                "$4$, the covariance itself.",
                "$0.16 = \\frac{4}{25}$.",
                "$1.0$, since the covariance is positive.",
                "$0.4$, from $\\rho = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} = \\frac{4}{\\sqrt{4}\\,\\sqrt{25}} = \\frac{4}{2\\cdot 5}$."
              ],
              "explain": "Correlation is covariance divided by both standard deviations: $\\sigma_X=\\sqrt{4}=2$, $\\sigma_Y=\\sqrt{25}=5$, so $\\rho=\\frac{4}{2\\cdot 5}=0.4$. This normalization strips the units and forces $\\rho\\in[-1,1]$, making it comparable across problems."
            },
            {
              "answer": 2,
              "q": "If $X$ and $Y$ are independent, what is $\\operatorname{Cov}(X,Y)$, and why?",
              "choices": [
                "Undefined, because independent variables have no joint distribution.",
                "Exactly $1$, the maximum, since independence is the strongest relationship.",
                "Exactly $0$, because independence gives $\\mathbb{E}[XY]=\\mathbb{E}[X]\\mathbb{E}[Y]$, so $\\operatorname{Cov}(X,Y)=\\mathbb{E}[XY]-\\mathbb{E}[X]\\mathbb{E}[Y]=0$.",
                "Always positive, since independent variables drift the same way."
              ],
              "explain": "Independence implies $\\mathbb{E}[XY]=\\mathbb{E}[X]\\mathbb{E}[Y]$, and the computational formula $\\operatorname{Cov}(X,Y)=\\mathbb{E}[XY]-\\mathbb{E}[X]\\mathbb{E}[Y]$ then gives $0$. So independent variables are always uncorrelated — though, crucially, the converse does not hold."
            },
            {
              "answer": 1,
              "q": "Let $X$ be uniform on $\\{-1,0,1\\}$ and $Y=X^2$. Then $Y$ is completely determined by $X$, yet $\\operatorname{Cov}(X,Y)=0$. What does this show?",
              "choices": [
                "That $X$ and $Y$ are independent after all.",
                "That zero covariance/correlation means no *linear* association only — a strong nonlinear (even deterministic) dependence can still give $\\operatorname{Cov}=0$, so uncorrelated does NOT imply independent.",
                "That correlation can exceed 1 for nonlinear relationships.",
                "That the covariance was computed incorrectly — a deterministic relationship must have $\\operatorname{Cov}\\ne 0$."
              ],
              "explain": "Here $\\mathbb{E}[X]=0$ and $\\mathbb{E}[XY]=\\mathbb{E}[X^3]=0$, so $\\operatorname{Cov}(X,Y)=0$ despite $Y=X^2$ being a perfect (nonlinear) function of $X$. Covariance/correlation detect only *linear* co-movement; a U-shaped dependence is invisible to them. Uncorrelated $\\ne$ independent."
            },
            {
              "answer": 0,
              "q": "You rescale and shift both variables: $X' = 10X + 3$ and $Y' = 0.5Y - 2$. How does the correlation $\\rho_{X',Y'}$ compare to $\\rho_{X,Y}$?",
              "choices": [
                "It is unchanged: $\\rho_{X',Y'} = \\rho_{X,Y}$, because correlation is invariant to positive scaling and any shift (the scale factors cancel between the covariance and the standard deviations).",
                "It scales by $10 \\times 0.5 = 5$.",
                "It becomes $0$, since shifting destroys the relationship.",
                "It flips sign."
              ],
              "explain": "Covariance scales as $\\operatorname{Cov}(aX+b,cY+d)=ac\\,\\operatorname{Cov}(X,Y)$, and each standard deviation scales by $|a|$ and $|c|$. In $\\rho=\\operatorname{Cov}/(\\sigma_{X'}\\sigma_{Y'})$ the factor $ac$ (here positive) cancels, leaving $\\rho$ unchanged. (A negative scale factor would flip the sign; shifts never matter.)"
            }
          ],
          "flashcards": [
            {
              "front": "Define covariance two ways (definition and computational formula).",
              "back": "Definition: $\\operatorname{Cov}(X,Y)=\\mathbb{E}[(X-\\mu_X)(Y-\\mu_Y)]$. Computational: $\\operatorname{Cov}(X,Y)=\\mathbb{E}[XY]-\\mathbb{E}[X]\\mathbb{E}[Y]$. Setting $Y=X$ recovers $\\operatorname{Var}(X)$."
            },
            {
              "front": "What does the sign of the covariance tell you?",
              "back": "Positive: $X$ and $Y$ tend to be above/below their means together (move together). Negative: when one is high the other tends to be low. Zero: no linear co-movement on average."
            },
            {
              "front": "Give the formula for $\\operatorname{Var}(X+Y)$ and the special case for independence.",
              "back": "$\\operatorname{Var}(X+Y)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)+2\\operatorname{Cov}(X,Y)$. If independent, $\\operatorname{Cov}=0$ so the variances simply add."
            },
            {
              "front": "Define the correlation coefficient $\\rho$ and state its range and meaning at the extremes.",
              "back": "$\\rho_{X,Y}=\\dfrac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\sigma_Y}$, with $-1\\le\\rho\\le 1$. $\\rho=\\pm1$ means an exact increasing/decreasing linear relationship; $\\rho=0$ means no <em>linear</em> association."
            },
            {
              "front": "How does $\\operatorname{Cov}(aX+b,\\,cY+d)$ relate to $\\operatorname{Cov}(X,Y)$?",
              "back": "$\\operatorname{Cov}(aX+b,cY+d)=ac\\,\\operatorname{Cov}(X,Y)$. Additive constants $b,d$ drop out (they don't fluctuate); multiplicative constants $a,c$ factor out."
            },
            {
              "front": "Does zero covariance imply independence? Give the key fact and a counterexample.",
              "back": "No. Independence $\\Rightarrow$ $\\operatorname{Cov}=0$, but not conversely. Counterexample: $X$ uniform on $\\{-1,0,1\\}$, $Y=X^2$. Then $\\operatorname{Cov}(X,Y)=0$ yet $Y$ is a deterministic function of $X$. Covariance sees only linear dependence."
            }
          ],
          "homework": [
            {
              "prompt": "Two fair dice are rolled. Let $X$ be the first die and $S=X+Y$ the sum, where $Y$ is the second die. Find $\\operatorname{Cov}(X,S)$ and the correlation $\\rho_{X,S}$.",
              "hint": "Use bilinearity: $\\operatorname{Cov}(X,X+Y)=\\operatorname{Cov}(X,X)+\\operatorname{Cov}(X,Y)$. The two dice are independent. Recall $\\operatorname{Var}(\\text{one die})=35/12$.",
              "solution": "$\\operatorname{Cov}(X,S)=\\operatorname{Cov}(X,X)+\\operatorname{Cov}(X,Y)=\\operatorname{Var}(X)+0=\\tfrac{35}{12}$. For the correlation, $\\sigma_X=\\sqrt{35/12}$ and $\\operatorname{Var}(S)=\\operatorname{Var}(X)+\\operatorname{Var}(Y)=2\\cdot\\tfrac{35}{12}=\\tfrac{35}{6}$, so $\\sigma_S=\\sqrt{35/6}$. Thus $\\rho_{X,S}=\\dfrac{35/12}{\\sqrt{35/12}\\,\\sqrt{35/6}}=\\sqrt{\\dfrac{35/12}{35/6}}=\\sqrt{\\tfrac12}=\\tfrac{1}{\\sqrt2}\\approx 0.707$."
            },
            {
              "prompt": "Random variables have $\\operatorname{Var}(X)=4$, $\\operatorname{Var}(Y)=9$, and $\\rho_{X,Y}=-0.5$. Compute $\\operatorname{Cov}(X,Y)$ and $\\operatorname{Var}(X+Y)$.",
              "hint": "Back out covariance from $\\rho=\\operatorname{Cov}/(\\sigma_X\\sigma_Y)$, then plug into the variance-of-a-sum formula.",
              "solution": "$\\sigma_X=2,\\ \\sigma_Y=3$, so $\\operatorname{Cov}(X,Y)=\\rho\\,\\sigma_X\\sigma_Y=(-0.5)(2)(3)=-3$. Then $\\operatorname{Var}(X+Y)=4+9+2(-3)=7$. The negative covariance shrank the spread of the sum below the sum of variances ($13$)."
            },
            {
              "prompt": "Let $X$ take values $-1,0,1$ each with probability $1/3$, and set $Y=X^2$. Show $\\operatorname{Cov}(X,Y)=0$, then explain why $X$ and $Y$ are nonetheless dependent.",
              "hint": "Compute $\\mathbb{E}[X]$, $\\mathbb{E}[Y]$, and $\\mathbb{E}[XY]=\\mathbb{E}[X^3]$. For dependence, compare $P(Y=1\\mid X=0)$ with $P(Y=1)$.",
              "solution": "$\\mathbb{E}[X]=0$. $\\mathbb{E}[XY]=\\mathbb{E}[X^3]=\\tfrac13(-1)+\\tfrac13(0)+\\tfrac13(1)=0$. So $\\operatorname{Cov}(X,Y)=\\mathbb{E}[XY]-\\mathbb{E}[X]\\mathbb{E}[Y]=0-0=0$. Yet they are dependent: $P(Y=0)=P(X=0)=\\tfrac13$, but $P(Y=0\\mid X=0)=1\\ne\\tfrac13$. Knowing $X$ pins down $Y$ exactly — the dependence is purely nonlinear, which covariance is blind to."
            }
          ],
          "examples": [
            {
              "title": "Computing covariance and correlation from a joint table",
              "body": "$(X,Y)$ has joint PMF $p(0,0)=0.4,\\ p(0,1)=0.2,\\ p(1,0)=0.1,\\ p(1,1)=0.3$. Compute $\\operatorname{Cov}(X,Y)$ and the correlation $\\rho_{X,Y}$.",
              "solution": "Marginals: $p_X(1)=0.1+0.3=0.4\\Rightarrow \\mathbb{E}[X]=0.4$; $p_Y(1)=0.2+0.3=0.5\\Rightarrow \\mathbb{E}[Y]=0.5$. The product $XY$ is $1$ only at $(1,1)$, so $\\mathbb{E}[XY]=1\\cdot p(1,1)=0.3$. Hence $\\operatorname{Cov}(X,Y)=0.3-(0.4)(0.5)=0.3-0.2=0.1>0$.\n\nFor correlation, since $X,Y$ are Bernoulli: $\\operatorname{Var}(X)=0.4(0.6)=0.24$, $\\operatorname{Var}(Y)=0.5(0.5)=0.25$, so $\\sigma_X\\sigma_Y=\\sqrt{0.24}\\sqrt{0.25}=0.4899\\times0.5=0.2449$. Thus $\\rho=\\dfrac{0.1}{0.2449}\\approx 0.41$ — a moderate positive linear association."
            },
            {
              "title": "Why diversification reduces risk (negative covariance)",
              "body": "An investor splits money equally between two assets with returns $X$ and $Y$, each with variance $\\sigma^2$. The portfolio return is $P=\\tfrac12 X+\\tfrac12 Y$. Find $\\operatorname{Var}(P)$ when the assets are (i) perfectly correlated ($\\rho=1$), (ii) uncorrelated ($\\rho=0$), and (iii) perfectly anti-correlated ($\\rho=-1$).",
              "solution": "Using $\\operatorname{Var}(aX+bY)=a^2\\operatorname{Var}(X)+b^2\\operatorname{Var}(Y)+2ab\\operatorname{Cov}(X,Y)$ with $a=b=\\tfrac12$ and $\\operatorname{Cov}=\\rho\\sigma^2$:\n$$\\operatorname{Var}(P)=\\tfrac14\\sigma^2+\\tfrac14\\sigma^2+2\\cdot\\tfrac14\\rho\\sigma^2=\\tfrac{\\sigma^2}{2}(1+\\rho).$$\n(i) $\\rho=1$: $\\operatorname{Var}(P)=\\sigma^2$ — no risk reduction. (ii) $\\rho=0$: $\\operatorname{Var}(P)=\\sigma^2/2$ — risk halved. (iii) $\\rho=-1$: $\\operatorname{Var}(P)=0$ — the two assets perfectly cancel, eliminating variance. This is the mathematical heart of diversification: low or negative covariance shrinks portfolio risk."
            },
            {
              "title": "Correlation is scale-free; covariance isn't",
              "body": "Two variables have covariance $\\operatorname{Cov}(X,Y) = 6$ with standard deviations $\\sigma_X = 2$, $\\sigma_Y = 5$. Find the correlation — then rescale $Y$ to $10Y$ and recompute both.",
              "solution": "<strong>Correlation normalizes covariance by the SDs.</strong> $\\rho = \\tfrac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} = \\tfrac{6}{2 \\cdot 5} = 0.6$.\n<strong>Rescale $Y \\to 10Y$.</strong> Covariance scales with the units: $\\operatorname{Cov}(X, 10Y) = 10\\operatorname{Cov}(X,Y) = 60$, and $\\sigma_{10Y} = 10\\sigma_Y = 50$. But the correlation is unchanged: $\\rho = \\tfrac{60}{2 \\cdot 50} = 0.6$.\n<strong>Why.</strong> Covariance carries the product of the two variables' units (and inflates if you merely measure in smaller units), so its raw magnitude says little. Dividing by $\\sigma_X\\sigma_Y$ cancels the units, leaving a pure number in $[-1, 1]$ that measures <em>only</em> the strength and sign of the linear relationship.\n<strong>The aha.</strong> Covariance tells you the <em>direction</em> of co-movement; correlation tells you direction <em>and</em> strength on a universal $[-1, 1]$ scale. That scale-invariance is why you compare correlations across datasets but rarely compare raw covariances."
            }
          ]
        },
        {
          "id": "ps-conditional-expectation",
          "title": "Conditional Expectation & the Tower Property",
          "minutes": 15,
          "content": "<h3>1. The best guess given partial information</h3>\n<p>You know a person's height; what's your best guess of their weight? You've seen the first half of a sentence; what word comes next? These are questions about <strong>conditional expectation</strong> — the mean of one variable once you've conditioned on what you know about another. It is the single most important object in prediction: regression, forecasting, and the value functions of reinforcement learning are all conditional expectations.</p>\n\n<h3>2. Conditional expectation given a value</h3>\n<p>Fix $Y=y$. The <strong>conditional expectation of $X$ given $Y=y$</strong> is just the mean computed under the conditional distribution:\n$$\\mathbb{E}[X\\mid Y=y] = \\sum_{x} x\\,p_{X\\mid Y}(x\\mid y) \\quad\\text{(discrete)}, \\qquad \\mathbb{E}[X\\mid Y=y]=\\int x\\,f_{X\\mid Y}(x\\mid y)\\,dx \\quad\\text{(continuous)}.$$\nFor each fixed $y$ this returns a number — the average value of $X$ among the cases where $Y=y$.</p>\n\n<h3>3. Conditional expectation as a random variable</h3>\n<p>Now let $y$ vary. The map $y \\mapsto \\mathbb{E}[X\\mid Y=y]$ defines a function of $Y$, written $\\mathbb{E}[X\\mid Y]$. Because $Y$ is random, <strong>$\\mathbb{E}[X\\mid Y]$ is itself a random variable</strong> — a function of $Y$ that, before you observe $Y$, has its own distribution, mean, and variance. This shift from \"a number for each $y$\" to \"a random variable\" is the conceptual leap of the topic, and it is what makes the next two laws possible.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of $\\mathbb{E}[X\\mid Y]$ as the \"best forecast\" of $X$ built from $Y$: a machine that, fed a value of $Y$, outputs the average $X$ for that group. Until you feed it a particular $Y$, the forecast it will emit is itself uncertain.</p>\n</div>\n\n<h3>4. The law of total expectation (the tower property)</h3>\n<p>Averaging the conditional forecast over all values of $Y$ recovers the plain mean of $X$:\n$$\\mathbb{E}\\big[\\,\\mathbb{E}[X\\mid Y]\\,\\big] = \\mathbb{E}[X].$$\nThis <strong>tower property</strong> (or law of total expectation) is a divide-and-conquer engine: to find $\\mathbb{E}[X]$, split the world by the value of $Y$, average $X$ within each slice, then average those slice-means weighted by how likely each slice is:\n$$\\mathbb{E}[X] = \\sum_{y} \\mathbb{E}[X\\mid Y=y]\\,p_Y(y).$$\nIt is the expectation analogue of the law of total probability, and it turns many fearsome direct sums into a short, structured calculation.</p>\n\n<h3>5. The law of total variance</h3>\n<p>Variance decomposes too, into \"within-group\" and \"between-group\" pieces:\n$$\\operatorname{Var}(X) = \\underbrace{\\mathbb{E}\\big[\\operatorname{Var}(X\\mid Y)\\big]}_{\\text{within-group, unexplained}} + \\underbrace{\\operatorname{Var}\\big(\\mathbb{E}[X\\mid Y]\\big)}_{\\text{between-group, explained}}.$$\nThe first term is the average spread of $X$ <em>inside</em> each $Y$-slice; the second is the spread of the slice-<em>means</em>. This is exactly the decomposition behind the \"explained vs. unexplained variance\" of regression and ANOVA: knowing $Y$ removes the between-group part, leaving only the within-group noise.</p>\n\n<h3>6. Worked example: a random number of terms</h3>\n<p>A hen lays $N\\sim\\text{Poisson}(\\lambda)$ eggs; each egg hatches independently with probability $p$. Let $X$ be the number that hatch. Directly summing is messy — but condition on $N$. Given $N=n$, $X\\sim\\text{Binomial}(n,p)$, so $\\mathbb{E}[X\\mid N]=Np$. By the tower property,\n$$\\mathbb{E}[X] = \\mathbb{E}\\big[\\mathbb{E}[X\\mid N]\\big] = \\mathbb{E}[Np] = p\\,\\mathbb{E}[N] = p\\lambda.$$\nThree lines replace a daunting double sum — the signature payoff of conditioning.</p>\n\n<h3>7. Why this matters for machine learning</h3>\n<p>The function $f(x)=\\mathbb{E}[Y\\mid X=x]$ is called the <strong>regression function</strong>, and it is provably the predictor that minimizes mean-squared error — so every regression model is an attempt to approximate a conditional expectation. In reinforcement learning, the <strong>value function</strong> $V(s)=\\mathbb{E}[\\text{return}\\mid \\text{state}=s]$ is a conditional expectation, and Bellman equations are tower-property identities. Conditioning to simplify an expectation is one of the most reused tricks in all of applied probability.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: conditional expectation is the best possible predictor — which is exactly what regression learns</summary>\n<p>For each value $x$, $\\mathbb{E}[Y \\mid X = x]$ is a number — the average of $Y$ among all cases where $X = x$. Letting $x$ vary makes it a function of $X$, written $\\mathbb{E}[Y \\mid X]$ (itself a random variable). The deep fact: among <em>all</em> functions $g(X)$, the one that minimizes the mean squared error $\\mathbb{E}\\big[(Y - g(X))^2\\big]$ is precisely $g(X) = \\mathbb{E}[Y \\mid X]$. Conditional expectation is the <strong>best predictor</strong> of $Y$ from $X$ under squared loss.</p>\n<p>That is the whole game of regression. A regression model is an attempt to approximate the <em>regression function</em> $x \\mapsto \\mathbb{E}[Y \\mid X = x]$: linear regression restricts $g$ to straight lines, a neural network lets $g$ be flexible, but both are chasing the same target — the conditional mean. So when you ask \"what does a trained regressor actually learn?\", the honest answer is $\\mathbb{E}[Y \\mid X]$.</p>\n<p>Two identities make it operational. The <strong>tower property</strong> (law of total expectation), $\\mathbb{E}\\big[\\mathbb{E}[Y \\mid X]\\big] = \\mathbb{E}[Y]$: average the within-group averages and you recover the overall average — the trick behind computing $\\mathbb{E}[Y]$ by conditioning on a convenient $X$. And the <strong>law of total variance</strong>, $\\operatorname{Var}(Y) = \\mathbb{E}\\big[\\operatorname{Var}(Y \\mid X)\\big] + \\operatorname{Var}\\big(\\mathbb{E}[Y \\mid X]\\big)$ — \"unexplained (within-group) variance + explained (between-group) variance.\" That second identity is exactly the ANOVA / explained-variance decomposition, and it is why a predictor $X$ that carries real information shrinks the residual variance of $Y$.</p>\n</details>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-conditional-expectation\"></div>\n<h4>Try it in code</h4>\n<p>The law of total expectation (the tower rule) says the overall mean is a probability-weighted blend of conditional means: <code>E[X] = sum of E[X | group] · P(group)</code>. Run it for two groups:</p>\n<div data-code=\"javascript\" data-expected=\"14.00\">// Law of total expectation: E[X] = sum over groups of E[X | group] * P(group).\nfunction totalExpectation(groups) {\n  var ex = 0;\n  for (var i = 0; i &lt; groups.length; i++) ex += groups[i].condMean * groups[i].prob;\n  return ex;\n}\nvar groups = [{ condMean: 10, prob: 0.6 }, { condMean: 20, prob: 0.4 }];\nconsole.log(totalExpectation(groups).toFixed(2));   // 14.00 -- a weighted blend of the group means</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the orthogonality principle (why it is the best predictor)</summary>\n<p>The first dive said $E[X\\mid Y]$ is the best predictor of $X$ from $Y$. <em>Why</em> is it best — and what makes its error so special? Because conditional expectation is a <b>projection</b>, and projections leave an orthogonal residual.</p>\n<p><b>Best = projection.</b> Among <em>all</em> functions $g(Y)$, the one minimizing the mean-squared error $E[(X - g(Y))^2]$ is $g(Y) = E[X\\mid Y]$. Geometrically, picture random variables as vectors and \"functions of $Y$\" as a subspace; $E[X\\mid Y]$ is the <em>orthogonal projection</em> of $X$ onto that subspace — the closest point, exactly like dropping a perpendicular.</p>\n<p><b>The orthogonality principle.</b> Projection means the residual $\\varepsilon = X - E[X\\mid Y]$ is <em>orthogonal</em> to the subspace: $E[\\varepsilon\\, h(Y)] = 0$ for <em>every</em> function $h(Y)$. In words, the prediction error is <em>uncorrelated with anything you could compute from $Y$</em> — if it were not, you could use that leftover correlation to predict better, contradicting \"best.\" This single fact is the engine behind least squares (residuals orthogonal to the regressors), the Kalman filter, and the Gauss–Markov theorem.</p>\n<p>The \"aha\": \"best predictor\" is not a vague superlative — $E[X\\mid Y]$ is the literal orthogonal projection of $X$ onto the functions of $Y$, and its defining signature is an error uncorrelated with everything known. Prediction is geometry: drop a perpendicular, and what is left points nowhere you can see.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the tower property (law of total expectation)</summary>\n<p>One identity makes conditional expectation a workhorse for actually <em>computing</em> things: the <strong>law of total expectation</strong> (the \"tower property\").</p>\n<p><b>The identity.</b> $$\\mathbb{E}\\big[\\,\\mathbb{E}[Y \\mid X]\\,\\big] = \\mathbb{E}[Y].$$ Averaging the conditional averages recovers the overall average. To find the mean of $Y$, split the world by $X$, find the mean of $Y$ within each slice, then average those slice-means weighted by how likely each slice is — the continuous analogue of \"total probability.\"</p>\n<p><b>Why it is so useful.</b> It turns a hard expectation into easy conditional pieces: <em>condition on whatever makes the problem simple, then average back</em>. (Expected number of coin flips to get the first heads? Condition on the first flip.) It also underlies the <strong>law of total variance</strong>, $\\text{Var}(Y)=\\mathbb{E}[\\text{Var}(Y\\mid X)]+\\text{Var}(\\mathbb{E}[Y\\mid X])$ — the \"explained vs unexplained variance\" split at the heart of the bias-variance decomposition and ANOVA.</p>\n<p><b>A subtlety.</b> Here $\\mathbb{E}[Y\\mid X]$ is itself a <em>random variable</em> (a function of $X$); taking its expectation over $X$ is what collapses it back to the constant $\\mathbb{E}[Y]$.</p>\n<p>The \"aha\": the tower property, $\\mathbb{E}[\\mathbb{E}[Y\\mid X]]=\\mathbb{E}[Y]$, is the divide-and-conquer tool of probability — condition on something convenient, compute the easy conditional expectations, then average them back. Its variance cousin splits total variance into explained plus unexplained, the backbone of bias-variance and ANOVA.</p>\n</details>\n",
          "mcq": [
            {
              "q": "For a fixed value $y$, the quantity $\\mathbb{E}[X\\mid Y=y]$ is best described as:",
              "choices": [
                "A random variable that depends on $Y$",
                "A function of $X$ only",
                "A probability between 0 and 1",
                "A single number (the mean of $X$ over cases where $Y=y$)"
              ],
              "answer": 3,
              "explain": "Once $y$ is fixed, $\\mathbb{E}[X\\mid Y=y]$ is the ordinary mean of $X$ under the conditional distribution $p_{X\\mid Y}(\\cdot\\mid y)$, so it is just a number. It only becomes a random variable when you let $y$ vary and write $\\mathbb{E}[X\\mid Y]$."
            },
            {
              "q": "Why is $\\mathbb{E}[X\\mid Y]$ (with $Y$ left unspecified) considered a random variable?",
              "choices": [
                "Because it is the function $y\\mapsto\\mathbb{E}[X\\mid Y=y]$ evaluated at the random input $Y$",
                "Because conditional probabilities are always random",
                "Because $X$ is random and we have not averaged over it",
                "Because it equals $\\mathbb{E}[X]$ plus random noise"
              ],
              "answer": 0,
              "explain": "$\\mathbb{E}[X\\mid Y]$ is the deterministic function $g(y)=\\mathbb{E}[X\\mid Y=y]$ composed with the random variable $Y$, i.e. $g(Y)$. A function of a random variable is itself random, which is why it has its own distribution and variance."
            },
            {
              "q": "Roll a fair die; let $Y$ be the outcome and $X=1$ if $Y$ is even and $X=0$ otherwise. What is $\\mathbb{E}[X\\mid Y=4]$?",
              "choices": [
                "$\\tfrac{1}{6}$",
                "$\\tfrac{1}{2}$",
                "$1$",
                "$0$"
              ],
              "answer": 2,
              "explain": "Given $Y=4$, the value of $X$ is determined: $4$ is even so $X=1$ with certainty, giving $\\mathbb{E}[X\\mid Y=4]=1$. The distractor $\\tfrac12$ confuses the conditional value with the unconditional mean $\\mathbb{E}[X]=\\tfrac12$."
            },
            {
              "q": "Suppose $X$ and $Y$ are independent. What is $\\mathbb{E}[X\\mid Y]$?",
              "choices": [
                "$0$",
                "$Y$",
                "The constant $\\mathbb{E}[X]$",
                "$X$"
              ],
              "answer": 2,
              "explain": "Independence means the conditional distribution of $X$ given any $Y=y$ equals its marginal, so $\\mathbb{E}[X\\mid Y=y]=\\mathbb{E}[X]$ for every $y$. The map is constant in $y$, hence $\\mathbb{E}[X\\mid Y]=\\mathbb{E}[X]$ — a (degenerate) random variable that never varies."
            },
            {
              "q": "You collect data on people; $X$ is weight and $Y$ is height. A friend says 'the best single-number guess of $X$ given that height is $y$ is $\\mathbb{E}[X\\mid Y=y]$.' In what sense is this 'best'?",
              "choices": [
                "It maximizes the probability of being exactly correct",
                "It minimizes the expected squared error among all guesses based on $Y=y$",
                "It is the value of $X$ that occurs most often when $Y=y$",
                "It is the median of $X$ given $Y=y$"
              ],
              "answer": 1,
              "explain": "The conditional mean is the minimizer of mean squared error: among all functions $g(Y)$, $\\mathbb{E}[X\\mid Y]$ minimizes $\\mathbb{E}[(X-g(Y))^2]$. The mode (most common value) and median answer different optimization problems."
            },
            {
              "q": "A bag has two coins: a fair coin ($p=0.5$) and a biased coin ($p=0.9$), picked at random. Let $Y$ identify which coin, and $X$ the indicator of heads on one flip. Compute $\\mathbb{E}[X\\mid Y=\\text{biased}]$.",
              "choices": [
                "$0.9$",
                "$0.7$",
                "$0.5$",
                "$0.45$"
              ],
              "answer": 0,
              "explain": "Conditioning on the biased coin fixes the success probability at $0.9$, so $\\mathbb{E}[X\\mid Y=\\text{biased}]=0.9$. The value $0.7$ is the overall average $\\tfrac12(0.5)+\\tfrac12(0.9)$, which answers a different (unconditional) question."
            },
            {
              "q": "Which statement about the function $g(y)=\\mathbb{E}[X\\mid Y=y]$ is correct?",
              "choices": [
                "It is a deterministic (non-random) function of $y$",
                "It must be a linear function of $y$",
                "It always equals $\\mathbb{E}[X]$",
                "It must take values in $[0,1]$"
              ],
              "answer": 0,
              "explain": "For each fixed $y$, $g(y)$ is computed from the conditional distribution and yields a fixed number, so $g$ is an ordinary deterministic function. It need not be linear, need not equal the marginal mean, and (unless $X$ is an indicator) need not lie in $[0,1]$."
            },
            {
              "q": "In a regression problem we model $\\hat{X}=f(Y)$. Connecting this to conditional expectation, the ideal target that $f$ tries to recover is:",
              "choices": [
                "The conditional variance $\\mathrm{Var}(X\\mid Y)$",
                "The joint density $f_{X,Y}(x,y)$",
                "The marginal mean $\\mathbb{E}[X]$",
                "The conditional expectation $\\mathbb{E}[X\\mid Y]$"
              ],
              "answer": 3,
              "explain": "Regression seeks the function of the inputs that best predicts the response in squared-error sense, and that optimal function is exactly $\\mathbb{E}[X\\mid Y]$ — which is why the lesson calls conditional expectation the central object of prediction. The conditional variance describes residual spread, not the prediction itself."
            },
            {
              "q": "Let $X$ be continuous with conditional density $f_{X\\mid Y}(x\\mid y)$. The correct formula for $\\mathbb{E}[X\\mid Y=y]$ is:",
              "choices": [
                "$\\int f_{X\\mid Y}(x\\mid y)\\,dx$",
                "$\\sum_y y\\,f_{X\\mid Y}(x\\mid y)$",
                "$\\int x\\,f_{X\\mid Y}(x\\mid y)\\,dx$",
                "$\\int x\\,f_{X,Y}(x,y)\\,dx$"
              ],
              "answer": 2,
              "explain": "The conditional mean integrates $x$ against the conditional density in $x$: $\\int x\\,f_{X\\mid Y}(x\\mid y)\\,dx$. Integrating the density alone gives $1$, and using the joint density $f_{X,Y}$ instead of the conditional one omits the normalizing factor $1/f_Y(y)$."
            },
            {
              "q": "A student claims: 'Since $\\mathbb{E}[X\\mid Y]$ has a distribution, it must have a larger variance than $X$ itself.' What is the right response?",
              "choices": [
                "Wrong — $\\mathbb{E}[X\\mid Y]$ is a smoothed/averaged version of $X$ and typically has variance no larger than $X$",
                "Correct — conditioning always adds variability",
                "Correct — it is a function of two random variables",
                "Wrong — $\\mathbb{E}[X\\mid Y]$ is never random, so its variance is zero"
              ],
              "answer": 0,
              "explain": "$\\mathbb{E}[X\\mid Y]$ replaces $X$ by an average within each $Y$-slice, removing within-slice variability; its variance is at most $\\mathrm{Var}(X)$ (equal only in special cases). It is random in general, so its variance is not automatically zero."
            },
            {
              "q": "Suppose $Y\\in\\{1,2\\}$ each with probability $\\tfrac12$, with $\\mathbb{E}[X\\mid Y=1]=4$ and $\\mathbb{E}[X\\mid Y=2]=10$. As a random variable, $\\mathbb{E}[X\\mid Y]$ takes which values with which probabilities?",
              "choices": [
                "Always $7$",
                "$4$ with prob $\\tfrac12$ and $10$ with prob $\\tfrac12$",
                "$4$ with prob $\\tfrac{1}{4}$ and $10$ with prob $\\tfrac{3}{4}$",
                "$1$ with prob $\\tfrac12$ and $2$ with prob $\\tfrac12$"
              ],
              "answer": 1,
              "explain": "$\\mathbb{E}[X\\mid Y]=g(Y)$ where $g(1)=4,\\,g(2)=10$, so it inherits $Y$'s distribution over those outputs: $4$ and $10$ each with probability $\\tfrac12$. The constant $7$ is its mean, not its distribution, and the last option lists $Y$'s values rather than $g(Y)$'s."
            },
            {
              "q": "If $X$ is a deterministic function of $Y$, say $X=h(Y)$, then $\\mathbb{E}[X\\mid Y]$ equals:",
              "choices": [
                "$\\mathbb{E}[X]$",
                "A constant independent of $Y$",
                "$0$",
                "$h(Y)=X$ itself"
              ],
              "answer": 3,
              "explain": "Once $Y$ is known, $X=h(Y)$ is fully determined, so its conditional mean is just $h(Y)$, i.e. $X$ itself. Replacing it with the constant $\\mathbb{E}[X]$ would wrongly discard the information that $Y$ pins $X$ down exactly."
            },
            {
              "answer": 1,
              "q": "The law of total expectation (tower property) states $\\mathbb{E}\\big[\\mathbb{E}[X\\mid Y]\\big]=\\mathbb{E}[X]$. What does it let you do?",
              "choices": [
                "Conclude that $\\mathbb{E}[X\\mid Y]$ always equals $\\mathbb{E}[X]$ for every $Y$.",
                "Compute $\\mathbb{E}[X]$ by divide-and-conquer: average $X$ within each $Y$-slice, then average those slice-means weighted by $p_Y(y)$ — $\\mathbb{E}[X]=\\sum_y \\mathbb{E}[X\\mid Y=y]\\,p_Y(y)$.",
                "Replace $\\mathbb{E}[X]$ with $\\operatorname{Var}(X)$ whenever $Y$ is unknown.",
                "Compute $\\mathbb{E}[X\\mid Y]$ without knowing the conditional distribution."
              ],
              "explain": "Taking the expectation of the conditional forecast over all values of $Y$ recovers the unconditional mean. Operationally it is a divide-and-conquer engine: split by $Y$, average within each slice, then re-average weighted by how likely each slice is. (Choice A confuses this with independence, where $\\mathbb{E}[X\\mid Y]=\\mathbb{E}[X]$.)"
            },
            {
              "answer": 3,
              "q": "The law of total variance decomposes $\\operatorname{Var}(X) = \\mathbb{E}\\big[\\operatorname{Var}(X\\mid Y)\\big] + \\operatorname{Var}\\big(\\mathbb{E}[X\\mid Y]\\big)$. What do the two terms represent?",
              "choices": [
                "Both terms are always equal, so each is half the variance.",
                "The first is the between-group variance; the second is the within-group variance.",
                "The first is the mean of $X$; the second is the mean of $Y$.",
                "The first, $\\mathbb{E}[\\operatorname{Var}(X\\mid Y)]$, is the average spread *within* each $Y$-slice (unexplained); the second, $\\operatorname{Var}(\\mathbb{E}[X\\mid Y])$, is the spread *between* the slice-means (explained by $Y$)."
              ],
              "explain": "Total variance splits into within-group and between-group pieces: $\\mathbb{E}[\\operatorname{Var}(X\\mid Y)]$ averages the spread inside each $Y$-slice (the part $Y$ can't explain), and $\\operatorname{Var}(\\mathbb{E}[X\\mid Y])$ measures how much the slice-means vary (the part $Y$ does explain). This is the \"explained vs. unexplained variance\" of regression and ANOVA. (Choice B swaps the two.)"
            },
            {
              "answer": 2,
              "q": "A hen lays $N\\sim\\text{Poisson}(\\lambda)$ eggs; each hatches independently with probability $p$. Let $X$ be the number that hatch. Using the tower property, what is $\\mathbb{E}[X]$?",
              "choices": [
                "$p$, the hatch probability.",
                "$\\lambda$, the mean number of eggs, ignoring hatching.",
                "$p\\lambda$, since $\\mathbb{E}[X\\mid N]=Np$ (the Binomial mean) and $\\mathbb{E}[X]=\\mathbb{E}[Np]=p\\,\\mathbb{E}[N]=p\\lambda$.",
                "$\\lambda^p$, combining the two parameters."
              ],
              "explain": "Condition on $N$: given $N=n$, $X\\sim\\text{Bin}(n,p)$ so $\\mathbb{E}[X\\mid N]=Np$. The tower property gives $\\mathbb{E}[X]=\\mathbb{E}[\\mathbb{E}[X\\mid N]]=\\mathbb{E}[Np]=p\\,\\mathbb{E}[N]=p\\lambda$. Conditioning turns a daunting double sum into three lines."
            },
            {
              "answer": 1,
              "q": "Which of the following are conditional expectations?",
              "choices": [
                "Neither — they are variances, not expectations.",
                "Both the regression function $f(x)=\\mathbb{E}[Y\\mid X=x]$ (the MSE-optimal predictor) AND the RL value function $V(s)=\\mathbb{E}[\\text{return}\\mid \\text{state}=s]$.",
                "Only the regression function $f(x)=\\mathbb{E}[Y\\mid X=x]$; an RL value function is unrelated.",
                "Only the RL value function; regression is a deterministic fit with no expectation."
              ],
              "explain": "Both are conditional expectations. The regression function $\\mathbb{E}[Y\\mid X=x]$ is provably the predictor minimizing mean-squared error, and the value function $V(s)=\\mathbb{E}[\\text{return}\\mid s]$ is the expected return given the state (Bellman equations are tower-property identities). Conditional expectation is the shared backbone of prediction across ML."
            }
          ],
          "flashcards": [
            {
              "front": "What is $\\mathbb{E}[X\\mid Y=y]$?",
              "back": "The mean of $X$ computed under the conditional distribution given $Y=y$: $\\mathbb{E}[X\\mid Y=y]=\\sum_x x\\,p_{X\\mid Y}(x\\mid y)$ (or the integral version). For each fixed $y$ it is a number."
            },
            {
              "front": "Why is $\\mathbb{E}[X\\mid Y]$ (no fixed value) a random variable?",
              "back": "It is the function $y\\mapsto\\mathbb{E}[X\\mid Y=y]$ evaluated at the random $Y$. Since $Y$ is random, this function of $Y$ is itself random, with its own distribution, mean, and variance."
            },
            {
              "front": "State the law of total expectation (tower property).",
              "back": "$\\mathbb{E}[\\mathbb{E}[X\\mid Y]]=\\mathbb{E}[X]$, i.e. $\\mathbb{E}[X]=\\sum_y \\mathbb{E}[X\\mid Y=y]\\,p_Y(y)$. Average $X$ within each slice of $Y$, then average the slice-means."
            },
            {
              "front": "State the law of total variance and name its two parts.",
              "back": "$\\operatorname{Var}(X)=\\mathbb{E}[\\operatorname{Var}(X\\mid Y)]+\\operatorname{Var}(\\mathbb{E}[X\\mid Y])$ — the within-group (\"unexplained\") variance plus the between-group (\"explained\") variance of the conditional means."
            },
            {
              "front": "What conditional expectation is the optimal least-squares predictor of $Y$ from $X$?",
              "back": "The regression function $f(x)=\\mathbb{E}[Y\\mid X=x]$ minimizes the mean-squared error $\\mathbb{E}[(Y-g(X))^2]$ over all functions $g$. Regression models approximate this conditional expectation."
            },
            {
              "front": "How does conditioning simplify $\\mathbb{E}[X]$ when $X$ depends on a random count $N$?",
              "back": "Condition on $N$: find $\\mathbb{E}[X\\mid N]$ (often easy, e.g. a Binomial mean $Np$), then apply the tower property $\\mathbb{E}[X]=\\mathbb{E}[\\mathbb{E}[X\\mid N]]$ to average over $N$."
            }
          ],
          "homework": [
            {
              "prompt": "A fair die is rolled. If it shows $k$, you then flip $k$ fair coins. Let $X$ be the number of heads. Find $\\mathbb{E}[X]$ using the tower property.",
              "hint": "Condition on the die value $N$. Given $N=k$, $X\\sim\\text{Binomial}(k,\\tfrac12)$, so $\\mathbb{E}[X\\mid N]=N/2$.",
              "solution": "$\\mathbb{E}[X]=\\mathbb{E}[\\mathbb{E}[X\\mid N]]=\\mathbb{E}[N/2]=\\tfrac12\\mathbb{E}[N]$. For a fair die $\\mathbb{E}[N]=3.5$, so $\\mathbb{E}[X]=3.5/2=1.75$ heads."
            },
            {
              "prompt": "The number of customers $N$ in an hour is $\\text{Poisson}(\\lambda=20)$, and each independently spends a mean of $\\$8$ with variance $9$. Let $T$ be total spend. Find $\\mathbb{E}[T]$ and $\\operatorname{Var}(T)$.",
              "hint": "This is a compound (random-sum) model. Given $N=n$, $T$ is a sum of $n$ i.i.d. spends. Use $\\mathbb{E}[T\\mid N]=N\\mu$ and the law of total variance; for Poisson, $\\mathbb{E}[N]=\\operatorname{Var}(N)=\\lambda$.",
              "solution": "Let $\\mu=8,\\ \\sigma^2=9$. Mean: $\\mathbb{E}[T]=\\mathbb{E}[N]\\mu=20\\cdot 8=\\$160$. Variance (compound Poisson): $\\operatorname{Var}(T)=\\mathbb{E}[N]\\sigma^2+\\operatorname{Var}(N)\\mu^2$ via total variance $=20\\cdot 9 + 20\\cdot 64 = 180+1280=1460$. (Equivalently, for compound Poisson, $\\operatorname{Var}(T)=\\lambda\\,\\mathbb{E}[\\text{spend}^2]=20(9+64)=1460$.)"
            },
            {
              "prompt": "Using the law of total variance, verify the within/between split for the die-then-coins setup of problem 1 is consistent, by computing both $\\mathbb{E}[\\operatorname{Var}(X\\mid N)]$ and $\\operatorname{Var}(\\mathbb{E}[X\\mid N])$.",
              "hint": "Given $N=k$, $\\operatorname{Var}(X\\mid N)=k\\cdot\\tfrac12\\cdot\\tfrac12=N/4$, and $\\mathbb{E}[X\\mid N]=N/2$. Use $\\operatorname{Var}(N)=35/12$ for a fair die.",
              "solution": "Within: $\\mathbb{E}[\\operatorname{Var}(X\\mid N)]=\\mathbb{E}[N/4]=\\tfrac14(3.5)=0.875$. Between: $\\operatorname{Var}(\\mathbb{E}[X\\mid N])=\\operatorname{Var}(N/2)=\\tfrac14\\operatorname{Var}(N)=\\tfrac14\\cdot\\tfrac{35}{12}=\\tfrac{35}{48}\\approx 0.729$. Total $\\operatorname{Var}(X)\\approx 0.875+0.729=1.604$. Both pieces are nonnegative and sum to the variance, as the law guarantees."
            }
          ],
          "examples": [
            {
              "title": "The tower property turns a hard mean into an easy one",
              "body": "Insurance claims arrive at a random count $N\\sim\\text{Poisson}(\\lambda=50)$ per month, and each claim's size is, on average, $\\$2000$, independent of $N$ and of the others. What is the expected total monthly payout?",
              "solution": "Let $X_i$ be the $i$-th claim size with $\\mathbb{E}[X_i]=2000$, and total $T=\\sum_{i=1}^{N} X_i$. Condition on $N$: given $N=n$, $\\mathbb{E}[T\\mid N=n]=n\\cdot 2000$, so as a random variable $\\mathbb{E}[T\\mid N]=2000\\,N$. By the tower property,\n$$\\mathbb{E}[T]=\\mathbb{E}\\big[\\mathbb{E}[T\\mid N]\\big]=\\mathbb{E}[2000\\,N]=2000\\,\\mathbb{E}[N]=2000\\cdot 50=\\$100{,}000.$$\nNo need to grapple with the distribution of a sum of a random number of terms — conditioning on $N$ collapses it to a one-line product."
            },
            {
              "title": "Decomposing variance into explained and unexplained parts",
              "body": "Students come from two equally likely schools. School A's exam scores are $N(70,\\,5^2)$; school B's are $N(80,\\,5^2)$. Pick a random student. Use the law of total variance to find the overall variance of the score, and interpret the two pieces.",
              "solution": "Let $Y\\in\\{A,B\\}$ with $p=\\tfrac12$ each. Within-group: each school has variance $25$, so $\\mathbb{E}[\\operatorname{Var}(\\text{score}\\mid Y)]=25$. Between-group: the conditional means are $70$ and $80$, each with probability $\\tfrac12$, so their mean is $75$ and $\\operatorname{Var}(\\mathbb{E}[\\text{score}\\mid Y])=\\tfrac12(70-75)^2+\\tfrac12(80-75)^2=\\tfrac12(25)+\\tfrac12(25)=25$. Total variance $=25+25=50$. Interpretation: half the variability is noise <em>within</em> schools (unexplained by school), half is the gap <em>between</em> school averages (explained by knowing the school). Knowing $Y$ would cut the variance from $50$ to $25$."
            },
            {
              "title": "Computing E[X | Y] from a joint table",
              "body": "From the joint $P(X,Y)$ over $X, Y \\in \\{0,1\\}$ given by $\\begin{bmatrix} 0.1 & 0.2 \\\\ 0.3 & 0.4 \\end{bmatrix}$ (rows $= X$, columns $= Y$), find $\\mathbb{E}[X \\mid Y = 0]$.",
              "solution": "<strong>Restrict to the column $Y = 0$.</strong> The relevant cells are $P(X=0, Y=0) = 0.1$ and $P(X=1, Y=0) = 0.3$; their sum is the marginal $P(Y=0) = 0.4$.\n<strong>Normalize to a conditional distribution.</strong> $P(X=0 \\mid Y=0) = \\tfrac{0.1}{0.4} = 0.25$ and $P(X=1 \\mid Y=0) = \\tfrac{0.3}{0.4} = 0.75$. They sum to 1 — conditioning rescales a slice of the joint into its own distribution.\n<strong>Take the expectation.</strong> $\\mathbb{E}[X \\mid Y=0] = 0(0.25) + 1(0.75) = 0.75$. Knowing $Y=0$ nudges the best guess of $X$ from its marginal mean $\\mathbb{E}[X] = 0.7$ up to $0.75$ — that shift is exactly the information $Y$ carries about $X$.\n<strong>The aha.</strong> A conditional expectation is \"slice, renormalize, average\": fix the conditioning event, turn that slice of the joint into a probability distribution, and take its mean. $\\mathbb{E}[X \\mid Y]$ is itself a random variable (a function of $Y$), and averaging it back over $Y$ recovers $\\mathbb{E}[X]$ — the tower property."
            }
          ]
        }
      ]
    },
    {
      "id": "ps-inference",
      "title": "Statistical Inference: Estimation & Confidence",
      "lessons": [
        {
          "id": "ps-law-of-large-numbers",
          "title": "The Law of Large Numbers",
          "minutes": 15,
          "content": "<h3>1. The hook: why averages settle down</h3>\n<p>Flip a fair coin ten times and you might see 7 heads — a wild 70%. Flip it ten thousand times and the proportion will sit stubbornly near 50%. The jitter never disappears, but its <em>relative</em> size shrinks. This is the <strong>Law of Large Numbers (LLN)</strong>: as you collect more independent observations, their average converges to the true expected value. It is the bedrock that licenses the entire move from <em>data</em> to <em>conclusions</em> — without it, a sample average would tell you nothing about the population.</p>\n\n<h3>2. The sample mean</h3>\n<p>Let $X_1, X_2, \\dots, X_n$ be independent and identically distributed (i.i.d.) random variables, each with mean $\\mathbb{E}[X_i]=\\mu$ and finite variance $\\sigma^2$. Their <strong>sample mean</strong> is\n$$\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^{n} X_i.$$\nThe sample mean is itself a random variable — a different draw of data gives a different $\\bar{X}_n$. The LLN describes what happens to it as $n$ grows.</p>\n\n<h3>3. The Weak Law of Large Numbers</h3>\n<p>The <strong>Weak LLN</strong> says the sample mean converges <em>in probability</em> to $\\mu$: for any tolerance $\\varepsilon>0$,\n$$P\\big(|\\bar{X}_n - \\mu| > \\varepsilon\\big) \\longrightarrow 0 \\quad\\text{as } n\\to\\infty.$$\nIn words: the chance that the sample mean misses $\\mu$ by more than any fixed margin you pick goes to zero. The proof is a one-line consequence of <strong>Chebyshev's inequality</strong> plus the key fact that the variance of the sample mean shrinks: since $\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$,\n$$P\\big(|\\bar{X}_n-\\mu|>\\varepsilon\\big) \\le \\frac{\\operatorname{Var}(\\bar{X}_n)}{\\varepsilon^2} = \\frac{\\sigma^2}{n\\varepsilon^2} \\to 0.$$\nThe averaging literally divides the spread by $n$, squeezing the distribution of $\\bar{X}_n$ onto the single point $\\mu$.</p>\n\n<h3>4. What it does NOT say: the gambler's fallacy</h3>\n<p>The LLN is about <em>proportions</em>, not <em>counts</em>, and it makes no promise about \"evening out\" in the short run. After a run of ten heads, the coin has no memory and no obligation to produce extra tails — the next flip is still 50/50. What happens is that early imbalances are <em>diluted</em> by the growing pile of later flips, not <em>cancelled</em> by compensating outcomes. Believing otherwise — that a due outcome becomes more likely — is the <strong>gambler's fallacy</strong>.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>An early surplus of 5 extra heads after 20 flips is a $25\\%$ distortion; the same 5-head surplus after 10,000 flips is a $0.05\\%$ distortion. The surplus didn't vanish — the denominator grew past it.</p>\n</div>\n\n<h3>5. Strong vs. weak (a brief note)</h3>\n<p>The <strong>Strong LLN</strong> states something stronger: $\\bar{X}_n \\to \\mu$ <em>almost surely</em> (with probability 1, the sequence of sample means actually converges along essentially every possible infinite run of data). The Weak Law allows rare, ever-shrinking excursions; the Strong Law rules them out in the limit. For practical purposes both deliver the same promise — collect enough data and the average is trustworthy — so we lean on the Weak Law, whose Chebyshev proof is transparent.</p>\n\n<h3>6. Monte Carlo: turning the LLN into a tool</h3>\n<p>The LLN is not just reassurance; it is a computational engine. To estimate any expectation $\\mathbb{E}[g(X)]$ that is hard to integrate, <strong>simulate</strong>: draw many samples and average $g$ over them. By the LLN, $\\frac{1}{n}\\sum_i g(X_i) \\to \\mathbb{E}[g(X)]$. This is <strong>Monte Carlo estimation</strong> — the way we approximate $\\pi$ by throwing random darts at a square, price complex financial derivatives, and estimate intractable integrals in Bayesian statistics. The error shrinks like $1/\\sqrt{n}$ (a preview of the next lesson).</p>\n<p>See it converge: a handful of fair-die rolls can land far from the true mean of $3.5$, but the average of many settles onto it. Run this and compare the average after 4 rolls versus after 16:</p>\n<div data-code=\"javascript\" data-expected=\"N=4: 1.50, N=16: 3.50\">// The true mean of a fair die is 3.5. Watch the sample mean settle toward it.\nconst rolls = [1, 2, 1, 2, 6, 5, 4, 3, 6, 5, 4, 3, 5, 4, 3, 2];\nfunction mean(k) {              // average of the first k rolls\n  let s = 0;\n  for (let i = 0; i &lt; k; i++) s += rolls[i];\n  return s / k;\n}\n// few rolls: noisy and far off; many rolls: right on the true mean\nconsole.log(\"N=4: \" + mean(4).toFixed(2) + \", N=16: \" + mean(16).toFixed(2));</div>\n\n<h3>7. LLN vs. CLT — two halves of one story</h3>\n<p>It is worth separating two theorems people often blur. The <strong>LLN</strong> tells you <em>where</em> the sample mean goes: to $\\mu$. The <strong>Central Limit Theorem</strong> tells you <em>how it fluctuates on the way</em>: the rescaled error $\\sqrt{n}(\\bar{X}_n-\\mu)$ stays bell-shaped, approaching $N(0,\\sigma^2)$. LLN is the destination; CLT is the shape of the wobble around it. Together they justify both point estimates and the error bars we will put on them.</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>Training minimizes <strong>empirical risk</strong> — the <em>average</em> loss over the training set — as a stand-in for the true expected risk; the LLN is exactly the guarantee that this average approximates the truth as data grows. <strong>Stochastic gradient descent</strong> works because a mini-batch gradient is an unbiased sample-average estimate of the full gradient. And every time we report a model's accuracy on a test set, we are trusting the LLN to make that average meaningful.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-lln\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the LLN says the average converges — the CLT says how fast its wiggles shrink</summary>\n<p>The Law of Large Numbers and the Central Limit Theorem are the two pillars of \"averaging many draws,\" and they answer different questions. The <strong>LLN</strong> says the sample mean $\\bar X_n \\to \\mu$ as $n \\to \\infty$: pile up enough independent draws and their average stabilizes onto the true mean. But it says nothing about <em>how fast</em>, or what the leftover error looks like.</p>\n<p>The <strong>CLT</strong> sharpens it by describing the fluctuations. The error $\\bar X_n - \\mu$ is approximately $\\mathcal{N}\\!\\big(0,\\, \\sigma^2/n\\big)$ — so it shrinks like the <strong>standard error</strong> $\\sigma/\\sqrt{n}$, and its <em>shape</em> is a bell no matter what the original distribution was: $\\sqrt{n}\\,(\\bar X_n - \\mu) \\to \\mathcal{N}(0, \\sigma^2)$. Read together: the LLN names the target you converge to, and the CLT says your aiming error around it is Gaussian of width $\\sigma/\\sqrt{n}$.</p>\n<p>That $\\sqrt{n}$ is the headline number of applied statistics. To halve your error you need <em>four times</em> the data — diminishing returns baked into the universe. It is why Monte Carlo error falls like $1/\\sqrt{\\text{samples}}$, why a poll of $n$ people has a margin around $1/\\sqrt{n}$, and why minibatch gradient noise scales like $1/\\sqrt{\\text{batch size}}$.</p>\n<p>One caveat keeps you honest: both theorems need <strong>finite variance</strong>. Heavy-tailed distributions with infinite variance (the Cauchy is the classic) break the CLT outright — their sample mean never settles down. \"Average of many\" only tames randomness that is itself well-behaved.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the gambler's fallacy — how the average really converges</summary>\n<p>The LLN says the <em>sample mean</em> of independent trials converges to the true mean. It is tempting to read that as \"deviations get corrected\" — but that is the <b>gambler's fallacy</b>, and it is wrong.</p>\n<p><b>Convergence by dilution, not compensation.</b> After a run of, say, 10 heads, the LLN does <em>not</em> push future flips toward tails to \"balance out\" — each flip is independent, still 50/50, with no memory. Instead the early surplus becomes a <em>shrinking fraction</em> of the total as $n$ grows: $\\tfrac{10}{10}$ now, but eventually $\\tfrac{510}{1010} \\approx 0.505$. The average converges because later data <em>swamps</em> the early imbalance, not because anything corrects it. The absolute gap (heads minus tails) can even keep growing; it is the <em>ratio</em> that settles.</p>\n<p><b>Weak vs strong.</b> The <em>weak</em> LLN says the mean is <em>probably</em> close to $\\mu$ for large $n$ (convergence in probability); the <em>strong</em> LLN says it converges to $\\mu$ <em>almost surely</em> (the sequence itself settles). Both are about the long-run average, neither about individual outcomes.</p>\n<p>The \"aha\": \"due for a tails\" misreads the LLN. Independent trials have no memory; the law works by <em>overwhelming</em> early flukes with sheer volume, so the running average drifts to the mean while any single outcome stays as unpredictable as ever.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Monte Carlo — the LLN as a computational tool</summary>\n<p>The LLN is not just a statement about coin flips — it is a <em>computational engine</em>. Whenever a quantity is too hard to calculate exactly, you can <strong>estimate it by averaging random samples</strong>, and the LLN guarantees the estimate converges to the truth. That is <strong>Monte Carlo</strong>.</p>\n<p><b>Any expectation is an average.</b> Want $\\mathbb{E}[f(X)]$ (an integral that may be impossible in closed form)? Draw many samples $x_1,\\dots,x_N$ and compute the sample mean $\\frac{1}{N}\\sum_i f(x_i)$. By the LLN it converges to $\\mathbb{E}[f(X)]$. This <strong>Monte Carlo integration</strong> estimates high-dimensional integrals that grid methods cannot touch — the curse of dimensionality does not bite, because the error shrinks like $1/\\sqrt{N}$ (from the CLT) <em>regardless of dimension</em>.</p>\n<p><b>It is everywhere.</b> Estimating $\\pi$ by throwing darts at a circle; pricing options in finance; <em>Monte Carlo</em> value estimation in RL (averaging returns over sampled episodes); MCMC sampling for Bayesian posteriors; the bootstrap. All cash in the same promise: replace an exact computation with an average over samples.</p>\n<p><b>The cost.</b> That $1/\\sqrt{N}$ rate is <em>slow</em> — to cut the error by 10x you need 100x the samples. So Monte Carlo trades exactness and speed for the ability to tackle problems that have no other solution; variance-reduction tricks (importance sampling, control variates) fight the slow rate.</p>\n<p>The \"aha\": the LLN licenses a universal numerical method — <em>to compute a hard expectation or integral, sample and average</em>. Monte Carlo turns \"the average converges to the mean\" into the workhorse behind simulation, finance, Bayesian inference, and reinforcement learning, with a dimension-independent $1/\\sqrt{N}$ accuracy.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: concentration inequalities — Markov, Chebyshev, Hoeffding</summary>\n<p>The law of large numbers says the sample mean converges; <b>concentration inequalities</b> quantify <em>how fast</em>, in a hierarchy of increasing strength. <b>Markov's inequality</b> is the crudest: for a non-negative variable, $P(X \\ge a) \\le \\mathbb{E}[X]/a$ — using only the mean. Apply it to $(X-\\mu)^2$ and you get <b>Chebyshev's inequality</b>, $P(|X-\\mu| \\ge k\\sigma) \\le 1/k^2$, which adds the variance. Chebyshev is exactly what proves the weak LLN: the sample mean has variance $\\sigma^2/n$, so it concentrates as $n$ grows.</p>\n<p>But Chebyshev's $1/k^2$ tail is loose. For <em>bounded</em> i.i.d. variables in $[a,b]$, <b>Hoeffding's inequality</b> gives an <em>exponential</em> bound: $P(|\\bar{X}-\\mu| \\ge \\epsilon) \\le 2\\,e^{-2n\\epsilon^2/(b-a)^2}$. The probability of a large deviation decays exponentially in the sample size, not polynomially — a dramatically stronger guarantee. Each step up the ladder buys a tighter bound by assuming a little more (a mean, then a variance, then boundedness).</p>\n<p>That exponential tail is the engine behind much of learning theory. It is why honest sample complexity scales like $\\log(1/\\delta)/\\epsilon^2$ rather than $1/\\delta$ (the $\\log$ comes straight from inverting Hoeffding) — the same bound underneath <a href=\"#/lesson/deep-learning/dl-ml-recap-and-the-learning-problem\" data-route>PAC guarantees</a> — and it is precisely the confidence interval that defines the exploration bonus in <a href=\"#/lesson/reinforcement-learning/rl-exploration\" data-route>UCB</a>. Concentration is the bridge from \"averages converge\" to \"and here is exactly how many samples you need.\"</p>\n</details>\n",
          "mcq": [
            {
              "q": "The Weak Law of Large Numbers states that $P(|\\bar{X}_n - \\mu| > \\varepsilon) \\to 0$ as $n\\to\\infty$. What does the $\\varepsilon$ represent?",
              "choices": [
                "The variance of a single observation $X_i$",
                "The shrinking error of the sample mean, which goes to zero as $n$ grows",
                "The probability that the sample mean equals $\\mu$ exactly",
                "A fixed tolerance you choose in advance; the claim holds for every such positive margin"
              ],
              "answer": 3,
              "explain": "$\\varepsilon>0$ is an arbitrary but fixed tolerance held constant as $n\\to\\infty$; the probability of missing $\\mu$ by more than that fixed margin vanishes. Treating $\\varepsilon$ as itself shrinking misreads the statement — it is the probability, not the margin, that goes to zero."
            },
            {
              "q": "For i.i.d. $X_i$ with variance $\\sigma^2$, by what factor does $\\operatorname{Var}(\\bar{X}_n)$ change if you increase the sample size from $n$ to $9n$?",
              "choices": [
                "It is divided by 9",
                "It is divided by 3",
                "It is divided by 81",
                "It stays the same"
              ],
              "answer": 0,
              "explain": "$\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$, so replacing $n$ with $9n$ divides the variance by 9. Dividing by 3 confuses the variance scaling with the standard-error scaling ($\\sigma/\\sqrt{n}$, which would drop by a factor of 3)."
            },
            {
              "q": "A roulette wheel has landed on red 8 times in a row. A gambler reasons that black is now 'due' and bets heavily on black. Which statement correctly diagnoses the error?",
              "choices": [
                "He is right: the LLN forces the long-run proportions to balance, so black must compensate soon",
                "He is wrong only because roulette has a house edge, not because of independence",
                "He is right because the variance of the sample proportion increases after a streak",
                "He commits the gambler's fallacy; each spin is independent, so the next spin is unaffected by the streak"
              ],
              "answer": 3,
              "explain": "The LLN dilutes early imbalances with future data rather than cancelling them, and independent spins have no memory, so the streak does not raise the chance of black. The 'balancing' interpretation is exactly the gambler's fallacy the LLN does not support."
            },
            {
              "q": "You use Chebyshev's inequality to bound $P(|\\bar{X}_{100}-\\mu|>0.2)$ for i.i.d. data with $\\sigma^2=4$. What is the bound?",
              "choices": [
                "$0.04$",
                "$0.20$",
                "$1.00$",
                "$0.50$"
              ],
              "answer": 2,
              "explain": "$\\operatorname{Var}(\\bar{X}_{100})=4/100=0.04$, so the bound is $0.04/0.2^2 = 0.04/0.04 = 1$. Chebyshev gives a vacuous bound of 1 here — a reminder that the bound can be useless for small $n$ even though it still tends to 0 as $n\\to\\infty$."
            },
            {
              "q": "As $n\\to\\infty$, the LLN guarantees the sample mean $\\bar{X}_n$ converges to $\\mu$. What happens to the sum $S_n = \\sum_{i=1}^n X_i$ (assuming $\\mu\\neq 0$)?",
              "choices": [
                "$S_n$ also converges to $\\mu$",
                "$S_n$ converges to $0$",
                "$S_n$ converges to $\\sigma^2$",
                "$S_n$ grows without bound, roughly like $n\\mu$"
              ],
              "answer": 3,
              "explain": "The LLN tames the average, not the sum: since $\\bar{X}_n=S_n/n\\to\\mu$, the sum behaves like $S_n\\approx n\\mu$ and diverges when $\\mu\\neq0$. Only the proportion/average stabilizes — the raw total keeps growing, which is why counts (e.g., a head surplus) need not shrink."
            },
            {
              "q": "Monte Carlo estimation of an integral has a typical error that scales like $1/\\sqrt{n}$. To reduce your error by a factor of 10, how many times more samples do you need?",
              "choices": [
                "100 times",
                "10 times",
                "$\\sqrt{10}\\approx 3.16$ times",
                "1000 times"
              ],
              "answer": 0,
              "explain": "Since error $\\propto 1/\\sqrt{n}$, cutting it tenfold requires $\\sqrt{n}$ to grow tenfold, i.e. $n$ to grow $10^2=100$ times. Answering '10 times' ignores the square root — the hallmark of Monte Carlo's slow convergence."
            },
            {
              "q": "Which condition is part of the standard hypotheses needed for the Chebyshev-based proof of the Weak LLN to apply?",
              "choices": [
                "The $X_i$ must have finite variance $\\sigma^2$",
                "The $X_i$ must be normally distributed",
                "The sample mean must already be close to $\\mu$",
                "The $X_i$ must take only the values 0 and 1"
              ],
              "answer": 0,
              "explain": "The one-line Chebyshev proof uses $\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$, which requires a finite variance. Normality and Bernoulli-valued data are not required — the LLN holds for any i.i.d. sequence with finite variance regardless of distributional shape."
            },
            {
              "q": "What is the key difference between the Strong Law and the Weak Law of Large Numbers?",
              "choices": [
                "The Strong Law requires a larger sample size to take effect",
                "The Strong Law gives almost-sure convergence (the whole sequence converges with probability 1); the Weak Law gives convergence in probability",
                "The Weak Law applies to discrete variables and the Strong Law to continuous ones",
                "The Strong Law converges to $\\mu$ while the Weak Law converges to $\\sigma^2$"
              ],
              "answer": 1,
              "explain": "The Strong Law says $\\bar{X}_n\\to\\mu$ almost surely, ruling out rare excursions in the limit, while the Weak Law only says $P(|\\bar{X}_n-\\mu|>\\varepsilon)\\to0$. Both converge to the same $\\mu$ and both target the average — the distinction is the mode of convergence, not the limit or the data type."
            },
            {
              "q": "A pollster surveys 1,000 people and gets a proportion estimate; a colleague suggests surveying 4,000 to be more accurate. Approximately how much does quadrupling the sample shrink the standard error of the estimate?",
              "choices": [
                "By a factor of 4",
                "Not at all — the spread $\\sigma$ of individual responses is unchanged",
                "By a factor of 16",
                "By a factor of 2"
              ],
              "answer": 3,
              "explain": "Standard error is $\\sigma/\\sqrt{n}$, so multiplying $n$ by 4 multiplies $\\sqrt{n}$ by 2 and halves the standard error. The tempting 'factor of 4' confuses the variance reduction ($1/n$) with the standard-error reduction ($1/\\sqrt{n}$)."
            },
            {
              "q": "In stochastic gradient descent, a mini-batch gradient is used in place of the full-dataset gradient. Which principle justifies this substitution?",
              "choices": [
                "The CLT, because the mini-batch gradient is normally distributed",
                "Chebyshev's inequality, because it guarantees the gradient is exactly correct",
                "The LLN, because the mini-batch gradient is a sample-average estimate of the full gradient that converges to it as batch size grows",
                "The gambler's fallacy, because successive batches compensate for each other"
              ],
              "answer": 2,
              "explain": "A mini-batch averages per-example gradients, making it an unbiased sample-mean estimate of the true expected gradient; the LLN guarantees this average approaches the true gradient as the batch grows. The CLT describes the fluctuation's shape, not why the estimate is valid in the first place."
            },
            {
              "q": "Suppose $X_1, X_2, \\dots$ are i.i.d. with the heavy-tailed Cauchy distribution, which has no finite mean. What does the LLN promise about $\\bar{X}_n$?",
              "choices": [
                "The classical LLN gives no guarantee, since its hypotheses (a finite mean) are not met",
                "$\\bar{X}_n$ converges to 0 because the distribution is symmetric",
                "$\\bar{X}_n$ still converges, but to the median instead of the mean",
                "$\\bar{X}_n$ converges, just more slowly than for finite-variance distributions"
              ],
              "answer": 0,
              "explain": "The LLN requires a well-defined (finite) mean $\\mu$ for the average to converge to; the Cauchy distribution has none, so the theorem does not apply and $\\bar{X}_n$ in fact does not settle down. Symmetry does not rescue convergence — the sample mean of Cauchy draws is itself Cauchy for every $n$."
            },
            {
              "q": "Which statement best captures the complementary roles of the LLN and the CLT for the sample mean $\\bar{X}_n$?",
              "choices": [
                "Both make identical claims, so only one is ever needed",
                "The LLN describes the fluctuation's shape; the CLT says where the mean lands",
                "The LLN says $\\bar{X}_n\\to\\mu$; the CLT describes the shape of the residual fluctuation, with $\\sqrt{n}(\\bar{X}_n-\\mu)$ approaching a normal distribution",
                "The LLN applies for small $n$ and the CLT replaces it once $n$ is large"
              ],
              "answer": 2,
              "explain": "The LLN identifies the destination ($\\mu$), while the CLT characterizes the bell-shaped wobble around it via $\\sqrt{n}(\\bar{X}_n-\\mu)\\to N(0,\\sigma^2)$. They answer different questions — 'where' versus 'how it fluctuates' — and neither is a large-$n$ substitute for the other."
            },
            {
              "answer": 1,
              "q": "The lesson calls the LLN \"a computational engine\" via Monte Carlo estimation. How does Monte Carlo use the LLN?",
              "choices": [
                "It solves the integral $\\mathbb{E}[g(X)]$ exactly by symbolic algebra, with the LLN merely checking the answer.",
                "To estimate a hard-to-compute $\\mathbb{E}[g(X)]$, draw many samples $X_i$ and average: by the LLN, $\\frac1n\\sum_i g(X_i)\\to\\mathbb{E}[g(X)]$.",
                "It requires the population to be normal, then reads $\\mathbb{E}[g(X)]$ off a z-table.",
                "It deterministically enumerates every possible outcome and weights each by its probability."
              ],
              "explain": "Monte Carlo turns the LLN into a tool: an intractable expectation (or an integral written as one) is approximated by sampling and averaging, since the sample average of $g(X)$ converges to $\\mathbb{E}[g(X)]$. It is how we estimate $\\pi$ with random darts, price derivatives, and handle Bayesian integrals — with error shrinking like $1/\\sqrt{n}$."
            },
            {
              "answer": 1,
              "q": "After 10 heads in a row, why does the LLN NOT imply that extra tails become more likely?",
              "choices": [
                "Because after 10 heads, tails really are \"due\" — the LLN guarantees the count evens out.",
                "The LLN governs the *proportion*, which converges to 0.5 because early imbalances are *diluted* by the growing number of later flips — not *cancelled* by compensating outcomes. The coin has no memory; each flip stays 50/50.",
                "Because the LLN only applies to the first 10 flips, after which it stops.",
                "Because the LLN forces the running counts of heads and tails to become equal."
              ],
              "explain": "The LLN is about the *average/proportion*, not the running count. A surplus of, say, 5 extra heads is a 25% distortion after 20 flips but only 0.05% after 10,000 — the surplus is diluted by the swelling denominator, not erased by extra tails. Expecting \"due\" outcomes is the gambler's fallacy."
            },
            {
              "answer": 2,
              "q": "In machine learning, training minimizes the *average* loss over the training set (empirical risk) as a stand-in for the true expected risk. What licenses that substitution?",
              "choices": [
                "The Central Limit Theorem, which makes the loss exactly normal.",
                "Nothing — empirical risk and expected risk are unrelated.",
                "The Law of Large Numbers: as the training set grows, the average loss converges to the expected loss, so minimizing the empirical average approximates minimizing the true risk.",
                "Bias correction, which removes the gap entirely for any sample size."
              ],
              "explain": "Empirical risk is a sample average of the per-example loss; by the LLN it converges to the expected risk as data grows, so minimizing training-set average loss is a sensible proxy for the true objective (and test-set accuracy, also an average, is meaningful). SGD adds that a mini-batch gradient is an unbiased sample-average estimate of the full gradient."
            },
            {
              "answer": 1,
              "q": "In the Chebyshev proof of the Weak Law of Large Numbers, what is the key quantity that drives $P(|\\bar X_n-\\mu|>\\varepsilon)\\to 0$?",
              "choices": [
                "The mean $\\mu$ itself grows with $n$, pushing the probability down.",
                "The variance of the sample mean, $\\operatorname{Var}(\\bar X_n)=\\sigma^2/n$, shrinks to $0$ as $n\\to\\infty$ — Chebyshev then bounds the miss-probability by $\\sigma^2/(n\\varepsilon^2)\\to 0$.",
                "The population variance $\\sigma^2$ shrinks as you collect more data.",
                "The tolerance $\\varepsilon$ automatically shrinks with $n$."
              ],
              "explain": "Averaging divides the spread by $n$: $\\operatorname{Var}(\\bar X_n)=\\sigma^2/n$. Chebyshev gives $P(|\\bar X_n-\\mu|>\\varepsilon)\\le \\operatorname{Var}(\\bar X_n)/\\varepsilon^2 = \\sigma^2/(n\\varepsilon^2)\\to 0$. The population $\\sigma^2$ and the tolerance $\\varepsilon$ are fixed; it is the $1/n$ that does the work."
            }
          ],
          "flashcards": [
            {
              "front": "State the Weak Law of Large Numbers.",
              "back": "For i.i.d. $X_i$ with mean $\\mu$, the sample mean converges in probability to $\\mu$: for any $\\varepsilon>0$, $P(|\\bar{X}_n-\\mu|>\\varepsilon)\\to 0$ as $n\\to\\infty$."
            },
            {
              "front": "How does Chebyshev's inequality prove the Weak LLN in one line?",
              "back": "$\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$, so $P(|\\bar{X}_n-\\mu|>\\varepsilon)\\le \\dfrac{\\sigma^2}{n\\varepsilon^2}\\to 0$. The variance of the mean shrinks like $1/n$, collapsing $\\bar{X}_n$ onto $\\mu$."
            },
            {
              "front": "What is the gambler's fallacy, and why does the LLN not support it?",
              "back": "The false belief that a \"due\" outcome becomes more likely. The LLN works by <em>diluting</em> early imbalances with more data (proportions), not by <em>cancelling</em> them with compensating outcomes — independent trials have no memory."
            },
            {
              "front": "How does the LLN power Monte Carlo estimation?",
              "back": "To estimate $\\mathbb{E}[g(X)]$, sample many $X_i$ and average: $\\frac1n\\sum_i g(X_i)\\to\\mathbb{E}[g(X)]$ by the LLN. Used for intractable integrals, $\\pi$, option pricing, Bayesian computation."
            },
            {
              "front": "LLN vs. CLT — what does each describe?",
              "back": "LLN: <em>where</em> the sample mean goes — to $\\mu$. CLT: <em>how it fluctuates</em> around $\\mu$ — the rescaled error is approximately normal. Destination vs. shape of the wobble."
            },
            {
              "front": "Why is the LLN the foundation of empirical risk minimization?",
              "back": "Training minimizes the <em>average</em> loss over the training set as a proxy for the true expected risk; the LLN guarantees this sample average approaches the true risk as data grows (and makes mini-batch SGD gradients valid estimates)."
            }
          ],
          "homework": [
            {
              "prompt": "A fair die is rolled $n$ times; $\\bar{X}_n$ is the average of the rolls. (a) What value does $\\bar{X}_n$ converge to as $n\\to\\infty$? (b) Use Chebyshev to bound $P(|\\bar{X}_n-\\mu|>0.5)$ for $n=100$. (Use $\\operatorname{Var}(\\text{one die})=35/12$.)",
              "hint": "The limit is the expectation of one die. For the bound, $\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$, then apply $P(|\\bar{X}_n-\\mu|>\\varepsilon)\\le \\operatorname{Var}(\\bar{X}_n)/\\varepsilon^2$.",
              "solution": "(a) $\\mu=\\frac{1+2+\\cdots+6}{6}=3.5$, so $\\bar{X}_n\\to 3.5$. (b) $\\operatorname{Var}(\\bar{X}_{100})=\\frac{35/12}{100}=\\frac{35}{1200}\\approx 0.0292$. Then $P(|\\bar{X}_{100}-3.5|>0.5)\\le \\frac{0.0292}{0.5^2}=\\frac{0.0292}{0.25}\\approx 0.117$. (Chebyshev is loose; the true probability is far smaller, but the bound already guarantees it shrinks with $n$.)"
            },
            {
              "prompt": "Explain, using the LLN, why a casino with a small per-bet house edge is essentially guaranteed to profit over millions of bets, even though it can lose any single bet.",
              "hint": "Think of the casino's average profit per bet across many independent bets as a sample mean converging to the expected edge.",
              "solution": "Each bet has a positive expected profit for the casino (the house edge $\\mu>0$). The casino's average profit per bet over $n$ bets is a sample mean $\\bar{X}_n$, which by the LLN converges to $\\mu>0$. So while any single bet is random (the casino can lose it), the per-bet average becomes almost surely positive, and total profit $\\approx n\\mu$ grows without bound. The randomness is real but is averaged away across millions of independent bets."
            },
            {
              "prompt": "You estimate $\\mathbb{E}[X]$ where $X\\sim\\text{Uniform}(0,1)$ by Monte Carlo with $n$ samples. (a) What does the estimate converge to? (b) Roughly how does the typical error scale with $n$, and how many times more samples do you need to halve the error?",
              "hint": "The Monte Carlo error scales like the standard error of the mean. Halving $1/\\sqrt{n}$ requires what factor on $n$?",
              "solution": "(a) It converges to $\\mathbb{E}[X]=\\tfrac12$ by the LLN. (b) The typical error scales like $\\sigma/\\sqrt{n}\\propto 1/\\sqrt{n}$. To halve the error you must <strong>quadruple</strong> $n$ (since $1/\\sqrt{4n}=\\tfrac12\\cdot 1/\\sqrt{n}$) — Monte Carlo's accuracy improves only as fast as the square root of effort."
            }
          ],
          "examples": [
            {
              "title": "The proportion of heads stabilizes (counts don't)",
              "body": "A fair coin is flipped. After 100 flips you have 58 heads; after 10,000 flips you have 5,100 heads. Show how the LLN is acting on the <em>proportion</em> even though the raw <em>surplus</em> of heads grew.",
              "solution": "After 100 flips: proportion $=0.58$, a surplus of $8$ heads above the expected $50$ — an $8\\%$ deviation from $0.5$. After 10,000 flips: proportion $=0.51$, a surplus of $100$ heads above the expected $5000$ — but only a $1\\%$ deviation. The absolute surplus <em>grew</em> from 8 to 100, yet the proportion moved from $0.58$ toward $0.51$, heading to $0.5$. The LLN governs the average (proportion), which converges; it says nothing that would force the count surplus to shrink. This is precisely why the gambler's fallacy is wrong."
            },
            {
              "title": "Estimating $\\pi$ by Monte Carlo",
              "body": "Throw $n$ random points uniformly into the unit square $[0,1]^2$ and count the fraction $\\hat{p}$ that land inside the quarter-circle $x^2+y^2\\le 1$. Explain why $4\\hat{p}$ estimates $\\pi$, and what guarantees the estimate improves with $n$.",
              "solution": "A uniform point lands in the quarter-circle with probability equal to its area, $\\frac{\\pi}{4}$ (the quarter-circle area over the unit-square area). Let $X_i=1$ if point $i$ is inside, else $0$; then $\\mathbb{E}[X_i]=\\frac{\\pi}{4}$. The sample fraction $\\hat{p}=\\frac1n\\sum_i X_i$ is a sample mean, so by the LLN $\\hat{p}\\to\\frac{\\pi}{4}$, hence $4\\hat{p}\\to\\pi$. The estimate improves because the LLN guarantees convergence; the typical error shrinks like $1/\\sqrt{n}$, so 100× more darts buys about 10× more accuracy."
            },
            {
              "title": "The LLN says it converges; the CLT says how fast",
              "body": "Flip a fair coin $n = 100$ times. The Law of Large Numbers and the Central Limit Theorem make <em>different</em> promises about the proportion of heads — what are they?",
              "solution": "<strong>LLN: convergence to a point.</strong> The Law of Large Numbers says the sample proportion $\\hat{p} \\to 0.5$ as $n \\to \\infty$ — average enough flips and you land on the true probability. It is a statement about <em>where</em> the estimate goes: to $\\mu = p$.\n<strong>CLT: the shape and speed of the wobble.</strong> The Central Limit Theorem describes the <em>fluctuations</em> around that limit. For $n = 100$, the proportion's standard error is $\\sqrt{\\frac{p(1-p)}{n}} = \\sqrt{\\frac{0.25}{100}} = 0.05$, and $\\hat{p}$ is approximately normal, centred at $0.5$ with spread $0.05$ — so it typically lands within $0.5 \\pm 0.1$ (two SEs).\n<strong>The division of labour.</strong> LLN: the estimate <em>converges</em>. CLT: it converges at rate $1/\\sqrt{n}$, with Gaussian fluctuations — quadruple the data to halve the error.\n<strong>The aha.</strong> They answer different questions. LLN guarantees the average is right in the limit; CLT quantifies how wrong it still is at finite $n$ and what that error looks like. Estimation needs both: one to trust the mean, the other to put error bars on it."
            }
          ]
        },
        {
          "id": "ps-sampling-distributions",
          "title": "Sampling Distributions & the Standard Error",
          "minutes": 15,
          "content": "<h3>1. The hook: a statistic is a random variable</h3>\n<p>You survey 1,000 people and find the average income is \\$52,300. Survey a <em>different</em> 1,000 and you'd get a different number. The statistic you compute — here the sample mean — is not a fixed fact about your data; it is a <strong>random variable</strong> with its own distribution, because it depends on the random sample you happened to draw. Understanding that distribution is the whole game of inference: it tells you how far your estimate can plausibly stray from the truth.</p>\n\n<h3>2. The sampling distribution</h3>\n<div data-viz=\"ps-clt\"></div>\n<p>The <strong>sampling distribution</strong> of a statistic is the probability distribution of its values across all possible samples of a given size $n$. Imagine drawing sample after sample, computing $\\bar{X}_n$ each time, and histogramming those means — that histogram is the sampling distribution of the mean. It is a distribution <em>of estimates</em>, not of raw data, and its spread quantifies the uncertainty in a single estimate.</p>\n\n<h3>3. The mean and variance of the sample mean</h3>\n<p>For i.i.d. $X_1,\\dots,X_n$ with mean $\\mu$ and variance $\\sigma^2$, two exact facts follow from linearity (and independence):</p>\n<ul>\n<li><strong>Centered correctly:</strong> $\\mathbb{E}[\\bar{X}_n] = \\dfrac{1}{n}\\sum_i \\mathbb{E}[X_i] = \\mu$. The sample mean is an <em>unbiased</em> estimator of $\\mu$.</li>\n<li><strong>Shrinking spread:</strong> $\\operatorname{Var}(\\bar{X}_n) = \\dfrac{1}{n^2}\\sum_i \\operatorname{Var}(X_i) = \\dfrac{\\sigma^2}{n}$ — the independence kills all covariance cross-terms, leaving $\\sigma^2/n$.</li>\n</ul>\n<p>So the distribution of $\\bar{X}_n$ is centered at the truth and gets tighter as $n$ grows.</p>\n\n<h3>4. The standard error and the $\\sqrt{n}$ law</h3>\n<p>The standard deviation of an <em>estimator</em> has a special name — the <strong>standard error</strong>. For the sample mean,\n$$\\operatorname{SE}(\\bar{X}_n) = \\sqrt{\\operatorname{Var}(\\bar{X}_n)} = \\frac{\\sigma}{\\sqrt{n}}.$$\nNote the square root: precision improves with $\\sqrt{n}$, not $n$. To <em>halve</em> your error you need <em>four times</em> the data; to cut it tenfold you need a hundredfold more. This diminishing return is one of the most important practical facts in all of statistics — it is why polls of 1,000 people are common (the marginal accuracy of larger polls falls off fast) and why Monte Carlo is slow to high precision.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Don't confuse two spreads</div>\n<p>$\\sigma$ (the population SD) measures how spread out <em>individuals</em> are; it does <em>not</em> shrink with more data. $\\sigma/\\sqrt{n}$ (the standard error) measures how spread out the <em>estimate of the mean</em> is; it shrinks with $n$. Bigger samples don't make people more alike — they make your estimate of the average sharper.</p>\n</div>\n\n<h3>5. The Central Limit Theorem, formally</h3>\n<p>The LLN says $\\bar{X}_n\\to\\mu$; the <strong>Central Limit Theorem</strong> pins down the <em>shape</em> of the leftover error. For i.i.d. $X_i$ with mean $\\mu$ and finite variance $\\sigma^2$, as $n\\to\\infty$,\n$$\\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\;\\xrightarrow{d}\\; N(0,1),$$\nequivalently $\\bar{X}_n \\approx N\\!\\left(\\mu,\\ \\dfrac{\\sigma^2}{n}\\right)$ for large $n$ — <em>regardless of the shape of the original distribution</em>. Skewed, bimodal, discrete: average enough of them and the sampling distribution of the mean is approximately normal. This is what lets us attach normal-based error bars to almost any average, and it is why the normal distribution is everywhere.</p>\n\n<h3>6. Worked example: standard error in action</h3>\n<p>Adult heights have $\\sigma=7$ cm. For a sample of $n=49$ people, the sample mean has standard error $\\operatorname{SE}=\\frac{7}{\\sqrt{49}}=\\frac{7}{7}=1$ cm. By the CLT, $\\bar{X}\\approx N(\\mu, 1^2)$, so about $95\\%$ of samples give a mean within $\\pm 2$ cm of the true average height. Quadruple the sample to $n=196$ and $\\operatorname{SE}=\\frac{7}{14}=0.5$ cm — the error bar halved, exactly as the $\\sqrt{n}$ law predicts.</p>\n\n<div data-viz=\"ps-bootstrap\"></div>\n<h3>7. Why this matters</h3>\n<p>The sampling distribution is the engine under every confidence interval and hypothesis test in the next two lessons: knowing that $\\bar{X}_n\\approx N(\\mu,\\sigma^2/n)$ is precisely what lets us say \"the truth is within $\\pm$ this much, with this confidence.\" In machine learning the same idea underlies reporting a test-accuracy <em>with error bars</em>, comparing two models' scores, and the bootstrap (resampling to approximate a sampling distribution when no formula exists).</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why a <em>bell</em>, specifically? Two reasons the Normal is unavoidable</summary>\n<p>The CLT tells you the sample mean becomes Normal, but not why the shape is a bell rather than something else. Two complementary intuitions explain it.</p>\n<p><strong>Convolution smooths.</strong> Adding two independent random variables <em>convolves</em> their densities, and convolution blurs sharp features — corners round off, spikes spread out. Keep adding and the bumps keep washing away. The Gaussian is special because it is the <strong>fixed point</strong> of this process: convolve two Gaussians and you get another Gaussian. So repeated averaging flows toward the one shape that averaging can no longer change — the bell is an <em>attractor</em>.</p>\n<p><strong>Maximum ignorance.</strong> Among all distributions with a given mean and variance, the Normal is the one with the highest entropy — the most spread-out, least-committal choice that smuggles in no extra assumptions. A sum of many small independent effects has discarded everything except its mean and variance, so it lands on exactly that maximally non-committal shape. This is also why the Normal is the honest default whenever all you can justify is a center and a spread.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The sample mean has its own spread, the <code>standard error</code> SE = σ/√n — it shrinks with more data, but only as √n. Run it for σ=20, n=100:</p>\n<div data-code=\"javascript\" data-expected=\"2.00\">// Standard error of the mean: SE = sigma / sqrt(n).\nfunction standardError(sigma, n) {\n  return sigma / Math.sqrt(n);\n}\nconsole.log(standardError(20, 100).toFixed(2));   // 2.00 -- to halve SE you need 4x the data (sqrt law)</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: statistic vs parameter — what actually varies</summary>\n<p>The whole logic of inference rests on a distinction that is easy to blur: a <b>parameter</b> is a fixed (usually unknown) number about the population; a <b>statistic</b> is computed from a sample and is therefore <em>random</em>.</p>\n<p><b>The parameter is fixed; the statistic is random.</b> The population mean $\\mu$ has one true value — it does not wiggle. But the sample mean $\\bar x$ depends on <em>which</em> sample you happened to draw, so it changes from sample to sample. Draw 1000 different samples and you get 1000 different $\\bar x$ values.</p>\n<p><b>The sampling distribution is the distribution of those statistic values.</b> It describes how $\\bar x$ varies across all possible samples of size $n$ — its center (the true $\\mu$, for an unbiased statistic) and its spread (the standard error). This is the object that lets you say \"my estimate is probably within plus or minus this much of the truth.\"</p>\n<p>The \"aha\": inference is possible because the <em>statistic</em> has a predictable distribution even though any single sample is random. Confidence intervals and p-values are statements about <em>where your statistic falls in its sampling distribution</em> — not about the fixed parameter wiggling, but about the randomness in your sample. Confusing \"the parameter is random\" with \"the statistic is random\" is the root of most misread statistics.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the bootstrap — resample to estimate uncertainty</summary>\n<p>The CLT gives the sampling distribution of the <em>mean</em> analytically — but what about the median, a ratio, a correlation, or some custom statistic with no clean formula? The <b>bootstrap</b> answers with brute force: <em>resample your own data</em>.</p>\n<p><b>The trick.</b> You have one sample of size $n$. Treat it as a stand-in for the population, and draw <em>many</em> new samples of size $n$ from it <em>with replacement</em> (so some points repeat, others drop out). Recompute your statistic on each resample. The spread of those thousands of recomputed values <em>is</em> an empirical sampling distribution — from it you read off the standard error (its spread) and a confidence interval (for example, the 2.5th to 97.5th percentiles).</p>\n<p><b>Why it works.</b> The sampling distribution describes how a statistic varies across <em>fresh samples from the population</em>; you cannot draw fresh samples, but resampling your data <em>simulates</em> it, because your sample is your best estimate of the population. No formula, no normality assumption — just resampling and recomputing, which is why it works for statistics where deriving the distribution by hand is hopeless.</p>\n<p>The \"aha\": when you cannot write down a statistic's sampling distribution, <em>compute</em> it — resample your data with replacement thousands of times and watch the statistic wobble. The bootstrap turns \"how uncertain is this estimate?\" from a calculus problem into a loop, giving standard errors and confidence intervals for <em>any</em> statistic.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A population of incomes has standard deviation $\\sigma = \\$30{,}000$. You take one random sample of $n=900$ people and compute $\\bar{X}=\\$52{,}300$. What is the standard error of this sample mean?",
              "choices": [
                "$\\$1{,}000$",
                "$\\$30{,}000$",
                "$\\$33.33$",
                "$\\$52{,}300$"
              ],
              "answer": 0,
              "explain": "$\\operatorname{SE}=\\sigma/\\sqrt{n}=30{,}000/\\sqrt{900}=30{,}000/30=\\$1{,}000$. The tempting $\\$30{,}000$ is $\\sigma$ itself (the spread of individuals), not the spread of the estimate."
            },
            {
              "q": "Your current estimate of a mean has standard error $4$. Without changing the population, by what factor must you multiply the sample size $n$ to bring the standard error down to $1$?",
              "choices": [
                "Multiply $n$ by $4$",
                "Multiply $n$ by $2$",
                "Multiply $n$ by $16$",
                "Multiply $n$ by $8$"
              ],
              "answer": 2,
              "explain": "Since $\\operatorname{SE}=\\sigma/\\sqrt{n}$, cutting SE by a factor of $4$ requires $\\sqrt{n}$ to grow by $4$, i.e. $n$ by $4^2=16$. Multiplying $n$ by $4$ only halves the SE."
            },
            {
              "q": "A friend says: \"If I keep collecting more data, eventually the data points themselves will be packed tightly around the mean.\" What is wrong with this claim?",
              "choices": [
                "Nothing — the population SD $\\sigma$ shrinks as $n$ grows",
                "More data makes the standard error grow, not shrink",
                "The population SD $\\sigma$ describes individual spread and does not change with $n$; only $\\sigma/\\sqrt{n}$ shrinks",
                "The claim is correct only when the population is normal"
              ],
              "answer": 2,
              "explain": "Bigger samples sharpen the estimate of the mean ($\\sigma/\\sqrt{n}\\to0$) but do not make individuals more alike; the population spread $\\sigma$ is a fixed property of the population, independent of how much you sample."
            },
            {
              "q": "Adult heights have $\\sigma = 12$ cm and mean $\\mu = 170$ cm. For a random sample of $n = 36$ adults, what is approximately $P(\\bar{X} > 172)$? Use the CLT and the empirical rule.",
              "choices": [
                "About $0.16$",
                "About $0.50$",
                "About $0.025$",
                "About $0.84$"
              ],
              "answer": 0,
              "explain": "$\\operatorname{SE}=12/\\sqrt{36}=2$, so $172$ is one SE above $\\mu$: $z=(172-170)/2=1$. The upper tail beyond $z=1$ is about $16\\%$. Computing $z$ with $\\sigma=12$ instead of the SE would wrongly give $z\\approx0.17$."
            },
            {
              "q": "The Central Limit Theorem guarantees that for i.i.d. data with finite variance, as $n$ grows the sampling distribution of $\\bar{X}_n$ becomes approximately normal. Which quantity is it that the CLT says becomes normal?",
              "choices": [
                "The histogram of the raw individual data values $X_i$",
                "The distribution of the sample mean $\\bar{X}_n$ across samples",
                "The population distribution itself",
                "The distribution of $\\sigma^2$ across samples"
              ],
              "answer": 1,
              "explain": "The CLT is a statement about the sampling distribution of the mean, not about the raw data. The raw data keep whatever (possibly skewed) shape the population has; it is the averages that become bell-shaped."
            },
            {
              "q": "A waiting-time population is heavily right-skewed. For which sampling situation is the normal approximation to the distribution of $\\bar{X}_n$ LEAST trustworthy?",
              "choices": [
                "$n = 200$",
                "$n = 3$",
                "$n = 500$",
                "$n = 1000$"
              ],
              "answer": 1,
              "explain": "The CLT is an asymptotic ($n\\to\\infty$) result; for strongly skewed populations small $n$ leaves the sampling distribution of the mean still visibly skewed. With $n=3$ the approximation is poorest."
            },
            {
              "q": "You must choose $n$ so the sample mean has standard error at most $2$, given $\\sigma = 30$. What is the smallest sample size that works?",
              "choices": [
                "$n = 15$",
                "$n = 60$",
                "$n = 225$",
                "$n = 450$"
              ],
              "answer": 2,
              "explain": "Require $\\sigma/\\sqrt{n}\\le 2 \\Rightarrow \\sqrt{n}\\ge \\sigma/2 = 15 \\Rightarrow n\\ge 225$. Choosing $n=15$ confuses $\\sqrt{n}$ with $n$."
            },
            {
              "q": "For i.i.d. $X_1,\\dots,X_n$ with variance $\\sigma^2$, $\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$ rather than just $\\sigma^2/n^2 \\cdot n$ being left as cross-terms. Which property kills the covariance cross-terms so that $\\operatorname{Var}(\\sum X_i)=\\sum \\operatorname{Var}(X_i)$?",
              "choices": [
                "Linearity of expectation alone",
                "Identical distribution of the $X_i$",
                "The Central Limit Theorem",
                "Independence of the $X_i$"
              ],
              "answer": 3,
              "explain": "Variance of a sum equals the sum of variances only when covariances vanish, which independence guarantees. Linearity of expectation gives the unbiased mean but says nothing about variance; identical distribution alone does not remove dependence."
            },
            {
              "q": "A poll estimates a proportion $p$ from $n = 400$ respondents, where the standard error is $\\sqrt{p(1-p)/n}$. What is the worst-case (largest) standard error?",
              "choices": [
                "$0.05$",
                "$0.025$",
                "$0.0025$",
                "$0.25$"
              ],
              "answer": 1,
              "explain": "$p(1-p)$ is maximized at $p=0.5$, giving $\\sqrt{0.25/400}=\\sqrt{0.000625}=0.025$. The value $0.25$ is the maximum of $p(1-p)$ itself, not its square root divided by $n$."
            },
            {
              "q": "Two estimators of $\\mu$ are compared. Estimator A is the sample mean $\\bar{X}$; estimator B always returns the value of the first observation $X_1$. Both are unbiased. Why is $\\bar{X}$ preferred?",
              "choices": [
                "They are equally good because both are unbiased",
                "$X_1$ is biased and $\\bar{X}$ is not",
                "$\\bar{X}$ is biased downward, making it more conservative",
                "$\\bar{X}$ has variance $\\sigma^2/n$, which shrinks with $n$, while $X_1$ has variance $\\sigma^2$ regardless of $n$"
              ],
              "answer": 3,
              "explain": "Both are unbiased, so the tie-breaker is variance: $\\operatorname{Var}(\\bar{X})=\\sigma^2/n$ decreases with sample size, while $X_1$ ignores all but one data point and keeps variance $\\sigma^2$. Unbiasedness alone does not make an estimator good."
            },
            {
              "q": "The bootstrap is mentioned as a way to approximate a sampling distribution. What problem does it primarily solve?",
              "choices": [
                "It approximates a statistic's sampling distribution when no closed-form formula is available",
                "It removes the bias of the sample mean",
                "It makes the population distribution normal",
                "It eliminates the need for any random sampling"
              ],
              "answer": 0,
              "explain": "The bootstrap resamples from the data to empirically build a sampling distribution for statistics (e.g. a median or a model score) that lack a tidy closed-form SE. It does not change bias, normalize the population, or replace sampling."
            },
            {
              "q": "A statistic computed from data (such as $\\bar{X}$) is best described as which of the following?",
              "choices": [
                "A fixed constant determined entirely by the population",
                "A deterministic function of $\\mu$ that does not vary across samples",
                "A parameter of the population, like $\\mu$ or $\\sigma$",
                "A random variable whose distribution depends on the random sample drawn"
              ],
              "answer": 3,
              "explain": "Because the statistic is a function of the random sample, it changes from sample to sample and is itself a random variable with a sampling distribution. Parameters like $\\mu$ are fixed; statistics are not."
            },
            {
              "answer": 2,
              "q": "For i.i.d. $X_1,\\dots,X_n$ with mean $\\mu$ and variance $\\sigma^2$, what are the mean and variance of the sample mean $\\bar X_n$?",
              "choices": [
                "$\\mathbb{E}[\\bar X_n]=n\\mu$ and $\\operatorname{Var}(\\bar X_n)=n\\sigma^2$ (both grow with $n$).",
                "$\\mathbb{E}[\\bar X_n]=\\mu$ and $\\operatorname{Var}(\\bar X_n)=\\sigma^2$ (same as a single observation).",
                "$\\mathbb{E}[\\bar X_n]=\\mu$ (unbiased) and $\\operatorname{Var}(\\bar X_n)=\\sigma^2/n$ (spread shrinks with $n$).",
                "$\\mathbb{E}[\\bar X_n]=\\mu/n$ and $\\operatorname{Var}(\\bar X_n)=\\sigma^2/n^2$."
              ],
              "explain": "By linearity $\\mathbb{E}[\\bar X_n]=\\frac1n\\sum\\mathbb{E}[X_i]=\\mu$ — the sample mean is unbiased. Independence kills the covariance cross-terms, so $\\operatorname{Var}(\\bar X_n)=\\frac{1}{n^2}\\sum\\operatorname{Var}(X_i)=\\frac{n\\sigma^2}{n^2}=\\sigma^2/n$: centered at the truth, tightening as $n$ grows."
            },
            {
              "answer": 0,
              "q": "What does the Central Limit Theorem say about the standardized sample mean $\\frac{\\bar X_n-\\mu}{\\sigma/\\sqrt n}$ as $n\\to\\infty$?",
              "choices": [
                "It converges in distribution to $N(0,1)$ — *regardless* of the original population's shape (given finite variance) — so $\\bar X_n\\approx N(\\mu,\\sigma^2/n)$ for large $n$.",
                "It stays distributed exactly like the original population.",
                "It converges to $N(0,1)$ only if the original population is itself normal.",
                "It converges to the constant $\\mu$."
              ],
              "explain": "The CLT: $\\frac{\\bar X_n-\\mu}{\\sigma/\\sqrt n}\\xrightarrow{d}N(0,1)$ for i.i.d. data with finite variance, whatever the population's shape — skewed, bimodal, or discrete. Equivalently $\\bar X_n\\approx N(\\mu,\\sigma^2/n)$. This universality is what lets us attach normal-based error bars to almost any average."
            },
            {
              "answer": 1,
              "q": "Why does averaging many independent variables converge to a *bell* shape specifically, rather than some other curve?",
              "choices": [
                "Because every real-world distribution is secretly normal to begin with.",
                "The Gaussian is the *fixed point* of convolution (adding independent variables convolves and smooths their densities, and a sum of Gaussians is Gaussian) — and it is the *maximum-entropy* distribution for a given mean and variance, the least-committal shape a sum of many small effects lands on.",
                "Because the mean of any finite sample is always exactly normal.",
                "Because the bell is the only curve whose total area equals 1."
              ],
              "explain": "Two complementary reasons: (1) adding independent variables convolves their densities, which blurs sharp features, and the Gaussian is the convolution fixed point — averaging flows toward the one shape it can no longer change; (2) among all distributions with a given mean and variance, the Gaussian has maximum entropy, so a sum that has \"forgotten\" everything but its mean and variance lands there."
            },
            {
              "answer": 3,
              "q": "What exactly is the \"sampling distribution\" of the sample mean?",
              "choices": [
                "The distribution of the raw data points $X_i$ within a single sample.",
                "The population distribution, simply relabeled.",
                "A fixed number equal to the true mean $\\mu$.",
                "The distribution of the *statistic* $\\bar X_n$ itself — the values it takes across all possible samples of size $n$ — i.e. a distribution of *estimates*, not of raw data."
              ],
              "explain": "Imagine drawing sample after sample, computing $\\bar X_n$ each time, and histogramming those means — that histogram is the sampling distribution. It is a distribution of *estimates* (the statistic varies because the sample is random), and its spread (the standard error) quantifies the uncertainty in a single estimate."
            }
          ],
          "flashcards": [
            {
              "front": "What is a sampling distribution?",
              "back": "The probability distribution of a statistic (e.g. the sample mean) across all possible samples of size $n$ — a distribution of <em>estimates</em>, whose spread quantifies the uncertainty in a single estimate."
            },
            {
              "front": "Give $\\mathbb{E}[\\bar{X}_n]$ and $\\operatorname{Var}(\\bar{X}_n)$ for i.i.d. data.",
              "back": "$\\mathbb{E}[\\bar{X}_n]=\\mu$ (unbiased) and $\\operatorname{Var}(\\bar{X}_n)=\\sigma^2/n$ (independence removes covariance cross-terms). The mean is centered at the truth with spread shrinking in $n$."
            },
            {
              "front": "Define the standard error of the sample mean and state the $\\sqrt{n}$ law.",
              "back": "$\\operatorname{SE}(\\bar{X}_n)=\\sigma/\\sqrt{n}$. Precision grows with $\\sqrt{n}$: to halve the error you need 4× the data; to cut it 10× you need 100× the data."
            },
            {
              "front": "Distinguish $\\sigma$ from $\\sigma/\\sqrt{n}$.",
              "back": "$\\sigma$ = spread of individual observations (doesn't shrink with $n$). $\\sigma/\\sqrt{n}$ = spread of the <em>estimate of the mean</em> (shrinks with $n$). More data sharpens the estimate, not the population."
            },
            {
              "front": "State the Central Limit Theorem formally.",
              "back": "For i.i.d. $X_i$ with mean $\\mu$, variance $\\sigma^2$: $\\dfrac{\\bar{X}_n-\\mu}{\\sigma/\\sqrt{n}}\\xrightarrow{d}N(0,1)$, i.e. $\\bar{X}_n\\approx N(\\mu,\\sigma^2/n)$ for large $n$, regardless of the original distribution's shape."
            },
            {
              "front": "Why can we put normal error bars on almost any average?",
              "back": "The CLT makes the sampling distribution of the mean approximately normal for large $n$ no matter the source distribution, so normal-based intervals apply to averages of skewed, discrete, or bimodal data alike."
            }
          ],
          "homework": [
            {
              "prompt": "A population has $\\sigma=20$. (a) Find the standard error of the sample mean for $n=25$ and for $n=100$. (b) By what factor did the SE change, and what factor of $n$ caused it?",
              "hint": "$\\operatorname{SE}=\\sigma/\\sqrt{n}$. Compare the two and the ratio of sample sizes.",
              "solution": "(a) $n=25$: $\\operatorname{SE}=20/\\sqrt{25}=20/5=4$. $n=100$: $\\operatorname{SE}=20/\\sqrt{100}=20/10=2$. (b) The SE halved (from 4 to 2) when $n$ quadrupled (25→100) — the $\\sqrt{n}$ law: $\\sqrt{4}=2$."
            },
            {
              "prompt": "Test scores have mean $\\mu=500$ and $\\sigma=100$. For a random sample of $n=64$ students, use the CLT to find (a) the distribution of $\\bar{X}$, and (b) approximately $P(\\bar{X}>520)$.",
              "hint": "The CLT gives $\\bar{X}\\approx N(\\mu,\\sigma^2/n)$. Standardize the cutoff using the standard error, then use the empirical rule / tail.",
              "solution": "(a) $\\operatorname{SE}=100/\\sqrt{64}=100/8=12.5$, so $\\bar{X}\\approx N(500, 12.5^2)$. (b) Standardize: $z=\\frac{520-500}{12.5}=\\frac{20}{12.5}=1.6$. So $P(\\bar{X}>520)=P(Z>1.6)\\approx 0.055$ (about $5.5\\%$). The sample mean is far less likely to exceed 520 than an individual score is, because its spread is only $12.5$, not $100$."
            },
            {
              "prompt": "You want to estimate a population mean with a standard error of at most $1$, and you know $\\sigma=8$. What sample size $n$ is required?",
              "hint": "Set $\\sigma/\\sqrt{n}\\le 1$ and solve for $n$.",
              "solution": "Require $\\frac{8}{\\sqrt{n}}\\le 1 \\Rightarrow \\sqrt{n}\\ge 8 \\Rightarrow n\\ge 64$. So $n=64$ observations achieve $\\operatorname{SE}=1$. (Cutting the target SE to $0.5$ would demand $n\\ge 256$ — four times as many, the $\\sqrt{n}$ law again.)"
            }
          ],
          "examples": [
            {
              "title": "Why a poll of 1,000 has a ~3% margin",
              "body": "A political poll estimates the proportion $p$ supporting a candidate from $n=1000$ respondents. For a proportion, the standard error is $\\sqrt{p(1-p)/n}$, maximized near $p=0.5$. Compute the worst-case SE and the resulting \"$\\pm$\" 95% margin, and explain why doubling to $n=2000$ barely helps.",
              "solution": "At $p=0.5$, $\\operatorname{SE}=\\sqrt{\\frac{0.5\\cdot 0.5}{1000}}=\\sqrt{0.00025}\\approx 0.0158$. A 95% margin is about $2\\,\\operatorname{SE}\\approx 0.0316$, i.e. roughly $\\pm 3\\%$ — the famous polling margin. Doubling to $n=2000$ gives $\\operatorname{SE}=\\sqrt{0.000125}\\approx 0.0112$, a margin of $\\pm 2.2\\%$: more data helped only by a factor of $\\sqrt{2}\\approx 1.41$, not 2. That $\\sqrt{n}$ diminishing return is exactly why pollsters rarely bother surveying far more than ~1,000 people."
            },
            {
              "title": "The CLT rescues a skewed distribution",
              "body": "Customer wait times are strongly right-skewed (most short, a few very long) with mean $\\mu=4$ min and $\\sigma=4$ min. A manager averages the wait times of $n=100$ customers. Can she use a normal approximation for the average even though individual waits are not normal?",
              "solution": "Yes. Individual waits are skewed, but the CLT says the sampling distribution of the <em>mean</em> of $n=100$ i.i.d. waits is approximately normal: $\\bar{X}\\approx N(4,\\ \\sigma^2/n)$ with $\\operatorname{SE}=4/\\sqrt{100}=0.4$ min. So $\\bar{X}\\approx N(4, 0.4^2)$, and she can say about $95\\%$ of such samples give an average wait within $\\pm 0.8$ min of $4$. The skew of individuals is irrelevant once $n$ is large enough — that is the power and the point of the CLT."
            },
            {
              "title": "The 1/√n law: quadruple the sample to halve the error",
              "body": "A population has standard deviation $\\sigma = 20$. What is the standard error of the sample mean for $n = 100$, and for $n = 400$?",
              "solution": "<strong>Standard error of the mean.</strong> The sample mean's standard deviation — the <b>standard error</b> — is $\\text{SE} = \\tfrac{\\sigma}{\\sqrt{n}}$, not $\\sigma$. For $n = 100$: $\\text{SE} = \\tfrac{20}{\\sqrt{100}} = \\tfrac{20}{10} = 2$. For $n = 400$: $\\text{SE} = \\tfrac{20}{\\sqrt{400}} = \\tfrac{20}{20} = 1$.\n<strong>The square root is the catch.</strong> Going from 100 to 400 samples — <em>four times</em> the data — cut the error only in <em>half</em> (2 to 1). Because $\\text{SE} \\propto 1/\\sqrt{n}$, halving the error costs $4\\times$ the data, and reaching a tenth costs $100\\times$.\n<strong>Why $\\sqrt{n}$.</strong> The variance of a sum of $n$ independent draws grows like $n$; dividing by $n$ to average shrinks variance by $n^2$, so the mean has variance $\\sigma^2/n$ and standard deviation $\\sigma/\\sqrt{n}$.\n<strong>The aha.</strong> This one law governs the cost of precision everywhere — poll margins, Monte Carlo error, A/B tests. Estimation has <em>diminishing returns</em>: each extra digit of accuracy is far more expensive in samples than the last."
            }
          ]
        },
        {
          "id": "ps-point-estimation",
          "title": "Point Estimation: Bias, Variance & Consistency",
          "minutes": 16,
          "content": "<h3>1. The hook: guessing a parameter from data</h3>\n<p>Behind a dataset sits a parameter you cannot see — a true mean $\\mu$, a true success probability $p$, a true variance $\\sigma^2$. A <strong>point estimator</strong> is a recipe that turns data into a single best guess of that parameter. The art of estimation is judging <em>how good</em> a recipe is — and the surprising answer is that \"good\" splits into two competing pieces, bias and variance, exactly as it did for prediction.</p>\n\n<h3>2. Estimators and estimates</h3>\n<p>An <strong>estimator</strong> $\\hat{\\theta}$ is a statistic (a function of the random sample) used to estimate a parameter $\\theta$. Because it depends on the random data, $\\hat{\\theta}$ is a random variable with a sampling distribution. The <em>number</em> you get from one particular dataset is an <strong>estimate</strong>; the <em>rule</em> is the estimator. Example: $\\bar{X}$ is an estimator of $\\mu$; the value $52.3$ from your sample is an estimate.</p>\n\n<h3>3. Bias</h3>\n<p>The <strong>bias</strong> of an estimator is how far its average value sits from the truth:\n$$\\operatorname{Bias}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta.$$\nAn estimator is <strong>unbiased</strong> if $\\mathbb{E}[\\hat{\\theta}]=\\theta$ — on average, across many samples, it nails the target. The sample mean is unbiased for $\\mu$ ($\\mathbb{E}[\\bar{X}]=\\mu$). Bias is a <em>systematic</em> error: it does not shrink just because you average more samples of the same biased recipe.</p>\n\n<h3>4. Variance of an estimator</h3>\n<p>Even an unbiased estimator scatters around its average from sample to sample; that scatter is its <strong>variance</strong> $\\operatorname{Var}(\\hat{\\theta})$. Low variance means the estimate is stable — different datasets give similar answers. For the sample mean, $\\operatorname{Var}(\\bar{X})=\\sigma^2/n$, which shrinks with $n$. Variance is the <em>random</em> part of the error.</p>\n\n<h3>5. Mean squared error: the bias–variance decomposition</h3>\n<p>The overall quality of an estimator is its <strong>mean squared error</strong>, and it splits cleanly into the two pieces:\n$$\\operatorname{MSE}(\\hat{\\theta}) = \\mathbb{E}\\big[(\\hat{\\theta}-\\theta)^2\\big] = \\operatorname{Var}(\\hat{\\theta}) + \\operatorname{Bias}(\\hat{\\theta})^2.$$\nThis is the same bias–variance tradeoff that governs model fitting, now for parameter estimation. Sometimes a <em>slightly biased</em> estimator with much lower variance beats an unbiased one on MSE — the rationale behind regularized (shrinkage) estimators like ridge regression. Unbiasedness is desirable, not sacred.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Picture darts at a board. <strong>Bias</strong> is the offset of your cluster's center from the bullseye; <strong>variance</strong> is how scattered the cluster is. MSE punishes both: a tight cluster off-center (high bias) and a centered shotgun spread (high variance) can be equally bad.</p>\n</div>\n\n<h3>6. Consistency</h3>\n<p>An estimator is <strong>consistent</strong> if it converges in probability to the true parameter as the sample grows: $\\hat{\\theta}_n \\to \\theta$. By the LLN the sample mean is consistent. A sufficient condition is that both bias and variance go to zero as $n\\to\\infty$ (so $\\operatorname{MSE}\\to 0$). Consistency is the minimal sanity check — an estimator that does <em>not</em> approach the truth with infinite data is hard to defend.</p>\n\n<h3>7. The sample variance: why divide by $n-1$?</h3>\n<p>To estimate the population variance $\\sigma^2$, the natural recipe averages squared deviations from the mean — but using the <em>sample</em> mean $\\bar{X}$ (not the unknown $\\mu$) makes those deviations systematically too small, because $\\bar{X}$ is fitted to the very data it is measured against. The fix, <strong>Bessel's correction</strong>, divides by $n-1$ instead of $n$:\n$$s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(X_i-\\bar{X})^2, \\qquad \\mathbb{E}[s^2]=\\sigma^2.$$\nDividing by $n$ would give a <em>biased</em> (too-small) estimate; the $n-1$ — one fewer than $n$ because one degree of freedom was \"used up\" estimating the mean — makes $s^2$ exactly unbiased. This is the most common place a learner first meets a deliberate degrees-of-freedom correction.</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>The bias–variance decomposition is the spine of model selection: underfitting is high bias, overfitting is high variance, and regularization deliberately trades a little bias for a large variance reduction. <strong>Maximum likelihood estimation</strong> — the workhorse that fits everything from logistic regression to neural nets — produces estimators whose bias, variance, and consistency we analyze with exactly these tools. Knowing that \"unbiased\" is not the same as \"best\" is what makes shrinkage and regularization make sense.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the sample variance divides by n − 1, not n</summary>\n<p>To estimate a population's variance you average the squared deviations from the mean. The natural formula divides by $n$ — but that <b>systematically underestimates</b> the true variance. The fix, dividing by $n - 1$ (Bessel's correction), is one of the most-asked \"why?\"s in statistics.</p>\n<p>The reason: you don't know the true mean $\\mu$, so you use the <em>sample</em> mean $\\bar{x}$ instead — and $\\bar{x}$ is, by construction, the value that <em>minimizes</em> the sum of squared deviations for your data. So deviations measured from $\\bar{x}$ are always a touch smaller than deviations from the real $\\mu$ would be. Estimating the mean from the same data \"uses up\" one degree of freedom; dividing by $n - 1$ exactly compensates, making the estimator <b>unbiased</b> ($\\mathbb{E}[s^2] = \\sigma^2$).</p>\n<p>The \"aha\": the $-1$ isn't a fudge factor — it's the price of having estimated the mean from the same sample. If you somehow knew the true mean, you'd divide by $n$; because you estimated it, you divide by $n - 1$.</p>\n</details>\n<h4>Try it in code</h4>\n<p>The sample standard deviation divides by <code>n − 1</code>, not <code>n</code> (Bessel's correction) — that's what makes it an unbiased estimate of the population spread. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"2.58\">// Sample standard deviation: sum of squared deviations over (n - 1), then square root.\nfunction sampleSD(xs) {\n  var n = xs.length, mean = 0;\n  for (var i = 0; i &lt; n; i++) mean += xs[i];\n  mean /= n;\n  var ss = 0;\n  for (var i = 0; i &lt; n; i++) { var d = xs[i] - mean; ss += d * d; }\n  return Math.sqrt(ss / (n - 1));   // n-1, not n\n}\nconsole.log(sampleSD([2, 4, 6, 8]).toFixed(2));   // 2.58</div>\n<h4>Interactive — the bias-variance tradeoff</h4>\n<div data-viz=\"ps-estimator\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: bias, consistency, and maximum likelihood</summary>\n<p>The $n-1$ correction is about <em>unbiasedness</em> — but unbiased is only one of several things you might want from an estimator, and not always the most important.</p>\n<p><b>Unbiased vs consistent.</b> An estimator is <b>unbiased</b> if its expected value equals the true parameter (\"right on average\"). It is <b>consistent</b> if it converges to the truth as $n \\to \\infty$. These are different: an estimator can be <em>biased but consistent</em> (the bias shrinks with $n$) — often a fine trade, since you usually care that more data gets you closer to the truth, not that you are exactly right in expectation on tiny samples.</p>\n<p><b>Maximum likelihood is the workhorse.</b> MLE picks the parameter that makes the observed data most probable: $\\hat\\theta = \\arg\\max_\\theta \\prod_i p(x_i \\mid \\theta)$ (usually by maximizing the log-likelihood). It is a general recipe that often gives <em>biased</em> estimates for small $n$ (the MLE of variance divides by $n$, not $n-1$) — yet it is preferred because it is <em>consistent</em> and <em>asymptotically efficient</em> (lowest possible variance as data grows), and it underlies regression, logistic regression, and training neural nets (cross-entropy <em>is</em> negative log-likelihood).</p>\n<p>The \"aha\": \"best estimator\" depends on what you optimize. Unbiasedness (the $n-1$ fix) is nice for small samples; consistency and efficiency (MLE) matter more as data scales — which is why ML, awash in data, runs on maximum likelihood despite its small-sample bias.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: MSE = bias² + variance</summary>\n<p>How do you compare estimators? The cleanest yardstick, <b>mean squared error</b>, splits <em>exactly</em> into two interpretable pieces — and that split is why \"unbiased\" is not always best.</p>\n<p><b>The decomposition.</b> For an estimator $\\hat\\theta$ of a true value $\\theta$, $\\text{MSE}(\\hat\\theta) = \\mathbb{E}\\big[(\\hat\\theta - \\theta)^2\\big] = \\underbrace{\\text{Var}(\\hat\\theta)}_{\\text{noise}} + \\underbrace{\\big(\\mathbb{E}[\\hat\\theta]-\\theta\\big)^2}_{\\text{bias}^2}.$ Total error equals how much the estimate <em>jitters</em> around its own average (variance) <em>plus</em> how far that average sits from the truth (bias, squared) — the Pythagorean split of error into random and systematic parts.</p>\n<p><b>Why it licenses bias.</b> Since MSE adds bias² and variance, you can sometimes <em>lower total error by accepting a little bias</em> if it buys a big drop in variance. That is the principle behind <b>shrinkage / regularization</b> (ridge regression, James–Stein): pull estimates toward zero or a prior — slightly biased, but much less variable, so smaller MSE overall. The unbiased estimator (the $n-1$ variance) minimizes bias, not necessarily MSE.</p>\n<p>The \"aha\": estimation error is not one thing — it is bias² + variance, and they trade off. \"Best estimator\" means smallest MSE, and the surprising consequence is that a deliberately <em>biased</em> estimator (shrinkage) often beats the unbiased one, because cutting variance can more than pay for the bias it adds.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Fisher information and the Cramér–Rao bound</summary>\n<p>How precisely can a sample pin down a parameter? <b>Fisher information</b> $I(\\theta)$ measures exactly that: the expected <em>sharpness</em> of the log-likelihood around the truth, $I(\\theta) = -\\mathbb{E}\\!\\left[\\frac{\\partial^2}{\\partial\\theta^2}\\log L(\\theta)\\right]$. A log-likelihood that peaks sharply (high curvature) means the data strongly constrains $\\theta$ — lots of information; a flat one means the data barely cares.</p>\n<p>That quantity sets a hard floor. The <b>Cramér–Rao bound</b> says <em>any</em> unbiased estimator obeys $\\mathrm{Var}(\\hat\\theta) \\ge \\frac{1}{I(\\theta)}$ — no clever trick beats it. Fisher information is additive over independent samples, so $n$ data points carry $n\\,I_1(\\theta)$, and the floor shrinks like $1/n$: the familiar $\\sqrt n$ rule for how fast estimates tighten.</p>\n<p>An estimator that meets the bound is called <b>efficient</b>. The headline result: the <a href=\"#/lesson/machine-learning/ml-logistic-regression\" data-route>maximum-likelihood estimator</a> is asymptotically efficient — for large $n$ it achieves the Cramér–Rao bound — one more reason MLE is the default. The same curvature reappears as the metric in <a href=\"#/lesson/reinforcement-learning/rl-trpo-ppo\" data-route>natural-gradient optimization</a> and the Laplace approximation, tying estimation, optimization, and Bayesian inference together.</p>\n</details>\n<div data-viz=\"ps-fisher-information\"></div>\n",
          "mcq": [
            {
              "q": "A coworker says \"my estimator gave 52.3, so its bias is $52.3 - \\mu$.\" What is the conceptual error?",
              "choices": [
                "Bias only applies to biased estimators, and $\\bar X$ is unbiased so it has no bias to compute",
                "Bias should be computed as $\\theta - \\mathbb{E}[\\hat\\theta]$, so the sign is flipped",
                "Bias is a property of the estimator's sampling distribution, $\\mathbb{E}[\\hat\\theta]-\\theta$, not the deviation of one particular estimate from the truth",
                "Nothing is wrong; $52.3 - \\mu$ is exactly the definition of bias for this sample"
              ],
              "answer": 2,
              "explain": "Bias is defined via the expectation across all possible samples, $\\operatorname{Bias}(\\hat\\theta)=\\mathbb{E}[\\hat\\theta]-\\theta$; a single estimate's distance from $\\theta$ is just one realization of sampling error, not the bias."
            },
            {
              "q": "An estimator is unbiased exactly when:",
              "choices": [
                "$\\mathbb{E}[\\hat\\theta]=\\theta$ for the parameter being estimated",
                "its variance equals zero",
                "every individual estimate equals $\\theta$",
                "its bias decreases as the sample size grows"
              ],
              "answer": 0,
              "explain": "Unbiasedness means the sampling distribution is centered on the truth, $\\mathbb{E}[\\hat\\theta]=\\theta$. Individual estimates still vary, and zero bias says nothing about variance or sample size."
            },
            {
              "q": "You draw an i.i.d. sample of size $n$ from a population with mean $\\mu$ and variance $\\sigma^2$. What is $\\operatorname{Var}(\\bar X)$?",
              "choices": [
                "$\\sigma^2$",
                "$n\\sigma^2$",
                "$\\dfrac{\\sigma^2}{n}$",
                "$\\dfrac{\\sigma}{\\sqrt{n}}$"
              ],
              "answer": 2,
              "explain": "For independent observations, $\\operatorname{Var}(\\bar X)=\\operatorname{Var}\\big(\\tfrac1n\\sum X_i\\big)=\\tfrac{1}{n^2}\\sum\\operatorname{Var}(X_i)=\\sigma^2/n$. The choice $\\sigma/\\sqrt n$ is the standard error (a standard deviation), not a variance."
            },
            {
              "q": "Consider $\\hat\\mu = X_1$, i.e., just use the first observation as your estimate of $\\mu$. Which statement is true?",
              "choices": [
                "It is biased, because it ignores most of the data",
                "It is biased and inconsistent, so it is useless",
                "It is both unbiased and minimum-variance among all estimators",
                "It is unbiased, since $\\mathbb{E}[X_1]=\\mu$, but it has large variance $\\sigma^2$"
              ],
              "answer": 3,
              "explain": "Since $\\mathbb{E}[X_1]=\\mu$, the single observation is unbiased; ignoring data does not create bias, it just leaves the variance at $\\sigma^2$ instead of shrinking it to $\\sigma^2/n$. Using more data improves variance, not bias here."
            },
            {
              "q": "Two unbiased estimators $\\hat\\theta_A$ and $\\hat\\theta_B$ are available, with $\\operatorname{Var}(\\hat\\theta_A) < \\operatorname{Var}(\\hat\\theta_B)$. Which is generally preferred and why?",
              "choices": [
                "$\\hat\\theta_B$, because higher variance means it explores more of the parameter space",
                "Neither — once both are unbiased, variance is irrelevant",
                "$\\hat\\theta_A$, because among unbiased estimators the one with smaller variance is more efficient",
                "$\\hat\\theta_A$, but only if its bias is also smaller"
              ],
              "answer": 2,
              "explain": "When two estimators are both unbiased, the one with smaller sampling variance is more efficient and concentrates more tightly around $\\theta$. Both already have zero bias, so variance is exactly the tiebreaker."
            },
            {
              "q": "Why does the estimator $\\frac1n\\sum_{i=1}^n (X_i-\\bar X)^2$ tend to underestimate the true variance $\\sigma^2$?",
              "choices": [
                "Because squaring makes the terms too small on average",
                "Because deviations are taken around the sample mean $\\bar X$, which fits the data more tightly than the unknown $\\mu$, shrinking the sum of squares",
                "Because $\\bar X$ is a biased estimator of $\\mu$",
                "Because dividing by $n$ instead of $n^2$ is the source of the bias"
              ],
              "answer": 1,
              "explain": "$\\bar X$ minimizes $\\sum(X_i-c)^2$ over $c$, so deviations around $\\bar X$ are systematically smaller than deviations around the true $\\mu$; this is why dividing by $n-1$ (not $n$) restores unbiasedness. $\\bar X$ itself is unbiased for $\\mu$."
            },
            {
              "q": "Which scenario describes a SYSTEMATIC error rather than a variance issue?",
              "choices": [
                "An estimator that gives a different value on each new sample",
                "A scale whose readings jitter randomly above and below the true weight",
                "An estimator whose estimates spread widely but average to the truth",
                "A scale that always reads 0.5 kg too heavy, so the average reading sits above the true weight no matter how many times you weigh"
              ],
              "answer": 3,
              "explain": "A consistent offset that does not average away is exactly bias — a systematic error in $\\mathbb{E}[\\hat\\theta]-\\theta$. Random jitter that averages to the truth is variance, not bias."
            },
            {
              "q": "Suppose $X_1,\\dots,X_n$ are i.i.d. with variance $\\sigma^2$, and you form $\\hat\\mu = c\\,\\bar X$ for a constant $c$. For what value of $c$ is $\\hat\\mu$ unbiased for $\\mu$ (assume $\\mu\\neq 0$)?",
              "choices": [
                "$c = 1$",
                "$c = n$",
                "$c = 1/n$",
                "$c = \\sigma^2$"
              ],
              "answer": 0,
              "explain": "$\\mathbb{E}[c\\bar X]=c\\mu$, which equals $\\mu$ (for $\\mu\\neq0$) only when $c=1$. Any other constant scales the expectation away from the target, introducing bias."
            },
            {
              "q": "An estimator $\\hat\\theta_n$ (based on sample size $n$) is called consistent if:",
              "choices": [
                "it is unbiased for every finite $n$",
                "it gives the same estimate on every sample",
                "its variance is constant in $n$",
                "$\\hat\\theta_n$ converges in probability to $\\theta$ as $n\\to\\infty$"
              ],
              "answer": 3,
              "explain": "Consistency is a large-sample property: $\\hat\\theta_n \\xrightarrow{P} \\theta$ as $n$ grows. Unbiasedness at every $n$ is neither necessary nor sufficient for consistency."
            },
            {
              "q": "A biased estimator has $\\operatorname{Bias}(\\hat\\theta)=0.4$ and $\\operatorname{Var}(\\hat\\theta)=0.09$. What is its mean squared error?",
              "choices": [
                "$0.25$",
                "$0.49$",
                "$0.13$",
                "$0.30$"
              ],
              "answer": 0,
              "explain": "$\\operatorname{MSE}=\\operatorname{Var}+\\operatorname{Bias}^2 = 0.09 + 0.4^2 = 0.09+0.16 = 0.25$. The tempting $0.49$ wrongly adds the bias itself ($0.4$) instead of its square."
            },
            {
              "q": "Which statement correctly captures the bias-variance trade-off for estimators?",
              "choices": [
                "An unbiased estimator is always the best choice because zero bias guarantees minimum error",
                "Reducing variance always reduces bias by the same amount",
                "A slightly biased estimator can have lower MSE than an unbiased one if it has sufficiently smaller variance",
                "Bias and variance are the same quantity measured on different scales"
              ],
              "answer": 2,
              "explain": "Since $\\operatorname{MSE}=\\operatorname{Bias}^2+\\operatorname{Var}$, accepting a little bias to cut variance can lower total error — so unbiasedness is not automatically optimal. Bias and variance are distinct components that can be traded off."
            },
            {
              "q": "You want to shrink the variance of $\\bar X$ by a factor of 4 (i.e., to one quarter of its current value). By what factor must you increase the sample size $n$?",
              "choices": [
                "Multiply $n$ by 2",
                "Multiply $n$ by 4",
                "Multiply $n$ by 16",
                "Multiply $n$ by $\\sqrt 2$"
              ],
              "answer": 1,
              "explain": "Because $\\operatorname{Var}(\\bar X)=\\sigma^2/n$, the variance is inversely proportional to $n$; quartering it requires $4\\times$ the sample size. Multiplying $n$ by 2 only halves the variance (and the standard error by $\\sqrt2$)."
            },
            {
              "answer": 1,
              "q": "The sample variance uses $s^2=\\frac{1}{n-1}\\sum_i (X_i-\\bar X)^2$. Why divide by $n-1$ instead of $n$?",
              "choices": [
                "It is an arbitrary convention with no real effect.",
                "Deviations are taken from the *sample* mean $\\bar X$ (fitted to the same data), so they are systematically too small; dividing by $n-1$ — one fewer because a degree of freedom was used estimating $\\bar X$ — corrects this and makes $\\mathbb{E}[s^2]=\\sigma^2$ (unbiased).",
                "Because there are only $n-1$ data points left after removing the mean.",
                "Dividing by $n-1$ makes the estimate larger, as a safety margin against outliers."
              ],
              "explain": "Using $\\bar X$ (not the unknown $\\mu$) shrinks the squared deviations, because $\\bar X$ is the value that minimizes them for this very sample. Dividing by $n-1$ rather than $n$ — \"one degree of freedom used up\" estimating the mean — exactly compensates, giving an unbiased $\\mathbb{E}[s^2]=\\sigma^2$. Dividing by $n$ would underestimate $\\sigma^2$."
            },
            {
              "answer": 1,
              "q": "Estimator A is unbiased with variance $1.0$. Estimator B has bias $0.2$ but variance $0.1$. Which has the lower mean squared error?",
              "choices": [
                "A, because unbiased estimators always have the lower MSE.",
                "B: $\\operatorname{MSE}_B=\\operatorname{Var}+\\operatorname{Bias}^2=0.1+0.2^2=0.14$, versus $\\operatorname{MSE}_A=1.0+0=1.0$ — the small bias is far outweighed by the variance reduction.",
                "They are equal, since MSE ignores bias.",
                "Cannot be compared without knowing the true parameter $\\theta$."
              ],
              "explain": "$\\operatorname{MSE}=\\operatorname{Var}+\\operatorname{Bias}^2$. A: $1.0+0=1.0$. B: $0.1+0.04=0.14$. The slightly-biased B wins decisively — the rationale behind shrinkage / regularized estimators (e.g. ridge regression): trading a little bias for a large variance cut lowers total error. \"Unbiased\" is not the same as \"best.\""
            },
            {
              "answer": 3,
              "q": "What is a sufficient condition for an estimator $\\hat\\theta_n$ to be consistent (converge in probability to $\\theta$)?",
              "choices": [
                "It is unbiased for every $n$ (zero bias alone guarantees consistency).",
                "Its variance is constant in $n$.",
                "It equals the true $\\theta$ exactly for some finite $n$.",
                "Both its bias and its variance go to $0$ as $n\\to\\infty$ — then $\\operatorname{MSE}(\\hat\\theta_n)=\\operatorname{Var}+\\operatorname{Bias}^2\\to 0$, which forces convergence in probability."
              ],
              "explain": "If $\\operatorname{Bias}\\to 0$ and $\\operatorname{Var}\\to 0$ then $\\operatorname{MSE}\\to 0$, and MSE-convergence implies convergence in probability — so the estimator is consistent. Unbiasedness alone is not enough (e.g. \"use only $X_1$\" is unbiased but its variance never shrinks, so it is not consistent); the variance must also vanish."
            },
            {
              "answer": 0,
              "q": "How does the bias–variance decomposition map onto model fitting in machine learning?",
              "choices": [
                "Underfitting is high *bias* (a too-rigid model misses the pattern), overfitting is high *variance* (the model chases noise and is unstable across datasets), and regularization deliberately trades a little bias for a large variance reduction.",
                "Underfitting is high variance and overfitting is high bias.",
                "Bias and variance are irrelevant to model fitting — only training accuracy matters.",
                "Regularization increases both bias and variance simultaneously."
              ],
              "explain": "The same decomposition governs estimators and models: a too-simple model has high bias (systematically wrong), a too-flexible one has high variance (fits noise, varies wildly with the training sample), and regularization (shrinkage) accepts slightly more bias to cut variance — usually lowering total error. It is why \"most flexible / unbiased\" is not automatically \"best.\""
            }
          ],
          "flashcards": [
            {
              "front": "Define the bias of an estimator and what \"unbiased\" means.",
              "back": "$\\operatorname{Bias}(\\hat{\\theta})=\\mathbb{E}[\\hat{\\theta}]-\\theta$. Unbiased means $\\mathbb{E}[\\hat{\\theta}]=\\theta$ — on average across samples it hits the truth. Bias is systematic and does not vanish by averaging the same recipe."
            },
            {
              "front": "State the bias–variance decomposition of mean squared error.",
              "back": "$\\operatorname{MSE}(\\hat{\\theta})=\\mathbb{E}[(\\hat{\\theta}-\\theta)^2]=\\operatorname{Var}(\\hat{\\theta})+\\operatorname{Bias}(\\hat{\\theta})^2$. Total error = random scatter + systematic offset (squared)."
            },
            {
              "front": "Can a biased estimator ever be preferable to an unbiased one?",
              "back": "Yes — if it has enough lower variance that its MSE is smaller. This justifies shrinkage/regularized estimators (e.g. ridge). Unbiasedness is desirable, not sacred."
            },
            {
              "front": "What does it mean for an estimator to be consistent?",
              "back": "$\\hat{\\theta}_n\\to\\theta$ in probability as $n\\to\\infty$. Sufficient: bias and variance both $\\to 0$ (so MSE$\\to 0$). The sample mean is consistent by the LLN."
            },
            {
              "front": "Why does the sample variance divide by $n-1$ instead of $n$?",
              "back": "Bessel's correction: deviations are taken from the fitted $\\bar{X}$, not the true $\\mu$, so they're systematically too small. Dividing by $n-1$ (one degree of freedom used to estimate the mean) makes $s^2$ unbiased: $\\mathbb{E}[s^2]=\\sigma^2$."
            },
            {
              "front": "Map the bias–variance decomposition onto under/overfitting.",
              "back": "Underfitting = high bias (too-simple model misses the truth); overfitting = high variance (fits noise, unstable across datasets). Regularization trades a little bias for a large variance reduction to lower MSE."
            }
          ],
          "homework": [
            {
              "prompt": "An estimator $\\hat{\\theta}$ of $\\theta=10$ has $\\mathbb{E}[\\hat{\\theta}]=10.5$ and $\\operatorname{Var}(\\hat{\\theta})=4$. Compute its bias and MSE.",
              "hint": "Bias is $\\mathbb{E}[\\hat{\\theta}]-\\theta$; then MSE $=$ variance $+$ bias$^2$.",
              "solution": "$\\operatorname{Bias}=10.5-10=0.5$. $\\operatorname{MSE}=\\operatorname{Var}+\\operatorname{Bias}^2=4+0.5^2=4+0.25=4.25$. The systematic error contributes only $0.25$; almost all the MSE here is variance."
            },
            {
              "prompt": "Estimator A is unbiased with variance $9$. Estimator B has bias $1$ and variance $3$. Which has the smaller MSE, and what does this illustrate?",
              "hint": "Compute MSE for each via variance + bias².",
              "solution": "A: $\\operatorname{MSE}=9+0^2=9$. B: $\\operatorname{MSE}=3+1^2=4$. Estimator B wins ($4<9$) despite being biased — its much lower variance more than compensates. This illustrates that a biased estimator can beat an unbiased one on MSE, the rationale for shrinkage/regularization."
            },
            {
              "prompt": "For data $\\{2, 4, 9\\}$, compute the sample mean, then the sample variance $s^2$ using the $n-1$ divisor. Why would dividing by $n$ here understate the variability?",
              "hint": "$\\bar{X}=(2+4+9)/3$. Then sum squared deviations from $\\bar{X}$ and divide by $n-1=2$.",
              "solution": "$\\bar{X}=\\frac{2+4+9}{3}=5$. Squared deviations: $(2-5)^2+(4-5)^2+(9-5)^2=9+1+16=26$. With Bessel: $s^2=\\frac{26}{n-1}=\\frac{26}{2}=13$. Dividing by $n=3$ would give $\\frac{26}{3}\\approx 8.67$, which is systematically too small because the deviations are measured from the fitted $\\bar{X}=5$ (the value that <em>minimizes</em> the sum of squared deviations), not the true unknown $\\mu$."
            }
          ],
          "examples": [
            {
              "title": "Comparing two estimators of a mean by MSE",
              "body": "To estimate a population mean $\\mu$ from a sample of size $n$, consider two estimators: $A=\\bar{X}$ (the sample mean) and $B=\\frac{n}{n+1}\\bar{X}$ (a shrinkage estimator that pulls toward 0). Suppose $\\mu=10$, $\\sigma^2=100$, $n=9$. Compute the MSE of each and comment.",
              "solution": "For $A=\\bar{X}$: unbiased, $\\operatorname{Var}=\\sigma^2/n=100/9\\approx 11.11$, so $\\operatorname{MSE}_A=11.11$.\n\nFor $B=\\frac{9}{10}\\bar{X}$: $\\mathbb{E}[B]=\\frac{9}{10}\\cdot 10=9$, so $\\operatorname{Bias}=9-10=-1$. $\\operatorname{Var}(B)=\\left(\\frac{9}{10}\\right)^2\\cdot\\frac{100}{9}=\\frac{81}{100}\\cdot 11.11\\approx 9.0$. $\\operatorname{MSE}_B=9.0+(-1)^2=10.0$.\n\nSo $\\operatorname{MSE}_B\\approx 10.0 < 11.11\\approx \\operatorname{MSE}_A$ — the slightly biased shrinkage estimator has lower MSE here. Shrinking trades a small bias for a larger variance reduction. (The advantage depends on $\\mu$ and $\\sigma^2$; this is the core idea behind ridge/James–Stein estimators.)"
            },
            {
              "title": "Verifying Bessel's correction makes $s^2$ unbiased",
              "body": "Take the tiny population $\\{0, 2\\}$ with true variance $\\sigma^2$. Draw a sample of size $n=2$ <em>with replacement</em>. Show that averaging squared deviations with divisor $n=2$ underestimates $\\sigma^2$, while divisor $n-1=1$ gets it right on average. (First find $\\sigma^2$ for the population.)",
              "solution": "Population $\\{0,2\\}$: $\\mu=1$, $\\sigma^2=\\frac{(0-1)^2+(2-1)^2}{2}=\\frac{1+1}{2}=1$.\n\nSamples of size 2 with replacement (each prob $\\tfrac14$): $(0,0),(0,2),(2,0),(2,2)$. Their sums of squared deviations from the sample mean $\\bar{X}$:\n· $(0,0)$: $\\bar{X}=0$, SS$=0$. · $(2,2)$: $\\bar{X}=2$, SS$=0$. · $(0,2)$ and $(2,0)$: $\\bar{X}=1$, SS$=(0-1)^2+(2-1)^2=2$.\n\nAverage SS $=\\frac{1}{4}(0+2+2+0)=1$. Dividing by $n=2$: estimate $=\\frac{1}{2}$ on average — too small (true $\\sigma^2=1$). Dividing by $n-1=1$: estimate $=1$ on average — exactly $\\sigma^2$. Bessel's $n-1$ corrects the downward bias."
            },
            {
              "title": "Maximum likelihood for a coin: just the sample frequency",
              "body": "You flip a coin 10 times and see 7 heads. What is the maximum-likelihood estimate of the head probability $p$?",
              "solution": "<strong>Write the likelihood.</strong> For $k$ heads in $n$ flips, the probability of the data as a function of $p$ is $L(p) = \\binom{n}{k} p^k (1-p)^{n-k}$. MLE picks the $p$ that makes the observed data most probable.\n<strong>Maximize via the log.</strong> Maximizing $\\log L = k \\log p + (n-k)\\log(1-p) + \\text{const}$, set the derivative to zero: $\\tfrac{k}{p} - \\tfrac{n-k}{1-p} = 0 \\Rightarrow p = \\tfrac{k}{n}$. With $k = 7$, $n = 10$: $\\hat p = \\tfrac{7}{10} = 0.7$.\n<strong>Why it is intuitive.</strong> The MLE of a Bernoulli rate is exactly the <em>sample frequency</em> — the proportion you observed. The binomial coefficient does not depend on $p$, so it drops out of the maximization; only the data's fit matters.\n<strong>The aha.</strong> Maximum likelihood asks \"which parameter would make what I saw least surprising?\" For a coin that is just heads-over-flips — but the same recipe (write the likelihood, maximize its log) derives estimators for far harder models, which is why MLE is the workhorse of statistics."
            }
          ]
        },
        {
          "id": "ps-confidence-intervals",
          "title": "Confidence Intervals",
          "minutes": 16,
          "content": "<h3>1. The hook: an estimate with honest error bars</h3>\n<p>A point estimate alone (\"the average is 52.3\") hides its own uncertainty. A <strong>confidence interval (CI)</strong> upgrades it to a range — \"52.3, give or take 1.5\" — that comes with a stated confidence level. It is the standard way science reports a measurement: not a bare number, but a number with a quantified margin of doubt built from the sampling distribution.</p>\n\n<h3>2. The idea</h3>\n<p>A confidence interval is a range computed from the data that is designed to contain the true parameter a specified fraction of the time. A <strong>95% confidence interval</strong> is built by a <em>procedure</em> that, used over and over on fresh samples, produces intervals capturing the true parameter $95\\%$ of the time. The interval moves from sample to sample; the parameter is fixed. The confidence is a property of the <em>method</em>, not of any one interval.</p>\n\n<h3>3. A confidence interval for the mean (known $\\sigma$)</h3>\n<p>By the CLT, $\\bar{X}\\approx N(\\mu,\\sigma^2/n)$, so the standardized error $\\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}$ is approximately standard normal. Since $95\\%$ of a standard normal lies within $\\pm 1.96$, with $95\\%$ probability $\\left|\\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}\\right|\\le 1.96$. Rearranging to isolate $\\mu$ gives the interval\n$$\\bar{X} \\pm z^{*}\\,\\frac{\\sigma}{\\sqrt{n}},$$\nwhere $z^{*}=1.96$ for $95\\%$ confidence ($z^{*}=1.645$ for $90\\%$, $2.576$ for $99\\%$). The half-width $z^{*}\\sigma/\\sqrt{n}$ is the <strong>margin of error</strong>.</p>\n\n<h3>4. Interpreting it correctly (the subtle part)</h3>\n<p>Here is the trap. A 95% CI does <strong>not</strong> mean \"there is a 95% probability that $\\mu$ lies in <em>this</em> interval.\" Once computed, the interval either contains the fixed $\\mu$ or it does not — there is no probability left. The correct statement is about the <em>procedure</em>: \"if I repeated this sampling-and-interval-building many times, about 95% of the intervals would contain $\\mu$.\" This particular interval is one draw from a method that works 95% of the time.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Careful</div>\n<p>The randomness lives in the <em>interval</em> (which shifts with each sample), not in the parameter (which is fixed). \"95% confident\" is shorthand for \"produced by a method with a 95% capture rate,\" not a probability statement about $\\mu$ for this one interval.</p>\n</div>\n<p>The simulator below makes this concrete: each bar is a confidence interval from a fresh sample, and the dashed line is the true $\\mu$. Press <strong>Run</strong> and watch — about $95\\%$ of the bars capture $\\mu$ (green) while roughly $1$ in $20$ misses it entirely (red). That long-run capture rate <em>is</em> the confidence level. Raising $n$ only narrows the bars; the capture rate is set by the confidence level, not the sample size.</p>\n<div data-viz=\"ps-ci-coverage\"></div>\n\n<h3>5. Margin of error and choosing a sample size</h3>\n<p>The margin of error $E = z^{*}\\sigma/\\sqrt{n}$ shows the three levers: higher confidence (larger $z^{*}$) widens the interval; more spread (larger $\\sigma$) widens it; more data (larger $n$) narrows it — but only as $\\sqrt{n}$. To guarantee a target margin $E$, solve for $n$:\n$$n \\ge \\left(\\frac{z^{*}\\sigma}{E}\\right)^{2}.$$\nHalving the margin quadruples the required sample — the $\\sqrt{n}$ law, one more time. There is a genuine tradeoff: you can be more confident <em>or</em> more precise at fixed $n$, but tightening both requires more data.</p>\n\n<h3>6. When $\\sigma$ is unknown: the $t$-distribution</h3>\n<p>In practice you rarely know the population $\\sigma$; you estimate it with the sample standard deviation $s$. Plugging in $s$ adds extra uncertainty (you are now estimating <em>two</em> things), so the right reference curve is no longer the normal but <strong>Student's $t$-distribution</strong> with $n-1$ degrees of freedom — bell-shaped but heavier-tailed, giving slightly wider intervals:\n$$\\bar{X}\\pm t^{*}_{n-1}\\,\\frac{s}{\\sqrt{n}}.$$\nAs $n$ grows, $s\\to\\sigma$ and the $t$-distribution converges to the normal, so for large samples the two agree and the simple $z$ interval is fine.</p>\n\n<h3>7. Worked example</h3>\n<p>A factory's bolts have known $\\sigma=2$ mm. A sample of $n=100$ has mean length $\\bar{X}=50.4$ mm. A 95% CI for the true mean length is $50.4 \\pm 1.96\\cdot\\frac{2}{\\sqrt{100}} = 50.4 \\pm 1.96\\cdot 0.2 = 50.4 \\pm 0.392$, i.e. $[50.01,\\ 50.79]$ mm. We are 95% confident (in the procedural sense) the true mean lies in this range. To shrink the margin to $0.2$ mm we'd need $n\\ge\\left(\\frac{1.96\\cdot 2}{0.2}\\right)^2=(19.6)^2\\approx 385$ bolts.</p>\n\n<h3>8. Why this matters</h3>\n<p>Confidence intervals are how every empirical field reports results with honesty about uncertainty — and in machine learning they are how you decide whether model A's 91.2% accuracy is <em>really</em> better than model B's 90.8% or just noise. Overlapping intervals warn you not to over-read a difference. The bootstrap generalizes CIs to statistics with no closed-form sampling distribution, making this the most broadly used inference tool in modern data science.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: what \"95% confidence\" actually means (and the trap almost everyone falls into)</summary>\n<p>The sentence everyone wants to say is \"there is a 95% probability that the true mean $\\mu$ lies in this interval.\" In the frequentist framework that sentence is <strong>wrong</strong>, and seeing why sharpens what a confidence interval really is.</p>\n<p>The key move: $\\mu$ is a <em>fixed, unknown constant</em> — it is not random, so it has no probability distribution. What is random is the <em>interval</em>, because it is built from a random sample: draw a new sample and you get new endpoints. So once you have computed a specific interval like $[4.1,\\,5.3]$, the constant $\\mu$ is either inside it or it isn't — the probability is $0$ or $1$, you just don't know which.</p>\n<p>The 95% is a property of the <strong>procedure</strong>, not of any single interval: <em>\"if I repeated this sampling-and-interval-building process many times, about 95% of the intervals I would construct would contain $\\mu$.\"</em> That is exactly what the Confidence-Interval coverage visualizer makes visible — draw dozens of intervals and watch close to 95% of them cover the true line while a stubborn ~5% miss. The confidence lives in the factory, not in any one widget it stamps out.</p>\n</details>\n<h4>Try it in code</h4>\n<p>A 95% confidence interval is <code>x̄ ± margin</code>, where the margin of error is <code>z · (σ/√n)</code> with <code>z = 1.96</code> for 95%. Run it for σ=10, n=100:</p>\n<div data-code=\"javascript\" data-expected=\"1.96\">// 95% CI margin of error: z * (sigma / sqrt(n)), z = 1.96 for 95%.\nfunction margin(z, sigma, n) {\n  return z * (sigma / Math.sqrt(n));\n}\nconsole.log(margin(1.96, 10, 100).toFixed(2));   // 1.96 -- the CI is xbar +/- 1.96</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: what sets the width (and the sqrt(n) law)</summary>\n<p>Beyond what \"95% confidence\" means, it pays to know what controls the interval's <em>width</em>. For a mean, the interval is $\\bar x \\pm z\\,\\tfrac{\\sigma}{\\sqrt n}$, so the half-width is $z\\,\\tfrac{\\sigma}{\\sqrt n}$ — driven by three things: the spread $\\sigma$, the confidence level (through $z$), and the sample size $n$.</p>\n<p><b>The sqrt(n) law.</b> Precision improves only with the <em>square root</em> of $n$: to halve the interval you need <b>four times</b> the data ($\\sqrt{4} = 2$); to shrink it tenfold, 100x the data. Diminishing returns are baked in — the first samples buy a lot of precision, later ones much less.</p>\n<p><b>The confidence–width tradeoff.</b> Higher confidence widens the interval: $z_{95\\%} = 1.96$ but $z_{99\\%} = 2.576$, so demanding 99% coverage stretches it by about 31%. You cannot raise confidence and precision at once for fixed $n$ — you trade one for the other, or collect more data.</p>\n<p>The \"aha\": a confidence interval has three coupled knobs. Want it tighter? Reduce variance, accept lower confidence, or pay the quadratic price in sample size. The $\\sqrt n$ in the denominator is why \"just collect more data\" gets expensive fast.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: confidence intervals and hypothesis tests are the same thing</summary>\n<p>Confidence intervals and hypothesis tests look like separate tools, but they are <b>two views of one calculation</b> — a duality that lets you read either off the other.</p>\n<p><b>The duality.</b> A 95% confidence interval for a parameter $\\theta$ is <em>exactly</em> the set of null values $\\theta_0$ that a two-sided test at $\\alpha = 0.05$ would <em>fail</em> to reject. In other words: $\\theta_0$ lies inside the 95% CI <em>if and only if</em> testing $H_0:\\theta=\\theta_0$ gives $p \\gt 0.05$. The CI <em>is</em> \"all the hypotheses your data does not contradict.\"</p>\n<p><b>Why they coincide.</b> Both are built from the same standard error and the same critical multiplier. The test rejects when the estimate is more than (multiplier times SE) away from $\\theta_0$; the CI is the estimate <em>plus or minus</em> (multiplier times SE). So \"is $\\theta_0$ farther than the cutoff?\" (reject) and \"is $\\theta_0$ outside estimate ± cutoff?\" (outside the CI) are the identical comparison.</p>\n<p><b>Why the CI is usually more useful.</b> A test gives a yes/no at one null value; the CI shows the <em>whole range</em> of plausible values and their precision in one shot — so it answers \"is there an effect?\" <em>and</em> \"how big, with what uncertainty?\" (the practical-significance question) at once.</p>\n<p>The \"aha\": do not think of CIs and tests as different — the 95% CI is the collection of all $\\theta_0$ you would not reject at 5%. Reporting the interval gives you the test for <em>every</em> null at once, plus the effect size, which is why statisticians prefer intervals to bare p-values.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A 95% confidence interval for a mean is computed as $[48.2, 53.8]$. Which interpretation is correct?",
              "choices": [
                "There is a 95% probability that the true mean lies between 48.2 and 53.8.",
                "95% of the population's values lie between 48.2 and 53.8.",
                "If the sampling-and-interval procedure were repeated many times, about 95% of the resulting intervals would contain the true mean.",
                "There is a 95% probability that a future sample mean will fall between 48.2 and 53.8."
              ],
              "answer": 2,
              "explain": "Confidence is a property of the procedure's long-run capture rate, not of this one fixed interval. The first choice is the classic trap: once computed, the interval either contains the fixed $\\mu$ or it does not, so no probability remains for this particular interval."
            },
            {
              "q": "A factory's parts have known $\\sigma = 4$ mm. A sample of $n=64$ gives $\\bar{X}=25$ mm. Using $z^{*}=1.96$, what is the 95% confidence interval for the true mean?",
              "choices": [
                "$[23.04,\\ 26.96]$",
                "$[17.16,\\ 32.84]$",
                "$[24.51,\\ 25.49]$",
                "$[24.02,\\ 25.98]$"
              ],
              "answer": 3,
              "explain": "$\\operatorname{SE}=\\sigma/\\sqrt{n}=4/8=0.5$, so the margin is $1.96\\times0.5=0.98$, giving $25\\pm0.98=[24.02,25.98]$. Choice [17.16, 32.84] wrongly uses $\\sigma$ itself instead of the standard error $\\sigma/\\sqrt{n}$."
            },
            {
              "q": "Holding everything else fixed, how does a 99% confidence interval compare to a 95% confidence interval built from the same sample?",
              "choices": [
                "It is narrower, because higher confidence means a more precise estimate.",
                "It is narrower only when $n$ is large.",
                "It has the same width but is shifted higher.",
                "It is wider, because a higher capture rate requires a larger $z^{*}$."
              ],
              "answer": 3,
              "explain": "Greater confidence uses a larger critical value ($z^{*}=2.576$ vs $1.96$), enlarging the margin $z^{*}\\sigma/\\sqrt{n}$. The tempting error is to equate 'more confident' with 'more precise'; in fact at fixed $n$ you trade precision for confidence."
            },
            {
              "q": "You want to halve the margin of error of a 95% CI for a mean (with $\\sigma$ fixed). By what factor must the sample size $n$ increase?",
              "choices": [
                "Factor of 2",
                "Factor of $\\sqrt{2}$",
                "Factor of 8",
                "Factor of 4"
              ],
              "answer": 3,
              "explain": "Since $E=z^{*}\\sigma/\\sqrt{n}$, the margin scales as $1/\\sqrt{n}$; halving it requires $\\sqrt{n}$ to double, so $n$ must quadruple. Choosing 'factor of 2' ignores the square-root law."
            },
            {
              "q": "An analyst does not know the population $\\sigma$ and estimates it with the sample standard deviation $s$ from a small sample. Which reference distribution should be used for the CI, and why?",
              "choices": [
                "The standard normal, because the CLT always makes $\\bar{X}$ exactly normal.",
                "Student's $t$ with $n-1$ degrees of freedom, because estimating $\\sigma$ with $s$ adds uncertainty and the $t$ has heavier tails.",
                "Student's $t$ with $n$ degrees of freedom, because there are $n$ data points.",
                "The normal, because $s$ is an unbiased estimate of $\\sigma$ so nothing changes."
              ],
              "answer": 1,
              "explain": "Plugging in $s$ introduces extra estimation uncertainty, so the heavier-tailed $t_{n-1}$ gives appropriately wider intervals. The degrees of freedom are $n-1$, not $n$, and unbiasedness of $s$ does not eliminate the added variability."
            },
            {
              "q": "A 95% CI for the difference in mean accuracy between model A and model B is $[-0.4\\%, +1.2\\%]$. What is the most defensible conclusion?",
              "choices": [
                "Model A is significantly better than model B at the 95% level.",
                "Model B is significantly better than model A at the 95% level.",
                "The interval includes 0, so we cannot rule out that the two models perform equally well.",
                "The interval is invalid because confidence intervals cannot contain negative numbers."
              ],
              "answer": 2,
              "explain": "Because the interval for the difference straddles 0, a zero difference is among the plausible values, so the data do not establish a real gap. CIs for a difference can certainly include negative values, so the last choice is wrong."
            },
            {
              "q": "For a fixed sample size $n$ and fixed confidence level, two populations are sampled: population P has SD $\\sigma_P=10$ and population Q has SD $\\sigma_Q=20$. How do the margins of error compare?",
              "choices": [
                "Q's margin equals P's, because $\\sigma$ cancels out of the formula.",
                "Q's margin is twice P's, because the margin is proportional to $\\sigma$.",
                "Q's margin is four times P's, because the margin depends on $\\sigma^2$.",
                "P's margin is larger, because smaller spread requires a wider interval."
              ],
              "answer": 1,
              "explain": "The margin $E=z^{*}\\sigma/\\sqrt{n}$ is linear in $\\sigma$, so doubling $\\sigma$ doubles the margin. The dependence is on $\\sigma$, not $\\sigma^2$, ruling out the factor-of-four answer."
            },
            {
              "q": "You need a 95% confidence interval for a mean with margin of error at most $E=2$, and the population SD is known to be $\\sigma=20$. Using $z^{*}=1.96$, what is the minimum required sample size?",
              "choices": [
                "$n \\ge 97$",
                "$n \\ge 385$",
                "$n \\ge 20$",
                "$n \\ge 196$"
              ],
              "answer": 1,
              "explain": "Using $n\\ge(z^{*}\\sigma/E)^2=(1.96\\cdot20/2)^2=(19.6)^2=384.16$, so $n\\ge385$. Choice 196 drops the square or mishandles the ratio, and 97 corresponds to halving the correct argument."
            },
            {
              "q": "Which change to the experiment will narrow a confidence interval for the mean?",
              "choices": [
                "Increasing the confidence level from 90% to 99%.",
                "Sampling from a population with larger variance.",
                "Reporting the interval with more decimal places.",
                "Collecting more data (increasing $n$)."
              ],
              "answer": 3,
              "explain": "More data shrinks the standard error $\\sigma/\\sqrt{n}$ and thus the margin. Raising the confidence level or sampling a more variable population both widen the interval, and decimal precision in reporting does not change the interval's true width."
            },
            {
              "q": "Two valid 95% confidence intervals for the same fixed parameter, computed from two independent samples, turn out to be disjoint (they do not overlap at all). What does this tell you?",
              "choices": [
                "This can legitimately happen by chance; not every 95% interval captures $\\mu$, and roughly 1 in 20 misses.",
                "One of the procedures is mathematically invalid, since both must contain $\\mu$.",
                "It proves the true parameter changed between the two samples.",
                "It means the confidence level was actually 100% for both."
              ],
              "answer": 0,
              "explain": "A 95% procedure misses the fixed parameter about 5% of the time, so two intervals can be disjoint when at least one fails to capture $\\mu$. This is expected variability, not proof of an invalid method or a changing parameter."
            },
            {
              "q": "A bolt manufacturer has known $\\sigma=2$ mm and a sample of $n=100$ with $\\bar{X}=50.4$ mm. The 95% CI is reported as $[50.01, 50.79]$. The same sample is then used to also report a 99% CI. Without recomputing, which statement must be true?",
              "choices": [
                "The 99% CI is centered at a different value than 50.4.",
                "The 99% CI is contained within $[50.01, 50.79]$.",
                "The 99% CI also has center 50.4 but a larger margin than 0.39.",
                "The 99% CI has the same endpoints because the data are identical."
              ],
              "answer": 2,
              "explain": "Both intervals use the same $\\bar{X}=50.4$ as center, but the 99% level uses a larger $z^{*}$ (2.576 vs 1.96), producing a margin bigger than the 95% margin of about 0.39. Same data does not mean same endpoints, since the critical value differs."
            },
            {
              "q": "As the sample size $n$ grows very large, how does the $t$-based confidence interval (unknown $\\sigma$) relate to the $z$-based interval (known $\\sigma$)?",
              "choices": [
                "The $t$ interval stays permanently wider, since $s$ is never exactly $\\sigma$.",
                "The two intervals diverge, because more degrees of freedom widen the $t$.",
                "The $t$ interval converges to the $z$ interval, because $s\\to\\sigma$ and $t^{*}_{n-1}\\to z^{*}$.",
                "The $t$ interval becomes narrower than the $z$ interval for large $n$."
              ],
              "answer": 2,
              "explain": "With large $n$, the sample SD $s$ approaches $\\sigma$ and the $t$-distribution approaches the standard normal, so $t^{*}_{n-1}\\to z^{*}$ and the intervals coincide. The extra width of $t$ matters only for small samples, vanishing as $n$ grows."
            },
            {
              "answer": 0,
              "q": "A sample of $n=100$ has $\\bar X = 20$ from a population with known $\\sigma=5$. What is the 90% confidence interval for $\\mu$? (Use $z^*=1.645$.)",
              "choices": [
                "$20 \\pm 1.645\\cdot\\frac{5}{\\sqrt{100}} = 20 \\pm 1.645(0.5) = 20 \\pm 0.82$, i.e. $[19.18,\\ 20.82]$.",
                "$20 \\pm 1.96\\cdot\\frac{5}{\\sqrt{100}} = 20 \\pm 0.98$.",
                "$20 \\pm 1.645\\cdot 5 = 20 \\pm 8.2$.",
                "$20 \\pm \\frac{5}{100} = 20 \\pm 0.05$."
              ],
              "explain": "The CI is $\\bar X \\pm z^*\\frac{\\sigma}{\\sqrt n}$. The standard error is $\\frac{5}{\\sqrt{100}}=0.5$; for 90% confidence $z^*=1.645$, so the margin is $1.645\\times 0.5\\approx 0.82$, giving $[19.18,20.82]$. (Choice B uses $z^*=1.96$, the 95% value; choice C forgets to divide by $\\sqrt n$.)"
            },
            {
              "answer": 1,
              "q": "You increase the sample size $n$ for a 95% confidence interval. What happens to the interval and to its long-run capture rate?",
              "choices": [
                "Both the width and the capture rate increase.",
                "The interval gets *narrower* (margin $\\propto 1/\\sqrt n$), but the long-run capture rate stays at 95% — the capture rate is set by the confidence *level*, not by $n$.",
                "The capture rate rises above 95% as $n$ grows.",
                "Nothing changes; $n$ affects neither the width nor the capture rate."
              ],
              "explain": "More data shrinks the margin of error $z^*\\sigma/\\sqrt n$, so the interval narrows. But the fraction of such intervals that capture $\\mu$ over many repetitions is fixed by the chosen confidence level (95%), independent of $n$. Bigger samples buy *precision* (tighter bars), not a higher capture rate."
            },
            {
              "answer": 0,
              "q": "When the population $\\sigma$ is unknown you use the sample SD $s$, and the confidence interval switches from the normal $z$ to Student's $t$, making it slightly *wider*. Why wider?",
              "choices": [
                "Estimating $\\sigma$ with $s$ injects extra uncertainty (you are now estimating two things), so the reference curve has *heavier tails* than the normal — a larger critical value $t^*>z^*$, hence a wider interval.",
                "Because the $t$-distribution has a different mean than the normal.",
                "Because $s$ is always larger than $\\sigma$.",
                "Because the $t$-interval drops the $\\frac{1}{\\sqrt n}$ factor."
              ],
              "explain": "Replacing the true $\\sigma$ with the estimate $s$ adds uncertainty, so the correct reference is Student's $t_{n-1}$ — same bell center but heavier tails — whose critical value $t^*$ exceeds $z^*$, widening $\\bar X\\pm t^*\\frac{s}{\\sqrt n}$. As $n$ grows, $s\\to\\sigma$ and $t\\to$ normal, so the gap vanishes."
            },
            {
              "answer": 0,
              "q": "At a *fixed* sample size $n$, can you simultaneously raise the confidence level AND shrink the margin of error?",
              "choices": [
                "No — they trade off: higher confidence means a larger $z^*$, which *widens* the margin $z^*\\sigma/\\sqrt n$. To be both more confident and more precise you need more data (larger $n$).",
                "Yes — the margin of error does not depend on the confidence level.",
                "No, because raising the confidence level shrinks $\\sigma$.",
                "Yes — a higher confidence level automatically gives a tighter interval."
              ],
              "explain": "The margin is $z^*\\sigma/\\sqrt n$. At fixed $n$ and $\\sigma$, raising confidence raises $z^*$ (e.g. $1.96\\to 2.576$ going 95%→99%), so the interval widens — you buy confidence with precision. The only way to tighten the interval *and* raise confidence is to collect more data, which shrinks $\\sigma/\\sqrt n$."
            }
          ],
          "flashcards": [
            {
              "front": "Give the formula for a confidence interval for the mean with known $\\sigma$.",
              "back": "$\\bar{X}\\pm z^{*}\\,\\dfrac{\\sigma}{\\sqrt{n}}$, where $z^{*}=1.96$ for 95% (1.645 for 90%, 2.576 for 99%). The half-width $z^{*}\\sigma/\\sqrt{n}$ is the margin of error."
            },
            {
              "front": "What does \"95% confidence\" actually mean?",
              "back": "A property of the <em>procedure</em>: if you repeated the sampling and interval construction many times, ~95% of the intervals would contain the fixed true parameter. It is NOT a 95% probability that $\\mu$ is in this particular interval."
            },
            {
              "front": "Why is it wrong to say \"95% probability $\\mu$ is in this interval\"?",
              "back": "Once computed, the interval is fixed and $\\mu$ is fixed — it either contains $\\mu$ or not, no probability remains. The randomness is in the interval (which varies by sample), not the parameter."
            },
            {
              "front": "How does the margin of error depend on confidence, spread, and $n$?",
              "back": "$E=z^{*}\\sigma/\\sqrt{n}$: higher confidence (bigger $z^{*}$) and bigger $\\sigma$ widen it; larger $n$ narrows it but only as $\\sqrt{n}$. Sample size for a target margin: $n\\ge(z^{*}\\sigma/E)^2$."
            },
            {
              "front": "When and why do you use the $t$-distribution instead of the normal for a CI?",
              "back": "When the population $\\sigma$ is unknown and estimated by $s$. The extra uncertainty makes the reference curve Student's $t$ with $n-1$ d.f. (heavier tails → wider interval): $\\bar{X}\\pm t^{*}_{n-1}\\,s/\\sqrt{n}$. It converges to the normal as $n$ grows."
            },
            {
              "front": "How are confidence intervals used to compare two ML models?",
              "back": "Put error bars on each model's metric; if the intervals overlap substantially, the apparent difference may be noise. The bootstrap extends CIs to statistics with no closed-form sampling distribution."
            }
          ],
          "homework": [
            {
              "prompt": "A sample of $n=64$ has mean $\\bar{X}=120$ from a population with known $\\sigma=16$. Construct a 95% confidence interval for $\\mu$.",
              "hint": "Use $\\bar{X}\\pm 1.96\\,\\sigma/\\sqrt{n}$.",
              "solution": "$\\operatorname{SE}=16/\\sqrt{64}=16/8=2$. Margin $=1.96\\times 2=3.92$. CI $=120\\pm 3.92=[116.08,\\ 123.92]$. We are 95% confident (procedurally) that $\\mu$ lies in this range."
            },
            {
              "prompt": "Using the same data ($\\bar{X}=120$, $\\sigma=16$, $n=64$), build a 99% CI and explain why it is wider than the 95% CI.",
              "hint": "Swap $z^{*}=1.96$ for $z^{*}=2.576$.",
              "solution": "Margin $=2.576\\times 2=5.152$, so CI $=120\\pm 5.15=[114.85,\\ 125.15]$. It is wider than the 95% interval $[116.08, 123.92]$ because demanding a higher capture rate (99% vs 95%) forces a larger $z^{*}$, hence a bigger margin. Greater confidence costs precision at fixed $n$."
            },
            {
              "prompt": "You need a 95% confidence interval for a mean with margin of error at most $1$, and $\\sigma=10$. What sample size is required?",
              "hint": "Solve $n\\ge (z^{*}\\sigma/E)^2$ with $z^{*}=1.96$, $E=1$.",
              "solution": "$n\\ge\\left(\\frac{1.96\\times 10}{1}\\right)^2=(19.6)^2=384.16$, so round up to $n=385$. (Halving the target margin to $0.5$ would need $n\\ge 1537$ — roughly four times as many, the $\\sqrt{n}$ law.)"
            }
          ],
          "examples": [
            {
              "title": "Building and interpreting a 95% CI",
              "body": "A researcher measures the resting heart rate of $n=49$ adults, finding $\\bar{X}=72$ bpm. Assume the population standard deviation is known to be $\\sigma=10.5$ bpm. (i) Construct a 95% confidence interval for the mean resting heart rate. (ii) State precisely what the 95% means. (iii) A colleague says \"so there's a 95% chance the true mean is between your two numbers.\" Correct them.",
              "solution": "(i) $\\operatorname{SE}=\\frac{10.5}{\\sqrt{49}}=\\frac{10.5}{7}=1.5$. Margin $=1.96\\times 1.5=2.94$. CI $=72\\pm 2.94=[69.06,\\ 74.94]$ bpm.\n\n(ii) The 95% refers to the procedure: if we repeatedly sampled 49 adults and built such an interval each time, about 95% of those intervals would contain the true mean resting heart rate.\n\n(iii) The colleague's phrasing is the classic error. The true mean is a fixed (if unknown) number, and this particular interval $[69.06, 74.94]$ either contains it or not — there is no 95% probability attached to this one interval. The 95% is the long-run success rate of the method, not a probability about this specific interval."
            },
            {
              "title": "Known $\\sigma$ vs. unknown $\\sigma$: z vs. t",
              "body": "Two analysts each have a sample of $n=16$ with sample mean $\\bar{X}=40$. Analyst 1 knows the population $\\sigma=8$. Analyst 2 does not know $\\sigma$ and computes a sample standard deviation $s=8$. Explain which reference distribution each should use and why analyst 2's 95% interval is wider, given $z^{*}=1.96$ and $t^{*}_{15}\\approx 2.131$.",
              "solution": "Analyst 1 (known $\\sigma$) uses the normal: margin $=1.96\\cdot\\frac{8}{\\sqrt{16}}=1.96\\cdot 2=3.92$, CI $=40\\pm 3.92=[36.08, 43.92]$.\n\nAnalyst 2 (unknown $\\sigma$, estimated by $s$) must use Student's $t$ with $n-1=15$ d.f.: margin $=2.131\\cdot\\frac{8}{\\sqrt{16}}=2.131\\cdot 2=4.26$, CI $=40\\pm 4.26=[35.74, 44.26]$.\n\nAnalyst 2's interval is wider because estimating $\\sigma$ with $s$ adds uncertainty; the $t$-distribution's heavier tails ($t^{*}=2.131>1.96=z^{*}$) account for it. With a small sample ($n=16$) the gap is noticeable; for large $n$, $t^{*}\\to z^{*}$ and the two intervals nearly coincide."
            },
            {
              "title": "A 95% confidence interval for a proportion",
              "body": "In a poll, $60$ of $n = 100$ respondents favor a proposal, so the sample proportion is $\\hat{p} = 0.6$. Build a 95% confidence interval for the true proportion $p$.",
              "solution": "<strong>Standard error of a proportion.</strong> For a sample proportion, $\\mathrm{SE} = \\sqrt{\\hat{p}(1 - \\hat{p}) / n}$:\n$$\\mathrm{SE} = \\sqrt{\\frac{0.6 \\times 0.4}{100}} = \\sqrt{0.0024} \\approx 0.049.$$\n<strong>Margin of error.</strong> A 95% interval uses the critical value $z = 1.96$:\n$$E = 1.96 \\times 0.049 \\approx 0.096.$$\n<strong>The interval.</strong>\n$$\\hat{p} \\pm E = 0.6 \\pm 0.096 = [0.504,\\ 0.696].$$\nSo we are about 95% confident the true proportion lies between roughly 50% and 70%. The interval is wide because $n$ is small — quadrupling $n$ to 400 would halve the margin (it shrinks like $1/\\sqrt{n}$), the same $\\sqrt{n}$ law behind every confidence interval."
            }
          ]
        }
      ]
    },
    {
      "id": "ps-testing",
      "title": "Hypothesis Testing",
      "lessons": [
        {
          "id": "ps-hypothesis-testing-logic",
          "title": "The Logic of Hypothesis Testing",
          "minutes": 16,
          "content": "<h3>1. The hook: deciding whether an effect is real</h3>\n<p>A new drug lowers blood pressure by 4 points in a trial. A website redesign lifts clicks by 2%. Is the effect <em>real</em>, or could random sampling alone have produced a wobble that big? <strong>Hypothesis testing</strong> is the formal procedure for answering that question — a disciplined way to decide whether data are surprising enough, under a \"nothing is happening\" baseline, to warrant claiming an effect. It is the inferential counterpart to confidence intervals: instead of estimating a parameter, it adjudicates a claim about one.</p>\n\n<h3>2. The null and alternative hypotheses</h3>\n<p>Every test pits two complementary claims against each other:</p>\n<ul>\n<li>The <strong>null hypothesis</strong> $H_0$ — the skeptical default of \"no effect / no difference,\" e.g. $H_0:\\mu = \\mu_0$. It is the claim we provisionally assume true and try to overturn.</li>\n<li>The <strong>alternative hypothesis</strong> $H_1$ (or $H_a$) — the effect we suspect, e.g. $H_1:\\mu \\ne \\mu_0$ (two-sided) or $H_1:\\mu > \\mu_0$ (one-sided).</li>\n</ul>\n<p>The asymmetry is deliberate: the burden of proof is on the alternative. We never \"accept\" $H_0$; we only <em>reject</em> it or <em>fail to reject</em> it, exactly as a court returns \"guilty\" or \"not guilty,\" never \"innocent.\"</p>\n\n<h3>3. The test statistic and its null distribution</h3>\n<p>We compress the data into a single <strong>test statistic</strong> that measures how far the sample sits from what $H_0$ predicts, in units of standard error. For a mean with known $\\sigma$,\n$$z = \\frac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}}.$$\nThe crucial move: <em>assuming $H_0$ is true</em>, this statistic has a known <strong>null distribution</strong> (here, standard normal by the CLT). That known distribution is the ruler against which we judge how extreme our observed value is.</p>\n\n<h3>4. The logic: proof by contradiction</h3>\n<p>The reasoning is a probabilistic <em>reductio ad absurdum</em>. Assume $H_0$. Compute how unusual the observed data would be under that assumption. If the data fall in a region that $H_0$ makes very unlikely, we conclude $H_0$ is implausible and reject it. If the data are unremarkable under $H_0$, we have no grounds to reject — but this is <em>not</em> proof that $H_0$ is true, only absence of evidence against it.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>\"Innocent until proven guilty.\" $H_0$ (innocence) stands unless the evidence is too improbable to square with it. Failing to convict does not establish innocence — it means the evidence wasn't strong enough.</p>\n</div>\n\n<h3>5. The significance level and the rejection region</h3>\n<p>Before seeing data we fix a <strong>significance level</strong> $\\alpha$ — the threshold of \"too unlikely,\" and the probability we are willing to accept of <em>wrongly</em> rejecting a true $H_0$. Conventionally $\\alpha = 0.05$. This carves the null distribution into a <strong>rejection region</strong> (the extreme tails, total area $\\alpha$) and the rest. For a two-sided test at $\\alpha=0.05$, we reject when $|z| > 1.96$ — the same $1.96$ that built the $95\\%$ confidence interval, which is no coincidence.</p>\n\n<h3>6. One-sided vs. two-sided tests</h3>\n<p>A <strong>two-sided</strong> test ($H_1:\\mu\\ne\\mu_0$) splits $\\alpha$ between both tails and detects a deviation in either direction. A <strong>one-sided</strong> test ($H_1:\\mu>\\mu_0$) puts all of $\\alpha$ in one tail, giving more power to detect an effect in that direction — but only if you committed to the direction <em>before</em> seeing the data. Choosing the side after peeking is a form of cheating that secretly doubles your error rate.</p>\n\n<h3>7. Worked example: a one-sample test</h3>\n<p>A machine should fill bottles to $\\mu_0=500$ mL with known $\\sigma=5$ mL. A sample of $n=25$ averages $\\bar{X}=502.4$ mL. Test $H_0:\\mu=500$ vs $H_1:\\mu\\ne500$ at $\\alpha=0.05$. The standard error is $5/\\sqrt{25}=1$, so $z=\\frac{502.4-500}{1}=2.4$. Since $|2.4|>1.96$, the result falls in the rejection region — we reject $H_0$ and conclude the machine is over-filling. Had $\\bar{X}$ been $501.5$ ($z=1.5$), we would fail to reject: a 1.5-SE wobble is unremarkable under $H_0$.</p>\n\n<h3>8. Why this matters</h3>\n<p>Hypothesis testing is the grammar of empirical claims across every science, and in machine learning it underlies <strong>A/B testing</strong> (is the new model/feature genuinely better?), feature selection, and any \"is this difference significant?\" question. Knowing the logic — assume the null, measure surprise, reject only when the data are too extreme to ignore — inoculates you against the most common statistical errors, which the next lessons make explicit.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: hypothesis testing is proof by contradiction with a dial</summary>\n<p>The logic mirrors proof by contradiction. You assume the <b>null hypothesis</b> $H_0$ (no effect), then ask: <em>if</em> $H_0$ were true, how surprising would data this extreme be? That surprise is the <b>p-value</b>. When it falls below a threshold $\\alpha$ (often 0.05), the data are too unlikely under $H_0$ to keep believing it, so you reject.</p>\n<p>Two asymmetries trip people up. First, you can <em>reject</em> $H_0$ but never <em>prove</em> it — failing to reach significance means \"not enough evidence,\" not \"no effect\" (absence of evidence is not evidence of absence). Second, $\\alpha$ is the false-alarm rate you accept: at $\\alpha = 0.05$, one in twenty true nulls is rejected by chance, which is exactly why running many tests manufactures spurious \"findings.\"</p>\n<p>The \"aha\": the framework never reports \"the probability the hypothesis is true.\" It controls how often you cry wolf when there is no wolf — a guarantee about the <em>procedure</em>, not about any single conclusion.</p>\n</details>\n<h4>Try it in code</h4>\n<p>A z-test statistic measures how many standard errors the sample mean sits from the null-hypothesis mean: <code>z = (x̄ − μ₀) / (σ/√n)</code>. Run it for a sample mean of 52 (H₀: μ=50, σ=10, n=100):</p>\n<div data-code=\"javascript\" data-expected=\"2.00\">// z-test statistic: standard errors between the sample mean and the null mean.\nfunction zStat(xbar, mu0, sigma, n) {\n  return (xbar - mu0) / (sigma / Math.sqrt(n));\n}\nconsole.log(zStat(52, 50, 10, 100).toFixed(2));   // 2.00 -- two SEs above H0; beyond 1.96, reject at 5%</div>\n<h4>Interactive — p-value & rejection region</h4>\n<div data-viz=\"ps-hyptest\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: what a p-value is NOT (the prosecutor's fallacy)</summary>\n<p>A p-value is $P(\\text{data this extreme} \\mid H_0 \\text{ true})$ — the probability of your result <em>assuming the null hypothesis holds</em>. The most common error is reading it backwards as $P(H_0 \\text{ true} \\mid \\text{data})$, the probability the null is true given your data. These are <b>not</b> the same; Bayes' theorem relates them, and the flip depends on the prior.</p>\n<p>So $p = 0.03$ does <em>not</em> mean \"there is a 3% chance the null is true\" or \"a 97% chance the effect is real.\" It means: if there were truly no effect, data this extreme would arise 3% of the time. Symmetrically, a non-significant $p > 0.05$ does <em>not</em> prove $H_0$ — absence of evidence is not evidence of absence; the study may simply lack power. This reversed conditional is the <b>prosecutor's fallacy</b>: \"the evidence is unlikely if innocent\" misread as \"innocence is unlikely given the evidence.\"</p>\n<p>The \"aha\": the p-value lives entirely in the world where $H_0$ is true; it never reports the probability that $H_0$ is true. To get $P(H_0 \\mid \\text{data})$ you need a prior and Bayes' rule — exactly what frequentist testing declines to assume. Keep the conditional direction straight and most \"statistics gone wrong\" headlines dissolve.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: statistical vs practical significance</summary>\n<p>A result can be \"statistically significant\" and yet <em>completely unimportant</em>. Significance answers \"is the effect distinguishable from zero?\" — <em>not</em> \"is the effect big enough to care about?\"</p>\n<p><b>Significance scales with sample size.</b> The test statistic grows like $\\sqrt{n}$, so with a <em>large enough</em> sample, <em>any</em> nonzero effect — however tiny — crosses $p \\lt 0.05$. A drug that lowers blood pressure by $0.1$ mmHg will be \"highly significant\" in a study of a million people. A small p-value means \"probably not exactly zero,\" which is a much weaker claim than \"matters.\"</p>\n<p><b>Report the effect size and its interval.</b> The fix is to report <em>how big</em> the effect is (a difference in means, a correlation, Cohen's $d$) <em>with a confidence interval</em>, not just a p-value. The CI shows both the plausible magnitude and the uncertainty: a 95% CI of $[0.05, 0.15]$ mmHg is \"significant\" but practically nil; $[8, 14]$ mmHg is significant <em>and</em> meaningful. (Conversely, a non-significant result with a wide CI may just mean too little data, not \"no effect.\")</p>\n<p>The \"aha\": $p \\lt 0.05$ tells you an effect is probably real, not that it is large. With big data everything is significant, so the question that matters — \"is it big enough to act on?\" — is answered by effect sizes and confidence intervals, not by the p-value alone.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A trial reports a sample mean blood-pressure drop of 4 points. What is the precise question hypothesis testing is built to answer?",
              "choices": [
                "What is the true average blood-pressure drop in the population?",
                "Could random sampling alone, with no real effect, have produced a wobble at least this large?",
                "How large a sample is needed to estimate the drop to within 1 point?",
                "What prior probability should we assign to the drug working?"
              ],
              "answer": 1,
              "explain": "Hypothesis testing adjudicates a claim by asking whether the data are too extreme to be plausibly explained by chance under a 'no effect' baseline. Estimating the parameter itself (choice A) is the job of a confidence interval, the inferential counterpart, not the test."
            },
            {
              "q": "In the court analogy, $H_0$ plays the role of 'innocent.' Which verdict has no counterpart in a hypothesis test?",
              "choices": [
                "'Guilty' (reject $H_0$)",
                "'Not guilty' (fail to reject $H_0$)",
                "'Innocent' (accept $H_0$ as true)",
                "'Guilty beyond reasonable doubt' (reject $H_0$ at a small $\\alpha$)"
              ],
              "answer": 2,
              "explain": "A test only rejects or fails to reject $H_0$; it never affirmatively 'accepts' or proves $H_0$, just as a court returns 'guilty' or 'not guilty' but never declares 'innocent.' Failing to reject is absence of evidence against $H_0$, not proof of it. Choices A and D both map onto rejecting $H_0$ (just at different stringency), and B maps onto failing to reject, so only 'innocent' lacks a counterpart."
            },
            {
              "q": "What does it mean to say a test statistic $z=\\frac{\\bar X-\\mu_0}{\\sigma/\\sqrt n}$ has a 'null distribution'?",
              "choices": [
                "The distribution of $z$ computed under the assumption that $H_0$ is true",
                "The distribution of the raw data $X$ in the population",
                "The distribution of $z$ under the alternative $H_1$",
                "The distribution of $z$ averaged over all possible values of $\\mu$"
              ],
              "answer": 0,
              "explain": "The null distribution is the distribution the statistic follows assuming $H_0$ holds (here standard normal by the CLT). It is the ruler against which the observed value is judged; the distribution under $H_1$ (choice C) is a different object used for power."
            },
            {
              "q": "A machine should fill to $\\mu_0=500$ mL with known $\\sigma=5$ mL. A sample of $n=100$ averages $\\bar X=501$ mL. For a two-sided test at $\\alpha=0.05$, what is $z$ and the decision?",
              "choices": [
                "$z=2.0$; reject $H_0$",
                "$z=0.2$; fail to reject $H_0$",
                "$z=2.0$; fail to reject $H_0$",
                "$z=1.0$; fail to reject $H_0$"
              ],
              "answer": 0,
              "explain": "The standard error is $\\sigma/\\sqrt n=5/\\sqrt{100}=0.5$, so $z=(501-500)/0.5=2.0$. Since $|z|=2.0>1.96$, we reject $H_0$. Choice B divides by $\\sigma=5$ instead of the SE; choice C has the right $z$ but the wrong decision; choice D has the wrong $z$."
            },
            {
              "q": "At $\\alpha=0.05$, why does a two-sided z-test reject when $|z|>1.96$ rather than, say, $|z|>1.645$?",
              "choices": [
                "Because 1.96 leaves total area 0.05 split across both tails (0.025 each), matching a two-sided $\\alpha=0.05$",
                "Because 1.96 is the mean of the standard normal distribution",
                "Because 1.645 is only used when $\\sigma$ is unknown",
                "Because 1.96 corresponds to a one-sided test and 1.645 to a two-sided test"
              ],
              "answer": 0,
              "explain": "A two-sided test splits $\\alpha$ between both tails, so each tail has area 0.025, whose cutoff is 1.96. The 1.645 cutoff puts all 0.05 in one tail and is the one-sided value — the opposite of choice D."
            },
            {
              "q": "A researcher runs a two-sided test, sees the data point upward, and then switches to a one-sided test ($H_1:\\mu>\\mu_0$) to clear $\\alpha=0.05$. Why is this illegitimate?",
              "choices": [
                "One-sided tests are always invalid regardless of when the direction is chosen",
                "Choosing the direction after seeing the data lets the data both pick and test the hypothesis, secretly inflating the true Type I error rate",
                "One-sided tests have less power than two-sided tests, so switching loses information",
                "The cutoff for a one-sided test is larger, so the result cannot actually become significant"
              ],
              "answer": 1,
              "explain": "The direction must be committed to before seeing data; picking it post hoc to match the observed direction is double-dipping that effectively doubles the error rate (both tails are implicitly in play). One-sided tests are perfectly valid when the direction is pre-specified, so choice A is wrong."
            },
            {
              "q": "A factory claims batteries last $\\mu_0=40$ h with known $\\sigma=4$ h. A group tests $n=64$ and finds $\\bar X=39.0$ h, using a one-sided test $H_1:\\mu<40$ at $\\alpha=0.05$ (reject if $z<-1.645$). What is the decision?",
              "choices": [
                "$z=-2.0$; reject $H_0$ — significant evidence the mean is below 40",
                "$z=-0.5$; fail to reject $H_0$",
                "$z=-2.0$; fail to reject $H_0$ because $|z|<1.96$",
                "$z=-1.0$; reject $H_0$"
              ],
              "answer": 0,
              "explain": "SE $=4/\\sqrt{64}=0.5$, so $z=(39-40)/0.5=-2.0$, and $-2.0<-1.645$, so we reject. Choice C wrongly applies the two-sided 1.96 cutoff to a one-sided test."
            },
            {
              "q": "Two analysts test $H_0:\\mu=\\mu_0$ at $\\alpha=0.05$ (two-sided). Analyst A builds the 95% CI $\\bar X\\pm1.96\\,\\sigma/\\sqrt n$ and checks whether it contains $\\mu_0$; Analyst B checks whether $|z|>1.96$. How do their conclusions relate?",
              "choices": [
                "They can disagree because the CI and the test use different critical values",
                "They agree only for one-sided tests",
                "They always agree: B rejects exactly when A's interval excludes $\\mu_0$",
                "B is correct; the CI method cannot be used to make a reject decision"
              ],
              "answer": 2,
              "explain": "Rejecting means $|\\bar X-\\mu_0|>1.96\\,\\sigma/\\sqrt n$, which is exactly the condition that $\\mu_0$ lies outside the 95% CI. The two procedures are algebraically identical and use the same 1.96, so they never disagree."
            },
            {
              "q": "A test yields $z=1.2$ and the analyst writes: 'We fail to reject $H_0$, which proves there is no effect.' What is the flaw?",
              "choices": [
                "Nothing — failing to reject is equivalent to proving $H_0$",
                "$z=1.2$ always rejects at $\\alpha=0.05$",
                "The analyst should have rejected $H_0$ because $z>0$",
                "Failing to reject means only that the data weren't extreme enough to overturn $H_0$; it is absence of evidence against an effect, not evidence of no effect"
              ],
              "answer": 3,
              "explain": "A non-significant result never proves $H_0$ — the effect could be real but small or the study underpowered. This is the 'absence of evidence is not evidence of absence' fallacy, parallel to 'not guilty' vs 'innocent.'"
            },
            {
              "q": "Why is the test statistic divided by the standard error $\\sigma/\\sqrt n$ rather than just reporting the raw gap $\\bar X-\\mu_0$?",
              "choices": [
                "To remove the dependence on $\\bar X$ entirely",
                "Because dividing by the standard error always makes the statistic equal to 1",
                "To convert the gap into units of sampling variability, so its extremeness can be judged against a known null distribution",
                "Because the standard error equals the significance level $\\alpha$"
              ],
              "answer": 2,
              "explain": "Standardizing expresses how many standard errors the sample sits from $\\mu_0$, putting the gap on a scale whose null distribution (here standard normal) is known. A raw 2 mL gap is meaningless until you know whether that is 0.1 or 4 standard errors away."
            },
            {
              "q": "Holding $\\bar X=502.4$, $\\mu_0=500$, and $\\sigma=5$ fixed, the experimenter increases the sample size $n$. What happens to the magnitude of the test statistic $z$?",
              "choices": [
                "It stays the same, since $z$ does not depend on $n$",
                "It decreases, because larger samples are noisier",
                "It increases, because the standard error $\\sigma/\\sqrt n$ shrinks",
                "It becomes negative"
              ],
              "answer": 2,
              "explain": "$z=(\\bar X-\\mu_0)/(\\sigma/\\sqrt n)$ has $\\sqrt n$ in the numerator effectively, since the denominator $\\sigma/\\sqrt n$ shrinks as $n$ grows. The same fixed gap becomes more standard errors out, making it easier to exceed the rejection cutoff — the engine behind statistical power."
            },
            {
              "q": "The significance level $\\alpha=0.05$ is fixed before seeing the data. Which statement best describes what $\\alpha$ commits you to?",
              "choices": [
                "A 5% probability that $H_0$ is true given the data",
                "A willingness to wrongly reject a true $H_0$ about 5% of the time",
                "A guarantee that the observed effect is real with 95% probability",
                "A rule that 5% of the sample will fall outside the interval"
              ],
              "answer": 1,
              "explain": "$\\alpha$ is the probability of rejecting $H_0$ when it is actually true (the false-alarm rate you accept in advance). It is not a probability about $H_0$ given the data (choice A reverses the conditional) nor a guarantee about the effect being real."
            },
            {
              "q": "A researcher tests whether a new drug *lowers* blood pressure. She is confident it cannot raise it, so she considers a one-sided test ($H_1: \\mu < \\mu_0$) instead of a two-sided test. At the same significance level $\\alpha$, what is the chief tradeoff she accepts?",
              "choices": [
                "The one-sided test has no rejection region, so it can never reject $H_0$",
                "The one-sided test requires a larger sample to reach the same power",
                "The one-sided test always produces a smaller p-value regardless of the data",
                "The one-sided test puts all of $\\alpha$ in one tail, giving more power to detect a decrease — but she must commit to the direction *before* seeing the data, and is blind to an increase"
              ],
              "answer": 3,
              "explain": "Concentrating the whole rejection probability $\\alpha$ in a single tail makes a true decrease easier to detect (more power). The price: the direction must be fixed in advance, and the test cannot register an effect in the opposite direction."
            },
            {
              "q": "Hypothesis testing is often described as a \"proof by contradiction\" adapted for noisy data. Which description best captures this logic?",
              "choices": [
                "We assume $H_1$ is true, then check whether the data are consistent with it",
                "We tentatively assume $H_0$ is true, compute how improbable the observed data (or something more extreme) would be under that assumption, and reject $H_0$ only if that improbability is severe enough",
                "We prove $H_0$ false with logical certainty, exactly as in mathematical proof by contradiction",
                "We accept whichever hypothesis has the higher prior probability"
              ],
              "answer": 1,
              "explain": "We provisionally grant $H_0$, then ask how surprising the data are under it. Unlike a mathematical contradiction (which is certain), the conclusion is probabilistic — strong surprise warrants rejecting $H_0$, but never proves it false with certainty."
            },
            {
              "q": "A machine should fill bottles to $\\mu_0 = 200$ ml with known $\\sigma = 20$ ml. An inspector worried about *under*filling tests $H_0: \\mu = 200$ vs $H_1: \\mu < 200$ at $\\alpha = 0.05$ (critical value $-1.645$). A sample of $n = 100$ bottles has mean $\\bar{x} = 196$ ml. What is the conclusion?",
              "choices": [
                "$z = -0.2$; fail to reject $H_0$ — the evidence of underfilling is weak",
                "$z = -2.0$, but since $|{-2.0}| < 1.96$ for a two-sided test, fail to reject $H_0$",
                "$z = -4.0$; reject $H_0$",
                "$z = -2.0$, which is below the critical value $-1.645$, so reject $H_0$ — significant evidence of underfilling"
              ],
              "answer": 3,
              "explain": "The standard error is $\\sigma/\\sqrt{n} = 20/\\sqrt{100} = 2$, so $z = (196-200)/2 = -2.0$. For the one-sided test the cutoff is $-1.645$, and $-2.0 < -1.645$, so reject $H_0$. (Choice 2 forgets the $\\sqrt{n}$; choice 1 wrongly applies a two-sided cutoff.)"
            },
            {
              "q": "An education startup claims its app improves test scores. To test this claim fairly, how should the hypotheses be set up, and what can a test conclude?",
              "choices": [
                "If we fail to reject $H_0$, we have proven the app definitely does nothing",
                "$H_0$: the app improves scores; $H_1$: no improvement — the startup's claim should be the null since it is what they assert",
                "$H_0$ and $H_1$ can be assigned either way; the choice has no effect on the conclusion",
                "$H_0$: the app gives *no* improvement; $H_1$: the app improves scores. The burden of proof is on the app — we either reject $H_0$ (evidence of improvement) or fail to reject it, but we never *accept* $H_0$ as proven true"
              ],
              "answer": 3,
              "explain": "The null is the skeptical \"no effect\" default; the claim being argued for is $H_1$, so the burden of proof falls on the data to overturn $H_0$. A non-significant result is \"not enough evidence,\" never proof that $H_0$ is true."
            }
          ],
          "flashcards": [
            {
              "front": "What are the null and alternative hypotheses, and why is the setup asymmetric?",
              "back": "$H_0$ = the skeptical \"no effect\" default we assume and try to disprove (e.g. $\\mu=\\mu_0$); $H_1$ = the suspected effect. The burden of proof is on $H_1$: we only reject or fail to reject $H_0$, never \"accept\" it — like guilty / not-guilty."
            },
            {
              "front": "What is a test statistic and its null distribution?",
              "back": "A single number measuring how far the data sit from $H_0$ in standard-error units (e.g. $z=\\frac{\\bar X-\\mu_0}{\\sigma/\\sqrt n}$). Its <em>null distribution</em> is the distribution it follows <em>assuming $H_0$ is true</em> (here standard normal) — the ruler for judging extremeness."
            },
            {
              "front": "Explain the proof-by-contradiction logic of a hypothesis test.",
              "back": "Assume $H_0$; compute how unlikely the observed data are under it. If they're too improbable (fall in the rejection region), reject $H_0$. If not, fail to reject — which is absence of evidence against $H_0$, NOT proof it's true."
            },
            {
              "front": "What is the significance level $\\alpha$?",
              "back": "A pre-chosen threshold (commonly 0.05) for \"too unlikely,\" equal to the probability of wrongly rejecting a true $H_0$ (the Type I error rate). It defines the rejection region as the extreme tails of total area $\\alpha$."
            },
            {
              "front": "One-sided vs. two-sided test — what's the difference and the pitfall?",
              "back": "Two-sided ($H_1:\\mu\\ne\\mu_0$) splits $\\alpha$ across both tails (deviation either way); one-sided ($H_1:\\mu>\\mu_0$) puts all $\\alpha$ in one tail (more power, one direction). Pitfall: choosing the side <em>after</em> seeing data secretly doubles the error rate."
            },
            {
              "front": "Why do we say \"fail to reject $H_0$\" instead of \"accept $H_0$\"?",
              "back": "A non-significant result means the data weren't extreme enough to rule out $H_0$, not that $H_0$ is true — absence of evidence isn't evidence of absence. Like \"not guilty\" rather than \"innocent.\""
            }
          ],
          "homework": [
            {
              "prompt": "A coin is tested for fairness: $H_0:p=0.5$ vs $H_1:p\\ne 0.5$. In 100 flips you observe 62 heads; the standard error of the proportion under $H_0$ is $\\sqrt{0.5\\cdot0.5/100}=0.05$. Compute the test statistic and decide at $\\alpha=0.05$ (reject if $|z|>1.96$).",
              "hint": "$z=(\\hat p - p_0)/\\operatorname{SE}$ with $\\hat p=0.62$, $p_0=0.5$.",
              "solution": "$z=\\frac{0.62-0.5}{0.05}=\\frac{0.12}{0.05}=2.4$. Since $|2.4|>1.96$, reject $H_0$: the coin shows significant evidence of bias toward heads at the 5% level. (62 heads is 2.4 standard errors from the 50 expected under fairness — too far to attribute to chance.)"
            },
            {
              "prompt": "Explain why \"we failed to reject $H_0$, so the drug has no effect\" is a logical error. What would be a correct statement?",
              "hint": "Think about absence of evidence vs. evidence of absence, and the role of sample size/power.",
              "solution": "Failing to reject only means the data weren't strong enough to overturn $H_0$ — perhaps the effect is real but small, or the sample too tiny to detect it. The test never proves $H_0$. A correct statement: \"we did not find statistically significant evidence of an effect at this sample size,\" leaving open that an effect may exist (a question of power, covered later)."
            },
            {
              "prompt": "A researcher runs a two-sided test and gets $z=1.8$, which is not significant at $\\alpha=0.05$ ($|z|<1.96$). They then switch to a one-sided test in the observed direction to get significance. Why is this invalid, and what is the actual error rate of this practice?",
              "hint": "The direction must be chosen before seeing the data. Consider how peeking affects the true Type I error rate.",
              "solution": "Choosing the test direction after seeing which way the data point is \"double-dipping\": the data both pick the hypothesis and test it. A one-sided test at $\\alpha=0.05$ has a $1.645$ cutoff, but because the direction was chosen post hoc to match the data, the <em>true</em> Type I error rate is effectively $0.10$ (both tails are implicitly in play), not $0.05$. The result is not legitimately significant."
            }
          ],
          "examples": [
            {
              "title": "A one-sample z-test, step by step",
              "body": "A factory claims its batteries last $\\mu_0=40$ hours on average, with known $\\sigma=4$ hours. A consumer group tests $n=64$ batteries and finds $\\bar{X}=39.0$ hours. At $\\alpha=0.05$, is there significant evidence the true mean is below 40? Use a one-sided test $H_1:\\mu<40$.",
              "solution": "Set up: $H_0:\\mu=40$, $H_1:\\mu<40$, $\\alpha=0.05$ (one-sided, so reject if $z<-1.645$).\n\nStandard error: $\\operatorname{SE}=\\sigma/\\sqrt n=4/\\sqrt{64}=4/8=0.5$.\n\nTest statistic: $z=\\dfrac{\\bar X-\\mu_0}{\\operatorname{SE}}=\\dfrac{39.0-40}{0.5}=\\dfrac{-1.0}{0.5}=-2.0$.\n\nDecision: $-2.0<-1.645$, so we reject $H_0$. There is significant evidence at the 5% level that the batteries last less than the claimed 40 hours. (Note: a one-tailed $z$ of $-2.0$ has a p-value $\\approx 0.023<0.05$, consistent with rejection.)"
            },
            {
              "title": "Why the rejection cutoff equals the CI multiplier",
              "body": "A two-sided test of $H_0:\\mu=\\mu_0$ at $\\alpha=0.05$ rejects when $|z|>1.96$. Show this is exactly equivalent to checking whether $\\mu_0$ falls outside the 95% confidence interval $\\bar X\\pm 1.96\\,\\sigma/\\sqrt n$.",
              "solution": "Rejecting means $\\left|\\dfrac{\\bar X-\\mu_0}{\\sigma/\\sqrt n}\\right|>1.96$, i.e. $|\\bar X-\\mu_0|>1.96\\,\\dfrac{\\sigma}{\\sqrt n}$. That inequality says $\\mu_0$ is more than one margin-of-error away from $\\bar X$ — precisely the condition that $\\mu_0$ lies <em>outside</em> $\\bar X\\pm 1.96\\,\\sigma/\\sqrt n$, the 95% CI. So a two-sided level-$\\alpha$ test and the $(1-\\alpha)$ confidence interval are two views of the same computation: reject $H_0:\\mu=\\mu_0$ exactly when the CI excludes $\\mu_0$. This duality is why both use the same critical value $1.96$."
            },
            {
              "title": "One-sided vs two-sided: same data, different cutoff",
              "body": "A z-statistic is $z = 1.8$. At significance $\\alpha = 0.05$, do you reject the null with a one-sided test? With a two-sided test?",
              "solution": "<strong>One-sided puts all of the budget in one tail.</strong> The critical value is $z_{0.05} = 1.645$. Since $1.8 \\gt 1.645$, you <b>reject</b> $H_0$ — significant for a directional (\"greater than\") hypothesis.\n<strong>Two-sided splits the budget between both tails.</strong> Each tail gets $\\alpha/2 = 0.025$, so the critical value is $z_{0.025} = 1.96$. Now $1.8 \\lt 1.96$, so you <b>fail to reject</b> — the very same data is <em>not</em> significant.\n<strong>Why the cutoff moves.</strong> A two-sided test guards against deviations in <em>either</em> direction, so it spreads its error budget across both tails, raising the bar in each. A one-sided test stakes everything on a pre-chosen direction, buying more power there — but it cannot detect an effect the other way.\n<strong>The aha.</strong> Significance is not a property of the data alone — it depends on the hypothesis you set <em>before</em> looking. The choice of one- versus two-sided (and which direction) must be fixed in advance; switching to one-sided after seeing the data to scrape under $0.05$ is a classic form of p-hacking."
            }
          ]
        },
        {
          "id": "ps-p-values",
          "title": "P-values & Statistical Significance",
          "minutes": 15,
          "content": "<h3>1. The hook: one number for \"how surprising?\"</h3>\n<p>Rather than only reporting reject / fail-to-reject, we can quantify <em>how</em> surprising the data are under the null with a single number: the <strong>p-value</strong>. It is the most reported — and most misunderstood — quantity in all of empirical science. Getting its definition exactly right is the difference between sound inference and the errors that fuel the replication crisis.</p>\n\n<h3>2. What a p-value is</h3>\n<p>The <strong>p-value</strong> is the probability, <em>assuming the null hypothesis is true</em>, of obtaining a test statistic at least as extreme as the one actually observed:\n$$p = P\\big(\\text{statistic at least as extreme as observed} \\,\\big|\\, H_0\\big).$$\nA small p-value means the data would be very unusual if $H_0$ held, which counts as evidence against $H_0$. For a two-sided test it sums both tails beyond $\\pm|z|$; for a one-sided test, the single tail.</p>\n\n<h3>3. The decision rule</h3>\n<p>The p-value connects directly to the significance level: <strong>reject $H_0$ when $p \\le \\alpha$.</strong> This is identical to the rejection-region rule — the observed statistic lands in the tail of area $\\alpha$ exactly when its tail-probability $p$ is at most $\\alpha$. Reporting $p$ instead of a bare reject/fail decision is more informative: it lets each reader apply their own threshold and see how borderline (or overwhelming) the evidence is.</p>\n<p>Drag the observed statistic in the explorer below to make this concrete: the <span style=\"color:#e0a458\">gold</span> tail area <em>is</em> the p-value, the <span style=\"color:#d2715a\">rust</span> tails are the rejection region of total area α, and you reject exactly when the gold spills into the rust (p ≤ α). Switch between one- and two-sided tests and change α to watch the threshold move.</p>\n<div data-viz=\"ps-hypothesis-test\"></div>\n\n<h3>4. What a p-value is NOT (read twice)</h3>\n<p>Nearly every famous misuse is a confusion of conditional direction or of evidence with truth:</p>\n<ul>\n<li>It is <strong>not</strong> the probability that $H_0$ is true. The p-value is computed <em>assuming</em> $H_0$; it cannot also be a probability <em>about</em> $H_0$. ($P(\\text{data}\\mid H_0)\\ne P(H_0\\mid \\text{data})$.)</li>\n<li>It is <strong>not</strong> the probability the result was \"due to chance,\" nor $1-p$ the probability the alternative is true.</li>\n<li>A <strong>large</strong> p-value does <strong>not</strong> prove $H_0$ — it just fails to provide evidence against it.</li>\n<li>$p=0.04$ vs $p=0.06$ is not a categorical difference in reality; the $0.05$ line is a convention, not a law of nature.</li>\n</ul>\n<div class=\"callout sage\">\n<div class=\"c-tag\">The one-sentence definition to memorize</div>\n<p>A p-value answers \"<em>if there were truly no effect, how often would I see data this extreme or more?</em>\" — nothing about how probable the effect itself is.</p>\n</div>\n\n<h3>5. Statistical vs. practical significance</h3>\n<p>\"Statistically significant\" means \"unlikely under $H_0$,\" <em>not</em> \"large\" or \"important.\" With a huge sample, a trivially small effect — a 0.1% difference no one would care about — can be highly significant ($p<0.001$), because the standard error is tiny. Conversely a big, important effect can be non-significant in a small, noisy study. Always read the <strong>effect size</strong> and confidence interval alongside the p-value: significance tells you an effect is probably real; only the effect size tells you if it matters.</p>\n\n<h3>6. Multiple comparisons and p-hacking</h3>\n<p>If you run 20 independent tests of true nulls at $\\alpha=0.05$, you expect about one \"significant\" result <em>by chance alone</em>. Testing many hypotheses, or tweaking the analysis until $p$ dips below $0.05$ (<strong>p-hacking</strong>), inflates the real false-positive rate far above the nominal $\\alpha$. Remedies include pre-registering the analysis and corrections (e.g. Bonferroni, which divides $\\alpha$ by the number of tests). This is a leading cause of irreproducible findings.</p>\n\n<h3>7. Worked example</h3>\n<p>A two-sided test yields $z=2.0$. The p-value is the two-tailed area beyond $\\pm2.0$: each tail is about $0.0228$, so $p\\approx 2(0.0228)=0.046$. Since $0.046 \\le 0.05$, reject $H_0$ at the 5% level — but only just. A reader with a stricter $\\alpha=0.01$ would <em>not</em> reject, which is exactly why reporting $p=0.046$ is more useful than reporting \"significant.\"</p>\n\n<p>Compute a p-value from scratch — a one-sample z-test, with the standard-normal CDF done by a classic numerical approximation:</p>\n<div data-code=\"javascript\" data-expected=\"z = 2.00, two-tailed p = 0.0455\">// One-sample z-test: is the mean different from the null value mu0?\nconst xbar = 5.2, mu0 = 5.0, sigma = 1.0, n = 100;\nconst se = sigma / Math.sqrt(n);          // standard error of the mean\nconst z = (xbar - mu0) / se;              // how many SEs away the sample mean sits\n// standard-normal CDF (Abramowitz-Stegun 26.2.17)\nconst t = 1 / (1 + 0.2316419 * Math.abs(z));\nconst phi = Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);\nconst cdf = 1 - phi * (0.319381530 * t - 0.356563782 * t * t + 1.781477937 * Math.pow(t, 3) - 1.821255978 * Math.pow(t, 4) + 1.330274429 * Math.pow(t, 5));\nconst p = 2 * (1 - cdf);                  // two-tailed p-value\nconsole.log(\"z = \" + z.toFixed(2) + \", two-tailed p = \" + p.toFixed(4));</div>\n<h3>8. Why this matters for machine learning</h3>\n<p>P-values gate A/B-test decisions (\"ship the new model?\"), guard against reading noise as signal when comparing systems, and appear in feature-importance screens. The multiple-comparisons trap is acute in ML, where practitioners try dozens of models, features, and seeds — without correction, some will look \"significant\" purely by chance. Understanding what $p$ does and does not say is essential to not fooling yourself.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: what a p-value is NOT — the reversed conditional that fools everyone</summary>\n<p>The single most common error in all of statistics is reading a p-value backwards. A p-value is $P(\\mathrm{data\\ this\\ extreme} \\mid H_0\\ \\mathrm{true})$ — the probability of your result <em>assuming the null is true</em>. It is <b>not</b> $P(H_0\\ \\mathrm{true} \\mid \\mathrm{data})$, the probability the null is true given your result. Those are different quantities, and swapping them is the \"prosecutor's fallacy\": \"the evidence is unlikely if innocent\" is not \"the defendant is probably guilty.\"</p>\n<p>Why the gap matters: a tiny p-value says the data would be <em>surprising</em> if $H_0$ held — it does not say $H_0$ is improbable, because that also depends on the <b>base rate</b> (how plausible $H_0$ was to begin with). Test a thousand dead hypotheses at $\\alpha = 0.05$ and you still get about fifty \"significant\" results. Reversing the conditional correctly needs Bayes' theorem and a prior; the p-value alone simply cannot deliver $P(H_0 \\mid \\mathrm{data})$.</p>\n<p>The \"aha\": significance is a statement about the <em>data under a hypothesis</em>, never about the hypothesis itself. And it says nothing about <b>size</b> — with a large enough $n$, a difference too small to matter becomes \"highly significant,\" because the p-value measures <em>evidence against</em> $H_0$, not the <em>magnitude</em> of the effect. Always report an effect size and a confidence interval beside it.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: p-hacking and multiple comparisons</summary>\n<p>A single $p \\lt 0.05$ sounds convincing — until you ask <em>how many tests were run</em>. Multiplicity is the most common way significance lies.</p>\n<p><b>The multiple-comparisons problem.</b> Each test at $\\alpha = 0.05$ has a 5% false-positive rate <em>when the null is true</em>. Run <em>many</em> tests and false positives pile up: across 20 tests, the expected number of spurious \"hits\" is $20 \\times 0.05 = 1$, and the chance of at least one is $1 - 0.95^{20} \\approx 64\\%$. Test enough subgroups, endpoints, or variables and you are almost <em>guaranteed</em> a significant-looking result from pure noise.</p>\n<p><b>p-hacking.</b> The same trap, often unintentional: trying many analyses (different subsets, covariates, cutoffs) and reporting only the one that crossed $0.05$. The reported p-value is then meaningless — it ignores all the tests that did not work.</p>\n<p><b>The fixes.</b> <b>Bonferroni</b>: test each at $\\alpha/m$ (for 20 tests, $0.0025$) so the <em>family-wide</em> error stays at 5% — simple but conservative. <b>False discovery rate</b> (Benjamini–Hochberg) controls the <em>proportion</em> of false positives among rejections — less strict, standard in genomics. And <b>pre-registration</b> fixes the analysis in advance so you cannot fish.</p>\n<p>The \"aha\": \"$p \\lt 0.05$\" is a statement about <em>one</em> test. The moment you run many — explicitly or by exploring — you must correct for it, or your single significant result is probably just the luckiest of many tries. Always ask: significant out of <em>how many</em>?</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the replication crisis (and how to do better)</summary>\n<p>The misuse of p-values (the other dives) is not just pedantry — it fueled a real <strong>replication crisis</strong>: across psychology, medicine, and beyond, a large fraction of \"significant\" published findings fail to reproduce.</p>\n<p><b>How $p \\lt 0.05$ went wrong.</b> Treating $0.05$ as a magic threshold, combined with <em>publication bias</em> (only significant results get published) and <em>p-hacking</em> (trying many analyses until one crosses the line), guarantees a stream of false positives in the literature. If only \"$p \\lt 0.05$\" results are published and many were flukes or fished, the published record overstates real effects — and follow-up studies cannot replicate them.</p>\n<p><b>Doing better.</b> The reforms: report <em>effect sizes and confidence intervals</em>, not just a significance verdict (how big is the effect, with what uncertainty?); <em>pre-register</em> hypotheses and analysis plans before collecting data (so you cannot p-hack); run and value <em>replication</em> studies; lower or contextualize thresholds; and consider <em>Bayesian</em> methods that report the probability of hypotheses directly. As a 2016 American Statistical Association statement put it: a p-value is one piece of evidence, never the whole story.</p>\n<p>The \"aha\": the p-value's flaws scaled into a field-wide crisis once a 0.05 cutoff met publication bias and p-hacking. The fix is not a better threshold — it is better practice: effect sizes + CIs, pre-registration, replication, and never mistaking \"statistically significant\" for \"true\" or \"important.\"</p>\n</details>\n",
          "mcq": [
            {
              "q": "A researcher reports $p = 0.03$ for a two-sided test. Which statement correctly interprets this number?",
              "choices": [
                "There is a 3% probability that the null hypothesis is true.",
                "There is a 97% probability that the alternative hypothesis is true.",
                "If $H_0$ were true, there is a 3% probability of observing a test statistic at least as extreme as the one seen.",
                "The effect observed has a 3% chance of being due to random error in the future."
              ],
              "answer": 2,
              "explain": "The p-value is computed assuming $H_0$ is true: it is $P(\\text{statistic at least as extreme}\\mid H_0)$. It is NOT $P(H_0\\mid\\text{data})$, which is the classic inversion-of-conditioning misconception behind choices about 'probability the null is true'."
            },
            {
              "q": "For a two-sided z-test, the observed statistic is $z = 1.5$. Using $P(Z > 1.5) \\approx 0.067$, what is the p-value?",
              "choices": [
                "$0.067$",
                "$0.134$",
                "$0.933$",
                "$0.0335$"
              ],
              "answer": 1,
              "explain": "A two-sided test sums both tails beyond $\\pm|z|$, so $p = 2\\,P(Z>1.5) \\approx 2(0.067) = 0.134$. Reporting only one tail ($0.067$) would understate the p-value for a two-sided alternative."
            },
            {
              "q": "A one-sided test gives a p-value of $0.04$. If the SAME data were analyzed with a two-sided test (symmetric distribution), what would the two-sided p-value be?",
              "choices": [
                "$0.02$",
                "$0.08$",
                "$0.04$",
                "$0.96$"
              ],
              "answer": 1,
              "explain": "For a symmetric distribution the two-sided p-value sums both tails, doubling the single-tail probability: $2 \\times 0.04 = 0.08$. Halving (to $0.02$) goes the wrong direction — one-sided tests use a single tail and thus give the smaller value."
            },
            {
              "q": "Two studies test the same hypothesis with $\\alpha = 0.05$. Study A reports $p = 0.049$ and Study B reports $p = 0.0001$. What is the most accurate comparison?",
              "choices": [
                "Study B provides much stronger evidence against $H_0$ than Study A, even though both reject.",
                "Both equally reject $H_0$; since both are below $\\alpha$ the evidence is identical.",
                "Study A is invalid because $p$ is too close to the threshold.",
                "Study B has a 0.01% chance of being a false positive."
              ],
              "answer": 0,
              "explain": "Reporting $p$ rather than a bare reject/fail decision conveys how surprising the data are; a far smaller $p$ means the data are far more unusual under $H_0$, hence stronger evidence. Treating all $p \\le \\alpha$ as identical throws away exactly the graded information the p-value provides."
            },
            {
              "q": "Why is rejecting $H_0$ when $p \\le \\alpha$ identical to the rejection-region rule?",
              "choices": [
                "Because the p-value is defined as $\\alpha$ minus the test statistic.",
                "Because $\\alpha$ is chosen after seeing the p-value to guarantee a match.",
                "Because the observed statistic falls in the tail of area $\\alpha$ exactly when its tail-probability $p$ is at most $\\alpha$.",
                "Because both rules ignore the direction of the alternative hypothesis."
              ],
              "answer": 2,
              "explain": "The p-value is the tail-probability beyond the observed statistic; that statistic lands in the rejection region (the tail of area $\\alpha$) precisely when its own tail area $p$ does not exceed $\\alpha$. The threshold $\\alpha$ is fixed in advance, not chosen after seeing $p$."
            },
            {
              "q": "A study finds $p = 0.20$ with $\\alpha = 0.05$ and fails to reject $H_0$. What is the correct conclusion?",
              "choices": [
                "The null hypothesis is true.",
                "The data are not surprising enough under $H_0$ to provide evidence against it.",
                "The probability the null is true is 80%.",
                "The effect size is zero."
              ],
              "answer": 1,
              "explain": "A large p-value means the observed data would not be unusual if $H_0$ held, so there is insufficient evidence against $H_0$ — this is not the same as proving $H_0$ true. Failing to reject never establishes the null or sets the effect size to exactly zero."
            },
            {
              "q": "Which scenario produces the SMALLEST p-value, holding the test and direction fixed?",
              "choices": [
                "A larger chosen significance level $\\alpha$.",
                "A test statistic near the center of the null distribution.",
                "A test statistic exactly at the null's expected value.",
                "A test statistic far out in the tail of the null distribution."
              ],
              "answer": 3,
              "explain": "The p-value is the tail area beyond the observed statistic, so the farther into the tail the statistic lies, the smaller that area becomes. The choice of $\\alpha$ does not affect $p$ at all — $\\alpha$ is the threshold, not an input to the computation."
            },
            {
              "q": "A team runs 20 independent tests on data where every null hypothesis is actually true, using $\\alpha = 0.05$. About how many 'significant' results ($p \\le 0.05$) should they expect by chance?",
              "choices": [
                "$0$",
                "$5$",
                "$1$",
                "$20$"
              ],
              "answer": 2,
              "explain": "When $H_0$ is true, the p-value is uniformly distributed, so each test has a 5% chance of falsely crossing $\\alpha = 0.05$; across 20 tests the expected number of false positives is $20 \\times 0.05 = 1$. Failing to account for this multiplicity is a key driver of the replication crisis the lesson warns about."
            },
            {
              "q": "Under what condition is the p-value of a continuous test statistic uniformly distributed on $[0,1]$?",
              "choices": [
                "When the alternative hypothesis is true.",
                "When the null hypothesis is true.",
                "When the sample size is very large regardless of which hypothesis holds.",
                "Only when $\\alpha = 0.5$."
              ],
              "answer": 1,
              "explain": "By construction, when $H_0$ is true the tail-probability $p$ behaves like a probability-integral transform of the statistic, yielding a $\\text{Uniform}(0,1)$ distribution. Under the alternative, p-values cluster toward small values instead, which is what gives a test its power."
            },
            {
              "q": "Reporting the exact p-value instead of just 'reject' or 'fail to reject' is preferred mainly because:",
              "choices": [
                "It guarantees the result will replicate.",
                "It converts the result into the probability that the alternative is correct.",
                "It eliminates the possibility of a Type I error.",
                "It lets each reader apply their own threshold and judge how borderline or overwhelming the evidence is."
              ],
              "answer": 3,
              "explain": "A bare decision hides whether $p$ was $0.049$ or $0.000001$; reporting $p$ preserves that graded information so readers can apply their own $\\alpha$ and gauge how surprising the data are. It does nothing to guarantee replication, remove Type I error, or yield $P(H_1\\mid\\text{data})$."
            },
            {
              "q": "An observed two-sided test gives $|z| = 2.0$ with $P(Z > 2.0) \\approx 0.0228$. At $\\alpha = 0.05$, what is the decision and why?",
              "choices": [
                "Fail to reject, because $0.0228 > 0.05$ is false but the one-tail value is used.",
                "Reject, because $|z| = 2.0$ always corresponds to $\\alpha = 0.05$ exactly.",
                "Fail to reject, because $0.0456$ rounds up to $0.05$.",
                "Reject, because the two-sided $p \\approx 0.0456 \\le 0.05$."
              ],
              "answer": 3,
              "explain": "The two-sided p-value is $2(0.0228) = 0.0456$, which is at most $0.05$, so we reject $H_0$. The borderline distractors misuse the single tail or invoke a fixed $z$-$\\alpha$ identity that does not hold ($z=1.96$, not $2.0$, is the exact 5% two-sided cutoff)."
            },
            {
              "q": "Which of the following would NOT, by itself, change the p-value of a fixed test?",
              "choices": [
                "Choosing a stricter significance level such as $\\alpha = 0.01$ instead of $0.05$.",
                "Collecting more data so the test statistic moves deeper into the tail.",
                "Switching from a one-sided to a two-sided alternative.",
                "Observing a more extreme value of the test statistic."
              ],
              "answer": 0,
              "explain": "The significance level $\\alpha$ is the decision threshold and is not an input to the p-value's computation, so changing it leaves $p$ unchanged (only the reject/fail outcome may change). The other options alter either the tail counted or the observed statistic, both of which directly change $p$."
            },
            {
              "q": "An A/B test on $n = 2{,}000{,}000$ users finds a new button color raises click-through rate by $0.02$ percentage points, with $p < 0.001$. What is the right interpretation?",
              "choices": [
                "The effect is *statistically* significant but likely not *practically* significant — with a huge sample even a tiny, unimportant effect yields a tiny p-value, so you must look at the effect size, not just $p$",
                "Because $p < 0.001$, the effect is large and important",
                "The result is invalid because the sample is too large",
                "A small p-value guarantees the effect will be identical for every future user"
              ],
              "answer": 0,
              "explain": "A p-value measures evidence against $H_0$, not the magnitude of the effect. Enormous samples shrink the standard error so much that trivial differences become \"significant\" — always report and judge the effect size alongside $p$."
            },
            {
              "q": "A study reports $p = 0.03$. Which of the following is the *incorrect* interpretation of this p-value?",
              "choices": [
                "There is a 3% probability that $H_0$ is true",
                "The result is \"significant\" at $\\alpha = 0.05$ but not at $\\alpha = 0.01$",
                "The p-value is a statement about the data assuming $H_0$ — not about the probability of any hypothesis",
                "If $H_0$ were true, there would be a 3% chance of observing data at least as extreme as what was seen"
              ],
              "answer": 0,
              "explain": "The classic fallacy: $p$ is $P(\\text{data this extreme} \\mid H_0)$, not $P(H_0 \\mid \\text{data})$. The p-value says nothing directly about the probability that $H_0$ is true. The other three statements are all correct."
            },
            {
              "q": "A data scientist runs 20 independent tests, each at $\\alpha = 0.05$, on data where *every* null hypothesis is actually true. About how many \"significant\" results should she expect, and what is the standard fix?",
              "choices": [
                "0 false positives, because all nulls are true; no correction is needed",
                "About 5 false positives; halve the sample size to compensate",
                "About $20 \\times 0.05 = 1$ false positive on average; correct for multiple comparisons, e.g. use the Bonferroni level $\\alpha/m$",
                "Exactly 20, since each test is guaranteed to reject"
              ],
              "answer": 2,
              "explain": "Each true null still has a 5% chance of a false alarm, so over 20 tests you expect $20 \\times 0.05 = 1$ spurious \"discovery.\" Multiple-comparison corrections (Bonferroni $\\alpha/m$, or FDR control) rein this in."
            },
            {
              "q": "In a one-sided test with $H_1: \\mu > \\mu_0$, the test statistic is $z = 1.75$. Using $P(Z > 1.75) \\approx 0.04$, what is the p-value and the decision at $\\alpha = 0.05$?",
              "choices": [
                "$p \\approx 0.08$ (both tails); fail to reject $H_0$",
                "$p \\approx 0.96$; fail to reject $H_0$",
                "$p \\approx 0.50$; the result is inconclusive",
                "$p \\approx 0.04$ (single upper tail); since $0.04 \\le 0.05$, reject $H_0$"
              ],
              "answer": 3,
              "explain": "For a one-sided (\"greater than\") alternative the p-value is the single upper-tail area $P(Z > 1.75) \\approx 0.04$. Since $0.04 \\le 0.05$, reject $H_0$. (Doubling to $0.08$ would be the two-sided p-value.)"
            }
          ],
          "flashcards": [
            {
              "front": "Define the p-value precisely.",
              "back": "The probability, <em>assuming $H_0$ is true</em>, of obtaining a test statistic at least as extreme as the one observed: $p=P(\\text{stat at least as extreme}\\mid H_0)$. Small $p$ = data are surprising under $H_0$ = evidence against it."
            },
            {
              "front": "State the p-value decision rule and why reporting $p$ beats reporting reject/fail.",
              "back": "Reject $H_0$ iff $p\\le\\alpha$ (equivalent to the rejection-region rule). Reporting the actual $p$ lets readers apply their own threshold and see whether evidence is borderline or overwhelming."
            },
            {
              "front": "Why is the p-value NOT the probability that $H_0$ is true?",
              "back": "It's computed <em>assuming</em> $H_0$, so it's $P(\\text{data}\\mid H_0)$, not $P(H_0\\mid\\text{data})$ — confusing the two reverses the conditional. Likewise $1-p$ is not the probability the alternative is true."
            },
            {
              "front": "Does a large p-value prove the null hypothesis?",
              "back": "No. A large $p$ only means the data don't provide evidence against $H_0$ (fail to reject); it never proves $H_0$ is true — could be a real but small effect or an underpowered study."
            },
            {
              "front": "Statistical vs. practical significance — how can they diverge?",
              "back": "Statistical significance = unlikely under $H_0$; with huge $n$ a trivial effect can be highly significant (tiny SE), and with small $n$ a big effect can be non-significant. Always read effect size + CI: significance ≠ importance."
            },
            {
              "front": "What is p-hacking / the multiple-comparisons problem?",
              "back": "Running many tests or tweaking analysis until $p<0.05$ inflates the true false-positive rate (20 true-null tests at $\\alpha=0.05$ yield ~1 false \"hit\"). Fixes: pre-registration, corrections like Bonferroni ($\\alpha/m$)."
            }
          ],
          "homework": [
            {
              "prompt": "A study reports $p=0.03$ for $H_0:$ \"no effect.\" For each statement, say whether it is a correct interpretation: (a) \"There is a 3% probability the null is true.\" (b) \"If the null were true, data this extreme would occur about 3% of the time.\" (c) \"There is a 97% chance the effect is real.\"",
              "hint": "Recall the p-value is $P(\\text{data}\\mid H_0)$, not a probability about the hypotheses.",
              "solution": "(a) <strong>Incorrect</strong> — the p-value is not $P(H_0\\text{ true})$; it assumes $H_0$ and cannot be a probability about it. (b) <strong>Correct</strong> — this is the definition: the chance, under $H_0$, of data at least this extreme. (c) <strong>Incorrect</strong> — $1-p$ is not the probability the alternative is true; that would require a Bayesian posterior with a prior, not a p-value."
            },
            {
              "prompt": "A two-sided test gives $z=2.6$. Estimate the p-value (use that the one-tailed area beyond $2.576$ is about $0.005$), and state the decision at $\\alpha=0.05$ and at $\\alpha=0.01$.",
              "hint": "Two-sided p = twice the one-tail area beyond $|z|$.",
              "solution": "Beyond $z=2.6$ the one-tail area is about $0.0047$, so two-sided $p\\approx 2(0.0047)\\approx 0.009$. Since $0.009\\le 0.05$, reject at $\\alpha=0.05$; and since $0.009\\le 0.01$, also reject at $\\alpha=0.01$. The evidence is strong enough to clear even the stricter threshold."
            },
            {
              "prompt": "A team tests 40 candidate features for association with an outcome, all at $\\alpha=0.05$, and finds 3 \"significant.\" Suppose in truth none are associated. How many false positives would you expect by chance, and what does this imply about the 3 findings?",
              "hint": "Expected false positives = number of tests × $\\alpha$ when all nulls are true.",
              "solution": "Expected false positives $=40\\times 0.05=2$. So finding 3 \"significant\" results when all nulls are true is entirely consistent with pure chance — about 2 are expected, and 3 is unremarkable. Without a multiple-comparisons correction (e.g. Bonferroni: use $\\alpha/40=0.00125$ per test) or independent replication, these 3 cannot be trusted as real associations."
            }
          ],
          "examples": [
            {
              "title": "Computing and interpreting a p-value",
              "body": "A teaching method is tested: $H_0:\\mu=70$ (the historic mean) vs $H_1:\\mu\\ne 70$. A class of $n=36$ scores $\\bar X=73.5$ with known $\\sigma=12$. (i) Compute the test statistic and the p-value. (ii) Decide at $\\alpha=0.05$. (iii) Interpret the p-value in one careful sentence.",
              "solution": "(i) $\\operatorname{SE}=12/\\sqrt{36}=2$, so $z=\\frac{73.5-70}{2}=\\frac{3.5}{2}=1.75$. Two-sided p-value: the one-tail area beyond $1.75$ is about $0.040$, so $p\\approx 2(0.040)=0.080$.\n\n(ii) Since $p=0.080>0.05$, we <strong>fail to reject</strong> $H_0$ at the 5% level — not enough evidence to conclude the method changes scores.\n\n(iii) Careful interpretation: \"If the true mean were still 70, we would see a sample mean at least 3.5 points away (in either direction) about 8% of the time\" — a statement about data under $H_0$, not about the probability that $H_0$ is true."
            },
            {
              "title": "Statistical significance without practical importance",
              "body": "An online retailer A/B-tests a new checkout button on $n=1{,}000{,}000$ users per arm. The conversion rate rises from $4.000\\%$ to $4.05\\%$, giving $p=0.001$. Is this statistically significant? Is it necessarily worth shipping? Explain the distinction.",
              "solution": "Statistically significant: yes — with a million users per arm the standard error is tiny, so even a $0.05$ percentage-point lift is many standard errors away from zero, producing $p=0.001$. Practically important: not necessarily. The effect size is a $0.05$-point absolute lift (a ~1.25% relative increase); whether that justifies the engineering cost and risk is a business judgment, not a statistical one. This is the classic large-$n$ trap: significance confirms the effect is probably real, but only the effect size and a cost–benefit analysis say whether it matters. Always report both."
            },
            {
              "title": "Multiple comparisons: how testing a lot manufactures significance",
              "body": "A researcher runs $20$ independent hypothesis tests at $\\alpha = 0.05$, and <em>every</em> null is actually true (no real effects). What is the chance at least one test comes out \"significant\"?",
              "solution": "<strong>Each test has a 5% false-positive rate.</strong> Under a true null, $P(\\text{significant}) = \\alpha = 0.05$, so $P(\\text{not significant}) = 0.95$.\n<strong>Combine across 20 independent tests.</strong> The chance <em>all</em> 20 correctly come out non-significant is $0.95^{20} \\approx 0.358$, so the chance of <b>at least one</b> false positive is\n$$1 - 0.95^{20} \\approx 1 - 0.358 = 0.642.$$\nA <b>64%</b> chance of a \"discovery\" that is pure noise.\n<strong>The aha.</strong> A p-value below 0.05 controls the error rate of <em>one</em> test, not a batch. Run enough tests and false positives become near-certain — the <b>multiple-comparisons problem</b> (and the engine of p-hacking). Corrections like Bonferroni (test at $\\alpha/m$) or controlling the false-discovery rate restore honesty by tightening the threshold as the number of tests grows."
            }
          ]
        },
        {
          "id": "ps-errors-and-power",
          "title": "Type I & II Errors and Statistical Power",
          "minutes": 15,
          "content": "<h3>1. The hook: two ways to be wrong</h3>\n<p>A test returns a verdict — reject or fail to reject $H_0$ — and reality is either \"effect\" or \"no effect.\" Cross them and there are two distinct ways to err, with very different consequences. Designing a good study means deliberately budgeting how often each kind of mistake is allowed to happen.</p>\n\n<h3>2. The 2×2 decision table</h3>\n<p>Tabulating decision against truth gives four outcomes:</p>\n<ul>\n<li>$H_0$ true, fail to reject — <strong>correct</strong>.</li>\n<li>$H_0$ true, reject — <strong>Type I error</strong> (false positive): claiming an effect that isn't there.</li>\n<li>$H_0$ false, fail to reject — <strong>Type II error</strong> (false negative): missing a real effect.</li>\n<li>$H_0$ false, reject — <strong>correct</strong> (a true detection).</li>\n</ul>\n\n<h3>3. Type I error and $\\alpha$</h3>\n<p>The <strong>Type I error rate</strong> is exactly the significance level you chose: $P(\\text{reject }H_0 \\mid H_0\\text{ true}) = \\alpha$. Setting $\\alpha=0.05$ is a deliberate decision to wrongly cry \"effect!\" 5% of the time when nothing is happening. Lowering $\\alpha$ (say to $0.01$) makes false positives rarer — at a cost we are about to meet.</p>\n\n<h3>4. Type II error and $\\beta$</h3>\n<p>The <strong>Type II error rate</strong> $\\beta = P(\\text{fail to reject }H_0 \\mid H_0\\text{ false})$ is the chance of missing a real effect. Unlike $\\alpha$, $\\beta$ is not a single chosen number — it depends on <em>how big</em> the true effect is, the sample size, and the noise. A real but tiny effect is easy to miss (large $\\beta$); a large effect is hard to miss (small $\\beta$).</p>\n\n<h3>5. Power = $1-\\beta$</h3>\n<p>The <strong>power</strong> of a test is its ability to detect a real effect: $\\text{power} = 1-\\beta = P(\\text{reject }H_0\\mid H_0\\text{ false})$. A study with $80\\%$ power has a $20\\%$ chance of missing a true effect of the assumed size. <strong>Underpowered</strong> studies are a quiet epidemic: they not only miss real effects, they also make any \"significant\" result they <em>do</em> find more likely to be a fluke that won't replicate.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$\\alpha$ is how often you sound a false alarm; power is how often you catch a real fire. A smoke detector set to never false-alarm ($\\alpha\\to 0$) will also miss real fires (low power). Good design balances the two.</p>\n</div>\n\n<h3>6. What drives power</h3>\n<p>Power rises with four levers:</p>\n<ul>\n<li><strong>Effect size</strong> $\\uparrow$ — bigger true effects are easier to detect.</li>\n<li><strong>Sample size $n$</strong> $\\uparrow$ — shrinks the standard error $\\sigma/\\sqrt{n}$, separating the null and alternative distributions.</li>\n<li><strong>Significance level $\\alpha$</strong> $\\uparrow$ — a laxer threshold rejects more often (but raises Type I error).</li>\n<li><strong>Noise $\\sigma$</strong> $\\downarrow$ — less variability sharpens the signal.</li>\n</ul>\n<p>The usual knob the experimenter controls is $n$: <strong>power analysis</strong> computes the sample size needed to achieve, say, $80\\%$ power to detect a specified effect at a given $\\alpha$ — done <em>before</em> collecting data.</p>\n\n<h3>7. The $\\alpha$–$\\beta$ tradeoff</h3>\n<p>At a fixed sample size, $\\alpha$ and $\\beta$ trade off: tightening $\\alpha$ (fewer false positives) shrinks the rejection region, which raises $\\beta$ (more missed effects), lowering power. You cannot drive both errors to zero at once with fixed data — the only way to reduce both simultaneously is to collect more information (larger $n$, less noise). Choosing $\\alpha$ is therefore a value judgment about which error is costlier in context.</p>\n\n<p>More data lifts power — run it for two sample sizes (effect size d=0.5, α=0.05):</p>\n<div data-code=\"javascript\" data-expected=\"power n=20: 0.72, n=50: 0.97\">// Power of a one-sample z-test (one-tailed, alpha=0.05): power = P(reject | H1 true).\n// Phi = standard-normal CDF (Abramowitz-Stegun, valid here since the argument stays positive).\nfunction Phi(z) {\n  var t = 1 / (1 + 0.2316419 * z);\n  var d = Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);\n  return 1 - d * (0.319381530*t - 0.356563782*t*t + 1.781477937*Math.pow(t,3) - 1.821255978*Math.pow(t,4) + 1.330274429*Math.pow(t,5));\n}\nvar zc = 1.645, d = 0.5;                 // critical value; effect size in SD units\nfunction power(n) { return Phi(d * Math.sqrt(n) - zc); }\nconsole.log(\"power n=20: \" + power(20).toFixed(2) + \", n=50: \" + power(50).toFixed(2));</div>\n<h3>8. Why this matters</h3>\n<p>Every A/B test and clinical trial is a budget over these two errors: a false positive ships a useless feature or approves an ineffective drug; a false negative kills a good idea or a working treatment. Power analysis to choose $n$ in advance is standard practice in serious experimentation — and in machine learning, an underpowered comparison between two models will routinely declare them \"tied\" or crown the wrong winner by noise.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-power\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the two ways a test can be wrong</summary>\n<p>A hypothesis test makes a binary call — reject $H_0$ or not — against a binary truth, so there are exactly two error types. A <b>Type I error</b> (false positive): rejecting $H_0$ when it is actually true — crying wolf. Its rate is $\\alpha$, the significance level <em>you choose</em>. A <b>Type II error</b> (false negative): failing to reject $H_0$ when it is actually false — missing a real effect. Its rate is $\\beta$, and <b>power</b> $= 1 - \\beta$ is the chance of catching a true effect.</p>\n<p>The tension: at a fixed sample size, lowering $\\alpha$ (demanding stronger evidence) <em>raises</em> $\\beta$ — you cry wolf less but miss more real wolves. You cannot drive both to zero without more data. Which error is worse is a <em>domain</em> choice: a smoke alarm wants tiny $\\beta$ (never miss a fire, tolerate false alarms); a criminal trial wants tiny $\\alpha$ (never convict the innocent, tolerate some guilty going free).</p>\n<p>The \"aha\": there is no error-free test, only a chosen balance. $\\alpha$ guards against false alarms, $\\beta$ against misses, and the only way to shrink both is to gather more evidence — exactly what a power analysis sizes before the study runs.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: statistical power (1−β) and what drives it</summary>\n<p>Type I and Type II errors name the two ways to be wrong; <b>power</b> names your ability to be <em>right</em> when there is a real effect.</p>\n<p><b>Power = 1 − β.</b> If $\\beta$ is the probability of a Type II error (failing to reject a false null — missing a real effect), then <b>power</b> $= 1 - \\beta$ is the probability of <em>correctly</em> detecting that effect. A test with 80% power finds a true effect 80% of the time and misses it 20%.</p>\n<p><b>What raises power.</b> Four levers: a larger <em>sample size</em> $n$ (the biggest one — power rises as the standard error $\\sigma/\\sqrt n$ shrinks), a larger <em>effect size</em> (big effects are easy to see), a higher <em>significance level</em> $\\alpha$ (a looser threshold rejects more readily, at the cost of more Type I errors), and lower <em>variance</em>. There is a fundamental tension: lowering $\\alpha$ to avoid false positives <em>raises</em> $\\beta$ (lowers power) unless you add data.</p>\n<p><b>Why it matters.</b> An <em>underpowered</em> study (too small $n$) routinely misses real effects — and, perversely, among the significant results it does report, a larger fraction are false or inflated (the \"winner's curse\"). Power analysis — solving for the $n$ needed to detect a target effect at a desired power — is how good studies are sized <em>before</em> data collection.</p>\n<p>The \"aha\": significance ($\\alpha$) controls false alarms; power ($1-\\beta$) controls misses. They trade off at fixed $n$, and the way to win both is more data. \"Was the study powered to find this?\" is as important as \"was it significant?\"</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: multiple comparisons — when many tests inflate error</summary>\n<p>Type I error (the other dives) is the false-positive rate of <em>one</em> test. Run <em>many</em> tests and the false positives pile up — the <strong>multiple-comparisons problem</strong>, one of the biggest sources of bogus \"findings.\"</p>\n<p><b>The arithmetic.</b> At $\\alpha=0.05$ each independent test has a 5 percent chance of a false positive. Run 20 of them on pure noise and the chance of <em>at least one</em> false positive is $1-(0.95)^{20}\\approx 64\\%$. Run 100 and you expect about 5 \"significant\" results from nothing — which is why \"we tested 50 subgroups and one was significant!\" is usually meaningless, and the engine of p-hacking.</p>\n<p><b>The corrections.</b> <em>Bonferroni</em>: test each hypothesis at $\\alpha/m$ (for $m$ tests) so the <em>family-wise</em> error stays $\\le \\alpha$ — simple but conservative. <em>False Discovery Rate</em> (Benjamini–Hochberg): control the expected <em>fraction</em> of false positives <em>among</em> the rejections instead, far more powerful when you run thousands of tests (genomics, large-scale A/B testing).</p>\n<p>The \"aha\": a 5 percent error per test becomes near-certain across many tests — 20 tests give about $64\\%$ odds of a false positive. Honest practice corrects for it (Bonferroni's $\\alpha/m$ for family-wise error, or FDR for the expected false-discovery fraction), which is exactly what p-hacking skips.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A researcher lowers $\\alpha$ from $0.05$ to $0.01$ while keeping the sample size and true effect fixed. Holding everything else constant, what happens to $\\beta$?",
              "choices": [
                "$\\beta$ increases (Type II errors become more likely)",
                "$\\beta$ decreases (Type II errors become less likely)",
                "$\\beta$ is unaffected, since it depends only on the effect size",
                "$\\beta$ also drops to $0.01$ to match $\\alpha$"
              ],
              "answer": 0,
              "explain": "Making the rejection region stricter means a true effect is harder to detect, so misses (Type II errors) become more common. There is a tradeoff: shrinking $\\alpha$ at fixed $n$ raises $\\beta$."
            },
            {
              "q": "Statistical power is defined as which of the following?",
              "choices": [
                "$1 - \\alpha$",
                "$\\alpha + \\beta$",
                "$1 - \\beta$",
                "$P(\\text{fail to reject } H_0 \\mid H_0 \\text{ false})$"
              ],
              "answer": 2,
              "explain": "Power is the probability of correctly rejecting a false $H_0$, i.e. $1-\\beta$. The last option is exactly $\\beta$ itself, not power, and $1-\\alpha$ is the chance of correctly retaining a true $H_0$."
            },
            {
              "q": "A drug-safety test treats 'the drug has a dangerous side effect' as the alternative and 'no dangerous effect' as $H_0$. From a patient-safety standpoint, which error is the more serious one to minimize?",
              "choices": [
                "The Type I error, because falsely claiming a side effect wastes money",
                "The Type I error, since $\\alpha$ is the only rate we can control",
                "Neither — both errors are equally costly by definition",
                "The Type II error, because missing a real danger lets a harmful drug through"
              ],
              "answer": 3,
              "explain": "A Type II error here means failing to detect a genuine danger, allowing a harmful drug to reach patients — the costlier mistake. The point of the 2x2 table is that the two errors have asymmetric consequences, so they are not equally costly."
            },
            {
              "q": "A test has $\\alpha = 0.05$ and is performed on data where, in truth, $H_0$ is correct (there is genuinely no effect). What is the probability the test produces a Type II error?",
              "choices": [
                "$0.05$",
                "$0$",
                "It equals $\\beta$, which depends on the effect size",
                "$0.95$"
              ],
              "answer": 1,
              "explain": "A Type II error is failing to reject a FALSE $H_0$. If $H_0$ is true, it cannot be falsely retained, so the Type II error probability is exactly $0$; only Type I errors are possible. The tempting distractor 'it equals $\\beta$' ignores that $\\beta$ is only defined when $H_0$ is false."
            },
            {
              "q": "Which of the following changes will, by itself, increase statistical power without changing $\\alpha$?",
              "choices": [
                "Increasing the sample size $n$",
                "Decreasing the sample size $n$",
                "Choosing a smaller true effect size to detect",
                "Increasing the population standard deviation"
              ],
              "answer": 0,
              "explain": "Larger $n$ reduces the standard error, separating the sampling distributions under $H_0$ and $H_1$, which lowers $\\beta$ and raises power $1-\\beta$. Smaller effects and larger variance both make detection harder, reducing power."
            },
            {
              "q": "A study is described as having 80% power. Interpreted correctly, this means:",
              "choices": [
                "If the effect is real, there is an 80% chance the study will detect it (reject $H_0$)",
                "There is an 80% chance that $H_0$ is false",
                "80% of significant results from this study will be true positives",
                "The Type I error rate is 20%"
              ],
              "answer": 0,
              "explain": "Power = $1-\\beta$ is the conditional probability of rejecting $H_0$ given that the effect is real. It is not a probability about whether $H_0$ is true, nor the proportion of significant findings that are correct (that is the positive predictive value), nor related to $\\alpha$."
            },
            {
              "q": "Across many independent studies, the relationship between $\\alpha$ and $\\beta$ at a FIXED sample size is best described as:",
              "choices": [
                "$\\alpha + \\beta = 1$ always",
                "Independent — changing one never affects the other",
                "Both can be driven to zero simultaneously just by choosing the right cutoff",
                "A tradeoff — pushing $\\alpha$ down tends to push $\\beta$ up, and vice versa"
              ],
              "answer": 3,
              "explain": "At fixed $n$ and effect size, moving the rejection threshold trades one error for the other: a stricter cutoff cuts false positives but inflates misses. They do not sum to 1, and you cannot zero out both at once without more data."
            },
            {
              "q": "An experiment uses $\\alpha = 0.05$. Out of 100 independent tests run on data where $H_0$ is genuinely true every time, roughly how many false positives (Type I errors) should you expect?",
              "choices": [
                "About 0, since $H_0$ is true",
                "About 95",
                "About 5",
                "Exactly 1"
              ],
              "answer": 2,
              "explain": "By definition $P(\\text{reject} \\mid H_0 \\text{ true}) = \\alpha = 0.05$, so about $5\\%$ of $100$ tests, i.e. roughly $5$, will be false positives. 'About 0' wrongly assumes a true $H_0$ never gets rejected."
            },
            {
              "q": "A team wants to detect a smaller effect than originally planned, while keeping both $\\alpha$ and power $1-\\beta$ at their current levels. What must they do?",
              "choices": [
                "Lower $\\alpha$ to compensate",
                "Accept a higher $\\beta$",
                "Increase the sample size",
                "Nothing — effect size does not interact with sample size"
              ],
              "answer": 2,
              "explain": "Smaller effects are harder to detect, so maintaining the same power requires more data; sample size must increase. Lowering $\\alpha$ would actually hurt power, and effect size, $n$, $\\alpha$, and power are all interlinked."
            },
            {
              "q": "Why is $\\beta$, unlike $\\alpha$, NOT simply a single number the researcher chooses up front?",
              "choices": [
                "Because $\\beta$ is computed automatically by the software, not chosen",
                "Because $\\beta$ depends on the true (usually unknown) effect size, the sample size, and the variability",
                "Because $\\beta$ is always equal to $1 - \\alpha$ by definition",
                "Because $\\beta$ only matters after the data are collected"
              ],
              "answer": 1,
              "explain": "$\\alpha$ is set directly as the significance level, but $\\beta = P(\\text{fail to reject} \\mid H_0 \\text{ false})$ varies with how large the real effect is, the sample size, and the noise — quantities not all under the researcher's direct control. $\\beta = 1-\\alpha$ is false."
            },
            {
              "q": "A colleague claims: 'We got $p = 0.20$, so we fail to reject $H_0$. That proves there is no effect.' What is the flaw in this reasoning?",
              "choices": [
                "Failing to reject could be a Type II error — a real effect may have been missed, especially with low power",
                "There is no flaw; failing to reject $H_0$ does prove it true",
                "A $p$-value of $0.20$ means the effect is 20% likely to be real",
                "$p = 0.20$ should have led to rejecting $H_0$"
              ],
              "answer": 0,
              "explain": "Failing to reject $H_0$ is not proof it is true; with low power, a genuine effect can easily be missed (a Type II error). Absence of evidence is not evidence of absence, and a $p$-value is not the probability the effect is real."
            },
            {
              "q": "Two tests are run on the same hypothesis with the same $\\alpha$. Test A uses $n = 50$; Test B uses $n = 500$. Assuming a real effect of the same size exists, which statement is correct?",
              "choices": [
                "Test B has a larger Type I error rate because of its larger sample",
                "Test A has higher power because smaller samples are more sensitive",
                "Both tests have identical power since $\\alpha$ is the same",
                "Test B has higher power and thus a smaller $\\beta$"
              ],
              "answer": 3,
              "explain": "The larger sample shrinks the standard error and better separates the null and alternative distributions, raising power and lowering $\\beta$. Type I error stays fixed at $\\alpha$ regardless of $n$, so Test B is not more prone to false positives."
            },
            {
              "q": "A disease screening test is framed as $H_0$: the patient is healthy, $H_1$: the patient has the disease. Which choice correctly identifies the Type I and Type II errors?",
              "choices": [
                "Type I = missing a real disease (telling a sick patient they're healthy); Type II = a false alarm",
                "Type I = a false positive (telling a healthy patient they're sick — rejecting a true $H_0$); Type II = a false negative (telling a sick patient they're healthy — failing to reject a false $H_0$)",
                "Type I error has probability $1 - \\alpha$; Type II error has probability $\\beta = $ power",
                "Both errors are the same thing under this framing"
              ],
              "answer": 1,
              "explain": "Type I rejects a true $H_0$ — here a healthy patient flagged as sick (false positive, probability $\\alpha$). Type II fails to reject a false $H_0$ — a sick patient cleared (false negative, probability $\\beta$; power $= 1-\\beta$). Choice 0 swaps them."
            },
            {
              "q": "A research field publishes many *underpowered* studies (low power, small samples). Among the statistically significant findings they report, what tends to be true?",
              "choices": [
                "Power has no relationship to replicability",
                "Low power makes the significant findings *more* reliable, since only the strongest effects survive",
                "A disproportionate share of the significant findings are flukes (false positives or inflated effects), and they often fail to replicate",
                "Underpowered studies cannot produce significant findings at all"
              ],
              "answer": 2,
              "explain": "When power is low, true effects are usually missed, so a larger fraction of the \"significant\" results that do get published are false positives or upward-biased (the winner's curse) — which is exactly why they replicate poorly."
            },
            {
              "q": "What is a *power analysis* most commonly used for, and when is it done?",
              "choices": [
                "After collecting data, to compute the p-value",
                "Before collecting data, to determine the sample size $n$ needed to achieve a target power (e.g. 80%) for detecting an effect of a given size",
                "After a non-significant result, to prove $H_0$ is true",
                "To convert a Type I error into a Type II error"
              ],
              "answer": 1,
              "explain": "A power analysis is a *planning* tool: fix the effect size you care about, the desired power (often 0.80), and $\\alpha$, then solve for the sample size $n$ required — done before any data are collected."
            },
            {
              "q": "Holding the true effect size fixed, which change *increases* the power of a test?",
              "choices": [
                "Lowering $\\alpha$ from 0.05 to 0.01",
                "Reducing the sample size to focus on the cleanest observations",
                "Increasing the population variance $\\sigma^2$",
                "Increasing the sample size $n$, which shrinks the standard error $\\sigma/\\sqrt{n}$"
              ],
              "answer": 3,
              "explain": "Power rises when the sampling distributions separate more cleanly. Larger $n$ shrinks the standard error $\\sigma/\\sqrt{n}$, sharpening that separation. Lowering $\\alpha$ shrinks the rejection region and *reduces* power; larger variance also hurts."
            }
          ],
          "flashcards": [
            {
              "front": "Define Type I and Type II errors.",
              "back": "Type I (false positive): reject $H_0$ when it's true — rate $\\alpha$. Type II (false negative): fail to reject $H_0$ when it's false — rate $\\beta$. One cries effect where there is none; the other misses a real effect."
            },
            {
              "front": "What is statistical power, in words and symbols?",
              "back": "Power $=1-\\beta=P(\\text{reject }H_0\\mid H_0\\text{ false})$ — the probability of detecting a real effect of a given size. 80% power ⇒ 20% chance of missing that effect."
            },
            {
              "front": "What four factors increase a test's power?",
              "back": "Larger effect size; larger sample size $n$ (smaller SE); larger $\\alpha$ (laxer threshold, but more Type I error); smaller noise $\\sigma$. The experimenter's usual lever is $n$."
            },
            {
              "front": "Why can't you make both $\\alpha$ and $\\beta$ arbitrarily small at fixed $n$?",
              "back": "They trade off: shrinking the rejection region to lower $\\alpha$ raises $\\beta$ (lowers power), and vice versa. Reducing both at once requires more information — larger $n$ or less noise."
            },
            {
              "front": "What is a power analysis and when is it done?",
              "back": "A pre-data calculation of the sample size needed to achieve a target power (e.g. 80%) for detecting a specified effect size at a chosen $\\alpha$. Done <em>before</em> collecting data, to avoid an underpowered study."
            },
            {
              "front": "Why are underpowered studies doubly dangerous?",
              "back": "They often miss real effects (high $\\beta$), AND any \"significant\" result they do find is more likely a fluke that won't replicate — low power inflates the false-discovery rate among significant findings."
            }
          ],
          "homework": [
            {
              "prompt": "Classify each as a Type I or Type II error: (a) A spam filter flags a legitimate email as spam. (b) A medical test tells a sick patient they are healthy. (c) A jury convicts an innocent defendant (with $H_0$ = innocent).",
              "hint": "Type I = reject a true $H_0$ (false positive); Type II = fail to reject a false $H_0$ (false negative). Identify $H_0$ first.",
              "solution": "(a) $H_0$ = \"email is legitimate.\" Flagging it as spam rejects a true $H_0$ → <strong>Type I</strong> (false positive). (b) $H_0$ = \"patient is healthy.\" Telling a sick patient they're healthy fails to reject a false $H_0$ → <strong>Type II</strong> (false negative). (c) $H_0$ = \"innocent.\" Convicting an innocent person rejects a true $H_0$ → <strong>Type I</strong>."
            },
            {
              "prompt": "A clinical trial is designed with $\\alpha=0.05$ and power $=0.80$ to detect a clinically meaningful effect. (a) What is the probability of a Type II error? (b) If the researchers want to reduce both $\\alpha$ and $\\beta$, what is the most direct option, and why?",
              "hint": "$\\beta=1-\\text{power}$. Both errors shrink together only one way at fixed effect/noise.",
              "solution": "(a) $\\beta=1-\\text{power}=1-0.80=0.20$ — a 20% chance of missing the effect. (b) Increase the sample size $n$. Larger $n$ shrinks the standard error $\\sigma/\\sqrt n$, separating the null and alternative sampling distributions, which lets you lower $\\alpha$ and $\\beta$ simultaneously. At fixed $n$ they only trade off; more data is what relaxes the tradeoff."
            },
            {
              "prompt": "Two A/B tests look for the same true 1% lift. Test A uses 1,000 users per arm; test B uses 50,000 per arm. Which has higher power, and what are the consequences of running the underpowered one?",
              "hint": "Power rises with $n$. Consider both missed effects and the reliability of any \"significant\" result.",
              "solution": "Test B (50,000/arm) has far higher power, because its standard error is about $\\sqrt{50}\\approx 7$ times smaller, sharply separating the null and alternative distributions. The underpowered test A will frequently fail to detect the real 1% lift (high Type II error), and on the occasions it <em>does</em> report significance, that result is more likely an exaggerated fluke that won't replicate. Underpowered experiments waste data and mislead."
            }
          ],
          "examples": [
            {
              "title": "Filling in the 2×2 error table for a medical screen",
              "body": "A screening test has $H_0$ = \"no disease.\" Suppose its Type I error rate is $\\alpha=0.05$ and its power to detect the disease is $0.90$. For each of the four decision/truth combinations, name the outcome and give its probability (conditional on the truth).",
              "solution": "· <strong>No disease, test negative</strong> (correct, specificity): $P=1-\\alpha=0.95$.\n· <strong>No disease, test positive</strong> (Type I / false positive): $P=\\alpha=0.05$.\n· <strong>Disease, test negative</strong> (Type II / false negative): $P=\\beta=1-\\text{power}=0.10$.\n· <strong>Disease, test positive</strong> (correct detection, sensitivity = power): $P=0.90$.\n\nNote these are conditional on the true state; the chance a positive test is correct (its predictive value) also depends on the disease's base rate via Bayes' theorem — high specificity still yields many false positives when the disease is rare."
            },
            {
              "title": "The $\\alpha$–power tradeoff made concrete",
              "body": "A test of $H_0:\\mu=0$ vs $H_1:\\mu>0$ has standard error $1$, and the true mean is $\\mu=2$. (i) With $\\alpha=0.05$ (reject if $z>1.645$), find the power. (ii) Tighten to $\\alpha=0.01$ (reject if $z>2.326$) and find the new power. Comment.",
              "solution": "Under $H_1$, $\\bar X\\approx N(2,1)$, so $z=\\bar X$ has mean $2$.\n\n(i) Power $=P(\\bar X>1.645\\mid \\mu=2)=P(Z>1.645-2)=P(Z>-0.355)\\approx 0.639$, about 64%.\n\n(ii) Power $=P(\\bar X>2.326\\mid \\mu=2)=P(Z>2.326-2)=P(Z>0.326)\\approx 0.372$, about 37%.\n\nTightening $\\alpha$ from 0.05 to 0.01 cut the power from ~64% to ~37% — fewer false positives bought at the price of missing the real effect far more often. With the data fixed, lowering $\\alpha$ necessarily lowers power; only more data escapes the tradeoff."
            },
            {
              "title": "Power = 1 − β, and the four levers that raise it",
              "body": "A clinical trial has a Type II error rate $\\beta = 0.20$. What is its statistical power, and what can you change to increase it?",
              "solution": "<strong>Power is the complement of β.</strong> Statistical power $= 1 - \\beta = 1 - 0.20 = 0.80$ — an 80% chance of detecting a real effect when one truly exists (the field-standard target). $\\beta$ is the chance of <em>missing</em> it (a false negative).\n<strong>The four levers.</strong> Power rises when you (1) increase the <b>sample size $n$</b> (more data sharpens the estimate); (2) target a larger <b>true effect size</b> (big effects are easy to see); (3) raise the significance level <b>$\\alpha$</b> (a laxer threshold catches more — at the cost of more false positives); or (4) reduce the <b>noise $\\sigma$</b> (cleaner measurement).\n<strong>The central tension.</strong> $\\alpha$ and $\\beta$ trade off at fixed $n$: tightening $\\alpha$ to avoid false positives <em>raises</em> $\\beta$ (lowers power), and vice versa. The only way to shrink <em>both</em> error rates at once is to collect more data.\n<strong>The takeaway.</strong> \"Underpowered\" studies (small $n$, small effects) often miss real effects — a power analysis, done <em>before</em> the study, picks the $n$ needed to hit, say, 80% power for the smallest effect worth finding."
            }
          ]
        },
        {
          "id": "ps-t-tests",
          "title": "t-Tests: Comparing Means in Practice",
          "minutes": 16,
          "content": "<h3>1. The hook: testing means when $\\sigma$ is unknown</h3>\n<p>The clean $z$-tests of the previous lessons assumed you knew the population standard deviation $\\sigma$. In real data you almost never do — you estimate it from the sample. That single change, plugging in $s$ for $\\sigma$, is what turns a $z$-test into the workhorse of applied statistics: the <strong>$t$-test</strong>, used everywhere from clinical trials to A/B tests to comparing two machine-learning models.</p>\n\n<h3>2. The one-sample t-test</h3>\n<p>To test $H_0:\\mu=\\mu_0$ when $\\sigma$ is unknown, use the sample standard deviation $s$ and form the <strong>t-statistic</strong>\n$$t = \\frac{\\bar{X}-\\mu_0}{s/\\sqrt{n}},$$\nidentical in shape to the $z$-statistic but with $s$ in place of $\\sigma$. Under $H_0$ it follows a <strong>Student's $t$-distribution with $n-1$ degrees of freedom</strong>, and you compare it to $t$-critical values (or get its p-value) just as before.</p>\n\n<h3>3. Why $t$ and not $z$</h3>\n<p>Estimating $\\sigma$ with $s$ injects extra uncertainty, because $s$ itself varies from sample to sample. The $t$-distribution accounts for this with <strong>heavier tails</strong> than the normal — so its critical values are larger, producing appropriately more cautious tests and wider intervals (the same reason the $t$ appeared for confidence intervals). The fewer the degrees of freedom (smaller $n$), the heavier the tails; as $n\\to\\infty$, $s\\to\\sigma$ and $t$ converges to the standard normal, so for large samples the distinction vanishes.</p>\n\n<h3>4. The two-sample t-test</h3>\n<p>More often you compare <em>two</em> groups — treatment vs. control, model A vs. model B — testing $H_0:\\mu_1=\\mu_2$. The two-sample $t$-statistic measures the difference in sample means relative to its standard error:\n$$t = \\frac{\\bar{X}_1-\\bar{X}_2}{\\operatorname{SE}(\\bar{X}_1-\\bar{X}_2)}, \\qquad \\operatorname{SE} = \\sqrt{\\frac{s_1^2}{n_1}+\\frac{s_2^2}{n_2}}.$$\nThe standard error of a difference combines the two groups' variances (variances add for independent samples). A common variant is the <strong>paired</strong> $t$-test, for naturally matched observations (before/after on the same subjects), which tests whether the mean <em>difference</em> is zero and is far more powerful when pairing removes between-subject noise.</p>\n\n<h3>5. Assumptions</h3>\n<p>The $t$-test assumes the data (or the group means) are approximately normal and the observations independent. Thanks to the CLT it is <strong>robust</strong>: for moderate-to-large $n$ the sampling distribution of the mean is near-normal even if the raw data are not, so the test works well. Watch out for strong skew with tiny samples, heavy outliers, and dependence between observations — those genuinely break it.</p>\n\n<h3>6. Tests and confidence intervals are two views</h3>\n<p>The duality from the CI lesson holds here: a two-sided $t$-test of $H_0:\\mu=\\mu_0$ at level $\\alpha$ rejects exactly when $\\mu_0$ falls <em>outside</em> the $(1-\\alpha)$ confidence interval $\\bar X\\pm t^{*}_{n-1}\\,s/\\sqrt{n}$. Likewise, a two-sample test for \"no difference\" rejects iff the CI for $\\mu_1-\\mu_2$ excludes $0$. Reporting the interval is often more informative than the test alone, because it shows the plausible <em>size</em> of the effect, not just whether it is nonzero.</p>\n\n<h3>7. Worked example</h3>\n<p>A sample of $n=16$ has $\\bar X=52$ and $s=8$; test $H_0:\\mu=50$ vs $H_1:\\mu\\ne 50$ at $\\alpha=0.05$. The standard error is $s/\\sqrt n=8/4=2$, so $t=\\frac{52-50}{2}=1.0$ with $n-1=15$ degrees of freedom. The two-sided critical value is $t^{*}_{15}\\approx 2.131$. Since $|1.0|<2.131$, we fail to reject $H_0$ — the 2-point difference is well within sampling noise for this small sample. (Equivalently, the 95% CI $52\\pm 2.131\\cdot 2=[47.7,56.3]$ contains $50$.)</p>\n\n<h3>8. Why this matters for machine learning</h3>\n<p>When you compare two models' cross-validation scores, a paired $t$-test (paired across folds) is a principled way to ask whether the difference is real or just fold-to-fold noise — far better than eyeballing two averages. The same machinery powers A/B-test readouts and any experiment comparing group means. And the recurring lesson — estimate the uncertainty, then judge the difference against it — is the heart of trustworthy empirical comparison.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"ps-t-dist\"></div>\n<h4>Try it in code</h4>\n<p>The one-sample <code>t-statistic</code> is <code>(x̄ − μ₀)/(s/√n)</code> — like the z-statistic but using the SAMPLE standard deviation s (so it has heavier tails). Run it for x̄=52, μ₀=50, s=8, n=16:</p>\n<div data-code=\"javascript\" data-expected=\"1.00\">// One-sample t-statistic: (xbar - mu0) / (s / sqrt(n)), with sample std s.\nfunction tStat(xbar, mu0, s, n) {\n  return (xbar - mu0) / (s / Math.sqrt(n));\n}\nconsole.log(tStat(52, 50, 8, 16).toFixed(2));   // 1.00 -- like z, but s estimates sigma (Student's t)</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why t, not z, for small samples</summary>\n<p>To standardize a sample mean you would like $z = (\\bar{x} - \\mu)/(\\sigma/\\sqrt{n})$ — but you rarely know $\\sigma$, so you plug in the sample standard deviation $s$. That substitution adds a second source of randomness: $s$ is itself a noisy estimate, especially for small $n$.</p>\n<p>The <b>t-distribution</b> accounts for it. Using $s$ in place of $\\sigma$ gives the statistic heavier tails than the normal — extreme values become more likely, because sometimes $s$ underestimates $\\sigma$ and inflates the ratio. Its shape is set by the <b>degrees of freedom</b> ($n-1$): fewer data, heavier tails, wider confidence intervals. As $n \\to \\infty$, $s \\to \\sigma$, the extra uncertainty vanishes, and the t-distribution converges to the standard normal.</p>\n<p>The \"aha\": \"use t, not z\" is not a rule to memorize — it is an honesty adjustment. When you estimate the spread from the same small sample, you are less certain than the normal pretends, so t widens the intervals to compensate. With large $n$ the two agree, which is why the distinction only matters for small samples.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the t-distribution becomes the normal as n grows</summary>\n<p>The t-test uses the <b>t-distribution</b> instead of the normal — and the reason is a single extra source of uncertainty that fades with sample size.</p>\n<p><b>Why t has fatter tails.</b> A z-test assumes you know the population SD $\\sigma$. In practice you <em>estimate</em> it from the same small sample (as $s$), adding uncertainty: your test statistic now has a random denominator, not a fixed one. The t-distribution accounts for this by being <em>heavier-tailed</em> than the normal — extreme values are more likely, so critical values are larger (you demand more evidence).</p>\n<p><b>It converges to the normal.</b> The t is parameterized by <b>degrees of freedom</b> $\\nu = n-1$. Small $\\nu$ gives fat tails (for $\\nu=5$, the two-sided 5% cutoff is $\\pm 2.571$ versus the normal's $\\pm 1.96$). As $\\nu$ grows, $s$ estimates $\\sigma$ ever more reliably and the tails thin: by $\\nu \\approx 30$ the cutoff is $\\approx 2.04$, nearly the normal's $1.96$, and for large $n$ the two are interchangeable.</p>\n<p>The \"aha\": the t-distribution is \"the normal, corrected for not knowing $\\sigma$.\" The correction (extra tail weight) is the price of estimating the spread from data; it matters for small samples and vanishes for large ones — which is exactly why \"use t for small $n$, z is fine for large $n$\" is the rule.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: paired vs unpaired, and Welch's correction</summary>\n<p>\"Run a t-test\" hides three choices that change the answer — and picking the wrong one is a common applied-stats mistake.</p>\n<p><b>Paired vs unpaired.</b> If the two groups are <em>independent</em> (different subjects in treatment vs control), use the <em>two-sample (unpaired)</em> t-test. If each measurement in one group is naturally matched to one in the other (the <em>same</em> subject before vs after, twins, left vs right), use the <em>paired</em> t-test, which tests the mean of the within-pair <em>differences</em>. Pairing removes between-subject variability, so when it applies it is far more powerful; running an unpaired test on paired data throws that power away.</p>\n<p><b>Equal variances? Welch's t-test.</b> The classic two-sample t-test assumes the two groups share the <em>same</em> variance. When they do not (or you are unsure), <b>Welch's t-test</b> adjusts the standard error and the degrees of freedom and stays valid under unequal variances. It costs almost nothing and is the safer default — many libraries use it automatically.</p>\n<p><b>And the assumptions.</b> The t-test assumes roughly normal data (or a large enough $n$ for the CLT to kick in) and independent observations. For heavy-tailed data or small, clearly non-normal samples, a nonparametric test (Mann–Whitney, Wilcoxon signed-rank) is more robust.</p>\n<p>The \"aha\": \"t-test\" is a family. Match it to the design — <em>paired</em> when measurements are matched (more power), <em>unpaired</em> when the groups are independent, and prefer <em>Welch's</em> when variances may differ. The $t$ statistic from the other dives is the same; these choices decide which standard error and degrees of freedom go into it.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A sample of $n=16$ observations is used to test $H_0:\\mu=\\mu_0$ with $\\sigma$ unknown. How many degrees of freedom does the relevant $t$-distribution have?",
              "choices": [
                "$15$",
                "$16$",
                "$17$",
                "$\\sqrt{16}=4$"
              ],
              "answer": 0,
              "explain": "The one-sample t-statistic uses $n-1$ degrees of freedom because one degree is consumed estimating the mean for $s$; $16-1=15$. Using $n$ itself ignores that lost degree of freedom."
            },
            {
              "q": "A study reports $\\bar{X}=52$, $s=8$, $n=64$, testing $H_0:\\mu=50$. What is the value of the t-statistic?",
              "choices": [
                "$2$",
                "$0.25$",
                "$16$",
                "$1$"
              ],
              "answer": 0,
              "explain": "$t=\\frac{\\bar{X}-\\mu_0}{s/\\sqrt{n}}=\\frac{52-50}{8/\\sqrt{64}}=\\frac{2}{8/8}=\\frac{2}{1}=2$. The distractor $0.25$ forgets to divide $s$ by $\\sqrt{n}$."
            },
            {
              "q": "Compared with the standard normal distribution, the Student's $t$-distribution has",
              "choices": [
                "lighter tails, giving smaller critical values",
                "no tails because it is bounded",
                "the same tails but a shifted center",
                "heavier tails, giving larger critical values"
              ],
              "answer": 3,
              "explain": "Estimating $\\sigma$ with $s$ adds uncertainty, so the $t$-distribution has heavier tails than the normal, making its critical values larger and the test more cautious. Lighter tails would make the test less cautious, which is backwards."
            },
            {
              "q": "As the sample size $n$ grows very large, the $t$-distribution with $n-1$ degrees of freedom",
              "choices": [
                "approaches the standard normal distribution",
                "develops even heavier tails",
                "becomes uniform",
                "shifts its mean away from zero"
              ],
              "answer": 0,
              "explain": "With more data, $s$ estimates $\\sigma$ more reliably, so the extra uncertainty shrinks and the $t$-distribution converges to the standard normal. Its tails get lighter (closer to normal), not heavier, as df increase."
            },
            {
              "q": "Two researchers analyze the same data testing the same $H_0$, one wrongly assuming $\\sigma$ is known (using $z$) and one correctly using the $t$-test with $s$. For the same significance level $\\alpha$, the critical value used by the $t$-test will be",
              "choices": [
                "smaller than the $z$ critical value",
                "larger than the $z$ critical value",
                "exactly equal to the $z$ critical value",
                "always zero"
              ],
              "answer": 1,
              "explain": "Because the $t$-distribution has heavier tails, its critical value exceeds the corresponding $z$ critical value at the same $\\alpha$, making the $t$-test harder to reject with. Treating them as equal ignores the extra uncertainty from estimating $\\sigma$."
            },
            {
              "q": "A student computes a t-statistic and gets the same numeric value as a previously computed z-statistic on identical data, yet the t-test fails to reject $H_0$ while the z-test would have rejected it. What explains this?",
              "choices": [
                "The t-statistic was computed incorrectly; equal statistics must give equal decisions",
                "The t-test uses a different sample mean",
                "The t-test compares against larger critical values, so the same statistic can fall short",
                "The t-test changes the value of $\\alpha$ automatically"
              ],
              "answer": 2,
              "explain": "Even with an identical statistic value, the $t$-distribution's heavier tails mean a larger critical value (or larger p-value), so the same number may not reach significance. The decision differs because of the reference distribution, not the statistic's value."
            },
            {
              "q": "Which scenario most clearly calls for a $t$-test rather than a $z$-test?",
              "choices": [
                "The population standard deviation $\\sigma$ is known exactly from theory",
                "The sample size is exactly $n=1$",
                "You are testing a proportion rather than a mean",
                "You estimate variability from the sample using $s$ because $\\sigma$ is unknown"
              ],
              "answer": 3,
              "explain": "The defining situation for a $t$-test is testing a mean when $\\sigma$ is unknown and must be estimated by $s$. When $\\sigma$ is truly known, the $z$-test is appropriate."
            },
            {
              "q": "Holding everything else fixed, how does decreasing the sample size $n$ (with fewer degrees of freedom) affect the tails of the $t$-distribution used?",
              "choices": [
                "The distribution becomes the normal exactly",
                "The tails become lighter",
                "The tails are unaffected by $n$",
                "The tails become heavier"
              ],
              "answer": 3,
              "explain": "Fewer degrees of freedom mean $s$ is a noisier estimate of $\\sigma$, so the $t$-distribution has heavier tails for small $n$. More data, not less, pushes it toward the lighter-tailed normal."
            },
            {
              "q": "An A/B test on a small pilot ($n=10$) yields $t=2.0$. A colleague says 'that's above 1.96, so reject at $\\alpha=0.05$ (two-sided).' Why is this reasoning flawed?",
              "choices": [
                "$t=2.0$ is impossible for such a small sample",
                "$1.96$ is the $z$ critical value; the correct $t$ critical value for $9$ df is larger than $1.96$",
                "The two-sided critical value should be $0.05$, not $1.96$",
                "$t$ statistics cannot be compared to any critical value"
              ],
              "answer": 1,
              "explain": "The cutoff $1.96$ comes from the normal; for $9$ degrees of freedom the two-sided $0.05$ $t$-critical value is about $2.26$, so $t=2.0$ does not reach significance. Borrowing the $z$ cutoff understates the threshold for small samples."
            },
            {
              "q": "In the one-sample t-statistic $t=\\dfrac{\\bar{X}-\\mu_0}{s/\\sqrt{n}}$, what does the denominator $s/\\sqrt{n}$ represent?",
              "choices": [
                "The population standard deviation",
                "The estimated standard error of the sample mean",
                "The margin of error at $95\\%$ confidence",
                "The degrees of freedom"
              ],
              "answer": 1,
              "explain": "$s/\\sqrt{n}$ is the estimated standard error of $\\bar{X}$ — the sample standard deviation scaled by $\\sqrt{n}$. It is not $\\sigma$ itself (that would be the known-variance case) nor the degrees of freedom."
            },
            {
              "q": "Two valid 95% confidence intervals for a mean are built from the same data, one using the normal (assuming $\\sigma$ known) and one using the $t$-distribution (using $s$). The $t$-based interval will be",
              "choices": [
                "narrower than the normal-based interval",
                "identical in width",
                "wider than the normal-based interval",
                "centered at a different point"
              ],
              "answer": 2,
              "explain": "The larger $t$ critical value produces a wider interval, reflecting the extra uncertainty from estimating $\\sigma$ — the same reason the $t$ appears in confidence intervals. Both intervals are centered at $\\bar{X}$, so the center is unchanged."
            },
            {
              "q": "A researcher with $n=25$ computes $\\bar{X}=103$, $s=10$, testing $H_0:\\mu=100$ against $H_a:\\mu>100$. What is the t-statistic, and which distribution provides the p-value?",
              "choices": [
                "$t=1.5$, compared to a $t$-distribution with $24$ df",
                "$t=0.3$, compared to the standard normal",
                "$t=1.5$, compared to a $t$-distribution with $25$ df",
                "$t=3.0$, compared to a $t$-distribution with $24$ df"
              ],
              "answer": 0,
              "explain": "$t=\\frac{103-100}{10/\\sqrt{25}}=\\frac{3}{10/5}=\\frac{3}{2}=1.5$, and with $n=25$ the reference is the $t$-distribution with $n-1=24$ df. The distractor $0.3$ divides by $s$ alone instead of the standard error $s/\\sqrt{n}$."
            },
            {
              "q": "Comparing the means of two *independent* groups (sizes $n_1, n_2$; sample SDs $s_1, s_2$), what is the standard error of the difference $\\bar{x}_1 - \\bar{x}_2$?",
              "choices": [
                "$\\dfrac{s_1 + s_2}{\\sqrt{n_1 + n_2}}$",
                "$\\sqrt{s_1^2 + s_2^2}$, independent of the sample sizes",
                "$\\dfrac{s_1^2}{n_1} - \\dfrac{s_2^2}{n_2}$",
                "$\\sqrt{\\dfrac{s_1^2}{n_1} + \\dfrac{s_2^2}{n_2}}$ — because the groups are independent, their *variances* add"
              ],
              "answer": 3,
              "explain": "Variances of independent quantities add, even for a *difference*: $\\operatorname{Var}(\\bar{x}_1 - \\bar{x}_2) = \\sigma_1^2/n_1 + \\sigma_2^2/n_2$. Taking the square root gives the standard error. (Choice 2's subtraction is the classic trap.)"
            },
            {
              "q": "A study measures each subject's cholesterol *before* and *after* a 12-week diet. Which test fits, and why is it usually more powerful here than a two-sample test?",
              "choices": [
                "A two-sample (independent) t-test, because there are two columns of numbers",
                "A *paired* t-test on the within-subject differences — pairing removes between-subject variability, so it detects the diet's effect with more power",
                "A one-sample $z$-test on the \"after\" values alone",
                "A chi-squared test, since the data come in pairs"
              ],
              "answer": 1,
              "explain": "The two measurements come from the *same* people, so they are correlated, not independent. Working with each subject's before–after difference cancels stable between-person variation, leaving a cleaner signal — hence more power."
            },
            {
              "q": "What are the key assumptions behind the two-sample t-test, and how robust is it?",
              "choices": [
                "No assumptions are needed; the t-test works for any data",
                "The data must be exactly normal with no exceptions, or the test is completely invalid",
                "The data should be approximately normal (or $n$ large enough for the CLT) and the observations independent; the test is fairly *robust* to mild non-normality but breaks down with strong skew plus tiny samples, heavy outliers, or dependent observations",
                "The two groups must have identical sample sizes and identical means"
              ],
              "answer": 2,
              "explain": "Approximate normality (helped by the CLT at larger $n$) and independence are the load-bearing assumptions. The t-test tolerates mild departures, but a combination of strong skew with tiny samples, severe outliers, or correlated data can invalidate it."
            },
            {
              "q": "A two-sample comparison of conversion rates yields a 95% confidence interval for the difference of $[-0.3\\%, +1.5\\%]$. Without computing a p-value, what does this say about the two-sided test at $\\alpha = 0.05$?",
              "choices": [
                "Reject $H_0$, because the interval is mostly positive",
                "The CI tells you nothing about the hypothesis test; they are unrelated",
                "Fail to reject $H_0$: the interval contains 0, so a zero difference is plausible — and a 95% CI excludes the null value exactly when the two-sided $\\alpha = 0.05$ test rejects",
                "Reject $H_0$, because the interval is narrow"
              ],
              "answer": 2,
              "explain": "Test–CI duality: a $100(1-\\alpha)\\%$ CI contains exactly the null values a two-sided level-$\\alpha$ test would fail to reject. Since $[-0.3\\%, +1.5\\%]$ contains $0$, we fail to reject $H_0$ at $\\alpha = 0.05$."
            }
          ],
          "flashcards": [
            {
              "front": "Give the one-sample t-statistic and its null distribution.",
              "back": "$t=\\dfrac{\\bar X-\\mu_0}{s/\\sqrt n}$ (sample SD $s$ in place of $\\sigma$). Under $H_0$ it follows Student's $t$ with $n-1$ degrees of freedom."
            },
            {
              "front": "Why use the $t$-distribution instead of the normal?",
              "back": "Estimating $\\sigma$ by $s$ adds uncertainty ($s$ varies sample to sample), so $t$ has heavier tails → larger critical values, more cautious tests/wider intervals. As $n\\to\\infty$, $s\\to\\sigma$ and $t\\to$ normal."
            },
            {
              "front": "Give the two-sample t-statistic and the standard error of the difference.",
              "back": "$t=\\dfrac{\\bar X_1-\\bar X_2}{\\operatorname{SE}}$ with $\\operatorname{SE}=\\sqrt{\\dfrac{s_1^2}{n_1}+\\dfrac{s_2^2}{n_2}}$ — variances add for independent samples. Tests $H_0:\\mu_1=\\mu_2$."
            },
            {
              "front": "What is a paired t-test and when is it more powerful?",
              "back": "For naturally matched observations (e.g. before/after on the same subjects, or models across the same CV folds); it tests whether the mean <em>difference</em> is 0. More powerful when pairing removes between-subject/between-fold noise."
            },
            {
              "front": "What are the t-test's assumptions, and why is it called robust?",
              "back": "Approximately normal data (or means) and independent observations. Robust because the CLT makes the sampling distribution of the mean near-normal for moderate $n$ even if raw data aren't. Fragile under strong skew with tiny $n$, heavy outliers, or dependence."
            },
            {
              "front": "How do a two-sided t-test and a confidence interval relate?",
              "back": "A level-$\\alpha$ two-sided test rejects $H_0:\\mu=\\mu_0$ iff $\\mu_0$ lies outside the $(1-\\alpha)$ CI $\\bar X\\pm t^{*}_{n-1}s/\\sqrt n$. For two samples, reject \"no difference\" iff the CI for $\\mu_1-\\mu_2$ excludes 0."
            }
          ],
          "homework": [
            {
              "prompt": "A sample of $n=25$ has $\\bar X=104$ and $s=10$. Test $H_0:\\mu=100$ vs $H_1:\\mu\\ne100$ at $\\alpha=0.05$ (use $t^{*}_{24}\\approx 2.064$). Compute the t-statistic and state the decision.",
              "hint": "$t=(\\bar X-\\mu_0)/(s/\\sqrt n)$ with $n-1=24$ d.f.",
              "solution": "$\\operatorname{SE}=s/\\sqrt n=10/\\sqrt{25}=10/5=2$. $t=\\frac{104-100}{2}=2.0$. With $24$ d.f., $|t|=2.0<2.064=t^{*}_{24}$, so we <strong>fail to reject</strong> $H_0$ at the 5% level — just barely (it would reject at a slightly looser threshold). The 95% CI $104\\pm 2.064\\cdot 2=[99.87,108.13]$ contains 100, consistent with failing to reject."
            },
            {
              "prompt": "Two independent groups: group 1 has $\\bar X_1=20$, $s_1=4$, $n_1=50$; group 2 has $\\bar X_2=18$, $s_2=3$, $n_2=50$. Compute the two-sample t-statistic for $H_0:\\mu_1=\\mu_2$.",
              "hint": "$\\operatorname{SE}=\\sqrt{s_1^2/n_1+s_2^2/n_2}$, then $t=(\\bar X_1-\\bar X_2)/\\operatorname{SE}$.",
              "solution": "$\\operatorname{SE}=\\sqrt{\\frac{4^2}{50}+\\frac{3^2}{50}}=\\sqrt{\\frac{16}{50}+\\frac{9}{50}}=\\sqrt{\\frac{25}{50}}=\\sqrt{0.5}\\approx 0.707$. $t=\\frac{20-18}{0.707}=\\frac{2}{0.707}\\approx 2.83$. With large samples this exceeds the ~1.98 two-sided cutoff, so we would reject $H_0$ — the groups differ significantly."
            },
            {
              "prompt": "You compare two models across the same 10 cross-validation folds. Why is a paired t-test on the per-fold score differences more appropriate (and usually more powerful) than a two-sample t-test treating the 10 scores of each model as independent groups?",
              "hint": "The two models see the same folds; what source of variation does pairing remove?",
              "solution": "The two models are evaluated on the <em>same</em> folds, so their scores are not independent — an \"easy\" fold inflates both models' scores together. A paired test looks at the per-fold difference $d_i=\\text{score}_A^{(i)}-\\text{score}_B^{(i)}$, which cancels the shared fold-difficulty variation, leaving only the model-vs-model signal. This removes a large nuisance source of variance, shrinking the standard error and raising power. Treating the scores as two independent groups ignores the pairing, wastes that structure, and can badly understate the evidence."
            }
          ],
          "examples": [
            {
              "title": "A complete one-sample t-test",
              "body": "A coffee shop claims its lattes contain $\\mu_0=240$ mL. A skeptical customer measures $n=9$ lattes and finds $\\bar X=232$ mL with sample SD $s=12$ mL. Test $H_0:\\mu=240$ vs $H_1:\\mu\\ne 240$ at $\\alpha=0.05$ (use $t^{*}_{8}\\approx 2.306$). Conclude, and give the 95% CI.",
              "solution": "Standard error: $\\operatorname{SE}=s/\\sqrt n=12/\\sqrt 9=12/3=4$.\n\nt-statistic: $t=\\dfrac{232-240}{4}=\\dfrac{-8}{4}=-2.0$, with $n-1=8$ degrees of freedom.\n\nDecision: $|{-2.0}|=2.0<2.306=t^{*}_8$, so we <strong>fail to reject</strong> $H_0$ at the 5% level — the 8 mL shortfall is not statistically significant with only 9 measurements.\n\n95% CI: $232\\pm 2.306\\cdot 4 = 232\\pm 9.22=[222.8,\\ 241.2]$ mL. The interval contains the claimed 240 mL, consistent with failing to reject. (With a larger sample the same 8 mL gap could well become significant — a power issue.)"
            },
            {
              "title": "Two-sample test for an A/B experiment",
              "body": "An A/B test of average session length (minutes): control has $\\bar X_1=8.0$, $s_1=3.0$, $n_1=200$; variant has $\\bar X_2=8.6$, $s_2=3.2$, $n_2=200$. Test $H_0:\\mu_1=\\mu_2$ vs $H_1:\\mu_1\\ne\\mu_2$ (large-sample, so compare to $\\approx 1.96$). Is the variant significantly better?",
              "solution": "Standard error of the difference: $\\operatorname{SE}=\\sqrt{\\dfrac{3.0^2}{200}+\\dfrac{3.2^2}{200}}=\\sqrt{\\dfrac{9}{200}+\\dfrac{10.24}{200}}=\\sqrt{\\dfrac{19.24}{200}}=\\sqrt{0.0962}\\approx 0.310$.\n\nt-statistic: $t=\\dfrac{8.6-8.0}{0.310}=\\dfrac{0.6}{0.310}\\approx 1.94$.\n\nDecision: $|t|\\approx 1.94<1.96$, so we <strong>fail to reject</strong> $H_0$ at the 5% level — just short of significance (two-sided $p\\approx 0.053$). The variant looks promising but the evidence is borderline; the principled move is to collect more data (raising power) rather than to declare victory or defeat. The corresponding 95% CI for the difference, $0.6\\pm 1.96\\cdot 0.310=[-0.01,\\ 1.21]$, barely includes 0 — the same borderline conclusion."
            },
            {
              "title": "A paired t-test is a one-sample test on the differences",
              "body": "Three subjects are measured before and after a treatment, giving paired differences $d = [2, 4, 3]$. Is the change significant? Run a paired $t$-test.",
              "solution": "<strong>The key move.</strong> A paired test is not a new procedure — collapse each pair to its <em>difference</em> and run a one-sample $t$-test on those differences against $0$.\n<strong>Mean and spread.</strong> $\\bar{d} = (2+4+3)/3 = 3$. The sample standard deviation uses deviations $[-1, 1, 0]$:\n$$s = \\sqrt{\\frac{(-1)^2 + 1^2 + 0^2}{3 - 1}} = \\sqrt{\\tfrac{2}{2}} = 1.$$\n<strong>The t-statistic.</strong> With standard error $s/\\sqrt{n} = 1/\\sqrt{3} \\approx 0.577$:\n$$t = \\frac{\\bar{d}}{s/\\sqrt{n}} = \\frac{3}{0.577} \\approx 5.20, \\qquad \\mathrm{df} = n - 1 = 2.$$\n<strong>Conclusion.</strong> A $t \\approx 5.2$ on 2 degrees of freedom is large (past the two-sided 5% critical value $\\approx 4.30$), so we reject \"no change.\"\n<strong>Why pairing helps.</strong> Differencing cancels the between-subject variation, leaving only the <em>within-pair</em> change — usually a much smaller standard error, and more power, than comparing two independent groups."
            }
          ]
        }
      ]
    },
    {
      "title": "Bayesian Inference",
      "lessons": [
        {
          "id": "ps-bayesian-inference",
          "title": "Bayesian Inference: Priors, Likelihoods & Posteriors",
          "minutes": 16,
          "content": "<h3>1. The Bayesian worldview: probability as belief</h3>\n<p>Frequentist statistics treats a parameter (say a coin's bias $\\theta$) as a fixed unknown number and asks how data would behave under repetition. <b>Bayesian inference</b> instead treats $\\theta$ itself as a random quantity and represents our <em>uncertainty</em> about it with a probability distribution. Learning is then nothing more than updating that distribution as evidence arrives.</p>\n<p>This is the same Bayes' theorem you met for events, now applied to a continuous parameter: we start with a <b>prior</b>, multiply by how well each value explains the data (the <b>likelihood</b>), and renormalize to get a <b>posterior</b>.</p>\n<h3>2. Bayes' rule for inference: posterior ∝ likelihood × prior</h3>\n<p>$$p(\\theta \\mid D) \\;=\\; \\frac{p(D \\mid \\theta)\\,p(\\theta)}{p(D)} \\;\\propto\\; \\underbrace{p(D\\mid\\theta)}_{\\text{likelihood}}\\;\\underbrace{p(\\theta)}_{\\text{prior}}.$$</p>\n<p>The denominator $p(D)=\\int p(D\\mid\\theta)\\,p(\\theta)\\,d\\theta$ is just the normalizing constant (the <em>evidence</em>); it does not depend on $\\theta$, so for finding the shape of the posterior we can ignore it and write <b>posterior $\\propto$ likelihood $\\times$ prior</b>.</p>\n<div data-viz=\"calc-bayes\"></div>\n<h3>3. A worked update: a coin's bias (Beta–Binomial)</h3>\n<div data-viz=\"ps-beta-update\"></div>\n<p>Let $\\theta$ be the probability of heads. Encode prior belief with a $\\mathrm{Beta}(\\alpha,\\beta)$ distribution; observing $k$ heads in $n$ flips contributes a Binomial likelihood $\\theta^{k}(1-\\theta)^{n-k}$. Multiplying, the posterior is again Beta:</p>\n<p>$$\\theta\\sim\\mathrm{Beta}(\\alpha,\\beta),\\quad \\text{data }(k,n)\\;\\Rightarrow\\; \\theta\\mid D \\sim \\mathrm{Beta}(\\alpha+k,\\;\\beta+n-k).$$</p>\n<p>The update is wonderfully simple: <b>add successes to $\\alpha$ and failures to $\\beta$.</b> Starting from $\\mathrm{Beta}(2,2)$ (a mild \"probably fair\") and seeing $7$ heads in $10$ gives $\\mathrm{Beta}(9,5)$, with posterior mean $\\tfrac{9}{14}\\approx 0.64$ — pulled from the prior's $0.5$ toward the data's $0.7$.</p>\n<h3>Code it: a Bayesian update</h3>\n<p>Run the Beta–Binomial update yourself: a prior, some data, and the posterior is one line of arithmetic.</p>\n<div data-code=\"javascript\" data-expected=\"posterior = Beta(9, 5)\nposterior mean = 0.643\na flat prior would give MLE = 0.700\">// Beta-Binomial update: prior Beta(a,b), observe k heads in n flips\nlet a = 2, b = 2;                 // prior Beta(2,2) — \"probably fair\"\nconst k = 7, n = 10;              // data: 7 heads in 10 flips\nconst A = a + k, B = b + (n - k); // posterior Beta(A, B): add successes / failures\nconst mean = A / (A + B);\nconsole.log(`posterior = Beta(${A}, ${B})`);\nconsole.log(`posterior mean = ${mean.toFixed(3)}`);\nconsole.log(`a flat prior would give MLE = ${(k/n).toFixed(3)}`);</div>\n<h3>4. Conjugate priors</h3>\n<p>The Beta prior is <b>conjugate</b> to the Binomial likelihood: the posterior stays in the same family (Beta), so updating is just arithmetic on the parameters — no integrals. Other famous pairs: Gaussian–Gaussian (known variance), and Gamma–Poisson. Conjugacy is a convenience, not a requirement; without it we approximate the posterior numerically (MCMC, variational inference).</p>\n<h3>5. Point estimates: MAP vs MLE</h3>\n<p>Sometimes you want a single number, not a whole distribution. The <b>MAP</b> (maximum a posteriori) estimate is the posterior's mode — the most probable $\\theta$ given prior and data. The <b>MLE</b> (maximum likelihood) maximizes only the likelihood, ignoring the prior:</p>\n<p>$$\\hat\\theta_{\\text{MAP}}=\\arg\\max_\\theta\\, p(\\theta\\mid D),\\qquad \\hat\\theta_{\\text{MLE}}=\\arg\\max_\\theta\\, p(D\\mid\\theta).$$</p>\n<p>With a <em>flat</em> prior the two coincide, so MAP can be read as \"MLE plus a regularizing prior\". For our coin, $\\mathrm{Beta}(2,2)$ gives $\\hat\\theta_{\\text{MAP}}=\\tfrac{8}{12}\\approx 0.67$ versus $\\hat\\theta_{\\text{MLE}}=0.7$.</p>\n<h3>6. Credible intervals (not confidence intervals)</h3>\n<p>A <b>95% credible interval</b> is an interval that holds 95% of the posterior probability: given the data, there is a 95% chance $\\theta$ lies inside it. That is the direct probability statement people <em>wish</em> a confidence interval made — but a frequentist CI cannot, because to it $\\theta$ is fixed and only the interval is random. The Bayesian version says what we actually want, at the cost of requiring a prior.</p>\n<h3>7. How data overwhelms the prior</h3>\n<p>With little data the prior steers the answer; as $n$ grows the likelihood sharpens and dominates, so two analysts with different (non-dogmatic) priors converge. In $\\mathrm{Beta}(\\alpha+k,\\beta+n-k)$ the prior's $\\alpha,\\beta$ become negligible once $k$ and $n-k$ are large — the posterior mean $\\to k/n$, the MLE. The prior matters most exactly when data is scarce, which is also when it helps most.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: flat, weak, and improper priors</summary>\n<p>Priors span a spectrum: <b>informative</b> (real domain knowledge), <b>weakly-informative</b> (gently regularizing, e.g. a wide Gaussian), and <b>flat</b>. A flat prior over an unbounded parameter is <b>improper</b> — it does not integrate to a finite number — yet it can still produce a proper posterior once data arrive. Improper priors are a convenience, not a free lunch: they sometimes yield improper or paradoxical posteriors, which is why weakly-informative priors are the modern default.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the likelihood principle</summary>\n<p>The <b>likelihood principle</b> says everything the data tell us about $\\theta$ is carried by the likelihood $p(D\\mid\\theta)$: two experiments with proportional likelihoods should lead to the same inference. Bayesian inference obeys it automatically, since the posterior depends on the data only through the likelihood. Many frequentist procedures do not — a p-value can depend on the experimenter's <em>stopping rule</em> (the intended sample size), not just the data actually observed, which is a recurring source of controversy.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why we work in log-space</summary>\n<p>In practice we compute with $\\log p(\\theta\\mid D)=\\log p(D\\mid\\theta)+\\log p(\\theta)+\\text{const}$, because a product of many small probabilities underflows to zero. Maximizing this log-posterior gives the MAP estimate and exposes the link to optimization: $-\\log p(D\\mid\\theta)$ is a loss and $-\\log p(\\theta)$ is a regularizer, so MAP is regularized maximum likelihood — exactly the shape of ridge and lasso.</p>\n</details>\n\n<details class=\"deep-dive\">\n<summary>Deeper dive: Gaussian processes — a prior over functions</summary>\n<p>Most models fit parameters; a <b>Gaussian process</b> (GP) skips them and puts a prior directly over <em>functions</em>. Formally it is a distribution in which any finite set of points has a joint Gaussian distribution. You never choose a functional form — you choose a <b>kernel</b> $k(x,x')$ saying how correlated two inputs' outputs are: nearby inputs get similar outputs, which is how the GP encodes smoothness.</p>\n<p>Regression then falls out by conditioning. Observe some points and the GP prior updates to a posterior that is <em>again</em> a GP. Its posterior <em>mean</em> is your prediction; its posterior <em>variance</em> is the killer feature — calibrated error bars that are tight near your data and balloon where you have none. The same <a href=\"#/lesson/machine-learning/ml-svm\" data-route>kernel trick</a> that powers the SVM is at work here: a GP is Bayesian linear regression with infinitely many basis functions.</p>\n<p>That built-in uncertainty makes GPs the engine of <b>Bayesian optimization</b>: to tune an expensive black-box function (hyperparameters, lab experiments), fit a GP to what you've tried, then probe where the posterior mean is high <em>or</em> the variance is large — explore-exploit once more. Their cost is cubic in the number of points (you invert the kernel matrix), which is why GPs shine on small, expensive datasets rather than big ones.</p>\n</details>\n<div data-viz=\"ps-gaussian-process\"></div>\n<p class=\"see-also\"><b>See also:</b> the explore-exploit trade-off behind a Bayesian-optimization acquisition function is exactly the one in <a href=\"#/lesson/reinforcement-learning/rl-exploration\" data-route>UCB and bandits</a> — sample where the estimate is high <em>or</em> where uncertainty is large.</p>\n<h3>8. Why this matters for machine learning</h3>\n<p>Bayesian thinking underlies regularization (a prior on weights — ridge is a Gaussian prior, lasso a Laplace prior), $\\mathrm{MAP}$ training, Bayesian model comparison, Gaussian processes, Thompson sampling for bandits, and modern uncertainty estimation. Even when we only compute a point estimate, \"posterior $\\propto$ likelihood $\\times$ prior\" is the lens that explains <em>why</em> the estimate looks the way it does.</p>",
          "mcq": [
            {
              "q": "In Bayesian inference, the posterior is proportional to:",
              "choices": [
                "Likelihood × prior",
                "Prior ÷ likelihood",
                "The evidence $p(D)$ alone",
                "Likelihood − prior"
              ],
              "answer": 0,
              "explain": "$p(\\theta\\mid D)\\propto p(D\\mid\\theta)\\,p(\\theta)$; the evidence only normalizes."
            },
            {
              "q": "The prior $p(\\theta)$ encodes:",
              "choices": [
                "The probability of the data",
                "Belief about the parameter before seeing the data",
                "The final answer",
                "The sampling noise"
              ],
              "answer": 1,
              "explain": "The prior is the pre-data distribution over the parameter; data then updates it."
            },
            {
              "q": "A prior is \"conjugate\" to a likelihood when:",
              "choices": [
                "The likelihood is Gaussian",
                "The prior is uniform",
                "The posterior is in the same family as the prior",
                "No data is observed"
              ],
              "answer": 2,
              "explain": "Conjugacy keeps the posterior in the prior's family (e.g. Beta→Beta), making the update pure arithmetic."
            },
            {
              "q": "The Beta distribution is the conjugate prior for which likelihood?",
              "choices": [
                "Exponential",
                "Poisson",
                "Gaussian with known mean",
                "Binomial / Bernoulli"
              ],
              "answer": 3,
              "explain": "Beta prior + Binomial likelihood → Beta posterior $\\mathrm{Beta}(\\alpha+k,\\beta+n-k)$."
            },
            {
              "q": "The MAP estimate is:",
              "choices": [
                "The mode of the posterior",
                "The mean of the prior",
                "The maximum of the likelihood, ignoring the prior",
                "Always equal to the MLE"
              ],
              "answer": 0,
              "explain": "MAP $=\\arg\\max_\\theta p(\\theta\\mid D)$ — the posterior mode, which uses the prior. MLE ignores the prior."
            },
            {
              "q": "As the amount of data grows without bound, the posterior:",
              "choices": [
                "Stays equal to the prior",
                "Concentrates and the prior's influence fades",
                "Becomes uniform",
                "Ignores the likelihood"
              ],
              "answer": 1,
              "explain": "The likelihood sharpens with $n$, so the posterior concentrates near the MLE and the prior matters less."
            },
            {
              "q": "A 95% credible interval $[a,b]$ means:",
              "choices": [
                "$\\theta$ equals the midpoint with 95% chance",
                "95% of repeated intervals would cover $\\theta$",
                "There is a 95% posterior probability that $\\theta\\in[a,b]$",
                "The data lies in $[a,b]$ 95% of the time"
              ],
              "answer": 2,
              "explain": "Bayesian credible intervals make a direct probability statement about $\\theta$ given the data — unlike frequentist confidence intervals."
            },
            {
              "q": "Under a flat (uniform) prior, the MAP estimate:",
              "choices": [
                "Is undefined",
                "Is always 0.5",
                "Equals the prior mean",
                "Equals the MLE"
              ],
              "answer": 3,
              "explain": "A flat prior adds no information, so maximizing the posterior reduces to maximizing the likelihood."
            },
            {
              "q": "Read as a function of $\\theta$, the likelihood $p(D\\mid\\theta)$ is:",
              "choices": [
                "Not a probability distribution over $\\theta$ (it need not integrate to 1)",
                "A valid distribution over $\\theta$",
                "Always equal to the posterior",
                "The prior in disguise"
              ],
              "answer": 0,
              "explain": "The likelihood is a distribution over the DATA for fixed $\\theta$; as a function of $\\theta$ it is just a curve and generally does not integrate to 1."
            },
            {
              "q": "The evidence $p(D)$ in Bayes' rule is:",
              "choices": [
                "The prior mean",
                "The marginal likelihood $\\int p(D\\mid\\theta)p(\\theta)\\,d\\theta$ — a normalizing constant",
                "The MAP estimate",
                "The likelihood at the MLE"
              ],
              "answer": 1,
              "explain": "$p(D)$ marginalizes $\\theta$ out; it normalizes the posterior and does not depend on $\\theta$."
            },
            {
              "q": "The mean of a $\\mathrm{Beta}(\\alpha,\\beta)$ distribution is:",
              "choices": [
                "$\\frac{\\alpha-1}{\\alpha+\\beta-2}$",
                "$\\frac{\\alpha}{\\beta}$",
                "$\\frac{\\alpha}{\\alpha+\\beta}$",
                "$\\alpha\\beta$"
              ],
              "answer": 2,
              "explain": "Beta mean is $\\alpha/(\\alpha+\\beta)$; $(\\alpha-1)/(\\alpha+\\beta-2)$ is its mode."
            },
            {
              "q": "Starting from a $\\mathrm{Beta}(2,2)$ prior, after observing 7 heads in 10 flips the posterior is:",
              "choices": [
                "$\\mathrm{Beta}(9,7)$",
                "$\\mathrm{Beta}(7,3)$",
                "$\\mathrm{Beta}(2,2)$",
                "$\\mathrm{Beta}(9,5)$"
              ],
              "answer": 3,
              "explain": "Add 7 successes to $\\alpha$ and 3 failures to $\\beta$: $\\mathrm{Beta}(2+7,\\,2+3)=\\mathrm{Beta}(9,5)$."
            },
            {
              "q": "The defining difference of the Bayesian approach is that the parameter $\\theta$ is:",
              "choices": [
                "Treated as a random variable with its own distribution",
                "A fixed unknown constant only",
                "Always known",
                "Equal to the data mean"
              ],
              "answer": 0,
              "explain": "Bayesians put a probability distribution over $\\theta$ (prior, then posterior); frequentists treat it as fixed."
            },
            {
              "q": "A more concentrated (stronger) prior:",
              "choices": [
                "Is ignored by the likelihood",
                "Requires more data to be overturned",
                "Always equals the posterior",
                "Makes the evidence zero"
              ],
              "answer": 1,
              "explain": "A high-precision prior dominates until enough data accumulates to outweigh it."
            },
            {
              "q": "Under a flat (uniform) prior, the posterior is proportional to:",
              "choices": [
                "The evidence",
                "The prior",
                "The likelihood",
                "A constant"
              ],
              "answer": 2,
              "explain": "With $p(\\theta)$ constant, $p(\\theta\\mid D)\\propto p(D\\mid\\theta)$ — the likelihood alone shapes the posterior."
            },
            {
              "q": "The posterior $\\mathrm{Beta}(9,5)$ has mean:",
              "choices": [
                "$\\frac{5}{14}\\approx 0.36$",
                "$\\frac{9}{5}=1.8$",
                "$0.5$",
                "$\\frac{9}{14}\\approx 0.64$"
              ],
              "answer": 3,
              "explain": "Beta mean $=\\frac{\\alpha}{\\alpha+\\beta}=\\frac{9}{14}\\approx 0.643$ — between the prior's 0.5 and the data's 0.7."
            }
          ],
          "flashcards": [
            {
              "front": "Bayes' rule in its inference form",
              "back": "$p(\\theta\\mid D)\\propto p(D\\mid\\theta)\\,p(\\theta)$ — posterior is proportional to likelihood times prior; the evidence $p(D)$ just normalizes."
            },
            {
              "front": "What is the prior $p(\\theta)$?",
              "back": "Your belief about the parameter <em>before</em> seeing the data, expressed as a probability distribution."
            },
            {
              "front": "What is the likelihood $p(D\\mid\\theta)$?",
              "back": "How probable the observed data is for each value of the parameter — read as a function of $\\theta$."
            },
            {
              "front": "Conjugate prior",
              "back": "A prior whose posterior stays in the same family (e.g. Beta prior + Binomial likelihood → Beta posterior), so updating is just arithmetic."
            },
            {
              "front": "MAP vs MLE",
              "back": "MAP maximizes the posterior (uses the prior); MLE maximizes only the likelihood. They coincide under a flat prior."
            },
            {
              "front": "Credible interval",
              "back": "An interval containing the parameter with a stated posterior probability (e.g. 95%) — a direct probability statement about $\\theta$, unlike a confidence interval."
            }
          ],
          "homework": [
            {
              "prompt": "You hold a $\\mathrm{Beta}(3,1)$ prior for a coin's heads-probability and then observe 4 heads and 6 tails. What is the posterior distribution, and its mean?",
              "hint": "Posterior $=\\mathrm{Beta}(\\alpha+k,\\beta+n-k)$; Beta mean $=\\frac{\\alpha}{\\alpha+\\beta}$.",
              "solution": "Posterior $=\\mathrm{Beta}(3+4,\\,1+6)=\\mathrm{Beta}(7,7)$, with mean $\\frac{7}{14}=0.5$. The data (0.4 heads) pulled the prior (mean 0.75) down to a balanced 0.5."
            },
            {
              "prompt": "Show that with a uniform prior $\\mathrm{Beta}(1,1)$ the MAP estimate of a coin's bias equals the MLE $k/n$.",
              "hint": "Posterior is $\\mathrm{Beta}(1+k,1+n-k)$; its mode is $\\frac{\\alpha-1}{\\alpha+\\beta-2}$.",
              "solution": "Mode $=\\frac{(1+k)-1}{(1+k)+(1+n-k)-2}=\\frac{k}{n}$, exactly the MLE. A flat prior adds no information, so MAP collapses to MLE."
            },
            {
              "prompt": "A 95% credible interval for a treatment effect is $[0.2,\\,0.6]$. State precisely what this means, and contrast it with the frequentist confidence-interval interpretation.",
              "hint": "In the Bayesian view $\\theta$ is random given the data.",
              "solution": "Given the data and prior, there is a 95% posterior probability that the effect lies in $[0.2,0.6]$. A 95% <em>confidence</em> interval instead means: if the procedure were repeated many times, 95% of such intervals would cover the (fixed) true effect — it says nothing about this particular interval's probability."
            }
          ],
          "examples": [
            {
              "title": "Updating a coin step by step",
              "body": "Prior $\\mathrm{Beta}(2,2)$. You flip and see H, H, T, H. Update after each flip.",
              "solution": "Add each success to $\\alpha$, each failure to $\\beta$: H→Beta(3,2), H→Beta(4,2), T→Beta(4,3), H→Beta(5,3). Final posterior mean $=\\frac{5}{8}=0.625$. Order does not matter — only the totals (3 heads, 1 tail) do."
            },
            {
              "title": "Prior strength as pseudo-counts",
              "body": "Interpret $\\mathrm{Beta}(\\alpha,\\beta)$ as having already \"seen\" $\\alpha-1$ heads and $\\beta-1$ tails. How strong is $\\mathrm{Beta}(50,50)$ versus $\\mathrm{Beta}(2,2)$?",
              "solution": "$\\mathrm{Beta}(50,50)$ acts like 49 heads + 49 tails of prior evidence — very strong; 10 new flips barely move it. $\\mathrm{Beta}(2,2)$ is like 1+1 pseudo-counts — weak, so data quickly takes over. Larger $\\alpha+\\beta$ = more confident prior."
            },
            {
              "title": "MAP as regularized MLE",
              "body": "Why is ridge regression a MAP estimate?",
              "solution": "Ridge minimizes $\\|y-Xw\\|^2+\\lambda\\|w\\|^2$. Reading $\\|y-Xw\\|^2$ as a Gaussian negative-log-likelihood and $\\lambda\\|w\\|^2$ as a Gaussian prior $w\\sim\\mathcal N(0,\\sigma^2 I)$ on the weights, the ridge objective is exactly $-\\log p(D\\mid w)-\\log p(w)$, so its minimizer is the MAP estimate."
            }
          ]
        },
        {
          "id": "ps-conjugate-priors",
          "title": "Conjugate Priors: Updates Without Integrals",
          "minutes": 15,
          "content": "<h3>1. The problem conjugacy solves</h3>\n<p>Bayes' rule says $p(\\theta\\mid D)\\propto p(D\\mid\\theta)\\,p(\\theta)$, but turning that proportionality into an actual distribution means computing the evidence $p(D)=\\int p(D\\mid\\theta)p(\\theta)\\,d\\theta$ — an integral that is usually intractable. <b>Conjugate priors</b> sidestep it: pick a prior whose algebra meshes with the likelihood so the posterior comes out in the <em>same family</em>, and the update becomes a formula instead of an integral.</p>\n<h3>2. The conjugate idea</h3>\n<p>A prior family is <b>conjugate</b> to a likelihood if multiplying them (and renormalizing) lands you back in that family. Then \"doing inference\" is just mapping the prior's parameters to the posterior's — closed form, exact, instant.</p>\n<h3>3. Beta–Binomial: the canonical pair</h3>\n<p>For a probability $\\theta$ with a Binomial likelihood, the $\\mathrm{Beta}(\\alpha,\\beta)$ prior is conjugate:</p>\n<p>$$\\theta\\mid (k\\text{ successes},\\,n)\\;\\sim\\;\\mathrm{Beta}(\\alpha+k,\\;\\beta+n-k).$$</p>\n<p>Read $\\alpha,\\beta$ as prior \"pseudo-counts\" of successes and failures; updating just <b>adds the observed successes to $\\alpha$ and failures to $\\beta$</b>.</p>\n<h3>4. Gaussian–Gaussian: precision-weighted averaging</h3>\n<p>For an unknown mean $\\theta$ with known variance $\\sigma^2$, a Gaussian prior $\\mathcal N(\\mu_0,\\sigma_0^2)$ is conjugate. Writing <b>precision</b> $=1/\\text{variance}$, the posterior precision is the <em>sum</em> of prior and data precision, and the posterior mean is their precision-weighted average:</p>\n<p>$$\\frac{1}{\\sigma_n^2}=\\frac{1}{\\sigma_0^2}+\\frac{n}{\\sigma^2},\\qquad \\mu_n=\\sigma_n^2\\!\\left(\\frac{\\mu_0}{\\sigma_0^2}+\\frac{n\\,\\bar x}{\\sigma^2}\\right).$$</p>\n<p>So evidence \"adds up\" as precision, and whichever source (prior or data) is more precise pulls the mean harder. With $\\mathcal N(0,1)$, four readings averaging $\\bar x=2$ at $\\sigma^2=1$ give posterior $\\mathcal N(1.6,\\,0.2)$.</p>\n<div data-viz=\"ps-normal-explorer\"></div>\n<h3>5. Gamma–Poisson: rates and counts</h3>\n<p>For a Poisson rate $\\lambda$, the $\\mathrm{Gamma}(\\alpha,\\beta)$ prior is conjugate; observing total count $S=\\sum x_i$ over $n$ intervals gives $\\lambda\\mid D\\sim\\mathrm{Gamma}(\\alpha+S,\\,\\beta+n)$, posterior mean $\\frac{\\alpha+S}{\\beta+n}$. Here $\\alpha$ is prior \"events\" and $\\beta$ prior \"exposure\". $\\mathrm{Gamma}(2,1)$ with $10$ events in $5$ intervals gives $\\mathrm{Gamma}(12,6)$, mean $2.0$ — matching the MLE $S/n$.</p>\n<h3>Code it: a Gamma–Poisson update</h3>\n<p>Conjugate updating is just parameter arithmetic. Update a Poisson rate from event counts:</p>\n<div data-code=\"javascript\" data-expected=\"posterior = Gamma(12, 6)\nposterior mean rate = 2.00\nMLE rate = 2.00\">// Gamma-Poisson conjugate update: prior Gamma(a,b), observe S events over n intervals\nconst a = 2, b = 1;          // prior Gamma(2,1): a = prior events, b = prior exposure\nconst S = 10, n = 5;         // data: 10 events over 5 intervals\nconst A = a + S, B = b + n;  // posterior Gamma(A, B) — just add events and exposure\nconst mean = A / B;          // Gamma mean = shape / rate\nconsole.log(`posterior = Gamma(${A}, ${B})`);\nconsole.log(`posterior mean rate = ${mean.toFixed(2)}`);\nconsole.log(`MLE rate = ${(S / n).toFixed(2)}`);</div>\n<h3>6. Why conjugacy exists: the exponential family</h3>\n<p>These pairs are not coincidences. Every conjugate pair has a likelihood in the <b>exponential family</b> — distributions whose log-likelihood is linear in some <em>sufficient statistics</em> of the data. The conjugate prior mimics that same functional form, so multiplying simply adds the prior's pseudo-data to the real data's sufficient statistics. That is exactly the \"add counts\" pattern you saw above.</p>\n<h3>7. When to abandon conjugacy</h3>\n<p>Conjugacy is a convenience, not a constraint. Real models (hierarchical priors, logistic likelihoods, neural nets) rarely have conjugate forms, and forcing a conjugate prior can distort genuine belief. When the posterior has no closed form we approximate it — <b>MCMC</b> samples from it, <b>variational inference</b> fits a simpler distribution to it. Use conjugacy when it fits; reach for computation when it does not.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the exponential family behind every conjugate pair</summary>\n<p>Conjugacy is not a coincidence — it follows from the <b>exponential family</b> form $p(x\\mid\\theta)=h(x)\\exp\\!\\big(\\eta(\\theta)^\\top T(x)-A(\\theta)\\big)$, where $T(x)$ are the <b>sufficient statistics</b>. The conjugate prior mirrors that same shape in $\\theta$, so multiplying prior by likelihood simply <em>adds</em> the data's sufficient statistics to the prior's pseudo-data. That single fact is the \"add successes and failures\" rule for Beta–Binomial and the \"add events and exposure\" rule for Gamma–Poisson.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: prior strength as an effective sample size</summary>\n<p>A conjugate prior behaves like data you have already seen. $\\mathrm{Beta}(\\alpha,\\beta)$ carries about $\\alpha+\\beta-2$ pseudo-observations, and $\\mathrm{Gamma}(\\alpha,\\beta)$ carries $\\beta$ units of prior exposure. This <b>prior strength</b> is its effective sample size: a $\\mathrm{Beta}(50,50)$ is as stubborn as roughly a hundred prior flips and barely moves on ten new ones, whereas $\\mathrm{Beta}(1,1)$ yields after a handful. Choosing a prior is largely choosing this strength.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: when conjugacy breaks</summary>\n<p>Conjugacy is fragile: add a logistic likelihood, a hierarchical prior, or a neural network and no conjugate form exists. Two partial rescues: a <b>mixture</b> of conjugate priors is itself conjugate (it stays a mixture after updating), buying flexibility cheaply; and for everything else we abandon closed form and approximate the posterior with MCMC or variational inference. Conjugacy is simply the special case that happens to be easy — the general case is computational.</p>\n</details>\n\n<h3>8. Summary</h3>\n<p>Conjugate priors turn Bayesian updating into arithmetic on parameters: Beta+Binomial, Gaussian+Gaussian, Gamma+Poisson. Precision (or pseudo-counts) from prior and data simply add, so more or sharper data steadily overwhelms the prior — the same lesson as before, now with closed-form machinery behind it.</p>",
          "mcq": [
            {
              "q": "The practical payoff of using a conjugate prior is that:",
              "choices": [
                "The posterior has a closed form — no evidence integral to compute",
                "The prior becomes uniform",
                "The data can be ignored",
                "The likelihood disappears"
              ],
              "answer": 0,
              "explain": "Conjugacy keeps the posterior in the prior's family, so updating is a formula, not an intractable integral."
            },
            {
              "q": "Updating a $\\mathrm{Beta}(\\alpha,\\beta)$ prior with $k$ successes in $n$ trials gives:",
              "choices": [
                "$\\mathrm{Beta}(\\alpha+n,\\,\\beta+k)$",
                "$\\mathrm{Beta}(\\alpha+k,\\,\\beta+n-k)$",
                "$\\mathrm{Beta}(\\alpha k,\\,\\beta(n-k))$",
                "$\\mathrm{Beta}(\\alpha,\\beta)$ unchanged"
              ],
              "answer": 1,
              "explain": "Add successes to $\\alpha$ and failures $n-k$ to $\\beta$."
            },
            {
              "q": "In the Gaussian–Gaussian model (known variance), the posterior mean is:",
              "choices": [
                "Always the prior mean",
                "Always the data mean",
                "A precision-weighted average of the prior mean and the data mean",
                "The product of the two means"
              ],
              "answer": 2,
              "explain": "$\\mu_n=\\sigma_n^2(\\mu_0/\\sigma_0^2+n\\bar x/\\sigma^2)$ — each source weighted by its precision."
            },
            {
              "q": "The Gamma distribution is the conjugate prior for which likelihood?",
              "choices": [
                "Uniform",
                "Binomial",
                "Gaussian mean",
                "Poisson (a rate)"
              ],
              "answer": 3,
              "explain": "$\\mathrm{Gamma}(\\alpha,\\beta)$ + Poisson data $\\to\\mathrm{Gamma}(\\alpha+S,\\beta+n)$."
            },
            {
              "q": "In the Gaussian–Gaussian model, the posterior precision equals:",
              "choices": [
                "Prior precision plus data precision ($1/\\sigma_0^2+n/\\sigma^2$)",
                "Prior precision minus data precision",
                "The smaller of the two precisions",
                "Always $1$"
              ],
              "answer": 0,
              "explain": "Independent Gaussian information adds as precision; variance is its reciprocal."
            },
            {
              "q": "Conjugate pairs exist because the likelihood belongs to the:",
              "choices": [
                "Uniform family",
                "Exponential family (log-likelihood linear in sufficient statistics)",
                "Set of heavy-tailed distributions",
                "Class of discrete distributions only"
              ],
              "answer": 1,
              "explain": "The conjugate prior mirrors the exponential-family form, so updating just adds pseudo-data to the sufficient statistics."
            },
            {
              "q": "A prior with very small variance (high precision) will:",
              "choices": [
                "Always equal the posterior",
                "Be overwhelmed by a single observation",
                "Require a lot of data before the posterior moves much",
                "Make the likelihood irrelevant"
              ],
              "answer": 2,
              "explain": "A tight, high-precision prior dominates $1/\\sigma_0^2+n/\\sigma^2$ until $n$ grows large."
            },
            {
              "q": "When no conjugate prior suits the model, you should:",
              "choices": [
                "Use the prior as the answer",
                "Abandon Bayesian inference",
                "Force a uniform prior always",
                "Approximate the posterior with MCMC or variational inference"
              ],
              "answer": 3,
              "explain": "Bayes' rule still holds; you just compute the posterior numerically instead of in closed form."
            },
            {
              "q": "The conjugate prior for the mean of a Gaussian (with known variance) is:",
              "choices": [
                "A Gaussian",
                "A Beta",
                "A Gamma",
                "A uniform on $[0,1]$"
              ],
              "answer": 0,
              "explain": "Gaussian prior + Gaussian likelihood (known variance) → Gaussian posterior."
            },
            {
              "q": "A $\\mathrm{Gamma}(2,1)$ prior for a Poisson rate, after 10 events over 5 intervals, becomes:",
              "choices": [
                "$\\mathrm{Gamma}(20,5)$",
                "$\\mathrm{Gamma}(12,6)$",
                "$\\mathrm{Gamma}(2,1)$",
                "$\\mathrm{Gamma}(10,5)$"
              ],
              "answer": 1,
              "explain": "$\\mathrm{Gamma}(\\alpha+S,\\beta+n)=\\mathrm{Gamma}(2+10,\\,1+5)$."
            },
            {
              "q": "A uniform prior $\\mathrm{Beta}(1,1)$, after 3 successes in 5 trials, becomes:",
              "choices": [
                "$\\mathrm{Beta}(4,5)$",
                "$\\mathrm{Beta}(3,5)$",
                "$\\mathrm{Beta}(4,3)$",
                "$\\mathrm{Beta}(1,1)$"
              ],
              "answer": 2,
              "explain": "Add 3 successes and 2 failures: $\\mathrm{Beta}(1+3,\\,1+2)=\\mathrm{Beta}(4,3)$."
            },
            {
              "q": "In $\\mathrm{Beta}(\\alpha,\\beta)$, the parameters $\\alpha$ and $\\beta$ behave like:",
              "choices": [
                "Sample size and number of trials",
                "The data mean and variance",
                "The MLE and its error",
                "Prior pseudo-counts of successes and failures"
              ],
              "answer": 3,
              "explain": "A Beta prior acts as $\\alpha-1$ prior successes and $\\beta-1$ prior failures; updating just adds observed counts."
            },
            {
              "q": "In a Gaussian–Gaussian model, prior precision $1$ and data precision $4$ give a posterior variance of:",
              "choices": [
                "$0.2$",
                "$5$",
                "$0.25$",
                "$1.25$"
              ],
              "answer": 0,
              "explain": "Precisions add: $1+4=5$; variance is the reciprocal, $1/5=0.2$."
            },
            {
              "q": "In the Gaussian–Gaussian posterior mean, the estimate is pulled toward:",
              "choices": [
                "Always the prior mean",
                "Whichever source (prior or data) has higher precision",
                "Always the data mean",
                "The larger of the two means"
              ],
              "answer": 1,
              "explain": "The mean is a precision-weighted average, so the more precise source dominates."
            },
            {
              "q": "Bayesian updating is sequential: after seeing a batch of data,",
              "choices": [
                "All earlier data is discarded",
                "The prior must be reset to uniform",
                "Today's posterior becomes the prior for the next batch",
                "The likelihood is recomputed from scratch each time"
              ],
              "answer": 2,
              "explain": "Posteriors chain: $p(\\theta\\mid D_1,D_2)\\propto p(D_2\\mid\\theta)\\,p(\\theta\\mid D_1)$, so yesterday's posterior is today's prior."
            },
            {
              "q": "The posterior $\\mathrm{Beta}(4,3)$ has mean:",
              "choices": [
                "$0.5$",
                "$\\frac{3}{7}\\approx 0.43$",
                "$\\frac{4}{3}$",
                "$\\frac{4}{7}\\approx 0.57$"
              ],
              "answer": 3,
              "explain": "Beta mean $=\\frac{\\alpha}{\\alpha+\\beta}=\\frac{4}{7}\\approx 0.571$."
            }
          ],
          "flashcards": [
            {
              "front": "The practical payoff of a conjugate prior",
              "back": "The posterior is in the same family as the prior, so updating is a closed-form parameter map — no intractable evidence integral."
            },
            {
              "front": "Beta–Binomial update",
              "back": "$\\mathrm{Beta}(\\alpha,\\beta)\\to\\mathrm{Beta}(\\alpha+k,\\beta+n-k)$: add successes to $\\alpha$, failures to $\\beta$."
            },
            {
              "front": "Gaussian–Gaussian (known variance) posterior",
              "back": "Precisions add: $1/\\sigma_n^2=1/\\sigma_0^2+n/\\sigma^2$; the mean is the precision-weighted average of prior mean and data mean."
            },
            {
              "front": "Gamma–Poisson update",
              "back": "$\\mathrm{Gamma}(\\alpha,\\beta)\\to\\mathrm{Gamma}(\\alpha+S,\\beta+n)$ for total count $S$ over $n$ intervals; posterior mean $\\frac{\\alpha+S}{\\beta+n}$."
            },
            {
              "front": "Why do conjugate pairs exist?",
              "back": "The likelihood is in the exponential family; the conjugate prior copies its sufficient-statistic form, so updating just adds pseudo-data."
            },
            {
              "front": "What if no conjugate prior fits?",
              "back": "Approximate the posterior numerically — MCMC (sampling) or variational inference (fit a simpler distribution)."
            }
          ],
          "homework": [
            {
              "prompt": "Prior $\\mathcal N(10,4)$ for an unknown mean; you take 9 measurements averaging $\\bar x=13$ with known variance $\\sigma^2=9$. Give the posterior mean and variance.",
              "hint": "Posterior precision $=1/\\sigma_0^2+n/\\sigma^2$; mean is the precision-weighted average.",
              "solution": "Precision $=1/4+9/9=0.25+1=1.25$, so posterior variance $=1/1.25=0.8$. Mean $=0.8\\,(10/4+9\\cdot 13/9)=0.8\\,(2.5+13)=0.8\\cdot 15.5=12.4$. The (more precise) data pulls the estimate from 10 toward 13."
            },
            {
              "prompt": "Prior $\\mathrm{Gamma}(3,2)$ for a Poisson rate; you observe 20 events over 8 intervals. Give the posterior and its mean.",
              "hint": "$\\mathrm{Gamma}(\\alpha+S,\\beta+n)$.",
              "solution": "Posterior $=\\mathrm{Gamma}(3+20,\\,2+8)=\\mathrm{Gamma}(23,10)$, mean $=23/10=2.3$. The MLE alone would be $20/8=2.5$; the prior pulls it slightly down."
            },
            {
              "prompt": "Explain why conjugacy is convenient but never required for correct Bayesian inference.",
              "hint": "What does Bayes' rule need to hold?",
              "solution": "Bayes' rule $p(\\theta\\mid D)\\propto p(D\\mid\\theta)p(\\theta)$ holds for ANY prior and likelihood — conjugacy only makes the resulting posterior available in closed form. With a non-conjugate prior the posterior is still well-defined; we just compute it numerically (MCMC, variational inference) instead of by formula."
            }
          ],
          "examples": [
            {
              "title": "Gaussian–Gaussian by hand",
              "body": "Prior $\\mathcal N(0,1)$; four readings average $\\bar x=2$, known $\\sigma^2=1$. Find the posterior.",
              "solution": "Precision $=1/1+4/1=5\\Rightarrow$ variance $0.2$. Mean $=0.2\\,(0/1+4\\cdot 2/1)=0.2\\cdot 8=1.6$. Posterior $\\mathcal N(1.6,0.2)$ — close to the data mean 2 because four readings outweigh the unit-variance prior."
            },
            {
              "title": "Gamma–Poisson by hand",
              "body": "Prior $\\mathrm{Gamma}(2,1)$ for a call-centre rate; 10 calls arrive over 5 hours. Posterior?",
              "solution": "$\\mathrm{Gamma}(2+10,\\,1+5)=\\mathrm{Gamma}(12,6)$, mean $12/6=2.0$ calls/hour, matching the MLE $10/5$. The weak prior (one pseudo-event over one pseudo-hour) barely shifts it."
            },
            {
              "title": "Prior strength as precision",
              "body": "Why does a small prior variance $\\sigma_0^2$ make the prior \"stubborn\"?",
              "solution": "Prior precision $1/\\sigma_0^2$ is large when $\\sigma_0^2$ is small, so in $1/\\sigma_n^2=1/\\sigma_0^2+n/\\sigma^2$ the prior term dominates until $n$ is large. A tight prior demands a lot of data to be moved; a vague (large-variance) prior yields quickly."
            }
          ]
        },
        {
          "id": "ps-bayesian-decisions",
          "title": "From Posterior to Decisions: Estimates, Intervals & Prediction",
          "minutes": 15,
          "content": "<h3>1. The posterior is the answer — now summarize it</h3>\n<p>Bayesian inference delivers a whole distribution, the posterior $p(\\theta\\mid D)$. That is the complete answer, but to act we often need to compress it: a single estimate, an interval, or a prediction about new data. Each summary answers a different question — and which one is \"right\" depends on what it will cost you to be wrong.</p>\n<h3>2. Point estimates and the loss they minimize</h3>\n<p>Three natural point estimates fall out of three loss functions:</p>\n<ul><li><b>Posterior mean</b> — minimizes expected <em>squared</em> error $(\\hat\\theta-\\theta)^2$.</li>\n<li><b>Posterior median</b> — minimizes expected <em>absolute</em> error $|\\hat\\theta-\\theta|$ (robust to skew).</li>\n<li><b>Posterior mode (MAP)</b> — minimizes expected <em>0–1</em> loss (right/wrong).</li></ul>\n<p>So choosing an estimator is really choosing a loss. For a symmetric posterior the three coincide; for a skewed one they differ, and you should pick the loss that matches your problem.</p>\n<h3>3. Credible intervals: equal-tailed vs HPD</h3>\n<p>A 95% credible interval holds 95% of the posterior mass. Two common choices: the <b>equal-tailed</b> interval cuts 2.5% from each side; the <b>highest-posterior-density (HPD)</b> interval is the <em>shortest</em> interval with 95% mass — every point inside is more probable than any point outside. For a symmetric posterior they agree; for a skewed one the HPD is tighter and never includes a low-density region.</p>\n<h3>4. The posterior predictive distribution</h3>\n<p>To predict new data $x_{\\text{new}}$ — not the parameter — average the likelihood over the posterior:</p>\n<p>$$p(x_{\\text{new}}\\mid D)=\\int p(x_{\\text{new}}\\mid\\theta)\\,p(\\theta\\mid D)\\,d\\theta.$$</p>\n<p>This is not \"plug in the best $\\theta$\": it integrates over <em>all</em> plausible $\\theta$, so it honestly carries parameter uncertainty into the prediction (wider, better-calibrated than a plug-in).</p>\n<h3>5. A worked prediction (Beta–Binomial)</h3>\n<p>With a uniform prior $\\mathrm{Beta}(1,1)$ and $7$ heads in $10$ flips, the posterior is $\\mathrm{Beta}(8,4)$. The probability the <em>next</em> flip is heads is the posterior mean:</p>\n<p>$$P(\\text{next}=H\\mid D)=\\frac{\\alpha+k}{\\alpha+\\beta+n}=\\frac{8}{12}\\approx 0.667.$$</p>\n<p>This is Laplace's <b>rule of succession</b> $\\frac{k+1}{n+2}$ — note it never predicts a flat $0$ or $1$, because the posterior keeps some belief on every $\\theta$.</p>\n<h3>6. Bayesian decision theory</h3>\n<p>To <em>act</em>, pick the action $a$ that minimizes <b>expected posterior loss</b>:</p>\n<p>$$a^\\star=\\arg\\min_a\\;\\mathbb E_{\\theta\\mid D}\\big[L(a,\\theta)\\big]=\\arg\\min_a\\int L(a,\\theta)\\,p(\\theta\\mid D)\\,d\\theta.$$</p>\n<p>This single rule unifies the estimators above (each is the optimal action under its loss) and extends to real decisions — treat or not, buy or sell — by weighting every outcome by how probable the posterior says it is.</p>\n<h3>Code it: an expected-loss decision</h3>\n<p>Decisions weigh probability against cost. Pick the action with the lower expected posterior loss:</p>\n<div data-code=\"javascript\" data-expected=\"E[loss | ship]     = 3.0\nE[loss | withhold] = 2.1\ndecision: withhold\">// Bayesian decision theory: choose the action with the LOWEST expected loss\nconst pHelps = 0.7;           // posterior probability the feature helps\nconst lossShipHarm = 10;      // loss if we ship and it is harmful\nconst lossWithholdGood = 3;   // loss if we withhold a helpful feature\nconst eShip     = (1 - pHelps) * lossShipHarm;\nconst eWithhold = pHelps * lossWithholdGood;\nconst decision  = eShip > eWithhold ? \"withhold\" : \"ship\";\nconsole.log(`E[loss | ship]     = ${eShip.toFixed(1)}`);\nconsole.log(`E[loss | withhold] = ${eWithhold.toFixed(1)}`);\nconsole.log(\"decision: \" + decision);</div>\n<h3>7. Credible vs confidence: a last contrast</h3>\n<p>A Bayesian 95% credible interval says \"given the data, 95% probability $\\theta$ is in here.\" A frequentist 95% confidence interval says \"95% of such intervals, over many repetitions, would cover the fixed true $\\theta$\" — a statement about the procedure, not this interval. The simulation below shows confidence-interval coverage; the Bayesian version trades the need for a prior for the directly interpretable probability statement.</p>\n<div data-viz=\"ps-ci-coverage\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why each estimator minimizes its loss</summary>\n<p>The choice of estimator is forced by the loss. Squared-error risk $\\mathbb E[(\\theta-a)^2\\mid D]$ is minimized where its derivative vanishes, at $a=\\mathbb E[\\theta\\mid D]$ — the posterior <b>mean</b>. Absolute-error loss $|\\theta-a|$ is minimized by the <b>median</b> (it balances posterior mass on either side), and 0–1 loss by the <b>mode</b> (MAP). So \"which estimate should I report?\" is really the question \"which loss do I care about?\".</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: HPD vs equal-tailed intervals</summary>\n<p>The equal-tailed interval simply cuts $2.5\\%$ from each side: easy, and invariant under monotone reparametrization, but it can include low-density values. The <b>HPD</b> interval instead keeps only the densest region — every point inside beats every point outside — so it is the shortest at a given level. The catch: for a multimodal posterior the HPD can be a <em>union</em> of disjoint intervals, more honest but harder to report. For unimodal, roughly symmetric posteriors the two nearly agree.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the value of gathering more data</summary>\n<p>Decision theory also answers <em>should I collect more data first?</em> The <b>expected value of information</b> compares your best expected loss now against the expected loss after a hypothetical new observation, averaged over what that observation might be. If the expected reduction in loss exceeds the cost of the experiment, gather the data; otherwise act now. \"Is the test worth running?\" becomes the same minimize-expected-loss calculation.</p>\n</details>\n\n<h3>8. Why this matters</h3>\n<p>Posterior predictive checks validate models; expected-loss decisions drive Bayesian optimization, A/B testing, and bandits; credible intervals report honest uncertainty. The recurring theme: keep the whole posterior as long as you can, and collapse it to a number only at the last moment, using the loss that matches your real goal.</p>",
          "mcq": [
            {
              "q": "The posterior mean is the point estimate that minimizes expected:",
              "choices": [
                "Squared error",
                "Absolute error",
                "0–1 loss",
                "Prior variance"
              ],
              "answer": 0,
              "explain": "Mean ↔ squared error; median ↔ absolute error; mode/MAP ↔ 0–1 loss."
            },
            {
              "q": "The highest-posterior-density (HPD) credible interval is:",
              "choices": [
                "Always symmetric about the mean",
                "The shortest interval containing the target probability mass",
                "The interval cutting equal tails",
                "The same as a confidence interval"
              ],
              "answer": 1,
              "explain": "Every point inside an HPD interval is denser than any point outside, making it the shortest such interval."
            },
            {
              "q": "The posterior predictive distribution $p(x_{\\text{new}}\\mid D)$ is obtained by:",
              "choices": [
                "Taking the prior mean",
                "Plugging the MAP estimate into the likelihood",
                "Averaging the likelihood over the posterior of $\\theta$",
                "Maximizing the likelihood"
              ],
              "answer": 2,
              "explain": "$\\int p(x_{\\text{new}}\\mid\\theta)p(\\theta\\mid D)\\,d\\theta$ integrates over parameter uncertainty rather than fixing one $\\theta$."
            },
            {
              "q": "With a uniform prior and $k$ successes in $n$ trials, the probability the next trial succeeds is:",
              "choices": [
                "Exactly 1 if $k\\gt 0$",
                "$\\frac{k}{n}$",
                "$\\frac{k}{n+1}$",
                "$\\frac{k+1}{n+2}$ (Laplace's rule of succession)"
              ],
              "answer": 3,
              "explain": "Posterior $\\mathrm{Beta}(1+k,1+n-k)$ has mean $\\frac{k+1}{n+2}$, the predictive success probability."
            },
            {
              "q": "A Bayesian decision chooses the action that minimizes:",
              "choices": [
                "Expected posterior loss $\\mathbb E_{\\theta\\mid D}[L(a,\\theta)]$",
                "The prior variance",
                "The likelihood",
                "The number of parameters"
              ],
              "answer": 0,
              "explain": "Bayesian decision theory weights each outcome's loss by its posterior probability and picks the smallest expected loss."
            },
            {
              "q": "Compared with plugging in a point estimate, the posterior predictive is:",
              "choices": [
                "Always narrower",
                "Wider, because it includes uncertainty about $\\theta$",
                "Identical",
                "Undefined"
              ],
              "answer": 1,
              "explain": "Integrating over the posterior adds parameter uncertainty to the sampling noise, widening and better-calibrating the prediction."
            },
            {
              "q": "For a strongly right-skewed posterior, the mean, median, and mode:",
              "choices": [
                "Are all undefined",
                "Are always equal",
                "Differ, so the choice of estimator matters",
                "Equal the prior mean"
              ],
              "answer": 2,
              "explain": "Only for symmetric posteriors do the three coincide; under skew they separate and the loss function decides which to use."
            },
            {
              "q": "A 95% credible interval (unlike a confidence interval) lets you say:",
              "choices": [
                "The prior was uniform",
                "95% of repeated intervals cover $\\theta$",
                "The estimate is unbiased",
                "There is a 95% posterior probability $\\theta$ lies in it"
              ],
              "answer": 3,
              "explain": "Credible intervals make a direct probability statement about $\\theta$ given the data; confidence intervals describe the long-run procedure."
            },
            {
              "q": "The posterior median is the estimate that minimizes expected:",
              "choices": [
                "Absolute error $|\\hat\\theta-\\theta|$",
                "Squared error",
                "0–1 loss",
                "Prior variance"
              ],
              "answer": 0,
              "explain": "Median ↔ absolute-error loss; it is robust to skew. (Mean ↔ squared, mode ↔ 0–1.)"
            },
            {
              "q": "The posterior mode (MAP) is the estimate that minimizes expected:",
              "choices": [
                "Absolute error",
                "0–1 loss (right vs wrong)",
                "Squared error",
                "KL divergence"
              ],
              "answer": 1,
              "explain": "The mode minimizes 0–1 loss — the most probable single value."
            },
            {
              "q": "For a symmetric posterior, the mean, median, and mode:",
              "choices": [
                "Are undefined",
                "Are all different",
                "All coincide",
                "Equal the prior"
              ],
              "answer": 2,
              "explain": "Symmetry collapses the three estimators to the same point; they separate only under skew."
            },
            {
              "q": "With a uniform prior, after 3 heads in 3 flips, the predicted probability the next flip is heads is:",
              "choices": [
                "$0.5$",
                "$1$",
                "$\\frac{3}{4}$",
                "$\\frac{4}{5}=0.8$"
              ],
              "answer": 3,
              "explain": "Laplace's rule $\\frac{k+1}{n+2}=\\frac{4}{5}=0.8$ — strong but not certain."
            },
            {
              "q": "An equal-tailed 95% credible interval is formed by:",
              "choices": [
                "Cutting 2.5% of posterior probability from each tail",
                "Taking the shortest possible interval",
                "Centering on the MLE",
                "Using the prior quantiles"
              ],
              "answer": 0,
              "explain": "Equal-tailed leaves 2.5% in each tail; the HPD instead minimizes length."
            },
            {
              "q": "Laplace's rule of succession never predicts a probability of:",
              "choices": [
                "$0.5$",
                "Exactly 0 or exactly 1",
                "More than $0.9$",
                "Less than $0.1$"
              ],
              "answer": 1,
              "explain": "$\\frac{k+1}{n+2}$ stays strictly between 0 and 1 — the posterior keeps some belief on every value."
            },
            {
              "q": "A feature helps with posterior probability $0.7$; shipping a harmful one costs 10, withholding a helpful one costs 3. The expected-loss decision is to:",
              "choices": [
                "Flip a coin",
                "Ship (it probably helps)",
                "Withhold (expected loss $2.1\\lt 3.0$)",
                "Ship only if probability exceeds 0.5"
              ],
              "answer": 2,
              "explain": "E[ship]$=0.3\\times 10=3.0$; E[withhold]$=0.7\\times 3=2.1$. Lower expected loss wins despite \"probably helps\"."
            },
            {
              "q": "When outcome costs are asymmetric, the optimal Bayesian action:",
              "choices": [
                "Equals the MLE",
                "Is always the most-probable outcome",
                "Ignores the posterior",
                "Can differ from the single most-probable outcome"
              ],
              "answer": 3,
              "explain": "Decision theory weighs probability × cost, so a likely-but-cheap outcome can lose to an unlikely-but-expensive one."
            }
          ],
          "flashcards": [
            {
              "front": "Which estimator minimizes expected squared error?",
              "back": "The posterior mean. (Median minimizes absolute error; mode/MAP minimizes 0–1 loss.)"
            },
            {
              "front": "Equal-tailed vs HPD credible interval",
              "back": "Equal-tailed cuts equal probability from each side; HPD is the shortest interval with the target mass (every inside point denser than any outside). They agree for symmetric posteriors."
            },
            {
              "front": "Posterior predictive distribution",
              "back": "$p(x_{\\text{new}}\\mid D)=\\int p(x_{\\text{new}}\\mid\\theta)p(\\theta\\mid D)\\,d\\theta$ — predict new data by averaging the likelihood over the posterior, carrying parameter uncertainty."
            },
            {
              "front": "Laplace's rule of succession",
              "back": "With a uniform prior, $P(\\text{next success})=\\frac{k+1}{n+2}$ — never exactly 0 or 1."
            },
            {
              "front": "Bayesian decision rule",
              "back": "Choose the action minimizing expected posterior loss $\\mathbb E_{\\theta\\mid D}[L(a,\\theta)]$."
            },
            {
              "front": "Why is the predictive better than plug-in?",
              "back": "It integrates over all plausible $\\theta$ instead of a single best estimate, so it includes parameter uncertainty and is better calibrated (wider)."
            }
          ],
          "homework": [
            {
              "prompt": "A posterior over a coin's bias is $\\mathrm{Beta}(8,4)$. What is the probability the next two flips are both heads? (Assume conditional independence given $\\theta$, and use the predictive.)",
              "hint": "For Beta, $P(\\text{HH})=\\frac{(\\alpha)(\\alpha+1)}{(\\alpha+\\beta)(\\alpha+\\beta+1)}$, or update after the first head then predict the second.",
              "solution": "First head: predictive $\\frac{8}{12}$. Update to $\\mathrm{Beta}(9,4)$; second head predictive $\\frac{9}{13}$. So $P(\\text{HH})=\\frac{8}{12}\\cdot\\frac{9}{13}=\\frac{72}{156}\\approx 0.462$. (Plugging the point estimate $0.667^2\\approx 0.444$ understates it, because it ignores that two heads make high-$\\theta$ values more likely.)"
            },
            {
              "prompt": "Your posterior for a quantity is right-skewed. Which point estimate would you report if large over-estimates and under-estimates cost you equally in absolute dollars?",
              "hint": "Match the loss to the cost.",
              "solution": "Absolute-error loss is minimized by the posterior median, so report the median. The mean would be pulled up by the skew; the mode could sit far from the bulk of the mass."
            },
            {
              "prompt": "Explain in one or two sentences why a posterior predictive interval is wider than a \"plug in the MLE\" prediction interval.",
              "hint": "What uncertainty does each include?",
              "solution": "The plug-in interval uses a single estimated $\\theta$ and so reflects only sampling noise; the posterior predictive averages over the whole posterior, adding the uncertainty <em>about</em> $\\theta$ itself, which widens (and better calibrates) the interval."
            }
          ],
          "examples": [
            {
              "title": "Three estimates of one posterior",
              "body": "A posterior is $\\mathrm{Beta}(8,4)$ (mean $0.667$, mode $0.7$, median $\\approx 0.68$). Which to report?",
              "solution": "If squared error matters, report the mean $0.667$; for absolute error, the median $\\approx 0.68$; for \"most probable single value\", the mode/MAP $0.7$. They are close here because Beta(8,4) is only mildly skewed; for a strongly skewed posterior the choice matters."
            },
            {
              "title": "Predicting the next observation",
              "body": "Uniform prior, 3 heads in 3 flips. What is $P(\\text{next}=H)$?",
              "solution": "Posterior $\\mathrm{Beta}(1+3,1+0)=\\mathrm{Beta}(4,1)$; predictive $\\frac{4}{5}=0.8$ (Laplace: $\\frac{3+1}{3+2}=0.8$). Not $1.0$ — three heads is strong but not conclusive evidence, so the prediction stays short of certainty."
            },
            {
              "title": "A decision under expected loss",
              "body": "Should you ship a feature if the posterior probability it helps is $0.7$, shipping a harmful feature costs 10 and withholding a helpful one costs 3?",
              "solution": "Expected loss of shipping $=0.3\\times 10=3.0$; of withholding $=0.7\\times 3=2.1$. Withholding has lower expected loss, so — despite \"probably helps\" — the asymmetric costs say don't ship. Decision theory, not just the point estimate, drives the call."
            }
          ]
        },
        {
          "id": "ps-computational-bayes",
          "title": "Computational Bayes: MCMC & Variational Inference",
          "minutes": 16,
          "content": "<h3>1. When closed form fails</h3>\n<p>Conjugate priors gave us posteriors by formula, but most real models — hierarchical priors, logistic likelihoods, neural networks — have <b>no closed-form posterior</b>, because the evidence $p(D)=\\int p(D\\mid\\theta)p(\\theta)\\,d\\theta$ is an intractable high-dimensional integral. The two dominant escapes both avoid computing that integral directly: <b>MCMC</b> (sample from the posterior) and <b>variational inference</b> (optimize an approximation to it).</p>\n<h3>2. The core trick: sample, don't integrate</h3>\n<p>Almost everything we want is a posterior expectation — a mean, a probability, a predictive. Monte Carlo replaces the integral with an average over samples $\\theta_s\\sim p(\\theta\\mid D)$:</p>\n<p>$$\\mathbb E[f(\\theta)\\mid D]=\\int f(\\theta)\\,p(\\theta\\mid D)\\,d\\theta\\;\\approx\\;\\frac1S\\sum_{s=1}^{S} f(\\theta_s).$$</p>\n<p>By the Law of Large Numbers this average converges to the true value as $S$ grows — so if we can <em>sample</em> the posterior, we can answer almost any question about it without ever integrating.</p>\n<div data-viz=\"ps-lln\"></div>\n<h3>Code it: Monte Carlo from samples</h3>\n<p>Given posterior samples, every summary is just an average — no integral. Estimate the mean and a tail probability:</p>\n<div data-code=\"javascript\" data-expected=\"posterior mean ≈ 0.560\nP(theta > 0.6) ≈ 0.40\">// Monte Carlo: summarize a posterior straight from its samples\nconst samples = [0.42, 0.55, 0.61, 0.48, 0.70, 0.66, 0.52, 0.58, 0.63, 0.45];\nconst mean = samples.reduce((s, x) => s + x, 0) / samples.length;\nconst pAbove = samples.filter(x => x > 0.6).length / samples.length;  // a probability = a fraction of samples\nconsole.log(`posterior mean ≈ ${mean.toFixed(3)}`);\nconsole.log(`P(theta > 0.6) ≈ ${pAbove.toFixed(2)}`);</div>\n<h3>3. MCMC: a chain that lands on the posterior</h3>\n<p>We usually cannot sample the posterior directly. <b>Markov chain Monte Carlo</b> instead builds a random walk over $\\theta$ whose <em>stationary distribution</em> is exactly the posterior. Run it long enough and the states it visits are (correlated) samples from $p(\\theta\\mid D)$ — feed them into the Monte Carlo average above.</p>\n<h3>4. Metropolis–Hastings: accept or reject</h3>\n<p>The simplest recipe: from the current $\\theta$, propose a nearby $\\theta'$, and accept it with probability (for a symmetric proposal)</p>\n<p>$$\\alpha=\\min\\!\\left(1,\\;\\frac{p(\\theta'\\mid D)}{p(\\theta\\mid D)}\\right)=\\min\\!\\left(1,\\;\\frac{p(D\\mid\\theta')p(\\theta')}{p(D\\mid\\theta)p(\\theta)}\\right).$$</p>\n<p>The magic: the intractable evidence $p(D)$ appears in both numerator and denominator and <b>cancels</b>. So MCMC only ever needs the posterior <em>up to a constant</em> — likelihood × prior — which we can always evaluate. Steps that climb toward higher posterior density are always accepted; downhill steps are accepted sometimes, which lets the chain explore.</p>\n<h3>5. Did it work? Diagnostics</h3>\n<p>Early states depend on where you started, so discard a <b>burn-in</b> period. The chain must <b>mix</b> — move freely rather than crawl — or its samples are too correlated to be useful (low <em>effective sample size</em>). Running several chains from different starts and checking that they agree ($\\hat R\\approx 1$) is the standard convergence test. MCMC is asymptotically exact but can be slow, especially in high dimensions.</p>\n<h3>6. Variational inference: integration becomes optimization</h3>\n<p>Instead of sampling, <b>variational inference</b> picks a simple family $q_\\phi(\\theta)$ (say a Gaussian) and tunes $\\phi$ to make $q$ as close as possible to the posterior. It maximizes the <b>evidence lower bound (ELBO)</b>:</p>\n<p>$$\\mathcal L(\\phi)=\\mathbb E_{q_\\phi}\\!\\big[\\log p(D,\\theta)\\big]-\\mathbb E_{q_\\phi}\\!\\big[\\log q_\\phi(\\theta)\\big]=\\log p(D)-\\mathrm{KL}\\!\\big(q_\\phi\\,\\|\\,p(\\theta\\mid D)\\big).$$</p>\n<p>Since $\\log p(D)$ is fixed, <b>maximizing the ELBO minimizes $\\mathrm{KL}(q\\,\\|\\,\\text{posterior})$</b> — turning inference into optimization (gradient ascent). It is fast and scales to huge models, but only as accurate as the chosen family $q$, and it typically <em>underestimates</em> uncertainty.</p>\n<h3>7. MCMC vs VI</h3>\n<p>MCMC is asymptotically exact but slower and harder to scale; VI is fast and scalable but approximate and biased. Rule of thumb: MCMC when you need faithful uncertainty on a moderate model; VI when you need speed at scale (it powers variational autoencoders and large Bayesian deep-learning models).</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: smarter samplers — Gibbs and Hamiltonian Monte Carlo</summary>\n<p>Metropolis–Hastings is the simplest MCMC, but modern samplers explore far better. <b>Gibbs sampling</b> updates one coordinate at a time by drawing it from its full conditional distribution (exact, no rejection) — ideal when those conditionals are easy to sample. <b>Hamiltonian Monte Carlo (HMC)</b>, the engine behind Stan, uses the gradient of the log-posterior to propose distant, high-acceptance moves, mixing dramatically faster than random-walk proposals in high dimensions.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the two directions of KL</summary>\n<p>Variational inference minimizes the \"reverse\" KL $\\mathrm{KL}(q\\,\\|\\,p)$, which is <b>mode-seeking</b>: $q$ prefers to hug one mode tightly rather than spread across the whole posterior, so VI typically <em>under-estimates</em> uncertainty. The \"forward\" direction $\\mathrm{KL}(p\\,\\|\\,q)$ is mean-seeking and would over-disperse, but it requires expectations under the unknown posterior, so it is rarely usable directly. That choice of direction is exactly why VI is fast yet over-confident.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the reparameterization trick</summary>\n<p>Optimizing the ELBO by gradient ascent needs gradients through a random sample — but you cannot backpropagate through sampling. The <b>reparameterization trick</b> rewrites $z\\sim\\mathcal N(\\mu,\\sigma^2)$ as $z=\\mu+\\sigma\\,\\epsilon$ with $\\epsilon\\sim\\mathcal N(0,1)$, moving the randomness off the parameters so the gradient $\\nabla_{\\mu,\\sigma}$ flows through $z$. This low-variance estimator is what lets <b>variational autoencoders</b> and amortized VI train with ordinary backprop.</p>\n</details>\n\n<h3>8. Why this matters</h3>\n<p>These two ideas make Bayesian inference practical beyond toy conjugate models: probabilistic programming languages (Stan, PyMC) automate MCMC, and VI underpins VAEs and scalable Bayesian deep learning. The throughline of the whole module: you rarely need $p(D)$ — likelihood × prior, plus a way to sample or optimize, is enough.</p>",
          "mcq": [
            {
              "q": "MCMC and variational inference are needed because:",
              "choices": [
                "The posterior has no closed form (the evidence integral is intractable)",
                "The prior is always unknown",
                "Likelihoods cannot be evaluated",
                "Data is always missing"
              ],
              "answer": 0,
              "explain": "Most models lack a conjugate/closed-form posterior, so we sample from or optimize an approximation instead of integrating."
            },
            {
              "q": "A Monte Carlo estimate of a posterior expectation is:",
              "choices": [
                "The maximum likelihood value",
                "The average of $f(\\theta)$ over posterior samples",
                "The prior mean",
                "The mode of the prior"
              ],
              "answer": 1,
              "explain": "$\\mathbb E[f(\\theta)\\mid D]\\approx\\frac1S\\sum_s f(\\theta_s)$, converging by the Law of Large Numbers."
            },
            {
              "q": "The samples produced by MCMC are:",
              "choices": [
                "Drawn from the prior",
                "Independent and exactly posterior-distributed from step 1",
                "Correlated, with the posterior as their stationary distribution",
                "Always rejected"
              ],
              "answer": 2,
              "explain": "The Markov chain converges to the posterior as its stationary distribution; consecutive states are correlated."
            },
            {
              "q": "Metropolis–Hastings avoids computing the evidence $p(D)$ because:",
              "choices": [
                "The prior replaces it",
                "It is assumed to be 1",
                "It is estimated separately",
                "It cancels in the acceptance ratio"
              ],
              "answer": 3,
              "explain": "The ratio $p(\\theta'\\mid D)/p(\\theta\\mid D)$ has $p(D)$ in both terms, so it cancels — only likelihood × prior is needed."
            },
            {
              "q": "\"Burn-in\" in MCMC refers to:",
              "choices": [
                "Discarding early samples before the chain reaches its stationary distribution",
                "Increasing the learning rate",
                "Running on a GPU",
                "Doubling the data"
              ],
              "answer": 0,
              "explain": "Early states reflect the starting point, not the posterior, so they are discarded."
            },
            {
              "q": "Variational inference turns Bayesian inference into:",
              "choices": [
                "A sorting problem",
                "An optimization problem (maximize the ELBO)",
                "A sampling-only problem",
                "A matrix inversion"
              ],
              "answer": 1,
              "explain": "VI fits a simple $q_\\phi$ to the posterior by maximizing the evidence lower bound via gradient ascent."
            },
            {
              "q": "Maximizing the ELBO is equivalent to:",
              "choices": [
                "Minimizing the likelihood",
                "Maximizing the prior",
                "Minimizing $\\mathrm{KL}(q\\,\\|\\,\\text{posterior})$",
                "Maximizing the number of samples"
              ],
              "answer": 2,
              "explain": "$\\mathcal L=\\log p(D)-\\mathrm{KL}(q\\,\\|\\,p(\\theta\\mid D))$ and $\\log p(D)$ is constant, so raising the ELBO lowers the KL."
            },
            {
              "q": "Compared with MCMC, variational inference is generally:",
              "choices": [
                "Unable to use gradients",
                "Slower but exact",
                "Always exact",
                "Faster and more scalable, but approximate (biased)"
              ],
              "answer": 3,
              "explain": "VI trades MCMC's asymptotic exactness for speed and scale, at the cost of bias from the chosen family $q$."
            },
            {
              "q": "In Metropolis–Hastings, a proposal with LOWER posterior density than the current state is:",
              "choices": [
                "Accepted sometimes (with probability equal to the ratio)",
                "Always rejected",
                "Always accepted",
                "Used to end the chain"
              ],
              "answer": 0,
              "explain": "Downhill moves are accepted with probability $\\frac{p(\\theta'\\mid D)}{p(\\theta\\mid D)}\\lt 1$, which lets the chain explore rather than get stuck at a peak."
            },
            {
              "q": "Running several chains and finding $\\hat R\\approx 1$ indicates:",
              "choices": [
                "The model is overfit",
                "The chains have converged to the same distribution",
                "The prior was wrong",
                "The data is insufficient"
              ],
              "answer": 1,
              "explain": "$\\hat R$ (Gelman–Rubin) compares within- to between-chain variance; $\\approx 1$ signals convergence."
            },
            {
              "q": "A poorly mixing MCMC chain produces samples that are:",
              "choices": [
                "Drawn from the prior",
                "Independent and ideal",
                "Highly correlated, so the effective sample size is small",
                "Exactly the posterior mode"
              ],
              "answer": 2,
              "explain": "Slow exploration means consecutive draws are correlated; the effective sample size (independent-equivalent count) is far below the raw count."
            },
            {
              "q": "The error of a Monte Carlo estimate from $S$ samples shrinks roughly like:",
              "choices": [
                "It does not shrink",
                "$1/S^2$",
                "$\\log S$",
                "$1/\\sqrt{S}$"
              ],
              "answer": 3,
              "explain": "Monte Carlo standard error scales as $1/\\sqrt{S}$ — quadrupling the samples halves the error."
            },
            {
              "q": "Variational inference approximates the posterior with:",
              "choices": [
                "A simpler distribution family $q$, fit by optimization",
                "The prior, unchanged",
                "A single point estimate only",
                "Exact samples"
              ],
              "answer": 0,
              "explain": "VI chooses a tractable family $q_\\phi$ and tunes $\\phi$ to make $q$ close to the posterior."
            },
            {
              "q": "Probabilistic programming tools like Stan and PyMC mainly:",
              "choices": [
                "Replace the need for a likelihood",
                "Automate posterior computation (e.g. running MCMC) for you",
                "Guarantee a conjugate prior",
                "Only do linear regression"
              ],
              "answer": 1,
              "explain": "They let you declare a model and handle the sampling/inference machinery automatically."
            },
            {
              "q": "To estimate $P(\\theta\\gt c\\mid D)$ by Monte Carlo, you:",
              "choices": [
                "Maximize the likelihood",
                "Evaluate the prior at $c$",
                "Take the fraction of posterior samples that exceed $c$",
                "Integrate the evidence"
              ],
              "answer": 2,
              "explain": "A probability is the expectation of an indicator, estimated by the sample fraction satisfying the event."
            },
            {
              "q": "A well-known limitation of variational inference is that it tends to:",
              "choices": [
                "Be slower than MCMC",
                "Overestimate the mean",
                "Require conjugate priors",
                "Underestimate posterior variance (uncertainty)"
              ],
              "answer": 3,
              "explain": "The usual KL direction makes $q$ mode-seeking, so VI is typically over-confident — narrower than the true posterior."
            }
          ],
          "flashcards": [
            {
              "front": "Why do we need MCMC or variational inference?",
              "back": "Most posteriors have no closed form — the evidence $p(D)=\\int p(D\\mid\\theta)p(\\theta)d\\theta$ is intractable — so we sample from or optimize an approximation to the posterior instead."
            },
            {
              "front": "Monte Carlo estimate of a posterior expectation",
              "back": "$\\mathbb E[f(\\theta)\\mid D]\\approx\\frac1S\\sum_s f(\\theta_s)$ with $\\theta_s$ drawn from the posterior; converges by the Law of Large Numbers."
            },
            {
              "front": "What is MCMC?",
              "back": "A Markov chain whose stationary distribution is the posterior; after burn-in its (correlated) states are posterior samples."
            },
            {
              "front": "Why does Metropolis–Hastings not need $p(D)$?",
              "back": "The acceptance ratio $\\frac{p(\\theta'\\mid D)}{p(\\theta\\mid D)}$ cancels the normalizer $p(D)$ — you only need the posterior up to a constant (likelihood × prior)."
            },
            {
              "front": "The ELBO",
              "back": "$\\mathcal L=\\log p(D)-\\mathrm{KL}(q\\,\\|\\,p(\\theta\\mid D))$; maximizing it minimizes the KL from $q$ to the posterior, turning inference into optimization."
            },
            {
              "front": "MCMC vs variational inference",
              "back": "MCMC is asymptotically exact but slower; VI is fast and scalable but approximate and tends to underestimate uncertainty."
            }
          ],
          "homework": [
            {
              "prompt": "In Metropolis–Hastings the acceptance ratio uses $\\frac{p(\\theta'\\mid D)}{p(\\theta\\mid D)}$. Show why you never need to compute the evidence $p(D)$.",
              "hint": "Write each posterior as likelihood × prior over $p(D)$.",
              "solution": "$\\frac{p(\\theta'\\mid D)}{p(\\theta\\mid D)}=\\frac{p(D\\mid\\theta')p(\\theta')/p(D)}{p(D\\mid\\theta)p(\\theta)/p(D)}=\\frac{p(D\\mid\\theta')p(\\theta')}{p(D\\mid\\theta)p(\\theta)}$. The $p(D)$ factors cancel, so only the (computable) likelihood × prior is needed."
            },
            {
              "prompt": "You draw 1000 posterior samples of a parameter $\\theta$ and 730 of them exceed 0.5. Estimate $P(\\theta\\gt 0.5\\mid D)$ and name the principle used.",
              "hint": "A probability is the expectation of an indicator.",
              "solution": "$P(\\theta\\gt 0.5\\mid D)=\\mathbb E[\\mathbf 1\\{\\theta\\gt 0.5\\}\\mid D]\\approx \\frac{730}{1000}=0.73$. This is Monte Carlo estimation: the posterior probability is approximated by the fraction of samples satisfying the event, valid by the Law of Large Numbers."
            },
            {
              "prompt": "Your model must serve millions of users and only needs approximate posteriors. Would you reach for MCMC or variational inference, and what is the trade-off?",
              "hint": "Speed/scale vs exactness.",
              "solution": "Variational inference: it recasts inference as gradient-based optimization, so it is fast and scales to massive models (it underpins VAEs). The trade-off is bias — VI is only as good as the chosen family $q$ and usually underestimates uncertainty, whereas MCMC would be more faithful but far slower at that scale."
            }
          ],
          "examples": [
            {
              "title": "Monte Carlo from posterior samples",
              "body": "From 2000 posterior draws of a rate $\\lambda$, the sample mean is 3.1 and 5% of draws exceed 5. What do you report?",
              "solution": "Posterior mean $\\approx 3.1$ (Monte Carlo average) and $P(\\lambda\\gt 5\\mid D)\\approx 0.05$. Both come straight from the samples — no integral. More draws tighten these estimates (LLN)."
            },
            {
              "title": "An accepted vs rejected MH step",
              "body": "Current $\\theta$ has likelihood×prior $=0.02$; proposal $\\theta'$ has $0.05$ (symmetric proposal). Accept?",
              "solution": "Ratio $=0.05/0.02=2.5\\ge 1$, so $\\alpha=\\min(1,2.5)=1$: always accept — the proposal is more probable. Had it been $0.01$, $\\alpha=0.5$, accepted only half the time, letting the chain still occasionally explore downhill."
            },
            {
              "title": "Reading the ELBO",
              "body": "Why does maximizing the ELBO improve the approximation $q$?",
              "solution": "Because $\\mathcal L=\\log p(D)-\\mathrm{KL}(q\\,\\|\\,p(\\theta\\mid D))$ and $\\log p(D)$ is constant in $\\phi$. Pushing $\\mathcal L$ up can only push $\\mathrm{KL}(q\\,\\|\\,\\text{posterior})$ down, so $q$ moves closer to the true posterior."
            }
          ]
        }
      ]
    },
    {
      "title": "Causal Inference",
      "lessons": [
        {
          "id": "ps-causation-confounding",
          "title": "Correlation, Causation & Confounding",
          "minutes": 16,
          "content": "<h3>1. The slogan that bites: correlation ≠ causation</h3>\n<p>That $X$ and $Y$ move together does <em>not</em> mean $X$ causes $Y$. A correlation can arise four ways: $X$ causes $Y$, $Y$ causes $X$ (reverse causation), a third variable causes both (confounding), or pure chance in a small sample. Mistaking association for causation is the single most common analytical error — and the costliest in ML, medicine, and policy.</p>\n<h3>2. Confounders: the lurking common cause</h3>\n<p>A <b>confounder</b> $Z$ is a variable that influences both $X$ and $Y$, manufacturing a correlation between them that is not causal. Ice-cream sales correlate with drownings — but the confounder is summer heat, which drives both. Control for the season and the ice-cream–drowning link vanishes. The whole game of causal inference is separating real effects from confounded ones.</p>\n<div data-viz=\"causal-dag\"></div>\n<h3>3. Spurious correlation in the data</h3>\n<div data-viz=\"ps-covariance-scatter\"></div>\n<p>A strong sample correlation is necessary but never sufficient for causation. Two unrelated quantities can correlate by chance (especially with few points or many variables tested), and confounded quantities correlate strongly yet manipulating one does nothing to the other.</p>\n<h3>4. Simpson's paradox: a trend that reverses</h3>\n<p>The starkest confounding trap: an association can hold in <em>every</em> subgroup yet reverse in the aggregate. In the classic kidney-stone study, treatment A beats B for small stones <em>and</em> for large stones, but B beats A overall — because A was given to the harder (large-stone) cases. The confounder (stone size) is unevenly distributed across treatments. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"small: A 93%  B 87%\nlarge: A 73%  B 69%\nALL:   A 78%  B 83%\">// Simpson's paradox: recovery rates for two kidney-stone treatments\nconst A = { smallOk: 81,  smallN: 87,  largeOk: 192, largeN: 263 };\nconst B = { smallOk: 234, smallN: 270, largeOk: 55,  largeN: 80  };\nconst pct = (o, n) => Math.round(100 * o / n) + \"%\";\nconsole.log(\"small: A \" + pct(A.smallOk, A.smallN) + \"  B \" + pct(B.smallOk, B.smallN));\nconsole.log(\"large: A \" + pct(A.largeOk, A.largeN) + \"  B \" + pct(B.largeOk, B.largeN));\nconsole.log(\"ALL:   A \" + pct(A.smallOk + A.largeOk, A.smallN + A.largeN) + \"  B \" + pct(B.smallOk + B.largeOk, B.smallN + B.largeN));\n// A wins BOTH subgroups but loses overall -- never trust an aggregate without checking confounders.</div>\n<h3>5. The gold standard: randomized experiments</h3>\n<p>Randomly assigning the treatment ($A$/$B$ coin-flip per subject) <b>breaks confounding</b>: because assignment is independent of everything else, confounders are balanced across groups in expectation, so a difference in outcomes can only be the treatment's effect. This is why randomized controlled trials (and online A/B tests) are the gold standard — randomization severs the arrows from confounders into the treatment.</p>\n<h3>6. Adjusting in observational data</h3>\n<p>When you cannot randomize, you estimate the causal effect by <b>controlling for confounders</b>: compare like with like (same stone size, same age, …) and combine the within-group effects. This is the \"backdoor adjustment\" — block every confounding path between $X$ and $Y$. It only works for confounders you can <em>measure</em>; unmeasured ones leave residual bias, the Achilles heel of observational studies.</p>\n<h3>7. Reverse causation and selection bias</h3>\n<p>Two more traps. <b>Reverse causation</b>: \"people who exercise are healthier\" — but maybe being healthy lets people exercise. <b>Selection bias</b>: studying only hospital patients can create correlations absent in the general population (conditioning on being admitted). Both produce real correlations with no direct causal link from $X$ to $Y$.</p>\n<h3>8. Why this matters for machine learning</h3>\n<p>ML models learn <em>correlations</em>, so they happily latch onto <b>spurious features</b> — a watermark that predicts the label, a scanner ID that predicts disease. These work in-distribution and collapse under shift, because they are not causal. Causal thinking explains distribution-shift failures, motivates robust and fair models, and underlies treatment-effect estimation, off-policy evaluation, and modern causal ML.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the do-operator</summary>\n<p>Pearl's notation separates seeing from doing. $P(Y\\mid X{=}x)$ is <em>observing</em> $X=x$ (and may carry confounding); $P(Y\\mid \\text{do}(X{=}x))$ is <em>intervening</em> to set $X=x$, which deletes the arrows into $X$ (graph surgery). Causal effects are statements about $\\text{do}(\\cdot)$. Randomization physically performs the do; backdoor adjustment computes it from observational data when the confounders are measured.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: don't control for everything (colliders)</summary>\n<p>Adjusting is not always good. A <b>collider</b> is a common <em>effect</em> of $X$ and $Y$ (both arrows point into it); conditioning on a collider <em>creates</em> a spurious association where none existed (this is how selection bias arises). And controlling for a <b>mediator</b> on the causal path blocks the very effect you want. Adjust for confounders — not colliders or mediators — which is why you need the causal graph, not just the data.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: instrumental variables</summary>\n<p>When confounders are unmeasured and randomization is impossible, an <b>instrument</b> $Z$ can rescue you: it affects $X$, has no direct path to $Y$, and shares no confounder with $Y$. Then variation in $X$ driven by $Z$ is \"as good as random\", letting you recover the causal effect (e.g. using distance-to-college as an instrument for years of schooling when estimating its effect on wages).</p>\n</details>\n",
          "mcq": [
            {
              "q": "A strong correlation between $X$ and $Y$ implies:",
              "choices": [
                "Not necessarily that $X$ causes $Y$ — it may be confounding, reverse causation, or chance",
                "That $X$ definitely causes $Y$",
                "That $Y$ definitely causes $X$",
                "That there is no relationship"
              ],
              "answer": 0,
              "explain": "Correlation has four possible sources; only one is \"$X$ causes $Y$\"."
            },
            {
              "q": "A confounder is a variable that:",
              "choices": [
                "Is caused by both $X$ and $Y$",
                "Causes both $X$ and $Y$, creating a non-causal association",
                "Has no relation to $X$ or $Y$",
                "Is the outcome of interest"
              ],
              "answer": 1,
              "explain": "A common cause of $X$ and $Y$ manufactures a correlation that is not causal."
            },
            {
              "q": "Simpson's paradox occurs when:",
              "choices": [
                "A sample is too large",
                "Two variables are independent",
                "An association reverses between the subgroups and the aggregate",
                "The correlation is exactly zero"
              ],
              "answer": 2,
              "explain": "Uneven confounder distribution can flip the aggregate trend versus every subgroup."
            },
            {
              "q": "The gold standard for establishing causation is:",
              "choices": [
                "A more complex model",
                "A larger observational sample",
                "A higher correlation coefficient",
                "A randomized controlled experiment"
              ],
              "answer": 3,
              "explain": "Randomization balances confounders, so outcome differences are causal."
            },
            {
              "q": "Randomization establishes causation because it:",
              "choices": [
                "Makes the treatment independent of all confounders",
                "Increases the sample size",
                "Removes measurement error",
                "Guarantees a large effect"
              ],
              "answer": 0,
              "explain": "Independence of treatment and confounders makes the groups comparable."
            },
            {
              "q": "In observational data, you estimate a causal effect by:",
              "choices": [
                "Ignoring all other variables",
                "Controlling for the measured confounders (backdoor adjustment)",
                "Maximizing the correlation",
                "Choosing the largest subgroup"
              ],
              "answer": 1,
              "explain": "Adjusting for confounders blocks non-causal paths — but only those you can measure."
            },
            {
              "q": "\"People who exercise are healthier\" might reflect reverse causation, meaning:",
              "choices": [
                "Health and exercise are unrelated",
                "Exercise always causes health",
                "Being healthy enables exercising, rather than exercise causing health",
                "The sample was randomized"
              ],
              "answer": 2,
              "explain": "The causal arrow may run $Y\\to X$ instead of $X\\to Y$."
            },
            {
              "q": "A spurious (non-causal) feature an ML model relies on will typically:",
              "choices": [
                "Be a causal driver of the label",
                "Always generalize perfectly",
                "Improve robustness",
                "Work in-distribution but fail under distribution shift"
              ],
              "answer": 3,
              "explain": "Non-causal shortcuts break when the spurious correlation no longer holds."
            },
            {
              "q": "Ice-cream sales correlate with drownings. The most likely explanation is:",
              "choices": [
                "A confounder — hot weather drives both",
                "Ice cream causes drowning",
                "Drowning causes ice-cream sales",
                "Pure coincidence with no cause"
              ],
              "answer": 0,
              "explain": "Summer heat raises both; condition on temperature and the link vanishes."
            },
            {
              "q": "$P(Y\\mid\\text{do}(X{=}x))$ differs from $P(Y\\mid X{=}x)$ because:",
              "choices": [
                "They are always equal",
                "do() intervenes to set X (cutting confounding); conditioning merely observes",
                "do() observes and conditioning intervenes",
                "do() requires a larger sample"
              ],
              "answer": 1,
              "explain": "The do-operator deletes the arrows into X (graph surgery); observation can carry confounding."
            },
            {
              "q": "A collider is a variable that:",
              "choices": [
                "Lies on the causal path from X to Y",
                "Is a common cause of X and Y",
                "Is a common effect of X and Y — conditioning on it induces a spurious association",
                "Has no relation to X or Y"
              ],
              "answer": 2,
              "explain": "Both arrows point INTO a collider; conditioning on it opens a non-causal path (a source of selection bias)."
            },
            {
              "q": "Controlling for a mediator (a variable on the causal path from X to Y):",
              "choices": [
                "Has no effect on the estimate",
                "Always removes confounding",
                "Is required for causal inference",
                "Blocks part of the very effect you want to measure"
              ],
              "answer": 3,
              "explain": "A mediator transmits the effect; adjusting for it removes that portion of the causal effect — unlike adjusting for a confounder."
            },
            {
              "q": "An instrumental variable lets you estimate a causal effect when confounders are unmeasured, by being a variable that:",
              "choices": [
                "Affects X but has no direct path to Y (and no shared confounder with Y)",
                "Is caused by both X and Y",
                "Equals the outcome Y",
                "Is perfectly correlated with the confounder"
              ],
              "answer": 0,
              "explain": "Variation in X driven by the instrument is \"as good as random\", identifying the effect."
            },
            {
              "q": "Selection bias typically arises from:",
              "choices": [
                "Randomly sampling the population",
                "Conditioning on a collider — e.g. studying only hospital-admitted patients",
                "Increasing the sample size",
                "Adjusting for a confounder"
              ],
              "answer": 1,
              "explain": "A non-random sample (admission) conditions on a collider, creating associations absent in the full population."
            },
            {
              "q": "Simpson's paradox is fundamentally caused by:",
              "choices": [
                "A perfectly randomized experiment",
                "Too small a sample",
                "A confounder unevenly distributed across the groups being compared",
                "Zero correlation"
              ],
              "answer": 2,
              "explain": "When the lurking variable is unbalanced across groups, the pooled trend can reverse the subgroup trends."
            },
            {
              "q": "The key limitation of adjusting for confounders in observational data is that it:",
              "choices": [
                "Works only for binary treatments",
                "Requires randomization",
                "Always over-corrects",
                "Only handles confounders you can measure — unmeasured ones leave bias"
              ],
              "answer": 3,
              "explain": "Backdoor adjustment blocks measured confounding paths; unobserved confounders remain the Achilles heel of observational studies."
            }
          ],
          "flashcards": [
            {
              "front": "The four sources of a correlation",
              "back": "$X\\to Y$, $Y\\to X$ (reverse), a confounder causing both, or chance — only the first is \"$X$ causes $Y$\"."
            },
            {
              "front": "What is a confounder?",
              "back": "A variable that influences both $X$ and $Y$, creating a non-causal association between them (e.g. summer heat behind ice-cream sales and drownings)."
            },
            {
              "front": "Simpson's paradox",
              "back": "An association present in every subgroup can reverse in the aggregate when a confounder is unevenly distributed across groups."
            },
            {
              "front": "Why do randomized experiments establish causation?",
              "back": "Random assignment makes treatment independent of all confounders, balancing them across groups — so any outcome difference is the treatment's effect."
            },
            {
              "front": "Backdoor adjustment",
              "back": "Estimate a causal effect from observational data by controlling for (conditioning on) the measured confounders, blocking non-causal paths."
            },
            {
              "front": "do-operator: $P(Y\\mid \\text{do}(X))$ vs $P(Y\\mid X)$",
              "back": "$\\text{do}(X)$ is intervening to set $X$ (effect of acting); $P(Y\\mid X)$ is merely observing $X$ (may include confounding)."
            }
          ],
          "homework": [
            {
              "prompt": "Sales of sunglasses correlate with ice-cream sales. Give three non-causal explanations for the correlation.",
              "hint": "Think confounder, reverse, chance.",
              "solution": "(1) Confounding: hot, sunny weather drives both. (2) Reverse-ish/common-driver framing: the same \"going outside\" behavior causes both. (3) Chance: in a small sample the two could line up coincidentally. None means sunglasses cause ice-cream cravings."
            },
            {
              "prompt": "A drug shows a 70% recovery rate in men and 60% in women, but a competitor shows 80% in men and 65% in women. Which drug looks better per-subgroup, and what would let the competitor still win overall?",
              "hint": "Simpson's paradox via uneven group sizes.",
              "solution": "The competitor is better in BOTH subgroups (80%>70%, 65%>60%). It could still \"lose\" overall only if the first drug were given disproportionately to the easier group — i.e. an uneven confounder distribution. (Here the competitor wins both, so an honest aggregate must also favor it once you weight subgroups equally.) The lesson: always check subgroup vs aggregate."
            },
            {
              "prompt": "Explain in two sentences why a randomized controlled trial identifies a causal effect that an observational study cannot.",
              "hint": "What does randomization do to confounders?",
              "solution": "Randomizing the treatment makes it statistically independent of every confounder (measured or not), so the treatment and control groups are comparable and any outcome gap is caused by the treatment. An observational study cannot guarantee this — unmeasured confounders may differ between who did and did not receive the treatment."
            }
          ],
          "examples": [
            {
              "title": "Ice cream and drowning",
              "body": "Monthly ice-cream sales correlate strongly (r≈0.9) with drownings. Should we ban ice cream?",
              "solution": "No — the confounder is summer heat: it raises both ice-cream sales and swimming (hence drownings). Condition on temperature/season and the correlation disappears. Banning ice cream would do nothing to drownings."
            },
            {
              "title": "The kidney-stone reversal",
              "body": "Treatment A beats B on small stones (93% vs 87%) and large stones (73% vs 69%), yet B beats A overall (83% vs 78%). How?",
              "solution": "Stone size confounds the comparison: A was used far more on large (harder) stones, dragging its overall rate down. Within each size A is better; the aggregate is misleading. Compare within subgroups (or randomize) — never trust the pooled number alone."
            },
            {
              "title": "A spurious feature in ML",
              "body": "A pneumonia model is highly accurate — but partly keys on which hospital's scanner took the X-ray. Why is that dangerous?",
              "solution": "Scanner ID correlates with severity only because sicker patients were imaged at certain hospitals — it is a confounded, non-causal shortcut. Deploy the model at a new hospital and accuracy collapses. Robust models must rely on causal signal (the lung pathology), not the spurious correlate."
            }
          ]
        },
        {
          "id": "ps-causal-graphs",
          "title": "Causal Graphs & the Backdoor Criterion",
          "minutes": 17,
          "content": "<h3>1. The hook: draw your assumptions as a graph</h3>\n<p>A <b>causal DAG</b> (directed acyclic graph) makes your causal assumptions explicit: each node is a variable, each arrow $X\\to Y$ asserts \"$X$ is a direct cause of $Y$\". Once the graph is drawn, simple path rules tell you exactly which variables to adjust for to read a causal effect off observational data — turning a vague worry about confounding into a precise, checkable procedure.</p>\n<h3>2. Nodes, edges, and paths</h3>\n<p>A <b>path</b> is any sequence of connected edges between two nodes, ignoring arrow direction. A <b>causal path</b> follows the arrows from $X$ to $Y$ (it carries the effect we want). A <b>backdoor path</b> starts with an arrow <em>into</em> $X$ — it is non-causal but still transmits association (this is confounding). The goal: keep causal paths open, block every backdoor path.</p>\n<h3>3. The three building blocks</h3>\n<div data-viz=\"causal-dag\"></div>\n<p>Every path is built from three junctions. A <b>chain</b> $X\\to Z\\to Y$ ($Z$ a mediator) and a <b>fork</b> $X\\leftarrow Z\\to Y$ ($Z$ a confounder) both transmit association — and both are <em>blocked</em> by conditioning on $Z$. A <b>collider</b> $X\\to Z\\leftarrow Y$ is the opposite: it blocks association by default, and conditioning on $Z$ (or a descendant) <em>opens</em> it, creating spurious correlation.</p>\n<h3>4. d-separation: when does information flow?</h3>\n<p>$X$ and $Y$ are <b>d-separated</b> by a set $Z$ — implying $X \\perp Y \\mid Z$ — when every path between them is blocked. A path is blocked if it contains a chain or fork whose middle node is in $Z$, <em>or</em> a collider whose node (and all its descendants) is <em>not</em> in $Z$. d-separation is the graphical test for conditional independence.</p>\n<h3>5. The backdoor criterion</h3>\n<p>To identify the causal effect of $X$ on $Y$, find an adjustment set $Z$ that (1) <b>blocks every backdoor path</b> from $X$ to $Y$, and (2) contains <b>no descendant of $X$</b>. Such a $Z$ \"satisfies the backdoor criterion\" — controlling for it removes all confounding while leaving the causal path intact. The graph, not the data, tells you which $Z$ qualifies.</p>\n<h3>6. The adjustment formula</h3>\n<p>Given a valid backdoor set $Z$, the interventional distribution is the confounder-weighted average $$P(Y\\mid \\text{do}(X{=}x)) = \\sum_z P(Y\\mid X{=}x,\\, Z{=}z)\\,P(Z{=}z).$$ Compare that to the naive $P(Y\\mid X{=}x)$, which mixes in confounding. The code below contrasts them on a severity-confounded drug trial:</p>\n<div data-code=\"javascript\" data-expected=\"adjusted ATE = 0.10\">// Effect of treatment X on recovery Y, confounded by severity Z\nconst pz = { 0: 0.6, 1: 0.4 };                 // 60% mild (z=0), 40% severe (z=1)\nconst pY = { \"1,0\": 0.9, \"0,0\": 0.8,           // P(recover | treated/untreated, mild)\n             \"1,1\": 0.6, \"0,1\": 0.5 };         // P(recover | treated/untreated, severe)\n// Backdoor adjustment: average the within-severity effect over P(z)\nlet ate = 0;\nfor (const z of [0, 1]) ate += (pY[\"1,\" + z] - pY[\"0,\" + z]) * pz[z];\nconsole.log(\"adjusted ATE = \" + ate.toFixed(2));\n// Within EACH severity the drug adds 0.10 -- the honest causal effect, free of the\n// severity confounding that a naive treated-minus-untreated comparison would carry.</div>\n<h3>7. When you cannot adjust</h3>\n<p>Sometimes no measured set blocks the backdoors (an unobserved confounder). Two escapes: the <b>front-door criterion</b> exploits a fully-observed mediator to route around unmeasured confounding, and an <b>instrumental variable</b> uses a source of \"as-good-as-random\" variation in $X$. Both recover causal effects when plain adjustment cannot.</p>\n<h3>8. Why this matters for ML and experimentation</h3>\n<p>DAGs explain <em>why</em> randomized A/B tests work (randomizing $X$ deletes all arrows into it, erasing every backdoor), which features are safe to condition on, and when a model will break under distribution shift (it leaned on a backdoor, not a causal, path). The same graphs underlie causal ML, fairness analysis, and treatment-effect estimation.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: d-separation, precisely</summary>\n<p>A path is <b>blocked</b> by a set $Z$ if it contains either (i) a chain $a\\to b\\to c$ or fork $a\\leftarrow b\\to c$ with the middle node $b\\in Z$, or (ii) a collider $a\\to b\\leftarrow c$ with $b\\notin Z$ <em>and</em> no descendant of $b$ in $Z$. If every path from $X$ to $Y$ is blocked, they are d-separated given $Z$, which implies $X\\perp Y\\mid Z$ in every distribution compatible with the graph.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the front-door criterion</summary>\n<p>Suppose $X\\to M\\to Y$ with an <em>unmeasured</em> confounder between $X$ and $Y$, but $M$ fully mediates the effect and is itself unconfounded with $Y$ given $X$. Then you can identify the effect in two adjusted steps — $X$ on $M$, then $M$ on $Y$ — and chain them. The front-door formula recovers $P(Y\\mid\\text{do}(X))$ even though no backdoor set exists.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why not control for everything?</summary>\n<p>\"Adjust for every covariate\" is wrong. Conditioning on a <b>mediator</b> removes part of the causal effect; conditioning on a <b>collider</b> (or its descendant) opens a spurious path; and conditioning on a pre-treatment collider can even create \"M-bias\" between two otherwise-independent confounders. The DAG is what distinguishes a helpful control from a harmful one — data alone cannot.</p>\n</details>",
          "mcq": [
            {
              "q": "An arrow $X\\to Y$ in a causal DAG means:",
              "choices": [
                "$X$ is a direct cause of $Y$",
                "$X$ and $Y$ are correlated",
                "$Y$ causes $X$",
                "$X$ and $Y$ are independent"
              ],
              "answer": 0,
              "explain": "Edges encode direct causation, not mere association."
            },
            {
              "q": "A backdoor path from $X$ to $Y$ is:",
              "choices": [
                "The direct causal path $X\\to Y$",
                "A non-causal path that starts with an arrow into $X$",
                "Any path of length one",
                "A path that cannot transmit association"
              ],
              "answer": 1,
              "explain": "Backdoor paths begin with an arrow into X and carry confounding."
            },
            {
              "q": "The backdoor criterion requires an adjustment set $Z$ that:",
              "choices": [
                "Includes at least one collider",
                "Contains every variable in the graph",
                "Blocks all backdoor paths and contains no descendant of $X$",
                "Is always empty"
              ],
              "answer": 2,
              "explain": "Block backdoors, exclude descendants of X (mediators/effects)."
            },
            {
              "q": "A chain or fork path is blocked when you:",
              "choices": [
                "Remove the outcome",
                "Condition on a collider",
                "Leave all nodes unconditioned",
                "Condition on its middle (non-collider) node"
              ],
              "answer": 3,
              "explain": "Conditioning on the mediator/confounder middle node blocks the path."
            },
            {
              "q": "A path through a collider is:",
              "choices": [
                "Blocked by default, but opened by conditioning on the collider",
                "Always open",
                "Opened by leaving the collider unconditioned",
                "Unaffected by conditioning"
              ],
              "answer": 0,
              "explain": "Colliders block until you condition on them (or a descendant)."
            },
            {
              "q": "To estimate the causal effect of $X$ on $Y$ you should adjust for:",
              "choices": [
                "Every available variable",
                "Confounders (backdoor variables), not mediators or colliders",
                "Only colliders",
                "Only mediators"
              ],
              "answer": 1,
              "explain": "Adjust for confounders; controlling mediators/colliders introduces bias."
            },
            {
              "q": "Conditioning on a mediator on the $X\\to Y$ path:",
              "choices": [
                "Has no effect on the estimate",
                "Removes confounding with no downside",
                "Blocks part of the causal effect, underestimating it",
                "Is required by the backdoor criterion"
              ],
              "answer": 2,
              "explain": "A mediator transmits the effect; adjusting for it removes that portion."
            },
            {
              "q": "In $P(Y\\mid\\text{do}(X{=}x))=\\sum_z P(Y\\mid X{=}x,Z{=}z)P(Z{=}z)$, the sum is over:",
              "choices": [
                "All nodes in the graph",
                "The values of the outcome $Y$",
                "The values of the treatment $X$",
                "The values of the adjustment set $Z$"
              ],
              "answer": 3,
              "explain": "Adjustment re-weights strata of the backdoor set Z by P(z)."
            },
            {
              "q": "The \"acyclic\" in DAG means the graph has:",
              "choices": [
                "No directed cycles — you cannot follow arrows back to where you started",
                "No more than one edge",
                "Only undirected edges",
                "Exactly one collider"
              ],
              "answer": 0,
              "explain": "Causal DAGs forbid directed cycles, so causation has a consistent direction."
            },
            {
              "q": "Randomly assigning $X$ changes its DAG by:",
              "choices": [
                "Adding arrows into $X$",
                "Deleting every arrow into $X$, so no backdoor paths remain",
                "Removing the outcome $Y$",
                "Creating a collider at $X$"
              ],
              "answer": 1,
              "explain": "Randomization makes X independent of its causes — graph surgery on X."
            },
            {
              "q": "The front-door criterion identifies an effect by using:",
              "choices": [
                "An additional confounder",
                "A larger sample size",
                "A fully-observed mediator to bypass unmeasured confounding",
                "A collider as a control"
              ],
              "answer": 2,
              "explain": "A measured mediator lets you route around unobserved X-Y confounding."
            },
            {
              "q": "$X$ and $Y$ are d-separated by $Z$ when:",
              "choices": [
                "They share a collider",
                "At least one path is open",
                "$Z$ is empty",
                "Every path between them is blocked given $Z$"
              ],
              "answer": 3,
              "explain": "d-separation requires ALL paths blocked, implying conditional independence."
            },
            {
              "q": "A descendant of $X$ must be excluded from the adjustment set because:",
              "choices": [
                "It is affected by $X$, so conditioning on it can distort the causal effect",
                "It always blocks backdoor paths",
                "It is never measured",
                "It is the treatment itself"
              ],
              "answer": 0,
              "explain": "Descendants of X (mediators/effects) bias the estimate if adjusted for."
            },
            {
              "q": "A fork $X\\leftarrow Z\\to Y$ produces:",
              "choices": [
                "A direct causal effect of $X$ on $Y$",
                "A non-causal (confounding) association between $X$ and $Y$",
                "Independence that conditioning destroys",
                "A blocked path by default"
              ],
              "answer": 1,
              "explain": "A common cause Z confounds X and Y until you condition on Z."
            },
            {
              "q": "The naive $P(Y\\mid X)$ can differ from $P(Y\\mid\\text{do}(X))$ because:",
              "choices": [
                "do() requires more data",
                "They are identical by definition",
                "Observing $X$ carries confounding; intervening removes it",
                "Conditioning deletes arrows into $X$"
              ],
              "answer": 2,
              "explain": "Only do() severs the backdoor paths; plain conditioning leaves them."
            },
            {
              "q": "An instrumental variable is one that:",
              "choices": [
                "Is a descendant of $Y$",
                "Is a common effect of $X$ and $Y$",
                "Equals the confounder",
                "Affects $X$ but has no direct path to $Y$ (and no shared confounder)"
              ],
              "answer": 3,
              "explain": "An instrument injects as-good-as-random variation into X."
            }
          ],
          "flashcards": [
            {
              "front": "What does an edge $X\\to Y$ in a causal DAG assert?",
              "back": "That $X$ is a <b>direct cause</b> of $Y$ (relative to the other variables in the graph)."
            },
            {
              "front": "What is a backdoor path?",
              "back": "A non-causal path from $X$ to $Y$ that starts with an arrow <em>into</em> $X$; it transmits confounding association."
            },
            {
              "front": "The backdoor criterion",
              "back": "Adjust for a set $Z$ that blocks all backdoor paths from $X$ to $Y$ and contains no descendant of $X$."
            },
            {
              "front": "When is a path blocked (d-separation)?",
              "back": "If a chain/fork has its middle node in $Z$, or a collider has its node (and all descendants) NOT in $Z$."
            },
            {
              "front": "The backdoor adjustment formula",
              "back": "$P(Y\\mid\\text{do}(X{=}x))=\\sum_z P(Y\\mid X{=}x,Z{=}z)\\,P(Z{=}z)$ for a valid backdoor set $Z$."
            },
            {
              "front": "Why does randomizing $X$ identify the effect?",
              "back": "It deletes every arrow into $X$, so there are no backdoor paths left to block."
            }
          ],
          "homework": [
            {
              "prompt": "In a fork $X\\leftarrow Z\\to Y$ (with $X\\to Y$ also present), what is the adjustment set needed to estimate the effect of $X$ on $Y$, and why?",
              "hint": "Block the backdoor through Z.",
              "solution": "Adjust for $\\{Z\\}$. The backdoor path $X\\leftarrow Z\\to Y$ is a fork through $Z$; conditioning on $Z$ blocks it, leaving only the causal path $X\\to Y$. $Z$ is not a descendant of $X$, so it satisfies the backdoor criterion."
            },
            {
              "prompt": "Explain why conditioning on a collider biases a causal estimate.",
              "hint": "What does conditioning on a collider do to the path?",
              "solution": "A collider $X\\to Z\\leftarrow Y$ blocks its path by default, so $X$ and $Y$ are unassociated through it. Conditioning on $Z$ (e.g. by selecting on it) opens the path, inducing a spurious, non-causal association between $X$ and $Y$ — the estimate now reflects selection/collider bias, not the true effect."
            },
            {
              "prompt": "State the two conditions of the backdoor criterion for an adjustment set $Z$.",
              "hint": "Blocking + a restriction on descendants.",
              "solution": "(1) $Z$ blocks every backdoor path from $X$ to $Y$ (paths into $X$). (2) $Z$ contains no descendant of $X$. Then $P(Y\\mid\\text{do}(X))=\\sum_z P(Y\\mid X,z)P(z)$."
            }
          ],
          "examples": [
            {
              "title": "Choosing the adjustment set",
              "body": "Genotype $Z$ affects both smoking $X$ and lung cancer $Y$; smoking also causes cancer. To estimate smoking's effect, what do you adjust for?",
              "solution": "Adjust for $Z$ (the genotype). It opens a backdoor fork $X\\leftarrow Z\\to Y$; conditioning on $Z$ blocks that confounding path while leaving the causal $X\\to Y$ intact. If $Z$ were unmeasured you would need an instrument or front-door route instead."
            },
            {
              "title": "A collider you must not control for",
              "body": "Talent $X$ and looks $Y$ are independent in the population, but both help you become a celebrity $Z$. Among celebrities, talent and looks are negatively correlated. Why?",
              "solution": "$Z$ is a collider ($X\\to Z\\leftarrow Y$). Studying only celebrities conditions on $Z$, opening the collider path and inducing a spurious negative association — if a celebrity isn't talented, they're probably good-looking (and vice versa). Controlling for \"is a celebrity\" would manufacture a correlation that isn't causal."
            },
            {
              "title": "Reading an effect off the formula",
              "body": "With confounder $Z$, you have $P(Y{=}1\\mid X{=}1,Z)$ and $P(Z)$. How do you get the causal effect?",
              "solution": "Use backdoor adjustment: $P(Y{=}1\\mid\\text{do}(X{=}1))=\\sum_z P(Y{=}1\\mid X{=}1,z)P(z)$, and similarly for $X{=}0$; subtract for the average treatment effect. This re-weights each stratum by its population share $P(z)$ rather than by how treatment happened to be distributed — exactly what the code example computes."
            }
          ]
        },
        {
          "id": "ps-causal-estimation",
          "title": "Estimating Causal Effects: Experiments & Observational Methods",
          "minutes": 17,
          "content": "<h3>1. The hook: from \"what's the effect?\" to a number</h3>\n<p>Knowing a DAG tells you <em>which</em> variables to adjust for; this lesson turns that into an actual estimate. The target is usually the <b>average treatment effect</b> $\\text{ATE}=\\mathbb E[Y(1)-Y(0)]$ — the average difference between the outcome if everyone were treated versus untreated. The trouble: we never see both potential outcomes for the same unit, so every method below is a clever way to fill in the missing half.</p>\n<h3>2. The randomized experiment (and the A/B test)</h3>\n<div data-viz=\"ps-ci-coverage\"></div>\n<p>Randomization makes treatment independent of every confounder, so the effect is just the <b>difference in mean outcomes</b>: $\\widehat{\\text{ATE}}=\\bar Y_{\\text{treat}}-\\bar Y_{\\text{control}}$. An online <b>A/B test</b> is exactly this experiment, and you report the difference with a confidence interval (above). The width shrinks like $1/\\sqrt{n}$, which is what sample-size/power planning is about.</p>\n<h3>3. When you cannot randomize</h3>\n<p>Often you only have observational data. Then you lean on the backdoor criterion and an <em>estimation</em> method that adjusts for the measured confounders $Z$. The three workhorses are propensity scores, instrumental variables, and difference-in-differences — each making a different assumption to stand in for randomization.</p>\n<h3>4. Propensity scores</h3>\n<p>The <b>propensity score</b> is the probability of treatment given covariates, $e(Z)=P(X{=}1\\mid Z)$. Remarkably, matching or weighting units so the treated and untreated have the same distribution of $e(Z)$ balances <em>all</em> the covariates in $Z$ at once — collapsing a high-dimensional adjustment into one number. Inverse-propensity weighting reweights each unit by $1/e(Z)$ (treated) or $1/(1-e(Z))$ (control) to mimic a randomized sample.</p>\n<h3>5. Instrumental variables</h3>\n<p>When confounders are unmeasured, an <b>instrument</b> $Z$ (affects $X$, no direct path to $Y$) identifies the effect through the <b>Wald estimator</b> $\\hat\\beta=\\dfrac{\\operatorname{Cov}(Z,Y)}{\\operatorname{Cov}(Z,X)}$ — the effect of $Z$ on $Y$ divided by its effect on $X$. Intuitively, $Z$ nudges $X$ in an as-good-as-random way, and we scale the resulting change in $Y$ by how much $X$ actually moved.</p>\n<h3>6. Difference-in-differences</h3>\n<p>With before/after data on a treated and an untreated group, <b>difference-in-differences</b> (DiD) subtracts the control group's change (the background trend) from the treated group's change. It assumes <b>parallel trends</b>: absent treatment, both groups would have moved together. Run it:</p>\n<div data-code=\"javascript\" data-expected=\"DiD estimate = 0.15\">// Difference-in-differences: did a policy raise the outcome rate?\nconst treat   = { before: 0.30, after: 0.50 };   // group that got the policy\nconst control = { before: 0.30, after: 0.35 };   // comparison group that did not\nconst did = (treat.after - treat.before) - (control.after - control.before);\nconsole.log(\"DiD estimate = \" + did.toFixed(2));\n// The control's +0.05 is the background trend; subtracting it leaves the policy's +0.15.</div>\n<h3>7. Pitfalls that fake an effect</h3>\n<p>Estimation has its own traps. <b>Peeking</b> — repeatedly checking an A/B test and stopping when it looks significant — inflates the false-positive rate far above the nominal level. <b>Novelty and seasonality</b> can masquerade as a lift. And every observational method shares one Achilles heel: <b>unmeasured confounding</b>, which no amount of clever weighting can remove.</p>\n<h3>8. Putting it together</h3>\n<p>The ladder of credibility: a randomized experiment when you can run one; otherwise propensity methods (if you measured the confounders), an instrument (if you have one), or difference-in-differences (if parallel trends hold). State your assumption, estimate the effect with an interval, and stress-test it — a causal number is only as good as the assumption that licenses it.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the potential-outcomes framework</summary>\n<p>Each unit has two <b>potential outcomes</b>: $Y(1)$ if treated and $Y(0)$ if not. The individual effect is $Y(1)-Y(0)$, but we only ever observe one of them — the <em>fundamental problem of causal inference</em>. So we target the average $\\text{ATE}=\\mathbb E[Y(1)-Y(0)]$, which randomization makes estimable because treated and control groups are exchangeable: $\\mathbb E[Y(1)]=\\mathbb E[Y\\mid X{=}1]$ and likewise for control.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: deriving the Wald estimator</summary>\n<p>Write $Y=\\beta X + U$ with the confounder $U$ correlated with $X$. An instrument $Z$ satisfies $\\operatorname{Cov}(Z,U)=0$, so $\\operatorname{Cov}(Z,Y)=\\beta\\operatorname{Cov}(Z,X)$, giving $\\hat\\beta=\\operatorname{Cov}(Z,Y)/\\operatorname{Cov}(Z,X)$. With a binary instrument this is the ratio of differences $\\frac{\\mathbb E[Y\\mid Z{=}1]-\\mathbb E[Y\\mid Z{=}0]}{\\mathbb E[X\\mid Z{=}1]-\\mathbb E[X\\mid Z{=}0]}$, and it estimates a <b>local</b> effect (LATE) for the units the instrument actually moves.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why peeking breaks p-values</summary>\n<p>A fixed-horizon p-value is calibrated to be checked <em>once</em>, at the planned sample size. Each interim look is another chance to cross the threshold by noise, so repeated peeking can push the true type-I error from 5% toward 20–30%. Fixes: fix $n$ in advance, apply alpha-spending, or use <b>always-valid</b> sequential tests (e.g. mixture SPRT) whose guarantees hold at every peek.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: doubly robust estimation — two chances to be right</summary>\n<p>From observational data you can estimate a treatment effect two ways, each trusting a different model. <b>Outcome regression</b> fits $\\hat m_t(x)=\\mathbb{E}[Y\\mid X=x, T=t]$ and imputes the missing potential outcomes. <b>Inverse-propensity weighting</b> (IPW) instead fits the treatment probability $\\hat e(x)=P(T=1\\mid X=x)$ and reweights observed outcomes by $1/\\hat e$. Each is unbiased only if <em>its</em> model is correct.</p>\n<p>A <b>doubly robust</b> estimator (AIPW) fuses them: it starts from the outcome model and adds an IPW correction on its residuals, $\\hat\\tau = \\tfrac1n\\sum_i \\big[\\hat m_1(X_i)-\\hat m_0(X_i) + \\tfrac{T_i(Y_i-\\hat m_1)}{\\hat e(X_i)} - \\tfrac{(1-T_i)(Y_i-\\hat m_0)}{1-\\hat e(X_i)}\\big]$. The payoff is in the name: the estimate stays consistent if <em>either</em> the outcome model or the propensity model is right. If the outcome model is correct the residuals vanish, so propensity errors do not matter; if the propensity model is correct, the IPW part is already unbiased.</p>\n<p>That robustness, plus an orthogonality that makes the estimate insensitive to small nuisance errors, is what powers <b>double / debiased machine learning</b>: drop flexible ML models in for the two nuisance functions, fit them on split folds (cross-fitting), and you still get valid confidence intervals for the causal effect — modern causal inference at machine-learning scale.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: regression discontinuity — when a cutoff is a natural experiment</summary>\n<p>Often treatment is assigned by a sharp rule: a scholarship if a test score clears 80, a subsidy if income falls below a line, a warning label if a rating dips under a threshold. <b>Regression discontinuity</b> (RD) turns that rule into a causal study. Units just below and just above the cutoff $c$ in the running variable $X$ are nearly identical in everything <em>except</em> whether they got treated — a local randomized experiment handed to you for free.</p>\n<p>The effect is simply the <em>jump</em> in the outcome at the cutoff. Fit the outcome-versus-$X$ trend separately on each side, extrapolate both to $c$, and subtract: $\\tau = \\lim_{x\\to c^{+}} \\mathbb{E}[Y\\mid X=x] - \\lim_{x\\to c^{-}} \\mathbb{E}[Y\\mid X=x]$. Any smooth confounding passes continuously through $c$ and cancels; only the treatment changes discontinuously, so the gap is causal.</p>\n<p>The price is locality and an assumption. RD identifies the effect <em>only near the cutoff</em> (it says nothing about units far from it), and it requires that nothing else jumps at $c$ and that subjects cannot precisely manipulate $X$ to land on the favorable side. When compliance is imperfect — the treatment <em>probability</em> jumps but not all the way to one — the <em>fuzzy</em> RD variant rescales the outcome jump by the treatment jump, exactly the instrumental-variables Wald ratio applied at the threshold.</p>\n<p>Estimate it yourself — fit a line each side and read off the gap at the cutoff:</p>\n<div data-code=\"javascript\" data-expected=\"estimated effect (jump at cutoff) = 1.60\">// Regression discontinuity: estimate the jump by fitting a line on each side of the cutoff.\nfunction fit(pts) {\n  var n = pts.length, sx = 0, sy = 0, sxx = 0, sxy = 0;\n  pts.forEach(function(p) { sx += p[0]; sy += p[1]; sxx += p[0]*p[0]; sxy += p[0]*p[1]; });\n  var sl = (n*sxy - sx*sy) / (n*sxx - sx*sx);\n  return { sl: sl, ic: (sy - sl*sx) / n };\n}\nfunction at(f, x) { return f.sl*x + f.ic; }\nvar cut = 5;\nvar below = [[2,2.0],[3,2.4],[4,2.8]];   // points left of the cutoff (untreated)\nvar above = [[6,5.2],[7,5.6],[8,6.0]];   // points right of the cutoff (lifted by the effect)\nconsole.log(\"estimated effect (jump at cutoff) = \" + (at(fit(above),cut) - at(fit(below),cut)).toFixed(2));</div>\n</details>\n<div data-viz=\"ps-regression-discontinuity\"></div>",
          "mcq": [
            {
              "q": "In a randomized experiment, the simplest estimator of the average treatment effect is:",
              "choices": [
                "The difference in mean outcomes between the treated and control groups",
                "The correlation between treatment and outcome",
                "The ratio of group sizes",
                "The variance of the outcome"
              ],
              "answer": 0,
              "explain": "Randomization makes the mean difference an unbiased ATE estimate."
            },
            {
              "q": "An online A/B test is fundamentally:",
              "choices": [
                "An observational study",
                "A randomized controlled experiment",
                "A propensity-score analysis",
                "An instrumental-variable design"
              ],
              "answer": 1,
              "explain": "Users are randomized to variants — it is an RCT."
            },
            {
              "q": "The propensity score $e(Z)$ is:",
              "choices": [
                "The correlation of $X$ and $Y$",
                "The probability of the outcome, $P(Y{=}1)$",
                "The probability of treatment given covariates, $P(X{=}1\\mid Z)$",
                "The treatment effect itself"
              ],
              "answer": 2,
              "explain": "Balancing on e(Z) balances all covariates in Z."
            },
            {
              "q": "The instrumental-variable (Wald) estimator equals:",
              "choices": [
                "$\\operatorname{Var}(Y)/\\operatorname{Var}(X)$",
                "$\\operatorname{Cov}(X,Y)/\\operatorname{Var}(X)$",
                "$\\operatorname{Cov}(Z,Y)\\cdot\\operatorname{Cov}(Z,X)$",
                "$\\operatorname{Cov}(Z,Y)/\\operatorname{Cov}(Z,X)$"
              ],
              "answer": 3,
              "explain": "Effect of the instrument on Y divided by its effect on X."
            },
            {
              "q": "Difference-in-differences relies on the assumption of:",
              "choices": [
                "Parallel trends between the treated and control groups",
                "Equal group sizes",
                "A valid instrument",
                "A randomized treatment"
              ],
              "answer": 0,
              "explain": "Absent treatment, both groups would change by the same amount."
            },
            {
              "q": "Repeatedly \"peeking\" at an A/B test and stopping when significant:",
              "choices": [
                "Reduces the false-positive rate",
                "Inflates the false-positive (type-I error) rate",
                "Has no effect on error rates",
                "Increases statistical power for free"
              ],
              "answer": 1,
              "explain": "Each look is another chance to cross the threshold by noise."
            },
            {
              "q": "Propensity-score matching removes bias only from:",
              "choices": [
                "Colliders",
                "Unmeasured confounders",
                "Measured confounders included in $Z$",
                "Random noise"
              ],
              "answer": 2,
              "explain": "Like all adjustment, it cannot touch unmeasured confounders."
            },
            {
              "q": "The chief threat to any observational causal estimate is:",
              "choices": [
                "A confidence interval that is too narrow",
                "Too large a sample",
                "A randomized treatment",
                "Unmeasured confounding"
              ],
              "answer": 3,
              "explain": "An unobserved common cause biases the estimate irreducibly."
            },
            {
              "q": "The average treatment effect (ATE) is defined as:",
              "choices": [
                "$\\mathbb E[Y(1)-Y(0)]$, the mean difference of the two potential outcomes",
                "$\\mathbb E[Y\\mid X{=}1]$ alone",
                "The correlation of $X$ and $Y$",
                "The variance of the treatment"
              ],
              "answer": 0,
              "explain": "ATE averages each unit's treated-minus-untreated potential outcome."
            },
            {
              "q": "The \"fundamental problem of causal inference\" is that:",
              "choices": [
                "Samples are always too small",
                "We never observe both potential outcomes for the same unit",
                "Randomization is impossible",
                "Confounders cannot be measured"
              ],
              "answer": 1,
              "explain": "Each unit reveals only Y(1) or Y(0), never both."
            },
            {
              "q": "Inverse-propensity weighting estimates an effect by:",
              "choices": [
                "Maximizing the correlation",
                "Discarding all confounders",
                "Reweighting units by $1/e(Z)$ (treated) and $1/(1-e(Z))$ (control) to mimic a randomized sample",
                "Using only the largest stratum"
              ],
              "answer": 2,
              "explain": "IPW upweights under-represented treatment/covariate combinations."
            },
            {
              "q": "A valid instrument must affect $X$ and:",
              "choices": [
                "Equal the outcome",
                "Be caused by $Y$",
                "Be a descendant of $X$",
                "Have no direct effect on $Y$ and share no confounder with $Y$"
              ],
              "answer": 3,
              "explain": "Relevance plus the exclusion restriction define an instrument."
            },
            {
              "q": "With heterogeneous effects, an instrument identifies a:",
              "choices": [
                "Local average treatment effect (LATE) — for the units it actually moves",
                "Global effect for everyone",
                "Effect only for the control group",
                "Purely correlational quantity"
              ],
              "answer": 0,
              "explain": "IV recovers the effect among compliers, the LATE."
            },
            {
              "q": "In an A/B test, the confidence interval for the lift narrows roughly like:",
              "choices": [
                "$1/n^2$",
                "$1/\\sqrt{n}$ as the sample size $n$ grows",
                "$\\log n$",
                "It does not depend on $n$"
              ],
              "answer": 1,
              "explain": "Standard error scales as 1/sqrt(n)."
            },
            {
              "q": "Difference-in-differences isolates the treatment effect by subtracting:",
              "choices": [
                "The outcome variance",
                "The treated group's baseline from the control group's baseline",
                "The control group's change (the background trend) from the treated group's change",
                "The propensity score"
              ],
              "answer": 2,
              "explain": "The control's change estimates the counterfactual trend."
            },
            {
              "q": "On the \"credibility ladder\" of causal methods, the most credible (when feasible) is:",
              "choices": [
                "A naive correlation",
                "Propensity matching",
                "Difference-in-differences",
                "A randomized experiment"
              ],
              "answer": 3,
              "explain": "Randomization balances all confounders, measured or not."
            }
          ],
          "flashcards": [
            {
              "front": "The RCT estimator of the average treatment effect",
              "back": "The difference in mean outcomes, $\\bar Y_{\\text{treat}}-\\bar Y_{\\text{control}}$ — valid because randomization balances confounders."
            },
            {
              "front": "Propensity score $e(Z)$",
              "back": "$e(Z)=P(X{=}1\\mid Z)$. Matching or weighting on it balances all covariates in $Z$ at once."
            },
            {
              "front": "Instrumental-variable (Wald) estimator",
              "back": "$\\hat\\beta=\\operatorname{Cov}(Z,Y)/\\operatorname{Cov}(Z,X)$ — effect of the instrument on $Y$ divided by its effect on $X$."
            },
            {
              "front": "Difference-in-differences",
              "back": "$(\\text{treat after}-\\text{before})-(\\text{control after}-\\text{before})$; assumes <b>parallel trends</b>."
            },
            {
              "front": "Why is \"peeking\" at an A/B test dangerous?",
              "back": "Repeated interim looks inflate the type-I (false-positive) rate; use a fixed sample size or always-valid sequential tests."
            },
            {
              "front": "Shared limitation of all observational methods",
              "back": "They only adjust for <em>measured</em> confounders; unmeasured confounding leaves residual bias."
            }
          ],
          "homework": [
            {
              "prompt": "A treated group's outcome rises from 0.40 to 0.70; a comparable control group rises from 0.40 to 0.55 over the same period. Compute the difference-in-differences estimate.",
              "hint": "Treated change minus control change.",
              "solution": "Treated change $=0.70-0.40=0.30$; control change $=0.55-0.40=0.15$. DiD $=0.30-0.15=0.15$. The control's $+0.15$ is the background trend; the policy's effect is $+0.15$."
            },
            {
              "prompt": "Why does a randomized experiment give a more credible effect than propensity-score matching on the same data?",
              "hint": "Measured vs unmeasured confounders.",
              "solution": "Randomization balances <em>all</em> confounders, measured or not, by construction. Propensity matching balances only the covariates you put in $Z$; any unmeasured confounder remains and biases the estimate. The RCT removes the assumption that you measured everything that matters."
            },
            {
              "prompt": "State the parallel-trends assumption behind difference-in-differences, and give one way it can fail.",
              "hint": "What must the control group represent?",
              "solution": "Parallel trends: absent the treatment, the treated and control groups' outcomes would have changed by the same amount, so the control's change estimates the treated group's counterfactual trend. It fails if something else hit only one group at the same time (e.g. a regional shock), or if the groups were already diverging before treatment."
            }
          ],
          "examples": [
            {
              "title": "Reading an A/B test",
              "body": "Variant B converts at 5.2% vs A at 4.8% over 20,000 users each; the 95% CI for the lift is [0.1%, 0.7%]. What do you conclude?",
              "solution": "The estimated lift is $+0.4$ percentage points, and the CI excludes 0, so B beats A at the 5% level. Report the interval, not just the point — and only because the test ran to its planned sample size (no peeking) is the 5% guarantee intact."
            },
            {
              "title": "A difference-in-differences evaluation",
              "body": "A city raises its minimum wage; employment in that city goes 0.30→0.50 while a similar control city goes 0.30→0.35. Estimate the policy effect.",
              "solution": "DiD $=(0.50-0.30)-(0.35-0.30)=0.20-0.05=0.15$. Subtracting the control's background $+0.05$ trend isolates the policy's $+0.15$ — valid only if the two cities would otherwise have moved in parallel."
            },
            {
              "title": "An instrument for schooling",
              "body": "To estimate schooling's effect on wages (confounded by ability), you use distance-to-college as an instrument. How does the Wald estimator work?",
              "solution": "Distance affects years of schooling but plausibly not wages directly. The Wald estimate is $\\operatorname{Cov}(\\text{distance},\\text{wage})/\\operatorname{Cov}(\\text{distance},\\text{schooling})$ — the wage change induced per unit of schooling change driven by distance. It estimates a local effect for those whose schooling actually responds to distance."
            }
          ]
        }
      ]
    }
  ]
}
);
