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
          "content": "<h3>1. The hook: taming chance with sets</h3>\\n<p>Flip a coin. You cannot predict the single outcome, yet over thousands of flips a stubborn regularity emerges: about half land heads. Probability is the mathematics of that regularity. The genius move, due to <strong>Andrey Kolmogorov</strong> in 1933, was to stop arguing about what randomness <em>is</em> and instead measure it with the same machinery we use for areas and weights: we list every possible outcome as a <em>set</em>, treat events as <em>subsets</em>, and assign each subset a number between 0 and 1. Everything that follows is bookkeeping on sets.</p>\\n\\n<h3>2. Random experiments, outcomes, and the sample space</h3>\\n<p>A <strong>random experiment</strong> is any procedure whose outcome is uncertain in advance but whose set of possible outcomes is known. Each indivisible result is an <strong>outcome</strong> (or sample point). The <strong>sample space</strong> $\\\\Omega$ is the set of <em>all</em> outcomes — they must be mutually exclusive and exhaustive, so exactly one occurs each trial.</p>\\n<ul>\\n<li>One coin flip: $\\\\Omega = \\\\{H, T\\\\}$.</li>\\n<li>One fair die: $\\\\Omega = \\\\{1, 2, 3, 4, 5, 6\\\\}$.</li>\\n<li>Two dice (ordered): $\\\\Omega = \\\\{(i,j) : 1 \\\\le i, j \\\\le 6\\\\}$, so $|\\\\Omega| = 36$.</li>\\n<li>Drawing one card: $|\\\\Omega| = 52$.</li>\\n</ul>\\n\\n<h3>3. Events as subsets of $\\\\Omega$</h3>\\n<p>An <strong>event</strong> is any subset $A \\\\subseteq \\\\Omega$; we say \\\"$A$ <em>occurs</em>\\\" when the realized outcome lies in $A$. For one die, \\\"even\\\" is the event $A = \\\\{2, 4, 6\\\\}$. The whole space $\\\\Omega$ is the <em>certain</em> event; the empty set $\\\\varnothing$ is the <em>impossible</em> event. Because events are sets, the language of set theory becomes the language of chance:</p>\\n<ul>\\n<li><strong>Union</strong> $A \\\\cup B$ — \\\"$A$ <em>or</em> $B$\\\" (at least one occurs).</li>\\n<li><strong>Intersection</strong> $A \\\\cap B$ — \\\"$A$ <em>and</em> $B$\\\" (both occur).</li>\\n<li><strong>Complement</strong> $A^c = \\\\Omega \\\\setminus A$ — \\\"<em>not</em> $A$\\\".</li>\\n<li><strong>Mutually exclusive / disjoint</strong>: $A \\\\cap B = \\\\varnothing$, meaning $A$ and $B$ cannot occur together.</li>\\n</ul>\\n<p><strong>Example.</strong> Roll one die. Let $A = \\\\{2,4,6\\\\}$ (even) and $B = \\\\{4,5,6\\\\}$ (greater than 3). Then $A \\\\cup B = \\\\{2,4,5,6\\\\}$, $A \\\\cap B = \\\\{4,6\\\\}$, and $A^c = \\\\{1,3,5\\\\}$. The events $A$ and $\\\\{1,3,5\\\\}$ are disjoint and together fill $\\\\Omega$.</p>\\n\\n<h3>4. The Kolmogorov axioms</h3>\\n<p>A <strong>probability measure</strong> $P$ assigns to each event a real number obeying three rules. Everything in probability is a logical consequence of them.</p>\\n<ul>\\n<li><strong>Axiom 1 (Nonnegativity).</strong> $P(A) \\\\ge 0$ for every event $A$.</li>\\n<li><strong>Axiom 2 (Normalization).</strong> $P(\\\\Omega) = 1$ — something certainly happens.</li>\\n<li><strong>Axiom 3 (Countable additivity).</strong> If $A_1, A_2, \\\\dots$ are pairwise disjoint, then $$P\\\\!\\\\left(\\\\bigcup_{i=1}^{\\\\infty} A_i\\\\right) = \\\\sum_{i=1}^{\\\\infty} P(A_i).$$</li>\\n</ul>\\n<p>The third axiom is the workhorse: probabilities of <em>non-overlapping</em> events simply add. From it everything else is derived — there are no extra assumptions hidden anywhere.</p>\\n\\n<h3>5. Equally likely outcomes and counting</h3>\\n<p>When $\\\\Omega$ is finite and every outcome is <em>equally likely</em> (a fair die, a well-shuffled deck), each of the $|\\\\Omega|$ outcomes carries probability $1/|\\\\Omega|$, and additivity gives the classical formula $$P(A) = \\\\frac{|A|}{|\\\\Omega|} = \\\\frac{\\\\text{favorable outcomes}}{\\\\text{total outcomes}}.$$</p>\\n<p><strong>Example.</strong> Roll two fair dice. What is $P(\\\\text{sum} = 7)$? The favorable outcomes are $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ — six of them — out of $36$, so $P = 6/36 = 1/6 \\\\approx 0.167$. The \\\"equally likely\\\" assumption must hold over the right $\\\\Omega$: here the $36$ <em>ordered</em> pairs are equally likely, while the $11$ possible sums are <em>not</em>.</p>\\n\\n<h3>6. The complement rule</h3>\\n<p>Since $A$ and $A^c$ are disjoint and $A \\\\cup A^c = \\\\Omega$, Axioms 2 and 3 give $P(A) + P(A^c) = 1$, hence $$P(A^c) = 1 - P(A).$$ This is the lazy mathematician's best friend: \\\"at least one\\\" problems are usually easier through their complement \\\"none\\\". Two consequences fall out immediately: $P(\\\\varnothing) = 1 - P(\\\\Omega) = 0$, and $0 \\\\le P(A) \\\\le 1$ for every event.</p>\\n<p><strong>Example.</strong> Roll a die twice; find $P(\\\\text{at least one } 6)$. The complement \\\"no 6 either roll\\\" has probability $(5/6)^2 = 25/36$, so the answer is $1 - 25/36 = 11/36 \\\\approx 0.306$.</p>\\n\\n<h3>7. Inclusion–exclusion for two events</h3>\\n<p>When $A$ and $B$ <em>overlap</em>, you cannot just add $P(A) + P(B)$ — outcomes in $A \\\\cap B$ get counted twice. Subtract the overlap once: $$P(A \\\\cup B) = P(A) + P(B) - P(A \\\\cap B).$$ If $A$ and $B$ are mutually exclusive then $P(A\\\\cap B)=0$ and this collapses to plain additivity.</p>\\n<p><strong>Example.</strong> Draw one card from $52$. Let $A = \\\\text{heart}$ and $B = \\\\text{face card}$ (J, Q, K). Then $P(A) = 13/52$, $P(B) = 12/52$, and the overlap (heart face cards: J, Q, K of hearts) is $P(A\\\\cap B) = 3/52$. So $$P(A \\\\cup B) = \\\\frac{13}{52} + \\\\frac{12}{52} - \\\\frac{3}{52} = \\\\frac{22}{52} = \\\\frac{11}{26} \\\\approx 0.423.$$</p>\\n\\n<h3>8. The big picture</h3>\\n<p>You now have the entire grammar of probability: a sample space $\\\\Omega$, events as subsets, three axioms, and two indispensable corollaries — the complement rule and inclusion–exclusion. Conditional probability, independence, and random variables are all built on exactly this foundation. Master the move of <em>translating a word problem into sets and then counting</em>, and the rest of the course is elaboration.</p>",
          "mcq": [
            {
              "q": "In Kolmogorov's framework, why is it useful to model events as *subsets* of the sample space $\\Omega$ rather than as informal verbal descriptions?",
              "choices": [
                "It guarantees every event has probability exactly $\\tfrac{1}{|\\Omega|}$",
                "It lets us combine and manipulate events using set operations (union, intersection, complement) with established rules",
                "It removes the need to specify $\\Omega$ in the first place",
                "It forces all outcomes to be equally likely"
              ],
              "answer": 1,
              "explain": "Modeling events as subsets means logical combinations of events become set operations, so all the algebra of sets applies directly. Equal probabilities are a special-case assumption, not a consequence of the set model."
            },
            {
              "q": "For the two-ordered-dice experiment with $|\\Omega| = 36$, let $A$ be the event \"the sum is 7.\" How many outcomes are in $A$?",
              "choices": [
                "5",
                "6",
                "7",
                "11"
              ],
              "answer": 1,
              "explain": "The ordered pairs summing to 7 are $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ — exactly 6 outcomes. The value 11 confuses the number of possible sums with the count of favorable outcomes."
            },
            {
              "q": "A student says, \"For two dice, the sample space is the set of possible sums $\\{2,3,\\dots,12\\}$, so there are 11 equally likely outcomes.\" What is the flaw?",
              "choices": [
                "The flaw is real: there really are 11 equally likely sums",
                "Sums are not equally likely; the natural equiprobable space is the 36 ordered pairs",
                "The sample space should have 12 elements, not 11",
                "Sums cannot form a valid sample space at all"
              ],
              "answer": 1,
              "explain": "The 11 sums are mutually exclusive and exhaustive, so they form a valid sample space, but they are NOT equally likely (a sum of 7 has 6 ways, a sum of 2 has 1). Equiprobability holds for the 36 ordered pairs, not the sums."
            },
            {
              "q": "Which property must the outcomes of a sample space $\\Omega$ satisfy?",
              "choices": [
                "They must be equally likely",
                "They must be mutually exclusive and exhaustive, so exactly one occurs per trial",
                "They must be finite in number",
                "They must each be a subset of some larger set"
              ],
              "answer": 1,
              "explain": "By definition the outcomes partition every trial: mutually exclusive (no two happen together) and exhaustive (at least one happens), so exactly one occurs. Outcomes need not be equally likely nor finite."
            },
            {
              "q": "Two events $A$ and $B$ are called *mutually exclusive* (disjoint) when:",
              "choices": [
                "$A \\cup B = \\Omega$",
                "$A \\cap B = \\varnothing$",
                "$A = B^c$",
                "$A \\subseteq B$"
              ],
              "answer": 1,
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
                "8",
                "16",
                "24"
              ],
              "answer": 2,
              "explain": "The number of subsets of a set with $n$ elements is $2^n$, so $2^4 = 16$. The value 24 is $4!$ (orderings, not subsets), and 8 would be $2^3$."
            },
            {
              "q": "Which of the following is the correct statement of the three Kolmogorov axioms?",
              "choices": [
                "$P(A) \\ge 0$; $P(\\Omega) = 1$; for disjoint $A,B$, $P(A \\cup B) = P(A) + P(B)$",
                "$P(A) > 0$; $P(\\Omega) = 1$; $P(A \\cup B) = P(A) + P(B)$ for all $A,B$",
                "$0 \\le P(A) \\le 1$; $P(\\varnothing) = 1$; $P(A \\cap B) = P(A)P(B)$",
                "$P(A) \\ge 0$; $P(\\Omega) = \\infty$; $P(A \\cup B) = P(A)\\,P(B)$"
              ],
              "answer": 0,
              "explain": "The axioms are non-negativity ($P(A)\\ge 0$), normalization ($P(\\Omega)=1$), and additivity for disjoint events ($P(A\\cup B)=P(A)+P(B)$). Additivity requires disjointness, $P(A)$ can be 0, and $P(A)P(B)$ describes independence — a separate notion, not an axiom."
            },
            {
              "q": "A student claims $P(A \\cup B) = P(A) + P(B)$ for the events $A=\\{2,4,6\\}$ and $B=\\{4,5,6\\}$ on a fair die, computing $\\tfrac{3}{6}+\\tfrac{3}{6}=1$. Why is this wrong, and what is the correct value?",
              "choices": [
                "It is correct; $P(A\\cup B)=1$",
                "Additivity needs disjoint events; here $A\\cap B=\\{4,6\\}$, so $P(A\\cup B)=\\tfrac{4}{6}$",
                "The correct value is $\\tfrac{6}{6}=1$ because the die has 6 faces",
                "Additivity always holds, so $P(A\\cup B)=\\tfrac{3}{6}$"
              ],
              "answer": 1,
              "explain": "The additivity axiom only applies to disjoint events. Since $A$ and $B$ overlap in $\\{4,6\\}$, we must use inclusion-exclusion: $A\\cup B = \\{2,4,5,6\\}$, giving $P(A\\cup B)=\\tfrac{4}{6}=\\tfrac{2}{3}$, not 1."
            },
            {
              "q": "Using only the axioms, which statement about the complement $A^c$ must hold?",
              "choices": [
                "$P(A^c) = 1 - P(A)$",
                "$P(A^c) = P(A)$",
                "$P(A^c) = 1 + P(A)$",
                "$P(A^c) = \\tfrac{1}{P(A)}$"
              ],
              "answer": 0,
              "explain": "Since $A$ and $A^c$ are disjoint with $A \\cup A^c = \\Omega$, additivity and normalization give $P(A)+P(A^c)=P(\\Omega)=1$, hence $P(A^c)=1-P(A)$. This is a derived theorem, not a separate axiom."
            },
            {
              "q": "One card is drawn from a standard deck ($|\\Omega|=52$). What is the probability the card is a face card (J, Q, or K) OR a heart?",
              "choices": [
                "$\\frac{12}{52}$",
                "$\\frac{25}{52}$",
                "$\\frac{22}{52}$",
                "$\\frac{16}{52}$"
              ],
              "answer": 2,
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
            }
          ]
        },
        {
          "id": "ps-conditional-independence-bayes",
          "title": "Conditional Probability, Independence & Bayes' Theorem",
          "minutes": 16,
          "content": "<h3>1. The intuition: information changes the odds</h3>\n<p>Probability is not a fixed property of an event — it is a measure of belief <em>relative to what you know</em>. Draw a card from a shuffled deck and the chance it is the ace of spades is $1/52$. But if a friend peeks and tells you the card is black, that single fact slashes the field from 52 cards to 26, and the probability jumps to $1/26$. Nothing about the card changed; <strong>your information did</strong>. Conditional probability is the machinery for revising beliefs in light of evidence, and it culminates in <strong>Bayes' theorem</strong>, the engine behind spam filters, medical diagnosis, and every learning system that updates as data arrives.</p>\n<div data-viz=\"calc-bayes\"></div>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Conditioning on $B$ means <em>throwing away the part of the universe where $B$ is false and renormalizing</em>. You zoom into $B$ and treat it as your new sample space. Everything else follows from that one move.</p>\n</div>\n\n<h3>2. Conditional probability, formally</h3>\n<p>Given events $A$ and $B$ with $P(B) > 0$, the <strong>conditional probability of $A$ given $B$</strong> is</p>\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}.$$\n<p>The denominator $P(B)$ is the renormalization: we restrict attention to outcomes in $B$ and ask what fraction of <em>those</em> also lie in $A$. <strong>Concrete example.</strong> Roll a fair die. Let $A = \\{\\text{outcome is } 2\\}$ and $B = \\{\\text{outcome is even}\\}$. Then $P(A \\cap B) = P(\\{2\\}) = 1/6$ and $P(B) = 3/6$, so</p>\n$$P(A \\mid B) = \\frac{1/6}{3/6} = \\frac{1}{3}.$$\n<p>Knowing the roll is even raised the chance it is a 2 from $1/6$ to $1/3$ — exactly because we discarded the three odd outcomes.</p>\n\n<h3>3. The multiplication rule</h3>\n<p>Rearranging the definition gives the <strong>multiplication rule</strong>, a way to compute the probability of a joint event step by step:</p>\n$$P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A).$$\n<p>This chains: $P(A \\cap B \\cap C) = P(A)\\,P(B \\mid A)\\,P(C \\mid A \\cap B)$. <strong>Example.</strong> Draw two cards without replacement. The probability both are aces is $P(\\text{ace}_1)\\,P(\\text{ace}_2 \\mid \\text{ace}_1) = \\frac{4}{52}\\cdot\\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$.</p>\n\n<h3>4. Independence (and why it is not mutual exclusivity)</h3>\n<p>Events $A$ and $B$ are <strong>independent</strong> if knowing one tells you nothing about the other: $P(A \\mid B) = P(A)$. Multiplying through by $P(B)$ gives the symmetric, clean definition</p>\n$$P(A \\cap B) = P(A)\\,P(B).$$\n<p>A frequent confusion is conflating <strong>independent</strong> with <strong>mutually exclusive</strong> (disjoint). They are nearly opposite. If $A$ and $B$ are mutually exclusive with positive probabilities, then $A \\cap B = \\varnothing$, so $P(A \\cap B) = 0 \\ne P(A)P(B)$ — and learning $B$ happened tells you $A$ <em>cannot</em> have. <strong>Disjoint events with positive probability are maximally dependent, never independent.</strong> In the die example, $\\{2\\}$ and \"even\" are dependent; $\\{2\\}$ and \"odd\" are mutually exclusive.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>The \"naive\" in <em>naive Bayes</em> is the assumption that features are conditionally independent given the label. Likelihoods of i.i.d. data factor into a product, $\\prod_i P(x_i \\mid \\theta)$, precisely because of independence — and taking logs turns that product into the sums you minimize during training.</p>\n</div>\n\n<h3>5. The law of total probability</h3>\n<p>Suppose events $B_1, \\dots, B_n$ form a <strong>partition</strong> of the sample space: they are mutually exclusive and together exhaustive ($\\bigcup_i B_i = \\Omega$). Then any event $A$ can be reassembled from its slices inside each $B_i$:</p>\n$$P(A) = \\sum_{i=1}^{n} P(A \\mid B_i)\\,P(B_i).$$\n<p>This is a weighted average of conditional probabilities, weighted by how likely each scenario $B_i$ is. <strong>Example.</strong> Two factories make light bulbs: Factory 1 supplies $60\\%$ with a $2\\%$ defect rate, Factory 2 supplies $40\\%$ with a $5\\%$ rate. The chance a random bulb is defective is $P(D) = (0.02)(0.6) + (0.05)(0.4) = 0.012 + 0.020 = 0.032$, or $3.2\\%$.</p>\n\n<h3>6. Bayes' theorem: reversing the conditional</h3>\n<p>We often know $P(\\text{evidence} \\mid \\text{cause})$ but want $P(\\text{cause} \\mid \\text{evidence})$. Combining the multiplication rule with the law of total probability yields <strong>Bayes' theorem</strong>:</p>\n$$P(B_i \\mid A) = \\frac{P(A \\mid B_i)\\,P(B_i)}{\\sum_{j} P(A \\mid B_j)\\,P(B_j)}.$$\n<p>Read it as <em>posterior</em> $\\propto$ <em>likelihood</em> $\\times$ <em>prior</em>. The prior $P(B_i)$ is your belief before evidence; the likelihood $P(A \\mid B_i)$ says how well cause $B_i$ explains the evidence; the denominator just normalizes so the posteriors sum to 1. Continuing the bulb example: given a bulb is defective, the probability it came from Factory 2 is $\\frac{(0.05)(0.4)}{0.032} = \\frac{0.020}{0.032} = 0.625$ — even though Factory 2 supplies the minority of bulbs, it dominates the defectives.</p>\n\n<h3>7. The base-rate trap: why most positives can be false</h3>\n<p>Here is the example that breaks everyone's intuition. A disease afflicts $1$ in $1000$ people. A test is $99\\%$ accurate: it catches $99\\%$ of sick people (sensitivity) and gives a false positive for only $1\\%$ of healthy people. You test positive. What is the chance you are sick? Let $D$ = disease, $+$ = positive test. The prior is $P(D) = 0.001$. By the law of total probability,</p>\n$$P(+) = \\underbrace{(0.99)(0.001)}_{\\text{true positives}} + \\underbrace{(0.01)(0.999)}_{\\text{false positives}} = 0.00099 + 0.00999 = 0.01098.$$\n$$P(D \\mid +) = \\frac{0.00099}{0.01098} \\approx 0.090.$$\n<p>Only about <strong>9%</strong>. Despite the impressive-sounding \"99% accurate,\" a positive result is wrong over $90\\%$ of the time — because the healthy population is so vast that its $1\\%$ error rate produces ten times more false positives than there are true cases. This is <strong>base-rate neglect</strong>: ignore the prior and you will badly overestimate the posterior.</p>\n\n<h3>8. Tree diagrams and the visualization</h3>\n<p>A <strong>tree diagram</strong> makes these computations visceral. Branch first on the hidden cause (sick vs. healthy), labeling each branch with its prior; then branch on the evidence (test result), labeling with the likelihoods. Each leaf's probability is the product along its path (the multiplication rule), the law of total probability is the <em>sum</em> of leaves matching the evidence, and Bayes' theorem is the <em>ratio</em> of one favorable leaf to that sum. Try the interactive <strong>Bayes visualization</strong> in this course: drag the base rate and watch the posterior collapse — it shows, in real time, why a great test can still mislead when the disease is rare.</p>",
          "mcq": [
            {
              "q": "A fair die is rolled. Let $A = \\{\\text{outcome is } 2\\}$ and $B = \\{\\text{outcome is even}\\}$. What is $P(A \\mid B)$?",
              "choices": [
                "$\\frac{1}{6}$",
                "$\\frac{1}{3}$",
                "$\\frac{1}{2}$",
                "$\\frac{2}{3}$"
              ],
              "answer": 1,
              "explain": "$P(A \\cap B) = P(\\{2\\}) = 1/6$ and $P(B) = 3/6 = 1/2$, so $P(A\\mid B) = (1/6)/(1/2) = 1/3$. Conditioning on 'even' restricts the sample space to $\\{2,4,6\\}$, of which one is a 2."
            },
            {
              "q": "In the deck example, a card is drawn and a friend says 'it is black.' Why does the probability it is the ace of spades become $1/26$ rather than staying $1/52$?",
              "choices": [
                "The information changed which physical card is on top",
                "Conditioning discards the 26 red outcomes and renormalizes over the 26 black ones",
                "Black cards are intrinsically more likely to be aces",
                "The deck was reshuffled after the friend peeked"
              ],
              "answer": 1,
              "explain": "Conditioning on $B$ throws away the part of the sample space where $B$ is false (the 26 red cards) and renormalizes over the 26 black cards. The card itself did not change; only the information did."
            },
            {
              "q": "Which expression correctly rearranges the definition of conditional probability into the multiplication (chain) rule for $P(A \\cap B)$?",
              "choices": [
                "$P(A \\cap B) = P(A \\mid B)\\,P(B)$",
                "$P(A \\cap B) = P(A \\mid B) + P(B)$",
                "$P(A \\cap B) = \\frac{P(A \\mid B)}{P(B)}$",
                "$P(A \\cap B) = P(A \\mid B) \\, P(A)$"
              ],
              "answer": 0,
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
                "Disjoint events satisfy $P(A \\cap B) = P(A)P(B)$ automatically",
                "Disjoint events have $P(A \\cap B) = 0$, but $P(A)P(B) > 0$, so they cannot be independent",
                "Mutual exclusivity is the same as independence by definition",
                "Independence requires $P(A \\cup B) = 1$"
              ],
              "answer": 1,
              "explain": "For disjoint events $P(A\\cap B)=0$, yet if both have positive probability then $P(A)P(B)>0$, so $P(A\\cap B)\\ne P(A)P(B)$. In fact disjoint positive-probability events are strongly dependent: knowing $B$ happened guarantees $A$ did not."
            },
            {
              "q": "Bayes' theorem expresses $P(A \\mid B)$ in terms of $P(B \\mid A)$. Which form is correct?",
              "choices": [
                "$P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}$",
                "$P(A \\mid B) = \\frac{P(B \\mid A)\\,P(B)}{P(A)}$",
                "$P(A \\mid B) = \\frac{P(B \\mid A)}{P(A)\\,P(B)}$",
                "$P(A \\mid B) = P(B \\mid A)\\,\\frac{P(B)}{P(A)}$"
              ],
              "answer": 0,
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
                "Treating $P(D \\mid +)$ as equal to $P(+ \\mid D)$ while ignoring the prior $P(D)$",
                "Assuming the test is never wrong",
                "Multiplying instead of adding probabilities"
              ],
              "answer": 1,
              "explain": "The fallacy is conflating $P(D\\mid +)$ with $P(+\\mid D)$ and neglecting the low prior $P(D)$. Bayes' theorem shows the prior heavily discounts the posterior when the disease is rare."
            },
            {
              "q": "Using the law of total probability, if $\\{B_1, B_2\\}$ partition the sample space, then $P(A)$ equals:",
              "choices": [
                "$P(A \\mid B_1) + P(A \\mid B_2)$",
                "$P(A \\mid B_1)\\,P(B_1) + P(A \\mid B_2)\\,P(B_2)$",
                "$P(A \\mid B_1)\\,P(A \\mid B_2)$",
                "$\\frac{P(A \\mid B_1)}{P(B_1)} + \\frac{P(A \\mid B_2)}{P(B_2)}$"
              ],
              "answer": 1,
              "explain": "The law of total probability weights each conditional by the probability of its conditioning event: $P(A)=\\sum_i P(A\\mid B_i)P(B_i)$. Simply adding the conditionals (option 1) forgets the weights and can even exceed 1."
            },
            {
              "q": "It is true that $P(A \\mid B) = 0.9$. A student concludes $P(B \\mid A) = 0.9$ as well. What is the correct relationship?",
              "choices": [
                "$P(B \\mid A) = P(A \\mid B)$ always",
                "$P(B \\mid A) = P(A \\mid B)\\,\\frac{P(B)}{P(A)}$",
                "$P(B \\mid A) = 1 - P(A \\mid B)$",
                "$P(B \\mid A) = P(A \\mid B)\\,\\frac{P(A)}{P(B)}$"
              ],
              "answer": 1,
              "explain": "By Bayes, $P(B\\mid A) = P(A\\mid B)P(B)/P(A)$, so the two conditionals are equal only when $P(A)=P(B)$. Assuming $P(A\\mid B)=P(B\\mid A)$ is the 'confusion of the inverse,' the same error behind the base-rate fallacy."
            },
            {
              "q": "Suppose $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \\cap B) = 0.2$. Are $A$ and $B$ independent?",
              "choices": [
                "No, because $P(A \\cap B) \\ne P(A) + P(B)$",
                "Yes, because $P(A)P(B) = 0.2 = P(A \\cap B)$",
                "No, because $P(A) \\ne P(B)$",
                "Cannot be determined without $P(A \\cup B)$"
              ],
              "answer": 1,
              "explain": "Independence holds iff $P(A\\cap B)=P(A)P(B)$; here $0.5\\times 0.4 = 0.2$, which matches, so they are independent. Independence does not require equal marginal probabilities."
            },
            {
              "q": "You roll a fair die. Let $C = \\{\\text{outcome} \\le 3\\}$ and $D = \\{\\text{outcome is odd}\\}$. What is $P(D \\mid C)$?",
              "choices": [
                "$\\frac{1}{2}$",
                "$\\frac{1}{3}$",
                "$\\frac{2}{3}$",
                "$\\frac{1}{6}$"
              ],
              "answer": 2,
              "explain": "Conditioning on $C$ restricts the sample space to $\\{1,2,3\\}$, of which the odd outcomes are $\\{1,3\\}$, giving $2/3$. Equivalently $P(C\\cap D)=P(\\{1,3\\})=2/6$ and $P(C)=3/6$, so $(2/6)/(3/6)=2/3$."
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
            }
          ]
        },
        {
          "id": "ps-random-variables-distributions",
          "title": "Random Variables & Their Distributions",
          "minutes": 15,
          "content": "<h3>1. The idea: turning chance into numbers</h3>\n<p>Suppose you flip a coin twice. The raw outcomes live in a sample space $\\Omega = \\{HH, HT, TH, TT\\}$ — these are <em>events</em>, not numbers, and you cannot average a \"TH\". A <strong>random variable</strong> fixes this. It is simply a <strong>function that assigns a number to every outcome</strong>. If $X$ counts the number of heads, then $X(HH)=2$, $X(HT)=X(TH)=1$, $X(TT)=0$. The randomness lives in <em>which</em> outcome occurs; once it does, $X$ reads off a number deterministically.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A random variable is a measuring instrument pointed at the universe. The universe rolls the dice; the instrument turns the result into something you can add, average, and graph. The word \"variable\" is a little misleading — it is really a <strong>function</strong>, written $X : \\Omega \\to \\mathbb{R}$.</p>\n</div>\n<p>Formally, $X$ maps the sample space to the real line. We then talk about probabilities of <em>numeric</em> events like $\\{X = 1\\}$, which secretly means \"the set of outcomes $\\omega$ with $X(\\omega)=1$.\" Here $P(X=1) = P(\\{HT, TH\\}) = \\tfrac{2}{4} = \\tfrac12$.</p>\n\n<h3>2. Discrete vs. continuous</h3>\n<p>Random variables come in two flavors, distinguished by the set of values they can take.</p>\n<ul>\n<li>A <strong>discrete</strong> random variable takes values in a countable set — typically integers. Counts (heads, defects, customers) are discrete.</li>\n<li>A <strong>continuous</strong> random variable takes values in an interval of $\\mathbb{R}$, an uncountable continuum. Measurements (height, waiting time, voltage) are continuous.</li>\n</ul>\n<p>The split matters because <em>how we assign probability differs</em>: discrete variables put lumps of probability on individual points; continuous variables spread probability smoothly so that any single point has probability <strong>zero</strong>.</p>\n\n<h3>3. The probability mass function (PMF)</h3>\n<p>For a discrete $X$, the <strong>probability mass function</strong> is $p_X(x) = P(X = x)$ — the probability piled on each value. It must satisfy two properties:</p>\n<ul>\n<li><strong>Nonnegativity:</strong> $p_X(x) \\ge 0$ for all $x$.</li>\n<li><strong>Normalization:</strong> $\\sum_x p_X(x) = 1$ — all the mass sums to one.</li>\n</ul>\n<p><strong>Fair die.</strong> Let $X$ be the face shown. Then $p_X(x) = \\tfrac16$ for $x \\in \\{1,2,3,4,5,6\\}$ and $0$ otherwise. Check: $6 \\times \\tfrac16 = 1$. The probability of rolling at most $2$ is $p_X(1)+p_X(2) = \\tfrac16+\\tfrac16 = \\tfrac13$.</p>\n<p><strong>Bernoulli.</strong> A single yes/no trial with success probability $p$ gives $X \\in \\{0,1\\}$ with $p_X(1)=p$ and $p_X(0)=1-p$. Its mean is $\\mathbb{E}[X] = 0\\cdot(1-p) + 1\\cdot p = p$ and its variance is $\\text{Var}(X) = p(1-p)$.</p>\n\n<h3>4. The probability density function (PDF): probability is area</h3>\n<p>For continuous $X$ we cannot list $P(X=x)$ — every such probability is $0$. Instead we use a <strong>probability density function</strong> $f_X(x)$, where probability is the <em>area under the curve</em>:</p>\n$$P(a \\le X \\le b) = \\int_a^b f_X(x)\\,dx.$$\n<p>The density itself is not a probability (it can exceed $1$); only areas are. It must satisfy:</p>\n<ul>\n<li><strong>Nonnegativity:</strong> $f_X(x) \\ge 0$.</li>\n<li><strong>Total area one:</strong> $\\displaystyle\\int_{-\\infty}^{\\infty} f_X(x)\\,dx = 1$.</li>\n</ul>\n<p>Because a single point has zero width, $P(X=a)=0$, and consequently the endpoints do not matter: $P(a \\le X \\le b) = P(a < X < b)$.</p>\n<p><strong>Uniform on $[0,1]$.</strong> Here $f_X(x) = 1$ for $0 \\le x \\le 1$ and $0$ elsewhere. The area is $1 \\times 1 = 1$, good. Then $P(0.2 \\le X \\le 0.5) = \\int_{0.2}^{0.5} 1\\,dx = 0.3$. On a general interval $[\\alpha,\\beta]$ the uniform density is the constant $\\tfrac{1}{\\beta-\\alpha}$.</p>\n\n<h3>5. The cumulative distribution function (CDF)</h3>\n<p>One object describes <em>both</em> types: the <strong>cumulative distribution function</strong></p>\n$$F_X(x) = P(X \\le x).$$\n<p>It accumulates probability from the left. Its universal properties are:</p>\n<ul>\n<li><strong>Monotone nondecreasing</strong>: if $a \\le b$ then $F_X(a) \\le F_X(b)$.</li>\n<li><strong>Limits</strong>: $F_X(-\\infty)=0$ and $F_X(+\\infty)=1$.</li>\n<li><strong>Right-continuous</strong> everywhere.</li>\n</ul>\n<p>For discrete $X$ the CDF is a <strong>staircase</strong> that jumps by $p_X(x)$ at each value. For the fair die, $F_X(3) = P(X\\le 3) = \\tfrac36 = \\tfrac12$. For continuous $X$ the CDF is smooth and $F_X'(x) = f_X(x)$ — the density is the slope of the CDF. For the uniform on $[0,1]$, $F_X(x)=x$ on $[0,1]$, a straight ramp from $0$ to $1$.</p>\n\n<h3>6. Reading probabilities off a distribution</h3>\n<p>The CDF turns probability questions into subtraction. For <em>any</em> random variable,</p>\n$$P(a < X \\le b) = F_X(b) - F_X(a).$$\n<p>For the uniform on $[0,1]$, $P(0.2 < X \\le 0.5) = F_X(0.5) - F_X(0.2) = 0.5 - 0.2 = 0.3$, matching the area we integrated. To get a tail, complement: $P(X > a) = 1 - F_X(a)$. These three moves — accumulate, subtract, complement — answer almost every elementary distribution question.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Big picture</div>\n<p>The PMF/PDF and the CDF are two views of the same information: one is the \"local\" weight at or near a point, the other is the \"running total.\" Differentiate the CDF to recover the density; integrate (or sum) the density to recover the CDF. Mastering this translation is the foundation for every named distribution you will meet next.</p>\n</div>",
          "mcq": [
            {
              "q": "A random variable $X$ is best described as which of the following?",
              "choices": [
                "A function $X:\\Omega\\to\\mathbb{R}$ that assigns a real number to each outcome",
                "A numerical value chosen at random from $\\mathbb{R}$ each time you look at it",
                "A probability between 0 and 1 attached to an event",
                "A subset of the sample space $\\Omega$"
              ],
              "answer": 0,
              "explain": "Despite its name, a random variable is a deterministic function from the sample space to the reals; the randomness is in which outcome occurs. It is not itself a probability (choice 2) nor an event/subset (choice 3)."
            },
            {
              "q": "For the two-coin-flip example with $X$ counting heads, the notation $\\{X=1\\}$ formally denotes which object?",
              "choices": [
                "The number 1",
                "The probability $\\tfrac12$",
                "The set of outcomes $\\{\\omega : X(\\omega)=1\\} = \\{HT, TH\\}$",
                "The function value $X(HT)$"
              ],
              "answer": 2,
              "explain": "A numeric event like $\\{X=1\\}$ is shorthand for the set of sample-space outcomes that $X$ maps to 1, here $\\{HT,TH\\}$. Its probability is $\\tfrac12$, but the event itself is the set, not the number or the probability."
            },
            {
              "q": "Which of these random variables is continuous rather than discrete?",
              "choices": [
                "The number of defective items in a shipment of 100",
                "The exact time in seconds until the next customer arrives",
                "The face shown on a rolled die",
                "The number of heads in ten coin flips"
              ],
              "answer": 1,
              "explain": "A waiting time can take any value in an interval of $\\mathbb{R}$, an uncountable continuum, so it is continuous. The other three are counts taking values in a countable (integer) set, hence discrete."
            },
            {
              "q": "A friend claims a function $f$ with $f(x)=2$ on $[0,0.5]$ and $f(x)=0$ elsewhere cannot be a valid PDF because $f(x)=2>1$. What is the correct response?",
              "choices": [
                "They are right; a PDF can never exceed 1 anywhere",
                "They are wrong; a density is not a probability, and here the area is $2\\times 0.5 = 1$, so it is valid",
                "They are right; densities must lie in $[0,1]$ just like probabilities",
                "They are wrong, but only because $f$ should equal exactly 1 on its support"
              ],
              "answer": 1,
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
                "Always exactly 0",
                "$F_X(a)$, the CDF at $a$",
                "It depends on how peaked the density is at $a$"
              ],
              "answer": 1,
              "explain": "A single point has zero width, so $\\int_a^a f_X(x)\\,dx = 0$; hence $P(X=a)=0$ for every $a$, regardless of the density's value or shape there. The density $f_X(a)$ is not a probability."
            },
            {
              "q": "$X$ is uniform on $[0,10]$. What is $P(3 \\le X \\le 7)$?",
              "choices": [
                "$0.7$",
                "$0.3$",
                "$0.4$",
                "$0.5$"
              ],
              "answer": 2,
              "explain": "The uniform density on $[0,10]$ is $\\tfrac{1}{10}$, so $P(3\\le X\\le 7)=\\int_3^7 \\tfrac{1}{10}\\,dx = \\tfrac{7-3}{10}=0.4$. Equivalently $F_X(7)-F_X(3)=0.7-0.3$."
            },
            {
              "q": "Which property is NOT guaranteed for the CDF $F_X(x)=P(X\\le x)$ of a general random variable?",
              "choices": [
                "$F_X$ is nondecreasing",
                "$F_X(-\\infty)=0$ and $F_X(+\\infty)=1$",
                "$F_X$ is continuous (no jumps) everywhere",
                "$F_X$ is right-continuous everywhere"
              ],
              "answer": 2,
              "explain": "Every CDF is nondecreasing, has the correct limits, and is right-continuous, but it need not be continuous: a discrete random variable's CDF is a staircase with jumps. Right-continuity (choice 4) always holds, but full continuity (choice 3) does not."
            },
            {
              "q": "A continuous random variable has CDF $F_X(x)=x^2$ for $0\\le x\\le 1$ (and 0 below, 1 above). What is its density $f_X(x)$ on $(0,1)$?",
              "choices": [
                "$2x$",
                "$x^2$",
                "$\\tfrac{x^3}{3}$",
                "$x$"
              ],
              "answer": 0,
              "explain": "For a continuous variable the density is the derivative of the CDF: $f_X(x)=F_X'(x)=\\tfrac{d}{dx}x^2=2x$. Differentiating, not integrating, recovers the density from the CDF."
            },
            {
              "q": "For the fair-die variable $X$ with $F_X$ the staircase CDF, which expression correctly gives $P(2 \\le X \\le 4)$ using the CDF?",
              "choices": [
                "$F_X(4)-F_X(2)$",
                "$F_X(4)-F_X(1)$",
                "$F_X(4)-F_X(3)$",
                "$F_X(2)-F_X(4)$"
              ],
              "answer": 1,
              "explain": "To include the value 2, you must subtract $F_X$ evaluated just below 2, which for an integer-valued variable is $F_X(1)$: $P(2\\le X\\le 4)=F_X(4)-F_X(1)=\\tfrac46-\\tfrac16=\\tfrac36$. Using $F_X(4)-F_X(2)$ wrongly drops the mass at $x=2$."
            },
            {
              "q": "A Bernoulli($p$) variable has $P(X=1)=p$ and $P(X=0)=1-p$. Using $X^2=X$, what is $\\mathbb{E}[X^2]$?",
              "choices": [
                "$p^2$",
                "$p(1-p)$",
                "$p$",
                "$1-p$"
              ],
              "answer": 2,
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
            }
          ]
        },
        {
          "id": "ps-expectation-variance",
          "title": "Expectation, Variance & the Shape of a Distribution",
          "minutes": 15,
          "content": "<h3>1. The center of mass of randomness</h3>\n<p>Imagine spinning a roulette of outcomes thousands of times and writing down the value each time. If you average those numbers, the average <em>settles down</em> to a single, predictable figure. That figure is the <strong>expected value</strong> $\\mathbb{E}[X]$ — not a value you necessarily ever observe, but the <strong>long-run average</strong> and the <strong>balance point</strong> of the distribution. Place the probability mass of $X$ on a weightless ruler; $\\mathbb{E}[X]$ is where it balances.</p>\n<p>For a <strong>discrete</strong> random variable taking values $x_i$ with probabilities $p_i = \\mathbb{P}(X = x_i)$,</p>\n$$\\mathbb{E}[X] = \\sum_i x_i \\, p_i.$$\n<p>For a <strong>continuous</strong> variable with probability density $f(x)$, sums become integrals:</p>\n$$\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\, f(x)\\,dx.$$\n<p><strong>Numeric example.</strong> Roll one fair die, $X \\in \\{1,\\dots,6\\}$ each with probability $\\tfrac16$. Then $\\mathbb{E}[X] = \\tfrac16(1+2+3+4+5+6) = \\tfrac{21}{6} = 3.5$. The mean is $3.5$ even though no face shows $3.5$ — the balance point need not be attainable.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>$\\mathbb{E}[X]$ is a <em>weighted</em> average: each possible value pulls on the balance point with force equal to its probability. Rare values contribute little; likely values dominate. This is the physicist's center of mass with mass replaced by probability.</p>\n</div>\n\n<h3>2. Linearity of expectation</h3>\n<p>The single most useful property in all of probability: expectation is <strong>linear</strong>. For any random variables $X, Y$ and constants $a, b$,</p>\n$$\\mathbb{E}[aX + bY] = a\\,\\mathbb{E}[X] + b\\,\\mathbb{E}[Y].$$\n<p>The remarkable part is the fine print: <strong>this holds even when $X$ and $Y$ are dependent</strong>. No independence assumption is needed. You can split the expectation of a sum into a sum of expectations no matter how tangled the variables are.</p>\n<p><strong>Example.</strong> Sum of two dice, $S = X_1 + X_2$. Even though we could enumerate all 36 outcomes, linearity gives the answer instantly: $\\mathbb{E}[S] = \\mathbb{E}[X_1] + \\mathbb{E}[X_2] = 3.5 + 3.5 = 7$. The same trick scales effortlessly: the expected sum of $100$ dice is $350$, computed without touching a single joint distribution.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Mini-batch training relies on linearity: the expected gradient over a batch equals the average of per-example expected gradients, so a small random batch is an unbiased estimate of the full-data gradient. Linearity is what makes stochastic gradient descent <em>correct in expectation</em>.</p>\n</div>\n\n<h3>3. The Law of the Unconscious Statistician</h3>\n<p>Often we want the expectation not of $X$ but of some transformation $g(X)$ — say $X^2$ or $e^X$. You might think you must first find the distribution of $g(X)$. You do not. The <strong>Law of the Unconscious Statistician (LOTUS)</strong> says you can reuse the distribution of $X$ directly:</p>\n$$\\mathbb{E}[g(X)] = \\sum_i g(x_i)\\,p_i \\quad\\text{(discrete)}, \\qquad \\mathbb{E}[g(X)] = \\int_{-\\infty}^{\\infty} g(x)\\,f(x)\\,dx \\quad\\text{(continuous)}.$$\n<p>Just push every value through $g$ and weight by the <em>original</em> probabilities. For our die, $\\mathbb{E}[X^2] = \\tfrac16(1+4+9+16+25+36) = \\tfrac{91}{6} \\approx 15.17$. Note this is <em>not</em> $(\\mathbb{E}[X])^2 = 12.25$; in general $\\mathbb{E}[g(X)] \\ne g(\\mathbb{E}[X])$ unless $g$ is linear.</p>\n\n<h3>4. Variance: how far things spread</h3>\n<p>The mean tells you <em>where</em> a distribution sits, not <em>how spread out</em> it is. A bet paying $\\$0$ or $\\$100$ on a coin flip and a guaranteed $\\$50$ both have mean $50$, but they feel utterly different. <strong>Variance</strong> measures spread as the expected squared distance from the mean $\\mu = \\mathbb{E}[X]$:</p>\n$$\\text{Var}(X) = \\mathbb{E}\\big[(X-\\mu)^2\\big].$$\n<p>Squaring keeps deviations positive and punishes large excursions heavily. Expanding the square and using linearity gives the indispensable <strong>computational formula</strong>:</p>\n$$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2.$$\n<p>For our die: $\\text{Var}(X) = \\tfrac{91}{6} - 3.5^2 = 15.1\\overline{6} - 12.25 = 2.91\\overline{6} = \\tfrac{35}{12}$. Because variance is in squared units (dollars-squared, say), we usually report the <strong>standard deviation</strong> $\\sigma = \\sqrt{\\text{Var}(X)}$, here $\\sigma = \\sqrt{35/12} \\approx 1.71$ — a spread in the same units as $X$ itself. Variance is always $\\ge 0$, and equals $0$ exactly when $X$ is a constant.</p>\n\n<h3>5. How variance reacts to shifts and scales</h3>\n<p>Suppose you transform $X$ linearly into $aX + b$. Shifting by $b$ slides the whole distribution sideways — it moves the center but changes <em>nothing</em> about spread. Scaling by $a$ stretches deviations by $a$, so squared deviations stretch by $a^2$:</p>\n$$\\text{Var}(aX + b) = a^2\\,\\text{Var}(X), \\qquad \\sigma(aX+b) = |a|\\,\\sigma(X).$$\n<p>The additive constant $b$ vanishes; only the multiplier survives, and it comes out <em>squared</em>. Converting Celsius to Fahrenheit, $F = 1.8C + 32$, multiplies the standard deviation of temperatures by $1.8$ and the variance by $1.8^2 = 3.24$, while the $+32$ does nothing to the spread.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Mean is a <em>linear</em> functional (constants pass through additively); variance is <em>quadratic</em> (constants pass through squared, shifts disappear). This split — first moment linear, second central moment quadratic — echoes throughout statistics, from error bars to the bias-variance decomposition.</p>\n</div>\n\n<h3>6. A word on skew</h3>\n<p>Mean and variance fix the center and width but not the <strong>shape</strong>. A distribution is <strong>symmetric</strong> if it mirrors around its mean, where mean and median coincide. When a long tail stretches to the right (a few very large values), we call it <strong>right-skewed</strong> (positive skew) — incomes are the classic case, with the mean dragged above the median by the wealthy few. A long left tail is <strong>left-skewed</strong>. Skew, formally a normalized third central moment $\\mathbb{E}[(X-\\mu)^3]/\\sigma^3$, is the next layer of detail after center and spread: it tells you <em>which way the surprises lean</em>.</p>\n<p>Together, $\\mathbb{E}[X]$ (where), $\\sigma$ (how wide), and skew (which way) give a compact, powerful sketch of any distribution before you ever draw it.</p>",
          "mcq": [
            {
              "q": "A fair six-sided die has $\\mathbb{E}[X] = 3.5$. A player wins \\$2 for each pip showing. By linearity of expectation, what is the expected winnings $\\mathbb{E}[2X]$?",
              "choices": [
                "\\$3.5",
                "\\$7",
                "\\$12",
                "\\$21"
              ],
              "answer": 1,
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
                "Because $\\mathbb{E}[X]$ is the balance point of the probability mass, which need not coincide with any single outcome",
                "Because the formula for $\\mathbb{E}[X]$ contains a rounding error",
                "Because $\\mathbb{E}[X]$ is really the median, not the mean",
                "Because probabilities do not have to sum to $1$"
              ],
              "answer": 0,
              "explain": "$\\mathbb{E}[X]$ is the center of mass of the distribution; like balancing a ruler, the balance point can fall between the weighted points and need not be an attainable outcome (e.g. $3.5$ for a die)."
            },
            {
              "q": "A continuous random variable has density $f(x) = 2x$ for $x \\in [0,1]$ and $0$ elsewhere. What is $\\mathbb{E}[X] = \\int_0^1 x \\cdot 2x\\,dx$?",
              "choices": [
                "$\\tfrac12$",
                "$1$",
                "$\\tfrac23$",
                "$\\tfrac13$"
              ],
              "answer": 2,
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
                "They must have equal variance since the means are equal",
                "A has the larger variance",
                "B has the larger variance",
                "Variance cannot be compared without knowing the medians"
              ],
              "answer": 2,
              "explain": "Variance measures average squared spread about the mean; B's mass sits far from $0$, producing large squared deviations and thus larger variance. Equal means say nothing about spread."
            },
            {
              "q": "For a fair die with $\\mathbb{E}[X]=3.5$, a common error is to compute variance as $\\mathbb{E}[X]^2 = 3.5^2 = 12.25$. Why is this wrong as a formula for $\\mathrm{Var}(X)$?",
              "choices": [
                "Variance is $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$, not $(\\mathbb{E}[X])^2$",
                "Variance equals $\\mathbb{E}[X]$ for any distribution",
                "$3.5^2$ should be computed as $7$",
                "Variance is always negative for a die"
              ],
              "answer": 0,
              "explain": "Variance is $\\mathrm{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$; squaring the mean alone ignores $\\mathbb{E}[X^2]$. The two quantities differ because $\\mathbb{E}[X^2] \\ge (\\mathbb{E}[X])^2$ by Jensen's inequality."
            },
            {
              "q": "A constant $c$ is added to every outcome of $X$. How do the mean and variance change?",
              "choices": [
                "Mean increases by $c$; variance increases by $c$",
                "Mean increases by $c$; variance is unchanged",
                "Mean is unchanged; variance increases by $c^2$",
                "Both mean and variance are unchanged"
              ],
              "answer": 1,
              "explain": "Shifting all values by $c$ slides the balance point: $\\mathbb{E}[X+c]=\\mathbb{E}[X]+c$. But spread about the (also shifted) mean is identical, so $\\mathrm{Var}(X+c)=\\mathrm{Var}(X)$."
            },
            {
              "q": "A random variable $X$ is scaled to $Y = 3X$. If $\\mathrm{Var}(X) = 4$, what is $\\mathrm{Var}(Y)$?",
              "choices": [
                "$12$",
                "$7$",
                "$36$",
                "$4$"
              ],
              "answer": 2,
              "explain": "Variance scales by the square of the multiplier: $\\mathrm{Var}(3X) = 3^2\\,\\mathrm{Var}(X) = 9 \\cdot 4 = 36$. The tempting $12 = 3\\cdot 4$ forgets that deviations are squared inside the variance."
            },
            {
              "q": "Standard deviation is defined as $\\sigma = \\sqrt{\\mathrm{Var}(X)}$. Why is $\\sigma$ often preferred over variance when reporting spread?",
              "choices": [
                "Because $\\sigma$ is always smaller than the variance",
                "Because $\\sigma$ has the same units as $X$, making it directly interpretable",
                "Because $\\sigma$ ignores the mean entirely",
                "Because variance can be negative but $\\sigma$ cannot"
              ],
              "answer": 1,
              "explain": "Squaring deviations gives variance units of $X$ squared; taking the square root restores the original units, so $\\sigma$ is comparable to the values of $X$ itself. Variance is never negative, so that is not the reason."
            },
            {
              "q": "A right-skewed distribution (a long tail to the right, e.g. household incomes) typically has which ordering of its mean and median?",
              "choices": [
                "Mean $>$ median, because the long right tail pulls the balance point up",
                "Mean $<$ median, because the tail lowers the average",
                "Mean $=$ median, because skew does not affect either",
                "Mean $=$ mode, regardless of skew"
              ],
              "answer": 0,
              "explain": "The mean is the balance point and is dragged toward the long tail, so for right skew the mean exceeds the median. The median, a positional middle, resists the tail's pull."
            },
            {
              "q": "Suppose $\\mathbb{E}[X] = 5$ for some random variable. Which conclusion is justified?",
              "choices": [
                "At least half of all observations of $X$ equal $5$",
                "Over many independent trials, the sample average of $X$ tends toward $5$",
                "The single most likely value of $X$ is $5$",
                "Every observed value of $X$ lies within a small range around $5$"
              ],
              "answer": 1,
              "explain": "$\\mathbb{E}[X]$ is the long-run average: across many trials the running mean settles toward $5$. It is neither the median, the mode, nor a guarantee about any individual observation's proximity to the mean."
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
          "content": "<h3>1. The hook: counting your way through luck</h3>\n<p>You flip a fair coin 10 times. How many heads will you see? Not exactly 5 — sometimes 4, sometimes 7, occasionally even 0. But there is a precise, knowable <em>pattern</em> behind that scatter. The <strong>Binomial distribution</strong> is the mathematics of that pattern: it answers \"how many successes in $n$ repeated yes/no attempts?\" Before we can count many trials, though, we must master one. That single trial is the <strong>Bernoulli</strong> — the atom from which the binomial molecule is built.</p>\n\n<h3>2. The Bernoulli trial: a single yes/no</h3>\n<p>A <strong>Bernoulli trial</strong> is an experiment with exactly two outcomes, conventionally labeled <em>success</em> (coded $1$) and <em>failure</em> (coded $0$). Let $p$ be the probability of success, so failure has probability $1-p$. A random variable $X \\in \\{0,1\\}$ with $P(X=1)=p$ and $P(X=0)=1-p$ is <strong>Bernoulli($p$)</strong>.</p>\n<p>Its moments are quick to derive. The mean is\n$$\\mathbb{E}[X] = 1\\cdot p + 0\\cdot(1-p) = p.$$\nBecause $X^2 = X$ (since $0^2=0$ and $1^2=1$), we get $\\mathbb{E}[X^2]=p$, so the variance is\n$$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = p - p^2 = p(1-p).$$\nNotice variance is largest at $p=0.5$ (maximum uncertainty, value $0.25$) and shrinks to $0$ as $p\\to 0$ or $p\\to 1$ (near-certain outcomes carry little surprise).</p>\n\n<h3>3. From one trial to many: defining the Binomial</h3>\n<p>Now run $n$ <em>independent</em> Bernoulli($p$) trials and add up the successes. Let $X_1,\\dots,X_n$ be those indicators and define\n$$X = X_1 + X_2 + \\cdots + X_n.$$\nThen $X$ counts total successes and is called <strong>Binomial($n,p$)</strong>, written $X \\sim \\text{Bin}(n,p)$. The Bernoulli is just the special case $n=1$.</p>\n\n<h3>4. The PMF: why the binomial coefficient appears</h3>\n<p>What is $P(X=k)$, the probability of exactly $k$ successes? Any <em>one specific</em> sequence with $k$ successes and $n-k$ failures — say SSF...F — has probability $p^k(1-p)^{n-k}$ by independence (multiply the per-trial probabilities). But many distinct sequences yield $k$ successes; we must count them. The number of ways to choose <em>which</em> $k$ of the $n$ positions are successes is the <strong>binomial coefficient</strong>\n$$\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}.$$\nSumming the equal probability over all these arrangements gives the <strong>Binomial PMF</strong>:\n$$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\qquad k = 0,1,\\dots,n.$$\nThese probabilities sum to $1$ by the binomial theorem: $\\sum_{k=0}^{n}\\binom{n}{k}p^k(1-p)^{n-k} = (p + (1-p))^n = 1$.</p>\n\n<h3>5. Mean and variance via linearity</h3>\n<p>You could grind out $\\mathbb{E}[X]=\\sum_k k\\binom{n}{k}p^k(1-p)^{n-k}$ — but the indicator decomposition makes it effortless. <strong>Linearity of expectation</strong> needs no independence:\n$$\\mathbb{E}[X] = \\sum_{i=1}^{n}\\mathbb{E}[X_i] = \\sum_{i=1}^{n} p = np.$$\nVariance <em>does</em> use independence (cross-covariances vanish), so variances add:\n$$\\text{Var}(X) = \\sum_{i=1}^{n}\\text{Var}(X_i) = \\sum_{i=1}^{n} p(1-p) = np(1-p).$$\nThe standard deviation is $\\sigma = \\sqrt{np(1-p)}$.</p>\n\n<h3>6. Worked example: heads in 10 flips</h3>\n<p>Let $X \\sim \\text{Bin}(10, 0.5)$ count heads in 10 fair flips. Then $\\mathbb{E}[X] = 10(0.5) = 5$ and $\\text{Var}(X) = 10(0.5)(0.5) = 2.5$, so $\\sigma \\approx 1.58$. The chance of exactly 7 heads is\n$$P(X=7) = \\binom{10}{7}(0.5)^7(0.5)^3 = 120 \\cdot (0.5)^{10} = \\frac{120}{1024} \\approx 0.117.$$\nSo roughly an 11.7% chance. By symmetry this equals $P(X=3)$. It is rarer than exactly 4 heads, $P(X=4)=\\binom{10}{4}/1024 = 210/1024 \\approx 0.205$, and rarer still than the symmetric peak at 5, $P(X=5)=252/1024 \\approx 0.246$ — values farther from the center are less likely.</p>\n\n<h3>7. When does the Binomial model apply?</h3>\n<p>Check the <strong>BINS</strong> conditions before reaching for $\\text{Bin}(n,p)$:</p>\n<ul>\n<li><strong>Binary</strong> — each trial has two outcomes (success/failure).</li>\n<li><strong>Independent</strong> — trials do not influence one another.</li>\n<li><strong>Number fixed</strong> — $n$ is decided in advance, not random.</li>\n<li><strong>Same $p$</strong> — the success probability is identical every trial.</li>\n</ul>\n<p>Flipping a coin 20 times fits perfectly. Drawing 5 cards <em>without replacement</em> does <em>not</em> — the probabilities shift each draw (dependence), which calls for the hypergeometric distribution instead. Sampling a few items from a huge factory batch is approximately binomial because removing one item barely changes $p$.</p>",
          "mcq": [
            {
              "q": "For a Bernoulli($p$) variable, at which value of $p$ is the variance $p(1-p)$ largest, and what is that maximum?",
              "choices": [
                "At $p=1$, where the variance equals $1$",
                "At $p=0.5$, where the variance equals $0.25$",
                "At $p=0$, where the variance equals $0$",
                "At $p=0.5$, where the variance equals $0.5$"
              ],
              "answer": 1,
              "explain": "The parabola $p(1-p)$ peaks at $p=0.5$ with value $0.5\\cdot0.5=0.25$ — maximum uncertainty. The tempting $0.5$ confuses the maximizing $p$ with the maximum value itself."
            },
            {
              "q": "A student writes that for $X\\sim\\text{Bin}(n,p)$ the variance is $\\sqrt{np(1-p)}$. What did they get wrong?",
              "choices": [
                "Nothing — that is the correct variance",
                "$\\sqrt{np(1-p)}$ is the standard deviation; the variance is $np(1-p)$",
                "The variance is $np$, the same as the mean",
                "The variance is $np(1-p)^2$ because failures are squared"
              ],
              "answer": 1,
              "explain": "Variance is $np(1-p)$; taking its square root gives the standard deviation $\\sigma=\\sqrt{np(1-p)}$. Mean equals variance only for the Poisson, not the binomial."
            },
            {
              "q": "You draw 5 cards from a standard 52-card deck without replacement and count the aces. Why is the count NOT Binomial?",
              "choices": [
                "The number of trials is not fixed in advance",
                "Each draw has more than two outcomes",
                "The success probability $p$ changes from draw to draw, violating independence and constant $p$",
                "The mean would be negative"
              ],
              "answer": 2,
              "explain": "Without replacement, removing a card alters the remaining composition, so $p$ shifts each draw and trials are dependent — that breaks the I and S of BINS, calling for the hypergeometric. $n=5$ is fixed and outcomes are binary (ace / not ace), so those are fine."
            },
            {
              "q": "Let $X\\sim\\text{Bin}(10,0.5)$. Using the symmetry of the distribution, what is $P(X\\ge 4)+P(X\\le 6)$ worth relative to $1$?",
              "choices": [
                "It equals $1$, since the events partition the sample space",
                "It exceeds $1$, because the events overlap on $4\\le X\\le 6$",
                "It is less than $1$, because the tails are excluded",
                "It cannot be computed without the full PMF"
              ],
              "answer": 1,
              "explain": "The two events overlap on $\\{4,5,6\\}$, so their probabilities double-count that middle region; the sum is therefore greater than $1$. They do not partition the space, so the answer is not $1$."
            },
            {
              "q": "Two independent counts $X\\sim\\text{Bin}(3,0.4)$ and $Y\\sim\\text{Bin}(5,0.4)$ are added. What is the distribution and mean of $X+Y$?",
              "choices": [
                "$\\text{Bin}(8,0.4)$ with mean $3.2$",
                "$\\text{Bin}(15,0.4)$ with mean $6$",
                "$\\text{Bin}(8,0.8)$ with mean $6.4$",
                "Not binomial, because two binomials never add to a binomial"
              ],
              "answer": 0,
              "explain": "Independent binomials with the SAME $p$ add by pooling trials: $\\text{Bin}(n_1+n_2,p)=\\text{Bin}(8,0.4)$, mean $8(0.4)=3.2$. The $p$ values do not add, and $n$ is $3+5=8$, not $3\\times5$."
            },
            {
              "q": "A factory makes items that are defective independently with probability $p=0.02$; a batch has $n=100$ items. What are the mean and standard deviation of the number of defectives?",
              "choices": [
                "Mean $2$, standard deviation $1.96$",
                "Mean $2$, standard deviation $1.4$",
                "Mean $0.02$, standard deviation $0.14$",
                "Mean $98$, standard deviation $1.4$"
              ],
              "answer": 1,
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
                "The next flip's probability of heads rises to compensate, but only slightly",
                "The flips are not really independent, so the bet is justified"
              ],
              "answer": 1,
              "explain": "Independence means the coin has no memory: $P(\\text{heads})=0.5$ regardless of history. The 'due' belief is the gambler's fallacy — long-run frequency convergence does not require short-run compensation."
            },
            {
              "q": "Let $X\\sim\\text{Bin}(9,0.5)$. Because $(n+1)p=10\\cdot0.5=5$ is an integer, what is true about the most likely value(s) of $X$?",
              "choices": [
                "There is a unique mode at $k=5$",
                "There are two equally likely modes, at $k=4$ and $k=5$",
                "Every value is equally likely since $p=0.5$",
                "The mode is the mean, $4.5$, which $X$ can attain"
              ],
              "answer": 1,
              "explain": "When $(n+1)p$ is an integer, the PMF ties at $k=(n+1)p-1$ and $k=(n+1)p$, here $k=4$ and $k=5$ (each $\\approx0.246$). The mean $4.5$ is not an attainable value of an integer-valued $X$."
            },
            {
              "q": "Two independent Bernoulli($p$) indicators $X_1,X_2$ are added. For their sum $S=X_1+X_2$, what is $P(S=1)$?",
              "choices": [
                "$p^2$",
                "$2p(1-p)$",
                "$p(1-p)$",
                "$2p$"
              ],
              "answer": 1,
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
                "It falls (from $2.5$ to $0.9$), because outcomes are more predictable near $p=1$",
                "It stays at $2.5$, since variance depends only on $n$",
                "It becomes negative, reflecting the bias"
              ],
              "answer": 1,
              "explain": "Variance $np(1-p)$ is maximal at $p=0.5$ ($10\\cdot0.25=2.5$) and shrinks toward the extremes: at $p=0.9$ it is $10(0.9)(0.1)=0.9$. A near-certain outcome carries little uncertainty, so the spread drops; variance can never be negative."
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
            }
          ]
        },
        {
          "id": "ps-poisson",
          "title": "The Poisson Distribution",
          "minutes": 14,
          "content": "<p><em>Imagine you run a small bakery. On a quiet Tuesday afternoon, customers wander in seemingly at random — sometimes three in a minute, sometimes none for five minutes. You can't predict <strong>when</strong> the next one arrives, but over a whole afternoon you average about 6 customers per hour. How many customers should you expect in the next 20 minutes? What's the chance that <em>nobody</em> shows up? The Poisson distribution is the mathematical machine built precisely for counting rare, independent events over a fixed window.</em></p>\n\n<h3>1. The intuition: counting random arrivals</h3>\n<p>Many real situations involve <strong>counting how many times something happens</strong> in a fixed interval of time, space, or volume, where each occurrence is independent and the average rate is steady:</p>\n<ul>\n<li>Phone calls reaching a help desk in an hour</li>\n<li>Typos (defects) on a printed page</li>\n<li>Radioactive decays detected per second</li>\n<li>Emails arriving in your inbox per minute</li>\n</ul>\n<p>The key features are: events are <strong>rare in any tiny slice</strong> of the interval, they occur <strong>independently</strong>, and they happen at a <strong>constant average rate</strong>. If a single number $\\lambda$ (the expected count) captures the average, the Poisson distribution tells you the full probability of seeing exactly $0, 1, 2, \\dots$ events.</p>\n\n<h3>2. The formula (PMF)</h3>\n<p>A random variable $X$ follows a <strong>Poisson distribution</strong> with parameter $\\lambda > 0$, written $X \\sim \\text{Poisson}(\\lambda)$, if for $k = 0, 1, 2, \\dots$:</p>\n$$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$$\n<p>Here $\\lambda$ is the <strong>average number of events</strong> in the interval, $e \\approx 2.71828$, and $k!$ is the factorial. The factor $e^{-\\lambda}$ is exactly what makes the probabilities sum to 1, because the Taylor series gives $\\sum_{k=0}^{\\infty} \\frac{\\lambda^k}{k!} = e^{\\lambda}$, so $\\sum_k P(X=k) = e^{-\\lambda} e^{\\lambda} = 1$.</p>\n<p><em>Quick numeric check.</em> With $\\lambda = 2$, the chance of seeing exactly $k=3$ events is $P(X=3) = \\frac{2^3 e^{-2}}{3!} = \\frac{8 \\cdot 0.1353}{6} \\approx 0.180$ — about an 18% chance.</p>\n\n<h3>3. The striking fact: mean = variance = λ</h3>\n<p>The single parameter $\\lambda$ plays a double role: it is <strong>both the mean and the variance</strong>:</p>\n$$\\mathbb{E}[X] = \\lambda, \\qquad \\text{Var}(X) = \\lambda$$\n<p>This is unusual and useful. It means the standard deviation is $\\sigma = \\sqrt{\\lambda}$. As $\\lambda$ grows, the absolute spread $\\sqrt{\\lambda}$ grows but the <em>relative</em> spread $\\sqrt{\\lambda}/\\lambda = 1/\\sqrt{\\lambda}$ shrinks — busy systems are proportionally more predictable. Practically, the equality is a diagnostic: if your count data has variance much larger than its mean (<em>overdispersion</em>), a plain Poisson model is probably wrong.</p>\n\n<h3>4. Poisson as the limit of the Binomial (law of rare events)</h3>\n<p>Where does $e^{-\\lambda}$ come from? Split the interval into $n$ tiny sub-slices, each so small that at most one event can occur, with success probability $p$ per slice. The count is then $\\text{Binomial}(n, p)$. Now let $n \\to \\infty$ and $p \\to 0$ while holding $np = \\lambda$ fixed. Then:</p>\n$$\\binom{n}{k} p^k (1-p)^{n-k} \\;\\longrightarrow\\; \\frac{\\lambda^k e^{-\\lambda}}{k!}$$\n<p>The pieces: $\\binom{n}{k}p^k \\approx \\frac{n^k}{k!}\\left(\\frac{\\lambda}{n}\\right)^k = \\frac{\\lambda^k}{k!}$, and $(1-p)^{n-k} = \\left(1 - \\frac{\\lambda}{n}\\right)^{n-k} \\to e^{-\\lambda}$. This is the <strong>law of rare events</strong>: a huge number of trials, each with a tiny success chance, gives Poisson counts. That is why typos on a page (thousands of characters, each rarely a mistake) or accidents in a city (many drivers, each rarely crashing) follow Poisson so well.</p>\n\n<h3>5. A fully worked example</h3>\n<p>A call center receives an average of $\\lambda = 4$ calls per minute. What is the probability of receiving <strong>exactly 2 calls</strong> in a given minute?</p>\n$$P(X = 2) = \\frac{4^2 e^{-4}}{2!} = \\frac{16 \\cdot 0.018316}{2} = \\frac{0.29306}{2} \\approx 0.1465$$\n<p>So about a <strong>14.7%</strong> chance. And the probability of <strong>at least one</strong> call uses the complement: $P(X \\geq 1) = 1 - P(X=0) = 1 - e^{-4} \\approx 1 - 0.0183 = 0.9817$. Almost certainly the phone rings. Notice we never needed $n$ or $p$ — just the rate $\\lambda$.</p>\n\n<p><strong>Takeaway:</strong> when you count independent rare events at a steady rate, reach for Poisson. One number $\\lambda$ gives you the entire distribution, its mean, and its variance all at once.</p>",
          "mcq": [
            {
              "q": "At the bakery, customers arrive at an average rate of 6 per hour. If arrivals follow a Poisson process, what is the expected number of customers in the next 20 minutes?",
              "choices": [
                "6",
                "2",
                "18",
                "0.3"
              ],
              "answer": 1,
              "explain": "The rate scales with the window: 20 minutes is $1/3$ of an hour, so $\\lambda = 6 \\times \\frac{1}{3} = 2$. The value 6 ignores the shorter window, and 18 wrongly multiplies instead of dividing."
            },
            {
              "q": "With an expected $\\lambda = 2$ customers in 20 minutes, what is the probability that nobody shows up in that window?",
              "choices": [
                "$1 - 2 = -1$",
                "$\\frac{2^0}{0!} = 1$",
                "$e^{-2} \\approx 0.135$",
                "$\\frac{1}{2} = 0.5$"
              ],
              "answer": 2,
              "explain": "$P(X=0) = \\frac{\\lambda^0 e^{-\\lambda}}{0!} = e^{-2} \\approx 0.135$. Forgetting the $e^{-\\lambda}$ factor (just using $\\lambda^0/0! = 1$) is the classic mistake."
            },
            {
              "q": "For a Poisson random variable $X$ with parameter $\\lambda$, what are its mean and variance?",
              "choices": [
                "Mean $\\lambda$, variance $\\lambda$",
                "Mean $\\lambda$, variance $\\lambda^2$",
                "Mean $\\lambda$, variance $\\sqrt{\\lambda}$",
                "Mean $\\lambda$, variance $1$"
              ],
              "answer": 0,
              "explain": "A defining property of the Poisson distribution is that its mean and variance are both equal to $\\lambda$. Confusing it with other distributions leads to guessing $\\lambda^2$ or $\\sqrt{\\lambda}$."
            },
            {
              "q": "A help desk receives calls following a Poisson distribution with $\\lambda = 3$ per hour. What is the probability of receiving exactly 2 calls in an hour?",
              "choices": [
                "$\\frac{3^2}{2!} \\approx 4.5$",
                "$\\frac{3^2 e^{-3}}{2!} \\approx 0.224$",
                "$e^{-3} \\approx 0.050$",
                "$\\frac{2^3 e^{-2}}{3!} \\approx 0.180$"
              ],
              "answer": 1,
              "explain": "Plug into the PMF: $P(X=2) = \\frac{3^2 e^{-3}}{2!} = \\frac{9 e^{-3}}{2} \\approx 0.224$. Choice 0 drops the $e^{-\\lambda}$ term (and yields an impossible probability $> 1$); choice 3 swaps the roles of $k$ and $\\lambda$."
            },
            {
              "q": "Why must a valid count from a Poisson distribution be a non-negative integer ($0, 1, 2, \\dots$) even though $\\lambda$ can be a decimal like $2.5$?",
              "choices": [
                "Because $\\lambda$ is always rounded to an integer before use",
                "Because you cannot observe a fractional number of discrete events, but the average of those counts can be fractional",
                "Because the PMF is only defined when $\\lambda$ is an integer",
                "Because the Poisson distribution is continuous, not discrete"
              ],
              "answer": 1,
              "explain": "You can never count 2.5 customers in a single window, but averaging many windows can give a non-integer mean. $\\lambda$ is the expected value, not a possible outcome, and the distribution is discrete."
            },
            {
              "q": "Emails arrive at $\\lambda = 4$ per hour. Using the recurrence $P(X=k+1) = \\frac{\\lambda}{k+1}P(X=k)$, which count $k$ has the HIGHEST probability (the mode)?",
              "choices": [
                "$k = 0$",
                "$k = 3$ and $k = 4$ (tied)",
                "$k = 4$ only",
                "$k = 8$"
              ],
              "answer": 1,
              "explain": "When $\\lambda$ is an integer, the modes are at $k = \\lambda$ and $k = \\lambda - 1$, which are tied; here that is $k = 3$ and $k = 4$. The ratio $\\frac{\\lambda}{k+1}$ equals 1 exactly when $k+1 = \\lambda$, making those two values equal."
            },
            {
              "q": "Two independent Poisson processes feed one inbox: work emails at $\\lambda_1 = 5$/hour and personal emails at $\\lambda_2 = 3$/hour. What is the distribution of the total number of emails per hour?",
              "choices": [
                "Poisson with $\\lambda = 8$",
                "Poisson with $\\lambda = 15$",
                "Poisson with $\\lambda = \\sqrt{34}$",
                "Not Poisson; the sum of two Poissons is never Poisson"
              ],
              "answer": 0,
              "explain": "The sum of independent Poisson variables is Poisson with parameter equal to the sum of the rates: $\\lambda = 5 + 3 = 8$. Rates add (not multiply, giving 15), and the sum remains Poisson."
            },
            {
              "q": "A printed page has on average $\\lambda = 0.5$ typos. What is the probability a page has AT LEAST one typo?",
              "choices": [
                "$0.5$",
                "$e^{-0.5} \\approx 0.607$",
                "$1 - e^{-0.5} \\approx 0.393$",
                "$1 - 0.5 = 0.5$"
              ],
              "answer": 2,
              "explain": "Use the complement: $P(X \\ge 1) = 1 - P(X=0) = 1 - e^{-0.5} \\approx 0.393$. Confusing $\\lambda$ itself with a probability gives the tempting (wrong) answer 0.5."
            },
            {
              "q": "A student computes $P(X=3)$ for $\\lambda = 2$ and gets $1.33$. What is the most likely error?",
              "choices": [
                "They used the wrong value of $k$",
                "Nothing — probabilities can exceed 1 for Poisson",
                "They forgot the $e^{-\\lambda}$ factor, since $\\frac{2^3}{3!} = 1.33$",
                "They should have used $\\lambda = 3$ instead"
              ],
              "answer": 2,
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
                "The uniform distribution on $[0, \\lambda]$",
                "The normal (Gaussian) distribution with mean $\\lambda$ and variance $\\lambda$",
                "The exponential distribution with rate $\\lambda$",
                "The Bernoulli distribution"
              ],
              "answer": 1,
              "explain": "For large $\\lambda$, the Poisson distribution approaches a normal distribution with mean $\\lambda$ and variance $\\lambda$ (matching its moments). The exponential describes the waiting time between events, not the count itself."
            },
            {
              "q": "At the bakery, $\\lambda = 6$ customers per hour. Which statement correctly interprets the constant-rate assumption?",
              "choices": [
                "Exactly 6 customers arrive in every hour-long window",
                "Customers are equally likely to arrive at any instant, so two disjoint 30-minute windows each have $\\lambda = 3$ on average",
                "Once 6 customers have arrived, no more can come that hour",
                "The probability of an arrival doubles after each customer leaves"
              ],
              "answer": 1,
              "explain": "A constant rate means arrivals are spread uniformly in expectation, so any 30-minute slice averages $6 \\times \\frac{1}{2} = 3$. The count varies randomly around its mean, so it is not fixed at exactly 6, nor capped, nor dependent on prior arrivals."
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
            }
          ]
        },
        {
          "id": "ps-geometric-waiting",
          "title": "Geometric & Waiting-Time Distributions",
          "minutes": 14,
          "content": "<h3>1. The hook: how long until the first success?</h3>\n<p>You are rolling a fair die, hunting for your first six. It might come on roll one — or you might suffer through ten misses first. The <strong>Geometric distribution</strong> answers the question lurking behind every such wait: <em>how many independent attempts until something finally works?</em> Whether it is calls until the first sale, coin flips until the first heads, or job applications until the first offer, the same shape governs the wait. And it hides a property so strange it feels like a paradox — the dice have <em>no memory</em> of how long you have already been waiting.</p>\n\n<h3>2. Setup: a stream of Bernoulli trials</h3>\n<p>Imagine a sequence of <strong>independent</strong> trials, each a coin-flip-like <em>Bernoulli trial</em> with the same success probability $p$ (and failure probability $1-p$). Let $X$ count the <strong>number of trials up to and including the first success</strong>. Then $X$ can be $1, 2, 3, \\dots$ — there is no upper bound. We write $X \\sim \\text{Geometric}(p)$.</p>\n<p><em>Caution:</em> some textbooks instead count only the <em>failures before</em> the first success (support $0,1,2,\\dots$). We use the <strong>trials-until-success</strong> convention, the most common in intro courses.</p>\n\n<h3>3. The PMF and why it has that form</h3>\n<p>For $X = k$ to happen, the first $k-1$ trials must <em>all</em> fail and the $k$-th must succeed. Because trials are independent, we multiply: $$P(X = k) = (1-p)^{k-1}\\,p, \\qquad k = 1, 2, 3, \\dots$$</p>\n<p><strong>Concrete example.</strong> Rolling a die for the first six, $p = \\tfrac{1}{6}$. The chance the first six arrives exactly on roll 3 is $$P(X=3) = \\left(\\tfrac{5}{6}\\right)^{2}\\cdot \\tfrac{1}{6} = \\tfrac{25}{216} \\approx 0.116.$$ These probabilities form a geometric series that sums to 1: $\\sum_{k=1}^{\\infty}(1-p)^{k-1}p = p \\cdot \\frac{1}{1-(1-p)} = 1$. That is exactly why it earns the name <em>geometric</em>.</p>\n\n<h3>4. The mean: why $\\mathbb{E}[X] = 1/p$</h3>\n<p>The expected wait is $$\\mathbb{E}[X] = \\frac{1}{p}.$$ The intuition is irresistibly clean: if a success happens a fraction $p$ of the time, then on average you need $1/p$ tries to see one. Rare events ($p$ small) make for long waits — for the die, $p=\\tfrac16$ gives a mean of <strong>6 rolls</strong>. The variance is $\\text{Var}(X) = \\frac{1-p}{p^{2}}$; for the die that is $\\frac{5/6}{1/36} = 30$, so a standard deviation of about $5.5$ rolls — the wait is highly variable.</p>\n<p>A slick derivation: condition on the first trial. With probability $p$ you are done in 1 step; with probability $1-p$ you have \"wasted\" one trial and start over, so $\\mathbb{E}[X] = p\\cdot 1 + (1-p)(1 + \\mathbb{E}[X])$. Solving gives $\\mathbb{E}[X] = 1/p$.</p>\n\n<h3>5. The survival function and memorylessness</h3>\n<p>The probability the wait <em>exceeds</em> $n$ trials is the chance the first $n$ trials all fail: $$P(X > n) = (1-p)^{n}.$$ Now the magic. Suppose you have already failed $m$ times and are still waiting. What is the chance you must endure at least $n$ <em>more</em>? $$P(X > m+n \\mid X > m) = \\frac{P(X > m+n)}{P(X > m)} = \\frac{(1-p)^{m+n}}{(1-p)^{m}} = (1-p)^{n} = P(X > n).$$</p>\n<p>This is the <strong>memorylessness property</strong>: the past leaves no trace. The dice do not \"owe\" you a six for your earlier misses; your remaining wait has the <em>same</em> distribution as a fresh start. Strikingly, the geometric is the <strong>only</strong> discrete distribution with this property (its continuous cousin is the exponential distribution). It is also the source of the gambler's fallacy — believing a long drought makes success \"due\" is precisely the error memorylessness forbids.</p>\n<p><strong>Numeric check</strong> ($p = 0.2$): $P(X > 5 \\mid X > 2) = \\frac{(0.8)^5}{(0.8)^2} = (0.8)^3 = 0.512$, identical to $P(X > 3) = 0.512$.</p>\n\n<h3>6. Waiting for $r$ successes: the negative binomial</h3>\n<p>What if you want not the first success but the $r$-th? Let $Y$ be the number of trials until the $r$-th success — the <strong>Negative Binomial</strong> distribution. The last trial must be a success, and among the first $Y-1$ trials exactly $r-1$ must succeed: $$P(Y = k) = \\binom{k-1}{r-1}(1-p)^{k-r}\\,p^{\\,r}, \\qquad k = r, r+1, \\dots$$ Since $Y$ is a sum of $r$ independent geometric waits, its mean is simply $\\mathbb{E}[Y] = r/p$. The geometric is the special case $r = 1$.</p>\n\n<h3>7. The big picture</h3>\n<p>The geometric distribution is the discrete clock of \"keep trying until it works\": PMF $(1-p)^{k-1}p$, mean $1/p$, and a unique amnesia about the past. Stack $r$ of these clocks and you get the negative binomial. Whenever a problem says \"until the first / $r$-th time something happens,\" reach for these tools.</p>",
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
                "$p^{k-1}(1-p)$",
                "$(1-p)^{k-1}\\,p$",
                "$\\binom{k}{1}p(1-p)^{k-1}$",
                "$(1-p)^{k}\\,p$"
              ],
              "answer": 1,
              "explain": "The first $k-1$ trials must fail (probability $(1-p)^{k-1}$) and the $k$-th must succeed (probability $p$), giving $(1-p)^{k-1}p$. The exponent $k$ instead of $k-1$ would double-count an extra failure."
            },
            {
              "q": "A gambler has just lost 8 spins in a row on a machine that pays out independently with probability $p$ each spin. Compared with someone who has only played once and lost, how is the gambler's remaining wait until a win distributed?",
              "choices": [
                "It is shorter on average, because a win is now 'overdue'",
                "It has exactly the same distribution as a fresh start",
                "It is longer on average, because the machine is on a cold streak",
                "It cannot be determined without knowing the value of $p$"
              ],
              "answer": 1,
              "explain": "Memorylessness means $P(X > m+n \\mid X > m) = P(X > n)$, so the past run of losses leaves no trace and the remaining wait is distributed like a brand-new one. Believing a win is 'overdue' is exactly the gambler's fallacy."
            },
            {
              "q": "Rolling a fair die for the first six ($p = 1/6$), what is the probability the first six does NOT appear within the first 4 rolls, i.e. $P(X > 4)$?",
              "choices": [
                "$\\left(\\tfrac{5}{6}\\right)^{4}$",
                "$\\left(\\tfrac{1}{6}\\right)^{4}$",
                "$1 - \\left(\\tfrac{1}{6}\\right)^{4}$",
                "$4 \\cdot \\tfrac{5}{6} \\cdot \\tfrac{1}{6}$"
              ],
              "answer": 0,
              "explain": "$P(X > n) = (1-p)^n$, so $P(X>4) = (5/6)^4$ — the event that all four rolls fail to show a six. The option $(1/6)^4$ wrongly uses the success probability for repeated failures."
            },
            {
              "q": "The variance of $X \\sim \\text{Geometric}(p)$ is $\\frac{1-p}{p^2}$. As $p \\to 0$ (very rare successes), what happens to the standard deviation relative to the mean $1/p$?",
              "choices": [
                "The standard deviation grows much faster than the mean, so the wait becomes relatively more variable",
                "The standard deviation and mean stay roughly equal, so relative variability is about constant",
                "The standard deviation shrinks to zero, so the wait becomes nearly deterministic",
                "The standard deviation stays fixed while the mean grows, so relative variability vanishes"
              ],
              "answer": 1,
              "explain": "The SD is $\\sqrt{(1-p)/p^2} = \\sqrt{1-p}/p$, and the mean is $1/p$; their ratio is $\\sqrt{1-p} \\to 1$ as $p \\to 0$. So the SD tracks the mean closely and relative variability stays near 1 (a hallmark of the geometric)."
            },
            {
              "q": "A salesperson closes each call independently with probability $0.3$. Let $Y$ be the number of calls until the SECOND sale. Which distribution does $Y$ follow, and what is $\\mathbb{E}[Y]$?",
              "choices": [
                "Geometric, with $\\mathbb{E}[Y] = 1/0.3 \\approx 3.33$",
                "Negative Binomial ($r=2$), with $\\mathbb{E}[Y] = 2/0.3 \\approx 6.67$",
                "Binomial, with $\\mathbb{E}[Y] = 2 \\cdot 0.3 = 0.6$",
                "Negative Binomial ($r=2$), with $\\mathbb{E}[Y] = 1/0.3 \\approx 3.33$"
              ],
              "answer": 1,
              "explain": "Waiting for the $r$-th success is Negative Binomial with mean $r/p$; here $2/0.3 \\approx 6.67$. Because $Y$ is the sum of two independent geometric waits, its mean is twice the single-success mean of $3.33$."
            },
            {
              "q": "A free-throw shooter makes each shot independently with probability $0.9$. If $X$ is the number of shots until her first MISS, what is the success probability for the geometric model of $X$?",
              "choices": [
                "$0.9$, since that is the make probability",
                "$0.1$, since the event we are waiting for is a miss",
                "$0.5$, since make and miss must be combined",
                "$0.81$, the probability of two makes"
              ],
              "answer": 1,
              "explain": "The geometric 'success' is whatever event ends the wait — here a MISS, with probability $1 - 0.9 = 0.1$. Using $0.9$ confuses the per-trial outcome we are counting against with the one we are waiting for."
            },
            {
              "q": "For $X \\sim \\text{Geometric}(p)$, what is the CDF $P(X \\le n)$ for a positive integer $n$?",
              "choices": [
                "$(1-p)^{n}$",
                "$1 - (1-p)^{n}$",
                "$n\\,p\\,(1-p)^{n-1}$",
                "$1 - p^{n}$"
              ],
              "answer": 1,
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
                "A geometric sequence with ratio $1-p$; they sum to 1 as a convergent geometric series",
                "A harmonic sequence; they sum to 1 because the terms shrink",
                "A geometric sequence with ratio $p$; they sum to 1 because $p < 1$"
              ],
              "answer": 1,
              "explain": "Successive PMF values $(1-p)^{k-1}p$ differ by the factor $(1-p)$, forming a geometric sequence with ratio $1-p$ (=0.2 here). Their sum is $p \\cdot \\frac{1}{1-(1-p)} = 1$ by the geometric-series formula — which is exactly where the distribution gets its name."
            },
            {
              "q": "With $X \\sim \\text{Geometric}(0.25)$, you are told $X > 3$ (the first three trials all failed). What is $P(X > 7 \\mid X > 3)$?",
              "choices": [
                "$(0.75)^{7} \\approx 0.133$",
                "$(0.75)^{4} \\approx 0.316$",
                "$(0.75)^{10} \\approx 0.056$",
                "$(0.25)^{4} \\approx 0.004$"
              ],
              "answer": 1,
              "explain": "By memorylessness $P(X > 3+4 \\mid X > 3) = P(X > 4) = (0.75)^4 \\approx 0.316$; equivalently $(0.75)^7 / (0.75)^3 = (0.75)^4$. Using $(0.75)^7$ ignores the conditioning, and $(0.75)^{10}$ wrongly adds the exponents."
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
            }
          ]
        },
        {
          "id": "ps-uniform-exponential",
          "title": "Uniform & Exponential Distributions",
          "minutes": 15,
          "content": "<p>Imagine waiting for a bus that's promised \"sometime in the next 10 minutes,\" with no further information. Every instant in that window feels equally likely — your ignorance is perfectly flat. That is the <strong>continuous Uniform</strong> distribution. Now imagine instead waiting for the next radioactive decay, or the next customer to walk through a door: events that arrive at random with no memory of the past. That is the <strong>Exponential</strong> distribution. These two are the workhorses of continuous probability — one models <em>total ignorance over an interval</em>, the other models <em>pure random waiting</em>.</p>\n\n<h3>1. The Continuous Uniform — flat ignorance</h3>\n<p>We write $X \\sim \\text{Uniform}(a,b)$ when $X$ is equally likely to fall anywhere in $[a,b]$. \"Equally likely\" means the density is <strong>constant</strong>. Since the total area under a density must equal 1, and the base has width $b-a$, the height must be</p>\n$$f(x) = \\frac{1}{b-a}, \\quad a \\le x \\le b,$$\n<p>and $f(x)=0$ elsewhere. The CDF accumulates area linearly: for $a \\le x \\le b$,</p>\n$$F(x) = \\frac{x-a}{b-a}.$$\n<p>By symmetry the mean sits at the midpoint, $\\mathbb{E}[X] = \\frac{a+b}{2}$. The variance comes from $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$ and works out to</p>\n$$\\text{Var}(X) = \\frac{(b-a)^2}{12}.$$\n<p><em>Concrete:</em> for $X \\sim \\text{Uniform}(0,10)$ (the bus), $\\mathbb{E}[X]=5$ minutes, $\\text{Var}(X)=100/12 \\approx 8.33$, and $P(X > 7) = \\frac{10-7}{10} = 0.3$.</p>\n\n<h3>2. The Exponential — pure random waiting</h3>\n<p>We write $T \\sim \\text{Exponential}(\\lambda)$ for the time until a randomly-arriving event, where $\\lambda > 0$ is the <strong>rate</strong> (events per unit time). Its density and CDF are</p>\n$$f(t) = \\lambda e^{-\\lambda t}, \\qquad F(t) = 1 - e^{-\\lambda t}, \\quad t \\ge 0.$$\n<p>The density is largest at $t=0$ and decays — short waits are most common, but a long tail allows occasional long waits. The mean is the reciprocal of the rate:</p>\n$$\\mathbb{E}[T] = \\frac{1}{\\lambda}, \\qquad \\text{Var}(T) = \\frac{1}{\\lambda^2}.$$\n<p>Intuitively: if calls arrive at $\\lambda = 3$ per hour, you wait on average $1/3$ hour = 20 minutes for the next one. The survival function $P(T > t) = e^{-\\lambda t}$ is especially handy.</p>\n\n<h3>3. Memorylessness — the defining property</h3>\n<p>The Exponential is the <em>only</em> continuous distribution that is <strong>memoryless</strong>:</p>\n$$P(T > s + t \\mid T > s) = P(T > t).$$\n<p>If you've already waited $s$ minutes with no event, the remaining wait has the <em>same</em> distribution as if you'd just started. The check is one line: $P(T>s+t \\mid T>s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t}$. A used lightbulb (under this model) is as good as new. This makes the Exponential the <strong>continuous analogue of the Geometric</strong> distribution, which is the unique <em>discrete</em> memoryless law counting trials until the first success.</p>\n\n<h3>4. Exponential waiting and the Poisson process</h3>\n<p>These ideas fuse in the <strong>Poisson process</strong>. Suppose events occur at rate $\\lambda$ such that the count $N(t)$ in an interval of length $t$ is $\\text{Poisson}(\\lambda t)$. Then:</p>\n<ul>\n<li>The <strong>waiting time between consecutive events</strong> (interarrival time) is $\\text{Exponential}(\\lambda)$.</li>\n<li>The link is direct: \"no event by time $t$\" means $N(t)=0$, and $P(N(t)=0) = e^{-\\lambda t} = P(T > t)$ — exactly the Exponential survival function.</li>\n<li>The sum of $k$ independent Exponential gaps (time to the $k$-th event) follows a Gamma (Erlang) distribution.</li>\n</ul>\n<p>So Poisson counts <em>how many</em> events in a window; Exponential measures <em>how long</em> between them. They are two views of the same random clock.</p>\n\n<h3>5. Putting it together</h3>\n<p>Both distributions answer probability questions by integrating the density — or, more cheaply, by reading off the CDF. For the Uniform, probabilities are ratios of lengths. For the Exponential, probabilities are exponentials of $-\\lambda t$. <em>Worked:</em> if a webpage's load time is $T \\sim \\text{Exponential}(\\lambda = 0.5)$ seconds$^{-1}$, the mean load is $1/0.5 = 2$ s, and $P(T > 4) = e^{-0.5 \\cdot 4} = e^{-2} \\approx 0.135$ — about a 13.5% chance of waiting over 4 seconds.</p>",
          "mcq": [
            {
              "q": "For $X \\sim \\text{Uniform}(2, 8)$, what is the height of the density $f(x)$ on the interval $[2,8]$?",
              "choices": [
                "$\\frac{1}{6}$",
                "$\\frac{1}{8}$",
                "$\\frac{1}{10}$",
                "$\\frac{1}{3}$"
              ],
              "answer": 0,
              "explain": "The density is constant at $\\frac{1}{b-a} = \\frac{1}{8-2} = \\frac{1}{6}$ so the total area equals 1. Using $\\frac{1}{b}$ or $\\frac{1}{a+b}$ ignores that the width is $b-a$."
            },
            {
              "q": "A friend says: 'For a continuous Uniform random variable, $P(X = 5)$ is small but positive because 5 is inside the support.' What is the correct statement?",
              "choices": [
                "$P(X=5)$ equals the density $f(5)$",
                "$P(X=5) = 0$ because any single point has probability zero for a continuous variable",
                "$P(X=5)$ is positive and equals $\\frac{1}{b-a}$",
                "$P(X=5)$ depends on whether 5 is the midpoint"
              ],
              "answer": 1,
              "explain": "For any continuous distribution, the probability of an exact single point is zero; probability comes from area over an interval, not height at a point. The density $f(5)$ is not a probability, which is the tempting confusion."
            },
            {
              "q": "For $X \\sim \\text{Uniform}(0, 10)$, what is $P(3 < X < 7)$?",
              "choices": [
                "$0.3$",
                "$0.7$",
                "$0.4$",
                "$0.5$"
              ],
              "answer": 2,
              "explain": "For a Uniform, probability is the ratio of lengths: $\\frac{7-3}{10-0} = \\frac{4}{10} = 0.4$. Picking $0.3$ or $0.7$ confuses this with a single one-sided tail like $P(X>7)$."
            },
            {
              "q": "Two Uniform variables have the same midpoint but $X \\sim \\text{Uniform}(4,6)$ and $Y \\sim \\text{Uniform}(0,10)$. How do their variances compare?",
              "choices": [
                "They are equal because the means are equal",
                "$\\text{Var}(X) > \\text{Var}(Y)$ because $X$ is more concentrated",
                "$\\text{Var}(X) < \\text{Var}(Y)$ because $Y$ spans a wider interval",
                "Variance cannot be compared without knowing the densities"
              ],
              "answer": 2,
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
                "$e^{-3} \\approx 0.050$",
                "$1 - e^{-3} \\approx 0.950$",
                "$3e^{-3} \\approx 0.149$",
                "$e^{-1/3} \\approx 0.717$"
              ],
              "answer": 0,
              "explain": "The survival function is $P(T>t) = e^{-\\lambda t} = e^{-3 \\cdot 1} = e^{-3} \\approx 0.050$. The answer $1-e^{-3}$ is the CDF $P(T \\le 1)$, the complementary event."
            },
            {
              "q": "A lightbulb with Exponential lifetime has already burned for 1000 hours without failing. What is the distribution of its remaining lifetime?",
              "choices": [
                "Exponential with a smaller mean, since it is partly used up",
                "The same Exponential distribution as a brand-new bulb",
                "Uniform over the remaining expected hours",
                "Exponential with a larger rate $\\lambda$ because it is aging"
              ],
              "answer": 1,
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
                "Because $\\{N(t)=0\\}$ is the same event as $\\{T > t\\}$, where $T$ is the wait to the first arrival",
                "Because the Poisson mean $\\lambda t$ always equals the Exponential mean $1/\\lambda$",
                "It is a coincidence specific to $t=1$",
                "Because the Exponential variance equals the Poisson variance"
              ],
              "answer": 0,
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
                "The median is $\\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}$, smaller than the mean because the long right tail pulls the mean up",
                "The median is $\\frac{2}{\\lambda}$, larger than the mean",
                "The Exponential has no median because it is continuous"
              ],
              "answer": 1,
              "explain": "Solving $1 - e^{-\\lambda m} = 0.5$ gives $m = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda} < \\frac{1}{\\lambda}$. The right-skewed tail makes the mean exceed the median; the mean equals the median only for symmetric distributions."
            },
            {
              "q": "If $X \\sim \\text{Uniform}(a,b)$, what is the value of the CDF $F\\left(\\frac{a+b}{2}\\right)$ at the midpoint?",
              "choices": [
                "$0$",
                "$\\frac{1}{b-a}$",
                "$\\frac{1}{2}$",
                "$1$"
              ],
              "answer": 2,
              "explain": "By symmetry the midpoint is the median, so $F\\left(\\frac{a+b}{2}\\right) = \\frac{(a+b)/2 - a}{b-a} = \\frac{(b-a)/2}{b-a} = \\frac{1}{2}$. The value $\\frac{1}{b-a}$ is the density height, not the accumulated probability."
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
            }
          ]
        },
        {
          "id": "ps-normal-distribution",
          "title": "The Normal Distribution & Standardization",
          "minutes": 16,
          "content": "<h3>1. The hook: the shape that nature keeps drawing</h3>\n<p>Measure the heights of 10,000 adults, the weights of bags of flour off a factory line, the errors a telescope makes pointing at a star, or the average of 50 dice rolls repeated endlessly — and the same silhouette appears again and again: a single hump, symmetric, fat in the middle, thin at the tails. This is the <strong>normal</strong> (or <strong>Gaussian</strong>) distribution, the most important curve in all of statistics. It shows up so relentlessly that for a century people simply called it the \"law of errors.\" The deep reason for its ubiquity is the <em>Central Limit Theorem</em>, which we tease at the end — but first, let us understand the bell itself.</p>\n\n<h3>2. The bell-curve density</h3>\n<p>A continuous random variable $X$ is <strong>normal</strong> with mean $\\mu$ and variance $\\sigma^2$, written $X \\sim N(\\mu, \\sigma^2)$, when its probability density function is\n$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}.$$\nDo not memorize this in a panic — read its anatomy. The term $-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2$ is a downward parabola in the exponent: it is zero at $x=\\mu$ (where $e^0=1$, the peak) and grows negative as $x$ moves away, so $e^{(\\cdot)}$ decays. The squaring makes it <em>symmetric</em> about $\\mu$. The front constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is just the normalizing factor that forces $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$.</p>\n\n<h3>3. The roles of $\\mu$ and $\\sigma$</h3>\n<p>The two parameters do two visually distinct jobs:</p>\n<ul>\n<li><strong>$\\mu$ (the mean) is the <em>center</em>.</strong> It locates the peak and the axis of symmetry. Changing $\\mu$ slides the whole bell left or right without changing its shape. Here $\\mathbb{E}[X]=\\mu$.</li>\n<li><strong>$\\sigma$ (the standard deviation) is the <em>spread</em>.</strong> Small $\\sigma$ gives a tall, narrow, concentrated bell; large $\\sigma$ gives a short, wide, diffuse one. Here $\\text{Var}(X)=\\sigma^2$. The points $x=\\mu\\pm\\sigma$ are the <em>inflection points</em> where the curve switches from concave-down to concave-up.</li>\n</ul>\n<p>Crucially, the total area is always 1, so a narrower bell must be taller — squeezing horizontally pushes the curve upward.</p>\n\n<h3>4. The standard normal and standardization</h3>\n<p>There are infinitely many normal curves, one per $(\\mu,\\sigma)$. We tame them all with a single reference: the <strong>standard normal</strong> $Z \\sim N(0,1)$, with mean 0 and standard deviation 1. Any normal variable becomes standard by <strong>standardizing</strong>:\n$$z = \\frac{x-\\mu}{\\sigma}.$$\nThe resulting number is a <strong>z-score</strong>: it reports <em>how many standard deviations $x$ lies above ($z>0$) or below ($z<0$) the mean</em>. A z-score of $+2$ means \"two standard deviations above average,\" regardless of the original units. This is the master trick — it converts apples-and-oranges problems onto one universal ruler. The key fact: if $X\\sim N(\\mu,\\sigma^2)$ then $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1)$, so every probability question reduces to the single standard curve.</p>\n<p><strong>Concrete number.</strong> Exam scores are $N(70, 8^2)$. A score of $x=86$ standardizes to $z=\\frac{86-70}{8}=\\frac{16}{8}=2.0$ — exactly two standard deviations above the mean. A score of $x=66$ gives $z=\\frac{66-70}{8}=-0.5$, half a standard deviation below.</p>\n\n<h3>5. The 68–95–99.7 empirical rule</h3>\n<p>Because the standard normal is fixed, the fraction of data within a given number of standard deviations is fixed too. The <strong>empirical rule</strong> records the three you must know cold:</p>\n<ul>\n<li>About <strong>68%</strong> of values fall within $\\mu\\pm 1\\sigma$ (i.e. $|z|\\le 1$).</li>\n<li>About <strong>95%</strong> fall within $\\mu\\pm 2\\sigma$ (i.e. $|z|\\le 2$).</li>\n<li>About <strong>99.7%</strong> fall within $\\mu\\pm 3\\sigma$ (i.e. $|z|\\le 3$).</li>\n</ul>\n<p>By symmetry, the leftover tail mass splits evenly. For example, outside $\\mu\\pm 2\\sigma$ lies $100\\%-95\\%=5\\%$, so each tail holds $2.5\\%$. Thus $P(Z>2)\\approx 0.025$ and $P(Z<-1)\\approx \\frac{1-0.68}{2}=0.16$. (More precise values are $P(|Z|\\le1)=0.6827$, $P(|Z|\\le2)=0.9545$, $P(|Z|\\le3)=0.9973$.)</p>\n<p>Use the explorer below to feel all of this at once. Drag <strong>μ</strong> and watch the whole bell slide; drag <strong>σ</strong> and watch it stretch or pinch while the shaded 68–95–99.7 bands keep the <em>same</em> percentages. Switch to <strong>interval</strong> mode and slide the bounds to read off $P(a\\le X\\le b)$ for any region — notice the answer depends only on the z-bounds, never on μ or σ.</p>\n<div data-viz=\"ps-normal-explorer\"></div>\n\n<div data-viz=\"ps-clt\"></div>\n<h3>6. Why the normal is everywhere — a CLT teaser</h3>\n<p>The normal is not a coincidence imposed on data; it is forced by addition. The <strong>Central Limit Theorem</strong> says that when you <em>sum or average many independent small effects</em> — no matter how each individual effect is distributed — the result is approximately normal. A person's height is the accumulation of countless genetic and environmental nudges; measurement error is the sum of many tiny perturbations. Anywhere randomness piles up additively, the bell emerges. That is why we invest so heavily in mastering this one curve.</p>\n\n<h3>7. Worked example: putting it together</h3>\n<p>Suppose IQ scores are $N(100, 15^2)$, so $\\mu=100$, $\\sigma=15$. <em>What fraction of people score above 130?</em> Standardize: $z=\\frac{130-100}{15}=\\frac{30}{15}=2.0$. We want $P(Z>2)$. The empirical rule says $95\\%$ lie within $|z|\\le 2$, leaving $5\\%$ in the two tails, so the upper tail alone is $\\frac{5\\%}{2}=2.5\\%$. Therefore about <strong>2.5%</strong> of people score above 130. And <em>between 85 and 115?</em> Those are $z=\\pm 1$, the $\\mu\\pm 1\\sigma$ band, so about <strong>68%</strong>. The z-score plus the empirical rule answers both in seconds, with no calculus.</p>",
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
                "The curve is actually tallest at the tails, not at $\\mu$",
                "The peak height $f(\\mu)$ is a density, not a probability, so it can exceed $1$ (e.g. when $\\sigma$ is small)",
                "The total area is $\\sigma$, not $1$, so the peak must be $\\sigma$",
                "The peak is always exactly $0.5$ for symmetric distributions"
              ],
              "answer": 1,
              "explain": "$f$ is a probability density; only areas under it are probabilities. The peak height $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ grows without bound as $\\sigma\\to 0$, so it can be far larger than $1$."
            },
            {
              "q": "How does the standardization $Z = \\frac{X-\\mu}{\\sigma}$ transform the distribution of $X \\sim N(\\mu, \\sigma^2)$?",
              "choices": [
                "It makes $Z$ uniform on $[0,1]$",
                "It gives $Z \\sim N(0, 1)$, the standard normal",
                "It gives $Z \\sim N(\\mu, 1)$, keeping the original mean",
                "It squares the variable to remove negative values"
              ],
              "answer": 1,
              "explain": "Subtracting $\\mu$ recenters to mean $0$ and dividing by $\\sigma$ rescales to variance $1$, yielding $Z\\sim N(0,1)$. The mean becomes $0$, not $\\mu$, and the shape stays normal (not uniform)."
            },
            {
              "q": "If $X \\sim N(100, 16)$ (so $\\sigma = 4$), what is the $z$-score of the observation $x = 108$?",
              "choices": [
                "$8$",
                "$0.5$",
                "$2$",
                "$1.5$"
              ],
              "answer": 2,
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
                "Because $e^{(\\cdot)}$ is an even function for all inputs",
                "Because the squaring makes the exponent depend only on the distance $|x-\\mu|$, so $x = \\mu+a$ and $x = \\mu-a$ give equal density",
                "Because $\\sigma$ is always positive",
                "Because the front constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is symmetric"
              ],
              "answer": 1,
              "explain": "Squaring $(x-\\mu)$ erases the sign, so points equidistant from $\\mu$ on either side share the same exponent and hence the same density. Symmetry comes from the squared deviation, not from properties of $e$ or the front constant."
            },
            {
              "q": "Heights are $N(170, 6^2)$ cm. A person with height $z = -1.5$ has what actual height?",
              "choices": [
                "$179$ cm",
                "$161$ cm",
                "$168.5$ cm",
                "$155$ cm"
              ],
              "answer": 1,
              "explain": "Inverting standardization: $x = \\mu + z\\sigma = 170 + (-1.5)(6) = 170 - 9 = 161$ cm. The sign of $z$ matters: a negative $z$ is below the mean, so the answer must be less than $170$."
            },
            {
              "q": "Which statement about the standard normal $N(0,1)$ is TRUE?",
              "choices": [
                "$P(Z = 0) = \\frac{1}{\\sqrt{2\\pi}}$, the peak density",
                "$P(Z = 0) = 0$ because $Z$ is continuous, even though density is highest there",
                "$P(Z \\le 0) = 0$ since $0$ is the smallest value",
                "$P(Z = 0)$ is undefined"
              ],
              "answer": 1,
              "explain": "For any continuous distribution the probability of an exact single value is $0$, regardless of how tall the density is there. The value $\\frac{1}{\\sqrt{2\\pi}}$ is the density $f(0)$, not a probability, and $P(Z\\le 0)=0.5$ by symmetry."
            },
            {
              "q": "Standardizing to $z$-scores is useful primarily because it lets you:",
              "choices": [
                "Convert any normal distribution to $N(0,1)$ so a single table or formula handles all probability questions",
                "Turn a skewed distribution into a normal one",
                "Guarantee all values become positive",
                "Change the variance to match the mean"
              ],
              "answer": 0,
              "explain": "Standardization maps every $N(\\mu,\\sigma^2)$ onto the same standard curve $N(0,1)$, so one reference suffices for all of them. It does not fix skewness (it preserves shape) nor force positivity ($z$ can be negative)."
            },
            {
              "q": "The lesson teases that the normal distribution arises 'relentlessly' — e.g. for the average of 50 dice rolls. Which principle explains why averages of many independent quantities tend to look normal?",
              "choices": [
                "The Law of Large Numbers",
                "The Central Limit Theorem",
                "Bayes' Theorem",
                "The Empirical Rule"
              ],
              "answer": 1,
              "explain": "The Central Limit Theorem states that sums or averages of many independent random variables approach a normal distribution regardless of the original shape. The Law of Large Numbers concerns the average converging to the mean, not the bell shape of its distribution."
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
            }
          ]
        }
      ]
    }
  ]
}
);
