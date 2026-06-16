/* Atlas course — Deep Learning
   Generated & adversarially fact-checked + inline visualizations, worked examples & an expanded question bank. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "deep-learning",
  "title": "Deep Learning",
  "icon": "◉",
  "color": "#d2715a",
  "blurb": "Neurons, backpropagation, and the architectures that learn representations from data.",
  "modules": [
    {
      "id": "dl-foundations",
      "title": "Foundations: From ML to Neural Networks",
      "lessons": [
        {
          "id": "dl-ml-recap-and-the-learning-problem",
          "title": "The Learning Problem: What Deep Learning Inherits from ML",
          "minutes": 14,
          "content": "<h3>1. Why Start Here?</h3>\n<p>Deep learning often feels like a clean break from \"classical\" machine learning — convolutions, attention, billions of parameters. But almost everything that makes a deep network <em>work</em> (and the ways it <em>fails</em>) is inherited from a much older, simpler framework: <strong>supervised learning as function fitting</strong>. If you understand that framework precisely, the rest of deep learning becomes a story about <em>how</em> we parameterize and optimize functions — not a new branch of mathematics.</p>\n<p>This lesson builds the scaffolding: what the learning problem actually <em>is</em>, what we are minimizing, how we honestly measure success, and the single most important phenomenon in the entire field — the tension between fitting your data and <strong>generalizing</strong> to data you've never seen.</p>\n\n<h3>2. The Supervised Learning Setup</h3>\n<p>We assume there is some unknown true relationship between inputs and outputs, governed by a fixed (but unknown) probability distribution $\\mathcal{D}$ over pairs $(x, y)$.</p>\n<ul>\n  <li><strong>Input / features</strong> $x \\in \\mathcal{X}$: a vector of measurements describing one example — pixel intensities, token embeddings, sensor readings, tabular columns. The dimensionality is $d$, so often $\\mathcal{X} = \\mathbb{R}^d$.</li>\n  <li><strong>Output / label</strong> $y \\in \\mathcal{Y}$: what we want to predict. For <em>regression</em>, $\\mathcal{Y} = \\mathbb{R}$; for <em>classification</em>, $\\mathcal{Y} = \\{1, \\dots, K\\}$.</li>\n  <li><strong>Dataset</strong> $S = \\{(x_i, y_i)\\}_{i=1}^{n}$: a finite sample drawn from $\\mathcal{D}$.</li>\n</ul>\n<p>Our goal is to find a function $f: \\mathcal{X} \\to \\mathcal{Y}$ that predicts $y$ well from $x$ — not just on $S$, but on <em>new</em> draws from $\\mathcal{D}$.</p>\n\n<div class=\"callout\">\n  <div class=\"c-tag\">Intuition</div>\n  <p>Think of $\\mathcal{D}$ as \"the world's data-generating process\" and $S$ as a snapshot the world happened to show you. Learning is the art of inferring the rule of the world from a finite, noisy snapshot — and being right about the parts of the world you never saw.</p>\n</div>\n\n<h4>The i.i.d. assumption</h4>\n<p>Crucially, we assume the examples in $S$ are drawn <strong>independently and identically distributed (i.i.d.)</strong> from $\\mathcal{D}$: each $(x_i, y_i)$ comes from the same distribution, and the draws don't influence each other. This assumption is what licenses the entire enterprise — it's the bridge that lets performance on a finite sample say anything about performance on the population. When it breaks (distribution shift, time series with autocorrelation, leakage between train and test), the guarantees quietly evaporate, and a model that looked great in evaluation fails in production.</p>\n\n<h3>3. The Loss and the Risk</h3>\n<p>To say what \"predicts well\" means, we need a <strong>loss function</strong> $\\ell(\\hat{y}, y)$ measuring how bad it is to predict $\\hat{y}$ when the truth is $y$. Common choices:</p>\n<ul>\n  <li><strong>Squared error</strong> (regression): $\\ell(\\hat{y}, y) = (\\hat{y} - y)^2$.</li>\n  <li><strong>0–1 loss</strong> (classification): $\\ell(\\hat{y}, y) = \\mathbb{1}[\\hat{y} \\neq y]$.</li>\n  <li><strong>Cross-entropy</strong> (classification, used in practice because it's differentiable): for a predicted probability vector $p$ and true class $y$, $\\ell = -\\log p_y$.</li>\n</ul>\n\n<p>The quantity we <em>actually</em> care about is the <strong>true risk</strong> (a.k.a. expected risk or generalization error): the average loss over the whole distribution.</p>\n$$R(f) = \\mathbb{E}_{(x,y)\\sim\\mathcal{D}}\\big[\\ell(f(x), y)\\big]$$\n<p>The ideal predictor would minimize $R(f)$ over all possible functions. But we can't compute $R(f)$ — it requires knowing $\\mathcal{D}$, the very thing we're trying to learn. So we substitute the sample average, the <strong>empirical risk</strong>:</p>\n$$\\hat{R}_S(f) = \\frac{1}{n}\\sum_{i=1}^{n} \\ell(f(x_i), y_i)$$\n\n<div class=\"callout sage\">\n  <div class=\"c-tag\">Why it matters for ML</div>\n  <p><strong>Empirical Risk Minimization (ERM)</strong> is the founding principle of supervised learning: pick the function that minimizes loss on your training data. Training a neural network with gradient descent is just ERM where the function class is \"all networks of this architecture\" and the search is done by following gradients. ResNets, transformers, and linear regression are all the same algorithm at this altitude: <em>minimize $\\hat{R}_S$ over a parameterized family.</em></p>\n</div>\n\n<h3>4. Parametric Function Fitting: $f(x; \\theta)$</h3>\n<p>We can't search over <em>all</em> functions — that set is too vast and ERM over it just memorizes (return $y_i$ for each $x_i$, predict garbage elsewhere). Instead we restrict attention to a <strong>function class</strong> (hypothesis class) $\\mathcal{H}$, typically a family parameterized by a vector $\\theta \\in \\mathbb{R}^p$:</p>\n$$f(x; \\theta), \\qquad \\theta \\in \\mathbb{R}^p.$$\n<p>Now learning becomes an optimization over the finite-dimensional parameter vector:</p>\n$$\\hat{\\theta} = \\arg\\min_{\\theta} \\;\\frac{1}{n}\\sum_{i=1}^{n} \\ell\\big(f(x_i; \\theta),\\, y_i\\big).$$\n<p>Examples of the same template at different scales:</p>\n<ul>\n  <li><strong>Linear regression:</strong> $f(x;\\theta) = \\theta^\\top x$, with $\\theta \\in \\mathbb{R}^d$ — a handful of parameters.</li>\n  <li><strong>Logistic regression:</strong> $f(x;\\theta) = \\sigma(\\theta^\\top x)$, where $\\sigma(z) = 1/(1+e^{-z})$.</li>\n  <li><strong>A deep network:</strong> $f(x;\\theta) = W_L\\,\\phi(W_{L-1}\\,\\phi(\\cdots \\phi(W_1 x)))$, where $\\theta = \\{W_1, \\dots, W_L\\}$ collects all weight matrices — millions to billions of parameters, and $\\phi$ is a nonlinearity like ReLU.</li>\n</ul>\n<p>The deep network is not philosophically different from linear regression. It is the <em>same</em> ERM problem with a richer, nonlinear, composable function class — which is exactly what lets it represent things a linear model never could.</p>\n\n<h4>Parametric vs. non-parametric</h4>\n<p>A model is <strong>parametric</strong> if it commits to a fixed-size parameter vector $\\theta$ whose dimension does <em>not</em> grow with the number of training examples $n$. Once trained, you can throw away the data and keep only $\\theta$. Linear regression, logistic regression, and neural networks are all parametric.</p>\n<p>A model is <strong>non-parametric</strong> if the effective number of parameters grows with $n$ — the model keeps (some of) the data around and lets complexity scale with the dataset. Examples: $k$-nearest neighbors (stores all training points), kernel methods / Gaussian processes, and decision trees grown to fit the data.</p>\n<div class=\"callout\">\n  <div class=\"c-tag\">Common confusion</div>\n  <p>\"Non-parametric\" does <strong>not</strong> mean \"no parameters.\" It means the number of parameters is not fixed in advance — it adapts to the data. A $k$-NN classifier with a million training points effectively carries a million-point lookup table; its \"model\" is the data itself.</p>\n</div>\n\n<h3>5. The Central Problem: Generalization vs. Memorization</h3>\n<p>ERM minimizes $\\hat{R}_S$, but we are graded on $R$. The gap between them is the whole game:</p>\n$$\\underbrace{R(\\hat{f})}_{\\text{what we want}} \\;=\\; \\underbrace{\\hat{R}_S(\\hat{f})}_{\\text{training error}} \\;+\\; \\underbrace{\\big(R(\\hat{f}) - \\hat{R}_S(\\hat{f})\\big)}_{\\text{generalization gap}}.$$\n<p>The <strong>generalization gap</strong> is how much worse the model does on unseen data than on its training data. A model that drives training error to zero by <em>memorizing</em> the training set — fitting noise, idiosyncrasies, and label errors — can have a large gap. That is <strong>overfitting</strong>. Conversely, a model too simple to capture the signal has high error everywhere; that is <strong>underfitting</strong>.</p>\n<p><strong>Generalization</strong> is the ability to make $R(\\hat{f})$ small — to perform well on data the model has never seen. Memorization is fitting the training set without that transfer. The deepest insight in the field is that these can come apart, and managing that gap is most of practical ML.</p>\n\n<h3>6. The Bias–Variance Tradeoff</h3>\n<p>Why does the gap appear? Decompose the expected error. For squared loss with $y = g(x) + \\varepsilon$ where $\\varepsilon$ is noise with variance $\\sigma^2$, the expected error at a point $x$ — averaged over random training sets — splits cleanly:</p>\n$$\\mathbb{E}\\big[(y - \\hat{f}(x))^2\\big] = \\underbrace{\\big(g(x) - \\mathbb{E}[\\hat{f}(x)]\\big)^2}_{\\text{Bias}^2} + \\underbrace{\\mathbb{E}\\big[(\\hat{f}(x) - \\mathbb{E}[\\hat{f}(x)])^2\\big]}_{\\text{Variance}} + \\underbrace{\\sigma^2}_{\\text{Irreducible}}$$\n<ul>\n  <li><strong>Bias</strong> — error from the model being too rigid to capture the true $g$ (e.g., fitting a line to a curve). High bias → underfitting.</li>\n  <li><strong>Variance</strong> — error from sensitivity to the particular training sample; a flexible model wiggles to fit noise and changes a lot if you resample the data. High variance → overfitting.</li>\n  <li><strong>Irreducible error</strong> $\\sigma^2$ — noise inherent in $y$ that no model can remove. It sets a hard floor on achievable risk.</li>\n</ul>\n<p>Increasing model capacity (more parameters, higher-degree polynomials, deeper nets) <em>lowers bias but raises variance</em>. The classical picture is a U-shaped test-error curve: too simple is bad, too complex is bad, and there's a sweet spot in between. This is why we use <strong>regularization</strong>, early stopping, and more data — all tools to trade a little bias for a lot less variance.</p>\n<div class=\"callout violet\">\n  <div class=\"c-tag\">Big picture</div>\n  <p>Modern deep learning complicates the tidy U-curve. Massively overparameterized networks (far more parameters than data points) can fit training data perfectly <em>and</em> generalize well — the \"double descent\" phenomenon, where test error falls again past the interpolation threshold. The bias–variance decomposition is still correct as math; what changed is our understanding of how implicit regularization (from SGD, architecture, and scale) controls variance even at enormous capacity. The tradeoff is the right starting intuition, not the final word.</p>\n</div>\n\n<h3>7. Honest Measurement: Train / Validation / Test Splits</h3>\n<p>If we estimate $R(\\hat{f})$ using the same data we trained on, we get an optimistically biased number — the model has already \"seen the answers.\" So we partition the data:</p>\n<ul>\n  <li><strong>Training set</strong> — used to fit $\\theta$ via ERM.</li>\n  <li><strong>Validation set</strong> — used to choose <em>hyperparameters</em> and architecture (learning rate, depth, regularization strength) and to decide when to stop. The model never trains on it directly, but we <em>do</em> make decisions based on it.</li>\n  <li><strong>Test set</strong> — touched <em>once</em>, at the very end, to get an unbiased estimate of $R(\\hat{f})$. It is a stand-in for \"the future.\"</li>\n</ul>\n<p>The validation set is necessary because once you've tuned dozens of choices against it, the validation score becomes optimistic too — you've effectively \"trained\" on it through your decisions. The test set must stay sealed to preserve an honest estimate. Reusing the test set to make modeling decisions is one of the most common and damaging mistakes in practice.</p>\n<p>When data is scarce, <strong>$k$-fold cross-validation</strong> reuses the data efficiently: split into $k$ folds, train on $k-1$ and validate on the held-out fold, rotate, and average. This trades compute for a lower-variance estimate of generalization.</p>\n\n<h3>8. Worked Example: Polynomial Fitting</h3>\n<p>Let the true function be $g(x) = \\sin(2\\pi x)$ on $[0,1]$, and suppose we observe noisy samples $y_i = \\sin(2\\pi x_i) + \\varepsilon_i$, with $\\varepsilon_i \\sim \\mathcal{N}(0, 0.1^2)$. We fit polynomials $f(x;\\theta) = \\sum_{j=0}^{M} \\theta_j x^j$ by minimizing squared empirical risk — this is ERM in a parametric class indexed by degree $M$.</p>\n<p>Suppose we have $n = 10$ training points and a separate validation set, and we observe (illustrative) errors:</p>\n<pre><code>Degree M   Train MSE   Val MSE     Diagnosis\n   1        0.182       0.201      underfit (high bias): a line can't bend\n   3        0.011       0.014      good fit: captures the sine's shape\n   9        0.000       0.480      overfit (high variance): interpolates noise</code></pre>\n<p>Reading the table the way a practitioner does:</p>\n<ol>\n  <li><strong>$M=1$:</strong> train and val errors are both high and close. Small generalization gap, but both bad — classic <em>high bias</em>. A straight line cannot represent a sine wave no matter how much data you give it.</li>\n  <li><strong>$M=9$:</strong> with 10 points, a degree-9 polynomial has 10 parameters ($\\theta_0,\\dots,\\theta_9$) and can pass <em>exactly</em> through every training point — train MSE $\\approx 0$. But it oscillates wildly between points to do so, so val MSE explodes. Large generalization gap — classic <em>high variance / memorization</em>.</li>\n  <li><strong>$M=3$:</strong> low error on both, small gap. The capacity matches the complexity of the signal. This is the sweet spot the bias–variance tradeoff predicts.</li>\n</ol>\n<p>The decision rule: <strong>choose the model with the best validation error</strong> (here $M=3$), then report its test error as the final estimate. Notice we never looked at the test set to make this choice — that's what keeps the final number honest.</p>\n<p>What would help the $M=9$ model? (a) <em>More data</em> — with 1000 points, even a high-degree polynomial can't interpolate them all and must capture the trend; variance drops. (b) <em>Regularization</em> — add $\\lambda \\sum_j \\theta_j^2$ to the objective to penalize large coefficients, shrinking the wild oscillations. Both are variance-reduction tools, the everyday medicine for overfitting.</p>\n\n<h3>9. Why Deep Learning Favors Learned Representations</h3>\n<p>Here is the inheritance, and the twist. Classical ML often spent most of its effort on <strong>feature engineering</strong>: a human expert hand-crafts the features $x$ (edge detectors for images, TF-IDF for text, domain-specific ratios for finance) so that a simple parametric model on top can succeed. The model is shallow; the intelligence lives in the features.</p>\n<p>Deep learning's central bet is to <strong>learn the features too</strong>. Each layer of a network transforms the representation, and the composition $\\phi(W_{L-1}\\,\\phi(\\cdots \\phi(W_1 x)))$ <em>discovers</em> a hierarchy of features — edges → textures → object parts → objects — directly from data by the same ERM gradient descent that fits the final layer. There is no separate feature-engineering step; representation learning and prediction are optimized end-to-end against a single empirical risk.</p>\n<p>Why is this often better?</p>\n<ul>\n  <li><strong>Hand-engineered features are bottlenecked by human imagination</strong> and rarely optimal for the task; learned features are optimized <em>for the objective</em>.</li>\n  <li><strong>Representations transfer.</strong> Features learned on a large dataset (e.g., a pretrained vision or language backbone) capture general structure and can be reused — the foundation of transfer learning and large pretrained models.</li>\n  <li><strong>Scale pays off.</strong> Because capacity and feature richness grow with depth and width, deep models keep improving as data and compute grow, where hand-engineered pipelines plateau.</li>\n</ul>\n<div class=\"callout sage\">\n  <div class=\"c-tag\">The thesis of the field</div>\n  <p>Deep learning inherits the entire ML framework — ERM, parametric function fitting, the i.i.d. assumption, generalization vs. memorization, the bias–variance lens — and adds <strong>one decisive move</strong>: fold feature construction <em>into</em> the parametric function and learn it from data. Everything else in this course is machinery for making that move work at scale: architectures that build good inductive biases, optimizers that navigate ERM in millions of dimensions, and regularizers that keep the generalization gap small.</p>\n</div>\n\n<h3>10. Summary</h3>\n<ul>\n  <li>Supervised learning seeks $f$ minimizing the true risk $R(f) = \\mathbb{E}_{\\mathcal{D}}[\\ell(f(x),y)]$, but we can only minimize the empirical risk $\\hat{R}_S(f)$ on a finite i.i.d. sample — this is <strong>ERM</strong>.</li>\n  <li>We restrict to a parametric class $f(x;\\theta)$ so learning becomes optimization over $\\theta$; deep networks are this template with learned, composed nonlinear features.</li>\n  <li><strong>Parametric</strong> models have fixed-size $\\theta$; <strong>non-parametric</strong> models grow with $n$.</li>\n  <li>The <strong>generalization gap</strong> $R - \\hat{R}_S$ separates generalization from memorization; the <strong>bias–variance tradeoff</strong> explains its source.</li>\n  <li><strong>Train/val/test</strong> splits give honest estimates: fit on train, choose on validation, report once on test.</li>\n  <li>Deep learning's edge: <strong>learn representations</strong> end-to-end instead of hand-engineering features.</li>\n</ul>",
          "mcq": [
            {
              "q": "A model achieves 0.1% error on its training set but 18% error on a held-out test set drawn i.i.d. from the same distribution. Which single description is most accurate?",
              "choices": [
                "High bias / underfitting; the model class is too simple",
                "High variance / overfitting; a large generalization gap from memorizing the training data",
                "The i.i.d. assumption has been violated by the data collection",
                "Irreducible error dominates; no model could do better"
              ],
              "answer": 1,
              "explain": "Near-zero training error with much higher test error is a large generalization gap — the signature of overfitting (high variance), where the model memorizes the training set rather than generalizing."
            },
            {
              "q": "Which statement correctly distinguishes parametric from non-parametric models?",
              "choices": [
                "Parametric models have parameters; non-parametric models have none",
                "In a parametric model the number of parameters is fixed in advance; in a non-parametric model the effective complexity grows with the number of training examples $n$",
                "Non-parametric models are always more accurate because they have more capacity",
                "Neural networks are non-parametric because they have so many parameters"
              ],
              "answer": 1,
              "explain": "Parametric means a fixed-size parameter vector independent of $n$ (e.g., neural nets, linear regression); non-parametric means complexity scales with the data (e.g., k-NN, kernel methods). 'Non-parametric' is not 'no parameters'."
            },
            {
              "q": "Why is empirical risk $\\hat{R}_S(f)$ used to train models instead of the true risk $R(f)$?",
              "choices": [
                "Empirical risk is always a better objective than true risk",
                "True risk requires knowing the data distribution $\\mathcal{D}$, which is unknown, so we approximate its expectation with a sample average over the training set",
                "Empirical risk has no relationship to true risk but is easier to compute",
                "True risk can only be used for non-parametric models"
              ],
              "answer": 1,
              "explain": "$R(f)=\\mathbb{E}_{\\mathcal{D}}[\\ell]$ depends on the unknown distribution $\\mathcal{D}$. The empirical risk is the sample-average estimator of that expectation, which the i.i.d. assumption justifies."
            },
            {
              "q": "Why does deep learning favor learned representations over hand-engineered features?",
              "choices": [
                "Hand-engineered features are mathematically impossible to compute",
                "Learned features are optimized end-to-end for the task objective, can transfer across problems, and improve with scale, rather than being limited by human design choices",
                "Learned features eliminate the need for any training data",
                "Hand-engineered features always cause the i.i.d. assumption to fail"
              ],
              "answer": 1,
              "explain": "Deep nets fold feature construction into the parametric function and optimize it against the same empirical risk, so features are tailored to the objective, transfer to other tasks, and scale with data/compute — unlike fixed human-designed features."
            },
            {
              "q": "The i.i.d. assumption is described as 'the bridge that lets performance on a finite sample say anything about performance on the population.' Which scenario most directly VIOLATES this assumption?",
              "choices": [
                "Training a regression model where $\\mathcal{Y} = \\mathbb{R}$ instead of a classification model",
                "Predicting tomorrow's stock price from a time series where consecutive days are autocorrelated",
                "Using a dataset $S$ with fewer examples $n$ than the input dimensionality $d$",
                "Choosing features $x$ that are noisy sensor readings rather than clean measurements"
              ],
              "answer": 1,
              "explain": "The lesson explicitly lists 'time series with autocorrelation' as a case where the i.i.d. assumption breaks: autocorrelated consecutive days are not independent draws (and often not identically distributed), so the bridge from sample to population collapses. The other options affect modeling choices or difficulty but do not violate the independence/identical-distribution requirements."
            },
            {
              "q": "According to the lesson, what is the relationship between the dataset $S$ and the distribution $\\mathcal{D}$?",
              "choices": [
                "$S$ defines $\\mathcal{D}$, since $\\mathcal{D}$ is just the empirical distribution of the observed examples",
                "$\\mathcal{D}$ is a finite, known sample while $S$ is the unknown infinite population",
                "$S$ is a finite i.i.d. sample drawn from the fixed but unknown distribution $\\mathcal{D}$",
                "$S$ and $\\mathcal{D}$ are interchangeable once $n$ is large enough"
              ],
              "answer": 2,
              "explain": "The lesson defines $\\mathcal{D}$ as the fixed but unknown data-generating distribution over pairs $(x,y)$, and $S = \\{(x_i, y_i)\\}_{i=1}^n$ as a finite sample drawn i.i.d. from it. $S$ does not define $\\mathcal{D}$, $\\mathcal{D}$ is not the finite object, and they never become literally interchangeable."
            },
            {
              "q": "The lesson states the true relationship between inputs and outputs is governed by a distribution $\\mathcal{D}$ over pairs $(x, y)$, rather than a deterministic function $y = g(x)$. Why does framing the target as a *distribution* matter?",
              "choices": [
                "It guarantees that any function $f$ can achieve zero error if $n$ is large enough",
                "It allows the same input $x$ to be associated with different outputs $y$, capturing label noise and inherent ambiguity",
                "It means $x$ and $y$ must be statistically independent of each other",
                "It restricts the output space $\\mathcal{Y}$ to be finite for classification only"
              ],
              "answer": 1,
              "explain": "A joint distribution over $(x, y)$ permits stochasticity: the same $x$ can map to different $y$ values, modeling label noise and irreducible ambiguity that a deterministic $y = g(x)$ cannot represent. It does not guarantee zero error, does not force independence (that would make $x$ uninformative about $y$), and does not restrict $\\mathcal{Y}$."
            },
            {
              "q": "The lesson claims deep learning 'becomes a story about how we parameterize and optimize functions — not a new branch of mathematics.' Which statement best captures the central thesis being argued?",
              "choices": [
                "Convolutions and attention are mathematically unrelated to classical supervised learning",
                "Deep networks fail in entirely novel ways that classical ML theory cannot describe",
                "Both the successes and failures of deep networks are inherited from supervised learning as function fitting",
                "Deep learning replaces the goal of generalization with the goal of memorizing the training set"
              ],
              "answer": 2,
              "explain": "The lesson's opening thesis is that 'almost everything that makes a deep network work (and the ways it fails) is inherited from a much older, simpler framework: supervised learning as function fitting.' Both successes and failures trace back to that framework, which contradicts the claims of novelty, unrelatedness, or abandoning generalization."
            }
          ],
          "flashcards": [
            {
              "front": "What is Empirical Risk Minimization (ERM)?",
              "back": "Choosing the model that minimizes average loss on the training set: $\\hat{\\theta}=\\arg\\min_\\theta \\frac{1}{n}\\sum_i \\ell(f(x_i;\\theta), y_i)$. It approximates minimizing the unknown true risk $R(f)=\\mathbb{E}_{\\mathcal{D}}[\\ell]$ using a finite sample."
            },
            {
              "front": "Define the generalization gap.",
              "back": "The difference between true (test) risk and training risk: $R(\\hat{f}) - \\hat{R}_S(\\hat{f})$. It measures how much worse a model does on unseen data than on its training data; a large gap indicates overfitting/memorization."
            },
            {
              "front": "State the i.i.d. assumption and why it matters.",
              "back": "Training examples are drawn independently and identically from a single fixed distribution $\\mathcal{D}$. It justifies using the sample-average empirical risk as an estimate of true risk; if violated (distribution shift, leakage), generalization guarantees break."
            },
            {
              "front": "Bias–variance decomposition (squared loss).",
              "back": "$\\mathbb{E}[(y-\\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Variance} + \\sigma^2$. Bias = error from too-rigid model (underfitting); Variance = sensitivity to the training sample (overfitting); $\\sigma^2$ = irreducible noise."
            },
            {
              "front": "Parametric vs. non-parametric models.",
              "back": "Parametric: fixed-size parameter vector $\\theta$ whose dimension is independent of $n$ (linear/logistic regression, neural nets). Non-parametric: effective complexity grows with $n$ (k-NN, kernel methods, Gaussian processes)."
            },
            {
              "front": "Roles of train / validation / test splits.",
              "back": "Train: fit parameters $\\theta$ via ERM. Validation: choose hyperparameters/architecture and decide when to stop. Test: used once at the end for an unbiased estimate of true risk; never used to make modeling decisions."
            }
          ],
          "homework": [
            {
              "prompt": "You train two classifiers on the same i.i.d. dataset. Model A: train accuracy 99%, validation accuracy 72%. Model B: train accuracy 80%, validation accuracy 78%. (a) Diagnose each model in bias-variance terms. (b) Which would you deploy and why? (c) Name one concrete intervention to improve Model A and one to improve Model B.",
              "hint": "Compare the gap between train and validation accuracy, and compare the absolute validation numbers. Big gap = variance; uniformly low = bias.",
              "solution": "(a) Model A has a large generalization gap (99% vs 72%), the signature of high variance / overfitting — it memorizes the training set. Model B has a small gap but mediocre accuracy on both (80%/78%), indicating high bias / underfitting — too simple to capture the signal. (b) Deploy Model B: deployment performance is governed by generalization (validation/test), and B's 78% beats A's 72%. A's high training accuracy is irrelevant to real-world use. (c) To improve A (reduce variance): add regularization, gather more data, reduce capacity, or use early stopping. To improve B (reduce bias): increase model capacity (more parameters/depth), add more expressive features, or train longer/with a better optimizer."
            },
            {
              "prompt": "A colleague reports excellent results: they tried 200 hyperparameter configurations, each time evaluating on the test set, and selected the configuration with the best test accuracy (94%). Explain precisely why the reported 94% is likely an optimistic (biased) estimate of true risk, and describe the correct protocol.",
              "hint": "Think about what 'touching the test set' to make a decision does to its role as a stand-in for the future. How many times was the test set effectively 'trained on'?",
              "solution": "By selecting the configuration that maximizes test accuracy, the colleague used the test set to make a modeling decision — effectively 'training' on it through the selection process. Across 200 trials, the best test score partly reflects luck on that particular test sample (the maximum of 200 noisy estimates is upward-biased), not genuine generalization. The test set is no longer an unbiased stand-in for unseen data. Correct protocol: split into train/validation/test. Tune all 200 configurations against the validation set, select the best by validation accuracy, then evaluate that single chosen model on the sealed test set exactly once to report an unbiased estimate. With scarce data, use k-fold cross-validation for the selection step while still keeping a final untouched test set."
            },
            {
              "prompt": "For a deep network $f(x;\\theta)=W_2\\,\\phi(W_1 x)$ with ReLU $\\phi$, argue (i) why it is a parametric model, and (ii) why this architecture can represent functions that linear regression $f(x;\\theta)=\\theta^\\top x$ cannot. Connect your answer to the idea of learned representations.",
              "hint": "Count parameters relative to dataset size $n$ for (i). For (ii), think about what the nonlinearity $\\phi$ and the hidden layer let the model build before the final linear step.",
              "solution": "(i) The parameters are exactly the entries of $W_1$ and $W_2$; the total count is fixed by the architecture (input dim, hidden width, output dim) and does NOT grow with the number of training examples $n$. After training you keep only $W_1, W_2$ and discard the data — the defining property of a parametric model. (ii) Linear regression can only represent linear functions of $x$; its prediction surface is a hyperplane. The hidden layer applies a learned linear map $W_1 x$ followed by the nonlinearity $\\phi$, producing new features $h=\\phi(W_1 x)$ that are nonlinear functions of $x$. The output $W_2 h$ is linear in these learned features but nonlinear in $x$, so the model can represent curved / piecewise-linear functions (in fact, with enough hidden units a single-hidden-layer ReLU network is a universal approximator). Crucially, $W_1$ is learned by the same ERM gradient descent that fits $W_2$ — the network discovers the features rather than having them hand-engineered. This is the essence of learned representations: feature construction and prediction are optimized jointly, end-to-end, against one empirical risk."
            }
          ]
        },
        {
          "id": "dl-the-artificial-neuron-and-mlp",
          "title": "The Neuron, Layers, and the Multilayer Perceptron",
          "minutes": 14,
          "content": "<h3>From a single decision unit to a network</h3>\n<p>Almost every modern AI system — the model that autocompletes your code, transcribes your voice, or labels a photo — is, at its computational core, a stack of the same humble building block repeated thousands or millions of times. In this lesson we build that block from scratch: the artificial <strong>neuron</strong>. We then assemble neurons into a <strong>layer</strong>, write the layer compactly in matrix form, stack layers into a <strong>multilayer perceptron (MLP)</strong>, and answer one question that separates a neural network from a glorified linear regression: <em>why must we insert a nonlinearity between the layers?</em></p>\n\n<h3>The artificial neuron</h3>\n<p>A single neuron takes an input vector $\\mathbf{x} = (x_1, x_2, \\ldots, x_n)$ and produces a single scalar output. It does this in two steps.</p>\n<p><strong>Step 1 — the pre-activation (a weighted sum).</strong> The neuron has a <strong>weight</strong> $w_i$ for each input and a single <strong>bias</strong> $b$. It computes</p>\n$$z = \\sum_{i=1}^{n} w_i x_i + b = \\mathbf{w} \\cdot \\mathbf{x} + b.$$\n<p>Here $z$ is called the <em>pre-activation</em> or <em>logit</em>. The weights say how strongly each input pushes the neuron; the bias shifts the threshold at which the neuron \"fires\" regardless of input. Geometrically, $\\mathbf{w}\\cdot\\mathbf{x} + b = 0$ defines a hyperplane in input space, and $z$ measures the signed distance (scaled by $\\|\\mathbf{w}\\|$) from $\\mathbf{x}$ to that plane.</p>\n<p><strong>Step 2 — the activation.</strong> We pass $z$ through a nonlinear function $\\sigma$ to get the neuron's output, the <strong>activation</strong>:</p>\n$$a = \\sigma(z) = \\sigma(\\mathbf{w}\\cdot\\mathbf{x} + b).$$\n<p>A classic choice is the logistic sigmoid $\\sigma(z) = \\dfrac{1}{1 + e^{-z}}$, which squashes any real number into $(0,1)$ and can be read as a soft probability of firing. Modern networks more often use the rectified linear unit (ReLU), $\\sigma(z) = \\max(0, z)$, but the two-step recipe is identical.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A neuron is a learnable \"soft gate.\" The weighted sum $z$ asks \"how much does this input look like the pattern I care about?\" and the activation $\\sigma$ turns that score into a firing level. Learning means adjusting $\\mathbf{w}$ and $b$ so the right inputs light up the right neurons.</p>\n</div>\n\n<h4>A neuron is logistic regression in disguise</h4>\n<p>If you have studied machine learning, the formula $a = \\sigma(\\mathbf{w}\\cdot\\mathbf{x}+b)$ should look familiar: a single sigmoid neuron <em>is exactly logistic regression</em>. This is the key connection — a neural network is not an exotic new idea, it is a composition of many simple logistic-regression-like units arranged so that earlier units learn features that later units consume.</p>\n\n<h3>A layer: many neurons in parallel</h3>\n<p>One neuron outputs one number. To produce a richer representation we place $m$ neurons side by side, all reading the same input $\\mathbf{x} \\in \\mathbb{R}^n$ but each with its own weights and bias. Neuron $j$ computes</p>\n$$z_j = \\sum_{i=1}^{n} W_{ji}\\, x_i + b_j, \\qquad a_j = \\sigma(z_j).$$\n<p>Writing this out for every neuron is tedious, so we collect the weights into a single <strong>weight matrix</strong> $W$ of shape $m \\times n$ (row $j$ holds neuron $j$'s weights) and the biases into a vector $\\mathbf{b} \\in \\mathbb{R}^m$. Then the whole layer is one clean expression:</p>\n$$\\mathbf{z} = W\\mathbf{x} + \\mathbf{b}, \\qquad \\mathbf{a} = \\sigma(\\mathbf{z}) = \\sigma(W\\mathbf{x} + \\mathbf{b}).$$\n<p>The activation $\\sigma$ is applied <strong>element-wise</strong>: $\\sigma(\\mathbf{z}) = (\\sigma(z_1), \\ldots, \\sigma(z_m))$. The output $\\mathbf{a} \\in \\mathbb{R}^m$ has one entry per neuron. The number $m$ — how many neurons in the layer — is called the layer's <strong>width</strong>.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>The matrix form is not just notation. A matrix-vector product $W\\mathbf{x}$ is the single most optimized operation in scientific computing; writing the layer this way is exactly what lets GPUs run a layer for thousands of inputs in parallel. The math and the hardware speak the same language.</p>\n</div>\n\n<h4>Dimension bookkeeping</h4>\n<p>Getting shapes right is half of practical deep learning. For a layer mapping $\\mathbb{R}^n \\to \\mathbb{R}^m$:</p>\n<ul>\n<li>Input $\\mathbf{x}$: shape $n$.</li>\n<li>Weight matrix $W$: shape $m \\times n$ (output dim by input dim).</li>\n<li>Bias $\\mathbf{b}$: shape $m$.</li>\n<li>Output $\\mathbf{a}$: shape $m$.</li>\n</ul>\n<p>A useful check: $W\\mathbf{x}$ is well-defined only if $W$'s number of columns equals $\\mathbf{x}$'s length, and the result inherits $W$'s number of rows.</p>\n\n<h3>Stacking layers: the multilayer perceptron</h3>\n<p>A single layer maps $\\mathbb{R}^n \\to \\mathbb{R}^m$. We now <em>chain</em> layers: the output of one layer becomes the input to the next. With $L$ layers, denote layer $\\ell$'s parameters $W^{(\\ell)}, \\mathbf{b}^{(\\ell)}$ and write $\\mathbf{a}^{(0)} = \\mathbf{x}$ for the input. Then for $\\ell = 1, \\ldots, L$:</p>\n$$\\mathbf{z}^{(\\ell)} = W^{(\\ell)} \\mathbf{a}^{(\\ell-1)} + \\mathbf{b}^{(\\ell)}, \\qquad \\mathbf{a}^{(\\ell)} = \\sigma\\!\\left(\\mathbf{z}^{(\\ell)}\\right).$$\n<p>The final output is $\\hat{\\mathbf{y}} = \\mathbf{a}^{(L)}$. This is a <strong>multilayer perceptron</strong> (also called a fully-connected or dense feedforward network). The intermediate layers ($1 \\le \\ell < L$) are <strong>hidden layers</strong>; their activations are internal representations that no one labels directly — the network invents them. The number of layers is the network's <strong>depth</strong>.</p>\n<p>Computing $\\hat{\\mathbf{y}}$ from $\\mathbf{x}$ by sweeping through these equations in order is the <strong>forward pass</strong>. (Training adjusts the parameters via the <em>backward</em> pass / backpropagation, a topic for a later lesson — but everything there rests on the forward equations above.)</p>\n\n<h3>Why a nonlinearity is non-negotiable</h3>\n<p>Here is the central theoretical point of the lesson. Suppose we got lazy and dropped the activation function — i.e., set $\\sigma$ to the identity, $\\sigma(z) = z$. Then each layer is just an affine map $\\mathbf{z}^{(\\ell)} = W^{(\\ell)}\\mathbf{a}^{(\\ell-1)} + \\mathbf{b}^{(\\ell)}$, and a two-layer net computes</p>\n$$\\hat{\\mathbf{y}} = W^{(2)}\\!\\left(W^{(1)}\\mathbf{x} + \\mathbf{b}^{(1)}\\right) + \\mathbf{b}^{(2)} = \\underbrace{W^{(2)}W^{(1)}}_{W'}\\,\\mathbf{x} + \\underbrace{\\left(W^{(2)}\\mathbf{b}^{(1)} + \\mathbf{b}^{(2)}\\right)}_{\\mathbf{b}'}.$$\n<p>The result is <em>itself a single affine map</em> $\\hat{\\mathbf{y}} = W'\\mathbf{x} + \\mathbf{b}'$. By induction this holds for any depth: <strong>the composition of linear (affine) maps is again linear (affine).</strong> No matter how many layers you stack, without a nonlinearity in between you can represent exactly the same family of functions as a single layer — you have spent enormous compute to reinvent linear regression. Depth buys you nothing.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>The nonlinearity is what makes \"deep\" meaningful. Each $\\sigma$ bends and folds the input space so that the next layer's straight cuts (hyperplanes) carve curved, intricate decision boundaries in the original space. Stacking linear-then-bend, linear-then-bend is how networks build features of features — edges into shapes, shapes into objects. Remove the bends and the whole structure collapses to a single straight cut.</p>\n</div>\n\n<h4>The universal approximation intuition</h4>\n<p>Once the bends are back, how expressive is even a shallow network? The <strong>Universal Approximation Theorem</strong> says: a feedforward network with a single hidden layer and a non-polynomial activation (e.g. sigmoid or ReLU) can approximate <em>any</em> continuous function on a closed, bounded region to arbitrary accuracy, <strong>provided the hidden layer is wide enough</strong>. Intuitively, each ReLU neuron contributes a \"kink\" or step, and by combining many of them you can construct a piecewise-linear surface that hugs any target curve as closely as you like — the more neurons, the finer the staircase.</p>\n<p>Two important caveats keep this from being magic:</p>\n<ul>\n<li>It is an <em>existence</em> result. It guarantees a good set of weights <em>exists</em>; it says nothing about whether gradient descent will <em>find</em> them, or how many examples you need.</li>\n<li>The required <em>width</em> can be astronomically large. In practice, adding <strong>depth</strong> is often exponentially more parameter-efficient than width: deep nets reuse and compose features, so they reach the same accuracy with far fewer total weights. This efficiency — not raw expressiveness — is the practical reason we go deep.</li>\n</ul>\n\n<h3>Worked example: a forward pass through a tiny 2-layer net</h3>\n<p>Let us push concrete numbers through a network with input dimension 2, one hidden layer of width 2, and one output neuron. We use the sigmoid activation $\\sigma(z) = 1/(1+e^{-z})$ everywhere.</p>\n<pre><code>Input:   x = [1, 2]\n\nLayer 1 (hidden), W1 is 2x2, b1 is length 2:\n  W1 = [[ 0.5, -0.5],\n        [ 1.0,  0.0]]\n  b1 = [0, 1]\n\nLayer 2 (output), W2 is 1x2, b2 is length 1:\n  W2 = [2.0, -1.0]\n  b2 = [0.5]</code></pre>\n<p><strong>Hidden pre-activations</strong> $\\mathbf{z}^{(1)} = W^{(1)}\\mathbf{x} + \\mathbf{b}^{(1)}$:</p>\n$$z^{(1)}_1 = (0.5)(1) + (-0.5)(2) + 0 = -0.5, \\qquad z^{(1)}_2 = (1.0)(1) + (0.0)(2) + 1 = 2.0.$$\n<p><strong>Hidden activations</strong> $\\mathbf{a}^{(1)} = \\sigma(\\mathbf{z}^{(1)})$:</p>\n$$a^{(1)}_1 = \\sigma(-0.5) = \\frac{1}{1+e^{0.5}} \\approx 0.3775, \\qquad a^{(1)}_2 = \\sigma(2.0) = \\frac{1}{1+e^{-2}} \\approx 0.8808.$$\n<p><strong>Output pre-activation</strong> $z^{(2)} = W^{(2)}\\mathbf{a}^{(1)} + b^{(2)}$:</p>\n$$z^{(2)} = (2.0)(0.3775) + (-1.0)(0.8808) + 0.5 = 0.7550 - 0.8808 + 0.5 = 0.3742.$$\n<p><strong>Output activation</strong> $\\hat{y} = \\sigma(z^{(2)})$:</p>\n$$\\hat{y} = \\sigma(0.3742) = \\frac{1}{1+e^{-0.3742}} \\approx 0.5925.$$\n<p>So the network maps $\\mathbf{x} = (1,2)$ to roughly $0.59$. That single number is the end of one forward pass — the same computation, scaled up, that produces every prediction a deep model makes. Notice how mechanical it is: alternate \"matrix multiply + add bias\" with \"apply $\\sigma$ element-wise,\" layer after layer.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>A <strong>neuron</strong> computes $a = \\sigma(\\mathbf{w}\\cdot\\mathbf{x} + b)$ — a weighted sum plus bias, squashed by a nonlinearity. One sigmoid neuron is logistic regression.</li>\n<li>A <strong>layer</strong> stacks $m$ neurons: $\\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b})$, with $W$ of shape $m\\times n$ and $\\sigma$ applied element-wise. Its <strong>width</strong> is $m$.</li>\n<li>An <strong>MLP</strong> chains layers, feeding each layer's activations into the next; the number of layers is its <strong>depth</strong>, and the chained computation is the <strong>forward pass</strong>.</li>\n<li>Without a nonlinearity, stacked layers collapse into a single affine map — <strong>depth gains nothing</strong>. The activation is what makes deep learning deep.</li>\n<li>A wide enough single hidden layer can approximate any continuous function (<strong>universal approximation</strong>), but <strong>depth</strong> usually achieves the same with far fewer parameters.</li>\n</ul>\n<h4>Try it yourself</h4>\n<p>Run it, then tinker — change the inputs and re-run. The badge confirms when your output matches.</p>\n<div data-code=\"python\" data-expected=\"0.6\"># One neuron: weighted sum + bias, then ReLU.\ndef relu(z):\n    return max(0, z)\n\nw = [0.5, -0.5]\nb = 0.1\nx = [2.0, 1.0]\nz = sum(wi * xi for wi, xi in zip(w, x)) + b\nprint(round(relu(z), 3))</div>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"dl-neural-net\"></div>",
          "mcq": [
            {
              "q": "In a fully-connected layer mapping an input $\\mathbf{x}\\in\\mathbb{R}^n$ to an output $\\mathbf{a}\\in\\mathbb{R}^m$ via $\\mathbf{a}=\\sigma(W\\mathbf{x}+\\mathbf{b})$, what are the shapes of $W$ and $\\mathbf{b}$?",
              "choices": [
                "$W$ is $n\\times m$ and $\\mathbf{b}$ has length $n$",
                "$W$ is $m\\times n$ and $\\mathbf{b}$ has length $m$",
                "$W$ is $m\\times m$ and $\\mathbf{b}$ has length $n$",
                "$W$ is $n\\times n$ and $\\mathbf{b}$ has length $m$"
              ],
              "answer": 1,
              "explain": "Each of the $m$ output neurons has $n$ weights, so $W$ is $m\\times n$ (output dim by input dim) and there is one bias per output neuron, giving $\\mathbf{b}$ length $m$."
            },
            {
              "q": "Why does a multilayer perceptron require a nonlinear activation function between layers?",
              "choices": [
                "Without it, gradients would always be exactly zero and training could not start",
                "Without it, the network could only output values in the range $(0,1)$",
                "Without it, any stack of layers reduces to a single affine map, so depth adds no expressive power",
                "Without it, the weight matrices could not be multiplied due to shape mismatches"
              ],
              "answer": 2,
              "explain": "A composition of affine maps is itself affine ($W^{(2)}(W^{(1)}\\mathbf{x}+\\mathbf{b}^{(1)})+\\mathbf{b}^{(2)} = W'\\mathbf{x}+\\mathbf{b}'$), so without a nonlinearity any depth collapses to one equivalent linear layer."
            },
            {
              "q": "Which statement best captures the Universal Approximation Theorem and its practical limits?",
              "choices": [
                "A single wide-enough hidden layer can approximate any continuous function on a bounded region, but the theorem only guarantees existence of weights and the required width may be enormous",
                "Only networks with at least three hidden layers can approximate continuous functions, regardless of width",
                "Any MLP, regardless of activation, exactly represents every continuous function with finitely many neurons",
                "The theorem guarantees that gradient descent will always find the optimal weights for any continuous target"
              ],
              "answer": 0,
              "explain": "Universal approximation is an existence result for arbitrarily good approximation with sufficient width; it does not promise that training finds those weights, nor that the width is practical (which is why depth is often preferred)."
            },
            {
              "q": "For the input $\\mathbf{x}=(1,2)$ and $W^{(1)}=\\begin{bmatrix}0.5 & -0.5\\\\ 1.0 & 0.0\\end{bmatrix}$, $\\mathbf{b}^{(1)}=(0,1)$, what is the hidden pre-activation vector $\\mathbf{z}^{(1)}=W^{(1)}\\mathbf{x}+\\mathbf{b}^{(1)}$ (before applying $\\sigma$)?",
              "choices": [
                "$(-0.5,\\ 2.0)$",
                "$(0.5,\\ 1.0)$",
                "$(-0.5,\\ 1.0)$",
                "$(1.5,\\ 3.0)$"
              ],
              "answer": 0,
              "explain": "$z_1 = 0.5\\cdot1 + (-0.5)\\cdot2 + 0 = -0.5$ and $z_2 = 1.0\\cdot1 + 0.0\\cdot2 + 1 = 2.0$, giving $(-0.5, 2.0)$."
            },
            {
              "q": "A single neuron computes $a=\\sigma(\\mathbf{w}\\cdot\\mathbf{x}+b)$ with $\\sigma$ the logistic sigmoid. What is the role of the pre-activation $z=\\mathbf{w}\\cdot\\mathbf{x}+b$ before the activation is applied?",
              "choices": [
                "It is the logit: a signed score measuring (scaled) distance from $\\mathbf{x}$ to the hyperplane $\\mathbf{w}\\cdot\\mathbf{x}+b=0$",
                "It is already a probability in $(0,1)$ and the sigmoid merely rescales it",
                "It is the gradient the neuron uses to update its weights",
                "It is the bias term alone, independent of the inputs $\\mathbf{x}$"
              ],
              "answer": 0,
              "explain": "The pre-activation (logit) $z$ is the raw weighted sum plus bias, and geometrically it is the signed distance to the decision hyperplane scaled by $\\|\\mathbf{w}\\|$, only becoming a probability after the sigmoid."
            },
            {
              "q": "The lesson states that a single sigmoid neuron is 'logistic regression in disguise.' Which fact most directly justifies this claim?",
              "choices": [
                "Both fit their parameters by minimizing squared error on the activations",
                "Both compute $\\sigma(\\mathbf{w}\\cdot\\mathbf{x}+b)$, producing a probability from a linear score passed through the logistic function",
                "Both require at least one hidden layer to separate the classes",
                "Both use the ReLU activation to guarantee a valid probability"
              ],
              "answer": 1,
              "explain": "Logistic regression is exactly the model $\\sigma(\\mathbf{w}\\cdot\\mathbf{x}+b)$ with the logistic sigmoid, which is identical to a single sigmoid neuron's computation."
            },
            {
              "q": "For a neuron using the logistic sigmoid $\\sigma(z)=\\tfrac{1}{1+e^{-z}}$, what output does it produce, and what does its bias $b$ control?",
              "choices": [
                "Output in $(0,1)$; $b$ shifts the threshold at which the neuron fires regardless of the inputs",
                "Output in $(-1,1)$; $b$ rescales every input by a constant factor",
                "Output in $[0,\\infty)$; $b$ determines the slope of the activation",
                "Output in $\\{0,1\\}$; $b$ selects which input is most important"
              ],
              "answer": 0,
              "explain": "The logistic sigmoid squashes any real $z$ into $(0,1)$, and the bias adds a constant to $z$ that shifts the firing threshold independently of the inputs."
            },
            {
              "q": "Two neurons receive the same input $\\mathbf{x}$. Neuron A has $z=4$ and neuron B has $z=-4$ as their pre-activations. Using the logistic sigmoid, which neuron 'fires' more strongly and why?",
              "choices": [
                "Neuron B, because negative logits map to outputs near 1",
                "Neither — both map to exactly 0.5 because sigmoid is symmetric",
                "Neuron A, because a large positive logit maps near 1 while a large negative logit maps near 0",
                "Neuron A, but only if its weights are larger in magnitude than B's"
              ],
              "answer": 2,
              "explain": "The sigmoid is monotonically increasing and centered at 0.5, so a positive logit like $z=4$ gives an activation near 1 (strong firing) while $z=-4$ gives one near 0."
            }
          ],
          "flashcards": [
            {
              "front": "Write the computation of a single artificial neuron, naming each part.",
              "back": "$a=\\sigma(\\mathbf{w}\\cdot\\mathbf{x}+b)$. The weighted sum $z=\\mathbf{w}\\cdot\\mathbf{x}+b$ is the pre-activation (logit); $\\mathbf{w}$ are weights, $b$ is the bias, $\\sigma$ is the nonlinear activation, and $a$ is the output activation."
            },
            {
              "front": "What is the matrix form of a fully-connected layer, and how is the activation applied?",
              "back": "$\\mathbf{a}=\\sigma(W\\mathbf{x}+\\mathbf{b})$, where $W$ is $m\\times n$, $\\mathbf{b}$ has length $m$, and $\\sigma$ is applied element-wise to each entry of $W\\mathbf{x}+\\mathbf{b}$."
            },
            {
              "front": "Layer width vs. network depth — define each.",
              "back": "Width = the number of neurons in a layer (the output dimension $m$). Depth = the number of layers stacked in the network. Width makes a layer richer; depth lets the network compose features of features."
            },
            {
              "front": "Why can't you build a useful deep network out of purely linear layers?",
              "back": "Because a composition of affine maps is itself affine: $W^{(2)}(W^{(1)}\\mathbf{x}+\\mathbf{b}^{(1)})+\\mathbf{b}^{(2)}=W'\\mathbf{x}+\\mathbf{b}'$. Any depth collapses to one equivalent linear layer, so nonlinear activations are required for depth to add power."
            },
            {
              "front": "State the Universal Approximation Theorem (intuitive form) and its two key caveats.",
              "back": "A one-hidden-layer net with a non-polynomial activation can approximate any continuous function on a bounded region to arbitrary accuracy if wide enough. Caveats: (1) it only guarantees weights exist, not that training finds them; (2) required width can be huge, so depth is usually more parameter-efficient."
            },
            {
              "front": "What is a 'forward pass' in an MLP?",
              "back": "Computing the output from the input by sweeping layer by layer: $\\mathbf{z}^{(\\ell)}=W^{(\\ell)}\\mathbf{a}^{(\\ell-1)}+\\mathbf{b}^{(\\ell)}$, $\\mathbf{a}^{(\\ell)}=\\sigma(\\mathbf{z}^{(\\ell)})$, starting from $\\mathbf{a}^{(0)}=\\mathbf{x}$ and ending at $\\hat{\\mathbf{y}}=\\mathbf{a}^{(L)}$."
            }
          ],
          "homework": [
            {
              "prompt": "Hand-compute a full forward pass. Use input $\\mathbf{x}=(2,-1)$, ReLU activation $\\sigma(z)=\\max(0,z)$ in the hidden layer, and identity output (no activation on the final neuron). Hidden layer: $W^{(1)}=\\begin{bmatrix}1 & 1\\\\ -1 & 2\\end{bmatrix}$, $\\mathbf{b}^{(1)}=(0,1)$. Output layer: $W^{(2)}=\\begin{bmatrix}3 & -2\\end{bmatrix}$, $b^{(2)}=1$. Compute $\\hat{y}$.",
              "hint": "First get $\\mathbf{z}^{(1)}=W^{(1)}\\mathbf{x}+\\mathbf{b}^{(1)}$, then apply ReLU element-wise (clamp negatives to 0) to get $\\mathbf{a}^{(1)}$, then $\\hat{y}=W^{(2)}\\mathbf{a}^{(1)}+b^{(2)}$.",
              "solution": "Hidden pre-activations: $z^{(1)}_1 = 1\\cdot2 + 1\\cdot(-1) + 0 = 1$; $z^{(1)}_2 = -1\\cdot2 + 2\\cdot(-1) + 1 = -3$. Apply ReLU: $a^{(1)}_1=\\max(0,1)=1$; $a^{(1)}_2=\\max(0,-3)=0$. Output: $\\hat{y} = 3\\cdot1 + (-2)\\cdot0 + 1 = 4$. So $\\hat{y}=4$. Note the ReLU zeroed out the second hidden neuron, which is exactly the kind of nonlinear gating that makes depth meaningful."
            },
            {
              "prompt": "Prove that two stacked linear layers with no activation are equivalent to a single linear layer. Specifically, show that $\\mathbf{f}(\\mathbf{x})=W^{(2)}(W^{(1)}\\mathbf{x}+\\mathbf{b}^{(1)})+\\mathbf{b}^{(2)}$ can be written as $W'\\mathbf{x}+\\mathbf{b}'$, and give explicit formulas for $W'$ and $\\mathbf{b}'$.",
              "hint": "Distribute $W^{(2)}$ over the inner expression using the distributive property of matrix multiplication, then group the term that multiplies $\\mathbf{x}$ separately from the constant terms.",
              "solution": "Distribute: $\\mathbf{f}(\\mathbf{x}) = W^{(2)}W^{(1)}\\mathbf{x} + W^{(2)}\\mathbf{b}^{(1)} + \\mathbf{b}^{(2)}$. The first term is linear in $\\mathbf{x}$ with matrix $W' = W^{(2)}W^{(1)}$; the remaining terms are constant (independent of $\\mathbf{x}$), giving $\\mathbf{b}' = W^{(2)}\\mathbf{b}^{(1)} + \\mathbf{b}^{(2)}$. Hence $\\mathbf{f}(\\mathbf{x}) = W'\\mathbf{x} + \\mathbf{b}'$, a single affine map. By induction the same holds for any number of activation-free layers, which is why a nonlinearity is required for depth to add expressive power."
            },
            {
              "prompt": "A fully-connected MLP has input dimension 4, two hidden layers of widths 8 and 6, and an output of dimension 3 (no biases counted yet). (a) Give the shape of each weight matrix. (b) Count the total number of weight parameters. (c) Now include biases and give the total parameter count.",
              "hint": "A layer mapping dimension $n$ to dimension $m$ has a weight matrix of shape $m\\times n$ (so $mn$ weights) and $m$ biases. Apply this layer by layer.",
              "solution": "(a) Layer 1: $4\\to8$, so $W^{(1)}$ is $8\\times4$. Layer 2: $8\\to6$, so $W^{(2)}$ is $6\\times8$. Layer 3: $6\\to3$, so $W^{(3)}$ is $3\\times6$. (b) Weights: $8\\cdot4 + 6\\cdot8 + 3\\cdot6 = 32 + 48 + 18 = 98$. (c) Biases: $8 + 6 + 3 = 17$. Total parameters $= 98 + 17 = 115$."
            }
          ]
        },
        {
          "id": "dl-activation-functions",
          "title": "Activation Functions and Why They Matter",
          "minutes": 12,
          "content": "<h3>Why activations exist at all</h3>\n<p>A neural network layer does two things: an <strong>affine transform</strong> $z = Wx + b$, then a <strong>nonlinearity</strong> $a = \\phi(z)$ applied element-wise. The affine part is the learnable, linear-algebra workhorse. The nonlinearity $\\phi$ — the <em>activation function</em> — is what makes the whole stack expressive. Without it, depth buys you nothing.</p>\n<p>Here is the formal reason. Stack two linear layers with no activation between them:</p>\n$$a = W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2) = W' x + b'.$$\n<p>The composition collapses into a <em>single</em> affine map. A hundred linear layers is still just one linear layer. Whatever depth you pay for in compute, you get the representational power of a single perceptron — incapable of solving even XOR. The activation is the wedge that prevents this collapse and lets the network carve curved, piecewise, hierarchical decision boundaries. This is the practical face of the <strong>universal approximation theorem</strong>: a single hidden layer with a suitable nonlinearity can approximate any continuous function on a compact set, but <em>only</em> because $\\phi$ is nonlinear.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>An activation function is judged on two axes that constantly trade off: <strong>expressivity</strong> (does it bend the function space usefully?) and <strong>trainability</strong> (does its derivative let gradients flow during backprop?). Most of the history of deep learning's \"activation wars\" is really a fight over the second axis.</p></div>\n\n<h3>The gradient lens: why derivatives are the whole story</h3>\n<p>Backpropagation multiplies derivatives along the chain. For a deep stack, the gradient reaching an early layer contains a product of many per-layer Jacobians, each carrying a factor of $\\phi'(z)$. So the <em>shape of $\\phi'$</em> decides whether learning signal survives the trip backward:</p>\n<ul>\n<li>If $\\phi'(z)$ is small over wide regions of $z$, gradients shrink multiplicatively layer after layer — the <strong>vanishing gradient</strong> problem. Early layers barely learn.</li>\n<li>If $\\phi'(z)$ is reliably near $1$ wherever the unit is \"active,\" gradients pass through cleanly and deep networks train.</li>\n</ul>\n<p>Keep this in mind as we go through each function: <em>we mostly care about where the derivative is large vs. where it dies.</em> A region where $\\phi'(z) \\approx 0$ is called a <strong>saturation region</strong>.</p>\n\n<h3>Sigmoid (logistic)</h3>\n<p><strong>Formula and range.</strong> $$\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\sigma: \\mathbb{R} \\to (0, 1).$$</p>\n<p><strong>Derivative.</strong> A famously clean identity — it expresses the slope purely in terms of the output:</p>\n$$\\sigma'(z) = \\sigma(z)\\,\\bigl(1 - \\sigma(z)\\bigr).$$\n<p>Its maximum is at $z=0$, where $\\sigma(0)=0.5$ and $\\sigma'(0) = 0.5 \\cdot 0.5 = 0.25$. So <em>the steepest the sigmoid ever gets is a slope of $1/4$.</em> For $|z| \\gtrsim 5$ the curve flattens and $\\sigma'(z)$ collapses toward $0$ — those are the two saturation tails.</p>\n<p><strong>Failure modes.</strong></p>\n<ul>\n<li><strong>Vanishing gradients.</strong> Even in the best case the derivative caps at $0.25$. Multiply $0.25$ across, say, 10 layers and you get $\\approx 10^{-6}$ before any saturation even kicks in. Push units into the tails and the gradient is effectively zero. This is the historical reason deep sigmoid networks were nearly untrainable.</li>\n<li><strong>Not zero-centered.</strong> Outputs live in $(0,1)$, so the inputs to the next layer are always positive. Combined with backprop, this biases the gradient of all weights into a unit toward the same sign each step, causing inefficient zig-zag updates.</li>\n<li><strong>$\\exp$ is mildly expensive</strong> compared to a max.</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">Where it still wins</div><p>Sigmoid is the right choice for the <strong>output</strong> unit of a binary classifier or any node that must emit a probability in $(0,1)$ — paired with binary cross-entropy loss, the gradient simplifies beautifully to $(\\hat{y} - y)$ and the saturation problem disappears at the output. Its weakness is as a <em>hidden</em> activation, not as a probabilistic head. It also lives on inside LSTM/GRU gates, where a value in $(0,1)$ literally means \"how much to let through.\"</p></div>\n\n<h3>Tanh (hyperbolic tangent)</h3>\n<p><strong>Formula and range.</strong> $$\\tanh(z) = \\frac{e^{z}-e^{-z}}{e^{z}+e^{-z}} = 2\\sigma(2z) - 1, \\qquad \\tanh: \\mathbb{R} \\to (-1, 1).$$</p>\n<p><strong>Derivative.</strong> $$\\tanh'(z) = 1 - \\tanh^2(z),$$ with maximum $\\tanh'(0) = 1$ at the origin.</p>\n<p>Tanh is essentially a rescaled, recentered sigmoid. The crucial upgrade is that it is <strong>zero-centered</strong>: outputs span $(-1,1)$, so the next layer sees inputs of both signs, fixing sigmoid's zig-zag bias. Its peak slope of $1$ (vs. sigmoid's $0.25$) also lets gradients flow more strongly near the origin.</p>\n<p><strong>Failure mode.</strong> Tanh still <em>saturates</em> in both tails — for $|z| \\gtrsim 3$, $\\tanh'(z) \\to 0$. So it mitigates but does not cure vanishing gradients in very deep feed-forward stacks. Tanh was the default hidden activation through the early 2010s and remains common in RNN cells, where its bounded output keeps recurrent state from exploding.</p>\n\n<h3>ReLU (Rectified Linear Unit)</h3>\n<p><strong>Formula and range.</strong> $$\\mathrm{ReLU}(z) = \\max(0, z), \\qquad \\mathrm{ReLU}: \\mathbb{R} \\to [0, \\infty).$$</p>\n<p><strong>Derivative.</strong> $$\\mathrm{ReLU}'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z < 0 \\end{cases}$$ and is undefined at exactly $z=0$ (in practice frameworks just pick $0$ or $1$; the kink is a measure-zero event).</p>\n<p>This is the function that made very deep networks practical. The reasons are exactly the two axes from before:</p>\n<ul>\n<li><strong>No saturation on the positive side.</strong> For any active unit, $\\phi'(z) = 1$ exactly — gradients pass through <em>undiminished</em>, no $0.25$ tax, no tail. Stacking depth no longer multiplicatively kills the signal.</li>\n<li><strong>Sparsity and speed.</strong> Negative pre-activations output exactly $0$, so a typical layer fires only a subset of its units (sparse representations). And $\\max(0,z)$ is about as cheap as arithmetic gets — no exponentials.</li>\n</ul>\n<p><strong>Failure mode — the dying ReLU.</strong> Because the gradient is exactly $0$ for $z<0$, a unit that gets pushed into the negative region for <em>all</em> inputs receives zero gradient forever and can never recover — it is permanently stuck outputting $0$. This often happens after a large gradient update (frequently from too high a learning rate) drives the weights so that $z$ is negative on the whole dataset. Such \"dead\" units are wasted capacity; in pathological setups a large fraction of a layer can die.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>ReLU's strength and weakness are the same fact. The hard zero on the left is what gives you clean, undamped gradients on the right (slope exactly $1$, not $0.99$ decaying to $0$) and free sparsity — but a hard zero also means a hard <em>off switch</em> for the gradient. A dead ReLU is the only failure on this page that is permanent rather than just slow.</p></div>\n\n<h3>Leaky ReLU</h3>\n<p><strong>Formula and range.</strong> With a small slope $\\alpha$ (typically $0.01$): $$\\mathrm{LReLU}(z) = \\max(\\alpha z,\\, z) = \\begin{cases} z & z \\ge 0 \\\\ \\alpha z & z < 0 \\end{cases}, \\qquad \\mathrm{LReLU}: \\mathbb{R} \\to \\mathbb{R}.$$</p>\n<p><strong>Derivative.</strong> $$\\mathrm{LReLU}'(z) = \\begin{cases} 1 & z > 0 \\\\ \\alpha & z < 0 \\end{cases}$$</p>\n<p>The single-purpose fix for dying ReLU: give the negative side a small nonzero slope so $\\phi'(z) = \\alpha \\neq 0$ everywhere. A unit pushed negative still receives a (small) gradient and can climb back to life. You keep ReLU's cheap, non-saturating positive branch while removing the permanent-death trap. The cost is that the clean exact-zero sparsity is gone, and you now have a hyperparameter $\\alpha$ (its learnable variant is <strong>PReLU</strong>). In practice the accuracy gain over plain ReLU is real but modest, which is why ReLU remained a strong default.</p>\n\n<h3>GELU (Gaussian Error Linear Unit)</h3>\n<p><strong>Formula and range.</strong> GELU weights an input by the probability that a standard normal falls below it:</p>\n$$\\mathrm{GELU}(z) = z \\cdot \\Phi(z) = z \\cdot \\tfrac{1}{2}\\Bigl[1 + \\mathrm{erf}\\!\\left(\\tfrac{z}{\\sqrt{2}}\\right)\\Bigr],$$\n<p>where $\\Phi$ is the standard normal CDF. A common fast approximation is $\\mathrm{GELU}(z) \\approx 0.5\\,z\\bigl(1 + \\tanh[\\sqrt{2/\\pi}\\,(z + 0.044715\\,z^3)]\\bigr)$. Its range is approximately $(-0.17,\\, \\infty)$ — it can go slightly negative.</p>\n<p>GELU is the activation behind modern Transformers (BERT, GPT-family, ViT). Conceptually it is a <strong>smooth</strong>, probabilistically-motivated cousin of ReLU. Instead of a hard gate (\"keep $z$ if $z>0$\"), it multiplies $z$ by <em>how likely</em> the gate should be open, $\\Phi(z)$. The result:</p>\n<ul>\n<li>Looks like ReLU for large $|z|$ ($\\Phi \\to 1$ on the right, $\\to 0$ on the left) but is <strong>smooth everywhere</strong> — differentiable at the origin, with a small non-monotonic dip just left of zero.</li>\n<li>The smoothness yields slightly better-behaved gradients near the kink and, empirically, better convergence and final accuracy on Transformer-scale models. The price is the most expensive evaluation on this page (an $\\mathrm{erf}$ or $\\tanh$).</li>\n</ul>\n\n<h3>Worked example: tracing gradient flow through one unit</h3>\n<p>Suppose a hidden unit has pre-activation $z = -4$ and we compare what each activation contributes to the backward pass — i.e., the local factor $\\phi'(z)$ that the upstream gradient gets multiplied by.</p>\n<ul>\n<li><strong>Sigmoid:</strong> $\\sigma(-4) = \\frac{1}{1+e^{4}} \\approx 0.0180$, so $\\sigma'(-4) = 0.0180(1-0.0180) \\approx 0.0177$. Deep in the saturation tail — the gradient is multiplied by $\\approx 0.018$, almost extinguished.</li>\n<li><strong>Tanh:</strong> $\\tanh(-4) \\approx -0.9993$, so $\\tanh'(-4) = 1 - 0.9993^2 \\approx 0.0013$. Even <em>more</em> saturated than sigmoid here — essentially no gradient.</li>\n<li><strong>ReLU:</strong> $z<0$, so $\\mathrm{ReLU}'(-4) = 0$. The unit is off and contributes <em>nothing</em> to the gradient. If this holds for all inputs, the unit is dead.</li>\n<li><strong>Leaky ReLU ($\\alpha=0.01$):</strong> $\\mathrm{LReLU}'(-4) = 0.01$. Small, but nonzero — the unit can still be nudged back toward $z>0$.</li>\n<li><strong>GELU:</strong> at $z=-4$, $\\Phi(-4)\\approx 3.2\\times10^{-5}$; the output is a tiny negative number and the local slope is small but technically nonzero, with the same recoverability property as Leaky ReLU.</li>\n</ul>\n<p><strong>Takeaway:</strong> at a moderately negative pre-activation, the saturating functions (sigmoid, tanh) and plain ReLU all pass roughly zero gradient — but for different reasons. Sigmoid/tanh are <em>temporarily</em> stuck (move $z$ toward $0$ and they revive); a ReLU at $z<0$ across the whole dataset is <em>permanently</em> stuck. Leaky ReLU and GELU keep a thread of gradient alive precisely to prevent that permanent death.</p>\n\n<h3>Choosing in practice</h3>\n<p><strong>Hidden layers.</strong> Default to <strong>ReLU</strong> — cheap, non-saturating, battle-tested. If you observe many dead units (e.g., a chunk of a layer always outputs $0$), switch to <strong>Leaky ReLU / PReLU</strong>. For Transformers and large modern architectures, <strong>GELU</strong> (or its sibling SiLU/Swish) is the standard. Avoid sigmoid/tanh as hidden activations in deep feed-forward nets; reserve <strong>tanh</strong> for bounded recurrent state where you specifically want $(-1,1)$ outputs.</p>\n<p><strong>Output layer.</strong> This is dictated by the task, not by trainability: <strong>sigmoid</strong> for one probability (binary classification / multi-label), <strong>softmax</strong> (the vector generalization of sigmoid) for mutually-exclusive multiclass, and <strong>no activation / identity</strong> for unbounded regression targets. Using ReLU on a regression output silently forbids negative predictions — usually a bug, not a feature.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The output activation must be <em>compatible with the loss</em>: sigmoid + binary cross-entropy and softmax + categorical cross-entropy are designed as pairs whose combined gradient is the clean $(\\hat{y}-y)$, which is exactly why their output-side saturation never hurts training. The hidden-layer choice is governed by gradient flow; the output choice is governed by the probabilistic meaning you need and its matching loss.</p></div>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"dl-activation\"></div>",
          "mcq": [
            {
              "q": "You are designing a deep feed-forward network for a regression task that predicts house prices (which can be any positive real number, and you train on log-price so targets can be negative). Which combination is most appropriate?",
              "choices": [
                "Sigmoid in hidden layers, sigmoid on the output",
                "ReLU in hidden layers, identity (no activation) on the output",
                "Tanh in hidden layers, ReLU on the output",
                "ReLU in hidden layers, softmax on the output"
              ],
              "answer": 1,
              "explain": "Hidden layers want a non-saturating activation for gradient flow (ReLU), and an unbounded regression target needs a linear/identity output. ReLU or sigmoid on the output would forbid the negative log-price values, and softmax is for mutually-exclusive classes."
            },
            {
              "q": "A unit has pre-activation $z = 6$. For which activation is the local derivative $\\phi'(6)$ effectively zero (deepest saturation)?",
              "choices": [
                "ReLU",
                "Sigmoid",
                "Leaky ReLU",
                "Identity"
              ],
              "answer": 1,
              "explain": "Sigmoid saturates in both tails, so $\\sigma'(6) = \\sigma(6)(1-\\sigma(6)) \\approx 0.0025$, essentially zero. ReLU, Leaky ReLU, and identity all have derivative near or equal to 1 for large positive $z$."
            },
            {
              "q": "During training you notice that about 40% of the units in a ReLU layer output exactly 0 for every example in the dataset and never change. What is happening and what is a direct fix?",
              "choices": [
                "Vanishing gradients from the 0.25 derivative cap; switch to tanh",
                "Dying ReLU: those units' gradients are stuck at 0; use Leaky ReLU or lower the learning rate",
                "Exploding gradients; add a sigmoid output",
                "Normal sparsity that requires no action and cannot be improved"
              ],
              "answer": 1,
              "explain": "Units permanently outputting 0 are dead ReLUs: their pre-activation is negative for all inputs, so the gradient is exactly 0 and they can't recover. Leaky ReLU keeps a nonzero negative-side slope, and a smaller learning rate prevents the large update that kills them."
            },
            {
              "q": "Why does sigmoid suffer from vanishing gradients more readily than tanh in deep hidden layers, even before either function saturates?",
              "choices": [
                "Sigmoid is not differentiable at 0",
                "Sigmoid's maximum derivative is only 0.25, while tanh's peak derivative is 1, so per-layer signal is attenuated even at the steepest point",
                "Tanh outputs are in (0,1), which centers the data",
                "Sigmoid has no exponential, so it computes faster but loses precision"
              ],
              "answer": 1,
              "explain": "At its steepest (z=0) sigmoid has slope 0.25 versus tanh's 1.0, so each sigmoid layer multiplies the backprop signal by at most 1/4 even before any tail saturation; tanh is also zero-centered (range (-1,1), not (0,1))."
            },
            {
              "q": "A colleague builds a 50-layer network using only affine transforms $z = Wx + b$ with no activation functions between layers, reasoning that more layers means more power. What can this network represent?",
              "choices": [
                "An arbitrarily complex piecewise-linear function, one linear piece per layer",
                "Exactly a single affine map $W'x + b'$, equivalent to one linear layer",
                "Any continuous function, by the universal approximation theorem",
                "A function that can solve XOR because depth alone provides nonlinearity"
              ],
              "answer": 1,
              "explain": "Composing affine maps yields another affine map ($W_2(W_1x+b_1)+b_2 = (W_2W_1)x + (W_2b_1+b_2)$), so without nonlinearity the 50 layers collapse to a single perceptron incapable of even XOR."
            },
            {
              "q": "GELU is described as a 'smooth, probabilistically-motivated cousin of ReLU.' What is the precise meaning of the $\\Phi(z)$ factor in $\\mathrm{GELU}(z) = z\\cdot\\Phi(z)$?",
              "choices": [
                "It is the sigmoid of $z$, which bounds the output to $(0,1)$",
                "It is the standard normal CDF, weighting the input by the probability the gate should be open",
                "It is a learnable scaling hyperparameter analogous to Leaky ReLU's $\\alpha$",
                "It is the derivative of ReLU, smoothed at the origin"
              ],
              "answer": 1,
              "explain": "$\\Phi$ is the standard normal CDF, so GELU multiplies $z$ by how likely a standard normal falls below it, replacing ReLU's hard gate with a soft probabilistic one that is smooth everywhere."
            },
            {
              "q": "The lesson calls tanh's zero-centered output its 'crucial upgrade' over sigmoid. Beyond the steeper peak slope, why does the $(-1,1)$ range specifically help training?",
              "choices": [
                "It guarantees gradients never vanish in the tails, unlike sigmoid",
                "It lets the next layer receive inputs of both signs, removing sigmoid's same-sign zig-zag bias on the weight updates",
                "It makes the activation computationally cheaper than sigmoid by avoiding exponentials",
                "It bounds the output so the network can directly emit probabilities"
              ],
              "answer": 1,
              "explain": "Sigmoid's all-positive $(0,1)$ outputs bias every weight gradient into a unit toward the same sign each step (zig-zag updates); tanh's both-sign $(-1,1)$ outputs fix this, though it still saturates in both tails."
            },
            {
              "q": "At pre-activation $z = -4$, both tanh ($\\tanh'(-4)\\approx 0.0013$) and a ReLU ($\\mathrm{ReLU}'(-4)=0$) pass essentially no gradient. Why is the ReLU situation qualitatively worse if $z<0$ holds across the entire dataset?",
              "choices": [
                "Tanh's gradient is larger, so it always trains faster than ReLU at every input",
                "The tanh unit is only temporarily stuck and revives if $z$ moves toward 0, whereas the ReLU receives exactly zero gradient and is permanently dead",
                "ReLU outputs a negative number that destabilizes later layers",
                "Tanh saturation is permanent while ReLU saturation is temporary"
              ],
              "answer": 1,
              "explain": "Tanh's near-zero gradient is recoverable because nudging $z$ toward 0 restores a large slope, but a ReLU stuck at $z<0$ for all inputs gets exactly zero gradient forever and can never climb back, making its death permanent."
            }
          ],
          "flashcards": [
            {
              "front": "Sigmoid: formula, derivative, output range, and primary tradeoff?",
              "back": "$\\sigma(z)=\\frac{1}{1+e^{-z}}$; derivative $\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$ (max 0.25 at z=0); range $(0,1)$. Tradeoff: great as a probabilistic binary output, but saturates in both tails and its 0.25 cap causes vanishing gradients in hidden layers; not zero-centered."
            },
            {
              "front": "Tanh: formula, derivative, output range, and primary tradeoff?",
              "back": "$\\tanh(z)=\\frac{e^z-e^{-z}}{e^z+e^{-z}}=2\\sigma(2z)-1$; derivative $1-\\tanh^2(z)$ (max 1 at z=0); range $(-1,1)$. Tradeoff: zero-centered with stronger central gradient than sigmoid, but still saturates in both tails."
            },
            {
              "front": "ReLU: formula, derivative, output range, and primary tradeoff?",
              "back": "$\\max(0,z)$; derivative is 1 for $z>0$, 0 for $z<0$; range $[0,\\infty)$. Tradeoff: non-saturating positive side (gradient exactly 1) and cheap + sparse, but units can permanently die (gradient 0 when stuck negative)."
            },
            {
              "front": "Leaky ReLU: formula, derivative, output range, and primary tradeoff?",
              "back": "$\\max(\\alpha z, z)$ with small $\\alpha$ (e.g. 0.01); derivative 1 for $z>0$, $\\alpha$ for $z<0$; range $(-\\infty,\\infty)$. Tradeoff: fixes dying ReLU by keeping a nonzero negative-side gradient, at the cost of losing exact-zero sparsity and adding hyperparameter $\\alpha$."
            },
            {
              "front": "GELU: definition, qualitative shape, and primary tradeoff?",
              "back": "$\\mathrm{GELU}(z)=z\\,\\Phi(z)$, where $\\Phi$ is the standard normal CDF (weights input by P(open gate)). A smooth, slightly-negative-capable cousin of ReLU; standard in Transformers. Tradeoff: smoother gradients and better convergence at scale, but the most expensive to compute (erf/tanh)."
            },
            {
              "front": "Rule of thumb: which activation for HIDDEN vs OUTPUT layers?",
              "back": "Hidden: ReLU by default (GELU/SiLU for Transformers; Leaky ReLU if units die). Output: dictated by task + matching loss — sigmoid for binary probability, softmax for multiclass, identity for unbounded regression."
            }
          ],
          "homework": [
            {
              "prompt": "Prove that a feed-forward network with $L$ layers and NO activation functions (pure affine maps) is equivalent to a single affine map, and state precisely what this implies about the network's ability to learn the XOR function.",
              "hint": "Compose two affine maps $f_2(f_1(x))$ where $f_i(u)=W_i u + b_i$ and group the terms. Then recall what kind of decision boundary a single affine map produces.",
              "solution": "Let layer $i$ compute $f_i(u)=W_i u + b_i$. Composing all $L$ layers: $f_L(\\cdots f_1(x))$. Take two layers as the base case: $f_2(f_1(x)) = W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2)$, which has the form $W'x+b'$ with $W'=W_2 W_1$ and $b'=W_2 b_1 + b_2$ — a single affine map. By induction, composing $L$ affine maps yields one affine map $W^{(\\mathrm{eff})}x + b^{(\\mathrm{eff})}$. Implication: the network can only produce a linear decision boundary (a single hyperplane). XOR is not linearly separable — no single hyperplane separates {(0,0),(1,1)} from {(0,1),(1,0)} — so such a network can never learn XOR regardless of depth. A nonlinear activation between layers breaks the collapse and makes XOR (and arbitrary continuous functions, per universal approximation) learnable."
            },
            {
              "prompt": "For sigmoid $\\sigma$, (a) derive the identity $\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$ from the definition, and (b) find the value of $z$ that maximizes $\\sigma'(z)$ and the maximum value itself.",
              "hint": "Write $\\sigma(z)=(1+e^{-z})^{-1}$ and use the chain rule for (a). For (b), note $\\sigma'$ is symmetric and that $\\sigma(z)(1-\\sigma(z))$ is a downward parabola in the variable $s=\\sigma(z)\\in(0,1)$.",
              "solution": "(a) $\\sigma(z)=(1+e^{-z})^{-1}$. Then $\\sigma'(z) = -(1+e^{-z})^{-2}\\cdot(-e^{-z}) = \\frac{e^{-z}}{(1+e^{-z})^2}$. Rewrite: $\\frac{e^{-z}}{(1+e^{-z})^2} = \\frac{1}{1+e^{-z}}\\cdot\\frac{e^{-z}}{1+e^{-z}} = \\sigma(z)\\cdot\\frac{e^{-z}}{1+e^{-z}}$. Since $\\frac{e^{-z}}{1+e^{-z}} = \\frac{(1+e^{-z})-1}{1+e^{-z}} = 1-\\sigma(z)$, we get $\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$. (b) Let $s=\\sigma(z)\\in(0,1)$; maximize $g(s)=s(1-s)=s-s^2$. $g'(s)=1-2s=0 \\Rightarrow s=1/2$, i.e. $\\sigma(z)=1/2 \\Rightarrow z=0$. Maximum value $g(1/2)=1/2\\cdot1/2=1/4=0.25$. So the steepest slope of sigmoid is 0.25, attained at $z=0$ — the root cause of its weak gradient signal in deep hidden layers."
            },
            {
              "prompt": "A 10-layer network uses sigmoid in every hidden layer. Assuming (optimistically) that every unit sits at its steepest point so each layer contributes the maximum sigmoid derivative, estimate the multiplicative attenuation of the gradient from the output to the first hidden layer. Then explain in one or two sentences why ReLU does not have this problem.",
              "hint": "Each layer multiplies the backprop signal by a factor of at most $\\sigma'_{\\max}$. Compose 10 of them. What is $\\sigma'_{\\max}$?",
              "solution": "The maximum sigmoid derivative is $0.25$ (from the previous problem). Best case, each of the 10 layers multiplies the gradient by $0.25$, so the gradient reaching the first hidden layer is scaled by at most $0.25^{10} = (1/4)^{10} = 1/4^{10} = 1/1{,}048{,}576 \\approx 9.5\\times10^{-7}$. So even under the most favorable assumption the signal is attenuated by roughly a factor of a million — and real units in the tails make it far worse. This is the vanishing-gradient problem. ReLU avoids it because for active units $\\phi'(z)=1$ exactly, so the per-layer factor is 1 (no attenuation) rather than $\\le 0.25$; the gradient passes through undiminished as long as units are on."
            }
          ]
        }
      ]
    },
    {
      "id": "dl-training-mechanics",
      "title": "How Networks Learn: Loss, Backprop, and Optimization",
      "lessons": [
        {
          "id": "dl-loss-functions",
          "title": "Loss Functions: MSE, Cross-Entropy, and the Softmax Link",
          "minutes": 14,
          "content": "<h3>Why we need a loss function at all</h3>\n<p>A neural network is, at heart, a parameterized function $f_\\theta$ that maps an input $x$ to a prediction $\\hat{y} = f_\\theta(x)$. Learning means choosing the parameters $\\theta$ so that the predictions are \"good.\" But <em>good</em> is meaningless until we commit to a number that measures badness. That number is the <strong>loss function</strong> $\\mathcal{L}(\\hat{y}, y)$, comparing the prediction $\\hat{y}$ to the ground-truth target $y$. The entire training procedure — backpropagation, gradient descent, every optimizer trick — exists to push the parameters in the direction that lowers this one scalar, averaged over the data.</p>\n<p>The loss is not an arbitrary choice. The right loss falls out of a probabilistic model of the data, and choosing it well is what makes gradients well-behaved. In this lesson we derive the two workhorse losses — <strong>mean squared error</strong> (MSE) for regression and <strong>cross-entropy</strong> for classification — from first principles, then show the elegant reason that softmax composed with cross-entropy produces the famously clean gradient $\\hat{y} - y$.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Almost every standard loss is a <strong>negative log-likelihood</strong> in disguise. Pick a probability distribution for how the target is generated given the network's output, write down the likelihood of the data, take the negative log, and you have your loss. MSE assumes Gaussian noise; cross-entropy assumes a categorical (or Bernoulli) distribution. This single principle unifies the whole zoo.</p>\n</div>\n\n<h3>Maximum likelihood: the engine behind both losses</h3>\n<p>Suppose our data are independent samples $(x_i, y_i)$. We model the conditional distribution $p(y \\mid x; \\theta)$ with the network. The <strong>likelihood</strong> of the dataset is the product of per-example probabilities:</p>\n$$\\mathcal{L}_{\\text{lik}}(\\theta) = \\prod_{i=1}^{N} p(y_i \\mid x_i; \\theta).$$\n<p>Maximizing a product of many small numbers is numerically awful and analytically clumsy, so we maximize its logarithm instead (the log is monotonic, so the argmax is unchanged). Equivalently, we <em>minimize the negative log-likelihood</em>:</p>\n$$\\theta^\\star = \\arg\\min_\\theta \\; -\\sum_{i=1}^{N} \\log p(y_i \\mid x_i; \\theta).$$\n<p>Every loss below is just this expression with a specific choice of $p$.</p>\n\n<h3>Regression and MSE: assume Gaussian noise</h3>\n<p>For regression, the natural assumption is that the true target equals the network's output plus zero-mean Gaussian noise of fixed variance $\\sigma^2$:</p>\n$$p(y \\mid x; \\theta) = \\mathcal{N}\\!\\left(y; \\, \\hat{y}, \\, \\sigma^2\\right) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\!\\left(-\\frac{(y - \\hat{y})^2}{2\\sigma^2}\\right), \\qquad \\hat{y} = f_\\theta(x).$$\n<p>Take the negative log of one term:</p>\n$$-\\log p(y \\mid x; \\theta) = \\frac{(y - \\hat{y})^2}{2\\sigma^2} + \\underbrace{\\frac{1}{2}\\log(2\\pi\\sigma^2)}_{\\text{constant in } \\theta}.$$\n<p>The constant does not depend on $\\theta$, so it has no effect on the minimizer and we drop it. Summing over the dataset (and absorbing $\\tfrac{1}{\\sigma^2}$ into the learning rate) leaves exactly the <strong>mean squared error</strong>:</p>\n$$\\mathcal{L}_{\\text{MSE}} = \\frac{1}{N}\\sum_{i=1}^{N} (y_i - \\hat{y}_i)^2.$$\n<p>So MSE is not a heuristic — it is the maximum-likelihood loss under the assumption of additive Gaussian noise with constant variance. Its gradient with respect to a single prediction is beautifully simple:</p>\n$$\\frac{\\partial}{\\partial \\hat{y}} (y - \\hat{y})^2 = -2(y - \\hat{y}) = 2(\\hat{y} - y).$$\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>MSE punishes large errors quadratically, so it cares disproportionately about outliers. If your targets contain heavy-tailed noise or outliers, the Gaussian assumption is wrong and MSE will chase them; mean <em>absolute</em> error (MAE, the negative log-likelihood of a Laplace distribution) is more robust. The loss you pick encodes a belief about your noise.</p>\n</div>\n\n<h4>A note on output activation for regression</h4>\n<p>Because the Gaussian target can be any real number, the output layer for plain regression is <strong>linear</strong> (no squashing activation). Forcing a sigmoid or ReLU on the output would artificially bound the range and bias the predictions.</p>\n\n<h3>Classification: from labels to probabilities</h3>\n<p>Classification is different: the target is a discrete class, not a real number. We want the network to output a probability distribution over $K$ classes. Two pieces are needed: a way to turn raw network outputs into a valid distribution (the <strong>softmax</strong>), and a loss that scores that distribution against the true label (<strong>cross-entropy</strong>).</p>\n\n<h4>Logits vs probabilities</h4>\n<p>The raw, unconstrained outputs of the final linear layer are called <strong>logits</strong>, $z = (z_1, \\dots, z_K) \\in \\mathbb{R}^K$. They can be any real numbers — positive, negative, large, small. They are <em>not</em> probabilities: they need not be in $[0,1]$ and need not sum to 1. The softmax converts logits into probabilities:</p>\n$$\\hat{y}_k = \\text{softmax}(z)_k = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}.$$\n<p>Each $\\hat{y}_k \\in (0,1)$ and $\\sum_k \\hat{y}_k = 1$ by construction. Exponentiation makes everything positive and amplifies differences (a logit gap of 2 becomes an odds ratio of $e^2 \\approx 7.4$); normalization makes the result a distribution.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Softmax is invariant to adding a constant to every logit: $\\text{softmax}(z + c\\mathbf{1}) = \\text{softmax}(z)$. This means logits are only defined up to a shift — the network has one redundant degree of freedom per example. We exploit exactly this invariance for numerical stability (see the log-sum-exp trick below) and it is why a $K$-class softmax really has only $K-1$ free parameters.</p>\n</div>\n\n<h4>Cross-entropy as negative log-likelihood</h4>\n<p>The true label is a one-hot vector $y = (y_1, \\dots, y_K)$ with $y_c = 1$ for the correct class $c$ and $0$ elsewhere. Model the label as a categorical draw with probabilities $\\hat{y}$. The likelihood of observing the true class is simply $p(y \\mid x) = \\prod_{k} \\hat{y}_k^{\\,y_k} = \\hat{y}_c$. The negative log-likelihood of one example is the <strong>categorical cross-entropy</strong>:</p>\n$$\\mathcal{L}_{\\text{CE}} = -\\sum_{k=1}^{K} y_k \\log \\hat{y}_k = -\\log \\hat{y}_c.$$\n<p>Because $y$ is one-hot, the sum collapses to a single term: the negative log of the probability the model assigned to the correct class. If the model is confident and right ($\\hat{y}_c \\to 1$), the loss $\\to 0$; if it is confidently wrong ($\\hat{y}_c \\to 0$), the loss $\\to +\\infty$. That unbounded penalty for confident mistakes is exactly the pressure we want during training.</p>\n<p>More generally, for any target distribution $y$ and predicted distribution $\\hat{y}$, $H(y, \\hat{y}) = -\\sum_k y_k \\log \\hat{y}_k$ is the cross-entropy from information theory: the expected number of nats to encode samples from $y$ using a code optimized for $\\hat{y}$. Minimizing it over $\\hat{y}$ drives $\\hat{y}$ toward $y$ (the minimum equals the entropy of $y$, attained when $\\hat{y} = y$).</p>\n\n<h4>Binary cross-entropy: the two-class special case</h4>\n<p>With $K = 2$ we usually output a single probability $\\hat{y} = \\sigma(z) = \\frac{1}{1 + e^{-z}}$ via the <strong>sigmoid</strong>, where $\\hat{y}$ is the probability of the positive class and $y \\in \\{0, 1\\}$. The Bernoulli negative log-likelihood gives <strong>binary cross-entropy</strong> (BCE):</p>\n$$\\mathcal{L}_{\\text{BCE}} = -\\big[\\, y \\log \\hat{y} + (1 - y)\\log(1 - \\hat{y}) \\,\\big].$$\n<p>Sigmoid is exactly the two-class softmax: set $z_1 = z$, $z_0 = 0$ and softmax gives $\\frac{e^z}{1 + e^z} = \\sigma(z)$. BCE is the categorical cross-entropy specialized to $K=2$. Note that for <strong>multi-label</strong> problems (each class independently present or absent), you apply a sigmoid and BCE <em>per class</em> rather than a single softmax — softmax forces mutual exclusivity, which is wrong when an image can be both \"beach\" and \"sunset.\"</p>\n\n<h3>The softmax + cross-entropy link: why the gradient is $\\hat{y} - y$</h3>\n<p>Here is the centerpiece. When softmax and cross-entropy are <em>composed</em>, the gradient of the loss with respect to the logits collapses to one of the cleanest expressions in all of deep learning. Let us derive it.</p>\n<p>Loss as a function of logits, with correct class $c$:</p>\n$$\\mathcal{L} = -\\log \\hat{y}_c = -\\log \\frac{e^{z_c}}{\\sum_j e^{z_j}} = -z_c + \\log \\sum_{j} e^{z_j}.$$\n<p>Differentiate with respect to an arbitrary logit $z_k$. The second term is the log-sum-exp, whose derivative is itself a softmax:</p>\n$$\\frac{\\partial}{\\partial z_k} \\log\\sum_j e^{z_j} = \\frac{e^{z_k}}{\\sum_j e^{z_j}} = \\hat{y}_k.$$\n<p>The first term $-z_c$ contributes $-1$ only when $k = c$, i.e. $-\\,\\mathbb{1}[k = c] = -y_k$ (since $y$ is one-hot). Therefore:</p>\n$$\\boxed{\\;\\frac{\\partial \\mathcal{L}}{\\partial z_k} = \\hat{y}_k - y_k\\;}$$\n<p>In vector form, $\\nabla_z \\mathcal{L} = \\hat{y} - y$. The gradient at the logits is just the prediction minus the target — the same elegant form as the MSE gradient (up to a constant). This is no coincidence: both losses are negative log-likelihoods of distributions in the <em>exponential family</em>, and for such models the natural-parameter gradient is always \"prediction minus observation.\"</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>This is why frameworks fuse the operations: PyTorch's <code>CrossEntropyLoss</code> and TensorFlow's <code>softmax_cross_entropy_with_logits</code> take <strong>logits, not probabilities</strong>. Computing softmax and the log separately loses precision and risks overflow; the fused op computes the stable log-sum-exp and returns the clean $\\hat{y} - y$ gradient directly. <strong>Never apply softmax yourself and then feed it to a cross-entropy that expects logits</strong> — a classic, silent bug that double-applies the normalization and cripples training.</p>\n</div>\n\n<h4>Why this gradient is so well-behaved</h4>\n<p>Contrast with using sigmoid + MSE for classification. That gradient contains a factor of $\\sigma'(z) = \\hat{y}(1 - \\hat{y})$, which is near zero whenever the network is confident — including when it is confidently <em>wrong</em>. The network then learns painfully slowly exactly when it most needs to correct itself (the <strong>saturation / vanishing-gradient</strong> problem). Cross-entropy's $\\hat{y} - y$ has no such saturating factor: a confident wrong answer produces a gradient of magnitude near 1, giving a strong corrective signal. This is the single biggest practical reason cross-entropy, not MSE, is used for classification.</p>\n\n<h3>Numerical stability: the log-sum-exp trick</h3>\n<p>Computing softmax naively is dangerous. If a logit is large (say $z_k = 1000$), $e^{1000}$ overflows to <code>inf</code>; if all logits are very negative, the denominator underflows to 0 and you divide by zero. The fix uses softmax's shift-invariance: subtract the max logit $m = \\max_j z_j$ before exponentiating.</p>\n$$\\text{softmax}(z)_k = \\frac{e^{z_k - m}}{\\sum_j e^{z_j - m}}, \\qquad m = \\max_j z_j.$$\n<p>Now the largest exponent is $e^0 = 1$, so nothing overflows, and at least one term in the denominator equals 1, so nothing underflows to a hard zero. For the loss we want $\\log$ of the sum directly, the <strong>log-sum-exp</strong> identity:</p>\n$$\\log \\sum_j e^{z_j} = m + \\log \\sum_j e^{z_j - m}.$$\n<p>This lets us compute the cross-entropy loss $-z_c + \\log\\sum_j e^{z_j}$ in a numerically stable way without ever materializing the probabilities. It is precisely what the fused logits-based loss functions do internally.</p>\n\n<h3>Worked example: a 3-class step, end to end</h3>\n<p>Suppose a single training example whose true class is class 2 (0-indexed), so the one-hot target is $y = (0, 0, 1)$. The network produces logits $z = (2.0, \\, 1.0, \\, 0.1)$. Let us compute the probabilities, the loss, and the gradient.</p>\n<p><strong>Step 1 — stabilize.</strong> $m = \\max(2.0, 1.0, 0.1) = 2.0$. Shifted logits: $(0.0,\\, -1.0,\\, -1.9)$.</p>\n<p><strong>Step 2 — exponentiate.</strong> $e^{0} = 1.000$, $\\; e^{-1.0} = 0.368$, $\\; e^{-1.9} = 0.150$. Sum $= 1.000 + 0.368 + 0.150 = 1.518$.</p>\n<p><strong>Step 3 — softmax probabilities.</strong></p>\n$$\\hat{y} = \\left(\\tfrac{1.000}{1.518},\\; \\tfrac{0.368}{1.518},\\; \\tfrac{0.150}{1.518}\\right) = (0.659,\\; 0.242,\\; 0.099).$$\n<p>The model currently favors class 0 (66%) but the truth is class 2 (10%) — it is confidently wrong-ish, so we expect a sizable loss.</p>\n<p><strong>Step 4 — cross-entropy loss.</strong> Only the correct-class term survives:</p>\n$$\\mathcal{L} = -\\log \\hat{y}_2 = -\\log(0.099) = 2.32 \\text{ nats}.$$\n<p>(Sanity check: a uniform guess would give $-\\log(1/3) = 1.10$, so 2.32 confirms the model assigns the true class less probability than chance on this example.)</p>\n<p><strong>Step 5 — gradient at the logits.</strong> Using $\\hat{y} - y$:</p>\n$$\\nabla_z \\mathcal{L} = (0.659 - 0,\\; 0.242 - 0,\\; 0.099 - 1) = (0.659,\\; 0.242,\\; -0.901).$$\n<p>Interpretation: gradient descent will <em>decrease</em> $z_0$ and $z_1$ (positive gradient = push down) and <em>increase</em> $z_2$ (negative gradient = push up). After the step, probability mass flows from the wrong classes toward the correct one — exactly the behavior we want, and it required no chain-rule bookkeeping through the softmax at all, thanks to the $\\hat{y} - y$ shortcut.</p>\n\n<h3>Putting it together: matching task to loss and output</h3>\n<ul>\n<li><strong>Regression</strong> (real-valued target): linear output, MSE loss (Gaussian assumption) or MAE for robustness.</li>\n<li><strong>Binary / multi-label classification</strong>: sigmoid output per class, binary cross-entropy. Each class judged independently.</li>\n<li><strong>Multi-class, single-label classification</strong>: softmax output over $K$ classes, categorical cross-entropy. Classes are mutually exclusive.</li>\n</ul>\n<p>The recurring lesson: derive the loss from a probabilistic model of the target, pair it with the output activation that produces the right kind of value, and prefer the loss whose gradient does not saturate. Softmax + cross-entropy is the canonical example where this principle yields both correct semantics and a gradient — $\\hat{y} - y$ — that could not be cleaner.</p>",
          "mcq": [
            {
              "q": "You are building a classifier for mutually exclusive categories (e.g., digit 0-9). Which output activation and loss pairing is correct?",
              "choices": [
                "Linear output + MSE loss",
                "Softmax output + categorical cross-entropy",
                "Sigmoid per class + mean absolute error",
                "Softmax output + MSE loss"
              ],
              "answer": 1,
              "explain": "Single-label multi-class problems use softmax to produce a proper distribution over mutually exclusive classes, scored by categorical cross-entropy (the negative log-likelihood of a categorical distribution)."
            },
            {
              "q": "Why does PyTorch's CrossEntropyLoss expect raw logits rather than softmax probabilities as input?",
              "choices": [
                "Logits train faster because they are larger numbers",
                "It fuses softmax and the log into a numerically stable log-sum-exp and yields the clean $\\hat{y}-y$ gradient; pre-applying softmax double-normalizes and loses precision",
                "Probabilities cannot be differentiated",
                "The loss internally needs the logits to compute MSE"
              ],
              "answer": 1,
              "explain": "Fusing the operations avoids overflow/underflow via log-sum-exp and produces the exact gradient directly. Passing already-softmaxed values applies softmax twice, a common silent bug."
            },
            {
              "q": "For classification, why is softmax + cross-entropy preferred over sigmoid + MSE?",
              "choices": [
                "MSE is undefined for probabilities",
                "Cross-entropy's gradient at the logits is $\\hat{y}-y$ with no saturating factor, while sigmoid+MSE includes a $\\hat{y}(1-\\hat{y})$ term that vanishes when the network is confidently wrong",
                "Softmax is faster to compute than sigmoid",
                "MSE always converges to a worse accuracy by definition"
              ],
              "answer": 1,
              "explain": "The $\\hat{y}(1-\\hat{y})$ factor in sigmoid+MSE kills the gradient exactly when confident corrections are needed; cross-entropy avoids this saturation, giving a strong corrective signal."
            },
            {
              "q": "MSE arises as the maximum-likelihood loss under which assumption about the target?",
              "choices": [
                "The target follows a categorical distribution",
                "The target equals the prediction plus zero-mean Gaussian noise of constant variance",
                "The target is Laplace-distributed around the prediction",
                "The target is bounded in $[0,1]$"
              ],
              "answer": 1,
              "explain": "Negative log-likelihood of a Gaussian with constant variance reduces (after dropping constants) to the squared error; that Gaussian-noise assumption is exactly what MSE encodes."
            },
            {
              "q": "The lesson highlights that softmax composed with cross-entropy yields the gradient of the loss with respect to the logits $z$ as:",
              "choices": [
                "$\\hat{y} - y$",
                "$y - \\hat{y}$",
                "$\\hat{y}(1 - \\hat{y})$",
                "$-y / \\hat{y}$"
              ],
              "answer": 0,
              "explain": "The clean cancellation of softmax's Jacobian against cross-entropy's $-\\log$ leaves the gradient w.r.t. the logits as simply the predicted probabilities minus the one-hot target, $\\hat{y} - y$."
            },
            {
              "q": "When deriving losses from maximum likelihood, why do we maximize the log-likelihood instead of the likelihood itself?",
              "choices": [
                "The log changes which $\\theta$ is optimal, giving a better solution",
                "Logarithm is monotonic, so the argmax is unchanged while turning an unwieldy product of small probabilities into a numerically stable sum",
                "Only the log-likelihood is a valid probability distribution",
                "The likelihood cannot be differentiated but the log-likelihood can"
              ],
              "answer": 1,
              "explain": "Because log is monotonically increasing, the maximizing $\\theta$ is identical, but the product of many small per-example probabilities becomes a sum of logs that is far more numerically and analytically tractable."
            },
            {
              "q": "According to the lesson's unifying view, what is the common thread linking MSE and cross-entropy?",
              "choices": [
                "Both are negative log-likelihoods under a chosen probability model for the target",
                "Both assume the target is generated by Gaussian noise",
                "Both require the network's output to be a probability distribution",
                "Both are minimized only by setting all parameters to zero"
              ],
              "answer": 0,
              "explain": "The lesson states that almost every standard loss is a negative log-likelihood in disguise: MSE follows from a Gaussian assumption and cross-entropy from a categorical/Bernoulli assumption."
            },
            {
              "q": "Suppose a 3-class softmax network outputs $\\hat{y} = (0.7, 0.2, 0.1)$ and the true label is class 0, so $y = (1, 0, 0)$. Using the softmax+cross-entropy result, what is the gradient of the loss with respect to the logits?",
              "choices": [
                "$(-0.3, 0.2, 0.1)$",
                "$(0.3, -0.2, -0.1)$",
                "$(0.7, 0.2, 0.1)$",
                "$(-0.7, -0.2, -0.1)$"
              ],
              "answer": 0,
              "explain": "The gradient is $\\hat{y} - y = (0.7-1,\\ 0.2-0,\\ 0.1-0) = (-0.3, 0.2, 0.1)$; the negative entry on the correct class means descent raises that logit, while the others are pushed down."
            }
          ],
          "flashcards": [
            {
              "front": "Softmax formula for logit vector $z \\in \\mathbb{R}^K$",
              "back": "$\\text{softmax}(z)_k = \\dfrac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}$. Outputs are in $(0,1)$ and sum to 1; invariant to adding a constant to all logits."
            },
            {
              "front": "Gradient of softmax + cross-entropy with respect to the logits",
              "back": "$\\nabla_z \\mathcal{L} = \\hat{y} - y$ (prediction minus one-hot target). No saturating factor, which is why classification uses it."
            },
            {
              "front": "Binary cross-entropy vs categorical cross-entropy",
              "back": "BCE (Bernoulli, sigmoid, $y\\in\\{0,1\\}$): $-[y\\log\\hat{y} + (1-y)\\log(1-\\hat{y})]$. Categorical (softmax, one-hot): $-\\sum_k y_k\\log\\hat{y}_k = -\\log\\hat{y}_c$. BCE is the $K=2$ case; use per-class BCE for multi-label."
            },
            {
              "front": "Log-sum-exp / numerical-stability trick",
              "back": "Subtract the max logit $m=\\max_j z_j$ first: $\\log\\sum_j e^{z_j} = m + \\log\\sum_j e^{z_j-m}$. Prevents overflow (largest exp becomes $e^0=1$) and hard underflow. Relies on softmax's shift-invariance."
            },
            {
              "front": "Logits vs probabilities",
              "back": "Logits = raw unconstrained outputs of the final linear layer (any real number, need not sum to 1). Probabilities = softmax/sigmoid of logits, in $(0,1)$. Loss functions like CrossEntropyLoss take logits."
            },
            {
              "front": "What unifies MSE and cross-entropy as losses?",
              "back": "Both are negative log-likelihoods. MSE = NLL of a Gaussian (regression noise); cross-entropy = NLL of a categorical/Bernoulli (class labels). Pick the loss from a probabilistic model of the target."
            }
          ],
          "homework": [
            {
              "prompt": "A 3-class classifier outputs logits $z = (1.0, 3.0, 0.0)$ for an example whose true class is class 0 (one-hot $y=(1,0,0)$). Compute the softmax probabilities (use the max-subtraction trick), the cross-entropy loss, and the gradient $\\hat{y}-y$ at the logits.",
              "hint": "Subtract $m=\\max z = 3.0$ first, exponentiate the shifted logits, normalize, then loss $=-\\log\\hat{y}_0$ and gradient is $\\hat{y}$ minus the one-hot vector.",
              "solution": "Subtract $m=3.0$: shifted logits $(-2.0, 0.0, -3.0)$. Exponentiate: $e^{-2}=0.135$, $e^{0}=1.000$, $e^{-3}=0.050$; sum $=1.185$. Probabilities: $\\hat{y}=(0.135/1.185,\\;1.000/1.185,\\;0.050/1.185)=(0.114,\\;0.844,\\;0.042)$. Loss $=-\\log\\hat{y}_0=-\\log(0.114)=2.17$ nats (model is confidently wrong, favoring class 1). Gradient $\\hat{y}-y=(0.114-1,\\;0.844-0,\\;0.042-0)=(-0.886,\\;0.844,\\;0.042)$: descent raises $z_0$ and lowers $z_1, z_2$, shifting mass toward the true class 0."
            },
            {
              "prompt": "Show that the binary cross-entropy loss with a sigmoid output, $\\mathcal{L}=-[y\\log\\sigma(z)+(1-y)\\log(1-\\sigma(z))]$, has gradient $\\partial\\mathcal{L}/\\partial z = \\sigma(z)-y$. (Use $\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$.)",
              "hint": "Let $p=\\sigma(z)$. Differentiate the two log terms with respect to $z$ via the chain rule, using $dp/dz = p(1-p)$, then simplify $-y(1-p)+(1-y)p$.",
              "solution": "Let $p=\\sigma(z)$, so $dp/dz=p(1-p)$. Then $\\frac{\\partial}{\\partial z}\\log p = \\frac{1}{p}\\cdot p(1-p)=(1-p)$ and $\\frac{\\partial}{\\partial z}\\log(1-p)=\\frac{-1}{1-p}\\cdot p(1-p)=-p$. So $\\frac{\\partial\\mathcal{L}}{\\partial z}=-[\\,y(1-p)+(1-y)(-p)\\,]=-[\\,y-yp-p+yp\\,]=-[\\,y-p\\,]=p-y=\\sigma(z)-y$. This is the binary analogue of $\\hat{y}-y$, confirming no saturating factor remains — the $p(1-p)$ from the sigmoid derivative is exactly cancelled by the $1/p$ and $1/(1-p)$ from the log, which is precisely why cross-entropy avoids the saturation that plagues sigmoid+MSE."
            },
            {
              "prompt": "Argue from maximum likelihood why MSE is the appropriate loss when target noise is Gaussian, but a poor choice when the data contain heavy outliers. What loss would you switch to, and what distribution does it correspond to?",
              "hint": "Write the negative log-likelihood of a Gaussian, then of a Laplace distribution $p(y)\\propto\\exp(-|y-\\hat{y}|/b)$, and compare how each penalizes large residuals.",
              "solution": "Gaussian NLL: $-\\log\\mathcal{N}(y;\\hat{y},\\sigma^2)=\\frac{(y-\\hat{y})^2}{2\\sigma^2}+\\text{const}$, which is MSE up to a scale. The squared term means residuals are penalized quadratically, so a single far outlier contributes enormously and drags the fit toward it — appropriate only if noise really is Gaussian (thin tails). For heavy-tailed noise/outliers, switch to mean absolute error (MAE): $\\frac{1}{N}\\sum|y_i-\\hat{y}_i|$. MAE is the negative log-likelihood of a Laplace distribution $p(y)\\propto\\exp(-|y-\\hat{y}|/b)$, which has heavier tails; its linear penalty makes large residuals far less influential, so the estimate is robust (it targets the conditional median rather than the mean). The general principle: match the loss to the assumed noise distribution via NLL."
            }
          ]
        },
        {
          "id": "dl-backpropagation",
          "title": "Backpropagation: The Chain Rule at Scale",
          "minutes": 18,
          "content": "<h3>From \"the network learns\" to a precise algorithm</h3>\n<p>By now you know the shape of the problem. A neural network is a function $f(x; \\theta)$ with millions of parameters $\\theta$, and a loss $L$ measures how wrong its predictions are on your data. Learning means nudging $\\theta$ to make $L$ smaller, and gradient descent tells us the direction: move opposite the gradient $\\nabla_\\theta L$. The whole enterprise rests on one quantity — the partial derivative of the loss with respect to <em>every single parameter</em>, $\\partial L / \\partial \\theta_i$.</p>\n<p>The obvious question is: how do we actually <em>compute</em> that gradient when there are tens of millions of parameters tangled together through a dozen nonlinear layers? <strong>Backpropagation</strong> is the answer. It is not a new learning principle and it is not magic — it is simply a spectacularly efficient way to apply the chain rule to a composed function. The genius is in the bookkeeping: it computes the gradient with respect to <em>all</em> parameters in roughly the same cost as a single forward pass.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Backpropagation is a special case of <strong>reverse-mode automatic differentiation</strong> applied to a scalar-valued function. Everything PyTorch, JAX, and TensorFlow do under <code>loss.backward()</code> is exactly the procedure in this lesson, generalized to arbitrary computational graphs. Understanding it by hand is the difference between using autodiff and trusting it blindly.</p></div>\n\n<h3>The computational graph</h3>\n<p>Any composition of operations can be drawn as a directed acyclic graph (DAG). Nodes are intermediate values; edges carry the dependency \"this value is computed from that one.\" Consider a tiny example, the function $L = (wx + b - y)^2$ for a single weight. We can break it into atomic steps:</p>\n<pre><code>u = w * x      # multiply\nv = u + b      # add bias\ne = v - y      # residual\nL = e * e      # square (loss)</code></pre>\n<p>Each line is a node whose output depends only on earlier nodes. The <strong>forward pass</strong> evaluates the graph left to right, producing $L$. To get gradients we will walk the graph right to left, and the key realization is this: at every node we only ever need to know two things — the value that flowed <em>out</em> of the node during the forward pass (cached), and a <em>local derivative</em> of the node's output with respect to each of its inputs.</p>\n\n<h4>The chain rule, stated carefully</h4>\n<p>If a scalar $L$ depends on a variable $a$ only through some intermediate $b$, then</p>\n$$\\frac{\\partial L}{\\partial a} = \\frac{\\partial L}{\\partial b}\\,\\frac{\\partial b}{\\partial a}.$$\n<p>When $a$ influences $L$ through <em>several</em> paths $b_1, \\dots, b_k$, the contributions add (the <strong>multivariable chain rule</strong>):</p>\n$$\\frac{\\partial L}{\\partial a} = \\sum_{j=1}^{k} \\frac{\\partial L}{\\partial b_j}\\,\\frac{\\partial b_j}{\\partial a}.$$\n<p>This \"sum over all paths to the output\" is the entire mathematical content of backprop. Reverse-mode autodiff is just a way to organize that sum so we never compute the same sub-path twice.</p>\n\n<h3>Reverse mode: why backward, not forward?</h3>\n<p>There are two honest ways to apply the chain rule to a graph.</p>\n<ul>\n<li><strong>Forward mode</strong> propagates derivatives <em>with respect to one input</em> forward through the graph. To get the derivative of every output w.r.t. that one input costs one sweep. But we have <em>one</em> output ($L$) and <em>millions</em> of inputs ($\\theta$), so forward mode would need millions of sweeps.</li>\n<li><strong>Reverse mode</strong> propagates the derivative <em>of one output</em> backward to every input. One sweep gives $\\partial L / \\partial \\theta_i$ for <em>all</em> $i$ at once.</li>\n</ul>\n<p>For deep learning the asymmetry is decisive: scalar loss, vast parameter vector. We define the central object of backprop, the <strong>adjoint</strong> (often called the \"upstream gradient\" or just the \"grad\" of a node):</p>\n$$\\bar{a} \\;\\equiv\\; \\frac{\\partial L}{\\partial a}.$$\n<p>Backprop computes $\\bar{a}$ for every node $a$. The recipe at a single node is the <strong>local backward rule</strong>: if node $b$ was computed from inputs $a_1, \\dots, a_m$, then once we know $\\bar{b}$, each input receives</p>\n$$\\bar{a}_i \\mathrel{+}= \\bar{b}\\,\\frac{\\partial b}{\\partial a_i}.$$\n<p>We <em>accumulate</em> ($\\mathrel{+}=$) because an input may feed multiple downstream nodes — exactly the multi-path sum from the chain rule. We seed the recursion with $\\bar{L} = \\partial L / \\partial L = 1$ and process nodes in <strong>reverse topological order</strong>, guaranteeing that when we reach a node, every node it feeds has already contributed its share.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of $\\bar{a}$ as \"how much a tiny wiggle in $a$ changes the final loss.\" The forward pass tells each node what value it holds; the backward pass tells each node how much it <em>matters</em>. Each node, knowing how much it matters ($\\bar{b}$) and how its inputs affect it ($\\partial b / \\partial a_i$), can tell each input how much <em>it</em> matters.</p></div>\n\n<h3>Local gradients for the building blocks</h3>\n<p>Backprop is modular: implement the forward and backward rule for each operation once, and you can differentiate any graph built from them. The essentials:</p>\n<ul>\n<li><strong>Add</strong> $b = a_1 + a_2$: local derivatives are both $1$, so $\\bar{a}_1 \\mathrel{+}= \\bar{b}$, $\\bar{a}_2 \\mathrel{+}= \\bar{b}$. Addition <em>copies</em> the gradient to both inputs.</li>\n<li><strong>Multiply</strong> $b = a_1 a_2$: $\\partial b / \\partial a_1 = a_2$, so $\\bar{a}_1 \\mathrel{+}= \\bar{b}\\, a_2$ and $\\bar{a}_2 \\mathrel{+}= \\bar{b}\\, a_1$. Multiplication <em>swaps</em> the cached values — to send gradient to one input you multiply by the <em>other</em> input's stored value.</li>\n<li><strong>Square</strong> $b = a^2$: $\\bar{a} \\mathrel{+}= \\bar{b}\\cdot 2a$.</li>\n<li><strong>ReLU</strong> $b = \\max(0, a)$: $\\bar{a} \\mathrel{+}= \\bar{b}\\cdot \\mathbf{1}[a > 0]$ — gradient passes through where the input was positive, and is zeroed elsewhere.</li>\n<li><strong>Sigmoid</strong> $\\sigma(a) = 1/(1+e^{-a})$: a beautiful case where the local derivative reuses the output, $\\sigma'(a) = \\sigma(a)(1 - \\sigma(a))$, so $\\bar{a} \\mathrel{+}= \\bar{b}\\cdot b(1-b)$ using the cached forward output $b$.</li>\n</ul>\n\n<h4>The gradient of a matrix multiply</h4>\n<p>Layers are matmuls, so this rule is the workhorse. Let $Y = XW$ where $X$ is $n \\times d$, $W$ is $d \\times m$, and $Y$ is $n \\times m$. Given the upstream gradient $\\bar{Y} = \\partial L / \\partial Y$ (same shape as $Y$), the backward rules are:</p>\n$$\\bar{X} = \\bar{Y}\\,W^{\\top}, \\qquad \\bar{W} = X^{\\top}\\,\\bar{Y}.$$\n<p>You never need to memorize the index gymnastics — there is a foolproof shortcut. <strong>The gradient must have the same shape as the thing it is the gradient of</strong>, and there is essentially only one way to multiply the available matrices ($\\bar{Y}$, $W$, $X$) to get that shape, using transposes as needed. For instance $\\bar{W}$ must be $d \\times m$; the only product of $X$ ($n\\times d$) and $\\bar{Y}$ ($n\\times m$) yielding $d \\times m$ is $X^\\top \\bar{Y}$. (For an affine layer $Y = XW + b$ with bias broadcast across the $n$ rows, the bias gradient sums the upstream over the batch: $\\bar{b} = \\sum_{\\text{rows}} \\bar{Y}$ — addition copies the gradient, and the broadcast over rows means those copies accumulate.)</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Notice $\\bar{W} = X^\\top \\bar{Y}$ <em>reuses the input activation $X$ from the forward pass</em>. This is why frameworks <strong>cache activations</strong> during the forward pass: the backward pass for each layer's weights literally needs the layer's input, and the backward pass for the input needs $W$. No caching means recomputing the forward pass — which is exactly the time/memory tradeoff that <em>gradient checkpointing</em> deliberately makes to fit huge models in limited GPU memory.</p></div>\n\n<h3>A fully worked 2-layer example</h3>\n<p>Let's compute every gradient by hand for a small network on a single example. Architecture: input $\\to$ linear $\\to$ ReLU $\\to$ linear $\\to$ squared-error loss. To keep the arithmetic clean we use scalars but keep the structure of two layers.</p>\n<p><strong>Setup.</strong> Input $x = 2$, target $y = 1$.</p>\n<ul>\n<li>Layer 1: $z_1 = w_1 x + b_1$, then $a_1 = \\mathrm{ReLU}(z_1)$.</li>\n<li>Layer 2: $z_2 = w_2 a_1 + b_2$ (this is the prediction $\\hat{y}$).</li>\n<li>Loss: $L = (z_2 - y)^2$.</li>\n</ul>\n<p>Parameters: $w_1 = 0.5,\\ b_1 = 0,\\ w_2 = -1.5,\\ b_2 = 0.5$.</p>\n\n<h4>Forward pass (and cache everything)</h4>\n<pre><code>z1 = w1*x + b1 = 0.5*2 + 0   = 1.0\na1 = ReLU(z1)  = max(0, 1.0) = 1.0      # z1 > 0, so gate is open\nz2 = w2*a1 + b2 = -1.5*1.0 + 0.5 = -1.0  # prediction y_hat\ne  = z2 - y    = -1.0 - 1.0   = -2.0\nL  = e^2       = 4.0</code></pre>\n<p>Cached values we'll reuse: $x=2$, $z_1=1$, $a_1=1$, $w_2=-1.5$, $e=-2$.</p>\n\n<h4>Backward pass</h4>\n<p>Seed $\\bar{L} = 1$. Now walk back, node by node, applying the local rules.</p>\n<ol>\n<li><strong>Through the square</strong> $L = e^2$: $\\bar{e} = \\bar{L}\\cdot 2e = 1\\cdot 2(-2) = -4$.</li>\n<li><strong>Through the residual</strong> $e = z_2 - y$: local derivative w.r.t. $z_2$ is $1$, so $\\bar{z}_2 = \\bar{e}\\cdot 1 = -4$.</li>\n<li><strong>Through layer 2</strong> $z_2 = w_2 a_1 + b_2$. Multiply/add rules with cached $a_1=1$, $w_2=-1.5$:\n<ul>\n<li>$\\bar{w}_2 = \\bar{z}_2 \\cdot a_1 = -4 \\cdot 1 = -4$</li>\n<li>$\\bar{b}_2 = \\bar{z}_2 \\cdot 1 = -4$</li>\n<li>$\\bar{a}_1 = \\bar{z}_2 \\cdot w_2 = -4 \\cdot (-1.5) = 6$</li>\n</ul></li>\n<li><strong>Through ReLU</strong> $a_1 = \\mathrm{ReLU}(z_1)$: gate is $\\mathbf{1}[z_1>0] = 1$ here, so $\\bar{z}_1 = \\bar{a}_1 \\cdot 1 = 6$. (Had $z_1$ been negative, this would be $0$ and <em>all</em> layer-1 gradients would vanish for this example — a concrete look at how ReLU can kill gradients.)</li>\n<li><strong>Through layer 1</strong> $z_1 = w_1 x + b_1$ with cached $x = 2$:\n<ul>\n<li>$\\bar{w}_1 = \\bar{z}_1 \\cdot x = 6 \\cdot 2 = 12$</li>\n<li>$\\bar{b}_1 = \\bar{z}_1 \\cdot 1 = 6$</li>\n</ul></li>\n</ol>\n<p><strong>Result — the full gradient:</strong></p>\n$$\\frac{\\partial L}{\\partial w_1} = 12,\\quad \\frac{\\partial L}{\\partial b_1} = 6,\\quad \\frac{\\partial L}{\\partial w_2} = -4,\\quad \\frac{\\partial L}{\\partial b_2} = -4.$$\n<p>Let's sanity-check $\\partial L/\\partial w_2$ directly. With $w_1,b_1,b_2$ fixed, $L = (w_2 a_1 + b_2 - y)^2 = (w_2 \\cdot 1 + 0.5 - 1)^2 = (w_2 - 0.5)^2$. Then $\\partial L/\\partial w_2 = 2(w_2 - 0.5) = 2(-1.5 - 0.5) = -4$. It matches. A gradient-descent step with learning rate $\\eta = 0.1$ would update $w_1 \\leftarrow 0.5 - 0.1\\cdot 12 = -0.7$, and so on — each parameter moving against its gradient.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Notice how $\\bar{z}_2 = -4$ was computed <em>once</em> and then reused to produce three different gradients ($\\bar{w}_2$, $\\bar{b}_2$, $\\bar{a}_1$). That reuse — computing each node's adjoint a single time and fanning it out to its inputs — is precisely why backprop costs one backward sweep instead of one sweep per parameter. The shared sub-expression $\\bar{z}_2$ is never recomputed.</p></div>\n\n<h3>Cost, and why this scales</h3>\n<p>The forward pass touches each operation once. The backward pass touches each operation once more, doing a small constant amount of extra work per node (a couple of multiplies). So the total cost of computing the gradient w.r.t. <em>all</em> parameters is a small constant multiple (typically 2–3×) of the forward pass — independent of the number of parameters. This is the famous result that makes deep learning feasible at all: gradients of a billion-parameter model cost about the same as evaluating it. The price is memory: every activation needed by a backward rule must be kept alive until used, which is why training a model needs far more memory than inference.</p>\n\n<h3>The mental model to keep</h3>\n<ul>\n<li><strong>Forward pass:</strong> compute and cache each node's value, left to right.</li>\n<li><strong>Backward pass:</strong> seed $\\bar{L}=1$; in reverse order, each node multiplies its incoming adjoint by its local derivatives and <em>adds</em> the result into its inputs' adjoints.</li>\n<li>Parameters' adjoints <em>are</em> the gradient — feed them to the optimizer.</li>\n<li>Two recurring shortcuts: shapes must match (use them to place transposes in matmul gradients), and the multiply rule swaps cached operands.</li>\n</ul>\n<p>Everything else in deep learning — Adam, batch norm, attention, transformers — is built on top of operations whose forward and backward rules slot into exactly this machine.</p>\n<h4>Try it yourself</h4>\n<p>Run it, then tinker — change the inputs and re-run. The badge confirms when your output matches.</p>\n<div data-code=\"python\" data-expected=\"6.0\"># The building block of backprop: a numerical derivative.\n# Central difference approximates f'(x); here f(x)=x^2 so f'(3)=6.\ndef f(x):\n    return x ** 2\n\nh = 1e-6\nx = 3.0\ngrad = (f(x + h) - f(x - h)) / (2 * h)\nprint(round(grad, 4))</div>",
          "mcq": [
            {
              "q": "For a linear layer $Y = XW$ with $X$ of shape $n\\times d$ and $W$ of shape $d\\times m$, given upstream gradient $\\bar{Y}$, what is the gradient with respect to the weights $\\bar{W}$?",
              "choices": [
                "$\\bar{Y} W^{\\top}$",
                "$X^{\\top} \\bar{Y}$",
                "$\\bar{Y}^{\\top} X$",
                "$W^{\\top} \\bar{Y}$"
              ],
              "answer": 1,
              "explain": "$\\bar{W}$ must have $W$'s shape $d\\times m$; the only product of $X$ ($n\\times d$) and $\\bar{Y}$ ($n\\times m$) giving $d\\times m$ is $X^{\\top}\\bar{Y}$. Note it reuses the cached input $X$."
            },
            {
              "q": "Why does reverse-mode autodiff (backprop) rather than forward-mode dominate deep learning?",
              "choices": [
                "Reverse mode is more numerically stable than forward mode",
                "The loss is a single scalar output while there are many parameter inputs, so one backward sweep yields all gradients",
                "Forward mode cannot handle nonlinear activations like ReLU",
                "Reverse mode avoids needing to cache any activations"
              ],
              "answer": 1,
              "explain": "Reverse mode gives the derivative of one output w.r.t. all inputs in one sweep; with a scalar loss and millions of parameters that is exactly the cheap direction. Forward mode would need one sweep per input."
            },
            {
              "q": "During backprop, a node $b = a_1 \\cdot a_2$ receives upstream gradient $\\bar{b}$. What gets added to $\\bar{a}_1$?",
              "choices": [
                "$\\bar{b}\\cdot a_1$",
                "$\\bar{b}\\cdot a_2$",
                "$\\bar{b}\\cdot (a_1 + a_2)$",
                "$\\bar{b}$"
              ],
              "answer": 1,
              "explain": "The local derivative $\\partial b/\\partial a_1 = a_2$, so the multiply rule swaps operands: the gradient to one input is scaled by the OTHER input's cached value."
            },
            {
              "q": "A ReLU unit had pre-activation $z_1 = -0.3$ on the forward pass. What does its backward rule do to the upstream gradient $\\bar{a}_1$?",
              "choices": [
                "Passes it through unchanged",
                "Multiplies it by $-0.3$",
                "Sets the downstream gradient to $0$",
                "Multiplies it by $0.5$"
              ],
              "answer": 2,
              "explain": "ReLU's local derivative is $\\mathbf{1}[z>0]$; since $z_1 = -0.3 \\le 0$ the gate is closed and $\\bar{z}_1 = 0$, so no gradient flows to earlier layers through this unit for this example."
            },
            {
              "q": "The lesson emphasizes backprop's signature efficiency claim. What is it?",
              "choices": [
                "It computes the gradient with respect to all parameters in roughly the cost of one forward pass",
                "It avoids computing the loss entirely by working only with local derivatives",
                "It reduces the number of parameters that need gradients by pruning the graph",
                "It computes each parameter's gradient in constant time independent of network depth"
              ],
              "answer": 0,
              "explain": "Backprop's genius is bookkeeping: it yields the gradient with respect to every parameter at roughly the cost of a single forward pass (typically 2-3x). The loss is still computed (in the forward pass), nothing is pruned, and the cost scales with graph size, not constant per parameter."
            },
            {
              "q": "For the graph $u=wx$, $v=u+b$, $e=v-y$, $L=e\\cdot e$, what is the local derivative $\\partial L/\\partial e$ at the squaring node?",
              "choices": [
                "$2e$",
                "$e^2$",
                "$2v$",
                "$e$"
              ],
              "answer": 0,
              "explain": "Since $L=e^2$, the local derivative of the node's output with respect to its input $e$ is $2e$. The input to the squaring node is $e$ (not $v$), so $2v$ is wrong, and $e^2$ is the value, not the derivative."
            },
            {
              "q": "The lesson says that at every node during the backward pass we only ever need two things. What are they?",
              "choices": [
                "The value cached from the forward pass and the node's local derivative(s) with respect to its inputs",
                "The global gradient $\\nabla_\\theta L$ and the learning rate",
                "The original input data $x$ and the target label $y$",
                "The full Hessian of the node and its forward output"
              ],
              "answer": 0,
              "explain": "Each node needs only its cached forward output and its local input derivatives, which combine via the chain rule (adjoint times local derivative) to send gradient to each input."
            },
            {
              "q": "According to the lesson, what is backpropagation, stated most precisely?",
              "choices": [
                "A special case of reverse-mode automatic differentiation applied to a scalar-valued function",
                "A new learning principle distinct from gradient descent",
                "An approximation to the true gradient that trades accuracy for speed",
                "A forward-mode differentiation technique specialized for DAGs"
              ],
              "answer": 0,
              "explain": "The lesson defines backprop as a special case of reverse-mode autodiff applied to a scalar-valued loss. It explicitly states it is not a new learning principle, not magic/an approximation, and reverse (not forward) mode."
            }
          ],
          "flashcards": [
            {
              "front": "What does the forward pass compute and store, versus what the backward pass computes?",
              "back": "Forward pass: evaluates and caches each node's output value (left to right). Backward pass: computes each node's adjoint $\\bar{a} = \\partial L/\\partial a$ (right to left), seeded with $\\bar{L}=1$."
            },
            {
              "front": "Gradient of a matmul $Y = XW$ given upstream $\\bar{Y}$?",
              "back": "$\\bar{X} = \\bar{Y}W^{\\top}$ and $\\bar{W} = X^{\\top}\\bar{Y}$. Shapes must match the originals; that constraint alone fixes where the transposes go."
            },
            {
              "front": "Why does backprop cache the activations from the forward pass?",
              "back": "The backward rules need them: $\\bar{W}=X^{\\top}\\bar{Y}$ reuses the layer input $X$, and $\\bar{X}=\\bar{Y}W^{\\top}$ reuses $W$. Without caching you'd have to recompute the forward pass (the tradeoff gradient checkpointing makes)."
            },
            {
              "front": "Local backward rule for a single node $b = f(a_1,\\dots,a_m)$ given $\\bar{b}$?",
              "back": "$\\bar{a}_i \\mathrel{+}= \\bar{b}\\cdot \\partial b/\\partial a_i$. Accumulate (+=) because an input may feed several downstream nodes (multivariable chain rule = sum over paths)."
            },
            {
              "front": "Backward rules for add and multiply nodes.",
              "back": "Add $b=a_1+a_2$: copies gradient, $\\bar{a}_1\\mathrel{+}=\\bar{b}$, $\\bar{a}_2\\mathrel{+}=\\bar{b}$. Multiply $b=a_1a_2$: swaps operands, $\\bar{a}_1\\mathrel{+}=\\bar{b}\\,a_2$, $\\bar{a}_2\\mathrel{+}=\\bar{b}\\,a_1$."
            },
            {
              "front": "Why is computing the full gradient roughly as cheap as one forward pass?",
              "back": "Reverse mode does one backward sweep, one constant-work visit per node, computing every node's adjoint once and reusing shared sub-expressions. Total cost ~2-3x forward, independent of parameter count. Price paid in memory (cached activations)."
            }
          ],
          "homework": [
            {
              "prompt": "Take the worked 2-layer scalar network (input$\\to$linear$\\to$ReLU$\\to$linear$\\to$squared error) but change the input to $x = -3$ with the SAME parameters $w_1=0.5, b_1=0, w_2=-1.5, b_2=0.5$ and target $y=1$. Do the forward pass, then compute all four gradients $\\partial L/\\partial w_1, \\partial L/\\partial b_1, \\partial L/\\partial w_2, \\partial L/\\partial b_2$ by hand.",
              "hint": "Compute $z_1$ first and check its sign before applying ReLU. The ReLU gate determines whether any gradient reaches layer 1.",
              "solution": "Forward: $z_1 = 0.5(-3)+0 = -1.5$. ReLU: $a_1 = \\max(0,-1.5) = 0$ (gate CLOSED). $z_2 = -1.5(0)+0.5 = 0.5 = \\hat y$. $e = 0.5 - 1 = -0.5$, $L = 0.25$. Backward: $\\bar L=1$; $\\bar e = 2e = -1$; $\\bar z_2 = -1$. Layer 2: $\\bar w_2 = \\bar z_2 \\cdot a_1 = -1\\cdot 0 = 0$; $\\bar b_2 = \\bar z_2 = -1$; $\\bar a_1 = \\bar z_2 \\cdot w_2 = -1\\cdot(-1.5)=1.5$. ReLU gate: $\\mathbf{1}[z_1>0]=0$, so $\\bar z_1 = 1.5\\cdot 0 = 0$. Layer 1: $\\bar w_1 = \\bar z_1 \\cdot x = 0$; $\\bar b_1 = \\bar z_1 = 0$. Result: $\\partial L/\\partial w_1 = 0,\\ \\partial L/\\partial b_1 = 0,\\ \\partial L/\\partial w_2 = 0,\\ \\partial L/\\partial b_2 = -1$. Insight: a closed ReLU zeros out the gradient for $w_1, b_1$ (no learning for them this step) AND for $w_2$ (because $a_1=0$ multiplies its gradient away); only $b_2$ updates."
            },
            {
              "prompt": "Verify the matmul backward rules by index calculus. For $Y = XW$ with entries $Y_{ij} = \\sum_k X_{ik} W_{kj}$, and writing $\\bar Y_{ij} = \\partial L/\\partial Y_{ij}$, show from the chain rule that $\\bar W_{kj} = \\sum_i X_{ik}\\bar Y_{ij}$, i.e. $\\bar W = X^{\\top}\\bar Y$.",
              "hint": "Apply $\\partial L/\\partial W_{kj} = \\sum_{i,j'} (\\partial L/\\partial Y_{ij'})(\\partial Y_{ij'}/\\partial W_{kj})$ and compute the local derivative $\\partial Y_{ij'}/\\partial W_{kj}$.",
              "solution": "By the multivariable chain rule, $\\partial L/\\partial W_{kj} = \\sum_{i,j'} \\bar Y_{ij'}\\, \\partial Y_{ij'}/\\partial W_{kj}$. From $Y_{ij'} = \\sum_{k'} X_{ik'}W_{k'j'}$, the derivative $\\partial Y_{ij'}/\\partial W_{kj} = X_{ik}$ when $j'=j$ and $k'=k$, and $0$ otherwise (it's $X_{ik}\\,\\delta_{j'j}$ after summing the $k'$ term that hits $k$). So only $j'=j$ survives: $\\partial L/\\partial W_{kj} = \\sum_i \\bar Y_{ij} X_{ik} = \\sum_i X_{ik}\\bar Y_{ij}$. Recognizing the sum over $i$ as a row of $X^{\\top}$ times a column of $\\bar Y$ gives $\\bar W = X^{\\top}\\bar Y$. The same procedure on $\\partial L/\\partial X_{ik}$ yields $\\bar X = \\bar Y W^{\\top}$."
            },
            {
              "prompt": "Consider $L = \\sigma(wx + b)$ where $\\sigma$ is the sigmoid. With $w=1, x=2, b=-1$, compute the forward value and then $\\partial L/\\partial w$ and $\\partial L/\\partial b$ using the cached-output form of the sigmoid derivative.",
              "hint": "$\\sigma'(z) = \\sigma(z)(1-\\sigma(z))$, and the forward output IS $\\sigma(z)$, so reuse it rather than recomputing exponentials.",
              "solution": "Forward: $z = wx+b = 1\\cdot 2 + (-1) = 1$. $L = \\sigma(1) = 1/(1+e^{-1}) \\approx 0.7311$. Backward: $\\bar L = 1$. Through sigmoid, local derivative uses the cached output: $\\bar z = \\bar L\\cdot L(1-L) = 0.7311(1-0.7311) \\approx 0.7311\\cdot 0.2689 \\approx 0.1966$. Through $z = wx+b$ with cached $x=2$: $\\partial L/\\partial w = \\bar z\\cdot x \\approx 0.1966\\cdot 2 \\approx 0.3932$; $\\partial L/\\partial b = \\bar z\\cdot 1 \\approx 0.1966$. The point: caching $L=\\sigma(z)$ on the forward pass lets the backward pass get $\\sigma'$ with one multiply and no extra exponential."
            }
          ],
          "examples": [
            {
              "title": "Gradient through one weight",
              "body": "For loss $L=(y-\\hat{y})^2$ with prediction $\\hat{y}=wx$, and $x=2$, $w=3$, target $y=5$, compute $\\partial L/\\partial w$.",
              "solution": "Forward: $\\hat{y}=wx=6$, $L=(5-6)^2=1$. Backward by chain rule: $\\dfrac{\\partial L}{\\partial \\hat{y}}=2(\\hat{y}-y)=2(6-5)=2$, and $\\dfrac{\\partial \\hat{y}}{\\partial w}=x=2$, so $\\dfrac{\\partial L}{\\partial w}=2\\cdot 2=4$. A step of gradient descent: $w\\leftarrow 3-\\eta\\cdot 4$."
            },
            {
              "title": "Why cache the forward pass?",
              "body": "Why does backpropagation store the activations computed during the forward pass?",
              "solution": "Each weight's gradient is built from the inputs/activations it multiplied going forward (e.g. $\\partial\\hat{y}/\\partial w=x$). Caching those values lets the backward pass reuse them instead of recomputing, so backprop costs about the same as a single forward pass."
            }
          ]
        },
        {
          "id": "dl-gradient-descent-and-optimizers",
          "title": "Optimizers: SGD, Momentum, RMSProp, and Adam",
          "minutes": 16,
          "content": "<h3>The Core Idea: Learning Is Just Descending a Loss Surface</h3>\n<p>Training a neural network means finding parameters $\\theta$ (all the weights and biases, flattened into one big vector) that make a loss function $L(\\theta)$ small. The loss measures how wrong the model is on the data. We can't solve $\\nabla L(\\theta) = 0$ in closed form for a deep network — the function is high-dimensional, non-convex, and tangled. So instead we <strong>walk downhill</strong>, one small step at a time, using the gradient as our compass.</p>\n<p>The gradient $\\nabla L(\\theta)$ points in the direction of <em>steepest increase</em> of the loss. To decrease the loss, we step in the opposite direction. That single sentence is the entire foundation of how networks learn:</p>\n$$\\theta \\leftarrow \\theta - \\eta\\,\\nabla L(\\theta)$$\n<p>Here $\\eta$ (eta) is the <strong>learning rate</strong>, a small positive scalar that controls how far we step. This is <strong>gradient descent</strong>. Everything in this lesson — momentum, RMSProp, Adam — is a refinement of this one update, designed to make it faster, more stable, and better-behaved on the messy loss surfaces of real networks.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Imagine a ball on a hilly landscape in the dark. You can't see the valley, but at your feet you can feel which way is downhill (the negative gradient). You take a step that way, feel again, step again. The learning rate is your stride length. Too timid and you crawl for hours; too bold and you overshoot the valley entirely.</p>\n</div>\n\n<h3>How Much Data Per Step? Batch vs. Minibatch vs. Stochastic</h3>\n<p>The loss is an average over training examples: $L(\\theta) = \\frac{1}{N}\\sum_{i=1}^{N} \\ell(\\theta; x_i, y_i)$. To compute the <em>true</em> gradient we'd have to average the per-example gradients over all $N$ examples. How many examples we actually use per step defines three variants.</p>\n\n<h4>Batch (full-batch) gradient descent</h4>\n<p>Use all $N$ examples to compute one exact gradient, then take one step.</p>\n$$g = \\frac{1}{N}\\sum_{i=1}^{N}\\nabla \\ell(\\theta; x_i, y_i), \\qquad \\theta \\leftarrow \\theta - \\eta\\, g$$\n<p>The gradient is exact, so the path is smooth and (for convex problems) reliable. But each step costs a full pass over the dataset. With millions of examples this is glacial, and the smooth, deterministic path can get stuck in shallow regions.</p>\n\n<h4>Stochastic gradient descent (SGD)</h4>\n<p>Use a <strong>single</strong> randomly chosen example per step:</p>\n$$\\theta \\leftarrow \\theta - \\eta\\,\\nabla \\ell(\\theta; x_i, y_i)$$\n<p>Each step is extremely cheap and you update $N$ times per epoch instead of once. The single-example gradient is a noisy, unbiased estimate of the true gradient — its expectation equals the true gradient, but any individual step jitters. That noise is a feature, not just a bug: it helps the optimizer escape sharp local minima and saddle points.</p>\n\n<h4>Minibatch gradient descent (what everyone actually uses)</h4>\n<p>Use a small random subset (a <strong>minibatch</strong> $\\mathcal{B}$ of, say, 32–512 examples):</p>\n$$g = \\frac{1}{|\\mathcal{B}|}\\sum_{i\\in\\mathcal{B}}\\nabla \\ell(\\theta; x_i, y_i), \\qquad \\theta \\leftarrow \\theta - \\eta\\, g$$\n<p>This is the practical sweet spot. The variance of the gradient estimate shrinks roughly like $1/|\\mathcal{B}|$, giving a cleaner signal than pure SGD, while still being cheap and exploiting GPU parallelism (matrix multiplies over a batch are far more efficient than one example at a time).</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>In modern deep learning, \"SGD\" almost always means <em>minibatch</em> SGD — nobody trains on one example at a time. Batch size is a real hyperparameter: larger batches give smoother, more parallelizable gradients but cost more memory and, counterintuitively, can <em>generalize worse</em> (large-batch training tends to find sharper minima). This is why batch size, learning rate, and generalization are deeply intertwined.</p>\n</div>\n\n<h3>The Learning Rate: The Single Most Important Knob</h3>\n<p>Before adding any bells and whistles, understand $\\eta$, because it dominates training behavior.</p>\n<ul>\n<li><strong>Too high:</strong> the step overshoots the minimum. On a simple quadratic bowl, if $\\eta$ exceeds $2/\\lambda_{\\max}$ (where $\\lambda_{\\max}$ is the largest curvature/eigenvalue of the Hessian), updates <em>amplify</em> the error and the loss <strong>diverges</strong> — you see it explode to <code>NaN</code> or oscillate wildly upward.</li>\n<li><strong>Too low:</strong> every step is tiny, so training crawls or appears to <strong>stall</strong>; it may also settle into the first mediocre local region it finds because it lacks the energy to escape.</li>\n<li><strong>Just right:</strong> steady, brisk decrease in loss. In practice you find it by trial (often a learning-rate sweep or warmup) and then <em>decay</em> it over time so you take big strides early and fine, careful steps near the minimum.</li>\n</ul>\n<p>A useful mental model: with a too-large rate on a narrow valley, you bounce back and forth across the valley walls, climbing higher each bounce. This zig-zag pathology is exactly what momentum and adaptive methods are built to tame.</p>\n\n<h3>Momentum: Remember Where You Were Going</h3>\n<p>Plain SGD has a problem in <em>ravines</em> — regions where the loss surface curves much more steeply in one direction than another (very common around minima). The gradient mostly points across the ravine, not along it, so SGD oscillates side-to-side while making painfully slow progress along the valley floor.</p>\n<p><strong>Momentum</strong> fixes this by accumulating an exponentially decaying moving average of past gradients — a \"velocity\" — and stepping with that instead of the raw gradient:</p>\n$$v \\leftarrow \\beta\\, v + \\nabla L(\\theta)$$\n$$\\theta \\leftarrow \\theta - \\eta\\, v$$\n<p>Here $\\beta \\in [0,1)$ is the <strong>momentum coefficient</strong>, typically $0.9$. The velocity $v$ remembers the recent direction of travel. Oscillating components (which flip sign every step) cancel out in the average, while the consistent down-valley component accumulates and accelerates. The effective number of steps \"remembered\" is about $\\frac{1}{1-\\beta}$, so $\\beta=0.9$ averages over roughly the last 10 gradients.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Back to the ball: plain SGD is a ball moving through molasses — it only goes where the current slope pushes it, stopping instantly. Momentum gives the ball <em>mass</em>. It builds up speed rolling downhill, plows through small bumps and flat spots, and damps out the back-and-forth jitter across a ravine because opposing pushes average to zero.</p>\n</div>\n<p>A closely related variant, <strong>Nesterov momentum</strong>, evaluates the gradient at the <em>look-ahead</em> position $\\theta - \\eta\\beta v$ rather than at $\\theta$. By peeking where momentum is about to carry it, it can correct sooner and often converges a touch faster.</p>\n\n<h3>RMSProp: Give Each Parameter Its Own Learning Rate</h3>\n<p>A different problem: in deep nets, different parameters have wildly different gradient magnitudes. A single global $\\eta$ that suits one coordinate will be far too large or too small for another. We'd like a <em>per-parameter</em> learning rate that automatically scales down where gradients are big and scales up where they're small.</p>\n<p><strong>RMSProp</strong> tracks an exponentially decaying average of the <em>squared</em> gradients (the running mean square, hence the name) and divides each update by its square root:</p>\n$$s \\leftarrow \\beta_2\\, s + (1-\\beta_2)\\,(\\nabla L(\\theta))^2$$\n$$\\theta \\leftarrow \\theta - \\frac{\\eta}{\\sqrt{s} + \\epsilon}\\,\\nabla L(\\theta)$$\n<p>All operations are <strong>element-wise</strong>: every parameter gets its own $s$ and therefore its own effective step size $\\eta/\\sqrt{s}$. A typical decay is $\\beta_2 = 0.999$ (or $0.9$); $\\epsilon$ (e.g. $10^{-8}$) is a tiny constant that prevents division by zero. Coordinates with persistently large gradients get damped; coordinates with tiny gradients get boosted — which is exactly what you want for <strong>sparse</strong> features (rare inputs whose gradients are usually zero but occasionally large) and for <strong>noisy</strong> gradients of uneven scale.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>RMSProp's per-coordinate normalization is why it shines on problems with sparse or wildly-scaled gradients — recurrent networks, embeddings for rare words, anything where some parameters update rarely. It normalizes the <em>scale</em> of each direction without you having to hand-tune a learning rate per layer.</p>\n</div>\n\n<h3>Adam: Momentum + RMSProp, With a Correction</h3>\n<p><strong>Adam</strong> (Adaptive Moment Estimation) is the workhorse default for most deep learning. It combines the two good ideas above: a momentum-like average of the gradient (the <em>first moment</em>) <em>and</em> an RMSProp-like average of the squared gradient (the <em>second moment</em>).</p>\n<p>At step $t$, with gradient $g_t = \\nabla L(\\theta_t)$:</p>\n$$m_t \\leftarrow \\beta_1\\, m_{t-1} + (1-\\beta_1)\\, g_t \\qquad \\text{(first moment — mean of gradients)}$$\n$$v_t \\leftarrow \\beta_2\\, v_{t-1} + (1-\\beta_2)\\, g_t^2 \\qquad \\text{(second moment — mean of squared gradients)}$$\n<h4>Bias correction — the crucial subtlety</h4>\n<p>We initialize $m_0 = 0$ and $v_0 = 0$. Early in training these averages are biased toward zero — they haven't \"warmed up\" yet, so they systematically underestimate the true moments. Adam corrects this analytically by dividing by $(1-\\beta^t)$:</p>\n$$\\hat m_t = \\frac{m_t}{1-\\beta_1^{\\,t}}, \\qquad \\hat v_t = \\frac{v_t}{1-\\beta_2^{\\,t}}$$\n<p>At $t=1$ with $\\beta_1=0.9$, raw $m_1 = 0.1\\,g_1$ — ten times too small — but $\\hat m_1 = m_1/(1-0.9) = g_1$, exactly right. As $t$ grows, $\\beta^t \\to 0$ and the correction fades to 1, so it only matters during the first dozens of steps. Without it, the two underestimates do not cancel: because the squared-gradient estimate $v_t$ is shrunk more aggressively early on, its square root in the denominator shrinks faster than the numerator $m_t$, so the <em>net</em> early step is actually too <em>large</em> (at $t=1$ roughly $3\\times$ the intended size for the defaults), and the step size is erratic until the averages warm up. Bias correction is what makes the very first steps the right magnitude.</p>\n<p>The final update uses the corrected moments:</p>\n$$\\theta_t \\leftarrow \\theta_{t-1} - \\eta\\,\\frac{\\hat m_t}{\\sqrt{\\hat v_t} + \\epsilon}$$\n<p>Defaults that work astonishingly often: $\\beta_1 = 0.9$, $\\beta_2 = 0.999$, $\\epsilon = 10^{-8}$, $\\eta = 0.001$. The numerator $\\hat m_t$ supplies momentum's smoothing and acceleration; the denominator $\\sqrt{\\hat v_t}$ supplies RMSProp's per-parameter scaling. You get robust, fast, low-tuning training out of the box.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Notice the unifying theme: each optimizer <em>accumulates a running average of something</em>. Momentum accumulates the gradient (first moment). RMSProp accumulates the squared gradient (second moment). Adam accumulates both — and adds bias correction so the averages are trustworthy from step one. They are not four unrelated tricks; they are points on a single design axis: <em>what statistics of the gradient history should we remember, and how should we use them to shape the step?</em></p>\n</div>\n<p>A practical note: although Adam is the safe default, well-tuned SGD with momentum often <em>generalizes</em> slightly better on large vision models, which is why many state-of-the-art image classifiers still train with momentum SGD plus a careful learning-rate schedule. AdamW (Adam with decoupled weight decay) is the modern refinement that fixes a subtle regularization flaw and is now standard for training transformers.</p>\n\n<h3>Worked Example: One Adam Step by Hand</h3>\n<p>Let's trace a single parameter through the very first Adam update so the equations become concrete. Suppose we have one scalar parameter $\\theta_0 = 1.0$, gradient $g_1 = 0.2$, and the standard hyperparameters $\\eta = 0.1$ (chosen large here to make the arithmetic visible), $\\beta_1 = 0.9$, $\\beta_2 = 0.999$, $\\epsilon = 10^{-8}$.</p>\n<ol>\n<li><strong>First moment:</strong> $m_1 = 0.9\\cdot 0 + 0.1\\cdot 0.2 = 0.02$.</li>\n<li><strong>Second moment:</strong> $v_1 = 0.999\\cdot 0 + 0.001\\cdot 0.2^2 = 0.001\\cdot 0.04 = 0.00004$.</li>\n<li><strong>Bias-correct (at $t=1$):</strong> $\\hat m_1 = \\dfrac{0.02}{1-0.9} = 0.2$, and $\\hat v_1 = \\dfrac{0.00004}{1-0.999} = \\dfrac{0.00004}{0.001} = 0.04$.</li>\n<li><strong>Update:</strong> $\\theta_1 = 1.0 - 0.1\\cdot \\dfrac{0.2}{\\sqrt{0.04} + 10^{-8}} = 1.0 - 0.1\\cdot \\dfrac{0.2}{0.2} = 1.0 - 0.1 = 0.9$.</li>\n</ol>\n<p>Two things to absorb. First, the bias correction undid the cold-start shrinkage: $\\hat m_1 = 0.2 = g_1$ and $\\hat v_1 = 0.04 = g_1^2$ exactly — at step 1 Adam recovers the true single-sample moments. Second, the effective step was $\\eta\\cdot \\hat m_1/\\sqrt{\\hat v_1} = \\eta \\cdot g_1/|g_1| = \\eta$. Whenever the gradient is steady, the ratio $\\hat m/\\sqrt{\\hat v}$ has magnitude near 1, so Adam's step size is roughly $\\eta$ <em>regardless of the gradient's absolute scale</em>. That scale-invariance is precisely why Adam is so forgiving to tune.</p>\n\n<h3>Putting It Together: Choosing an Optimizer</h3>\n<ul>\n<li><strong>Need a reliable default with minimal tuning?</strong> Use <strong>Adam</strong> (or <strong>AdamW</strong> for anything with weight decay, especially transformers).</li>\n<li><strong>Sparse or recurrent-style gradients, very uneven scales?</strong> Adaptive methods (RMSProp / Adam) handle these gracefully; plain SGD struggles.</li>\n<li><strong>Chasing best generalization on a well-understood vision task, with time to tune?</strong> <strong>SGD + momentum</strong> with a learning-rate schedule often edges out Adam.</li>\n<li><strong>Whatever you pick,</strong> the learning rate remains the most important hyperparameter. Watch the loss curve: exploding/NaN means $\\eta$ too high; flat-line stall means $\\eta$ too low.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"calc-gradient-descent\"></div>",
          "mcq": [
            {
              "q": "During training the loss curve climbs steadily and soon becomes $\\texttt{NaN}$. What is the most likely cause and fix?",
              "choices": [
                "Learning rate too high; decrease it",
                "Learning rate too low; increase it",
                "Batch size too large; decrease it",
                "Momentum coefficient $\\beta$ too small; increase it"
              ],
              "answer": 0,
              "explain": "A loss that grows/explodes to NaN is the signature of overshooting: the step is so large that updates amplify rather than reduce the error. Lowering the learning rate is the direct fix."
            },
            {
              "q": "What is the purpose of bias correction ($\\hat m_t = m_t/(1-\\beta_1^t)$) in Adam?",
              "choices": [
                "It decays the learning rate over time",
                "It counteracts the moment estimates being biased toward zero early in training because they start at 0",
                "It prevents division by zero in the denominator",
                "It adds momentum to RMSProp"
              ],
              "answer": 1,
              "explain": "Because $m_0=v_0=0$, the running averages underestimate the true moments at the start. Dividing by $(1-\\beta^t)$ rescales them so they are unbiased; the correction fades as $\\beta^t\\to 0$."
            },
            {
              "q": "Which statement correctly matches each optimizer to what it accumulates?",
              "choices": [
                "Momentum accumulates squared gradients; RMSProp accumulates raw gradients",
                "Momentum accumulates raw gradients (1st moment); RMSProp accumulates squared gradients (2nd moment); Adam accumulates both",
                "All three accumulate only the raw gradient, differing only in learning rate",
                "RMSProp accumulates both moments; Adam accumulates only the second"
              ],
              "answer": 1,
              "explain": "Momentum keeps a running average of the gradient (first moment); RMSProp keeps a running average of the squared gradient (second moment); Adam combines the two plus bias correction."
            },
            {
              "q": "Why is minibatch gradient descent generally preferred over both full-batch and single-sample (pure stochastic) GD?",
              "choices": [
                "Its gradient is exact, unlike the other two",
                "It balances cheap, frequent, GPU-parallel updates with a lower-variance gradient estimate than single-sample SGD",
                "It is the only method whose gradient is an unbiased estimate of the true gradient",
                "It guarantees convergence to the global minimum"
              ],
              "answer": 1,
              "explain": "Minibatches exploit GPU parallelism and update frequently like SGD, while averaging over the batch reduces gradient variance (roughly like $1/|\\mathcal{B}|$) compared to a single sample. Both SGD and minibatch give unbiased estimates, so that is not the distinguishing reason."
            },
            {
              "q": "The base gradient descent update is $\\theta \\leftarrow \\theta - \\eta\\,\\nabla L(\\theta)$. Why does it use the *negative* gradient rather than the gradient itself?",
              "choices": [
                "The gradient points toward steepest increase of the loss, so we step opposite to it to decrease the loss",
                "The negative sign converts the learning rate into a positive value",
                "Gradients are always negative for a correctly trained network",
                "Subtracting prevents the parameters from ever becoming negative"
              ],
              "answer": 0,
              "explain": "$\\nabla L(\\theta)$ points in the direction of steepest ascent (increasing loss), so moving in the opposite direction reduces the loss."
            },
            {
              "q": "In the 'ball on a hilly landscape in the dark' analogy, what does the learning rate $\\eta$ correspond to?",
              "choices": [
                "The slope you feel under your feet",
                "The stride length of each step you take",
                "The depth of the valley you are seeking",
                "The number of times you stop to feel the ground"
              ],
              "answer": 1,
              "explain": "The analogy maps the learning rate to stride length: too small and you crawl, too large and you overshoot the valley. The slope is the gradient and the valley is the minimum."
            },
            {
              "q": "Why can't we just solve $\\nabla L(\\theta) = 0$ directly to train a deep network?",
              "choices": [
                "The gradient of a deep network is always exactly zero at initialization",
                "The loss is high-dimensional, non-convex, and tangled, so there is no closed-form solution",
                "Computers cannot represent the value zero precisely enough",
                "Setting the gradient to zero would erase all the weights"
              ],
              "answer": 1,
              "explain": "Because $L(\\theta)$ is high-dimensional and non-convex with no closed-form solution, we descend iteratively rather than solving for the optimum analytically."
            },
            {
              "q": "Full-batch gradient descent computes $g = \\frac{1}{N}\\sum_{i=1}^{N}\\nabla \\ell(\\theta; x_i, y_i)$ before each step. Compared to single-sample SGD, what is its key drawback?",
              "choices": [
                "Its gradient estimate is too noisy to converge",
                "Each step requires a full pass over the dataset, making it glacial on large data",
                "It cannot compute an exact gradient",
                "It requires a separate learning rate for every example"
              ],
              "answer": 1,
              "explain": "Full-batch gives an exact, smooth gradient but each step costs a complete pass over all $N$ examples, which is prohibitively slow with millions of examples. (Noisy estimates are a property of single-sample SGD, not full-batch.)"
            }
          ],
          "flashcards": [
            {
              "front": "The basic gradient descent update rule",
              "back": "$\\theta \\leftarrow \\theta - \\eta\\,\\nabla L(\\theta)$: step opposite the gradient, scaled by learning rate $\\eta$."
            },
            {
              "front": "Adam: the four update equations (step $t$, gradient $g_t$)",
              "back": "$m_t=\\beta_1 m_{t-1}+(1-\\beta_1)g_t$; $v_t=\\beta_2 v_{t-1}+(1-\\beta_2)g_t^2$; $\\hat m_t=m_t/(1-\\beta_1^t)$, $\\hat v_t=v_t/(1-\\beta_2^t)$; $\\theta_t=\\theta_{t-1}-\\eta\\,\\hat m_t/(\\sqrt{\\hat v_t}+\\epsilon)$."
            },
            {
              "front": "What does the momentum coefficient $\\beta$ control, and a typical value?",
              "back": "It is the decay rate of the velocity (exp. moving average of gradients). Typically $\\beta=0.9$, which effectively averages the last $\\approx 1/(1-\\beta)=10$ gradients. Higher $\\beta$ = longer memory / more inertia."
            },
            {
              "front": "What does each optimizer accumulate?",
              "back": "Momentum: running avg of the gradient (1st moment). RMSProp: running avg of the squared gradient (2nd moment). Adam: both, plus bias correction."
            },
            {
              "front": "Learning rate too high vs. too low?",
              "back": "Too high: overshoots the minimum, loss oscillates upward / diverges to NaN. Too low: steps tiny, training stalls/crawls and may settle in a poor region."
            },
            {
              "front": "Why use RMSProp / Adam for sparse or noisy gradients?",
              "back": "They divide each update by $\\sqrt{\\text{running mean of }g^2}$ per parameter, giving each coordinate its own adaptive step: big-gradient directions are damped, tiny/rare-gradient directions are boosted."
            }
          ],
          "homework": [
            {
              "prompt": "Minimize $L(\\theta)=\\tfrac12\\theta^2$ (so $\\nabla L=\\theta$) starting from $\\theta_0=1$ with plain gradient descent. (a) Write the update as $\\theta_{t+1}=(1-\\eta)\\theta_t$. (b) For which range of $\\eta$ does $\\theta_t\\to 0$? (c) What happens at $\\eta=2.5$?",
              "hint": "Substitute $\\nabla L=\\theta$ into $\\theta\\leftarrow\\theta-\\eta\\nabla L$. The iteration is geometric with ratio $(1-\\eta)$; it converges to 0 iff $|1-\\eta|<1$.",
              "solution": "(a) $\\theta_{t+1}=\\theta_t-\\eta\\theta_t=(1-\\eta)\\theta_t$, so $\\theta_t=(1-\\eta)^t$. (b) Converges to 0 iff $|1-\\eta|<1$, i.e. $0<\\eta<2$. (At $\\eta=1$ it reaches 0 in one step.) (c) At $\\eta=2.5$, $|1-\\eta|=1.5>1$, so $\\theta_t=(-1.5)^t$ oscillates in sign and grows without bound — it diverges. This is the 1-D version of 'learning rate too high'; here $\\lambda_{\\max}=1$ and the stability bound is $\\eta<2/\\lambda_{\\max}=2$."
            },
            {
              "prompt": "You run momentum SGD with $\\beta=0.9$ and a constant gradient $g$ every step (e.g. on a long linear slope), using the update $v\\leftarrow\\beta v+g$, $\\theta\\leftarrow\\theta-\\eta v$. Starting from $v_0=0$, what value does the velocity $v$ converge to, and how does the eventual step size compare to plain SGD's step $\\eta g$?",
              "hint": "The recursion $v\\leftarrow\\beta v+g$ reaches a fixed point when $v=\\beta v+g$. Solve for $v$.",
              "solution": "At the fixed point $v^*=\\beta v^*+g\\Rightarrow v^*(1-\\beta)=g\\Rightarrow v^*=g/(1-\\beta)$. With $\\beta=0.9$, $v^*=g/0.1=10g$. The momentum step is $\\eta v^*=10\\,\\eta g$ — ten times larger than plain SGD's $\\eta g$. So on a consistent slope, momentum accelerates to an effective learning rate of $\\eta/(1-\\beta)$. This is why momentum dramatically speeds progress along a valley floor while still cancelling oscillating components."
            },
            {
              "prompt": "Compute the first Adam step for a parameter with $\\theta_0=0$, gradient $g_1=-3$, hyperparameters $\\eta=0.01$, $\\beta_1=0.9$, $\\beta_2=0.999$, $\\epsilon=10^{-8}$. Then state what $\\theta_1$ would be and why the magnitude of the step is approximately $\\eta$ regardless of $g_1$.",
              "hint": "Compute $m_1,v_1$, then bias-correct with $(1-\\beta_1^1)$ and $(1-\\beta_2^1)$, then apply $\\theta_1=\\theta_0-\\eta\\,\\hat m_1/(\\sqrt{\\hat v_1}+\\epsilon)$. Watch the sign.",
              "solution": "$m_1=0.1\\cdot(-3)=-0.3$; $v_1=0.001\\cdot 9=0.009$. Bias-correct: $\\hat m_1=-0.3/0.1=-3$; $\\hat v_1=0.009/0.001=9$. Step ratio: $\\hat m_1/(\\sqrt{\\hat v_1}+\\epsilon)=-3/(3+10^{-8})\\approx -1$. So $\\theta_1=0-0.01\\cdot(-1)=+0.01$. The magnitude is $\\approx\\eta=0.01$ because at $t=1$ bias correction gives $\\hat m_1=g_1$ and $\\hat v_1=g_1^2$, so the ratio is $g_1/|g_1|=\\pm 1$ — the gradient's scale cancels, leaving a step of size $\\eta$ in the direction opposite the gradient. This scale-invariance is Adam's hallmark and why $\\eta\\approx 10^{-3}$ works across many problems."
            }
          ]
        },
        {
          "id": "dl-learning-rate-schedules-and-tuning",
          "title": "Learning Rates, Schedules, and the Training Loop",
          "minutes": 12,
          "content": "<h3>The Training Loop: The Engine of Learning</h3>\n\n<p>Every deep learning system, from a tiny MLP to a frontier language model, is trained by a loop that is conceptually identical. You feed data forward, measure how wrong the prediction is, propagate that error backward to compute gradients, take a small step to reduce the error, and repeat. Mastering this loop — and the single most important knob inside it, the <strong>learning rate</strong> — is the difference between a model that converges to something useful and one that diverges into a wall of <code>NaN</code>s.</p>\n\n<p>Let us write the canonical loop in PyTorch first, then dissect every line. This is the skeleton you will see, with minor variations, in essentially all training code.</p>\n\n<pre><code>for epoch in range(num_epochs):\n    for x, y in dataloader:            # one batch\n        optimizer.zero_grad()          # 1. clear old gradients\n        y_hat = model(x)               # 2. forward pass\n        loss = criterion(y_hat, y)     # 3. compute loss\n        loss.backward()                # 4. backward pass (backprop)\n        optimizer.step()               # 5. update parameters\n</code></pre>\n\n<h4>The five operations</h4>\n\n<ul>\n<li><strong>zero_grad</strong> — PyTorch <em>accumulates</em> gradients into <code>.grad</code> by default rather than overwriting them. If you forget to zero, the gradient from the previous batch is added to the current one, silently corrupting the update. (The accumulation behavior is a feature: it lets you simulate a large batch by summing gradients over several small ones before stepping — \"gradient accumulation.\")</li>\n<li><strong>forward</strong> — compute the model's prediction $\\hat{y} = f_\\theta(x)$ and, as a side effect, build the computation graph that records every operation so gradients can flow back.</li>\n<li><strong>loss</strong> — evaluate a scalar $L(\\hat{y}, y)$ measuring error, e.g. cross-entropy for classification or MSE for regression. The loss must be a single scalar because we differentiate it.</li>\n<li><strong>backward</strong> — apply the chain rule (reverse-mode automatic differentiation) to populate $\\frac{\\partial L}{\\partial \\theta}$ for every parameter $\\theta$. This is backprop.</li>\n<li><strong>step</strong> — update parameters using those gradients. For plain SGD, the rule is</li>\n</ul>\n\n$$\\theta_{t+1} = \\theta_t - \\eta \\, \\nabla_\\theta L(\\theta_t)$$\n\n<p>where $\\eta$ (eta) is the learning rate. Everything else in optimization — momentum, Adam, schedules — is a refinement of <em>how</em> we choose the direction and the size of this step.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of the loss as a landscape over parameter space and you are standing on a hillside in fog. The gradient points uphill (steepest ascent), so $-\\nabla L$ points downhill. The learning rate is your <em>stride length</em>. Too short and you take forever to reach the valley; too long and you leap clean over it, possibly landing higher than you started.</p>\n</div>\n\n<h3>Steps, Batches, and Epochs</h3>\n\n<p>These three terms are constantly confused, so let us pin them down precisely.</p>\n\n<ul>\n<li>A <strong>step</strong> (or iteration) is one execution of the five operations above: one parameter update, computed from one batch.</li>\n<li>A <strong>batch</strong> is the set of $B$ examples used in a single step. $B$ is the <em>batch size</em>.</li>\n<li>An <strong>epoch</strong> is one full pass over the entire training set of $N$ examples.</li>\n</ul>\n\n<p>The relationship is arithmetic:</p>\n\n$$\\text{steps per epoch} = \\left\\lceil \\frac{N}{B} \\right\\rceil, \\qquad \\text{total steps} = \\text{epochs} \\times \\left\\lceil \\frac{N}{B} \\right\\rceil.$$\n\n<p><strong>Worked count.</strong> Suppose $N = 50{,}000$ images, $B = 250$, trained for $40$ epochs. Steps per epoch $= 50000 / 250 = 200$. Total steps $= 40 \\times 200 = 8000$. If you halve the batch to $B = 125$, you now do $400$ steps per epoch and $16{,}000$ total — twice as many updates for the same number of epochs, each based on a noisier gradient estimate.</p>\n\n<p>This matters because <strong>learning-rate schedules are almost always defined over steps, not epochs.</strong> A cosine schedule needs to know the total number of steps to compute its decay. Change your batch size or your epoch count and you change the schedule unless you recompute the step total.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Gradient descent that uses one batch per step is <strong>stochastic gradient descent (SGD)</strong>. The batch gradient is an unbiased estimator of the true (full-dataset) gradient: $\\mathbb{E}[\\nabla L_{\\text{batch}}] = \\nabla L_{\\text{full}}$. The variance of that estimate scales like $1/B$. So a bigger batch gives a lower-variance, more accurate gradient — but each step costs more compute and, counterintuitively, the <em>noise</em> in small-batch SGD is itself a useful regularizer that helps escape sharp minima.</p>\n</div>\n\n<h3>Batch Size and Learning Rate: A Coupled Pair</h3>\n\n<p>Because the gradient noise depends on batch size, you cannot tune the learning rate in isolation. The two are linked. The standard heuristic, validated empirically in large-scale training (notably Goyal et al.'s \"ImageNet in 1 hour\"), is the <strong>linear scaling rule</strong>:</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p><strong>Linear scaling rule:</strong> when you multiply the batch size by $k$, multiply the learning rate by $k$ as well. If $B=256$ trains well at $\\eta = 0.1$, then $B = 1024$ should use roughly $\\eta = 0.4$.</p>\n</div>\n\n<p>The intuition: with batch size $kB$ you take one step using information from $k$ batches' worth of data. To make comparable progress to taking $k$ separate small steps, that one step should be roughly $k$ times larger. More formally, the SGD update over $k$ small batches approximates one update with $k\\times$ the learning rate, <em>provided the gradient doesn't change much over those steps</em> — which holds early in training but breaks down for very large batches, where the rule needs warmup and eventually saturates. An alternative, sometimes more stable for adaptive optimizers, is the <em>square-root</em> scaling rule $\\eta \\propto \\sqrt{B}$, which keeps the variance of the per-step weight update (which scales like $\\eta^2/B$) constant.</p>\n\n<h3>Learning-Rate Schedules</h3>\n\n<p>A fixed learning rate is a compromise. Early in training you want large steps to make fast progress across the loss landscape; late in training you want small steps to settle precisely into a minimum without bouncing around it. A <strong>schedule</strong> $\\eta(t)$ varies the learning rate as a function of the step $t$ to get the best of both.</p>\n\n<h4>Step decay</h4>\n\n<p>The oldest and simplest: keep $\\eta$ constant, then multiply it by a factor $\\gamma < 1$ at fixed milestones.</p>\n\n$$\\eta(t) = \\eta_0 \\cdot \\gamma^{\\lfloor t / s \\rfloor}$$\n\n<p>where $s$ is the step interval and $\\gamma$ is typically $0.1$ or $0.5$. You see characteristic \"staircase\" drops in the loss curve: each time the rate drops, the loss takes a sudden additional dip as the smaller steps let the model exploit the local geometry. Simple and robust, but the milestones are hyperparameters you must guess.</p>\n\n<h4>Cosine annealing</h4>\n\n<p>The modern default. Instead of discrete drops, decay $\\eta$ smoothly from $\\eta_{\\max}$ to $\\eta_{\\min}$ following half a cosine curve over the training horizon $T$:</p>\n\n$$\\eta(t) = \\eta_{\\min} + \\tfrac{1}{2}\\,(\\eta_{\\max} - \\eta_{\\min})\\left(1 + \\cos\\!\\left(\\frac{\\pi t}{T}\\right)\\right).$$\n\n<p>At $t = 0$, $\\cos(0) = 1$ so $\\eta = \\eta_{\\max}$. At $t = T$, $\\cos(\\pi) = -1$ so $\\eta = \\eta_{\\min}$. The decay is gentle at first (preserving fast early progress), steepest in the middle, then flattens again near the end (letting the model fine-tune). Empirically this smooth profile often outperforms step decay and avoids the need to hand-pick milestones — you only specify $T$, $\\eta_{\\max}$, and $\\eta_{\\min}$ (often $\\eta_{\\min}=0$). It is the standard schedule for training transformers and large vision models, sometimes with \"warm restarts\" (SGDR) that periodically reset $\\eta$ to $\\eta_{\\max}$.</p>\n\n<h4>Warmup</h4>\n\n<p>At the very start of training, parameters are randomly initialized and the gradient estimates are unreliable — and with adaptive optimizers like Adam, the running estimates of gradient variance are based on almost no data, so they are wild. Taking a full-sized step immediately can blow up the loss. <strong>Warmup</strong> ramps the learning rate <em>up</em> linearly from near zero to $\\eta_{\\max}$ over the first $W$ steps:</p>\n\n$$\\eta(t) = \\eta_{\\max}\\cdot \\frac{t}{W} \\quad \\text{for } t \\le W,$$\n\n<p>and then a decay schedule (typically cosine) takes over for $t > W$. The combined \"warmup + cosine\" profile — a short ramp up followed by a long smooth ramp down — is the de facto standard for training large transformers. Warmup is especially important when (a) you use large batches and a large $\\eta$ via the linear scaling rule, or (b) you use Adam, whose early variance estimates are noisy.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Warmup is like easing your foot onto the accelerator instead of flooring it from a standstill. The model's parameters and the optimizer's internal statistics both need a moment to \"find their footing\" before they can safely tolerate large steps.</p>\n</div>\n\n<h3>Worked Example: Building a Warmup + Cosine Schedule</h3>\n\n<p>Let us design and trace a schedule end to end. Setup: $N = 60{,}000$ examples, $B = 600$, $30$ epochs, peak learning rate $\\eta_{\\max} = 0.01$, warmup for the first epoch, then cosine decay to $\\eta_{\\min}=0$.</p>\n\n<p><strong>Step counts.</strong> Steps per epoch $= 60000/600 = 100$. Total steps $T_{\\text{total}} = 30 \\times 100 = 3000$. Warmup length $W = 100$ (one epoch). The cosine phase therefore runs over the remaining $T = 3000 - 100 = 2900$ steps.</p>\n\n<p><strong>Phase 1 — warmup ($t \\le 100$).</strong> At step $t=50$ (halfway through warmup): $\\eta = 0.01 \\times 50/100 = 0.005$. At $t=100$ we reach the peak $\\eta = 0.01$.</p>\n\n<p><strong>Phase 2 — cosine ($t > 100$).</strong> Let $\\tau = t - W$ be the steps into the cosine phase, $\\tau \\in [0, 2900]$. Then</p>\n\n$$\\eta(t) = \\tfrac{1}{2}(0.01)\\left(1 + \\cos\\!\\left(\\frac{\\pi \\tau}{2900}\\right)\\right).$$\n\n<p>At the midpoint of the cosine phase, $\\tau = 1450$: $\\cos(\\pi/2) = 0$, so $\\eta = \\tfrac{1}{2}(0.01)(1+0) = 0.005$. At the very end, $\\tau = 2900$: $\\cos(\\pi) = -1$, so $\\eta = 0$.</p>\n\n<p>In code, this is a single function of the global step:</p>\n\n<pre><code>import math\n\ndef lr_at(t, base_lr=0.01, warmup=100, total=3000):\n    if t < warmup:\n        return base_lr * t / warmup            # linear ramp up\n    progress = (t - warmup) / (total - warmup) # 0 -> 1 over cosine phase\n    return 0.5 * base_lr * (1 + math.cos(math.pi * progress))\n\n# usage inside the loop, called every step:\nfor t, (x, y) in enumerate(all_steps):\n    for g in optimizer.param_groups:\n        g['lr'] = lr_at(t)\n    # ... zero_grad, forward, loss, backward, step\n</code></pre>\n\n<p>In practice you would use <code>torch.optim.lr_scheduler</code> (e.g. <code>LambdaLR</code> or <code>SequentialLR</code> composing a warmup with <code>CosineAnnealingLR</code>) and call <code>scheduler.step()</code> after each <code>optimizer.step()</code>, but writing it by hand once makes the mechanics concrete.</p>\n\n<h3>Reading Loss Curves to Diagnose the Learning Rate</h3>\n\n<p>The single most valuable skill in practice is looking at a training-loss curve and inferring whether the learning rate is too high, too low, or about right. Here is the diagnostic table.</p>\n\n<ul>\n<li><strong>LR far too high:</strong> the loss <em>diverges</em> — it shoots up, often to <code>inf</code> or <code>NaN</code> within a few steps. The steps overshoot the valley so badly the model climbs the walls.</li>\n<li><strong>LR somewhat too high:</strong> the loss drops fast initially but then <em>plateaus high and oscillates noisily</em>, bouncing around a poor value because each step overshoots the local minimum. The curve looks \"fuzzy\" and never settles.</li>\n<li><strong>LR too low:</strong> the loss decreases <em>smoothly but painfully slowly</em>, nearly linear and far from converged when training ends. No instability, just glacial progress — you're leaving performance on the table.</li>\n<li><strong>LR about right:</strong> a fast initial drop followed by a smooth, decelerating decline that flattens into a low plateau.</li>\n<li><strong>Healthy schedule signature:</strong> with step decay you see staircase drops at the milestones; with cosine you see a smooth curve that continues improving and tightens noticeably in the final third as $\\eta \\to \\eta_{\\min}$.</li>\n</ul>\n\n<p>A practical technique to find a good starting rate without guessing is the <strong>LR range test</strong> (Smith): run a few hundred steps while exponentially increasing $\\eta$, and plot loss versus $\\eta$ on a log scale. Pick a rate slightly below where the loss starts to rise sharply — that is the largest stable stride.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Distinguish <strong>training loss</strong> from <strong>validation loss</strong> when diagnosing. A high or oscillating <em>training</em> loss is usually an optimization (learning-rate) problem. A training loss that keeps dropping while <em>validation</em> loss rises is not an LR problem at all — that is <em>overfitting</em>, addressed by regularization, more data, or early stopping. Misreading one for the other wastes enormous time.</p>\n</div>\n\n<h3>Putting It Together</h3>\n\n<p>The training loop is forward, loss, backward, step, zero-grad — and the learning rate governs the size of each step. Batch size sets how noisy each gradient is and how many steps you take per epoch, and it is coupled to the learning rate through the linear scaling rule. Schedules shape $\\eta$ over time: large early for fast progress, small late for precise convergence, with warmup at the start to keep early steps safe. And the loss curve is your instrument panel — its shape tells you, at a glance, whether your most important hyperparameter is set correctly.</p>",
          "mcq": [
            {
              "q": "During training the loss drops quickly for the first few hundred steps, then plateaus at a high value and oscillates noisily up and down without settling. The validation loss tracks the training loss closely. What is the most likely fix?",
              "choices": [
                "Decrease the learning rate",
                "Increase the learning rate",
                "Add dropout / weight decay to reduce overfitting",
                "Train for many more epochs at the same settings"
              ],
              "answer": 0,
              "explain": "Noisy oscillation around a high plateau is the classic signature of a learning rate that is too high: each step overshoots the local minimum. Since train and val loss track each other, it is not overfitting."
            },
            {
              "q": "You train with $N = 40{,}000$ examples, batch size $B = 200$, for $25$ epochs. How many total optimizer steps occur, and what happens to the step count if you halve the batch size while keeping epochs fixed?",
              "choices": [
                "5000 steps; halving the batch gives 2500 steps",
                "5000 steps; halving the batch gives 10000 steps",
                "25 steps; batch size does not affect step count",
                "200 steps; halving the batch gives 100 steps"
              ],
              "answer": 1,
              "explain": "Steps per epoch = 40000/200 = 200, times 25 epochs = 5000. Halving B to 100 doubles steps per epoch to 400, giving 10000 total steps for the same number of epochs."
            },
            {
              "q": "Why is a warmup phase especially important when training with large batches and adaptive optimizers like Adam?",
              "choices": [
                "Large batches need fewer steps, so warmup spreads the work out evenly",
                "Warmup permanently lowers the peak learning rate to prevent overfitting",
                "Early gradient and variance estimates are unreliable, and a large batch implies a large LR (linear scaling), so a full-size step at step 0 can blow up the loss",
                "Warmup is required for the cosine formula to be mathematically defined"
              ],
              "answer": 2,
              "explain": "At initialization the parameters are random and Adam's variance statistics are based on almost no data; combined with the large LR from the linear scaling rule, an immediate full-size step can diverge. Warmup ramps the LR up gradually to avoid this."
            },
            {
              "q": "In the cosine annealing schedule $\\eta(t) = \\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max}-\\eta_{\\min})(1+\\cos(\\pi t / T))$, what is the learning rate exactly halfway through the schedule, at $t = T/2$?",
              "choices": [
                "$\\eta_{\\max}$",
                "The midpoint $\\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max}-\\eta_{\\min})$",
                "$\\eta_{\\min}$",
                "Zero, regardless of $\\eta_{\\min}$"
              ],
              "answer": 1,
              "explain": "At $t=T/2$, $\\cos(\\pi/2)=0$, so $\\eta = \\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max}-\\eta_{\\min})$ — exactly the average of the two endpoints."
            },
            {
              "q": "You want to train with an effective batch size of 512 but your GPU only fits 128 examples at a time. Which modification to the canonical loop lets you achieve this, and why does it work in PyTorch?",
              "choices": [
                "Call optimizer.zero_grad() before every forward pass, since that averages the four mini-batches automatically",
                "Run four forward/backward passes accumulating gradients, and call optimizer.step() and zero_grad() only once every four mini-batches, because .grad accumulates by default",
                "Increase the learning rate by 4x and keep the loop unchanged, since a larger LR simulates a larger batch",
                "Call loss.backward(retain_graph=True) on a single batch four times to quadruple the gradient"
              ],
              "answer": 1,
              "explain": "Because PyTorch accumulates gradients into .grad rather than overwriting, you can sum gradients over four 128-example passes and step/zero only once per four, simulating a batch of 512 (gradient accumulation)."
            },
            {
              "q": "The square-root scaling rule sets $\\eta \\propto \\sqrt{B}$. What quantity does it aim to hold constant as batch size changes, and what is that quantity proportional to?",
              "choices": [
                "The number of steps per epoch, which is proportional to $N/B$",
                "The variance of the per-step weight update, which scales like $\\eta^2 / B$",
                "The total compute, which is proportional to $\\eta B$",
                "The bias of the gradient estimate, which scales like $1/\\sqrt{B}$"
              ],
              "answer": 1,
              "explain": "Square-root scaling keeps the per-step weight-update variance (which scales like $\\eta^2/B$) constant: with $\\eta \\propto \\sqrt{B}$, $\\eta^2/B$ stays fixed."
            },
            {
              "q": "Your training loss decreases smoothly and almost linearly, with no oscillation or divergence, but it is still far from converged when the epoch budget runs out. What is the most likely diagnosis and fix?",
              "choices": [
                "Learning rate is too high; decrease it",
                "Learning rate is too low; increase it (or run an LR range test to find a larger stable rate)",
                "The model is overfitting; add weight decay",
                "Gradients are not being zeroed; add zero_grad()"
              ],
              "answer": 1,
              "explain": "Smooth, glacially slow, near-linear descent with no instability is the signature of a learning rate that is too low, so you should raise it to take larger steps."
            },
            {
              "q": "Using $N = 60{,}000$, $B = 600$, $30$ epochs, warmup over the first epoch, and peak $\\eta_{\\max}=0.01$, at which global step does the learning rate first reach its peak, and what is the LR one step into the cosine phase relative to that peak?",
              "choices": [
                "At step 100, and the LR begins decreasing immediately after (just below 0.01)",
                "At step 100, and the LR jumps back to 0 because cosine restarts",
                "At step 3000, and the LR stays at 0.01 for the whole run",
                "At step 1450, and the LR is exactly 0.005 there"
              ],
              "answer": 0,
              "explain": "Steps per epoch = 60000/600 = 100, so warmup ends and the peak 0.01 is reached at step 100, after which the cosine phase starts its gentle decay just below 0.01."
            }
          ],
          "flashcards": [
            {
              "front": "What are the five operations of the canonical training loop, in order?",
              "back": "zero_grad (clear old gradients), forward (compute prediction), loss (scalar error), backward (backprop to fill .grad), step (update parameters via the optimizer)."
            },
            {
              "front": "Why must you call zero_grad each step in PyTorch?",
              "back": "PyTorch accumulates gradients into .grad by default rather than overwriting. Without zeroing, the previous batch's gradient is added to the current one, corrupting the update. (The accumulation feature enables gradient accumulation to simulate larger batches.)"
            },
            {
              "front": "State the linear scaling rule relating batch size and learning rate.",
              "back": "When you multiply the batch size by k, multiply the learning rate by k. E.g. if B=256 works at lr=0.1, then B=1024 uses lr≈0.4. Holds well in mid-training but needs warmup and saturates for very large batches."
            },
            {
              "front": "Why use warmup at the start of training?",
              "back": "At init, parameters are random and gradient/variance estimates (especially Adam's) are unreliable; with large LR (linear scaling) a full-size step can diverge. Warmup ramps LR linearly from ~0 to the peak over the first W steps so the model and optimizer stats stabilize before big steps."
            },
            {
              "front": "Cosine annealing formula and its endpoint behavior.",
              "back": "η(t) = η_min + ½(η_max − η_min)(1 + cos(πt/T)). At t=0 → η_max; at t=T → η_min; gentle decay early, steepest in the middle, flat near the end. Only requires choosing T, η_max, η_min (often η_min=0)."
            },
            {
              "front": "Loss curve: train loss keeps dropping but validation loss rises. LR problem?",
              "back": "No. That is overfitting, not a learning-rate issue — fix with regularization, more data, or early stopping. LR problems show up in the training loss itself (divergence, noisy high plateau, or glacially slow descent)."
            }
          ],
          "homework": [
            {
              "prompt": "You have $N = 1{,}200{,}000$ training examples and want to train for $10$ epochs with batch size $B = 2{,}000$. You will use a warmup-then-cosine schedule with peak LR $\\eta_{\\max} = 0.002$, warming up over the first half-epoch and cosine-decaying to $\\eta_{\\min} = 0$ thereafter. (a) Compute total steps and warmup length $W$. (b) Give the LR at the end of warmup. (c) Give the LR at the exact midpoint of the cosine phase.",
              "hint": "Steps per epoch = N/B. Warmup over half an epoch = half of one epoch's steps. The cosine phase spans (total − W) steps; its midpoint is W + (total − W)/2.",
              "solution": "Steps per epoch = 1,200,000 / 2,000 = 600. (a) Total steps = 10 × 600 = 6,000. Half an epoch = 300 steps, so W = 300. (b) At the end of warmup the LR reaches the peak: η = η_max = 0.002. (c) The cosine phase runs over total − W = 6000 − 300 = 5700 steps. Its midpoint is at τ = 2850 into the phase, where cos(π·2850/5700) = cos(π/2) = 0, so η = ½·η_max·(1+0) = ½·0.002 = 0.001."
            },
            {
              "prompt": "A team trains a model with batch size $256$ at learning rate $0.05$ and gets good convergence. They scale up to $8$ GPUs and increase the batch size to $2048$ to use them, but keep $\\eta = 0.05$. Training now converges much more slowly and underfits. Explain what went wrong and propose a concrete fix.",
              "hint": "Recall the linear scaling rule and what larger batches do to gradient noise and the number of steps per epoch.",
              "solution": "Increasing the batch size 8× (256 → 2048) without changing the LR violates the linear scaling rule. A larger batch gives a lower-variance gradient but also means 8× fewer steps per epoch — so far fewer parameter updates. With the same small step size of 0.05, the model makes too little total progress and underfits. Fix: apply the linear scaling rule, raising the LR roughly 8× to η ≈ 0.4, and add a warmup phase (a few hundred steps) because the now-large LR could cause instability at the start. If still unstable, fall back to square-root scaling (η ≈ 0.05·√8 ≈ 0.14) which is gentler. This restores per-update progress to compensate for the reduced number of steps."
            },
            {
              "prompt": "You run an LR range test: starting from a tiny learning rate, you increase it exponentially each step over 300 steps and record the training loss. The loss is flat-then-slightly-decreasing for small LR, reaches its lowest, smoothest descent around $\\eta \\approx 3\\times 10^{-3}$, then becomes ragged near $\\eta \\approx 10^{-2}$ and shoots upward past $\\eta \\approx 3\\times 10^{-2}$. What peak learning rate should you choose for actual training, and why not simply pick the value where the loss is lowest?",
              "hint": "The goal is the largest stable stride, not the point of minimum loss during the test. Think about what happens just before the loss explodes.",
              "solution": "Choose a peak LR a bit below where the loss starts to rise sharply — here, around η ≈ 3×10⁻³ to 5×10⁻³ (roughly an order of magnitude below the ~3×10⁻² blow-up point, and at/just under the region of steepest stable descent). You do NOT pick the LR where the loss is numerically lowest during the test, because (1) the loss at any step in the test reflects accumulated progress from all prior (smaller) LRs, not the steady-state behavior of that LR, and (2) the lowest-loss point often sits dangerously close to the divergence threshold — using it risks instability once training runs for many steps. The range test identifies the largest LR that still produces smooth, fast descent, which you then use as η_max in a warmup+cosine schedule."
            }
          ]
        }
      ]
    },
    {
      "id": "dl-generalization-and-regularization",
      "title": "Generalization: Regularization and Stable Training",
      "lessons": [
        {
          "id": "dl-overfitting-and-regularization",
          "title": "Overfitting, Underfitting, and Regularization",
          "minutes": 14,
          "content": "<h3>The central tension: fitting the data vs. fitting the world</h3>\n<p>Every supervised learning problem hides a quiet trap. You have a finite dataset, and your real goal is not to memorize it — it is to perform well on data you have never seen. The gap between these two ambitions is the whole story of generalization. A model that learns the dataset <em>too</em> faithfully ends up learning its quirks, noise, and accidents; a model that learns it too lazily never captures the real structure at all. These two failure modes are <strong>overfitting</strong> and <strong>underfitting</strong>, and almost every regularization technique you will ever use is a tool for steering between them.</p>\n\n<p>Formally, we want to minimize the <strong>expected risk</strong> over the true data distribution $\\mathcal{D}$,</p>\n$$R(f) = \\mathbb{E}_{(x,y)\\sim\\mathcal{D}}\\big[\\ell(f(x), y)\\big],$$\n<p>but we can only ever measure the <strong>empirical risk</strong> on our training sample,</p>\n$$\\hat{R}(f) = \\frac{1}{n}\\sum_{i=1}^{n}\\ell(f(x_i), y_i).$$\n<p>Training drives down $\\hat{R}$. Generalization is about whether $R$ comes down with it. The difference $R(f) - \\hat{R}(f)$ is the <strong>generalization gap</strong>, and overfitting is precisely the situation where this gap grows large.</p>\n\n<h3>Diagnosing from the learning curves</h3>\n<p>The single most useful diagnostic tool in practice is the pair of curves you get by plotting <strong>training loss</strong> and <strong>validation loss</strong> as functions of training progress (epochs) or model capacity. Learn to read them like an X-ray.</p>\n\n<h4>Underfitting (high bias)</h4>\n<ul>\n<li><strong>Symptom:</strong> training loss is high <em>and</em> validation loss is high; the two curves sit close together near a high plateau.</li>\n<li><strong>Meaning:</strong> the model cannot even fit the data it has seen. Its hypothesis class is too restricted, or it has not trained long enough, or the features are inadequate.</li>\n<li><strong>Prescription:</strong> <em>increase</em> effective capacity — a bigger/deeper model, richer features, training longer, a higher learning rate, and crucially <em>less</em> regularization.</li>\n</ul>\n\n<h4>Overfitting (high variance)</h4>\n<ul>\n<li><strong>Symptom:</strong> training loss is low and still falling, but validation loss is high and — the tell-tale sign — has started to <em>rise</em> while training loss keeps dropping. A large, widening gap between the curves.</li>\n<li><strong>Meaning:</strong> the model has enough capacity to memorize idiosyncrasies of the training set that do not generalize.</li>\n<li><strong>Prescription:</strong> <em>decrease</em> effective capacity — more regularization (L2/L1), early stopping, dropout, data augmentation, or simply more data.</li>\n</ul>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The two questions decouple cleanly. <strong>Is training loss low?</strong> answers \"can the model fit at all?\" (bias). <strong>Is the train–val gap small?</strong> answers \"does the fit generalize?\" (variance). Diagnose bias first: if you cannot fit the training set, no regularization will save you — you need more capacity, not less.</p></div>\n\n<p>This is the classic <strong>bias–variance tradeoff</strong>. For squared-error regression the expected test error of a learned predictor at a point decomposes as</p>\n$$\\mathbb{E}\\big[(y - \\hat{f}(x))^2\\big] = \\underbrace{\\big(\\mathbb{E}[\\hat{f}(x)] - f^*(x)\\big)^2}_{\\text{bias}^2} + \\underbrace{\\operatorname{Var}\\big[\\hat{f}(x)\\big]}_{\\text{variance}} + \\underbrace{\\sigma^2}_{\\text{irreducible noise}}.$$\n<p>where $f^*$ is the true function and the expectation is over random draws of the training set. Underfitting lives in the bias term; overfitting lives in the variance term. The irreducible noise $\\sigma^2$ is the floor no model can beat. Regularization is the art of trading a little extra bias for a large reduction in variance.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>In modern deep learning the textbook U-shaped test-error curve is not the whole story. Very large overparameterized networks can drive training error to zero and <em>still</em> generalize, producing a \"double descent\" curve where test error falls again past the interpolation point. This does not refute the bias–variance view — it tells us that capacity is subtle, and that implicit regularization (from SGD, architecture, and initialization) matters as much as explicit penalties. The mental model \"regularization constrains effective capacity\" remains the right lens.</p></div>\n\n<h3>The unifying idea: every regularizer shrinks effective capacity</h3>\n<p>It is tempting to memorize four unrelated tricks. Resist that. The deeper truth is that L2, L1, early stopping, and data augmentation are all ways of <strong>reducing the set of functions the model can effectively express</strong>, or equivalently of injecting a <em>prior</em> that prefers simpler explanations. Once you see them this way, choosing one is a matter of which kind of simplicity you believe in.</p>\n\n<h3>L2 regularization (weight decay)</h3>\n<p>Add a penalty proportional to the squared Euclidean norm of the weights to the loss:</p>\n$$\\tilde{J}(\\theta) = J(\\theta) + \\frac{\\lambda}{2}\\,\\lVert\\theta\\rVert_2^2 = J(\\theta) + \\frac{\\lambda}{2}\\sum_j \\theta_j^2.$$\n<p>The hyperparameter $\\lambda \\ge 0$ sets the strength. The gradient picks up a term $\\lambda\\theta$, so a plain gradient-descent step becomes</p>\n$$\\theta \\leftarrow \\theta - \\eta\\big(\\nabla J(\\theta) + \\lambda\\theta\\big) = (1-\\eta\\lambda)\\,\\theta - \\eta\\,\\nabla J(\\theta).$$\n<p>Notice the factor $(1-\\eta\\lambda)$: at every step the weights are multiplicatively <strong>shrunk toward zero</strong> before the gradient update is applied. That is exactly why L2 is called <strong>weight decay</strong>. Smaller weights mean a smoother, lower-curvature function that is less able to chase individual noisy points — capacity reduced.</p>\n\n<h4>What L2 actually does to the solution</h4>\n<p>For a quadratic loss with Hessian $H$ (eigenvalues $\\alpha_i$), L2 rescales each eigen-direction of the optimum by $\\frac{\\alpha_i}{\\alpha_i + \\lambda}$. Directions in which the loss is <em>flat</em> (small $\\alpha_i$, the data does not strongly constrain them) are shrunk hard toward zero; directions in which the loss is sharply curved (large $\\alpha_i$, well-determined by data) are barely touched. L2 thus suppresses parameters the data is indifferent to — a precise statement of \"use only the structure the data supports.\" Probabilistically, L2 is exactly the <strong>MAP estimate under a Gaussian prior</strong> $\\theta \\sim \\mathcal{N}(0, \\tau^2 I)$ with $\\lambda = \\sigma^2/\\tau^2$.</p>\n\n<h3>L1 regularization (sparsity)</h3>\n<p>Use the L1 norm instead:</p>\n$$\\tilde{J}(\\theta) = J(\\theta) + \\lambda\\,\\lVert\\theta\\rVert_1 = J(\\theta) + \\lambda\\sum_j |\\theta_j|.$$\n<p>The gradient contribution is $\\lambda\\,\\operatorname{sign}(\\theta_j)$ — a <em>constant-magnitude</em> push toward zero regardless of how small $\\theta_j$ is. (At $\\theta_j=0$ it is non-differentiable; in practice subgradients or proximal/soft-thresholding updates handle this.) That constant push is the crux: it can drive weights <strong>exactly to zero</strong> and keep them there, producing a genuinely <strong>sparse</strong> solution. L1 corresponds to a <strong>Laplace prior</strong> on the weights.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">L1 vs L2 — the one thing to remember</div><p><strong>L1 zeros weights out; L2 shrinks them down.</strong> L1's penalty has a constant gradient near zero, so it overcomes the tiny gradient of a small weight and snaps it to exactly $0$ — built-in feature selection. L2's penalty gradient $\\lambda\\theta$ vanishes as $\\theta\\to 0$, so it shrinks weights smoothly but almost never to exact zero. Geometrically, the L1 constraint region is a diamond whose corners lie on the axes, so the loss contour first touches it at a corner (a sparse point); the L2 ball is round, so contact is generically off-axis.</p></div>\n\n<h3>Early stopping</h3>\n<p>Track validation loss during training and <strong>halt at the epoch where validation loss is lowest</strong>, before it begins to rise. You keep the weights from that best epoch (often via a \"patience\" counter that stops after several non-improving epochs). This is the cheapest, most universally used regularizer — it requires no change to the loss and gives you the model precisely at the moment its generalization gap is smallest.</p>\n\n<p>Why does limiting the <em>number of steps</em> act like a capacity constraint? Because gradient descent explores the parameter space gradually. Starting from small initial weights, the optimizer first moves along the high-curvature, well-determined directions (large $\\alpha_i$) and only later in training does it have time to fit the flat, noisy directions. Stopping early prevents it from reaching those overfitting directions. In fact, for a quadratic loss one can show early stopping after $t$ steps is <strong>equivalent to L2 regularization</strong> with an effective $\\lambda \\approx \\frac{1}{\\eta t}$: training longer $\\leftrightarrow$ smaller $\\lambda$ $\\leftrightarrow$ more capacity. This equivalence is the single best argument that early stopping is \"really\" a capacity control, not a hack.</p>\n\n<h3>Data augmentation</h3>\n<p>Instead of constraining the model, enlarge and diversify the data: apply label-preserving transformations to training examples — random crops, flips, rotations, color jitter, and additive noise for images; synonym swaps, back-translation, and token masking for text; small jitter for tabular/sensor data. Each transformation encodes a known <strong>invariance</strong> (\"a flipped cat is still a cat\"), so the model is forced to learn features robust to those nuisances rather than memorizing pixel-exact training images.</p>\n<p>Augmentation reduces effective capacity by a different mechanism: it shrinks the <em>variance</em> term by giving the model many slightly different views, so no single noisy artifact can be latched onto, and it effectively increases $n$ in the generalization gap. Adding small input noise is itself provably related to an L2 penalty on the weights, closing the loop back to weight decay. The catch: augmentations must be <strong>label-preserving</strong> — flipping a \"6\" into a \"9\" or horizontally flipping text injects label noise and hurts.</p>\n\n<h3>Worked example: prescribing a fix from a learning curve</h3>\n<p>Suppose you train a deep image classifier and log this (representative) trajectory:</p>\n<pre><code>epoch   train_loss   val_loss\n  1        1.92        1.95\n  5        0.71        0.80\n 10        0.34        0.55\n 20        0.09        0.61\n 40        0.01        0.88   &lt;- val rising while train -&gt; 0</code></pre>\n<p><strong>Step 1 — diagnose bias.</strong> Is training loss low? Yes, it reaches $0.01$ (near zero). So the model has ample capacity to fit; this is <em>not</em> underfitting.</p>\n<p><strong>Step 2 — diagnose variance.</strong> Does the gap widen? Yes: validation loss bottoms out near epoch 10 ($0.55$) and then <em>rises</em> to $0.88$ while training loss keeps falling to $0.01$. The widening, the rising val curve, and the near-zero train loss together are the textbook signature of <strong>overfitting (high variance)</strong>.</p>\n<p><strong>Step 3 — prescribe.</strong> We must reduce effective capacity. A sensible ordered plan:</p>\n<ol>\n<li><strong>Early stopping</strong> — free and immediate: roll back to the epoch-10 checkpoint where val loss was minimal ($0.55$). This alone recovers the best generalizing model you already trained.</li>\n<li><strong>Add L2 / weight decay</strong> (e.g. $\\lambda = 10^{-4}$ to $10^{-3}$) and/or dropout to flatten the function and shrink the gap going forward.</li>\n<li><strong>Data augmentation</strong> — for images this is often the highest-leverage fix, since it attacks variance at the source and is essentially free data.</li>\n<li><strong>Get more data</strong> if feasible; failing that, consider a smaller model.</li>\n</ol>\n<p><strong>What would be wrong here:</strong> increasing model size, training longer, or removing regularization. Each of those <em>raises</em> capacity and would widen the gap further — those are cures for underfitting, and applying them to an overfitting curve makes things strictly worse. The discipline is: <em>read the curve first, then pick the lever whose direction matches the diagnosis.</em></p>\n\n<div class=\"callout\"><div class=\"c-tag\">Practitioner's checklist</div><p>Train loss high → underfit → add capacity, train longer, reduce $\\lambda$. Train loss low but val loss high and rising → overfit → early-stop, add L2/dropout, augment, get more data. Both low and close → you are in a good place; now try carefully raising capacity to push the frontier. Always tune $\\lambda$ and the stopping point on a <em>validation</em> set, never the test set.</p></div>\n\n<h3>How these connect across ML</h3>\n<p>The same logic generalizes far beyond neural nets. Ridge regression <em>is</em> L2 on linear weights; the Lasso <em>is</em> L1 and is the workhorse of sparse high-dimensional statistics and feature selection. Decision-tree pruning and limiting tree depth are capacity constraints. Bayesian priors formalize all of this: choosing a prior <em>is</em> choosing a regularizer, and the strength $\\lambda$ encodes how strongly you believe the prior over the data. Whatever the model family, the discipline is identical — measure the generalization gap, decide whether you are bias- or variance-limited, and move the capacity dial in the direction the diagnosis demands.</p>",
          "mcq": [
            {
              "q": "A model's learning curves show training loss plateauing at $0.9$ and validation loss also around $0.95$, with both curves flat and close together. What is the best next step?",
              "choices": [
                "Add stronger L2 regularization and dropout",
                "Increase model capacity / train longer / reduce regularization",
                "Apply early stopping at the current epoch",
                "Collect a much larger validation set"
              ],
              "answer": 1,
              "explain": "High training loss with a small gap is underfitting (high bias). The fix is to increase effective capacity; regularization or early stopping would only make the fit worse."
            },
            {
              "q": "Why does L1 regularization tend to produce exactly-zero weights while L2 does not?",
              "choices": [
                "L1's penalty gradient is constant in magnitude ($\\lambda\\,\\text{sign}(\\theta)$) so it pushes small weights all the way to zero, whereas L2's gradient $\\lambda\\theta$ vanishes as $\\theta\\to 0$",
                "L1 uses a larger $\\lambda$ by definition, which forces weights to zero",
                "L2 is non-differentiable at zero so optimizers avoid that point",
                "L1 is computed only on the largest weights, leaving the rest untouched"
              ],
              "answer": 0,
              "explain": "Near zero, L1 keeps a constant pull toward the origin (overcoming a small weight's gradient), giving sparsity; L2's pull shrinks proportionally to the weight and fades to nothing, so it shrinks but rarely zeroes."
            },
            {
              "q": "Validation loss reaches its minimum at epoch 12 and then steadily rises through epoch 50, while training loss continues to fall toward zero. Which interpretation and action are correct?",
              "choices": [
                "Underfitting; train for many more epochs",
                "Overfitting; keep the epoch-12 checkpoint (early stopping) and add regularization/augmentation",
                "The learning rate is too low; increase it and remove weight decay",
                "Irreducible noise dominates; nothing can be done"
              ],
              "answer": 1,
              "explain": "Rising validation loss with falling training loss is the signature of overfitting; early stopping recovers the best-generalizing model and further regularization or augmentation reduces the gap going forward."
            },
            {
              "q": "Which statement about the relationship between early stopping and L2 regularization is correct (for an approximately quadratic loss)?",
              "choices": [
                "They are unrelated; early stopping changes the data while L2 changes the loss",
                "Stopping after $t$ steps behaves like L2 with effective $\\lambda \\approx 1/(\\eta t)$, so training longer corresponds to weaker regularization",
                "Early stopping always corresponds to a much larger $\\lambda$ than any practical L2 setting",
                "Early stopping increases effective capacity the longer you wait, equivalent to increasing $\\lambda$"
              ],
              "answer": 1,
              "explain": "For quadratic losses, early stopping after $t$ gradient steps approximates L2 with $\\lambda \\approx 1/(\\eta t)$; more steps means a smaller effective $\\lambda$ and thus more effective capacity."
            },
            {
              "q": "In the squared-error decomposition $\\mathbb{E}[(y-\\hat{f}(x))^2] = \\text{bias}^2 + \\text{variance} + \\sigma^2$, what does the term $\\sigma^2$ represent, and what is its practical implication?",
              "choices": [
                "The variance of the learned predictor across training sets; it can be driven to zero with enough regularization",
                "The squared bias from too small a hypothesis class; it shrinks as you add capacity",
                "Irreducible noise in the data itself; it is a floor on test error that no model can beat",
                "The contribution of weight decay to the loss; it is removed once $\\lambda = 0$"
              ],
              "answer": 2,
              "explain": "$\\sigma^2$ is the irreducible noise inherent in the data, so it sets a lower bound on achievable test error regardless of model choice or regularization."
            },
            {
              "q": "For a quadratic loss with Hessian eigenvalues $\\alpha_i$, L2 regularization rescales each eigen-direction of the optimum by $\\frac{\\alpha_i}{\\alpha_i + \\lambda}$. Which directions get shrunk most aggressively toward zero?",
              "choices": [
                "Flat directions with small $\\alpha_i$, which the data only weakly constrains",
                "Sharply curved directions with large $\\alpha_i$, which the data strongly determines",
                "All directions equally, since $\\lambda$ is a single scalar",
                "Only directions where the gradient is exactly zero"
              ],
              "answer": 0,
              "explain": "When $\\alpha_i$ is small the factor $\\frac{\\alpha_i}{\\alpha_i+\\lambda}$ is near zero, so flat, weakly-constrained directions are suppressed hard while well-determined large-$\\alpha_i$ directions (factor near 1) are barely touched."
            },
            {
              "q": "A practitioner adds aggressive augmentation to an image classifier by randomly flipping digits horizontally (left-right mirror) on an MNIST-style task. Why might this hurt rather than help?",
              "choices": [
                "Flipping increases the effective dataset size $n$, which always raises the generalization gap",
                "Horizontal flips are not label-preserving here (e.g. a mirrored '2' or '3' is no longer a valid digit of that class), so they inject label noise",
                "Augmentation only reduces bias, and this task is variance-limited",
                "Flips force the model to memorize pixel-exact images, defeating regularization"
              ],
              "answer": 1,
              "explain": "Augmentations must encode genuine invariances; digits are not left-right symmetric, so a horizontal flip changes or destroys the true label (a mirrored '2'/'3'/'7' is not that digit), adding label noise instead of useful diversity and degrading performance."
            },
            {
              "q": "The lesson notes that very large overparameterized networks can drive training error to zero and still generalize well, producing a 'double descent' curve. What is the correct takeaway?",
              "choices": [
                "The bias-variance tradeoff is wrong and capacity no longer matters in deep learning",
                "Test error always decreases monotonically as capacity grows past the interpolation point",
                "It refines, but does not refute, the capacity view: implicit regularization from SGD, architecture, and initialization also shapes effective capacity",
                "Explicit regularizers like L2 and dropout become harmful once a model can interpolate the data"
              ],
              "answer": 2,
              "explain": "Double descent shows capacity is subtle and that implicit regularization matters too, but the mental model that regularization constrains effective capacity remains the right lens."
            }
          ],
          "flashcards": [
            {
              "front": "Learning-curve signature of overfitting vs. underfitting?",
              "back": "Underfitting: train loss high AND val loss high, curves close (high bias). Overfitting: train loss low/falling but val loss high and rising — wide, growing gap (high variance)."
            },
            {
              "front": "L1 vs L2: what does each do to the weights, and why?",
              "back": "L2 (weight decay) shrinks weights smoothly toward zero but rarely to exactly zero (gradient $\\lambda\\theta$ fades near 0). L1 drives weights exactly to zero, producing sparsity (constant-magnitude gradient $\\lambda\\,\\text{sign}(\\theta)$). L2 = Gaussian prior; L1 = Laplace prior."
            },
            {
              "front": "Why is L2 called 'weight decay'?",
              "back": "Its gradient adds $\\lambda\\theta$, so a GD step becomes $\\theta\\leftarrow(1-\\eta\\lambda)\\theta-\\eta\\nabla J$. The factor $(1-\\eta\\lambda)<1$ multiplicatively shrinks (decays) every weight each step before the gradient update."
            },
            {
              "front": "What is early stopping and why does it regularize?",
              "back": "Halt training at the epoch with minimum validation loss (keep that checkpoint). It limits how far GD explores parameter space — for quadratic loss it approximates L2 with $\\lambda\\approx 1/(\\eta t)$ — so fewer steps = lower effective capacity."
            },
            {
              "front": "What does data augmentation do and what is the key constraint?",
              "back": "Applies label-preserving transforms (flips, crops, noise, back-translation) to encode invariances, reducing variance and effectively increasing $n$. Constraint: transforms must preserve the label (don't flip '6'→'9')."
            },
            {
              "front": "Bias–variance decomposition of squared test error?",
              "back": "$\\mathbb{E}[(y-\\hat f)^2] = \\text{bias}^2 + \\text{variance} + \\sigma^2$. Underfitting = high bias; overfitting = high variance; $\\sigma^2$ is irreducible noise. Regularization trades a little bias for a large drop in variance."
            }
          ],
          "homework": [
            {
              "prompt": "Show explicitly that an L2-regularized gradient-descent step with learning rate $\\eta$ and penalty strength $\\lambda$ multiplicatively shrinks the weights, and state what happens as $\\eta\\lambda \\to 1$ and as $\\eta\\lambda > 1$.",
              "hint": "Start from $\\tilde J(\\theta)=J(\\theta)+\\tfrac{\\lambda}{2}\\lVert\\theta\\rVert_2^2$, take its gradient, and write out one GD update, grouping the $\\theta$ terms.",
              "solution": "The regularized objective is $\\tilde J(\\theta)=J(\\theta)+\\tfrac{\\lambda}{2}\\lVert\\theta\\rVert_2^2$, so $\\nabla\\tilde J(\\theta)=\\nabla J(\\theta)+\\lambda\\theta$. One gradient-descent step: $\\theta\\leftarrow\\theta-\\eta\\nabla\\tilde J(\\theta)=\\theta-\\eta(\\nabla J(\\theta)+\\lambda\\theta)=(1-\\eta\\lambda)\\theta-\\eta\\nabla J(\\theta)$. The coefficient $(1-\\eta\\lambda)$ multiplies the current weights: for $0<\\eta\\lambda<1$ it lies in $(0,1)$, so the weights are shrunk toward zero each step (hence 'weight decay'). As $\\eta\\lambda\\to 1$, the multiplicative factor $\\to 0$, so each step essentially discards the previous weights, applying only the (negative) gradient — extreme shrinkage. If $\\eta\\lambda>1$, the factor is negative (and once $\\eta\\lambda>2$ also has magnitude $|1-\\eta\\lambda|>1$), causing the weights to oscillate in sign and potentially diverge — the regularization is so aggressive relative to the step size that optimization becomes unstable. This shows why $\\eta\\lambda$ should be kept comfortably below 1."
            },
            {
              "prompt": "You train two models on the same dataset. Model A: train loss $0.05$, val loss $0.07$. Model B: train loss $0.001$, val loss $0.40$. (a) Diagnose each. (b) Which single change would you try first for Model B, and which changes would be counterproductive? (c) If you instead observed train loss $0.45$ and val loss $0.47$, what would you do?",
              "hint": "Compute the gap and check whether train loss is low for each case; map 'low train + big gap' to overfit and 'high train' to underfit, then pick levers whose direction matches.",
              "solution": "(a) Model A: train loss low and gap small ($0.07-0.05=0.02$) — a healthy, well-generalizing fit. Model B: train loss extremely low ($0.001$) but a large gap ($0.40-0.001\\approx0.40$) and high val loss — classic overfitting (high variance). (b) First try early stopping (roll back to the epoch with minimum val loss) since it is free; then add L2/dropout and especially data augmentation; getting more data also helps. Counterproductive changes are anything that raises capacity: enlarging the model, training longer, raising the learning rate to fit harder, or removing existing regularization — all widen the gap. (c) Train loss $0.45$ with a tiny gap ($0.02$) is underfitting (high bias): the model cannot fit even the training set. Increase effective capacity — use a larger/deeper model, better features, train longer, and reduce regularization. Regularizing or early-stopping here would only hurt."
            },
            {
              "prompt": "Explain the claim 'early stopping after $t$ gradient-descent steps is approximately equivalent to L2 regularization with $\\lambda\\approx 1/(\\eta t)$' at an intuitive level, and use it to predict: if you double the number of training epochs $t$, does the effective regularization get stronger or weaker, and does that correspond to more or less effective model capacity?",
              "hint": "Think about which directions in parameter space gradient descent moves along first (well-determined vs. flat), and how $\\lambda$ relates to capacity.",
              "solution": "Starting from small initial weights, gradient descent on a (locally) quadratic loss moves fastest along the high-curvature directions (large Hessian eigenvalues), which are the parameter combinations the data strongly constrains; it makes progress along flat, weakly-determined directions only slowly, over many steps. Those flat directions are exactly where overfitting to noise happens. Stopping at step $t$ therefore lets the well-determined directions converge while leaving the flat, noisy directions still near their small initial values — the same selective suppression that L2 achieves by shrinking low-curvature directions. Matching the math gives an effective strength $\\lambda\\approx 1/(\\eta t)$. Prediction: doubling $t$ halves the effective $\\lambda$, so the regularization gets WEAKER. A smaller $\\lambda$ means LESS constraint, i.e. MORE effective capacity — consistent with the fact that training longer lets the model fit more (and eventually overfit). So the 'capacity dial' here is the number of steps: more steps = more capacity = weaker effective L2."
            }
          ]
        },
        {
          "id": "dl-dropout-and-normalization",
          "title": "Dropout and Batch/Layer Normalization",
          "minutes": 14,
          "content": "<h3>The Problem: Big Models Memorize, and Deep Nets Are Hard to Optimize</h3>\n<p>By this point in the module you know the core tension of generalization: a model with enough capacity will fit not just the signal in your training data but also its noise. Classical regularizers like $L_2$ weight decay attack this by shrinking parameters. In this lesson we study two ideas that are arguably <em>the</em> two most important architectural tools in modern deep learning for stable training and generalization: <strong>dropout</strong> and <strong>normalization layers</strong> (batch norm and layer norm).</p>\n<p>They solve two distinct problems. Dropout is a <strong>regularizer</strong> — it fights overfitting by preventing the network from relying on fragile co-adaptations of features. Normalization layers are primarily an <strong>optimization aid</strong> — they make the loss landscape friendlier so you can train deeper networks faster and with larger learning rates (though they also have a mild regularizing side effect). The thread that ties them together, and the thing you must understand to use them correctly, is that <strong>both behave differently at training time than at test time</strong>. Getting that train/eval distinction wrong is one of the most common and most silent bugs in practice.</p>\n\n<h3>Dropout: Training a Massive Ensemble for the Price of One Network</h3>\n<h4>The mechanism</h4>\n<p>Dropout, introduced by Srivastava, Hinton and colleagues in 2014, is almost embarrassingly simple. During training, for each forward pass, you independently set each unit (neuron activation) to zero with probability $p$, the <em>drop probability</em>. Each unit is kept with probability $q = 1 - p$. Concretely, for a layer's activation vector $\\mathbf{h} \\in \\mathbb{R}^d$, you sample a mask $\\mathbf{m}$ where each $m_i \\sim \\text{Bernoulli}(q)$ independently, and compute</p>\n$$\\tilde{\\mathbf{h}} = \\mathbf{m} \\odot \\mathbf{h},$$\n<p>where $\\odot$ is elementwise multiplication. The masked activations flow forward; gradients flow back only through the units that survived. A fresh mask is drawn on every minibatch, so over the course of training each unit is sometimes present and sometimes absent.</p>\n\n<h4>Why scaling is necessary: matching the expectation</h4>\n<p>At test time we want a single, deterministic prediction — randomly zeroing units would be absurd in production. So we turn dropout off and use all units. But there is a subtlety: a unit downstream of the dropout layer was, during training, receiving input from only a fraction $q$ of the units on average. If we suddenly feed it all the units at test time, its total input is roughly $1/q$ times larger than what it saw during training. The activation statistics shift, and the network breaks.</p>\n<p>The fix is to keep the <strong>expected value of each activation constant</strong> between train and test. There are two equivalent conventions:</p>\n<ul>\n<li><strong>Test-time scaling (original formulation):</strong> at test time multiply activations by $q$, so $\\mathbb{E}$ matches. Since a kept unit at train time contributes $h_i$ and a dropped one contributes $0$, we have $\\mathbb{E}[\\tilde h_i] = q \\cdot h_i$. Multiplying the full activation by $q$ at test time reproduces that.</li>\n<li><strong>Inverted dropout (what every framework actually does):</strong> divide the surviving activations by $q$ <em>at training time</em>, so the training-time expectation already equals the raw activation $h_i$. Then test time needs no rescaling at all — you just remove the mask.</li>\n</ul>\n<p>Inverted dropout is preferred because it keeps inference code clean and fast (no extra multiply), and it makes the test-time graph identical to a network with no dropout. The training-time operation is:</p>\n$$\\tilde{\\mathbf{h}} = \\frac{1}{q}\\,\\mathbf{m} \\odot \\mathbf{h}, \\qquad \\mathbb{E}[\\tilde h_i] = \\frac{1}{q}\\,\\mathbb{E}[m_i]\\,h_i = \\frac{1}{q}\\cdot q \\cdot h_i = h_i.$$\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of dropout as forcing the network to be robust to missing teammates. No single feature can become indispensable, because on any given pass it might vanish. The network is pushed to spread useful information across many redundant pathways — exactly the kind of distributed, non-fragile representation that generalizes.</p></div>\n\n<h4>The deeper view: implicit ensembling</h4>\n<p>Here is the beautiful interpretation. A network with $n$ droppable units defines $2^n$ possible sub-networks (each unit in or out). Training with dropout is like training this exponential family of sub-networks simultaneously, with massive weight sharing — every sub-network reuses the same underlying parameters. Each minibatch trains one randomly sampled sub-network.</p>\n<p>At test time, instead of averaging the predictions of all $2^n$ sub-networks (intractable), the scaled full network computes an efficient <em>approximation</em> to that ensemble average. For a single linear layer followed by a softmax this approximation is provably the geometric mean of the sub-network predictions; for deep nonlinear nets it is a heuristic, but an extraordinarily effective one. This connects dropout directly to <strong>ensemble methods</strong> like bagging — which you know reduce variance — except dropout gets the variance-reduction benefit essentially for free, without training and storing many models.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Dropout is a bridge between three ideas you have already met: it is a <em>regularizer</em> (penalizes co-adaptation), an <em>ensemble</em> (averages exponentially many sub-models), and — under a Gaussian approximation — a form of approximate <em>Bayesian inference</em> over the weights. The 2016 \"Dropout as a Bayesian Approximation\" result by Gal and Ghahramani showed that keeping dropout <em>on</em> at test time and averaging many stochastic forward passes (\"Monte Carlo dropout\") gives a usable estimate of model uncertainty — a cheap trick for uncertainty quantification.</p></div>\n\n<h4>Practical notes</h4>\n<ul>\n<li>Typical drop rates: $p \\approx 0.5$ for large fully-connected layers, $p \\approx 0.1$–$0.3$ for convolutional or embedding layers (conv layers already have spatial parameter sharing, so they need less).</li>\n<li>Place dropout <strong>after</strong> the activation, on the hidden representations you want to regularize — usually not on the input directly (or with a small rate if so).</li>\n<li>Dropout slows convergence (you are training a noisier objective), so it often needs more epochs.</li>\n<li>In modern transformer architectures dropout is still used, but often at low rates, and large-data regimes lean more on scale and other regularizers.</li>\n</ul>\n\n<h3>Batch Normalization: Stabilizing the Distribution of Activations</h3>\n<h4>The motivation</h4>\n<p>As a deep network trains, the parameters of every layer change. This means the distribution of inputs to any given layer keeps shifting throughout training — the authors Ioffe and Szegedy (2015) called this <strong>internal covariate shift</strong>. Each layer is forced to constantly re-adapt to a moving target, which slows learning and forces small learning rates to stay stable.</p>\n<p>BatchNorm's idea: explicitly normalize the inputs to a layer so they have a controlled, roughly-fixed distribution (zero mean, unit variance) — but do it as a differentiable operation inside the network, computed using statistics of the current minibatch.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>Honesty about the science: later work (Santurkar et al., 2018, \"How Does Batch Normalization Help Optimization?\") presented evidence that the internal-covariate-shift story is <em>not</em> the real mechanism. BatchNorm's true benefit appears to be that it <strong>smooths the loss landscape</strong> — it makes the gradients more predictable and Lipschitz, which is why you can use much larger learning rates and train faster. \"Internal covariate shift\" remains the standard historical motivation and a useful first-pass intuition, but you should know it is contested. The empirical value of BatchNorm is not in doubt.</p></div>\n\n<h4>The formula</h4>\n<p>Consider a single feature (one neuron/channel) across a minibatch of $m$ examples, with values $x_1, \\dots, x_m$. BatchNorm computes:</p>\n$$\\mu_B = \\frac{1}{m}\\sum_{i=1}^{m} x_i, \\qquad \\sigma_B^2 = \\frac{1}{m}\\sum_{i=1}^{m} (x_i - \\mu_B)^2,$$\n$$\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\qquad y_i = \\gamma\\,\\hat{x}_i + \\beta.$$\n<p>The small constant $\\epsilon$ (e.g. $10^{-5}$) prevents division by zero. After normalizing to zero mean and unit variance, we apply a learned <strong>scale</strong> $\\gamma$ and <strong>shift</strong> $\\beta$ — one pair per feature, trained by backprop like any other parameter.</p>\n<p>Why $\\gamma$ and $\\beta$? Forcing every layer's pre-activations to be exactly zero-mean/unit-variance could destroy useful information. For example, feeding a sigmoid only values in $[-1, 1]$ confines it to its near-linear regime. The learnable $\\gamma, \\beta$ let the network <em>undo</em> the normalization if it wants — in the extreme, setting $\\gamma = \\sqrt{\\sigma_B^2 + \\epsilon}$ and $\\beta = \\mu_B$ recovers the original activations. So BatchNorm never reduces representational power; it only changes the optimization geometry while giving the net the freedom to choose its preferred scale and mean.</p>\n\n<h4>Train vs. eval mode — the critical distinction</h4>\n<p>During training, $\\mu_B$ and $\\sigma_B^2$ come from the current minibatch. But at test time you may want to predict on a <em>single</em> example, where a \"batch statistic\" is meaningless (and you do not want your prediction for one input to depend on which other inputs happen to share its batch). So BatchNorm maintains <strong>running averages</strong> of the mean and variance during training:</p>\n$$\\mu_{\\text{run}} \\leftarrow (1-\\alpha)\\,\\mu_{\\text{run}} + \\alpha\\,\\mu_B, \\qquad \\sigma^2_{\\text{run}} \\leftarrow (1-\\alpha)\\,\\sigma^2_{\\text{run}} + \\alpha\\,\\sigma_B^2,$$\n<p>with momentum $\\alpha$ (often $0.1$). At eval time it uses these fixed running statistics instead of batch statistics. This is exactly why you must call <code>model.eval()</code> (PyTorch) or pass <code>training=False</code> (Keras): forgetting it makes the model use batch stats at inference, so predictions fluctuate with batch composition and degrade badly on batch size 1.</p>\n\n<h4>Where it goes, and gotchas</h4>\n<ul>\n<li>Placed between the linear/conv transform and the nonlinearity is the classic recipe: $\\text{Linear} \\rightarrow \\text{BN} \\rightarrow \\text{ReLU}$. (Some later work prefers BN after the activation; the canonical original placement is before.)</li>\n<li>BatchNorm makes a layer's bias term redundant — the $\\beta$ shift absorbs it — so the preceding linear layer is usually configured with <code>bias=False</code>.</li>\n<li>It works poorly with very small batches (noisy statistics) and is awkward for variable-length sequences — which motivates layer norm below.</li>\n<li>It has a regularizing side effect: the batch-dependent noise in $\\mu_B, \\sigma_B^2$ acts a bit like dropout's stochasticity, which is one reason BN networks sometimes need less explicit regularization.</li>\n</ul>\n\n<h4>A fully worked example</h4>\n<p>Take one feature across a minibatch of $m = 4$ examples with values $x = [2, 4, 6, 8]$, and use $\\epsilon \\approx 0$ for clarity. Suppose the learned parameters are $\\gamma = 3$ and $\\beta = 1$.</p>\n<p><strong>Step 1 — mean:</strong> $\\mu_B = (2+4+6+8)/4 = 5$.</p>\n<p><strong>Step 2 — variance:</strong> deviations are $[-3, -1, 1, 3]$, squared $[9, 1, 1, 9]$, so $\\sigma_B^2 = (9+1+1+9)/4 = 5$, giving $\\sigma_B = \\sqrt{5} \\approx 2.236$.</p>\n<p><strong>Step 3 — normalize:</strong> $\\hat{x} = [-3, -1, 1, 3]/2.236 \\approx [-1.342,\\, -0.447,\\, 0.447,\\, 1.342]$. Note this has mean $0$ and variance $1$ by construction.</p>\n<p><strong>Step 4 — scale and shift:</strong> $y = 3\\hat{x} + 1 \\approx [-3.025,\\, -0.342,\\, 2.342,\\, 5.025]$. The output now has mean $\\beta = 1$ and standard deviation $\\gamma = 3$ — the network has reshaped the distribution to whatever scale/center it found useful, regardless of the raw incoming numbers.</p>\n\n<h3>Layer Normalization: Why Transformers Use a Different Axis</h3>\n<h4>The key difference is the axis of normalization</h4>\n<p>BatchNorm and LayerNorm use the <em>same</em> normalization formula. The only — but crucial — difference is <strong>which dimension you compute statistics over</strong>.</p>\n<ul>\n<li><strong>BatchNorm</strong> normalizes <em>each feature across the batch</em>: for feature $j$, it pools $x_{1,j}, \\dots, x_{m,j}$ over the $m$ examples. Statistics depend on the other examples in the batch.</li>\n<li><strong>LayerNorm</strong> (Ba, Kiros, Hinton, 2016) normalizes <em>each example across its features</em>: for example $i$ with feature vector $\\mathbf{x}_i \\in \\mathbb{R}^d$, it computes $\\mu_i = \\frac{1}{d}\\sum_j x_{i,j}$ and $\\sigma_i^2 = \\frac{1}{d}\\sum_j (x_{i,j} - \\mu_i)^2$ over that single example's own features.</li>\n</ul>\n<p>The formula is otherwise identical: $\\hat{x}_{i,j} = (x_{i,j} - \\mu_i)/\\sqrt{\\sigma_i^2 + \\epsilon}$, then $y_{i,j} = \\gamma_j \\hat{x}_{i,j} + \\beta_j$, with learnable per-feature $\\gamma, \\beta$.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Because LayerNorm's statistics come from a single example, it has <strong>no dependence on the batch and no train/test discrepancy</strong> — it computes the same thing in training and inference, with no running averages to track. This is exactly what makes it ideal for the settings where BatchNorm struggles: variable-length sequences, recurrent networks, very small or size-1 batches, and the autoregressive generation in transformers where each step processes essentially one token's representation at a time.</p></div>\n\n<h4>Why sequences and transformers prefer LayerNorm</h4>\n<p>In a transformer, a sequence has variable length and the meaningful unit is a token's $d$-dimensional embedding. BatchNorm across the batch is problematic: sequences have different lengths (so the \"batch\" at each position is ragged), and at generation time you produce one token at a time, making batch statistics unstable or undefined. LayerNorm sidesteps all of this by normalizing within each token's feature vector — deterministic, length-agnostic, and batch-independent. Every standard transformer (the original \"Attention Is All You Need\", BERT, GPT, etc.) uses LayerNorm. Modern variants like RMSNorm simplify it further by dropping the mean-centering and only rescaling by the root-mean-square, which is cheaper and works well at scale.</p>\n<p>One more design detail you will see: <strong>pre-norm vs post-norm</strong>. The original transformer applied LayerNorm <em>after</em> the residual addition (post-norm); most modern large models apply it <em>before</em> each sub-layer (pre-norm), because pre-norm keeps a clean residual gradient path and trains much more stably at great depth.</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Dropout</strong> randomly zeros units at train time (mask $\\sim \\text{Bernoulli}(q)$), scaling to preserve expectations (inverted dropout divides by $q$ at train time); at test time it is off. It is implicit ensembling of $2^n$ weight-sharing sub-networks and reduces overfitting.</li>\n<li><strong>BatchNorm</strong> normalizes each feature over the batch, then applies learned $\\gamma, \\beta$; it uses batch stats in train mode and running averages in eval mode — so <code>model.eval()</code> matters. It accelerates optimization by smoothing the loss landscape.</li>\n<li><strong>LayerNorm</strong> uses the same formula but normalizes each example over its own features, making it batch-independent with identical train/test behavior — the right choice for sequences and transformers.</li>\n</ul>",
          "mcq": [
            {
              "q": "You train a model with dropout and BatchNorm, then deploy it but forget to switch it to evaluation mode (e.g. PyTorch's $model.eval()$). What is the most likely consequence?",
              "choices": [
                "Nothing changes; train and eval mode are identical for these layers",
                "Dropout keeps randomly zeroing units and BatchNorm uses batch statistics, so predictions become noisy and depend on batch composition",
                "The model throws an error because BatchNorm requires a batch of at least 32",
                "Only the learned $\\gamma$ and $\\beta$ are ignored, but normalization still works correctly"
              ],
              "answer": 1,
              "explain": "In train mode dropout still applies random masks and BatchNorm normalizes using the current batch's statistics, so single-example or small-batch inference becomes unstable and inconsistent. Eval mode disables dropout and switches BN to fixed running averages."
            },
            {
              "q": "With inverted dropout and keep probability $q = 0.8$, what happens to a surviving unit's activation during a training forward pass?",
              "choices": [
                "It is multiplied by $0.8$",
                "It is left unchanged; scaling happens only at test time",
                "It is divided by $0.8$ (multiplied by $1.25$)",
                "It is multiplied by $0.2$"
              ],
              "answer": 2,
              "explain": "Inverted dropout divides surviving activations by $q$ at train time so the expected activation equals the raw value; test time then needs no rescaling. Here $1/0.8 = 1.25$."
            },
            {
              "q": "Why is LayerNorm preferred over BatchNorm in transformers?",
              "choices": [
                "LayerNorm has more learnable parameters, so it has higher capacity",
                "LayerNorm normalizes within each example's features, so it is batch-independent and behaves identically at train and test time — ideal for variable-length sequences and one-token-at-a-time generation",
                "BatchNorm cannot be combined with attention layers due to a dimensional incompatibility",
                "LayerNorm removes the need for the $\\gamma$ and $\\beta$ parameters"
              ],
              "answer": 1,
              "explain": "LayerNorm computes statistics over a single example's feature dimension, so it does not depend on batch composition or length and needs no running averages — exactly what variable-length, autoregressive transformer workloads require."
            },
            {
              "q": "What is the role of the learnable $\\gamma$ (scale) and $\\beta$ (shift) parameters in BatchNorm?",
              "choices": [
                "They are fixed hyperparameters set before training to control the learning rate",
                "They let the network rescale and re-shift the normalized activations, so normalization never reduces representational power (it can even undo the normalization)",
                "They store the running mean and variance used at test time",
                "They implement the dropout mask inside the normalization layer"
              ],
              "answer": 1,
              "explain": "After forcing zero-mean/unit-variance, $\\gamma$ and $\\beta$ restore the network's freedom to choose any mean and scale, so BN changes only the optimization geometry, not the set of representable functions."
            },
            {
              "q": "Dropout and normalization layers are described as solving two distinct problems. Which statement best captures this distinction?",
              "choices": [
                "Dropout is primarily a regularizer fighting overfitting, while normalization layers are primarily an optimization aid that makes the loss landscape friendlier",
                "Dropout is primarily an optimization aid, while normalization layers are primarily a regularizer",
                "Both are purely regularizers with no effect on optimization",
                "Dropout speeds up training and normalization layers shrink the weights like $L_2$ decay"
              ],
              "answer": 0,
              "explain": "The lesson explicitly frames dropout as a regularizer against fragile co-adaptations and normalization as an optimization aid that smooths the loss landscape (with only a mild regularizing side effect). The other options invert or distort this: dropout actually slows convergence, and normalization does not shrink weights like L2 decay."
            },
            {
              "q": "During a single training forward pass with dropout, how is the mask $\\mathbf{m}$ applied and how do gradients behave?",
              "choices": [
                "A fresh mask is sampled each minibatch with each $m_i \\sim \\text{Bernoulli}(q)$, and gradients flow back only through units that survived",
                "A single fixed mask is reused for the entire epoch, and gradients flow through all units",
                "The mask zeros units with probability $q$, and gradients flow only through dropped units",
                "The mask is applied only on the backward pass, leaving the forward activations unchanged"
              ],
              "answer": 0,
              "explain": "The lesson states a fresh Bernoulli($q$) mask is drawn on every minibatch and gradients flow back only through the units that survived. A unit is kept (not zeroed) with probability $q$, so the option claiming units are zeroed with probability $q$ and that gradients flow through dropped units is wrong."
            },
            {
              "q": "Why does dropout require activation scaling to match expectations between training and test time?",
              "choices": [
                "At training a downstream unit receives input from only a fraction $q$ of its sources, so without scaling its expected input would differ from test time when all units are active",
                "Scaling is needed because test-time activations are randomly zeroed and must be amplified",
                "Scaling compensates for the learning rate being larger during training",
                "Without scaling the gradients would vanish because $q < 1$"
              ],
              "answer": 0,
              "explain": "Because each unit is kept with probability $q$ during training, a downstream unit's expected input is only a fraction $q$ of the full test-time input, so scaling (e.g. dividing by $q$ in inverted dropout) keeps the expectation consistent. At test time dropout is off, so the option about test-time activations being randomly zeroed is false."
            },
            {
              "q": "What is the single most common silent bug the lesson warns about regarding dropout and normalization layers?",
              "choices": [
                "Getting the train/eval distinction wrong, since both layers behave differently at training time than at test time",
                "Choosing a drop probability $p$ that is too small",
                "Forgetting to add $L_2$ weight decay alongside dropout",
                "Using elementwise multiplication instead of matrix multiplication for the mask"
              ],
              "answer": 0,
              "explain": "The lesson stresses that both layers behave differently at train vs. test time and that getting this distinction wrong (e.g. forgetting model.eval()) is one of the most common and most silent bugs in practice. The mask is correctly applied with elementwise multiplication, so that option is also factually wrong."
            }
          ],
          "flashcards": [
            {
              "front": "Write the BatchNorm formula for one feature over a minibatch.",
              "back": "$\\mu_B = \\frac{1}{m}\\sum_i x_i$; $\\sigma_B^2 = \\frac{1}{m}\\sum_i (x_i-\\mu_B)^2$; $\\hat{x}_i = \\frac{x_i-\\mu_B}{\\sqrt{\\sigma_B^2+\\epsilon}}$; output $y_i = \\gamma\\hat{x}_i + \\beta$, with learned $\\gamma$ (scale) and $\\beta$ (shift)."
            },
            {
              "front": "What is 'internal covariate shift', and is it really why BatchNorm works?",
              "back": "It is the shifting distribution of a layer's inputs as earlier layers' parameters change during training — the original (Ioffe & Szegedy) motivation for BN. Later work (Santurkar et al., 2018) argues the real benefit is smoothing the loss landscape / making gradients more predictable, not reducing covariate shift."
            },
            {
              "front": "BatchNorm vs LayerNorm: what is the single key difference?",
              "back": "The axis of normalization. BatchNorm normalizes each feature across the batch (statistics depend on other examples; needs running averages and train/eval modes). LayerNorm normalizes each example across its own features (batch-independent, identical train/test behavior). Same underlying normalize-then-affine formula."
            },
            {
              "front": "Inverted dropout: what operation at train time and what at test time?",
              "back": "Train: zero each unit with prob $p$, and divide survivors by $q=1-p$ so $\\mathbb{E}[\\tilde h]=h$. Test: do nothing (dropout off, no rescaling). This keeps inference identical to a dropout-free net."
            },
            {
              "front": "Why does dropout count as 'implicit ensembling'?",
              "back": "A net with $n$ droppable units has $2^n$ sub-networks sharing weights; each minibatch trains a randomly sampled one. The scaled full network at test time approximates the average prediction of all sub-networks — like bagging, but nearly free."
            },
            {
              "front": "Why is the preceding layer's bias often disabled before BatchNorm?",
              "back": "BatchNorm subtracts the mean and then adds learnable $\\beta$, which absorbs/replaces any constant bias. So a bias in the linear/conv layer just before BN is redundant; set bias=False."
            }
          ],
          "homework": [
            {
              "prompt": "A hidden layer has activations $h = [1.0, 2.0, 3.0, 4.0]$ for one example (4 units). You apply dropout with drop probability $p = 0.5$ using inverted dropout, and the sampled keep-mask is $m = [1, 0, 1, 0]$. Compute the output activations seen during this training forward pass.",
              "hint": "Inverted dropout zeros dropped units AND divides the survivors by the keep probability $q = 1 - p$.",
              "solution": "Keep probability $q = 1 - 0.5 = 0.5$, so survivors are divided by $0.5$ (i.e. multiplied by $2$). Apply mask: $m \\odot h = [1.0, 0, 3.0, 0]$. Scale survivors by $1/q = 2$: output $= [2.0, 0, 6.0, 0]$. Units 2 and 4 are dropped to zero; units 1 and 3 are doubled to compensate for the missing units, keeping the expected total input stable."
            },
            {
              "prompt": "For one feature across a minibatch of $m=3$ examples, the values are $x = [10, 20, 30]$. The learned BatchNorm parameters are $\\gamma = 2$, $\\beta = 5$. Using $\\epsilon \\approx 0$, compute the BatchNorm output $y$ for each example. Then state what statistics would be used instead if the model were in eval mode.",
              "hint": "Compute $\\mu_B$ and $\\sigma_B^2$ from the batch, normalize, then apply $\\gamma\\hat{x}+\\beta$. For eval mode, recall what BN substitutes for the batch statistics.",
              "solution": "Mean: $\\mu_B = (10+20+30)/3 = 20$. Deviations $[-10, 0, 10]$, squared $[100, 0, 100]$, so $\\sigma_B^2 = 200/3 \\approx 66.67$ and $\\sigma_B \\approx 8.165$. Normalize: $\\hat{x} = [-10, 0, 10]/8.165 \\approx [-1.225, 0, 1.225]$. Scale/shift: $y = 2\\hat{x} + 5 \\approx [2.55, 5.0, 7.45]$. In eval mode BN would NOT use this batch's $\\mu_B, \\sigma_B^2$; it uses the running (exponential moving) averages of mean and variance accumulated during training, so the output for a given input is fixed and independent of the rest of the batch."
            },
            {
              "prompt": "You are building a model to classify variable-length text sequences and you observe that batch sizes at inference time are often 1. Your colleague proposes BatchNorm after each layer. Explain why this is risky here and what normalization you would recommend instead, justifying your choice.",
              "hint": "Think about where BatchNorm gets its statistics, what happens with batch size 1, and how LayerNorm's normalization axis differs.",
              "solution": "BatchNorm estimates per-feature mean and variance across the batch. With variable lengths the batch is ragged across sequence positions, and with batch size 1 the batch variance is degenerate (undefined/zero for a single sample), so training statistics are noisy and the train/eval mismatch (batch stats vs running averages) becomes severe and unreliable. I would recommend LayerNorm: it normalizes across each example's own feature dimension, so it is completely independent of batch size and sequence length, behaves identically in training and inference (no running averages, no eval-mode switch needed for its statistics), and is the standard choice in transformers and RNNs for exactly these reasons. A practical bonus is that LayerNorm removes a whole class of silent bugs caused by forgetting to set eval mode for the normalization layer."
            }
          ]
        },
        {
          "id": "dl-initialization-and-vanishing-gradients",
          "title": "Weight Initialization and Gradient Flow",
          "minutes": 12,
          "content": "<h3>Why Initialization Is Not a Detail</h3>\n<p>Before a neural network learns anything, you must answer a deceptively simple question: what numbers do the weights start at? A natural instinct is \"small random numbers, it'll sort itself out.\" But the choice of initialization scale controls whether gradients survive their journey through a deep network at all. Pick badly and a 50-layer network will either produce numerically dead activations or saturate into uselessness on the very first forward pass — long before any optimizer has a chance to help.</p>\n<p>The reason is compounding. A deep network is a chain of transformations. Each layer multiplies its input by a weight matrix and applies a nonlinearity. When you stack $L$ such operations, signals are multiplied through $L$ matrices on the way forward and $L$ matrices on the way back. Anything slightly larger than 1 raised to the 50th power explodes; anything slightly smaller vanishes. Initialization is how we tune that per-layer multiplier to sit near 1.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Initialization, normalization, and residual connections are the three pillars that made training networks beyond ~10 layers practical. The 2010–2015 jump from shallow nets to 100+ layer ResNets was driven less by new optimizers and more by controlling gradient flow. This is foundational infrastructure for every modern model, from CNNs to Transformers.</p></div>\n\n<h3>The Vanishing and Exploding Gradient Problem</h3>\n<p>Consider a simple deep network of $L$ layers. Let $a^{(0)}$ be the input and define each layer as</p>\n$$z^{(l)} = W^{(l)} a^{(l-1)}, \\qquad a^{(l)} = \\phi(z^{(l)})$$\n<p>where $\\phi$ is the activation function. During backpropagation, the gradient of the loss $\\mathcal{L}$ with respect to an early-layer pre-activation is found by the chain rule, and it accumulates a product of Jacobians:</p>\n$$\\frac{\\partial \\mathcal{L}}{\\partial z^{(l)}} = \\mathrm{diag}\\big(\\phi'(z^{(l)})\\big) \\left( \\prod_{k=l+1}^{L} \\big(W^{(k)}\\big)^{\\top} \\, \\mathrm{diag}\\big(\\phi'(z^{(k)})\\big) \\right) \\frac{\\partial \\mathcal{L}}{\\partial a^{(L)}}$$\n<p>The key object is that product of $L - l$ weight matrices (interleaved with the activation-derivative diagonals). Its overall magnitude is roughly governed by the product of the \"typical gain\" of each factor — concretely, by powers of the singular values of the weight matrices and the derivative of the activation.</p>\n<ul>\n<li><strong>Vanishing gradients:</strong> if each factor shrinks the signal (gain $&lt; 1$), the product decays geometrically. Early layers receive gradients near zero, so they barely update. The network's first layers stay essentially at their random initial values — the depth is wasted.</li>\n<li><strong>Exploding gradients:</strong> if each factor amplifies (gain $&gt; 1$), the product grows geometrically. Gradients become enormous, the optimizer takes giant steps, and you see loss spikes, <code>NaN</code>s, and divergence.</li>\n</ul>\n<p>Saturating activations make vanishing worse. The sigmoid $\\sigma(z) = 1/(1+e^{-z})$ has derivative $\\sigma'(z) = \\sigma(z)(1-\\sigma(z))$, which peaks at only $0.25$ and is near zero in the tails. Each sigmoid layer can therefore multiply the gradient by at most $0.25$ — a built-in shrinking factor that, over many layers, guarantees vanishing unless the weights compensate.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of the forward and backward passes as a relay race where each runner can either dampen or amplify the message. Initialization sets the volume knob on each layer. We want every knob set so the message arrives at the same volume it started — neither inaudible (vanishing) nor deafening (exploding).</p></div>\n\n<h3>The Core Idea: Variance Preservation</h3>\n<p>The fix is to choose the initial weight scale so that the <em>variance</em> of the signal is preserved as it flows layer to layer — both forward (activations) and backward (gradients). If $\\mathrm{Var}(a^{(l)}) \\approx \\mathrm{Var}(a^{(l-1)})$ for every layer, no geometric blow-up or decay accumulates.</p>\n<p>Let us derive the condition. Assume the weights $W^{(l)}_{ij}$ are i.i.d. with mean zero and variance $\\mathrm{Var}(W)$, independent of the inputs, and that inputs are zero-mean. For a single pre-activation $z = \\sum_{j=1}^{n_{\\text{in}}} W_j a_j$, with $n_{\\text{in}}$ inputs (the <em>fan-in</em>),</p>\n$$\\mathrm{Var}(z) = n_{\\text{in}} \\, \\mathrm{Var}(W) \\, \\mathrm{Var}(a)$$\n<p>For the variance to be preserved, $\\mathrm{Var}(z) = \\mathrm{Var}(a)$, we need</p>\n$$\\boxed{\\; \\mathrm{Var}(W) = \\frac{1}{n_{\\text{in}}} \\;}$$\n<p>This is the forward-pass condition. A symmetric argument on the backward pass (preserving gradient variance) gives $\\mathrm{Var}(W) = 1/n_{\\text{out}}$, where $n_{\\text{out}}$ is the fan-out. These two conditions generally conflict, and how we reconcile them gives us the named schemes.</p>\n\n<h3>Xavier/Glorot Initialization</h3>\n<p>Glorot and Bengio (2010) proposed compromising between the forward and backward conditions by taking the harmonic-style average of the two fan counts:</p>\n$$\\mathrm{Var}(W) = \\frac{2}{n_{\\text{in}} + n_{\\text{out}}}$$\n<p>In a uniform-distribution form this becomes $W \\sim \\mathcal{U}\\!\\left[-\\sqrt{\\tfrac{6}{n_{\\text{in}} + n_{\\text{out}}}},\\ \\sqrt{\\tfrac{6}{n_{\\text{in}} + n_{\\text{out}}}}\\right]$ (the $6$ arises because a uniform on $[-a, a]$ has variance $a^2/3$).</p>\n<p>Crucially, the derivation above implicitly assumed the activation behaves like the identity around zero, i.e. $\\phi'(0) \\approx 1$. This holds for $\\tanh$ and (approximately) for the linear regime of sigmoids. <strong>Xavier is the right choice for symmetric, roughly-linear-near-origin activations: $\\tanh$, sigmoid, and linear layers.</strong></p>\n\n<h3>He Initialization (for ReLU)</h3>\n<p>ReLU, $\\phi(z) = \\max(0, z)$, breaks the Xavier assumption. ReLU zeros out half of its inputs (those that are negative), which halves the variance of the output compared to a linear unit. He et al. (2015) reworked the variance algebra accounting for this factor of one half. The result: you need <em>twice</em> the weight variance to compensate.</p>\n$$\\boxed{\\; \\mathrm{Var}(W) = \\frac{2}{n_{\\text{in}}} \\;}$$\n<p>This is <strong>He (Kaiming) initialization</strong>. The factor of 2 is the entire difference from the forward-only Xavier rule — it exactly cancels the variance lost to ReLU's clipping of negatives. Use He for ReLU and its variants (Leaky ReLU, ELU, GELU are close enough that He is the standard default).</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>The init scheme must match the activation. Rule of thumb: <strong>$\\tanh$/sigmoid &rarr; Xavier/Glorot</strong> ($\\mathrm{Var}=2/(n_{\\text{in}}+n_{\\text{out}})$); <strong>ReLU family &rarr; He/Kaiming</strong> ($\\mathrm{Var}=2/n_{\\text{in}}$). Using Xavier with deep ReLU nets makes activations shrink layer by layer because the factor of 2 is missing.</p></div>\n\n<h4>Worked Example: Choosing the Scale for a ReLU Layer</h4>\n<p>Suppose a fully connected layer maps a 512-dimensional input to a 256-dimensional output, using ReLU activation. What standard deviation should we draw the weights from?</p>\n<p>The activation is ReLU, so we use He initialization with the fan-in:</p>\n$$\\mathrm{Var}(W) = \\frac{2}{n_{\\text{in}}} = \\frac{2}{512} = 0.00390625$$\n$$\\mathrm{std}(W) = \\sqrt{0.00390625} = 0.0625$$\n<p>So draw weights from $\\mathcal{N}(0, 0.0625^2)$. Now check that variance is preserved. Suppose the input activations have variance $\\mathrm{Var}(a) = 1$. The pre-activation variance is</p>\n$$\\mathrm{Var}(z) = n_{\\text{in}} \\cdot \\mathrm{Var}(W) \\cdot \\mathrm{Var}(a) = 512 \\cdot \\frac{2}{512} \\cdot 1 = 2$$\n<p>After ReLU, which keeps only the positive half (zero-mean symmetric input means ReLU passes roughly half the variance), the output variance is approximately $2 \\times \\tfrac{1}{2} = 1$. Variance preserved — exactly the goal. If we had wrongly used Xavier's $\\mathrm{Var}(W) = 1/n_{\\text{in}}$ here, the pre-activation variance would be $1$, and after ReLU only $\\approx 0.5$, so signals would halve every layer and vanish across depth.</p>\n\n<h3>Remedy 1: Gradient Clipping</h3>\n<p>Good initialization controls gradient magnitude <em>at the start</em>, but during training — especially in RNNs and Transformers — gradients can still occasionally explode on hard batches. <strong>Gradient clipping</strong> caps the gradient magnitude before the optimizer step. The most common form is clip-by-global-norm: compute the norm of the full gradient vector $g$ across all parameters, and if it exceeds a threshold $\\tau$, rescale:</p>\n$$\\hat{g} = \\begin{cases} g & \\text{if } \\|g\\| \\le \\tau \\\\[4pt] \\tau \\dfrac{g}{\\|g\\|} & \\text{if } \\|g\\| &gt; \\tau \\end{cases}$$\n<p>The key property: clipping by norm <em>preserves the direction</em> of the gradient and only shortens its length. This is why it is preferred over clip-by-value (which clips each component independently and can distort the descent direction). Clipping turns catastrophic loss spikes into bounded steps and is essentially free insurance against the occasional exploding batch.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Clipping is a speed limiter, not a steering correction. It says \"you may move in this direction, but no faster than $\\tau$.\" It does nothing about chronically vanishing gradients — that is an initialization/architecture problem, not a step-size problem.</p></div>\n\n<h3>Remedy 2: Residual Connections</h3>\n<p>Residual (skip) connections, introduced in ResNet (He et al., 2015), restructure each block to compute</p>\n$$a^{(l)} = a^{(l-1)} + F\\big(a^{(l-1)}\\big)$$\n<p>where $F$ is the layer's transformation. The crucial consequence is in the backward pass. Differentiating, the Jacobian becomes</p>\n$$\\frac{\\partial a^{(l)}}{\\partial a^{(l-1)}} = I + \\frac{\\partial F}{\\partial a^{(l-1)}}$$\n<p>That <strong>identity term $I$</strong> creates a direct \"gradient highway.\" Even if the learned part $\\partial F / \\partial a$ shrinks toward zero in deep stacks, the $I$ ensures the gradient can flow back undiminished through the additive shortcut. Instead of a product of small Jacobians, backprop gets a product of terms each close to $I$, which does not vanish. This is precisely why residual connections let us train networks hundreds of layers deep, and why every modern Transformer wraps its attention and feed-forward sublayers in residual connections.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Notice the unifying theme: vanishing/exploding is fundamentally about <em>products</em> compounding over depth. Each remedy attacks that product differently — initialization tunes each factor to be near 1 in expectation, normalization rescales activations to restore unit variance mid-network, gradient clipping caps the resulting product's magnitude, and residual connections add an identity term so the product can never collapse to zero. Together they turned depth from a liability into the defining advantage of modern deep learning.</p></div>\n\n<h3>Putting It Together: A Practical Checklist</h3>\n<ul>\n<li><strong>Pick init from the activation:</strong> ReLU family &rarr; He ($2/n_{\\text{in}}$); $\\tanh$/sigmoid &rarr; Xavier ($2/(n_{\\text{in}}+n_{\\text{out}})$).</li>\n<li><strong>Diagnose with statistics:</strong> log per-layer activation variances and gradient norms. Steadily shrinking activations across depth means your init is too small for the activation; growing gradient norms or <code>NaN</code> losses mean exploding.</li>\n<li><strong>Add residuals for depth:</strong> beyond ~20 layers, residual connections are essentially mandatory for healthy gradient flow.</li>\n<li><strong>Clip as insurance:</strong> a global-norm clip (e.g. $\\tau = 1.0$) prevents rare exploding batches from derailing training, common in RNNs and large Transformers.</li>\n</ul>",
          "mcq": [
            {
              "q": "You are building a deep fully-connected network where every hidden layer uses ReLU activations. Which initialization preserves activation variance across layers?",
              "choices": [
                "Xavier/Glorot: $\\mathrm{Var}(W) = 2/(n_{\\text{in}} + n_{\\text{out}})$",
                "He/Kaiming: $\\mathrm{Var}(W) = 2/n_{\\text{in}}$",
                "Standard normal: $\\mathrm{Var}(W) = 1$ for every weight",
                "Zeros: $W = 0$ to avoid any initial bias"
              ],
              "answer": 1,
              "explain": "ReLU zeros out the negative half of its inputs, halving output variance, so you need twice the weight variance ($2/n_{\\text{in}}$) to compensate. Xavier lacks the factor of 2 for ReLU's clipping, and zero init makes all neurons identical (no symmetry breaking)."
            },
            {
              "q": "A network with many sigmoid layers trains extremely slowly, and the gradients reaching the first layers are essentially zero while later layers update fine. What is the most likely cause?",
              "choices": [
                "Exploding gradients from weights initialized too large",
                "Vanishing gradients: sigmoid's derivative maxes at 0.25, so products of many such factors decay geometrically",
                "The learning rate is too high, causing divergence",
                "Gradient clipping is removing the early-layer gradients"
              ],
              "answer": 1,
              "explain": "Sigmoid's derivative peaks at only 0.25 and is near zero in its tails, so each layer multiplies the backprop signal by a small factor; over many layers the product vanishes, starving early layers of gradient. This is the classic vanishing-gradient signature."
            },
            {
              "q": "Why is clip-by-global-norm generally preferred over clipping each gradient component to a fixed value?",
              "choices": [
                "It is faster to compute because it avoids the norm",
                "It preserves the gradient's direction and only rescales its length, whereas per-component clipping can distort the descent direction",
                "It also fixes vanishing gradients by amplifying small components",
                "It guarantees the loss decreases every step"
              ],
              "answer": 1,
              "explain": "Global-norm clipping rescales the whole gradient vector uniformly, keeping its direction intact and only shortening it when the norm exceeds the threshold. Per-component clipping changes the relative sizes of components and can point the step in a different direction."
            },
            {
              "q": "In a residual block $a^{(l)} = a^{(l-1)} + F(a^{(l-1)})$, what makes gradient flow robust in very deep networks?",
              "choices": [
                "The block removes all nonlinearities so gradients pass through unchanged",
                "The Jacobian gains an additive identity term $I$, creating a path along which gradients flow undiminished even if $\\partial F/\\partial a$ is tiny",
                "It normalizes activations to unit variance automatically",
                "It clips the gradient norm to prevent explosion"
              ],
              "answer": 1,
              "explain": "Differentiating the residual gives $\\partial a^{(l)}/\\partial a^{(l-1)} = I + \\partial F/\\partial a^{(l-1)}$. The identity term provides a direct gradient highway, so backprop sees products of near-identity terms rather than a product that can collapse to zero."
            },
            {
              "q": "Assume zero-mean i.i.d. weights and a single pre-activation $z = \\sum_{j=1}^{n_{\\text{in}}} W_j a_j$. Starting from $\\mathrm{Var}(z) = n_{\\text{in}}\\,\\mathrm{Var}(W)\\,\\mathrm{Var}(a)$, what condition on $\\mathrm{Var}(W)$ keeps the forward signal variance unchanged from layer to layer?",
              "choices": [
                "$\\mathrm{Var}(W) = n_{\\text{in}}$",
                "$\\mathrm{Var}(W) = 1/n_{\\text{in}}$",
                "$\\mathrm{Var}(W) = 1/n_{\\text{in}}^2$",
                "$\\mathrm{Var}(W) = n_{\\text{in}}/2$"
              ],
              "answer": 1,
              "explain": "Setting $\\mathrm{Var}(z) = \\mathrm{Var}(a)$ in $\\mathrm{Var}(z) = n_{\\text{in}}\\,\\mathrm{Var}(W)\\,\\mathrm{Var}(a)$ forces $n_{\\text{in}}\\,\\mathrm{Var}(W) = 1$, i.e. $\\mathrm{Var}(W) = 1/n_{\\text{in}}$."
            },
            {
              "q": "Xavier/Glorot uses $\\mathrm{Var}(W) = 2/(n_{\\text{in}} + n_{\\text{out}})$ instead of simply $1/n_{\\text{in}}$. What does this particular choice accomplish?",
              "choices": [
                "It compensates for ReLU discarding the negative half of its inputs",
                "It is a compromise between the forward condition ($1/n_{\\text{in}}$) and the backward condition ($1/n_{\\text{out}}$), which generally conflict",
                "It guarantees the gradient norm never exceeds a fixed threshold $\\tau$",
                "It adds an identity term to the layer's Jacobian to preserve gradient flow"
              ],
              "answer": 1,
              "explain": "Preserving forward variance wants $1/n_{\\text{in}}$ while preserving backward (gradient) variance wants $1/n_{\\text{out}}$; since these usually disagree, Xavier averages the two fan counts into $2/(n_{\\text{in}}+n_{\\text{out}})$."
            },
            {
              "q": "A fully connected ReLU layer maps $n_{\\text{in}} = 200$ inputs to some outputs. Using He initialization, what standard deviation should the weights be drawn from?",
              "choices": [
                "$\\sqrt{2/200} = 0.1$",
                "$\\sqrt{1/200} \\approx 0.0707$",
                "$2/200 = 0.01$",
                "$\\sqrt{200/2} = 10$"
              ],
              "answer": 0,
              "explain": "He init sets $\\mathrm{Var}(W) = 2/n_{\\text{in}} = 2/200 = 0.01$, so $\\mathrm{std}(W) = \\sqrt{0.01} = 0.1$."
            },
            {
              "q": "A 60-layer ReLU network has gradients that steadily shrink toward zero in its early layers, but no loss spikes or NaNs ever occur. Would adding global-norm gradient clipping fix the slow learning of the early layers?",
              "choices": [
                "Yes, clipping rescales small gradients back up to the threshold $\\tau$",
                "No — clipping only caps large gradients; vanishing gradients are an initialization/architecture problem that clipping does not address",
                "Yes, because clipping preserves direction it restores the lost early-layer signal",
                "No, but only because clipping requires residual connections to function"
              ],
              "answer": 1,
              "explain": "Clipping is a speed limiter that shortens overly long gradients while leaving small ones untouched; chronic vanishing must be fixed with appropriate initialization (e.g. He) or architecture changes like residual connections, not by clipping."
            }
          ],
          "flashcards": [
            {
              "front": "What is the variance-preservation condition for weight initialization (forward pass), and why does it matter?",
              "back": "Set $\\mathrm{Var}(W) = 1/n_{\\text{in}}$ so that $\\mathrm{Var}(z) = n_{\\text{in}}\\,\\mathrm{Var}(W)\\,\\mathrm{Var}(a) = \\mathrm{Var}(a)$. Preserving signal variance layer-to-layer prevents activations (and gradients) from exploding or vanishing across depth."
            },
            {
              "front": "Xavier/Glorot vs. He: what are the formulas and when do you use each?",
              "back": "Xavier/Glorot: $\\mathrm{Var}(W) = 2/(n_{\\text{in}}+n_{\\text{out}})$, for tanh/sigmoid (symmetric, ~linear near 0). He/Kaiming: $\\mathrm{Var}(W) = 2/n_{\\text{in}}$, for ReLU and variants. The extra factor of 2 in He compensates for ReLU zeroing the negative half of inputs."
            },
            {
              "front": "What are the symptoms of exploding gradients?",
              "back": "Loss spikes or oscillations, loss becoming NaN/Inf, gradient norms growing rapidly across iterations or across depth, and the optimizer diverging. Caused by per-layer gains > 1 compounding over depth."
            },
            {
              "front": "What does clip-by-global-norm do, and what does it NOT fix?",
              "back": "If $\\|g\\| > \\tau$, rescale $\\hat g = \\tau\\, g/\\|g\\|$; otherwise leave $g$ unchanged. It caps gradient magnitude while preserving direction, taming exploding gradients. It does NOT fix vanishing gradients — that is an init/architecture issue."
            },
            {
              "front": "How do residual connections help gradient flow mathematically?",
              "back": "For $a^{(l)} = a^{(l-1)} + F(a^{(l-1)})$, the Jacobian is $I + \\partial F/\\partial a^{(l-1)}$. The identity term gives a gradient highway so backprop is a product of near-identity terms that cannot collapse to zero, enabling very deep networks."
            },
            {
              "front": "Why does saturating activation (sigmoid) worsen vanishing gradients?",
              "back": "Sigmoid's derivative $\\sigma'(z)=\\sigma(z)(1-\\sigma(z))$ peaks at 0.25 and is ~0 in the tails. Each layer multiplies the backprop signal by at most 0.25, so over many layers the gradient product decays geometrically toward zero."
            }
          ],
          "homework": [
            {
              "prompt": "A fully connected layer maps $n_{\\text{in}} = 1024$ inputs to $n_{\\text{out}} = 256$ outputs and uses a $\\tanh$ activation. (a) Which initialization scheme is appropriate and why? (b) Compute the weight variance and standard deviation. (c) If the layer instead used ReLU, how would the standard deviation change?",
              "hint": "tanh is symmetric and roughly linear near 0, so use Xavier with BOTH fan-in and fan-out. ReLU needs He with the factor of 2 and fan-in only.",
              "solution": "(a) tanh is symmetric and approximately linear near the origin ($\\phi'(0)\\approx 1$), satisfying the assumption behind Xavier/Glorot, so use Xavier. (b) $\\mathrm{Var}(W) = 2/(n_{\\text{in}}+n_{\\text{out}}) = 2/(1024+256) = 2/1280 = 0.0015625$, so $\\mathrm{std}(W) = \\sqrt{0.0015625} \\approx 0.03953$. (c) For ReLU, use He: $\\mathrm{Var}(W) = 2/n_{\\text{in}} = 2/1024 = 0.001953$, so $\\mathrm{std}(W) = \\sqrt{0.001953} \\approx 0.04419$. The He std is larger because it must compensate for ReLU discarding the negative half of activations."
            },
            {
              "prompt": "Consider a 20-layer network where each layer multiplies the backpropagated gradient by an average gain of $g$. (a) Express the ratio of the gradient reaching layer 1 to the gradient at layer 20 in terms of $g$. (b) Evaluate this ratio for $g = 0.6$ and for $g = 1.3$, and interpret each as vanishing or exploding.",
              "hint": "The gradient passes through 19 inter-layer factors from layer 20 back to layer 1; the magnitudes multiply, so the ratio is a power of $g$.",
              "solution": "(a) Going from layer 20 back to layer 1, the gradient is multiplied by the gain across 19 layer transitions, so the ratio is $g^{19}$. (b) For $g = 0.6$: $0.6^{19} \\approx 6.1\\times 10^{-5}$ — the layer-1 gradient is roughly five orders of magnitude smaller, a clear case of vanishing gradients; early layers barely learn. For $g = 1.3$: $1.3^{19} \\approx 1.46\\times 10^{2} \\approx 146$ — the gradient is amplified ~150x, an exploding-gradient case that would cause unstable, possibly NaN updates. This shows how even small deviations of the per-layer gain from 1 compound dramatically over depth, which is exactly why variance-preserving init aims for $g \\approx 1$."
            },
            {
              "prompt": "During training of a Transformer you observe the loss is decreasing smoothly, but every few hundred steps it suddenly spikes and occasionally produces a NaN. (a) Diagnose the likely problem. (b) Propose a remedy and give a concrete configuration. (c) Explain why your remedy preserves the descent direction.",
              "hint": "Sudden spikes and NaNs on occasional batches point to gradient magnitude, not chronic vanishing. Think about what bounds magnitude without changing direction.",
              "solution": "(a) The intermittent spikes and NaNs indicate occasional exploding gradients on hard batches — the gradient norm momentarily becomes very large, causing an oversized optimizer step that destabilizes or overflows training. This is a magnitude problem, not vanishing. (b) Apply clip-by-global-norm with a threshold such as $\\tau = 1.0$: before each optimizer step, compute the global gradient norm $\\|g\\|$ over all parameters; if $\\|g\\| > 1.0$, rescale $\\hat g = 1.0 \\cdot g/\\|g\\|$. (c) Because the rescaling multiplies the entire gradient vector by a single positive scalar $\\tau/\\|g\\|$, every component is scaled identically, so $\\hat g$ points in the same direction as $g$ — only its length is reduced. This bounds the step size without distorting which way the optimizer moves, unlike per-component clipping which would change the relative component sizes and hence the direction."
            }
          ]
        }
      ]
    },
    {
      "id": "dl-convolutional-networks",
      "title": "Convolutional Networks for Vision",
      "lessons": [
        {
          "id": "dl-convolution-operation",
          "title": "The Convolution Operation and Feature Maps",
          "minutes": 16,
          "content": "<h3>From Dense Layers to Convolutions: Why Vision Needs Structure</h3>\n<p>Imagine flattening a modest $200 \\times 200$ RGB image into a vector and feeding it to a fully connected (dense) layer with just $1000$ hidden units. The image has $200 \\times 200 \\times 3 = 120{,}000$ inputs, so that one layer needs $120{,}000 \\times 1000 = 1.2 \\times 10^8$ weights. That is absurd for a single layer of a single image — and worse, it is the <em>wrong</em> kind of model. A dense layer treats pixel $(0,0)$ and pixel $(199,199)$ as equally and independently related to every output, throwing away the single most important fact about images: <strong>nearby pixels are correlated, and useful patterns are local and repeat across space</strong>.</p>\n<p>The <strong>convolution operation</strong> bakes these two priors — <em>locality</em> and <em>translation equivariance</em> — directly into the architecture. This lesson defines convolution precisely, gives you the formula for output sizes and parameter counts, and shows exactly why convolutional layers are both far smaller and far more appropriate than dense layers for visual data.</p>\n\n<h3>The Convolution Operation</h3>\n<p>A <strong>kernel</strong> (or <strong>filter</strong>) is a small array of learnable weights — say $3 \\times 3$ or $5 \\times 5$. We slide this kernel across the input image, and at each position we compute a single number: the elementwise product of the kernel with the patch of image it currently overlaps, summed up (a dot product). The grid of all such numbers is the <strong>feature map</strong> (also called an activation map).</p>\n<p>Formally, for a single-channel input $I$ and a kernel $K$ of size $k \\times k$, the output at position $(i,j)$ is</p>\n$$S(i,j) = b + \\sum_{m=0}^{k-1}\\sum_{n=0}^{k-1} I(i+m,\\; j+n)\\; K(m,n),$$\n<p>where $b$ is a scalar bias. Note: deep learning libraries call this operation \"convolution,\" but it is technically <strong>cross-correlation</strong> — true mathematical convolution flips the kernel first ($K(-m,-n)$). Because the kernel is learned, the flip is irrelevant: the network simply learns the flipped weights. We will use the deep-learning convention throughout.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A kernel is a small <em>pattern detector</em>. A vertical-edge kernel produces large positive values wherever the image has a vertical edge, and near-zero elsewhere. The feature map is a heatmap of \"where did this pattern appear?\" Training learns which patterns are worth detecting.</p>\n</div>\n\n<h3>Channels: Depth Is Not Optional</h3>\n<p>Real images have <strong>channels</strong>: an RGB image has $3$. A kernel always spans the <em>full depth</em> of its input. So a \"$3 \\times 3$ kernel\" on an RGB input is really a $3 \\times 3 \\times 3$ tensor of weights, and the dot product sums over all three channels at once, still producing a <em>single</em> number per spatial position:</p>\n$$S(i,j) = b + \\sum_{c=0}^{C_{in}-1}\\sum_{m=0}^{k-1}\\sum_{n=0}^{k-1} I(i+m,\\;j+n,\\;c)\\; K(m,n,c).$$\n<p>One kernel produces one feature map. To detect many patterns, a conv layer holds many kernels — say $C_{out}$ of them — and stacks their feature maps along a new channel axis. So a layer transforms a tensor of shape $(H_{in}, W_{in}, C_{in})$ into one of shape $(H_{out}, W_{out}, C_{out})$. The output depth $C_{out}$ is a design choice (number of filters); the output's spatial size depends on stride and padding, which we cover next.</p>\n\n<h4>Worked count of one kernel's weights</h4>\n<p>A single kernel acting on $C_{in}$ channels with spatial size $k \\times k$ has $k \\cdot k \\cdot C_{in}$ weights, plus $1$ bias. With $C_{out}$ kernels, the whole layer has</p>\n$$\\#\\text{params} = (k \\cdot k \\cdot C_{in} + 1)\\cdot C_{out}.$$\n<p>The crucial point: <strong>this count does not depend on the image's height or width.</strong> A $3\\times3$ conv on a $7\\times7$ image and on a $7000\\times7000$ image have <em>identical</em> parameter counts. Dense layers cannot say that.</p>\n\n<h3>Stride and Padding: Controlling the Output Grid</h3>\n<h4>Stride</h4>\n<p>The <strong>stride</strong> $S$ is how many pixels the kernel jumps between evaluations. Stride $1$ visits every position; stride $2$ skips every other position, roughly <em>halving</em> each spatial dimension and downsampling the feature map. Larger strides reduce computation and spatial resolution while expanding the effective field of view per output unit.</p>\n<h4>Padding</h4>\n<p>Without intervention, a $k \\times k$ kernel cannot be centered on the border pixels, so the output shrinks and edge information is under-sampled. <strong>Padding</strong> $P$ adds a border of (usually zero) pixels around the input. Two common regimes:</p>\n<ul>\n<li><strong>\"Valid\" padding</strong> ($P=0$): no padding; the output is smaller than the input.</li>\n<li><strong>\"Same\" padding</strong>: choose $P$ so that, at stride $1$, the output has the <em>same</em> spatial size as the input. For an odd kernel this means $P = (k-1)/2$.</li>\n</ul>\n\n<h3>The Output-Size Formula</h3>\n<p>Putting stride and padding together, for one spatial dimension of size $W$ with kernel size $K$, padding $P$, and stride $S$:</p>\n$$W_{out} = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1.$$\n<p>Read it piece by piece: $W + 2P$ is the padded width; subtracting $K$ gives the last valid starting offset; dividing by $S$ counts how many strided steps fit; the floor handles inexact division (the kernel simply stops when it would run off the edge); and $+1$ counts the initial position. The same formula applies independently to height (using $H$). Quick sanity checks:</p>\n<ul>\n<li>$K=3, P=1, S=1$ gives $W_{out} = W - 3 + 2 + 1 = W$ — confirming \"same\" padding.</li>\n<li>$K=3, P=0, S=1$ gives $W_{out} = W - 2$ — a $3\\times3$ valid conv loses one pixel on each side.</li>\n<li>$S=2$ roughly halves the dimension, the classic downsampling stride.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Output size and parameter count are two <em>independent</em> levers. Stride/padding/kernel-size set the <strong>spatial</strong> shape and FLOPs; the number of filters $C_{out}$ sets the <strong>representational</strong> width. Getting an off-by-one wrong here is the single most common cause of \"tensor shape mismatch\" errors when building CNNs.</p>\n</div>\n\n<h3>Receptive Field: How Far a Neuron Can See</h3>\n<p>The <strong>receptive field</strong> of a unit in a feature map is the region of the <em>original input</em> that can influence its value. A single $3\\times3$ conv gives each output unit a $3\\times3$ receptive field. Stack a second $3\\times3$ conv and each new unit sees a $3\\times3$ window of the previous map — which itself spans $5\\times5$ of the input. A third stacked $3\\times3$ layer reaches $7\\times7$.</p>\n<p>For a stack of layers (stride $1$), the receptive field grows additively:</p>\n$$RF_{\\ell} = RF_{\\ell-1} + (K_\\ell - 1),\\qquad RF_0 = 1.$$\n<p>With strides, growth becomes multiplicative because each stride multiplies the \"jump size\" (the distance in input pixels between adjacent output units). This is why deep CNNs can start with tiny local kernels yet eventually integrate information across the whole image: depth converts locality into global context.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Two stacked $3\\times3$ convs have a $5\\times5$ receptive field but use $2\\cdot(9C^2) = 18C^2$ weights versus a single $5\\times5$ conv's $25C^2$ — fewer parameters, more nonlinearity, same reach. This insight (VGG, 2014) is why modern networks favor stacks of small kernels. The same compositional logic — small local operations stacked to build global understanding — recurs in dilated convolutions, ResNets, and even the receptive-field analysis of attention layers in Transformers.</p>\n</div>\n\n<h3>Parameter Sharing and Locality vs. Dense Layers</h3>\n<p>Two structural properties separate convolutions from dense layers:</p>\n<ul>\n<li><strong>Sparse connectivity (locality):</strong> each output unit connects only to a small $k\\times k$ patch, not to every input. Distant pixels do not directly interact in one layer.</li>\n<li><strong>Parameter sharing (weight tying):</strong> the <em>same</em> kernel weights are reused at every spatial position. A dense layer learns a separate weight for each (input, output) pair; a conv layer learns one kernel and applies it everywhere.</li>\n</ul>\n<p>Parameter sharing produces <strong>translation equivariance</strong>: shift the input, and the feature map shifts correspondingly. A cat detector trained from top-left examples automatically works in the bottom-right — the model does not relearn the pattern per location. This is a powerful, hard-coded inductive bias, and it is the right one for natural images, where the meaning of a local pattern does not depend on where it sits.</p>\n\n<h4>The savings, concretely</h4>\n<p>Compare connecting a $32\\times32\\times3$ input to a $32\\times32\\times16$ output.</p>\n<ul>\n<li><strong>Dense layer:</strong> $(32\\cdot32\\cdot3)\\times(32\\cdot32\\cdot16) = 3072 \\times 16384 \\approx 5.0 \\times 10^7$ weights.</li>\n<li><strong>Conv layer ($3\\times3$, same padding, $16$ filters):</strong> $(3\\cdot3\\cdot3 + 1)\\cdot16 = 448$ weights.</li>\n</ul>\n<p>That is roughly a <strong>100,000-fold</strong> reduction — with a better fit to the data, not a worse one. The convolution does not merely compress the dense layer; it expresses a different, more correct hypothesis class.</p>\n\n<h3>A Fully Worked Layer</h3>\n<p>Suppose a layer takes input $(H_{in}, W_{in}, C_{in}) = (28, 28, 3)$ and applies $32$ kernels of size $5\\times5$ with stride $1$ and padding $2$.</p>\n<p><strong>Step 1 — output spatial size.</strong> Using the formula with $W=28, K=5, P=2, S=1$:</p>\n$$W_{out} = \\left\\lfloor \\frac{28 - 5 + 2\\cdot2}{1}\\right\\rfloor + 1 = \\left\\lfloor 27 \\right\\rfloor + 1 = 28.$$\n<p>Same for height. So the spatial size is preserved ($P=2=(5-1)/2$ is exactly \"same\" padding).</p>\n<p><strong>Step 2 — output depth.</strong> $C_{out} = 32$ (number of filters). Output shape: $(28, 28, 32)$.</p>\n<p><strong>Step 3 — parameter count.</strong> Each kernel is $5\\times5\\times3 = 75$ weights plus $1$ bias $= 76$. With $32$ filters:</p>\n$$\\#\\text{params} = (5\\cdot5\\cdot3 + 1)\\cdot32 = 76 \\times 32 = 2432.$$\n<p><strong>Step 4 — FLOPs (optional sanity check).</strong> Each of the $28\\times28\\times32$ output units costs about $5\\cdot5\\cdot3 = 75$ multiply-adds, giving $\\approx 28\\cdot28\\cdot32\\cdot75 \\approx 1.88\\times10^6$ MACs. Notice the parameters are tiny (2432) but the compute is large — convolutions are <em>parameter-cheap but compute-heavy</em>, the opposite of dense layers, which is exactly why GPUs and CNNs are such a good match.</p>\n\n<h3>Key Takeaways</h3>\n<ul>\n<li>A conv layer maps $(H_{in},W_{in},C_{in}) \\to (H_{out},W_{out},C_{out})$; spatial size follows $\\lfloor (W-K+2P)/S\\rfloor + 1$, and depth equals the number of filters.</li>\n<li>Parameter count $=(k\\cdot k\\cdot C_{in}+1)\\cdot C_{out}$ — <em>independent of image size</em>.</li>\n<li>Locality + weight sharing give translation equivariance and a ~$10^5\\times$ parameter saving over dense layers, while encoding the correct prior for images.</li>\n<li>Stacking small kernels grows the receptive field cheaply, turning local operations into global understanding.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"dl-convolution\"></div>",
          "mcq": [
            {
              "q": "A conv layer takes a $(64,64,16)$ input and applies $32$ filters of size $3\\times3$ with stride $1$ and padding $1$. What is the output shape and the number of learnable parameters?",
              "choices": [
                "Output $(64,64,32)$; params $= (3\\cdot3\\cdot16+1)\\cdot32 = 4640$",
                "Output $(64,64,32)$; params $= 3\\cdot3\\cdot32 = 288$",
                "Output $(62,62,32)$; params $= (3\\cdot3\\cdot16)\\cdot32 = 4608$",
                "Output $(64,64,16)$; params $= (3\\cdot3\\cdot32+1)\\cdot16 = 4624$"
              ],
              "answer": 0,
              "explain": "With $K=3,P=1,S=1$ spatial size is preserved (64), depth equals the 32 filters, and each filter spans all 16 input channels: $(9\\cdot16+1)\\cdot32 = 4640$ (the $+1$ is the per-filter bias)."
            },
            {
              "q": "Why does a convolutional layer have far fewer parameters than a dense layer connecting the same number of input and output units?",
              "choices": [
                "Because convolutions use lower-precision floating point",
                "Because the same kernel weights are reused (shared) across every spatial position, and each output connects only to a small local patch",
                "Because convolutions discard the color channels before computing",
                "Because the bias term is omitted in convolutions"
              ],
              "answer": 1,
              "explain": "Parameter sharing (one kernel applied everywhere) plus sparse local connectivity is the source of the savings and yields translation equivariance; channels are kept and biases are typically present."
            },
            {
              "q": "Stacking three $3\\times3$ convolutions with stride 1 gives each final-layer unit a receptive field over the original input of size:",
              "choices": [
                "$3\\times3$",
                "$5\\times5$",
                "$7\\times7$",
                "$9\\times9$"
              ],
              "answer": 2,
              "explain": "Receptive field grows as $RF_\\ell = RF_{\\ell-1} + (K-1)$ from $RF_0=1$: $1 \\to 3 \\to 5 \\to 7$."
            },
            {
              "q": "Increasing the stride from $1$ to $2$ in a conv layer (kernel and padding fixed) primarily:",
              "choices": [
                "Increases the number of learnable parameters",
                "Roughly halves each output spatial dimension, downsampling the feature map",
                "Leaves the output size unchanged but doubles the channels",
                "Eliminates the need for any padding"
              ],
              "answer": 1,
              "explain": "Stride controls the spatial step between evaluations; $S=2$ roughly halves $H$ and $W$ via $\\lfloor(W-K+2P)/S\\rfloor+1$, while parameter count (which depends only on $k,C_{in},C_{out}$) is unaffected."
            },
            {
              "q": "The lesson notes that deep-learning libraries call the operation \"convolution\" even though it is technically cross-correlation (true convolution flips the kernel, using $K(-m,-n)$). Why does this distinction not matter in practice for a trained conv layer?",
              "choices": [
                "Because the kernel weights are learned, so the network simply learns whatever (possibly flipped) values it needs; the flip just relabels which weight sits where",
                "Because cross-correlation and convolution always produce numerically identical feature maps for any kernel",
                "Because the bias term $b$ automatically cancels out the effect of flipping the kernel",
                "Because libraries internally flip the kernel anyway before computing the dot product"
              ],
              "answer": 0,
              "explain": "Since the weights are learned, a flip is irrelevant — the network can just learn the flipped weights, so cross-correlation and true convolution define the same hypothesis class."
            },
            {
              "q": "A $3 \\times 3$ kernel is applied to an RGB ($C_{in}=3$) input. How many weights does this single kernel have, and how many feature maps does it produce?",
              "choices": [
                "$9$ weights (one $3\\times3$ slice shared across channels); produces $3$ feature maps, one per channel",
                "$27$ weights (a $3\\times3\\times3$ tensor spanning all channels); produces $1$ feature map",
                "$27$ weights; produces $3$ feature maps, one per input channel",
                "$3$ weights (one per channel); produces $1$ feature map"
              ],
              "answer": 1,
              "explain": "A kernel always spans the full input depth, so it is $3\\times3\\times3=27$ weights, and its dot product sums over all channels to yield a single feature map."
            },
            {
              "q": "An input of spatial width $W=10$ is convolved with kernel size $K=4$, padding $P=1$, and stride $S=3$. What is the output width $W_{out}$ from the formula $W_{out}=\\lfloor (W-K+2P)/S \\rfloor + 1$?",
              "choices": [
                "$4$",
                "$3$",
                "$2$",
                "$5$"
              ],
              "answer": 1,
              "explain": "$(10-4+2)/3 = 8/3 = 2.67$, floored to $2$, plus $1$ gives $W_{out}=3$ (the floor handles the inexact division when the kernel runs off the edge)."
            },
            {
              "q": "The lesson's worked example computes only $2432$ parameters but roughly $1.88\\times10^6$ MACs for one layer. What general property of convolutional layers does this illustrate?",
              "choices": [
                "They are parameter-heavy but compute-cheap, so they need huge memory but little arithmetic",
                "They are parameter-cheap but compute-heavy, since shared weights are reused at every spatial position",
                "Their parameter count and FLOP count are always proportional, so one can be inferred from the other",
                "Their compute cost is independent of the spatial size of the feature map"
              ],
              "answer": 1,
              "explain": "Weight sharing makes parameters few, but applying those shared weights at every spatial location makes the arithmetic large — convolutions are parameter-cheap but compute-heavy, the opposite of dense layers."
            }
          ],
          "flashcards": [
            {
              "front": "Output spatial size formula for a conv layer (one dimension)",
              "back": "$W_{out} = \\lfloor (W - K + 2P)/S \\rfloor + 1$, where $W$=input size, $K$=kernel size, $P$=padding, $S$=stride."
            },
            {
              "front": "Number of learnable parameters in a conv layer",
              "back": "$(k\\cdot k\\cdot C_{in} + 1)\\cdot C_{out}$ — each of $C_{out}$ filters spans all $C_{in}$ input channels plus one bias. Independent of image height/width."
            },
            {
              "front": "What is 'same' padding (odd kernel, stride 1)?",
              "back": "Padding $P=(k-1)/2$ chosen so the output has the same spatial size as the input. E.g. $P=1$ for a $3\\times3$ kernel."
            },
            {
              "front": "Receptive field and how it grows with depth (stride 1)",
              "back": "The region of the original input that affects a unit. It grows additively: $RF_\\ell = RF_{\\ell-1} + (K_\\ell - 1)$, starting from $1$. Strides make growth multiplicative."
            },
            {
              "front": "Parameter sharing in convolutions — what property does it give?",
              "back": "The same kernel weights are applied at every spatial location. This yields translation equivariance (shift input → feature map shifts) and drastically fewer parameters than a dense layer."
            },
            {
              "front": "What does the number of filters control vs. what stride/padding control?",
              "back": "Number of filters ($C_{out}$) sets the output depth (representational width). Stride, padding, and kernel size set the output spatial size and FLOPs. They are independent levers."
            }
          ],
          "homework": [
            {
              "prompt": "A conv layer receives a $(128, 128, 3)$ input and applies $64$ filters of size $7\\times7$ with stride $2$ and padding $3$. Compute (a) the output shape and (b) the number of learnable parameters.",
              "hint": "Use $W_{out} = \\lfloor (W - K + 2P)/S \\rfloor + 1$ for the spatial dims, and $(k\\cdot k\\cdot C_{in} + 1)\\cdot C_{out}$ for parameters. Remember the floor.",
              "solution": "(a) $W_{out} = \\lfloor (128 - 7 + 2\\cdot3)/2 \\rfloor + 1 = \\lfloor 127/2 \\rfloor + 1 = \\lfloor 63.5 \\rfloor + 1 = 63 + 1 = 64$. Same for height. Depth equals the 64 filters. Output shape: $(64, 64, 64)$. (This is exactly the first layer of ResNet.) (b) Each filter: $7\\cdot7\\cdot3 = 147$ weights $+ 1$ bias $= 148$. Total: $148 \\times 64 = 9472$ parameters."
            },
            {
              "prompt": "Compare a dense layer and a conv layer that both map a $(16,16,8)$ input to a $(16,16,8)$ output (the conv uses $3\\times3$ filters with 'same' padding). How many parameters does each use, and what is the ratio?",
              "hint": "Dense connects every input unit to every output unit (flatten both). Conv: $(k\\cdot k\\cdot C_{in}+1)\\cdot C_{out}$ with $C_{out}=8$.",
              "solution": "Inputs flattened: $16\\cdot16\\cdot8 = 2048$. Outputs flattened: $2048$. Dense params (with bias): $2048 \\times 2048 + 2048 = 4{,}196{,}352 \\approx 4.2\\times10^6$. Conv params: $(3\\cdot3\\cdot8 + 1)\\cdot8 = (72+1)\\cdot8 = 73\\cdot8 = 584$. Ratio $\\approx 4.2\\times10^6 / 584 \\approx 7{,}185\\times$ fewer parameters for the conv layer — while also encoding locality and translation equivariance."
            },
            {
              "prompt": "You stack four convolutions with stride 1: kernel sizes $3, 3, 5, 3$ (in order). What is the receptive field of a unit in the final feature map, measured in original input pixels?",
              "hint": "Apply $RF_\\ell = RF_{\\ell-1} + (K_\\ell - 1)$ starting from $RF_0 = 1$, layer by layer.",
              "solution": "$RF_0 = 1$. After layer 1 ($K=3$): $1 + 2 = 3$. After layer 2 ($K=3$): $3 + 2 = 5$. After layer 3 ($K=5$): $5 + 4 = 9$. After layer 4 ($K=3$): $9 + 2 = 11$. The final receptive field is $11\\times11$ input pixels. (Equivalently, $RF = 1 + \\sum(K_\\ell - 1) = 1 + (2+2+4+2) = 11$.)"
            }
          ]
        },
        {
          "id": "dl-pooling-and-cnn-architectures",
          "title": "Pooling and Classic CNN Architectures",
          "minutes": 14,
          "content": "<h3>From Convolution to Decisions: Why We Pool</h3>\n<p>A convolutional layer gives us a stack of feature maps — spatial grids where each location encodes \"how strongly does this learned pattern appear here?\" But for most vision tasks we eventually need a decision that is <strong>invariant to small spatial shifts</strong>. Whether a cat's ear is at pixel (40, 12) or (42, 13) should not change the answer \"this is a cat.\" Pooling is the primary tool early architectures used to build in this tolerance while simultaneously shrinking the spatial resolution so deeper layers can operate cheaply over larger effective receptive fields.</p>\n\n<p>Concretely, a pooling layer slides a small window (commonly $2\\times 2$) over each feature map independently and replaces each window with a single summary statistic. Two choices dominate:</p>\n\n<ul>\n<li><strong>Max pooling</strong>: output the maximum value in the window, $y = \\max_{(i,j)\\in W} x_{i,j}$.</li>\n<li><strong>Average pooling</strong>: output the mean, $y = \\frac{1}{|W|}\\sum_{(i,j)\\in W} x_{i,j}$.</li>\n</ul>\n\n<p>Crucially, pooling has <strong>no learnable parameters</strong> and is applied channel-wise: a $2\\times 2$ pool with stride 2 on a $H\\times W\\times C$ tensor produces an $\\frac{H}{2}\\times \\frac{W}{2}\\times C$ tensor — the depth (channel count) is untouched, only the spatial footprint shrinks.</p>\n\n<h4>Downsampling and output sizes</h4>\n<p>For a pooling window of size $k$ applied with stride $s$ (no padding), the output spatial size along one axis is</p>\n$$O = \\left\\lfloor \\frac{H - k}{s} \\right\\rfloor + 1.$$\n<p>The canonical case $k=2, s=2$ halves each spatial dimension and therefore quarters the number of spatial positions. This is exactly the same formula that governs a strided convolution — which is the key reason pooling is increasingly replaced by stride-2 convolutions in modern nets: a strided conv learns its downsampling instead of hard-coding it.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Max pooling answers \"did this feature fire <em>anywhere</em> nearby?\" — it keeps the strongest evidence and discards <em>where</em> exactly it occurred. That deliberate loss of position is what buys translation tolerance. Average pooling instead summarizes the typical activation level, which smooths noise but can dilute a single sharp, informative response.</p>\n</div>\n\n<h4>Why max usually wins for detection-style features</h4>\n<p>Consider a window where a strong edge detector fires once (value 9) and is silent elsewhere (values near 0). Max pooling returns 9 — the evidence survives. Average pooling over a $2\\times 2$ window returns $9/4 = 2.25$, attenuating the signal by a factor of four. Because most learned visual features are <em>sparse and localized</em> (an eye, a corner, a texture boundary), preserving the peak response is typically more useful than averaging, which is why max pooling became the default inside the body of classic CNNs.</p>\n\n<h4>The gradient of pooling (why this matters for learning)</h4>\n<p>Backpropagation flows differently through the two operators. For <strong>max pooling</strong>, the gradient is routed entirely to the position that produced the maximum (a \"winner-take-all\" gradient); all other positions in the window receive zero gradient. For <strong>average pooling</strong>, the upstream gradient $g$ is divided equally, so each input position receives $g/|W|$. This means max pooling creates sparse, sharply-targeted weight updates, while average pooling spreads credit smoothly — a subtle but real difference in optimization dynamics.</p>\n\n<h4>Global average pooling: a modern staple</h4>\n<p>A special and important variant is <strong>global average pooling (GAP)</strong>: collapse each entire $H\\times W$ feature map to a single number, turning a $H\\times W\\times C$ tensor into a length-$C$ vector. ResNet and most modern classifiers end with GAP feeding directly into one linear (fully-connected) classification layer. This eliminates the huge dense layers that dominated AlexNet/VGG parameter counts and acts as a strong structural regularizer — there is nothing to overfit in the pooling step itself.</p>\n\n<h3>The Architectural Evolution: LeNet → AlexNet → VGG → ResNet</h3>\n<p>The story of CNN architectures is largely a story about <strong>going deeper</strong> — and the engineering ideas that made depth trainable. Let's trace four landmark designs.</p>\n\n<h4>LeNet-5 (1998): the template</h4>\n<p>LeCun's LeNet-5 established the now-classic pattern: alternating <code>conv → pool</code> stages that progressively reduce spatial size while increasing channel depth, followed by fully-connected layers and a softmax. It used $5\\times 5$ convolutions, average (\"subsampling\") pooling, and tanh/sigmoid nonlinearities to classify $32\\times 32$ handwritten digits. It had roughly 60k parameters. The architecture worked, but compute and data of the era kept it small.</p>\n\n<h4>AlexNet (2012): depth meets GPUs and ReLU</h4>\n<p>AlexNet shattered the ImageNet benchmark and ignited the deep-learning era. It was conceptually LeNet scaled up and modernized, with several decisive innovations:</p>\n<ul>\n<li><strong>ReLU activations</strong> ($\\max(0, x)$) instead of saturating tanh/sigmoid — far faster convergence because the gradient doesn't vanish for positive inputs.</li>\n<li><strong>GPU training</strong>, making ~60 million parameters tractable.</li>\n<li><strong>Dropout</strong> in the fully-connected layers to combat overfitting.</li>\n<li><strong>Overlapping max pooling</strong> and large early filters ($11\\times 11$ stride 4, then $5\\times 5$).</li>\n</ul>\n<p>It had 8 learned layers (5 conv + 3 FC). The takeaway: with enough data, compute, and a non-saturating nonlinearity, deeper convolutional nets dramatically outperform hand-engineered features.</p>\n\n<h4>VGG (2014): the power of stacked 3×3 convolutions</h4>\n<p>VGG made one disciplined design choice and pushed it hard: use <strong>only $3\\times 3$ convolutions (stride 1, padding 1)</strong>, stacked in blocks, with $2\\times 2$ max pooling between blocks, going to 16 or 19 weight layers. The key insight is that <strong>a stack of small filters can match the receptive field of a larger filter while being deeper and cheaper</strong>.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>Two stacked $3\\times 3$ convolutions have the same $5\\times 5$ receptive field as a single $5\\times 5$ convolution; three stacked $3\\times 3$ convolutions match a $7\\times 7$. But the stack is both <em>more expressive</em> (two/three nonlinearities instead of one) and has <em>fewer parameters</em>. For $C$ input and $C$ output channels: three $3\\times 3$ layers cost $3\\cdot(3^2 C^2) = 27C^2$ weights, while one $7\\times 7$ layer costs $49C^2$ — about 45% fewer.</p>\n</div>\n\n<p>This \"small filters, more depth\" principle is one of the most durable lessons in CNN design and still underlies modern architectures. VGG's downside was size: its dense layers ballooned parameters to ~138 million, and naively going even deeper stopped helping.</p>\n\n<h4>The depth problem — and the degradation that ResNet diagnosed</h4>\n<p>By 2015 the field hit a wall. You might expect that adding more layers can only help — a deeper net can always represent a shallower one by setting extra layers to the identity. Yet in practice, plain networks beyond ~20 layers got <strong>worse on training error</strong>, not just test error. This was the surprise: the problem was <strong>not overfitting</strong> (a deeper net underfit harder), but an <strong>optimization difficulty</strong> the authors called <em>degradation</em>. Plain stacks of layers were simply hard for SGD to push toward good solutions, partly because identity mappings turned out to be hard to learn from scratch through many nonlinear layers.</p>\n\n<h4>ResNet (2015): residual / skip connections</h4>\n<p>ResNet's fix is elegant. Instead of asking a block of layers to learn a target mapping $H(x)$ directly, ask it to learn the <strong>residual</strong> $F(x) = H(x) - x$, then add the input back:</p>\n$$y = F(x, \\{W_i\\}) + x.$$\n<p>The $+x$ term is the <strong>skip (shortcut) connection</strong> — it carries the input forward unchanged and adds it to the block's output. Now if the optimal behavior for a block is to do nothing, the network only needs to drive the weights of $F$ toward zero, which is far easier than learning an exact identity through stacked nonlinear layers. A standard residual block is:</p>\n\n<pre><code>x ──────────────────────────┐ (identity shortcut)\n │                          │\n ▼                          │\n[3x3 conv → BN → ReLU]      │\n │                          │\n ▼                          │\n[3x3 conv → BN]             │\n │                          │\n ▼                          ▼\n └──────────►  (+)  ◄───────┘\n                │\n                ▼\n              ReLU\n                │\n                ▼\n                y</code></pre>\n\n<p>(Here BN is batch normalization, which ResNet uses after every convolution to stabilize training.) When the input and output have different shapes — e.g., after a stride-2 downsampling block doubles the channels — the shortcut uses a $1\\times 1$ convolution (a \"projection shortcut\") to match dimensions so the addition is well-defined.</p>\n\n<h4>Why skip connections enable very deep nets</h4>\n<p>The deepest mechanistic reason is in the backward pass. Differentiating $y = F(x) + x$ with respect to $x$ gives</p>\n$$\\frac{\\partial y}{\\partial x} = \\frac{\\partial F(x)}{\\partial x} + I.$$\n<p>That $+I$ (identity) term means gradients have a direct, un-attenuated path back to earlier layers: even if the learned part $\\frac{\\partial F}{\\partial x}$ shrinks toward zero, the gradient does not vanish — it still flows through the shortcut. Stacking many such blocks, the gradient to an early layer is a <em>sum</em> of paths rather than a single long <em>product</em> of small Jacobians, so it resists the exponential decay that plagues very deep plain nets. This is what made 50-, 101-, and even 152-layer networks not only trainable but better, reversing the degradation effect entirely.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Residual connections turned out to be far more than a CNN trick. The same idea — a layer computes a <em>delta</em> on top of an identity-preserving stream — is the backbone of the Transformer (every attention and feed-forward sub-layer is wrapped in <code>x + Sublayer(x)</code>). Skip connections are arguably the single most transferable architectural idea in modern deep learning, precisely because \"make it easy to do nothing, and easy for gradients to flow\" is a universal need once networks get deep.</p>\n</div>\n\n<h3>Worked Example: Tracing Shapes and Counting Parameters</h3>\n<p>Let's make the principles concrete by analyzing a small VGG-style block followed by a residual block, on a $32\\times 32\\times 64$ input tensor.</p>\n\n<p><strong>Step 1 — Two stacked $3\\times 3$ conv layers (VGG block), 64→64 channels, stride 1, padding 1.</strong> With padding 1 and stride 1, a $3\\times 3$ conv preserves spatial size:</p>\n$$O = \\left\\lfloor \\frac{32 + 2(1) - 3}{1}\\right\\rfloor + 1 = 32.$$\n<p>So the tensor stays $32\\times 32\\times 64$. Parameters per conv layer (ignoring bias) $= 3\\times 3\\times 64 \\times 64 = 36{,}864$; two layers $= 73{,}728$. Receptive field of this pair: $5\\times 5$ — same as a single $5\\times 5$ conv that would cost $5\\times 5\\times 64\\times 64 = 102{,}400$ weights. We get a larger effective field <em>and</em> an extra nonlinearity for ~28% fewer parameters.</p>\n\n<p><strong>Step 2 — Max pool $2\\times 2$, stride 2.</strong></p>\n$$O = \\left\\lfloor \\frac{32 - 2}{2}\\right\\rfloor + 1 = 16.$$\n<p>Output: $16\\times 16\\times 64$. Spatial positions drop from $32^2 = 1024$ to $16^2 = 256$ — a $4\\times$ reduction. No parameters added.</p>\n\n<p><strong>Step 3 — A residual block at 64 channels on the $16\\times 16\\times 64$ tensor.</strong> Two $3\\times 3$ convs (64→64, padding 1) keep the shape at $16\\times 16\\times 64$. Because input and output shapes match, the shortcut is a plain identity — zero extra parameters for the skip. The block computes $y = \\text{ReLU}\\big(F(x) + x\\big)$.</p>\n\n<p><strong>Sanity check on the residual logic.</strong> Suppose at this point in training the ideal thing for the block to do is leave the features unchanged. A plain (non-residual) two-layer block would have to learn weights that reproduce the identity function exactly through two convolutions and a ReLU — a genuinely awkward target. The residual block only needs $F(x)\\to 0$, i.e., drive its conv weights toward zero, which BN and weight decay actively encourage. That asymmetry in difficulty is the entire reason the residual formulation trains better.</p>\n\n<p><strong>Final shape:</strong> $16\\times 16\\times 64$, achieved with two design ideas — small stacked filters for cheap expressivity, and a skip connection that keeps both the forward identity and the backward gradient flowing.</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Pooling</strong> downsamples spatially (parameter-free, channel-wise) to build translation tolerance and cut compute; max pooling preserves peak feature responses and is standard, average/global-average pooling smooths and is common at the head.</li>\n<li>Output size obeys $O = \\lfloor (H-k)/s\\rfloor + 1$; $2\\times 2$/stride-2 halves each spatial dimension.</li>\n<li><strong>LeNet → AlexNet → VGG → ResNet</strong> is a march toward depth: AlexNet added ReLU/dropout/GPU scale; VGG showed stacked $3\\times 3$ filters beat single large filters; ResNet solved the <em>degradation</em> problem that blocked very deep plain nets.</li>\n<li><strong>Residual blocks</strong> learn $F(x)$ and output $F(x)+x$; the identity shortcut makes \"do nothing\" easy to learn and gives gradients an un-attenuated path ($\\partial y/\\partial x = \\partial F/\\partial x + I$), enabling networks 100+ layers deep.</li>\n</ul>",
          "mcq": [
            {
              "q": "A plain (non-residual) 56-layer CNN achieves *higher training error* than an otherwise-identical 20-layer CNN. What does this primarily demonstrate, and what did ResNet introduce to address it?",
              "choices": [
                "Overfitting; ResNet added dropout to the deep layers",
                "The degradation/optimization problem (not overfitting); ResNet added identity skip connections so blocks learn a residual $F(x)=H(x)-x$",
                "Vanishing data; ResNet added more training images",
                "Exploding parameters; ResNet replaced all convs with pooling"
              ],
              "answer": 1,
              "explain": "Worse *training* error rules out overfitting and reveals an optimization/degradation failure. Skip connections let a block learn $F(x)$ and output $F(x)+x$, making identity mappings (and gradient flow) easy."
            },
            {
              "q": "Why do two stacked $3\\times 3$ convolutions often replace a single $5\\times 5$ convolution in VGG-style networks?",
              "choices": [
                "They have a smaller receptive field, which reduces overfitting",
                "They cover the same $5\\times 5$ receptive field but with more nonlinearity and fewer parameters",
                "They eliminate the need for any pooling layers",
                "A $5\\times 5$ conv cannot be backpropagated through"
              ],
              "answer": 1,
              "explain": "Two $3\\times 3$ layers match a $5\\times 5$ receptive field, add an extra ReLU (more expressivity), and for $C$ channels cost $18C^2$ vs $25C^2$ parameters."
            },
            {
              "q": "For a $2\\times 2$ max pooling layer with stride 2 applied to a $28\\times 28\\times 32$ tensor, what is the output shape, and how do the channels change?",
              "choices": [
                "$14\\times 14\\times 32$; channels unchanged because pooling is applied per-channel",
                "$14\\times 14\\times 16$; channels are halved along with spatial size",
                "$28\\times 28\\times 32$; pooling only changes values, not shape",
                "$14\\times 14\\times 64$; pooling doubles channels to compensate for lost resolution"
              ],
              "answer": 0,
              "explain": "Output size $= \\lfloor(28-2)/2\\rfloor+1 = 14$ per spatial axis, and pooling operates independently on each channel so the channel count (32) is unchanged."
            },
            {
              "q": "In a residual block $y = F(x) + x$, why does the skip connection help gradients reach early layers in a very deep network?",
              "choices": [
                "It multiplies gradients by a large constant at each layer",
                "Because $\\partial y/\\partial x = \\partial F/\\partial x + I$, the identity term gives gradients an un-attenuated path that does not vanish even if $\\partial F/\\partial x \\to 0$",
                "It removes the nonlinearities, so the network becomes linear",
                "It stores gradients in memory and replays them later"
              ],
              "answer": 1,
              "explain": "Differentiating the shortcut yields an additive identity $I$, so gradient flow has a direct route backward; deep gradients become a sum of paths rather than a long product of small Jacobians."
            },
            {
              "q": "During backpropagation through a $2\\times 2$ max pooling layer, an upstream gradient $g$ arrives at one output position. How is it distributed back to the four input positions of that window?",
              "choices": [
                "It is split equally, so each of the four inputs receives $g/4$",
                "It is routed entirely to the single input that produced the maximum; the other three receive zero",
                "It is routed to the input with the smallest value, since pooling discards the rest",
                "All four inputs receive the full gradient $g$, since they all contributed to the window"
              ],
              "answer": 1,
              "explain": "Max pooling has a winner-take-all gradient: only the argmax position (the input that was selected as the max in the forward pass) receives the upstream gradient $g$, while the other three positions in the window receive zero."
            },
            {
              "q": "Modern classifiers like ResNet replace the large dense (fully-connected) layers of AlexNet/VGG with global average pooling (GAP) before the final linear layer. What does GAP do to an $H\\times W\\times C$ tensor, and why is this beneficial?",
              "choices": [
                "It produces an $H\\times W\\times 1$ map by averaging over channels, reducing depth to save memory",
                "It collapses each feature map to one number, yielding a length-$C$ vector, which removes the parameter-heavy dense layers and acts as a structural regularizer",
                "It doubles the channel count to $2C$ to increase classifier capacity before softmax",
                "It applies a learned $C\\times C$ weight matrix to mix channels, adding trainable parameters at the head"
              ],
              "answer": 1,
              "explain": "GAP averages each entire $H\\times W$ map into a single value, turning the tensor into a length-$C$ vector. This eliminates the huge dense layers and acts as a regularizer, since the pooling operation itself has no parameters to overfit."
            },
            {
              "q": "A learned edge detector fires strongly at exactly one location in a $2\\times 2$ window (value 8) and is near zero elsewhere. Why is max pooling typically preferred over average pooling for such features inside a classic CNN's body?",
              "choices": [
                "Average pooling would output 8 as well, so the choice is arbitrary",
                "Max pooling preserves the peak response (8), whereas average pooling attenuates it to about $8/4 = 2$, diluting a sparse, informative signal",
                "Average pooling adds learnable parameters that overfit, while max pooling does not",
                "Max pooling increases the receptive field whereas average pooling shrinks it"
              ],
              "answer": 1,
              "explain": "Because learned features are sparse and localized, max pooling keeps the strong peak (8), while average pooling divides it across the window, $(8+0+0+0)/4 = 2$, washing out the evidence."
            },
            {
              "q": "AlexNet (2012) was conceptually 'LeNet scaled up' but introduced ReLU activations $\\max(0,x)$ in place of LeNet's saturating tanh/sigmoid. What was the primary benefit of this swap?",
              "choices": [
                "ReLU added learnable parameters that increased model capacity",
                "ReLU does not saturate for positive inputs, so its gradient does not vanish there, giving far faster convergence",
                "ReLU made the network invariant to translations, removing the need for pooling",
                "ReLU reduced the parameter count from 60 million to roughly 60 thousand"
              ],
              "answer": 1,
              "explain": "Saturating nonlinearities like tanh/sigmoid flatten and kill gradients in their tails, whereas ReLU keeps a constant gradient of 1 for positive inputs, so training converges much faster."
            }
          ],
          "flashcards": [
            {
              "front": "What is the purpose of a pooling layer in a CNN?",
              "back": "To downsample feature maps spatially (parameter-free, applied per-channel), reducing resolution and compute while building tolerance to small translations. Max pooling keeps the strongest local response; average pooling summarizes the mean."
            },
            {
              "front": "Output spatial size of a pooling/conv window of size $k$, stride $s$ (no padding)?",
              "back": "$O = \\lfloor (H - k)/s \\rfloor + 1$. For $k=2, s=2$ this halves each spatial dimension (quarters the number of positions)."
            },
            {
              "front": "What does a ResNet residual block compute, and why is that formulation easier to train?",
              "back": "$y = \\text{ReLU}(F(x) + x)$, where $F$ is two stacked conv+BN layers and $+x$ is the identity skip. Learning the residual makes 'do nothing' trivial (drive $F\\to 0$) instead of learning an exact identity through nonlinear layers."
            },
            {
              "front": "What problem did ResNet solve that blocked very deep plain networks?",
              "back": "The *degradation* problem: adding layers to plain nets eventually increased *training* error (an optimization failure, not overfitting). Skip connections fixed it, enabling 50-152+ layer nets."
            },
            {
              "front": "Why use stacked $3\\times 3$ convs instead of one large filter (VGG principle)?",
              "back": "A stack of $n$ $3\\times 3$ convs matches the receptive field of a $(2n+1)\\times(2n+1)$ conv with more nonlinearities and fewer parameters (e.g., three $3\\times 3$ = $27C^2$ vs one $7\\times 7$ = $49C^2$)."
            },
            {
              "front": "One-line characterization of LeNet → AlexNet → VGG → ResNet.",
              "back": "A progression toward depth: LeNet set the conv-pool-FC template; AlexNet scaled it with ReLU/dropout/GPUs; VGG showed stacked $3\\times 3$ filters; ResNet added skip connections to train 100+ layer nets."
            }
          ],
          "homework": [
            {
              "prompt": "An input image tensor is $224\\times 224\\times 3$. It passes through: (a) a $3\\times 3$ conv, stride 1, padding 1, 64 filters; (b) a $2\\times 2$ max pool, stride 2; (c) another $3\\times 3$ conv, stride 1, padding 1, 128 filters; (d) another $2\\times 2$ max pool, stride 2. Give the output shape after each step.",
              "hint": "Use $O=\\lfloor(H+2p-k)/s\\rfloor+1$. A $3\\times 3$ conv with padding 1, stride 1 preserves spatial size; the number of filters becomes the new channel count. Pooling halves spatial size and leaves channels alone.",
              "solution": "(a) $3\\times 3$ conv, pad 1, stride 1: $O=\\lfloor(224+2-3)/1\\rfloor+1 = 224$, channels become 64 → $224\\times 224\\times 64$. (b) $2\\times 2$ pool stride 2: $O=\\lfloor(224-2)/2\\rfloor+1 = 112$, channels unchanged → $112\\times 112\\times 64$. (c) $3\\times 3$ conv, pad 1, stride 1: spatial preserved at 112, channels become 128 → $112\\times 112\\times 128$. (d) $2\\times 2$ pool stride 2: $O=\\lfloor(112-2)/2\\rfloor+1=56$ → $56\\times 56\\times 128$."
            },
            {
              "prompt": "Compare parameter counts (ignore biases) for processing a $C=128$ channel input to $128$ output channels using: (i) one $5\\times 5$ convolution, versus (ii) two stacked $3\\times 3$ convolutions. Which has the larger receptive field, and which has fewer parameters?",
              "hint": "Conv params (no bias) $= k_h \\cdot k_w \\cdot C_{in} \\cdot C_{out}$. Recall that two $3\\times 3$ layers stack to a $5\\times 5$ receptive field.",
              "solution": "(i) One $5\\times 5$: $5\\cdot 5\\cdot 128\\cdot 128 = 25\\cdot 16384 = 409{,}600$ params; receptive field $5\\times 5$. (ii) Two $3\\times 3$: each is $3\\cdot 3\\cdot 128\\cdot 128 = 147{,}456$; two layers $= 294{,}912$ params; receptive field also $5\\times 5$. They have the *same* receptive field, but the stacked $3\\times 3$ version uses ~28% fewer parameters ($294{,}912$ vs $409{,}600$) and adds an extra nonlinearity, increasing expressivity. This is the core VGG argument."
            },
            {
              "prompt": "Explain, using the backward pass, why a 100-layer residual network trains more successfully than a 100-layer plain network. Reference the gradient through a residual block $y = F(x) + x$.",
              "hint": "Differentiate $y = F(x) + x$ with respect to $x$. Then think about what happens when you chain many such derivatives versus chaining many plain-layer Jacobians.",
              "solution": "For a residual block, $\\partial y/\\partial x = \\partial F/\\partial x + I$. The additive identity $I$ guarantees a direct gradient path: even if the learned term $\\partial F/\\partial x$ becomes small, the gradient still flows backward un-attenuated through the shortcut. Chaining $L$ residual blocks, the gradient to an early layer expands into a *sum* of many paths (including the all-identity path), rather than a single long *product* of Jacobians. In a plain net, the early-layer gradient is a product of $L$ matrices; if their norms are <1 the product decays exponentially (vanishing gradients), making deep plain nets hard to optimize — exactly the degradation effect. The skip connections preserve gradient magnitude and also make identity mappings easy to represent (just drive $F\\to 0$), so the deep residual net trains to lower error."
            }
          ]
        },
        {
          "id": "dl-transfer-learning",
          "title": "Transfer Learning and Fine-Tuning",
          "minutes": 12,
          "content": "<h3>Why Reuse a Network at All?</h3>\n\n<p>Training a deep convolutional network from scratch is expensive: ImageNet-scale models see over a million labeled images across hundreds of GPU-hours. Most real problems — classifying defects on a production line, sorting medical scans, recognizing your company's products — come with a few hundred or a few thousand labeled examples. The central insight of <strong>transfer learning</strong> is that you do not have to start from zero. A network trained on a large, diverse dataset has already learned a rich, reusable vocabulary of visual features, and you can <em>transfer</em> that vocabulary to your task.</p>\n\n<p>This works because of a striking empirical regularity in how CNNs organize themselves. The features they learn are arranged in a hierarchy of increasing abstraction:</p>\n\n<ul>\n  <li><strong>Early layers</strong> learn generic, almost universal primitives: oriented edges, color blobs, Gabor-like filters. These look nearly identical no matter what dataset you train on — they resemble the receptive fields found in the mammalian visual cortex.</li>\n  <li><strong>Middle layers</strong> compose primitives into textures, patterns, and simple parts (corners, repeated motifs, fur, mesh).</li>\n  <li><strong>Late layers</strong> assemble parts into task-specific concepts (\"dog face,\" \"car wheel\") and are tightly coupled to the original label set.</li>\n</ul>\n\n<div class=\"callout violet\">\n  <div class=\"c-tag\">Big picture</div>\n  <p>The reason pretraining transfers is that the <em>lower</em> layers of the feature hierarchy are largely <strong>task-agnostic</strong>. Natural images everywhere are made of edges, textures, and gradients; a filter bank that captures those is useful for almost any visual task. Only the top of the network is specialized to the source labels. Transfer learning keeps the reusable bottom and re-specializes the top.</p>\n</div>\n\n<h3>The Anatomy of a Backbone</h3>\n\n<p>A pretrained classifier conceptually splits into two pieces. Write the full model as a composition</p>\n\n$$\\hat{y} = h_\\phi\\big(f_\\theta(x)\\big),$$\n\n<p>where $f_\\theta$ is the <strong>backbone</strong> (also called the feature extractor or body) with parameters $\\theta$, and $h_\\phi$ is the <strong>head</strong> — typically a global pooling step followed by one or more fully-connected layers ending in a softmax over the source classes. The backbone maps an image $x$ to an <strong>embedding</strong> $z = f_\\theta(x) \\in \\mathbb{R}^d$ (for ResNet-50, $d = 2048$). The head maps that embedding to class scores.</p>\n\n<p>When you adopt a backbone for a new task with $K$ classes, the original head is useless — it predicts the wrong label set. So the first move in <em>every</em> transfer recipe is the same:</p>\n\n<h4>Replacing the classification head</h4>\n\n<p>Discard $h_\\phi$ and attach a fresh head $h_\\psi$ with a randomly initialized final layer of output dimension $K$. The body's output dimension $d$ stays fixed (it is determined by the backbone architecture), so the new head is just</p>\n\n$$\\hat{y} = \\mathrm{softmax}\\big(W z + b\\big), \\qquad W \\in \\mathbb{R}^{K \\times d},\\; b \\in \\mathbb{R}^{K}.$$\n\n<p>Sometimes the new head is a small MLP (e.g. $d \\to 256 \\to K$ with a ReLU and dropout) rather than a single linear layer. Either way, the new head's weights start random and <em>must</em> be trained — they have never seen your data.</p>\n\n<div class=\"callout\">\n  <div class=\"c-tag\">Intuition</div>\n  <p>Think of the backbone as a \"universal image-to-vector translator\" and the head as a \"tiny classifier that reads that vector.\" Transfer learning reuses the expensive translator and only retrains the cheap reader — and optionally fine-tunes the translator's accent to your domain.</p>\n</div>\n\n<h3>Two Strategies: Feature Extraction vs. Fine-Tuning</h3>\n\n<p>There are two canonical ways to use the backbone, distinguished by which parameters you allow gradient descent to change.</p>\n\n<h4>1. Feature extraction (freeze the backbone)</h4>\n\n<p>Set the backbone parameters $\\theta$ to non-trainable: $\\nabla_\\theta \\mathcal{L} = 0$ is never applied; only the head $\\psi$ is updated. In code you set <code>requires_grad = False</code> on the body and exclude it from the optimizer. The backbone becomes a fixed function, so you can even precompute embeddings $z_i = f_\\theta(x_i)$ once for every training image and then train the head on the cached vectors — extremely fast, since each \"epoch\" is just logistic regression on $d$-dimensional features.</p>\n\n<p>You are effectively asserting: <em>the source features are already good enough for my task; I just need to learn the decision boundary on top of them.</em></p>\n\n<h4>2. Fine-tuning (unfreeze with a lower learning rate)</h4>\n\n<p>Allow some or all of the backbone parameters to update too. You typically unfreeze the <strong>later</strong> blocks (the task-specific ones) while keeping the earliest blocks frozen, then continue training the whole thing end-to-end. The crucial detail is the learning rate:</p>\n\n<div class=\"callout sage\">\n  <div class=\"c-tag\">Key fact</div>\n  <p>Fine-tune the backbone with a learning rate <strong>10×–100× smaller</strong> than you would use for the fresh head. The pretrained weights are already near a good solution; a large step would overwrite (catastrophically forget) the useful features before the network has adapted. The random head, by contrast, needs large steps to learn quickly.</p>\n</div>\n\n<h4>Discriminative (layer-wise) learning rates</h4>\n\n<p>Combining these two ideas gives <strong>discriminative learning rates</strong>: assign a smaller learning rate to lower (more generic, closer to the input) layers and a larger one to higher layers. A common parameterization sweeps geometrically from $\\eta_{\\min}$ at the bottom to $\\eta_{\\max}$ at the top. If the backbone has $L$ groups indexed $\\ell = 1,\\dots,L$ (bottom to top), one schedule is</p>\n\n$$\\eta_\\ell = \\eta_{\\max}\\cdot \\gamma^{\\,L-\\ell}, \\qquad 0 < \\gamma < 1.$$\n\n<p>With $\\gamma = 0.3$ and $L = 4$, the top group trains at $\\eta_{\\max}$ and the bottom group at $0.3^{3}\\eta_{\\max} \\approx 0.027\\,\\eta_{\\max}$. The rationale follows directly from the hierarchy: generic edge detectors barely need changing, so give them tiny steps; the top adapts most, so give it the largest step. Freezing is just the limiting case $\\eta_\\ell = 0$.</p>\n\n<h3>Choosing a Strategy: The Size × Similarity Quadrant</h3>\n\n<p>Which strategy you pick depends on two axes of your <em>target</em> dataset relative to the <em>source</em> dataset (usually ImageNet): how <strong>much</strong> data you have, and how <strong>similar</strong> your images are to the source domain. This yields the classic four-cell decision table.</p>\n\n<table>\n  <thead>\n    <tr><th></th><th>Similar to source</th><th>Different from source</th></tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Small dataset</strong></td>\n      <td><strong>Freeze backbone, train a linear head.</strong> Features already fit; too little data to fine-tune safely (you'd overfit and corrupt the backbone).</td>\n      <td><strong>Risky cell.</strong> Freeze an <em>early/middle</em> cut of the backbone and train a head/SVM on those mid-level features (late features may not transfer). Lean hard on augmentation; consider a different/smaller model.</td>\n    </tr>\n    <tr>\n      <td><strong>Large dataset</strong></td>\n      <td><strong>Fine-tune most of the network</strong> with a low LR. Plenty of data to adapt safely; you'll squeeze out the last few points of accuracy.</td>\n      <td><strong>Fine-tune the whole network</strong> (low LR), or even train from scratch if the domain is truly alien. Pretraining still helps as a warm start.</td>\n    </tr>\n  </tbody>\n</table>\n\n<p>Two principles unify the table:</p>\n\n<ul>\n  <li><strong>More data ⇒ more you can safely unfreeze.</strong> Fine-tuning adds millions of trainable parameters; with few examples you simply lack the signal to estimate them, and you overfit. Freezing is a strong, almost free regularizer because it slashes the number of free parameters.</li>\n  <li><strong>Less similarity ⇒ cut the backbone lower.</strong> If your domain (say, grayscale X-rays or satellite imagery) differs from natural photos, the late, specialized features are the wrong abstractions. Use earlier, more generic features and let the head do more work.</li>\n</ul>\n\n<div class=\"callout violet\">\n  <div class=\"c-tag\">Connection to ML</div>\n  <p>This is the bias–variance tradeoff in disguise. Freezing reduces the effective hypothesis space (fewer free parameters ⇒ lower variance, higher bias). Fine-tuning enlarges it (lower bias, higher variance). You want the smallest hypothesis space that still contains a good solution for your task — which is exactly why dataset size (how much you can fight variance) and domain similarity (how much bias the frozen features impose) are the two governing variables.</p>\n</div>\n\n<h3>A Recommended Two-Phase Recipe</h3>\n\n<p>In practice, even when you intend to fine-tune, you should not unfreeze immediately. A randomly initialized head produces large, noisy gradients in its first steps; if the backbone is unfrozen, those gradients flow backward and damage the pretrained weights before the head has stabilized. The robust recipe:</p>\n\n<ol>\n  <li><strong>Phase 1 — warm up the head.</strong> Freeze the backbone, train only the new head until its loss plateaus. (BatchNorm note: keep BN layers in <em>eval</em> mode while frozen so their running statistics aren't disturbed.)</li>\n  <li><strong>Phase 2 — fine-tune.</strong> Unfreeze the upper blocks, drop the learning rate (and/or apply discriminative LRs), and continue training end-to-end. Use early stopping on a validation set.</li>\n</ol>\n\n<h3>Worked Example: A 1,200-Image Flower Classifier</h3>\n\n<p>Suppose you have 1,200 photos across $K = 10$ flower species — a <strong>small</strong> dataset that is <strong>similar</strong> to ImageNet (both are natural color photos of objects). The quadrant says: freeze and train a head. Let's reason through it concretely with a ResNet-50 backbone ($d = 2048$).</p>\n\n<p><strong>Step 1 — count the parameters.</strong> ResNet-50 has ~23M backbone parameters. A single linear head has $K \\times d + K = 10 \\times 2048 + 10 = 20{,}490$ parameters. If you fine-tuned everything you'd be fitting 23M parameters from 1,200 examples — roughly 19,000 parameters per example, a recipe for memorization. Freezing leaves only ~20K trainable parameters, about 17 parameters per example: tractable.</p>\n\n<p><strong>Step 2 — feature extraction setup.</strong> Run every training image once through the frozen backbone to get embeddings $z_i \\in \\mathbb{R}^{2048}$. Cache them. Now training the head is just multinomial logistic regression on cached vectors — seconds per epoch, no backprop through the CNN.</p>\n\n<p><strong>Step 3 — train the head</strong> with cross-entropy and weight decay, plus data augmentation re-run through the backbone if you want augmentation diversity (otherwise cache once). Suppose this reaches 92% validation accuracy.</p>\n\n<p><strong>Step 4 — optional fine-tune.</strong> To push further, unfreeze the last residual stage (<code>layer4</code>) only, set the head LR to $10^{-3}$ and the <code>layer4</code> LR to $10^{-5}$ (a 100× discriminative ratio), and train a few epochs with early stopping. This might lift accuracy to 94% — but watch the validation curve: if it diverges from training accuracy, you've unfrozen too much for your data size, and you should re-freeze.</p>\n\n<p>A minimal PyTorch sketch of the freeze-then-fine-tune flow:</p>\n\n<pre><code>import torch, torch.nn as nn\nfrom torchvision import models\n\nmodel = models.resnet50(weights=\"IMAGENET1K_V2\")\n\n# Phase 1: freeze the backbone, replace the head\nfor p in model.parameters():\n    p.requires_grad = False\nmodel.fc = nn.Linear(model.fc.in_features, 10)   # fresh head, requires_grad=True by default\n\nopt = torch.optim.AdamW(model.fc.parameters(), lr=1e-3, weight_decay=1e-4)\n# ... train until the head's val loss plateaus ...\n\n# Phase 2: unfreeze the last block, discriminative LRs\nfor p in model.layer4.parameters():\n    p.requires_grad = True\n\nopt = torch.optim.AdamW([\n    {\"params\": model.fc.parameters(),     \"lr\": 1e-3},   # large LR for the head\n    {\"params\": model.layer4.parameters(), \"lr\": 1e-5},   # 100x smaller for the backbone\n], weight_decay=1e-4)\n# ... continue training with early stopping ...\n</code></pre>\n\n<p>Notice the optimizer is given <em>parameter groups</em> with different learning rates — that single construct expresses both freezing (omit a group) and discriminative LRs (different <code>lr</code> per group).</p>\n\n<h3>Catastrophic Forgetting and Why the Low LR Matters</h3>\n\n<p>The pretrained weights $\\theta_0$ sit in a basin of the loss landscape that encodes generic visual knowledge. A gradient step $\\theta \\leftarrow \\theta - \\eta\\,\\nabla_\\theta \\mathcal{L}$ moves you a distance proportional to $\\eta\\|\\nabla_\\theta\\mathcal{L}\\|$. Early in fine-tuning the head is random, so $\\mathcal{L}$ is high and gradients are large; with a normal learning rate the very first updates can fling $\\theta$ out of the good basin, destroying features faster than the task signal can rebuild them. This is <strong>catastrophic forgetting</strong>. Shrinking $\\eta$ (and warming up the head first) keeps you in the neighborhood of $\\theta_0$, so fine-tuning becomes a gentle <em>adaptation</em> rather than a restart. Formally, a tiny learning rate keeps $\\|\\theta - \\theta_0\\|$ small — an implicit regularizer toward the pretrained solution, much like an $L_2$ penalty $\\lambda\\|\\theta-\\theta_0\\|^2$.</p>\n\n<h3>Summary</h3>\n\n<ul>\n  <li>A pretrained model = reusable <strong>backbone</strong> + task-specific <strong>head</strong>; always replace the head for a new label set.</li>\n  <li><strong>Feature extraction</strong> freezes the backbone (fast, strong regularizer, best for small/similar data). <strong>Fine-tuning</strong> unfreezes it with a low LR (best for large data; adapts features to your domain).</li>\n  <li>Choose by the <strong>size × similarity</strong> quadrant: more data ⇒ unfreeze more; less similar ⇒ cut the backbone lower.</li>\n  <li><strong>Discriminative learning rates</strong> give lower (generic) layers smaller steps and higher (specific) layers larger steps; freezing is the $\\eta = 0$ limit.</li>\n  <li>Pretraining transfers because early/middle features are task-agnostic; a low LR plus head warm-up prevents catastrophic forgetting.</li>\n</ul>",
          "mcq": [
            {
              "q": "You have 800 labeled images of natural-photo product shots ($K=12$ classes), very similar to ImageNet. Which strategy is best?",
              "choices": [
                "Train a ResNet-50 from random initialization on the 800 images",
                "Freeze the backbone and train only a new classification head",
                "Unfreeze the entire backbone and fine-tune all 23M parameters at the same LR as the head",
                "Replace the head and fine-tune all layers at a learning rate 5x larger than normal"
              ],
              "answer": 1,
              "explain": "Small dataset + high similarity is the canonical feature-extraction cell: the pretrained features already fit, and 800 images can't safely estimate millions of backbone parameters without overfitting. Freezing acts as a strong regularizer."
            },
            {
              "q": "Why should backbone layers be fine-tuned with a much smaller learning rate than the freshly added head?",
              "choices": [
                "Smaller layers mathematically require smaller learning rates for gradient descent to converge",
                "The backbone has more parameters, so each one should move less to keep total movement constant",
                "The pretrained weights are already near a good solution; large steps cause catastrophic forgetting before the network adapts, while the random head needs large steps to learn",
                "A small learning rate lets you skip data augmentation on the backbone inputs"
              ],
              "answer": 2,
              "explain": "The pretrained weights encode useful generic features and sit in a good basin; a large step (especially driven by the random head's noisy early gradients) overwrites them. The random head, having learned nothing, needs large steps."
            },
            {
              "q": "Your target domain is grayscale ultrasound images — a LARGE dataset but very DIFFERENT from natural photos. What is the most sensible approach?",
              "choices": [
                "Freeze the entire backbone and train only a linear head on its final-layer features",
                "Fine-tune the whole network end-to-end with a low learning rate (or train from scratch if the domain is truly alien), since you have ample data",
                "Use the frozen late-layer features directly with no head at all",
                "Train only the first convolutional layer and freeze everything above it"
              ],
              "answer": 1,
              "explain": "Large data means you can safely adapt many parameters; low similarity means the specialized late features don't transfer well, so the network must re-specialize. Pretraining still helps as a warm start, but the late layers in particular need to change."
            },
            {
              "q": "Under discriminative learning rates $\\eta_\\ell = \\eta_{\\max}\\,\\gamma^{\\,L-\\ell}$ with $\\gamma=0.3$, $L=4$ (layers indexed 1=bottom to 4=top), what is the LR of the bottom-most layer group relative to $\\eta_{\\max}$?",
              "choices": [
                "Equal to $\\eta_{\\max}$",
                "$0.3\\,\\eta_{\\max}$",
                "About $0.027\\,\\eta_{\\max}$",
                "Zero (the bottom layer is always frozen)"
              ],
              "answer": 2,
              "explain": "For $\\ell=1$: $\\eta_1=\\eta_{\\max}\\cdot 0.3^{\\,4-1}=\\eta_{\\max}\\cdot 0.3^3=0.027\\,\\eta_{\\max}$. The generic bottom layers get the smallest steps; freezing would be the separate $\\eta=0$ limit, not implied here."
            },
            {
              "q": "In the decomposition $\\hat{y} = h_\\phi(f_\\theta(x))$ for a ResNet-50 ($d=2048$) being adapted to a new task with $K=7$ classes, what is the very first structural change you must make to reuse this network?",
              "choices": [
                "Discard the backbone $f_\\theta$ and retrain it from scratch on the 7 classes",
                "Keep the original head $h_\\phi$ but freeze it so it cannot change",
                "Discard the head $h_\\phi$ and attach a new head whose final layer outputs $K=7$ scores, because the original head predicts the wrong label set",
                "Reduce the embedding dimension $d$ from 2048 to 7 by retraining the backbone"
              ],
              "answer": 2,
              "explain": "The backbone is reused for its general features while the source-specific head is replaced with a new one whose output dimension matches the target's $K=7$ classes. Retraining the backbone from scratch throws away the transferable features, freezing the old head keeps the wrong label set, and the embedding dimension $d$ is unrelated to $K$."
            },
            {
              "q": "According to the lesson's feature hierarchy, why do the EARLY layers of a pretrained CNN transfer so well to almost any new visual task?",
              "choices": [
                "They are tightly coupled to the source label set, so they encode the most discriminative information",
                "They learn generic, near-universal primitives like oriented edges and color blobs that natural images everywhere are built from",
                "They contain the largest number of parameters, giving them the most capacity to adapt",
                "They assemble parts into task-specific concepts like 'dog face' that generalize across domains"
              ],
              "answer": 1,
              "explain": "Early layers learn task-agnostic low-level features (edges, color blobs, Gabor-like filters) that are useful for essentially any natural-image task, which is why the reusable bottom of the network transfers. Coupling to source labels and high-level part assembly ('dog face') are properties of the LATE layers, not the early ones."
            },
            {
              "q": "A practitioner claims their target dataset, made of natural photographs, is so different from ImageNet that even the early-layer filters must be relearned from scratch. Why does the lesson's reasoning make this claim mostly unjustified?",
              "choices": [
                "Because the head $h_\\phi$ already captures all low-level structure, making the backbone irrelevant",
                "Because retraining early layers always destroys the embedding $z = f_\\theta(x)$",
                "Because ImageNet contains every possible image, so no target dataset can ever differ from it",
                "Because natural images everywhere are composed of edges, textures, and gradients, so a low-level filter bank is useful regardless of the specific source labels"
              ],
              "answer": 3,
              "explain": "Only the top of the network is specialized to the source labels; the low-level edge/texture/gradient filters are largely task-agnostic and remain useful for other natural-image domains. The head captures high-level structure (not low-level), retraining does not 'always destroy' the embedding, and ImageNet plainly does not contain every possible image."
            },
            {
              "q": "In the lesson's terminology, which statement correctly maps the components of $\\hat{y} = h_\\phi(f_\\theta(x))$?",
              "choices": [
                "$f_\\theta$ is the backbone producing an embedding $z \\in \\mathbb{R}^d$, and $h_\\phi$ is the head doing global pooling plus fully-connected layers ending in a softmax",
                "$f_\\theta$ is the head producing class scores, and $h_\\phi$ is the backbone extracting features",
                "Both $f_\\theta$ and $h_\\phi$ are heads, while the backbone is an unnamed third component",
                "$h_\\phi$ is the backbone that outputs $z$, and $f_\\theta$ is the softmax classifier"
              ],
              "answer": 0,
              "explain": "By definition in the lesson, $f_\\theta$ (backbone / feature extractor) maps the image to an embedding $z \\in \\mathbb{R}^d$, and $h_\\phi$ (head) applies global pooling and fully-connected layers to produce class scores via softmax. The other options swap the two roles."
            }
          ],
          "flashcards": [
            {
              "front": "What is the difference between a frozen layer and a trainable layer during transfer learning?",
              "back": "A frozen layer has requires_grad=False (or is excluded from the optimizer): its weights are NOT updated, so it acts as a fixed function. A trainable layer receives gradient updates each step. Freezing reduces free parameters, regularizing against overfitting on small data."
            },
            {
              "front": "Why does pretraining on a large source dataset transfer to a new visual task?",
              "back": "CNN features are hierarchical: early/middle layers learn task-agnostic primitives (edges, textures, parts) that are useful for almost any natural-image task. Only the late layers are specialized to the source labels, so the reusable bottom transfers and only the top needs re-specializing."
            },
            {
              "front": "What are discriminative (layer-wise) learning rates, and why use them?",
              "back": "Assign smaller learning rates to lower (generic, input-near) layers and larger rates to higher (task-specific) layers, e.g. $\\eta_\\ell=\\eta_{\\max}\\gamma^{L-\\ell}$ with $\\gamma<1$. Rationale: generic edge detectors barely need changing; top layers adapt most. Freezing is the $\\eta=0$ limit."
            },
            {
              "front": "Transfer strategy by dataset size and similarity to source?",
              "back": "Small+similar: freeze backbone, train a linear head. Large+similar: fine-tune most layers, low LR. Small+different: freeze an early/middle cut, train head on mid-level features, heavy augmentation. Large+different: fine-tune the whole net (low LR), or train from scratch."
            },
            {
              "front": "What is catastrophic forgetting in fine-tuning, and how do you prevent it?",
              "back": "Large gradient steps push pretrained weights out of their good loss basin, destroying useful features before the task adapts — especially from a random head's noisy early gradients. Prevent it by (1) warming up the head while the backbone is frozen, then (2) fine-tuning with a 10x-100x smaller learning rate."
            },
            {
              "front": "What must you always do to a pretrained classifier's head for a new task, and why?",
              "back": "Discard the original head and attach a fresh, randomly-initialized final layer of output size $K$ (your number of classes): $\\hat y=\\mathrm{softmax}(Wz+b)$, $W\\in\\mathbb{R}^{K\\times d}$. The original head predicts the wrong label set, and the new head's weights have never seen your data so they must be trained."
            }
          ],
          "homework": [
            {
              "prompt": "You adopt a ResNet-50 backbone (output embedding dimension $d=2048$, ~23M backbone parameters) for a task with $K=5$ classes and only 600 labeled images. (a) How many parameters does a single linear head add? (b) Roughly how many training examples per parameter do you have under feature extraction (frozen backbone) versus full fine-tuning? (c) Based on the size x similarity reasoning, which strategy should you choose if the images are ordinary photographs?",
              "hint": "A linear head has $K\\times d + K$ parameters. Compare the trainable-parameter count to the 600 examples in each case.",
              "solution": "(a) Head parameters $= K\\,d + K = 5\\times 2048 + 5 = 10{,}245$. (b) Feature extraction: only the ~10,245 head parameters are trainable, giving $600/10{,}245 \\approx 0.06$ examples per parameter — but the backbone is fixed, so you're really fitting a 5-way logistic regression on 2048-D features, which is tractable. Full fine-tuning: ~23,010,245 trainable parameters and only 600 examples, i.e. ~38,000 parameters PER example — wildly underdetermined, guaranteed to overfit/memorize. (c) Small + similar => freeze the backbone and train only the head (feature extraction). Optionally, after the head plateaus, gently fine-tune just the last block (layer4) at a 100x-smaller LR with early stopping, re-freezing if validation accuracy diverges."
            },
            {
              "prompt": "Using the discriminative learning-rate schedule $\\eta_\\ell = \\eta_{\\max}\\,\\gamma^{\\,L-\\ell}$ with $L=5$ layer groups (group 1 = bottom/input-near, group 5 = top/head), $\\eta_{\\max}=10^{-3}$, and $\\gamma=0.5$: (a) compute the learning rate for each of the five groups, and (b) explain in one sentence why this ordering matches the feature hierarchy.",
              "hint": "$\\eta_\\ell=\\eta_{\\max}\\cdot\\gamma^{L-\\ell}$. For group $\\ell$, the exponent is $L-\\ell = 5-\\ell$.",
              "solution": "(a) Group 5: $10^{-3}\\cdot 0.5^{0}=1.0\\times10^{-3}$. Group 4: $10^{-3}\\cdot 0.5^{1}=5.0\\times10^{-4}$. Group 3: $10^{-3}\\cdot 0.5^{2}=2.5\\times10^{-4}$. Group 2: $10^{-3}\\cdot 0.5^{3}=1.25\\times10^{-4}$. Group 1: $10^{-3}\\cdot 0.5^{4}=6.25\\times10^{-5}$. (b) The bottom groups encode generic, task-agnostic features (edges, textures) that barely need changing, so they get the smallest steps, while the top groups are task-specific and must adapt most, so they get the largest steps."
            },
            {
              "prompt": "A colleague fine-tunes a pretrained network for a small dataset by immediately unfreezing all layers and using the SAME learning rate ($10^{-2}$) for the whole network, including the freshly initialized head. Training accuracy quickly hits ~100% but validation accuracy is poor and erratic. Diagnose the two distinct mistakes and propose a corrected procedure.",
              "hint": "Think about (1) what the random head's early gradients do to the backbone at a high LR, and (2) parameter count versus dataset size on a small dataset.",
              "solution": "Mistake 1 - catastrophic forgetting from a high LR + cold head: the random head produces large, noisy gradients in its first steps; flowing back through an unfrozen backbone at LR $10^{-2}$, they push the pretrained weights out of their good basin, destroying the transferable features before any adaptation occurs. Mistake 2 - overfitting from too many trainable parameters on a small dataset: unfreezing all layers makes millions of parameters trainable, which a small dataset cannot estimate, so the model memorizes the training set (~100% train, poor/erratic val). Corrected procedure: (1) Freeze the backbone (keep BatchNorm in eval mode) and train only the new head until its validation loss plateaus. (2) Unfreeze only the upper block(s), drop the learning rate by 10x-100x and/or apply discriminative LRs (tiny for lower layers, larger for the head), and continue training with weight decay, data augmentation, and early stopping on the validation set. If validation accuracy still diverges from training accuracy, re-freeze more of the backbone."
            }
          ]
        }
      ]
    },
    {
      "id": "dl-sequences-and-attention",
      "title": "Sequence Models and the Attention Revolution",
      "lessons": [
        {
          "id": "dl-rnn-lstm-gru",
          "title": "Recurrent Networks: RNNs, LSTMs, and GRUs",
          "minutes": 16,
          "content": "<h3>1. Why sequences need a different inductive bias</h3>\n<p>A plain feedforward network maps a fixed-size vector to an output. But language, audio, sensor streams, and time series are <strong>variable-length</strong> and <strong>order-dependent</strong>: \"dog bites man\" and \"man bites dog\" share the same bag of words yet mean opposite things. We need an architecture whose computation (a) accepts inputs one step at a time, (b) handles arbitrary length, and (c) lets earlier inputs influence later outputs. The <strong>recurrent neural network (RNN)</strong> achieves this by carrying a <em>state</em> forward through time.</p>\n\n<p>The core idea is parameter sharing across positions. Instead of learning a separate transformation for each time step (which would be impossible for unbounded length), we learn <strong>one</strong> function $f$ and apply it repeatedly:</p>\n\n$$h_t = f(h_{t-1}, x_t)$$\n\n<p>Here $x_t$ is the input at step $t$, and $h_t$ is the hidden state — a learned, compressed summary of everything seen up to and including step $t$. The same parameters define $f$ at every step, exactly as a convolution shares one filter across all spatial positions. This is what makes the RNN a sequence model rather than just a deep MLP.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of $h_t$ as the network's \"running memory\" or working notes. At each step it reads the new token $x_t$, updates its notes given what it already remembered ($h_{t-1}$), and the notes are the only channel through which the past reaches the future. If something didn't make it into $h_t$, it is gone.</p></div>\n\n<h3>2. The vanilla (Elman) RNN</h3>\n<p>The classic concrete instantiation uses an affine map followed by a squashing nonlinearity:</p>\n\n$$h_t = \\tanh(W_{hh}\\, h_{t-1} + W_{xh}\\, x_t + b_h), \\qquad \\hat{y}_t = W_{hy}\\, h_t + b_y$$\n\n<p>where $W_{xh}\\in\\mathbb{R}^{d_h\\times d_x}$ maps the input into hidden space, $W_{hh}\\in\\mathbb{R}^{d_h\\times d_h}$ is the recurrent (state-to-state) matrix, and $W_{hy}$ produces the output (logits, for classification, fed through a softmax). The state is usually initialized $h_0=\\mathbf{0}$. The three weight matrices and two biases are <strong>shared across all $t$</strong>.</p>\n\n<p>An RNN can be \"unrolled\" into a feedforward graph: copy the cell $T$ times, wire $h_{t-1}$ into the $t$-th copy, and you have a deep network whose depth equals the sequence length — but with all layers tied to the same weights.</p>\n\n<h4>Output configurations</h4>\n<ul>\n<li><strong>Sequence-to-one</strong> (e.g. sentiment of a review): read the whole sequence, predict from $h_T$.</li>\n<li><strong>Sequence-to-sequence, aligned</strong> (e.g. part-of-speech tagging): emit $\\hat{y}_t$ at every step.</li>\n<li><strong>Encoder-decoder</strong> (e.g. translation): one RNN encodes the source into a context vector, a second RNN decodes the target. This bottleneck is precisely what attention was later invented to relax.</li>\n</ul>\n\n<h3>3. Backpropagation through time (BPTT)</h3>\n<p>Training uses ordinary backprop on the unrolled graph; the only twist is that gradients from every time step accumulate into the <em>same</em> shared weights. This is called <strong>backpropagation through time</strong>.</p>\n\n<p>Let the total loss be $\\mathcal{L}=\\sum_{t=1}^{T}\\mathcal{L}_t$. The gradient with respect to the recurrent weights collects contributions from all steps:</p>\n\n$$\\frac{\\partial \\mathcal{L}}{\\partial W_{hh}} = \\sum_{t=1}^{T} \\frac{\\partial \\mathcal{L}_t}{\\partial W_{hh}}, \\qquad \\frac{\\partial \\mathcal{L}_t}{\\partial W_{hh}} = \\sum_{k=1}^{t} \\frac{\\partial \\mathcal{L}_t}{\\partial h_t}\\,\\frac{\\partial h_t}{\\partial h_k}\\,\\frac{\\partial h_k}{\\partial W_{hh}}$$\n\n<p>The dangerous factor is $\\dfrac{\\partial h_t}{\\partial h_k}$, the Jacobian of how a later state depends on an earlier one. By the chain rule it is a <strong>product</strong> of one-step Jacobians:</p>\n\n$$\\frac{\\partial h_t}{\\partial h_k} = \\prod_{i=k+1}^{t} \\frac{\\partial h_i}{\\partial h_{i-1}} = \\prod_{i=k+1}^{t} \\operatorname{diag}\\!\\big(\\tanh'(z_i)\\big)\\, W_{hh}$$\n\n<p>where $z_i = W_{hh}h_{i-1}+W_{xh}x_i+b_h$. The product spans $t-k$ factors — one per time step between the cause and the effect.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Practical note</div><p>For long sequences we use <strong>truncated BPTT</strong>: process the stream in chunks of, say, 100 steps, carry the hidden state forward across chunks (forward dependency preserved) but only backpropagate gradients within each chunk. This bounds memory and compute at the cost of not learning dependencies longer than the truncation window.</p></div>\n\n<h3>4. Vanishing and exploding gradients</h3>\n<p>Because $\\partial h_t/\\partial h_k$ is a product of $t-k$ matrices, its magnitude grows or shrinks roughly <strong>geometrically</strong> in the gap. To see why, ignore the $\\tanh'$ term for a moment and consider $W_{hh}$ raised to a power. Let its largest singular value be $\\sigma_{\\max}$. Then $\\big\\|W_{hh}\\big\\|^{\\,t-k}$ behaves like $\\sigma_{\\max}^{\\,t-k}$:</p>\n\n<ul>\n<li>If $\\sigma_{\\max} < 1$, the product decays toward $\\mathbf{0}$ exponentially — the <strong>vanishing gradient</strong>. Gradients from distant steps are negligible, so the network cannot learn dependencies more than ~10–20 steps apart.</li>\n<li>If $\\sigma_{\\max} > 1$, the product blows up — the <strong>exploding gradient</strong>. Updates become huge and unstable (NaNs).</li>\n</ul>\n\n<p>The $\\tanh'$ factor makes vanishing worse, not better: $\\tanh'(z)=1-\\tanh^2(z)\\in(0,1]$, equal to 1 only at $z=0$ and shrinking toward 0 as the unit saturates. So the contractive $\\tanh$ derivative multiplies in at every step too.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">The asymmetry that matters</div><p>Exploding gradients are <em>annoying but fixable</em>: <strong>gradient clipping</strong> (rescale the gradient if its norm exceeds a threshold) tames them in one line. Vanishing gradients are <em>insidious</em>: there is no value to clip — the signal is simply gone. This is the central obstacle that LSTMs and GRUs were designed to overcome.</p></div>\n\n<h4>Worked example: the gradient really does vanish</h4>\n<p>Take a scalar (1-D) RNN for clarity, with recurrent weight $w$ and $h_i=\\tanh(w\\,h_{i-1}+\\dots)$. The one-step derivative is $\\partial h_i/\\partial h_{i-1}=\\tanh'(z_i)\\cdot w$. Suppose the unit is mildly active so $\\tanh'(z_i)\\approx 0.5$ on average, and $w=1.2$. Then the per-step factor is $0.5\\times 1.2 = 0.6$. Over a gap of 30 steps:</p>\n\n$$\\frac{\\partial h_t}{\\partial h_{t-30}} \\approx 0.6^{30} \\approx 2.2\\times 10^{-7}.$$\n\n<p>A gradient signal that should connect a word 30 tokens back to the current prediction has been attenuated by nearly seven orders of magnitude — effectively zero in float32 once it competes with nearer, larger contributions. Now flip $w$ to $2.5$ with $\\tanh'\\approx 0.9$: the factor is $2.25$, and $2.25^{30}\\approx 3.7\\times 10^{10}$ — explosion. Notice how a small change in the recurrent dynamics flips the regime entirely; staying near the knife-edge $\\approx 1$ for all directions and all inputs is essentially impossible for a single shared $W_{hh}$ passed through a saturating nonlinearity.</p>\n\n<h3>5. The LSTM: a gated memory cell</h3>\n<p>The Long Short-Term Memory network (Hochreiter &amp; Schmidhuber, 1997) fixes vanishing gradients by adding a second state — the <strong>cell state</strong> $c_t$ — that is updated <em>additively</em> rather than by repeated matrix multiplication, and by introducing learned <strong>gates</strong> that control reading, writing, and forgetting.</p>\n\n<p>Let $\\sigma$ be the logistic sigmoid (outputs in $(0,1)$, used as a soft on/off knob) and $\\odot$ elementwise product. The LSTM computes, at each step:</p>\n\n$$\n\\begin{aligned}\nf_t &= \\sigma(W_f[h_{t-1}, x_t] + b_f) &&\\text{forget gate} \\\\\ni_t &= \\sigma(W_i[h_{t-1}, x_t] + b_i) &&\\text{input gate} \\\\\no_t &= \\sigma(W_o[h_{t-1}, x_t] + b_o) &&\\text{output gate} \\\\\n\\tilde{c}_t &= \\tanh(W_c[h_{t-1}, x_t] + b_c) &&\\text{candidate cell} \\\\\nc_t &= f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t &&\\text{cell update} \\\\\nh_t &= o_t \\odot \\tanh(c_t) &&\\text{hidden / output}\n\\end{aligned}\n$$\n\n<p>where $[h_{t-1}, x_t]$ denotes concatenation. Read the gates as decisions:</p>\n<ul>\n<li><strong>Forget gate $f_t$</strong>: how much of each old memory coordinate to keep. $f_t\\approx 1$ means \"remember\", $f_t\\approx 0$ means \"erase\".</li>\n<li><strong>Input gate $i_t$</strong>: how much of the new candidate $\\tilde{c}_t$ to write into memory.</li>\n<li><strong>Output gate $o_t$</strong>: how much of the (squashed) cell to expose as the hidden state that the rest of the network sees.</li>\n</ul>\n\n<h4>Why gating defeats vanishing gradients</h4>\n<p>The crucial line is the cell update $c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t$. Differentiating along the cell-state path:</p>\n\n$$\\frac{\\partial c_t}{\\partial c_{t-1}} = \\operatorname{diag}(f_t).$$\n\n<p>So the gradient flowing back through the cell state is repeatedly multiplied by the <strong>forget gate</strong>, not by a fixed weight matrix passed through a saturating tanh. When the network <em>wants</em> to remember something (it learns $f_t\\approx 1$ for those coordinates), the product $\\prod_i f_i \\approx 1$ and the gradient passes through nearly undamped across hundreds of steps — the famous <strong>constant error carousel</strong>. The cell state acts like a gradient \"highway\" (the same additive-skip idea that ResNets later used in the spatial direction).</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The fix is not a bigger network or a different optimizer — it is an <em>architectural</em> change that makes the default behavior of the memory path be \"copy, untouched.\" Gradients vanish only if the model <em>chooses</em> to forget (sets $f_t$ small), and then forgetting is exactly the right thing for them to do. It is common to initialize the forget-gate bias $b_f$ to a positive value (e.g. $+1$) so the cell starts out in remember-mode and long-range learning gets off the ground.</p></div>\n\n<h3>6. The GRU: the same idea, simplified</h3>\n<p>The Gated Recurrent Unit (Cho et al., 2014) merges the cell and hidden states into one and uses only two gates, cutting parameters by roughly a quarter:</p>\n\n$$\n\\begin{aligned}\nz_t &= \\sigma(W_z[h_{t-1}, x_t] + b_z) &&\\text{update gate} \\\\\nr_t &= \\sigma(W_r[h_{t-1}, x_t] + b_r) &&\\text{reset gate} \\\\\n\\tilde{h}_t &= \\tanh\\big(W_h[\\,r_t \\odot h_{t-1},\\, x_t] + b_h\\big) &&\\text{candidate} \\\\\nh_t &= (1 - z_t)\\odot h_{t-1} + z_t \\odot \\tilde{h}_t &&\\text{interpolation}\n\\end{aligned}\n$$\n\n<p>The <strong>update gate $z_t$</strong> plays the role of input and forget at once via a convex combination (\"leaky\" interpolation between the old state and the new candidate): $z_t\\approx 0$ copies the past unchanged (preserving gradient flow exactly as the LSTM's $f_t\\approx 1$ does), $z_t\\approx 1$ replaces it. The <strong>reset gate $r_t$</strong> decides how much past state to use when proposing the candidate; $r_t\\approx 0$ lets the unit drop irrelevant history and behave momentarily like a feedforward layer on $x_t$. There is no separate output gate and no distinct cell state.</p>\n\n<h3>7. RNN vs LSTM vs GRU: the tradeoffs</h3>\n<ul>\n<li><strong>Vanilla RNN</strong>: smallest and fastest, one gate-free recurrence. Cannot reliably learn dependencies beyond ~10–20 steps because of vanishing gradients. Mostly of pedagogical and historical interest now.</li>\n<li><strong>LSTM</strong>: separate cell state + 3 gates ($\\approx 4$ weight matrices of size $d_h\\times(d_h+d_x)$). Most expressive of the three, the default for hard long-range tasks, but the most parameters and the slowest per step.</li>\n<li><strong>GRU</strong>: 2 gates, no separate cell state ($\\approx 3$ matrices). Fewer parameters, faster, and often <em>matches</em> the LSTM on moderate-data tasks; can underperform it on the very longest dependencies. A strong default when compute or data is limited.</li>\n</ul>\n<p>Empirically the LSTM-vs-GRU choice is dataset-dependent and usually settled by experiment; both decisively beat the vanilla RNN whenever long context matters.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>All three are inherently <strong>sequential</strong>: $h_t$ depends on $h_{t-1}$, so you cannot parallelize across time within a sequence, and information from step 1 to step 1000 must still squeeze through 999 update operations. The Transformer's self-attention removes both limits — every position attends directly to every other in one parallel operation, turning an $O(T)$-depth path into $O(1)$ and unlocking GPU-scale training. That is the \"attention revolution\" this module builds toward; the gating intuition you just learned (additive paths preserve gradients) is exactly why residual connections make those deep Transformer stacks trainable too.</p></div>\n\n<h3>8. Summary</h3>\n<ul>\n<li>RNNs model sequences with a shared recurrence $h_t=f(h_{t-1},x_t)$; the hidden state is the sole memory channel.</li>\n<li>BPTT trains the unrolled graph; the long-range Jacobian is a product of per-step Jacobians, so gradients vanish ($\\sigma_{\\max}<1$) or explode ($\\sigma_{\\max}>1$) exponentially in the gap.</li>\n<li>Clipping fixes explosion; gating fixes vanishing. LSTMs add an additively-updated cell state guarded by forget/input/output gates, giving a near-lossless gradient highway. GRUs achieve the same with one fewer gate and no separate cell state.</li>\n</ul>",
          "mcq": [
            {
              "q": "In an LSTM, the gradient of the cell state satisfies $\\partial c_t/\\partial c_{t-1} = \\operatorname{diag}(f_t)$. Why does this mitigate the vanishing-gradient problem that plagues vanilla RNNs?",
              "choices": [
                "Because $f_t$ is always equal to 1, so the gradient is never attenuated",
                "Because the backward signal through the cell is multiplied by the (learnable) forget gate rather than by a fixed recurrent matrix passed through a saturating tanh, so when the model learns $f_t\\approx 1$ the gradient passes nearly undamped across many steps",
                "Because the sigmoid in $f_t$ has a larger derivative than the tanh in a vanilla RNN",
                "Because the cell state is reset to zero at every step, preventing accumulation"
              ],
              "answer": 1,
              "explain": "The additive cell update makes the per-step Jacobian the diagonal forget gate. When the network chooses to remember ($f_t\\approx 1$), the product of these factors stays near 1, so gradients survive over long gaps — the constant error carousel."
            },
            {
              "q": "An RNN's long-range Jacobian is $\\partial h_t/\\partial h_k = \\prod_{i=k+1}^{t}\\operatorname{diag}(\\tanh'(z_i))\\,W_{hh}$. If the largest singular value of $W_{hh}$ is $\\sigma_{\\max}>1$, what typically happens, and what is the standard remedy?",
              "choices": [
                "Gradients vanish; remedy is gradient clipping",
                "Gradients explode; remedy is gradient clipping (rescale by norm)",
                "Gradients explode; there is no remedy short of changing architecture",
                "Gradients vanish; remedy is initializing the forget-gate bias high"
              ],
              "answer": 1,
              "explain": "$\\sigma_{\\max}>1$ makes the product grow geometrically (exploding gradients). Clipping the gradient norm caps the update size cheaply. Vanishing ($\\sigma_{\\max}<1$) is the hard case with no value to clip."
            },
            {
              "q": "Which statement about the GRU's update gate $z_t$ in $h_t=(1-z_t)\\odot h_{t-1}+z_t\\odot\\tilde{h}_t$ is correct?",
              "choices": [
                "$z_t\\approx 0$ replaces the hidden state entirely with the new candidate",
                "$z_t\\approx 0$ copies the previous state through unchanged, preserving gradient flow much like an LSTM forget gate near 1",
                "$z_t$ controls how much past state is used to compute the candidate (that is the reset gate's job)",
                "The GRU needs a separate cell state for $z_t$ to function"
              ],
              "answer": 1,
              "explain": "With $z_t\\approx 0$, $h_t\\approx h_{t-1}$: the past is carried forward losslessly, giving the same gradient-highway behavior as the LSTM forget gate near 1. The reset gate $r_t$, not $z_t$, gates the past inside the candidate."
            },
            {
              "q": "Why are RNNs/LSTMs/GRUs inherently slower to train on long sequences than Transformers, regardless of the gating fix?",
              "choices": [
                "Because gating gates require more floating-point operations than attention",
                "Because the recurrence $h_t=f(h_{t-1},x_t)$ is sequential, so steps cannot be parallelized across time and the path length between distant positions is $O(T)$",
                "Because LSTMs always overfit and need more epochs",
                "Because backpropagation through time is not differentiable"
              ],
              "answer": 1,
              "explain": "Each state depends on the previous one, forcing sequential computation across the length-$T$ sequence and an $O(T)$ information path. Self-attention connects all positions in one parallel $O(1)$-depth operation."
            },
            {
              "q": "In the vanilla Elman RNN, $h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$, why is the same matrix $W_{hh}$ reused at every time step rather than learning a distinct matrix per position?",
              "choices": [
                "Parameter sharing lets one learned function $f$ apply to sequences of arbitrary, unbounded length and generalize across positions",
                "Tying the weights guarantees the gradients cannot vanish or explode during backpropagation through time",
                "Distinct per-step matrices would make the model unable to represent order-dependent meaning like 'dog bites man' vs 'man bites dog'",
                "Sharing $W_{hh}$ is required so the hidden state $h_t$ can be initialized to zero"
              ],
              "answer": 0,
              "explain": "Parameter sharing across positions is what lets a single function handle variable/unbounded length, exactly analogous to a convolution filter shared across spatial positions. Tying weights does not prevent vanishing/exploding gradients (that is the core RNN problem), order can still be modeled by the recurrence, and zero-initialization is unrelated."
            },
            {
              "q": "An RNN is described as being 'unrolled' into a feedforward graph. What is the effective depth of this unrolled network for an input sequence of length $T$?",
              "choices": [
                "Equal to $T$, with all layers tied to the same weights",
                "Equal to the hidden dimension $d_h$, independent of $T$",
                "Equal to $T$, but each layer has independently learned weights",
                "Equal to the number of weight matrices, which is three"
              ],
              "answer": 0,
              "explain": "Unrolling copies the cell $T$ times so depth equals sequence length, but every copy shares the same tied weights. Depth scales with $T$, not with $d_h$ or the number of weight matrices, and the copies are not independent."
            },
            {
              "q": "In a sequence-to-one configuration (e.g. predicting the sentiment of a whole review), from which quantity is the prediction produced?",
              "choices": [
                "The final hidden state $h_T$, which summarizes the entire sequence",
                "The average of all hidden states $h_1, \\dots, h_T$",
                "The first hidden state $h_1$, since it sees the freshest input",
                "The recurrent matrix $W_{hh}$ applied to the raw input vector"
              ],
              "answer": 0,
              "explain": "Sequence-to-one reads the whole sequence and predicts from the final hidden state $h_T$, the compressed summary of everything seen. Averaging is a different (pooling) design, $h_1$ has seen only the first token, and $W_{hh}$ is a parameter, not a readout."
            },
            {
              "q": "The lesson stresses that 'if something didn't make it into $h_t$, it is gone.' What architectural fact about the vanilla RNN does this intuition capture?",
              "choices": [
                "The hidden state $h_t$ is the only channel through which past inputs can influence future outputs",
                "The tanh nonlinearity permanently deletes any negative-valued features at each step",
                "Inputs $x_t$ are discarded immediately after being read and never affect later states",
                "The output $\\hat{y}_t$ feeds back into $h_{t+1}$ as the sole memory mechanism"
              ],
              "answer": 0,
              "explain": "Because the recurrence passes information only via $h_{t-1}$, the hidden state is the single bottleneck connecting the past to the future, so anything not encoded in it is lost. tanh does not delete negatives, inputs do influence later states (through $h_t$), and in an Elman RNN it is the hidden state, not the output, that is fed forward."
            }
          ],
          "flashcards": [
            {
              "front": "What is the defining recurrence of an RNN, and what role does $h_t$ play?",
              "back": "$h_t = f(h_{t-1}, x_t)$ with parameters of $f$ shared across all time steps. The hidden state $h_t$ is a learned compressed summary of the sequence up to step $t$ and is the only channel through which the past influences the future."
            },
            {
              "front": "Why do vanilla-RNN gradients vanish or explode over long sequences?",
              "back": "The long-range Jacobian $\\partial h_t/\\partial h_k=\\prod_{i=k+1}^{t}\\operatorname{diag}(\\tanh'(z_i))W_{hh}$ is a product of $t-k$ matrices, so its norm scales roughly as $\\sigma_{\\max}^{t-k}$: $\\sigma_{\\max}<1$ decays to zero (vanish), $\\sigma_{\\max}>1$ blows up (explode)."
            },
            {
              "front": "What is the LSTM cell state $c_t$ and why is it the key to long-range memory?",
              "back": "A second state updated additively: $c_t=f_t\\odot c_{t-1}+i_t\\odot\\tilde{c}_t$. Since $\\partial c_t/\\partial c_{t-1}=\\operatorname{diag}(f_t)$, the gradient is multiplied by the forget gate (not a fixed weight × tanh'). With $f_t\\approx 1$ it forms a near-lossless gradient highway — the constant error carousel."
            },
            {
              "front": "Name the three LSTM gates and what each controls.",
              "back": "Forget gate $f_t$: how much of old cell memory to keep. Input gate $i_t$: how much of the new candidate $\\tilde{c}_t$ to write. Output gate $o_t$: how much of $\\tanh(c_t)$ to expose as $h_t$. All are sigmoids in $(0,1)$."
            },
            {
              "front": "How does the GRU simplify the LSTM?",
              "back": "Merges cell and hidden state into one $h_t$ and uses two gates: update gate $z_t$ (interpolates old vs new state, $h_t=(1-z_t)\\odot h_{t-1}+z_t\\odot\\tilde{h}_t$, combining forget+input) and reset gate $r_t$ (how much past to use in the candidate). No separate cell state, no output gate; ~25% fewer parameters."
            },
            {
              "front": "RNN vs LSTM vs GRU: the headline tradeoff.",
              "back": "Vanilla RNN: smallest/fastest but can't learn dependencies beyond ~10-20 steps (vanishing). LSTM: most parameters/expressive, best for hard long-range tasks. GRU: fewer parameters, faster, often matches LSTM, occasionally weaker on the longest dependencies. Both beat the vanilla RNN when long context matters."
            }
          ],
          "homework": [
            {
              "prompt": "Consider a scalar RNN with $h_i=\\tanh(w\\,h_{i-1}+b)$. Suppose over a stretch the average one-step derivative is $\\partial h_i/\\partial h_{i-1}\\approx 0.7$. (a) Estimate the magnitude of $\\partial h_t/\\partial h_{t-50}$. (b) What recurrent weight regime would instead cause explosion, and what cheap technique controls it?",
              "hint": "The long-range derivative is the product of per-step derivatives; for a roughly constant factor $a$ over a gap $g$ it is $a^g$. Recall $\\partial h_i/\\partial h_{i-1}=\\tanh'(z_i)\\cdot w$ and that $\\tanh'\\in(0,1]$.",
              "solution": "(a) The 50-step derivative is the product of 50 one-step factors $\\approx 0.7^{50}$. Compute: $\\log_{10}(0.7^{50})=50\\log_{10}0.7\\approx 50(-0.155)=-7.75$, so $0.7^{50}\\approx 1.8\\times 10^{-8}$. The gradient connecting a step 50 positions back is essentially zero — a vanishing gradient. (b) If the per-step factor exceeds 1 — e.g. a large $w$ with the unit not saturating, so $\\tanh'\\cdot w>1$ — the product grows geometrically (e.g. $1.3^{50}\\approx 5\\times 10^{5}$), an exploding gradient. The standard cheap fix is gradient clipping: if $\\|g\\|>\\tau$, rescale $g\\leftarrow \\tau\\,g/\\|g\\|$, capping the update magnitude while preserving its direction."
            },
            {
              "prompt": "Show formally that the LSTM cell state provides a gradient path that need not vanish. Starting from $c_t=f_t\\odot c_{t-1}+i_t\\odot\\tilde{c}_t$, derive $\\partial c_t/\\partial c_{t-1}$ (treating the gates as approximately constant w.r.t. $c_{t-1}$ for the dominant path), and explain the condition under which the gradient is preserved across $n$ steps.",
              "hint": "Differentiate the additive update elementwise. The candidate $\\tilde{c}_t$ and gates depend on $h_{t-1}$, not directly on $c_{t-1}$ along the highlighted path, so the dominant term comes from $f_t\\odot c_{t-1}$.",
              "solution": "Differentiate elementwise: $\\partial c_t/\\partial c_{t-1}=\\operatorname{diag}(f_t)$ (the candidate and gates feed off $h_{t-1}$, not $c_{t-1}$ directly, so they contribute only smaller, indirect terms; the dominant direct path is through $f_t\\odot c_{t-1}$). Chaining over $n$ steps gives $\\partial c_t/\\partial c_{t-n}\\approx\\prod_{i=t-n+1}^{t}\\operatorname{diag}(f_i)=\\operatorname{diag}\\big(\\prod_i f_i\\big)$. Because each $f_i\\in(0,1)$, the product cannot explode; and if the network learns $f_i\\approx 1$ for the coordinates it wants to preserve, the product stays near 1 and the gradient passes through across all $n$ steps with little attenuation — the constant error carousel. Contrast with the vanilla RNN, whose per-step factor is $\\operatorname{diag}(\\tanh'(z_i))W_{hh}$, a fixed (un-gated) matrix through a saturating nonlinearity that has no built-in way to stay near identity. Initializing $b_f$ positive biases $f_i$ toward 1 early in training to bootstrap long-range learning."
            },
            {
              "prompt": "You must deploy a sequence model on a mobile device with tight latency and memory budgets, training on a moderate-sized dataset where dependencies span up to ~40 steps. Argue for choosing a GRU over both a vanilla RNN and an LSTM, citing concrete architectural reasons.",
              "hint": "Weigh three axes: long-range capability, parameter/compute cost, and empirical performance at moderate data scale.",
              "solution": "Reject the vanilla RNN first: with dependencies up to ~40 steps, its gradients vanish (per-step contractive factor compounded ~40 times drives the long-range Jacobian to near zero), so it cannot reliably learn the task — capability is the binding constraint. Between LSTM and GRU, both solve vanishing via gating (LSTM forget gate / GRU update gate near the copy regime give a near-identity memory path), so both are capable at 40 steps. The deciding factors are the deployment budget and data scale: the GRU has 2 gates and no separate cell state — roughly 3 weight matrices of size $d_h\\times(d_h+d_x)$ versus the LSTM's 4 — so ~25% fewer parameters, less memory, and fewer FLOPs per step, which directly helps mobile latency and footprint. On moderate-sized data the GRU typically matches the LSTM (its main disadvantage, the very-longest dependencies, doesn't apply at 40 steps and fewer parameters can even reduce overfitting). Conclusion: GRU — it retains the gating that makes 40-step learning possible while being the cheapest such option. (One could still A/B test LSTM vs GRU, but the GRU is the principled default here.)"
            }
          ]
        },
        {
          "id": "dl-embeddings-and-tokenization",
          "title": "Embeddings and Representing Discrete Inputs",
          "minutes": 12,
          "content": "<h3>The Problem: How Do You Feed a Word to a Neural Network?</h3>\n<p>Neural networks consume vectors of real numbers and produce vectors of real numbers. But language — and most interesting discrete data (words, characters, product IDs, categorical features) — is <em>symbolic</em>. The token <code>\"cat\"</code> is not a number. Before any sequence model can run, we must answer a deceptively deep question: how do we represent a discrete symbol as a vector?</p>\n<p>The naive answer is the <strong>one-hot encoding</strong>. Fix a vocabulary $V = \\{w_1, w_2, \\dots, w_{|V|}\\}$. Represent token $w_i$ as the vector $e_i \\in \\mathbb{R}^{|V|}$ that is $1$ in coordinate $i$ and $0$ everywhere else. So with a 50,000-word vocabulary, <code>\"cat\"</code> might be the 50,000-dimensional vector that is all zeros except a single $1$.</p>\n<p>This is correct in the sense that it is injective (every token gets a distinct vector), but it is a terrible <em>representation</em> for learning. Let us see precisely why.</p>\n\n<h3>Why One-Hot Is Inadequate</h3>\n<h4>1. It is enormous and wasteful</h4>\n<p>The dimensionality equals the vocabulary size. For real corpora that is $10^4$ to $10^6$. The very first weight matrix in your network must therefore have a row (or column) for every word, and almost every entry of every input vector is zero. You are spending memory and compute to multiply by zeros.</p>\n\n<h4>2. All tokens are equidistant — it encodes no similarity</h4>\n<p>This is the deep problem. Take any two distinct one-hot vectors $e_i$ and $e_j$. Their dot product is</p>\n$$e_i \\cdot e_j = \\sum_{k} (e_i)_k (e_j)_k = 0 \\quad (i \\neq j),$$\n<p>and their squared Euclidean distance is</p>\n$$\\lVert e_i - e_j \\rVert^2 = \\lVert e_i \\rVert^2 + \\lVert e_j \\rVert^2 - 2\\,e_i \\cdot e_j = 1 + 1 - 0 = 2.$$\n<p>So <em>every</em> pair of distinct words is exactly $\\sqrt{2}$ apart and perfectly orthogonal. The geometry says <code>\"cat\"</code> is exactly as similar to <code>\"dog\"</code> as it is to <code>\"democracy\"</code>. The representation throws away all relational structure before learning even begins.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>One-hot vectors are a set of mutually perpendicular unit vectors — a coordinate axis per word. They are perfect <em>labels</em> but useless <em>features</em>: they tell the model <em>which</em> word it is, but nothing about <em>what the word is like</em>.</p>\n</div>\n\n<h4>3. It cannot generalize across words</h4>\n<p>Because words share no coordinates, anything the model learns about <code>\"Paris\"</code> in <code>\"flights to Paris\"</code> is stored in weights touching only the Paris axis. It cannot transfer to <code>\"Rome\"</code>. A model that has seen <code>\"the cat sat on the mat\"</code> learns nothing transferable about <code>\"the dog sat on the rug\"</code>. Statistical strength is fragmented one word at a time.</p>\n\n<h3>The Fix: Learned Dense Embeddings</h3>\n<p>An <strong>embedding</strong> maps each token to a <em>dense</em>, <em>low-dimensional</em>, <em>real-valued</em> vector whose entries are learned. We pick an embedding dimension $d$ (typically $50$–$1024$, with $d \\ll |V|$) and learn a function</p>\n$$\\text{emb}: V \\to \\mathbb{R}^{d}.$$\n<p>Concretely this is stored as an <strong>embedding table</strong> (embedding matrix) $E \\in \\mathbb{R}^{|V| \\times d}$: one learnable row per vocabulary token. The embedding of token $w_i$ is simply row $i$:</p>\n$$\\text{emb}(w_i) = E_{i,:} \\in \\mathbb{R}^{d}.$$\n\n<h4>Embedding lookup is matrix multiplication by a one-hot vector</h4>\n<p>Here is the connection that demystifies everything. Multiplying the one-hot vector $e_i$ by the embedding matrix <em>selects</em> row $i$:</p>\n$$e_i^{\\top} E = E_{i,:}.$$\n<p>So an embedding layer is mathematically a linear layer (no bias, no activation) applied to one-hot inputs. In practice we never form the one-hot vector or do the multiply — we index directly into the table, which is why frameworks call it <code>nn.Embedding</code> / <code>tf.keras.layers.Embedding</code> and treat it as a fast gather. But conceptually it <em>is</em> \"one-hot, then a learned linear map.\" The table rows are ordinary parameters, trained by backprop like any other weights; the gradient flows only into the rows of the tokens that actually appeared in the batch.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Embeddings turn a discrete-symbol problem into a continuous-optimization problem. Once words live in $\\mathbb{R}^d$, gradient descent can <em>move similar words together</em>, and the model gets generalization for free: knowledge about one token leaks usefully into nearby tokens. This single idea — learn a dense vector per discrete entity — recurs everywhere: word2vec, GloVe, the input layer of every Transformer, user/item vectors in recommender systems, and node embeddings in graph learning.</p>\n</div>\n\n<h3>Where the Geometry Comes From: Distributional Semantics</h3>\n<p>Why would learned vectors place <code>\"cat\"</code> near <code>\"dog\"</code>? The answer is the <strong>distributional hypothesis</strong>, famously summarized by J.R. Firth (1957): <em>\"You shall know a word by the company it keeps.\"</em> Words that appear in similar contexts tend to have similar meanings. <code>\"cat\"</code> and <code>\"dog\"</code> both occur near <code>\"pet\"</code>, <code>\"vet\"</code>, <code>\"feed\"</code>, <code>\"furry\"</code>; that shared company is the signal.</p>\n<p>Any training objective that pushes a token's vector to <em>predict (or be predicted by) its context</em> will, as a side effect, give context-sharing words similar vectors — because the cheapest way to make the same predictions is to have the same representation.</p>\n\n<h4>word2vec intuition</h4>\n<p>word2vec (Mikolov et al., 2013) made this concrete and cheap. Its <strong>skip-gram</strong> variant learns embeddings by training a token to predict the words around it. For a center word $w_c$ and a context word $w_o$ within a small window, it models</p>\n$$P(w_o \\mid w_c) = \\frac{\\exp(u_{w_o} \\cdot v_{w_c})}{\\sum_{w \\in V} \\exp(u_{w} \\cdot v_{w_c})},$$\n<p>where each word has a \"center\" vector $v_w$ and a \"context\" vector $u_w$. Training maximizes the probability of true context words over a large corpus. (The full softmax over $|V|$ is expensive, so word2vec uses tricks like <strong>negative sampling</strong> — push the true pair's dot product up and a few random pairs' down — but the intuition is unchanged.)</p>\n<p>The famous payoff is that the resulting geometry encodes relationships <em>linearly</em>. The canonical example:</p>\n$$v_{\\text{king}} - v_{\\text{man}} + v_{\\text{woman}} \\approx v_{\\text{queen}}.$$\n<p>A consistent direction in the space corresponds to the \"gender\" relation; another to \"capital-of\"; another to plurality. These analogies were not designed in — they emerge from the distributional objective. (They are real but imperfect; modern practice mostly uses contextual embeddings, discussed below.)</p>\n\n<h3>Measuring Similarity: Cosine Similarity</h3>\n<p>If similar words are nearby, we need a way to measure \"nearby.\" The standard choice in embedding space is <strong>cosine similarity</strong>, which compares <em>direction</em> while ignoring <em>magnitude</em>:</p>\n$$\\cos(\\theta) = \\frac{a \\cdot b}{\\lVert a \\rVert \\, \\lVert b \\rVert} = \\frac{\\sum_{k=1}^{d} a_k b_k}{\\sqrt{\\sum_k a_k^2}\\,\\sqrt{\\sum_k b_k^2}}.$$\n<p>It ranges in $[-1, 1]$:</p>\n<ul>\n<li><strong>$+1$</strong>: vectors point the same way (maximally similar direction).</li>\n<li><strong>$0$</strong>: orthogonal — unrelated.</li>\n<li><strong>$-1$</strong>: opposite directions.</li>\n</ul>\n<p>We prefer cosine over raw Euclidean distance because, in learned embedding spaces, a word's <em>direction</em> tends to carry its meaning while its <em>norm</em> often correlates with nuisance factors like word frequency. Two synonyms with different magnitudes should still count as similar; cosine ignores the magnitude. (Note: if vectors are first L2-normalized to unit length, cosine similarity and Euclidean distance become monotonically related — minimizing one maximizes the other.)</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Cosine similarity is the same operation at the heart of attention. An attention \"score\" is essentially a (scaled) dot product between a query and a key vector — a measure of directional alignment in a learned space. Embeddings give tokens their initial place in that space; attention then computes similarities <em>between</em> those representations. Understanding embedding geometry is the conceptual on-ramp to the attention mechanism this module builds toward.</p>\n</div>\n\n<h3>Worked Example: Lookup and Cosine Similarity by Hand</h3>\n<p>Let the vocabulary be <code>{cat, dog, car}</code> with indices $0, 1, 2$, and suppose training has produced this embedding table $E \\in \\mathbb{R}^{3 \\times 2}$ (so $d = 2$):</p>\n$$E = \\begin{bmatrix} 2 & 1 \\\\ 3 & 1 \\\\ 0 & 4 \\end{bmatrix} \\quad \\begin{array}{l}\\leftarrow \\text{cat} \\\\ \\leftarrow \\text{dog} \\\\ \\leftarrow \\text{car} \\end{array}$$\n<p><strong>Step 1 — Lookup as one-hot multiply.</strong> The one-hot for <code>\"dog\"</code> is $e_1 = [0,1,0]$. Then</p>\n$$e_1^{\\top} E = [0,1,0]\\begin{bmatrix} 2 & 1 \\\\ 3 & 1 \\\\ 0 & 4 \\end{bmatrix} = [3,\\,1] = v_{\\text{dog}}.$$\n<p>It simply pulled out row 1, confirming lookup = selecting a row.</p>\n<p><strong>Step 2 — Cosine similarity of cat and dog.</strong> With $v_{\\text{cat}} = [2,1]$ and $v_{\\text{dog}} = [3,1]$:</p>\n$$v_{\\text{cat}} \\cdot v_{\\text{dog}} = 2\\cdot 3 + 1\\cdot 1 = 7, \\quad \\lVert v_{\\text{cat}}\\rVert = \\sqrt{5},\\ \\lVert v_{\\text{dog}}\\rVert = \\sqrt{10}.$$\n$$\\cos(\\text{cat},\\text{dog}) = \\frac{7}{\\sqrt{5}\\,\\sqrt{10}} = \\frac{7}{\\sqrt{50}} = \\frac{7}{7.071} \\approx 0.990.$$\n<p><strong>Step 3 — Compare cat and car.</strong> With $v_{\\text{car}} = [0,4]$:</p>\n$$v_{\\text{cat}} \\cdot v_{\\text{car}} = 2\\cdot 0 + 1\\cdot 4 = 4, \\quad \\lVert v_{\\text{car}}\\rVert = 4.$$\n$$\\cos(\\text{cat},\\text{car}) = \\frac{4}{\\sqrt{5}\\cdot 4} = \\frac{1}{\\sqrt{5}} \\approx 0.447.$$\n<p><strong>Conclusion.</strong> The geometry has learned that <code>cat</code> and <code>dog</code> are nearly aligned ($\\approx 0.99$) while <code>cat</code> and <code>car</code> are much less so ($\\approx 0.45$) — even though all three were perfectly equidistant under one-hot. That difference <em>is</em> the value embeddings add.</p>\n\n<h3>Tokenization: What Actually Gets an Embedding</h3>\n<p>We have been speaking of \"words,\" but a model embeds whatever its <strong>tokenizer</strong> emits. Tokenization is the upstream step that splits raw text into the discrete units that index into the embedding table. The choice of unit matters:</p>\n<ul>\n<li><strong>Word-level:</strong> one token per word. Intuitive, but the vocabulary explodes, and any word not seen in training becomes an <em>out-of-vocabulary</em> (OOV) <code>&lt;UNK&gt;</code> token — a real failure mode (every typo, name, or new word collapses to a single useless vector).</li>\n<li><strong>Character-level:</strong> tiny vocabulary, zero OOV, but sequences get very long and each token carries little meaning.</li>\n<li><strong>Subword (the modern default):</strong> algorithms like <strong>Byte-Pair Encoding (BPE)</strong>, WordPiece, and SentencePiece learn a vocabulary of frequent character chunks. Common words stay whole; rare words split into pieces (e.g. <code>\"tokenization\"</code> → <code>\"token\" + \"ization\"</code>). This caps the vocabulary (typically ~30k–100k), eliminates true OOV (anything can be spelled out from smaller pieces, down to bytes), and keeps sequences reasonably short.</li>\n</ul>\n<p>So the real pipeline is: <strong>text → tokenizer → token IDs → embedding lookup → dense vectors → model</strong>. Every Transformer you will study begins exactly here.</p>\n\n<h4>A note: static vs. contextual embeddings</h4>\n<p>word2vec/GloVe embeddings are <strong>static</strong>: <code>\"bank\"</code> gets one fixed vector regardless of whether you mean a riverbank or a financial bank. Modern Transformer models (e.g. BERT, GPT) start from a static embedding table but then produce <strong>contextual</strong> embeddings — the representation of a token is recomputed in light of the whole sentence, so <code>\"bank\"</code> near <code>\"river\"</code> and <code>\"bank\"</code> near <code>\"loan\"</code> end up with different vectors. The embedding table you have learned about is the foundation; attention (next in this module) is what makes it context-aware.</p>\n\n<h3>Choosing the Embedding Dimension $d$</h3>\n<p>$d$ is a hyperparameter and a capacity/efficiency trade-off. Too small and the space cannot fit all the distinctions the data demands (different relations crowd onto the same directions); too large and you waste parameters and risk overfitting on small data. A useful rule of thumb: $d$ should grow with vocabulary size and task complexity but stay far below $|V|$. Crucially, $d$ has nothing to do with the number of tokens you embed at once — a sentence of 12 tokens with $d=300$ produces a $12 \\times 300$ matrix; $d$ is the width of each vector, not the count of vectors.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>One-hot encodings are high-dimensional, sparse, and make every pair of words orthogonal/equidistant — they encode identity but no similarity and give no generalization.</li>\n<li>A learned <strong>embedding table</strong> $E \\in \\mathbb{R}^{|V| \\times d}$ maps each token to a dense $d$-vector; <strong>lookup</strong> is selecting a row, equivalently $e_i^{\\top} E$.</li>\n<li><strong>Distributional semantics</strong> (\"a word is known by the company it keeps\") explains why context-prediction objectives like <strong>word2vec</strong> place similar words near each other, even encoding relations as directions.</li>\n<li><strong>Cosine similarity</strong> measures alignment of direction in $[-1,1]$ and is the standard similarity in embedding space — and the conceptual seed of attention.</li>\n<li><strong>Tokenization</strong> (especially subword/BPE) decides what gets embedded, balancing vocabulary size against OOV and sequence length.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"llm-embeddings\"></div>",
          "mcq": [
            {
              "q": "Under a one-hot encoding, what is the cosine similarity between the vectors for two *distinct* words?",
              "choices": [
                "1, because each word is identical to itself",
                "0, because distinct one-hot vectors are orthogonal",
                "It depends on how semantically related the two words are",
                "-1, because the words are opposites"
              ],
              "answer": 1,
              "explain": "Distinct one-hot vectors share no nonzero coordinate, so their dot product is 0, making cosine similarity 0. One-hot encodes identity but no graded similarity — which is exactly its weakness."
            },
            {
              "q": "An embedding layer applied to a one-hot input vector $e_i$ is mathematically equivalent to which operation on the embedding matrix $E$?",
              "choices": [
                "Selecting row $i$ of $E$ (i.e., $e_i^{\\top} E = E_{i,:}$)",
                "Computing the softmax over the columns of $E$",
                "Taking the average of all rows of $E$",
                "Multiplying $E$ by its own transpose"
              ],
              "answer": 0,
              "explain": "Multiplying a one-hot vector by E picks out a single row, so an embedding lookup is just a linear map on one-hot inputs — implemented as a fast gather/index in practice."
            },
            {
              "q": "If you embed a sentence of 20 tokens using an embedding table with dimension $d = 256$, what is the shape of the resulting matrix, and what does $d$ represent?",
              "choices": [
                "$20 \\times 256$; $d$ is the length (width) of each token's vector",
                "$256 \\times 256$; $d$ is the vocabulary size",
                "$20 \\times 20$; $d$ is the number of tokens",
                "$256 \\times 20$; $d$ is the number of distinct sentences"
              ],
              "answer": 0,
              "explain": "Each of the 20 tokens becomes a $d$-dimensional vector, giving a $20 \\times 256$ matrix. The dimension $d$ is the width of each embedding, independent of how many tokens are processed."
            },
            {
              "q": "Why is cosine similarity typically preferred over raw Euclidean distance for comparing learned word embeddings?",
              "choices": [
                "It is the only metric that can be negative",
                "It compares direction while ignoring magnitude, which often reflects nuisance factors like word frequency",
                "It is always faster to compute than Euclidean distance",
                "It guarantees the embeddings are orthogonal"
              ],
              "answer": 1,
              "explain": "In learned spaces, a vector's direction tends to carry meaning while its norm can correlate with confounders like frequency; cosine isolates direction. (After L2-normalization the two metrics become monotonically related.)"
            },
            {
              "q": "For two distinct one-hot vectors $e_i$ and $e_j$, what is their squared Euclidean distance $\\lVert e_i - e_j \\rVert^2$?",
              "choices": [
                "0",
                "1",
                "2",
                "$\\sqrt{2}$"
              ],
              "answer": 2,
              "explain": "Since each has norm 1 and their dot product is 0, the squared distance is $1 + 1 - 2(0) = 2$ for any distinct pair."
            },
            {
              "q": "The lesson argues that what a model learns about 'Paris' in 'flights to Paris' cannot transfer to 'Rome'. Why does one-hot encoding cause this failure to generalize?",
              "choices": [
                "Because distinct words share no coordinates, so learned weights touch only that word's axis",
                "Because the vocabulary is too small to contain both cities",
                "Because cosine similarity is undefined for city names",
                "Because one-hot vectors have non-zero dot products that confuse the model"
              ],
              "answer": 0,
              "explain": "Each word occupies its own orthogonal axis, so weight updates for one word's coordinate cannot affect any other word."
            },
            {
              "q": "The lesson calls one-hot vectors 'perfect labels but useless features.' What does this intuition mean?",
              "choices": [
                "They are useful only for unsupervised learning, not supervised learning",
                "They identify which word it is but carry no information about what the word is like",
                "They store the word's meaning but lose its spelling",
                "They work for small vocabularies but break for large ones"
              ],
              "answer": 1,
              "explain": "Because all distinct words are mutually orthogonal and equidistant, a one-hot vector uniquely tags identity but encodes zero relational or semantic structure."
            },
            {
              "q": "A practitioner uses one-hot encoding over a 50,000-word vocabulary and complains that the first layer is slow and memory-hungry. According to the lesson, what is the core inefficiency?",
              "choices": [
                "The vectors must be normalized at every step, doubling the compute",
                "Cosine similarity must be recomputed for all 50,000 words each forward pass",
                "The input dimension equals $|V|$, so nearly all entries are zero and you spend compute multiplying by zeros",
                "Backpropagation through orthogonal vectors requires extra matrix inversions"
              ],
              "answer": 2,
              "explain": "One-hot dimensionality equals vocabulary size, forcing a weight row per word while almost every input entry is zero, wasting memory and compute."
            }
          ],
          "flashcards": [
            {
              "front": "One-hot vs. embedding: what is the core difference in what they encode?",
              "back": "One-hot: sparse, $|V|$-dimensional, all distinct words orthogonal/equidistant — encodes identity only, no similarity, no generalization. Embedding: dense, low-dimensional ($d \\ll |V|$), learned real vectors whose geometry captures similarity and supports generalization."
            },
            {
              "front": "What is an embedding lookup, formally?",
              "back": "Selecting row $i$ of the embedding table $E \\in \\mathbb{R}^{|V|\\times d}$ for token $w_i$: $\\text{emb}(w_i)=E_{i,:}$. Equivalently $e_i^{\\top}E$ (one-hot times the matrix) — a linear layer on one-hot inputs, implemented as a fast index/gather."
            },
            {
              "front": "State the distributional hypothesis (distributional semantics).",
              "back": "\"You shall know a word by the company it keeps\" (Firth). Words appearing in similar contexts tend to have similar meanings; context-prediction objectives therefore push context-sharing words to similar vectors."
            },
            {
              "front": "Define cosine similarity and its range.",
              "back": "$\\cos(\\theta)=\\dfrac{a\\cdot b}{\\lVert a\\rVert\\,\\lVert b\\rVert}\\in[-1,1]$. $+1$ = same direction (most similar), $0$ = orthogonal/unrelated, $-1$ = opposite. Measures direction, ignores magnitude."
            },
            {
              "front": "word2vec skip-gram: what does it train on, and what famous property emerges?",
              "back": "Trains each word's vector to predict its surrounding context words over a corpus (often via negative sampling). Result: similar words cluster, and relations become linear directions, e.g. $v_{king}-v_{man}+v_{woman}\\approx v_{queen}$."
            },
            {
              "front": "What does subword tokenization (e.g. BPE) solve that word-level tokenization does not?",
              "back": "It caps vocabulary size and eliminates true out-of-vocabulary failures: common words stay whole, rare/unseen words split into known sub-pieces (down to bytes), keeping sequences short while handling any input."
            }
          ],
          "homework": [
            {
              "prompt": "Given the 2-D embeddings $v_{apple}=[4,3]$, $v_{orange}=[3,4]$, and $v_{rocket}=[5,0]$, compute the cosine similarity of (apple, orange) and (apple, rocket). Which pair is more similar, and does the result match intuition?",
              "hint": "Cosine = dot product divided by the product of the two norms. Compute each norm as $\\sqrt{x^2+y^2}$.",
              "solution": "apple-orange: dot $=4\\cdot3+3\\cdot4=24$; $\\lVert apple\\rVert=\\sqrt{16+9}=5$, $\\lVert orange\\rVert=\\sqrt{9+16}=5$; cosine $=24/(5\\cdot5)=24/25=0.96$. apple-rocket: dot $=4\\cdot5+3\\cdot0=20$; $\\lVert rocket\\rVert=\\sqrt{25}=5$; cosine $=20/(5\\cdot5)=20/25=0.80$. So (apple, orange) at 0.96 is more similar than (apple, rocket) at 0.80, matching intuition that two fruits are more alike than a fruit and a rocket."
            },
            {
              "prompt": "A vocabulary has $|V| = 50{,}000$ tokens. You embed them with dimension $d = 300$. (a) How many parameters are in the embedding table? (b) If you instead fed one-hot vectors directly into a first linear layer producing a 300-dim output, how many weights would that layer have, and how does it compare?",
              "hint": "Embedding-table size is $|V|\\times d$. A linear layer mapping $\\mathbb{R}^{|V|}\\to\\mathbb{R}^{300}$ (ignoring bias) has a weight per input-output pair.",
              "solution": "(a) The table is $|V|\\times d = 50{,}000\\times 300 = 15{,}000{,}000$ parameters. (b) A linear layer $\\mathbb{R}^{50{,}000}\\to\\mathbb{R}^{300}$ has $50{,}000\\times 300 = 15{,}000{,}000$ weights — exactly the same count. This confirms the equivalence: embedding lookup *is* a linear map on one-hot inputs. The difference is purely computational — the embedding implementation indexes a single row instead of multiplying a 50,000-long mostly-zero vector by the whole matrix, avoiding 49,999 needless multiply-adds per token."
            },
            {
              "prompt": "Explain why a word-level model trained on news text might handle the word \"COVID-19\" poorly, and how subword tokenization changes the situation. Reference OOV behavior.",
              "hint": "Think about what happens to a token that was never in the training vocabulary, under each tokenization scheme.",
              "solution": "If \"COVID-19\" was absent from the training vocabulary (e.g., the corpus predates it), a word-level tokenizer maps it to a single <UNK> token with one generic, meaningless embedding — the model cannot distinguish it from any other unknown word, so all information is lost (the OOV problem). A subword tokenizer instead breaks it into known pieces such as \"CO\", \"VID\", \"-\", \"19\" (or, in the worst case, individual bytes). Each piece has a learned embedding, so the model receives a structured, non-degenerate representation it can compose, and it can even share statistical strength with related strings (e.g., \"19\" appears elsewhere). Thus subword tokenization eliminates true OOV failures and degrades gracefully on novel words."
            }
          ]
        },
        {
          "id": "dl-attention-mechanism",
          "title": "The Attention Mechanism",
          "minutes": 16,
          "content": "<h3>The problem attention solves</h3>\n<p>Before attention, sequence models like RNNs and LSTMs compressed an entire input sequence into a single fixed-length vector — the final hidden state — and then asked the decoder to reconstruct everything it needed from that one vector. This is an <strong>information bottleneck</strong>. Translating a 40-word sentence, the model had to cram all 40 words' worth of meaning into, say, 512 numbers, and then unpack it word by word. Performance degraded sharply with sequence length precisely because the bottleneck saturated.</p>\n<p>The <strong>attention mechanism</strong> removes this bottleneck. Instead of forcing a single summary vector, attention lets the model look back at <em>all</em> the input representations and, at each step, dynamically decide <em>which</em> ones are relevant. It is, at heart, a <strong>differentiable, content-based lookup table</strong>: a soft dictionary where you retrieve a blend of stored values weighted by how well your query matches each entry.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Attention reframes \"memory\" as retrieval rather than compression. Rather than storing everything in one state and hoping it survives, the model keeps every token's representation around and retrieves a tailored mixture on demand. This single idea — replacing a recurrent bottleneck with parallel content-addressed retrieval — is what made the Transformer, and therefore modern LLMs, possible.</p></div>\n\n<h3>The dictionary analogy: queries, keys, and values</h3>\n<p>Think of an ordinary Python dictionary <code>d = {k1: v1, k2: v2, ...}</code>. To look something up you supply a key <code>q</code>; the dictionary checks <code>q == k_i</code> and returns the matching value <code>v_i</code>. This is <strong>hard</strong> lookup: the match is exact (1) or absent (0), and you get back exactly one value.</p>\n<p>Attention is the <strong>soft, continuous</strong> generalization of this. Three roles appear:</p>\n<ul>\n<li><strong>Query</strong> ($q$): a vector describing <em>what the current position is looking for</em>. \"I'm a verb; I need my subject.\"</li>\n<li><strong>Key</strong> ($k_i$): a vector advertising <em>what each candidate position offers</em>. \"I'm a plural noun, third position.\"</li>\n<li><strong>Value</strong> ($v_i$): the actual <em>content</em> retrieved from position $i$ if it is attended to. The payload, distinct from the advertisement.</li>\n</ul>\n<p>The lookup is no longer exact equality but a graded <strong>similarity score</strong> between the query and each key. We measure similarity with a dot product, convert the scores into a probability distribution with softmax, and return the <em>weighted average</em> of the values. So instead of one value, we get a blend — mostly the best-matching value, with smaller contributions from the rest.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Keys and values are separated on purpose. The key is how a token is <em>found</em>; the value is what is <em>delivered</em>. Decoupling them lets a token advertise itself one way (\"I'm the date\") while carrying different content for downstream use. In a hard dictionary the key and value are bound together; attention frees them.</p></div>\n\n<h3>Deriving scaled dot-product attention</h3>\n<p>Fix one query $q \\in \\mathbb{R}^{d}$ and a set of $n$ key-value pairs, stacked as rows: keys $K \\in \\mathbb{R}^{n \\times d}$ and values $V \\in \\mathbb{R}^{n \\times d_v}$. We build the output in three steps.</p>\n\n<h4>Step 1 — Score every key against the query</h4>\n<p>We need a scalar measuring how well $q$ matches key $k_i$. The dot product $q \\cdot k_i = \\sum_{j=1}^{d} q_j k_{ij}$ is the natural choice: it is large and positive when the vectors point the same way, near zero when orthogonal, negative when opposed. Stacking all $n$ scores:</p>\n$$ s = q K^\\top \\in \\mathbb{R}^{n}, \\qquad s_i = q \\cdot k_i. $$\n\n<h4>Step 2 — Normalize scores into attention weights</h4>\n<p>Raw scores are arbitrary real numbers. We turn them into a probability distribution over the $n$ positions with the softmax, so the weights are non-negative and sum to 1:</p>\n$$ \\alpha_i = \\operatorname{softmax}(s)_i = \\frac{e^{s_i}}{\\sum_{j=1}^{n} e^{s_j}}, \\qquad \\sum_{i=1}^n \\alpha_i = 1. $$\n<p>The vector $\\alpha = (\\alpha_1, \\dots, \\alpha_n)$ is the <strong>attention distribution</strong>: how much each position is attended to. A peaked $\\alpha$ behaves like a hard lookup; a flat $\\alpha$ averages everything.</p>\n\n<h4>Step 3 — Retrieve the weighted average of values</h4>\n$$ \\text{out} = \\sum_{i=1}^{n} \\alpha_i \\, v_i = \\alpha V \\in \\mathbb{R}^{d_v}. $$\n<p>The output is a convex combination of the value vectors — a point inside their convex hull, pulled toward the values whose keys best matched the query.</p>\n\n<h4>Putting it together, and the $\\sqrt{d}$ scaling</h4>\n<p>For a whole batch of queries $Q \\in \\mathbb{R}^{m \\times d}$ at once, the three steps collapse into one matrix expression:</p>\n$$ \\operatorname{Attention}(Q,K,V) = \\operatorname{softmax}\\!\\left(\\frac{Q K^\\top}{\\sqrt{d}}\\right) V. $$\n<p>Here $QK^\\top \\in \\mathbb{R}^{m \\times n}$ holds all query-key scores, softmax is applied <strong>row-wise</strong> (each query gets its own distribution over the $n$ keys), and the result is $m \\times d_v$. The only new ingredient is the division by $\\sqrt{d}$, where $d$ is the key/query dimension.</p>\n\n<h3>Why divide by $\\sqrt{d}$? A variance argument</h3>\n<p>This is the detail people most often gloss over, so let's derive it. Suppose the components of $q$ and $k$ are independent, each with mean $0$ and variance $1$ (a reasonable approximation after layer normalization). Consider one score:</p>\n$$ s = q \\cdot k = \\sum_{j=1}^{d} q_j k_j. $$\n<p>Each term $q_j k_j$ has mean $\\mathbb{E}[q_j k_j] = \\mathbb{E}[q_j]\\mathbb{E}[k_j] = 0$ and variance $\\operatorname{Var}(q_j k_j) = \\mathbb{E}[q_j^2]\\mathbb{E}[k_j^2] = 1 \\cdot 1 = 1$. Because the $d$ terms are independent, variances add:</p>\n$$ \\operatorname{Var}(s) = \\sum_{j=1}^{d} \\operatorname{Var}(q_j k_j) = d. $$\n<p>So the raw dot product has standard deviation $\\sqrt{d}$ — it grows with dimension. With $d = 64$, scores routinely swing by $\\pm 8$ or more. Feed such large-magnitude logits into softmax and it <strong>saturates</strong>: one weight rockets to $\\approx 1$, the rest collapse to $\\approx 0$. In that regime the softmax is locally flat, so its gradient is nearly zero — the model can barely learn how to redistribute attention.</p>\n<p>Dividing by $\\sqrt{d}$ rescales the score to unit variance:</p>\n$$ \\operatorname{Var}\\!\\left(\\frac{s}{\\sqrt{d}}\\right) = \\frac{\\operatorname{Var}(s)}{d} = \\frac{d}{d} = 1. $$\n<p>Now scores stay $O(1)$ regardless of dimension, softmax operates in its sensitive region, and gradients flow. The $\\sqrt{d}$ is exactly the standard deviation we are cancelling.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The scaling is a <em>gradient-health</em> fix, not a cosmetic one. Without it, deeper/wider models would push softmax into saturation and stall training. This is the same family of concern as careful weight initialization and normalization: keep signals at $O(1)$ variance so gradients neither vanish nor explode. Attention without the $1/\\sqrt{d}$ is measurably harder to train, which is why the Transformer paper named it <em>scaled</em> dot-product attention.</p></div>\n\n<h3>Self-attention vs. cross-attention</h3>\n<p>In practice $Q$, $K$, $V$ are not raw inputs; they are <strong>linear projections</strong> of some hidden states $X$ via learned matrices: $Q = X_q W^Q$, $K = X_k W^K$, $V = X_k W^V$. Where $X_q$ and $X_k$ come from is what distinguishes the two modes:</p>\n<ul>\n<li><strong>Self-attention</strong>: queries, keys, and values all come from the <em>same</em> sequence ($X_q = X_k = X$). Every token attends to every token (including itself) in its own sequence. This is how a token contextualizes itself — a word builds a representation that incorporates its neighbors. Self-attention is the workhorse inside both encoder and decoder blocks.</li>\n<li><strong>Cross-attention</strong>: queries come from <em>one</em> sequence, keys and values from <em>another</em>. In a translation decoder, the query is the partially generated target sentence and the keys/values are the encoded source sentence — the decoder asks \"given what I've written so far, which source words should I look at next?\" This is the modern descendant of the original encoder-decoder attention.</li>\n</ul>\n<p>The formula is identical in both cases; only the <em>provenance</em> of $Q$ versus $K,V$ changes. A useful mnemonic: <strong>keys and values always travel together</strong> (they index the same sequence), while the query may belong to a different sequence.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Self-attention = a sequence enriching itself with internal context. Cross-attention = one sequence reaching into another for information. \"Self vs cross\" is purely a question of where the query comes from relative to the keys/values.</p></div>\n\n<h3>A fully worked toy example</h3>\n<p>Let one query attend over three positions, with $d = 2$ (so the scale factor is $\\sqrt{2} \\approx 1.414$). Take:</p>\n$$ q = \\begin{bmatrix} 1 & 0 \\end{bmatrix}, \\quad K = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{bmatrix}, \\quad V = \\begin{bmatrix} 10 & 0 \\\\ 0 & 10 \\\\ 5 & 5 \\end{bmatrix}. $$\n<p><strong>Step 1 — scores.</strong> Dot the query with each key:</p>\n$$ s_1 = q\\cdot k_1 = 1,\\quad s_2 = q\\cdot k_2 = 0,\\quad s_3 = q\\cdot k_3 = 1. $$\n<p><strong>Step 2 — scale by $\\sqrt{2}$:</strong></p>\n$$ \\tilde{s} = \\left(\\tfrac{1}{1.414},\\ 0,\\ \\tfrac{1}{1.414}\\right) = (0.707,\\ 0,\\ 0.707). $$\n<p><strong>Step 3 — softmax.</strong> Exponentiate: $e^{0.707}=2.028$, $e^{0}=1$, $e^{0.707}=2.028$. Sum $=5.056$. So</p>\n$$ \\alpha = \\left(\\tfrac{2.028}{5.056},\\ \\tfrac{1}{5.056},\\ \\tfrac{2.028}{5.056}\\right) \\approx (0.401,\\ 0.198,\\ 0.401). $$\n<p>Positions 1 and 3 tie for most attention (both keys had score 1), position 2 gets least.</p>\n<p><strong>Step 4 — weighted sum of values:</strong></p>\n$$ \\text{out} = 0.401\\begin{bmatrix}10\\\\0\\end{bmatrix} + 0.198\\begin{bmatrix}0\\\\10\\end{bmatrix} + 0.401\\begin{bmatrix}5\\\\5\\end{bmatrix} = \\begin{bmatrix} 4.01 + 0 + 2.005 \\\\ 0 + 1.98 + 2.005 \\end{bmatrix} \\approx \\begin{bmatrix} 6.02 \\\\ 3.99 \\end{bmatrix}. $$\n<p>Sanity checks worth internalizing: the weights are non-negative and sum to $\\approx 1.000$; the output lies inside the convex hull of the three value vectors; and because the query pointed along the first axis, it pulled the output's first coordinate up (toward value 1's large $x$-component) more than its second. Content-based retrieval, working exactly as designed.</p>\n\n<h3>Computational shape and complexity</h3>\n<p>For $m$ queries and $n$ keys of dimension $d$, the score matrix $QK^\\top$ is $m \\times n$ and costs $O(mnd)$; softmax and the value mixing are also $O(mn d_v)$. For self-attention $m = n = $ sequence length $L$, giving the famous <strong>$O(L^2 d)$</strong> cost — quadratic in sequence length. This quadratic term is the central scaling pain of Transformers and the reason a whole research literature (sparse, linear, and flash attention) exists to tame it. But the flip side is decisive: unlike an RNN's inherently sequential recurrence, every attention score is computed independently, so the whole operation is one big, GPU-friendly matrix multiply. Attention traded sequential depth for parallel width — and on modern hardware, that trade won.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Attention's edge is not only accuracy but <em>parallelism</em>. RNNs must process token $t$ before $t{+}1$; attention computes all pairwise interactions at once as matrix products. This parallelizability is what let Transformers be trained at the scale that produced today's foundation models.</p></div>\n\n<h3>Recap</h3>\n<ul>\n<li>Attention is differentiable content-based retrieval: score a query against keys, softmax into weights, return the weighted average of values.</li>\n<li>The formula: $\\operatorname{Attention}(Q,K,V)=\\operatorname{softmax}(QK^\\top/\\sqrt{d})\\,V$, with softmax applied per query (row-wise).</li>\n<li>Keys are the \"address,\" values are the \"content\"; decoupling them is what makes soft lookup expressive.</li>\n<li>The $1/\\sqrt{d}$ cancels the $\\sqrt{d}$ standard deviation of dot products of unit-variance vectors, keeping softmax out of its saturated, low-gradient regime.</li>\n<li>Self-attention: $Q,K,V$ from one sequence. Cross-attention: $Q$ from one sequence, $K,V$ from another. Same math, different provenance.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"llm-attention\"></div>",
          "mcq": [
            {
              "q": "Why is the attention score divided by $\\sqrt{d}$ (where $d$ is the query/key dimension)?",
              "choices": [
                "To make the attention weights sum to exactly 1",
                "Because the dot product of unit-variance vectors has variance $d$, so dividing by $\\sqrt{d}$ restores unit variance and keeps softmax out of its saturated, low-gradient region",
                "To reduce the $O(L^2 d)$ computational cost to $O(L^2)$",
                "Because $\\sqrt{d}$ is the number of attention heads"
              ],
              "answer": 1,
              "explain": "For independent unit-variance components, $\\operatorname{Var}(q\\cdot k)=d$, so the std is $\\sqrt{d}$; dividing by it normalizes scores to $O(1)$ so softmax gradients don't vanish. The summing-to-1 is softmax's job, not the scaling's."
            },
            {
              "q": "What precisely distinguishes self-attention from cross-attention?",
              "choices": [
                "Self-attention uses softmax; cross-attention uses a hard argmax",
                "Self-attention has no value vectors, only keys and queries",
                "In self-attention $Q$, $K$, and $V$ all come from the same sequence; in cross-attention $Q$ comes from one sequence while $K$ and $V$ come from another",
                "Cross-attention omits the $1/\\sqrt{d}$ scaling"
              ],
              "answer": 2,
              "explain": "The arithmetic is identical in both; only the provenance differs. Keys and values always come from the same source, and whether the query shares that source determines self vs. cross."
            },
            {
              "q": "In scaled dot-product attention with multiple queries, the softmax in $\\operatorname{softmax}(QK^\\top/\\sqrt{d})V$ is applied:",
              "choices": [
                "Over the entire $QK^\\top$ matrix as one flat distribution",
                "Row-wise, so each query forms its own probability distribution over the keys",
                "Column-wise, so each key forms a distribution over the queries",
                "Element-wise, like a sigmoid"
              ],
              "answer": 1,
              "explain": "Each row of $QK^\\top$ holds one query's scores against all keys; softmax is applied per row so every query gets an independent distribution over the $n$ keys that sums to 1."
            },
            {
              "q": "Why are keys and values kept as separate vectors instead of being the same thing?",
              "choices": [
                "So a token can advertise how it is matched (key) separately from the content it delivers (value), making the soft lookup more expressive",
                "To halve the memory required to store the dictionary",
                "Because keys must be integers and values must be floats",
                "It is required only for cross-attention, not self-attention"
              ],
              "answer": 0,
              "explain": "Decoupling the 'address' (key) from the 'payload' (value) lets a token be found one way while carrying different downstream content, unlike a hard dictionary where key and value are bound."
            },
            {
              "q": "According to the lesson, what is the fundamental conceptual shift that attention introduces relative to RNN/LSTM hidden states?",
              "choices": [
                "It reframes memory as on-demand retrieval rather than compression into a single state",
                "It replaces the softmax with a hard argmax for sharper selection",
                "It adds more recurrent layers so the hidden state has higher capacity",
                "It compresses the sequence into a smaller fixed vector to save memory"
              ],
              "answer": 0,
              "explain": "The lesson's 'Big picture' callout states attention reframes 'memory' as retrieval rather than compression: instead of cramming everything into one state, the model keeps every token's representation around and retrieves a tailored mixture on demand. Attention still uses softmax (not a hard argmax), does not add recurrence, and explicitly removes the fixed-vector compression rather than shrinking it."
            },
            {
              "q": "In the dictionary analogy, how does attention's lookup differ from an ordinary Python dictionary's lookup?",
              "choices": [
                "Attention requires the query to exactly equal a key, just like q == k_i",
                "Attention returns a single value, while a dict returns a weighted blend",
                "Attention uses a graded similarity score and returns a weighted blend of values, not one exact match",
                "Attention stores keys and values together, whereas a dict binds them separately"
              ],
              "answer": 2,
              "explain": "The lesson contrasts a dict's hard lookup (exact q == k_i match returning exactly one value) with attention's soft generalization: it scores similarity continuously via a dot product, softmaxes the scores, and returns a weighted average of the values. The roles are reversed in the 'single value' option, and it is the dict that binds key and value together while attention decouples them."
            },
            {
              "q": "Given query $q$, keys $k_i$, and values $v_i$, which sequence correctly describes how scaled dot-product attention produces its output?",
              "choices": [
                "Softmax the keys, dot them with the query, then average the queries",
                "Dot $q$ with each $k_i$ for similarity, softmax those scores into weights, then take the weighted average of the $v_i$",
                "Average all $v_i$ uniformly, then multiply by the dot product of $q$ and $k_i$",
                "Pick the single $v_i$ whose $k_i$ has the largest dot product with $q$"
              ],
              "answer": 1,
              "explain": "The lesson's three steps are: (1) score each key with the query-key dot product $s_i = q\\cdot k_i$, (2) softmax the scores into a probability distribution $\\alpha$, and (3) return $\\sum_i \\alpha_i v_i$, the weighted average of the values. Uniform averaging and hard single-value selection are both explicitly contrasted as what attention does not do."
            },
            {
              "q": "The lesson calls the RNN/LSTM approach an 'information bottleneck' and notes performance degraded sharply with sequence length. Why does longer input make this worse?",
              "choices": [
                "Longer sequences force more meaning to be crammed into the same fixed-length summary vector, saturating its capacity",
                "The softmax over a longer sequence becomes numerically unstable",
                "The decoder runs out of attention weights to distribute across positions",
                "Each additional word shrinks the dimensionality of the hidden state"
              ],
              "answer": 0,
              "explain": "The lesson explains the entire sequence is compressed into one fixed-length vector (e.g. 512 numbers), so a longer sentence packs more meaning into the same fixed capacity until the bottleneck saturates and performance degrades. The RNN approach has no attention weights, the hidden-state dimension is fixed (not shrinking), and the issue is capacity, not softmax stability."
            }
          ],
          "flashcards": [
            {
              "front": "State the scaled dot-product attention formula.",
              "back": "$\\operatorname{Attention}(Q,K,V)=\\operatorname{softmax}\\!\\left(\\dfrac{QK^\\top}{\\sqrt{d}}\\right)V$, with softmax applied row-wise (per query) and $d$ the query/key dimension."
            },
            {
              "front": "What are the roles of Query, Key, and Value?",
              "back": "Query = what the current position is looking for. Key = what each candidate position advertises (used for matching). Value = the actual content retrieved if that position is attended to."
            },
            {
              "front": "Why divide attention scores by $\\sqrt{d}$?",
              "back": "The dot product of two $d$-dim unit-variance vectors has variance $d$ (std $\\sqrt{d}$). Dividing by $\\sqrt{d}$ restores unit variance, preventing softmax from saturating into a near-zero-gradient regime."
            },
            {
              "front": "Self-attention vs. cross-attention?",
              "back": "Self: $Q$, $K$, $V$ all from the same sequence. Cross: $Q$ from one sequence, $K$ and $V$ from another. Same formula; only the source of the query (relative to keys/values) differs."
            },
            {
              "front": "What two mathematical properties does the softmax give the attention weights, and what does the output represent?",
              "back": "Weights are non-negative and sum to 1 (a probability distribution). The output is therefore a convex combination (weighted average) of the value vectors."
            },
            {
              "front": "What is the time complexity of self-attention over a sequence of length $L$ with dimension $d$, and why does it matter?",
              "back": "$O(L^2 d)$ — quadratic in sequence length because every pair of positions is scored. It's the main scaling bottleneck, but it's fully parallelizable (one big matmul), unlike sequential RNNs."
            }
          ],
          "homework": [
            {
              "prompt": "Hand-trace attention with $d=2$ (so scale by $\\sqrt{2}\\approx 1.414$). Query $q=\\begin{bmatrix}0 & 2\\end{bmatrix}$; keys $k_1=\\begin{bmatrix}0&1\\end{bmatrix}$, $k_2=\\begin{bmatrix}1&0\\end{bmatrix}$, $k_3=\\begin{bmatrix}0&-1\\end{bmatrix}$; values $v_1=\\begin{bmatrix}1&0\\end{bmatrix}$, $v_2=\\begin{bmatrix}0&1\\end{bmatrix}$, $v_3=\\begin{bmatrix}1&1\\end{bmatrix}$. Compute the raw scores, the scaled scores, the softmax weights, and the final output vector.",
              "hint": "Score = dot product $q\\cdot k_i$. Divide each by $\\sqrt{2}$, exponentiate, normalize so the three weights sum to 1, then take the weighted sum of the value vectors.",
              "solution": "Raw scores: $s_1=q\\cdot k_1=2$, $s_2=0$, $s_3=-2$. Scaled by $\\sqrt 2$: $(1.414,\\,0,\\,-1.414)$. Exponentiate: $e^{1.414}=4.113$, $e^{0}=1$, $e^{-1.414}=0.243$; sum $=5.356$. Weights: $\\alpha\\approx(0.768,\\,0.187,\\,0.045)$. Output $=0.768\\,(1,0)+0.187\\,(0,1)+0.045\\,(1,1)=(0.768+0.045,\\ 0.187+0.045)=(0.813,\\ 0.232)$. The query pointed along $+y$, matching $k_1$ best, so $v_1=(1,0)$ dominates the blend."
            },
            {
              "prompt": "Suppose you remove the $1/\\sqrt{d}$ scaling and instead multiply each raw score by 10 before the softmax. Qualitatively, what happens to the attention distribution and to the gradient the model receives, and why is this bad for learning?",
              "hint": "Think about what softmax does to logits of very different magnitudes, and recall that softmax's gradient is small when its output is near a one-hot vector.",
              "solution": "Multiplying logits by 10 spreads them far apart, so softmax saturates: the single largest score gets weight $\\approx 1$ and all others $\\approx 0$ (a near one-hot, almost-hard lookup). In that regime the softmax Jacobian entries $\\alpha_i(\\delta_{ij}-\\alpha_j)$ are nearly zero because each $\\alpha_i$ is near 0 or 1, so gradients w.r.t. the scores vanish. The model then cannot effectively learn to shift attention, and training stalls. This is exactly the failure the $1/\\sqrt{d}$ scaling prevents by keeping logits at $O(1)$ magnitude."
            },
            {
              "prompt": "Show that scaled dot-product attention's output always lies in the convex hull of the value vectors. Then explain what this geometric fact implies about whether attention can produce a value 'larger' than every input value in some coordinate.",
              "hint": "Use the two defining properties of the softmax weights, then recall the definition of a convex combination.",
              "solution": "The output is $\\text{out}=\\sum_i \\alpha_i v_i$ where softmax guarantees $\\alpha_i \\ge 0$ and $\\sum_i \\alpha_i = 1$. By definition, a sum of points with non-negative coefficients summing to 1 is a convex combination, which by definition lies in the convex hull of $\\{v_i\\}$. Implication: in any single coordinate $c$, $\\min_i (v_i)_c \\le \\text{out}_c \\le \\max_i (v_i)_c$ — the output can never exceed the largest, or fall below the smallest, value in that coordinate. Attention can only interpolate among values, never extrapolate beyond them. (Any extrapolation in a Transformer comes from the surrounding linear projections, residual connections, and feed-forward layers, not from the attention averaging itself.)"
            }
          ]
        }
      ]
    },
    {
      "id": "dl-transformers-and-modern-dl",
      "title": "Transformers and the Modern Deep Learning Stack",
      "lessons": [
        {
          "id": "dl-transformer-architecture",
          "title": "The Transformer Architecture End-to-End",
          "minutes": 18,
          "content": "<h3>From RNNs to Transformers: Why a New Architecture?</h3>\n<p>Before 2017, sequence modeling was dominated by recurrent neural networks (RNNs, LSTMs, GRUs). They process a sequence one token at a time, carrying a hidden state $h_t = f(h_{t-1}, x_t)$ forward. This recurrence is the source of both their elegance and their two crippling weaknesses:</p>\n<ul>\n<li><strong>No parallelism in the sequence dimension.</strong> Because $h_t$ depends on $h_{t-1}$, you cannot compute step $t$ until step $t-1$ is done. Training a sequence of length $n$ requires $O(n)$ sequential steps, leaving modern GPUs (which crave massive parallelism) starved.</li>\n<li><strong>Long-range information decays.</strong> Signal from token $1$ must survive $n-1$ matrix multiplications and nonlinearities to influence token $n$. Gradients vanish or explode along this path; the \"path length\" between two tokens is $O(n)$.</li>\n</ul>\n<p>The Transformer, introduced in Vaswani et al.'s <em>Attention Is All You Need</em> (2017), throws out recurrence entirely. Instead, every token directly attends to every other token in a single operation. The path length between any two positions becomes $O(1)$, and — crucially — the whole sequence is processed at once as a set of matrix multiplications that GPUs execute in parallel. This single change is what made it feasible to train models on internet-scale corpora, and it is the architectural foundation of essentially every modern large language model.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The Transformer's defining trade-off: it replaces the RNN's $O(n)$ sequential dependency with an $O(n^2)$ all-pairs attention computation. We trade more <em>total</em> compute and memory for the ability to do it all <em>in parallel</em> with short gradient paths. On hardware optimized for dense linear algebra, that is an overwhelmingly good trade — and it is why \"scale\" became the dominant story in AI.</p></div>\n\n<h3>Self-Attention: The Core Primitive</h3>\n<p>Attention answers a simple question for each token: <em>\"Which other tokens should I pull information from, and how much?\"</em> Each token emits three vectors, all linear projections of its embedding $x$:</p>\n<ul>\n<li>a <strong>query</strong> $q = x W^Q$ — \"what am I looking for?\"</li>\n<li>a <strong>key</strong> $k = x W^K$ — \"what do I offer / advertise?\"</li>\n<li>a <strong>value</strong> $v = x W^V$ — \"what content do I actually pass along if attended to?\"</li>\n</ul>\n<p>Stacking all $n$ tokens into matrices $Q, K \\in \\mathbb{R}^{n \\times d_k}$ and $V \\in \\mathbb{R}^{n \\times d_v}$, the entire operation is:</p>\n$$\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V$$\n<p>Let's unpack this piece by piece:</p>\n<ul>\n<li>$QK^\\top \\in \\mathbb{R}^{n \\times n}$ is the matrix of <strong>compatibility scores</strong>: entry $(i,j)$ is $q_i \\cdot k_j$, measuring how much token $i$'s query matches token $j$'s key.</li>\n<li>The $\\frac{1}{\\sqrt{d_k}}$ factor is the <strong>scaling</strong>. If the components of $q$ and $k$ are independent with unit variance, then $q \\cdot k$ has variance $d_k$. Without scaling, large $d_k$ pushes the dot products into regions where softmax saturates (one entry near $1$, the rest near $0$), producing vanishingly small gradients. Dividing by $\\sqrt{d_k}$ restores unit variance and keeps softmax in a well-behaved regime.</li>\n<li><code>softmax</code> is applied <strong>row-wise</strong>, turning each row of scores into a probability distribution — the <strong>attention weights</strong> $\\alpha_{ij}$ that token $i$ assigns to token $j$, with $\\sum_j \\alpha_{ij} = 1$.</li>\n<li>Multiplying by $V$ produces, for each token, a weighted average of all value vectors: $\\text{output}_i = \\sum_j \\alpha_{ij} v_j$.</li>\n</ul>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of attention as a <em>soft, differentiable dictionary lookup</em>. A hard dictionary returns the value whose key exactly matches your query. Attention instead returns a blend of all values, weighted by how well each key matches — and because it is smooth, you can backpropagate through it and learn the projections $W^Q, W^K, W^V$ end-to-end.</p></div>\n\n<h3>Multi-Head Attention</h3>\n<p>A single attention operation forces every token to pool all the information it needs into one weighted average — but a word might need to track its grammatical subject, its coreferent pronoun, and its semantic topic simultaneously. <strong>Multi-head attention</strong> runs several attention operations in parallel (\"heads\"), each with its own learned projections, so each head can specialize in a different relationship.</p>\n<p>For $h$ heads, we project into $h$ lower-dimensional subspaces (typically $d_k = d_v = d_{\\text{model}}/h$), run attention in each, concatenate, and project back:</p>\n$$\\text{head}_i = \\text{Attention}(Q W_i^Q,\\, K W_i^K,\\, V W_i^V)$$\n$$\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1,\\dots,\\text{head}_h)\\, W^O$$\n<p>Here $W_i^Q, W_i^K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}$, $W_i^V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}$, and $W^O \\in \\mathbb{R}^{h d_v \\times d_{\\text{model}}}$. Note that by shrinking each head's dimension to $d_{\\text{model}}/h$, the total computational cost is roughly the same as one full-dimension head — multi-head attention buys <em>diversity of attention patterns at essentially no extra cost</em>.</p>\n<p>In practice, trained heads visibly specialize: some attend to adjacent tokens, some to the previous occurrence of the same word, some to syntactic dependencies. This is analogous to how different convolutional filters learn different visual features.</p>\n\n<h3>Positional Encoding: Restoring Order</h3>\n<p>Here is a subtle but critical fact: <strong>self-attention is permutation-equivariant</strong>. If you shuffle the input tokens, the outputs are shuffled the same way but otherwise unchanged — the operation $\\sum_j \\alpha_{ij} v_j$ is a set operation with no notion of \"before\" or \"after.\" That is fatal for language, where \"the dog bit the man\" and \"the man bit the dog\" mean very different things.</p>\n<p>We therefore inject <strong>positional information</strong> by adding a position-dependent vector to each token embedding before the first layer. The original paper uses fixed <strong>sinusoidal positional encodings</strong>: for position $pos$ and dimension index $i$,</p>\n$$PE_{(pos,\\, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right), \\qquad PE_{(pos,\\, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)$$\n<p>Each dimension is a sinusoid of a different wavelength, ranging geometrically from $2\\pi$ up to roughly $10000 \\cdot 2\\pi$. Two appealing properties:</p>\n<ul>\n<li><strong>Relative positions are linearly accessible.</strong> For any fixed offset $\\Delta$, $PE_{pos+\\Delta}$ is a fixed linear (rotation) function of $PE_{pos}$. This makes it easy for the model to learn to attend \"$k$ tokens back.\"</li>\n<li><strong>Extrapolation.</strong> Because the encoding is a deterministic function of position rather than a learned lookup table, it is defined for positions longer than any seen in training (though extrapolation quality varies in practice).</li>\n</ul>\n<p>Modern variants include <strong>learned</strong> absolute embeddings (BERT, GPT-2) and <strong>relative / rotary</strong> schemes such as RoPE and ALiBi, which encode relative position directly inside the attention score and tend to generalize better to long contexts. The principle is unchanged: attention is order-blind, so order must be supplied explicitly.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Positional encoding is a clean example of an <strong>inductive bias</strong> injected by design rather than learned from scratch. RNNs and CNNs get locality and order \"for free\" from their structure; attention's generality means we must hand it back the structure we need. Choosing how to encode position is now an active research lever for long-context models.</p></div>\n\n<h3>The Encoder Block, Layer by Layer</h3>\n<p>An encoder block wraps two sublayers, each guarded by a residual connection and layer normalization. The two sublayers are:</p>\n<ol>\n<li><strong>Multi-head self-attention</strong> — lets each token gather context from the whole sequence (mixing information <em>across positions</em>).</li>\n<li><strong>Position-wise feed-forward network (FFN)</strong> — a small MLP applied independently and identically to each position (mixing information <em>across feature dimensions</em>):\n$$\\text{FFN}(x) = \\max(0,\\, x W_1 + b_1)\\, W_2 + b_2$$\nTypically the inner dimension is $4 \\times d_{\\text{model}}$ (e.g. $512 \\to 2048 \\to 512$). This is where much of a transformer's parameter count and \"knowledge storage\" lives; recent interpretability work treats it as a key-value memory.</li>\n</ol>\n<p>Around each sublayer we apply the <strong>residual connection</strong> and <strong>layer normalization</strong>. In the original \"post-norm\" formulation:</p>\n$$\\text{output} = \\text{LayerNorm}\\big(x + \\text{Sublayer}(x)\\big)$$\n<p>Each ingredient earns its place:</p>\n<ul>\n<li><strong>Residual connection</strong> ($x + \\text{Sublayer}(x)$): provides a gradient highway straight from the loss to early layers, making deep stacks (12, 96, or more layers) trainable. It also lets each block learn a <em>refinement</em> $\\Delta x$ rather than reconstructing the whole representation — a far easier optimization target.</li>\n<li><strong>Layer normalization</strong>: for each token independently, normalizes its feature vector to zero mean and unit variance, then applies a learned scale $\\gamma$ and shift $\\beta$: $\\hat{x} = \\gamma \\frac{x - \\mu}{\\sigma} + \\beta$. This stabilizes the scale of activations across layers and across the wildly varying magnitudes that residual sums can produce. (Note: LayerNorm normalizes over the feature dimension per token, so unlike BatchNorm it is independent of batch size and sequence length — ideal for variable-length text.)</li>\n</ul>\n<p>Most modern implementations use <strong>pre-norm</strong>, $x + \\text{Sublayer}(\\text{LayerNorm}(x))$, which keeps the residual stream clean and is markedly more stable to train at depth. The encoder stacks $N$ such identical blocks (the paper used $N=6$); the output is a contextualized representation of every input token.</p>\n\n<h3>The Decoder Block and Causal Masking</h3>\n<p>The decoder generates an output sequence one token at a time. Its block has <strong>three</strong> sublayers (vs. the encoder's two):</p>\n<ol>\n<li><strong>Masked multi-head self-attention</strong> over the tokens generated so far.</li>\n<li><strong>Cross-attention (encoder-decoder attention)</strong>: queries come from the decoder, but keys and values come from the <em>encoder's</em> output. This is how the decoder \"reads\" the source sequence — e.g. how a translation decoder looks at the source sentence.</li>\n<li><strong>Position-wise feed-forward network</strong>, identical in form to the encoder's.</li>\n</ol>\n<p>Again, each sublayer is wrapped in residual + layer norm.</p>\n<h4>Why masking is essential</h4>\n<p>During training we feed the entire target sequence at once (for parallelism), but the model must <strong>never see future tokens</strong> when predicting the current one — otherwise it would trivially \"cheat\" by copying the answer, and would be useless at inference time where the future does not yet exist. The <strong>causal mask</strong> enforces this by setting the scores for all future positions to $-\\infty$ <em>before</em> the softmax:</p>\n$$\\text{score}_{ij} = \\begin{cases} q_i \\cdot k_j / \\sqrt{d_k} & j \\le i \\\\ -\\infty & j > i \\end{cases}$$\n<p>Since $\\text{softmax}(-\\infty) = 0$, token $i$ attends only to positions $\\le i$. The mask is a lower-triangular pattern. This is the key trick that lets a decoder be trained with full parallelism while remaining <strong>autoregressive</strong>: every position is predicted simultaneously, yet each one only depends on its own past.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Masking turns one parallel forward pass into $n$ simultaneous \"next-token\" prediction problems that share weights — position $1$ predicts token $2$, position $2$ predicts token $3$, and so on — all without any of them peeking ahead. This is exactly the training signal behind GPT-style models.</p></div>\n\n<h4>The three architectural families</h4>\n<p>Different tasks use different slices of the full encoder-decoder design:</p>\n<ul>\n<li><strong>Encoder-only</strong> (BERT): bidirectional, no causal mask — every token sees the whole sequence. Ideal for understanding tasks (classification, retrieval).</li>\n<li><strong>Decoder-only</strong> (GPT, Llama): causal mask throughout, no cross-attention. Ideal for generation; this is the dominant LLM architecture today.</li>\n<li><strong>Encoder-decoder</strong> (the original; T5): an encoder reads the input bidirectionally, a decoder generates conditioned on it via cross-attention. Ideal for sequence-to-sequence tasks like translation and summarization.</li>\n</ul>\n\n<h3>Worked Example: One Attention Computation by Hand</h3>\n<p>Let's compute self-attention for a tiny sequence of two tokens with $d_k = d_v = 2$. Suppose after projection we have:</p>\n$$Q = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}, \\quad K = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}, \\quad V = \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}$$\n<p><strong>Step 1 — scores</strong> $QK^\\top$. Row 1 (token 1's query $[1,0]$) dotted with each key:</p>\n$$QK^\\top = \\begin{bmatrix} [1,0]\\cdot[1,0] & [1,0]\\cdot[1,1] \\\\ [0,1]\\cdot[1,0] & [0,1]\\cdot[1,1] \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$$\n<p><strong>Step 2 — scale</strong> by $\\sqrt{d_k} = \\sqrt{2} \\approx 1.414$:</p>\n$$\\frac{QK^\\top}{\\sqrt 2} = \\begin{bmatrix} 0.707 & 0.707 \\\\ 0 & 0.707 \\end{bmatrix}$$\n<p><strong>Step 3 — row-wise softmax.</strong> Row 1 has two equal entries, so the weights are exactly $[0.5,\\,0.5]$. Row 2: $\\text{softmax}([0, 0.707])$. Compute $e^0 = 1$, $e^{0.707} \\approx 2.028$, sum $\\approx 3.028$, giving weights $[0.330,\\, 0.670]$:</p>\n$$\\alpha = \\begin{bmatrix} 0.500 & 0.500 \\\\ 0.330 & 0.670 \\end{bmatrix}$$\n<p><strong>Step 4 — weighted sum of values</strong> $\\alpha V$:</p>\n$$\\text{out}_1 = 0.5\\,[2,0] + 0.5\\,[0,4] = [1,\\, 2]$$\n$$\\text{out}_2 = 0.330\\,[2,0] + 0.670\\,[0,4] = [0.660,\\, 2.680]$$\n<p>So the output is $\\begin{bmatrix} 1 & 2 \\\\ 0.66 & 2.68 \\end{bmatrix}$. Notice token 2 attended more to itself ($0.670$) because its query better matched its own key — a concrete instance of attention producing a context-dependent, content-based mixture.</p>\n<p>Now apply a <strong>causal mask</strong> for a decoder: token 1 may not see token 2, so we set score $(1,2) = -\\infty$. Row 1's softmax becomes $[1.0, 0.0]$, and $\\text{out}_1 = [2, 0]$ — token 1 now depends only on itself, exactly as autoregressive generation requires. Row 2 is unchanged since it was already allowed to see both positions.</p>\n\n<h3>Complexity and the Parallelism Payoff</h3>\n<p>Per layer, comparing a self-attention layer to a recurrent layer over sequence length $n$ and dimension $d$:</p>\n<ul>\n<li><strong>Self-attention:</strong> $O(n^2 \\cdot d)$ total compute, but only $O(1)$ <em>sequential</em> operations (everything is one big batched matmul) and maximum path length $O(1)$ between any two tokens.</li>\n<li><strong>Recurrent:</strong> $O(n \\cdot d^2)$ total compute, but $O(n)$ <em>sequential</em> operations and path length $O(n)$.</li>\n</ul>\n<p>When $n < d$ (common for sentences), attention is even cheaper in total flops; when $n$ is very large, the $n^2$ term dominates and motivates efficient-attention research (sparse, linear, FlashAttention). But the decisive advantage is the collapse of sequential depth from $O(n)$ to $O(1)$: the entire layer maps onto the dense parallel arithmetic that GPUs and TPUs execute best. That is the engineering reason transformers scaled where RNNs could not.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Two orthogonal mixing operations alternate up the stack: <strong>attention mixes across positions</strong> (which tokens talk to which), and the <strong>FFN mixes across features</strong> (what to compute per token). Almost every transformer variant is a remix of these two primitives plus normalization and residuals. Internalizing this decomposition lets you read any new architecture paper at a glance.</p></div>",
          "mcq": [
            {
              "q": "Why is the dot-product attention score divided by $\\sqrt{d_k}$ before the softmax?",
              "choices": [
                "To make the attention weights sum to 1, which softmax alone cannot guarantee",
                "Because for large $d_k$ the dot products grow in variance and push softmax into saturated regions with tiny gradients",
                "To reduce the $O(n^2)$ memory cost of the attention matrix",
                "To normalize the value vectors $V$ so each has unit norm"
              ],
              "answer": 1,
              "explain": "With unit-variance components, $q\\cdot k$ has variance $d_k$; dividing by $\\sqrt{d_k}$ restores unit variance and keeps softmax in a high-gradient regime. Softmax already guarantees the weights sum to 1 regardless of scaling."
            },
            {
              "q": "Why must a decoder use a causal (look-ahead) mask during training?",
              "choices": [
                "To reduce computation by skipping future tokens",
                "Because the encoder output is not yet available for future positions",
                "To prevent each position from attending to future tokens, so it cannot 'cheat' by seeing the answer it must predict",
                "To make self-attention permutation-equivariant"
              ],
              "answer": 2,
              "explain": "Training feeds the whole target sequence in parallel, but each position must predict the next token using only its past; masking future positions to $-\\infty$ before softmax enforces this autoregressive constraint."
            },
            {
              "q": "What is the primary purpose of adding positional encodings to token embeddings?",
              "choices": [
                "To increase the embedding dimension so the FFN has more capacity",
                "Because self-attention is permutation-equivariant and otherwise has no notion of token order",
                "To normalize embeddings to zero mean and unit variance",
                "To provide the residual connection with a gradient highway"
              ],
              "answer": 1,
              "explain": "Self-attention treats its input as a set; shuffling tokens just shuffles outputs. Positional encodings inject order information that the architecture would otherwise lack entirely."
            },
            {
              "q": "In a standard Transformer, which two operations alternate to mix information, and along which axes?",
              "choices": [
                "Self-attention mixes across features; the FFN mixes across positions",
                "Self-attention mixes across positions; the position-wise FFN mixes across feature dimensions",
                "Layer norm mixes across positions; residual connections mix across features",
                "Cross-attention mixes across heads; multi-head attention mixes across layers"
              ],
              "answer": 1,
              "explain": "Attention lets tokens exchange information across the sequence (across positions), while the FFN is applied independently per position and transforms the feature dimension. This position/feature decomposition is the backbone of the architecture."
            },
            {
              "q": "For a sequence of length $n$ with model dimension $d$, what is the time and memory complexity of computing the full self-attention score matrix $QK^\\top$, and why does this matter for very long sequences?",
              "choices": [
                "$O(n \\cdot d)$ time and memory, so cost grows only linearly with sequence length",
                "$O(n^2 \\cdot d)$ time and $O(n^2)$ memory, so cost grows quadratically with sequence length",
                "$O(n \\log n)$ time and memory, because attention is implemented as a fast transform",
                "$O(n \\cdot d^2)$ time and $O(d^2)$ memory, independent of sequence length"
              ],
              "answer": 1,
              "explain": "Computing all $n \\times n$ pairwise scores costs $O(n^2 d)$ time and stores an $O(n^2)$ matrix, the quadratic bottleneck that makes long sequences expensive and motivates efficient-attention research."
            },
            {
              "q": "A common misconception is that self-attention alone gives the Transformer its representational power. What is the actual role of the per-token position-wise feed-forward network that follows each attention sublayer?",
              "choices": [
                "It re-introduces recurrence so tokens can be processed sequentially",
                "It normalizes the attention weights so they sum to one across the sequence",
                "It applies a nonlinear transformation independently to each token's representation, adding capacity that attention's linear mixing cannot provide",
                "It computes the query, key, and value projections for the next attention layer"
              ],
              "answer": 2,
              "explain": "Attention only forms weighted (linear) combinations of values, so the position-wise feed-forward network supplies the per-token nonlinearity and most of the model's parameter capacity."
            },
            {
              "q": "Self-attention as described is permutation-equivariant: shuffling the input tokens shuffles the outputs identically but otherwise changes nothing. What does this fact directly imply about the architecture?",
              "choices": [
                "Attention scores would all become equal regardless of the input",
                "Without positional information injected, the model cannot distinguish word order and treats the input as an unordered set",
                "The softmax would no longer produce a valid probability distribution",
                "Gradients could no longer flow back through the value vectors"
              ],
              "answer": 1,
              "explain": "Because the core attention operation has no inherent notion of order, the model would see only a bag of tokens unless positional information is added, which is precisely why positional encodings exist."
            },
            {
              "q": "Compared to an RNN, the Transformer changes the maximum path length that a signal must traverse between two arbitrary tokens. Which statement correctly characterizes this change and its benefit?",
              "choices": [
                "The path length goes from $O(n)$ in an RNN to $O(1)$ in self-attention, shortening the gradient path and easing learning of long-range dependencies",
                "The path length goes from $O(1)$ in an RNN to $O(n)$ in self-attention, which is why Transformers struggle with long range",
                "Both have $O(\\log n)$ path length, so there is no difference in long-range modeling",
                "The path length is $O(n^2)$ in self-attention because every pair of tokens is connected"
              ],
              "answer": 0,
              "explain": "An RNN's signal must pass through $O(n)$ recurrent steps, whereas self-attention connects any two tokens in a single operation ($O(1)$ path), giving short gradient paths that better preserve long-range information."
            }
          ],
          "flashcards": [
            {
              "front": "Write the scaled dot-product attention formula and name each part.",
              "back": "$\\text{Attention}(Q,K,V)=\\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V$. $QK^\\top$ = compatibility scores; $1/\\sqrt{d_k}$ = scaling to stabilize softmax gradients; row-wise softmax = attention weights; multiply by $V$ = weighted average of values."
            },
            {
              "front": "What does multi-head attention add over single-head attention, and at what cost?",
              "back": "It runs $h$ attention operations in parallel, each in a $d_{\\text{model}}/h$-dimensional subspace with its own $W_i^Q,W_i^K,W_i^V$, then concatenates and projects with $W^O$. This lets different heads capture different relationships at roughly the same total compute as one full-size head."
            },
            {
              "front": "List the sublayers of an encoder block and how each is wrapped.",
              "back": "Two sublayers: (1) multi-head self-attention, (2) position-wise feed-forward network. Each is wrapped with a residual connection plus layer normalization, e.g. $\\text{LayerNorm}(x+\\text{Sublayer}(x))$ (post-norm) or $x+\\text{Sublayer}(\\text{LayerNorm}(x))$ (pre-norm)."
            },
            {
              "front": "How does causal masking work mechanically, and why?",
              "back": "Before the softmax, set scores for all future positions ($j>i$) to $-\\infty$, giving a lower-triangular attention pattern; $\\text{softmax}(-\\infty)=0$ so each token attends only to itself and the past. This keeps the decoder autoregressive while allowing fully parallel training."
            },
            {
              "front": "Why is self-attention 'order-blind,' and how is this fixed?",
              "back": "Self-attention is permutation-equivariant: it treats input as a set, so shuffling tokens just shuffles outputs. Order is restored by adding positional encodings (sinusoidal, learned, or relative/rotary like RoPE/ALiBi) to the embeddings."
            },
            {
              "front": "Compare self-attention vs. recurrent layers on sequential ops and path length.",
              "back": "Self-attention: $O(n^2 d)$ total compute, $O(1)$ sequential operations, $O(1)$ max path length. Recurrent: $O(n d^2)$ total compute, $O(n)$ sequential operations, $O(n)$ path length. Attention trades more parallelizable compute for far shorter dependency paths."
            }
          ],
          "homework": [
            {
              "prompt": "A model uses $d_{\\text{model}} = 512$ with $h = 8$ attention heads. (a) What is the per-head key/query/value dimension $d_k$ in the standard setup? (b) Verify that the total cost of multi-head attention is comparable to single-head attention at full dimension by comparing the size of the projected $Q$ across all heads.",
              "hint": "In the standard configuration $d_k = d_v = d_{\\text{model}}/h$. The concatenation of all heads' value outputs has total width $h \\cdot d_v$.",
              "solution": "(a) $d_k = d_v = d_{\\text{model}}/h = 512/8 = 64$. (b) Each head projects to $d_k = 64$ dimensions, and there are 8 heads, so the total projected query width is $8 \\times 64 = 512 = d_{\\text{model}}$ — the same total dimensionality as one single full-size head. The combined projection matrices $W_i^Q$ across heads have the same total parameter count ($512 \\times 512$) as a single $512 \\times 512$ projection, so multi-head attention costs essentially the same as single-head full-dimension attention while giving 8 independent attention patterns."
            },
            {
              "prompt": "Given query $q = [1, 1]$ and two keys $k_1 = [1, 0]$, $k_2 = [0, 2]$ with $d_k = 2$, compute the attention weights this query places on each key (with scaling). Then state how the weights change if a causal mask forbids attending to $k_2$.",
              "hint": "Compute the raw dot products $q\\cdot k_1$ and $q\\cdot k_2$, divide each by $\\sqrt{d_k}=\\sqrt 2$, then apply softmax. For the masked case, set the masked score to $-\\infty$ before softmax.",
              "solution": "Dot products: $q\\cdot k_1 = 1$, $q\\cdot k_2 = 2$. Scale by $\\sqrt 2 \\approx 1.414$: scores $\\approx [0.707, 1.414]$. Softmax: $e^{0.707}\\approx 2.028$, $e^{1.414}\\approx 4.113$, sum $\\approx 6.141$, giving weights $\\approx [0.330, 0.670]$. So the query attends about 33% to $k_1$ and 67% to $k_2$. With a causal mask forbidding $k_2$: its score becomes $-\\infty$, so $\\text{softmax}([0.707, -\\infty]) = [1.0, 0.0]$ — all weight goes to $k_1$."
            },
            {
              "prompt": "Explain why removing the residual connections (keeping only $\\text{LayerNorm}(\\text{Sublayer}(x))$) would make a deep, e.g. 48-layer, Transformer much harder to train. What specific function does the residual serve?",
              "hint": "Think about the gradient signal flowing backward from the loss through 48 stacked nonlinear sublayers, and about what each block has to learn if it cannot pass the input through unchanged.",
              "solution": "Without residuals, the gradient from the loss must propagate backward through every sublayer's Jacobian in sequence; across ~48 layers these factors compound and the signal tends to vanish or explode, so early layers receive almost no usable gradient. The residual $x + \\text{Sublayer}(x)$ adds an identity path whose Jacobian is the identity, so backprop always has a direct, undecayed route to early layers (a 'gradient highway'). It also reframes each block's job as learning a small refinement $\\Delta x = \\text{Sublayer}(x)$ on top of the existing representation rather than reconstructing the full representation from scratch, which is a much easier optimization target. Together these make very deep stacks trainable."
            }
          ]
        },
        {
          "id": "dl-pretraining-and-finetuning-paradigm",
          "title": "Pretraining, Fine-Tuning, and Foundation Models",
          "minutes": 14,
          "content": "<h3>The Big Idea: Learn Once, Adapt Cheaply</h3>\n<p>For most of machine learning's history, the dominant recipe was <em>one model per task</em>. You collected a labeled dataset for sentiment analysis, trained a model on it, and that model did exactly one thing. Want named-entity recognition? Collect another labeled dataset, train another model from scratch. Labels were the bottleneck — expensive, slow, and task-specific.</p>\n<p>The <strong>foundation model</strong> paradigm breaks this dependency. We train a single very large model on an enormous pile of <em>unlabeled</em> text (or images, or code) using a self-generated objective, and then cheaply <em>adapt</em> that one model to thousands of downstream tasks. The expensive part (pretraining) happens once; the cheap part (adaptation) happens many times. This is transfer learning taken to its logical extreme, and it is the single most important structural change in modern deep learning.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>A foundation model is not a \"model for a task.\" It is a reusable substrate of learned representations. The intelligence lives in the pretrained weights; fine-tuning and prompting are just ways of <em>indexing into</em> capabilities that already exist.</p></div>\n\n<h3>Self-Supervised Learning: Free Labels From the Data Itself</h3>\n<p>Supervised learning needs human labels $(x, y)$. Self-supervised learning manufactures the supervision <em>from the input itself</em> by hiding part of $x$ and asking the model to predict it. There is no human in the labeling loop, so the dataset is effectively the entire internet.</p>\n<p>Formally, we partition each input $x$ into a visible part $x_{\\text{vis}}$ and a hidden part $x_{\\text{hid}}$, and train the model to maximize</p>\n$$\\mathcal{L} = \\mathbb{E}_{x \\sim \\mathcal{D}} \\big[ \\log p_\\theta(x_{\\text{hid}} \\mid x_{\\text{vis}}) \\big].$$\n<p>The \"label\" $x_{\\text{hid}}$ was always part of the data — we just covered it up. The art is in <em>how</em> you split $x$, and the two dominant choices give us the two great families of language models.</p>\n\n<h4>Masked Language Modeling (MLM) — the BERT family</h4>\n<p>MLM hides a random subset of tokens (typically about 15%) and asks the model to reconstruct them from the <em>full surrounding context on both sides</em>. Given a sequence $x = (x_1, \\dots, x_n)$ and a random mask set $M \\subseteq \\{1,\\dots,n\\}$, the objective is</p>\n$$\\mathcal{L}_{\\text{MLM}} = \\mathbb{E}\\Big[ \\sum_{i \\in M} \\log p_\\theta\\big(x_i \\mid x_{\\setminus M}\\big) \\Big],$$\n<p>where $x_{\\setminus M}$ is the sequence with the masked positions replaced by a special <code>[MASK]</code> token. The key property is <strong>bidirectionality</strong>: when predicting position $i$, the model attends freely to tokens both before and after $i$. This makes MLM ideal for building rich <em>understanding</em> representations — for any token, the model sees its complete neighborhood.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>MLM is the deep-learning version of a cloze test (\"The cat sat on the ___\"). Because both sides are visible, the encoder builds a representation of each word conditioned on its whole context — perfect for classification, retrieval, and tagging, where you have the full input up front.</p></div>\n\n<h4>Next-Token Prediction (Autoregressive LM) — the GPT family</h4>\n<p>Autoregressive (AR) modeling hides nothing explicitly; instead it factorizes the joint probability of the sequence left-to-right and predicts each token from <em>only its predecessors</em>:</p>\n$$\\mathcal{L}_{\\text{AR}} = \\mathbb{E}\\Big[ \\sum_{i=1}^{n} \\log p_\\theta\\big(x_i \\mid x_{<i}\\big) \\Big].$$\n<p>This is just the chain rule of probability applied to a sequence: $p(x) = \\prod_i p(x_i \\mid x_{<i})$. The crucial constraint is <strong>causality</strong> — implemented with a triangular attention mask so position $i$ can never peek at positions $> i$. Because the model learns a full generative distribution $p(x)$, it can <em>generate</em> by sampling one token at a time and feeding it back in.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>AR models learn the entire joint distribution of language, which is why they generate fluently and can be <em>prompted</em>. MLM models learn $p(x_i \\mid \\text{context})$ for masked positions only — great representations, but no natural way to generate long coherent text. This single architectural choice (bidirectional vs causal masking) is what separates \"understanding\" models from \"generating\" models.</p></div>\n\n<h4>MLM vs AR, side by side</h4>\n<ul>\n<li><strong>Context:</strong> MLM is bidirectional; AR is left-to-right (causal).</li>\n<li><strong>Training signal density:</strong> MLM gets a learning signal from only the ~15% masked tokens per sequence (the rest are just context), so it is somewhat <em>sample-inefficient</em>. AR predicts <em>every</em> token, getting $n$ prediction targets per sequence of length $n$.</li>\n<li><strong>Native task:</strong> MLM excels at understanding/encoding (classification, NER, sentence embeddings). AR excels at generation (completion, dialogue, reasoning) and, as a side effect of generation, can do almost any task via prompting.</li>\n<li><strong>Train/inference gap:</strong> MLM introduces a <code>[MASK]</code> token at training that never appears at inference — a mild mismatch. AR has no such gap.</li>\n</ul>\n<p>A useful third point: <strong>encoder-decoder</strong> models (T5, BART) combine both ideas — a bidirectional encoder reads a corrupted input, and a causal decoder regenerates the original. T5 frames <em>every</em> task as text-to-text, which prefigured the \"everything is generation\" view that AR models now dominate.</p>\n\n<h3>The Pretrain-Then-Adapt Paradigm</h3>\n<p>The lifecycle has two stages with very different economics.</p>\n<ol>\n<li><strong>Pretraining</strong> — one expensive run on a massive unlabeled corpus with a self-supervised objective. Costs millions of dollars and weeks of GPU time. Done by a handful of organizations. Produces general-purpose weights $\\theta_0$.</li>\n<li><strong>Adaptation</strong> — many cheap runs that specialize $\\theta_0$ to specific tasks or domains. Done by everyone. This is where the value is unlocked.</li>\n</ol>\n<p>Why does pretraining help downstream tasks so much? Because predicting masked or next tokens <em>well</em> forces the model to internalize syntax, semantics, world facts, and even rudimentary reasoning — all of which transfer. The pretrained weights are a learned <em>prior</em>; fine-tuning is approximate posterior inference that nudges this prior toward your task with comparatively few labels.</p>\n\n<h3>Scaling Laws: Bigger and More Is Predictably Better</h3>\n<p>One of the most striking empirical findings is that pretraining loss falls as a smooth <em>power law</em> in model size, dataset size, and compute. Holding other factors non-bottlenecked, test loss $L$ behaves like</p>\n$$L(N) \\approx L_\\infty + \\left(\\frac{N_c}{N}\\right)^{\\alpha_N},$$\n<p>where $N$ is the number of parameters, $L_\\infty$ is the irreducible loss (the entropy of language itself), and $\\alpha_N$ is a small positive exponent (empirically $\\approx 0.07$ for the parameter scaling of language models). Analogous laws hold for dataset size $D$ and compute $C$. Plotted on log-log axes, loss-vs-scale is a straight line over many orders of magnitude — which means you can <em>extrapolate</em> the performance of a model you have not yet trained.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>Scaling laws turned model building from alchemy into engineering. Before committing tens of millions of dollars, labs fit a power law on small models and predict the loss of the big one. The exponents are small (diminishing returns: each constant-factor gain in loss costs an order of magnitude more compute), but the curve is remarkably reliable.</p></div>\n<p>A second insight — the <strong>compute-optimal</strong> finding (Chinchilla) — is that for a fixed compute budget $C \\approx 6ND$ (a useful rule of thumb: training FLOPs $\\approx 6 \\times$ parameters $\\times$ tokens), you should scale parameters $N$ and training tokens $D$ <em>together</em>, roughly in equal proportion. Many early large models were badly under-trained: too many parameters, too few tokens. The lesson: data matters as much as size.</p>\n<p>The deeper, almost philosophical payoff is <strong>emergence</strong>: some capabilities (multi-step arithmetic, in-context learning, instruction following) are nearly absent in small models and then appear fairly abruptly past a scale threshold. The smooth loss curve hides sharp jumps in specific downstream behaviors — a reminder that average loss and discrete capabilities are not the same thing.</p>\n\n<h3>Lightweight Adaptation: Three Levels of Touch</h3>\n<p>Once you have $\\theta_0$, you adapt it. The options form a spectrum from \"change all the weights\" to \"change none of them.\"</p>\n\n<h4>1. Full fine-tuning</h4>\n<p>Continue gradient descent on the pretrained weights using your task's (usually labeled) data: $\\theta_0 \\rightarrow \\theta_{\\text{task}}$. Maximally expressive, but it produces a full-size copy of the model per task (storage-heavy), risks <em>catastrophic forgetting</em> of general abilities, and overfits if your dataset is small. Best when you have substantial task data and want peak quality.</p>\n\n<h4>2. Parameter-efficient fine-tuning (LoRA)</h4>\n<p>Full fine-tuning updates a weight matrix $W \\in \\mathbb{R}^{d \\times d}$ by some $\\Delta W$. The key empirical observation behind <strong>LoRA (Low-Rank Adaptation)</strong> is that the <em>update</em> needed to specialize a model has low intrinsic rank — it lives in a tiny subspace. So instead of learning the full $\\Delta W$ ($d^2$ parameters), we factor it:</p>\n$$W' = W_0 + \\Delta W = W_0 + BA, \\qquad B \\in \\mathbb{R}^{d \\times r},\\; A \\in \\mathbb{R}^{r \\times d},\\; r \\ll d.$$\n<p>We <em>freeze</em> $W_0$ and train only $A$ and $B$. The number of trainable parameters drops from $d^2$ to $2dr$. With $d = 4096$ and rank $r = 8$, that is $16{,}777{,}216$ vs $65{,}536$ parameters — a <strong>256x</strong> reduction per matrix, while typically recovering most of full fine-tuning's quality. In practice $\\Delta W$ is scaled by $\\alpha/r$ for stability. Benefits: tiny adapters (a few MB) per task, no inference latency once $BA$ is merged back into $W_0$, and you can swap adapters to switch tasks while sharing one frozen base model in memory.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of $W_0$ as the model's general knowledge and $BA$ as a thin \"task lens\" laid over it. A low-rank lens is enough because specializing a competent model is a small course-correction, not a re-education.</p></div>\n\n<h4>3. Prompting and in-context learning (zero weight updates)</h4>\n<p>For large AR models, you can often skip training entirely. <strong>In-context learning</strong> places a few input-output examples directly in the prompt; the model infers the pattern and applies it to a new query — all in a single forward pass, with weights frozen. The \"learning\" happens transiently in the activations, not the parameters. This works <em>only</em> because pretraining at scale produced a model general enough to recognize and continue patterns it was never explicitly trained on — a hallmark emergent capability. Related lightweight techniques include <em>prompt tuning</em> (learning a few continuous \"soft prompt\" vectors prepended to the input) and instruction tuning (a fine-tuning step that teaches the model to follow natural-language commands).</p>\n\n<h3>Worked Example: Choosing and Costing an Adaptation</h3>\n<p><strong>Setup.</strong> You need a model that classifies support tickets into 12 categories. You have 3,000 labeled tickets. You are deciding between (a) BERT-base (110M params, encoder-only, MLM-pretrained) with full fine-tuning, and (b) a 7B-parameter GPT-style model with LoRA. Walk through the reasoning.</p>\n<p><strong>Step 1 — Match objective to task.</strong> Classification needs a representation of the <em>whole</em> input, which is available at inference time. The bidirectional MLM objective is purpose-built for this: BERT sees both sides of every token. An AR model would also work (its left-to-right representation of the final token summarizes the input), but it spent capacity learning to generate — partly wasted for pure classification.</p>\n<p><strong>Step 2 — Estimate the fine-tuning footprint.</strong> Full fine-tuning of BERT-base updates all 110M parameters and stores a 110M-parameter copy. With 3,000 examples that is a reasonable ratio and trains in minutes on one GPU.</p>\n<p><strong>Step 3 — Cost the LoRA alternative.</strong> For the 7B model, suppose adapted attention matrices have $d = 4096$ and we use rank $r = 8$. Each adapted matrix needs $2dr = 2 \\cdot 4096 \\cdot 8 = 65{,}536$ trainable parameters instead of $d^2 \\approx 16.8\\text{M}$. Across, say, 200 such matrices that is about $13\\text{M}$ trainable parameters versus $7\\text{B}$ — under 0.2% of the model — and the adapter file is only a few megabytes.</p>\n<p><strong>Step 4 — Decide.</strong> With only 3,000 examples and a closed-set classification task, <em>BERT-base + full fine-tuning</em> is the pragmatic winner: smaller, cheaper to serve, and the MLM objective fits the task. Reach for the 7B + LoRA route only if you also need free-form generation (e.g., drafting replies), need strong zero/few-shot behavior on rare categories, or want one shared base serving many tasks via swappable adapters. The discipline is: <strong>match the pretraining objective to the task shape first, then pick the cheapest adaptation that meets the quality bar.</strong></p>\n\n<h3>Connections and Takeaways</h3>\n<ul>\n<li><strong>Self-supervision = transfer learning at internet scale.</strong> By turning unlabeled data into a prediction task, we sidestep the label bottleneck and learn priors that transfer broadly.</li>\n<li><strong>The objective shapes the model.</strong> Bidirectional MLM yields understanding encoders (BERT); causal next-token prediction yields generative, promptable models (GPT). Pick by task shape.</li>\n<li><strong>Scaling is predictable but has diminishing returns,</strong> and is most efficient when parameters and tokens grow together (Chinchilla). Capability can nonetheless emerge sharply.</li>\n<li><strong>Adaptation is a spectrum of cost:</strong> full fine-tuning (all weights) → LoRA (a low-rank slice) → prompting (no weights). Use the lightest method that clears your quality bar.</li>\n</ul>",
          "mcq": [
            {
              "q": "You need sentence-level embeddings for a semantic search / retrieval system, where the full document text is always available at inference time. Which pretraining objective is the most natural fit, and why?",
              "choices": [
                "Next-token prediction (GPT-style), because it learns the full joint distribution $p(x)$",
                "Masked language modeling (BERT-style), because bidirectional context gives each token a representation conditioned on its full neighborhood",
                "Either is identical for this task since both use the Transformer architecture",
                "Next-token prediction, because causal masking produces richer embeddings"
              ],
              "answer": 1,
              "explain": "Retrieval/understanding tasks benefit from bidirectional context, which MLM provides; the whole input is available so there is no need for left-to-right causality. AR models can work but spend capacity on generation."
            },
            {
              "q": "Under the LoRA reparameterization $W' = W_0 + BA$ with $W_0 \\in \\mathbb{R}^{d\\times d}$, $B \\in \\mathbb{R}^{d\\times r}$, $A \\in \\mathbb{R}^{r\\times d}$, which statement is correct?",
              "choices": [
                "LoRA trains all of $W_0$, $A$, and $B$ jointly to maximize expressiveness",
                "$W_0$ is frozen and only $A$ and $B$ are trained, reducing trainable parameters from $d^2$ to $2dr$",
                "LoRA adds permanent inference latency because $BA$ must be recomputed every forward pass",
                "LoRA increases the number of trainable parameters relative to full fine-tuning"
              ],
              "answer": 1,
              "explain": "LoRA freezes the pretrained $W_0$ and learns only the low-rank factors $A,B$ ($2dr$ params, with $r \\ll d$). Once merged into $W_0$ there is no extra inference latency."
            },
            {
              "q": "Chinchilla-style compute-optimal scaling (with training FLOPs $C \\approx 6ND$ for $N$ parameters and $D$ tokens) implies which practice for a fixed compute budget?",
              "choices": [
                "Maximize parameters $N$ and use as few tokens as possible",
                "Scale parameters $N$ and training tokens $D$ together in roughly equal proportion",
                "Fix the model size and only ever add more tokens",
                "Compute budget is irrelevant; only architecture matters"
              ],
              "answer": 1,
              "explain": "For a fixed budget, loss is minimized by growing $N$ and $D$ together; many early models were over-parameterized and under-trained on too few tokens."
            },
            {
              "q": "Why can a sufficiently large autoregressive model perform a new task from a few examples placed in its prompt, with no weight updates (in-context learning)?",
              "choices": [
                "Because the masked language modeling objective explicitly trains for few-shot tasks",
                "Because gradient descent runs silently on the prompt tokens at inference time",
                "Because pretraining the joint distribution $p(x)$ at scale produced a model general enough to recognize and continue patterns, doing the 'learning' transiently in its activations",
                "Because the model stores every training example and retrieves the nearest match"
              ],
              "answer": 2,
              "explain": "In-context learning is an emergent property of large-scale generative pretraining: the pattern is inferred in the activations within a single forward pass, with parameters frozen and no gradient steps."
            },
            {
              "q": "MLM and autoregressive (AR) pretraining differ in how much learning signal each sequence provides. For a sequence of length $n$, how many prediction targets does a standard ~15% MLM objective yield versus the AR objective, and what is the consequence?",
              "choices": [
                "MLM yields $n$ targets and AR yields ~$0.15n$; AR is therefore sample-inefficient",
                "MLM yields ~$0.15n$ targets (only the masked tokens) while AR yields $n$ targets (every position), making MLM comparatively sample-inefficient per sequence",
                "Both yield exactly $n$ targets, so their sample efficiency is identical",
                "MLM yields $n^2$ targets because of bidirectional attention over all token pairs"
              ],
              "answer": 1,
              "explain": "MLM only gets a learning signal from the ~15% masked positions, whereas AR predicts every one of the $n$ tokens, so MLM extracts fewer targets per sequence and is somewhat less sample-efficient."
            },
            {
              "q": "The lesson stresses that pretraining loss falls as a smooth power law, yet some capabilities like multi-step arithmetic 'appear fairly abruptly' past a scale threshold (emergence). What is the correct reconciliation of these two facts?",
              "choices": [
                "The power law is wrong; loss actually jumps discontinuously whenever a capability emerges",
                "Emergence proves scaling laws only hold for small models and break down at large scale",
                "Average (smooth) loss and discrete downstream behaviors are different quantities, so a steadily declining loss can still hide sharp jumps in specific capabilities",
                "Emergent capabilities are caused by fine-tuning, not by the scale of pretraining"
              ],
              "answer": 2,
              "explain": "Smooth aggregate loss and discrete task behaviors are not the same metric, so the loss curve can decline steadily while particular capabilities turn on sharply past a threshold."
            },
            {
              "q": "Self-supervised learning is framed as maximizing $\\mathcal{L} = \\mathbb{E}_{x \\sim \\mathcal{D}}[\\log p_\\theta(x_{\\text{hid}} \\mid x_{\\text{vis}})]$. What makes this 'self'-supervised rather than ordinary supervised learning?",
              "choices": [
                "A separate teacher model generates the labels $x_{\\text{hid}}$ for each input",
                "The label $x_{\\text{hid}}$ is part of the input itself, just hidden and then predicted, so no human annotation is needed",
                "The loss has no labels at all; the model is trained purely to compress $x$",
                "Reinforcement signals from the environment replace human labels"
              ],
              "answer": 1,
              "explain": "Self-supervision manufactures its target by partitioning the input and hiding part of it, so the 'label' was always in the data and requires no human in the labeling loop."
            },
            {
              "q": "In the worked example (3,000 labeled tickets, closed-set 12-way classification), the lesson picks BERT-base + full fine-tuning over a 7B model + LoRA. According to its stated discipline, what is the primary reason, and when would the 7B+LoRA route instead be justified?",
              "choices": [
                "BERT is always superior to any 7B model, so LoRA is never worth using",
                "The MLM objective matches the classification task shape and the smaller model is cheaper to serve; reach for 7B+LoRA when you also need free-form generation, strong few-shot on rare categories, or one shared base serving many tasks",
                "LoRA cannot be applied to classification tasks at all, forcing the BERT choice",
                "Full fine-tuning is chosen only because LoRA always loses too much quality to be usable"
              ],
              "answer": 1,
              "explain": "The rule is to match the pretraining objective to the task shape first (bidirectional MLM fits closed-set classification) then pick the cheapest adaptation, with 7B+LoRA reserved for generation, strong few-shot, or shared-base multi-task serving."
            }
          ],
          "flashcards": [
            {
              "front": "Masked Language Modeling (MLM) objective — formula and key property?",
              "back": "$\\mathcal{L}_{\\text{MLM}} = \\mathbb{E}[\\sum_{i\\in M} \\log p_\\theta(x_i \\mid x_{\\setminus M})]$. Predicts randomly masked (~15%) tokens using BIDIRECTIONAL context. BERT family; great for understanding/encoding tasks."
            },
            {
              "front": "Autoregressive (next-token) objective — formula and key property?",
              "back": "$\\mathcal{L}_{\\text{AR}} = \\mathbb{E}[\\sum_i \\log p_\\theta(x_i \\mid x_{<i})]$ — the chain rule $p(x)=\\prod_i p(x_i\\mid x_{<i})$. CAUSAL (left-to-right) masking. GPT family; learns full $p(x)$, enabling generation and prompting."
            },
            {
              "front": "What is self-supervised learning, and why does it matter?",
              "back": "Manufacturing labels from the input itself by hiding part of $x$ and predicting it: maximize $\\log p_\\theta(x_{\\text{hid}}\\mid x_{\\text{vis}})$. Removes the human-labeling bottleneck, so the training set can be the whole internet."
            },
            {
              "front": "Scaling law for pretraining loss vs parameters?",
              "back": "$L(N) \\approx L_\\infty + (N_c/N)^{\\alpha_N}$ — power law: loss falls as a straight line on log-log axes, with small exponent $\\alpha_N$ (~0.07 for params). Lets you extrapolate a model's loss before training it. Diminishing returns."
            },
            {
              "front": "LoRA: idea, equation, parameter savings?",
              "back": "Specialization updates have low rank, so write $W' = W_0 + BA$ with $B\\in\\mathbb{R}^{d\\times r}$, $A\\in\\mathbb{R}^{r\\times d}$, $r\\ll d$. Freeze $W_0$, train only $A,B$: $2dr$ params instead of $d^2$. No added inference latency once merged."
            },
            {
              "front": "Chinchilla compute-optimal rule of thumb?",
              "back": "Training FLOPs $C \\approx 6ND$ ($N$=params, $D$=tokens). For a fixed budget, scale $N$ and $D$ together (roughly equally). Many early LLMs were under-trained (too big, too few tokens)."
            }
          ],
          "homework": [
            {
              "prompt": "For each task below, state whether a BERT-style (MLM, encoder) or GPT-style (autoregressive, decoder) pretrained model is the more natural primary choice, and justify in one sentence: (a) extracting all person names from a document (NER), (b) writing a coherent multi-paragraph product description from a title, (c) scoring whether two sentences are paraphrases, (d) a chatbot that follows free-form user instructions.",
              "hint": "Ask two questions per task: Is the full input available at inference (favoring bidirectional understanding), or must the model GENERATE new text (favoring autoregressive)?",
              "solution": "(a) BERT-style: NER is token classification over a fully-available input; bidirectional context disambiguates each token. (b) GPT-style: this is open-ended generation, which requires the autoregressive $p(x_i\\mid x_{<i})$ factorization to produce text one token at a time. (c) BERT-style: paraphrase scoring is classification over a complete pair of sentences, ideal for a bidirectional encoder. (d) GPT-style: free-form instruction following requires generating responses and benefits from in-context learning, both emergent properties of large AR models (usually plus instruction tuning)."
            },
            {
              "prompt": "A weight matrix has $d = 4096$. You apply LoRA with rank $r = 16$. (a) How many trainable parameters does LoRA introduce for this matrix? (b) How many would full fine-tuning update for the same matrix? (c) Express LoRA's trainable parameters as a percentage of full fine-tuning, and explain why low rank is sufficient.",
              "hint": "LoRA introduces $2dr$ parameters; full fine-tuning updates $d^2$. Compute both, then divide.",
              "solution": "(a) $2dr = 2 \\cdot 4096 \\cdot 16 = 131{,}072$ parameters. (b) $d^2 = 4096^2 = 16{,}777{,}216$ parameters. (c) Ratio $= 131{,}072 / 16{,}777{,}216 = 0.0078125 = 0.78\\%$. Low rank suffices because the UPDATE $\\Delta W$ needed to specialize an already-competent pretrained model has low intrinsic rank — specialization is a small course-correction confined to a tiny subspace, not a full re-learning of the matrix, so $BA$ with $r\\ll d$ captures nearly all of the useful change."
            },
            {
              "prompt": "Using the compute rule $C \\approx 6ND$: you have a budget of $C = 3 \\times 10^{21}$ FLOPs. (a) If you fix $N = 1 \\times 10^9$ parameters, how many training tokens $D$ can you afford? (b) Your colleague proposes a $1 \\times 10^{10}$-parameter model trained on the SAME number of tokens from part (a). Why is this likely compute-inefficient, and what does Chinchilla suggest instead?",
              "hint": "Solve $D = C / (6N)$. Then check whether increasing $N$ by 10x while holding $D$ fixed respects 'scale $N$ and $D$ together.'",
              "solution": "(a) $D = C/(6N) = 3\\times10^{21} / (6 \\cdot 1\\times10^9) = 3\\times10^{21} / (6\\times10^9) = 5\\times10^{11}$ tokens (500 billion). (b) Holding $D$ fixed at $5\\times10^{11}$ while raising $N$ tenfold to $1\\times10^{10}$ would require $C = 6ND = 6 \\cdot 1\\times10^{10} \\cdot 5\\times10^{11} = 3\\times10^{22}$ FLOPs — 10x over budget — OR, at the original budget, it leaves the larger model badly UNDER-trained (too few tokens per parameter). Chinchilla says that for a fixed compute budget you should grow $N$ and $D$ together in roughly equal proportion, so a 10x bigger model should be paired with substantially more tokens, not the same amount; otherwise the extra parameters are wasted."
            }
          ]
        },
        {
          "id": "dl-practical-training-and-debugging",
          "title": "Practical Deep Learning: Tooling, Debugging, and Evaluation",
          "minutes": 16,
          "content": "<p>Most deep learning failures are not failures of <em>ideas</em> — they are failures of <em>plumbing</em>. The architecture is fine; the data loader silently shuffled labels, or the loss is in the wrong units, or half the gradients are zero because of a dead ReLU. A practitioner who can read a loss curve and run a five-minute diagnostic loop will outperform a theoretician who treats training as a black box. This lesson builds that practitioner's mental model: how tensors actually live on a GPU, what mixed precision really trades, how automatic differentiation computes your gradients, which metrics to watch, and — most importantly — a systematic checklist for when training goes wrong.</p>\n\n<h3>1. The GPU/Tensor Mental Model</h3>\n\n<p>A deep learning model is, at runtime, a sequence of large array operations. The fundamental object is the <strong>tensor</strong>: an $n$-dimensional array with a <code>shape</code>, a <code>dtype</code> (e.g. <code>float32</code>, <code>bfloat16</code>), and a <code>device</code> (CPU or a specific GPU). Everything you debug eventually reduces to a question about one of these three attributes.</p>\n\n<h4>Why GPUs win</h4>\n<p>A CPU has a handful of powerful cores optimized for <em>latency</em> — finishing one complex instruction stream as fast as possible. A GPU has thousands of simpler cores optimized for <em>throughput</em> — doing the same operation across enormous arrays in parallel. Neural networks are dominated by matrix multiplication, and a matmul $C = AB$ with $A \\in \\mathbb{R}^{m\\times k}$, $B \\in \\mathbb{R}^{k\\times n}$ is <em>embarrassingly parallel</em>: each output entry</p>\n$$C_{ij} = \\sum_{l=1}^{k} A_{il}\\, B_{lj}$$\n<p>is an independent dot product. With $mn$ outputs each costing $k$ multiply-adds, the matmul is $O(mnk)$ FLOPs but has $O(mn)$ independent work units — perfect for a throughput machine. Modern GPUs add <strong>tensor cores</strong>: dedicated hardware that multiplies small matrix tiles (e.g. $16\\times16$) in a single instruction, which is exactly why low-precision matmul is so fast.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of the GPU as a factory. The conveyor belt (memory bandwidth) and the workers (compute cores) are both finite. A kernel is <strong>compute-bound</strong> when workers are the bottleneck (big matmuls) and <strong>memory-bound</strong> when the belt is (elementwise ops like adding a bias, applying a nonlinearity). Most \"why is my model slow?\" answers come down to <em>which</em> resource is saturated.</p>\n</div>\n\n<h4>The cost you actually pay: memory movement</h4>\n<p>A naive intuition is that compute (FLOPs) dominates. In practice, <strong>moving data</strong> often does. Reading from GPU global memory (HBM) is far slower than computing on data already in registers or on-chip SRAM. This is why <em>operator fusion</em> matters: instead of writing the output of a matmul to memory, reading it back, adding a bias, writing it, reading it again, and applying GELU, a fused kernel does <code>matmul → bias → GELU</code> in one pass. FlashAttention is the famous example — it reorders the attention computation to avoid ever materializing the full $n\\times n$ attention matrix in slow memory, turning a memory-bound operation into a compute-bound one.</p>\n\n<h4>Two memory categories during training</h4>\n<p>When you hit a CUDA out-of-memory error, the culprit is usually one of these:</p>\n<ul>\n<li><strong>Parameters + optimizer state.</strong> For Adam, you store weights, the gradient, the first moment $m$, and the second moment $v$ — roughly <em>4× the parameter count</em> in float32. A 1B-parameter model needs ~16 GB just for this.</li>\n<li><strong>Activations.</strong> Every intermediate tensor produced in the forward pass must be kept around for the backward pass (you need them to compute gradients). Activation memory scales with <em>batch size × sequence length × width × depth</em>, and it is usually the thing that explodes. Reducing batch size, using gradient checkpointing (recompute activations in backward instead of storing them), or shorter sequences are the standard fixes.</li>\n</ul>\n\n<h3>2. Mixed Precision: Trading Bits for Speed</h3>\n\n<p>Floating-point numbers split their bits into a <strong>sign</strong>, an <strong>exponent</strong> (dynamic range), and a <strong>mantissa</strong> (precision). The three formats you must know:</p>\n\n<ul>\n<li><code>float32</code> (FP32): 1 sign, 8 exponent, 23 mantissa. The default. Wide range, fine precision.</li>\n<li><code>float16</code> (FP16): 1 sign, 5 exponent, 10 mantissa. Fast, but <em>narrow range</em> — max value ~65504, and small gradients underflow to zero below ~$6\\times10^{-8}$.</li>\n<li><code>bfloat16</code> (BF16): 1 sign, <strong>8 exponent</strong>, 7 mantissa. Same range as FP32 (so no overflow/underflow drama) but coarser precision.</li>\n</ul>\n\n<p>The key insight: BF16 keeps FP32's exponent, so it trades precision for compatibility. That is why modern training defaults to BF16 — it rarely needs the babysitting that FP16 does.</p>\n\n<h4>Why loss scaling exists (the FP16 problem)</h4>\n<p>In FP16, gradients are often tiny — many fall below the smallest representable positive number and round to zero. A zero gradient is a dead update. The fix is <strong>loss scaling</strong>: multiply the loss by a large constant $S$ before backprop. By the chain rule, every gradient is scaled by the same $S$:</p>\n$$\\nabla_\\theta (S \\cdot L) = S \\cdot \\nabla_\\theta L$$\n<p>This shifts the gradients up into FP16's representable range. Right before the optimizer step, you divide the gradients by $S$ to recover the true values. <em>Dynamic</em> loss scaling adjusts $S$ automatically: increase it when things are stable, and halve it (skipping that step) whenever a gradient overflows to <code>inf</code>/<code>nan</code>. BF16 generally does not need this because its range matches FP32.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Mixed precision is not \"all of training in 16 bits.\" The standard recipe keeps a <strong>master copy of weights in FP32</strong> and accumulates the optimizer step in FP32, while doing the expensive matmuls in 16-bit. This preserves the small weight updates (which would vanish in 16-bit, since $w + \\epsilon \\approx w$ when $\\epsilon$ is below the mantissa resolution) while still getting the 2–8× speedup on tensor cores. The lesson: precision matters most where <em>small differences accumulate</em> — the weight update — and least where you do bulk arithmetic.</p>\n</div>\n\n<h3>3. Automatic Differentiation: How Frameworks Compute Gradients</h3>\n\n<p>You write the forward pass; the framework gives you exact gradients. This is <strong>reverse-mode automatic differentiation</strong> (backpropagation), and it is neither numerical (finite differences) nor symbolic (expression manipulation). It is the chain rule applied mechanically over a recorded computation graph.</p>\n\n<h4>The computation graph</h4>\n<p>As your code runs, the framework records each operation as a node with its inputs and a stored <em>local gradient rule</em>. Consider a tiny example:</p>\n<pre><code>x = tensor(2.0, requires_grad=True)\ny = tensor(3.0, requires_grad=True)\nz = x * y          # node: multiply\nw = z + x          # node: add\nL = w ** 2         # node: square\nL.backward()       # populates x.grad, y.grad</code></pre>\n\n<p>Let us compute the gradients by hand to see what <code>backward()</code> does. We have $z = xy$, $w = z + x = xy + x$, and $L = w^2$. Reverse mode starts at the output with $\\frac{\\partial L}{\\partial L} = 1$ and walks backward, multiplying local derivatives:</p>\n\n$$\\frac{\\partial L}{\\partial w} = 2w, \\qquad \\frac{\\partial w}{\\partial z} = 1, \\qquad \\frac{\\partial w}{\\partial x}\\Big|_{\\text{direct}} = 1, \\qquad \\frac{\\partial z}{\\partial x} = y, \\qquad \\frac{\\partial z}{\\partial y} = x$$\n\n<p>Now accumulate. The variable $x$ flows to $L$ through <em>two</em> paths ($x \\to z \\to w \\to L$ and $x \\to w \\to L$), so we sum their contributions:</p>\n\n$$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial w}\\left(\\frac{\\partial w}{\\partial z}\\frac{\\partial z}{\\partial x} + \\frac{\\partial w}{\\partial x}\\Big|_{\\text{direct}}\\right) = 2w\\,(y + 1)$$\n$$\\frac{\\partial L}{\\partial y} = \\frac{\\partial L}{\\partial w}\\frac{\\partial w}{\\partial z}\\frac{\\partial z}{\\partial y} = 2w \\cdot 1 \\cdot x = 2wx$$\n\n<p>Plugging in $x=2, y=3$: $z = 6$, $w = 8$, $L = 64$. Then $\\frac{\\partial L}{\\partial x} = 2(8)(3+1) = 64$ and $\\frac{\\partial L}{\\partial y} = 2(8)(2) = 32$. The framework computes exactly these numbers — the <em>summation over paths</em> is the multivariate chain rule, and it is why a variable used multiple times has its gradients <strong>added</strong>, not overwritten.</p>\n\n<h4>Why reverse mode, and why it's cheap</h4>\n<p>For a function $f:\\mathbb{R}^n \\to \\mathbb{R}$ (which is exactly the shape of \"many parameters → one scalar loss\"), reverse mode computes <em>all</em> $n$ partial derivatives in a single backward pass costing roughly the same as one forward pass — about $2\\times$ the forward FLOPs. Forward-mode AD would cost one pass per input, i.e. $O(n)$ passes. With $n$ in the millions or billions, only reverse mode is viable. This asymmetry is the single most important reason deep learning is computationally feasible.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Backpropagation is not a learning algorithm — it is just an efficient gradient calculator. The \"learning\" is gradient descent on top of it. Conflating the two is a common confusion. Separately: because the graph is built dynamically as Python runs (in PyTorch-style \"define-by-run\" frameworks), you can use ordinary control flow — <code>if</code>, loops, recursion — and still get correct gradients. The graph simply records whatever path actually executed. This flexibility is why eager frameworks won the research community.</p>\n</div>\n\n<h4>Three gotchas that cause silent bugs</h4>\n<ul>\n<li><strong>Gradients accumulate.</strong> Because of the sum-over-paths rule above, <code>.grad</code> is <em>added to</em>, not reset. You must call <code>optimizer.zero_grad()</code> each step or you'll be summing gradients across iterations.</li>\n<li><strong>Detaching breaks the graph.</strong> <code>.detach()</code> or <code>with torch.no_grad()</code> stops gradient flow. Useful for metrics and inference; a disaster if you accidentally detach part of your loss.</li>\n<li><strong>In-place ops can corrupt the backward pass.</strong> Overwriting a tensor that's needed for a gradient computation raises an error or gives wrong results.</li>\n</ul>\n\n<h3>4. Monitoring: What Metrics Actually Tell You</h3>\n\n<p>Logging the right scalars turns debugging from guesswork into diagnosis. The essential dashboard:</p>\n\n<ul>\n<li><strong>Training loss.</strong> Should decrease, roughly smoothly. A sanity baseline: at initialization, a $C$-class classifier with softmax + cross-entropy should give loss $\\approx \\ln C$ (uniform predictions). For $C=10$ that's $\\approx 2.30$. If your starting loss is wildly off, something is wrong before you even train.</li>\n<li><strong>Validation loss / metric.</strong> The honest signal of generalization. The <strong>gap</strong> between train and val tells you the bias-variance regime (next section).</li>\n<li><strong>Gradient norm.</strong> The global $\\ell_2$ norm $\\|g\\| = \\sqrt{\\sum_i g_i^2}$. Spiking to huge values or <code>nan</code> signals instability; collapsing to ~0 signals vanishing gradients or a dead network.</li>\n<li><strong>Learning rate.</strong> Log it — schedules and warmup bugs are common, and a flat loss is often just a too-small (or zeroed) LR.</li>\n<li><strong>Parameter/update ratio.</strong> A useful heuristic: the ratio $\\frac{\\|\\Delta\\theta\\|}{\\|\\theta\\|}$ per step should sit around $10^{-3}$. Much larger means LR too high; much smaller means too low.</li>\n</ul>\n\n<h3>5. The Train/Val Gap: Reading the Curves</h3>\n\n<p>Decompose expected error into bias and variance. Loosely, generalization error is</p>\n$$\\underbrace{\\text{train error}}_{\\text{bias-ish}} + \\underbrace{(\\text{val error} - \\text{train error})}_{\\text{variance / generalization gap}}.$$\n<p>Three diagnostic shapes:</p>\n<ul>\n<li><strong>High train loss, small gap (underfitting / high bias).</strong> Model can't even fit the training data. Fix: bigger model, train longer, higher LR, fewer regularizers, check the data pipeline.</li>\n<li><strong>Low train loss, large gap (overfitting / high variance).</strong> Memorizing, not generalizing. Fix: more data, augmentation, regularization (weight decay, dropout), early stopping, smaller model.</li>\n<li><strong>Both high and not improving.</strong> Often a <em>bug</em>, not a modeling issue — wrong loss, broken labels, frozen parameters, or a learning rate of zero. This is where the checklist below earns its keep.</li>\n</ul>\n\n<h3>6. The Systematic Debugging Checklist</h3>\n\n<p>When training misbehaves, resist the urge to randomly tweak hyperparameters. Work through this ordered checklist; it isolates bugs by category, cheapest first.</p>\n\n<h4>Step 1 — Overfit a single batch (the most valuable five minutes in DL)</h4>\n<p>Take one small batch and train on it repeatedly with everything else fixed. A correctly wired network with enough capacity <strong>must</strong> drive the loss to (near) zero — it can simply memorize a handful of examples. If it cannot:</p>\n<ul>\n<li>The loss is not connected to the parameters (detached graph, or you're optimizing the wrong tensor).</li>\n<li>The learning rate is zero/too small, or the optimizer isn't stepping.</li>\n<li>Labels and inputs are misaligned, so there's no learnable mapping.</li>\n<li>A bug in the forward pass (e.g. you return logits but compute loss against probabilities).</li>\n</ul>\n<p>This test is decisive precisely because it removes generalization from the equation. If you can't overfit one batch, no hyperparameter tuning will save you.</p>\n\n<h4>Step 2 — Check shapes and the loss scale</h4>\n<p>Shape bugs are the most common and the most insidious because <strong>broadcasting hides them</strong>. If your predictions are shape <code>(B, 1)</code> and targets are <code>(B,)</code>, many loss functions will broadcast to <code>(B, B)</code> and compute a nonsensical all-pairs loss that still produces a number and still \"trains.\" Always assert shapes explicitly. Then sanity-check the <em>scale</em>: as noted, cross-entropy should start near $\\ln C$; MSE on normalized targets should start near the target variance. A loss that starts at $10^4$ or $10^{-6}$ is a red flag about units, reduction (sum vs. mean), or normalization.</p>\n\n<h4>Step 3 — Inspect gradients</h4>\n<p>After <code>backward()</code>, examine per-layer gradient norms <em>before</em> the optimizer step:</p>\n<ul>\n<li><strong>All-zero or <code>None</code> grads</strong> on some layers ⇒ those parameters are disconnected from the loss (frozen, detached, or not used in the forward path).</li>\n<li><strong>Vanishing gradients</strong> (norms shrinking by orders of magnitude toward early layers) ⇒ depth/initialization/activation issue; consider residual connections, normalization, better init.</li>\n<li><strong>Exploding gradients / <code>nan</code></strong> ⇒ LR too high, missing normalization, or a numerically unstable op (e.g. <code>log(0)</code>, dividing by a near-zero, <code>sqrt</code> of a negative). Gradient clipping by norm is the standard stabilizer.</li>\n</ul>\n\n<h4>Step 4 — Diagnose NaNs specifically</h4>\n<p>A <code>nan</code> is contagious: once one appears, it poisons every downstream value. Common sources, in order of frequency:</p>\n<ul>\n<li><strong>$\\log$ of zero or negative</strong> — e.g. a hand-rolled cross-entropy. Use the framework's numerically stable, fused loss (e.g. <code>log_softmax</code> + NLL) instead of <code>log(softmax(x))</code>.</li>\n<li><strong>Division by zero / unnormalized denominators</strong> — add an $\\epsilon$ (e.g. in layer norm, $\\frac{x-\\mu}{\\sqrt{\\sigma^2 + \\epsilon}}$).</li>\n<li><strong>Exploding gradients overflowing</strong> — clip gradients; lower the LR; add warmup.</li>\n<li><strong>FP16 overflow</strong> — switch to BF16, or rely on dynamic loss scaling to skip the offending step.</li>\n</ul>\n<p>To localize: enable anomaly detection (which points to the op that produced the first <code>nan</code>), or bisect by logging the min/max of activations layer by layer until you find where finite turns to infinite.</p>\n\n<h3>7. Worked Example: Diagnosing a Flat Loss</h3>\n\n<p>Suppose you train a 10-class image classifier and the loss sits flat at $2.30$ and never moves. Walk the checklist:</p>\n<ol>\n<li><strong>Scale check:</strong> $2.30 \\approx \\ln 10$. The model is outputting uniform predictions — i.e. it's stuck at <em>initialization behavior</em>. Either it isn't learning or learning is undone each step.</li>\n<li><strong>Overfit one batch:</strong> still flat at 2.30. So this is not a generalization problem; the parameters aren't effectively updating.</li>\n<li><strong>Check the LR:</strong> we find the scheduler set LR to 0 after a warmup off-by-one. Fixing it, the loss on one batch drops to ~0.</li>\n</ol>\n<p>Alternative ending: if step 2's one-batch loss <em>does</em> drop but full training stays flat, the bug is in the data pipeline (e.g. labels shuffled independently of inputs, so there is no consistent mapping to learn — the population minimum really <em>is</em> $\\ln 10$). The checklist localized a single-line bug without touching the architecture. That is the entire point: change one variable at a time, start with the cheapest test, and let the metrics tell you which subsystem to suspect.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Notice the recurring theme: <strong>known invariants</strong> are your debugging anchors. Loss $\\approx \\ln C$ at init, gradients summing over paths, the $\\sim 2\\times$ cost of backprop, the update/weight ratio $\\sim 10^{-3}$ — each is a quantitative expectation you can check against reality. Expert practitioners aren't lucky; they've internalized a handful of these invariants and notice <em>immediately</em> when the numbers violate them.</p>\n</div>\n\n<h3>Summary</h3>\n<p>The practitioner's loop is: understand the hardware (tensors have shape/dtype/device; matmul is the workhorse; memory movement is often the real cost), choose precision deliberately (BF16 for range, loss scaling for FP16, FP32 master weights for the update), trust autodiff but respect its rules (zero grads, don't detach your loss, gradients accumulate over paths), watch the right metrics (loss scale, train/val gap, gradient norm, LR), and debug systematically (overfit one batch → check shapes/loss scale → inspect gradients → localize NaNs). Master this and you'll spend your time on ideas, not plumbing.</p>",
          "mcq": [
            {
              "q": "You train a 10-class classifier with softmax + cross-entropy. At the very first step, before any learning, what training loss should you roughly expect from a correctly-implemented model?",
              "choices": [
                "About 0, since the model hasn't overfit yet",
                "About $\\ln 10 \\approx 2.30$, because predictions are near-uniform at init",
                "About 10, equal to the number of classes",
                "It is undefined until the first backward pass"
              ],
              "answer": 1,
              "explain": "At initialization the softmax outputs are roughly uniform ($1/C$ each), so cross-entropy $= -\\ln(1/C) = \\ln C = \\ln 10 \\approx 2.30$. A starting loss far from this signals a bug before training even begins."
            },
            {
              "q": "Why does bfloat16 (BF16) usually NOT need loss scaling, whereas float16 (FP16) often does?",
              "choices": [
                "BF16 has more mantissa bits, so it is more precise",
                "BF16 uses the same 8-bit exponent as FP32, giving it FP32's dynamic range so small gradients don't underflow to zero",
                "BF16 stores weights in FP32 automatically",
                "Loss scaling is a property of the optimizer, not the dtype"
              ],
              "answer": 1,
              "explain": "BF16 trades mantissa bits for keeping FP32's 8-bit exponent, so it spans the same range. FP16's 5-bit exponent makes tiny gradients underflow to zero, which is exactly what loss scaling counteracts."
            },
            {
              "q": "In the graph $z = x\\,y$, $w = z + x$, $L = w^2$, why must $\\partial L/\\partial x$ be computed by adding contributions from two paths rather than a single chain?",
              "choices": [
                "Because multiplication is non-commutative",
                "Because $x$ influences $L$ through both $z$ and directly through $w$, and the multivariate chain rule sums over all paths",
                "Because reverse-mode AD always doubles every gradient",
                "Because the square operation has two roots"
              ],
              "answer": 1,
              "explain": "$x$ reaches $L$ via $x\\to z\\to w\\to L$ and via $x\\to w\\to L$. The multivariate chain rule sums these contributions, which is exactly why a tensor used multiple times has its gradients accumulated."
            },
            {
              "q": "Your network's training loss is flat. You overfit a single batch and the loss drops to near zero, but full-dataset training stays flat. What does this most strongly implicate?",
              "choices": [
                "A vanishing-gradient problem in the deep layers",
                "The learning rate is zero",
                "The data pipeline (e.g. labels misaligned with inputs), since the model CAN learn but the full task has no learnable mapping",
                "Insufficient model capacity"
              ],
              "answer": 2,
              "explain": "Successfully overfitting one batch proves the optimization path works and capacity/LR are fine. If full training still won't move, the consistent mapping is broken upstream — typically labels shuffled independently of inputs in the data loader."
            },
            {
              "q": "A matmul $C = AB$ with $A \\in \\mathbb{R}^{m\\times k}$ and $B \\in \\mathbb{R}^{k\\times n}$ costs $O(mnk)$ FLOPs. According to the lesson, why is this operation so well-suited to a GPU?",
              "choices": [
                "It has $O(mn)$ independent output entries, each an independent dot product, so the work parallelizes massively",
                "It minimizes memory bandwidth by reusing the same cache line for every output",
                "It requires only a single core because the dot products must be computed sequentially",
                "It reduces the total FLOP count below what a CPU would need"
              ],
              "answer": 0,
              "explain": "Each of the $mn$ output entries is an independent dot product, giving $O(mn)$ independent work units that map perfectly onto a throughput machine's thousands of cores."
            },
            {
              "q": "Adding a bias vector and applying a nonlinearity (elementwise ops) on a GPU are typically described as what, and why?",
              "choices": [
                "Compute-bound, because each element requires many multiply-adds",
                "Memory-bound, because they do little arithmetic per element so the bottleneck is moving the data",
                "Latency-bound, because they cannot be parallelized across cores",
                "Tensor-core-bound, because they run on dedicated 16x16 tile hardware"
              ],
              "answer": 1,
              "explain": "Elementwise ops perform almost no arithmetic per element, so the conveyor belt (memory bandwidth), not the workers (compute), is the limiting resource."
            },
            {
              "q": "The lesson contrasts CPUs and GPUs as optimized for different things. Which characterization matches the lesson?",
              "choices": [
                "CPUs have many simple throughput cores; GPUs have few latency-optimized cores",
                "Both are latency-optimized, but GPUs simply run at higher clock speeds",
                "CPUs have a few powerful latency-optimized cores; GPUs have thousands of simpler throughput-optimized cores",
                "GPUs win because they have larger caches per core than CPUs"
              ],
              "answer": 2,
              "explain": "A CPU uses a handful of powerful cores to finish one instruction stream fast (latency), while a GPU uses thousands of simpler cores to do the same op across huge arrays (throughput)."
            },
            {
              "q": "Tensor cores make low-precision matrix multiplication especially fast. What do they actually do, per the lesson?",
              "choices": [
                "They multiply small matrix tiles (e.g. $16\\times16$) in a single hardware instruction",
                "They automatically convert float32 to float16 to halve memory usage",
                "They scale the loss to prevent gradient underflow during backprop",
                "They replace matmuls with elementwise additions to save bandwidth"
              ],
              "answer": 0,
              "explain": "Tensor cores are dedicated hardware that multiply small matrix tiles in one instruction, which is exactly why low-precision matmul runs so fast."
            }
          ],
          "flashcards": [
            {
              "front": "What is the 'overfit a single batch' sanity check, and what does passing or failing it tell you?",
              "back": "Train repeatedly on one small batch with everything else fixed. A correctly wired, sufficiently large model MUST drive its loss to ~0 (it can memorize). Failure ⇒ the loss is disconnected from the parameters (detached graph, LR=0, misaligned labels, or a forward-pass bug) — not a generalization problem."
            },
            {
              "front": "Starting cross-entropy loss for a $C$-class classifier at initialization?",
              "back": "About $\\ln C$ (uniform predictions of $1/C$ give $-\\ln(1/C)=\\ln C$). E.g. $\\ln 10 \\approx 2.30$. A wildly different starting loss indicates a bug in units, reduction, or the loss itself."
            },
            {
              "front": "What does a large train/val gap (low train loss, high val loss) indicate, and how do you fix it?",
              "back": "Overfitting / high variance — the model memorizes rather than generalizes. Fixes: more data, augmentation, regularization (weight decay, dropout), early stopping, or a smaller model."
            },
            {
              "front": "Name three common causes of NaN loss, fastest to check first.",
              "back": "(1) log of zero/negative — use a stable fused loss (log_softmax+NLL) not log(softmax). (2) division by zero — add an $\\epsilon$ (e.g. in layer norm denominator). (3) exploding gradients / FP16 overflow — clip gradient norm, lower LR/add warmup, or switch to BF16."
            },
            {
              "front": "Why must you call optimizer.zero_grad() each step?",
              "back": "Because gradients ACCUMULATE (add into .grad) — a direct consequence of the chain rule summing contributions over all paths a parameter takes to the loss. Without zeroing, you sum gradients across iterations, corrupting the update."
            },
            {
              "front": "Why is reverse-mode autodiff (backprop) the right choice for neural nets?",
              "back": "For $f:\\mathbb{R}^n\\to\\mathbb{R}$ (many params → one scalar loss), reverse mode computes ALL $n$ gradients in one backward pass costing ~2× a forward pass. Forward mode would need $O(n)$ passes — infeasible for millions/billions of parameters."
            }
          ],
          "homework": [
            {
              "prompt": "You are training a transformer and the loss becomes NaN around step 500 after looking healthy before that. Write a systematic debugging plan: list, in priority order, the diagnostics you would run and the fixes you would try, explaining what each one rules in or out.",
              "hint": "A NaN that appears AFTER healthy steps is different from one at step 0. Think about what changes over the course of training (gradient magnitudes, LR schedule) versus what's constant (the loss formula, normalization). NaNs are contagious, so localizing the FIRST one matters.",
              "solution": "Because the loss was healthy for 500 steps, the formula and shapes are almost certainly fine — something that grows or shifts over training caused it. Priority-ordered plan:\n\n1) Log the global gradient norm every step and re-run. A spike right before the NaN points to EXPLODING GRADIENTS as the cause. Fix: add gradient clipping by norm (e.g. clip to 1.0) and/or lower the peak LR; add LR warmup if absent.\n\n2) Check the LR schedule at step ~500. A warmup-then-decay or a bad scheduler can push LR to a value that destabilizes training right at that point. Fix: smooth the schedule.\n\n3) Enable anomaly detection (e.g. torch.autograd.set_detect_anomaly) to identify the exact op that first produces NaN. This distinguishes forward-pass numerical issues (log(0), 0/0, sqrt of negative, layer-norm with zero variance) from backward overflow.\n\n4) If using FP16, suspect overflow: gradients grew past ~65504. Fix: switch to BF16 (same range as FP32) or rely on dynamic loss scaling, which detects the inf/nan and skips the step while halving the scale.\n\n5) Inspect activation min/max layer by layer just before the failing step to see where finite turns to infinite — this localizes a specific unstable layer (e.g. attention logits before softmax, fixable with logit scaling or a stable softmax).\n\n6) Audit any hand-rolled numerics: replace log(softmax(x)) with log_softmax, add epsilon to all denominators and sqrt arguments.\n\nThe through-line: a NaN after healthy training is overwhelmingly an instability that compounds (gradients/activations growing), so you instrument magnitudes over time and clip/stabilize, rather than re-deriving the loss."
            },
            {
              "prompt": "A network outputs predictions of shape $(B, 1)$ and your targets have shape $(B,)$. You compute MSE and training 'works' (loss decreases) but final accuracy is terrible. Explain precisely what likely went wrong and how to detect and prevent this class of bug.",
              "hint": "What happens when you do an elementwise operation between a $(B,1)$ tensor and a $(B,)$ tensor? Frameworks won't error — they'll do something. Think about broadcasting rules.",
              "solution": "Broadcasting silently corrupts the loss. Subtracting a $(B,)$ target from a $(B,1)$ prediction broadcasts to a $(B, B)$ tensor: every prediction is paired with every target, computing an all-pairs error matrix instead of the elementwise per-example error. The mean of this $(B,B)$ matrix is still a finite, differentiable scalar, so training 'works' and the loss decreases — but the model is being optimized against a nonsensical objective (roughly, pushing each prediction toward the batch mean of all targets), which is why accuracy is poor.\n\nDetection: (a) Assert shapes explicitly before the loss, e.g. assert pred.shape == target.shape. (b) Watch the loss SCALE — an all-pairs MSE has a different magnitude than a per-example MSE, so it won't match your sanity baseline (≈ target variance for normalized data). (c) The overfit-one-batch test will struggle to reach ~0 because the objective is malformed.\n\nPrevention: squeeze the prediction to $(B,)$ or unsqueeze the target to $(B,1)$ so shapes match exactly; add shape assertions at module boundaries; and never rely on broadcasting to 'just work' between predictions and targets — it is the single most common silent bug in DL pipelines."
            },
            {
              "prompt": "Estimate the memory needed to train a 1.3-billion-parameter model with the Adam optimizer in standard mixed-precision (FP32 master weights + FP32 Adam moments), ignoring activations. Then explain why this number is a lower bound and name two ways to reduce it.",
              "hint": "Adam stores, per parameter: the FP32 master weight, the first moment $m$, and the second moment $v$ — and you also need somewhere for the gradient. Count the FP32 copies (4 bytes each). Then remember what you ignored.",
              "solution": "Per parameter, the standard mixed-precision Adam state in FP32 is: master weight (4 bytes) + gradient (4 bytes) + first moment $m$ (4 bytes) + second moment $v$ (4 bytes) = 16 bytes. (Some setups also keep a 16-bit working copy of the weights, adding ~2 bytes, but 16 bytes/param is the canonical figure.)\n\nFor 1.3e9 parameters: 1.3e9 × 16 bytes = 20.8e9 bytes ≈ 20.8 GB just for parameters + optimizer state + gradients.\n\nWhy it's a lower bound: this IGNORES activations, which must be stored for the backward pass and scale with batch size × sequence length × width × depth. In practice activations often dominate memory and can dwarf the 20.8 GB, especially with long sequences or large batches. CUDA fragmentation and framework overhead add more.\n\nTwo reductions: (1) Optimizer/state sharding (e.g. ZeRO) splits the 16-byte-per-param state across multiple GPUs so each holds only a fraction. (2) For activations specifically, gradient (activation) checkpointing recomputes activations during backward instead of storing them, trading extra compute for much lower activation memory; reducing batch size or sequence length also directly cuts activation memory."
            }
          ]
        }
      ]
    }
  ]
}
);
