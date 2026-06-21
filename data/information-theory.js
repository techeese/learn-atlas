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
          "content": "<h3>1. The hook: how much does a message tell you?</h3>\n<p>If a friend texts \"the sun rose this morning,\" you learn almost nothing — you already knew. If they text \"it snowed in the Sahara,\" you learn a great deal. <strong>Information theory</strong>, founded by Claude Shannon in 1948, makes this precise: the information in an event is tied to how <em>surprising</em> it is. Rare events carry more information than certain ones. From this single idea flow entropy, data compression, and — directly — the loss functions that train every modern model.</p>\n<h3>2. Self-information: surprise, quantified</h3>\n<p>The <strong>self-information</strong> (or \"surprisal\") of an event with probability $p$ is $$I(x) = -\\log p(x) = \\log\\frac{1}{p(x)}.$$ A certain event ($p=1$) carries $I=0$ — no surprise, no information. A rare event ($p\\to 0$) carries $I\\to\\infty$. The rarer the event, the bigger the surprise. With $\\log$ base 2, $I$ is measured in <strong>bits</strong>: an event of probability $\\tfrac12$ carries exactly 1 bit (one yes/no answer's worth).</p>\n<h3>3. Entropy: average surprise</h3>\n<p><strong>Entropy</strong> is the <em>expected</em> self-information of a random variable — how surprising its outcomes are on average: $$H(X) = \\mathbb{E}[-\\log p(X)] = -\\sum_x p(x)\\log p(x).$$ It measures <em>uncertainty</em>: how unpredictable $X$ is, and equivalently how many bits you need, on average, to encode one outcome. A fair coin has $H=1$ bit; a fair six-sided die has $H=\\log_2 6\\approx 2.585$ bits. A loaded coin that lands heads 90% of the time has only $H\\approx 0.47$ bits — far more predictable, so far less information per flip.</p>\n<h3>4. Bits, nats, and the base of the log</h3>\n<p>The base of the logarithm only sets the <em>units</em>. Base 2 gives <strong>bits</strong> (the natural currency of yes/no questions and digital storage); base $e$ gives <strong>nats</strong> (the default in machine learning, because derivatives of $\\ln$ are clean); base 10 gives \"dits.\" They differ by a constant factor — 1 nat $=\\log_2 e\\approx 1.44$ bits — so every result is the same shape regardless of base. ML almost always uses nats; this lesson uses bits for intuition.</p>\n<h3>5. Maximum and minimum uncertainty</h3>\n<p>Entropy is bounded. It is <em>minimized</em> at $H=0$ when one outcome is certain ($p=1$) — no uncertainty, nothing to encode. It is <em>maximized</em> when every outcome is equally likely: for $n$ outcomes the uniform distribution gives $H=\\log_2 n$, the most bits any distribution over $n$ outcomes can have. Uniform = maximally uncertain; peaked = predictable. This is why a well-shuffled deck (uniform) is the hardest to guess and compresses the worst.</p>\n<h3>6. Compute it yourself</h3>\n<p><b>Try it in code.</b> Shannon entropy is a one-liner: sum $-p\\log_2 p$ over the outcomes. This distribution $[0.5, 0.25, 0.25]$ should come out to exactly 1.5 bits.</p>\n<div data-code=\"javascript\" data-expected=\"1.50\">// Shannon entropy H = -sum p*log2(p), in bits\nconst p = [0.5, 0.25, 0.25];\nconst log2 = x => Math.log(x) / Math.log(2);\nlet H = 0;\nfor (let i = p.length - 1; i >= 0; i--) H -= p[i] * log2(p[i]);\nconsole.log(H.toFixed(2));</div>\n<h3>7. Why this is the foundation of machine learning</h3>\n<p>Entropy is not abstract — it is the root of the tools you already use. <strong>Cross-entropy</strong>, the standard classification loss, measures the average surprise of the true labels under the model's predicted distribution; minimizing it makes the model less surprised by reality. <strong>KL divergence</strong> measures how many <em>extra</em> bits you pay for using the wrong distribution. <strong>Decision trees</strong> split on the feature that reduces entropy most (information gain). And a language model's <strong>perplexity</strong> is just $2^{H}$ — the entropy of its next-token guesses, exponentiated. Master entropy and these stop being formulas to memorize and become one idea.</p>\n<h3>8. The big picture</h3>\n<p>Information is surprise; entropy is average surprise, measured in bits (or nats). It quantifies uncertainty, sets the hard limit on lossless compression, and underlies cross-entropy, KL divergence, mutual information, and perplexity. Everything else in this subject is built on the simple act of taking $-\\log p$ and averaging it.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why the logarithm? Because information should add</summary>\n<p>Why define information as $-\\log p$ rather than, say, $1-p$? Because we want one property above all: the information from <em>independent</em> events should <em>add</em>. Learning two unrelated facts should give you the sum of their individual information.</p>\n<p>For independent events, probabilities <em>multiply</em>: $p(x,y)=p(x)\\,p(y)$. We want a measure $I$ with $I(x,y)=I(x)+I(y)$. The only function that turns multiplication into addition is the logarithm: $-\\log\\big(p(x)p(y)\\big)=-\\log p(x)-\\log p(y)$. So the log is not arbitrary — it is <em>forced</em> by the additivity requirement (plus continuity and \"rarer means more\"). Shannon proved these few axioms pin down $-\\log p$ uniquely, up to the choice of base.</p>\n<p>The \"aha\": the logarithm is the unique way to make \"surprise\" additive over independent events — which is exactly what makes bits compose (two coin flips carry 2 bits) and entropies of independent variables sum.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: entropy is the limit of lossless compression</summary>\n<p>Entropy is not just a feeling of \"uncertainty\" — it is a hard engineering limit. <strong>Shannon's source coding theorem</strong> says that to encode outcomes of $X$ losslessly, you need <em>on average at least $H(X)$ bits per symbol</em>, and you can get arbitrarily close to it. No scheme can do better; that is why entropy is measured in bits.</p>\n<p><b>The intuition.</b> Assign <em>short</em> codes to common outcomes and <em>long</em> codes to rare ones (Morse code does this — \"E\" is one dot). The optimal code length for an outcome of probability $p$ is about $-\\log_2 p$ bits — its self-information. Average those code lengths over the distribution and you get $H(X)$. Huffman coding and arithmetic coding are the practical algorithms that approach this bound.</p>\n<p>The \"aha\": entropy answers a concrete question — \"how small can this file get?\" A source of entropy $H$ cannot be compressed below $H$ bits per symbol on average. Predictability (low entropy) is exactly what makes compression possible, which is why a language model that predicts text well also <em>compresses</em> it well.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why uniform maximizes entropy (and why it matters)</summary>\n<p>Among all distributions over $n$ outcomes, the <em>uniform</em> one has the highest entropy, $\\log_2 n$. Intuitively, spreading probability evenly leaves you maximally uncertain; concentrating it on a few outcomes makes them predictable and lowers $H$. (It follows from Jensen's inequality applied to the concave $\\log$.)</p>\n<p><b>The principle.</b> This is the basis of the <strong>maximum-entropy principle</strong>: when you must pick a distribution subject to some known constraints, choose the one with the highest entropy — it assumes the least beyond what you actually know. Fix only the mean and variance and max-entropy hands you the <em>Gaussian</em>; fix only the mean of a positive quantity and you get the <em>exponential</em>. Many \"natural\" distributions are simply the least-committal choice given a constraint.</p>\n<p>The \"aha\": maximum entropy is honest ignorance made precise — the flattest distribution consistent with what you know. It connects entropy to statistics (the Gaussian as max-entropy), to physics (thermodynamic equilibrium), and to ML (max-entropy / logistic models that avoid unwarranted assumptions).</p>\n</details>",
          "mcq": [
            {
              "q": "The self-information of an event with probability $p$ is defined as:",
              "choices": [
                "$-\\log p$",
                "$1-p$",
                "$p\\log p$",
                "$p^2$"
              ],
              "answer": 0,
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
                "0 bits",
                "2 bits",
                "1 bit",
                "Infinite"
              ],
              "answer": 2,
              "explain": "$H=-(0.5\\log_2 0.5 + 0.5\\log_2 0.5)=1$ bit — one yes/no answer's worth."
            },
            {
              "q": "For a fixed number of outcomes $n$, entropy is maximized by:",
              "choices": [
                "A distribution concentrated on one outcome",
                "Any skewed distribution",
                "A distribution with two equally likely outcomes",
                "The uniform distribution (all outcomes equally likely)"
              ],
              "answer": 3,
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
                "Exactly 0",
                "1 bit",
                "Infinite",
                "It depends on the other outcomes"
              ],
              "answer": 0,
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
                "Lower entropy (it is more predictable)",
                "Zero entropy"
              ],
              "answer": 2,
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
            }
          ],
          "examples": [
            {
              "title": "Entropy of a fair vs. a biased coin",
              "scenario": "Compute the entropy (in bits) of a fair coin, and of a coin that lands heads with probability 0.9.",
              "solution": "Fair coin: $H=-(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = -(0.5(-1)+0.5(-1)) = \\mathbf{1}$ bit. Biased coin: $H=-(0.9\\log_2 0.9 + 0.1\\log_2 0.1)=-(0.9(-0.152)+0.1(-3.322))\\approx \\mathbf{0.47}$ bits. The bias makes the coin far more predictable, so each flip carries less than half the information of a fair flip."
            },
            {
              "title": "A fair six-sided die",
              "scenario": "How many bits of entropy does a fair six-sided die have, and what does that number mean?",
              "solution": "Uniform over 6 outcomes: $H=\\log_2 6 \\approx \\mathbf{2.585}$ bits. It means you need about 2.585 yes/no questions on average to pin down the roll — and that a long sequence of rolls cannot be compressed below ~2.585 bits per roll. (Three bits would suffice but waste a little, since $\\log_2 6 < 3$.)"
            },
            {
              "title": "Surprise of a rare event",
              "scenario": "A model assigns probability 0.001 to the word that actually appears next. How many bits of surprise (self-information) is that?",
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
                "The average bits to encode outcomes from $p$ using $q$'s code",
                "The variance of $p$"
              ],
              "answer": 2,
              "explain": "$H(p,q)=-\\sum p\\log q$: average surprise of $p$'s outcomes measured by $q$."
            },
            {
              "q": "How do cross-entropy, entropy, and KL relate?",
              "choices": [
                "$H(p,q)=H(p)-D_{\\mathrm{KL}}(p\\|q)$",
                "They are unrelated",
                "$H(p,q)=H(p)+D_{\\mathrm{KL}}(p\\|q)$",
                "$H(p,q)=D_{\\mathrm{KL}}(p\\|q)$"
              ],
              "answer": 2,
              "explain": "Cross-entropy = entropy + KL; the KL term is the extra bits from using the wrong distribution."
            },
            {
              "q": "KL divergence $D_{\\mathrm{KL}}(p\\|q)$ is always:",
              "choices": [
                "Negative",
                "Nonnegative, and zero only when $p=q$",
                "Symmetric in $p$ and $q$",
                "Equal to 1"
              ],
              "answer": 1,
              "explain": "Gibbs' inequality: $D_{\\mathrm{KL}}\\ge 0$, with equality iff $p=q$."
            },
            {
              "q": "Is KL divergence a true distance metric?",
              "choices": [
                "No — it is asymmetric and violates the triangle inequality",
                "Yes, it satisfies all metric axioms",
                "Only for continuous distributions",
                "Only when $p=q$"
              ],
              "answer": 0,
              "explain": "$D_{\\mathrm{KL}}(p\\|q)\\neq D_{\\mathrm{KL}}(q\\|p)$ in general; it is a divergence, not a metric."
            },
            {
              "q": "Minimizing cross-entropy loss is equivalent to:",
              "choices": [
                "Maximizing the entropy of the labels",
                "Minimizing the variance",
                "Maximizing the KL divergence",
                "Maximum-likelihood estimation"
              ],
              "answer": 3,
              "explain": "Average cross-entropy is the negative log-likelihood, so minimizing it is MLE (and minimizes KL to the data)."
            },
            {
              "q": "For a one-hot true label, cross-entropy reduces to:",
              "choices": [
                "$-\\log q(\\text{true class})$",
                "$0$ always",
                "The entropy of $q$",
                "$\\sum_x q(x)^2$"
              ],
              "answer": 0,
              "explain": "Only the true class has $p=1$, so $H(p,q)=-\\log q(\\text{true class})$ — the log-loss."
            },
            {
              "q": "Forward KL $D_{\\mathrm{KL}}(p\\|q)$ (as in MLE) tends to make the fitted $q$:",
              "choices": [
                "Lock onto a single mode",
                "Ignore $p$ entirely",
                "Become uniform",
                "Cover all of $p$'s modes (mode-covering)"
              ],
              "answer": 3,
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
            }
          ],
          "examples": [
            {
              "title": "Cross-entropy: confident-right vs confident-wrong",
              "scenario": "The true class is class 1 (a one-hot label). The model predicts probability $q=0.9$ for it in one case and $q=0.1$ in another. Compute the cross-entropy (log-loss) in bits for each.",
              "solution": "For a one-hot label, $H(p,q)=-\\log_2 q(\\text{true})$. Confident-right: $-\\log_2 0.9 \\approx \\mathbf{0.15}$ bits — a tiny penalty. Confident-wrong: $-\\log_2 0.1 \\approx \\mathbf{3.32}$ bits — over 20x larger. The asymmetry is the point: cross-entropy barely charges good calibration but punishes confident mistakes harshly (and goes to $\\infty$ as $q(\\text{true})\\to 0$)."
            },
            {
              "title": "KL divergence is asymmetric",
              "scenario": "Let $p=[0.5,0.5]$ and $q=[0.1,0.9]$. Compute $D_{\\mathrm{KL}}(p\\|q)$ and $D_{\\mathrm{KL}}(q\\|p)$ and confirm they differ.",
              "solution": "$D_{\\mathrm{KL}}(p\\|q)=0.5\\log_2\\tfrac{0.5}{0.1}+0.5\\log_2\\tfrac{0.5}{0.9}=0.5(2.32)+0.5(-0.85)\\approx \\mathbf{0.74}$ bits. $D_{\\mathrm{KL}}(q\\|p)=0.1\\log_2\\tfrac{0.1}{0.5}+0.9\\log_2\\tfrac{0.9}{0.5}=0.1(-2.32)+0.9(0.85)\\approx \\mathbf{0.53}$ bits. They are different ($0.74\\neq 0.53$) — KL is not symmetric, so the direction you minimize matters."
            },
            {
              "title": "Cross-entropy = entropy + KL",
              "scenario": "For $p=[0.5,0.5]$ and $q=[0.25,0.75]$, compute $H(p)$, $H(p,q)$, and $D_{\\mathrm{KL}}(p\\|q)$, and verify the decomposition.",
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
    }
  ]
}
);
