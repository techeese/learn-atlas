/* Atlas course — Information Theory
   The 9th subject. Phase 1: Foundations (entropy). More modules queued (cross-entropy/KL, mutual information, source coding, channel capacity, info in ML).
   Loop-initiated, additive & reversible. Generated & guard-checked. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "information-theory",
  "title": "Information Theory",
  "icon": "ℐ",
  "color": "#4ba3b8",
  "blurb": "The mathematics of information, uncertainty, and communication — entropy, cross-entropy, KL divergence, and mutual information. The quiet foundation under every loss function, compression scheme, and the 'surprise' a model feels when reality differs from its predictions.",
  "modules": [
    {
      "id": "it-foundations",
      "title": "Foundations: Measuring Information",
      "lessons": [
        {
          "id": "it-entropy",
          "title": "Entropy: Measuring Information and Surprise",
          "minutes": 17,
          "content": "<h3>1. The hook: how much does a message tell you?</h3>\n<p>If a friend texts \"the sun rose this morning,\" you learn almost nothing — you already knew. If they text \"it snowed in the Sahara,\" you learn a great deal. <strong>Information theory</strong>, founded by Claude Shannon in 1948, makes this precise: the information in an event is tied to how <em>surprising</em> it is. Rare events carry more information than certain ones. From this single idea flow entropy, data compression, and — directly — the loss functions that train every modern model.</p>\n<h3>2. Self-information: surprise, quantified</h3>\n<p>The <strong>self-information</strong> (or \"surprisal\") of an event with probability $p$ is $$I(x) = -\\log p(x) = \\log\\frac{1}{p(x)}.$$ A certain event ($p=1$) carries $I=0$ — no surprise, no information. A rare event ($p\\to 0$) carries $I\\to\\infty$. The rarer the event, the bigger the surprise. With $\\log$ base 2, $I$ is measured in <strong>bits</strong>: an event of probability $\\tfrac12$ carries exactly 1 bit (one yes/no answer's worth).</p>\n<h3>3. Entropy: average surprise</h3>\n<p><strong>Entropy</strong> is the <em>expected</em> self-information of a random variable — how surprising its outcomes are on average: $$H(X) = \\mathbb{E}[-\\log p(X)] = -\\sum_x p(x)\\log p(x).$$ It measures <em>uncertainty</em>: how unpredictable $X$ is, and equivalently how many bits you need, on average, to encode one outcome. A fair coin has $H=1$ bit; a fair six-sided die has $H=\\log_2 6\\approx 2.585$ bits. A loaded coin that lands heads 90% of the time has only $H\\approx 0.47$ bits — far more predictable, so far less information per flip.</p>\n<h3>4. Bits, nats, and the base of the log</h3>\n<p>The base of the logarithm only sets the <em>units</em>. Base 2 gives <strong>bits</strong> (the natural currency of yes/no questions and digital storage); base $e$ gives <strong>nats</strong> (the default in machine learning, because derivatives of $\\ln$ are clean); base 10 gives \"dits.\" They differ by a constant factor — 1 nat $=\\log_2 e\\approx 1.44$ bits — so every result is the same shape regardless of base. ML almost always uses nats; this lesson uses bits for intuition.</p>\n<div data-viz=\"it-entropy-viz\"></div>\n<h3>5. Maximum and minimum uncertainty</h3>\n<p>Entropy is bounded. It is <em>minimized</em> at $H=0$ when one outcome is certain ($p=1$) — no uncertainty, nothing to encode. It is <em>maximized</em> when every outcome is equally likely: for $n$ outcomes the uniform distribution gives $H=\\log_2 n$, the most bits any distribution over $n$ outcomes can have. Uniform = maximally uncertain; peaked = predictable. This is why a well-shuffled deck (uniform) is the hardest to guess and compresses the worst.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> Shannon entropy is a one-liner: sum $-p\\log_2 p$ over the outcomes. This distribution $[0.5, 0.25, 0.25]$ should come out to exactly 1.5 bits.</p>\n<div data-code=\"javascript\" data-expected=\"1.50\">// Shannon entropy H = -sum p*log2(p), in bits\nconst p = [0.5, 0.25, 0.25];\nconst log2 = x => Math.log(x) / Math.log(2);\nlet H = 0;\nfor (let i = p.length - 1; i >= 0; i--) H -= p[i] * log2(p[i]);\nconsole.log(H.toFixed(2));</div>\n<h3>7. Why this is the foundation of machine learning</h3>\n<p>Entropy is not abstract — it is the root of the tools you already use. <strong>Cross-entropy</strong>, the standard classification loss, measures the average surprise of the true labels under the model's predicted distribution; minimizing it makes the model less surprised by reality. <strong>KL divergence</strong> measures how many <em>extra</em> bits you pay for using the wrong distribution. <strong>Decision trees</strong> split on the feature that reduces entropy most (information gain). And a language model's <strong>perplexity</strong> is just $2^{H}$ — the entropy of its next-token guesses, exponentiated. Master entropy and these stop being formulas to memorize and become one idea.</p>\n<h3>8. The big picture</h3>\n<p>Information is surprise; entropy is average surprise, measured in bits (or nats). It quantifies uncertainty, sets the hard limit on lossless compression, and underlies cross-entropy, KL divergence, mutual information, and perplexity. Everything else in this subject is built on the simple act of taking $-\\log p$ and averaging it.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the logarithm? Because information should add</summary>\n<p>Why define information as $-\\log p$ rather than, say, $1-p$? Because we want one property above all: the information from <em>independent</em> events should <em>add</em>. Learning two unrelated facts should give you the sum of their individual information.</p>\n<p>For independent events, probabilities <em>multiply</em>: $p(x,y)=p(x)\\,p(y)$. We want a measure $I$ with $I(x,y)=I(x)+I(y)$. The only function that turns multiplication into addition is the logarithm: $-\\log\\big(p(x)p(y)\\big)=-\\log p(x)-\\log p(y)$. So the log is not arbitrary — it is <em>forced</em> by the additivity requirement (plus continuity and \"rarer means more\"). Shannon proved these few axioms pin down $-\\log p$ uniquely, up to the choice of base.</p>\n<p>The \"aha\": the logarithm is the unique way to make \"surprise\" additive over independent events — which is exactly what makes bits compose (two coin flips carry 2 bits) and entropies of independent variables sum.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: entropy is the limit of lossless compression</summary>\n<p>Entropy is not just a feeling of \"uncertainty\" — it is a hard engineering limit. <strong>Shannon's source coding theorem</strong> says that to encode outcomes of $X$ losslessly, you need <em>on average at least $H(X)$ bits per symbol</em>, and you can get arbitrarily close to it. No scheme can do better; that is why entropy is measured in bits.</p>\n<p><b>The intuition.</b> Assign <em>short</em> codes to common outcomes and <em>long</em> codes to rare ones (Morse code does this — \"E\" is one dot). The optimal code length for an outcome of probability $p$ is about $-\\log_2 p$ bits — its self-information. Average those code lengths over the distribution and you get $H(X)$. Huffman coding and arithmetic coding are the practical algorithms that approach this bound.</p>\n<p>The \"aha\": entropy answers a concrete question — \"how small can this file get?\" A source of entropy $H$ cannot be compressed below $H$ bits per symbol on average. Predictability (low entropy) is exactly what makes compression possible, which is why a language model that predicts text well also <em>compresses</em> it well.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why uniform maximizes entropy (and why it matters)</summary>\n<p>Among all distributions over $n$ outcomes, the <em>uniform</em> one has the highest entropy, $\\log_2 n$. Intuitively, spreading probability evenly leaves you maximally uncertain; concentrating it on a few outcomes makes them predictable and lowers $H$. (It follows from Jensen's inequality applied to the concave $\\log$.)</p>\n<p><b>The principle.</b> This is the basis of the <strong>maximum-entropy principle</strong>: when you must pick a distribution subject to some known constraints, choose the one with the highest entropy — it assumes the least beyond what you actually know. Fix only the mean and variance and max-entropy hands you the <em>Gaussian</em>; fix only the mean of a positive quantity and you get the <em>exponential</em>. Many \"natural\" distributions are simply the least-committal choice given a constraint.</p>\n<p>The \"aha\": maximum entropy is honest ignorance made precise — the flattest distribution consistent with what you know. It connects entropy to statistics (the Gaussian as max-entropy), to physics (thermodynamic equilibrium), and to ML (max-entropy / logistic models that avoid unwarranted assumptions).</p>\n</details>",
          "mcq": [
            {
              "q": "The self-information of an event with probability $p$ is defined as:",
              "choices": [
                "$p\\log p$",
                "$1-p$",
                "$-\\log p$",
                "$p^2$"
              ],
              "answer": 2,
              "explain": "$I=-\\log p$: certain events ($p=1$) carry 0 information, rare events ($p\\to 0$) carry a lot."
            },
            {
              "q": "Entropy $H(X)$ is best described as:",
              "choices": [
                "The probability of the most likely outcome",
                "The average (expected) self-information of the outcomes",
                "The number of possible outcomes",
                "The variance of the distribution"
              ],
              "answer": 1,
              "explain": "$H(X)=\\mathbb{E}[-\\log p(X)]$ — the mean surprise, i.e. average uncertainty."
            },
            {
              "q": "A fair coin has an entropy of:",
              "choices": [
                "1 bit",
                "2 bits",
                "0 bits",
                "Infinite"
              ],
              "answer": 0,
              "explain": "$H=-(0.5\\log_2 0.5 + 0.5\\log_2 0.5)=1$ bit — one yes/no answer's worth."
            },
            {
              "q": "For a fixed number of outcomes $n$, entropy is maximized by:",
              "choices": [
                "The uniform distribution (all outcomes equally likely)",
                "Any skewed distribution",
                "A distribution with two equally likely outcomes",
                "A distribution concentrated on one outcome"
              ],
              "answer": 0,
              "explain": "Uniform = maximal uncertainty, $H=\\log_2 n$, the largest possible."
            },
            {
              "q": "Using $\\log$ base 2, entropy is measured in:",
              "choices": [
                "Nats",
                "Joules",
                "Decibels",
                "Bits"
              ],
              "answer": 3,
              "explain": "Base 2 gives bits; base $e$ gives nats. The base only changes the units by a constant factor."
            },
            {
              "q": "An outcome that is certain ($p=1$) contributes how much to the entropy?",
              "choices": [
                "Infinite",
                "1 bit",
                "Exactly 0",
                "It depends on the other outcomes"
              ],
              "answer": 2,
              "explain": "$-1\\cdot\\log 1 = 0$. A certain event carries no surprise and no information."
            },
            {
              "q": "The logarithm appears in the definition of information mainly because:",
              "choices": [
                "It keeps numbers small",
                "It makes information of independent events add",
                "It is faster to compute",
                "It guarantees the result is positive"
              ],
              "answer": 1,
              "explain": "$p(x,y)=p(x)p(y)$ for independent events, and $-\\log$ turns that product into a sum — additivity."
            },
            {
              "q": "A heavily biased coin (90% heads) compared to a fair coin has:",
              "choices": [
                "Higher entropy",
                "The same entropy",
                "Zero entropy",
                "Lower entropy (it is more predictable)"
              ],
              "answer": 3,
              "explain": "$H\\approx 0.47$ bits vs 1 bit — more predictable means less average surprise."
            }
          ],
          "flashcards": [
            {
              "front": "Self-information of an event with probability $p$",
              "back": "$I=-\\log p$ — the surprise; 0 when certain, large when rare."
            },
            {
              "front": "Entropy $H(X)$",
              "back": "Average self-information, $-\\sum_x p(x)\\log p(x)$ — the expected surprise / uncertainty, in bits or nats."
            },
            {
              "front": "Entropy of a fair coin",
              "back": "1 bit. A fair $n$-sided die has $\\log_2 n$ bits."
            },
            {
              "front": "Which distribution maximizes entropy?",
              "back": "The uniform one ($H=\\log_2 n$): maximal uncertainty. A certain outcome gives $H=0$."
            },
            {
              "front": "Bits vs nats",
              "back": "Log base 2 → bits; log base $e$ → nats. Same quantity, units differ by $\\log_2 e\\approx 1.44$."
            },
            {
              "front": "What does entropy say about compression?",
              "back": "Shannon's source-coding theorem: $H(X)$ bits per symbol is the minimum average length for lossless compression — you can approach it but never beat it. Entropy is the hard floor on how small the data can get."
            }
          ],
          "examples": [
            {
              "title": "Entropy of a fair vs. a biased coin",
              "body": "Compute the entropy (in bits) of a fair coin, and of a coin that lands heads with probability 0.9.",
              "solution": "Fair coin: $H=-(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = -(0.5(-1)+0.5(-1)) = \\mathbf{1}$ bit. Biased coin: $H=-(0.9\\log_2 0.9 + 0.1\\log_2 0.1)=-(0.9(-0.152)+0.1(-3.322))\\approx \\mathbf{0.47}$ bits. The bias makes the coin far more predictable, so each flip carries less than half the information of a fair flip."
            },
            {
              "title": "A fair six-sided die",
              "body": "How many bits of entropy does a fair six-sided die have, and what does that number mean?",
              "solution": "Uniform over 6 outcomes: $H=\\log_2 6 \\approx \\mathbf{2.585}$ bits. It means you need about 2.585 yes/no questions on average to pin down the roll — and that a long sequence of rolls cannot be compressed below ~2.585 bits per roll. (Three bits would suffice but waste a little, since $\\log_2 6 < 3$.)"
            },
            {
              "title": "Surprise of a rare event",
              "body": "A model assigns probability 0.001 to the word that actually appears next. How many bits of surprise (self-information) is that?",
              "solution": "$I=-\\log_2(0.001)=\\log_2(1000)\\approx \\mathbf{9.97}$ bits — a big surprise. Cross-entropy loss is exactly the <em>average</em> of this quantity over the real tokens, so a model that keeps getting blindsided by the truth has high loss. Confident-and-correct ($p\\to 1$) costs near 0 bits; confident-and-wrong ($p\\to 0$) costs a fortune."
            }
          ],
          "homework": [
            {
              "prompt": "A weather station reports one of three conditions with probabilities sunny 0.5, cloudy 0.25, rainy 0.25. Compute the entropy in bits.",
              "hint": "$H=-\\sum p\\log_2 p$. Note $\\log_2 0.5=-1$ and $\\log_2 0.25=-2$.",
              "solution": "$H=-(0.5(-1)+0.25(-2)+0.25(-2))=-(-0.5-0.5-0.5)=\\mathbf{1.5}$ bits. (This is below the $\\log_2 3\\approx 1.585$ bits a uniform three-way report would have — the sunny bias makes it a touch more predictable.)"
            },
            {
              "prompt": "Show that a distribution with one certain outcome ($p=1$ for one value, 0 for the rest) has entropy 0.",
              "hint": "Use $1\\cdot\\log 1 = 0$, and the convention $0\\log 0 = 0$.",
              "solution": "The certain outcome contributes $-1\\cdot\\log 1 = 0$; every other outcome has $p=0$ and contributes $-0\\cdot\\log 0 = 0$ (by the standard convention, since $p\\log p\\to 0$ as $p\\to 0$). So $H=0$ — a deterministic source carries no information and needs no bits to encode."
            },
            {
              "prompt": "A language model is perfectly uniform over a vocabulary of 256 tokens. What is its entropy in bits, and what is its perplexity?",
              "hint": "Uniform over $n$ gives $H=\\log_2 n$; perplexity is $2^{H}$.",
              "solution": "$H=\\log_2 256 = \\mathbf{8}$ bits. Perplexity $=2^{H}=2^8=\\mathbf{256}$ — the model is as confused as if it were guessing uniformly among all 256 tokens. Perplexity is just the entropy exponentiated, so it reads as an 'effective number of equally-likely choices.'"
            }
          ]
        },
        {
          "id": "it-differential-entropy",
          "title": "Differential Entropy: Information in Continuous Variables",
          "minutes": 17,
          "content": "<h3>1. The hook: entropy when outcomes are continuous</h3>\n<p>So far entropy has counted the average surprise of <em>discrete</em> outcomes — coin flips, symbols, classes. But most quantities in machine learning are <em>continuous</em>: a pixel intensity, a latent code, a reward. How do we measure the information in a probability <em>density</em>? The answer, <strong>differential entropy</strong>, replaces the sum with an integral — and comes with one delightful twist that the discrete version never had.</p>\n<h3>2. From sums to integrals</h3>\n<p>For a continuous variable with density $f(x)$, the <strong>differential entropy</strong> is $$h(X) = -\\int f(x)\\,\\log f(x)\\,dx = \\mathbb{E}[-\\log f(X)].$$ It is the natural analogue of $H(X)=-\\sum p\\log p$: average surprise, now weighted by a density and integrated. As before, spread-out densities have high entropy and concentrated ones have low entropy.</p>\n<h3>3. The twist: it can be negative</h3>\n<p>Here is what makes differential entropy different: <em>it can be negative.</em> Because a density $f(x)$ can exceed 1 (densities integrate to 1, but their <em>height</em> is unbounded), $-\\log f$ can be negative, and so can the whole integral. A uniform distribution on $[0,a]$ has $h = \\log_2 a$: positive when $a\\gt 1$, but <strong>negative when $a\\lt 1$</strong> (a tightly concentrated density). Differential entropy is therefore not \"bits of uncertainty\" in the literal counting sense — it is a relative measure, sensitive even to the units you measure $x$ in.</p>\n<h3>4. Compute it yourself</h3>\n<p><b>Try it in code.</b> The differential entropy of a Gaussian has a clean closed form: $h = \\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$. For the standard normal ($\\sigma=1$) it is about 2.05 bits.</p>\n<div data-code=\"javascript\" data-expected=\"2.05\">// Differential entropy of a Gaussian: h = 0.5 * log2(2*pi*e*sigma^2)\nconst sigma = 1;\nconst log2 = x => Math.log(x) / Math.log(2);\nconst h = 0.5 * log2(2 * Math.PI * Math.E * sigma * sigma);\nconsole.log(h.toFixed(2));</div>\n<h3>5. The Gaussian is the maximum-entropy distribution</h3>\n<p>A beautiful fact ties this back to why the normal distribution is everywhere: <strong>among all distributions with a given variance, the Gaussian has the largest differential entropy.</strong> In the maximum-entropy sense it is the \"least presumptuous\" choice — it assumes nothing beyond the variance you fixed. From $h=\\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$ you can also read off that entropy grows with the log of the spread: doubling $\\sigma$ adds exactly 1 bit.</p>\n<h3>6. KL and mutual information survive the move to continuous</h3>\n<p>If differential entropy is unit-dependent and can go negative, can we still do information theory with continuous variables? Yes — because the quantities ML actually cares about are <em>differences</em> of differential entropies, and the awkward parts cancel. The <strong>KL divergence</strong> $D_{\\mathrm{KL}}(f\\|g)=\\int f\\log\\frac{f}{g}$ and the <strong>mutual information</strong> $I(X;Y)=h(X)-h(X\\mid Y)$ remain well-defined, nonnegative, and coordinate-invariant. That is why a VAE can compute a Gaussian KL term, and why continuous mutual-information objectives (InfoNCE) make sense.</p>\n<h3>7. Where it shows up in ML</h3>\n<p>Differential entropy and its relatives are everywhere continuous variables live. The <strong>VAE</strong>'s regularizer is a KL between continuous Gaussians (closed form from these entropies). <strong>Continuous mutual information</strong> underlies contrastive representation learning. The <strong>maximum-entropy principle</strong> justifies Gaussian priors and noise models. And <strong>maximum-entropy reinforcement learning</strong> adds a (differential) entropy bonus to the reward so the policy stays as random as possible while still earning return — the idea behind soft actor-critic.</p>\n<h3>8. The big picture</h3>\n<p>Differential entropy extends entropy to continuous variables, $h(X)=-\\int f\\log f$ — same idea, integral instead of sum, but now it can be negative and depends on units. The Gaussian maximizes it for a fixed variance. And although $h$ itself is a relative measure, the <em>differences</em> that matter — KL divergence and mutual information — stay well-defined and invariant, which is what lets information theory power continuous-variable machine learning from VAEs to max-entropy RL.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why differential entropy can be negative (and isn't coordinate-invariant)</summary>\n<p>Discrete entropy is always $\\ge 0$ because each probability $p\\le 1$, so $-\\log p\\ge 0$. The continuous version loses this guarantee, and the reason is worth understanding.</p>\n<p>A probability <em>density</em> $f(x)$ is not a probability — it can be larger than 1 (only its integral must be 1). Where $f(x)\\gt 1$, the term $-\\log f(x)$ is negative, and if the density is concentrated enough the whole integral $h=-\\int f\\log f$ goes negative. Concretely, a uniform density on $[0,a]$ is $1/a$, giving $h=\\log_2 a$ — which is $-1$ bit for $a=\\tfrac12$. Worse, if you rescale $x\\mapsto cx$ (say, measure in centimetres instead of metres), $h$ shifts by $\\log_2 c$: differential entropy depends on your <em>units</em>.</p>\n<p>The \"aha\": differential entropy is not an absolute bit-count like discrete entropy — it is measured relative to the coordinate system. That sounds fatal, but the cure is built in: KL divergence and mutual information are <em>differences</em> of differential entropies, and the unit-dependent and density-height terms cancel, leaving quantities that are nonnegative and invariant. So we compute $h$ as a stepping stone, but trust the differences.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Gaussian as the maximum-entropy distribution</summary>\n<p>Why does the normal distribution show up as the \"default\" everywhere? One deep reason is a maximum-entropy theorem: <strong>of all densities with a fixed variance $\\sigma^2$, the Gaussian uniquely maximizes the differential entropy.</strong></p>\n<p>The proof is a constrained optimization: maximize $-\\int f\\log f$ subject to $\\int f=1$ and $\\int x^2 f=\\sigma^2$. Setting up the Lagrangian and solving forces $\\log f$ to be a quadratic in $x$, i.e. $f$ is Gaussian. Intuitively, fixing the variance is the only constraint, and the entropy-maximizing choice spreads probability as evenly as that constraint allows — which is the bell curve. (Fix the mean only, on the positive reals, and you instead get the exponential; fix nothing on a bounded interval and you get the uniform.)</p>\n<p>The \"aha\": the maximum-entropy principle says \"assume the least beyond what you know,\" and with only a variance to go on, that least-presumptuous distribution is the Gaussian. This — alongside the central limit theorem — is a principled reason the normal is the natural prior and noise model throughout statistics and ML.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the VAE's Gaussian KL, derived from these entropies</summary>\n<p>The capstone lesson quoted the VAE KL term as a closed form; differential entropy is where it comes from. For two Gaussians the KL has an exact expression built entirely from differential-entropy pieces.</p>\n<p>For a diagonal posterior $q=\\mathcal{N}(\\mu,\\sigma^2)$ against the standard-normal prior $p=\\mathcal{N}(0,1)$, $$D_{\\mathrm{KL}}(q\\|p)=\\tfrac12\\big(\\mu^2+\\sigma^2-1-\\ln\\sigma^2\\big).$$ You can read its parts: the $-\\tfrac12\\ln\\sigma^2$ (up to constants) is the negative differential entropy of $q$ — penalizing a posterior that is too narrow — while the $\\tfrac12(\\mu^2+\\sigma^2)$ is the cross-term that grows as $q$ drifts from the prior's center and unit spread. Minimizing it pulls $\\mu\\to 0$ and $\\sigma\\to 1$. Because it is a KL (a difference of entropies), it is nonnegative and unit-free even though each Gaussian's differential entropy alone is not.</p>\n<p>The \"aha\": the VAE regularizer you computed earlier is differential entropy made useful — the unit-dependent $h$ terms assemble into a clean, invariant KL that measures exactly how far the learned latent code has strayed from its prior, in nats.</p>\n</details>",
          "mcq": [
            {
              "q": "Differential entropy is defined as:",
              "choices": [
                "$\\int x f(x)\\,dx$",
                "$-\\sum_x p(x)\\log p(x)$",
                "$-\\int f(x)\\log f(x)\\,dx$",
                "$\\max_x f(x)$"
              ],
              "answer": 2,
              "explain": "The continuous analogue of entropy: a density-weighted integral of $-\\log f$."
            },
            {
              "q": "Unlike discrete entropy, differential entropy:",
              "choices": [
                "Is always zero",
                "Is always greater than 1",
                "Cannot be computed",
                "Can be negative"
              ],
              "answer": 3,
              "explain": "A density can exceed 1, so $-\\log f$ (and the integral) can be negative."
            },
            {
              "q": "A uniform distribution on $[0,a]$ has differential entropy:",
              "choices": [
                "$\\log_2 a$",
                "$1/a$",
                "$a$",
                "$0$"
              ],
              "answer": 0,
              "explain": "$h=\\log_2 a$ — negative when $a\\lt 1$, zero at $a=1$, positive when $a\\gt 1$."
            },
            {
              "q": "Among all distributions with a fixed variance, which has the maximum differential entropy?",
              "choices": [
                "The uniform",
                "The Gaussian",
                "The exponential",
                "The Laplace"
              ],
              "answer": 1,
              "explain": "The Gaussian is the maximum-entropy distribution for a fixed variance — the 'least presumptuous' choice."
            },
            {
              "q": "Why are KL divergence and mutual information still well-behaved for continuous variables?",
              "choices": [
                "They are differences of differential entropies, so unit-dependent terms cancel",
                "They only work for Gaussians",
                "They are always zero",
                "They ignore the density"
              ],
              "answer": 0,
              "explain": "As differences, the coordinate-dependent and density-height terms cancel, leaving invariant, nonnegative quantities."
            },
            {
              "q": "The differential entropy of a Gaussian is $\\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$. Doubling $\\sigma$:",
              "choices": [
                "Halves the entropy",
                "Leaves it unchanged",
                "Adds exactly 1 bit",
                "Makes it negative"
              ],
              "answer": 2,
              "explain": "Entropy grows with $\\log\\sigma$; doubling $\\sigma$ adds $\\log_2 2=1$ bit."
            },
            {
              "q": "Differential entropy depends on:",
              "choices": [
                "Only the mean",
                "The units in which $x$ is measured",
                "Only the sample size",
                "Nothing — it is invariant"
              ],
              "answer": 1,
              "explain": "Rescaling $x\\mapsto cx$ shifts $h$ by $\\log_2 c$; it is not coordinate-invariant (KL and MI are)."
            },
            {
              "q": "Maximum-entropy reinforcement learning adds to the reward:",
              "choices": [
                "A penalty on entropy",
                "The KL to a uniform prior over states",
                "The channel capacity",
                "A differential-entropy bonus to keep the policy random"
              ],
              "answer": 3,
              "explain": "An entropy bonus keeps the policy as stochastic as possible while earning return — the idea behind soft actor-critic."
            }
          ],
          "flashcards": [
            {
              "front": "Differential entropy $h(X)$",
              "back": "$-\\int f(x)\\log f(x)\\,dx$ — the continuous analogue of entropy. Can be negative; depends on the units of $x$."
            },
            {
              "front": "Why can $h(X)$ be negative?",
              "back": "A density $f$ can exceed 1, so $-\\log f$ can be negative. E.g. Uniform$[0,a]$ has $h=\\log_2 a$, negative for $a\\lt 1$."
            },
            {
              "front": "Gaussian differential entropy",
              "back": "$h=\\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$. The Gaussian maximizes $h$ among all distributions with a given variance."
            },
            {
              "front": "Why KL/MI survive in the continuous case",
              "back": "They are differences of differential entropies, so the unit-dependent terms cancel — leaving nonnegative, coordinate-invariant quantities."
            },
            {
              "front": "Max-entropy principle (continuous)",
              "back": "Fixed variance → Gaussian; fixed mean on $[0,\\infty)$ → exponential; bounded interval, no other constraint → uniform. Assume the least beyond what's known."
            },
            {
              "front": "Where is differential entropy actually used in ML?",
              "back": "Through its differences: continuous KL and mutual information (a VAE's Gaussian KL term, InfoNCE) and the entropy bonus in maximum-entropy RL. The raw $h(X)$ alone is unit-dependent, so only these differences are used."
            }
          ],
          "examples": [
            {
              "title": "Uniform differential entropy — and a negative value",
              "body": "Compute the differential entropy of a uniform distribution on $[0,2]$ and on $[0,0.5]$.",
              "solution": "For Uniform$[0,a]$, the density is $1/a$, so $h=-\\int_0^a \\tfrac1a\\log_2\\tfrac1a\\,dx=\\log_2 a$. On $[0,2]$: $h=\\log_2 2=\\mathbf{1}$ bit. On $[0,0.5]$: $h=\\log_2 0.5=\\mathbf{-1}$ bit — <em>negative</em>, because the density $1/0.5=2$ exceeds 1, something discrete entropy can never do. Concentrating the distribution drives differential entropy down, past zero."
            },
            {
              "title": "Gaussian entropy grows with spread",
              "body": "Using $h=\\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$, compute the differential entropy of a Gaussian with $\\sigma=1$ and with $\\sigma=2$.",
              "solution": "With $\\sigma=1$: $h=\\tfrac12\\log_2(2\\pi e)\\approx\\tfrac12\\log_2(17.08)\\approx\\mathbf{2.05}$ bits. With $\\sigma=2$: $\\sigma^2=4$, so $h=\\tfrac12\\log_2(2\\pi e\\cdot 4)=2.05+\\tfrac12\\log_2 4=2.05+1=\\mathbf{3.05}$ bits. Each doubling of $\\sigma$ adds exactly 1 bit — entropy tracks the log of the spread."
            },
            {
              "title": "Why the Gaussian is the default noise model",
              "body": "You must choose a continuous distribution for a quantity where you only know its variance. What does the maximum-entropy principle recommend, and why?",
              "solution": "It recommends the <b>Gaussian</b>. Among all densities with the given variance, the Gaussian uniquely maximizes differential entropy, so it adds the fewest extra assumptions beyond the one fact you have (the variance). Any other choice secretly encodes more structure than you actually know. This — together with the central limit theorem — is why Gaussian noise and Gaussian priors are the principled defaults across statistics and ML."
            }
          ],
          "homework": [
            {
              "prompt": "Compute the differential entropy of a uniform distribution on $[0,4]$, and state whether it is positive or negative.",
              "hint": "For Uniform$[0,a]$, $h=\\log_2 a$.",
              "solution": "$h=\\log_2 4=\\mathbf{2}$ bits — positive, since $a=4\\gt 1$ (the density $1/4\\lt 1$). For comparison, Uniform$[0,1]$ gives $h=\\log_2 1=0$, and any narrower interval gives a negative differential entropy. Widening the support increases differential entropy by the log of the width."
            },
            {
              "prompt": "A Gaussian has $\\sigma=0.5$. Using $h=\\tfrac12\\log_2(2\\pi e\\,\\sigma^2)$ and the fact that $\\sigma=1$ gives $h\\approx 2.05$ bits, find its differential entropy.",
              "hint": "Halving $\\sigma$ changes $h$ by $\\tfrac12\\log_2$ of the variance ratio — i.e. subtract 1 bit per halving of $\\sigma$.",
              "solution": "Halving $\\sigma$ from 1 to 0.5 multiplies $\\sigma^2$ by $\\tfrac14$, changing $h$ by $\\tfrac12\\log_2\\tfrac14=\\tfrac12(-2)=-1$ bit. So $h\\approx 2.05-1=\\mathbf{1.05}$ bits. (Direct check: $\\tfrac12\\log_2(2\\pi e\\cdot 0.25)=\\tfrac12\\log_2(4.27)\\approx 1.05$.) Each halving of $\\sigma$ removes exactly 1 bit."
            },
            {
              "prompt": "Explain why we can meaningfully minimize a KL divergence between two continuous distributions even though each one's differential entropy depends on the choice of units.",
              "hint": "Write KL as a difference involving $\\int f\\log f$ and $\\int f\\log g$.",
              "solution": "KL is $D_{\\mathrm{KL}}(f\\|g)=\\int f\\log\\frac{f}{g}=\\int f\\log f-\\int f\\log g$ — a <em>difference</em> of terms of the same differential-entropy form. Under a change of units $x\\mapsto cx$, both terms shift by the same $\\log c$, so the shift cancels and the KL is unchanged (coordinate-invariant). It is also always $\\ge 0$. So even though $h(f)$ and $h(g)$ individually are unit-dependent and can be negative, their difference — the KL the VAE actually minimizes — is a clean, invariant, nonnegative quantity."
            }
          ]
        }
      ]
    },
    {
      "id": "it-comparing",
      "title": "Comparing Distributions",
      "lessons": [
        {
          "id": "it-cross-entropy-kl",
          "title": "Cross-Entropy and KL Divergence",
          "minutes": 18,
          "content": "<h3>1. The hook: comparing two distributions</h3>\n<p>Entropy measures the uncertainty in <em>one</em> distribution. But machine learning constantly asks a <em>comparison</em> question: my model predicts a distribution $q$; reality follows a distribution $p$. <em>How wrong is $q$?</em> Two quantities answer this — <strong>cross-entropy</strong> (how surprised $q$ is by $p$'s outcomes) and <strong>KL divergence</strong> (how many <em>extra</em> bits that wrongness costs). Together they are the most-used objects in all of ML: cross-entropy is the loss that trains nearly every classifier and language model.</p>\n<h3>2. Cross-entropy</h3>\n<p>Recall that the optimal code for a distribution uses about $-\\log q(x)$ bits for outcome $x$. <strong>Cross-entropy</strong> asks: if outcomes actually come from $p$ but you encode them with $q$'s code, what is your average bit cost? $$H(p,q) = -\\sum_x p(x)\\log q(x) = \\mathbb{E}_{x\\sim p}[-\\log q(x)].$$ It is the average surprise of $p$'s outcomes <em>measured by $q$</em>. When $q=p$ it reduces to the ordinary entropy $H(p)$.</p>\n<div data-viz=\"dl-cross-entropy\"></div>\n<h3>3. You can never beat the true distribution</h3>\n<p>A fundamental inequality: $$H(p,q)\\ge H(p),$$ with equality only when $q=p$. Using <em>any</em> code other than the one matched to reality costs you more bits on average — there is no free lunch. The gap between them is the price of being wrong, and it has a name.</p>\n<h3>4. KL divergence: the extra bits</h3>\n<p>The <strong>Kullback–Leibler (KL) divergence</strong> is exactly that gap: $$D_{\\mathrm{KL}}(p\\,\\|\\,q) = H(p,q) - H(p) = \\sum_x p(x)\\log\\frac{p(x)}{q(x)}.$$ It measures the <em>extra</em> bits per symbol you pay for using $q$ when the truth is $p$ — the \"wasted surprise.\" So <strong>cross-entropy = entropy + KL</strong>: $H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$.</p>\n<div data-viz=\"dl-kl-divergence\"></div>\n<h3>5. KL is not a distance</h3>\n<p>KL has two key properties. It is <em>nonnegative</em>: $D_{\\mathrm{KL}}(p\\|q)\\ge 0$, and zero only when $p=q$ (this is Gibbs' inequality, the formal version of \"you can't beat the true code\"). But it is <em>not symmetric</em>: in general $D_{\\mathrm{KL}}(p\\|q)\\neq D_{\\mathrm{KL}}(q\\|p)$, and it violates the triangle inequality — so despite being called a \"divergence,\" it is <strong>not a true distance metric</strong>. The direction matters, and choosing which one to minimize changes the answer.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> KL is a weighted sum of log-ratios. For $p=[0.5,0.5]$ and $q=[0.9,0.1]$ it should come out near 0.74 bits — the price of modelling a fair coin as a biased one.</p>\n<div data-code=\"javascript\" data-expected=\"0.74\">// KL divergence D(p||q) = sum p*log2(p/q), in bits\nconst p = [0.5, 0.5], q = [0.9, 0.1];\nconst log2 = x => Math.log(x) / Math.log(2);\nlet kl = 0;\nfor (let i = p.length - 1; i >= 0; i--) kl += p[i] * log2(p[i] / q[i]);\nconsole.log(kl.toFixed(2));</div>\n<h3>7. Why this is the loss function</h3>\n<p>Here is the punchline. To train a classifier, $p$ is the true label (often a one-hot distribution) and $q$ is the model's predicted probabilities. Minimizing the <strong>cross-entropy</strong> $H(p,q)$ over the data is the standard loss. Because $H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$ and $H(p)$ doesn't depend on the model, <em>minimizing cross-entropy is exactly minimizing the KL divergence from your model to reality</em> — and it is mathematically identical to <strong>maximum-likelihood estimation</strong>. For a one-hot label the cross-entropy collapses to $-\\log q(\\text{true class})$, the familiar log-loss: confident-and-right costs almost nothing, confident-and-wrong costs a fortune.</p>\n<h3>8. The big picture</h3>\n<p>Cross-entropy is the average bits to encode reality $p$ with your model $q$; KL divergence is the <em>extra</em> bits over the unbeatable $H(p)$. They satisfy $H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$, with $D_{\\mathrm{KL}}\\ge 0$ and asymmetric. Minimizing cross-entropy = minimizing KL to the truth = maximum likelihood — which is why this one idea, born from coding theory, is the loss behind almost every model you will train.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: minimizing cross-entropy IS maximum likelihood</summary>\n<p>Why is cross-entropy <em>the</em> loss, rather than one of many choices? Because minimizing it is identical to the most principled objective in statistics: maximizing the likelihood of the data.</p>\n<p>For a dataset, the average cross-entropy between the empirical label distribution and the model is $-\\frac{1}{N}\\sum_n \\log q(y_n\\mid x_n)$. That is exactly the <em>negative average log-likelihood</em>. Minimizing it maximizes $\\sum_n \\log q(y_n\\mid x_n)$ — the log-likelihood of the observed labels under the model. So \"minimize cross-entropy,\" \"minimize KL to the data distribution,\" and \"maximum likelihood estimation\" are three names for one procedure.</p>\n<p>The \"aha\": cross-entropy is not an arbitrary loss — it is MLE in disguise. That is why it has the right gradients (the softmax + cross-entropy gradient is the beautifully simple $q-p$), why it pairs naturally with probabilistic models, and why it beat older choices like squared error for classification.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: forward vs reverse KL — mode-covering vs mode-seeking</summary>\n<p>Because KL is asymmetric, $D_{\\mathrm{KL}}(p\\|q)$ and $D_{\\mathrm{KL}}(q\\|p)$ pull a fitted $q$ in <em>different</em> directions, and the choice is a real modeling decision.</p>\n<p><b>Forward KL</b>, $D_{\\mathrm{KL}}(p\\|q)$ (used by maximum likelihood), is <em>mode-covering</em>: it is huge wherever $p$ has mass but $q$ does not ($p\\log\\frac{p}{q}\\to\\infty$ as $q\\to 0$), so $q$ is forced to <em>spread out</em> and cover every mode of $p$, even averaging across them. <b>Reverse KL</b>, $D_{\\mathrm{KL}}(q\\|p)$ (used in variational inference and many RL/VAE objectives), is <em>mode-seeking</em>: it punishes $q$ for putting mass where $p$ has none, so $q$ tends to <em>lock onto a single mode</em> and ignore the rest.</p>\n<p>The \"aha\": \"fit $q$ to $p$\" is ambiguous until you pick a KL direction. Forward KL (MLE) gives blurry, mode-covering fits; reverse KL gives sharp, mode-seeking ones — which is why a VAE's reverse-KL term can cause \"posterior collapse\" and why GANs were sought as an alternative to blurry likelihood fits.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: when you need a real distance — JS divergence and Wasserstein</summary>\n<p>KL's asymmetry and its blow-up when $q(x)=0$ but $p(x)>0$ (it becomes infinite) make it awkward as a \"difference between distributions.\" Two repairs are widely used.</p>\n<p><b>Jensen–Shannon divergence</b> symmetrizes KL by comparing both distributions to their average $m=\\tfrac12(p+q)$: $\\mathrm{JS}(p,q)=\\tfrac12 D_{\\mathrm{KL}}(p\\|m)+\\tfrac12 D_{\\mathrm{KL}}(q\\|m)$. It is symmetric, always finite, and bounded — the original GAN objective is essentially minimizing JS. <b>Wasserstein (earth-mover) distance</b> goes further: it measures the least \"work\" to morph one distribution into the other, and unlike KL/JS it stays meaningful even when the distributions <em>don't overlap</em> — which is why Wasserstein GANs train more stably (KL/JS give no useful gradient for disjoint supports).</p>\n<p>The \"aha\": KL is a divergence, not a distance — fine as a training loss, but for genuinely comparing distributions (especially non-overlapping ones) you reach for symmetric, bounded JS or the geometry-aware Wasserstein distance.</p>\n</details>",
          "mcq": [
            {
              "q": "Cross-entropy $H(p,q)$ measures:",
              "choices": [
                "The entropy of $q$ alone",
                "The number of outcomes",
                "The variance of $p$",
                "The average bits to encode outcomes from $p$ using $q$'s code"
              ],
              "answer": 3,
              "explain": "$H(p,q)=-\\sum p\\log q$: average surprise of $p$'s outcomes measured by $q$."
            },
            {
              "q": "How do cross-entropy, entropy, and KL relate?",
              "choices": [
                "$H(p,q)=H(p)-D_{\\mathrm{KL}}(p\\|q)$",
                "$H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$",
                "They are unrelated",
                "$H(p,q)=D_{\\mathrm{KL}}(p\\|q)$"
              ],
              "answer": 1,
              "explain": "Cross-entropy = entropy + KL; the KL term is the extra bits from using the wrong distribution."
            },
            {
              "q": "KL divergence $D_{\\mathrm{KL}}(p\\|q)$ is always:",
              "choices": [
                "Negative",
                "Symmetric in $p$ and $q$",
                "Nonnegative, and zero only when $p=q$",
                "Equal to 1"
              ],
              "answer": 2,
              "explain": "Gibbs' inequality: $D_{\\mathrm{KL}}\\ge 0$, with equality iff $p=q$."
            },
            {
              "q": "Is KL divergence a true distance metric?",
              "choices": [
                "Only for continuous distributions",
                "Yes, it satisfies all metric axioms",
                "No — it is asymmetric and violates the triangle inequality",
                "Only when $p=q$"
              ],
              "answer": 2,
              "explain": "$D_{\\mathrm{KL}}(p\\|q)\\neq D_{\\mathrm{KL}}(q\\|p)$ in general; it is a divergence, not a metric."
            },
            {
              "q": "Minimizing cross-entropy loss is equivalent to:",
              "choices": [
                "Maximum-likelihood estimation",
                "Minimizing the variance",
                "Maximizing the KL divergence",
                "Maximizing the entropy of the labels"
              ],
              "answer": 0,
              "explain": "Average cross-entropy is the negative log-likelihood, so minimizing it is MLE (and minimizes KL to the data)."
            },
            {
              "q": "For a one-hot true label, cross-entropy reduces to:",
              "choices": [
                "$\\sum_x q(x)^2$",
                "$0$ always",
                "The entropy of $q$",
                "$-\\log q(\\text{true class})$"
              ],
              "answer": 3,
              "explain": "Only the true class has $p=1$, so $H(p,q)=-\\log q(\\text{true class})$ — the log-loss."
            },
            {
              "q": "Forward KL $D_{\\mathrm{KL}}(p\\|q)$ (as in MLE) tends to make the fitted $q$:",
              "choices": [
                "Cover all of $p$'s modes (mode-covering)",
                "Ignore $p$ entirely",
                "Become uniform",
                "Lock onto a single mode"
              ],
              "answer": 0,
              "explain": "Forward KL blows up where $p>0$ but $q\\approx 0$, forcing $q$ to spread over every mode of $p$."
            },
            {
              "q": "Why can KL be a poor choice for comparing two non-overlapping distributions?",
              "choices": [
                "It is too slow to compute",
                "It becomes infinite (or gives no useful gradient) when supports don't overlap",
                "It is always zero",
                "It requires the distributions to be Gaussian"
              ],
              "answer": 1,
              "explain": "If $p(x)>0$ where $q(x)=0$, KL is infinite; Wasserstein distance stays meaningful for disjoint supports."
            }
          ],
          "flashcards": [
            {
              "front": "Cross-entropy $H(p,q)$",
              "back": "$-\\sum_x p(x)\\log q(x)$ — average bits to encode reality $p$ using model $q$'s code. The standard classification/LM loss."
            },
            {
              "front": "KL divergence $D_{\\mathrm{KL}}(p\\|q)$",
              "back": "$\\sum_x p(x)\\log\\frac{p(x)}{q(x)}=H(p,q)-H(p)$ — the EXTRA bits from using $q$ instead of the true $p$. $\\ge 0$, asymmetric."
            },
            {
              "front": "Cross-entropy = ?",
              "back": "$H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$. Since $H(p)$ is fixed, minimizing cross-entropy = minimizing KL to the truth."
            },
            {
              "front": "Why is cross-entropy the loss?",
              "back": "Minimizing it = maximum-likelihood estimation; for a one-hot label it is $-\\log q(\\text{true class})$ (log-loss)."
            },
            {
              "front": "Forward vs reverse KL",
              "back": "Forward $D(p\\|q)$ (MLE) is mode-covering (blurry); reverse $D(q\\|p)$ (variational/VAE) is mode-seeking (sharp, can collapse)."
            },
            {
              "front": "Is KL divergence a distance?",
              "back": "No. $D_{\\mathrm{KL}}(p\\|q)\\ge 0$ with equality iff $p=q$, but it is asymmetric and violates the triangle inequality — a divergence, not a metric. For a true distance use Jensen-Shannon or Wasserstein."
            }
          ],
          "examples": [
            {
              "title": "Cross-entropy: confident-right vs confident-wrong",
              "body": "The true class is class 1 (a one-hot label). The model predicts probability $q=0.9$ for it in one case and $q=0.1$ in another. Compute the cross-entropy (log-loss) in bits for each.",
              "solution": "For a one-hot label, $H(p,q)=-\\log_2 q(\\text{true})$. Confident-right: $-\\log_2 0.9 \\approx \\mathbf{0.15}$ bits — a tiny penalty. Confident-wrong: $-\\log_2 0.1 \\approx \\mathbf{3.32}$ bits — over 20x larger. The asymmetry is the point: cross-entropy barely charges good calibration but punishes confident mistakes harshly (and goes to $\\infty$ as $q(\\text{true})\\to 0$)."
            },
            {
              "title": "KL divergence is asymmetric",
              "body": "Let $p=[0.5,0.5]$ and $q=[0.1,0.9]$. Compute $D_{\\mathrm{KL}}(p\\|q)$ and $D_{\\mathrm{KL}}(q\\|p)$ and confirm they differ.",
              "solution": "$D_{\\mathrm{KL}}(p\\|q)=0.5\\log_2\\tfrac{0.5}{0.1}+0.5\\log_2\\tfrac{0.5}{0.9}=0.5(2.32)+0.5(-0.85)\\approx \\mathbf{0.74}$ bits. $D_{\\mathrm{KL}}(q\\|p)=0.1\\log_2\\tfrac{0.1}{0.5}+0.9\\log_2\\tfrac{0.9}{0.5}=0.1(-2.32)+0.9(0.85)\\approx \\mathbf{0.53}$ bits. They are different ($0.74\\neq 0.53$) — KL is not symmetric, so the direction you minimize matters."
            },
            {
              "title": "Cross-entropy = entropy + KL",
              "body": "For $p=[0.5,0.5]$ and $q=[0.25,0.75]$, compute $H(p)$, $H(p,q)$, and $D_{\\mathrm{KL}}(p\\|q)$, and verify the decomposition.",
              "solution": "$H(p)=1$ bit (fair coin). $H(p,q)=-(0.5\\log_2 0.25 + 0.5\\log_2 0.75)=-(0.5(-2)+0.5(-0.415))=\\mathbf{1.208}$ bits. $D_{\\mathrm{KL}}(p\\|q)=0.5\\log_2\\tfrac{0.5}{0.25}+0.5\\log_2\\tfrac{0.5}{0.75}=0.5(1)+0.5(-0.585)=\\mathbf{0.208}$ bits. Check: $H(p)+D_{\\mathrm{KL}}=1+0.208=1.208=H(p,q)$. ✓"
            }
          ],
          "homework": [
            {
              "prompt": "A model predicts $q=[0.7,0.2,0.1]$ over three classes; the true label is class 1 (one-hot $p=[1,0,0]$). Compute the cross-entropy loss in bits.",
              "hint": "For a one-hot label, $H(p,q)=-\\log_2 q(\\text{true class})$.",
              "solution": "Only the true class contributes: $H(p,q)=-\\log_2 0.7 \\approx \\mathbf{0.51}$ bits. (In nats, the usual ML unit, it would be $-\\ln 0.7\\approx 0.357$.) A perfect prediction $q=1$ gives 0 loss; the further $q(\\text{true})$ is below 1, the higher the loss."
            },
            {
              "prompt": "Show that $D_{\\mathrm{KL}}(p\\|q)=0$ when $p=q$, and explain why it is positive otherwise.",
              "hint": "Plug $p=q$ into $\\sum p\\log(p/q)$; for the general case recall Gibbs' inequality.",
              "solution": "If $p=q$ then every ratio $p(x)/q(x)=1$ and $\\log 1=0$, so the sum is $0$. Otherwise Gibbs' inequality guarantees $D_{\\mathrm{KL}}(p\\|q) > 0$: using any code matched to $q\\neq p$ wastes bits relative to the optimal code for $p$. So KL is zero exactly when the two distributions coincide and strictly positive whenever they differ — it behaves like a 'distance from $p$' even though it is not a metric."
            },
            {
              "prompt": "Explain in one or two sentences why minimizing cross-entropy is the same as minimizing $D_{\\mathrm{KL}}(p\\|q)$ when $p$ is the fixed data distribution.",
              "hint": "Use $H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$ and note which term depends on the model.",
              "solution": "Because $H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$ and the entropy $H(p)$ of the fixed data distribution does not depend on the model $q$, the only part the model can change is $D_{\\mathrm{KL}}(p\\|q)$. So minimizing cross-entropy over $q$ minimizes the KL divergence from the model to the data — driving $q$ toward $p$."
            }
          ]
        }
      ]
    },
    {
      "id": "it-joint",
      "title": "Joint Information and Dependence",
      "lessons": [
        {
          "id": "it-mutual-information",
          "title": "Mutual Information: Shared Uncertainty",
          "minutes": 18,
          "content": "<h3>1. The hook: how much does one variable tell you about another?</h3>\n<p>Entropy measures the uncertainty in a single variable; cross-entropy and KL compare two distributions. <strong>Mutual information</strong> answers a third, deeply practical question: if I learn $Y$, how many bits of uncertainty about $X$ do I lose? It quantifies the <em>shared information</em> between two variables — and unlike correlation, it captures <em>any</em> kind of dependence, linear or not.</p>\n<h3>2. Joint and conditional entropy</h3>\n<p>First we need entropy for pairs. The <strong>joint entropy</strong> $H(X,Y)=-\\sum_{x,y}p(x,y)\\log p(x,y)$ is the total uncertainty in the pair. The <strong>conditional entropy</strong> $H(X\\mid Y)=\\sum_y p(y)\\,H(X\\mid Y{=}y)$ is the uncertainty <em>remaining</em> in $X$ once you know $Y$. They satisfy the intuitive chain rule $$H(X,Y)=H(Y)+H(X\\mid Y):$$ the uncertainty in the pair is the uncertainty in $Y$ plus whatever is left in $X$ after seeing $Y$.</p>\n<h3>3. Mutual information: the uncertainty removed</h3>\n<p><strong>Mutual information</strong> is the drop in uncertainty about $X$ from learning $Y$: $$I(X;Y)=H(X)-H(X\\mid Y).$$ Equivalently, by the chain rule, $I(X;Y)=H(X)+H(Y)-H(X,Y)$ — and it is <em>symmetric</em>, $I(X;Y)=I(Y;X)$, so $Y$ tells you exactly as much about $X$ as $X$ tells you about $Y$. In its raw form it is a KL divergence between the joint and the product of marginals: $$I(X;Y)=\\sum_{x,y}p(x,y)\\log\\frac{p(x,y)}{p(x)\\,p(y)} = D_{\\mathrm{KL}}\\!\\big(p(x,y)\\,\\|\\,p(x)p(y)\\big).$$</p>\n<div data-viz=\"it-mutual-info-viz\"></div>\n<h3>4. Zero exactly when independent</h3>\n<p>That KL form makes a key fact obvious: $I(X;Y)\\ge 0$, and $I(X;Y)=0$ <em>if and only if</em> $X$ and $Y$ are independent (then $p(x,y)=p(x)p(y)$ and the log is zero). Any dependence at all — however nonlinear — gives positive mutual information. This is what makes MI a far more general measure of association than the correlation coefficient.</p>\n<h3>5. MI vs. correlation</h3>\n<p>Correlation only sees <em>linear</em> relationships. Two variables related by $Y=X^2$ (with $X$ symmetric around 0) have <em>zero</em> correlation yet are clearly dependent — and mutual information detects it, because knowing $X$ pins down $Y$. MI = 0 is the true test of independence; correlation = 0 is not. The price is that MI needs the full joint distribution (or a good estimate of it), which is harder to get than a correlation.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> For the correlated joint $p=\\begin{smallmatrix}0.4&0.1\\\\0.1&0.4\\end{smallmatrix}$ (marginals both fair), the mutual information is about 0.28 bits — that is how much one bit tells you about the other here.</p>\n<div data-code=\"javascript\" data-expected=\"0.28\">// Mutual information I(X;Y) = sum p(x,y) * log2( p(x,y) / (p(x)p(y)) )\nconst joint = [[0.4, 0.1], [0.1, 0.4]];\nconst px = [0.5, 0.5], py = [0.5, 0.5];   // row / column sums\nconst log2 = x => Math.log(x) / Math.log(2);\nlet I = 0;\nfor (let i = joint.length - 1; i >= 0; i--)\n  for (let j = joint[i].length - 1; j >= 0; j--) {\n    const p = joint[i][j];\n    if (p > 0) I += p * log2(p / (px[i] * py[j]));\n  }\nconsole.log(I.toFixed(2));</div>\n<h3>7. Where mutual information shows up</h3>\n<p>MI is everywhere in ML. <strong>Decision trees</strong> split on the feature with the highest <em>information gain</em> — which is exactly the mutual information between that feature and the label. <strong>Feature selection</strong> ranks features by their MI with the target. The <strong>information bottleneck</strong> frames learning as keeping the MI between a representation and the label while squeezing out MI with the raw input. And modern <strong>contrastive learning</strong> (InfoNCE) trains representations by maximizing a lower bound on the mutual information between different views of the same data.</p>\n<h3>8. The big picture</h3>\n<p>Mutual information is the shared uncertainty between two variables: $I(X;Y)=H(X)-H(X\\mid Y)=H(X)+H(Y)-H(X,Y)$, symmetric, nonnegative, and zero exactly when they are independent. It is the KL divergence between the joint and the product of marginals — a general, nonlinear measure of dependence that powers information gain, feature selection, the information bottleneck, and contrastive learning.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the information Venn diagram</summary>\n<p>The entropies of two variables fit together like a Venn diagram, and the set operations are <em>literally</em> the information identities.</p>\n<p>Picture two overlapping circles, one of area $H(X)$ and one of area $H(Y)$. Their <em>union</em> is the joint entropy $H(X,Y)$; their <em>intersection</em> is the mutual information $I(X;Y)$; and the part of $X$'s circle outside $Y$'s is the conditional entropy $H(X\\mid Y)$. Every identity drops out by reading the picture: $H(X,Y)=H(X)+H(Y)-I(X;Y)$ (union = sum minus intersection); $I(X;Y)=H(X)-H(X\\mid Y)$ (intersection = circle minus the part outside); $H(X\\mid Y)+I(X;Y)=H(X)$.</p>\n<p>The \"aha\": information quantities obey set algebra. Joint entropy is a union, conditional entropy is a set difference, and mutual information is the intersection — which is why it is symmetric and why \"total = each part plus the shared overlap, counted once\" just works. (The analogy has limits for three or more variables, where the \"interaction information\" can go negative, but for two it is exact.)</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why MI beats correlation</summary>\n<p>Pearson correlation $\\rho$ measures one thing: the strength of a <em>linear</em> relationship. It is blind to everything else, and that blindness is dangerous.</p>\n<p><b>The classic trap.</b> Let $X$ be symmetric about 0 and $Y=X^2$. Then $Y$ is <em>completely determined</em> by $X$ — maximal dependence — yet $\\rho(X,Y)=0$, because the relationship is symmetric and non-monotonic. Anyone trusting correlation would call them unrelated. Mutual information, in contrast, is large: knowing $X$ removes all uncertainty about $Y$, so $I(X;Y)=H(Y)>0$. MI sees the dependence that correlation cannot.</p>\n<p><b>The general statement.</b> $\\rho=0$ does <em>not</em> imply independence (only the converse holds, and even that only loosely); but $I(X;Y)=0$ <em>does</em> imply independence, exactly. That is why MI is the gold-standard dependence measure when you can estimate it — at the cost of needing the joint distribution, whereas correlation needs only second moments.</p>\n<p>The \"aha\": correlation answers \"do they move together in a straight line?\"; mutual information answers \"does knowing one reduce uncertainty about the other, in any way at all?\" Only the second is a true test of independence.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: information gain in decision trees IS mutual information</summary>\n<p>Decision trees and information theory meet exactly here. A tree chooses, at each node, the feature that best \"purifies\" the labels — measured by <strong>information gain</strong>, the drop in label entropy from knowing the feature: $\\mathrm{IG}(Y;F)=H(Y)-H(Y\\mid F)$.</p>\n<p>That formula <em>is</em> the definition of mutual information, $I(Y;F)$. So \"split on the highest-information-gain feature\" means \"split on the feature that shares the most information with the label.\" A feature independent of the label has $I=0$ and is useless for splitting; a feature that determines the label has $I=H(Y)$ and splits it perfectly. The entropy-based impurity criterion (ID3, C4.5) is greedy mutual-information maximization, one node at a time.</p>\n<p>The \"aha\": the decision tree you met in Machine Learning was doing information theory all along — information gain is just mutual information between a candidate split and the target, which is why both fields define \"uncertainty reduced by knowing a feature\" the same way.</p>\n</details>",
          "mcq": [
            {
              "q": "Mutual information $I(X;Y)$ measures:",
              "choices": [
                "The total entropy of the pair",
                "The reduction in uncertainty about $X$ from learning $Y$",
                "The entropy of $Y$ alone",
                "The linear correlation of $X$ and $Y$"
              ],
              "answer": 1,
              "explain": "$I(X;Y)=H(X)-H(X\\mid Y)$ — the bits of uncertainty about $X$ removed by knowing $Y$."
            },
            {
              "q": "Which identity is correct?",
              "choices": [
                "$I(X;Y)=H(X)+H(Y)+H(X,Y)$",
                "$I(X;Y)=H(X,Y)-H(X)$",
                "$I(X;Y)=H(X)+H(Y)-H(X,Y)$",
                "$I(X;Y)=H(X)\\cdot H(Y)$"
              ],
              "answer": 2,
              "explain": "Union minus overlap: $H(X,Y)=H(X)+H(Y)-I(X;Y)$, rearranged."
            },
            {
              "q": "Mutual information equals zero:",
              "choices": [
                "If and only if $X$ and $Y$ are independent",
                "Only if $X=Y$",
                "Whenever the correlation is zero",
                "Never"
              ],
              "answer": 0,
              "explain": "$I=D_{\\mathrm{KL}}(p(x,y)\\|p(x)p(y))=0$ iff $p(x,y)=p(x)p(y)$ — independence."
            },
            {
              "q": "Compared with the correlation coefficient, mutual information:",
              "choices": [
                "Ignores the joint distribution",
                "Only detects linear relationships",
                "Is always equal to the correlation",
                "Detects any dependence, including nonlinear"
              ],
              "answer": 3,
              "explain": "Correlation sees only linear structure; MI captures arbitrary dependence."
            },
            {
              "q": "For $Y=X^2$ with $X$ symmetric about 0, which is true?",
              "choices": [
                "Correlation is high, MI is zero",
                "Correlation is zero, but MI is positive",
                "Both are zero",
                "Both are maximal and equal"
              ],
              "answer": 1,
              "explain": "The relationship is non-monotonic so $\\rho=0$, yet $X$ determines $Y$ so $I(X;Y)>0$."
            },
            {
              "q": "Mutual information is:",
              "choices": [
                "Negative when variables are dependent",
                "Asymmetric in general",
                "Always greater than 1 bit",
                "Symmetric: $I(X;Y)=I(Y;X)$"
              ],
              "answer": 3,
              "explain": "It is the shared overlap, so it is symmetric and nonnegative."
            },
            {
              "q": "A decision tree's 'information gain' for a feature is:",
              "choices": [
                "The variance of the feature",
                "The feature's correlation with the label",
                "The mutual information between the feature and the label",
                "The entropy of the feature"
              ],
              "answer": 2,
              "explain": "$\\mathrm{IG}=H(Y)-H(Y\\mid F)=I(Y;F)$ — mutual information."
            },
            {
              "q": "Conditional entropy $H(X\\mid Y)$ represents:",
              "choices": [
                "The uncertainty remaining in $X$ after $Y$ is known",
                "The uncertainty in $X$ before knowing $Y$",
                "The mutual information",
                "The joint entropy"
              ],
              "answer": 0,
              "explain": "It is the leftover uncertainty in $X$ given $Y$; $H(X)-H(X\\mid Y)=I(X;Y)$."
            }
          ],
          "flashcards": [
            {
              "front": "Mutual information $I(X;Y)$",
              "back": "$H(X)-H(X\\mid Y)=H(X)+H(Y)-H(X,Y)$ — uncertainty about $X$ removed by knowing $Y$. Symmetric, $\\ge 0$."
            },
            {
              "front": "When is $I(X;Y)=0$?",
              "back": "Exactly when $X,Y$ are independent. (It is $D_{\\mathrm{KL}}(p(x,y)\\|p(x)p(y))$, zero iff the joint factors.)"
            },
            {
              "front": "MI vs correlation",
              "back": "Correlation sees only linear relationships; MI detects any dependence. $\\rho=0$ does not imply independence, but $I=0$ does."
            },
            {
              "front": "Conditional entropy $H(X\\mid Y)$",
              "back": "Uncertainty left in $X$ after learning $Y$. Chain rule: $H(X,Y)=H(Y)+H(X\\mid Y)$."
            },
            {
              "front": "Information gain (decision trees)",
              "back": "$H(Y)-H(Y\\mid F)=I(Y;F)$ — the mutual information between a split feature and the label. Trees greedily maximize it."
            },
            {
              "front": "Mutual information as a KL divergence",
              "back": "$I(X;Y)=D_{\\mathrm{KL}}\\big(p(x,y)\\,\\|\\,p(x)p(y)\\big)$ — the KL from the true joint to the product of the marginals. So MI measures, in bits, how far two variables are from being independent."
            }
          ],
          "examples": [
            {
              "title": "Independent variables share no information",
              "body": "Two fair coins are flipped independently, giving joint distribution $p(x,y)=0.25$ for all four pairs. Compute $I(X;Y)$.",
              "solution": "With independence, $p(x,y)=p(x)p(y)=0.5\\times 0.5=0.25$ for every pair, so each log-ratio is $\\log\\frac{0.25}{0.25}=\\log 1=0$. Thus $I(X;Y)=\\mathbf{0}$ bits — independent variables share no information, exactly as mutual information should report. (Equivalently $H(X\\mid Y)=H(X)=1$, so nothing is removed.)"
            },
            {
              "title": "Mutual information as uncertainty removed",
              "body": "$X,Y$ have the correlated joint $[[0.4,0.1],[0.1,0.4]]$, so $H(X)=1$ bit. Given the data, $H(X\\mid Y)\\approx 0.72$ bits. What is $I(X;Y)$, and what does it mean?",
              "solution": "$I(X;Y)=H(X)-H(X\\mid Y)=1-0.72=\\mathbf{0.28}$ bits. Meaning: before seeing $Y$ you have 1 bit of uncertainty about $X$; after seeing $Y$ you have 0.72 bits left, so $Y$ removed 0.28 bits. That matches the direct sum $\\sum p\\log\\frac{p}{p_x p_y}$ — the two formulas always agree."
            },
            {
              "title": "A feature that determines the label",
              "body": "A label $Y$ has entropy $H(Y)=1$ bit. Feature $A$ perfectly determines $Y$ (knowing $A$ leaves no doubt); feature $B$ is independent of $Y$. What is the information gain of each?",
              "solution": "Feature $A$: $H(Y\\mid A)=0$, so $\\mathrm{IG}=I(Y;A)=1-0=\\mathbf{1}$ bit — the maximum; a decision tree would split on it first. Feature $B$: $H(Y\\mid B)=H(Y)=1$, so $\\mathrm{IG}=I(Y;B)=\\mathbf{0}$ — useless for predicting $Y$. Information gain ranks features by exactly this shared information."
            }
          ],
          "homework": [
            {
              "prompt": "Using $H(X)=1$ bit and a measured $H(X\\mid Y)=0.5$ bits, compute the mutual information $I(X;Y)$, and state what fraction of $X$'s uncertainty $Y$ explains.",
              "hint": "$I(X;Y)=H(X)-H(X\\mid Y)$.",
              "solution": "$I(X;Y)=1-0.5=\\mathbf{0.5}$ bits. Since $X$ started with 1 bit of uncertainty and $Y$ removes 0.5, $Y$ explains <b>50%</b> of $X$'s uncertainty. (The ratio $I(X;Y)/H(X)$ is sometimes called the uncertainty coefficient.)"
            },
            {
              "prompt": "Explain why $I(X;Y)=0$ is a stronger statement than $\\rho(X,Y)=0$ (zero correlation).",
              "hint": "Think about a nonlinear relationship like $Y=X^2$.",
              "solution": "$I(X;Y)=0$ means the joint factors as $p(x,y)=p(x)p(y)$ — full statistical independence, so $Y$ carries <em>no</em> information about $X$ of any kind. $\\rho=0$ only means no <em>linear</em> trend: variables like $Y=X^2$ (with $X$ symmetric) have $\\rho=0$ yet are completely dependent, with large $I$. So $I=0$ implies $\\rho=0$, but not the reverse — mutual information is the true independence test."
            },
            {
              "prompt": "A candidate split feature $F$ has the same distribution within every class of the label $Y$. What is its information gain, and should a decision tree use it?",
              "hint": "If $F$'s distribution doesn't change with $Y$, are they dependent?",
              "solution": "If $F$'s distribution is identical across all values of $Y$, then $F$ and $Y$ are independent, so $H(Y\\mid F)=H(Y)$ and the information gain $I(Y;F)=H(Y)-H(Y)=\\mathbf{0}$. The tree should <b>not</b> split on it — it tells you nothing about the label. Trees pick the feature with the largest gain, i.e. the most mutual information with $Y$."
            }
          ]
        }
      ]
    },
    {
      "id": "it-coding",
      "title": "Coding and Communication",
      "lessons": [
        {
          "id": "it-source-coding",
          "title": "Source Coding: Compression and the Entropy Limit",
          "minutes": 18,
          "content": "<h3>1. The hook: how small can a file get?</h3>\n<p>Entropy was introduced as \"average surprise,\" but Shannon gave it a hard, physical meaning: it is the <em>floor</em> on lossless compression. <strong>Source coding</strong> is the art of assigning short bit-strings (codewords) to symbols so that, on average, you use as few bits as possible — and no scheme can ever beat the entropy. This lesson turns the abstract $H$ into the answer to \"how small can this file get?\"</p>\n<h3>2. Codes and the prefix-free property</h3>\n<p>A <strong>code</strong> maps each symbol to a binary string. To decode a stream unambiguously without separators, we use <strong>prefix-free</strong> (instant) codes: no codeword is a prefix of another. Then the codewords are the leaves of a binary tree, and decoding just walks the tree bit by bit. The whole game is to give <em>short</em> codewords to <em>frequent</em> symbols and longer ones to rare symbols — exactly like Morse code, where \"E\" is a single dot.</p>\n<h3>3. Shannon's source coding theorem</h3>\n<p>The central result: for a source with entropy $H$, the expected codeword length $L$ of <em>any</em> uniquely decodable code obeys $$L \\ge H,$$ and you can always design a code with $L < H+1$. Encode long blocks of symbols at once and the per-symbol cost approaches $H$ as closely as you like. So <strong>entropy is the compression limit</strong> — the irreducible bits-per-symbol, achievable but never beatable.</p>\n<h3>4. Why the optimal length is $-\\log p$</h3>\n<p>The theorem's heart: the ideal length for a symbol of probability $p$ is $\\ell = -\\log_2 p$ bits — its self-information. Plug those lengths into the expected length and you get $L=\\sum_x p(x)\\,(-\\log_2 p(x)) = H$ exactly. Frequent symbols ($p$ near 1) get tiny codes; rare symbols get long ones; and the weighted average lands precisely on the entropy. (Real codes use whole-bit lengths, so they round up — hence the \"+1\".)</p>\n<h3>5. Huffman coding</h3>\n<div data-viz=\"it-source-coding-viz\"></div>\n<p><strong>Huffman's algorithm</strong> builds the optimal prefix code with a beautifully simple greedy rule: repeatedly take the <em>two least-likely</em> symbols, merge them into a node whose probability is their sum, and repeat until one node remains. Reading the resulting tree gives each symbol its codeword. Huffman is provably optimal among per-symbol codes — for a <em>dyadic</em> distribution (all probabilities powers of $\\tfrac12$) it hits the entropy exactly; otherwise it stays within 1 bit of it.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> For probabilities $[0.5,0.25,0.125,0.125]$ a Huffman code has lengths $[1,2,3,3]$. Its expected length should equal the entropy exactly (this is a dyadic distribution), 1.75 bits.</p>\n<div data-code=\"javascript\" data-expected=\"1.75\">// Expected code length L = sum p_i * len_i, in bits\nconst p = [0.5, 0.25, 0.125, 0.125];\nconst len = [1, 2, 3, 3];   // a Huffman code for these probabilities\nlet L = 0;\nfor (let i = p.length - 1; i >= 0; i--) L += p[i] * len[i];\nconsole.log(L.toFixed(2));</div>\n<h3>7. Beyond Huffman: arithmetic coding and the compression-prediction link</h3>\n<p>Huffman is stuck with whole-bit codewords, so it wastes up to ~1 bit per symbol. <strong>Arithmetic coding</strong> sidesteps this by encoding an entire message as a single fraction in $[0,1)$, achieving lengths arbitrarily close to the entropy. Both need to know the symbol probabilities — and that is the deep link to machine learning: <em>a better probabilistic model is a better compressor.</em> A language model that predicts the next token well assigns it high probability, hence a short code; modern compressors and LLMs are two faces of the same coin (this is why a model's loss, in nats/bits, literally measures how well it would compress its data).</p>\n<h3>8. The big picture</h3>\n<p>Source coding makes entropy concrete: $H$ is the minimum average bits per symbol for lossless compression, with $L\\ge H$ and the ideal code length $-\\log_2 p$. Huffman builds the optimal per-symbol code by greedy merging; arithmetic coding gets even closer by coding whole sequences. And because compression needs accurate probabilities, prediction and compression are the same problem — the thread connecting Shannon to modern ML.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Kraft inequality — what code lengths are even possible</summary>\n<p>Before asking for the <em>best</em> code, ask which sets of codeword lengths are achievable by a prefix code at all. The <strong>Kraft inequality</strong> answers it: a prefix-free binary code with lengths $\\ell_1,\\dots,\\ell_n$ exists if and only if $$\\sum_i 2^{-\\ell_i} \\le 1.$$</p>\n<p><b>The intuition.</b> Picture the infinite binary tree; a codeword of length $\\ell$ claims a node at depth $\\ell$ and <em>forbids</em> its whole subtree (that's the prefix-free condition). A depth-$\\ell$ node's subtree is a fraction $2^{-\\ell}$ of the leaves, so the claimed fractions can't exceed the whole tree, $1$. Short codewords are \"expensive\" — a length-1 codeword eats half the tree — which is precisely why you spend that budget on the most frequent symbols.</p>\n<p>The \"aha\": Kraft turns \"design a prefix code\" into a clean constraint $\\sum 2^{-\\ell_i}\\le 1$. Minimizing expected length $\\sum p_i\\ell_i$ subject to it (via Lagrange multipliers) gives the optimum $\\ell_i=-\\log_2 p_i$ — which is exactly why the entropy $H=\\sum p_i(-\\log_2 p_i)$ is the achievable floor.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why Huffman's greedy merge is optimal</summary>\n<p>Huffman repeatedly merges the two <em>least</em> probable symbols. That this myopic, local rule yields a globally optimal code is a small marvel, and the proof rests on two facts.</p>\n<p><b>The exchange argument.</b> (1) In an optimal prefix code, the two least-frequent symbols can always be taken to be siblings at the maximum depth — if a rarer symbol sat higher than a more common one, swapping them would lower the expected length, contradicting optimality. (2) Once those two are fixed as siblings, replacing them with a single merged symbol (probability = their sum) gives a smaller problem whose optimal solution extends to the original. Induct, and the greedy merge is optimal.</p>\n<p>The \"aha\": Huffman is a textbook case where greedy is provably optimal (most greedy algorithms aren't). It guarantees the best possible <em>per-symbol</em> prefix code — its only \"weakness\" is the integer-length rounding that arithmetic coding removes by coding whole sequences.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: compression is prediction (and why LLMs are compressors)</summary>\n<p>Source coding needs a probability for each symbol, and the better those probabilities, the shorter the code. This makes <strong>compression and prediction literally the same task.</strong></p>\n<p><b>The equivalence.</b> Given a predictive model $q$, you can build a code (via arithmetic coding) that uses about $-\\log_2 q(x)$ bits per symbol. The expected length is then the <em>cross-entropy</em> $H(p,q)$ — minimized exactly when $q=p$. So \"train a model to minimize cross-entropy\" and \"build the best compressor\" are one objective. A model's loss in bits-per-token <em>is</em> the size it would compress the data to.</p>\n<p><b>Why it matters now.</b> Large language models are, by this logic, state-of-the-art compressors of text: by predicting the next token extremely well they assign it a short code. (Researchers have used LLMs as general-purpose compressors, and \"compression = intelligence\" is a serious framing of why next-token prediction yields such capable models.)</p>\n<p>The \"aha\": every bit of predictive accuracy is a bit saved in compression. Entropy is the limit, cross-entropy is what your model actually achieves, and minimizing it trains a predictor and a compressor at once — the conceptual bridge from Shannon (1948) to today's foundation models.</p>\n</details>",
          "mcq": [
            {
              "q": "Shannon's source coding theorem says the expected length $L$ of any lossless code satisfies:",
              "choices": [
                "$L \\le H$",
                "$L = 2H$",
                "$L$ is unrelated to $H$",
                "$L \\ge H$ (entropy is the floor)"
              ],
              "answer": 3,
              "explain": "No code beats entropy: $L\\ge H$, and you can get within 1 bit (or arbitrarily close by block coding)."
            },
            {
              "q": "A prefix-free (instant) code is one where:",
              "choices": [
                "All codewords have the same length",
                "Codewords are assigned randomly",
                "Every codeword starts with 0",
                "No codeword is a prefix of another"
              ],
              "answer": 3,
              "explain": "The prefix-free property lets you decode a stream unambiguously with no separators."
            },
            {
              "q": "The optimal codeword length for a symbol of probability $p$ is about:",
              "choices": [
                "$-\\log_2 p$ bits",
                "$1/p$ bits",
                "$p$ bits",
                "$2^p$ bits"
              ],
              "answer": 0,
              "explain": "Its self-information; plugging these lengths in makes expected length equal the entropy."
            },
            {
              "q": "Huffman's algorithm repeatedly:",
              "choices": [
                "Merges the two least-probable symbols",
                "Assigns equal-length codes",
                "Sorts symbols alphabetically",
                "Splits the most-probable symbol"
              ],
              "answer": 0,
              "explain": "Greedy bottom-up merging of the two least-likely nodes builds the optimal prefix-code tree."
            },
            {
              "q": "For a dyadic distribution (all probabilities powers of 1/2), a Huffman code achieves:",
              "choices": [
                "Twice the entropy",
                "Exactly the entropy",
                "Half the entropy",
                "Worse than fixed-length coding"
              ],
              "answer": 1,
              "explain": "The ideal lengths $-\\log_2 p$ are integers, so Huffman hits the entropy floor exactly."
            },
            {
              "q": "Compared with Huffman, arithmetic coding:",
              "choices": [
                "Is always worse",
                "Ignores symbol probabilities",
                "Can get arbitrarily close to entropy by coding whole sequences",
                "Only works for two symbols"
              ],
              "answer": 2,
              "explain": "It avoids Huffman's whole-bit rounding by encoding a message as one fraction."
            },
            {
              "q": "Why are prediction and compression considered the same problem?",
              "choices": [
                "They use the same programming language",
                "A better probability model yields shorter codes (length $\\approx -\\log_2 q$)",
                "Both require a GPU",
                "Neither uses probabilities"
              ],
              "answer": 1,
              "explain": "Expected code length under model $q$ is the cross-entropy $H(p,q)$, minimized when $q=p$."
            },
            {
              "q": "What does the Kraft inequality $\\sum_i 2^{-\\ell_i}\\le 1$ characterize?",
              "choices": [
                "The entropy of a Gaussian",
                "The speed of Huffman coding",
                "Which sets of codeword lengths a prefix code can have",
                "The number of symbols allowed"
              ],
              "answer": 2,
              "explain": "A prefix code with those lengths exists iff the inequality holds; short codewords cost more of the tree."
            }
          ],
          "flashcards": [
            {
              "front": "Shannon source coding theorem",
              "back": "Expected length $L\\ge H$ for any lossless code, and achievable within 1 bit (or $\\to H$ by block coding). Entropy = the compression floor."
            },
            {
              "front": "Prefix-free code",
              "back": "No codeword is a prefix of another, so a bit-stream decodes unambiguously. Codewords are the leaves of a binary tree."
            },
            {
              "front": "Optimal codeword length",
              "back": "$\\ell = -\\log_2 p$ (the self-information). With these lengths, expected length $=H$ exactly."
            },
            {
              "front": "Huffman coding",
              "back": "Greedily merge the two least-likely symbols repeatedly. Optimal per-symbol prefix code; equals $H$ for dyadic $p$, else within 1 bit."
            },
            {
              "front": "Compression = prediction",
              "back": "Code length under model $q$ is $\\approx -\\log_2 q$; expected length is cross-entropy $H(p,q)$. A better predictor is a better compressor (why LLMs compress text well)."
            },
            {
              "front": "Huffman vs arithmetic coding",
              "back": "Huffman is the optimal per-symbol prefix code but must use whole-bit lengths; arithmetic coding encodes an entire message as one fraction in $[0,1)$, getting arbitrarily close to the entropy. Both need the symbol probabilities."
            }
          ],
          "examples": [
            {
              "title": "Build a Huffman code by hand",
              "body": "Symbols A,B,C,D with probabilities $0.5, 0.25, 0.125, 0.125$. Build the Huffman code and give each codeword length.",
              "solution": "Merge the two least-likely: C+D = 0.25. Now {A:0.5, B:0.25, (CD):0.25}; merge B+CD = 0.5. Now {A:0.5, (BCD):0.5}; merge to the root. Reading the tree, A is one branch from the root (length <b>1</b>), B is two (length <b>2</b>), and C, D are three each (length <b>3</b>). Expected length $=0.5(1)+0.25(2)+0.125(3)+0.125(3)=\\mathbf{1.75}$ bits — and the entropy is also 1.75, so this dyadic code is perfectly efficient."
            },
            {
              "title": "Huffman beats fixed-length, and stays within a bit of entropy",
              "body": "Three symbols with probabilities $0.4, 0.35, 0.25$. Compare a fixed-length code, the entropy, and a Huffman code.",
              "solution": "Fixed-length needs $\\lceil\\log_2 3\\rceil = 2$ bits per symbol. Entropy: $H=-(0.4\\log_2 0.4 + 0.35\\log_2 0.35 + 0.25\\log_2 0.25)\\approx \\mathbf{1.56}$ bits. Huffman (merge the two smallest, $0.35+0.25=0.6$, then with $0.4$) gives lengths $1,2,2$, so expected length $=0.4(1)+0.35(2)+0.25(2)=\\mathbf{1.60}$ bits. Huffman ($1.60$) beats fixed-length ($2$) and sits just above the entropy floor ($1.56$) — the promised 'within 1 bit.'"
            },
            {
              "title": "Compression as cross-entropy",
              "body": "Your model predicts symbol probabilities $q$, but the true distribution is $p$. What average code length do you pay, and when is it minimized?",
              "solution": "Coding with the model's lengths $-\\log_2 q(x)$ gives expected length $\\sum_x p(x)\\,(-\\log_2 q(x)) = H(p,q)$ — the <em>cross-entropy</em>. It is minimized when $q=p$, where it drops to the entropy $H(p)$. The gap $H(p,q)-H(p)=D_{\\mathrm{KL}}(p\\|q)$ is the wasted bits from an imperfect model. So training a model to minimize cross-entropy is training the best possible compressor for the data."
            }
          ],
          "homework": [
            {
              "prompt": "A source emits 4 symbols with probabilities $0.5, 0.25, 0.125, 0.125$. Compare the bits per symbol of a naive fixed-length code with the entropy.",
              "hint": "Fixed-length needs $\\log_2 4$ bits; entropy is $-\\sum p\\log_2 p$.",
              "solution": "Fixed-length: $\\log_2 4 = \\mathbf{2}$ bits per symbol. Entropy: $H=-(0.5(-1)+0.25(-2)+0.125(-3)+0.125(-3)) = 0.5+0.5+0.375+0.375 = \\mathbf{1.75}$ bits. A Huffman code achieves exactly 1.75, saving 0.25 bits/symbol (12.5%) over fixed-length — because it gives the common symbol a 1-bit code instead of 2."
            },
            {
              "prompt": "Explain why a prefix code cannot give two different symbols codewords 0 and 01.",
              "hint": "Decode the stream '01...' — where does the first codeword end?",
              "solution": "Because 0 is a <em>prefix</em> of 01, the decoder reading '0' cannot tell whether the symbol ended there (codeword 0) or continues (codeword 01) — the stream is ambiguous. The prefix-free rule forbids exactly this: no codeword may be the start of another, which is what makes instant, separator-free decoding possible. (In tree terms, 0 is an internal node on the path to 01, not a leaf.)"
            },
            {
              "prompt": "A language model assigns the actually-occurring next token an average probability such that its cross-entropy is 3 bits/token. What does this say about compressing that text, and what would a better model do?",
              "hint": "Expected code length under the model is the cross-entropy.",
              "solution": "You could losslessly compress the text to about <b>3 bits per token</b> using the model's probabilities (via arithmetic coding) — the cross-entropy <em>is</em> the achievable size. A better model assigns higher probability to the true tokens, lowering $-\\log_2 q$ and thus the cross-entropy, so it both predicts better <em>and</em> compresses smaller. The floor is the text's true entropy $H(p)$; the model wastes $D_{\\mathrm{KL}}(p\\|q)$ extra bits until it matches $p$."
            }
          ]
        }
      ]
    },
    {
      "id": "it-channels",
      "title": "Channels and Noise",
      "lessons": [
        {
          "id": "it-channel-capacity",
          "title": "Channels, Noise, and Capacity",
          "minutes": 18,
          "content": "<h3>1. The hook: sending bits through noise</h3>\n<p>Source coding asked \"how small can a message get?\" The other half of Shannon's theory asks the opposite-facing question: \"how <em>reliably</em> can I send a message through a <em>noisy</em> channel?\" Every real channel — a Wi-Fi link, a scratched DVD, a deep-space radio, even a wire — corrupts some bits. Shannon's stunning answer: there is a precise speed limit, the <strong>capacity</strong>, below which you can communicate with <em>arbitrarily small</em> error, and above which reliable communication is impossible.</p>\n<h3>2. The noisy channel model</h3>\n<p>A channel takes an input symbol $X$ and emits an output $Y$ according to transition probabilities $p(y\\mid x)$ — the noise. The receiver sees $Y$ and must guess $X$. The cleanest example is the <strong>binary symmetric channel (BSC)</strong>: you send a bit, and with \"flip probability\" $p$ it arrives inverted, with probability $1-p$ it arrives intact. Noise is exactly the uncertainty $p(y\\mid x)$ injects between what you sent and what was received.</p>\n<h3>3. Capacity is maximized mutual information</h3>\n<p>How much information actually gets through? Exactly the <strong>mutual information</strong> $I(X;Y)$ between input and output — the bits about $X$ you can recover from $Y$. Since you control the input distribution, the channel's <strong>capacity</strong> is the best you can do: $$C = \\max_{p(x)} I(X;Y).$$ It is measured in bits per channel use. For the BSC the uniform input is optimal and the capacity has a clean form: $$C = 1 - H(p),$$ where $H(p)$ is the binary entropy of the flip probability.</p>\n<div data-viz=\"it-channel-capacity-viz\"></div>\n<h3>4. Reading the BSC capacity</h3>\n<p>That formula tells the whole story. A <em>noiseless</em> channel ($p=0$) has $C = 1-0 = 1$ bit per use — every bit gets through. A <em>useless</em> channel ($p=0.5$) has $C = 1-1 = 0$: the output is a coin flip independent of the input, so no information passes. In between, a 10% flip rate ($p=0.1$) leaves $C = 1 - H(0.1) \\approx 0.53$ bits per use — noise cuts your effective rate roughly in half, but does not destroy it.</p>\n<h3>5. Shannon's noisy-channel coding theorem</h3>\n<p>The theorem that founded the digital age: for any rate $R \\lt  C$, there exist codes that make the error probability <em>as small as you like</em>; for any rate $R \\gt  C$, reliable communication is <em>impossible</em>. The trick is to add structured <strong>redundancy</strong> and encode long blocks, so noise can be detected and corrected. The astonishing part is that error can vanish while the rate stays a positive fraction of capacity — you do <em>not</em> have to slow to a crawl to beat noise.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> The binary symmetric channel's capacity is $C = 1 - H(p)$. For a 10% flip probability it should be about 0.53 bits per use.</p>\n<div data-code=\"javascript\" data-expected=\"0.53\">// Binary symmetric channel capacity: C = 1 - H(p), p = flip probability\nconst p = 0.1;\nconst log2 = x => Math.log(x) / Math.log(2);\nconst Hb = (p <= 0 || p >= 1) ? 0 : -(p * log2(p) + (1 - p) * log2(1 - p));\nconst C = 1 - Hb;\nconsole.log(C.toFixed(2));</div>\n<h3>7. Error-correcting codes</h3>\n<p>How do we actually approach capacity? With <strong>error-correcting codes</strong> that add redundancy cleverly. The naive idea — a <em>repetition code</em> (send each bit three times, take the majority) — works but is wildly inefficient (rate $1/3$ to cut a 10% error to ~3%). Real codes do far better: <em>Hamming</em> codes correct single-bit errors with little overhead, and modern <em>LDPC</em> and <em>turbo</em> codes get within a whisker of the Shannon limit. They are everywhere — Wi-Fi, 5G, QR codes, SSDs, and the Voyager probes still phoning home from interstellar space.</p>\n<h3>8. The big picture</h3>\n<p>A noisy channel has a capacity $C=\\max_{p(x)} I(X;Y)$ — for the BSC, $C=1-H(p)$ — and Shannon's coding theorem says you can communicate with vanishing error at any rate below $C$ and not above it. Together with source coding, this is the two-part foundation of all digital communication and storage: squeeze out redundancy to hit the entropy, then <em>add structured redundancy back</em> to beat the noise.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why capacity is the maximum over input distributions</summary>\n<p>Capacity is $C=\\max_{p(x)} I(X;Y)$ — but why the <em>maximum</em>, and why over the <em>input</em> distribution?</p>\n<p>The channel's noise $p(y\\mid x)$ is fixed; what you control is how often you send each symbol, i.e. $p(x)$. The mutual information $I(X;Y)=H(Y)-H(Y\\mid X)$ measures how many bits get through, and it changes with $p(x)$: the term $H(Y\\mid X)$ (the noise) is set by the channel, but $H(Y)$ (the output's spread) is yours to maximize. Capacity is the <em>best</em> achievable, so you optimize over all input distributions. For the BSC, symmetry makes the uniform input optimal, giving $H(Y)=1$ and $H(Y\\mid X)=H(p)$, hence $C=1-H(p)$.</p>\n<p>The \"aha\": capacity is a single number that summarizes a channel by the most information it can carry under the smartest input strategy. It is mutual information again — the same quantity that measures dependence now measures throughput — pushed to its maximum over the one thing the sender controls.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the coding theorem and the magic of random codes</summary>\n<p>The forward half of the noisy-channel theorem (rates below $C$ are achievable) has one of the most beautiful proofs in the subject — and it is <em>non-constructive</em>.</p>\n<p><b>Random coding.</b> Shannon did not exhibit a clever code; he showed that a code chosen <em>at random</em> works, on average, with vanishing error for any rate $R\\lt C$. The intuition: spread $2^{nR}$ random codewords through the space of length-$n$ blocks. Noise nudges a sent codeword into a \"typical\" cloud around it; as $n$ grows these clouds occupy a $2^{nH(Y\\mid X)}$-sized region while the total output space holds $2^{nH(Y)}$ typical sequences. You can pack about $2^{n(H(Y)-H(Y\\mid X))}=2^{nC}$ non-overlapping clouds — so up to rate $C$ the decoder can tell codewords apart. The <em>converse</em> (rates above $C$ must fail) uses Fano's inequality.</p>\n<p>The \"aha\": reliable communication over noise is not only possible but achievable with a <em>positive</em> fraction of capacity and exponentially small error — and the existence proof needs no ingenuity, just randomness and the law of large numbers (\"typical sequences\"). Decades of work since then has been about finding <em>practical</em> codes (LDPC, turbo, polar) that match what random codes promised.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the source-channel separation theorem</summary>\n<p>We have two halves — source coding (squeeze out redundancy down to entropy) and channel coding (add redundancy back to beat noise). A natural worry: should they be designed <em>together</em> for best results? Shannon's <strong>separation theorem</strong> says no.</p>\n<p>For a wide class of sources and channels, you lose nothing by doing the two stages <em>separately</em>: first compress the source to its entropy $H$, then protect the compressed bits with a channel code at any rate below capacity $C$. Reliable end-to-end transmission is possible if and only if $H \\lt  C$ — source entropy below channel capacity. This modularity is why your devices have a clean split between a <em>compressor</em> (JPEG, MP3, H.264) and a separate <em>error-correction</em> layer (the modem/Wi-Fi codes), designed by different engineers and freely mixed.</p>\n<p>The \"aha\": \"remove redundancy, then add the right redundancy back\" is not a contradiction but an <em>optimal</em> two-stage design — separation says the source and channel problems can be solved independently with no loss, which is the architectural backbone of all modern communication systems. (The clean separation can break in networks or with delay/complexity limits, where joint source-channel coding helps.)</p>\n</details>",
          "mcq": [
            {
              "q": "The capacity of a channel is defined as:",
              "choices": [
                "The maximum of $I(X;Y)$ over input distributions",
                "The minimum mutual information",
                "The entropy of the noise",
                "The output entropy $H(Y)$"
              ],
              "answer": 0,
              "explain": "$C=\\max_{p(x)} I(X;Y)$ — the most information per use, optimized over the input you control."
            },
            {
              "q": "For a binary symmetric channel with flip probability $p$, the capacity is:",
              "choices": [
                "$H(p)$",
                "$p$",
                "$1-H(p)$",
                "$1-p$"
              ],
              "answer": 2,
              "explain": "Uniform input is optimal, giving $C=1-H(p)$ bits per use."
            },
            {
              "q": "A BSC with $p=0.5$ has capacity:",
              "choices": [
                "1 bit",
                "0 (no information passes)",
                "0.5 bits",
                "Infinite"
              ],
              "answer": 1,
              "explain": "$C=1-H(0.5)=1-1=0$: the output is independent of the input."
            },
            {
              "q": "Shannon's noisy-channel coding theorem says reliable communication is possible:",
              "choices": [
                "At any rate",
                "Only at rate 0",
                "At any rate below the capacity $C$",
                "Only with infinite power"
              ],
              "answer": 2,
              "explain": "For $R\\lt C$ error can be made arbitrarily small; for $R\\gt C$ it cannot."
            },
            {
              "q": "A noiseless channel ($p=0$) has capacity:",
              "choices": [
                "0",
                "1 bit per use",
                "Infinite",
                "$H(0)$ which is undefined"
              ],
              "answer": 1,
              "explain": "$C=1-H(0)=1-0=1$ bit per use — every bit gets through."
            },
            {
              "q": "How do we approach capacity in practice?",
              "choices": [
                "By adding structured redundancy (error-correcting codes)",
                "By removing all redundancy",
                "By lowering the voltage",
                "By sending faster"
              ],
              "answer": 0,
              "explain": "Codes like Hamming, LDPC, and turbo add redundancy to detect and correct noise."
            },
            {
              "q": "A 3x repetition code (majority vote) is:",
              "choices": [
                "Optimal",
                "Better than LDPC codes",
                "Unable to correct any errors",
                "Simple but inefficient (low rate for its protection)"
              ],
              "answer": 3,
              "explain": "Rate 1/3 to cut a 10% error to ~3%; real codes do far better near the Shannon limit."
            },
            {
              "q": "The separation theorem states that source coding and channel coding:",
              "choices": [
                "Must always be designed jointly",
                "Are the same operation",
                "Cannot be combined",
                "Can be designed separately with no loss (compress, then protect)"
              ],
              "answer": 3,
              "explain": "Separate stages are optimal for point-to-point channels; reliable transmission needs $H\\lt C$."
            }
          ],
          "flashcards": [
            {
              "front": "Channel capacity",
              "back": "$C=\\max_{p(x)} I(X;Y)$ — the maximum mutual information between input and output, in bits per channel use. The reliable-communication speed limit."
            },
            {
              "front": "Binary symmetric channel capacity",
              "back": "$C=1-H(p)$ for flip probability $p$. $p=0\\Rightarrow C=1$; $p=0.5\\Rightarrow C=0$."
            },
            {
              "front": "Noisy-channel coding theorem",
              "back": "For any rate $R\\lt C$, error can be made arbitrarily small; for $R\\gt C$, reliable communication is impossible."
            },
            {
              "front": "How to approach capacity",
              "back": "Add structured redundancy: error-correcting codes (Hamming, LDPC, turbo). Repetition works but is inefficient."
            },
            {
              "front": "Separation theorem",
              "back": "Source coding (compress to entropy $H$) and channel coding (protect up to capacity $C$) can be done separately with no loss; transmit reliably iff $H\\lt C$."
            },
            {
              "front": "Why is channel capacity a maximum over inputs?",
              "back": "$C=\\max_{p(x)} I(X;Y)$: the channel's noise $p(y\\mid x)$ is fixed, but you choose how often to send each symbol, so capacity is the most information per use under the best input distribution. For the BSC the uniform input is optimal."
            }
          ],
          "examples": [
            {
              "title": "Capacity across noise levels",
              "body": "Compute the BSC capacity for flip probabilities $p=0$, $p=0.1$, and $p=0.5$, and interpret each.",
              "solution": "$C=1-H(p)$. At $p=0$: $C=1-0=\\mathbf{1}$ bit/use — perfect channel. At $p=0.1$: $H(0.1)\\approx 0.47$, so $C\\approx\\mathbf{0.53}$ bits/use — noise roughly halves the rate. At $p=0.5$: $H(0.5)=1$, so $C=\\mathbf{0}$ — output independent of input, nothing gets through. Capacity falls smoothly from 1 to 0 as the channel goes from perfect to useless, bottoming out at the maximally-confusing $p=0.5$."
            },
            {
              "title": "A repetition code reduces errors",
              "body": "Over a BSC with flip probability $p=0.1$, you send each bit three times and decode by majority vote. What is the resulting bit-error probability?",
              "solution": "A majority-of-3 vote is wrong only if 2 or 3 of the copies flip: $P=\\binom{3}{2}p^2(1-p)+p^3 = 3(0.1)^2(0.9)+(0.1)^3 = 0.027+0.001=\\mathbf{0.028}$. The error drops from 10% to ~2.8% — but at a cost: the rate fell to $1/3$ bit per use, far below the capacity $0.53$. Good codes achieve similar reliability much closer to capacity."
            },
            {
              "title": "Can this source go through this channel?",
              "body": "A source has entropy $H=0.6$ bits/symbol. You must send it over a BSC with $p=0.1$ (capacity $\\approx 0.53$ bits/use), one symbol per use. Is reliable transmission possible?",
              "solution": "By the separation theorem, reliable transmission needs $H \\lt  C$. Here $H=0.6$ but $C\\approx 0.53$, so $H\\gt C$ — it is <b>not</b> possible at one channel use per symbol. You would need a higher-capacity channel (less noise), more channel uses per source symbol, or some loss. If instead $H=0.4 \\lt  0.53$, it would be achievable: compress to ~0.4 bits, then channel-code below 0.53."
            }
          ],
          "homework": [
            {
              "prompt": "A binary symmetric channel has flip probability $p=0.2$. Compute its capacity (use $H(0.2)\\approx 0.72$).",
              "hint": "$C=1-H(p)$.",
              "solution": "$C=1-H(0.2)=1-0.72=\\mathbf{0.28}$ bits per channel use. A 20% flip rate leaves only about 0.28 bits of reliable information per use — noisier channels have lower capacity, reaching 0 at $p=0.5$."
            },
            {
              "prompt": "Explain why a channel with flip probability $p=0.5$ carries zero information, and what happens for $p$ near 1.",
              "hint": "Think about whether the output depends on the input; and what flipping (almost) every bit means.",
              "solution": "At $p=0.5$ the output is a fair coin regardless of the input, so $Y$ is independent of $X$, $I(X;Y)=0$, and $C=1-H(0.5)=0$ — no information passes. For $p$ near 1, almost every bit flips, but that is <em>predictable</em>: just invert the received bits and you are back to a near-noiseless channel. So capacity is symmetric, $C(p)=C(1-p)$, high near both $p=0$ and $p=1$, and zero only at the maximally-confusing $p=0.5$."
            },
            {
              "prompt": "A source produces 1.2 bits/symbol of entropy and must be sent over a channel of capacity 0.8 bits/use. Using the separation theorem, can it be sent reliably at one use per symbol? What is one fix?",
              "hint": "Compare $H$ to $C$.",
              "solution": "No: reliable transmission requires $H\\lt C$, but $H=1.2\\gt 0.8=C$, so at one channel use per symbol it is impossible without loss. One fix is to use <b>more channel uses per source symbol</b> — e.g. 2 uses per symbol gives $2\\times 0.8=1.6$ bits of capacity per symbol, comfortably above $1.2$. (Alternatives: a less noisy channel, or lossy compression that drops $H$ below $C$.)"
            }
          ]
        }
      ]
    },
    {
      "id": "it-in-ml",
      "title": "Information in Machine Learning",
      "lessons": [
        {
          "id": "it-information-in-ml",
          "title": "Information Theory in Machine Learning",
          "minutes": 18,
          "content": "<h3>1. The hook: the hidden language of ML</h3>\n<p>By now the surprise should be how <em>often</em> information theory has shown up in the rest of this codex — usually unnamed. The classification loss, the VAE's regularizer, the RLHF leash, decision-tree splits, a language model's score: all are entropy, cross-entropy, KL, or mutual information in disguise. This capstone collects those threads so you can see the single language underneath modern machine learning.</p>\n<h3>2. Cross-entropy: the default loss</h3>\n<p>Almost every classifier and language model is trained by minimizing <strong>cross-entropy</strong> $H(p,q)=-\\sum_x p(x)\\log q(x)$ between the true labels $p$ and the model's predictions $q$. For a one-hot label this is just $-\\log q(\\text{true})$, the log-loss. As we saw, minimizing it equals minimizing $D_{\\mathrm{KL}}(p\\|q)$ (since $H(p)$ is fixed) and is identical to <strong>maximum-likelihood estimation</strong>. The softmax-plus-cross-entropy gradient is the elegant $q-p$. Information theory is not adjacent to training — it <em>is</em> the objective.</p>\n<h3>3. KL divergence as a regularizer</h3>\n<p>KL divergence shows up whenever you want a learned distribution to stay near a reference. In a <strong>variational autoencoder</strong>, the loss is reconstruction error plus $D_{\\mathrm{KL}}\\big(q(z\\mid x)\\,\\|\\,p(z)\\big)$, pulling the encoder's latent posterior toward a standard-normal prior. In <strong>RLHF</strong>, a KL penalty keeps the fine-tuned policy close to the reference model so it doesn't drift into reward-gaming gibberish. In <strong>variational inference</strong> generally, fitting an approximate posterior <em>is</em> minimizing a KL. The same \"extra bits\" quantity becomes a knob for \"stay close to what you trust.\"</p>\n<h3>4. Compute it yourself</h3>\n<p><b>Try it in code.</b> The VAE's KL term has a clean closed form against a standard-normal prior: $\\mathrm{KL}\\big(\\mathcal{N}(\\mu,\\sigma^2)\\,\\|\\,\\mathcal{N}(0,1)\\big)=\\tfrac12(\\mu^2+\\sigma^2-1-\\ln\\sigma^2)$. For $\\mu=1,\\sigma=1$ it is 0.5 — the cost of sitting one unit off the prior's center.</p>\n<div data-code=\"javascript\" data-expected=\"0.50\">// VAE KL term: KL( N(mu, sigma^2) || N(0,1) ) = 0.5 * (mu^2 + sigma^2 - 1 - ln(sigma^2))\nconst mu = 1, sigma = 1;\nconst kl = 0.5 * (mu * mu + sigma * sigma - 1 - Math.log(sigma * sigma));\nconsole.log(kl.toFixed(2));</div>\n<h3>5. Mutual information objectives</h3>\n<p>Mutual information powers a whole family of methods. <strong>Decision trees</strong> split on the feature of highest information gain — the MI between feature and label. <strong>Feature selection</strong> ranks inputs by their MI with the target. <strong>Contrastive learning</strong> (InfoNCE, SimCLR) trains representations by maximizing a lower bound on the MI between two views of the same datum. And the <strong>information bottleneck</strong> frames a good representation $T$ of input $X$ as one that maximizes $I(T;Y)$ (keep what predicts the label) while minimizing $I(T;X)$ (throw away the rest).</p>\n<h3>6. Perplexity: a model's surprise, exponentiated</h3>\n<p>A language model's headline metric, <strong>perplexity</strong>, is pure information theory: it is $2^{H(p,q)}$ (or $e^{H}$ in nats) — the cross-entropy exponentiated. It reads as the model's \"effective branching factor\": a perplexity of 8 means the model is as uncertain as if it were choosing uniformly among 8 equally-likely next tokens. Lower cross-entropy → lower perplexity → a model less surprised by real text (and, equivalently, a better compressor of it).</p>\n<h3>7. Minimum description length and Occam's razor</h3>\n<p>Information theory even formalizes <em>simplicity</em>. The <strong>minimum description length (MDL)</strong> principle says the best model is the one that minimizes the total bits to describe <em>the model plus the data given the model</em>: $L(\\text{model})+L(\\text{data}\\mid\\text{model})$. A more complex model fits the data in fewer bits but costs more to describe; the sweet spot is Occam's razor made quantitative — and it connects directly to regularization (a penalty on model complexity) and to the Bayesian \"Occam factor.\" Compression and learning are, once more, the same pursuit.</p>\n<h3>8. The big picture</h3>\n<p>Information theory is the connective tissue of machine learning: cross-entropy is the loss (= MLE = min KL to the data), KL is the regularizer toward a prior (VAEs, RLHF, variational inference), mutual information is the objective for splits, features, and representations (trees, InfoNCE, the information bottleneck), perplexity is the headline metric, and MDL makes Occam's razor precise. Entropy started as \"average surprise\" — and ended up underpinning how every modern model is trained, measured, and regularized.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the ELBO — why the VAE loss has a KL term</summary>\n<p>The VAE wants to maximize the data likelihood $\\log p(x)$, but that integral is intractable. The trick is the <strong>evidence lower bound (ELBO)</strong>, and a KL divergence falls right out of the algebra.</p>\n<p>Introduce an approximate posterior $q(z\\mid x)$. A short derivation gives $\\log p(x) = \\mathrm{ELBO} + D_{\\mathrm{KL}}\\big(q(z\\mid x)\\,\\|\\,p(z\\mid x)\\big)$, where $$\\mathrm{ELBO} = \\mathbb{E}_{q}[\\log p(x\\mid z)] - D_{\\mathrm{KL}}\\big(q(z\\mid x)\\,\\|\\,p(z)\\big).$$ Since the leftover KL is $\\ge 0$, the ELBO is a <em>lower bound</em> on $\\log p(x)$, and maximizing it both fits the data and tightens the bound. Read the two ELBO terms: the first is <em>reconstruction</em> (decode $z$ back to $x$); the second is the <em>regularizer</em> pulling the latent code toward the prior. That second term is exactly the KL you compute in the exercise above.</p>\n<p>The \"aha\": the VAE's mysterious \"reconstruction + KL\" loss is not ad hoc — it is the ELBO, a variational lower bound on the log-likelihood, with the KL term measuring the gap between your approximate and true posteriors. Information theory turns an intractable likelihood into a trainable objective.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the information bottleneck view of deep learning</summary>\n<p>The <strong>information bottleneck (IB)</strong> principle (Tishby) recasts supervised learning as a compression problem. A representation $T$ of the input $X$ should keep everything relevant to the label $Y$ and discard everything else — formally, minimize $$I(T;X) - \\beta\\, I(T;Y),$$ trading off compression of the input against prediction of the label.</p>\n<p><b>A lens on neural nets.</b> The IB framing suggests deep networks learn in two phases: a fast <em>fitting</em> phase that increases $I(T;Y)$ (grab the label-relevant signal), then a slower <em>compression</em> phase that decreases $I(T;X)$ (forget nuisance details of the input), squeezing the representation toward the minimal sufficient statistic. Whether this picture holds universally is debated, but it gives a principled, information-theoretic story for <em>why</em> good representations generalize: they have thrown away input information that doesn't help predict $Y$.</p>\n<p>The \"aha\": \"learn a good representation\" can be stated entirely in bits — keep $I(T;Y)$, shed $I(T;X)$. The information bottleneck makes generalization a compression phenomenon, linking deep learning back to Shannon's rate-distortion ideas.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: MDL, Occam's razor, and regularization</summary>\n<p>Why prefer a simpler model? <strong>Minimum description length</strong> answers in bits: the best hypothesis minimizes $L(H) + L(D\\mid H)$ — the bits to state the model <em>plus</em> the bits to encode the data using it. This is Occam's razor made quantitative, with a built-in defense against overfitting.</p>\n<p><b>The trade.</b> A more complex model compresses the data better (small $L(D\\mid H)$) but costs more to describe (large $L(H)$); an overly simple model is cheap to state but fits poorly. The minimum of the sum is the right complexity — no separate validation set required, in principle. And it connects straight to the rest of ML: $L(D\\mid H)$ is essentially the negative log-likelihood (cross-entropy), and $L(H)$ is a complexity penalty — i.e. <em>regularization</em>. A Gaussian prior on weights corresponds to an L2 penalty; a sparse prior to L1. The Bayesian \"Occam factor\" is the same idea: marginal likelihood automatically penalizes models that can explain too much.</p>\n<p>The \"aha\": \"the simplest model that fits\" is not a vague heuristic but a coding problem — minimize total description length. Regularization, the bias-variance trade, and Bayesian model selection are all MDL wearing different clothes, and all are information theory: learning is compression.</p>\n</details>",
          "mcq": [
            {
              "q": "The standard classification / language-model loss is:",
              "choices": [
                "Cross-entropy between labels and predictions",
                "Mutual information",
                "Channel capacity",
                "Joint entropy"
              ],
              "answer": 0,
              "explain": "Cross-entropy $H(p,q)$; minimizing it equals MLE and minimizing KL to the data."
            },
            {
              "q": "In a VAE, the KL term in the loss does what?",
              "choices": [
                "Maximizes reconstruction error",
                "Pulls the latent posterior toward the prior",
                "Computes the channel capacity",
                "Removes the need for a decoder"
              ],
              "answer": 1,
              "explain": "$D_{\\mathrm{KL}}(q(z|x)\\|p(z))$ regularizes the encoder's posterior toward the prior."
            },
            {
              "q": "A language model's perplexity equals:",
              "choices": [
                "Its accuracy",
                "The number of parameters",
                "The KL to a uniform model",
                "$2^{H}$ — the cross-entropy exponentiated"
              ],
              "answer": 3,
              "explain": "Perplexity is the exponentiated cross-entropy, the 'effective branching factor.'"
            },
            {
              "q": "The information bottleneck describes a good representation $T$ as one that:",
              "choices": [
                "Maximizes $I(T;X)$",
                "Has zero mutual information with everything",
                "Maximizes $I(T;Y)$ while minimizing $I(T;X)$",
                "Equals the input exactly"
              ],
              "answer": 2,
              "explain": "Keep label-relevant info $I(T;Y)$; discard the rest $I(T;X)$ — compression that preserves prediction."
            },
            {
              "q": "In RLHF, the KL penalty between the policy and the reference model:",
              "choices": [
                "Speeds up sampling",
                "Keeps the policy from drifting into reward-gaming behavior",
                "Replaces the reward model",
                "Increases the reward unboundedly"
              ],
              "answer": 1,
              "explain": "The KL leash keeps the fine-tuned policy close to the trusted reference."
            },
            {
              "q": "Minimum description length says the best model minimizes:",
              "choices": [
                "Only the training error",
                "The number of layers",
                "$L(\\text{model}) + L(\\text{data}\\mid\\text{model})$ in bits",
                "The entropy of the labels"
              ],
              "answer": 2,
              "explain": "Total bits to describe the model plus the data given it — Occam's razor as compression."
            },
            {
              "q": "Contrastive methods like InfoNCE train representations by:",
              "choices": [
                "Minimizing entropy of the input",
                "Minimizing the number of features",
                "Maximizing the channel capacity",
                "Maximizing a lower bound on mutual information between views"
              ],
              "answer": 3,
              "explain": "They push up a tractable lower bound on $I$ between two augmentations of the same datum."
            },
            {
              "q": "Why is minimizing cross-entropy the same as maximum likelihood?",
              "choices": [
                "Average cross-entropy is the negative log-likelihood of the labels",
                "They use different data",
                "Cross-entropy ignores the labels",
                "It only holds for regression"
              ],
              "answer": 0,
              "explain": "$-\\frac{1}{N}\\sum\\log q(y_n|x_n)$ is both the average cross-entropy and the negative average log-likelihood."
            }
          ],
          "flashcards": [
            {
              "front": "Cross-entropy in ML",
              "back": "The default classifier/LM loss $H(p,q)$; minimizing it = MLE = minimizing $D_{\\mathrm{KL}}(p\\|q)$. Softmax+CE gradient is $q-p$."
            },
            {
              "front": "KL divergence as a regularizer",
              "back": "Pulls a learned distribution toward a reference: VAE latent→prior, RLHF policy→reference model, variational inference→true posterior."
            },
            {
              "front": "Perplexity",
              "back": "$2^{H(p,q)}$ (or $e^H$) — cross-entropy exponentiated; a model's 'effective branching factor.' Lower = less surprised, better compressor."
            },
            {
              "front": "Information bottleneck",
              "back": "A good representation $T$ maximizes $I(T;Y)$ (keep label info) while minimizing $I(T;X)$ (compress the input) — generalization as compression."
            },
            {
              "front": "Minimum description length (MDL)",
              "back": "Best model minimizes $L(\\text{model})+L(\\text{data}\\mid\\text{model})$ in bits — Occam's razor as compression; equivalent to NLL + a complexity penalty (regularization)."
            },
            {
              "front": "How does contrastive learning use information theory?",
              "back": "Methods like InfoNCE and SimCLR train representations by maximizing a lower bound on the mutual information between two augmented views of the same datum — information theory turned into a self-supervised objective."
            }
          ],
          "examples": [
            {
              "title": "Cross-entropy loss is negative log-likelihood",
              "body": "A 3-class classifier predicts $q=[0.7,0.2,0.1]$; the true class is class 1 (one-hot). What is the cross-entropy loss (in nats), and how does it relate to likelihood?",
              "solution": "For a one-hot label, $H(p,q)=-\\ln q(\\text{true})=-\\ln 0.7\\approx \\mathbf{0.357}$ nats. This is exactly the negative log-likelihood of the observed label under the model. Averaging it over the dataset is what training minimizes — so 'minimize cross-entropy' and 'maximize likelihood' are the same instruction, and a confident-correct prediction ($q\\to 1$) drives the loss to 0."
            },
            {
              "title": "The VAE KL term pulls toward the prior",
              "body": "Compute the VAE KL term $\\tfrac12(\\mu^2+\\sigma^2-1-\\ln\\sigma^2)$ for a latent unit with $(\\mu,\\sigma)=(0,1)$ and for $(\\mu,\\sigma)=(2,1)$.",
              "solution": "At $(0,1)$: $\\tfrac12(0+1-1-\\ln 1)=\\tfrac12(0)=\\mathbf{0}$ — the posterior already <em>is</em> the standard-normal prior, so no penalty. At $(2,1)$: $\\tfrac12(4+1-1-0)=\\tfrac12(4)=\\mathbf{2}$ nats — sitting two units off-center costs 2 nats. The KL term is the price of straying from the prior; the reconstruction term must justify paying it."
            },
            {
              "title": "From cross-entropy to perplexity",
              "body": "A language model achieves a cross-entropy of 3 bits per token on held-out text. What is its perplexity, and what does it mean?",
              "solution": "Perplexity $=2^{H}=2^{3}=\\mathbf{8}$. It means the model is, on average, as uncertain about the next token as if it were guessing uniformly among 8 equally-likely options. Halve nothing else but improve the model so cross-entropy drops to 2 bits, and perplexity falls to $2^2=4$ — and the text would compress to ~2 bits/token instead of 3. Lower cross-entropy is simultaneously better prediction, lower perplexity, and better compression."
            }
          ],
          "homework": [
            {
              "prompt": "Compute the VAE KL term $\\tfrac12(\\mu^2+\\sigma^2-1-\\ln\\sigma^2)$ for a latent unit with $\\mu=0$ and $\\sigma=2$ (an over-wide posterior).",
              "hint": "Use $\\ln(\\sigma^2)=\\ln 4\\approx 1.386$.",
              "solution": "$\\tfrac12(0^2+2^2-1-\\ln 4)=\\tfrac12(0+4-1-1.386)=\\tfrac12(1.614)\\approx \\mathbf{0.807}$ nats. A posterior that is too <em>wide</em> ($\\sigma=2 \\gt  1$) is penalized too, not just one that is off-center — the KL term keeps both the mean near 0 and the variance near 1, matching the standard-normal prior."
            },
            {
              "prompt": "A model's cross-entropy on a corpus improves from 4 bits/token to 3 bits/token. By what factor does its perplexity improve, and what does that say about compression?",
              "hint": "Perplexity is $2^{H}$.",
              "solution": "Perplexity goes from $2^4=16$ to $2^3=\\mathbf{8}$ — a 2x improvement (halved). Equivalently, the text now compresses to ~3 bits/token instead of 4, a 25% smaller encoding. Each bit of cross-entropy reduction halves the perplexity and saves one bit per token of compressed size — prediction and compression improving in lockstep."
            },
            {
              "prompt": "Explain, in MDL terms, why a model that perfectly memorizes the training data is usually not the best choice.",
              "hint": "Think about the two parts of the description length: $L(\\text{model})$ and $L(\\text{data}\\mid\\text{model})$.",
              "solution": "A model that memorizes the data drives $L(\\text{data}\\mid\\text{model})$ toward 0, but only by becoming enormously complex — a huge $L(\\text{model})$ (it must encode every training point). MDL minimizes the <em>sum</em> $L(\\text{model})+L(\\text{data}\\mid\\text{model})$, so the memorizer is penalized for its giant description and loses to a simpler model that captures the pattern in far fewer total bits. That total-bits trade is exactly Occam's razor / regularization, and it predicts the memorizer will also generalize poorly to new data."
            }
          ]
        }
      ]
    }
  ]
}
);
