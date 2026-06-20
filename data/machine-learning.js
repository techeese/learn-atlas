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
    }
  ]
}
);
