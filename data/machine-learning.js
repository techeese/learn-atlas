/* Atlas course — Machine Learning
   The 8th subject (classical / pre-deep-learning ML). Phase 1: kNN. More modules queued.
   Generated & guard-checked. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "machine-learning",
  "title": "Machine Learning",
  "icon": "ℳ",
  "color": "#6cae8f",
  "blurb": "Classical (pre-deep-learning) machine learning — the models, training, and evaluation that bridge the math foundations to deep nets: kNN, trees, linear models, SVMs, clustering, and ensembles.",
  "modules": [
    {
      "id": "ml-foundations",
      "title": "Instance- and Tree-Based Models",
      "lessons": [
        {
          "id": "ml-knn",
          "title": "k-Nearest Neighbors: Learning by Analogy",
          "minutes": 16,
          "content": "<h3>1. The hook: no training, just memory</h3>\n<p>Most learning algorithms digest a dataset into a compact set of parameters and then throw the data away. <strong>k-Nearest Neighbors (kNN)</strong> does the opposite: it keeps every training example and, when asked to predict, simply looks up the most similar past cases and copies their answer. It is learning by <em>analogy</em> — \"to label this new point, find the points it most resembles and let them vote.\" There is no model to fit, no equation to solve. That radical simplicity makes kNN the perfect first algorithm of classical machine learning, and a baseline every practitioner reaches for.</p>\n\n<h3>2. The algorithm</h3>\n<p>Given a labeled training set and a new query point $x$:</p>\n<ul>\n<li><strong>Measure distance</strong> from $x$ to every training point.</li>\n<li><strong>Find the $k$ closest</strong> training points — its \"neighbors.\"</li>\n<li><strong>Vote</strong>: for <em>classification</em>, predict the majority class among those $k$ neighbors; for <em>regression</em>, predict their average target value.</li>\n</ul>\n<p>That is the entire algorithm. The only choices are the number of neighbors $k$ and the distance measure. Everything interesting about kNN comes from those two knobs.</p>\n\n<h3>3. Distance: how \"near\" is defined</h3>\n<p>\"Nearest\" needs a metric. The default is <strong>Euclidean distance</strong>, the straight-line distance $d(x, z) = \\sqrt{\\sum_i (x_i - z_i)^2}$. Other choices include <strong>Manhattan distance</strong> $\\sum_i |x_i - z_i|$ (sum of absolute coordinate gaps) and, for text or sparse vectors, <strong>cosine</strong> similarity. The metric encodes what \"similar\" means for your problem, so it matters as much as $k$.</p>\n<p><strong>Feature scaling is critical.</strong> Distance sums over coordinates, so a feature measured in large units (say income in dollars, ranging to $10^5$) will swamp a feature in small units (age, ranging to $10^2$) — the neighbors are decided almost entirely by income. You must <em>standardize</em> features (rescale each to comparable ranges) before computing distances, or kNN silently ignores your small-scale features.</p>\n\n<h3>4. Choosing k: the bias-variance dial</h3>\n<p>The neighbor count $k$ controls the smoothness of the prediction, and it is a direct bias-variance tradeoff:</p>\n<ul>\n<li><strong>Small $k$</strong> (e.g. $k=1$): the prediction follows individual points, including noisy ones — low bias, high variance. The decision boundary is jagged and can <em>overfit</em>.</li>\n<li><strong>Large $k$</strong>: each prediction averages many neighbors, smoothing over noise but blurring real structure — high bias, low variance. Taken to the extreme ($k = n$), every query gets the same answer (the global majority).</li>\n</ul>\n<p>The sweet spot is found by cross-validation. A common practical tip: use an <em>odd</em> $k$ for two-class problems so the vote cannot tie.</p>\n\n<h3>5. The decision boundary</h3>\n<p>kNN draws no straight line; its decision boundary is whatever the data dictates — a piecewise, locally-defined surface. For $k=1$ the plane is carved into <strong>Voronoi cells</strong>, one per training point, each labeled by that point. Because the boundary can bend arbitrarily, kNN is a <strong>nonparametric</strong> method: it makes no assumption about the shape of the relationship, so it can capture highly nonlinear patterns that a linear model would miss.</p>\n\n<h3>6. The curse of dimensionality</h3>\n<p>kNN's Achilles' heel is high dimensions. As the number of features grows, points spread out so that <em>everything becomes roughly equidistant</em> — the gap between the nearest and farthest neighbor shrinks toward zero. \"Nearest\" stops being meaningful, and kNN's accuracy collapses. This is the <strong>curse of dimensionality</strong>, and it is why kNN shines on low-dimensional problems but needs dimensionality reduction (or a different model) when features number in the hundreds.</p>\n\n<h3>7. Lazy learning and its cost</h3>\n<p>kNN is the textbook <strong>lazy learner</strong>: training is instantaneous (just store the data), but every prediction is expensive — a naive query compares against all $n$ training points, costing $O(nd)$ per prediction in $d$ dimensions. For large datasets this is prohibitive, so practitioners use spatial indexes (KD-trees, ball trees) or approximate-nearest-neighbor structures to speed up the search.</p>\n\n<h3>8. The big picture</h3>\n<p>kNN trades model-building for memory: it assumes nothing, fits nothing, and predicts by analogy to stored cases. That makes it a superb baseline and a clean illustration of distance, feature scaling, the bias-variance tradeoff, and the curse of dimensionality — ideas you will meet again in every model that follows.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: kNN is the ultimate nonparametric model</summary>\n<p>\"Nonparametric\" does not mean \"no parameters\" — it means the model's <em>complexity grows with the data</em> instead of being fixed in advance. A linear model has a set number of weights no matter how much data you feed it; kNN effectively <em>is</em> its training set, so its \"capacity\" scales with $n$.</p>\n<p><b>A remarkable guarantee.</b> Despite its simplicity, kNN is backed by a famous result (Cover and Hart, 1967): as the training set grows without bound, the error rate of <em>1-nearest-neighbor</em> is at most <em>twice</em> the <b>Bayes error</b> — the irreducible error of the best possible classifier. One neighbor, no training, and you are already within a factor of two of optimal. With larger $k$ (growing slowly with $n$) kNN becomes <em>consistent</em>: its error converges to the Bayes error itself.</p>\n<p>The \"aha\": kNN's \"laziness\" is its theoretical strength. By refusing to commit to a functional form and instead deferring to the data at query time, it can approximate <em>any</em> decision boundary given enough examples — the price being memory and slow predictions, the classic space-and-time-for-assumptions trade.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why feature scaling is non-negotiable</summary>\n<p>kNN's entire worldview is distance, and distance is a <em>sum over features</em> — so any feature with a large numeric range silently dominates the verdict.</p>\n<p><b>A concrete failure.</b> Suppose you classify people by (age in years, salary in dollars). Two people differ by 10 years and 1000 dollars. The Euclidean distance is $\\sqrt{10^2 + 1000^2} \\approx 1000$ — the age term ($100$) is utterly drowned by the salary term ($10^6$). kNN will find \"neighbors\" with similar salaries and essentially ignore age, even if age is the more predictive feature. The model is not broken; it is faithfully measuring distance in a space where one axis is a thousand times longer than the other.</p>\n<p><b>The fix.</b> Rescale every feature to a comparable range before computing distances: <em>standardization</em> (subtract the mean, divide by the standard deviation, giving each feature unit variance) or <em>min-max normalization</em> (squash to $[0,1]$). After scaling, each feature contributes on equal footing and the neighbors reflect genuine similarity.</p>\n<p>The \"aha\": for distance-based methods, preprocessing <em>is</em> modeling. Skipping feature scaling does not just hurt accuracy a little — it can make kNN (and k-means, and SVMs with RBF kernels) measure similarity along the wrong axes entirely.</p>\n</details>",
          "mcq": [
            {
              "q": "What happens during the \"training\" phase of k-Nearest Neighbors?",
              "choices": [
                "Essentially nothing — the algorithm just stores the training data",
                "Gradient descent fits a set of weights",
                "A decision tree is grown from the data",
                "The class means are computed and the data discarded"
              ],
              "answer": 0,
              "explain": "kNN is a lazy learner: training only memorizes the dataset. All the work happens at prediction time, when neighbors are found and vote."
            },
            {
              "q": "To classify a new point, 5-NN looks at its 5 nearest neighbors with labels {A, A, B, A, B}. What does it predict?",
              "choices": [
                "A",
                "B",
                "A tie, so it refuses to predict",
                "The average of A and B"
              ],
              "answer": 0,
              "explain": "Majority vote: three A's beat two B's, so the prediction is A. (Using an odd k avoids ties in two-class problems.)"
            },
            {
              "q": "Why is feature scaling especially important for kNN?",
              "choices": [
                "It makes the algorithm train faster",
                "kNN cannot handle negative numbers",
                "Distances sum over features, so a large-range feature dominates and small-range features are effectively ignored",
                "It guarantees the decision boundary is linear"
              ],
              "answer": 2,
              "explain": "Because distance is a sum over coordinates, an unscaled large-range feature swamps the others, so neighbors are chosen almost entirely by that one feature."
            },
            {
              "q": "How does increasing k affect the bias-variance tradeoff?",
              "choices": [
                "Larger k increases variance and decreases bias",
                "k has no effect on bias or variance",
                "Larger k increases both bias and variance",
                "Larger k decreases variance and increases bias (smoother boundary)"
              ],
              "answer": 3,
              "explain": "A larger k averages more neighbors, smoothing the prediction: lower variance but higher bias. Small k is jagged (high variance, low bias)."
            },
            {
              "q": "What is the decision boundary of 1-NN over a set of training points?",
              "choices": [
                "Always a straight line",
                "A set of Voronoi cells, one per training point",
                "A single circle around the mean",
                "Undefined for more than two classes"
              ],
              "answer": 1,
              "explain": "1-NN assigns each region of space to its closest training point, partitioning the plane into Voronoi cells labeled by those points."
            },
            {
              "q": "The \"curse of dimensionality\" hurts kNN because, as dimensions grow,",
              "choices": [
                "the training step becomes too slow",
                "the labels become noisier",
                "all points become roughly equidistant, so \"nearest\" loses meaning",
                "Euclidean distance can no longer be computed"
              ],
              "answer": 2,
              "explain": "In high dimensions distances concentrate — nearest and farthest neighbors become nearly the same distance — so the notion of a meaningful nearest neighbor breaks down."
            },
            {
              "q": "Calling kNN a \"nonparametric\" method means that",
              "choices": [
                "it has no tunable settings at all",
                "it can only be used for regression",
                "it assumes the data is normally distributed",
                "its effective complexity grows with the amount of data rather than being fixed"
              ],
              "answer": 3,
              "explain": "Nonparametric means the model does not commit to a fixed functional form; its capacity scales with the dataset (kNN effectively is its training set)."
            },
            {
              "q": "What is the main computational drawback of kNN?",
              "choices": [
                "Training requires expensive matrix inversion",
                "Prediction is slow because each query compares against many stored points",
                "It needs enormous amounts of memory during training only",
                "It cannot be parallelized"
              ],
              "answer": 1,
              "explain": "kNN defers all work to query time: a naive prediction is O(nd), comparing the query against all n training points. Spatial indexes mitigate this."
            }
          ],
          "flashcards": [
            {
              "front": "How does kNN make a prediction?",
              "back": "Find the k training points nearest the query (by some distance metric), then take the majority label (classification) or average target (regression) of those neighbors."
            },
            {
              "front": "Why must features be scaled before using kNN?",
              "back": "Distance sums over features, so a feature with a large numeric range dominates the distance and others are ignored. Standardize or normalize so each feature contributes equally."
            },
            {
              "front": "What does k control in kNN?",
              "back": "The bias-variance tradeoff: small k → jagged, low-bias/high-variance (can overfit); large k → smooth, high-bias/low-variance. Tune k by cross-validation."
            },
            {
              "front": "Why does kNN struggle in high dimensions?",
              "back": "The curse of dimensionality: as features grow, points become roughly equidistant, so \"nearest neighbor\" stops being meaningful and accuracy collapses."
            },
            {
              "front": "What makes kNN a 'lazy' / nonparametric learner?",
              "back": "It does no real training (just stores data) and assumes no fixed functional form — its complexity grows with the data. Cost is paid at prediction time."
            }
          ],
          "homework": [
            {
              "q": "You build a kNN classifier on (age, annual income) without scaling and find it performs no better than guessing the majority class. Explain what likely went wrong and how to fix it.",
              "solution": "Income has a vastly larger numeric range than age, so Euclidean distance is dominated by income differences and age is effectively ignored — neighbors are chosen almost entirely by income. Standardize both features (subtract mean, divide by standard deviation) or min-max normalize them so each contributes comparably, then refit. Distance-based methods require scaled features."
            },
            {
              "q": "For a fixed dataset, describe what happens to the training error and the test (generalization) behavior of kNN as k goes from 1 to n. Why is k=1 not the best choice despite its zero training error?",
              "solution": "At k=1 the training error is 0 (each point is its own nearest neighbor) but the model overfits noise — high variance, jagged boundary, poor test accuracy. As k grows, the boundary smooths: variance drops and bias rises. At k=n every prediction is the global majority class (maximally biased). The best test accuracy is at an intermediate k found by cross-validation; k=1's zero training error is a classic overfitting trap, not a sign of a good model."
            }
          ],
          "examples": [
            {
              "title": "Classifying a point by 3-NN, step by step",
              "scenario": "Training points (feature x, label): (1, A), (2, A), (5, B), (6, B), (7, B). Classify a query at x = 4 using 3-NN with absolute-value (1-D Euclidean) distance.",
              "solution": "Distances from 4: |4-1|=3, |4-2|=2, |4-5|=1, |4-6|=2, |4-7|=3. The three smallest are 1 (point 5, B), 2 (point 2, A), 2 (point 6, B) — neighbors {B, A, B}. Majority vote → B. Note the query sat between the clusters, and the nearest single point (x=5, B) plus one more B outvoted the lone A."
            },
            {
              "title": "How scaling flips the nearest neighbor",
              "scenario": "Two training points: P = (age 30, income 40000, class 'declines') and Q = (age 50, income 41000, class 'accepts'). Query R = (age 31, income 41000). Which neighbor is closer, unscaled vs. standardized?",
              "solution": "Unscaled Euclidean: to P = sqrt(1^2 + 1000^2) ≈ 1000.0; to Q = sqrt(19^2 + 0^2) = 19. So R is 'nearest' to Q — decided entirely by income. But R is 1 year from P in age and 19 years from Q. After standardizing (so age and income have comparable spread), the 1-year age gap to P outweighs the tiny income gap, and R becomes nearest to P instead. Same data, opposite neighbor — scaling changed the answer."
            }
          ]
        },
        {
          "id": "ml-decision-trees",
          "title": "Decision Trees: Learning by Asking Questions",
          "minutes": 18,
          "content": "<h3>1. The hook: a flowchart that learns itself</h3>\n<p>Play twenty questions and you are running a decision tree: each yes/no answer narrows the possibilities until you are confident. A <strong>decision tree</strong> is exactly that — a flowchart of simple tests, learned automatically from data. Ask \"is petal length less than 2.5 cm?\", branch, ask another question, branch again, and eventually arrive at a verdict. Unlike kNN (which keeps all the data) or linear models (which fit weights), a tree distills the data into a readable set of <em>if-then rules</em> — which is why decision trees are the most <em>interpretable</em> model in mainstream machine learning.</p>\n\n<h3>2. Anatomy of a tree</h3>\n<p>A tree has three kinds of node. The <strong>root</strong> holds the first question. Each <strong>internal node</strong> is a test on one feature (e.g. \"age $\\gt$ 30?\") with one branch per outcome. Each <strong>leaf</strong> carries a prediction — a class label (classification) or a number (regression). Following the path from root to leaf reads off a rule like \"if age $\\gt$ 30 and income $\\lt$ 40k then predict 'declines'.\" The whole tree is just a nested pile of such rules.</p>\n\n<h3>3. How a tree learns: greedy recursive splitting</h3>\n<p>Trees are grown <strong>top-down</strong>. Starting with all the data at the root, the algorithm asks: <em>of every possible feature and split threshold, which one best separates the classes?</em> It picks that split, partitions the data into children, and then <em>recurses</em> on each child — splitting again and again until a stopping rule fires (a leaf is pure, too few samples remain, or a depth limit is hit). This is the CART / ID3 family of algorithms. The key question is what \"best separates\" means — that needs a measure of <em>node impurity</em>.</p>\n\n<h3>4. Splitting criteria: impurity</h3>\n<p>A node is <em>pure</em> if all its samples share one class. We want splits that make children purer than the parent. Two impurity measures dominate, both functions of the class proportions $p_i$ in a node:</p>\n<ul>\n<li><strong>Gini impurity</strong>: $G = 1 - \\sum_i p_i^2$ — the chance you would mislabel a random sample if you guessed by the node's class frequencies. Zero when pure, maximal when classes are balanced.</li>\n<li><strong>Entropy</strong>: $H = -\\sum_i p_i \\log_2 p_i$ — the average \"surprise\" (in bits) of the labels. Also zero when pure, maximal when balanced.</li>\n</ul>\n<p>For a candidate split, compute the <strong>information gain</strong> — the parent's impurity minus the size-weighted average impurity of the children: $$\\text{IG} = H(\\text{parent}) - \\sum_k \\frac{n_k}{n}\\, H(\\text{child}_k).$$ The algorithm greedily picks the split with the largest gain (largest impurity drop). For <em>regression</em> trees the same idea uses <em>variance</em> reduction instead of class impurity.</p>\n\n<h3>5. A split, by the numbers</h3>\n<p>Suppose a node has 10 samples: 5 positive, 5 negative — maximally impure, $G = 1 - (0.5^2 + 0.5^2) = 0.5$. A candidate split sends 4 samples left (4 positive, 0 negative — pure, $G=0$) and 6 right (1 positive, 5 negative, $G = 1 - ((1/6)^2 + (5/6)^2) \\approx 0.278$). The weighted child impurity is $\\tfrac{4}{10}(0) + \\tfrac{6}{10}(0.278) = 0.167$, an impurity <em>drop</em> of $0.5 - 0.167 = 0.333$. A competing split with a smaller drop loses. That single comparison, repeated over every feature and threshold, is the whole training loop.</p>\n\n<h3>6. Overfitting: a tree can memorize</h3>\n<p>Left unchecked, a tree will keep splitting until <em>every leaf is pure</em> — in the worst case, one leaf per training point. That tree has 100% training accuracy and has simply <em>memorized</em> the data, noise included; it generalizes terribly. Decision trees are the poster child for overfitting precisely because their capacity grows without bound as they deepen.</p>\n\n<h3>7. Taming the tree: pruning and limits</h3>\n<p>Two remedies. <strong>Pre-pruning</strong> stops growth early: cap the maximum depth, require a minimum number of samples to split a node or to form a leaf, or demand a minimum impurity decrease. <strong>Post-pruning</strong> grows a full tree then snips back branches that don't help a validation set — <em>cost-complexity pruning</em> formalizes this by penalizing the tree's size. Both trade a little training accuracy for much better generalization.</p>\n\n<h3>8. The big picture</h3>\n<p>A decision tree turns data into a transparent cascade of questions by greedily choosing impurity-reducing splits, then prunes to avoid memorizing. Its gifts — interpretability, no need for feature scaling, native handling of mixed feature types and feature interactions — make it a favorite. Its curse is <em>instability</em>: one tree is high-variance and rarely top-accuracy alone. That weakness is exactly what <strong>ensembles</strong> (random forests, gradient boosting — coming later in this topic) were invented to fix, by combining many trees.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why trees are greedy (and what that costs)</summary>\n<p>Growing a decision tree top-down, one locally-best split at a time, is a <b>greedy heuristic</b> — and it has to be, because finding the <em>optimal</em> tree is intractable.</p>\n<p><b>The hardness.</b> Constructing the smallest (or most accurate) decision tree consistent with the data is <b>NP-hard</b>: the number of possible trees explodes combinatorially, so you cannot search them all. CART and ID3 sidestep this by never reconsidering — at each node they grab the single split with the highest immediate information gain and move on.</p>\n<p><b>The cost of greed.</b> Locally-best is not globally-best. A split that looks weak now might enable two excellent splits below it, and the greedy algorithm will miss that (it is the same exploration-vs-immediate-reward issue greedy algorithms always have). This is one reason a single tree is brittle, and why a feature interaction that needs two coordinated splits can be hard for a greedy tree to discover.</p>\n<p>The \"aha\": decision-tree training is a greedy approximation to an NP-hard search. That greed buys speed (training is fast and scalable) at the price of optimality and stability — and recovering some of that lost accuracy is precisely what boosting and random forests do by growing <em>many</em> imperfect trees and combining them.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Gini vs entropy — do they actually differ?</summary>\n<p>Two impurity measures, almost identical in practice — but they measure subtly different things.</p>\n<p><b>Entropy</b> $H = -\\sum_i p_i \\log_2 p_i$ is the average <em>surprisal</em> of the labels in bits (straight from information theory); the corresponding split score, <em>information gain</em>, is the reduction in label uncertainty. <b>Gini</b> $G = 1 - \\sum_i p_i^2$ is the probability of <em>misclassifying</em> a sample labeled at random according to the node's class frequencies. Both are $0$ at purity and maximal when classes are balanced, and both are concave, which is what makes any split (weakly) reduce impurity.</p>\n<p><b>Do they pick different trees?</b> Rarely. Empirically the two agree on the chosen split the large majority of the time; disagreements are minor and wash out after pruning. The practical differences: Gini avoids the $\\log$ so it is a touch <em>cheaper</em> to compute (the default in scikit-learn's CART), while entropy's information-gain framing connects trees to the same cross-entropy ideas used across the rest of machine learning.</p>\n<p>The \"aha\": don't agonize over Gini vs entropy — they are two concave impurity measures that almost always agree. Pick Gini for speed, entropy if you want the clean information-theoretic story; the bigger decisions (depth, pruning, ensembling) dwarf this one.</p>\n</details>",
          "mcq": [
            {
              "q": "How does a trained decision tree make a prediction for a new input?",
              "choices": [
                "It averages the predictions of all leaves",
                "It finds the k nearest training points and votes",
                "It follows the feature tests from the root down to a leaf and returns that leaf's value",
                "It multiplies the input by a learned weight vector"
              ],
              "answer": 2,
              "explain": "Prediction routes the input through the yes/no tests from root to a leaf; the leaf holds the predicted class or value."
            },
            {
              "q": "At each node, a greedy (CART/ID3) tree learner chooses the split that...",
              "choices": [
                "most reduces the impurity of the resulting child nodes",
                "produces exactly two equal-sized children",
                "uses the feature with the largest numeric values",
                "minimizes the depth of the tree"
              ],
              "answer": 0,
              "explain": "Greedy top-down induction picks, at each node, the feature/threshold giving the largest impurity decrease (information gain)."
            },
            {
              "q": "The Gini impurity of a node with class proportions $p_i$ is",
              "choices": [
                "$\\sum_i p_i \\log_2 p_i$",
                "$\\max_i p_i$",
                "$\\sum_i p_i^2$",
                "$1 - \\sum_i p_i^2$"
              ],
              "answer": 3,
              "explain": "Gini is $1 - \\sum_i p_i^2$ — the probability of mislabeling a sample guessed from the node's class frequencies; 0 when pure."
            },
            {
              "q": "Why do unconstrained decision trees overfit so easily?",
              "choices": [
                "They require the features to be normalized first",
                "They can keep splitting until every leaf is pure, memorizing noise",
                "They always pick the wrong feature to split on",
                "They average too many points together"
              ],
              "answer": 1,
              "explain": "With no limit, a tree grows until leaves are pure — in the worst case one training point per leaf — memorizing noise and generalizing poorly."
            },
            {
              "q": "Which of these combats overfitting in a decision tree?",
              "choices": [
                "Limiting depth, requiring a minimum samples per leaf, or pruning",
                "Adding more features",
                "Switching the impurity measure from Gini to entropy",
                "Increasing the number of leaves"
              ],
              "answer": 0,
              "explain": "Pre-pruning (depth/min-samples/min-gain limits) and post-pruning (snipping unhelpful branches) restrain capacity and improve generalization."
            },
            {
              "q": "A standout advantage of decision trees over kNN and linear models is that they",
              "choices": [
                "always achieve the highest accuracy",
                "are guaranteed to find the globally optimal model",
                "require very large datasets to work at all",
                "are interpretable as if-then rules and need no feature scaling"
              ],
              "answer": 3,
              "explain": "Trees read out as transparent rules and split on one feature at a time, so they are scale-invariant and need no standardization — unlike kNN."
            },
            {
              "q": "A key weakness of a single decision tree is that it is",
              "choices": [
                "unable to handle categorical features",
                "high-variance — a small change in the data can yield a very different tree",
                "only usable for regression, not classification",
                "incapable of modeling feature interactions"
              ],
              "answer": 1,
              "explain": "Single trees are unstable/high-variance; small data perturbations can change early splits and reshape the whole tree — which ensembles fix."
            },
            {
              "q": "Finding the globally optimal decision tree is",
              "choices": [
                "solvable in linear time by sorting the features",
                "trivial once the data is scaled",
                "NP-hard, so practical learners use greedy top-down splitting",
                "only possible with gradient descent"
              ],
              "answer": 2,
              "explain": "Optimal tree construction is NP-hard; CART/ID3 are greedy heuristics that take the locally-best split at each node rather than searching all trees."
            }
          ],
          "flashcards": [
            {
              "front": "How is a decision tree grown?",
              "back": "Top-down and greedily: at each node pick the feature/threshold split that most reduces impurity (information gain), partition the data, and recurse on each child until a stopping rule fires."
            },
            {
              "front": "Gini impurity vs entropy",
              "back": "Gini = 1 − Σ pᵢ² (expected misclassification rate); Entropy = −Σ pᵢ log₂ pᵢ (average surprisal in bits). Both are 0 at purity, max when balanced, and almost always pick the same split. Gini is cheaper (no log)."
            },
            {
              "front": "Why do decision trees overfit, and how do you stop it?",
              "back": "Unconstrained, a tree splits until leaves are pure (memorizing noise). Fix with pre-pruning (max depth, min samples per leaf/split, min impurity decrease) or post-pruning (cost-complexity)."
            },
            {
              "front": "Strengths and the key weakness of a single tree",
              "back": "Strengths: interpretable if-then rules, no feature scaling needed, handles mixed types and interactions. Weakness: high variance (unstable) — motivating ensembles (random forests, boosting)."
            },
            {
              "front": "Why is decision-tree training greedy?",
              "back": "Finding the optimal tree is NP-hard, so CART/ID3 take the locally-best split at each node. Fast and scalable, but locally-best ≠ globally-best — a source of instability."
            }
          ],
          "homework": [
            {
              "q": "A node has 8 samples: 6 of class A and 2 of class B. Compute its Gini impurity and its entropy (in bits). Then a split sends all 6 A's left (pure) and both B's right (pure) — what is the information gain (impurity drop) for both measures?",
              "solution": "Proportions p_A=6/8=0.75, p_B=0.25. Gini = 1 − (0.75² + 0.25²) = 1 − (0.5625 + 0.0625) = 0.375. Entropy = −(0.75·log2 0.75 + 0.25·log2 0.25) = −(0.75·(−0.415) + 0.25·(−2)) = 0.311 + 0.5 = 0.811 bits. Both children are pure (impurity 0), so the weighted child impurity is 0 for both measures. Information gain = parent − 0 = 0.375 (Gini) and 0.811 bits (entropy). A perfect split drives impurity to zero, so the gain equals the parent's impurity."
            },
            {
              "q": "Explain why a decision tree achieving 100% accuracy on its training set is usually a warning sign rather than a success, and name two ways to address it.",
              "solution": "100% training accuracy almost always means the tree grew deep enough to isolate individual points into pure leaves — it has memorized the training data including its noise, so it will generalize poorly (high variance, classic overfitting). The training score is not evidence of a good model; the test/validation score is. Fix it by restraining capacity: pre-pruning (cap max depth, require a minimum number of samples per leaf or to split, or a minimum impurity decrease) and/or post-pruning (grow fully, then cost-complexity-prune back branches that don't help a validation set). Ensembling (random forests) also reduces the variance."
            }
          ],
          "examples": [
            {
              "title": "Choosing the better split by information gain",
              "scenario": "A parent node has 10 samples (5 positive, 5 negative), Gini = 0.5. Split X yields children (4 pos / 0 neg) and (1 pos / 5 neg). Split Y yields (3 pos / 2 neg) and (2 pos / 3 neg). Which split does a Gini-based tree pick?",
              "solution": "Split X: left (4/0) is pure, G=0; right (1/5) has G = 1 − ((1/6)² + (5/6)²) = 1 − (0.028 + 0.694) = 0.278. Weighted = 0.4·0 + 0.6·0.278 = 0.167, gain = 0.5 − 0.167 = 0.333. Split Y: left (3/2) G = 1 − (0.6² + 0.4²) = 0.48; right (2/3) G = 0.48. Weighted = 0.5·0.48 + 0.5·0.48 = 0.48, gain = 0.5 − 0.48 = 0.02. Split X's gain (0.333) hugely beats Y's (0.02), so the tree picks X — it isolates a pure group, exactly what impurity reduction rewards."
            },
            {
              "title": "Depth limit vs a fully grown tree",
              "scenario": "On a noisy 2-feature dataset, a depth-unlimited tree scores 100% train / 71% test; a depth-3 tree scores 88% train / 84% test. Which model is better, and what does the gap tell you?",
              "solution": "The depth-3 tree is better: what matters is test performance (84% vs 71%), and it generalizes far better despite lower training accuracy. The unlimited tree's perfect train score with a 29-point train-test gap is textbook overfitting — it carved pure leaves around noisy points. The shallow tree's small 4-point gap shows it captured the real signal without memorizing noise. The lesson: maximize validation/test accuracy, not training accuracy, and use depth limits or pruning to control the train-test gap."
            }
          ]
        }
      ]
    },
    {
      "id": "ml-linear-models",
      "title": "Linear Models",
      "lessons": [
        {
          "id": "ml-linear-regression",
          "title": "Linear Regression: Predicting with a Line",
          "minutes": 17,
          "content": "<h3>1. The hook: the simplest useful predictor</h3>\n<p>You want to predict a number — a house price, a temperature, tomorrow's sales — from some features. The simplest model that could possibly work is a <strong>weighted sum</strong>: multiply each feature by an importance weight, add them up, add a baseline. That is <strong>linear regression</strong>, the oldest and most-used model in statistics and the foundation that logistic regression, regularization, and even neural networks build upon. Master it and you have the template for nearly every supervised learner that follows.</p>\n\n<h3>2. The model</h3>\n<p>Given a feature vector $x = (x_1, \\dots, x_d)$, a linear model predicts $$\\hat{y} = w_1 x_1 + w_2 x_2 + \\dots + w_d x_d + b = w^\\top x + b,$$ where the <strong>weights</strong> $w_j$ say how much each feature pushes the prediction and $b$ (the <strong>bias</strong> or intercept) is the baseline when all features are zero. Training means finding the $w$ and $b$ that fit the data best. With one feature this is the familiar \"line of best fit\"; with many features it is a hyperplane.</p>\n\n<h3>3. The objective: least squares</h3>\n<p>\"Best fit\" needs a definition. Linear regression minimizes the <strong>mean squared error</strong> between predictions and truth: $$\\text{MSE}(w,b) = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2.$$ Each $(y_i - \\hat{y}_i)$ is a <em>residual</em> — how far the line misses point $i$. Squaring makes all errors positive, penalizes big misses heavily, and yields a smooth, convex objective with a single global minimum. Geometrically you are sliding and tilting the line to make the total squared vertical gap as small as possible.</p>\n\n<h3>4. Two ways to solve it</h3>\n<p>Because MSE is convex and quadratic, there is a <strong>closed-form solution</strong> — the <em>normal equations</em>: stack the data into a matrix $X$ and solve $$w = (X^\\top X)^{-1} X^\\top y.$$ (Geometrically this projects $y$ onto the column space of $X$ — the least-squares-as-projection view.) For small-to-medium problems this is exact and instant. When the features or samples number in the millions, inverting $X^\\top X$ is too expensive, so you instead minimize the MSE by <strong>gradient descent</strong>, taking steps downhill on the loss — the same workhorse that trains neural nets.</p>\n\n<h3>5. Reading the coefficients</h3>\n<p>A great virtue of linear regression is <em>interpretability</em>. Each weight $w_j$ is the expected change in the prediction for a one-unit increase in feature $j$, <em>holding the other features fixed</em>. A positive $w_j$ means the feature pushes the target up; near zero means little effect. Because the weights carry the features' units, you often <em>standardize</em> features first so the magnitudes are comparable and you can read off which features matter most.</p>\n\n<h3>6. Evaluating the fit</h3>\n<p>The standard score is $R^2$ (the coefficient of determination): $$R^2 = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^2}{\\sum_i (y_i - \\bar{y})^2},$$ the fraction of the target's variance the model explains. $R^2 = 1$ is a perfect fit; $R^2 = 0$ means the model does no better than always predicting the mean $\\bar{y}$. But beware: $R^2$ on the <em>training</em> set always rises as you add features, even useless ones — so a high training $R^2$ can hide overfitting. Always judge on held-out data.</p>\n\n<h3>7. When the line lies: assumptions and limits</h3>\n<p>Linear regression assumes the relationship is (roughly) linear and the noise is well-behaved. If the true relationship curves, a straight fit is biased no matter how much data you have (underfitting). With many correlated features it can overfit and its coefficients become unstable (<em>multicollinearity</em>). The next lesson — <em>regularization</em> — addresses exactly this, taming the weights to trade a little bias for much less variance.</p>\n\n<h3>8. The big picture</h3>\n<p>Linear regression is a weighted sum trained by minimizing squared error, solvable exactly (normal equations) or iteratively (gradient descent), and prized for interpretable coefficients and a clean $R^2$ score. It is the atom of supervised learning: swap the squared-error loss for a different one and add a squashing function, and you get logistic regression; add a penalty and you get ridge/lasso; stack many and add nonlinearities and you get a neural network.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why squared error? (the Gaussian/MLE story)</summary>\n<p>Why <em>square</em> the residuals rather than take absolute values or some other penalty? There is a deep statistical reason, not just mathematical convenience.</p>\n<p><b>Squared error is maximum likelihood under Gaussian noise.</b> Assume the data is generated as $y_i = w^\\top x_i + b + \\varepsilon_i$ with the noise $\\varepsilon_i$ drawn independently from a Gaussian (normal) distribution. Writing down the likelihood of the data and maximizing it, the exponent of the Gaussian is $-(y_i - \\hat{y}_i)^2/(2\\sigma^2)$ — so <em>maximizing</em> the log-likelihood is exactly <em>minimizing</em> the sum of squared residuals. Least squares is not an arbitrary choice; it is the MLE whenever you believe the errors are Gaussian.</p>\n<p><b>The flip side: outliers.</b> Because the penalty grows with the <em>square</em> of the residual, a single far-off point can dominate the fit and drag the line toward it. If your noise has heavy tails or outliers, the Gaussian assumption is wrong, and robust losses — absolute error (MAE, the MLE under a Laplace distribution) or the Huber loss (quadratic near zero, linear in the tails) — fit better.</p>\n<p>The \"aha\": the loss you choose encodes an assumption about the noise. Squared error quietly assumes Gaussian errors (and gives you the clean closed form and convexity as a bonus); when that assumption breaks, switch losses rather than blaming the model.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: \"linear\" means linear in the parameters, not the features</summary>\n<p>A common misconception is that linear regression can only fit straight lines. It can fit wild curves — the word \"linear\" refers to the <em>weights</em>, not the inputs.</p>\n<p><b>Transform the features, keep the linear solver.</b> The model is linear in $w$: $\\hat{y} = \\sum_j w_j \\phi_j(x)$ for <em>any</em> fixed feature functions $\\phi_j$. Choose $\\phi(x) = (1, x, x^2, x^3)$ and you are doing <b>polynomial regression</b> — fitting a cubic — yet the math is still ordinary least squares, because each new column ($x^2$, $x^3$) is just another feature. Logs, interactions ($x_1 x_2$), sines, indicator variables: all are fair game. The decision boundary or curve becomes nonlinear in $x$ while the optimization stays the easy linear problem in $w$.</p>\n<p><b>Where it leads.</b> This \"lift the features into a richer space, then fit linearly\" idea is exactly the <em>kernel trick</em> in disguise (used by SVMs) and the reason classical ML leans so hard on <em>feature engineering</em>. It also warns you about overfitting: a high-degree polynomial has many weights and will happily wiggle through every training point.</p>\n<p>The \"aha\": linear regression's reach is far wider than straight lines. Because it is linear <em>in the parameters</em>, transforming the inputs lets one simple, convex solver fit polynomials, interactions, and more — the workhorse trick behind much of classical machine learning.</p>\n</details>",
          "mcq": [
            {
              "q": "What does a linear regression model output?",
              "choices": [
                "The nearest training label",
                "A probability between 0 and 1",
                "A weighted sum of the features plus a bias: $\\hat{y} = w^\\top x + b$",
                "The majority class of the dataset"
              ],
              "answer": 2,
              "explain": "Linear regression predicts a continuous value as a weighted sum of the inputs plus an intercept; there is no squashing into [0,1]."
            },
            {
              "q": "Least-squares training chooses the weights that",
              "choices": [
                "minimize the mean squared residual (MSE)",
                "maximize the number of points the line passes through exactly",
                "minimize the largest single residual only",
                "set all weights equal"
              ],
              "answer": 0,
              "explain": "Ordinary least squares minimizes the average squared difference between predictions and targets — a smooth convex objective."
            },
            {
              "q": "The closed-form 'normal equations' solution for the weights is",
              "choices": [
                "$w = X^\\top y$",
                "$w = (X^\\top X)^{-1} X^\\top y$",
                "$w = X^{-1} y$",
                "$w = \\tfrac{1}{n}\\sum_i y_i$"
              ],
              "answer": 1,
              "explain": "Setting the gradient of the squared error to zero gives $w = (X^\\top X)^{-1} X^\\top y$ — geometrically, the projection of $y$ onto the column space of $X$."
            },
            {
              "q": "When is gradient descent preferred over the normal equations?",
              "choices": [
                "When the data has no noise",
                "When you want an exact answer",
                "Never — the closed form is always better",
                "When features/samples are so numerous that inverting $X^\\top X$ is too costly"
              ],
              "answer": 3,
              "explain": "The normal equations need an expensive matrix inverse; for very large/high-dimensional data, iterative gradient descent scales far better."
            },
            {
              "q": "How do you interpret a coefficient $w_j$?",
              "choices": [
                "The expected change in the prediction per one-unit increase in feature $j$, holding the others fixed",
                "The probability that feature $j$ is relevant",
                "The correlation between feature $j$ and every other feature",
                "The number of times feature $j$ appears in the data"
              ],
              "answer": 0,
              "explain": "Each weight is the marginal effect of its feature on the prediction, all else equal — which is why linear regression is so interpretable."
            },
            {
              "q": "What does $R^2$ measure?",
              "choices": [
                "The total number of features used",
                "The model's training time",
                "The fraction of the target's variance the model explains",
                "The probability the model is correct"
              ],
              "answer": 2,
              "explain": "$R^2 = 1 - \\text{SS}_{res}/\\text{SS}_{tot}$ is the proportion of variance explained: 1 is perfect, 0 is no better than predicting the mean."
            },
            {
              "q": "Why does minimizing squared error amount to maximum likelihood?",
              "choices": [
                "Because squaring is faster to compute",
                "Because the data is always normalized",
                "It does not — they are unrelated",
                "It is the MLE when the noise is assumed Gaussian"
              ],
              "answer": 3,
              "explain": "Under i.i.d. Gaussian noise, maximizing the log-likelihood reduces exactly to minimizing the sum of squared residuals."
            },
            {
              "q": "Saying linear regression is 'linear in the parameters' means you can",
              "choices": [
                "only ever fit straight lines",
                "fit nonlinear curves by transforming features (e.g. add $x^2$), still solving a linear problem in $w$",
                "never use more than one feature",
                "skip the bias term"
              ],
              "answer": 1,
              "explain": "The model is linear in the weights, so transformed features (polynomials, logs, interactions) let it fit curves while the optimization stays ordinary least squares."
            }
          ],
          "flashcards": [
            {
              "front": "What is the linear regression model and how is it trained?",
              "back": "Prediction ŷ = wᵀx + b (a weighted sum of features plus bias). Trained by least squares: minimize the mean squared residual MSE = (1/n)Σ(yᵢ−ŷᵢ)²."
            },
            {
              "front": "Two ways to solve linear regression",
              "back": "Closed form (normal equations): w = (XᵀX)⁻¹Xᵀy — exact, but the inverse is costly for large data. Gradient descent: iteratively minimize MSE — scales to huge/high-dim data."
            },
            {
              "front": "What does R² mean?",
              "back": "Fraction of the target's variance explained: R² = 1 − SS_res/SS_tot. 1 = perfect, 0 = no better than predicting the mean. Training R² always rises with more features — judge on held-out data."
            },
            {
              "front": "Why squared error? And its weakness?",
              "back": "Minimizing squared error = maximum likelihood under Gaussian noise (plus it's convex with a closed form). Weakness: outliers dominate (penalty grows with the square) — use MAE/Huber for heavy tails."
            },
            {
              "front": "'Linear in the parameters' — what does it let you do?",
              "back": "Fit nonlinear curves by transforming features (polynomial/basis functions, interactions) while still solving an ordinary-least-squares problem in w. The bridge to kernels and feature engineering."
            }
          ],
          "homework": [
            {
              "q": "A simple linear model predicts house price (in thousands of dollars) as ŷ = 50 + 0.10·(size in sq ft) − 5·(age in years). Interpret each coefficient, and predict the price of a 2000 sq ft, 10-year-old house.",
              "solution": "Prices are in thousands of dollars. Intercept 50: a hypothetical 0 sq ft, 0-year house has the baseline 50 (i.e. 50k; not physically meaningful, just the anchor). Size coefficient 0.10: each additional square foot adds 0.10 to the prediction, i.e. 100 dollars, holding age fixed. Age coefficient −5: each additional year of age lowers the prediction by 5, i.e. 5,000 dollars, holding size fixed. Prediction: 50 + 0.10·2000 − 5·10 = 50 + 200 − 50 = 200, i.e. 200,000 dollars."
            },
            {
              "q": "A colleague brags that adding 20 more features raised their model's R² from 0.72 to 0.95 on the training set, calling it a big improvement. Why should you be skeptical, and what would convince you?",
              "solution": "Training R² never decreases when you add features — even pure-noise features can only increase it, because the model has more freedom to fit the training points (including their noise). So a jump from 0.72 to 0.95 on training data is expected and not evidence of a better model; it may well be overfitting. What would convince you is improvement on held-out/test data (or cross-validated R²): if test R² also rose, the extra features carry real signal; if test R² fell or barely moved while training R² soared, it's overfitting. Adjusted R² or a validation curve would also help."
            }
          ],
          "examples": [
            {
              "title": "Predictions, residuals, and MSE by hand",
              "scenario": "Model ŷ = 2x + 1. Data points (x, y): (1, 4), (2, 4), (3, 8). Compute the predictions, residuals, and the MSE.",
              "solution": "Predictions: at x=1, ŷ=3; x=2, ŷ=5; x=3, ŷ=7. Residuals (y − ŷ): 4−3 = +1; 4−5 = −1; 8−7 = +1. Squared residuals: 1, 1, 1. MSE = (1+1+1)/3 = 1.0. The line is slightly off each point by 1 unit; least-squares training would adjust the slope and intercept to reduce this total squared miss (here the fit is already quite good and balanced, since the residuals sum to +1, near zero)."
            },
            {
              "title": "Fitting a parabola with 'linear' regression",
              "scenario": "Your data clearly curves like a U, so a straight line underfits badly. How can linear regression fit it without changing the algorithm?",
              "solution": "Add a transformed feature. Instead of fitting ŷ = w₁x + b, create a second feature x² and fit ŷ = w₁x + w₂x² + b. This is still ordinary least squares — you've just added a column to the design matrix — but the fitted curve is now a parabola in x. The model is linear in the parameters (w₁, w₂, b), so the same closed-form/gradient solver applies, yet it captures the U-shape. (Caution: keep adding powers and you'll eventually overfit, wiggling through every point.)"
            }
          ]
        },
        {
          "id": "ml-logistic-regression",
          "title": "Logistic Regression: From Scores to Probabilities",
          "minutes": 17,
          "content": "<h3>1. The hook: predicting a class, not a number</h3>\n<p>Linear regression outputs any real number — fine for prices, useless for \"spam or not.\" For <em>classification</em> you want a <strong>probability</strong>: a number in $[0,1]$ saying how likely the positive class is. <strong>Logistic regression</strong> gets there with one small twist on the linear model: compute a linear score, then squash it through an S-shaped function into a probability. It is the workhorse classifier of classical ML — fast, interpretable, well-calibrated — and, as you will see, literally a single neuron.</p>\n\n<h3>2. The model: linear score, then a squash</h3>\n<p>First compute the same linear score as before, $z = w^\\top x + b$. Then pass it through the <strong>logistic (sigmoid)</strong> function $$\\sigma(z) = \\frac{1}{1 + e^{-z}},$$ which maps any real number to $(0,1)$: large positive $z$ gives $\\sigma \\to 1$, large negative gives $\\sigma \\to 0$, and $z=0$ gives exactly $0.5$. The output $\\hat{p} = \\sigma(w^\\top x + b)$ is read as \"the model's probability that $y=1$.\" To make a hard decision you threshold, usually predicting class 1 when $\\hat{p} \\ge 0.5$ (equivalently when $z \\ge 0$).</p>\n\n<h3>3. Why not just use linear regression?</h3>\n<p>You <em>could</em> fit a line to 0/1 labels, but it misbehaves: predictions shoot below 0 and above 1 (nonsensical as probabilities), and a few far-away points tilt the line and move the boundary. The sigmoid fixes both — outputs stay in $(0,1)$, and points far on the correct side barely affect the fit. Logistic regression gives genuine, usable probabilities; linear regression on labels does not.</p>\n\n<h3>4. Training: cross-entropy (log loss)</h3>\n<p>We fit $w, b$ by <strong>maximum likelihood</strong> under a Bernoulli model, which is equivalent to minimizing the <strong>cross-entropy</strong> (log) loss: $$\\mathcal{L} = -\\frac{1}{n}\\sum_{i=1}^{n}\\Big[\\, y_i \\log \\hat{p}_i + (1-y_i)\\log(1-\\hat{p}_i)\\,\\Big].$$ It punishes confident wrong predictions enormously (predicting $\\hat{p}=0.01$ when $y=1$ costs $-\\log(0.01) \\approx 4.6$). There is no closed-form solution like the normal equations, but the loss is <em>convex</em>, so gradient descent reliably finds the global optimum.</p>\n\n<h3>5. The decision boundary is linear</h3>\n<p>Despite the curvy sigmoid, logistic regression is a <strong>linear classifier</strong>. The boundary is the set of points where $\\hat{p} = 0.5$, i.e. $z = w^\\top x + b = 0$ — a straight line in 2D, a hyperplane in general. The sigmoid only controls how <em>confidence</em> ramps up as you move away from that boundary; it does not bend the boundary itself. (Want a curved boundary? Transform the features, exactly as with linear regression.)</p>\n\n<h3>6. Reading the coefficients: log-odds</h3>\n<p>Logistic regression is interpretable, just on a different scale. The linear score $z$ is the <strong>log-odds</strong> (logit) of the positive class: $z = \\log\\frac{p}{1-p}$. So a weight $w_j$ is the change in log-odds per unit of feature $j$, and $e^{w_j}$ is the <strong>odds multiplier</strong>: a coefficient of $0.7$ means each unit of that feature multiplies the odds by $e^{0.7} \\approx 2$ (roughly doubles them), holding others fixed.</p>\n\n<h3>7. More than two classes</h3>\n<p>For $K$ classes, generalize the sigmoid to the <strong>softmax</strong>, which turns $K$ linear scores into a probability distribution over the classes (this is <em>multinomial</em> / softmax regression). A simpler alternative is <em>one-vs-rest</em>: train one binary logistic classifier per class and pick the most confident. Either way the per-class boundaries stay linear.</p>\n\n<h3>8. The big picture</h3>\n<p>Logistic regression = linear score + sigmoid + cross-entropy loss, trained by gradient descent, giving calibrated probabilities and a linear decision boundary you can read as log-odds. It is exactly a <em>single artificial neuron</em> with a sigmoid activation — so understanding it <em>is</em> understanding the atom of a neural network. As a baseline it is hard to beat: when in doubt, fit a logistic regression first.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why cross-entropy, not squared error, for classification</summary>\n<p>It is tempting to reuse the squared-error loss on the sigmoid output, $(y - \\hat{p})^2$. Don't — it fails in two ways that cross-entropy avoids.</p>\n<p><b>Convexity.</b> Squared error composed with the sigmoid is <em>non-convex</em> in the weights, so gradient descent can stall in bad local minima. Cross-entropy composed with the sigmoid is <em>convex</em>, giving a single global optimum that gradient descent always reaches.</p>\n<p><b>Gradient strength.</b> When the model is <em>confidently wrong</em> (say $\\hat{p} \\approx 0$ but $y=1$), squared error's gradient is tiny — the sigmoid has saturated, its slope is near zero, and the chain rule multiplies the error by that vanishing slope. Learning crawls exactly when it should be fastest. With cross-entropy the math is kinder: the gradient of the loss with respect to the score is simply $\\hat{p} - y$, which is <em>large</em> precisely when the prediction is badly wrong. The sigmoid's troublesome slope cancels out.</p>\n<p>The \"aha\": cross-entropy is not just a different loss, it is the <em>right</em> loss for probabilistic classification — the Bernoulli maximum-likelihood objective, convex, with a clean $\\hat{p} - y$ gradient that learns fast from confident mistakes. This is the same reason deep classifiers use cross-entropy, not MSE, on their softmax outputs.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: logistic regression is a linear classifier in disguise</summary>\n<p>The sigmoid is nonlinear, so people assume logistic regression draws curved boundaries. It does not — the curve is in the <em>probabilities</em>, not the <em>boundary</em>.</p>\n<p><b>Where the classes split.</b> A point is classified positive when $\\hat{p} = \\sigma(z) \\gt 0.5$, and the sigmoid crosses $0.5$ exactly at $z = 0$. So the decision boundary is $\\{x : w^\\top x + b = 0\\}$ — a hyperplane, the same flat boundary a perceptron or linear SVM would draw. Moving away from it, the sigmoid smoothly ramps the predicted probability toward 0 or 1; that ramp is the only thing the nonlinearity adds. Two models with the same boundary direction but different weight magnitudes differ only in how <em>sharply</em> confidence changes, not in <em>where</em> the classes split.</p>\n<p><b>Getting nonlinear boundaries.</b> Exactly as with linear regression, you lift the features: add $x^2$, $x_1 x_2$, or kernel features, and the boundary becomes nonlinear in the original space while the model stays a linear classifier in the expanded space.</p>\n<p>The \"aha\": logistic regression is a <em>linear</em> classifier that happens to report calibrated probabilities. The sigmoid sets confidence, not boundary shape — so its decision surface is a hyperplane, and curvature comes only from engineering the features.</p>\n</details>",
          "mcq": [
            {
              "q": "What does a logistic regression model output for an input?",
              "choices": [
                "The nearest class label by distance",
                "A probability in (0,1) that the input is in the positive class",
                "An unbounded real-valued score only",
                "The cluster the point belongs to"
              ],
              "answer": 1,
              "explain": "Logistic regression passes the linear score through a sigmoid, producing a calibrated probability in (0,1) for the positive class."
            },
            {
              "q": "The sigmoid function $\\sigma(z) = 1/(1+e^{-z})$ maps",
              "choices": [
                "(0,1) to all real numbers",
                "integers to integers",
                "probabilities to log-odds",
                "any real number to the open interval (0,1)"
              ],
              "answer": 3,
              "explain": "The sigmoid squashes the whole real line into (0,1): large +z → 1, large −z → 0, z=0 → 0.5."
            },
            {
              "q": "The decision boundary of logistic regression is",
              "choices": [
                "linear — the hyperplane $w^\\top x + b = 0$ where $\\hat{p}=0.5$",
                "always a circle",
                "curved because of the sigmoid",
                "undefined for probabilities"
              ],
              "answer": 0,
              "explain": "The boundary is where the probability is 0.5, i.e. z = w·x + b = 0 — a hyperplane. The sigmoid sets confidence, not the boundary's shape."
            },
            {
              "q": "Logistic regression is trained by minimizing",
              "choices": [
                "the squared error between probabilities and labels",
                "the number of misclassified points directly",
                "the cross-entropy (log) loss",
                "the distance to the nearest neighbor"
              ],
              "answer": 2,
              "explain": "Maximum likelihood under a Bernoulli model is equivalent to minimizing cross-entropy / log loss, which is convex in the weights."
            },
            {
              "q": "Why is squared error a poor loss for logistic regression?",
              "choices": [
                "It cannot be computed for probabilities",
                "Combined with the sigmoid it is non-convex and gives weak gradients when confidently wrong",
                "It always predicts the majority class",
                "It requires a closed-form solution"
              ],
              "answer": 1,
              "explain": "Squared-error-plus-sigmoid is non-convex and its gradient vanishes when the model is confidently wrong (saturated sigmoid). Cross-entropy is convex with a strong p−y gradient."
            },
            {
              "q": "How do you interpret a coefficient $w_j$ in logistic regression?",
              "choices": [
                "It is the predicted probability of feature $j$",
                "It is the Euclidean distance along axis $j$",
                "It has no interpretation",
                "It changes the log-odds; $e^{w_j}$ is the odds multiplier per unit of feature $j$"
              ],
              "answer": 3,
              "explain": "The linear score is the log-odds, so $w_j$ is the change in log-odds per unit feature, and $e^{w_j}$ multiplies the odds (all else fixed)."
            },
            {
              "q": "To classify more than two classes, logistic regression uses",
              "choices": [
                "softmax (multinomial) regression or one-vs-rest",
                "a decision tree instead",
                "k-means clustering",
                "nothing — it only does binary"
              ],
              "answer": 0,
              "explain": "Softmax generalizes the sigmoid to K classes (a distribution over classes); one-vs-rest trains one binary classifier per class. Boundaries stay linear."
            },
            {
              "q": "Logistic regression is mathematically equivalent to",
              "choices": [
                "a k-nearest-neighbor classifier",
                "a fully grown decision tree",
                "a single artificial neuron with a sigmoid activation",
                "an unsupervised clustering method"
              ],
              "answer": 2,
              "explain": "A logistic regression unit computes w·x+b then a sigmoid — exactly one neuron. It is the atom that neural networks stack and add nonlinearities to."
            }
          ],
          "flashcards": [
            {
              "front": "What is the logistic regression model?",
              "back": "Compute a linear score z = wᵀx + b, then squash it with the sigmoid σ(z)=1/(1+e^(−z)) to get a probability in (0,1). Threshold at 0.5 (z=0) for a hard class."
            },
            {
              "front": "What loss trains logistic regression, and why?",
              "back": "Cross-entropy (log) loss — the Bernoulli maximum-likelihood objective. It's convex (unlike squared-error+sigmoid) and its gradient (p−y) is strong exactly when the model is confidently wrong. No closed form; use gradient descent."
            },
            {
              "front": "Is logistic regression's decision boundary linear or curved?",
              "back": "Linear — a hyperplane where w·x+b=0 (p=0.5). The sigmoid only sets how fast confidence ramps, not the boundary shape. Transform features for curved boundaries."
            },
            {
              "front": "How do you interpret logistic regression coefficients?",
              "back": "The linear score is the log-odds: z = log(p/(1−p)). So w_j is the change in log-odds per unit of feature j, and e^(w_j) is the odds multiplier (e.g. w=0.7 → odds ×2)."
            },
            {
              "front": "Logistic regression and neural networks",
              "back": "Logistic regression IS a single neuron: linear combination + sigmoid, trained with cross-entropy. Stack many such units with nonlinearities and you get a neural net. It's also a strong, calibrated baseline classifier."
            }
          ],
          "homework": [
            {
              "q": "A logistic spam classifier outputs the score z = w·x + b = −1.5 for an email. Compute the predicted probability of spam, and state the predicted class at a 0.5 threshold. Then say what z and the probability would be for a borderline email exactly on the decision boundary.",
              "solution": "Probability = σ(−1.5) = 1/(1 + e^(1.5)) = 1/(1 + 4.4817) ≈ 1/5.4817 ≈ 0.182. Since 0.182 < 0.5, predict NOT spam (negative class). On the decision boundary the score is z = 0, giving σ(0) = 1/(1+1) = 0.5 exactly — the point of maximum uncertainty, where the classifier is indifferent between the two classes."
            },
            {
              "q": "In a logistic model for loan default, the coefficient on 'number of prior late payments' is 0.69. Interpret this on the odds scale, and explain why the effect on the probability is not constant per unit even though the effect on log-odds is.",
              "solution": "On the log-odds scale the effect is constant: each additional late payment adds 0.69 to the log-odds of default. On the odds scale, e^(0.69) ≈ 2, so each late payment multiplies the odds of default by about 2 (doubles them), holding other features fixed. The effect on the PROBABILITY is not constant because the sigmoid is nonlinear: doubling the odds moves the probability a lot in the middle (e.g. 0.5 → 0.67) but very little near the extremes (0.99 → 0.995). Equal additive steps in log-odds (or equal multiplicative steps in odds) produce unequal changes in probability — the S-curve flattens at both ends."
            }
          ],
          "examples": [
            {
              "title": "Score to probability to class, by hand",
              "scenario": "A logistic model has weights w = (2, −1) and bias b = −1. For input x = (1, 1), compute z, the probability, and the predicted class (threshold 0.5).",
              "solution": "z = w·x + b = 2·1 + (−1)·1 + (−1) = 2 − 1 − 1 = 0. Then σ(0) = 1/(1 + e^0) = 1/2 = 0.5. The probability is exactly 0.5 — the input sits on the decision boundary. With a 'predict 1 if p ≥ 0.5' rule it is classified as the positive class (1), but it is maximally uncertain; any tiny change to a feature would tip it decisively one way or the other."
            },
            {
              "title": "Why a straight line on 0/1 labels misbehaves",
              "scenario": "You fit ordinary linear regression to binary labels (0 = healthy, 1 = sick) against a dosage feature, then add one patient with a very high dosage. What goes wrong that logistic regression avoids?",
              "solution": "Two problems. First, the fitted line is unbounded, so for high or low dosages it predicts values above 1 or below 0 — impossible as probabilities, with no sensible way to read them. Second, the single high-dosage point exerts strong leverage on the least-squares line, tilting it and shifting the implied 0.5 crossing (the decision threshold), so a far-away correct case degrades the boundary. Logistic regression avoids both: the sigmoid keeps outputs in (0,1), and points far on the correct side of the boundary contribute almost nothing to the cross-entropy gradient, so the boundary is stable."
            }
          ]
        },
        {
          "id": "ml-regularization",
          "title": "Regularization: Ridge, Lasso & Taming the Weights",
          "minutes": 18,
          "content": "<h3>1. The hook: when fitting the data too well goes wrong</h3>\n<p>Give a linear model many features — especially correlated or noisy ones — and least squares will happily grow huge, see-sawing weights that fit the training data perfectly and generalize terribly. The cure is <strong>regularization</strong>: add a penalty that discourages large weights, nudging the model toward simpler explanations. It is the single most important idea for making linear (and most other) models actually work in practice, and it is a textbook bias-variance trade — accept a little bias to slash variance.</p>\n\n<h3>2. The idea: penalize complexity</h3>\n<p>Instead of minimizing just the fit error, minimize <em>fit error plus a penalty on the weights</em>: $$\\text{minimize}\\quad \\text{Loss}(w) + \\lambda\\, \\Omega(w),$$ where $\\Omega(w)$ measures how \"big\" the weights are and $\\lambda \\ge 0$ sets how much we care. With $\\lambda = 0$ you recover ordinary least squares; crank $\\lambda$ up and the model is forced to keep weights small, trading training accuracy for stability. The two classic choices of $\\Omega$ give ridge and lasso.</p>\n\n<h3>3. Ridge regression (L2)</h3>\n<p><strong>Ridge</strong> penalizes the <em>sum of squared</em> weights, $\\Omega(w) = \\sum_j w_j^2$. It keeps a clean closed form — the normal equations gain a $\\lambda I$ term: $$w = (X^\\top X + \\lambda I)^{-1} X^\\top y.$$ That added $\\lambda I$ also makes the matrix invertible even when $X^\\top X$ is singular (e.g. more features than samples, or collinear features), curing the instability that plagues plain least squares. Ridge <em>shrinks</em> all weights smoothly toward zero but rarely sets any exactly to zero — every feature stays in the model, just with a smaller voice.</p>\n\n<h3>4. Lasso (L1)</h3>\n<p><strong>Lasso</strong> penalizes the <em>sum of absolute</em> weights, $\\Omega(w) = \\sum_j |w_j|$. Its signature behavior: it drives many weights <em>exactly to zero</em>, performing automatic <strong>feature selection</strong> and yielding a sparse, interpretable model that uses only a handful of features. The absolute value has a corner at zero (it is not differentiable there), so there is no closed form; lasso is solved by coordinate descent or subgradient methods.</p>\n\n<h3>5. Why L1 zeros weights and L2 doesn't</h3>\n<p>Picture the penalty as a budget: \"keep $\\Omega(w)$ within some size.\" For L2 that budget is a round ball; for L1 it is a diamond with sharp <em>corners poking out along the axes</em>. The best-fit solution expands until it touches that region, and a diamond is most often first touched <em>at a corner</em> — where some coordinates are exactly zero. The round L2 ball has no corners, so its contact point almost never zeroes a coordinate. That geometric difference is the whole reason lasso gives sparsity and ridge gives smooth shrinkage.</p>\n\n<h3>6. The knob: choosing λ</h3>\n<p>$\\lambda$ is a hyperparameter, not learned from the training loss (which would just pick $\\lambda=0$). You choose it by <strong>cross-validation</strong>: try a range of $\\lambda$ values, measure validation error for each, keep the best. Plotting each weight against $\\lambda$ gives the <em>regularization path</em> — as $\\lambda$ grows from $0$, ridge weights glide toward zero while lasso weights snap to zero one by one. Small $\\lambda$ underregularizes (overfits); large $\\lambda$ overregularizes (underfits); the sweet spot is in between.</p>\n\n<h3>7. Elastic Net and a scaling caveat</h3>\n<p><strong>Elastic Net</strong> combines both penalties, $\\lambda_1\\sum_j |w_j| + \\lambda_2 \\sum_j w_j^2$, getting lasso's sparsity <em>and</em> ridge's stability with correlated features. One practical must: <strong>standardize your features first</strong>. The penalty sums over weights, so if features live on different scales the penalty hits them unequally and the results are arbitrary — exactly the scaling lesson from kNN, now for the regularizer.</p>\n\n<h3>8. The big picture</h3>\n<p>Regularization adds a \"keep it simple\" penalty to the loss: ridge (L2) shrinks all weights and stabilizes ill-conditioned problems; lasso (L1) zeros weights for feature selection; elastic net blends them; $\\lambda$ is tuned by cross-validation. The idea radiates far beyond linear models — <em>weight decay</em> in deep learning is exactly L2 regularization, and the underlying principle (prefer simpler hypotheses) is the inductive bias that makes generalization possible.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: regularization is a prior (the Bayesian view)</summary>\n<p>Adding a weight penalty is not an arbitrary hack — it is, exactly, doing Bayesian estimation with a <em>prior belief</em> that weights are small.</p>\n<p><b>MAP estimation.</b> Maximum-likelihood fitting maximizes $P(\\text{data} \\mid w)$. If you instead have a prior $P(w)$ and maximize the posterior $P(w \\mid \\text{data}) \\propto P(\\text{data} \\mid w)\\,P(w)$ — the <em>maximum a posteriori</em> (MAP) estimate — taking logs turns the product into a sum: log-likelihood plus log-prior. The log-prior <em>is</em> the regularization penalty.</p>\n<p><b>Which prior gives which penalty.</b> A <em>Gaussian</em> prior on the weights, $w_j \\sim \\mathcal{N}(0, \\tau^2)$, has a log-density proportional to $-\\sum_j w_j^2$ — that is <b>ridge / L2</b>. A <em>Laplace</em> (double-exponential) prior, peaked at zero with heavy tails, has log-density proportional to $-\\sum_j |w_j|$ — that is <b>lasso / L1</b>, and the sharp peak at zero is why it favors exact zeros. The strength $\\lambda$ is set by how tight the prior is (larger $\\lambda$ = stronger belief that weights are near zero).</p>\n<p>The \"aha\": ridge and lasso are MAP estimation under Gaussian and Laplace priors. Regularization is just prior knowledge — \"weights should be small/sparse\" — written into the objective, which is why it reduces variance and why the <em>shape</em> of the prior (round vs peaked) determines shrinkage vs sparsity.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ridge vs lasso — which should you reach for?</summary>\n<p>Both shrink, but they suit different situations, and knowing which to grab saves a lot of guessing.</p>\n<p><b>Reach for lasso when</b> you believe only a <em>few</em> features truly matter and you want the model to find and keep them — lasso's exact zeros give you a sparse, interpretable subset (built-in feature selection). The catch: among a group of <em>highly correlated</em> features, lasso tends to arbitrarily pick one and zero the rest, which can be unstable.</p>\n<p><b>Reach for ridge when</b> you expect <em>many</em> features to each contribute a little, or when features are correlated. Ridge keeps them all and spreads the weight across correlated features rather than picking a winner, giving steadier coefficients. It also has the closed form and always-invertible matrix, so it is computationally easy.</p>\n<p><b>Can't decide? Elastic Net.</b> It mixes the two — lasso's selection with ridge's grouping of correlated features — at the cost of a second hyperparameter to tune.</p>\n<p>The \"aha\": match the penalty to your belief about the weights. Sparse truth (few relevant features) → lasso; dense truth (many small effects, correlations) → ridge; unsure or correlated-and-sparse → elastic net. They are all the same \"shrink the weights\" idea, differing in the <em>shape</em> of the shrinkage.</p>\n</details>",
          "mcq": [
            {
              "q": "What problem does regularization primarily address?",
              "choices": [
                "Slow training speed",
                "Missing data values",
                "Data that is not yet standardized",
                "Overfitting — large, unstable weights that fit noise"
              ],
              "answer": 3,
              "explain": "Regularization penalizes large weights to curb overfitting, trading a little bias for much lower variance and more stable coefficients."
            },
            {
              "q": "Ridge regression adds which penalty to the loss?",
              "choices": [
                "The number of nonzero weights",
                "$\\lambda$ times the sum of squared weights (L2)",
                "$\\lambda$ times the sum of absolute weights",
                "The maximum weight value"
              ],
              "answer": 1,
              "explain": "Ridge uses the L2 penalty $\\lambda \\sum_j w_j^2$, giving the closed form $(X^\\top X + \\lambda I)^{-1}X^\\top y$ and smooth shrinkage."
            },
            {
              "q": "Lasso (L1 penalty) is notable because it",
              "choices": [
                "always gives a higher R-squared than ridge",
                "cannot be used with more than one feature",
                "drives some weights exactly to zero, performing feature selection",
                "has a simpler closed form than ridge"
              ],
              "answer": 2,
              "explain": "The L1 penalty produces exact zeros, yielding a sparse model that automatically selects a subset of features. It has no closed form (corner at 0)."
            },
            {
              "q": "As the regularization strength $\\lambda \\to \\infty$, the weights",
              "choices": [
                "shrink toward zero, making the model simpler and more biased",
                "grow without bound",
                "stay exactly at the least-squares values",
                "become random"
              ],
              "answer": 0,
              "explain": "Larger $\\lambda$ weights the penalty more, forcing weights toward zero; at the extreme the model predicts (near) a constant — maximal bias, minimal variance."
            },
            {
              "q": "How is the regularization strength $\\lambda$ chosen?",
              "choices": [
                "By minimizing the training loss directly",
                "It is fixed at 1 by convention",
                "It is learned by gradient descent with the weights",
                "By cross-validation — try several values, keep the best validation score"
              ],
              "answer": 3,
              "explain": "$\\lambda$ can't be picked from training loss (that selects $\\lambda=0$). Cross-validation finds the value with the best held-out performance."
            },
            {
              "q": "Why does L1 (lasso) produce exactly-zero weights while L2 (ridge) does not?",
              "choices": [
                "L1 is computed with integers only",
                "The L1 constraint region is a diamond whose corners lie on the axes, so the optimum often lands at a zero coordinate",
                "L1 ignores the fit error",
                "L2 cannot represent zero"
              ],
              "answer": 1,
              "explain": "The diamond-shaped L1 region has corners on the axes (some coordinates zero); the round L2 ball has no corners, so it shrinks smoothly without zeroing."
            },
            {
              "q": "In Bayesian terms, regularization corresponds to",
              "choices": [
                "placing a prior on the weights (ridge = Gaussian, lasso = Laplace), i.e. MAP estimation",
                "ignoring the likelihood entirely",
                "using more training data",
                "removing the bias term"
              ],
              "answer": 0,
              "explain": "Penalized loss = negative log-posterior: the penalty is the log-prior. Gaussian prior → L2/ridge; Laplace prior → L1/lasso. It's MAP estimation."
            },
            {
              "q": "Why must you standardize features before regularizing?",
              "choices": [
                "Regularization only works on positive numbers",
                "Standardizing removes the need for a bias term",
                "The penalty sums over weights, so unscaled features get penalized unequally and arbitrarily",
                "It makes the closed form exact"
              ],
              "answer": 2,
              "explain": "Because the penalty depends on weight magnitudes, features on different scales are penalized inconsistently; standardizing puts them on equal footing."
            }
          ],
          "flashcards": [
            {
              "front": "What is regularization and why use it?",
              "back": "Add a penalty on weight size to the loss: minimize Loss(w) + λ·Ω(w). It curbs overfitting by shrinking weights (bias-variance trade) and stabilizes ill-conditioned/correlated problems."
            },
            {
              "front": "Ridge (L2) vs Lasso (L1)",
              "back": "Ridge: penalty λΣwⱼ², closed form (XᵀX+λI)⁻¹Xᵀy, shrinks all weights smoothly (none exactly zero), fixes collinearity. Lasso: penalty λΣ|wⱼ|, drives weights exactly to zero (feature selection), no closed form."
            },
            {
              "front": "Why does L1 give sparsity but L2 doesn't?",
              "back": "The L1 constraint region is a diamond with corners on the axes, so the best fit usually first touches it at a corner (zero coordinates). The L2 ball is round (no corners), so it shrinks smoothly without zeroing."
            },
            {
              "front": "How is λ chosen, and what are the extremes?",
              "back": "By cross-validation (pick the λ with best validation error). λ=0 → ordinary least squares (overfits); λ→∞ → all weights→0 (underfits). The 'regularization path' plots weights vs λ."
            },
            {
              "front": "Regularization as a Bayesian prior",
              "back": "Penalized loss = MAP estimation: penalty = −log prior on the weights. Gaussian prior → ridge (L2); Laplace prior (peaked at 0) → lasso (L1). λ = prior strength. Weight decay in DL is L2."
            }
          ],
          "homework": [
            {
              "q": "You fit ordinary least squares with 50 features on 40 training samples and get wild, huge coefficients and terrible test error. Explain what went wrong and how ridge regression fixes it (mention the matrix).",
              "solution": "With more features than samples (50 > 40), XᵀX is singular (not full rank), so the normal-equations inverse doesn't exist or is numerically unstable — least squares is underdetermined and can fit the 40 points exactly with arbitrary, huge, see-sawing weights that don't generalize (overfitting). Ridge adds λI to get (XᵀX + λI)⁻¹Xᵀy: the +λI makes the matrix invertible (full rank) even when XᵀX isn't, and the L2 penalty shrinks the coefficients to sensible sizes. Tune λ by cross-validation. (Lasso would also help and additionally zero out irrelevant features.)"
            },
            {
              "q": "A model has two nearly identical (highly correlated) features that are both predictive. Describe how lasso vs ridge would treat them, and which you'd prefer if you want stable coefficients.",
              "solution": "Lasso tends to pick ONE of the correlated pair and drive the other's weight to exactly zero — and which one it keeps can flip with small data changes, so the coefficients are unstable and the 'selection' is somewhat arbitrary. Ridge keeps BOTH and splits the weight between them (roughly halving each), giving smoother, more stable coefficients across resamples. If you want stable coefficients with correlated predictors, prefer ridge (or elastic net, which groups correlated features while still allowing some sparsity). If you specifically want a sparse model and don't mind which of the pair is kept, lasso is fine."
            }
          ],
          "examples": [
            {
              "title": "How ridge shrinks a coefficient as λ grows",
              "scenario": "In a one-feature ridge problem the closed-form weight is w = (Σ xᵢyᵢ)/(Σ xᵢ² + λ). Suppose Σ xᵢyᵢ = 20 and Σ xᵢ² = 10. Compute w for λ = 0, 10, and 90.",
              "solution": "λ=0: w = 20/(10+0) = 2.0 (the ordinary least-squares weight). λ=10: w = 20/(10+10) = 20/20 = 1.0 (halved). λ=90: w = 20/(10+90) = 20/100 = 0.2 (shrunk toward zero). As λ grows, the denominator grows, so the weight smoothly shrinks toward 0 but never reaches it exactly — the hallmark of ridge/L2 shrinkage."
            },
            {
              "title": "Lasso zeros a weak feature; ridge only shrinks it",
              "scenario": "A feature has a small least-squares weight of 0.3 and is mostly noise. Qualitatively, what does lasso do to it versus ridge as regularization increases?",
              "solution": "Lasso: as λ rises past a threshold, the soft-thresholding of L1 pushes this small weight to EXACTLY 0 — the feature drops out of the model entirely, which is desirable if it's just noise (automatic feature selection). Ridge: it shrinks the 0.3 toward zero (say to 0.2, then 0.1, ...) but never sets it to exactly 0, so the noisy feature stays in the model with a small nonzero weight. This is the practical difference: lasso yields a sparse model that discards weak features; ridge yields a dense model that merely damps them."
            }
          ]
        }
      ]
    }
  ]
}
);
